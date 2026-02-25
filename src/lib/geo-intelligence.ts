// =============================================================================
// KALCUFY GEO-INTELLIGENCE — Smart financial defaults by country
// =============================================================================
// Import this in any calculator's calculate() function to get local rates,
// prices, and financial context automatically based on the user's country.
//
// Usage in index.ts:
//   import { getGeoDefaults, CURRENCY_SYMBOLS } from "@/lib/geo-intelligence";
//
//   export function calculateMyCalc(data: {
//     values: Record<string, unknown>;
//     fieldUnits?: Record<string, string>;
//     t?: Record<string, unknown>;
//     country?: string;                    // ← add this
//   }): CalculatorResults {
//     const geo = getGeoDefaults(data.country);
//     const interestRate = (values.rate as number) ?? geo.mortgageRate30y;
//   }
// =============================================================================

import { getFinancialData, getCountryConfig, CountryFinancialData } from "@/lib/country-config";

// ─── Currency symbol lookup ───────────────────────────────────────────────────
export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",   CAD: "C$",  MXN: "MX$", COP: "COL$", ARS: "AR$",
  CLP: "CLP", PEN: "S/",  BRL: "R$",  EUR: "€",    GBP: "£",
  INR: "₹",   JPY: "¥",   CHF: "CHF", AUD: "A$",   NZD: "NZ$",
};

// ─── Main geo-defaults object ─────────────────────────────────────────────────
export interface GeoDefaults extends CountryFinancialData {
  country: string;
  currency: string;
  currencySymbol: string;
  /** Format a number as local currency string */
  formatCurrency: (amount: number, decimals?: number) => string;
  /** Format a percentage */
  formatPct: (value: number, decimals?: number) => string;
  /** True if country uses comma as decimal separator */
  commaDecimal: boolean;
}

export function getGeoDefaults(country?: string): GeoDefaults {
  const code = (country || "US").toUpperCase();
  const config = getCountryConfig(code);
  const fin = getFinancialData(code);
  const sym = config.currencySymbol;
  const commaDecimal = config.numberFormat.decimal === ",";

  function formatCurrency(amount: number, decimals = 0): string {
    const absAmount = Math.abs(amount);
    let formatted: string;

    if (commaDecimal) {
      // European format: 1.234.567,00
      formatted = absAmount.toLocaleString("de-DE", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    } else {
      // US/UK format: 1,234,567.00
      formatted = absAmount.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }

    const sign = amount < 0 ? "-" : "";

    // Symbol position: JPY, CLP = no space; most others = no space prefix
    if (["JPY", "CLP"].includes(config.currency)) {
      return `${sign}${sym}${formatted}`;
    }
    if (["EUR"].includes(config.currency) && ["FR", "DE", "ES", "PT"].includes(code)) {
      return `${sign}${formatted} ${sym}`;  // European: 1.000 €
    }
    return `${sign}${sym}${formatted}`;
  }

  function formatPct(value: number, decimals = 1): string {
    return `${value.toFixed(decimals)}%`;
  }

  return {
    country: code,
    currency: config.currency,
    currencySymbol: sym,
    commaDecimal,
    formatCurrency,
    formatPct,
    ...fin,
  };
}

// ─── Utility: Get smart placeholder for a field ───────────────────────────────
export function getPlaceholder(country: string, field: string): string {
  const config = getCountryConfig(country);
  return config.placeholders[field] || "";
}

// ─── Utility: Get currency symbol from fieldUnits ────────────────────────────
export function getCurrencySymbol(fieldUnits?: Record<string, string>, fieldId = "loanAmount"): string {
  const currency = fieldUnits?.[fieldId] || "USD";
  return CURRENCY_SYMBOLS[currency] || "$";
}

// ─── Utility: Format number with country's number format ─────────────────────
export function formatNumber(
  value: number,
  country: string,
  decimals = 0
): string {
  const config = getCountryConfig(country);
  const isCommaDecimal = config.numberFormat.decimal === ",";

  if (isCommaDecimal) {
    return value.toLocaleString("de-DE", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ─── Home Affordability specific ─────────────────────────────────────────────
export function getHomeAffordabilityDefaults(country: string) {
  const geo = getGeoDefaults(country);
  return {
    interestRate: geo.mortgageRate30y,
    propertyTaxRate: geo.propertyTaxRate,
    homeInsuranceRate: geo.homeInsuranceRate,
    maintenanceRate: geo.maintenanceRate,
    closingCostRate: geo.closingCostRate,
    minDownPaymentPct: geo.minDownPaymentPct,
    avgHomePrice: geo.avgHomePrice,
    avgRent: geo.avgRent,
    avgRentGrowthRate: geo.avgRentGrowthRate,
    avgHomePriceGrowthRate: geo.avgHomePriceGrowthRate,
    stockMarketReturn: geo.stockMarketReturn,
  };
}

// ─── Student Loan specific ────────────────────────────────────────────────────
export function getStudentLoanDefaults(country: string) {
  const geo = getGeoDefaults(country);
  return {
    interestRate: geo.studentLoanRate || geo.personalLoanRate * 0.5,
    inflationRate: geo.inflationRate,
    isFreeEducation: geo.studentLoanRate === 0,
  };
}

// ─── Budget specific ──────────────────────────────────────────────────────────
export function getBudgetDefaults(country: string) {
  const geo = getGeoDefaults(country);
  const config = getCountryConfig(country);
  return {
    avgRent: geo.avgRent,
    inflationRate: geo.inflationRate,
    savingsRate: geo.savingsRate,
    incomePlaceholder: config.placeholders.income,
  };
}

// ─── Savings / Investment specific ───────────────────────────────────────────
export function getSavingsDefaults(country: string) {
  const geo = getGeoDefaults(country);
  return {
    interestRate: geo.savingsRate,
    inflationRate: geo.inflationRate,
    stockMarketReturn: geo.stockMarketReturn,
  };
}

// ─── Mortgage specific ───────────────────────────────────────────────────────
export function getMortgageDefaults(country: string) {
  const geo = getGeoDefaults(country);
  return {
    interestRate30y: geo.mortgageRate30y,
    interestRate15y: geo.mortgageRate15y,
    propertyTaxRate: geo.propertyTaxRate,
    homeInsuranceRate: geo.homeInsuranceRate,
    minDownPaymentPct: geo.minDownPaymentPct,
    closingCostRate: geo.closingCostRate,
  };
}

// ─── Loan / Debt specific ─────────────────────────────────────────────────────
export function getLoanDefaults(country: string) {
  const geo = getGeoDefaults(country);
  return {
    personalLoanRate: geo.personalLoanRate,
    autoLoanRate: geo.autoLoanRate,
    creditCardRate: geo.creditCardRate,
    inflationRate: geo.inflationRate,
  };
}
