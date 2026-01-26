// ============================================
// USE ANNOUNCER HOOK
// ============================================
// Provides screen reader announcements
// WCAG 2.1 AA Compliant - Live Regions
// ============================================

'use client';

import { useCallback, useRef, useEffect } from 'react';
import { CalculatorResults } from '@/types/calculator.types';

// ============================================
// TYPES
// ============================================

export interface UseAnnouncerReturn {
  /**
   * Announce a message to screen readers
   * @param message - The message to announce
   * @param priority - 'polite' (default) or 'assertive'
   */
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  
  /**
   * Announce calculation results
   * @param results - The calculation results
   * @param primaryKey - Key of the primary result to announce
   */
  announceResults: (results: CalculatorResults, primaryKey?: string) => void;
  
  /**
   * Announce an error message
   * @param error - The error message
   */
  announceError: (error: string) => void;
  
  /**
   * Announce a success message
   * @param message - The success message
   */
  announceSuccess: (message: string) => void;
  
  /**
   * Clear any pending announcements
   */
  clear: () => void;
}

export interface UseAnnouncerOptions {
  /**
   * ID of the announcer element in the DOM
   * @default 'a11y-announcer'
   */
  announcerId?: string;
  
  /**
   * Delay before announcing (ms)
   * Helps ensure screen readers pick up the change
   * @default 100
   */
  announceDelay?: number;
}

// ============================================
// HOOK
// ============================================

export const useAnnouncer = (
  options: UseAnnouncerOptions = {}
): UseAnnouncerReturn => {
  const {
    announcerId = 'a11y-announcer',
    announceDelay = 100,
  } = options;
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const announcerRef = useRef<HTMLElement | null>(null);
  
  // Get or create announcer element
  useEffect(() => {
    let announcer = document.getElementById(announcerId);
    
    if (!announcer) {
      // Create announcer element if it doesn't exist
      announcer = document.createElement('div');
      announcer.id = announcerId;
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      `;
      document.body.appendChild(announcer);
    }
    
    announcerRef.current = announcer;
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [announcerId]);
  
  /**
   * Announce a message
   */
  const announce = useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      const announcer = announcerRef.current;
      
      if (!announcer) {
        console.warn('Announcer element not found');
        return;
      }
      
      // Clear any pending announcement
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set priority
      announcer.setAttribute('aria-live', priority);
      
      // Clear first to ensure screen reader picks up the change
      announcer.textContent = '';
      
      // Set message after a brief delay
      timeoutRef.current = setTimeout(() => {
        announcer.textContent = message;
      }, announceDelay);
    },
    [announceDelay]
  );
  
  /**
   * Announce calculation results
   */
  const announceResults = useCallback(
    (results: CalculatorResults, primaryKey?: string) => {
      let message = 'Calculation complete.';
      
      // Find primary result
      const primaryResult = primaryKey
        ? results[primaryKey]
        : Object.entries(results)[0]?.[1];
      
      if (primaryResult) {
        const value = primaryResult.formattedValue || primaryResult.value;
        const unit = primaryResult.unit || '';
        
        message = `Calculation complete. Result: ${value}${unit ? ` ${unit}` : ''}.`;
        
        // Add category if present
        if (primaryResult.category) {
          message += ` Category: ${primaryResult.category}.`;
        }
      }
      
      announce(message, 'polite');
    },
    [announce]
  );
  
  /**
   * Announce an error
   */
  const announceError = useCallback(
    (error: string) => {
      announce(`Error: ${error}`, 'assertive');
    },
    [announce]
  );
  
  /**
   * Announce success
   */
  const announceSuccess = useCallback(
    (message: string) => {
      announce(message, 'polite');
    },
    [announce]
  );
  
  /**
   * Clear announcements
   */
  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    const announcer = announcerRef.current;
    if (announcer) {
      announcer.textContent = '';
    }
  }, []);
  
  return {
    announce,
    announceResults,
    announceError,
    announceSuccess,
    clear,
  };
};

export default useAnnouncer;
