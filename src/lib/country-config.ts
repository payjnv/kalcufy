// =============================================================================
// KALCUFY COUNTRY CONFIG — Centralized geo-economic defaults
// =============================================================================
// Locale = language (en, es, pt, fr, de)
// Country = economic context (US, MX, CO, AR, BR, ES, FR, DE, GB, etc.)
// They are INDEPENDENT — a Mexican in the US can use es + US
// =============================================================================

export const COUNTRY_COOKIE = 'kalcufy-country';

// ─── Country → Currency mapping ─────────────────────────────────────────────
export interface CountryConfig {
  currency: string;
  currencySymbol: string;
  unitPreferences: Record<string, string>;
  placeholders: Record<string, string>;
  numberFormat: {
    decimal: string;     // "." or ","
    thousands: string;   // "," or "."
  };
}

export const COUNTRY_CONFIGS: Record<string, CountryConfig> = {
  // ═══════════════════════════════════════════════════════════════════
  // NORTH AMERICA
  // ═══════════════════════════════════════════════════════════════════
  US: {
    currency: "USD",
    currencySymbol: "$",
    unitPreferences: {
      weight: "lbs", height: "ft_in", body_length: "in",
      temperature: "F", length: "ft", length_large: "mi",
      speed: "mph", volume: "gal", area: "ft²",
    },
    placeholders: {
      income: "50000", salary: "50000", loanAmount: "250000",
      price: "35000", rent: "1500", savings: "10000",
      downPayment: "50000", monthlyPayment: "1500",
      homePrice: "350000", carPrice: "35000",
    },
    numberFormat: { decimal: ".", thousands: "," },
  },
  CA: {
    currency: "CAD",
    currencySymbol: "C$",
    unitPreferences: {
      weight: "lbs", height: "ft_in", body_length: "in",
      temperature: "C", length: "m", length_large: "km",
      speed: "km/h", volume: "L", area: "ft²",
    },
    placeholders: {
      income: "55000", salary: "55000", loanAmount: "400000",
      price: "40000", rent: "1800", savings: "15000",
      downPayment: "80000", monthlyPayment: "2000",
      homePrice: "500000", carPrice: "40000",
    },
    numberFormat: { decimal: ".", thousands: "," },
  },

  // ═══════════════════════════════════════════════════════════════════
  // LATIN AMERICA
  // ═══════════════════════════════════════════════════════════════════
  MX: {
    currency: "MXN",
    currencySymbol: "MX$",
    unitPreferences: {
      weight: "kg", height: "cm", body_length: "cm",
      temperature: "C", length: "m", length_large: "km",
      speed: "km/h", volume: "L", area: "m²",
    },
    placeholders: {
      income: "15000", salary: "15000", loanAmount: "2000000",
      price: "350000", rent: "8000", savings: "50000",
      downPayment: "400000", monthlyPayment: "12000",
      homePrice: "3000000", carPrice: "350000",
    },
    numberFormat: { decimal: ".", thousands: "," },
  },
  CO: {
    currency: "COP",
    currencySymbol: "COL$",
    unitPreferences: {
      weight: "kg", height: "cm", body_length: "cm",
      temperature: "C", length: "m", length_large: "km",
      speed: "km/h", volume: "L", area: "m²",
    },
    placeholders: {
      income: "3000000", salary: "3000000", loanAmount: "200000000",
      price: "50000000", rent: "1500000", savings: "10000000",
      downPayment: "40000000", monthlyPayment: "2000000",
      homePrice: "300000000", carPrice: "80000000",
    },
    numberFormat: { decimal: ",", thousands: "." },
  },
  AR: {
    currency: "ARS",
    currencySymbol: "AR$",
    unitPreferences: {
      weight: "kg", height: "cm", body_length: "cm",
      temperature: "C", length: "m", length_large: "km",
      speed: "km/h", volume: "L", area: "m²",
    },
    placeholders: {
      income: "500000", salary: "500000", loanAmount: "30000000",
      price: "10000000", rent: "200000", savings: "1000000",
      downPayment: "6000000", monthlyPayment: "300000",
      homePrice: "50000000", carPrice: "15000000",
    },
    numberFormat: { decimal: ",", thousands: "." },
  },
  CL: {
    currency: "CLP",
    currencySymbol: "CLP",
    unitPreferences: {
      weight: "kg", height: "cm", body_length: "cm",
      temperature: "C", length: "m", length_large: "km",
      speed: "km/h", volume: "L", area: "m²",
    },
    placeholders: {
      income: "800000", salary: "800000", loanAmount: "80000000",
      price: "12000000", rent: "400000", savings: "5000000",
      downPayment: "16000000", monthlyPayment: "500000",
      homePrice: "120000000", carPrice: "15000000",
    },
    numberFormat: { decimal: ",", thousands: "." },
  },
  PE: {
    currency: "PEN",
    currencySymbol: "S/",
    unitPreferences: {
      weight: "kg", height: "cm", body_length: "cm",
      temperature: "C", length: "m", length_large: "km",
      speed: "km/h", volume: "L", area: "m²",
    },
    placeholders: {
      income: "3000", salary: "3000", loanAmount: "200000",
      price: "50000", rent: "1500", savings: "10000",
      downPayment: "40000", monthlyPayment: "1500",
      homePrice: "350000", carPrice: "60000",
    },
    numberFormat: { decimal: ".", thousands: "," },
  },

  // ═══════════════════════════════════════════════════════════════════
  // BRAZIL
  // ═══════════════════════════════════════════════════════════════════
  BR: {
    currency: "BRL",
    currencySymbol: "R$",
    unitPreferences: {
      weight: "kg", height: "cm", body_length: "cm",
      temperature: "C", length: "m", length_large: "km",
      speed: "km/h", volume: "L", area: "m²",
    },
    placeholders: {
      income: "5000", salary: "5000", loanAmount: "300000",
      price: "80000", rent: "2000", savings: "20000",
      downPayment: "60000", monthlyPayment: "2500",
      homePrice: "500000", carPrice: "80000",
    },
    numberFormat: { decimal: ",", thousands: "." },
  },

  // ═══════════════════════════════════════════════════════════════════
  // EUROPE
  // ═══════════════════════════════════════════════════════════════════
  ES: {
    currency: "EUR",
    currencySymbol: "€",
    unitPreferences: {
      weight: "kg", height: "cm", body_length: "cm",
      temperature: "C", length: "m", length_large: "km",
      speed: "km/h", volume: "L", area: "m²",
    },
    placeholders: {
      income: "25000", salary: "25000", loanAmount: "180000",
      price: "20000", rent: "800", savings: "10000",
      downPayment: "36000", monthlyPayment: "700",
      homePrice: "250000", carPrice: "22000",
    },
    numberFormat: { decimal: ",", thousands: "." },
  },
  FR: {
    currency: "EUR",
    currencySymbol: "€",
    unitPreferences: {
      weight: "kg", height: "cm", body_length: "cm",
      temperature: "C", length: "m", length_large: "km",
      speed: "km/h", volume: "L", area: "m²",
    },
    placeholders: {
      income: "30000", salary: "30000", loanAmount: "220000",
      price: "25000", rent: "900", savings: "15000",
      downPayment: "44000", monthlyPayment: "900",
      homePrice: "300000", carPrice: "25000",
    },
    numberFormat: { decimal: ",", thousands: " " },
  },
  DE: {
    currency: "EUR",
    currencySymbol: "€",
    unitPreferences: {
      weight: "kg", height: "cm", body_length: "cm",
      temperature: "C", length: "m", length_large: "km",
      speed: "km/h", volume: "L", area: "m²",
    },
    placeholders: {
      income: "40000", salary: "40000", loanAmount: "280000",
      price: "30000", rent: "1000", savings: "20000",
      downPayment: "56000", monthlyPayment: "1100",
      homePrice: "380000", carPrice: "30000",
    },
    numberFormat: { decimal: ",", thousands: "." },
  },
  GB: {
    currency: "GBP",
    currencySymbol: "£",
    unitPreferences: {
      weight: "st", height: "ft_in", body_length: "in",
      temperature: "C", length: "m", length_large: "mi",
      speed: "mph", volume: "L", area: "ft²",
    },
    placeholders: {
      income: "30000", salary: "30000", loanAmount: "200000",
      price: "25000", rent: "1200", savings: "10000",
      downPayment: "40000", monthlyPayment: "900",
      homePrice: "280000", carPrice: "25000",
    },
    numberFormat: { decimal: ".", thousands: "," },
  },
  PT: {
    currency: "EUR",
    currencySymbol: "€",
    unitPreferences: {
      weight: "kg", height: "cm", body_length: "cm",
      temperature: "C", length: "m", length_large: "km",
      speed: "km/h", volume: "L", area: "m²",
    },
    placeholders: {
      income: "15000", salary: "15000", loanAmount: "150000",
      price: "18000", rent: "700", savings: "5000",
      downPayment: "30000", monthlyPayment: "600",
      homePrice: "200000", carPrice: "20000",
    },
    numberFormat: { decimal: ",", thousands: "." },
  },

  // ═══════════════════════════════════════════════════════════════════
  // ASIA / OTHER
  // ═══════════════════════════════════════════════════════════════════
  IN: {
    currency: "INR",
    currencySymbol: "₹",
    unitPreferences: {
      weight: "kg", height: "cm", body_length: "cm",
      temperature: "C", length: "m", length_large: "km",
      speed: "km/h", volume: "L", area: "m²",
    },
    placeholders: {
      income: "600000", salary: "50000", loanAmount: "3000000",
      price: "800000", rent: "15000", savings: "200000",
      downPayment: "600000", monthlyPayment: "25000",
      homePrice: "5000000", carPrice: "800000",
    },
    numberFormat: { decimal: ".", thousands: "," },
  },
  JP: {
    currency: "JPY",
    currencySymbol: "¥",
    unitPreferences: {
      weight: "kg", height: "cm", body_length: "cm",
      temperature: "C", length: "m", length_large: "km",
      speed: "km/h", volume: "L", area: "m²",
    },
    placeholders: {
      income: "4000000", salary: "330000", loanAmount: "30000000",
      price: "3000000", rent: "80000", savings: "2000000",
      downPayment: "6000000", monthlyPayment: "100000",
      homePrice: "40000000", carPrice: "3000000",
    },
    numberFormat: { decimal: ".", thousands: "," },
  },
};

// ─── Helper: Get country config with fallback ────────────────────────────────
export function getCountryConfig(country: string): CountryConfig {
  return COUNTRY_CONFIGS[country.toUpperCase()] || COUNTRY_CONFIGS.US;
}

// ─── Helper: Get country from locale fallback ────────────────────────────────
// When no country cookie exists (e.g., first visit before middleware runs)
export const LOCALE_TO_DEFAULT_COUNTRY: Record<string, string> = {
  en: "US",
  es: "ES",   // Default to Spain for generic Spanish
  pt: "BR",   // Default to Brazil for generic Portuguese
  fr: "FR",
  de: "DE",
};

export function getCountryFromLocale(locale: string): string {
  return LOCALE_TO_DEFAULT_COUNTRY[locale] || "US";
}
