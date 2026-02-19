// ============================================================================
// KALCUFY V4 — Investment Calculator
// ============================================================================
// Keywords EN: investment calculator, investment return calculator, investment growth
// Keywords ES: calculadora de inversiones, calculadora de inversión, rendimiento inversión
// ============================================================================

import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─── HELPER ──────────────────────────────────────────────────────────────────
function fmtNum(n: number, decimals = 0): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ─── CONFIG ──────────────────────────────────────────────────────────────────

export const investmentCalculatorConfig: CalculatorConfigV4 = {
  id: "investment-calculator",
  version: "4.3",
  category: "finance",

  inputGroups: [],
  referenceData: [],

  inputs: [
    // ── BASIC INPUTS ──────────────────────────────────────────────────────
    {
      id: "initialInvestment",
      type: "number",
      defaultValue: null,
      placeholder: "10000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
    },
    {
      id: "monthlyContribution",
      type: "number",
      defaultValue: null,
      placeholder: "500",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
    },
    {
      id: "contributionFrequency",
      type: "select",
      defaultValue: "monthly",
      options: [
        { value: "weekly" },
        { value: "biweekly" },
        { value: "monthly" },
        { value: "quarterly" },
        { value: "annually" },
      ],
    },
    {
      id: "annualReturn",
      type: "number",
      defaultValue: 7,
      min: 0,
      max: 50,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "investmentPeriod",
      type: "stepper",
      defaultValue: 10,
      min: 1,
      max: 50,
      suffix: "years",
    },
    {
      id: "compoundingFrequency",
      type: "select",
      defaultValue: "monthly",
      options: [
        { value: "daily" },
        { value: "monthly" },
        { value: "quarterly" },
        { value: "semiannually" },
        { value: "annually" },
      ],
    },

    // ── PRO TOGGLES ───────────────────────────────────────────────────────
    {
      id: "adjustInflation",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "inflationRate",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 30,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "adjustInflation", value: true },
    },

    {
      id: "includeTaxes",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "taxRate",
      type: "number",
      defaultValue: 25,
      min: 0,
      max: 60,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeTaxes", value: true },
    },

    {
      id: "includeManagementFees",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "annualFee",
      type: "number",
      defaultValue: 0.5,
      min: 0,
      max: 5,
      step: 0.01,
      suffix: "%",
      showWhen: { field: "includeManagementFees", value: true },
    },

    {
      id: "contributeAtBeginning",
      type: "toggle",
      defaultValue: false,
    },

    {
      id: "annualContributionIncrease",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "increaseRate",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 20,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "annualContributionIncrease", value: true },
    },
  ],

  results: [
    { id: "futureValue", style: "primary" },
    { id: "totalContributions" },
    { id: "totalInterest" },
    { id: "effectiveReturn" },
    { id: "realPurchasingPower", showWhen: { field: "adjustInflation", value: true } },
    { id: "taxesPaid", showWhen: { field: "includeTaxes", value: true } },
    { id: "totalFees", showWhen: { field: "includeManagementFees", value: true } },
  ],

  presets: [
    {
      id: "conservative",
      icon: "🛡️",
      values: {
        initialInvestment: 5000,
        monthlyContribution: 200,
        contributionFrequency: "monthly",
        annualReturn: 5,
        investmentPeriod: 10,
        compoundingFrequency: "monthly",
        adjustInflation: false,
        includeTaxes: false,
        includeManagementFees: false,
        contributeAtBeginning: false,
        annualContributionIncrease: false,
      },
    },
    {
      id: "moderate",
      icon: "📊",
      values: {
        initialInvestment: 10000,
        monthlyContribution: 500,
        contributionFrequency: "monthly",
        annualReturn: 7,
        investmentPeriod: 20,
        compoundingFrequency: "monthly",
        adjustInflation: false,
        includeTaxes: false,
        includeManagementFees: false,
        contributeAtBeginning: false,
        annualContributionIncrease: false,
      },
    },
    {
      id: "aggressive",
      icon: "🚀",
      values: {
        initialInvestment: 25000,
        monthlyContribution: 1000,
        contributionFrequency: "monthly",
        annualReturn: 10,
        investmentPeriod: 30,
        compoundingFrequency: "monthly",
        adjustInflation: false,
        includeTaxes: false,
        includeManagementFees: false,
        contributeAtBeginning: false,
        annualContributionIncrease: false,
      },
    },
    {
      id: "proRealistic",
      icon: "🎯",
      values: {
        initialInvestment: 15000,
        monthlyContribution: 750,
        contributionFrequency: "monthly",
        annualReturn: 8,
        investmentPeriod: 25,
        compoundingFrequency: "monthly",
        adjustInflation: true,
        inflationRate: 3,
        includeTaxes: true,
        taxRate: 25,
        includeManagementFees: true,
        annualFee: 0.5,
        contributeAtBeginning: false,
        annualContributionIncrease: true,
        increaseRate: 3,
      },
    },
  ],

  chart: {
    id: "investmentGrowth",
    type: "composed",
    xKey: "year",
    series: [
      { key: "balance", type: "area", color: "#3b82f6" },
      { key: "contributions", type: "area", color: "#94a3b8" },
      { key: "realValue", type: "line", color: "#10b981", dashed: true },
    ],
  },

  detailedTable: {
    id: "yearlyBreakdown",
    buttonLabel: "View Yearly Breakdown",
    buttonIcon: "📊",
    modalTitle: "Investment Growth Schedule",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "contribution", label: "Contribution", align: "right" },
      { id: "interest", label: "Interest", align: "right" },
      { id: "fees", label: "Fees", align: "right" },
      { id: "balance", label: "Balance", align: "right", highlight: true },
      { id: "realValue", label: "Real Value", align: "right" },
    ],
  },

  infoCards: [
    {
      id: "investmentSummary",
      type: "list",
      items: [
        { valueKey: "futureValue" },
        { valueKey: "totalContributions" },
        { valueKey: "totalInterest" },
        { valueKey: "effectiveReturn" },
      ],
    },
    {
      id: "proInsights",
      type: "list",
      items: [
        { valueKey: "realPurchasingPower" },
        { valueKey: "taxesPaid" },
        { valueKey: "totalFees" },
        { valueKey: "doublingTime" },
      ],
    },
    {
      id: "investmentTips",
      type: "horizontal",
    },
  ],

  educationSections: [
    { id: "whatIs", type: "prose" },
    { id: "howItWorks", type: "prose" },
    { id: "investmentTypes", type: "list" },
    { id: "keyStrategies", type: "list" },
    {
      id: "examples",
      type: "code-example",
    },
  ],

  references: [
    {
      id: "sec",
      url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
    },
    {
      id: "investopedia",
      url: "https://www.investopedia.com/terms/c/compoundinterest.asp",
    },
  ],

  // ── TRANSLATIONS ────────────────────────────────────────────────────────
  t: {
    en: {
      name: "Investment Calculator",
      slug: "investment-calculator",
      subtitle:
        "See how your money grows with compound interest. Toggle inflation, taxes, and fees for a realistic projection.",
      breadcrumb: "Investment",

      seo: {
        title: "Investment Calculator - Free Growth & Return Estimator",
        description:
          "Estimate your investment growth with compound interest. Adjust for inflation, taxes, and fees to see realistic returns. Free online tool with interactive charts.",
        shortDescription: "Calculate investment growth with compound interest and contributions.",
        keywords: [
          "investment calculator",
          "investment return calculator",
          "compound growth calculator",
          "investment growth estimator",
          "how much will my investment grow",
          "free investment calculator",
          "online investment tool",
          "investment calculator with inflation",
        ],
      },

      calculator: { yourInformation: "Your Investment" },
      ui: {
        yourInformation: "Your Investment",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        initialInvestment: {
          label: "Initial Investment",
          helpText: "The amount you're starting with",
        },
        monthlyContribution: {
          label: "Regular Contribution",
          helpText: "Amount you'll add each period",
        },
        contributionFrequency: {
          label: "Contribution Frequency",
          helpText: "How often you contribute",
          options: {
            weekly: "Weekly",
            biweekly: "Every 2 Weeks",
            monthly: "Monthly",
            quarterly: "Quarterly",
            annually: "Annually",
          },
        },
        annualReturn: {
          label: "Expected Annual Return",
          helpText: "S&P 500 historical average: ~10%",
        },
        investmentPeriod: {
          label: "Investment Period",
          helpText: "How long you plan to invest",
        },
        compoundingFrequency: {
          label: "Compounding Frequency",
          helpText: "How often interest is compounded",
          options: {
            daily: "Daily",
            monthly: "Monthly",
            quarterly: "Quarterly",
            semiannually: "Semi-annually",
            annually: "Annually",
          },
        },
        // PRO TOGGLES
        adjustInflation: {
          label: "Adjust for Inflation",
          helpText: "See your real purchasing power",
        },
        inflationRate: {
          label: "Inflation Rate",
          helpText: "Long-term average: ~3%",
        },
        includeTaxes: {
          label: "Include Capital Gains Tax",
          helpText: "Deduct taxes from investment returns",
        },
        taxRate: {
          label: "Tax Rate",
          helpText: "Your capital gains tax rate",
        },
        includeManagementFees: {
          label: "Include Management Fees",
          helpText: "Annual fund/advisor fees",
        },
        annualFee: {
          label: "Annual Fee",
          helpText: "Index funds: ~0.03-0.2%, Active: ~0.5-1.5%",
        },
        contributeAtBeginning: {
          label: "Contribute at Beginning of Period",
          helpText: "Contribute at the start instead of end",
        },
        annualContributionIncrease: {
          label: "Increase Contributions Annually",
          helpText: "Grow your contributions each year",
        },
        increaseRate: {
          label: "Annual Increase Rate",
          helpText: "How much to increase contributions yearly",
        },
      },

      results: {
        futureValue: { label: "Future Balance" },
        totalContributions: { label: "Total Contributed" },
        totalInterest: { label: "Total Interest Earned" },
        effectiveReturn: { label: "Total Return" },
        realPurchasingPower: { label: "Real Purchasing Power" },
        taxesPaid: { label: "Estimated Taxes" },
        totalFees: { label: "Total Fees Paid" },
        doublingTime: { label: "Time to Double" },
      },

      presets: {
        conservative: {
          label: "Conservative",
          description: "$5K start, $200/mo, 5% return, 10 years",
        },
        moderate: {
          label: "Moderate",
          description: "$10K start, $500/mo, 7% return, 20 years",
        },
        aggressive: {
          label: "Aggressive",
          description: "$25K start, $1K/mo, 10% return, 30 years",
        },
        proRealistic: {
          label: "Pro Realistic",
          description: "$15K start, $750/mo, 8% return with inflation, taxes & fees",
        },
      },

      values: {
        years: "years",
        year: "year",
        months: "months",
        month: "month",
      },

      formats: {
        summary:
          "Your investment could grow to {futureValue} over {years} years. You'd contribute {totalContributions} and earn {totalInterest} in interest.",
      },

      infoCards: {
        investmentSummary: {
          title: "Investment Summary",
          items: [
            { label: "Future Balance", valueKey: "futureValue" },
            { label: "Total Contributed", valueKey: "totalContributions" },
            { label: "Interest Earned", valueKey: "totalInterest" },
            { label: "Total Return", valueKey: "effectiveReturn" },
          ],
        },
        proInsights: {
          title: "Pro Insights",
          items: [
            { label: "Real Purchasing Power", valueKey: "realPurchasingPower" },
            { label: "Estimated Taxes", valueKey: "taxesPaid" },
            { label: "Total Fees", valueKey: "totalFees" },
            { label: "Time to Double", valueKey: "doublingTime" },
          ],
        },
        investmentTips: {
          title: "Investment Tips",
          items: [
            "Start as early as possible — time is your greatest asset with compound interest",
            "Increase contributions annually to keep pace with inflation and salary growth",
            "Low-cost index funds (0.03-0.1% fees) outperform most actively managed funds long-term",
            "Enable all PRO toggles for the most realistic projection of your investment growth",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is an Investment Calculator?",
          content:
            "An investment calculator helps you estimate how your money will grow over time through the power of compound interest. Unlike simple interest, where you only earn returns on your initial investment, compound interest means you earn returns on your returns — creating an exponential growth curve that rewards patience and consistency. This calculator goes beyond basic projections by letting you toggle real-world factors like inflation, taxes, and management fees to see a truly realistic picture of your investment's future value.",
        },
        howItWorks: {
          title: "How Compound Interest Works",
          content:
            "The core formula is A = P(1 + r/n)^(nt), where P is your principal, r is the annual interest rate, n is the compounding frequency, and t is time in years. Regular contributions add another layer: each deposit starts its own compounding journey. The earlier you invest, the more compounding cycles your money experiences. For example, $10,000 invested at 7% for 30 years grows to about $76,123 — but add $500/month and it becomes $604,950. That's the combined power of consistency and compounding.",
        },
        investmentTypes: {
          title: "Common Investment Types",
          items: [
            {
              text: "S&P 500 Index Funds: Historical average ~10% annual return. Low fees (0.03-0.1%). Best for long-term passive investors.",
              type: "info",
            },
            {
              text: "Bonds: 3-5% average return. Lower risk, lower reward. Good for conservative investors or near-retirement portfolios.",
              type: "info",
            },
            {
              text: "High-Yield Savings: 3-5% APY. FDIC insured, zero risk. Best for emergency funds and short-term goals.",
              type: "info",
            },
            {
              text: "Real Estate: Historical 5-8% return. Requires larger initial investment but offers rental income and appreciation.",
              type: "info",
            },
            {
              text: "Past performance doesn't guarantee future results. Always diversify your portfolio across asset classes.",
              type: "warning",
            },
          ],
        },
        keyStrategies: {
          title: "Key Investment Strategies",
          items: [
            {
              text: "Dollar-Cost Averaging: Invest a fixed amount regularly regardless of market conditions. Reduces timing risk and emotional decisions.",
              type: "info",
            },
            {
              text: "Rule of 72: Divide 72 by your annual return rate to estimate how many years it takes to double your money. At 7%, your money doubles in ~10.3 years.",
              type: "info",
            },
            {
              text: "Expense Ratio Impact: A 1% difference in fees can cost you hundreds of thousands over 30 years. Choose low-cost index funds when possible.",
              type: "warning",
            },
            {
              text: "Tax-Advantaged Accounts: Max out 401(k) and IRA contributions before taxable accounts. Tax-deferred growth significantly increases returns.",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step examples of investment growth",
          examples: [
            {
              title: "Basic Growth: $10,000 at 7% for 20 years",
              steps: [
                "P = $10,000, r = 0.07, n = 12, t = 20",
                "A = 10000 × (1 + 0.07/12)^(12×20)",
                "A = 10000 × (1.005833)^240",
                "A = 10000 × 4.0387",
              ],
              result: "A = $40,387.39 — Your money quadrupled!",
            },
            {
              title: "With $500/mo contributions at 7% for 20 years",
              steps: [
                "Initial: $10,000 → $40,387",
                "Monthly $500 FV: 500 × [(1.005833^240 - 1) / 0.005833]",
                "Monthly contributions grow to: $260,464",
                "Total: $40,387 + $260,464 = $300,851",
              ],
              result:
                "You invested $130,000 total but it grew to $300,851 — $170,851 in pure interest!",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is a good rate of return for investments?",
          answer:
            "The S&P 500 has historically returned about 10% annually before inflation (~7% after inflation). However, returns vary by year — some years may see 20%+ gains while others see significant losses. For conservative projections, use 6-7%. For aggressive estimates based on stock market averages, use 8-10%. Always account for inflation to see real returns.",
        },
        {
          question: "How does compounding frequency affect my returns?",
          answer:
            "More frequent compounding produces slightly higher returns. For example, $10,000 at 7% for 10 years: annually compounded = $19,672, monthly = $20,097, daily = $20,138. The difference between monthly and daily is minimal, but the jump from annual to monthly is significant. Most investments compound daily or monthly.",
        },
        {
          question: "Should I invest a lump sum or make regular contributions?",
          answer:
            "Statistically, lump-sum investing outperforms dollar-cost averaging about 2/3 of the time because markets tend to rise over time. However, most people don't have a lump sum available and regular contributions from paychecks is the more practical approach. Dollar-cost averaging also reduces the emotional risk of investing everything at a market peak.",
        },
        {
          question: "How do management fees impact long-term returns?",
          answer:
            "Fees have a dramatic compounding effect. On a $500/month investment over 30 years at 7%: with 0.1% fees you'd have ~$580K, but with 1% fees only ~$495K — that 0.9% difference costs you $85,000! This is why low-cost index funds (0.03-0.2%) are strongly recommended over actively managed funds (0.5-1.5%).",
        },
        {
          question: "What is the Rule of 72?",
          answer:
            "The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by your annual return rate: at 6% it takes 12 years, at 8% it takes 9 years, at 10% it takes 7.2 years, at 12% it takes 6 years. It's a rough estimate but remarkably accurate for rates between 4-15%.",
        },
        {
          question: "Why should I adjust for inflation?",
          answer:
            "Inflation erodes purchasing power over time. If inflation averages 3%, something that costs $100 today will cost $243 in 30 years. A portfolio showing $1,000,000 in nominal terms may only have ~$412,000 in today's purchasing power. Toggle on inflation adjustment to see what your future balance will actually be worth in today's dollars.",
        },
        {
          question: "How accurate is this calculator?",
          answer:
            "This calculator provides estimates based on constant rates of return, which is a simplification. Real investment returns fluctuate year to year. Use this tool for general planning purposes, not precise predictions. For the most realistic projection, enable all PRO toggles (inflation, taxes, fees). Always consult a financial advisor for personalized advice.",
        },
        {
          question: "What is the difference between nominal and real returns?",
          answer:
            "Nominal return is your investment's raw growth rate before accounting for inflation. Real return is what's left after inflation is deducted. If your investment returns 8% and inflation is 3%, your real return is approximately 5%. Real returns represent the actual increase in your purchasing power — the money you can really spend.",
        },
      ],

      chart: {
        title: "Investment Growth Over Time",
        xLabel: "Year",
        yLabel: "Balance",
        series: {
          balance: "Total Balance",
          contributions: "Total Contributed",
          realValue: "Real Value (Inflation-Adjusted)",
        },
      },

      detailedTable: {
        yearlyBreakdown: {
          button: "View Yearly Breakdown",
          title: "Investment Growth Schedule",
          columns: {
            year: "Year",
            contribution: "Contribution",
            interest: "Interest",
            fees: "Fees",
            balance: "Balance",
            realValue: "Real Value",
          },
        },
      },

      rating: {
        title: "Rate this Calculator",
        share: "Share",
        copied: "Copied!",
      },
      common: {
        learnMore: "Learn More",
        close: "Close",
      },
      buttons: {
        calculate: "Calculate",
        reset: "Reset",
        pdf: "Download PDF",
        excel: "Download Excel",
      },
      share: {
        title: "Share Results",
        text: "Check out my investment projection!",
      },
      accessibility: {
        chartDescription: "Investment growth chart showing balance over time",
        resultsRegion: "Investment calculation results",
      },
      sources: {
        title: "Sources & References",
      },
    },
    es: {
      "meta": {
        "title": "Calculadora de Inversiones - Calcula Rendimientos y Crecimiento de Inversiones",
        "description": "Calcula el crecimiento de tus inversiones con nuestra calculadora gratuita. Incluye interés compuesto, contribuciones regulares y ajuste por inflación para planificación financiera precisa.",
        "keywords": "calculadora inversiones, rendimiento inversión, interés compuesto, planificación financiera, crecimiento capital"
      },
      "slug": "calculadora-inversiones",
      "form": {
        "initialInvestment": {
          "label": "Inversión Inicial",
          "placeholder": "Ingresa la inversión inicial"
        },
        "monthlyContribution": {
          "label": "Contribución Mensual",
          "placeholder": "Ingresa la contribución mensual"
        },
        "annualReturn": {
          "label": "Rendimiento Anual Esperado (%)",
          "placeholder": "Ingresa el rendimiento anual"
        },
        "investmentPeriod": {
          "label": "Período de Inversión (años)",
          "placeholder": "Ingresa los años"
        },
        "adjustInflation": {
          "label": "Ajustar por inflación"
        },
        "inflationRate": {
          "label": "Tasa de Inflación (%)",
          "placeholder": "Ingresa la tasa de inflación"
        }
      },
      "results": {
        "title": "Resultados de tu Inversión",
        "totalValue": "Valor Total",
        "totalContributions": "Total Contribuido",
        "totalGains": "Ganancias Totales",
        "realValue": "Valor Real (Ajustado por Inflación)",
        "breakdown": {
          "title": "Desglose de la Inversión",
          "initialInvestment": "Inversión Inicial",
          "monthlyContributions": "Contribuciones Mensuales",
          "investmentGains": "Ganancias por Inversión"
        }
      },
      "education": {
        "title": "Entendiendo las Inversiones",
        "whatIs": {
          "title": "¿Qué es una Calculadora de Inversiones?",
          "content": "Una calculadora de inversiones es una herramienta que te ayuda a proyectar el crecimiento potencial de tus inversiones a lo largo del tiempo, considerando factores como el interés compuesto, contribuciones regulares y la inflación."
        },
        "howWorks": {
          "title": "¿Cómo Funciona el Crecimiento de las Inversiones?",
          "content": "El crecimiento de las inversiones se basa en el interés compuesto, donde tus ganancias generan más ganancias. Las contribuciones regulares y el tiempo son factores clave para maximizar el crecimiento de tu capital."
        },
        "factors": {
          "title": "Factores Clave de las Inversiones",
          "items": [
            "Inversión inicial: El capital que inviertes al principio",
            "Contribuciones mensuales: Aportes regulares que aumentan tu inversión",
            "Rendimiento anual: El porcentaje de ganancia esperado cada año",
            "Período de inversión: El tiempo que mantienes tu inversión",
            "Inflación: La pérdida de poder adquisitivo del dinero con el tiempo"
          ]
        },
        "tips": {
          "title": "Consejos para Invertir",
          "items": [
            "Comienza temprano para aprovechar el interés compuesto",
            "Mantén contribuciones regulares y consistentes",
            "Diversifica tu portafolio para reducir riesgos",
            "Considera el impacto de la inflación en tus cálculos",
            "Revisa y ajusta tu estrategia periódicamente"
          ]
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
      "id": "calculadora-investimento",
      "slug": "calculadora-investimento",
      "title": "Calculadora de Investimento",
      "metaTitle": "Calculadora de Investimento - Calcule Retornos e Juros Compostos",
      "metaDescription": "Calcule o crescimento dos seus investimentos com nossa calculadora gratuita. Analise retornos, juros compostos e projeções financeiras para planejar seu futuro.",
      "description": "Calcule o potencial de crescimento dos seus investimentos ao longo do tempo considerando juros compostos, aportes mensais e taxas de inflação.",
      "inputs": [
        {
          "field": "initialAmount",
          "label": "Valor Inicial",
          "type": "currency",
          "defaultValue": 10000,
          "min": 0,
          "step": 100,
          "placeholder": "R$ 10.000"
        },
        {
          "field": "monthlyContribution",
          "label": "Aporte Mensal",
          "type": "currency",
          "defaultValue": 500,
          "min": 0,
          "step": 50,
          "placeholder": "R$ 500"
        },
        {
          "field": "annualReturn",
          "label": "Taxa de Retorno Anual (%)",
          "type": "percentage",
          "defaultValue": 8,
          "min": 0,
          "max": 30,
          "step": 0.1,
          "placeholder": "8%"
        },
        {
          "field": "timeHorizon",
          "label": "Período (anos)",
          "type": "number",
          "defaultValue": 20,
          "min": 1,
          "max": 50,
          "step": 1,
          "placeholder": "20"
        },
        {
          "field": "adjustInflation",
          "label": "Ajustar pela Inflação",
          "type": "toggle",
          "defaultValue": true
        },
        {
          "field": "inflationRate",
          "label": "Taxa de Inflação Anual (%)",
          "type": "percentage",
          "defaultValue": 3,
          "min": 0,
          "max": 15,
          "step": 0.1,
          "placeholder": "3%",
          "conditional": {
            "field": "adjustInflation",
            "value": true
          }
        }
      ],
      "results": [
        {
          "field": "finalAmount",
          "label": "Valor Final",
          "type": "currency",
          "emphasis": "high"
        },
        {
          "field": "totalContributed",
          "label": "Total Investido",
          "type": "currency"
        },
        {
          "field": "totalEarnings",
          "label": "Rendimentos Totais",
          "type": "currency"
        },
        {
          "field": "realReturn",
          "label": "Retorno Real (após inflação)",
          "type": "currency"
        },
        {
          "field": "totalReturnPercentage",
          "label": "Retorno Total (%)",
          "type": "percentage"
        }
      ],
      "tips": [
        "Comece a investir o quanto antes para aproveitar o poder dos juros compostos",
        "Aportes mensais regulares podem aumentar significativamente seus retornos",
        "Considere sempre o impacto da inflação nos seus investimentos",
        "Diversifique sua carteira para reduzir riscos",
        "Mantenha uma reserva de emergência antes de investir"
      ],
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
      "slug": "calculateur-investissement",
      "title": "Calculateur d'Investissement",
      "description": "Calculez la croissance de vos investissements avec les intérêts composés, l'inflation et les contributions régulières pour planifier votre avenir financier.",
      "keywords": "calculateur investissement, intérêts composés, croissance investissement, planification financière, inflation, rendement investissement",
      "result": {
        "title": "Résultats de l'Investissement",
        "summary": "Valeur finale de votre investissement",
        "details": "Analyse détaillée de la croissance"
      },
      "form": {
        "initialAmount": {
          "label": "Investissement initial",
          "placeholder": "Entrez le montant initial"
        },
        "monthlyContribution": {
          "label": "Contribution mensuelle",
          "placeholder": "Entrez la contribution mensuelle"
        },
        "annualReturn": {
          "label": "Rendement annuel (%)",
          "placeholder": "Entrez le taux de rendement"
        },
        "years": {
          "label": "Période d'investissement (années)",
          "placeholder": "Entrez le nombre d'années"
        },
        "adjustInflation": {
          "label": "Ajuster pour l'inflation",
          "value": true
        },
        "inflationRate": {
          "label": "Taux d'inflation (%)",
          "placeholder": "Entrez le taux d'inflation"
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
      "slug": "investitions-rechner",
      "title": "Investitionsrechner",
      "meta": {
        "description": "Berechnen Sie Ihre Investitionsrenditen und verfolgen Sie das Wachstum Ihres Portfolios mit unserem kostenlosen Investitionsrechner."
      },
      "heading": "Investitionsrechner",
      "description": "Planen Sie Ihre finanzielle Zukunft mit unserem umfassenden Investitionsrechner. Analysieren Sie potenzielle Renditen und treffen Sie fundierte Investitionsentscheidungen.",
      "form": {
        "initialInvestment": {
          "label": "Anfangsinvestition",
          "placeholder": "Geben Sie den Anfangsbetrag ein"
        },
        "monthlyContribution": {
          "label": "Monatlicher Beitrag",
          "placeholder": "Geben Sie den monatlichen Beitrag ein"
        },
        "annualReturn": {
          "label": "Jährliche Rendite (%)",
          "placeholder": "Geben Sie die erwartete jährliche Rendite ein"
        },
        "investmentPeriod": {
          "label": "Anlagezeitraum (Jahre)",
          "placeholder": "Geben Sie die Anzahl der Jahre ein"
        },
        "adjustInflation": {
          "label": "Für Inflation anpassen",
          "description": "Berücksichtigt die Inflationsauswirkungen auf Ihre Renditen"
        },
        "inflationRate": {
          "label": "Inflationsrate (%)",
          "placeholder": "Geben Sie die erwartete Inflationsrate ein"
        }
      },
      "results": {
        "totalValue": "Gesamtwert",
        "totalContributions": "Gesamte Beiträge",
        "totalEarnings": "Gesamte Erträge",
        "realValue": "Realer Wert (inflationsbereinigt)",
        "summary": "Nach {years} Jahren wird Ihre Investition einen Gesamtwert von {totalValue} haben, mit Erträgen von {earnings}."
      },
      "chart": {
        "title": "Investitionswachstum über die Zeit",
        "totalValue": "Gesamtwert",
        "contributions": "Beiträge",
        "earnings": "Erträge"
      },
      "tips": [
        "Beginnen Sie früh zu investieren, um die Macht des Zinseszinses zu nutzen",
        "Diversifizieren Sie Ihr Portfolio, um das Risiko zu reduzieren",
        "Regelmäßige Beiträge können langfristig zu erheblichem Wachstum führen",
        "Berücksichtigen Sie die Inflation bei der Planung langfristiger Investitionen"
      ],
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

    // ══════════════════════════════════════════════════════════════════════
    // ESPAÑOL
    // ══════════════════════════════════════════════════════════════════════

    // ══════════════════════════════════════════════════════════════════════
    // PORTUGUÊS
    // ══════════════════════════════════════════════════════════════════════

    // ══════════════════════════════════════════════════════════════════════
    // FRANÇAIS
    // ══════════════════════════════════════════════════════════════════════

    // ══════════════════════════════════════════════════════════════════════
    // DEUTSCH
    // ══════════════════════════════════════════════════════════════════════
  },
};

// ─── CALCULATE FUNCTION ──────────────────────────────────────────────────────

export function calculateInvestmentCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
  locale?: string;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── READ INPUTS ──────────────────────────────────────────────────────
  const initialInvestment = values.initialInvestment as number | null;
  const monthlyContribution = values.monthlyContribution as number | null;

  // Validate: at least one must be provided
  if (
    (initialInvestment === null || initialInvestment === undefined) &&
    (monthlyContribution === null || monthlyContribution === undefined)
  ) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const P = initialInvestment ?? 0;
  const contribAmount = monthlyContribution ?? 0;
  const contributionFrequency = (values.contributionFrequency as string) || "monthly";
  const annualReturn = (values.annualReturn as number) ?? 7;
  const investmentPeriod = (values.investmentPeriod as number) ?? 10;
  const compoundingFrequency = (values.compoundingFrequency as string) || "monthly";

  // PRO toggles
  const adjustInflation = values.adjustInflation === true;
  const inflationRate = adjustInflation ? ((values.inflationRate as number) ?? 3) : 0;
  const includeTaxes = values.includeTaxes === true;
  const taxRate = includeTaxes ? ((values.taxRate as number) ?? 25) : 0;
  const includeManagementFees = values.includeManagementFees === true;
  const annualFee = includeManagementFees ? ((values.annualFee as number) ?? 0.5) : 0;
  const contributeAtBeginning = values.contributeAtBeginning === true;
  const annualContributionIncrease = values.annualContributionIncrease === true;
  const increaseRate = annualContributionIncrease
    ? ((values.increaseRate as number) ?? 3)
    : 0;

  // ── MAPS ─────────────────────────────────────────────────────────────
  const frequencyMap: Record<string, number> = {
    weekly: 52,
    biweekly: 26,
    monthly: 12,
    quarterly: 4,
    annually: 1,
  };

  const compoundingMap: Record<string, number> = {
    daily: 365,
    monthly: 12,
    quarterly: 4,
    semiannually: 2,
    annually: 1,
  };

  const contribPeriodsPerYear = frequencyMap[contributionFrequency] || 12;
  const n = compoundingMap[compoundingFrequency] || 12;

  // Effective annual rate after fees
  const effectiveAnnualRate = (annualReturn - annualFee) / 100;
  const ratePerCompound = effectiveAnnualRate / n;

  // ── YEAR-BY-YEAR SIMULATION ──────────────────────────────────────────
  const chartData: Array<Record<string, unknown>> = [];
  const tableData: Array<Record<string, string>> = [];

  let balance = P;
  let totalContributed = P;
  let totalFeesAccum = 0;
  let currentAnnualContrib = contribAmount * contribPeriodsPerYear;

  // Currency symbol
  const curr = fieldUnits?.initialInvestment || fieldUnits?.monthlyContribution || "USD";
  const SYMBOLS: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
    JPY: "¥", INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF",
    COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP",
  };
  const sym = SYMBOLS[curr] || "$";

  // Year 0
  chartData.push({
    year: "0",
    balance: P,
    contributions: P,
    realValue: P,
  });

  for (let yr = 1; yr <= investmentPeriod; yr++) {
    // Contribution amount for this year (with annual increase)
    if (yr > 1 && annualContributionIncrease) {
      currentAnnualContrib *= 1 + increaseRate / 100;
    }
    const contribPerPeriod = currentAnnualContrib / contribPeriodsPerYear;

    // Simulate compounding periods within this year
    const compoundsPerYear = n;
    const contribPerCompound = (contribPerPeriod * contribPeriodsPerYear) / compoundsPerYear;

    const balanceStartOfYear = balance;

    for (let c = 0; c < compoundsPerYear; c++) {
      if (contributeAtBeginning) {
        balance += contribPerCompound;
      }
      balance *= 1 + ratePerCompound;
      if (!contributeAtBeginning) {
        balance += contribPerCompound;
      }
    }

    const yearContribution = currentAnnualContrib;
    totalContributed += yearContribution;

    // Fees for this year
    const yearFees = includeManagementFees ? balanceStartOfYear * (annualFee / 100) : 0;
    totalFeesAccum += yearFees;

    // Interest earned this year
    const yearInterest = balance - balanceStartOfYear - yearContribution;

    // Real value (inflation-adjusted)
    const inflationFactor = adjustInflation
      ? Math.pow(1 + inflationRate / 100, yr)
      : 1;
    const realValue = balance / inflationFactor;

    chartData.push({
      year: `${yr}`,
      balance: Math.round(balance),
      contributions: Math.round(totalContributed),
      realValue: Math.round(realValue),
    });

    tableData.push({
      year: `${yr}`,
      contribution: `${sym}${fmtNum(yearContribution)}`,
      interest: `${sym}${fmtNum(yearInterest)}`,
      fees: includeManagementFees ? `${sym}${fmtNum(yearFees)}` : "-",
      balance: `${sym}${fmtNum(balance)}`,
      realValue: adjustInflation ? `${sym}${fmtNum(realValue)}` : "-",
    });
  }

  // ── FINAL CALCULATIONS ───────────────────────────────────────────────
  const futureValue = balance;
  const totalInterest = futureValue - totalContributed;
  const effectiveReturnPct =
    totalContributed > 0
      ? ((futureValue - totalContributed) / totalContributed) * 100
      : 0;

  // Real purchasing power
  const inflationFactor = adjustInflation
    ? Math.pow(1 + inflationRate / 100, investmentPeriod)
    : 1;
  const realPurchasingPower = futureValue / inflationFactor;

  // Taxes (simplified: on total gains)
  const taxesPaid = includeTaxes ? totalInterest * (taxRate / 100) : 0;
  const afterTaxValue = futureValue - taxesPaid;

  // Doubling time (Rule of 72)
  const doublingYears =
    effectiveAnnualRate > 0 ? 72 / (effectiveAnnualRate * 100) : 0;

  // ── FORMAT ───────────────────────────────────────────────────────────
  const yearLabel =
    investmentPeriod === 1 ? v["year"] || "year" : v["years"] || "years";

  const futureValueFmt = `${sym}${fmtNum(futureValue)}`;
  const totalContribFmt = `${sym}${fmtNum(totalContributed)}`;
  const totalInterestFmt = `${sym}${fmtNum(totalInterest)}`;

  const summary =
    f.summary
      ?.replace("{futureValue}", futureValueFmt)
      .replace("{years}", `${investmentPeriod}`)
      .replace("{totalContributions}", totalContribFmt)
      .replace("{totalInterest}", totalInterestFmt) ||
    `Investment grows to ${futureValueFmt} in ${investmentPeriod} ${yearLabel}.`;

  return {
    values: {
      futureValue,
      totalContributions: totalContributed,
      totalInterest,
      effectiveReturn: effectiveReturnPct,
      realPurchasingPower,
      taxesPaid,
      totalFees: totalFeesAccum,
      doublingTime: doublingYears,
    },
    formatted: {
      futureValue: futureValueFmt,
      totalContributions: totalContribFmt,
      totalInterest: totalInterestFmt,
      effectiveReturn: `${effectiveReturnPct.toFixed(1)}%`,
      realPurchasingPower: adjustInflation
        ? `${sym}${fmtNum(realPurchasingPower)}`
        : "-",
      taxesPaid: includeTaxes ? `${sym}${fmtNum(taxesPaid)}` : "-",
      totalFees: includeManagementFees
        ? `${sym}${fmtNum(totalFeesAccum)}`
        : "-",
      doublingTime: doublingYears > 0 ? `~${doublingYears.toFixed(1)} ${yearLabel}` : "-",
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default investmentCalculatorConfig;
