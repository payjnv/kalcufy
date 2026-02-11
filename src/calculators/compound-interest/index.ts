import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

/* ═══════════════════════════════════════════════════════════════════
   COMPOUND INTEREST CALCULATOR — V4 Engine
   A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) − 1) / (r/n)]
   KEY DIFFERENTIATORS:
   • "Interest on Interest" metric — exact $ earned BY accumulated interest
   • Simple vs Compound side-by-side difference
   • Rule of 72 doubling time integrated
   • Daily earnings display ("$X.XX/day right now")
   • Effective Annual Rate (APY) vs stated rate
   • Optional inflation + tax impact toggles
   • 3-layer stacked area chart (contributions + principal interest + interest-on-interest)
   + Chart: Stacked area — Contributions + Interest from Principal + Interest on Interest
   ═══════════════════════════════════════════════════════════════════ */

export const compoundInterestConfig: CalculatorConfigV4 = {
  id: "compound-interest",
  version: "4.0",
  category: "finance",
  icon: "📈",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS
  // ═══════════════════════════════════════════════════════════════
  presets: [
    {
      id: "savingsAccount",
      icon: "🏦",
      values: {
        initialInvestment: 5000,
        interestRate: 4.5,
        investmentPeriod: 5,
        compoundingFrequency: "daily",
        includeContributions: true,
        monthlyContribution: 200,
        includeInflation: false,
        inflationRate: 3,
        includeTax: false,
        taxRate: 25,
      },
    },
    {
      id: "sp500Index",
      icon: "📈",
      values: {
        initialInvestment: 10000,
        interestRate: 10,
        investmentPeriod: 20,
        compoundingFrequency: "annually",
        includeContributions: true,
        monthlyContribution: 500,
        includeInflation: true,
        inflationRate: 3,
        includeTax: false,
        taxRate: 25,
      },
    },
    {
      id: "conservative",
      icon: "🛡️",
      values: {
        initialInvestment: 25000,
        interestRate: 5,
        investmentPeriod: 10,
        compoundingFrequency: "monthly",
        includeContributions: false,
        monthlyContribution: 0,
        includeInflation: false,
        inflationRate: 3,
        includeTax: false,
        taxRate: 25,
      },
    },
    {
      id: "aggressiveGrowth",
      icon: "🚀",
      values: {
        initialInvestment: 1000,
        interestRate: 12,
        investmentPeriod: 30,
        compoundingFrequency: "monthly",
        includeContributions: true,
        monthlyContribution: 300,
        includeInflation: true,
        inflationRate: 3,
        includeTax: false,
        taxRate: 25,
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // CHART — 3-layer stacked area
  // ═══════════════════════════════════════════════════════════════
  chart: {
    id: "growthProjection",
    type: "composed",
    xKey: "year",
    height: 320,
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "contributions", type: "area", color: "#64748b" },
      { key: "principalInterest", type: "area", color: "#3b82f6" },
      { key: "interestOnInterest", type: "area", color: "#10b981" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // TRANSLATIONS — English only, other languages via install script
  // ═══════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Compound Interest Calculator",
      slug: "compound-interest-calculator",
      subtitle:
        "Calculate how your money grows with compound interest, regular contributions, and see the real impact of inflation and taxes on your returns",
      breadcrumb: "Compound Interest",

      seo: {
        title:
          "Compound Interest Calculator — Growth, APY & Rule of 72 | Free",
        description:
          "Free compound interest calculator with interest-on-interest breakdown, Rule of 72 doubling time, daily earnings, inflation adjustment, and tax impact. See exactly how compounding grows your wealth over time.",
        shortDescription:
          "See how compound interest grows your money over time",
        keywords: [
          "compound interest calculator",
          "interest on interest calculator",
          "compound growth calculator",
          "investment growth calculator",
          "rule of 72 calculator",
          "APY calculator",
          "compound interest with monthly contributions",
          "savings growth calculator",
          "inflation adjusted returns",
          "compound interest formula",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      // ─── INPUTS ────────────────────────────────────────────
      inputs: {
        initialInvestment: {
          label: "Initial Investment",
          helpText: "The starting amount you invest or deposit",
          placeholder: "10000",
        },
        interestRate: {
          label: "Annual Interest Rate",
          helpText: "The nominal annual rate of return (before compounding)",
        },
        investmentPeriod: {
          label: "Investment Period",
          helpText: "How many years you plan to keep the money invested",
        },
        compoundingFrequency: {
          label: "Compounding Frequency",
          helpText: "How often interest is calculated and added to your balance",
          options: {
            daily: "Daily (365×/yr)",
            monthly: "Monthly (12×/yr)",
            quarterly: "Quarterly (4×/yr)",
            semiannually: "Semi-Annually (2×/yr)",
            annually: "Annually (1×/yr)",
          },
        },
        includeContributions: {
          label: "Include Monthly Contributions",
          helpText: "Add regular monthly deposits to your investment",
        },
        monthlyContribution: {
          label: "Monthly Contribution",
          helpText: "Amount you add each month",
          placeholder: "200",
        },
        includeInflation: {
          label: "Adjust for Inflation",
          helpText: "See the real purchasing power of your future money",
        },
        inflationRate: {
          label: "Expected Inflation Rate",
          helpText: "Average annual inflation (US historical avg: ~3%)",
        },
        includeTax: {
          label: "Include Tax on Interest",
          helpText: "Deduct taxes from interest earnings",
        },
        taxRate: {
          label: "Tax Rate",
          helpText: "Your marginal tax rate on investment income",
        },
      },

      // ─── RESULTS ───────────────────────────────────────────
      results: {
        futureValue: { label: "Future Value" },
        totalInterestEarned: { label: "Total Interest Earned" },
        totalContributions: { label: "Total Contributions" },
        interestOnInterest: { label: "Interest on Interest" },
        effectiveRate: { label: "Effective Rate (APY)" },
        doublingTime: { label: "Doubling Time (Rule of 72)" },
        dailyEarnings: { label: "Daily Earnings (Today)" },
        simpleVsCompoundDiff: { label: "Compounding Advantage" },
        inflationAdjustedValue: { label: "Inflation-Adjusted Value" },
        afterTaxValue: { label: "After-Tax Value" },
      },

      // ─── PRESETS ───────────────────────────────────────────
      presets: {
        savingsAccount: {
          label: "Savings Account",
          description: "$5K initial, 4.5% APY, daily, +$200/mo",
        },
        sp500Index: {
          label: "S&P 500 Index",
          description: "$10K, 10% avg, 20yr, +$500/mo",
        },
        conservative: {
          label: "Conservative",
          description: "$25K, 5%, 10yr, no contributions",
        },
        aggressiveGrowth: {
          label: "Aggressive Growth",
          description: "$1K, 12%, 30yr, +$300/mo",
        },
      },

      // ─── TOOLTIPS ──────────────────────────────────────────
      tooltips: {
        futureValue: "The total value of your investment at the end of the period",
        totalInterestEarned: "Total interest earned over the investment period",
        totalContributions: "Your initial deposit plus all monthly contributions",
        interestOnInterest: "The amount of interest earned by your previously earned interest — the 'magic' of compounding",
        effectiveRate: "The actual annual rate after compounding — higher than the stated nominal rate",
        doublingTime: "How many years until your initial investment doubles using the Rule of 72",
        dailyEarnings: "How much interest your current balance earns per day right now",
        simpleVsCompoundDiff: "How much MORE you earn with compound interest vs simple interest",
        inflationAdjustedValue: "What your future money will actually be worth in today's purchasing power",
        afterTaxValue: "Your final value after deducting taxes on interest earned",
      },

      // ─── DYNAMIC VALUES ────────────────────────────────────
      values: {
        "years": "years",
        "year": "year",
        "months": "months",
        "month": "month",
        "day": "day",
        "/day": "/day",
        "/yr": "/yr",
        "Year": "Year",
        "Contributions": "Contributions",
        "Interest from Principal": "Interest from Principal",
        "Interest on Interest": "Interest on Interest",
        "Balance": "Balance",
        "Interest": "Interest",
        "Cumulative": "Cumulative",
        "of total interest": "of total interest",
        "vs simple interest": "vs simple interest",
        "real purchasing power": "real purchasing power",
        "after tax": "after tax",
      },

      // ─── FORMATS ───────────────────────────────────────────
      formats: {
        summary:
          "Invest {initial} at {rate}% for {period} years → {futureValue}. Total interest: {totalInterest} ({interestOnInterest} from compounding alone). Your money doubles in ~{doublingTime}. Daily earnings: {dailyEarnings}.",
      },

      // ─── CHART ─────────────────────────────────────────────
      chart: {
        title: "Investment Growth Projection",
        xLabel: "Year",
        yLabel: "Value",
        series: {
          contributions: "Contributions",
          principalInterest: "Interest from Principal",
          interestOnInterest: "Interest on Interest",
        },
      },

      // ─── INFO CARDS ────────────────────────────────────────
      infoCards: {
        growthBreakdown: {
          title: "📊 Growth Breakdown",
          items: [
            "Total Interest Earned: see how much your money worked for you",
            "Interest on Interest: the compounding 'snowball' effect",
            "Effective Rate (APY): actual annual yield after compounding",
            "Simple vs Compound: extra money earned from compounding alone",
          ],
        },
        timeInsights: {
          title: "⏱️ Time & Impact Insights",
          items: [
            "Doubling Time: years to double your initial investment",
            "Daily Earnings: how much your money earns every day",
            "Inflation Impact: real purchasing power of future value",
            "Start Early: 5 years earlier = dramatically more at retirement",
          ],
        },
        compoundingTips: {
          title: "💡 Compounding Tips",
          items: [
            "Start now — time is the most powerful factor in compounding",
            "Automate contributions — consistency beats timing the market",
            "Reinvest all dividends and interest — never withdraw early",
            "Higher compounding frequency means slightly higher returns",
          ],
        },
      },

      // ─── REFERENCE DATA ────────────────────────────────────
      referenceData: {
        compoundingComparison: {
          title: "Compounding Frequency Impact",
          items: {
            daily: {
              label: "Daily (365×/yr)",
              value: "Highest effective rate — used by banks & savings accounts",
            },
            monthly: {
              label: "Monthly (12×/yr)",
              value: "Most common — mortgages, credit cards, many investments",
            },
            quarterly: {
              label: "Quarterly (4×/yr)",
              value: "Corporate bonds, some dividends",
            },
            semiannually: {
              label: "Semi-Annually (2×/yr)",
              value: "US Treasury bonds, some CDs",
            },
            annually: {
              label: "Annually (1×/yr)",
              value: "Simplest calculation — many international bonds",
            },
          },
        },
      },

      // ─── DETAILED TABLE ────────────────────────────────────
      detailedTable: {
        yearlyBreakdown: {
          button: "View Year-by-Year Growth Schedule",
          title: "Year-by-Year Compound Interest Schedule",
          columns: {
            year: "Year",
            contributions: "Contributions",
            interest: "Interest Earned",
            balance: "Balance",
            inflationAdjusted: "Real Value",
          },
        },
      },

      // ─── EDUCATION ─────────────────────────────────────────
      education: {
        whatIs: {
          title: "What Is Compound Interest?",
          content:
            "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods — earning 'interest on interest.' Unlike simple interest (which only earns on the original amount), compound interest creates exponential growth because each interest payment increases the base amount for the next calculation. Albert Einstein reportedly called compound interest 'the eighth wonder of the world.' Over long time horizons, the difference between simple and compound interest becomes dramatic: $10,000 at 8% simple interest earns $800/year forever, while at 8% compound interest it doubles roughly every 9 years, growing to $46,610 in 20 years vs $26,000 with simple interest.",
        },
        howItWorks: {
          title: "How the Compound Interest Formula Works",
          content:
            "The compound interest formula is A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual rate (decimal), n is the compounding frequency per year, and t is years. When you add regular contributions (PMT), the future value of an annuity formula is added: PMT × [((1 + r/n)^(nt) − 1) / (r/n)]. The key insight is that higher compounding frequency (n) means the exponent grows faster: daily compounding at 5% yields an effective rate of 5.127%, while annual compounding stays at exactly 5%. This calculator separates 'interest from principal' and 'interest on interest' so you can see exactly how much of your earnings come from the compounding effect alone.",
        },
        compoundingStrategies: {
          title: "Strategies to Maximize Compound Growth",
          items: [
            {
              text: "Start as early as possible — a 25-year-old investing $300/month at 8% will have more at 65 than a 35-year-old investing $600/month",
              type: "info",
            },
            {
              text: "Use tax-advantaged accounts (401k, IRA, Roth) — tax-deferred growth can increase effective returns by 20-30% over taxable accounts",
              type: "info",
            },
            {
              text: "Reinvest ALL dividends and interest — this single habit can double your long-term returns compared to taking distributions",
              type: "info",
            },
            {
              text: "Don't withdraw early — breaking compounding resets the exponential curve and costs exponentially more the earlier you withdraw",
              type: "warning",
            },
            {
              text: "Increase contributions with raises — boost your monthly amount by even 1% per year for significantly faster growth",
              type: "info",
            },
            {
              text: "Avoid high-fee funds — a 1% annual fee can reduce your final balance by 25%+ over 30 years due to lost compounding",
              type: "warning",
            },
          ],
        },
        commonMistakes: {
          title: "Common Compound Interest Mistakes",
          items: [
            {
              text: "Ignoring inflation — $1M in 30 years buys roughly what $400K buys today at 3% inflation",
              type: "warning",
            },
            {
              text: "Confusing nominal rate with APY — a 5% rate compounded monthly actually yields 5.12% per year",
              type: "warning",
            },
            {
              text: "Waiting to start — delaying investing by just 5 years can cost 30-40% of your final balance",
              type: "warning",
            },
            {
              text: "Panic selling during downturns — interrupting compounding during a temporary dip costs more than the dip itself",
              type: "warning",
            },
            {
              text: "Forgetting taxes on interest income — taxable accounts compound slower because taxes reduce the amount that reinvests each period",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step compound interest calculations",
          examples: [
            {
              title: "$10,000 at 7% for 20 years, monthly compounding",
              steps: [
                "Formula: A = P(1 + r/n)^(nt)",
                "A = 10,000 × (1 + 0.07/12)^(12×20)",
                "A = 10,000 × (1.005833)^240",
                "A = 10,000 × 4.0387 = $40,387",
                "Total interest: $30,387",
                "Simple interest would be: 10,000 × 0.07 × 20 = $14,000",
                "Compounding advantage: $30,387 − $14,000 = $16,387 extra",
              ],
              result:
                "$10,000 grows to $40,387 in 20 years. Compounding earned $16,387 MORE than simple interest would have.",
            },
            {
              title: "$5,000 + $200/mo at 8% for 30 years, monthly",
              steps: [
                "Principal growth: 5,000 × (1 + 0.08/12)^360 = $54,184",
                "Contribution growth: 200 × [((1.00667)^360 − 1) / 0.00667]",
                "Contribution FV = 200 × 1,490.36 = $298,072",
                "Total future value: $54,184 + $298,072 = $352,256",
                "Total contributed: $5,000 + ($200 × 360) = $77,000",
                "Total interest earned: $352,256 − $77,000 = $275,256",
                "Rule of 72: 72 ÷ 8 = 9 years to double",
              ],
              result:
                "$77,000 in total contributions grows to $352,256 — earning $275,256 in interest. Money doubles every ~9 years.",
            },
          ],
        },
      },

      // ─── FAQs ──────────────────────────────────────────────
      faqs: [
        {
          question: "What is compound interest and how does it differ from simple interest?",
          answer:
            "Compound interest calculates interest on both the original principal and all previously earned interest — 'interest on interest.' Simple interest only calculates on the original principal. Example: $10,000 at 5% for 10 years earns $5,000 in simple interest but $6,289 in compound interest (annually) — that extra $1,289 is the interest earned on interest.",
        },
        {
          question: "How does compounding frequency affect my returns?",
          answer:
            "More frequent compounding means slightly higher effective returns. At 5% nominal rate: annual compounding yields 5.00% APY, monthly yields 5.12%, daily yields 5.13%. The difference is small at low rates but compounds significantly over long periods. For a $100,000 investment over 30 years at 7%, daily vs annual compounding means roughly $10,000 more.",
        },
        {
          question: "What is the Rule of 72 and how accurate is it?",
          answer:
            "The Rule of 72 estimates how many years it takes to double your money: divide 72 by the annual interest rate. At 8%, money doubles in ~9 years (72÷8=9). It's most accurate for rates between 6-10%. For rates below 5%, use the Rule of 70 instead. The rule works for annual compounding; daily compounding doubles slightly faster.",
        },
        {
          question: "What is APY (Annual Percentage Yield) vs APR?",
          answer:
            "APR (Annual Percentage Rate) is the stated nominal interest rate. APY (Annual Percentage Yield) is the effective rate after accounting for compounding frequency. APY is always ≥ APR. A credit card at 24% APR compounded daily has an APY of 27.11%. When comparing investments, always compare APY to APY for a fair comparison.",
        },
        {
          question: "How does inflation affect my compound interest returns?",
          answer:
            "Inflation reduces the purchasing power of future money. At 3% inflation, $100,000 in 20 years only buys what $55,368 buys today. To find your 'real' return, subtract inflation from your nominal rate: 8% return − 3% inflation ≈ 5% real return. This calculator shows both nominal and inflation-adjusted values so you can plan realistically.",
        },
        {
          question: "Should I contribute monthly or invest a lump sum?",
          answer:
            "Mathematically, a lump sum invested immediately earns more because it compounds for the full period. However, most people don't have a lump sum available. Dollar-cost averaging (regular monthly contributions) is the practical approach for building wealth and also smooths out market volatility. The key is consistency — automate contributions and don't try to time the market.",
        },
        {
          question: "How much should I invest to reach a specific goal?",
          answer:
            "Use this calculator in reverse: enter your target amount as the future value and adjust the initial investment and monthly contributions until you reach it. For example, to have $1M in 30 years at 8% annual return, you'd need either ~$99,400 today with no contributions, or ~$670/month starting from $0. Starting with $10,000 + $500/month gets you there too.",
        },
        {
          question: "What is 'interest on interest' and why does it matter?",
          answer:
            "Interest on interest is the portion of your earnings generated by previously earned interest — not by your original deposits. It's the core mechanism of compounding. Over long periods, it becomes the majority of your returns: in a 30-year investment at 8%, about 75% of your final balance is interest on interest. This is why time is the most powerful factor in wealth building.",
        },
      ],

      // ─── FIXED UI BLOCKS ───────────────────────────────────
      rating: {
        title: "Rate this Calculator",
        share: "Share",
        copied: "Copied!",
        copyLink: "Copy Link",
        clickToRate: "Click to rate",
        youRated: "You rated",
        stars: "stars",
        averageFrom: "average from",
        ratings: "ratings",
      },

      common: { home: "Home", calculators: "Calculators" },

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
      accessibility: {
        mobileResults: "Results summary",
        closeModal: "Close",
        openMenu: "Open menu",
      },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de Interés Compuesto",
      "slug": "calculadora-interes-compuesto",
      "subtitle": "Calcula cómo crece tu dinero con interés compuesto, contribuciones regulares, y ve el impacto real de la inflación y los impuestos en tus rendimientos",
      "breadcrumb": "Interés Compuesto",
      "seo": {
        "title": "Calculadora de Interés Compuesto — Crecimiento, TAE y Regla del 72 | Gratis",
        "description": "Calculadora gratuita de interés compuesto con desglose de interés sobre interés, Regla del 72 para tiempo de duplicación, ganancias diarias, ajuste por inflación e impacto fiscal. Ve exactamente cómo el interés compuesto hace crecer tu patrimonio con el tiempo.",
        "shortDescription": "Ve cómo el interés compuesto hace crecer tu dinero con el tiempo",
        "keywords": [
          "calculadora interés compuesto",
          "calculadora interés sobre interés",
          "calculadora crecimiento compuesto",
          "calculadora crecimiento inversión",
          "calculadora regla del 72",
          "calculadora TAE",
          "interés compuesto con contribuciones mensuales",
          "calculadora crecimiento ahorros",
          "rendimientos ajustados inflación",
          "fórmula interés compuesto"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "initialInvestment": {
          "label": "Inversión Inicial",
          "helpText": "La cantidad inicial que inviertes o depositas",
          "placeholder": "10000"
        },
        "interestRate": {
          "label": "Tasa de Interés Anual",
          "helpText": "La tasa nominal anual de rendimiento (antes del interés compuesto)"
        },
        "investmentPeriod": {
          "label": "Período de Inversión",
          "helpText": "Cuántos años planeas mantener el dinero invertido"
        },
        "compoundingFrequency": {
          "label": "Frecuencia de Capitalización",
          "helpText": "Con qué frecuencia se calcula el interés y se añade a tu saldo",
          "options": {
            "daily": "Diaria (365×/año)",
            "monthly": "Mensual (12×/año)",
            "quarterly": "Trimestral (4×/año)",
            "semiannually": "Semestral (2×/año)",
            "annually": "Anual (1×/año)"
          }
        },
        "includeContributions": {
          "label": "Incluir Contribuciones Mensuales",
          "helpText": "Añadir depósitos mensuales regulares a tu inversión"
        },
        "monthlyContribution": {
          "label": "Contribución Mensual",
          "helpText": "Cantidad que añades cada mes",
          "placeholder": "200"
        },
        "includeInflation": {
          "label": "Ajustar por Inflación",
          "helpText": "Ver el poder adquisitivo real de tu dinero futuro"
        },
        "inflationRate": {
          "label": "Tasa de Inflación Esperada",
          "helpText": "Inflación anual promedio (promedio histórico EE.UU.: ~3%)"
        },
        "includeTax": {
          "label": "Incluir Impuesto sobre Intereses",
          "helpText": "Deducir impuestos de las ganancias por intereses"
        },
        "taxRate": {
          "label": "Tasa de Impuestos",
          "helpText": "Tu tasa marginal de impuestos sobre ingresos de inversión"
        }
      },
      "results": {
        "futureValue": {
          "label": "Valor Futuro"
        },
        "totalInterestEarned": {
          "label": "Interés Total Ganado"
        },
        "totalContributions": {
          "label": "Contribuciones Totales"
        },
        "interestOnInterest": {
          "label": "Interés sobre Interés"
        },
        "effectiveRate": {
          "label": "Tasa Efectiva (TAE)"
        },
        "doublingTime": {
          "label": "Tiempo de Duplicación (Regla del 72)"
        },
        "dailyEarnings": {
          "label": "Ganancias Diarias (Hoy)"
        },
        "simpleVsCompoundDiff": {
          "label": "Ventaja de Capitalización"
        },
        "inflationAdjustedValue": {
          "label": "Valor Ajustado por Inflación"
        },
        "afterTaxValue": {
          "label": "Valor Después de Impuestos"
        }
      },
      "presets": {
        "savingsAccount": {
          "label": "Cuenta de Ahorros",
          "description": "5.000€ inicial, 4,5% TAE, diaria, +200€/mes"
        },
        "sp500Index": {
          "label": "Índice S&P 500",
          "description": "10.000€, 10% promedio, 20 años, +500€/mes"
        },
        "conservative": {
          "label": "Conservador",
          "description": "25.000€, 5%, 10 años, sin contribuciones"
        },
        "aggressiveGrowth": {
          "label": "Crecimiento Agresivo",
          "description": "1.000€, 12%, 30 años, +300€/mes"
        }
      },
      "tooltips": {
        "futureValue": "El valor total de tu inversión al final del período",
        "totalInterestEarned": "Interés total ganado durante el período de inversión",
        "totalContributions": "Tu depósito inicial más todas las contribuciones mensuales",
        "interestOnInterest": "La cantidad de interés ganada por tu interés previamente ganado — la 'magia' de la capitalización",
        "effectiveRate": "La tasa anual real después de la capitalización — mayor que la tasa nominal declarada",
        "doublingTime": "Cuántos años hasta que tu inversión inicial se duplique usando la Regla del 72",
        "dailyEarnings": "Cuánto interés gana tu saldo actual por día ahora mismo",
        "simpleVsCompoundDiff": "Cuánto MÁS ganas con interés compuesto vs interés simple",
        "inflationAdjustedValue": "Lo que tu dinero futuro realmente valdrá en poder adquisitivo de hoy",
        "afterTaxValue": "Tu valor final después de deducir impuestos sobre el interés ganado"
      },
      "values": {
        "years": "años",
        "year": "año",
        "months": "meses",
        "month": "mes",
        "day": "día",
        "/day": "/día",
        "/yr": "/año",
        "Year": "Año",
        "Contributions": "Contribuciones",
        "Interest from Principal": "Interés del Principal",
        "Interest on Interest": "Interés sobre Interés",
        "Balance": "Saldo",
        "Interest": "Interés",
        "Cumulative": "Acumulativo",
        "of total interest": "del interés total",
        "vs simple interest": "vs interés simple",
        "real purchasing power": "poder adquisitivo real",
        "after tax": "después de impuestos"
      },
      "formats": {
        "summary": "Invierte {initial} al {rate}% durante {period} años → {futureValue}. Interés total: {totalInterest} ({interestOnInterest} solo de capitalización). Tu dinero se duplica en ~{doublingTime}. Ganancias diarias: {dailyEarnings}."
      },
      "chart": {
        "title": "Proyección de Crecimiento de Inversión",
        "xLabel": "Año",
        "yLabel": "Valor",
        "series": {
          "contributions": "Contribuciones",
          "principalInterest": "Interés del Principal",
          "interestOnInterest": "Interés sobre Interés"
        }
      },
      "infoCards": {
        "growthBreakdown": {
          "title": "📊 Desglose del Crecimiento",
          "items": [
            "Interés Total Ganado: ve cuánto trabajó tu dinero para ti",
            "Interés sobre Interés: el efecto 'bola de nieve' de la capitalización",
            "Tasa Efectiva (TAE): rendimiento anual real después de capitalización",
            "Simple vs Compuesto: dinero extra ganado solo de la capitalización"
          ]
        },
        "timeInsights": {
          "title": "⏱️ Perspectivas de Tiempo e Impacto",
          "items": [
            "Tiempo de Duplicación: años para duplicar tu inversión inicial",
            "Ganancias Diarias: cuánto gana tu dinero cada día",
            "Impacto de Inflación: poder adquisitivo real del valor futuro",
            "Empezar Temprano: 5 años antes = dramáticamente más en jubilación"
          ]
        },
        "compoundingTips": {
          "title": "💡 Consejos de Capitalización",
          "items": [
            "Empieza ahora — el tiempo es el factor más poderoso en la capitalización",
            "Automatiza contribuciones — la consistencia supera al momento del mercado",
            "Reinvierte todos los dividendos e intereses — nunca retires temprano",
            "Mayor frecuencia de capitalización significa rendimientos ligeramente mayores"
          ]
        }
      },
      "referenceData": {
        "compoundingComparison": {
          "title": "Impacto de la Frecuencia de Capitalización",
          "items": {
            "daily": {
              "label": "Diaria (365×/año)",
              "value": "Tasa efectiva más alta — usada por bancos y cuentas de ahorro"
            },
            "monthly": {
              "label": "Mensual (12×/año)",
              "value": "Más común — hipotecas, tarjetas de crédito, muchas inversiones"
            },
            "quarterly": {
              "label": "Trimestral (4×/año)",
              "value": "Bonos corporativos, algunos dividendos"
            },
            "semiannually": {
              "label": "Semestral (2×/año)",
              "value": "Bonos del Tesoro de EE.UU., algunos depósitos a plazo"
            },
            "annually": {
              "label": "Anual (1×/año)",
              "value": "Cálculo más simple — muchos bonos internacionales"
            }
          }
        }
      },
      "detailedTable": {
        "yearlyBreakdown": {
          "button": "Ver Cronograma de Crecimiento Año por Año",
          "title": "Cronograma de Interés Compuesto Año por Año",
          "columns": {
            "year": "Año",
            "contributions": "Contribuciones",
            "interest": "Interés Ganado",
            "balance": "Saldo",
            "inflationAdjusted": "Valor Real"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el Interés Compuesto?",
          "content": "El interés compuesto es el interés calculado tanto sobre el capital inicial como sobre el interés acumulado de períodos anteriores — ganando 'interés sobre interés'. A diferencia del interés simple (que solo gana sobre la cantidad original), el interés compuesto crea crecimiento exponencial porque cada pago de interés aumenta la cantidad base para el siguiente cálculo. Albert Einstein supuestamente llamó al interés compuesto 'la octava maravilla del mundo'. Durante horizontes de tiempo largos, la diferencia entre interés simple y compuesto se vuelve dramática: 10.000€ al 8% de interés simple gana 800€/año para siempre, mientras que al 8% de interés compuesto se duplica aproximadamente cada 9 años, creciendo a 46.610€ en 20 años vs 26.000€ con interés simple."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Fórmula del Interés Compuesto",
          "content": "La fórmula del interés compuesto es A = P(1 + r/n)^(nt), donde A es la cantidad final, P es el capital, r es la tasa anual (decimal), n es la frecuencia de capitalización por año, y t son los años. Cuando añades contribuciones regulares (PMT), se añade la fórmula del valor futuro de una anualidad: PMT × [((1 + r/n)^(nt) − 1) / (r/n)]. La clave es que mayor frecuencia de capitalización (n) significa que el exponente crece más rápido: capitalización diaria al 5% produce una tasa efectiva de 5,127%, mientras que capitalización anual permanece exactamente en 5%. Esta calculadora separa 'interés del capital' e 'interés sobre interés' para que puedas ver exactamente cuánto de tus ganancias viene solo del efecto de capitalización."
        },
        "compoundingStrategies": {
          "title": "Estrategias para Maximizar el Crecimiento Compuesto",
          "items": [
            {
              "text": "Empieza lo más temprano posible — una persona de 25 años invirtiendo 300€/mes al 8% tendrá más a los 65 que una de 35 años invirtiendo 600€/mes",
              "type": "info"
            },
            {
              "text": "Usa cuentas con ventajas fiscales (401k, IRA, Roth) — el crecimiento diferido de impuestos puede aumentar rendimientos efectivos 20-30% sobre cuentas gravables",
              "type": "info"
            },
            {
              "text": "Reinvierte TODOS los dividendos e intereses — este único hábito puede duplicar tus rendimientos a largo plazo comparado con tomar distribuciones",
              "type": "info"
            },
            {
              "text": "No retires temprano — romper la capitalización reinicia la curva exponencial y cuesta exponencialmente más cuanto antes retires",
              "type": "warning"
            },
            {
              "text": "Aumenta contribuciones con aumentos salariales — aumenta tu cantidad mensual aunque sea 1% por año para crecimiento significativamente más rápido",
              "type": "info"
            },
            {
              "text": "Evita fondos con comisiones altas — una comisión anual del 1% puede reducir tu saldo final 25%+ en 30 años debido a capitalización perdida",
              "type": "warning"
            }
          ]
        },
        "commonMistakes": {
          "title": "Errores Comunes del Interés Compuesto",
          "items": [
            {
              "text": "Ignorar la inflación — 1M€ en 30 años compra aproximadamente lo que 400.000€ compran hoy con 3% de inflación",
              "type": "warning"
            },
            {
              "text": "Confundir tasa nominal con TAE — una tasa del 5% capitalizada mensualmente realmente produce 5,12% por año",
              "type": "warning"
            },
            {
              "text": "Esperar para empezar — retrasar la inversión solo 5 años puede costar 30-40% de tu saldo final",
              "type": "warning"
            },
            {
              "text": "Vender por pánico durante caídas — interrumpir la capitalización durante una caída temporal cuesta más que la caída misma",
              "type": "warning"
            },
            {
              "text": "Olvidar impuestos sobre ingresos de intereses — cuentas gravables capitalizan más lento porque los impuestos reducen la cantidad que se reinvierte cada período",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Cálculos de interés compuesto paso a paso",
          "examples": [
            {
              "title": "10.000€ al 7% durante 20 años, capitalización mensual",
              "steps": [
                "Fórmula: A = P(1 + r/n)^(nt)",
                "A = 10.000 × (1 + 0,07/12)^(12×20)",
                "A = 10.000 × (1,005833)^240",
                "A = 10.000 × 4,0387 = 40.387€",
                "Interés total: 30.387€",
                "Interés simple sería: 10.000 × 0,07 × 20 = 14.000€",
                "Ventaja de capitalización: 30.387€ − 14.000€ = 16.387€ extra"
              ],
              "result": "10.000€ crecen a 40.387€ en 20 años. La capitalización ganó 16.387€ MÁS de lo que habría ganado el interés simple."
            },
            {
              "title": "5.000€ + 200€/mes al 8% durante 30 años, mensual",
              "steps": [
                "Crecimiento del capital: 5.000 × (1 + 0,08/12)^360 = 54.184€",
                "Crecimiento de contribuciones: 200 × [((1,00667)^360 − 1) / 0,00667]",
                "VF contribuciones = 200 × 1.490,36 = 298.072€",
                "Valor futuro total: 54.184€ + 298.072€ = 352.256€",
                "Total contribuido: 5.000€ + (200€ × 360) = 77.000€",
                "Interés total ganado: 352.256€ − 77.000€ = 275.256€",
                "Regla del 72: 72 ÷ 8 = 9 años para duplicar"
              ],
              "result": "77.000€ en contribuciones totales crecen a 352.256€ — ganando 275.256€ en intereses. El dinero se duplica cada ~9 años."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué es el interés compuesto y cómo difiere del interés simple?",
          "answer": "El interés compuesto calcula intereses tanto sobre el capital original como sobre todos los intereses previamente ganados — 'interés sobre interés'. El interés simple solo calcula sobre el capital original. Ejemplo: 10.000€ al 5% durante 10 años gana 5.000€ en interés simple pero 6.289€ en interés compuesto (anual) — esos 1.289€ extra son el interés ganado sobre interés."
        },
        {
          "question": "¿Cómo afecta la frecuencia de capitalización a mis rendimientos?",
          "answer": "Mayor frecuencia de capitalización significa rendimientos efectivos ligeramente mayores. Con tasa nominal del 5%: capitalización anual produce 5,00% TAE, mensual produce 5,12%, diaria produce 5,13%. La diferencia es pequeña con tasas bajas pero se compone significativamente en períodos largos. Para una inversión de 100.000€ en 30 años al 7%, capitalización diaria vs anual significa aproximadamente 10.000€ más."
        },
        {
          "question": "¿Qué es la Regla del 72 y qué tan precisa es?",
          "answer": "La Regla del 72 estima cuántos años toma duplicar tu dinero: divide 72 entre la tasa de interés anual. Al 8%, el dinero se duplica en ~9 años (72÷8=9). Es más precisa para tasas entre 6-10%. Para tasas bajo 5%, usa la Regla del 70 en su lugar. La regla funciona para capitalización anual; capitalización diaria duplica ligeramente más rápido."
        },
        {
          "question": "¿Qué es TAE (Tasa Anual Equivalente) vs TIN?",
          "answer": "TIN (Tasa de Interés Nominal) es la tasa nominal declarada. TAE es la tasa efectiva después de considerar la frecuencia de capitalización. TAE siempre es ≥ TIN. Una tarjeta de crédito al 24% TIN capitalizada diariamente tiene una TAE de 27,11%. Al comparar inversiones, siempre compara TAE con TAE para una comparación justa."
        },
        {
          "question": "¿Cómo afecta la inflación a mis rendimientos de interés compuesto?",
          "answer": "La inflación reduce el poder adquisitivo del dinero futuro. Con 3% de inflación, 100.000€ en 20 años solo compran lo que 55.368€ compran hoy. Para encontrar tu rendimiento 'real', resta inflación de tu tasa nominal: 8% rendimiento − 3% inflación ≈ 5% rendimiento real. Esta calculadora muestra valores nominales y ajustados por inflación para que puedas planificar realísticamente."
        },
        {
          "question": "¿Debería contribuir mensualmente o invertir una suma global?",
          "answer": "Matemáticamente, una suma global invertida inmediatamente gana más porque se capitaliza durante el período completo. Sin embargo, la mayoría de personas no tienen una suma global disponible. El promedio de costos (contribuciones mensuales regulares) es el enfoque práctico para construir riqueza y también suaviza la volatilidad del mercado. La clave es consistencia — automatiza contribuciones y no trates de cronometrar el mercado."
        },
        {
          "question": "¿Cuánto debería invertir para alcanzar una meta específica?",
          "answer": "Usa esta calculadora a la inversa: ingresa tu cantidad objetivo como valor futuro y ajusta la inversión inicial y contribuciones mensuales hasta alcanzarla. Por ejemplo, para tener 1M€ en 30 años con 8% de rendimiento anual, necesitarías ~99.400€ hoy sin contribuciones, o ~670€/mes empezando desde 0€. Empezar con 10.000€ + 500€/mes también te lleva allí."
        },
        {
          "question": "¿Qué es 'interés sobre interés' y por qué importa?",
          "answer": "Interés sobre interés es la porción de tus ganancias generada por interés previamente ganado — no por tus depósitos originales. Es el mecanismo central de la capitalización. En períodos largos, se convierte en la mayoría de tus rendimientos: en una inversión de 30 años al 8%, aproximadamente 75% de tu saldo final es interés sobre interés. Por esto el tiempo es el factor más poderoso en la construcción de riqueza."
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
      "name": "Calculadora de Juros Compostos",
      "slug": "calculadora-juros-compostos",
      "subtitle": "Calcule como seu dinheiro cresce com juros compostos, contribuições regulares e veja o impacto real da inflação e impostos em seus retornos",
      "breadcrumb": "Juros Compostos",
      "seo": {
        "title": "Calculadora de Juros Compostos — Crescimento, TAE e Regra de 72 | Grátis",
        "description": "Calculadora gratuita de juros compostos com detalhamento de juros sobre juros, Regra de 72 para tempo de duplicação, ganhos diários, ajuste inflacionário e impacto fiscal. Veja exatamente como os juros compostos fazem seu patrimônio crescer ao longo do tempo.",
        "shortDescription": "Veja como os juros compostos fazem seu dinheiro crescer ao longo do tempo",
        "keywords": [
          "calculadora juros compostos",
          "calculadora juros sobre juros",
          "calculadora crescimento composto",
          "calculadora crescimento investimento",
          "calculadora regra de 72",
          "calculadora TAE",
          "juros compostos com contribuições mensais",
          "calculadora crescimento poupança",
          "retornos ajustados inflação",
          "fórmula juros compostos"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "initialInvestment": {
          "label": "Investimento Inicial",
          "helpText": "O valor inicial que você investe ou deposita",
          "placeholder": "10000"
        },
        "interestRate": {
          "label": "Taxa de Juros Anual",
          "helpText": "A taxa nominal anual de retorno (antes da capitalização)"
        },
        "investmentPeriod": {
          "label": "Período de Investimento",
          "helpText": "Quantos anos você planeja manter o dinheiro investido"
        },
        "compoundingFrequency": {
          "label": "Frequência de Capitalização",
          "helpText": "Com que frequência os juros são calculados e adicionados ao seu saldo",
          "options": {
            "daily": "Diariamente (365×/ano)",
            "monthly": "Mensalmente (12×/ano)",
            "quarterly": "Trimestralmente (4×/ano)",
            "semiannually": "Semestralmente (2×/ano)",
            "annually": "Anualmente (1×/ano)"
          }
        },
        "includeContributions": {
          "label": "Incluir Contribuições Mensais",
          "helpText": "Adicionar depósitos mensais regulares ao seu investimento"
        },
        "monthlyContribution": {
          "label": "Contribuição Mensal",
          "helpText": "Valor que você adiciona a cada mês",
          "placeholder": "200"
        },
        "includeInflation": {
          "label": "Ajustar pela Inflação",
          "helpText": "Veja o poder de compra real do seu dinheiro futuro"
        },
        "inflationRate": {
          "label": "Taxa de Inflação Esperada",
          "helpText": "Inflação média anual (média histórica Brasil: ~4%)"
        },
        "includeTax": {
          "label": "Incluir Imposto sobre Juros",
          "helpText": "Deduzir impostos dos ganhos com juros"
        },
        "taxRate": {
          "label": "Taxa de Imposto",
          "helpText": "Sua alíquota marginal de imposto sobre renda de investimentos"
        }
      },
      "results": {
        "futureValue": {
          "label": "Valor Futuro"
        },
        "totalInterestEarned": {
          "label": "Total de Juros Ganhos"
        },
        "totalContributions": {
          "label": "Total de Contribuições"
        },
        "interestOnInterest": {
          "label": "Juros sobre Juros"
        },
        "effectiveRate": {
          "label": "Taxa Efetiva (TAE)"
        },
        "doublingTime": {
          "label": "Tempo de Duplicação (Regra de 72)"
        },
        "dailyEarnings": {
          "label": "Ganhos Diários (Hoje)"
        },
        "simpleVsCompoundDiff": {
          "label": "Vantagem da Capitalização"
        },
        "inflationAdjustedValue": {
          "label": "Valor Ajustado pela Inflação"
        },
        "afterTaxValue": {
          "label": "Valor Após Impostos"
        }
      },
      "presets": {
        "savingsAccount": {
          "label": "Conta Poupança",
          "description": "R$ 5mil inicial, 4,5% TAE, diário, +R$ 200/mês"
        },
        "sp500Index": {
          "label": "Índice S&P 500",
          "description": "R$ 10mil, 10% média, 20 anos, +R$ 500/mês"
        },
        "conservative": {
          "label": "Conservador",
          "description": "R$ 25mil, 5%, 10 anos, sem contribuições"
        },
        "aggressiveGrowth": {
          "label": "Crescimento Agressivo",
          "description": "R$ 1mil, 12%, 30 anos, +R$ 300/mês"
        }
      },
      "tooltips": {
        "futureValue": "O valor total do seu investimento no final do período",
        "totalInterestEarned": "Total de juros ganhos durante o período de investimento",
        "totalContributions": "Seu depósito inicial mais todas as contribuições mensais",
        "interestOnInterest": "O valor de juros ganhos pelos seus juros anteriormente ganhos — a 'mágica' dos juros compostos",
        "effectiveRate": "A taxa anual real após a capitalização — maior que a taxa nominal declarada",
        "doublingTime": "Quantos anos até seu investimento inicial duplicar usando a Regra de 72",
        "dailyEarnings": "Quanto de juros seu saldo atual ganha por dia neste momento",
        "simpleVsCompoundDiff": "Quanto MAIS você ganha com juros compostos vs juros simples",
        "inflationAdjustedValue": "O que seu dinheiro futuro realmente valerá em poder de compra de hoje",
        "afterTaxValue": "Seu valor final após deduzir impostos sobre juros ganhos"
      },
      "values": {
        "years": "anos",
        "year": "ano",
        "months": "meses",
        "month": "mês",
        "day": "dia",
        "/day": "/dia",
        "/yr": "/ano",
        "Year": "Ano",
        "Contributions": "Contribuições",
        "Interest from Principal": "Juros do Principal",
        "Interest on Interest": "Juros sobre Juros",
        "Balance": "Saldo",
        "Interest": "Juros",
        "Cumulative": "Cumulativo",
        "of total interest": "do total de juros",
        "vs simple interest": "vs juros simples",
        "real purchasing power": "poder de compra real",
        "after tax": "após impostos"
      },
      "formats": {
        "summary": "Invista {initial} a {rate}% por {period} anos → {futureValue}. Total de juros: {totalInterest} ({interestOnInterest} apenas da capitalização). Seu dinheiro duplica em ~{doublingTime}. Ganhos diários: {dailyEarnings}."
      },
      "chart": {
        "title": "Projeção de Crescimento do Investimento",
        "xLabel": "Ano",
        "yLabel": "Valor",
        "series": {
          "contributions": "Contribuições",
          "principalInterest": "Juros do Principal",
          "interestOnInterest": "Juros sobre Juros"
        }
      },
      "infoCards": {
        "growthBreakdown": {
          "title": "📊 Detalhamento do Crescimento",
          "items": [
            "Total de Juros Ganhos: veja quanto seu dinheiro trabalhou para você",
            "Juros sobre Juros: o efeito 'bola de neve' da capitalização",
            "Taxa Efetiva (TAE): rendimento anual real após capitalização",
            "Simples vs Composto: dinheiro extra ganho apenas com capitalização"
          ]
        },
        "timeInsights": {
          "title": "⏱️ Percepções de Tempo e Impacto",
          "items": [
            "Tempo de Duplicação: anos para duplicar seu investimento inicial",
            "Ganhos Diários: quanto seu dinheiro rende todos os dias",
            "Impacto da Inflação: poder de compra real do valor futuro",
            "Comece Cedo: 5 anos antes = dramaticamente mais na aposentadoria"
          ]
        },
        "compoundingTips": {
          "title": "💡 Dicas de Capitalização",
          "items": [
            "Comece agora — o tempo é o fator mais poderoso na capitalização",
            "Automatize contribuições — consistência vence timing de mercado",
            "Reinvista todos os dividendos e juros — nunca retire antecipadamente",
            "Maior frequência de capitalização significa retornos ligeiramente maiores"
          ]
        }
      },
      "referenceData": {
        "compoundingComparison": {
          "title": "Impacto da Frequência de Capitalização",
          "items": {
            "daily": {
              "label": "Diariamente (365×/ano)",
              "value": "Taxa efetiva mais alta — usada por bancos e contas poupança"
            },
            "monthly": {
              "label": "Mensalmente (12×/ano)",
              "value": "Mais comum — financiamentos, cartões de crédito, muitos investimentos"
            },
            "quarterly": {
              "label": "Trimestralmente (4×/ano)",
              "value": "Títulos corporativos, alguns dividendos"
            },
            "semiannually": {
              "label": "Semestralmente (2×/ano)",
              "value": "Títulos do Tesouro, alguns CDBs"
            },
            "annually": {
              "label": "Anualmente (1×/ano)",
              "value": "Cálculo mais simples — muitos títulos internacionais"
            }
          }
        }
      },
      "detailedTable": {
        "yearlyBreakdown": {
          "button": "Ver Cronograma de Crescimento Ano a Ano",
          "title": "Cronograma de Juros Compostos Ano a Ano",
          "columns": {
            "year": "Ano",
            "contributions": "Contribuições",
            "interest": "Juros Ganhos",
            "balance": "Saldo",
            "inflationAdjusted": "Valor Real"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que são Juros Compostos?",
          "content": "Juros compostos são juros calculados tanto sobre o principal inicial quanto sobre os juros acumulados de períodos anteriores — ganhando 'juros sobre juros'. Diferente dos juros simples (que só rendem sobre o valor original), os juros compostos criam crescimento exponencial porque cada pagamento de juros aumenta a base para o próximo cálculo. Albert Einstein supostamente chamou os juros compostos de 'oitava maravilha do mundo'. Em horizontes longos, a diferença entre juros simples e compostos se torna dramática: R$ 10.000 a 8% de juros simples rendem R$ 800/ano para sempre, enquanto a 8% de juros compostos duplica aproximadamente a cada 9 anos, crescendo para R$ 46.610 em 20 anos vs R$ 26.000 com juros simples."
        },
        "howItWorks": {
          "title": "Como Funciona a Fórmula dos Juros Compostos",
          "content": "A fórmula dos juros compostos é M = C(1 + i/n)^(nt), onde M é o montante final, C é o capital, i é a taxa anual (decimal), n é a frequência de capitalização por ano, e t são os anos. Quando você adiciona contribuições regulares (PMT), a fórmula do valor futuro de uma anuidade é adicionada: PMT × [((1 + i/n)^(nt) − 1) / (i/n)]. O insight chave é que maior frequência de capitalização (n) significa que o expoente cresce mais rápido: capitalização diária a 5% rende uma taxa efetiva de 5,127%, enquanto capitalização anual permanece exatamente 5%. Esta calculadora separa 'juros do principal' e 'juros sobre juros' para que você possa ver exatamente quanto de seus ganhos vem apenas do efeito de capitalização."
        },
        "compoundingStrategies": {
          "title": "Estratégias para Maximizar o Crescimento Composto",
          "items": [
            {
              "text": "Comece o mais cedo possível — uma pessoa de 25 anos investindo R$ 300/mês a 8% terá mais aos 65 que uma de 35 anos investindo R$ 600/mês",
              "type": "info"
            },
            {
              "text": "Use contas com vantagens fiscais (previdência, PGBL) — crescimento com diferimento fiscal pode aumentar retornos efetivos em 20-30% sobre contas tributáveis",
              "type": "info"
            },
            {
              "text": "Reinvista TODOS os dividendos e juros — este único hábito pode dobrar seus retornos de longo prazo comparado a retirar distribuições",
              "type": "info"
            },
            {
              "text": "Não retire antecipadamente — quebrar a capitalização reinicia a curva exponencial e custa exponencialmente mais quanto mais cedo você retirar",
              "type": "warning"
            },
            {
              "text": "Aumente contribuições com aumentos — eleve seu valor mensal em apenas 1% ao ano para crescimento significativamente mais rápido",
              "type": "info"
            },
            {
              "text": "Evite fundos com taxas altas — uma taxa anual de 1% pode reduzir seu saldo final em 25%+ em 30 anos devido à capitalização perdida",
              "type": "warning"
            }
          ]
        },
        "commonMistakes": {
          "title": "Erros Comuns com Juros Compostos",
          "items": [
            {
              "text": "Ignorar a inflação — R$ 1 milhão em 30 anos compra aproximadamente o que R$ 400 mil compram hoje a 3% de inflação",
              "type": "warning"
            },
            {
              "text": "Confundir taxa nominal com TAE — uma taxa de 5% capitalizada mensalmente na verdade rende 5,12% ao ano",
              "type": "warning"
            },
            {
              "text": "Esperar para começar — atrasar investimentos em apenas 5 anos pode custar 30-40% do seu saldo final",
              "type": "warning"
            },
            {
              "text": "Vender em pânico durante quedas — interromper a capitalização durante uma queda temporária custa mais que a própria queda",
              "type": "warning"
            },
            {
              "text": "Esquecer impostos sobre renda de juros — contas tributáveis capitalizam mais devagar porque impostos reduzem o valor que reinveste a cada período",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Cálculos de juros compostos passo a passo",
          "examples": [
            {
              "title": "R$ 10.000 a 7% por 20 anos, capitalização mensal",
              "steps": [
                "Fórmula: M = C(1 + i/n)^(nt)",
                "M = 10.000 × (1 + 0,07/12)^(12×20)",
                "M = 10.000 × (1,005833)^240",
                "M = 10.000 × 4,0387 = R$ 40.387",
                "Total de juros: R$ 30.387",
                "Juros simples seriam: 10.000 × 0,07 × 20 = R$ 14.000",
                "Vantagem da capitalização: R$ 30.387 − R$ 14.000 = R$ 16.387 a mais"
              ],
              "result": "R$ 10.000 crescem para R$ 40.387 em 20 anos. A capitalização rendeu R$ 16.387 A MAIS do que juros simples teriam rendido."
            },
            {
              "title": "R$ 5.000 + R$ 200/mês a 8% por 30 anos, mensal",
              "steps": [
                "Crescimento do principal: 5.000 × (1 + 0,08/12)^360 = R$ 54.184",
                "Crescimento das contribuições: 200 × [((1,00667)^360 − 1) / 0,00667]",
                "VF das contribuições = 200 × 1.490,36 = R$ 298.072",
                "Valor futuro total: R$ 54.184 + R$ 298.072 = R$ 352.256",
                "Total contribuído: R$ 5.000 + (R$ 200 × 360) = R$ 77.000",
                "Total de juros ganhos: R$ 352.256 − R$ 77.000 = R$ 275.256",
                "Regra de 72: 72 ÷ 8 = 9 anos para duplicar"
              ],
              "result": "R$ 77.000 em contribuições totais crescem para R$ 352.256 — ganhando R$ 275.256 em juros. O dinheiro duplica a cada ~9 anos."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "O que são juros compostos e como diferem dos juros simples?",
          "answer": "Juros compostos calculam juros tanto sobre o principal original quanto sobre todos os juros anteriormente ganhos — 'juros sobre juros'. Juros simples só calculam sobre o principal original. Exemplo: R$ 10.000 a 5% por 10 anos rendem R$ 5.000 em juros simples, mas R$ 6.289 em juros compostos (anuais) — esses R$ 1.289 extras são os juros ganhos sobre juros."
        },
        {
          "question": "Como a frequência de capitalização afeta meus retornos?",
          "answer": "Capitalização mais frequente significa retornos efetivos ligeiramente maiores. A uma taxa nominal de 5%: capitalização anual rende 5,00% TAE, mensal rende 5,12%, diária rende 5,13%. A diferença é pequena em taxas baixas, mas se compõe significativamente em períodos longos. Para um investimento de R$ 100.000 em 30 anos a 7%, capitalização diária vs anual significa aproximadamente R$ 10.000 a mais."
        },
        {
          "question": "O que é a Regra de 72 e quão precisa ela é?",
          "answer": "A Regra de 72 estima quantos anos leva para duplicar seu dinheiro: divida 72 pela taxa de juros anual. A 8%, o dinheiro duplica em ~9 anos (72÷8=9). É mais precisa para taxas entre 6-10%. Para taxas abaixo de 5%, use a Regra de 70. A regra funciona para capitalização anual; capitalização diária duplica ligeiramente mais rápido."
        },
        {
          "question": "O que é TAE (Taxa Anual Efetiva) vs Taxa Nominal?",
          "answer": "Taxa Nominal é a taxa de juros declarada. TAE (Taxa Anual Efetiva) é a taxa efetiva após considerar a frequência de capitalização. TAE é sempre ≥ Taxa Nominal. Um cartão de crédito a 24% ao ano capitalizado diariamente tem TAE de 27,11%. Ao comparar investimentos, sempre compare TAE com TAE para comparação justa."
        },
        {
          "question": "Como a inflação afeta meus retornos de juros compostos?",
          "answer": "A inflação reduz o poder de compra do dinheiro futuro. A 3% de inflação, R$ 100.000 em 20 anos só compram o que R$ 55.368 compram hoje. Para encontrar seu retorno 'real', subtraia a inflação da sua taxa: 8% de retorno − 3% de inflação ≈ 5% de retorno real. Esta calculadora mostra valores nominais e ajustados pela inflação para você planejar realisticamente."
        },
        {
          "question": "Devo contribuir mensalmente ou investir uma quantia única?",
          "answer": "Matematicamente, uma quantia única investida imediatamente rende mais porque capitaliza pelo período completo. Porém, a maioria das pessoas não tem uma quantia única disponível. Média de custo (contribuições mensais regulares) é a abordagem prática para construir riqueza e também suaviza a volatilidade do mercado. O segredo é consistência — automatize contribuições e não tente cronometrar o mercado."
        },
        {
          "question": "Quanto devo investir para alcançar um objetivo específico?",
          "answer": "Use esta calculadora ao contrário: insira seu valor alvo como valor futuro e ajuste o investimento inicial e contribuições mensais até alcançá-lo. Por exemplo, para ter R$ 1 milhão em 30 anos a 8% de retorno anual, você precisaria de ~R$ 99.400 hoje sem contribuições, ou ~R$ 670/mês começando do zero. Começar com R$ 10.000 + R$ 500/mês também te leva lá."
        },
        {
          "question": "O que são 'juros sobre juros' e por que importam?",
          "answer": "Juros sobre juros são a porção dos seus ganhos gerada por juros anteriormente ganhos — não pelos seus depósitos originais. É o mecanismo central da capitalização. Em períodos longos, tornam-se a maioria dos seus retornos: em um investimento de 30 anos a 8%, cerca de 75% do seu saldo final são juros sobre juros. É por isso que o tempo é o fator mais poderoso na construção de riqueza."
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
      "name": "Calculateur d'Intérêts Composés",
      "slug": "calculateur-interets-composes",
      "subtitle": "Calculez comment votre argent croît avec les intérêts composés, les contributions régulières, et voyez l'impact réel de l'inflation et des taxes sur vos rendements",
      "breadcrumb": "Intérêts Composés",
      "seo": {
        "title": "Calculateur d'Intérêts Composés — Croissance, TAE & Règle de 72 | Gratuit",
        "description": "Calculateur d'intérêts composés gratuit avec ventilation des intérêts sur intérêts, règle de 72 pour le temps de doublement, gains quotidiens, ajustement inflation, et impact fiscal. Voyez exactement comment la capitalisation fait croître votre patrimoine.",
        "shortDescription": "Voyez comment les intérêts composés font fructifier votre argent",
        "keywords": [
          "calculateur intérêts composés",
          "calculateur intérêts sur intérêts",
          "calculateur croissance composée",
          "calculateur croissance investissement",
          "calculateur règle de 72",
          "calculateur TAE",
          "intérêts composés contributions mensuelles",
          "calculateur croissance épargne",
          "rendements ajustés inflation",
          "formule intérêts composés"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "initialInvestment": {
          "label": "Investissement Initial",
          "helpText": "Le montant de départ que vous investissez ou déposez",
          "placeholder": "10000"
        },
        "interestRate": {
          "label": "Taux d'Intérêt Annuel",
          "helpText": "Le taux nominal annuel de rendement (avant capitalisation)"
        },
        "investmentPeriod": {
          "label": "Période d'Investissement",
          "helpText": "Combien d'années vous prévoyez garder l'argent investi"
        },
        "compoundingFrequency": {
          "label": "Fréquence de Capitalisation",
          "helpText": "À quelle fréquence les intérêts sont calculés et ajoutés à votre solde",
          "options": {
            "daily": "Quotidienne (365×/an)",
            "monthly": "Mensuelle (12×/an)",
            "quarterly": "Trimestrielle (4×/an)",
            "semiannually": "Semestrielle (2×/an)",
            "annually": "Annuelle (1×/an)"
          }
        },
        "includeContributions": {
          "label": "Inclure les Contributions Mensuelles",
          "helpText": "Ajoutez des dépôts mensuels réguliers à votre investissement"
        },
        "monthlyContribution": {
          "label": "Contribution Mensuelle",
          "helpText": "Montant que vous ajoutez chaque mois",
          "placeholder": "200"
        },
        "includeInflation": {
          "label": "Ajuster pour l'Inflation",
          "helpText": "Voyez le pouvoir d'achat réel de votre argent futur"
        },
        "inflationRate": {
          "label": "Taux d'Inflation Attendu",
          "helpText": "Inflation annuelle moyenne (moyenne historique France : ~2%)"
        },
        "includeTax": {
          "label": "Inclure l'Impôt sur les Intérêts",
          "helpText": "Déduire les impôts des gains d'intérêts"
        },
        "taxRate": {
          "label": "Taux d'Imposition",
          "helpText": "Votre taux marginal d'imposition sur les revenus d'investissement"
        }
      },
      "results": {
        "futureValue": {
          "label": "Valeur Future"
        },
        "totalInterestEarned": {
          "label": "Total des Intérêts Gagnés"
        },
        "totalContributions": {
          "label": "Total des Contributions"
        },
        "interestOnInterest": {
          "label": "Intérêts sur Intérêts"
        },
        "effectiveRate": {
          "label": "Taux Effectif (TAE)"
        },
        "doublingTime": {
          "label": "Temps de Doublement (Règle de 72)"
        },
        "dailyEarnings": {
          "label": "Gains Quotidiens (Aujourd'hui)"
        },
        "simpleVsCompoundDiff": {
          "label": "Avantage de la Capitalisation"
        },
        "inflationAdjustedValue": {
          "label": "Valeur Ajustée à l'Inflation"
        },
        "afterTaxValue": {
          "label": "Valeur Après Impôt"
        }
      },
      "presets": {
        "savingsAccount": {
          "label": "Compte d'Épargne",
          "description": "5K€ initial, 4,5% TAE, quotidien, +200€/mois"
        },
        "sp500Index": {
          "label": "Indice S&P 500",
          "description": "10K€, 10% moy, 20ans, +500€/mois"
        },
        "conservative": {
          "label": "Conservateur",
          "description": "25K€, 5%, 10ans, pas de contributions"
        },
        "aggressiveGrowth": {
          "label": "Croissance Agressive",
          "description": "1K€, 12%, 30ans, +300€/mois"
        }
      },
      "tooltips": {
        "futureValue": "La valeur totale de votre investissement à la fin de la période",
        "totalInterestEarned": "Total des intérêts gagnés sur la période d'investissement",
        "totalContributions": "Votre dépôt initial plus toutes les contributions mensuelles",
        "interestOnInterest": "Le montant d'intérêts gagnés par vos intérêts précédemment acquis — la 'magie' de la capitalisation",
        "effectiveRate": "Le taux annuel réel après capitalisation — plus élevé que le taux nominal affiché",
        "doublingTime": "Combien d'années jusqu'à ce que votre investissement initial double selon la règle de 72",
        "dailyEarnings": "Combien d'intérêts votre solde actuel rapporte par jour en ce moment",
        "simpleVsCompoundDiff": "Combien vous gagnez EN PLUS avec les intérêts composés par rapport aux intérêts simples",
        "inflationAdjustedValue": "Ce que votre argent futur vaudra réellement en pouvoir d'achat d'aujourd'hui",
        "afterTaxValue": "Votre valeur finale après déduction des impôts sur les intérêts gagnés"
      },
      "values": {
        "years": "années",
        "year": "année",
        "months": "mois",
        "month": "mois",
        "day": "jour",
        "/day": "/jour",
        "/yr": "/an",
        "Year": "Année",
        "Contributions": "Contributions",
        "Interest from Principal": "Intérêts du Capital",
        "Interest on Interest": "Intérêts sur Intérêts",
        "Balance": "Solde",
        "Interest": "Intérêts",
        "Cumulative": "Cumulé",
        "of total interest": "du total des intérêts",
        "vs simple interest": "vs intérêts simples",
        "real purchasing power": "pouvoir d'achat réel",
        "after tax": "après impôt"
      },
      "formats": {
        "summary": "Investissez {initial} à {rate}% pendant {period} ans → {futureValue}. Total des intérêts : {totalInterest} (dont {interestOnInterest} de capitalisation seule). Votre argent double en ~{doublingTime}. Gains quotidiens : {dailyEarnings}."
      },
      "chart": {
        "title": "Projection de Croissance d'Investissement",
        "xLabel": "Année",
        "yLabel": "Valeur",
        "series": {
          "contributions": "Contributions",
          "principalInterest": "Intérêts du Capital",
          "interestOnInterest": "Intérêts sur Intérêts"
        }
      },
      "infoCards": {
        "growthBreakdown": {
          "title": "📊 Ventilation de la Croissance",
          "items": [
            "Total des Intérêts Gagnés : voyez combien votre argent a travaillé pour vous",
            "Intérêts sur Intérêts : l'effet 'boule de neige' de la capitalisation",
            "Taux Effectif (TAE) : rendement annuel réel après capitalisation",
            "Simple vs Composé : argent supplémentaire gagné grâce à la capitalisation seule"
          ]
        },
        "timeInsights": {
          "title": "⏱️ Aperçus Temps & Impact",
          "items": [
            "Temps de Doublement : années pour doubler votre investissement initial",
            "Gains Quotidiens : combien votre argent rapporte chaque jour",
            "Impact de l'Inflation : pouvoir d'achat réel de la valeur future",
            "Commencez Tôt : 5 ans plus tôt = dramatiquement plus à la retraite"
          ]
        },
        "compoundingTips": {
          "title": "💡 Conseils de Capitalisation",
          "items": [
            "Commencez maintenant — le temps est le facteur le plus puissant de la capitalisation",
            "Automatisez les contributions — la régularité bat le timing du marché",
            "Réinvestissez tous les dividendes et intérêts — ne retirez jamais tôt",
            "Une fréquence de capitalisation plus élevée signifie des rendements légèrement supérieurs"
          ]
        }
      },
      "referenceData": {
        "compoundingComparison": {
          "title": "Impact de la Fréquence de Capitalisation",
          "items": {
            "daily": {
              "label": "Quotidienne (365×/an)",
              "value": "Taux effectif le plus élevé — utilisé par les banques et comptes d'épargne"
            },
            "monthly": {
              "label": "Mensuelle (12×/an)",
              "value": "La plus commune — prêts immobiliers, cartes de crédit, nombreux investissements"
            },
            "quarterly": {
              "label": "Trimestrielle (4×/an)",
              "value": "Obligations d'entreprises, certains dividendes"
            },
            "semiannually": {
              "label": "Semestrielle (2×/an)",
              "value": "Obligations du Trésor, certains certificats de dépôt"
            },
            "annually": {
              "label": "Annuelle (1×/an)",
              "value": "Calcul le plus simple — nombreuses obligations internationales"
            }
          }
        }
      },
      "detailedTable": {
        "yearlyBreakdown": {
          "button": "Voir le Calendrier de Croissance Année par Année",
          "title": "Calendrier d'Intérêts Composés Année par Année",
          "columns": {
            "year": "Année",
            "contributions": "Contributions",
            "interest": "Intérêts Gagnés",
            "balance": "Solde",
            "inflationAdjusted": "Valeur Réelle"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que les Intérêts Composés ?",
          "content": "Les intérêts composés sont des intérêts calculés à la fois sur le capital initial et sur les intérêts accumulés des périodes précédentes — gagner des 'intérêts sur les intérêts.' Contrairement aux intérêts simples (qui ne rapportent que sur le montant original), les intérêts composés créent une croissance exponentielle car chaque paiement d'intérêts augmente le montant de base pour le calcul suivant. Albert Einstein aurait appelé les intérêts composés 'la huitième merveille du monde.' Sur de longs horizons temporels, la différence entre intérêts simples et composés devient dramatique : 10 000€ à 8% d'intérêts simples rapporte 800€/an pour toujours, tandis qu'à 8% d'intérêts composés il double environ tous les 9 ans, atteignant 46 610€ en 20 ans contre 26 000€ avec des intérêts simples."
        },
        "howItWorks": {
          "title": "Comment Fonctionne la Formule des Intérêts Composés",
          "content": "La formule des intérêts composés est A = P(1 + r/n)^(nt), où A est le montant final, P est le capital, r est le taux annuel (décimal), n est la fréquence de capitalisation par an, et t les années. Quand vous ajoutez des contributions régulières (PMT), la formule de valeur future d'une annuité s'ajoute : PMT × [((1 + r/n)^(nt) − 1) / (r/n)]. L'insight clé est qu'une fréquence de capitalisation plus élevée (n) fait croître l'exposant plus rapidement : une capitalisation quotidienne à 5% donne un taux effectif de 5,127%, tandis qu'une capitalisation annuelle reste exactement à 5%. Ce calculateur sépare les 'intérêts du capital' et les 'intérêts sur intérêts' pour que vous puissiez voir exactement combien de vos gains proviennent de l'effet de capitalisation seul."
        },
        "compoundingStrategies": {
          "title": "Stratégies pour Maximiser la Croissance Composée",
          "items": [
            {
              "text": "Commencez le plus tôt possible — une personne de 25 ans investissant 300€/mois à 8% aura plus à 65 ans qu'une personne de 35 ans investissant 600€/mois",
              "type": "info"
            },
            {
              "text": "Utilisez des comptes fiscalement avantageux (PEA, assurance-vie) — la croissance différée d'impôt peut augmenter les rendements effectifs de 20-30% par rapport aux comptes imposables",
              "type": "info"
            },
            {
              "text": "Réinvestissez TOUS les dividendes et intérêts — cette seule habitude peut doubler vos rendements à long terme comparé à prendre les distributions",
              "type": "info"
            },
            {
              "text": "Ne retirez pas tôt — briser la capitalisation remet à zéro la courbe exponentielle et coûte exponentiellement plus cher plus tôt vous retirez",
              "type": "warning"
            },
            {
              "text": "Augmentez les contributions avec les augmentations — boostez votre montant mensuel de ne serait-ce que 1% par an pour une croissance significativement plus rapide",
              "type": "info"
            },
            {
              "text": "Évitez les fonds à frais élevés — des frais annuels de 1% peuvent réduire votre solde final de 25%+ sur 30 ans à cause de la capitalisation perdue",
              "type": "warning"
            }
          ]
        },
        "commonMistakes": {
          "title": "Erreurs Courantes avec les Intérêts Composés",
          "items": [
            {
              "text": "Ignorer l'inflation — 1M€ dans 30 ans achète approximativement ce que 400K€ achètent aujourd'hui avec 3% d'inflation",
              "type": "warning"
            },
            {
              "text": "Confondre taux nominal et TAE — un taux de 5% capitalisé mensuellement donne réellement 5,12% par an",
              "type": "warning"
            },
            {
              "text": "Attendre pour commencer — retarder l'investissement de seulement 5 ans peut coûter 30-40% de votre solde final",
              "type": "warning"
            },
            {
              "text": "Vendre en panique pendant les baisses — interrompre la capitalisation pendant une baisse temporaire coûte plus que la baisse elle-même",
              "type": "warning"
            },
            {
              "text": "Oublier les impôts sur les revenus d'intérêts — les comptes imposables se capitalisent plus lentement car les impôts réduisent le montant qui se réinvestit chaque période",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calculs",
          "description": "Calculs d'intérêts composés étape par étape",
          "examples": [
            {
              "title": "10 000€ à 7% pendant 20 ans, capitalisation mensuelle",
              "steps": [
                "Formule : A = P(1 + r/n)^(nt)",
                "A = 10 000 × (1 + 0,07/12)^(12×20)",
                "A = 10 000 × (1,005833)^240",
                "A = 10 000 × 4,0387 = 40 387€",
                "Total des intérêts : 30 387€",
                "Les intérêts simples auraient été : 10 000 × 0,07 × 20 = 14 000€",
                "Avantage de la capitalisation : 30 387€ − 14 000€ = 16 387€ en plus"
              ],
              "result": "10 000€ deviennent 40 387€ en 20 ans. La capitalisation a rapporté 16 387€ DE PLUS que les intérêts simples."
            },
            {
              "title": "5 000€ + 200€/mois à 8% pendant 30 ans, mensuel",
              "steps": [
                "Croissance du capital : 5 000 × (1 + 0,08/12)^360 = 54 184€",
                "Croissance des contributions : 200 × [((1,00667)^360 − 1) / 0,00667]",
                "VF des contributions = 200 × 1 490,36 = 298 072€",
                "Valeur future totale : 54 184€ + 298 072€ = 352 256€",
                "Total contribué : 5 000€ + (200€ × 360) = 77 000€",
                "Total des intérêts gagnés : 352 256€ − 77 000€ = 275 256€",
                "Règle de 72 : 72 ÷ 8 = 9 ans pour doubler"
              ],
              "result": "77 000€ de contributions totales deviennent 352 256€ — rapportant 275 256€ d'intérêts. L'argent double tous les ~9 ans."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qu'est-ce que les intérêts composés et en quoi diffèrent-ils des intérêts simples ?",
          "answer": "Les intérêts composés calculent les intérêts à la fois sur le capital original et sur tous les intérêts précédemment gagnés — des 'intérêts sur les intérêts.' Les intérêts simples ne calculent que sur le capital original. Exemple : 10 000€ à 5% pendant 10 ans rapporte 5 000€ d'intérêts simples mais 6 289€ d'intérêts composés (annuels) — ces 1 289€ supplémentaires sont les intérêts gagnés sur les intérêts."
        },
        {
          "question": "Comment la fréquence de capitalisation affecte-t-elle mes rendements ?",
          "answer": "Une capitalisation plus fréquente signifie des rendements effectifs légèrement plus élevés. À un taux nominal de 5% : la capitalisation annuelle donne 5,00% de TAE, mensuelle donne 5,12%, quotidienne donne 5,13%. La différence est petite aux taux faibles mais se compose significativement sur de longues périodes. Pour un investissement de 100 000€ sur 30 ans à 7%, quotidien vs annuel signifie environ 10 000€ de plus."
        },
        {
          "question": "Qu'est-ce que la règle de 72 et à quel point est-elle précise ?",
          "answer": "La règle de 72 estime combien d'années il faut pour doubler votre argent : divisez 72 par le taux d'intérêt annuel. À 8%, l'argent double en ~9 ans (72÷8=9). Elle est plus précise pour les taux entre 6-10%. Pour les taux inférieurs à 5%, utilisez plutôt la règle de 70. La règle fonctionne pour la capitalisation annuelle ; la capitalisation quotidienne double légèrement plus vite."
        },
        {
          "question": "Qu'est-ce que le TAE (Taux Annuel Effectif) vs le taux nominal ?",
          "answer": "Le taux nominal est le taux d'intérêt affiché. Le TAE est le taux effectif après prise en compte de la fréquence de capitalisation. Le TAE est toujours ≥ au taux nominal. Une carte de crédit à 24% nominal capitalisé quotidiennement a un TAE de 27,11%. Lors de la comparaison d'investissements, comparez toujours TAE à TAE pour une comparaison équitable."
        },
        {
          "question": "Comment l'inflation affecte-t-elle mes rendements d'intérêts composés ?",
          "answer": "L'inflation réduit le pouvoir d'achat de l'argent futur. À 3% d'inflation, 100 000€ dans 20 ans n'achètent que ce que 55 368€ achètent aujourd'hui. Pour trouver votre rendement 'réel', soustrayez l'inflation de votre taux nominal : 8% de rendement − 3% d'inflation ≈ 5% de rendement réel. Ce calculateur montre les valeurs nominales et ajustées à l'inflation pour que vous puissiez planifier de façon réaliste."
        },
        {
          "question": "Dois-je contribuer mensuellement ou investir une somme forfaitaire ?",
          "answer": "Mathématiquement, une somme forfaitaire investie immédiatement rapporte plus car elle se capitalise pendant toute la période. Cependant, la plupart des gens n'ont pas de somme forfaitaire disponible. L'étalement des achats (contributions mensuelles régulières) est l'approche pratique pour construire la richesse et lisse aussi la volatilité du marché. La clé est la régularité — automatisez les contributions et n'essayez pas de chronométrer le marché."
        },
        {
          "question": "Combien dois-je investir pour atteindre un objectif spécifique ?",
          "answer": "Utilisez ce calculateur à l'envers : entrez votre montant cible comme valeur future et ajustez l'investissement initial et les contributions mensuelles jusqu'à l'atteindre. Par exemple, pour avoir 1M€ en 30 ans à 8% de rendement annuel, vous auriez besoin soit de ~99 400€ aujourd'hui sans contributions, soit de ~670€/mois en partant de 0€. Commencer avec 10 000€ + 500€/mois vous y amène aussi."
        },
        {
          "question": "Qu'est-ce que les 'intérêts sur intérêts' et pourquoi est-ce important ?",
          "answer": "Les intérêts sur intérêts sont la portion de vos gains générée par les intérêts précédemment gagnés — pas par vos dépôts originaux. C'est le mécanisme central de la capitalisation. Sur de longues périodes, cela devient la majorité de vos rendements : dans un investissement de 30 ans à 8%, environ 75% de votre solde final sont des intérêts sur intérêts. C'est pourquoi le temps est le facteur le plus puissant dans la construction de richesse."
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
      "name": "Zinseszins Rechner",
      "slug": "zinseszins-rechner",
      "subtitle": "Berechnen Sie, wie Ihr Geld mit Zinseszins und regelmäßigen Beiträgen wächst, und sehen Sie die realen Auswirkungen von Inflation und Steuern auf Ihre Renditen",
      "breadcrumb": "Zinseszins",
      "seo": {
        "title": "Zinseszins Rechner — Wachstum, Effektivzins & 72er-Regel | Kostenlos",
        "description": "Kostenloser Zinseszins Rechner mit Zins-auf-Zins-Aufschlüsselung, 72er-Regel Verdoppelungszeit, täglichen Erträgen, Inflationsanpassung und Steuerauswirkungen. Sehen Sie genau, wie Zinseszins Ihr Vermögen über die Zeit vermehrt.",
        "shortDescription": "Sehen Sie, wie Zinseszins Ihr Geld über die Zeit vermehrt",
        "keywords": [
          "zinseszins rechner",
          "zins auf zins rechner",
          "zinseszinswachstum rechner",
          "investitionswachstum rechner",
          "72er regel rechner",
          "effektivzins rechner",
          "zinseszins mit monatlichen beiträgen",
          "sparwachstum rechner",
          "inflationsbereinigte renditen",
          "zinseszins formel"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "initialInvestment": {
          "label": "Anfangsinvestition",
          "helpText": "Der Startbetrag, den Sie investieren oder einzahlen",
          "placeholder": "10000"
        },
        "interestRate": {
          "label": "Jährlicher Zinssatz",
          "helpText": "Der nominale jährliche Zinssatz (vor Zinseszins)"
        },
        "investmentPeriod": {
          "label": "Anlagezeitraum",
          "helpText": "Wie viele Jahre Sie das Geld angelegt lassen möchten"
        },
        "compoundingFrequency": {
          "label": "Zinseszins-Häufigkeit",
          "helpText": "Wie oft Zinsen berechnet und zu Ihrem Guthaben hinzugefügt werden",
          "options": {
            "daily": "Täglich (365×/Jahr)",
            "monthly": "Monatlich (12×/Jahr)",
            "quarterly": "Vierteljährlich (4×/Jahr)",
            "semiannually": "Halbjährlich (2×/Jahr)",
            "annually": "Jährlich (1×/Jahr)"
          }
        },
        "includeContributions": {
          "label": "Monatliche Beiträge einbeziehen",
          "helpText": "Regelmäßige monatliche Einzahlungen zu Ihrer Investition hinzufügen"
        },
        "monthlyContribution": {
          "label": "Monatlicher Beitrag",
          "helpText": "Betrag, den Sie jeden Monat hinzufügen",
          "placeholder": "200"
        },
        "includeInflation": {
          "label": "Für Inflation anpassen",
          "helpText": "Sehen Sie die reale Kaufkraft Ihres zukünftigen Geldes"
        },
        "inflationRate": {
          "label": "Erwartete Inflationsrate",
          "helpText": "Durchschnittliche jährliche Inflation (US-Durchschnitt: ~3%)"
        },
        "includeTax": {
          "label": "Steuer auf Zinsen einbeziehen",
          "helpText": "Steuern von Zinserträgen abziehen"
        },
        "taxRate": {
          "label": "Steuersatz",
          "helpText": "Ihr Grenzsteuersatz auf Kapitalerträge"
        }
      },
      "results": {
        "futureValue": {
          "label": "Zukünftiger Wert"
        },
        "totalInterestEarned": {
          "label": "Gesamte Zinserträge"
        },
        "totalContributions": {
          "label": "Gesamte Beiträge"
        },
        "interestOnInterest": {
          "label": "Zinsen auf Zinsen"
        },
        "effectiveRate": {
          "label": "Effektiver Zinssatz (Effektivzins)"
        },
        "doublingTime": {
          "label": "Verdoppelungszeit (72er-Regel)"
        },
        "dailyEarnings": {
          "label": "Tägliche Erträge (heute)"
        },
        "simpleVsCompoundDiff": {
          "label": "Zinseszins-Vorteil"
        },
        "inflationAdjustedValue": {
          "label": "Inflationsbereinigter Wert"
        },
        "afterTaxValue": {
          "label": "Wert nach Steuern"
        }
      },
      "presets": {
        "savingsAccount": {
          "label": "Sparkonto",
          "description": "5.000€ initial, 4,5% Effektivzins, täglich, +200€/Mo"
        },
        "sp500Index": {
          "label": "S&P 500 Index",
          "description": "10.000€, 10% Durchschnitt, 20 Jahre, +500€/Mo"
        },
        "conservative": {
          "label": "Konservativ",
          "description": "25.000€, 5%, 10 Jahre, keine Beiträge"
        },
        "aggressiveGrowth": {
          "label": "Aggressives Wachstum",
          "description": "1.000€, 12%, 30 Jahre, +300€/Mo"
        }
      },
      "tooltips": {
        "futureValue": "Der Gesamtwert Ihrer Investition am Ende des Zeitraums",
        "totalInterestEarned": "Gesamte Zinserträge über den Anlagezeitraum",
        "totalContributions": "Ihre Anfangseinzahlung plus alle monatlichen Beiträge",
        "interestOnInterest": "Der Zinsbetrag, der durch Ihre bereits verdienten Zinsen erwirtschaftet wurde — die 'Magie' des Zinseszinses",
        "effectiveRate": "Der tatsächliche Jahreszins nach Berücksichtigung der Zinseszins-Häufigkeit — höher als der angegebene Nominalzins",
        "doublingTime": "Wie viele Jahre bis sich Ihre Anfangsinvestition mit der 72er-Regel verdoppelt",
        "dailyEarnings": "Wie viel Zinsen Ihr aktuelles Guthaben pro Tag gerade jetzt verdient",
        "simpleVsCompoundDiff": "Wie viel MEHR Sie mit Zinseszins im Vergleich zu einfachen Zinsen verdienen",
        "inflationAdjustedValue": "Was Ihr zukünftiges Geld tatsächlich in heutiger Kaufkraft wert sein wird",
        "afterTaxValue": "Ihr Endwert nach Abzug der Steuern auf verdiente Zinsen"
      },
      "values": {
        "years": "Jahre",
        "year": "Jahr",
        "months": "Monate",
        "month": "Monat",
        "day": "Tag",
        "/day": "/Tag",
        "/yr": "/Jahr",
        "Year": "Jahr",
        "Contributions": "Beiträge",
        "Interest from Principal": "Zinsen vom Kapital",
        "Interest on Interest": "Zinsen auf Zinsen",
        "Balance": "Guthaben",
        "Interest": "Zinsen",
        "Cumulative": "Kumulativ",
        "of total interest": "der Gesamtzinsen",
        "vs simple interest": "gegenüber einfachen Zinsen",
        "real purchasing power": "reale Kaufkraft",
        "after tax": "nach Steuern"
      },
      "formats": {
        "summary": "Investieren Sie {initial} mit {rate}% für {period} Jahre → {futureValue}. Gesamtzinsen: {totalInterest} ({interestOnInterest} allein durch Zinseszins). Ihr Geld verdoppelt sich in ~{doublingTime}. Tägliche Erträge: {dailyEarnings}."
      },
      "chart": {
        "title": "Investitionswachstums-Prognose",
        "xLabel": "Jahr",
        "yLabel": "Wert",
        "series": {
          "contributions": "Beiträge",
          "principalInterest": "Zinsen vom Kapital",
          "interestOnInterest": "Zinsen auf Zinsen"
        }
      },
      "infoCards": {
        "growthBreakdown": {
          "title": "📊 Wachstums-Aufschlüsselung",
          "items": [
            "Gesamte Zinserträge: sehen Sie, wie viel Ihr Geld für Sie gearbeitet hat",
            "Zinsen auf Zinsen: der Zinseszins-'Schneeball'-Effekt",
            "Effektiver Zinssatz (Effektivzins): tatsächliche Jahresrendite nach Zinseszins",
            "Einfache vs. Zinseszinsen: zusätzliches Geld allein durch Zinseszins verdient"
          ]
        },
        "timeInsights": {
          "title": "⏱️ Zeit- und Auswirkungsanalysen",
          "items": [
            "Verdoppelungszeit: Jahre bis zur Verdopplung Ihrer Anfangsinvestition",
            "Tägliche Erträge: wie viel Ihr Geld jeden Tag verdient",
            "Inflationsauswirkung: reale Kaufkraft des zukünftigen Wertes",
            "Früh anfangen: 5 Jahre früher = dramatisch mehr im Ruhestand"
          ]
        },
        "compoundingTips": {
          "title": "💡 Zinseszins-Tipps",
          "items": [
            "Jetzt anfangen — Zeit ist der mächtigste Faktor beim Zinseszins",
            "Beiträge automatisieren — Beständigkeit schlägt Market-Timing",
            "Alle Dividenden und Zinsen reinvestieren — niemals früh abheben",
            "Höhere Zinseszins-Häufigkeit bedeutet etwas höhere Renditen"
          ]
        }
      },
      "referenceData": {
        "compoundingComparison": {
          "title": "Auswirkung der Zinseszins-Häufigkeit",
          "items": {
            "daily": {
              "label": "Täglich (365×/Jahr)",
              "value": "Höchster Effektivzins — verwendet von Banken & Sparkonten"
            },
            "monthly": {
              "label": "Monatlich (12×/Jahr)",
              "value": "Am häufigsten — Hypotheken, Kreditkarten, viele Investitionen"
            },
            "quarterly": {
              "label": "Vierteljährlich (4×/Jahr)",
              "value": "Unternehmensanleihen, einige Dividenden"
            },
            "semiannually": {
              "label": "Halbjährlich (2×/Jahr)",
              "value": "US-Staatsanleihen, einige Festgelder"
            },
            "annually": {
              "label": "Jährlich (1×/Jahr)",
              "value": "Einfachste Berechnung — viele internationale Anleihen"
            }
          }
        }
      },
      "detailedTable": {
        "yearlyBreakdown": {
          "button": "Jahr-für-Jahr-Wachstumsplan anzeigen",
          "title": "Jahr-für-Jahr Zinseszins-Plan",
          "columns": {
            "year": "Jahr",
            "contributions": "Beiträge",
            "interest": "Verdiente Zinsen",
            "balance": "Guthaben",
            "inflationAdjusted": "Realwert"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist Zinseszins?",
          "content": "Zinseszins sind Zinsen, die sowohl auf das ursprüngliche Kapital als auch auf die angesammelten Zinsen aus früheren Perioden berechnet werden — 'Zinsen auf Zinsen' verdienen. Im Gegensatz zu einfachen Zinsen (die nur auf den ursprünglichen Betrag verdient werden) erzeugt Zinseszins exponentielles Wachstum, weil jede Zinszahlung den Grundbetrag für die nächste Berechnung erhöht. Albert Einstein soll Zinseszins das 'achte Weltwunder' genannt haben. Über lange Zeiträume wird der Unterschied zwischen einfachen und Zinseszinsen dramatisch: 10.000€ mit 8% einfachen Zinsen verdienen für immer 800€/Jahr, während sie mit 8% Zinseszins etwa alle 9 Jahre verdoppeln und in 20 Jahren auf 46.610€ anwachsen gegenüber 26.000€ mit einfachen Zinsen."
        },
        "howItWorks": {
          "title": "Wie die Zinseszins-Formel funktioniert",
          "content": "Die Zinseszins-Formel lautet A = P(1 + r/n)^(nt), wobei A der Endbetrag, P das Kapital, r der jährliche Zinssatz (dezimal), n die Zinseszins-Häufigkeit pro Jahr und t die Jahre sind. Wenn Sie regelmäßige Beiträge (PMT) hinzufügen, wird die Zukunftswert-einer-Rente-Formel hinzugefügt: PMT × [((1 + r/n)^(nt) − 1) / (r/n)]. Die wichtigste Erkenntnis ist, dass höhere Zinseszins-Häufigkeit (n) bedeutet, dass der Exponent schneller wächst: tägliche Verzinsung bei 5% ergibt einen Effektivzins von 5,127%, während jährliche Verzinsung bei genau 5% bleibt. Dieser Rechner trennt 'Zinsen vom Kapital' und 'Zinsen auf Zinsen', damit Sie genau sehen können, wie viel Ihrer Erträge allein vom Zinseszins-Effekt stammen."
        },
        "compoundingStrategies": {
          "title": "Strategien zur Maximierung des Zinseszins-Wachstums",
          "items": [
            {
              "text": "So früh wie möglich anfangen — ein 25-Jähriger, der 300€/Monat mit 8% investiert, hat mit 65 mehr als ein 35-Jähriger, der 600€/Monat investiert",
              "type": "info"
            },
            {
              "text": "Steuerbegünstigte Konten nutzen (401k, IRA, Roth) — steueraufgeschobenes Wachstum kann die effektiven Renditen um 20-30% gegenüber steuerpflichtigen Konten erhöhen",
              "type": "info"
            },
            {
              "text": "ALLE Dividenden und Zinsen reinvestieren — diese eine Gewohnheit kann Ihre langfristigen Renditen im Vergleich zu Ausschüttungen verdoppeln",
              "type": "info"
            },
            {
              "text": "Nicht früh abheben — das Unterbrechen des Zinseszinses setzt die Exponentialkurve zurück und kostet exponentiell mehr, je früher Sie abheben",
              "type": "warning"
            },
            {
              "text": "Beiträge bei Gehaltserhöhungen steigern — erhöhen Sie Ihren monatlichen Betrag auch nur um 1% pro Jahr für deutlich schnelleres Wachstum",
              "type": "info"
            },
            {
              "text": "Fonds mit hohen Gebühren vermeiden — eine 1% jährliche Gebühr kann Ihr Endguthaben über 30 Jahre um 25%+ reduzieren durch verlorenen Zinseszins",
              "type": "warning"
            }
          ]
        },
        "commonMistakes": {
          "title": "Häufige Zinseszins-Fehler",
          "items": [
            {
              "text": "Inflation ignorieren — 1 Million€ in 30 Jahren kaufen etwa das, was 400.000€ heute bei 3% Inflation kaufen",
              "type": "warning"
            },
            {
              "text": "Nominalzins mit Effektivzins verwechseln — ein 5% Zinssatz, monatlich verzinst, ergibt tatsächlich 5,12% pro Jahr",
              "type": "warning"
            },
            {
              "text": "Mit dem Anfangen warten — das Aufschieben der Investition um nur 5 Jahre kann 30-40% Ihres Endguthabens kosten",
              "type": "warning"
            },
            {
              "text": "Panikverkäufe während Abschwüngen — das Unterbrechen des Zinseszinses während eines vorübergehenden Rückgangs kostet mehr als der Rückgang selbst",
              "type": "warning"
            },
            {
              "text": "Steuern auf Zinserträge vergessen — steuerpflichtige Konten verzinsen sich langsamer, weil Steuern den Betrag reduzieren, der jede Periode reinvestiert wird",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt Zinseszins-Berechnungen",
          "examples": [
            {
              "title": "10.000€ mit 7% für 20 Jahre, monatliche Verzinsung",
              "steps": [
                "Formel: A = P(1 + r/n)^(nt)",
                "A = 10.000 × (1 + 0,07/12)^(12×20)",
                "A = 10.000 × (1,005833)^240",
                "A = 10.000 × 4,0387 = 40.387€",
                "Gesamtzinsen: 30.387€",
                "Einfache Zinsen wären: 10.000 × 0,07 × 20 = 14.000€",
                "Zinseszins-Vorteil: 30.387€ − 14.000€ = 16.387€ extra"
              ],
              "result": "10.000€ wachsen in 20 Jahren auf 40.387€. Zinseszins verdiente 16.387€ MEHR als einfache Zinsen verdient hätten."
            },
            {
              "title": "5.000€ + 200€/Mo mit 8% für 30 Jahre, monatlich",
              "steps": [
                "Kapitalwachstum: 5.000 × (1 + 0,08/12)^360 = 54.184€",
                "Beitragswachstum: 200 × [((1,00667)^360 − 1) / 0,00667]",
                "Beitrags-Zukunftswert = 200 × 1.490,36 = 298.072€",
                "Gesamter Zukunftswert: 54.184€ + 298.072€ = 352.256€",
                "Gesamte Beiträge: 5.000€ + (200€ × 360) = 77.000€",
                "Gesamte verdiente Zinsen: 352.256€ − 77.000€ = 275.256€",
                "72er-Regel: 72 ÷ 8 = 9 Jahre bis zur Verdopplung"
              ],
              "result": "77.000€ Gesamtbeiträge wachsen auf 352.256€ — verdienen 275.256€ an Zinsen. Geld verdoppelt sich etwa alle 9 Jahre."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist Zinseszins und wie unterscheidet er sich von einfachen Zinsen?",
          "answer": "Zinseszins berechnet Zinsen sowohl auf das ursprüngliche Kapital als auch auf alle zuvor verdienten Zinsen — 'Zinsen auf Zinsen'. Einfache Zinsen berechnen nur auf das ursprüngliche Kapital. Beispiel: 10.000€ mit 5% für 10 Jahre verdienen 5.000€ einfache Zinsen, aber 6.289€ Zinseszins (jährlich) — diese zusätzlichen 1.289€ sind die Zinsen, die auf Zinsen verdient wurden."
        },
        {
          "question": "Wie beeinflusst die Zinseszins-Häufigkeit meine Renditen?",
          "answer": "Häufigere Verzinsung bedeutet etwas höhere effektive Renditen. Bei 5% Nominalzins: jährliche Verzinsung ergibt 5,00% Effektivzins, monatliche ergibt 5,12%, tägliche ergibt 5,13%. Der Unterschied ist bei niedrigen Zinssätzen klein, aber verstärkt sich über lange Zeiträume erheblich. Für eine 100.000€-Investition über 30 Jahre bei 7% bedeutet tägliche vs. jährliche Verzinsung etwa 10.000€ mehr."
        },
        {
          "question": "Was ist die 72er-Regel und wie genau ist sie?",
          "answer": "Die 72er-Regel schätzt, wie viele Jahre es dauert, bis sich Ihr Geld verdoppelt: teilen Sie 72 durch den jährlichen Zinssatz. Bei 8% verdoppelt sich Geld in ~9 Jahren (72÷8=9). Sie ist am genauesten für Zinssätze zwischen 6-10%. Für Zinssätze unter 5% verwenden Sie stattdessen die 70er-Regel. Die Regel funktioniert für jährliche Verzinsung; tägliche Verzinsung verdoppelt sich etwas schneller."
        },
        {
          "question": "Was ist Effektivzins vs. Nominalzins?",
          "answer": "Nominalzins ist der angegebene Zinssatz. Effektivzins ist der tatsächliche Zinssatz nach Berücksichtigung der Zinseszins-Häufigkeit. Effektivzins ist immer ≥ Nominalzins. Eine Kreditkarte mit 24% Nominalzins, täglich verzinst, hat einen Effektivzins von 27,11%. Beim Vergleichen von Investitionen vergleichen Sie immer Effektivzins mit Effektivzins für einen fairen Vergleich."
        },
        {
          "question": "Wie beeinflusst Inflation meine Zinseszins-Renditen?",
          "answer": "Inflation reduziert die Kaufkraft zukünftigen Geldes. Bei 3% Inflation kaufen 100.000€ in 20 Jahren nur das, was 55.368€ heute kaufen. Um Ihre 'reale' Rendite zu finden, ziehen Sie Inflation von Ihrem Nominalzins ab: 8% Rendite − 3% Inflation ≈ 5% reale Rendite. Dieser Rechner zeigt sowohl nominale als auch inflationsbereinigte Werte, damit Sie realistisch planen können."
        },
        {
          "question": "Soll ich monatlich beitragen oder eine Einmalzahlung investieren?",
          "answer": "Mathematisch verdient eine sofort investierte Einmalzahlung mehr, weil sie für den gesamten Zeitraum Zinseszins erhält. Die meisten Menschen haben jedoch keine Einmalzahlung verfügbar. Dollar-Cost-Averaging (regelmäßige monatliche Beiträge) ist der praktische Ansatz zum Vermögensaufbau und glättet auch Marktvolatilität. Das Wichtigste ist Beständigkeit — automatisieren Sie Beiträge und versuchen Sie nicht, den Markt zu timen."
        },
        {
          "question": "Wie viel sollte ich investieren, um ein bestimmtes Ziel zu erreichen?",
          "answer": "Verwenden Sie diesen Rechner umgekehrt: geben Sie Ihren Zielbetrag als Zukunftswert ein und passen Sie die Anfangsinvestition und monatlichen Beiträge an, bis Sie es erreichen. Zum Beispiel, um 1 Million€ in 30 Jahren bei 8% jährlicher Rendite zu haben, bräuchten Sie entweder ~99.400€ heute ohne Beiträge, oder ~670€/Monat ab 0€. Mit 10.000€ anfangen + 500€/Monat bringt Sie auch dorthin."
        },
        {
          "question": "Was sind 'Zinsen auf Zinsen' und warum sind sie wichtig?",
          "answer": "Zinsen auf Zinsen sind der Teil Ihrer Erträge, der durch zuvor verdiente Zinsen generiert wurde — nicht durch Ihre ursprünglichen Einzahlungen. Es ist der Kernmechanismus des Zinseszinses. Über lange Zeiträume wird es die Mehrheit Ihrer Renditen: bei einer 30-jährigen Investition mit 8% sind etwa 75% Ihres Endguthabens Zinsen auf Zinsen. Deshalb ist Zeit der mächtigste Faktor beim Vermögensaufbau."
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

  // ═══════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "initialInvestment",
      type: "number",
      defaultValue: null,
      placeholder: "10000",
      showSlider: false,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "interestRate",
      type: "slider",
      defaultValue: 7,
      min: 0,
      max: 30,
      step: 0.01,
      suffix: "%",
    },
    {
      id: "investmentPeriod",
      type: "stepper",
      defaultValue: 10,
      min: 1,
      max: 50,
      step: 1,
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

    // ── Monthly Contributions (toggle) ─────────────────────
    {
      id: "includeContributions",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "monthlyContribution",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      showSlider: false,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeContributions", value: true },
    },

    // ── Inflation Adjustment (toggle) ──────────────────────
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
      max: 15,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeInflation", value: true },
    },

    // ── Tax on Interest (toggle) ───────────────────────────
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
      max: 50,
      step: 1,
      suffix: "%",
      showWhen: { field: "includeTax", value: true },
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════
  results: [
    { id: "futureValue", type: "primary", format: "currency" },
    { id: "totalInterestEarned", type: "secondary", format: "currency" },
    { id: "totalContributions", type: "secondary", format: "currency" },
    { id: "interestOnInterest", type: "secondary", format: "text" },
    { id: "effectiveRate", type: "secondary", format: "text" },
    { id: "doublingTime", type: "secondary", format: "text" },
    { id: "dailyEarnings", type: "secondary", format: "text" },
    { id: "simpleVsCompoundDiff", type: "secondary", format: "text" },
    { id: "inflationAdjustedValue", type: "secondary", format: "text" },
    { id: "afterTaxValue", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // DETAILED TABLE — Year-by-year growth schedule
  // ═══════════════════════════════════════════════════════════════
  detailedTable: {
    id: "yearlyBreakdown",
    buttonLabel: "detailedTable.yearlyBreakdown.button",
    modalTitle: "detailedTable.yearlyBreakdown.title",
    columns: [
      { key: "year", label: "detailedTable.yearlyBreakdown.columns.year" },
      {
        key: "contributions",
        label: "detailedTable.yearlyBreakdown.columns.contributions",
      },
      {
        key: "interest",
        label: "detailedTable.yearlyBreakdown.columns.interest",
      },
      {
        key: "balance",
        label: "detailedTable.yearlyBreakdown.columns.balance",
        highlight: true,
      },
      {
        key: "inflationAdjusted",
        label: "detailedTable.yearlyBreakdown.columns.inflationAdjusted",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    { id: "growthBreakdown", type: "list", icon: "📊", itemCount: 4 },
    { id: "timeInsights", type: "list", icon: "⏱️", itemCount: 4 },
    { id: "compoundingTips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ═══════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════
  referenceData: [],

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "compoundingStrategies", type: "list", icon: "✅", itemCount: 6 },
    { id: "commonMistakes", type: "list", icon: "⚠️", itemCount: 5 },
    {
      id: "examples",
      type: "code-example",
      icon: "🧮",
      columns: 2,
      exampleCount: 2,
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════
  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Investopedia",
      year: "2025",
      title: "Compound Interest: Definition, Formula, and Calculation",
      source: "Investopedia Financial Education",
      url: "https://www.investopedia.com/terms/c/compoundinterest.asp",
    },
    {
      authors: "U.S. Securities and Exchange Commission",
      year: "2025",
      title: "Compound Interest Calculator",
      source: "Investor.gov Financial Tools",
      url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
    },
    {
      authors: "Board of Governors of the Federal Reserve System",
      year: "2025",
      title: "Truth in Savings (Regulation DD)",
      source: "Federal Reserve Consumer Compliance Handbook",
      url: "https://www.federalreserve.gov/boarddocs/supmanual/cch/tis.pdf",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MISC CONFIG
  // ═══════════════════════════════════════════════════════════════
  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 12400 },
  },
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: false,
    category: "finance",
  },
  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },
  relatedCalculators: [
    "savings-calculator",
    "investment-calculator",
    "retirement-calculator",
    "simple-interest-calculator",
  ],
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

/* ═══════════════════════════════════════════════════════════════════
   CALCULATE FUNCTION
   Core formula: A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) − 1) / (r/n)]
   Unique features:
   • Separates "interest from principal" vs "interest on interest"
   • Calculates simple interest for comparison
   • Rule of 72 doubling time
   • Effective Annual Rate (APY)
   • Daily earnings at current balance
   • Inflation-adjusted value
   • After-tax value
   ═══════════════════════════════════════════════════════════════════ */

// Compounding periods per year
const COMPOUND_N: Record<string, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  semiannually: 2,
  annually: 1,
};

// Currency symbols for formatting
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
  JPY: "¥", INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF ",
  COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  CNY: "¥", KRW: "₩", SEK: "kr ", NOK: "kr ", DKK: "kr ",
  PLN: "zł", CZK: "Kč ", HUF: "Ft ", TRY: "₺", ZAR: "R",
  SGD: "S$", HKD: "HK$", NZD: "NZ$", THB: "฿", TWD: "NT$",
  ILS: "₪", PHP: "₱", MYR: "RM ",
};

function formatCurrency(amount: number, sym: string): string {
  if (Math.abs(amount) >= 1_000_000) {
    return `${sym}${(amount / 1_000_000).toFixed(2)}M`;
  }
  return `${sym}${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function formatCurrencyDecimals(amount: number, sym: string): string {
  return `${sym}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function calculateCompoundInterest(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  // ── Translations ──────────────────────────────────────────
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Currency symbol ───────────────────────────────────────
  const curr = fieldUnits?.initialInvestment || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ── Read inputs ───────────────────────────────────────────
  const principal = (values.initialInvestment as number) || 0;
  const annualRate = (values.interestRate as number) || 0;
  const years = (values.investmentPeriod as number) || 1;
  const compFreq = (values.compoundingFrequency as string) || "monthly";
  const includeContrib = values.includeContributions === true;
  const monthlyPMT = includeContrib ? ((values.monthlyContribution as number) || 0) : 0;
  const includeInflation = values.includeInflation === true;
  const inflationRate = includeInflation ? ((values.inflationRate as number) || 3) : 0;
  const includeTax = values.includeTax === true;
  const taxRate = includeTax ? ((values.taxRate as number) || 25) : 0;

  // ── Validation ────────────────────────────────────────────
  if (principal <= 0 && monthlyPMT <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Core calculations ─────────────────────────────────────
  const r = annualRate / 100;
  const n = COMPOUND_N[compFreq] || 12;
  const totalPeriods = n * years;
  const ratePerPeriod = r / n;

  // Future value of principal: P × (1 + r/n)^(nt)
  const fvPrincipal = principal * Math.pow(1 + ratePerPeriod, totalPeriods);

  // Future value of contributions (annuity)
  // Convert monthly contribution to per-period contribution
  let fvContributions = 0;
  let totalContributed = principal;

  if (monthlyPMT > 0 && ratePerPeriod > 0) {
    // Convert monthly to per-period amount
    const periodsPerMonth = n / 12;
    const pmtPerPeriod = monthlyPMT / periodsPerMonth;

    fvContributions =
      pmtPerPeriod *
      ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);

    totalContributed = principal + monthlyPMT * 12 * years;
  } else if (monthlyPMT > 0 && ratePerPeriod === 0) {
    fvContributions = monthlyPMT * 12 * years;
    totalContributed = principal + monthlyPMT * 12 * years;
  }

  const futureValue = fvPrincipal + fvContributions;
  const totalInterest = futureValue - totalContributed;

  // ── Simple interest for comparison ────────────────────────
  const simpleInterest = principal * r * years;
  // For simple interest on contributions: each monthly deposit earns simple interest
  // for remaining months
  let simpleContribInterest = 0;
  if (monthlyPMT > 0) {
    const totalMonths = years * 12;
    for (let m = 1; m <= totalMonths; m++) {
      const remainingYears = (totalMonths - m) / 12;
      simpleContribInterest += monthlyPMT * r * remainingYears;
    }
  }
  const simpleTotalWithContrib = principal + simpleInterest + (monthlyPMT * 12 * years) + simpleContribInterest;
  const compoundAdvantage = futureValue - simpleTotalWithContrib;

  // ── Interest on Interest ──────────────────────────────────
  // Simple interest on the same amounts = interest ONLY from principal/contributions
  // Compound interest total − simple interest total = interest earned BY interest
  const totalSimpleInterest = simpleInterest + simpleContribInterest;
  const interestOnInterest = Math.max(0, totalInterest - totalSimpleInterest);
  const ioiPercent =
    totalInterest > 0
      ? Math.round((interestOnInterest / totalInterest) * 100)
      : 0;

  // ── Effective Annual Rate (APY) ───────────────────────────
  const effectiveRate = (Math.pow(1 + ratePerPeriod, n) - 1) * 100;

  // ── Rule of 72 Doubling Time ──────────────────────────────
  const doublingYears = annualRate > 0 ? 72 / annualRate : Infinity;

  // ── Daily Earnings (at current principal, day 1) ──────────
  const dailyRate = r / 365;
  const dailyEarnings = principal * dailyRate;

  // ── Inflation-adjusted value ──────────────────────────────
  const inflationFactor =
    inflationRate > 0
      ? Math.pow(1 + inflationRate / 100, years)
      : 1;
  const inflationAdjusted = futureValue / inflationFactor;

  // ── After-tax value ───────────────────────────────────────
  const taxOnInterest = totalInterest * (taxRate / 100);
  const afterTaxValue = futureValue - taxOnInterest;

  // ── Translated units ──────────────────────────────────────
  const ofTotalInterest = v["of total interest"] || "of total interest";
  const vsSimple = v["vs simple interest"] || "vs simple interest";
  const realPower = v["real purchasing power"] || "real purchasing power";
  const afterTaxLabel = v["after tax"] || "after tax";
  const perDay = v["/day"] || "/day";

  // ── Format results ────────────────────────────────────────
  const fmtFutureValue = formatCurrency(Math.round(futureValue), sym);
  const fmtTotalInterest = formatCurrency(Math.round(totalInterest), sym);
  const fmtTotalContrib = formatCurrency(Math.round(totalContributed), sym);
  const fmtIoI = `${formatCurrency(Math.round(interestOnInterest), sym)} (${ioiPercent}% ${ofTotalInterest})`;
  const fmtEffective = `${effectiveRate.toFixed(2)}% APY`;
  const fmtDoubling =
    annualRate > 0
      ? `~${doublingYears.toFixed(1)} ${v["years"] || "years"}`
      : "N/A";
  const fmtDaily = `${formatCurrencyDecimals(dailyEarnings, sym)}${perDay}`;
  const fmtCompoundAdv = `+${formatCurrency(Math.round(compoundAdvantage), sym)} ${vsSimple}`;
  const fmtInflation = includeInflation
    ? `${formatCurrency(Math.round(inflationAdjusted), sym)} ${realPower}`
    : "—";
  const fmtAfterTax = includeTax
    ? `${formatCurrency(Math.round(afterTaxValue), sym)} ${afterTaxLabel}`
    : "—";

  // ── Summary ───────────────────────────────────────────────
  const summaryTemplate =
    f.summary ||
    "Invest {initial} at {rate}% for {period} years → {futureValue}. Total interest: {totalInterest} ({interestOnInterest} from compounding alone). Your money doubles in ~{doublingTime}. Daily earnings: {dailyEarnings}.";

  const summary = summaryTemplate
    .replace("{initial}", formatCurrency(Math.round(principal), sym))
    .replace("{rate}", annualRate.toString())
    .replace("{period}", years.toString())
    .replace("{futureValue}", fmtFutureValue)
    .replace("{totalInterest}", fmtTotalInterest)
    .replace("{interestOnInterest}", formatCurrency(Math.round(interestOnInterest), sym))
    .replace("{doublingTime}", doublingYears > 0 && doublingYears < Infinity ? `${doublingYears.toFixed(1)} ${v["years"] || "years"}` : "N/A")
    .replace("{dailyEarnings}", fmtDaily);

  // ═════════════════════════════════════════════════════════════
  // CHART DATA — 3-layer stacked area (year-by-year)
  // Layer 1: Contributions (deposits)
  // Layer 2: Interest from principal (simple interest equivalent)
  // Layer 3: Interest on interest (the compounding magic)
  // ═════════════════════════════════════════════════════════════
  const chartData: Array<Record<string, unknown>> = [];

  // Year 0 — starting point
  chartData.push({
    year: `Y0`,
    contributions: Math.round(principal),
    principalInterest: 0,
    interestOnInterest: 0,
  });

  // Determine chart step for readability
  let chartStep: number;
  if (years <= 20) chartStep = 1;
  else if (years <= 35) chartStep = 2;
  else chartStep = 5;

  for (let y = chartStep; y <= years; y += chartStep) {
    const yPeriods = n * y;

    // Compound future value at year y
    const yFvPrincipal = principal * Math.pow(1 + ratePerPeriod, yPeriods);
    let yFvContrib = 0;
    if (monthlyPMT > 0 && ratePerPeriod > 0) {
      const periodsPerMonth = n / 12;
      const pmtPerPeriod = monthlyPMT / periodsPerMonth;
      yFvContrib =
        pmtPerPeriod *
        ((Math.pow(1 + ratePerPeriod, yPeriods) - 1) / ratePerPeriod);
    } else if (monthlyPMT > 0) {
      yFvContrib = monthlyPMT * 12 * y;
    }

    const yTotalValue = yFvPrincipal + yFvContrib;
    const yTotalContrib = principal + monthlyPMT * 12 * y;
    const yTotalInterest = yTotalValue - yTotalContrib;

    // Simple interest at year y (for breakdown)
    const ySimpleFromPrincipal = principal * r * y;
    let ySimpleFromContrib = 0;
    if (monthlyPMT > 0) {
      const totalMonths = y * 12;
      for (let m = 1; m <= totalMonths; m++) {
        const remainingYears = (totalMonths - m) / 12;
        ySimpleFromContrib += monthlyPMT * r * remainingYears;
      }
    }
    const ySimpleInterest = ySimpleFromPrincipal + ySimpleFromContrib;
    const yIoI = Math.max(0, yTotalInterest - ySimpleInterest);

    chartData.push({
      year: `Y${y}`,
      contributions: Math.round(yTotalContrib),
      principalInterest: Math.round(ySimpleInterest),
      interestOnInterest: Math.round(yIoI),
    });
  }

  // Ensure final year is always included
  const lastChartYear = chartData[chartData.length - 1];
  if (lastChartYear.year !== `Y${years}`) {
    chartData.push({
      year: `Y${years}`,
      contributions: Math.round(totalContributed),
      principalInterest: Math.round(totalSimpleInterest),
      interestOnInterest: Math.round(interestOnInterest),
    });
  }

  // ═════════════════════════════════════════════════════════════
  // DETAILED TABLE — Year-by-year schedule
  // ═════════════════════════════════════════════════════════════
  const tableData: Record<string, string>[] = [];
  let prevBalance = principal;

  for (let y = 1; y <= years; y++) {
    const yPeriods = n * y;

    // Compound future value at year y
    const yFvPrincipal = principal * Math.pow(1 + ratePerPeriod, yPeriods);
    let yFvContrib = 0;
    if (monthlyPMT > 0 && ratePerPeriod > 0) {
      const periodsPerMonth = n / 12;
      const pmtPerPeriod = monthlyPMT / periodsPerMonth;
      yFvContrib =
        pmtPerPeriod *
        ((Math.pow(1 + ratePerPeriod, yPeriods) - 1) / ratePerPeriod);
    } else if (monthlyPMT > 0) {
      yFvContrib = monthlyPMT * 12 * y;
    }

    const yBalance = yFvPrincipal + yFvContrib;
    const yTotalContrib = principal + monthlyPMT * 12 * y;
    const yInterestThisYear = yBalance - prevBalance - (monthlyPMT * 12);
    const yInflAdj = includeInflation
      ? yBalance / Math.pow(1 + inflationRate / 100, y)
      : yBalance;

    tableData.push({
      year: `${v["Year"] || "Year"} ${y}`,
      contributions: formatCurrency(Math.round(yTotalContrib), sym),
      interest: formatCurrency(Math.round(Math.max(0, yInterestThisYear)), sym),
      balance: formatCurrency(Math.round(yBalance), sym),
      inflationAdjusted: includeInflation
        ? formatCurrency(Math.round(yInflAdj), sym)
        : "—",
    });

    prevBalance = yBalance;
  }

  // ═════════════════════════════════════════════════════════════
  // RETURN
  // ═════════════════════════════════════════════════════════════
  return {
    values: {
      futureValue: Math.round(futureValue),
      totalInterestEarned: Math.round(totalInterest),
      totalContributions: Math.round(totalContributed),
      interestOnInterest: Math.round(interestOnInterest),
      effectiveRate: parseFloat(effectiveRate.toFixed(2)),
      doublingTime: parseFloat(doublingYears.toFixed(1)),
      dailyEarnings: parseFloat(dailyEarnings.toFixed(2)),
      simpleVsCompoundDiff: Math.round(compoundAdvantage),
      inflationAdjustedValue: includeInflation ? Math.round(inflationAdjusted) : null,
      afterTaxValue: includeTax ? Math.round(afterTaxValue) : null,
    },
    formatted: {
      futureValue: fmtFutureValue,
      totalInterestEarned: fmtTotalInterest,
      totalContributions: fmtTotalContrib,
      interestOnInterest: fmtIoI,
      effectiveRate: fmtEffective,
      doublingTime: fmtDoubling,
      dailyEarnings: fmtDaily,
      simpleVsCompoundDiff: fmtCompoundAdv,
      inflationAdjustedValue: fmtInflation,
      afterTaxValue: fmtAfterTax,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default compoundInterestConfig;
