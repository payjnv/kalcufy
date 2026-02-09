import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const idealWeightConfig: CalculatorConfigV3 = {
  id: "ideal-weight",
  slug: "ideal-weight-calculator",
  name: "Ideal Weight Calculator",
  category: "health",
  icon: "⚖️",
  seo: {
    title: "Ideal Weight Calculator - Find Your Healthy Weight Range",
    description: "Calculate your ideal body weight using multiple scientific formulas (Robinson, Miller, Devine, Hamwi). Adjust for frame size and build type to find your personalized healthy weight range.",
    shortDescription: "Calculate your ideal body weight using 5 scientific formulas",
    keywords: ["ideal weight", "IBW", "healthy weight", "Robinson formula", "body weight calculator", "ideal body weight"],
  },
  hero: { badge: "Health", rating: { average: 4.8, count: 12500 } },
  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "Imperial (lb, in)" },
      { value: "metric", label: "Metric (kg, cm)" },
    ],
  },
  inputs: [
    { id: "gender", type: "radio", label: "Biological Sex", required: true, defaultValue: "male", options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }], width: "full" },
    { id: "age", type: "slider", label: "Age", required: true, defaultValue: 30, min: 18, max: 80, suffix: "years", width: "full" },
    // Imperial inputs
    { id: "heightFeet", type: "number", label: "Height (feet)", required: true, defaultValue: 5, min: 4, max: 7, suffix: "ft", width: "half", showWhen: { field: "unitSystem", value: "imperial" } },
    { id: "heightInches", type: "number", label: "Height (inches)", required: true, defaultValue: 10, min: 0, max: 11, suffix: "in", width: "half", showWhen: { field: "unitSystem", value: "imperial" } },
    { id: "currentWeight", type: "slider", label: "Current Weight", required: true, defaultValue: 180, min: 88, max: 440, suffix: "lbs", width: "full", showWhen: { field: "unitSystem", value: "imperial" } },
    // Metric inputs
    { id: "heightCm", type: "number", label: "Height", required: true, defaultValue: 175, min: 120, max: 220, suffix: "cm", width: "full", showWhen: { field: "unitSystem", value: "metric" } },
    { id: "currentWeightKg", type: "slider", label: "Current Weight", required: true, defaultValue: 80, min: 40, max: 200, suffix: "kg", width: "full", showWhen: { field: "unitSystem", value: "metric" } },
    // Common inputs
    { id: "buildType", type: "radio", label: "Build Type", defaultValue: "average", options: [{ value: "lean", label: "Lean", description: "Minimal muscle" }, { value: "average", label: "Average", description: "Typical" }, { value: "athletic", label: "Athletic", description: "Active" }, { value: "muscular", label: "Muscular", description: "High muscle" }], width: "full" },
    { id: "frameSize", type: "radio", label: "Frame Size", defaultValue: "medium", options: [{ value: "small", label: "Small" }, { value: "medium", label: "Medium" }, { value: "large", label: "Large" }], width: "full" },
    // Advanced Options inputs
    { id: "wristCircumference", type: "number", label: "Wrist Circumference", defaultValue: 7, min: 5, max: 9, step: 0.1, suffix: "in", width: "full" },
    { id: "manualFrameSize", type: "radio", label: "Or Select Frame Size Manually", defaultValue: "", options: [{ value: "small", label: "Small" }, { value: "medium", label: "Medium" }, { value: "large", label: "Large" }], width: "full" },
    { id: "weightLossRate", type: "slider", label: "Weight Change Rate", defaultValue: 1, min: 0.5, max: 2, step: 0.5, suffix: "lb/week", width: "full" },
  ],
  inputGroups: [
    { id: "advanced", title: "Advanced Options", inputs: ["wristCircumference", "manualFrameSize", "weightLossRate"], defaultExpanded: false }
  ],
  results: [
    { id: "idealWeight", type: "primary", label: "Your Ideal Weight (Average)", format: "number", decimals: 0, suffix: "lbs", icon: "⚖️" },
    { id: "healthyRange", type: "secondary", label: "Healthy Range", format: "text" },
    { id: "weightDifference", type: "secondary", label: "Weight to Lose/Gain", format: "text" },
    { id: "timeline", type: "secondary", label: "Timeline", format: "text" },
  ],
  educationSections: [
    { 
      id: "aboutFormulas", 
      type: "cards", 
      title: "About the Formulas", 
      icon: "📐", 
      cards: [
        { title: "Robinson (1983)", description: "Most commonly used in clinical settings for drug dosage calculations", icon: "🔬" }, 
        { title: "Miller (1983)", description: "Tends to give lower estimates, better suited for smaller frames", icon: "📊" }, 
        { title: "Devine (1974)", description: "Original medical formula, still widely referenced in healthcare", icon: "💊" }, 
        { title: "Hamwi (1964)", description: "The first ideal weight formula ever developed", icon: "📜" }
      ] 
    },
    { 
      id: "considerations", 
      type: "list", 
      title: "Important Considerations", 
      icon: "⚠️", 
      items: [
        { text: "These are estimates - individual healthy weights vary significantly based on many factors", type: "warning" }, 
        { text: "Athletes and bodybuilders may exceed ideal weights due to higher muscle mass", type: "info" }, 
        { text: "Body fat percentage is often more meaningful than weight alone for health assessment", type: "info" }, 
        { text: "Consult a healthcare provider for personalized medical advice", type: "warning" }, 
        { text: "Frame size and bone density significantly affect your natural weight range", type: "info" },
        { text: "Age-related changes in body composition are normal and expected", type: "info" }
      ] 
    },
    { 
      id: "exampleCalculation", 
      type: "code-example", 
      title: "Example Calculation", 
      icon: "📊", 
      description: "30-year-old male, 5'10\" (70 inches), medium frame, average build", 
      background: "slate", 
      columns: 2, 
      examples: [
        { 
          title: "Robinson Formula", 
          steps: [
            "Base = 52 kg (for 5 feet)",
            "+ 1.9 kg × 10 inches = 19 kg",
            "Total = 71 kg"
          ],
          result: "Ideal = 71 kg (157 lbs)"
        }, 
        { 
          title: "Devine Formula", 
          steps: [
            "Base = 50 kg (for 5 feet)",
            "+ 2.3 kg × 10 inches = 23 kg",
            "Total = 73 kg"
          ],
          result: "Ideal = 73 kg (161 lbs)"
        }
      ] 
    },
    { 
      id: "whatIs", 
      type: "prose", 
      title: "What is Ideal Body Weight?", 
      content: "Ideal body weight (IBW) is a theoretical weight that is associated with the lowest risk of health problems for a person of a given height. However, it's important to understand that IBW formulas were originally developed for calculating medication dosages in clinical settings, not for determining aesthetic or fitness goals. The concept has evolved over time to become a general health reference point." 
    },
    { 
      id: "whyDifferent", 
      type: "prose", 
      title: "Why Do Formulas Give Different Results?", 
      content: "Each formula was developed by different researchers for different purposes and populations. The Robinson and Miller formulas modified Devine's original work, while Hamwi predates them all. The variation between formulas actually provides a realistic range to consider rather than a single target number, which acknowledges the natural diversity in healthy body compositions." 
    },
    { 
      id: "frameSize", 
      type: "prose", 
      title: "Understanding Frame Size", 
      content: "Frame size refers to your skeletal structure—the width of your bones, particularly at joints like wrists, elbows, and shoulders. People with larger frames naturally carry more weight due to bigger bones and can support more muscle mass. Wrist circumference is a simple, reliable method to estimate frame size. For men: small (<6.5\"), medium (6.5-7.5\"), large (>7.5\"). For women: small (<6\"), medium (6-6.5\"), large (>6.5\")." 
    },
    { 
      id: "limitations", 
      type: "prose", 
      title: "Limitations of Ideal Weight Calculations", 
      content: "While helpful as general guidelines, ideal weight formulas have significant limitations. They don't account for body composition (muscle vs. fat), ethnic variations in body structure, individual metabolic differences, or personal health conditions. A person with high muscle mass might be classified as 'overweight' despite being very healthy. Always consider these calculations as one data point among many in your overall health assessment." 
    },
  ],
  references: [
    { authors: "Robinson JD, Lupkiewicz SM, et al.", year: "1983", title: "Determination of ideal body weight for drug dosage calculations", source: "American Journal of Hospital Pharmacy", url: "https://pubmed.ncbi.nlm.nih.gov/6869387/" },
    { authors: "Miller DR, et al.", year: "1983", title: "Determining ideal body weight", source: "Am J Hosp Pharm" },
    { authors: "Devine BJ", year: "1974", title: "Gentamicin therapy", source: "Drug Intell Clin Pharm" },
  ],
  faqs: [
    { question: "How accurate are ideal weight formulas?", answer: "These formulas provide estimates based on height and gender. They do not account for muscle mass, bone density, or body composition. Use them as general guidelines, not absolute targets." },
    { question: "Why do different formulas give different results?", answer: "Each formula was developed for different purposes and populations. Robinson and Miller modified Devine's original formula. The variation gives you a healthy range to consider." },
    { question: "What is frame size and why does it matter?", answer: "Frame size refers to your bone structure (small, medium, large). People with larger frames naturally weigh more due to bigger bones. Wrist circumference is a simple way to estimate frame size." },
    { question: "Should athletes use these formulas?", answer: "Athletes with significant muscle mass may exceed these ideal weights while being perfectly healthy. Consider using body fat percentage instead for a more accurate assessment." },
    { question: "What's a safe rate of weight loss?", answer: "Most health experts recommend 0.5-2 lbs (0.25-1 kg) per week. Faster weight loss can lead to muscle loss, nutritional deficiencies, and is harder to maintain long-term." },
    { question: "How do I measure my wrist for frame size?", answer: "Wrap a measuring tape around your wrist just below the wrist bone (where you'd wear a watch). Keep the tape snug but not tight. Compare to the thresholds for your gender." },
  ],
  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: true, category: "health", cta: { title: "📏 Check Your Body Fat", description: "Body fat percentage is often more meaningful than weight alone.", linkText: "Try Body Fat Calculator →", link: "/body-fat-calculator" } },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true, printResults: true },
  relatedCalculators: ["bmi-calculator", "body-fat-calculator", "calorie-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true, afterResults: true },
};

export function calculateIdealWeight(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial" }): CalculatorResults {
  const { values, unitSystem } = data;
  const gender = values.gender as string;
  const buildType = (values.buildType as string) || "average";
  const frameSize = (values.frameSize as string) || "medium";
  const weightLossRate = (values.weightLossRate as number) || 1;

  let totalInches: number;
  let currentWeight: number;

  if (unitSystem === "metric") {
    const heightCm = (values.heightCm as number) || 175;
    totalInches = heightCm / 2.54;
    currentWeight = ((values.currentWeightKg as number) || 80) * 2.20462;
  } else {
    const heightFeet = (values.heightFeet as number) || 5;
    const heightInches = (values.heightInches as number) || 10;
    totalInches = heightFeet * 12 + heightInches;
    currentWeight = (values.currentWeight as number) || 180;
  }

  const inchesOver5Feet = Math.max(0, totalInches - 60);

  const buildAdj: Record<string, number> = { lean: -0.05, average: 0, athletic: 0.05, muscular: 0.1 };
  const frameAdj: Record<string, number> = { small: -0.1, medium: 0, large: 0.1 };
  const totalAdj = 1 + (buildAdj[buildType] || 0) + (frameAdj[frameSize] || 0);

  let robinson: number, miller: number, devine: number, hamwi: number;
  if (gender === "male") {
    robinson = (52 + 1.9 * inchesOver5Feet) * totalAdj;
    miller = (56.2 + 1.41 * inchesOver5Feet) * totalAdj;
    devine = (50 + 2.3 * inchesOver5Feet) * totalAdj;
    hamwi = (48 + 2.7 * inchesOver5Feet) * totalAdj;
  } else {
    robinson = (49 + 1.7 * inchesOver5Feet) * totalAdj;
    miller = (53.1 + 1.36 * inchesOver5Feet) * totalAdj;
    devine = (45.5 + 2.3 * inchesOver5Feet) * totalAdj;
    hamwi = (45.5 + 2.2 * inchesOver5Feet) * totalAdj;
  }

  const kgToLbs = 2.20462;
  const robinsonLbs = robinson * kgToLbs;
  const millerLbs = miller * kgToLbs;
  const devineLbs = devine * kgToLbs;
  const hamwiLbs = hamwi * kgToLbs;
  const averageLbs = (robinsonLbs + millerLbs + devineLbs + hamwiLbs) / 4;

  const heightMeters = totalInches * 0.0254;
  const minHealthy = 18.5 * heightMeters * heightMeters * kgToLbs;
  const maxHealthy = 24.9 * heightMeters * heightMeters * kgToLbs;
  const bmiRangeMid = (minHealthy + maxHealthy) / 2;

  const weightDiff = currentWeight - averageLbs;
  const weeksToGoal = Math.abs(weightDiff) > 1 ? Math.ceil(Math.abs(weightDiff) / weightLossRate) : 0;

  // Format based on unit system
  const weightUnit = unitSystem === "metric" ? "kg" : "lbs";
  const displayIdealWeight = unitSystem === "metric" ? averageLbs / kgToLbs : averageLbs;
  const displayMinHealthy = unitSystem === "metric" ? minHealthy / kgToLbs : minHealthy;
  const displayMaxHealthy = unitSystem === "metric" ? maxHealthy / kgToLbs : maxHealthy;
  const displayWeightDiff = unitSystem === "metric" ? weightDiff / kgToLbs : weightDiff;

  return {
    values: { idealWeight: averageLbs, robinson: robinsonLbs, miller: millerLbs, devine: devineLbs, hamwi: hamwiLbs, bmiRange: bmiRangeMid, healthyMin: minHealthy, healthyMax: maxHealthy, weightDifference: weightDiff, weeksToGoal, currentWeight, frameSize, gender },
    formatted: {
      idealWeight: Math.round(displayIdealWeight).toString() + " " + weightUnit,
      healthyRange: `${Math.round(displayMinHealthy)} - ${Math.round(displayMaxHealthy)} ${weightUnit}`,
      weightDifference: Math.abs(displayWeightDiff) < 1 ? "At ideal! ✨" : displayWeightDiff > 0 ? `${Math.round(Math.abs(displayWeightDiff))} ${weightUnit} to lose` : `${Math.round(Math.abs(displayWeightDiff))} ${weightUnit} to gain`,
      timeline: weeksToGoal > 0 ? `~${weeksToGoal} weeks` : "You're there! 🎉",
    },
    summary: weightDiff > 5 ? `Your ideal weight is ~${Math.round(displayIdealWeight)} ${weightUnit}.` : `Great! You're within a healthy weight range.`,
    isValid: true,
    metadata: {
      formulaResults: [
        { name: "Robinson", value: unitSystem === "metric" ? robinson : robinsonLbs, description: "1983 - Most commonly used" },
        { name: "Miller", value: unitSystem === "metric" ? miller : millerLbs, description: "1983 - For smaller frames" },
        { name: "Devine", value: unitSystem === "metric" ? devine : devineLbs, description: "1974 - Medical standard" },
        { name: "Hamwi", value: unitSystem === "metric" ? hamwi : hamwiLbs, description: "1964 - Original formula" },
        { name: "BMI Range Mid", value: unitSystem === "metric" ? bmiRangeMid / kgToLbs : bmiRangeMid, description: "Based on healthy BMI" },
      ],
    },
  };
}

export default idealWeightConfig;
