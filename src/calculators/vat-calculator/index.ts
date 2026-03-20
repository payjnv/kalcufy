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
