// =============================================================================
// CURRENCY HELPER - Auto-detect country and format currency
// =============================================================================

// País → Código de moneda ISO 4217
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  // América del Norte
  US: "USD", CA: "CAD", MX: "MXN",
  // Centroamérica y Caribe
  DO: "DOP", PR: "USD", CU: "CUP", GT: "GTQ", HN: "HNL",
  SV: "USD", NI: "NIO", CR: "CRC", PA: "USD", JM: "JMD", HT: "HTG",
  // América del Sur
  BR: "BRL", AR: "ARS", CL: "CLP", CO: "COP", PE: "PEN",
  VE: "VES", EC: "USD", UY: "UYU", PY: "PYG", BO: "BOB",
  // Europa
  ES: "EUR", PT: "EUR", FR: "EUR", DE: "EUR", IT: "EUR",
  GB: "GBP", CH: "CHF",
  DEFAULT: "USD",
};

// Moneda → Configuración de formato (SIEMPRE 2 decimales para centavos)
const CURRENCY_CONFIG: Record<string, {
  symbol: string;
  code: string;
  locale: string;
  position: "before" | "after";
}> = {
  USD: { symbol: "$", code: "USD", locale: "en-US", position: "before" },
  EUR: { symbol: "€", code: "EUR", locale: "es-ES", position: "after" },
  GBP: { symbol: "£", code: "GBP", locale: "en-GB", position: "before" },
  MXN: { symbol: "MX$", code: "MXN", locale: "es-MX", position: "before" },
  DOP: { symbol: "RD$", code: "DOP", locale: "es-DO", position: "before" },
  BRL: { symbol: "R$", code: "BRL", locale: "pt-BR", position: "before" },
  ARS: { symbol: "AR$", code: "ARS", locale: "es-AR", position: "before" },
  COP: { symbol: "COL$", code: "COP", locale: "es-CO", position: "before" },
  CLP: { symbol: "CLP$", code: "CLP", locale: "es-CL", position: "before" },
  PEN: { symbol: "S/", code: "PEN", locale: "es-PE", position: "before" },
  CAD: { symbol: "CA$", code: "CAD", locale: "en-CA", position: "before" },
  GTQ: { symbol: "Q", code: "GTQ", locale: "es-GT", position: "before" },
  CRC: { symbol: "₡", code: "CRC", locale: "es-CR", position: "before" },
  UYU: { symbol: "$U", code: "UYU", locale: "es-UY", position: "before" },
  VES: { symbol: "Bs.", code: "VES", locale: "es-VE", position: "before" },
  HNL: { symbol: "L", code: "HNL", locale: "es-HN", position: "before" },
  NIO: { symbol: "C$", code: "NIO", locale: "es-NI", position: "before" },
  BOB: { symbol: "Bs", code: "BOB", locale: "es-BO", position: "before" },
  PYG: { symbol: "₲", code: "PYG", locale: "es-PY", position: "before" },
  JMD: { symbol: "J$", code: "JMD", locale: "en-JM", position: "before" },
  CHF: { symbol: "CHF", code: "CHF", locale: "de-CH", position: "before" },
};

export type CurrencyCode = keyof typeof CURRENCY_CONFIG;

// =============================================================================
// DETECT COUNTRY
// =============================================================================
export function detectCountry(headers?: Headers): string {
  // 1. Vercel geo headers
  if (headers) {
    const country = headers.get("x-vercel-ip-country");
    if (country) return country;
  }

  // 2. Cliente: timezone
  if (typeof window !== "undefined") {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const countryFromTz = getCountryFromTimezone(timezone);
      if (countryFromTz) return countryFromTz;
    } catch {}

    // 3. Navigator locale
    try {
      const locale = navigator.language || (navigator as any).userLanguage;
      if (locale) {
        const parts = locale.split("-");
        if (parts[1]) return parts[1].toUpperCase();
      }
    } catch {}
  }

  return "US";
}

function getCountryFromTimezone(timezone: string): string | null {
  const tzToCountry: Record<string, string> = {
    "America/New_York": "US", "America/Los_Angeles": "US", "America/Chicago": "US",
    "America/Denver": "US", "America/Mexico_City": "MX", "America/Cancun": "MX",
    "America/Tijuana": "MX", "America/Santo_Domingo": "DO", "America/Bogota": "CO",
    "America/Lima": "PE", "America/Santiago": "CL", "America/Buenos_Aires": "AR",
    "America/Sao_Paulo": "BR", "America/Caracas": "VE", "America/Guatemala": "GT",
    "America/Costa_Rica": "CR", "America/Panama": "PA", "America/Puerto_Rico": "PR",
    "America/Havana": "CU", "America/Jamaica": "JM", "America/Toronto": "CA",
    "America/Vancouver": "CA", "Europe/Madrid": "ES", "Europe/Lisbon": "PT",
    "Europe/Paris": "FR", "Europe/Berlin": "DE", "Europe/Rome": "IT",
    "Europe/London": "GB", "Europe/Zurich": "CH",
  };
  return tzToCountry[timezone] || null;
}

// =============================================================================
// GET CURRENCY
// =============================================================================
export function getCurrencyForCountry(countryCode: string): typeof CURRENCY_CONFIG[string] {
  const currencyCode = COUNTRY_TO_CURRENCY[countryCode] || COUNTRY_TO_CURRENCY.DEFAULT;
  return CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG.USD;
}

export function getCurrencyConfig(currencyCode: CurrencyCode): typeof CURRENCY_CONFIG[string] {
  return CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG.USD;
}

// =============================================================================
// FORMAT CURRENCY - SIEMPRE CON CENTAVOS (.00)
// =============================================================================
export function formatCurrency(
  value: number,
  currencyCode: CurrencyCode = "USD",
  options?: {
    compact?: boolean;
    decimals?: number;
  }
): string {
  const config = CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG.USD;
  const { compact = false, decimals = 2 } = options || {};

  try {
    // Formatear número con separadores de miles y decimales
    const formatted = new Intl.NumberFormat(config.locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      notation: compact ? "compact" : "standard",
    }).format(value);

    // Agregar símbolo según posición
    if (config.position === "after") {
      return `${formatted} ${config.symbol} ${config.code}`;
    }
    return `${config.symbol}${formatted} ${config.code}`;
  } catch {
    return `${config.symbol}${value.toFixed(decimals)} ${config.code}`;
  }
}

// Formato automático detectando país
export function formatCurrencyAuto(
  value: number,
  headers?: Headers,
  options?: Parameters<typeof formatCurrency>[2]
): string {
  const country = detectCountry(headers);
  const currency = getCurrencyForCountry(country);
  return formatCurrency(value, currency.code as CurrencyCode, options);
}

// =============================================================================
// REACT HOOK
// =============================================================================
import { useState, useEffect } from "react";

export interface CurrencyInfo {
  country: string;
  currency: typeof CURRENCY_CONFIG[string];
  currencyCode: CurrencyCode;
  format: (value: number, options?: { compact?: boolean; decimals?: number }) => string;
  isLoading: boolean;
}

export function useCurrency(overrideCountry?: string): CurrencyInfo {
  const [country, setCountry] = useState<string>("US");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (overrideCountry) {
      setCountry(overrideCountry);
      setIsLoading(false);
    } else {
      const detected = detectCountry();
      setCountry(detected);
      setIsLoading(false);
    }
  }, [overrideCountry]);

  const currency = getCurrencyForCountry(country);
  const currencyCode = (COUNTRY_TO_CURRENCY[country] || "USD") as CurrencyCode;

  const format = (value: number, options?: { compact?: boolean; decimals?: number }) => {
    return formatCurrency(value, currencyCode, options);
  };

  return { country, currency, currencyCode, format, isLoading };
}

export { COUNTRY_TO_CURRENCY, CURRENCY_CONFIG };
