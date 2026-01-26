// ============================================
// ACCESSIBLE SELECT COMPONENT
// ============================================
// WCAG 2.1 AA Compliant
// ============================================

'use client';

import { forwardRef, useId, useState, useCallback } from 'react';
import { cn } from '@/theme/calculator-theme';
import { SelectOption } from '@/types/calculator.types';

// ============================================
// TYPES
// ============================================

export interface AccessibleSelectProps {
  name: string;
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: SelectOption[];
  
  // Validation
  required?: boolean;
  error?: string;
  hasError?: boolean;
  
  // Help
  placeholder?: string;
  helpText?: string;
  
  // State
  disabled?: boolean;
  
  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  
  // Styling
  className?: string;
  selectClassName?: string;
  width?: 'full' | 'half' | 'third';
}

// ============================================
// COMPONENT
// ============================================

export const AccessibleSelect = forwardRef<HTMLSelectElement, AccessibleSelectProps>(
  (
    {
      name,
      label,
      value,
      onChange,
      options,
      required = false,
      error,
      hasError,
      placeholder,
      helpText,
      disabled = false,
      ariaLabel,
      ariaDescribedBy,
      className = '',
      selectClassName = '',
      width = 'full',
    },
    ref
  ) => {
    // Generate unique IDs for ARIA
    const baseId = useId();
    const selectId = `${baseId}-select`;
    const errorId = `${baseId}-error`;
    const helpId = `${baseId}-help`;
    
    // Track focus state
    const [isFocused, setIsFocused] = useState(false);
    
    // Determine if there's an error
    const showError = hasError || !!error;
    
    // Handle change
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        // Try to convert to number if it looks like one
        const numValue = parseFloat(newValue);
        onChange(isNaN(numValue) ? newValue : numValue);
      },
      [onChange]
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
    
    // Select classes
    const selectClasses = cn(
      // Base styles
      'w-full px-4 py-3',
      'text-base text-slate-900',
      'rounded-xl',
      'border',
      'appearance-none',
      'cursor-pointer',
      'transition-all duration-200',
      'focus:outline-none',
      
      // Add padding for arrow
      'pr-12',
      
      // State-based styles
      showError
        ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-500'
        : 'border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
      
      // Disabled
      disabled && 'bg-slate-100 text-slate-500 cursor-not-allowed',
      
      // Custom classes
      selectClassName
    );
    
    return (
      <div className={cn('relative', widthClass, className)}>
        {/* Label */}
        <label
          htmlFor={selectId}
          className={cn(
            'block mb-2',
            'text-sm font-medium',
            showError ? 'text-red-600' : 'text-slate-700'
          )}
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-hidden="true">*</span>
          )}
          {required && (
            <span className="sr-only">(required)</span>
          )}
        </label>
        
        {/* Select Container */}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            name={name}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            required={required}
            aria-label={ariaLabel}
            aria-invalid={showError}
            aria-describedby={describedByIds.length > 0 ? describedByIds.join(' ') : undefined}
            aria-required={required}
            className={selectClasses}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.icon ? `${option.icon} ` : ''}{option.label}
              </option>
            ))}
          </select>
          
          {/* Custom Arrow */}
          <div 
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2',
              'pointer-events-none',
              'text-slate-400'
            )}
            aria-hidden="true"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </div>
        </div>
        
        {/* Help Text */}
        {helpText && !showError && (
          <p id={helpId} className="mt-2 text-sm text-slate-500">
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

AccessibleSelect.displayName = 'AccessibleSelect';

export default AccessibleSelect;
