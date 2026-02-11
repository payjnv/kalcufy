import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

// ─── IMPLANTATION SCIENCE ───
// Based on Wilcox et al. (1999) NEJM study:
// Implantation occurs 6–12 DPO (days past ovulation), peak at 9 DPO
// Probability distribution (approximate from Wilcox data):
//   6 DPO: 0.5%  | 7 DPO: 5%  | 8 DPO: 18% | 9 DPO: 26%
//  10 DPO: 24%   | 11 DPO: 15% | 12 DPO: 8% | 13+: 3.5% (late, higher miscarriage risk)
// hCG detectable ~3-4 days after implantation
// Reliable home test: 14 DPO (day of expected period for 28-day cycle)

const IMPLANTATION_PROBABILITY: Record<number, number> = {
  6: 0.5,
  7: 5.0,
  8: 18.0,
  9: 26.0,
  10: 24.0,
  11: 15.0,
  12: 8.0,
  13: 3.5,
};

export const implantationConfig: CalculatorConfigV4 = {
  id: "implantation",
  version: "4.0",
  category: "health",
  icon: "🧬",

  presets: [
    {
      id: "regular28",
      icon: "📆",
      values: {
        inputMethod: "lmp",
        ovulationDate: "",
        lmpDate: "2026-01-10",
        cycleLength: 28,
      },
    },
    {
      id: "regular30",
      icon: "🔄",
      values: {
        inputMethod: "lmp",
        ovulationDate: "",
        lmpDate: "2026-01-10",
        cycleLength: 30,
      },
    },
    {
      id: "longCycle35",
      icon: "⏳",
      values: {
        inputMethod: "lmp",
        ovulationDate: "",
        lmpDate: "2026-01-05",
        cycleLength: 35,
      },
    },
    {
      id: "knownOvulation",
      icon: "🎯",
      values: {
        inputMethod: "ovulation",
        ovulationDate: "2026-01-24",
        lmpDate: "",
        cycleLength: 28,
      },
    },
  ],

  t: {
    en: {
      name: "Implantation Calculator",
      slug: "implantation",
      subtitle:
        "Predict your implantation window, see daily probability by DPO, and find the best day to take a pregnancy test.",
      breadcrumb: "Implantation",

      seo: {
        title: "Implantation Calculator - Window, DPO & Test Day",
        description:
          "Estimate when implantation occurs after ovulation. See your day-by-day probability chart, implantation window, and the earliest reliable pregnancy test date.",
        shortDescription:
          "Calculate your implantation window and best pregnancy test day.",
        keywords: [
          "implantation calculator",
          "when does implantation occur",
          "implantation window",
          "days past ovulation implantation",
          "DPO implantation",
          "when to take pregnancy test",
          "implantation date calculator",
          "implantation symptoms timing",
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
        inputMethod: {
          label: "I Know My...",
          helpText: "Choose whether you know your ovulation date or last period date",
          options: {
            ovulation: "Ovulation Date",
            lmp: "Last Period Date",
          },
        },
        ovulationDate: {
          label: "Ovulation Date",
          helpText: "The date you ovulated (from tracking, OPK, or BBT)",
        },
        lmpDate: {
          label: "First Day of Last Period",
          helpText: "The first day of your most recent menstrual period",
        },
        cycleLength: {
          label: "Average Cycle Length",
          helpText: "Your typical menstrual cycle length (21–45 days)",
        },
      },

      results: {
        ovulationDate: { label: "Estimated Ovulation Date" },
        implantationWindowStart: { label: "Implantation Window (Start)" },
        peakImplantationDay: { label: "Most Likely Implantation" },
        implantationWindowEnd: { label: "Implantation Window (End)" },
        earliestTestDate: { label: "Earliest Test Date" },
        reliableTestDate: { label: "Most Reliable Test Date" },
        estimatedDueDate: { label: "Estimated Due Date (if conceived)" },
      },

      presets: {
        regular28: {
          label: "28-Day Cycle",
          description: "Regular cycle, calculate from LMP",
        },
        regular30: {
          label: "30-Day Cycle",
          description: "Slightly longer cycle, from LMP",
        },
        longCycle35: {
          label: "35-Day Cycle",
          description: "Longer cycle, from LMP",
        },
        knownOvulation: {
          label: "Known Ovulation",
          description: "Use tracked ovulation date directly",
        },
      },

      values: {
        days: "days",
        day: "day",
        DPO: "DPO",
      },

      formats: {
        summary:
          "Implantation most likely around {peakDay} (9 DPO). Window: {windowStart} to {windowEnd}. Take a pregnancy test on or after {testDate} for reliable results.",
      },

      infoCards: {
        metrics: {
          title: "Your Implantation Timeline",
          items: [
            { label: "Ovulation Date", valueKey: "ovulationDate" },
            { label: "Implantation Window", valueKey: "implantationWindow" },
            { label: "Peak Day (9 DPO)", valueKey: "peakImplantationDay" },
            { label: "Due Date (if conceived)", valueKey: "estimatedDueDate" },
          ],
        },
        details: {
          title: "Pregnancy Test Timing",
          items: [
            { label: "Earliest Test (10 DPO)", valueKey: "earliestTestDate" },
            { label: "Reliable Test (14 DPO)", valueKey: "reliableTestDate" },
            { label: "hCG Detectable After", valueKey: "hcgDetection" },
            { label: "Test Accuracy at 14 DPO", valueKey: "testAccuracy" },
          ],
        },
        tips: {
          title: "What to Know About Implantation",
          items: [
            "Implantation happens 6–12 days after ovulation, with most pregnancies implanting between days 8–10.",
            "Light spotting or mild cramping around this time may be signs of implantation, but many pregnancies have no symptoms at all.",
            "Testing too early (before 10 DPO) often gives false negatives — hCG needs time to build up after implantation.",
            "For the most reliable result, wait until 14 DPO or the day of your expected period to take a home pregnancy test.",
          ],
        },
      },

      chart: {
        title: "Implantation Probability by Day",
        xLabel: "Days Past Ovulation (DPO)",
        yLabel: "Probability (%)",
        series: {
          probability: "Implantation Probability",
        },
      },

      education: {
        whatIs: {
          title: "What Is Implantation?",
          content:
            "Implantation is the process where a fertilized egg (now called a blastocyst) attaches to the lining of the uterus (endometrium). This is a crucial step in establishing a pregnancy — without successful implantation, pregnancy cannot continue. After ovulation, the egg is fertilized in the fallopian tube and spends several days dividing and traveling toward the uterus. By days 6–12 after ovulation, the blastocyst has developed enough to burrow into the uterine wall and establish a blood supply connection with the mother. Once implanted, the embryo begins producing human chorionic gonadotropin (hCG), the hormone detected by pregnancy tests.",
        },
        howItWorks: {
          title: "How Is the Implantation Window Calculated?",
          content:
            "The implantation window is based on landmark research published in the New England Journal of Medicine by Wilcox et al. (1999), which tracked daily hCG levels in women trying to conceive. The study found that implantation occurs between 6 and 12 days past ovulation (DPO), with the highest probability at 9 DPO. If you know your ovulation date, we add 6–12 days to get your window. If you only know your last period date, we first estimate ovulation by subtracting 14 from your cycle length (the luteal phase is typically ~14 days), then apply the 6–12 day implantation window.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            {
              text: "Late implantation (after day 11) is associated with a higher risk of early pregnancy loss according to the Wilcox study.",
              type: "warning",
            },
            {
              text: "The implantation window is the same regardless of whether you conceived naturally or through IUI — only IVF timing differs.",
              type: "info",
            },
            {
              text: "Implantation bleeding (light spotting) occurs in about 15–25% of pregnancies and is usually lighter and shorter than a period.",
              type: "info",
            },
            {
              text: "Progesterone symptoms (breast tenderness, fatigue, mood changes) occur whether or not implantation happens — they're not reliable indicators.",
              type: "warning",
            },
            {
              text: "A positive pregnancy test is the only reliable confirmation that implantation has occurred.",
              type: "info",
            },
            {
              text: "If your cycles are irregular, these estimates may be less accurate — consider tracking ovulation with OPKs or BBT for better data.",
              type: "warning",
            },
          ],
        },
        categories: {
          title: "The Journey from Ovulation to Implantation",
          items: [
            {
              text: "Day 0 (Ovulation): Egg released from ovary, viable for 12–24 hours. Fertilization occurs in fallopian tube.",
              type: "info",
            },
            {
              text: "Days 1–3: Fertilized egg (zygote) divides rapidly while traveling down the fallopian tube toward the uterus.",
              type: "info",
            },
            {
              text: "Days 4–5: Embryo reaches the morula stage (16+ cells) and enters the uterine cavity. Begins forming a blastocyst.",
              type: "info",
            },
            {
              text: "Days 6–7: Blastocyst hatches from its protective shell (zona pellucida) and begins attaching to the endometrium.",
              type: "info",
            },
            {
              text: "Days 8–10: Peak implantation period. The embryo burrows into the uterine lining and establishes blood supply. hCG production begins.",
              type: "info",
            },
            {
              text: "Days 11–14: hCG levels rise enough to be detectable by home pregnancy tests. Implantation is complete.",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "How to estimate your implantation window.",
          examples: [
            {
              title: "Known Ovulation Date",
              steps: [
                "Ovulation date: February 10",
                "Implantation window: Feb 10 + 6 to Feb 10 + 12",
                "Window: February 16 – February 22",
                "Peak day (9 DPO): February 19",
                "Earliest test (10 DPO): February 20",
                "Reliable test (14 DPO): February 24",
              ],
              result: "Most likely implantation around February 19. Test on February 24.",
            },
            {
              title: "From Last Period (30-day cycle)",
              steps: [
                "LMP: January 15, cycle length: 30 days",
                "Ovulation: Jan 15 + (30 - 14) = Jan 15 + 16 = January 31",
                "Implantation window: Feb 6 – Feb 12",
                "Peak day (9 DPO): February 9",
                "Earliest test (10 DPO): February 10",
                "Reliable test (14 DPO): February 14",
              ],
              result: "Most likely implantation around February 9. Test on February 14.",
            },
          ],
        },
      },

      faqs: [
        {
          question: "When does implantation happen after ovulation?",
          answer:
            "Implantation typically occurs between 6 and 12 days after ovulation (DPO), with the most common day being 9 DPO. Research shows about 84% of implantations happen between days 8 and 10. Earlier than day 6 is extremely rare since the embryo hasn't developed enough, and later than day 12 carries a higher risk of early loss.",
        },
        {
          question: "What are the signs of implantation?",
          answer:
            "Some women experience light spotting (pink or brown), mild cramping, or a one-day dip in basal body temperature around implantation. However, these symptoms also occur in non-pregnant cycles due to progesterone. Many pregnancies have no noticeable implantation symptoms at all. The only reliable confirmation is a positive pregnancy test.",
        },
        {
          question: "When is the earliest I can take a pregnancy test?",
          answer:
            "The absolute earliest is about 10 DPO, but accuracy is low (around 60%). At 12 DPO, accuracy improves to about 75–80%. For the most reliable result (90%+), wait until 14 DPO or the day of your expected period. Testing with first morning urine gives the highest concentration of hCG.",
        },
        {
          question: "What's the difference between implantation bleeding and a period?",
          answer:
            "Implantation bleeding is typically very light (spotting), pink or brown in color, lasts 1–2 days, and doesn't fill a pad or tampon. A period starts light but gets heavier, is red, lasts 3–7 days, and involves more blood. If you're unsure, wait a few days and take a pregnancy test.",
        },
        {
          question: "Can implantation fail?",
          answer:
            "Yes. An estimated 30–50% of fertilized eggs fail to implant. This can be due to chromosomal abnormalities in the embryo, insufficient endometrial lining, hormonal imbalances, or timing issues. Most failed implantations go unnoticed and appear as a normal period.",
        },
        {
          question: "Does the implantation window change with cycle length?",
          answer:
            "The implantation window is always 6–12 days after ovulation, regardless of cycle length. However, ovulation timing changes with cycle length. In a 28-day cycle, ovulation is around day 14. In a 35-day cycle, it's around day 21. So the calendar dates of implantation shift, but the biological window post-ovulation remains the same.",
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
      "name": "Calculadora de Implantación",
      "slug": "calculadora-implantacion",
      "subtitle": "Predice tu ventana de implantación, ve la probabilidad diaria por DPO y encuentra el mejor día para hacerte una prueba de embarazo.",
      "breadcrumb": "Implantación",
      "seo": {
        "title": "Calculadora de Implantación - Ventana, DPO y Día de Prueba",
        "description": "Estima cuándo ocurre la implantación después de la ovulación. Ve tu gráfico de probabilidad día a día, ventana de implantación y la fecha más temprana confiable para la prueba de embarazo.",
        "shortDescription": "Calcula tu ventana de implantación y el mejor día para la prueba de embarazo.",
        "keywords": [
          "calculadora de implantación",
          "cuándo ocurre la implantación",
          "ventana de implantación",
          "días después de ovulación implantación",
          "DPO implantación",
          "cuándo hacer prueba embarazo",
          "calculadora fecha implantación",
          "síntomas implantación tiempo"
        ]
      },
      "inputs": {
        "inputMethod": {
          "label": "Conozco Mi...",
          "helpText": "Elige si conoces tu fecha de ovulación o la fecha de tu último período",
          "options": {
            "ovulation": "Fecha de Ovulación",
            "lmp": "Fecha del Último Período"
          }
        },
        "ovulationDate": {
          "label": "Fecha de Ovulación",
          "helpText": "La fecha en que ovulaste (por seguimiento, OPK o temperatura basal)"
        },
        "lmpDate": {
          "label": "Primer Día del Último Período",
          "helpText": "El primer día de tu período menstrual más reciente"
        },
        "cycleLength": {
          "label": "Duración Promedio del Ciclo",
          "helpText": "La duración típica de tu ciclo menstrual (21-45 días)"
        }
      },
      "results": {
        "ovulationDate": {
          "label": "Fecha Estimada de Ovulación"
        },
        "implantationWindowStart": {
          "label": "Ventana de Implantación (Inicio)"
        },
        "peakImplantationDay": {
          "label": "Implantación Más Probable"
        },
        "implantationWindowEnd": {
          "label": "Ventana de Implantación (Final)"
        },
        "earliestTestDate": {
          "label": "Fecha Más Temprana de Prueba"
        },
        "reliableTestDate": {
          "label": "Fecha Más Confiable de Prueba"
        },
        "estimatedDueDate": {
          "label": "Fecha Estimada de Parto (si concebiste)"
        }
      },
      "presets": {
        "regular28": {
          "label": "Ciclo de 28 Días",
          "description": "Ciclo regular, calcular desde UPM"
        },
        "regular30": {
          "label": "Ciclo de 30 Días",
          "description": "Ciclo ligeramente más largo, desde UPM"
        },
        "longCycle35": {
          "label": "Ciclo de 35 Días",
          "description": "Ciclo más largo, desde UPM"
        },
        "knownOvulation": {
          "label": "Ovulación Conocida",
          "description": "Usar fecha de ovulación rastreada directamente"
        }
      },
      "values": {
        "days": "días",
        "day": "día",
        "DPO": "DPO"
      },
      "formats": {
        "summary": "Implantación más probable alrededor del {peakDay} (9 DPO). Ventana: {windowStart} a {windowEnd}. Hazte una prueba de embarazo en o después del {testDate} para resultados confiables."
      },
      "infoCards": {
        "metrics": {
          "title": "Tu Cronología de Implantación",
          "items": [
            {
              "label": "Fecha de Ovulación",
              "valueKey": "ovulationDate"
            },
            {
              "label": "Ventana de Implantación",
              "valueKey": "implantationWindow"
            },
            {
              "label": "Día Pico (9 DPO)",
              "valueKey": "peakImplantationDay"
            },
            {
              "label": "Fecha de Parto (si concebiste)",
              "valueKey": "estimatedDueDate"
            }
          ]
        },
        "details": {
          "title": "Momento de la Prueba de Embarazo",
          "items": [
            {
              "label": "Prueba Más Temprana (10 DPO)",
              "valueKey": "earliestTestDate"
            },
            {
              "label": "Prueba Confiable (14 DPO)",
              "valueKey": "reliableTestDate"
            },
            {
              "label": "hCG Detectable Después de",
              "valueKey": "hcgDetection"
            },
            {
              "label": "Precisión de Prueba a 14 DPO",
              "valueKey": "testAccuracy"
            }
          ]
        },
        "tips": {
          "title": "Qué Saber Sobre la Implantación",
          "items": [
            "La implantación ocurre 6-12 días después de la ovulación, con la mayoría de embarazos implantando entre los días 8-10.",
            "Manchado ligero o calambres leves alrededor de este tiempo pueden ser signos de implantación, pero muchos embarazos no tienen síntomas.",
            "Hacerse la prueba muy temprano (antes de 10 DPO) a menudo da falsos negativos — la hCG necesita tiempo para acumularse después de la implantación.",
            "Para el resultado más confiable, espera hasta 14 DPO o el día de tu período esperado para hacerte una prueba casera de embarazo."
          ]
        }
      },
      "chart": {
        "title": "Probabilidad de Implantación por Día",
        "xLabel": "Días Después de la Ovulación (DPO)",
        "yLabel": "Probabilidad (%)",
        "series": {
          "probability": "Probabilidad de Implantación"
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es la Implantación?",
          "content": "La implantación es el proceso donde un óvulo fertilizado (ahora llamado blastocisto) se adhiere al revestimiento del útero (endometrio). Este es un paso crucial para establecer un embarazo — sin una implantación exitosa, el embarazo no puede continuar. Después de la ovulación, el óvulo se fertiliza en la trompa de Falopio y pasa varios días dividiéndose y viajando hacia el útero. Entre los días 6-12 después de la ovulación, el blastocisto se ha desarrollado lo suficiente para enterrarse en la pared uterina y establecer una conexión de suministro sanguíneo con la madre. Una vez implantado, el embrión comienza a producir gonadotropina coriónica humana (hCG), la hormona detectada por las pruebas de embarazo."
        },
        "howItWorks": {
          "title": "¿Cómo se Calcula la Ventana de Implantación?",
          "content": "La ventana de implantación se basa en investigación de referencia publicada en el New England Journal of Medicine por Wilcox et al. (1999), que rastreó los niveles diarios de hCG en mujeres que intentaban concebir. El estudio encontró que la implantación ocurre entre 6 y 12 días después de la ovulación (DPO), con la mayor probabilidad a los 9 DPO. Si conoces tu fecha de ovulación, agregamos 6-12 días para obtener tu ventana. Si solo conoces la fecha de tu último período, primero estimamos la ovulación restando 14 de la duración de tu ciclo (la fase lútea es típicamente ~14 días), luego aplicamos la ventana de implantación de 6-12 días."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "La implantación tardía (después del día 11) se asocia con un mayor riesgo de pérdida temprana del embarazo según el estudio de Wilcox.",
              "type": "warning"
            },
            {
              "text": "La ventana de implantación es la misma independientemente de si concebiste naturalmente o a través de IUI — solo el momento de la FIV difiere.",
              "type": "info"
            },
            {
              "text": "El sangrado de implantación (manchado ligero) ocurre en aproximadamente 15-25% de los embarazos y es usualmente más ligero y corto que un período.",
              "type": "info"
            },
            {
              "text": "Los síntomas de progesterona (sensibilidad en los senos, fatiga, cambios de humor) ocurren sin importar si la implantación sucede — no son indicadores confiables.",
              "type": "warning"
            },
            {
              "text": "Una prueba de embarazo positiva es la única confirmación confiable de que la implantación ha ocurrido.",
              "type": "info"
            },
            {
              "text": "Si tus ciclos son irregulares, estas estimaciones pueden ser menos precisas — considera rastrear la ovulación con OPK o temperatura basal para mejores datos.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "El Viaje de la Ovulación a la Implantación",
          "items": [
            {
              "text": "Día 0 (Ovulación): Óvulo liberado del ovario, viable por 12-24 horas. La fertilización ocurre en la trompa de Falopio.",
              "type": "info"
            },
            {
              "text": "Días 1-3: El óvulo fertilizado (cigoto) se divide rápidamente mientras viaja por la trompa de Falopio hacia el útero.",
              "type": "info"
            },
            {
              "text": "Días 4-5: El embrión alcanza la etapa de mórula (16+ células) y entra a la cavidad uterina. Comienza a formar un blastocisto.",
              "type": "info"
            },
            {
              "text": "Días 6-7: El blastocisto sale de su cáscara protectora (zona pelúcida) y comienza a adherirse al endometrio.",
              "type": "info"
            },
            {
              "text": "Días 8-10: Período pico de implantación. El embrión se entierra en el revestimiento uterino y establece suministro sanguíneo. Comienza la producción de hCG.",
              "type": "info"
            },
            {
              "text": "Días 11-14: Los niveles de hCG suben lo suficiente para ser detectables por pruebas caseras de embarazo. La implantación está completa.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Cómo estimar tu ventana de implantación.",
          "examples": [
            {
              "title": "Fecha de Ovulación Conocida",
              "steps": [
                "Fecha de ovulación: 10 de febrero",
                "Ventana de implantación: 10 feb + 6 a 10 feb + 12",
                "Ventana: 16 de febrero – 22 de febrero",
                "Día pico (9 DPO): 19 de febrero",
                "Prueba más temprana (10 DPO): 20 de febrero",
                "Prueba confiable (14 DPO): 24 de febrero"
              ],
              "result": "Implantación más probable alrededor del 19 de febrero. Hazte la prueba el 24 de febrero."
            },
            {
              "title": "Desde el Último Período (ciclo de 30 días)",
              "steps": [
                "UPM: 15 de enero, duración del ciclo: 30 días",
                "Ovulación: 15 ene + (30 - 14) = 15 ene + 16 = 31 de enero",
                "Ventana de implantación: 6 feb – 12 feb",
                "Día pico (9 DPO): 9 de febrero",
                "Prueba más temprana (10 DPO): 10 de febrero",
                "Prueba confiable (14 DPO): 14 de febrero"
              ],
              "result": "Implantación más probable alrededor del 9 de febrero. Hazte la prueba el 14 de febrero."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuándo ocurre la implantación después de la ovulación?",
          "answer": "La implantación típicamente ocurre entre 6 y 12 días después de la ovulación (DPO), siendo el día más común el 9 DPO. La investigación muestra que aproximadamente 84% de las implantaciones ocurren entre los días 8 y 10. Antes del día 6 es extremadamente raro ya que el embrión no se ha desarrollado lo suficiente, y después del día 12 conlleva un mayor riesgo de pérdida temprana."
        },
        {
          "question": "¿Cuáles son los signos de implantación?",
          "answer": "Algunas mujeres experimentan manchado ligero (rosado o marrón), calambres leves, o una caída de un día en la temperatura basal corporal alrededor de la implantación. Sin embargo, estos síntomas también ocurren en ciclos no embarazados debido a la progesterona. Muchos embarazos no tienen síntomas notables de implantación. La única confirmación confiable es una prueba de embarazo positiva."
        },
        {
          "question": "¿Cuál es lo más temprano que puedo hacerme una prueba de embarazo?",
          "answer": "Lo más temprano absoluto es alrededor de 10 DPO, pero la precisión es baja (alrededor del 60%). A los 12 DPO, la precisión mejora a aproximadamente 75-80%. Para el resultado más confiable (90%+), espera hasta 14 DPO o el día de tu período esperado. Hacerse la prueba con la primera orina de la mañana da la mayor concentración de hCG."
        },
        {
          "question": "¿Cuál es la diferencia entre sangrado de implantación y un período?",
          "answer": "El sangrado de implantación es típicamente muy ligero (manchado), de color rosado o marrón, dura 1-2 días, y no llena una toalla o tampón. Un período comienza ligero pero se vuelve más abundante, es rojo, dura 3-7 días, e involucra más sangre. Si no estás segura, espera unos días y hazte una prueba de embarazo."
        },
        {
          "question": "¿Puede fallar la implantación?",
          "answer": "Sí. Se estima que 30-50% de los óvulos fertilizados fallan en implantarse. Esto puede deberse a anormalidades cromosómicas en el embrión, revestimiento endometrial insuficiente, desequilibrios hormonales, o problemas de tiempo. La mayoría de las implantaciones fallidas pasan desapercibidas y aparecen como un período normal."
        },
        {
          "question": "¿Cambia la ventana de implantación con la duración del ciclo?",
          "answer": "La ventana de implantación es siempre 6-12 días después de la ovulación, independientemente de la duración del ciclo. Sin embargo, el momento de la ovulación cambia con la duración del ciclo. En un ciclo de 28 días, la ovulación es alrededor del día 14. En un ciclo de 35 días, es alrededor del día 21. Así que las fechas de calendario de implantación cambian, pero la ventana biológica post-ovulación permanece igual."
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
      "name": "Calculadora de Implantação",
      "slug": "calculadora-implantacao",
      "subtitle": "Preveja sua janela de implantação, veja a probabilidade diária por DPO e encontre o melhor dia para fazer um teste de gravidez.",
      "breadcrumb": "Implantação",
      "seo": {
        "title": "Calculadora de Implantação - Janela, DPO e Dia do Teste",
        "description": "Estime quando a implantação ocorre após a ovulação. Veja seu gráfico de probabilidade dia a dia, janela de implantação e a data mais confiável para teste de gravidez.",
        "shortDescription": "Calcule sua janela de implantação e melhor dia para teste de gravidez.",
        "keywords": [
          "calculadora de implantação",
          "quando ocorre a implantação",
          "janela de implantação",
          "dias após ovulação implantação",
          "DPO implantação",
          "quando fazer teste de gravidez",
          "calculadora data implantação",
          "sintomas implantação timing"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "inputMethod": {
          "label": "Eu Sei Minha...",
          "helpText": "Escolha se você sabe sua data de ovulação ou data da última menstruação",
          "options": {
            "ovulation": "Data da Ovulação",
            "lmp": "Data da Última Menstruação"
          }
        },
        "ovulationDate": {
          "label": "Data da Ovulação",
          "helpText": "A data em que você ovulou (por rastreamento, teste de ovulação ou temperatura basal)"
        },
        "lmpDate": {
          "label": "Primeiro Dia da Última Menstruação",
          "helpText": "O primeiro dia do seu período menstrual mais recente"
        },
        "cycleLength": {
          "label": "Duração Média do Ciclo",
          "helpText": "Duração típica do seu ciclo menstrual (21–45 dias)"
        }
      },
      "results": {
        "ovulationDate": {
          "label": "Data Estimada da Ovulação"
        },
        "implantationWindowStart": {
          "label": "Janela de Implantação (Início)"
        },
        "peakImplantationDay": {
          "label": "Implantação Mais Provável"
        },
        "implantationWindowEnd": {
          "label": "Janela de Implantação (Fim)"
        },
        "earliestTestDate": {
          "label": "Data Mais Cedo para Teste"
        },
        "reliableTestDate": {
          "label": "Data Mais Confiável para Teste"
        },
        "estimatedDueDate": {
          "label": "Data Prevista do Parto (se concebido)"
        }
      },
      "presets": {
        "regular28": {
          "label": "Ciclo de 28 Dias",
          "description": "Ciclo regular, calcular a partir da DUM"
        },
        "regular30": {
          "label": "Ciclo de 30 Dias",
          "description": "Ciclo ligeiramente mais longo, a partir da DUM"
        },
        "longCycle35": {
          "label": "Ciclo de 35 Dias",
          "description": "Ciclo mais longo, a partir da DUM"
        },
        "knownOvulation": {
          "label": "Ovulação Conhecida",
          "description": "Usar data de ovulação rastreada diretamente"
        }
      },
      "values": {
        "days": "dias",
        "day": "dia",
        "DPO": "DPO"
      },
      "formats": {
        "summary": "Implantação mais provável em torno de {peakDay} (9 DPO). Janela: {windowStart} até {windowEnd}. Faça um teste de gravidez em ou após {testDate} para resultados confiáveis."
      },
      "infoCards": {
        "metrics": {
          "title": "Sua Linha do Tempo de Implantação",
          "items": [
            {
              "label": "Data da Ovulação",
              "valueKey": "ovulationDate"
            },
            {
              "label": "Janela de Implantação",
              "valueKey": "implantationWindow"
            },
            {
              "label": "Dia de Pico (9 DPO)",
              "valueKey": "peakImplantationDay"
            },
            {
              "label": "Data do Parto (se concebido)",
              "valueKey": "estimatedDueDate"
            }
          ]
        },
        "details": {
          "title": "Cronometragem do Teste de Gravidez",
          "items": [
            {
              "label": "Teste Mais Cedo (10 DPO)",
              "valueKey": "earliestTestDate"
            },
            {
              "label": "Teste Confiável (14 DPO)",
              "valueKey": "reliableTestDate"
            },
            {
              "label": "hCG Detectável Após",
              "valueKey": "hcgDetection"
            },
            {
              "label": "Precisão do Teste aos 14 DPO",
              "valueKey": "testAccuracy"
            }
          ]
        },
        "tips": {
          "title": "O Que Saber Sobre Implantação",
          "items": [
            "A implantação acontece 6–12 dias após a ovulação, com a maioria das gravidezes implantando entre os dias 8–10.",
            "Sangramento leve ou cólicas suaves nesta época podem ser sinais de implantação, mas muitas gravidezes não têm sintomas.",
            "Fazer o teste muito cedo (antes de 10 DPO) frequentemente dá falsos negativos — o hCG precisa de tempo para se acumular após a implantação.",
            "Para o resultado mais confiável, aguarde até 14 DPO ou o dia da sua menstruação esperada para fazer um teste caseiro de gravidez."
          ]
        }
      },
      "chart": {
        "title": "Probabilidade de Implantação por Dia",
        "xLabel": "Dias Após Ovulação (DPO)",
        "yLabel": "Probabilidade (%)",
        "series": {
          "probability": "Probabilidade de Implantação"
        }
      },
      "education": {
        "whatIs": {
          "title": "O Que É Implantação?",
          "content": "A implantação é o processo onde um óvulo fertilizado (agora chamado blastocisto) se fixa ao revestimento do útero (endométrio). Este é um passo crucial para estabelecer uma gravidez — sem implantação bem-sucedida, a gravidez não pode continuar. Após a ovulação, o óvulo é fertilizado na trompa de falópio e passa vários dias se dividindo e viajando em direção ao útero. Pelos dias 6–12 após a ovulação, o blastocisto se desenvolveu o suficiente para se implantar na parede uterina e estabelecer uma conexão de suprimento sanguíneo com a mãe. Uma vez implantado, o embrião começa a produzir gonadotrofina coriônica humana (hCG), o hormônio detectado pelos testes de gravidez."
        },
        "howItWorks": {
          "title": "Como a Janela de Implantação É Calculada?",
          "content": "A janela de implantação é baseada em pesquisa marco publicada no New England Journal of Medicine por Wilcox et al. (1999), que rastreou níveis diários de hCG em mulheres tentando conceber. O estudo descobriu que a implantação ocorre entre 6 e 12 dias após a ovulação (DPO), com a maior probabilidade aos 9 DPO. Se você sabe sua data de ovulação, adicionamos 6–12 dias para obter sua janela. Se você só sabe a data da última menstruação, primeiro estimamos a ovulação subtraindo 14 da duração do seu ciclo (a fase lútea é tipicamente ~14 dias), então aplicamos a janela de implantação de 6–12 dias."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Implantação tardia (após o dia 11) está associada a maior risco de perda precoce da gravidez segundo o estudo de Wilcox.",
              "type": "warning"
            },
            {
              "text": "A janela de implantação é a mesma independentemente de ter concebido naturalmente ou através de inseminação — apenas o timing da FIV difere.",
              "type": "info"
            },
            {
              "text": "Sangramento de implantação (spotting leve) ocorre em cerca de 15–25% das gravidezes e geralmente é mais leve e mais curto que uma menstruação.",
              "type": "info"
            },
            {
              "text": "Sintomas de progesterona (sensibilidade mamária, fadiga, mudanças de humor) ocorrem independente da implantação — não são indicadores confiáveis.",
              "type": "warning"
            },
            {
              "text": "Um teste de gravidez positivo é a única confirmação confiável de que a implantação ocorreu.",
              "type": "info"
            },
            {
              "text": "Se seus ciclos são irregulares, essas estimativas podem ser menos precisas — considere rastrear a ovulação com testes ou temperatura basal para melhores dados.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "A Jornada da Ovulação à Implantação",
          "items": [
            {
              "text": "Dia 0 (Ovulação): Óvulo liberado do ovário, viável por 12–24 horas. Fertilização ocorre na trompa de falópio.",
              "type": "info"
            },
            {
              "text": "Dias 1–3: Óvulo fertilizado (zigoto) se divide rapidamente enquanto viaja pela trompa em direção ao útero.",
              "type": "info"
            },
            {
              "text": "Dias 4–5: Embrião atinge o estágio de mórula (16+ células) e entra na cavidade uterina. Começa a formar um blastocisto.",
              "type": "info"
            },
            {
              "text": "Dias 6–7: Blastocisto eclode de sua casca protetora (zona pelúcida) e começa a se fixar ao endométrio.",
              "type": "info"
            },
            {
              "text": "Dias 8–10: Período de pico da implantação. O embrião se implanta no revestimento uterino e estabelece suprimento sanguíneo. Produção de hCG começa.",
              "type": "info"
            },
            {
              "text": "Dias 11–14: Níveis de hCG sobem o suficiente para serem detectáveis por testes caseiros de gravidez. Implantação está completa.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Como estimar sua janela de implantação.",
          "examples": [
            {
              "title": "Data de Ovulação Conhecida",
              "steps": [
                "Data da ovulação: 10 de fevereiro",
                "Janela de implantação: 10 fev + 6 até 10 fev + 12",
                "Janela: 16 de fevereiro – 22 de fevereiro",
                "Dia de pico (9 DPO): 19 de fevereiro",
                "Teste mais cedo (10 DPO): 20 de fevereiro",
                "Teste confiável (14 DPO): 24 de fevereiro"
              ],
              "result": "Implantação mais provável em torno de 19 de fevereiro. Teste em 24 de fevereiro."
            },
            {
              "title": "A Partir da Última Menstruação (ciclo de 30 dias)",
              "steps": [
                "DUM: 15 de janeiro, duração do ciclo: 30 dias",
                "Ovulação: 15 jan + (30 - 14) = 15 jan + 16 = 31 de janeiro",
                "Janela de implantação: 6 fev – 12 fev",
                "Dia de pico (9 DPO): 9 de fevereiro",
                "Teste mais cedo (10 DPO): 10 de fevereiro",
                "Teste confiável (14 DPO): 14 de fevereiro"
              ],
              "result": "Implantação mais provável em torno de 9 de fevereiro. Teste em 14 de fevereiro."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quando a implantação acontece após a ovulação?",
          "answer": "A implantação tipicamente ocorre entre 6 e 12 dias após a ovulação (DPO), sendo o dia mais comum o 9º DPO. Pesquisas mostram que cerca de 84% das implantações acontecem entre os dias 8 e 10. Antes do dia 6 é extremamente raro pois o embrião não se desenvolveu o suficiente, e após o dia 12 carrega maior risco de perda precoce."
        },
        {
          "question": "Quais são os sinais de implantação?",
          "answer": "Algumas mulheres experimentam sangramento leve (rosa ou marrom), cólicas suaves, ou uma queda de um dia na temperatura basal corporal durante a implantação. No entanto, esses sintomas também ocorrem em ciclos não-grávidos devido à progesterona. Muitas gravidezes não têm sintomas perceptíveis de implantação. A única confirmação confiável é um teste de gravidez positivo."
        },
        {
          "question": "Quando é o mais cedo que posso fazer um teste de gravidez?",
          "answer": "O mais cedo absoluto é cerca de 10 DPO, mas a precisão é baixa (cerca de 60%). Aos 12 DPO, a precisão melhora para cerca de 75–80%. Para o resultado mais confiável (90%+), aguarde até 14 DPO ou o dia da sua menstruação esperada. Fazer o teste com a primeira urina da manhã dá a maior concentração de hCG."
        },
        {
          "question": "Qual a diferença entre sangramento de implantação e menstruação?",
          "answer": "Sangramento de implantação é tipicamente muito leve (spotting), cor rosa ou marrom, dura 1–2 dias, e não enche um absorvente. A menstruação começa leve mas fica mais intensa, é vermelha, dura 3–7 dias, e envolve mais sangue. Se estiver em dúvida, aguarde alguns dias e faça um teste de gravidez."
        },
        {
          "question": "A implantação pode falhar?",
          "answer": "Sim. Estima-se que 30–50% dos óvulos fertilizados falham em se implantar. Isso pode ser devido a anormalidades cromossômicas no embrião, revestimento endometrial insuficiente, desequilíbrios hormonais, ou questões de timing. A maioria das implantações falhadas passa despercebida e aparece como uma menstruação normal."
        },
        {
          "question": "A janela de implantação muda com a duração do ciclo?",
          "answer": "A janela de implantação é sempre 6–12 dias após a ovulação, independente da duração do ciclo. No entanto, o timing da ovulação muda com a duração do ciclo. Em um ciclo de 28 dias, a ovulação é por volta do dia 14. Em um ciclo de 35 dias, é por volta do dia 21. Então as datas de calendário da implantação mudam, mas a janela biológica pós-ovulação permanece a mesma."
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
      "name": "Calculateur de Nidation",
      "slug": "calculateur-nidation",
      "subtitle": "Prédisez votre fenêtre de nidation, consultez la probabilité quotidienne par JDO, et trouvez le meilleur jour pour faire un test de grossesse.",
      "breadcrumb": "Nidation",
      "seo": {
        "title": "Calculateur de Nidation - Fenêtre, JDO et Jour de Test",
        "description": "Estimez quand la nidation se produit après l'ovulation. Consultez votre graphique de probabilité jour par jour, votre fenêtre de nidation et la date de test de grossesse la plus fiable.",
        "shortDescription": "Calculez votre fenêtre de nidation et le meilleur jour pour un test de grossesse.",
        "keywords": [
          "calculateur nidation",
          "quand se produit la nidation",
          "fenêtre nidation",
          "jours après ovulation nidation",
          "JDO nidation",
          "quand faire test grossesse",
          "calculateur date nidation",
          "timing symptômes nidation"
        ]
      },
      "inputs": {
        "inputMethod": {
          "label": "Je Connais Mon...",
          "helpText": "Choisissez si vous connaissez votre date d'ovulation ou votre date de dernières règles",
          "options": {
            "ovulation": "Date d'Ovulation",
            "lmp": "Date des Dernières Règles"
          }
        },
        "ovulationDate": {
          "label": "Date d'Ovulation",
          "helpText": "La date où vous avez ovulé (selon suivi, test d'ovulation, ou température basale)"
        },
        "lmpDate": {
          "label": "Premier Jour des Dernières Règles",
          "helpText": "Le premier jour de vos règles les plus récentes"
        },
        "cycleLength": {
          "label": "Durée Moyenne du Cycle",
          "helpText": "La durée habituelle de votre cycle menstruel (21–45 jours)"
        }
      },
      "results": {
        "ovulationDate": {
          "label": "Date d'Ovulation Estimée"
        },
        "implantationWindowStart": {
          "label": "Début de la Fenêtre de Nidation"
        },
        "peakImplantationDay": {
          "label": "Nidation la Plus Probable"
        },
        "implantationWindowEnd": {
          "label": "Fin de la Fenêtre de Nidation"
        },
        "earliestTestDate": {
          "label": "Date de Test la Plus Précoce"
        },
        "reliableTestDate": {
          "label": "Date de Test la Plus Fiable"
        },
        "estimatedDueDate": {
          "label": "Date d'Accouchement Estimée (si conception)"
        }
      },
      "presets": {
        "regular28": {
          "label": "Cycle de 28 Jours",
          "description": "Cycle régulier, calculer depuis les dernières règles"
        },
        "regular30": {
          "label": "Cycle de 30 Jours",
          "description": "Cycle légèrement plus long, depuis les dernières règles"
        },
        "longCycle35": {
          "label": "Cycle de 35 Jours",
          "description": "Cycle plus long, depuis les dernières règles"
        },
        "knownOvulation": {
          "label": "Ovulation Connue",
          "description": "Utiliser directement la date d'ovulation suivie"
        }
      },
      "values": {
        "days": "jours",
        "day": "jour",
        "DPO": "JDO"
      },
      "formats": {
        "summary": "Nidation la plus probable vers le {peakDay} (9 JDO). Fenêtre : {windowStart} à {windowEnd}. Faites un test de grossesse le {testDate} ou après pour des résultats fiables."
      },
      "infoCards": {
        "metrics": {
          "title": "Votre Chronologie de Nidation",
          "items": [
            {
              "label": "Date d'Ovulation",
              "valueKey": "ovulationDate"
            },
            {
              "label": "Fenêtre de Nidation",
              "valueKey": "implantationWindow"
            },
            {
              "label": "Jour Pic (9 JDO)",
              "valueKey": "peakImplantationDay"
            },
            {
              "label": "Date d'Accouchement (si conception)",
              "valueKey": "estimatedDueDate"
            }
          ]
        },
        "details": {
          "title": "Timing du Test de Grossesse",
          "items": [
            {
              "label": "Test le Plus Précoce (10 JDO)",
              "valueKey": "earliestTestDate"
            },
            {
              "label": "Test Fiable (14 JDO)",
              "valueKey": "reliableTestDate"
            },
            {
              "label": "hCG Détectable Après",
              "valueKey": "hcgDetection"
            },
            {
              "label": "Précision du Test à 14 JDO",
              "valueKey": "testAccuracy"
            }
          ]
        },
        "tips": {
          "title": "Ce qu'il Faut Savoir sur la Nidation",
          "items": [
            "La nidation se produit 6–12 jours après l'ovulation, avec la plupart des grossesses s'implantant entre les jours 8–10.",
            "Des saignements légers ou des crampes légères à cette période peuvent être des signes de nidation, mais beaucoup de grossesses n'ont aucun symptôme.",
            "Tester trop tôt (avant 10 JDO) donne souvent des faux négatifs — l'hCG a besoin de temps pour s'accumuler après la nidation.",
            "Pour un résultat plus fiable, attendez jusqu'à 14 JDO ou le jour de vos règles prévues pour faire un test de grossesse."
          ]
        }
      },
      "chart": {
        "title": "Probabilité de Nidation par Jour",
        "xLabel": "Jours Après Ovulation (JDO)",
        "yLabel": "Probabilité (%)",
        "series": {
          "probability": "Probabilité de Nidation"
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que la Nidation ?",
          "content": "La nidation est le processus par lequel un ovule fécondé (maintenant appelé blastocyste) s'attache à la paroi de l'utérus (endomètre). C'est une étape cruciale pour établir une grossesse — sans nidation réussie, la grossesse ne peut pas continuer. Après l'ovulation, l'ovule est fécondé dans la trompe de Fallope et passe plusieurs jours à se diviser et à voyager vers l'utérus. Entre les jours 6–12 après l'ovulation, le blastocyste s'est suffisamment développé pour s'enfouir dans la paroi utérine et établir une connexion d'approvisionnement sanguin avec la mère. Une fois implanté, l'embryon commence à produire la gonadotrophine chorionique humaine (hCG), l'hormone détectée par les tests de grossesse."
        },
        "howItWorks": {
          "title": "Comment la Fenêtre de Nidation est-elle Calculée ?",
          "content": "La fenêtre de nidation est basée sur une recherche de référence publiée dans le New England Journal of Medicine par Wilcox et al. (1999), qui a suivi les niveaux d'hCG quotidiens chez des femmes essayant de concevoir. L'étude a trouvé que la nidation se produit entre 6 et 12 jours après l'ovulation (JDO), avec la plus haute probabilité à 9 JDO. Si vous connaissez votre date d'ovulation, nous ajoutons 6–12 jours pour obtenir votre fenêtre. Si vous ne connaissez que votre date de dernières règles, nous estimons d'abord l'ovulation en soustrayant 14 de votre durée de cycle (la phase lutéale dure typiquement ~14 jours), puis appliquons la fenêtre de nidation de 6–12 jours."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "La nidation tardive (après le jour 11) est associée à un risque plus élevé de perte précoce de grossesse selon l'étude Wilcox.",
              "type": "warning"
            },
            {
              "text": "La fenêtre de nidation est la même que vous ayez conçu naturellement ou par IIU — seul le timing de la FIV diffère.",
              "type": "info"
            },
            {
              "text": "Le saignement de nidation (légers saignements) survient chez environ 15–25% des grossesses et est généralement plus léger et plus court qu'une période.",
              "type": "info"
            },
            {
              "text": "Les symptômes de progestérone (sensibilité des seins, fatigue, changements d'humeur) se produisent que la nidation ait lieu ou non — ils ne sont pas des indicateurs fiables.",
              "type": "warning"
            },
            {
              "text": "Un test de grossesse positif est la seule confirmation fiable que la nidation a eu lieu.",
              "type": "info"
            },
            {
              "text": "Si vos cycles sont irréguliers, ces estimations peuvent être moins précises — considérez le suivi de l'ovulation avec des tests d'ovulation ou la température basale pour de meilleures données.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Le Voyage de l'Ovulation à la Nidation",
          "items": [
            {
              "text": "Jour 0 (Ovulation) : Ovule libéré de l'ovaire, viable pendant 12–24 heures. La fécondation se produit dans la trompe de Fallope.",
              "type": "info"
            },
            {
              "text": "Jours 1–3 : L'ovule fécondé (zygote) se divise rapidement en voyageant dans la trompe de Fallope vers l'utérus.",
              "type": "info"
            },
            {
              "text": "Jours 4–5 : L'embryon atteint le stade morula (16+ cellules) et entre dans la cavité utérine. Commence à former un blastocyste.",
              "type": "info"
            },
            {
              "text": "Jours 6–7 : Le blastocyste éclot de sa coquille protectrice (zone pellucide) et commence à s'attacher à l'endomètre.",
              "type": "info"
            },
            {
              "text": "Jours 8–10 : Période de nidation maximale. L'embryon s'enfouit dans la paroi utérine et établit l'approvisionnement sanguin. La production d'hCG commence.",
              "type": "info"
            },
            {
              "text": "Jours 11–14 : Les niveaux d'hCG montent suffisamment pour être détectables par les tests de grossesse à domicile. La nidation est complète.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calculs",
          "description": "Comment estimer votre fenêtre de nidation.",
          "examples": [
            {
              "title": "Date d'Ovulation Connue",
              "steps": [
                "Date d'ovulation : 10 février",
                "Fenêtre de nidation : 10 fév + 6 à 10 fév + 12",
                "Fenêtre : 16 février – 22 février",
                "Jour pic (9 JDO) : 19 février",
                "Test le plus précoce (10 JDO) : 20 février",
                "Test fiable (14 JDO) : 24 février"
              ],
              "result": "Nidation la plus probable vers le 19 février. Testez le 24 février."
            },
            {
              "title": "Depuis les Dernières Règles (cycle de 30 jours)",
              "steps": [
                "DDR : 15 janvier, durée de cycle : 30 jours",
                "Ovulation : 15 jan + (30 - 14) = 15 jan + 16 = 31 janvier",
                "Fenêtre de nidation : 6 fév – 12 fév",
                "Jour pic (9 JDO) : 9 février",
                "Test le plus précoce (10 JDO) : 10 février",
                "Test fiable (14 JDO) : 14 février"
              ],
              "result": "Nidation la plus probable vers le 9 février. Testez le 14 février."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quand la nidation se produit-elle après l'ovulation ?",
          "answer": "La nidation se produit typiquement entre 6 et 12 jours après l'ovulation (JDO), le jour le plus courant étant 9 JDO. La recherche montre qu'environ 84% des nidations se produisent entre les jours 8 et 10. Plus tôt que le jour 6 est extrêmement rare car l'embryon ne s'est pas suffisamment développé, et plus tard que le jour 12 comporte un risque plus élevé de perte précoce."
        },
        {
          "question": "Quels sont les signes de nidation ?",
          "answer": "Certaines femmes ressentent de légers saignements (rose ou brun), des crampes légères, ou une chute d'un jour de la température basale autour de la nidation. Cependant, ces symptômes se produisent aussi dans les cycles non enceintes à cause de la progestérone. Beaucoup de grossesses n'ont aucun symptôme notable de nidation. La seule confirmation fiable est un test de grossesse positif."
        },
        {
          "question": "Quand puis-je faire un test de grossesse au plus tôt ?",
          "answer": "Le plus tôt absolu est environ 10 JDO, mais la précision est faible (environ 60%). À 12 JDO, la précision s'améliore à environ 75–80%. Pour le résultat le plus fiable (90%+), attendez jusqu'à 14 JDO ou le jour de vos règles prévues. Tester avec la première urine du matin donne la plus haute concentration d'hCG."
        },
        {
          "question": "Quelle est la différence entre saignement de nidation et règles ?",
          "answer": "Le saignement de nidation est typiquement très léger (spotting), de couleur rose ou brune, dure 1–2 jours, et ne remplit pas une serviette ou un tampon. Les règles commencent léger mais deviennent plus abondantes, sont rouges, durent 3–7 jours, et impliquent plus de sang. Si vous n'êtes pas sûre, attendez quelques jours et faites un test de grossesse."
        },
        {
          "question": "La nidation peut-elle échouer ?",
          "answer": "Oui. On estime que 30–50% des ovules fécondés échouent à s'implanter. Cela peut être dû à des anomalies chromosomiques dans l'embryon, une paroi endométriale insuffisante, des déséquilibres hormonaux, ou des problèmes de timing. La plupart des échecs de nidation passent inaperçus et apparaissent comme des règles normales."
        },
        {
          "question": "La fenêtre de nidation change-t-elle avec la durée du cycle ?",
          "answer": "La fenêtre de nidation est toujours 6–12 jours après l'ovulation, indépendamment de la durée du cycle. Cependant, le timing de l'ovulation change avec la durée du cycle. Dans un cycle de 28 jours, l'ovulation est vers le jour 14. Dans un cycle de 35 jours, c'est vers le jour 21. Donc les dates calendaires de nidation changent, mais la fenêtre biologique post-ovulation reste la même."
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
      "name": "Einnistungsrechner",
      "slug": "einnistungs-rechner",
      "subtitle": "Vorhersage Ihres Einnistungsfensters, tägliche Wahrscheinlichkeit nach ES+X und der beste Tag für einen Schwangerschaftstest.",
      "breadcrumb": "Einnistung",
      "seo": {
        "title": "Einnistungsrechner - Fenster, ES+X & Testtag",
        "description": "Berechnen Sie, wann die Einnistung nach dem Eisprung erfolgt. Sehen Sie Ihre tägliche Wahrscheinlichkeitstabelle, das Einnistungsfenster und den frühesten zuverlässigen Schwangerschaftstest-Termin.",
        "shortDescription": "Berechnen Sie Ihr Einnistungsfenster und den besten Tag für den Schwangerschaftstest.",
        "keywords": [
          "einnistungsrechner",
          "wann erfolgt einnistung",
          "einnistungsfenster",
          "tage nach eisprung einnistung",
          "ES+ einnistung",
          "wann schwangerschaftstest machen",
          "einnistungsdatum rechner",
          "einnistungssymptome timing"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "inputMethod": {
          "label": "Ich kenne mein...",
          "helpText": "Wählen Sie, ob Sie Ihr Eisprungdatum oder das Datum der letzten Periode kennen",
          "options": {
            "ovulation": "Eisprungdatum",
            "lmp": "Datum der letzten Periode"
          }
        },
        "ovulationDate": {
          "label": "Eisprungdatum",
          "helpText": "Das Datum Ihres Eisprungs (durch Tracking, LH-Test oder Basaltemperatur)"
        },
        "lmpDate": {
          "label": "Erster Tag der letzten Periode",
          "helpText": "Der erste Tag Ihrer letzten Menstruation"
        },
        "cycleLength": {
          "label": "Durchschnittliche Zykluslänge",
          "helpText": "Ihre typische Menstruationszykluslänge (21–45 Tage)"
        }
      },
      "results": {
        "ovulationDate": {
          "label": "Geschätzter Eisprungtermin"
        },
        "implantationWindowStart": {
          "label": "Einnistungsfenster (Beginn)"
        },
        "peakImplantationDay": {
          "label": "Wahrscheinlichste Einnistung"
        },
        "implantationWindowEnd": {
          "label": "Einnistungsfenster (Ende)"
        },
        "earliestTestDate": {
          "label": "Frühester Testtermin"
        },
        "reliableTestDate": {
          "label": "Zuverlässigster Testtermin"
        },
        "estimatedDueDate": {
          "label": "Geschätzter Entbindungstermin (bei Empfängnis)"
        }
      },
      "presets": {
        "regular28": {
          "label": "28-Tage-Zyklus",
          "description": "Regelmäßiger Zyklus, Berechnung ab letzter Periode"
        },
        "regular30": {
          "label": "30-Tage-Zyklus",
          "description": "Etwas längerer Zyklus, ab letzter Periode"
        },
        "longCycle35": {
          "label": "35-Tage-Zyklus",
          "description": "Längerer Zyklus, ab letzter Periode"
        },
        "knownOvulation": {
          "label": "Bekannter Eisprung",
          "description": "Verwende das beobachtete Eisprungdatum direkt"
        }
      },
      "values": {
        "days": "Tage",
        "day": "Tag",
        "DPO": "ES+"
      },
      "formats": {
        "summary": "Einnistung am wahrscheinlichsten um {peakDay} (ES+9). Fenster: {windowStart} bis {windowEnd}. Machen Sie einen Schwangerschaftstest am oder nach {testDate} für zuverlässige Ergebnisse."
      },
      "infoCards": {
        "metrics": {
          "title": "Ihre Einnistungs-Zeitlinie",
          "items": [
            {
              "label": "Eisprungdatum",
              "valueKey": "ovulationDate"
            },
            {
              "label": "Einnistungsfenster",
              "valueKey": "implantationWindow"
            },
            {
              "label": "Höchsttag (ES+9)",
              "valueKey": "peakImplantationDay"
            },
            {
              "label": "Entbindungstermin (bei Empfängnis)",
              "valueKey": "estimatedDueDate"
            }
          ]
        },
        "details": {
          "title": "Schwangerschaftstest-Timing",
          "items": [
            {
              "label": "Frühester Test (ES+10)",
              "valueKey": "earliestTestDate"
            },
            {
              "label": "Zuverlässiger Test (ES+14)",
              "valueKey": "reliableTestDate"
            },
            {
              "label": "hCG nachweisbar nach",
              "valueKey": "hcgDetection"
            },
            {
              "label": "Testgenauigkeit bei ES+14",
              "valueKey": "testAccuracy"
            }
          ]
        },
        "tips": {
          "title": "Was Sie über die Einnistung wissen sollten",
          "items": [
            "Die Einnistung erfolgt 6–12 Tage nach dem Eisprung, wobei die meisten Schwangerschaften zwischen Tag 8–10 einnisten.",
            "Leichte Schmierblutungen oder milde Krämpfe um diese Zeit können Anzeichen einer Einnistung sein, aber viele Schwangerschaften haben überhaupt keine Symptome.",
            "Zu frühes Testen (vor ES+10) führt oft zu falsch-negativen Ergebnissen — hCG braucht Zeit, um sich nach der Einnistung aufzubauen.",
            "Für das zuverlässigste Ergebnis warten Sie bis ES+14 oder bis zum Tag Ihrer erwarteten Periode, um einen Heimschwangerschaftstest zu machen."
          ]
        }
      },
      "chart": {
        "title": "Einnistungswahrscheinlichkeit nach Tag",
        "xLabel": "Tage nach Eisprung (ES+)",
        "yLabel": "Wahrscheinlichkeit (%)",
        "series": {
          "probability": "Einnistungswahrscheinlichkeit"
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist die Einnistung?",
          "content": "Die Einnistung ist der Prozess, bei dem sich eine befruchtete Eizelle (jetzt Blastozyste genannt) an der Gebärmutterschleimhaut (Endometrium) anheftet. Dies ist ein entscheidender Schritt für die Entstehung einer Schwangerschaft — ohne erfolgreiche Einnistung kann eine Schwangerschaft nicht fortbestehen. Nach dem Eisprung wird die Eizelle im Eileiter befruchtet und verbringt mehrere Tage damit, sich zu teilen und zur Gebärmutter zu wandern. An den Tagen 6–12 nach dem Eisprung hat sich die Blastozyste genug entwickelt, um sich in die Gebärmutterwand einzunisten und eine Blutversorgungsverbindung mit der Mutter herzustellen. Nach der Einnistung beginnt der Embryo, humanes Choriongonadotropin (hCG) zu produzieren, das Hormon, das von Schwangerschaftstests erkannt wird."
        },
        "howItWorks": {
          "title": "Wie wird das Einnistungsfenster berechnet?",
          "content": "Das Einnistungsfenster basiert auf wegweisender Forschung, die im New England Journal of Medicine von Wilcox et al. (1999) veröffentlicht wurde, welche die täglichen hCG-Spiegel bei Frauen mit Kinderwunsch verfolgte. Die Studie fand heraus, dass die Einnistung zwischen 6 und 12 Tagen nach dem Eisprung (ES+) erfolgt, mit der höchsten Wahrscheinlichkeit bei ES+9. Wenn Sie Ihr Eisprungdatum kennen, addieren wir 6–12 Tage für Ihr Fenster. Wenn Sie nur das Datum Ihrer letzten Periode kennen, schätzen wir zuerst den Eisprung, indem wir 14 von Ihrer Zykluslänge abziehen (die Lutealphase dauert typischerweise ~14 Tage), dann wenden wir das 6–12 Tage Einnistungsfenster an."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Späte Einnistung (nach Tag 11) ist laut der Wilcox-Studie mit einem höheren Risiko für frühen Schwangerschaftsverlust verbunden.",
              "type": "warning"
            },
            {
              "text": "Das Einnistungsfenster ist dasselbe, egal ob Sie auf natürlichem Weg oder durch IUI empfangen haben — nur das IVF-Timing unterscheidet sich.",
              "type": "info"
            },
            {
              "text": "Einnistungsblutungen (leichte Schmierblutung) treten bei etwa 15–25% der Schwangerschaften auf und sind meist leichter und kürzer als eine Periode.",
              "type": "info"
            },
            {
              "text": "Progesteron-Symptome (Brustspannen, Müdigkeit, Stimmungsschwankungen) treten auf, egal ob eine Einnistung stattfindet oder nicht — sie sind keine zuverlässigen Indikatoren.",
              "type": "warning"
            },
            {
              "text": "Ein positiver Schwangerschaftstest ist die einzige zuverlässige Bestätigung, dass eine Einnistung stattgefunden hat.",
              "type": "info"
            },
            {
              "text": "Wenn Ihre Zyklen unregelmäßig sind, können diese Schätzungen weniger genau sein — erwägen Sie die Verfolgung des Eisprungs mit LH-Tests oder Basaltemperatur für bessere Daten.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Die Reise vom Eisprung zur Einnistung",
          "items": [
            {
              "text": "Tag 0 (Eisprung): Eizelle wird vom Eierstock freigesetzt, 12–24 Stunden lebensfähig. Befruchtung erfolgt im Eileiter.",
              "type": "info"
            },
            {
              "text": "Tage 1–3: Befruchtete Eizelle (Zygote) teilt sich schnell, während sie den Eileiter zur Gebärmutter hinunterwandert.",
              "type": "info"
            },
            {
              "text": "Tage 4–5: Embryo erreicht das Morula-Stadium (16+ Zellen) und tritt in die Gebärmutterhöhle ein. Beginnt eine Blastozyste zu bilden.",
              "type": "info"
            },
            {
              "text": "Tage 6–7: Blastozyste schlüpft aus ihrer Schutzhülle (Zona pellucida) und beginnt sich an das Endometrium anzuheften.",
              "type": "info"
            },
            {
              "text": "Tage 8–10: Höchste Einnistungsperiode. Der Embryo gräbt sich in die Gebärmutterschleimhaut ein und stellt die Blutversorgung her. hCG-Produktion beginnt.",
              "type": "info"
            },
            {
              "text": "Tage 11–14: hCG-Spiegel steigen genug an, um von Heimschwangerschaftstests erkannt zu werden. Einnistung ist abgeschlossen.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Wie Sie Ihr Einnistungsfenster schätzen.",
          "examples": [
            {
              "title": "Bekanntes Eisprungdatum",
              "steps": [
                "Eisprungdatum: 10. Februar",
                "Einnistungsfenster: 10. Feb + 6 bis 10. Feb + 12",
                "Fenster: 16. Februar – 22. Februar",
                "Höchsttag (ES+9): 19. Februar",
                "Frühester Test (ES+10): 20. Februar",
                "Zuverlässiger Test (ES+14): 24. Februar"
              ],
              "result": "Wahrscheinlichste Einnistung um den 19. Februar. Test am 24. Februar."
            },
            {
              "title": "Ab letzter Periode (30-Tage-Zyklus)",
              "steps": [
                "Letzte Periode: 15. Januar, Zykluslänge: 30 Tage",
                "Eisprung: 15. Jan + (30 - 14) = 15. Jan + 16 = 31. Januar",
                "Einnistungsfenster: 6. Feb – 12. Feb",
                "Höchsttag (ES+9): 9. Februar",
                "Frühester Test (ES+10): 10. Februar",
                "Zuverlässiger Test (ES+14): 14. Februar"
              ],
              "result": "Wahrscheinlichste Einnistung um den 9. Februar. Test am 14. Februar."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wann erfolgt die Einnistung nach dem Eisprung?",
          "answer": "Die Einnistung erfolgt typischerweise zwischen 6 und 12 Tagen nach dem Eisprung (ES+), wobei der häufigste Tag ES+9 ist. Forschung zeigt, dass etwa 84% der Einnistungen zwischen den Tagen 8 und 10 erfolgen. Früher als Tag 6 ist extrem selten, da sich der Embryo noch nicht genug entwickelt hat, und später als Tag 12 birgt ein höheres Risiko für frühen Verlust."
        },
        {
          "question": "Was sind die Anzeichen einer Einnistung?",
          "answer": "Einige Frauen erleben leichte Schmierblutungen (rosa oder braun), milde Krämpfe oder einen eintägigen Abfall der Basaltemperatur um die Einnistung herum. Jedoch treten diese Symptome auch in nicht-schwangeren Zyklen aufgrund von Progesteron auf. Viele Schwangerschaften haben überhaupt keine bemerkbaren Einnistungssymptome. Die einzige zuverlässige Bestätigung ist ein positiver Schwangerschaftstest."
        },
        {
          "question": "Wann kann ich frühestens einen Schwangerschaftstest machen?",
          "answer": "Das absolute Früheste ist etwa ES+10, aber die Genauigkeit ist niedrig (etwa 60%). Bei ES+12 verbessert sich die Genauigkeit auf etwa 75–80%. Für das zuverlässigste Ergebnis (90%+) warten Sie bis ES+14 oder bis zum Tag Ihrer erwarteten Periode. Testen mit dem ersten Morgenurin ergibt die höchste hCG-Konzentration."
        },
        {
          "question": "Was ist der Unterschied zwischen Einnistungsblutung und Periode?",
          "answer": "Einnistungsblutung ist typischerweise sehr leicht (Schmierblutung), rosa oder braun, dauert 1–2 Tage und füllt keine Binde oder Tampon. Eine Periode beginnt leicht, wird aber stärker, ist rot, dauert 3–7 Tage und beinhaltet mehr Blut. Wenn Sie unsicher sind, warten Sie ein paar Tage und machen einen Schwangerschaftstest."
        },
        {
          "question": "Kann die Einnistung fehlschlagen?",
          "answer": "Ja. Schätzungsweise 30–50% der befruchteten Eizellen schaffen es nicht, sich einzunisten. Dies kann aufgrund chromosomaler Abnormitäten im Embryo, unzureichender Gebärmutterschleimhaut, hormoneller Ungleichgewichte oder Timing-Problemen geschehen. Die meisten fehlgeschlagenen Einnistungen bleiben unbemerkt und erscheinen als normale Periode."
        },
        {
          "question": "Ändert sich das Einnistungsfenster mit der Zykluslänge?",
          "answer": "Das Einnistungsfenster ist immer 6–12 Tage nach dem Eisprung, unabhängig von der Zykluslänge. Jedoch ändert sich das Eisprung-Timing mit der Zykluslänge. In einem 28-Tage-Zyklus ist der Eisprung um Tag 14. In einem 35-Tage-Zyklus ist er um Tag 21. So verschieben sich die Kalenderdaten der Einnistung, aber das biologische Fenster nach dem Eisprung bleibt dasselbe."
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
      id: "inputMethod",
      type: "radio",
      defaultValue: "lmp",
      options: [{ value: "ovulation" }, { value: "lmp" }],
    },
    {
      id: "ovulationDate",
      type: "date",
      defaultValue: null,
      showWhen: { field: "inputMethod", value: "ovulation" },
    },
    {
      id: "lmpDate",
      type: "date",
      defaultValue: null,
      showWhen: { field: "inputMethod", value: "lmp" },
    },
    {
      id: "cycleLength",
      type: "number",
      defaultValue: 28,
      min: 21,
      max: 45,
      step: 1,
      suffix: "days",
      showWhen: { field: "inputMethod", value: "lmp" },
    },
  ],

  inputGroups: [],

  results: [
    { id: "ovulationDate", type: "primary", format: "text" },
    { id: "implantationWindowStart", type: "secondary", format: "text" },
    { id: "peakImplantationDay", type: "secondary", format: "text" },
    { id: "implantationWindowEnd", type: "secondary", format: "text" },
    { id: "earliestTestDate", type: "secondary", format: "text" },
    { id: "reliableTestDate", type: "secondary", format: "text" },
    { id: "estimatedDueDate", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "🧪", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "implantationProbability",
    type: "bar",
    xKey: "dpo",
    height: 300,
    stacked: false,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "percentage",
    series: [{ key: "probability", type: "bar", color: "#ec4899" }],
  },

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
      authors: "Wilcox AJ, Baird DD, Weinberg CR",
      year: "1999",
      title:
        "Time of Implantation of the Conceptus and Loss of Pregnancy",
      source: "New England Journal of Medicine",
      url: "https://www.nejm.org/doi/full/10.1056/NEJM199906103402304",
    },
    {
      authors: "Gnoth C, Johnson S",
      year: "2014",
      title:
        "Strips of Hope: Accuracy of Home Pregnancy Tests and New Developments",
      source: "Geburtshilfe Frauenheilkd",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4119102/",
    },
  ],

  hero: {
    badge: "Based on Wilcox et al. (NEJM)",
  },

  sidebar: {},
  features: {},
  relatedCalculators: [
    "ovulation",
    "conception-date",
    "pregnancy-due-date",
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
export function calculateImplantation(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const inputMethod = (values.inputMethod as string) || "lmp";

  let ovulationDate: Date | null = null;

  if (inputMethod === "ovulation") {
    ovulationDate = parseDate(values.ovulationDate);
    if (!ovulationDate) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }
  } else {
    // LMP method
    const lmpDate = parseDate(values.lmpDate);
    if (!lmpDate) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }
    const cycleLength = (values.cycleLength as number) || 28;
    const ovulationDay = cycleLength - 14;
    ovulationDate = addDays(lmpDate, ovulationDay);
  }

  // ── CALCULATE DATES ──
  const windowStart = addDays(ovulationDate, 6);   // 6 DPO
  const peakDay = addDays(ovulationDate, 9);        // 9 DPO
  const windowEnd = addDays(ovulationDate, 12);     // 12 DPO
  const earliestTest = addDays(ovulationDate, 10);  // 10 DPO
  const reliableTest = addDays(ovulationDate, 14);  // 14 DPO

  // Due date: ovulation + 266 days (38 weeks from conception)
  const estimatedDueDate = addDays(ovulationDate, 266);

  // ── FORMAT DATES ──
  const ovulationStr = formatDate(ovulationDate);
  const windowStartStr = formatDate(windowStart);
  const peakDayStr = formatDate(peakDay);
  const windowEndStr = formatDate(windowEnd);
  const earliestTestStr = formatDate(earliestTest);
  const reliableTestStr = formatDate(reliableTest);
  const dueDateStr = formatDate(estimatedDueDate);

  const dpoLabel = v["DPO"] || "DPO";

  // ── CHART DATA: Probability by DPO ──
  const chartData: Array<Record<string, unknown>> = [];
  for (let dpo = 5; dpo <= 14; dpo++) {
    const prob = IMPLANTATION_PROBABILITY[dpo] || 0;
    const dateForDpo = addDays(ovulationDate, dpo);
    chartData.push({
      dpo: `${dpo} ${dpoLabel}`,
      probability: prob,
    });
  }

  // ── SUMMARY ──
  const summaryText =
    f.summary
      ?.replace("{peakDay}", peakDayStr)
      .replace("{windowStart}", windowStartStr)
      .replace("{windowEnd}", windowEndStr)
      .replace("{testDate}", reliableTestStr) ||
    `Implantation most likely around ${peakDayStr}. Window: ${windowStartStr} – ${windowEndStr}. Test on ${reliableTestStr}.`;

  return {
    values: {
      ovulationDate: ovulationStr,
      implantationWindowStart: windowStartStr,
      peakImplantationDay: peakDayStr,
      implantationWindowEnd: windowEndStr,
      earliestTestDate: earliestTestStr,
      reliableTestDate: reliableTestStr,
      estimatedDueDate: dueDateStr,
      // For infoCards
      implantationWindow: `${windowStartStr} – ${windowEndStr}`,
      hcgDetection: `3–4 ${v["days"] || "days"} after implantation`,
      testAccuracy: "~90%",
    },
    formatted: {
      ovulationDate: ovulationStr,
      implantationWindowStart: `${windowStartStr} (6 ${dpoLabel})`,
      peakImplantationDay: `${peakDayStr} (9 ${dpoLabel})`,
      implantationWindowEnd: `${windowEndStr} (12 ${dpoLabel})`,
      earliestTestDate: `${earliestTestStr} (10 ${dpoLabel})`,
      reliableTestDate: `${reliableTestStr} (14 ${dpoLabel})`,
      estimatedDueDate: dueDateStr,
    },
    summary: summaryText,
    isValid: true,
    metadata: {
      chartData,
    },
  };
}

export default implantationConfig;
