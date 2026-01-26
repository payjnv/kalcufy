// ============================================
// ACCESSIBLE RADIO GROUP COMPONENT
// ============================================
// WCAG 2.1 AA Compliant
// Keyboard navigable with arrow keys
// ============================================

'use client';

import { useId, useState, useCallback, useRef, KeyboardEvent } from 'react';
import { cn } from '@/theme/calculator-theme';
import { SelectOption } from '@/types/calculator.types';

// ============================================
// TYPES
// ============================================

export interface AccessibleRadioGroupProps {
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
  helpText?: string;
  
  // State
  disabled?: boolean;
  
  // Layout
  orientation?: 'horizontal' | 'vertical';
  width?: 'full' | 'half' | 'third';
  
  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  
  // Styling
  className?: string;
  optionClassName?: string;
}

// ============================================
// COMPONENT
// ============================================

export const AccessibleRadioGroup: React.FC<AccessibleRadioGroupProps> = ({
  name,
  label,
  value,
  onChange,
  options,
  required = false,
  error,
  hasError,
  helpText,
  disabled = false,
  orientation = 'horizontal',
  width = 'full',
  ariaLabel,
  ariaDescribedBy,
  className = '',
  optionClassName = '',
}) => {
  // Generate unique IDs
  const baseId = useId();
  const groupId = `${baseId}-group`;
  const labelId = `${baseId}-label`;
  const errorId = `${baseId}-error`;
  const helpId = `${baseId}-help`;
  
  // Track focused option
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  // Determine if there's an error
  const showError = hasError || !!error;
  
  // Handle option click
  const handleOptionClick = useCallback(
    (optionValue: string | number) => {
      if (!disabled) {
        onChange(optionValue);
      }
    },
    [onChange, disabled]
  );
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      
      const currentIndex = options.findIndex(opt => opt.value === value);
      let newIndex = currentIndex;
      
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          newIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0) {
            onChange(options[focusedIndex].value);
          }
          return;
        default:
          return;
      }
      
      onChange(options[newIndex].value);
      setFocusedIndex(newIndex);
      optionRefs.current[newIndex]?.focus();
    },
    [options, value, onChange, disabled, focusedIndex]
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
  
  // Container classes based on orientation
  const containerClasses = cn(
    orientation === 'horizontal'
      ? 'flex flex-wrap gap-3'
      : 'flex flex-col gap-2'
  );
  
  return (
    <div className={cn(widthClass, className)}>
      {/* Group Label */}
      <div
        id={labelId}
        className={cn(
          'block mb-3',
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
      </div>
      
      {/* Radio Group */}
      <div
        id={groupId}
        role="radiogroup"
        aria-labelledby={labelId}
        aria-describedby={describedByIds.length > 0 ? describedByIds.join(' ') : undefined}
        aria-invalid={showError}
        aria-required={required}
        onKeyDown={handleKeyDown}
        className={containerClasses}
      >
        {options.map((option, index) => {
          const isSelected = value === option.value;
          const optionId = `${baseId}-option-${index}`;
          
          return (
            <button
              key={option.value}
              ref={(el) => { optionRefs.current[index] = el; }}
              type="button"
              id={optionId}
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleOptionClick(option.value)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(-1)}
              className={cn(
                // Base styles
                'inline-flex items-center gap-2',
                'px-4 py-3',
                'rounded-xl',
                'border-2',
                'font-medium',
                'transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                
                // Selected state
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                
                // Disabled state
                disabled && 'opacity-50 cursor-not-allowed',
                !disabled && 'cursor-pointer',
                
                // Custom classes
                optionClassName
              )}
            >
              {/* Radio Circle */}
              <span
                className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                  'transition-all duration-200',
                  isSelected
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-slate-300 bg-white'
                )}
                aria-hidden="true"
              >
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </span>
              
              {/* Icon (if provided) */}
              {option.icon && (
                <span className="text-lg" aria-hidden="true">
                  {option.icon}
                </span>
              )}
              
              {/* Label */}
              <span>{option.label}</span>
            </button>
          );
        })}
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
};

export default AccessibleRadioGroup;
