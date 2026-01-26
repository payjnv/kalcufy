// ============================================
// USE TRACKING HOOK
// ============================================
// Handles analytics tracking for calculators
// Tracks views and calculations
// ============================================

'use client';

import { useCallback, useRef, useEffect } from 'react';

// ============================================
// TYPES
// ============================================

export type TrackingEventType = 'VIEW' | 'CALCULATION' | 'EXPORT' | 'SHARE' | 'FAVORITE';

export interface TrackingEvent {
  calculatorSlug: string;
  language: string;
  type: TrackingEventType;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export interface UseTrackingReturn {
  /**
   * Track a page view
   */
  trackView: () => void;
  
  /**
   * Track a calculation event
   */
  trackCalculation: (metadata?: Record<string, unknown>) => void;
  
  /**
   * Track an export event (PDF, Excel, etc.)
   */
  trackExport: (format: string) => void;
  
  /**
   * Track a share event
   */
  trackShare: (platform?: string) => void;
  
  /**
   * Track a favorite event
   */
  trackFavorite: () => void;
  
  /**
   * Generic track function
   */
  track: (type: TrackingEventType, metadata?: Record<string, unknown>) => void;
}

export interface UseTrackingOptions {
  calculatorSlug: string;
  locale: string;
  enabled?: boolean;
  endpoint?: string;
  debounceMs?: number;
}

// ============================================
// CONSTANTS
// ============================================

const DEFAULT_ENDPOINT = '/api/track';
const DEFAULT_DEBOUNCE = 1000; // 1 second

// ============================================
// HOOK
// ============================================

export const useTracking = ({
  calculatorSlug,
  locale,
  enabled = true,
  endpoint = DEFAULT_ENDPOINT,
  debounceMs = DEFAULT_DEBOUNCE,
}: UseTrackingOptions): UseTrackingReturn => {
  // Track if view has been sent
  const viewTrackedRef = useRef(false);
  
  // Debounce tracking calls
  const lastTrackRef = useRef<Record<TrackingEventType, number>>({
    VIEW: 0,
    CALCULATION: 0,
    EXPORT: 0,
    SHARE: 0,
    FAVORITE: 0,
  });
  
  /**
   * Send tracking event to API
   */
  const sendTrackingEvent = useCallback(
    async (event: TrackingEvent) => {
      if (!enabled) return;
      
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        });
        
        if (!response.ok) {
          console.warn('Tracking failed:', response.statusText);
        }
      } catch (error) {
        // Silently fail - tracking shouldn't break the app
        console.warn('Tracking error:', error);
      }
    },
    [enabled, endpoint]
  );
  
  /**
   * Generic track function with debouncing
   */
  const track = useCallback(
    (type: TrackingEventType, metadata?: Record<string, unknown>) => {
      if (!enabled) return;
      
      const now = Date.now();
      const lastTrack = lastTrackRef.current[type];
      
      // Debounce (except for VIEW which should only fire once)
      if (type !== 'VIEW' && now - lastTrack < debounceMs) {
        return;
      }
      
      lastTrackRef.current[type] = now;
      
      const event: TrackingEvent = {
        calculatorSlug,
        language: locale,
        type,
        timestamp: new Date().toISOString(),
        metadata,
      };
      
      sendTrackingEvent(event);
    },
    [enabled, calculatorSlug, locale, debounceMs, sendTrackingEvent]
  );
  
  /**
   * Track page view (only once per mount)
   */
  const trackView = useCallback(() => {
    if (viewTrackedRef.current) return;
    viewTrackedRef.current = true;
    track('VIEW');
  }, [track]);
  
  /**
   * Track calculation
   */
  const trackCalculation = useCallback(
    (metadata?: Record<string, unknown>) => {
      track('CALCULATION', metadata);
    },
    [track]
  );
  
  /**
   * Track export
   */
  const trackExport = useCallback(
    (format: string) => {
      track('EXPORT', { format });
    },
    [track]
  );
  
  /**
   * Track share
   */
  const trackShare = useCallback(
    (platform?: string) => {
      track('SHARE', { platform });
    },
    [track]
  );
  
  /**
   * Track favorite
   */
  const trackFavorite = useCallback(() => {
    track('FAVORITE');
  }, [track]);
  
  // Reset view tracking on unmount
  useEffect(() => {
    return () => {
      viewTrackedRef.current = false;
    };
  }, [calculatorSlug]);
  
  return {
    trackView,
    trackCalculation,
    trackExport,
    trackShare,
    trackFavorite,
    track,
  };
};

export default useTracking;
