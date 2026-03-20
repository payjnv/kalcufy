import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════════
// 🧾 VAT / IVA / ITBIS / IGV CALCULATOR
// ═══════════════════════════════════════════════════════════════════════
// Multi-country sales tax calculator for Latin America + Europe.
// FEATURES vs competitors:
//   ✅ 18 countries with correct local tax names (IVA/ITBIS/IGV/ISV/MwSt/TVA)
//   ✅ 3 modes: Add tax, Remove tax, Extract from total
//   ✅ Multiple rates per country (general, reduced, super-reduced, zero)
//   ✅ Geo-detection auto-selects country + currency + default rate
//   ✅ Custom rate option for special cases
//   ✅ Chart: visual base vs tax split
//   ✅ NO competitor has all of this in one calculator
// ═══════════════════════════════════════════════════════════════════════

// ─── Country Tax Config ──────────────────────────────────────────────
interface TaxRate {
  id: string;
  rate: number;     // e.g. 0.16 for 16%
  label: string;    // e.g. "General (16%)"
  description: string;
}

interface CountryTax {
  taxName: string;         // IVA, ITBIS, IGV, ISV, MwSt, TVA, GST
  currency: { code: string; symbol: string };
  rates: TaxRate[];
  defaultRate: string;     // id of the default rate
}

const COUNTRY_TAX: Record<string, CountryTax> = {
  MX: {
    taxName: "IVA",
    currency: { code: "MXN", symbol: "MX$" },
    rates: [
      { id: "general", rate: 0.16, label: "General (16%)", description: "Standard rate for most goods and services" },
      { id: "border", rate: 0.08, label: "Border Zone (8%)", description: "Northern border region (25 miles from US)" },
      { id: "zero", rate: 0, label: "Zero Rate (0%)", description: "Basic food, medicine, books, exports" },
    ],
    defaultRate: "general",
  },
  CO: {
    taxName: "IVA",
    currency: { code: "COP", symbol: "COL$" },
    rates: [
      { id: "general", rate: 0.19, label: "General (19%)", description: "Standard rate" },
      { id: "reduced", rate: 0.05, label: "Reduced (5%)", description: "Some food, health, agriculture" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Basic basket, education, health services" },
    ],
    defaultRate: "general",
  },
  AR: {
    taxName: "IVA",
    currency: { code: "ARS", symbol: "AR$" },
    rates: [
      { id: "general", rate: 0.21, label: "General (21%)", description: "Standard rate" },
      { id: "reduced", rate: 0.105, label: "Reduced (10.5%)", description: "Electronics, transport, construction" },
      { id: "increased", rate: 0.27, label: "Increased (27%)", description: "Utilities (gas, electricity, water, telecom)" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Basic food, books, education" },
    ],
    defaultRate: "general",
  },
  PE: {
    taxName: "IGV",
    currency: { code: "PEN", symbol: "S/" },
    rates: [
      { id: "general", rate: 0.18, label: "General (18%)", description: "16% IGV + 2% IPM (Municipal Promotion Tax)" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Exports, basic food, education" },
    ],
    defaultRate: "general",
  },
  BR: {
    taxName: "ICMS",
    currency: { code: "BRL", symbol: "R$" },
    rates: [
      { id: "general", rate: 0.17, label: "Average ICMS (17%)", description: "Most common interstate rate (varies by state: 7-25%)" },
      { id: "sp", rate: 0.18, label: "São Paulo (18%)", description: "ICMS rate for São Paulo state" },
      { id: "rj", rate: 0.20, label: "Rio de Janeiro (20%)", description: "ICMS rate for Rio de Janeiro" },
      { id: "reduced", rate: 0.12, label: "Reduced (12%)", description: "Interstate transactions, some food items" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Basic basket (cesta básica)" },
    ],
    defaultRate: "general",
  },
  DO: {
    taxName: "ITBIS",
    currency: { code: "DOP", symbol: "RD$" },
    rates: [
      { id: "general", rate: 0.18, label: "General (18%)", description: "Standard ITBIS rate" },
      { id: "reduced", rate: 0.16, label: "Reduced (16%)", description: "Some products (yogurt, butter, coffee, etc.)" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Basic food basket, medicines, education, health" },
    ],
    defaultRate: "general",
  },
  GT: {
    taxName: "IVA",
    currency: { code: "GTQ", symbol: "Q" },
    rates: [
      { id: "general", rate: 0.12, label: "General (12%)", description: "Single rate for all taxable goods/services" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Exports, basic services" },
    ],
    defaultRate: "general",
  },
  SV: {
    taxName: "IVA",
    currency: { code: "USD", symbol: "$" },
    rates: [
      { id: "general", rate: 0.13, label: "General (13%)", description: "Standard rate" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Basic food, health, education" },
    ],
    defaultRate: "general",
  },
  CR: {
    taxName: "IVA",
    currency: { code: "CRC", symbol: "₡" },
    rates: [
      { id: "general", rate: 0.13, label: "General (13%)", description: "Standard rate" },
      { id: "reduced1", rate: 0.04, label: "Reduced (4%)", description: "Basic food basket, air tickets" },
      { id: "reduced2", rate: 0.02, label: "Reduced (2%)", description: "Private health, education services" },
      { id: "reduced3", rate: 0.01, label: "Reduced (1%)", description: "Medicines, basic agricultural inputs" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Exports, basic services" },
    ],
    defaultRate: "general",
  },
  HN: {
    taxName: "ISV",
    currency: { code: "HNL", symbol: "L" },
    rates: [
      { id: "general", rate: 0.15, label: "General (15%)", description: "Standard ISV rate" },
      { id: "increased", rate: 0.18, label: "Increased (18%)", description: "Alcohol, tobacco, luxury goods" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Basic food, medicine, education" },
    ],
    defaultRate: "general",
  },
  CL: {
    taxName: "IVA",
    currency: { code: "CLP", symbol: "CLP$" },
    rates: [
      { id: "general", rate: 0.19, label: "General (19%)", description: "Single standard rate" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Exports, education, health" },
    ],
    defaultRate: "general",
  },
  EC: {
    taxName: "IVA",
    currency: { code: "USD", symbol: "$" },
    rates: [
      { id: "general", rate: 0.15, label: "General (15%)", description: "Increased from 12% in 2024" },
      { id: "reduced", rate: 0.05, label: "Reduced (5%)", description: "Selected goods and services" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Basic food, health, education" },
    ],
    defaultRate: "general",
  },
  UY: {
    taxName: "IVA",
    currency: { code: "UYU", symbol: "$U" },
    rates: [
      { id: "general", rate: 0.22, label: "General (22%)", description: "Standard rate (highest in LATAM)" },
      { id: "reduced", rate: 0.10, label: "Reduced (10%)", description: "Basic food, medicine, hotels, transport" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Exports, education, financial services" },
    ],
    defaultRate: "general",
  },
  PA: {
    taxName: "ITBMS",
    currency: { code: "PAB", symbol: "B/." },
    rates: [
      { id: "general", rate: 0.07, label: "General (7%)", description: "Standard ITBMS rate (lowest in LATAM)" },
      { id: "increased1", rate: 0.10, label: "Increased (10%)", description: "Alcohol, hotels, tobacco" },
      { id: "increased2", rate: 0.15, label: "Increased (15%)", description: "Luxury goods, tobacco products" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Basic food, medicine, education" },
    ],
    defaultRate: "general",
  },
  ES: {
    taxName: "IVA",
    currency: { code: "EUR", symbol: "€" },
    rates: [
      { id: "general", rate: 0.21, label: "General (21%)", description: "Standard rate for most goods/services" },
      { id: "reduced", rate: 0.10, label: "Reduced (10%)", description: "Food, transport, hotels, renovation" },
      { id: "superreduced", rate: 0.04, label: "Super-reduced (4%)", description: "Bread, milk, fruit, medicine, books" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Education, health, financial, insurance" },
    ],
    defaultRate: "general",
  },
  DE: {
    taxName: "MwSt",
    currency: { code: "EUR", symbol: "€" },
    rates: [
      { id: "general", rate: 0.19, label: "Standard (19%)", description: "Regelsteuersatz for most goods/services" },
      { id: "reduced", rate: 0.07, label: "Reduced (7%)", description: "Food, books, newspapers, public transport" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Medical, education, financial services" },
    ],
    defaultRate: "general",
  },
  FR: {
    taxName: "TVA",
    currency: { code: "EUR", symbol: "€" },
    rates: [
      { id: "general", rate: 0.20, label: "Normal (20%)", description: "Standard rate" },
      { id: "intermediate", rate: 0.10, label: "Intermediate (10%)", description: "Restaurants, transport, renovation" },
      { id: "reduced", rate: 0.055, label: "Reduced (5.5%)", description: "Food, books, energy, culture" },
      { id: "superreduced", rate: 0.021, label: "Super-reduced (2.1%)", description: "Medicine, press, live entertainment" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Medical, education, financial" },
    ],
    defaultRate: "general",
  },
  PT: {
    taxName: "IVA",
    currency: { code: "EUR", symbol: "€" },
    rates: [
      { id: "general", rate: 0.23, label: "General (23%)", description: "Standard rate (continental)" },
      { id: "intermediate", rate: 0.13, label: "Intermediate (13%)", description: "Restaurants, food, wine" },
      { id: "reduced", rate: 0.06, label: "Reduced (6%)", description: "Basic food, water, medicine, books" },
      { id: "zero", rate: 0, label: "Exempt (0%)", description: "Medical, education, financial" },
    ],
    defaultRate: "general",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────
function fmtC(val: number, sym: string): string {
  if (val === 0) return `${sym}0.00`;
  return `${sym}${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ═══════════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════════
export const vatCalculatorConfig: CalculatorConfigV4 = {
  id: "vat-calculator",
  version: "4.0",
  category: "finance",
  icon: "🧾",

  presets: [
    {
      id: "mexico16",
      icon: "🇲🇽",
      values: { country: "MX", mode: "addTax", amount: 1000, taxRate: "general", useCustomRate: false, customRate: 16 },
    },
    {
      id: "colombiaExtract",
      icon: "🇨🇴",
      values: { country: "CO", mode: "extractTax", amount: 5000, taxRate: "general", useCustomRate: false, customRate: 19 },
    },
    {
      id: "argentinaRemove",
      icon: "🇦🇷",
      values: { country: "AR", mode: "removeTax", amount: 12100, taxRate: "general", useCustomRate: false, customRate: 21 },
    },
    {
      id: "spainReduced",
      icon: "🇪🇸",
      values: { country: "ES", mode: "addTax", amount: 500, taxRate: "reduced", useCustomRate: false, customRate: 10 },
    },
  ],

  t: {
    en: {
      name: "VAT Calculator",
      slug: "vat-calculator",
      subtitle: "Calculate VAT, IVA, ITBIS, IGV, or sales tax for 18 countries. Add, remove, or extract tax from any amount instantly.",
      breadcrumb: "VAT / IVA",

      seo: {
        title: "VAT Calculator - IVA, ITBIS, IGV for 18 Countries",
        description: "Calculate VAT/IVA/ITBIS/IGV instantly for Mexico, Colombia, Argentina, Peru, Spain, and 13 more countries. Add, remove, or extract tax with official 2026 rates.",
        shortDescription: "Calculate VAT, IVA, ITBIS, or IGV for 18 countries with official rates.",
        keywords: [
          "vat calculator",
          "iva calculator",
          "calculadora de iva",
          "itbis calculator",
          "igv calculator",
          "calculate vat",
          "sales tax calculator",
          "free iva calculator online",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Tax Calculation",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        country: {
          label: "Country",
          helpText: "Select your country — tax name, rates, and currency adjust automatically",
          options: {
            MX: "🇲🇽 Mexico (IVA)", CO: "🇨🇴 Colombia (IVA)", AR: "🇦🇷 Argentina (IVA)",
            PE: "🇵🇪 Peru (IGV)", BR: "🇧🇷 Brazil (ICMS)", DO: "🇩🇴 Dom. Rep. (ITBIS)",
            GT: "🇬🇹 Guatemala (IVA)", SV: "🇸🇻 El Salvador (IVA)", CR: "🇨🇷 Costa Rica (IVA)",
            HN: "🇭🇳 Honduras (ISV)", CL: "🇨🇱 Chile (IVA)", EC: "🇪🇨 Ecuador (IVA)",
            UY: "🇺🇾 Uruguay (IVA)", PA: "🇵🇦 Panama (ITBMS)",
            ES: "🇪🇸 Spain (IVA)", DE: "🇩🇪 Germany (MwSt)", FR: "🇫🇷 France (TVA)",
            PT: "🇵🇹 Portugal (IVA)",
          },
        },
        mode: {
          label: "What do you need?",
          helpText: "Choose what type of calculation you need",
          options: {
            addTax: "Add tax to price",
            removeTax: "Remove tax from total",
            extractTax: "Extract tax amount from total",
          },
        },
        amount: {
          label: "Amount",
          helpText: "Enter the price or total amount",
        },
        taxRate: {
          label: "Tax Rate",
          helpText: "Select the applicable tax rate for your product or service",
          options: {
            general: "General",
            reduced: "Reduced",
            superreduced: "Super-reduced",
            border: "Border Zone",
            increased: "Increased",
            zero: "Exempt / Zero",
          },
        },
        useCustomRate: {
          label: "Use Custom Rate",
          helpText: "Enable to enter a specific tax percentage manually",
        },
        customRate: {
          label: "Custom Tax Rate",
          helpText: "Enter your specific tax rate percentage",
        },
      },

      results: {
        totalWithTax: { label: "Total (tax included)" },
        baseAmount: { label: "Base Amount (before tax)" },
        taxAmount: { label: "Tax Amount" },
        taxRateUsed: { label: "Tax Rate Applied" },
      },

      presets: {
        mexico16: { label: "🇲🇽 Mexico 16%", description: "Add IVA to $1,000 MXN" },
        colombiaExtract: { label: "🇨🇴 Colombia Extract", description: "Extract IVA from $5,000 COP" },
        argentinaRemove: { label: "🇦🇷 Argentina Remove", description: "Remove 21% IVA from total" },
        spainReduced: { label: "🇪🇸 Spain Reduced", description: "Add 10% reduced IVA" },
      },

      values: {
        "taxIncluded": "Tax included",
        "beforeTax": "Before tax",
        "taxAmount": "Tax amount",
        "of": "of",
        "on": "on",
        "rate": "rate",
      },

      formats: {
        summary: "Base: {baseAmount} + {taxName} ({taxRate}): {taxAmount} = Total: {totalWithTax}",
      },

      infoCards: {
        metrics: {
          title: "Calculation Breakdown",
          items: [
            { label: "Base Amount", valueKey: "baseAmount" },
            { label: "Tax Rate", valueKey: "taxRateDisplay" },
            { label: "Tax Amount", valueKey: "taxAmount" },
            { label: "Total", valueKey: "totalWithTax" },
          ],
        },
        details: {
          title: "Country Tax Info",
          items: [
            { label: "Tax Name", valueKey: "taxNameDisplay" },
            { label: "Standard Rate", valueKey: "standardRateDisplay" },
            { label: "Available Rates", valueKey: "availableRatesDisplay" },
            { label: "Formula Used", valueKey: "formulaUsed" },
          ],
        },
        tips: {
          title: "Quick Tips",
          items: [
            "To add tax: multiply the base price by (1 + rate). For Mexico 16%: price × 1.16",
            "To remove tax from a total: divide by (1 + rate). For Mexico: total ÷ 1.16 = base price",
            "To extract just the tax amount from a total: total − (total ÷ (1 + rate)) = tax paid",
            "Zero-rated (0%) items are different from exempt items. Zero-rated still requires tax reporting; exempt does not.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is VAT / IVA / Sales Tax?",
          content: "Value Added Tax (VAT) — known as IVA in Spanish-speaking countries, ITBIS in the Dominican Republic, IGV in Peru, ISV in Honduras, ITBMS in Panama, MwSt in Germany, and TVA in France — is an indirect consumption tax applied at each stage of the production and distribution chain. Unlike a simple sales tax, VAT is collected incrementally: each business in the chain charges tax on its sales and deducts the tax it paid on its purchases (input tax credit). The end consumer ultimately bears the full tax amount. VAT rates vary significantly across countries, from as low as 7% in Panama to as high as 22% in Uruguay. Most countries have multiple rates: a general rate for most goods, reduced rates for essential items like food and medicine, and zero rates or exemptions for exports and basic necessities. Understanding which rate applies to your product or service is essential for correct invoicing and tax compliance.",
        },
        howItWorks: {
          title: "How to Calculate VAT / IVA",
          content: "There are three common calculations. To ADD tax to a base price: multiply by (1 + rate). Example: $1,000 × 1.16 = $1,160 (with 16% IVA). To REMOVE tax from a total (find the base price): divide by (1 + rate). Example: $1,160 ÷ 1.16 = $1,000 base. To EXTRACT just the tax amount from a total: subtract the base from the total, or equivalently: total × (rate ÷ (1 + rate)). Example: $1,160 × (0.16 ÷ 1.16) = $160 tax. A common mistake is calculating 16% of the total to find the tax — this gives the wrong answer because the total already includes tax. The correct approach is always to divide first, then subtract. For invoicing, most countries require showing the base amount, tax rate, tax amount, and total separately on every invoice or receipt (CFDI in Mexico, factura electrónica in Colombia, etc.).",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "Each country names its tax differently: IVA (Mexico, Colombia, Argentina, Chile), ITBIS (Dominican Republic), IGV (Peru), ISV (Honduras), ITBMS (Panama), MwSt (Germany), TVA (France).", type: "info" as const },
            { text: "Zero-rated (0%) and exempt are NOT the same. Zero-rated goods are taxable at 0% (seller can still claim input credits). Exempt goods are outside the tax system entirely (no input credit).", type: "warning" as const },
            { text: "Mexico's border zone (8% IVA) applies to businesses physically located within 25 miles of the US, Guatemala, or Belize borders, not to online purchases.", type: "info" as const },
            { text: "Brazil's ICMS is the most complex: rates vary by state (7%-25%), product type, and whether the transaction is interstate. This calculator uses average rates.", type: "warning" as const },
            { text: "Peru's 18% IGV is actually two taxes combined: 16% IGV + 2% IPM (Impuesto de Promoción Municipal). Both appear as a single 18% on invoices.", type: "info" as const },
            { text: "For cross-border sales within the EU (intra-community), VAT rules are different — the seller may charge 0% and the buyer self-assesses under reverse charge.", type: "info" as const },
          ],
        },
        categories: {
          title: "Tax Rates by Country (2026)",
          items: [
            { text: "Mexico: IVA 16% (general), 8% (border zone), 0% (food, medicine, books). Highest at border still lower than most LATAM countries.", type: "info" as const },
            { text: "Colombia: IVA 19% (general), 5% (some food, health), 0% (basic basket). One of the higher rates in South America.", type: "info" as const },
            { text: "Argentina: IVA 21% (general), 10.5% (reduced), 27% (utilities). The 27% rate on gas/electric/water is notably high.", type: "info" as const },
            { text: "Dominican Republic: ITBIS 18% (general), 16% (select items), 0% (basic food). Note: it's ITBIS, not IVA — Dominican-specific name.", type: "info" as const },
            { text: "Spain: IVA 21% (general), 10% (food, hotels), 4% (bread, milk, medicine). Three rates — most EU countries follow a similar structure.", type: "info" as const },
            { text: "Panama: ITBMS 7% (general) — the lowest standard rate in all of Latin America. Higher rates (10-15%) only for alcohol, tobacco, luxury goods.", type: "info" as const },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Common scenarios step by step",
          examples: [
            {
              title: "Add 16% IVA to a price in Mexico",
              steps: [
                "Base price: MX$1,000.00",
                "Tax rate: 16% (general IVA)",
                "IVA amount: $1,000 × 0.16 = MX$160.00",
                "Total with IVA: $1,000 + $160 = MX$1,160.00",
                "Or simply: $1,000 × 1.16 = MX$1,160.00",
              ],
              result: "Customer pays MX$1,160.00 (MX$160 is IVA).",
            },
            {
              title: "Extract ITBIS from a total in Dominican Republic",
              steps: [
                "Total paid: RD$5,000.00 (ITBIS included)",
                "Tax rate: 18% (general ITBIS)",
                "Base price: $5,000 ÷ 1.18 = RD$4,237.29",
                "ITBIS amount: $5,000 − $4,237.29 = RD$762.71",
                "Verify: $4,237.29 × 0.18 = $762.71 ✓",
              ],
              result: "Of the RD$5,000 total, RD$762.71 is ITBIS and RD$4,237.29 is the base price.",
            },
          ],
        },
      },

      faqs: [
        { question: "What is the difference between VAT, IVA, ITBIS, and IGV?", answer: "They are all the same type of tax (value-added tax) with different names by country. IVA (Impuesto al Valor Agregado) is used in Mexico, Colombia, Argentina, Chile, Spain. ITBIS (Impuesto sobre Transferencias de Bienes Industrializados y Servicios) is Dominican Republic's name. IGV (Impuesto General a las Ventas) is Peru's name. ISV is Honduras, ITBMS is Panama, MwSt is Germany, TVA is France." },
        { question: "How do I remove tax from a total price?", answer: "Divide the total by (1 + tax rate as decimal). For Mexico at 16%: total ÷ 1.16 = base price. For Colombia at 19%: total ÷ 1.19. Common mistake: do NOT just subtract 16% of the total — that gives the wrong answer because the percentage is calculated on the base, not the total." },
        { question: "What is Mexico's border zone rate?", answer: "Businesses physically located within approximately 25 miles of Mexico's northern border (US) or southern borders (Guatemala, Belize) can apply 8% IVA instead of 16%. This was introduced in 2019 to help border businesses compete. It does NOT apply to online purchases or businesses outside the zone." },
        { question: "Are food and medicine taxed?", answer: "In most Latin American countries, basic food items and medicine are either zero-rated (0%) or exempt from sales tax. However, processed foods, restaurants, and non-essential items are typically taxed at the standard rate. Each country defines its own list of exempt items." },
        { question: "What is the highest VAT rate in Latin America?", answer: "Uruguay at 22% has the highest standard rate, followed by Argentina at 21%. However, Argentina also has a 27% increased rate on utilities (gas, electricity, water), making it the highest specific rate. Panama has the lowest at 7%." },
        { question: "How is tax shown on invoices?", answer: "Most countries require invoices to clearly show: 1) Base amount (before tax), 2) Tax rate applied, 3) Tax amount in currency, 4) Total with tax. In Mexico this is on the CFDI (Comprobante Fiscal Digital), in Colombia on electronic invoicing (facturación electrónica), in the EU on standard invoices with VAT number." },
        { question: "What is the difference between zero-rated and exempt?", answer: "Zero-rated means the product IS taxable but the rate is 0% — the seller can still claim input tax credits on purchases. Exempt means the product is outside the tax system entirely — the seller CANNOT claim input credits. This distinction matters for businesses, not consumers." },
        { question: "Why is Brazil's system so complex?", answer: "Brazil has multiple overlapping taxes instead of a single VAT: ICMS (state-level, 7-25%), IPI (federal, varies), ISS (municipal, services), PIS/COFINS (federal contributions). Rates vary by state, product, and transaction type. A major tax reform (expected 2026-2027) aims to unify these into a single IBS + CBS system." },
      ],

      rating: {
        title: "Rate this Calculator",
        share: "Share", copied: "Copied!", copyLink: "Copy Link",
        clickToRate: "Click to rate", youRated: "You rated",
        stars: "stars", averageFrom: "average from", ratings: "ratings",
      },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Calculate", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },

      chart: {
        title: "Price Breakdown",
        xLabel: "",
        yLabel: "Amount",
        series: {
          base: "Base Price",
          tax: "Tax Amount",
        },
      },
    },
    es: {
      "name": "Calculadora de IVA",
      "slug": "calculadora-iva",
      "subtitle": "Calcula IVA, ITBIS, IGV o impuestos de venta para 18 países. Añade, quita o extrae impuestos de cualquier cantidad al instante.",
      "breadcrumb": "IVA / Impuestos",
      "seo": {
        "title": "Calculadora de IVA - IVA, ITBIS, IGV para 18 Países",
        "description": "Calcula IVA/ITBIS/IGV al instante para México, Colombia, Argentina, Perú, España y 13 países más. Añade, quita o extrae impuestos con tarifas oficiales 2026.",
        "shortDescription": "Calcula IVA, ITBIS o IGV para 18 países con tarifas oficiales.",
        "keywords": [
          "calculadora de iva",
          "calculadora itbis",
          "calculadora igv",
          "calcular iva",
          "calculadora impuesto ventas",
          "calculadora iva gratis online"
        ]
      },
      "inputs": {
        "country": {
          "label": "País",
          "helpText": "Selecciona tu país — el nombre del impuesto, tarifas y moneda se ajustan automáticamente",
          "options": {
            "MX": "🇲🇽 México (IVA)",
            "CO": "🇨🇴 Colombia (IVA)",
            "AR": "🇦🇷 Argentina (IVA)",
            "PE": "🇵🇪 Perú (IGV)",
            "BR": "🇧🇷 Brasil (ICMS)",
            "DO": "🇩🇴 Rep. Dom. (ITBIS)",
            "GT": "🇬🇹 Guatemala (IVA)",
            "SV": "🇸🇻 El Salvador (IVA)",
            "CR": "🇨🇷 Costa Rica (IVA)",
            "HN": "🇭🇳 Honduras (ISV)",
            "CL": "🇨🇱 Chile (IVA)",
            "EC": "🇪🇨 Ecuador (IVA)",
            "UY": "🇺🇾 Uruguay (IVA)",
            "PA": "🇵🇦 Panamá (ITBMS)",
            "ES": "🇪🇸 España (IVA)",
            "DE": "🇩🇪 Alemania (MwSt)",
            "FR": "🇫🇷 Francia (TVA)",
            "PT": "🇵🇹 Portugal (IVA)"
          }
        },
        "mode": {
          "label": "¿Qué necesitas?",
          "helpText": "Elige qué tipo de cálculo necesitas",
          "options": {
            "addTax": "Añadir impuesto al precio",
            "removeTax": "Quitar impuesto del total",
            "extractTax": "Extraer cantidad de impuesto del total"
          }
        },
        "amount": {
          "label": "Cantidad",
          "helpText": "Ingresa el precio o cantidad total"
        },
        "taxRate": {
          "label": "Tarifa de Impuesto",
          "helpText": "Selecciona la tarifa de impuesto aplicable para tu producto o servicio",
          "options": {
            "general": "General",
            "reduced": "Reducida",
            "superreduced": "Súper reducida",
            "border": "Zona Fronteriza",
            "increased": "Aumentada",
            "zero": "Exento / Cero"
          }
        },
        "useCustomRate": {
          "label": "Usar Tarifa Personalizada",
          "helpText": "Habilita para ingresar un porcentaje de impuesto específico manualmente"
        },
        "customRate": {
          "label": "Tarifa de Impuesto Personalizada",
          "helpText": "Ingresa tu porcentaje de tarifa de impuesto específico"
        }
      },
      "results": {
        "totalWithTax": {
          "label": "Total (impuesto incluido)"
        },
        "baseAmount": {
          "label": "Cantidad Base (antes de impuestos)"
        },
        "taxAmount": {
          "label": "Cantidad de Impuesto"
        },
        "taxRateUsed": {
          "label": "Tarifa de Impuesto Aplicada"
        }
      },
      "presets": {
        "mexico16": {
          "label": "🇲🇽 México 16%",
          "description": "Añadir IVA a $1,000 MXN"
        },
        "colombiaExtract": {
          "label": "🇨🇴 Colombia Extraer",
          "description": "Extraer IVA de $5,000 COP"
        },
        "argentinaRemove": {
          "label": "🇦🇷 Argentina Quitar",
          "description": "Quitar 21% IVA del total"
        },
        "spainReduced": {
          "label": "🇪🇸 España Reducido",
          "description": "Añadir 10% IVA reducido"
        }
      },
      "values": {
        "taxIncluded": "Impuesto incluido",
        "beforeTax": "Antes de impuestos",
        "taxAmount": "Cantidad de impuesto",
        "of": "de",
        "on": "sobre",
        "rate": "tarifa"
      },
      "formats": {
        "summary": "Base: {baseAmount} + {taxName} ({taxRate}): {taxAmount} = Total: {totalWithTax}"
      },
      "infoCards": {
        "metrics": {
          "title": "Desglose del Cálculo",
          "items": [
            {
              "label": "Cantidad Base",
              "valueKey": "baseAmount"
            },
            {
              "label": "Tarifa de Impuesto",
              "valueKey": "taxRateDisplay"
            },
            {
              "label": "Cantidad de Impuesto",
              "valueKey": "taxAmount"
            },
            {
              "label": "Total",
              "valueKey": "totalWithTax"
            }
          ]
        },
        "details": {
          "title": "Información de Impuestos del País",
          "items": [
            {
              "label": "Nombre del Impuesto",
              "valueKey": "taxNameDisplay"
            },
            {
              "label": "Tarifa Estándar",
              "valueKey": "standardRateDisplay"
            },
            {
              "label": "Tarifas Disponibles",
              "valueKey": "availableRatesDisplay"
            },
            {
              "label": "Fórmula Utilizada",
              "valueKey": "formulaUsed"
            }
          ]
        },
        "tips": {
          "title": "Consejos Rápidos",
          "items": [
            "Para añadir impuesto: multiplica el precio base por (1 + tarifa). Para México 16%: precio × 1.16",
            "Para quitar impuesto de un total: divide por (1 + tarifa). Para México: total ÷ 1.16 = precio base",
            "Para extraer solo la cantidad de impuesto de un total: total − (total ÷ (1 + tarifa)) = impuesto pagado",
            "Los artículos con tarifa cero (0%) son diferentes de los artículos exentos. Los de tarifa cero aún requieren reporte de impuestos; los exentos no."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el IVA / Impuesto a las Ventas?",
          "content": "El Impuesto al Valor Agregado (IVA) — conocido como IVA en países de habla hispana, ITBIS en República Dominicana, IGV en Perú, ISV en Honduras, ITBMS en Panamá, MwSt en Alemania, y TVA en Francia — es un impuesto indirecto al consumo aplicado en cada etapa de la cadena de producción y distribución. A diferencia de un simple impuesto a las ventas, el IVA se cobra incrementalmente: cada empresa en la cadena cobra impuesto sobre sus ventas y deduce el impuesto que pagó en sus compras (crédito fiscal). El consumidor final soporta el monto total del impuesto. Las tarifas de IVA varían significativamente entre países, desde tan bajo como 7% en Panamá hasta tan alto como 22% en Uruguay. La mayoría de los países tienen múltiples tarifas: una tarifa general para la mayoría de bienes, tarifas reducidas para artículos esenciales como comida y medicina, y tarifas cero o exenciones para exportaciones y necesidades básicas."
        },
        "howItWorks": {
          "title": "Cómo Calcular el IVA",
          "content": "Hay tres cálculos comunes. Para AÑADIR impuesto a un precio base: multiplica por (1 + tarifa). Ejemplo: $1,000 × 1.16 = $1,160 (con 16% IVA). Para QUITAR impuesto de un total (encontrar el precio base): divide por (1 + tarifa). Ejemplo: $1,160 ÷ 1.16 = $1,000 base. Para EXTRAER solo la cantidad de impuesto de un total: resta la base del total, o equivalentemente: total × (tarifa ÷ (1 + tarifa)). Ejemplo: $1,160 × (0.16 ÷ 1.16) = $160 impuesto. Un error común es calcular 16% del total para encontrar el impuesto — esto da la respuesta incorrecta porque el total ya incluye el impuesto. El enfoque correcto es siempre dividir primero, luego restar."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "Cada país nombra su impuesto diferente: IVA (México, Colombia, Argentina, Chile), ITBIS (República Dominicana), IGV (Perú), ISV (Honduras), ITBMS (Panamá), MwSt (Alemania), TVA (Francia).",
              "type": "info"
            },
            {
              "text": "Tarifa cero (0%) y exento NO son lo mismo. Los bienes con tarifa cero son gravables al 0% (el vendedor aún puede reclamar créditos). Los bienes exentos están fuera del sistema tributario completamente (sin crédito).",
              "type": "warning"
            },
            {
              "text": "La zona fronteriza de México (8% IVA) aplica a empresas físicamente ubicadas dentro de 25 millas de las fronteras con EE.UU., Guatemala o Belice, no a compras en línea.",
              "type": "info"
            },
            {
              "text": "El ICMS de Brasil es el más complejo: las tarifas varían por estado (7%-25%), tipo de producto, y si la transacción es interestatal. Esta calculadora usa tarifas promedio.",
              "type": "warning"
            },
            {
              "text": "El 18% IGV de Perú son en realidad dos impuestos combinados: 16% IGV + 2% IPM (Impuesto de Promoción Municipal). Ambos aparecen como un solo 18% en facturas.",
              "type": "info"
            },
            {
              "text": "Para ventas transfronterizas dentro de la UE (intracomunitarias), las reglas de IVA son diferentes — el vendedor puede cobrar 0% y el comprador auto-liquida bajo cargo reverso.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Tarifas de Impuestos por País (2026)",
          "items": [
            {
              "text": "México: IVA 16% (general), 8% (zona fronteriza), 0% (comida, medicina, libros). La más alta en frontera sigue siendo menor que la mayoría de países LATAM.",
              "type": "info"
            },
            {
              "text": "Colombia: IVA 19% (general), 5% (algunos alimentos, salud), 0% (canasta básica). Una de las tarifas más altas en Sudamérica.",
              "type": "info"
            },
            {
              "text": "Argentina: IVA 21% (general), 10.5% (reducida), 27% (servicios públicos). La tarifa de 27% en gas/electricidad/agua es notablemente alta.",
              "type": "info"
            },
            {
              "text": "República Dominicana: ITBIS 18% (general), 16% (artículos selectos), 0% (alimentos básicos). Nota: es ITBIS, no IVA — nombre específico dominicano.",
              "type": "info"
            },
            {
              "text": "España: IVA 21% (general), 10% (comida, hoteles), 4% (pan, leche, medicina). Tres tarifas — la mayoría de países de la UE siguen una estructura similar.",
              "type": "info"
            },
            {
              "text": "Panamá: ITBMS 7% (general) — la tarifa estándar más baja en toda América Latina. Tarifas más altas (10-15%) solo para alcohol, tabaco, bienes de lujo.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculos",
          "description": "Escenarios comunes paso a paso",
          "examples": [
            {
              "title": "Añadir 16% IVA a un precio en México",
              "steps": [
                "Precio base: MX$1,000.00",
                "Tarifa de impuesto: 16% (IVA general)",
                "Cantidad de IVA: $1,000 × 0.16 = MX$160.00",
                "Total con IVA: $1,000 + $160 = MX$1,160.00",
                "O simplemente: $1,000 × 1.16 = MX$1,160.00"
              ],
              "result": "El cliente paga MX$1,160.00 (MX$160 es IVA)."
            },
            {
              "title": "Extraer ITBIS de un total en República Dominicana",
              "steps": [
                "Total pagado: RD$5,000.00 (ITBIS incluido)",
                "Tarifa de impuesto: 18% (ITBIS general)",
                "Precio base: $5,000 ÷ 1.18 = RD$4,237.29",
                "Cantidad de ITBIS: $5,000 − $4,237.29 = RD$762.71",
                "Verificar: $4,237.29 × 0.18 = $762.71 ✓"
              ],
              "result": "Del total de RD$5,000, RD$762.71 es ITBIS y RD$4,237.29 es el precio base."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es la diferencia entre IVA, ITBIS e IGV?",
          "answer": "Son todos el mismo tipo de impuesto (impuesto al valor agregado) con diferentes nombres por país. IVA (Impuesto al Valor Agregado) se usa en México, Colombia, Argentina, Chile, España. ITBIS (Impuesto sobre Transferencias de Bienes Industrializados y Servicios) es el nombre de República Dominicana. IGV (Impuesto General a las Ventas) es el nombre de Perú. ISV es Honduras, ITBMS es Panamá, MwSt es Alemania, TVA es Francia."
        },
        {
          "question": "¿Cómo quito el impuesto de un precio total?",
          "answer": "Divide el total por (1 + tarifa de impuesto como decimal). Para México al 16%: total ÷ 1.16 = precio base. Para Colombia al 19%: total ÷ 1.19. Error común: NO solo restes 16% del total — eso da la respuesta incorrecta porque el porcentaje se calcula sobre la base, no el total."
        },
        {
          "question": "¿Qué es la tarifa de zona fronteriza de México?",
          "answer": "Las empresas físicamente ubicadas dentro de aproximadamente 25 millas de la frontera norte de México (EE.UU.) o fronteras sur (Guatemala, Belice) pueden aplicar 8% IVA en lugar de 16%. Esto se introdujo en 2019 para ayudar a las empresas fronterizas a competir. NO aplica a compras en línea o empresas fuera de la zona."
        },
        {
          "question": "¿Se gravan los alimentos y medicinas?",
          "answer": "En la mayoría de países latinoamericanos, los alimentos básicos y medicinas están exentos (0%) o exentos del impuesto a las ventas. Sin embargo, alimentos procesados, restaurantes y artículos no esenciales típicamente se gravan a la tarifa estándar. Cada país define su propia lista de artículos exentos."
        },
        {
          "question": "¿Cuál es la tarifa de IVA más alta en América Latina?",
          "answer": "Uruguay con 22% tiene la tarifa estándar más alta, seguido por Argentina con 21%. Sin embargo, Argentina también tiene una tarifa aumentada de 27% en servicios públicos (gas, electricidad, agua), haciéndola la tarifa específica más alta. Panamá tiene la más baja con 7%."
        },
        {
          "question": "¿Cómo se muestra el impuesto en las facturas?",
          "answer": "La mayoría de países requieren que las facturas muestren claramente: 1) Cantidad base (antes de impuestos), 2) Tarifa de impuesto aplicada, 3) Cantidad de impuesto en moneda, 4) Total con impuesto. En México esto está en el CFDI (Comprobante Fiscal Digital), en Colombia en facturación electrónica, en la UE en facturas estándar con número de IVA."
        },
        {
          "question": "¿Cuál es la diferencia entre tarifa cero y exento?",
          "answer": "Tarifa cero significa que el producto ES gravable pero la tarifa es 0% — el vendedor aún puede reclamar créditos fiscales en compras. Exento significa que el producto está fuera del sistema tributario completamente — el vendedor NO puede reclamar créditos. Esta distinción importa para las empresas, no los consumidores."
        },
        {
          "question": "¿Por qué es tan complejo el sistema de Brasil?",
          "answer": "Brasil tiene múltiples impuestos superpuestos en lugar de un solo IVA: ICMS (nivel estatal, 7-25%), IPI (federal, varía), ISS (municipal, servicios), PIS/COFINS (contribuciones federales). Las tarifas varían por estado, producto y tipo de transacción. Una reforma tributaria mayor (esperada 2026-2027) busca unificar estos en un solo sistema IBS + CBS."
        }
      ],
      "chart": {
        "title": "Desglose del Precio",
        "xLabel": "",
        "yLabel": "Cantidad",
        "series": {
          "base": "Precio Base",
          "tax": "Cantidad de Impuesto"
        }
      },
      "buttons": {
        "calculate": "Calcular",
        "reset": "Reiniciar",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Guardar",
        "saved": "Guardado",
        "saving": "Guardando..."
      },
      "share": {
        "calculatedWith": "Calculado con Kalcufy.com"
      },
      "ui": {
        "results": "Resultados",
        "yourInformation": "Tu Información"
      },
      "accessibility": {
        "mobileResults": "Resumen de resultados",
        "closeModal": "Cerrar",
        "openMenu": "Abrir menú"
      },
      "rating": {
        "title": "Califica esta Calculadora",
        "share": "Compartir",
        "copied": "¡Copiado!",
        "copyLink": "Copiar Enlace",
        "clickToRate": "Clic para calificar",
        "youRated": "Calificaste",
        "stars": "estrellas",
        "averageFrom": "promedio de",
        "ratings": "calificaciones"
      },
      "common": {
        "home": "Inicio",
        "calculators": "Calculadoras"
      },
      "sources": {
        "title": "Fuentes y Referencias"
      },
      "calculator": {
        "yourInformation": "Tu Información"
      }
    },
    pt: {
      "name": "Calculadora de IVA",
      "slug": "calculadora-iva",
      "subtitle": "Calcule IVA, ITBIS, IGV ou imposto sobre vendas para 18 países. Adicione, remova ou extraia impostos de qualquer valor instantaneamente.",
      "breadcrumb": "IVA / Impostos",
      "seo": {
        "title": "Calculadora de IVA - IVA, ITBIS, IGV para 18 Países",
        "description": "Calcule IVA/ITBIS/IGV instantaneamente para México, Colômbia, Argentina, Peru, Espanha e mais 13 países. Adicione, remova ou extraia impostos com taxas oficiais de 2026.",
        "shortDescription": "Calcule IVA, ITBIS ou IGV para 18 países com taxas oficiais.",
        "keywords": [
          "calculadora iva",
          "calculadora itbis",
          "calculadora igv",
          "calcular iva",
          "calculadora imposto vendas",
          "calculadora iva online gratis"
        ]
      },
      "inputs": {
        "country": {
          "label": "País",
          "helpText": "Selecione seu país — nome do imposto, taxas e moeda se ajustam automaticamente",
          "options": {
            "MX": "🇲🇽 México (IVA)",
            "CO": "🇨🇴 Colômbia (IVA)",
            "AR": "🇦🇷 Argentina (IVA)",
            "PE": "🇵🇪 Peru (IGV)",
            "BR": "🇧🇷 Brasil (ICMS)",
            "DO": "🇩🇴 Rep. Dom. (ITBIS)",
            "GT": "🇬🇹 Guatemala (IVA)",
            "SV": "🇸🇻 El Salvador (IVA)",
            "CR": "🇨🇷 Costa Rica (IVA)",
            "HN": "🇭🇳 Honduras (ISV)",
            "CL": "🇨🇱 Chile (IVA)",
            "EC": "🇪🇨 Equador (IVA)",
            "UY": "🇺🇾 Uruguai (IVA)",
            "PA": "🇵🇦 Panamá (ITBMS)",
            "ES": "🇪🇸 Espanha (IVA)",
            "DE": "🇩🇪 Alemanha (MwSt)",
            "FR": "🇫🇷 França (TVA)",
            "PT": "🇵🇹 Portugal (IVA)"
          }
        },
        "mode": {
          "label": "O que você precisa?",
          "helpText": "Escolha o tipo de cálculo que você precisa",
          "options": {
            "addTax": "Adicionar imposto ao preço",
            "removeTax": "Remover imposto do total",
            "extractTax": "Extrair valor do imposto do total"
          }
        },
        "amount": {
          "label": "Valor",
          "helpText": "Digite o preço ou valor total"
        },
        "taxRate": {
          "label": "Taxa de Imposto",
          "helpText": "Selecione a taxa de imposto aplicável para seu produto ou serviço",
          "options": {
            "general": "Geral",
            "reduced": "Reduzida",
            "superreduced": "Super-reduzida",
            "border": "Zona Fronteiriça",
            "increased": "Aumentada",
            "zero": "Isento / Zero"
          }
        },
        "useCustomRate": {
          "label": "Usar Taxa Personalizada",
          "helpText": "Ative para inserir uma porcentagem específica de imposto manualmente"
        },
        "customRate": {
          "label": "Taxa de Imposto Personalizada",
          "helpText": "Digite sua porcentagem específica de taxa de imposto"
        }
      },
      "results": {
        "totalWithTax": {
          "label": "Total (imposto incluído)"
        },
        "baseAmount": {
          "label": "Valor Base (antes do imposto)"
        },
        "taxAmount": {
          "label": "Valor do Imposto"
        },
        "taxRateUsed": {
          "label": "Taxa de Imposto Aplicada"
        }
      },
      "presets": {
        "mexico16": {
          "label": "🇲🇽 México 16%",
          "description": "Adicionar IVA a $1.000 MXN"
        },
        "colombiaExtract": {
          "label": "🇨🇴 Colômbia Extrair",
          "description": "Extrair IVA de $5.000 COP"
        },
        "argentinaRemove": {
          "label": "🇦🇷 Argentina Remover",
          "description": "Remover 21% IVA do total"
        },
        "spainReduced": {
          "label": "🇪🇸 Espanha Reduzida",
          "description": "Adicionar 10% IVA reduzida"
        }
      },
      "values": {
        "taxIncluded": "Imposto incluído",
        "beforeTax": "Antes do imposto",
        "taxAmount": "Valor do imposto",
        "of": "de",
        "on": "sobre",
        "rate": "taxa"
      },
      "formats": {
        "summary": "Base: {baseAmount} + {taxName} ({taxRate}): {taxAmount} = Total: {totalWithTax}"
      },
      "infoCards": {
        "metrics": {
          "title": "Detalhamento do Cálculo",
          "items": [
            {
              "label": "Valor Base",
              "valueKey": "baseAmount"
            },
            {
              "label": "Taxa de Imposto",
              "valueKey": "taxRateDisplay"
            },
            {
              "label": "Valor do Imposto",
              "valueKey": "taxAmount"
            },
            {
              "label": "Total",
              "valueKey": "totalWithTax"
            }
          ]
        },
        "details": {
          "title": "Informações de Imposto do País",
          "items": [
            {
              "label": "Nome do Imposto",
              "valueKey": "taxNameDisplay"
            },
            {
              "label": "Taxa Padrão",
              "valueKey": "standardRateDisplay"
            },
            {
              "label": "Taxas Disponíveis",
              "valueKey": "availableRatesDisplay"
            },
            {
              "label": "Fórmula Utilizada",
              "valueKey": "formulaUsed"
            }
          ]
        },
        "tips": {
          "title": "Dicas Rápidas",
          "items": [
            "Para adicionar imposto: multiplique o preço base por (1 + taxa). Para México 16%: preço × 1,16",
            "Para remover imposto de um total: divida por (1 + taxa). Para México: total ÷ 1,16 = preço base",
            "Para extrair apenas o valor do imposto de um total: total − (total ÷ (1 + taxa)) = imposto pago",
            "Itens com taxa zero (0%) são diferentes de itens isentos. Taxa zero ainda requer relatório de imposto; isento não."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é IVA / Imposto sobre Vendas?",
          "content": "O Imposto sobre Valor Agregado (IVA) — conhecido como IVA em países de língua espanhola, ITBIS na República Dominicana, IGV no Peru, ISV em Honduras, ITBMS no Panamá, MwSt na Alemanha e TVA na França — é um imposto indireto de consumo aplicado em cada etapa da cadeia de produção e distribuição. Ao contrário de um simples imposto sobre vendas, o IVA é coletado incrementalmente: cada empresa na cadeia cobra imposto sobre suas vendas e deduz o imposto que pagou em suas compras (crédito de imposto de entrada). O consumidor final acaba arcando com o valor total do imposto. As taxas de IVA variam significativamente entre países, desde 7% no Panamá até 22% no Uruguai. A maioria dos países tem múltiplas taxas: uma taxa geral para a maioria dos bens, taxas reduzidas para itens essenciais como comida e remédios, e taxas zero ou isenções para exportações e necessidades básicas."
        },
        "howItWorks": {
          "title": "Como Calcular IVA",
          "content": "Existem três cálculos comuns. Para ADICIONAR imposto a um preço base: multiplique por (1 + taxa). Exemplo: $1.000 × 1,16 = $1.160 (com 16% IVA). Para REMOVER imposto de um total (encontrar o preço base): divida por (1 + taxa). Exemplo: $1.160 ÷ 1,16 = $1.000 base. Para EXTRAIR apenas o valor do imposto de um total: subtraia a base do total, ou equivalentemente: total × (taxa ÷ (1 + taxa)). Exemplo: $1.160 × (0,16 ÷ 1,16) = $160 imposto. Um erro comum é calcular 16% do total para encontrar o imposto — isso dá a resposta errada porque o total já inclui imposto. A abordagem correta é sempre dividir primeiro, depois subtrair."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Cada país nomeia seu imposto diferentemente: IVA (México, Colômbia, Argentina, Chile), ITBIS (República Dominicana), IGV (Peru), ISV (Honduras), ITBMS (Panamá), MwSt (Alemanha), TVA (França).",
              "type": "info"
            },
            {
              "text": "Taxa zero (0%) e isento NÃO são a mesma coisa. Bens com taxa zero são tributáveis a 0% (vendedor ainda pode reivindicar créditos de entrada). Bens isentos estão fora do sistema tributário inteiramente (sem crédito de entrada).",
              "type": "warning"
            },
            {
              "text": "A zona fronteiriça do México (8% IVA) se aplica a empresas fisicamente localizadas dentro de 25 milhas das fronteiras dos EUA, Guatemala ou Belize, não a compras online.",
              "type": "info"
            },
            {
              "text": "O ICMS do Brasil é o mais complexo: taxas variam por estado (7%-25%), tipo de produto e se a transação é interestadual. Esta calculadora usa taxas médias.",
              "type": "warning"
            },
            {
              "text": "Os 18% IGV do Peru são na verdade dois impostos combinados: 16% IGV + 2% IPM (Imposto de Promoção Municipal). Ambos aparecem como um único 18% nas faturas.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Taxas de Imposto por País (2026)",
          "items": [
            {
              "text": "México: IVA 16% (geral), 8% (zona fronteiriça), 0% (comida, remédio, livros). Mais alto na fronteira ainda menor que a maioria dos países LATAM.",
              "type": "info"
            },
            {
              "text": "Colômbia: IVA 19% (geral), 5% (alguns alimentos, saúde), 0% (cesta básica). Uma das taxas mais altas da América do Sul.",
              "type": "info"
            },
            {
              "text": "Argentina: IVA 21% (geral), 10,5% (reduzida), 27% (serviços públicos). A taxa de 27% em gás/eletricidade/água é notavelmente alta.",
              "type": "info"
            },
            {
              "text": "República Dominicana: ITBIS 18% (geral), 16% (itens selecionados), 0% (comida básica). Nota: é ITBIS, não IVA — nome específico dominicano.",
              "type": "info"
            },
            {
              "text": "Espanha: IVA 21% (geral), 10% (comida, hotéis), 4% (pão, leite, remédio). Três taxas — a maioria dos países da UE segue estrutura similar.",
              "type": "info"
            },
            {
              "text": "Panamá: ITBMS 7% (geral) — a taxa padrão mais baixa de toda a América Latina. Taxas mais altas (10-15%) apenas para álcool, tabaco, bens de luxo.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Cenários comuns passo a passo",
          "examples": [
            {
              "title": "Adicionar 16% IVA a um preço no México",
              "steps": [
                "Preço base: MX$1.000,00",
                "Taxa de imposto: 16% (IVA geral)",
                "Valor do IVA: $1.000 × 0,16 = MX$160,00",
                "Total com IVA: $1.000 + $160 = MX$1.160,00",
                "Ou simplesmente: $1.000 × 1,16 = MX$1.160,00"
              ],
              "result": "Cliente paga MX$1.160,00 (MX$160 é IVA)."
            },
            {
              "title": "Extrair ITBIS de um total na República Dominicana",
              "steps": [
                "Total pago: RD$5.000,00 (ITBIS incluído)",
                "Taxa de imposto: 18% (ITBIS geral)",
                "Preço base: $5.000 ÷ 1,18 = RD$4.237,29",
                "Valor do ITBIS: $5.000 − $4.237,29 = RD$762,71",
                "Verificar: $4.237,29 × 0,18 = $762,71 ✓"
              ],
              "result": "Do total de RD$5.000, RD$762,71 é ITBIS e RD$4.237,29 é o preço base."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual é a diferença entre IVA, ITBIS e IGV?",
          "answer": "São todos o mesmo tipo de imposto (imposto sobre valor agregado) com nomes diferentes por país. IVA (Imposto ao Valor Agregado) é usado no México, Colômbia, Argentina, Chile, Espanha. ITBIS (Imposto sobre Transferências de Bens Industrializados e Serviços) é o nome da República Dominicana. IGV (Imposto Geral às Vendas) é o nome do Peru."
        },
        {
          "question": "Como remover imposto de um preço total?",
          "answer": "Divida o total por (1 + taxa de imposto como decimal). Para México a 16%: total ÷ 1,16 = preço base. Para Colômbia a 19%: total ÷ 1,19. Erro comum: NÃO apenas subtraia 16% do total — isso dá a resposta errada porque a porcentagem é calculada sobre a base, não o total."
        },
        {
          "question": "O que é a taxa de zona fronteiriça do México?",
          "answer": "Empresas fisicamente localizadas dentro de aproximadamente 25 milhas da fronteira norte do México (EUA) ou fronteiras sul (Guatemala, Belize) podem aplicar 8% IVA em vez de 16%. Isso foi introduzido em 2019 para ajudar empresas fronteiriças a competir. NÃO se aplica a compras online ou empresas fora da zona."
        },
        {
          "question": "Comida e remédios são tributados?",
          "answer": "Na maioria dos países latino-americanos, itens alimentares básicos e remédios são taxa zero (0%) ou isentos de imposto sobre vendas. No entanto, alimentos processados, restaurantes e itens não essenciais são tipicamente tributados na taxa padrão."
        },
        {
          "question": "Qual é a maior taxa de IVA na América Latina?",
          "answer": "Uruguai com 22% tem a maior taxa padrão, seguido pela Argentina com 21%. No entanto, a Argentina também tem uma taxa aumentada de 27% em serviços públicos (gás, eletricidade, água). Panamá tem a menor com 7%."
        },
        {
          "question": "Qual é a diferença entre taxa zero e isento?",
          "answer": "Taxa zero significa que o produto É tributável mas a taxa é 0% — o vendedor ainda pode reivindicar créditos de imposto de entrada nas compras. Isento significa que o produto está fora do sistema tributário inteiramente — o vendedor NÃO PODE reivindicar créditos de entrada."
        }
      ],
      "chart": {
        "title": "Detalhamento do Preço",
        "xLabel": "",
        "yLabel": "Valor",
        "series": {
          "base": "Preço Base",
          "tax": "Valor do Imposto"
        }
      },
      "buttons": {
        "calculate": "Calcular",
        "reset": "Reiniciar",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Salvar",
        "saved": "Salvo",
        "saving": "Salvando..."
      },
      "share": {
        "calculatedWith": "Calculado com Kalcufy.com"
      },
      "ui": {
        "results": "Resultados",
        "yourInformation": "Suas Informações"
      },
      "accessibility": {
        "mobileResults": "Resumo dos resultados",
        "closeModal": "Fechar",
        "openMenu": "Abrir menu"
      },
      "rating": {
        "title": "Avalie esta Calculadora",
        "share": "Compartilhar",
        "copied": "Copiado!",
        "copyLink": "Copiar Link",
        "clickToRate": "Clique para avaliar",
        "youRated": "Você avaliou",
        "stars": "estrelas",
        "averageFrom": "média de",
        "ratings": "avaliações"
      },
      "common": {
        "home": "Início",
        "calculators": "Calculadoras"
      },
      "sources": {
        "title": "Fontes e Referências"
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      }
    },
    fr: {
      "name": "Calculateur de TVA",
      "slug": "calculateur-tva",
      "subtitle": "Calculez la TVA, IVA, ITBIS, IGV ou taxe de vente pour 18 pays. Ajoutez, supprimez ou extrayez la taxe de tout montant instantanément.",
      "breadcrumb": "TVA / IVA",
      "seo": {
        "title": "Calculateur de TVA - IVA, ITBIS, IGV pour 18 Pays",
        "description": "Calculez TVA/IVA/ITBIS/IGV instantanément pour le Mexique, la Colombie, l'Argentine, le Pérou, l'Espagne et 13 autres pays. Ajoutez, supprimez ou extrayez la taxe avec les taux officiels 2026.",
        "shortDescription": "Calculez la TVA, IVA, ITBIS ou IGV pour 18 pays avec les taux officiels.",
        "keywords": [
          "calculateur tva",
          "calculateur iva",
          "calculadora de iva",
          "calculateur itbis",
          "calculateur igv",
          "calculer tva",
          "calculateur taxe vente",
          "calculateur iva gratuit en ligne"
        ]
      },
      "inputs": {
        "country": {
          "label": "Pays",
          "helpText": "Sélectionnez votre pays — nom de taxe, taux et devise s'ajustent automatiquement",
          "options": {
            "MX": "🇲🇽 Mexique (IVA)",
            "CO": "🇨🇴 Colombie (IVA)",
            "AR": "🇦🇷 Argentine (IVA)",
            "PE": "🇵🇪 Pérou (IGV)",
            "BR": "🇧🇷 Brésil (ICMS)",
            "DO": "🇩🇴 Rép. Dom. (ITBIS)",
            "GT": "🇬🇹 Guatemala (IVA)",
            "SV": "🇸🇻 Salvador (IVA)",
            "CR": "🇨🇷 Costa Rica (IVA)",
            "HN": "🇭🇳 Honduras (ISV)",
            "CL": "🇨🇱 Chili (IVA)",
            "EC": "🇪🇨 Équateur (IVA)",
            "UY": "🇺🇾 Uruguay (IVA)",
            "PA": "🇵🇦 Panama (ITBMS)",
            "ES": "🇪🇸 Espagne (IVA)",
            "DE": "🇩🇪 Allemagne (MwSt)",
            "FR": "🇫🇷 France (TVA)",
            "PT": "🇵🇹 Portugal (IVA)"
          }
        },
        "mode": {
          "label": "De quoi avez-vous besoin ?",
          "helpText": "Choisissez le type de calcul dont vous avez besoin",
          "options": {
            "addTax": "Ajouter la taxe au prix",
            "removeTax": "Supprimer la taxe du total",
            "extractTax": "Extraire le montant de taxe du total"
          }
        },
        "amount": {
          "label": "Montant",
          "helpText": "Saisissez le prix ou le montant total"
        },
        "taxRate": {
          "label": "Taux de Taxe",
          "helpText": "Sélectionnez le taux de taxe applicable pour votre produit ou service",
          "options": {
            "general": "Général",
            "reduced": "Réduit",
            "superreduced": "Super-réduit",
            "border": "Zone Frontalière",
            "increased": "Majoré",
            "zero": "Exonéré / Zéro"
          }
        },
        "useCustomRate": {
          "label": "Utiliser Taux Personnalisé",
          "helpText": "Activez pour saisir manuellement un pourcentage de taxe spécifique"
        },
        "customRate": {
          "label": "Taux de Taxe Personnalisé",
          "helpText": "Saisissez votre pourcentage de taux de taxe spécifique"
        }
      },
      "results": {
        "totalWithTax": {
          "label": "Total (taxe comprise)"
        },
        "baseAmount": {
          "label": "Montant de Base (avant taxe)"
        },
        "taxAmount": {
          "label": "Montant de la Taxe"
        },
        "taxRateUsed": {
          "label": "Taux de Taxe Appliqué"
        }
      },
      "presets": {
        "mexico16": {
          "label": "🇲🇽 Mexique 16%",
          "description": "Ajouter IVA à 1 000 $ MXN"
        },
        "colombiaExtract": {
          "label": "🇨🇴 Colombie Extraction",
          "description": "Extraire IVA de 5 000 $ COP"
        },
        "argentinaRemove": {
          "label": "🇦🇷 Argentine Suppression",
          "description": "Supprimer 21% IVA du total"
        },
        "spainReduced": {
          "label": "🇪🇸 Espagne Réduit",
          "description": "Ajouter 10% IVA réduit"
        }
      },
      "values": {
        "taxIncluded": "Taxe comprise",
        "beforeTax": "Avant taxe",
        "taxAmount": "Montant de la taxe",
        "of": "de",
        "on": "sur",
        "rate": "taux"
      },
      "formats": {
        "summary": "Base : {baseAmount} + {taxName} ({taxRate}) : {taxAmount} = Total : {totalWithTax}"
      },
      "infoCards": {
        "metrics": {
          "title": "Détail du Calcul",
          "items": [
            {
              "label": "Montant de Base",
              "valueKey": "baseAmount"
            },
            {
              "label": "Taux de Taxe",
              "valueKey": "taxRateDisplay"
            },
            {
              "label": "Montant de la Taxe",
              "valueKey": "taxAmount"
            },
            {
              "label": "Total",
              "valueKey": "totalWithTax"
            }
          ]
        },
        "details": {
          "title": "Info Taxe du Pays",
          "items": [
            {
              "label": "Nom de la Taxe",
              "valueKey": "taxNameDisplay"
            },
            {
              "label": "Taux Standard",
              "valueKey": "standardRateDisplay"
            },
            {
              "label": "Taux Disponibles",
              "valueKey": "availableRatesDisplay"
            },
            {
              "label": "Formule Utilisée",
              "valueKey": "formulaUsed"
            }
          ]
        },
        "tips": {
          "title": "Conseils Rapides",
          "items": [
            "Pour ajouter la taxe : multipliez le prix de base par (1 + taux). Pour le Mexique 16% : prix × 1,16",
            "Pour supprimer la taxe d'un total : divisez par (1 + taux). Pour le Mexique : total ÷ 1,16 = prix de base",
            "Pour extraire seulement le montant de taxe d'un total : total − (total ÷ (1 + taux)) = taxe payée",
            "Les articles à taux zéro (0%) sont différents des articles exonérés. Le taux zéro nécessite encore une déclaration fiscale ; l'exonération non."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que la TVA / IVA / Taxe de Vente ?",
          "content": "La Taxe sur la Valeur Ajoutée (TVA) — connue sous le nom d'IVA dans les pays hispanophones, ITBIS en République dominicaine, IGV au Pérou, ISV au Honduras, ITBMS au Panama, MwSt en Allemagne, et TVA en France — est un impôt indirect sur la consommation appliqué à chaque étape de la chaîne de production et de distribution. Contrairement à une simple taxe de vente, la TVA est collectée de manière incrémentielle : chaque entreprise de la chaîne facture la taxe sur ses ventes et déduit la taxe qu'elle a payée sur ses achats (crédit de taxe d'entrée). Le consommateur final supporte finalement le montant total de la taxe. Les taux de TVA varient considérablement entre les pays, de 7% au Panama à 22% en Uruguay. La plupart des pays ont plusieurs taux : un taux général pour la plupart des biens, des taux réduits pour les articles essentiels comme la nourriture et les médicaments, et des taux zéro ou exonérations pour les exportations et les nécessités de base."
        },
        "howItWorks": {
          "title": "Comment Calculer la TVA / IVA",
          "content": "Il y a trois calculs courants. Pour AJOUTER la taxe à un prix de base : multipliez par (1 + taux). Exemple : 1 000 $ × 1,16 = 1 160 $ (avec 16% IVA). Pour SUPPRIMER la taxe d'un total (trouver le prix de base) : divisez par (1 + taux). Exemple : 1 160 $ ÷ 1,16 = 1 000 $ de base. Pour EXTRAIRE seulement le montant de taxe d'un total : soustrayez la base du total, ou de manière équivalente : total × (taux ÷ (1 + taux)). Exemple : 1 160 $ × (0,16 ÷ 1,16) = 160 $ de taxe. Une erreur courante est de calculer 16% du total pour trouver la taxe — cela donne la mauvaise réponse car le total inclut déjà la taxe. L'approche correcte est toujours de diviser d'abord, puis soustraire."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "Chaque pays nomme sa taxe différemment : IVA (Mexique, Colombie, Argentine, Chili), ITBIS (République dominicaine), IGV (Pérou), ISV (Honduras), ITBMS (Panama), MwSt (Allemagne), TVA (France).",
              "type": "info"
            },
            {
              "text": "Taux zéro (0%) et exonéré ne sont PAS la même chose. Les biens à taux zéro sont taxables à 0% (le vendeur peut encore réclamer des crédits d'entrée). Les biens exonérés sont hors du système fiscal entièrement (pas de crédit d'entrée).",
              "type": "warning"
            },
            {
              "text": "La zone frontalière du Mexique (8% IVA) s'applique aux entreprises physiquement situées dans les 25 miles des frontières US, Guatemala ou Belize, pas aux achats en ligne.",
              "type": "info"
            },
            {
              "text": "L'ICMS du Brésil est le plus complexe : les taux varient par état (7%-25%), type de produit, et si la transaction est inter-états. Ce calculateur utilise les taux moyens.",
              "type": "warning"
            },
            {
              "text": "Les 18% IGV du Pérou sont en fait deux taxes combinées : 16% IGV + 2% IPM (Impuesto de Promoción Municipal). Les deux apparaissent comme un seul 18% sur les factures.",
              "type": "info"
            },
            {
              "text": "Pour les ventes transfrontalières dans l'UE (intra-communautaires), les règles de TVA sont différentes — le vendeur peut facturer 0% et l'acheteur s'auto-évalue sous autoliquidation.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Taux de Taxe par Pays (2026)",
          "items": [
            {
              "text": "Mexique : IVA 16% (général), 8% (zone frontalière), 0% (nourriture, médicaments, livres). Le plus élevé à la frontière reste plus bas que la plupart des pays LATAM.",
              "type": "info"
            },
            {
              "text": "Colombie : IVA 19% (général), 5% (certaine nourriture, santé), 0% (panier de base). Un des taux les plus élevés en Amérique du Sud.",
              "type": "info"
            },
            {
              "text": "Argentine : IVA 21% (général), 10,5% (réduit), 27% (services publics). Le taux de 27% sur gaz/électricité/eau est particulièrement élevé.",
              "type": "info"
            },
            {
              "text": "République dominicaine : ITBIS 18% (général), 16% (articles sélectionnés), 0% (nourriture de base). Note : c'est ITBIS, pas IVA — nom spécifique dominicain.",
              "type": "info"
            },
            {
              "text": "Espagne : IVA 21% (général), 10% (nourriture, hôtels), 4% (pain, lait, médicaments). Trois taux — la plupart des pays UE suivent une structure similaire.",
              "type": "info"
            },
            {
              "text": "Panama : ITBMS 7% (général) — le taux standard le plus bas de toute l'Amérique latine. Taux plus élevés (10-15%) seulement pour alcool, tabac, biens de luxe.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Scénarios courants étape par étape",
          "examples": [
            {
              "title": "Ajouter 16% IVA à un prix au Mexique",
              "steps": [
                "Prix de base : 1 000,00 $ MX",
                "Taux de taxe : 16% (IVA général)",
                "Montant IVA : 1 000 $ × 0,16 = 160,00 $ MX",
                "Total avec IVA : 1 000 $ + 160 $ = 1 160,00 $ MX",
                "Ou simplement : 1 000 $ × 1,16 = 1 160,00 $ MX"
              ],
              "result": "Le client paie 1 160,00 $ MX (160 $ MX est l'IVA)."
            },
            {
              "title": "Extraire ITBIS d'un total en République dominicaine",
              "steps": [
                "Total payé : 5 000,00 $ RD (ITBIS inclus)",
                "Taux de taxe : 18% (ITBIS général)",
                "Prix de base : 5 000 $ ÷ 1,18 = 4 237,29 $ RD",
                "Montant ITBIS : 5 000 $ − 4 237,29 $ = 762,71 $ RD",
                "Vérification : 4 237,29 $ × 0,18 = 762,71 $ ✓"
              ],
              "result": "Du total de 5 000 $ RD, 762,71 $ RD est l'ITBIS et 4 237,29 $ RD est le prix de base."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la différence entre TVA, IVA, ITBIS et IGV ?",
          "answer": "Ce sont tous le même type de taxe (taxe sur la valeur ajoutée) avec des noms différents selon le pays. IVA (Impuesto al Valor Agregado) est utilisé au Mexique, Colombie, Argentine, Chili, Espagne. ITBIS (Impuesto sobre Transferencias de Bienes Industrializados y Servicios) est le nom de la République dominicaine. IGV (Impuesto General a las Ventas) est le nom du Pérou. ISV est le Honduras, ITBMS est le Panama, MwSt est l'Allemagne, TVA est la France."
        },
        {
          "question": "Comment supprimer la taxe d'un prix total ?",
          "answer": "Divisez le total par (1 + taux de taxe en décimal). Pour le Mexique à 16% : total ÷ 1,16 = prix de base. Pour la Colombie à 19% : total ÷ 1,19. Erreur courante : ne soustrayez PAS simplement 16% du total — cela donne la mauvaise réponse car le pourcentage est calculé sur la base, pas sur le total."
        },
        {
          "question": "Qu'est-ce que le taux de zone frontalière du Mexique ?",
          "answer": "Les entreprises physiquement situées dans environ 25 miles des frontières nord (US) ou sud (Guatemala, Belize) du Mexique peuvent appliquer 8% IVA au lieu de 16%. Ceci a été introduit en 2019 pour aider les entreprises frontalières à être compétitives. Cela ne s'applique PAS aux achats en ligne ou aux entreprises hors de la zone."
        },
        {
          "question": "La nourriture et les médicaments sont-ils taxés ?",
          "answer": "Dans la plupart des pays d'Amérique latine, les aliments de base et les médicaments sont soit à taux zéro (0%) soit exonérés de taxe de vente. Cependant, les aliments transformés, restaurants et articles non essentiels sont typiquement taxés au taux standard. Chaque pays définit sa propre liste d'articles exonérés."
        },
        {
          "question": "Quel est le taux de TVA le plus élevé en Amérique latine ?",
          "answer": "L'Uruguay à 22% a le taux standard le plus élevé, suivi de l'Argentine à 21%. Cependant, l'Argentine a aussi un taux majoré de 27% sur les services publics (gaz, électricité, eau), en faisant le taux spécifique le plus élevé. Le Panama a le plus bas à 7%."
        },
        {
          "question": "Comment la taxe est-elle montrée sur les factures ?",
          "answer": "La plupart des pays exigent que les factures montrent clairement : 1) Montant de base (avant taxe), 2) Taux de taxe appliqué, 3) Montant de taxe en devise, 4) Total avec taxe. Au Mexique c'est sur le CFDI (Comprobante Fiscal Digital), en Colombie sur facturation électronique (facturación electrónica), dans l'UE sur factures standard avec numéro TVA."
        },
        {
          "question": "Quelle est la différence entre taux zéro et exonéré ?",
          "answer": "Taux zéro signifie que le produit EST taxable mais le taux est 0% — le vendeur peut encore réclamer des crédits de taxe d'entrée sur les achats. Exonéré signifie que le produit est hors du système fiscal entièrement — le vendeur ne PEUT PAS réclamer de crédits d'entrée. Cette distinction importe pour les entreprises, pas les consommateurs."
        },
        {
          "question": "Pourquoi le système du Brésil est-il si complexe ?",
          "answer": "Le Brésil a plusieurs taxes qui se chevauchent au lieu d'une seule TVA : ICMS (niveau état, 7-25%), IPI (fédéral, varie), ISS (municipal, services), PIS/COFINS (contributions fédérales). Les taux varient par état, produit et type de transaction. Une réforme fiscale majeure (attendue 2026-2027) vise à unifier ceux-ci en un seul système IBS + CBS."
        }
      ],
      "chart": {
        "title": "Répartition du Prix",
        "xLabel": "",
        "yLabel": "Montant",
        "series": {
          "base": "Prix de Base",
          "tax": "Montant de la Taxe"
        }
      },
      "buttons": {
        "calculate": "Calculer",
        "reset": "Réinitialiser",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Sauvegarder",
        "saved": "Sauvegardé",
        "saving": "Sauvegarde..."
      },
      "share": {
        "calculatedWith": "Calculé avec Kalcufy.com"
      },
      "ui": {
        "results": "Résultats",
        "yourInformation": "Vos Informations"
      },
      "accessibility": {
        "mobileResults": "Résumé des résultats",
        "closeModal": "Fermer",
        "openMenu": "Ouvrir le menu"
      },
      "rating": {
        "title": "Notez cette Calculatrice",
        "share": "Partager",
        "copied": "Copié!",
        "copyLink": "Copier le Lien",
        "clickToRate": "Cliquez pour noter",
        "youRated": "Vous avez noté",
        "stars": "étoiles",
        "averageFrom": "moyenne de",
        "ratings": "évaluations"
      },
      "common": {
        "home": "Accueil",
        "calculators": "Calculatrices"
      },
      "sources": {
        "title": "Sources et Références"
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      }
    },
    de: {
      "name": "Mehrwertsteuer-Rechner",
      "slug": "mehrwertsteuer-rechner",
      "subtitle": "Berechnen Sie Mehrwertsteuer, IVA, ITBIS, IGV oder Umsatzsteuer für 18 Länder. Steuer zu beliebigen Beträgen hinzufügen, entfernen oder extrahieren.",
      "breadcrumb": "MwSt / IVA",
      "seo": {
        "title": "Mehrwertsteuer-Rechner - IVA, ITBIS, IGV für 18 Länder",
        "description": "Berechnen Sie MwSt/IVA/ITBIS/IGV sofort für Mexiko, Kolumbien, Argentinien, Peru, Spanien und 13 weitere Länder. Steuer hinzufügen, entfernen oder extrahieren mit offiziellen 2026-Sätzen.",
        "shortDescription": "Berechnen Sie MwSt, IVA, ITBIS oder IGV für 18 Länder mit offiziellen Sätzen.",
        "keywords": [
          "mehrwertsteuer rechner",
          "mwst rechner",
          "iva rechner",
          "umsatzsteuer rechner",
          "steuer berechnen",
          "mehrwertsteuer berechnen",
          "kostenloser mwst rechner online",
          "steuerrechner"
        ]
      },
      "inputs": {
        "country": {
          "label": "Land",
          "helpText": "Wählen Sie Ihr Land — Steuername, Sätze und Währung werden automatisch angepasst",
          "options": {
            "MX": "🇲🇽 Mexiko (IVA)",
            "CO": "🇨🇴 Kolumbien (IVA)",
            "AR": "🇦🇷 Argentinien (IVA)",
            "PE": "🇵🇪 Peru (IGV)",
            "BR": "🇧🇷 Brasilien (ICMS)",
            "DO": "🇩🇴 Dom. Rep. (ITBIS)",
            "GT": "🇬🇹 Guatemala (IVA)",
            "SV": "🇸🇻 El Salvador (IVA)",
            "CR": "🇨🇷 Costa Rica (IVA)",
            "HN": "🇭🇳 Honduras (ISV)",
            "CL": "🇨🇱 Chile (IVA)",
            "EC": "🇪🇨 Ecuador (IVA)",
            "UY": "🇺🇾 Uruguay (IVA)",
            "PA": "🇵🇦 Panama (ITBMS)",
            "ES": "🇪🇸 Spanien (IVA)",
            "DE": "🇩🇪 Deutschland (MwSt)",
            "FR": "🇫🇷 Frankreich (TVA)",
            "PT": "🇵🇹 Portugal (IVA)"
          }
        },
        "mode": {
          "label": "Was benötigen Sie?",
          "helpText": "Wählen Sie die Art der Berechnung, die Sie benötigen",
          "options": {
            "addTax": "Steuer zum Preis hinzufügen",
            "removeTax": "Steuer vom Gesamtbetrag entfernen",
            "extractTax": "Steuerbetrag aus Gesamtbetrag extrahieren"
          }
        },
        "amount": {
          "label": "Betrag",
          "helpText": "Geben Sie den Preis oder Gesamtbetrag ein"
        },
        "taxRate": {
          "label": "Steuersatz",
          "helpText": "Wählen Sie den anwendbaren Steuersatz für Ihr Produkt oder Ihre Dienstleistung",
          "options": {
            "general": "Allgemein",
            "reduced": "Ermäßigt",
            "superreduced": "Stark ermäßigt",
            "border": "Grenzzone",
            "increased": "Erhöht",
            "zero": "Befreit / Null"
          }
        },
        "useCustomRate": {
          "label": "Benutzerdefinierten Satz verwenden",
          "helpText": "Aktivieren, um einen spezifischen Steuerprozentsatz manuell einzugeben"
        },
        "customRate": {
          "label": "Benutzerdefinierter Steuersatz",
          "helpText": "Geben Sie Ihren spezifischen Steuersatzprozentsatz ein"
        }
      },
      "results": {
        "totalWithTax": {
          "label": "Gesamtbetrag (inkl. Steuer)"
        },
        "baseAmount": {
          "label": "Grundbetrag (vor Steuer)"
        },
        "taxAmount": {
          "label": "Steuerbetrag"
        },
        "taxRateUsed": {
          "label": "Angewendeter Steuersatz"
        }
      },
      "presets": {
        "mexico16": {
          "label": "🇲🇽 Mexiko 16%",
          "description": "IVA zu $1.000 MXN hinzufügen"
        },
        "colombiaExtract": {
          "label": "🇨🇴 Kolumbien Extrahieren",
          "description": "IVA aus $5.000 COP extrahieren"
        },
        "argentinaRemove": {
          "label": "🇦🇷 Argentinien Entfernen",
          "description": "21% IVA vom Gesamtbetrag entfernen"
        },
        "spainReduced": {
          "label": "🇪🇸 Spanien Ermäßigt",
          "description": "10% ermäßigte IVA hinzufügen"
        }
      },
      "values": {
        "taxIncluded": "Steuer inbegriffen",
        "beforeTax": "Vor Steuer",
        "taxAmount": "Steuerbetrag",
        "of": "von",
        "on": "auf",
        "rate": "Satz"
      },
      "formats": {
        "summary": "Grundbetrag: {baseAmount} + {taxName} ({taxRate}): {taxAmount} = Gesamt: {totalWithTax}"
      },
      "infoCards": {
        "metrics": {
          "title": "Berechnungsaufschlüsselung",
          "items": [
            {
              "label": "Grundbetrag",
              "valueKey": "baseAmount"
            },
            {
              "label": "Steuersatz",
              "valueKey": "taxRateDisplay"
            },
            {
              "label": "Steuerbetrag",
              "valueKey": "taxAmount"
            },
            {
              "label": "Gesamt",
              "valueKey": "totalWithTax"
            }
          ]
        },
        "details": {
          "title": "Länder-Steuerinfo",
          "items": [
            {
              "label": "Steuername",
              "valueKey": "taxNameDisplay"
            },
            {
              "label": "Standardsatz",
              "valueKey": "standardRateDisplay"
            },
            {
              "label": "Verfügbare Sätze",
              "valueKey": "availableRatesDisplay"
            },
            {
              "label": "Verwendete Formel",
              "valueKey": "formulaUsed"
            }
          ]
        },
        "tips": {
          "title": "Schnelle Tipps",
          "items": [
            "Steuer hinzufügen: Grundpreis mit (1 + Satz) multiplizieren. Für Mexiko 16%: Preis × 1,16",
            "Steuer von Gesamtbetrag entfernen: durch (1 + Satz) teilen. Für Mexiko: Gesamt ÷ 1,16 = Grundpreis",
            "Nur Steuerbetrag aus Gesamtbetrag extrahieren: Gesamt − (Gesamt ÷ (1 + Satz)) = gezahlte Steuer",
            "Nullbesteuerte (0%) Artikel unterscheiden sich von befreiten Artikeln. Nullbesteuerte erfordern weiterhin Steuermeldung; befreite nicht."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist MwSt / IVA / Umsatzsteuer?",
          "content": "Die Mehrwertsteuer (MwSt) — bekannt als IVA in spanischsprachigen Ländern, ITBIS in der Dominikanischen Republik, IGV in Peru, ISV in Honduras, ITBMS in Panama, MwSt in Deutschland und TVA in Frankreich — ist eine indirekte Verbrauchsteuer, die in jeder Stufe der Produktions- und Vertriebskette angewandt wird. Im Gegensatz zu einer einfachen Umsatzsteuer wird die MwSt schrittweise erhoben: Jedes Unternehmen in der Kette berechnet Steuer auf seine Verkäufe und zieht die Steuer ab, die es für seine Einkäufe gezahlt hat (Vorsteuerabzug). Der Endverbraucher trägt letztendlich den vollen Steuerbetrag. Die MwSt-Sätze variieren erheblich zwischen den Ländern, von nur 7% in Panama bis zu 22% in Uruguay. Die meisten Länder haben mehrere Sätze: einen allgemeinen Satz für die meisten Waren, ermäßigte Sätze für wesentliche Artikel wie Lebensmittel und Medizin und Nullsätze oder Befreiungen für Exporte und Grundbedarfsartikel."
        },
        "howItWorks": {
          "title": "Wie berechnet man MwSt / IVA",
          "content": "Es gibt drei gängige Berechnungen. Steuer zu einem Grundpreis HINZUFÜGEN: mit (1 + Satz) multiplizieren. Beispiel: 1.000 € × 1,16 = 1.160 € (mit 16% IVA). Steuer von einem Gesamtbetrag ENTFERNEN (Grundpreis finden): durch (1 + Satz) teilen. Beispiel: 1.160 € ÷ 1,16 = 1.000 € Grundbetrag. Nur den Steuerbetrag aus einem Gesamtbetrag EXTRAHIEREN: Grundbetrag vom Gesamtbetrag abziehen oder gleichwertig: Gesamt × (Satz ÷ (1 + Satz)). Beispiel: 1.160 € × (0,16 ÷ 1,16) = 160 € Steuer. Ein häufiger Fehler ist es, 16% des Gesamtbetrags zu berechnen, um die Steuer zu finden — das ergibt die falsche Antwort, weil der Gesamtbetrag bereits Steuer enthält. Der korrekte Ansatz ist immer zuerst zu teilen, dann zu subtrahieren."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Jedes Land benennt seine Steuer anders: IVA (Mexiko, Kolumbien, Argentinien, Chile), ITBIS (Dominikanische Republik), IGV (Peru), ISV (Honduras), ITBMS (Panama), MwSt (Deutschland), TVA (Frankreich).",
              "type": "info"
            },
            {
              "text": "Nullbesteuert (0%) und befreit sind NICHT dasselbe. Nullbesteuerte Waren sind mit 0% steuerpflichtig (Verkäufer kann weiterhin Vorsteuer geltend machen). Befreite Waren stehen außerhalb des Steuersystems (keine Vorsteuer).",
              "type": "warning"
            },
            {
              "text": "Mexikos Grenzzone (8% IVA) gilt für Unternehmen, die physisch innerhalb von 40 km zur US-, Guatemala- oder Belize-Grenze ansässig sind, nicht für Online-Käufe.",
              "type": "info"
            },
            {
              "text": "Brasiliens ICMS ist am komplexesten: Sätze variieren nach Bundesstaat (7%-25%), Produkttyp und ob die Transaktion zwischen Bundesstaaten stattfindet. Dieser Rechner verwendet Durchschnittssätze.",
              "type": "warning"
            },
            {
              "text": "Perus 18% IGV sind tatsächlich zwei kombinierte Steuern: 16% IGV + 2% IPM (Impuesto de Promoción Municipal). Beide erscheinen als einheitliche 18% auf Rechnungen.",
              "type": "info"
            },
            {
              "text": "Für grenzüberschreitende Verkäufe innerhalb der EU (innergemeinschaftlich) gelten andere MwSt-Regeln — der Verkäufer kann 0% berechnen und der Käufer führt unter Reverse-Charge-Verfahren selbst ab.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Steuersätze nach Land (2026)",
          "items": [
            {
              "text": "Mexiko: IVA 16% (allgemein), 8% (Grenzzone), 0% (Lebensmittel, Medizin, Bücher). Höchster Grenzzonensatz immer noch niedriger als die meisten LATAM-Länder.",
              "type": "info"
            },
            {
              "text": "Kolumbien: IVA 19% (allgemein), 5% (einige Lebensmittel, Gesundheit), 0% (Grundwarenkorb). Einer der höheren Sätze in Südamerika.",
              "type": "info"
            },
            {
              "text": "Argentinien: IVA 21% (allgemein), 10,5% (ermäßigt), 27% (Versorgungsunternehmen). Der 27%-Satz auf Gas/Strom/Wasser ist bemerkenswert hoch.",
              "type": "info"
            },
            {
              "text": "Dominikanische Republik: ITBIS 18% (allgemein), 16% (ausgewählte Artikel), 0% (Grundnahrungsmittel). Hinweis: es ist ITBIS, nicht IVA — dominikanisch-spezifischer Name.",
              "type": "info"
            },
            {
              "text": "Spanien: IVA 21% (allgemein), 10% (Lebensmittel, Hotels), 4% (Brot, Milch, Medizin). Drei Sätze — die meisten EU-Länder folgen einer ähnlichen Struktur.",
              "type": "info"
            },
            {
              "text": "Panama: ITBMS 7% (allgemein) — der niedrigste Standardsatz in ganz Lateinamerika. Höhere Sätze (10-15%) nur für Alkohol, Tabak, Luxusgüter.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Häufige Szenarien Schritt für Schritt",
          "examples": [
            {
              "title": "16% IVA zu einem Preis in Mexiko hinzufügen",
              "steps": [
                "Grundpreis: MX$1.000,00",
                "Steuersatz: 16% (allgemeine IVA)",
                "IVA-Betrag: $1.000 × 0,16 = MX$160,00",
                "Gesamt mit IVA: $1.000 + $160 = MX$1.160,00",
                "Oder einfach: $1.000 × 1,16 = MX$1.160,00"
              ],
              "result": "Kunde zahlt MX$1.160,00 (MX$160 ist IVA)."
            },
            {
              "title": "ITBIS aus Gesamtbetrag in Dominikanischer Republik extrahieren",
              "steps": [
                "Gezahlter Gesamtbetrag: RD$5.000,00 (ITBIS inbegriffen)",
                "Steuersatz: 18% (allgemeine ITBIS)",
                "Grundpreis: $5.000 ÷ 1,18 = RD$4.237,29",
                "ITBIS-Betrag: $5.000 − $4.237,29 = RD$762,71",
                "Überprüfung: $4.237,29 × 0,18 = $762,71 ✓"
              ],
              "result": "Von den RD$5.000 Gesamtbetrag sind RD$762,71 ITBIS und RD$4.237,29 der Grundpreis."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist der Unterschied zwischen MwSt, IVA, ITBIS und IGV?",
          "answer": "Es handelt sich um denselben Steuertyp (Mehrwertsteuer) mit verschiedenen Namen nach Land. IVA (Impuesto al Valor Agregado) wird in Mexiko, Kolumbien, Argentinien, Chile, Spanien verwendet. ITBIS (Impuesto sobre Transferencias de Bienes Industrializados y Servicios) ist der Name der Dominikanischen Republik. IGV (Impuesto General a las Ventas) ist Perus Name. ISV ist Honduras, ITBMS ist Panama, MwSt ist Deutschland, TVA ist Frankreich."
        },
        {
          "question": "Wie entferne ich Steuer von einem Gesamtpreis?",
          "answer": "Teilen Sie den Gesamtbetrag durch (1 + Steuersatz als Dezimalzahl). Für Mexiko bei 16%: Gesamt ÷ 1,16 = Grundpreis. Für Kolumbien bei 19%: Gesamt ÷ 1,19. Häufiger Fehler: Ziehen Sie NICHT einfach 16% vom Gesamtbetrag ab — das ergibt die falsche Antwort, weil der Prozentsatz auf den Grundbetrag, nicht auf den Gesamtbetrag berechnet wird."
        },
        {
          "question": "Was ist Mexikos Grenzzonensatz?",
          "answer": "Unternehmen, die physisch innerhalb von etwa 40 km zu Mexikos Nordgrenze (USA) oder Südgrenzen (Guatemala, Belize) ansässig sind, können 8% IVA statt 16% anwenden. Dies wurde 2019 eingeführt, um Grenzunternehmen beim Wettbewerb zu helfen. Es gilt NICHT für Online-Käufe oder Unternehmen außerhalb der Zone."
        },
        {
          "question": "Werden Lebensmittel und Medizin besteuert?",
          "answer": "In den meisten lateinamerikanischen Ländern sind Grundnahrungsmittel und Medizin entweder nullbesteuert (0%) oder von der Umsatzsteuer befreit. Verarbeitete Lebensmittel, Restaurants und nicht wesentliche Artikel werden jedoch typischerweise mit dem Standardsatz besteuert. Jedes Land definiert seine eigene Liste befreiter Artikel."
        },
        {
          "question": "Was ist der höchste MwSt-Satz in Lateinamerika?",
          "answer": "Uruguay mit 22% hat den höchsten Standardsatz, gefolgt von Argentinien mit 21%. Argentinien hat jedoch auch einen 27% erhöhten Satz auf Versorgungsleistungen (Gas, Strom, Wasser), was es zum höchsten spezifischen Satz macht. Panama hat den niedrigsten mit 7%."
        },
        {
          "question": "Wie wird Steuer auf Rechnungen gezeigt?",
          "answer": "Die meisten Länder verlangen, dass Rechnungen klar zeigen: 1) Grundbetrag (vor Steuer), 2) Angewendeter Steuersatz, 3) Steuerbetrag in Währung, 4) Gesamt mit Steuer. In Mexiko ist dies auf dem CFDI (Comprobante Fiscal Digital), in Kolumbien auf der elektronischen Rechnungsstellung, in der EU auf Standardrechnungen mit MwSt-Nummer."
        },
        {
          "question": "Was ist der Unterschied zwischen nullbesteuert und befreit?",
          "answer": "Nullbesteuert bedeutet, dass das Produkt steuerpflichtig IST, aber der Satz 0% beträgt — der Verkäufer kann weiterhin Vorsteuer auf Käufe geltend machen. Befreit bedeutet, dass das Produkt vollständig außerhalb des Steuersystems steht — der Verkäufer KANN KEINE Vorsteuer geltend machen. Diese Unterscheidung ist für Unternehmen, nicht für Verbraucher wichtig."
        },
        {
          "question": "Warum ist Brasiliens System so komplex?",
          "answer": "Brasilien hat mehrere sich überschneidende Steuern statt einer einzigen MwSt: ICMS (Staatsebene, 7-25%), IPI (Bundesebene, variiert), ISS (kommunal, Dienstleistungen), PIS/COFINS (Bundesbeiträge). Sätze variieren nach Staat, Produkt und Transaktionstyp. Eine große Steuerreform (erwartet 2026-2027) zielt darauf ab, diese in ein einziges IBS + CBS-System zu vereinheitlichen."
        }
      ],
      "chart": {
        "title": "Preisaufschlüsselung",
        "xLabel": "",
        "yLabel": "Betrag",
        "series": {
          "base": "Grundpreis",
          "tax": "Steuerbetrag"
        }
      },
      "buttons": {
        "calculate": "Berechnen",
        "reset": "Zurücksetzen",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Speichern",
        "saved": "Gespeichert",
        "saving": "Speichern..."
      },
      "share": {
        "calculatedWith": "Berechnet mit Kalcufy.com"
      },
      "ui": {
        "results": "Ergebnisse",
        "yourInformation": "Ihre Informationen"
      },
      "accessibility": {
        "mobileResults": "Ergebniszusammenfassung",
        "closeModal": "Schließen",
        "openMenu": "Menü öffnen"
      },
      "rating": {
        "title": "Bewerten Sie diesen Rechner",
        "share": "Teilen",
        "copied": "Kopiert!",
        "copyLink": "Link kopieren",
        "clickToRate": "Klicken zum Bewerten",
        "youRated": "Sie haben bewertet",
        "stars": "Sterne",
        "averageFrom": "Durchschnitt von",
        "ratings": "Bewertungen"
      },
      "common": {
        "home": "Startseite",
        "calculators": "Rechner"
      },
      "sources": {
        "title": "Quellen und Referenzen"
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      }
    },
  },

  inputs: [
    {
      id: "country",
      type: "select",
      defaultValue: "MX",
      options: [
        { value: "MX" }, { value: "CO" }, { value: "AR" }, { value: "PE" },
        { value: "BR" }, { value: "DO" }, { value: "GT" }, { value: "SV" },
        { value: "CR" }, { value: "HN" }, { value: "CL" }, { value: "EC" },
        { value: "UY" }, { value: "PA" },
        { value: "ES" }, { value: "DE" }, { value: "FR" }, { value: "PT" },
      ],
    },
    {
      id: "mode",
      type: "select",
      defaultValue: "addTax",
      options: [
        { value: "addTax" },
        { value: "removeTax" },
        { value: "extractTax" },
      ],
    },
    {
      id: "amount",
      type: "number",
      defaultValue: null,
      placeholder: "1000",
      min: 0.01,
    },
    {
      id: "taxRate",
      type: "select",
      defaultValue: "general",
      options: [
        { value: "general" },
        { value: "reduced" },
        { value: "superreduced" },
        { value: "intermediate" },
        { value: "border" },
        { value: "increased" },
        { value: "increased1" },
        { value: "increased2" },
        { value: "reduced1" },
        { value: "reduced2" },
        { value: "reduced3" },
        { value: "sp" },
        { value: "rj" },
        { value: "zero" },
      ],
    },
    {
      id: "useCustomRate",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "customRate",
      type: "number",
      defaultValue: 16,
      min: 0,
      max: 100,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "useCustomRate", value: true },
    },
  ],

  inputGroups: [],

  results: [
    { id: "totalWithTax", type: "primary", format: "text" },
    { id: "baseAmount", type: "secondary", format: "text" },
    { id: "taxAmount", type: "secondary", format: "text" },
    { id: "taxRateUsed", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "🏛️", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "vatBreakdown",
    type: "bar",
    xKey: "label",
    height: 250,
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "base", type: "bar", stackId: "price", color: "#3b82f6" },
      { key: "tax", type: "bar", stackId: "price", color: "#f97316" },
    ],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [
    { id: "0" }, { id: "1" }, { id: "2" }, { id: "3" },
    { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" },
  ],

  references: [
    {
      authors: "SAT — Servicio de Administración Tributaria",
      year: "2026",
      title: "Ley del IVA México — Tasas 16%, 8% (fronteriza), 0% (tasa cero)",
      source: "SAT México",
      url: "https://www.sat.gob.mx/",
    },
    {
      authors: "DIAN — Dirección de Impuestos y Aduanas Nacionales",
      year: "2026",
      title: "Estatuto Tributario Colombia — IVA 19%, 5%, 0%",
      source: "DIAN Colombia",
      url: "https://www.dian.gov.co/",
    },
    {
      authors: "European Commission",
      year: "2026",
      title: "VAT Rates Applied in the Member States of the European Union",
      source: "European Commission — Taxation",
      url: "https://taxation-customs.ec.europa.eu/vat-rates_en",
    },
  ],

  hero: { badge: "Finance", badgeVariant: "purple" },
  sidebar: {},
  features: {},
  relatedCalculators: ["christmas-bonus", "severance-calculator", "percentage"],
  ads: {},
};

// ═══════════════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════════
export function calculateVAT(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
  country?: string;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ───────────────────────────────────────────────────
  const country = (values.country as string) || "MX";
  const mode = (values.mode as string) || "addTax";
  const amount = values.amount as number | null;
  const taxRateId = (values.taxRate as string) || "general";
  const useCustomRate = (values.useCustomRate as boolean) ?? false;
  const customRate = (values.customRate as number) || 0;

  // ── Validate ──────────────────────────────────────────────────────
  if (amount === null || amount <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Get country tax info ──────────────────────────────────────────
  const countryTax = COUNTRY_TAX[country] || COUNTRY_TAX.MX;
  const sym = countryTax.currency.symbol;
  const taxName = countryTax.taxName;

  // ── Determine tax rate ────────────────────────────────────────────
  let taxRate: number;
  let taxRateLabel: string;

  if (useCustomRate) {
    taxRate = customRate / 100;
    taxRateLabel = `Custom (${customRate}%)`;
  } else {
    const rateObj = countryTax.rates.find(r => r.id === taxRateId) || countryTax.rates[0];
    taxRate = rateObj.rate;
    taxRateLabel = rateObj.label;
  }

  const taxRatePercent = taxRate * 100;

  // ── Calculate based on mode ───────────────────────────────────────
  let baseAmount: number;
  let taxAmount: number;
  let totalWithTax: number;
  let formulaUsed: string;

  switch (mode) {
    case "addTax": {
      // User enters base price → add tax
      baseAmount = amount;
      taxAmount = baseAmount * taxRate;
      totalWithTax = baseAmount + taxAmount;
      formulaUsed = `${fmtC(baseAmount, sym)} × ${taxRatePercent}% = ${fmtC(taxAmount, sym)} → Total: ${fmtC(totalWithTax, sym)}`;
      break;
    }
    case "removeTax": {
      // User enters total with tax → find base price
      totalWithTax = amount;
      baseAmount = totalWithTax / (1 + taxRate);
      taxAmount = totalWithTax - baseAmount;
      formulaUsed = `${fmtC(totalWithTax, sym)} ÷ ${(1 + taxRate).toFixed(4)} = ${fmtC(baseAmount, sym)} base`;
      break;
    }
    case "extractTax": {
      // User enters total → extract just the tax portion
      totalWithTax = amount;
      baseAmount = totalWithTax / (1 + taxRate);
      taxAmount = totalWithTax - baseAmount;
      formulaUsed = `${fmtC(totalWithTax, sym)} − (${fmtC(totalWithTax, sym)} ÷ ${(1 + taxRate).toFixed(2)}) = ${fmtC(taxAmount, sym)} ${taxName}`;
      break;
    }
    default: {
      baseAmount = amount;
      taxAmount = baseAmount * taxRate;
      totalWithTax = baseAmount + taxAmount;
      formulaUsed = `${fmtC(baseAmount, sym)} × ${taxRatePercent}%`;
    }
  }

  // ── Available rates summary ───────────────────────────────────────
  const availableRates = countryTax.rates
    .map(r => `${(r.rate * 100)}%`)
    .join(", ");

  const standardRate = countryTax.rates.find(r => r.id === "general");

  // ── Chart data ────────────────────────────────────────────────────
  const chartData = taxAmount > 0 ? [{
    label: "Price",
    base: baseAmount,
    tax: taxAmount,
  }] : [];

  // ── Format ────────────────────────────────────────────────────────
  const formatted: Record<string, string> = {
    totalWithTax: fmtC(totalWithTax, sym),
    baseAmount: fmtC(baseAmount, sym),
    taxAmount: fmtC(taxAmount, sym),
    taxRateUsed: `${taxName} ${taxRatePercent}% (${taxRateLabel})`,
    // InfoCards
    taxRateDisplay: `${taxRatePercent}% (${taxRateLabel})`,
    taxNameDisplay: `${taxName} — ${countryTax.currency.code}`,
    standardRateDisplay: standardRate ? `${(standardRate.rate * 100)}%` : "N/A",
    availableRatesDisplay: availableRates,
    formulaUsed,
  };

  // ── Summary ───────────────────────────────────────────────────────
  const summary = f.summary
    ?.replace("{baseAmount}", formatted.baseAmount)
    ?.replace("{taxName}", taxName)
    ?.replace("{taxRate}", `${taxRatePercent}%`)
    ?.replace("{taxAmount}", formatted.taxAmount)
    ?.replace("{totalWithTax}", formatted.totalWithTax)
    || `Base: ${formatted.baseAmount} + ${taxName} (${taxRatePercent}%): ${formatted.taxAmount} = Total: ${formatted.totalWithTax}`;

  return {
    values: {
      totalWithTax,
      baseAmount,
      taxAmount,
      taxRatePercent,
    },
    formatted,
    summary,
    isValid: true,
    metadata: { chartData },
  };
}

export default vatCalculatorConfig;
