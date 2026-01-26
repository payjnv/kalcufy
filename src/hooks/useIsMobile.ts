// ============================================
// USE IS MOBILE HOOK
// ============================================
// Detects if the current viewport is mobile
// Uses matchMedia for accurate detection
// ============================================

'use client';

import { useState, useEffect } from 'react';

// ============================================
// TYPES
// ============================================

export interface UseIsMobileOptions {
  /**
   * Breakpoint in pixels
   * @default 768
   */
  breakpoint?: number;
  
  /**
   * Default value for SSR
   * @default false
   */
  defaultValue?: boolean;
}

// ============================================
// HOOK
// ============================================

export const useIsMobile = (
  options: UseIsMobileOptions = {}
): boolean => {
  const { breakpoint = 768, defaultValue = false } = options;
  
  const [isMobile, setIsMobile] = useState(defaultValue);
  
  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') return;
    
    // Create media query
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    
    // Set initial value
    setIsMobile(mediaQuery.matches);
    
    // Handler for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    
    // Add listener
    mediaQuery.addEventListener('change', handleChange);
    
    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [breakpoint]);
  
  return isMobile;
};

// ============================================
// ADDITIONAL RESPONSIVE HOOKS
// ============================================

/**
 * Check if viewport is tablet or larger
 */
export const useIsTablet = (options: { breakpoint?: number; defaultValue?: boolean } = {}): boolean => {
  const { breakpoint = 768, defaultValue = false } = options;
  
  const [isTablet, setIsTablet] = useState(defaultValue);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);
    setIsTablet(mediaQuery.matches);
    
    const handleChange = (event: MediaQueryListEvent) => {
      setIsTablet(event.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [breakpoint]);
  
  return isTablet;
};

/**
 * Check if viewport is desktop or larger
 */
export const useIsDesktop = (options: { breakpoint?: number; defaultValue?: boolean } = {}): boolean => {
  const { breakpoint = 1024, defaultValue = false } = options;
  
  const [isDesktop, setIsDesktop] = useState(defaultValue);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);
    setIsDesktop(mediaQuery.matches);
    
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [breakpoint]);
  
  return isDesktop;
};

/**
 * Get current breakpoint
 */
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('mobile');
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width >= 1280) {
        setBreakpoint('wide');
      } else if (width >= 1024) {
        setBreakpoint('desktop');
      } else if (width >= 768) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('mobile');
      }
    };
    
    updateBreakpoint();
    
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);
  
  return breakpoint;
};

export default useIsMobile;
