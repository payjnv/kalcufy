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

export const calculator401kConfig: CalculatorConfigV4 = {
  id: "401k",
  version: "4.0",
  category: "finance",
  icon: "📈",

  // ─── PRESETS ───
  presets: [
    {
      id: "youngSaver",
      icon: "🌱",
      values: {
        currentAge: 25,
        retirementAge: 65,
        annualSalary: 55000,
        currentBalance: 5000,
        contributionPercent: 8,
        includeEmployerMatch: true,
        employerMatchPercent: 100,
        employerMatchLimit: 6,
        rateOfReturn: 7,
        includeSalaryGrowth: true,
        annualSalaryIncrease: 3,
        includeInflation: false,
        inflationRate: null,
      },
    },
    {
      id: "midCareer",
      icon: "💼",
      values: {
        currentAge: 40,
        retirementAge: 65,
        annualSalary: 95000,
        currentBalance: 120000,
        contributionPercent: 12,
        includeEmployerMatch: true,
        employerMatchPercent: 50,
        employerMatchLimit: 6,
        rateOfReturn: 7,
        includeSalaryGrowth: true,
        annualSalaryIncrease: 2.5,
        includeInflation: true,
        inflationRate: 2.5,
      },
    },
    {
      id: "lateStart",
      icon: "⏰",
      values: {
        currentAge: 50,
        retirementAge: 67,
        annualSalary: 85000,
        currentBalance: 60000,
        contributionPercent: 15,
        includeEmployerMatch: true,
        employerMatchPercent: 50,
        employerMatchLimit: 4,
        rateOfReturn: 6,
        includeSalaryGrowth: true,
        annualSalaryIncrease: 2,
        includeInflation: true,
        inflationRate: 3,
      },
    },
    {
      id: "aggressiveSaver",
      icon: "🚀",
      values: {
        currentAge: 30,
        retirementAge: 60,
        annualSalary: 120000,
        currentBalance: 40000,
        contributionPercent: 20,
        includeEmployerMatch: true,
        employerMatchPercent: 100,
        employerMatchLimit: 6,
        rateOfReturn: 8,
        includeSalaryGrowth: true,
        annualSalaryIncrease: 3.5,
        includeInflation: false,
        inflationRate: null,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates) ───
  t: {
    en: {
      name: "401(k) Calculator",
      slug: "401k",
      subtitle:
        "Estimate your 401(k) balance at retirement with employer match, salary growth, and inflation — see how your savings grow over time.",
      breadcrumb: "401(k) Calc",

      seo: {
        title: "401(k) Calculator - Retirement Savings & Growth Estimator",
        description:
          "Estimate your 401(k) balance at retirement with employer match, catch-up contributions, salary growth, and inflation adjustment. Free multi-currency tool with year-by-year breakdown.",
        shortDescription:
          "Estimate your 401(k) retirement balance with employer match and growth projections.",
        keywords: [
          "401k calculator",
          "retirement calculator",
          "401k growth",
          "employer match calculator",
          "retirement savings",
          "401k contribution",
          "retirement planning",
          "catch-up contributions",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        currentAge: {
          label: "Current Age",
          helpText: "Your current age — the earlier you start saving, the more time compound growth has to work",
        },
        retirementAge: {
          label: "Retirement Age",
          helpText: "Age you plan to retire — full Social Security benefits start at 67 for most people",
        },
        annualSalary: {
          label: "Annual Salary",
          helpText: "Your current annual gross income before taxes — used to calculate your contribution amount",
        },
        currentBalance: {
          label: "Current 401(k) Balance",
          helpText: "How much you currently have saved in your 401(k) account — check your latest statement",
        },
        contributionPercent: {
          label: "Your Contribution",
          helpText: "Percentage of your salary you contribute each year — aim for at least enough to get the full employer match",
        },
        includeEmployerMatch: {
          label: "Employer Match",
          helpText: "Toggle on if your employer matches a portion of your 401(k) contributions — this is free money",
        },
        employerMatchPercent: {
          label: "Match Rate",
          helpText: "How much your employer matches — 50% means they add $0.50 for every $1 you contribute, 100% means dollar-for-dollar",
        },
        employerMatchLimit: {
          label: "Match Limit (% of Salary)",
          helpText: "Maximum percentage of your salary your employer will match — typically 3% to 6% of salary",
        },
        rateOfReturn: {
          label: "Expected Rate of Return",
          helpText: "Average annual investment return — historically the S&P 500 averages ~10%, but 6-8% is more conservative",
        },
        includeSalaryGrowth: {
          label: "Salary Growth",
          helpText: "Toggle on to account for annual raises — your contributions grow as your salary increases",
        },
        annualSalaryIncrease: {
          label: "Annual Salary Increase",
          helpText: "Expected yearly raise percentage — average is 3% but varies by industry and performance",
        },
        includeInflation: {
          label: "Adjust for Inflation",
          helpText: "Toggle on to see your balance in today's purchasing power — shows what your savings are really worth",
        },
        inflationRate: {
          label: "Expected Inflation Rate",
          helpText: "Average annual inflation — historically around 2-3% in the US, but has been higher recently",
        },
      },

      presets: {
        youngSaver: {
          label: "Young Saver",
          description: "Age 25, $55K salary, 8% contribution",
        },
        midCareer: {
          label: "Mid-Career",
          description: "Age 40, $95K salary, 12% contribution",
        },
        lateStart: {
          label: "Late Start",
          description: "Age 50, $85K salary, 15% contribution",
        },
        aggressiveSaver: {
          label: "Aggressive",
          description: "Age 30, $120K salary, 20% contribution",
        },
      },

      values: {
        years: "years",
        year: "year",
        months: "months",
        month: "month",
        monthly: "/mo",
        perYear: "/yr",
      },

      formats: {
        summary:
          "By age {retirementAge}, your 401(k) could grow to {balanceAtRetirement}. You'll have contributed {totalContributions} with {totalEmployerMatch} in employer match and {totalGrowth} in investment growth.",
      },

      results: {
        balanceAtRetirement: { label: "Balance at Retirement" },
        totalContributions: { label: "Your Total Contributions" },
        totalEmployerMatch: { label: "Employer Match Total" },
        totalGrowth: { label: "Investment Growth" },
        monthlyRetirementIncome: { label: "Estimated Monthly Income" },
        annualTaxSavings: { label: "Annual Tax Savings (Current)" },
        freeMoneyFromMatch: { label: "Free Money from Employer" },
        inflationAdjustedBalance: { label: "Inflation-Adjusted Balance" },
      },

      infoCards: {
        snapshot: {
          title: "Retirement Snapshot",
          items: [
            { label: "Balance at Retirement", valueKey: "balanceAtRetirement" },
            { label: "Monthly Retirement Income", valueKey: "monthlyRetirementIncome" },
            { label: "Years of Retirement Funded", valueKey: "yearsFunded" },
            { label: "Total Amount Invested", valueKey: "totalInvested" },
          ],
        },
        breakdown: {
          title: "Contribution Breakdown",
          items: [
            { label: "Your Annual Contribution", valueKey: "annualContribution" },
            { label: "Annual Employer Match", valueKey: "annualEmployerMatch" },
            { label: "Annual Tax Savings", valueKey: "annualTaxSavings" },
            { label: "Free Money Left on Table", valueKey: "freeMoneyLeftOnTable" },
            { label: "Catch-up Eligible (50+)", valueKey: "catchUpEligible" },
          ],
        },
        tips: {
          title: "401(k) Tips",
          items: [
            "Always contribute enough to get the full employer match — it's an instant 50-100% return on your money that you can't beat anywhere else.",
            "Starting at 25 vs 35 with the same contributions can mean 2x more at retirement thanks to compound growth — time is your most powerful asset.",
            "After age 50, catch-up contributions let you add up to $7,500 extra per year (2025 limits) — ages 60-63 get an even higher $11,250 super catch-up.",
            "Consider increasing your contribution by 1% each year when you get a raise — you won't feel the difference but it adds up to hundreds of thousands over time.",
          ],
        },
      },

      chart: {
        title: "401(k) Growth Over Time",
        xLabel: "Age",
        yLabel: "Balance",
        series: {
          yourContributions: "Your Contributions",
          employerMatch: "Employer Match",
          investmentGrowth: "Investment Growth",
        },
      },

      detailedTable: {
        growthSchedule: {
          button: "View Year-by-Year Breakdown",
          title: "401(k) Growth Schedule",
          columns: {
            age: "Age",
            salary: "Salary",
            yourContribution: "Your Contribution",
            employerMatch: "Employer Match",
            growth: "Growth",
            balance: "Balance",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is a 401(k)?",
          content:
            "A 401(k) is an employer-sponsored retirement savings plan that lets you contribute a portion of your pre-tax salary to a tax-deferred investment account. Your contributions reduce your current taxable income, and your investments grow tax-free until you withdraw them in retirement. Many employers also match a percentage of your contributions, providing essentially free money toward your retirement. The plan gets its name from section 401(k) of the Internal Revenue Code, and it remains the most popular private-sector retirement savings vehicle in the United States, with over 70 million active participants.",
        },
        employerMatch: {
          title: "Understanding Employer Match",
          content:
            "Employer matching is one of the most valuable benefits of a 401(k). A common structure is a 50% match on contributions up to 6% of salary — meaning if you earn $80,000 and contribute 6% ($4,800), your employer adds $2,400. Some employers match dollar-for-dollar, effectively doubling your contributions up to the limit. Not contributing enough to capture the full match is literally leaving free money on the table. Vesting schedules may apply, meaning you might need to stay with the company for a certain number of years to keep 100% of employer contributions.",
        },
        contributionLimits: {
          title: "2026 Contribution Limits",
          items: [
            { text: "Under 50: $24,500 annual employee contribution limit", type: "info" },
            { text: "Ages 50-59 & 64+: Additional $8,000 catch-up ($32,500 total)", type: "info" },
            { text: "Ages 60-63: Super catch-up of $11,250 ($35,750 total)", type: "warning" },
            { text: "Total combined limit (employee + employer): $72,000", type: "info" },
            { text: "Employer match does NOT count toward your $24,500 employee limit", type: "info" },
            { text: "Contribution limits increase annually with inflation", type: "info" },
          ],
        },
        investmentOptions: {
          title: "Investment Options",
          items: [
            { text: "Target-date funds: Auto-adjust risk based on your retirement year", type: "info" },
            { text: "Index funds: Low-cost, diversified exposure to the broad market", type: "info" },
            { text: "Bond funds: Lower risk, fixed-income for conservative allocation", type: "info" },
            { text: "Company stock: High risk if concentrated — diversify beyond your employer", type: "warning" },
            { text: "Money market: Very low risk, low return — only for short-term safety", type: "info" },
            { text: "Expense ratios matter: Even 0.5% difference in fees costs tens of thousands over decades", type: "warning" },
          ],
        },
        examples: {
          title: "401(k) Growth Examples",
          description: "See how different contribution levels impact your retirement savings",
          examples: [
            {
              title: "Starting at 25 with 10% contribution",
              steps: [
                "Age 25 • Salary: $60,000 • Contribution: 10% = $6,000/yr",
                "Employer match: 50% up to 6% = $1,800/yr",
                "Total annual investment: $7,800",
                "At 7% annual return over 40 years",
                "Balance at 65: ~$1,620,000",
              ],
              result: "Starting early with a modest salary builds a $1.6M+ nest egg",
            },
            {
              title: "Starting at 40 with 15% contribution",
              steps: [
                "Age 40 • Salary: $90,000 • Contribution: 15% = $13,500/yr",
                "Employer match: 50% up to 6% = $2,700/yr",
                "Total annual investment: $16,200",
                "At 7% annual return over 25 years",
                "Balance at 65: ~$1,060,000",
              ],
              result: "Starting later requires higher contributions but still reaches $1M+",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How much should I contribute to my 401(k)?",
          answer:
            "At minimum, contribute enough to get your full employer match — anything less means you're leaving free money on the table. Ideally, aim for 10-15% of your salary. If you can't hit that right away, start with what you can afford and increase by 1% each year until you reach your target.",
        },
        {
          question: "What happens to my 401(k) if I change jobs?",
          answer:
            "You have several options: leave it with your former employer (if the balance is over $5,000), roll it over to your new employer's 401(k), roll it into an IRA for more investment choices, or cash it out (not recommended due to taxes and the 10% early withdrawal penalty). Rollovers are tax-free when done correctly.",
        },
        {
          question: "What are catch-up contributions?",
          answer:
            "If you're 50 or older, the IRS allows extra contributions above the standard limit. For 2026, the catch-up amount is $8,000 (total $32,500). A new 'super catch-up' for ages 60-63 allows an extra $11,250 (total $35,750). This helps people who started saving later to accelerate their retirement savings.",
        },
        {
          question: "What is an RMD (Required Minimum Distribution)?",
          answer:
            "Starting at age 73 (or 75 if born in 1960 or later), the IRS requires you to withdraw a minimum amount from your traditional 401(k) each year. The amount is calculated based on your account balance and life expectancy. Failing to take your RMD results in a 25% penalty on the amount you should have withdrawn.",
        },
        {
          question: "Can I withdraw from my 401(k) before age 59½?",
          answer:
            "Yes, but you'll generally owe income tax plus a 10% early withdrawal penalty. Exceptions include disability, certain medical expenses, qualified domestic relations orders, and the Rule of 55 (penalty-free withdrawals if you leave your job at age 55 or later). Hardship withdrawals may also be available but still incur taxes.",
        },
        {
          question: "How does employer match actually work?",
          answer:
            "Your employer contributes additional money based on how much you contribute. For example, '50% match up to 6%' means if you contribute 6% of your $80,000 salary ($4,800), your employer adds 50% of that ($2,400). If you only contribute 3%, they match $1,200 — you'd be leaving $1,200 of free money on the table each year.",
        },
        {
          question: "What rate of return should I expect from my 401(k)?",
          answer:
            "Historically, a diversified portfolio with 60% stocks and 40% bonds has returned approximately 7-8% annually before inflation. The S&P 500 alone has averaged about 10% over the long term. For conservative planning, using 6-7% is prudent. Actual returns depend on your investment allocation, fees, and market conditions.",
        },
        {
          question: "Can I use this calculator for 401(k) plans outside the U.S.?",
          answer:
            "While this calculator is designed for U.S. 401(k) plans, the compound growth math applies to any defined contribution retirement plan. You can use it for similar plans in other countries by adjusting the contribution limits and match structure. The multi-currency feature supports 32 currencies for global users.",
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
    },
    es: {
      "name": "Calculadora de 401(k)",
      "slug": "calculadora-401k",
      "subtitle": "Estima tu saldo de 401(k) al jubilarte con aportación del empleador, crecimiento salarial e inflación — ve cómo crecen tus ahorros con el tiempo.",
      "breadcrumb": "Calc 401(k)",
      "seo": {
        "title": "Calculadora de 401(k) - Estimador de Ahorros y Crecimiento de Jubilación",
        "description": "Estima tu saldo de 401(k) al jubilarte con aportación del empleador, contribuciones de recuperación, crecimiento salarial y ajuste por inflación. Herramienta gratuita multi-moneda con desglose año por año.",
        "shortDescription": "Estima tu saldo de jubilación 401(k) con aportación del empleador y proyecciones de crecimiento.",
        "keywords": [
          "calculadora 401k",
          "calculadora de jubilación",
          "crecimiento 401k",
          "calculadora aportación empleador",
          "ahorros de jubilación",
          "contribución 401k",
          "planificación de jubilación",
          "contribuciones de recuperación"
        ]
      },
      "inputs": {
        "currentAge": {
          "label": "Edad Actual",
          "helpText": "Tu edad actual — mientras más temprano empieces a ahorrar, más tiempo tiene el crecimiento compuesto para funcionar"
        },
        "retirementAge": {
          "label": "Edad de Jubilación",
          "helpText": "Edad a la que planeas jubilarte — los beneficios completos del Seguro Social comienzan a los 67 años para la mayoría de las personas"
        },
        "annualSalary": {
          "label": "Salario Anual",
          "helpText": "Tu ingreso anual bruto actual antes de impuestos — se usa para calcular el monto de tu contribución"
        },
        "currentBalance": {
          "label": "Saldo Actual del 401(k)",
          "helpText": "Cuánto tienes actualmente ahorrado en tu cuenta 401(k) — verifica tu estado de cuenta más reciente"
        },
        "contributionPercent": {
          "label": "Tu Contribución",
          "helpText": "Porcentaje de tu salario que contribuyes cada año — apunta al menos a obtener la aportación completa del empleador"
        },
        "includeEmployerMatch": {
          "label": "Aportación del Empleador",
          "helpText": "Activa si tu empleador aporta una porción de tus contribuciones 401(k) — esto es dinero gratis"
        },
        "employerMatchPercent": {
          "label": "Tasa de Aportación",
          "helpText": "Cuánto aporta tu empleador — 50% significa que agregan $0.50 por cada $1 que contribuyes, 100% significa peso por peso"
        },
        "employerMatchLimit": {
          "label": "Límite de Aportación (% del Salario)",
          "helpText": "Porcentaje máximo de tu salario que tu empleador aportará — típicamente 3% a 6% del salario"
        },
        "rateOfReturn": {
          "label": "Tasa de Rendimiento Esperada",
          "helpText": "Rendimiento anual promedio de inversión — históricamente el S&P 500 promedia ~10%, pero 6-8% es más conservador"
        },
        "includeSalaryGrowth": {
          "label": "Crecimiento Salarial",
          "helpText": "Activa para considerar aumentos anuales — tus contribuciones crecen conforme aumenta tu salario"
        },
        "annualSalaryIncrease": {
          "label": "Aumento Salarial Anual",
          "helpText": "Porcentaje de aumento anual esperado — el promedio es 3% pero varía por industria y desempeño"
        },
        "includeInflation": {
          "label": "Ajustar por Inflación",
          "helpText": "Activa para ver tu saldo en poder adquisitivo actual — muestra lo que realmente valen tus ahorros"
        },
        "inflationRate": {
          "label": "Tasa de Inflación Esperada",
          "helpText": "Inflación anual promedio — históricamente alrededor de 2-3% en EE.UU., pero ha sido mayor recientemente"
        }
      },
      "presets": {
        "youngSaver": {
          "label": "Ahorrador Joven",
          "description": "25 años, salario $55K, contribución 8%"
        },
        "midCareer": {
          "label": "Media Carrera",
          "description": "40 años, salario $95K, contribución 12%"
        },
        "lateStart": {
          "label": "Inicio Tardío",
          "description": "50 años, salario $85K, contribución 15%"
        },
        "aggressiveSaver": {
          "label": "Agresivo",
          "description": "30 años, salario $120K, contribución 20%"
        }
      },
      "values": {
        "years": "años",
        "year": "año",
        "months": "meses",
        "month": "mes",
        "monthly": "/mes",
        "perYear": "/año"
      },
      "formats": {
        "summary": "A los {retirementAge} años, tu 401(k) podría crecer a {balanceAtRetirement}. Habrás contribuido {totalContributions} con {totalEmployerMatch} en aportación del empleador y {totalGrowth} en crecimiento de inversión."
      },
      "results": {
        "balanceAtRetirement": {
          "label": "Saldo al Jubilarse"
        },
        "totalContributions": {
          "label": "Tus Contribuciones Totales"
        },
        "totalEmployerMatch": {
          "label": "Total de Aportación del Empleador"
        },
        "totalGrowth": {
          "label": "Crecimiento de Inversión"
        },
        "monthlyRetirementIncome": {
          "label": "Ingreso Mensual Estimado"
        },
        "annualTaxSavings": {
          "label": "Ahorro Fiscal Anual (Actual)"
        },
        "freeMoneyFromMatch": {
          "label": "Dinero Gratis del Empleador"
        },
        "inflationAdjustedBalance": {
          "label": "Saldo Ajustado por Inflación"
        }
      },
      "infoCards": {
        "snapshot": {
          "title": "Resumen de Jubilación",
          "items": [
            {
              "label": "Saldo al Jubilarse",
              "valueKey": "balanceAtRetirement"
            },
            {
              "label": "Ingreso Mensual de Jubilación",
              "valueKey": "monthlyRetirementIncome"
            },
            {
              "label": "Años de Jubilación Financiados",
              "valueKey": "yearsFunded"
            },
            {
              "label": "Monto Total Invertido",
              "valueKey": "totalInvested"
            }
          ]
        },
        "breakdown": {
          "title": "Desglose de Contribuciones",
          "items": [
            {
              "label": "Tu Contribución Anual",
              "valueKey": "annualContribution"
            },
            {
              "label": "Aportación Anual del Empleador",
              "valueKey": "annualEmployerMatch"
            },
            {
              "label": "Ahorro Fiscal Anual",
              "valueKey": "annualTaxSavings"
            },
            {
              "label": "Dinero Gratis Perdido",
              "valueKey": "freeMoneyLeftOnTable"
            },
            {
              "label": "Elegible para Recuperación (50+)",
              "valueKey": "catchUpEligible"
            }
          ]
        },
        "tips": {
          "title": "Consejos para el 401(k)",
          "items": [
            "Siempre contribuye lo suficiente para obtener la aportación completa del empleador — es un rendimiento instantáneo del 50-100% de tu dinero que no puedes superar en ningún otro lugar.",
            "Empezar a los 25 vs 35 años con las mismas contribuciones puede significar 2x más al jubilarse gracias al crecimiento compuesto — el tiempo es tu activo más poderoso.",
            "Después de los 50 años, las contribuciones de recuperación te permiten agregar hasta $7,500 extra por año (límites 2025) — las edades 60-63 obtienen una súper recuperación aún mayor de $11,250.",
            "Considera aumentar tu contribución en 1% cada año cuando recibas un aumento — no sentirás la diferencia pero se acumula a cientos de miles con el tiempo."
          ]
        }
      },
      "chart": {
        "title": "Crecimiento del 401(k) a Través del Tiempo",
        "xLabel": "Edad",
        "yLabel": "Saldo",
        "series": {
          "yourContributions": "Tus Contribuciones",
          "employerMatch": "Aportación del Empleador",
          "investmentGrowth": "Crecimiento de Inversión"
        }
      },
      "detailedTable": {
        "growthSchedule": {
          "button": "Ver Desglose Año por Año",
          "title": "Cronograma de Crecimiento del 401(k)",
          "columns": {
            "age": "Edad",
            "salary": "Salario",
            "yourContribution": "Tu Contribución",
            "employerMatch": "Aportación Empleador",
            "growth": "Crecimiento",
            "balance": "Saldo"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es un 401(k)?",
          "content": "Un 401(k) es un plan de ahorros para la jubilación patrocinado por el empleador que te permite contribuir una porción de tu salario antes de impuestos a una cuenta de inversión con impuestos diferidos. Tus contribuciones reducen tu ingreso gravable actual, y tus inversiones crecen libres de impuestos hasta que las retires en la jubilación. Muchos empleadores también igualan un porcentaje de tus contribuciones, proporcionando esencialmente dinero gratis hacia tu jubilación. El plan obtiene su nombre de la sección 401(k) del Código de Rentas Internas, y sigue siendo el vehículo de ahorros para la jubilación del sector privado más popular en Estados Unidos, con más de 70 millones de participantes activos."
        },
        "employerMatch": {
          "title": "Entendiendo la Aportación del Empleador",
          "content": "La aportación del empleador es uno de los beneficios más valiosos de un 401(k). Una estructura común es una aportación del 50% en contribuciones hasta el 6% del salario — significando que si ganas $80,000 y contribuyes 6% ($4,800), tu empleador agrega $2,400. Algunos empleadores aportan peso por peso, efectivamente duplicando tus contribuciones hasta el límite. No contribuir lo suficiente para capturar la aportación completa es literalmente dejar dinero gratis sobre la mesa. Pueden aplicar cronogramas de consolidación, significando que podrías necesitar permanecer con la empresa por cierto número de años para conservar el 100% de las contribuciones del empleador."
        },
        "contributionLimits": {
          "title": "Límites de Contribución 2026",
          "items": [
            {
              "text": "Menores de 50: Límite anual de contribución del empleado de $24,500",
              "type": "info"
            },
            {
              "text": "Edades 50-59 y 64+: $8,000 adicionales de recuperación ($32,500 total)",
              "type": "info"
            },
            {
              "text": "Edades 60-63: Súper recuperación de $11,250 ($35,750 total)",
              "type": "warning"
            },
            {
              "text": "Límite combinado total (empleado + empleador): $72,000",
              "type": "info"
            },
            {
              "text": "La aportación del empleador NO cuenta hacia tu límite de $24,500 del empleado",
              "type": "info"
            },
            {
              "text": "Los límites de contribución aumentan anualmente con la inflación",
              "type": "info"
            }
          ]
        },
        "investmentOptions": {
          "title": "Opciones de Inversión",
          "items": [
            {
              "text": "Fondos de fecha objetivo: Auto-ajustan el riesgo basado en tu año de jubilación",
              "type": "info"
            },
            {
              "text": "Fondos indexados: Exposición diversificada de bajo costo al mercado amplio",
              "type": "info"
            },
            {
              "text": "Fondos de bonos: Menor riesgo, renta fija para asignación conservadora",
              "type": "info"
            },
            {
              "text": "Acciones de la empresa: Alto riesgo si está concentrado — diversifica más allá de tu empleador",
              "type": "warning"
            },
            {
              "text": "Mercado monetario: Muy bajo riesgo, bajo rendimiento — solo para seguridad a corto plazo",
              "type": "info"
            },
            {
              "text": "Las tasas de gastos importan: Incluso 0.5% de diferencia en comisiones cuesta decenas de miles en décadas",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Crecimiento del 401(k)",
          "description": "Ve cómo diferentes niveles de contribución impactan tus ahorros de jubilación",
          "examples": [
            {
              "title": "Empezando a los 25 con contribución del 10%",
              "steps": [
                "25 años • Salario: $60,000 • Contribución: 10% = $6,000/año",
                "Aportación del empleador: 50% hasta 6% = $1,800/año",
                "Inversión anual total: $7,800",
                "Al 7% de rendimiento anual durante 40 años",
                "Saldo a los 65: ~$1,620,000"
              ],
              "result": "Empezar temprano con un salario modesto construye un fondo de $1.6M+"
            },
            {
              "title": "Empezando a los 40 con contribución del 15%",
              "steps": [
                "40 años • Salario: $90,000 • Contribución: 15% = $13,500/año",
                "Aportación del empleador: 50% hasta 6% = $2,700/año",
                "Inversión anual total: $16,200",
                "Al 7% de rendimiento anual durante 25 años",
                "Saldo a los 65: ~$1,060,000"
              ],
              "result": "Empezar más tarde requiere contribuciones mayores pero aún alcanza $1M+"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuánto debo contribuir a mi 401(k)?",
          "answer": "Como mínimo, contribuye lo suficiente para obtener tu aportación completa del empleador — cualquier cosa menor significa que estás dejando dinero gratis sobre la mesa. Idealmente, apunta al 10-15% de tu salario. Si no puedes alcanzar eso de inmediato, comienza con lo que puedas permitirte y aumenta 1% cada año hasta alcanzar tu objetivo."
        },
        {
          "question": "¿Qué pasa con mi 401(k) si cambio de trabajo?",
          "answer": "Tienes varias opciones: dejarlo con tu empleador anterior (si el saldo es mayor a $5,000), transferirlo al 401(k) de tu nuevo empleador, transferirlo a un IRA para más opciones de inversión, o cobrarlo (no recomendado debido a impuestos y la penalidad del 10% por retiro temprano). Las transferencias son libres de impuestos cuando se hacen correctamente."
        },
        {
          "question": "¿Qué son las contribuciones de recuperación?",
          "answer": "Si tienes 50 años o más, el IRS permite contribuciones extra por encima del límite estándar. Para 2026, el monto de recuperación es $8,000 (total $32,500). Una nueva 'súper recuperación' para edades 60-63 permite $11,250 extra (total $35,750). Esto ayuda a personas que empezaron a ahorrar tarde a acelerar sus ahorros de jubilación."
        },
        {
          "question": "¿Qué es una RMD (Distribución Mínima Requerida)?",
          "answer": "Comenzando a los 73 años (o 75 si naciste en 1960 o después), el IRS requiere que retires un monto mínimo de tu 401(k) tradicional cada año. El monto se calcula basado en tu saldo de cuenta y expectativa de vida. Fallar en tomar tu RMD resulta en una penalidad del 25% sobre el monto que deberías haber retirado."
        },
        {
          "question": "¿Puedo retirar de mi 401(k) antes de los 59½?",
          "answer": "Sí, pero generalmente deberás impuestos sobre la renta más una penalidad del 10% por retiro temprano. Las excepciones incluyen discapacidad, ciertos gastos médicos, órdenes de relaciones domésticas calificadas, y la Regla de 55 (retiros sin penalidad si dejas tu trabajo a los 55 o después). Los retiros por dificultades también pueden estar disponibles pero aún incurren impuestos."
        },
        {
          "question": "¿Cómo funciona realmente la aportación del empleador?",
          "answer": "Tu empleador contribuye dinero adicional basado en cuánto contribuyes tú. Por ejemplo, 'aportación del 50% hasta 6%' significa que si contribuyes 6% de tu salario de $80,000 ($4,800), tu empleador agrega 50% de eso ($2,400). Si solo contribuyes 3%, igualan $1,200 — estarías dejando $1,200 de dinero gratis sobre la mesa cada año."
        },
        {
          "question": "¿Qué tasa de rendimiento debo esperar de mi 401(k)?",
          "answer": "Históricamente, un portafolio diversificado con 60% acciones y 40% bonos ha retornado aproximadamente 7-8% anualmente antes de inflación. El S&P 500 solo ha promediado cerca del 10% a largo plazo. Para planificación conservadora, usar 6-7% es prudente. Los rendimientos reales dependen de tu asignación de inversión, comisiones y condiciones del mercado."
        },
        {
          "question": "¿Puedo usar esta calculadora para planes 401(k) fuera de EE.UU.?",
          "answer": "Mientras esta calculadora está diseñada para planes 401(k) de EE.UU., las matemáticas de crecimiento compuesto aplican a cualquier plan de jubilación de contribución definida. Puedes usarla para planes similares en otros países ajustando los límites de contribución y estructura de aportación. La función multi-moneda soporta 32 monedas para usuarios globales."
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
      "name": "Calculadora 401(k)",
      "slug": "calculadora-401k",
      "subtitle": "Estime o saldo do seu 401(k) na aposentadoria com contribuição patronal, crescimento salarial e inflação — veja como suas economias crescem ao longo do tempo.",
      "breadcrumb": "Calc 401(k)",
      "seo": {
        "title": "Calculadora 401(k) - Estimador de Poupança e Crescimento para Aposentadoria",
        "description": "Estime o saldo do seu 401(k) na aposentadoria com contribuição patronal, contribuições de recuperação, crescimento salarial e ajuste de inflação. Ferramenta gratuita multi-moeda com detalhamento ano a ano.",
        "shortDescription": "Estime o saldo da sua aposentadoria 401(k) com contribuição patronal e projeções de crescimento.",
        "keywords": [
          "calculadora 401k",
          "calculadora aposentadoria",
          "crescimento 401k",
          "calculadora contribuição patronal",
          "poupança aposentadoria",
          "contribuição 401k",
          "planejamento aposentadoria",
          "contribuições recuperação"
        ]
      },
      "inputs": {
        "currentAge": {
          "label": "Idade Atual",
          "helpText": "Sua idade atual — quanto mais cedo você começar a poupar, mais tempo o crescimento composto terá para funcionar"
        },
        "retirementAge": {
          "label": "Idade de Aposentadoria",
          "helpText": "Idade que você planeja se aposentar — os benefícios completos da Previdência Social começam aos 67 anos para a maioria das pessoas"
        },
        "annualSalary": {
          "label": "Salário Anual",
          "helpText": "Sua renda anual bruta atual antes dos impostos — usada para calcular o valor da sua contribuição"
        },
        "currentBalance": {
          "label": "Saldo Atual do 401(k)",
          "helpText": "Quanto você tem economizado atualmente na sua conta 401(k) — verifique seu extrato mais recente"
        },
        "contributionPercent": {
          "label": "Sua Contribuição",
          "helpText": "Porcentagem do seu salário que você contribui a cada ano — procure pelo menos o suficiente para obter a contribuição patronal completa"
        },
        "includeEmployerMatch": {
          "label": "Contribuição Patronal",
          "helpText": "Ative se seu empregador iguala uma parte das suas contribuições 401(k) — isso é dinheiro gratuito"
        },
        "employerMatchPercent": {
          "label": "Taxa de Contrapartida",
          "helpText": "Quanto seu empregador iguala — 50% significa que eles adicionam $0,50 para cada $1 que você contribui, 100% significa equivalência total"
        },
        "employerMatchLimit": {
          "label": "Limite de Contrapartida (% do Salário)",
          "helpText": "Porcentagem máxima do seu salário que seu empregador irá igualar — tipicamente 3% a 6% do salário"
        },
        "rateOfReturn": {
          "label": "Taxa de Retorno Esperada",
          "helpText": "Retorno médio anual de investimento — historicamente o S&P 500 tem média de ~10%, mas 6-8% é mais conservador"
        },
        "includeSalaryGrowth": {
          "label": "Crescimento Salarial",
          "helpText": "Ative para considerar aumentos anuais — suas contribuições crescem conforme seu salário aumenta"
        },
        "annualSalaryIncrease": {
          "label": "Aumento Salarial Anual",
          "helpText": "Porcentagem esperada de aumento anual — a média é 3%, mas varia por setor e desempenho"
        },
        "includeInflation": {
          "label": "Ajustar para Inflação",
          "helpText": "Ative para ver seu saldo no poder de compra atual — mostra o que suas economias realmente valem"
        },
        "inflationRate": {
          "label": "Taxa de Inflação Esperada",
          "helpText": "Inflação média anual — historicamente cerca de 2-3% nos EUA, mas tem estado mais alta recentemente"
        }
      },
      "presets": {
        "youngSaver": {
          "label": "Jovem Poupador",
          "description": "25 anos, salário $55K, contribuição 8%"
        },
        "midCareer": {
          "label": "Meio da Carreira",
          "description": "40 anos, salário $95K, contribuição 12%"
        },
        "lateStart": {
          "label": "Início Tardio",
          "description": "50 anos, salário $85K, contribuição 15%"
        },
        "aggressiveSaver": {
          "label": "Agressivo",
          "description": "30 anos, salário $120K, contribuição 20%"
        }
      },
      "values": {
        "years": "anos",
        "year": "ano",
        "months": "meses",
        "month": "mês",
        "monthly": "/mês",
        "perYear": "/ano"
      },
      "formats": {
        "summary": "Aos {retirementAge} anos, seu 401(k) pode crescer para {balanceAtRetirement}. Você terá contribuído {totalContributions} com {totalEmployerMatch} em contribuição patronal e {totalGrowth} em crescimento de investimento."
      },
      "results": {
        "balanceAtRetirement": {
          "label": "Saldo na Aposentadoria"
        },
        "totalContributions": {
          "label": "Suas Contribuições Totais"
        },
        "totalEmployerMatch": {
          "label": "Total da Contribuição Patronal"
        },
        "totalGrowth": {
          "label": "Crescimento do Investimento"
        },
        "monthlyRetirementIncome": {
          "label": "Renda Mensal Estimada"
        },
        "annualTaxSavings": {
          "label": "Economia Anual de Impostos (Atual)"
        },
        "freeMoneyFromMatch": {
          "label": "Dinheiro Gratuito do Empregador"
        },
        "inflationAdjustedBalance": {
          "label": "Saldo Ajustado pela Inflação"
        }
      },
      "infoCards": {
        "snapshot": {
          "title": "Panorama da Aposentadoria",
          "items": [
            {
              "label": "Saldo na Aposentadoria",
              "valueKey": "balanceAtRetirement"
            },
            {
              "label": "Renda Mensal na Aposentadoria",
              "valueKey": "monthlyRetirementIncome"
            },
            {
              "label": "Anos de Aposentadoria Financiados",
              "valueKey": "yearsFunded"
            },
            {
              "label": "Valor Total Investido",
              "valueKey": "totalInvested"
            }
          ]
        },
        "breakdown": {
          "title": "Detalhamento das Contribuições",
          "items": [
            {
              "label": "Sua Contribuição Anual",
              "valueKey": "annualContribution"
            },
            {
              "label": "Contribuição Patronal Anual",
              "valueKey": "annualEmployerMatch"
            },
            {
              "label": "Economia Anual de Impostos",
              "valueKey": "annualTaxSavings"
            },
            {
              "label": "Dinheiro Gratuito Deixado na Mesa",
              "valueKey": "freeMoneyLeftOnTable"
            },
            {
              "label": "Elegível para Recuperação (50+)",
              "valueKey": "catchUpEligible"
            }
          ]
        },
        "tips": {
          "title": "Dicas do 401(k)",
          "items": [
            "Sempre contribua o suficiente para obter a contribuição patronal completa — é um retorno instantâneo de 50-100% sobre seu dinheiro que você não pode encontrar em nenhum outro lugar.",
            "Começar aos 25 vs 35 com as mesmas contribuições pode significar 2x mais na aposentadoria graças ao crescimento composto — o tempo é seu ativo mais poderoso.",
            "Após os 50 anos, contribuições de recuperação permitem adicionar até $7.500 extras por ano (limites de 2025) — idades 60-63 recebem uma super recuperação ainda maior de $11.250.",
            "Considere aumentar sua contribuição em 1% a cada ano quando receber um aumento — você não sentirá a diferença, mas se acumula em centenas de milhares ao longo do tempo."
          ]
        }
      },
      "chart": {
        "title": "Crescimento do 401(k) ao Longo do Tempo",
        "xLabel": "Idade",
        "yLabel": "Saldo",
        "series": {
          "yourContributions": "Suas Contribuições",
          "employerMatch": "Contribuição Patronal",
          "investmentGrowth": "Crescimento do Investimento"
        }
      },
      "detailedTable": {
        "growthSchedule": {
          "button": "Ver Detalhamento Ano a Ano",
          "title": "Cronograma de Crescimento do 401(k)",
          "columns": {
            "age": "Idade",
            "salary": "Salário",
            "yourContribution": "Sua Contribuição",
            "employerMatch": "Contribuição Patronal",
            "growth": "Crescimento",
            "balance": "Saldo"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é um 401(k)?",
          "content": "Um 401(k) é um plano de poupança para aposentadoria patrocinado pelo empregador que permite contribuir uma parte do seu salário antes dos impostos para uma conta de investimento com diferimento fiscal. Suas contribuições reduzem sua renda tributável atual, e seus investimentos crescem livres de impostos até você retirá-los na aposentadoria. Muitos empregadores também igualam uma porcentagem das suas contribuições, fornecendo essencialmente dinheiro gratuito para sua aposentadoria. O plano recebe seu nome da seção 401(k) do Código de Receita Interna, e continua sendo o veículo de poupança para aposentadoria do setor privado mais popular nos Estados Unidos, com mais de 70 milhões de participantes ativos."
        },
        "employerMatch": {
          "title": "Entendendo a Contribuição Patronal",
          "content": "A contribuição patronal é um dos benefícios mais valiosos de um 401(k). Uma estrutura comum é 50% de contrapartida em contribuições até 6% do salário — significando que se você ganha $80.000 e contribui 6% ($4.800), seu empregador adiciona $2.400. Alguns empregadores igualam dólar por dólar, efetivamente dobrando suas contribuições até o limite. Não contribuir o suficiente para capturar a contrapartida completa é literalmente deixar dinheiro gratuito na mesa. Cronogramas de aquisição podem se aplicar, significando que você pode precisar ficar na empresa por um certo número de anos para manter 100% das contribuições do empregador."
        },
        "contributionLimits": {
          "title": "Limites de Contribuição 2026",
          "items": [
            {
              "text": "Abaixo de 50: Limite de contribuição anual de funcionário de $24.500",
              "type": "info"
            },
            {
              "text": "Idades 50-59 & 64+: Adicional de $8.000 de recuperação ($32.500 total)",
              "type": "info"
            },
            {
              "text": "Idades 60-63: Super recuperação de $11.250 ($35.750 total)",
              "type": "warning"
            },
            {
              "text": "Limite combinado total (funcionário + empregador): $72.000",
              "type": "info"
            },
            {
              "text": "Contribuição patronal NÃO conta para seu limite de funcionário de $24.500",
              "type": "info"
            },
            {
              "text": "Limites de contribuição aumentam anualmente com a inflação",
              "type": "info"
            }
          ]
        },
        "investmentOptions": {
          "title": "Opções de Investimento",
          "items": [
            {
              "text": "Fundos de data-alvo: Ajustam automaticamente o risco baseado no seu ano de aposentadoria",
              "type": "info"
            },
            {
              "text": "Fundos de índice: Baixo custo, exposição diversificada ao mercado amplo",
              "type": "info"
            },
            {
              "text": "Fundos de títulos: Menor risco, renda fixa para alocação conservadora",
              "type": "info"
            },
            {
              "text": "Ações da empresa: Alto risco se concentrado — diversifique além do seu empregador",
              "type": "warning"
            },
            {
              "text": "Mercado monetário: Risco muito baixo, baixo retorno — apenas para segurança de curto prazo",
              "type": "info"
            },
            {
              "text": "Taxas de despesa importam: Mesmo 0,5% de diferença em taxas custa dezenas de milhares ao longo de décadas",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Crescimento do 401(k)",
          "description": "Veja como diferentes níveis de contribuição impactam suas economias de aposentadoria",
          "examples": [
            {
              "title": "Começando aos 25 com contribuição de 10%",
              "steps": [
                "25 anos • Salário: $60.000 • Contribuição: 10% = $6.000/ano",
                "Contribuição patronal: 50% até 6% = $1.800/ano",
                "Investimento anual total: $7.800",
                "Com retorno anual de 7% ao longo de 40 anos",
                "Saldo aos 65: ~$1.620.000"
              ],
              "result": "Começar cedo com um salário modesto constrói um pé-de-meia de $1,6M+"
            },
            {
              "title": "Começando aos 40 com contribuição de 15%",
              "steps": [
                "40 anos • Salário: $90.000 • Contribuição: 15% = $13.500/ano",
                "Contribuição patronal: 50% até 6% = $2.700/ano",
                "Investimento anual total: $16.200",
                "Com retorno anual de 7% ao longo de 25 anos",
                "Saldo aos 65: ~$1.060.000"
              ],
              "result": "Começar mais tarde requer contribuições maiores, mas ainda alcança $1M+"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quanto devo contribuir para meu 401(k)?",
          "answer": "No mínimo, contribua o suficiente para obter sua contribuição patronal completa — qualquer coisa menos significa que você está deixando dinheiro gratuito na mesa. Idealmente, procure 10-15% do seu salário. Se você não conseguir atingir isso imediatamente, comece com o que puder pagar e aumente 1% a cada ano até atingir sua meta."
        },
        {
          "question": "O que acontece com meu 401(k) se eu mudar de emprego?",
          "answer": "Você tem várias opções: deixá-lo com seu ex-empregador (se o saldo for superior a $5.000), transferi-lo para o 401(k) do seu novo empregador, transferi-lo para um IRA para mais opções de investimento, ou sacá-lo (não recomendado devido aos impostos e multa de 10% por saque antecipado). Transferências são livres de impostos quando feitas corretamente."
        },
        {
          "question": "O que são contribuições de recuperação?",
          "answer": "Se você tem 50 anos ou mais, o IRS permite contribuições extras acima do limite padrão. Para 2026, o valor de recuperação é $8.000 (total $32.500). Uma nova 'super recuperação' para idades 60-63 permite um extra de $11.250 (total $35.750). Isso ajuda pessoas que começaram a poupar mais tarde a acelerar suas economias de aposentadoria."
        },
        {
          "question": "O que é uma RMD (Distribuição Mínima Obrigatória)?",
          "answer": "Começando aos 73 anos (ou 75 se nascido em 1960 ou depois), o IRS exige que você retire um valor mínimo do seu 401(k) tradicional a cada ano. O valor é calculado baseado no saldo da sua conta e expectativa de vida. Falhar em fazer sua RMD resulta em multa de 25% sobre o valor que você deveria ter retirado."
        },
        {
          "question": "Posso retirar do meu 401(k) antes dos 59½ anos?",
          "answer": "Sim, mas você geralmente deve imposto de renda mais multa de 10% por saque antecipado. Exceções incluem invalidez, certas despesas médicas, ordens de relações domésticas qualificadas, e a Regra dos 55 (saques sem multa se você deixar seu emprego aos 55 anos ou depois). Saques por dificuldades também podem estar disponíveis, mas ainda incorrem em impostos."
        },
        {
          "question": "Como funciona a contribuição patronal?",
          "answer": "Seu empregador contribui dinheiro adicional baseado em quanto você contribui. Por exemplo, '50% de contrapartida até 6%' significa que se você contribuir 6% do seu salário de $80.000 ($4.800), seu empregador adiciona 50% disso ($2.400). Se você contribuir apenas 3%, eles igualam $1.200 — você estaria deixando $1.200 de dinheiro gratuito na mesa a cada ano."
        },
        {
          "question": "Que taxa de retorno devo esperar do meu 401(k)?",
          "answer": "Historicamente, um portfólio diversificado com 60% ações e 40% títulos retornou aproximadamente 7-8% anualmente antes da inflação. O S&P 500 sozinho teve média de cerca de 10% no longo prazo. Para planejamento conservador, usar 6-7% é prudente. Retornos reais dependem da sua alocação de investimento, taxas e condições de mercado."
        },
        {
          "question": "Posso usar esta calculadora para planos 401(k) fora dos EUA?",
          "answer": "Embora esta calculadora seja projetada para planos 401(k) dos EUA, a matemática de crescimento composto se aplica a qualquer plano de aposentadoria de contribuição definida. Você pode usá-la para planos similares em outros países ajustando os limites de contribuição e estrutura de contrapartida. O recurso multi-moeda suporta 32 moedas para usuários globais."
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
      "name": "Calculateur 401(k)",
      "slug": "calculateur-401k",
      "subtitle": "Estimez votre solde 401(k) à la retraite avec la contrepartie employeur, la croissance salariale et l'inflation — voyez comment votre épargne évolue dans le temps.",
      "breadcrumb": "Calc 401(k)",
      "seo": {
        "title": "Calculateur 401(k) - Estimateur d'Épargne et Croissance Retraite",
        "description": "Estimez votre solde 401(k) à la retraite avec la contrepartie employeur, les contributions de rattrapage, la croissance salariale et l'ajustement inflation. Outil multi-devises gratuit avec répartition année par année.",
        "shortDescription": "Estimez votre solde retraite 401(k) avec contrepartie employeur et projections de croissance.",
        "keywords": [
          "calculateur 401k",
          "calculateur retraite",
          "croissance 401k",
          "calculateur contrepartie employeur",
          "épargne retraite",
          "contribution 401k",
          "planification retraite",
          "contributions rattrapage"
        ]
      },
      "inputs": {
        "currentAge": {
          "label": "Âge Actuel",
          "helpText": "Votre âge actuel — plus tôt vous commencez à épargner, plus la croissance composée a de temps pour agir"
        },
        "retirementAge": {
          "label": "Âge de Retraite",
          "helpText": "Âge auquel vous planifiez prendre votre retraite — les prestations complètes de Sécurité Sociale commencent à 67 ans pour la plupart"
        },
        "annualSalary": {
          "label": "Salaire Annuel",
          "helpText": "Votre revenu annuel brut actuel avant impôts — utilisé pour calculer le montant de votre contribution"
        },
        "currentBalance": {
          "label": "Solde 401(k) Actuel",
          "helpText": "Montant actuellement épargné dans votre compte 401(k) — vérifiez votre dernier relevé"
        },
        "contributionPercent": {
          "label": "Votre Contribution",
          "helpText": "Pourcentage de votre salaire que vous cotisez chaque année — visez au moins assez pour obtenir la contrepartie employeur complète"
        },
        "includeEmployerMatch": {
          "label": "Contrepartie Employeur",
          "helpText": "Activez si votre employeur égale une portion de vos contributions 401(k) — c'est de l'argent gratuit"
        },
        "employerMatchPercent": {
          "label": "Taux de Contrepartie",
          "helpText": "Montant égalé par votre employeur — 50% signifie qu'ils ajoutent 0,50$ pour chaque 1$ que vous cotisez, 100% signifie dollar pour dollar"
        },
        "employerMatchLimit": {
          "label": "Limite Contrepartie (% du Salaire)",
          "helpText": "Pourcentage maximum de votre salaire que votre employeur égalera — typiquement 3% à 6% du salaire"
        },
        "rateOfReturn": {
          "label": "Taux de Rendement Attendu",
          "helpText": "Rendement d'investissement annuel moyen — historiquement le S&P 500 moyenne ~10%, mais 6-8% est plus conservateur"
        },
        "includeSalaryGrowth": {
          "label": "Croissance Salariale",
          "helpText": "Activez pour tenir compte des augmentations annuelles — vos contributions augmentent avec votre salaire"
        },
        "annualSalaryIncrease": {
          "label": "Augmentation Salariale Annuelle",
          "helpText": "Pourcentage d'augmentation annuelle attendu — la moyenne est 3% mais varie selon l'industrie et la performance"
        },
        "includeInflation": {
          "label": "Ajuster pour l'Inflation",
          "helpText": "Activez pour voir votre solde en pouvoir d'achat d'aujourd'hui — montre ce que votre épargne vaut réellement"
        },
        "inflationRate": {
          "label": "Taux d'Inflation Attendu",
          "helpText": "Inflation annuelle moyenne — historiquement autour de 2-3% aux États-Unis, mais a été plus élevée récemment"
        }
      },
      "presets": {
        "youngSaver": {
          "label": "Jeune Épargnant",
          "description": "Âge 25, salaire 55K$, contribution 8%"
        },
        "midCareer": {
          "label": "Milieu de Carrière",
          "description": "Âge 40, salaire 95K$, contribution 12%"
        },
        "lateStart": {
          "label": "Début Tardif",
          "description": "Âge 50, salaire 85K$, contribution 15%"
        },
        "aggressiveSaver": {
          "label": "Agressif",
          "description": "Âge 30, salaire 120K$, contribution 20%"
        }
      },
      "values": {
        "years": "ans",
        "year": "an",
        "months": "mois",
        "month": "mois",
        "monthly": "/mois",
        "perYear": "/an"
      },
      "formats": {
        "summary": "À {retirementAge} ans, votre 401(k) pourrait atteindre {balanceAtRetirement}. Vous aurez cotisé {totalContributions} avec {totalEmployerMatch} en contrepartie employeur et {totalGrowth} en croissance d'investissement."
      },
      "results": {
        "balanceAtRetirement": {
          "label": "Solde à la Retraite"
        },
        "totalContributions": {
          "label": "Vos Contributions Totales"
        },
        "totalEmployerMatch": {
          "label": "Total Contrepartie Employeur"
        },
        "totalGrowth": {
          "label": "Croissance d'Investissement"
        },
        "monthlyRetirementIncome": {
          "label": "Revenu Mensuel Estimé"
        },
        "annualTaxSavings": {
          "label": "Économies Fiscales Annuelles (Actuelles)"
        },
        "freeMoneyFromMatch": {
          "label": "Argent Gratuit de l'Employeur"
        },
        "inflationAdjustedBalance": {
          "label": "Solde Ajusté à l'Inflation"
        }
      },
      "infoCards": {
        "snapshot": {
          "title": "Aperçu Retraite",
          "items": [
            {
              "label": "Solde à la Retraite",
              "valueKey": "balanceAtRetirement"
            },
            {
              "label": "Revenu Mensuel de Retraite",
              "valueKey": "monthlyRetirementIncome"
            },
            {
              "label": "Années de Retraite Financées",
              "valueKey": "yearsFunded"
            },
            {
              "label": "Montant Total Investi",
              "valueKey": "totalInvested"
            }
          ]
        },
        "breakdown": {
          "title": "Répartition des Contributions",
          "items": [
            {
              "label": "Votre Contribution Annuelle",
              "valueKey": "annualContribution"
            },
            {
              "label": "Contrepartie Employeur Annuelle",
              "valueKey": "annualEmployerMatch"
            },
            {
              "label": "Économies Fiscales Annuelles",
              "valueKey": "annualTaxSavings"
            },
            {
              "label": "Argent Gratuit Laissé sur Table",
              "valueKey": "freeMoneyLeftOnTable"
            },
            {
              "label": "Éligible au Rattrapage (50+)",
              "valueKey": "catchUpEligible"
            }
          ]
        },
        "tips": {
          "title": "Conseils 401(k)",
          "items": [
            "Cotisez toujours assez pour obtenir la contrepartie employeur complète — c'est un rendement instantané de 50-100% sur votre argent qu'on ne peut battre nulle part ailleurs.",
            "Commencer à 25 vs 35 ans avec les mêmes contributions peut signifier 2x plus à la retraite grâce à la croissance composée — le temps est votre atout le plus puissant.",
            "Après 50 ans, les contributions de rattrapage permettent d'ajouter jusqu'à 7 500$ supplémentaires par an (limites 2025) — les âges 60-63 bénéficient d'un super rattrapage encore plus élevé de 11 250$.",
            "Considérez augmenter votre contribution de 1% chaque année lors d'une augmentation — vous ne sentirez pas la différence mais cela s'additionne à des centaines de milliers au fil du temps."
          ]
        }
      },
      "chart": {
        "title": "Croissance 401(k) au Fil du Temps",
        "xLabel": "Âge",
        "yLabel": "Solde",
        "series": {
          "yourContributions": "Vos Contributions",
          "employerMatch": "Contrepartie Employeur",
          "investmentGrowth": "Croissance d'Investissement"
        }
      },
      "detailedTable": {
        "growthSchedule": {
          "button": "Voir la Répartition Année par Année",
          "title": "Calendrier de Croissance 401(k)",
          "columns": {
            "age": "Âge",
            "salary": "Salaire",
            "yourContribution": "Votre Contribution",
            "employerMatch": "Contrepartie Employeur",
            "growth": "Croissance",
            "balance": "Solde"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un 401(k) ?",
          "content": "Un 401(k) est un régime d'épargne-retraite parrainé par l'employeur qui vous permet de cotiser une portion de votre salaire avant impôts à un compte d'investissement à imposition différée. Vos contributions réduisent votre revenu imposable actuel, et vos investissements croissent libres d'impôt jusqu'à ce que vous les retiriez à la retraite. Plusieurs employeurs égalent aussi un pourcentage de vos contributions, fournissant essentiellement de l'argent gratuit pour votre retraite. Le régime tire son nom de la section 401(k) du Code des Revenus Internes, et demeure le véhicule d'épargne-retraite du secteur privé le plus populaire aux États-Unis, avec plus de 70 millions de participants actifs."
        },
        "employerMatch": {
          "title": "Comprendre la Contrepartie Employeur",
          "content": "La contrepartie employeur est l'un des avantages les plus précieux d'un 401(k). Une structure commune est une contrepartie de 50% sur les contributions jusqu'à 6% du salaire — signifiant si vous gagnez 80 000$ et cotisez 6% (4 800$), votre employeur ajoute 2 400$. Certains employeurs égalent dollar pour dollar, doublant effectivement vos contributions jusqu'à la limite. Ne pas cotiser assez pour capturer la contrepartie complète revient littéralement à laisser de l'argent gratuit sur la table. Des calendriers d'acquisition peuvent s'appliquer, signifiant vous pourriez devoir rester avec l'entreprise un certain nombre d'années pour garder 100% des contributions employeur."
        },
        "contributionLimits": {
          "title": "Limites de Contribution 2026",
          "items": [
            {
              "text": "Moins de 50 ans : Limite de contribution employé annuelle de 24 500$",
              "type": "info"
            },
            {
              "text": "Âges 50-59 et 64+ : Rattrapage additionnel de 8 000$ (32 500$ total)",
              "type": "info"
            },
            {
              "text": "Âges 60-63 : Super rattrapage de 11 250$ (35 750$ total)",
              "type": "warning"
            },
            {
              "text": "Limite combinée totale (employé + employeur) : 72 000$",
              "type": "info"
            },
            {
              "text": "La contrepartie employeur ne compte PAS vers votre limite employé de 24 500$",
              "type": "info"
            },
            {
              "text": "Les limites de contribution augmentent annuellement avec l'inflation",
              "type": "info"
            }
          ]
        },
        "investmentOptions": {
          "title": "Options d'Investissement",
          "items": [
            {
              "text": "Fonds à date cible : Ajustent automatiquement le risque selon votre année de retraite",
              "type": "info"
            },
            {
              "text": "Fonds indiciels : Exposition diversifiée à faible coût au marché large",
              "type": "info"
            },
            {
              "text": "Fonds obligataires : Risque plus faible, revenu fixe pour allocation conservatrice",
              "type": "info"
            },
            {
              "text": "Actions d'entreprise : Risque élevé si concentrées — diversifiez au-delà de votre employeur",
              "type": "warning"
            },
            {
              "text": "Marché monétaire : Très faible risque, faible rendement — seulement pour sécurité à court terme",
              "type": "info"
            },
            {
              "text": "Les ratios de dépenses comptent : Même 0,5% de différence en frais coûte des dizaines de milliers sur des décennies",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Croissance 401(k)",
          "description": "Voyez comment différents niveaux de contribution impactent votre épargne-retraite",
          "examples": [
            {
              "title": "Commencer à 25 ans avec contribution de 10%",
              "steps": [
                "Âge 25 • Salaire : 60 000$ • Contribution : 10% = 6 000$/an",
                "Contrepartie employeur : 50% jusqu'à 6% = 1 800$/an",
                "Investissement annuel total : 7 800$",
                "À 7% de rendement annuel sur 40 ans",
                "Solde à 65 ans : ~1 620 000$"
              ],
              "result": "Commencer tôt avec un salaire modeste construit un pécule de 1,6M$+"
            },
            {
              "title": "Commencer à 40 ans avec contribution de 15%",
              "steps": [
                "Âge 40 • Salaire : 90 000$ • Contribution : 15% = 13 500$/an",
                "Contrepartie employeur : 50% jusqu'à 6% = 2 700$/an",
                "Investissement annuel total : 16 200$",
                "À 7% de rendement annuel sur 25 ans",
                "Solde à 65 ans : ~1 060 000$"
              ],
              "result": "Commencer plus tard nécessite des contributions plus élevées mais atteint toujours 1M$+"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien devrais-je cotiser à mon 401(k) ?",
          "answer": "Au minimum, cotisez assez pour obtenir votre contrepartie employeur complète — moins signifie que vous laissez de l'argent gratuit sur la table. Idéalement, visez 10-15% de votre salaire. Si vous ne pouvez atteindre cela tout de suite, commencez avec ce que vous pouvez vous permettre et augmentez de 1% chaque année jusqu'à atteindre votre cible."
        },
        {
          "question": "Qu'arrive-t-il à mon 401(k) si je change d'emploi ?",
          "answer": "Vous avez plusieurs options : le laisser chez votre ancien employeur (si le solde dépasse 5 000$), le transférer au 401(k) de votre nouvel employeur, le transférer dans un IRA pour plus de choix d'investissement, ou l'encaisser (non recommandé à cause des impôts et de la pénalité de retrait anticipé de 10%). Les transferts sont libres d'impôt quand faits correctement."
        },
        {
          "question": "Que sont les contributions de rattrapage ?",
          "answer": "Si vous avez 50 ans ou plus, l'IRS permet des contributions supplémentaires au-delà de la limite standard. Pour 2026, le montant de rattrapage est 8 000$ (total 32 500$). Un nouveau 'super rattrapage' pour les âges 60-63 permet 11 250$ supplémentaires (total 35 750$). Ceci aide les gens qui ont commencé à épargner tard à accélérer leur épargne-retraite."
        },
        {
          "question": "Qu'est-ce qu'une DMR (Distribution Minimale Requise) ?",
          "answer": "À partir de 73 ans (ou 75 si né en 1960 ou plus tard), l'IRS exige que vous retiriez un montant minimum de votre 401(k) traditionnel chaque année. Le montant est calculé selon votre solde de compte et espérance de vie. Omettre de prendre votre DMR résulte en une pénalité de 25% sur le montant que vous auriez dû retirer."
        },
        {
          "question": "Puis-je retirer de mon 401(k) avant 59½ ans ?",
          "answer": "Oui, mais vous devrez généralement l'impôt sur le revenu plus une pénalité de retrait anticipé de 10%. Les exceptions incluent l'invalidité, certaines dépenses médicales, les ordonnances de relations domestiques qualifiées, et la Règle de 55 (retraits sans pénalité si vous quittez votre emploi à 55 ans ou plus tard). Les retraits de difficultés peuvent aussi être disponibles mais encourent toujours des impôts."
        },
        {
          "question": "Comment fonctionne réellement la contrepartie employeur ?",
          "answer": "Votre employeur cotise de l'argent supplémentaire selon combien vous cotisez. Par exemple, 'contrepartie de 50% jusqu'à 6%' signifie si vous cotisez 6% de votre salaire de 80 000$ (4 800$), votre employeur ajoute 50% de cela (2 400$). Si vous cotisez seulement 3%, ils égalent 1 200$ — vous laisseriez 1 200$ d'argent gratuit sur la table chaque année."
        },
        {
          "question": "Quel taux de rendement devrais-je attendre de mon 401(k) ?",
          "answer": "Historiquement, un portefeuille diversifié avec 60% d'actions et 40% d'obligations a rapporté approximativement 7-8% annuellement avant inflation. Le S&P 500 seul a fait une moyenne d'environ 10% à long terme. Pour une planification conservatrice, utiliser 6-7% est prudent. Les rendements réels dépendent de votre allocation d'investissement, frais, et conditions de marché."
        },
        {
          "question": "Puis-je utiliser ce calculateur pour des régimes 401(k) hors États-Unis ?",
          "answer": "Bien que ce calculateur soit conçu pour les régimes 401(k) américains, les mathématiques de croissance composée s'appliquent à tout régime de retraite à cotisations définies. Vous pouvez l'utiliser pour des régimes similaires dans d'autres pays en ajustant les limites de contribution et structure de contrepartie. La fonctionnalité multi-devises supporte 32 devises pour les utilisateurs mondiaux."
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
      "name": "401(k) Rechner",
      "slug": "viernulleinskommensteueraufgeschobener-rentensparplan-rechner",
      "subtitle": "Schätzen Sie Ihr 401(k) Guthaben bei der Rente mit Arbeitgeberzuschuss, Gehaltswachstum und Inflation — sehen Sie, wie Ihre Ersparnisse über die Zeit wachsen.",
      "breadcrumb": "401(k) Rechner",
      "seo": {
        "title": "401(k) Rechner - Rentenersparnis & Wachstumsschätzer",
        "description": "Schätzen Sie Ihr 401(k) Guthaben bei der Rente mit Arbeitgeberzuschuss, Aufholbeiträgen, Gehaltswachstum und Inflationsanpassung. Kostenloses Multi-Währungs-Tool mit Jahr-für-Jahr Aufschlüsselung.",
        "shortDescription": "Schätzen Sie Ihr 401(k) Rentenguthaben mit Arbeitgeberzuschuss und Wachstumsprognosen.",
        "keywords": [
          "401k rechner",
          "rentenrechner",
          "401k wachstum",
          "arbeitgeberzuschuss rechner",
          "rentenersparnisse",
          "401k beitrag",
          "rentenplanung",
          "aufholbeiträge"
        ]
      },
      "inputs": {
        "currentAge": {
          "label": "Aktuelles Alter",
          "helpText": "Ihr aktuelles Alter — je früher Sie mit dem Sparen beginnen, desto mehr Zeit hat das Zinseszinswachstum zu wirken"
        },
        "retirementAge": {
          "label": "Rentenalter",
          "helpText": "Alter, in dem Sie in Rente gehen möchten — volle Sozialversicherungsleistungen beginnen bei 67 für die meisten Menschen"
        },
        "annualSalary": {
          "label": "Jahresgehalt",
          "helpText": "Ihr aktuelles jährliches Bruttoeinkommen vor Steuern — wird zur Berechnung Ihres Beitragsbetrags verwendet"
        },
        "currentBalance": {
          "label": "Aktuelles 401(k) Guthaben",
          "helpText": "Wie viel Sie derzeit in Ihrem 401(k) Konto gespart haben — prüfen Sie Ihren neuesten Kontoauszug"
        },
        "contributionPercent": {
          "label": "Ihr Beitrag",
          "helpText": "Prozentsatz Ihres Gehalts, den Sie jährlich beitragen — streben Sie mindestens genug an, um den vollen Arbeitgeberzuschuss zu erhalten"
        },
        "includeEmployerMatch": {
          "label": "Arbeitgeberzuschuss",
          "helpText": "Aktivieren, wenn Ihr Arbeitgeber einen Teil Ihrer 401(k) Beiträge zuschießt — das ist kostenloses Geld"
        },
        "employerMatchPercent": {
          "label": "Zuschusssatz",
          "helpText": "Wie viel Ihr Arbeitgeber zuschießt — 50% bedeutet, sie fügen 0,50€ für jeden 1€ hinzu, den Sie beitragen, 100% bedeutet Euro-für-Euro"
        },
        "employerMatchLimit": {
          "label": "Zuschusslimit (% des Gehalts)",
          "helpText": "Maximaler Prozentsatz Ihres Gehalts, den Ihr Arbeitgeber zuschießt — typischerweise 3% bis 6% des Gehalts"
        },
        "rateOfReturn": {
          "label": "Erwartete Rendite",
          "helpText": "Durchschnittliche jährliche Anlagerendite — historisch erreicht der S&P 500 ~10%, aber 6-8% ist konservativer"
        },
        "includeSalaryGrowth": {
          "label": "Gehaltswachstum",
          "helpText": "Aktivieren, um jährliche Gehaltserhöhungen zu berücksichtigen — Ihre Beiträge wachsen mit steigendem Gehalt"
        },
        "annualSalaryIncrease": {
          "label": "Jährliche Gehaltserhöhung",
          "helpText": "Erwarteter jährlicher Gehaltsanstieg in Prozent — Durchschnitt ist 3%, variiert aber nach Branche und Leistung"
        },
        "includeInflation": {
          "label": "Inflation berücksichtigen",
          "helpText": "Aktivieren, um Ihr Guthaben in heutiger Kaufkraft zu sehen — zeigt, was Ihre Ersparnisse wirklich wert sind"
        },
        "inflationRate": {
          "label": "Erwartete Inflationsrate",
          "helpText": "Durchschnittliche jährliche Inflation — historisch etwa 2-3% in den USA, aber in letzter Zeit höher"
        }
      },
      "presets": {
        "youngSaver": {
          "label": "Junger Sparer",
          "description": "25 Jahre, 55.000€ Gehalt, 8% Beitrag"
        },
        "midCareer": {
          "label": "Mitte der Laufbahn",
          "description": "40 Jahre, 95.000€ Gehalt, 12% Beitrag"
        },
        "lateStart": {
          "label": "Später Beginn",
          "description": "50 Jahre, 85.000€ Gehalt, 15% Beitrag"
        },
        "aggressiveSaver": {
          "label": "Aggressiv",
          "description": "30 Jahre, 120.000€ Gehalt, 20% Beitrag"
        }
      },
      "values": {
        "years": "Jahre",
        "year": "Jahr",
        "months": "Monate",
        "month": "Monat",
        "monthly": "/Monat",
        "perYear": "/Jahr"
      },
      "formats": {
        "summary": "Mit {retirementAge} Jahren könnte Ihr 401(k) auf {balanceAtRetirement} anwachsen. Sie werden {totalContributions} beigetragen haben mit {totalEmployerMatch} an Arbeitgeberzuschuss und {totalGrowth} an Anlagewachstum."
      },
      "results": {
        "balanceAtRetirement": {
          "label": "Guthaben bei Renteneintritt"
        },
        "totalContributions": {
          "label": "Ihre Gesamtbeiträge"
        },
        "totalEmployerMatch": {
          "label": "Arbeitgeberzuschuss Gesamt"
        },
        "totalGrowth": {
          "label": "Anlagewachstum"
        },
        "monthlyRetirementIncome": {
          "label": "Geschätztes monatliches Einkommen"
        },
        "annualTaxSavings": {
          "label": "Jährliche Steuerersparnis (Aktuell)"
        },
        "freeMoneyFromMatch": {
          "label": "Kostenloses Geld vom Arbeitgeber"
        },
        "inflationAdjustedBalance": {
          "label": "Inflationsbereinigtes Guthaben"
        }
      },
      "infoCards": {
        "snapshot": {
          "title": "Renten-Schnappschuss",
          "items": [
            {
              "label": "Guthaben bei Renteneintritt",
              "valueKey": "balanceAtRetirement"
            },
            {
              "label": "Monatliches Renteneinkommen",
              "valueKey": "monthlyRetirementIncome"
            },
            {
              "label": "Jahre finanzierter Rente",
              "valueKey": "yearsFunded"
            },
            {
              "label": "Gesamtinvestierter Betrag",
              "valueKey": "totalInvested"
            }
          ]
        },
        "breakdown": {
          "title": "Beitragsaufschlüsselung",
          "items": [
            {
              "label": "Ihr jährlicher Beitrag",
              "valueKey": "annualContribution"
            },
            {
              "label": "Jährlicher Arbeitgeberzuschuss",
              "valueKey": "annualEmployerMatch"
            },
            {
              "label": "Jährliche Steuerersparnis",
              "valueKey": "annualTaxSavings"
            },
            {
              "label": "Verschenktes kostenloses Geld",
              "valueKey": "freeMoneyLeftOnTable"
            },
            {
              "label": "Aufholbeitrag berechtigt (50+)",
              "valueKey": "catchUpEligible"
            }
          ]
        },
        "tips": {
          "title": "401(k) Tipps",
          "items": [
            "Tragen Sie immer genug bei, um den vollen Arbeitgeberzuschuss zu erhalten — das ist eine sofortige 50-100% Rendite auf Ihr Geld, die Sie nirgendwo anders schlagen können.",
            "Mit 25 statt 35 zu beginnen mit gleichen Beiträgen kann dank Zinseszins 2x mehr bei der Rente bedeuten — Zeit ist Ihr mächtigstes Werkzeug.",
            "Nach 50 Jahren erlauben Aufholbeiträge bis zu 7.500€ extra pro Jahr (2025 Limits) — 60-63-Jährige erhalten sogar höhere 11.250€ Super-Aufholbeiträge.",
            "Erwägen Sie, Ihren Beitrag jährlich um 1% zu erhöhen, wenn Sie eine Gehaltserhöhung bekommen — Sie werden den Unterschied nicht spüren, aber es summiert sich über die Zeit zu Hunderttausenden."
          ]
        }
      },
      "chart": {
        "title": "401(k) Wachstum über die Zeit",
        "xLabel": "Alter",
        "yLabel": "Guthaben",
        "series": {
          "yourContributions": "Ihre Beiträge",
          "employerMatch": "Arbeitgeberzuschuss",
          "investmentGrowth": "Anlagewachstum"
        }
      },
      "detailedTable": {
        "growthSchedule": {
          "button": "Jahr-für-Jahr Aufschlüsselung anzeigen",
          "title": "401(k) Wachstumsplan",
          "columns": {
            "age": "Alter",
            "salary": "Gehalt",
            "yourContribution": "Ihr Beitrag",
            "employerMatch": "Arbeitgeberzuschuss",
            "growth": "Wachstum",
            "balance": "Guthaben"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein 401(k)?",
          "content": "Ein 401(k) ist ein arbeitgebergesponserter Rentensparplan, der es Ihnen ermöglicht, einen Teil Ihres Vorsteuer-Gehalts in ein steueraufgeschobenes Anlagekonto einzuzahlen. Ihre Beiträge reduzieren Ihr aktuelles zu versteuerndes Einkommen, und Ihre Anlagen wachsen steuerfrei, bis Sie sie im Ruhestand abheben. Viele Arbeitgeber schießen auch einen Prozentsatz Ihrer Beiträge zu und bieten damit praktisch kostenloses Geld für Ihre Rente. Der Plan erhält seinen Namen von Abschnitt 401(k) des Internal Revenue Code und bleibt das beliebteste private Rentensparvehikel in den Vereinigten Staaten mit über 70 Millionen aktiven Teilnehmern."
        },
        "employerMatch": {
          "title": "Arbeitgeberzuschuss verstehen",
          "content": "Arbeitgeberzuschuss ist einer der wertvollsten Vorteile eines 401(k). Eine übliche Struktur ist ein 50% Zuschuss auf Beiträge bis zu 6% des Gehalts — das bedeutet, wenn Sie 80.000€ verdienen und 6% (4.800€) beitragen, fügt Ihr Arbeitgeber 2.400€ hinzu. Manche Arbeitgeber schießen Euro-für-Euro zu und verdoppeln effektiv Ihre Beiträge bis zum Limit. Nicht genug beizutragen, um den vollen Zuschuss zu erhalten, bedeutet buchstäblich kostenloses Geld liegen zu lassen. Unverfallbarkeitszeiten können gelten, was bedeutet, dass Sie möglicherweise eine bestimmte Anzahl von Jahren im Unternehmen bleiben müssen, um 100% der Arbeitgeberbeiträge zu behalten."
        },
        "contributionLimits": {
          "title": "2026 Beitragsgrenzen",
          "items": [
            {
              "text": "Unter 50: 24.500€ jährliche Arbeitnehmerbeitragsgrenze",
              "type": "info"
            },
            {
              "text": "50-59 & 64+ Jahre: Zusätzliche 8.000€ Aufholbeitrag (32.500€ gesamt)",
              "type": "info"
            },
            {
              "text": "60-63 Jahre: Super-Aufholbeitrag von 11.250€ (35.750€ gesamt)",
              "type": "warning"
            },
            {
              "text": "Gesamtkombinierte Grenze (Arbeitnehmer + Arbeitgeber): 72.000€",
              "type": "info"
            },
            {
              "text": "Arbeitgeberzuschuss zählt NICHT zu Ihrer 24.500€ Arbeitnehmergrenze",
              "type": "info"
            },
            {
              "text": "Beitragsgrenzen steigen jährlich mit der Inflation",
              "type": "info"
            }
          ]
        },
        "investmentOptions": {
          "title": "Anlageoptionen",
          "items": [
            {
              "text": "Zieldatumsfonds: Passen Risiko automatisch basierend auf Ihrem Rentenjahr an",
              "type": "info"
            },
            {
              "text": "Indexfonds: Kostengünstige, diversifizierte Marktabdeckung",
              "type": "info"
            },
            {
              "text": "Anleihenfonds: Geringeres Risiko, feste Erträge für konservative Allokation",
              "type": "info"
            },
            {
              "text": "Unternehmensaktien: Hohes Risiko bei Konzentration — diversifizieren Sie über Ihren Arbeitgeber hinaus",
              "type": "warning"
            },
            {
              "text": "Geldmarkt: Sehr geringes Risiko, geringe Rendite — nur für kurzfristige Sicherheit",
              "type": "info"
            },
            {
              "text": "Kostenquoten sind wichtig: Schon 0,5% Unterschied bei Gebühren kostet über Jahrzehnte Zehntausende",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "401(k) Wachstumsbeispiele",
          "description": "Sehen Sie, wie verschiedene Beitragshöhen Ihre Rentenersparnisse beeinflussen",
          "examples": [
            {
              "title": "Start mit 25 Jahren mit 10% Beitrag",
              "steps": [
                "25 Jahre • Gehalt: 60.000€ • Beitrag: 10% = 6.000€/Jahr",
                "Arbeitgeberzuschuss: 50% bis zu 6% = 1.800€/Jahr",
                "Gesamte jährliche Investition: 7.800€",
                "Bei 7% jährlicher Rendite über 40 Jahre",
                "Guthaben mit 65: ~1.620.000€"
              ],
              "result": "Früher Start mit bescheidenem Gehalt baut 1,6M€+ Notgroschen auf"
            },
            {
              "title": "Start mit 40 Jahren mit 15% Beitrag",
              "steps": [
                "40 Jahre • Gehalt: 90.000€ • Beitrag: 15% = 13.500€/Jahr",
                "Arbeitgeberzuschuss: 50% bis zu 6% = 2.700€/Jahr",
                "Gesamte jährliche Investition: 16.200€",
                "Bei 7% jährlicher Rendite über 25 Jahre",
                "Guthaben mit 65: ~1.060.000€"
              ],
              "result": "Später Start erfordert höhere Beiträge, erreicht aber trotzdem 1M€+"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viel sollte ich zu meinem 401(k) beitragen?",
          "answer": "Mindestens genug beitragen, um Ihren vollen Arbeitgeberzuschuss zu erhalten — alles weniger bedeutet, Sie lassen kostenloses Geld liegen. Idealerweise streben Sie 10-15% Ihres Gehalts an. Wenn Sie das nicht sofort schaffen, beginnen Sie mit dem, was Sie sich leisten können, und erhöhen Sie jährlich um 1%, bis Sie Ihr Ziel erreichen."
        },
        {
          "question": "Was passiert mit meinem 401(k), wenn ich den Job wechsle?",
          "answer": "Sie haben mehrere Optionen: bei Ihrem ehemaligen Arbeitgeber lassen (wenn das Guthaben über 5.000€ liegt), zu Ihrem neuen Arbeitgeber-401(k) übertragen, in eine IRA für mehr Anlageoptionen übertragen, oder auszahlen lassen (nicht empfohlen wegen Steuern und 10% Vorzeitsentnahmestrafe). Übertragungen sind bei korrekter Durchführung steuerfrei."
        },
        {
          "question": "Was sind Aufholbeiträge?",
          "answer": "Wenn Sie 50 oder älter sind, erlaubt das Finanzamt zusätzliche Beiträge über das Standardlimit hinaus. Für 2026 beträgt der Aufholbetrag 8.000€ (gesamt 32.500€). Ein neuer 'Super-Aufholbeitrag' für 60-63-Jährige erlaubt zusätzliche 11.250€ (gesamt 35.750€). Dies hilft Menschen, die später mit dem Sparen begonnen haben, ihre Rentenersparnisse zu beschleunigen."
        },
        {
          "question": "Was ist eine RMD (Required Minimum Distribution)?",
          "answer": "Ab 73 Jahren (oder 75, wenn nach 1960 geboren) verlangt das Finanzamt, dass Sie jährlich einen Mindestbetrag aus Ihrem traditionellen 401(k) abheben. Der Betrag wird basierend auf Ihrem Kontoguthaben und Lebenserwartung berechnet. Die RMD nicht zu nehmen führt zu 25% Strafe auf den Betrag, den Sie hätten abheben sollen."
        },
        {
          "question": "Kann ich vor 59½ aus meinem 401(k) abheben?",
          "answer": "Ja, aber Sie schulden normalerweise Einkommensteuer plus 10% Vorzeitsentnahmestrafe. Ausnahmen umfassen Behinderung, bestimmte Arztkosten, qualifizierte Scheidungsvereinbarungen und die 55er-Regel (straffreie Abhebungen wenn Sie den Job mit 55 oder später verlassen). Härtefallabhebungen können auch verfügbar sein, unterliegen aber trotzdem Steuern."
        },
        {
          "question": "Wie funktioniert Arbeitgeberzuschuss tatsächlich?",
          "answer": "Ihr Arbeitgeber trägt zusätzliches Geld basierend darauf bei, wie viel Sie beitragen. Zum Beispiel '50% Zuschuss bis zu 6%' bedeutet, wenn Sie 6% Ihres 80.000€ Gehalts (4.800€) beitragen, fügt Ihr Arbeitgeber 50% davon hinzu (2.400€). Wenn Sie nur 3% beitragen, schießen sie 1.200€ zu — Sie würden jährlich 1.200€ kostenloses Geld liegen lassen."
        },
        {
          "question": "Welche Rendite sollte ich von meinem 401(k) erwarten?",
          "answer": "Historisch hat ein diversifiziertes Portfolio mit 60% Aktien und 40% Anleihen etwa 7-8% jährlich vor Inflation erbracht. Der S&P 500 allein hat langfristig etwa 10% erreicht. Für konservative Planung ist 6-7% zu verwenden klug. Tatsächliche Renditen hängen von Ihrer Anlageallokation, Gebühren und Marktbedingungen ab."
        },
        {
          "question": "Kann ich diesen Rechner für 401(k) Pläne außerhalb der USA verwenden?",
          "answer": "Obwohl dieser Rechner für US-401(k) Pläne konzipiert ist, gilt die Zinseszinsmath für jeden beitragsbezogenen Rentenplan. Sie können ihn für ähnliche Pläne in anderen Ländern verwenden, indem Sie die Beitragsgrenzen und Zuschussstruktur anpassen. Die Multi-Währungsfunktion unterstützt 32 Währungen für globale Nutzer."
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

  // ─── INPUTS ───
  inputs: [
    // Current Age — stepper
    {
      id: "currentAge",
      type: "stepper",
      defaultValue: null,
      placeholder: "30",
      min: 18,
      max: 80,
      step: 1,
      suffix: "years",
    },
    // Retirement Age — stepper
    {
      id: "retirementAge",
      type: "stepper",
      defaultValue: 65,
      min: 50,
      max: 75,
      step: 1,
      suffix: "years",
    },
    // Annual Salary — currency unitType
    {
      id: "annualSalary",
      type: "number",
      defaultValue: null,
      placeholder: "75000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Current 401(k) Balance — currency unitType
    {
      id: "currentBalance",
      type: "number",
      defaultValue: null,
      placeholder: "25000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Contribution % of salary — number + slider
    {
      id: "contributionPercent",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      min: 0,
      max: 100,
      step: 0.5,
      suffix: "%",
      slider: true,
    },
    // Include Employer Match — toggle
    {
      id: "includeEmployerMatch",
      type: "toggle",
      defaultValue: false,
    },
    // Employer Match % — revealed when toggle ON
    {
      id: "employerMatchPercent",
      type: "number",
      defaultValue: null,
      placeholder: "50",
      min: 0,
      max: 200,
      step: 1,
      suffix: "%",
      showWhen: { field: "includeEmployerMatch", value: true },
    },
    // Employer Match Limit (% of salary) — revealed when toggle ON
    {
      id: "employerMatchLimit",
      type: "number",
      defaultValue: null,
      placeholder: "6",
      min: 0,
      max: 100,
      step: 0.5,
      suffix: "%",
      showWhen: { field: "includeEmployerMatch", value: true },
    },
    // Expected Rate of Return — number + slider
    {
      id: "rateOfReturn",
      type: "number",
      defaultValue: 7,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
      slider: true,
    },
    // Include Salary Growth — toggle
    {
      id: "includeSalaryGrowth",
      type: "toggle",
      defaultValue: false,
    },
    // Annual Salary Increase — revealed when toggle ON
    {
      id: "annualSalaryIncrease",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 20,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeSalaryGrowth", value: true },
    },
    // Include Inflation — toggle
    {
      id: "includeInflation",
      type: "toggle",
      defaultValue: false,
    },
    // Expected Inflation Rate — revealed when toggle ON
    {
      id: "inflationRate",
      type: "number",
      defaultValue: 2.5,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeInflation", value: true },
    },
  ],

  inputGroups: [], // EMPTY — no accordions

  // ─── RESULTS ───
  results: [
    { id: "balanceAtRetirement", type: "primary", format: "text" },
    { id: "totalContributions", type: "secondary", format: "text" },
    { id: "totalEmployerMatch", type: "secondary", format: "text" },
    { id: "totalGrowth", type: "secondary", format: "text" },
    { id: "monthlyRetirementIncome", type: "secondary", format: "text" },
    { id: "annualTaxSavings", type: "secondary", format: "text" },
    { id: "freeMoneyFromMatch", type: "secondary", format: "text" },
    { id: "inflationAdjustedBalance", type: "secondary", format: "text" },
  ],

  // ─── INFO CARDS ───
  infoCards: [
    { id: "snapshot", type: "list", icon: "💰", itemCount: 4 },
    { id: "breakdown", type: "list", icon: "📋", itemCount: 5 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ───
  chart: {
    id: "growthOverTime",
    type: "composed",
    xKey: "age",
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "yourContributions", type: "area", stackId: "savings", color: "#3b82f6" },
      { key: "employerMatch", type: "area", stackId: "savings", color: "#10b981" },
      { key: "investmentGrowth", type: "area", stackId: "savings", color: "#f59e0b" },
    ],
  },

  // ─── DETAILED TABLE (Year-by-Year Growth Schedule) ───
  detailedTable: {
    id: "growthSchedule",
    buttonLabel: "View Year-by-Year Breakdown",
    buttonIcon: "📊",
    modalTitle: "401(k) Growth Schedule",
    columns: [
      { id: "age", label: "Age", align: "center" },
      { id: "salary", label: "Salary", align: "right" },
      { id: "yourContribution", label: "Your Contribution", align: "right" },
      { id: "employerMatch", label: "Employer Match", align: "right" },
      { id: "growth", label: "Growth", align: "right" },
      { id: "balance", label: "Balance", align: "right", highlight: true },
    ],
  },

  // ─── EDUCATION SECTIONS ───
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "employerMatch", type: "prose", icon: "🤝" },
    { id: "contributionLimits", type: "list", icon: "📋", itemCount: 6 },
    { id: "investmentOptions", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
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
      authors: "Internal Revenue Service",
      year: "2025",
      title: "401(k) Limit Increases to $24,500 for 2026",
      source: "IRS.gov",
      url: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500",
    },
    {
      authors: "U.S. Department of Labor",
      year: "2024",
      title: "What You Should Know About Your Retirement Plan",
      source: "DOL.gov",
      url: "https://www.dol.gov/sites/dolgov/files/EBSA/about-ebsa/our-activities/resource-center/publications/what-you-should-know-about-your-retirement-plan.pdf",
    },
    {
      authors: "Vanguard Group",
      year: "2025",
      title: "How America Saves — 401(k) Plan Participant Behavior",
      source: "Vanguard Research",
      url: "https://institutional.vanguard.com/content/dam/inst/vanguard-has/insights-pdfs/how-america-saves-report-2024.pdf",
    },
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2024",
      title: "Saving for Retirement",
      source: "CFPB.gov",
      url: "https://www.consumerfinance.gov/consumer-tools/retirement/",
    },
  ],

  referenceData: [],
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculate401k(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──
  const currentAge = values.currentAge as number | null;
  const retirementAge = (values.retirementAge as number) || 65;
  const annualSalary = values.annualSalary as number | null;
  const currentBalance = (values.currentBalance as number | null) || 0;
  const contributionPercent = (values.contributionPercent as number | null) || 0;

  const includeEmployerMatch = values.includeEmployerMatch as boolean;
  const employerMatchPercent = includeEmployerMatch
    ? ((values.employerMatchPercent as number | null) || 0) / 100
    : 0;
  const employerMatchLimit = includeEmployerMatch
    ? ((values.employerMatchLimit as number | null) || 0) / 100
    : 0;

  const rateOfReturn = ((values.rateOfReturn as number) ?? 7) / 100;

  const includeSalaryGrowth = values.includeSalaryGrowth as boolean;
  const annualSalaryIncrease = includeSalaryGrowth
    ? ((values.annualSalaryIncrease as number) ?? 3) / 100
    : 0;

  const includeInflation = values.includeInflation as boolean;
  const inflationRate = includeInflation
    ? ((values.inflationRate as number) ?? 2.5) / 100
    : 0;

  // ── Validate required ──
  if (!currentAge || !annualSalary || annualSalary <= 0 || currentAge >= retirementAge) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Currency symbol ──
  const curr = fieldUnits?.annualSalary || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ── Year-by-year simulation ──
  const yearsToRetirement = retirementAge - currentAge;
  let balance = currentBalance;
  let salary = annualSalary;
  let totalContributions = 0;
  let totalEmployerMatch = 0;
  let totalGrowth = 0;

  const chartData: Array<Record<string, unknown>> = [];
  const tableData: Array<Record<string, string>> = [];

  // Cumulative trackers for chart
  let cumulativeContributions = 0;
  let cumulativeMatch = 0;
  let cumulativeGrowth = 0;

  // First year contribution for tax savings display
  let firstYearContribution = 0;
  let firstYearMatch = 0;

  // IRS 2026 limits
  const IRS_LIMIT_2026 = 24500;
  const CATCH_UP_50 = 8000;
  const SUPER_CATCH_UP_60_63 = 11250;

  for (let year = 0; year < yearsToRetirement; year++) {
    const age = currentAge + year;

    // ── Employee contribution (capped at IRS limit) ──
    let employeeContribution = salary * (contributionPercent / 100);

    // Apply IRS contribution limits
    let annualLimit = IRS_LIMIT_2026;
    if (age >= 60 && age <= 63) {
      annualLimit += SUPER_CATCH_UP_60_63;
    } else if (age >= 50) {
      annualLimit += CATCH_UP_50;
    }
    employeeContribution = Math.min(employeeContribution, annualLimit);

    // ── Employer match ──
    const maxMatchableContribution = salary * employerMatchLimit;
    const matchableAmount = Math.min(employeeContribution, maxMatchableContribution);
    const employerMatch = matchableAmount * employerMatchPercent;

    // ── Investment growth ──
    const startBalance = balance;
    const growth = (startBalance + employeeContribution + employerMatch) * rateOfReturn;

    // ── Update balance ──
    balance = startBalance + employeeContribution + employerMatch + growth;

    // ── Track totals ──
    totalContributions += employeeContribution;
    totalEmployerMatch += employerMatch;
    totalGrowth += growth;

    cumulativeContributions += employeeContribution;
    cumulativeMatch += employerMatch;
    cumulativeGrowth += growth;

    // First year data for display
    if (year === 0) {
      firstYearContribution = employeeContribution;
      firstYearMatch = employerMatch;
    }

    // ── Chart data (stacked area — cumulative breakdown) ──
    chartData.push({
      age: `${age + 1}`,
      yourContributions: Math.round(currentBalance + cumulativeContributions),
      employerMatch: Math.round(cumulativeMatch),
      investmentGrowth: Math.round(cumulativeGrowth),
    });

    // ── Table data ──
    tableData.push({
      age: `${age + 1}`,
      salary: `${sym}${fmtNum(salary, 0)}`,
      yourContribution: `${sym}${fmtNum(employeeContribution, 0)}`,
      employerMatch: `${sym}${fmtNum(employerMatch, 0)}`,
      growth: `${sym}${fmtNum(growth, 0)}`,
      balance: `${sym}${fmtNum(balance, 0)}`,
    });

    // ── Apply salary growth for next year ──
    salary *= 1 + annualSalaryIncrease;
  }

  // ── Inflation-adjusted balance ──
  const inflationFactor = Math.pow(1 + inflationRate, yearsToRetirement);
  const inflationAdjustedBalance = inflationRate > 0 ? balance / inflationFactor : balance;

  // ── Monthly retirement income (4% rule ÷ 12) ──
  const annualWithdrawal = balance * 0.04;
  const monthlyRetirementIncome = annualWithdrawal / 12;

  // ── Years of retirement funded (at 4% withdrawal rate) ──
  // Simplified: balance ÷ annual expenses, assuming 4% rule sustains ~25-30 years
  const yearsFunded = balance > 0 ? Math.round(balance / annualWithdrawal) : 0;

  // ── Total invested (contributions + match) ──
  const totalInvested = totalContributions + totalEmployerMatch + currentBalance;

  // ── Annual tax savings (first year — assuming ~24% marginal bracket as estimate) ──
  const estimatedTaxBracket = 0.24;
  const annualTaxSavings = firstYearContribution * estimatedTaxBracket;

  // ── Free money left on table (if not maxing employer match) ──
  const maxPossibleMatch = annualSalary * employerMatchLimit * employerMatchPercent;
  const freeMoneyLeftOnTable = Math.max(maxPossibleMatch - firstYearMatch, 0);

  // ── Catch-up eligibility ──
  const isCatchUpEligible = currentAge >= 50;
  const catchUpAmount = currentAge >= 60 && currentAge <= 63
    ? SUPER_CATCH_UP_60_63
    : isCatchUpEligible
      ? CATCH_UP_50
      : 0;
  const catchUpEligibleStr = isCatchUpEligible
    ? `Yes — ${sym}${fmtNum(catchUpAmount, 0)}/yr extra`
    : "Not yet — available at age 50";

  // ── Build summary ──
  const summary =
    f.summary
      ?.replace("{retirementAge}", `${retirementAge}`)
      .replace("{balanceAtRetirement}", `${sym}${fmtNum(balance, 0)}`)
      .replace("{totalContributions}", `${sym}${fmtNum(totalContributions, 0)}`)
      .replace("{totalEmployerMatch}", `${sym}${fmtNum(totalEmployerMatch, 0)}`)
      .replace("{totalGrowth}", `${sym}${fmtNum(totalGrowth, 0)}`) ||
    `By age ${retirementAge}, your 401(k) could grow to ${sym}${fmtNum(balance, 0)}.`;

  // ── Format results ──
  return {
    values: {
      balanceAtRetirement: balance,
      totalContributions,
      totalEmployerMatch,
      totalGrowth,
      monthlyRetirementIncome,
      annualTaxSavings,
      freeMoneyFromMatch: totalEmployerMatch,
      inflationAdjustedBalance,
      yearsFunded,
      totalInvested,
      annualContribution: firstYearContribution,
      annualEmployerMatch: firstYearMatch,
      freeMoneyLeftOnTable,
      catchUpEligible: catchUpEligibleStr,
    },
    formatted: {
      balanceAtRetirement: `${sym}${fmtNum(balance, 0)}`,
      totalContributions: `${sym}${fmtNum(totalContributions, 0)}`,
      totalEmployerMatch: `${sym}${fmtNum(totalEmployerMatch, 0)}`,
      totalGrowth: `${sym}${fmtNum(totalGrowth, 0)}`,
      monthlyRetirementIncome: `${sym}${fmtNum(monthlyRetirementIncome)}${v["monthly"] || "/mo"}`,
      annualTaxSavings: `~${sym}${fmtNum(annualTaxSavings, 0)}${v["perYear"] || "/yr"}`,
      freeMoneyFromMatch: `${sym}${fmtNum(totalEmployerMatch, 0)} total`,
      inflationAdjustedBalance: inflationRate > 0
        ? `${sym}${fmtNum(inflationAdjustedBalance, 0)} (today's dollars)`
        : "—",
      yearsFunded: `~${yearsFunded} ${yearsFunded === 1 ? (v["year"] || "year") : (v["years"] || "years")}`,
      totalInvested: `${sym}${fmtNum(totalInvested, 0)}`,
      annualContribution: `${sym}${fmtNum(firstYearContribution, 0)}${v["perYear"] || "/yr"}`,
      annualEmployerMatch: `${sym}${fmtNum(firstYearMatch, 0)}${v["perYear"] || "/yr"}`,
      freeMoneyLeftOnTable: freeMoneyLeftOnTable > 0
        ? `${sym}${fmtNum(freeMoneyLeftOnTable, 0)}/yr — increase contribution!`
        : "✅ You're maximizing your match!",
      catchUpEligible: catchUpEligibleStr,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
