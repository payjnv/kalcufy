import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════
// 📊 INTEREST CALCULATOR — Compound & Simple Interest
// ═══════════════════════════════════════════════════════════════════

export const interestCalculatorConfig: CalculatorConfigV4 = {
  id: "interest-calculator",
  version: "4.0",
  category: "finance",
  icon: "📈",

  // ─── PRESETS ────────────────────────────────────────────────────
  presets: [
    {
      id: "emergencyFund",
      icon: "🛡️",
      values: {
        initialDeposit: 5000,
        annualContribution: 0,
        monthlyContribution: 500,
        contributeAt: "end",
        interestRate: 4.5,
        compoundFrequency: "monthly",
        investmentYears: 3,
        investmentMonths: 0,
        includeTax: false,
        taxRate: 25,
        includeInflation: false,
        inflationRate: 3,
      },
    },
    {
      id: "savingsAccount",
      icon: "🏦",
      values: {
        initialDeposit: 10000,
        annualContribution: 0,
        monthlyContribution: 200,
        contributeAt: "end",
        interestRate: 5.0,
        compoundFrequency: "daily",
        investmentYears: 5,
        investmentMonths: 0,
        includeTax: false,
        taxRate: 25,
        includeInflation: false,
        inflationRate: 3,
      },
    },
    {
      id: "longTermGrowth",
      icon: "🚀",
      values: {
        initialDeposit: 25000,
        annualContribution: 6000,
        monthlyContribution: 500,
        contributeAt: "end",
        interestRate: 7.0,
        compoundFrequency: "monthly",
        investmentYears: 20,
        investmentMonths: 0,
        includeTax: false,
        taxRate: 25,
        includeInflation: true,
        inflationRate: 3,
      },
    },
    {
      id: "cdInvestment",
      icon: "💿",
      values: {
        initialDeposit: 50000,
        annualContribution: 0,
        monthlyContribution: 0,
        contributeAt: "end",
        interestRate: 4.75,
        compoundFrequency: "quarterly",
        investmentYears: 2,
        investmentMonths: 0,
        includeTax: true,
        taxRate: 22,
        includeInflation: false,
        inflationRate: 3,
      },
    },
    {
      id: "retirementBoost",
      icon: "🏖️",
      values: {
        initialDeposit: 100000,
        annualContribution: 12000,
        monthlyContribution: 1000,
        contributeAt: "beginning",
        interestRate: 8.0,
        compoundFrequency: "monthly",
        investmentYears: 30,
        investmentMonths: 0,
        includeTax: false,
        taxRate: 25,
        includeInflation: true,
        inflationRate: 3,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates rest) ───────────
  t: {
    en: {
      name: "Interest Calculator",
      slug: "interest-calculator",
      breadcrumb: "Interest Calculator",

      seo: {
        title: "Interest Calculator - Compound & Simple Interest Tool",
        description: "Calculate compound and simple interest on your savings and investments. See growth projections with charts, tax impact, and inflation adjustment. Free online tool.",
        shortDescription: "Calculate compound interest with contributions and tax impact.",
        keywords: [
          "interest calculator",
          "compound interest calculator",
          "simple interest calculator",
          "savings interest calculator",
          "investment growth calculator",
          "APY calculator",
          "free interest calculator",
          "compound interest formula",
        ],
      },

      subtitle: "Calculate how your money grows with compound interest, regular contributions, and see year-by-year projections.",

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Investment Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        initialDeposit: {
          label: "Initial Deposit",
          helpText: "The starting amount you invest or deposit today",
        },
        annualContribution: {
          label: "Annual Contribution",
          helpText: "Additional lump sum added once per year",
        },
        monthlyContribution: {
          label: "Monthly Contribution",
          helpText: "Amount added every month to your investment",
        },
        contributeAt: {
          label: "Contribute At",
          helpText: "When contributions are added during each period",
          options: {
            beginning: "Beginning of Period",
            end: "End of Period",
          },
        },
        interestRate: {
          label: "Annual Interest Rate",
          helpText: "The yearly interest rate (APR) on your investment",
        },
        compoundFrequency: {
          label: "Compound Frequency",
          helpText: "How often interest is calculated and added to your balance",
          options: {
            daily: "Daily (365/yr)",
            weekly: "Weekly (52/yr)",
            biweekly: "Bi-weekly (26/yr)",
            semimonthly: "Semi-monthly (24/yr)",
            monthly: "Monthly (12/yr)",
            quarterly: "Quarterly (4/yr)",
            semiannually: "Semi-annually (2/yr)",
            annually: "Annually (1/yr)",
            continuously: "Continuously",
          },
        },
        investmentYears: {
          label: "Years",
          helpText: "Number of years to invest",
        },
        investmentMonths: {
          label: "Months",
          helpText: "Additional months beyond full years",
        },
        includeTax: {
          label: "Include Tax on Interest",
          helpText: "Calculate the impact of taxes on your interest earnings",
        },
        taxRate: {
          label: "Tax Rate",
          helpText: "Your marginal tax rate applied to interest income",
        },
        includeInflation: {
          label: "Adjust for Inflation",
          helpText: "Show the real purchasing power of your future balance",
        },
        inflationRate: {
          label: "Inflation Rate",
          helpText: "Expected average annual inflation rate",
        },
      },

      results: {
        endingBalance: { label: "Ending Balance" },
        totalInterest: { label: "Total Interest Earned" },
        totalContributions: { label: "Total Contributions" },
        totalDeposited: { label: "Total Deposited" },
        interestFromInitial: { label: "Interest on Initial Deposit" },
        interestFromContributions: { label: "Interest on Contributions" },
        effectiveAnnualRate: { label: "Effective Annual Rate (APY)" },
        taxPaid: { label: "Tax on Interest" },
        afterTaxBalance: { label: "After-Tax Balance" },
        buyingPower: { label: "Buying Power (Inflation-Adjusted)" },
      },

      presets: {
        emergencyFund: { label: "Emergency Fund", description: "$5K start, $500/mo for 3 years at 4.5%" },
        savingsAccount: { label: "Savings Account", description: "$10K start, $200/mo for 5 years at 5%" },
        longTermGrowth: { label: "Long-Term Growth", description: "$25K start, $500/mo for 20 years at 7%" },
        cdInvestment: { label: "CD Investment", description: "$50K lump sum for 2 years at 4.75%" },
        retirementBoost: { label: "Retirement Boost", description: "$100K start, $1K/mo for 30 years at 8%" },
      },

      values: {
        "years": "years",
        "year": "year",
        "months": "months",
        "month": "month",
        "perYear": "/yr",
        "of": "of",
      },

      formats: {
        summary: "Your investment will grow to {endingBalance} over {duration}, earning {totalInterest} in interest.",
      },

      infoCards: {
        metrics: {
          title: "Growth Insights",
          items: [
            { label: "Total Growth Multiplier", valueKey: "growthMultiplier" },
            { label: "Interest as % of Total", valueKey: "interestPercent" },
            { label: "Average Monthly Interest", valueKey: "avgMonthlyInterest" },
            { label: "Doubling Time (Rule of 72)", valueKey: "doublingTime" },
          ],
        },
        details: {
          title: "Deep Analysis",
          items: [
            { label: "Total Return on Investment", valueKey: "totalROI" },
            { label: "Compound vs Simple Bonus", valueKey: "compoundBonus" },
            { label: "Interest per Dollar Deposited", valueKey: "interestPerDollar" },
            { label: "Final Year Interest", valueKey: "finalYearInterest" },
          ],
        },
        tips: {
          title: "Tips to Maximize Interest",
          items: [
            "Higher compounding frequency means slightly more interest earned — daily beats monthly",
            "Contributing at the beginning of each period earns more than at the end",
            "Even small monthly contributions compound dramatically over decades",
            "Consider the real return after inflation when planning long-term savings goals",
          ],
        },
      },

      chart: {
        title: "Investment Growth Over Time",
        xLabel: "Year",
        yLabel: "Balance",
        series: {
          deposits: "Total Deposited",
          interest: "Interest Earned",
          balance: "Total Balance",
        },
      },

      detailedTable: {
        growthTable: {
          button: "View Year-by-Year Growth Table",
          title: "Year-by-Year Growth Breakdown",
          columns: {
            year: "Year",
            deposit: "Deposits",
            interest: "Interest",
            totalDeposited: "Total Deposited",
            totalInterest: "Total Interest",
            balance: "Balance",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is Compound Interest?",
          content: "Compound interest is the interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, which is calculated only on the principal, compound interest allows your money to grow exponentially over time. Albert Einstein reportedly called it the eighth wonder of the world. The key insight is that each compounding period adds interest not just on your original deposit, but also on all previously earned interest. This creates a snowball effect where growth accelerates over time. The more frequently interest compounds — daily versus annually, for example — the faster your investment grows, though the difference between very frequent compounding periods becomes marginal.",
        },
        howItWorks: {
          title: "How Compound Interest Is Calculated",
          content: "The compound interest formula is A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate as a decimal, n is the number of compounding periods per year, and t is the time in years. For continuous compounding, the formula becomes A = Pe^(rt), using Euler's number. When regular contributions are included, the future value of an annuity formula is added: FV = PMT × [((1 + r/n)^(nt) - 1) / (r/n)]. For beginning-of-period contributions, this is multiplied by (1 + r/n). The effective annual rate (APY) is calculated as (1 + r/n)^n - 1, which shows the true annual return accounting for compounding frequency.",
        },
        considerations: {
          title: "Key Factors Affecting Interest",
          items: [
            { text: "Higher interest rates dramatically increase long-term returns due to compounding", type: "info" },
            { text: "Compounding frequency matters — daily compounding earns more than annual, but the difference decreases at higher frequencies", type: "info" },
            { text: "Time is the most powerful factor — doubling your time horizon can more than double your total interest", type: "info" },
            { text: "Regular contributions can outweigh a larger initial deposit over long periods", type: "warning" },
            { text: "Taxes on interest income can significantly reduce effective returns — consider tax-advantaged accounts", type: "warning" },
            { text: "Inflation erodes purchasing power — a 7% return with 3% inflation is really about 4% real growth", type: "warning" },
          ],
        },
        categories: {
          title: "Common Interest-Bearing Accounts",
          items: [
            { text: "High-Yield Savings Accounts: Currently offering 4-5% APY with FDIC insurance and daily compounding", type: "info" },
            { text: "Certificates of Deposit (CDs): Fixed rates from 4-5% for locking money for specific terms", type: "info" },
            { text: "Money Market Accounts: Similar to savings with slightly higher rates and limited transactions", type: "info" },
            { text: "Treasury Bonds & I-Bonds: Government-backed with inflation protection, semi-annual interest", type: "info" },
            { text: "Corporate Bonds: Higher yields than government bonds but with credit risk, various compounding", type: "info" },
            { text: "Index Funds: Average 7-10% annual returns historically with growth compounded through reinvestment", type: "info" },
          ],
        },
        examples: {
          title: "Compound Interest Examples",
          description: "See how different scenarios affect your investment growth",
          examples: [
            {
              title: "$10,000 at 5% for 10 Years (Monthly)",
              steps: [
                "Principal (P) = $10,000",
                "Rate (r) = 0.05, Periods (n) = 12, Time (t) = 10",
                "A = 10,000 × (1 + 0.05/12)^(12×10)",
                "A = 10,000 × (1.004167)^120",
                "A = 10,000 × 1.6470",
              ],
              result: "Final Balance: $16,470.09 — Interest: $6,470.09 (64.7% growth)",
            },
            {
              title: "$5,000 + $200/month at 7% for 20 Years",
              steps: [
                "Initial = $5,000, Monthly = $200, Rate = 7%, Monthly compound",
                "Initial grows: 5,000 × (1 + 0.07/12)^240 = $20,322.73",
                "Contributions FV: 200 × [((1.00583)^240 - 1) / 0.00583] = $103,838.20",
                "Total deposits: $5,000 + ($200 × 240) = $53,000",
                "Total interest earned: $71,160.93",
              ],
              result: "Final Balance: $124,160.93 — You deposited $53K, earned $71K in interest!",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is the difference between compound interest and simple interest?",
          answer: "Simple interest is calculated only on the original principal amount. Compound interest is calculated on the principal plus all previously earned interest. Over time, compound interest earns significantly more because you earn interest on your interest. For example, $10,000 at 5% simple interest earns $500/year every year. With compound interest, you earn $500 the first year, then $525 the second year (5% of $10,500), and the amount keeps growing.",
        },
        {
          question: "How does compounding frequency affect my returns?",
          answer: "More frequent compounding produces slightly higher returns. Daily compounding at 5% gives an effective annual rate (APY) of 5.127%, while annual compounding stays at exactly 5%. The difference is most noticeable at higher interest rates and over longer periods. However, the gap between daily and monthly compounding is quite small — about 0.01% difference at typical savings rates.",
        },
        {
          question: "What is APY and how is it different from APR?",
          answer: "APR (Annual Percentage Rate) is the stated annual interest rate without accounting for compounding. APY (Annual Percentage Yield) is the effective annual rate that includes the effect of compounding. A 5% APR compounded monthly produces a 5.116% APY. Banks advertise APY on savings (higher number looks better) and APR on loans (lower number looks better). Always compare APY to APY for an accurate comparison.",
        },
        {
          question: "Should I contribute at the beginning or end of the period?",
          answer: "Contributing at the beginning of each period (annuity due) earns more than contributing at the end (ordinary annuity) because each contribution has one extra compounding period. The difference is typically small for short timeframes but can add up over decades. For a $500/month contribution at 7% over 30 years, beginning-of-period adds roughly $25,000 more than end-of-period.",
        },
        {
          question: "How does the Rule of 72 work?",
          answer: "The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by the annual interest rate: at 6%, your money doubles in approximately 12 years (72 ÷ 6 = 12). At 8%, it takes about 9 years. At 3%, about 24 years. This rule is most accurate for rates between 6-10% and assumes compound interest with no additional contributions.",
        },
        {
          question: "How do taxes affect compound interest growth?",
          answer: "Taxes on interest income reduce your effective return. If you earn 5% interest and pay 25% tax, your after-tax return is 3.75%. This impact compounds over time — over 20 years, the difference between pre-tax and after-tax returns can be substantial. Tax-advantaged accounts like IRAs, 401(k)s, and Roth accounts let interest compound tax-free or tax-deferred, significantly boosting long-term growth.",
        },
      ],

      buttons: {
        calculate: "Calculate",
        reset: "Reset",
        pdf: "PDF",
        csv: "CSV",
        excel: "Excel",
        save: "Save",
        saved: "Saved",
        saving: "Saving...",
      },

      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de Interés",
      "slug": "calculadora-interes",
      "breadcrumb": "Calculadora de Interés",
      "seo": {
        "title": "Calculadora de Interés - Herramienta de Interés Compuesto y Simple",
        "description": "Calcula el interés compuesto y simple de tus ahorros e inversiones. Ve proyecciones de crecimiento con gráficos, impacto fiscal y ajuste por inflación. Herramienta gratuita en línea.",
        "shortDescription": "Calcula el interés compuesto con contribuciones e impacto fiscal.",
        "keywords": [
          "calculadora de interés",
          "calculadora de interés compuesto",
          "calculadora de interés simple",
          "calculadora de interés de ahorros",
          "calculadora de crecimiento de inversión",
          "calculadora TAE",
          "calculadora de interés gratuita",
          "fórmula de interés compuesto"
        ]
      },
      "subtitle": "Calcula cómo crece tu dinero con interés compuesto, contribuciones regulares y ve las proyecciones año por año.",
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "initialDeposit": {
          "label": "Depósito Inicial",
          "helpText": "La cantidad inicial que inviertes o depositas hoy"
        },
        "annualContribution": {
          "label": "Contribución Anual",
          "helpText": "Suma adicional añadida una vez al año"
        },
        "monthlyContribution": {
          "label": "Contribución Mensual",
          "helpText": "Cantidad añadida cada mes a tu inversión"
        },
        "contributeAt": {
          "label": "Contribuir Al",
          "helpText": "Cuándo se añaden las contribuciones durante cada período",
          "options": {
            "beginning": "Principio del Período",
            "end": "Final del Período"
          }
        },
        "interestRate": {
          "label": "Tasa de Interés Anual",
          "helpText": "La tasa de interés anual (TAE) de tu inversión"
        },
        "compoundFrequency": {
          "label": "Frecuencia de Capitalización",
          "helpText": "Con qué frecuencia se calcula e incorpora el interés a tu saldo",
          "options": {
            "daily": "Diaria (365/año)",
            "weekly": "Semanal (52/año)",
            "biweekly": "Quincenal (26/año)",
            "semimonthly": "Bimensual (24/año)",
            "monthly": "Mensual (12/año)",
            "quarterly": "Trimestral (4/año)",
            "semiannually": "Semestral (2/año)",
            "annually": "Anual (1/año)",
            "continuously": "Continua"
          }
        },
        "investmentYears": {
          "label": "Años",
          "helpText": "Número de años para invertir"
        },
        "investmentMonths": {
          "label": "Meses",
          "helpText": "Meses adicionales más allá de los años completos"
        },
        "includeTax": {
          "label": "Incluir Impuestos sobre Intereses",
          "helpText": "Calcular el impacto de los impuestos en tus ganancias por intereses"
        },
        "taxRate": {
          "label": "Tasa de Impuestos",
          "helpText": "Tu tasa impositiva marginal aplicada a los ingresos por intereses"
        },
        "includeInflation": {
          "label": "Ajustar por Inflación",
          "helpText": "Mostrar el poder adquisitivo real de tu saldo futuro"
        },
        "inflationRate": {
          "label": "Tasa de Inflación",
          "helpText": "Tasa de inflación anual promedio esperada"
        }
      },
      "results": {
        "endingBalance": {
          "label": "Saldo Final"
        },
        "totalInterest": {
          "label": "Interés Total Ganado"
        },
        "totalContributions": {
          "label": "Contribuciones Totales"
        },
        "totalDeposited": {
          "label": "Total Depositado"
        },
        "interestFromInitial": {
          "label": "Interés del Depósito Inicial"
        },
        "interestFromContributions": {
          "label": "Interés de las Contribuciones"
        },
        "effectiveAnnualRate": {
          "label": "Tasa Anual Efectiva (TAE)"
        },
        "taxPaid": {
          "label": "Impuesto sobre Intereses"
        },
        "afterTaxBalance": {
          "label": "Saldo Después de Impuestos"
        },
        "buyingPower": {
          "label": "Poder Adquisitivo (Ajustado por Inflación)"
        }
      },
      "presets": {
        "emergencyFund": {
          "label": "Fondo de Emergencia",
          "description": "$5K inicial, $500/mes por 3 años al 4.5%"
        },
        "savingsAccount": {
          "label": "Cuenta de Ahorros",
          "description": "$10K inicial, $200/mes por 5 años al 5%"
        },
        "longTermGrowth": {
          "label": "Crecimiento a Largo Plazo",
          "description": "$25K inicial, $500/mes por 20 años al 7%"
        },
        "cdInvestment": {
          "label": "Inversión en CD",
          "description": "$50K suma única por 2 años al 4.75%"
        },
        "retirementBoost": {
          "label": "Impulso de Jubilación",
          "description": "$100K inicial, $1K/mes por 30 años al 8%"
        }
      },
      "values": {
        "years": "años",
        "year": "año",
        "months": "meses",
        "month": "mes",
        "perYear": "/año",
        "of": "de"
      },
      "formats": {
        "summary": "Tu inversión crecerá a {endingBalance} durante {duration}, ganando {totalInterest} en intereses."
      },
      "infoCards": {
        "metrics": {
          "title": "Perspectivas de Crecimiento",
          "items": [
            {
              "label": "Multiplicador de Crecimiento Total",
              "valueKey": "growthMultiplier"
            },
            {
              "label": "Interés como % del Total",
              "valueKey": "interestPercent"
            },
            {
              "label": "Interés Mensual Promedio",
              "valueKey": "avgMonthlyInterest"
            },
            {
              "label": "Tiempo de Duplicación (Regla del 72)",
              "valueKey": "doublingTime"
            }
          ]
        },
        "details": {
          "title": "Análisis Profundo",
          "items": [
            {
              "label": "Retorno Total de la Inversión",
              "valueKey": "totalROI"
            },
            {
              "label": "Bonificación Compuesto vs Simple",
              "valueKey": "compoundBonus"
            },
            {
              "label": "Interés por Dólar Depositado",
              "valueKey": "interestPerDollar"
            },
            {
              "label": "Interés del Último Año",
              "valueKey": "finalYearInterest"
            }
          ]
        },
        "tips": {
          "title": "Consejos para Maximizar el Interés",
          "items": [
            "Mayor frecuencia de capitalización significa ligeramente más interés ganado — diaria supera a mensual",
            "Contribuir al principio de cada período gana más que al final",
            "Incluso pequeñas contribuciones mensuales se capitalizan dramáticamente a lo largo de décadas",
            "Considera el rendimiento real después de la inflación al planificar objetivos de ahorro a largo plazo"
          ]
        }
      },
      "chart": {
        "title": "Crecimiento de la Inversión a lo Largo del Tiempo",
        "xLabel": "Año",
        "yLabel": "Saldo",
        "series": {
          "deposits": "Total Depositado",
          "interest": "Interés Ganado",
          "balance": "Saldo Total"
        }
      },
      "detailedTable": {
        "growthTable": {
          "button": "Ver Tabla de Crecimiento Año por Año",
          "title": "Desglose de Crecimiento Año por Año",
          "columns": {
            "year": "Año",
            "deposit": "Depósitos",
            "interest": "Interés",
            "totalDeposited": "Total Depositado",
            "totalInterest": "Interés Total",
            "balance": "Saldo"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el Interés Compuesto?",
          "content": "El interés compuesto es el interés calculado tanto sobre el capital inicial como sobre el interés acumulado de períodos anteriores. A diferencia del interés simple, que se calcula solo sobre el capital, el interés compuesto permite que tu dinero crezca exponencialmente con el tiempo. Albert Einstein supuestamente lo llamó la octava maravilla del mundo. La clave está en que cada período de capitalización añade interés no solo sobre tu depósito original, sino también sobre todos los intereses ganados previamente. Esto crea un efecto de bola de nieve donde el crecimiento se acelera con el tiempo. Cuanto más frecuentemente se capitaliza el interés — diariamente versus anualmente, por ejemplo — más rápido crece tu inversión, aunque la diferencia entre períodos de capitalización muy frecuentes se vuelve marginal."
        },
        "howItWorks": {
          "title": "Cómo se Calcula el Interés Compuesto",
          "content": "La fórmula del interés compuesto es A = P(1 + r/n)^(nt), donde A es la cantidad final, P es el capital, r es la tasa de interés anual como decimal, n es el número de períodos de capitalización por año, y t es el tiempo en años. Para capitalización continua, la fórmula se convierte en A = Pe^(rt), usando el número de Euler. Cuando se incluyen contribuciones regulares, se añade la fórmula del valor futuro de una anualidad: FV = PMT × [((1 + r/n)^(nt) - 1) / (r/n)]. Para contribuciones al principio del período, esto se multiplica por (1 + r/n). La tasa anual efectiva (TAE) se calcula como (1 + r/n)^n - 1, que muestra el verdadero rendimiento anual considerando la frecuencia de capitalización."
        },
        "considerations": {
          "title": "Factores Clave que Afectan el Interés",
          "items": [
            {
              "text": "Las tasas de interés más altas aumentan dramáticamente los rendimientos a largo plazo debido a la capitalización",
              "type": "info"
            },
            {
              "text": "La frecuencia de capitalización importa — la capitalización diaria gana más que la anual, pero la diferencia disminuye en frecuencias más altas",
              "type": "info"
            },
            {
              "text": "El tiempo es el factor más poderoso — duplicar tu horizonte temporal puede más que duplicar tu interés total",
              "type": "info"
            },
            {
              "text": "Las contribuciones regulares pueden superar un depósito inicial más grande durante períodos largos",
              "type": "warning"
            },
            {
              "text": "Los impuestos sobre los ingresos por intereses pueden reducir significativamente los rendimientos efectivos — considera cuentas con ventajas fiscales",
              "type": "warning"
            },
            {
              "text": "La inflación erosiona el poder adquisitivo — un rendimiento del 7% con 3% de inflación es realmente alrededor del 4% de crecimiento real",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Cuentas Comunes que Generan Interés",
          "items": [
            {
              "text": "Cuentas de Ahorros de Alto Rendimiento: Actualmente ofrecen 4-5% TAE con seguro FDIC y capitalización diaria",
              "type": "info"
            },
            {
              "text": "Certificados de Depósito (CD): Tasas fijas del 4-5% por bloquear dinero durante plazos específicos",
              "type": "info"
            },
            {
              "text": "Cuentas del Mercado Monetario: Similar a ahorros con tasas ligeramente más altas y transacciones limitadas",
              "type": "info"
            },
            {
              "text": "Bonos del Tesoro y Bonos I: Respaldados por el gobierno con protección contra inflación, interés semestral",
              "type": "info"
            },
            {
              "text": "Bonos Corporativos: Rendimientos más altos que los bonos gubernamentales pero con riesgo crediticio, capitalización variable",
              "type": "info"
            },
            {
              "text": "Fondos Indexados: Rendimientos promedio del 7-10% anual históricamente con crecimiento capitalizado mediante reinversión",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Interés Compuesto",
          "description": "Ve cómo diferentes escenarios afectan el crecimiento de tu inversión",
          "examples": [
            {
              "title": "$10,000 al 5% por 10 Años (Mensual)",
              "steps": [
                "Capital (P) = $10,000",
                "Tasa (r) = 0.05, Períodos (n) = 12, Tiempo (t) = 10",
                "A = 10,000 × (1 + 0.05/12)^(12×10)",
                "A = 10,000 × (1.004167)^120",
                "A = 10,000 × 1.6470"
              ],
              "result": "Saldo Final: $16,470.09 — Interés: $6,470.09 (64.7% de crecimiento)"
            },
            {
              "title": "$5,000 + $200/mes al 7% por 20 Años",
              "steps": [
                "Inicial = $5,000, Mensual = $200, Tasa = 7%, Capitalización mensual",
                "Inicial crece: 5,000 × (1 + 0.07/12)^240 = $20,322.73",
                "VF de contribuciones: 200 × [((1.00583)^240 - 1) / 0.00583] = $103,838.20",
                "Depósitos totales: $5,000 + ($200 × 240) = $53,000",
                "Interés total ganado: $71,160.93"
              ],
              "result": "Saldo Final: $124,160.93 — ¡Depositaste $53K, ganaste $71K en intereses!"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es la diferencia entre interés compuesto e interés simple?",
          "answer": "El interés simple se calcula solo sobre la cantidad principal original. El interés compuesto se calcula sobre el principal más todos los intereses ganados previamente. Con el tiempo, el interés compuesto gana significativamente más porque ganas interés sobre tu interés. Por ejemplo, $10,000 al 5% de interés simple gana $500/año cada año. Con interés compuesto, ganas $500 el primer año, luego $525 el segundo año (5% de $10,500), y la cantidad sigue creciendo."
        },
        {
          "question": "¿Cómo afecta la frecuencia de capitalización a mis rendimientos?",
          "answer": "Una capitalización más frecuente produce rendimientos ligeramente más altos. La capitalización diaria al 5% da una tasa anual efectiva (TAE) del 5.127%, mientras que la capitalización anual se mantiene exactamente en 5%. La diferencia es más notable en tasas de interés más altas y durante períodos más largos. Sin embargo, la brecha entre la capitalización diaria y mensual es bastante pequeña — alrededor del 0.01% de diferencia en las tasas típicas de ahorro."
        },
        {
          "question": "¿Qué es la TAE y en qué se diferencia de la TAE nominal?",
          "answer": "La TAE nominal es la tasa de interés anual declarada sin considerar la capitalización. La TAE (Tasa Anual Equivalente) es la tasa anual efectiva que incluye el efecto de la capitalización. Una TAE nominal del 5% capitalizada mensualmente produce una TAE del 5.116%. Los bancos anuncian TAE en ahorros (el número más alto se ve mejor) y TAE nominal en préstamos (el número más bajo se ve mejor). Siempre compara TAE con TAE para una comparación precisa."
        },
        {
          "question": "¿Debo contribuir al principio o al final del período?",
          "answer": "Contribuir al principio de cada período (anualidad vencida) gana más que contribuir al final (anualidad ordinaria) porque cada contribución tiene un período de capitalización adicional. La diferencia es típicamente pequeña para marcos temporales cortos pero puede acumularse durante décadas. Para una contribución de $500/mes al 7% durante 30 años, el principio del período añade aproximadamente $25,000 más que el final del período."
        },
        {
          "question": "¿Cómo funciona la Regla del 72?",
          "answer": "La Regla del 72 es una forma rápida de estimar cuánto tiempo toma duplicar tu dinero. Divide 72 entre la tasa de interés anual: al 6%, tu dinero se duplica en aproximadamente 12 años (72 ÷ 6 = 12). Al 8%, toma unos 9 años. Al 3%, unos 24 años. Esta regla es más precisa para tasas entre 6-10% y asume interés compuesto sin contribuciones adicionales."
        },
        {
          "question": "¿Cómo afectan los impuestos al crecimiento del interés compuesto?",
          "answer": "Los impuestos sobre los ingresos por intereses reducen tu rendimiento efectivo. Si ganas 5% de interés y pagas 25% de impuestos, tu rendimiento después de impuestos es 3.75%. Este impacto se capitaliza con el tiempo — durante 20 años, la diferencia entre rendimientos antes y después de impuestos puede ser sustancial. Las cuentas con ventajas fiscales como IRA, 401(k) y cuentas Roth permiten que el interés se capitalice libre de impuestos o con impuestos diferidos, impulsando significativamente el crecimiento a largo plazo."
        }
      ],
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
      }
    },
    pt: {
      "name": "Calculadora de Juros",
      "slug": "calculadora-juros",
      "breadcrumb": "Calculadora de Juros",
      "seo": {
        "title": "Calculadora de Juros - Ferramenta de Juros Compostos e Simples",
        "description": "Calcule juros compostos e simples em suas poupanças e investimentos. Veja projeções de crescimento com gráficos, impacto fiscal e ajuste de inflação. Ferramenta online gratuita.",
        "shortDescription": "Calcule juros compostos com contribuições e impacto fiscal.",
        "keywords": [
          "calculadora de juros",
          "calculadora de juros compostos",
          "calculadora de juros simples",
          "calculadora juros poupança",
          "calculadora crescimento investimento",
          "calculadora rendimento anual",
          "calculadora juros grátis",
          "fórmula juros compostos"
        ]
      },
      "subtitle": "Calcule como seu dinheiro cresce com juros compostos, contribuições regulares, e veja projeções ano a ano.",
      "inputs": {
        "initialDeposit": {
          "label": "Depósito Inicial",
          "helpText": "O valor inicial que você investe ou deposita hoje"
        },
        "annualContribution": {
          "label": "Contribuição Anual",
          "helpText": "Valor adicional em parcela única adicionado uma vez por ano"
        },
        "monthlyContribution": {
          "label": "Contribuição Mensal",
          "helpText": "Valor adicionado todo mês ao seu investimento"
        },
        "contributeAt": {
          "label": "Contribuir No",
          "helpText": "Quando as contribuições são adicionadas durante cada período",
          "options": {
            "beginning": "Início do Período",
            "end": "Final do Período"
          }
        },
        "interestRate": {
          "label": "Taxa de Juros Anual",
          "helpText": "A taxa de juros anual (TJA) do seu investimento"
        },
        "compoundFrequency": {
          "label": "Frequência de Capitalização",
          "helpText": "Com que frequência os juros são calculados e adicionados ao seu saldo",
          "options": {
            "daily": "Diária (365/ano)",
            "weekly": "Semanal (52/ano)",
            "biweekly": "Quinzenal (26/ano)",
            "semimonthly": "Semi-mensal (24/ano)",
            "monthly": "Mensal (12/ano)",
            "quarterly": "Trimestral (4/ano)",
            "semiannually": "Semi-anual (2/ano)",
            "annually": "Anual (1/ano)",
            "continuously": "Contínua"
          }
        },
        "investmentYears": {
          "label": "Anos",
          "helpText": "Número de anos para investir"
        },
        "investmentMonths": {
          "label": "Meses",
          "helpText": "Meses adicionais além dos anos completos"
        },
        "includeTax": {
          "label": "Incluir Imposto sobre Juros",
          "helpText": "Calcular o impacto dos impostos sobre seus rendimentos de juros"
        },
        "taxRate": {
          "label": "Taxa de Imposto",
          "helpText": "Sua alíquota marginal de imposto aplicada à renda de juros"
        },
        "includeInflation": {
          "label": "Ajustar pela Inflação",
          "helpText": "Mostrar o poder de compra real do seu saldo futuro"
        },
        "inflationRate": {
          "label": "Taxa de Inflação",
          "helpText": "Taxa média anual de inflação esperada"
        }
      },
      "results": {
        "endingBalance": {
          "label": "Saldo Final"
        },
        "totalInterest": {
          "label": "Total de Juros Ganhos"
        },
        "totalContributions": {
          "label": "Total de Contribuições"
        },
        "totalDeposited": {
          "label": "Total Depositado"
        },
        "interestFromInitial": {
          "label": "Juros sobre Depósito Inicial"
        },
        "interestFromContributions": {
          "label": "Juros sobre Contribuições"
        },
        "effectiveAnnualRate": {
          "label": "Taxa Anual Efetiva (TAE)"
        },
        "taxPaid": {
          "label": "Imposto sobre Juros"
        },
        "afterTaxBalance": {
          "label": "Saldo Após Impostos"
        },
        "buyingPower": {
          "label": "Poder de Compra (Ajustado pela Inflação)"
        }
      },
      "presets": {
        "emergencyFund": {
          "label": "Fundo de Emergência",
          "description": "R$ 25K inicial, R$ 2,5K/mês por 3 anos a 10,5%"
        },
        "savingsAccount": {
          "label": "Conta Poupança",
          "description": "R$ 50K inicial, R$ 1K/mês por 5 anos a 12%"
        },
        "longTermGrowth": {
          "label": "Crescimento Longo Prazo",
          "description": "R$ 125K inicial, R$ 2,5K/mês por 20 anos a 14%"
        },
        "cdInvestment": {
          "label": "Investimento CDB",
          "description": "R$ 250K valor único por 2 anos a 11,75%"
        },
        "retirementBoost": {
          "label": "Aposentadoria Plus",
          "description": "R$ 500K inicial, R$ 5K/mês por 30 anos a 16%"
        }
      },
      "values": {
        "years": "anos",
        "year": "ano",
        "months": "meses",
        "month": "mês",
        "perYear": "/ano",
        "of": "de"
      },
      "formats": {
        "summary": "Seu investimento crescerá para {endingBalance} ao longo de {duration}, ganhando {totalInterest} em juros."
      },
      "infoCards": {
        "metrics": {
          "title": "Insights de Crescimento",
          "items": [
            {
              "label": "Multiplicador Total de Crescimento",
              "valueKey": "growthMultiplier"
            },
            {
              "label": "Juros como % do Total",
              "valueKey": "interestPercent"
            },
            {
              "label": "Juros Médios Mensais",
              "valueKey": "avgMonthlyInterest"
            },
            {
              "label": "Tempo para Dobrar (Regra 72)",
              "valueKey": "doublingTime"
            }
          ]
        },
        "details": {
          "title": "Análise Detalhada",
          "items": [
            {
              "label": "Retorno Total sobre Investimento",
              "valueKey": "totalROI"
            },
            {
              "label": "Bônus Composto vs Simples",
              "valueKey": "compoundBonus"
            },
            {
              "label": "Juros por Real Depositado",
              "valueKey": "interestPerDollar"
            },
            {
              "label": "Juros do Último Ano",
              "valueKey": "finalYearInterest"
            }
          ]
        },
        "tips": {
          "title": "Dicas para Maximizar Juros",
          "items": [
            "Maior frequência de capitalização significa um pouco mais de juros ganhos — diária supera mensal",
            "Contribuir no início de cada período rende mais do que no final",
            "Mesmo pequenas contribuições mensais se capitalizam dramaticamente ao longo das décadas",
            "Considere o retorno real após inflação ao planejar metas de poupança de longo prazo"
          ]
        }
      },
      "chart": {
        "title": "Crescimento do Investimento ao Longo do Tempo",
        "xLabel": "Ano",
        "yLabel": "Saldo",
        "series": {
          "deposits": "Total Depositado",
          "interest": "Juros Ganhos",
          "balance": "Saldo Total"
        }
      },
      "detailedTable": {
        "growthTable": {
          "button": "Ver Tabela de Crescimento Ano a Ano",
          "title": "Detalhamento do Crescimento Ano a Ano",
          "columns": {
            "year": "Ano",
            "deposit": "Depósitos",
            "interest": "Juros",
            "totalDeposited": "Total Depositado",
            "totalInterest": "Total de Juros",
            "balance": "Saldo"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que são Juros Compostos?",
          "content": "Juros compostos são os juros calculados tanto sobre o capital inicial quanto sobre os juros acumulados de períodos anteriores. Diferentemente dos juros simples, que são calculados apenas sobre o principal, os juros compostos permitem que seu dinheiro cresça exponencialmente ao longo do tempo. Albert Einstein supostamente os chamou da oitava maravilha do mundo. A ideia chave é que cada período de capitalização adiciona juros não apenas sobre seu depósito original, mas também sobre todos os juros previamente ganhos. Isso cria um efeito bola de neve onde o crescimento acelera ao longo do tempo. Quanto mais frequente a capitalização — diária versus anual, por exemplo — mais rápido seu investimento cresce, embora a diferença entre períodos de capitalização muito frequentes se torne marginal."
        },
        "howItWorks": {
          "title": "Como os Juros Compostos são Calculados",
          "content": "A fórmula dos juros compostos é M = C(1 + i/n)^(nt), onde M é o montante final, C é o capital, i é a taxa de juros anual como decimal, n é o número de períodos de capitalização por ano, e t é o tempo em anos. Para capitalização contínua, a fórmula se torna M = Ce^(it), usando o número de Euler. Quando contribuições regulares são incluídas, a fórmula do valor futuro de uma anuidade é adicionada: VF = PMT × [((1 + i/n)^(nt) - 1) / (i/n)]. Para contribuições no início do período, isso é multiplicado por (1 + i/n). A taxa efetiva anual é calculada como (1 + i/n)^n - 1, que mostra o retorno anual real considerando a frequência de capitalização."
        },
        "considerations": {
          "title": "Fatores Chave que Afetam os Juros",
          "items": [
            {
              "text": "Taxas de juros mais altas aumentam dramaticamente os retornos de longo prazo devido à capitalização",
              "type": "info"
            },
            {
              "text": "Frequência de capitalização importa — capitalização diária rende mais que anual, mas a diferença diminui em frequências mais altas",
              "type": "info"
            },
            {
              "text": "Tempo é o fator mais poderoso — dobrar seu horizonte temporal pode mais que dobrar seus juros totais",
              "type": "info"
            },
            {
              "text": "Contribuições regulares podem superar um depósito inicial maior ao longo de períodos longos",
              "type": "warning"
            },
            {
              "text": "Impostos sobre renda de juros podem reduzir significativamente retornos efetivos — considere contas com vantagens fiscais",
              "type": "warning"
            },
            {
              "text": "Inflação corrói poder de compra — um retorno de 14% com 6% de inflação é realmente cerca de 8% de crescimento real",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Contas Comuns que Rendem Juros",
          "items": [
            {
              "text": "Contas Poupança de Alto Rendimento: Atualmente oferecendo 10-12% ao ano com garantia do FGC e capitalização diária",
              "type": "info"
            },
            {
              "text": "Certificados de Depósito Bancário (CDBs): Taxas fixas de 10-13% ao ano para bloquear dinheiro por prazos específicos",
              "type": "info"
            },
            {
              "text": "Contas do Mercado Monetário: Similar à poupança com taxas ligeiramente mais altas e transações limitadas",
              "type": "info"
            },
            {
              "text": "Títulos do Tesouro: Garantidos pelo governo com proteção contra inflação, juros semestrais",
              "type": "info"
            },
            {
              "text": "Debêntures Corporativas: Rendimentos maiores que títulos públicos mas com risco de crédito, capitalização variada",
              "type": "info"
            },
            {
              "text": "Fundos de Índice: Retornos médios de 14-20% anuais historicamente com crescimento capitalizado através de reinvestimento",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Juros Compostos",
          "description": "Veja como diferentes cenários afetam o crescimento do seu investimento",
          "examples": [
            {
              "title": "R$ 50.000 a 12% por 10 Anos (Mensal)",
              "steps": [
                "Principal (C) = R$ 50.000",
                "Taxa (i) = 0,12, Períodos (n) = 12, Tempo (t) = 10",
                "M = 50.000 × (1 + 0,12/12)^(12×10)",
                "M = 50.000 × (1,01)^120",
                "M = 50.000 × 3,300"
              ],
              "result": "Saldo Final: R$ 165.003,69 — Juros: R$ 115.003,69 (230% de crescimento)"
            },
            {
              "title": "R$ 25.000 + R$ 1.000/mês a 14% por 20 Anos",
              "steps": [
                "Inicial = R$ 25.000, Mensal = R$ 1.000, Taxa = 14%, Capitalização mensal",
                "Inicial cresce: 25.000 × (1 + 0,14/12)^240 = R$ 406.596,85",
                "VF Contribuições: 1.000 × [((1,01167)^240 - 1) / 0,01167] = R$ 2.078.227,79",
                "Total depositado: R$ 25.000 + (R$ 1.000 × 240) = R$ 265.000",
                "Total de juros ganhos: R$ 2.219.824,64"
              ],
              "result": "Saldo Final: R$ 2.484.824,64 — Você depositou R$ 265K, ganhou R$ 2,2M em juros!"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual é a diferença entre juros compostos e juros simples?",
          "answer": "Juros simples são calculados apenas sobre o valor principal original. Juros compostos são calculados sobre o principal mais todos os juros previamente ganhos. Ao longo do tempo, juros compostos rendem significativamente mais porque você ganha juros sobre seus juros. Por exemplo, R$ 50.000 a 12% de juros simples rendem R$ 6.000/ano todos os anos. Com juros compostos, você ganha R$ 6.000 no primeiro ano, depois R$ 6.720 no segundo ano (12% de R$ 56.000), e o valor continua crescendo."
        },
        {
          "question": "Como a frequência de capitalização afeta meus retornos?",
          "answer": "Capitalização mais frequente produz retornos ligeiramente maiores. Capitalização diária a 12% dá uma taxa efetiva anual de 12,75%, enquanto capitalização anual fica exatamente em 12%. A diferença é mais perceptível em taxas de juros mais altas e por períodos mais longos. No entanto, a diferença entre capitalização diária e mensal é bem pequena — cerca de 0,1% de diferença em taxas típicas de poupança."
        },
        {
          "question": "O que é Taxa Efetiva Anual e como difere da Taxa Nominal?",
          "answer": "Taxa Nominal é a taxa de juros anual declarada sem considerar a capitalização. Taxa Efetiva Anual é a taxa anual real que inclui o efeito da capitalização. Uma taxa nominal de 12% capitalizada mensalmente produz uma taxa efetiva de 12,68%. Bancos anunciam a taxa efetiva em investimentos (número maior parece melhor) e taxa nominal em empréstimos (número menor parece melhor). Sempre compare taxa efetiva com taxa efetiva para uma comparação precisa."
        },
        {
          "question": "Devo contribuir no início ou no final do período?",
          "answer": "Contribuir no início de cada período rende mais do que contribuir no final porque cada contribuição tem um período adicional de capitalização. A diferença é tipicamente pequena para prazos curtos mas pode se acumular ao longo de décadas. Para uma contribuição de R$ 2.500/mês a 14% por 30 anos, início do período adiciona aproximadamente R$ 350.000 a mais que final do período."
        },
        {
          "question": "Como funciona a Regra dos 72?",
          "answer": "A Regra dos 72 é uma forma rápida de estimar quanto tempo leva para dobrar seu dinheiro. Divida 72 pela taxa de juros anual: a 12%, seu dinheiro dobra em aproximadamente 6 anos (72 ÷ 12 = 6). A 16%, leva cerca de 4,5 anos. A 6%, cerca de 12 anos. Esta regra é mais precisa para taxas entre 6-20% e assume juros compostos sem contribuições adicionais."
        },
        {
          "question": "Como os impostos afetam o crescimento dos juros compostos?",
          "answer": "Impostos sobre renda de juros reduzem seu retorno efetivo. Se você ganha 12% de juros e paga 27,5% de imposto, seu retorno após impostos é 8,7%. Este impacto se capitaliza ao longo do tempo — ao longo de 20 anos, a diferença entre retornos antes e depois dos impostos pode ser substancial. Contas com vantagens fiscais como previdência privada e algumas aplicações de renda fixa deixam os juros se capitalizarem livres de impostos ou com tributação diferida, aumentando significativamente o crescimento de longo prazo."
        }
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
      "name": "Calculateur d'Intérêts",
      "slug": "calculateur-interets",
      "breadcrumb": "Calculateur d'Intérêts",
      "seo": {
        "title": "Calculateur d'Intérêts - Outil Intérêts Composés et Simples",
        "description": "Calculez les intérêts composés et simples sur vos épargnes et investissements. Visualisez les projections de croissance avec graphiques, impact fiscal et ajustement inflation. Outil gratuit en ligne.",
        "shortDescription": "Calculez les intérêts composés avec contributions et impact fiscal.",
        "keywords": [
          "calculateur d'intérêts",
          "calculateur intérêts composés",
          "calculateur intérêts simples",
          "calculateur intérêts épargne",
          "calculateur croissance investissement",
          "calculateur TEG",
          "calculateur intérêts gratuit",
          "formule intérêts composés"
        ]
      },
      "subtitle": "Calculez comment votre argent croît avec les intérêts composés, les contributions régulières, et visualisez les projections année par année.",
      "inputs": {
        "initialDeposit": {
          "label": "Dépôt Initial",
          "helpText": "Le montant de départ que vous investissez ou déposez aujourd'hui"
        },
        "annualContribution": {
          "label": "Contribution Annuelle",
          "helpText": "Montant forfaitaire supplémentaire ajouté une fois par an"
        },
        "monthlyContribution": {
          "label": "Contribution Mensuelle",
          "helpText": "Montant ajouté chaque mois à votre investissement"
        },
        "contributeAt": {
          "label": "Contribuer À",
          "helpText": "Quand les contributions sont ajoutées durant chaque période",
          "options": {
            "beginning": "Début de Période",
            "end": "Fin de Période"
          }
        },
        "interestRate": {
          "label": "Taux d'Intérêt Annuel",
          "helpText": "Le taux d'intérêt annuel (TEG) sur votre investissement"
        },
        "compoundFrequency": {
          "label": "Fréquence de Capitalisation",
          "helpText": "À quelle fréquence les intérêts sont calculés et ajoutés à votre solde",
          "options": {
            "daily": "Quotidienne (365/an)",
            "weekly": "Hebdomadaire (52/an)",
            "biweekly": "Bi-hebdomadaire (26/an)",
            "semimonthly": "Bi-mensuelle (24/an)",
            "monthly": "Mensuelle (12/an)",
            "quarterly": "Trimestrielle (4/an)",
            "semiannually": "Semestrielle (2/an)",
            "annually": "Annuelle (1/an)",
            "continuously": "Continue"
          }
        },
        "investmentYears": {
          "label": "Années",
          "helpText": "Nombre d'années d'investissement"
        },
        "investmentMonths": {
          "label": "Mois",
          "helpText": "Mois supplémentaires au-delà des années complètes"
        },
        "includeTax": {
          "label": "Inclure l'Impôt sur les Intérêts",
          "helpText": "Calculer l'impact des impôts sur vos gains d'intérêts"
        },
        "taxRate": {
          "label": "Taux d'Imposition",
          "helpText": "Votre taux marginal d'imposition appliqué aux revenus d'intérêts"
        },
        "includeInflation": {
          "label": "Ajuster pour l'Inflation",
          "helpText": "Afficher le pouvoir d'achat réel de votre solde futur"
        },
        "inflationRate": {
          "label": "Taux d'Inflation",
          "helpText": "Taux d'inflation annuel moyen attendu"
        }
      },
      "results": {
        "endingBalance": {
          "label": "Solde Final"
        },
        "totalInterest": {
          "label": "Total des Intérêts Gagnés"
        },
        "totalContributions": {
          "label": "Total des Contributions"
        },
        "totalDeposited": {
          "label": "Total Déposé"
        },
        "interestFromInitial": {
          "label": "Intérêts du Dépôt Initial"
        },
        "interestFromContributions": {
          "label": "Intérêts des Contributions"
        },
        "effectiveAnnualRate": {
          "label": "Taux Effectif Annuel (TEG)"
        },
        "taxPaid": {
          "label": "Impôt sur les Intérêts"
        },
        "afterTaxBalance": {
          "label": "Solde Après Impôts"
        },
        "buyingPower": {
          "label": "Pouvoir d'Achat (Ajusté Inflation)"
        }
      },
      "presets": {
        "emergencyFund": {
          "label": "Fonds d'Urgence",
          "description": "5K€ départ, 500€/mois pendant 3 ans à 4,5%"
        },
        "savingsAccount": {
          "label": "Compte Épargne",
          "description": "10K€ départ, 200€/mois pendant 5 ans à 5%"
        },
        "longTermGrowth": {
          "label": "Croissance Long Terme",
          "description": "25K€ départ, 500€/mois pendant 20 ans à 7%"
        },
        "cdInvestment": {
          "label": "Investissement Terme",
          "description": "50K€ en une fois pendant 2 ans à 4,75%"
        },
        "retirementBoost": {
          "label": "Boost Retraite",
          "description": "100K€ départ, 1K€/mois pendant 30 ans à 8%"
        }
      },
      "values": {
        "years": "années",
        "year": "année",
        "months": "mois",
        "month": "mois",
        "perYear": "/an",
        "of": "de"
      },
      "formats": {
        "summary": "Votre investissement atteindra {endingBalance} sur {duration}, générant {totalInterest} d'intérêts."
      },
      "infoCards": {
        "metrics": {
          "title": "Perspectives de Croissance",
          "items": [
            {
              "label": "Multiplicateur de Croissance Total",
              "valueKey": "growthMultiplier"
            },
            {
              "label": "Intérêts en % du Total",
              "valueKey": "interestPercent"
            },
            {
              "label": "Intérêts Mensuels Moyens",
              "valueKey": "avgMonthlyInterest"
            },
            {
              "label": "Temps de Doublement (Règle 72)",
              "valueKey": "doublingTime"
            }
          ]
        },
        "details": {
          "title": "Analyse Approfondie",
          "items": [
            {
              "label": "Retour Total sur Investissement",
              "valueKey": "totalROI"
            },
            {
              "label": "Bonus Composés vs Simples",
              "valueKey": "compoundBonus"
            },
            {
              "label": "Intérêts par Euro Déposé",
              "valueKey": "interestPerDollar"
            },
            {
              "label": "Intérêts Dernière Année",
              "valueKey": "finalYearInterest"
            }
          ]
        },
        "tips": {
          "title": "Conseils pour Maximiser les Intérêts",
          "items": [
            "Une fréquence de capitalisation plus élevée génère légèrement plus d'intérêts — quotidien bat mensuel",
            "Contribuer en début de période rapporte plus qu'en fin de période",
            "Même de petites contributions mensuelles se capitalisent énormément sur des décennies",
            "Considérez le rendement réel après inflation pour planifier vos objectifs d'épargne long terme"
          ]
        }
      },
      "chart": {
        "title": "Croissance de l'Investissement dans le Temps",
        "xLabel": "Année",
        "yLabel": "Solde",
        "series": {
          "deposits": "Total Déposé",
          "interest": "Intérêts Gagnés",
          "balance": "Solde Total"
        }
      },
      "detailedTable": {
        "growthTable": {
          "button": "Voir le Tableau de Croissance Année par Année",
          "title": "Détail de Croissance Année par Année",
          "columns": {
            "year": "Année",
            "deposit": "Dépôts",
            "interest": "Intérêts",
            "totalDeposited": "Total Déposé",
            "totalInterest": "Total Intérêts",
            "balance": "Solde"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que les Intérêts Composés ?",
          "content": "Les intérêts composés sont les intérêts calculés à la fois sur le capital initial et sur les intérêts accumulés des périodes précédentes. Contrairement aux intérêts simples, qui ne sont calculés que sur le capital, les intérêts composés permettent à votre argent de croître exponentiellement dans le temps. Albert Einstein les aurait appelés la huitième merveille du monde. L'idée clé est que chaque période de capitalisation ajoute des intérêts non seulement sur votre dépôt initial, mais aussi sur tous les intérêts précédemment gagnés. Cela crée un effet boule de neige où la croissance s'accélère dans le temps. Plus les intérêts se capitalisent fréquemment — quotidiennement versus annuellement, par exemple — plus votre investissement croît rapidement, bien que la différence entre des périodes de capitalisation très fréquentes devienne marginale."
        },
        "howItWorks": {
          "title": "Comment les Intérêts Composés sont Calculés",
          "content": "La formule des intérêts composés est A = P(1 + r/n)^(nt), où A est le montant final, P est le capital, r est le taux d'intérêt annuel en décimal, n est le nombre de périodes de capitalisation par an, et t est le temps en années. Pour la capitalisation continue, la formule devient A = Pe^(rt), utilisant le nombre d'Euler. Quand des contributions régulières sont incluses, la formule de valeur future d'une rente est ajoutée : VF = PMT × [((1 + r/n)^(nt) - 1) / (r/n)]. Pour les contributions en début de période, ceci est multiplié par (1 + r/n). Le taux effectif annuel (TEG) est calculé comme (1 + r/n)^n - 1, qui montre le vrai rendement annuel tenant compte de la fréquence de capitalisation."
        },
        "considerations": {
          "title": "Facteurs Clés Affectant les Intérêts",
          "items": [
            {
              "text": "Des taux d'intérêt plus élevés augmentent dramatiquement les rendements long terme grâce à la capitalisation",
              "type": "info"
            },
            {
              "text": "La fréquence de capitalisation compte — quotidienne rapporte plus qu'annuelle, mais la différence diminue à hautes fréquences",
              "type": "info"
            },
            {
              "text": "Le temps est le facteur le plus puissant — doubler votre horizon peut plus que doubler vos intérêts totaux",
              "type": "info"
            },
            {
              "text": "Les contributions régulières peuvent surpasser un dépôt initial plus important sur de longues périodes",
              "type": "warning"
            },
            {
              "text": "Les impôts sur les revenus d'intérêts peuvent réduire significativement les rendements effectifs — considérez les comptes avantagés fiscalement",
              "type": "warning"
            },
            {
              "text": "L'inflation érode le pouvoir d'achat — un rendement de 7% avec 3% d'inflation représente réellement environ 4% de croissance réelle",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Comptes Porteurs d'Intérêts Courants",
          "items": [
            {
              "text": "Comptes Épargne à Haut Rendement : Actuellement 4-5% TEG avec garantie dépôts et capitalisation quotidienne",
              "type": "info"
            },
            {
              "text": "Comptes à Terme (CAT) : Taux fixes de 4-5% pour bloquer l'argent sur des durées spécifiques",
              "type": "info"
            },
            {
              "text": "Comptes du Marché Monétaire : Similaires à l'épargne avec taux légèrement supérieurs et transactions limitées",
              "type": "info"
            },
            {
              "text": "Obligations d'État & OATi : Garanties gouvernementales avec protection inflation, intérêts semestriels",
              "type": "info"
            },
            {
              "text": "Obligations Entreprises : Rendements supérieurs aux obligations d'État mais avec risque crédit, capitalisation variable",
              "type": "info"
            },
            {
              "text": "Fonds Indiciels : Rendements moyens 7-10% annuels historiquement avec croissance capitalisée par réinvestissement",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples d'Intérêts Composés",
          "description": "Voyez comment différents scénarios affectent la croissance de votre investissement",
          "examples": [
            {
              "title": "10 000€ à 5% pendant 10 ans (Mensuel)",
              "steps": [
                "Capital (P) = 10 000€",
                "Taux (r) = 0,05, Périodes (n) = 12, Temps (t) = 10",
                "A = 10 000 × (1 + 0,05/12)^(12×10)",
                "A = 10 000 × (1,004167)^120",
                "A = 10 000 × 1,6470"
              ],
              "result": "Solde Final : 16 470,09€ — Intérêts : 6 470,09€ (64,7% de croissance)"
            },
            {
              "title": "5 000€ + 200€/mois à 7% pendant 20 ans",
              "steps": [
                "Initial = 5 000€, Mensuel = 200€, Taux = 7%, Capitalisation mensuelle",
                "Initial croît : 5 000 × (1 + 0,07/12)^240 = 20 322,73€",
                "VF contributions : 200 × [((1,00583)^240 - 1) / 0,00583] = 103 838,20€",
                "Total dépôts : 5 000€ + (200€ × 240) = 53 000€",
                "Total intérêts gagnés : 71 160,93€"
              ],
              "result": "Solde Final : 124 160,93€ — Vous avez déposé 53K€, gagné 71K€ d'intérêts !"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la différence entre intérêts composés et intérêts simples ?",
          "answer": "Les intérêts simples sont calculés uniquement sur le montant principal original. Les intérêts composés sont calculés sur le principal plus tous les intérêts précédemment gagnés. Dans le temps, les intérêts composés rapportent significativement plus car vous gagnez des intérêts sur vos intérêts. Par exemple, 10 000€ à 5% d'intérêts simples rapporte 500€/an chaque année. Avec les intérêts composés, vous gagnez 500€ la première année, puis 525€ la deuxième année (5% de 10 500€), et le montant continue de croître."
        },
        {
          "question": "Comment la fréquence de capitalisation affecte-t-elle mes rendements ?",
          "answer": "Une capitalisation plus fréquente produit des rendements légèrement supérieurs. La capitalisation quotidienne à 5% donne un taux effectif annuel (TEG) de 5,127%, tandis que la capitalisation annuelle reste exactement à 5%. La différence est plus notable à des taux d'intérêt plus élevés et sur des périodes plus longues. Cependant, l'écart entre capitalisation quotidienne et mensuelle est assez faible — environ 0,01% de différence aux taux d'épargne typiques."
        },
        {
          "question": "Qu'est-ce que le TEG et en quoi diffère-t-il du taux nominal ?",
          "answer": "Le taux nominal est le taux d'intérêt annuel déclaré sans tenir compte de la capitalisation. Le TEG (Taux Effectif Global) est le taux annuel effectif qui inclut l'effet de la capitalisation. Un taux nominal de 5% capitalisé mensuellement produit un TEG de 5,116%. Les banques annoncent le TEG sur l'épargne (chiffre plus élevé paraît mieux) et le taux nominal sur les prêts (chiffre plus bas paraît mieux). Comparez toujours TEG à TEG pour une comparaison précise."
        },
        {
          "question": "Dois-je contribuer en début ou fin de période ?",
          "answer": "Contribuer en début de chaque période (rente due) rapporte plus qu'en fin de période (rente ordinaire) car chaque contribution bénéficie d'une période de capitalisation supplémentaire. La différence est typiquement faible sur de courtes durées mais peut s'additionner sur des décennies. Pour une contribution de 500€/mois à 7% sur 30 ans, le début de période ajoute environ 25 000€ de plus que la fin de période."
        },
        {
          "question": "Comment fonctionne la Règle de 72 ?",
          "answer": "La Règle de 72 est un moyen rapide d'estimer combien de temps il faut pour doubler votre argent. Divisez 72 par le taux d'intérêt annuel : à 6%, votre argent double en environ 12 ans (72 ÷ 6 = 12). À 8%, cela prend environ 9 ans. À 3%, environ 24 ans. Cette règle est plus précise pour les taux entre 6-10% et suppose des intérêts composés sans contributions supplémentaires."
        },
        {
          "question": "Comment les impôts affectent-ils la croissance des intérêts composés ?",
          "answer": "Les impôts sur les revenus d'intérêts réduisent votre rendement effectif. Si vous gagnez 5% d'intérêts et payez 25% d'impôts, votre rendement après impôts est de 3,75%. Cet impact se compose dans le temps — sur 20 ans, la différence entre rendements avant et après impôts peut être substantielle. Les comptes avantagés fiscalement comme les PEA, assurances-vie, et comptes retraite laissent les intérêts se capitaliser en franchise ou report d'impôt, boostant significativement la croissance long terme."
        }
      ],
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
      "name": "Zinsrechner",
      "slug": "zinsrechner",
      "breadcrumb": "Zinsrechner",
      "seo": {
        "title": "Zinsrechner - Zinseszins & Einfacher Zins Werkzeug",
        "description": "Berechnen Sie Zinseszins und einfache Zinsen für Ihre Ersparnisse und Investitionen. Sehen Sie Wachstumsprognosen mit Diagrammen, Steuerauswirkungen und Inflationsanpassung. Kostenloses Online-Tool.",
        "shortDescription": "Berechnen Sie Zinseszins mit Einzahlungen und Steuerauswirkungen.",
        "keywords": [
          "zinsrechner",
          "zinseszinsrechner",
          "einfacher zinsrechner",
          "sparzinsrechner",
          "investitionswachstumsrechner",
          "effektivzinsrechner",
          "kostenloser zinsrechner",
          "zinseszinsformel"
        ]
      },
      "subtitle": "Berechnen Sie, wie Ihr Geld mit Zinseszins und regelmäßigen Einzahlungen wächst, und sehen Sie Jahr-für-Jahr-Prognosen.",
      "inputs": {
        "initialDeposit": {
          "label": "Anfangseinlage",
          "helpText": "Der Startbetrag, den Sie heute investieren oder einzahlen"
        },
        "annualContribution": {
          "label": "Jährliche Einzahlung",
          "helpText": "Zusätzliche Einmalzahlung, die einmal pro Jahr hinzugefügt wird"
        },
        "monthlyContribution": {
          "label": "Monatliche Einzahlung",
          "helpText": "Betrag, der jeden Monat zu Ihrer Investition hinzugefügt wird"
        },
        "contributeAt": {
          "label": "Einzahlung zu",
          "helpText": "Wann Einzahlungen während jeder Periode hinzugefügt werden",
          "options": {
            "beginning": "Beginn der Periode",
            "end": "Ende der Periode"
          }
        },
        "interestRate": {
          "label": "Jährlicher Zinssatz",
          "helpText": "Der jährliche Zinssatz (Nominalzins) auf Ihre Investition"
        },
        "compoundFrequency": {
          "label": "Zinseszinshäufigkeit",
          "helpText": "Wie oft Zinsen berechnet und zu Ihrem Guthaben hinzugefügt werden",
          "options": {
            "daily": "Täglich (365/Jahr)",
            "weekly": "Wöchentlich (52/Jahr)",
            "biweekly": "Zweiwöchentlich (26/Jahr)",
            "semimonthly": "Halbmonatlich (24/Jahr)",
            "monthly": "Monatlich (12/Jahr)",
            "quarterly": "Vierteljährlich (4/Jahr)",
            "semiannually": "Halbjährlich (2/Jahr)",
            "annually": "Jährlich (1/Jahr)",
            "continuously": "Kontinuierlich"
          }
        },
        "investmentYears": {
          "label": "Jahre",
          "helpText": "Anzahl der Jahre für die Investition"
        },
        "investmentMonths": {
          "label": "Monate",
          "helpText": "Zusätzliche Monate über die vollen Jahre hinaus"
        },
        "includeTax": {
          "label": "Steuer auf Zinsen einbeziehen",
          "helpText": "Berechnen Sie die Auswirkung von Steuern auf Ihre Zinserträge"
        },
        "taxRate": {
          "label": "Steuersatz",
          "helpText": "Ihr Grenzsteuersatz, der auf Zinseinkommen angewendet wird"
        },
        "includeInflation": {
          "label": "Für Inflation anpassen",
          "helpText": "Zeigen Sie die reale Kaufkraft Ihres zukünftigen Guthabens"
        },
        "inflationRate": {
          "label": "Inflationsrate",
          "helpText": "Erwartete durchschnittliche jährliche Inflationsrate"
        }
      },
      "results": {
        "endingBalance": {
          "label": "Endguthaben"
        },
        "totalInterest": {
          "label": "Gesamte Zinserträge"
        },
        "totalContributions": {
          "label": "Gesamte Einzahlungen"
        },
        "totalDeposited": {
          "label": "Gesamteinzahlung"
        },
        "interestFromInitial": {
          "label": "Zinsen auf Anfangseinlage"
        },
        "interestFromContributions": {
          "label": "Zinsen auf Einzahlungen"
        },
        "effectiveAnnualRate": {
          "label": "Effektiver Jahreszins (Effektivzins)"
        },
        "taxPaid": {
          "label": "Steuer auf Zinsen"
        },
        "afterTaxBalance": {
          "label": "Guthaben nach Steuern"
        },
        "buyingPower": {
          "label": "Kaufkraft (Inflationsbereinigt)"
        }
      },
      "presets": {
        "emergencyFund": {
          "label": "Notfallfonds",
          "description": "5.000€ Start, 500€/Monat für 3 Jahre bei 4,5%"
        },
        "savingsAccount": {
          "label": "Sparkonto",
          "description": "10.000€ Start, 200€/Monat für 5 Jahre bei 5%"
        },
        "longTermGrowth": {
          "label": "Langfristiges Wachstum",
          "description": "25.000€ Start, 500€/Monat für 20 Jahre bei 7%"
        },
        "cdInvestment": {
          "label": "Festgeldanlage",
          "description": "50.000€ Einmalzahlung für 2 Jahre bei 4,75%"
        },
        "retirementBoost": {
          "label": "Rentenaufstockung",
          "description": "100.000€ Start, 1.000€/Monat für 30 Jahre bei 8%"
        }
      },
      "values": {
        "years": "Jahre",
        "year": "Jahr",
        "months": "Monate",
        "month": "Monat",
        "perYear": "/Jahr",
        "of": "von"
      },
      "formats": {
        "summary": "Ihre Investition wird über {duration} auf {endingBalance} anwachsen und {totalInterest} an Zinsen erwirtschaften."
      },
      "infoCards": {
        "metrics": {
          "title": "Wachstumseinblicke",
          "items": [
            {
              "label": "Gesamtwachstumsfaktor",
              "valueKey": "growthMultiplier"
            },
            {
              "label": "Zinsen als % der Gesamtsumme",
              "valueKey": "interestPercent"
            },
            {
              "label": "Durchschnittliche monatliche Zinsen",
              "valueKey": "avgMonthlyInterest"
            },
            {
              "label": "Verdopplungszeit (72er-Regel)",
              "valueKey": "doublingTime"
            }
          ]
        },
        "details": {
          "title": "Tiefgehende Analyse",
          "items": [
            {
              "label": "Gesamtrendite der Investition",
              "valueKey": "totalROI"
            },
            {
              "label": "Zinseszins- vs. Einfachzinsbonus",
              "valueKey": "compoundBonus"
            },
            {
              "label": "Zinsen pro eingezahltem Euro",
              "valueKey": "interestPerDollar"
            },
            {
              "label": "Zinsen im letzten Jahr",
              "valueKey": "finalYearInterest"
            }
          ]
        },
        "tips": {
          "title": "Tipps zur Zinsmaximierung",
          "items": [
            "Höhere Zinseszinshäufigkeit bedeutet etwas mehr Zinserträge — täglich schlägt monatlich",
            "Einzahlungen zu Beginn jeder Periode bringen mehr als am Ende",
            "Auch kleine monatliche Einzahlungen verstärken sich über Jahrzehnte dramatisch",
            "Berücksichtigen Sie die reale Rendite nach Inflation bei der Planung langfristiger Sparziele"
          ]
        }
      },
      "chart": {
        "title": "Investitionswachstum über die Zeit",
        "xLabel": "Jahr",
        "yLabel": "Guthaben",
        "series": {
          "deposits": "Gesamteinzahlungen",
          "interest": "Zinserträge",
          "balance": "Gesamtguthaben"
        }
      },
      "detailedTable": {
        "growthTable": {
          "button": "Jahr-für-Jahr-Wachstumstabelle anzeigen",
          "title": "Jahr-für-Jahr-Wachstumsaufschlüsselung",
          "columns": {
            "year": "Jahr",
            "deposit": "Einzahlungen",
            "interest": "Zinsen",
            "totalDeposited": "Gesamteinzahlungen",
            "totalInterest": "Gesamtzinsen",
            "balance": "Guthaben"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist Zinseszins?",
          "content": "Zinseszins sind die Zinsen, die sowohl auf das ursprüngliche Kapital als auch auf die angesammelten Zinsen aus früheren Perioden berechnet werden. Anders als einfache Zinsen, die nur auf das Kapital berechnet werden, ermöglicht Zinseszins exponentielles Wachstum Ihres Geldes über die Zeit. Albert Einstein nannte es angeblich das achte Weltwunder. Die wichtigste Erkenntnis ist, dass jede Zinsperiode nicht nur Zinsen auf Ihre ursprüngliche Einzahlung hinzufügt, sondern auch auf alle zuvor verdienten Zinsen. Dies erzeugt einen Schneeballeffekt, bei dem sich das Wachstum über die Zeit beschleunigt. Je häufiger Zinsen kapitalisiert werden — täglich versus jährlich — desto schneller wächst Ihre Investition, obwohl der Unterschied zwischen sehr häufigen Zinsperioden marginal wird."
        },
        "howItWorks": {
          "title": "Wie Zinseszins berechnet wird",
          "content": "Die Zinseszinsformel ist A = P(1 + r/n)^(nt), wobei A der Endbetrag ist, P das Kapital, r der jährliche Zinssatz als Dezimalzahl, n die Anzahl der Zinsperioden pro Jahr und t die Zeit in Jahren. Für kontinuierliche Kapitalisierung wird die Formel zu A = Pe^(rt) unter Verwendung der Eulerschen Zahl. Wenn regelmäßige Einzahlungen einbezogen werden, wird die Zukunftswertformel einer Annuität hinzugefügt: FV = PMT × [((1 + r/n)^(nt) - 1) / (r/n)]. Für Einzahlungen zu Periodenbeginn wird dies mit (1 + r/n) multipliziert. Der effektive Jahreszins wird als (1 + r/n)^n - 1 berechnet, was die wahre jährliche Rendite unter Berücksichtigung der Zinseszinshäufigkeit zeigt."
        },
        "considerations": {
          "title": "Schlüsselfaktoren, die Zinsen beeinflussen",
          "items": [
            {
              "text": "Höhere Zinssätze erhöhen langfristige Renditen aufgrund von Zinseszins dramatisch",
              "type": "info"
            },
            {
              "text": "Zinseszinshäufigkeit ist wichtig — tägliche Kapitalisierung bringt mehr als jährliche, aber der Unterschied nimmt bei höheren Frequenzen ab",
              "type": "info"
            },
            {
              "text": "Zeit ist der mächtigste Faktor — Verdopplung Ihres Zeithorizonts kann Ihre Gesamtzinsen mehr als verdoppeln",
              "type": "info"
            },
            {
              "text": "Regelmäßige Einzahlungen können über lange Zeiträume eine größere Anfangseinlage überwiegen",
              "type": "warning"
            },
            {
              "text": "Steuern auf Zinseinkommen können effektive Renditen erheblich reduzieren — erwägen Sie steuerbegünstigte Konten",
              "type": "warning"
            },
            {
              "text": "Inflation mindert die Kaufkraft — 7% Rendite bei 3% Inflation sind real etwa 4% Wachstum",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Gängige zinstragende Konten",
          "items": [
            {
              "text": "Hochzins-Sparkonten: Derzeit 4-5% Effektivzins mit Einlagensicherung und täglicher Kapitalisierung",
              "type": "info"
            },
            {
              "text": "Festgeld: Feste Zinssätze von 4-5% für die Bindung von Geld über bestimmte Laufzeiten",
              "type": "info"
            },
            {
              "text": "Geldmarktkonten: Ähnlich wie Sparkonten mit etwas höheren Zinsen und begrenzten Transaktionen",
              "type": "info"
            },
            {
              "text": "Staatsanleihen: Staatlich garantiert mit Inflationsschutz, halbjährliche Zinsen",
              "type": "info"
            },
            {
              "text": "Unternehmensanleihen: Höhere Renditen als Staatsanleihen aber mit Kreditrisiko, verschiedene Kapitalisierung",
              "type": "info"
            },
            {
              "text": "Indexfonds: Historisch durchschnittlich 7-10% jährliche Renditen mit durch Wiederanlage kapitalisiertem Wachstum",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Zinseszins-Beispiele",
          "description": "Sehen Sie, wie verschiedene Szenarien Ihr Investitionswachstum beeinflussen",
          "examples": [
            {
              "title": "10.000€ bei 5% für 10 Jahre (Monatlich)",
              "steps": [
                "Kapital (P) = 10.000€",
                "Zinssatz (r) = 0,05, Perioden (n) = 12, Zeit (t) = 10",
                "A = 10.000 × (1 + 0,05/12)^(12×10)",
                "A = 10.000 × (1,004167)^120",
                "A = 10.000 × 1,6470"
              ],
              "result": "Endguthaben: 16.470,09€ — Zinsen: 6.470,09€ (64,7% Wachstum)"
            },
            {
              "title": "5.000€ + 200€/Monat bei 7% für 20 Jahre",
              "steps": [
                "Anfangsbetrag = 5.000€, Monatlich = 200€, Zinssatz = 7%, Monatliche Kapitalisierung",
                "Anfangsbetrag wächst: 5.000 × (1 + 0,07/12)^240 = 20.322,73€",
                "Einzahlungen ZW: 200 × [((1,00583)^240 - 1) / 0,00583] = 103.838,20€",
                "Gesamteinzahlungen: 5.000€ + (200€ × 240) = 53.000€",
                "Gesamtzinserträge: 71.160,93€"
              ],
              "result": "Endguthaben: 124.160,93€ — Sie zahlten 53.000€ ein, verdienten 71.000€ Zinsen!"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist der Unterschied zwischen Zinseszins und einfachen Zinsen?",
          "answer": "Einfache Zinsen werden nur auf den ursprünglichen Kapitalbetrag berechnet. Zinseszins wird auf das Kapital plus alle zuvor verdienten Zinsen berechnet. Über die Zeit erwirtschaftet Zinseszins deutlich mehr, weil Sie Zinsen auf Ihre Zinsen verdienen. Beispiel: 10.000€ bei 5% einfachen Zinsen verdienen jedes Jahr 500€. Mit Zinseszins verdienen Sie im ersten Jahr 500€, dann 525€ im zweiten Jahr (5% von 10.500€), und der Betrag wächst weiter."
        },
        {
          "question": "Wie beeinflusst die Zinseszinshäufigkeit meine Renditen?",
          "answer": "Häufigere Kapitalisierung erzeugt etwas höhere Renditen. Tägliche Kapitalisierung bei 5% ergibt einen effektiven Jahreszins von 5,127%, während jährliche Kapitalisierung bei genau 5% bleibt. Der Unterschied ist bei höheren Zinssätzen und über längere Zeiträume am deutlichsten. Jedoch ist die Lücke zwischen täglicher und monatlicher Kapitalisierung ziemlich klein — etwa 0,01% Unterschied bei typischen Sparzinsen."
        },
        {
          "question": "Was ist der Effektivzins und wie unterscheidet er sich vom Nominalzins?",
          "answer": "Der Nominalzins ist der angegebene jährliche Zinssatz ohne Berücksichtigung der Kapitalisierung. Der Effektivzins ist der tatsächliche Jahreszins, der die Auswirkung der Kapitalisierung einschließt. Ein 5% Nominalzins mit monatlicher Kapitalisierung erzeugt 5,116% Effektivzins. Banken bewerben Effektivzinsen bei Sparkonten (höhere Zahl sieht besser aus) und Nominalzinsen bei Krediten (niedrigere Zahl sieht besser aus). Vergleichen Sie immer Effektivzins mit Effektivzins für einen genauen Vergleich."
        },
        {
          "question": "Sollte ich zu Beginn oder Ende der Periode einzahlen?",
          "answer": "Einzahlungen zu Beginn jeder Periode (vorschüssige Rente) bringen mehr als Einzahlungen am Ende (nachschüssige Rente), weil jede Einzahlung eine zusätzliche Zinsperiode hat. Der Unterschied ist typischerweise klein für kurze Zeiträume, kann sich aber über Jahrzehnte summieren. Für eine 500€/Monat-Einzahlung bei 7% über 30 Jahre bringen Einzahlungen zu Periodenbeginn etwa 25.000€ mehr als am Periodenende."
        },
        {
          "question": "Wie funktioniert die 72er-Regel?",
          "answer": "Die 72er-Regel ist ein schneller Weg, um abzuschätzen, wie lange es dauert, Ihr Geld zu verdoppeln. Teilen Sie 72 durch den jährlichen Zinssatz: Bei 6% verdoppelt sich Ihr Geld in etwa 12 Jahren (72 ÷ 6 = 12). Bei 8% dauert es etwa 9 Jahre. Bei 3% etwa 24 Jahre. Diese Regel ist am genauesten für Zinssätze zwischen 6-10% und setzt Zinseszins ohne zusätzliche Einzahlungen voraus."
        },
        {
          "question": "Wie beeinflussen Steuern das Zinseszinswachstum?",
          "answer": "Steuern auf Zinseinkommen reduzieren Ihre effektive Rendite. Wenn Sie 5% Zinsen verdienen und 25% Steuern zahlen, ist Ihre Rendite nach Steuern 3,75%. Diese Auswirkung verstärkt sich über die Zeit — über 20 Jahre kann der Unterschied zwischen Renditen vor und nach Steuern erheblich sein. Steuerbegünstigte Konten wie Riester-Renten, Rürup-Renten und betriebliche Altersvorsorge lassen Zinsen steuerfrei oder steueraufgeschoben kapitalisieren, was das langfristige Wachstum erheblich steigert."
        }
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
  },

  // ─── INPUTS ─────────────────────────────────────────────────────
  inputs: [
    {
      id: "initialDeposit",
      type: "number",
      defaultValue: null,
      placeholder: "10000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 100000000,
    },
    {
      id: "annualContribution",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 10000000,
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
      max: 1000000,
    },
    {
      id: "contributeAt",
      type: "radio",
      defaultValue: "end",
      options: [{ value: "beginning" }, { value: "end" }],
    },
    {
      id: "interestRate",
      type: "number",
      defaultValue: 5.0,
      min: 0,
      max: 50,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "compoundFrequency",
      type: "select",
      defaultValue: "monthly",
      options: [
        { value: "daily" },
        { value: "weekly" },
        { value: "biweekly" },
        { value: "semimonthly" },
        { value: "monthly" },
        { value: "quarterly" },
        { value: "semiannually" },
        { value: "annually" },
        { value: "continuously" },
      ],
    },
    {
      id: "investmentYears",
      type: "number",
      defaultValue: 5,
      min: 0,
      max: 100,
      step: 1,
      suffix: "years",
      width: "half",
    },
    {
      id: "investmentMonths",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 11,
      step: 1,
      suffix: "months",
      width: "half",
    },
    {
      id: "includeTax",
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
      showWhen: { field: "includeTax", value: true },
    },
    {
      id: "includeInflation",
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
      showWhen: { field: "includeInflation", value: true },
    },
  ],

  inputGroups: [],

  // ─── RESULTS ────────────────────────────────────────────────────
  results: [
    { id: "endingBalance", type: "primary", format: "number" },
    { id: "totalInterest", type: "secondary", format: "number" },
    { id: "totalContributions", type: "secondary", format: "number" },
    { id: "totalDeposited", type: "secondary", format: "number" },
    { id: "effectiveAnnualRate", type: "secondary", format: "percent" },
    { id: "taxPaid", type: "secondary", format: "number" },
    { id: "afterTaxBalance", type: "secondary", format: "number" },
    { id: "buyingPower", type: "secondary", format: "number" },
  ],

  // ─── INFOCARDS ──────────────────────────────────────────────────
  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "🔍", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ──────────────────────────────────────────────────────
  chart: {
    id: "interestGrowth",
    type: "composed",
    xKey: "year",
    height: 340,
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "deposits", type: "area", stackId: "growth", color: "#3b82f6" },
      { key: "interest", type: "area", stackId: "growth", color: "#10b981" },
    ],
  },

  // ─── DETAILED TABLE ─────────────────────────────────────────────
  detailedTable: {
    id: "growthTable",
    buttonLabel: "View Year-by-Year Growth Table",
    buttonIcon: "📅",
    modalTitle: "Year-by-Year Growth Breakdown",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "deposit", label: "Deposits", align: "right" },
      { id: "interest", label: "Interest", align: "right" },
      { id: "totalDeposited", label: "Total Deposited", align: "right" },
      { id: "totalInterest", label: "Total Interest", align: "right", highlight: true },
      { id: "balance", label: "Balance", align: "right", highlight: true },
    ],
  },

  referenceData: [],

  // ─── EDUCATION ──────────────────────────────────────────────────
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ─── FAQS ───────────────────────────────────────────────────────
  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  // ─── REFERENCES ─────────────────────────────────────────────────
  references: [
    {
      authors: "U.S. Securities and Exchange Commission",
      year: "2024",
      title: "Compound Interest Calculator — Investor.gov",
      source: "SEC / Investor.gov",
      url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
    },
    {
      authors: "Federal Deposit Insurance Corporation",
      year: "2024",
      title: "Truth in Savings: Annual Percentage Yield (APY) Regulations",
      source: "FDIC",
      url: "https://www.fdic.gov/regulations/laws/rules/6500-3270.html",
    },
  ],

  hero: {
    badge: "Finance",
    headline: "Interest Calculator",
  },
  sidebar: {},
  features: {},
  relatedCalculators: [
    "savings-calculator",
    "investment-calculator",
    "compound-interest-calculator",
    "retirement-calculator",
  ],
  ads: {},
};

// ═══════════════════════════════════════════════════════════════════
// 🧮 CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════

export function calculateInterestCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Read inputs ────────────────────────────────────────────
  const initialDeposit = (values.initialDeposit as number | null) ?? 0;
  const annualContribution = (values.annualContribution as number | null) ?? 0;
  const monthlyContribution = (values.monthlyContribution as number | null) ?? 0;
  const contributeAt = (values.contributeAt as string) || "end";
  const interestRate = (values.interestRate as number | null) ?? 5;
  const compoundFrequency = (values.compoundFrequency as string) || "monthly";
  const investmentYears = (values.investmentYears as number | null) ?? 0;
  const investmentMonths = (values.investmentMonths as number | null) ?? 0;
  const includeTax = values.includeTax === true;
  const taxRate = includeTax ? ((values.taxRate as number | null) ?? 25) : 0;
  const includeInflation = values.includeInflation === true;
  const inflationRate = includeInflation ? ((values.inflationRate as number | null) ?? 3) : 0;

  // ─── Validate ───────────────────────────────────────────────
  const totalMonths = investmentYears * 12 + investmentMonths;
  if (totalMonths <= 0 || (initialDeposit <= 0 && monthlyContribution <= 0 && annualContribution <= 0)) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ─── Compounding map ────────────────────────────────────────
  const compoundingMap: Record<string, number> = {
    continuously: Infinity,
    daily: 365,
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
    quarterly: 4,
    semiannually: 2,
    annually: 1,
  };

  const n = compoundingMap[compoundFrequency] || 12;
  const r = interestRate / 100;
  const totalYears = totalMonths / 12;

  // ─── Calculate month by month for accuracy ──────────────────
  let balance = initialDeposit;
  let totalInterestEarned = 0;
  let totalDepositedSoFar = initialDeposit;
  let interestOnInitial = 0;
  let interestOnContributions = 0;

  // Track initial deposit portion vs contribution portion
  let initialPortion = initialDeposit;
  let contributionPortion = 0;

  // Chart data & table data
  const chartData: Array<Record<string, unknown>> = [];
  const tableData: Array<Record<string, unknown>> = [];

  // Year 0
  chartData.push({
    year: "0",
    deposits: initialDeposit,
    interest: 0,
    balance: initialDeposit,
  });

  const totalYearsInt = Math.ceil(totalYears);

  for (let year = 1; year <= totalYearsInt; year++) {
    const monthsThisYear = year === totalYearsInt && totalMonths % 12 !== 0
      ? totalMonths % 12
      : 12;

    let yearDeposits = 0;
    let yearInterest = 0;

    // Annual contribution at start of year
    if (annualContribution > 0 && year <= Math.floor(totalYears) + (totalMonths % 12 > 0 ? 1 : 0)) {
      if (contributeAt === "beginning") {
        balance += annualContribution;
        contributionPortion += annualContribution;
        totalDepositedSoFar += annualContribution;
        yearDeposits += annualContribution;
      }
    }

    for (let month = 1; month <= monthsThisYear; month++) {
      // Monthly contribution
      if (monthlyContribution > 0) {
        if (contributeAt === "beginning") {
          balance += monthlyContribution;
          contributionPortion += monthlyContribution;
          totalDepositedSoFar += monthlyContribution;
          yearDeposits += monthlyContribution;
        }
      }

      // Calculate interest for this month
      let monthInterest: number;
      if (n === Infinity) {
        // Continuous compounding: monthly approximation
        monthInterest = balance * (Math.exp(r / 12) - 1);
      } else {
        // Discrete compounding approximation per month
        const periodsPerMonth = n / 12;
        if (periodsPerMonth >= 1) {
          // Multiple compounding events per month
          let tempBalance = balance;
          const ratePerPeriod = r / n;
          const events = Math.round(periodsPerMonth);
          for (let e = 0; e < events; e++) {
            tempBalance += tempBalance * ratePerPeriod;
          }
          monthInterest = tempBalance - balance;
        } else {
          // Less than monthly compounding — use proportional
          monthInterest = balance * (Math.pow(1 + r / n, n / 12) - 1);
        }
      }

      // Track interest by source (proportional)
      if (balance > 0) {
        const initialRatio = initialPortion / balance;
        const contribRatio = contributionPortion / balance;
        interestOnInitial += monthInterest * initialRatio;
        interestOnContributions += monthInterest * contribRatio;
      }

      balance += monthInterest;
      initialPortion += monthInterest * (balance > 0 ? initialPortion / (balance) : 0);
      contributionPortion += monthInterest * (balance > 0 ? contributionPortion / (balance) : 0);
      // Re-adjust to keep proportions correct
      const totalPortion = initialPortion + contributionPortion;
      if (totalPortion > 0) {
        initialPortion = (initialPortion / totalPortion) * balance;
        contributionPortion = (contributionPortion / totalPortion) * balance;
      }

      totalInterestEarned += monthInterest;
      yearInterest += monthInterest;

      // End-of-period monthly contribution
      if (monthlyContribution > 0 && contributeAt === "end") {
        balance += monthlyContribution;
        contributionPortion += monthlyContribution;
        totalDepositedSoFar += monthlyContribution;
        yearDeposits += monthlyContribution;
      }
    }

    // Annual contribution at end of year
    if (annualContribution > 0 && contributeAt === "end" && year <= Math.floor(totalYears)) {
      balance += annualContribution;
      contributionPortion += annualContribution;
      totalDepositedSoFar += annualContribution;
      yearDeposits += annualContribution;
    }

    // Chart & table data
    chartData.push({
      year: `${year}`,
      deposits: Math.round(totalDepositedSoFar),
      interest: Math.round(totalInterestEarned),
      balance: Math.round(balance),
    });

    tableData.push({
      year: `${year}`,
      deposit: fmtCurr(yearDeposits, sym(fieldUnits)),
      interest: fmtCurr(yearInterest, sym(fieldUnits)),
      totalDeposited: fmtCurr(totalDepositedSoFar, sym(fieldUnits)),
      totalInterest: fmtCurr(totalInterestEarned, sym(fieldUnits)),
      balance: fmtCurr(balance, sym(fieldUnits)),
    });
  }

  // ─── Effective Annual Rate (APY) ────────────────────────────
  let effectiveRate: number;
  if (n === Infinity) {
    effectiveRate = (Math.exp(r) - 1) * 100;
  } else {
    effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;
  }

  // ─── Tax calculations ──────────────────────────────────────
  const taxPaidAmount = includeTax ? totalInterestEarned * (taxRate / 100) : 0;
  const afterTaxBalance = balance - taxPaidAmount;

  // ─── Inflation adjustment ──────────────────────────────────
  const inflationFactor = includeInflation
    ? Math.pow(1 + inflationRate / 100, totalYears)
    : 1;
  const buyingPowerAmount = balance / inflationFactor;

  // ─── Duration label ─────────────────────────────────────────
  const yrLabel = investmentYears === 1 ? (v["year"] || "year") : (v["years"] || "years");
  const moLabel = investmentMonths === 1 ? (v["month"] || "month") : (v["months"] || "months");
  let duration = "";
  if (investmentYears > 0 && investmentMonths > 0) {
    duration = `${investmentYears} ${yrLabel} ${investmentMonths} ${moLabel}`;
  } else if (investmentYears > 0) {
    duration = `${investmentYears} ${yrLabel}`;
  } else {
    duration = `${investmentMonths} ${moLabel}`;
  }

  // ─── Currency symbol ────────────────────────────────────────
  const currSym = sym(fieldUnits);

  // ─── NEW: InfoCard-only computed values ──────────────────────
  const growthMultiplier = totalDepositedSoFar > 0 ? balance / totalDepositedSoFar : 0;
  const interestPercentOfTotal = balance > 0 ? (totalInterestEarned / balance) * 100 : 0;
  const avgMonthlyInterestVal = totalMonths > 0 ? totalInterestEarned / totalMonths : 0;
  const doublingTimeYears = interestRate > 0 ? 72 / interestRate : 0;
  const totalROI = totalDepositedSoFar > 0 ? (totalInterestEarned / totalDepositedSoFar) * 100 : 0;
  const simpleInterest = totalDepositedSoFar * r * totalYears;
  const compoundBonusVal = totalInterestEarned - simpleInterest;
  const interestPerDollarVal = totalDepositedSoFar > 0 ? totalInterestEarned / totalDepositedSoFar : 0;
  const lastYearData = tableData.length > 0 ? tableData[tableData.length - 1] : null;

  // ─── Format results ─────────────────────────────────────────
  const summary = (f.summary || "Your investment will grow to {endingBalance} over {duration}, earning {totalInterest} in interest.")
    .replace("{endingBalance}", fmtCurr(balance, currSym))
    .replace("{duration}", duration)
    .replace("{totalInterest}", fmtCurr(totalInterestEarned, currSym));

  return {
    values: {
      endingBalance: Math.round(balance * 100) / 100,
      totalInterest: Math.round(totalInterestEarned * 100) / 100,
      totalContributions: Math.round((totalDepositedSoFar - initialDeposit) * 100) / 100,
      totalDeposited: Math.round(totalDepositedSoFar * 100) / 100,
      interestFromInitial: Math.round(interestOnInitial * 100) / 100,
      interestFromContributions: Math.round(interestOnContributions * 100) / 100,
      effectiveAnnualRate: Math.round(effectiveRate * 1000) / 1000,
      taxPaid: Math.round(taxPaidAmount * 100) / 100,
      afterTaxBalance: Math.round(afterTaxBalance * 100) / 100,
      buyingPower: Math.round(buyingPowerAmount * 100) / 100,
      growthMultiplier: Math.round(growthMultiplier * 100) / 100,
      interestPercent: Math.round(interestPercentOfTotal * 10) / 10,
      avgMonthlyInterest: Math.round(avgMonthlyInterestVal * 100) / 100,
      doublingTime: Math.round(doublingTimeYears * 10) / 10,
      totalROI: Math.round(totalROI * 10) / 10,
      compoundBonus: Math.round(compoundBonusVal * 100) / 100,
      interestPerDollar: Math.round(interestPerDollarVal * 100) / 100,
    },
    formatted: {
      endingBalance: fmtCurr(balance, currSym),
      totalInterest: fmtCurr(totalInterestEarned, currSym),
      totalContributions: fmtCurr(totalDepositedSoFar - initialDeposit, currSym),
      totalDeposited: fmtCurr(totalDepositedSoFar, currSym),
      interestFromInitial: fmtCurr(interestOnInitial, currSym),
      interestFromContributions: fmtCurr(interestOnContributions, currSym),
      effectiveAnnualRate: `${effectiveRate.toFixed(3)}%`,
      taxPaid: includeTax ? fmtCurr(taxPaidAmount, currSym) : "—",
      afterTaxBalance: includeTax ? fmtCurr(afterTaxBalance, currSym) : "—",
      buyingPower: includeInflation ? fmtCurr(buyingPowerAmount, currSym) : "—",
      growthMultiplier: `${growthMultiplier.toFixed(2)}x`,
      interestPercent: `${interestPercentOfTotal.toFixed(1)}%`,
      avgMonthlyInterest: fmtCurr(avgMonthlyInterestVal, currSym),
      doublingTime: doublingTimeYears > 0 ? `~${doublingTimeYears.toFixed(1)} years` : "—",
      totalROI: `${totalROI.toFixed(1)}%`,
      compoundBonus: compoundBonusVal > 0 ? `+${fmtCurr(compoundBonusVal, currSym)}` : fmtCurr(compoundBonusVal, currSym),
      interestPerDollar: `${currSym}${interestPerDollarVal.toFixed(2)}`,
      finalYearInterest: lastYearData ? (lastYearData.interest as string) : "—",
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

// ─── Helper: Currency symbol from fieldUnits ──────────────────
function sym(fieldUnits?: Record<string, string>): string {
  const curr = fieldUnits?.initialDeposit || "USD";
  const SYMBOLS: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
    JPY: "¥", INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF ",
    COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
    CNY: "¥", KRW: "₩", SEK: "kr", NOK: "kr", DKK: "kr",
    PLN: "zł", CZK: "Kč", HUF: "Ft", TRY: "₺", ZAR: "R",
    NZD: "NZ$", SGD: "S$", HKD: "HK$", TWD: "NT$", THB: "฿",
    PHP: "₱", IDR: "Rp", MYR: "RM", VND: "₫", ILS: "₪",
  };
  return SYMBOLS[curr] || "$";
}

// ─── Helper: Format currency ──────────────────────────────────
function fmtCurr(val: number, symbol: string): string {
  if (val === 0) return `${symbol}0`;
  const abs = Math.abs(val);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: abs >= 1000 ? 0 : 2,
    maximumFractionDigits: abs >= 1000 ? 0 : 2,
  });
  return val < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

export default interestCalculatorConfig;
