// ============================================================================
// KALCUFY V4 — Salary Converter
// ============================================================================
// Keywords EN: salary converter, hourly to salary, salary to hourly, annual to monthly
// Keywords ES: convertir salario, salario por hora, cuánto gano por hora
// ============================================================================

import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─── HELPER ──────────────────────────────────────────────────────────────────
function fmtNum(n: number, decimals = 2): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ─── CONFIG ──────────────────────────────────────────────────────────────────

export const salaryConverterConfig: CalculatorConfigV4 = {
  id: "salary-converter",
  version: "4.3",
  category: "finance",

  inputGroups: [],
  referenceData: [],

  inputs: [
    // ── BASIC INPUTS ──────────────────────────────────────────────────────
    {
      id: "salary",
      type: "number",
      defaultValue: null,
      placeholder: "50000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
    },
    {
      id: "salaryFrequency",
      type: "select",
      defaultValue: "annually",
      options: [
        { value: "hourly" },
        { value: "daily" },
        { value: "weekly" },
        { value: "biweekly" },
        { value: "semimonthly" },
        { value: "monthly" },
        { value: "annually" },
      ],
    },
    {
      id: "hoursPerWeek",
      type: "stepper",
      defaultValue: 40,
      min: 1,
      max: 80,
      suffix: "hrs/week",
    },
    {
      id: "daysPerWeek",
      type: "stepper",
      defaultValue: 5,
      min: 1,
      max: 7,
      suffix: "days/week",
    },

    // ── TOGGLES ───────────────────────────────────────────────────────────
    {
      id: "adjustForTimeOff",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "vacationDays",
      type: "number",
      defaultValue: 10,
      min: 0,
      max: 60,
      step: 1,
      suffix: "days",
      showWhen: { field: "adjustForTimeOff", value: true },
    },
    {
      id: "holidays",
      type: "number",
      defaultValue: 11,
      min: 0,
      max: 30,
      step: 1,
      suffix: "days",
      showWhen: { field: "adjustForTimeOff", value: true },
    },

    {
      id: "includeOvertime",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "overtimeHours",
      type: "number",
      defaultValue: 5,
      min: 0,
      max: 40,
      step: 1,
      suffix: "hrs/week",
      showWhen: { field: "includeOvertime", value: true },
    },
    {
      id: "overtimeRate",
      type: "number",
      defaultValue: 1.5,
      min: 1,
      max: 3,
      step: 0.1,
      suffix: "×",
      showWhen: { field: "includeOvertime", value: true },
    },
  ],

  results: [
    { id: "hourly", type: "primary", format: "number" },
    { id: "daily", type: "secondary", format: "number" },
    { id: "weekly", type: "secondary", format: "number" },
    { id: "biweekly", type: "secondary", format: "number" },
    { id: "semimonthly", type: "secondary", format: "number" },
    { id: "monthly", type: "secondary", format: "number" },
    { id: "annually", type: "secondary", format: "number" },
  ],

  presets: [
    {
      id: "minimumWage",
      icon: "💵",
      values: {
        salary: 7.25,
        salaryFrequency: "hourly",
        hoursPerWeek: 40,
        daysPerWeek: 5,
        adjustForTimeOff: false,
        includeOvertime: false,
      },
    },
    {
      id: "averageUS",
      icon: "🇺🇸",
      values: {
        salary: 62000,
        salaryFrequency: "annually",
        hoursPerWeek: 40,
        daysPerWeek: 5,
        adjustForTimeOff: false,
        includeOvertime: false,
      },
    },
    {
      id: "techWorker",
      icon: "💻",
      values: {
        salary: 120000,
        salaryFrequency: "annually",
        hoursPerWeek: 40,
        daysPerWeek: 5,
        adjustForTimeOff: true,
        vacationDays: 15,
        holidays: 11,
        includeOvertime: false,
      },
    },
    {
      id: "partTimeWorker",
      icon: "⏰",
      values: {
        salary: 18,
        salaryFrequency: "hourly",
        hoursPerWeek: 25,
        daysPerWeek: 5,
        adjustForTimeOff: false,
        includeOvertime: true,
        overtimeHours: 5,
        overtimeRate: 1.5,
      },
    },
  ],

  chart: {
    id: "salaryBreakdown",
    type: "bar",
    xKey: "period",
    series: [
      { key: "amount", type: "bar", color: "#3b82f6" },
    ],
  },

  detailedTable: {
    id: "conversionTable",
    buttonLabel: "View Common Salary Conversions",
    buttonIcon: "📊",
    modalTitle: "Common Salary Conversion Table",
    columns: [
      { id: "hourlyRate", label: "Hourly", align: "center" },
      { id: "weeklyRate", label: "Weekly", align: "right" },
      { id: "monthlyRate", label: "Monthly", align: "right" },
      { id: "annualRate", label: "Annual", align: "right", highlight: true },
    ],
  },

  infoCards: [
    {
      id: "workStats",
      type: "list",
      items: [
        { valueKey: "totalHoursYear" },
        { valueKey: "totalWorkDays" },
        { valueKey: "minutesToEarn100" },
        { valueKey: "earningsPerMinute" },
      ],
    },
    {
      id: "context",
      type: "list",
      items: [
        { valueKey: "vsMedianUS" },
        { valueKey: "vsMinimumWage" },
        { valueKey: "overtimeImpact" },
        { valueKey: "timeOffCost" },
      ],
    },
    {
      id: "salaryTips",
      type: "horizontal",
    },
  ],

  educationSections: [
    { id: "whatIs", type: "prose" },
    { id: "howItWorks", type: "prose" },
    { id: "salaryTypes", type: "list" },
    { id: "negotiationTips", type: "list" },
    {
      id: "examples",
      type: "code-example",
    },
  ],

  references: [
    {
      id: "bls",
      author: "Bureau of Labor Statistics",
      year: 2024,
      title: "Usual Weekly Earnings of Wage and Salary Workers",
      publisher: "U.S. Department of Labor",
      url: "https://www.bls.gov/news.release/wkyeng.toc.htm",
    },
    {
      id: "flsa",
      author: "U.S. Department of Labor",
      year: 2024,
      title: "Fair Labor Standards Act — Overtime Pay",
      publisher: "DOL Wage and Hour Division",
      url: "https://www.dol.gov/agencies/whd/overtime",
    },
  ],

  // ── TRANSLATIONS ────────────────────────────────────────────────────────
  t: {
    en: {
      name: "Salary Converter",
      slug: "salary-converter",
      subtitle:
        "Convert your salary between hourly, daily, weekly, and annual. Adjust for time off and overtime to see your real earnings.",
      breadcrumb: "Salary Converter",

      seo: {
        title: "Salary Converter - Hourly to Annual & More | Free Tool",
        description:
          "Convert your salary between hourly, daily, weekly, biweekly, monthly, and annual amounts. Adjust for vacation days, holidays, and overtime. Free multi-currency converter.",
        shortDescription: "Convert salary between hourly, weekly, monthly, and annual amounts.",
        keywords: [
          "salary converter",
          "hourly to salary",
          "salary to hourly",
          "annual to monthly salary",
          "hourly to annual calculator",
          "salary conversion calculator",
          "free salary converter",
          "how much do I make per hour",
        ],
      },

      calculator: { yourInformation: "Your Salary" },
      ui: {
        yourInformation: "Your Salary",
        calculate: "Convert",
        reset: "Reset",
        results: "Your Salary In Every Frequency",
      },

      inputs: {
        salary: {
          label: "Your Salary",
          helpText: "Enter your pay amount",
        },
        salaryFrequency: {
          label: "Pay Frequency",
          helpText: "How often you receive this amount",
          options: {
            hourly: "Per Hour",
            daily: "Per Day",
            weekly: "Per Week",
            biweekly: "Every 2 Weeks",
            semimonthly: "Twice a Month",
            monthly: "Per Month",
            annually: "Per Year",
          },
        },
        hoursPerWeek: {
          label: "Hours per Week",
          helpText: "Standard full-time: 40 hours",
        },
        daysPerWeek: {
          label: "Days per Week",
          helpText: "Standard: 5 days (Mon-Fri)",
        },
        adjustForTimeOff: {
          label: "Adjust for Time Off",
          helpText: "Account for vacation and holidays",
        },
        vacationDays: {
          label: "Vacation Days per Year",
          helpText: "Average US: 10 days",
        },
        holidays: {
          label: "Paid Holidays per Year",
          helpText: "US federal holidays: 11",
        },
        includeOvertime: {
          label: "Include Overtime",
          helpText: "Add overtime hours and rate",
        },
        overtimeHours: {
          label: "Overtime Hours per Week",
          helpText: "Hours beyond regular schedule",
        },
        overtimeRate: {
          label: "Overtime Multiplier",
          helpText: "Standard: 1.5× (time and a half)",
        },
      },

      results: {
        hourly: { label: "Hourly" },
        daily: { label: "Daily" },
        weekly: { label: "Weekly" },
        biweekly: { label: "Biweekly" },
        semimonthly: { label: "Semi-monthly" },
        monthly: { label: "Monthly" },
        annually: { label: "Annual" },
      },

      presets: {
        minimumWage: {
          label: "US Minimum Wage",
          description: "$7.25/hour, 40 hrs/week",
        },
        averageUS: {
          label: "US Average",
          description: "$62,000/year, full-time",
        },
        techWorker: {
          label: "Tech Worker",
          description: "$120K/year with 15 vacation days",
        },
        partTimeWorker: {
          label: "Part-Time + OT",
          description: "$18/hour, 25 hrs + 5 OT hours",
        },
      },

      values: {
        hours: "hours",
        hour: "hour",
        days: "days",
        day: "day",
        weeks: "weeks",
        week: "week",
        year: "year",
        years: "years",
        perHour: "/hr",
        perDay: "/day",
        perWeek: "/wk",
        perMonth: "/mo",
        perYear: "/yr",
      },

      formats: {
        summary:
          "Your salary converts to {hourly}/hour, {monthly}/month, and {annually}/year based on {hoursPerWeek} hours per week.",
      },

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
        context: {
          title: "How You Compare",
          items: [
            { label: "vs US Median ($62,192/yr)", valueKey: "vsMedianUS" },
            { label: "vs Federal Minimum ($7.25/hr)", valueKey: "vsMinimumWage" },
            { label: "Overtime Impact", valueKey: "overtimeImpact" },
            { label: "Time Off Cost", valueKey: "timeOffCost" },
          ],
        },
        salaryTips: {
          title: "Salary Tips",
          items: [
            "When comparing job offers, always convert both to the same frequency — hourly rates reveal the true picture",
            "The average American gets 10 vacation days per year — toggle Time Off to see your adjusted effective rate",
            "Overtime at 1.5× for just 5 extra hours/week adds ~$9,400/year to a $50K salary",
            "Don't forget benefits — health insurance, 401k match, and PTO add 20-30% to your total compensation",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Salary Converter?",
          content:
            "A salary converter transforms your pay between different time periods — hourly, daily, weekly, biweekly, semi-monthly, monthly, and annual. Whether you're comparing a job offer quoted at $28/hour with one at $55,000/year, or figuring out what your $4,500 monthly paycheck looks like per hour, this tool does the math instantly. Unlike basic converters, ours accounts for real-world factors like vacation days, holidays, and overtime — because your effective hourly rate changes significantly when you factor in time off. A $50,000 salary with 3 weeks off is effectively a different hourly rate than one with no time off.",
        },
        howItWorks: {
          title: "How Salary Conversion Works",
          content:
            "The foundation is simple: Annual Salary = Hourly Rate × Hours per Week × Weeks per Year. For a standard full-time job: $25/hour × 40 hours × 52 weeks = $52,000/year. To reverse it: $52,000 ÷ 52 ÷ 40 = $25/hour. Biweekly pay = annual ÷ 26 (there are 26 two-week periods per year). Semi-monthly = annual ÷ 24 (paid on the 1st and 15th). Monthly = annual ÷ 12. When you enable Time Off adjustment, we subtract vacation and holiday days from the 260 standard work days, giving you a higher effective hourly rate since you're earning the same pay in fewer working hours. Overtime adds extra earnings on top of your base rate.",
        },
        salaryTypes: {
          title: "Types of Pay Structures",
          items: [
            {
              text: "Hourly Wage: Paid per hour worked. Common in retail, food service, and trades. Eligible for overtime pay under FLSA regulations.",
              type: "info",
            },
            {
              text: "Annual Salary: Fixed yearly amount regardless of hours worked. Common for office and professional roles. Often exempt from overtime.",
              type: "info",
            },
            {
              text: "Biweekly Pay: 26 paychecks per year (every 2 weeks). Most common pay frequency in the US. Two months per year have 3 paychecks instead of 2.",
              type: "info",
            },
            {
              text: "Semi-monthly Pay: 24 paychecks per year (1st and 15th). Different from biweekly — each check covers a different number of days.",
              type: "info",
            },
            {
              text: "Important: Biweekly ≠ Semi-monthly. Biweekly = every 14 days (26/year). Semi-monthly = twice per month (24/year). This affects your per-check amount.",
              type: "warning",
            },
          ],
        },
        negotiationTips: {
          title: "Salary Negotiation Insights",
          items: [
            {
              text: "Always ask for the total compensation package — salary, bonus, equity, health insurance, 401k match, and PTO combined can differ by 20-40% between offers.",
              type: "info",
            },
            {
              text: "Convert everything to hourly to compare fairly. A $60K job with 4 weeks PTO has a higher effective hourly rate than $65K with 1 week PTO.",
              type: "info",
            },
            {
              text: "The average US raise is 3-5% per year. If you haven't received one in over a year, you may be effectively earning less due to inflation.",
              type: "warning",
            },
            {
              text: "Remote work can effectively increase your hourly rate by eliminating commute time. A 1-hour daily commute equals 260 hours/year — that's over 6 extra work weeks.",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Step-by-step salary conversion examples",
          examples: [
            {
              title: "Hourly to Annual: $25/hour → Annual Salary",
              steps: [
                "Hourly rate: $25",
                "Hours per week: 40",
                "Weeks per year: 52",
                "Annual = $25 × 40 × 52",
              ],
              result: "Annual salary = $52,000",
            },
            {
              title: "Annual to Hourly: $75,000/year → Hourly Rate",
              steps: [
                "Annual salary: $75,000",
                "Work weeks: 52 (or 49 adjusted for 3 weeks off)",
                "Unadjusted: $75,000 ÷ 52 ÷ 40 = $36.06/hr",
                "Adjusted (3 wks off): $75,000 ÷ 49 ÷ 40 = $38.27/hr",
              ],
              result: "Hourly rate: $36.06 unadjusted, $38.27 adjusted — time off raises your effective rate by $2.21/hr",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How do I convert my annual salary to hourly?",
          answer:
            "Divide your annual salary by 2,080 (52 weeks × 40 hours). For example, $50,000 ÷ 2,080 = $24.04 per hour. If you work different hours, adjust accordingly: $50,000 ÷ (your hours per week × 52).",
        },
        {
          question: "What is the difference between biweekly and semi-monthly pay?",
          answer:
            "Biweekly means every 2 weeks (26 paychecks per year), while semi-monthly means twice per month on fixed dates like the 1st and 15th (24 paychecks per year). Biweekly checks are always for 10 working days, but semi-monthly checks vary. Two months per year, biweekly employees get 3 paychecks.",
        },
        {
          question: "Why is my adjusted salary different from unadjusted?",
          answer:
            "The adjusted calculation accounts for vacation days and holidays. When you take time off, you're earning the same annual pay but working fewer hours. This means your effective hourly rate is higher than the simple calculation suggests. If you have 21 days off (10 vacation + 11 holidays), you work 239 days instead of 260.",
        },
        {
          question: "How does overtime affect my salary?",
          answer:
            "Under the FLSA, non-exempt employees must receive 1.5× their regular rate for hours over 40 per week. For example, at $20/hour base, 5 overtime hours add $150/week ($20 × 1.5 × 5), which is an extra $7,800/year. That's a 15% pay boost on top of a base salary of $41,600.",
        },
        {
          question: "Is a $50,000 salary good?",
          answer:
            "The US median household income is approximately $72,000 (2023 data). A $50,000 salary is below the national median but varies greatly by location — it goes much further in rural areas than in cities like New York or San Francisco. At 40 hours/week, $50K equals $24.04/hour, which is well above the federal minimum wage of $7.25.",
        },
        {
          question: "How much is $20 an hour as an annual salary?",
          answer:
            "At 40 hours per week for 52 weeks, $20/hour equals $41,600 per year, $3,467 per month, $1,600 per biweekly paycheck, and $800 per week. Adjusted for 3 weeks off, the effective annual working income remains the same since most full-time positions include paid time off.",
        },
        {
          question: "What is the federal minimum wage in the US?",
          answer:
            "The federal minimum wage is $7.25 per hour, which equals $15,080 per year for full-time work (40 hrs/week, 52 weeks). However, many states set higher minimums — for example, Washington DC at $17.95/hr and Washington state at $16.66/hr. Always check your state's minimum wage as it may be higher than federal.",
        },
        {
          question: "How do I account for benefits when comparing salaries?",
          answer:
            "Benefits typically add 20-30% to your total compensation. For a $60,000 salary, health insurance ($6,000-$12,000/yr), 401k match (3-6% = $1,800-$3,600), PTO (10-20 days), and other benefits can bring total compensation to $75,000-$85,000. Always ask for the full package breakdown when comparing offers.",
        },
      ],

      chart: {
        title: "Your Salary Breakdown",
        xLabel: "Pay Period",
        yLabel: "Amount",
        series: {
          amount: "Salary Amount",
        },
      },

      detailedTable: {
        conversionTable: {
          button: "View Common Salary Conversions",
          title: "Common Salary Conversion Table",
          columns: {
            hourlyRate: "Hourly",
            weeklyRate: "Weekly",
            monthlyRate: "Monthly",
            annualRate: "Annual",
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
        calculate: "Convert",
        reset: "Reset",
        pdf: "Download PDF",
        excel: "Download Excel",
      },
      share: {
        title: "Share Results",
        text: "Check out my salary breakdown!",
      },
      accessibility: {
        chartDescription: "Bar chart showing salary converted to different pay frequencies",
        resultsRegion: "Salary conversion results",
      },
      sources: {
        title: "Sources & References",
      },
    },
    es: {
      "meta": {
        "title": "Calculadora Convertidor de Salario - Convierte Salario Anual a Por Hora",
        "description": "Convierte fácilmente entre salario anual, mensual, semanal y por hora. Calculadora gratuita de conversión de salario con ajustes por tiempo libre y días festivos.",
        "keywords": "calculadora salario, convertidor salario, salario anual a por hora, calculadora sueldo, conversión salario"
      },
      "slug": "calculadora-convertidor-salario",
      "title": "Calculadora Convertidor de Salario",
      "description": "Convierte entre diferentes períodos de salario: anual, mensual, semanal y por hora.",
      "category": "finanzas",
      "inputs": [
        {
          "name": "salaryAmount",
          "label": "Cantidad del Salario",
          "type": "number",
          "placeholder": "Ingresa la cantidad del salario",
          "required": true
        },
        {
          "name": "salaryPeriod",
          "label": "Período del Salario",
          "type": "select",
          "options": [
            {
              "value": "anual",
              "label": "Anual"
            },
            {
              "value": "mensual",
              "label": "Mensual"
            },
            {
              "value": "semanal",
              "label": "Semanal"
            },
            {
              "value": "por-hora",
              "label": "Por Hora"
            }
          ],
          "required": true
        },
        {
          "name": "hoursPerWeek",
          "label": "Horas por Semana",
          "type": "number",
          "placeholder": "40",
          "defaultValue": 40
        },
        {
          "name": "adjustForTimeOff",
          "label": "Ajustar por Tiempo Libre",
          "type": "checkbox",
          "defaultValue": true
        },
        {
          "name": "vacationDays",
          "label": "Días de Vacaciones",
          "type": "number",
          "placeholder": "10",
          "defaultValue": 10
        },
        {
          "name": "holidays",
          "label": "Días Festivos",
          "type": "number",
          "placeholder": "8",
          "defaultValue": 8
        }
      ],
      "results": {
        "annual": "Salario Anual",
        "monthly": "Salario Mensual",
        "weekly": "Salario Semanal",
        "hourly": "Salario por Hora",
        "effectiveHours": "Horas Efectivas por Año"
      },
      "content": {
        "whatIs": {
          "title": "¿Qué es un Convertidor de Salario?",
          "content": "Un convertidor de salario es una herramienta que te ayuda a convertir tu salario entre diferentes períodos de tiempo. Ya sea que recibas un salario anual y quieras saber cuánto ganas por hora, o tengas una tarifa por hora y quieras calcular tu ingreso anual potencial, esta calculadora hace las conversiones por ti."
        },
        "howToUse": {
          "title": "Cómo Usar la Calculadora de Conversión de Salario",
          "steps": [
            "Ingresa tu cantidad de salario actual",
            "Selecciona el período de tiempo (anual, mensual, semanal o por hora)",
            "Ingresa tus horas de trabajo por semana",
            "Opcionalmente ajusta por días de vacaciones y festivos",
            "Ve tu salario convertido a todos los períodos de tiempo"
          ]
        },
        "benefits": {
          "title": "Beneficios de Conocer Tu Salario en Diferentes Períodos",
          "list": [
            "Compara ofertas de trabajo de manera más efectiva",
            "Planifica tu presupuesto mensual y semanal",
            "Entiende tu valor real por hora",
            "Toma decisiones informadas sobre horas extra",
            "Negocia salarios con confianza"
          ]
        },
        "tips": {
          "title": "Consejos para Conversiones Precisas de Salario",
          "list": [
            "Incluye días de vacaciones y festivos para cálculos más precisos",
            "Considera beneficios adicionales al comparar ofertas",
            "Ten en cuenta las deducciones de impuestos",
            "Actualiza regularmente con cambios en horas de trabajo",
            "Usa salario bruto para comparaciones consistentes"
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
      "slug": "calculadora-conversor-salario",
      "title": "Calculadora de Conversão de Salário",
      "meta_description": "Converta facilmente seu salário entre diferentes períodos - anual, mensal, quinzenal, semanal e por hora. Ajuste para folgas e feriados.",
      "heading": "Calculadora de Conversão de Salário",
      "intro_text": "Converta seu salário entre diferentes períodos de tempo e compare diferentes estruturas de pagamento. Esta calculadora ajuda você a entender seu verdadeiro valor por hora e rendimento anual.",
      "config": {
        "fields": {
          "salaryAmount": {
            "label": "Valor do Salário",
            "placeholder": "Digite o valor do salário"
          },
          "salaryPeriod": {
            "label": "Período do Salário",
            "options": {
              "hourly": "Por Hora",
              "weekly": "Semanal",
              "biweekly": "Quinzenal",
              "monthly": "Mensal",
              "annually": "Anual"
            }
          },
          "hoursPerWeek": {
            "label": "Horas por Semana",
            "placeholder": "Digite as horas trabalhadas por semana"
          },
          "adjustForTimeOff": {
            "label": "Ajustar para Folgas",
            "description": "Incluir feriados e férias no cálculo"
          },
          "vacationDays": {
            "label": "Dias de Férias por Ano",
            "placeholder": "Digite os dias de férias"
          },
          "holidayDays": {
            "label": "Feriados por Ano",
            "placeholder": "Digite os feriados"
          }
        }
      },
      "results": {
        "title": "Conversões de Salário",
        "labels": {
          "hourly": "Por Hora",
          "weekly": "Semanal",
          "biweekly": "Quinzenal",
          "monthly": "Mensal",
          "annually": "Anual",
          "workingHoursPerYear": "Horas Trabalhadas por Ano",
          "effectiveHourlyRate": "Taxa Efetiva por Hora"
        }
      },
      "faq": [
        {
          "question": "Como esta calculadora converte entre diferentes períodos de salário?",
          "answer": "A calculadora usa suas horas de trabalho por semana para converter entre períodos. Para conversões anuais, assume 52 semanas por ano, ajustando para folgas quando especificado."
        },
        {
          "question": "Devo incluir horas extras no meu cálculo?",
          "answer": "Para maior precisão, use sua média de horas semanais incluindo horas extras regulares. Se as horas extras variam significativamente, use apenas suas horas base."
        },
        {
          "question": "Como o ajuste para folgas afeta os cálculos?",
          "answer": "Quando habilitado, a calculadora subtrai seus dias de férias e feriados do total de dias úteis por ano, fornecendo uma taxa efetiva por hora mais alta baseada nos dias realmente trabalhados."
        },
        {
          "question": "Esta calculadora considera impostos?",
          "answer": "Não, esta calculadora mostra valores brutos antes dos impostos. Seu salário líquido será menor após deduções de impostos, previdência social e outros descontos."
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
      "slug": "calculateur-convertisseur-salaire",
      "title": "Calculateur de Conversion de Salaire",
      "meta": {
        "description": "Convertissez facilement entre salaire horaire, hebdomadaire, mensuel et annuel. Calculateur gratuit avec ajustements pour les congés et les heures de travail.",
        "keywords": "calculateur salaire, convertisseur salaire, salaire horaire, salaire annuel, conversion paie"
      },
      "heading": "Calculateur de Conversion de Salaire",
      "subheading": "Convertissez entre différentes périodes de paie",
      "info": "Convertissez facilement votre salaire entre les taux horaires, hebdomadaires, mensuels et annuels. Ajustez pour les congés payés et les heures de travail variables.",
      "labels": {
        "salaryAmount": "Montant du salaire",
        "salaryPeriod": "Période de paie",
        "hoursPerWeek": "Heures par semaine",
        "weeksPerYear": "Semaines par an",
        "adjustForTimeOff": "Ajuster pour les congés"
      },
      "placeholders": {
        "salaryAmount": "Entrez le montant du salaire"
      },
      "options": {
        "salaryPeriod": {
          "hourly": "Horaire",
          "weekly": "Hebdomadaire",
          "monthly": "Mensuel",
          "annually": "Annuel"
        }
      },
      "results": {
        "title": "Conversions de Salaire",
        "hourly": "Taux horaire",
        "weekly": "Salaire hebdomadaire",
        "monthly": "Salaire mensuel",
        "annually": "Salaire annuel",
        "workingHours": "Heures de travail totales par an",
        "workingDays": "Jours de travail par an"
      },
      "faq": [
        {
          "question": "Comment convertir un salaire horaire en salaire annuel ?",
          "answer": "Multipliez votre taux horaire par vos heures de travail hebdomadaires, puis par le nombre de semaines travaillées par an. Par exemple : 20 €/heure × 40 heures/semaine × 50 semaines = 40 000 € par an."
        },
        {
          "question": "Dois-je ajuster pour les congés payés ?",
          "answer": "Oui, si vous voulez un calcul précis. La plupart des emplois à temps plein incluent des congés payés, des jours fériés et des congés maladie, ce qui réduit généralement les semaines de travail effectives de 52 à environ 50 par an."
        },
        {
          "question": "Combien d'heures représente un emploi à temps plein ?",
          "answer": "Un emploi à temps plein standard représente généralement 40 heures par semaine, mais cela peut varier selon l'employeur et le secteur d'activité."
        },
        {
          "question": "Comment calculer le salaire mensuel à partir du salaire annuel ?",
          "answer": "Divisez votre salaire annuel par 12 mois. Par exemple : 60 000 € par an ÷ 12 = 5 000 € par mois."
        },
        {
          "question": "Ces calculs incluent-ils les impôts ?",
          "answer": "Non, ces calculs montrent le salaire brut avant déduction des impôts, cotisations sociales et autres retenues. Votre salaire net sera inférieur après ces déductions."
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
      "name": "Gehaltsumrechner",
      "slug": "gehaltsumrechner-rechner",
      "description": "Rechnen Sie Ihr Gehalt zwischen verschiedenen Zeiträumen um - stündlich, täglich, wöchentlich, monatlich und jährlich.",
      "form": {
        "salaryAmount": {
          "label": "Gehaltsbetrag",
          "placeholder": "Geben Sie Ihr Gehalt ein"
        },
        "salaryPeriod": {
          "label": "Gehaltszeitraum",
          "options": {
            "hourly": "Stündlich",
            "daily": "Täglich",
            "weekly": "Wöchentlich",
            "biweekly": "Alle zwei Wochen",
            "semimonthly": "Zweimal monatlich",
            "monthly": "Monatlich",
            "annually": "Jährlich"
          }
        },
        "hoursPerWeek": {
          "label": "Arbeitsstunden pro Woche",
          "placeholder": "Standard: 40"
        },
        "weeksPerYear": {
          "label": "Arbeitswochen pro Jahr",
          "placeholder": "Standard: 52"
        },
        "adjustForTimeOff": {
          "label": "Für Urlaub/Feiertage anpassen",
          "field": "adjustForTimeOff",
          "value": true
        },
        "vacationDays": {
          "label": "Urlaubstage pro Jahr",
          "placeholder": "Standard: 10"
        },
        "holidayDays": {
          "label": "Feiertage pro Jahr",
          "placeholder": "Standard: 8"
        }
      },
      "results": {
        "title": "Ihre Gehaltsumrechnung",
        "labels": {
          "hourly": "Stündlich",
          "daily": "Täglich",
          "weekly": "Wöchentlich",
          "biweekly": "Alle zwei Wochen",
          "semimonthly": "Zweimal monatlich",
          "monthly": "Monatlich",
          "annually": "Jährlich"
        },
        "workingHoursBreakdown": {
          "title": "Aufschlüsselung der Arbeitszeit",
          "totalHoursPerYear": "Gesamtstunden pro Jahr",
          "workingDaysPerYear": "Arbeitstage pro Jahr",
          "adjustedForTimeOff": "Angepasst für Urlaubszeit"
        }
      },
      "explanation": {
        "title": "Wie Gehaltsumrechnung funktioniert",
        "content": "Dieser Rechner wandelt Ihr Gehalt zwischen verschiedenen Zeiträumen um, basierend auf Ihren Arbeitsstunden und der Berücksichtigung von Urlaubszeit. Er verwendet Standardarbeitswochen (40 Stunden) und kann für Urlaubs- und Feiertage angepasst werden, um eine genauere Darstellung Ihres effektiven Stundenlohns zu erhalten."
      },
      "meta": {
        "title": "Gehaltsumrechner - Stündlich, Monatlich, Jährlich",
        "description": "Rechnen Sie Ihr Gehalt kostenlos zwischen Stunden-, Tages-, Wochen-, Monats- und Jahressätzen um. Berücksichtigt Arbeitszeit und Urlaub für genaue Berechnungen."
      },
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
};

// ─── CALCULATE FUNCTION ──────────────────────────────────────────────────────

export function calculateSalaryConverter(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
  locale?: string;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── READ INPUTS ──────────────────────────────────────────────────────
  const salary = values.salary as number | null;
  if (salary === null || salary === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const salaryFrequency = (values.salaryFrequency as string) || "annually";
  const hoursPerWeek = (values.hoursPerWeek as number) ?? 40;
  const daysPerWeek = (values.daysPerWeek as number) ?? 5;

  // Toggles
  const adjustForTimeOff = values.adjustForTimeOff === true;
  const vacationDays = adjustForTimeOff ? ((values.vacationDays as number) ?? 10) : 0;
  const holidays = adjustForTimeOff ? ((values.holidays as number) ?? 11) : 0;

  const includeOvertime = values.includeOvertime === true;
  const overtimeHours = includeOvertime ? ((values.overtimeHours as number) ?? 5) : 0;
  const overtimeRate = includeOvertime ? ((values.overtimeRate as number) ?? 1.5) : 1;

  // ── CORE CALCULATION ─────────────────────────────────────────────────
  const hoursPerDay = hoursPerWeek / daysPerWeek;
  const totalWeeksPerYear = 52;
  const totalWorkDaysUnadjusted = daysPerWeek * totalWeeksPerYear; // 260
  const totalTimeOffDays = vacationDays + holidays;
  const totalWorkDays = totalWorkDaysUnadjusted - totalTimeOffDays;
  const totalWorkWeeks = totalWorkDays / daysPerWeek;
  const totalHoursYear = totalWorkDays * hoursPerDay;

  // Convert input salary to annual base (before overtime)
  const freqToAnnual: Record<string, number> = {
    hourly: hoursPerWeek * totalWeeksPerYear,
    daily: totalWorkDaysUnadjusted,
    weekly: totalWeeksPerYear,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
    annually: 1,
  };

  const annualBase = salary * (freqToAnnual[salaryFrequency] || 1);

  // Calculate base hourly rate
  const baseHourly = annualBase / (hoursPerWeek * totalWeeksPerYear);

  // Overtime annual addition
  const overtimeAnnual = includeOvertime
    ? baseHourly * overtimeRate * overtimeHours * totalWorkWeeks
    : 0;

  const annualTotal = annualBase + overtimeAnnual;

  // ── ALL FREQUENCIES ──────────────────────────────────────────────────
  const hourly = annualTotal / (totalHoursYear + (overtimeHours * totalWorkWeeks));
  const daily = annualTotal / totalWorkDays;
  const weekly = annualTotal / totalWeeksPerYear;
  const biweekly = annualTotal / 26;
  const semimonthly = annualTotal / 24;
  const monthly = annualTotal / 12;
  const annually = annualTotal;

  // ── CURRENCY SYMBOL ──────────────────────────────────────────────────
  const curr = fieldUnits?.salary || "USD";
  const SYMBOLS: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
    JPY: "¥", INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF",
    COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP",
  };
  const sym = SYMBOLS[curr] || "$";

  // ── WORK STATS (infoCard 1 — unique data) ────────────────────────────
  const minutesToEarn100 = hourly > 0 ? (100 / hourly) * 60 : 0;
  const earningsPerMinute = hourly / 60;

  // ── CONTEXT (infoCard 2 — comparisons) ───────────────────────────────
  const US_MEDIAN_ANNUAL = 62192;
  const US_MIN_WAGE = 7.25;

  const vsMedianDiff = annually - US_MEDIAN_ANNUAL;
  const vsMedianPct = (vsMedianDiff / US_MEDIAN_ANNUAL) * 100;
  const vsMinWageMultiple = hourly / US_MIN_WAGE;

  const overtimeImpactAnnual = overtimeAnnual;
  const timeOffCostPerDay = annually > 0 ? annualBase / totalWorkDaysUnadjusted : 0;
  const timeOffTotalValue = timeOffCostPerDay * totalTimeOffDays;

  // ── CHART DATA ───────────────────────────────────────────────────────
  const chartData = [
    { period: "Hourly", amount: Math.round(hourly * 100) / 100 },
    { period: "Daily", amount: Math.round(daily) },
    { period: "Weekly", amount: Math.round(weekly) },
    { period: "Biweekly", amount: Math.round(biweekly) },
    { period: "Semi-mo", amount: Math.round(semimonthly) },
    { period: "Monthly", amount: Math.round(monthly) },
    { period: "Annual", amount: Math.round(annually) },
  ];

  // ── TABLE DATA — common conversions ──────────────────────────────────
  const commonRates = [7.25, 10, 12, 15, 18, 20, 25, 30, 35, 40, 45, 50, 60, 75, 100];
  const tableData = commonRates.map((rate) => {
    const ann = rate * hoursPerWeek * totalWeeksPerYear;
    return {
      hourlyRate: `${sym}${fmtNum(rate)}`,
      weeklyRate: `${sym}${fmtNum(rate * hoursPerWeek, 0)}`,
      monthlyRate: `${sym}${fmtNum(ann / 12, 0)}`,
      annualRate: `${sym}${fmtNum(ann, 0)}`,
    };
  });

  // ── FORMAT ───────────────────────────────────────────────────────────
  const hourlyFmt = `${sym}${fmtNum(hourly)}`;
  const monthlyFmt = `${sym}${fmtNum(monthly, 0)}`;
  const annuallyFmt = `${sym}${fmtNum(annually, 0)}`;

  const summary =
    f.summary
      ?.replace("{hourly}", hourlyFmt)
      .replace("{monthly}", monthlyFmt)
      .replace("{annually}", annuallyFmt)
      .replace("{hoursPerWeek}", `${hoursPerWeek}`) ||
    `Your salary converts to ${hourlyFmt}/hour, ${monthlyFmt}/month, ${annuallyFmt}/year.`;

  return {
    values: {
      hourly,
      daily,
      weekly,
      biweekly,
      semimonthly,
      monthly,
      annually,
      totalHoursYear,
      totalWorkDays,
      minutesToEarn100,
      earningsPerMinute,
      vsMedianUS: vsMedianPct,
      vsMinimumWage: vsMinWageMultiple,
      overtimeImpact: overtimeImpactAnnual,
      timeOffCost: timeOffTotalValue,
    },
    formatted: {
      hourly: hourlyFmt,
      daily: `${sym}${fmtNum(daily)}`,
      weekly: `${sym}${fmtNum(weekly, 0)}`,
      biweekly: `${sym}${fmtNum(biweekly, 0)}`,
      semimonthly: `${sym}${fmtNum(semimonthly, 0)}`,
      monthly: monthlyFmt,
      annually: annuallyFmt,
      totalHoursYear: `${fmtNum(totalHoursYear, 0)} hrs`,
      totalWorkDays: `${fmtNum(totalWorkDays, 0)} days`,
      minutesToEarn100: minutesToEarn100 > 0
        ? `${fmtNum(minutesToEarn100, 1)} min`
        : "-",
      earningsPerMinute: `${sym}${fmtNum(earningsPerMinute)}`,
      vsMedianUS: vsMedianDiff >= 0
        ? `+${fmtNum(vsMedianPct, 1)}% above`
        : `${fmtNum(vsMedianPct, 1)}% below`,
      vsMinimumWage: `${fmtNum(vsMinWageMultiple, 1)}× higher`,
      overtimeImpact: includeOvertime
        ? `+${sym}${fmtNum(overtimeImpactAnnual, 0)}/year`
        : "Not included",
      timeOffCost: adjustForTimeOff
        ? `${fmtNum(totalTimeOffDays, 0)} days = ${sym}${fmtNum(timeOffTotalValue, 0)} value`
        : "Not adjusted",
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default salaryConverterConfig;
