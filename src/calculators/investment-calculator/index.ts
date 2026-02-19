import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

function fmtNum(val: number, decimals = 0): string {
  if (val === 0) return "0";
  return val.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", CAD: "C$", AUD: "A$",
  MXN: "MX$", BRL: "R$", JPY: "¥", INR: "₹", CHF: "CHF ",
  COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  CNY: "¥", KRW: "₩", SEK: "kr ", NOK: "kr ", DKK: "kr ",
  PLN: "zł ", CZK: "Kč ", HUF: "Ft ", TRY: "₺",
  ZAR: "R", NZD: "NZ$", SGD: "S$", HKD: "HK$",
  THB: "฿", MYR: "RM ", PHP: "₱", IDR: "Rp ", VND: "₫", EGP: "E£", NGN: "₦",
};

export const investmentCalculatorConfig: CalculatorConfigV4 = {
  id: "investment-calculator",
  version: "4.0",
  category: "finance",
  icon: "📈",

  presets: [
    {
      id: "conservative",
      icon: "🛡️",
      values: { initialInvestment: 5000, regularContribution: 200, contributionFrequency: "monthly", expectedReturn: 5, investmentPeriod: 10, compoundingFrequency: "monthly", adjustInflation: false, inflationRate: null, includeCapGains: false, capGainsRate: null, includeFees: false, feeRate: null, contributeBeginning: false, increaseAnnually: false, annualIncrease: null },
    },
    {
      id: "moderate",
      icon: "⚖️",
      values: { initialInvestment: 10000, regularContribution: 500, contributionFrequency: "monthly", expectedReturn: 7, investmentPeriod: 15, compoundingFrequency: "monthly", adjustInflation: true, inflationRate: 3, includeCapGains: false, capGainsRate: null, includeFees: false, feeRate: null, contributeBeginning: false, increaseAnnually: false, annualIncrease: null },
    },
    {
      id: "aggressive",
      icon: "🚀",
      values: { initialInvestment: 25000, regularContribution: 1000, contributionFrequency: "monthly", expectedReturn: 10, investmentPeriod: 20, compoundingFrequency: "monthly", adjustInflation: true, inflationRate: 3, includeCapGains: false, capGainsRate: null, includeFees: true, feeRate: 0.5, contributeBeginning: true, increaseAnnually: true, annualIncrease: 3 },
    },
    {
      id: "proRealistic",
      icon: "🎯",
      values: { initialInvestment: 15000, regularContribution: 750, contributionFrequency: "monthly", expectedReturn: 8, investmentPeriod: 25, compoundingFrequency: "monthly", adjustInflation: true, inflationRate: 3, includeCapGains: true, capGainsRate: 15, includeFees: true, feeRate: 0.75, contributeBeginning: false, increaseAnnually: true, annualIncrease: 2 },
    },
  ],

  t: {
    en: {
      name: "Investment Calculator",
      slug: "investment-calculator",
      breadcrumb: "Investment Calculator",
      seo: {
        title: "Investment Calculator - Free Compound Growth Tool",
        description: "See how your money grows with compound interest. Factor in regular contributions, inflation, taxes, and fees with year-by-year projections.",
        keywords: ["investment calculator", "compound interest calculator", "investment growth calculator", "how much will my investment grow", "return on investment calculator", "free investment calculator", "compound growth tool", "investment planner"],
      },

      subtitle: "See how your money grows with compound interest, regular contributions, and year-by-year projections",

      inputs: {
        initialInvestment: { label: "Initial Investment", helpText: "Starting amount you'll invest today", placeholder: "5000" },
        regularContribution: { label: "Regular Contribution", helpText: "How much you'll add each period", placeholder: "200" },
        contributionFrequency: {
          label: "Contribution Frequency",
          helpText: "How often you add money",
          options: { weekly: "Weekly", biweekly: "Bi-Weekly", monthly: "Monthly", quarterly: "Quarterly", annually: "Annually" },
        },
        expectedReturn: { label: "Expected Annual Return", helpText: "Historical S&P 500 avg: ~10%. Bonds: ~4-5%. Balanced: ~7%" },
        investmentPeriod: { label: "Investment Period", helpText: "How long you plan to invest" },
        compoundingFrequency: {
          label: "Compounding Frequency",
          helpText: "How often interest is calculated and added",
          options: { daily: "Daily", monthly: "Monthly", quarterly: "Quarterly", annually: "Annually" },
        },
        adjustInflation: { label: "Adjust for Inflation", helpText: "See your real purchasing power" },
        inflationRate: { label: "Expected Inflation Rate", helpText: "US long-term average: ~3%", placeholder: "3" },
        includeCapGains: { label: "Include Capital Gains Tax", helpText: "Deduct taxes from investment returns" },
        capGainsRate: { label: "Capital Gains Tax Rate", helpText: "US long-term rate: 0%, 15%, or 20% depending on income", placeholder: "15" },
        includeFees: { label: "Include Management Fees", helpText: "Annual fund/advisor fees" },
        feeRate: { label: "Annual Fee Rate", helpText: "Index funds: 0.03-0.2%. Actively managed: 0.5-1.5%", placeholder: "0.5" },
        contributeBeginning: { label: "Contribute at Beginning of Period", helpText: "Contribute at the start instead of end" },
        increaseAnnually: { label: "Increase Contributions Annually", helpText: "Grow your contributions each year" },
        annualIncrease: { label: "Annual Contribution Increase", helpText: "Increase contributions by this % each year", placeholder: "3" },
      },

      results: {
        futureBalance: { label: "Future Balance" },
        totalContributed: { label: "Total Contributed" },
        interestEarned: { label: "Interest Earned" },
        totalReturn: { label: "Total Return" },
        realValue: { label: "Real Value (Inflation-Adjusted)" },
        afterTaxValue: { label: "After-Tax Value" },
      },

      presets: {
        conservative: { label: "Conservative", description: "$5K start, $200/mo, 5% return, 10 years" },
        moderate: { label: "Moderate", description: "$10K start, $500/mo, 7% return, 15 years" },
        aggressive: { label: "Aggressive", description: "$25K start, $1K/mo, 10% return, 20 years" },
        proRealistic: { label: "Pro Realistic", description: "$15K, $750/mo, 8% with taxes, fees, inflation" },
      },

      values: { years: "years", year: "year", perYear: "/yr" },

      formats: { summary: "Your investment could grow to {balance} over {period} years. You'd contribute {contributed} and earn {interest} in interest." },

      infoCards: {
        summary: {
          title: "Investment Summary",
          items: [
            { label: "Future Balance", valueKey: "futureBalance" },
            { label: "Total Contributed", valueKey: "totalContributed" },
            { label: "Interest Earned", valueKey: "interestEarned" },
            { label: "Total Return", valueKey: "totalReturn" },
          ],
        },
        insights: {
          title: "Growth Insights",
          items: [
            { label: "Effective Annual Rate", valueKey: "effectiveRate" },
            { label: "Interest as % of Total", valueKey: "interestPercent" },
            { label: "Doubling Time (Rule of 72)", valueKey: "doublingTime" },
            { label: "Fees Impact (Total Lost)", valueKey: "feesImpact" },
          ],
        },
        tips: {
          title: "Investment Tips",
          items: [
            "Time beats timing: starting 10 years earlier matters more than doubling your contribution rate",
            "A 1% fee doesn't sound like much, but over 30 years it can consume 25-30% of your returns",
            "Dollar-cost averaging through regular contributions reduces the impact of market volatility",
            "After maxing tax-advantaged accounts (401k, IRA), invest in low-cost index funds for taxable accounts",
          ],
        },
      },

      chart: {
        title: "Investment Growth Over Time",
        xLabel: "Year",
        yLabel: "Value",
        series: { totalBalance: "Total Balance", totalContributed: "Total Contributed", realValue: "Real Value (Inflation-Adjusted)" },
      },

      detailedTable: {
        yearlyBreakdown: {
          button: "View Yearly Breakdown",
          title: "Investment Growth Projection",
          columns: { year: "Year", contribution: "Annual Contribution", interest: "Interest Earned", balance: "Balance", realValue: "Real Value" },
        },
      },

      education: {
        whatIs: {
          title: "What Is an Investment Calculator?",
          content: "An investment calculator projects how your money will grow over time using compound interest and regular contributions. Unlike a simple savings calculator, it accounts for real-world factors like inflation erosion, management fees, capital gains taxes, and increasing contributions over time. The power of compound interest means your money earns returns on both your original investment and your accumulated returns — creating exponential growth over long periods. Albert Einstein allegedly called compound interest the eighth wonder of the world, and whether or not the attribution is accurate, the math certainly is remarkable.",
        },
        howItWorks: {
          title: "How Compound Interest Works",
          content: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. With monthly compounding, your annual return is divided into 12 parts and applied each month, with each month's calculation including the interest earned in prior months. This creates a snowball effect: a $10,000 investment at 8% compounded monthly grows to $22,196 in 10 years, compared to $18,000 with simple interest — that's $4,196 more from compounding alone. The three key factors are: rate of return (higher = faster growth), time horizon (longer = dramatically more growth due to exponential curve), and contribution frequency (more frequent = more compounding periods).",
        },
        investmentTypes: {
          title: "Common Investment Types & Returns",
          items: [
            { text: "S&P 500 Index Fund: Historical average ~10% annually (7% after inflation). Low fees (0.03-0.1%). Best for long-term passive investors.", type: "info" },
            { text: "Total Bond Market: Average 4-5% annually. Lower risk, lower return. Good for diversification and near-retirement portfolios.", type: "info" },
            { text: "Target-Date Funds: Automatically shift from stocks to bonds as you age. Typical fees 0.1-0.3%. Good for hands-off investors.", type: "info" },
            { text: "Individual Stocks: Can outperform or underperform dramatically. Most active traders underperform index funds over 10+ years.", type: "warning" },
            { text: "REITs (Real Estate Investment Trusts): Average 8-12% historically. Provides real estate exposure without property ownership.", type: "info" },
            { text: "High-Yield Savings: Currently 4-5% APY. FDIC insured. No market risk but barely keeps pace with inflation.", type: "info" },
          ],
        },
        feeImpact: {
          title: "The Hidden Cost of Fees",
          items: [
            { text: "A 1% annual fee reduces a $500K portfolio by $170K+ over 30 years compared to 0.1% — that's like losing a third of your returns.", type: "warning" },
            { text: "Index funds charge 0.03-0.20% annually. Actively managed funds charge 0.5-1.5%. Most actively managed funds underperform indexes.", type: "info" },
            { text: "Financial advisor fees (1% of assets) cost roughly $100K on a $500K portfolio over 20 years. Consider fee-only advisors.", type: "warning" },
            { text: "Trading commissions are mostly free now, but bid-ask spreads and tax implications of frequent trading still cost money.", type: "info" },
            { text: "Fund expense ratios are deducted from returns automatically. A fund reporting 8% return with 1% fee actually earned 9%.", type: "info" },
            { text: "Compare total cost of ownership: management fee + expense ratio + transaction costs + tax efficiency.", type: "info" },
          ],
        },
        examples: {
          title: "Investment Growth Examples",
          description: "See the dramatic effect of time, fees, and contributions on investment outcomes",
          examples: [
            {
              title: "$10K + $500/mo for 20 Years at 8%",
              steps: ["Initial: $10,000", "Monthly: $500 for 20 years", "Total contributed: $10,000 + ($500 × 240) = $130,000", "8% return, compounded monthly"],
              result: "Final balance: ~$316,000. You contributed $130K but earned $186K in interest — 59% of your wealth came from compound growth alone.",
            },
            {
              title: "Impact of Starting 10 Years Earlier",
              steps: ["Person A: $500/mo from age 25 to 65 (40 years)", "Person B: $500/mo from age 35 to 65 (30 years)", "Both at 8% annual return, monthly compounding"],
              result: "Person A: ~$1,745,000. Person B: ~$745,000. Starting 10 years earlier with the SAME contributions yields $1M MORE.",
            },
          ],
        },
      },

      faqs: [
        { question: "What rate of return should I use?", answer: "For a diversified stock portfolio, use 7-10% (nominal) or 4-7% (inflation-adjusted). The S&P 500 has returned ~10% annually since 1926. For conservative estimates use 6-7%. For bonds or savings, use 3-5%. Always plan with conservative estimates to avoid disappointment." },
        { question: "How does compounding frequency affect returns?", answer: "More frequent compounding yields slightly higher returns. $10,000 at 8% for 10 years: annually = $21,589, monthly = $22,196, daily = $22,253. The difference between monthly and daily is minimal (~$57), so monthly compounding is a reasonable assumption for most investments." },
        { question: "Should I invest a lump sum or contribute regularly?", answer: "Historically, lump sum investing outperforms dollar-cost averaging about 2/3 of the time because markets tend to go up. However, dollar-cost averaging through regular contributions reduces risk and is more practical for most people who invest from paychecks." },
        { question: "How much do fees really matter?", answer: "Enormously over time. On a $500/month investment over 30 years at 8% return: with 0.1% fees you'd have $691K, with 1% fees you'd have $569K — a $122K difference, or 18% less wealth. Choose low-cost index funds with expense ratios under 0.2%." },
        { question: "What is the Rule of 72?", answer: "Divide 72 by your annual return to estimate how many years it takes to double your money. At 8% return: 72 ÷ 8 = 9 years to double. At 10%: 7.2 years. At 6%: 12 years. This quick mental math helps evaluate investment opportunities." },
        { question: "How does inflation affect my investment?", answer: "At 3% inflation, your money loses about half its purchasing power every 24 years. A $1M portfolio in 2026 buys the equivalent of ~$475K in 2050 dollars. This calculator's inflation adjustment shows your real purchasing power so you can plan accordingly." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Calculate", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de Inversiones",
      "seo": {
        "title": "Calculadora de Inversiones - Herramienta Gratuita de Crecimiento Compuesto",
        "description": "Ve cómo crece tu dinero con interés compuesto. Incluye contribuciones regulares, inflación, impuestos y comisiones con proyecciones año por año.",
        "keywords": [
          "calculadora de inversiones",
          "calculadora de interés compuesto",
          "calculadora de crecimiento de inversión",
          "cuánto crecerá mi inversión",
          "calculadora de retorno de inversión",
          "calculadora de inversiones gratuita",
          "herramienta de crecimiento compuesto",
          "planificador de inversiones"
        ]
      },
      "slug": "calculadora-inversiones",
      "subtitle": "Ve cómo crece tu dinero con interés compuesto, contribuciones regulares y proyecciones año por año",
      "inputs": {
        "initialInvestment": {
          "label": "Inversión Inicial",
          "helpText": "Cantidad inicial que invertirás hoy",
          "placeholder": "5000"
        },
        "regularContribution": {
          "label": "Contribución Regular",
          "helpText": "Cuánto añadirás cada período",
          "placeholder": "200"
        },
        "contributionFrequency": {
          "label": "Frecuencia de Contribución",
          "helpText": "Con qué frecuencia añades dinero",
          "options": {
            "weekly": "Semanal",
            "biweekly": "Quincenal",
            "monthly": "Mensual",
            "quarterly": "Trimestral",
            "annually": "Anual"
          }
        },
        "expectedReturn": {
          "label": "Rendimiento Anual Esperado",
          "helpText": "Promedio histórico S&P 500: ~10%. Bonos: ~4-5%. Equilibrado: ~7%"
        },
        "investmentPeriod": {
          "label": "Período de Inversión",
          "helpText": "Cuánto tiempo planeas invertir"
        },
        "compoundingFrequency": {
          "label": "Frecuencia de Capitalización",
          "helpText": "Con qué frecuencia se calcula y añade el interés",
          "options": {
            "daily": "Diaria",
            "monthly": "Mensual",
            "quarterly": "Trimestral",
            "annually": "Anual"
          }
        },
        "adjustInflation": {
          "label": "Ajustar por Inflación",
          "helpText": "Ve tu poder adquisitivo real"
        },
        "inflationRate": {
          "label": "Tasa de Inflación Esperada",
          "helpText": "Promedio a largo plazo en EE.UU.: ~3%",
          "placeholder": "3"
        },
        "includeCapGains": {
          "label": "Incluir Impuesto sobre Ganancias de Capital",
          "helpText": "Deducir impuestos de los rendimientos de inversión"
        },
        "capGainsRate": {
          "label": "Tasa de Impuesto sobre Ganancias de Capital",
          "helpText": "Tasa a largo plazo en EE.UU.: 0%, 15%, o 20% según ingresos",
          "placeholder": "15"
        },
        "includeFees": {
          "label": "Incluir Comisiones de Gestión",
          "helpText": "Comisiones anuales de fondos/asesores"
        },
        "feeRate": {
          "label": "Tasa de Comisión Anual",
          "helpText": "Fondos índice: 0.03-0.2%. Gestión activa: 0.5-1.5%",
          "placeholder": "0.5"
        },
        "contributeBeginning": {
          "label": "Contribuir al Inicio del Período",
          "helpText": "Contribuir al principio en lugar del final"
        },
        "increaseAnnually": {
          "label": "Aumentar Contribuciones Anualmente",
          "helpText": "Incrementar tus contribuciones cada año"
        },
        "annualIncrease": {
          "label": "Aumento Anual de Contribución",
          "helpText": "Aumentar contribuciones en este % cada año",
          "placeholder": "3"
        }
      },
      "results": {
        "futureBalance": {
          "label": "Balance Futuro"
        },
        "totalContributed": {
          "label": "Total Contribuido"
        },
        "interestEarned": {
          "label": "Interés Ganado"
        },
        "totalReturn": {
          "label": "Rendimiento Total"
        },
        "realValue": {
          "label": "Valor Real (Ajustado por Inflación)"
        },
        "afterTaxValue": {
          "label": "Valor Después de Impuestos"
        }
      },
      "presets": {
        "conservative": {
          "label": "Conservador",
          "description": "$5K inicial, $200/mes, 5% rendimiento, 10 años"
        },
        "moderate": {
          "label": "Moderado",
          "description": "$10K inicial, $500/mes, 7% rendimiento, 15 años"
        },
        "aggressive": {
          "label": "Agresivo",
          "description": "$25K inicial, $1K/mes, 10% rendimiento, 20 años"
        },
        "proRealistic": {
          "label": "Profesional Realista",
          "description": "$15K, $750/mes, 8% con impuestos, comisiones, inflación"
        }
      },
      "values": {
        "years": "años",
        "year": "año",
        "perYear": "/año"
      },
      "formats": {
        "summary": "Tu inversión podría crecer a {balance} en {period} años. Contribuirías {contributed} y ganarías {interest} en intereses."
      },
      "infoCards": {
        "summary": {
          "title": "Resumen de Inversión",
          "items": [
            {
              "label": "Balance Futuro",
              "valueKey": "futureBalance"
            },
            {
              "label": "Total Contribuido",
              "valueKey": "totalContributed"
            },
            {
              "label": "Interés Ganado",
              "valueKey": "interestEarned"
            },
            {
              "label": "Rendimiento Total",
              "valueKey": "totalReturn"
            }
          ]
        },
        "insights": {
          "title": "Perspectivas de Crecimiento",
          "items": [
            {
              "label": "Tasa Anual Efectiva",
              "valueKey": "effectiveRate"
            },
            {
              "label": "Interés como % del Total",
              "valueKey": "interestPercent"
            },
            {
              "label": "Tiempo de Duplicación (Regla del 72)",
              "valueKey": "doublingTime"
            },
            {
              "label": "Impacto de Comisiones (Total Perdido)",
              "valueKey": "feesImpact"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Inversión",
          "items": [
            "El tiempo vence al timing: empezar 10 años antes importa más que duplicar tu tasa de contribución",
            "Una comisión del 1% no suena como mucho, pero en 30 años puede consumir 25-30% de tus rendimientos",
            "El promediado de costo en dólares mediante contribuciones regulares reduce el impacto de la volatilidad del mercado",
            "Después de maximizar las cuentas con ventajas fiscales (401k, IRA), invierte en fondos índice de bajo costo para cuentas gravables"
          ]
        }
      },
      "chart": {
        "title": "Crecimiento de Inversión en el Tiempo",
        "xLabel": "Año",
        "yLabel": "Valor",
        "series": {
          "totalBalance": "Balance Total",
          "totalContributed": "Total Contribuido",
          "realValue": "Valor Real (Ajustado por Inflación)"
        }
      },
      "detailedTable": {
        "yearlyBreakdown": {
          "button": "Ver Desglose Anual",
          "title": "Proyección de Crecimiento de Inversión",
          "columns": {
            "year": "Año",
            "contribution": "Contribución Anual",
            "interest": "Interés Ganado",
            "balance": "Balance",
            "realValue": "Valor Real"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es una Calculadora de Inversiones?",
          "content": "Una calculadora de inversiones proyecta cómo crecerá tu dinero en el tiempo usando interés compuesto y contribuciones regulares. A diferencia de una calculadora de ahorros simple, considera factores del mundo real como la erosión por inflación, comisiones de gestión, impuestos sobre ganancias de capital, y contribuciones crecientes en el tiempo. El poder del interés compuesto significa que tu dinero gana rendimientos tanto sobre tu inversión original como sobre tus rendimientos acumulados — creando un crecimiento exponencial durante períodos largos. Albert Einstein supuestamente llamó al interés compuesto la octava maravilla del mundo, y aunque la atribución no sea exacta, las matemáticas ciertamente son notables."
        },
        "howItWorks": {
          "title": "Cómo Funciona el Interés Compuesto",
          "content": "El interés compuesto es interés calculado tanto sobre el capital inicial como sobre el interés acumulado de períodos anteriores. Con capitalización mensual, tu rendimiento anual se divide en 12 partes y se aplica cada mes, con el cálculo de cada mes incluyendo el interés ganado en meses anteriores. Esto crea un efecto bola de nieve: una inversión de $10,000 al 8% compuesto mensualmente crece a $22,196 en 10 años, comparado con $18,000 con interés simple — eso es $4,196 más solo por la capitalización. Los tres factores clave son: tasa de rendimiento (mayor = crecimiento más rápido), horizonte temporal (más largo = crecimiento dramáticamente mayor debido a la curva exponencial), y frecuencia de contribución (más frecuente = más períodos de capitalización)."
        },
        "investmentTypes": {
          "title": "Tipos de Inversión Comunes y Rendimientos",
          "items": [
            {
              "text": "Fondo Índice S&P 500: Promedio histórico ~10% anual (7% después de inflación). Comisiones bajas (0.03-0.1%). Mejor para inversores pasivos a largo plazo.",
              "type": "info"
            },
            {
              "text": "Mercado Total de Bonos: Promedio 4-5% anual. Menor riesgo, menor rendimiento. Bueno para diversificación y carteras cercanas a la jubilación.",
              "type": "info"
            },
            {
              "text": "Fondos de Fecha Objetivo: Cambian automáticamente de acciones a bonos a medida que envejeces. Comisiones típicas 0.1-0.3%. Bueno para inversores que no quieren gestionar.",
              "type": "info"
            },
            {
              "text": "Acciones Individuales: Pueden superar o estar por debajo del rendimiento dramáticamente. La mayoría de los traders activos rinden menos que los fondos índice en 10+ años.",
              "type": "warning"
            },
            {
              "text": "REITs (Fideicomisos de Inversión Inmobiliaria): Promedio 8-12% históricamente. Proporciona exposición inmobiliaria sin ser propietario de propiedades.",
              "type": "info"
            },
            {
              "text": "Ahorros de Alto Rendimiento: Actualmente 4-5% APY. Asegurado por FDIC. Sin riesgo de mercado pero apenas mantiene el ritmo de la inflación.",
              "type": "info"
            }
          ]
        },
        "feeImpact": {
          "title": "El Costo Oculto de las Comisiones",
          "items": [
            {
              "text": "Una comisión anual del 1% reduce una cartera de $500K en $170K+ durante 30 años comparado con 0.1% — es como perder un tercio de tus rendimientos.",
              "type": "warning"
            },
            {
              "text": "Los fondos índice cobran 0.03-0.20% anualmente. Los fondos de gestión activa cobran 0.5-1.5%. La mayoría de los fondos de gestión activa rinden menos que los índices.",
              "type": "info"
            },
            {
              "text": "Las comisiones de asesores financieros (1% de activos) cuestan aproximadamente $100K en una cartera de $500K durante 20 años. Considera asesores que solo cobran comisiones.",
              "type": "warning"
            },
            {
              "text": "Las comisiones de trading son en su mayoría gratuitas ahora, pero los spreads bid-ask y las implicaciones fiscales del trading frecuente aún cuestan dinero.",
              "type": "info"
            },
            {
              "text": "Los ratios de gastos de fondos se deducen automáticamente de los rendimientos. Un fondo que reporta 8% de rendimiento con 1% de comisión realmente ganó 9%.",
              "type": "info"
            },
            {
              "text": "Compara el costo total de propiedad: comisión de gestión + ratio de gastos + costos de transacción + eficiencia fiscal.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Crecimiento de Inversión",
          "description": "Ve el efecto dramático del tiempo, comisiones y contribuciones en los resultados de inversión",
          "examples": [
            {
              "title": "$10K + $500/mes durante 20 años al 8%",
              "steps": [
                "Inicial: $10,000",
                "Mensual: $500 durante 20 años",
                "Total contribuido: $10,000 + ($500 × 240) = $130,000",
                "8% rendimiento, compuesto mensualmente"
              ],
              "result": "Balance final: ~$316,000. Contribuiste $130K pero ganaste $186K en intereses — 59% de tu riqueza vino solo del crecimiento compuesto."
            },
            {
              "title": "Impacto de Empezar 10 Años Antes",
              "steps": [
                "Persona A: $500/mes desde los 25 hasta los 65 años (40 años)",
                "Persona B: $500/mes desde los 35 hasta los 65 años (30 años)",
                "Ambos al 8% de rendimiento anual, compuesto mensualmente"
              ],
              "result": "Persona A: ~$1,745,000. Persona B: ~$745,000. Empezar 10 años antes con las MISMAS contribuciones produce $1M MÁS."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué tasa de rendimiento debería usar?",
          "answer": "Para una cartera diversificada de acciones, usa 7-10% (nominal) o 4-7% (ajustado por inflación). El S&P 500 ha devuelto ~10% anualmente desde 1926. Para estimaciones conservadoras usa 6-7%. Para bonos o ahorros, usa 3-5%. Siempre planifica con estimaciones conservadoras para evitar decepciones."
        },
        {
          "question": "¿Cómo afecta la frecuencia de capitalización a los rendimientos?",
          "answer": "Una capitalización más frecuente produce rendimientos ligeramente mayores. $10,000 al 8% durante 10 años: anualmente = $21,589, mensualmente = $22,196, diariamente = $22,253. La diferencia entre mensual y diario es mínima (~$57), así que la capitalización mensual es una suposición razonable para la mayoría de las inversiones."
        },
        {
          "question": "¿Debería invertir una suma global o contribuir regularmente?",
          "answer": "Históricamente, la inversión de suma global supera al promedio de costo en dólares aproximadamente 2/3 del tiempo porque los mercados tienden a subir. Sin embargo, el promedio de costo en dólares mediante contribuciones regulares reduce el riesgo y es más práctico para la mayoría de las personas que invierten de sus salarios."
        },
        {
          "question": "¿Cuánto importan realmente las comisiones?",
          "answer": "Enormemente con el tiempo. En una inversión de $500/mes durante 30 años con 8% de rendimiento: con comisiones del 0.1% tendrías $691K, con comisiones del 1% tendrías $569K — una diferencia de $122K, o 18% menos riqueza. Elige fondos índice de bajo costo con ratios de gastos bajo 0.2%."
        },
        {
          "question": "¿Qué es la Regla del 72?",
          "answer": "Divide 72 por tu rendimiento anual para estimar cuántos años toma duplicar tu dinero. Con 8% de rendimiento: 72 ÷ 8 = 9 años para duplicar. Con 10%: 7.2 años. Con 6%: 12 años. Este cálculo mental rápido ayuda a evaluar oportunidades de inversión."
        },
        {
          "question": "¿Cómo afecta la inflación a mi inversión?",
          "answer": "Con 3% de inflación, tu dinero pierde aproximadamente la mitad de su poder adquisitivo cada 24 años. Una cartera de $1M en 2026 compra el equivalente de ~$475K en dólares de 2050. El ajuste de inflación de esta calculadora muestra tu poder adquisitivo real para que puedas planificar en consecuencia."
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
      },
      "calculator": {
        "yourInformation": "Tu Información"
      }
    },
    pt: {
      "name": "Calculadora de Investimento",
      "seo": {
        "title": "Calculadora de Investimento - Ferramenta Gratuita de Crescimento Composto",
        "description": "Veja como seu dinheiro cresce com juros compostos. Considere contribuições regulares, inflação, impostos e taxas com projeções ano a ano.",
        "keywords": [
          "calculadora de investimento",
          "calculadora de juros compostos",
          "calculadora de crescimento de investimento",
          "quanto meu investimento vai crescer",
          "calculadora de retorno sobre investimento",
          "calculadora de investimento gratuita",
          "ferramenta de crescimento composto",
          "planejador de investimento"
        ]
      },
      "slug": "calculadora-investimento",
      "subtitle": "Veja como seu dinheiro cresce com juros compostos, contribuições regulares e projeções ano a ano",
      "inputs": {
        "initialInvestment": {
          "label": "Investimento Inicial",
          "helpText": "Valor inicial que você investirá hoje",
          "placeholder": "5000"
        },
        "regularContribution": {
          "label": "Contribuição Regular",
          "helpText": "Quanto você adicionará a cada período",
          "placeholder": "200"
        },
        "contributionFrequency": {
          "label": "Frequência de Contribuição",
          "helpText": "Com que frequência você adiciona dinheiro",
          "options": {
            "weekly": "Semanal",
            "biweekly": "Quinzenal",
            "monthly": "Mensal",
            "quarterly": "Trimestral",
            "annually": "Anual"
          }
        },
        "expectedReturn": {
          "label": "Retorno Anual Esperado",
          "helpText": "Média histórica S&P 500: ~10%. Títulos: ~4-5%. Balanceado: ~7%"
        },
        "investmentPeriod": {
          "label": "Período de Investimento",
          "helpText": "Por quanto tempo você planeja investir"
        },
        "compoundingFrequency": {
          "label": "Frequência de Capitalização",
          "helpText": "Com que frequência os juros são calculados e adicionados",
          "options": {
            "daily": "Diária",
            "monthly": "Mensal",
            "quarterly": "Trimestral",
            "annually": "Anual"
          }
        },
        "adjustInflation": {
          "label": "Ajustar para Inflação",
          "helpText": "Veja seu poder de compra real"
        },
        "inflationRate": {
          "label": "Taxa de Inflação Esperada",
          "helpText": "Média de longo prazo dos EUA: ~3%",
          "placeholder": "3"
        },
        "includeCapGains": {
          "label": "Incluir Imposto sobre Ganho de Capital",
          "helpText": "Deduzir impostos dos retornos do investimento"
        },
        "capGainsRate": {
          "label": "Taxa de Imposto sobre Ganho de Capital",
          "helpText": "Taxa de longo prazo dos EUA: 0%, 15% ou 20% dependendo da renda",
          "placeholder": "15"
        },
        "includeFees": {
          "label": "Incluir Taxas de Administração",
          "helpText": "Taxas anuais de fundos/consultores"
        },
        "feeRate": {
          "label": "Taxa Anual de Administração",
          "helpText": "Fundos de índice: 0,03-0,2%. Gestão ativa: 0,5-1,5%",
          "placeholder": "0.5"
        },
        "contributeBeginning": {
          "label": "Contribuir no Início do Período",
          "helpText": "Contribuir no início ao invés do final"
        },
        "increaseAnnually": {
          "label": "Aumentar Contribuições Anualmente",
          "helpText": "Aumentar suas contribuições a cada ano"
        },
        "annualIncrease": {
          "label": "Aumento Anual da Contribuição",
          "helpText": "Aumentar contribuições por este % a cada ano",
          "placeholder": "3"
        }
      },
      "results": {
        "futureBalance": {
          "label": "Saldo Futuro"
        },
        "totalContributed": {
          "label": "Total Contribuído"
        },
        "interestEarned": {
          "label": "Juros Ganhos"
        },
        "totalReturn": {
          "label": "Retorno Total"
        },
        "realValue": {
          "label": "Valor Real (Ajustado pela Inflação)"
        },
        "afterTaxValue": {
          "label": "Valor Após Impostos"
        }
      },
      "presets": {
        "conservative": {
          "label": "Conservador",
          "description": "R$5K inicial, R$200/mês, retorno 5%, 10 anos"
        },
        "moderate": {
          "label": "Moderado",
          "description": "R$10K inicial, R$500/mês, retorno 7%, 15 anos"
        },
        "aggressive": {
          "label": "Agressivo",
          "description": "R$25K inicial, R$1K/mês, retorno 10%, 20 anos"
        },
        "proRealistic": {
          "label": "Profissional Realista",
          "description": "R$15K, R$750/mês, 8% com impostos, taxas, inflação"
        }
      },
      "values": {
        "years": "anos",
        "year": "ano",
        "perYear": "/ano"
      },
      "formats": {
        "summary": "Seu investimento pode crescer para {balance} ao longo de {period} anos. Você contribuiria {contributed} e ganharia {interest} em juros."
      },
      "infoCards": {
        "summary": {
          "title": "Resumo do Investimento",
          "items": [
            {
              "label": "Saldo Futuro",
              "valueKey": "futureBalance"
            },
            {
              "label": "Total Contribuído",
              "valueKey": "totalContributed"
            },
            {
              "label": "Juros Ganhos",
              "valueKey": "interestEarned"
            },
            {
              "label": "Retorno Total",
              "valueKey": "totalReturn"
            }
          ]
        },
        "insights": {
          "title": "Insights de Crescimento",
          "items": [
            {
              "label": "Taxa Anual Efetiva",
              "valueKey": "effectiveRate"
            },
            {
              "label": "Juros como % do Total",
              "valueKey": "interestPercent"
            },
            {
              "label": "Tempo para Dobrar (Regra de 72)",
              "valueKey": "doublingTime"
            },
            {
              "label": "Impacto das Taxas (Total Perdido)",
              "valueKey": "feesImpact"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Investimento",
          "items": [
            "Tempo vence timing: começar 10 anos antes importa mais que dobrar sua taxa de contribuição",
            "Uma taxa de 1% não parece muito, mas ao longo de 30 anos pode consumir 25-30% dos seus retornos",
            "Custo médio em dólar através de contribuições regulares reduz o impacto da volatilidade do mercado",
            "Após maximizar contas com vantagens fiscais (401k, IRA), invista em fundos de índice de baixo custo para contas tributáveis"
          ]
        }
      },
      "chart": {
        "title": "Crescimento do Investimento ao Longo do Tempo",
        "xLabel": "Ano",
        "yLabel": "Valor",
        "series": {
          "totalBalance": "Saldo Total",
          "totalContributed": "Total Contribuído",
          "realValue": "Valor Real (Ajustado pela Inflação)"
        }
      },
      "detailedTable": {
        "yearlyBreakdown": {
          "button": "Ver Detalhamento Anual",
          "title": "Projeção de Crescimento do Investimento",
          "columns": {
            "year": "Ano",
            "contribution": "Contribuição Anual",
            "interest": "Juros Ganhos",
            "balance": "Saldo",
            "realValue": "Valor Real"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Calculadora de Investimento?",
          "content": "Uma calculadora de investimento projeta como seu dinheiro crescerá ao longo do tempo usando juros compostos e contribuições regulares. Diferente de uma calculadora de poupança simples, ela considera fatores do mundo real como erosão inflacionária, taxas de administração, impostos sobre ganho de capital e aumento de contribuições ao longo do tempo. O poder dos juros compostos significa que seu dinheiro ganha retornos tanto sobre seu investimento original quanto sobre seus retornos acumulados — criando crescimento exponencial em períodos longos. Albert Einstein supostamente chamou os juros compostos de oitava maravilha do mundo, e se a atribuição é precisa ou não, a matemática certamente é notável."
        },
        "howItWorks": {
          "title": "Como Funcionam os Juros Compostos",
          "content": "Juros compostos são juros calculados tanto sobre o principal inicial quanto sobre os juros acumulados de períodos anteriores. Com capitalização mensal, seu retorno anual é dividido em 12 partes e aplicado a cada mês, com o cálculo de cada mês incluindo os juros ganhos nos meses anteriores. Isso cria um efeito bola de neve: um investimento de R$10.000 a 8% capitalizado mensalmente cresce para R$22.196 em 10 anos, comparado a R$18.000 com juros simples — isso é R$4.196 a mais apenas da capitalização. Os três fatores principais são: taxa de retorno (maior = crescimento mais rápido), horizonte de tempo (mais longo = crescimento dramaticamente maior devido à curva exponencial), e frequência de contribuição (mais frequente = mais períodos de capitalização)."
        },
        "investmentTypes": {
          "title": "Tipos Comuns de Investimento e Retornos",
          "items": [
            {
              "text": "Fundo de Índice S&P 500: Média histórica ~10% anualmente (7% após inflação). Baixas taxas (0,03-0,1%). Melhor para investidores passivos de longo prazo.",
              "type": "info"
            },
            {
              "text": "Mercado Total de Títulos: Média 4-5% anualmente. Menor risco, menor retorno. Bom para diversificação e carteiras próximas à aposentadoria.",
              "type": "info"
            },
            {
              "text": "Fundos de Data-Alvo: Automaticamente mudam de ações para títulos conforme você envelhece. Taxas típicas 0,1-0,3%. Bom para investidores que não querem se envolver.",
              "type": "info"
            },
            {
              "text": "Ações Individuais: Podem superar ou ficar abaixo do desempenho dramaticamente. A maioria dos traders ativos tem desempenho inferior aos fundos de índice em 10+ anos.",
              "type": "warning"
            },
            {
              "text": "REITs (Fundos de Investimento Imobiliário): Média 8-12% historicamente. Oferece exposição imobiliária sem propriedade de imóveis.",
              "type": "info"
            },
            {
              "text": "Poupança de Alto Rendimento: Atualmente 4-5% ao ano. Garantida pelo banco central. Sem risco de mercado mas mal acompanha a inflação.",
              "type": "info"
            }
          ]
        },
        "feeImpact": {
          "title": "O Custo Oculto das Taxas",
          "items": [
            {
              "text": "Uma taxa anual de 1% reduz uma carteira de R$500K em R$170K+ ao longo de 30 anos comparado a 0,1% — isso é como perder um terço dos seus retornos.",
              "type": "warning"
            },
            {
              "text": "Fundos de índice cobram 0,03-0,20% anualmente. Fundos geridos ativamente cobram 0,5-1,5%. A maioria dos fundos geridos ativamente tem desempenho inferior aos índices.",
              "type": "info"
            },
            {
              "text": "Taxas de consultores financeiros (1% dos ativos) custam aproximadamente R$100K numa carteira de R$500K ao longo de 20 anos. Considere consultores apenas por taxa.",
              "type": "warning"
            },
            {
              "text": "Comissões de negociação são na maioria gratuitas agora, mas spreads bid-ask e implicações fiscais de negociação frequente ainda custam dinheiro.",
              "type": "info"
            },
            {
              "text": "Taxas de despesas de fundos são deduzidas dos retornos automaticamente. Um fundo relatando 8% de retorno com taxa de 1% na verdade ganhou 9%.",
              "type": "info"
            },
            {
              "text": "Compare custo total de propriedade: taxa de administração + taxa de despesas + custos de transação + eficiência fiscal.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Crescimento de Investimento",
          "description": "Veja o efeito dramático do tempo, taxas e contribuições nos resultados do investimento",
          "examples": [
            {
              "title": "R$10K + R$500/mês por 20 Anos a 8%",
              "steps": [
                "Inicial: R$10.000",
                "Mensal: R$500 por 20 anos",
                "Total contribuído: R$10.000 + (R$500 × 240) = R$130.000",
                "Retorno de 8%, capitalizado mensalmente"
              ],
              "result": "Saldo final: ~R$316.000. Você contribuiu R$130K mas ganhou R$186K em juros — 59% da sua riqueza veio apenas do crescimento composto."
            },
            {
              "title": "Impacto de Começar 10 Anos Antes",
              "steps": [
                "Pessoa A: R$500/mês dos 25 aos 65 anos (40 anos)",
                "Pessoa B: R$500/mês dos 35 aos 65 anos (30 anos)",
                "Ambas com retorno anual de 8%, capitalização mensal"
              ],
              "result": "Pessoa A: ~R$1.745.000. Pessoa B: ~R$745.000. Começar 10 anos antes com as MESMAS contribuições rende R$1 milhão A MAIS."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Que taxa de retorno devo usar?",
          "answer": "Para uma carteira diversificada de ações, use 7-10% (nominal) ou 4-7% (ajustado pela inflação). O S&P 500 retornou ~10% anualmente desde 1926. Para estimativas conservadoras use 6-7%. Para títulos ou poupança, use 3-5%. Sempre planeje com estimativas conservadoras para evitar decepção."
        },
        {
          "question": "Como a frequência de capitalização afeta os retornos?",
          "answer": "Capitalização mais frequente produz retornos ligeiramente maiores. R$10.000 a 8% por 10 anos: anualmente = R$21.589, mensalmente = R$22.196, diariamente = R$22.253. A diferença entre mensal e diária é mínima (~R$57), então capitalização mensal é uma suposição razoável para a maioria dos investimentos."
        },
        {
          "question": "Devo investir uma quantia única ou contribuir regularmente?",
          "answer": "Historicamente, investimento de quantia única supera o custo médio em dólar cerca de 2/3 das vezes porque os mercados tendem a subir. No entanto, custo médio em dólar através de contribuições regulares reduz o risco e é mais prático para a maioria das pessoas que investem de seus salários."
        },
        {
          "question": "O quanto as taxas realmente importam?",
          "answer": "Enormemente ao longo do tempo. Em um investimento de R$500/mês ao longo de 30 anos com retorno de 8%: com taxas de 0,1% você teria R$691K, com taxas de 1% você teria R$569K — uma diferença de R$122K, ou 18% menos riqueza. Escolha fundos de índice de baixo custo com taxas de despesas abaixo de 0,2%."
        },
        {
          "question": "O que é a Regra de 72?",
          "answer": "Divida 72 pelo seu retorno anual para estimar quantos anos leva para dobrar seu dinheiro. Com retorno de 8%: 72 ÷ 8 = 9 anos para dobrar. A 10%: 7,2 anos. A 6%: 12 anos. Este cálculo mental rápido ajuda a avaliar oportunidades de investimento."
        },
        {
          "question": "Como a inflação afeta meu investimento?",
          "answer": "Com inflação de 3%, seu dinheiro perde cerca de metade do seu poder de compra a cada 24 anos. Uma carteira de R$1 milhão em 2026 compra o equivalente a ~R$475K em dinheiro de 2050. O ajuste de inflação desta calculadora mostra seu poder de compra real para que você possa planejar adequadamente."
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
      "name": "Calculateur d'Investissement",
      "slug": "calculateur-investissement",
      "seo": {
        "title": "Calculateur d'Investissement - Outil Gratuit de Croissance Composée",
        "description": "Voyez comment votre argent croît avec les intérêts composés. Intégrez les contributions régulières, l'inflation, les taxes et les frais avec des projections année par année.",
        "keywords": [
          "calculateur d'investissement",
          "calculateur d'intérêts composés",
          "calculateur de croissance d'investissement",
          "combien mon investissement va-t-il croître",
          "calculateur de retour sur investissement",
          "calculateur d'investissement gratuit",
          "outil de croissance composée",
          "planificateur d'investissement"
        ]
      },
      "subtitle": "Voyez comment votre argent croît avec les intérêts composés, les contributions régulières et les projections année par année",
      "inputs": {
        "initialInvestment": {
          "label": "Investissement Initial",
          "helpText": "Montant de départ que vous investirez aujourd'hui",
          "placeholder": "5000"
        },
        "regularContribution": {
          "label": "Contribution Régulière",
          "helpText": "Combien vous ajouterez à chaque période",
          "placeholder": "200"
        },
        "contributionFrequency": {
          "label": "Fréquence des Contributions",
          "helpText": "À quelle fréquence vous ajoutez de l'argent",
          "options": {
            "weekly": "Hebdomadaire",
            "biweekly": "Bihebdomadaire",
            "monthly": "Mensuelle",
            "quarterly": "Trimestrielle",
            "annually": "Annuelle"
          }
        },
        "expectedReturn": {
          "label": "Rendement Annuel Attendu",
          "helpText": "Moyenne historique S&P 500 : ~10%. Obligations : ~4-5%. Équilibré : ~7%"
        },
        "investmentPeriod": {
          "label": "Période d'Investissement",
          "helpText": "Combien de temps vous prévoyez d'investir"
        },
        "compoundingFrequency": {
          "label": "Fréquence de Capitalisation",
          "helpText": "À quelle fréquence les intérêts sont calculés et ajoutés",
          "options": {
            "daily": "Quotidienne",
            "monthly": "Mensuelle",
            "quarterly": "Trimestrielle",
            "annually": "Annuelle"
          }
        },
        "adjustInflation": {
          "label": "Ajuster pour l'Inflation",
          "helpText": "Voir votre pouvoir d'achat réel"
        },
        "inflationRate": {
          "label": "Taux d'Inflation Attendu",
          "helpText": "Moyenne américaine long terme : ~3%",
          "placeholder": "3"
        },
        "includeCapGains": {
          "label": "Inclure l'Impôt sur les Gains en Capital",
          "helpText": "Déduire les impôts des rendements d'investissement"
        },
        "capGainsRate": {
          "label": "Taux d'Impôt sur les Gains en Capital",
          "helpText": "Taux américain long terme : 0%, 15% ou 20% selon le revenu",
          "placeholder": "15"
        },
        "includeFees": {
          "label": "Inclure les Frais de Gestion",
          "helpText": "Frais annuels du fonds/conseiller"
        },
        "feeRate": {
          "label": "Taux de Frais Annuel",
          "helpText": "Fonds indiciels : 0,03-0,2%. Gestion active : 0,5-1,5%",
          "placeholder": "0.5"
        },
        "contributeBeginning": {
          "label": "Contribuer au Début de la Période",
          "helpText": "Contribuer au début plutôt qu'à la fin"
        },
        "increaseAnnually": {
          "label": "Augmenter les Contributions Annuellement",
          "helpText": "Faire croître vos contributions chaque année"
        },
        "annualIncrease": {
          "label": "Augmentation Annuelle des Contributions",
          "helpText": "Augmenter les contributions de ce % chaque année",
          "placeholder": "3"
        }
      },
      "results": {
        "futureBalance": {
          "label": "Solde Futur"
        },
        "totalContributed": {
          "label": "Total Contribué"
        },
        "interestEarned": {
          "label": "Intérêts Gagnés"
        },
        "totalReturn": {
          "label": "Rendement Total"
        },
        "realValue": {
          "label": "Valeur Réelle (Ajustée pour l'Inflation)"
        },
        "afterTaxValue": {
          "label": "Valeur Après Impôt"
        }
      },
      "presets": {
        "conservative": {
          "label": "Conservateur",
          "description": "5K$ début, 200$/mois, 5% rendement, 10 ans"
        },
        "moderate": {
          "label": "Modéré",
          "description": "10K$ début, 500$/mois, 7% rendement, 15 ans"
        },
        "aggressive": {
          "label": "Agressif",
          "description": "25K$ début, 1K$/mois, 10% rendement, 20 ans"
        },
        "proRealistic": {
          "label": "Pro Réaliste",
          "description": "15K$, 750$/mois, 8% avec impôts, frais, inflation"
        }
      },
      "values": {
        "years": "ans",
        "year": "an",
        "perYear": "/an"
      },
      "formats": {
        "summary": "Votre investissement pourrait croître à {balance} sur {period} ans. Vous contribueriez {contributed} et gagneriez {interest} en intérêts."
      },
      "infoCards": {
        "summary": {
          "title": "Résumé de l'Investissement",
          "items": [
            {
              "label": "Solde Futur",
              "valueKey": "futureBalance"
            },
            {
              "label": "Total Contribué",
              "valueKey": "totalContributed"
            },
            {
              "label": "Intérêts Gagnés",
              "valueKey": "interestEarned"
            },
            {
              "label": "Rendement Total",
              "valueKey": "totalReturn"
            }
          ]
        },
        "insights": {
          "title": "Perspectives de Croissance",
          "items": [
            {
              "label": "Taux Annuel Effectif",
              "valueKey": "effectiveRate"
            },
            {
              "label": "Intérêts en % du Total",
              "valueKey": "interestPercent"
            },
            {
              "label": "Temps de Doublement (Règle de 72)",
              "valueKey": "doublingTime"
            },
            {
              "label": "Impact des Frais (Total Perdu)",
              "valueKey": "feesImpact"
            }
          ]
        },
        "tips": {
          "title": "Conseils d'Investissement",
          "items": [
            "Le temps bat le timing : commencer 10 ans plus tôt importe plus que doubler votre taux de contribution",
            "Un frais de 1% ne semble pas beaucoup, mais sur 30 ans il peut consommer 25-30% de vos rendements",
            "La moyenne des coûts par des contributions régulières réduit l'impact de la volatilité du marché",
            "Après avoir maximisé les comptes avantagés fiscalement (401k, IRA), investissez dans des fonds indiciels à faible coût pour les comptes imposables"
          ]
        }
      },
      "chart": {
        "title": "Croissance de l'Investissement dans le Temps",
        "xLabel": "Année",
        "yLabel": "Valeur",
        "series": {
          "totalBalance": "Solde Total",
          "totalContributed": "Total Contribué",
          "realValue": "Valeur Réelle (Ajustée pour l'Inflation)"
        }
      },
      "detailedTable": {
        "yearlyBreakdown": {
          "button": "Voir la Répartition Annuelle",
          "title": "Projection de Croissance de l'Investissement",
          "columns": {
            "year": "Année",
            "contribution": "Contribution Annuelle",
            "interest": "Intérêts Gagnés",
            "balance": "Solde",
            "realValue": "Valeur Réelle"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Calculateur d'Investissement ?",
          "content": "Un calculateur d'investissement projette comment votre argent croîtra dans le temps en utilisant les intérêts composés et les contributions régulières. Contrairement à un simple calculateur d'épargne, il tient compte de facteurs du monde réel comme l'érosion de l'inflation, les frais de gestion, les impôts sur les gains en capital et l'augmentation des contributions dans le temps. Le pouvoir des intérêts composés signifie que votre argent génère des rendements à la fois sur votre investissement initial et sur vos rendements accumulés — créant une croissance exponentielle sur de longues périodes. Albert Einstein aurait appelé les intérêts composés la huitième merveille du monde, et que l'attribution soit exacte ou non, les mathématiques sont certainement remarquables."
        },
        "howItWorks": {
          "title": "Comment Fonctionnent les Intérêts Composés",
          "content": "Les intérêts composés sont des intérêts calculés à la fois sur le capital initial et sur les intérêts accumulés des périodes précédentes. Avec une capitalisation mensuelle, votre rendement annuel est divisé en 12 parties et appliqué chaque mois, avec le calcul de chaque mois incluant les intérêts gagnés dans les mois précédents. Cela crée un effet boule de neige : un investissement de 10 000$ à 8% capitalisé mensuellement croît à 22 196$ en 10 ans, comparé à 18 000$ avec des intérêts simples — soit 4 196$ de plus grâce à la capitalisation seule. Les trois facteurs clés sont : le taux de rendement (plus élevé = croissance plus rapide), l'horizon temporel (plus long = croissance dramatiquement plus importante due à la courbe exponentielle), et la fréquence des contributions (plus fréquente = plus de périodes de capitalisation)."
        },
        "investmentTypes": {
          "title": "Types d'Investissement Courants et Rendements",
          "items": [
            {
              "text": "Fonds Indiciel S&P 500 : Moyenne historique ~10% annuellement (7% après inflation). Frais bas (0,03-0,1%). Meilleur pour les investisseurs passifs à long terme.",
              "type": "info"
            },
            {
              "text": "Marché Total des Obligations : Moyenne 4-5% annuellement. Risque plus faible, rendement plus faible. Bon pour la diversification et les portefeuilles près de la retraite.",
              "type": "info"
            },
            {
              "text": "Fonds à Date Cible : Basculent automatiquement des actions aux obligations en vieillissant. Frais typiques 0,1-0,3%. Bon pour les investisseurs mains libres.",
              "type": "info"
            },
            {
              "text": "Actions Individuelles : Peuvent surperformer ou sous-performer dramatiquement. La plupart des traders actifs sous-performent les fonds indiciels sur 10+ ans.",
              "type": "warning"
            },
            {
              "text": "FPI (Fonds de Placement Immobilier) : Moyenne 8-12% historiquement. Fournit une exposition immobilière sans propriété de biens.",
              "type": "info"
            },
            {
              "text": "Épargne à Haut Rendement : Actuellement 4-5% TPA. Assurée FDIC. Aucun risque de marché mais suit à peine l'inflation.",
              "type": "info"
            }
          ]
        },
        "feeImpact": {
          "title": "Le Coût Caché des Frais",
          "items": [
            {
              "text": "Un frais annuel de 1% réduit un portefeuille de 500K$ de 170K$+ sur 30 ans comparé à 0,1% — c'est comme perdre un tiers de vos rendements.",
              "type": "warning"
            },
            {
              "text": "Les fonds indiciels facturent 0,03-0,20% annuellement. Les fonds gérés activement facturent 0,5-1,5%. La plupart des fonds gérés activement sous-performent les indices.",
              "type": "info"
            },
            {
              "text": "Les frais de conseiller financier (1% des actifs) coûtent environ 100K$ sur un portefeuille de 500K$ sur 20 ans. Considérez les conseillers payants seulement.",
              "type": "warning"
            },
            {
              "text": "Les commissions de négociation sont maintenant principalement gratuites, mais les écarts achat-vente et les implications fiscales du trading fréquent coûtent encore de l'argent.",
              "type": "info"
            },
            {
              "text": "Les ratios de dépenses des fonds sont déduits des rendements automatiquement. Un fonds rapportant 8% de rendement avec 1% de frais a en fait gagné 9%.",
              "type": "info"
            },
            {
              "text": "Comparez le coût total de propriété : frais de gestion + ratio de dépenses + coûts de transaction + efficacité fiscale.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Croissance d'Investissement",
          "description": "Voir l'effet dramatique du temps, des frais et des contributions sur les résultats d'investissement",
          "examples": [
            {
              "title": "10K$ + 500$/mois pendant 20 ans à 8%",
              "steps": [
                "Initial : 10 000$",
                "Mensuel : 500$ pendant 20 ans",
                "Total contribué : 10 000$ + (500$ × 240) = 130 000$",
                "Rendement de 8%, capitalisé mensuellement"
              ],
              "result": "Solde final : ~316 000$. Vous avez contribué 130K$ mais gagné 186K$ en intérêts — 59% de votre richesse provient de la croissance composée seule."
            },
            {
              "title": "Impact de Commencer 10 Ans Plus Tôt",
              "steps": [
                "Personne A : 500$/mois de 25 à 65 ans (40 ans)",
                "Personne B : 500$/mois de 35 à 65 ans (30 ans)",
                "Les deux à 8% de rendement annuel, capitalisation mensuelle"
              ],
              "result": "Personne A : ~1 745 000$. Personne B : ~745 000$. Commencer 10 ans plus tôt avec les MÊMES contributions rapporte 1M$ DE PLUS."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quel taux de rendement devrais-je utiliser ?",
          "answer": "Pour un portefeuille d'actions diversifié, utilisez 7-10% (nominal) ou 4-7% (ajusté pour l'inflation). Le S&P 500 a rendu ~10% annuellement depuis 1926. Pour des estimations conservatrices, utilisez 6-7%. Pour les obligations ou l'épargne, utilisez 3-5%. Planifiez toujours avec des estimations conservatrices pour éviter la déception."
        },
        {
          "question": "Comment la fréquence de capitalisation affecte-t-elle les rendements ?",
          "answer": "Une capitalisation plus fréquente donne des rendements légèrement plus élevés. 10 000$ à 8% pendant 10 ans : annuellement = 21 589$, mensuellement = 22 196$, quotidiennement = 22 253$. La différence entre mensuel et quotidien est minime (~57$), donc la capitalisation mensuelle est une hypothèse raisonnable pour la plupart des investissements."
        },
        {
          "question": "Devrais-je investir une somme forfaitaire ou contribuer régulièrement ?",
          "answer": "Historiquement, l'investissement de somme forfaitaire surpasse la moyenne des coûts environ 2/3 du temps car les marchés tendent à monter. Cependant, la moyenne des coûts par des contributions régulières réduit le risque et est plus pratique pour la plupart des gens qui investissent à partir de chèques de paie."
        },
        {
          "question": "À quel point les frais importent-ils vraiment ?",
          "answer": "Énormément dans le temps. Sur un investissement de 500$/mois pendant 30 ans à 8% de rendement : avec 0,1% de frais vous auriez 691K$, avec 1% de frais vous auriez 569K$ — une différence de 122K$, ou 18% de richesse en moins. Choisissez des fonds indiciels à faible coût avec des ratios de dépenses sous 0,2%."
        },
        {
          "question": "Qu'est-ce que la Règle de 72 ?",
          "answer": "Divisez 72 par votre rendement annuel pour estimer combien d'années il faut pour doubler votre argent. À 8% de rendement : 72 ÷ 8 = 9 ans pour doubler. À 10% : 7,2 ans. À 6% : 12 ans. Ce calcul mental rapide aide à évaluer les opportunités d'investissement."
        },
        {
          "question": "Comment l'inflation affecte-t-elle mon investissement ?",
          "answer": "À 3% d'inflation, votre argent perd environ la moitié de son pouvoir d'achat tous les 24 ans. Un portefeuille de 1M$ en 2026 achète l'équivalent d'environ 475K$ en dollars de 2050. L'ajustement d'inflation de ce calculateur montre votre pouvoir d'achat réel pour que vous puissiez planifier en conséquence."
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
      "name": "Investment Rechner",
      "seo": {
        "title": "Investment Rechner - Kostenloses Zinseszins-Tool",
        "description": "Sehen Sie, wie Ihr Geld mit Zinseszins wächst. Berücksichtigen Sie regelmäßige Einzahlungen, Inflation, Steuern und Gebühren mit jährlichen Prognosen.",
        "keywords": [
          "investment rechner",
          "zinseszins rechner",
          "investitionswachstum rechner",
          "wie viel wird meine investition wachsen",
          "rendite rechner",
          "kostenloser investment rechner",
          "zinseszins tool",
          "investment planer"
        ]
      },
      "subtitle": "Sehen Sie, wie Ihr Geld mit Zinseszins, regelmäßigen Einzahlungen und jährlichen Prognosen wächst",
      "inputs": {
        "initialInvestment": {
          "label": "Anfangsinvestition",
          "helpText": "Startbetrag, den Sie heute investieren",
          "placeholder": "5000"
        },
        "regularContribution": {
          "label": "Regelmäßige Einzahlung",
          "helpText": "Betrag, den Sie jede Periode hinzufügen",
          "placeholder": "200"
        },
        "contributionFrequency": {
          "label": "Einzahlungsfrequenz",
          "helpText": "Wie oft Sie Geld hinzufügen",
          "options": {
            "weekly": "Wöchentlich",
            "biweekly": "Zweiwöchentlich",
            "monthly": "Monatlich",
            "quarterly": "Vierteljährlich",
            "annually": "Jährlich"
          }
        },
        "expectedReturn": {
          "label": "Erwartete Jahresrendite",
          "helpText": "S&P 500 Durchschnitt: ~10%. Anleihen: ~4-5%. Ausgewogen: ~7%"
        },
        "investmentPeriod": {
          "label": "Anlagezeitraum",
          "helpText": "Wie lange Sie investieren möchten"
        },
        "compoundingFrequency": {
          "label": "Zinseszinsfrequenz",
          "helpText": "Wie oft Zinsen berechnet und hinzugefügt werden",
          "options": {
            "daily": "Täglich",
            "monthly": "Monatlich",
            "quarterly": "Vierteljährlich",
            "annually": "Jährlich"
          }
        },
        "adjustInflation": {
          "label": "An Inflation anpassen",
          "helpText": "Sehen Sie Ihre reale Kaufkraft"
        },
        "inflationRate": {
          "label": "Erwartete Inflationsrate",
          "helpText": "Langzeitmittel Deutschland: ~2%",
          "placeholder": "2"
        },
        "includeCapGains": {
          "label": "Kapitalertragssteuer einbeziehen",
          "helpText": "Steuern von Investitionserträgen abziehen"
        },
        "capGainsRate": {
          "label": "Kapitalertragssteuersatz",
          "helpText": "Deutschland: 25% Abgeltungssteuer plus Solidaritätszuschlag",
          "placeholder": "26.375"
        },
        "includeFees": {
          "label": "Verwaltungsgebühren einbeziehen",
          "helpText": "Jährliche Fonds-/Beratergebühren"
        },
        "feeRate": {
          "label": "Jährlicher Gebührensatz",
          "helpText": "Indexfonds: 0,1-0,5%. Aktiv verwaltete: 1-2%",
          "placeholder": "0.5"
        },
        "contributeBeginning": {
          "label": "Zu Periodenbeginn einzahlen",
          "helpText": "Am Anfang statt am Ende einzahlen"
        },
        "increaseAnnually": {
          "label": "Einzahlungen jährlich erhöhen",
          "helpText": "Ihre Einzahlungen jedes Jahr steigern"
        },
        "annualIncrease": {
          "label": "Jährliche Einzahlungserhöhung",
          "helpText": "Einzahlungen um diesen % jährlich erhöhen",
          "placeholder": "3"
        }
      },
      "results": {
        "futureBalance": {
          "label": "Zukünftiges Guthaben"
        },
        "totalContributed": {
          "label": "Gesamt eingezahlt"
        },
        "interestEarned": {
          "label": "Verdiente Zinsen"
        },
        "totalReturn": {
          "label": "Gesamtrendite"
        },
        "realValue": {
          "label": "Realer Wert (inflationsbereinigt)"
        },
        "afterTaxValue": {
          "label": "Wert nach Steuern"
        }
      },
      "presets": {
        "conservative": {
          "label": "Konservativ",
          "description": "5.000€ Start, 200€/Monat, 5% Rendite, 10 Jahre"
        },
        "moderate": {
          "label": "Moderat",
          "description": "10.000€ Start, 500€/Monat, 7% Rendite, 15 Jahre"
        },
        "aggressive": {
          "label": "Aggressiv",
          "description": "25.000€ Start, 1.000€/Monat, 10% Rendite, 20 Jahre"
        },
        "proRealistic": {
          "label": "Profi Realistisch",
          "description": "15.000€, 750€/Monat, 8% mit Steuern, Gebühren, Inflation"
        }
      },
      "values": {
        "years": "Jahre",
        "year": "Jahr",
        "perYear": "/Jahr"
      },
      "formats": {
        "summary": "Ihre Investition könnte über {period} Jahre auf {balance} anwachsen. Sie würden {contributed} einzahlen und {interest} an Zinsen verdienen."
      },
      "infoCards": {
        "summary": {
          "title": "Investitionsübersicht",
          "items": [
            {
              "label": "Zukünftiges Guthaben",
              "valueKey": "futureBalance"
            },
            {
              "label": "Gesamt eingezahlt",
              "valueKey": "totalContributed"
            },
            {
              "label": "Verdiente Zinsen",
              "valueKey": "interestEarned"
            },
            {
              "label": "Gesamtrendite",
              "valueKey": "totalReturn"
            }
          ]
        },
        "insights": {
          "title": "Wachstumseinblicke",
          "items": [
            {
              "label": "Effektiver Jahreszins",
              "valueKey": "effectiveRate"
            },
            {
              "label": "Zinsen als % der Gesamtsumme",
              "valueKey": "interestPercent"
            },
            {
              "label": "Verdoppelungszeit (72er-Regel)",
              "valueKey": "doublingTime"
            },
            {
              "label": "Gebührenauswirkung (Gesamtverlust)",
              "valueKey": "feesImpact"
            }
          ]
        },
        "tips": {
          "title": "Anlagetipps",
          "items": [
            "Zeit schlägt Timing: 10 Jahre früher anzufangen ist wichtiger als die doppelte Sparrate",
            "1% Gebühren klingen wenig, aber über 30 Jahre können sie 25-30% Ihrer Erträge auffressen",
            "Cost-Average-Effekt durch regelmäßige Einzahlungen reduziert Marktvolatilität",
            "Nach Ausschöpfung steuerlicher Vorteile (Riester, Rürup) in kostengünstige ETFs investieren"
          ]
        }
      },
      "chart": {
        "title": "Investitionswachstum über Zeit",
        "xLabel": "Jahr",
        "yLabel": "Wert",
        "series": {
          "totalBalance": "Gesamtguthaben",
          "totalContributed": "Gesamt eingezahlt",
          "realValue": "Realer Wert (inflationsbereinigt)"
        }
      },
      "detailedTable": {
        "yearlyBreakdown": {
          "button": "Jährliche Aufschlüsselung anzeigen",
          "title": "Investitionswachstumsprognose",
          "columns": {
            "year": "Jahr",
            "contribution": "Jährliche Einzahlung",
            "interest": "Verdiente Zinsen",
            "balance": "Guthaben",
            "realValue": "Realer Wert"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Investment-Rechner?",
          "content": "Ein Investment-Rechner prognostiziert, wie Ihr Geld über Zeit mit Zinseszins und regelmäßigen Einzahlungen wächst. Anders als ein einfacher Sparrechner berücksichtigt er realistische Faktoren wie Inflationsverlust, Verwaltungsgebühren, Kapitalertragssteuern und steigende Einzahlungen. Die Kraft des Zinseszinses bedeutet, dass Ihr Geld Erträge sowohl auf Ihre ursprüngliche Investition als auch auf akkumulierte Erträge erwirtschaftet — was exponentielles Wachstum über lange Zeiträume schafft. Albert Einstein nannte den Zinseszins angeblich das achte Weltwunder, und ob die Zuschreibung stimmt oder nicht, die Mathematik ist bemerkenswert."
        },
        "howItWorks": {
          "title": "Wie Zinseszins funktioniert",
          "content": "Zinseszins sind Zinsen, die sowohl auf das ursprüngliche Kapital als auch auf die akkumulierten Zinsen aus vorherigen Perioden berechnet werden. Bei monatlicher Zinsung wird Ihre Jahresrendite in 12 Teile geteilt und monatlich angewendet, wobei jede Monatsberechnung die in vorherigen Monaten verdienten Zinsen einschließt. Dies erzeugt einen Schneeballeffekt: Eine 10.000€-Investition mit 8% monatlich zusammengesetzt wächst in 10 Jahren auf 22.196€, verglichen mit 18.000€ bei einfachen Zinsen — das sind 4.196€ mehr nur durch Zinseszins. Die drei Schlüsselfaktoren sind: Rendite (höher = schnelleres Wachstum), Zeitraum (länger = dramatisch mehr Wachstum durch Exponentialkurve) und Einzahlungsfrequenz (häufiger = mehr Zinseszinsperioden)."
        },
        "investmentTypes": {
          "title": "Häufige Anlagearten & Renditen",
          "items": [
            {
              "text": "MSCI World ETF: Historisch ~8% jährlich (5% nach Inflation). Niedrige Gebühren (0,1-0,2%). Ideal für langfristige passive Anleger.",
              "type": "info"
            },
            {
              "text": "Bundesanleihen: Durchschnitt 2-4% jährlich. Geringeres Risiko, niedrigere Rendite. Gut für Diversifikation und vor dem Ruhestand.",
              "type": "info"
            },
            {
              "text": "Target-Date-Fonds: Verschieben automatisch von Aktien zu Anleihen mit dem Alter. Typische Gebühren 0,2-0,5%. Gut für hands-off Anleger.",
              "type": "info"
            },
            {
              "text": "Einzelaktien: Können dramatisch über- oder unterperformen. Die meisten aktiven Trader unterperformen Indexfonds über 10+ Jahre.",
              "type": "warning"
            },
            {
              "text": "REITs (Immobilien-Investmentfonds): Historisch 6-10%. Bietet Immobilienexposition ohne Immobilienbesitz.",
              "type": "info"
            },
            {
              "text": "Tagesgeld: Derzeit 2-4% p.a. Einlagensicherung. Kein Marktrisiko, aber hält kaum mit Inflation Schritt.",
              "type": "info"
            }
          ]
        },
        "feeImpact": {
          "title": "Die versteckten Kosten von Gebühren",
          "items": [
            {
              "text": "1% jährliche Gebühren reduzieren ein 500.000€-Portfolio über 30 Jahre um 170.000€+ verglichen mit 0,1% — ein Drittel Ihrer Erträge.",
              "type": "warning"
            },
            {
              "text": "ETFs kosten 0,1-0,5% jährlich. Aktiv verwaltete Fonds 1-2,5%. Die meisten aktiven Fonds unterperformen Indizes.",
              "type": "info"
            },
            {
              "text": "Finanzberater-Gebühren (1% des Vermögens) kosten etwa 100.000€ auf einem 500.000€-Portfolio über 20 Jahre.",
              "type": "warning"
            },
            {
              "text": "Handelskommissionen sind meist kostenlos, aber Geld-Brief-Spannen und Steuerfolgen häufigen Handelns kosten Geld.",
              "type": "info"
            },
            {
              "text": "Fonds-Kostenquoten werden automatisch von Erträgen abgezogen. Ein Fonds mit 8% Ertrag und 1% Gebühr erzielte tatsächlich 9%.",
              "type": "info"
            },
            {
              "text": "Vergleichen Sie Gesamtkosten: Verwaltungsgebühr + Kostenquote + Transaktionskosten + Stereffizienz.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Investitionswachstum-Beispiele",
          "description": "Sehen Sie die dramatische Wirkung von Zeit, Gebühren und Einzahlungen auf Anlageergebnisse",
          "examples": [
            {
              "title": "10.000€ + 500€/Monat für 20 Jahre bei 8%",
              "steps": [
                "Anfang: 10.000€",
                "Monatlich: 500€ für 20 Jahre",
                "Gesamt eingezahlt: 10.000€ + (500€ × 240) = 130.000€",
                "8% Rendite, monatlich zusammengesetzt"
              ],
              "result": "Endguthaben: ~316.000€. Sie zahlten 130.000€ ein, aber verdienten 186.000€ Zinsen — 59% Ihres Vermögens kam allein aus Zinseszinswachstum."
            },
            {
              "title": "Auswirkung von 10 Jahre früherem Start",
              "steps": [
                "Person A: 500€/Monat von 25 bis 65 Jahren (40 Jahre)",
                "Person B: 500€/Monat von 35 bis 65 Jahren (30 Jahre)",
                "Beide bei 8% Jahresrendite, monatlich zusammengesetzt"
              ],
              "result": "Person A: ~1.745.000€. Person B: ~745.000€. 10 Jahre früher starten mit GLEICHEN Einzahlungen bringt 1 Million MEHR."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Welche Rendite sollte ich verwenden?",
          "answer": "Für ein diversifiziertes Aktienportfolio verwenden Sie 6-8% (nominal) oder 3-5% (inflationsbereinigt). Der MSCI World hat seit 1970 ~8% jährlich erbracht. Für konservative Schätzungen verwenden Sie 5-6%. Für Anleihen oder Sparen 2-4%. Planen Sie immer mit konservativen Schätzungen."
        },
        {
          "question": "Wie beeinflusst die Zinseszinsfrequenz die Erträge?",
          "answer": "Häufigere Zinsung bringt leicht höhere Erträge. 10.000€ bei 8% für 10 Jahre: jährlich = 21.589€, monatlich = 22.196€, täglich = 22.253€. Der Unterschied zwischen monatlich und täglich ist minimal (~57€), also ist monatliche Zinsung eine vernünftige Annahme."
        },
        {
          "question": "Soll ich eine Einmalzahlung oder regelmäßige Einzahlungen machen?",
          "answer": "Historisch übertrifft Einmalanlage Cost-Average etwa 2/3 der Zeit, da Märkte tendenziell steigen. Jedoch reduziert Cost-Average durch regelmäßige Einzahlungen das Risiko und ist für die meisten Menschen praktischer, die vom Gehalt investieren."
        },
        {
          "question": "Wie wichtig sind Gebühren wirklich?",
          "answer": "Enorm über Zeit. Bei 500€/Monat über 30 Jahre mit 8% Rendite: Mit 0,1% Gebühren hätten Sie 691.000€, mit 1% Gebühren 569.000€ — ein Unterschied von 122.000€ oder 18% weniger Vermögen. Wählen Sie kostengünstige ETFs unter 0,3%."
        },
        {
          "question": "Was ist die 72er-Regel?",
          "answer": "Teilen Sie 72 durch Ihre Jahresrendite, um zu schätzen, wie viele Jahre es dauert, Ihr Geld zu verdoppeln. Bei 8% Rendite: 72 ÷ 8 = 9 Jahre zum Verdoppeln. Bei 10%: 7,2 Jahre. Bei 6%: 12 Jahre. Diese schnelle Kopfrechnung hilft bei der Bewertung von Anlagegelegenheiten."
        },
        {
          "question": "Wie beeinflusst Inflation meine Investition?",
          "answer": "Bei 2% Inflation verliert Ihr Geld etwa alle 36 Jahre die Hälfte seiner Kaufkraft. Ein 1-Million-€-Portfolio in 2026 kauft das Äquivalent von ~610.000€ in 2050er-Euros. Die Inflationsanpassung dieses Rechners zeigt Ihre reale Kaufkraft für bessere Planung."
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

  inputs: [
    { id: "initialInvestment", type: "number", defaultValue: 5000, placeholder: "5000", unitType: "currency", syncGroup: false, autoConvert: false, defaultUnit: "USD" },
    { id: "regularContribution", type: "number", defaultValue: 200, placeholder: "200", unitType: "currency", syncGroup: false, autoConvert: false, defaultUnit: "USD" },
    { id: "contributionFrequency", type: "select", defaultValue: "monthly", options: [{ value: "weekly" }, { value: "biweekly" }, { value: "monthly" }, { value: "quarterly" }, { value: "annually" }] },
    { id: "expectedReturn", type: "number", defaultValue: 5, min: 0, max: 50, step: 0.1, suffix: "%", showSlider: true },
    { id: "investmentPeriod", type: "stepper", defaultValue: 10, min: 1, max: 50, step: 1, suffix: "years" },
    { id: "compoundingFrequency", type: "select", defaultValue: "monthly", options: [{ value: "daily" }, { value: "monthly" }, { value: "quarterly" }, { value: "annually" }] },
    { id: "adjustInflation", type: "toggle", defaultValue: false },
    { id: "inflationRate", type: "number", defaultValue: null, placeholder: "3", min: 0, max: 20, step: 0.1, suffix: "%", showWhen: { field: "adjustInflation", value: true } },
    { id: "includeCapGains", type: "toggle", defaultValue: false },
    { id: "capGainsRate", type: "number", defaultValue: null, placeholder: "15", min: 0, max: 50, suffix: "%", showWhen: { field: "includeCapGains", value: true } },
    { id: "includeFees", type: "toggle", defaultValue: false },
    { id: "feeRate", type: "number", defaultValue: null, placeholder: "0.5", min: 0, max: 5, step: 0.01, suffix: "%", showWhen: { field: "includeFees", value: true } },
    { id: "contributeBeginning", type: "toggle", defaultValue: false },
    { id: "increaseAnnually", type: "toggle", defaultValue: false },
    { id: "annualIncrease", type: "number", defaultValue: null, placeholder: "3", min: 0, max: 25, step: 0.1, suffix: "%", showWhen: { field: "increaseAnnually", value: true } },
  ],

  inputGroups: [],

  results: [
    { id: "futureBalance", type: "primary", format: "text" },
    { id: "totalContributed", type: "secondary", format: "text" },
    { id: "interestEarned", type: "secondary", format: "text" },
    { id: "totalReturn", type: "secondary", format: "text" },
    { id: "realValue", type: "secondary", format: "text" },
    { id: "afterTaxValue", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "summary", type: "list", icon: "📊", itemCount: 4 },
    { id: "insights", type: "list", icon: "🔍", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "investmentGrowth",
    type: "composed",
    xKey: "year",
    height: 350,
    stacked: false,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "totalBalance", type: "area", color: "#2aa6ff" },
      { key: "totalContributed", type: "area", color: "#10b981" },
      { key: "realValue", type: "line", color: "#f59e0b", dashed: true },
    ],
  },

  detailedTable: {
    id: "yearlyBreakdown",
    buttonLabel: "View Yearly Breakdown",
    buttonIcon: "📋",
    modalTitle: "Investment Growth Projection",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "contribution", label: "Annual Contribution", align: "right" },
      { id: "interest", label: "Interest Earned", align: "right" },
      { id: "balance", label: "Balance", align: "right", highlight: true },
      { id: "realValue", label: "Real Value", align: "right" },
    ],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "investmentTypes", type: "list", icon: "📋", itemCount: 6 },
    { id: "feeImpact", type: "list", icon: "💸", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "Vanguard Research", year: "2025", title: "Principles for Investing Success", source: "Vanguard", url: "https://investor.vanguard.com/investor-resources-education" },
    { authors: "S&P Dow Jones Indices", year: "2025", title: "SPIVA U.S. Scorecard — Active vs Passive Performance", source: "S&P Global", url: "https://www.spglobal.com/spdji/en/research-insights/spiva/" },
  ],

  hero: {},
  sidebar: {},
  features: {},
  relatedCalculators: ["compound-interest-calculator", "retirement-calculator", "savings-goal-calculator", "inflation-calculator"],
  ads: {},
};

// ═════════════════════════════════════════════════════════
// CALCULATE
// ═════════════════════════════════════════════════════════

export function calculateInvestmentCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const initialInvestment = (values.initialInvestment as number) || 0;
  const regularContribution = (values.regularContribution as number) || 0;
  const contributionFrequency = (values.contributionFrequency as string) || "monthly";
  const expectedReturn = (values.expectedReturn as number) || 5;
  const investmentPeriod = (values.investmentPeriod as number) || 10;
  const compoundingFrequency = (values.compoundingFrequency as string) || "monthly";
  const adjustInflation = values.adjustInflation === true;
  const inflationRate = (values.inflationRate as number) || 0;
  const includeCapGains = values.includeCapGains === true;
  const capGainsRate = (values.capGainsRate as number) || 0;
  const includeFees = values.includeFees === true;
  const feeRate = (values.feeRate as number) || 0;
  const contributeBeginning = values.contributeBeginning === true;
  const increaseAnnually = values.increaseAnnually === true;
  const annualIncrease = (values.annualIncrease as number) || 0;

  if (initialInvestment === 0 && regularContribution === 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (adjustInflation && values.inflationRate === null) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (includeCapGains && values.capGainsRate === null) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (includeFees && values.feeRate === null) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (increaseAnnually && values.annualIncrease === null) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const currUnit = fieldUnits?.initialInvestment || "USD";
  const sym = CURRENCY_SYMBOLS[currUnit] || "$";

  // Compounding periods per year
  const compPerYear = compoundingFrequency === "daily" ? 365 : compoundingFrequency === "quarterly" ? 4 : compoundingFrequency === "annually" ? 1 : 12;
  const contribPerYear = contributionFrequency === "weekly" ? 52 : contributionFrequency === "biweekly" ? 26 : contributionFrequency === "quarterly" ? 4 : contributionFrequency === "annually" ? 1 : 12;

  const effectiveReturn = includeFees ? expectedReturn - feeRate : expectedReturn;
  const ratePerPeriod = (effectiveReturn / 100) / compPerYear;
  const periodsPerContrib = compPerYear / contribPerYear;

  const chartData: Array<Record<string, unknown>> = [];
  const tableData: Array<Record<string, unknown>> = [];
  let balance = initialInvestment;
  let totalContributed = initialInvestment;
  let currentContribution = regularContribution;
  let balanceNoFees = initialInvestment;
  const rateNoFees = (expectedReturn / 100) / compPerYear;

  chartData.push({ year: "0", totalBalance: Math.round(balance), totalContributed: Math.round(totalContributed), realValue: Math.round(balance) });

  for (let yr = 1; yr <= investmentPeriod; yr++) {
    const annualContrib = currentContribution * contribPerYear;
    const prevBalance = balance;

    // Simulate compounding periods within the year
    const contribPerCompPeriod = annualContrib / compPerYear;

    for (let p = 0; p < compPerYear; p++) {
      if (contributeBeginning) {
        balance += contribPerCompPeriod;
        balance *= (1 + ratePerPeriod);
      } else {
        balance *= (1 + ratePerPeriod);
        balance += contribPerCompPeriod;
      }
      // Track no-fees balance
      if (includeFees) {
        if (contributeBeginning) {
          balanceNoFees += contribPerCompPeriod;
          balanceNoFees *= (1 + rateNoFees);
        } else {
          balanceNoFees *= (1 + rateNoFees);
          balanceNoFees += contribPerCompPeriod;
        }
      }
    }

    totalContributed += annualContrib;
    const yearInterest = balance - prevBalance - annualContrib;

    const inflationFactor = adjustInflation ? Math.pow(1 + inflationRate / 100, yr) : 1;
    const realVal = Math.round(balance / inflationFactor);

    chartData.push({
      year: String(yr),
      totalBalance: Math.round(balance),
      totalContributed: Math.round(totalContributed),
      realValue: realVal,
    });

    tableData.push({
      year: String(yr),
      contribution: `${sym}${fmtNum(Math.round(annualContrib))}`,
      interest: `${sym}${fmtNum(Math.round(yearInterest))}`,
      balance: `${sym}${fmtNum(Math.round(balance))}`,
      realValue: adjustInflation ? `${sym}${fmtNum(realVal)}` : "—",
    });

    if (increaseAnnually) {
      currentContribution *= (1 + annualIncrease / 100);
    }
  }

  const futureBalance = Math.round(balance);
  const totalContributedRound = Math.round(totalContributed);
  const interestEarned = Math.round(futureBalance - totalContributedRound);
  const totalReturnPct = totalContributedRound > 0 ? ((futureBalance - totalContributedRound) / totalContributedRound) * 100 : 0;
  const inflationFinal = adjustInflation ? Math.pow(1 + inflationRate / 100, investmentPeriod) : 1;
  const realValue = Math.round(futureBalance / inflationFinal);
  const afterTax = includeCapGains ? Math.round(totalContributedRound + interestEarned * (1 - capGainsRate / 100)) : futureBalance;
  const feesLost = includeFees ? Math.round(balanceNoFees - balance) : 0;
  const effectiveRateVal = totalContributedRound > 0 ? ((Math.pow(futureBalance / initialInvestment, 1 / investmentPeriod) - 1) * 100) : 0;
  const interestPercent = futureBalance > 0 ? Math.round((interestEarned / futureBalance) * 100) : 0;
  const doublingTime = effectiveReturn > 0 ? (72 / effectiveReturn).toFixed(1) : "N/A";

  const yearsLabel = v["years"] || "years";

  const summary = (f.summary || "Your investment could grow to {balance} over {period} years. You'd contribute {contributed} and earn {interest} in interest.")
    .replace("{balance}", `${sym}${fmtNum(futureBalance)}`)
    .replace("{period}", String(investmentPeriod))
    .replace("{contributed}", `${sym}${fmtNum(totalContributedRound)}`)
    .replace("{interest}", `${sym}${fmtNum(interestEarned)}`);

  return {
    values: { futureBalance, totalContributed: totalContributedRound, interestEarned, totalReturn: totalReturnPct, realValue, afterTaxValue: afterTax, effectiveRate: effectiveRateVal, interestPercent, feesImpact: feesLost, doublingTime: effectiveReturn > 0 ? parseFloat((72 / effectiveReturn).toFixed(1)) : 0 },
    formatted: {
      futureBalance: `${sym}${fmtNum(futureBalance)}`,
      totalContributed: `${sym}${fmtNum(totalContributedRound)}`,
      interestEarned: `${sym}${fmtNum(interestEarned)}`,
      totalReturn: `${fmtNum(totalReturnPct, 1)}%`,
      realValue: adjustInflation ? `${sym}${fmtNum(realValue)}` : "—",
      afterTaxValue: includeCapGains ? `${sym}${fmtNum(afterTax)}` : "—",
      effectiveRate: `${fmtNum(effectiveRateVal, 1)}%`,
      interestPercent: `${interestPercent}%`,
      doublingTime: `~${doublingTime} ${yearsLabel}`,
      feesImpact: includeFees && feesLost > 0 ? `-${sym}${fmtNum(feesLost)}` : "—",
    },
    summary,
    isValid: true,
    metadata: { chartData, tableData },
  };
}

export default investmentCalculatorConfig;
