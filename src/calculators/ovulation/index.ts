import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─── CONFIG ─────────────────────────────────────────────────────────────────
export const ovulationConfig: CalculatorConfigV4 = {
  id: "ovulation",
  version: "4.0",
  category: "health",
  icon: "🌸",

  // ─── PRESETS ────────────────────────────────────────────────────────────────
  presets: [
    {
      id: "regularCycle",
      icon: "📅",
      values: {
        lmpMonth: "2",
        lmpDay: 1,
        cycleLength: 28,
        lutealPhase: 14,
        goal: "conceive",
      },
    },
    {
      id: "shortCycle",
      icon: "⚡",
      values: {
        lmpMonth: "2",
        lmpDay: 1,
        cycleLength: 24,
        lutealPhase: 13,
        goal: "conceive",
      },
    },
    {
      id: "longCycle",
      icon: "🕐",
      values: {
        lmpMonth: "2",
        lmpDay: 1,
        cycleLength: 35,
        lutealPhase: 14,
        goal: "track",
      },
    },
  ],

  // ─── TRANSLATIONS (EN ONLY) ─────────────────────────────────────────────────
  t: {
    en: {
      name: "Ovulation Calculator",
      slug: "ovulation",
      subtitle: "Track your fertile window, predict ovulation day, and plan ahead with a 6-month fertility calendar.",
      breadcrumb: "Ovulation",

      seo: {
        title: "Ovulation Calculator - Free Fertility Window Tracker",
        description: "Track your ovulation date and fertile window based on your cycle. Get a 6-month fertility calendar with peak days, implantation window, and due date estimates.",
        shortDescription: "Find your fertile days and ovulation date.",
        keywords: [
          "ovulation calculator",
          "fertility calculator",
          "ovulation calendar",
          "when am i most fertile",
          "fertile window calculator",
          "free ovulation tracker",
          "conception calculator",
          "ovulation predictor",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Cycle Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        lmpMonth: {
          label: "Last Period — Month",
          helpText: "Month your last menstrual period started",
          options: {
            "1": "January",
            "2": "February",
            "3": "March",
            "4": "April",
            "5": "May",
            "6": "June",
            "7": "July",
            "8": "August",
            "9": "September",
            "10": "October",
            "11": "November",
            "12": "December",
          },
        },
        lmpDay: {
          label: "Last Period — Day",
          helpText: "Day your last period started (1-31)",
        },
        cycleLength: {
          label: "Cycle Length",
          helpText: "Average number of days from the first day of one period to the first day of the next (21-45 days, average is 28)",
        },
        lutealPhase: {
          label: "Luteal Phase Length",
          helpText: "Days between ovulation and your next period (default 14, typical range 10-16). Leave at 14 if unsure.",
        },
        goal: {
          label: "Tracking Goal",
          helpText: "Helps tailor tips and information to your needs",
          options: {
            conceive: "Trying to Conceive",
            track: "Track My Cycle",
            avoid: "Avoid Pregnancy",
          },
        },
      },

      results: {
        ovulationDate: { label: "Estimated Ovulation Date" },
        fertileWindowStart: { label: "Fertile Window Opens" },
        fertileWindowEnd: { label: "Fertile Window Closes" },
        peakFertility: { label: "Peak Fertility Days" },
        nextPeriod: { label: "Next Period Expected" },
        implantationWindow: { label: "Implantation Window" },
        pregnancyTestDate: { label: "Earliest Pregnancy Test" },
        dueDateIfConceived: { label: "Est. Due Date if Conceived" },
      },

      presets: {
        regularCycle: {
          label: "Regular 28-Day",
          description: "Standard 28-day cycle with 14-day luteal phase",
        },
        shortCycle: {
          label: "Short Cycle (24)",
          description: "Shorter 24-day cycle — ovulation occurs earlier",
        },
        longCycle: {
          label: "Long Cycle (35)",
          description: "Longer 35-day cycle — ovulation occurs later",
        },
      },

      values: {
        days: "days",
        day: "day",
        to: "to",
        and: "and",
        cycle: "cycle",
        "day-of-cycle": "day of cycle",
      },

      formats: {
        summary: "Ovulation estimated on {ovulationDate}. Fertile window: {fertileStart} to {fertileEnd}. Next period expected {nextPeriod}.",
      },

      infoCards: {
        fertility: {
          title: "Your Fertility Window",
          items: [
            { label: "Ovulation Date", valueKey: "ovulationDate" },
            { label: "Fertile Window", valueKey: "fertileWindowFull" },
            { label: "Peak Fertility", valueKey: "peakFertility" },
            { label: "Next Period", valueKey: "nextPeriod" },
          ],
        },
        planning: {
          title: "Conception Planning",
          items: [
            { label: "Implantation Window", valueKey: "implantationWindow" },
            { label: "Pregnancy Test Date", valueKey: "pregnancyTestDate" },
            { label: "Due Date if Conceived", valueKey: "dueDateIfConceived" },
            { label: "Cycle Day of Ovulation", valueKey: "ovulationCycleDay" },
          ],
        },
        tips: {
          title: "Fertility Tips",
          items: [
            "Your most fertile days are the 2 days before ovulation and ovulation day itself. Sperm can survive up to 5 days inside the body, so having intercourse before ovulation is ideal.",
            "Track basal body temperature (BBT) each morning before getting up. A sustained rise of 0.2°C (0.4°F) confirms ovulation has occurred.",
            "Monitor cervical mucus changes — fertile mucus resembles raw egg whites (clear, stretchy, slippery). This indicates you're approaching ovulation.",
            "Ovulation predictor kits (OPKs) detect the LH surge that happens 24-36 hours before ovulation. Test in the afternoon for best accuracy.",
          ],
        },
      },

      detailedTable: {
        fertilityCalendar: {
          button: "View 6-Month Fertility Calendar",
          title: "6-Month Fertility Calendar",
          columns: {
            month: "Month",
            periodStart: "Period Start",
            fertileStart: "Fertile Opens",
            peakDays: "Peak Days",
            ovulation: "Ovulation",
            nextPeriod: "Next Period",
            dueDate: "Due Date if Conceived",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is Ovulation?",
          content: "Ovulation is the release of a mature egg from one of the ovaries, occurring once per menstrual cycle. The egg travels down the fallopian tube where it can be fertilized by sperm for approximately 12 to 24 hours. This calculator estimates your ovulation date using the calendar method: it subtracts your luteal phase length (typically 14 days) from your total cycle length. For example, in a 28-day cycle with a 14-day luteal phase, ovulation occurs around day 14. In a 32-day cycle, ovulation would be around day 18. Understanding your ovulation timing is key for both conception planning and natural family planning.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content: "This calculator uses the calendar-based method to predict your fertile days. It takes your last menstrual period (LMP) date and cycle length, then subtracts the luteal phase (the post-ovulation phase, typically 14 days) to estimate ovulation day. Your fertile window spans 5 days before ovulation through ovulation day itself — a total of 6 days — because sperm can survive up to 5 days in the reproductive tract. The calculator also projects your next 6 cycles, estimates implantation timing (6-12 days after ovulation), and calculates a potential due date using Naegele's rule (LMP + 280 days). For maximum accuracy, track 3+ cycles to determine your average cycle length.",
        },
        signs: {
          title: "Signs and Symptoms of Ovulation",
          items: [
            { text: "Cervical mucus becomes clear, stretchy, and slippery — resembling raw egg whites. This 'fertile-quality' mucus helps sperm travel to the egg.", type: "info" },
            { text: "Basal body temperature (BBT) rises 0.2-0.5°C (0.4-1.0°F) after ovulation due to increased progesterone. Track daily to confirm ovulation patterns.", type: "info" },
            { text: "Mild pelvic pain or cramping on one side (mittelschmerz) — about 20% of women feel this during egg release from the ovary.", type: "info" },
            { text: "Increased libido is nature's way of promoting conception — many women notice heightened desire around ovulation.", type: "info" },
            { text: "Light spotting may occur at ovulation in some women. This is normal and caused by the brief hormone shift when the egg releases.", type: "info" },
            { text: "Important: These signs vary widely between women. Ovulation predictor kits (OPKs) provide more reliable confirmation than symptoms alone.", type: "warning" },
          ],
        },
        factors: {
          title: "Factors That Affect Ovulation",
          items: [
            { text: "Stress — high cortisol levels can delay or suppress ovulation entirely. Chronic stress may cause irregular cycles.", type: "warning" },
            { text: "Body weight — BMI below 18.5 or above 30 can disrupt ovulation. Maintaining a healthy weight supports regular cycles.", type: "info" },
            { text: "Age — fertility peaks in your 20s and gradually declines after 35. Egg quality and ovulation regularity decrease with age.", type: "info" },
            { text: "Exercise — moderate exercise supports fertility, but excessive training (marathon, triathlon) can suppress ovulation.", type: "info" },
            { text: "Medical conditions — PCOS, thyroid disorders, and endometriosis commonly affect ovulation timing and regularity.", type: "warning" },
            { text: "Medications — hormonal contraceptives, some antidepressants, and anti-inflammatories can affect ovulation.", type: "info" },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step ovulation date calculation",
          examples: [
            {
              title: "28-Day Cycle — Last Period Feb 1",
              steps: [
                "Last Menstrual Period (LMP) = February 1",
                "Cycle length = 28 days, Luteal phase = 14 days",
                "Ovulation day = 28 − 14 = day 14 of cycle",
                "Ovulation date = Feb 1 + 13 days = February 14",
                "Fertile window = Feb 9 (day 9) through Feb 14 (day 14)",
                "Peak fertility = Feb 12–13 (days 12-13)",
                "Next period = Feb 1 + 28 = March 1",
                "Due date if conceived = Feb 1 + 280 = November 8",
              ],
              result: "Ovulation ~Feb 14 · Fertile Feb 9–14 · Peak Feb 12–13",
            },
            {
              title: "32-Day Cycle — Last Period Jan 15",
              steps: [
                "Last Menstrual Period (LMP) = January 15",
                "Cycle length = 32 days, Luteal phase = 14 days",
                "Ovulation day = 32 − 14 = day 18 of cycle",
                "Ovulation date = Jan 15 + 17 days = February 1",
                "Fertile window = Jan 27 (day 13) through Feb 1 (day 18)",
                "Peak fertility = Jan 30–31 (days 16-17)",
                "Next period = Jan 15 + 32 = February 16",
              ],
              result: "Ovulation ~Feb 1 · Fertile Jan 27–Feb 1 · Peak Jan 30–31",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How accurate is an ovulation calculator?",
          answer: "Calendar-based ovulation calculators are a helpful estimate but not 100% precise. They work best for women with regular cycles (variation of 3 days or less). Studies show that only about 30% of women ovulate exactly on day 14 — ovulation can occur anywhere from day 11 to day 21 in a typical cycle. For greater accuracy, combine this calculator with ovulation predictor kits (OPKs), basal body temperature tracking, and cervical mucus observation.",
        },
        {
          question: "When am I most fertile during my cycle?",
          answer: "You are most fertile in the 2 days before ovulation and on ovulation day itself. This is because the egg only survives 12-24 hours after release, while sperm can survive up to 5 days in the reproductive tract. Your total fertile window is about 6 days: 5 days before ovulation plus ovulation day. Having intercourse every 1-2 days during this window maximizes your chances of conception.",
        },
        {
          question: "Can I use this calculator to avoid pregnancy?",
          answer: "While this calculator shows your estimated fertile days, it should NOT be relied upon as your sole method of contraception. The calendar method alone has a typical failure rate of about 12-24% per year because ovulation timing can vary unexpectedly due to stress, illness, travel, or hormonal changes. If you want to use fertility awareness for birth control, consider combining multiple tracking methods (BBT, cervical mucus, OPKs) and consult a healthcare provider for proper training.",
        },
        {
          question: "What is the luteal phase and why does it matter?",
          answer: "The luteal phase is the time between ovulation and the start of your next period, typically lasting 12-16 days (average 14). Unlike the follicular phase (before ovulation), which can vary significantly, the luteal phase is relatively consistent for each woman. This is why the calculator subtracts your luteal phase from your cycle length to estimate ovulation. A luteal phase shorter than 10 days may indicate a luteal phase defect, which can affect implantation — consult your doctor if you suspect this.",
        },
        {
          question: "What if my cycles are irregular?",
          answer: "If your cycles vary by more than 7 days from month to month, calendar-based predictions become less reliable. Track your cycles for at least 3-6 months to find your average length, and use the shortest cycle for a conservative estimate. Irregular cycles can be caused by PCOS, thyroid issues, stress, or significant weight changes. Consider using OPKs alongside this calculator for better accuracy, and see your doctor if cycles consistently fall outside the 21-45 day range.",
        },
        {
          question: "How soon after ovulation can I take a pregnancy test?",
          answer: "The earliest you can get a reliable pregnancy test result is about 12-14 days after ovulation, which is roughly the day your period is expected. Home pregnancy tests detect hCG, a hormone produced after the embryo implants in the uterine lining. Implantation typically occurs 6-12 days after ovulation. Testing too early can give a false negative because hCG levels haven't risen enough. For the most accurate results, wait until the first day of your missed period.",
        },
        {
          question: "Does age affect my ovulation and fertility?",
          answer: "Yes, age significantly impacts fertility. Women are most fertile in their 20s, with fertility gradually declining after age 30 and more rapidly after 35. By age 40, the chance of natural conception per cycle drops to about 5%. This decline is due to fewer remaining eggs, lower egg quality, and less regular ovulation. If you're 35+ and have been trying to conceive for 6 months without success (or 12 months if under 35), consult a fertility specialist.",
        },
        {
          question: "Can I ovulate more than once per cycle?",
          answer: "While rare, it is possible to release two eggs within the same 24-hour window — this is how fraternal twins are conceived. However, you cannot have two separate ovulation events days apart within the same cycle. Once ovulation occurs and progesterone rises, further ovulation is suppressed. What some women experience as 'double ovulation' is actually two eggs released nearly simultaneously from the same LH surge.",
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
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },

      chart: {
        title: "Fertility Window — Current Cycle",
        xLabel: "Cycle Day",
        yLabel: "Fertility Level",
        series: {
          fertility: "Fertility",
        },
      },
    },
    es: {
      "name": "Calculadora de Ovulación",
      "slug": "calculadora-ovulacion",
      "subtitle": "Rastrea tu ventana fértil, predice el día de ovulación y planifica con un calendario de fertilidad de 6 meses.",
      "breadcrumb": "Ovulación",
      "seo": {
        "title": "Calculadora de Ovulación - Rastreador Gratuito de Ventana Fértil",
        "description": "Rastrea tu fecha de ovulación y ventana fértil basado en tu ciclo. Obtén un calendario de fertilidad de 6 meses con días pico, ventana de implantación y estimaciones de fecha de parto.",
        "shortDescription": "Encuentra tus días fértiles y fecha de ovulación.",
        "keywords": [
          "calculadora de ovulación",
          "calculadora de fertilidad",
          "calendario de ovulación",
          "cuándo soy más fértil",
          "calculadora ventana fértil",
          "rastreador ovulación gratis",
          "calculadora concepción",
          "predictor ovulación"
        ]
      },
      "inputs": {
        "lmpMonth": {
          "label": "Última Regla — Mes",
          "helpText": "Mes en que comenzó tu último período menstrual",
          "options": {
            "1": "Enero",
            "2": "Febrero",
            "3": "Marzo",
            "4": "Abril",
            "5": "Mayo",
            "6": "Junio",
            "7": "Julio",
            "8": "Agosto",
            "9": "Septiembre",
            "10": "Octubre",
            "11": "Noviembre",
            "12": "Diciembre"
          }
        },
        "lmpDay": {
          "label": "Última Regla — Día",
          "helpText": "Día en que comenzó tu último período (1-31)"
        },
        "cycleLength": {
          "label": "Duración del Ciclo",
          "helpText": "Número promedio de días desde el primer día de un período hasta el primer día del siguiente (21-45 días, promedio es 28)"
        },
        "lutealPhase": {
          "label": "Duración de Fase Lútea",
          "helpText": "Días entre la ovulación y tu siguiente período (por defecto 14, rango típico 10-16). Deja en 14 si no estás segura."
        },
        "goal": {
          "label": "Objetivo de Seguimiento",
          "helpText": "Ayuda a personalizar consejos e información para tus necesidades",
          "options": {
            "conceive": "Intentando Concebir",
            "track": "Rastrear Mi Ciclo",
            "avoid": "Evitar Embarazo"
          }
        }
      },
      "results": {
        "ovulationDate": {
          "label": "Fecha de Ovulación Estimada"
        },
        "fertileWindowStart": {
          "label": "Ventana Fértil Se Abre"
        },
        "fertileWindowEnd": {
          "label": "Ventana Fértil Se Cierra"
        },
        "peakFertility": {
          "label": "Días de Fertilidad Máxima"
        },
        "nextPeriod": {
          "label": "Próximo Período Esperado"
        },
        "implantationWindow": {
          "label": "Ventana de Implantación"
        },
        "pregnancyTestDate": {
          "label": "Prueba de Embarazo Más Temprana"
        },
        "dueDateIfConceived": {
          "label": "Fecha de Parto Est. si Concebes"
        }
      },
      "presets": {
        "regularCycle": {
          "label": "Ciclo Regular de 28 Días",
          "description": "Ciclo estándar de 28 días con fase lútea de 14 días"
        },
        "shortCycle": {
          "label": "Ciclo Corto (24)",
          "description": "Ciclo más corto de 24 días — la ovulación ocurre más temprano"
        },
        "longCycle": {
          "label": "Ciclo Largo (35)",
          "description": "Ciclo más largo de 35 días — la ovulación ocurre más tarde"
        }
      },
      "values": {
        "days": "días",
        "day": "día",
        "to": "a",
        "and": "y",
        "cycle": "ciclo",
        "day-of-cycle": "día del ciclo"
      },
      "formats": {
        "summary": "Ovulación estimada el {ovulationDate}. Ventana fértil: {fertileStart} a {fertileEnd}. Próximo período esperado {nextPeriod}."
      },
      "infoCards": {
        "fertility": {
          "title": "Tu Ventana de Fertilidad",
          "items": [
            {
              "label": "Fecha de Ovulación",
              "valueKey": "ovulationDate"
            },
            {
              "label": "Ventana Fértil",
              "valueKey": "fertileWindowFull"
            },
            {
              "label": "Fertilidad Máxima",
              "valueKey": "peakFertility"
            },
            {
              "label": "Próximo Período",
              "valueKey": "nextPeriod"
            }
          ]
        },
        "planning": {
          "title": "Planificación de Concepción",
          "items": [
            {
              "label": "Ventana de Implantación",
              "valueKey": "implantationWindow"
            },
            {
              "label": "Fecha de Prueba de Embarazo",
              "valueKey": "pregnancyTestDate"
            },
            {
              "label": "Fecha de Parto si Concebes",
              "valueKey": "dueDateIfConceived"
            },
            {
              "label": "Día del Ciclo de Ovulación",
              "valueKey": "ovulationCycleDay"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Fertilidad",
          "items": [
            "Tus días más fértiles son los 2 días antes de la ovulación y el día de ovulación mismo. Los espermatozoides pueden sobrevivir hasta 5 días dentro del cuerpo, por lo que tener relaciones antes de la ovulación es ideal.",
            "Rastrea la temperatura corporal basal (TCB) cada mañana antes de levantarte. Un aumento sostenido de 0.2°C (0.4°F) confirma que la ovulación ha ocurrido.",
            "Monitorea los cambios en el moco cervical — el moco fértil se parece a las claras de huevo crudas (claro, elástico, resbaladizo). Esto indica que te acercas a la ovulación.",
            "Los kits predictores de ovulación (OPKs) detectan el pico de LH que ocurre 24-36 horas antes de la ovulación. Haz la prueba por la tarde para mayor precisión."
          ]
        }
      },
      "detailedTable": {
        "fertilityCalendar": {
          "button": "Ver Calendario de Fertilidad de 6 Meses",
          "title": "Calendario de Fertilidad de 6 Meses",
          "columns": {
            "month": "Mes",
            "periodStart": "Inicio Período",
            "fertileStart": "Fértil Se Abre",
            "peakDays": "Días Pico",
            "ovulation": "Ovulación",
            "nextPeriod": "Próximo Período",
            "dueDate": "Fecha de Parto si Concebes"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué Es la Ovulación?",
          "content": "La ovulación es la liberación de un óvulo maduro de uno de los ovarios, que ocurre una vez por ciclo menstrual. El óvulo viaja por la trompa de Falopio donde puede ser fertilizado por espermatozoides durante aproximadamente 12 a 24 horas. Esta calculadora estima tu fecha de ovulación usando el método del calendario: resta la duración de tu fase lútea (típicamente 14 días) de la duración total de tu ciclo. Por ejemplo, en un ciclo de 28 días con una fase lútea de 14 días, la ovulación ocurre alrededor del día 14. En un ciclo de 32 días, la ovulación sería alrededor del día 18. Entender el momento de tu ovulación es clave tanto para planificar la concepción como para la planificación familiar natural."
        },
        "howItWorks": {
          "title": "Cómo Funciona Esta Calculadora",
          "content": "Esta calculadora usa el método basado en calendario para predecir tus días fértiles. Toma la fecha de tu último período menstrual (UPM) y la duración del ciclo, luego resta la fase lútea (la fase post-ovulación, típicamente 14 días) para estimar el día de ovulación. Tu ventana fértil abarca 5 días antes de la ovulación hasta el día de ovulación mismo — un total de 6 días — porque los espermatozoides pueden sobrevivir hasta 5 días en el tracto reproductivo. La calculadora también proyecta tus próximos 6 ciclos, estima el momento de implantación (6-12 días después de la ovulación), y calcula una fecha de parto potencial usando la regla de Naegele (UPM + 280 días). Para máxima precisión, rastrea 3+ ciclos para determinar la duración promedio de tu ciclo."
        },
        "signs": {
          "title": "Signos y Síntomas de la Ovulación",
          "items": [
            {
              "text": "El moco cervical se vuelve claro, elástico y resbaladizo — pareciéndose a las claras de huevo crudas. Este moco de 'calidad fértil' ayuda a los espermatozoides a viajar hacia el óvulo.",
              "type": "info"
            },
            {
              "text": "La temperatura corporal basal (TCB) aumenta 0.2-0.5°C (0.4-1.0°F) después de la ovulación debido al aumento de progesterona. Rastrea diariamente para confirmar patrones de ovulación.",
              "type": "info"
            },
            {
              "text": "Dolor pélvico leve o calambres en un lado (mittelschmerz) — aproximadamente el 20% de las mujeres sienten esto durante la liberación del óvulo del ovario.",
              "type": "info"
            },
            {
              "text": "Aumento de la libido es la forma de la naturaleza de promover la concepción — muchas mujeres notan deseo aumentado alrededor de la ovulación.",
              "type": "info"
            },
            {
              "text": "Manchado leve puede ocurrir en la ovulación en algunas mujeres. Esto es normal y causado por el breve cambio hormonal cuando se libera el óvulo.",
              "type": "info"
            },
            {
              "text": "Importante: Estos signos varían mucho entre mujeres. Los kits predictores de ovulación (OPKs) proporcionan confirmación más confiable que los síntomas solos.",
              "type": "warning"
            }
          ]
        },
        "factors": {
          "title": "Factores Que Afectan la Ovulación",
          "items": [
            {
              "text": "Estrés — los niveles altos de cortisol pueden retrasar o suprimir completamente la ovulación. El estrés crónico puede causar ciclos irregulares.",
              "type": "warning"
            },
            {
              "text": "Peso corporal — IMC por debajo de 18.5 o por encima de 30 puede interrumpir la ovulación. Mantener un peso saludable apoya ciclos regulares.",
              "type": "info"
            },
            {
              "text": "Edad — la fertilidad alcanza su pico en los 20s y gradualmente declina después de los 35. La calidad del óvulo y regularidad de ovulación disminuyen con la edad.",
              "type": "info"
            },
            {
              "text": "Ejercicio — el ejercicio moderado apoya la fertilidad, pero el entrenamiento excesivo (maratón, triatlón) puede suprimir la ovulación.",
              "type": "info"
            },
            {
              "text": "Condiciones médicas — SOP, trastornos tiroideos y endometriosis comúnmente afectan el momento y regularidad de la ovulación.",
              "type": "warning"
            },
            {
              "text": "Medicamentos — anticonceptivos hormonales, algunos antidepresivos y antiinflamatorios pueden afectar la ovulación.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Cálculo paso a paso de la fecha de ovulación",
          "examples": [
            {
              "title": "Ciclo de 28 Días — Última Regla 1 Feb",
              "steps": [
                "Último Período Menstrual (UPM) = 1 de Febrero",
                "Duración del ciclo = 28 días, Fase lútea = 14 días",
                "Día de ovulación = 28 − 14 = día 14 del ciclo",
                "Fecha de ovulación = Feb 1 + 13 días = 14 de Febrero",
                "Ventana fértil = Feb 9 (día 9) hasta Feb 14 (día 14)",
                "Fertilidad máxima = Feb 12–13 (días 12-13)",
                "Próximo período = Feb 1 + 28 = 1 de Marzo",
                "Fecha de parto si concebes = Feb 1 + 280 = 8 de Noviembre"
              ],
              "result": "Ovulación ~Feb 14 · Fértil Feb 9–14 · Pico Feb 12–13"
            },
            {
              "title": "Ciclo de 32 Días — Última Regla 15 Ene",
              "steps": [
                "Último Período Menstrual (UPM) = 15 de Enero",
                "Duración del ciclo = 32 días, Fase lútea = 14 días",
                "Día de ovulación = 32 − 14 = día 18 del ciclo",
                "Fecha de ovulación = Ene 15 + 17 días = 1 de Febrero",
                "Ventana fértil = Ene 27 (día 13) hasta Feb 1 (día 18)",
                "Fertilidad máxima = Ene 30–31 (días 16-17)",
                "Próximo período = Ene 15 + 32 = 16 de Febrero"
              ],
              "result": "Ovulación ~Feb 1 · Fértil Ene 27–Feb 1 · Pico Ene 30–31"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué tan precisa es una calculadora de ovulación?",
          "answer": "Las calculadoras de ovulación basadas en calendario son una estimación útil pero no 100% precisa. Funcionan mejor para mujeres con ciclos regulares (variación de 3 días o menos). Los estudios muestran que solo cerca del 30% de las mujeres ovulan exactamente el día 14 — la ovulación puede ocurrir en cualquier lugar del día 11 al 21 en un ciclo típico. Para mayor precisión, combina esta calculadora con kits predictores de ovulación (OPKs), seguimiento de temperatura corporal basal y observación del moco cervical."
        },
        {
          "question": "¿Cuándo soy más fértil durante mi ciclo?",
          "answer": "Eres más fértil en los 2 días antes de la ovulación y el día de ovulación mismo. Esto es porque el óvulo solo sobrevive 12-24 horas después de ser liberado, mientras que los espermatozoides pueden sobrevivir hasta 5 días en el tracto reproductivo. Tu ventana fértil total es de aproximadamente 6 días: 5 días antes de la ovulación más el día de ovulación. Tener relaciones cada 1-2 días durante esta ventana maximiza tus posibilidades de concepción."
        },
        {
          "question": "¿Puedo usar esta calculadora para evitar el embarazo?",
          "answer": "Aunque esta calculadora muestra tus días fértiles estimados, NO debe ser tu único método anticonceptivo. El método del calendario solo tiene una tasa típica de falla de aproximadamente 12-24% por año porque el momento de la ovulación puede variar inesperadamente debido al estrés, enfermedad, viajes o cambios hormonales. Si quieres usar conciencia de fertilidad para control natal, considera combinar múltiples métodos de seguimiento (TCB, moco cervical, OPKs) y consulta un proveedor de salud para entrenamiento adecuado."
        },
        {
          "question": "¿Qué es la fase lútea y por qué importa?",
          "answer": "La fase lútea es el tiempo entre la ovulación y el inicio de tu próximo período, típicamente durando 12-16 días (promedio 14). A diferencia de la fase folicular (antes de la ovulación), que puede variar significativamente, la fase lútea es relativamente consistente para cada mujer. Por esto la calculadora resta tu fase lútea de la duración de tu ciclo para estimar la ovulación. Una fase lútea más corta que 10 días puede indicar un defecto de fase lútea, que puede afectar la implantación — consulta tu médico si sospechas esto."
        },
        {
          "question": "¿Qué pasa si mis ciclos son irregulares?",
          "answer": "Si tus ciclos varían por más de 7 días de mes a mes, las predicciones basadas en calendario se vuelven menos confiables. Rastrea tus ciclos por al menos 3-6 meses para encontrar tu duración promedio, y usa el ciclo más corto para una estimación conservadora. Los ciclos irregulares pueden ser causados por SOP, problemas tiroideos, estrés o cambios significativos de peso. Considera usar OPKs junto con esta calculadora para mejor precisión, y consulta tu médico si los ciclos consistentemente caen fuera del rango de 21-45 días."
        },
        {
          "question": "¿Qué tan pronto después de la ovulación puedo hacer una prueba de embarazo?",
          "answer": "Lo más temprano que puedes obtener un resultado confiable de prueba de embarazo es aproximadamente 12-14 días después de la ovulación, que es aproximadamente el día que se espera tu período. Las pruebas caseras de embarazo detectan hCG, una hormona producida después de que el embrión se implanta en el revestimiento uterino. La implantación típicamente ocurre 6-12 días después de la ovulación. Hacer la prueba muy temprano puede dar un falso negativo porque los niveles de hCG no han subido lo suficiente. Para los resultados más precisos, espera hasta el primer día de tu período perdido."
        },
        {
          "question": "¿La edad afecta mi ovulación y fertilidad?",
          "answer": "Sí, la edad afecta significativamente la fertilidad. Las mujeres son más fértiles en sus 20s, con la fertilidad gradualmente declinando después de los 30 y más rápidamente después de los 35. Para los 40 años, la posibilidad de concepción natural por ciclo baja a aproximadamente 5%. Esta disminución se debe a menos óvulos restantes, menor calidad de óvulos y ovulación menos regular. Si tienes 35+ y has estado intentando concebir por 6 meses sin éxito (o 12 meses si eres menor de 35), consulta un especialista en fertilidad."
        },
        {
          "question": "¿Puedo ovular más de una vez por ciclo?",
          "answer": "Aunque es raro, es posible liberar dos óvulos dentro de la misma ventana de 24 horas — así es como se conciben los gemelos fraternos. Sin embargo, no puedes tener dos eventos de ovulación separados con días de diferencia dentro del mismo ciclo. Una vez que ocurre la ovulación y la progesterona aumenta, la ovulación adicional es suprimida. Lo que algunas mujeres experimentan como 'ovulación doble' es en realidad dos óvulos liberados casi simultáneamente del mismo pico de LH."
        }
      ],
      "chart": {
        "title": "Ventana de Fertilidad — Ciclo Actual",
        "xLabel": "Día del Ciclo",
        "yLabel": "Nivel de Fertilidad",
        "series": {
          "fertility": "Fertilidad"
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
      "name": "Calculadora de Ovulação",
      "slug": "calculadora-ovulacao",
      "subtitle": "Acompanhe sua janela fértil, preveja o dia da ovulação e planeje com antecedência com um calendário de fertilidade de 6 meses.",
      "breadcrumb": "Ovulação",
      "seo": {
        "title": "Calculadora de Ovulação - Rastreador Gratuito de Janela Fértil",
        "description": "Acompanhe sua data de ovulação e janela fértil baseado no seu ciclo. Obtenha um calendário de fertilidade de 6 meses com dias de pico, janela de implantação e estimativas de data provável do parto.",
        "shortDescription": "Encontre seus dias férteis e data de ovulação.",
        "keywords": [
          "calculadora de ovulação",
          "calculadora de fertilidade",
          "calendário de ovulação",
          "quando sou mais fértil",
          "calculadora de janela fértil",
          "rastreador gratuito de ovulação",
          "calculadora de concepção",
          "preditor de ovulação"
        ]
      },
      "inputs": {
        "lmpMonth": {
          "label": "Última Menstruação — Mês",
          "helpText": "Mês em que sua última menstruação começou",
          "options": {
            "1": "Janeiro",
            "2": "Fevereiro",
            "3": "Março",
            "4": "Abril",
            "5": "Maio",
            "6": "Junho",
            "7": "Julho",
            "8": "Agosto",
            "9": "Setembro",
            "10": "Outubro",
            "11": "Novembro",
            "12": "Dezembro"
          }
        },
        "lmpDay": {
          "label": "Última Menstruação — Dia",
          "helpText": "Dia em que sua última menstruação começou (1-31)"
        },
        "cycleLength": {
          "label": "Duração do Ciclo",
          "helpText": "Número médio de dias do primeiro dia de uma menstruação ao primeiro dia da próxima (21-45 dias, a média é 28)"
        },
        "lutealPhase": {
          "label": "Duração da Fase Lútea",
          "helpText": "Dias entre a ovulação e sua próxima menstruação (padrão 14, variação típica 10-16). Deixe em 14 se não souber."
        },
        "goal": {
          "label": "Objetivo do Acompanhamento",
          "helpText": "Ajuda a personalizar dicas e informações para suas necessidades",
          "options": {
            "conceive": "Tentando Engravidar",
            "track": "Acompanhar Meu Ciclo",
            "avoid": "Evitar Gravidez"
          }
        }
      },
      "results": {
        "ovulationDate": {
          "label": "Data Estimada de Ovulação"
        },
        "fertileWindowStart": {
          "label": "Abertura da Janela Fértil"
        },
        "fertileWindowEnd": {
          "label": "Fechamento da Janela Fértil"
        },
        "peakFertility": {
          "label": "Dias de Pico de Fertilidade"
        },
        "nextPeriod": {
          "label": "Próxima Menstruação Esperada"
        },
        "implantationWindow": {
          "label": "Janela de Implantação"
        },
        "pregnancyTestDate": {
          "label": "Teste de Gravidez Mais Cedo"
        },
        "dueDateIfConceived": {
          "label": "Data Provável do Parto se Concebido"
        }
      },
      "presets": {
        "regularCycle": {
          "label": "Regular 28 Dias",
          "description": "Ciclo padrão de 28 dias com fase lútea de 14 dias"
        },
        "shortCycle": {
          "label": "Ciclo Curto (24)",
          "description": "Ciclo mais curto de 24 dias — ovulação ocorre mais cedo"
        },
        "longCycle": {
          "label": "Ciclo Longo (35)",
          "description": "Ciclo mais longo de 35 dias — ovulação ocorre mais tarde"
        }
      },
      "values": {
        "days": "dias",
        "day": "dia",
        "to": "até",
        "and": "e",
        "cycle": "ciclo",
        "day-of-cycle": "dia do ciclo"
      },
      "formats": {
        "summary": "Ovulação estimada em {ovulationDate}. Janela fértil: {fertileStart} até {fertileEnd}. Próxima menstruação esperada em {nextPeriod}."
      },
      "infoCards": {
        "fertility": {
          "title": "Sua Janela de Fertilidade",
          "items": [
            {
              "label": "Data de Ovulação",
              "valueKey": "ovulationDate"
            },
            {
              "label": "Janela Fértil",
              "valueKey": "fertileWindowFull"
            },
            {
              "label": "Pico de Fertilidade",
              "valueKey": "peakFertility"
            },
            {
              "label": "Próxima Menstruação",
              "valueKey": "nextPeriod"
            }
          ]
        },
        "planning": {
          "title": "Planejamento de Concepção",
          "items": [
            {
              "label": "Janela de Implantação",
              "valueKey": "implantationWindow"
            },
            {
              "label": "Data do Teste de Gravidez",
              "valueKey": "pregnancyTestDate"
            },
            {
              "label": "Data Provável se Concebido",
              "valueKey": "dueDateIfConceived"
            },
            {
              "label": "Dia do Ciclo da Ovulação",
              "valueKey": "ovulationCycleDay"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Fertilidade",
          "items": [
            "Seus dias mais férteis são os 2 dias antes da ovulação e o próprio dia da ovulação. Os espermatozoides podem sobreviver até 5 dias dentro do corpo, então ter relações antes da ovulação é ideal.",
            "Acompanhe a temperatura basal corporal (TBC) todas as manhãs antes de se levantar. Um aumento sustentado de 0,2°C (0,4°F) confirma que a ovulação ocorreu.",
            "Monitore mudanças no muco cervical — muco fértil se assemelha à clara de ovo crua (claro, elástico, escorregadio). Isso indica que você está se aproximando da ovulação.",
            "Kits de predição de ovulação (KPO) detectam o pico de LH que acontece 24-36 horas antes da ovulação. Faça o teste à tarde para melhor precisão."
          ]
        }
      },
      "detailedTable": {
        "fertilityCalendar": {
          "button": "Ver Calendário de Fertilidade de 6 Meses",
          "title": "Calendário de Fertilidade de 6 Meses",
          "columns": {
            "month": "Mês",
            "periodStart": "Início da Menstruação",
            "fertileStart": "Abertura Fértil",
            "peakDays": "Dias de Pico",
            "ovulation": "Ovulação",
            "nextPeriod": "Próxima Menstruação",
            "dueDate": "Data Provável se Concebido"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O Que é Ovulação?",
          "content": "A ovulação é a liberação de um óvulo maduro de um dos ovários, ocorrendo uma vez por ciclo menstrual. O óvulo viaja pela trompa de falópio onde pode ser fertilizado por espermatozoides por aproximadamente 12 a 24 horas. Esta calculadora estima sua data de ovulação usando o método do calendário: subtrai a duração da sua fase lútea (tipicamente 14 dias) da duração total do seu ciclo. Por exemplo, em um ciclo de 28 dias com fase lútea de 14 dias, a ovulação ocorre por volta do dia 14. Em um ciclo de 32 dias, a ovulação seria por volta do dia 18. Entender o timing da sua ovulação é fundamental tanto para planejamento de concepção quanto para planejamento familiar natural."
        },
        "howItWorks": {
          "title": "Como Esta Calculadora Funciona",
          "content": "Esta calculadora usa o método baseado no calendário para prever seus dias férteis. Ela pega a data da sua última menstruação (DUM) e duração do ciclo, então subtrai a fase lútea (a fase pós-ovulação, tipicamente 14 dias) para estimar o dia da ovulação. Sua janela fértil abrange 5 dias antes da ovulação até o próprio dia da ovulação — um total de 6 dias — porque os espermatozoides podem sobreviver até 5 dias no trato reprodutivo. A calculadora também projeta seus próximos 6 ciclos, estima o timing de implantação (6-12 dias após ovulação), e calcula uma potencial data provável do parto usando a regra de Naegele (DUM + 280 dias). Para máxima precisão, acompanhe 3+ ciclos para determinar a duração média do seu ciclo."
        },
        "signs": {
          "title": "Sinais e Sintomas da Ovulação",
          "items": [
            {
              "text": "O muco cervical fica claro, elástico e escorregadio — parecido com clara de ovo crua. Este muco de 'qualidade fértil' ajuda os espermatozoides a viajar até o óvulo.",
              "type": "info"
            },
            {
              "text": "A temperatura basal corporal (TBC) aumenta 0,2-0,5°C (0,4-1,0°F) após a ovulação devido ao aumento da progesterona. Acompanhe diariamente para confirmar padrões de ovulação.",
              "type": "info"
            },
            {
              "text": "Dor pélvica leve ou cólicas de um lado (mittelschmerz) — cerca de 20% das mulheres sentem isso durante a liberação do óvulo do ovário.",
              "type": "info"
            },
            {
              "text": "Aumento da libido é a forma da natureza de promover a concepção — muitas mulheres notam desejo aumentado por volta da ovulação.",
              "type": "info"
            },
            {
              "text": "Sangramento leve pode ocorrer na ovulação em algumas mulheres. Isso é normal e causado pela breve mudança hormonal quando o óvulo é liberado.",
              "type": "info"
            },
            {
              "text": "Importante: Estes sinais variam muito entre mulheres. Kits de predição de ovulação (KPOs) fornecem confirmação mais confiável do que apenas sintomas.",
              "type": "warning"
            }
          ]
        },
        "factors": {
          "title": "Fatores Que Afetam a Ovulação",
          "items": [
            {
              "text": "Estresse — níveis altos de cortisol podem atrasar ou suprimir completamente a ovulação. Estresse crônico pode causar ciclos irregulares.",
              "type": "warning"
            },
            {
              "text": "Peso corporal — IMC abaixo de 18,5 ou acima de 30 pode perturbar a ovulação. Manter um peso saudável apoia ciclos regulares.",
              "type": "info"
            },
            {
              "text": "Idade — a fertilidade atinge o pico nos 20 anos e gradualmente declina após os 35. A qualidade dos óvulos e regularidade da ovulação diminuem com a idade.",
              "type": "info"
            },
            {
              "text": "Exercício — exercício moderado apoia a fertilidade, mas treinamento excessivo (maratona, triathlon) pode suprimir a ovulação.",
              "type": "info"
            },
            {
              "text": "Condições médicas — SOP, distúrbios da tireoide e endometriose comumente afetam o timing e regularidade da ovulação.",
              "type": "warning"
            },
            {
              "text": "Medicamentos — contraceptivos hormonais, alguns antidepressivos e anti-inflamatórios podem afetar a ovulação.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Cálculo passo a passo da data de ovulação",
          "examples": [
            {
              "title": "Ciclo de 28 Dias — Última Menstruação 1º de Fev",
              "steps": [
                "Última Menstruação (DUM) = 1º de fevereiro",
                "Duração do ciclo = 28 dias, Fase lútea = 14 dias",
                "Dia da ovulação = 28 − 14 = dia 14 do ciclo",
                "Data da ovulação = 1º fev + 13 dias = 14 de fevereiro",
                "Janela fértil = 9 fev (dia 9) até 14 fev (dia 14)",
                "Pico de fertilidade = 12–13 fev (dias 12-13)",
                "Próxima menstruação = 1º fev + 28 = 1º de março",
                "Data provável se concebido = 1º fev + 280 = 8 de novembro"
              ],
              "result": "Ovulação ~14 fev · Fértil 9–14 fev · Pico 12–13 fev"
            },
            {
              "title": "Ciclo de 32 Dias — Última Menstruação 15 de Jan",
              "steps": [
                "Última Menstruação (DUM) = 15 de janeiro",
                "Duração do ciclo = 32 dias, Fase lútea = 14 dias",
                "Dia da ovulação = 32 − 14 = dia 18 do ciclo",
                "Data da ovulação = 15 jan + 17 dias = 1º de fevereiro",
                "Janela fértil = 27 jan (dia 13) até 1º fev (dia 18)",
                "Pico de fertilidade = 30–31 jan (dias 16-17)",
                "Próxima menstruação = 15 jan + 32 = 16 de fevereiro"
              ],
              "result": "Ovulação ~1º fev · Fértil 27 jan–1º fev · Pico 30–31 jan"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quão precisa é uma calculadora de ovulação?",
          "answer": "Calculadoras de ovulação baseadas em calendário são uma estimativa útil, mas não 100% precisas. Elas funcionam melhor para mulheres com ciclos regulares (variação de 3 dias ou menos). Estudos mostram que apenas cerca de 30% das mulheres ovulam exatamente no dia 14 — a ovulação pode ocorrer entre os dias 11 e 21 em um ciclo típico. Para maior precisão, combine esta calculadora com kits de predição de ovulação (KPOs), acompanhamento da temperatura basal corporal e observação do muco cervical."
        },
        {
          "question": "Quando sou mais fértil durante meu ciclo?",
          "answer": "Você é mais fértil nos 2 dias antes da ovulação e no próprio dia da ovulação. Isso porque o óvulo sobrevive apenas 12-24 horas após a liberação, enquanto os espermatozoides podem sobreviver até 5 dias no trato reprodutivo. Sua janela fértil total é de cerca de 6 dias: 5 dias antes da ovulação mais o dia da ovulação. Ter relações a cada 1-2 dias durante esta janela maximiza suas chances de concepção."
        },
        {
          "question": "Posso usar esta calculadora para evitar gravidez?",
          "answer": "Embora esta calculadora mostre seus dias férteis estimados, ela NÃO deve ser usada como seu único método contraceptivo. O método do calendário sozinho tem uma taxa típica de falha de cerca de 12-24% por ano porque o timing da ovulação pode variar inesperadamente devido a estresse, doença, viagem ou mudanças hormonais. Se você quer usar consciência da fertilidade para controle de natalidade, considere combinar múltiplos métodos de acompanhamento (TBC, muco cervical, KPOs) e consulte um profissional de saúde para treinamento adequado."
        },
        {
          "question": "O que é a fase lútea e por que ela importa?",
          "answer": "A fase lútea é o tempo entre a ovulação e o início da sua próxima menstruação, tipicamente durando 12-16 dias (média 14). Diferente da fase folicular (antes da ovulação), que pode variar significativamente, a fase lútea é relativamente consistente para cada mulher. É por isso que a calculadora subtrai sua fase lútea da duração do ciclo para estimar a ovulação. Uma fase lútea mais curta que 10 dias pode indicar um defeito da fase lútea, que pode afetar a implantação — consulte seu médico se suspeitar disso."
        },
        {
          "question": "E se meus ciclos forem irregulares?",
          "answer": "Se seus ciclos variam mais de 7 dias de mês para mês, predições baseadas em calendário se tornam menos confiáveis. Acompanhe seus ciclos por pelo menos 3-6 meses para encontrar sua duração média, e use o ciclo mais curto para uma estimativa conservadora. Ciclos irregulares podem ser causados por SOP, problemas de tireoide, estresse ou mudanças significativas de peso. Considere usar KPOs junto com esta calculadora para melhor precisão, e consulte seu médico se os ciclos consistentemente ficarem fora da faixa de 21-45 dias."
        },
        {
          "question": "Quanto tempo após a ovulação posso fazer um teste de gravidez?",
          "answer": "O mais cedo que você pode obter um resultado confiável de teste de gravidez é cerca de 12-14 dias após a ovulação, que é aproximadamente o dia que sua menstruação é esperada. Testes de gravidez caseiros detectam hCG, um hormônio produzido após o embrião implantar no revestimento uterino. A implantação tipicamente ocorre 6-12 dias após a ovulação. Testar muito cedo pode dar um falso negativo porque os níveis de hCG não subiram o suficiente. Para resultados mais precisos, espere até o primeiro dia da sua menstruação atrasada."
        },
        {
          "question": "A idade afeta minha ovulação e fertilidade?",
          "answer": "Sim, a idade impacta significativamente a fertilidade. Mulheres são mais férteis nos 20 anos, com fertilidade gradualmente declinando após os 30 e mais rapidamente após os 35. Aos 40 anos, a chance de concepção natural por ciclo cai para cerca de 5%. Este declínio é devido a menos óvulos restantes, menor qualidade dos óvulos e ovulação menos regular. Se você tem 35+ anos e está tentando conceber há 6 meses sem sucesso (ou 12 meses se tem menos de 35), consulte um especialista em fertilidade."
        },
        {
          "question": "Posso ovular mais de uma vez por ciclo?",
          "answer": "Embora raro, é possível liberar dois óvulos dentro da mesma janela de 24 horas — é assim que gêmeos fraternos são concebidos. No entanto, você não pode ter dois eventos de ovulação separados com dias de diferença dentro do mesmo ciclo. Uma vez que a ovulação ocorre e a progesterona aumenta, ovulação adicional é suprimida. O que algumas mulheres experienciam como 'ovulação dupla' é na verdade dois óvulos liberados quase simultaneamente do mesmo pico de LH."
        }
      ],
      "chart": {
        "title": "Janela de Fertilidade — Ciclo Atual",
        "xLabel": "Dia do Ciclo",
        "yLabel": "Nível de Fertilidade",
        "series": {
          "fertility": "Fertilidade"
        }
      },
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
      "name": "Calculateur d'Ovulation",
      "slug": "calculateur-ovulation",
      "subtitle": "Suivez votre fenêtre de fertilité, prédisez votre jour d'ovulation et planifiez avec un calendrier de fertilité sur 6 mois.",
      "breadcrumb": "Ovulation",
      "seo": {
        "title": "Calculateur d'Ovulation - Suivi Gratuit de la Fenêtre de Fertilité",
        "description": "Suivez votre date d'ovulation et fenêtre de fertilité selon votre cycle. Obtenez un calendrier de fertilité sur 6 mois avec les jours de pic, fenêtre de nidation et estimation de la date d'accouchement.",
        "shortDescription": "Trouvez vos jours fertiles et date d'ovulation.",
        "keywords": [
          "calculateur ovulation",
          "calculateur fertilité",
          "calendrier ovulation",
          "quand suis-je le plus fertile",
          "calculateur fenêtre fertile",
          "suivi ovulation gratuit",
          "calculateur conception",
          "prédicteur ovulation"
        ]
      },
      "inputs": {
        "lmpMonth": {
          "label": "Dernières Règles — Mois",
          "helpText": "Mois où vos dernières règles ont commencé",
          "options": {
            "1": "Janvier",
            "2": "Février",
            "3": "Mars",
            "4": "Avril",
            "5": "Mai",
            "6": "Juin",
            "7": "Juillet",
            "8": "Août",
            "9": "Septembre",
            "10": "Octobre",
            "11": "Novembre",
            "12": "Décembre"
          }
        },
        "lmpDay": {
          "label": "Dernières Règles — Jour",
          "helpText": "Jour où vos dernières règles ont commencé (1-31)"
        },
        "cycleLength": {
          "label": "Durée du Cycle",
          "helpText": "Nombre moyen de jours du premier jour d'une période au premier jour de la suivante (21-45 jours, moyenne 28)"
        },
        "lutealPhase": {
          "label": "Durée de la Phase Lutéale",
          "helpText": "Jours entre l'ovulation et vos prochaines règles (défaut 14, gamme typique 10-16). Laissez à 14 si incertain."
        },
        "goal": {
          "label": "Objectif de Suivi",
          "helpText": "Aide à adapter les conseils et informations à vos besoins",
          "options": {
            "conceive": "Essayer de Concevoir",
            "track": "Suivre Mon Cycle",
            "avoid": "Éviter une Grossesse"
          }
        }
      },
      "results": {
        "ovulationDate": {
          "label": "Date d'Ovulation Estimée"
        },
        "fertileWindowStart": {
          "label": "Ouverture Fenêtre Fertile"
        },
        "fertileWindowEnd": {
          "label": "Fermeture Fenêtre Fertile"
        },
        "peakFertility": {
          "label": "Jours de Pic de Fertilité"
        },
        "nextPeriod": {
          "label": "Prochaines Règles Attendues"
        },
        "implantationWindow": {
          "label": "Fenêtre de Nidation"
        },
        "pregnancyTestDate": {
          "label": "Test de Grossesse le Plus Tôt"
        },
        "dueDateIfConceived": {
          "label": "Date d'Accouchement Est. si Conçu"
        }
      },
      "presets": {
        "regularCycle": {
          "label": "Cycle Régulier 28 Jours",
          "description": "Cycle standard de 28 jours avec phase lutéale de 14 jours"
        },
        "shortCycle": {
          "label": "Cycle Court (24)",
          "description": "Cycle plus court de 24 jours — ovulation plus précoce"
        },
        "longCycle": {
          "label": "Cycle Long (35)",
          "description": "Cycle plus long de 35 jours — ovulation plus tardive"
        }
      },
      "values": {
        "days": "jours",
        "day": "jour",
        "to": "à",
        "and": "et",
        "cycle": "cycle",
        "day-of-cycle": "jour du cycle"
      },
      "formats": {
        "summary": "Ovulation estimée le {ovulationDate}. Fenêtre fertile : {fertileStart} à {fertileEnd}. Prochaines règles attendues {nextPeriod}."
      },
      "infoCards": {
        "fertility": {
          "title": "Votre Fenêtre de Fertilité",
          "items": [
            {
              "label": "Date d'Ovulation",
              "valueKey": "ovulationDate"
            },
            {
              "label": "Fenêtre Fertile",
              "valueKey": "fertileWindowFull"
            },
            {
              "label": "Pic de Fertilité",
              "valueKey": "peakFertility"
            },
            {
              "label": "Prochaines Règles",
              "valueKey": "nextPeriod"
            }
          ]
        },
        "planning": {
          "title": "Planification de la Conception",
          "items": [
            {
              "label": "Fenêtre de Nidation",
              "valueKey": "implantationWindow"
            },
            {
              "label": "Date Test de Grossesse",
              "valueKey": "pregnancyTestDate"
            },
            {
              "label": "Date d'Accouchement si Conçu",
              "valueKey": "dueDateIfConceived"
            },
            {
              "label": "Jour du Cycle d'Ovulation",
              "valueKey": "ovulationCycleDay"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Fertilité",
          "items": [
            "Vos jours les plus fertiles sont les 2 jours avant l'ovulation et le jour d'ovulation lui-même. Les spermatozoïdes peuvent survivre jusqu'à 5 jours dans le corps, donc avoir des rapports avant l'ovulation est idéal.",
            "Suivez la température basale du corps (TBC) chaque matin avant de vous lever. Une hausse soutenue de 0,2°C confirme que l'ovulation a eu lieu.",
            "Surveillez les changements de glaire cervicale — la glaire fertile ressemble au blanc d'œuf cru (claire, élastique, glissante). Cela indique que vous approchez de l'ovulation.",
            "Les kits prédicteurs d'ovulation (KPO) détectent la poussée de LH qui se produit 24-36 heures avant l'ovulation. Testez l'après-midi pour une meilleure précision."
          ]
        }
      },
      "detailedTable": {
        "fertilityCalendar": {
          "button": "Voir le Calendrier de Fertilité sur 6 Mois",
          "title": "Calendrier de Fertilité sur 6 Mois",
          "columns": {
            "month": "Mois",
            "periodStart": "Début Règles",
            "fertileStart": "Ouverture Fertile",
            "peakDays": "Jours de Pic",
            "ovulation": "Ovulation",
            "nextPeriod": "Prochaines Règles",
            "dueDate": "Date d'Accouchement si Conçu"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que l'Ovulation ?",
          "content": "L'ovulation est la libération d'un ovule mature de l'un des ovaires, se produisant une fois par cycle menstruel. L'ovule descend dans la trompe de Fallope où il peut être fécondé par un spermatozoïde pendant environ 12 à 24 heures. Ce calculateur estime votre date d'ovulation en utilisant la méthode du calendrier : il soustrait la durée de votre phase lutéale (typiquement 14 jours) de la durée totale de votre cycle. Par exemple, dans un cycle de 28 jours avec une phase lutéale de 14 jours, l'ovulation se produit vers le jour 14. Dans un cycle de 32 jours, l'ovulation serait vers le jour 18. Comprendre le timing de votre ovulation est clé pour la planification de la conception et la planification familiale naturelle."
        },
        "howItWorks": {
          "title": "Comment Fonctionne ce Calculateur",
          "content": "Ce calculateur utilise la méthode basée sur le calendrier pour prédire vos jours fertiles. Il prend la date de vos dernières règles (DDR) et la durée de votre cycle, puis soustrait la phase lutéale (la phase post-ovulation, typiquement 14 jours) pour estimer le jour d'ovulation. Votre fenêtre fertile s'étend sur 5 jours avant l'ovulation jusqu'au jour d'ovulation lui-même — soit 6 jours au total — car les spermatozoïdes peuvent survivre jusqu'à 5 jours dans l'appareil reproducteur. Le calculateur projette aussi vos 6 prochains cycles, estime le timing de nidation (6-12 jours après ovulation), et calcule une date d'accouchement potentielle en utilisant la règle de Naegele (DDR + 280 jours). Pour une précision maximale, suivez 3+ cycles pour déterminer la durée moyenne de votre cycle."
        },
        "signs": {
          "title": "Signes et Symptômes de l'Ovulation",
          "items": [
            {
              "text": "La glaire cervicale devient claire, élastique et glissante — ressemblant au blanc d'œuf cru. Cette glaire de 'qualité fertile' aide les spermatozoïdes à voyager vers l'ovule.",
              "type": "info"
            },
            {
              "text": "La température basale du corps (TBC) augmente de 0,2-0,5°C après l'ovulation due à l'augmentation de progestérone. Suivez quotidiennement pour confirmer les patterns d'ovulation.",
              "type": "info"
            },
            {
              "text": "Douleur pelvienne légère ou crampes d'un côté (mittelschmerz) — environ 20% des femmes ressentent ceci durant la libération de l'ovule de l'ovaire.",
              "type": "info"
            },
            {
              "text": "Libido accrue est la façon de la nature de promouvoir la conception — beaucoup de femmes remarquent un désir accru autour de l'ovulation.",
              "type": "info"
            },
            {
              "text": "De légers saignements peuvent survenir à l'ovulation chez certaines femmes. C'est normal et causé par le bref changement hormonal quand l'ovule est libéré.",
              "type": "info"
            },
            {
              "text": "Important : Ces signes varient grandement entre les femmes. Les kits prédicteurs d'ovulation (KPO) fournissent une confirmation plus fiable que les symptômes seuls.",
              "type": "warning"
            }
          ]
        },
        "factors": {
          "title": "Facteurs qui Affectent l'Ovulation",
          "items": [
            {
              "text": "Stress — des niveaux élevés de cortisol peuvent retarder ou supprimer complètement l'ovulation. Le stress chronique peut causer des cycles irréguliers.",
              "type": "warning"
            },
            {
              "text": "Poids corporel — un IMC en dessous de 18,5 ou au-dessus de 30 peut perturber l'ovulation. Maintenir un poids santé soutient des cycles réguliers.",
              "type": "info"
            },
            {
              "text": "Âge — la fertilité atteint son pic dans la vingtaine et décline graduellement après 35 ans. La qualité des ovules et la régularité de l'ovulation diminuent avec l'âge.",
              "type": "info"
            },
            {
              "text": "Exercice — l'exercice modéré soutient la fertilité, mais l'entraînement excessif (marathon, triathlon) peut supprimer l'ovulation.",
              "type": "info"
            },
            {
              "text": "Conditions médicales — SOPK, troubles thyroïdiens, et endométriose affectent communément le timing et la régularité de l'ovulation.",
              "type": "warning"
            },
            {
              "text": "Médicaments — contraceptifs hormonaux, certains antidépresseurs, et anti-inflammatoires peuvent affecter l'ovulation.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Calcul étape par étape de la date d'ovulation",
          "examples": [
            {
              "title": "Cycle de 28 Jours — Dernières Règles 1er Février",
              "steps": [
                "Dernières Règles (DDR) = 1er février",
                "Durée cycle = 28 jours, Phase lutéale = 14 jours",
                "Jour d'ovulation = 28 − 14 = jour 14 du cycle",
                "Date d'ovulation = 1er fév + 13 jours = 14 février",
                "Fenêtre fertile = 9 fév (jour 9) jusqu'au 14 fév (jour 14)",
                "Pic de fertilité = 12-13 fév (jours 12-13)",
                "Prochaines règles = 1er fév + 28 = 1er mars",
                "Date d'accouchement si conçu = 1er fév + 280 = 8 novembre"
              ],
              "result": "Ovulation ~14 fév · Fertile 9-14 fév · Pic 12-13 fév"
            },
            {
              "title": "Cycle de 32 Jours — Dernières Règles 15 Janvier",
              "steps": [
                "Dernières Règles (DDR) = 15 janvier",
                "Durée cycle = 32 jours, Phase lutéale = 14 jours",
                "Jour d'ovulation = 32 − 14 = jour 18 du cycle",
                "Date d'ovulation = 15 jan + 17 jours = 1er février",
                "Fenêtre fertile = 27 jan (jour 13) jusqu'au 1er fév (jour 18)",
                "Pic de fertilité = 30-31 jan (jours 16-17)",
                "Prochaines règles = 15 jan + 32 = 16 février"
              ],
              "result": "Ovulation ~1er fév · Fertile 27 jan-1er fév · Pic 30-31 jan"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la précision d'un calculateur d'ovulation ?",
          "answer": "Les calculateurs d'ovulation basés sur le calendrier sont une estimation utile mais pas précise à 100%. Ils fonctionnent mieux pour les femmes avec des cycles réguliers (variation de 3 jours ou moins). Les études montrent que seulement environ 30% des femmes ovulent exactement au jour 14 — l'ovulation peut se produire n'importe où du jour 11 au jour 21 dans un cycle typique. Pour une plus grande précision, combinez ce calculateur avec des kits prédicteurs d'ovulation (KPO), le suivi de la température basale corporelle, et l'observation de la glaire cervicale."
        },
        {
          "question": "Quand suis-je le plus fertile durant mon cycle ?",
          "answer": "Vous êtes le plus fertile dans les 2 jours avant l'ovulation et le jour d'ovulation lui-même. C'est parce que l'ovule ne survit que 12-24 heures après sa libération, tandis que les spermatozoïdes peuvent survivre jusqu'à 5 jours dans l'appareil reproducteur. Votre fenêtre fertile totale est d'environ 6 jours : 5 jours avant l'ovulation plus le jour d'ovulation. Avoir des rapports tous les 1-2 jours durant cette fenêtre maximise vos chances de conception."
        },
        {
          "question": "Puis-je utiliser ce calculateur pour éviter une grossesse ?",
          "answer": "Bien que ce calculateur montre vos jours fertiles estimés, il ne devrait PAS être votre seule méthode de contraception. La méthode du calendrier seule a un taux d'échec typique d'environ 12-24% par an car le timing de l'ovulation peut varier de façon inattendue due au stress, maladie, voyage, ou changements hormonaux. Si vous voulez utiliser la conscience de la fertilité pour le contrôle des naissances, considérez combiner plusieurs méthodes de suivi (TBC, glaire cervicale, KPO) et consultez un professionnel de santé pour un entraînement approprié."
        },
        {
          "question": "Qu'est-ce que la phase lutéale et pourquoi est-elle importante ?",
          "answer": "La phase lutéale est le temps entre l'ovulation et le début de vos prochaines règles, durant typiquement 12-16 jours (moyenne 14). Contrairement à la phase folliculaire (avant ovulation), qui peut varier significativement, la phase lutéale est relativement constante pour chaque femme. C'est pourquoi le calculateur soustrait votre phase lutéale de la durée de votre cycle pour estimer l'ovulation. Une phase lutéale plus courte que 10 jours peut indiquer un défaut de phase lutéale, qui peut affecter la nidation — consultez votre médecin si vous soupçonnez ceci."
        },
        {
          "question": "Et si mes cycles sont irréguliers ?",
          "answer": "Si vos cycles varient de plus de 7 jours d'un mois à l'autre, les prédictions basées sur le calendrier deviennent moins fiables. Suivez vos cycles pendant au moins 3-6 mois pour trouver votre durée moyenne, et utilisez le cycle le plus court pour une estimation conservatrice. Les cycles irréguliers peuvent être causés par SOPK, problèmes thyroïdiens, stress, ou changements de poids significatifs. Considérez utiliser des KPO avec ce calculateur pour une meilleure précision, et voyez votre médecin si les cycles tombent constamment hors de la gamme 21-45 jours."
        },
        {
          "question": "Combien de temps après l'ovulation puis-je faire un test de grossesse ?",
          "answer": "Le plus tôt que vous pouvez obtenir un résultat de test de grossesse fiable est environ 12-14 jours après l'ovulation, ce qui est grosso modo le jour où vos règles sont attendues. Les tests de grossesse à domicile détectent l'hCG, une hormone produite après que l'embryon s'implante dans la paroi utérine. La nidation se produit typiquement 6-12 jours après l'ovulation. Tester trop tôt peut donner un faux négatif car les niveaux d'hCG n'ont pas assez augmenté. Pour les résultats les plus précis, attendez jusqu'au premier jour de vos règles manquées."
        },
        {
          "question": "L'âge affecte-t-il mon ovulation et ma fertilité ?",
          "answer": "Oui, l'âge impacte significativement la fertilité. Les femmes sont le plus fertiles dans la vingtaine, avec la fertilité déclinant graduellement après 30 ans et plus rapidement après 35 ans. À 40 ans, la chance de conception naturelle par cycle tombe à environ 5%. Ce déclin est dû à moins d'ovules restants, qualité d'ovules plus faible, et ovulation moins régulière. Si vous avez 35+ ans et essayez de concevoir depuis 6 mois sans succès (ou 12 mois si moins de 35 ans), consultez un spécialiste de la fertilité."
        },
        {
          "question": "Puis-je ovuler plus d'une fois par cycle ?",
          "answer": "Bien que rare, il est possible de libérer deux ovules dans la même fenêtre de 24 heures — c'est ainsi que les jumeaux fraternels sont conçus. Cependant, vous ne pouvez pas avoir deux événements d'ovulation séparés à des jours d'intervalle dans le même cycle. Une fois que l'ovulation se produit et que la progestérone augmente, l'ovulation ultérieure est supprimée. Ce que certaines femmes expérimentent comme 'double ovulation' est en fait deux ovules libérés presque simultanément de la même poussée de LH."
        }
      ],
      "chart": {
        "title": "Fenêtre de Fertilité — Cycle Actuel",
        "xLabel": "Jour du Cycle",
        "yLabel": "Niveau de Fertilité",
        "series": {
          "fertility": "Fertilité"
        }
      },
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
      "name": "Eisprungrechner",
      "slug": "eisprung-rechner",
      "subtitle": "Verfolgen Sie Ihr fruchtbares Fenster, sagen Sie Ihren Eisprung voraus und planen Sie mit einem 6-Monats-Fruchtbarkeitskalender voraus.",
      "breadcrumb": "Eisprung",
      "seo": {
        "title": "Eisprungrechner - Kostenloser Fruchtbarkeitsfenster-Tracker",
        "description": "Verfolgen Sie Ihr Eisprungdatum und fruchtbares Fenster basierend auf Ihrem Zyklus. Erhalten Sie einen 6-Monats-Fruchtbarkeitskalender mit Spitzentagen, Einnistungsfenster und Geburtstermin-Schätzungen.",
        "shortDescription": "Finden Sie Ihre fruchtbaren Tage und Ihr Eisprungdatum.",
        "keywords": [
          "eisprungrechner",
          "fruchtbarkeitsrechner",
          "eisprungkalender",
          "wann bin ich am fruchtbarsten",
          "fruchtbarkeitsfenster rechner",
          "kostenloser eisprung tracker",
          "empfängnisrechner",
          "eisprung vorhersage"
        ]
      },
      "inputs": {
        "lmpMonth": {
          "label": "Letzte Periode — Monat",
          "helpText": "Monat in dem Ihre letzte Menstruation begann",
          "options": {
            "1": "Januar",
            "2": "Februar",
            "3": "März",
            "4": "April",
            "5": "Mai",
            "6": "Juni",
            "7": "Juli",
            "8": "August",
            "9": "September",
            "10": "Oktober",
            "11": "November",
            "12": "Dezember"
          }
        },
        "lmpDay": {
          "label": "Letzte Periode — Tag",
          "helpText": "Tag an dem Ihre letzte Periode begann (1-31)"
        },
        "cycleLength": {
          "label": "Zykluslänge",
          "helpText": "Durchschnittliche Anzahl von Tagen vom ersten Tag einer Periode bis zum ersten Tag der nächsten (21-45 Tage, Durchschnitt ist 28)"
        },
        "lutealPhase": {
          "label": "Gelbkörperphase Länge",
          "helpText": "Tage zwischen Eisprung und Ihrer nächsten Periode (Standard 14, typischer Bereich 10-16). Bei 14 belassen wenn unsicher."
        },
        "goal": {
          "label": "Verfolgungsziel",
          "helpText": "Hilft Tipps und Informationen an Ihre Bedürfnisse anzupassen",
          "options": {
            "conceive": "Versuche schwanger zu werden",
            "track": "Meinen Zyklus verfolgen",
            "avoid": "Schwangerschaft vermeiden"
          }
        }
      },
      "results": {
        "ovulationDate": {
          "label": "Geschätztes Eisprungdatum"
        },
        "fertileWindowStart": {
          "label": "Fruchtbares Fenster öffnet sich"
        },
        "fertileWindowEnd": {
          "label": "Fruchtbares Fenster schließt sich"
        },
        "peakFertility": {
          "label": "Höchste Fruchtbarkeitstage"
        },
        "nextPeriod": {
          "label": "Nächste Periode erwartet"
        },
        "implantationWindow": {
          "label": "Einnistungsfenster"
        },
        "pregnancyTestDate": {
          "label": "Frühester Schwangerschaftstest"
        },
        "dueDateIfConceived": {
          "label": "Voraus. Geburtstermin bei Empfängnis"
        }
      },
      "presets": {
        "regularCycle": {
          "label": "Regelmäßiger 28-Tage",
          "description": "Standard 28-Tage-Zyklus mit 14-tägiger Gelbkörperphase"
        },
        "shortCycle": {
          "label": "Kurzer Zyklus (24)",
          "description": "Kürzerer 24-Tage-Zyklus — Eisprung tritt früher auf"
        },
        "longCycle": {
          "label": "Langer Zyklus (35)",
          "description": "Längerer 35-Tage-Zyklus — Eisprung tritt später auf"
        }
      },
      "values": {
        "days": "Tage",
        "day": "Tag",
        "to": "bis",
        "and": "und",
        "cycle": "Zyklus",
        "day-of-cycle": "Tag des Zyklus"
      },
      "formats": {
        "summary": "Eisprung geschätzt am {ovulationDate}. Fruchtbares Fenster: {fertileStart} bis {fertileEnd}. Nächste Periode erwartet {nextPeriod}."
      },
      "infoCards": {
        "fertility": {
          "title": "Ihr Fruchtbarkeitsfenster",
          "items": [
            {
              "label": "Eisprungdatum",
              "valueKey": "ovulationDate"
            },
            {
              "label": "Fruchtbares Fenster",
              "valueKey": "fertileWindowFull"
            },
            {
              "label": "Höchste Fruchtbarkeit",
              "valueKey": "peakFertility"
            },
            {
              "label": "Nächste Periode",
              "valueKey": "nextPeriod"
            }
          ]
        },
        "planning": {
          "title": "Empfängnisplanung",
          "items": [
            {
              "label": "Einnistungsfenster",
              "valueKey": "implantationWindow"
            },
            {
              "label": "Schwangerschaftstest-Datum",
              "valueKey": "pregnancyTestDate"
            },
            {
              "label": "Geburtstermin bei Empfängnis",
              "valueKey": "dueDateIfConceived"
            },
            {
              "label": "Zyklustag des Eisprungs",
              "valueKey": "ovulationCycleDay"
            }
          ]
        },
        "tips": {
          "title": "Fruchtbarkeitstipps",
          "items": [
            "Ihre fruchtbarsten Tage sind die 2 Tage vor dem Eisprung und der Eisprung-Tag selbst. Spermien können bis zu 5 Tage im Körper überleben, daher ist Geschlechtsverkehr vor dem Eisprung ideal.",
            "Verfolgen Sie Ihre Basaltemperatur (BBT) jeden Morgen vor dem Aufstehen. Ein anhaltender Anstieg von 0,2°C bestätigt, dass der Eisprung stattgefunden hat.",
            "Beobachten Sie Veränderungen des Zervixschleims — fruchtbarer Schleim ähnelt rohem Eiweiß (klar, dehnbar, schlüpfrig). Dies zeigt an, dass Sie sich dem Eisprung nähern.",
            "Eisprung-Vorhersage-Tests (OPKs) erkennen den LH-Anstieg, der 24-36 Stunden vor dem Eisprung auftritt. Testen Sie am Nachmittag für beste Genauigkeit."
          ]
        }
      },
      "detailedTable": {
        "fertilityCalendar": {
          "button": "6-Monats-Fruchtbarkeitskalender anzeigen",
          "title": "6-Monats-Fruchtbarkeitskalender",
          "columns": {
            "month": "Monat",
            "periodStart": "Periodenbeginn",
            "fertileStart": "Fruchtbar öffnet sich",
            "peakDays": "Spitzentage",
            "ovulation": "Eisprung",
            "nextPeriod": "Nächste Periode",
            "dueDate": "Geburtstermin bei Empfängnis"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Eisprung?",
          "content": "Der Eisprung ist die Freisetzung einer reifen Eizelle aus einem der Eierstöcke, die einmal pro Menstruationszyklus auftritt. Die Eizelle wandert durch den Eileiter, wo sie etwa 12 bis 24 Stunden lang von Spermien befruchtet werden kann. Dieser Rechner schätzt Ihr Eisprungdatum mit der Kalendermethode: Er subtrahiert die Länge Ihrer Gelbkörperphase (typischerweise 14 Tage) von Ihrer gesamten Zykluslänge. Zum Beispiel tritt bei einem 28-Tage-Zyklus mit einer 14-tägigen Gelbkörperphase der Eisprung um Tag 14 auf. Bei einem 32-Tage-Zyklus wäre der Eisprung um Tag 18. Das Verstehen Ihres Eisprung-Timings ist sowohl für die Empfängnisplanung als auch für die natürliche Familienplanung wichtig."
        },
        "howItWorks": {
          "title": "Wie dieser Rechner funktioniert",
          "content": "Dieser Rechner verwendet die kalenderbasierte Methode zur Vorhersage Ihrer fruchtbaren Tage. Er nimmt das Datum Ihrer letzten Menstruation (LMP) und die Zykluslänge, subtrahiert dann die Gelbkörperphase (die Phase nach dem Eisprung, typischerweise 14 Tage), um den Eisprung-Tag zu schätzen. Ihr fruchtbares Fenster erstreckt sich über 5 Tage vor dem Eisprung bis zum Eisprung-Tag selbst — insgesamt 6 Tage — da Spermien bis zu 5 Tage im Fortpflanzungstrakt überleben können. Der Rechner prognostiziert auch Ihre nächsten 6 Zyklen, schätzt das Einnistungs-Timing (6-12 Tage nach dem Eisprung) und berechnet einen möglichen Geburtstermin mit der Naegele-Regel (LMP + 280 Tage). Für maximale Genauigkeit verfolgen Sie 3+ Zyklen, um Ihre durchschnittliche Zykluslänge zu bestimmen."
        },
        "signs": {
          "title": "Anzeichen und Symptome des Eisprungs",
          "items": [
            {
              "text": "Zervixschleim wird klar, dehnbar und schlüpfrig — ähnelt rohem Eiweiß. Dieser 'fruchtbare' Schleim hilft Spermien zur Eizelle zu gelangen.",
              "type": "info"
            },
            {
              "text": "Basaltemperatur (BBT) steigt nach dem Eisprung um 0,2-0,5°C aufgrund von erhöhtem Progesteron. Täglich verfolgen, um Eisprung-Muster zu bestätigen.",
              "type": "info"
            },
            {
              "text": "Leichte Beckenschmerzen oder Krämpfe auf einer Seite (Mittelschmerz) — etwa 20% der Frauen spüren dies während der Eifreisetzung aus dem Eierstock.",
              "type": "info"
            },
            {
              "text": "Erhöhte Libido ist die Art der Natur, Empfängnis zu fördern — viele Frauen bemerken gesteigerte Lust um den Eisprung.",
              "type": "info"
            },
            {
              "text": "Leichte Schmierblutung kann beim Eisprung bei einigen Frauen auftreten. Dies ist normal und durch die kurze Hormonverschiebung bei der Eifreisetzung verursacht.",
              "type": "info"
            },
            {
              "text": "Wichtig: Diese Anzeichen variieren stark zwischen Frauen. Eisprung-Vorhersage-Tests (OPKs) bieten zuverlässigere Bestätigung als Symptome allein.",
              "type": "warning"
            }
          ]
        },
        "factors": {
          "title": "Faktoren, die den Eisprung beeinflussen",
          "items": [
            {
              "text": "Stress — hohe Cortisol-Werte können den Eisprung verzögern oder vollständig unterdrücken. Chronischer Stress kann unregelmäßige Zyklen verursachen.",
              "type": "warning"
            },
            {
              "text": "Körpergewicht — BMI unter 18,5 oder über 30 kann den Eisprung stören. Ein gesundes Gewicht unterstützt regelmäßige Zyklen.",
              "type": "info"
            },
            {
              "text": "Alter — Fruchtbarkeit erreicht ihren Höhepunkt in den 20ern und nimmt nach 35 allmählich ab. Eiqualität und Eisprung-Regelmäßigkeit nehmen mit dem Alter ab.",
              "type": "info"
            },
            {
              "text": "Bewegung — moderate Bewegung unterstützt Fruchtbarkeit, aber übermäßiges Training (Marathon, Triathlon) kann den Eisprung unterdrücken.",
              "type": "info"
            },
            {
              "text": "Medizinische Bedingungen — PCOS, Schilddrüsenerkrankungen und Endometriose beeinflussen häufig Eisprung-Timing und Regelmäßigkeit.",
              "type": "warning"
            },
            {
              "text": "Medikamente — hormonelle Verhütungsmittel, einige Antidepressiva und Entzündungshemmer können den Eisprung beeinflussen.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt Eisprungdatum-Berechnung",
          "examples": [
            {
              "title": "28-Tage-Zyklus — Letzte Periode 1. Februar",
              "steps": [
                "Letzte Menstruation (LMP) = 1. Februar",
                "Zykluslänge = 28 Tage, Gelbkörperphase = 14 Tage",
                "Eisprung-Tag = 28 − 14 = Tag 14 des Zyklus",
                "Eisprungdatum = 1. Feb + 13 Tage = 14. Februar",
                "Fruchtbares Fenster = 9. Feb (Tag 9) bis 14. Feb (Tag 14)",
                "Höchste Fruchtbarkeit = 12.–13. Feb (Tage 12-13)",
                "Nächste Periode = 1. Feb + 28 = 1. März",
                "Geburtstermin bei Empfängnis = 1. Feb + 280 = 8. November"
              ],
              "result": "Eisprung ~14. Feb · Fruchtbar 9.–14. Feb · Höchste 12.–13. Feb"
            },
            {
              "title": "32-Tage-Zyklus — Letzte Periode 15. Januar",
              "steps": [
                "Letzte Menstruation (LMP) = 15. Januar",
                "Zykluslänge = 32 Tage, Gelbkörperphase = 14 Tage",
                "Eisprung-Tag = 32 − 14 = Tag 18 des Zyklus",
                "Eisprungdatum = 15. Jan + 17 Tage = 1. Februar",
                "Fruchtbares Fenster = 27. Jan (Tag 13) bis 1. Feb (Tag 18)",
                "Höchste Fruchtbarkeit = 30.–31. Jan (Tage 16-17)",
                "Nächste Periode = 15. Jan + 32 = 16. Februar"
              ],
              "result": "Eisprung ~1. Feb · Fruchtbar 27. Jan–1. Feb · Höchste 30.–31. Jan"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie genau ist ein Eisprungrechner?",
          "answer": "Kalenderbasierte Eisprungrechner sind eine hilfreiche Schätzung, aber nicht 100% präzise. Sie funktionieren am besten bei Frauen mit regelmäßigen Zyklen (Abweichung von 3 Tagen oder weniger). Studien zeigen, dass nur etwa 30% der Frauen genau an Tag 14 ovulieren — der Eisprung kann irgendwo zwischen Tag 11 und Tag 21 in einem typischen Zyklus auftreten. Für größere Genauigkeit kombinieren Sie diesen Rechner mit Eisprung-Vorhersage-Tests (OPKs), Basaltemperatur-Verfolgung und Zervixschleim-Beobachtung."
        },
        {
          "question": "Wann bin ich am fruchtbarsten während meines Zyklus?",
          "answer": "Sie sind am fruchtbarsten in den 2 Tagen vor dem Eisprung und am Eisprung-Tag selbst. Das liegt daran, dass die Eizelle nur 12-24 Stunden nach der Freisetzung überlebt, während Spermien bis zu 5 Tage im Fortpflanzungstrakt überleben können. Ihr gesamtes fruchtbares Fenster beträgt etwa 6 Tage: 5 Tage vor dem Eisprung plus Eisprung-Tag. Geschlechtsverkehr alle 1-2 Tage während dieses Fensters maximiert Ihre Empfängnischancen."
        },
        {
          "question": "Kann ich diesen Rechner verwenden, um eine Schwangerschaft zu vermeiden?",
          "answer": "Obwohl dieser Rechner Ihre geschätzten fruchtbaren Tage zeigt, sollte er NICHT als alleinige Verhütungsmethode verwendet werden. Die Kalendermethode allein hat eine typische Versagerrate von etwa 12-24% pro Jahr, da das Eisprung-Timing unerwartet durch Stress, Krankheit, Reisen oder Hormonveränderungen variieren kann. Wenn Sie Fruchtbarkeitsbewusstsein zur Geburtenkontrolle nutzen möchten, erwägen Sie die Kombination mehrerer Verfolgungsmethoden (BBT, Zervixschleim, OPKs) und konsultieren Sie einen Arzt für ordnungsgemäße Anleitung."
        },
        {
          "question": "Was ist die Gelbkörperphase und warum ist sie wichtig?",
          "answer": "Die Gelbkörperphase ist die Zeit zwischen Eisprung und dem Beginn Ihrer nächsten Periode, die typischerweise 12-16 Tage dauert (Durchschnitt 14). Anders als die Follikelphase (vor dem Eisprung), die erheblich variieren kann, ist die Gelbkörperphase für jede Frau relativ konstant. Deshalb subtrahiert der Rechner Ihre Gelbkörperphase von Ihrer Zykluslänge, um den Eisprung zu schätzen. Eine Gelbkörperphase kürzer als 10 Tage kann einen Gelbkörperdefekt anzeigen, der die Einnistung beeinträchtigen kann — konsultieren Sie Ihren Arzt, wenn Sie dies vermuten."
        },
        {
          "question": "Was wenn meine Zyklen unregelmäßig sind?",
          "answer": "Wenn Ihre Zyklen von Monat zu Monat um mehr als 7 Tage variieren, werden kalenderbasierte Vorhersagen weniger zuverlässig. Verfolgen Sie Ihre Zyklen für mindestens 3-6 Monate, um Ihre durchschnittliche Länge zu finden, und verwenden Sie den kürzesten Zyklus für eine konservative Schätzung. Unregelmäßige Zyklen können durch PCOS, Schilddrüsenprobleme, Stress oder erhebliche Gewichtsveränderungen verursacht werden. Erwägen Sie die Verwendung von OPKs zusammen mit diesem Rechner für bessere Genauigkeit, und sehen Sie Ihren Arzt, wenn Zyklen konstant außerhalb des 21-45-Tage-Bereichs fallen."
        },
        {
          "question": "Wie schnell nach dem Eisprung kann ich einen Schwangerschaftstest machen?",
          "answer": "Das früheste, wann Sie ein zuverlässiges Schwangerschaftstest-Ergebnis erhalten können, ist etwa 12-14 Tage nach dem Eisprung, was ungefähr der Tag ist, an dem Ihre Periode erwartet wird. Heimschwangerschaftstests erkennen hCG, ein Hormon, das nach der Einnistung des Embryos in die Gebärmutterschleimhaut produziert wird. Die Einnistung tritt typischerweise 6-12 Tage nach dem Eisprung auf. Zu frühes Testen kann ein falsch negatives Ergebnis geben, da die hCG-Werte nicht genug gestiegen sind. Für die genauesten Ergebnisse warten Sie bis zum ersten Tag Ihrer ausgebliebenen Periode."
        },
        {
          "question": "Beeinflusst das Alter meinen Eisprung und meine Fruchtbarkeit?",
          "answer": "Ja, das Alter beeinflusst die Fruchtbarkeit erheblich. Frauen sind in ihren 20ern am fruchtbarsten, wobei die Fruchtbarkeit nach dem 30. Lebensjahr allmählich und nach 35 schneller abnimmt. Mit 40 sinkt die Chance einer natürlichen Empfängnis pro Zyklus auf etwa 5%. Dieser Rückgang ist auf weniger verbleibende Eizellen, geringere Eiqualität und weniger regelmäßigen Eisprung zurückzuführen. Wenn Sie 35+ sind und 6 Monate lang erfolglos versucht haben zu empfangen (oder 12 Monate wenn unter 35), konsultieren Sie einen Fruchtbarkeitsspezialisten."
        },
        {
          "question": "Kann ich mehr als einmal pro Zyklus ovulieren?",
          "answer": "Obwohl selten, ist es möglich, zwei Eizellen innerhalb desselben 24-Stunden-Fensters freizusetzen — so werden zweieiige Zwillinge empfangen. Sie können jedoch nicht zwei getrennte Eisprung-Ereignisse mit Tagen Abstand innerhalb desselben Zyklus haben. Sobald der Eisprung auftritt und Progesteron steigt, wird weiterer Eisprung unterdrückt. Was einige Frauen als 'doppelten Eisprung' erleben, sind tatsächlich zwei Eizellen, die fast gleichzeitig vom selben LH-Anstieg freigesetzt werden."
        }
      ],
      "chart": {
        "title": "Fruchtbarkeitsfenster — Aktueller Zyklus",
        "xLabel": "Zyklus-Tag",
        "yLabel": "Fruchtbarkeitslevel",
        "series": {
          "fertility": "Fruchtbarkeit"
        }
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

  // ─── INPUTS ─────────────────────────────────────────────────────────────────
  inputs: [
    {
      id: "lmpMonth",
      type: "select",
      defaultValue: "2",
      options: [
        { value: "1" },
        { value: "2" },
        { value: "3" },
        { value: "4" },
        { value: "5" },
        { value: "6" },
        { value: "7" },
        { value: "8" },
        { value: "9" },
        { value: "10" },
        { value: "11" },
        { value: "12" },
      ],
    },
    {
      id: "lmpDay",
      type: "number",
      defaultValue: null,
      placeholder: "15",
      min: 1,
      max: 31,
    },
    {
      id: "cycleLength",
      type: "number",
      defaultValue: 28,
      min: 21,
      max: 45,
      suffix: "days",
    },
    {
      id: "lutealPhase",
      type: "number",
      defaultValue: 14,
      min: 10,
      max: 16,
      suffix: "days",
    },
    {
      id: "goal",
      type: "radio",
      defaultValue: "conceive",
      options: [{ value: "conceive" }, { value: "track" }, { value: "avoid" }],
    },
  ],

  inputGroups: [],

  // ─── RESULTS ────────────────────────────────────────────────────────────────
  results: [
    { id: "ovulationDate", type: "primary", format: "text" },
    { id: "fertileWindowStart", type: "secondary", format: "text" },
    { id: "fertileWindowEnd", type: "secondary", format: "text" },
    { id: "peakFertility", type: "secondary", format: "text" },
    { id: "nextPeriod", type: "secondary", format: "text" },
    { id: "implantationWindow", type: "secondary", format: "text" },
    { id: "pregnancyTestDate", type: "secondary", format: "text" },
    { id: "dueDateIfConceived", type: "secondary", format: "text" },
  ],

  // ─── INFOCARDS ──────────────────────────────────────────────────────────────
  infoCards: [
    { id: "fertility", type: "list", icon: "🌸", itemCount: 4 },
    { id: "planning", type: "list", icon: "📋", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ──────────────────────────────────────────────────────────────────
  chart: {
    id: "fertilityWindow",
    type: "area",
    xKey: "day",
    height: 320,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "percentage",
    series: [
      { key: "fertility", type: "area", color: "#ec4899" },
    ],
  },

  // ─── DETAILED TABLE ─────────────────────────────────────────────────────────
  detailedTable: {
    id: "fertilityCalendar",
    buttonLabel: "View 6-Month Fertility Calendar",
    buttonIcon: "📅",
    modalTitle: "6-Month Fertility Calendar",
    columns: [
      { id: "month", label: "Month", align: "left" },
      { id: "periodStart", label: "Period Start", align: "center" },
      { id: "fertileStart", label: "Fertile Opens", align: "center" },
      { id: "peakDays", label: "Peak Days", align: "center", highlight: true },
      { id: "ovulation", label: "Ovulation", align: "center", highlight: true },
      { id: "nextPeriod", label: "Next Period", align: "center" },
      { id: "dueDate", label: "Due Date", align: "center" },
    ],
  },

  referenceData: [],

  // ─── EDUCATION ──────────────────────────────────────────────────────────────
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "signs", type: "list", icon: "🔍", itemCount: 6 },
    { id: "factors", type: "list", icon: "📋", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ─── FAQS ───────────────────────────────────────────────────────────────────
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

  // ─── REFERENCES ─────────────────────────────────────────────────────────────
  references: [
    {
      authors: "Wilcox AJ, Dunson D, Baird DD",
      year: "2000",
      title: "The timing of the 'fertile window' in the menstrual cycle: day specific estimates from a prospective study",
      source: "BMJ (British Medical Journal)",
      url: "https://pubmed.ncbi.nlm.nih.gov/11099288/",
    },
    {
      authors: "American College of Obstetricians and Gynecologists",
      year: "2024",
      title: "Evaluating Infertility - FAQ",
      source: "ACOG",
      url: "https://www.acog.org/womens-health/faqs/evaluating-infertility",
    },
  ],

  hero: { badge: "Popular" },
  sidebar: {},
  features: {},
  relatedCalculators: [
    "pregnancy-due-date",
    "bmi",
    "calorie",
    "age",
  ],
  ads: {},
};

// ─── HELPER: Date formatting ─────────────────────────────────────────────────
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

function formatDateFull(date: Date): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// ─── CALCULATE ────────────────────────────────────────────────────────────────
export function calculateOvulation(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──
  const lmpMonth = parseInt((values.lmpMonth as string) || "2", 10);
  const lmpDay = values.lmpDay as number | null;
  const cycleLength = (values.cycleLength as number) || 28;
  const lutealPhase = (values.lutealPhase as number) || 14;

  // ── Validate required fields ──
  if (lmpDay === null || lmpDay === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  if (lmpDay < 1 || lmpDay > 31 || cycleLength < 21 || cycleLength > 45 || lutealPhase < 10 || lutealPhase > 16) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Construct LMP date (use current/recent year) ──
  const now = new Date();
  let lmpYear = now.getFullYear();
  // If the LMP month is in the future, use previous year
  const testDate = new Date(lmpYear, lmpMonth - 1, lmpDay);
  if (testDate > now) {
    lmpYear -= 1;
  }
  const lmp = new Date(lmpYear, lmpMonth - 1, lmpDay);

  // Validate date is real (e.g., Feb 30 → invalid)
  if (lmp.getMonth() !== lmpMonth - 1 || lmp.getDate() !== lmpDay) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Core calculations ──
  const ovulationDayOfCycle = cycleLength - lutealPhase;
  const ovulationDate = addDays(lmp, ovulationDayOfCycle - 1); // day 1 = LMP

  // Fertile window: 5 days before ovulation + ovulation day = 6 days total
  const fertileStart = addDays(ovulationDate, -5);
  const fertileEnd = new Date(ovulationDate);

  // Peak fertility: 2 days before ovulation + ovulation day
  const peakStart = addDays(ovulationDate, -2);
  const peakEnd = new Date(ovulationDate);

  // Next period
  const nextPeriod = addDays(lmp, cycleLength);

  // Implantation window: 6-12 days after ovulation
  const implantStart = addDays(ovulationDate, 6);
  const implantEnd = addDays(ovulationDate, 12);

  // Pregnancy test date: 14 days after ovulation (day period is expected or 1 day after)
  const testDateResult = addDays(ovulationDate, 14);

  // Due date if conceived (Naegele's rule: LMP + 280 days)
  const dueDate = addDays(lmp, 280);

  // ── Format results ──
  const toWord = v["to"] || "to";
  const andWord = v["and"] || "and";

  const fertileWindowFullStr = `${formatDate(fertileStart)} ${toWord} ${formatDate(fertileEnd)}`;

  // ── Chart data: Fertility level by cycle day ──
  const chartData: Array<Record<string, unknown>> = [];
  for (let d = 1; d <= cycleLength; d++) {
    let fertility = 0;

    // Menstruation phase (days 1-5): 0%
    if (d <= 5) {
      fertility = 0;
    }
    // Pre-fertile phase: gradually increase as we approach fertile window
    else if (d < ovulationDayOfCycle - 5) {
      fertility = 0;
    }
    // Fertile window days (5 days before ovulation)
    else if (d === ovulationDayOfCycle - 5) {
      fertility = 10;
    } else if (d === ovulationDayOfCycle - 4) {
      fertility = 16;
    } else if (d === ovulationDayOfCycle - 3) {
      fertility = 25;
    } else if (d === ovulationDayOfCycle - 2) {
      fertility = 55; // Peak -2
    } else if (d === ovulationDayOfCycle - 1) {
      fertility = 80; // Peak -1 (highest chance: day before ovulation)
    } else if (d === ovulationDayOfCycle) {
      fertility = 65; // Ovulation day
    }
    // Post-ovulation: rapid decline
    else if (d === ovulationDayOfCycle + 1) {
      fertility = 15;
    } else if (d === ovulationDayOfCycle + 2) {
      fertility = 5;
    }
    // Luteal phase: 0%
    else {
      fertility = 0;
    }

    chartData.push({
      day: `${v["day"] || "Day"} ${d}`,
      fertility,
    });
  }

  // ── DetailedTable: 6-month fertility calendar ──
  const tableData: Array<Record<string, string>> = [];
  let currentLmp = new Date(lmp);

  for (let cycle = 0; cycle < 6; cycle++) {
    const cycleOvulation = addDays(currentLmp, ovulationDayOfCycle - 1);
    const cycleFertileStart = addDays(cycleOvulation, -5);
    const cyclePeakStart = addDays(cycleOvulation, -2);
    const cyclePeakEnd = new Date(cycleOvulation);
    const cycleNextPeriod = addDays(currentLmp, cycleLength);
    const cycleDueDate = addDays(currentLmp, 280);

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    tableData.push({
      month: `${monthNames[currentLmp.getMonth()]} ${currentLmp.getFullYear()}`,
      periodStart: formatDate(currentLmp),
      fertileStart: formatDate(cycleFertileStart),
      peakDays: `${formatDate(cyclePeakStart)} – ${formatDate(cyclePeakEnd)}`,
      ovulation: formatDate(cycleOvulation),
      nextPeriod: formatDate(cycleNextPeriod),
      dueDate: formatDateFull(cycleDueDate),
    });

    // Move to next cycle
    currentLmp = new Date(cycleNextPeriod);
  }

  // ── Build summary ──
  const summary = f.summary
    ? f.summary
        .replace("{ovulationDate}", formatDateFull(ovulationDate))
        .replace("{fertileStart}", formatDate(fertileStart))
        .replace("{fertileEnd}", formatDate(fertileEnd))
        .replace("{nextPeriod}", formatDateFull(nextPeriod))
    : `Ovulation ~${formatDateFull(ovulationDate)}. Fertile window: ${formatDate(fertileStart)}–${formatDate(fertileEnd)}. Next period: ${formatDateFull(nextPeriod)}.`;

  return {
    values: {
      ovulationDate: formatDateFull(ovulationDate),
      fertileWindowStart: formatDateFull(fertileStart),
      fertileWindowEnd: formatDateFull(fertileEnd),
      peakFertility: `${formatDate(peakStart)} ${andWord} ${formatDate(peakEnd)}`,
      nextPeriod: formatDateFull(nextPeriod),
      implantationWindow: `${formatDate(implantStart)} ${toWord} ${formatDate(implantEnd)}`,
      pregnancyTestDate: formatDateFull(testDateResult),
      dueDateIfConceived: formatDateFull(dueDate),
      // Extra values for infoCards
      fertileWindowFull: fertileWindowFullStr,
      ovulationCycleDay: `${v["day"] || "Day"} ${ovulationDayOfCycle} ${v["of-cycle"] || "of cycle"}`,
    },
    formatted: {
      ovulationDate: formatDateFull(ovulationDate),
      fertileWindowStart: formatDateFull(fertileStart),
      fertileWindowEnd: formatDateFull(fertileEnd),
      peakFertility: `${formatDate(peakStart)} ${andWord} ${formatDate(peakEnd)}`,
      nextPeriod: formatDateFull(nextPeriod),
      implantationWindow: `${formatDate(implantStart)} ${toWord} ${formatDate(implantEnd)}`,
      pregnancyTestDate: formatDateFull(testDateResult),
      dueDateIfConceived: formatDateFull(dueDate),
      fertileWindowFull: fertileWindowFullStr,
      ovulationCycleDay: `${v["day"] || "Day"} ${ovulationDayOfCycle}`,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default ovulationConfig;
