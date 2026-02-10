import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// =============================================================================
// TIME CALCULATOR — Add, Subtract, Convert Time Durations
// Uses V4.3 custom TimeInput component (h|m|s inline fields)
// =============================================================================

export const timeCalculatorConfig: CalculatorConfigV4 = {
  id: "time-calculator",
  version: "4.0",
  category: "everyday",
  icon: "⏰",

  presets: [
    {
      id: "workday",
      icon: "💼",
      values: {
        operation: "add",
        time1: 30600,   // 8h 30m 0s in seconds
        time2: 4500,    // 1h 15m 0s in seconds
      },
    },
    {
      id: "marathon",
      icon: "🏃",
      values: {
        operation: "subtract",
        time1: 16200,   // 4h 30m 0s
        time2: 13500,   // 3h 45m 0s
      },
    },
    {
      id: "cooking",
      icon: "🍳",
      values: {
        operation: "add",
        time1: 2700,    // 0h 45m 0s
        time2: 5400,    // 1h 30m 0s
      },
    },
    {
      id: "flight",
      icon: "✈️",
      values: {
        operation: "add",
        time1: 13500,   // 3h 45m 0s
        time2: 7800,    // 2h 10m 0s
      },
    },
  ],

  t: {
    en: {
      name: "Time Calculator",
      slug: "time-calculator",
      subtitle: "Add, subtract, and convert time durations with hours, minutes, and seconds.",
      breadcrumb: "Time Calc",

      seo: {
        title: "Time Calculator - Add & Subtract Hours, Minutes, Seconds",
        description: "Calculate time durations by adding or subtracting hours, minutes, and seconds. Get instant results in multiple formats with a free, easy-to-use online tool.",
        shortDescription: "Add and subtract time durations instantly.",
        keywords: [
          "time calculator",
          "add time",
          "subtract time",
          "hours minutes seconds calculator",
          "time duration calculator",
          "free time calculator",
          "online time calculator",
          "time addition",
        ],
      },

      calculator: { yourInformation: "Time Calculator" },
      ui: {
        yourInformation: "Time Calculator",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        operation: {
          label: "Operation",
          helpText: "Choose to add or subtract durations",
          options: {
            add: "Add (+)",
            subtract: "Subtract (−)",
          },
        },
        time1: {
          label: "Time 1",
          helpText: "Enter first duration",
          hoursLabel: "hrs",
          minutesLabel: "min",
          secondsLabel: "sec",
        },
        time2: {
          label: "Time 2",
          helpText: "Enter second duration",
          hoursLabel: "hrs",
          minutesLabel: "min",
          secondsLabel: "sec",
        },
        outputFormat: {
          label: "Output Format",
          helpText: "Choose how results are displayed",
          options: {
            hms: "Hours : Minutes : Seconds",
            decimal: "Decimal Hours (e.g. 2.50 hrs)",
            minutes: "Total Minutes",
            seconds: "Total Seconds",
          },
        },
      },

      results: {
        totalTime: { label: "Total Time" },
        totalHours: { label: "In Hours" },
        totalMinutes: { label: "In Minutes" },
        totalSeconds: { label: "In Seconds" },
      },

      presets: {
        workday: { label: "Work Day", description: "8h 30m + 1h 15m" },
        marathon: { label: "Marathon", description: "4h 30m − 3h 45m" },
        cooking: { label: "Cooking", description: "45m + 1h 30m" },
        flight: { label: "Flight", description: "3h 45m + 2h 10m" },
      },

      values: {
        "h": "h",
        "m": "m",
        "s": "s",
        "hours": "hours",
        "hour": "hour",
        "minutes": "minutes",
        "minute": "minute",
        "seconds": "seconds",
        "second": "second",
      },

      formats: {
        summary: "Result: {value}",
      },

      infoCards: {
        metrics: {
          title: "Time Breakdown",
          items: [
            { label: "Hours:Minutes:Seconds", valueKey: "totalTime" },
            { label: "Decimal Hours", valueKey: "totalHours" },
            { label: "Total Minutes", valueKey: "totalMinutes" },
            { label: "Total Seconds", valueKey: "totalSeconds" },
          ],
        },
        details: {
          title: "Input Summary",
          items: [
            { label: "Time 1", valueKey: "time1Display" },
            { label: "Time 2", valueKey: "time2Display" },
            { label: "Operation", valueKey: "operationDisplay" },
            { label: "Output Format", valueKey: "formatDisplay" },
          ],
        },
        tips: {
          title: "Quick Tips",
          items: [
            "Enter hours, minutes, and seconds separately in each field",
            "Decimal hours are useful for timesheet and billing calculations",
            "Negative results show how much Time 2 exceeds Time 1 in subtract mode",
            "Use presets for common scenarios like work hours or cooking times",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Time Calculator?",
          content: "A time calculator is a tool that performs arithmetic operations on time durations. Unlike regular numbers, time follows a base-60 system where 60 seconds make a minute and 60 minutes make an hour. This makes mental math with time challenging, especially when dealing with hours, minutes, and seconds simultaneously.\n\nTime calculators are essential for professionals who track billable hours, athletes monitoring training durations, cooks combining recipe prep times, and anyone working with schedules across time zones. By automating the conversion between time units, these tools eliminate common errors in time arithmetic.",
        },
        howItWorks: {
          title: "How Time Addition & Subtraction Works",
          content: "Time addition and subtraction follow the sexagesimal (base-60) system. When adding two time values, seconds are added first. If the sum exceeds 59, the overflow carries into minutes. The same carry logic applies from minutes to hours.\n\nFor example, adding 2h 45m 30s and 1h 20m 45s: First, 30s + 45s = 75s = 1m 15s (carry 1 minute). Then, 45m + 20m + 1m (carry) = 66m = 1h 6m (carry 1 hour). Finally, 2h + 1h + 1h (carry) = 4h. Result: 4h 6m 15s.\n\nSubtraction works similarly but with borrowing instead of carrying. If the seconds in the first time are less than the second, you borrow 1 minute (60 seconds) from the minutes column.",
        },
        considerations: {
          title: "Common Use Cases",
          items: [
            { text: "Work hours tracking: Add daily work periods to find total hours for payroll or billing", type: "info" },
            { text: "Cooking and baking: Combine prep time, cooking time, and resting time for recipes", type: "info" },
            { text: "Race timing: Calculate time differences between splits, laps, or finish times", type: "info" },
            { text: "Project management: Estimate total duration by adding individual task times", type: "info" },
            { text: "Travel planning: Add layover times, flight durations, and transfer times", type: "info" },
            { text: "Negative results in subtraction indicate the second time exceeds the first", type: "warning" },
          ],
        },
        categories: {
          title: "Time Unit Conversions",
          items: [
            { text: "1 hour = 60 minutes = 3,600 seconds", type: "info" },
            { text: "1 minute = 60 seconds", type: "info" },
            { text: "1 day = 24 hours = 1,440 minutes = 86,400 seconds", type: "info" },
            { text: "Decimal hours: 1h 30m = 1.50 hours (divide minutes by 60)", type: "info" },
            { text: "Decimal minutes: 2m 30s = 2.50 minutes (divide seconds by 60)", type: "info" },
            { text: "Military time uses 24-hour format: 1:30 PM = 13:30", type: "info" },
          ],
        },
        examples: {
          title: "Step-by-Step Examples",
          description: "How to add and subtract time durations",
          examples: [
            {
              title: "Adding Work Hours: 8h 30m + 1h 15m",
              steps: [
                "Enter 8 in hours, 30 in minutes for Time 1",
                "Enter 1 in hours, 15 in minutes for Time 2",
                "Select Add (+) operation",
                "Result: 8h30m + 1h15m = 9h 45m 00s",
              ],
              result: "9h 45m 00s (9.75 decimal hours)",
            },
            {
              title: "Subtracting Race Times: 4h 30m − 3h 45m",
              steps: [
                "Enter 4 in hours, 30 in minutes for Time 1",
                "Enter 3 in hours, 45 in minutes for Time 2",
                "Select Subtract (−) operation",
                "Result: 4h30m − 3h45m = 0h 45m 00s",
              ],
              result: "0h 45m 00s (45 minutes)",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I add hours and minutes?", answer: "Enter the hours in the 'hrs' field and minutes in the 'min' field for each time value. Select Add (+) and the calculator will handle the base-60 conversion automatically — for example, 45 minutes + 30 minutes correctly gives 1 hour 15 minutes, not 75 minutes." },
        { question: "What does decimal hours mean?", answer: "Decimal hours express time as a decimal fraction of an hour. For example, 1 hour 30 minutes = 1.50 hours, and 2 hours 15 minutes = 2.25 hours. This format is commonly used for billing, timesheets, and payroll calculations where fractions of hours need to be multiplied by hourly rates." },
        { question: "Can this calculator handle negative results?", answer: "Yes. When subtracting, if Time 2 is larger than Time 1, the result will be negative, shown with a minus sign (−). For example, subtracting 3h 45m from 2h 30m gives −1h 15m 00s, meaning Time 2 exceeded Time 1 by 1 hour and 15 minutes." },
        { question: "How accurate is the time calculation?", answer: "The calculator is accurate to the second. It uses precise integer arithmetic for time conversion, avoiding floating-point errors that can occur with decimal representations. All conversions between hours, minutes, and seconds use exact factors (60 seconds per minute, 3600 seconds per hour)." },
        { question: "Can I use this for work hours tracking?", answer: "Absolutely. Enter your start-to-end work periods as time values and add them together. The decimal hours output is especially useful for multiplying by your hourly rate. For example, 8h 30m = 8.50 decimal hours × $25/hr = $212.50." },
        { question: "What time formats are available?", answer: "The calculator offers four output formats: Hours:Minutes:Seconds (standard time format), Decimal Hours (for billing and payroll), Total Minutes (for short durations), and Total Seconds (for precise timing). You can switch between formats using the Output Format selector." },
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
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },

    es: {
      name: "Calculadora de Tiempo",
      slug: "calculadora-de-tiempo",
      subtitle: "Suma, resta y convierte duraciones de tiempo con horas, minutos y segundos.",
      breadcrumb: "Tiempo",

      seo: {
        title: "Calculadora de Tiempo - Sumar y Restar Horas, Minutos, Segundos",
        description: "Calcula duraciones de tiempo sumando o restando horas, minutos y segundos. Resultados instantáneos en múltiples formatos con herramienta gratuita.",
        shortDescription: "Suma y resta duraciones de tiempo al instante.",
        keywords: ["calculadora de tiempo", "sumar horas", "restar tiempo", "calculadora horas minutos", "calcular tiempo", "calculadora de horas gratis"],
      },

      calculator: { yourInformation: "Calculadora de Tiempo" },
      ui: { yourInformation: "Calculadora de Tiempo", calculate: "Calcular", reset: "Reiniciar", results: "Resultados" },

      inputs: {
        operation: { label: "Operación", helpText: "Elige sumar o restar duraciones", options: { add: "Sumar (+)", subtract: "Restar (−)" } },
        time1: { label: "Tiempo 1", helpText: "Ingresa la primera duración", hoursLabel: "hrs", minutesLabel: "min", secondsLabel: "seg" },
        time2: { label: "Tiempo 2", helpText: "Ingresa la segunda duración", hoursLabel: "hrs", minutesLabel: "min", secondsLabel: "seg" },
        outputFormat: { label: "Formato de Salida", helpText: "Elige cómo se muestran los resultados", options: { hms: "Horas : Minutos : Segundos", decimal: "Horas Decimales (ej. 2.50 hrs)", minutes: "Total en Minutos", seconds: "Total en Segundos" } },
      },

      results: { totalTime: { label: "Tiempo Total" }, totalHours: { label: "En Horas" }, totalMinutes: { label: "En Minutos" }, totalSeconds: { label: "En Segundos" } },
      presets: { workday: { label: "Día Laboral", description: "8h 30m + 1h 15m" }, marathon: { label: "Maratón", description: "4h 30m − 3h 45m" }, cooking: { label: "Cocina", description: "45m + 1h 30m" }, flight: { label: "Vuelo", description: "3h 45m + 2h 10m" } },

      values: { "h": "h", "m": "m", "s": "s", "hours": "horas", "hour": "hora", "minutes": "minutos", "minute": "minuto", "seconds": "segundos", "second": "segundo" },
      formats: { summary: "Resultado: {value}" },

      infoCards: {
        metrics: { title: "Desglose de Tiempo", items: [{ label: "Horas:Minutos:Segundos", valueKey: "totalTime" }, { label: "Horas Decimales", valueKey: "totalHours" }, { label: "Total en Minutos", valueKey: "totalMinutes" }, { label: "Total en Segundos", valueKey: "totalSeconds" }] },
        details: { title: "Resumen de Entrada", items: [{ label: "Tiempo 1", valueKey: "time1Display" }, { label: "Tiempo 2", valueKey: "time2Display" }, { label: "Operación", valueKey: "operationDisplay" }, { label: "Formato", valueKey: "formatDisplay" }] },
        tips: { title: "Consejos Rápidos", items: ["Ingresa horas, minutos y segundos por separado en cada campo", "Las horas decimales son útiles para facturación y nóminas", "Resultados negativos indican que el Tiempo 2 excede al Tiempo 1", "Usa los presets para escenarios comunes como horas de trabajo"] },
      },

      education: {
        whatIs: { title: "¿Qué es una Calculadora de Tiempo?", content: "Una calculadora de tiempo es una herramienta que realiza operaciones aritméticas con duraciones de tiempo. A diferencia de los números regulares, el tiempo sigue un sistema base-60 donde 60 segundos forman un minuto y 60 minutos forman una hora.\n\nEstas calculadoras son esenciales para profesionales que registran horas facturables, atletas que monitorean duraciones de entrenamiento, cocineros que combinan tiempos de preparación y cualquier persona que trabaje con horarios." },
        howItWorks: { title: "Cómo Funciona la Suma y Resta de Tiempo", content: "La suma y resta de tiempo siguen el sistema sexagesimal (base-60). Al sumar dos valores de tiempo, primero se suman los segundos. Si la suma excede 59, el exceso se lleva a los minutos. La misma lógica de acarreo aplica de minutos a horas.\n\nPor ejemplo, al sumar 2h 45m 30s y 1h 20m 45s: Primero, 30s + 45s = 75s = 1m 15s (acarreo 1 minuto). Luego, 45m + 20m + 1m = 66m = 1h 6m (acarreo 1 hora). Finalmente, 2h + 1h + 1h = 4h. Resultado: 4h 6m 15s." },
        considerations: { title: "Casos de Uso Comunes", items: [{ text: "Registro de horas laborales: Suma periodos de trabajo para nómina o facturación", type: "info" }, { text: "Cocina y repostería: Combina tiempo de preparación, cocción y reposo", type: "info" }, { text: "Cronometraje deportivo: Calcula diferencias entre parciales y tiempos finales", type: "info" }, { text: "Gestión de proyectos: Estima duración total sumando tareas individuales", type: "info" }, { text: "Planificación de viajes: Suma escalas, duración de vuelos y traslados", type: "info" }, { text: "Resultados negativos en resta indican que el segundo tiempo excede al primero", type: "warning" }] },
        categories: { title: "Conversiones de Unidades de Tiempo", items: [{ text: "1 hora = 60 minutos = 3,600 segundos", type: "info" }, { text: "1 minuto = 60 segundos", type: "info" }, { text: "1 día = 24 horas = 1,440 minutos = 86,400 segundos", type: "info" }, { text: "Horas decimales: 1h 30m = 1.50 horas (dividir minutos entre 60)", type: "info" }, { text: "Minutos decimales: 2m 30s = 2.50 minutos (dividir segundos entre 60)", type: "info" }, { text: "Hora militar usa formato 24h: 1:30 PM = 13:30", type: "info" }] },
        examples: { title: "Ejemplos Paso a Paso", description: "Cómo sumar y restar duraciones", examples: [{ title: "Sumar Horas de Trabajo: 8h 30m + 1h 15m", steps: ["Ingresa 8 en horas, 30 en minutos para Tiempo 1", "Ingresa 1 en horas, 15 en minutos para Tiempo 2", "Selecciona operación Sumar (+)", "Resultado: 8h30m + 1h15m = 9h 45m 00s"], result: "9h 45m 00s (9.75 horas decimales)" }, { title: "Restar Tiempos de Carrera: 4h 30m − 3h 45m", steps: ["Ingresa 4 en horas, 30 en minutos para Tiempo 1", "Ingresa 3 en horas, 45 en minutos para Tiempo 2", "Selecciona operación Restar (−)", "Resultado: 4h30m − 3h45m = 0h 45m 00s"], result: "0h 45m 00s (45 minutos)" }] },
      },

      faqs: [
        { question: "¿Cómo sumo horas y minutos?", answer: "Ingresa las horas en el campo 'hrs' y los minutos en 'min' para cada valor de tiempo. Selecciona Sumar (+) y la calculadora manejará la conversión base-60 automáticamente." },
        { question: "¿Qué son las horas decimales?", answer: "Las horas decimales expresan el tiempo como fracción decimal. Por ejemplo, 1 hora 30 minutos = 1.50 horas. Este formato es común en facturación y nóminas." },
        { question: "¿Puede dar resultados negativos?", answer: "Sí. Al restar, si el Tiempo 2 es mayor que el Tiempo 1, el resultado será negativo, mostrado con signo menos (−)." },
        { question: "¿Qué tan precisa es la calculación?", answer: "La calculadora es precisa al segundo. Usa aritmética entera exacta para conversiones de tiempo, evitando errores de punto flotante." },
        { question: "¿Puedo usarla para registro de horas laborales?", answer: "Absolutamente. Ingresa tus periodos de trabajo y súmalos. La salida en horas decimales es ideal para multiplicar por tu tarifa horaria." },
        { question: "¿Qué formatos de tiempo están disponibles?", answer: "La calculadora ofrece cuatro formatos: Horas:Minutos:Segundos, Horas Decimales, Total en Minutos y Total en Segundos." },
      ],

      rating: { title: "Califica esta Calculadora", share: "Compartir", copied: "¡Copiado!", copyLink: "Copiar Enlace", clickToRate: "Click para calificar", youRated: "Calificaste", stars: "estrellas", averageFrom: "promedio de", ratings: "calificaciones" },
      common: { home: "Inicio", calculators: "Calculadoras" },
      buttons: { calculate: "Calcular", reset: "Reiniciar", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Guardar", saved: "Guardado", saving: "Guardando..." },
      share: { calculatedWith: "Calculado con Kalcufy.com" },
      accessibility: { mobileResults: "Resultados", closeModal: "Cerrar", openMenu: "Menú" },
      sources: { title: "Fuentes y Referencias" },
    },
  },

  // ===========================================================================
  // INPUTS — Using V4.3 custom TimeInput component (h|m|s inline)
  // ===========================================================================
  inputs: [
    {
      id: "operation",
      type: "radio",
      defaultValue: "add",
      options: [{ value: "add" }, { value: "subtract" }],
    },
    {
      id: "time1",
      type: "time",
      timeFormat: "hms",
      timeOutputFormat: "seconds",
      defaultValue: 0,
    },
    {
      id: "time2",
      type: "time",
      timeFormat: "hms",
      timeOutputFormat: "seconds",
      defaultValue: 0,
    },
    {
      id: "outputFormat",
      type: "select",
      defaultValue: "hms",
      options: [
        { value: "hms" },
        { value: "decimal" },
        { value: "minutes" },
        { value: "seconds" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "totalTime", type: "primary", format: "text" },
    { id: "totalHours", type: "secondary", format: "text" },
    { id: "totalMinutes", type: "secondary", format: "text" },
    { id: "totalSeconds", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "⏱️", itemCount: 4 },
    { id: "details", type: "list", icon: "📋", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [
    { id: "0" }, { id: "1" }, { id: "2" },
    { id: "3" }, { id: "4" }, { id: "5" },
  ],

  references: [
    {
      authors: "National Institute of Standards and Technology",
      year: "2024",
      title: "SI Units - Time",
      source: "NIST",
      url: "https://www.nist.gov/pml/owm/metric-si/si-units-time",
    },
    {
      authors: "International Bureau of Weights and Measures",
      year: "2024",
      title: "The International System of Units (SI) - Second",
      source: "BIPM",
      url: "https://www.bipm.org/en/measurement-units/si-base-units/second",
    },
  ],

  hero: {
    badge: "Free Online Tool",
  },

  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "everyday",
  },

  features: {
    autoCalculate: true,
    exportPDF: true,
    exportCSV: true,
    shareResults: true,
    saveHistory: true,
    presetsEnabled: true,
  },

  relatedCalculators: ["age-calculator", "percentage-calculator"],

  ads: {
    sidebar: true,
    bottom: true,
  },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateTimeCalculator(data: {
  values: Record<string, unknown>;
  units?: Record<string, string>;
  unitSystem?: "metric" | "imperial";
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const operation = (values.operation as string) || "add";
  const outputFormat = (values.outputFormat as string) || "hms";

  // TimeInput with timeOutputFormat: "seconds" returns total seconds as number
  const sec1 = (values.time1 as number) || 0;
  const sec2 = (values.time2 as number) || 0;

  if (sec1 === 0 && sec2 === 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Perform operation
  let resultSec: number;
  if (operation === "subtract") {
    resultSec = sec1 - sec2;
  } else {
    resultSec = sec1 + sec2;
  }

  // Handle negative
  const isNegative = resultSec < 0;
  const absResult = Math.abs(resultSec);
  const sign = isNegative ? "−" : "";

  // Convert to h:m:s
  const rH = Math.floor(absResult / 3600);
  const rM = Math.floor((absResult % 3600) / 60);
  const rS = Math.round(absResult % 60);

  // Unit labels
  const hStr = v["h"] || "h";
  const mStr = v["m"] || "m";
  const sStr = v["s"] || "s";

  const timeHMS = `${sign}${rH}${hStr} ${String(rM).padStart(2, "0")}${mStr} ${String(rS).padStart(2, "0")}${sStr}`;
  const decimalHours = absResult / 3600;
  const totalMinutes = absResult / 60;

  const hoursLabel = decimalHours === 1 ? (v["hour"] || "hour") : (v["hours"] || "hours");
  const minutesLabel = totalMinutes === 1 ? (v["minute"] || "minute") : (v["minutes"] || "minutes");
  const secondsLabel = absResult === 1 ? (v["second"] || "second") : (v["seconds"] || "seconds");

  // Primary result based on outputFormat
  let primaryFormatted: string;
  switch (outputFormat) {
    case "decimal":
      primaryFormatted = `${sign}${decimalHours.toFixed(2)} ${hoursLabel}`;
      break;
    case "minutes":
      primaryFormatted = `${sign}${totalMinutes.toFixed(1)} ${minutesLabel}`;
      break;
    case "seconds":
      primaryFormatted = `${sign}${Math.round(absResult).toLocaleString("en-US")} ${secondsLabel}`;
      break;
    default:
      primaryFormatted = timeHMS;
  }

  // Format input values for display
  const formatTime = (totalSec: number): string => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = Math.round(totalSec % 60);
    return `${h}${hStr} ${String(m).padStart(2, "0")}${mStr} ${String(s).padStart(2, "0")}${sStr}`;
  };

  const opSymbol = operation === "subtract" ? "−" : "+";
  const formatLabels: Record<string, string> = {
    hms: "H:M:S",
    decimal: "Decimal Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  };

  return {
    values: {
      totalTime: resultSec,
      totalHours: decimalHours,
      totalMinutes: totalMinutes,
      totalSeconds: absResult,
      time1Display: 0,
      time2Display: 0,
      operationDisplay: 0,
      formatDisplay: 0,
    },
    formatted: {
      totalTime: primaryFormatted,
      totalHours: `${sign}${decimalHours.toFixed(2)} ${hoursLabel}`,
      totalMinutes: `${sign}${totalMinutes.toFixed(1)} ${minutesLabel}`,
      totalSeconds: `${sign}${Math.round(absResult).toLocaleString("en-US")} ${secondsLabel}`,
      time1Display: formatTime(sec1),
      time2Display: formatTime(sec2),
      operationDisplay: `Time 1 ${opSymbol} Time 2`,
      formatDisplay: formatLabels[outputFormat] || "H:M:S",
    },
    summary: f.summary?.replace("{value}", primaryFormatted) || `Result: ${primaryFormatted}`,
    isValid: true,
  };
}

export default timeCalculatorConfig;
