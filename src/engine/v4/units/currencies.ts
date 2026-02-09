// ============================================================================
// KALCUFY V4 - CURRENCY REGISTRY
// ============================================================================
// Complete currency definitions with symbols, formatting rules,
// and approximate exchange rates for offline conversion.
//
// Rates are approximate defaults — for financial calculators that need 
// exact rates, override with live API data or let users input manually.
// ============================================================================

import type { CurrencyDefinition, UnitGroup } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// CURRENCY DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

export const CURRENCIES: CurrencyDefinition[] = [
  // ── Americas ──────────────────────────────────────────────────────────
  {
    id: "USD", code: "USD", symbol: "USD", name: "US Dollar",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["US"], isBase: true, toBase: 1, approximateRateToUSD: 1, decimals: 2,
  },
  {
    id: "CAD", code: "CAD", symbol: "CAD", name: "Canadian Dollar",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["CA"], toBase: 0.74, approximateRateToUSD: 0.74, decimals: 2,
  },
  {
    id: "MXN", code: "MXN", symbol: "MXN", name: "Mexican Peso",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["MX"], toBase: 0.058, approximateRateToUSD: 0.058, decimals: 2,
  },
  {
    id: "BRL", code: "BRL", symbol: "BRL", name: "Brazilian Real",
    decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2,
    regions: ["BR"], toBase: 0.19, approximateRateToUSD: 0.19, decimals: 2,
  },
  {
    id: "COP", code: "COP", symbol: "COP", name: "Colombian Peso",
    decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 0,
    regions: ["CO"], toBase: 0.00024, approximateRateToUSD: 0.00024, decimals: 0,
  },
  {
    id: "ARS", code: "ARS", symbol: "ARS", name: "Argentine Peso",
    decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2,
    regions: ["AR"], toBase: 0.001, approximateRateToUSD: 0.001, decimals: 2,
  },
  {
    id: "CLP", code: "CLP", symbol: "CLP", name: "Chilean Peso",
    decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 0,
    regions: ["CL"], toBase: 0.001, approximateRateToUSD: 0.001, decimals: 0,
  },
  {
    id: "PEN", code: "PEN", symbol: "PEN", name: "Peruvian Sol",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["PE"], toBase: 0.27, approximateRateToUSD: 0.27, decimals: 2,
  },

  // ── Europe ────────────────────────────────────────────────────────────
  {
    id: "EUR", code: "EUR", symbol: "EUR", name: "Euro",
    decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2,
    regions: ["EU","DE","FR","ES","IT","PT","NL","BE","AT","IE","FI","GR"], toBase: 1.08, approximateRateToUSD: 1.08, decimals: 2,
  },
  {
    id: "GBP", code: "GBP", symbol: "GBP", name: "British Pound",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["GB"], toBase: 1.27, approximateRateToUSD: 1.27, decimals: 2,
  },
  {
    id: "CHF", code: "CHF", symbol: "CHF", name: "Swiss Franc",
    decimalSeparator: ".", thousandsSeparator: "'", decimalPlaces: 2,
    regions: ["CH"], toBase: 1.13, approximateRateToUSD: 1.13, decimals: 2,
  },
  {
    id: "SEK", code: "SEK", symbol: "SEK", name: "Swedish Krona",
    decimalSeparator: ",", thousandsSeparator: " ", decimalPlaces: 2,
    regions: ["SE"], toBase: 0.095, approximateRateToUSD: 0.095, decimals: 2,
  },
  {
    id: "NOK", code: "NOK", symbol: "NOK", name: "Norwegian Krone",
    decimalSeparator: ",", thousandsSeparator: " ", decimalPlaces: 2,
    regions: ["NO"], toBase: 0.093, approximateRateToUSD: 0.093, decimals: 2,
  },
  {
    id: "DKK", code: "DKK", symbol: "DKK", name: "Danish Krone",
    decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2,
    regions: ["DK"], toBase: 0.145, approximateRateToUSD: 0.145, decimals: 2,
  },
  {
    id: "PLN", code: "PLN", symbol: "PLN", name: "Polish Zloty",
    decimalSeparator: ",", thousandsSeparator: " ", decimalPlaces: 2,
    regions: ["PL"], toBase: 0.25, approximateRateToUSD: 0.25, decimals: 2,
  },
  {
    id: "TRY", code: "TRY", symbol: "TRY", name: "Turkish Lira",
    decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2,
    regions: ["TR"], toBase: 0.031, approximateRateToUSD: 0.031, decimals: 2,
  },

  // ── Asia / Pacific ────────────────────────────────────────────────────
  {
    id: "JPY", code: "JPY", symbol: "JPY", name: "Japanese Yen",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 0,
    regions: ["JP"], toBase: 0.0067, approximateRateToUSD: 0.0067, decimals: 0,
  },
  {
    id: "CNY", code: "CNY", symbol: "CNY", name: "Chinese Yuan",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["CN"], toBase: 0.14, approximateRateToUSD: 0.14, decimals: 2,
  },
  {
    id: "KRW", code: "KRW", symbol: "KRW", name: "South Korean Won",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 0,
    regions: ["KR"], toBase: 0.00075, approximateRateToUSD: 0.00075, decimals: 0,
  },
  {
    id: "INR", code: "INR", symbol: "INR", name: "Indian Rupee",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["IN"], toBase: 0.012, approximateRateToUSD: 0.012, decimals: 2,
  },
  {
    id: "AUD", code: "AUD", symbol: "AUD", name: "Australian Dollar",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["AU"], toBase: 0.65, approximateRateToUSD: 0.65, decimals: 2,
  },
  {
    id: "NZD", code: "NZD", symbol: "NZD", name: "New Zealand Dollar",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["NZ"], toBase: 0.60, approximateRateToUSD: 0.60, decimals: 2,
  },
  {
    id: "SGD", code: "SGD", symbol: "SGD", name: "Singapore Dollar",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["SG"], toBase: 0.75, approximateRateToUSD: 0.75, decimals: 2,
  },
  {
    id: "HKD", code: "HKD", symbol: "HKD", name: "Hong Kong Dollar",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["HK"], toBase: 0.128, approximateRateToUSD: 0.128, decimals: 2,
  },
  {
    id: "THB", code: "THB", symbol: "THB", name: "Thai Baht",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["TH"], toBase: 0.029, approximateRateToUSD: 0.029, decimals: 2,
  },
  {
    id: "PHP", code: "PHP", symbol: "PHP", name: "Philippine Peso",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["PH"], toBase: 0.018, approximateRateToUSD: 0.018, decimals: 2,
  },
  {
    id: "IDR", code: "IDR", symbol: "IDR", name: "Indonesian Rupiah",
    decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 0,
    regions: ["ID"], toBase: 0.000063, approximateRateToUSD: 0.000063, decimals: 0,
  },
  {
    id: "MYR", code: "MYR", symbol: "MYR", name: "Malaysian Ringgit",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["MY"], toBase: 0.23, approximateRateToUSD: 0.23, decimals: 2,
  },

  // ── Middle East / Africa ──────────────────────────────────────────────
  {
    id: "AED", code: "AED", symbol: "AED", name: "UAE Dirham",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["AE"], toBase: 0.272, approximateRateToUSD: 0.272, decimals: 2,
  },
  {
    id: "SAR", code: "SAR", symbol: "SAR", name: "Saudi Riyal",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["SA"], toBase: 0.267, approximateRateToUSD: 0.267, decimals: 2,
  },
  {
    id: "ILS", code: "ILS", symbol: "ILS", name: "Israeli Shekel",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["IL"], toBase: 0.28, approximateRateToUSD: 0.28, decimals: 2,
  },
  {
    id: "ZAR", code: "ZAR", symbol: "ZAR", name: "South African Rand",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["ZA"], toBase: 0.055, approximateRateToUSD: 0.055, decimals: 2,
  },
  {
    id: "NGN", code: "NGN", symbol: "NGN", name: "Nigerian Naira",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["NG"], toBase: 0.00063, approximateRateToUSD: 0.00063, decimals: 2,
  },
  {
    id: "EGP", code: "EGP", symbol: "EGP", name: "Egyptian Pound",
    decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2,
    regions: ["EG"], toBase: 0.020, approximateRateToUSD: 0.020, decimals: 2,
  },

  // ── Eastern Europe ────────────────────────────────────────────────────
  {
    id: "RUB", code: "RUB", symbol: "RUB", name: "Russian Ruble",
    decimalSeparator: ",", thousandsSeparator: " ", decimalPlaces: 2,
    regions: ["RU"], toBase: 0.011, approximateRateToUSD: 0.011, decimals: 2,
  },
  {
    id: "CZK", code: "CZK", symbol: "CZK", name: "Czech Koruna",
    decimalSeparator: ",", thousandsSeparator: " ", decimalPlaces: 2,
    regions: ["CZ"], toBase: 0.043, approximateRateToUSD: 0.043, decimals: 2,
  },
  {
    id: "HUF", code: "HUF", symbol: "HUF", name: "Hungarian Forint",
    decimalSeparator: ",", thousandsSeparator: " ", decimalPlaces: 0,
    regions: ["HU"], toBase: 0.0027, approximateRateToUSD: 0.0027, decimals: 0,
  },
  {
    id: "RON", code: "RON", symbol: "RON", name: "Romanian Leu",
    decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2,
    regions: ["RO"], toBase: 0.22, approximateRateToUSD: 0.22, decimals: 2,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CURRENCY AS UNIT GROUP (for unified registry)
// ─────────────────────────────────────────────────────────────────────────────

export const CURRENCY_GROUP: UnitGroup = {
  type: "currency",
  name: "Currency",
  baseUnit: "USD",
  category: "finance",
  units: CURRENCIES.map(c => ({
    id: c.id,
    symbol: c.symbol || c.code,
    name: c.name,
    regions: c.regions,
    isBase: c.isBase,
    toBase: c.approximateRateToUSD,
    decimals: c.decimalPlaces,
  })),
};

// ─────────────────────────────────────────────────────────────────────────────
// CURRENCY HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get currency definition by ISO code
 */
export function getCurrency(code: string): CurrencyDefinition | undefined {
  return CURRENCIES.find(c => c.code === code);
}

/**
 * Get the top N most common currencies (for default dropdown)
 */
export function getTopCurrencies(count: number = 10): CurrencyDefinition[] {
  const topCodes = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "BRL", "MXN", "INR", "CHF", "CNY", "KRW", "SGD"];
  return topCodes.slice(0, count).map(code => getCurrency(code)!).filter(Boolean);
}

/**
 * Get currencies for a specific region (e.g. "LATAM", "EUROPE", "ASIA")
 */
export function getCurrenciesByRegion(region: string): CurrencyDefinition[] {
  const regionMap: Record<string, string[]> = {
    AMERICAS: ["USD", "CAD", "MXN", "BRL", "COP", "ARS", "CLP", "PEN"],
    EUROPE: ["EUR", "GBP", "CHF", "SEK", "NOK", "DKK", "PLN", "CZK", "HUF", "RON", "TRY", "RUB"],
    ASIA: ["JPY", "CNY", "KRW", "INR", "SGD", "HKD", "THB", "PHP", "IDR", "MYR"],
    MIDDLE_EAST: ["AED", "SAR", "ILS", "EGP"],
    OCEANIA: ["AUD", "NZD"],
    AFRICA: ["ZAR", "NGN", "EGP"],
    LATAM: ["BRL", "MXN", "COP", "ARS", "CLP", "PEN"],
  };
  const codes = regionMap[region.toUpperCase()] || [];
  return codes.map(code => getCurrency(code)!).filter(Boolean);
}

/**
 * Format a number according to currency formatting rules
 */
export function formatCurrency(value: number, currencyCode: string): string {
  const currency = getCurrency(currencyCode);
  if (!currency) return String(value);

  const parts = value.toFixed(currency.decimalPlaces).split(".");
  const intPart = parts[0];
  const decPart = parts[1];

  // Add thousands separators
  const sep = currency.thousandsSeparator;
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, sep);

  // Join with decimal separator
  const full = decPart ? `${formatted}${currency.decimalSeparator}${decPart}` : formatted;

  // Position symbol
  if (currency.symbolPosition === "prefix") {
    return `${currency.currencySymbol}${full}`;
  }
  return `${full} ${currency.currencySymbol}`;
}

/**
 * Guess the best default currency based on locale
 */
export function guessCurrencyFromLocale(locale: string): string {
  const localeLower = locale.toLowerCase();
  const map: Record<string, string> = {
    "en-us": "USD", "en-gb": "GBP", "en-au": "AUD", "en-ca": "CAD", "en-nz": "NZD",
    "en-in": "INR", "en-sg": "SGD", "en-hk": "HKD", "en-za": "ZAR", "en-ng": "NGN",
    "es-mx": "MXN", "es-co": "COP", "es-ar": "ARS", "es-cl": "CLP", "es-pe": "PEN",
    "es-es": "EUR", "es": "USD",
    "pt-br": "BRL", "pt-pt": "EUR", "pt": "BRL",
    "fr-fr": "EUR", "fr-ca": "CAD", "fr-ch": "CHF", "fr": "EUR",
    "de-de": "EUR", "de-at": "EUR", "de-ch": "CHF", "de": "EUR",
    "ja-jp": "JPY", "ja": "JPY",
    "zh-cn": "CNY", "zh-tw": "TWD", "zh-hk": "HKD", "zh": "CNY",
    "ko-kr": "KRW", "ko": "KRW",
    "hi-in": "INR", "hi": "INR",
    "ar-ae": "AED", "ar-sa": "SAR", "ar-eg": "EGP",
    "ru-ru": "RUB", "ru": "RUB",
    "tr-tr": "TRY", "tr": "TRY",
    "pl-pl": "PLN", "pl": "PLN",
    "it-it": "EUR", "it": "EUR",
    "nl-nl": "EUR", "nl": "EUR",
    "sv-se": "SEK", "sv": "SEK",
    "nb-no": "NOK", "no": "NOK",
    "da-dk": "DKK", "da": "DKK",
    "th-th": "THB", "th": "THB",
    "id-id": "IDR", "id": "IDR",
  };

  // Try full locale first, then language prefix
  return map[localeLower] || map[localeLower.split("-")[0]] || "USD";
}
