"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

// =============================================================================
// CALCULATOR CONSTANTS
// =============================================================================
const CALCULATOR_SLUG = "gpa-calculator";
const CALCULATOR_NAME = "GPA Calculator";
const CALCULATOR_CATEGORY = "everyday";

// =============================================================================
// TYPES
// =============================================================================
type CalculationMode = "semester" | "cumulative" | "targetGPA";
type GradeScale = "4.0" | "4.3" | "percentage";

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

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

const GRADE_OPTIONS = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function GPACalculatorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const [calculationMode, setCalculationMode] = useState<CalculationMode>("semester");
  const [gradeScale, setGradeScale] = useState<GradeScale>("4.0");
  
  // Courses for semester GPA
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Course 1", grade: "A", credits: 3 },
    { id: "2", name: "Course 2", grade: "B+", credits: 3 },
    { id: "3", name: "Course 3", grade: "A-", credits: 4 },
    { id: "4", name: "Course 4", grade: "B", credits: 3 },
  ]);
  
  // Cumulative GPA inputs
  const [currentGPA, setCurrentGPA] = useState(3.5);
  const [currentCredits, setCurrentCredits] = useState(60);
  
  // Target GPA inputs
  const [targetGPA, setTargetGPA] = useState(3.7);
  const [remainingCredits, setRemainingCredits] = useState(30);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - UI
  // ─────────────────────────────────────────────────────────────────────────────
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // TRACKING
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorSlug: CALCULATOR_SLUG,
        language: locale,
        type: "VIEW",
      }),
    }).catch(console.error);
  }, [locale]);

  const trackCalculation = () => {
    if (hasTrackedCalculation.current) return;
    hasTrackedCalculation.current = true;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorSlug: CALCULATOR_SLUG,
        language: locale,
        type: "CALCULATION",
      }),
    }).catch(console.error);
  };

  const handleInputChange = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T) => {
    setter(value);
    trackCalculation();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // FAVORITES
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch("/api/favorites");
        if (res.ok) {
          const data = await res.json();
          setIsFavorite(data.favorites?.some((f: { calculatorSlug: string }) => f.calculatorSlug === CALCULATOR_SLUG));
        }
      } catch {}
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        await fetch(`/api/favorites?slug=${CALCULATOR_SLUG}`, { method: "DELETE" });
        setIsFavorite(false);
      } else {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            calculatorSlug: CALCULATOR_SLUG,
            calculatorName: CALCULATOR_NAME,
            category: CALCULATOR_CATEGORY,
          }),
        });
        setIsFavorite(true);
      }
    } catch {}
    setFavoriteLoading(false);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // COURSE MANAGEMENT
  // ─────────────────────────────────────────────────────────────────────────────
  const addCourse = () => {
    const newId = String(Date.now());
    setCourses([...courses, { id: newId, name: `Course ${courses.length + 1}`, grade: "B", credits: 3 }]);
    trackCalculation();
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter((c) => c.id !== id));
      trackCalculation();
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
    trackCalculation();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CALCULATIONS
  // ─────────────────────────────────────────────────────────────────────────────
  
  const gradePoints = gradeScale === "4.3" ? GRADE_POINTS_4_3 : GRADE_POINTS_4_0;
  const maxGPA = gradeScale === "4.3" ? 4.3 : 4.0;

  // Calculate semester GPA
  const totalQualityPoints = courses.reduce((sum, course) => {
    return sum + (gradePoints[course.grade] || 0) * course.credits;
  }, 0);

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const semesterGPA = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

  // Calculate cumulative GPA (including new semester)
  const previousQualityPoints = currentGPA * currentCredits;
  const newTotalQualityPoints = previousQualityPoints + totalQualityPoints;
  const newTotalCredits = currentCredits + totalCredits;
  const cumulativeGPA = newTotalCredits > 0 ? newTotalQualityPoints / newTotalCredits : 0;

  // Calculate required GPA for target
  const totalCreditsNeeded = currentCredits + remainingCredits;
  const targetQualityPoints = targetGPA * totalCreditsNeeded;
  const currentQualityPoints = currentGPA * currentCredits;
  const neededQualityPoints = targetQualityPoints - currentQualityPoints;
  const requiredGPA = remainingCredits > 0 ? neededQualityPoints / remainingCredits : 0;
  const isTargetAchievable = requiredGPA <= maxGPA && requiredGPA >= 0;

  // Get GPA classification
  const getGPAClassification = (gpa: number): { label: string; color: string } => {
    if (gpa >= 3.9) return { label: "Summa Cum Laude", color: "text-green-600" };
    if (gpa >= 3.7) return { label: "Magna Cum Laude", color: "text-green-600" };
    if (gpa >= 3.5) return { label: "Cum Laude", color: "text-blue-600" };
    if (gpa >= 3.0) return { label: "Dean's List Eligible", color: "text-blue-600" };
    if (gpa >= 2.0) return { label: "Good Standing", color: "text-amber-600" };
    return { label: "Academic Probation Risk", color: "text-red-600" };
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // SAVE TO HISTORY
  // ─────────────────────────────────────────────────────────────────────────────
  const saveToHistory = async () => {
    if (!session?.user) return;
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calculatorSlug: CALCULATOR_SLUG,
          calculatorName: CALCULATOR_NAME,
          inputs: {
            mode: calculationMode,
            courses: courses.length.toString(),
            totalCredits: totalCredits.toString(),
          },
          results: {
            semesterGPA: semesterGPA.toFixed(2),
            cumulativeGPA: cumulativeGPA.toFixed(2),
          },
        }),
      });
      if (res.ok) {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // FAQs
  // ─────────────────────────────────────────────────────────────────────────────
  const defaultFaqs = [
    {
      question: "How is GPA calculated?",
      answer: "GPA = Total Quality Points ÷ Total Credit Hours. Quality points are calculated by multiplying each course's grade points (A=4.0, B=3.0, etc.) by its credit hours, then summing them all up."
    },
    {
      question: "What's the difference between 4.0 and 4.3 scale?",
      answer: "On a 4.0 scale, both A+ and A equal 4.0. On a 4.3 scale, A+ equals 4.3, giving high achievers a slight edge. Check with your school to know which scale they use."
    },
    {
      question: "What GPA do I need for Dean's List?",
      answer: "Dean's List requirements vary by school, but typically require a 3.5+ GPA (sometimes 3.0 or 3.7). Most schools also require a minimum number of credits (usually 12+) and no failing grades."
    },
    {
      question: "How do I calculate my cumulative GPA?",
      answer: "Cumulative GPA includes all courses across all semesters. Multiply your current GPA by total credits earned, add quality points from new courses, then divide by total credits including new ones."
    },
    {
      question: "Can I raise my GPA significantly in one semester?",
      answer: "It depends on your current credits. Early in college, GPA can change significantly. With many credits, it's harder to move. For example, with 90 credits at 3.0, a perfect 4.0 semester of 15 credits only raises it to about 3.14."
    },
    {
      question: "What honors correspond to which GPA?",
      answer: "Typically: Summa Cum Laude (highest) requires 3.9+, Magna Cum Laude 3.7-3.89, Cum Laude 3.5-3.69. However, these thresholds vary by institution, so check your school's specific requirements."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const everydayCalcs = ["Tip", "Discount", "Percentage", "Age", "Date", "Unit Converter"];
  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Auto Loan", "Savings", "Credit Card Payoff"];

  // =============================================================================
  // RENDER
  // =============================================================================
  return (
    <>
      <Header />

      {/* Schema.org FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />

      <main id="main-content" className="min-h-screen bg-white pt-16">
        {/* ─────────────────────────────────────────────────────────────────────────
            HERO SECTION
        ───────────────────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-4 md:py-6">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-600 mb-6">
              <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span className="text-slate-400" aria-hidden="true">/</span>
              <Link href={`/${locale}/calculators`} className="hover:text-blue-600 transition-colors">
                Calculators
              </Link>
              <span className="text-slate-400" aria-hidden="true">/</span>
              <span className="text-slate-900 font-medium" aria-current="page">GPA Calculator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="GPA Calculator icon"
              >
                🎓
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">GPA Calculator</h1>
                <p className="text-slate-600 mt-1">Calculate semester, cumulative, and target GPA</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────────
            CALCULATOR SECTION
        ───────────────────────────────────────────────────────────────────────── */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* ═══════════════════════════════════════════════════════════════════
                  LEFT COLUMN - INPUTS
              ═══════════════════════════════════════════════════════════════════ */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Grade Details</h2>
                  <button
                    onClick={toggleFavorite}
                    disabled={favoriteLoading}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    aria-pressed={isFavorite}
                  >
                    {isFavorite ? (
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Grade Scale */}
                <div className="mb-6">
                  <label id="scale-label" className="block font-medium text-slate-700 mb-2">
                    Grade Scale
                  </label>
                  <div role="radiogroup" aria-labelledby="scale-label" className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleInputChange(setGradeScale, "4.0")}
                      role="radio"
                      aria-checked={gradeScale === "4.0"}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        gradeScale === "4.0"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      4.0 Scale (A+ = 4.0)
                    </button>
                    <button
                      onClick={() => handleInputChange(setGradeScale, "4.3")}
                      role="radio"
                      aria-checked={gradeScale === "4.3"}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        gradeScale === "4.3"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      4.3 Scale (A+ = 4.3)
                    </button>
                  </div>
                </div>

                {/* Calculation Mode */}
                <div className="mb-6">
                  <label id="calc-mode-label" className="block font-medium text-slate-700 mb-2">
                    Calculate
                  </label>
                  <div role="radiogroup" aria-labelledby="calc-mode-label" className="grid grid-cols-3 gap-2">
                    {[
                      { key: "semester", label: "Semester", icon: "📚" },
                      { key: "cumulative", label: "Cumulative", icon: "📊" },
                      { key: "targetGPA", label: "Target GPA", icon: "🎯" },
                    ].map(({ key, label, icon }) => (
                      <button
                        key={key}
                        onClick={() => handleInputChange(setCalculationMode, key as CalculationMode)}
                        role="radio"
                        aria-checked={calculationMode === key}
                        className={`p-3 rounded-xl border text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          calculationMode === key
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-xl block">{icon}</span>
                        <span className="text-xs font-medium text-slate-700">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* Courses List */}
                {(calculationMode === "semester" || calculationMode === "cumulative") && (
                  <>
                    <h3 className="font-medium text-slate-700 mb-3">Current Semester Courses</h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {courses.map((course, index) => (
                        <div key={course.id} className="flex gap-2 items-center p-3 bg-slate-50 rounded-xl">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={course.name}
                              onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                              className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none"
                              placeholder="Course name"
                            />
                          </div>
                          <select
                            value={course.grade}
                            onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                            className="px-2 py-1 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500"
                          >
                            {GRADE_OPTIONS.map((grade) => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                          <input
                            type="number"
                            min="1"
                            max="6"
                            value={course.credits}
                            onChange={(e) => updateCourse(course.id, "credits", Math.max(1, Math.min(6, parseInt(e.target.value) || 1)))}
                            className="w-14 px-2 py-1 border border-slate-300 rounded-lg text-sm text-center focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-xs text-slate-600">cr</span>
                          <button
                            onClick={() => removeCourse(course.id)}
                            className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                            disabled={courses.length <= 1}
                            aria-label="Remove course"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={addCourse}
                      className="mt-3 w-full py-2 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                    >
                      + Add Course
                    </button>
                  </>
                )}

                {/* Cumulative GPA inputs */}
                {calculationMode === "cumulative" && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <h3 className="font-medium text-blue-800 mb-3">Previous Academic Record</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="current-gpa" className="block text-sm font-medium text-blue-700 mb-1">
                          Current GPA
                        </label>
                        <input
                          id="current-gpa"
                          type="number"
                          min="0"
                          max={maxGPA}
                          step="0.01"
                          value={currentGPA}
                          onChange={(e) => handleInputChange(setCurrentGPA, Math.max(0, Math.min(maxGPA, parseFloat(e.target.value) || 0)))}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="current-credits" className="block text-sm font-medium text-blue-700 mb-1">
                          Credits Earned
                        </label>
                        <input
                          id="current-credits"
                          type="number"
                          min="0"
                          max="200"
                          value={currentCredits}
                          onChange={(e) => handleInputChange(setCurrentCredits, Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Target GPA inputs */}
                {calculationMode === "targetGPA" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="target-current-gpa" className="block font-medium text-slate-700 mb-2">
                          Current GPA
                        </label>
                        <input
                          id="target-current-gpa"
                          type="number"
                          min="0"
                          max={maxGPA}
                          step="0.01"
                          value={currentGPA}
                          onChange={(e) => handleInputChange(setCurrentGPA, Math.max(0, Math.min(maxGPA, parseFloat(e.target.value) || 0)))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="target-current-credits" className="block font-medium text-slate-700 mb-2">
                          Credits Completed
                        </label>
                        <input
                          id="target-current-credits"
                          type="number"
                          min="0"
                          max="200"
                          value={currentCredits}
                          onChange={(e) => handleInputChange(setCurrentCredits, Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="target-gpa" className="block font-medium text-slate-700 mb-2">
                          Target GPA
                        </label>
                        <input
                          id="target-gpa"
                          type="number"
                          min="0"
                          max={maxGPA}
                          step="0.01"
                          value={targetGPA}
                          onChange={(e) => handleInputChange(setTargetGPA, Math.max(0, Math.min(maxGPA, parseFloat(e.target.value) || 0)))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="remaining-credits" className="block font-medium text-slate-700 mb-2">
                          Remaining Credits
                        </label>
                        <input
                          id="remaining-credits"
                          type="number"
                          min="1"
                          max="100"
                          value={remainingCredits}
                          onChange={(e) => handleInputChange(setRemainingCredits, Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ═══════════════════════════════════════════════════════════════════
                  RIGHT COLUMN - RESULTS
              ═══════════════════════════════════════════════════════════════════ */}
              <div>
                {/* Main Result */}
                <div 
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4"
                  role="region"
                  aria-label="GPA Calculator Results"
                  aria-live="polite"
                >
                  {calculationMode === "semester" && (
                    <>
                      <p className="text-sm text-slate-600 mb-1">Semester GPA</p>
                      <p className="text-4xl md:text-5xl font-bold text-slate-900">{semesterGPA.toFixed(2)}</p>
                      <p className={`font-semibold mt-2 ${getGPAClassification(semesterGPA).color}`}>
                        {getGPAClassification(semesterGPA).label}
                      </p>
                    </>
                  )}

                  {calculationMode === "cumulative" && (
                    <>
                      <p className="text-sm text-slate-600 mb-1">New Cumulative GPA</p>
                      <p className="text-4xl md:text-5xl font-bold text-slate-900">{cumulativeGPA.toFixed(2)}</p>
                      <p className={`font-semibold mt-2 ${getGPAClassification(cumulativeGPA).color}`}>
                        {getGPAClassification(cumulativeGPA).label}
                      </p>
                    </>
                  )}

                  {calculationMode === "targetGPA" && (
                    <>
                      <p className="text-sm text-slate-600 mb-1">Required GPA</p>
                      <p className={`text-4xl md:text-5xl font-bold ${isTargetAchievable ? "text-slate-900" : "text-red-600"}`}>
                        {requiredGPA.toFixed(2)}
                      </p>
                      <p className={`font-semibold mt-2 ${isTargetAchievable ? "text-green-600" : "text-red-600"}`}>
                        {isTargetAchievable 
                          ? `Achievable! Need ${requiredGPA.toFixed(2)} GPA over ${remainingCredits} credits`
                          : `Not achievable - would require ${requiredGPA.toFixed(2)} GPA (above ${maxGPA} max)`
                        }
                      </p>
                    </>
                  )}
                  
                  {/* Breakdown */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Total Credits</span>
                      <span className="font-medium text-slate-800">
                        {calculationMode === "cumulative" ? newTotalCredits : totalCredits}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Quality Points</span>
                      <span className="font-medium text-slate-800">
                        {calculationMode === "cumulative" ? newTotalQualityPoints.toFixed(1) : totalQualityPoints.toFixed(1)}
                      </span>
                    </div>
                    {calculationMode === "cumulative" && (
                      <>
                        <div className="border-t border-slate-200 my-2"></div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Semester GPA</span>
                          <span className="font-bold text-blue-600">{semesterGPA.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Grade Distribution */}
                {(calculationMode === "semester" || calculationMode === "cumulative") && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                    <h3 className="font-bold text-slate-900 mb-4">📊 Grade Distribution</h3>
                    <div className="space-y-2">
                      {courses.map((course) => {
                        const points = gradePoints[course.grade] || 0;
                        const percentage = (points / maxGPA) * 100;
                        return (
                          <div key={course.id} className="flex items-center gap-3">
                            <span className="w-20 text-sm text-slate-600 truncate">{course.name}</span>
                            <div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="w-8 text-sm font-bold text-blue-600">{course.grade}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Grade Scale Reference */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                  <h3 className="font-bold text-slate-900 mb-4">📋 Grade Points Reference</h3>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    {Object.entries(gradePoints).slice(0, 12).map(([grade, points]) => (
                      <div key={grade} className="bg-slate-50 rounded-lg p-2 text-center">
                        <span className="font-bold text-blue-600">{grade}</span>
                        <span className="text-slate-600 ml-1">= {points}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export Buttons */}
                <div className={`grid ${session?.user ? "grid-cols-3" : "grid-cols-2"} gap-3`}>
                  {session?.user && (
                    <button
                      onClick={saveToHistory}
                      disabled={saveStatus === "saving"}
                      className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {saveStatus === "saving" ? <>⏳ Saving...</> : saveStatus === "saved" ? <>✅ Saved!</> : <>💾 Save</>}
                    </button>
                  )}
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors">
                    📄 PDF <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors">
                    📊 Excel <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                </div>
              </div>
            </div>

            {/* AdBlock Bottom */}
            <div className="mt-8">
              <AdBlock slot="calculator-bottom" />
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
                INFO CARDS
            ═══════════════════════════════════════════════════════════════════ */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">🎓 Latin Honors</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex justify-between">
                    <span>Summa Cum Laude</span>
                    <span className="font-medium text-green-600">3.9+ GPA</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Magna Cum Laude</span>
                    <span className="font-medium text-green-600">3.7 - 3.89 GPA</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Cum Laude</span>
                    <span className="font-medium text-blue-600">3.5 - 3.69 GPA</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Dean&apos;s List</span>
                    <span className="font-medium text-blue-600">3.5+ (varies)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 GPA Tips</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Higher credit courses impact GPA more</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Retaking failed courses can replace grades</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Early semesters have more GPA impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Pass/Fail courses don&apos;t affect GPA</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────────
            EDUCATIONAL CONTENT + SIDEBAR
        ───────────────────────────────────────────────────────────────────────── */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding GPA</h2>
                  <p className="text-slate-600 mb-4">
                    Grade Point Average (GPA) is a standardized way of measuring academic achievement in the United States. It&apos;s calculated by converting letter grades to numbers, weighting them by credit hours, and averaging the result.
                  </p>
                  <p className="text-slate-600">
                    Your GPA matters for scholarships, graduate school admissions, and some employers. While a high GPA opens doors, remember that it&apos;s just one measure of success—skills, experience, and character matter too.
                  </p>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <details key={index} className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-slate-50 rounded-xl hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                          <svg className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <p className="text-slate-600 p-4 pt-2">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <AdBlock slot="calculator-sidebar" />

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">🧮</span>
                    Everyday Calculators
                  </h3>
                  <div className="space-y-2">
                    {everydayCalcs.map((calc) => (
                      <Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">
                        {calc} Calculator
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💰</span>
                    Financial Calculators
                  </h3>
                  <div className="space-y-2">
                    {financeCalcs.map((calc) => (
                      <Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">
                        {calc} Calculator
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                  <h3 className="font-bold mb-2">📊 Percentage Calculator</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Calculate percentages, increases, and changes.
                  </p>
                  <Link href={`/${locale}/percentage-calculator`} className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    Try Percentage Calculator →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
