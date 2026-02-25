import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { getGeoDefaults } from "@/lib/geo-intelligence";

// ─── Config ──────────────────────────────────────────────────────────────────

export const homeAffordabilityConfig: CalculatorConfigV4 = {
  id: "home-affordability",
  version: "4.0",
  category: "finance",
  icon: "🏠",

  presets: [
    {
      id: "firstTimeBuyer",
      icon: "🔑",
      values: {
        annualIncome: 65000,
        monthlyDebts: 400,
        downPayment: 20000,
        loanType: "fha",
        loanTerm: 30,
        propertyTaxRate: 1.1,
        homeInsuranceRate: 0.5,
        hoaFee: 0,
        includeMaintenance: false,
      },
    },
    {
      id: "comfortableBuyer",
      icon: "🏡",
      values: {
        annualIncome: 100000,
        monthlyDebts: 600,
        downPayment: 60000,
        loanType: "conventional",
        loanTerm: 30,
        propertyTaxRate: 1.1,
        homeInsuranceRate: 0.5,
        hoaFee: 0,
        includeMaintenance: true,
      },
    },
    {
      id: "dualIncome",
      icon: "👫",
      values: {
        annualIncome: 160000,
        monthlyDebts: 800,
        downPayment: 100000,
        loanType: "conventional",
        loanTerm: 30,
        propertyTaxRate: 1.1,
        homeInsuranceRate: 0.5,
        hoaFee: 200,
        includeMaintenance: true,
      },
    },
    {
      id: "veteran",
      icon: "🎖️",
      values: {
        annualIncome: 80000,
        monthlyDebts: 500,
        downPayment: 0,
        loanType: "va",
        loanTerm: 30,
        propertyTaxRate: 1.1,
        homeInsuranceRate: 0.5,
        hoaFee: 0,
        includeMaintenance: false,
      },
    },
    {
      id: "luxury",
      icon: "💎",
      values: {
        annualIncome: 250000,
        monthlyDebts: 2000,
        downPayment: 200000,
        loanType: "conventional",
        loanTerm: 15,
        propertyTaxRate: 1.2,
        homeInsuranceRate: 0.5,
        hoaFee: 500,
        includeMaintenance: true,
      },
    },
  ],

  t: {
    en: {
      name: "Home Affordability Calculator",
      slug: "home-affordability-calculator",
      subtitle: "Find out exactly how much house you can afford based on your income, debts, and local market rates — updated automatically for your country.",
      breadcrumb: "Home Affordability",
      seo: {
        title: "Home Affordability Calculator - How Much House Can I Afford?",
        description: "Calculate how much house you can afford based on your income, debts, and down payment. Uses local mortgage rates and auto-detects your country's financial standards.",
        shortDescription: "Find your maximum home price based on income and local rates.",
        keywords: [
          "home affordability calculator",
          "how much house can i afford",
          "mortgage affordability calculator",
          "house budget calculator",
          "home buying calculator",
          "can i afford a house",
          "first time home buyer calculator",
        ],
      },
      inputs: {
        annualIncome: {
          label: "Annual Household Income",
          helpText: "Combined gross income before taxes for all buyers",
        },
        monthlyDebts: {
          label: "Monthly Debt Payments",
          helpText: "Car loans, student loans, credit cards, other recurring debts — not utilities or groceries",
        },
        downPayment: {
          label: "Down Payment",
          helpText: "Cash available for down payment. Putting 20% down avoids PMI on conventional loans.",
        },
        loanType: {
          label: "Loan Type",
          helpText: "Loan type determines minimum down payment and DTI limits",
          options: {
            conventional: "Conventional (28/36 rule)",
            fha: "FHA Loan (31/43 rule)",
            va: "VA Loan (41% DTI)",
            custom: "Custom DTI",
          },
        },
        customDTI: {
          label: "Custom DTI Limit",
          helpText: "Set your own debt-to-income ratio limit (10–50%)",
        },
        loanTerm: {
          label: "Loan Term",
          helpText: "30-year loans have lower monthly payments; 15-year loans save significant interest",
          options: {
            "30": "30 Years",
            "15": "15 Years",
            "20": "20 Years",
          },
        },
        interestRate: {
          label: "Interest Rate",
          helpText: "Current mortgage rate. We pre-fill the average rate for your country automatically.",
        },
        propertyTaxRate: {
          label: "Property Tax Rate",
          helpText: "Annual property tax as % of home value. Varies significantly by location.",
        },
        homeInsuranceRate: {
          label: "Home Insurance",
          helpText: "Annual homeowners insurance as % of home value",
        },
        hoaFee: {
          label: "HOA / Monthly Fees",
          helpText: "Monthly homeowners association fee, if applicable",
        },
        includeMaintenance: {
          label: "Include Maintenance Costs",
          helpText: "Budget 1% of home value per year for repairs and maintenance",
        },
      },
      results: {
        conservativePrice: { label: "Conservative" },
        moderatePrice: { label: "Moderate" },
        aggressivePrice: { label: "Aggressive" },
        recommendedPrice: { label: "Recommended Home Price" },
        maxLoanAmount: { label: "Max Loan Amount" },
        monthlyPayment: { label: "Monthly Payment" },
        monthlyBreakdown: { label: "Monthly Breakdown" },
        frontEndDTI: { label: "Front-End DTI" },
        backEndDTI: { label: "Back-End DTI" },
        downPaymentPct: { label: "Down Payment %" },
        pmiRequired: { label: "PMI Required" },
      },
      presets: {
        firstTimeBuyer: { label: "First-Time Buyer", description: "FHA loan, modest income" },
        comfortableBuyer: { label: "Comfortable Buyer", description: "Conventional, single income" },
        dualIncome: { label: "Dual Income", description: "Two earners, strong buying power" },
        veteran: { label: "VA Loan", description: "No down payment required" },
        luxury: { label: "Luxury Buyer", description: "High income, 15-year mortgage" },
      },
      values: {
        years: "yr",
        perMonth: "/mo",
        perYear: "/yr",
      },
      formats: {
        summary: "You can afford up to {recommendedPrice} with a {monthlyPayment}/month payment",
      },
      infoCards: {
        scenarios: {
          title: "3 Affordability Scenarios",
          items: [
            "Conservative: 25–28% housing costs — maximum financial cushion",
            "Moderate: 28–33% housing costs — balanced approach (recommended)",
            "Aggressive: 33–43% housing costs — maximum buying power, less flexibility",
          ],
        },
        monthlyBreakdown: {
          title: "Your Monthly Payment Breakdown",
          items: [
            "Principal & Interest: loan amortization payment",
            "Property Tax: based on home value",
            "Home Insurance: based on home value",
            "PMI: only if down payment < 20% on conventional",
            "HOA: your monthly fee if applicable",
          ],
        },
        tips: {
          title: "Pro Tips to Maximize Affordability",
          type: "horizontal",
          items: [
            "Pay down debts before buying — each $100/month less in debt adds ~$20k buying power",
            "A 20% down payment eliminates PMI and lowers your rate",
            "Check your credit score — going from 660 to 740 can save 0.5–1% on your rate",
            "Get pre-approved before shopping so sellers take you seriously",
          ],
        },
      },
      chart: {
        title: "Monthly Payment Breakdown",
        xLabel: "Scenario",
        yLabel: "Monthly Payment",
        series: {
          principal: "Principal & Interest",
          tax: "Property Tax",
          insurance: "Insurance",
          pmi: "PMI",
          hoa: "HOA",
          maintenance: "Maintenance",
        },
      },
      detailedTable: {
        amortization: {
          button: "View Amortization Schedule",
          title: "Amortization Schedule",
          columns: {
            year: "Year",
            payment: "Annual Payment",
            principal: "Principal",
            interest: "Interest",
            balance: "Remaining Balance",
          },
        },
      },
      educationSections: [
        {
          id: "whatIs",
          type: "prose",
          title: "What Is a Home Affordability Calculator?",
          content: "A home affordability calculator helps you determine the maximum home price you can realistically purchase based on your income, existing debts, and down payment. Unlike a mortgage calculator — which starts with a home price — an affordability calculator works in reverse: it starts with your finances and tells you what price range makes sense. Lenders use specific formulas called debt-to-income ratios (DTI) to decide how much they'll lend you, and this calculator applies those same standards to give you an honest, lender-grade estimate.",
        },
        {
          id: "howItWorks",
          type: "prose",
          title: "How Affordability Is Calculated",
          content: "The calculation uses two key ratios. The front-end DTI compares your monthly housing costs to your gross monthly income — most lenders want this below 28% for conventional loans. The back-end DTI includes all monthly debts (housing + car + student loans + credit cards) and should typically stay below 36–43% depending on your loan type. Your maximum home price is whatever keeps both ratios within acceptable limits, given your down payment and the current interest rate.",
        },
        {
          id: "loanTypes",
          type: "list",
          title: "Loan Types and Their Requirements",
          itemCount: 4,
          items: [
            "Conventional loans follow the 28/36 rule — 28% front-end, 36% back-end. Require good credit (typically 620+) and benefit most from 20% down to avoid PMI.",
            "FHA loans allow 31% front-end and 43% back-end DTI, making them more accessible for buyers with lower credit or smaller down payments (as low as 3.5%). Require mortgage insurance premiums (MIP).",
            "VA loans are for eligible veterans and active military. No minimum down payment, no PMI, and allow up to 41% back-end DTI. One of the best mortgage products available.",
            "Custom DTI lets you explore different scenarios — useful if you have compensating factors like large cash reserves or excellent credit that may allow lenders to approve higher DTIs.",
          ],
        },
        {
          id: "geoRates",
          type: "list",
          title: "Why Rates Differ by Country",
          itemCount: 5,
          items: [
            "Mortgage rates are tied to each country's central bank policy rate. The US Federal Reserve, European Central Bank, and Bank of England all set different rates.",
            "Property tax rates vary enormously — from 0.1% in Mexico to over 1.4% in parts of the US and Japan. This calculator pre-fills your country's typical rate.",
            "Down payment minimums also vary: 3% for FHA in the US, 5% in Canada, 20% in most of Latin America and Europe.",
            "Closing costs — notary fees, transfer taxes, registration — can range from 2% in the UK to 10%+ in France and Spain. These are separate from the down payment.",
            "This calculator auto-detects your country and pre-fills the appropriate mortgage rate, property tax, and closing cost defaults — saving you from researching local market data yourself.",
          ],
        },
        {
          id: "examples",
          type: "code-example",
          title: "Affordability Examples by Income",
          examples: [
            {
              label: "Income: $60,000/year — FHA Loan",
              code: "Annual Income:     $60,000\nMonthly Income:    $5,000\nMonthly Debts:     $350 (car + student loan)\nDown Payment:      $15,000\nInterest Rate:     6.8% (30yr)\n\nFHA Limits (31/43):\nMax Housing (31%): $1,550/month\nMax All Debts(43%): $2,150 — used $350 → $1,800 available\n\nHome Price (by payment): ~$195,000\nLoan Amount:             $180,000\nMonthly P&I:             $1,180\nTax + Insurance:         $305\nMIP:                     $75\nTotal Payment:           $1,560 ✅ Under 31%",
            },
            {
              label: "Income: $120,000/year — Conventional",
              code: "Annual Income:     $120,000\nMonthly Income:    $10,000\nMonthly Debts:     $800\nDown Payment:      $80,000\nInterest Rate:     6.8% (30yr)\n\nConventional (28/36):\nMax Housing (28%): $2,800/month\nMax All Debts(36%): $3,600 — used $800 → $2,800 available\n\nHome Price:              ~$400,000\nLoan Amount:             $320,000\nMonthly P&I:             $2,096\nTax + Insurance:         $617\nTotal Payment:           $2,713 ✅ Under 28%\nNo PMI (20% down) ✅",
            },
          ],
        },
      ],

      faqs: [
        {
          question: "How much house can I afford on a $70,000 salary?",
          answer: "With a $70,000 salary, no other debts, and a 3% down payment, you can typically afford a home in the $220,000–$260,000 range using an FHA loan at current rates. With a conventional loan and 20% down, the range shifts to $200,000–$240,000. Your actual limit depends on local interest rates, property taxes, and any existing debts. Use the calculator above with your specific numbers for an accurate estimate.",
        },
        {
          question: "What is the 28/36 rule?",
          answer: "The 28/36 rule is the standard guideline lenders use for conventional loans. It states that your monthly housing costs (mortgage + taxes + insurance) should not exceed 28% of your gross monthly income, and your total monthly debts (housing + car + student loans + credit cards) should not exceed 36%. Staying within these limits gives you the best chance of loan approval and financial stability.",
        },
        {
          question: "How does a higher down payment help?",
          answer: "A larger down payment helps in three ways: it reduces your loan amount (lowering monthly payments), it eliminates PMI if you reach 20% of the home value, and it typically earns you a lower interest rate. Every additional $10,000 in down payment reduces your monthly payment by about $65–$75 and can increase your maximum home price by $15,000–$20,000.",
        },
        {
          question: "Should I use FHA or conventional loan?",
          answer: "FHA loans are better if you have a lower credit score (580+), smaller down payment (3.5%), or higher debt-to-income ratio. Conventional loans are better if you have a good credit score (700+), at least 5–20% down, and manageable debts. FHA loans require mortgage insurance premiums for the life of the loan, while PMI on conventional loans is removed once you reach 20% equity.",
        },
        {
          question: "Why does my country's mortgage rate appear automatically?",
          answer: "Kalcufy uses geo-detection to identify your country and pre-fills the average mortgage rate, property tax rate, and insurance defaults for your market. A Mexican buyer sees Mexican bank rates (around 10.5%), a German buyer sees Euribor-based rates (around 3.7%), and a US buyer sees the 30-year fixed average. You can always override these with your actual quoted rate.",
        },
        {
          question: "What expenses are NOT included in this calculation?",
          answer: "This calculator does not include closing costs (2–10% of home price depending on country), moving expenses, immediate repairs or renovations, utility setup costs, or emergency fund requirements. Financial advisors recommend keeping 3–6 months of expenses in savings even after your purchase, so make sure your down payment isn't your entire savings.",
        },
      ],

      references: [
        {
          title: "Consumer Financial Protection Bureau — Buying a Home",
          url: "https://www.consumerfinance.gov/owning-a-home/",
          description: "Official US government guide to the mortgage process, DTI requirements, and loan types.",
        },
        {
          title: "Fannie Mae — HomeReady Mortgage Guidelines",
          url: "https://www.fanniemae.com/research-and-insights/home-buyer-resources",
          description: "Official guidelines for conventional loan affordability standards used by lenders nationwide.",
        },
      ],
    },
  },

  inputs: [
    {
      id: "annualIncome",
      type: "number",
      defaultValue: null,
      placeholder: "75000",
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
      suffix: "/year",
    },
    {
      id: "monthlyDebts",
      type: "number",
      defaultValue: null,
      placeholder: "400",
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
      suffix: "/month",
    },
    {
      id: "downPayment",
      type: "number",
      defaultValue: null,
      placeholder: "60000",
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
    },
    {
      id: "loanType",
      type: "select",
      defaultValue: "conventional",
      options: [
        { value: "conventional", label: "Conventional" },
        { value: "fha", label: "FHA" },
        { value: "va", label: "VA" },
        { value: "custom", label: "Custom" },
      ],
    },
    {
      id: "customDTI",
      type: "slider",
      defaultValue: 36,
      min: 10,
      max: 50,
      step: 1,
      suffix: "%",
      showWhen: { field: "loanType", value: "custom" },
    },
    {
      id: "loanTerm",
      type: "select",
      defaultValue: "30",
      options: [
        { value: "30", label: "30 Years" },
        { value: "20", label: "20 Years" },
        { value: "15", label: "15 Years" },
      ],
    },
    {
      id: "interestRate",
      type: "number",
      defaultValue: null,
      placeholder: "6.8",
      suffix: "%",
      step: 0.1,
      min: 0.1,
      max: 30,
    },
    {
      id: "propertyTaxRate",
      type: "number",
      defaultValue: null,
      placeholder: "1.1",
      suffix: "%/yr",
      step: 0.1,
      min: 0,
      max: 10,
    },
    {
      id: "homeInsuranceRate",
      type: "number",
      defaultValue: null,
      placeholder: "0.5",
      suffix: "%/yr",
      step: 0.05,
      min: 0,
      max: 5,
    },
    {
      id: "hoaFee",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
      suffix: "/month",
    },
    {
      id: "includeMaintenance",
      type: "toggle",
      defaultValue: true,
    },
  ],

  inputGroups: [],

  results: [
    { id: "recommendedPrice", type: "primary", format: "number" },
    { id: "conservativePrice", type: "secondary", format: "number" },
    { id: "aggressivePrice", type: "secondary", format: "number" },
    { id: "monthlyPayment", type: "secondary", format: "number" },
    { id: "maxLoanAmount", type: "secondary", format: "number" },
    { id: "downPaymentPct", type: "secondary", format: "text" },
    { id: "frontEndDTI", type: "secondary", format: "text" },
    { id: "backEndDTI", type: "secondary", format: "text" },
    { id: "pmiRequired", type: "secondary", format: "text" },
  ],

  infoCards: [
    {
      id: "scenarios",
      type: "list",
    },
    {
      id: "monthlyBreakdown",
      type: "list",
    },
    {
      id: "tips",
      type: "list",
      layout: "horizontal",
    },
  ],

  chart: {
    id: "paymentBreakdown",
    type: "bar",
    xKey: "scenario",
    stacked: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "principal", color: "#3b82f6" },
      { key: "tax", color: "#8b5cf6" },
      { key: "insurance", color: "#06b6d4" },
      { key: "pmi", color: "#f97316" },
      { key: "hoa", color: "#10b981" },
      { key: "maintenance", color: "#6b7280" },
    ],
  },

  detailedTable: {
    id: "amortization",
    buttonLabel: "View Amortization Schedule",
    buttonIcon: "📅",
    modalTitle: "Amortization Schedule",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "payment", label: "Annual Payment", align: "right" },
      { id: "principal", label: "Principal", align: "right", highlight: true },
      { id: "interest", label: "Interest", align: "right" },
      { id: "balance", label: "Remaining Balance", align: "right" },
    ],
  },

  references: [],
  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 22000 },
  },
};

// ─── Calculate Function ───────────────────────────────────────────────────────

export function calculateHomeAffordability(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
  country?: string;
}): CalculatorResults {
  const { values, fieldUnits, t, country = "US" } = data;

  // Geo-intelligence: get local financial defaults
  const geo = getGeoDefaults(country);
  const sym = geo.currencySymbol;

  const v = (t?.values as Record<string, string>) || {};

  // ─── Read inputs ───────────────────────────────────────────────
  const annualIncome = (values.annualIncome as number | null);
  const monthlyDebts = (values.monthlyDebts as number | null) ?? 0;
  const downPayment = (values.downPayment as number | null) ?? 0;
  const loanType = (values.loanType as string) || "conventional";
  const customDTI = (values.customDTI as number) || 36;
  const loanTermYears = parseInt((values.loanTerm as string) || "30", 10);

  // Use geo-smart defaults if user hasn't entered values
  const interestRate = (values.interestRate as number | null) ?? geo.mortgageRate30y;
  const propertyTaxRate = (values.propertyTaxRate as number | null) ?? geo.propertyTaxRate;
  const homeInsuranceRate = (values.homeInsuranceRate as number | null) ?? geo.homeInsuranceRate;
  const hoaFee = (values.hoaFee as number) || 0;
  const includeMaintenance = (values.includeMaintenance as boolean) ?? true;

  // ─── Validate ─────────────────────────────────────────────────
  if (!annualIncome || annualIncome <= 0) {
    return {
      values: {},
      formatted: {
        recommendedPrice: "—",
        conservativePrice: "—",
        aggressivePrice: "—",
        monthlyPayment: "—",
        maxLoanAmount: "—",
        frontEndDTI: "—",
        backEndDTI: "—",
        downPaymentPct: "—",
        pmiRequired: "—",
      },
      summary: "Enter your annual income to calculate home affordability",
      isValid: false,
    };
  }

  // ─── DTI limits by loan type ──────────────────────────────────
  const dtiLimits: Record<string, { frontEnd: number; backEnd: number }> = {
    conventional: { frontEnd: 0.28, backEnd: 0.36 },
    fha:          { frontEnd: 0.31, backEnd: 0.43 },
    va:           { frontEnd: 1.00, backEnd: 0.41 }, // VA: only back-end
    custom:       { frontEnd: 1.00, backEnd: customDTI / 100 },
  };
  const limits = dtiLimits[loanType] || dtiLimits.conventional;

  const monthlyIncome = annualIncome / 12;
  const monthlyRate = interestRate / 100 / 12;
  const nPayments = loanTermYears * 12;

  // ─── Helper: monthly payment for a loan amount ────────────────
  function monthlyPI(loanAmt: number): number {
    if (monthlyRate === 0) return loanAmt / nPayments;
    return loanAmt * (monthlyRate * Math.pow(1 + monthlyRate, nPayments)) /
           (Math.pow(1 + monthlyRate, nPayments) - 1);
  }

  // ─── Helper: find max home price via binary search ────────────
  function findMaxPrice(frontEndLimit: number, backEndLimit: number): number {
    let low = 0;
    let high = annualIncome * 20; // generous ceiling
    for (let i = 0; i < 50; i++) {
      const mid = (low + high) / 2;
      const loanAmt = Math.max(0, mid - downPayment);
      const pi = monthlyPI(loanAmt);
      const tax = (mid * propertyTaxRate / 100) / 12;
      const insurance = (mid * homeInsuranceRate / 100) / 12;
      const pmi = (downPayment / mid < 0.20 && loanType !== "va") ? loanAmt * 0.005 / 12 : 0;
      const maintenance = includeMaintenance ? (mid * geo.maintenanceRate / 100) / 12 : 0;
      const totalHousing = pi + tax + insurance + pmi + hoaFee + maintenance;
      const totalDebts = totalHousing + monthlyDebts;
      const frontEndRatio = totalHousing / monthlyIncome;
      const backEndRatio = totalDebts / monthlyIncome;
      if (frontEndRatio <= frontEndLimit && backEndRatio <= backEndLimit) {
        low = mid;
      } else {
        high = mid;
      }
    }
    return Math.floor(low / 1000) * 1000; // round to nearest 1000
  }

  // ─── 3 Scenarios ─────────────────────────────────────────────
  const conservativePrice = findMaxPrice(0.25, 0.33);
  const moderatePrice     = findMaxPrice(limits.frontEnd, limits.backEnd);
  const aggressivePrice   = findMaxPrice(
    Math.min(limits.frontEnd + 0.05, 0.35),
    Math.min(limits.backEnd + 0.07, 0.50)
  );
  const recommendedPrice = moderatePrice;

  // ─── Detailed breakdown for recommended ──────────────────────
  const loanAmount = Math.max(0, recommendedPrice - downPayment);
  const pi = monthlyPI(loanAmount);
  const tax = (recommendedPrice * propertyTaxRate / 100) / 12;
  const insurance = (recommendedPrice * homeInsuranceRate / 100) / 12;
  const pmiRequired = downPayment / recommendedPrice < 0.20 && loanType !== "va" && recommendedPrice > 0;
  const pmi = pmiRequired ? loanAmount * 0.005 / 12 : 0;
  const maintenance = includeMaintenance ? (recommendedPrice * geo.maintenanceRate / 100) / 12 : 0;
  const totalMonthly = pi + tax + insurance + pmi + hoaFee + maintenance;
  const frontEndDTI = totalMonthly / monthlyIncome * 100;
  const backEndDTI = (totalMonthly + monthlyDebts) / monthlyIncome * 100;
  const downPaymentPct = recommendedPrice > 0 ? (downPayment / recommendedPrice) * 100 : 0;

  // ─── Format currency ─────────────────────────────────────────
  function fmt(n: number): string {
    return geo.formatCurrency(n);
  }
  function fmtMo(n: number): string {
    return `${geo.formatCurrency(n)}${v.perMonth || "/mo"}`;
  }

  // ─── Chart data (3 scenarios stacked bars) ───────────────────
  function buildScenarioBar(label: string, price: number) {
    const la = Math.max(0, price - downPayment);
    const _pi = monthlyPI(la);
    const _tax = (price * propertyTaxRate / 100) / 12;
    const _ins = (price * homeInsuranceRate / 100) / 12;
    const _pmi = (downPayment / price < 0.20 && loanType !== "va" && price > 0) ? la * 0.005 / 12 : 0;
    const _maint = includeMaintenance ? (price * geo.maintenanceRate / 100) / 12 : 0;
    return {
      scenario: label,
      principal: Math.round(_pi),
      tax: Math.round(_tax),
      insurance: Math.round(_ins),
      pmi: Math.round(_pmi),
      hoa: Math.round(hoaFee),
      maintenance: Math.round(_maint),
    };
  }

  const chartData = [
    buildScenarioBar("Conservative", conservativePrice),
    buildScenarioBar("Moderate", moderatePrice),
    buildScenarioBar("Aggressive", aggressivePrice),
  ];

  // ─── Amortization table (yearly, up to 30 rows) ───────────────
  const tableData: Array<Record<string, unknown>> = [];
  let balance = loanAmount;
  const annualPayment = pi * 12;
  for (let yr = 1; yr <= loanTermYears && balance > 1; yr++) {
    let yearInterest = 0;
    let yearPrincipal = 0;
    for (let m = 0; m < 12; m++) {
      if (balance <= 0) break;
      const intPmt = balance * monthlyRate;
      const prinPmt = Math.min(pi - intPmt, balance);
      yearInterest += intPmt;
      yearPrincipal += prinPmt;
      balance -= prinPmt;
    }
    tableData.push({
      year: yr,
      payment: fmt(annualPayment),
      principal: fmt(yearPrincipal),
      interest: fmt(yearInterest),
      balance: fmt(Math.max(0, balance)),
    });
  }

  return {
    values: {
      recommendedPrice,
      conservativePrice,
      aggressivePrice,
      monthlyPayment: totalMonthly,
      maxLoanAmount: loanAmount,
      frontEndDTI,
      backEndDTI,
      downPaymentPct,
      pmiRequired: pmiRequired ? 1 : 0,
    },
    formatted: {
      recommendedPrice: fmt(recommendedPrice),
      conservativePrice: fmt(conservativePrice),
      aggressivePrice: fmt(aggressivePrice),
      monthlyPayment: fmtMo(totalMonthly),
      maxLoanAmount: fmt(loanAmount),
      frontEndDTI: `${frontEndDTI.toFixed(1)}%`,
      backEndDTI: `${backEndDTI.toFixed(1)}%`,
      downPaymentPct: `${downPaymentPct.toFixed(1)}%`,
      pmiRequired: pmiRequired ? `Yes — ~${fmtMo(pmi)}` : "No",
    },
    summary: `You can afford up to ${fmt(recommendedPrice)} with a ${fmtMo(totalMonthly)} payment`,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default homeAffordabilityConfig;
