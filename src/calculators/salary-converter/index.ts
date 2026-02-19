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

export const salaryConverterCalculatorConfig: CalculatorConfigV4 = {
  id: "salary-converter-calculator",
  version: "4.0",
  category: "finance",
  icon: "💰",

  presets: [
    {
      id: "usMinimum",
      icon: "🇺🇸",
      values: { salary: 15080, payFrequency: "yearly", hoursPerWeek: 40, daysPerWeek: 5, adjustTimeOff: false, vacationDays: null, paidHolidays: null, includeOvertime: false, overtimeHours: null, overtimeRate: null },
    },
    {
      id: "usAverage",
      icon: "📊",
      values: { salary: 62192, payFrequency: "yearly", hoursPerWeek: 40, daysPerWeek: 5, adjustTimeOff: true, vacationDays: 15, paidHolidays: 11, includeOvertime: false, overtimeHours: null, overtimeRate: null },
    },
    {
      id: "techWorker",
      icon: "💻",
      values: { salary: 110000, payFrequency: "yearly", hoursPerWeek: 40, daysPerWeek: 5, adjustTimeOff: true, vacationDays: 20, paidHolidays: 11, includeOvertime: false, overtimeHours: null, overtimeRate: null },
    },
    {
      id: "partTimeOT",
      icon: "🕐",
      values: { salary: 18, payFrequency: "hourly", hoursPerWeek: 25, daysPerWeek: 5, adjustTimeOff: false, vacationDays: null, paidHolidays: null, includeOvertime: true, overtimeHours: 5, overtimeRate: 1.5 },
    },
  ],

  t: {
    en: {
      name: "Salary Converter",
      slug: "salary-converter",
      breadcrumb: "Salary Converter",
      seo: {
        title: "Salary Converter - Hourly to Annual Calculator",
        description: "Convert your salary between hourly, daily, weekly, and annual. Adjust for time off and overtime to see your real earnings.",
        keywords: ["salary converter", "salary calculator", "hourly to annual", "annual to hourly", "wage calculator", "pay calculator", "salary conversion tool", "income calculator"],
      },

      subtitle: "Convert your salary between hourly, daily, weekly, and annual. Adjust for time off and overtime to see your real earnings.",

      inputs: {
        salary: { label: "Your Salary", helpText: "Enter your salary in any frequency", placeholder: "50000" },
        payFrequency: {
          label: "Pay Frequency",
          helpText: "How often you get paid or want to enter your salary",
          options: { hourly: "Per Hour", daily: "Per Day", weekly: "Per Week", biweekly: "Per 2 Weeks", monthly: "Per Month", yearly: "Per Year" },
        },
        hoursPerWeek: { label: "Hours per Week", helpText: "Standard full-time: 40 hours" },
        daysPerWeek: { label: "Days per Week", helpText: "Standard: 5 days (Mon-Fri)" },
        adjustTimeOff: { label: "Adjust for Time Off", helpText: "Account for vacation and holidays" },
        vacationDays: { label: "Vacation Days per Year", helpText: "US average: 10-15 paid vacation days", placeholder: "15" },
        paidHolidays: { label: "Paid Holidays per Year", helpText: "US average: 7-11 paid holidays", placeholder: "11" },
        includeOvertime: { label: "Include Overtime", helpText: "Add overtime hours and rate" },
        overtimeHours: { label: "Overtime Hours per Week", helpText: "Extra hours worked beyond regular schedule", placeholder: "5" },
        overtimeRate: { label: "Overtime Rate Multiplier", helpText: "1.5x = time and a half, 2x = double time", placeholder: "1.5" },
      },

      results: {
        hourly: { label: "Hourly" },
        daily: { label: "Daily" },
        weekly: { label: "Weekly" },
        biweekly: { label: "Bi-Weekly" },
        monthly: { label: "Monthly" },
        annual: { label: "Annual" },
      },

      presets: {
        usMinimum: { label: "US Minimum Wage", description: "$7.25/hr federal minimum, full-time" },
        usAverage: { label: "US Average", description: "$62,192/yr median salary with benefits" },
        techWorker: { label: "Tech Worker", description: "$110K/yr with 20 vacation days" },
        partTimeOT: { label: "Part-Time + OT", description: "$18/hr, 25 hrs + 5 overtime hours" },
      },

      values: { perHour: "/hr", perDay: "/day", perWeek: "/wk", perMonth: "/mo", perYear: "/yr", hours: "hours", days: "days" },

      formats: { summary: "Your salary converts to {hourly} per hour, {monthly} per month, and {annual} per year." },

      infoCards: {
        workStats: {
          title: "Work Statistics",
          items: [
            { label: "Total Hours per Year", valueKey: "totalHoursYear" },
            { label: "Total Work Days per Year", valueKey: "totalWorkDays" },
            { label: "Minutes to Earn $100", valueKey: "minutesToEarn100" },
            { label: "Earnings per Minute", valueKey: "earningsPerMinute" },
          ],
        },
        compare: {
          title: "How You Compare",
          items: [
            { label: "vs US Median ($62,192/yr)", valueKey: "vsMedian" },
            { label: "vs Federal Minimum ($7.25/hr)", valueKey: "vsMinimum" },
            { label: "Overtime Impact", valueKey: "overtimeImpact" },
            { label: "Time Off Cost", valueKey: "timeOffCost" },
          ],
        },
        tips: {
          title: "Salary Tips",
          items: [
            "Always compare offers using total compensation — include benefits, 401k match, and equity, not just base salary",
            "Negotiate using hourly rate: $1/hr more = $2,080/yr for full-time. That's a vacation fund",
            "Track your effective hourly rate including commute time — remote work can be a significant raise",
            "Before accepting a pay cut for benefits, calculate the actual dollar value of those benefits",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Salary Converter?",
          content: "A salary converter translates your pay between different time periods — hourly, daily, weekly, biweekly, monthly, and annually. This is essential when comparing job offers quoted in different frequencies, understanding your true hourly rate, or budgeting based on your actual take-home timing. Most people know their annual salary but rarely think about what they earn per hour, per minute, or per day. Understanding these conversions helps you make better financial decisions, negotiate raises effectively, and evaluate whether side projects or freelance work is worth your time.",
        },
        howItWorks: {
          title: "How Salary Conversion Works",
          content: "The basic conversion uses standard work assumptions: 40 hours per week, 52 weeks per year, yielding 2,080 work hours annually. To convert hourly to annual, multiply by 2,080. To convert annual to hourly, divide by 2,080. However, this simple math doesn't account for real-world factors like paid time off, holidays, and overtime. When you take 2 weeks vacation and get 11 holidays, your actual work hours drop from 2,080 to about 1,928 — meaning your effective hourly rate is higher than the simple calculation suggests. This calculator handles all these adjustments automatically.",
        },
        payStructures: {
          title: "Pay Structure Basics",
          items: [
            { text: "Hourly: Paid per hour worked. Eligible for overtime (1.5x after 40 hrs/week under FLSA). Most common for non-exempt workers.", type: "info" },
            { text: "Salary (Exempt): Fixed annual pay regardless of hours. No overtime required by law, but may work 45-50+ hours/week effectively lowering hourly rate.", type: "warning" },
            { text: "Bi-Weekly: Paid every 2 weeks = 26 paychecks/year. Most common pay cycle in the US.", type: "info" },
            { text: "Semi-Monthly: Paid on 1st and 15th = 24 paychecks/year. Different from bi-weekly by 2 paychecks.", type: "info" },
            { text: "Commission: Base salary plus percentage of sales. Calculate your effective hourly rate including average commissions.", type: "info" },
            { text: "Freelance/Contract: Typically 25-40% higher rates to cover self-employment tax, benefits, and unpaid time off.", type: "warning" },
          ],
        },
        timeOffImpact: {
          title: "Understanding Time Off Impact",
          items: [
            { text: "US workers average 10 paid vacation days and 7 paid holidays per year — far less than Europe's 20-30 days.", type: "info" },
            { text: "Each vacation day costs roughly 0.4% of your annual salary. 20 days off = 7.7% reduction in actual work time.", type: "info" },
            { text: "Unpaid time off directly reduces your effective annual salary. 2 unpaid weeks = 3.85% pay cut.", type: "warning" },
            { text: "Your effective hourly rate INCREASES with paid time off — you earn the same but work fewer hours.", type: "info" },
            { text: "Sick days (avg 8/year in US) aren't usually factored into salary, but affect your actual productivity cost.", type: "info" },
            { text: "When comparing jobs, factor in PTO value: each extra week of vacation is worth ~2% of salary.", type: "info" },
          ],
        },
        examples: {
          title: "Salary Conversion Examples",
          description: "See how different salaries convert across pay frequencies",
          examples: [
            {
              title: "$50,000 Annual Salary",
              steps: ["Annual: $50,000", "Monthly: $50,000 ÷ 12 = $4,167", "Bi-weekly: $50,000 ÷ 26 = $1,923", "Weekly: $50,000 ÷ 52 = $962", "Daily: $50,000 ÷ 260 = $192", "Hourly: $50,000 ÷ 2,080 = $24.04"],
              result: "$24.04/hour. With 15 vacation days + 11 holidays, effective rate rises to $25.93/hour.",
            },
            {
              title: "$25/Hour Part-Time (30 hrs/wk)",
              steps: ["Hourly: $25.00", "Daily (6 hrs): $25 × 6 = $150", "Weekly: $25 × 30 = $750", "Monthly: $750 × 4.33 = $3,248", "Annual: $25 × 30 × 52 = $39,000"],
              result: "$39,000/year at 30 hours/week. With 5 hrs overtime at 1.5x: $43,875/year (+12.5%).",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I convert annual salary to hourly rate?", answer: "Divide your annual salary by 2,080 (40 hours × 52 weeks). Example: $60,000 ÷ 2,080 = $28.85/hour. If you work fewer than 40 hours or take unpaid time off, adjust the denominator accordingly." },
        { question: "What's the difference between bi-weekly and semi-monthly pay?", answer: "Bi-weekly means every 2 weeks (26 paychecks/year), while semi-monthly means twice a month on set dates like the 1st and 15th (24 paychecks/year). Bi-weekly gives you 2 extra paychecks per year." },
        { question: "How does overtime affect my effective salary?", answer: "Under the FLSA, non-exempt workers earn 1.5x their regular rate for hours over 40/week. Working 5 overtime hours at $25/hr adds $187.50/week or $9,750/year — a 19% increase on a $50K salary." },
        { question: "Should I factor in time off when comparing job offers?", answer: "Yes. A $60,000 job with 20 PTO days has an effective hourly rate of $30.57 (working 1,960 hours), while a $62,000 job with only 10 PTO days pays $30.10/hour (working 2,060 hours). The lower salary is actually worth more per hour." },
        { question: "How many work hours are in a year?", answer: "Standard is 2,080 hours (40 hours × 52 weeks). With typical US time off (10 vacation days + 11 holidays), actual work hours are about 1,912. This makes your effective hourly rate approximately 8.8% higher than the simple calculation." },
        { question: "How do I calculate my real hourly rate as a salaried employee?", answer: "Track your actual hours for a month. Many salaried workers put in 45-50 hours/week. A $75K salary at 50 hours/week = $28.85/hour instead of $36.06/hour at 40 hours — a 20% difference." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Calculate", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de Salarios",
      "seo": {
        "title": "Calculadora Convertidor de Salarios - De Hora a Anual",
        "description": "Convierte tu salario entre por hora, diario, semanal y anual. Ajusta por tiempo libre y horas extras para ver tus ganancias reales.",
        "keywords": [
          "convertidor de salarios",
          "calculadora de salario",
          "por hora a anual",
          "anual a por hora",
          "calculadora de sueldo",
          "calculadora de pago",
          "herramienta conversión salario",
          "calculadora de ingresos"
        ]
      },
      "slug": "calculadora-convertidor-salarios",
      "subtitle": "Convierte tu salario entre por hora, diario, semanal y anual. Ajusta por tiempo libre y horas extras para ver tus ganancias reales.",
      "inputs": {
        "salary": {
          "label": "Tu Salario",
          "helpText": "Ingresa tu salario en cualquier frecuencia",
          "placeholder": "50000"
        },
        "payFrequency": {
          "label": "Frecuencia de Pago",
          "helpText": "Con qué frecuencia te pagan o quieres ingresar tu salario",
          "options": {
            "hourly": "Por Hora",
            "daily": "Por Día",
            "weekly": "Por Semana",
            "biweekly": "Cada 2 Semanas",
            "monthly": "Por Mes",
            "yearly": "Por Año"
          }
        },
        "hoursPerWeek": {
          "label": "Horas por Semana",
          "helpText": "Tiempo completo estándar: 40 horas"
        },
        "daysPerWeek": {
          "label": "Días por Semana",
          "helpText": "Estándar: 5 días (Lun-Vie)"
        },
        "adjustTimeOff": {
          "label": "Ajustar por Tiempo Libre",
          "helpText": "Considera vacaciones y feriados"
        },
        "vacationDays": {
          "label": "Días de Vacaciones por Año",
          "helpText": "Promedio EEUU: 10-15 días pagados",
          "placeholder": "15"
        },
        "paidHolidays": {
          "label": "Feriados Pagados por Año",
          "helpText": "Promedio EEUU: 7-11 feriados pagados",
          "placeholder": "11"
        },
        "includeOvertime": {
          "label": "Incluir Horas Extras",
          "helpText": "Agregar horas extras y tarifa"
        },
        "overtimeHours": {
          "label": "Horas Extras por Semana",
          "helpText": "Horas adicionales trabajadas más allá del horario regular",
          "placeholder": "5"
        },
        "overtimeRate": {
          "label": "Multiplicador Tarifa Horas Extras",
          "helpText": "1.5x = tiempo y medio, 2x = tiempo doble",
          "placeholder": "1.5"
        }
      },
      "results": {
        "hourly": {
          "label": "Por Hora"
        },
        "daily": {
          "label": "Diario"
        },
        "weekly": {
          "label": "Semanal"
        },
        "biweekly": {
          "label": "Quincenal"
        },
        "monthly": {
          "label": "Mensual"
        },
        "annual": {
          "label": "Anual"
        }
      },
      "presets": {
        "usMinimum": {
          "label": "Salario Mínimo EEUU",
          "description": "$7.25/hr mínimo federal, tiempo completo"
        },
        "usAverage": {
          "label": "Promedio EEUU",
          "description": "$62,192/año salario mediano con beneficios"
        },
        "techWorker": {
          "label": "Trabajador Tecnología",
          "description": "$110K/año con 20 días de vacaciones"
        },
        "partTimeOT": {
          "label": "Medio Tiempo + Extras",
          "description": "$18/hr, 25 hrs + 5 horas extras"
        }
      },
      "values": {
        "perHour": "/hr",
        "perDay": "/día",
        "perWeek": "/sem",
        "perMonth": "/mes",
        "perYear": "/año",
        "hours": "horas",
        "days": "días"
      },
      "formats": {
        "summary": "Tu salario se convierte a {hourly} por hora, {monthly} por mes, y {annual} por año."
      },
      "infoCards": {
        "workStats": {
          "title": "Estadísticas Laborales",
          "items": [
            {
              "label": "Total Horas por Año",
              "valueKey": "totalHoursYear"
            },
            {
              "label": "Total Días Laborables por Año",
              "valueKey": "totalWorkDays"
            },
            {
              "label": "Minutos para Ganar $100",
              "valueKey": "minutesToEarn100"
            },
            {
              "label": "Ganancias por Minuto",
              "valueKey": "earningsPerMinute"
            }
          ]
        },
        "compare": {
          "title": "Cómo Te Comparas",
          "items": [
            {
              "label": "vs Mediana EEUU ($62,192/año)",
              "valueKey": "vsMedian"
            },
            {
              "label": "vs Mínimo Federal ($7.25/hr)",
              "valueKey": "vsMinimum"
            },
            {
              "label": "Impacto Horas Extras",
              "valueKey": "overtimeImpact"
            },
            {
              "label": "Costo Tiempo Libre",
              "valueKey": "timeOffCost"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Salario",
          "items": [
            "Siempre compara ofertas usando compensación total — incluye beneficios, aporte 401k, y acciones, no solo salario base",
            "Negocia usando tarifa por hora: $1/hr más = $2,080/año tiempo completo. Eso es un fondo de vacaciones",
            "Rastrea tu tarifa horaria efectiva incluyendo tiempo de transporte — trabajo remoto puede ser un aumento significativo",
            "Antes de aceptar reducción salarial por beneficios, calcula el valor real en dólares de esos beneficios"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué Es un Convertidor de Salarios?",
          "content": "Un convertidor de salarios traduce tu pago entre diferentes períodos de tiempo — por hora, diario, semanal, quincenal, mensual y anual. Esto es esencial al comparar ofertas de trabajo cotizadas en diferentes frecuencias, entender tu verdadera tarifa por hora, o presupuestar basado en el tiempo real de tus ingresos netos. La mayoría conoce su salario anual pero rara vez piensa en lo que gana por hora, por minuto o por día. Entender estas conversiones te ayuda a tomar mejores decisiones financieras, negociar aumentos efectivamente, y evaluar si proyectos secundarios o trabajo independiente vale tu tiempo."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Conversión de Salarios",
          "content": "La conversión básica usa supuestos laborales estándar: 40 horas por semana, 52 semanas por año, resultando en 2,080 horas laborales anuales. Para convertir por hora a anual, multiplica por 2,080. Para convertir anual a por hora, divide por 2,080. Sin embargo, esta matemática simple no considera factores del mundo real como tiempo libre pagado, feriados y horas extras. Cuando tomas 2 semanas de vacaciones y tienes 11 feriados, tus horas laborales reales bajan de 2,080 a aproximadamente 1,928 — significando que tu tarifa horaria efectiva es mayor que el cálculo simple sugiere. Esta calculadora maneja todos estos ajustes automáticamente."
        },
        "payStructures": {
          "title": "Conceptos Básicos de Estructuras de Pago",
          "items": [
            {
              "text": "Por Hora: Pagado por hora trabajada. Elegible para horas extras (1.5x después de 40 hrs/semana bajo FLSA). Más común para trabajadores no exentos.",
              "type": "info"
            },
            {
              "text": "Salario (Exento): Pago anual fijo independiente de horas. No se requieren horas extras por ley, pero puede trabajar 45-50+ horas/semana reduciendo efectivamente la tarifa horaria.",
              "type": "warning"
            },
            {
              "text": "Quincenal: Pagado cada 2 semanas = 26 cheques/año. Ciclo de pago más común en EEUU.",
              "type": "info"
            },
            {
              "text": "Semi-Mensual: Pagado el 1ro y 15 = 24 cheques/año. Diferente del quincenal por 2 cheques.",
              "type": "info"
            },
            {
              "text": "Comisión: Salario base más porcentaje de ventas. Calcula tu tarifa horaria efectiva incluyendo comisiones promedio.",
              "type": "info"
            },
            {
              "text": "Independiente/Contrato: Típicamente tarifas 25-40% más altas para cubrir impuesto de trabajo independiente, beneficios y tiempo libre no pagado.",
              "type": "warning"
            }
          ]
        },
        "timeOffImpact": {
          "title": "Entendiendo el Impacto del Tiempo Libre",
          "items": [
            {
              "text": "Trabajadores de EEUU promedian 10 días de vacaciones pagadas y 7 feriados por año — mucho menos que los 20-30 días de Europa.",
              "type": "info"
            },
            {
              "text": "Cada día de vacaciones cuesta aproximadamente 0.4% de tu salario anual. 20 días libres = 7.7% reducción en tiempo laboral real.",
              "type": "info"
            },
            {
              "text": "Tiempo libre no pagado reduce directamente tu salario anual efectivo. 2 semanas no pagadas = 3.85% reducción salarial.",
              "type": "warning"
            },
            {
              "text": "Tu tarifa horaria efectiva AUMENTA con tiempo libre pagado — ganas lo mismo pero trabajas menos horas.",
              "type": "info"
            },
            {
              "text": "Días de enfermedad (prom. 8/año en EEUU) usualmente no se factorizan en salario, pero afectan tu costo real de productividad.",
              "type": "info"
            },
            {
              "text": "Al comparar trabajos, considera el valor de tiempo libre: cada semana extra de vacaciones vale ~2% del salario.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Conversión de Salarios",
          "description": "Ve cómo diferentes salarios se convierten entre frecuencias de pago",
          "examples": [
            {
              "title": "$50,000 Salario Anual",
              "steps": [
                "Anual: $50,000",
                "Mensual: $50,000 ÷ 12 = $4,167",
                "Quincenal: $50,000 ÷ 26 = $1,923",
                "Semanal: $50,000 ÷ 52 = $962",
                "Diario: $50,000 ÷ 260 = $192",
                "Por Hora: $50,000 ÷ 2,080 = $24.04"
              ],
              "result": "$24.04/hora. Con 15 días de vacaciones + 11 feriados, la tarifa efectiva sube a $25.93/hora."
            },
            {
              "title": "$25/Hora Medio Tiempo (30 hrs/sem)",
              "steps": [
                "Por Hora: $25.00",
                "Diario (6 hrs): $25 × 6 = $150",
                "Semanal: $25 × 30 = $750",
                "Mensual: $750 × 4.33 = $3,248",
                "Anual: $25 × 30 × 52 = $39,000"
              ],
              "result": "$39,000/año a 30 horas/semana. Con 5 hrs extras a 1.5x: $43,875/año (+12.5%)."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cómo convierto salario anual a tarifa por hora?",
          "answer": "Divide tu salario anual por 2,080 (40 horas × 52 semanas). Ejemplo: $60,000 ÷ 2,080 = $28.85/hora. Si trabajas menos de 40 horas o tomas tiempo libre no pagado, ajusta el denominador en consecuencia."
        },
        {
          "question": "¿Cuál es la diferencia entre pago quincenal y semi-mensual?",
          "answer": "Quincenal significa cada 2 semanas (26 cheques/año), mientras semi-mensual significa dos veces al mes en fechas fijas como el 1ro y 15 (24 cheques/año). Quincenal te da 2 cheques extra por año."
        },
        {
          "question": "¿Cómo afectan las horas extras mi salario efectivo?",
          "answer": "Bajo la FLSA, trabajadores no exentos ganan 1.5x su tarifa regular por horas sobre 40/semana. Trabajar 5 horas extras a $25/hr agrega $187.50/semana o $9,750/año — un aumento del 19% en un salario de $50K."
        },
        {
          "question": "¿Debo considerar tiempo libre al comparar ofertas de trabajo?",
          "answer": "Sí. Un trabajo de $60,000 con 20 días libres tiene una tarifa horaria efectiva de $30.57 (trabajando 1,960 horas), mientras un trabajo de $62,000 con solo 10 días libres paga $30.10/hora (trabajando 2,060 horas). El salario menor vale más por hora."
        },
        {
          "question": "¿Cuántas horas laborales hay en un año?",
          "answer": "Estándar es 2,080 horas (40 horas × 52 semanas). Con tiempo libre típico de EEUU (10 días vacaciones + 11 feriados), las horas laborales reales son aproximadamente 1,912. Esto hace tu tarifa horaria efectiva aproximadamente 8.8% mayor que el cálculo simple."
        },
        {
          "question": "¿Cómo calculo mi tarifa horaria real como empleado asalariado?",
          "answer": "Rastrea tus horas reales por un mes. Muchos trabajadores asalariados trabajan 45-50 horas/semana. Un salario de $75K a 50 horas/semana = $28.85/hora en lugar de $36.06/hora a 40 horas — una diferencia del 20%."
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
      "name": "Conversor de Salário",
      "seo": {
        "title": "Calculadora de Conversão de Salário - Horário para Anual",
        "description": "Converta seu salário entre horário, diário, semanal e anual. Ajuste para folgas e horas extras para ver seus ganhos reais.",
        "keywords": [
          "conversor de salário",
          "calculadora de salário",
          "horário para anual",
          "anual para horário",
          "calculadora de salário",
          "calculadora de pagamento",
          "ferramenta de conversão salarial",
          "calculadora de renda"
        ]
      },
      "subtitle": "Converta seu salário entre horário, diário, semanal e anual. Ajuste para folgas e horas extras para ver seus ganhos reais.",
      "inputs": {
        "salary": {
          "label": "Seu Salário",
          "helpText": "Digite seu salário em qualquer frequência",
          "placeholder": "50000"
        },
        "payFrequency": {
          "label": "Frequência de Pagamento",
          "helpText": "Com que frequência você recebe ou quer inserir seu salário",
          "options": {
            "hourly": "Por Hora",
            "daily": "Por Dia",
            "weekly": "Por Semana",
            "biweekly": "A Cada 2 Semanas",
            "monthly": "Por Mês",
            "yearly": "Por Ano"
          }
        },
        "hoursPerWeek": {
          "label": "Horas por Semana",
          "helpText": "Padrão tempo integral: 40 horas"
        },
        "daysPerWeek": {
          "label": "Dias por Semana",
          "helpText": "Padrão: 5 dias (Seg-Sex)"
        },
        "adjustTimeOff": {
          "label": "Ajustar para Folgas",
          "helpText": "Considerar férias e feriados"
        },
        "vacationDays": {
          "label": "Dias de Férias por Ano",
          "helpText": "Média brasileira: 30 dias de férias remuneradas",
          "placeholder": "30"
        },
        "paidHolidays": {
          "label": "Feriados Remunerados por Ano",
          "helpText": "Média brasileira: 10-12 feriados remunerados",
          "placeholder": "11"
        },
        "includeOvertime": {
          "label": "Incluir Horas Extras",
          "helpText": "Adicionar horas extras e taxa"
        },
        "overtimeHours": {
          "label": "Horas Extras por Semana",
          "helpText": "Horas extras trabalhadas além do horário regular",
          "placeholder": "5"
        },
        "overtimeRate": {
          "label": "Multiplicador da Taxa de Horas Extras",
          "helpText": "1.5x = 50% a mais, 2x = dobro do valor",
          "placeholder": "1.5"
        }
      },
      "results": {
        "hourly": {
          "label": "Por Hora"
        },
        "daily": {
          "label": "Diário"
        },
        "weekly": {
          "label": "Semanal"
        },
        "biweekly": {
          "label": "Quinzenal"
        },
        "monthly": {
          "label": "Mensal"
        },
        "annual": {
          "label": "Anual"
        }
      },
      "presets": {
        "usMinimum": {
          "label": "Salário Mínimo BR",
          "description": "R$ 1.412/mês salário mínimo, tempo integral"
        },
        "usAverage": {
          "label": "Média Brasileira",
          "description": "R$ 2.500/mês salário médio com benefícios"
        },
        "techWorker": {
          "label": "Trabalhador de TI",
          "description": "R$ 8.000/mês com 30 dias de férias"
        },
        "partTimeOT": {
          "label": "Meio Período + HE",
          "description": "R$ 25/hr, 25 hrs + 5 horas extras"
        }
      },
      "values": {
        "perHour": "/hora",
        "perDay": "/dia",
        "perWeek": "/sem",
        "perMonth": "/mês",
        "perYear": "/ano",
        "hours": "horas",
        "days": "dias"
      },
      "formats": {
        "summary": "Seu salário converte para {hourly} por hora, {monthly} por mês e {annual} por ano."
      },
      "infoCards": {
        "workStats": {
          "title": "Estatísticas de Trabalho",
          "items": [
            {
              "label": "Total de Horas por Ano",
              "valueKey": "totalHoursYear"
            },
            {
              "label": "Total de Dias de Trabalho por Ano",
              "valueKey": "totalWorkDays"
            },
            {
              "label": "Minutos para Ganhar R$ 100",
              "valueKey": "minutesToEarn100"
            },
            {
              "label": "Ganhos por Minuto",
              "valueKey": "earningsPerMinute"
            }
          ]
        },
        "compare": {
          "title": "Como Você se Compara",
          "items": [
            {
              "label": "vs Mediana BR (R$ 2.500/mês)",
              "valueKey": "vsMedian"
            },
            {
              "label": "vs Salário Mínimo (R$ 1.412/mês)",
              "valueKey": "vsMinimum"
            },
            {
              "label": "Impacto das Horas Extras",
              "valueKey": "overtimeImpact"
            },
            {
              "label": "Custo das Folgas",
              "valueKey": "timeOffCost"
            }
          ]
        },
        "tips": {
          "title": "Dicas Salariais",
          "items": [
            "Sempre compare ofertas usando compensação total — inclua benefícios, vale-alimentação e participação nos lucros, não apenas salário base",
            "Negocie usando taxa horária: R$ 1/hr a mais = R$ 2.080/ano para tempo integral. Isso é um fundo de férias",
            "Acompanhe sua taxa horária efetiva incluindo tempo de deslocamento — trabalho remoto pode ser um aumento significativo",
            "Antes de aceitar redução salarial por benefícios, calcule o valor real desses benefícios"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Calculadora de Conversão de Salário?",
          "content": "Uma calculadora de conversão de salário traduz seu pagamento entre diferentes períodos de tempo — horário, diário, semanal, quinzenal, mensal e anual. Isso é essencial ao comparar ofertas de emprego cotadas em frequências diferentes, entender sua taxa horária real ou fazer orçamentos baseados no timing real do seu salário. A maioria das pessoas conhece seu salário anual, mas raramente pensa no que ganha por hora, por minuto ou por dia. Entender essas conversões ajuda a tomar melhores decisões financeiras, negociar aumentos efetivamente e avaliar se projetos paralelos ou trabalho freelance valem seu tempo."
        },
        "howItWorks": {
          "title": "Como Funciona a Conversão de Salário",
          "content": "A conversão básica usa premissas padrão de trabalho: 40 horas por semana, 52 semanas por ano, totalizando 2.080 horas de trabalho anuais. Para converter horário para anual, multiplique por 2.080. Para converter anual para horário, divida por 2.080. No entanto, essa matemática simples não considera fatores do mundo real como folgas remuneradas, feriados e horas extras. Quando você tira 2 semanas de férias e tem 11 feriados, suas horas reais de trabalho caem de 2.080 para cerca de 1.928 — significando que sua taxa horária efetiva é maior do que o cálculo simples sugere. Esta calculadora lida com todos esses ajustes automaticamente."
        },
        "payStructures": {
          "title": "Fundamentos da Estrutura Salarial",
          "items": [
            {
              "text": "Horário: Pago por hora trabalhada. Elegível para horas extras (50% a mais após 44 hrs/semana pela CLT). Mais comum para trabalhadores horistas.",
              "type": "info"
            },
            {
              "text": "Salário (CLT): Pagamento mensal fixo independentemente das horas. Horas extras obrigatórias após 44h/semana, mas muitos trabalham 45-50+ horas efetivamente reduzindo a taxa horária.",
              "type": "warning"
            },
            {
              "text": "Quinzenal: Pago a cada 2 semanas = 26 pagamentos/ano. Menos comum no Brasil que o pagamento mensal.",
              "type": "info"
            },
            {
              "text": "Mensal: Pago no final do mês = 12 pagamentos/ano. Mais comum no Brasil, geralmente no 5º dia útil.",
              "type": "info"
            },
            {
              "text": "Comissão: Salário base mais porcentagem das vendas. Calcule sua taxa horária efetiva incluindo comissões médias.",
              "type": "info"
            },
            {
              "text": "Freelance/Contrato PJ: Tipicamente 25-40% mais alto para cobrir impostos, benefícios e folgas não remuneradas.",
              "type": "warning"
            }
          ]
        },
        "timeOffImpact": {
          "title": "Entendendo o Impacto das Folgas",
          "items": [
            {
              "text": "Trabalhadores brasileiros têm 30 dias de férias remuneradas e cerca de 10-12 feriados por ano — mais que EUA mas menos que Europa.",
              "type": "info"
            },
            {
              "text": "Cada dia de férias custa aproximadamente 0,4% do seu salário anual. 30 dias de folga = 11,5% de redução no tempo real de trabalho.",
              "type": "info"
            },
            {
              "text": "Folgas não remuneradas reduzem diretamente seu salário anual efetivo. 2 semanas não pagas = 3,85% de redução salarial.",
              "type": "warning"
            },
            {
              "text": "Sua taxa horária efetiva AUMENTA com folgas remuneradas — você ganha o mesmo mas trabalha menos horas.",
              "type": "info"
            },
            {
              "text": "Atestados médicos (média 8/ano no Brasil) geralmente não são descontados do salário CLT, mas afetam sua produtividade real.",
              "type": "info"
            },
            {
              "text": "Ao comparar empregos, considere o valor das folgas: cada semana extra de férias vale ~2% do salário.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Conversão de Salário",
          "description": "Veja como diferentes salários se convertem entre frequências de pagamento",
          "examples": [
            {
              "title": "R$ 60.000 Salário Anual",
              "steps": [
                "Anual: R$ 60.000",
                "Mensal: R$ 60.000 ÷ 12 = R$ 5.000",
                "Quinzenal: R$ 60.000 ÷ 26 = R$ 2.308",
                "Semanal: R$ 60.000 ÷ 52 = R$ 1.154",
                "Diário: R$ 60.000 ÷ 260 = R$ 231",
                "Horário: R$ 60.000 ÷ 2.080 = R$ 28,85"
              ],
              "result": "R$ 28,85/hora. Com 30 dias de férias + 11 feriados, a taxa efetiva sobe para R$ 31,11/hora."
            },
            {
              "title": "R$ 30/Hora Meio Período (30 hrs/sem)",
              "steps": [
                "Horário: R$ 30,00",
                "Diário (6 hrs): R$ 30 × 6 = R$ 180",
                "Semanal: R$ 30 × 30 = R$ 900",
                "Mensal: R$ 900 × 4,33 = R$ 3.897",
                "Anual: R$ 30 × 30 × 52 = R$ 46.800"
              ],
              "result": "R$ 46.800/ano com 30 horas/semana. Com 5 hrs extras a 1,5x: R$ 52.650/ano (+12,5%)."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Como converter salário anual para taxa horária?",
          "answer": "Divida seu salário anual por 2.080 (40 horas × 52 semanas). Exemplo: R$ 60.000 ÷ 2.080 = R$ 28,85/hora. Se trabalhar menos de 40 horas ou tirar folgas não remuneradas, ajuste o denominador adequadamente."
        },
        {
          "question": "Qual a diferença entre pagamento quinzenal e mensal?",
          "answer": "Quinzenal significa a cada 2 semanas (26 pagamentos/ano), enquanto mensal significa uma vez por mês em datas fixas (12 pagamentos/ano). No Brasil, o pagamento mensal é mais comum, geralmente até o 5º dia útil."
        },
        {
          "question": "Como as horas extras afetam meu salário efetivo?",
          "answer": "Pela CLT, trabalhadores ganham 50% a mais por horas extras após 44h/semana. Trabalhar 5 horas extras a R$ 30/hr adiciona R$ 225/semana ou R$ 11.700/ano — um aumento de 19% em um salário de R$ 60mil."
        },
        {
          "question": "Devo considerar folgas ao comparar ofertas de emprego?",
          "answer": "Sim. Um emprego de R$ 72.000 com 30 dias de folga tem taxa horária efetiva de R$ 37,31 (trabalhando 1.930 horas), enquanto um de R$ 74.400 com apenas 15 dias paga R$ 36,47/hora (trabalhando 2.040 horas). O menor salário vale mais por hora."
        },
        {
          "question": "Quantas horas de trabalho há em um ano?",
          "answer": "O padrão são 2.080 horas (40 horas × 52 semanas). Com folgas típicas brasileiras (30 dias de férias + 11 feriados), as horas reais de trabalho são cerca de 1.900. Isso torna sua taxa horária efetiva aproximadamente 9,5% maior que o cálculo simples."
        },
        {
          "question": "Como calcular minha taxa horária real como assalariado?",
          "answer": "Acompanhe suas horas reais por um mês. Muitos assalariados trabalham 45-50 horas/semana. Um salário de R$ 90mil a 50 horas/semana = R$ 34,62/hora em vez de R$ 43,27/hora a 40 horas — uma diferença de 20%."
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
      "name": "Convertisseur de Salaire",
      "seo": {
        "title": "Convertisseur de Salaire - Calculateur Horaire vers Annuel",
        "description": "Convertissez votre salaire entre horaire, quotidien, hebdomadaire et annuel. Ajustez pour les congés et heures supplémentaires pour voir vos gains réels.",
        "keywords": [
          "convertisseur salaire",
          "calculateur salaire",
          "horaire vers annuel",
          "annuel vers horaire",
          "calculateur salaire",
          "calculateur paie",
          "outil conversion salaire",
          "calculateur revenus"
        ]
      },
      "slug": "calculateur-convertisseur-salaire",
      "subtitle": "Convertissez votre salaire entre horaire, quotidien, hebdomadaire et annuel. Ajustez pour les congés et heures supplémentaires pour voir vos gains réels.",
      "inputs": {
        "salary": {
          "label": "Votre Salaire",
          "helpText": "Saisissez votre salaire à n'importe quelle fréquence",
          "placeholder": "50000"
        },
        "payFrequency": {
          "label": "Fréquence de Paie",
          "helpText": "À quelle fréquence vous êtes payé ou souhaitez saisir votre salaire",
          "options": {
            "hourly": "Par Heure",
            "daily": "Par Jour",
            "weekly": "Par Semaine",
            "biweekly": "Par 2 Semaines",
            "monthly": "Par Mois",
            "yearly": "Par An"
          }
        },
        "hoursPerWeek": {
          "label": "Heures par Semaine",
          "helpText": "Temps plein standard : 40 heures"
        },
        "daysPerWeek": {
          "label": "Jours par Semaine",
          "helpText": "Standard : 5 jours (lun-ven)"
        },
        "adjustTimeOff": {
          "label": "Ajuster pour les Congés",
          "helpText": "Comptabiliser les vacances et jours fériés"
        },
        "vacationDays": {
          "label": "Jours de Vacances par An",
          "helpText": "Moyenne France : 25-30 jours de congés payés",
          "placeholder": "25"
        },
        "paidHolidays": {
          "label": "Jours Fériés Payés par An",
          "helpText": "France : environ 11 jours fériés",
          "placeholder": "11"
        },
        "includeOvertime": {
          "label": "Inclure les Heures Supplémentaires",
          "helpText": "Ajouter les heures supplémentaires et le taux"
        },
        "overtimeHours": {
          "label": "Heures Supplémentaires par Semaine",
          "helpText": "Heures supplémentaires travaillées au-delà du planning régulier",
          "placeholder": "5"
        },
        "overtimeRate": {
          "label": "Multiplicateur Taux Heures Sup.",
          "helpText": "1,25x = majoration 25%, 1,5x = majoration 50%",
          "placeholder": "1.25"
        }
      },
      "results": {
        "hourly": {
          "label": "Horaire"
        },
        "daily": {
          "label": "Quotidien"
        },
        "weekly": {
          "label": "Hebdomadaire"
        },
        "biweekly": {
          "label": "Bi-mensuel"
        },
        "monthly": {
          "label": "Mensuel"
        },
        "annual": {
          "label": "Annuel"
        }
      },
      "presets": {
        "usMinimum": {
          "label": "SMIC Français",
          "description": "11,27€/h SMIC horaire, temps plein"
        },
        "usAverage": {
          "label": "Moyenne France",
          "description": "45 000€/an salaire médian avec avantages"
        },
        "techWorker": {
          "label": "Travailleur Tech",
          "description": "65 000€/an avec 25 jours de congés"
        },
        "partTimeOT": {
          "label": "Temps Partiel + H.Sup",
          "description": "18€/h, 25h + 5 heures supplémentaires"
        }
      },
      "values": {
        "perHour": "/h",
        "perDay": "/jour",
        "perWeek": "/sem",
        "perMonth": "/mois",
        "perYear": "/an",
        "hours": "heures",
        "days": "jours"
      },
      "formats": {
        "summary": "Votre salaire se convertit en {hourly} par heure, {monthly} par mois, et {annual} par an."
      },
      "infoCards": {
        "workStats": {
          "title": "Statistiques de Travail",
          "items": [
            {
              "label": "Total Heures par An",
              "valueKey": "totalHoursYear"
            },
            {
              "label": "Total Jours de Travail par An",
              "valueKey": "totalWorkDays"
            },
            {
              "label": "Minutes pour Gagner 100€",
              "valueKey": "minutesToEarn100"
            },
            {
              "label": "Gains par Minute",
              "valueKey": "earningsPerMinute"
            }
          ]
        },
        "compare": {
          "title": "Votre Comparaison",
          "items": [
            {
              "label": "vs Médiane France (45 000€/an)",
              "valueKey": "vsMedian"
            },
            {
              "label": "vs SMIC (11,27€/h)",
              "valueKey": "vsMinimum"
            },
            {
              "label": "Impact Heures Sup.",
              "valueKey": "overtimeImpact"
            },
            {
              "label": "Coût Congés",
              "valueKey": "timeOffCost"
            }
          ]
        },
        "tips": {
          "title": "Conseils Salaire",
          "items": [
            "Comparez toujours les offres sur la rémunération totale — incluez avantages, mutuelle et participation, pas seulement le salaire de base",
            "Négociez en utilisant le taux horaire : 1€/h de plus = 1 760€/an à temps plein. C'est un budget vacances",
            "Suivez votre taux horaire effectif incluant le temps de trajet — le télétravail peut être une augmentation significative",
            "Avant d'accepter une baisse de salaire pour des avantages, calculez la valeur réelle en euros de ces avantages"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Convertisseur de Salaire ?",
          "content": "Un convertisseur de salaire traduit votre paie entre différentes périodes — horaire, quotidien, hebdomadaire, bi-mensuel, mensuel et annuel. C'est essentiel pour comparer des offres d'emploi exprimées dans différentes fréquences, comprendre votre vrai taux horaire, ou budgétiser selon votre calendrier de paie réel. La plupart des gens connaissent leur salaire annuel mais pensent rarement à ce qu'ils gagnent par heure, par minute, ou par jour. Comprendre ces conversions vous aide à prendre de meilleures décisions financières, négocier efficacement des augmentations, et évaluer si des projets annexes ou du freelance valent votre temps."
        },
        "howItWorks": {
          "title": "Comment Fonctionne la Conversion de Salaire",
          "content": "La conversion de base utilise des hypothèses de travail standard : 35 heures par semaine en France, 52 semaines par an, donnant 1 820 heures de travail annuelles. Pour convertir l'horaire en annuel, multipliez par 1 820. Pour convertir l'annuel en horaire, divisez par 1 820. Cependant, ce calcul simple ne tient pas compte de facteurs réels comme les congés payés, jours fériés, et heures supplémentaires. Quand vous prenez 5 semaines de congés et avez 11 jours fériés, vos heures de travail réelles chutent d'environ 1 820 à 1 645 — ce qui signifie que votre taux horaire effectif est plus élevé que le calcul simple ne le suggère."
        },
        "payStructures": {
          "title": "Bases des Structures de Paie",
          "items": [
            {
              "text": "Horaire : Payé par heure travaillée. Éligible aux heures supplémentaires (majorées à partir de 35h/semaine). Courant pour les emplois non-cadres.",
              "type": "info"
            },
            {
              "text": "Salaire (Cadre) : Paie annuelle fixe indépendamment des heures. Pas d'heures sup obligatoires, mais peut travailler 40-45h+/semaine, réduisant le taux horaire effectif.",
              "type": "warning"
            },
            {
              "text": "Mensuel : Payé chaque mois = 12 paies/an. Structure la plus commune en France.",
              "type": "info"
            },
            {
              "text": "Treizième mois : Prime équivalent à un mois de salaire, soit +8,33% de rémunération annuelle.",
              "type": "info"
            },
            {
              "text": "Commission : Salaire de base plus pourcentage des ventes. Calculez votre taux horaire effectif incluant les commissions moyennes.",
              "type": "info"
            },
            {
              "text": "Freelance/Portage : Typiquement 30-50% de taux plus élevés pour couvrir charges sociales, avantages, et congés non payés.",
              "type": "warning"
            }
          ]
        },
        "timeOffImpact": {
          "title": "Comprendre l'Impact des Congés",
          "items": [
            {
              "text": "Les salariés français ont 25 jours de congés payés minimum et 11 jours fériés — bien plus que les États-Unis (10-15 jours).",
              "type": "info"
            },
            {
              "text": "Chaque jour de congé coûte environ 0,4% de votre salaire annuel. 25 jours = 9,6% de réduction du temps de travail effectif.",
              "type": "info"
            },
            {
              "text": "Les congés sans solde réduisent directement votre salaire annuel effectif. 2 semaines non payées = 3,85% de baisse de salaire.",
              "type": "warning"
            },
            {
              "text": "Votre taux horaire effectif AUGMENTE avec les congés payés — vous gagnez pareil mais travaillez moins d'heures.",
              "type": "info"
            },
            {
              "text": "Les arrêts maladie (moyenne 8-12 jours/an) ne sont généralement pas déduits du salaire mais affectent votre coût de productivité.",
              "type": "info"
            },
            {
              "text": "En comparant des emplois, intégrez la valeur des RTT : chaque semaine de congé supplémentaire vaut ~2% du salaire.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Conversion de Salaire",
          "description": "Voyez comment différents salaires se convertissent entre fréquences de paie",
          "examples": [
            {
              "title": "45 000€ Salaire Annuel",
              "steps": [
                "Annuel : 45 000€",
                "Mensuel : 45 000€ ÷ 12 = 3 750€",
                "Hebdomadaire : 45 000€ ÷ 52 = 865€",
                "Quotidien : 45 000€ ÷ 220 = 205€",
                "Horaire : 45 000€ ÷ 1 820 = 24,73€"
              ],
              "result": "24,73€/heure. Avec 25 jours de congés + 11 fériés, le taux effectif monte à 27,34€/heure."
            },
            {
              "title": "20€/Heure Temps Partiel (25h/sem)",
              "steps": [
                "Horaire : 20,00€",
                "Quotidien (5h) : 20€ × 5 = 100€",
                "Hebdomadaire : 20€ × 25 = 500€",
                "Mensuel : 500€ × 4,33 = 2 165€",
                "Annuel : 20€ × 25 × 52 = 26 000€"
              ],
              "result": "26 000€/an à 25 heures/semaine. Avec 5h sup à 1,25x : 29 250€/an (+12,5%)."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Comment convertir un salaire annuel en taux horaire ?",
          "answer": "Divisez votre salaire annuel par 1 820 (35 heures × 52 semaines). Exemple : 45 000€ ÷ 1 820 = 24,73€/heure. Si vous travaillez moins de 35 heures ou prenez des congés sans solde, ajustez le dénominateur en conséquence."
        },
        {
          "question": "Quelle est la différence entre paie mensuelle et bi-mensuelle ?",
          "answer": "Mensuelle signifie une fois par mois (12 paies/an), courante en France. Bi-mensuelle signifie deux fois par mois à dates fixes comme le 1er et 15 (24 paies/an), plus rare en France mais courante ailleurs."
        },
        {
          "question": "Comment les heures supplémentaires affectent mon salaire effectif ?",
          "answer": "En France, les heures sup sont majorées de 25% (jusqu'à 43h) puis 50% (au-delà). Travailler 5h sup à 20€/h ajoute 125€/semaine soit 6 500€/an — une augmentation de 18% sur un salaire de 36 000€."
        },
        {
          "question": "Dois-je inclure les congés en comparant des offres d'emploi ?",
          "answer": "Oui. Un emploi à 50 000€ avec 30 jours de RTT a un taux horaire effectif de 28,41€ (travaillant 1 760h), tandis qu'un emploi à 52 000€ avec seulement 25 jours paie 27,86€/h (travaillant 1 868h). Le salaire plus bas vaut plus à l'heure."
        },
        {
          "question": "Combien d'heures de travail dans une année ?",
          "answer": "Standard français : 1 607 heures (35h × 52 sem - 5 sem congés). Avec les congés et RTT typiques (30 jours), les heures réelles sont d'environ 1 540. Cela rend votre taux horaire effectif environ 4,5% plus élevé que le calcul simple."
        },
        {
          "question": "Comment calculer mon vrai taux horaire en tant que salarié cadre ?",
          "answer": "Suivez vos heures réelles pendant un mois. Beaucoup de cadres font 40-45h/semaine. Un salaire de 60 000€ à 45h/semaine = 25,64€/h au lieu de 32,05€/h à 35h — une différence de 20%."
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
      "name": "Gehalt Umrechner",
      "seo": {
        "title": "Gehalt Umrechner - Stundenlohn zu Jahresgehalt Rechner",
        "description": "Rechnen Sie Ihr Gehalt zwischen stündlich, täglich, wöchentlich und jährlich um. Berücksichtigen Sie Auszeiten und Überstunden für Ihre realen Einnahmen.",
        "keywords": [
          "gehalt umrechner",
          "gehaltsrechner",
          "stundenlohn zu jahresgehalt",
          "jahresgehalt zu stundenlohn",
          "lohnrechner",
          "gehalts-umrechner",
          "einkommen rechner"
        ]
      },
      "slug": "gehalt-umrechner-rechner",
      "subtitle": "Rechnen Sie Ihr Gehalt zwischen stündlich, täglich, wöchentlich und jährlich um. Berücksichtigen Sie Auszeiten und Überstunden für Ihre realen Einnahmen.",
      "inputs": {
        "salary": {
          "label": "Ihr Gehalt",
          "helpText": "Geben Sie Ihr Gehalt in beliebiger Häufigkeit ein",
          "placeholder": "50000"
        },
        "payFrequency": {
          "label": "Zahlungshäufigkeit",
          "helpText": "Wie oft Sie bezahlt werden oder Ihr Gehalt eingeben möchten",
          "options": {
            "hourly": "Pro Stunde",
            "daily": "Pro Tag",
            "weekly": "Pro Woche",
            "biweekly": "Alle 2 Wochen",
            "monthly": "Pro Monat",
            "yearly": "Pro Jahr"
          }
        },
        "hoursPerWeek": {
          "label": "Stunden pro Woche",
          "helpText": "Standard Vollzeit: 40 Stunden"
        },
        "daysPerWeek": {
          "label": "Tage pro Woche",
          "helpText": "Standard: 5 Tage (Mo-Fr)"
        },
        "adjustTimeOff": {
          "label": "Für Auszeiten anpassen",
          "helpText": "Urlaub und Feiertage berücksichtigen"
        },
        "vacationDays": {
          "label": "Urlaubstage pro Jahr",
          "helpText": "DE-Durchschnitt: 24-30 bezahlte Urlaubstage",
          "placeholder": "25"
        },
        "paidHolidays": {
          "label": "Bezahlte Feiertage pro Jahr",
          "helpText": "DE-Durchschnitt: 9-13 bezahlte Feiertage",
          "placeholder": "11"
        },
        "includeOvertime": {
          "label": "Überstunden einbeziehen",
          "helpText": "Überstunden und Zuschlag hinzufügen"
        },
        "overtimeHours": {
          "label": "Überstunden pro Woche",
          "helpText": "Zusätzliche Stunden über den regulären Arbeitsplan hinaus",
          "placeholder": "5"
        },
        "overtimeRate": {
          "label": "Überstunden-Zuschlagsfaktor",
          "helpText": "1.25x = 25% Zuschlag, 1.5x = 50% Zuschlag",
          "placeholder": "1.25"
        }
      },
      "results": {
        "hourly": {
          "label": "Stündlich"
        },
        "daily": {
          "label": "Täglich"
        },
        "weekly": {
          "label": "Wöchentlich"
        },
        "biweekly": {
          "label": "Alle zwei Wochen"
        },
        "monthly": {
          "label": "Monatlich"
        },
        "annual": {
          "label": "Jährlich"
        }
      },
      "presets": {
        "usMinimum": {
          "label": "DE Mindestlohn",
          "description": "12,41€/Std gesetzlicher Mindestlohn, Vollzeit"
        },
        "usAverage": {
          "label": "DE Durchschnitt",
          "description": "43.750€/Jahr Durchschnittsgehalt mit Leistungen"
        },
        "techWorker": {
          "label": "IT-Fachkraft",
          "description": "65.000€/Jahr mit 28 Urlaubstagen"
        },
        "partTimeOT": {
          "label": "Teilzeit + ÜS",
          "description": "18€/Std, 25 Std + 5 Überstunden"
        }
      },
      "values": {
        "perHour": "/Std",
        "perDay": "/Tag",
        "perWeek": "/Wo",
        "perMonth": "/Mon",
        "perYear": "/Jahr",
        "hours": "Stunden",
        "days": "Tage"
      },
      "formats": {
        "summary": "Ihr Gehalt entspricht {hourly} pro Stunde, {monthly} pro Monat und {annual} pro Jahr."
      },
      "infoCards": {
        "workStats": {
          "title": "Arbeitsstatistiken",
          "items": [
            {
              "label": "Gesamtstunden pro Jahr",
              "valueKey": "totalHoursYear"
            },
            {
              "label": "Gesamtarbeitstage pro Jahr",
              "valueKey": "totalWorkDays"
            },
            {
              "label": "Minuten für 100€ Verdienst",
              "valueKey": "minutesToEarn100"
            },
            {
              "label": "Verdienst pro Minute",
              "valueKey": "earningsPerMinute"
            }
          ]
        },
        "compare": {
          "title": "Ihr Vergleich",
          "items": [
            {
              "label": "vs DE Median (43.750€/Jahr)",
              "valueKey": "vsMedian"
            },
            {
              "label": "vs Mindestlohn (12,41€/Std)",
              "valueKey": "vsMinimum"
            },
            {
              "label": "Überstunden-Einfluss",
              "valueKey": "overtimeImpact"
            },
            {
              "label": "Urlaubskosten",
              "valueKey": "timeOffCost"
            }
          ]
        },
        "tips": {
          "title": "Gehaltstipps",
          "items": [
            "Vergleichen Sie Angebote immer anhand der Gesamtvergütung — einschließlich Vorteile, Betriebsrente und Aktienoptionen, nicht nur das Grundgehalt",
            "Verhandeln Sie mit dem Stundensatz: 1€/Std mehr = 2.080€/Jahr bei Vollzeit. Das ist ein Urlaubsbudget",
            "Verfolgen Sie Ihren effektiven Stundenlohn einschließlich Pendelzeit — Homeoffice kann eine erhebliche Gehaltserhöhung bedeuten",
            "Bevor Sie eine Gehaltskürzung für Vorteile akzeptieren, berechnen Sie den tatsächlichen Geldwert dieser Vorteile"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Gehalt-Umrechner?",
          "content": "Ein Gehalt-Umrechner übersetzt Ihre Vergütung zwischen verschiedenen Zeiträumen — stündlich, täglich, wöchentlich, alle zwei Wochen, monatlich und jährlich. Dies ist unerlässlich beim Vergleich von Stellenangeboten in verschiedenen Häufigkeiten, zum Verständnis Ihres wahren Stundenlohns oder für die Budgetplanung basierend auf Ihrem tatsächlichen Nettoeinkommen-Timing. Die meisten Menschen kennen ihr Jahresgehalt, denken aber selten darüber nach, was sie pro Stunde, pro Minute oder pro Tag verdienen. Das Verständnis dieser Umrechnungen hilft Ihnen, bessere finanzielle Entscheidungen zu treffen, Gehaltserhöhungen effektiv zu verhandeln und zu bewerten, ob Nebenprojekte oder freiberufliche Arbeit Ihre Zeit wert sind."
        },
        "howItWorks": {
          "title": "Wie Gehaltsumrechnung funktioniert",
          "content": "Die Grundumrechnung verwendet standardmäßige Arbeitsannahmen: 40 Stunden pro Woche, 52 Wochen pro Jahr, was 2.080 Arbeitsstunden jährlich ergibt. Um stündlich zu jährlich umzurechnen, multiplizieren Sie mit 2.080. Um jährlich zu stündlich umzurechnen, teilen Sie durch 2.080. Diese einfache Rechnung berücksichtigt jedoch keine realen Faktoren wie bezahlten Urlaub, Feiertage und Überstunden. Wenn Sie 4 Wochen Urlaub nehmen und 11 Feiertage haben, sinken Ihre tatsächlichen Arbeitsstunden von 2.080 auf etwa 1.928 — was bedeutet, dass Ihr effektiver Stundenlohn höher ist als die einfache Berechnung vermuten lässt. Dieser Rechner behandelt all diese Anpassungen automatisch."
        },
        "payStructures": {
          "title": "Grundlagen der Gehaltsstruktur",
          "items": [
            {
              "text": "Stundenlohn: Bezahlung pro gearbeitete Stunde. Berechtigt zu Überstundenzuschlägen. Am häufigsten bei gewerblichen Arbeitnehmern.",
              "type": "info"
            },
            {
              "text": "Gehalt (Angestellte): Feste Jahresvergütung unabhängig von Stunden. Keine Überstundenvergütung erforderlich, aber möglicherweise 45-50+ Stunden/Woche, was den Stundenlohn effektiv senkt.",
              "type": "warning"
            },
            {
              "text": "Alle zwei Wochen: Bezahlung alle 2 Wochen = 26 Gehälter/Jahr. Häufigster Zahlungszyklus in Deutschland.",
              "type": "info"
            },
            {
              "text": "Monatlich: Bezahlung am 1. des Monats = 12 Gehälter/Jahr. Standard in Deutschland für Angestellte.",
              "type": "info"
            },
            {
              "text": "Provision: Grundgehalt plus Prozentsatz der Verkäufe. Berechnen Sie Ihren effektiven Stundenlohn einschließlich durchschnittlicher Provisionen.",
              "type": "info"
            },
            {
              "text": "Freiberuflich/Vertrag: Typischerweise 25-40% höhere Sätze zur Deckung von Sozialversicherung, Vorteilen und unbezahltem Urlaub.",
              "type": "warning"
            }
          ]
        },
        "timeOffImpact": {
          "title": "Auswirkungen von Auszeiten verstehen",
          "items": [
            {
              "text": "Deutsche Arbeitnehmer haben durchschnittlich 24-30 bezahlte Urlaubstage und 9-13 Feiertage pro Jahr — deutlich mehr als die USA.",
              "type": "info"
            },
            {
              "text": "Jeder Urlaubstag kostet etwa 0,4% Ihres Jahresgehalts. 25 Tage Urlaub = 9,6% Reduzierung der tatsächlichen Arbeitszeit.",
              "type": "info"
            },
            {
              "text": "Unbezahlter Urlaub reduziert direkt Ihr effektives Jahresgehalt. 2 unbezahlte Wochen = 3,85% Gehaltskürzung.",
              "type": "warning"
            },
            {
              "text": "Ihr effektiver Stundenlohn STEIGT bei bezahltem Urlaub — Sie verdienen dasselbe, arbeiten aber weniger Stunden.",
              "type": "info"
            },
            {
              "text": "Krankheitstage (Durchschnitt 8/Jahr in DE) werden normalerweise nicht in das Gehalt eingerechnet, beeinflussen aber Ihre tatsächlichen Produktivitätskosten.",
              "type": "info"
            },
            {
              "text": "Beim Vergleich von Jobs den Urlaubswert berücksichtigen: jede zusätzliche Urlaubswoche ist etwa 2% des Gehalts wert.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Beispiele für Gehaltsumrechnung",
          "description": "Sehen Sie, wie verschiedene Gehälter über Zahlungshäufigkeiten umgerechnet werden",
          "examples": [
            {
              "title": "45.000€ Jahresgehalt",
              "steps": [
                "Jährlich: 45.000€",
                "Monatlich: 45.000€ ÷ 12 = 3.750€",
                "Alle zwei Wochen: 45.000€ ÷ 26 = 1.731€",
                "Wöchentlich: 45.000€ ÷ 52 = 865€",
                "Täglich: 45.000€ ÷ 260 = 173€",
                "Stündlich: 45.000€ ÷ 2.080 = 21,63€"
              ],
              "result": "21,63€/Stunde. Mit 25 Urlaubstagen + 11 Feiertagen steigt der effektive Satz auf 23,35€/Stunde."
            },
            {
              "title": "20€/Stunde Teilzeit (30 Std/Wo)",
              "steps": [
                "Stündlich: 20,00€",
                "Täglich (6 Std): 20€ × 6 = 120€",
                "Wöchentlich: 20€ × 30 = 600€",
                "Monatlich: 600€ × 4,33 = 2.598€",
                "Jährlich: 20€ × 30 × 52 = 31.200€"
              ],
              "result": "31.200€/Jahr bei 30 Stunden/Woche. Mit 5 Std Überstunden bei 1,25x: 34.450€/Jahr (+10,4%)."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie rechne ich Jahresgehalt in Stundenlohn um?",
          "answer": "Teilen Sie Ihr Jahresgehalt durch 2.080 (40 Stunden × 52 Wochen). Beispiel: 50.000€ ÷ 2.080 = 24,04€/Stunde. Wenn Sie weniger als 40 Stunden arbeiten oder unbezahlten Urlaub nehmen, passen Sie den Nenner entsprechend an."
        },
        {
          "question": "Was ist der Unterschied zwischen zweiwöchentlicher und monatlicher Bezahlung?",
          "answer": "Zweiwöchentlich bedeutet alle 2 Wochen (26 Gehälter/Jahr), während monatlich einmal im Monat an festen Terminen wie dem 1. bedeutet (12 Gehälter/Jahr). Zweiwöchentlich gibt Ihnen 14 extra Gehälter pro Jahr."
        },
        {
          "question": "Wie wirken sich Überstunden auf mein effektives Gehalt aus?",
          "answer": "Nach deutschem Arbeitsrecht erhalten Arbeitnehmer oft 25-50% Zuschlag für Überstunden. 5 Überstunden bei 20€/Std mit 25% Zuschlag fügen 125€/Woche oder 6.500€/Jahr hinzu — eine 20,8% Steigerung bei einem 31.200€ Gehalt."
        },
        {
          "question": "Sollte ich Urlaub beim Vergleich von Stellenangeboten berücksichtigen?",
          "answer": "Ja. Ein 50.000€ Job mit 30 Urlaubstagen hat einen effektiven Stundenlohn von 26,04€ (bei 1.920 Arbeitsstunden), während ein 52.000€ Job mit nur 20 Urlaubstagen 25,49€/Stunde zahlt (bei 2.040 Arbeitsstunden). Das niedrigere Gehalt ist tatsächlich mehr pro Stunde wert."
        },
        {
          "question": "Wie viele Arbeitsstunden hat ein Jahr?",
          "answer": "Standard sind 2.080 Stunden (40 Stunden × 52 Wochen). Mit typischem deutschen Urlaub (25 Urlaubstage + 11 Feiertage) sind die tatsächlichen Arbeitsstunden etwa 1.792. Das macht Ihren effektiven Stundenlohn etwa 16% höher als die einfache Berechnung."
        },
        {
          "question": "Wie berechne ich meinen realen Stundenlohn als Angestellter?",
          "answer": "Verfolgen Sie Ihre tatsächlichen Stunden für einen Monat. Viele Angestellte arbeiten 45-50 Stunden/Woche. Ein 60.000€ Gehalt bei 50 Stunden/Woche = 23,08€/Stunde statt 28,85€/Stunde bei 40 Stunden — ein 20% Unterschied."
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
    { id: "salary", type: "number", defaultValue: null, placeholder: "50000", unitType: "currency", syncGroup: false, autoConvert: false, defaultUnit: "USD" },
    { id: "payFrequency", type: "select", defaultValue: "yearly", options: [{ value: "hourly" }, { value: "daily" }, { value: "weekly" }, { value: "biweekly" }, { value: "monthly" }, { value: "yearly" }] },
    { id: "hoursPerWeek", type: "stepper", defaultValue: 40, min: 1, max: 80, step: 1, suffix: "hrs/week" },
    { id: "daysPerWeek", type: "stepper", defaultValue: 5, min: 1, max: 7, step: 1, suffix: "days/week" },
    { id: "adjustTimeOff", type: "toggle", defaultValue: false },
    { id: "vacationDays", type: "number", defaultValue: null, placeholder: "15", min: 0, max: 60, suffix: "days", showWhen: { field: "adjustTimeOff", value: true } },
    { id: "paidHolidays", type: "number", defaultValue: null, placeholder: "11", min: 0, max: 30, suffix: "days", showWhen: { field: "adjustTimeOff", value: true } },
    { id: "includeOvertime", type: "toggle", defaultValue: false },
    { id: "overtimeHours", type: "number", defaultValue: null, placeholder: "5", min: 0, max: 40, suffix: "hrs/week", showWhen: { field: "includeOvertime", value: true } },
    { id: "overtimeRate", type: "number", defaultValue: null, placeholder: "1.5", min: 1, max: 4, step: 0.25, suffix: "x", showWhen: { field: "includeOvertime", value: true } },
  ],

  inputGroups: [],

  results: [
    { id: "hourly", type: "primary", format: "text" },
    { id: "daily", type: "secondary", format: "text" },
    { id: "weekly", type: "secondary", format: "text" },
    { id: "biweekly", type: "secondary", format: "text" },
    { id: "monthly", type: "secondary", format: "text" },
    { id: "annual", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "workStats", type: "list", icon: "📊", itemCount: 4 },
    { id: "compare", type: "list", icon: "⚖️", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "payStructures", type: "list", icon: "📋", itemCount: 6 },
    { id: "timeOffImpact", type: "list", icon: "🏖️", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "U.S. Bureau of Labor Statistics", year: "2025", title: "Occupational Employment and Wage Statistics", source: "BLS.gov", url: "https://www.bls.gov/oes/" },
    { authors: "U.S. Department of Labor", year: "2026", title: "Fair Labor Standards Act (FLSA) - Overtime Pay", source: "DOL.gov", url: "https://www.dol.gov/agencies/whd/overtime" },
  ],

  hero: {},
  sidebar: {},
  features: {},
  relatedCalculators: ["investment-calculator", "compound-interest-calculator", "retirement-calculator", "inflation-calculator"],
  ads: {},
};

// ═════════════════════════════════════════════════════════
// CALCULATE
// ═════════════════════════════════════════════════════════

export function calculateSalaryConverterCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const salary = values.salary as number | null;
  const payFrequency = (values.payFrequency as string) || "yearly";
  const hoursPerWeek = (values.hoursPerWeek as number) || 40;
  const daysPerWeek = (values.daysPerWeek as number) || 5;
  const adjustTimeOff = values.adjustTimeOff === true;
  const vacationDays = (values.vacationDays as number) || 0;
  const paidHolidays = (values.paidHolidays as number) || 0;
  const includeOvertime = values.includeOvertime === true;
  const overtimeHours = (values.overtimeHours as number) || 0;
  const overtimeRate = (values.overtimeRate as number) || 1.5;

  if (salary === null) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (includeOvertime && (values.overtimeHours === null || values.overtimeRate === null)) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (adjustTimeOff && (values.vacationDays === null || values.paidHolidays === null)) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const currUnit = fieldUnits?.salary || "USD";
  const sym = CURRENCY_SYMBOLS[currUnit] || "$";

  const hoursPerDay = hoursPerWeek / daysPerWeek;
  const weeksPerYear = 52;
  const workDaysPerYear = daysPerWeek * weeksPerYear;
  const totalTimeOff = adjustTimeOff ? vacationDays + paidHolidays : 0;
  const actualWorkDays = workDaysPerYear - totalTimeOff;
  const actualWorkWeeks = actualWorkDays / daysPerWeek;
  const totalHoursYear = actualWorkDays * hoursPerDay;

  // Convert input salary to annual base
  let annualBase: number;
  switch (payFrequency) {
    case "hourly": annualBase = salary * hoursPerWeek * weeksPerYear; break;
    case "daily": annualBase = salary * workDaysPerYear; break;
    case "weekly": annualBase = salary * weeksPerYear; break;
    case "biweekly": annualBase = salary * 26; break;
    case "monthly": annualBase = salary * 12; break;
    case "yearly": default: annualBase = salary; break;
  }

  // Calculate overtime
  let overtimeAnnual = 0;
  let baseHourly = annualBase / (hoursPerWeek * weeksPerYear);
  if (includeOvertime && overtimeHours > 0) {
    overtimeAnnual = baseHourly * overtimeRate * overtimeHours * weeksPerYear;
  }

  const totalAnnual = annualBase + overtimeAnnual;
  const effectiveHourly = totalAnnual / (totalHoursYear + (includeOvertime ? overtimeHours * actualWorkWeeks : 0));
  const effectiveDaily = effectiveHourly * hoursPerDay;
  const effectiveWeekly = totalAnnual / weeksPerYear;
  const effectiveBiweekly = totalAnnual / 26;
  const effectiveMonthly = totalAnnual / 12;

  // InfoCard values
  const minutesToEarn100 = effectiveHourly > 0 ? Math.round(100 / effectiveHourly * 60) : 0;
  const earningsPerMinute = effectiveHourly / 60;
  const usMedian = 62192;
  const usMinHourly = 7.25;
  const vsPct = usMedian > 0 ? Math.round(((totalAnnual - usMedian) / usMedian) * 100) : 0;
  const vsMinPct = usMinHourly > 0 ? Math.round(((effectiveHourly - usMinHourly) / usMinHourly) * 100) : 0;
  const timeOffValue = adjustTimeOff ? Math.round(baseHourly * hoursPerDay * totalTimeOff) : 0;

  const summary = (f.summary || "Your salary converts to {hourly} per hour, {monthly} per month, and {annual} per year.")
    .replace("{hourly}", `${sym}${fmtNum(effectiveHourly, 2)}`)
    .replace("{monthly}", `${sym}${fmtNum(Math.round(effectiveMonthly))}`)
    .replace("{annual}", `${sym}${fmtNum(Math.round(totalAnnual))}`);

  return {
    values: { hourly: effectiveHourly, daily: effectiveDaily, weekly: effectiveWeekly, biweekly: effectiveBiweekly, monthly: effectiveMonthly, annual: totalAnnual, totalHoursYear: Math.round(totalHoursYear), totalWorkDays: actualWorkDays, minutesToEarn100, earningsPerMinute, overtimeImpact: overtimeAnnual, timeOffCost: timeOffValue },
    formatted: {
      hourly: `${sym}${fmtNum(effectiveHourly, 2)}`,
      daily: `${sym}${fmtNum(Math.round(effectiveDaily))}`,
      weekly: `${sym}${fmtNum(Math.round(effectiveWeekly))}`,
      biweekly: `${sym}${fmtNum(Math.round(effectiveBiweekly))}`,
      monthly: `${sym}${fmtNum(Math.round(effectiveMonthly))}`,
      annual: `${sym}${fmtNum(Math.round(totalAnnual))}`,
      totalHoursYear: `${fmtNum(Math.round(totalHoursYear))} ${v["hours"] || "hours"}`,
      totalWorkDays: `${actualWorkDays} ${v["days"] || "days"}`,
      minutesToEarn100: `${minutesToEarn100} min`,
      earningsPerMinute: `${sym}${fmtNum(earningsPerMinute, 2)}/min`,
      vsMedian: `${vsPct >= 0 ? "+" : ""}${vsPct}%`,
      vsMinimum: `${vsMinPct >= 0 ? "+" : ""}${vsMinPct}%`,
      overtimeImpact: includeOvertime && overtimeAnnual > 0 ? `+${sym}${fmtNum(Math.round(overtimeAnnual))}${v["perYear"] || "/yr"}` : "—",
      timeOffCost: adjustTimeOff && timeOffValue > 0 ? `${sym}${fmtNum(timeOffValue)} paid` : "—",
    },
    summary,
    isValid: true,
  };
}

export default salaryConverterCalculatorConfig;
