import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4";

// =============================================================================
// 401(K) CALCULATOR V4 - Better than Calculator.net, NerdWallet, Bankrate
// =============================================================================

// 2025 IRS Contribution Limits (SECURE 2.0 Act)
const LIMITS_2025 = {
  base: 23500,
  catchUp50: 7500,
  catchUp60: 11250, // New SECURE 2.0 super catch-up for ages 60-63
  combined: 70000,
};

function getContributionLimit(age: number): number {
  if (age >= 60 && age <= 63) return LIMITS_2025.base + LIMITS_2025.catchUp60;
  if (age >= 50) return LIMITS_2025.base + LIMITS_2025.catchUp50;
  return LIMITS_2025.base;
}

// 2025 Federal Tax Brackets (Single Filer)
function estimateTaxRate(income: number): number {
  if (income <= 11925) return 0.10;
  if (income <= 48475) return 0.12;
  if (income <= 103350) return 0.22;
  if (income <= 197300) return 0.24;
  if (income <= 250525) return 0.32;
  if (income <= 626350) return 0.35;
  return 0.37;
}

export const calculator401kConfig: CalculatorConfigV4 = {
  id: "401k-calculator",
  category: "finance",
  icon: "💼",

  t: {
    en: {
      name: "401(k) Calculator",
      slug: "401k-calculator",
      subtitle: "Plan your 401(k) retirement savings",
      breadcrumb: "401(k)",
      seo: {
        title: "401(k) Calculator - Retirement Savings & Employer Match 2025",
        description: "Free 401(k) calculator with 2025 IRS limits ($23,500 + catch-up). Calculate employer match, tax savings, inflation-adjusted balance, and monthly retirement income using the 4% rule.",
        keywords: ["401k calculator", "retirement calculator", "employer match calculator", "401k limits 2025", "retirement savings", "catch-up contributions", "SECURE 2.0"],
      },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
        loading: "Calculating...",
      },
      inputs: {
        currentAge: {
          label: "Current Age",
          helpText: "Your current age in years",
        },
        retirementAge: {
          label: "Retirement Age",
          helpText: "When you plan to retire (typically 65-67)",
        },
        annualSalary: {
          label: "Annual Salary",
          helpText: "Your gross annual income before taxes",
        },
        currentBalance: {
          label: "Current 401(k) Balance",
          helpText: "How much you have saved already",
        },
        contributionPercent: {
          label: "Your Contribution",
          helpText: "Percentage of salary you contribute each year",
        },
        employerMatchPercent: {
          label: "Employer Match Rate",
          helpText: "How much your employer matches (e.g., 50% = $0.50 per $1 you contribute)",
        },
        employerMatchLimit: {
          label: "Employer Match Limit",
          helpText: "Maximum percentage of salary your employer will match",
        },
        expectedReturn: {
          label: "Expected Annual Return",
          helpText: "Historical S&P 500 average: ~10% (7% inflation-adjusted)",
        },
        salaryIncrease: {
          label: "Annual Salary Increase",
          helpText: "Expected yearly raise percentage",
        },
        inflationRate: {
          label: "Inflation Rate",
          helpText: "For calculating balance in today's dollars",
        },
      },
      results: {
        balanceAtRetirement: {
          label: "Balance at Retirement",
          description: "Your projected 401(k) balance",
        },
        balanceInflationAdjusted: {
          label: "In Today's Dollars",
          description: "Balance adjusted for inflation",
        },
        totalYourContributions: {
          label: "Your Total Contributions",
          description: "What you contributed over time",
        },
        totalEmployerContributions: {
          label: "Employer Match Total",
          description: "Free money from your employer",
        },
        totalInvestmentGrowth: {
          label: "Investment Growth",
          description: "Earnings from compound interest",
        },
        taxSavingsThisYear: {
          label: "Tax Savings This Year",
          description: "Estimated tax reduction from contributions",
        },
        monthlyRetirementIncome: {
          label: "Monthly Retirement Income",
          description: "Using the 4% safe withdrawal rule",
        },
        yearsUntilRetirement: {
          label: "Years Until Retirement",
          description: "Time to grow your savings",
        },
      },
      infoCards: {
        summary: {
          title: "Your Retirement Summary",
          items: ["Balance at Retirement", "In Today's Dollars", "Monthly Income (4% Rule)", "Tax Savings This Year"],
        },
        breakdown: {
          title: "Contribution Breakdown",
          items: ["Your Contributions", "Employer Match", "Investment Growth"],
        },
        tips: {
          title: "Maximize Your 401(k)",
          items: [
            "Always contribute enough to get the full employer match - it's free money",
            "Increase your contribution by 1% each year when you get a raise",
            "Take advantage of catch-up contributions after age 50",
            "Review and rebalance your investment allocation annually",
          ],
        },
      },
      referenceData: {
        limits2025: {
          title: "2025 IRS Contribution Limits",
          items: [
            { label: "Under 50", value: "$23,500" },
            { label: "Ages 50-59, 64+", value: "$31,000" },
            { label: "Ages 60-63 (SECURE 2.0)", value: "$34,750" },
            { label: "Total with Employer Match", value: "$70,000" },
          ],
        },
      },
      education: {
        whatIs: {
          title: "What is a 401(k)?",
          content: "A 401(k) is an employer-sponsored retirement savings plan that allows you to contribute a portion of your paycheck before taxes are taken out. Your contributions grow tax-deferred until withdrawal in retirement, meaning you don't pay taxes on investment gains each year. Many employers also offer matching contributions, which is essentially free money added to your retirement savings. The plan is named after Section 401(k) of the Internal Revenue Code.",
        },
        howItWorks: {
          title: "How Employer Matching Works",
          content: "Employer matching is one of the most valuable benefits of a 401(k). A common formula is '50% match up to 6% of salary.' This means if you earn $75,000 and contribute 6% ($4,500), your employer adds 50% of that ($2,250). That's $2,250 in free money! Always contribute at least enough to get the full employer match - not doing so is leaving money on the table. Some employers offer dollar-for-dollar matching or even higher rates.",
        },
        catchUp: {
          title: "Catch-Up Contributions by Age",
          cards: [
            { title: "Under 50", description: "$23,500 max contribution for 2025", icon: "👤" },
            { title: "Ages 50-59, 64+", description: "$31,000 max ($23,500 + $7,500 catch-up)", icon: "⭐" },
            { title: "Ages 60-63", description: "$34,750 max ($23,500 + $11,250 SECURE 2.0)", icon: "🚀" },
          ],
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "Early withdrawals before age 59½ typically incur a 10% penalty plus income taxes", type: "warning" },
            { text: "Required Minimum Distributions (RMDs) must begin at age 73", type: "info" },
            { text: "Employer matching contributions may have a vesting schedule (you might lose some if you leave early)", type: "warning" },
            { text: "Investment returns are not guaranteed and past performance doesn't predict future results", type: "info" },
            { text: "Consider a Roth 401(k) if you expect to be in a higher tax bracket in retirement", type: "info" },
          ],
        },
        example: {
          title: "Growth Examples",
          description: "See how starting early and maximizing employer match impacts your retirement",
          examples: [
            {
              title: "Starting at Age 25",
              steps: ["Age: 25, Salary: $60,000", "Contribution: 10% ($6,000/year)", "Employer: 50% match up to 6%", "7% annual return for 40 years"],
              result: "Balance at 65: ~$1,850,000",
            },
            {
              title: "Starting at Age 40",
              steps: ["Age: 40, Salary: $90,000", "Contribution: 15% ($13,500/year)", "Employer: 100% match up to 4%", "7% annual return for 25 years"],
              result: "Balance at 65: ~$1,100,000",
            },
          ],
        },
      },
      faqs: [
        {
          question: "What are the 401(k) contribution limits for 2025?",
          answer: "For 2025, the employee contribution limit is $23,500. If you're age 50-59 or 64+, you can add a $7,500 catch-up contribution ($31,000 total). Under the SECURE 2.0 Act, those ages 60-63 can contribute an extra $11,250 catch-up ($34,750 total). The combined employee + employer contribution limit is $70,000.",
        },
        {
          question: "Should I choose Traditional or Roth 401(k)?",
          answer: "Traditional 401(k) contributions reduce your taxes now, but you pay taxes on withdrawals in retirement. Roth 401(k) contributions are made after-tax, but qualified withdrawals are completely tax-free. Choose Traditional if you expect to be in a lower tax bracket in retirement. Choose Roth if you expect higher taxes later or want tax-free growth.",
        },
        {
          question: "What happens to my 401(k) if I change jobs?",
          answer: "You have several options: leave it with your old employer (if allowed), roll it over to your new employer's plan, roll it into an IRA, or cash it out (not recommended due to taxes and penalties). Rollovers to IRAs or new 401(k)s are tax-free when done correctly as a direct rollover.",
        },
        {
          question: "What is the 4% rule for retirement withdrawals?",
          answer: "The 4% rule suggests withdrawing 4% of your portfolio in your first year of retirement, then adjusting for inflation each year. This strategy historically provides about 30 years of income without depleting savings. Example: A $1 million portfolio supports approximately $40,000 per year ($3,333/month).",
        },
        {
          question: "What is vesting and why does it matter?",
          answer: "Vesting determines when you fully own your employer's matching contributions. Your own contributions are always 100% yours immediately. However, employer matches often vest over time - for example, 20% per year over 5 years. If you leave before being fully vested, you forfeit the unvested employer contributions.",
        },
        {
          question: "Can I have both a 401(k) and an IRA?",
          answer: "Yes! You can contribute to both a 401(k) and an IRA in the same year. However, if you have a 401(k), your ability to deduct Traditional IRA contributions may be limited based on your income. The recommended strategy: First max out your 401(k) employer match, then fund your IRA, then contribute more to your 401(k).",
        },
      ],
      references: {
        title: "Sources & References",
      },
    },
    es: {
      name: "Calculadora 401(k) 2",
      slug: "calculadora-401k",
      subtitle: "Planifica tus ahorros de jubilación 401(k)",
      breadcrumb: "401(k)",
      seo: {
        title: "Calculadora 401(k) - Ahorros de Retiro y Contribución del Empleador 2025",
        description: "Calculadora 401(k) gratuita con límites IRS 2025 ($23,500 + recuperación). Calcula contribución del empleador, ahorros fiscales, saldo ajustado por inflación e ingresos mensuales de retiro usando la regla del 4%.",
        keywords: ["calculadora 401k", "calculadora de retiro", "calculadora contribución empleador", "límites 401k 2025", "ahorros retiro", "contribuciones de recuperación", "SECURE 2.0"],
      },
      ui: {
        yourInformation: "Tu Información",
        calculate: "Calcular",
        reset: "Reiniciar",
        results: "Resultados",
        loading: "Calculando...",
      },
      inputs: {
        currentAge: {
          label: "Edad Actual",
          helpText: "Tu edad actual en años",
        },
        retirementAge: {
          label: "Edad de Retiro",
          helpText: "Cuándo planeas retirarte (típicamente 65-67)",
        },
        annualSalary: {
          label: "Salario Anual",
          helpText: "Tu ingreso anual bruto antes de impuestos",
        },
        currentBalance: {
          label: "Saldo Actual 401(k)",
          helpText: "Cuánto has ahorrado hasta ahora",
        },
        contributionPercent: {
          label: "Tu Contribución",
          helpText: "Porcentaje de salario que contribuyes cada año",
        },
        employerMatchPercent: {
          label: "Tasa de Contribución del Empleador",
          helpText: "Cuánto contribuye tu empleador (ej: 50% = $0.50 por cada $1 que contribuyes)",
        },
        employerMatchLimit: {
          label: "Límite de Contribución del Empleador",
          helpText: "Porcentaje máximo de salario que tu empleador contribuirá",
        },
        expectedReturn: {
          label: "Rendimiento Anual Esperado",
          helpText: "Promedio histórico S&P 500: ~10% (7% ajustado por inflación)",
        },
        salaryIncrease: {
          label: "Aumento Salarial Anual",
          helpText: "Porcentaje de aumento anual esperado",
        },
        inflationRate: {
          label: "Tasa de Inflación",
          helpText: "Para calcular el saldo en dólares de hoy",
        },
      },
      results: {
        balanceAtRetirement: {
          label: "Saldo al Retiro",
          description: "Tu saldo 401(k) proyectado",
        },
        balanceInflationAdjusted: {
          label: "En Dólares de Hoy",
          description: "Saldo ajustado por inflación",
        },
        totalYourContributions: {
          label: "Tus Contribuciones Totales",
          description: "Lo que contribuiste a lo largo del tiempo",
        },
        totalEmployerContributions: {
          label: "Total de Contribución del Empleador",
          description: "Dinero gratis de tu empleador",
        },
        totalInvestmentGrowth: {
          label: "Crecimiento de Inversión",
          description: "Ganancias del interés compuesto",
        },
        taxSavingsThisYear: {
          label: "Ahorros Fiscales Este Año",
          description: "Reducción estimada de impuestos por contribuciones",
        },
        monthlyRetirementIncome: {
          label: "Ingreso Mensual de Retiro",
          description: "Usando la regla de retiro seguro del 4%",
        },
        yearsUntilRetirement: {
          label: "Años Hasta el Retiro",
          description: "Tiempo para hacer crecer tus ahorros",
        },
      },
      infoCards: {
        summary: {
          title: "Resumen de tu Retiro",
          items: ["Saldo al Retiro", "En Dólares de Hoy", "Ingreso Mensual (Regla 4%)", "Ahorros Fiscales Este Año"],
        },
        breakdown: {
          title: "Desglose de Contribuciones",
          items: ["Tus Contribuciones", "Contribución del Empleador", "Crecimiento de Inversión"],
        },
        tips: {
          title: "Maximiza tu 401(k)",
          items: [
            "Siempre contribuye lo suficiente para obtener la contribución completa del empleador - es dinero gratis",
            "Aumenta tu contribución en 1% cada año cuando recibas un aumento",
            "Aprovecha las contribuciones de recuperación después de los 50 años",
            "Revisa y rebalancea tu asignación de inversiones anualmente",
          ],
        },
      },
      referenceData: {
        limits2025: {
          title: "Límites de Contribución IRS 2025",
          items: [
            { label: "Menor de 50", value: "$23,500" },
            { label: "Edades 50-59, 64+", value: "$31,000" },
            { label: "Edades 60-63 (SECURE 2.0)", value: "$34,750" },
            { label: "Total con Contribución del Empleador", value: "$70,000" },
          ],
        },
      },
      education: {
        whatIs: {
          title: "¿Qué es un 401(k)?",
          content: "Un 401(k) es un plan de ahorros para el retiro patrocinado por el empleador que te permite contribuir una porción de tu sueldo antes de que se deduzcan los impuestos. Tus contribuciones crecen con impuestos diferidos hasta el retiro en la jubilación, lo que significa que no pagas impuestos sobre las ganancias de inversión cada año. Muchos empleadores también ofrecen contribuciones equivalentes, que es esencialmente dinero gratis añadido a tus ahorros de retiro. El plan recibe su nombre de la Sección 401(k) del Código de Rentas Internas.",
        },
        howItWorks: {
          title: "Cómo Funciona la Contribución del Empleador",
          content: "La contribución del empleador es uno de los beneficios más valiosos de un 401(k). Una fórmula común es 'contribución del 50% hasta el 6% del salario.' Esto significa que si ganas $75,000 y contribuyes 6% ($4,500), tu empleador añade 50% de eso ($2,250). ¡Eso son $2,250 en dinero gratis! Siempre contribuye al menos lo suficiente para obtener la contribución completa del empleador - no hacerlo es dejar dinero sobre la mesa. Algunos empleadores ofrecen contribución dólar por dólar o tasas aún más altas.",
        },
        catchUp: {
          title: "Contribuciones de Recuperación por Edad",
          cards: [
            { title: "Menor de 50", description: "Contribución máxima $23,500 para 2025", icon: "👤" },
            { title: "Edades 50-59, 64+", description: "Máximo $31,000 ($23,500 + $7,500 recuperación)", icon: "⭐" },
            { title: "Edades 60-63", description: "Máximo $34,750 ($23,500 + $11,250 SECURE 2.0)", icon: "🚀" },
          ],
        },
        considerations: {
          title: "Consideraciones Importantes",
          items: [
            { text: "Los retiros anticipados antes de los 59½ años típicamente incurren en una penalidad del 10% más impuestos sobre la renta", type: "warning" },
            { text: "Las Distribuciones Mínimas Requeridas (RMDs) deben comenzar a los 73 años", type: "info" },
            { text: "Las contribuciones del empleador pueden tener un cronograma de adquisición (podrías perder algo si te vas temprano)", type: "warning" },
            { text: "Los rendimientos de inversión no están garantizados y el rendimiento pasado no predice resultados futuros", type: "info" },
            { text: "Considera un Roth 401(k) si esperas estar en una categoría impositiva más alta en el retiro", type: "info" },
          ],
        },
        example: {
          title: "Ejemplos de Crecimiento",
          description: "Ve cómo empezar temprano y maximizar la contribución del empleador impacta tu retiro",
          examples: [
            {
              title: "Comenzando a los 25 Años",
              steps: ["Edad: 25, Salario: $60,000", "Contribución: 10% ($6,000/año)", "Empleador: 50% contribución hasta 6%", "7% rendimiento anual por 40 años"],
              result: "Saldo a los 65: ~$1,850,000",
            },
            {
              title: "Comenzando a los 40 Años",
              steps: ["Edad: 40, Salario: $90,000", "Contribución: 15% ($13,500/año)", "Empleador: 100% contribución hasta 4%", "7% rendimiento anual por 25 años"],
              result: "Saldo a los 65: ~$1,100,000",
            },
          ],
        },
      },
      faqs: [
        {
          question: "¿Cuáles son los límites de contribución 401(k) para 2025?",
          answer: "Para 2025, el límite de contribución del empleado es $23,500. Si tienes 50-59 años o 64+, puedes añadir una contribución de recuperación de $7,500 ($31,000 total). Bajo la Ley SECURE 2.0, aquellos de 60-63 años pueden contribuir $11,250 adicionales de recuperación ($34,750 total). El límite combinado empleado + empleador es $70,000.",
        },
        {
          question: "¿Debo elegir 401(k) Tradicional o Roth?",
          answer: "Las contribuciones 401(k) Tradicional reducen tus impuestos ahora, pero pagas impuestos sobre los retiros en el retiro. Las contribuciones Roth 401(k) se hacen después de impuestos, pero los retiros calificados son completamente libres de impuestos. Elige Tradicional si esperas estar en una categoría impositiva más baja en el retiro. Elige Roth si esperas impuestos más altos después o quieres crecimiento libre de impuestos.",
        },
        {
          question: "¿Qué pasa con mi 401(k) si cambio de trabajo?",
          answer: "Tienes varias opciones: dejarlo con tu empleador anterior (si se permite), transferirlo al plan de tu nuevo empleador, transferirlo a un IRA, o cobrarlo (no recomendado debido a impuestos y penalidades). Las transferencias a IRAs o nuevos 401(k)s son libres de impuestos cuando se hacen correctamente como transferencia directa.",
        },
        {
          question: "¿Qué es la regla del 4% para retiros de jubilación?",
          answer: "La regla del 4% sugiere retirar 4% de tu portafolio en tu primer año de retiro, luego ajustar por inflación cada año. Esta estrategia históricamente proporciona aproximadamente 30 años de ingresos sin agotar los ahorros. Ejemplo: Un portafolio de $1 millón sostiene aproximadamente $40,000 por año ($3,333/mes).",
        },
        {
          question: "¿Qué es la adquisición y por qué importa?",
          answer: "La adquisición determina cuándo eres completamente dueño de las contribuciones equivalentes de tu empleador. Tus propias contribuciones siempre son 100% tuyas inmediatamente. Sin embargo, las contribuciones del empleador a menudo se adquieren con el tiempo - por ejemplo, 20% por año durante 5 años. Si te vas antes de estar completamente adquirido, pierdes las contribuciones del empleador no adquiridas.",
        },
        {
          question: "¿Puedo tener tanto un 401(k) como un IRA?",
          answer: "¡Sí! Puedes contribuir tanto a un 401(k) como a un IRA en el mismo año. Sin embargo, si tienes un 401(k), tu capacidad para deducir contribuciones IRA Tradicional puede estar limitada según tus ingresos. La estrategia recomendada: Primero maximiza la contribución equivalente de tu empleador 401(k), luego financia tu IRA, después contribuye más a tu 401(k).",
        },
      ],
      references: {
        title: "Fuentes y Referencias"
      }
    },
    pt: {
      name: "Calculadora 401(k)",
slug: "calculadora-401k",
subtitle: "Planeje sua aposentadoria 401(k)",
breadcrumb: "401(k)",
seo: {
  title: "Calculadora 401(k) - Poupança para Aposentadoria e Contrapartida do Empregador 2025",
  description: "Calculadora 401(k) gratuita com limites IRS 2025 ($23.500 + catch-up). Calcule contrapartida do empregador, economia fiscal, saldo ajustado pela inflação e renda mensal de aposentadoria usando a regra de 4%.",
  keywords: ["calculadora 401k", "calculadora aposentadoria", "calculadora contrapartida empregador", "limites 401k 2025", "poupança aposentadoria", "contribuições catch-up", "SECURE 2.0"],
},
ui: {
  yourInformation: "Suas Informações",
  calculate: "Calcular",
  reset: "Limpar",
  results: "Resultados",
  loading: "Calculando...",
},
inputs: {
  currentAge: {
    label: "Idade Atual",
    helpText: "Sua idade atual em anos",
  },
  retirementAge: {
    label: "Idade de Aposentadoria",
    helpText: "Quando você planeja se aposentar (tipicamente 65-67)",
  },
  annualSalary: {
    label: "Salário Anual",
    helpText: "Sua renda anual bruta antes dos impostos",
  },
  currentBalance: {
    label: "Saldo Atual do 401(k)",
    helpText: "Quanto você já economizou",
  },
  contributionPercent: {
    label: "Sua Contribuição",
    helpText: "Porcentagem do salário que você contribui a cada ano",
  },
  employerMatchPercent: {
    label: "Taxa de Contrapartida do Empregador",
    helpText: "Quanto seu empregador contribui (ex: 50% = R$ 0,50 para cada R$ 1 que você contribui)",
  },
  employerMatchLimit: {
    label: "Limite de Contrapartida do Empregador",
    helpText: "Porcentagem máxima do salário que seu empregador irá contribuir",
  },
  expectedReturn: {
    label: "Retorno Anual Esperado",
    helpText: "Média histórica S&P 500: ~10% (7% ajustado pela inflação)",
  },
  salaryIncrease: {
    label: "Aumento Anual do Salário",
    helpText: "Porcentagem esperada de aumento anual",
  },
  inflationRate: {
    label: "Taxa de Inflação",
    helpText: "Para calcular o saldo em valores de hoje",
  },
},
results: {
  balanceAtRetirement: {
    label: "Saldo na Aposentadoria",
    description: "Seu saldo projetado do 401(k)",
  },
  balanceInflationAdjusted: {
    label: "Em Valores de Hoje",
    description: "Saldo ajustado pela inflação",
  },
  totalYourContributions: {
    label: "Suas Contribuições Totais",
    description: "O que você contribuiu ao longo do tempo",
  },
  totalEmployerContributions: {
    label: "Total da Contrapartida do Empregador",
    description: "Dinheiro gratuito do seu empregador",
  },
  totalInvestmentGrowth: {
    label: "Crescimento do Investimento",
    description: "Ganhos dos juros compostos",
  },
  taxSavingsThisYear: {
    label: "Economia Fiscal Este Ano",
    description: "Redução estimada de impostos das contribuições",
  },
  monthlyRetirementIncome: {
    label: "Renda Mensal na Aposentadoria",
    description: "Usando a regra de retirada segura de 4%",
  },
  yearsUntilRetirement: {
    label: "Anos Até a Aposentadoria",
    description: "Tempo para fazer suas economias crescerem",
  },
},
infoCards: {
  summary: {
    title: "Resumo da Sua Aposentadoria",
    items: ["Saldo na Aposentadoria", "Em Valores de Hoje", "Renda Mensal (Regra 4%)", "Economia Fiscal Este Ano"],
  },
  breakdown: {
    title: "Detalhamento das Contribuições",
    items: ["Suas Contribuições", "Contrapartida do Empregador", "Crescimento do Investimento"],
  },
  tips: {
    title: "Maximize Seu 401(k)",
    items: [
      "Sempre contribua o suficiente para obter a contrapartida total do empregador - é dinheiro gratuito",
      "Aumente sua contribuição em 1% a cada ano quando receber um aumento",
      "Aproveite as contribuições catch-up após os 50 anos",
      "Revise e rebalanceie sua alocação de investimentos anualmente",
    ],
  },
},
referenceData: {
  limits2025: {
    title: "Limites de Contribuição IRS 2025",
    items: [
      { label: "Abaixo de 50", value: "$23.500" },
      { label: "Idades 50-59, 64+", value: "$31.000" },
      { label: "Idades 60-63 (SECURE 2.0)", value: "$34.750" },
      { label: "Total com Contrapartida do Empregador", value: "$70.000" },
    ],
  },
},
education: {
  whatIs: {
    title: "O que é um 401(k)?",
    content: "Um 401(k) é um plano de poupança para aposentadoria patrocinado pelo empregador que permite contribuir uma parte do seu salário antes dos impostos serem deduzidos. Suas contribuições crescem com imposto diferido até a retirada na aposentadoria, o que significa que você não paga impostos sobre os ganhos do investimento a cada ano. Muitos empregadores também oferecem contribuições de contrapartida, que é essencialmente dinheiro gratuito adicionado às suas economias de aposentadoria. O plano tem esse nome devido à Seção 401(k) do Código da Receita Federal.",
  },
  howItWorks: {
    title: "Como Funciona a Contrapartida do Empregador",
    content: "A contrapartida do empregador é um dos benefícios mais valiosos de um 401(k). Uma fórmula comum é 'contrapartida de 50% até 6% do salário'. Isso significa que se você ganha R$ 75.000 e contribui 6% (R$ 4.500), seu empregador adiciona 50% disso (R$ 2.250). São R$ 2.250 em dinheiro gratuito! Sempre contribua pelo menos o suficiente para obter a contrapartida total do empregador - não fazer isso é deixar dinheiro na mesa. Alguns empregadores oferecem contrapartida peso a peso ou taxas ainda maiores.",
  },
  catchUp: {
    title: "Contribuições Catch-Up por Idade",
    cards: [
      { title: "Abaixo de 50", description: "Contribuição máxima de $23.500 para 2025", icon: "👤" },
      { title: "Idades 50-59, 64+", description: "Máximo de $31.000 ($23.500 + $7.500 catch-up)", icon: "⭐" },
      { title: "Idades 60-63", description: "Máximo de $34.750 ($23.500 + $11.250 SECURE 2.0)", icon: "🚀" },
    ],
  },
  considerations: {
    title: "Considerações Importantes",
    items: [
      { text: "Retiradas antecipadas antes dos 59½ anos normalmente incorrem em multa de 10% mais impostos de renda", type: "warning" },
      { text: "Distribuições Mínimas Obrigatórias (RMDs) devem começar aos 73 anos", type: "info" },
      { text: "Contribuições de contrapartida do empregador podem ter um cronograma de vesting (você pode perder algumas se sair cedo)", type: "warning" },
      { text: "Retornos de investimento não são garantidos e performance passada não prevê resultados futuros", type: "info" },
      { text: "Considere um Roth 401(k) se você espera estar numa faixa de imposto maior na aposentadoria", type: "info" },
    ],
  },
  example: {
    title: "Exemplos de Crescimento",
    description: "Veja como começar cedo e maximizar a contrapartida do empregador impacta sua aposentadoria",
    examples: [
      {
        title: "Começando aos 25 Anos",
        steps: ["Idade: 25, Salário: R$ 60.000", "Contribuição: 10% (R$ 6.000/ano)", "Empregador: contrapartida de 50% até 6%", "7% retorno anual por 40 anos"],
        result: "Saldo aos 65: ~R$ 1.850.000",
      },
      {
        title: "Começando aos 40 Anos",
        steps: ["Idade: 40, Salário: R$ 90.000", "Contribuição: 15% (R$ 13.500/ano)", "Empregador: contrapartida de 100% até 4%", "7% retorno anual por 25 anos"],
        result: "Saldo aos 65: ~R$ 1.100.000",
      },
    ],
  },
},
faqs: [
  {
    question: "Quais são os limites de contribuição 401(k) para 2025?",
    answer: "Para 2025, o limite de contribuição do funcionário é $23.500. Se você tem entre 50-59 anos ou 64+ anos, pode adicionar uma contribuição catch-up de $7.500 (total de $31.000). Sob a Lei SECURE 2.0, pessoas de 60-63 anos podem contribuir um catch-up extra de $11.250 (total de $34.750). O limite combinado de contribuição funcionário + empregador é $70.000.",
  },
  {
    question: "Devo escolher 401(k) Tradicional ou Roth?",
    answer: "Contribuições 401(k) Tradicional reduzem seus impostos agora, mas você paga impostos nas retiradas na aposentadoria. Contribuições Roth 401(k) são feitas após impostos, mas retiradas qualificadas são completamente livres de impostos. Escolha Tradicional se você espera estar numa faixa de imposto menor na aposentadoria. Escolha Roth se você espera impostos maiores depois ou quer crescimento livre de impostos.",
  },
  {
    question: "O que acontece com meu 401(k) se eu mudar de emprego?",
    answer: "Você tem várias opções: deixar com seu empregador anterior (se permitido), transferir para o plano do novo empregador, transferir para um IRA, ou sacar tudo (não recomendado devido a impostos e multas). Transferências para IRAs ou novos 401(k)s são livres de impostos quando feitas corretamente como transferência direta.",
  },
  {
    question: "O que é a regra de 4% para retiradas da aposentadoria?",
    answer: "A regra de 4% sugere retirar 4% do seu portfólio no primeiro ano da aposentadoria, depois ajustar pela inflação a cada ano. Esta estratégia historicamente fornece cerca de 30 anos de renda sem esgotar as economias. Exemplo: Um portfólio de R$ 1 milhão sustenta aproximadamente R$ 40.000 por ano (R$ 3.333/mês).",
  },
  {
    question: "O que é vesting e por que importa?",
    answer: "Vesting determina quando você possui totalmente as contribuições de contrapartida do seu empregador. Suas próprias contribuições são sempre 100% suas imediatamente. Porém, contrapartidas do empregador frequentemente fazem vesting ao longo do tempo - por exemplo, 20% por ano durante 5 anos. Se você sair antes de estar totalmente investido, você perde as contribuições do empregador não investidas.",
  },
  {
    question: "Posso ter tanto um 401(k) quanto um IRA?",
    answer: "Sim! Você pode contribuir para ambos 401(k) e IRA no mesmo ano. Porém, se você tem um 401(k), sua capacidade de deduzir contribuições IRA Tradicionais pode ser limitada baseada na sua renda. A estratégia recomendada: Primeiro maximize a contrapartida do empregador do 401(k), depois financie seu IRA, depois contribua mais para seu 401(k).",
  },
],
references: {
  title: "Fontes e Referências"
      }
    },
    fr: {
      name: "Calculateur 401(k)",
      slug: "calculateur-401k",
      subtitle: "Planifiez votre épargne retraite 401(k)",
      breadcrumb: "401(k)",
      seo: {
        title: "Calculateur 401(k) - Épargne Retraite & Abondement Patronal 2025",
        description: "Calculateur 401(k) gratuit avec les plafonds IRS 2025 (23 500 $ + rattrapage). Calculez l'abondement patronal, les économies fiscales, le solde ajusté à l'inflation et le revenu de retraite mensuel selon la règle des 4%.",
        keywords: ["calculateur 401k", "calculateur retraite", "calculateur abondement patronal", "plafonds 401k 2025", "épargne retraite", "contributions de rattrapage", "SECURE 2.0"],
      },
      ui: {
        yourInformation: "Vos Informations",
        calculate: "Calculer",
        reset: "Réinitialiser",
        results: "Résultats",
        loading: "Calcul en cours...",
      },
      inputs: {
        currentAge: {
          label: "Âge Actuel",
          helpText: "Votre âge actuel en années",
        },
        retirementAge: {
          label: "Âge de Retraite",
          helpText: "Âge prévu pour votre retraite (généralement 65-67)",
        },
        annualSalary: {
          label: "Salaire Annuel",
          helpText: "Votre revenu annuel brut avant impôts",
        },
        currentBalance: {
          label: "Solde 401(k) Actuel",
          helpText: "Montant déjà épargné",
        },
        contributionPercent: {
          label: "Votre Contribution",
          helpText: "Pourcentage du salaire que vous versez chaque année",
        },
        employerMatchPercent: {
          label: "Taux d'Abondement Patronal",
          helpText: "Montant versé par votre employeur (ex: 50% = 0,50$ par 1$ que vous versez)",
        },
        employerMatchLimit: {
          label: "Plafond d'Abondement Patronal",
          helpText: "Pourcentage maximum du salaire que votre employeur abondera",
        },
        expectedReturn: {
          label: "Rendement Annuel Attendu",
          helpText: "Moyenne historique S&P 500 : ~10% (7% ajusté à l'inflation)",
        },
        salaryIncrease: {
          label: "Augmentation Salariale Annuelle",
          helpText: "Pourcentage d'augmentation annuelle attendu",
        },
        inflationRate: {
          label: "Taux d'Inflation",
          helpText: "Pour calculer le solde en dollars d'aujourd'hui",
        },
      },
      results: {
        balanceAtRetirement: {
          label: "Solde à la Retraite",
          description: "Votre solde 401(k) projeté",
        },
        balanceInflationAdjusted: {
          label: "En Dollars d'Aujourd'hui",
          description: "Solde ajusté à l'inflation",
        },
        totalYourContributions: {
          label: "Total de Vos Contributions",
          description: "Ce que vous avez versé au fil du temps",
        },
        totalEmployerContributions: {
          label: "Total de l'Abondement Patronal",
          description: "Argent gratuit de votre employeur",
        },
        totalInvestmentGrowth: {
          label: "Croissance des Investissements",
          description: "Gains des intérêts composés",
        },
        taxSavingsThisYear: {
          label: "Économies Fiscales Cette Année",
          description: "Réduction d'impôt estimée des contributions",
        },
        monthlyRetirementIncome: {
          label: "Revenu de Retraite Mensuel",
          description: "Selon la règle sécuritaire des 4%",
        },
        yearsUntilRetirement: {
          label: "Années Avant la Retraite",
          description: "Temps pour faire fructifier votre épargne",
        },
      },
      infoCards: {
        summary: {
          title: "Votre Résumé de Retraite",
          items: ["Solde à la Retraite", "En Dollars d'Aujourd'hui", "Revenu Mensuel (Règle 4%)", "Économies Fiscales Cette Année"],
        },
        breakdown: {
          title: "Répartition des Contributions",
          items: ["Vos Contributions", "Abondement Patronal", "Croissance des Investissements"],
        },
        tips: {
          title: "Maximisez Votre 401(k)",
          items: [
            "Contribuez toujours assez pour obtenir l'abondement patronal complet - c'est de l'argent gratuit",
            "Augmentez votre contribution de 1% chaque année lors d'une augmentation",
            "Profitez des contributions de rattrapage après 50 ans",
            "Révisez et rééquilibrez votre allocation d'investissement annuellement",
          ],
        },
      },
      referenceData: {
        limits2025: {
          title: "Plafonds de Contribution IRS 2025",
          items: [
            { label: "Moins de 50 ans", value: "23 500 $" },
            { label: "50-59 ans, 64+ ans", value: "31 000 $" },
            { label: "60-63 ans (SECURE 2.0)", value: "34 750 $" },
            { label: "Total avec Abondement Patronal", value: "70 000 $" },
          ],
        },
      },
      education: {
        whatIs: {
          title: "Qu'est-ce qu'un 401(k) ?",
          content: "Un 401(k) est un plan d'épargne retraite parrainé par l'employeur qui vous permet de contribuer une partie de votre salaire avant que les impôts ne soient prélevés. Vos contributions croissent avec report d'impôt jusqu'au retrait à la retraite, ce qui signifie que vous ne payez pas d'impôts sur les gains d'investissement chaque année. De nombreux employeurs offrent aussi des contributions d'abondement, qui sont essentiellement de l'argent gratuit ajouté à votre épargne retraite. Le plan tire son nom de la Section 401(k) du Code des impôts américain.",
        },
        howItWorks: {
          title: "Comment Fonctionne l'Abondement Patronal",
          content: "L'abondement patronal est l'un des avantages les plus précieux d'un 401(k). Une formule courante est 'abondement de 50% jusqu'à 6% du salaire'. Cela signifie que si vous gagnez 75 000$ et contribuez 6% (4 500$), votre employeur ajoute 50% de cela (2 250$). C'est 2 250$ d'argent gratuit ! Contribuez toujours au moins assez pour obtenir l'abondement patronal complet - ne pas le faire, c'est laisser de l'argent sur la table. Certains employeurs offrent un abondement dollar pour dollar ou même des taux plus élevés.",
        },
        catchUp: {
          title: "Contributions de Rattrapage par Âge",
          cards: [
            { title: "Moins de 50 ans", description: "23 500$ de contribution maximum pour 2025", icon: "👤" },
            { title: "50-59 ans, 64+ ans", description: "31 000$ max (23 500$ + 7 500$ rattrapage)", icon: "⭐" },
            { title: "60-63 ans", description: "34 750$ max (23 500$ + 11 250$ SECURE 2.0)", icon: "🚀" },
          ],
        },
        considerations: {
          title: "Considérations Importantes",
          items: [
            { text: "Les retraits anticipés avant 59½ ans entraînent généralement une pénalité de 10% plus les impôts sur le revenu", type: "warning" },
            { text: "Les Distributions Minimales Requises (RMD) doivent commencer à 73 ans", type: "info" },
            { text: "Les contributions d'abondement patronal peuvent avoir un calendrier d'acquisition (vous pourriez en perdre une partie si vous partez tôt)", type: "warning" },
            { text: "Les rendements d'investissement ne sont pas garantis et les performances passées ne prédisent pas les résultats futurs", type: "info" },
            { text: "Considérez un Roth 401(k) si vous vous attendez à être dans une tranche d'imposition plus élevée à la retraite", type: "info" },
          ],
        },
        example: {
          title: "Exemples de Croissance",
          description: "Voyez comment commencer tôt et maximiser l'abondement patronal impacte votre retraite",
          examples: [
            {
              title: "Commencer à 25 ans",
              steps: ["Âge : 25 ans, Salaire : 60 000$", "Contribution : 10% (6 000$/an)", "Employeur : abondement 50% jusqu'à 6%", "Rendement annuel 7% pendant 40 ans"],
              result: "Solde à 65 ans : ~1 850 000$",
            },
            {
              title: "Commencer à 40 ans",
              steps: ["Âge : 40 ans, Salaire : 90 000$", "Contribution : 15% (13 500$/an)", "Employeur : abondement 100% jusqu'à 4%", "Rendement annuel 7% pendant 25 ans"],
              result: "Solde à 65 ans : ~1 100 000$",
            },
          ],
        },
      },
      faqs: [
        {
          question: "Quels sont les plafonds de contribution 401(k) pour 2025 ?",
          answer: "Pour 2025, le plafond de contribution employé est de 23 500$. Si vous avez entre 50-59 ans ou 64+ ans, vous pouvez ajouter une contribution de rattrapage de 7 500$ (31 000$ au total). Selon la Loi SECURE 2.0, ceux âgés de 60-63 ans peuvent contribuer un rattrapage supplémentaire de 11 250$ (34 750$ au total). Le plafond combiné employé + employeur est de 70 000$.",
        },
        {
          question: "Dois-je choisir un 401(k) Traditionnel ou Roth ?",
          answer: "Les contributions 401(k) Traditionnel réduisent vos impôts maintenant, mais vous payez des impôts sur les retraits à la retraite. Les contributions Roth 401(k) sont faites après impôt, mais les retraits qualifiés sont complètement libres d'impôt. Choisissez Traditionnel si vous vous attendez à être dans une tranche d'imposition plus basse à la retraite. Choisissez Roth si vous attendez des impôts plus élevés plus tard ou voulez une croissance libre d'impôt.",
        },
        {
          question: "Qu'arrive-t-il à mon 401(k) si je change d'emploi ?",
          answer: "Vous avez plusieurs options : le laisser chez votre ancien employeur (si permis), le transférer au plan de votre nouvel employeur, le transférer dans un IRA, ou l'encaisser (non recommandé à cause des impôts et pénalités). Les transferts vers des IRA ou nouveaux 401(k) sont libres d'impôt quand effectués correctement comme transfert direct.",
        },
        {
          question: "Qu'est-ce que la règle des 4% pour les retraits de retraite ?",
          answer: "La règle des 4% suggère de retirer 4% de votre portefeuille dans votre première année de retraite, puis d'ajuster pour l'inflation chaque année. Cette stratégie fournit historiquement environ 30 ans de revenu sans épuiser l'épargne. Exemple : Un portefeuille de 1 million$ soutient approximativement 40 000$ par année (3 333$/mois).",
        },
        {
          question: "Qu'est-ce que l'acquisition et pourquoi est-ce important ?",
          answer: "L'acquisition détermine quand vous possédez complètement les contributions d'abondement de votre employeur. Vos propres contributions vous appartiennent toujours à 100% immédiatement. Cependant, les abondements patronaux s'acquièrent souvent au fil du temps - par exemple, 20% par année sur 5 ans. Si vous partez avant d'être complètement acquis, vous perdez les contributions patronales non acquises.",
        },
        {
          question: "Puis-je avoir à la fois un 401(k) et un IRA ?",
          answer: "Oui ! Vous pouvez contribuer à la fois à un 401(k) et un IRA la même année. Cependant, si vous avez un 401(k), votre capacité à déduire les contributions IRA Traditionnelles peut être limitée selon votre revenu. La stratégie recommandée : Maximisez d'abord l'abondement patronal 401(k), puis financez votre IRA, puis contribuez plus à votre 401(k).",
        },
      ],
      references: {
        title: "Sources et Références"
      }
    },
    de: {
      name: "401(k) Rechner",
      slug: "rechner-401k-altersvorsorge",
      subtitle: "Planen Sie Ihre 401(k)-Altersvorsorge",
      breadcrumb: "401(k)",
      seo: {
        title: "401(k) Rechner - Altersvorsorge & Arbeitgeberzuschuss 2025",
        description: "Kostenloser 401(k) Rechner mit 2025 IRS-Grenzen ($23.500 + Aufholbeiträge). Berechnen Sie Arbeitgeberzuschuss, Steuerersparnisse, inflationsbereinigte Bilanz und monatliches Renteneinkommen mit der 4%-Regel.",
        keywords: ["401k rechner", "altersvorsorge rechner", "arbeitgeberzuschuss rechner", "401k grenzen 2025", "altersvorsorge", "aufholbeiträge", "SECURE 2.0"],
      },
      ui: {
        yourInformation: "Ihre Angaben",
        calculate: "Berechnen",
        reset: "Zurücksetzen",
        results: "Ergebnisse",
        loading: "Berechnung läuft...",
      },
      inputs: {
        currentAge: {
          label: "Aktuelles Alter",
          helpText: "Ihr aktuelles Alter in Jahren",
        },
        retirementAge: {
          label: "Renteneintrittsalter",
          helpText: "Wann Sie in Rente gehen möchten (normalerweise 65-67)",
        },
        annualSalary: {
          label: "Jahresgehalt",
          helpText: "Ihr Bruttojahreseinkommen vor Steuern",
        },
        currentBalance: {
          label: "Aktuelles 401(k) Guthaben",
          helpText: "Wie viel Sie bereits angespart haben",
        },
        contributionPercent: {
          label: "Ihr Beitrag",
          helpText: "Prozentsatz des Gehalts, den Sie jährlich einzahlen",
        },
        employerMatchPercent: {
          label: "Arbeitgeberzuschuss-Rate",
          helpText: "Wie viel Ihr Arbeitgeber dazugibt (z.B. 50% = 0,50€ pro 1€ den Sie einzahlen)",
        },
        employerMatchLimit: {
          label: "Arbeitgeberzuschuss-Grenze",
          helpText: "Maximaler Prozentsatz des Gehalts, den Ihr Arbeitgeber dazugibt",
        },
        expectedReturn: {
          label: "Erwartete jährliche Rendite",
          helpText: "Historischer S&P 500 Durchschnitt: ~10% (7% inflationsbereinigt)",
        },
        salaryIncrease: {
          label: "Jährliche Gehaltserhöhung",
          helpText: "Erwarteter Prozentsatz der jährlichen Gehaltserhöhung",
        },
        inflationRate: {
          label: "Inflationsrate",
          helpText: "Zur Berechnung des Guthabens in heutigen Euro",
        },
      },
      results: {
        balanceAtRetirement: {
          label: "Guthaben bei Renteneintritt",
          description: "Ihr prognostiziertes 401(k) Guthaben",
        },
        balanceInflationAdjusted: {
          label: "In heutigen Euro",
          description: "Inflationsbereinigtes Guthaben",
        },
        totalYourContributions: {
          label: "Ihre Gesamtbeiträge",
          description: "Was Sie über die Zeit eingezahlt haben",
        },
        totalEmployerContributions: {
          label: "Arbeitgeberzuschuss Gesamt",
          description: "Kostenloses Geld von Ihrem Arbeitgeber",
        },
        totalInvestmentGrowth: {
          label: "Anlagewachstum",
          description: "Erträge durch Zinseszinseffekt",
        },
        taxSavingsThisYear: {
          label: "Steuerersparnis dieses Jahr",
          description: "Geschätzte Steuerreduzierung durch Beiträge",
        },
        monthlyRetirementIncome: {
          label: "Monatliches Renteneinkommen",
          description: "Mit der 4% sicheren Entnahme-Regel",
        },
        yearsUntilRetirement: {
          label: "Jahre bis zur Rente",
          description: "Zeit zum Wachstum Ihrer Ersparnisse",
        },
      },
      infoCards: {
        summary: {
          title: "Ihre Altersvorsorge-Zusammenfassung",
          items: ["Guthaben bei Renteneintritt", "In heutigen Euro", "Monatliches Einkommen (4%-Regel)", "Steuerersparnis dieses Jahr"],
        },
        breakdown: {
          title: "Beitrags-Aufschlüsselung",
          items: ["Ihre Beiträge", "Arbeitgeberzuschuss", "Anlagewachstum"],
        },
        tips: {
          title: "Maximieren Sie Ihre 401(k)",
          items: [
            "Zahlen Sie immer genug ein, um den vollen Arbeitgeberzuschuss zu erhalten - es ist kostenloses Geld",
            "Erhöhen Sie Ihren Beitrag jedes Jahr um 1%, wenn Sie eine Gehaltserhöhung bekommen",
            "Nutzen Sie Aufholbeiträge nach dem 50. Lebensjahr",
            "Überprüfen und balancieren Sie Ihre Anlagenaufteilung jährlich neu",
          ],
        },
      },
      referenceData: {
        limits2025: {
          title: "2025 IRS Beitragsgrenzen",
          items: [
            { label: "Unter 50", value: "$23.500" },
            { label: "Alter 50-59, 64+", value: "$31.000" },
            { label: "Alter 60-63 (SECURE 2.0)", value: "$34.750" },
            { label: "Gesamt mit Arbeitgeberzuschuss", value: "$70.000" },
          ],
        },
      },
      education: {
        whatIs: {
          title: "Was ist ein 401(k)?",
          content: "Ein 401(k) ist ein arbeitgeberfinanzierter Altersvorsorgeplan, der es Ihnen ermöglicht, einen Teil Ihres Gehalts vor Steuerabzug einzuzahlen. Ihre Beiträge wachsen steuerfrei bis zur Entnahme im Ruhestand, das bedeutet, Sie zahlen keine Steuern auf Anlageerträge während der Ansparphase. Viele Arbeitgeber bieten auch Zuschüsse an, was praktisch kostenloses Geld für Ihre Altersvorsorge ist. Der Plan ist nach Abschnitt 401(k) des Internal Revenue Code benannt.",
        },
        howItWorks: {
          title: "Wie der Arbeitgeberzuschuss funktioniert",
          content: "Der Arbeitgeberzuschuss ist einer der wertvollsten Vorteile eines 401(k). Eine übliche Formel ist '50% Zuschuss bis zu 6% des Gehalts.' Das bedeutet, wenn Sie 75.000€ verdienen und 6% (4.500€) einzahlen, gibt Ihr Arbeitgeber 50% davon dazu (2.250€). Das sind 2.250€ kostenloses Geld! Zahlen Sie immer mindestens genug ein, um den vollen Arbeitgeberzuschuss zu erhalten - andernfalls verschenken Sie Geld. Manche Arbeitgeber bieten Euro-für-Euro-Zuschüsse oder sogar höhere Raten.",
        },
        catchUp: {
          title: "Aufholbeiträge nach Alter",
          cards: [
            { title: "Unter 50", description: "$23.500 maximaler Beitrag für 2025", icon: "👤" },
            { title: "Alter 50-59, 64+", description: "$31.000 maximal ($23.500 + $7.500 Aufholbeitrag)", icon: "⭐" },
            { title: "Alter 60-63", description: "$34.750 maximal ($23.500 + $11.250 SECURE 2.0)", icon: "🚀" },
          ],
        },
        considerations: {
          title: "Wichtige Überlegungen",
          items: [
            { text: "Vorzeitige Entnahmen vor dem 59½ Lebensjahr führen normalerweise zu 10% Strafe plus Einkommensteuer", type: "warning" },
            { text: "Mindestentnahmen (RMDs) müssen ab dem 73. Lebensjahr beginnen", type: "info" },
            { text: "Arbeitgeberzuschüsse können eine Wartezeit haben (Sie könnten etwas verlieren, wenn Sie früh kündigen)", type: "warning" },
            { text: "Anlageerträge sind nicht garantiert und vergangene Performance sagt nichts über zukünftige Ergebnisse aus", type: "info" },
            { text: "Erwägen Sie eine Roth 401(k), wenn Sie erwarten, im Ruhestand in einer höheren Steuerklasse zu sein", type: "info" },
          ],
        },
        example: {
          title: "Wachstumsbeispiele",
          description: "Sehen Sie, wie ein früher Start und maximaler Arbeitgeberzuschuss Ihre Rente beeinflussen",
          examples: [
            {
              title: "Start mit 25 Jahren",
              steps: ["Alter: 25, Gehalt: 60.000€", "Beitrag: 10% (6.000€/Jahr)", "Arbeitgeber: 50% Zuschuss bis 6%", "7% jährliche Rendite für 40 Jahre"],
              result: "Guthaben mit 65: ~1.850.000€",
            },
            {
              title: "Start mit 40 Jahren",
              steps: ["Alter: 40, Gehalt: 90.000€", "Beitrag: 15% (13.500€/Jahr)", "Arbeitgeber: 100% Zuschuss bis 4%", "7% jährliche Rendite für 25 Jahre"],
              result: "Guthaben mit 65: ~1.100.000€",
            },
          ],
        },
      },
      faqs: [
        {
          question: "Was sind die 401(k) Beitragsgrenzen für 2025?",
          answer: "Für 2025 beträgt die Arbeitnehmer-Beitragsgrenze $23.500. Wenn Sie 50-59 oder 64+ Jahre alt sind, können Sie einen $7.500 Aufholbeitrag hinzufügen ($31.000 gesamt). Unter dem SECURE 2.0 Gesetz können 60-63-Jährige einen zusätzlichen $11.250 Aufholbeitrag leisten ($34.750 gesamt). Die kombinierte Arbeitnehmer + Arbeitgeber Beitragsgrenze liegt bei $70.000.",
        },
        {
          question: "Soll ich traditionelle oder Roth 401(k) wählen?",
          answer: "Traditionelle 401(k) Beiträge reduzieren Ihre Steuern jetzt, aber Sie zahlen Steuern auf Entnahmen im Ruhestand. Roth 401(k) Beiträge werden nach Steuern geleistet, aber qualifizierte Entnahmen sind völlig steuerfrei. Wählen Sie traditionell, wenn Sie erwarten, im Ruhestand in einer niedrigeren Steuerklasse zu sein. Wählen Sie Roth, wenn Sie höhere Steuern später erwarten oder steuerfreies Wachstum wollen.",
        },
        {
          question: "Was passiert mit meiner 401(k), wenn ich den Job wechsle?",
          answer: "Sie haben mehrere Optionen: bei Ihrem alten Arbeitgeber lassen (falls erlaubt), zu Ihrem neuen Arbeitgeberplan übertragen, in eine IRA übertragen oder auszahlen lassen (nicht empfohlen wegen Steuern und Strafen). Übertragungen zu IRAs oder neuen 401(k)s sind steuerfrei, wenn sie korrekt als direkte Übertragung durchgeführt werden.",
        },
        {
          question: "Was ist die 4%-Regel für Renten-Entnahmen?",
          answer: "Die 4%-Regel schlägt vor, 4% Ihres Portfolios im ersten Jahr der Rente zu entnehmen und dann jährlich an die Inflation anzupassen. Diese Strategie bietet historisch etwa 30 Jahre Einkommen ohne Erschöpfung der Ersparnisse. Beispiel: Ein 1-Millionen-Portfolio unterstützt etwa 40.000€ pro Jahr (3.333€/Monat).",
        },
        {
          question: "Was ist Wartezeit und warum ist sie wichtig?",
          answer: "Die Wartezeit bestimmt, wann Sie vollständig Eigentümer der Arbeitgeberzuschüsse werden. Ihre eigenen Beiträge gehören immer sofort zu 100% Ihnen. Arbeitgeberzuschüsse haben jedoch oft Wartezeiten - zum Beispiel 20% pro Jahr über 5 Jahre. Wenn Sie vor vollständiger Wartezeit kündigen, verlieren Sie die nicht gedeckten Arbeitgeberbeiträge.",
        },
        {
          question: "Kann ich sowohl eine 401(k) als auch eine IRA haben?",
          answer: "Ja! Sie können im selben Jahr sowohl zu einer 401(k) als auch zu einer IRA beitragen. Wenn Sie jedoch eine 401(k) haben, kann Ihre Möglichkeit, traditionelle IRA-Beiträge abzuziehen, basierend auf Ihrem Einkommen begrenzt sein. Die empfohlene Strategie: Erst den 401(k) Arbeitgeberzuschuss maximieren, dann Ihre IRA finanzieren, dann mehr zur 401(k) beitragen.",
        },
      ],
      references: {
        title: "Quellen & Referenzen"
      }
    },
  },

  inputs: [
    {
      id: "currentAge",
      showSlider: true,
      type: "number",
      defaultValue: 30,
      min: 18,
      max: 70,
      step: 1,
      suffix: "years",
    },
    {
      id: "retirementAge",
      showSlider: true,
      type: "number",
      defaultValue: 65,
      min: 50,
      max: 80,
      step: 1,
      suffix: "years",
    },
    {
      id: "annualSalary",
      type: "currency",
      defaultValue: 75000,
      min: 0,
      step: 1000,
    },
    {
      id: "currentBalance",
      type: "currency",
      defaultValue: 50000,
      min: 0,
      step: 1000,
    },
    {
      id: "contributionPercent",
      showSlider: true,
      type: "number",
      defaultValue: 10,
      min: 1,
      max: 100,
      step: 1,
      suffix: "%",
    },
    {
      id: "employerMatchPercent",
      showSlider: true,
      type: "number",
      defaultValue: 50,
      min: 0,
      max: 100,
      step: 5,
      suffix: "%",
    },
    {
      id: "employerMatchLimit",
      showSlider: true,
      type: "number",
      defaultValue: 6,
      min: 0,
      max: 15,
      step: 1,
      suffix: "%",
    },
    {
      id: "expectedReturn",
      showSlider: true,
      type: "number",
      defaultValue: 7,
      min: 1,
      max: 15,
      step: 0.5,
      suffix: "%",
    },
    {
      id: "salaryIncrease",
      showSlider: true,
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 10,
      step: 0.5,
      suffix: "%",
    },
    {
      id: "inflationRate",
      showSlider: true,
      type: "number",
      defaultValue: 2.5,
      min: 0,
      max: 8,
      step: 0.5,
      suffix: "%",
    },
  ],

  results: [
    { id: "balanceAtRetirement", type: "primary", label: "Balance at Retirement", format: "currency" },
    { id: "balanceInflationAdjusted", format: "currency" },
    { id: "totalYourContributions", format: "currency" },
    { id: "totalEmployerContributions", format: "currency" },
    { id: "totalInvestmentGrowth", format: "currency" },
    { id: "taxSavingsThisYear", format: "currency" },
    { id: "monthlyRetirementIncome", format: "currency" },
    { id: "yearsUntilRetirement", format: "number" },
  ],

  infoCards: [
    {
      id: "summary",
      type: "list",
      icon: "📊",
      items: [
        { valueKey: "balanceAtRetirement" },
        { valueKey: "balanceInflationAdjusted" },
        { valueKey: "monthlyRetirementIncome" },
        { valueKey: "taxSavingsThisYear" },
      ],
    },
    {
      id: "breakdown",
      type: "list",
      icon: "💰",
      items: [
        { valueKey: "totalYourContributions" },
        { valueKey: "totalEmployerContributions" },
        { valueKey: "totalInvestmentGrowth" },
      ],
    },
    {
      id: "tips",
      type: "horizontal",
      icon: "💡",
      items: [{}, {}, {}, {}],
    },
  ],

  referenceData: [
    {
      id: "limits2025",
      icon: "📋",
      columns: 2,
      items: [{}, {}, {}, {}],
    },
  ],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    {
      id: "catchUp",
      type: "cards",
      icon: "🎯",
      columns: 3,
    },
    { id: "considerations", type: "list", icon: "⚠️" },
    { id: "example", type: "code-example", icon: "🧮", columns: 2 },
  ],

  references: [
    {
      authors: "Internal Revenue Service",
      year: "2024",
      title: "401(k) limit increases to $23,500 for 2025",
      source: "IRS Newsroom",
      url: "https://www.irs.gov/newsroom/401k-limit-increases-to-23500-for-2025-ira-limit-remains-7000",
    },
    {
      authors: "Fidelity Investments",
      year: "2025",
      title: "401(k) contribution limits 2025",
      source: "Fidelity Learning Center",
      url: "https://www.fidelity.com/learning-center/smart-money/401k-contribution-limits",
    },
  ],
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculate401k(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  const currentAge = (values.currentAge as number) || 30;
  const retirementAge = (values.retirementAge as number) || 65;
  const annualSalary = (values.annualSalary as number) || 75000;
  const currentBalance = (values.currentBalance as number) || 0;
  const contributionPercent = (values.contributionPercent as number) || 10;
  const employerMatchPercent = (values.employerMatchPercent as number) || 50;
  const employerMatchLimit = (values.employerMatchLimit as number) || 6;
  const expectedReturn = (values.expectedReturn as number) || 7;
  const salaryIncrease = (values.salaryIncrease as number) || 3;
  const inflationRate = (values.inflationRate as number) || 2.5;

  const yearsToRetirement = retirementAge - currentAge;

  if (yearsToRetirement <= 0) {
    return {
      values: {},
      formatted: {},
      summary: "Retirement age must be greater than current age",
      isValid: false,
    };
  }

  let balance = currentBalance;
  let totalYourContrib = 0;
  let totalEmployerContrib = 0;
  let currentSalaryYear = annualSalary;
  const monthlyReturn = expectedReturn / 100 / 12;

  // First year contribution for tax savings calculation
  const firstYearContrib = Math.min(
    annualSalary * (contributionPercent / 100),
    getContributionLimit(currentAge)
  );
  const taxRate = estimateTaxRate(annualSalary);
  const taxSavingsThisYear = firstYearContrib * taxRate;

  // Year by year calculation
  for (let year = 0; year < yearsToRetirement; year++) {
    const age = currentAge + year;
    const limit = getContributionLimit(age);

    // Your contribution (capped at IRS limit)
    let yourContrib = currentSalaryYear * (contributionPercent / 100);
    if (yourContrib > limit) yourContrib = limit;

    // Employer match calculation
    const matchEligibleAmount = currentSalaryYear * (employerMatchLimit / 100);
    const actualContribForMatch = Math.min(yourContrib, matchEligibleAmount);
    const employerContrib = actualContribForMatch * (employerMatchPercent / 100);

    totalYourContrib += yourContrib;
    totalEmployerContrib += employerContrib;

    // Monthly compounding
    const monthlyYourContrib = yourContrib / 12;
    const monthlyEmployerContrib = employerContrib / 12;

    for (let month = 0; month < 12; month++) {
      balance = balance * (1 + monthlyReturn) + monthlyYourContrib + monthlyEmployerContrib;
    }

    // Salary increase for next year
    currentSalaryYear *= (1 + salaryIncrease / 100);
  }

  const totalInvestmentGrowth = balance - currentBalance - totalYourContrib - totalEmployerContrib;

  // Inflation adjustment
  const inflationFactor = Math.pow(1 + inflationRate / 100, yearsToRetirement);
  const balanceInflationAdjusted = balance / inflationFactor;

  // 4% rule for monthly retirement income
  const monthlyRetirementIncome = (balance * 0.04) / 12;

  return {
    values: {
      balanceAtRetirement: balance,
      balanceInflationAdjusted,
      totalYourContributions: totalYourContrib,
      totalEmployerContributions: totalEmployerContrib,
      totalInvestmentGrowth,
      taxSavingsThisYear,
      monthlyRetirementIncome,
      yearsUntilRetirement: yearsToRetirement,
    },
    formatted: {
      balanceAtRetirement: Math.round(balance).toLocaleString(),
      balanceInflationAdjusted: Math.round(balanceInflationAdjusted).toLocaleString(),
      totalYourContributions: Math.round(totalYourContrib).toLocaleString(),
      totalEmployerContributions: Math.round(totalEmployerContrib).toLocaleString(),
      totalInvestmentGrowth: Math.round(totalInvestmentGrowth).toLocaleString(),
      taxSavingsThisYear: Math.round(taxSavingsThisYear).toLocaleString(),
      monthlyRetirementIncome: Math.round(monthlyRetirementIncome).toLocaleString(),
      yearsUntilRetirement: String(yearsToRetirement),
    },
    summary: `Balance at ${retirementAge}: $${Math.round(balance).toLocaleString()} | Monthly income: $${Math.round(monthlyRetirementIncome).toLocaleString()}`,
    isValid: true,
  };
}

export default calculator401kConfig;
