/**
 * Validation Utilities
 * Input validation functions for calculator fields
 */

import type { InputConfig, ValidationError } from '@/types/calculator.types';

// ============================================================================
// TYPES
// ============================================================================

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export type ValidatorFunction = (
  value: unknown,
  config: InputConfig,
  allValues?: Record<string, unknown>
) => string | null; // Returns error message or null if valid

// ============================================================================
// BASIC VALIDATORS
// ============================================================================

/**
 * Check if value is required and present
 */
export function validateRequired(value: unknown, config: InputConfig): string | null {
  if (!config.required) return null;

  if (value === undefined || value === null || value === '') {
    return config.validation?.messages?.required || 'This field is required';
  }

  return null;
}

/**
 * Validate minimum value for numbers
 */
export function validateMin(value: unknown, config: InputConfig): string | null {
  if (config.min === undefined || value === undefined || value === null || value === '') {
    return null;
  }

  const numValue = Number(value);
  if (isNaN(numValue)) return null;

  if (numValue < config.min) {
    return config.validation?.messages?.min || `Value must be at least ${config.min}`;
  }

  return null;
}

/**
 * Validate maximum value for numbers
 */
export function validateMax(value: unknown, config: InputConfig): string | null {
  if (config.max === undefined || value === undefined || value === null || value === '') {
    return null;
  }

  const numValue = Number(value);
  if (isNaN(numValue)) return null;

  if (numValue > config.max) {
    return config.validation?.messages?.max || `Value must be at most ${config.max}`;
  }

  return null;
}

/**
 * Validate step increments
 */
export function validateStep(value: unknown, config: InputConfig): string | null {
  if (config.step === undefined || value === undefined || value === null || value === '') {
    return null;
  }

  const numValue = Number(value);
  if (isNaN(numValue)) return null;

  // Handle floating point precision issues
  const multiplier = 1 / config.step;
  const isValidStep = Math.abs(Math.round(numValue * multiplier) - numValue * multiplier) < 0.0001;

  if (!isValidStep) {
    return `Value must be in increments of ${config.step}`;
  }

  return null;
}

/**
 * Validate that value is a valid number
 */
export function validateNumber(value: unknown, config: InputConfig): string | null {
  if (value === undefined || value === null || value === '') {
    return null; // Empty values handled by required validator
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return 'Please enter a valid number';
  }

  if (!isFinite(numValue)) {
    return 'Please enter a finite number';
  }

  return null;
}

/**
 * Validate positive number (> 0)
 */
export function validatePositive(value: unknown, config: InputConfig): string | null {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const numValue = Number(value);
  if (isNaN(numValue)) return null;

  if (numValue <= 0) {
    return 'Value must be greater than 0';
  }

  return null;
}

/**
 * Validate non-negative number (>= 0)
 */
export function validateNonNegative(value: unknown, config: InputConfig): string | null {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const numValue = Number(value);
  if (isNaN(numValue)) return null;

  if (numValue < 0) {
    return 'Value cannot be negative';
  }

  return null;
}

/**
 * Validate integer (no decimals)
 */
export function validateInteger(value: unknown, config: InputConfig): string | null {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const numValue = Number(value);
  if (isNaN(numValue)) return null;

  if (!Number.isInteger(numValue)) {
    return 'Please enter a whole number';
  }

  return null;
}

// ============================================================================
// CUSTOM PATTERN VALIDATORS
// ============================================================================

/**
 * Validate against regex pattern
 */
export function validatePattern(value: unknown, config: InputConfig): string | null {
  if (!config.validation?.pattern || value === undefined || value === null || value === '') {
    return null;
  }

  const stringValue = String(value);
  const regex = new RegExp(config.validation.pattern);

  if (!regex.test(stringValue)) {
    return config.validation?.messages?.pattern || 'Invalid format';
  }

  return null;
}

/**
 * Validate using custom function
 */
export function validateCustom(
  value: unknown,
  config: InputConfig,
  allValues?: Record<string, unknown>
): string | null {
  if (!config.validation?.custom) {
    return null;
  }

  try {
    // Custom validation function returns error message or null
    const result = config.validation.custom(value, allValues || {});
    return result || null;
  } catch (error) {
    console.error('Custom validation error:', error);
    return 'Validation error';
  }
}

// ============================================================================
// SPECIFIC FIELD VALIDATORS
// ============================================================================

/**
 * Validate age
 */
export function validateAge(value: unknown): string | null {
  if (value === undefined || value === null || value === '') return null;

  const age = Number(value);
  if (isNaN(age)) return 'Please enter a valid age';

  if (age < 0) return 'Age cannot be negative';
  if (age > 150) return 'Please enter a realistic age';
  if (!Number.isInteger(age)) return 'Age must be a whole number';

  return null;
}

/**
 * Validate height (cm)
 */
export function validateHeight(value: unknown): string | null {
  if (value === undefined || value === null || value === '') return null;

  const height = Number(value);
  if (isNaN(height)) return 'Please enter a valid height';

  if (height < 50) return 'Height seems too low';
  if (height > 300) return 'Height seems too high';

  return null;
}

/**
 * Validate weight (kg)
 */
export function validateWeight(value: unknown): string | null {
  if (value === undefined || value === null || value === '') return null;

  const weight = Number(value);
  if (isNaN(weight)) return 'Please enter a valid weight';

  if (weight < 1) return 'Weight seems too low';
  if (weight > 700) return 'Weight seems too high';

  return null;
}

/**
 * Validate interest rate (percentage)
 */
export function validateInterestRate(value: unknown): string | null {
  if (value === undefined || value === null || value === '') return null;

  const rate = Number(value);
  if (isNaN(rate)) return 'Please enter a valid interest rate';

  if (rate < 0) return 'Interest rate cannot be negative';
  if (rate > 100) return 'Interest rate seems too high';

  return null;
}

/**
 * Validate loan term (years/months)
 */
export function validateLoanTerm(value: unknown, maxYears: number = 50): string | null {
  if (value === undefined || value === null || value === '') return null;

  const term = Number(value);
  if (isNaN(term)) return 'Please enter a valid term';

  if (term < 1) return 'Term must be at least 1';
  if (term > maxYears) return `Term cannot exceed ${maxYears} years`;

  return null;
}

/**
 * Validate currency amount
 */
export function validateCurrencyAmount(value: unknown, fieldName: string = 'Amount'): string | null {
  if (value === undefined || value === null || value === '') return null;

  const amount = Number(value);
  if (isNaN(amount)) return `Please enter a valid ${fieldName.toLowerCase()}`;

  if (amount < 0) return `${fieldName} cannot be negative`;
  if (amount > 1e12) return `${fieldName} seems too high`;

  return null;
}

// ============================================================================
// COMPOUND VALIDATOR
// ============================================================================

/**
 * Run all applicable validators for a field
 */
export function validateField(
  value: unknown,
  config: InputConfig,
  allValues?: Record<string, unknown>
): string | null {
  // Define validation order
  const validators: ValidatorFunction[] = [
    validateRequired,
    validateNumber,
    validateMin,
    validateMax,
    validateStep,
    validatePattern,
    validateCustom,
  ];

  // Add type-specific validators
  if (config.validation?.rules) {
    if (config.validation.rules.includes('positive')) {
      validators.push(validatePositive);
    }
    if (config.validation.rules.includes('nonNegative')) {
      validators.push(validateNonNegative);
    }
    if (config.validation.rules.includes('integer')) {
      validators.push(validateInteger);
    }
    if (config.validation.rules.includes('age')) {
      validators.push((v) => validateAge(v));
    }
    if (config.validation.rules.includes('height')) {
      validators.push((v) => validateHeight(v));
    }
    if (config.validation.rules.includes('weight')) {
      validators.push((v) => validateWeight(v));
    }
    if (config.validation.rules.includes('interestRate')) {
      validators.push((v) => validateInterestRate(v));
    }
    if (config.validation.rules.includes('loanTerm')) {
      validators.push((v) => validateLoanTerm(v));
    }
    if (config.validation.rules.includes('currency')) {
      validators.push((v) => validateCurrencyAmount(v));
    }
  }

  // Run validators in order, return first error
  for (const validator of validators) {
    const error = validator(value, config, allValues);
    if (error) return error;
  }

  return null;
}

/**
 * Validate all fields in a calculator
 */
export function validateAllFields(
  values: Record<string, unknown>,
  configs: InputConfig[]
): ValidationResult {
  const errors: ValidationError[] = [];

  for (const config of configs) {
    const value = values[config.id];
    const error = validateField(value, config, values);

    if (error) {
      errors.push({
        field: config.id,
        message: error,
        type: 'error',
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// DEPENDENCY VALIDATION
// ============================================================================

/**
 * Check if a field should be visible/enabled based on dependencies
 */
export function checkDependency(
  config: InputConfig,
  allValues: Record<string, unknown>
): boolean {
  if (!config.dependsOn) return true;

  const { field, value, condition = 'equals' } = config.dependsOn;
  const currentValue = allValues[field];

  switch (condition) {
    case 'equals':
      return currentValue === value;
    case 'notEquals':
      return currentValue !== value;
    case 'greaterThan':
      return Number(currentValue) > Number(value);
    case 'lessThan':
      return Number(currentValue) < Number(value);
    case 'contains':
      return String(currentValue).includes(String(value));
    case 'notEmpty':
      return currentValue !== undefined && currentValue !== null && currentValue !== '';
    default:
      return true;
  }
}

/**
 * Get all visible fields based on dependencies
 */
export function getVisibleFields(
  configs: InputConfig[],
  values: Record<string, unknown>
): InputConfig[] {
  return configs.filter((config) => checkDependency(config, values));
}

// ============================================================================
// SANITIZATION
// ============================================================================

/**
 * Sanitize number input (remove non-numeric characters except decimal)
 */
export function sanitizeNumberInput(value: string): string {
  // Allow negative sign at start, digits, and one decimal point
  return value.replace(/[^0-9.-]/g, '').replace(/(\..*)\./g, '$1').replace(/(?!^)-/g, '');
}

/**
 * Sanitize currency input
 */
export function sanitizeCurrencyInput(value: string): string {
  // Remove currency symbols and non-numeric characters
  return value.replace(/[^0-9.,-]/g, '').replace(/(\..*)\./g, '$1');
}

/**
 * Clamp value between min and max
 */
export function clampValue(value: number, min?: number, max?: number): number {
  let result = value;
  if (min !== undefined && result < min) result = min;
  if (max !== undefined && result > max) result = max;
  return result;
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { ValidatorFunction };
