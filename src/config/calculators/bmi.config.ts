/**
 * BMI Calculator Configuration
 * Config-driven calculator for calculating Body Mass Index
 */

import type { CalculatorConfig, CalculatorData, CalculatorResults } from '@/types/calculator.types';
import { calculateBMI, getBMICategory, getHealthyWeightRange, type Gender } from '@/lib/formulas/health';
import { normalizeHeight, normalizeWeight, formatWeight } from '@/lib/utils/units';

// ============================================================================
// CALCULATOR CONFIGURATION
// ============================================================================

export const bmiConfig: CalculatorConfig = {
  id: 'bmi-calculator',
  slug: 'bmi-calculator',
  category: 'health',
  icon: '📊',
  
  // SEO Configuration
  seo: {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI) instantly. Free BMI calculator with weight categories, healthy weight range, and personalized recommendations.',
    keywords: ['BMI calculator', 'body mass index', 'weight calculator', 'healthy weight', 'obesity calculator', 'BMI chart'],
  },
  
  // Badges
  badges: ['popular'],
  
  // Input Fields Configuration
  inputs: [
    {
      id: 'weight',
      type: 'unit-input',
      label: 'Weight',
      required: true,
      defaultValue: 70,
      min: 20,
      max: 500,
      step: 0.1,
      placeholder: 'Enter your weight',
      helpText: 'Your current body weight',
      units: [
        { value: 'kg', label: 'kg' },
        { value: 'lb', label: 'lb' },
        { value: 'st', label: 'stone' },
      ],
      defaultUnit: 'kg',
      width: 'full',
      validation: {
        rules: ['positive', 'weight'],
        messages: {
          required: 'Please enter your weight',
          min: 'Weight must be at least 20 kg',
          max: 'Weight cannot exceed 500 kg',
        },
      },
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
      min: 2,
      max: 120,
      step: 1,
      placeholder: 'Enter your age',
      helpText: 'Optional: provides age-specific context',
      suffix: 'years',
      width: 'half',
      validation: {
        rules: ['integer', 'age'],
      },
    },
    {
      id: 'gender',
      type: 'radio',
      label: 'Gender',
      required: false,
      defaultValue: 'male',
      options: [
        { value: 'male', label: 'Male', icon: '👨' },
        { value: 'female', label: 'Female', icon: '👩' },
      ],
      helpText: 'Optional: for additional context',
      width: 'half',
    },
  ],
  
  // Result Fields Configuration
  results: [
    {
      id: 'bmi',
      type: 'primary',
      label: 'Your BMI',
      format: 'number',
      decimals: 1,
      suffix: 'kg/m²',
      icon: '📊',
      colorCategory: 'dynamic', // Will be set based on result
      description: 'Body Mass Index',
    },
    {
      id: 'category',
      type: 'badge',
      label: 'Category',
      format: 'text',
      colorCategory: 'dynamic',
    },
    {
      id: 'healthyRange',
      type: 'range',
      label: 'Healthy Weight Range',
      format: 'number',
      decimals: 1,
      suffix: 'kg',
      colorCategory: 'success',
      description: 'Based on BMI 18.5-24.9',
    },
    {
      id: 'weightDifference',
      type: 'secondary',
      label: 'Weight to Healthy Range',
      format: 'number',
      decimals: 1,
      suffix: 'kg',
      description: 'Adjustment needed to reach healthy BMI',
    },
    {
      id: 'bmiPrime',
      type: 'secondary',
      label: 'BMI Prime',
      format: 'number',
      decimals: 2,
      description: 'Ratio to upper limit of normal BMI (25)',
    },
    {
      id: 'ponderal',
      type: 'secondary',
      label: 'Ponderal Index',
      format: 'number',
      decimals: 1,
      suffix: 'kg/m³',
      description: 'Alternative to BMI using height cubed',
    },
  ],
  
  // Educational Content
  education: {
    title: 'Understanding BMI',
    sections: [
      {
        title: 'What is BMI?',
        content: 'Body Mass Index (BMI) is a simple calculation using a person\'s height and weight. The formula is BMI = kg/m² where kg is your weight in kilograms and m² is your height in meters squared. BMI is used as a screening tool for weight categories that may lead to health problems.',
      },
      {
        title: 'BMI Categories',
        content: 'WHO classifies BMI as: Underweight (< 18.5), Normal weight (18.5-24.9), Overweight (25-29.9), Obese Class I (30-34.9), Obese Class II (35-39.9), and Obese Class III (≥ 40). These categories are associated with different health risks.',
      },
      {
        title: 'Limitations of BMI',
        content: 'BMI does not directly measure body fat or account for muscle mass, bone density, age, sex, or ethnicity. Athletes may have a high BMI due to muscle mass. Always consult healthcare professionals for comprehensive health assessments.',
      },
      {
        title: 'BMI Prime',
        content: 'BMI Prime is the ratio of your BMI to the upper limit of the normal BMI range (25). A BMI Prime of 1.0 equals BMI 25. Values below 1.0 indicate underweight or normal weight, while values above 1.0 indicate overweight or obesity.',
      },
    ],
  },
  
  // FAQ Section
  faqs: [
    {
      question: 'What is a healthy BMI range?',
      answer: 'According to the World Health Organization (WHO), a healthy BMI is between 18.5 and 24.9. This range is associated with the lowest health risks for most adults.',
    },
    {
      question: 'Is BMI accurate for athletes?',
      answer: 'BMI may overestimate body fat in athletes and muscular individuals because it cannot distinguish between muscle and fat mass. For athletes, body fat percentage or other measurements may be more appropriate.',
    },
    {
      question: 'Does BMI differ by age?',
      answer: 'The standard BMI formula applies to adults 20 and older. For children and teens, BMI is interpreted differently using age and sex-specific percentiles. For older adults, slightly higher BMI may be protective.',
    },
    {
      question: 'How often should I check my BMI?',
      answer: 'For most adults, checking BMI monthly or quarterly is sufficient. If you\'re actively working on weight management, weekly checks can help track progress, but daily weighing can be misleading due to normal fluctuations.',
    },
    {
      question: 'What should I do if my BMI is outside the normal range?',
      answer: 'If your BMI falls outside the healthy range, consider consulting a healthcare provider. They can assess other factors like body composition, waist circumference, and overall health to provide personalized recommendations.',
    },
  ],
  
  // Related Calculators
  relatedCalculators: [
    'ideal-weight-calculator',
    'calorie-calculator',
    'body-fat-calculator',
    'waist-to-hip-calculator',
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

export function calculateBMIResults(data: CalculatorData): CalculatorResults {
  // Get values from data
  const weightValue = data.values.weight as number;
  const heightValue = data.values.height as number;
  const weightUnit = data.units?.weight || 'kg';
  const heightUnit = data.units?.height || 'cm';
  
  // Normalize to metric for calculations
  const weightKg = normalizeWeight(weightValue, weightUnit);
  const heightCm = normalizeHeight(heightValue, heightUnit);
  const heightM = heightCm / 100;
  
  // Calculate BMI
  const bmi = calculateBMI(weightKg, heightCm);
  const category = getBMICategory(bmi);
  const healthyRange = getHealthyWeightRange(heightCm);
  
  // Calculate BMI Prime (ratio to upper normal limit of 25)
  const bmiPrime = bmi / 25;
  
  // Calculate Ponderal Index (kg/m³)
  const ponderalIndex = weightKg / Math.pow(heightM, 3);
  
  // Calculate weight difference to healthy range
  let weightDifference = 0;
  let weightDifferenceText = 'You are within healthy range';
  
  if (weightKg < healthyRange.min) {
    weightDifference = healthyRange.min - weightKg;
    weightDifferenceText = `Gain ${weightDifference.toFixed(1)} kg`;
  } else if (weightKg > healthyRange.max) {
    weightDifference = weightKg - healthyRange.max;
    weightDifferenceText = `Lose ${weightDifference.toFixed(1)} kg`;
  }
  
  // Determine color based on BMI category
  let colorCategory: string;
  if (bmi < 18.5 || bmi >= 30) {
    colorCategory = 'danger';
  } else if (bmi >= 25) {
    colorCategory = 'warning';
  } else {
    colorCategory = 'success';
  }
  
  return {
    values: {
      bmi,
      category: category.category,
      healthyRangeMin: healthyRange.min,
      healthyRangeMax: healthyRange.max,
      weightDifference,
      bmiPrime,
      ponderalIndex,
      categoryColor: category.color,
    },
    formatted: {
      bmi: `${bmi.toFixed(1)} kg/m²`,
      category: category.category,
      healthyRange: `${healthyRange.min.toFixed(1)} - ${healthyRange.max.toFixed(1)} kg`,
      weightDifference: weightDifferenceText,
      bmiPrime: bmiPrime.toFixed(2),
      ponderal: `${ponderalIndex.toFixed(1)} kg/m³`,
    },
    summary: `Your BMI is ${bmi.toFixed(1)}, which is classified as "${category.category}". ${category.description} The healthy weight range for your height is ${healthyRange.min.toFixed(1)} - ${healthyRange.max.toFixed(1)} kg.`,
    isValid: true,
    metadata: {
      colorCategory,
      categoryColor: category.color,
    },
  };
}

// ============================================================================
// EXPORT COMPLETE CALCULATOR
// ============================================================================

export const bmiCalculator = {
  config: bmiConfig,
  calculate: calculateBMIResults,
};

export default bmiCalculator;
