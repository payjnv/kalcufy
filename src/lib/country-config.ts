// =============================================================================
// KALCUFY COUNTRY CONFIG — Centralized geo-economic defaults
// =============================================================================
// Locale = language (en, es, pt, fr, de)
// Country = economic context (US, MX, CO, AR, BR, ES, FR, DE, GB, etc.)
// They are INDEPENDENT — a Mexican in the US can use es + US
// =============================================================================

export const COUNTRY_COOKIE = 'kalcufy-country';

// ─── Financial data by country ───────────────────────────────────────────────
export interface CountryFinancialData {
  // Mortgage / Home
  mortgageRate30y: number;        // % average 30-year fixed (or equivalent)
  mortgageRate15y: number;        // % 15-year fixed (or equivalent)
  avgHomePrice: number;           // Local currency
  propertyTaxRate: number;        // % of home value per year
  homeInsuranceRate: number;      // % of home value per year
  maintenanceRate: number;        // % of home value per year
  avgRent: number;                // Local currency per month (1BR)
  closingCostRate: number;        // % of home price
  // Investment / Savings
  savingsRate: number;            // % typical high-yield savings
  stockMarketReturn: number;      // % historical avg annual return
  inflationRate: number;          // % current/recent avg
  // Loans
  personalLoanRate: number;       // % avg personal loan APR
  autoLoanRate: number;           // % avg auto loan APR
  studentLoanRate: number;        // % avg student loan rate (0 if free education)
  creditCardRate: number;         // % avg credit card APR
  // Taxes (simplified)
  capitalGainsTaxRate: number;    // % long-term capital gains
  // Down payment convention
  minDownPaymentPct: number;      // % minimum conventional down payment
  // Rent growth
  avgRentGrowthRate: number;      // % annual rent increase
  avgHomePriceGrowthRate: number; // % annual home appreciation
}

export interface CountryConfig {
  currency: string;
  currencySymbol: string;
  unitPreferences: Record<string, string>;
  placeholders: Record<string, string>;
  numberFormat: {
    decimal: string;
    thousands: string;
  };
  financialData: CountryFinancialData;
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
      income: "75000", salary: "75000", loanAmount: "250000",
      price: "35000", rent: "1800", savings: "10000",
      downPayment: "60000", monthlyPayment: "1800",
      homePrice: "420000", carPrice: "35000",
    },
    numberFormat: { decimal: ".", thousands: "," },
    financialData: {
      mortgageRate30y: 6.8,
      mortgageRate15y: 6.1,
      avgHomePrice: 420000,
      propertyTaxRate: 1.1,
      homeInsuranceRate: 0.5,
      maintenanceRate: 1.0,
      avgRent: 1800,
      closingCostRate: 3.0,
      savingsRate: 4.5,
      stockMarketReturn: 7.0,
      inflationRate: 3.1,
      personalLoanRate: 12.0,
      autoLoanRate: 7.1,
      studentLoanRate: 6.5,
      creditCardRate: 21.5,
      capitalGainsTaxRate: 15.0,
      minDownPaymentPct: 3.0,
      avgRentGrowthRate: 3.5,
      avgHomePriceGrowthRate: 4.0,
    },
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
      income: "70000", salary: "70000", loanAmount: "400000",
      price: "40000", rent: "2200", savings: "15000",
      downPayment: "80000", monthlyPayment: "2200",
      homePrice: "700000", carPrice: "40000",
    },
    numberFormat: { decimal: ".", thousands: "," },
    financialData: {
      mortgageRate30y: 5.5,
      mortgageRate15y: 5.0,
      avgHomePrice: 700000,
      propertyTaxRate: 0.9,
      homeInsuranceRate: 0.4,
      maintenanceRate: 1.0,
      avgRent: 2200,
      closingCostRate: 1.5,
      savingsRate: 4.0,
      stockMarketReturn: 6.5,
      inflationRate: 2.8,
      personalLoanRate: 10.0,
      autoLoanRate: 7.5,
      studentLoanRate: 5.5,
      creditCardRate: 20.0,
      capitalGainsTaxRate: 26.7,
      minDownPaymentPct: 5.0,
      avgRentGrowthRate: 4.0,
      avgHomePriceGrowthRate: 3.5,
    },
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
      income: "18000", salary: "18000", loanAmount: "2000000",
      price: "350000", rent: "10000", savings: "50000",
      downPayment: "400000", monthlyPayment: "15000",
      homePrice: "2500000", carPrice: "350000",
    },
    numberFormat: { decimal: ".", thousands: "," },
    financialData: {
      mortgageRate30y: 10.5,
      mortgageRate15y: 10.0,
      avgHomePrice: 2500000,
      propertyTaxRate: 0.1,
      homeInsuranceRate: 0.3,
      maintenanceRate: 0.8,
      avgRent: 10000,
      closingCostRate: 4.0,
      savingsRate: 10.5,        // CETES rate
      stockMarketReturn: 8.0,
      inflationRate: 4.8,
      personalLoanRate: 35.0,
      autoLoanRate: 14.0,
      studentLoanRate: 0,       // CONACYT/becas (no préstamos masivos)
      creditCardRate: 45.0,
      capitalGainsTaxRate: 10.0,
      minDownPaymentPct: 20.0,  // INFONAVIT/bancario: 20%
      avgRentGrowthRate: 5.0,
      avgHomePriceGrowthRate: 6.0,
    },
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
    financialData: {
      mortgageRate30y: 13.5,
      mortgageRate15y: 13.0,
      avgHomePrice: 300000000,
      propertyTaxRate: 0.5,
      homeInsuranceRate: 0.3,
      maintenanceRate: 0.8,
      avgRent: 1500000,
      closingCostRate: 3.5,
      savingsRate: 11.0,        // CDT rate
      stockMarketReturn: 9.0,
      inflationRate: 6.5,
      personalLoanRate: 28.0,
      autoLoanRate: 18.0,
      studentLoanRate: 5.0,     // ICETEX
      creditCardRate: 32.0,
      capitalGainsTaxRate: 10.0,
      minDownPaymentPct: 30.0,
      avgRentGrowthRate: 6.0,
      avgHomePriceGrowthRate: 7.0,
    },
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
      income: "800000", salary: "800000", loanAmount: "50000000",
      price: "15000000", rent: "400000", savings: "2000000",
      downPayment: "10000000", monthlyPayment: "600000",
      homePrice: "60000000", carPrice: "20000000",
    },
    numberFormat: { decimal: ",", thousands: "." },
    financialData: {
      mortgageRate30y: 8.5,     // UVA adjustable (official), real varies
      mortgageRate15y: 8.0,
      avgHomePrice: 60000000,
      propertyTaxRate: 0.5,
      homeInsuranceRate: 0.5,
      maintenanceRate: 1.0,
      avgRent: 400000,
      closingCostRate: 4.0,
      savingsRate: 40.0,        // Plazo fijo tasa nominal
      stockMarketReturn: 60.0,  // Nominal (inflation-adjusted ~8%)
      inflationRate: 110.0,     // 2024 est. (use carefully)
      personalLoanRate: 70.0,
      autoLoanRate: 55.0,
      studentLoanRate: 0,       // Educación universitaria gratuita
      creditCardRate: 80.0,
      capitalGainsTaxRate: 15.0,
      minDownPaymentPct: 20.0,
      avgRentGrowthRate: 80.0,  // Nominal
      avgHomePriceGrowthRate: 50.0,
    },
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
      income: "900000", salary: "900000", loanAmount: "80000000",
      price: "12000000", rent: "450000", savings: "5000000",
      downPayment: "16000000", monthlyPayment: "600000",
      homePrice: "120000000", carPrice: "15000000",
    },
    numberFormat: { decimal: ",", thousands: "." },
    financialData: {
      mortgageRate30y: 5.2,
      mortgageRate15y: 4.8,
      avgHomePrice: 120000000,
      propertyTaxRate: 1.0,
      homeInsuranceRate: 0.3,
      maintenanceRate: 0.8,
      avgRent: 450000,
      closingCostRate: 2.5,
      savingsRate: 5.0,
      stockMarketReturn: 7.0,
      inflationRate: 4.5,
      personalLoanRate: 18.0,
      autoLoanRate: 10.0,
      studentLoanRate: 6.0,    // CAE
      creditCardRate: 28.0,
      capitalGainsTaxRate: 0,  // Exento primer 8000 UF
      minDownPaymentPct: 20.0,
      avgRentGrowthRate: 4.5,
      avgHomePriceGrowthRate: 5.0,
    },
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
      income: "3500", salary: "3500", loanAmount: "200000",
      price: "50000", rent: "1800", savings: "10000",
      downPayment: "40000", monthlyPayment: "1800",
      homePrice: "350000", carPrice: "60000",
    },
    numberFormat: { decimal: ".", thousands: "," },
    financialData: {
      mortgageRate30y: 8.0,
      mortgageRate15y: 7.5,
      avgHomePrice: 350000,
      propertyTaxRate: 0.6,
      homeInsuranceRate: 0.3,
      maintenanceRate: 0.8,
      avgRent: 1800,
      closingCostRate: 3.0,
      savingsRate: 5.5,
      stockMarketReturn: 8.0,
      inflationRate: 3.5,
      personalLoanRate: 22.0,
      autoLoanRate: 12.0,
      studentLoanRate: 9.0,    // PRONABEC condicionado
      creditCardRate: 48.0,
      capitalGainsTaxRate: 5.0,
      minDownPaymentPct: 20.0,
      avgRentGrowthRate: 4.0,
      avgHomePriceGrowthRate: 5.0,
    },
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
      income: "6000", salary: "6000", loanAmount: "300000",
      price: "80000", rent: "2500", savings: "20000",
      downPayment: "60000", monthlyPayment: "2500",
      homePrice: "500000", carPrice: "80000",
    },
    numberFormat: { decimal: ",", thousands: "." },
    financialData: {
      mortgageRate30y: 10.9,   // Caixa Econômica (TR + spread)
      mortgageRate15y: 10.5,
      avgHomePrice: 500000,
      propertyTaxRate: 1.0,    // IPTU avg
      homeInsuranceRate: 0.4,
      maintenanceRate: 1.0,
      avgRent: 2500,
      closingCostRate: 4.0,   // ITBI + cartório
      savingsRate: 10.5,      // Selic-based CDB
      stockMarketReturn: 8.0,
      inflationRate: 4.5,     // IPCA target
      personalLoanRate: 45.0,
      autoLoanRate: 18.0,
      studentLoanRate: 0,     // FIES subsidiado / ProUni gratuito
      creditCardRate: 400.0,  // Rotativo (famoso no BR)
      capitalGainsTaxRate: 15.0,
      minDownPaymentPct: 20.0,
      avgRentGrowthRate: 5.0,
      avgHomePriceGrowthRate: 6.0,
    },
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
      income: "28000", salary: "28000", loanAmount: "180000",
      price: "20000", rent: "900", savings: "10000",
      downPayment: "36000", monthlyPayment: "750",
      homePrice: "250000", carPrice: "22000",
    },
    numberFormat: { decimal: ",", thousands: "." },
    financialData: {
      mortgageRate30y: 3.8,    // Euribor + spread variable
      mortgageRate15y: 3.5,
      avgHomePrice: 250000,
      propertyTaxRate: 0.5,   // IBI avg
      homeInsuranceRate: 0.2,
      maintenanceRate: 0.8,
      avgRent: 900,
      closingCostRate: 10.0,  // ITP + notario + registro
      savingsRate: 3.0,       // Depósito/OCU
      stockMarketReturn: 6.5,
      inflationRate: 2.8,
      personalLoanRate: 8.0,
      autoLoanRate: 6.5,
      studentLoanRate: 0,     // Universidad pública ~1000€/año
      creditCardRate: 22.0,
      capitalGainsTaxRate: 21.0,
      minDownPaymentPct: 20.0,
      avgRentGrowthRate: 7.0, // Alta tensión 2024-2025
      avgHomePriceGrowthRate: 6.0,
    },
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
      income: "35000", salary: "35000", loanAmount: "220000",
      price: "25000", rent: "1000", savings: "15000",
      downPayment: "44000", monthlyPayment: "950",
      homePrice: "300000", carPrice: "25000",
    },
    numberFormat: { decimal: ",", thousands: " " },
    financialData: {
      mortgageRate30y: 3.5,
      mortgageRate15y: 3.2,
      avgHomePrice: 300000,
      propertyTaxRate: 0.6,
      homeInsuranceRate: 0.2,
      maintenanceRate: 0.8,
      avgRent: 1000,
      closingCostRate: 7.5,   // Frais de notaire
      savingsRate: 3.0,       // Livret A
      stockMarketReturn: 6.5,
      inflationRate: 2.5,
      personalLoanRate: 7.5,
      autoLoanRate: 6.0,
      studentLoanRate: 0,     // Université ~200€/an
      creditCardRate: 20.0,
      capitalGainsTaxRate: 30.0, // Flat tax PFU
      minDownPaymentPct: 10.0,
      avgRentGrowthRate: 3.5,
      avgHomePriceGrowthRate: 2.5,
    },
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
      income: "45000", salary: "45000", loanAmount: "280000",
      price: "30000", rent: "1100", savings: "20000",
      downPayment: "56000", monthlyPayment: "1100",
      homePrice: "380000", carPrice: "30000",
    },
    numberFormat: { decimal: ",", thousands: "." },
    financialData: {
      mortgageRate30y: 3.7,
      mortgageRate15y: 3.4,
      avgHomePrice: 380000,
      propertyTaxRate: 0.6,    // Grundsteuer avg
      homeInsuranceRate: 0.2,
      maintenanceRate: 1.0,
      avgRent: 1100,
      closingCostRate: 10.0,   // GrESt + Notar + Makler
      savingsRate: 3.5,        // Tagesgeld
      stockMarketReturn: 6.5,
      inflationRate: 2.6,
      personalLoanRate: 7.0,
      autoLoanRate: 5.5,
      studentLoanRate: 0,      // Studium ~300€/Sem (Semesterbeitrag)
      creditCardRate: 18.0,
      capitalGainsTaxRate: 25.0, // Abgeltungsteuer
      minDownPaymentPct: 20.0,
      avgRentGrowthRate: 3.5,
      avgHomePriceGrowthRate: 2.0,
    },
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
      income: "35000", salary: "35000", loanAmount: "250000",
      price: "25000", rent: "1400", savings: "10000",
      downPayment: "50000", monthlyPayment: "1200",
      homePrice: "300000", carPrice: "25000",
    },
    numberFormat: { decimal: ".", thousands: "," },
    financialData: {
      mortgageRate30y: 4.5,
      mortgageRate15y: 4.2,
      avgHomePrice: 285000,
      propertyTaxRate: 0.7,   // Council tax avg
      homeInsuranceRate: 0.2,
      maintenanceRate: 1.0,
      avgRent: 1400,
      closingCostRate: 2.0,   // Stamp duty (below £250k = 0%)
      savingsRate: 4.5,       // ISA / easy access
      stockMarketReturn: 6.5,
      inflationRate: 2.8,
      personalLoanRate: 8.5,
      autoLoanRate: 8.0,
      studentLoanRate: 6.25,  // Plan 2/5 student loans
      creditCardRate: 23.0,
      capitalGainsTaxRate: 18.0,
      minDownPaymentPct: 5.0,
      avgRentGrowthRate: 5.5,
      avgHomePriceGrowthRate: 3.0,
    },
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
      income: "16000", salary: "16000", loanAmount: "150000",
      price: "18000", rent: "900", savings: "5000",
      downPayment: "30000", monthlyPayment: "650",
      homePrice: "220000", carPrice: "20000",
    },
    numberFormat: { decimal: ",", thousands: "." },
    financialData: {
      mortgageRate30y: 4.0,
      mortgageRate15y: 3.7,
      avgHomePrice: 220000,
      propertyTaxRate: 0.4,   // IMI avg
      homeInsuranceRate: 0.2,
      maintenanceRate: 0.8,
      avgRent: 900,
      closingCostRate: 8.0,   // IMT + notário + registo
      savingsRate: 2.8,
      stockMarketReturn: 6.0,
      inflationRate: 2.5,
      personalLoanRate: 9.0,
      autoLoanRate: 7.0,
      studentLoanRate: 0,     // Ensino superior ~700€/ano
      creditCardRate: 22.0,
      capitalGainsTaxRate: 28.0,
      minDownPaymentPct: 20.0,
      avgRentGrowthRate: 8.0,  // Lisboa/Porto muy alto
      avgHomePriceGrowthRate: 7.0,
    },
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
      income: "600000", salary: "50000", loanAmount: "5000000",
      price: "800000", rent: "20000", savings: "200000",
      downPayment: "1000000", monthlyPayment: "40000",
      homePrice: "7500000", carPrice: "800000",
    },
    numberFormat: { decimal: ".", thousands: "," },
    financialData: {
      mortgageRate30y: 8.5,
      mortgageRate15y: 8.2,
      avgHomePrice: 7500000,
      propertyTaxRate: 0.5,
      homeInsuranceRate: 0.1,
      maintenanceRate: 0.5,
      avgRent: 20000,
      closingCostRate: 7.0,   // Stamp duty + registration
      savingsRate: 7.1,       // FD rate SBI
      stockMarketReturn: 12.0, // NIFTY 50 historical
      inflationRate: 5.0,
      personalLoanRate: 15.0,
      autoLoanRate: 9.5,
      studentLoanRate: 11.0,  // Education loan avg
      creditCardRate: 36.0,
      capitalGainsTaxRate: 10.0,
      minDownPaymentPct: 20.0,
      avgRentGrowthRate: 7.0,
      avgHomePriceGrowthRate: 8.0,
    },
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
      income: "4500000", salary: "375000", loanAmount: "30000000",
      price: "3000000", rent: "90000", savings: "2000000",
      downPayment: "6000000", monthlyPayment: "120000",
      homePrice: "45000000", carPrice: "3000000",
    },
    numberFormat: { decimal: ".", thousands: "," },
    financialData: {
      mortgageRate30y: 1.8,    // Fixed 35y Flat35 (Aruhi)
      mortgageRate15y: 1.5,
      avgHomePrice: 45000000,
      propertyTaxRate: 1.4,
      homeInsuranceRate: 0.1,
      maintenanceRate: 0.8,
      avgRent: 90000,
      closingCostRate: 5.0,
      savingsRate: 0.2,        // Ordinary deposit rate
      stockMarketReturn: 7.0,  // NIKKEI long term
      inflationRate: 2.5,
      personalLoanRate: 14.0,
      autoLoanRate: 3.5,
      studentLoanRate: 0.9,   // JASSO dai-2-shu
      creditCardRate: 15.0,
      capitalGainsTaxRate: 20.315,
      minDownPaymentPct: 10.0,
      avgRentGrowthRate: 2.0,
      avgHomePriceGrowthRate: 3.0,
    },
  },
};

// ─── Helper: Get country config with fallback ────────────────────────────────
export function getCountryConfig(country: string): CountryConfig {
  return COUNTRY_CONFIGS[country.toUpperCase()] || COUNTRY_CONFIGS.US;
}

// ─── Helper: Get financial data for a country ────────────────────────────────
export function getFinancialData(country: string): CountryFinancialData {
  return getCountryConfig(country).financialData;
}

// ─── Helper: Get country from locale fallback ────────────────────────────────
export const LOCALE_TO_DEFAULT_COUNTRY: Record<string, string> = {
  en: "US",
  es: "ES",
  pt: "BR",
  fr: "FR",
  de: "DE",
};

export function getCountryFromLocale(locale: string): string {
  return LOCALE_TO_DEFAULT_COUNTRY[locale] || "US";
}
