import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─── HELPER: Format number with commas ───
function fmtNum(val: number, decimals = 0): string {
  if (val === 0) return "0";
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

export const retirementCalculatorConfig: CalculatorConfigV4 = {
  id: "retirement-calculator",
  version: "4.0",
  category: "finance",
  icon: "🏖️",

  presets: [
    {
      id: "freshStart",
      icon: "👶",
      values: {
        currentAge: 25, retirementAge: 65, annualIncome: 45000,
        currentSavings: 5000, monthlyContribution: 375,
        includeEmployerMatch: false, employerMatchPercent: null, matchLimit: null,
        otherMonthlyIncome: 0, lifeExpectancy: 90,
        preReturnRate: 8, postReturnRate: 5, inflationRate: 3,
        salaryGrowth: 2, incomeReplacement: 75,
      },
    },
    {
      id: "midCareer",
      icon: "👨‍💼",
      values: {
        currentAge: 40, retirementAge: 67, annualIncome: 75000,
        currentSavings: 120000, monthlyContribution: 750,
        includeEmployerMatch: true, employerMatchPercent: 50, matchLimit: 6,
        otherMonthlyIncome: 0, lifeExpectancy: 90,
        preReturnRate: 7, postReturnRate: 5, inflationRate: 3,
        salaryGrowth: 2, incomeReplacement: 75,
      },
    },
    {
      id: "preRetirement",
      icon: "👴",
      values: {
        currentAge: 55, retirementAge: 67, annualIncome: 100000,
        currentSavings: 450000, monthlyContribution: 1500,
        includeEmployerMatch: true, employerMatchPercent: 100, matchLimit: 6,
        otherMonthlyIncome: 500, lifeExpectancy: 90,
        preReturnRate: 6, postReturnRate: 4, inflationRate: 3,
        salaryGrowth: 1, incomeReplacement: 80,
      },
    },
    {
      id: "fireEarly",
      icon: "🔥",
      values: {
        currentAge: 30, retirementAge: 45, annualIncome: 80000,
        currentSavings: 50000, monthlyContribution: 3000,
        includeEmployerMatch: false, employerMatchPercent: null, matchLimit: null,
        otherMonthlyIncome: 0, lifeExpectancy: 95,
        preReturnRate: 8, postReturnRate: 5, inflationRate: 3,
        salaryGrowth: 3, incomeReplacement: 60,
      },
    },
    {
      id: "lateStart",
      icon: "💼",
      values: {
        currentAge: 50, retirementAge: 70, annualIncome: 65000,
        currentSavings: 80000, monthlyContribution: 1200,
        includeEmployerMatch: false, employerMatchPercent: null, matchLimit: null,
        otherMonthlyIncome: 0, lifeExpectancy: 90,
        preReturnRate: 6, postReturnRate: 4, inflationRate: 3,
        salaryGrowth: 1, incomeReplacement: 75,
      },
    },
  ],

  t: {
    en: {
      name: "Retirement Calculator",
      slug: "retirement-calculator",
      breadcrumb: "Retirement Calculator",
      seo: {
        title: "Retirement Calculator - Free Savings Planner Tool",
        description: "Calculate how much you need to retire comfortably. Factor in inflation, employer match, and compound growth with year-by-year projections.",
        keywords: ["retirement calculator", "retirement savings calculator", "how much to retire", "retirement planning calculator", "when can I retire", "free retirement calculator", "4% rule calculator", "FIRE calculator"],
      },

      subtitle: "Plan your retirement savings and find out if you're on track to meet your financial goals",

      inputs: {
        currentAge: { label: "Current Age", helpText: "Your current age in years", placeholder: "30" },
        retirementAge: { label: "Retirement Age", helpText: "The age you plan to retire (US average: 62-67)", placeholder: "65" },
        annualIncome: { label: "Annual Pre-Tax Income", helpText: "Your current gross annual salary before taxes", placeholder: "75000" },
        currentSavings: { label: "Current Retirement Savings", helpText: "Total saved across all retirement accounts (401k, IRA, etc.)", placeholder: "50000" },
        monthlyContribution: { label: "Monthly Contribution", helpText: "How much you save each month toward retirement", placeholder: "500" },
        includeEmployerMatch: { label: "Include Employer Match", helpText: "Does your employer match your retirement contributions?" },
        employerMatchPercent: { label: "Employer Match Rate", helpText: "Percentage your employer matches (e.g., 50% = $0.50 per $1 you contribute)", placeholder: "50" },
        matchLimit: { label: "Match Limit (% of Salary)", helpText: "Employer matches up to this % of your salary (common: 3-6%)", placeholder: "6" },
        otherMonthlyIncome: { label: "Other Monthly Income in Retirement", helpText: "Social Security, pension, rental income expected in retirement", placeholder: "0" },
        lifeExpectancy: { label: "Life Expectancy", helpText: "Plan conservatively — healthy adults often live to 85-95" },
        preReturnRate: { label: "Pre-Retirement Return Rate", helpText: "Expected annual return before retirement (S&P 500 avg: ~10%, after inflation ~7%)" },
        postReturnRate: { label: "Post-Retirement Return Rate", helpText: "Conservative return during retirement (typically 4-5%)" },
        inflationRate: { label: "Expected Inflation Rate", helpText: "US long-term average: ~3%. Reduces purchasing power over time" },
        salaryGrowth: { label: "Annual Salary Growth", helpText: "Expected annual raise or salary increase (average: 2-3%)" },
        incomeReplacement: { label: "Income Replacement in Retirement", helpText: "% of pre-retirement income needed (advisors recommend 70-80%)" },
      },

      results: {
        totalAtRetirement: { label: "Projected Savings at Retirement" },
        totalInTodaysDollars: { label: "In Today's Dollars" },
        nestEggNeeded: { label: "Nest Egg Needed (4% Rule)" },
        monthlyRetirementIncome: { label: "Monthly Retirement Income" },
        savingsGap: { label: "Savings Gap / Surplus" },
        totalContributed: { label: "Total You Contributed" },
        totalGrowth: { label: "Investment Growth (Earnings)" },
        yearsMoneyLasts: { label: "How Long Money Lasts" },
      },

      presets: {
        freshStart: { label: "Fresh Start (Age 25)", description: "$45K salary, $375/mo, 40 years to grow" },
        midCareer: { label: "Mid-Career (Age 40)", description: "$75K salary, $750/mo, employer match" },
        preRetirement: { label: "Pre-Retirement (Age 55)", description: "$100K salary, $1,500/mo, 12 years left" },
        fireEarly: { label: "FIRE (Retire at 45)", description: "$80K salary, $3K/mo aggressive savings" },
        lateStart: { label: "Late Start (Age 50)", description: "$65K salary, $1,200/mo, catching up" },
      },

      values: {
        years: "years",
        year: "year",
        perMonth: "/mo",
        perDay: "/day",
        indefinitely: "Indefinitely",
      },

      formats: {
        summary: "By age {retAge}, you'll have approximately {total}. You need {needed} to maintain {replacement}% of your income. {status}.",
      },

      infoCards: {
        milestones: {
          title: "Retirement Milestones",
          items: [
            { label: "Years Until Retirement", valueKey: "yearsUntilRetirement" },
            { label: "Effective Savings Rate", valueKey: "effectiveSavingsRate" },
            { label: "Daily Savings Equivalent", valueKey: "dailySavings" },
            { label: "Fidelity Benchmark (Your Age)", valueKey: "fidelityBenchmark" },
          ],
        },
        insights: {
          title: "Financial Insights",
          items: [
            { label: "Employer Match Total", valueKey: "totalEmployerMatch" },
            { label: "% Portfolio from Growth", valueKey: "growthPercent" },
            { label: "Doubling Time (Rule of 72)", valueKey: "doublingTime" },
            { label: "Extra Monthly to Close Gap", valueKey: "extraMonthlyNeeded" },
          ],
        },
        tips: {
          title: "Retirement Tips",
          items: [
            "Start early: $200/mo from age 25 at 8% = $702K by 65. Starting at 35 = $298K — less than half",
            "Max your employer match — it's literally free money. Not doing so is leaving salary on the table",
            "Increase contributions by 1% each year with raises. You won't feel it but your future self will thank you",
            "Consider Roth options: pay taxes now, withdraw tax-free in retirement when rates may be higher",
          ],
        },
      },

      chart: {
        title: "Retirement Savings Growth",
        xLabel: "Age",
        yLabel: "Portfolio Value",
        series: {
          contributions: "Your Contributions",
          growth: "Investment Growth",
          target: "Nest Egg Needed",
        },
      },

      detailedTable: {
        yearByYear: {
          button: "View Year-by-Year Breakdown",
          title: "Retirement Savings Projection",
          columns: {
            year: "Year",
            age: "Age",
            salary: "Salary",
            contribution: "Annual Contribution",
            employerMatch: "Employer Match",
            portfolioValue: "Portfolio Value",
            inflationAdjusted: "In Today's $",
          },
        },
      },

      // ─── EDUCATION (ORDER: prose, prose, list, list, code-example) ───
      education: {
        whatIs: {
          title: "What Is a Retirement Calculator?",
          content: "A retirement calculator helps you estimate how much money you need to save to maintain your desired lifestyle after you stop working. It factors in your current savings, monthly contributions, expected investment returns, inflation, and how long you expect to live in retirement. The goal is to ensure you don't outlive your money — a fear shared by 45% of Americans according to a 2024 Gallup survey. Unlike simple savings calculators, a retirement calculator accounts for two distinct phases of your financial life: the accumulation phase (saving and investing while working) and the distribution phase (withdrawing funds in retirement). During accumulation, compound interest works in your favor; during distribution, inflation and withdrawals work against you.",
        },
        howItWorks: {
          title: "How Retirement Planning Works",
          content: "Retirement planning revolves around a core equation: your savings at retirement must generate enough income to cover your expenses for the rest of your life. During your working years, your money compounds — earning returns on returns. A 7% annual return doubles your money roughly every 10 years (the Rule of 72). This means $10,000 invested at age 25 becomes approximately $160,000 by age 65 without adding another dollar. The critical variables are: your savings rate, your return rate, inflation (which erodes purchasing power at roughly 3% per year), and your time horizon. Even small changes create enormous differences over decades. Increasing your savings rate by just 1% of your salary can add tens of thousands to your retirement fund over a 30-year career.",
        },
        retirementRules: {
          title: "Essential Retirement Rules of Thumb",
          items: [
            { text: "The 4% Rule: Withdraw 4% of your nest egg in year one, then adjust for inflation annually. Historically lasts 30+ years with a 50-75% stock allocation (Bengen, 1994).", type: "info" },
            { text: "The 25x Rule: Save 25 times your annual expenses. If you spend $60,000/year, aim for $1,500,000. This is the inverse of the 4% rule.", type: "info" },
            { text: "The 80% Rule: Plan to need 70-80% of your pre-retirement income. Some expenses disappear (commuting), but healthcare typically increases.", type: "info" },
            { text: "The 10-15% Rule: Save at least 10-15% of gross income throughout your career. Starting late? You may need 20-25%.", type: "warning" },
            { text: "Age Milestones (Fidelity): Save 1x salary by 30, 3x by 40, 6x by 50, 8x by 60, 10x by 67. Check your progress.", type: "info" },
            { text: "Rule of 72: Divide 72 by your annual return to estimate doubling time. At 8%, your money doubles every 9 years.", type: "info" },
          ],
        },
        incomeSources: {
          title: "Retirement Income Sources",
          items: [
            { text: "401(k) / 403(b): Employer-sponsored plans with potential matching. 2026 limit: $23,500 ($31,000 if 50+). Tax-deferred growth.", type: "info" },
            { text: "Traditional IRA: Tax-deductible contributions, taxed on withdrawal. 2026 limit: $7,000 ($8,000 if 50+). Good if you expect lower tax bracket later.", type: "info" },
            { text: "Roth IRA: After-tax contributions, tax-free withdrawals. Same limits as Traditional. Ideal if you expect higher tax rates in retirement.", type: "info" },
            { text: "Social Security: Available from age 62 (reduced) to 70 (max benefit). Average 2026 benefit: ~$1,900/mo. Not designed as sole income.", type: "warning" },
            { text: "Pension Plans: Defined benefit plans providing guaranteed income. Increasingly rare in private sector, still common in government.", type: "info" },
            { text: "Personal Investments & Real Estate: Taxable brokerage accounts, rental properties. Flexible but lack tax advantages of retirement accounts.", type: "info" },
          ],
        },
        examples: {
          title: "Retirement Savings Examples",
          description: "See how starting age and savings rate dramatically affect your outcome",
          examples: [
            {
              title: "Starting at 25: The Power of Time",
              steps: [
                "Age 25, salary $45,000, saving $375/month (10%)",
                "Current savings: $5,000",
                "8% pre-retirement return, 3% inflation",
                "40 years of compound growth",
              ],
              result: "~$1,340,000 at age 65 (~$440,000 in today's dollars). Monthly income: ~$4,467 via 4% rule. Time is your greatest asset.",
            },
            {
              title: "Starting at 40: Catching Up",
              steps: [
                "Age 40, salary $75,000, saving $750/month (12%)",
                "Current savings: $120,000, employer matches 50% up to 6%",
                "7% return, 3% inflation, 27 years to retirement at 67",
              ],
              result: "~$1,050,000 at age 67 (~$470,000 in today's dollars). Despite saving MORE monthly, less time to compound means significantly less wealth.",
            },
          ],
        },
      },

      faqs: [
        { question: "How much money do I need to retire?", answer: "The most widely used rule is the 25x Rule: save 25 times your annual expenses. If you spend $60,000/year, you need $1,500,000. This is based on the 4% withdrawal rule, which historically allows a portfolio to last 30+ years. The exact amount depends on your lifestyle, healthcare needs, location, and other income sources like Social Security or pensions." },
        { question: "At what age can I retire?", answer: "Traditional US retirement age is 65-67 (for full Social Security benefits), but your actual retirement age depends on savings rate. Someone saving 15% can typically retire around 65. The FIRE movement shows that saving 50-70% of income can allow retirement in 10-17 years, regardless of starting age. The key factors are spending level and savings rate, not age." },
        { question: "What is the 4% Rule and does it still work?", answer: "Developed by William Bengen in 1994, the 4% Rule states that withdrawing 4% of your portfolio in year one, then adjusting for inflation annually, has historically allowed a 50/50 stock/bond portfolio to last at least 30 years. Recent research suggests 3.5-4% remains safe for 30-year retirements, though longer retirements (40+ years) may warrant 3-3.5%." },
        { question: "How does inflation affect retirement savings?", answer: "At 3% annual inflation, $1 today is worth only $0.48 in 25 years. If you need $60,000/year today, you'll need about $125,000/year in 25 years for the same lifestyle. This calculator shows both nominal and inflation-adjusted values so you see real purchasing power." },
        { question: "Should I max out my 401(k) or invest elsewhere?", answer: "Priority order: (1) Contribute enough to get full employer match — free money. (2) Max Roth IRA ($7,000 in 2026). (3) Max 401(k) ($23,500 in 2026). (4) Invest in taxable brokerage. This order maximizes tax benefits and employer matching." },
        { question: "What rate of return should I expect?", answer: "The S&P 500 has returned ~10% annually since 1926 (nominal) or ~7% after inflation. Most advisors recommend 6-7% pre-retirement and 4-5% post-retirement. Using conservative estimates is safer than being overly optimistic." },
        { question: "How much should I save each month?", answer: "General guideline: 15% of gross income including employer match. Starting at 25, this provides comfortable retirement at 65. Starting later requires more: at 35 aim for 20%, at 45 aim for 25-30%. Use Fidelity benchmarks to check: 1x salary by 30, 3x by 40, 6x by 50, 10x by 67." },
        { question: "What is FIRE (Financial Independence, Retire Early)?", answer: "FIRE focuses on extreme savings (50-70% of income) to achieve financial independence decades before 65. At 50% savings rate, retire in ~17 years; at 70%, in ~8.5 years. Variations include LeanFIRE (~$40K/year), FatFIRE ($100K+/year), and BaristaFIRE (semi-retirement with part-time work)." },
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
      buttons: { calculate: "Calculate", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de Jubilación",
      "seo": {
        "title": "Calculadora de Jubilación - Herramienta Gratuita de Planificación de Ahorros",
        "description": "Calcula cuánto necesitas para jubilarte cómodamente. Incluye inflación, aporte del empleador y crecimiento compuesto con proyecciones año por año.",
        "keywords": [
          "calculadora de jubilación",
          "calculadora de ahorros para jubilación",
          "cuánto para jubilarse",
          "calculadora de planificación de jubilación",
          "cuándo puedo jubilarme",
          "calculadora gratuita de jubilación",
          "calculadora regla 4%",
          "calculadora FIRE"
        ]
      },
      "subtitle": "Planifica tus ahorros para la jubilación y descubre si vas por buen camino para alcanzar tus metas financieras",
      "slug": "calculadora-jubilacion",
      "inputs": {
        "currentAge": {
          "label": "Edad Actual",
          "helpText": "Tu edad actual en años",
          "placeholder": "30"
        },
        "retirementAge": {
          "label": "Edad de Jubilación",
          "helpText": "La edad a la que planeas jubilarte (promedio EE.UU.: 62-67)",
          "placeholder": "65"
        },
        "annualIncome": {
          "label": "Ingresos Anuales Brutos",
          "helpText": "Tu salario anual bruto actual antes de impuestos",
          "placeholder": "75000"
        },
        "currentSavings": {
          "label": "Ahorros Actuales para Jubilación",
          "helpText": "Total ahorrado en todas las cuentas de jubilación (401k, IRA, etc.)",
          "placeholder": "50000"
        },
        "monthlyContribution": {
          "label": "Contribución Mensual",
          "helpText": "Cuánto ahorras cada mes para la jubilación",
          "placeholder": "500"
        },
        "includeEmployerMatch": {
          "label": "Incluir Aporte del Empleador",
          "helpText": "¿Tu empleador iguala tus contribuciones de jubilación?"
        },
        "employerMatchPercent": {
          "label": "Tasa de Aporte del Empleador",
          "helpText": "Porcentaje que aporta tu empleador (ej: 50% = $0.50 por cada $1 que contribuyes)",
          "placeholder": "50"
        },
        "matchLimit": {
          "label": "Límite de Aporte (% del Salario)",
          "helpText": "El empleador aporta hasta este % de tu salario (común: 3-6%)",
          "placeholder": "6"
        },
        "otherMonthlyIncome": {
          "label": "Otros Ingresos Mensuales en Jubilación",
          "helpText": "Seguro Social, pensión, ingresos de alquiler esperados en la jubilación",
          "placeholder": "0"
        },
        "lifeExpectancy": {
          "label": "Expectativa de Vida",
          "helpText": "Planifica conservadoramente — adultos saludables a menudo viven hasta 85-95"
        },
        "preReturnRate": {
          "label": "Tasa de Retorno Pre-Jubilación",
          "helpText": "Retorno anual esperado antes de jubilarse (promedio S&P 500: ~10%, después inflación ~7%)"
        },
        "postReturnRate": {
          "label": "Tasa de Retorno Post-Jubilación",
          "helpText": "Retorno conservador durante jubilación (típicamente 4-5%)"
        },
        "inflationRate": {
          "label": "Tasa de Inflación Esperada",
          "helpText": "Promedio a largo plazo EE.UU.: ~3%. Reduce el poder adquisitivo con el tiempo"
        },
        "salaryGrowth": {
          "label": "Crecimiento Anual del Salario",
          "helpText": "Aumento salarial anual esperado (promedio: 2-3%)"
        },
        "incomeReplacement": {
          "label": "Reemplazo de Ingresos en Jubilación",
          "helpText": "% de ingresos pre-jubilación necesarios (asesores recomiendan 70-80%)"
        }
      },
      "results": {
        "totalAtRetirement": {
          "label": "Ahorros Proyectados al Jubilarse"
        },
        "totalInTodaysDollars": {
          "label": "En Dólares de Hoy"
        },
        "nestEggNeeded": {
          "label": "Capital Necesario (Regla 4%)"
        },
        "monthlyRetirementIncome": {
          "label": "Ingresos Mensuales de Jubilación"
        },
        "savingsGap": {
          "label": "Déficit / Excedente de Ahorros"
        },
        "totalContributed": {
          "label": "Total que Contribuiste"
        },
        "totalGrowth": {
          "label": "Crecimiento de Inversión (Ganancias)"
        },
        "yearsMoneyLasts": {
          "label": "Cuánto Dura el Dinero"
        }
      },
      "presets": {
        "freshStart": {
          "label": "Comienzo Fresco (25 años)",
          "description": "Salario $45K, $375/mes, 40 años para crecer"
        },
        "midCareer": {
          "label": "Media Carrera (40 años)",
          "description": "Salario $75K, $750/mes, aporte del empleador"
        },
        "preRetirement": {
          "label": "Pre-Jubilación (55 años)",
          "description": "Salario $100K, $1,500/mes, 12 años restantes"
        },
        "fireEarly": {
          "label": "FIRE (Jubilarse a los 45)",
          "description": "Salario $80K, $3K/mes ahorros agresivos"
        },
        "lateStart": {
          "label": "Inicio Tardío (50 años)",
          "description": "Salario $65K, $1,200/mes, recuperándose"
        }
      },
      "values": {
        "years": "años",
        "year": "año",
        "perMonth": "/mes",
        "perDay": "/día",
        "indefinitely": "Indefinidamente"
      },
      "formats": {
        "summary": "A los {retAge} años, tendrás aproximadamente {total}. Necesitas {needed} para mantener {replacement}% de tus ingresos. {status}."
      },
      "infoCards": {
        "milestones": {
          "title": "Hitos de Jubilación",
          "items": [
            {
              "label": "Años Hasta Jubilación",
              "valueKey": "yearsUntilRetirement"
            },
            {
              "label": "Tasa de Ahorro Efectiva",
              "valueKey": "effectiveSavingsRate"
            },
            {
              "label": "Equivalente de Ahorro Diario",
              "valueKey": "dailySavings"
            },
            {
              "label": "Referencia Fidelity (Tu Edad)",
              "valueKey": "fidelityBenchmark"
            }
          ]
        },
        "insights": {
          "title": "Perspectivas Financieras",
          "items": [
            {
              "label": "Total Aporte del Empleador",
              "valueKey": "totalEmployerMatch"
            },
            {
              "label": "% Cartera por Crecimiento",
              "valueKey": "growthPercent"
            },
            {
              "label": "Tiempo de Duplicación (Regla de 72)",
              "valueKey": "doublingTime"
            },
            {
              "label": "Extra Mensual para Cerrar Brecha",
              "valueKey": "extraMonthlyNeeded"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Jubilación",
          "items": [
            "Comienza temprano: $200/mes desde los 25 al 8% = $702K a los 65. Comenzar a los 35 = $298K — menos de la mitad",
            "Maximiza el aporte de tu empleador — es literalmente dinero gratis. No hacerlo es dejar salario sobre la mesa",
            "Aumenta contribuciones 1% cada año con aumentos. No lo sentirás pero tu yo futuro te lo agradecerá",
            "Considera opciones Roth: paga impuestos ahora, retira libre de impuestos en jubilación cuando las tasas pueden ser más altas"
          ]
        }
      },
      "chart": {
        "title": "Crecimiento de Ahorros para Jubilación",
        "xLabel": "Edad",
        "yLabel": "Valor de Cartera",
        "series": {
          "contributions": "Tus Contribuciones",
          "growth": "Crecimiento de Inversión",
          "target": "Capital Necesario"
        }
      },
      "detailedTable": {
        "yearByYear": {
          "button": "Ver Desglose Año por Año",
          "title": "Proyección de Ahorros para Jubilación",
          "columns": {
            "year": "Año",
            "age": "Edad",
            "salary": "Salario",
            "contribution": "Contribución Anual",
            "employerMatch": "Aporte del Empleador",
            "portfolioValue": "Valor de Cartera",
            "inflationAdjusted": "En $ de Hoy"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es una Calculadora de Jubilación?",
          "content": "Una calculadora de jubilación te ayuda a estimar cuánto dinero necesitas ahorrar para mantener el estilo de vida deseado después de dejar de trabajar. Considera tus ahorros actuales, contribuciones mensuales, retornos de inversión esperados, inflación y cuánto esperas vivir en la jubilación. El objetivo es asegurar que no te quedes sin dinero — un miedo compartido por el 45% de los estadounidenses según una encuesta Gallup de 2024. A diferencia de las calculadoras simples de ahorros, una calculadora de jubilación considera dos fases distintas de tu vida financiera: la fase de acumulación (ahorrar e invertir mientras trabajas) y la fase de distribución (retirar fondos en la jubilación). Durante la acumulación, el interés compuesto trabaja a tu favor; durante la distribución, la inflación y los retiros trabajan en tu contra."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Planificación de Jubilación",
          "content": "La planificación de jubilación gira en torno a una ecuación central: tus ahorros al jubilarte deben generar suficientes ingresos para cubrir tus gastos por el resto de tu vida. Durante tus años de trabajo, tu dinero se capitaliza — ganando retornos sobre retornos. Un retorno anual del 7% duplica tu dinero aproximadamente cada 10 años (la Regla del 72). Esto significa que $10,000 invertidos a los 25 años se convierten en aproximadamente $160,000 a los 65 sin agregar otro dólar. Las variables críticas son: tu tasa de ahorro, tu tasa de retorno, la inflación (que erosiona el poder adquisitivo aproximadamente al 3% por año) y tu horizonte temporal. Incluso pequeños cambios crean enormes diferencias a lo largo de décadas. Aumentar tu tasa de ahorro solo un 1% de tu salario puede agregar decenas de miles a tu fondo de jubilación durante una carrera de 30 años."
        },
        "retirementRules": {
          "title": "Reglas Esenciales de Jubilación",
          "items": [
            {
              "text": "La Regla del 4%: Retira el 4% de tu capital en el primer año, luego ajusta por inflación anualmente. Históricamente dura 30+ años con una asignación de 50-75% en acciones (Bengen, 1994).",
              "type": "info"
            },
            {
              "text": "La Regla del 25x: Ahorra 25 veces tus gastos anuales. Si gastas $60,000/año, apunta a $1,500,000. Esta es la inversa de la regla del 4%.",
              "type": "info"
            },
            {
              "text": "La Regla del 80%: Planifica necesitar 70-80% de tus ingresos pre-jubilación. Algunos gastos desaparecen (transporte), pero la atención médica típicamente aumenta.",
              "type": "info"
            },
            {
              "text": "La Regla del 10-15%: Ahorra al menos 10-15% del ingreso bruto durante tu carrera. ¿Comenzando tarde? Puedes necesitar 20-25%.",
              "type": "warning"
            },
            {
              "text": "Hitos por Edad (Fidelity): Ahorra 1x salario a los 30, 3x a los 40, 6x a los 50, 8x a los 60, 10x a los 67. Verifica tu progreso.",
              "type": "info"
            },
            {
              "text": "Regla del 72: Divide 72 entre tu retorno anual para estimar el tiempo de duplicación. Al 8%, tu dinero se duplica cada 9 años.",
              "type": "info"
            }
          ]
        },
        "incomeSources": {
          "title": "Fuentes de Ingresos de Jubilación",
          "items": [
            {
              "text": "401(k) / 403(b): Planes patrocinados por empleador con posible igualación. Límite 2026: $23,500 ($31,000 si 50+). Crecimiento con impuestos diferidos.",
              "type": "info"
            },
            {
              "text": "IRA Tradicional: Contribuciones deducibles de impuestos, gravadas al retirar. Límite 2026: $7,000 ($8,000 si 50+). Bueno si esperas menor categoría impositiva después.",
              "type": "info"
            },
            {
              "text": "Roth IRA: Contribuciones post-impuestos, retiros libres de impuestos. Mismos límites que Tradicional. Ideal si esperas tasas impositivas más altas en jubilación.",
              "type": "info"
            },
            {
              "text": "Seguro Social: Disponible desde los 62 (reducido) hasta 70 (beneficio máximo). Beneficio promedio 2026: ~$1,900/mes. No diseñado como único ingreso.",
              "type": "warning"
            },
            {
              "text": "Planes de Pensión: Planes de beneficio definido que proporcionan ingresos garantizados. Cada vez más raros en sector privado, aún comunes en gobierno.",
              "type": "info"
            },
            {
              "text": "Inversiones Personales y Bienes Raíces: Cuentas de corretaje gravables, propiedades de alquiler. Flexibles pero carecen de ventajas fiscales de cuentas de jubilación.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Ahorros para Jubilación",
          "description": "Ve cómo la edad de inicio y la tasa de ahorro afectan dramáticamente tu resultado",
          "examples": [
            {
              "title": "Comenzando a los 25: El Poder del Tiempo",
              "steps": [
                "Edad 25, salario $45,000, ahorrando $375/mes (10%)",
                "Ahorros actuales: $5,000",
                "8% retorno pre-jubilación, 3% inflación",
                "40 años de crecimiento compuesto"
              ],
              "result": "~$1,340,000 a los 65 años (~$440,000 en dólares de hoy). Ingreso mensual: ~$4,467 vía regla 4%. El tiempo es tu mayor activo."
            },
            {
              "title": "Comenzando a los 40: Recuperándose",
              "steps": [
                "Edad 40, salario $75,000, ahorrando $750/mes (12%)",
                "Ahorros actuales: $120,000, empleador iguala 50% hasta 6%",
                "7% retorno, 3% inflación, 27 años para jubilación a los 67"
              ],
              "result": "~$1,050,000 a los 67 años (~$470,000 en dólares de hoy). A pesar de ahorrar MÁS mensualmente, menos tiempo para capitalizar significa significativamente menos riqueza."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuánto dinero necesito para jubilarme?",
          "answer": "La regla más utilizada es la Regla del 25x: ahorra 25 veces tus gastos anuales. Si gastas $60,000/año, necesitas $1,500,000. Esto se basa en la regla de retiro del 4%, que históricamente permite que una cartera dure 30+ años. La cantidad exacta depende de tu estilo de vida, necesidades de salud, ubicación y otras fuentes de ingresos como Seguro Social o pensiones."
        },
        {
          "question": "¿A qué edad puedo jubilarme?",
          "answer": "La edad tradicional de jubilación en EE.UU. es 65-67 (para beneficios completos del Seguro Social), pero tu edad real de jubilación depende de la tasa de ahorro. Alguien ahorrando 15% típicamente puede jubilarse alrededor de los 65. El movimiento FIRE muestra que ahorrar 50-70% de los ingresos puede permitir jubilación en 10-17 años, independientemente de la edad de inicio. Los factores clave son el nivel de gasto y la tasa de ahorro, no la edad."
        },
        {
          "question": "¿Qué es la Regla del 4% y aún funciona?",
          "answer": "Desarrollada por William Bengen en 1994, la Regla del 4% establece que retirar el 4% de tu cartera en el primer año, luego ajustar por inflación anualmente, históricamente ha permitido que una cartera 50/50 acciones/bonos dure al menos 30 años. Investigación reciente sugiere que 3.5-4% sigue siendo seguro para jubilaciones de 30 años, aunque jubilaciones más largas (40+ años) pueden justificar 3-3.5%."
        },
        {
          "question": "¿Cómo afecta la inflación los ahorros de jubilación?",
          "answer": "Con 3% de inflación anual, $1 hoy vale solo $0.48 en 25 años. Si necesitas $60,000/año hoy, necesitarás aproximadamente $125,000/año en 25 años para el mismo estilo de vida. Esta calculadora muestra valores nominales y ajustados por inflación para que veas el poder adquisitivo real."
        },
        {
          "question": "¿Debo maximizar mi 401(k) o invertir en otro lugar?",
          "answer": "Orden de prioridad: (1) Contribuye lo suficiente para obtener la igualación completa del empleador — dinero gratis. (2) Maximiza Roth IRA ($7,000 en 2026). (3) Maximiza 401(k) ($23,500 en 2026). (4) Invierte en cuenta de corretaje gravable. Este orden maximiza los beneficios fiscales y la igualación del empleador."
        },
        {
          "question": "¿Qué tasa de retorno debo esperar?",
          "answer": "El S&P 500 ha retornado ~10% anualmente desde 1926 (nominal) o ~7% después de inflación. La mayoría de asesores recomiendan 6-7% pre-jubilación y 4-5% post-jubilación. Usar estimaciones conservadoras es más seguro que ser demasiado optimista."
        },
        {
          "question": "¿Cuánto debo ahorrar cada mes?",
          "answer": "Guía general: 15% del ingreso bruto incluyendo igualación del empleador. Comenzando a los 25, esto proporciona jubilación cómoda a los 65. Comenzar más tarde requiere más: a los 35 apunta al 20%, a los 45 apunta al 25-30%. Usa referencias de Fidelity para verificar: 1x salario a los 30, 3x a los 40, 6x a los 50, 10x a los 67."
        },
        {
          "question": "¿Qué es FIRE (Independencia Financiera, Jubilarse Temprano)?",
          "answer": "FIRE se enfoca en ahorros extremos (50-70% de ingresos) para lograr independencia financiera décadas antes de los 65. Con 50% de tasa de ahorro, jubilarse en ~17 años; con 70%, en ~8.5 años. Las variaciones incluyen LeanFIRE (~$40K/año), FatFIRE ($100K+/año) y BaristaFIRE (semi-jubilación con trabajo de medio tiempo)."
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
      "name": "Calculadora de Aposentadoria",
      "seo": {
        "title": "Calculadora de Aposentadoria - Ferramenta Gratuita de Planejamento",
        "description": "Calcule quanto você precisa para se aposentar confortavelmente. Considere inflação, contribuição do empregador e crescimento composto com projeções anuais.",
        "keywords": [
          "calculadora de aposentadoria",
          "calculadora poupança aposentadoria",
          "quanto para aposentar",
          "calculadora planejamento aposentadoria",
          "quando posso aposentar",
          "calculadora aposentadoria gratuita",
          "calculadora regra 4%",
          "calculadora FIRE"
        ]
      },
      "slug": "calculadora-aposentadoria",
      "subtitle": "Planeje suas economias de aposentadoria e descubra se está no caminho certo para atingir seus objetivos financeiros",
      "inputs": {
        "currentAge": {
          "label": "Idade Atual",
          "helpText": "Sua idade atual em anos",
          "placeholder": "30"
        },
        "retirementAge": {
          "label": "Idade de Aposentadoria",
          "helpText": "A idade que planeja se aposentar (média Brasil: 57-65)",
          "placeholder": "65"
        },
        "annualIncome": {
          "label": "Renda Anual Bruta",
          "helpText": "Seu salário anual atual bruto antes dos impostos",
          "placeholder": "75000"
        },
        "currentSavings": {
          "label": "Poupança Atual de Aposentadoria",
          "helpText": "Total poupado em todas as contas de aposentadoria (FGTS, previdência privada, etc.)",
          "placeholder": "50000"
        },
        "monthlyContribution": {
          "label": "Contribuição Mensal",
          "helpText": "Quanto você poupa por mês para aposentadoria",
          "placeholder": "500"
        },
        "includeEmployerMatch": {
          "label": "Incluir Contrapartida do Empregador",
          "helpText": "Seu empregador contribui para sua aposentadoria?"
        },
        "employerMatchPercent": {
          "label": "Taxa de Contrapartida do Empregador",
          "helpText": "Percentual que seu empregador contribui (ex: 50% = R$ 0,50 para cada R$ 1 que você contribui)",
          "placeholder": "50"
        },
        "matchLimit": {
          "label": "Limite da Contrapartida (% do Salário)",
          "helpText": "Empregador contribui até este % do seu salário (comum: 3-6%)",
          "placeholder": "6"
        },
        "otherMonthlyIncome": {
          "label": "Outra Renda Mensal na Aposentadoria",
          "helpText": "INSS, pensão, renda de aluguel esperada na aposentadoria",
          "placeholder": "0"
        },
        "lifeExpectancy": {
          "label": "Expectativa de Vida",
          "helpText": "Planeje conservadoramente — adultos saudáveis vivem frequentemente até 80-90 anos"
        },
        "preReturnRate": {
          "label": "Taxa de Retorno Pré-Aposentadoria",
          "helpText": "Retorno anual esperado antes da aposentadoria (Ibovespa média: ~12%, após inflação ~6%)"
        },
        "postReturnRate": {
          "label": "Taxa de Retorno Pós-Aposentadoria",
          "helpText": "Retorno conservador durante aposentadoria (tipicamente 4-5%)"
        },
        "inflationRate": {
          "label": "Taxa de Inflação Esperada",
          "helpText": "Média histórica Brasil: ~6%. Reduz poder de compra ao longo do tempo"
        },
        "salaryGrowth": {
          "label": "Crescimento Salarial Anual",
          "helpText": "Aumento salarial anual esperado (média: 3-5%)"
        },
        "incomeReplacement": {
          "label": "Substituição de Renda na Aposentadoria",
          "helpText": "% da renda pré-aposentadoria necessária (consultores recomendam 70-80%)"
        }
      },
      "results": {
        "totalAtRetirement": {
          "label": "Poupança Projetada na Aposentadoria"
        },
        "totalInTodaysDollars": {
          "label": "Em Reais de Hoje"
        },
        "nestEggNeeded": {
          "label": "Reserva Necessária (Regra 4%)"
        },
        "monthlyRetirementIncome": {
          "label": "Renda Mensal de Aposentadoria"
        },
        "savingsGap": {
          "label": "Déficit / Superávit de Poupança"
        },
        "totalContributed": {
          "label": "Total Que Você Contribuiu"
        },
        "totalGrowth": {
          "label": "Crescimento do Investimento (Ganhos)"
        },
        "yearsMoneyLasts": {
          "label": "Quanto Tempo o Dinheiro Dura"
        }
      },
      "presets": {
        "freshStart": {
          "label": "Início de Carreira (25 anos)",
          "description": "Salário R$ 45mil, R$ 375/mês, 40 anos para crescer"
        },
        "midCareer": {
          "label": "Meio de Carreira (40 anos)",
          "description": "Salário R$ 75mil, R$ 750/mês, contrapartida empregador"
        },
        "preRetirement": {
          "label": "Pré-Aposentadoria (55 anos)",
          "description": "Salário R$ 100mil, R$ 1.500/mês, 12 anos restantes"
        },
        "fireEarly": {
          "label": "FIRE (Aposentar aos 45)",
          "description": "Salário R$ 80mil, R$ 3mil/mês poupança agressiva"
        },
        "lateStart": {
          "label": "Início Tardio (50 anos)",
          "description": "Salário R$ 65mil, R$ 1.200/mês, recuperando atraso"
        }
      },
      "values": {
        "years": "anos",
        "year": "ano",
        "perMonth": "/mês",
        "perDay": "/dia",
        "indefinitely": "Indefinidamente"
      },
      "formats": {
        "summary": "Aos {retAge} anos, você terá aproximadamente {total}. Você precisa de {needed} para manter {replacement}% da sua renda. {status}."
      },
      "infoCards": {
        "milestones": {
          "title": "Marcos da Aposentadoria",
          "items": [
            {
              "label": "Anos Até Aposentadoria",
              "valueKey": "yearsUntilRetirement"
            },
            {
              "label": "Taxa Efetiva de Poupança",
              "valueKey": "effectiveSavingsRate"
            },
            {
              "label": "Equivalente Poupança Diária",
              "valueKey": "dailySavings"
            },
            {
              "label": "Referência Fidelity (Sua Idade)",
              "valueKey": "fidelityBenchmark"
            }
          ]
        },
        "insights": {
          "title": "Insights Financeiros",
          "items": [
            {
              "label": "Total Contrapartida Empregador",
              "valueKey": "totalEmployerMatch"
            },
            {
              "label": "% Carteira de Crescimento",
              "valueKey": "growthPercent"
            },
            {
              "label": "Tempo Duplicação (Regra 72)",
              "valueKey": "doublingTime"
            },
            {
              "label": "Mensal Extra para Fechar Déficit",
              "valueKey": "extraMonthlyNeeded"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Aposentadoria",
          "items": [
            "Comece cedo: R$ 200/mês aos 25 anos a 8% = R$ 702mil aos 65. Começando aos 35 = R$ 298mil — menos da metade",
            "Maximize a contrapartida do empregador — é literalmente dinheiro grátis. Não fazer isso é deixar salário na mesa",
            "Aumente contribuições 1% ao ano com aumentos. Você não sentirá, mas seu eu futuro agradecerá",
            "Considere opções de previdência: pague impostos agora, saque livre de impostos na aposentadoria quando alíquotas podem ser maiores"
          ]
        }
      },
      "chart": {
        "title": "Crescimento da Poupança de Aposentadoria",
        "xLabel": "Idade",
        "yLabel": "Valor da Carteira",
        "series": {
          "contributions": "Suas Contribuições",
          "growth": "Crescimento do Investimento",
          "target": "Reserva Necessária"
        }
      },
      "detailedTable": {
        "yearByYear": {
          "button": "Ver Detalhamento Ano a Ano",
          "title": "Projeção de Poupança para Aposentadoria",
          "columns": {
            "year": "Ano",
            "age": "Idade",
            "salary": "Salário",
            "contribution": "Contribuição Anual",
            "employerMatch": "Contrapartida Empregador",
            "portfolioValue": "Valor da Carteira",
            "inflationAdjusted": "Em R$ de Hoje"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O Que É uma Calculadora de Aposentadoria?",
          "content": "Uma calculadora de aposentadoria ajuda você a estimar quanto dinheiro precisa poupar para manter seu estilo de vida desejado após parar de trabalhar. Ela considera suas economias atuais, contribuições mensais, retornos de investimento esperados, inflação e quanto tempo você espera viver na aposentadoria. O objetivo é garantir que você não fique sem dinheiro — um medo compartilhado por 45% dos americanos segundo pesquisa Gallup de 2024. Diferente de calculadoras de poupança simples, uma calculadora de aposentadoria considera duas fases distintas da sua vida financeira: a fase de acumulação (poupando e investindo enquanto trabalha) e a fase de distribuição (sacando fundos na aposentadoria). Durante a acumulação, juros compostos trabalham a seu favor; durante a distribuição, inflação e saques trabalham contra você."
        },
        "howItWorks": {
          "title": "Como Funciona o Planejamento de Aposentadoria",
          "content": "O planejamento de aposentadoria gira em torno de uma equação central: suas economias na aposentadoria devem gerar renda suficiente para cobrir suas despesas pelo resto da vida. Durante seus anos de trabalho, seu dinheiro se multiplica — gerando retornos sobre retornos. Um retorno anual de 7% dobra seu dinheiro aproximadamente a cada 10 anos (a Regra dos 72). Isso significa que R$ 10.000 investidos aos 25 anos se tornam aproximadamente R$ 160.000 aos 65 anos sem adicionar outro centavo. As variáveis críticas são: sua taxa de poupança, sua taxa de retorno, inflação (que corrói o poder de compra a aproximadamente 6% ao ano no Brasil) e seu horizonte de tempo. Mesmo pequenas mudanças criam enormes diferenças ao longo das décadas. Aumentar sua taxa de poupança em apenas 1% do seu salário pode adicionar dezenas de milhares ao seu fundo de aposentadoria ao longo de uma carreira de 30 anos."
        },
        "retirementRules": {
          "title": "Regras Essenciais de Aposentadoria",
          "items": [
            {
              "text": "Regra dos 4%: Saque 4% da sua reserva no primeiro ano, depois ajuste pela inflação anualmente. Historicamente dura 30+ anos com alocação 50-75% ações (Bengen, 1994).",
              "type": "info"
            },
            {
              "text": "Regra dos 25x: Poupe 25 vezes suas despesas anuais. Se você gasta R$ 60.000/ano, almeje R$ 1.500.000. É o inverso da regra dos 4%.",
              "type": "info"
            },
            {
              "text": "Regra dos 80%: Planeje precisar de 70-80% da renda pré-aposentadoria. Algumas despesas desaparecem (transporte), mas saúde tipicamente aumenta.",
              "type": "info"
            },
            {
              "text": "Regra dos 10-15%: Poupe pelo menos 10-15% da renda bruta durante sua carreira. Começando tarde? Pode precisar de 20-25%.",
              "type": "warning"
            },
            {
              "text": "Marcos de Idade (Fidelity): Poupe 1x salário aos 30, 3x aos 40, 6x aos 50, 8x aos 60, 10x aos 67. Verifique seu progresso.",
              "type": "info"
            },
            {
              "text": "Regra dos 72: Divida 72 pelo seu retorno anual para estimar tempo de duplicação. A 8%, seu dinheiro dobra a cada 9 anos.",
              "type": "info"
            }
          ]
        },
        "incomeSources": {
          "title": "Fontes de Renda na Aposentadoria",
          "items": [
            {
              "text": "Previdência Privada: Planos patrocinados por empregador com potencial contrapartida. Crescimento com diferimento fiscal.",
              "type": "info"
            },
            {
              "text": "PGBL: Contribuições dedutíveis do IR, tributado no resgate. Bom se espera faixa de imposto menor depois.",
              "type": "info"
            },
            {
              "text": "VGBL: Contribuições pós-imposto, resgates com tributação apenas sobre rendimentos. Ideal para quem faz declaração simplificada.",
              "type": "info"
            },
            {
              "text": "INSS: Disponível a partir dos 60-65 anos. Benefício médio 2026: ~R$ 1.900/mês. Não foi desenhado como única renda.",
              "type": "warning"
            },
            {
              "text": "Pensões: Planos de benefício definido com renda garantida. Cada vez mais raros no setor privado, ainda comuns no governo.",
              "type": "info"
            },
            {
              "text": "Investimentos Pessoais e Imóveis: Contas de corretagem tributáveis, imóveis para renda. Flexíveis mas sem vantagens fiscais.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Poupança para Aposentadoria",
          "description": "Veja como idade de início e taxa de poupança afetam dramaticamente seu resultado",
          "examples": [
            {
              "title": "Começando aos 25: O Poder do Tempo",
              "steps": [
                "Idade 25, salário R$ 45.000, poupando R$ 375/mês (10%)",
                "Poupança atual: R$ 5.000",
                "8% retorno pré-aposentadoria, 6% inflação",
                "40 anos de crescimento composto"
              ],
              "result": "~R$ 1.340.000 aos 65 anos (~R$ 440.000 em reais de hoje). Renda mensal: ~R$ 4.467 via regra 4%. Tempo é seu maior ativo."
            },
            {
              "title": "Começando aos 40: Recuperando o Atraso",
              "steps": [
                "Idade 40, salário R$ 75.000, poupando R$ 750/mês (12%)",
                "Poupança atual: R$ 120.000, empregador contribui 50% até 6%",
                "7% retorno, 6% inflação, 27 anos para aposentar aos 67"
              ],
              "result": "~R$ 1.050.000 aos 67 anos (~R$ 470.000 em reais de hoje). Apesar de poupar MAIS mensalmente, menos tempo para multiplicar significa significativamente menos riqueza."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quanto dinheiro preciso para me aposentar?",
          "answer": "A regra mais usada é a Regra dos 25x: poupe 25 vezes suas despesas anuais. Se você gasta R$ 60.000/ano, precisa de R$ 1.500.000. Isso é baseado na regra de saque de 4%, que historicamente permite uma carteira durar 30+ anos. O valor exato depende do seu estilo de vida, necessidades de saúde, localização e outras fontes de renda como INSS ou pensões."
        },
        {
          "question": "Com que idade posso me aposentar?",
          "answer": "A idade tradicional de aposentadoria no Brasil é 60-65 anos (para benefícios completos do INSS), mas sua idade real de aposentadoria depende da taxa de poupança. Quem poupa 15% tipicamente pode se aposentar por volta dos 65. O movimento FIRE mostra que poupando 50-70% da renda pode permitir aposentadoria em 10-17 anos, independente da idade inicial. Os fatores-chave são nível de gastos e taxa de poupança, não idade."
        },
        {
          "question": "O que é a Regra dos 4% e ainda funciona?",
          "answer": "Desenvolvida por William Bengen em 1994, a Regra dos 4% estabelece que sacar 4% da carteira no primeiro ano, depois ajustar pela inflação anualmente, historicamente permitiu uma carteira 50/50 ações/renda fixa durar pelo menos 30 anos. Pesquisas recentes sugerem 3,5-4% continua seguro para aposentadorias de 30 anos, embora aposentadorias mais longas (40+ anos) podem justificar 3-3,5%."
        },
        {
          "question": "Como a inflação afeta a poupança para aposentadoria?",
          "answer": "A 6% de inflação anual, R$ 1 hoje vale apenas R$ 0,30 em 25 anos. Se você precisa de R$ 60.000/ano hoje, precisará de cerca de R$ 200.000/ano em 25 anos para o mesmo estilo de vida. Esta calculadora mostra valores nominais e ajustados pela inflação para que você veja o poder de compra real."
        },
        {
          "question": "Devo maximizar minha previdência privada ou investir em outro lugar?",
          "answer": "Ordem de prioridade: (1) Contribua o suficiente para obter contrapartida completa do empregador — dinheiro grátis. (2) Maximize PGBL/VGBL com benefício fiscal. (3) Invista em corretora tributável. Esta ordem maximiza benefícios fiscais e contrapartida do empregador."
        },
        {
          "question": "Que taxa de retorno devo esperar?",
          "answer": "O Ibovespa retornou ~12% anualmente historicamente (nominal) ou ~6% após inflação. A maioria dos consultores recomenda 6-7% pré-aposentadoria e 4-5% pós-aposentadoria. Usar estimativas conservadoras é mais seguro que ser excessivamente otimista."
        },
        {
          "question": "Quanto devo poupar por mês?",
          "answer": "Diretriz geral: 15% da renda bruta incluindo contrapartida do empregador. Começando aos 25, isso proporciona aposentadoria confortável aos 65. Começando mais tarde requer mais: aos 35 almeje 20%, aos 45 almeje 25-30%. Use marcos Fidelity para verificar: 1x salário aos 30, 3x aos 40, 6x aos 50, 10x aos 67."
        },
        {
          "question": "O que é FIRE (Independência Financeira, Aposentar Cedo)?",
          "answer": "FIRE foca em poupança extrema (50-70% da renda) para alcançar independência financeira décadas antes dos 65. Com 50% de taxa de poupança, aposentar em ~17 anos; com 70%, em ~8,5 anos. Variações incluem LeanFIRE (~R$ 40mil/ano), FatFIRE (R$ 100mil+/ano) e BaristaFIRE (semi-aposentadoria com trabalho meio período)."
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
      "name": "Calculateur de Retraite",
      "seo": {
        "title": "Calculateur de Retraite - Outil Gratuit de Planification d'Épargne",
        "description": "Calculez combien vous devez épargner pour prendre votre retraite confortablement. Incluez l'inflation, la contribution employeur et la croissance composée avec des projections année par année.",
        "keywords": [
          "calculateur retraite",
          "calculateur épargne retraite",
          "combien pour retraite",
          "calculateur planification retraite",
          "quand prendre retraite",
          "calculateur retraite gratuit",
          "calculateur règle 4%",
          "calculateur FIRE"
        ]
      },
      "subtitle": "Planifiez votre épargne retraite et découvrez si vous êtes sur la bonne voie pour atteindre vos objectifs financiers",
      "inputs": {
        "currentAge": {
          "label": "Âge Actuel",
          "helpText": "Votre âge actuel en années",
          "placeholder": "30"
        },
        "retirementAge": {
          "label": "Âge de Retraite",
          "helpText": "L'âge auquel vous prévoyez prendre votre retraite (moyenne française: 62-64)",
          "placeholder": "65"
        },
        "annualIncome": {
          "label": "Revenu Annuel Brut",
          "helpText": "Votre salaire annuel brut actuel avant impôts",
          "placeholder": "45000"
        },
        "currentSavings": {
          "label": "Épargne Retraite Actuelle",
          "helpText": "Total épargné dans tous vos comptes retraite (PER, assurance-vie, etc.)",
          "placeholder": "30000"
        },
        "monthlyContribution": {
          "label": "Contribution Mensuelle",
          "helpText": "Combien vous épargnez chaque mois pour la retraite",
          "placeholder": "400"
        },
        "includeEmployerMatch": {
          "label": "Inclure Abondement Employeur",
          "helpText": "Votre employeur contribue-t-il à votre épargne retraite?"
        },
        "employerMatchPercent": {
          "label": "Taux d'Abondement Employeur",
          "helpText": "Pourcentage que votre employeur contribue (ex: 50% = 0,50€ par 1€ que vous versez)",
          "placeholder": "50"
        },
        "matchLimit": {
          "label": "Limite Abondement (% du Salaire)",
          "helpText": "L'employeur contribue jusqu'à ce % de votre salaire (courant: 3-6%)",
          "placeholder": "6"
        },
        "otherMonthlyIncome": {
          "label": "Autres Revenus Mensuels à la Retraite",
          "helpText": "Sécurité sociale, pension, revenus locatifs attendus à la retraite",
          "placeholder": "0"
        },
        "lifeExpectancy": {
          "label": "Espérance de Vie",
          "helpText": "Planifiez prudemment — les adultes en bonne santé vivent souvent jusqu'à 85-95 ans"
        },
        "preReturnRate": {
          "label": "Taux de Rendement Pré-Retraite",
          "helpText": "Rendement annuel attendu avant la retraite (CAC 40 moy: ~6%, après inflation ~4%)"
        },
        "postReturnRate": {
          "label": "Taux de Rendement Post-Retraite",
          "helpText": "Rendement conservateur pendant la retraite (typiquement 3-4%)"
        },
        "inflationRate": {
          "label": "Taux d'Inflation Attendu",
          "helpText": "Moyenne française long terme: ~2%. Réduit le pouvoir d'achat au fil du temps"
        },
        "salaryGrowth": {
          "label": "Croissance Salariale Annuelle",
          "helpText": "Augmentation salariale annuelle attendue (moyenne: 2-3%)"
        },
        "incomeReplacement": {
          "label": "Remplacement de Revenu à la Retraite",
          "helpText": "% du revenu pré-retraite nécessaire (conseillers recommandent 70-80%)"
        }
      },
      "results": {
        "totalAtRetirement": {
          "label": "Épargne Projetée à la Retraite"
        },
        "totalInTodaysDollars": {
          "label": "En Euros d'Aujourd'hui"
        },
        "nestEggNeeded": {
          "label": "Capital Nécessaire (Règle 4%)"
        },
        "monthlyRetirementIncome": {
          "label": "Revenu Mensuel de Retraite"
        },
        "savingsGap": {
          "label": "Déficit / Excédent d'Épargne"
        },
        "totalContributed": {
          "label": "Total de Vos Contributions"
        },
        "totalGrowth": {
          "label": "Croissance des Investissements (Gains)"
        },
        "yearsMoneyLasts": {
          "label": "Durée de Vie de l'Argent"
        }
      },
      "presets": {
        "freshStart": {
          "label": "Nouveau Départ (25 ans)",
          "description": "Salaire 35K€, 300€/mois, 40 ans de croissance"
        },
        "midCareer": {
          "label": "Mi-Carrière (40 ans)",
          "description": "Salaire 50K€, 600€/mois, abondement employeur"
        },
        "preRetirement": {
          "label": "Pré-Retraite (55 ans)",
          "description": "Salaire 65K€, 1200€/mois, 12 ans restants"
        },
        "fireEarly": {
          "label": "FIRE (Retraite à 45)",
          "description": "Salaire 55K€, 2500€/mois épargne agressive"
        },
        "lateStart": {
          "label": "Début Tardif (50 ans)",
          "description": "Salaire 45K€, 1000€/mois, rattrapage"
        }
      },
      "values": {
        "years": "ans",
        "year": "an",
        "perMonth": "/mois",
        "perDay": "/jour",
        "indefinitely": "Indéfiniment"
      },
      "formats": {
        "summary": "À {retAge} ans, vous aurez approximativement {total}. Vous avez besoin de {needed} pour maintenir {replacement}% de votre revenu. {status}."
      },
      "infoCards": {
        "milestones": {
          "title": "Étapes de la Retraite",
          "items": [
            {
              "label": "Années Jusqu'à la Retraite",
              "valueKey": "yearsUntilRetirement"
            },
            {
              "label": "Taux d'Épargne Effectif",
              "valueKey": "effectiveSavingsRate"
            },
            {
              "label": "Équivalent Épargne Quotidienne",
              "valueKey": "dailySavings"
            },
            {
              "label": "Référence Secteur (Votre Âge)",
              "valueKey": "fidelityBenchmark"
            }
          ]
        },
        "insights": {
          "title": "Aperçus Financiers",
          "items": [
            {
              "label": "Total Abondement Employeur",
              "valueKey": "totalEmployerMatch"
            },
            {
              "label": "% Portefeuille par Croissance",
              "valueKey": "growthPercent"
            },
            {
              "label": "Temps de Doublement (Règle 72)",
              "valueKey": "doublingTime"
            },
            {
              "label": "Mensuel Supplémentaire pour Combler",
              "valueKey": "extraMonthlyNeeded"
            }
          ]
        },
        "tips": {
          "title": "Conseils Retraite",
          "items": [
            "Commencez tôt: 200€/mois dès 25 ans à 8% = 702K€ à 65 ans. Commencer à 35 ans = 298K€ — moins de la moitié",
            "Maximisez l'abondement employeur — c'est de l'argent gratuit. Ne pas le faire revient à laisser du salaire sur la table",
            "Augmentez les contributions de 1% chaque année avec les augmentations. Vous ne le sentirez pas mais votre futur vous remerciera",
            "Considérez les options fiscales: payez les impôts maintenant, retirez sans taxe à la retraite quand les taux peuvent être plus élevés"
          ]
        }
      },
      "chart": {
        "title": "Croissance de l'Épargne Retraite",
        "xLabel": "Âge",
        "yLabel": "Valeur du Portefeuille",
        "series": {
          "contributions": "Vos Contributions",
          "growth": "Croissance des Investissements",
          "target": "Capital Nécessaire"
        }
      },
      "detailedTable": {
        "yearByYear": {
          "button": "Voir Détail Année par Année",
          "title": "Projection Épargne Retraite",
          "columns": {
            "year": "Année",
            "age": "Âge",
            "salary": "Salaire",
            "contribution": "Contribution Annuelle",
            "employerMatch": "Abondement Employeur",
            "portfolioValue": "Valeur Portefeuille",
            "inflationAdjusted": "En € d'Aujourd'hui"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Calculateur de Retraite ?",
          "content": "Un calculateur de retraite vous aide à estimer combien d'argent vous devez épargner pour maintenir votre style de vie souhaité après avoir cessé de travailler. Il prend en compte votre épargne actuelle, vos contributions mensuelles, les rendements d'investissement attendus, l'inflation, et combien de temps vous comptez vivre à la retraite. L'objectif est de s'assurer que vous ne survivez pas à votre argent — une peur partagée par 45% des Français selon un sondage de 2024. Contrairement aux calculateurs d'épargne simples, un calculateur de retraite tient compte de deux phases distinctes de votre vie financière : la phase d'accumulation (épargner et investir pendant que vous travaillez) et la phase de distribution (retirer des fonds à la retraite). Pendant l'accumulation, les intérêts composés travaillent en votre faveur ; pendant la distribution, l'inflation et les retraits travaillent contre vous."
        },
        "howItWorks": {
          "title": "Comment Fonctionne la Planification Retraite",
          "content": "La planification retraite tourne autour d'une équation centrale : vos économies à la retraite doivent générer suffisamment de revenus pour couvrir vos dépenses pour le reste de votre vie. Pendant vos années de travail, votre argent se compose — gagnant des rendements sur les rendements. Un rendement annuel de 7% double votre argent environ tous les 10 ans (la Règle de 72). Cela signifie que 10 000€ investis à 25 ans deviennent approximativement 160 000€ à 65 ans sans ajouter un autre euro. Les variables critiques sont : votre taux d'épargne, votre taux de rendement, l'inflation (qui érode le pouvoir d'achat à environ 3% par an), et votre horizon temporel. Même de petits changements créent d'énormes différences sur des décennies. Augmenter votre taux d'épargne de seulement 1% de votre salaire peut ajouter des dizaines de milliers à votre fonds de retraite sur une carrière de 30 ans."
        },
        "retirementRules": {
          "title": "Règles Essentielles de Retraite",
          "items": [
            {
              "text": "La Règle 4% : Retirez 4% de votre capital la première année, puis ajustez pour l'inflation annuellement. Historiquement dure 30+ ans avec 50-75% d'actions (Bengen, 1994).",
              "type": "info"
            },
            {
              "text": "La Règle 25x : Épargnez 25 fois vos dépenses annuelles. Si vous dépensez 60 000€/an, visez 1 500 000€. C'est l'inverse de la règle 4%.",
              "type": "info"
            },
            {
              "text": "La Règle 80% : Prévoyez avoir besoin de 70-80% de votre revenu pré-retraite. Certaines dépenses disparaissent (transport), mais la santé augmente généralement.",
              "type": "info"
            },
            {
              "text": "La Règle 10-15% : Épargnez au moins 10-15% du revenu brut tout au long de votre carrière. Commencez tard ? Vous pourriez avoir besoin de 20-25%.",
              "type": "warning"
            },
            {
              "text": "Étapes d'Âge : Épargnez 1x salaire à 30 ans, 3x à 40, 6x à 50, 8x à 60, 10x à 67. Vérifiez vos progrès.",
              "type": "info"
            },
            {
              "text": "Règle de 72 : Divisez 72 par votre rendement annuel pour estimer le temps de doublement. À 8%, votre argent double tous les 9 ans.",
              "type": "info"
            }
          ]
        },
        "incomeSources": {
          "title": "Sources de Revenus de Retraite",
          "items": [
            {
              "text": "PER (Plan Épargne Retraite) : Plan d'épargne retraite avec déduction fiscale. Plafond 2026 : 10% revenus. Croissance différée fiscalement.",
              "type": "info"
            },
            {
              "text": "Assurance-Vie : Contrat d'épargne avec avantages fiscaux après 8 ans. Transmission facilitée. Rendements variables selon supports.",
              "type": "info"
            },
            {
              "text": "Livret A / LDDS : Épargne garantie mais rendement faible (3% en 2024). Sûr mais ne suit pas l'inflation long terme.",
              "type": "warning"
            },
            {
              "text": "Retraite par Répartition : Sécurité Sociale française. Disponible dès 62 ans (réduite) à taux plein selon trimestres. Pension moyenne : ~1 400€/mois.",
              "type": "warning"
            },
            {
              "text": "Retraite Complémentaire : AGIRC-ARRCO pour salariés privés. Complément obligatoire à la retraite de base. Points accumulés selon cotisations.",
              "type": "info"
            },
            {
              "text": "Investissements Personnels & Immobilier : Comptes-titres, immobilier locatif. Flexibles mais sans avantages fiscaux spécifiques retraite.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples d'Épargne Retraite",
          "description": "Voyez comment l'âge de début et le taux d'épargne affectent dramatiquement votre résultat",
          "examples": [
            {
              "title": "Commencer à 25 ans : Le Pouvoir du Temps",
              "steps": [
                "Âge 25 ans, salaire 35 000€, épargne 300€/mois (10%)",
                "Épargne actuelle : 3 000€",
                "6% de rendement pré-retraite, 2% d'inflation",
                "40 ans de croissance composée"
              ],
              "result": "~850 000€ à 65 ans (~350 000€ en euros d'aujourd'hui). Revenu mensuel : ~2 833€ via règle 4%. Le temps est votre plus grand atout."
            },
            {
              "title": "Commencer à 40 ans : Rattrapage",
              "steps": [
                "Âge 40 ans, salaire 50 000€, épargne 600€/mois (14%)",
                "Épargne actuelle : 80 000€, employeur contribue 50% jusqu'à 6%",
                "5% de rendement, 2% d'inflation, 25 ans jusqu'à retraite à 65"
              ],
              "result": "~650 000€ à 65 ans (~390 000€ en euros d'aujourd'hui). Malgré une épargne mensuelle PLUS élevée, moins de temps pour se composer signifie significativement moins de richesse."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien d'argent ai-je besoin pour prendre ma retraite ?",
          "answer": "La règle la plus utilisée est la Règle 25x : épargner 25 fois vos dépenses annuelles. Si vous dépensez 50 000€/an, vous avez besoin de 1 250 000€. Cela se base sur la règle de retrait 4%, qui permet historiquement à un portefeuille de durer 30+ ans. Le montant exact dépend de votre style de vie, besoins de santé, localisation, et autres sources de revenus comme les pensions."
        },
        {
          "question": "À quel âge puis-je prendre ma retraite ?",
          "answer": "L'âge légal français est 62 ans (retraite à taux plein selon trimestres cotisés), mais votre âge réel de retraite dépend de votre taux d'épargne. Quelqu'un épargnant 15% peut généralement partir vers 65 ans. Le mouvement FIRE montre qu'épargner 50-70% des revenus peut permettre la retraite en 10-17 ans, peu importe l'âge de début. Les facteurs clés sont le niveau de dépenses et le taux d'épargne, pas l'âge."
        },
        {
          "question": "Qu'est-ce que la Règle 4% et fonctionne-t-elle encore ?",
          "answer": "Développée par William Bengen en 1994, la Règle 4% stipule que retirer 4% de votre portefeuille la première année, puis ajuster pour l'inflation annuellement, a historiquement permis à un portefeuille 50/50 actions/obligations de durer au moins 30 ans. Les recherches récentes suggèrent que 3,5-4% reste sûr pour les retraites de 30 ans, bien que les retraites plus longues (40+ ans) peuvent justifier 3-3,5%."
        },
        {
          "question": "Comment l'inflation affecte-t-elle l'épargne retraite ?",
          "answer": "À 2% d'inflation annuelle, 1€ aujourd'hui ne vaut que 0,61€ dans 25 ans. Si vous avez besoin de 50 000€/an aujourd'hui, vous aurez besoin d'environ 82 000€/an dans 25 ans pour le même style de vie. Ce calculateur montre les valeurs nominales et ajustées à l'inflation pour que vous voyiez le vrai pouvoir d'achat."
        },
        {
          "question": "Dois-je maximiser mon PER ou investir ailleurs ?",
          "answer": "Ordre de priorité : (1) Contribuer assez pour obtenir l'abondement employeur complet — argent gratuit. (2) Maximiser PER selon plafond fiscal. (3) Assurance-vie après 8 ans. (4) Investir en compte-titres imposable. Cet ordre maximise les avantages fiscaux et l'abondement employeur."
        },
        {
          "question": "Quel taux de rendement dois-je attendre ?",
          "answer": "Le CAC 40 a rendu ~6% annuellement depuis 1988 (nominal) ou ~4% après inflation. La plupart des conseillers recommandent 4-6% pré-retraite et 3-4% post-retraite en France. Utiliser des estimations conservatrices est plus sûr qu'être trop optimiste."
        },
        {
          "question": "Combien dois-je épargner chaque mois ?",
          "answer": "Directive générale : 15% du revenu brut incluant abondement employeur. Commencer à 25 ans permet une retraite confortable à 65. Commencer plus tard nécessite plus : à 35 ans visez 20%, à 45 ans visez 25-30%. Utilisez les références secteur pour vérifier : 1x salaire à 30 ans, 3x à 40, 6x à 50, 10x à 67."
        },
        {
          "question": "Qu'est-ce que FIRE (Indépendance Financière, Retraite Anticipée) ?",
          "answer": "FIRE se concentre sur l'épargne extrême (50-70% des revenus) pour atteindre l'indépendance financière des décennies avant 65 ans. À 50% de taux d'épargne, retraite en ~17 ans ; à 70%, en ~8,5 ans. Les variantes incluent LeanFIRE (~30K€/an), FatFIRE (80K€+/an), et BaristaFIRE (semi-retraite avec travail à temps partiel)."
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
      "name": "Renten-Rechner",
      "seo": {
        "title": "Renten-Rechner - Kostenloses Altersvorsorge-Planungstool",
        "description": "Berechnen Sie, wie viel Sie für eine komfortable Rente benötigen. Berücksichtigen Sie Inflation, Arbeitgeberzuschuss und Zinseszinseffekt mit jahresgenauen Prognosen.",
        "keywords": [
          "Rentenrechner",
          "Altersvorsorge Rechner",
          "wie viel für Rente",
          "Rentenplanung Rechner",
          "wann kann ich in Rente",
          "kostenloser Rentenrechner",
          "4% Regel Rechner",
          "FIRE Rechner"
        ]
      },
      "subtitle": "Planen Sie Ihre Altersvorsorge und finden Sie heraus, ob Sie auf dem richtigen Weg sind, Ihre finanziellen Ziele zu erreichen",
      "inputs": {
        "currentAge": {
          "label": "Aktuelles Alter",
          "helpText": "Ihr aktuelles Alter in Jahren",
          "placeholder": "30"
        },
        "retirementAge": {
          "label": "Rentenalter",
          "helpText": "Das Alter, in dem Sie in Rente gehen möchten (Deutschland: 65-67)",
          "placeholder": "65"
        },
        "annualIncome": {
          "label": "Jährliches Bruttoeinkommen",
          "helpText": "Ihr aktuelles jährliches Bruttogehalt vor Steuern",
          "placeholder": "75000"
        },
        "currentSavings": {
          "label": "Aktuelle Altersvorsorge",
          "helpText": "Gesamt gespart in allen Altersvorsorgekonten (Riester, Rürup, etc.)",
          "placeholder": "50000"
        },
        "monthlyContribution": {
          "label": "Monatlicher Beitrag",
          "helpText": "Wie viel Sie monatlich für die Altersvorsorge sparen",
          "placeholder": "500"
        },
        "includeEmployerMatch": {
          "label": "Arbeitgeberzuschuss einbeziehen",
          "helpText": "Zahlt Ihr Arbeitgeber einen Zuschuss zu Ihrer Altersvorsorge?"
        },
        "employerMatchPercent": {
          "label": "Arbeitgeberzuschuss-Satz",
          "helpText": "Prozentsatz, den Ihr Arbeitgeber dazugibt (z.B. 50% = 0,50€ pro 1€ Ihres Beitrags)",
          "placeholder": "50"
        },
        "matchLimit": {
          "label": "Zuschuss-Obergrenze (% des Gehalts)",
          "helpText": "Arbeitgeber zahlt bis zu diesem % Ihres Gehalts (üblich: 3-6%)",
          "placeholder": "6"
        },
        "otherMonthlyIncome": {
          "label": "Sonstiges monatliches Einkommen in Rente",
          "helpText": "Gesetzliche Rente, Betriebsrente, Mieteinnahmen in der Rente erwartet",
          "placeholder": "0"
        },
        "lifeExpectancy": {
          "label": "Lebenserwartung",
          "helpText": "Planen Sie konservativ — gesunde Erwachsene leben oft bis 85-95"
        },
        "preReturnRate": {
          "label": "Rendite vor Renteneintritt",
          "helpText": "Erwartete jährliche Rendite vor der Rente (DAX Durchschnitt: ~8%, nach Inflation ~5%)"
        },
        "postReturnRate": {
          "label": "Rendite nach Renteneintritt",
          "helpText": "Konservative Rendite während der Rente (typisch 4-5%)"
        },
        "inflationRate": {
          "label": "Erwartete Inflationsrate",
          "helpText": "Deutschland Langzeit-Durchschnitt: ~2%. Reduziert die Kaufkraft über die Zeit"
        },
        "salaryGrowth": {
          "label": "Jährliches Gehaltswachstum",
          "helpText": "Erwartete jährliche Gehaltserhöhung (Durchschnitt: 2-3%)"
        },
        "incomeReplacement": {
          "label": "Einkommensersatz in der Rente",
          "helpText": "% des Vorruhestandseinkommens benötigt (Berater empfehlen 70-80%)"
        }
      },
      "results": {
        "totalAtRetirement": {
          "label": "Prognostizierte Ersparnisse bei Renteneintritt"
        },
        "totalInTodaysDollars": {
          "label": "In heutiger Kaufkraft"
        },
        "nestEggNeeded": {
          "label": "Benötigtes Kapital (4% Regel)"
        },
        "monthlyRetirementIncome": {
          "label": "Monatliches Renteneinkommen"
        },
        "savingsGap": {
          "label": "Sparlücke / Überschuss"
        },
        "totalContributed": {
          "label": "Gesamt von Ihnen eingezahlt"
        },
        "totalGrowth": {
          "label": "Anlagewachstum (Erträge)"
        },
        "yearsMoneyLasts": {
          "label": "Wie lange das Geld reicht"
        }
      },
      "presets": {
        "freshStart": {
          "label": "Berufsanfänger (Alter 25)",
          "description": "45.000€ Gehalt, 375€/Monat, 40 Jahre zum Wachsen"
        },
        "midCareer": {
          "label": "Mitte der Laufbahn (Alter 40)",
          "description": "75.000€ Gehalt, 750€/Monat, Arbeitgeberzuschuss"
        },
        "preRetirement": {
          "label": "Vor der Rente (Alter 55)",
          "description": "100.000€ Gehalt, 1.500€/Monat, 12 Jahre verbleibend"
        },
        "fireEarly": {
          "label": "FIRE (Rente mit 45)",
          "description": "80.000€ Gehalt, 3.000€/Monat aggressives Sparen"
        },
        "lateStart": {
          "label": "Später Beginn (Alter 50)",
          "description": "65.000€ Gehalt, 1.200€/Monat, aufholen"
        }
      },
      "values": {
        "years": "Jahre",
        "year": "Jahr",
        "perMonth": "/Monat",
        "perDay": "/Tag",
        "indefinitely": "Unbegrenzt"
      },
      "formats": {
        "summary": "Mit {retAge} Jahren haben Sie etwa {total}. Sie benötigen {needed} um {replacement}% Ihres Einkommens zu erhalten. {status}."
      },
      "infoCards": {
        "milestones": {
          "title": "Renten-Meilensteine",
          "items": [
            {
              "label": "Jahre bis zur Rente",
              "valueKey": "yearsUntilRetirement"
            },
            {
              "label": "Effektive Sparquote",
              "valueKey": "effectiveSavingsRate"
            },
            {
              "label": "Tägliches Spar-Äquivalent",
              "valueKey": "dailySavings"
            },
            {
              "label": "Benchmark (Ihr Alter)",
              "valueKey": "fidelityBenchmark"
            }
          ]
        },
        "insights": {
          "title": "Finanzielle Einblicke",
          "items": [
            {
              "label": "Arbeitgeberzuschuss Gesamt",
              "valueKey": "totalEmployerMatch"
            },
            {
              "label": "% Portfolio aus Wachstum",
              "valueKey": "growthPercent"
            },
            {
              "label": "Verdopplungszeit (72er-Regel)",
              "valueKey": "doublingTime"
            },
            {
              "label": "Extra monatlich für Lücke",
              "valueKey": "extraMonthlyNeeded"
            }
          ]
        },
        "tips": {
          "title": "Rententipps",
          "items": [
            "Früh anfangen: 200€/Monat ab 25 bei 8% = 702.000€ mit 65. Start mit 35 = 298.000€ — weniger als die Hälfte",
            "Arbeitgeberzuschuss maximal nutzen — es ist buchstäblich kostenloses Geld. Nicht zu tun bedeutet Gehalt liegen zu lassen",
            "Beiträge jährlich um 1% bei Gehaltserhöhungen steigern. Sie werden es nicht spüren, aber Ihr zukünftiges Ich wird dankbar sein",
            "Steuerbegünstigte Optionen erwägen: Jetzt Steuern zahlen, steuerfrei in Rente abheben wenn Sätze höher sein könnten"
          ]
        }
      },
      "chart": {
        "title": "Altersvorsorgenwachstum",
        "xLabel": "Alter",
        "yLabel": "Portfoliowert",
        "series": {
          "contributions": "Ihre Beiträge",
          "growth": "Anlagewachstum",
          "target": "Benötigtes Kapital"
        }
      },
      "detailedTable": {
        "yearByYear": {
          "button": "Jahr-für-Jahr Aufschlüsselung anzeigen",
          "title": "Altersvorsorge-Prognose",
          "columns": {
            "year": "Jahr",
            "age": "Alter",
            "salary": "Gehalt",
            "contribution": "Jahresbeitrag",
            "employerMatch": "Arbeitgeberzuschuss",
            "portfolioValue": "Portfoliowert",
            "inflationAdjusted": "In heutigen €"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Rentenrechner?",
          "content": "Ein Rentenrechner hilft Ihnen zu schätzen, wie viel Geld Sie sparen müssen, um Ihren gewünschten Lebensstandard nach dem Aufhören zu arbeiten zu erhalten. Er berücksichtigt Ihre aktuellen Ersparnisse, monatlichen Beiträge, erwarteten Anlagerenditen, Inflation und wie lange Sie voraussichtlich in der Rente leben werden. Das Ziel ist sicherzustellen, dass Sie Ihr Geld nicht überleben — eine Sorge, die laut einer 2024 Gallup-Umfrage 45% der Amerikaner teilen. Im Gegensatz zu einfachen Sparrechnern berücksichtigt ein Rentenrechner zwei unterschiedliche Phasen Ihres Finanzlebens: die Ansparphase (Sparen und Investieren während der Arbeit) und die Entnahmephase (Abhebungen in der Rente). Während der Ansparphase arbeitet der Zinseszinseffekt zu Ihren Gunsten; während der Entnahme arbeiten Inflation und Abhebungen gegen Sie."
        },
        "howItWorks": {
          "title": "Wie Rentenplanung funktioniert",
          "content": "Rentenplanung dreht sich um eine Grundgleichung: Ihre Ersparnisse bei Renteneintritt müssen genug Einkommen generieren, um Ihre Ausgaben für den Rest Ihres Lebens zu decken. Während Ihrer Arbeitsjahre wächst Ihr Geld exponentiell — es erwirtschaftet Renditen auf Renditen. Eine 7%ige jährliche Rendite verdoppelt Ihr Geld etwa alle 10 Jahre (72er-Regel). Das bedeutet, 10.000€ investiert mit 25 Jahren werden etwa 160.000€ mit 65 Jahren, ohne einen weiteren Euro hinzuzufügen. Die kritischen Variablen sind: Ihre Sparquote, Ihre Rendite, Inflation (die die Kaufkraft mit etwa 3% pro Jahr erodiert) und Ihr Zeithorizont. Selbst kleine Änderungen schaffen über Jahrzehnte enorme Unterschiede. Eine Erhöhung Ihrer Sparquote um nur 1% Ihres Gehalts kann über eine 30-jährige Laufbahn Zehntausende zu Ihrem Rentenfonds hinzufügen."
        },
        "retirementRules": {
          "title": "Wesentliche Renten-Faustregeln",
          "items": [
            {
              "text": "Die 4%-Regel: Entnehmen Sie 4% Ihres Kapitals im ersten Jahr, dann jährlich inflationsbereinigt. Historisch hält es 30+ Jahre bei 50-75% Aktienanteil (Bengen, 1994).",
              "type": "info"
            },
            {
              "text": "Die 25x-Regel: Sparen Sie das 25-fache Ihrer jährlichen Ausgaben. Bei 60.000€/Jahr Ausgaben streben Sie 1.500.000€ an. Dies ist die Umkehrung der 4%-Regel.",
              "type": "info"
            },
            {
              "text": "Die 80%-Regel: Planen Sie 70-80% des Vorruhestandseinkommens zu benötigen. Manche Ausgaben verschwinden (Pendeln), aber Gesundheitskosten steigen typisch.",
              "type": "info"
            },
            {
              "text": "Die 10-15%-Regel: Sparen Sie mindestens 10-15% des Bruttoeinkommens während Ihrer Laufbahn. Später angefangen? Sie benötigen möglicherweise 20-25%.",
              "type": "warning"
            },
            {
              "text": "Alters-Meilensteine: Sparen Sie 1x Gehalt bis 30, 3x bis 40, 6x bis 50, 8x bis 60, 10x bis 67. Prüfen Sie Ihren Fortschritt.",
              "type": "info"
            },
            {
              "text": "72er-Regel: Teilen Sie 72 durch Ihre jährliche Rendite, um die Verdopplungszeit zu schätzen. Bei 8% verdoppelt sich Ihr Geld alle 9 Jahre.",
              "type": "info"
            }
          ]
        },
        "incomeSources": {
          "title": "Renteneinkommensquellen",
          "items": [
            {
              "text": "Betriebliche Altersvorsorge: Arbeitgeber-gesponserte Pläne mit möglichem Zuschuss. Steuerlich begünstigt.",
              "type": "info"
            },
            {
              "text": "Riester-Rente: Staatlich geförderte private Altersvorsorge. Steuervorteile und Zulagen. Gut bei niedrigerem Steuersatz später.",
              "type": "info"
            },
            {
              "text": "Rürup-Rente: Basisrente mit hohen Steuervorteilen. Gleiche Grenzen wie Riester. Ideal bei höheren Steuersätzen in Rente.",
              "type": "info"
            },
            {
              "text": "Gesetzliche Rente: Verfügbar ab 63-67 (reduziert/voll). Durchschnitt 2024: ~1.500€/Monat. Nicht als alleiniges Einkommen konzipiert.",
              "type": "warning"
            },
            {
              "text": "Betriebsrente: Leistungsdefinierte Pläne mit garantiertem Einkommen. Zunehmend selten im Privatsektor, noch üblich im öffentlichen Dienst.",
              "type": "info"
            },
            {
              "text": "Private Anlagen & Immobilien: Steuerpflichtige Depots, Mietimmobilien. Flexibel aber ohne Steuervorteile der Altersvorsorgekonten.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Altersvorsorge-Beispiele",
          "description": "Sehen Sie, wie Startalter und Sparquote dramatisch Ihr Ergebnis beeinflussen",
          "examples": [
            {
              "title": "Start mit 25: Die Macht der Zeit",
              "steps": [
                "Alter 25, Gehalt 45.000€, sparen 375€/Monat (10%)",
                "Aktuelle Ersparnisse: 5.000€",
                "8% Rendite vor Rente, 3% Inflation",
                "40 Jahre Zinseszinswachstum"
              ],
              "result": "~1.340.000€ mit 65 (~440.000€ in heutiger Kaufkraft). Monatseinkommen: ~4.467€ via 4%-Regel. Zeit ist Ihr größtes Kapital."
            },
            {
              "title": "Start mit 40: Aufholen",
              "steps": [
                "Alter 40, Gehalt 75.000€, sparen 750€/Monat (12%)",
                "Aktuelle Ersparnisse: 120.000€, Arbeitgeber zahlt 50% bis zu 6%",
                "7% Rendite, 3% Inflation, 27 Jahre bis Rente mit 67"
              ],
              "result": "~1.050.000€ mit 67 (~470.000€ in heutiger Kaufkraft). Trotz MEHR monatlichem Sparen bedeutet weniger Zeit für Zinseszins deutlich weniger Vermögen."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viel Geld brauche ich für die Rente?",
          "answer": "Die am weitesten verbreitete Regel ist die 25x-Regel: sparen Sie das 25-fache Ihrer jährlichen Ausgaben. Bei 60.000€/Jahr Ausgaben benötigen Sie 1.500.000€. Dies basiert auf der 4%-Entnahmeregel, die historisch einem Portfolio erlaubt, 30+ Jahre zu halten. Der genaue Betrag hängt von Ihrem Lebensstil, Gesundheitskosten, Standort und anderen Einkommensquellen wie gesetzlicher Rente oder Betriebsrenten ab."
        },
        {
          "question": "In welchem Alter kann ich in Rente gehen?",
          "answer": "Das traditionelle deutsche Rentenalter ist 65-67 (für volle gesetzliche Rente), aber Ihr tatsächliches Rentenalter hängt von der Sparquote ab. Jemand, der 15% spart, kann typisch um 65 in Rente gehen. Die FIRE-Bewegung zeigt, dass 50-70% des Einkommens zu sparen Rente in 10-17 Jahren ermöglichen kann, unabhängig vom Startalter. Die Schlüsselfaktoren sind Ausgabenniveau und Sparquote, nicht das Alter."
        },
        {
          "question": "Was ist die 4%-Regel und funktioniert sie noch?",
          "answer": "1994 von William Bengen entwickelt, besagt die 4%-Regel, dass die Entnahme von 4% Ihres Portfolios im ersten Jahr, dann jährlich inflationsbereinigt, historisch einem 50/50 Aktien/Anleihen-Portfolio erlaubt hat, mindestens 30 Jahre zu halten. Neuere Forschung legt nahe, dass 3,5-4% für 30-jährige Renten sicher bleiben, obwohl längere Renten (40+ Jahre) 3-3,5% rechtfertigen könnten."
        },
        {
          "question": "Wie beeinflusst Inflation die Altersvorsorge?",
          "answer": "Bei 3% jährlicher Inflation ist 1€ heute nur 0,48€ in 25 Jahren wert. Wenn Sie heute 60.000€/Jahr benötigen, brauchen Sie in 25 Jahren etwa 125.000€/Jahr für den gleichen Lebensstil. Dieser Rechner zeigt sowohl nominale als auch inflationsbereinigte Werte, damit Sie die reale Kaufkraft sehen."
        },
        {
          "question": "Soll ich meine betriebliche Altersvorsorge maximieren oder anderswo investieren?",
          "answer": "Prioritätenreihenfolge: (1) Genug beitragen für vollen Arbeitgeberzuschuss — kostenloses Geld. (2) Riester/Rürup maximieren (Förderungen). (3) Betriebliche Altersvorsorge maximieren. (4) In steuerpflichtiges Depot investieren. Diese Reihenfolge maximiert Steuervorteile und Arbeitgeberzuschüsse."
        },
        {
          "question": "Welche Rendite sollte ich erwarten?",
          "answer": "Der DAX hat seit 1988 ~8% jährlich erbracht (nominal) oder ~5% nach Inflation. Die meisten Berater empfehlen 6-7% vor der Rente und 4-5% nach der Rente. Konservative Schätzungen zu verwenden ist sicherer als übermäßig optimistisch zu sein."
        },
        {
          "question": "Wie viel sollte ich monatlich sparen?",
          "answer": "Allgemeine Richtlinie: 15% des Bruttoeinkommens einschließlich Arbeitgeberzuschuss. Mit 25 angefangen ermöglicht dies komfortable Rente mit 65. Später angefangen erfordert mehr: mit 35 streben Sie 20% an, mit 45 streben Sie 25-30% an. Nutzen Sie Benchmarks zur Kontrolle: 1x Gehalt bis 30, 3x bis 40, 6x bis 50, 10x bis 67."
        },
        {
          "question": "Was ist FIRE (Finanzielle Unabhängigkeit, Früh in Rente)?",
          "answer": "FIRE fokussiert auf extremes Sparen (50-70% des Einkommens) um finanzielle Unabhängigkeit Jahrzehnte vor 65 zu erreichen. Bei 50% Sparquote, Rente in ~17 Jahren; bei 70%, in ~8,5 Jahren. Variationen umfassen LeanFIRE (~40.000€/Jahr), FatFIRE (100.000€+/Jahr) und BaristaFIRE (Halb-Rente mit Teilzeitarbeit)."
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

  // ─── INPUTS (NO width:half con unitType, syncGroup:false, autoConvert:false) ───
  inputs: [
    {
      id: "currentAge",
      type: "number",
      defaultValue: null,
      placeholder: "30",
      min: 18,
      max: 80,
      suffix: "years",
    },
    {
      id: "retirementAge",
      type: "number",
      defaultValue: null,
      placeholder: "65",
      min: 30,
      max: 85,
      suffix: "years",
    },
    {
      id: "annualIncome",
      type: "number",
      defaultValue: null,
      placeholder: "75000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "currentSavings",
      type: "number",
      defaultValue: null,
      placeholder: "50000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
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
    },
    {
      id: "includeEmployerMatch",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "employerMatchPercent",
      type: "number",
      defaultValue: null,
      placeholder: "50",
      min: 0,
      max: 200,
      suffix: "%",
      showWhen: { field: "includeEmployerMatch", value: true },
    },
    {
      id: "matchLimit",
      type: "number",
      defaultValue: null,
      placeholder: "6",
      min: 0,
      max: 100,
      suffix: "%",
      showWhen: { field: "includeEmployerMatch", value: true },
    },
    {
      id: "otherMonthlyIncome",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "lifeExpectancy",
      type: "number",
      defaultValue: 90,
      min: 60,
      max: 110,
      suffix: "years",
    },
    {
      id: "preReturnRate",
      type: "number",
      defaultValue: 7,
      min: 0,
      max: 25,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "postReturnRate",
      type: "number",
      defaultValue: 5,
      min: 0,
      max: 20,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "inflationRate",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "salaryGrowth",
      type: "number",
      defaultValue: 2,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "incomeReplacement",
      type: "number",
      defaultValue: 75,
      min: 30,
      max: 120,
      suffix: "%",
    },
  ],

  inputGroups: [],

  results: [
    { id: "totalAtRetirement", type: "primary", format: "text" },
    { id: "totalInTodaysDollars", type: "secondary", format: "text" },
    { id: "nestEggNeeded", type: "secondary", format: "text" },
    { id: "monthlyRetirementIncome", type: "secondary", format: "text" },
    { id: "savingsGap", type: "secondary", format: "text" },
    { id: "totalContributed", type: "secondary", format: "text" },
    { id: "totalGrowth", type: "secondary", format: "text" },
    { id: "yearsMoneyLasts", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "milestones", type: "list", icon: "🏁", itemCount: 4 },
    { id: "insights", type: "list", icon: "🔍", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "retirementGrowth",
    type: "composed",
    xKey: "age",
    height: 350,
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "contributions", type: "area", color: "#2aa6ff", stackId: "total" },
      { key: "growth", type: "area", color: "#10b981", stackId: "total" },
      { key: "target", type: "line", color: "#ef4444", dashed: true },
    ],
  },

  detailedTable: {
    id: "yearByYear",
    buttonLabel: "View Year-by-Year Breakdown",
    buttonIcon: "📋",
    modalTitle: "Retirement Savings Projection",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "age", label: "Age", align: "center" },
      { id: "salary", label: "Salary", align: "right" },
      { id: "contribution", label: "Annual Contribution", align: "right" },
      { id: "employerMatch", label: "Employer Match", align: "right" },
      { id: "portfolioValue", label: "Portfolio Value", align: "right", highlight: true },
      { id: "inflationAdjusted", label: "In Today's $", align: "right" },
    ],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "retirementRules", type: "list", icon: "📋", itemCount: 6 },
    { id: "incomeSources", type: "list", icon: "💰", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [
    { id: "0" }, { id: "1" }, { id: "2" }, { id: "3" },
    { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" },
  ],

  references: [
    {
      authors: "Bengen, William P.",
      year: "1994",
      title: "Determining Withdrawal Rates Using Historical Data",
      source: "Journal of Financial Planning",
      url: "https://www.financialplanningassociation.org/",
    },
    {
      authors: "Social Security Administration",
      year: "2026",
      title: "Retirement Benefits — When to Start Receiving Benefits",
      source: "SSA.gov",
      url: "https://www.ssa.gov/benefits/retirement/",
    },
    {
      authors: "Vanguard Research",
      year: "2025",
      title: "How America Saves — 2025 Report",
      source: "Vanguard",
      url: "https://institutional.vanguard.com/how-america-saves/overview",
    },
  ],

  hero: {},
  sidebar: {},
  features: {},
  relatedCalculators: [
    "compound-interest-calculator",
    "savings-goal-calculator",
    "investment-calculator",
    "inflation-calculator",
    "401k-calculator",
  ],
  ads: {},
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculateRetirementCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Read inputs ───
  const currentAge = values.currentAge as number | null;
  const retirementAge = values.retirementAge as number | null;
  const annualIncome = values.annualIncome as number | null;
  const currentSavings = values.currentSavings as number | null;
  const monthlyContribution = values.monthlyContribution as number | null;
  const includeEmployerMatch = values.includeEmployerMatch as boolean;
  const employerMatchPercent = values.employerMatchPercent as number | null;
  const matchLimit = values.matchLimit as number | null;
  const otherMonthlyIncome = (values.otherMonthlyIncome as number) || 0;
  const lifeExpectancy = (values.lifeExpectancy as number) || 90;
  const preReturnRate = (values.preReturnRate as number) || 7;
  const postReturnRate = (values.postReturnRate as number) || 5;
  const inflationRate = (values.inflationRate as number) || 3;
  const salaryGrowth = (values.salaryGrowth as number) || 2;
  const incomeReplacement = (values.incomeReplacement as number) || 75;

  // ─── Validate required ───
  if (currentAge === null || retirementAge === null || annualIncome === null || currentSavings === null || monthlyContribution === null) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (retirementAge <= currentAge) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (includeEmployerMatch && (employerMatchPercent === null || matchLimit === null)) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ─── Currency symbol ───
  const currUnit = fieldUnits?.annualIncome || fieldUnits?.currentSavings || "USD";
  const sym = CURRENCY_SYMBOLS[currUnit] || "$";

  // ─── Core setup ───
  const yearsToRetirement = retirementAge - currentAge;
  const monthlyPreReturn = preReturnRate / 100 / 12;
  const monthlyPostReturn = postReturnRate / 100 / 12;
  const annualInflation = inflationRate / 100;
  const matchRate = includeEmployerMatch ? (employerMatchPercent || 0) / 100 : 0;
  const matchLimitPct = includeEmployerMatch ? (matchLimit || 0) / 100 : 0;

  // ─── Year-by-year accumulation ───
  let balance = currentSavings;
  let totalYourContrib = 0;
  let totalEmployerMatch = 0;
  let salary = annualIncome;
  const chartData: Array<Record<string, unknown>> = [];
  const tableData: Array<Record<string, unknown>> = [];
  const currentYear = new Date().getFullYear();

  chartData.push({ age: String(currentAge), contributions: Math.round(currentSavings), growth: 0, target: 0 });

  for (let yr = 1; yr <= yearsToRetirement; yr++) {
    const age = currentAge + yr;
    const yearContrib = monthlyContribution * 12;

    let yearMatch = 0;
    if (includeEmployerMatch) {
      const maxMatchable = salary * matchLimitPct;
      const employeeContribForMatch = Math.min(yearContrib, maxMatchable);
      yearMatch = employeeContribForMatch * matchRate;
    }

    const totalAnnualAddition = yearContrib + yearMatch;
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyPreReturn) + (totalAnnualAddition / 12);
    }

    totalYourContrib += yearContrib;
    totalEmployerMatch += yearMatch;
    const inflationFactor = Math.pow(1 + annualInflation, yr);

    tableData.push({
      year: String(currentYear + yr),
      age: String(age),
      salary: `${sym}${fmtNum(Math.round(salary))}`,
      contribution: `${sym}${fmtNum(Math.round(yearContrib))}`,
      employerMatch: `${sym}${fmtNum(Math.round(yearMatch))}`,
      portfolioValue: `${sym}${fmtNum(Math.round(balance))}`,
      inflationAdjusted: `${sym}${fmtNum(Math.round(balance / inflationFactor))}`,
    });

    const cumulativeContrib = currentSavings + totalYourContrib + totalEmployerMatch;
    const investGrowth = Math.max(0, Math.round(balance) - Math.round(cumulativeContrib));
    chartData.push({ age: String(age), contributions: Math.round(cumulativeContrib), growth: investGrowth, target: 0 });

    salary = salary * (1 + salaryGrowth / 100);
  }

  // ─── Retirement needs ───
  const finalSalary = salary;
  const annualNeedNominal = finalSalary * (incomeReplacement / 100);
  const inflationAtRetirement = Math.pow(1 + annualInflation, yearsToRetirement);
  const nestEggNeeded = annualNeedNominal / 0.04;

  for (let i = 0; i < chartData.length; i++) {
    chartData[i].target = Math.round(nestEggNeeded);
  }

  // ─── Totals ───
  const totalAtRetirement = Math.round(balance);
  const totalInTodaysDollars = Math.round(balance / inflationAtRetirement);
  const totalContributed = Math.round(currentSavings + totalYourContrib + totalEmployerMatch);
  const totalGrowth = Math.round(totalAtRetirement - totalContributed);
  const growthPercent = totalAtRetirement > 0 ? Math.round((totalGrowth / totalAtRetirement) * 100) : 0;

  // ─── Monthly income (4% rule) ───
  const monthlyFrom4pct = (totalAtRetirement * 0.04) / 12;
  const totalMonthlyIncome = monthlyFrom4pct + otherMonthlyIncome;
  const monthlyNeed = annualNeedNominal / 12;
  const nestEggGap = totalAtRetirement - nestEggNeeded;

  // ─── How long money lasts ───
  const monthlyWithdrawal = monthlyNeed - otherMonthlyIncome;
  let yearsMoneyLasts: number | string;

  if (monthlyWithdrawal <= 0 || (monthlyPostReturn > 0 && monthlyWithdrawal <= balance * monthlyPostReturn)) {
    yearsMoneyLasts = v["indefinitely"] || "Indefinitely";
  } else if (monthlyPostReturn > 0) {
    const n = Math.log(1 - (balance * monthlyPostReturn / monthlyWithdrawal)) / Math.log(1 + monthlyPostReturn);
    const yrs = Math.abs(n) / 12;
    yearsMoneyLasts = yrs > 100 ? (v["indefinitely"] || "Indefinitely") : Math.round(yrs);
  } else {
    yearsMoneyLasts = Math.round(balance / monthlyWithdrawal / 12);
  }

  const yearsLabel = v["years"] || "years";
  const yearLabel = v["year"] || "year";

  // ─── Gap status ───
  let gapFormatted: string;
  let statusText: string;
  if (nestEggGap >= 0) {
    gapFormatted = `+${sym}${fmtNum(Math.abs(Math.round(nestEggGap)))}`;
    statusText = `You're on track with a ${sym}${fmtNum(Math.abs(Math.round(nestEggGap)))} surplus!`;
  } else {
    gapFormatted = `-${sym}${fmtNum(Math.abs(Math.round(nestEggGap)))}`;
    const extraMo = Math.round(Math.abs(nestEggGap) / (yearsToRetirement * 12));
    statusText = `You have a ${sym}${fmtNum(Math.abs(Math.round(nestEggGap)))} shortfall. Save an extra ${sym}${fmtNum(extraMo)}/mo to close it.`;
  }

  const yearsMoneyLastsFmt = typeof yearsMoneyLasts === "number"
    ? `${yearsMoneyLasts} ${yearsMoneyLasts === 1 ? yearLabel : yearsLabel}`
    : String(yearsMoneyLasts);

  // ─── InfoCard unique values ───
  const effectiveSavingsRate = annualIncome > 0 ? Math.round((monthlyContribution * 12) / annualIncome * 100) : 0;
  const dailySavings = (monthlyContribution / 30.44).toFixed(2);
  const doublingTime = preReturnRate > 0 ? (72 / preReturnRate).toFixed(1) : "N/A";

  let fidelityMultiplier = 1;
  if (currentAge <= 30) fidelityMultiplier = 1;
  else if (currentAge <= 35) fidelityMultiplier = 2;
  else if (currentAge <= 40) fidelityMultiplier = 3;
  else if (currentAge <= 45) fidelityMultiplier = 4;
  else if (currentAge <= 50) fidelityMultiplier = 6;
  else if (currentAge <= 55) fidelityMultiplier = 7;
  else if (currentAge <= 60) fidelityMultiplier = 8;
  else fidelityMultiplier = 10;
  const fidelityTarget = annualIncome * fidelityMultiplier;
  const fidelityStatus = currentSavings >= fidelityTarget ? "✅" : "⚠️";
  const fidelityBenchmark = `${fidelityStatus} ${sym}${fmtNum(Math.round(fidelityTarget))} (${fidelityMultiplier}x salary)`;
  const extraMonthlyNeeded = nestEggGap < 0 && yearsToRetirement > 0 ? Math.round(Math.abs(nestEggGap) / (yearsToRetirement * 12)) : 0;

  // ─── Summary ───
  const summary = (f.summary || "By age {retAge}, you'll have approximately {total}. You need {needed} to maintain {replacement}% of your income. {status}.")
    .replace("{retAge}", String(retirementAge))
    .replace("{total}", `${sym}${fmtNum(totalAtRetirement)}`)
    .replace("{needed}", `${sym}${fmtNum(Math.round(nestEggNeeded))}`)
    .replace("{replacement}", String(incomeReplacement))
    .replace("{status}", statusText);

  return {
    values: {
      totalAtRetirement,
      totalInTodaysDollars,
      nestEggNeeded: Math.round(nestEggNeeded),
      monthlyRetirementIncome: Math.round(totalMonthlyIncome),
      savingsGap: Math.round(nestEggGap),
      totalContributed,
      totalGrowth,
      yearsMoneyLasts: typeof yearsMoneyLasts === "number" ? yearsMoneyLasts : 999,
      totalEmployerMatch: Math.round(totalEmployerMatch),
      growthPercent,
      yearsUntilRetirement: yearsToRetirement,
      effectiveSavingsRate,
      doublingTime: preReturnRate > 0 ? parseFloat((72 / preReturnRate).toFixed(1)) : 0,
      extraMonthlyNeeded,
    },
    formatted: {
      totalAtRetirement: `${sym}${fmtNum(totalAtRetirement)}`,
      totalInTodaysDollars: `${sym}${fmtNum(totalInTodaysDollars)}`,
      nestEggNeeded: `${sym}${fmtNum(Math.round(nestEggNeeded))}`,
      monthlyRetirementIncome: `${sym}${fmtNum(Math.round(totalMonthlyIncome))}${v["perMonth"] || "/mo"}`,
      savingsGap: gapFormatted,
      totalContributed: `${sym}${fmtNum(totalContributed)}`,
      totalGrowth: `${sym}${fmtNum(totalGrowth)}`,
      yearsMoneyLasts: yearsMoneyLastsFmt,
      totalEmployerMatch: `${sym}${fmtNum(Math.round(totalEmployerMatch))}`,
      growthPercent: `${growthPercent}%`,
      yearsUntilRetirement: `${yearsToRetirement} ${yearsToRetirement === 1 ? yearLabel : yearsLabel}`,
      effectiveSavingsRate: `${effectiveSavingsRate}%`,
      dailySavings: `${sym}${dailySavings}${v["perDay"] || "/day"}`,
      fidelityBenchmark,
      doublingTime: `~${doublingTime} ${yearsLabel}`,
      extraMonthlyNeeded: extraMonthlyNeeded > 0 ? `${sym}${fmtNum(extraMonthlyNeeded)}${v["perMonth"] || "/mo"}` : "—",
    },
    summary,
    isValid: true,
    metadata: { chartData, tableData },
  };
}

export default retirementCalculatorConfig;
