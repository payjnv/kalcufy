// ============================================
// ACCESSIBLE INPUT COMPONENT
// ============================================
// WCAG 2.1 AA Compliant
// Supports: number, currency, percentage, unit-input
// ============================================

'use client';

import { forwardRef, useId, useState, useCallback } from 'react';
import { CALCULATOR_THEME, cn } from '@/theme/calculator-theme';
import { UnitConfig } from '@/types/calculator.types';

// ============================================
// TYPES
// ============================================

export interface AccessibleInputProps {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'email' | 'tel';
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email';
  value: string | number;
  onChange: (value: string | number) => void;
  
  // Validation
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  
  // Error handling
  error?: string;
  hasError?: boolean;
  
  // Help & placeholder
  placeholder?: string;
  helpText?: string;
  
  // Prefix/Suffix
  prefix?: string;
  suffix?: string;
  
  // Unit selector
  units?: UnitConfig[];
  selectedUnit?: string;
  onUnitChange?: (unit: string) => void;
  
  // State
  disabled?: boolean;
  readOnly?: boolean;
  
  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  autoComplete?: string;
  
  // Styling
  className?: string;
  inputClassName?: string;
  width?: 'full' | 'half' | 'third';
}

// ============================================
// COMPONENT
// ============================================

export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  (
    {
      name,
      label,
      type = 'text',
      inputMode,
      value,
      onChange,
      required = false,
      min,
      max,
      step,
      pattern,
      error,
      hasError,
      placeholder,
      helpText,
      prefix,
      suffix,
      units,
      selectedUnit,
      onUnitChange,
      disabled = false,
      readOnly = false,
      ariaLabel,
      ariaDescribedBy,
      autoComplete,
      className = '',
      inputClassName = '',
      width = 'full',
    },
    ref
  ) => {
    // Generate unique IDs for ARIA
    const baseId = useId();
    const inputId = `${baseId}-input`;
    const errorId = `${baseId}-error`;
    const helpId = `${baseId}-help`;
    
    // Track focus state for styling
    const [isFocused, setIsFocused] = useState(false);
    
    // Determine if there's an error
    const showError = hasError || !!error;
    
    // Handle input change
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        
        // For number inputs, parse the value
        if (type === 'number' || inputMode === 'numeric' || inputMode === 'decimal') {
          const numValue = parseFloat(newValue);
          onChange(isNaN(numValue) ? newValue : numValue);
        } else {
          onChange(newValue);
        }
      },
      [onChange, type, inputMode]
    );
    
    // Handle unit change
    const handleUnitChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        onUnitChange?.(e.target.value);
      },
      [onUnitChange]
    );
    
    // Build aria-describedby
    const describedByIds: string[] = [];
    if (ariaDescribedBy) describedByIds.push(ariaDescribedBy);
    if (helpText) describedByIds.push(helpId);
    if (showError) describedByIds.push(errorId);
    
    // Width classes
    const widthClass = {
      full: 'sm:col-span-2',
      half: 'sm:col-span-1',
      third: 'sm:col-span-1 md:col-span-1',
    }[width];
    
    // Input classes based on state
    const inputClasses = cn(
      // Base styles
      'w-full px-4 py-3',
      'text-base text-slate-900',
      'placeholder:text-slate-400',
      'rounded-xl',
      'border',
      'transition-all duration-200',
      'focus:outline-none',
      
      // Padding adjustments for prefix/suffix/units
      prefix && 'pl-12',
      (suffix || units) && 'pr-20',
      
      // State-based styles
      showError
        ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-500'
        : 'border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
      
      // Disabled/readonly
      disabled && 'bg-slate-100 text-slate-500 cursor-not-allowed',
      readOnly && 'bg-slate-50',
      
      // Custom classes
      inputClassName
    );
    
    return (
      <div className={cn('relative', widthClass, className)}>
        {/* Label */}
        <label
          htmlFor={inputId}
          className={cn(
            'block mb-2',
            'text-sm font-medium',
            showError ? 'text-red-600' : 'text-slate-700'
          )}
        >
          {label}
          {required && (
            <span 
              className="text-red-500 ml-1" 
              aria-hidden="true"
            >
              *
            </span>
          )}
          {required && (
            <span className="sr-only">(required)</span>
          )}
        </label>
        
        {/* Input Container */}
        <div className="relative">
          {/* Prefix */}
          {prefix && (
            <span 
              className={cn(
                'absolute left-4 top-1/2 -translate-y-1/2',
                'text-slate-500 font-medium',
                'pointer-events-none'
              )}
              aria-hidden="true"
            >
              {prefix}
            </span>
          )}
          
          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            inputMode={inputMode}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            min={min}
            max={max}
            step={step}
            pattern={pattern}
            autoComplete={autoComplete}
            aria-label={ariaLabel}
            aria-invalid={showError}
            aria-describedby={describedByIds.length > 0 ? describedByIds.join(' ') : undefined}
            aria-required={required}
            className={inputClasses}
          />
          
          {/* Suffix (static text) */}
          {suffix && !units && (
            <span 
              className={cn(
                'absolute right-4 top-1/2 -translate-y-1/2',
                'text-slate-500 font-medium',
                'pointer-events-none'
              )}
              aria-hidden="true"
            >
              {suffix}
            </span>
          )}
          
          {/* Unit Selector */}
          {units && units.length > 0 && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <select
                value={selectedUnit}
                onChange={handleUnitChange}
                disabled={disabled}
                className={cn(
                  'px-2 py-1',
                  'text-sm font-medium text-slate-600',
                  'bg-slate-100 hover:bg-slate-200',
                  'border-0 rounded-lg',
                  'cursor-pointer',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  'transition-colors duration-150',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
                aria-label={`Unit for ${label}`}
              >
                {units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        {/* Help Text */}
        {helpText && !showError && (
          <p 
            id={helpId}
            className="mt-2 text-sm text-slate-500"
          >
            {helpText}
          </p>
        )}
        
        {/* Error Message */}
        {showError && error && (
          <p 
            id={errorId}
            className="mt-2 text-sm text-red-600 flex items-center gap-1"
            role="alert"
            aria-live="polite"
          >
            <svg 
              className="w-4 h-4 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = 'AccessibleInput';

export default AccessibleInput;
