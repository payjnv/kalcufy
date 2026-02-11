import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

// =============================================================================
// DATE CALCULATOR - V4 Engine
// Add/subtract days, weeks, months, years + days between dates
// Following ALL rules from: ENGINE_V4_COMPLETE_GUIDE.md, RULE_WIDTH_HALF_UPDATE.md,
// KALCUFY_BUG_FIXES_REFERENCE.md
// =============================================================================

export const dateCalculatorConfig: CalculatorConfigV4 = {
  id: "date",
  version: "4.0",
  category: "everyday",
  icon: "📅",

  // ===========================================================================
  // PRESETS - ALWAYS include icon (RULE from ENGINE_V4)
  // ===========================================================================
  presets: [
    {
      id: "thirtyDays",
      icon: "📆",
      values: {
        calculationType: "addSubtract",
        operation: "add",
        daysToAdd: 30,
        weeksToAdd: 0,
        monthsToAdd: 0,
        yearsToAdd: 0,
      },
    },
    {
      id: "ninetyDays",
      icon: "📋",
      values: {
        calculationType: "addSubtract",
        operation: "add",
        daysToAdd: 90,
        weeksToAdd: 0,
        monthsToAdd: 0,
        yearsToAdd: 0,
      },
    },
    {
      id: "sixMonths",
      icon: "🗓️",
      values: {
        calculationType: "addSubtract",
        operation: "add",
        daysToAdd: 0,
        weeksToAdd: 0,
        monthsToAdd: 6,
        yearsToAdd: 0,
      },
    },
    {
      id: "oneYear",
      icon: "🎂",
      values: {
        calculationType: "addSubtract",
        operation: "add",
        daysToAdd: 0,
        weeksToAdd: 0,
        monthsToAdd: 0,
        yearsToAdd: 1,
      },
    },
  ],

  // ===========================================================================
  // TRANSLATIONS - English only (script translates later)
  // ===========================================================================
  t: {
    en: {
      name: "Date Calculator",
      slug: "date",
      subtitle:
        "Add or subtract days, weeks, months, years from any date. Calculate the difference between two dates instantly.",
      breadcrumb: "Date",

      // SEO: title 50-60 chars, description 120-155 chars, keywords 5-8
      seo: {
        title: "Date Calculator - Add & Subtract Days, Months, Years",
        description:
          "Calculate dates easily. Add or subtract days, weeks, months, years from any date. Find days between two dates with business day options.",
        shortDescription: "Add or subtract time from any date",
        keywords: [
          "date calculator",
          "add days to date",
          "subtract days from date",
          "days between dates",
          "date difference calculator",
          "business days calculator",
          "date calculator online",
          "free date calculator",
        ],
      },

      calculator: { yourInformation: "Date Settings" },
      ui: {
        yourInformation: "Date Settings",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        calculationType: {
          label: "Calculation Type",
          helpText: "Choose what you want to calculate",
          options: {
            addSubtract: "Add/Subtract from Date",
            difference: "Days Between Two Dates",
          },
        },
        startDate: {
          label: "Start Date",
          helpText: "Select the starting date",
        },
        endDate: {
          label: "End Date",
          helpText: "Select the ending date",
        },
        operation: {
          label: "Operation",
          helpText: "Add or subtract time",
          options: {
            add: "Add",
            subtract: "Subtract",
          },
        },
        daysToAdd: {
          label: "Days",
          helpText: "Number of days to add or subtract",
        },
        weeksToAdd: {
          label: "Weeks",
          helpText: "Number of weeks to add or subtract",
        },
        monthsToAdd: {
          label: "Months",
          helpText: "Number of months to add or subtract",
        },
        yearsToAdd: {
          label: "Years",
          helpText: "Number of years to add or subtract",
        },
        includeEndDate: {
          label: "Include End Date",
          helpText: "Count the end date in the total",
          options: {
            yes: "Yes",
            no: "No",
          },
        },
      },

      results: {
        resultDate: { label: "Result Date" },
        totalDays: { label: "Total Days" },
        totalWeeks: { label: "Total Weeks" },
        totalMonths: { label: "Total Months" },
        businessDays: { label: "Business Days" },
        weekendDays: { label: "Weekend Days" },
      },

      presets: {
        thirtyDays: {
          label: "+30 Days",
          description: "Add 30 days to today",
        },
        ninetyDays: {
          label: "+90 Days",
          description: "Add 90 days (quarter)",
        },
        sixMonths: {
          label: "+6 Months",
          description: "Add 6 months to date",
        },
        oneYear: {
          label: "+1 Year",
          description: "Add 1 year to date",
        },
      },

      // CRITICAL: All units/labels for calculate() - NO HARDCODING
      values: {
        "locale": "en-US",
        "days": "days",
        "day": "day",
        "weeks": "weeks",
        "week": "week",
        "months": "months",
        "month": "month",
        "years": "years",
        "year": "year",
        "businessDays": "business days",
        "weekendDays": "weekend days",
        "weekLabel": "Week",
        "and": "and",
      },

      formats: {
        summary: "{date}",
        difference: "{days} days between dates",
        dateResult: "Result: {date}",
      },

      // INFO CARDS: 2 list + 1 horizontal tips (tips ALWAYS last)
      infoCards: {
        dateResult: {
          title: "Date Result",
          items: [
            { label: "Result Date", valueKey: "resultDate" },
            { label: "Day of Week", valueKey: "dayOfWeek" },
            { label: "Week Number", valueKey: "weekNumber" },
            { label: "Quarter", valueKey: "quarter" },
          ],
        },
        breakdown: {
          title: "Time Breakdown",
          items: [
            { label: "Total Days", valueKey: "totalDays" },
            { label: "Business Days", valueKey: "businessDays" },
            { label: "Weekend Days", valueKey: "weekendDays" },
            { label: "Total Weeks", valueKey: "totalWeeks" },
          ],
        },
        tips: {
          title: "Quick Tips",
          items: [
            "Business days exclude Saturdays and Sundays",
            "Leap years have 366 days (Feb 29)",
            "Adding months keeps the same day when possible",
            "Use negative values to subtract time",
          ],
        },
      },

      // EDUCATION: 2 prose + 2 list + 1 code-example
      education: {
        whatIs: {
          title: "What is a Date Calculator?",
          content:
            "A date calculator is a tool that performs arithmetic operations on calendar dates. It can add or subtract days, weeks, months, and years to find future or past dates, or calculate the difference between two dates. Unlike simple counting, date calculators handle the complexities of our calendar system — varying month lengths (28-31 days), leap years every four years, and the transition between months and years. Whether you're planning project deadlines, calculating contract terms, or simply wondering what date it will be in 90 days, a date calculator provides instant, accurate answers.",
        },
        howItWorks: {
          title: "How Date Calculations Work",
          content:
            "Date calculations follow the rules of the Gregorian calendar, which we use today. When adding months, the calculator moves forward by that many months while keeping the same day number (if possible). For example, January 31 + 1 month = February 28 (or 29 in leap years), since February doesn't have 31 days. When adding days, it simply counts forward through the calendar, accounting for different month lengths. Leap years occur every 4 years (except century years not divisible by 400), adding February 29. Business day calculations exclude weekends and can optionally exclude holidays.",
        },
        useCases: {
          title: "Common Use Cases",
          items: [
            { text: "Project deadlines: Add business days to a start date", type: "info" },
            { text: "Contract terms: Calculate 30, 60, or 90 days from signing", type: "info" },
            { text: "Warranty expiration: Add 1-2 years to purchase date", type: "info" },
            { text: "Age calculation: Days between birth date and today", type: "info" },
            { text: "Event planning: Count days until a specific date", type: "warning" },
            { text: "Medical tracking: Calculate days since last appointment", type: "warning" },
          ],
        },
        calendarFacts: {
          title: "Calendar Facts",
          items: [
            { text: "A year has 365 days (366 in leap years)", type: "info" },
            { text: "Months have 28, 29, 30, or 31 days", type: "info" },
            { text: "A week always has 7 days", type: "info" },
            { text: "Leap years: divisible by 4, except century years unless divisible by 400", type: "info" },
            { text: "Business days typically exclude Saturday and Sunday", type: "info" },
            { text: "ISO week 1 contains January 4th", type: "info" },
          ],
        },
        examples: {
          title: "Step-by-Step Examples",
          description: "Common date calculations explained",
          examples: [
            {
              title: "Add 90 days to March 15, 2024",
              steps: [
                "March has 31 days, so 31-15 = 16 days left",
                "April has 30 days: 16+30 = 46 days",
                "May has 31 days: 46+31 = 77 days",
                "June needs 90-77 = 13 more days",
              ],
              result: "June 13, 2024",
            },
            {
              title: "Days between Jan 1 and Mar 15, 2024",
              steps: [
                "January: 31 days (minus Jan 1 = 30)",
                "February 2024 (leap year): 29 days",
                "March 1-15: 15 days",
                "Total: 30 + 29 + 15 = 74 days",
              ],
              result: "74 days",
            },
          ],
        },
      },

      // FAQs: 6+ required
      faqs: [
        {
          question: "How do I calculate a date 30 days from now?",
          answer:
            "Select 'Add/Subtract from Date', choose today as your start date, select 'Add', enter 30 in the Days field, and click Calculate. The result will show the date exactly 30 days in the future.",
        },
        {
          question: "How do I find the number of days between two dates?",
          answer:
            "Select 'Days Between Two Dates' as the calculation type, enter your start date and end date, then click Calculate. You'll see the total days, weeks, and business days between the dates.",
        },
        {
          question: "What are business days?",
          answer:
            "Business days (also called working days or weekdays) are Monday through Friday, excluding Saturday and Sunday. Some calculations also exclude public holidays. Business day counts are commonly used for shipping estimates, contract terms, and project planning.",
        },
        {
          question: "How does adding months work when the day doesn't exist?",
          answer:
            "When adding months would result in an invalid date (like January 31 + 1 month), the calculator uses the last valid day of that month. So January 31 + 1 month = February 28 (or 29 in leap years).",
        },
        {
          question: "What is a leap year and how does it affect calculations?",
          answer:
            "A leap year has 366 days instead of 365, with February having 29 days instead of 28. Leap years occur every 4 years, except for century years (1900, 2100) unless divisible by 400 (2000, 2400). The calculator automatically handles leap years.",
        },
        {
          question: "How do I subtract time from a date?",
          answer:
            "Select 'Add/Subtract from Date', choose your start date, select 'Subtract' as the operation, enter the days/weeks/months/years you want to subtract, and click Calculate. The result shows the past date.",
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

      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: {
        mobileResults: "Results",
        closeModal: "Close",
        openMenu: "Menu",
      },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de Fechas",
      "slug": "calculadora-fechas",
      "subtitle": "Suma o resta días, semanas, meses, años a cualquier fecha. Calcula la diferencia entre dos fechas al instante.",
      "breadcrumb": "Fechas",
      "seo": {
        "title": "Calculadora de Fechas - Sumar y Restar Días, Meses, Años",
        "description": "Calcula fechas fácilmente. Suma o resta días, semanas, meses, años a cualquier fecha. Encuentra días entre dos fechas con opciones laborales.",
        "shortDescription": "Suma o resta tiempo a cualquier fecha",
        "keywords": [
          "calculadora de fechas",
          "sumar días a fecha",
          "restar días de fecha",
          "días entre fechas",
          "calculadora diferencia fechas",
          "calculadora días laborales",
          "calculadora fechas online",
          "calculadora fechas gratis"
        ]
      },
      "inputs": {
        "calculationType": {
          "label": "Tipo de Cálculo",
          "helpText": "Elige qué quieres calcular",
          "options": {
            "addSubtract": "Sumar/Restar a una Fecha",
            "difference": "Días Entre Dos Fechas"
          }
        },
        "startDate": {
          "label": "Fecha Inicial",
          "helpText": "Selecciona la fecha de inicio"
        },
        "endDate": {
          "label": "Fecha Final",
          "helpText": "Selecciona la fecha final"
        },
        "operation": {
          "label": "Operación",
          "helpText": "Sumar o restar tiempo",
          "options": {
            "add": "Sumar",
            "subtract": "Restar"
          }
        },
        "daysToAdd": {
          "label": "Días",
          "helpText": "Número de días a sumar o restar"
        },
        "weeksToAdd": {
          "label": "Semanas",
          "helpText": "Número de semanas a sumar o restar"
        },
        "monthsToAdd": {
          "label": "Meses",
          "helpText": "Número de meses a sumar o restar"
        },
        "yearsToAdd": {
          "label": "Años",
          "helpText": "Número de años a sumar o restar"
        },
        "includeEndDate": {
          "label": "Incluir Fecha Final",
          "helpText": "Contar la fecha final en el total",
          "options": {
            "yes": "Sí",
            "no": "No"
          }
        }
      },
      "results": {
        "resultDate": {
          "label": "Fecha Resultado"
        },
        "totalDays": {
          "label": "Días Totales"
        },
        "totalWeeks": {
          "label": "Semanas Totales"
        },
        "totalMonths": {
          "label": "Meses Totales"
        },
        "businessDays": {
          "label": "Días Laborales"
        },
        "weekendDays": {
          "label": "Días de Fin de Semana"
        }
      },
      "presets": {
        "thirtyDays": {
          "label": "+30 Días",
          "description": "Sumar 30 días a hoy"
        },
        "ninetyDays": {
          "label": "+90 Días",
          "description": "Sumar 90 días (trimestre)"
        },
        "sixMonths": {
          "label": "+6 Meses",
          "description": "Sumar 6 meses a la fecha"
        },
        "oneYear": {
          "label": "+1 Año",
          "description": "Sumar 1 año a la fecha"
        }
      },
      "values": {
        "locale": "es-ES",
        "days": "días",
        "day": "día",
        "weeks": "semanas",
        "week": "semana",
        "months": "meses",
        "month": "mes",
        "years": "años",
        "year": "año",
        "businessDays": "días laborales",
        "weekendDays": "días de fin de semana",
        "weekLabel": "Semana",
        "and": "y"
      },
      "formats": {
        "summary": "{date}",
        "difference": "{days} días entre fechas",
        "dateResult": "Resultado: {date}"
      },
      "infoCards": {
        "dateResult": {
          "title": "Resultado de Fecha",
          "items": [
            {
              "label": "Fecha Resultado",
              "valueKey": "resultDate"
            },
            {
              "label": "Día de la Semana",
              "valueKey": "dayOfWeek"
            },
            {
              "label": "Número de Semana",
              "valueKey": "weekNumber"
            },
            {
              "label": "Trimestre",
              "valueKey": "quarter"
            }
          ]
        },
        "breakdown": {
          "title": "Desglose de Tiempo",
          "items": [
            {
              "label": "Días Totales",
              "valueKey": "totalDays"
            },
            {
              "label": "Días Laborales",
              "valueKey": "businessDays"
            },
            {
              "label": "Días de Fin de Semana",
              "valueKey": "weekendDays"
            },
            {
              "label": "Semanas Totales",
              "valueKey": "totalWeeks"
            }
          ]
        },
        "tips": {
          "title": "Consejos Rápidos",
          "items": [
            "Los días laborales excluyen sábados y domingos",
            "Los años bisiestos tienen 366 días (29 de febrero)",
            "Sumar meses mantiene el mismo día cuando es posible",
            "Usa valores negativos para restar tiempo"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es una Calculadora de Fechas?",
          "content": "Una calculadora de fechas es una herramienta que realiza operaciones aritméticas en fechas del calendario. Puede sumar o restar días, semanas, meses y años para encontrar fechas futuras o pasadas, o calcular la diferencia entre dos fechas. A diferencia del conteo simple, las calculadoras de fechas manejan las complejidades de nuestro sistema de calendario: longitudes de mes variables (28-31 días), años bisiestos cada cuatro años, y la transición entre meses y años. Ya sea planificando plazos de proyectos, calculando términos de contratos, o simplemente preguntándose qué fecha será en 90 días, una calculadora de fechas proporciona respuestas instantáneas y precisas."
        },
        "howItWorks": {
          "title": "Cómo Funcionan los Cálculos de Fechas",
          "content": "Los cálculos de fechas siguen las reglas del calendario gregoriano, que usamos hoy. Al sumar meses, la calculadora avanza esa cantidad de meses manteniendo el mismo número de día (si es posible). Por ejemplo, 31 de enero + 1 mes = 28 de febrero (o 29 en años bisiestos), ya que febrero no tiene 31 días. Al sumar días, simplemente cuenta hacia adelante a través del calendario, considerando las diferentes longitudes de mes. Los años bisiestos ocurren cada 4 años (excepto años de siglo no divisibles por 400), agregando el 29 de febrero. Los cálculos de días laborales excluyen fines de semana y opcionalmente pueden excluir feriados."
        },
        "useCases": {
          "title": "Casos de Uso Comunes",
          "items": [
            {
              "text": "Plazos de proyectos: Sumar días laborales a una fecha de inicio",
              "type": "info"
            },
            {
              "text": "Términos de contrato: Calcular 30, 60 o 90 días desde la firma",
              "type": "info"
            },
            {
              "text": "Vencimiento de garantía: Sumar 1-2 años a la fecha de compra",
              "type": "info"
            },
            {
              "text": "Cálculo de edad: Días entre fecha de nacimiento y hoy",
              "type": "info"
            },
            {
              "text": "Planificación de eventos: Contar días hasta una fecha específica",
              "type": "warning"
            },
            {
              "text": "Seguimiento médico: Calcular días desde la última cita",
              "type": "warning"
            }
          ]
        },
        "calendarFacts": {
          "title": "Datos del Calendario",
          "items": [
            {
              "text": "Un año tiene 365 días (366 en años bisiestos)",
              "type": "info"
            },
            {
              "text": "Los meses tienen 28, 29, 30 o 31 días",
              "type": "info"
            },
            {
              "text": "Una semana siempre tiene 7 días",
              "type": "info"
            },
            {
              "text": "Años bisiestos: divisibles por 4, excepto años de siglo a menos que sean divisibles por 400",
              "type": "info"
            },
            {
              "text": "Los días laborales típicamente excluyen sábado y domingo",
              "type": "info"
            },
            {
              "text": "La semana 1 ISO contiene el 4 de enero",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos Paso a Paso",
          "description": "Cálculos de fechas comunes explicados",
          "examples": [
            {
              "title": "Sumar 90 días al 15 de marzo de 2024",
              "steps": [
                "Marzo tiene 31 días, entonces 31-15 = 16 días restantes",
                "Abril tiene 30 días: 16+30 = 46 días",
                "Mayo tiene 31 días: 46+31 = 77 días",
                "Junio necesita 90-77 = 13 días más"
              ],
              "result": "13 de junio de 2024"
            },
            {
              "title": "Días entre 1 de enero y 15 de marzo de 2024",
              "steps": [
                "Enero: 31 días (menos 1 de enero = 30)",
                "Febrero 2024 (año bisiesto): 29 días",
                "Marzo 1-15: 15 días",
                "Total: 30 + 29 + 15 = 74 días"
              ],
              "result": "74 días"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cómo calculo una fecha 30 días desde ahora?",
          "answer": "Selecciona 'Sumar/Restar a una Fecha', elige hoy como fecha inicial, selecciona 'Sumar', ingresa 30 en el campo Días, y haz clic en Calcular. El resultado mostrará la fecha exactamente 30 días en el futuro."
        },
        {
          "question": "¿Cómo encuentro el número de días entre dos fechas?",
          "answer": "Selecciona 'Días Entre Dos Fechas' como tipo de cálculo, ingresa tu fecha inicial y fecha final, luego haz clic en Calcular. Verás los días totales, semanas y días laborales entre las fechas."
        },
        {
          "question": "¿Qué son los días laborales?",
          "answer": "Los días laborales (también llamados días hábiles) son de lunes a viernes, excluyendo sábado y domingo. Algunos cálculos también excluyen feriados públicos. Los conteos de días laborales se usan comúnmente para estimaciones de envío, términos de contrato y planificación de proyectos."
        },
        {
          "question": "¿Cómo funciona sumar meses cuando el día no existe?",
          "answer": "Cuando sumar meses resultaría en una fecha inválida (como 31 de enero + 1 mes), la calculadora usa el último día válido de ese mes. Entonces 31 de enero + 1 mes = 28 de febrero (o 29 en años bisiestos)."
        },
        {
          "question": "¿Qué es un año bisiesto y cómo afecta los cálculos?",
          "answer": "Un año bisiesto tiene 366 días en lugar de 365, con febrero teniendo 29 días en lugar de 28. Los años bisiestos ocurren cada 4 años, excepto para años de siglo (1900, 2100) a menos que sean divisibles por 400 (2000, 2400). La calculadora maneja automáticamente los años bisiestos."
        },
        {
          "question": "¿Cómo resto tiempo de una fecha?",
          "answer": "Selecciona 'Sumar/Restar a una Fecha', elige tu fecha inicial, selecciona 'Restar' como operación, ingresa los días/semanas/meses/años que quieres restar, y haz clic en Calcular. El resultado muestra la fecha pasada."
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
      "name": "Calculadora de Datas",
      "slug": "calculadora-datas",
      "subtitle": "Adicionar ou subtrair dias, semanas, meses, anos de qualquer data. Calcular a diferença entre duas datas instantaneamente.",
      "breadcrumb": "Datas",
      "seo": {
        "title": "Calculadora de Datas - Adicionar e Subtrair Dias, Meses, Anos",
        "description": "Calcule datas facilmente. Adicione ou subtraia dias, semanas, meses, anos de qualquer data. Encontre dias entre duas datas com opções de dias úteis.",
        "shortDescription": "Adicionar ou subtrair tempo de qualquer data",
        "keywords": [
          "calculadora de datas",
          "adicionar dias à data",
          "subtrair dias da data",
          "dias entre datas",
          "calculadora diferença de datas",
          "calculadora dias úteis",
          "calculadora de datas online",
          "calculadora de datas grátis"
        ]
      },
      "inputs": {
        "calculationType": {
          "label": "Tipo de Cálculo",
          "helpText": "Escolha o que você quer calcular",
          "options": {
            "addSubtract": "Adicionar/Subtrair da Data",
            "difference": "Dias Entre Duas Datas"
          }
        },
        "startDate": {
          "label": "Data Inicial",
          "helpText": "Selecione a data inicial"
        },
        "endDate": {
          "label": "Data Final",
          "helpText": "Selecione a data final"
        },
        "operation": {
          "label": "Operação",
          "helpText": "Adicionar ou subtrair tempo",
          "options": {
            "add": "Adicionar",
            "subtract": "Subtrair"
          }
        },
        "daysToAdd": {
          "label": "Dias",
          "helpText": "Número de dias para adicionar ou subtrair"
        },
        "weeksToAdd": {
          "label": "Semanas",
          "helpText": "Número de semanas para adicionar ou subtrair"
        },
        "monthsToAdd": {
          "label": "Meses",
          "helpText": "Número de meses para adicionar ou subtrair"
        },
        "yearsToAdd": {
          "label": "Anos",
          "helpText": "Número de anos para adicionar ou subtrair"
        },
        "includeEndDate": {
          "label": "Incluir Data Final",
          "helpText": "Contar a data final no total",
          "options": {
            "yes": "Sim",
            "no": "Não"
          }
        }
      },
      "results": {
        "resultDate": {
          "label": "Data Resultado"
        },
        "totalDays": {
          "label": "Total de Dias"
        },
        "totalWeeks": {
          "label": "Total de Semanas"
        },
        "totalMonths": {
          "label": "Total de Meses"
        },
        "businessDays": {
          "label": "Dias Úteis"
        },
        "weekendDays": {
          "label": "Dias de Fim de Semana"
        }
      },
      "presets": {
        "thirtyDays": {
          "label": "+30 Dias",
          "description": "Adicionar 30 dias a hoje"
        },
        "ninetyDays": {
          "label": "+90 Dias",
          "description": "Adicionar 90 dias (trimestre)"
        },
        "sixMonths": {
          "label": "+6 Meses",
          "description": "Adicionar 6 meses à data"
        },
        "oneYear": {
          "label": "+1 Ano",
          "description": "Adicionar 1 ano à data"
        }
      },
      "values": {
        "locale": "pt-BR",
        "days": "dias",
        "day": "dia",
        "weeks": "semanas",
        "week": "semana",
        "months": "meses",
        "month": "mês",
        "years": "anos",
        "year": "ano",
        "businessDays": "dias úteis",
        "weekendDays": "dias de fim de semana",
        "weekLabel": "Semana",
        "and": "e"
      },
      "formats": {
        "summary": "{date}",
        "difference": "{days} dias entre datas",
        "dateResult": "Resultado: {date}"
      },
      "infoCards": {
        "dateResult": {
          "title": "Resultado da Data",
          "items": [
            {
              "label": "Data Resultado",
              "valueKey": "resultDate"
            },
            {
              "label": "Dia da Semana",
              "valueKey": "dayOfWeek"
            },
            {
              "label": "Número da Semana",
              "valueKey": "weekNumber"
            },
            {
              "label": "Trimestre",
              "valueKey": "quarter"
            }
          ]
        },
        "breakdown": {
          "title": "Detalhamento do Tempo",
          "items": [
            {
              "label": "Total de Dias",
              "valueKey": "totalDays"
            },
            {
              "label": "Dias Úteis",
              "valueKey": "businessDays"
            },
            {
              "label": "Dias de Fim de Semana",
              "valueKey": "weekendDays"
            },
            {
              "label": "Total de Semanas",
              "valueKey": "totalWeeks"
            }
          ]
        },
        "tips": {
          "title": "Dicas Rápidas",
          "items": [
            "Dias úteis excluem sábados e domingos",
            "Anos bissextos têm 366 dias (29 de fevereiro)",
            "Adicionar meses mantém o mesmo dia quando possível",
            "Use valores negativos para subtrair tempo"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Calculadora de Datas?",
          "content": "Uma calculadora de datas é uma ferramenta que realiza operações aritméticas em datas do calendário. Ela pode adicionar ou subtrair dias, semanas, meses e anos para encontrar datas futuras ou passadas, ou calcular a diferença entre duas datas. Ao contrário da contagem simples, as calculadoras de datas lidam com as complexidades do nosso sistema de calendário — durações variáveis de meses (28-31 dias), anos bissextos a cada quatro anos, e a transição entre meses e anos. Se você está planejando prazos de projeto, calculando termos de contrato, ou simplesmente se perguntando que data será em 90 dias, uma calculadora de datas fornece respostas instantâneas e precisas."
        },
        "howItWorks": {
          "title": "Como Funcionam os Cálculos de Data",
          "content": "Os cálculos de data seguem as regras do calendário gregoriano, que usamos hoje. Ao adicionar meses, a calculadora avança por essa quantidade de meses mantendo o mesmo número do dia (se possível). Por exemplo, 31 de janeiro + 1 mês = 28 de fevereiro (ou 29 em anos bissextos), já que fevereiro não tem 31 dias. Ao adicionar dias, ela simplesmente conta através do calendário, considerando diferentes durações de meses. Anos bissextos ocorrem a cada 4 anos (exceto anos centenários não divisíveis por 400), adicionando 29 de fevereiro. Cálculos de dias úteis excluem fins de semana e podem opcionalmente excluir feriados."
        },
        "useCases": {
          "title": "Casos de Uso Comuns",
          "items": [
            {
              "text": "Prazos de projeto: Adicionar dias úteis a uma data inicial",
              "type": "info"
            },
            {
              "text": "Termos de contrato: Calcular 30, 60 ou 90 dias da assinatura",
              "type": "info"
            },
            {
              "text": "Expiração de garantia: Adicionar 1-2 anos à data de compra",
              "type": "info"
            },
            {
              "text": "Cálculo de idade: Dias entre data de nascimento e hoje",
              "type": "info"
            },
            {
              "text": "Planejamento de eventos: Contar dias até uma data específica",
              "type": "warning"
            },
            {
              "text": "Acompanhamento médico: Calcular dias desde a última consulta",
              "type": "warning"
            }
          ]
        },
        "calendarFacts": {
          "title": "Fatos sobre Calendário",
          "items": [
            {
              "text": "Um ano tem 365 dias (366 em anos bissextos)",
              "type": "info"
            },
            {
              "text": "Meses têm 28, 29, 30 ou 31 dias",
              "type": "info"
            },
            {
              "text": "Uma semana sempre tem 7 dias",
              "type": "info"
            },
            {
              "text": "Anos bissextos: divisíveis por 4, exceto anos centenários a menos que divisíveis por 400",
              "type": "info"
            },
            {
              "text": "Dias úteis tipicamente excluem sábado e domingo",
              "type": "info"
            },
            {
              "text": "Semana ISO 1 contém 4 de janeiro",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos Passo a Passo",
          "description": "Cálculos de data comuns explicados",
          "examples": [
            {
              "title": "Adicionar 90 dias a 15 de março de 2024",
              "steps": [
                "Março tem 31 dias, então 31-15 = 16 dias restantes",
                "Abril tem 30 dias: 16+30 = 46 dias",
                "Maio tem 31 dias: 46+31 = 77 dias",
                "Junho precisa de 90-77 = 13 dias a mais"
              ],
              "result": "13 de junho de 2024"
            },
            {
              "title": "Dias entre 1º jan e 15 mar de 2024",
              "steps": [
                "Janeiro: 31 dias (menos 1º jan = 30)",
                "Fevereiro 2024 (ano bissexto): 29 dias",
                "Março 1-15: 15 dias",
                "Total: 30 + 29 + 15 = 74 dias"
              ],
              "result": "74 dias"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Como calcular uma data 30 dias a partir de agora?",
          "answer": "Selecione 'Adicionar/Subtrair da Data', escolha hoje como sua data inicial, selecione 'Adicionar', digite 30 no campo Dias, e clique em Calcular. O resultado mostrará a data exatamente 30 dias no futuro."
        },
        {
          "question": "Como encontrar o número de dias entre duas datas?",
          "answer": "Selecione 'Dias Entre Duas Datas' como tipo de cálculo, digite sua data inicial e data final, então clique em Calcular. Você verá o total de dias, semanas e dias úteis entre as datas."
        },
        {
          "question": "O que são dias úteis?",
          "answer": "Dias úteis (também chamados de dias de trabalho ou dias da semana) são de segunda a sexta-feira, excluindo sábado e domingo. Alguns cálculos também excluem feriados públicos. Contagens de dias úteis são comumente usadas para estimativas de entrega, termos de contrato e planejamento de projetos."
        },
        {
          "question": "Como funciona adicionar meses quando o dia não existe?",
          "answer": "Quando adicionar meses resultaria em uma data inválida (como 31 de janeiro + 1 mês), a calculadora usa o último dia válido daquele mês. Então 31 de janeiro + 1 mês = 28 de fevereiro (ou 29 em anos bissextos)."
        },
        {
          "question": "O que é um ano bissexto e como afeta os cálculos?",
          "answer": "Um ano bissexto tem 366 dias em vez de 365, com fevereiro tendo 29 dias em vez de 28. Anos bissextos ocorrem a cada 4 anos, exceto para anos centenários (1900, 2100) a menos que sejam divisíveis por 400 (2000, 2400). A calculadora lida automaticamente com anos bissextos."
        },
        {
          "question": "Como subtrair tempo de uma data?",
          "answer": "Selecione 'Adicionar/Subtrair da Data', escolha sua data inicial, selecione 'Subtrair' como operação, digite os dias/semanas/meses/anos que quer subtrair, e clique em Calcular. O resultado mostra a data passada."
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
      "name": "Calculateur de Date",
      "slug": "calculateur-date",
      "subtitle": "Ajoutez ou soustrayez des jours, semaines, mois, années à n'importe quelle date. Calculez la différence entre deux dates instantanément.",
      "breadcrumb": "Date",
      "seo": {
        "title": "Calculateur de Date - Ajouter & Soustraire Jours, Mois, Années",
        "description": "Calculez les dates facilement. Ajoutez ou soustrayez des jours, semaines, mois, années à n'importe quelle date. Trouvez les jours entre deux dates avec options de jours ouvrables.",
        "shortDescription": "Ajoutez ou soustrayez du temps à n'importe quelle date",
        "keywords": [
          "calculateur de date",
          "ajouter jours à date",
          "soustraire jours de date",
          "jours entre dates",
          "calculateur différence de date",
          "calculateur jours ouvrables",
          "calculateur de date en ligne",
          "calculateur de date gratuit"
        ]
      },
      "inputs": {
        "calculationType": {
          "label": "Type de Calcul",
          "helpText": "Choisissez ce que vous voulez calculer",
          "options": {
            "addSubtract": "Ajouter/Soustraire d'une Date",
            "difference": "Jours Entre Deux Dates"
          }
        },
        "startDate": {
          "label": "Date de Début",
          "helpText": "Sélectionnez la date de départ"
        },
        "endDate": {
          "label": "Date de Fin",
          "helpText": "Sélectionnez la date de fin"
        },
        "operation": {
          "label": "Opération",
          "helpText": "Ajouter ou soustraire du temps",
          "options": {
            "add": "Ajouter",
            "subtract": "Soustraire"
          }
        },
        "daysToAdd": {
          "label": "Jours",
          "helpText": "Nombre de jours à ajouter ou soustraire"
        },
        "weeksToAdd": {
          "label": "Semaines",
          "helpText": "Nombre de semaines à ajouter ou soustraire"
        },
        "monthsToAdd": {
          "label": "Mois",
          "helpText": "Nombre de mois à ajouter ou soustraire"
        },
        "yearsToAdd": {
          "label": "Années",
          "helpText": "Nombre d'années à ajouter ou soustraire"
        },
        "includeEndDate": {
          "label": "Inclure la Date de Fin",
          "helpText": "Compter la date de fin dans le total",
          "options": {
            "yes": "Oui",
            "no": "Non"
          }
        }
      },
      "results": {
        "resultDate": {
          "label": "Date Résultante"
        },
        "totalDays": {
          "label": "Total Jours"
        },
        "totalWeeks": {
          "label": "Total Semaines"
        },
        "totalMonths": {
          "label": "Total Mois"
        },
        "businessDays": {
          "label": "Jours Ouvrables"
        },
        "weekendDays": {
          "label": "Jours de Week-end"
        }
      },
      "presets": {
        "thirtyDays": {
          "label": "+30 Jours",
          "description": "Ajouter 30 jours à aujourd'hui"
        },
        "ninetyDays": {
          "label": "+90 Jours",
          "description": "Ajouter 90 jours (trimestre)"
        },
        "sixMonths": {
          "label": "+6 Mois",
          "description": "Ajouter 6 mois à la date"
        },
        "oneYear": {
          "label": "+1 An",
          "description": "Ajouter 1 an à la date"
        }
      },
      "values": {
        "locale": "fr-FR",
        "days": "jours",
        "day": "jour",
        "weeks": "semaines",
        "week": "semaine",
        "months": "mois",
        "month": "mois",
        "years": "années",
        "year": "année",
        "businessDays": "jours ouvrables",
        "weekendDays": "jours de week-end",
        "weekLabel": "Semaine",
        "and": "et"
      },
      "formats": {
        "summary": "{date}",
        "difference": "{days} jours entre les dates",
        "dateResult": "Résultat : {date}"
      },
      "infoCards": {
        "dateResult": {
          "title": "Résultat de Date",
          "items": [
            {
              "label": "Date Résultante",
              "valueKey": "resultDate"
            },
            {
              "label": "Jour de la Semaine",
              "valueKey": "dayOfWeek"
            },
            {
              "label": "Numéro de Semaine",
              "valueKey": "weekNumber"
            },
            {
              "label": "Trimestre",
              "valueKey": "quarter"
            }
          ]
        },
        "breakdown": {
          "title": "Détail Temporel",
          "items": [
            {
              "label": "Total Jours",
              "valueKey": "totalDays"
            },
            {
              "label": "Jours Ouvrables",
              "valueKey": "businessDays"
            },
            {
              "label": "Jours de Week-end",
              "valueKey": "weekendDays"
            },
            {
              "label": "Total Semaines",
              "valueKey": "totalWeeks"
            }
          ]
        },
        "tips": {
          "title": "Conseils Rapides",
          "items": [
            "Les jours ouvrables excluent les samedis et dimanches",
            "Les années bissextiles ont 366 jours (29 février)",
            "Ajouter des mois conserve le même jour quand c'est possible",
            "Utilisez des valeurs négatives pour soustraire du temps"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Calculateur de Date ?",
          "content": "Un calculateur de date est un outil qui effectue des opérations arithmétiques sur les dates du calendrier. Il peut ajouter ou soustraire des jours, semaines, mois et années pour trouver des dates futures ou passées, ou calculer la différence entre deux dates. Contrairement au simple comptage, les calculateurs de date gèrent les complexités de notre système calendaire — les longueurs variables des mois (28-31 jours), les années bissextiles tous les quatre ans, et la transition entre mois et années. Que vous planifiiez des échéances de projet, calculiez des termes de contrat, ou vous demandiez simplement quelle date ce sera dans 90 jours, un calculateur de date fournit des réponses instantanées et précises."
        },
        "howItWorks": {
          "title": "Comment Fonctionnent les Calculs de Date",
          "content": "Les calculs de date suivent les règles du calendrier grégorien, que nous utilisons aujourd'hui. Lors de l'ajout de mois, le calculateur avance de ce nombre de mois tout en gardant le même numéro de jour (si possible). Par exemple, 31 janvier + 1 mois = 28 février (ou 29 en années bissextiles), puisque février n'a pas 31 jours. Lors de l'ajout de jours, il compte simplement à travers le calendrier, tenant compte des différentes longueurs de mois. Les années bissextiles surviennent tous les 4 ans (sauf les années de siècle non divisibles par 400), ajoutant le 29 février. Les calculs de jours ouvrables excluent les week-ends et peuvent optionnellement exclure les jours fériés."
        },
        "useCases": {
          "title": "Cas d'Usage Courants",
          "items": [
            {
              "text": "Échéances de projet : Ajouter des jours ouvrables à une date de début",
              "type": "info"
            },
            {
              "text": "Termes de contrat : Calculer 30, 60 ou 90 jours depuis la signature",
              "type": "info"
            },
            {
              "text": "Expiration de garantie : Ajouter 1-2 ans à la date d'achat",
              "type": "info"
            },
            {
              "text": "Calcul d'âge : Jours entre date de naissance et aujourd'hui",
              "type": "info"
            },
            {
              "text": "Planification d'événement : Compter les jours jusqu'à une date spécifique",
              "type": "warning"
            },
            {
              "text": "Suivi médical : Calculer les jours depuis le dernier rendez-vous",
              "type": "warning"
            }
          ]
        },
        "calendarFacts": {
          "title": "Faits sur le Calendrier",
          "items": [
            {
              "text": "Une année a 365 jours (366 en années bissextiles)",
              "type": "info"
            },
            {
              "text": "Les mois ont 28, 29, 30 ou 31 jours",
              "type": "info"
            },
            {
              "text": "Une semaine a toujours 7 jours",
              "type": "info"
            },
            {
              "text": "Années bissextiles : divisibles par 4, sauf les années de siècle sauf si divisibles par 400",
              "type": "info"
            },
            {
              "text": "Les jours ouvrables excluent typiquement samedi et dimanche",
              "type": "info"
            },
            {
              "text": "La semaine ISO 1 contient le 4 janvier",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples Étape par Étape",
          "description": "Calculs de date courants expliqués",
          "examples": [
            {
              "title": "Ajouter 90 jours au 15 mars 2024",
              "steps": [
                "Mars a 31 jours, donc 31-15 = 16 jours restants",
                "Avril a 30 jours : 16+30 = 46 jours",
                "Mai a 31 jours : 46+31 = 77 jours",
                "Juin nécessite 90-77 = 13 jours de plus"
              ],
              "result": "13 juin 2024"
            },
            {
              "title": "Jours entre 1er janvier et 15 mars 2024",
              "steps": [
                "Janvier : 31 jours (moins 1er jan = 30)",
                "Février 2024 (année bissextile) : 29 jours",
                "Mars 1-15 : 15 jours",
                "Total : 30 + 29 + 15 = 74 jours"
              ],
              "result": "74 jours"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Comment calculer une date dans 30 jours ?",
          "answer": "Sélectionnez 'Ajouter/Soustraire d'une Date', choisissez aujourd'hui comme date de début, sélectionnez 'Ajouter', entrez 30 dans le champ Jours, et cliquez sur Calculer. Le résultat montrera la date exactement 30 jours dans le futur."
        },
        {
          "question": "Comment trouver le nombre de jours entre deux dates ?",
          "answer": "Sélectionnez 'Jours Entre Deux Dates' comme type de calcul, entrez votre date de début et date de fin, puis cliquez sur Calculer. Vous verrez le total de jours, semaines et jours ouvrables entre les dates."
        },
        {
          "question": "Que sont les jours ouvrables ?",
          "answer": "Les jours ouvrables (aussi appelés jours de travail ou jours de semaine) sont du lundi au vendredi, excluant samedi et dimanche. Certains calculs excluent aussi les jours fériés. Les comptes de jours ouvrables sont couramment utilisés pour les estimations d'expédition, termes de contrat et planification de projet."
        },
        {
          "question": "Comment fonctionne l'ajout de mois quand le jour n'existe pas ?",
          "answer": "Quand ajouter des mois résulterait en une date invalide (comme 31 janvier + 1 mois), le calculateur utilise le dernier jour valide de ce mois. Donc 31 janvier + 1 mois = 28 février (ou 29 en années bissextiles)."
        },
        {
          "question": "Qu'est-ce qu'une année bissextile et comment affecte-t-elle les calculs ?",
          "answer": "Une année bissextile a 366 jours au lieu de 365, avec février ayant 29 jours au lieu de 28. Les années bissextiles surviennent tous les 4 ans, sauf pour les années de siècle (1900, 2100) sauf si divisibles par 400 (2000, 2400). Le calculateur gère automatiquement les années bissextiles."
        },
        {
          "question": "Comment soustraire du temps d'une date ?",
          "answer": "Sélectionnez 'Ajouter/Soustraire d'une Date', choisissez votre date de début, sélectionnez 'Soustraire' comme opération, entrez les jours/semaines/mois/années que vous voulez soustraire, et cliquez sur Calculer. Le résultat montre la date passée."
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
      "name": "Datumsrechner",
      "slug": "datumsrechner-rechner",
      "subtitle": "Addieren oder subtrahieren Sie Tage, Wochen, Monate, Jahre von jedem Datum. Berechnen Sie sofort die Differenz zwischen zwei Daten.",
      "breadcrumb": "Datumsrechner",
      "seo": {
        "title": "Datumsrechner - Tage, Monate, Jahre addieren & subtrahieren",
        "description": "Daten einfach berechnen. Addieren oder subtrahieren Sie Tage, Wochen, Monate, Jahre von jedem Datum. Finden Sie Tage zwischen zwei Daten mit Arbeitstag-Optionen.",
        "shortDescription": "Zeit zu jedem Datum addieren oder subtrahieren",
        "keywords": [
          "datumsrechner",
          "tage zu datum addieren",
          "tage vom datum subtrahieren",
          "tage zwischen daten",
          "datumsdifferenz rechner",
          "arbeitstage rechner",
          "datumsrechner online",
          "kostenloser datumsrechner"
        ]
      },
      "inputs": {
        "calculationType": {
          "label": "Berechnungstyp",
          "helpText": "Wählen Sie, was Sie berechnen möchten",
          "options": {
            "addSubtract": "Zu Datum addieren/subtrahieren",
            "difference": "Tage zwischen zwei Daten"
          }
        },
        "startDate": {
          "label": "Startdatum",
          "helpText": "Wählen Sie das Startdatum"
        },
        "endDate": {
          "label": "Enddatum",
          "helpText": "Wählen Sie das Enddatum"
        },
        "operation": {
          "label": "Operation",
          "helpText": "Zeit addieren oder subtrahieren",
          "options": {
            "add": "Addieren",
            "subtract": "Subtrahieren"
          }
        },
        "daysToAdd": {
          "label": "Tage",
          "helpText": "Anzahl der Tage zum Addieren oder Subtrahieren"
        },
        "weeksToAdd": {
          "label": "Wochen",
          "helpText": "Anzahl der Wochen zum Addieren oder Subtrahieren"
        },
        "monthsToAdd": {
          "label": "Monate",
          "helpText": "Anzahl der Monate zum Addieren oder Subtrahieren"
        },
        "yearsToAdd": {
          "label": "Jahre",
          "helpText": "Anzahl der Jahre zum Addieren oder Subtrahieren"
        },
        "includeEndDate": {
          "label": "Enddatum einschließen",
          "helpText": "Das Enddatum in die Gesamtsumme einrechnen",
          "options": {
            "yes": "Ja",
            "no": "Nein"
          }
        }
      },
      "results": {
        "resultDate": {
          "label": "Ergebnisdatum"
        },
        "totalDays": {
          "label": "Gesamttage"
        },
        "totalWeeks": {
          "label": "Gesamtwochen"
        },
        "totalMonths": {
          "label": "Gesamtmonate"
        },
        "businessDays": {
          "label": "Arbeitstage"
        },
        "weekendDays": {
          "label": "Wochenendtage"
        }
      },
      "presets": {
        "thirtyDays": {
          "label": "+30 Tage",
          "description": "30 Tage zu heute addieren"
        },
        "ninetyDays": {
          "label": "+90 Tage",
          "description": "90 Tage (Quartal) addieren"
        },
        "sixMonths": {
          "label": "+6 Monate",
          "description": "6 Monate zum Datum addieren"
        },
        "oneYear": {
          "label": "+1 Jahr",
          "description": "1 Jahr zum Datum addieren"
        }
      },
      "values": {
        "locale": "de-DE",
        "days": "Tage",
        "day": "Tag",
        "weeks": "Wochen",
        "week": "Woche",
        "months": "Monate",
        "month": "Monat",
        "years": "Jahre",
        "year": "Jahr",
        "businessDays": "Arbeitstage",
        "weekendDays": "Wochenendtage",
        "weekLabel": "Woche",
        "and": "und"
      },
      "formats": {
        "summary": "{date}",
        "difference": "{days} Tage zwischen den Daten",
        "dateResult": "Ergebnis: {date}"
      },
      "infoCards": {
        "dateResult": {
          "title": "Datumsergebnis",
          "items": [
            {
              "label": "Ergebnisdatum",
              "valueKey": "resultDate"
            },
            {
              "label": "Wochentag",
              "valueKey": "dayOfWeek"
            },
            {
              "label": "Wochennummer",
              "valueKey": "weekNumber"
            },
            {
              "label": "Quartal",
              "valueKey": "quarter"
            }
          ]
        },
        "breakdown": {
          "title": "Zeitaufschlüsselung",
          "items": [
            {
              "label": "Gesamttage",
              "valueKey": "totalDays"
            },
            {
              "label": "Arbeitstage",
              "valueKey": "businessDays"
            },
            {
              "label": "Wochenendtage",
              "valueKey": "weekendDays"
            },
            {
              "label": "Gesamtwochen",
              "valueKey": "totalWeeks"
            }
          ]
        },
        "tips": {
          "title": "Schnelle Tipps",
          "items": [
            "Arbeitstage schließen Samstag und Sonntag aus",
            "Schaltjahre haben 366 Tage (29. Februar)",
            "Das Addieren von Monaten behält wenn möglich den gleichen Tag bei",
            "Verwenden Sie negative Werte, um Zeit zu subtrahieren"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Datumsrechner?",
          "content": "Ein Datumsrechner ist ein Werkzeug, das arithmetische Operationen mit Kalenderdaten durchführt. Er kann Tage, Wochen, Monate und Jahre addieren oder subtrahieren, um zukünftige oder vergangene Daten zu finden, oder die Differenz zwischen zwei Daten berechnen. Im Gegensatz zum einfachen Zählen bewältigen Datumsrechner die Komplexitäten unseres Kalendersystems – unterschiedliche Monatslängen (28-31 Tage), Schaltjahre alle vier Jahre und den Übergang zwischen Monaten und Jahren. Ob Sie Projektfristen planen, Vertragslaufzeiten berechnen oder einfach wissen möchten, welches Datum es in 90 Tagen sein wird, ein Datumsrechner liefert sofortige, genaue Antworten."
        },
        "howItWorks": {
          "title": "Wie Datumsberechnungen funktionieren",
          "content": "Datumsberechnungen folgen den Regeln des gregorianischen Kalenders, den wir heute verwenden. Beim Addieren von Monaten bewegt sich der Rechner um so viele Monate nach vorne und behält dabei die gleiche Tagesnummer bei (wenn möglich). Zum Beispiel: 31. Januar + 1 Monat = 28. Februar (oder 29 in Schaltjahren), da der Februar keinen 31. Tag hat. Beim Addieren von Tagen zählt er einfach durch den Kalender vorwärts und berücksichtigt dabei unterschiedliche Monatslängen. Schaltjahre treten alle 4 Jahre auf (außer bei Jahrhundertjahren, die nicht durch 400 teilbar sind) und fügen den 29. Februar hinzu. Arbeitstagberechnungen schließen Wochenenden aus und können optional Feiertage ausschließen."
        },
        "useCases": {
          "title": "Häufige Anwendungsfälle",
          "items": [
            {
              "text": "Projektfristen: Arbeitstage zu einem Startdatum addieren",
              "type": "info"
            },
            {
              "text": "Vertragslaufzeiten: 30, 60 oder 90 Tage ab Unterzeichnung berechnen",
              "type": "info"
            },
            {
              "text": "Garantieablauf: 1-2 Jahre zum Kaufdatum addieren",
              "type": "info"
            },
            {
              "text": "Altersberechnung: Tage zwischen Geburtsdatum und heute",
              "type": "info"
            },
            {
              "text": "Eventplanung: Tage bis zu einem bestimmten Datum zählen",
              "type": "warning"
            },
            {
              "text": "Medizinische Verfolgung: Tage seit dem letzten Termin berechnen",
              "type": "warning"
            }
          ]
        },
        "calendarFacts": {
          "title": "Kalenderfakten",
          "items": [
            {
              "text": "Ein Jahr hat 365 Tage (366 in Schaltjahren)",
              "type": "info"
            },
            {
              "text": "Monate haben 28, 29, 30 oder 31 Tage",
              "type": "info"
            },
            {
              "text": "Eine Woche hat immer 7 Tage",
              "type": "info"
            },
            {
              "text": "Schaltjahre: durch 4 teilbar, außer Jahrhundertjahre, es sei denn durch 400 teilbar",
              "type": "info"
            },
            {
              "text": "Arbeitstage schließen normalerweise Samstag und Sonntag aus",
              "type": "info"
            },
            {
              "text": "ISO-Woche 1 enthält den 4. Januar",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Schritt-für-Schritt-Beispiele",
          "description": "Häufige Datumsberechnungen erklärt",
          "examples": [
            {
              "title": "90 Tage zum 15. März 2024 addieren",
              "steps": [
                "März hat 31 Tage, also 31-15 = 16 Tage übrig",
                "April hat 30 Tage: 16+30 = 46 Tage",
                "Mai hat 31 Tage: 46+31 = 77 Tage",
                "Juni benötigt 90-77 = 13 weitere Tage"
              ],
              "result": "13. Juni 2024"
            },
            {
              "title": "Tage zwischen 1. Januar und 15. März 2024",
              "steps": [
                "Januar: 31 Tage (minus 1. Januar = 30)",
                "Februar 2024 (Schaltjahr): 29 Tage",
                "März 1-15: 15 Tage",
                "Gesamt: 30 + 29 + 15 = 74 Tage"
              ],
              "result": "74 Tage"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie berechne ich ein Datum 30 Tage von heute?",
          "answer": "Wählen Sie 'Zu Datum addieren/subtrahieren', wählen Sie heute als Startdatum, wählen Sie 'Addieren', geben Sie 30 in das Tage-Feld ein und klicken Sie auf Berechnen. Das Ergebnis zeigt das Datum genau 30 Tage in der Zukunft."
        },
        {
          "question": "Wie finde ich die Anzahl der Tage zwischen zwei Daten?",
          "answer": "Wählen Sie 'Tage zwischen zwei Daten' als Berechnungstyp, geben Sie Ihr Start- und Enddatum ein und klicken Sie dann auf Berechnen. Sie sehen die Gesamttage, Wochen und Arbeitstage zwischen den Daten."
        },
        {
          "question": "Was sind Arbeitstage?",
          "answer": "Arbeitstage (auch Werktage genannt) sind Montag bis Freitag, ausgenommen Samstag und Sonntag. Einige Berechnungen schließen auch gesetzliche Feiertage aus. Arbeitstagzählungen werden häufig für Versandschätzungen, Vertragsbedingungen und Projektplanung verwendet."
        },
        {
          "question": "Wie funktioniert das Addieren von Monaten, wenn der Tag nicht existiert?",
          "answer": "Wenn das Addieren von Monaten zu einem ungültigen Datum führen würde (wie 31. Januar + 1 Monat), verwendet der Rechner den letzten gültigen Tag dieses Monats. So wird 31. Januar + 1 Monat = 28. Februar (oder 29 in Schaltjahren)."
        },
        {
          "question": "Was ist ein Schaltjahr und wie beeinflusst es Berechnungen?",
          "answer": "Ein Schaltjahr hat 366 Tage statt 365, wobei der Februar 29 Tage statt 28 hat. Schaltjahre treten alle 4 Jahre auf, außer bei Jahrhundertjahren (1900, 2100), es sei denn sie sind durch 400 teilbar (2000, 2400). Der Rechner behandelt Schaltjahre automatisch."
        },
        {
          "question": "Wie subtrahiere ich Zeit von einem Datum?",
          "answer": "Wählen Sie 'Zu Datum addieren/subtrahieren', wählen Sie Ihr Startdatum, wählen Sie 'Subtrahieren' als Operation, geben Sie die Tage/Wochen/Monate/Jahre ein, die Sie subtrahieren möchten, und klicken Sie auf Berechnen. Das Ergebnis zeigt das vergangene Datum."
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

  // ===========================================================================
  // INPUTS - Smart Defaults: defaultValue for non-sensitive fields
  // ===========================================================================
  inputs: [
    {
      id: "calculationType",
      type: "select",
      defaultValue: "addSubtract",
      options: [
        { value: "addSubtract" },
        { value: "difference" },
      ],
    },
    // Start date - for both modes
    {
      id: "startDate",
      type: "date",
      defaultValue: null, // Will be set to today by engine
    },
    // End date - only for difference mode
    {
      id: "endDate",
      type: "date",
      defaultValue: null,
      showWhen: { field: "calculationType", value: "difference" },
    },
    // Include end date option
    {
      id: "includeEndDate",
      type: "radio",
      defaultValue: "no",
      options: [
        { value: "yes" },
        { value: "no" },
      ],
      showWhen: { field: "calculationType", value: "difference" },
    },
    // Operation - only for add/subtract mode
    {
      id: "operation",
      type: "radio",
      defaultValue: "add",
      options: [
        { value: "add" },
        { value: "subtract" },
      ],
      showWhen: { field: "calculationType", value: "addSubtract" },
    },
    // Time periods to add/subtract
    {
      id: "daysToAdd",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      min: 0,
      max: 36500,
      showWhen: { field: "calculationType", value: "addSubtract" },
    },
    {
      id: "weeksToAdd",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      min: 0,
      max: 5200,
      showWhen: { field: "calculationType", value: "addSubtract" },
    },
    {
      id: "monthsToAdd",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      min: 0,
      max: 1200,
      showWhen: { field: "calculationType", value: "addSubtract" },
    },
    {
      id: "yearsToAdd",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      min: 0,
      max: 100,
      showWhen: { field: "calculationType", value: "addSubtract" },
    },
  ],

  // EMPTY - no accordions (RULE from ENGINE_V4)
  inputGroups: [],

  // ===========================================================================
  // RESULTS
  // ===========================================================================
  results: [
    { id: "resultDate", type: "primary", format: "text" },
    { id: "totalDays", type: "secondary", format: "number" },
    { id: "businessDays", type: "secondary", format: "number" },
  ],

  // ===========================================================================
  // INFO CARDS - 2 list + 1 horizontal tips (tips ALWAYS last)
  // ===========================================================================
  infoCards: [
    { id: "dateResult", type: "list", icon: "📅", itemCount: 4 },
    { id: "breakdown", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // EMPTY - use Dual List instead (RULE from ENGINE_V4)
  referenceData: [],

  // ===========================================================================
  // EDUCATION - 2 prose + 2 list + 1 code-example (RULE from ENGINE_V4)
  // ===========================================================================
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "useCases", type: "list", icon: "📋", itemCount: 6 },
    { id: "calendarFacts", type: "list", icon: "📆", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ===========================================================================
  // FAQs - 6+ required (RULE from ENGINE_V4)
  // ===========================================================================
  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ],

  // ===========================================================================
  // REFERENCES - 2+ required (RULE from ENGINE_V4)
  // ===========================================================================
  references: [
    {
      authors: "timeanddate.com",
      year: "2024",
      title: "Date Calculator",
      source: "Time and Date AS",
      url: "https://www.timeanddate.com/date/dateadd.html",
    },
    {
      authors: "U.S. Naval Observatory",
      year: "2024",
      title: "The Gregorian Calendar",
      source: "USNO",
      url: "https://aa.usno.navy.mil/faq/calendars",
    },
  ],

  // ===========================================================================
  // LAYOUT SECTIONS
  // ===========================================================================
  hero: {
    showBadge: true,
    showRating: true,
  },
  sidebar: {
    showTips: true,
    showRelated: true,
  },
  features: {
    showPdfExport: true,
    showSaveResults: true,
  },
  relatedCalculators: ["age", "time", "workday"],
  ads: {
    showSidebarAd: true,
    showFooterAd: true,
  },
};

// =============================================================================
// CALCULATE FUNCTION
// - Use v["key"] for ALL units - NO hardcoding
// - Handle null values from Smart Defaults
// - Return isValid: false if missing required fields
// =============================================================================

// Helper: Get day of week key for translation
const DAY_KEYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function getDayOfWeekKey(date: Date): string {
  return DAY_KEYS[date.getDay()];
}

// Helper: Get month key for translation
const MONTH_KEYS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
];

function getMonthKey(date: Date): string {
  return MONTH_KEYS[date.getMonth()];
}

// Helper: Get ISO week number
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

// Helper: Get quarter
function getQuarter(date: Date): number {
  return Math.floor(date.getMonth() / 3) + 1;
}

// Helper: Count business days between two dates
function countBusinessDays(start: Date, end: Date): number {
  let count = 0;
  const current = new Date(start);
  
  while (current <= end) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
}

// Helper: Count weekend days between two dates
function countWeekendDays(start: Date, end: Date): number {
  let count = 0;
  const current = new Date(start);
  
  while (current <= end) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
}

// Helper: Format date using locale from translations
function formatDateLocalized(date: Date, v: Record<string, string>): string {
  const locale = v["locale"] || "en-US";
  return date.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Helper: Get day of week localized
function getDayOfWeekLocalized(date: Date, v: Record<string, string>): string {
  const locale = v["locale"] || "en-US";
  return date.toLocaleDateString(locale, { weekday: "long" });
}

// Helper: Add months (handling edge cases)
function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  const targetMonth = result.getMonth() + months;
  result.setMonth(targetMonth);
  
  // Handle month overflow (e.g., Jan 31 + 1 month should be Feb 28/29)
  if (result.getMonth() !== ((targetMonth % 12) + 12) % 12) {
    result.setDate(0); // Go to last day of previous month
  }
  
  return result;
}

export function calculateDate(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;

  // Get translations - NEVER hardcode
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const calcType = values.calculationType as string;

  // Use today if no start date
  const startDateStr = values.startDate as string | null;
  const startDate = startDateStr ? new Date(startDateStr) : new Date();
  
  // Reset time to midnight for consistent calculations
  startDate.setHours(0, 0, 0, 0);

  if (calcType === "difference") {
    // Days between two dates
    const endDateStr = values.endDate as string | null;
    
    if (!endDateStr) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const endDate = new Date(endDateStr);
    endDate.setHours(0, 0, 0, 0);

    const includeEnd = values.includeEndDate === "yes";
    
    // Calculate difference
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    let totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (includeEnd) totalDays += 1;

    const totalWeeks = totalDays / 7;
    const totalMonths = totalDays / 30.44; // Average days per month

    // Determine which date is earlier for business day calculation
    const earlierDate = startDate < endDate ? startDate : endDate;
    const laterDate = startDate < endDate ? endDate : startDate;
    
    const businessDays = countBusinessDays(earlierDate, laterDate);
    const weekendDays = countWeekendDays(earlierDate, laterDate);

    // Get translated units
    const daysLabel = totalDays === 1 ? (v["day"] || "day") : (v["days"] || "days");
    const weeksLabel = v["weeks"] || "weeks";
    const businessLabel = v["businessDays"] || "business days";
    const weekendLabel = v["weekendDays"] || "weekend days";

    const summary = f.difference?.replace("{days}", totalDays.toString()) || 
      `${totalDays} ${daysLabel} between dates`;

    return {
      values: {
        totalDays,
        totalWeeks,
        totalMonths,
        businessDays,
        weekendDays,
      },
      formatted: {
        resultDate: formatDateLocalized(endDate, v),
        totalDays: `${totalDays} ${daysLabel}`,
        totalWeeks: `${totalWeeks.toFixed(1)} ${weeksLabel}`,
        businessDays: `${businessDays} ${businessLabel}`,
        weekendDays: `${weekendDays} ${weekendLabel}`,
        dayOfWeek: getDayOfWeekLocalized(endDate, v),
        weekNumber: `${v["weekLabel"] || "Week"} ${getWeekNumber(endDate)}`,
        quarter: `Q${getQuarter(endDate)}`,
      },
      summary,
      isValid: true,
    };
  } else {
    // Add/Subtract from date
    const operation = values.operation as string;
    const days = (values.daysToAdd as number) || 0;
    const weeks = (values.weeksToAdd as number) || 0;
    const months = (values.monthsToAdd as number) || 0;
    const years = (values.yearsToAdd as number) || 0;

    // Check if any time period is specified
    if (days === 0 && weeks === 0 && months === 0 && years === 0) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const multiplier = operation === "subtract" ? -1 : 1;

    // Start with original date
    let resultDate = new Date(startDate);

    // Add years first
    if (years !== 0) {
      resultDate.setFullYear(resultDate.getFullYear() + (years * multiplier));
    }

    // Add months (using helper for edge cases)
    if (months !== 0) {
      resultDate = addMonths(resultDate, months * multiplier);
    }

    // Add weeks and days
    const totalDaysToAdd = (days + (weeks * 7)) * multiplier;
    if (totalDaysToAdd !== 0) {
      resultDate.setDate(resultDate.getDate() + totalDaysToAdd);
    }

    // Calculate total days difference
    const diffTime = resultDate.getTime() - startDate.getTime();
    const totalDays = Math.abs(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Calculate business and weekend days
    const earlierDate = startDate < resultDate ? startDate : resultDate;
    const laterDate = startDate < resultDate ? resultDate : startDate;
    const businessDays = countBusinessDays(earlierDate, laterDate);
    const weekendDays = countWeekendDays(earlierDate, laterDate);

    // Get translated units
    const daysLabel = totalDays === 1 ? (v["day"] || "day") : (v["days"] || "days");
    const weeksLabel = v["weeks"] || "weeks";
    const businessLabel = v["businessDays"] || "business days";
    const weekendLabel = v["weekendDays"] || "weekend days";

    const summary = f.dateResult?.replace("{date}", formatDateLocalized(resultDate, v)) || 
      formatDateLocalized(resultDate, v);

    return {
      values: {
        resultDate: resultDate.toISOString(),
        totalDays,
        businessDays,
        weekendDays,
      },
      formatted: {
        resultDate: formatDateLocalized(resultDate, v),
        totalDays: `${totalDays} ${daysLabel}`,
        totalWeeks: `${(totalDays / 7).toFixed(1)} ${weeksLabel}`,
        businessDays: `${businessDays} ${businessLabel}`,
        weekendDays: `${weekendDays} ${weekendLabel}`,
        dayOfWeek: getDayOfWeekLocalized(resultDate, v),
        weekNumber: `${v["weekLabel"] || "Week"} ${getWeekNumber(resultDate)}`,
        quarter: `Q${getQuarter(resultDate)}`,
      },
      summary,
      isValid: true,
    };
  }
}

export default dateCalculatorConfig;
