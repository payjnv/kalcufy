import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

export const stonesToKgConverterConfig: CalculatorConfigV4 = {
  id: "stones-to-kg-converter",
  version: "4.0",
  category: "conversion",
  icon: "⚖️",

  presets: [
    { id: "light", icon: "🪶", values: { stoneValue: 8 } },
    { id: "average", icon: "⚖️", values: { stoneValue: 11 } },
    { id: "heavy", icon: "🏋️", values: { stoneValue: 15 } },
    { id: "veryHeavy", icon: "💪", values: { stoneValue: 20 } },
  ],

  t: {
    en: {
      name: "Stones to KG Converter",
      slug: "stones-to-kg-converter",
      subtitle:
        "Convert stones to kilograms instantly with a reference table for common weights — perfect for UK to metric conversions.",
      breadcrumb: "Stones to KG",

      seo: {
        title: "Stones to KG Converter - Quick & Accurate | Free Tool",
        description:
          "Convert stones to kilograms instantly. Includes a reference table for common weights, decimal and fractional stone support, and reverse kg to stone conversion.",
        shortDescription: "Convert stones to kilograms with a handy reference table.",
        keywords: [
          "stones to kg",
          "stones to kilograms",
          "stone to kg converter",
          "convert stones to kg",
          "st to kg",
          "uk weight to metric",
          "stone weight converter",
          "how many kg in a stone",
        ],
      },

      calculator: { yourInformation: "Enter Weight" },
      ui: {
        yourInformation: "Enter Weight",
        calculate: "Convert",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        stoneValue: {
          label: "Weight in Stones",
          helpText: "Enter the weight in stones (st). 1 stone = 6.35029 kg",
        },
      },

      results: {
        kilograms: { label: "Kilograms" },
        grams: { label: "Grams" },
        pounds: { label: "Pounds" },
      },

      presets: {
        light: { label: "8 Stone", description: "~50.8 kg (light adult)" },
        average: { label: "11 Stone", description: "~69.9 kg (average adult)" },
        heavy: { label: "15 Stone", description: "~95.3 kg (heavy adult)" },
        veryHeavy: { label: "20 Stone", description: "~127.0 kg" },
      },

      values: {
        kg: "kg",
        g: "g",
        lbs: "lbs",
        st: "st",
      },

      formats: {
        summary: "{stone} stone = {kg} kg ({lbs} lbs)",
      },

      infoCards: {
        conversions: {
          title: "Conversion Results",
          items: [
            { label: "Kilograms", valueKey: "kilograms" },
            { label: "Grams", valueKey: "grams" },
            { label: "Pounds", valueKey: "pounds" },
            { label: "Stone + Pounds", valueKey: "stonePounds" },
          ],
        },
        quickRef: {
          title: "Quick Reference",
          items: [
            { label: "1 stone", valueKey: "ref1" },
            { label: "5 stones", valueKey: "ref5" },
            { label: "10 stones", valueKey: "ref10" },
            { label: "14 stones", valueKey: "ref14" },
          ],
        },
        tips: {
          title: "Did You Know?",
          items: [
            "The stone is still widely used in the UK and Ireland for body weight. Most British people describe their weight in stones and pounds rather than kilograms.",
            "1 stone = exactly 14 pounds = 6.35029318 kg. The stone has been used as a unit of weight since at least the 14th century.",
            "In most countries outside the UK and Ireland, the stone is not commonly used. Medical and scientific contexts always use kilograms.",
            "When traveling between the UK and continental Europe, converting stones to kg is essential for understanding weight-related information on medical forms and gym equipment.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Stone?",
          content:
            "A stone (abbreviated \"st\") is an Imperial unit of weight equal to 14 pounds or approximately 6.35 kilograms. It is commonly used in the United Kingdom and Ireland to express body weight. For example, a person weighing 11 stone 4 pounds would weigh about 71.7 kg. The stone has been used since medieval times for trade, originally varying by commodity — a stone of wool weighed differently than a stone of glass. In 1835, the British Weights and Measures Act standardized the stone at 14 pounds. While most of the world uses kilograms for body weight, the stone remains the preferred unit in casual conversation throughout the UK and Ireland. You'll hear it used in everyday life, fitness discussions, and even on British TV shows, making this conversion essential for international communication.",
        },
        howItWorks: {
          title: "How to Convert Stones to Kilograms",
          content:
            "The conversion formula is straightforward: multiply the number of stones by 6.35029318 to get kilograms. For example, 10 stones × 6.35029 = 63.5 kg. If you have stones and pounds (like 11 st 7 lbs), first convert everything to pounds (11 × 14 + 7 = 161 lbs), then multiply by 0.453592 to get kilograms (161 × 0.453592 = 73.03 kg). Alternatively, convert the stones portion and pounds portion separately: 11 st = 69.85 kg, 7 lbs = 3.18 kg, total = 73.03 kg. For a quick mental approximation, multiply stones by 6.35 — this is accurate to within 0.01% of the exact conversion factor.",
        },
        considerations: {
          title: "Conversion Facts",
          items: [
            { text: "1 stone = 14 pounds = 6.35029318 kilograms exactly. This is the internationally recognized conversion factor.", type: "info" },
            { text: "To convert back: 1 kg = 0.157473 stones. Divide kilograms by 6.35029 to get stones.", type: "info" },
            { text: "UK medical records increasingly use kilograms, but many British people still think of their weight in stones and pounds.", type: "info" },
            { text: "The stone is NOT used in the United States. Americans use pounds only, making the stone confusing for US visitors to the UK.", type: "info" },
            { text: "In boxing and horse racing, weight classes are sometimes expressed in stones in the UK, while international competitions use kilograms.", type: "info" },
            { text: "Australia, New Zealand, and South Africa formerly used stones but have fully converted to kilograms since metrication in the 1970s.", type: "info" },
          ],
        },
        categories: {
          title: "Common Weight Ranges in Stones",
          items: [
            { text: "6-8 stone (38-51 kg): Typical weight range for children ages 8-12 and very petite adults.", type: "info" },
            { text: "8-10 stone (51-64 kg): Common range for smaller adults and teenagers. Average woman in many countries.", type: "info" },
            { text: "10-12 stone (64-76 kg): Average adult range. Typical healthy weight for men 5'7\"-5'10\".", type: "info" },
            { text: "12-14 stone (76-89 kg): Above average range. Common for taller men and active/muscular individuals.", type: "info" },
            { text: "14-16 stone (89-102 kg): Heavy range. May indicate overweight for most heights unless very tall or muscular.", type: "info" },
            { text: "16-20+ stone (102-127+ kg): Very heavy range. Often seen in heavyweight athletes, bodybuilders, or tall individuals.", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Step-by-step stone to kg conversions",
          examples: [
            {
              title: "Convert 11 stone 4 pounds to kilograms",
              steps: [
                "Stones portion: 11 × 6.35029 = 69.853 kg",
                "Pounds portion: 4 × 0.45359 = 1.814 kg",
                "Total: 69.853 + 1.814 = 71.667 kg",
              ],
              result: "11 st 4 lbs = 71.67 kg",
            },
            {
              title: "Convert 9.5 stone to kilograms",
              steps: [
                "9.5 × 6.35029 = 60.328 kg",
                "Or: 9 st = 57.15 kg, 0.5 st = 7 lbs = 3.18 kg",
                "Total: 57.15 + 3.18 = 60.33 kg",
              ],
              result: "9.5 stone = 60.33 kg",
            },
          ],
        },
      },

      faqs: [
        { question: "How many kilograms are in 1 stone?", answer: "1 stone equals exactly 6.35029318 kilograms. For quick mental math, 1 stone ≈ 6.35 kg. This conversion factor is defined by international agreement and does not change." },
        { question: "How do I convert stones and pounds to kg?", answer: "Convert the stones portion and pounds portion separately, then add them. Multiply stones by 6.35029 and pounds by 0.45359, then sum both results. For example, 12 st 8 lbs = (12 × 6.35029) + (8 × 0.45359) = 76.20 + 3.63 = 79.83 kg." },
        { question: "Why does the UK still use stones for weight?", answer: "Cultural habit and tradition. Despite the UK officially adopting the metric system, stones remain deeply embedded in everyday conversation about body weight. Most British people learned their weight in stones from family and friends, and the habit persists across generations. Medical settings increasingly use kilograms, but casual usage of stones shows no signs of disappearing." },
        { question: "Is a stone the same in all countries?", answer: "The modern stone is standardized at 14 pounds (6.35029 kg) since the 1835 British Weights and Measures Act. Historically, the stone varied by region and commodity. Today, it is only commonly used in the UK and Ireland. The United States, Canada, Australia, and most other countries do not use the stone." },
        { question: "How do I convert kg back to stones?", answer: "Divide the kilogram value by 6.35029 to get stones. For example, 80 kg ÷ 6.35029 = 12.598 stones, which is 12 stone 8.4 pounds. To get the remaining pounds: take the decimal portion (0.598) and multiply by 14 = 8.4 pounds." },
        { question: "What is 10 stone in kg?", answer: "10 stone equals 63.503 kg (or approximately 63.5 kg). This is also equal to 140 pounds. 10 stone is a commonly referenced benchmark weight in UK fitness and health discussions." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de Stones a KG",
      "slug": "calculadora-convertidor-stones-kg",
      "subtitle": "Convierte stones a kilogramos instantáneamente con una tabla de referencia para pesos comunes — perfecto para conversiones del Reino Unido al sistema métrico.",
      "breadcrumb": "Stones a KG",
      "seo": {
        "title": "Convertidor de Stones a KG - Rápido y Preciso | Herramienta Gratuita",
        "description": "Convierte stones a kilogramos instantáneamente. Incluye tabla de referencia para pesos comunes, soporte para stones decimales y fraccionales, y conversión inversa de kg a stones.",
        "shortDescription": "Convierte stones a kilogramos con una práctica tabla de referencia.",
        "keywords": [
          "stones a kg",
          "stones a kilogramos",
          "convertidor stone a kg",
          "convertir stones a kg",
          "st a kg",
          "peso reino unido a métrico",
          "convertidor peso stone",
          "cuantos kg hay en un stone"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "stoneValue": {
          "label": "Peso en Stones",
          "helpText": "Introduce el peso en stones (st). 1 stone = 6.35029 kg"
        }
      },
      "results": {
        "kilograms": {
          "label": "Kilogramos"
        },
        "grams": {
          "label": "Gramos"
        },
        "pounds": {
          "label": "Libras"
        }
      },
      "presets": {
        "light": {
          "label": "8 Stone",
          "description": "~50.8 kg (adulto ligero)"
        },
        "average": {
          "label": "11 Stone",
          "description": "~69.9 kg (adulto promedio)"
        },
        "heavy": {
          "label": "15 Stone",
          "description": "~95.3 kg (adulto pesado)"
        },
        "veryHeavy": {
          "label": "20 Stone",
          "description": "~127.0 kg"
        }
      },
      "values": {
        "kg": "kg",
        "g": "g",
        "lbs": "lbs",
        "st": "st"
      },
      "formats": {
        "summary": "{stone} stone = {kg} kg ({lbs} lbs)"
      },
      "infoCards": {
        "conversions": {
          "title": "Resultados de Conversión",
          "items": [
            {
              "label": "Kilogramos",
              "valueKey": "kilograms"
            },
            {
              "label": "Gramos",
              "valueKey": "grams"
            },
            {
              "label": "Libras",
              "valueKey": "pounds"
            },
            {
              "label": "Stone + Libras",
              "valueKey": "stonePounds"
            }
          ]
        },
        "quickRef": {
          "title": "Referencia Rápida",
          "items": [
            {
              "label": "1 stone",
              "valueKey": "ref1"
            },
            {
              "label": "5 stones",
              "valueKey": "ref5"
            },
            {
              "label": "10 stones",
              "valueKey": "ref10"
            },
            {
              "label": "14 stones",
              "valueKey": "ref14"
            }
          ]
        },
        "tips": {
          "title": "¿Sabías que...?",
          "items": [
            "El stone todavía se usa ampliamente en el Reino Unido e Irlanda para el peso corporal. La mayoría de los británicos describen su peso en stones y libras en lugar de kilogramos.",
            "1 stone = exactamente 14 libras = 6.35029318 kg. El stone se ha usado como unidad de peso desde al menos el siglo XIV.",
            "En la mayoría de países fuera del Reino Unido e Irlanda, el stone no se usa comúnmente. Los contextos médicos y científicos siempre usan kilogramos.",
            "Al viajar entre el Reino Unido y la Europa continental, convertir stones a kg es esencial para entender información relacionada con el peso en formularios médicos y equipos de gimnasio."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es un Stone?",
          "content": "Un stone (abreviado \"st\") es una unidad imperial de peso igual a 14 libras o aproximadamente 6.35 kilogramos. Se usa comúnmente en el Reino Unido e Irlanda para expresar el peso corporal. Por ejemplo, una persona que pese 11 stone 4 libras pesaría aproximadamente 71.7 kg. El stone se ha usado desde tiempos medievales para el comercio, variando originalmente según la mercancía — un stone de lana pesaba diferente que un stone de vidrio. En 1835, la Ley de Pesos y Medidas Británica estandarizó el stone en 14 libras. Aunque la mayor parte del mundo usa kilogramos para el peso corporal, el stone sigue siendo la unidad preferida en conversaciones casuales en todo el Reino Unido e Irlanda. Lo escucharás usado en la vida cotidiana, discusiones de fitness, e incluso en programas de TV británicos, haciendo esta conversión esencial para la comunicación internacional."
        },
        "howItWorks": {
          "title": "Cómo Convertir Stones a Kilogramos",
          "content": "La fórmula de conversión es sencilla: multiplica el número de stones por 6.35029318 para obtener kilogramos. Por ejemplo, 10 stones × 6.35029 = 63.5 kg. Si tienes stones y libras (como 11 st 7 lbs), primero convierte todo a libras (11 × 14 + 7 = 161 lbs), luego multiplica por 0.453592 para obtener kilogramos (161 × 0.453592 = 73.03 kg). Alternativamente, convierte la porción de stones y libras por separado: 11 st = 69.85 kg, 7 lbs = 3.18 kg, total = 73.03 kg. Para una aproximación mental rápida, multiplica stones por 6.35 — esto es preciso dentro del 0.01% del factor de conversión exacto."
        },
        "considerations": {
          "title": "Datos de Conversión",
          "items": [
            {
              "text": "1 stone = 14 libras = 6.35029318 kilogramos exactamente. Este es el factor de conversión reconocido internacionalmente.",
              "type": "info"
            },
            {
              "text": "Para convertir de vuelta: 1 kg = 0.157473 stones. Divide kilogramos por 6.35029 para obtener stones.",
              "type": "info"
            },
            {
              "text": "Los registros médicos del Reino Unido usan cada vez más kilogramos, pero muchos británicos aún piensan en su peso en stones y libras.",
              "type": "info"
            },
            {
              "text": "El stone NO se usa en Estados Unidos. Los estadounidenses usan solo libras, haciendo el stone confuso para visitantes estadounidenses al Reino Unido.",
              "type": "info"
            },
            {
              "text": "En boxeo e hípica, las categorías de peso a veces se expresan en stones en el Reino Unido, mientras las competencias internacionales usan kilogramos.",
              "type": "info"
            },
            {
              "text": "Australia, Nueva Zelanda y Sudáfrica anteriormente usaban stones pero se han convertido completamente a kilogramos desde la metrificación en los años 70.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Rangos de Peso Comunes en Stones",
          "items": [
            {
              "text": "6-8 stone (38-51 kg): Rango de peso típico para niños de 8-12 años y adultos muy pequeños.",
              "type": "info"
            },
            {
              "text": "8-10 stone (51-64 kg): Rango común para adultos pequeños y adolescentes. Mujer promedio en muchos países.",
              "type": "info"
            },
            {
              "text": "10-12 stone (64-76 kg): Rango adulto promedio. Peso saludable típico para hombres de 1.70m-1.78m.",
              "type": "info"
            },
            {
              "text": "12-14 stone (76-89 kg): Rango por encima del promedio. Común para hombres más altos e individuos activos/musculosos.",
              "type": "info"
            },
            {
              "text": "14-16 stone (89-102 kg): Rango pesado. Puede indicar sobrepeso para la mayoría de estaturas a menos que sean muy altos o musculosos.",
              "type": "info"
            },
            {
              "text": "16-20+ stone (102-127+ kg): Rango muy pesado. A menudo visto en atletas de peso pesado, culturistas, o individuos altos.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Conversión",
          "description": "Conversiones paso a paso de stone a kg",
          "examples": [
            {
              "title": "Convertir 11 stone 4 libras a kilogramos",
              "steps": [
                "Porción de stones: 11 × 6.35029 = 69.853 kg",
                "Porción de libras: 4 × 0.45359 = 1.814 kg",
                "Total: 69.853 + 1.814 = 71.667 kg"
              ],
              "result": "11 st 4 lbs = 71.67 kg"
            },
            {
              "title": "Convertir 9.5 stone a kilogramos",
              "steps": [
                "9.5 × 6.35029 = 60.328 kg",
                "O: 9 st = 57.15 kg, 0.5 st = 7 lbs = 3.18 kg",
                "Total: 57.15 + 3.18 = 60.33 kg"
              ],
              "result": "9.5 stone = 60.33 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos kilogramos hay en 1 stone?",
          "answer": "1 stone equivale exactamente a 6.35029318 kilogramos. Para cálculo mental rápido, 1 stone ≈ 6.35 kg. Este factor de conversión está definido por acuerdo internacional y no cambia."
        },
        {
          "question": "¿Cómo convierto stones y libras a kg?",
          "answer": "Convierte la porción de stones y libras por separado, luego súmalas. Multiplica stones por 6.35029 y libras por 0.45359, luego suma ambos resultados. Por ejemplo, 12 st 8 lbs = (12 × 6.35029) + (8 × 0.45359) = 76.20 + 3.63 = 79.83 kg."
        },
        {
          "question": "¿Por qué el Reino Unido aún usa stones para el peso?",
          "answer": "Hábito cultural y tradición. A pesar de que el Reino Unido adoptó oficialmente el sistema métrico, los stones permanecen profundamente arraigados en la conversación cotidiana sobre el peso corporal. La mayoría de los británicos aprendieron su peso en stones de familiares y amigos, y el hábito persiste a través de las generaciones. Los entornos médicos usan cada vez más kilogramos, pero el uso casual de stones no muestra signos de desaparecer."
        },
        {
          "question": "¿Es el stone igual en todos los países?",
          "answer": "El stone moderno está estandarizado en 14 libras (6.35029 kg) desde la Ley de Pesos y Medidas Británica de 1835. Históricamente, el stone variaba por región y mercancía. Hoy en día, solo se usa comúnmente en el Reino Unido e Irlanda. Estados Unidos, Canadá, Australia y la mayoría de otros países no usan el stone."
        },
        {
          "question": "¿Cómo convierto kg de vuelta a stones?",
          "answer": "Divide el valor en kilogramos por 6.35029 para obtener stones. Por ejemplo, 80 kg ÷ 6.35029 = 12.598 stones, que es 12 stone 8.4 libras. Para obtener las libras restantes: toma la porción decimal (0.598) y multiplica por 14 = 8.4 libras."
        },
        {
          "question": "¿Cuánto es 10 stone en kg?",
          "answer": "10 stone equivale a 63.503 kg (o aproximadamente 63.5 kg). Esto también es igual a 140 libras. 10 stone es un peso de referencia comúnmente mencionado en discusiones de fitness y salud del Reino Unido."
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
      "name": "Conversor de Stones para KG",
      "slug": "calculadora-conversor-stones-kg",
      "subtitle": "Converta stones para quilogramas instantaneamente com uma tabela de referência para pesos comuns — perfeito para conversões do Reino Unido para o sistema métrico.",
      "breadcrumb": "Stones para KG",
      "seo": {
        "title": "Conversor de Stones para KG - Rápido e Preciso | Ferramenta Gratuita",
        "description": "Converta stones para quilogramas instantaneamente. Inclui uma tabela de referência para pesos comuns, suporte a stones decimais e fracionários, e conversão reversa de kg para stone.",
        "shortDescription": "Converta stones para quilogramas com uma tabela de referência útil.",
        "keywords": [
          "stones para kg",
          "stones para quilogramas",
          "conversor stone para kg",
          "converter stones para kg",
          "st para kg",
          "peso uk para métrico",
          "conversor peso stone",
          "quantos kg em uma stone"
        ]
      },
      "inputs": {
        "stoneValue": {
          "label": "Peso em Stones",
          "helpText": "Digite o peso em stones (st). 1 stone = 6,35029 kg"
        }
      },
      "results": {
        "kilograms": {
          "label": "Quilogramas"
        },
        "grams": {
          "label": "Gramas"
        },
        "pounds": {
          "label": "Libras"
        }
      },
      "presets": {
        "light": {
          "label": "8 Stone",
          "description": "~50,8 kg (adulto leve)"
        },
        "average": {
          "label": "11 Stone",
          "description": "~69,9 kg (adulto médio)"
        },
        "heavy": {
          "label": "15 Stone",
          "description": "~95,3 kg (adulto pesado)"
        },
        "veryHeavy": {
          "label": "20 Stone",
          "description": "~127,0 kg"
        }
      },
      "values": {
        "kg": "kg",
        "g": "g",
        "lbs": "lbs",
        "st": "st"
      },
      "formats": {
        "summary": "{stone} stone = {kg} kg ({lbs} lbs)"
      },
      "infoCards": {
        "conversions": {
          "title": "Resultados da Conversão",
          "items": [
            {
              "label": "Quilogramas",
              "valueKey": "kilograms"
            },
            {
              "label": "Gramas",
              "valueKey": "grams"
            },
            {
              "label": "Libras",
              "valueKey": "pounds"
            },
            {
              "label": "Stone + Libras",
              "valueKey": "stonePounds"
            }
          ]
        },
        "quickRef": {
          "title": "Referência Rápida",
          "items": [
            {
              "label": "1 stone",
              "valueKey": "ref1"
            },
            {
              "label": "5 stones",
              "valueKey": "ref5"
            },
            {
              "label": "10 stones",
              "valueKey": "ref10"
            },
            {
              "label": "14 stones",
              "valueKey": "ref14"
            }
          ]
        },
        "tips": {
          "title": "Você Sabia?",
          "items": [
            "A stone ainda é amplamente usada no Reino Unido e na Irlanda para peso corporal. A maioria dos britânicos descreve seu peso em stones e libras em vez de quilogramas.",
            "1 stone = exatamente 14 libras = 6,35029318 kg. A stone tem sido usada como unidade de peso desde pelo menos o século XIV.",
            "Na maioria dos países fora do Reino Unido e Irlanda, a stone não é comumente usada. Contextos médicos e científicos sempre usam quilogramas.",
            "Ao viajar entre o Reino Unido e a Europa continental, converter stones para kg é essencial para entender informações relacionadas ao peso em formulários médicos e equipamentos de academia."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Stone?",
          "content": "Uma stone (abreviada \"st\") é uma unidade imperial de peso igual a 14 libras ou aproximadamente 6,35 quilogramas. É comumente usada no Reino Unido e na Irlanda para expressar peso corporal. Por exemplo, uma pessoa pesando 11 stone 4 libras pesaria cerca de 71,7 kg. A stone tem sido usada desde os tempos medievais para comércio, originalmente variando por commodity — uma stone de lã pesava diferente de uma stone de vidro. Em 1835, o British Weights and Measures Act padronizou a stone em 14 libras. Embora a maior parte do mundo use quilogramas para peso corporal, a stone permanece a unidade preferida em conversas casuais em todo o Reino Unido e Irlanda. Você a ouvirá sendo usada na vida cotidiana, discussões de fitness e até em programas de TV britânicos, tornando essa conversão essencial para comunicação internacional."
        },
        "howItWorks": {
          "title": "Como Converter Stones para Quilogramas",
          "content": "A fórmula de conversão é direta: multiplique o número de stones por 6,35029318 para obter quilogramas. Por exemplo, 10 stones × 6,35029 = 63,5 kg. Se você tiver stones e libras (como 11 st 7 lbs), primeiro converta tudo para libras (11 × 14 + 7 = 161 lbs), depois multiplique por 0,453592 para obter quilogramas (161 × 0,453592 = 73,03 kg). Alternativamente, converta a parte das stones e das libras separadamente: 11 st = 69,85 kg, 7 lbs = 3,18 kg, total = 73,03 kg. Para uma aproximação mental rápida, multiplique stones por 6,35 — isso é preciso dentro de 0,01% do fator de conversão exato."
        },
        "considerations": {
          "title": "Fatos sobre Conversão",
          "items": [
            {
              "text": "1 stone = 14 libras = 6,35029318 quilogramas exatamente. Este é o fator de conversão internacionalmente reconhecido.",
              "type": "info"
            },
            {
              "text": "Para converter de volta: 1 kg = 0,157473 stones. Divida quilogramas por 6,35029 para obter stones.",
              "type": "info"
            },
            {
              "text": "Registros médicos do Reino Unido cada vez mais usam quilogramas, mas muitos britânicos ainda pensam no seu peso em stones e libras.",
              "type": "info"
            },
            {
              "text": "A stone NÃO é usada nos Estados Unidos. Americanos usam apenas libras, tornando a stone confusa para visitantes americanos no Reino Unido.",
              "type": "info"
            },
            {
              "text": "No boxe e corridas de cavalos, categorias de peso às vezes são expressas em stones no Reino Unido, enquanto competições internacionais usam quilogramas.",
              "type": "info"
            },
            {
              "text": "Austrália, Nova Zelândia e África do Sul anteriormente usavam stones, mas converteram completamente para quilogramas desde a metrificação nos anos 1970.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Faixas de Peso Comuns em Stones",
          "items": [
            {
              "text": "6-8 stone (38-51 kg): Faixa de peso típica para crianças de 8-12 anos e adultos muito pequenos.",
              "type": "info"
            },
            {
              "text": "8-10 stone (51-64 kg): Faixa comum para adultos menores e adolescentes. Mulher média em muitos países.",
              "type": "info"
            },
            {
              "text": "10-12 stone (64-76 kg): Faixa adulta média. Peso saudável típico para homens de 1,70m-1,78m.",
              "type": "info"
            },
            {
              "text": "12-14 stone (76-89 kg): Faixa acima da média. Comum para homens mais altos e indivíduos ativos/musculosos.",
              "type": "info"
            },
            {
              "text": "14-16 stone (89-102 kg): Faixa pesada. Pode indicar sobrepeso para a maioria das alturas, a menos que muito alto ou musculoso.",
              "type": "info"
            },
            {
              "text": "16-20+ stone (102-127+ kg): Faixa muito pesada. Frequentemente vista em atletas peso-pesado, fisiculturistas ou indivíduos altos.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Conversão",
          "description": "Conversões passo a passo de stone para kg",
          "examples": [
            {
              "title": "Converter 11 stone 4 libras para quilogramas",
              "steps": [
                "Parte das stones: 11 × 6,35029 = 69,853 kg",
                "Parte das libras: 4 × 0,45359 = 1,814 kg",
                "Total: 69,853 + 1,814 = 71,667 kg"
              ],
              "result": "11 st 4 lbs = 71,67 kg"
            },
            {
              "title": "Converter 9,5 stone para quilogramas",
              "steps": [
                "9,5 × 6,35029 = 60,328 kg",
                "Ou: 9 st = 57,15 kg, 0,5 st = 7 lbs = 3,18 kg",
                "Total: 57,15 + 3,18 = 60,33 kg"
              ],
              "result": "9,5 stone = 60,33 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos quilogramas há em 1 stone?",
          "answer": "1 stone equivale exatamente a 6,35029318 quilogramas. Para cálculo mental rápido, 1 stone ≈ 6,35 kg. Este fator de conversão é definido por acordo internacional e não muda."
        },
        {
          "question": "Como converter stones e libras para kg?",
          "answer": "Converta a parte das stones e das libras separadamente, depois some-as. Multiplique stones por 6,35029 e libras por 0,45359, depois some ambos os resultados. Por exemplo, 12 st 8 lbs = (12 × 6,35029) + (8 × 0,45359) = 76,20 + 3,63 = 79,83 kg."
        },
        {
          "question": "Por que o Reino Unido ainda usa stones para peso?",
          "answer": "Hábito cultural e tradição. Apesar do Reino Unido ter adotado oficialmente o sistema métrico, stones permanecem profundamente incorporadas na conversa cotidiana sobre peso corporal. A maioria dos britânicos aprendeu seu peso em stones de família e amigos, e o hábito persiste através das gerações. Ambientes médicos cada vez mais usam quilogramas, mas o uso casual de stones não mostra sinais de desaparecer."
        },
        {
          "question": "Uma stone é igual em todos os países?",
          "answer": "A stone moderna é padronizada em 14 libras (6,35029 kg) desde o British Weights and Measures Act de 1835. Historicamente, a stone variava por região e commodity. Hoje, é comumente usada apenas no Reino Unido e na Irlanda. Os Estados Unidos, Canadá, Austrália e a maioria dos outros países não usam a stone."
        },
        {
          "question": "Como converter kg de volta para stones?",
          "answer": "Divida o valor em quilogramas por 6,35029 para obter stones. Por exemplo, 80 kg ÷ 6,35029 = 12,598 stones, que é 12 stone 8,4 libras. Para obter as libras restantes: pegue a parte decimal (0,598) e multiplique por 14 = 8,4 libras."
        },
        {
          "question": "Quanto é 10 stone em kg?",
          "answer": "10 stone equivale a 63,503 kg (ou aproximadamente 63,5 kg). Isso também é igual a 140 libras. 10 stone é um peso de referência comumente mencionado em discussões de fitness e saúde no Reino Unido."
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
      "name": "Convertisseur Stones vers KG",
      "slug": "calculateur-convertisseur-stones-vers-kg",
      "subtitle": "Convertissez instantanément les stones en kilogrammes avec un tableau de référence pour les poids courants — parfait pour les conversions britanniques vers métriques.",
      "breadcrumb": "Stones vers KG",
      "seo": {
        "title": "Convertisseur Stones vers KG - Rapide et Précis | Outil Gratuit",
        "description": "Convertissez instantanément les stones en kilogrammes. Inclut un tableau de référence pour les poids courants, support des stones décimaux et fractionnels, et conversion inverse kg vers stones.",
        "shortDescription": "Convertissez les stones en kilogrammes avec un tableau de référence pratique.",
        "keywords": [
          "stones vers kg",
          "stones vers kilogrammes",
          "convertisseur stone vers kg",
          "convertir stones en kg",
          "st vers kg",
          "poids britannique vers métrique",
          "convertisseur poids stone",
          "combien de kg dans un stone"
        ]
      },
      "inputs": {
        "stoneValue": {
          "label": "Poids en Stones",
          "helpText": "Entrez le poids en stones (st). 1 stone = 6,35029 kg"
        }
      },
      "results": {
        "kilograms": {
          "label": "Kilogrammes"
        },
        "grams": {
          "label": "Grammes"
        },
        "pounds": {
          "label": "Livres"
        }
      },
      "presets": {
        "light": {
          "label": "8 Stones",
          "description": "~50,8 kg (adulte léger)"
        },
        "average": {
          "label": "11 Stones",
          "description": "~69,9 kg (adulte moyen)"
        },
        "heavy": {
          "label": "15 Stones",
          "description": "~95,3 kg (adulte lourd)"
        },
        "veryHeavy": {
          "label": "20 Stones",
          "description": "~127,0 kg"
        }
      },
      "values": {
        "kg": "kg",
        "g": "g",
        "lbs": "lbs",
        "st": "st"
      },
      "formats": {
        "summary": "{stone} stone = {kg} kg ({lbs} lbs)"
      },
      "infoCards": {
        "conversions": {
          "title": "Résultats de Conversion",
          "items": [
            {
              "label": "Kilogrammes",
              "valueKey": "kilograms"
            },
            {
              "label": "Grammes",
              "valueKey": "grams"
            },
            {
              "label": "Livres",
              "valueKey": "pounds"
            },
            {
              "label": "Stone + Livres",
              "valueKey": "stonePounds"
            }
          ]
        },
        "quickRef": {
          "title": "Référence Rapide",
          "items": [
            {
              "label": "1 stone",
              "valueKey": "ref1"
            },
            {
              "label": "5 stones",
              "valueKey": "ref5"
            },
            {
              "label": "10 stones",
              "valueKey": "ref10"
            },
            {
              "label": "14 stones",
              "valueKey": "ref14"
            }
          ]
        },
        "tips": {
          "title": "Le Saviez-Vous ?",
          "items": [
            "Le stone est encore largement utilisé au Royaume-Uni et en Irlande pour le poids corporel. La plupart des Britanniques décrivent leur poids en stones et livres plutôt qu'en kilogrammes.",
            "1 stone = exactement 14 livres = 6,35029318 kg. Le stone est utilisé comme unité de poids depuis au moins le 14ème siècle.",
            "Dans la plupart des pays en dehors du Royaume-Uni et de l'Irlande, le stone n'est pas couramment utilisé. Les contextes médicaux et scientifiques utilisent toujours les kilogrammes.",
            "Lors de voyages entre le Royaume-Uni et l'Europe continentale, convertir les stones en kg est essentiel pour comprendre les informations liées au poids sur les formulaires médicaux et équipements de gym."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Stone ?",
          "content": "Un stone (abrégé \"st\") est une unité impériale de poids égale à 14 livres ou approximativement 6,35 kilogrammes. Il est couramment utilisé au Royaume-Uni et en Irlande pour exprimer le poids corporel. Par exemple, une personne pesant 11 stone 4 livres pèserait environ 71,7 kg. Le stone est utilisé depuis l'époque médiévale pour le commerce, variant initialement selon la marchandise — un stone de laine pesait différemment d'un stone de verre. En 1835, le British Weights and Measures Act a standardisé le stone à 14 livres. Bien que la plupart du monde utilise les kilogrammes pour le poids corporel, le stone reste l'unité préférée dans les conversations informelles au Royaume-Uni et en Irlande. On l'entend utilisé dans la vie quotidienne, les discussions fitness, et même dans les émissions TV britanniques, rendant cette conversion essentielle pour la communication internationale."
        },
        "howItWorks": {
          "title": "Comment Convertir les Stones en Kilogrammes",
          "content": "La formule de conversion est simple : multipliez le nombre de stones par 6,35029318 pour obtenir les kilogrammes. Par exemple, 10 stones × 6,35029 = 63,5 kg. Si vous avez des stones et des livres (comme 11 st 7 lbs), convertissez d'abord tout en livres (11 × 14 + 7 = 161 lbs), puis multipliez par 0,453592 pour obtenir les kilogrammes (161 × 0,453592 = 73,03 kg). Alternativement, convertissez la portion stones et la portion livres séparément : 11 st = 69,85 kg, 7 lbs = 3,18 kg, total = 73,03 kg. Pour une approximation mentale rapide, multipliez les stones par 6,35 — c'est précis à 0,01% près du facteur de conversion exact."
        },
        "considerations": {
          "title": "Faits de Conversion",
          "items": [
            {
              "text": "1 stone = 14 livres = 6,35029318 kilogrammes exactement. C'est le facteur de conversion internationalement reconnu.",
              "type": "info"
            },
            {
              "text": "Pour convertir dans l'autre sens : 1 kg = 0,157473 stones. Divisez les kilogrammes par 6,35029 pour obtenir les stones.",
              "type": "info"
            },
            {
              "text": "Les dossiers médicaux britanniques utilisent de plus en plus les kilogrammes, mais beaucoup de Britanniques pensent encore leur poids en stones et livres.",
              "type": "info"
            },
            {
              "text": "Le stone n'est PAS utilisé aux États-Unis. Les Américains utilisent uniquement les livres, rendant le stone confus pour les visiteurs américains au Royaume-Uni.",
              "type": "info"
            },
            {
              "text": "En boxe et courses hippiques, les catégories de poids sont parfois exprimées en stones au Royaume-Uni, tandis que les compétitions internationales utilisent les kilogrammes.",
              "type": "info"
            },
            {
              "text": "L'Australie, la Nouvelle-Zélande et l'Afrique du Sud utilisaient autrefois les stones mais sont entièrement passés aux kilogrammes depuis la métrication dans les années 1970.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Plages de Poids Courantes en Stones",
          "items": [
            {
              "text": "6-8 stones (38-51 kg) : Plage de poids typique pour les enfants de 8-12 ans et les adultes très menus.",
              "type": "info"
            },
            {
              "text": "8-10 stones (51-64 kg) : Plage commune pour les adultes plus petits et les adolescents. Femme moyenne dans de nombreux pays.",
              "type": "info"
            },
            {
              "text": "10-12 stones (64-76 kg) : Plage adulte moyenne. Poids santé typique pour les hommes de 1m70-1m78.",
              "type": "info"
            },
            {
              "text": "12-14 stones (76-89 kg) : Plage au-dessus de la moyenne. Commune pour les hommes plus grands et les individus actifs/musclés.",
              "type": "info"
            },
            {
              "text": "14-16 stones (89-102 kg) : Plage lourde. Peut indiquer un surpoids pour la plupart des tailles sauf si très grand ou musclé.",
              "type": "info"
            },
            {
              "text": "16-20+ stones (102-127+ kg) : Plage très lourde. Souvent vue chez les athlètes poids lourds, bodybuilders, ou individus grands.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Conversion",
          "description": "Conversions stones vers kg étape par étape",
          "examples": [
            {
              "title": "Convertir 11 stones 4 livres en kilogrammes",
              "steps": [
                "Portion stones : 11 × 6,35029 = 69,853 kg",
                "Portion livres : 4 × 0,45359 = 1,814 kg",
                "Total : 69,853 + 1,814 = 71,667 kg"
              ],
              "result": "11 st 4 lbs = 71,67 kg"
            },
            {
              "title": "Convertir 9,5 stones en kilogrammes",
              "steps": [
                "9,5 × 6,35029 = 60,328 kg",
                "Ou : 9 st = 57,15 kg, 0,5 st = 7 lbs = 3,18 kg",
                "Total : 57,15 + 3,18 = 60,33 kg"
              ],
              "result": "9,5 stones = 60,33 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de kilogrammes y a-t-il dans 1 stone ?",
          "answer": "1 stone équivaut exactement à 6,35029318 kilogrammes. Pour un calcul mental rapide, 1 stone ≈ 6,35 kg. Ce facteur de conversion est défini par accord international et ne change pas."
        },
        {
          "question": "Comment convertir des stones et livres en kg ?",
          "answer": "Convertissez la portion stones et la portion livres séparément, puis additionnez-les. Multipliez les stones par 6,35029 et les livres par 0,45359, puis additionnez les deux résultats. Par exemple, 12 st 8 lbs = (12 × 6,35029) + (8 × 0,45359) = 76,20 + 3,63 = 79,83 kg."
        },
        {
          "question": "Pourquoi le Royaume-Uni utilise-t-il encore les stones pour le poids ?",
          "answer": "Habitude culturelle et tradition. Malgré l'adoption officielle du système métrique par le Royaume-Uni, les stones restent profondément ancrés dans les conversations quotidiennes sur le poids corporel. La plupart des Britanniques ont appris leur poids en stones de leur famille et amis, et l'habitude persiste à travers les générations. Les contextes médicaux utilisent de plus en plus les kilogrammes, mais l'usage informel des stones ne montre aucun signe de disparition."
        },
        {
          "question": "Un stone est-il le même dans tous les pays ?",
          "answer": "Le stone moderne est standardisé à 14 livres (6,35029 kg) depuis le British Weights and Measures Act de 1835. Historiquement, le stone variait selon la région et la marchandise. Aujourd'hui, il n'est couramment utilisé qu'au Royaume-Uni et en Irlande. Les États-Unis, le Canada, l'Australie et la plupart des autres pays n'utilisent pas le stone."
        },
        {
          "question": "Comment reconvertir les kg en stones ?",
          "answer": "Divisez la valeur en kilogrammes par 6,35029 pour obtenir les stones. Par exemple, 80 kg ÷ 6,35029 = 12,598 stones, soit 12 stones 8,4 livres. Pour obtenir les livres restantes : prenez la portion décimale (0,598) et multipliez par 14 = 8,4 livres."
        },
        {
          "question": "Combien font 10 stones en kg ?",
          "answer": "10 stones équivaut à 63,503 kg (ou approximativement 63,5 kg). Cela équivaut aussi à 140 livres. 10 stones est un poids de référence couramment mentionné dans les discussions fitness et santé britanniques."
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
      "name": "Stone zu KG Umrechner",
      "slug": "stone-zu-kg-umrechner",
      "subtitle": "Wandeln Sie Stone sofort in Kilogramm um mit einer Referenztabelle für gängige Gewichte — perfekt für britische zu metrische Umrechnungen.",
      "breadcrumb": "Stone zu KG",
      "seo": {
        "title": "Stone zu KG Umrechner - Schnell & Präzise | Kostenloses Tool",
        "description": "Wandeln Sie Stone sofort in Kilogramm um. Enthält eine Referenztabelle für gängige Gewichte, Dezimal- und Bruch-Stone-Unterstützung und umgekehrte kg zu Stone Umrechnung.",
        "shortDescription": "Wandeln Sie Stone in Kilogramm mit einer praktischen Referenztabelle um.",
        "keywords": [
          "stone zu kg",
          "stone zu kilogramm",
          "stone zu kg umrechner",
          "stone in kg umrechnen",
          "st zu kg",
          "britisches gewicht zu metrisch",
          "stone gewicht umrechner",
          "wie viele kg in einem stone"
        ]
      },
      "inputs": {
        "stoneValue": {
          "label": "Gewicht in Stone",
          "helpText": "Geben Sie das Gewicht in Stone (st) ein. 1 Stone = 6,35029 kg"
        }
      },
      "results": {
        "kilograms": {
          "label": "Kilogramm"
        },
        "grams": {
          "label": "Gramm"
        },
        "pounds": {
          "label": "Pfund"
        }
      },
      "presets": {
        "light": {
          "label": "8 Stone",
          "description": "~50,8 kg (leichter Erwachsener)"
        },
        "average": {
          "label": "11 Stone",
          "description": "~69,9 kg (durchschnittlicher Erwachsener)"
        },
        "heavy": {
          "label": "15 Stone",
          "description": "~95,3 kg (schwerer Erwachsener)"
        },
        "veryHeavy": {
          "label": "20 Stone",
          "description": "~127,0 kg"
        }
      },
      "values": {
        "kg": "kg",
        "g": "g",
        "lbs": "lbs",
        "st": "st"
      },
      "formats": {
        "summary": "{stone} Stone = {kg} kg ({lbs} lbs)"
      },
      "infoCards": {
        "conversions": {
          "title": "Umrechnungsergebnisse",
          "items": [
            {
              "label": "Kilogramm",
              "valueKey": "kilograms"
            },
            {
              "label": "Gramm",
              "valueKey": "grams"
            },
            {
              "label": "Pfund",
              "valueKey": "pounds"
            },
            {
              "label": "Stone + Pfund",
              "valueKey": "stonePounds"
            }
          ]
        },
        "quickRef": {
          "title": "Schnellreferenz",
          "items": [
            {
              "label": "1 Stone",
              "valueKey": "ref1"
            },
            {
              "label": "5 Stone",
              "valueKey": "ref5"
            },
            {
              "label": "10 Stone",
              "valueKey": "ref10"
            },
            {
              "label": "14 Stone",
              "valueKey": "ref14"
            }
          ]
        },
        "tips": {
          "title": "Wussten Sie schon?",
          "items": [
            "Der Stone wird immer noch weit verbreitet in Großbritannien und Irland für das Körpergewicht verwendet. Die meisten Briten beschreiben ihr Gewicht in Stone und Pfund statt in Kilogramm.",
            "1 Stone = genau 14 Pfund = 6,35029318 kg. Der Stone wird als Gewichtseinheit seit mindestens dem 14. Jahrhundert verwendet.",
            "In den meisten Ländern außerhalb Großbritanniens und Irlands wird der Stone nicht häufig verwendet. Medizinische und wissenschaftliche Kontexte verwenden immer Kilogramm.",
            "Bei Reisen zwischen Großbritannien und Kontinentaleuropa ist die Umrechnung von Stone zu kg unerlässlich, um gewichtsbezogene Informationen auf Formulären und Fitnessgeräten zu verstehen."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Stone?",
          "content": "Ein Stone (abgekürzt \"st\") ist eine imperiale Gewichtseinheit, die 14 Pfund oder etwa 6,35 Kilogramm entspricht. Es wird häufig in Großbritannien und Irland verwendet, um das Körpergewicht auszudrücken. Zum Beispiel würde eine Person, die 11 Stone 4 Pfund wiegt, etwa 71,7 kg wiegen. Der Stone wird seit mittelalterlichen Zeiten für den Handel verwendet, ursprünglich variierte er je nach Ware — ein Stone Wolle wog anders als ein Stone Glas. 1835 standardisierte das britische Weights and Measures Act den Stone auf 14 Pfund. Während die meiste Welt Kilogramm für das Körpergewicht verwendet, bleibt der Stone die bevorzugte Einheit in alltäglichen Gesprächen in ganz Großbritannien und Irland. Man hört es im täglichen Leben, bei Fitness-Diskussionen und sogar in britischen Fernsehshows, was diese Umrechnung für die internationale Kommunikation unerlässlich macht."
        },
        "howItWorks": {
          "title": "Wie man Stone in Kilogramm umrechnet",
          "content": "Die Umrechnungsformel ist einfach: multiplizieren Sie die Anzahl der Stone mit 6,35029318, um Kilogramm zu erhalten. Zum Beispiel: 10 Stone × 6,35029 = 63,5 kg. Wenn Sie Stone und Pfund haben (wie 11 st 7 lbs), konvertieren Sie zuerst alles in Pfund (11 × 14 + 7 = 161 lbs), dann multiplizieren Sie mit 0,453592, um Kilogramm zu erhalten (161 × 0,453592 = 73,03 kg). Alternativ können Sie den Stone-Anteil und Pfund-Anteil separat umrechnen: 11 st = 69,85 kg, 7 lbs = 3,18 kg, Gesamt = 73,03 kg. Für eine schnelle mentale Annäherung multiplizieren Sie Stone mit 6,35 — dies ist bis auf 0,01% des exakten Umrechnungsfaktors genau."
        },
        "considerations": {
          "title": "Umrechnungsfakten",
          "items": [
            {
              "text": "1 Stone = 14 Pfund = genau 6,35029318 Kilogramm. Dies ist der international anerkannte Umrechnungsfaktor.",
              "type": "info"
            },
            {
              "text": "Für die Rückumrechnung: 1 kg = 0,157473 Stone. Teilen Sie Kilogramm durch 6,35029, um Stone zu erhalten.",
              "type": "info"
            },
            {
              "text": "Britische Krankenakten verwenden zunehmend Kilogramm, aber viele Briten denken immer noch in Stone und Pfund über ihr Gewicht nach.",
              "type": "info"
            },
            {
              "text": "Der Stone wird NICHT in den Vereinigten Staaten verwendet. Amerikaner verwenden nur Pfund, was den Stone für US-Besucher in Großbritannien verwirrend macht.",
              "type": "info"
            },
            {
              "text": "Im Boxen und Pferderennsport werden Gewichtsklassen manchmal in Stone in Großbritannien ausgedrückt, während internationale Wettkämpfe Kilogramm verwenden.",
              "type": "info"
            },
            {
              "text": "Australien, Neuseeland und Südafrika verwendeten früher Stone, sind aber seit der Metrisierung in den 1970er Jahren vollständig auf Kilogramm umgestiegen.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Häufige Gewichtsbereiche in Stone",
          "items": [
            {
              "text": "6-8 Stone (38-51 kg): Typischer Gewichtsbereich für Kinder im Alter von 8-12 Jahren und sehr zierliche Erwachsene.",
              "type": "info"
            },
            {
              "text": "8-10 Stone (51-64 kg): Häufiger Bereich für kleinere Erwachsene und Teenager. Durchschnittsgewicht von Frauen in vielen Ländern.",
              "type": "info"
            },
            {
              "text": "10-12 Stone (64-76 kg): Durchschnittlicher Erwachsenenbereich. Typisches gesundes Gewicht für Männer 1,70m-1,78m.",
              "type": "info"
            },
            {
              "text": "12-14 Stone (76-89 kg): Überdurchschnittlicher Bereich. Häufig bei größeren Männern und aktiven/muskulösen Personen.",
              "type": "info"
            },
            {
              "text": "14-16 Stone (89-102 kg): Schwerer Bereich. Kann Übergewicht für die meisten Körpergrößen anzeigen, außer bei sehr großen oder muskulösen Personen.",
              "type": "info"
            },
            {
              "text": "16-20+ Stone (102-127+ kg): Sehr schwerer Bereich. Oft bei Schwergewichtsathleten, Bodybuildern oder großen Personen zu sehen.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Schritt-für-Schritt Stone zu kg Umrechnungen",
          "examples": [
            {
              "title": "Umrechnung von 11 Stone 4 Pfund in Kilogramm",
              "steps": [
                "Stone-Anteil: 11 × 6,35029 = 69,853 kg",
                "Pfund-Anteil: 4 × 0,45359 = 1,814 kg",
                "Gesamt: 69,853 + 1,814 = 71,667 kg"
              ],
              "result": "11 st 4 lbs = 71,67 kg"
            },
            {
              "title": "Umrechnung von 9,5 Stone in Kilogramm",
              "steps": [
                "9,5 × 6,35029 = 60,328 kg",
                "Oder: 9 st = 57,15 kg, 0,5 st = 7 lbs = 3,18 kg",
                "Gesamt: 57,15 + 3,18 = 60,33 kg"
              ],
              "result": "9,5 Stone = 60,33 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Kilogramm sind in 1 Stone?",
          "answer": "1 Stone entspricht genau 6,35029318 Kilogramm. Für schnelle Kopfrechnung: 1 Stone ≈ 6,35 kg. Dieser Umrechnungsfaktor ist durch internationale Vereinbarung definiert und ändert sich nicht."
        },
        {
          "question": "Wie rechne ich Stone und Pfund in kg um?",
          "answer": "Rechnen Sie den Stone-Anteil und Pfund-Anteil separat um und addieren Sie sie dann. Multiplizieren Sie Stone mit 6,35029 und Pfund mit 0,45359, dann summieren Sie beide Ergebnisse. Zum Beispiel: 12 st 8 lbs = (12 × 6,35029) + (8 × 0,45359) = 76,20 + 3,63 = 79,83 kg."
        },
        {
          "question": "Warum verwendet Großbritannien immer noch Stone für das Gewicht?",
          "answer": "Kulturelle Gewohnheit und Tradition. Trotz der offiziellen Übernahme des metrischen Systems in Großbritannien bleiben Stone tief in alltäglichen Gesprächen über das Körpergewicht verwurzelt. Die meisten Briten lernten ihr Gewicht in Stone von Familie und Freunden, und diese Gewohnheit besteht über Generationen fort. Medizinische Bereiche verwenden zunehmend Kilogramm, aber die umgangssprachliche Verwendung von Stone zeigt keine Anzeichen des Verschwindens."
        },
        {
          "question": "Ist ein Stone in allen Ländern gleich?",
          "answer": "Der moderne Stone ist seit dem britischen Weights and Measures Act von 1835 auf 14 Pfund (6,35029 kg) standardisiert. Historisch variierte der Stone je nach Region und Ware. Heute wird er nur noch häufig in Großbritannien und Irland verwendet. Die Vereinigten Staaten, Kanada, Australien und die meisten anderen Länder verwenden den Stone nicht."
        },
        {
          "question": "Wie rechne ich kg zurück in Stone um?",
          "answer": "Teilen Sie den Kilogramm-Wert durch 6,35029, um Stone zu erhalten. Zum Beispiel: 80 kg ÷ 6,35029 = 12,598 Stone, was 12 Stone 8,4 Pfund entspricht. Um die verbleibenden Pfunde zu erhalten: nehmen Sie den Dezimalanteil (0,598) und multiplizieren Sie mit 14 = 8,4 Pfund."
        },
        {
          "question": "Was sind 10 Stone in kg?",
          "answer": "10 Stone entsprechen 63,503 kg (oder etwa 63,5 kg). Das entspricht auch 140 Pfund. 10 Stone ist ein häufig referenziertes Benchmark-Gewicht in britischen Fitness- und Gesundheitsdiskussionen."
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
    {
      id: "stoneValue",
      type: "number",
      defaultValue: null,
      placeholder: "11",
      min: 0.01,
      max: 200,
      step: 0.1,
      suffix: "st",
    },
  ],

  inputGroups: [],

  results: [
    { id: "kilograms", type: "primary", format: "number" },
    { id: "grams", type: "secondary", format: "number" },
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
    { authors: "UK National Measurement Office", year: "2023", title: "The Weights and Measures Act 1985 – Units of Measurement", source: "UK Government", url: "https://www.legislation.gov.uk/ukpga/1985/72" },
  ],

  hero: { icon: "⚖️", label: "Conversion" },
  sidebar: { showRelated: true, showPopular: true },
  features: { saveResults: true, pdfExport: true, sharing: true },
  relatedCalculators: ["kg-to-stones-converter", "kg-to-lbs-calculator", "lbs-to-kg-calculator"],
  ads: { showSidebar: true, showBetweenSections: true },
};

// ─── Calculate ───────────────────────────────────────────────────────────────

export function calculateStonesToKgConverter(data: {
  values: Record<string, unknown>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const stoneVal = values.stoneValue as number | null;
  if (stoneVal === null || stoneVal <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const kg = stoneVal * 6.35029318;
  const g = kg * 1000;
  const lbs = stoneVal * 14;
  const wholeSt = Math.floor(stoneVal);
  const remainLbs = Math.round((stoneVal - wholeSt) * 14 * 10) / 10;

  const kgUnit = v["kg"] || "kg";
  const gUnit = v["g"] || "g";
  const lbsUnit = v["lbs"] || "lbs";
  const stUnit = v["st"] || "st";

  const f = (t?.formats as Record<string, string>) || {};
  const summary = f.summary
    ?.replace("{stone}", stoneVal.toString())
    .replace("{kg}", kg.toFixed(2))
    .replace("{lbs}", lbs.toFixed(1)) || "";

  return {
    values: {
      kilograms: Math.round(kg * 100) / 100,
      grams: Math.round(g * 10) / 10,
      pounds: Math.round(lbs * 10) / 10,
      stonePounds: `${wholeSt} ${stUnit} ${remainLbs} ${lbsUnit}`,
      ref1: "6.35 kg",
      ref5: "31.75 kg",
      ref10: "63.50 kg",
      ref14: "88.90 kg",
    },
    formatted: {
      kilograms: `${kg.toFixed(2)} ${kgUnit}`,
      grams: `${g.toFixed(1)} ${gUnit}`,
      pounds: `${lbs.toFixed(1)} ${lbsUnit}`,
      stonePounds: `${wholeSt} ${stUnit} ${remainLbs} ${lbsUnit}`,
      ref1: `6.35 ${kgUnit}`,
      ref5: `31.75 ${kgUnit}`,
      ref10: `63.50 ${kgUnit}`,
      ref14: `88.90 ${kgUnit}`,
    },
    summary,
    isValid: true,
  };
}

export default stonesToKgConverterConfig;
