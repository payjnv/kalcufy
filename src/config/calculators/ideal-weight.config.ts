/**
 * Ideal Weight Calculator Configuration
 * Config-driven calculator for calculating ideal body weight using multiple formulas
 */

import type { CalculatorConfig, CalculatorData, CalculatorResults } from '@/types/calculator.types';
import { calculateIdealWeight, getBMICategory, type Gender } from '@/lib/formulas/health';
import { normalizeHeight } from '@/lib/utils/units';

// ============================================================================
// CALCULATOR CONFIGURATION
// ============================================================================

export const idealWeightConfig: CalculatorConfig = {
  id: 'ideal-weight-calculator',
  slug: 'ideal-weight-calculator',
  category: 'health',
  icon: '⚖️',
  
  // SEO Configuration
  seo: {
    title: 'Ideal Weight Calculator',
    description: 'Calculate your ideal body weight using multiple scientific formulas including Devine, Robinson, Miller, and Hamwi methods. Free, accurate, and easy to use.',
    keywords: ['ideal weight', 'body weight calculator', 'healthy weight', 'BMI', 'Devine formula', 'weight calculator'],
  },
  
  // Badges
  badges: ['popular'],
  
  // Input Fields Configuration
  inputs: [
    {
      id: 'gender',
      type: 'radio',
      label: 'Gender',
      required: true,
      defaultValue: 'male',
      options: [
        { value: 'male', label: 'Male', icon: '👨' },
        { value: 'female', label: 'Female', icon: '👩' },
      ],
      helpText: 'Biological sex affects ideal weight calculations',
      width: 'full',
    },
    {
      id: 'height',
      type: 'unit-input',
      label: 'Height',
      required: true,
      defaultValue: 170,
      min: 100,
      max: 250,
      step: 1,
      placeholder: 'Enter your height',
      helpText: 'Your current height',
      units: [
        { value: 'cm', label: 'cm' },
        { value: 'in', label: 'inches' },
        { value: 'ft', label: 'feet' },
      ],
      defaultUnit: 'cm',
      width: 'full',
      validation: {
        rules: ['positive', 'height'],
        messages: {
          required: 'Please enter your height',
          min: 'Height must be at least 100 cm',
          max: 'Height cannot exceed 250 cm',
        },
      },
    },
    {
      id: 'age',
      type: 'number',
      label: 'Age',
      required: false,
      defaultValue: 30,
      min: 18,
      max: 120,
      step: 1,
      placeholder: 'Enter your age',
      helpText: 'Optional: helps provide age-specific recommendations',
      suffix: 'years',
      width: 'half',
      validation: {
        rules: ['integer', 'age'],
      },
    },
    {
      id: 'frame',
      type: 'select',
      label: 'Body Frame',
      required: false,
      defaultValue: 'medium',
      options: [
        { value: 'small', label: 'Small frame' },
        { value: 'medium', label: 'Medium frame' },
        { value: 'large', label: 'Large frame' },
      ],
      helpText: 'Your body frame size (wrist circumference can help determine this)',
      width: 'half',
    },
  ],
  
  // Result Fields Configuration
  results: [
    {
      id: 'average',
      type: 'primary',
      label: 'Ideal Weight',
      format: 'number',
      decimals: 1,
      suffix: 'kg',
      icon: '🎯',
      colorCategory: 'success',
      description: 'Average of all formula results',
    },
    {
      id: 'range',
      type: 'range',
      label: 'Healthy Weight Range',
      format: 'number',
      decimals: 1,
      suffix: 'kg',
      colorCategory: 'info',
    },
    {
      id: 'devine',
      type: 'secondary',
      label: 'Devine Formula',
      format: 'number',
      decimals: 1,
      suffix: 'kg',
      description: 'Most commonly used in medical settings',
    },
    {
      id: 'robinson',
      type: 'secondary',
      label: 'Robinson Formula',
      format: 'number',
      decimals: 1,
      suffix: 'kg',
      description: 'Modified Devine formula (1983)',
    },
    {
      id: 'miller',
      type: 'secondary',
      label: 'Miller Formula',
      format: 'number',
      decimals: 1,
      suffix: 'kg',
      description: 'Another 1983 modification',
    },
    {
      id: 'hamwi',
      type: 'secondary',
      label: 'Hamwi Formula',
      format: 'number',
      decimals: 1,
      suffix: 'kg',
      description: 'Original 1964 formula',
    },
    {
      id: 'bmiCategory',
      type: 'badge',
      label: 'Based on BMI 18.5-24.9',
      format: 'text',
    },
  ],
  
  // Educational Content
  education: {
    title: 'Understanding Ideal Weight',
    sections: [
      {
        title: 'What is Ideal Body Weight?',
        content: 'Ideal body weight (IBW) is a weight that is believed to be maximally healthy for a person, based on height. It is used in medicine as a reference for drug dosage calculations and as a general health guideline.',
      },
      {
        title: 'The Formulas Explained',
        content: 'We use four scientifically validated formulas to calculate ideal weight. The Devine formula (1974) is most commonly used in clinical settings. Robinson and Miller formulas (1983) are modifications that account for different body compositions. The Hamwi formula (1964) is the original calculation method.',
      },
      {
        title: 'Limitations',
        content: 'These formulas do not account for muscle mass, bone density, age, or ethnicity. Athletes or muscular individuals may have a higher "ideal" weight. Always consult a healthcare provider for personalized advice.',
      },
    ],
  },
  
  // FAQ Section (Schema.org ready)
  faqs: [
    {
      question: 'How accurate is the ideal weight calculator?',
      answer: 'Our calculator uses four scientifically validated formulas to provide a range of ideal weights. However, ideal weight varies based on factors like muscle mass, bone density, and body composition that these formulas cannot account for. Use the results as a general guideline.',
    },
    {
      question: 'Which formula should I use?',
      answer: 'The Devine formula is most commonly used in medical settings. However, we recommend looking at the average of all formulas and the BMI-based range for the most balanced view of your ideal weight.',
    },
    {
      question: 'Does age affect ideal weight?',
      answer: 'These traditional formulas do not directly factor in age. However, body composition naturally changes with age. Older adults may benefit from maintaining a slightly higher weight for better health outcomes.',
    },
    {
      question: 'How is the healthy weight range calculated?',
      answer: 'The healthy weight range is based on BMI values between 18.5 and 24.9, which are considered normal by the World Health Organization (WHO).',
    },
    {
      question: 'What if my weight is outside the ideal range?',
      answer: 'If your current weight differs significantly from the calculated ideal, consult a healthcare provider before making major changes. Gradual changes of 0.5-1 kg per week are generally considered safe.',
    },
  ],
  
  // Related Calculators
  relatedCalculators: [
    'bmi-calculator',
    'calorie-calculator',
    'body-fat-calculator',
    'bmr-calculator',
  ],
  
  // Feature Flags
  features: {
    autoCalculate: true,
    exportPDF: true,
    exportImage: true,
    shareResults: true,
    saveHistory: true,
    favorites: true,
  },
};

// ============================================================================
// CALCULATION FUNCTION
// ============================================================================

export function calculateIdealWeightResults(data: CalculatorData): CalculatorResults {
  // Get values from data
  const gender = data.values.gender as Gender;
  const heightValue = data.values.height as number;
  const heightUnit = data.units?.height || 'cm';
  
  // Normalize height to cm for calculations
  const heightCm = normalizeHeight(heightValue, heightUnit);
  
  // Calculate ideal weights using all formulas
  const results = calculateIdealWeight(heightCm, gender);
  
  // Apply frame size adjustment (-10% for small, +10% for large)
  const frame = data.values.frame as string;
  let frameMultiplier = 1;
  if (frame === 'small') frameMultiplier = 0.9;
  if (frame === 'large') frameMultiplier = 1.1;
  
  // Return calculation results
  return {
    values: {
      average: results.average * frameMultiplier,
      devine: results.devine * frameMultiplier,
      robinson: results.robinson * frameMultiplier,
      miller: results.miller * frameMultiplier,
      hamwi: results.hamwi * frameMultiplier,
      rangeMin: results.bmiMethod.min,
      rangeMax: results.bmiMethod.max,
    },
    formatted: {
      average: `${(results.average * frameMultiplier).toFixed(1)} kg`,
      range: `${results.bmiMethod.min.toFixed(1)} - ${results.bmiMethod.max.toFixed(1)} kg`,
      devine: `${(results.devine * frameMultiplier).toFixed(1)} kg`,
      robinson: `${(results.robinson * frameMultiplier).toFixed(1)} kg`,
      miller: `${(results.miller * frameMultiplier).toFixed(1)} kg`,
      hamwi: `${(results.hamwi * frameMultiplier).toFixed(1)} kg`,
      bmiCategory: 'Based on BMI 18.5-24.9',
    },
    summary: `Your ideal weight is approximately ${(results.average * frameMultiplier).toFixed(1)} kg based on your height of ${heightCm.toFixed(0)} cm. The healthy weight range for your height is ${results.bmiMethod.min.toFixed(1)} - ${results.bmiMethod.max.toFixed(1)} kg.`,
    isValid: true,
  };
}

// ============================================================================
// EXPORT COMPLETE CALCULATOR
// ============================================================================

export const idealWeightCalculator = {
  config: idealWeightConfig,
  calculate: calculateIdealWeightResults,
};

export default idealWeightCalculator;
