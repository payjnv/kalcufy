/**
 * Calculator Registry
 * Central registry of all available calculators
 * Add new calculators here to make them available in the app
 */

import type { CalculatorConfig, CalculatorData, CalculatorResults } from '@/types/calculator.types';

// Import calculator configs
import { idealWeightCalculator } from './ideal-weight.config';
import { bmiCalculator } from './bmi.config';
import { compoundInterestCalculator } from './compound-interest.config';
import { calorieCalculator } from './calorie.config';
import { mortgageCalculator } from './mortgage.config';
import { loanCalculator } from './loan.config';

// ============================================================================
// TYPES
// ============================================================================

export interface Calculator {
  config: CalculatorConfig;
  calculate: (data: CalculatorData) => CalculatorResults;
}

export interface CalculatorRegistry {
  [slug: string]: Calculator;
}

// ============================================================================
// REGISTRY
// ============================================================================

/**
 * All registered calculators
 * Key = slug, Value = Calculator object
 */
export const calculatorRegistry: CalculatorRegistry = {
  // Health Calculators
  'ideal-weight-calculator': idealWeightCalculator,
  'bmi-calculator': bmiCalculator,
  'calorie-calculator': calorieCalculator,
  
  // Finance Calculators
  'compound-interest-calculator': compoundInterestCalculator,
  'mortgage-calculator': mortgageCalculator,
  'loan-calculator': loanCalculator,
  
  // Add more calculators here as they are created:
  // 'retirement-calculator': retirementCalculator,
  // 'auto-loan-calculator': autoLoanCalculator,
  // ... etc
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get a calculator by slug
 */
export function getCalculator(slug: string): Calculator | undefined {
  return calculatorRegistry[slug];
}

/**
 * Get calculator config by slug
 */
export function getCalculatorConfig(slug: string): CalculatorConfig | undefined {
  return calculatorRegistry[slug]?.config;
}

/**
 * Check if a calculator exists
 */
export function calculatorExists(slug: string): boolean {
  return slug in calculatorRegistry;
}

/**
 * Get all calculator slugs
 */
export function getAllCalculatorSlugs(): string[] {
  return Object.keys(calculatorRegistry);
}

/**
 * Get all calculator configs
 */
export function getAllCalculatorConfigs(): CalculatorConfig[] {
  return Object.values(calculatorRegistry).map(calc => calc.config);
}

/**
 * Get calculators by category
 */
export function getCalculatorsByCategory(category: 'health' | 'finance' | 'everyday'): Calculator[] {
  return Object.values(calculatorRegistry).filter(
    calc => calc.config.category === category
  );
}

/**
 * Get calculator configs by category
 */
export function getCalculatorConfigsByCategory(
  category: 'health' | 'finance' | 'everyday'
): CalculatorConfig[] {
  return getAllCalculatorConfigs().filter(config => config.category === category);
}

/**
 * Search calculators by keyword
 */
export function searchCalculators(query: string): CalculatorConfig[] {
  const lowercaseQuery = query.toLowerCase();
  
  return getAllCalculatorConfigs().filter(config => {
    const searchText = [
      config.seo.title,
      config.seo.description,
      ...(config.seo.keywords || []),
    ].join(' ').toLowerCase();
    
    return searchText.includes(lowercaseQuery);
  });
}

/**
 * Get related calculators for a given calculator
 */
export function getRelatedCalculators(slug: string, limit: number = 4): CalculatorConfig[] {
  const calculator = getCalculator(slug);
  if (!calculator) return [];
  
  const relatedSlugs = calculator.config.relatedCalculators || [];
  
  return relatedSlugs
    .slice(0, limit)
    .map(relatedSlug => getCalculatorConfig(relatedSlug))
    .filter((config): config is CalculatorConfig => config !== undefined);
}

/**
 * Get popular calculators (by badge)
 */
export function getPopularCalculators(limit: number = 6): CalculatorConfig[] {
  return getAllCalculatorConfigs()
    .filter(config => config.badges?.includes('popular'))
    .slice(0, limit);
}

/**
 * Get new calculators (by badge)
 */
export function getNewCalculators(limit: number = 4): CalculatorConfig[] {
  return getAllCalculatorConfigs()
    .filter(config => config.badges?.includes('new'))
    .slice(0, limit);
}

// ============================================================================
// STATISTICS
// ============================================================================

/**
 * Get calculator statistics
 */
export function getCalculatorStats(): {
  total: number;
  byCategory: Record<string, number>;
  popular: number;
  new: number;
} {
  const configs = getAllCalculatorConfigs();
  
  const byCategory: Record<string, number> = {};
  configs.forEach(config => {
    byCategory[config.category] = (byCategory[config.category] || 0) + 1;
  });
  
  return {
    total: configs.length,
    byCategory,
    popular: configs.filter(c => c.badges?.includes('popular')).length,
    new: configs.filter(c => c.badges?.includes('new')).length,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

// Re-export individual calculators for direct imports
export { idealWeightCalculator } from './ideal-weight.config';
export { bmiCalculator } from './bmi.config';
export { compoundInterestCalculator } from './compound-interest.config';
export { calorieCalculator } from './calorie.config';
export { mortgageCalculator } from './mortgage.config';
export { loanCalculator } from './loan.config';
