import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─── HELPER: Format number with commas ───
function fmtNum(val: number, decimals = 2): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.01) return val.toFixed(decimals);
  return val.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ─── HELPER: Currency symbols ───
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", CAD: "C$", AUD: "A$",
  MXN: "MX$", BRL: "R$", JPY: "¥", INR: "₹", CHF: "CHF ",
  COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  CNY: "¥", KRW: "₩", SEK: "kr ", NOK: "kr ", DKK: "kr ",
  PLN: "zł ", CZK: "Kč ", HUF: "Ft ", TRY: "₺",
  ZAR: "R", NZD: "NZ$", SGD: "S$", HKD: "HK$",
  THB: "฿", MYR: "RM ", PHP: "₱", IDR: "Rp ",
  VND: "₫", EGP: "E£", NGN: "₦",
};

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════

export const savingsGoalCalculatorConfig: CalculatorConfigV4 = {
  id: "savings-goal",
  version: "4.0",
  category: "finance",
  icon: "🎯",

  // ─── PRESETS ───
  presets: [
    {
      id: "emergencyFund",
      icon: "🏦",
      values: {
        savingsGoal: 15000,
        startingBalance: 0,
        timeToGoal: 3,
        annualRate: 4.5,
        compoundFrequency: "monthly",
        includeInflation: false,
        inflationRate: null,
      },
    },
    {
      id: "downPayment",
      icon: "🏠",
      values: {
        savingsGoal: 60000,
        startingBalance: 5000,
        timeToGoal: 5,
        annualRate: 4.5,
        compoundFrequency: "monthly",
        includeInflation: true,
        inflationRate: 3,
      },
    },
    {
      id: "vacation",
      icon: "✈️",
      values: {
        savingsGoal: 5000,
        startingBalance: 0,
        timeToGoal: 1,
        annualRate: 4.5,
        compoundFrequency: "monthly",
        includeInflation: false,
        inflationRate: null,
      },
    },
    {
      id: "collegeFund",
      icon: "🎓",
      values: {
        savingsGoal: 50000,
        startingBalance: 2000,
        timeToGoal: 10,
        annualRate: 5,
        compoundFrequency: "monthly",
        includeInflation: true,
        inflationRate: 3,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates) ───
  t: {
    en: {
      name: "Savings Goal Calculator",
      slug: "savings-goal",
      subtitle:
        "Find out how much you need to save each month, week, or day to reach your financial goal — with interest and inflation included.",
      seo: {
        title: "Savings Goal Calculator - Monthly Savings Plan Estimator",
        description:
          "Calculate how much to save monthly, weekly, or daily to reach your goal. Factor in compound interest and inflation. Free savings planner with year-by-year breakdown.",
        shortDescription: "Plan your savings with compound interest and inflation adjustment.",
        keywords: [
          "savings goal calculator",
          "savings calculator",
          "how much to save per month",
          "savings plan calculator",
          "compound interest savings",
          "emergency fund calculator",
          "savings goal planner",
          "free savings calculator",
        ],
      },

      inputs: {
        savingsGoal: {
          label: "Savings Goal",
          helpText: "The total amount you want to save",
        },
        startingBalance: {
          label: "Starting Balance",
          helpText: "Amount you already have saved toward this goal",
        },
        timeToGoal: {
          label: "Time to Reach Goal",
          helpText: "How many years you have to reach your goal — shorter timelines require higher monthly savings",
        },
        annualRate: {
          label: "Annual Interest Rate (APY)",
          helpText: "Expected annual percentage yield — high-yield savings accounts offer 4–5% APY",
        },
        compoundFrequency: {
          label: "Compound Frequency",
          helpText: "How often interest is calculated and added to your balance",
        },
        includeInflation: {
          label: "Adjust for Inflation",
          helpText: "Toggle on to see the real purchasing power of your savings over time",
        },
        inflationRate: {
          label: "Expected Inflation Rate",
          helpText: "Average annual inflation — the U.S. historical average is about 3%",
        },
      },

      presets: {
        emergencyFund: {
          label: "Emergency Fund",
          description: "$15K in 3 years at 4.5% APY",
        },
        downPayment: {
          label: "Down Payment",
          description: "$60K in 5 years with inflation",
        },
        vacation: {
          label: "Vacation",
          description: "$5K in 1 year at 4.5% APY",
        },
        collegeFund: {
          label: "College Fund",
          description: "$50K in 10 years with inflation",
        },
      },

      values: {
        years: "years",
        year: "year",
        months: "months",
        month: "month",
        monthly: "/mo",
      },

      results: {
        monthlySavings: { label: "Monthly Savings Needed" },
        weeklySavings: { label: "Weekly Savings Needed" },
        dailySavings: { label: "Daily Savings Needed" },
        totalContributions: { label: "Total Contributions" },
        interestEarned: { label: "Interest Earned" },
        finalBalance: { label: "Final Balance" },
      },

      infoCards: {
        savingsPlan: {
          title: "Your Savings Plan",
          items: [
            { label: "Monthly Savings", valueKey: "monthlySavings" },
            { label: "Weekly Savings", valueKey: "weeklySavings" },
            { label: "Daily Savings", valueKey: "dailySavings" },
            { label: "Total Months", valueKey: "totalMonths" },
          ],
        },
        growth: {
          title: "Growth Breakdown",
          items: [
            { label: "Starting Balance", valueKey: "startingBalance" },
            { label: "Total Contributions", valueKey: "totalContributions" },
            { label: "Interest Earned", valueKey: "interestEarned" },
            { label: "Final Balance", valueKey: "finalBalance" },
          ],
        },
        tips: {
          title: "Savings Tips",
          items: [
            "Automate transfers on payday to stay consistent",
            "Use a high-yield savings account for 4–5% APY",
            "Review and increase contributions with each raise",
            "Inflation erodes value — consider inflation-adjusted goals",
          ],
        },
      },

      chart: {
        title: "Savings Growth Over Time",
        xLabel: "Year",
        yLabel: "Balance",
        series: {
          contributions: "Contributions",
          interest: "Interest",
        },
      },

      detailedTable: {
        savingsSchedule: {
          button: "View Year-by-Year Schedule",
          title: "Savings Growth Schedule",
          columns: {
            year: "Year",
            yearlyContribution: "Contributions",
            yearlyInterest: "Interest",
            totalContributions: "Total Saved",
            balance: "Balance",
          },
        },
      },

      options: {
        compoundFrequency: {
          daily: "Daily",
          monthly: "Monthly",
          quarterly: "Quarterly",
          semiannually: "Semi-Annually",
          annually: "Annually",
        },
      },

      formats: {
        summary:
          "Save {monthlySavings}/month for {timeToGoal} to reach {savingsGoal}. You'll earn {interestEarned} in interest.",
      },

      education: {
        howItWorks: {
          title: "How This Calculator Works",
          text: "This calculator determines how much you need to save on a monthly, weekly, or daily basis to reach a specific financial goal within your chosen timeframe. It accounts for compound interest — meaning you earn interest on both your contributions and on previously earned interest. If you enable inflation adjustment, the calculator increases your target to maintain the same purchasing power in future dollars.",
        },
        compoundInterest: {
          title: "The Power of Compound Interest",
          text: "Albert Einstein reportedly called compound interest the eighth wonder of the world. When your savings earn interest, that interest begins earning its own interest in subsequent periods. The more frequently interest compounds (daily vs. annually), the faster your money grows. Even a small difference in APY can translate to significant gains over long time horizons — which is why starting early matters so much.",
        },
        choosingAccount: {
          title: "Choosing the Right Savings Account",
          text: "High-yield savings accounts (HYSAs) currently offer 4–5% APY, compared to the 0.01–0.1% typical of traditional savings accounts. For goals under 5 years, a HYSA or CD ladder is generally appropriate. For longer-term goals like college funds, consider a 529 plan or index fund which historically return 7–10% annually but carry more risk. Always check that your account is FDIC-insured (up to $250,000).",
        },
        inflation: {
          title: "Why Inflation Matters",
          text: "Inflation reduces the purchasing power of money over time. If you're saving for a goal 5+ years away, the amount you need in future dollars is higher than today's price. For example, with 3% annual inflation, something that costs $50,000 today would cost about $57,964 in 5 years. Enabling the inflation toggle ensures your savings target accounts for this erosion, giving you a more realistic monthly savings requirement.",
        },
        strategies: {
          title: "Strategies to Reach Your Goal Faster",
          text: "The most effective strategy is automating your savings — set up automatic transfers on each payday so saving becomes effortless. Beyond that, consider the 50/30/20 rule: allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment. Windfall income (tax refunds, bonuses, cash gifts) can dramatically accelerate progress when deposited directly into your savings goal.",
        },
      },

      faqs: [
        {
          question: "What's the difference between APR and APY?",
          answer: "APR (Annual Percentage Rate) is the simple interest rate without compounding. APY (Annual Percentage Yield) includes the effect of compound interest, making it slightly higher than APR for the same nominal rate. When comparing savings accounts, always use APY — it reflects your true annual earnings. For example, a 4.5% APR compounded monthly equals approximately 4.59% APY.",
        },
        {
          question: "How often should interest compound for best results?",
          answer: "Daily compounding yields the most interest, followed by monthly, quarterly, semi-annually, and annually. However, the difference is relatively small — daily vs. monthly compounding on a $10,000 balance at 5% APY produces only about $2.50 more per year. The bigger factor is your APY rate itself and how consistently you contribute.",
        },
        {
          question: "Should I adjust my savings goal for inflation?",
          answer: "Yes, if your goal is 3+ years away. Inflation typically runs 2–3% annually, which means prices roughly double every 24–36 years. For short-term goals (under 2 years), inflation has minimal impact. For long-term goals like college funds or down payments, enabling the inflation adjustment gives you a more accurate target.",
        },
        {
          question: "What's a realistic savings rate?",
          answer: "Financial advisors commonly recommend saving 15–20% of gross income. However, the right amount depends on your goals and timeline. Start with whatever you can and increase by 1% every few months. Even saving $50/month adds up to $3,000+ over 5 years at 4.5% APY. The key is consistency — regular small contributions beat irregular large ones.",
        },
        {
          question: "How much should I have in an emergency fund?",
          answer: "Most financial advisors recommend 3–6 months of essential expenses (rent, food, insurance, utilities, minimum debt payments). If you're self-employed, have irregular income, or are the sole earner, aim for 6–12 months. A good starting target is $1,000 for immediate emergencies, then build toward the full amount over time.",
        },
        {
          question: "Is a savings account better than investing for my goal?",
          answer: "For goals under 3–5 years, a high-yield savings account or CD is safer because investments can lose value in the short term. For goals 5+ years away (like retirement or a child's college), investing in diversified index funds historically returns 7–10% annually — significantly outpacing savings account rates. The tradeoff is volatility: your balance can temporarily drop, so only invest money you won't need soon.",
        },
        {
          question: "Can I use this calculator for retirement savings?",
          answer: "This calculator works for any savings goal, including retirement. However, retirement planning involves additional factors like employer matching, tax-advantaged accounts (401k, IRA, Roth), Social Security, and withdrawal rates. For comprehensive retirement planning, use a dedicated retirement calculator that factors in these elements.",
        },
        {
          question: "What happens if I miss a monthly contribution?",
          answer: "Missing one or two months won't derail your plan significantly, but consistency matters. If you miss a month, try to make up the difference the following month or spread it across the remaining months. The calculator assumes equal monthly contributions — if you contribute less some months, you'll either need to save more later or extend your timeline.",
        },
      ],

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
    },
    es: {
      "name": "Calculadora de Meta de Ahorro",
      "slug": "calculadora-meta-ahorro",
      "subtitle": "Descubre cuánto necesitas ahorrar cada mes, semana o día para alcanzar tu meta financiera — con interés e inflación incluidos.",
      "seo": {
        "title": "Calculadora de Meta de Ahorro - Estimador de Plan de Ahorro Mensual",
        "description": "Calcula cuánto ahorrar mensual, semanal o diariamente para alcanzar tu meta. Incluye interés compuesto e inflación. Planificador de ahorro gratuito con desglose año por año.",
        "shortDescription": "Planifica tus ahorros con interés compuesto y ajuste por inflación.",
        "keywords": [
          "calculadora de meta de ahorro",
          "calculadora de ahorro",
          "cuánto ahorrar por mes",
          "calculadora de plan de ahorro",
          "ahorro con interés compuesto",
          "calculadora de fondo de emergencia",
          "planificador de meta de ahorro",
          "calculadora de ahorro gratuita"
        ]
      },
      "inputs": {
        "savingsGoal": {
          "label": "Meta de Ahorro",
          "helpText": "El monto total que quieres ahorrar"
        },
        "startingBalance": {
          "label": "Saldo Inicial",
          "helpText": "Cantidad que ya tienes ahorrada hacia esta meta"
        },
        "timeToGoal": {
          "label": "Tiempo para Alcanzar la Meta",
          "helpText": "Cuántos años tienes para alcanzar tu meta — plazos más cortos requieren ahorros mensuales más altos"
        },
        "annualRate": {
          "label": "Tasa de Interés Anual (TAE)",
          "helpText": "Rendimiento porcentual anual esperado — las cuentas de ahorro de alto rendimiento ofrecen 4–5% TAE"
        },
        "compoundFrequency": {
          "label": "Frecuencia de Capitalización",
          "helpText": "Con qué frecuencia se calcula el interés y se añade a tu saldo"
        },
        "includeInflation": {
          "label": "Ajustar por Inflación",
          "helpText": "Activa para ver el poder adquisitivo real de tus ahorros a lo largo del tiempo"
        },
        "inflationRate": {
          "label": "Tasa de Inflación Esperada",
          "helpText": "Inflación anual promedio — el promedio histórico de EE.UU. es aproximadamente 3%"
        }
      },
      "presets": {
        "emergencyFund": {
          "label": "Fondo de Emergencia",
          "description": "$15K en 3 años al 4.5% TAE"
        },
        "downPayment": {
          "label": "Enganche",
          "description": "$60K en 5 años con inflación"
        },
        "vacation": {
          "label": "Vacaciones",
          "description": "$5K en 1 año al 4.5% TAE"
        },
        "collegeFund": {
          "label": "Fondo Universitario",
          "description": "$50K en 10 años con inflación"
        }
      },
      "values": {
        "years": "años",
        "year": "año",
        "months": "meses",
        "month": "mes",
        "monthly": "/mes"
      },
      "results": {
        "monthlySavings": {
          "label": "Ahorro Mensual Necesario"
        },
        "weeklySavings": {
          "label": "Ahorro Semanal Necesario"
        },
        "dailySavings": {
          "label": "Ahorro Diario Necesario"
        },
        "totalContributions": {
          "label": "Contribuciones Totales"
        },
        "interestEarned": {
          "label": "Interés Ganado"
        },
        "finalBalance": {
          "label": "Saldo Final"
        }
      },
      "infoCards": {
        "savingsPlan": {
          "title": "Tu Plan de Ahorro",
          "items": [
            {
              "label": "Ahorro Mensual",
              "valueKey": "monthlySavings"
            },
            {
              "label": "Ahorro Semanal",
              "valueKey": "weeklySavings"
            },
            {
              "label": "Ahorro Diario",
              "valueKey": "dailySavings"
            },
            {
              "label": "Total de Meses",
              "valueKey": "totalMonths"
            }
          ]
        },
        "growth": {
          "title": "Desglose de Crecimiento",
          "items": [
            {
              "label": "Saldo Inicial",
              "valueKey": "startingBalance"
            },
            {
              "label": "Contribuciones Totales",
              "valueKey": "totalContributions"
            },
            {
              "label": "Interés Ganado",
              "valueKey": "interestEarned"
            },
            {
              "label": "Saldo Final",
              "valueKey": "finalBalance"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Ahorro",
          "items": [
            "Automatiza las transferencias el día de pago para mantenerte consistente",
            "Usa una cuenta de ahorro de alto rendimiento para 4–5% TAE",
            "Revisa y aumenta las contribuciones con cada aumento salarial",
            "La inflación erosiona el valor — considera metas ajustadas por inflación"
          ]
        }
      },
      "chart": {
        "title": "Crecimiento de Ahorros a lo Largo del Tiempo",
        "xLabel": "Año",
        "yLabel": "Saldo",
        "series": {
          "contributions": "Contribuciones",
          "interest": "Interés"
        }
      },
      "detailedTable": {
        "savingsSchedule": {
          "button": "Ver Cronograma Año por Año",
          "title": "Cronograma de Crecimiento de Ahorros",
          "columns": {
            "year": "Año",
            "yearlyContribution": "Contribuciones",
            "yearlyInterest": "Interés",
            "totalContributions": "Total Ahorrado",
            "balance": "Saldo"
          }
        }
      },
      "options": {
        "compoundFrequency": {
          "daily": "Diario",
          "monthly": "Mensual",
          "quarterly": "Trimestral",
          "semiannually": "Semestral",
          "annually": "Anual"
        }
      },
      "formats": {
        "summary": "Ahorra {monthlySavings}/mes durante {timeToGoal} para alcanzar {savingsGoal}. Ganarás {interestEarned} en intereses."
      },
      "education": {
        "howItWorks": {
          "title": "Cómo Funciona Esta Calculadora",
          "text": "Esta calculadora determina cuánto necesitas ahorrar mensual, semanal o diariamente para alcanzar una meta financiera específica dentro del plazo elegido. Considera el interés compuesto — significa que ganas interés tanto en tus contribuciones como en los intereses previamente ganados. Si habilitas el ajuste por inflación, la calculadora aumenta tu objetivo para mantener el mismo poder adquisitivo en dólares futuros."
        },
        "compoundInterest": {
          "title": "El Poder del Interés Compuesto",
          "text": "Albert Einstein supuestamente llamó al interés compuesto la octava maravilla del mundo. Cuando tus ahorros ganan interés, ese interés comienza a ganar su propio interés en períodos subsecuentes. Cuanto más frecuentemente se capitaliza el interés (diario vs. anual), más rápido crece tu dinero. Incluso una pequeña diferencia en TAE puede traducirse en ganancias significativas en horizontes de tiempo largos — por eso importa tanto empezar temprano."
        },
        "choosingAccount": {
          "title": "Elegir la Cuenta de Ahorro Correcta",
          "text": "Las cuentas de ahorro de alto rendimiento actualmente ofrecen 4–5% TAE, comparado con el 0.01–0.1% típico de las cuentas de ahorro tradicionales. Para metas menores a 5 años, una cuenta de alto rendimiento o escalera de CDs es generalmente apropiada. Para metas a más largo plazo como fondos universitarios, considera un plan 529 o fondo indexado que históricamente rinden 7–10% anualmente pero conllevan más riesgo. Siempre verifica que tu cuenta esté asegurada por FDIC (hasta $250,000)."
        },
        "inflation": {
          "title": "Por Qué Importa la Inflación",
          "text": "La inflación reduce el poder adquisitivo del dinero a lo largo del tiempo. Si estás ahorrando para una meta 5+ años en el futuro, el monto que necesitas en dólares futuros es mayor que el precio de hoy. Por ejemplo, con 3% de inflación anual, algo que cuesta $50,000 hoy costaría aproximadamente $57,964 en 5 años. Habilitar la opción de inflación asegura que tu objetivo de ahorro considere esta erosión, dándote un requisito de ahorro mensual más realista."
        },
        "strategies": {
          "title": "Estrategias para Alcanzar tu Meta Más Rápido",
          "text": "La estrategia más efectiva es automatizar tus ahorros — configura transferencias automáticas en cada día de pago para que ahorrar se vuelva sin esfuerzo. Además, considera la regla 50/30/20: asigna 50% de los ingresos a necesidades, 30% a deseos, y 20% a ahorros y pago de deudas. Los ingresos extraordinarios (reembolsos de impuestos, bonos, regalos en efectivo) pueden acelerar dramáticamente el progreso cuando se depositan directamente en tu meta de ahorro."
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es la diferencia entre APR y TAE?",
          "answer": "APR (Tasa Porcentual Anual) es la tasa de interés simple sin capitalización. TAE (Tasa Anual Efectiva) incluye el efecto del interés compuesto, haciéndola ligeramente mayor que APR para la misma tasa nominal. Al comparar cuentas de ahorro, siempre usa TAE — refleja tus ganancias anuales reales. Por ejemplo, un APR de 4.5% capitalizado mensualmente equivale aproximadamente a 4.59% TAE."
        },
        {
          "question": "¿Con qué frecuencia debe capitalizarse el interés para mejores resultados?",
          "answer": "La capitalización diaria produce el mayor interés, seguida por mensual, trimestral, semestral y anual. Sin embargo, la diferencia es relativamente pequeña — capitalización diaria vs. mensual en un saldo de $10,000 al 5% TAE produce solo unos $2.50 más por año. El factor más importante es tu tasa TAE en sí y qué tan consistentemente contribuyes."
        },
        {
          "question": "¿Debo ajustar mi meta de ahorro por inflación?",
          "answer": "Sí, si tu meta está a 3+ años de distancia. La inflación típicamente corre 2–3% anualmente, lo que significa que los precios aproximadamente se duplican cada 24–36 años. Para metas a corto plazo (menos de 2 años), la inflación tiene impacto mínimo. Para metas a largo plazo como fondos universitarios o enganches, habilitar el ajuste por inflación te da un objetivo más preciso."
        },
        {
          "question": "¿Cuál es una tasa de ahorro realista?",
          "answer": "Los asesores financieros comúnmente recomiendan ahorrar 15–20% del ingreso bruto. Sin embargo, la cantidad correcta depende de tus metas y cronograma. Empieza con lo que puedas y aumenta 1% cada pocos meses. Incluso ahorrar $50/mes suma a $3,000+ en 5 años al 4.5% TAE. La clave es la consistencia — contribuciones pequeñas regulares superan a las grandes irregulares."
        },
        {
          "question": "¿Cuánto debo tener en un fondo de emergencia?",
          "answer": "La mayoría de los asesores financieros recomiendan 3–6 meses de gastos esenciales (renta, comida, seguro, servicios, pagos mínimos de deuda). Si trabajas por cuenta propia, tienes ingresos irregulares, o eres el único proveedor, apunta a 6–12 meses. Una buena meta inicial es $1,000 para emergencias inmediatas, luego construir hacia la cantidad completa a lo largo del tiempo."
        },
        {
          "question": "¿Es mejor una cuenta de ahorro que invertir para mi meta?",
          "answer": "Para metas menores a 3–5 años, una cuenta de ahorro de alto rendimiento o CD es más segura porque las inversiones pueden perder valor a corto plazo. Para metas 5+ años en el futuro (como retiro o universidad de un hijo), invertir en fondos indexados diversificados históricamente retorna 7–10% anualmente — superando significativamente las tasas de cuentas de ahorro. El intercambio es volatilidad: tu saldo puede caer temporalmente, así que solo invierte dinero que no necesitarás pronto."
        },
        {
          "question": "¿Puedo usar esta calculadora para ahorros de retiro?",
          "answer": "Esta calculadora funciona para cualquier meta de ahorro, incluyendo el retiro. Sin embargo, la planificación de retiro involucra factores adicionales como coincidencia del empleador, cuentas con ventajas fiscales (401k, IRA, Roth), Seguro Social, y tasas de retiro. Para planificación integral de retiro, usa una calculadora dedicada de retiro que considere estos elementos."
        },
        {
          "question": "¿Qué pasa si me pierdo una contribución mensual?",
          "answer": "Perderte uno o dos meses no descarrilará tu plan significativamente, pero la consistencia importa. Si te pierdes un mes, trata de compensar la diferencia el mes siguiente o distribuirla entre los meses restantes. La calculadora asume contribuciones mensuales iguales — si contribuyes menos algunos meses, necesitarás ahorrar más después o extender tu cronograma."
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
      "name": "Calculadora de Meta de Poupança",
      "slug": "calculadora-meta-poupanca",
      "subtitle": "Descubra quanto você precisa poupar por mês, semana ou dia para atingir seu objetivo financeiro — com juros e inflação incluídos.",
      "seo": {
        "title": "Calculadora de Meta de Poupança - Estimador de Plano de Poupança Mensal",
        "description": "Calcule quanto poupar mensalmente, semanalmente ou diariamente para atingir sua meta. Considere juros compostos e inflação. Planejador de poupança gratuito com detalhamento ano a ano.",
        "shortDescription": "Planeje sua poupança com juros compostos e ajuste de inflação.",
        "keywords": [
          "calculadora de meta de poupança",
          "calculadora de poupança",
          "quanto poupar por mês",
          "calculadora de plano de poupança",
          "poupança com juros compostos",
          "calculadora de fundo de emergência",
          "planejador de meta de poupança",
          "calculadora de poupança gratuita"
        ]
      },
      "inputs": {
        "savingsGoal": {
          "label": "Meta de Poupança",
          "helpText": "O valor total que você deseja poupar"
        },
        "startingBalance": {
          "label": "Saldo Inicial",
          "helpText": "Quantia que você já tem poupada para esta meta"
        },
        "timeToGoal": {
          "label": "Tempo para Atingir a Meta",
          "helpText": "Quantos anos você tem para atingir sua meta — prazos mais curtos exigem poupanças mensais maiores"
        },
        "annualRate": {
          "label": "Taxa de Juros Anual (APY)",
          "helpText": "Rendimento percentual anual esperado — contas poupança de alto rendimento oferecem 4–5% APY"
        },
        "compoundFrequency": {
          "label": "Frequência de Capitalização",
          "helpText": "Com que frequência os juros são calculados e adicionados ao seu saldo"
        },
        "includeInflation": {
          "label": "Ajustar para Inflação",
          "helpText": "Ative para ver o poder de compra real de sua poupança ao longo do tempo"
        },
        "inflationRate": {
          "label": "Taxa de Inflação Esperada",
          "helpText": "Inflação anual média — a média histórica dos EUA é cerca de 3%"
        }
      },
      "presets": {
        "emergencyFund": {
          "label": "Fundo de Emergência",
          "description": "R$ 75K em 3 anos a 4,5% APY"
        },
        "downPayment": {
          "label": "Entrada de Imóvel",
          "description": "R$ 300K em 5 anos com inflação"
        },
        "vacation": {
          "label": "Viagem",
          "description": "R$ 25K em 1 ano a 4,5% APY"
        },
        "collegeFund": {
          "label": "Fundo Universitário",
          "description": "R$ 250K em 10 anos com inflação"
        }
      },
      "values": {
        "years": "anos",
        "year": "ano",
        "months": "meses",
        "month": "mês",
        "monthly": "/mês"
      },
      "results": {
        "monthlySavings": {
          "label": "Poupança Mensal Necessária"
        },
        "weeklySavings": {
          "label": "Poupança Semanal Necessária"
        },
        "dailySavings": {
          "label": "Poupança Diária Necessária"
        },
        "totalContributions": {
          "label": "Contribuições Totais"
        },
        "interestEarned": {
          "label": "Juros Ganhos"
        },
        "finalBalance": {
          "label": "Saldo Final"
        }
      },
      "infoCards": {
        "savingsPlan": {
          "title": "Seu Plano de Poupança",
          "items": [
            {
              "label": "Poupança Mensal",
              "valueKey": "monthlySavings"
            },
            {
              "label": "Poupança Semanal",
              "valueKey": "weeklySavings"
            },
            {
              "label": "Poupança Diária",
              "valueKey": "dailySavings"
            },
            {
              "label": "Total de Meses",
              "valueKey": "totalMonths"
            }
          ]
        },
        "growth": {
          "title": "Detalhamento do Crescimento",
          "items": [
            {
              "label": "Saldo Inicial",
              "valueKey": "startingBalance"
            },
            {
              "label": "Contribuições Totais",
              "valueKey": "totalContributions"
            },
            {
              "label": "Juros Ganhos",
              "valueKey": "interestEarned"
            },
            {
              "label": "Saldo Final",
              "valueKey": "finalBalance"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Poupança",
          "items": [
            "Automatize transferências no dia do pagamento para manter consistência",
            "Use uma conta poupança de alto rendimento para 4–5% APY",
            "Revise e aumente contribuições a cada aumento salarial",
            "A inflação corrói o valor — considere metas ajustadas pela inflação"
          ]
        }
      },
      "chart": {
        "title": "Crescimento da Poupança ao Longo do Tempo",
        "xLabel": "Ano",
        "yLabel": "Saldo",
        "series": {
          "contributions": "Contribuições",
          "interest": "Juros"
        }
      },
      "detailedTable": {
        "savingsSchedule": {
          "button": "Ver Cronograma Ano a Ano",
          "title": "Cronograma de Crescimento da Poupança",
          "columns": {
            "year": "Ano",
            "yearlyContribution": "Contribuições",
            "yearlyInterest": "Juros",
            "totalContributions": "Total Poupado",
            "balance": "Saldo"
          }
        }
      },
      "options": {
        "compoundFrequency": {
          "daily": "Diário",
          "monthly": "Mensal",
          "quarterly": "Trimestral",
          "semiannually": "Semestral",
          "annually": "Anual"
        }
      },
      "formats": {
        "summary": "Poupe {monthlySavings}/mês por {timeToGoal} para atingir {savingsGoal}. Você ganhará {interestEarned} em juros."
      },
      "education": {
        "howItWorks": {
          "title": "Como Esta Calculadora Funciona",
          "text": "Esta calculadora determina quanto você precisa poupar mensalmente, semanalmente ou diariamente para atingir uma meta financeira específica dentro do prazo escolhido. Ela considera juros compostos — significando que você ganha juros tanto sobre suas contribuições quanto sobre juros anteriormente ganhos. Se você habilitar o ajuste de inflação, a calculadora aumenta sua meta para manter o mesmo poder de compra em valores futuros."
        },
        "compoundInterest": {
          "title": "O Poder dos Juros Compostos",
          "text": "Albert Einstein supostamente chamou os juros compostos de oitava maravilha do mundo. Quando sua poupança rende juros, esses juros começam a render seus próprios juros nos períodos subsequentes. Quanto mais frequentemente os juros se capitalizam (diário vs. anual), mais rápido seu dinheiro cresce. Mesmo uma pequena diferença no APY pode se traduzir em ganhos significativos em horizontes de tempo longos — por isso começar cedo importa tanto."
        },
        "choosingAccount": {
          "title": "Escolhendo a Conta Poupança Certa",
          "text": "Contas poupança de alto rendimento (HYSAs) atualmente oferecem 4–5% APY, comparado aos 0,01–0,1% típicos de contas poupança tradicionais. Para metas abaixo de 5 anos, uma HYSA ou escada de CDB geralmente é apropriada. Para metas de longo prazo como fundos universitários, considere um plano 529 ou fundo de índice que historicamente retornam 7–10% anualmente mas carregam mais risco. Sempre verifique se sua conta é garantida pelo FGC (até R$ 250.000)."
        },
        "inflation": {
          "title": "Por Que a Inflação Importa",
          "text": "A inflação reduz o poder de compra do dinheiro ao longo do tempo. Se você está poupando para uma meta 5+ anos no futuro, a quantia que você precisa em valores futuros é maior que o preço de hoje. Por exemplo, com 3% de inflação anual, algo que custa R$ 50.000 hoje custaria cerca de R$ 57.964 em 5 anos. Habilitar o ajuste de inflação garante que sua meta de poupança considere essa erosão, dando uma exigência de poupança mensal mais realista."
        },
        "strategies": {
          "title": "Estratégias para Atingir Sua Meta Mais Rápido",
          "text": "A estratégia mais eficaz é automatizar sua poupança — configure transferências automáticas a cada pagamento para que poupar se torne sem esforço. Além disso, considere a regra 50/30/20: aloque 50% da renda para necessidades, 30% para desejos, e 20% para poupança e pagamento de dívidas. Renda extra (restituição de imposto, bônus, presentes em dinheiro) pode acelerar dramaticamente o progresso quando depositada diretamente na sua meta de poupança."
        }
      },
      "faqs": [
        {
          "question": "Qual é a diferença entre APR e APY?",
          "answer": "APR (Taxa Percentual Anual) é a taxa de juros simples sem capitalização. APY (Rendimento Percentual Anual) inclui o efeito dos juros compostos, tornando-a ligeiramente maior que APR para a mesma taxa nominal. Ao comparar contas poupança, sempre use APY — ela reflete seus verdadeiros ganhos anuais. Por exemplo, um APR de 4,5% capitalizado mensalmente equivale a aproximadamente 4,59% APY."
        },
        {
          "question": "Com que frequência os juros devem se capitalizar para melhores resultados?",
          "answer": "Capitalização diária rende mais juros, seguida por mensal, trimestral, semestral e anual. Contudo, a diferença é relativamente pequena — capitalização diária vs. mensal em um saldo de R$ 50.000 a 5% APY produz apenas cerca de R$ 12,50 a mais por ano. O fator maior é a própria taxa APY e quão consistentemente você contribui."
        },
        {
          "question": "Devo ajustar minha meta de poupança para inflação?",
          "answer": "Sim, se sua meta está 3+ anos no futuro. A inflação normalmente corre 2–3% anualmente, o que significa que os preços aproximadamente dobram a cada 24–36 anos. Para metas de curto prazo (menos de 2 anos), a inflação tem impacto mínimo. Para metas de longo prazo como fundos universitários ou entradas, habilitar o ajuste de inflação dá uma meta mais precisa."
        },
        {
          "question": "Qual é uma taxa de poupança realista?",
          "answer": "Consultores financeiros comumente recomendam poupar 15–20% da renda bruta. Contudo, a quantia certa depende de suas metas e cronograma. Comece com o que puder e aumente 1% a cada poucos meses. Mesmo poupar R$ 250/mês soma mais de R$ 15.000+ ao longo de 5 anos a 4,5% APY. A chave é consistência — contribuições pequenas regulares superam grandes irregulares."
        },
        {
          "question": "Quanto devo ter em um fundo de emergência?",
          "answer": "A maioria dos consultores financeiros recomenda 3–6 meses de despesas essenciais (aluguel, comida, seguro, contas, pagamentos mínimos de dívida). Se você é autônomo, tem renda irregular, ou é o único provedor, mire 6–12 meses. Uma boa meta inicial é R$ 5.000 para emergências imediatas, então construa em direção à quantia total ao longo do tempo."
        },
        {
          "question": "Uma conta poupança é melhor que investir para minha meta?",
          "answer": "Para metas abaixo de 3–5 anos, uma conta poupança de alto rendimento ou CDB é mais seguro porque investimentos podem perder valor no curto prazo. Para metas 5+ anos (como aposentadoria ou faculdade de um filho), investir em fundos de índice diversificados historicamente retorna 7–10% anualmente — significativamente superando taxas de conta poupança. O trade-off é volatilidade: seu saldo pode cair temporariamente, então apenas invista dinheiro que não precisará logo."
        },
        {
          "question": "Posso usar esta calculadora para poupança de aposentadoria?",
          "answer": "Esta calculadora funciona para qualquer meta de poupança, incluindo aposentadoria. Contudo, planejamento de aposentadoria envolve fatores adicionais como contrapartida do empregador, contas com vantagem fiscal (401k, IRA, Roth), Previdência Social, e taxas de retirada. Para planejamento abrangente de aposentadoria, use uma calculadora dedicada de aposentadoria que considere esses elementos."
        },
        {
          "question": "O que acontece se eu perder uma contribuição mensal?",
          "answer": "Perder um ou dois meses não descarrilará seu plano significativamente, mas consistência importa. Se perder um mês, tente compensar a diferença no mês seguinte ou distribua pelos meses restantes. A calculadora assume contribuições mensais iguais — se contribuir menos alguns meses, precisará poupar mais depois ou estender seu cronograma."
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
      "name": "Calculateur d'Objectif d'Épargne",
      "slug": "calculateur-objectif-epargne",
      "subtitle": "Découvrez combien vous devez économiser chaque mois, semaine ou jour pour atteindre votre objectif financier — avec intérêts et inflation inclus.",
      "seo": {
        "title": "Calculateur d'Objectif d'Épargne - Estimateur de Plan d'Épargne Mensuel",
        "description": "Calculez combien économiser mensuellement, hebdomadairement ou quotidiennement pour atteindre votre objectif. Incluez les intérêts composés et l'inflation. Planificateur d'épargne gratuit avec détail année par année.",
        "shortDescription": "Planifiez votre épargne avec intérêts composés et ajustement à l'inflation.",
        "keywords": [
          "calculateur objectif épargne",
          "calculateur épargne",
          "combien économiser par mois",
          "calculateur plan épargne",
          "épargne intérêts composés",
          "calculateur fonds urgence",
          "planificateur objectif épargne",
          "calculateur épargne gratuit"
        ]
      },
      "inputs": {
        "savingsGoal": {
          "label": "Objectif d'Épargne",
          "helpText": "Le montant total que vous voulez économiser"
        },
        "startingBalance": {
          "label": "Solde Initial",
          "helpText": "Montant déjà économisé pour cet objectif"
        },
        "timeToGoal": {
          "label": "Délai pour Atteindre l'Objectif",
          "helpText": "Nombre d'années pour atteindre votre objectif — des délais plus courts nécessitent une épargne mensuelle plus élevée"
        },
        "annualRate": {
          "label": "Taux d'Intérêt Annuel (TAE)",
          "helpText": "Taux de rendement annuel effectif attendu — les comptes d'épargne à haut rendement offrent 4-5% TAE"
        },
        "compoundFrequency": {
          "label": "Fréquence de Capitalisation",
          "helpText": "À quelle fréquence les intérêts sont calculés et ajoutés à votre solde"
        },
        "includeInflation": {
          "label": "Ajuster pour l'Inflation",
          "helpText": "Activez pour voir le pouvoir d'achat réel de votre épargne dans le temps"
        },
        "inflationRate": {
          "label": "Taux d'Inflation Attendu",
          "helpText": "Inflation annuelle moyenne — la moyenne historique française est d'environ 2%"
        }
      },
      "presets": {
        "emergencyFund": {
          "label": "Fonds d'Urgence",
          "description": "15 000€ en 3 ans à 4,5% TAE"
        },
        "downPayment": {
          "label": "Apport Immobilier",
          "description": "60 000€ en 5 ans avec inflation"
        },
        "vacation": {
          "label": "Vacances",
          "description": "5 000€ en 1 an à 4,5% TAE"
        },
        "collegeFund": {
          "label": "Fonds Études",
          "description": "50 000€ en 10 ans avec inflation"
        }
      },
      "values": {
        "years": "années",
        "year": "année",
        "months": "mois",
        "month": "mois",
        "monthly": "/mois"
      },
      "results": {
        "monthlySavings": {
          "label": "Épargne Mensuelle Nécessaire"
        },
        "weeklySavings": {
          "label": "Épargne Hebdomadaire Nécessaire"
        },
        "dailySavings": {
          "label": "Épargne Quotidienne Nécessaire"
        },
        "totalContributions": {
          "label": "Contributions Totales"
        },
        "interestEarned": {
          "label": "Intérêts Gagnés"
        },
        "finalBalance": {
          "label": "Solde Final"
        }
      },
      "infoCards": {
        "savingsPlan": {
          "title": "Votre Plan d'Épargne",
          "items": [
            {
              "label": "Épargne Mensuelle",
              "valueKey": "monthlySavings"
            },
            {
              "label": "Épargne Hebdomadaire",
              "valueKey": "weeklySavings"
            },
            {
              "label": "Épargne Quotidienne",
              "valueKey": "dailySavings"
            },
            {
              "label": "Total Mois",
              "valueKey": "totalMonths"
            }
          ]
        },
        "growth": {
          "title": "Répartition de la Croissance",
          "items": [
            {
              "label": "Solde Initial",
              "valueKey": "startingBalance"
            },
            {
              "label": "Contributions Totales",
              "valueKey": "totalContributions"
            },
            {
              "label": "Intérêts Gagnés",
              "valueKey": "interestEarned"
            },
            {
              "label": "Solde Final",
              "valueKey": "finalBalance"
            }
          ]
        },
        "tips": {
          "title": "Conseils d'Épargne",
          "items": [
            "Automatisez les virements le jour de paie pour rester constant",
            "Utilisez un compte d'épargne à haut rendement pour 4-5% TAE",
            "Révisez et augmentez les contributions à chaque augmentation",
            "L'inflation érode la valeur — considérez des objectifs ajustés à l'inflation"
          ]
        }
      },
      "chart": {
        "title": "Croissance de l'Épargne dans le Temps",
        "xLabel": "Année",
        "yLabel": "Solde",
        "series": {
          "contributions": "Contributions",
          "interest": "Intérêts"
        }
      },
      "detailedTable": {
        "savingsSchedule": {
          "button": "Voir l'Échéancier Année par Année",
          "title": "Calendrier de Croissance de l'Épargne",
          "columns": {
            "year": "Année",
            "yearlyContribution": "Contributions",
            "yearlyInterest": "Intérêts",
            "totalContributions": "Total Épargné",
            "balance": "Solde"
          }
        }
      },
      "options": {
        "compoundFrequency": {
          "daily": "Quotidienne",
          "monthly": "Mensuelle",
          "quarterly": "Trimestrielle",
          "semiannually": "Semestrielle",
          "annually": "Annuelle"
        }
      },
      "formats": {
        "summary": "Économisez {monthlySavings}/mois pendant {timeToGoal} pour atteindre {savingsGoal}. Vous gagnerez {interestEarned} d'intérêts."
      },
      "education": {
        "howItWorks": {
          "title": "Comment Fonctionne ce Calculateur",
          "text": "Ce calculateur détermine combien vous devez économiser mensuellement, hebdomadairement ou quotidiennement pour atteindre un objectif financier spécifique dans le délai choisi. Il tient compte des intérêts composés — vous gagnez des intérêts sur vos contributions et sur les intérêts précédemment gagnés. Si vous activez l'ajustement à l'inflation, le calculateur augmente votre objectif pour maintenir le même pouvoir d'achat en euros futurs."
        },
        "compoundInterest": {
          "title": "Le Pouvoir des Intérêts Composés",
          "text": "Albert Einstein aurait appelé les intérêts composés la huitième merveille du monde. Quand votre épargne génère des intérêts, ces intérêts commencent à générer leurs propres intérêts dans les périodes suivantes. Plus les intérêts se capitalisent fréquemment (quotidiennement vs annuellement), plus votre argent croît rapidement. Même une petite différence de TAE peut se traduire par des gains significatifs sur de longs horizons temporels — c'est pourquoi commencer tôt est si important."
        },
        "choosingAccount": {
          "title": "Choisir le Bon Compte d'Épargne",
          "text": "Les comptes d'épargne à haut rendement offrent actuellement 3-4% TAE, comparé aux 0,01-0,5% typiques des comptes d'épargne traditionnels. Pour les objectifs de moins de 5 ans, un compte à haut rendement ou un compte à terme est généralement approprié. Pour les objectifs à plus long terme comme les fonds d'études, considérez un PEA ou des fonds indiciels qui rapportent historiquement 7-10% annuellement mais comportent plus de risques. Vérifiez toujours que votre compte est garanti (jusqu'à 100 000€)."
        },
        "inflation": {
          "title": "Pourquoi l'Inflation Compte",
          "text": "L'inflation réduit le pouvoir d'achat de l'argent dans le temps. Si vous épargnez pour un objectif dans 5+ ans, le montant nécessaire en euros futurs est supérieur au prix d'aujourd'hui. Par exemple, avec 3% d'inflation annuelle, quelque chose qui coûte 50 000€ aujourd'hui coûterait environ 57 964€ dans 5 ans. Activer l'option inflation garantit que votre objectif d'épargne tient compte de cette érosion, vous donnant une exigence d'épargne mensuelle plus réaliste."
        },
        "strategies": {
          "title": "Stratégies pour Atteindre Votre Objectif Plus Rapidement",
          "text": "La stratégie la plus efficace est d'automatiser votre épargne — configurez des virements automatiques à chaque paie pour que l'épargne devienne sans effort. Au-delà de cela, considérez la règle 50/30/20 : allouez 50% des revenus aux besoins, 30% aux envies, et 20% à l'épargne et remboursement de dettes. Les revenus exceptionnels (remboursements d'impôts, primes, cadeaux en espèces) peuvent considérablement accélérer les progrès quand déposés directement dans votre épargne objectif."
        }
      },
      "faqs": [
        {
          "question": "Quelle est la différence entre taux nominal et TAE ?",
          "answer": "Le taux nominal est le taux d'intérêt simple sans capitalisation. Le TAE (Taux Annuel Effectif) inclut l'effet des intérêts composés, le rendant légèrement supérieur au taux nominal pour le même taux de base. En comparant les comptes d'épargne, utilisez toujours le TAE — il reflète vos vrais gains annuels. Par exemple, un taux nominal de 4,5% capitalisé mensuellement équivaut à environ 4,59% TAE."
        },
        {
          "question": "À quelle fréquence les intérêts devraient-ils se capitaliser pour de meilleurs résultats ?",
          "answer": "La capitalisation quotidienne génère le plus d'intérêts, suivie par mensuelle, trimestrielle, semestrielle et annuelle. Cependant, la différence est relativement petite — capitalisation quotidienne vs mensuelle sur un solde de 10 000€ à 5% TAE ne produit qu'environ 2,50€ de plus par an. Le facteur le plus important est votre taux TAE lui-même et la régularité de vos contributions."
        },
        {
          "question": "Dois-je ajuster mon objectif d'épargne pour l'inflation ?",
          "answer": "Oui, si votre objectif est dans 3+ ans. L'inflation fonctionne typiquement à 2-3% annuellement, ce qui signifie que les prix doublent approximativement tous les 24-36 ans. Pour les objectifs à court terme (moins de 2 ans), l'inflation a un impact minimal. Pour les objectifs à long terme comme les fonds d'études ou apports immobiliers, activer l'ajustement inflation vous donne un objectif plus précis."
        },
        {
          "question": "Quel est un taux d'épargne réaliste ?",
          "answer": "Les conseillers financiers recommandent communément d'économiser 15-20% du revenu brut. Cependant, le bon montant dépend de vos objectifs et délais. Commencez avec ce que vous pouvez et augmentez de 1% tous les quelques mois. Même économiser 50€/mois totalise 3 000€+ sur 5 ans à 4,5% TAE. La clé est la constance — des petites contributions régulières battent des grosses irrégulières."
        },
        {
          "question": "Combien dois-je avoir dans un fonds d'urgence ?",
          "answer": "La plupart des conseillers financiers recommandent 3-6 mois de dépenses essentielles (loyer, nourriture, assurance, services publics, paiements minimums de dettes). Si vous êtes travailleur indépendant, avez des revenus irréguliers, ou êtes le seul soutien de famille, visez 6-12 mois. Un bon objectif de départ est 1 000€ pour les urgences immédiates, puis construire vers le montant complet dans le temps."
        },
        {
          "question": "Un compte d'épargne est-il meilleur qu'investir pour mon objectif ?",
          "answer": "Pour les objectifs de moins de 3-5 ans, un compte d'épargne à haut rendement ou compte à terme est plus sûr car les investissements peuvent perdre de la valeur à court terme. Pour les objectifs de 5+ ans (comme la retraite ou les études d'un enfant), investir dans des fonds indiciels diversifiés rapporte historiquement 7-10% annuellement — dépassant significativement les taux des comptes d'épargne. Le compromis est la volatilité : votre solde peut temporairement chuter, donc n'investissez que l'argent dont vous n'aurez pas besoin bientôt."
        },
        {
          "question": "Puis-je utiliser ce calculateur pour l'épargne retraite ?",
          "answer": "Ce calculateur fonctionne pour tout objectif d'épargne, y compris la retraite. Cependant, la planification de retraite implique des facteurs additionnels comme l'abondement employeur, les comptes fiscalement avantagés (PER, PEA), la Sécurité Sociale, et les taux de retrait. Pour une planification de retraite complète, utilisez un calculateur de retraite dédié qui tient compte de ces éléments."
        },
        {
          "question": "Que se passe-t-il si je rate une contribution mensuelle ?",
          "answer": "Rater un ou deux mois ne fera pas dérailler votre plan significativement, mais la constance compte. Si vous ratez un mois, essayez de rattraper la différence le mois suivant ou de l'étaler sur les mois restants. Le calculateur assume des contributions mensuelles égales — si vous contribuez moins certains mois, vous devrez soit économiser plus tard soit étendre votre délai."
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
      "name": "Sparziel Rechner",
      "slug": "sparziel-rechner",
      "subtitle": "Finden Sie heraus, wie viel Sie monatlich, wöchentlich oder täglich sparen müssen, um Ihr finanzielles Ziel zu erreichen — inklusive Zinsen und Inflation.",
      "seo": {
        "title": "Sparziel Rechner - Monatlicher Sparplan Schätzer",
        "description": "Berechnen Sie, wie viel Sie monatlich, wöchentlich oder täglich sparen müssen, um Ihr Ziel zu erreichen. Berücksichtigt Zinseszins und Inflation. Kostenloser Sparplaner mit Jahr-für-Jahr Aufschlüsselung.",
        "shortDescription": "Planen Sie Ihre Ersparnisse mit Zinseszins und Inflationsanpassung.",
        "keywords": [
          "sparziel rechner",
          "sparrechner",
          "wie viel monatlich sparen",
          "sparplan rechner",
          "zinseszins sparen",
          "notgroschen rechner",
          "sparziel planer",
          "kostenloser sparrechner"
        ]
      },
      "inputs": {
        "savingsGoal": {
          "label": "Sparziel",
          "helpText": "Der Gesamtbetrag, den Sie sparen möchten"
        },
        "startingBalance": {
          "label": "Startguthaben",
          "helpText": "Betrag, den Sie bereits für dieses Ziel gespart haben"
        },
        "timeToGoal": {
          "label": "Zeit bis zum Ziel",
          "helpText": "Wie viele Jahre Sie haben, um Ihr Ziel zu erreichen — kürzere Zeiträume erfordern höhere monatliche Ersparnisse"
        },
        "annualRate": {
          "label": "Jährlicher Zinssatz (effektiv)",
          "helpText": "Erwarteter jährlicher Prozentertrag — Hochzins-Sparkonten bieten 4–5% effektiven Jahreszins"
        },
        "compoundFrequency": {
          "label": "Zinshäufigkeit",
          "helpText": "Wie oft Zinsen berechnet und zu Ihrem Guthaben hinzugefügt werden"
        },
        "includeInflation": {
          "label": "Inflationsanpassung",
          "helpText": "Aktivieren Sie diese Option, um die reale Kaufkraft Ihrer Ersparnisse über die Zeit zu sehen"
        },
        "inflationRate": {
          "label": "Erwartete Inflationsrate",
          "helpText": "Durchschnittliche jährliche Inflation — der historische Durchschnitt liegt bei etwa 3%"
        }
      },
      "presets": {
        "emergencyFund": {
          "label": "Notgroschen",
          "description": "15.000€ in 3 Jahren bei 4,5% effektivem Jahreszins"
        },
        "downPayment": {
          "label": "Anzahlung",
          "description": "60.000€ in 5 Jahren mit Inflation"
        },
        "vacation": {
          "label": "Urlaub",
          "description": "5.000€ in 1 Jahr bei 4,5% effektivem Jahreszins"
        },
        "collegeFund": {
          "label": "Studienfonds",
          "description": "50.000€ in 10 Jahren mit Inflation"
        }
      },
      "values": {
        "years": "Jahre",
        "year": "Jahr",
        "months": "Monate",
        "month": "Monat",
        "monthly": "/Monat"
      },
      "results": {
        "monthlySavings": {
          "label": "Benötigte monatliche Ersparnisse"
        },
        "weeklySavings": {
          "label": "Benötigte wöchentliche Ersparnisse"
        },
        "dailySavings": {
          "label": "Benötigte tägliche Ersparnisse"
        },
        "totalContributions": {
          "label": "Gesamte Einzahlungen"
        },
        "interestEarned": {
          "label": "Verdiente Zinsen"
        },
        "finalBalance": {
          "label": "Endguthaben"
        }
      },
      "infoCards": {
        "savingsPlan": {
          "title": "Ihr Sparplan",
          "items": [
            {
              "label": "Monatliche Ersparnisse",
              "valueKey": "monthlySavings"
            },
            {
              "label": "Wöchentliche Ersparnisse",
              "valueKey": "weeklySavings"
            },
            {
              "label": "Tägliche Ersparnisse",
              "valueKey": "dailySavings"
            },
            {
              "label": "Gesamte Monate",
              "valueKey": "totalMonths"
            }
          ]
        },
        "growth": {
          "title": "Wachstums-Aufschlüsselung",
          "items": [
            {
              "label": "Startguthaben",
              "valueKey": "startingBalance"
            },
            {
              "label": "Gesamte Einzahlungen",
              "valueKey": "totalContributions"
            },
            {
              "label": "Verdiente Zinsen",
              "valueKey": "interestEarned"
            },
            {
              "label": "Endguthaben",
              "valueKey": "finalBalance"
            }
          ]
        },
        "tips": {
          "title": "Spar-Tipps",
          "items": [
            "Automatisieren Sie Überweisungen am Zahltag für Konstanz",
            "Nutzen Sie ein Hochzins-Sparkonto für 4–5% effektiven Jahreszins",
            "Überprüfen und erhöhen Sie Beiträge bei jeder Gehaltserhöhung",
            "Inflation mindert den Wert — erwägen Sie inflationsbereinigte Ziele"
          ]
        }
      },
      "chart": {
        "title": "Sparwachstum über die Zeit",
        "xLabel": "Jahr",
        "yLabel": "Guthaben",
        "series": {
          "contributions": "Einzahlungen",
          "interest": "Zinsen"
        }
      },
      "detailedTable": {
        "savingsSchedule": {
          "button": "Jahr-für-Jahr Zeitplan anzeigen",
          "title": "Sparwachstums-Zeitplan",
          "columns": {
            "year": "Jahr",
            "yearlyContribution": "Einzahlungen",
            "yearlyInterest": "Zinsen",
            "totalContributions": "Gesamt gespart",
            "balance": "Guthaben"
          }
        }
      },
      "options": {
        "compoundFrequency": {
          "daily": "Täglich",
          "monthly": "Monatlich",
          "quarterly": "Vierteljährlich",
          "semiannually": "Halbjährlich",
          "annually": "Jährlich"
        }
      },
      "formats": {
        "summary": "Sparen Sie {monthlySavings}/Monat für {timeToGoal}, um {savingsGoal} zu erreichen. Sie verdienen {interestEarned} an Zinsen."
      },
      "education": {
        "howItWorks": {
          "title": "So funktioniert dieser Rechner",
          "text": "Dieser Rechner bestimmt, wie viel Sie monatlich, wöchentlich oder täglich sparen müssen, um ein bestimmtes finanzielles Ziel innerhalb Ihres gewählten Zeitrahmens zu erreichen. Er berücksichtigt Zinseszins — das bedeutet, Sie verdienen Zinsen sowohl auf Ihre Einzahlungen als auch auf zuvor verdiente Zinsen. Wenn Sie die Inflationsanpassung aktivieren, erhöht der Rechner Ihr Ziel, um die gleiche Kaufkraft in zukünftigen Euro zu erhalten."
        },
        "compoundInterest": {
          "title": "Die Kraft des Zinseszinses",
          "text": "Albert Einstein nannte Zinseszins angeblich das achte Weltwunder. Wenn Ihre Ersparnisse Zinsen verdienen, beginnen diese Zinsen in nachfolgenden Perioden ihre eigenen Zinsen zu verdienen. Je häufiger Zinsen kapitalisiert werden (täglich vs. jährlich), desto schneller wächst Ihr Geld. Schon ein kleiner Unterschied im effektiven Jahreszins kann sich über lange Zeiträume zu erheblichen Gewinnen summieren — weshalb ein früher Start so wichtig ist."
        },
        "choosingAccount": {
          "title": "Das richtige Sparkonto wählen",
          "text": "Hochzins-Sparkonten bieten derzeit 4–5% effektiven Jahreszins, verglichen mit den 0,01–0,1% typischer traditioneller Sparkonten. Für Ziele unter 5 Jahren ist ein Hochzins-Sparkonto oder Festgeld-Leiter generell geeignet. Für längerfristige Ziele wie Studienfonds sollten Sie einen ETF-Sparplan erwägen, der historisch 7–10% jährlich abwirft, aber mehr Risiko birgt. Prüfen Sie immer, dass Ihr Konto durch die Einlagensicherung geschützt ist (bis zu 100.000€)."
        },
        "inflation": {
          "title": "Warum Inflation wichtig ist",
          "text": "Inflation reduziert die Kaufkraft von Geld über die Zeit. Wenn Sie für ein Ziel sparen, das 5+ Jahre entfernt ist, ist der Betrag, den Sie in zukünftigen Euro benötigen, höher als der heutige Preis. Zum Beispiel würde etwas, das heute 50.000€ kostet, bei 3% jährlicher Inflation in 5 Jahren etwa 57.964€ kosten. Die Aktivierung der Inflation sorgt dafür, dass Ihr Sparziel diese Erosion berücksichtigt und Ihnen eine realistischere monatliche Sparanforderung gibt."
        },
        "strategies": {
          "title": "Strategien, um Ihr Ziel schneller zu erreichen",
          "text": "Die effektivste Strategie ist die Automatisierung Ihres Sparens — richten Sie automatische Überweisungen bei jedem Gehalt ein, damit das Sparen mühelos wird. Darüber hinaus sollten Sie die 50/30/20-Regel erwägen: 50% des Einkommens für Bedürfnisse, 30% für Wünsche und 20% für Ersparnisse und Schuldenrückzahlung. Unerwartete Einkünfte (Steuererstattungen, Boni, Geldgeschenke) können den Fortschritt dramatisch beschleunigen, wenn sie direkt in Ihr Sparziel eingezahlt werden."
        }
      },
      "faqs": [
        {
          "question": "Was ist der Unterschied zwischen Nominalzins und effektivem Jahreszins?",
          "answer": "Der Nominalzins ist der einfache Zinssatz ohne Zinseszins. Der effektive Jahreszins beinhaltet die Wirkung des Zinseszinses und ist daher bei gleichem Nominalzins etwas höher. Beim Vergleich von Sparkonten verwenden Sie immer den effektiven Jahreszins — er spiegelt Ihre wahren jährlichen Erträge wider. Zum Beispiel entspricht ein Nominalzins von 4,5% mit monatlicher Kapitalisierung etwa 4,59% effektivem Jahreszins."
        },
        {
          "question": "Wie oft sollten Zinsen für beste Ergebnisse kapitalisiert werden?",
          "answer": "Tägliche Kapitalisierung bringt die meisten Zinsen, gefolgt von monatlich, vierteljährlich, halbjährlich und jährlich. Der Unterschied ist jedoch relativ klein — tägliche vs. monatliche Kapitalisierung bei 10.000€ Guthaben mit 5% effektivem Jahreszins bringt nur etwa 2,50€ mehr pro Jahr. Der wichtigere Faktor ist Ihr effektiver Jahreszins selbst und wie konstant Sie einzahlen."
        },
        {
          "question": "Sollte ich mein Sparziel für Inflation anpassen?",
          "answer": "Ja, wenn Ihr Ziel 3+ Jahre entfernt ist. Inflation läuft typischerweise bei 2–3% jährlich, was bedeutet, dass sich Preise etwa alle 24–36 Jahre verdoppeln. Für kurzfristige Ziele (unter 2 Jahren) hat Inflation minimalen Einfluss. Für langfristige Ziele wie Studienfonds oder Anzahlungen gibt Ihnen die Aktivierung der Inflationsanpassung ein genaueres Ziel."
        },
        {
          "question": "Was ist eine realistische Sparquote?",
          "answer": "Finanzberater empfehlen häufig 15–20% des Bruttoeinkommens zu sparen. Der richtige Betrag hängt jedoch von Ihren Zielen und Ihrem Zeitrahmen ab. Beginnen Sie mit dem, was Sie können, und erhöhen Sie alle paar Monate um 1%. Selbst 50€/Monat sparen summiert sich über 5 Jahre bei 4,5% effektivem Jahreszins zu über 3.000€. Der Schlüssel ist Konstanz — regelmäßige kleine Beiträge schlagen unregelmäßige große."
        },
        {
          "question": "Wie viel sollte ich in einem Notgroschen haben?",
          "answer": "Die meisten Finanzberater empfehlen 3–6 Monate der wesentlichen Ausgaben (Miete, Essen, Versicherung, Nebenkosten, Mindestschuldenzahlungen). Wenn Sie selbstständig sind, unregelmäßiges Einkommen haben oder der alleinige Verdiener sind, streben Sie 6–12 Monate an. Ein gutes Anfangsziel sind 1.000€ für sofortige Notfälle, dann den vollen Betrag über die Zeit aufbauen."
        },
        {
          "question": "Ist ein Sparkonto besser als Investieren für mein Ziel?",
          "answer": "Für Ziele unter 3–5 Jahren ist ein Hochzins-Sparkonto oder Festgeld sicherer, da Investitionen kurzfristig an Wert verlieren können. Für Ziele 5+ Jahre entfernt (wie Rente oder Studium eines Kindes) erzielen Investitionen in diversifizierte Indexfonds historisch 7–10% jährlich — deutlich mehr als Sparkonto-Zinsen. Der Kompromiss ist Volatilität: Ihr Guthaben kann temporär sinken, investieren Sie also nur Geld, das Sie bald nicht brauchen."
        },
        {
          "question": "Kann ich diesen Rechner für Altersvorsorge verwenden?",
          "answer": "Dieser Rechner funktioniert für jedes Sparziel, einschließlich Altersvorsorge. Altersvorsorge-Planung beinhaltet jedoch zusätzliche Faktoren wie Arbeitgeberzuschüsse, steuerlich begünstigte Konten (Riester, Rürup, betriebliche Altersvorsorge), gesetzliche Rente und Entnaheraten. Für umfassende Altersvorsorge-Planung verwenden Sie einen dedizierten Altersvorsorge-Rechner, der diese Elemente berücksichtigt."
        },
        {
          "question": "Was passiert, wenn ich einen monatlichen Beitrag verpasse?",
          "answer": "Ein oder zwei Monate zu verpassen wird Ihren Plan nicht erheblich entgleisen lassen, aber Konstanz ist wichtig. Wenn Sie einen Monat verpassen, versuchen Sie, den Unterschied im folgenden Monat auszugleichen oder über die verbleibenden Monate zu verteilen. Der Rechner nimmt gleiche monatliche Beiträge an — wenn Sie manche Monate weniger beitragen, müssen Sie entweder später mehr sparen oder Ihren Zeitrahmen verlängern."
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

  // ─── INPUT FIELDS ───
  inputs: [
    // Savings Goal — currency with unitType
    {
      id: "savingsGoal",
      type: "number",
      defaultValue: null,
      placeholder: "15000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Starting Balance — currency with unitType
    {
      id: "startingBalance",
      type: "number",
      defaultValue: null,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Time to Reach Goal — stepper (years)
    {
      id: "timeToGoal",
      type: "stepper",
      defaultValue: 3,
      min: 1,
      max: 30,
      step: 1,
      suffix: "years",
    },
    // Annual Interest Rate (APY)
    {
      id: "annualRate",
      type: "number",
      defaultValue: 4.5,
      min: 0,
      max: 20,
      step: 0.1,
      suffix: "%",
    },
    // Compound Frequency — select
    {
      id: "compoundFrequency",
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
    // Adjust for Inflation — toggle (V4.3)
    {
      id: "includeInflation",
      type: "toggle",
      defaultValue: false,
    },
    // Expected Inflation Rate — revealed when includeInflation = true
    {
      id: "inflationRate",
      type: "number",
      defaultValue: null,
      placeholder: "3",
      min: 0,
      max: 20,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeInflation", value: true },
    },
  ],

  // ─── RESULTS ───
  results: [
    { id: "monthlySavings", type: "primary", format: "text" },
    { id: "weeklySavings", type: "secondary", format: "text" },
    { id: "dailySavings", type: "secondary", format: "text" },
    { id: "totalContributions", type: "secondary", format: "text" },
    { id: "interestEarned", type: "secondary", format: "text" },
    { id: "finalBalance", type: "secondary", format: "text" },
  ],

  // ─── INFO CARDS ───
  infoCards: [
    { id: "savingsPlan", type: "list", icon: "💰", itemCount: 4 },
    { id: "growth", type: "list", icon: "📈", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ───
  chart: {
    id: "paymentBreakdown",
    type: "composed",
    xKey: "year",
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "contributions", type: "area", stackId: "savings", color: "#3b82f6" },
      { key: "interest", type: "area", stackId: "savings", color: "#10b981" },
    ],
  },

  // ─── DETAILED TABLE (Year-by-Year Schedule) ───
  detailedTable: {
    id: "savingsSchedule",
    buttonLabel: "View Year-by-Year Schedule",
    buttonIcon: "📅",
    modalTitle: "Savings Growth Schedule",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "yearlyContribution", label: "Contributions", align: "right" },
      { id: "yearlyInterest", label: "Interest", align: "right" },
      { id: "totalContributions", label: "Total Saved", align: "right" },
      { id: "balance", label: "Balance", align: "right", highlight: true },
    ],
  },

  referenceData: [],

  // ─── EDUCATION SECTIONS ───
  educationSections: [
    { id: "howItWorks", type: "prose", icon: "📖" },
    { id: "compoundInterest", type: "prose", icon: "⚙️" },
    { id: "choosingAccount", type: "prose", icon: "🏦" },
    { id: "inflation", type: "prose", icon: "📉" },
    { id: "strategies", type: "prose", icon: "🚀" },
  ],

  // ─── FAQs ───
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

  // ─── REFERENCES ───
  references: [
    {
      text: "Federal Reserve — Interest Rates & Savings",
      url: "https://www.federalreserve.gov/",
    },
    {
      text: "FDIC — National Rates and Rate Caps",
      url: "https://www.fdic.gov/resources/bankers/national-rates/",
    },
    {
      text: "U.S. Bureau of Labor Statistics — CPI Inflation Calculator",
      url: "https://www.bls.gov/data/inflation_calculator.htm",
    },
    {
      text: "Investor.gov — Compound Interest Calculator",
      url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
    },
  ],

  // ─── EDUCATION (Hero section) ───
  hero: {},
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculateSavingsGoal(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──
  const savingsGoal = values.savingsGoal as number | null;
  const startingBalance = (values.startingBalance as number | null) || 0;
  const timeToGoalYears = (values.timeToGoal as number) || 3;
  const annualRate = (values.annualRate as number) ?? 4.5;
  const compoundFrequency = (values.compoundFrequency as string) || "monthly";
  const includeInflation = values.includeInflation as boolean;
  const inflationRate = includeInflation ? ((values.inflationRate as number | null) || 0) : 0;

  // ── Validate required ──
  if (!savingsGoal || savingsGoal <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Currency symbol ──
  const curr = fieldUnits?.savingsGoal || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ── Compound periods per year ──
  const compoundMap: Record<string, number> = {
    daily: 365,
    monthly: 12,
    quarterly: 4,
    semiannually: 2,
    annually: 1,
  };
  const n = compoundMap[compoundFrequency] || 12;

  // ── Adjust goal for inflation if enabled ──
  const adjustedGoal = includeInflation && inflationRate > 0
    ? savingsGoal * Math.pow(1 + inflationRate / 100, timeToGoalYears)
    : savingsGoal;

  // ── Calculate required monthly contribution ──
  // Future Value formula:
  //   FV = PV*(1 + r/n)^(n*t) + PMT * [((1 + r/n)^(n*t) - 1) / (r/n)]
  // We solve for PMT (monthly contribution):
  //   PMT = (FV - PV_grown) * (r_monthly) / ((1 + r_monthly)^totalMonths - 1)
  const totalMonths = timeToGoalYears * 12;
  const monthlyRate = annualRate / 100 / 12;

  let monthlySavings: number;
  let futureValueOfStarting: number;

  if (monthlyRate === 0) {
    // No interest — simple division
    futureValueOfStarting = startingBalance;
    const remaining = adjustedGoal - futureValueOfStarting;
    monthlySavings = remaining > 0 ? remaining / totalMonths : 0;
  } else {
    // Future value of starting balance with compound interest
    const ratePerPeriod = annualRate / 100 / n;
    const totalPeriods = n * timeToGoalYears;
    futureValueOfStarting = startingBalance * Math.pow(1 + ratePerPeriod, totalPeriods);

    // Amount still needed after starting balance grows
    const amountNeeded = adjustedGoal - futureValueOfStarting;

    if (amountNeeded <= 0) {
      // Starting balance alone covers the goal
      monthlySavings = 0;
    } else {
      // Future value of monthly annuity: FV = PMT * [((1+r)^n - 1) / r]
      const fvFactor = (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
      monthlySavings = amountNeeded / fvFactor;
    }
  }

  // Ensure non-negative
  monthlySavings = Math.max(monthlySavings, 0);

  // ── Weekly and daily savings ──
  const weeklySavings = (monthlySavings * 12) / 52;
  const dailySavings = (monthlySavings * 12) / 365;

  // ── Calculate totals ──
  const totalContributions = monthlySavings * totalMonths + startingBalance;
  const interestEarned = adjustedGoal - totalContributions;
  const finalBalance = adjustedGoal;

  // ── Build chart data (yearly breakdown) ──
  const chartData: Array<Record<string, unknown>> = [];
  let runningBalance = startingBalance;
  let cumulativeContributions = startingBalance;

  for (let year = 1; year <= timeToGoalYears; year++) {
    const startOfYearBalance = runningBalance;
    const yearlyContribution = monthlySavings * 12;
    cumulativeContributions += yearlyContribution;

    // Simulate month by month for accurate compounding
    let endOfYearBalance = startOfYearBalance;
    for (let month = 1; month <= 12; month++) {
      endOfYearBalance += monthlySavings;
      endOfYearBalance *= (1 + monthlyRate);
    }

    runningBalance = endOfYearBalance;
    const cumulativeInterest = runningBalance - cumulativeContributions;

    chartData.push({
      year: v[`year${year}`] || `${year}`,
      contributions: Math.round(cumulativeContributions),
      interest: Math.max(Math.round(cumulativeInterest), 0),
    });
  }

  // ── Build table data (yearly schedule) ──
  const tableData: Array<Record<string, string>> = [];
  let tableBalance = startingBalance;
  let tableCumulativeContributions = startingBalance;

  for (let year = 1; year <= timeToGoalYears; year++) {
    const startBalance = tableBalance;
    const yearlyContribution = monthlySavings * 12;
    tableCumulativeContributions += yearlyContribution;

    // Simulate month by month
    let endBalance = startBalance;
    for (let month = 1; month <= 12; month++) {
      endBalance += monthlySavings;
      endBalance *= (1 + monthlyRate);
    }

    const yearlyInterest = endBalance - startBalance - yearlyContribution;
    tableBalance = endBalance;

    tableData.push({
      year: `${year}`,
      yearlyContribution: `${sym}${fmtNum(yearlyContribution)}`,
      yearlyInterest: `${sym}${fmtNum(Math.max(yearlyInterest, 0))}`,
      totalContributions: `${sym}${fmtNum(tableCumulativeContributions)}`,
      balance: `${sym}${fmtNum(endBalance)}`,
    });
  }

  // ── Time label ──
  const yearLabel = timeToGoalYears === 1 ? (v["year"] || "year") : (v["years"] || "years");
  const timeStr = `${timeToGoalYears} ${yearLabel}`;

  // ── Format results ──
  return {
    values: {
      monthlySavings,
      weeklySavings,
      dailySavings,
      totalContributions,
      interestEarned: Math.max(interestEarned, 0),
      finalBalance,
      adjustedGoal,
      totalMonths,
    },
    formatted: {
      monthlySavings: `${sym}${fmtNum(monthlySavings)}`,
      weeklySavings: `${sym}${fmtNum(weeklySavings)}`,
      dailySavings: `${sym}${fmtNum(dailySavings)}`,
      totalContributions: `${sym}${fmtNum(totalContributions)}`,
      interestEarned: `${sym}${fmtNum(Math.max(interestEarned, 0))}`,
      finalBalance: `${sym}${fmtNum(finalBalance)}`,
      adjustedGoal: `${sym}${fmtNum(adjustedGoal)}`,
      totalMonths: `${totalMonths}`,
      startingBalance: `${sym}${fmtNum(startingBalance)}`,
      savingsGoal: `${sym}${fmtNum(savingsGoal)}`,
      timeToGoal: timeStr,
    },
    summary:
      f.summary
        ?.replace("{monthlySavings}", `${sym}${fmtNum(monthlySavings)}`)
        .replace("{timeToGoal}", timeStr)
        .replace("{savingsGoal}", `${sym}${fmtNum(adjustedGoal)}`)
        .replace("{interestEarned}", `${sym}${fmtNum(Math.max(interestEarned, 0))}`) ||
      `Save ${sym}${fmtNum(monthlySavings)}/month for ${timeStr} to reach ${sym}${fmtNum(adjustedGoal)}. You'll earn ${sym}${fmtNum(Math.max(interestEarned, 0))} in interest.`,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
