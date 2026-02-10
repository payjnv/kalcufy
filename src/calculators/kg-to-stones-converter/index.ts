import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

export const kgToStonesConverterConfig: CalculatorConfigV4 = {
  id: "kg-to-stones-converter",
  version: "4.0",
  category: "conversion",
  icon: "⚖️",

  presets: [
    { id: "light", icon: "🪶", values: { kgValue: 50 } },
    { id: "average", icon: "⚖️", values: { kgValue: 70 } },
    { id: "heavy", icon: "🏋️", values: { kgValue: 95 } },
    { id: "veryHeavy", icon: "💪", values: { kgValue: 120 } },
  ],

  t: {
    en: {
      name: "KG to Stones Converter",
      slug: "kg-to-stones-converter",
      subtitle:
        "Convert kilograms to stones and pounds instantly — essential for understanding UK body weight measurements.",
      breadcrumb: "KG to Stones",

      seo: {
        title: "KG to Stones Converter - Kilograms to Stone | Free Tool",
        description:
          "Convert kilograms to stones and pounds instantly. Includes a reference table, precise decimal output, and automatic stones-and-pounds breakdown for UK weight measurements.",
        shortDescription: "Convert kilograms to stones and pounds with a reference table.",
        keywords: [
          "kg to stones",
          "kilograms to stones",
          "kg to stone converter",
          "convert kg to stone",
          "kg to st",
          "metric to uk weight",
          "kilograms to stone and pounds",
          "how many stone am i",
        ],
      },

      calculator: { yourInformation: "Enter Weight" },
      ui: { yourInformation: "Enter Weight", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        kgValue: {
          label: "Weight in Kilograms",
          helpText: "Enter the weight in kilograms (kg). 1 kg = 0.15747 stone",
        },
      },

      results: {
        stones: { label: "Stones (decimal)" },
        stonePounds: { label: "Stone & Pounds" },
        pounds: { label: "Pounds" },
      },

      presets: {
        light: { label: "50 kg", description: "~7 st 12 lbs" },
        average: { label: "70 kg", description: "~11 st 0 lbs" },
        heavy: { label: "95 kg", description: "~14 st 13 lbs" },
        veryHeavy: { label: "120 kg", description: "~18 st 13 lbs" },
      },

      values: { kg: "kg", g: "g", lbs: "lbs", st: "st" },

      formats: {
        summary: "{kg} kg = {stones} stone ({stonePounds})",
      },

      infoCards: {
        conversions: {
          title: "Conversion Results",
          items: [
            { label: "Stones (decimal)", valueKey: "stones" },
            { label: "Stone & Pounds", valueKey: "stonePounds" },
            { label: "Total Pounds", valueKey: "pounds" },
            { label: "Grams", valueKey: "grams" },
          ],
        },
        quickRef: {
          title: "Quick Reference",
          items: [
            { label: "50 kg", valueKey: "ref50" },
            { label: "70 kg", valueKey: "ref70" },
            { label: "80 kg", valueKey: "ref80" },
            { label: "100 kg", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "Did You Know?",
          items: [
            "In the UK, people typically express weight as stones and pounds, e.g., '11 stone 4 pounds' rather than a decimal like '11.29 stone'. This converter provides both formats.",
            "Most bathroom scales sold in the UK display weight in all three units: stones, kilograms, and pounds. Digital scales often let you switch between them with a button.",
            "The NHS (UK National Health Service) uses kilograms for medical records, but patients are asked their weight in stones during routine consultations.",
            "When converting kg to stones for a rough estimate, divide by 6.35 — or even quicker, divide by 6 and subtract 5% for a close approximation.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Stone in Weight?",
          content:
            "The stone is an Imperial unit of weight equal to 14 pounds or approximately 6.35 kilograms, primarily used in the United Kingdom and Ireland for measuring body weight. While the kilogram is the internationally recognized SI unit for mass, the stone persists in British and Irish culture as the preferred way to discuss personal weight in everyday conversation. Understanding the kg-to-stone conversion is essential for anyone moving between metric and Imperial systems, whether you're reading a British fitness magazine, discussing weight with a UK doctor, or following a British diet program. The conversion factor is precise: 1 kilogram = 0.157473044 stones, or equivalently, divide kilograms by 6.35029318 to get stones.",
        },
        howItWorks: {
          title: "How to Convert Kilograms to Stones",
          content:
            "To convert kilograms to stones, divide the kilogram value by 6.35029318. For example, 80 kg ÷ 6.35029 = 12.598 stones. To express this as stones and pounds (the typical UK format), take the whole number (12 stones) and multiply the decimal by 14 to get pounds: 0.598 × 14 = 8.37 pounds, giving you 12 stone 8 pounds. For mental math, a quick approximation is to multiply kilograms by 0.157 — this gives you stones directly. Or divide by 6.35 and round to the nearest quarter stone for a casual estimate.",
        },
        considerations: {
          title: "Conversion Facts",
          items: [
            { text: "1 kg = 0.157473 stones = 2.20462 pounds. These are exact conversion factors defined by international standards.", type: "info" },
            { text: "To convert back: 1 stone = 6.35029 kg. Multiply stones by 6.35029 to get kilograms.", type: "info" },
            { text: "The stone is subdivided into 14 pounds. There are no smaller subdivisions — fractions are expressed in pounds (e.g., 10 st 7 lbs).", type: "info" },
            { text: "In the US, weight is expressed in pounds only. In most of Europe, Asia, and South America, kilograms are the standard.", type: "info" },
            { text: "Airline baggage limits are in kilograms worldwide. A typical 23 kg limit = 3 stone 9 lbs = 50.7 lbs.", type: "info" },
            { text: "BMI calculations require kilograms. If you know your weight in stones, convert to kg first: multiply stones by 6.35029, add extra pounds × 0.45359.", type: "info" },
          ],
        },
        categories: {
          title: "Common Weights in Stones & KG",
          items: [
            { text: "50 kg = 7 st 12 lbs — Typical weight for a petite adult or older teenager.", type: "info" },
            { text: "60 kg = 9 st 6 lbs — Average weight for women in many countries.", type: "info" },
            { text: "70 kg = 11 st 0 lbs — Average weight for adults globally.", type: "info" },
            { text: "80 kg = 12 st 8 lbs — Average weight for men in the UK.", type: "info" },
            { text: "90 kg = 14 st 2 lbs — Above average, common for tall or muscular men.", type: "info" },
            { text: "100 kg = 15 st 10 lbs — Heavyweight range. Often used as a benchmark in UK fitness goals.", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Step-by-step kg to stone conversions",
          examples: [
            {
              title: "Convert 75 kg to stones and pounds",
              steps: [
                "75 ÷ 6.35029 = 11.811 stones",
                "Whole stones: 11",
                "Remaining: 0.811 × 14 = 11.35 pounds ≈ 11 lbs",
              ],
              result: "75 kg = 11 stone 11 lbs (11.81 st)",
            },
            {
              title: "Convert 63 kg to stones and pounds",
              steps: [
                "63 ÷ 6.35029 = 9.921 stones",
                "Whole stones: 9",
                "Remaining: 0.921 × 14 = 12.89 pounds ≈ 13 lbs",
              ],
              result: "63 kg = 9 stone 13 lbs (9.92 st)",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I convert kg to stones and pounds?", answer: "Divide kilograms by 6.35029 to get total stones. Take the whole number as stones, then multiply the decimal portion by 14 to get remaining pounds. For example, 85 kg ÷ 6.35029 = 13.385 stones → 13 stone and 0.385 × 14 = 5.4 pounds → 13 stone 5 lbs." },
        { question: "What is 70 kg in stones?", answer: "70 kg equals 11.02 stones, which is 11 stone 0.3 pounds — essentially exactly 11 stone. This makes 70 kg a convenient reference point for the conversion." },
        { question: "What is 80 kg in stones?", answer: "80 kg equals 12.60 stones, or 12 stone 8.4 pounds. This is close to the average weight for men in the United Kingdom." },
        { question: "How many kg is 10 stone?", answer: "10 stone equals 63.503 kg. To reverse the conversion, multiply stones by 6.35029." },
        { question: "Is the stone used anywhere besides the UK?", answer: "The stone is primarily used in the UK and Ireland for body weight. It was historically used in Australia, New Zealand, and Canada but those countries fully adopted the metric system in the 1970s. It is not used in the United States, where pounds are the standard Imperial unit for weight." },
        { question: "Why is a stone 14 pounds?", answer: "The standardization dates to the 1835 Weights and Measures Act. Before that, the stone varied from 5 to 40 pounds depending on the commodity being weighed. The 14-pound stone was the most common for wool trading and was selected as the official standard. It has remained unchanged since." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de KG a Stones",
      "slug": "calculadora-convertidor-kg-stones",
      "subtitle": "Convierte kilogramos a stones y libras al instante — esencial para entender las medidas de peso corporal del Reino Unido.",
      "breadcrumb": "KG a Stones",
      "seo": {
        "title": "Convertidor de KG a Stones - Kilogramos a Stone | Herramienta Gratuita",
        "description": "Convierte kilogramos a stones y libras al instante. Incluye tabla de referencia, salida decimal precisa y desglose automático en stones y libras para medidas de peso del Reino Unido.",
        "shortDescription": "Convierte kilogramos a stones y libras con tabla de referencia.",
        "keywords": [
          "kg a stones",
          "kilogramos a stones",
          "convertidor kg a stone",
          "convertir kg a stone",
          "kg a st",
          "métrico a peso reino unido",
          "kilogramos a stone y libras",
          "cuántos stones peso"
        ]
      },
      "inputs": {
        "kgValue": {
          "label": "Peso en Kilogramos",
          "helpText": "Ingrese el peso en kilogramos (kg). 1 kg = 0.15747 stone"
        }
      },
      "results": {
        "stones": {
          "label": "Stones (decimal)"
        },
        "stonePounds": {
          "label": "Stone y Libras"
        },
        "pounds": {
          "label": "Libras"
        }
      },
      "presets": {
        "light": {
          "label": "50 kg",
          "description": "~7 st 12 lbs"
        },
        "average": {
          "label": "70 kg",
          "description": "~11 st 0 lbs"
        },
        "heavy": {
          "label": "95 kg",
          "description": "~14 st 13 lbs"
        },
        "veryHeavy": {
          "label": "120 kg",
          "description": "~18 st 13 lbs"
        }
      },
      "values": {
        "kg": "kg",
        "g": "g",
        "lbs": "lbs",
        "st": "st"
      },
      "formats": {
        "summary": "{kg} kg = {stones} stone ({stonePounds})"
      },
      "infoCards": {
        "conversions": {
          "title": "Resultados de Conversión",
          "items": [
            {
              "label": "Stones (decimal)",
              "valueKey": "stones"
            },
            {
              "label": "Stone y Libras",
              "valueKey": "stonePounds"
            },
            {
              "label": "Total Libras",
              "valueKey": "pounds"
            },
            {
              "label": "Gramos",
              "valueKey": "grams"
            }
          ]
        },
        "quickRef": {
          "title": "Referencia Rápida",
          "items": [
            {
              "label": "50 kg",
              "valueKey": "ref50"
            },
            {
              "label": "70 kg",
              "valueKey": "ref70"
            },
            {
              "label": "80 kg",
              "valueKey": "ref80"
            },
            {
              "label": "100 kg",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "¿Sabías que?",
          "items": [
            "En el Reino Unido, las personas típicamente expresan el peso como stones y libras, ej. '11 stone 4 pounds' en lugar de un decimal como '11.29 stone'. Este convertidor proporciona ambos formatos.",
            "La mayoría de las básculas de baño vendidas en el Reino Unido muestran el peso en las tres unidades: stones, kilogramos y libras. Las básculas digitales a menudo permiten cambiar entre ellas con un botón.",
            "El NHS (Servicio Nacional de Salud del Reino Unido) usa kilogramos para registros médicos, pero se pregunta a los pacientes su peso en stones durante consultas rutinarias.",
            "Al convertir kg a stones para una estimación aproximada, divide por 6.35 — o aún más rápido, divide por 6 y resta 5% para una aproximación cercana."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es un Stone en Peso?",
          "content": "El stone es una unidad imperial de peso igual a 14 libras o aproximadamente 6.35 kilogramos, usado principalmente en el Reino Unido e Irlanda para medir el peso corporal. Mientras que el kilogramo es la unidad SI internacionalmente reconocida para masa, el stone persiste en la cultura británica e irlandesa como la forma preferida de discutir el peso personal en conversaciones cotidianas. Entender la conversión kg-a-stone es esencial para cualquiera que se mueva entre sistemas métrico e imperial, ya sea leyendo una revista de fitness británica, discutiendo peso con un médico del Reino Unido, o siguiendo un programa dietético británico. El factor de conversión es preciso: 1 kilogramo = 0.157473044 stones, o equivalentemente, divide kilogramos por 6.35029318 para obtener stones."
        },
        "howItWorks": {
          "title": "Cómo Convertir Kilogramos a Stones",
          "content": "Para convertir kilogramos a stones, divide el valor en kilogramos por 6.35029318. Por ejemplo, 80 kg ÷ 6.35029 = 12.598 stones. Para expresar esto como stones y libras (el formato típico del Reino Unido), toma el número entero (12 stones) y multiplica el decimal por 14 para obtener libras: 0.598 × 14 = 8.37 libras, dándote 12 stone 8 libras. Para cálculo mental, una aproximación rápida es multiplicar kilogramos por 0.157 — esto te da stones directamente. O divide por 6.35 y redondea al cuarto de stone más cercano para una estimación casual."
        },
        "considerations": {
          "title": "Datos de Conversión",
          "items": [
            {
              "text": "1 kg = 0.157473 stones = 2.20462 libras. Estos son factores de conversión exactos definidos por estándares internacionales.",
              "type": "info"
            },
            {
              "text": "Para convertir de vuelta: 1 stone = 6.35029 kg. Multiplica stones por 6.35029 para obtener kilogramos.",
              "type": "info"
            },
            {
              "text": "El stone se subdivide en 14 libras. No hay subdivisiones menores — las fracciones se expresan en libras (ej. 10 st 7 lbs).",
              "type": "info"
            },
            {
              "text": "En EE.UU., el peso se expresa solo en libras. En la mayoría de Europa, Asia y Sudamérica, los kilogramos son el estándar.",
              "type": "info"
            },
            {
              "text": "Los límites de equipaje de aerolíneas son en kilogramos mundialmente. Un límite típico de 23 kg = 3 stone 9 lbs = 50.7 lbs.",
              "type": "info"
            },
            {
              "text": "Los cálculos de IMC requieren kilogramos. Si conoces tu peso en stones, convierte a kg primero: multiplica stones por 6.35029, suma libras extra × 0.45359.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Pesos Comunes en Stones y KG",
          "items": [
            {
              "text": "50 kg = 7 st 12 lbs — Peso típico para un adulto pequeño o adolescente mayor.",
              "type": "info"
            },
            {
              "text": "60 kg = 9 st 6 lbs — Peso promedio para mujeres en muchos países.",
              "type": "info"
            },
            {
              "text": "70 kg = 11 st 0 lbs — Peso promedio para adultos globalmente.",
              "type": "info"
            },
            {
              "text": "80 kg = 12 st 8 lbs — Peso promedio para hombres en el Reino Unido.",
              "type": "info"
            },
            {
              "text": "90 kg = 14 st 2 lbs — Sobre el promedio, común para hombres altos o musculosos.",
              "type": "info"
            },
            {
              "text": "100 kg = 15 st 10 lbs — Rango de peso pesado. A menudo usado como referencia en objetivos de fitness del Reino Unido.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Conversión",
          "description": "Conversiones paso a paso de kg a stone",
          "examples": [
            {
              "title": "Convertir 75 kg a stones y libras",
              "steps": [
                "75 ÷ 6.35029 = 11.811 stones",
                "Stones enteros: 11",
                "Restante: 0.811 × 14 = 11.35 libras ≈ 11 lbs"
              ],
              "result": "75 kg = 11 stone 11 lbs (11.81 st)"
            },
            {
              "title": "Convertir 63 kg a stones y libras",
              "steps": [
                "63 ÷ 6.35029 = 9.921 stones",
                "Stones enteros: 9",
                "Restante: 0.921 × 14 = 12.89 libras ≈ 13 lbs"
              ],
              "result": "63 kg = 9 stone 13 lbs (9.92 st)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cómo convierto kg a stones y libras?",
          "answer": "Divide kilogramos por 6.35029 para obtener total de stones. Toma el número entero como stones, luego multiplica la porción decimal por 14 para obtener libras restantes. Por ejemplo, 85 kg ÷ 6.35029 = 13.385 stones → 13 stone y 0.385 × 14 = 5.4 libras → 13 stone 5 lbs."
        },
        {
          "question": "¿Cuánto es 70 kg en stones?",
          "answer": "70 kg equivale a 11.02 stones, que es 11 stone 0.3 libras — esencialmente exactamente 11 stone. Esto hace que 70 kg sea un punto de referencia conveniente para la conversión."
        },
        {
          "question": "¿Cuánto es 80 kg en stones?",
          "answer": "80 kg equivale a 12.60 stones, o 12 stone 8.4 libras. Esto está cerca del peso promedio para hombres en el Reino Unido."
        },
        {
          "question": "¿Cuántos kg son 10 stone?",
          "answer": "10 stone equivale a 63.503 kg. Para invertir la conversión, multiplica stones por 6.35029."
        },
        {
          "question": "¿Se usa el stone en algún lugar además del Reino Unido?",
          "answer": "El stone se usa principalmente en el Reino Unido e Irlanda para peso corporal. Históricamente se usaba en Australia, Nueva Zelanda y Canadá pero esos países adoptaron completamente el sistema métrico en los años 1970. No se usa en Estados Unidos, donde las libras son la unidad imperial estándar para peso."
        },
        {
          "question": "¿Por qué un stone son 14 libras?",
          "answer": "La estandarización data del Acta de Pesos y Medidas de 1835. Antes de eso, el stone variaba de 5 a 40 libras dependiendo de la mercancía que se pesaba. El stone de 14 libras era el más común para comercio de lana y fue seleccionado como el estándar oficial. Ha permanecido sin cambios desde entonces."
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
      "name": "Conversor de KG para Stones",
      "slug": "calculadora-conversor-kg-para-stones",
      "subtitle": "Converta quilogramas para stones e libras instantaneamente — essencial para compreender medidas de peso corporal do Reino Unido.",
      "breadcrumb": "KG para Stones",
      "seo": {
        "title": "Conversor KG para Stones - Quilogramas para Stone | Ferramenta Gratuita",
        "description": "Converta quilogramas para stones e libras instantaneamente. Inclui tabela de referência, saída decimal precisa e divisão automática em stones-e-libras para medidas de peso do Reino Unido.",
        "shortDescription": "Converta quilogramas para stones e libras com tabela de referência.",
        "keywords": [
          "kg para stones",
          "quilogramas para stones",
          "conversor kg para stone",
          "converter kg para stone",
          "kg para st",
          "métrico para peso reino unido",
          "quilogramas para stone e libras",
          "quantos stones eu tenho"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "kgValue": {
          "label": "Peso em Quilogramas",
          "helpText": "Insira o peso em quilogramas (kg). 1 kg = 0,15747 stone"
        }
      },
      "results": {
        "stones": {
          "label": "Stones (decimal)"
        },
        "stonePounds": {
          "label": "Stone e Libras"
        },
        "pounds": {
          "label": "Libras"
        }
      },
      "presets": {
        "light": {
          "label": "50 kg",
          "description": "~7 st 12 lbs"
        },
        "average": {
          "label": "70 kg",
          "description": "~11 st 0 lbs"
        },
        "heavy": {
          "label": "95 kg",
          "description": "~14 st 13 lbs"
        },
        "veryHeavy": {
          "label": "120 kg",
          "description": "~18 st 13 lbs"
        }
      },
      "values": {
        "kg": "kg",
        "g": "g",
        "lbs": "lbs",
        "st": "st"
      },
      "formats": {
        "summary": "{kg} kg = {stones} stone ({stonePounds})"
      },
      "infoCards": {
        "conversions": {
          "title": "Resultados da Conversão",
          "items": [
            {
              "label": "Stones (decimal)",
              "valueKey": "stones"
            },
            {
              "label": "Stone e Libras",
              "valueKey": "stonePounds"
            },
            {
              "label": "Total em Libras",
              "valueKey": "pounds"
            },
            {
              "label": "Gramas",
              "valueKey": "grams"
            }
          ]
        },
        "quickRef": {
          "title": "Referência Rápida",
          "items": [
            {
              "label": "50 kg",
              "valueKey": "ref50"
            },
            {
              "label": "70 kg",
              "valueKey": "ref70"
            },
            {
              "label": "80 kg",
              "valueKey": "ref80"
            },
            {
              "label": "100 kg",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "Você Sabia?",
          "items": [
            "No Reino Unido, as pessoas normalmente expressam o peso como stones e libras, por exemplo, '11 stone 4 pounds' em vez de decimal como '11,29 stone'. Este conversor fornece ambos os formatos.",
            "A maioria das balanças vendidas no Reino Unido exibe o peso em três unidades: stones, quilogramas e libras. Balanças digitais frequentemente permitem alternar entre elas com um botão.",
            "O NHS (Serviço Nacional de Saúde do Reino Unido) usa quilogramas para registros médicos, mas os pacientes são perguntados sobre seu peso em stones durante consultas de rotina.",
            "Ao converter kg para stones para uma estimativa aproximada, divida por 6,35 — ou ainda mais rápido, divida por 6 e subtraia 5% para uma aproximação próxima."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é um Stone em Peso?",
          "content": "O stone é uma unidade imperial de peso igual a 14 libras ou aproximadamente 6,35 quilogramas, usada principalmente no Reino Unido e Irlanda para medir peso corporal. Embora o quilograma seja a unidade SI internacionalmente reconhecida para massa, o stone persiste na cultura britânica e irlandesa como a forma preferida de discutir peso pessoal em conversas cotidianas. Compreender a conversão kg-para-stone é essencial para qualquer pessoa que alterne entre sistemas métrico e imperial, seja lendo uma revista de fitness britânica, discutindo peso com um médico do Reino Unido ou seguindo um programa dietético britânico. O fator de conversão é preciso: 1 quilograma = 0,157473044 stones, ou equivalentemente, divida quilogramas por 6,35029318 para obter stones."
        },
        "howItWorks": {
          "title": "Como Converter Quilogramas para Stones",
          "content": "Para converter quilogramas para stones, divida o valor em quilogramas por 6,35029318. Por exemplo, 80 kg ÷ 6,35029 = 12,598 stones. Para expressar isso como stones e libras (formato típico do Reino Unido), pegue o número inteiro (12 stones) e multiplique o decimal por 14 para obter libras: 0,598 × 14 = 8,37 libras, resultando em 12 stone 8 libras. Para cálculo mental, uma aproximação rápida é multiplicar quilogramas por 0,157 — isso resulta diretamente em stones. Ou divida por 6,35 e arredonde para o quarto de stone mais próximo para uma estimativa casual."
        },
        "considerations": {
          "title": "Fatos sobre Conversão",
          "items": [
            {
              "text": "1 kg = 0,157473 stones = 2,20462 libras. Estes são fatores de conversão exatos definidos por padrões internacionais.",
              "type": "info"
            },
            {
              "text": "Para converter de volta: 1 stone = 6,35029 kg. Multiplique stones por 6,35029 para obter quilogramas.",
              "type": "info"
            },
            {
              "text": "O stone é subdividido em 14 libras. Não há subdivisões menores — frações são expressas em libras (por exemplo, 10 st 7 lbs).",
              "type": "info"
            },
            {
              "text": "Nos EUA, o peso é expresso apenas em libras. Na maior parte da Europa, Ásia e América do Sul, quilogramas são o padrão.",
              "type": "info"
            },
            {
              "text": "Limites de bagagem de companhias aéreas são em quilogramas mundialmente. Um limite típico de 23 kg = 3 stone 9 lbs = 50,7 lbs.",
              "type": "info"
            },
            {
              "text": "Cálculos de IMC requerem quilogramas. Se você conhece seu peso em stones, converta primeiro para kg: multiplique stones por 6,35029, adicione libras extras × 0,45359.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Pesos Comuns em Stones e KG",
          "items": [
            {
              "text": "50 kg = 7 st 12 lbs — Peso típico para um adulto pequeno ou adolescente mais velho.",
              "type": "info"
            },
            {
              "text": "60 kg = 9 st 6 lbs — Peso médio para mulheres em muitos países.",
              "type": "info"
            },
            {
              "text": "70 kg = 11 st 0 lbs — Peso médio para adultos globalmente.",
              "type": "info"
            },
            {
              "text": "80 kg = 12 st 8 lbs — Peso médio para homens no Reino Unido.",
              "type": "info"
            },
            {
              "text": "90 kg = 14 st 2 lbs — Acima da média, comum para homens altos ou musculosos.",
              "type": "info"
            },
            {
              "text": "100 kg = 15 st 10 lbs — Faixa de peso pesado. Frequentemente usado como referência em objetivos de fitness do Reino Unido.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Conversão",
          "description": "Conversões passo a passo de kg para stone",
          "examples": [
            {
              "title": "Converter 75 kg para stones e libras",
              "steps": [
                "75 ÷ 6,35029 = 11,811 stones",
                "Stones inteiros: 11",
                "Restante: 0,811 × 14 = 11,35 libras ≈ 11 lbs"
              ],
              "result": "75 kg = 11 stone 11 lbs (11,81 st)"
            },
            {
              "title": "Converter 63 kg para stones e libras",
              "steps": [
                "63 ÷ 6,35029 = 9,921 stones",
                "Stones inteiros: 9",
                "Restante: 0,921 × 14 = 12,89 libras ≈ 13 lbs"
              ],
              "result": "63 kg = 9 stone 13 lbs (9,92 st)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Como converto kg para stones e libras?",
          "answer": "Divida quilogramas por 6,35029 para obter stones totais. Pegue o número inteiro como stones, depois multiplique a parte decimal por 14 para obter libras restantes. Por exemplo, 85 kg ÷ 6,35029 = 13,385 stones → 13 stone e 0,385 × 14 = 5,4 libras → 13 stone 5 lbs."
        },
        {
          "question": "Quanto é 70 kg em stones?",
          "answer": "70 kg equivale a 11,02 stones, que é 11 stone 0,3 libras — essencialmente exatamente 11 stone. Isso torna 70 kg um ponto de referência conveniente para a conversão."
        },
        {
          "question": "Quanto é 80 kg em stones?",
          "answer": "80 kg equivale a 12,60 stones, ou 12 stone 8,4 libras. Isso está próximo do peso médio para homens no Reino Unido."
        },
        {
          "question": "Quantos kg são 10 stone?",
          "answer": "10 stone equivale a 63,503 kg. Para reverter a conversão, multiplique stones por 6,35029."
        },
        {
          "question": "O stone é usado em algum lugar além do Reino Unido?",
          "answer": "O stone é usado principalmente no Reino Unido e Irlanda para peso corporal. Foi historicamente usado na Austrália, Nova Zelândia e Canadá, mas esses países adotaram completamente o sistema métrico na década de 1970. Não é usado nos Estados Unidos, onde libras são a unidade imperial padrão para peso."
        },
        {
          "question": "Por que um stone tem 14 libras?",
          "answer": "A padronização data da Lei de Pesos e Medidas de 1835. Antes disso, o stone variava de 5 a 40 libras dependendo da mercadoria sendo pesada. O stone de 14 libras era o mais comum para comércio de lã e foi selecionado como padrão oficial. Permaneceu inalterado desde então."
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
      "name": "Convertisseur KG vers Stones",
      "slug": "calculateur-convertisseur-kg-vers-stones",
      "subtitle": "Convertissez les kilogrammes en stones et livres instantanément — essentiel pour comprendre les mesures de poids corporel britanniques.",
      "breadcrumb": "KG vers Stones",
      "seo": {
        "title": "Convertisseur KG vers Stones - Kilogrammes vers Stone | Outil Gratuit",
        "description": "Convertissez les kilogrammes en stones et livres instantanément. Inclut un tableau de référence, une sortie décimale précise, et une répartition automatique stones-et-livres pour les mesures de poids britanniques.",
        "shortDescription": "Convertissez les kilogrammes en stones et livres avec un tableau de référence.",
        "keywords": [
          "kg vers stones",
          "kilogrammes vers stones",
          "convertisseur kg vers stone",
          "convertir kg en stone",
          "kg vers st",
          "métrique vers poids britannique",
          "kilogrammes vers stone et livres",
          "combien de stones je pèse"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "kgValue": {
          "label": "Poids en Kilogrammes",
          "helpText": "Saisissez le poids en kilogrammes (kg). 1 kg = 0,15747 stone"
        }
      },
      "results": {
        "stones": {
          "label": "Stones (décimal)"
        },
        "stonePounds": {
          "label": "Stone et Livres"
        },
        "pounds": {
          "label": "Livres"
        }
      },
      "presets": {
        "light": {
          "label": "50 kg",
          "description": "~7 st 12 lbs"
        },
        "average": {
          "label": "70 kg",
          "description": "~11 st 0 lbs"
        },
        "heavy": {
          "label": "95 kg",
          "description": "~14 st 13 lbs"
        },
        "veryHeavy": {
          "label": "120 kg",
          "description": "~18 st 13 lbs"
        }
      },
      "values": {
        "kg": "kg",
        "g": "g",
        "lbs": "lbs",
        "st": "st"
      },
      "formats": {
        "summary": "{kg} kg = {stones} stone ({stonePounds})"
      },
      "infoCards": {
        "conversions": {
          "title": "Résultats de Conversion",
          "items": [
            {
              "label": "Stones (décimal)",
              "valueKey": "stones"
            },
            {
              "label": "Stone et Livres",
              "valueKey": "stonePounds"
            },
            {
              "label": "Total Livres",
              "valueKey": "pounds"
            },
            {
              "label": "Grammes",
              "valueKey": "grams"
            }
          ]
        },
        "quickRef": {
          "title": "Référence Rapide",
          "items": [
            {
              "label": "50 kg",
              "valueKey": "ref50"
            },
            {
              "label": "70 kg",
              "valueKey": "ref70"
            },
            {
              "label": "80 kg",
              "valueKey": "ref80"
            },
            {
              "label": "100 kg",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "Le Saviez-Vous ?",
          "items": [
            "Au Royaume-Uni, les gens expriment généralement le poids en stones et livres, par ex. '11 stone 4 pounds' plutôt qu'un décimal comme '11,29 stone'. Ce convertisseur fournit les deux formats.",
            "La plupart des balances vendues au Royaume-Uni affichent le poids dans les trois unités : stones, kilogrammes et livres. Les balances numériques permettent souvent de basculer entre elles avec un bouton.",
            "Le NHS (Service National de Santé britannique) utilise les kilogrammes pour les dossiers médicaux, mais les patients sont interrogés sur leur poids en stones lors des consultations de routine.",
            "Pour convertir les kg en stones avec une estimation approximative, divisez par 6,35 — ou encore plus rapidement, divisez par 6 et soustrayez 5% pour une approximation proche."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Stone en Poids ?",
          "content": "Le stone est une unité impériale de poids égale à 14 livres ou environ 6,35 kilogrammes, principalement utilisée au Royaume-Uni et en Irlande pour mesurer le poids corporel. Bien que le kilogramme soit l'unité SI internationalement reconnue pour la masse, le stone persiste dans la culture britannique et irlandaise comme le moyen privilégié de discuter du poids personnel dans les conversations quotidiennes. Comprendre la conversion kg-vers-stone est essentiel pour toute personne naviguant entre les systèmes métrique et impérial, que vous lisiez un magazine de fitness britannique, discutiez du poids avec un médecin britannique, ou suiviez un programme diététique britannique. Le facteur de conversion est précis : 1 kilogramme = 0,157473044 stones, ou de manière équivalente, divisez les kilogrammes par 6,35029318 pour obtenir des stones."
        },
        "howItWorks": {
          "title": "Comment Convertir les Kilogrammes en Stones",
          "content": "Pour convertir les kilogrammes en stones, divisez la valeur en kilogrammes par 6,35029318. Par exemple, 80 kg ÷ 6,35029 = 12,598 stones. Pour exprimer cela comme stones et livres (le format britannique typique), prenez le nombre entier (12 stones) et multipliez la décimale par 14 pour obtenir les livres : 0,598 × 14 = 8,37 livres, vous donnant 12 stone 8 livres. Pour le calcul mental, une approximation rapide est de multiplier les kilogrammes par 0,157 — cela vous donne directement les stones. Ou divisez par 6,35 et arrondissez au quart de stone le plus proche pour une estimation approximative."
        },
        "considerations": {
          "title": "Faits de Conversion",
          "items": [
            {
              "text": "1 kg = 0,157473 stones = 2,20462 livres. Ce sont des facteurs de conversion exacts définis par les standards internationaux.",
              "type": "info"
            },
            {
              "text": "Pour convertir dans l'autre sens : 1 stone = 6,35029 kg. Multipliez les stones par 6,35029 pour obtenir les kilogrammes.",
              "type": "info"
            },
            {
              "text": "Le stone est subdivisé en 14 livres. Il n'y a pas de subdivisions plus petites — les fractions sont exprimées en livres (ex. 10 st 7 lbs).",
              "type": "info"
            },
            {
              "text": "Aux États-Unis, le poids est exprimé en livres seulement. Dans la plupart de l'Europe, l'Asie et l'Amérique du Sud, les kilogrammes sont la norme.",
              "type": "info"
            },
            {
              "text": "Les limites de bagages des compagnies aériennes sont en kilogrammes dans le monde entier. Une limite typique de 23 kg = 3 stone 9 lbs = 50,7 lbs.",
              "type": "info"
            },
            {
              "text": "Les calculs d'IMC nécessitent des kilogrammes. Si vous connaissez votre poids en stones, convertissez d'abord en kg : multipliez les stones par 6,35029, ajoutez les livres supplémentaires × 0,45359.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Poids Courants en Stones et KG",
          "items": [
            {
              "text": "50 kg = 7 st 12 lbs — Poids typique pour un adulte mince ou un adolescent plus âgé.",
              "type": "info"
            },
            {
              "text": "60 kg = 9 st 6 lbs — Poids moyen pour les femmes dans de nombreux pays.",
              "type": "info"
            },
            {
              "text": "70 kg = 11 st 0 lbs — Poids moyen pour les adultes mondialement.",
              "type": "info"
            },
            {
              "text": "80 kg = 12 st 8 lbs — Poids moyen pour les hommes au Royaume-Uni.",
              "type": "info"
            },
            {
              "text": "90 kg = 14 st 2 lbs — Au-dessus de la moyenne, commun pour les hommes grands ou musclés.",
              "type": "info"
            },
            {
              "text": "100 kg = 15 st 10 lbs — Gamme poids lourd. Souvent utilisé comme référence dans les objectifs de fitness britanniques.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Conversion",
          "description": "Conversions kg vers stone étape par étape",
          "examples": [
            {
              "title": "Convertir 75 kg en stones et livres",
              "steps": [
                "75 ÷ 6,35029 = 11,811 stones",
                "Stones entiers : 11",
                "Restant : 0,811 × 14 = 11,35 livres ≈ 11 lbs"
              ],
              "result": "75 kg = 11 stone 11 lbs (11,81 st)"
            },
            {
              "title": "Convertir 63 kg en stones et livres",
              "steps": [
                "63 ÷ 6,35029 = 9,921 stones",
                "Stones entiers : 9",
                "Restant : 0,921 × 14 = 12,89 livres ≈ 13 lbs"
              ],
              "result": "63 kg = 9 stone 13 lbs (9,92 st)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Comment convertir les kg en stones et livres ?",
          "answer": "Divisez les kilogrammes par 6,35029 pour obtenir le total de stones. Prenez le nombre entier comme stones, puis multipliez la partie décimale par 14 pour obtenir les livres restantes. Par exemple, 85 kg ÷ 6,35029 = 13,385 stones → 13 stone et 0,385 × 14 = 5,4 livres → 13 stone 5 lbs."
        },
        {
          "question": "Combien font 70 kg en stones ?",
          "answer": "70 kg équivaut à 11,02 stones, soit 11 stone 0,3 livres — essentiellement exactement 11 stone. Cela fait de 70 kg un point de référence pratique pour la conversion."
        },
        {
          "question": "Combien font 80 kg en stones ?",
          "answer": "80 kg équivaut à 12,60 stones, ou 12 stone 8,4 livres. C'est proche du poids moyen pour les hommes au Royaume-Uni."
        },
        {
          "question": "Combien de kg font 10 stone ?",
          "answer": "10 stone équivaut à 63,503 kg. Pour inverser la conversion, multipliez les stones par 6,35029."
        },
        {
          "question": "Le stone est-il utilisé ailleurs qu'au Royaume-Uni ?",
          "answer": "Le stone est principalement utilisé au Royaume-Uni et en Irlande pour le poids corporel. Il était historiquement utilisé en Australie, Nouvelle-Zélande et au Canada mais ces pays ont entièrement adopté le système métrique dans les années 1970. Il n'est pas utilisé aux États-Unis, où les livres sont l'unité impériale standard pour le poids."
        },
        {
          "question": "Pourquoi un stone fait-il 14 livres ?",
          "answer": "La standardisation date de la Loi sur les Poids et Mesures de 1835. Avant cela, le stone variait de 5 à 40 livres selon la marchandise pesée. Le stone de 14 livres était le plus courant pour le commerce de la laine et fut sélectionné comme standard officiel. Il est resté inchangé depuis."
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
      "name": "KG zu Stones Umrechner",
      "slug": "kg-zu-stones-umrechner-rechner",
      "subtitle": "Kilogramm sofort in Stones und Pfund umrechnen — unverzichtbar für britische Körpergewicht-Messungen.",
      "breadcrumb": "KG zu Stones",
      "seo": {
        "title": "KG zu Stones Umrechner - Kilogramm zu Stone | Kostenloses Tool",
        "description": "Kilogramm sofort in Stones und Pfund umrechnen. Enthält Referenztabelle, präzise Dezimalausgabe und automatische Stones-und-Pfund-Aufschlüsselung für britische Gewichtsmessungen.",
        "shortDescription": "Kilogramm in Stones und Pfund mit Referenztabelle umrechnen.",
        "keywords": [
          "kg zu stones",
          "kilogramm zu stones",
          "kg zu stone umrechner",
          "kg zu stone umrechnen",
          "kg zu st",
          "metrisch zu uk gewicht",
          "kilogramm zu stone und pfund",
          "wie viele stone bin ich"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "kgValue": {
          "label": "Gewicht in Kilogramm",
          "helpText": "Gewicht in Kilogramm (kg) eingeben. 1 kg = 0,15747 Stone"
        }
      },
      "results": {
        "stones": {
          "label": "Stones (dezimal)"
        },
        "stonePounds": {
          "label": "Stone & Pfund"
        },
        "pounds": {
          "label": "Pfund"
        }
      },
      "presets": {
        "light": {
          "label": "50 kg",
          "description": "~7 st 12 lbs"
        },
        "average": {
          "label": "70 kg",
          "description": "~11 st 0 lbs"
        },
        "heavy": {
          "label": "95 kg",
          "description": "~14 st 13 lbs"
        },
        "veryHeavy": {
          "label": "120 kg",
          "description": "~18 st 13 lbs"
        }
      },
      "values": {
        "kg": "kg",
        "g": "g",
        "lbs": "lbs",
        "st": "st"
      },
      "formats": {
        "summary": "{kg} kg = {stones} Stone ({stonePounds})"
      },
      "infoCards": {
        "conversions": {
          "title": "Umrechnungsergebnisse",
          "items": [
            {
              "label": "Stones (dezimal)",
              "valueKey": "stones"
            },
            {
              "label": "Stone & Pfund",
              "valueKey": "stonePounds"
            },
            {
              "label": "Pfund gesamt",
              "valueKey": "pounds"
            },
            {
              "label": "Gramm",
              "valueKey": "grams"
            }
          ]
        },
        "quickRef": {
          "title": "Schnellreferenz",
          "items": [
            {
              "label": "50 kg",
              "valueKey": "ref50"
            },
            {
              "label": "70 kg",
              "valueKey": "ref70"
            },
            {
              "label": "80 kg",
              "valueKey": "ref80"
            },
            {
              "label": "100 kg",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "Wussten Sie schon?",
          "items": [
            "In Großbritannien geben Menschen normalerweise ihr Gewicht in Stones und Pfund an, z.B. '11 Stone 4 Pfund' statt einer Dezimalzahl wie '11,29 Stone'. Dieser Umrechner bietet beide Formate.",
            "Die meisten in Großbritannien verkauften Badezimmerwaagen zeigen das Gewicht in allen drei Einheiten an: Stones, Kilogramm und Pfund. Digitalwaagen haben oft einen Knopf zum Wechseln zwischen ihnen.",
            "Der NHS (Britischer Gesundheitsdienst) verwendet Kilogramm für Krankenakten, aber Patienten werden bei Routineuntersuchungen nach ihrem Gewicht in Stones gefragt.",
            "Für eine grobe Schätzung von kg zu Stones teilen Sie durch 6,35 — oder noch schneller: durch 6 teilen und 5% abziehen für eine nahe Annäherung."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Stone beim Gewicht?",
          "content": "Der Stone ist eine imperiale Gewichtseinheit, die 14 Pfund oder etwa 6,35 Kilogramm entspricht und hauptsächlich in Großbritannien und Irland zur Messung des Körpergewichts verwendet wird. Während das Kilogramm die international anerkannte SI-Einheit für Masse ist, bleibt der Stone in der britischen und irischen Kultur die bevorzugte Art, über persönliches Gewicht im Alltag zu sprechen. Das Verständnis der kg-zu-Stone-Umrechnung ist wichtig für jeden, der zwischen metrischen und imperialen Systemen wechselt, ob Sie eine britische Fitness-Zeitschrift lesen, mit einem britischen Arzt über Gewicht sprechen oder ein britisches Diätprogramm befolgen. Der Umrechnungsfaktor ist präzise: 1 Kilogramm = 0,157473044 Stones, oder äquivalent: Kilogramm durch 6,35029318 teilen, um Stones zu erhalten."
        },
        "howItWorks": {
          "title": "Wie rechnet man Kilogramm in Stones um?",
          "content": "Um Kilogramm in Stones umzurechnen, teilen Sie den Kilogramm-Wert durch 6,35029318. Zum Beispiel: 80 kg ÷ 6,35029 = 12,598 Stones. Um dies als Stones und Pfund auszudrücken (das typische britische Format), nehmen Sie die ganze Zahl (12 Stones) und multiplizieren die Dezimalstelle mit 14, um Pfund zu erhalten: 0,598 × 14 = 8,37 Pfund, was 12 Stone 8 Pfund ergibt. Für Kopfrechnen ist eine schnelle Annäherung, Kilogramm mit 0,157 zu multiplizieren — das gibt Ihnen direkt Stones. Oder durch 6,35 teilen und auf den nächsten Viertel-Stone runden für eine grobe Schätzung."
        },
        "considerations": {
          "title": "Umrechnungsfakten",
          "items": [
            {
              "text": "1 kg = 0,157473 Stones = 2,20462 Pfund. Das sind exakte Umrechnungsfaktoren, die durch internationale Standards definiert sind.",
              "type": "info"
            },
            {
              "text": "Rückumrechnung: 1 Stone = 6,35029 kg. Stones mit 6,35029 multiplizieren, um Kilogramm zu erhalten.",
              "type": "info"
            },
            {
              "text": "Der Stone ist in 14 Pfund unterteilt. Es gibt keine kleineren Unterteilungen — Bruchteile werden in Pfund ausgedrückt (z.B. 10 st 7 lbs).",
              "type": "info"
            },
            {
              "text": "In den USA wird Gewicht nur in Pfund ausgedrückt. In den meisten Teilen Europas, Asiens und Südamerikas sind Kilogramm der Standard.",
              "type": "info"
            },
            {
              "text": "Gepäckgrenzen von Fluggesellschaften sind weltweit in Kilogramm. Eine typische 23-kg-Grenze = 3 Stone 9 lbs = 50,7 lbs.",
              "type": "info"
            },
            {
              "text": "BMI-Berechnungen erfordern Kilogramm. Wenn Sie Ihr Gewicht in Stones kennen, rechnen Sie zuerst in kg um: Stones mit 6,35029 multiplizieren, zusätzliche Pfund × 0,45359 addieren.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Häufige Gewichte in Stones & KG",
          "items": [
            {
              "text": "50 kg = 7 st 12 lbs — Typisches Gewicht für einen zierlichen Erwachsenen oder älteren Teenager.",
              "type": "info"
            },
            {
              "text": "60 kg = 9 st 6 lbs — Durchschnittsgewicht für Frauen in vielen Ländern.",
              "type": "info"
            },
            {
              "text": "70 kg = 11 st 0 lbs — Durchschnittsgewicht für Erwachsene weltweit.",
              "type": "info"
            },
            {
              "text": "80 kg = 12 st 8 lbs — Durchschnittsgewicht für Männer in Großbritannien.",
              "type": "info"
            },
            {
              "text": "90 kg = 14 st 2 lbs — Überdurchschnittlich, häufig für große oder muskulöse Männer.",
              "type": "info"
            },
            {
              "text": "100 kg = 15 st 10 lbs — Schwergewichtsbereich. Oft als Richtwert für britische Fitnessziele verwendet.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Schritt-für-Schritt kg zu Stone Umrechnungen",
          "examples": [
            {
              "title": "75 kg in Stones und Pfund umrechnen",
              "steps": [
                "75 ÷ 6,35029 = 11,811 Stones",
                "Ganze Stones: 11",
                "Verbleibend: 0,811 × 14 = 11,35 Pfund ≈ 11 lbs"
              ],
              "result": "75 kg = 11 Stone 11 lbs (11,81 st)"
            },
            {
              "title": "63 kg in Stones und Pfund umrechnen",
              "steps": [
                "63 ÷ 6,35029 = 9,921 Stones",
                "Ganze Stones: 9",
                "Verbleibend: 0,921 × 14 = 12,89 Pfund ≈ 13 lbs"
              ],
              "result": "63 kg = 9 Stone 13 lbs (9,92 st)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie rechne ich kg in Stones und Pfund um?",
          "answer": "Teilen Sie Kilogramm durch 6,35029, um die Gesamtzahl der Stones zu erhalten. Nehmen Sie die ganze Zahl als Stones, dann multiplizieren Sie den Dezimalteil mit 14, um die verbleibenden Pfund zu erhalten. Zum Beispiel: 85 kg ÷ 6,35029 = 13,385 Stones → 13 Stone und 0,385 × 14 = 5,4 Pfund → 13 Stone 5 lbs."
        },
        {
          "question": "Was sind 70 kg in Stones?",
          "answer": "70 kg entsprechen 11,02 Stones, was 11 Stone 0,3 Pfund sind — im Wesentlichen genau 11 Stone. Das macht 70 kg zu einem praktischen Referenzpunkt für die Umrechnung."
        },
        {
          "question": "Was sind 80 kg in Stones?",
          "answer": "80 kg entsprechen 12,60 Stones oder 12 Stone 8,4 Pfund. Das liegt nahe am Durchschnittsgewicht für Männer in Großbritannien."
        },
        {
          "question": "Wie viele kg sind 10 Stone?",
          "answer": "10 Stone entsprechen 63,503 kg. Für die Rückumrechnung multiplizieren Sie Stones mit 6,35029."
        },
        {
          "question": "Wird der Stone außer in Großbritannien noch irgendwo verwendet?",
          "answer": "Der Stone wird hauptsächlich in Großbritannien und Irland für das Körpergewicht verwendet. Er wurde historisch in Australien, Neuseeland und Kanada verwendet, aber diese Länder haben in den 1970er Jahren vollständig das metrische System übernommen. Er wird nicht in den Vereinigten Staaten verwendet, wo Pfund die Standard-Imperialeinheit für Gewicht sind."
        },
        {
          "question": "Warum hat ein Stone 14 Pfund?",
          "answer": "Die Standardisierung stammt aus dem Weights and Measures Act von 1835. Vorher variierte der Stone von 5 bis 40 Pfund, je nach der gewogenen Ware. Der 14-Pfund-Stone war der gebräuchlichste für den Wollhandel und wurde als offizieller Standard gewählt. Er ist seitdem unverändert geblieben."
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
      id: "kgValue",
      type: "number",
      defaultValue: null,
      placeholder: "70",
      min: 0.01,
      max: 1500,
      step: 0.1,
      suffix: "kg",
    },
  ],

  inputGroups: [],

  results: [
    { id: "stones", type: "primary", format: "number" },
    { id: "stonePounds", type: "secondary", format: "text" },
    { id: "pounds", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "conversions", type: "list", icon: "⚖️", itemCount: 4 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
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

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "Handbook 44 – Specifications for Weighing Devices", source: "NIST", url: "https://www.nist.gov/pml/owm/handbook-44-current-edition" },
    { authors: "UK National Measurement Office", year: "2023", title: "The Weights and Measures Act 1985", source: "UK Government", url: "https://www.legislation.gov.uk/ukpga/1985/72" },
  ],

  hero: { icon: "⚖️", label: "Conversion" },
  sidebar: { showRelated: true, showPopular: true },
  features: { saveResults: true, pdfExport: true, sharing: true },
  relatedCalculators: ["stones-to-kg-converter", "kg-to-lbs-calculator", "lbs-to-kg-calculator"],
  ads: { showSidebar: true, showBetweenSections: true },
};

// ─── Calculate ───────────────────────────────────────────────────────────────

export function calculateKgToStonesConverter(data: {
  values: Record<string, unknown>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const kgVal = values.kgValue as number | null;
  if (kgVal === null || kgVal <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const stonesDecimal = kgVal / 6.35029318;
  const totalLbs = kgVal * 2.20462;
  const wholeSt = Math.floor(stonesDecimal);
  const remainLbs = Math.round((stonesDecimal - wholeSt) * 14 * 10) / 10;
  const grams = kgVal * 1000;

  const stUnit = v["st"] || "st";
  const lbsUnit = v["lbs"] || "lbs";
  const kgUnit = v["kg"] || "kg";

  const stonePoundsStr = `${wholeSt} ${stUnit} ${remainLbs} ${lbsUnit}`;

  const f = (t?.formats as Record<string, string>) || {};
  const summary = f.summary
    ?.replace("{kg}", kgVal.toString())
    .replace("{stones}", stonesDecimal.toFixed(2))
    .replace("{stonePounds}", stonePoundsStr) || "";

  const fmt = (kg: number) => {
    const s = kg / 6.35029318;
    const ws = Math.floor(s);
    const rl = Math.round((s - ws) * 14);
    return `${ws} ${stUnit} ${rl} ${lbsUnit}`;
  };

  return {
    values: {
      stones: Math.round(stonesDecimal * 100) / 100,
      stonePounds: stonePoundsStr,
      pounds: Math.round(totalLbs * 10) / 10,
      grams: Math.round(grams),
      ref50: fmt(50),
      ref70: fmt(70),
      ref80: fmt(80),
      ref100: fmt(100),
    },
    formatted: {
      stones: `${stonesDecimal.toFixed(2)} ${stUnit}`,
      stonePounds: stonePoundsStr,
      pounds: `${totalLbs.toFixed(1)} ${lbsUnit}`,
      grams: `${grams.toLocaleString("en-US", { maximumFractionDigits: 0 })} g`,
      ref50: fmt(50),
      ref70: fmt(70),
      ref80: fmt(80),
      ref100: fmt(100),
    },
    summary,
    isValid: true,
  };
}

export default kgToStonesConverterConfig;
