// src/hooks/useCountry.ts
// =============================================================================
// Hook: Read user's country from cookie (client-side)
// Usage: const { country, countryConfig, setCountry } = useCountry();
// =============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  COUNTRY_COOKIE, 
  getCountryConfig, 
  getCountryFromLocale,
  type CountryConfig 
} from "@/lib/country-config";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function useCountry(locale?: string) {
  const [country, setCountryState] = useState<string>(() => {
    // Try cookie first, fallback to locale-based default
    const fromCookie = getCookie(COUNTRY_COOKIE);
    if (fromCookie) return fromCookie;
    return getCountryFromLocale(locale || "en");
  });

  // Re-read cookie on mount (SSR → client hydration)
  useEffect(() => {
    const fromCookie = getCookie(COUNTRY_COOKIE);
    if (fromCookie && fromCookie !== country) {
      setCountryState(fromCookie);
    }
  }, [country]);

  const countryConfig = getCountryConfig(country);

  // Update country: sets cookie + calls API to persist
  const setCountry = useCallback(async (newCountry: string) => {
    const code = newCountry.toUpperCase();
    setCountryState(code);
    
    // Set cookie client-side immediately
    document.cookie = `${COUNTRY_COOKIE}=${code}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`;
    
    // Persist to server (updates DB if logged in)
    try {
      await fetch("/api/country", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: code }),
      });
    } catch {
      // API failed — cookie still set, not critical
    }
  }, []);

  return { country, countryConfig, setCountry };
}
