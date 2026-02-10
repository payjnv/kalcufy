import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const gradeCalculatorConfig: CalculatorConfigV4 = {
  id: "grade-calculator",
  version: "4.0",
  category: "everyday",
  icon: "📝",

  presets: [
    {
      id: "weighted",
      icon: "⚖️",
      values: { mode: "weighted", cat1Name: "Homework", cat1Score: 92, cat1Weight: 20, cat2Name: "Midterm", cat2Score: 78, cat2Weight: 30, cat3Name: "Final", cat3Score: 85, cat3Weight: 50, cat4Name: "", cat4Score: 0, cat4Weight: 0 },
    },
    {
      id: "simple",
      icon: "✏️",
      values: { mode: "simple", pointsEarned: 156, pointsPossible: 200, cat1Name: "", cat1Score: 0, cat1Weight: 0, cat2Name: "", cat2Score: 0, cat2Weight: 0, cat3Name: "", cat3Score: 0, cat3Weight: 0, cat4Name: "", cat4Score: 0, cat4Weight: 0 },
    },
    {
      id: "finalNeeded",
      icon: "🎯",
      values: { mode: "finalNeeded", currentGrade: 82, desiredGrade: 90, finalWeight: 40, cat1Name: "", cat1Score: 0, cat1Weight: 0, cat2Name: "", cat2Score: 0, cat2Weight: 0, cat3Name: "", cat3Score: 0, cat3Weight: 0, cat4Name: "", cat4Score: 0, cat4Weight: 0 },
    },
  ],

  t: {
    en: {
      name: "Grade Calculator",
      slug: "grade-calculator",
      subtitle: "Calculate your weighted grade, simple percentage, or find out what you need on the final exam to reach your target grade.",
      breadcrumb: "Grade",

      seo: {
        title: "Grade Calculator - Weighted, Final Exam & Percentage",
        description: "Calculate your class grade with weighted categories, find your percentage score, or determine what you need on the final to get the grade you want. Free tool.",
        shortDescription: "Calculate weighted grades and final exam scores.",
        keywords: [
          "grade calculator",
          "weighted grade calculator",
          "final grade calculator",
          "what do I need on my final",
          "calculate my grade",
          "free grade calculator",
          "class grade calculator",
          "weighted average calculator",
        ],
      },

      calculator: { yourInformation: "Grade Information" },
      ui: { yourInformation: "Grade Information", calculate: "Calculate", reset: "Reset", results: "Results" },

      inputs: {
        mode: { label: "Calculation Type", helpText: "Choose what to calculate", options: { weighted: "Weighted Grade", simple: "Simple Percentage", finalNeeded: "What Do I Need on the Final?" } },
        pointsEarned: { label: "Points Earned", helpText: "Total points you earned" },
        pointsPossible: { label: "Points Possible", helpText: "Total possible points" },
        currentGrade: { label: "Current Grade (%)", helpText: "Your current class percentage" },
        desiredGrade: { label: "Desired Grade (%)", helpText: "The grade you want to achieve" },
        finalWeight: { label: "Final Exam Weight (%)", helpText: "How much the final counts toward your grade" },
        cat1Name: { label: "Category 1", helpText: "Category name (e.g., Homework)" },
        cat1Score: { label: "Score (%)", helpText: "Your score as a percentage" },
        cat1Weight: { label: "Weight (%)", helpText: "How much this counts toward final grade" },
        cat2Name: { label: "Category 2", helpText: "Category name" },
        cat2Score: { label: "Score (%)", helpText: "Score percentage" },
        cat2Weight: { label: "Weight (%)", helpText: "Weight percentage" },
        cat3Name: { label: "Category 3", helpText: "Category name" },
        cat3Score: { label: "Score (%)", helpText: "Score percentage" },
        cat3Weight: { label: "Weight (%)", helpText: "Weight percentage" },
        cat4Name: { label: "Category 4 (Optional)", helpText: "Category name" },
        cat4Score: { label: "Score (%)", helpText: "Score percentage" },
        cat4Weight: { label: "Weight (%)", helpText: "Weight percentage" },
      },

      results: {
        finalGrade: { label: "Your Grade" },
        letterGrade: { label: "Letter Grade" },
        neededScore: { label: "Score Needed on Final" },
      },

      presets: {
        weighted: { label: "Weighted (HW + Midterm + Final)", description: "Standard weighted grade" },
        simple: { label: "156 out of 200", description: "Simple percentage" },
        finalNeeded: { label: "Need 90% — Final is 40%", description: "What score do I need?" },
      },

      values: { "%": "%", "of": "of" },
      formats: { summary: "Your grade: {grade}%" },

      infoCards: {
        metrics: {
          title: "Grade Summary",
          items: [
            { label: "Final Grade", valueKey: "finalGrade" },
            { label: "Letter Grade", valueKey: "letterGrade" },
            { label: "Total Weight", valueKey: "totalWeight" },
            { label: "Categories", valueKey: "categoryCount" },
          ],
        },
        details: {
          title: "Grade Scale",
          items: [
            { label: "A Range", valueKey: "aRange" },
            { label: "B Range", valueKey: "bRange" },
            { label: "C Range", valueKey: "cRange" },
            { label: "D/F Range", valueKey: "dRange" },
          ],
        },
        tips: {
          title: "Study Tips",
          items: [
            "High-weight categories (like finals) have the biggest impact — study proportionally",
            "Tracking your grade throughout the semester lets you plan your effort strategically",
            "Missing assignments hurt more than low scores — always submit something",
            "Extra credit can make a big difference when you're close to a grade cutoff",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Weighted Grade?",
          content: "A weighted grade assigns different importance to different categories of work. Rather than treating every assignment equally, weighted grading recognizes that some assessments (like a final exam) should count more toward your grade than others (like a single homework assignment). For example, if homework is worth 20% of your grade and the final is worth 40%, earning 100% on homework but 50% on the final gives you a weighted average of 0.20 × 100 + 0.40 × 50 = 40%, not the 75% you'd get with simple averaging. Most college courses use weighted grading.",
        },
        howItWorks: {
          title: "How Weighted Grades Are Calculated",
          content: "The formula for weighted grades is: Final Grade = Σ(Score × Weight) / Σ(Weight). Each category's contribution equals its score multiplied by its weight percentage. For example, with Homework (92%, weight 20%), Midterm (78%, weight 30%), and Final (85%, weight 50%): (92 × 0.20) + (78 × 0.30) + (85 × 0.50) = 18.4 + 23.4 + 42.5 = 84.3%. The 'What Do I Need on the Final?' calculation rearranges this formula: Required Score = (Desired Grade - Current Grade × (1 - Final Weight)) / Final Weight. This tells you exactly what final exam score achieves your target grade.",
        },
        considerations: {
          title: "Important Notes",
          items: [
            { text: "Weights should add up to 100% — if they don't, the calculator normalizes them automatically", type: "warning" },
            { text: "A score above 100% on the final is required? That means your target grade may not be achievable", type: "warning" },
            { text: "Curve adjustments: If your professor curves grades, your actual letter grade may be higher", type: "info" },
            { text: "Grade cutoffs vary: Some professors set A at 90%, others at 93%. Check your syllabus", type: "info" },
            { text: "Rounding: Most professors round up at .5 (89.5% → 90% = A-), but this isn't guaranteed", type: "info" },
            { text: "Dropped grades: Some courses drop the lowest score in a category — this calculator doesn't account for that", type: "info" },
          ],
        },
        categories: {
          title: "Common Grade Cutoffs",
          items: [
            { text: "A (90-100%): Excellent — demonstrates thorough mastery of course material", type: "info" },
            { text: "B (80-89%): Good — shows strong understanding with room for improvement", type: "info" },
            { text: "C (70-79%): Average — meets basic expectations for the course", type: "info" },
            { text: "D (60-69%): Below average — minimum passing grade at most institutions", type: "info" },
            { text: "F (0-59%): Failing — does not meet minimum standards, no credit earned", type: "info" },
            { text: "Plus/Minus: A+ (97+), A (93-96), A- (90-92), B+ (87-89), etc. — varies by school", type: "info" },
          ],
        },
        examples: {
          title: "Grade Calculation Examples",
          description: "Step by step weighted grade calculations",
          examples: [
            {
              title: "Weighted Grade: 3 Categories",
              steps: [
                "Homework (20%): 95 × 0.20 = 19.0",
                "Quizzes (30%): 82 × 0.30 = 24.6",
                "Exams (50%): 88 × 0.50 = 44.0",
                "Total: 19.0 + 24.6 + 44.0",
              ],
              result: "Final Grade: 87.6% (B+)",
            },
            {
              title: "What Do I Need on the Final?",
              steps: [
                "Current grade: 78%, Final worth: 30%",
                "Want a B (80%)",
                "Need = (80 - 78 × 0.70) / 0.30",
                "Need = (80 - 54.6) / 0.30 = 84.7%",
              ],
              result: "Score 84.7% or higher on the final",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I calculate my weighted grade?", answer: "Multiply each category's score by its weight (as a decimal), then add all results. Example: If homework (20%) = 90 and final (80%) = 75, your grade is 0.20×90 + 0.80×75 = 18 + 60 = 78%." },
        { question: "What score do I need on the final to get an A?", answer: "Use the 'What Do I Need on the Final?' mode. Enter your current grade, desired grade (e.g., 90% for an A), and the final's weight. The calculator tells you the exact score needed." },
        { question: "What if my weights don't add up to 100%?", answer: "The calculator automatically normalizes your weights. If you enter 20% + 30% = 50%, it will calculate as if those are the only components (normalizing to 40% + 60%)." },
        { question: "How do I convert my percentage to a letter grade?", answer: "Common US scale: A = 90-100%, B = 80-89%, C = 70-79%, D = 60-69%, F = below 60%. With plus/minus: A+ = 97+, A = 93-96, A- = 90-92, B+ = 87-89, etc." },
        { question: "Is this the same as a GPA calculator?", answer: "No. A grade calculator finds your percentage in a single course. A GPA calculator combines grades from multiple courses weighted by credit hours to find your overall grade point average." },
        { question: "Can I get a grade higher than 100%?", answer: "Only with extra credit. Standard weighted grades max out at 100%. If the 'needed on final' result exceeds 100%, your desired grade may not be achievable with the final exam alone." },
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
    {
      id: "mode",
      type: "select",
      defaultValue: "weighted",
      options: [{ value: "weighted" }, { value: "simple" }, { value: "finalNeeded" }],
    },
    // Simple mode
    { id: "pointsEarned", type: "number", defaultValue: null, placeholder: "85", min: 0, showWhen: { field: "mode", value: "simple" } },
    { id: "pointsPossible", type: "number", defaultValue: null, placeholder: "100", min: 1, showWhen: { field: "mode", value: "simple" } },
    // Final needed mode
    { id: "currentGrade", type: "number", defaultValue: null, placeholder: "78", min: 0, max: 100, suffix: "%", showWhen: { field: "mode", value: "finalNeeded" } },
    { id: "desiredGrade", type: "number", defaultValue: null, placeholder: "90", min: 0, max: 100, suffix: "%", showWhen: { field: "mode", value: "finalNeeded" } },
    { id: "finalWeight", type: "number", defaultValue: null, placeholder: "40", min: 1, max: 100, suffix: "%", showWhen: { field: "mode", value: "finalNeeded" } },
    // Weighted mode - Category 1
    { id: "cat1Score", type: "number", defaultValue: null, placeholder: "92", min: 0, max: 200, suffix: "%", showWhen: { field: "mode", value: "weighted" } },
    { id: "cat1Weight", type: "number", defaultValue: null, placeholder: "20", min: 0, max: 100, suffix: "% wt", showWhen: { field: "mode", value: "weighted" } },
    // Category 2
    { id: "cat2Score", type: "number", defaultValue: null, placeholder: "78", min: 0, max: 200, suffix: "%", showWhen: { field: "mode", value: "weighted" } },
    { id: "cat2Weight", type: "number", defaultValue: null, placeholder: "30", min: 0, max: 100, suffix: "% wt", showWhen: { field: "mode", value: "weighted" } },
    // Category 3
    { id: "cat3Score", type: "number", defaultValue: null, placeholder: "85", min: 0, max: 200, suffix: "%", showWhen: { field: "mode", value: "weighted" } },
    { id: "cat3Weight", type: "number", defaultValue: null, placeholder: "50", min: 0, max: 100, suffix: "% wt", showWhen: { field: "mode", value: "weighted" } },
    // Category 4 (optional)
    { id: "cat4Score", type: "number", defaultValue: 0, placeholder: "0", min: 0, max: 200, suffix: "%", showWhen: { field: "mode", value: "weighted" } },
    { id: "cat4Weight", type: "number", defaultValue: 0, placeholder: "0", min: 0, max: 100, suffix: "% wt", showWhen: { field: "mode", value: "weighted" } },
  ],

  inputGroups: [],

  results: [
    { id: "finalGrade", type: "primary", format: "text" },
    { id: "letterGrade", type: "secondary", format: "text" },
    { id: "neededScore", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📝", itemCount: 4 },
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
    {
      authors: "National Council of Teachers of Mathematics",
      year: "2024",
      title: "Principles to Actions: Grading and Assessment",
      source: "NCTM",
      url: "https://www.nctm.org/",
    },
    {
      authors: "Association of American Colleges and Universities",
      year: "2024",
      title: "Valid Assessment of Learning",
      source: "AAC&U",
      url: "https://www.aacu.org/",
    },
  ],

  hero: { icon: "📝" },
  sidebar: {},
  features: {},
  relatedCalculators: ["gpa-calculator", "percentage-calculator"],
  ads: {},
};

function getLetterGrade(pct: number): string {
  if (pct >= 97) return "A+";
  if (pct >= 93) return "A";
  if (pct >= 90) return "A-";
  if (pct >= 87) return "B+";
  if (pct >= 83) return "B";
  if (pct >= 80) return "B-";
  if (pct >= 77) return "C+";
  if (pct >= 73) return "C";
  if (pct >= 70) return "C-";
  if (pct >= 67) return "D+";
  if (pct >= 63) return "D";
  if (pct >= 60) return "D-";
  return "F";
}

export function calculateGradeCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const mode = values.mode as string;

  // --- Simple percentage ---
  if (mode === "simple") {
    const earned = values.pointsEarned as number | null;
    const possible = values.pointsPossible as number | null;
    if (!earned || !possible || possible === 0) return { values: {}, formatted: {}, summary: "", isValid: false };

    const pct = (earned / possible) * 100;
    const letter = getLetterGrade(pct);

    return {
      values: { finalGrade: pct, letterGrade: letter },
      formatted: {
        finalGrade: `${pct.toFixed(2)}%`,
        letterGrade: letter,
        neededScore: "—",
        totalWeight: "100%",
        categoryCount: "1",
        aRange: "90-100%", bRange: "80-89%", cRange: "70-79%", dRange: "60-69% / F < 60%",
      },
      summary: f.summary?.replace("{grade}", pct.toFixed(1)) || `Your grade: ${pct.toFixed(1)}% (${letter})`,
      isValid: true,
    };
  }

  // --- What do I need on the final? ---
  if (mode === "finalNeeded") {
    const current = values.currentGrade as number | null;
    const desired = values.desiredGrade as number | null;
    const finalWt = values.finalWeight as number | null;
    if (current === null || desired === null || finalWt === null || finalWt === 0) return { values: {}, formatted: {}, summary: "", isValid: false };

    const w = finalWt / 100;
    const needed = (desired - current * (1 - w)) / w;
    const letter = getLetterGrade(desired);
    const achievable = needed <= 100;

    return {
      values: { neededScore: needed, finalGrade: desired, letterGrade: letter },
      formatted: {
        finalGrade: `${desired}% (${letter})`,
        letterGrade: letter,
        neededScore: achievable ? `${needed.toFixed(1)}%` : `${needed.toFixed(1)}% (may not be achievable)`,
        totalWeight: `${finalWt}%`,
        categoryCount: "—",
        aRange: "90-100%", bRange: "80-89%", cRange: "70-79%", dRange: "60-69% / F < 60%",
      },
      summary: `You need ${needed.toFixed(1)}% on the final to get a ${desired}% (${letter})`,
      isValid: true,
    };
  }

  // --- Weighted grade ---
  if (mode === "weighted") {
    const cats: { score: number; weight: number }[] = [];
    for (let i = 1; i <= 4; i++) {
      const score = values[`cat${i}Score`] as number | null;
      const weight = values[`cat${i}Weight`] as number | null;
      if (score !== null && score !== undefined && weight !== null && weight !== undefined && weight > 0) {
        cats.push({ score, weight });
      }
    }

    if (cats.length === 0) return { values: {}, formatted: {}, summary: "", isValid: false };

    const totalWeight = cats.reduce((s, c) => s + c.weight, 0);
    const weightedSum = cats.reduce((s, c) => s + c.score * (c.weight / totalWeight), 0);
    const letter = getLetterGrade(weightedSum);

    return {
      values: { finalGrade: weightedSum, letterGrade: letter },
      formatted: {
        finalGrade: `${weightedSum.toFixed(2)}%`,
        letterGrade: letter,
        neededScore: "—",
        totalWeight: `${totalWeight}%${totalWeight !== 100 ? " (normalized)" : ""}`,
        categoryCount: String(cats.length),
        aRange: "90-100%", bRange: "80-89%", cRange: "70-79%", dRange: "60-69% / F < 60%",
      },
      summary: f.summary?.replace("{grade}", weightedSum.toFixed(1)) || `Your grade: ${weightedSum.toFixed(1)}% (${letter})`,
      isValid: true,
    };
  }

  return { values: {}, formatted: {}, summary: "", isValid: false };
}

export default gradeCalculatorConfig;
