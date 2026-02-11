import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

export const conceptionDateConfig: CalculatorConfigV4 = {
  id: "conception-date",
  version: "4.0",
  category: "health",
  icon: "📅",

  presets: [
    {
      id: "regularCycle",
      icon: "📆",
      values: {
        method: "lmp",
        lmpDate: "2025-11-01",
        dueDate: "",
        ultrasoundDate: "",
        cycleLength: 28,
        gestationalWeeks: 8,
        gestationalDays: 0,
      },
    },
    {
      id: "longCycle",
      icon: "🔄",
      values: {
        method: "lmp",
        lmpDate: "2025-10-15",
        dueDate: "",
        ultrasoundDate: "",
        cycleLength: 35,
        gestationalWeeks: 8,
        gestationalDays: 0,
      },
    },
    {
      id: "fromDueDate",
      icon: "🎯",
      values: {
        method: "dueDate",
        lmpDate: "",
        dueDate: "2026-08-08",
        ultrasoundDate: "",
        cycleLength: 28,
        gestationalWeeks: 8,
        gestationalDays: 0,
      },
    },
    {
      id: "fromUltrasound",
      icon: "🩻",
      values: {
        method: "ultrasound",
        lmpDate: "",
        dueDate: "",
        ultrasoundDate: "2025-12-27",
        cycleLength: 28,
        gestationalWeeks: 8,
        gestationalDays: 0,
      },
    },
  ],

  t: {
    en: {
      name: "Conception Date Calculator",
      slug: "conception-date",
      subtitle:
        "Estimate when conception occurred based on your due date, last period, or ultrasound — plus your probable fertile window.",
      breadcrumb: "Conception Date",

      seo: {
        title: "Conception Date Calculator - When Did I Conceive?",
        description:
          "Find out when you conceived using your due date, last period, or ultrasound date. See your estimated conception date, fertile window, and intercourse timeline.",
        shortDescription:
          "Estimate your conception date from due date, LMP, or ultrasound.",
        keywords: [
          "conception date calculator",
          "when did I conceive",
          "conception calculator",
          "date of conception",
          "pregnancy conception date",
          "when was my baby conceived",
          "free conception calculator",
          "conception from due date",
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
        method: {
          label: "Calculate Based On",
          helpText: "Choose the information you have available",
          options: {
            lmp: "Last Period (LMP)",
            dueDate: "Due Date",
            ultrasound: "Ultrasound",
          },
        },
        lmpDate: {
          label: "First Day of Last Period",
          helpText: "The first day of your most recent menstrual period",
        },
        dueDate: {
          label: "Your Due Date",
          helpText: "Your estimated due date from your healthcare provider",
        },
        ultrasoundDate: {
          label: "Ultrasound Date",
          helpText: "The date your ultrasound was performed",
        },
        cycleLength: {
          label: "Average Cycle Length",
          helpText: "Typical length of your menstrual cycle (22–44 days)",
        },
        gestationalWeeks: {
          label: "Gestational Age (Weeks)",
          helpText: "Weeks of pregnancy at the time of ultrasound",
        },
        gestationalDays: {
          label: "Gestational Age (Days)",
          helpText: "Additional days of gestational age at ultrasound",
        },
      },

      results: {
        conceptionDate: { label: "Estimated Conception Date" },
        conceptionRangeStart: { label: "Conception Window (Start)" },
        conceptionRangeEnd: { label: "Conception Window (End)" },
        ovulationDate: { label: "Estimated Ovulation Date" },
        intercourseWindowStart: { label: "Intercourse Window (Start)" },
        intercourseWindowEnd: { label: "Intercourse Window (End)" },
        estimatedDueDate: { label: "Estimated Due Date" },
      },

      presets: {
        regularCycle: {
          label: "Regular 28-Day Cycle",
          description: "Calculate from LMP with a standard cycle",
        },
        longCycle: {
          label: "Longer 35-Day Cycle",
          description: "Calculate from LMP with a longer cycle",
        },
        fromDueDate: {
          label: "From Due Date",
          description: "Reverse-calculate from your due date",
        },
        fromUltrasound: {
          label: "From Ultrasound",
          description: "Calculate from ultrasound gestational age",
        },
      },

      values: {
        days: "days",
        day: "day",
        weeks: "weeks",
        week: "week",
      },

      formats: {
        summary:
          "You most likely conceived around {conceptionDate}. Your fertile window was {windowStart} to {windowEnd}. Estimated due date: {dueDate}.",
      },

      infoCards: {
        metrics: {
          title: "Conception Timeline",
          items: [
            { label: "Estimated Conception", valueKey: "conceptionDate" },
            { label: "Conception Window", valueKey: "conceptionRange" },
            { label: "Ovulation Date", valueKey: "ovulationDate" },
            { label: "Estimated Due Date", valueKey: "estimatedDueDate" },
          ],
        },
        details: {
          title: "Fertile Window",
          items: [
            { label: "Intercourse Window", valueKey: "intercourseWindow" },
            { label: "Sperm Viability", valueKey: "spermViability" },
            { label: "Egg Viability", valueKey: "eggViability" },
            { label: "Cycle Length Used", valueKey: "cycleLengthUsed" },
          ],
        },
        tips: {
          title: "Important to Know",
          items: [
            "Conception typically occurs within 24 hours of ovulation when the egg is fertilized by sperm in the fallopian tube.",
            "Sperm can survive up to 5 days inside the body, so intercourse 1–5 days before ovulation can lead to conception.",
            "The most accurate conception estimates come from early ultrasounds (5–8 weeks), which measure the embryo directly.",
            "Your actual conception date may vary by 1–3 days from estimates — ovulation timing isn't always perfectly predictable.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is Conception?",
          content:
            "Conception refers to the moment a sperm cell fertilizes an egg cell, forming a zygote — the very first cell of a new human being. This typically happens in the fallopian tube within 12–24 hours after ovulation. While the terms 'conception' and 'fertilization' are often used interchangeably, some medical definitions consider conception to also include the subsequent implantation of the embryo into the uterine wall, which occurs 6–12 days later. Knowing your approximate conception date helps establish an accurate pregnancy timeline, confirm gestational age, and can be important for medical and personal reasons.",
        },
        howItWorks: {
          title: "How We Calculate Your Conception Date",
          content:
            "The calculation depends on which starting information you provide. From your Last Menstrual Period (LMP), we estimate ovulation by subtracting 14 from your cycle length — for a 28-day cycle, ovulation is around day 14 (LMP + 14 days). From a Due Date, we subtract 266 days (38 weeks) to find the likely conception date, since pregnancy averages 280 days from LMP but only 266 from conception. From an Ultrasound, we use the gestational age at the time of the scan to calculate backward to the conception date. In all methods, we add a ±2 day window around the conception estimate and a 5-day intercourse window before conception to account for sperm viability.",
        },
        considerations: {
          title: "Factors That Affect Accuracy",
          items: [
            {
              text: "Irregular cycles make LMP-based estimates less reliable — ovulation may occur earlier or later than expected.",
              type: "warning",
            },
            {
              text: "Early ultrasounds (5–8 weeks) are the most accurate method for dating, with accuracy within ±3–5 days.",
              type: "info",
            },
            {
              text: "Stress, illness, travel, and medications can shift ovulation timing within any given cycle.",
              type: "warning",
            },
            {
              text: "The luteal phase (time from ovulation to period) is relatively consistent at ~14 days for most women.",
              type: "info",
            },
            {
              text: "Sperm can survive up to 5 days, so intercourse several days before ovulation can result in conception.",
              type: "info",
            },
            {
              text: "This calculator provides estimates — only DNA testing can determine an exact conception date.",
              type: "warning",
            },
          ],
        },
        categories: {
          title: "Understanding Pregnancy Dates",
          items: [
            {
              text: "Gestational Age: Counted from the first day of your last period — adds ~2 weeks before actual conception.",
              type: "info",
            },
            {
              text: "Fetal Age: Counted from actual conception — typically 2 weeks less than gestational age.",
              type: "info",
            },
            {
              text: "Due Date: 280 days (40 weeks) from LMP, or 266 days (38 weeks) from conception.",
              type: "info",
            },
            {
              text: "Implantation: Occurs 6–12 days after conception when the embryo attaches to the uterine wall.",
              type: "info",
            },
            {
              text: "Viability: hCG becomes detectable about 3–4 days after implantation — earliest positive test ~10 DPO.",
              type: "info",
            },
            {
              text: "Trimesters: 1st (weeks 1–13), 2nd (weeks 14–27), 3rd (weeks 28–40) based on gestational age.",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description:
            "Step-by-step examples for each calculation method.",
          examples: [
            {
              title: "From Last Period (28-day cycle)",
              steps: [
                "LMP: January 1, 2026",
                "Cycle length: 28 days",
                "Ovulation day: 28 - 14 = day 14",
                "Ovulation date: January 1 + 14 = January 15",
                "Conception: ~January 15 (±2 days)",
                "Intercourse window: January 10–15",
                "Due date: January 1 + 280 = October 8, 2026",
              ],
              result:
                "Conceived around January 15, 2026. Due October 8, 2026.",
            },
            {
              title: "From Due Date",
              steps: [
                "Due date: September 15, 2026",
                "Subtract 266 days (38 weeks)",
                "Conception: ~December 23, 2025",
                "Conception window: December 21–25",
                "Intercourse window: December 18–23",
                "LMP (estimated): ~December 9, 2025",
              ],
              result:
                "Conceived around December 23, 2025. LMP ~December 9.",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How accurate is the conception date calculator?",
          answer:
            "The calculator provides an estimate within a window of about ±2 days for most women. Early ultrasound dating is the most accurate method (within ±3–5 days). LMP-based calculations assume regular cycles and standard ovulation timing. For the most precise dating, consult your healthcare provider.",
        },
        {
          question: "When does conception happen after intercourse?",
          answer:
            "Conception can happen within minutes to 5 days after intercourse. Sperm can survive in the female reproductive tract for up to 5 days, waiting for the egg. Once ovulation occurs, the egg is viable for only 12–24 hours. So conception happens within a day of ovulation, but the intercourse that led to it may have occurred days earlier.",
        },
        {
          question: "What's the difference between conception date and gestational age?",
          answer:
            "Gestational age is counted from the first day of your last menstrual period (LMP) and is about 2 weeks longer than the actual time since conception. So at 8 weeks gestational age, the baby has actually been developing for about 6 weeks since conception. Medical professionals use gestational age because LMP dates are more reliably known.",
        },
        {
          question: "Can I determine the exact day of conception?",
          answer:
            "No. Even with precise ovulation tracking, conception occurs over a window of time since sperm can wait for the egg. The calculator provides the most likely date and a probable range. Only genetic testing comparing conception dates with specific intercourse events could narrow it further.",
        },
        {
          question: "Why does the calculator ask about cycle length?",
          answer:
            "Cycle length affects when you ovulate. In a 28-day cycle, ovulation typically happens around day 14. In a 35-day cycle, it's around day 21. By adjusting for your actual cycle length, the calculator provides a more accurate conception estimate. The standard assumption is that the luteal phase (ovulation to period) is about 14 days.",
        },
        {
          question: "What if I have irregular periods?",
          answer:
            "If your cycles are irregular, LMP-based estimates will be less accurate. In this case, an early ultrasound (at 5–8 weeks) provides the best dating. You can also use the due date method if your provider has already established a due date from an ultrasound.",
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
      "name": "Calculadora de Fecha de Concepción",
      "slug": "calculadora-fecha-concepcion",
      "subtitle": "Estima cuándo ocurrió la concepción basándose en tu fecha de parto, última regla o ecografía — además de tu ventana fértil probable.",
      "breadcrumb": "Fecha de Concepción",
      "seo": {
        "title": "Calculadora de Fecha de Concepción - ¿Cuándo Concebí?",
        "description": "Descubre cuándo concebiste usando tu fecha de parto, última regla o fecha de ecografía. Ve tu fecha estimada de concepción, ventana fértil y cronograma de relaciones.",
        "shortDescription": "Estima tu fecha de concepción desde fecha de parto, FUR o ecografía.",
        "keywords": [
          "calculadora fecha concepción",
          "cuándo concebí",
          "calculadora concepción",
          "fecha de concepción",
          "fecha concepción embarazo",
          "cuándo fue concebido mi bebé",
          "calculadora concepción gratis",
          "concepción desde fecha parto"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "method": {
          "label": "Calcular Basándose En",
          "helpText": "Elige la información que tienes disponible",
          "options": {
            "lmp": "Última Regla (FUR)",
            "dueDate": "Fecha de Parto",
            "ultrasound": "Ecografía"
          }
        },
        "lmpDate": {
          "label": "Primer Día de la Última Regla",
          "helpText": "El primer día de tu período menstrual más reciente"
        },
        "dueDate": {
          "label": "Tu Fecha de Parto",
          "helpText": "Tu fecha estimada de parto de tu proveedor de salud"
        },
        "ultrasoundDate": {
          "label": "Fecha de Ecografía",
          "helpText": "La fecha en que se realizó tu ecografía"
        },
        "cycleLength": {
          "label": "Duración Promedio del Ciclo",
          "helpText": "Duración típica de tu ciclo menstrual (22–44 días)"
        },
        "gestationalWeeks": {
          "label": "Edad Gestacional (Semanas)",
          "helpText": "Semanas de embarazo al momento de la ecografía"
        },
        "gestationalDays": {
          "label": "Edad Gestacional (Días)",
          "helpText": "Días adicionales de edad gestacional en la ecografía"
        }
      },
      "results": {
        "conceptionDate": {
          "label": "Fecha Estimada de Concepción"
        },
        "conceptionRangeStart": {
          "label": "Ventana de Concepción (Inicio)"
        },
        "conceptionRangeEnd": {
          "label": "Ventana de Concepción (Fin)"
        },
        "ovulationDate": {
          "label": "Fecha Estimada de Ovulación"
        },
        "intercourseWindowStart": {
          "label": "Ventana de Relaciones (Inicio)"
        },
        "intercourseWindowEnd": {
          "label": "Ventana de Relaciones (Fin)"
        },
        "estimatedDueDate": {
          "label": "Fecha Estimada de Parto"
        }
      },
      "presets": {
        "regularCycle": {
          "label": "Ciclo Regular de 28 Días",
          "description": "Calcular desde FUR con un ciclo estándar"
        },
        "longCycle": {
          "label": "Ciclo Más Largo de 35 Días",
          "description": "Calcular desde FUR con un ciclo más largo"
        },
        "fromDueDate": {
          "label": "Desde Fecha de Parto",
          "description": "Calcular inversamente desde tu fecha de parto"
        },
        "fromUltrasound": {
          "label": "Desde Ecografía",
          "description": "Calcular desde la edad gestacional de la ecografía"
        }
      },
      "values": {
        "days": "días",
        "day": "día",
        "weeks": "semanas",
        "week": "semana"
      },
      "formats": {
        "summary": "Muy probablemente concebiste alrededor del {conceptionDate}. Tu ventana fértil fue del {windowStart} al {windowEnd}. Fecha estimada de parto: {dueDate}."
      },
      "infoCards": {
        "metrics": {
          "title": "Cronograma de Concepción",
          "items": [
            {
              "label": "Concepción Estimada",
              "valueKey": "conceptionDate"
            },
            {
              "label": "Ventana de Concepción",
              "valueKey": "conceptionRange"
            },
            {
              "label": "Fecha de Ovulación",
              "valueKey": "ovulationDate"
            },
            {
              "label": "Fecha Estimada de Parto",
              "valueKey": "estimatedDueDate"
            }
          ]
        },
        "details": {
          "title": "Ventana Fértil",
          "items": [
            {
              "label": "Ventana de Relaciones",
              "valueKey": "intercourseWindow"
            },
            {
              "label": "Viabilidad del Esperma",
              "valueKey": "spermViability"
            },
            {
              "label": "Viabilidad del Óvulo",
              "valueKey": "eggViability"
            },
            {
              "label": "Duración del Ciclo Usada",
              "valueKey": "cycleLengthUsed"
            }
          ]
        },
        "tips": {
          "title": "Importante Saber",
          "items": [
            "La concepción típicamente ocurre dentro de las 24 horas de la ovulación cuando el óvulo es fertilizado por el esperma en la trompa de Falopio.",
            "Los espermatozoides pueden sobrevivir hasta 5 días dentro del cuerpo, por lo que las relaciones 1–5 días antes de la ovulación pueden llevar a la concepción.",
            "Las estimaciones de concepción más precisas provienen de ecografías tempranas (5–8 semanas), que miden el embrión directamente.",
            "Tu fecha real de concepción puede variar 1–3 días de las estimaciones — el momento de la ovulación no siempre es perfectamente predecible."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué Es la Concepción?",
          "content": "La concepción se refiere al momento en que un espermatozoide fertiliza un óvulo, formando un cigoto — la primera célula de un nuevo ser humano. Esto típicamente ocurre en la trompa de Falopio dentro de las 12–24 horas después de la ovulación. Aunque los términos 'concepción' y 'fertilización' se usan frecuentemente de manera intercambiable, algunas definiciones médicas consideran que la concepción también incluye la implantación subsecuente del embrión en la pared uterina, que ocurre 6–12 días después. Conocer tu fecha aproximada de concepción ayuda a establecer un cronograma preciso del embarazo, confirmar la edad gestacional, y puede ser importante por razones médicas y personales."
        },
        "howItWorks": {
          "title": "Cómo Calculamos Tu Fecha de Concepción",
          "content": "El cálculo depende de qué información inicial proporcionas. Desde tu Fecha de Última Regla (FUR), estimamos la ovulación restando 14 de la duración de tu ciclo — para un ciclo de 28 días, la ovulación es alrededor del día 14 (FUR + 14 días). Desde una Fecha de Parto, restamos 266 días (38 semanas) para encontrar la fecha probable de concepción, ya que el embarazo promedia 280 días desde la FUR pero solo 266 desde la concepción. Desde una Ecografía, usamos la edad gestacional al momento del escaneo para calcular hacia atrás hasta la fecha de concepción. En todos los métodos, agregamos una ventana de ±2 días alrededor de la estimación de concepción y una ventana de relaciones de 5 días antes de la concepción para considerar la viabilidad del esperma."
        },
        "considerations": {
          "title": "Factores Que Afectan la Precisión",
          "items": [
            {
              "text": "Los ciclos irregulares hacen que las estimaciones basadas en FUR sean menos confiables — la ovulación puede ocurrir antes o después de lo esperado.",
              "type": "warning"
            },
            {
              "text": "Las ecografías tempranas (5–8 semanas) son el método más preciso para la datación, con precisión dentro de ±3–5 días.",
              "type": "info"
            },
            {
              "text": "El estrés, enfermedad, viajes y medicamentos pueden cambiar el momento de la ovulación dentro de cualquier ciclo dado.",
              "type": "warning"
            },
            {
              "text": "La fase lútea (tiempo desde ovulación hasta la regla) es relativamente consistente en ~14 días para la mayoría de las mujeres.",
              "type": "info"
            },
            {
              "text": "Los espermatozoides pueden sobrevivir hasta 5 días, por lo que las relaciones varios días antes de la ovulación pueden resultar en concepción.",
              "type": "info"
            },
            {
              "text": "Esta calculadora proporciona estimaciones — solo las pruebas de ADN pueden determinar una fecha exacta de concepción.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Entendiendo las Fechas del Embarazo",
          "items": [
            {
              "text": "Edad Gestacional: Contada desde el primer día de tu última regla — agrega ~2 semanas antes de la concepción real.",
              "type": "info"
            },
            {
              "text": "Edad Fetal: Contada desde la concepción real — típicamente 2 semanas menos que la edad gestacional.",
              "type": "info"
            },
            {
              "text": "Fecha de Parto: 280 días (40 semanas) desde FUR, o 266 días (38 semanas) desde la concepción.",
              "type": "info"
            },
            {
              "text": "Implantación: Ocurre 6–12 días después de la concepción cuando el embrión se adhiere a la pared uterina.",
              "type": "info"
            },
            {
              "text": "Viabilidad: La hCG se vuelve detectable aproximadamente 3–4 días después de la implantación — prueba positiva más temprana ~10 DPO.",
              "type": "info"
            },
            {
              "text": "Trimestres: 1º (semanas 1–13), 2º (semanas 14–27), 3º (semanas 28–40) basado en edad gestacional.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Ejemplos paso a paso para cada método de cálculo.",
          "examples": [
            {
              "title": "Desde Última Regla (ciclo de 28 días)",
              "steps": [
                "FUR: 1 de enero, 2026",
                "Duración del ciclo: 28 días",
                "Día de ovulación: 28 - 14 = día 14",
                "Fecha de ovulación: 1 de enero + 14 = 15 de enero",
                "Concepción: ~15 de enero (±2 días)",
                "Ventana de relaciones: 10–15 de enero",
                "Fecha de parto: 1 de enero + 280 = 8 de octubre, 2026"
              ],
              "result": "Concebido alrededor del 15 de enero, 2026. Parto 8 de octubre, 2026."
            },
            {
              "title": "Desde Fecha de Parto",
              "steps": [
                "Fecha de parto: 15 de septiembre, 2026",
                "Restar 266 días (38 semanas)",
                "Concepción: ~23 de diciembre, 2025",
                "Ventana de concepción: 21–25 de diciembre",
                "Ventana de relaciones: 18–23 de diciembre",
                "FUR (estimada): ~9 de diciembre, 2025"
              ],
              "result": "Concebido alrededor del 23 de diciembre, 2025. FUR ~9 de diciembre."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué tan precisa es la calculadora de fecha de concepción?",
          "answer": "La calculadora proporciona una estimación dentro de una ventana de aproximadamente ±2 días para la mayoría de las mujeres. La datación por ecografía temprana es el método más preciso (dentro de ±3–5 días). Los cálculos basados en FUR asumen ciclos regulares y momento de ovulación estándar. Para la datación más precisa, consulta a tu proveedor de salud."
        },
        {
          "question": "¿Cuándo ocurre la concepción después de las relaciones?",
          "answer": "La concepción puede ocurrir desde minutos hasta 5 días después de las relaciones. Los espermatozoides pueden sobrevivir en el tracto reproductivo femenino hasta 5 días, esperando al óvulo. Una vez que ocurre la ovulación, el óvulo es viable solo por 12–24 horas. Así que la concepción ocurre dentro de un día de la ovulación, pero las relaciones que la llevaron pueden haber ocurrido días antes."
        },
        {
          "question": "¿Cuál es la diferencia entre fecha de concepción y edad gestacional?",
          "answer": "La edad gestacional se cuenta desde el primer día de tu última regla (FUR) y es aproximadamente 2 semanas más larga que el tiempo real desde la concepción. Así que a las 8 semanas de edad gestacional, el bebé ha estado desarrollándose realmente por aproximadamente 6 semanas desde la concepción. Los profesionales médicos usan la edad gestacional porque las fechas de FUR se conocen más confiablemente."
        },
        {
          "question": "¿Puedo determinar el día exacto de la concepción?",
          "answer": "No. Incluso con seguimiento preciso de la ovulación, la concepción ocurre durante una ventana de tiempo ya que los espermatozoides pueden esperar al óvulo. La calculadora proporciona la fecha más probable y un rango probable. Solo las pruebas genéticas comparando fechas de concepción con eventos específicos de relaciones podrían precisarlo más."
        },
        {
          "question": "¿Por qué la calculadora pregunta sobre la duración del ciclo?",
          "answer": "La duración del ciclo afecta cuándo ovulas. En un ciclo de 28 días, la ovulación típicamente ocurre alrededor del día 14. En un ciclo de 35 días, es alrededor del día 21. Al ajustar por tu duración real del ciclo, la calculadora proporciona una estimación de concepción más precisa. La suposición estándar es que la fase lútea (ovulación a regla) es aproximadamente 14 días."
        },
        {
          "question": "¿Qué pasa si tengo períodos irregulares?",
          "answer": "Si tus ciclos son irregulares, las estimaciones basadas en FUR serán menos precisas. En este caso, una ecografía temprana (a las 5–8 semanas) proporciona la mejor datación. También puedes usar el método de fecha de parto si tu proveedor ya ha establecido una fecha de parto desde una ecografía."
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
      "name": "Calculadora de Data da Concepção",
      "slug": "calculadora-data-concepcao",
      "subtitle": "Estime quando a concepção ocorreu com base na sua data prevista do parto, última menstruação ou ultrassom — além da sua janela fértil provável.",
      "breadcrumb": "Data da Concepção",
      "seo": {
        "title": "Calculadora de Data da Concepção - Quando Eu Concebi?",
        "description": "Descubra quando você concebeu usando sua data prevista do parto, última menstruação ou data do ultrassom. Veja sua data estimada de concepção, janela fértil e cronograma de relações.",
        "shortDescription": "Estime sua data de concepção a partir da data prevista do parto, DUM ou ultrassom.",
        "keywords": [
          "calculadora data concepção",
          "quando eu concebi",
          "calculadora concepção",
          "data da concepção",
          "data concepção gravidez",
          "quando meu bebê foi concebido",
          "calculadora concepção grátis",
          "concepção pela data prevista parto"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "method": {
          "label": "Calcular Com Base Em",
          "helpText": "Escolha a informação que você tem disponível",
          "options": {
            "lmp": "Última Menstruação (DUM)",
            "dueDate": "Data Prevista do Parto",
            "ultrasound": "Ultrassom"
          }
        },
        "lmpDate": {
          "label": "Primeiro Dia da Última Menstruação",
          "helpText": "O primeiro dia do seu período menstrual mais recente"
        },
        "dueDate": {
          "label": "Sua Data Prevista do Parto",
          "helpText": "Sua data prevista do parto fornecida pelo seu médico"
        },
        "ultrasoundDate": {
          "label": "Data do Ultrassom",
          "helpText": "A data em que seu ultrassom foi realizado"
        },
        "cycleLength": {
          "label": "Duração Média do Ciclo",
          "helpText": "Duração típica do seu ciclo menstrual (22–44 dias)"
        },
        "gestationalWeeks": {
          "label": "Idade Gestacional (Semanas)",
          "helpText": "Semanas de gravidez no momento do ultrassom"
        },
        "gestationalDays": {
          "label": "Idade Gestacional (Dias)",
          "helpText": "Dias adicionais da idade gestacional no ultrassom"
        }
      },
      "results": {
        "conceptionDate": {
          "label": "Data Estimada da Concepção"
        },
        "conceptionRangeStart": {
          "label": "Janela de Concepção (Início)"
        },
        "conceptionRangeEnd": {
          "label": "Janela de Concepção (Fim)"
        },
        "ovulationDate": {
          "label": "Data Estimada da Ovulação"
        },
        "intercourseWindowStart": {
          "label": "Janela de Relação (Início)"
        },
        "intercourseWindowEnd": {
          "label": "Janela de Relação (Fim)"
        },
        "estimatedDueDate": {
          "label": "Data Prevista Estimada do Parto"
        }
      },
      "presets": {
        "regularCycle": {
          "label": "Ciclo Regular de 28 Dias",
          "description": "Calcular a partir da DUM com ciclo padrão"
        },
        "longCycle": {
          "label": "Ciclo Mais Longo de 35 Dias",
          "description": "Calcular a partir da DUM com ciclo mais longo"
        },
        "fromDueDate": {
          "label": "Pela Data Prevista do Parto",
          "description": "Calcular inversamente pela sua data prevista do parto"
        },
        "fromUltrasound": {
          "label": "Pelo Ultrassom",
          "description": "Calcular pela idade gestacional do ultrassom"
        }
      },
      "values": {
        "days": "dias",
        "day": "dia",
        "weeks": "semanas",
        "week": "semana"
      },
      "formats": {
        "summary": "Você provavelmente concebeu por volta de {conceptionDate}. Sua janela fértil foi de {windowStart} a {windowEnd}. Data prevista estimada do parto: {dueDate}."
      },
      "infoCards": {
        "metrics": {
          "title": "Cronograma da Concepção",
          "items": [
            {
              "label": "Concepção Estimada",
              "valueKey": "conceptionDate"
            },
            {
              "label": "Janela de Concepção",
              "valueKey": "conceptionRange"
            },
            {
              "label": "Data da Ovulação",
              "valueKey": "ovulationDate"
            },
            {
              "label": "Data Prevista Estimada do Parto",
              "valueKey": "estimatedDueDate"
            }
          ]
        },
        "details": {
          "title": "Janela Fértil",
          "items": [
            {
              "label": "Janela de Relação",
              "valueKey": "intercourseWindow"
            },
            {
              "label": "Viabilidade do Esperma",
              "valueKey": "spermViability"
            },
            {
              "label": "Viabilidade do Óvulo",
              "valueKey": "eggViability"
            },
            {
              "label": "Duração do Ciclo Utilizada",
              "valueKey": "cycleLengthUsed"
            }
          ]
        },
        "tips": {
          "title": "Importante Saber",
          "items": [
            "A concepção geralmente ocorre dentro de 24 horas da ovulação quando o óvulo é fertilizado pelo espermatozoide na tuba uterina.",
            "Os espermatozoides podem sobreviver até 5 dias dentro do corpo, então relações 1–5 dias antes da ovulação podem levar à concepção.",
            "As estimativas de concepção mais precisas vêm de ultrassons precoces (5–8 semanas), que medem o embrião diretamente.",
            "Sua data real de concepção pode variar 1–3 dias das estimativas — o momento da ovulação nem sempre é perfeitamente previsível."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O Que É Concepção?",
          "content": "A concepção refere-se ao momento em que um espermatozoide fertiliza um óvulo, formando um zigoto — a primeira célula de um novo ser humano. Isso geralmente acontece na tuba uterina dentro de 12–24 horas após a ovulação. Embora os termos 'concepção' e 'fertilização' sejam frequentemente usados de forma intercambiável, algumas definições médicas consideram que a concepção também inclui a implantação subsequente do embrião na parede uterina, que ocorre 6–12 dias depois. Conhecer sua data aproximada de concepção ajuda a estabelecer um cronograma preciso da gravidez, confirmar a idade gestacional e pode ser importante por razões médicas e pessoais."
        },
        "howItWorks": {
          "title": "Como Calculamos Sua Data de Concepção",
          "content": "O cálculo depende de qual informação inicial você fornece. A partir da sua Última Menstruação (DUM), estimamos a ovulação subtraindo 14 da duração do seu ciclo — para um ciclo de 28 dias, a ovulação é por volta do dia 14 (DUM + 14 dias). A partir da Data Prevista do Parto, subtraímos 266 dias (38 semanas) para encontrar a provável data de concepção, já que a gravidez tem em média 280 dias da DUM mas apenas 266 da concepção. A partir de um Ultrassom, usamos a idade gestacional no momento do exame para calcular retroativamente até a data de concepção. Em todos os métodos, adicionamos uma janela de ±2 dias em torno da estimativa de concepção e uma janela de 5 dias de relações antes da concepção para considerar a viabilidade do esperma."
        },
        "considerations": {
          "title": "Fatores Que Afetam a Precisão",
          "items": [
            {
              "text": "Ciclos irregulares tornam estimativas baseadas na DUM menos confiáveis — a ovulação pode ocorrer mais cedo ou mais tarde que o esperado.",
              "type": "warning"
            },
            {
              "text": "Ultrassons precoces (5–8 semanas) são o método mais preciso para datação, com precisão de ±3–5 dias.",
              "type": "info"
            },
            {
              "text": "Estresse, doença, viagem e medicamentos podem alterar o momento da ovulação em qualquer ciclo.",
              "type": "warning"
            },
            {
              "text": "A fase lútea (tempo da ovulação até a menstruação) é relativamente consistente em ~14 dias para a maioria das mulheres.",
              "type": "info"
            },
            {
              "text": "Os espermatozoides podem sobreviver até 5 dias, então relações vários dias antes da ovulação podem resultar em concepção.",
              "type": "info"
            },
            {
              "text": "Esta calculadora fornece estimativas — apenas testes de DNA podem determinar uma data exata de concepção.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Entendendo as Datas da Gravidez",
          "items": [
            {
              "text": "Idade Gestacional: Contada a partir do primeiro dia da sua última menstruação — adiciona ~2 semanas antes da concepção real.",
              "type": "info"
            },
            {
              "text": "Idade Fetal: Contada a partir da concepção real — geralmente 2 semanas menor que a idade gestacional.",
              "type": "info"
            },
            {
              "text": "Data Prevista do Parto: 280 dias (40 semanas) da DUM, ou 266 dias (38 semanas) da concepção.",
              "type": "info"
            },
            {
              "text": "Implantação: Ocorre 6–12 dias após a concepção quando o embrião se fixa na parede uterina.",
              "type": "info"
            },
            {
              "text": "Viabilidade: O hCG torna-se detectável cerca de 3–4 dias após a implantação — teste positivo mais cedo ~10 DPO.",
              "type": "info"
            },
            {
              "text": "Trimestres: 1º (semanas 1–13), 2º (semanas 14–27), 3º (semanas 28–40) baseado na idade gestacional.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Exemplos passo a passo para cada método de cálculo.",
          "examples": [
            {
              "title": "Pela Última Menstruação (ciclo de 28 dias)",
              "steps": [
                "DUM: 1º de janeiro de 2026",
                "Duração do ciclo: 28 dias",
                "Dia da ovulação: 28 - 14 = dia 14",
                "Data da ovulação: 1º de janeiro + 14 = 15 de janeiro",
                "Concepção: ~15 de janeiro (±2 dias)",
                "Janela de relações: 10–15 de janeiro",
                "Data prevista do parto: 1º de janeiro + 280 = 8 de outubro de 2026"
              ],
              "result": "Concebeu por volta de 15 de janeiro de 2026. Parto previsto para 8 de outubro de 2026."
            },
            {
              "title": "Pela Data Prevista do Parto",
              "steps": [
                "Data prevista do parto: 15 de setembro de 2026",
                "Subtrair 266 dias (38 semanas)",
                "Concepção: ~23 de dezembro de 2025",
                "Janela de concepção: 21–25 de dezembro",
                "Janela de relações: 18–23 de dezembro",
                "DUM (estimada): ~9 de dezembro de 2025"
              ],
              "result": "Concebeu por volta de 23 de dezembro de 2025. DUM ~9 de dezembro."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quão precisa é a calculadora de data de concepção?",
          "answer": "A calculadora fornece uma estimativa dentro de uma janela de cerca de ±2 dias para a maioria das mulheres. A datação por ultrassom precoce é o método mais preciso (±3–5 dias). Cálculos baseados na DUM assumem ciclos regulares e momento padrão de ovulação. Para datação mais precisa, consulte seu médico."
        },
        {
          "question": "Quando a concepção acontece após a relação sexual?",
          "answer": "A concepção pode acontecer entre minutos e 5 dias após a relação sexual. Os espermatozoides podem sobreviver no trato reprodutivo feminino por até 5 dias, esperando pelo óvulo. Uma vez que a ovulação ocorre, o óvulo é viável por apenas 12–24 horas. Então a concepção acontece dentro de um dia da ovulação, mas a relação que levou a ela pode ter ocorrido dias antes."
        },
        {
          "question": "Qual é a diferença entre data de concepção e idade gestacional?",
          "answer": "A idade gestacional é contada a partir do primeiro dia da sua última menstruação (DUM) e é cerca de 2 semanas maior que o tempo real desde a concepção. Então, com 8 semanas de idade gestacional, o bebê na verdade está se desenvolvendo há cerca de 6 semanas desde a concepção. Os médicos usam idade gestacional porque as datas da DUM são conhecidas de forma mais confiável."
        },
        {
          "question": "Posso determinar o dia exato da concepção?",
          "answer": "Não. Mesmo com rastreamento preciso da ovulação, a concepção ocorre ao longo de uma janela de tempo já que os espermatozoides podem esperar pelo óvulo. A calculadora fornece a data mais provável e um intervalo provável. Apenas testes genéticos comparando datas de concepção com eventos específicos de relação poderiam estreitar mais."
        },
        {
          "question": "Por que a calculadora pergunta sobre a duração do ciclo?",
          "answer": "A duração do ciclo afeta quando você ovula. Em um ciclo de 28 dias, a ovulação geralmente acontece por volta do dia 14. Em um ciclo de 35 dias, é por volta do dia 21. Ao ajustar para sua duração real do ciclo, a calculadora fornece uma estimativa de concepção mais precisa. A suposição padrão é que a fase lútea (ovulação até menstruação) seja cerca de 14 dias."
        },
        {
          "question": "E se eu tiver períodos irregulares?",
          "answer": "Se seus ciclos são irregulares, estimativas baseadas na DUM serão menos precisas. Neste caso, um ultrassom precoce (5–8 semanas) fornece a melhor datação. Você também pode usar o método da data prevista do parto se seu médico já estabeleceu uma data prevista através de ultrassom."
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
      "name": "Calculateur de Date de Conception",
      "slug": "calculateur-date-conception",
      "subtitle": "Estimez quand la conception a eu lieu en fonction de votre date d'accouchement, dernières règles, ou échographie — plus votre fenêtre de fertilité probable.",
      "breadcrumb": "Date de Conception",
      "seo": {
        "title": "Calculateur de Date de Conception - Quand Ai-Je Conçu ?",
        "description": "Découvrez quand vous avez conçu en utilisant votre date d'accouchement, dernières règles, ou date d'échographie. Voyez votre date de conception estimée, fenêtre fertile, et chronologie des rapports.",
        "shortDescription": "Estimez votre date de conception à partir de la date d'accouchement, DDR, ou échographie.",
        "keywords": [
          "calculateur date conception",
          "quand ai-je conçu",
          "calculateur conception",
          "date de conception",
          "date conception grossesse",
          "quand mon bébé a-t-il été conçu",
          "calculateur conception gratuit",
          "conception depuis date accouchement"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "method": {
          "label": "Calculer Basé Sur",
          "helpText": "Choisissez les informations dont vous disposez",
          "options": {
            "lmp": "Dernières Règles (DDR)",
            "dueDate": "Date d'Accouchement",
            "ultrasound": "Échographie"
          }
        },
        "lmpDate": {
          "label": "Premier Jour des Dernières Règles",
          "helpText": "Le premier jour de vos règles les plus récentes"
        },
        "dueDate": {
          "label": "Votre Date d'Accouchement",
          "helpText": "Votre date d'accouchement prévue par votre professionnel de santé"
        },
        "ultrasoundDate": {
          "label": "Date de l'Échographie",
          "helpText": "La date à laquelle votre échographie a été réalisée"
        },
        "cycleLength": {
          "label": "Durée Moyenne du Cycle",
          "helpText": "Durée typique de votre cycle menstruel (22–44 jours)"
        },
        "gestationalWeeks": {
          "label": "Âge Gestationnel (Semaines)",
          "helpText": "Semaines de grossesse au moment de l'échographie"
        },
        "gestationalDays": {
          "label": "Âge Gestationnel (Jours)",
          "helpText": "Jours supplémentaires d'âge gestationnel à l'échographie"
        }
      },
      "results": {
        "conceptionDate": {
          "label": "Date de Conception Estimée"
        },
        "conceptionRangeStart": {
          "label": "Fenêtre de Conception (Début)"
        },
        "conceptionRangeEnd": {
          "label": "Fenêtre de Conception (Fin)"
        },
        "ovulationDate": {
          "label": "Date d'Ovulation Estimée"
        },
        "intercourseWindowStart": {
          "label": "Fenêtre de Rapports (Début)"
        },
        "intercourseWindowEnd": {
          "label": "Fenêtre de Rapports (Fin)"
        },
        "estimatedDueDate": {
          "label": "Date d'Accouchement Estimée"
        }
      },
      "presets": {
        "regularCycle": {
          "label": "Cycle Régulier de 28 Jours",
          "description": "Calculer à partir des DDR avec un cycle standard"
        },
        "longCycle": {
          "label": "Cycle Plus Long de 35 Jours",
          "description": "Calculer à partir des DDR avec un cycle plus long"
        },
        "fromDueDate": {
          "label": "À partir de la Date d'Accouchement",
          "description": "Calculer à rebours à partir de votre date d'accouchement"
        },
        "fromUltrasound": {
          "label": "À partir de l'Échographie",
          "description": "Calculer à partir de l'âge gestationnel de l'échographie"
        }
      },
      "values": {
        "days": "jours",
        "day": "jour",
        "weeks": "semaines",
        "week": "semaine"
      },
      "formats": {
        "summary": "Vous avez très probablement conçu vers le {conceptionDate}. Votre fenêtre fertile était du {windowStart} au {windowEnd}. Date d'accouchement estimée : {dueDate}."
      },
      "infoCards": {
        "metrics": {
          "title": "Chronologie de la Conception",
          "items": [
            {
              "label": "Conception Estimée",
              "valueKey": "conceptionDate"
            },
            {
              "label": "Fenêtre de Conception",
              "valueKey": "conceptionRange"
            },
            {
              "label": "Date d'Ovulation",
              "valueKey": "ovulationDate"
            },
            {
              "label": "Date d'Accouchement Estimée",
              "valueKey": "estimatedDueDate"
            }
          ]
        },
        "details": {
          "title": "Fenêtre Fertile",
          "items": [
            {
              "label": "Fenêtre de Rapports",
              "valueKey": "intercourseWindow"
            },
            {
              "label": "Viabilité des Spermatozoïdes",
              "valueKey": "spermViability"
            },
            {
              "label": "Viabilité de l'Ovule",
              "valueKey": "eggViability"
            },
            {
              "label": "Durée de Cycle Utilisée",
              "valueKey": "cycleLengthUsed"
            }
          ]
        },
        "tips": {
          "title": "Important à Savoir",
          "items": [
            "La conception se produit généralement dans les 24 heures suivant l'ovulation lorsque l'ovule est fécondé par un spermatozoïde dans la trompe de Fallope.",
            "Les spermatozoïdes peuvent survivre jusqu'à 5 jours dans le corps, donc des rapports 1 à 5 jours avant l'ovulation peuvent mener à la conception.",
            "Les estimations de conception les plus précises proviennent des échographies précoces (5–8 semaines), qui mesurent directement l'embryon.",
            "Votre date réelle de conception peut varier de 1 à 3 jours par rapport aux estimations — le moment de l'ovulation n'est pas toujours parfaitement prévisible."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que la Conception ?",
          "content": "La conception fait référence au moment où un spermatozoïde féconde un ovule, formant un zygote — la toute première cellule d'un nouvel être humain. Cela se produit généralement dans la trompe de Fallope dans les 12–24 heures suivant l'ovulation. Bien que les termes 'conception' et 'fécondation' soient souvent utilisés de manière interchangeable, certaines définitions médicales considèrent que la conception inclut également l'implantation subséquente de l'embryon dans la paroi utérine, qui se produit 6–12 jours plus tard. Connaître votre date approximative de conception aide à établir une chronologie précise de grossesse, confirmer l'âge gestationnel, et peut être important pour des raisons médicales et personnelles."
        },
        "howItWorks": {
          "title": "Comment Nous Calculons Votre Date de Conception",
          "content": "Le calcul dépend des informations de départ que vous fournissez. À partir de vos Dernières Règles (DDR), nous estimons l'ovulation en soustrayant 14 de la durée de votre cycle — pour un cycle de 28 jours, l'ovulation est vers le jour 14 (DDR + 14 jours). À partir d'une Date d'Accouchement, nous soustrayons 266 jours (38 semaines) pour trouver la date probable de conception, car la grossesse dure en moyenne 280 jours depuis les DDR mais seulement 266 depuis la conception. À partir d'une Échographie, nous utilisons l'âge gestationnel au moment de l'examen pour calculer à rebours jusqu'à la date de conception. Dans toutes les méthodes, nous ajoutons une fenêtre de ±2 jours autour de l'estimation de conception et une fenêtre de rapports de 5 jours avant la conception pour tenir compte de la viabilité des spermatozoïdes."
        },
        "considerations": {
          "title": "Facteurs qui Affectent la Précision",
          "items": [
            {
              "text": "Les cycles irréguliers rendent les estimations basées sur les DDR moins fiables — l'ovulation peut se produire plus tôt ou plus tard que prévu.",
              "type": "warning"
            },
            {
              "text": "Les échographies précoces (5–8 semaines) sont la méthode la plus précise pour dater, avec une précision de ±3–5 jours.",
              "type": "info"
            },
            {
              "text": "Le stress, la maladie, les voyages et les médicaments peuvent décaler le moment de l'ovulation dans n'importe quel cycle donné.",
              "type": "warning"
            },
            {
              "text": "La phase lutéale (temps de l'ovulation aux règles) est relativement constante à ~14 jours pour la plupart des femmes.",
              "type": "info"
            },
            {
              "text": "Les spermatozoïdes peuvent survivre jusqu'à 5 jours, donc des rapports plusieurs jours avant l'ovulation peuvent résulter en conception.",
              "type": "info"
            },
            {
              "text": "Ce calculateur fournit des estimations — seuls les tests ADN peuvent déterminer une date exacte de conception.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Comprendre les Dates de Grossesse",
          "items": [
            {
              "text": "Âge Gestationnel : Compté depuis le premier jour de vos dernières règles — ajoute ~2 semaines avant la conception réelle.",
              "type": "info"
            },
            {
              "text": "Âge Fœtal : Compté depuis la conception réelle — généralement 2 semaines de moins que l'âge gestationnel.",
              "type": "info"
            },
            {
              "text": "Date d'Accouchement : 280 jours (40 semaines) depuis les DDR, ou 266 jours (38 semaines) depuis la conception.",
              "type": "info"
            },
            {
              "text": "Implantation : Se produit 6–12 jours après la conception lorsque l'embryon s'attache à la paroi utérine.",
              "type": "info"
            },
            {
              "text": "Viabilité : l'hCG devient détectable environ 3–4 jours après l'implantation — test positif le plus précoce ~10 DPO.",
              "type": "info"
            },
            {
              "text": "Trimestres : 1er (semaines 1–13), 2e (semaines 14–27), 3e (semaines 28–40) basés sur l'âge gestationnel.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Exemples étape par étape pour chaque méthode de calcul.",
          "examples": [
            {
              "title": "À partir des Dernières Règles (cycle de 28 jours)",
              "steps": [
                "DDR : 1er janvier 2026",
                "Durée du cycle : 28 jours",
                "Jour d'ovulation : 28 - 14 = jour 14",
                "Date d'ovulation : 1er janvier + 14 = 15 janvier",
                "Conception : ~15 janvier (±2 jours)",
                "Fenêtre de rapports : 10–15 janvier",
                "Date d'accouchement : 1er janvier + 280 = 8 octobre 2026"
              ],
              "result": "Conçu vers le 15 janvier 2026. Accouchement le 8 octobre 2026."
            },
            {
              "title": "À partir de la Date d'Accouchement",
              "steps": [
                "Date d'accouchement : 15 septembre 2026",
                "Soustraire 266 jours (38 semaines)",
                "Conception : ~23 décembre 2025",
                "Fenêtre de conception : 21–25 décembre",
                "Fenêtre de rapports : 18–23 décembre",
                "DDR (estimée) : ~9 décembre 2025"
              ],
              "result": "Conçu vers le 23 décembre 2025. DDR ~9 décembre."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la précision du calculateur de date de conception ?",
          "answer": "Le calculateur fournit une estimation dans une fenêtre d'environ ±2 jours pour la plupart des femmes. La datation par échographie précoce est la méthode la plus précise (dans les ±3–5 jours). Les calculs basés sur les DDR supposent des cycles réguliers et un moment d'ovulation standard. Pour une datation la plus précise, consultez votre professionnel de santé."
        },
        {
          "question": "Quand la conception se produit-elle après les rapports ?",
          "answer": "La conception peut se produire quelques minutes à 5 jours après les rapports. Les spermatozoïdes peuvent survivre dans l'appareil reproducteur féminin jusqu'à 5 jours, attendant l'ovule. Une fois l'ovulation survenue, l'ovule n'est viable que pendant 12–24 heures. Donc la conception se produit dans la journée suivant l'ovulation, mais les rapports qui y ont mené peuvent avoir eu lieu des jours plus tôt."
        },
        {
          "question": "Quelle est la différence entre date de conception et âge gestationnel ?",
          "answer": "L'âge gestationnel est compté depuis le premier jour de vos dernières règles (DDR) et est environ 2 semaines plus long que le temps réel depuis la conception. Donc à 8 semaines d'âge gestationnel, le bébé s'est en fait développé pendant environ 6 semaines depuis la conception. Les professionnels médicaux utilisent l'âge gestationnel car les dates de DDR sont plus fiablement connues."
        },
        {
          "question": "Puis-je déterminer le jour exact de la conception ?",
          "answer": "Non. Même avec un suivi précis de l'ovulation, la conception se produit sur une fenêtre de temps car les spermatozoïdes peuvent attendre l'ovule. Le calculateur fournit la date la plus probable et une plage probable. Seuls les tests génétiques comparant les dates de conception avec des événements de rapports spécifiques pourraient l'affiner davantage."
        },
        {
          "question": "Pourquoi le calculateur demande-t-il la durée du cycle ?",
          "answer": "La durée du cycle affecte quand vous ovulez. Dans un cycle de 28 jours, l'ovulation se produit généralement vers le jour 14. Dans un cycle de 35 jours, c'est vers le jour 21. En s'ajustant à votre durée réelle de cycle, le calculateur fournit une estimation de conception plus précise. L'hypothèse standard est que la phase lutéale (ovulation aux règles) est d'environ 14 jours."
        },
        {
          "question": "Que faire si j'ai des règles irrégulières ?",
          "answer": "Si vos cycles sont irréguliers, les estimations basées sur les DDR seront moins précises. Dans ce cas, une échographie précoce (à 5–8 semaines) fournit la meilleure datation. Vous pouvez aussi utiliser la méthode de date d'accouchement si votre professionnel a déjà établi une date d'accouchement à partir d'une échographie."
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
      "name": "Empfängnisdatum Rechner",
      "slug": "empfaengnisdatum-rechner",
      "subtitle": "Schätzen Sie ab, wann die Empfängnis stattgefunden hat, basierend auf Ihrem Geburtstermin, der letzten Periode oder dem Ultraschall — plus Ihr wahrscheinliches fruchtbares Fenster.",
      "breadcrumb": "Empfängnisdatum",
      "seo": {
        "title": "Empfängnisdatum Rechner - Wann wurde ich schwanger?",
        "description": "Finden Sie heraus, wann Sie empfangen haben, anhand Ihres Geburtstermins, der letzten Periode oder des Ultraschalldatums. Sehen Sie Ihr geschätztes Empfängnisdatum, fruchtbares Fenster und Zeitplan für Geschlechtsverkehr.",
        "shortDescription": "Schätzen Sie Ihr Empfängnisdatum anhand des Geburtstermins, der letzten Periode oder des Ultraschalls ab.",
        "keywords": [
          "empfängnisdatum rechner",
          "wann wurde ich schwanger",
          "empfängnis rechner",
          "datum der empfängnis",
          "schwangerschaft empfängnisdatum",
          "wann wurde mein baby empfangen",
          "kostenloser empfängnis rechner",
          "empfängnis vom geburtstermin"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "method": {
          "label": "Berechnen basierend auf",
          "helpText": "Wählen Sie die verfügbaren Informationen",
          "options": {
            "lmp": "Letzte Periode (LMP)",
            "dueDate": "Geburtstermin",
            "ultrasound": "Ultraschall"
          }
        },
        "lmpDate": {
          "label": "Erster Tag der letzten Periode",
          "helpText": "Der erste Tag Ihrer letzten Menstruation"
        },
        "dueDate": {
          "label": "Ihr Geburtstermin",
          "helpText": "Ihr geschätzter Geburtstermin von Ihrem Arzt"
        },
        "ultrasoundDate": {
          "label": "Ultraschalldatum",
          "helpText": "Das Datum, an dem Ihr Ultraschall durchgeführt wurde"
        },
        "cycleLength": {
          "label": "Durchschnittliche Zykluslänge",
          "helpText": "Typische Länge Ihres Menstruationszyklus (22–44 Tage)"
        },
        "gestationalWeeks": {
          "label": "Schwangerschaftswoche",
          "helpText": "Schwangerschaftswochen zum Zeitpunkt des Ultraschalls"
        },
        "gestationalDays": {
          "label": "Schwangerschaftstage",
          "helpText": "Zusätzliche Tage des Schwangerschaftsalters beim Ultraschall"
        }
      },
      "results": {
        "conceptionDate": {
          "label": "Geschätztes Empfängnisdatum"
        },
        "conceptionRangeStart": {
          "label": "Empfängnisfenster (Beginn)"
        },
        "conceptionRangeEnd": {
          "label": "Empfängnisfenster (Ende)"
        },
        "ovulationDate": {
          "label": "Geschätzter Eisprung"
        },
        "intercourseWindowStart": {
          "label": "Geschlechtsverkehr-Fenster (Beginn)"
        },
        "intercourseWindowEnd": {
          "label": "Geschlechtsverkehr-Fenster (Ende)"
        },
        "estimatedDueDate": {
          "label": "Geschätzter Geburtstermin"
        }
      },
      "presets": {
        "regularCycle": {
          "label": "Regelmäßiger 28-Tage-Zyklus",
          "description": "Berechnung von der letzten Periode mit Standardzyklus"
        },
        "longCycle": {
          "label": "Längerer 35-Tage-Zyklus",
          "description": "Berechnung von der letzten Periode mit längerem Zyklus"
        },
        "fromDueDate": {
          "label": "Vom Geburtstermin",
          "description": "Rückwärts-Berechnung von Ihrem Geburtstermin"
        },
        "fromUltrasound": {
          "label": "Vom Ultraschall",
          "description": "Berechnung vom Ultraschall-Schwangerschaftsalter"
        }
      },
      "values": {
        "days": "Tage",
        "day": "Tag",
        "weeks": "Wochen",
        "week": "Woche"
      },
      "formats": {
        "summary": "Sie haben höchstwahrscheinlich um den {conceptionDate} empfangen. Ihr fruchtbares Fenster war vom {windowStart} bis {windowEnd}. Geschätzter Geburtstermin: {dueDate}."
      },
      "infoCards": {
        "metrics": {
          "title": "Empfängnis-Zeitplan",
          "items": [
            {
              "label": "Geschätzte Empfängnis",
              "valueKey": "conceptionDate"
            },
            {
              "label": "Empfängnisfenster",
              "valueKey": "conceptionRange"
            },
            {
              "label": "Eisprung-Datum",
              "valueKey": "ovulationDate"
            },
            {
              "label": "Geschätzter Geburtstermin",
              "valueKey": "estimatedDueDate"
            }
          ]
        },
        "details": {
          "title": "Fruchtbares Fenster",
          "items": [
            {
              "label": "Geschlechtsverkehr-Fenster",
              "valueKey": "intercourseWindow"
            },
            {
              "label": "Spermien-Lebensfähigkeit",
              "valueKey": "spermViability"
            },
            {
              "label": "Eizellen-Lebensfähigkeit",
              "valueKey": "eggViability"
            },
            {
              "label": "Verwendete Zykluslänge",
              "valueKey": "cycleLengthUsed"
            }
          ]
        },
        "tips": {
          "title": "Wichtig zu wissen",
          "items": [
            "Die Empfängnis erfolgt typischerweise innerhalb von 24 Stunden nach dem Eisprung, wenn die Eizelle durch Spermien im Eileiter befruchtet wird.",
            "Spermien können bis zu 5 Tage im Körper überleben, sodass Geschlechtsverkehr 1–5 Tage vor dem Eisprung zu einer Empfängnis führen kann.",
            "Die genauesten Empfängnis-Schätzungen stammen von frühen Ultraschalluntersuchungen (5–8 Wochen), die den Embryo direkt messen.",
            "Ihr tatsächliches Empfängnisdatum kann um 1–3 Tage von den Schätzungen abweichen — der Eisprung-Zeitpunkt ist nicht immer perfekt vorhersagbar."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist Empfängnis?",
          "content": "Empfängnis bezeichnet den Moment, in dem eine Samenzelle eine Eizelle befruchtet und eine Zygote bildet — die allererste Zelle eines neuen Menschen. Dies geschieht typischerweise im Eileiter innerhalb von 12–24 Stunden nach dem Eisprung. Während die Begriffe 'Empfängnis' und 'Befruchtung' oft synonym verwendet werden, betrachten einige medizinische Definitionen die Empfängnis auch als die anschließende Einnistung des Embryos in die Gebärmutterwand, die 6–12 Tage später erfolgt. Das Wissen um Ihr ungefähres Empfängnisdatum hilft dabei, einen genauen Schwangerschaftszeitplan zu erstellen, das Schwangerschaftsalter zu bestätigen und kann aus medizinischen und persönlichen Gründen wichtig sein."
        },
        "howItWorks": {
          "title": "Wie wir Ihr Empfängnisdatum berechnen",
          "content": "Die Berechnung hängt davon ab, welche Ausgangsinformationen Sie angeben. Von Ihrer letzten Menstruation (LMP) schätzen wir den Eisprung, indem wir 14 von Ihrer Zykluslänge abziehen — bei einem 28-Tage-Zyklus ist der Eisprung um Tag 14 (LMP + 14 Tage). Von einem Geburtstermin ziehen wir 266 Tage (38 Wochen) ab, um das wahrscheinliche Empfängnisdatum zu finden, da eine Schwangerschaft durchschnittlich 280 Tage von der LMP, aber nur 266 von der Empfängnis dauert. Von einem Ultraschall verwenden wir das Schwangerschaftsalter zum Zeitpunkt der Untersuchung, um rückwärts zum Empfängnisdatum zu rechnen. Bei allen Methoden fügen wir ein ±2-Tage-Fenster um die Empfängnis-Schätzung und ein 5-Tage-Geschlechtsverkehr-Fenster vor der Empfängnis hinzu, um die Spermien-Lebensfähigkeit zu berücksichtigen."
        },
        "considerations": {
          "title": "Faktoren, die die Genauigkeit beeinflussen",
          "items": [
            {
              "text": "Unregelmäßige Zyklen machen LMP-basierte Schätzungen weniger zuverlässig — der Eisprung kann früher oder später als erwartet auftreten.",
              "type": "warning"
            },
            {
              "text": "Frühe Ultraschalluntersuchungen (5–8 Wochen) sind die genaueste Methode für die Datierung, mit einer Genauigkeit von ±3–5 Tagen.",
              "type": "info"
            },
            {
              "text": "Stress, Krankheit, Reisen und Medikamente können den Eisprung-Zeitpunkt in jedem Zyklus verschieben.",
              "type": "warning"
            },
            {
              "text": "Die Lutealphase (Zeit vom Eisprung zur Periode) ist bei den meisten Frauen relativ konstant bei ~14 Tagen.",
              "type": "info"
            },
            {
              "text": "Spermien können bis zu 5 Tage überleben, sodass Geschlechtsverkehr mehrere Tage vor dem Eisprung zu einer Empfängnis führen kann.",
              "type": "info"
            },
            {
              "text": "Dieser Rechner liefert Schätzungen — nur DNA-Tests können ein genaues Empfängnisdatum bestimmen.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Schwangerschaftsdaten verstehen",
          "items": [
            {
              "text": "Schwangerschaftsalter: Gezählt vom ersten Tag Ihrer letzten Periode — fügt ~2 Wochen vor der tatsächlichen Empfängnis hinzu.",
              "type": "info"
            },
            {
              "text": "Fetales Alter: Gezählt von der tatsächlichen Empfängnis — typischerweise 2 Wochen weniger als das Schwangerschaftsalter.",
              "type": "info"
            },
            {
              "text": "Geburtstermin: 280 Tage (40 Wochen) von der LMP oder 266 Tage (38 Wochen) von der Empfängnis.",
              "type": "info"
            },
            {
              "text": "Einnistung: Erfolgt 6–12 Tage nach der Empfängnis, wenn sich der Embryo an der Gebärmutterwand festsetzt.",
              "type": "info"
            },
            {
              "text": "Nachweisbarkeit: hCG wird etwa 3–4 Tage nach der Einnistung nachweisbar — frühester positiver Test ~10 Tage nach Eisprung.",
              "type": "info"
            },
            {
              "text": "Trimester: 1. (Wochen 1–13), 2. (Wochen 14–27), 3. (Wochen 28–40) basierend auf dem Schwangerschaftsalter.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt-Beispiele für jede Berechnungsmethode.",
          "examples": [
            {
              "title": "Von der letzten Periode (28-Tage-Zyklus)",
              "steps": [
                "LMP: 1. Januar 2026",
                "Zykluslänge: 28 Tage",
                "Eisprung-Tag: 28 - 14 = Tag 14",
                "Eisprung-Datum: 1. Januar + 14 = 15. Januar",
                "Empfängnis: ~15. Januar (±2 Tage)",
                "Geschlechtsverkehr-Fenster: 10.–15. Januar",
                "Geburtstermin: 1. Januar + 280 = 8. Oktober 2026"
              ],
              "result": "Empfangen um den 15. Januar 2026. Geburt am 8. Oktober 2026."
            },
            {
              "title": "Vom Geburtstermin",
              "steps": [
                "Geburtstermin: 15. September 2026",
                "Ziehe 266 Tage ab (38 Wochen)",
                "Empfängnis: ~23. Dezember 2025",
                "Empfängnisfenster: 21.–25. Dezember",
                "Geschlechtsverkehr-Fenster: 18.–23. Dezember",
                "LMP (geschätzt): ~9. Dezember 2025"
              ],
              "result": "Empfangen um den 23. Dezember 2025. LMP ~9. Dezember."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie genau ist der Empfängnisdatum-Rechner?",
          "answer": "Der Rechner bietet eine Schätzung innerhalb eines Fensters von etwa ±2 Tagen für die meisten Frauen. Die Ultraschall-Datierung in der Frühschwangerschaft ist die genaueste Methode (innerhalb von ±3–5 Tagen). LMP-basierte Berechnungen setzen regelmäßige Zyklen und Standard-Eisprung-Zeitpunkte voraus. Für die präziseste Datierung konsultieren Sie Ihren Arzt."
        },
        {
          "question": "Wann erfolgt die Empfängnis nach dem Geschlechtsverkehr?",
          "answer": "Die Empfängnis kann innerhalb von Minuten bis zu 5 Tagen nach dem Geschlechtsverkehr erfolgen. Spermien können im weiblichen Fortpflanzungstrakt bis zu 5 Tage überleben und auf die Eizelle warten. Sobald der Eisprung eintritt, ist die Eizelle nur 12–24 Stunden lebensfähig. Die Empfängnis erfolgt also innerhalb eines Tages nach dem Eisprung, aber der Geschlechtsverkehr, der dazu führte, kann Tage zuvor stattgefunden haben."
        },
        {
          "question": "Was ist der Unterschied zwischen Empfängnisdatum und Schwangerschaftsalter?",
          "answer": "Das Schwangerschaftsalter wird vom ersten Tag Ihrer letzten Menstruation (LMP) gezählt und ist etwa 2 Wochen länger als die tatsächliche Zeit seit der Empfängnis. Bei 8 Wochen Schwangerschaftsalter hat sich das Baby also tatsächlich etwa 6 Wochen seit der Empfängnis entwickelt. Mediziner verwenden das Schwangerschaftsalter, weil LMP-Daten zuverlässiger bekannt sind."
        },
        {
          "question": "Kann ich den genauen Tag der Empfängnis bestimmen?",
          "answer": "Nein. Selbst bei präziser Eisprung-Verfolgung erfolgt die Empfängnis über ein Zeitfenster, da Spermien auf die Eizelle warten können. Der Rechner liefert das wahrscheinlichste Datum und einen wahrscheinlichen Bereich. Nur Gentests, die Empfängnisdaten mit spezifischen Geschlechtsverkehr-Ereignissen vergleichen, könnten es weiter eingrenzen."
        },
        {
          "question": "Warum fragt der Rechner nach der Zykluslänge?",
          "answer": "Die Zykluslänge beeinflusst, wann Sie Ihren Eisprung haben. Bei einem 28-Tage-Zyklus erfolgt der Eisprung typischerweise um Tag 14. Bei einem 35-Tage-Zyklus ist es um Tag 21. Durch die Anpassung an Ihre tatsächliche Zykluslänge liefert der Rechner eine genauere Empfängnis-Schätzung. Die Standardannahme ist, dass die Lutealphase (Eisprung bis Periode) etwa 14 Tage beträgt."
        },
        {
          "question": "Was ist, wenn ich unregelmäßige Perioden habe?",
          "answer": "Wenn Ihre Zyklen unregelmäßig sind, werden LMP-basierte Schätzungen weniger genau sein. In diesem Fall bietet ein früher Ultraschall (bei 5–8 Wochen) die beste Datierung. Sie können auch die Geburtstermin-Methode verwenden, wenn Ihr Arzt bereits einen Geburtstermin durch Ultraschall festgelegt hat."
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

  inputs: [
    {
      id: "method",
      type: "radio",
      defaultValue: "lmp",
      options: [
        { value: "lmp" },
        { value: "dueDate" },
        { value: "ultrasound" },
      ],
    },
    {
      id: "lmpDate",
      type: "date",
      defaultValue: null,
      showWhen: { field: "method", value: "lmp" },
    },
    {
      id: "dueDate",
      type: "date",
      defaultValue: null,
      showWhen: { field: "method", value: "dueDate" },
    },
    {
      id: "ultrasoundDate",
      type: "date",
      defaultValue: null,
      showWhen: { field: "method", value: "ultrasound" },
    },
    {
      id: "cycleLength",
      type: "number",
      defaultValue: 28,
      min: 22,
      max: 44,
      step: 1,
      suffix: "days",
      showWhen: { field: "method", value: "lmp" },
    },
    {
      id: "gestationalWeeks",
      type: "number",
      defaultValue: 8,
      min: 4,
      max: 42,
      step: 1,
      suffix: "weeks",
      showWhen: { field: "method", value: "ultrasound" },
    },
    {
      id: "gestationalDays",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 6,
      step: 1,
      suffix: "days",
      showWhen: { field: "method", value: "ultrasound" },
    },
  ],

  inputGroups: [],

  results: [
    { id: "conceptionDate", type: "primary", format: "text" },
    { id: "conceptionRangeStart", type: "secondary", format: "text" },
    { id: "conceptionRangeEnd", type: "secondary", format: "text" },
    { id: "ovulationDate", type: "secondary", format: "text" },
    { id: "intercourseWindowStart", type: "secondary", format: "text" },
    { id: "intercourseWindowEnd", type: "secondary", format: "text" },
    { id: "estimatedDueDate", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "🔬", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    {
      id: "examples",
      type: "code-example",
      icon: "🧮",
      columns: 2,
      exampleCount: 2,
    },
  ],

  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ],

  references: [
    {
      authors: "American College of Obstetricians and Gynecologists",
      year: "2017",
      title:
        "Committee Opinion No. 700: Methods for Estimating the Due Date",
      source: "ACOG",
      url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date",
    },
    {
      authors: "American Pregnancy Association",
      year: "2024",
      title: "Calculating Conception",
      source: "American Pregnancy Association",
      url: "https://americanpregnancy.org/getting-pregnant/calculating-conception/",
    },
  ],

  hero: {
    badge: "ACOG Guidelines",
  },

  sidebar: {},
  features: {},
  relatedCalculators: [
    "pregnancy-due-date",
    "ovulation",
    "implantation",
    "pregnancy-weight-gain",
  ],
  ads: {},
};

// ─── HELPERS ───
function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date: Date): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function parseDate(val: unknown): Date | null {
  if (!val) return null;
  const str = val as string;
  if (!str || str.length < 8) return null;
  const d = new Date(str);
  if (isNaN(d.getTime())) return null;
  return d;
}

// ─── CALCULATE FUNCTION ───
export function calculateConceptionDate(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const method = (values.method as string) || "lmp";

  let conceptionDate: Date | null = null;
  let ovulationDate: Date | null = null;
  let estimatedDueDate: Date | null = null;
  let cycleLengthUsed = 28;

  if (method === "lmp") {
    const lmpDate = parseDate(values.lmpDate);
    if (!lmpDate) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }
    cycleLengthUsed = (values.cycleLength as number) || 28;
    const ovulationDay = cycleLengthUsed - 14;
    ovulationDate = addDays(lmpDate, ovulationDay);
    conceptionDate = ovulationDate;
    estimatedDueDate = addDays(lmpDate, 280);
  } else if (method === "dueDate") {
    const dueDateVal = parseDate(values.dueDate);
    if (!dueDateVal) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }
    conceptionDate = addDays(dueDateVal, -266);
    ovulationDate = conceptionDate;
    estimatedDueDate = dueDateVal;
  } else if (method === "ultrasound") {
    const usDate = parseDate(values.ultrasoundDate);
    if (!usDate) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }
    const gestWeeks = (values.gestationalWeeks as number) || 8;
    const gestDays = (values.gestationalDays as number) || 0;
    const totalGestDays = gestWeeks * 7 + gestDays;
    // Gestational age is from LMP, conception is ~14 days after LMP
    const daysSinceConception = totalGestDays - 14;
    conceptionDate = addDays(usDate, -daysSinceConception);
    ovulationDate = conceptionDate;
    const estimatedLmp = addDays(usDate, -totalGestDays);
    estimatedDueDate = addDays(estimatedLmp, 280);
  }

  if (!conceptionDate || !ovulationDate || !estimatedDueDate) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Conception window: ±2 days
  const conceptionRangeStart = addDays(conceptionDate, -2);
  const conceptionRangeEnd = addDays(conceptionDate, 2);

  // Intercourse window: 5 days before conception to conception day
  const intercourseWindowStart = addDays(conceptionDate, -5);
  const intercourseWindowEnd = conceptionDate;

  // Format
  const conceptionStr = formatDate(conceptionDate);
  const ovulationStr = formatDate(ovulationDate);
  const dueDateStr = formatDate(estimatedDueDate);
  const rangeStartStr = formatDate(conceptionRangeStart);
  const rangeEndStr = formatDate(conceptionRangeEnd);
  const interStartStr = formatDate(intercourseWindowStart);
  const interEndStr = formatDate(intercourseWindowEnd);

  const daysLabel = v["days"] || "days";

  const summaryText =
    f.summary
      ?.replace("{conceptionDate}", conceptionStr)
      .replace("{windowStart}", interStartStr)
      .replace("{windowEnd}", interEndStr)
      .replace("{dueDate}", dueDateStr) ||
    `You most likely conceived around ${conceptionStr}. Due date: ${dueDateStr}.`;

  return {
    values: {
      conceptionDate: conceptionStr,
      conceptionRangeStart: rangeStartStr,
      conceptionRangeEnd: rangeEndStr,
      ovulationDate: ovulationStr,
      intercourseWindowStart: interStartStr,
      intercourseWindowEnd: interEndStr,
      estimatedDueDate: dueDateStr,
      // For infoCards
      conceptionRange: `${rangeStartStr} – ${rangeEndStr}`,
      intercourseWindow: `${interStartStr} – ${interEndStr}`,
      spermViability: `Up to 5 ${daysLabel}`,
      eggViability: `12–24 hours`,
      cycleLengthUsed: `${cycleLengthUsed} ${daysLabel}`,
    },
    formatted: {
      conceptionDate: conceptionStr,
      conceptionRangeStart: rangeStartStr,
      conceptionRangeEnd: rangeEndStr,
      ovulationDate: ovulationStr,
      intercourseWindowStart: interStartStr,
      intercourseWindowEnd: interEndStr,
      estimatedDueDate: dueDateStr,
    },
    summary: summaryText,
    isValid: true,
  };
}

export default conceptionDateConfig;
