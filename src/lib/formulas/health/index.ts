/**
 * Health Formulas Library
 * Contains all calculation formulas for health-related calculators
 */

import { normalizeHeight, normalizeWeight } from '../utils/units';

// ============================================================================
// TYPES
// ============================================================================

export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
export type BodyFrame = 'small' | 'medium' | 'large';
export type WeightGoal = 'lose' | 'maintain' | 'gain';

// ============================================================================
// BMI CALCULATIONS
// ============================================================================

/**
 * Calculate Body Mass Index (BMI)
 * Formula: weight (kg) / height (m)²
 */
export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

/**
 * Get BMI category
 */
export function getBMICategory(bmi: number): {
  category: string;
  color: string;
  description: string;
} {
  if (bmi < 16) {
    return {
      category: 'Severely Underweight',
      color: '#ef4444', // red
      description: 'Your BMI indicates severe underweight. Please consult a healthcare provider.',
    };
  } else if (bmi < 17) {
    return {
      category: 'Moderately Underweight',
      color: '#f97316', // orange
      description: 'Your BMI indicates moderate underweight. Consider consulting a healthcare provider.',
    };
  } else if (bmi < 18.5) {
    return {
      category: 'Underweight',
      color: '#eab308', // yellow
      description: 'Your BMI indicates you are slightly underweight.',
    };
  } else if (bmi < 25) {
    return {
      category: 'Normal',
      color: '#22c55e', // green
      description: 'Your BMI is within the healthy range. Maintain your current lifestyle!',
    };
  } else if (bmi < 30) {
    return {
      category: 'Overweight',
      color: '#eab308', // yellow
      description: 'Your BMI indicates overweight. Consider lifestyle modifications.',
    };
  } else if (bmi < 35) {
    return {
      category: 'Obese Class I',
      color: '#f97316', // orange
      description: 'Your BMI indicates obesity. Consider consulting a healthcare provider.',
    };
  } else if (bmi < 40) {
    return {
      category: 'Obese Class II',
      color: '#ef4444', // red
      description: 'Your BMI indicates severe obesity. Please consult a healthcare provider.',
    };
  } else {
    return {
      category: 'Obese Class III',
      color: '#dc2626', // dark red
      description: 'Your BMI indicates very severe obesity. Please seek medical advice.',
    };
  }
}

/**
 * Calculate healthy weight range for a given height
 */
export function getHealthyWeightRange(heightCm: number): { min: number; max: number } {
  const heightM = heightCm / 100;
  const heightSquared = heightM * heightM;
  
  return {
    min: 18.5 * heightSquared,
    max: 24.9 * heightSquared,
  };
}

// ============================================================================
// IDEAL WEIGHT CALCULATIONS
// Multiple formulas for comparison
// ============================================================================

export interface IdealWeightResults {
  devine: number;
  robinson: number;
  miller: number;
  hamwi: number;
  bmiMethod: { min: number; max: number };
  average: number;
}

/**
 * Devine Formula (1974)
 * Men: 50 + 2.3 × (height in inches − 60)
 * Women: 45.5 + 2.3 × (height in inches − 60)
 */
export function calculateDevineIdealWeight(heightCm: number, gender: Gender): number {
  const heightInches = heightCm / 2.54;
  
  if (gender === 'male') {
    return 50 + 2.3 * (heightInches - 60);
  } else {
    return 45.5 + 2.3 * (heightInches - 60);
  }
}

/**
 * Robinson Formula (1983)
 * Men: 52 + 1.9 × (height in inches − 60)
 * Women: 49 + 1.7 × (height in inches − 60)
 */
export function calculateRobinsonIdealWeight(heightCm: number, gender: Gender): number {
  const heightInches = heightCm / 2.54;
  
  if (gender === 'male') {
    return 52 + 1.9 * (heightInches - 60);
  } else {
    return 49 + 1.7 * (heightInches - 60);
  }
}

/**
 * Miller Formula (1983)
 * Men: 56.2 + 1.41 × (height in inches − 60)
 * Women: 53.1 + 1.36 × (height in inches − 60)
 */
export function calculateMillerIdealWeight(heightCm: number, gender: Gender): number {
  const heightInches = heightCm / 2.54;
  
  if (gender === 'male') {
    return 56.2 + 1.41 * (heightInches - 60);
  } else {
    return 53.1 + 1.36 * (heightInches - 60);
  }
}

/**
 * Hamwi Formula (1964)
 * Men: 48 + 2.7 × (height in inches − 60)
 * Women: 45.5 + 2.2 × (height in inches − 60)
 */
export function calculateHamwiIdealWeight(heightCm: number, gender: Gender): number {
  const heightInches = heightCm / 2.54;
  
  if (gender === 'male') {
    return 48 + 2.7 * (heightInches - 60);
  } else {
    return 45.5 + 2.2 * (heightInches - 60);
  }
}

/**
 * Calculate all ideal weight formulas
 */
export function calculateIdealWeight(heightCm: number, gender: Gender): IdealWeightResults {
  const devine = calculateDevineIdealWeight(heightCm, gender);
  const robinson = calculateRobinsonIdealWeight(heightCm, gender);
  const miller = calculateMillerIdealWeight(heightCm, gender);
  const hamwi = calculateHamwiIdealWeight(heightCm, gender);
  const bmiMethod = getHealthyWeightRange(heightCm);
  
  // Average of the four formulas
  const average = (devine + robinson + miller + hamwi) / 4;
  
  return {
    devine,
    robinson,
    miller,
    hamwi,
    bmiMethod,
    average,
  };
}

// ============================================================================
// CALORIE CALCULATIONS
// ============================================================================

/**
 * Activity level multipliers for TDEE
 */
const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2, // Little or no exercise
  light: 1.375, // Light exercise 1-3 days/week
  moderate: 1.55, // Moderate exercise 3-5 days/week
  active: 1.725, // Hard exercise 6-7 days/week
  veryActive: 1.9, // Very hard exercise, physical job
};

/**
 * Basal Metabolic Rate using Mifflin-St Jeor Equation (most accurate)
 * Men: BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age (years) + 5
 * Women: BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age (years) − 161
 */
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  
  if (gender === 'male') {
    return base + 5;
  } else {
    return base - 161;
  }
}

/**
 * Harris-Benedict BMR (original 1918, revised 1984)
 * Men: BMR = 88.362 + 13.397 × weight (kg) + 4.799 × height (cm) − 5.677 × age (years)
 * Women: BMR = 447.593 + 9.247 × weight (kg) + 3.098 × height (cm) − 4.330 × age (years)
 */
export function calculateHarrisBenedictBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender
): number {
  if (gender === 'male') {
    return 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
  } else {
    return 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age;
  }
}

/**
 * Katch-McArdle BMR (requires body fat percentage)
 * BMR = 370 + 21.6 × lean body mass (kg)
 */
export function calculateKatchMcArdleBMR(weightKg: number, bodyFatPercent: number): number {
  const leanBodyMass = weightKg * (1 - bodyFatPercent / 100);
  return 370 + 21.6 * leanBodyMass;
}

/**
 * Total Daily Energy Expenditure (TDEE)
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return bmr * ACTIVITY_MULTIPLIERS[activityLevel];
}

/**
 * Calculate calories for weight goal
 */
export function calculateCaloriesForGoal(
  tdee: number,
  goal: WeightGoal,
  ratePerWeek: number = 0.5 // kg per week
): number {
  // 1 kg of body weight ≈ 7700 kcal
  const dailyDeficit = (ratePerWeek * 7700) / 7;
  
  switch (goal) {
    case 'lose':
      return tdee - dailyDeficit;
    case 'gain':
      return tdee + dailyDeficit;
    case 'maintain':
    default:
      return tdee;
  }
}

export interface CalorieResults {
  bmr: number;
  bmrHarrisBenedict: number;
  tdee: number;
  maintainCalories: number;
  mildLossCalories: number; // 0.25 kg/week
  moderateLossCalories: number; // 0.5 kg/week
  extremeLossCalories: number; // 1 kg/week
  mildGainCalories: number; // 0.25 kg/week
  moderateGainCalories: number; // 0.5 kg/week
}

/**
 * Calculate all calorie values
 */
export function calculateCalories(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender,
  activityLevel: ActivityLevel
): CalorieResults {
  const bmr = calculateBMR(weightKg, heightCm, age, gender);
  const bmrHarrisBenedict = calculateHarrisBenedictBMR(weightKg, heightCm, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  
  return {
    bmr,
    bmrHarrisBenedict,
    tdee,
    maintainCalories: tdee,
    mildLossCalories: calculateCaloriesForGoal(tdee, 'lose', 0.25),
    moderateLossCalories: calculateCaloriesForGoal(tdee, 'lose', 0.5),
    extremeLossCalories: calculateCaloriesForGoal(tdee, 'lose', 1),
    mildGainCalories: calculateCaloriesForGoal(tdee, 'gain', 0.25),
    moderateGainCalories: calculateCaloriesForGoal(tdee, 'gain', 0.5),
  };
}

// ============================================================================
// MACRONUTRIENT CALCULATIONS
// ============================================================================

export interface MacroResults {
  protein: { grams: number; calories: number; percentage: number };
  carbs: { grams: number; calories: number; percentage: number };
  fat: { grams: number; calories: number; percentage: number };
}

/**
 * Calculate macronutrient distribution
 * @param calories Total daily calories
 * @param proteinRatio Percentage of calories from protein (default 30%)
 * @param carbsRatio Percentage of calories from carbs (default 40%)
 * @param fatRatio Percentage of calories from fat (default 30%)
 */
export function calculateMacros(
  calories: number,
  proteinRatio: number = 30,
  carbsRatio: number = 40,
  fatRatio: number = 30
): MacroResults {
  // Calories per gram
  const PROTEIN_CALS = 4;
  const CARBS_CALS = 4;
  const FAT_CALS = 9;
  
  const proteinCalories = calories * (proteinRatio / 100);
  const carbsCalories = calories * (carbsRatio / 100);
  const fatCalories = calories * (fatRatio / 100);
  
  return {
    protein: {
      grams: proteinCalories / PROTEIN_CALS,
      calories: proteinCalories,
      percentage: proteinRatio,
    },
    carbs: {
      grams: carbsCalories / CARBS_CALS,
      calories: carbsCalories,
      percentage: carbsRatio,
    },
    fat: {
      grams: fatCalories / FAT_CALS,
      calories: fatCalories,
      percentage: fatRatio,
    },
  };
}

// ============================================================================
// BODY FAT PERCENTAGE
// ============================================================================

/**
 * US Navy Body Fat Percentage Formula
 * Men: 495 / (1.0324 - 0.19077 × log10(waist - neck) + 0.15456 × log10(height)) - 450
 * Women: 495 / (1.29579 - 0.35004 × log10(waist + hip - neck) + 0.22100 × log10(height)) - 450
 */
export function calculateBodyFatNavy(
  waistCm: number,
  neckCm: number,
  heightCm: number,
  gender: Gender,
  hipCm?: number // Required for women
): number {
  if (gender === 'male') {
    return (
      495 /
        (1.0324 -
          0.19077 * Math.log10(waistCm - neckCm) +
          0.15456 * Math.log10(heightCm)) -
      450
    );
  } else {
    if (hipCm === undefined) {
      throw new Error('Hip measurement is required for women');
    }
    return (
      495 /
        (1.29579 -
          0.35004 * Math.log10(waistCm + hipCm - neckCm) +
          0.221 * Math.log10(heightCm)) -
      450
    );
  }
}

/**
 * BMI-based body fat estimate (less accurate)
 */
export function estimateBodyFatFromBMI(bmi: number, age: number, gender: Gender): number {
  if (gender === 'male') {
    return 1.2 * bmi + 0.23 * age - 16.2;
  } else {
    return 1.2 * bmi + 0.23 * age - 5.4;
  }
}

/**
 * Get body fat category
 */
export function getBodyFatCategory(
  bodyFatPercent: number,
  gender: Gender
): { category: string; color: string } {
  if (gender === 'male') {
    if (bodyFatPercent < 6) return { category: 'Essential Fat', color: '#ef4444' };
    if (bodyFatPercent < 14) return { category: 'Athletic', color: '#22c55e' };
    if (bodyFatPercent < 18) return { category: 'Fitness', color: '#22c55e' };
    if (bodyFatPercent < 25) return { category: 'Average', color: '#eab308' };
    return { category: 'Obese', color: '#ef4444' };
  } else {
    if (bodyFatPercent < 14) return { category: 'Essential Fat', color: '#ef4444' };
    if (bodyFatPercent < 21) return { category: 'Athletic', color: '#22c55e' };
    if (bodyFatPercent < 25) return { category: 'Fitness', color: '#22c55e' };
    if (bodyFatPercent < 32) return { category: 'Average', color: '#eab308' };
    return { category: 'Obese', color: '#ef4444' };
  }
}

// ============================================================================
// WAIST-TO-HIP RATIO
// ============================================================================

/**
 * Calculate waist-to-hip ratio
 */
export function calculateWaistToHipRatio(waistCm: number, hipCm: number): number {
  return waistCm / hipCm;
}

/**
 * Get WHR health risk category
 */
export function getWHRCategory(
  ratio: number,
  gender: Gender
): { category: string; color: string; risk: string } {
  if (gender === 'male') {
    if (ratio < 0.9) return { category: 'Low', color: '#22c55e', risk: 'Low health risk' };
    if (ratio < 1.0) return { category: 'Moderate', color: '#eab308', risk: 'Moderate health risk' };
    return { category: 'High', color: '#ef4444', risk: 'High health risk' };
  } else {
    if (ratio < 0.8) return { category: 'Low', color: '#22c55e', risk: 'Low health risk' };
    if (ratio < 0.85) return { category: 'Moderate', color: '#eab308', risk: 'Moderate health risk' };
    return { category: 'High', color: '#ef4444', risk: 'High health risk' };
  }
}

// ============================================================================
// LEAN BODY MASS
// ============================================================================

/**
 * Calculate lean body mass using Boer formula
 */
export function calculateLeanBodyMassBoer(
  weightKg: number,
  heightCm: number,
  gender: Gender
): number {
  if (gender === 'male') {
    return 0.407 * weightKg + 0.267 * heightCm - 19.2;
  } else {
    return 0.252 * weightKg + 0.473 * heightCm - 48.3;
  }
}

/**
 * Calculate lean body mass from body fat percentage
 */
export function calculateLeanBodyMass(weightKg: number, bodyFatPercent: number): number {
  return weightKg * (1 - bodyFatPercent / 100);
}

// ============================================================================
// WATER INTAKE
// ============================================================================

/**
 * Calculate recommended daily water intake (ml)
 * Base: 30-35ml per kg of body weight
 * Adjustments for activity and climate
 */
export function calculateWaterIntake(
  weightKg: number,
  activityLevel: ActivityLevel,
  isHotClimate: boolean = false
): { min: number; max: number; recommended: number } {
  const baseMin = weightKg * 30;
  const baseMax = weightKg * 35;
  
  // Activity multipliers
  const activityMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1,
    light: 1.1,
    moderate: 1.2,
    active: 1.3,
    veryActive: 1.4,
  };
  
  const multiplier = activityMultipliers[activityLevel];
  const climateMultiplier = isHotClimate ? 1.1 : 1;
  
  const min = baseMin * multiplier * climateMultiplier;
  const max = baseMax * multiplier * climateMultiplier;
  const recommended = (min + max) / 2;
  
  return { min, max, recommended };
}

// ============================================================================
// PREGNANCY DUE DATE
// ============================================================================

/**
 * Calculate pregnancy due date using Naegele's rule
 * Add 280 days (40 weeks) from first day of last menstrual period
 */
export function calculateDueDate(lastPeriodDate: Date): Date {
  const dueDate = new Date(lastPeriodDate);
  dueDate.setDate(dueDate.getDate() + 280);
  return dueDate;
}

/**
 * Calculate pregnancy week
 */
export function calculatePregnancyWeek(lastPeriodDate: Date, currentDate: Date = new Date()): number {
  const diffMs = currentDate.getTime() - lastPeriodDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return Math.floor(diffDays / 7);
}

// ============================================================================
// EXPORTS
// ============================================================================

export { ACTIVITY_MULTIPLIERS };
