// ============================================
// HOOKS INDEX
// ============================================
// All custom hooks for the Calculator Engine
// ============================================

// Main calculator hook
export { useCalculator } from './useCalculator';
export type { UseCalculatorOptions } from './useCalculator';

// Accessibility
export { useAnnouncer } from './useAnnouncer';
export type { UseAnnouncerReturn, UseAnnouncerOptions } from './useAnnouncer';

// Analytics
export { useTracking } from './useTracking';
export type { UseTrackingReturn, UseTrackingOptions, TrackingEventType, TrackingEvent } from './useTracking';

// Responsive
export { 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop, 
  useBreakpoint 
} from './useIsMobile';
export type { UseIsMobileOptions, Breakpoint } from './useIsMobile';
