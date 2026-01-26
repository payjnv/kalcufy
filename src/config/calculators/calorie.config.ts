import { CalculatorConfig, CalculatorData, CalculatorResults } from '@/types/calculator.types';
import { calculateCalories, calculateMacros, ActivityLevel } from '@/lib/formulas/health';
import { normalizeWeight, normalizeHeight } from '@/lib/utils/units';

// Calorie Calculator Configuration
export const calorieCalculatorConfig: CalculatorConfig = {
  slug: 'calorie-calculator',
  version: '1.0.0',
  category: 'health',
  translationKey: 'calorie',
  icon: '🔥',
  color: 'orange',
  premium: false,
  popular: true,
  new: false,
  
  inputs: [
    {
      id: 'gender',
      type: 'radio',
      required: true,
      options: [
        { value: 'male', labelKey: 'inputs.gender.options.male' },
        { value: 'female', labelKey: 'inputs.gender.options.female' },
      ],
      defaultValue: 'male',
    },
    {
      id: 'age',
      type: 'number',
      required: true,
      min: 15,
      max: 100,
      step: 1,
      validation: ['required', 'age'],
    },
    {
      id: 'weight',
      type: 'unit-input',
      required: true,
      min: 30,
      max: 300,
      step: 0.1,
      units: ['kg', 'lb'],
      defaultUnit: 'kg',
      validation: ['required', 'weight'],
    },
    {
      id: 'height',
      type: 'unit-input',
      required: true,
      min: 100,
      max: 250,
      step: 1,
      units: ['cm', 'in', 'ft'],
      defaultUnit: 'cm',
      validation: ['required', 'height'],
    },
    {
      id: 'activityLevel',
      type: 'select',
      required: true,
      options: [
        { value: 'sedentary', labelKey: 'inputs.activityLevel.options.sedentary' },
        { value: 'light', labelKey: 'inputs.activityLevel.options.light' },
        { value: 'moderate', labelKey: 'inputs.activityLevel.options.moderate' },
        { value: 'active', labelKey: 'inputs.activityLevel.options.active' },
        { value: 'veryActive', labelKey: 'inputs.activityLevel.options.veryActive' },
      ],
      defaultValue: 'moderate',
    },
    {
      id: 'goal',
      type: 'select',
      required: true,
      options: [
        { value: 'lose', labelKey: 'inputs.goal.options.lose' },
        { value: 'maintain', labelKey: 'inputs.goal.options.maintain' },
        { value: 'gain', labelKey: 'inputs.goal.options.gain' },
      ],
      defaultValue: 'maintain',
    },
    {
      id: 'formula',
      type: 'select',
      required: false,
      options: [
        { value: 'mifflin', labelKey: 'inputs.formula.options.mifflin' },
        { value: 'harris', labelKey: 'inputs.formula.options.harris' },
      ],
      defaultValue: 'mifflin',
      group: 'advanced',
    },
  ],
  
  inputGroups: [
    {
      id: 'advanced',
      labelKey: 'inputGroups.advanced.label',
      collapsible: true,
      defaultCollapsed: true,
    },
  ],
  
  results: [
    {
      id: 'dailyCalories',
      type: 'number',
      primary: true,
      format: { type: 'number', decimals: 0, suffix: ' kcal' },
    },
    {
      id: 'bmr',
      type: 'number',
      format: { type: 'number', decimals: 0, suffix: ' kcal' },
    },
    {
      id: 'tdee',
      type: 'number',
      format: { type: 'number', decimals: 0, suffix: ' kcal' },
    },
    {
      id: 'protein',
      type: 'number',
      format: { type: 'number', decimals: 0, suffix: 'g' },
    },
    {
      id: 'carbs',
      type: 'number',
      format: { type: 'number', decimals: 0, suffix: 'g' },
    },
    {
      id: 'fat',
      type: 'number',
      format: { type: 'number', decimals: 0, suffix: 'g' },
    },
    {
      id: 'weeklyChange',
      type: 'text',
      format: { type: 'text' },
      badge: true,
    },
  ],
  
  education: [
    { id: 'whatIs', titleKey: 'education.sections.whatIs.title', contentKey: 'education.sections.whatIs.content' },
    { id: 'bmrTdee', titleKey: 'education.sections.bmrTdee.title', contentKey: 'education.sections.bmrTdee.content' },
    { id: 'macros', titleKey: 'education.sections.macros.title', contentKey: 'education.sections.macros.content' },
    { id: 'tips', titleKey: 'education.sections.tips.title', contentKey: 'education.sections.tips.content' },
  ],
  
  faq: [
    { questionKey: 'faq.items.0.question', answerKey: 'faq.items.0.answer' },
    { questionKey: 'faq.items.1.question', answerKey: 'faq.items.1.answer' },
    { questionKey: 'faq.items.2.question', answerKey: 'faq.items.2.answer' },
    { questionKey: 'faq.items.3.question', answerKey: 'faq.items.3.answer' },
    { questionKey: 'faq.items.4.question', answerKey: 'faq.items.4.answer' },
  ],
  
  relatedCalculators: [
    'bmi-calculator',
    'ideal-weight-calculator',
    'body-fat-calculator',
    'macro-calculator',
  ],
  
  seo: {
    keywords: ['calorie calculator', 'TDEE calculator', 'BMR calculator', 'weight loss calories', 'macro calculator'],
  },
};

// Calorie Calculator Function
export function calculateCalorieResults(data: CalculatorData): CalculatorResults {
  // Normalize inputs
  const weightKg = normalizeWeight(data.weight as number, data.weight_unit as string || 'kg');
  const heightCm = normalizeHeight(data.height as number, data.height_unit as string || 'cm');
  const age = data.age as number;
  const gender = data.gender as 'male' | 'female';
  const activityLevel = data.activityLevel as ActivityLevel;
  const goal = data.goal as 'lose' | 'maintain' | 'gain';
  const formula = (data.formula as 'mifflin' | 'harris') || 'mifflin';
  
  // Calculate calories
  const calorieResults = calculateCalories(
    weightKg,
    heightCm,
    age,
    gender,
    activityLevel,
    formula
  );
  
  // Determine daily calories based on goal
  let dailyCalories: number;
  let weeklyChange: string;
  
  switch (goal) {
    case 'lose':
      dailyCalories = calorieResults.weightLoss.moderate; // 500 cal deficit
      weeklyChange = '-0.5 kg/week';
      break;
    case 'gain':
      dailyCalories = calorieResults.weightGain.moderate; // 500 cal surplus
      weeklyChange = '+0.5 kg/week';
      break;
    default:
      dailyCalories = calorieResults.maintenance;
      weeklyChange = 'Maintain';
  }
  
  // Calculate macros for target calories
  const macros = calculateMacros(dailyCalories, weightKg);
  
  return {
    dailyCalories,
    bmr: calorieResults.bmr,
    tdee: calorieResults.maintenance,
    protein: macros.protein.grams,
    carbs: macros.carbs.grams,
    fat: macros.fat.grams,
    weeklyChange,
  };
}

// Export calculator
export const calorieCalculator = {
  config: calorieCalculatorConfig,
  calculate: calculateCalorieResults,
};
