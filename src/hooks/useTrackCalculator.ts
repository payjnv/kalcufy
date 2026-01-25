"use client";

import { useEffect, useRef, useCallback } from "react";

export function useTrackCalculator(calculatorSlug: string) {
  const sessionIdRef = useRef<string>("");
  const hasTrackedCalculation = useRef<boolean>(false);
  const isInitialized = useRef<boolean>(false);

  // Generate session ID on mount
  useEffect(() => {
    sessionIdRef.current = Math.random().toString(36).substring(7);
    
    // Track VIEW on page load (only once)
    const trackView = async () => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            calculatorSlug,
            language: window.location.pathname.split("/")[1] || "en",
            type: "VIEW",
            sessionId: sessionIdRef.current,
          }),
        });
      } catch (error) {
        console.error("Track view error:", error);
      }
    };

    trackView();
    
    // Mark as initialized after a short delay (let first render complete)
    const timer = setTimeout(() => {
      isInitialized.current = true;
    }, 500);

    return () => clearTimeout(timer);
  }, [calculatorSlug]);

  // Function to call when user makes a calculation
  const trackCalculation = useCallback(async () => {
    // Don't track if not initialized or already tracked
    if (!isInitialized.current || hasTrackedCalculation.current) return;
    
    hasTrackedCalculation.current = true;

    try {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calculatorSlug,
          language: window.location.pathname.split("/")[1] || "en",
          type: "CALCULATION",
          sessionId: sessionIdRef.current,
        }),
      });
    } catch (error) {
      console.error("Track calculation error:", error);
    }
  }, [calculatorSlug]);

  return { trackCalculation };
}
