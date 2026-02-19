import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════
// 💰 SAVINGS CALCULATOR — Growth & Goal Mode
// ═══════════════════════════════════════════════════════════════════

export const savingsCalculatorConfig: CalculatorConfigV4 = {
  id: "savings-calculator",
  version: "4.0",
  category: "finance",
  icon: "💰",

  presets: [
    {
      id: "emergencyFund",
      icon: "🛡️",
      values: {
        mode: "growth",
        initialDeposit: 1000,
        monthlyContribution: 500,
        contributionIncrease: 0,
        annualContribution: 0,
        interestRate: 4.5,
        compoundFrequency: "daily",
        timeYears: 1,
        timeMonths: 6,
        includeTax: false,
        taxRate: 25,
        includeInflation: false,
        inflationRate: 3,
        savingsGoal: 10000,
      },
    },
    {
      id: "vacationFund",
      icon: "✈️",
      values: {
        mode: "goal",
        initialDeposit: 500,
        monthlyContribution: 300,
        contributionIncrease: 0,
        annualContribution: 0,
        interestRate: 4.5,
        compoundFrequency: "monthly",
        timeYears: 2,
        timeMonths: 0,
        includeTax: false,
        taxRate: 25,
        includeInflation: false,
        inflationRate: 3,
        savingsGoal: 8000,
      },
    },
    {
      id: "downPayment",
      icon: "🏠",
      values: {
        mode: "goal",
        initialDeposit: 10000,
        monthlyContribution: 1000,
        contributionIncrease: 3,
        annualContribution: 0,
        interestRate: 5.0,
        compoundFrequency: "monthly",
        timeYears: 5,
        timeMonths: 0,
        includeTax: false,
        taxRate: 25,
        includeInflation: false,
        inflationRate: 3,
        savingsGoal: 80000,
      },
    },
    {
      id: "collegeFund",
      icon: "🎓",
      values: {
        mode: "growth",
        initialDeposit: 5000,
        monthlyContribution: 400,
        contributionIncrease: 5,
        annualContribution: 2000,
        interestRate: 6.0,
        compoundFrequency: "monthly",
        timeYears: 18,
        timeMonths: 0,
        includeTax: false,
        taxRate: 25,
        includeInflation: true,
        inflationRate: 3,
        savingsGoal: 100000,
      },
    },
    {
      id: "wealthBuilding",
      icon: "💎",
      values: {
        mode: "growth",
        initialDeposit: 25000,
        monthlyContribution: 1500,
        contributionIncrease: 3,
        annualContribution: 5000,
        interestRate: 7.0,
        compoundFrequency: "monthly",
        timeYears: 25,
        timeMonths: 0,
        includeTax: false,
        taxRate: 25,
        includeInflation: true,
        inflationRate: 3,
        savingsGoal: 500000,
      },
    },
  ],

  t: {
    en: {
      name: "Savings Calculator",
      slug: "savings-calculator",
      breadcrumb: "Savings Calculator",

      seo: {
        title: "Savings Calculator - Goal Planner & Growth Estimator",
        description: "Plan your savings with compound interest, monthly contributions, and annual increases. Set savings goals and see year-by-year projections. Free online tool.",
        shortDescription: "Calculate savings growth with contributions and goals.",
        keywords: [
          "savings calculator",
          "savings goal calculator",
          "how much should I save",
          "savings growth calculator",
          "compound savings calculator",
          "monthly savings calculator",
          "free savings calculator",
          "savings plan calculator",
        ],
      },

      subtitle: "Plan your savings strategy with compound interest, regular contributions, and annual increases to reach your financial goals.",

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Savings Plan",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        mode: {
          label: "Calculator Mode",
          helpText: "Growth mode shows how much you'll have. Goal mode shows if you'll reach your target.",
          options: {
            growth: "Growth Projection",
            goal: "Savings Goal",
          },
        },
        initialDeposit: {
          label: "Starting Balance",
          helpText: "How much you already have saved",
        },
        monthlyContribution: {
          label: "Monthly Contribution",
          helpText: "Amount you plan to save each month",
        },
        contributionIncrease: {
          label: "Annual Increase",
          helpText: "Percentage to increase your monthly contribution each year",
        },
        annualContribution: {
          label: "Annual Bonus Deposit",
          helpText: "Extra lump sum added once per year (e.g., tax refund, bonus)",
        },
        interestRate: {
          label: "Interest Rate (APR)",
          helpText: "Annual interest rate on your savings account",
        },
        compoundFrequency: {
          label: "Compound Frequency",
          helpText: "How often interest compounds on your savings",
          options: {
            daily: "Daily (365/yr)",
            monthly: "Monthly (12/yr)",
            quarterly: "Quarterly (4/yr)",
            semiannually: "Semi-annually (2/yr)",
            annually: "Annually (1/yr)",
          },
        },
        timeYears: {
          label: "Years",
          helpText: "How many years you plan to save",
        },
        timeMonths: {
          label: "Months",
          helpText: "Additional months beyond full years",
        },
        savingsGoal: {
          label: "Savings Goal",
          helpText: "Your target savings amount",
        },
        includeTax: {
          label: "Include Tax on Interest",
          helpText: "Apply tax rate to interest earned",
        },
        taxRate: {
          label: "Tax Rate",
          helpText: "Marginal tax rate on interest income",
        },
        includeInflation: {
          label: "Adjust for Inflation",
          helpText: "Show real purchasing power of your savings",
        },
        inflationRate: {
          label: "Inflation Rate",
          helpText: "Expected average annual inflation",
        },
      },

      results: {
        endingBalance: { label: "Total Savings" },
        totalInterest: { label: "Interest Earned" },
        totalDeposited: { label: "Total Deposited" },
        effectiveRate: { label: "Effective Rate (APY)" },
        goalProgress: { label: "Goal Progress" },
        goalSurplus: { label: "Goal Surplus / Shortfall" },
        monthlyNeeded: { label: "Monthly Needed for Goal" },
        taxPaid: { label: "Tax on Interest" },
        buyingPower: { label: "Buying Power" },
        milestoneYear: { label: "Goal Reached In" },
      },

      presets: {
        emergencyFund: { label: "Emergency Fund", description: "$1K start, $500/mo for 18 months at 4.5%" },
        vacationFund: { label: "Vacation Fund", description: "Goal: $8K in 2 years, $300/mo at 4.5%" },
        downPayment: { label: "Down Payment", description: "Goal: $80K in 5 years, $1K/mo +3%/yr at 5%" },
        collegeFund: { label: "College Fund", description: "$5K start, $400/mo +5%/yr for 18 years at 6%" },
        wealthBuilding: { label: "Wealth Building", description: "$25K start, $1.5K/mo +3%/yr for 25 years at 7%" },
      },

      values: {
        "years": "years",
        "year": "year",
        "months": "months",
        "month": "month",
        "onTrack": "On Track",
        "behindSchedule": "Behind Schedule",
        "goalReached": "Goal Reached!",
        "surplus": "surplus",
        "shortfall": "shortfall",
        "perYear": "/yr",
      },

      formats: {
        summary: "Your savings will reach {endingBalance} over {duration}, earning {totalInterest} in interest on {totalDeposited} deposited.",
      },

      infoCards: {
        metrics: {
          title: "Growth Insights",
          items: [
            { label: "Growth Multiplier", valueKey: "growthMultiplier" },
            { label: "Interest as % of Balance", valueKey: "interestPercent" },
            { label: "Average Monthly Growth", valueKey: "avgMonthlyGrowth" },
            { label: "Final Monthly Contribution", valueKey: "finalMonthlyContrib" },
          ],
        },
        details: {
          title: "Goal Analysis",
          items: [
            { label: "Escalation Impact", valueKey: "escalationImpact" },
            { label: "Annual Bonus Total", valueKey: "annualBonusTotal" },
            { label: "Average Annual Return", valueKey: "avgAnnualReturn" },
            { label: "Milestone Reached In", valueKey: "milestoneYear" },
          ],
        },
        tips: {
          title: "Savings Tips",
          items: [
            "Automate your savings — set up automatic transfers on payday so you pay yourself first",
            "Increase contributions annually by at least the inflation rate to maintain real savings power",
            "Keep your emergency fund in a high-yield savings account for easy access and better returns",
            "Use the 50/30/20 rule: allocate 20% of after-tax income to savings and debt repayment",
          ],
        },
      },

      chart: {
        title: "Savings Growth Projection",
        xLabel: "Year",
        yLabel: "Balance",
        series: {
          deposits: "Total Deposited",
          interest: "Interest Earned",
          goal: "Savings Goal",
        },
      },

      detailedTable: {
        savingsTable: {
          button: "View Year-by-Year Savings Table",
          title: "Year-by-Year Savings Breakdown",
          columns: {
            year: "Year",
            monthlyAmount: "Monthly Contrib.",
            yearDeposits: "Year Deposits",
            yearInterest: "Year Interest",
            totalDeposited: "Total Deposited",
            balance: "Balance",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is a Savings Calculator?",
          content: "A savings calculator helps you project how your money will grow over time with regular contributions and compound interest. Unlike simple interest calculators that only consider a lump sum, a savings calculator accounts for ongoing monthly deposits, annual bonus contributions, and even annual increases to your savings rate. This makes it much more realistic for actual financial planning. Whether you are building an emergency fund, saving for a down payment, or planning for your child's education, a savings calculator shows you exactly how much you will have at any point in the future and whether you are on track to meet your goals.",
        },
        howItWorks: {
          title: "How Savings Growth Is Calculated",
          content: "Savings growth combines the compound interest formula with future value of annuity calculations. Your initial deposit grows using A = P(1 + r/n)^(nt). Each monthly contribution is treated as a separate deposit that compounds for its remaining time. When you add annual contribution increases, each year's monthly payment is multiplied by (1 + increase%)^year. The annual bonus deposit is added as a lump sum at the start or end of each year. For savings goal calculations, the required monthly contribution is solved using the PMT formula: PMT = (FV - PV(1+r/n)^(nt)) × (r/n) / ((1+r/n)^(nt) - 1), where FV is your goal amount.",
        },
        considerations: {
          title: "Important Savings Considerations",
          items: [
            { text: "FDIC insurance covers up to $250,000 per depositor per bank — spread large savings across institutions", type: "warning" },
            { text: "High-yield savings accounts currently offer 4-5% APY — significantly more than traditional banks at 0.01-0.1%", type: "info" },
            { text: "Contribution escalation is powerful — increasing savings by just 1% per year can add tens of thousands over decades", type: "info" },
            { text: "Tax-advantaged accounts like Roth IRAs let savings grow tax-free, dramatically improving long-term results", type: "info" },
            { text: "Emergency funds should cover 3-6 months of expenses before investing in higher-risk options", type: "warning" },
            { text: "Inflation erodes savings — a 4% savings rate with 3% inflation gives only 1% real growth", type: "warning" },
          ],
        },
        categories: {
          title: "Types of Savings Strategies",
          items: [
            { text: "Emergency Fund: 3-6 months expenses in high-yield savings, prioritized above all other savings goals", type: "info" },
            { text: "Sinking Funds: Targeted savings for specific goals like vacations, car repairs, or holiday gifts", type: "info" },
            { text: "Down Payment Savings: Typically 20% of home price, usually 3-7 years of focused saving", type: "info" },
            { text: "Education Savings: 529 plans offer tax advantages for college costs, start as early as possible", type: "info" },
            { text: "Retirement Savings: 401(k) and IRA contributions with employer matching should start in your 20s", type: "info" },
            { text: "Wealth Building: After emergency and retirement basics, invest in diversified index funds for long-term growth", type: "info" },
          ],
        },
        examples: {
          title: "Savings Growth Examples",
          description: "Real-world savings scenarios with compound interest",
          examples: [
            {
              title: "Emergency Fund: $500/mo at 4.5% for 12 months",
              steps: [
                "Starting balance: $0, Monthly: $500, Rate: 4.5% daily compound",
                "Month 1: $500.00 → earns ~$0.18",
                "Month 6: $3,020 (deposited $3,000, earned $20)",
                "Month 12: $6,113 (deposited $6,000, earned $113)",
              ],
              result: "Total: $6,113 — You earned $113 in interest while building your safety net",
            },
            {
              title: "Down Payment: $1,000/mo +3%/yr for 5 years at 5%",
              steps: [
                "Starting: $10,000, Monthly: $1,000 increasing 3%/yr",
                "Year 1: $1,000/mo → $22,310 balance",
                "Year 3: $1,061/mo → $49,832 balance",
                "Year 5: $1,126/mo → $82,540 balance",
                "Total deposited: $75,185, Interest: $7,355",
              ],
              result: "Final: $82,540 — Contribution escalation added $3,700+ vs flat $1,000/mo",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How much should I have in savings?",
          answer: "Financial experts generally recommend having 3-6 months of essential expenses in an emergency fund as a baseline. Beyond that, savings goals depend on your situation: 20% of your home's price for a down payment, $250,000+ for college per child, and 10-15% of income for retirement. The 50/30/20 rule suggests allocating 20% of after-tax income to savings and debt repayment. Start with the emergency fund, then work toward other goals simultaneously.",
        },
        {
          question: "What is contribution escalation and why does it matter?",
          answer: "Contribution escalation means increasing your monthly savings amount by a fixed percentage each year. Even a 3% annual increase — roughly matching inflation — can significantly boost your long-term savings. For example, starting at $500/month with 3% annual increases over 20 years results in saving about $16,000 more than keeping contributions flat, plus additional compound interest on those extra deposits. Most employers offer automatic 401(k) escalation for this reason.",
        },
        {
          question: "Should I save in a high-yield savings account or invest?",
          answer: "It depends on your timeline and goals. For short-term goals (under 3 years) and emergency funds, high-yield savings accounts offering 4-5% APY are ideal because they provide FDIC insurance and instant access. For goals 5+ years away, investing in diversified index funds historically returns 7-10% annually, though with more volatility. For 3-5 year goals, CDs or bond funds offer a middle ground between safety and returns.",
        },
        {
          question: "How does compound frequency affect my savings?",
          answer: "Daily compounding earns slightly more than monthly or annual compounding. At 5% APR: annual compounding gives exactly 5.000% APY, monthly gives 5.116% APY, and daily gives 5.127% APY. The difference between daily and monthly is minimal (about $1 per $10,000 per year), so don't switch banks just for compounding frequency. Focus on the actual APY rate instead, which already accounts for compounding.",
        },
        {
          question: "What is the difference between APR and APY for savings?",
          answer: "APR (Annual Percentage Rate) is the stated interest rate without accounting for compounding. APY (Annual Percentage Yield) includes the effect of compounding and represents your true annual return. Banks are required to advertise APY on savings products. For example, 5% APR with monthly compounding equals 5.116% APY. When comparing savings accounts, always compare APY to APY for an accurate comparison.",
        },
        {
          question: "How do I calculate how much I need to save monthly to reach a goal?",
          answer: "Use the formula: PMT = (Goal - InitialDeposit × (1+r/n)^(nt)) × (r/n) / ((1+r/n)^(nt) - 1). For a simpler estimate without interest, divide your goal minus current savings by the number of months. For example, to save $20,000 in 3 years starting from $2,000: ($20,000 - $2,000) / 36 = $500/month minimum. With 4.5% interest, you'd actually need about $475/month. Use our calculator in Goal mode for exact numbers.",
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
      "name": "Calculadora de Ahorros",
      "slug": "calculadora-ahorros",
      "breadcrumb": "Calculadora de Ahorros",
      "seo": {
        "title": "Calculadora de Ahorros - Planificador de Metas y Estimador de Crecimiento",
        "description": "Planifica tus ahorros con interés compuesto, contribuciones mensuales y aumentos anuales. Establece metas de ahorro y ve proyecciones año por año. Herramienta gratuita en línea.",
        "shortDescription": "Calcula el crecimiento de ahorros con contribuciones y metas.",
        "keywords": [
          "calculadora de ahorros",
          "calculadora de metas de ahorro",
          "cuánto debería ahorrar",
          "calculadora de crecimiento de ahorros",
          "calculadora de ahorros compuestos",
          "calculadora de ahorros mensuales",
          "calculadora de ahorros gratuita",
          "calculadora de plan de ahorros"
        ]
      },
      "subtitle": "Planifica tu estrategia de ahorro con interés compuesto, contribuciones regulares y aumentos anuales para alcanzar tus metas financieras.",
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "mode": {
          "label": "Modo de Calculadora",
          "helpText": "El modo crecimiento muestra cuánto tendrás. El modo meta muestra si alcanzarás tu objetivo.",
          "options": {
            "growth": "Proyección de Crecimiento",
            "goal": "Meta de Ahorro"
          }
        },
        "initialDeposit": {
          "label": "Saldo Inicial",
          "helpText": "Cuánto ya tienes ahorrado"
        },
        "monthlyContribution": {
          "label": "Contribución Mensual",
          "helpText": "Cantidad que planeas ahorrar cada mes"
        },
        "contributionIncrease": {
          "label": "Aumento Anual",
          "helpText": "Porcentaje para aumentar tu contribución mensual cada año"
        },
        "annualContribution": {
          "label": "Depósito Bonus Anual",
          "helpText": "Suma adicional agregada una vez al año (ej. devolución de impuestos, bonus)"
        },
        "interestRate": {
          "label": "Tasa de Interés (TAE)",
          "helpText": "Tasa de interés anual en tu cuenta de ahorros"
        },
        "compoundFrequency": {
          "label": "Frecuencia de Capitalización",
          "helpText": "Con qué frecuencia se capitaliza el interés en tus ahorros",
          "options": {
            "daily": "Diario (365/año)",
            "monthly": "Mensual (12/año)",
            "quarterly": "Trimestral (4/año)",
            "semiannually": "Semestral (2/año)",
            "annually": "Anual (1/año)"
          }
        },
        "timeYears": {
          "label": "Años",
          "helpText": "Cuántos años planeas ahorrar"
        },
        "timeMonths": {
          "label": "Meses",
          "helpText": "Meses adicionales más allá de los años completos"
        },
        "savingsGoal": {
          "label": "Meta de Ahorros",
          "helpText": "Tu cantidad objetivo de ahorros"
        },
        "includeTax": {
          "label": "Incluir Impuesto sobre Intereses",
          "helpText": "Aplicar tasa de impuesto a los intereses ganados"
        },
        "taxRate": {
          "label": "Tasa de Impuesto",
          "helpText": "Tasa de impuesto marginal sobre ingresos por intereses"
        },
        "includeInflation": {
          "label": "Ajustar por Inflación",
          "helpText": "Mostrar el poder adquisitivo real de tus ahorros"
        },
        "inflationRate": {
          "label": "Tasa de Inflación",
          "helpText": "Inflación anual promedio esperada"
        }
      },
      "results": {
        "endingBalance": {
          "label": "Ahorros Totales"
        },
        "totalInterest": {
          "label": "Intereses Ganados"
        },
        "totalDeposited": {
          "label": "Total Depositado"
        },
        "effectiveRate": {
          "label": "Tasa Efectiva (TAE)"
        },
        "goalProgress": {
          "label": "Progreso de Meta"
        },
        "goalSurplus": {
          "label": "Excedente / Déficit de Meta"
        },
        "monthlyNeeded": {
          "label": "Mensual Necesario para Meta"
        },
        "taxPaid": {
          "label": "Impuesto sobre Intereses"
        },
        "buyingPower": {
          "label": "Poder Adquisitivo"
        },
        "milestoneYear": {
          "label": "Meta Alcanzada En"
        }
      },
      "presets": {
        "emergencyFund": {
          "label": "Fondo de Emergencia",
          "description": "Inicio $1K, $500/mes por 18 meses al 4.5%"
        },
        "vacationFund": {
          "label": "Fondo de Vacaciones",
          "description": "Meta: $8K en 2 años, $300/mes al 4.5%"
        },
        "downPayment": {
          "label": "Enganche",
          "description": "Meta: $80K en 5 años, $1K/mes +3%/año al 5%"
        },
        "collegeFund": {
          "label": "Fondo Universitario",
          "description": "Inicio $5K, $400/mes +5%/año por 18 años al 6%"
        },
        "wealthBuilding": {
          "label": "Construcción de Riqueza",
          "description": "Inicio $25K, $1.5K/mes +3%/año por 25 años al 7%"
        }
      },
      "values": {
        "years": "años",
        "year": "año",
        "months": "meses",
        "month": "mes",
        "onTrack": "En Camino",
        "behindSchedule": "Retrasado",
        "goalReached": "¡Meta Alcanzada!",
        "surplus": "excedente",
        "shortfall": "déficit",
        "perYear": "/año"
      },
      "formats": {
        "summary": "Tus ahorros alcanzarán {endingBalance} durante {duration}, ganando {totalInterest} en intereses sobre {totalDeposited} depositados."
      },
      "infoCards": {
        "metrics": {
          "title": "Perspectivas de Crecimiento",
          "items": [
            {
              "label": "Multiplicador de Crecimiento",
              "valueKey": "growthMultiplier"
            },
            {
              "label": "Interés como % del Saldo",
              "valueKey": "interestPercent"
            },
            {
              "label": "Crecimiento Mensual Promedio",
              "valueKey": "avgMonthlyGrowth"
            },
            {
              "label": "Contribución Mensual Final",
              "valueKey": "finalMonthlyContrib"
            }
          ]
        },
        "details": {
          "title": "Análisis de Meta",
          "items": [
            {
              "label": "Impacto de Escalación",
              "valueKey": "escalationImpact"
            },
            {
              "label": "Total de Bonus Anual",
              "valueKey": "annualBonusTotal"
            },
            {
              "label": "Rendimiento Anual Promedio",
              "valueKey": "avgAnnualReturn"
            },
            {
              "label": "Hito Alcanzado En",
              "valueKey": "milestoneYear"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Ahorro",
          "items": [
            "Automatiza tus ahorros — configura transferencias automáticas el día de pago para pagarte primero",
            "Aumenta las contribuciones anualmente al menos por la tasa de inflación para mantener el poder de ahorro real",
            "Mantén tu fondo de emergencia en una cuenta de ahorros de alto rendimiento para fácil acceso y mejores rendimientos",
            "Usa la regla 50/30/20: asigna 20% del ingreso después de impuestos a ahorros y pago de deudas"
          ]
        }
      },
      "chart": {
        "title": "Proyección de Crecimiento de Ahorros",
        "xLabel": "Año",
        "yLabel": "Saldo",
        "series": {
          "deposits": "Total Depositado",
          "interest": "Intereses Ganados",
          "goal": "Meta de Ahorros"
        }
      },
      "detailedTable": {
        "savingsTable": {
          "button": "Ver Tabla de Ahorros Año por Año",
          "title": "Desglose de Ahorros Año por Año",
          "columns": {
            "year": "Año",
            "monthlyAmount": "Contrib. Mensual",
            "yearDeposits": "Depósitos del Año",
            "yearInterest": "Interés del Año",
            "totalDeposited": "Total Depositado",
            "balance": "Saldo"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué Es una Calculadora de Ahorros?",
          "content": "Una calculadora de ahorros te ayuda a proyectar cómo crecerá tu dinero con el tiempo con contribuciones regulares e interés compuesto. A diferencia de las calculadoras de interés simple que solo consideran una suma global, una calculadora de ahorros considera depósitos mensuales continuos, contribuciones bonus anuales e incluso aumentos anuales a tu tasa de ahorro. Esto la hace mucho más realista para la planificación financiera real. Ya sea que estés construyendo un fondo de emergencia, ahorrando para un enganche o planificando la educación de tu hijo, una calculadora de ahorros te muestra exactamente cuánto tendrás en cualquier momento futuro y si estás en camino de cumplir tus metas."
        },
        "howItWorks": {
          "title": "Cómo Se Calcula el Crecimiento de Ahorros",
          "content": "El crecimiento de ahorros combina la fórmula de interés compuesto con cálculos de valor futuro de anualidad. Tu depósito inicial crece usando A = P(1 + r/n)^(nt). Cada contribución mensual se trata como un depósito separado que se capitaliza por su tiempo restante. Cuando agregas aumentos anuales de contribución, el pago mensual de cada año se multiplica por (1 + aumento%)^año. El depósito bonus anual se agrega como suma global al inicio o final de cada año. Para cálculos de meta de ahorros, la contribución mensual requerida se resuelve usando la fórmula PMT: PMT = (VF - VP(1+r/n)^(nt)) × (r/n) / ((1+r/n)^(nt) - 1), donde VF es tu cantidad meta."
        },
        "considerations": {
          "title": "Consideraciones Importantes de Ahorro",
          "items": [
            {
              "text": "El seguro FDIC cubre hasta $250,000 por depositante por banco — distribuye ahorros grandes entre instituciones",
              "type": "warning"
            },
            {
              "text": "Las cuentas de ahorros de alto rendimiento actualmente ofrecen 4-5% TAE — significativamente más que bancos tradicionales al 0.01-0.1%",
              "type": "info"
            },
            {
              "text": "La escalación de contribución es poderosa — aumentar ahorros solo 1% por año puede agregar decenas de miles durante décadas",
              "type": "info"
            },
            {
              "text": "Las cuentas con ventajas fiscales como Roth IRA permiten que los ahorros crezcan libres de impuestos, mejorando dramáticamente los resultados a largo plazo",
              "type": "info"
            },
            {
              "text": "Los fondos de emergencia deben cubrir 3-6 meses de gastos antes de invertir en opciones de mayor riesgo",
              "type": "warning"
            },
            {
              "text": "La inflación erosiona los ahorros — una tasa de ahorro del 4% con 3% de inflación da solo 1% de crecimiento real",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Tipos de Estrategias de Ahorro",
          "items": [
            {
              "text": "Fondo de Emergencia: 3-6 meses de gastos en ahorros de alto rendimiento, priorizado sobre todas las demás metas de ahorro",
              "type": "info"
            },
            {
              "text": "Fondos Específicos: Ahorros dirigidos para metas específicas como vacaciones, reparaciones de auto o regalos navideños",
              "type": "info"
            },
            {
              "text": "Ahorros para Enganche: Típicamente 20% del precio de la casa, usualmente 3-7 años de ahorro enfocado",
              "type": "info"
            },
            {
              "text": "Ahorros para Educación: Los planes 529 ofrecen ventajas fiscales para costos universitarios, comenzar lo más temprano posible",
              "type": "info"
            },
            {
              "text": "Ahorros para Jubilación: Las contribuciones 401(k) e IRA con coincidencia del empleador deben comenzar en los 20s",
              "type": "info"
            },
            {
              "text": "Construcción de Riqueza: Después de emergencia y básicos de jubilación, invertir en fondos indexados diversificados para crecimiento a largo plazo",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Crecimiento de Ahorros",
          "description": "Escenarios de ahorro del mundo real con interés compuesto",
          "examples": [
            {
              "title": "Fondo de Emergencia: $500/mes al 4.5% por 12 meses",
              "steps": [
                "Saldo inicial: $0, Mensual: $500, Tasa: 4.5% capitalización diaria",
                "Mes 1: $500.00 → gana ~$0.18",
                "Mes 6: $3,020 (depositado $3,000, ganado $20)",
                "Mes 12: $6,113 (depositado $6,000, ganado $113)"
              ],
              "result": "Total: $6,113 — Ganaste $113 en intereses mientras construías tu red de seguridad"
            },
            {
              "title": "Enganche: $1,000/mes +3%/año por 5 años al 5%",
              "steps": [
                "Inicio: $10,000, Mensual: $1,000 aumentando 3%/año",
                "Año 1: $1,000/mes → saldo $22,310",
                "Año 3: $1,061/mes → saldo $49,832",
                "Año 5: $1,126/mes → saldo $82,540",
                "Total depositado: $75,185, Intereses: $7,355"
              ],
              "result": "Final: $82,540 — La escalación de contribución agregó $3,700+ vs $1,000/mes fijo"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuánto debería tener en ahorros?",
          "answer": "Los expertos financieros generalmente recomiendan tener 3-6 meses de gastos esenciales en un fondo de emergencia como base. Más allá de eso, las metas de ahorro dependen de tu situación: 20% del precio de tu casa para un enganche, $250,000+ para universidad por hijo, y 10-15% del ingreso para jubilación. La regla 50/30/20 sugiere asignar 20% del ingreso después de impuestos a ahorros y pago de deudas. Comienza con el fondo de emergencia, luego trabaja hacia otras metas simultáneamente."
        },
        {
          "question": "¿Qué es la escalación de contribución y por qué importa?",
          "answer": "La escalación de contribución significa aumentar tu cantidad de ahorro mensual por un porcentaje fijo cada año. Incluso un aumento anual del 3% — aproximadamente igualando la inflación — puede impulsar significativamente tus ahorros a largo plazo. Por ejemplo, comenzar en $500/mes con aumentos anuales del 3% durante 20 años resulta en ahorrar aproximadamente $16,000 más que mantener contribuciones fijas, más interés compuesto adicional en esos depósitos extra. La mayoría de empleadores ofrecen escalación automática 401(k) por esta razón."
        },
        {
          "question": "¿Debería ahorrar en una cuenta de ahorros de alto rendimiento o invertir?",
          "answer": "Depende de tu horizonte temporal y metas. Para metas a corto plazo (menos de 3 años) y fondos de emergencia, las cuentas de ahorros de alto rendimiento que ofrecen 4-5% TAE son ideales porque proporcionan seguro FDIC y acceso instantáneo. Para metas de 5+ años, invertir en fondos indexados diversificados históricamente retorna 7-10% anualmente, aunque con más volatilidad. Para metas de 3-5 años, CDs o fondos de bonos ofrecen un término medio entre seguridad y rendimientos."
        },
        {
          "question": "¿Cómo afecta la frecuencia de capitalización mis ahorros?",
          "answer": "La capitalización diaria gana ligeramente más que la capitalización mensual o anual. Al 5% TAE: la capitalización anual da exactamente 5.000% TAE, mensual da 5.116% TAE, y diaria da 5.127% TAE. La diferencia entre diaria y mensual es mínima (aproximadamente $1 por $10,000 por año), así que no cambies de banco solo por la frecuencia de capitalización. Enfócate en la tasa TAE real en su lugar, que ya considera la capitalización."
        },
        {
          "question": "¿Cuál es la diferencia entre TAE y TAE para ahorros?",
          "answer": "TAE (Tasa Anual Equivalente) es la tasa de interés declarada sin considerar la capitalización. TAE (Tasa Anual Equivalente) incluye el efecto de la capitalización y representa tu rendimiento anual verdadero. Los bancos están obligados a publicitar TAE en productos de ahorro. Por ejemplo, 5% TAE con capitalización mensual equivale a 5.116% TAE. Al comparar cuentas de ahorro, siempre compara TAE con TAE para una comparación precisa."
        },
        {
          "question": "¿Cómo calculo cuánto necesito ahorrar mensualmente para alcanzar una meta?",
          "answer": "Usa la fórmula: PMT = (Meta - DepósitoInicial × (1+r/n)^(nt)) × (r/n) / ((1+r/n)^(nt) - 1). Para una estimación más simple sin interés, divide tu meta menos ahorros actuales entre el número de meses. Por ejemplo, para ahorrar $20,000 en 3 años comenzando desde $2,000: ($20,000 - $2,000) / 36 = $500/mes mínimo. Con 4.5% de interés, realmente necesitarías aproximadamente $475/mes. Usa nuestra calculadora en modo Meta para números exactos."
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
      "name": "Calculadora de Poupança",
      "slug": "calculadora-poupanca",
      "breadcrumb": "Calculadora de Poupança",
      "seo": {
        "title": "Calculadora de Poupança - Planejador de Metas & Estimador de Crescimento",
        "description": "Planeje suas economias com juros compostos, contribuições mensais e aumentos anuais. Defina metas de poupança e veja projeções ano a ano. Ferramenta online gratuita.",
        "shortDescription": "Calcule o crescimento da poupança com contribuições e metas.",
        "keywords": [
          "calculadora de poupança",
          "calculadora de meta de poupança",
          "quanto devo poupar",
          "calculadora de crescimento de poupança",
          "calculadora de poupança composta",
          "calculadora de poupança mensal",
          "calculadora de poupança grátis",
          "calculadora de plano de poupança"
        ]
      },
      "subtitle": "Planeje sua estratégia de poupança com juros compostos, contribuições regulares e aumentos anuais para alcançar seus objetivos financeiros.",
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "mode": {
          "label": "Modo da Calculadora",
          "helpText": "Modo crescimento mostra quanto você terá. Modo meta mostra se você alcançará seu objetivo.",
          "options": {
            "growth": "Projeção de Crescimento",
            "goal": "Meta de Poupança"
          }
        },
        "initialDeposit": {
          "label": "Saldo Inicial",
          "helpText": "Quanto você já tem poupado"
        },
        "monthlyContribution": {
          "label": "Contribuição Mensal",
          "helpText": "Valor que você planeja poupar a cada mês"
        },
        "contributionIncrease": {
          "label": "Aumento Anual",
          "helpText": "Percentual para aumentar sua contribuição mensal a cada ano"
        },
        "annualContribution": {
          "label": "Depósito Bônus Anual",
          "helpText": "Quantia extra adicionada uma vez por ano (ex: restituição de imposto, bônus)"
        },
        "interestRate": {
          "label": "Taxa de Juros (TAE)",
          "helpText": "Taxa de juros anual da sua conta poupança"
        },
        "compoundFrequency": {
          "label": "Frequência de Capitalização",
          "helpText": "Com que frequência os juros se capitalizam na sua poupança",
          "options": {
            "daily": "Diária (365/ano)",
            "monthly": "Mensal (12/ano)",
            "quarterly": "Trimestral (4/ano)",
            "semiannually": "Semestral (2/ano)",
            "annually": "Anual (1/ano)"
          }
        },
        "timeYears": {
          "label": "Anos",
          "helpText": "Quantos anos você planeja poupar"
        },
        "timeMonths": {
          "label": "Meses",
          "helpText": "Meses adicionais além dos anos completos"
        },
        "savingsGoal": {
          "label": "Meta de Poupança",
          "helpText": "Seu valor alvo de poupança"
        },
        "includeTax": {
          "label": "Incluir Imposto sobre Juros",
          "helpText": "Aplicar taxa de imposto aos juros ganhos"
        },
        "taxRate": {
          "label": "Taxa de Imposto",
          "helpText": "Taxa marginal de imposto sobre rendimentos de juros"
        },
        "includeInflation": {
          "label": "Ajustar pela Inflação",
          "helpText": "Mostrar poder de compra real da sua poupança"
        },
        "inflationRate": {
          "label": "Taxa de Inflação",
          "helpText": "Inflação anual média esperada"
        }
      },
      "results": {
        "endingBalance": {
          "label": "Total Poupado"
        },
        "totalInterest": {
          "label": "Juros Ganhos"
        },
        "totalDeposited": {
          "label": "Total Depositado"
        },
        "effectiveRate": {
          "label": "Taxa Efetiva (TAE)"
        },
        "goalProgress": {
          "label": "Progresso da Meta"
        },
        "goalSurplus": {
          "label": "Excedente/Déficit da Meta"
        },
        "monthlyNeeded": {
          "label": "Mensal Necessário para Meta"
        },
        "taxPaid": {
          "label": "Imposto sobre Juros"
        },
        "buyingPower": {
          "label": "Poder de Compra"
        },
        "milestoneYear": {
          "label": "Meta Alcançada Em"
        }
      },
      "presets": {
        "emergencyFund": {
          "label": "Fundo de Emergência",
          "description": "R$ 1.000 inicial, R$ 500/mês por 18 meses a 4,5%"
        },
        "vacationFund": {
          "label": "Fundo de Férias",
          "description": "Meta: R$ 8.000 em 2 anos, R$ 300/mês a 4,5%"
        },
        "downPayment": {
          "label": "Entrada de Casa",
          "description": "Meta: R$ 80.000 em 5 anos, R$ 1.000/mês +3%/ano a 5%"
        },
        "collegeFund": {
          "label": "Fundo Universitário",
          "description": "R$ 5.000 inicial, R$ 400/mês +5%/ano por 18 anos a 6%"
        },
        "wealthBuilding": {
          "label": "Construção de Patrimônio",
          "description": "R$ 25.000 inicial, R$ 1.500/mês +3%/ano por 25 anos a 7%"
        }
      },
      "values": {
        "years": "anos",
        "year": "ano",
        "months": "meses",
        "month": "mês",
        "onTrack": "No Caminho Certo",
        "behindSchedule": "Atrasado",
        "goalReached": "Meta Alcançada!",
        "surplus": "excedente",
        "shortfall": "déficit",
        "perYear": "/ano"
      },
      "formats": {
        "summary": "Sua poupança alcançará {endingBalance} ao longo de {duration}, ganhando {totalInterest} em juros sobre {totalDeposited} depositados."
      },
      "infoCards": {
        "metrics": {
          "title": "Insights de Crescimento",
          "items": [
            {
              "label": "Multiplicador de Crescimento",
              "valueKey": "growthMultiplier"
            },
            {
              "label": "Juros como % do Saldo",
              "valueKey": "interestPercent"
            },
            {
              "label": "Crescimento Mensal Médio",
              "valueKey": "avgMonthlyGrowth"
            },
            {
              "label": "Contribuição Mensal Final",
              "valueKey": "finalMonthlyContrib"
            }
          ]
        },
        "details": {
          "title": "Análise de Meta",
          "items": [
            {
              "label": "Impacto do Escalonamento",
              "valueKey": "escalationImpact"
            },
            {
              "label": "Total de Bônus Anual",
              "valueKey": "annualBonusTotal"
            },
            {
              "label": "Retorno Anual Médio",
              "valueKey": "avgAnnualReturn"
            },
            {
              "label": "Marco Alcançado Em",
              "valueKey": "milestoneYear"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Poupança",
          "items": [
            "Automatize sua poupança — configure transferências automáticas no dia do pagamento para se pagar primeiro",
            "Aumente as contribuições anualmente pelo menos na taxa de inflação para manter o poder real de poupança",
            "Mantenha seu fundo de emergência em uma conta poupança de alto rendimento para fácil acesso e melhores retornos",
            "Use a regra 50/30/20: aloque 20% da renda líquida para poupança e pagamento de dívidas"
          ]
        }
      },
      "chart": {
        "title": "Projeção de Crescimento da Poupança",
        "xLabel": "Ano",
        "yLabel": "Saldo",
        "series": {
          "deposits": "Total Depositado",
          "interest": "Juros Ganhos",
          "goal": "Meta de Poupança"
        }
      },
      "detailedTable": {
        "savingsTable": {
          "button": "Ver Tabela de Poupança Ano a Ano",
          "title": "Detalhamento da Poupança Ano a Ano",
          "columns": {
            "year": "Ano",
            "monthlyAmount": "Contrib. Mensal",
            "yearDeposits": "Depósitos do Ano",
            "yearInterest": "Juros do Ano",
            "totalDeposited": "Total Depositado",
            "balance": "Saldo"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Calculadora de Poupança?",
          "content": "Uma calculadora de poupança ajuda você a projetar como seu dinheiro crescerá ao longo do tempo com contribuições regulares e juros compostos. Diferente de calculadoras de juros simples que consideram apenas uma quantia única, uma calculadora de poupança considera depósitos mensais contínuos, contribuições bônus anuais e até aumentos anuais na sua taxa de poupança. Isso a torna muito mais realista para o planejamento financeiro real. Seja construindo um fundo de emergência, poupando para uma entrada de casa ou planejando a educação do seu filho, uma calculadora de poupança mostra exatamente quanto você terá em qualquer ponto no futuro e se está no caminho certo para atingir seus objetivos."
        },
        "howItWorks": {
          "title": "Como o Crescimento da Poupança é Calculado",
          "content": "O crescimento da poupança combina a fórmula de juros compostos com cálculos de valor futuro de anuidade. Seu depósito inicial cresce usando A = P(1 + r/n)^(nt). Cada contribuição mensal é tratada como um depósito separado que se capitaliza pelo tempo restante. Quando você adiciona aumentos anuais de contribuição, o pagamento mensal de cada ano é multiplicado por (1 + aumento%)^ano. O depósito bônus anual é adicionado como uma quantia única no início ou final de cada ano. Para cálculos de meta de poupança, a contribuição mensal necessária é resolvida usando a fórmula PMT: PMT = (VF - VP(1+r/n)^(nt)) × (r/n) / ((1+r/n)^(nt) - 1), onde VF é seu valor meta."
        },
        "considerations": {
          "title": "Considerações Importantes sobre Poupança",
          "items": [
            {
              "text": "O seguro de depósitos cobre até R$ 250.000 por depositário por instituição — distribua grandes poupanças entre bancos",
              "type": "warning"
            },
            {
              "text": "Contas poupança de alto rendimento atualmente oferecem 4-5% ao ano — significativamente mais que bancos tradicionais com 0,01-0,1%",
              "type": "info"
            },
            {
              "text": "O escalonamento de contribuições é poderoso — aumentar a poupança em apenas 1% ao ano pode adicionar dezenas de milhares ao longo de décadas",
              "type": "info"
            },
            {
              "text": "Contas com vantagens fiscais como Tesouro Direto permitem que a poupança cresça com menos impostos, melhorando drasticamente os resultados a longo prazo",
              "type": "info"
            },
            {
              "text": "Fundos de emergência devem cobrir 3-6 meses de despesas antes de investir em opções de maior risco",
              "type": "warning"
            },
            {
              "text": "A inflação corrói a poupança — uma taxa de poupança de 4% com 3% de inflação dá apenas 1% de crescimento real",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Tipos de Estratégias de Poupança",
          "items": [
            {
              "text": "Fundo de Emergência: 3-6 meses de despesas em poupança de alto rendimento, priorizado acima de todos os outros objetivos de poupança",
              "type": "info"
            },
            {
              "text": "Fundos Específicos: Poupança direcionada para objetivos específicos como férias, reparos de carro ou presentes de fim de ano",
              "type": "info"
            },
            {
              "text": "Poupança para Entrada de Casa: Tipicamente 20% do preço da casa, geralmente 3-7 anos de poupança focada",
              "type": "info"
            },
            {
              "text": "Poupança para Educação: Planos de educação oferecem vantagens fiscais para custos universitários, comece o mais cedo possível",
              "type": "info"
            },
            {
              "text": "Poupança para Aposentadoria: Contribuições para previdência privada devem começar nos seus 20 anos",
              "type": "info"
            },
            {
              "text": "Construção de Patrimônio: Após emergência e básicos da aposentadoria, invista em fundos de índice diversificados para crescimento a longo prazo",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Crescimento de Poupança",
          "description": "Cenários de poupança do mundo real com juros compostos",
          "examples": [
            {
              "title": "Fundo de Emergência: R$ 500/mês a 4,5% por 12 meses",
              "steps": [
                "Saldo inicial: R$ 0, Mensal: R$ 500, Taxa: 4,5% capitalização diária",
                "Mês 1: R$ 500,00 → ganha ~R$ 1,88",
                "Mês 6: R$ 3.020 (depositado R$ 3.000, ganho R$ 20)",
                "Mês 12: R$ 6.113 (depositado R$ 6.000, ganho R$ 113)"
              ],
              "result": "Total: R$ 6.113 — Você ganhou R$ 113 em juros enquanto construía sua rede de segurança"
            },
            {
              "title": "Entrada de Casa: R$ 1.000/mês +3%/ano por 5 anos a 5%",
              "steps": [
                "Início: R$ 10.000, Mensal: R$ 1.000 aumentando 3%/ano",
                "Ano 1: R$ 1.000/mês → saldo R$ 22.310",
                "Ano 3: R$ 1.061/mês → saldo R$ 49.832",
                "Ano 5: R$ 1.126/mês → saldo R$ 82.540",
                "Total depositado: R$ 75.185, Juros: R$ 7.355"
              ],
              "result": "Final: R$ 82.540 — O escalonamento de contribuições adicionou mais de R$ 3.700 vs R$ 1.000/mês fixo"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quanto devo ter em poupança?",
          "answer": "Especialistas financeiros geralmente recomendam ter 3-6 meses de despesas essenciais em um fundo de emergência como base. Além disso, as metas de poupança dependem da sua situação: 20% do valor da sua casa para entrada, R$ 250.000+ para faculdade por filho, e 10-15% da renda para aposentadoria. A regra 50/30/20 sugere alocar 20% da renda líquida para poupança e pagamento de dívidas. Comece com o fundo de emergência, depois trabalhe em direção a outros objetivos simultaneamente."
        },
        {
          "question": "O que é escalonamento de contribuições e por que isso importa?",
          "answer": "Escalonamento de contribuições significa aumentar seu valor de poupança mensal em uma porcentagem fixa a cada ano. Mesmo um aumento anual de 3% — aproximadamente acompanhando a inflação — pode impulsionar significativamente sua poupança a longo prazo. Por exemplo, começar com R$ 500/mês com aumentos anuais de 3% ao longo de 20 anos resulta em poupar cerca de R$ 16.000 a mais do que manter contribuições fixas, mais juros compostos adicionais sobre esses depósitos extras. A maioria dos empregadores oferece escalonamento automático de previdência por essa razão."
        },
        {
          "question": "Devo poupar em uma conta poupança de alto rendimento ou investir?",
          "answer": "Depende do seu prazo e objetivos. Para objetivos de curto prazo (menos de 3 anos) e fundos de emergência, contas poupança de alto rendimento oferecendo 4-5% ao ano são ideais porque fornecem garantia de depósito e acesso instantâneo. Para objetivos de 5+ anos, investir em fundos de índice diversificados historicamente retorna 7-10% anualmente, embora com mais volatilidade. Para objetivos de 3-5 anos, CDBs ou fundos de renda fixa oferecem um meio-termo entre segurança e retornos."
        },
        {
          "question": "Como a frequência de capitalização afeta minha poupança?",
          "answer": "A capitalização diária rende ligeiramente mais que capitalização mensal ou anual. A 5% ao ano: capitalização anual dá exatamente 5,000% ao ano, mensal dá 5,116% ao ano, e diária dá 5,127% ao ano. A diferença entre diária e mensal é mínima (cerca de R$ 1 por R$ 10.000 por ano), então não mude de banco apenas pela frequência de capitalização. Foque na taxa efetiva real, que já considera a capitalização."
        },
        {
          "question": "Qual é a diferença entre taxa nominal e taxa efetiva para poupança?",
          "answer": "Taxa nominal é a taxa de juros declarada sem considerar a capitalização. Taxa efetiva inclui o efeito da capitalização e representa seu retorno anual real. Os bancos são obrigados a anunciar a taxa efetiva em produtos de poupança. Por exemplo, 5% nominal com capitalização mensal equivale a 5,116% efetiva. Ao comparar contas poupança, sempre compare taxa efetiva com taxa efetiva para uma comparação precisa."
        },
        {
          "question": "Como calculo quanto preciso poupar mensalmente para alcançar uma meta?",
          "answer": "Use a fórmula: PMT = (Meta - DepósitoInicial × (1+r/n)^(nt)) × (r/n) / ((1+r/n)^(nt) - 1). Para uma estimativa mais simples sem juros, divida sua meta menos poupança atual pelo número de meses. Por exemplo, para poupar R$ 20.000 em 3 anos começando com R$ 2.000: (R$ 20.000 - R$ 2.000) / 36 = R$ 500/mês mínimo. Com juros de 4,5%, você precisaria de cerca de R$ 475/mês. Use nossa calculadora no modo Meta para números exatos."
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
      }
    },
    fr: {
      "name": "Calculateur d'Épargne",
      "slug": "calculateur-epargne",
      "breadcrumb": "Calculateur d'Épargne",
      "seo": {
        "title": "Calculateur d'Épargne - Planificateur d'Objectifs & Estimateur de Croissance",
        "description": "Planifiez votre épargne avec les intérêts composés, les contributions mensuelles et les augmentations annuelles. Fixez des objectifs d'épargne et visualisez les projections année par année. Outil gratuit en ligne.",
        "shortDescription": "Calculez la croissance de l'épargne avec contributions et objectifs.",
        "keywords": [
          "calculateur d'épargne",
          "calculateur objectif épargne",
          "combien épargner",
          "calculateur croissance épargne",
          "calculateur épargne composée",
          "calculateur épargne mensuelle",
          "calculateur épargne gratuit",
          "calculateur plan épargne"
        ]
      },
      "subtitle": "Planifiez votre stratégie d'épargne avec les intérêts composés, les contributions régulières et les augmentations annuelles pour atteindre vos objectifs financiers.",
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "mode": {
          "label": "Mode du Calculateur",
          "helpText": "Le mode croissance montre combien vous aurez. Le mode objectif montre si vous atteindrez votre cible.",
          "options": {
            "growth": "Projection de Croissance",
            "goal": "Objectif d'Épargne"
          }
        },
        "initialDeposit": {
          "label": "Solde Initial",
          "helpText": "Montant que vous avez déjà épargné"
        },
        "monthlyContribution": {
          "label": "Contribution Mensuelle",
          "helpText": "Montant que vous prévoyez épargner chaque mois"
        },
        "contributionIncrease": {
          "label": "Augmentation Annuelle",
          "helpText": "Pourcentage d'augmentation de votre contribution mensuelle chaque année"
        },
        "annualContribution": {
          "label": "Dépôt Bonus Annuel",
          "helpText": "Somme forfaitaire supplémentaire ajoutée une fois par an (ex: remboursement d'impôt, bonus)"
        },
        "interestRate": {
          "label": "Taux d'Intérêt (TAP)",
          "helpText": "Taux d'intérêt annuel de votre compte d'épargne"
        },
        "compoundFrequency": {
          "label": "Fréquence de Composition",
          "helpText": "Fréquence de composition des intérêts sur votre épargne",
          "options": {
            "daily": "Quotidienne (365/an)",
            "monthly": "Mensuelle (12/an)",
            "quarterly": "Trimestrielle (4/an)",
            "semiannually": "Semestrielle (2/an)",
            "annually": "Annuelle (1/an)"
          }
        },
        "timeYears": {
          "label": "Années",
          "helpText": "Nombre d'années que vous prévoyez épargner"
        },
        "timeMonths": {
          "label": "Mois",
          "helpText": "Mois supplémentaires au-delà des années complètes"
        },
        "savingsGoal": {
          "label": "Objectif d'Épargne",
          "helpText": "Votre montant d'épargne cible"
        },
        "includeTax": {
          "label": "Inclure l'Impôt sur les Intérêts",
          "helpText": "Appliquer le taux d'imposition aux intérêts gagnés"
        },
        "taxRate": {
          "label": "Taux d'Imposition",
          "helpText": "Taux d'imposition marginal sur les revenus d'intérêts"
        },
        "includeInflation": {
          "label": "Ajuster pour l'Inflation",
          "helpText": "Afficher le pouvoir d'achat réel de votre épargne"
        },
        "inflationRate": {
          "label": "Taux d'Inflation",
          "helpText": "Inflation annuelle moyenne attendue"
        }
      },
      "results": {
        "endingBalance": {
          "label": "Épargne Totale"
        },
        "totalInterest": {
          "label": "Intérêts Gagnés"
        },
        "totalDeposited": {
          "label": "Total Déposé"
        },
        "effectiveRate": {
          "label": "Taux Effectif (TAE)"
        },
        "goalProgress": {
          "label": "Progression de l'Objectif"
        },
        "goalSurplus": {
          "label": "Surplus / Déficit de l'Objectif"
        },
        "monthlyNeeded": {
          "label": "Mensualité Nécessaire pour l'Objectif"
        },
        "taxPaid": {
          "label": "Impôt sur les Intérêts"
        },
        "buyingPower": {
          "label": "Pouvoir d'Achat"
        },
        "milestoneYear": {
          "label": "Objectif Atteint En"
        }
      },
      "presets": {
        "emergencyFund": {
          "label": "Fonds d'Urgence",
          "description": "1K€ de départ, 500€/mois pendant 18 mois à 4,5%"
        },
        "vacationFund": {
          "label": "Fonds Vacances",
          "description": "Objectif: 8K€ en 2 ans, 300€/mois à 4,5%"
        },
        "downPayment": {
          "label": "Apport Personnel",
          "description": "Objectif: 80K€ en 5 ans, 1K€/mois +3%/an à 5%"
        },
        "collegeFund": {
          "label": "Fonds Études",
          "description": "5K€ de départ, 400€/mois +5%/an pendant 18 ans à 6%"
        },
        "wealthBuilding": {
          "label": "Construction de Patrimoine",
          "description": "25K€ de départ, 1,5K€/mois +3%/an pendant 25 ans à 7%"
        }
      },
      "values": {
        "years": "ans",
        "year": "an",
        "months": "mois",
        "month": "mois",
        "onTrack": "Sur la Bonne Voie",
        "behindSchedule": "En Retard",
        "goalReached": "Objectif Atteint !",
        "surplus": "surplus",
        "shortfall": "déficit",
        "perYear": "/an"
      },
      "formats": {
        "summary": "Votre épargne atteindra {endingBalance} sur {duration}, gagnant {totalInterest} d'intérêts sur {totalDeposited} déposés."
      },
      "infoCards": {
        "metrics": {
          "title": "Aperçus de Croissance",
          "items": [
            {
              "label": "Multiplicateur de Croissance",
              "valueKey": "growthMultiplier"
            },
            {
              "label": "Intérêts en % du Solde",
              "valueKey": "interestPercent"
            },
            {
              "label": "Croissance Mensuelle Moyenne",
              "valueKey": "avgMonthlyGrowth"
            },
            {
              "label": "Contribution Mensuelle Finale",
              "valueKey": "finalMonthlyContrib"
            }
          ]
        },
        "details": {
          "title": "Analyse d'Objectif",
          "items": [
            {
              "label": "Impact de l'Escalade",
              "valueKey": "escalationImpact"
            },
            {
              "label": "Total Bonus Annuel",
              "valueKey": "annualBonusTotal"
            },
            {
              "label": "Rendement Annuel Moyen",
              "valueKey": "avgAnnualReturn"
            },
            {
              "label": "Objectif Atteint En",
              "valueKey": "milestoneYear"
            }
          ]
        },
        "tips": {
          "title": "Conseils d'Épargne",
          "items": [
            "Automatisez votre épargne — configurez des virements automatiques le jour de paie pour vous payer en premier",
            "Augmentez vos contributions annuellement d'au moins le taux d'inflation pour maintenir votre pouvoir d'épargne réel",
            "Gardez votre fonds d'urgence dans un compte épargne à haut rendement pour un accès facile et de meilleurs rendements",
            "Utilisez la règle 50/30/20 : allouez 20% des revenus après impôts à l'épargne et au remboursement des dettes"
          ]
        }
      },
      "chart": {
        "title": "Projection de Croissance d'Épargne",
        "xLabel": "Année",
        "yLabel": "Solde",
        "series": {
          "deposits": "Total Déposé",
          "interest": "Intérêts Gagnés",
          "goal": "Objectif d'Épargne"
        }
      },
      "detailedTable": {
        "savingsTable": {
          "button": "Voir le Tableau d'Épargne Année par Année",
          "title": "Détail d'Épargne Année par Année",
          "columns": {
            "year": "Année",
            "monthlyAmount": "Contrib. Mensuelle",
            "yearDeposits": "Dépôts Annuels",
            "yearInterest": "Intérêts Annuels",
            "totalDeposited": "Total Déposé",
            "balance": "Solde"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Calculateur d'Épargne ?",
          "content": "Un calculateur d'épargne vous aide à projeter comment votre argent croîtra au fil du temps avec des contributions régulières et des intérêts composés. Contrairement aux calculatrices d'intérêts simples qui ne considèrent qu'une somme forfaitaire, un calculateur d'épargne prend en compte les dépôts mensuels continus, les contributions bonus annuelles, et même les augmentations annuelles de votre taux d'épargne. Cela le rend beaucoup plus réaliste pour la planification financière réelle. Que vous construisiez un fonds d'urgence, épargnez pour un apport personnel, ou planifiez l'éducation de votre enfant, un calculateur d'épargne vous montre exactement combien vous aurez à tout moment dans le futur et si vous êtes sur la bonne voie pour atteindre vos objectifs."
        },
        "howItWorks": {
          "title": "Comment la Croissance d'Épargne est Calculée",
          "content": "La croissance d'épargne combine la formule des intérêts composés avec les calculs de valeur future d'annuité. Votre dépôt initial croît selon A = P(1 + r/n)^(nt). Chaque contribution mensuelle est traitée comme un dépôt séparé qui se compose pour son temps restant. Quand vous ajoutez des augmentations annuelles de contribution, le paiement mensuel de chaque année est multiplié par (1 + augmentation%)^année. Le dépôt bonus annuel est ajouté comme une somme forfaitaire au début ou à la fin de chaque année. Pour les calculs d'objectif d'épargne, la contribution mensuelle requise est résolue en utilisant la formule PMT : PMT = (VF - VA(1+r/n)^(nt)) × (r/n) / ((1+r/n)^(nt) - 1), où VF est votre montant objectif."
        },
        "considerations": {
          "title": "Considérations Importantes d'Épargne",
          "items": [
            {
              "text": "L'assurance dépôts couvre jusqu'à 100 000€ par déposant par banque — répartissez les grandes épargnes entre institutions",
              "type": "warning"
            },
            {
              "text": "Les comptes épargne à haut rendement offrent actuellement 3-4% TAE — significativement plus que les banques traditionnelles à 0,01-0,5%",
              "type": "info"
            },
            {
              "text": "L'escalade de contribution est puissante — augmenter l'épargne de seulement 1% par an peut ajouter des dizaines de milliers sur des décennies",
              "type": "info"
            },
            {
              "text": "Les comptes fiscalement avantageux comme le PEA laissent l'épargne croître en franchise d'impôt, améliorant drastiquement les résultats à long terme",
              "type": "info"
            },
            {
              "text": "Les fonds d'urgence doivent couvrir 3-6 mois de dépenses avant d'investir dans des options plus risquées",
              "type": "warning"
            },
            {
              "text": "L'inflation érode l'épargne — un taux d'épargne de 4% avec 3% d'inflation ne donne que 1% de croissance réelle",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Types de Stratégies d'Épargne",
          "items": [
            {
              "text": "Fonds d'Urgence : 3-6 mois de dépenses dans l'épargne à haut rendement, priorité sur tous les autres objectifs d'épargne",
              "type": "info"
            },
            {
              "text": "Fonds Dédiés : Épargne ciblée pour des objectifs spécifiques comme vacances, réparations auto, ou cadeaux",
              "type": "info"
            },
            {
              "text": "Épargne Apport : Typiquement 20% du prix de la maison, généralement 3-7 ans d'épargne concentrée",
              "type": "info"
            },
            {
              "text": "Épargne Éducation : Les plans d'épargne études offrent des avantages fiscaux pour les coûts universitaires, commencez le plus tôt possible",
              "type": "info"
            },
            {
              "text": "Épargne Retraite : Les contributions PER et épargne salariale avec abondement employeur doivent commencer dans la vingtaine",
              "type": "info"
            },
            {
              "text": "Construction de Patrimoine : Après l'urgence et les bases retraite, investissez dans des fonds indiciels diversifiés pour la croissance à long terme",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Croissance d'Épargne",
          "description": "Scénarios d'épargne réels avec intérêts composés",
          "examples": [
            {
              "title": "Fonds d'Urgence : 500€/mois à 4,5% pendant 12 mois",
              "steps": [
                "Solde initial : 0€, Mensuel : 500€, Taux : 4,5% composé quotidiennement",
                "Mois 1 : 500,00€ → gagne ~0,18€",
                "Mois 6 : 3 020€ (déposé 3 000€, gagné 20€)",
                "Mois 12 : 6 113€ (déposé 6 000€, gagné 113€)"
              ],
              "result": "Total : 6 113€ — Vous avez gagné 113€ d'intérêts en construisant votre filet de sécurité"
            },
            {
              "title": "Apport Personnel : 1 000€/mois +3%/an pendant 5 ans à 5%",
              "steps": [
                "Départ : 10 000€, Mensuel : 1 000€ augmentant 3%/an",
                "Année 1 : 1 000€/mois → solde 22 310€",
                "Année 3 : 1 061€/mois → solde 49 832€",
                "Année 5 : 1 126€/mois → solde 82 540€",
                "Total déposé : 75 185€, Intérêts : 7 355€"
              ],
              "result": "Final : 82 540€ — L'escalade de contribution a ajouté 3 700€+ vs 1 000€/mois fixe"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien devrais-je avoir en épargne ?",
          "answer": "Les experts financiers recommandent généralement d'avoir 3-6 mois de dépenses essentielles dans un fonds d'urgence comme base. Au-delà, les objectifs d'épargne dépendent de votre situation : 20% du prix de votre logement pour un apport, 100 000€+ pour les études par enfant, et 10-15% des revenus pour la retraite. La règle 50/30/20 suggère d'allouer 20% des revenus après impôts à l'épargne et au remboursement des dettes. Commencez par le fonds d'urgence, puis travaillez simultanément vers d'autres objectifs."
        },
        {
          "question": "Qu'est-ce que l'escalade de contribution et pourquoi est-ce important ?",
          "answer": "L'escalade de contribution signifie augmenter votre montant d'épargne mensuel d'un pourcentage fixe chaque année. Même une augmentation annuelle de 3% — environ égale à l'inflation — peut considérablement augmenter votre épargne à long terme. Par exemple, commencer à 500€/mois avec 3% d'augmentation annuelle sur 20 ans résulte en économiser environ 16 000€ de plus que de garder les contributions plates, plus les intérêts composés supplémentaires sur ces dépôts extra. La plupart des employeurs offrent l'escalade automatique d'épargne salariale pour cette raison."
        },
        {
          "question": "Dois-je épargner dans un compte épargne à haut rendement ou investir ?",
          "answer": "Cela dépend de votre horizon temporel et de vos objectifs. Pour les objectifs à court terme (moins de 3 ans) et les fonds d'urgence, les comptes épargne à haut rendement offrant 3-4% TAE sont idéaux car ils fournissent une garantie dépôts et un accès instantané. Pour les objectifs à 5+ ans, investir dans des fonds indiciels diversifiés rapporte historiquement 7-10% annuellement, bien qu'avec plus de volatilité. Pour les objectifs 3-5 ans, les comptes à terme ou fonds obligataires offrent un terrain d'entente entre sécurité et rendements."
        },
        {
          "question": "Comment la fréquence de composition affecte-t-elle mon épargne ?",
          "answer": "La composition quotidienne rapporte légèrement plus que la composition mensuelle ou annuelle. À 5% TAP : la composition annuelle donne exactement 5,000% TAE, mensuelle donne 5,116% TAE, et quotidienne donne 5,127% TAE. La différence entre quotidienne et mensuelle est minimale (environ 1€ par 10 000€ par an), donc ne changez pas de banque juste pour la fréquence de composition. Concentrez-vous plutôt sur le taux TAE réel, qui prend déjà en compte la composition."
        },
        {
          "question": "Quelle est la différence entre TAP et TAE pour l'épargne ?",
          "answer": "TAP (Taux Annuel Proportionnel) est le taux d'intérêt déclaré sans tenir compte de la composition. TAE (Taux Annuel Effectif) inclut l'effet de la composition et représente votre vrai rendement annuel. Les banques sont tenues d'afficher le TAE sur les produits d'épargne. Par exemple, 5% TAP avec composition mensuelle équivaut à 5,116% TAE. Quand vous comparez les comptes épargne, comparez toujours TAE à TAE pour une comparaison précise."
        },
        {
          "question": "Comment calculer combien je dois épargner mensuellement pour atteindre un objectif ?",
          "answer": "Utilisez la formule : PMT = (Objectif - DépôtInitial × (1+r/n)^(nt)) × (r/n) / ((1+r/n)^(nt) - 1). Pour une estimation plus simple sans intérêts, divisez votre objectif moins l'épargne actuelle par le nombre de mois. Par exemple, pour épargner 20 000€ en 3 ans en partant de 2 000€ : (20 000€ - 2 000€) / 36 = 500€/mois minimum. Avec 4,5% d'intérêts, vous auriez en fait besoin d'environ 475€/mois. Utilisez notre calculateur en mode Objectif pour des chiffres exacts."
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
      }
    },
    de: {
      "name": "Sparrechner",
      "slug": "sparrechner-rechner",
      "breadcrumb": "Sparrechner",
      "seo": {
        "title": "Sparrechner - Zielplaner & Wachstumsschätzer",
        "description": "Planen Sie Ihre Ersparnisse mit Zinseszinsen, monatlichen Beiträgen und jährlichen Erhöhungen. Setzen Sie Sparziele und sehen Sie Jahr-für-Jahr-Projektionen. Kostenloses Online-Tool.",
        "shortDescription": "Berechnen Sie Sparwachstum mit Beiträgen und Zielen.",
        "keywords": [
          "sparrechner",
          "sparziel rechner",
          "wie viel soll ich sparen",
          "sparwachstum rechner",
          "zinseszins sparrechner",
          "monatlicher sparrechner",
          "kostenloser sparrechner",
          "sparplan rechner"
        ]
      },
      "subtitle": "Planen Sie Ihre Sparstrategie mit Zinseszinsen, regelmäßigen Beiträgen und jährlichen Erhöhungen, um Ihre finanziellen Ziele zu erreichen.",
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "mode": {
          "label": "Rechner-Modus",
          "helpText": "Wachstumsmodus zeigt, wie viel Sie haben werden. Zielmodus zeigt, ob Sie Ihr Ziel erreichen.",
          "options": {
            "growth": "Wachstumsprognose",
            "goal": "Sparziel"
          }
        },
        "initialDeposit": {
          "label": "Anfangsguthaben",
          "helpText": "Wie viel Sie bereits gespart haben"
        },
        "monthlyContribution": {
          "label": "Monatlicher Beitrag",
          "helpText": "Betrag, den Sie jeden Monat zu sparen planen"
        },
        "contributionIncrease": {
          "label": "Jährliche Erhöhung",
          "helpText": "Prozentsatz zur Erhöhung Ihres monatlichen Beitrags jedes Jahr"
        },
        "annualContribution": {
          "label": "Jährliche Bonuseinzahlung",
          "helpText": "Extra Pauschalbetrag einmal pro Jahr hinzugefügt (z.B. Steuerrückerstattung, Bonus)"
        },
        "interestRate": {
          "label": "Zinssatz (Nominal)",
          "helpText": "Jährlicher Zinssatz auf Ihr Sparkonto"
        },
        "compoundFrequency": {
          "label": "Zinseszins-Häufigkeit",
          "helpText": "Wie oft Zinsen auf Ihre Ersparnisse aufgezinst werden",
          "options": {
            "daily": "Täglich (365/Jahr)",
            "monthly": "Monatlich (12/Jahr)",
            "quarterly": "Vierteljährlich (4/Jahr)",
            "semiannually": "Halbjährlich (2/Jahr)",
            "annually": "Jährlich (1/Jahr)"
          }
        },
        "timeYears": {
          "label": "Jahre",
          "helpText": "Wie viele Jahre Sie zu sparen planen"
        },
        "timeMonths": {
          "label": "Monate",
          "helpText": "Zusätzliche Monate über volle Jahre hinaus"
        },
        "savingsGoal": {
          "label": "Sparziel",
          "helpText": "Ihr angestrebter Sparbetrag"
        },
        "includeTax": {
          "label": "Steuer auf Zinsen einbeziehen",
          "helpText": "Steuersatz auf verdiente Zinsen anwenden"
        },
        "taxRate": {
          "label": "Steuersatz",
          "helpText": "Grenzsteuersatz auf Zinseinkommen"
        },
        "includeInflation": {
          "label": "Für Inflation anpassen",
          "helpText": "Reale Kaufkraft Ihrer Ersparnisse anzeigen"
        },
        "inflationRate": {
          "label": "Inflationsrate",
          "helpText": "Erwartete durchschnittliche jährliche Inflation"
        }
      },
      "results": {
        "endingBalance": {
          "label": "Gesamtersparnisse"
        },
        "totalInterest": {
          "label": "Verdiente Zinsen"
        },
        "totalDeposited": {
          "label": "Gesamteinzahlung"
        },
        "effectiveRate": {
          "label": "Effektivzins (Rendite)"
        },
        "goalProgress": {
          "label": "Zielfortschritt"
        },
        "goalSurplus": {
          "label": "Zielüberschuss / Fehlbetrag"
        },
        "monthlyNeeded": {
          "label": "Monatlich für Ziel benötigt"
        },
        "taxPaid": {
          "label": "Steuer auf Zinsen"
        },
        "buyingPower": {
          "label": "Kaufkraft"
        },
        "milestoneYear": {
          "label": "Ziel erreicht in"
        }
      },
      "presets": {
        "emergencyFund": {
          "label": "Notfallfonds",
          "description": "1.000€ Start, 500€/Monat für 18 Monate bei 4,5%"
        },
        "vacationFund": {
          "label": "Urlaubsfonds",
          "description": "Ziel: 8.000€ in 2 Jahren, 300€/Monat bei 4,5%"
        },
        "downPayment": {
          "label": "Anzahlung",
          "description": "Ziel: 80.000€ in 5 Jahren, 1.000€/Monat +3%/Jahr bei 5%"
        },
        "collegeFund": {
          "label": "Studienfonds",
          "description": "5.000€ Start, 400€/Monat +5%/Jahr für 18 Jahre bei 6%"
        },
        "wealthBuilding": {
          "label": "Vermögensaufbau",
          "description": "25.000€ Start, 1.500€/Monat +3%/Jahr für 25 Jahre bei 7%"
        }
      },
      "values": {
        "years": "Jahre",
        "year": "Jahr",
        "months": "Monate",
        "month": "Monat",
        "onTrack": "Im Plan",
        "behindSchedule": "Hinter dem Plan",
        "goalReached": "Ziel erreicht!",
        "surplus": "Überschuss",
        "shortfall": "Fehlbetrag",
        "perYear": "/Jahr"
      },
      "formats": {
        "summary": "Ihre Ersparnisse werden {endingBalance} über {duration} erreichen und {totalInterest} an Zinsen auf {totalDeposited} eingezahlte Beträge verdienen."
      },
      "infoCards": {
        "metrics": {
          "title": "Wachstumseinblicke",
          "items": [
            {
              "label": "Wachstumsmultiplikator",
              "valueKey": "growthMultiplier"
            },
            {
              "label": "Zinsen als % des Guthabens",
              "valueKey": "interestPercent"
            },
            {
              "label": "Durchschnittliches monatliches Wachstum",
              "valueKey": "avgMonthlyGrowth"
            },
            {
              "label": "Letzter monatlicher Beitrag",
              "valueKey": "finalMonthlyContrib"
            }
          ]
        },
        "details": {
          "title": "Zielanalyse",
          "items": [
            {
              "label": "Steigerungseffekt",
              "valueKey": "escalationImpact"
            },
            {
              "label": "Jährliche Bonussumme",
              "valueKey": "annualBonusTotal"
            },
            {
              "label": "Durchschnittliche jährliche Rendite",
              "valueKey": "avgAnnualReturn"
            },
            {
              "label": "Meilenstein erreicht in",
              "valueKey": "milestoneYear"
            }
          ]
        },
        "tips": {
          "title": "Spartipps",
          "items": [
            "Automatisieren Sie Ihre Ersparnisse — richten Sie automatische Überweisungen am Zahltag ein, damit Sie sich zuerst selbst bezahlen",
            "Erhöhen Sie Beiträge jährlich mindestens um die Inflationsrate, um die reale Sparkraft zu erhalten",
            "Bewahren Sie Ihren Notfallfonds in einem hochverzinslichen Sparkonto für einfachen Zugang und bessere Renditen auf",
            "Verwenden Sie die 50/30/20-Regel: weisen Sie 20% des Nettoeinkommens für Ersparnisse und Schuldentilgung zu"
          ]
        }
      },
      "chart": {
        "title": "Sparwachstumsprognose",
        "xLabel": "Jahr",
        "yLabel": "Guthaben",
        "series": {
          "deposits": "Gesamteinzahlungen",
          "interest": "Verdiente Zinsen",
          "goal": "Sparziel"
        }
      },
      "detailedTable": {
        "savingsTable": {
          "button": "Jahr-für-Jahr-Spartabelle anzeigen",
          "title": "Jahr-für-Jahr-Sparaufschlüsselung",
          "columns": {
            "year": "Jahr",
            "monthlyAmount": "Monatl. Beitrag",
            "yearDeposits": "Jahreseinzahlungen",
            "yearInterest": "Jahreszinsen",
            "totalDeposited": "Gesamteinzahlung",
            "balance": "Guthaben"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Sparrechner?",
          "content": "Ein Sparrechner hilft Ihnen zu prognostizieren, wie Ihr Geld im Laufe der Zeit mit regelmäßigen Beiträgen und Zinseszinsen wachsen wird. Im Gegensatz zu einfachen Zinsrechnern, die nur eine Pauschalsumme berücksichtigen, berücksichtigt ein Sparrechner laufende monatliche Einzahlungen, jährliche Bonusbeiträge und sogar jährliche Erhöhungen Ihres Sparsatzes. Dies macht ihn viel realistischer für die tatsächliche Finanzplanung. Ob Sie einen Notfallfonds aufbauen, für eine Anzahlung sparen oder für die Bildung Ihres Kindes planen, ein Sparrechner zeigt Ihnen genau, wie viel Sie zu jedem Zeitpunkt in der Zukunft haben werden und ob Sie auf dem richtigen Weg sind, Ihre Ziele zu erreichen."
        },
        "howItWorks": {
          "title": "Wie Sparwachstum berechnet wird",
          "content": "Sparwachstum kombiniert die Zinseszinsformel mit Zukunftswertberechnungen von Rentenrechnungen. Ihre Anfangseinlage wächst mit A = P(1 + r/n)^(nt). Jeder monatliche Beitrag wird als separate Einlage behandelt, die für ihre verbleibende Zeit aufgezinst wird. Wenn Sie jährliche Beitragssteigerungen hinzufügen, wird die monatliche Zahlung jedes Jahres mit (1 + Steigerung%)^Jahr multipliziert. Die jährliche Bonuseinlage wird als Pauschalsumme am Anfang oder Ende jedes Jahres hinzugefügt. Für Sparzielerechnungen wird der erforderliche monatliche Beitrag mit der PMT-Formel gelöst: PMT = (ZW - BW(1+r/n)^(nt)) × (r/n) / ((1+r/n)^(nt) - 1), wobei ZW Ihr Zielbetrag ist."
        },
        "considerations": {
          "title": "Wichtige Sparüberlegungen",
          "items": [
            {
              "text": "Einlagensicherung deckt bis zu 100.000€ pro Sparer pro Bank ab — verteilen Sie große Ersparnisse auf mehrere Institute",
              "type": "warning"
            },
            {
              "text": "Hochzinsige Sparkonten bieten derzeit 3-4% Rendite — deutlich mehr als traditionelle Banken mit 0,01-0,1%",
              "type": "info"
            },
            {
              "text": "Beitragssteigerung ist mächtig — Ersparnisse um nur 1% pro Jahr zu erhöhen kann über Jahrzehnte Zehntausende hinzufügen",
              "type": "info"
            },
            {
              "text": "Steuerlich begünstigte Konten lassen Ersparnisse steuerfrei wachsen und verbessern langfristige Ergebnisse dramatisch",
              "type": "info"
            },
            {
              "text": "Notfallfonds sollten 3-6 Monatsausgaben decken, bevor in riskantere Optionen investiert wird",
              "type": "warning"
            },
            {
              "text": "Inflation erodiert Ersparnisse — ein 4% Sparsatz mit 3% Inflation ergibt nur 1% reales Wachstum",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Arten von Sparstrategien",
          "items": [
            {
              "text": "Notfallfonds: 3-6 Monatsausgaben in hochzinsigen Ersparnissen, priorisiert vor allen anderen Sparzielen",
              "type": "info"
            },
            {
              "text": "Zwecksparen: Gezieltes Sparen für spezifische Ziele wie Urlaub, Autoreparaturen oder Weihnachtsgeschenke",
              "type": "info"
            },
            {
              "text": "Anzahlungssparen: Typisch 20% des Hauspreises, normalerweise 3-7 Jahre fokussiertes Sparen",
              "type": "info"
            },
            {
              "text": "Bildungssparen: Bildungssparpläne bieten Steuervorteile für Studienkosten, so früh wie möglich beginnen",
              "type": "info"
            },
            {
              "text": "Altersvorsorge: Betriebliche und private Rentenbeiträge mit Arbeitgeberzuschuss sollten in den 20ern beginnen",
              "type": "info"
            },
            {
              "text": "Vermögensaufbau: Nach Notfall- und Rentengrundlagen in diversifizierte Indexfonds für langfristiges Wachstum investieren",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Sparwachstumsbeispiele",
          "description": "Realistische Sparszenarien mit Zinseszinsen",
          "examples": [
            {
              "title": "Notfallfonds: 500€/Monat bei 4,5% für 12 Monate",
              "steps": [
                "Startguthaben: 0€, Monatlich: 500€, Zinssatz: 4,5% täglich aufgezinst",
                "Monat 1: 500,00€ → verdient ~0,18€",
                "Monat 6: 3.020€ (eingezahlt 3.000€, verdient 20€)",
                "Monat 12: 6.113€ (eingezahlt 6.000€, verdient 113€)"
              ],
              "result": "Gesamt: 6.113€ — Sie verdienten 113€ an Zinsen beim Aufbau Ihres Sicherheitsnetzes"
            },
            {
              "title": "Anzahlung: 1.000€/Monat +3%/Jahr für 5 Jahre bei 5%",
              "steps": [
                "Start: 10.000€, Monatlich: 1.000€ steigend um 3%/Jahr",
                "Jahr 1: 1.000€/Monat → 22.310€ Guthaben",
                "Jahr 3: 1.061€/Monat → 49.832€ Guthaben",
                "Jahr 5: 1.126€/Monat → 82.540€ Guthaben",
                "Gesamteingezahlt: 75.185€, Zinsen: 7.355€"
              ],
              "result": "Endstand: 82.540€ — Beitragssteigerung fügte 3.700€+ vs. konstante 1.000€/Monat hinzu"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viel sollte ich gespart haben?",
          "answer": "Finanzexperten empfehlen im Allgemeinen, 3-6 Monate der wesentlichen Ausgaben in einem Notfallfonds als Grundlage zu haben. darüber hinaus hängen Sparziele von Ihrer Situation ab: 20% des Hauspreises für eine Anzahlung, 250.000€+ für Studium pro Kind und 10-15% des Einkommens für die Rente. Die 50/30/20-Regel schlägt vor, 20% des Nettoeinkommens für Ersparnisse und Schuldentilgung zuzuweisen. Beginnen Sie mit dem Notfallfonds und arbeiten Sie dann gleichzeitig an anderen Zielen."
        },
        {
          "question": "Was ist Beitragssteigerung und warum ist sie wichtig?",
          "answer": "Beitragssteigerung bedeutet, Ihren monatlichen Sparbetrag jedes Jahr um einen festen Prozentsatz zu erhöhen. Selbst eine 3%ige jährliche Erhöhung — etwa entsprechend der Inflation — kann Ihre langfristigen Ersparnisse erheblich steigern. Zum Beispiel führt ein Start bei 500€/Monat mit 3% jährlichen Erhöhungen über 20 Jahre dazu, etwa 16.000€ mehr zu sparen als bei konstanten Beiträgen, plus zusätzliche Zinseszinsen auf diese Extraeinlagen. Die meisten Arbeitgeber bieten aus diesem Grund automatische betriebliche Rentensteigerung an."
        },
        {
          "question": "Sollte ich in einem hochzinsigen Sparkonto sparen oder investieren?",
          "answer": "Es hängt von Ihrem Zeitrahmen und Ihren Zielen ab. Für kurzfristige Ziele (unter 3 Jahren) und Notfallfonds sind hochzinsige Sparkonten mit 3-4% Rendite ideal, da sie Einlagensicherung und sofortigen Zugang bieten. Für Ziele 5+ Jahre entfernt bringen Investitionen in diversifizierte Indexfonds historisch 7-10% jährlich, allerdings mit mehr Volatilität. Für 3-5 Jahre Ziele bieten Festgelder oder Anleihenfonds einen Mittelweg zwischen Sicherheit und Renditen."
        },
        {
          "question": "Wie beeinflusst die Zinseszinshäufigkeit meine Ersparnisse?",
          "answer": "Tägliche Aufzinsung verdient etwas mehr als monatliche oder jährliche Aufzinsung. Bei 5% Nominalzins: jährliche Aufzinsung ergibt genau 5,000% Effektivzins, monatliche ergibt 5,116% und tägliche ergibt 5,127%. Der Unterschied zwischen täglich und monatlich ist minimal (etwa 1€ pro 10.000€ pro Jahr), also wechseln Sie nicht die Bank nur wegen der Aufzinsungshäufigkeit. Konzentrieren Sie sich stattdessen auf den tatsächlichen Effektivzins, der bereits die Aufzinsung berücksichtigt."
        },
        {
          "question": "Was ist der Unterschied zwischen Nominalzins und Effektivzins bei Ersparnissen?",
          "answer": "Nominalzins ist der angegebene Zinssatz ohne Berücksichtigung der Aufzinsung. Effektivzins beinhaltet den Effekt der Aufzinsung und stellt Ihre wahre jährliche Rendite dar. Banken sind verpflichtet, den Effektivzins bei Sparprodukten zu bewerben. Zum Beispiel entsprechen 5% Nominalzins mit monatlicher Aufzinsung 5,116% Effektivzins. Beim Vergleich von Sparkonten vergleichen Sie immer Effektivzins mit Effektivzins für einen genauen Vergleich."
        },
        {
          "question": "Wie berechne ich, wie viel ich monatlich sparen muss, um ein Ziel zu erreichen?",
          "answer": "Verwenden Sie die Formel: PMT = (Ziel - Anfangseinlage × (1+r/n)^(nt)) × (r/n) / ((1+r/n)^(nt) - 1). Für eine einfachere Schätzung ohne Zinsen teilen Sie Ihr Ziel minus aktuelle Ersparnisse durch die Anzahl der Monate. Zum Beispiel, um 20.000€ in 3 Jahren ab 2.000€ zu sparen: (20.000€ - 2.000€) / 36 = 500€/Monat Minimum. Mit 4,5% Zinsen bräuchten Sie tatsächlich etwa 475€/Monat. Verwenden Sie unseren Rechner im Zielmodus für genaue Zahlen."
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
      }
    },
  },

  // ─── INPUTS ─────────────────────────────────────────────────────
  inputs: [
    {
      id: "mode",
      type: "radio",
      defaultValue: "growth",
      options: [{ value: "growth" }, { value: "goal" }],
    },
    {
      id: "initialDeposit",
      type: "number",
      defaultValue: null,
      placeholder: "5000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 100000000,
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
      id: "contributionIncrease",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 50,
      step: 0.5,
      suffix: "%",
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
      id: "interestRate",
      type: "number",
      defaultValue: 4.5,
      min: 0,
      max: 50,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "compoundFrequency",
      type: "select",
      defaultValue: "daily",
      options: [
        { value: "daily" },
        { value: "monthly" },
        { value: "quarterly" },
        { value: "semiannually" },
        { value: "annually" },
      ],
    },
    {
      id: "timeYears",
      type: "number",
      defaultValue: 5,
      min: 0,
      max: 100,
      step: 1,
      suffix: "years",
      width: "half",
    },
    {
      id: "timeMonths",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 11,
      step: 1,
      suffix: "months",
      width: "half",
    },
    {
      id: "savingsGoal",
      type: "number",
      defaultValue: 50000,
      placeholder: "50000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 100000000,
      showWhen: { field: "mode", value: "goal" },
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

  results: [
    { id: "endingBalance", type: "primary", format: "number" },
    { id: "totalInterest", type: "secondary", format: "number" },
    { id: "totalDeposited", type: "secondary", format: "number" },
    { id: "effectiveRate", type: "secondary", format: "percent" },
    { id: "goalProgress", type: "secondary", format: "text" },
    { id: "goalSurplus", type: "secondary", format: "number" },
    { id: "monthlyNeeded", type: "secondary", format: "number" },
    { id: "taxPaid", type: "secondary", format: "number" },
    { id: "buyingPower", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "💰", itemCount: 4 },
    { id: "details", type: "list", icon: "🎯", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "savingsGrowth",
    type: "composed",
    xKey: "year",
    height: 340,
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "deposits", type: "area", stackId: "savings", color: "#3b82f6" },
      { key: "interest", type: "area", stackId: "savings", color: "#10b981" },
      { key: "goal", type: "line", color: "#f97316", dashed: true },
    ],
  },

  detailedTable: {
    id: "savingsTable",
    buttonLabel: "View Year-by-Year Savings Table",
    buttonIcon: "📅",
    modalTitle: "Year-by-Year Savings Breakdown",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "monthlyAmount", label: "Monthly Contrib.", align: "right" },
      { id: "yearDeposits", label: "Year Deposits", align: "right" },
      { id: "yearInterest", label: "Year Interest", align: "right" },
      { id: "totalDeposited", label: "Total Deposited", align: "right" },
      { id: "balance", label: "Balance", align: "right", highlight: true },
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

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2024",
      title: "Start Saving — Building Your Emergency Fund",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/start-small-save-up/start-saving/",
    },
    {
      authors: "Federal Deposit Insurance Corporation",
      year: "2024",
      title: "Deposit Insurance FAQs — Are My Deposits Insured?",
      source: "FDIC",
      url: "https://www.fdic.gov/resources/deposit-insurance/faq/",
    },
  ],

  hero: { badge: "Finance", headline: "Savings Calculator" },
  sidebar: {},
  features: {},
  relatedCalculators: [
    "interest-calculator",
    "investment-calculator",
    "retirement-calculator",
    "compound-interest-calculator",
  ],
  ads: {},
};

// ═══════════════════════════════════════════════════════════════════
// 🧮 CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════

export function calculateSavingsCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Read inputs ────────────────────────────────────────────
  const mode = (values.mode as string) || "growth";
  const initialDeposit = (values.initialDeposit as number | null) ?? 0;
  const monthlyBase = (values.monthlyContribution as number | null) ?? 0;
  const contributionIncrease = (values.contributionIncrease as number | null) ?? 0;
  const annualContribution = (values.annualContribution as number | null) ?? 0;
  const interestRate = (values.interestRate as number | null) ?? 4.5;
  const compoundFrequency = (values.compoundFrequency as string) || "daily";
  const timeYears = (values.timeYears as number | null) ?? 0;
  const timeMonths = (values.timeMonths as number | null) ?? 0;
  const savingsGoal = (values.savingsGoal as number | null) ?? 0;
  const includeTax = values.includeTax === true;
  const taxRate = includeTax ? ((values.taxRate as number | null) ?? 25) : 0;
  const includeInflation = values.includeInflation === true;
  const inflationRate = includeInflation ? ((values.inflationRate as number | null) ?? 3) : 0;

  const totalMonths = timeYears * 12 + timeMonths;
  if (totalMonths <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Need at least some money to calculate
  if (initialDeposit <= 0 && monthlyBase <= 0 && annualContribution <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ─── Compounding ────────────────────────────────────────────
  const compMap: Record<string, number> = {
    daily: 365, monthly: 12, quarterly: 4, semiannually: 2, annually: 1,
  };
  const n = compMap[compoundFrequency] || 12;
  const r = interestRate / 100;
  const totalYears = totalMonths / 12;

  // ─── Month-by-month simulation ──────────────────────────────
  let balance = initialDeposit;
  let totalInterest = 0;
  let totalDeposited = initialDeposit;
  let milestoneMonth = -1;

  const chartData: Array<Record<string, unknown>> = [];
  const tableData: Array<Record<string, unknown>> = [];
  const currSym = sym(fieldUnits);

  // Year 0
  chartData.push({
    year: "0",
    deposits: initialDeposit,
    interest: 0,
    balance: initialDeposit,
    goal: mode === "goal" && savingsGoal > 0 ? savingsGoal : undefined,
  });

  const totalYearsInt = Math.ceil(totalYears);

  for (let year = 1; year <= totalYearsInt; year++) {
    const monthsThisYear = year === totalYearsInt && totalMonths % 12 !== 0
      ? totalMonths % 12
      : 12;

    // Monthly contribution with escalation
    const escalationFactor = Math.pow(1 + contributionIncrease / 100, year - 1);
    const currentMonthly = monthlyBase * escalationFactor;

    let yearDeposits = 0;
    let yearInterest = 0;

    // Annual bonus at start of year
    if (annualContribution > 0 && year <= Math.floor(totalYears) + (totalMonths % 12 > 0 ? 1 : 0)) {
      balance += annualContribution;
      totalDeposited += annualContribution;
      yearDeposits += annualContribution;
    }

    for (let month = 1; month <= monthsThisYear; month++) {
      // Monthly contribution
      if (currentMonthly > 0) {
        balance += currentMonthly;
        totalDeposited += currentMonthly;
        yearDeposits += currentMonthly;
      }

      // Interest for this month
      const monthInterest = balance * (Math.pow(1 + r / n, n / 12) - 1);
      balance += monthInterest;
      totalInterest += monthInterest;
      yearInterest += monthInterest;

      // Check milestone
      if (milestoneMonth === -1 && mode === "goal" && savingsGoal > 0 && balance >= savingsGoal) {
        milestoneMonth = (year - 1) * 12 + month;
      }
    }

    chartData.push({
      year: `${year}`,
      deposits: Math.round(totalDeposited),
      interest: Math.round(totalInterest),
      balance: Math.round(balance),
      goal: mode === "goal" && savingsGoal > 0 ? savingsGoal : undefined,
    });

    tableData.push({
      year: `${year}`,
      monthlyAmount: fmtCurr(currentMonthly, currSym),
      yearDeposits: fmtCurr(yearDeposits, currSym),
      yearInterest: fmtCurr(yearInterest, currSym),
      totalDeposited: fmtCurr(totalDeposited, currSym),
      balance: fmtCurr(balance, currSym),
    });
  }

  // ─── APY ────────────────────────────────────────────────────
  const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;

  // ─── Goal calculations ─────────────────────────────────────
  let goalProgress = 0;
  let goalSurplus = 0;
  let monthlyNeeded = 0;

  if (mode === "goal" && savingsGoal > 0) {
    goalProgress = Math.min((balance / savingsGoal) * 100, 999);
    goalSurplus = balance - savingsGoal;

    // Calculate monthly needed to reach goal
    const ratePerMonth = Math.pow(1 + r / n, n / 12) - 1;
    if (ratePerMonth > 0 && totalMonths > 0) {
      const fvInitial = initialDeposit * Math.pow(1 + ratePerMonth, totalMonths);
      const remaining = savingsGoal - fvInitial;
      if (remaining > 0) {
        monthlyNeeded = remaining * ratePerMonth / (Math.pow(1 + ratePerMonth, totalMonths) - 1);
      }
    } else if (totalMonths > 0) {
      monthlyNeeded = Math.max(0, (savingsGoal - initialDeposit) / totalMonths);
    }
  }

  // ─── Tax & Inflation ────────────────────────────────────────
  const taxPaidAmount = includeTax ? totalInterest * (taxRate / 100) : 0;
  const inflationFactor = includeInflation ? Math.pow(1 + inflationRate / 100, totalYears) : 1;
  const buyingPowerAmount = balance / inflationFactor;

  // ─── Duration label ─────────────────────────────────────────
  const yrLabel = timeYears === 1 ? (v["year"] || "year") : (v["years"] || "years");
  const moLabel = timeMonths === 1 ? (v["month"] || "month") : (v["months"] || "months");
  let duration = "";
  if (timeYears > 0 && timeMonths > 0) duration = `${timeYears} ${yrLabel} ${timeMonths} ${moLabel}`;
  else if (timeYears > 0) duration = `${timeYears} ${yrLabel}`;
  else duration = `${timeMonths} ${moLabel}`;

  // ─── Milestone label ────────────────────────────────────────
  let milestoneLabel = "—";
  if (mode === "goal" && savingsGoal > 0) {
    if (milestoneMonth > 0) {
      const mYears = Math.floor(milestoneMonth / 12);
      const mMonths = milestoneMonth % 12;
      if (mYears > 0 && mMonths > 0) milestoneLabel = `${mYears} ${v["years"] || "years"} ${mMonths} ${v["months"] || "months"}`;
      else if (mYears > 0) milestoneLabel = `${mYears} ${v["years"] || "years"}`;
      else milestoneLabel = `${mMonths} ${v["months"] || "months"}`;
    } else {
      milestoneLabel = v["behindSchedule"] || "Not reached in timeframe";
    }
  }

  // ─── Goal progress label ────────────────────────────────────
  let goalProgressLabel = "—";
  if (mode === "goal" && savingsGoal > 0) {
    goalProgressLabel = `${goalProgress.toFixed(1)}%`;
    if (balance >= savingsGoal) goalProgressLabel += ` — ${v["goalReached"] || "Goal Reached!"}`;
    else goalProgressLabel += ` — ${v["behindSchedule"] || "Behind Schedule"}`;
  }

  // ─── Summary ────────────────────────────────────────────────
  const summary = (f.summary || "Your savings will reach {endingBalance} over {duration}, earning {totalInterest} in interest on {totalDeposited} deposited.")
    .replace("{endingBalance}", fmtCurr(balance, currSym))
    .replace("{duration}", duration)
    .replace("{totalInterest}", fmtCurr(totalInterest, currSym))
    .replace("{totalDeposited}", fmtCurr(totalDeposited, currSym));

  // ─── NEW: InfoCard-only computed values ──────────────────────
  const growthMult = totalDeposited > 0 ? balance / totalDeposited : 0;
  const interestPct = balance > 0 ? (totalInterest / balance) * 100 : 0;
  const avgMonthGrowth = totalMonths > 0 ? (balance - initialDeposit) / totalMonths : 0;
  const finalEscalation = Math.pow(1 + contributionIncrease / 100, Math.max(0, totalYearsInt - 1));
  const finalMonthly = monthlyBase * finalEscalation;
  const escalationExtra = contributionIncrease > 0
    ? (totalDeposited - initialDeposit - (monthlyBase * totalMonths) - (annualContribution * totalYearsInt))
    : 0;
  const annualBonusTot = annualContribution * Math.min(totalYearsInt, Math.floor(totalYears) + (totalMonths % 12 > 0 ? 1 : 0));
  const avgAnnualRet = totalYears > 0 ? totalInterest / totalYears : 0;

  return {
    values: {
      endingBalance: Math.round(balance * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalDeposited: Math.round(totalDeposited * 100) / 100,
      effectiveRate: Math.round(effectiveRate * 1000) / 1000,
      goalProgress: Math.round(goalProgress * 10) / 10,
      goalSurplus: Math.round(goalSurplus * 100) / 100,
      monthlyNeeded: Math.round(monthlyNeeded * 100) / 100,
      taxPaid: Math.round(taxPaidAmount * 100) / 100,
      buyingPower: Math.round(buyingPowerAmount * 100) / 100,
      growthMultiplier: Math.round(growthMult * 100) / 100,
      interestPercent: Math.round(interestPct * 10) / 10,
      avgMonthlyGrowth: Math.round(avgMonthGrowth * 100) / 100,
      finalMonthlyContrib: Math.round(finalMonthly * 100) / 100,
      escalationImpact: Math.round(escalationExtra * 100) / 100,
      annualBonusTotal: Math.round(annualBonusTot * 100) / 100,
      avgAnnualReturn: Math.round(avgAnnualRet * 100) / 100,
    },
    formatted: {
      endingBalance: fmtCurr(balance, currSym),
      totalInterest: fmtCurr(totalInterest, currSym),
      totalDeposited: fmtCurr(totalDeposited, currSym),
      effectiveRate: `${effectiveRate.toFixed(3)}%`,
      goalProgress: goalProgressLabel,
      goalSurplus: mode === "goal" && savingsGoal > 0
        ? `${goalSurplus >= 0 ? "+" : ""}${fmtCurr(goalSurplus, currSym)}`
        : "—",
      monthlyNeeded: mode === "goal" && savingsGoal > 0 ? `${fmtCurr(monthlyNeeded, currSym)}/mo` : "—",
      taxPaid: includeTax ? fmtCurr(taxPaidAmount, currSym) : "—",
      buyingPower: includeInflation ? fmtCurr(buyingPowerAmount, currSym) : "—",
      milestoneYear: milestoneLabel,
      growthMultiplier: `${growthMult.toFixed(2)}x`,
      interestPercent: `${interestPct.toFixed(1)}%`,
      avgMonthlyGrowth: fmtCurr(avgMonthGrowth, currSym),
      finalMonthlyContrib: fmtCurr(finalMonthly, currSym),
      escalationImpact: escalationExtra > 0 ? `+${fmtCurr(escalationExtra, currSym)}` : "—",
      annualBonusTotal: annualContribution > 0 ? fmtCurr(annualBonusTot, currSym) : "—",
      avgAnnualReturn: fmtCurr(avgAnnualRet, currSym),
    },
    summary,
    isValid: true,
    metadata: { chartData, tableData },
  };
}

function sym(fieldUnits?: Record<string, string>): string {
  const curr = fieldUnits?.initialDeposit || "USD";
  const S: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$", JPY: "¥", INR: "₹",
    CAD: "C$", AUD: "A$", CHF: "CHF ", COP: "COL$", ARS: "AR$", PEN: "S/",
    CLP: "CLP ", CNY: "¥", KRW: "₩", SEK: "kr", NOK: "kr", DKK: "kr",
    PLN: "zł", CZK: "Kč", HUF: "Ft", TRY: "₺", ZAR: "R", NZD: "NZ$",
    SGD: "S$", HKD: "HK$", TWD: "NT$", THB: "฿", PHP: "₱", IDR: "Rp",
    MYR: "RM", VND: "₫", ILS: "₪",
  };
  return S[curr] || "$";
}

function fmtCurr(val: number, symbol: string): string {
  if (val === 0) return `${symbol}0`;
  const abs = Math.abs(val);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: abs >= 1000 ? 0 : 2,
    maximumFractionDigits: abs >= 1000 ? 0 : 2,
  });
  return val < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

export default savingsCalculatorConfig;
