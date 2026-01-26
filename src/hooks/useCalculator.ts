// ============================================
// USE CALCULATOR HOOK
// ============================================
// Main state management hook for calculators
// Handles inputs, calculations, and results
// ============================================

'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  CalculatorConfig,
  CalculatorData,
  CalculatorResults,
  UseCalculatorReturn,
  ValidationResult,
  InputConfig,
} from '@/types/calculator.types';

// ============================================
// VALIDATION HELPERS
// ============================================

const validateInput = (
  input: InputConfig,
  value: number | string | boolean | undefined,
  translations: { required: string; min: string; max: string }
): string | null => {
  // Required check
  if (input.required && (value === undefined || value === null || value === '')) {
    return translations.required;
  }
  
  // Skip further validation if empty and not required
  if (value === undefined || value === null || value === '') {
    return null;
  }
  
  // Number validation
  if (typeof value === 'number' || !isNaN(Number(value))) {
    const numValue = Number(value);
    
    if (input.min !== undefined && numValue < input.min) {
      return translations.min.replace('{min}', String(input.min));
    }
    
    if (input.max !== undefined && numValue > input.max) {
      return translations.max.replace('{max}', String(input.max));
    }
  }
  
  return null;
};

const validateAllInputs = (
  inputs: InputConfig[],
  data: CalculatorData,
  translations: { required: string; min: string; max: string }
): ValidationResult => {
  const errors: Record<string, string> = {};
  
  for (const input of inputs) {
    const value = data[input.name];
    const error = validateInput(input, value, translations);
    
    if (error) {
      errors[input.name] = error;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// ============================================
// INITIALIZATION HELPER
// ============================================

const initializeData = (config: CalculatorConfig): CalculatorData => {
  const data: CalculatorData = {
    _units: {},
    _unitSystem: config.defaultUnitSystem || 'metric',
  };
  
  for (const input of config.inputs) {
    // Set default value
    if (input.defaultValue !== undefined) {
      data[input.name] = input.defaultValue;
    }
    
    // Set default unit
    if (input.units && input.defaultUnit) {
      data._units[input.name] = input.defaultUnit;
    }
  }
  
  return data;
};

// ============================================
// CHECK REQUIRED INPUTS
// ============================================

const hasRequiredInputs = (
  data: CalculatorData,
  inputs: InputConfig[]
): boolean => {
  return inputs
    .filter((input) => input.required)
    .every((input) => {
      const value = data[input.name];
      return value !== undefined && value !== null && value !== '';
    });
};

// ============================================
// HOOK OPTIONS
// ============================================

export interface UseCalculatorOptions {
  config: CalculatorConfig;
  initialData?: Partial<CalculatorData>;
  onCalculate?: (results: CalculatorResults) => void;
  onError?: (errors: Record<string, string>) => void;
  validationMessages?: {
    required: string;
    min: string;
    max: string;
  };
}

// ============================================
// DEFAULT VALIDATION MESSAGES
// ============================================

const DEFAULT_VALIDATION_MESSAGES = {
  required: 'This field is required',
  min: 'Value must be at least {min}',
  max: 'Value must be at most {max}',
};

// ============================================
// MAIN HOOK
// ============================================

export const useCalculator = ({
  config,
  initialData,
  onCalculate,
  onError,
  validationMessages = DEFAULT_VALIDATION_MESSAGES,
}: UseCalculatorOptions): UseCalculatorReturn => {
  // ============================================
  // STATE
  // ============================================
  
  const [data, setData] = useState<CalculatorData>(() => {
    const baseData = initializeData(config);
    
    // Merge with initial data if provided
    if (initialData) {
      return { ...baseData, ...initialData };
    }
    
    return baseData;
  });
  
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  
  // ============================================
  // DERIVED STATE
  // ============================================
  
  const hasResults = useMemo(() => {
    return results !== null && Object.keys(results).length > 0;
  }, [results]);
  
  // ============================================
  // ACTIONS
  // ============================================
  
  const setFieldValue = useCallback(
    (name: string, value: number | string | boolean) => {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
      
      // Clear error for this field
      setErrors((prev) => {
        if (prev[name]) {
          const next = { ...prev };
          delete next[name];
          return next;
        }
        return prev;
      });
    },
    []
  );
  
  const setUnit = useCallback((name: string, unit: string) => {
    setData((prev) => ({
      ...prev,
      _units: {
        ...prev._units,
        [name]: unit,
      },
    }));
  }, []);
  
  const calculate = useCallback(() => {
    // Validate inputs
    const validation = validateAllInputs(config.inputs, data, validationMessages);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      onError?.(validation.errors);
      return;
    }
    
    setIsCalculating(true);
    
    try {
      // Execute calculation
      const calculationResults = config.calculate(data);
      
      setResults(calculationResults);
      setErrors({});
      
      // Callback
      onCalculate?.(calculationResults);
      
    } catch (error) {
      console.error('Calculation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Calculation failed';
      setErrors({ _calculation: errorMessage });
      onError?.({ _calculation: errorMessage });
      
    } finally {
      setIsCalculating(false);
    }
  }, [config, data, validationMessages, onCalculate, onError]);
  
  const reset = useCallback(() => {
    setData(initializeData(config));
    setResults(null);
    setErrors({});
  }, [config]);
  
  // ============================================
  // UTILITIES
  // ============================================
  
  const getFieldValue = useCallback(
    (name: string): number | string | boolean | undefined => {
      return data[name];
    },
    [data]
  );
  
  const getUnit = useCallback(
    (name: string): string => {
      return data._units[name] || '';
    },
    [data._units]
  );
  
  const hasError = useCallback(
    (name: string): boolean => {
      return !!errors[name];
    },
    [errors]
  );
  
  const getError = useCallback(
    (name: string): string | undefined => {
      return errors[name];
    },
    [errors]
  );
  
  // ============================================
  // AUTO-CALCULATE (if enabled)
  // ============================================
  
  useEffect(() => {
    if (config.autoCalculate && hasRequiredInputs(data, config.inputs)) {
      // Debounce auto-calculation
      const timer = setTimeout(() => {
        calculate();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [data, config.autoCalculate, config.inputs]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // ============================================
  // RETURN
  // ============================================
  
  return {
    // State
    data,
    results,
    errors,
    isCalculating,
    hasResults,
    
    // Actions
    setFieldValue,
    setUnit,
    calculate,
    reset,
    
    // Utilities
    getFieldValue,
    getUnit,
    hasError,
    getError,
  };
};

export default useCalculator;
