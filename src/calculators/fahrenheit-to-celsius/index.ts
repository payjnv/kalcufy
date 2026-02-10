import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ============================================================================
// FAHRENHEIT TO CELSIUS CONVERTER - V4 (EN ONLY)
// ============================================================================

export const fahrenheitToCelsiusConverterConfig: CalculatorConfigV4 = {
  id: "fahrenheit-to-celsius",
  version: "4.0",
  category: "conversion",
  icon: "🌡️",

  presets: [
    { id: "freezing", icon: "🧊", values: { amount: 32 } },
    { id: "body", icon: "🤒", values: { amount: 98.6 } },
    { id: "boiling", icon: "♨️", values: { amount: 212 } },
  ],

  t: {
    en: {
      name: "Fahrenheit to Celsius Converter",
      slug: "fahrenheit-to-celsius",
      subtitle: "Convert Fahrenheit to Celsius instantly — essential for weather, cooking, travel, and science.",
      breadcrumb: "°F to °C",

      seo: {
        title: "Fahrenheit to Celsius Converter - Free Temperature Tool",
        description: "Convert Fahrenheit to Celsius instantly. Essential for international travel, cooking recipes, weather, and science. Includes Kelvin, oven chart, and weather reference.",
        shortDescription: "Convert Fahrenheit to Celsius instantly.",
        keywords: ["fahrenheit to celsius", "f to c converter", "convert fahrenheit to celsius", "temperature converter", "fahrenheit to celsius formula", "free temperature converter", "imperial to metric temperature"],
      },

      calculator: { yourInformation: "°F to °C" },
      ui: { yourInformation: "°F to °C", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Temperature", helpText: "Enter value and select unit" },
      },

      results: {
        celsius: { label: "Celsius" },
        kelvin: { label: "Kelvin" },
        rankine: { label: "Rankine" },
      },

      presets: {
        freezing: { label: "32°F", description: "Water freezing point (0°C)" },
        body: { label: "98.6°F", description: "Normal body temperature (37°C)" },
        boiling: { label: "212°F", description: "Water boiling point (100°C)" },
      },

      values: { "°C": "°C", "°F": "°F", "K": "K", "°R": "°R" },
      formats: { summary: "{f}°F = {c}°C" },

      infoCards: {
        results: {
          title: "🌡️ Conversion Results",
          items: [
            { label: "Celsius", valueKey: "celsius" },
            { label: "Kelvin", valueKey: "kelvin" },
            { label: "Rankine", valueKey: "rankine" },
          ],
        },
        quickRef: {
          title: "📊 Weather Reference",
          items: [
            { label: "32°F (freezing)", valueKey: "refFreeze" },
            { label: "68°F (room temp)", valueKey: "refRoom" },
            { label: "77°F (warm day)", valueKey: "ref77" },
            { label: "100°F (heat wave)", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "💡 Temperature Tips",
          items: [
            "Formula: °C = (°F - 32) × 5/9. Quick: subtract 30, then divide by 2.",
            "Key anchors: 32°F = 0°C, 72°F = 22°C, 98.6°F = 37°C, 212°F = 100°C.",
            "-40 is the same in both scales: -40°F = -40°C.",
            "US oven temps: 350°F = 177°C, 375°F = 191°C, 400°F = 204°C, 425°F = 218°C.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Fahrenheit to Celsius",
          content: "To convert Fahrenheit to Celsius, subtract 32 and multiply by 5/9. The formula is: °C = (°F - 32) × 5/9. The Fahrenheit scale is used daily in the United States for weather, cooking, and thermostats. Most other countries use Celsius. The -32 removes the offset (water freezes at 32°F vs 0°C), and ×5/9 scales the degree size (180°F range = 100°C range between freezing and boiling). Understanding this conversion is essential for international travel, following recipes from other countries, and interpreting global weather reports.",
        },
        howItWorks: {
          title: "The °F to °C Formula Explained",
          content: "The exact formula is: °C = (°F - 32) / 1.8. The factor 1.8 (or 9/5) exists because there are 180 Fahrenheit degrees between water's freezing (32°F) and boiling (212°F), compared to 100 Celsius degrees (0°C to 100°C). So 180/100 = 1.8. For quick mental math: subtract 30 and divide by 2. Example: 72°F → (72-30)/2 = 21°C (actual: 22.2°C — close enough for weather). This shortcut works well between 30°F and 100°F.",
        },
        considerations: {
          title: "Common Fahrenheit to Celsius Conversions",
          items: [
            { text: "0°F = -17.8°C — very cold winter weather", type: "info" },
            { text: "32°F = 0°C — water freezes, snow likely", type: "info" },
            { text: "68°F = 20°C — comfortable room temperature", type: "info" },
            { text: "72°F = 22.2°C — ideal thermostat setting", type: "info" },
            { text: "98.6°F = 37°C — normal human body temperature", type: "info" },
            { text: "212°F = 100°C — water boils at sea level", type: "info" },
          ],
        },
        usOvenChart: {
          title: "US Oven Temperature Chart (°F → °C)",
          items: [
            { text: "250°F = 121°C — very low / warming", type: "info" },
            { text: "325°F = 163°C — low oven / slow roasting", type: "info" },
            { text: "350°F = 177°C — moderate oven (most baking)", type: "info" },
            { text: "375°F = 191°C — moderate-hot (cookies, pies)", type: "info" },
            { text: "400°F = 204°C — hot oven (roasting vegetables)", type: "info" },
            { text: "450°F = 232°C — very hot (pizza, bread)", type: "info" },
          ],
        },
        examples: {
          title: "Fahrenheit to Celsius Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Weather: 85°F to °C",
              steps: ["85 - 32 = 53", "53 × 5/9 = 53 / 1.8 = 29.4°C", "Quick method: (85-30)/2 = 27.5°C (close)", "85°F is a hot summer day"],
              result: "85°F = 29.4°C (hot summer day)",
            },
            {
              title: "Oven: 375°F to °C",
              steps: ["375 - 32 = 343", "343 × 5/9 = 343 / 1.8 = 190.6°C", "Round to 190°C or 191°C", "Gas Mark 5 equivalent"],
              result: "375°F = 190.6°C ≈ 190°C",
            },
          ],
        },
      },

      faqs: [
        { question: "What is the formula for Fahrenheit to Celsius?", answer: "°C = (°F - 32) × 5/9, or equivalently °C = (°F - 32) / 1.8. Subtract 32 from Fahrenheit, then multiply by 5/9 (or divide by 1.8) to get Celsius." },
        { question: "What is 72°F in Celsius?", answer: "72°F = 22.2°C. This is a common room temperature and thermostat setting in the US. In Celsius-using countries, 22°C is considered comfortable indoor temperature." },
        { question: "What is 98.6°F in Celsius?", answer: "98.6°F = 37°C exactly. This is the standard normal human body temperature. A fever is generally considered 100.4°F (38°C) or higher." },
        { question: "How do I quickly estimate °F to °C?", answer: "Subtract 30 and divide by 2. Example: 80°F → (80-30)/2 = 25°C (actual: 26.7°C). This works within ±2°C for normal weather temperatures (30-100°F). For more accuracy, subtract 32 and divide by 1.8." },
        { question: "What is 350°F in Celsius for baking?", answer: "350°F = 176.7°C, typically rounded to 177°C or 180°C. This is the most common baking temperature in US recipes. In metric countries, the equivalent is usually stated as 180°C." },
        { question: "What temperature is the same in °F and °C?", answer: "-40 degrees is identical on both scales: -40°F = -40°C. You can verify: (-40 - 32) × 5/9 = -72 × 5/9 = -40. This is extremely cold — roughly the temperature of an arctic winter." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de Fahrenheit a Celsius",
      "slug": "calculadora-fahrenheit-celsius",
      "subtitle": "Convierte Fahrenheit a Celsius al instante — esencial para clima, cocina, viajes y ciencia.",
      "breadcrumb": "°F a °C",
      "seo": {
        "title": "Convertidor de Fahrenheit a Celsius - Herramienta de Temperatura Gratuita",
        "description": "Convierte Fahrenheit a Celsius al instante. Esencial para viajes internacionales, recetas de cocina, clima y ciencia. Incluye Kelvin, tabla de horno y referencia climática.",
        "shortDescription": "Convierte Fahrenheit a Celsius al instante.",
        "keywords": [
          "fahrenheit a celsius",
          "convertidor f a c",
          "convertir fahrenheit a celsius",
          "convertidor de temperatura",
          "fórmula fahrenheit a celsius",
          "convertidor de temperatura gratis",
          "temperatura imperial a métrico"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Temperatura",
          "helpText": "Ingresa el valor y selecciona la unidad"
        }
      },
      "results": {
        "celsius": {
          "label": "Celsius"
        },
        "kelvin": {
          "label": "Kelvin"
        },
        "rankine": {
          "label": "Rankine"
        }
      },
      "presets": {
        "freezing": {
          "label": "32°F",
          "description": "Punto de congelación del agua (0°C)"
        },
        "body": {
          "label": "98.6°F",
          "description": "Temperatura corporal normal (37°C)"
        },
        "boiling": {
          "label": "212°F",
          "description": "Punto de ebullición del agua (100°C)"
        }
      },
      "values": {
        "°C": "°C",
        "°F": "°F",
        "K": "K",
        "°R": "°R"
      },
      "formats": {
        "summary": "{f}°F = {c}°C"
      },
      "infoCards": {
        "results": {
          "title": "🌡️ Resultados de Conversión",
          "items": [
            {
              "label": "Celsius",
              "valueKey": "celsius"
            },
            {
              "label": "Kelvin",
              "valueKey": "kelvin"
            },
            {
              "label": "Rankine",
              "valueKey": "rankine"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referencia Climática",
          "items": [
            {
              "label": "32°F (congelación)",
              "valueKey": "refFreeze"
            },
            {
              "label": "68°F (temp. ambiente)",
              "valueKey": "refRoom"
            },
            {
              "label": "77°F (día cálido)",
              "valueKey": "ref77"
            },
            {
              "label": "100°F (ola de calor)",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Temperatura",
          "items": [
            "Fórmula: °C = (°F - 32) × 5/9. Rápido: resta 30, luego divide por 2.",
            "Puntos clave: 32°F = 0°C, 72°F = 22°C, 98.6°F = 37°C, 212°F = 100°C.",
            "-40 es igual en ambas escalas: -40°F = -40°C.",
            "Temps. horno EE.UU.: 350°F = 177°C, 375°F = 191°C, 400°F = 204°C, 425°F = 218°C."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir Fahrenheit a Celsius",
          "content": "Para convertir Fahrenheit a Celsius, resta 32 y multiplica por 5/9. La fórmula es: °C = (°F - 32) × 5/9. La escala Fahrenheit se usa diariamente en Estados Unidos para clima, cocina y termostatos. La mayoría de otros países usan Celsius. El -32 elimina el desplazamiento (el agua se congela a 32°F vs 0°C), y ×5/9 escala el tamaño del grado (rango de 180°F = rango de 100°C entre congelación y ebullición). Entender esta conversión es esencial para viajes internacionales, seguir recetas de otros países e interpretar reportes climáticos globales."
        },
        "howItWorks": {
          "title": "La Fórmula °F a °C Explicada",
          "content": "La fórmula exacta es: °C = (°F - 32) / 1.8. El factor 1.8 (o 9/5) existe porque hay 180 grados Fahrenheit entre la congelación (32°F) y ebullición (212°F) del agua, comparado con 100 grados Celsius (0°C a 100°C). Entonces 180/100 = 1.8. Para cálculo mental rápido: resta 30 y divide por 2. Ejemplo: 72°F → (72-30)/2 = 21°C (real: 22.2°C — bastante cercano para clima). Este atajo funciona bien entre 30°F y 100°F."
        },
        "considerations": {
          "title": "Conversiones Comunes de Fahrenheit a Celsius",
          "items": [
            {
              "text": "0°F = -17.8°C — clima invernal muy frío",
              "type": "info"
            },
            {
              "text": "32°F = 0°C — el agua se congela, probable nieve",
              "type": "info"
            },
            {
              "text": "68°F = 20°C — temperatura ambiente cómoda",
              "type": "info"
            },
            {
              "text": "72°F = 22.2°C — ajuste ideal del termostato",
              "type": "info"
            },
            {
              "text": "98.6°F = 37°C — temperatura corporal humana normal",
              "type": "info"
            },
            {
              "text": "212°F = 100°C — el agua hierve al nivel del mar",
              "type": "info"
            }
          ]
        },
        "usOvenChart": {
          "title": "Tabla de Temperatura de Horno EE.UU. (°F → °C)",
          "items": [
            {
              "text": "250°F = 121°C — muy bajo / calentamiento",
              "type": "info"
            },
            {
              "text": "325°F = 163°C — horno bajo / asado lento",
              "type": "info"
            },
            {
              "text": "350°F = 177°C — horno moderado (mayoría del horneado)",
              "type": "info"
            },
            {
              "text": "375°F = 191°C — moderado-caliente (galletas, pasteles)",
              "type": "info"
            },
            {
              "text": "400°F = 204°C — horno caliente (asando vegetales)",
              "type": "info"
            },
            {
              "text": "450°F = 232°C — muy caliente (pizza, pan)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Fahrenheit a Celsius",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Clima: 85°F a °C",
              "steps": [
                "85 - 32 = 53",
                "53 × 5/9 = 53 / 1.8 = 29.4°C",
                "Método rápido: (85-30)/2 = 27.5°C (cercano)",
                "85°F es un día caluroso de verano"
              ],
              "result": "85°F = 29.4°C (día caluroso de verano)"
            },
            {
              "title": "Horno: 375°F a °C",
              "steps": [
                "375 - 32 = 343",
                "343 × 5/9 = 343 / 1.8 = 190.6°C",
                "Redondear a 190°C o 191°C",
                "Equivalente a Gas Mark 5"
              ],
              "result": "375°F = 190.6°C ≈ 190°C"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es la fórmula para Fahrenheit a Celsius?",
          "answer": "°C = (°F - 32) × 5/9, o equivalentemente °C = (°F - 32) / 1.8. Resta 32 de Fahrenheit, luego multiplica por 5/9 (o divide por 1.8) para obtener Celsius."
        },
        {
          "question": "¿Cuánto es 72°F en Celsius?",
          "answer": "72°F = 22.2°C. Esta es una temperatura ambiente común y ajuste de termostato en EE.UU. En países que usan Celsius, 22°C se considera temperatura interior cómoda."
        },
        {
          "question": "¿Cuánto es 98.6°F en Celsius?",
          "answer": "98.6°F = 37°C exactamente. Esta es la temperatura corporal humana normal estándar. La fiebre generalmente se considera 100.4°F (38°C) o más alta."
        },
        {
          "question": "¿Cómo estimo rápidamente °F a °C?",
          "answer": "Resta 30 y divide por 2. Ejemplo: 80°F → (80-30)/2 = 25°C (real: 26.7°C). Esto funciona dentro de ±2°C para temperaturas climáticas normales (30-100°F). Para más precisión, resta 32 y divide por 1.8."
        },
        {
          "question": "¿Cuánto es 350°F en Celsius para hornear?",
          "answer": "350°F = 176.7°C, típicamente redondeado a 177°C o 180°C. Esta es la temperatura de horneado más común en recetas de EE.UU. En países métricos, el equivalente usualmente se indica como 180°C."
        },
        {
          "question": "¿Qué temperatura es igual en °F y °C?",
          "answer": "-40 grados es idéntico en ambas escalas: -40°F = -40°C. Puedes verificar: (-40 - 32) × 5/9 = -72 × 5/9 = -40. Esto es extremadamente frío — aproximadamente la temperatura de un invierno ártico."
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
      "name": "Conversor de Fahrenheit para Celsius",
      "slug": "calculadora-fahrenheit-para-celsius",
      "subtitle": "Converta Fahrenheit para Celsius instantaneamente — essencial para clima, culinária, viagem e ciência.",
      "breadcrumb": "°F para °C",
      "seo": {
        "title": "Conversor de Fahrenheit para Celsius - Ferramenta de Temperatura Gratuita",
        "description": "Converta Fahrenheit para Celsius instantaneamente. Essencial para viagens internacionais, receitas culinárias, clima e ciência. Inclui Kelvin, tabela de forno e referência climática.",
        "shortDescription": "Converta Fahrenheit para Celsius instantaneamente.",
        "keywords": [
          "fahrenheit para celsius",
          "conversor f para c",
          "converter fahrenheit para celsius",
          "conversor de temperatura",
          "fórmula fahrenheit para celsius",
          "conversor temperatura gratuito",
          "temperatura imperial para métrica"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Temperatura",
          "helpText": "Digite o valor e selecione a unidade"
        }
      },
      "results": {
        "celsius": {
          "label": "Celsius"
        },
        "kelvin": {
          "label": "Kelvin"
        },
        "rankine": {
          "label": "Rankine"
        }
      },
      "presets": {
        "freezing": {
          "label": "32°F",
          "description": "Ponto de congelamento da água (0°C)"
        },
        "body": {
          "label": "98.6°F",
          "description": "Temperatura corporal normal (37°C)"
        },
        "boiling": {
          "label": "212°F",
          "description": "Ponto de ebulição da água (100°C)"
        }
      },
      "values": {
        "°C": "°C",
        "°F": "°F",
        "K": "K",
        "°R": "°R"
      },
      "formats": {
        "summary": "{f}°F = {c}°C"
      },
      "infoCards": {
        "results": {
          "title": "🌡️ Resultados da Conversão",
          "items": [
            {
              "label": "Celsius",
              "valueKey": "celsius"
            },
            {
              "label": "Kelvin",
              "valueKey": "kelvin"
            },
            {
              "label": "Rankine",
              "valueKey": "rankine"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referência Climática",
          "items": [
            {
              "label": "32°F (congelamento)",
              "valueKey": "refFreeze"
            },
            {
              "label": "68°F (temp. ambiente)",
              "valueKey": "refRoom"
            },
            {
              "label": "77°F (dia quente)",
              "valueKey": "ref77"
            },
            {
              "label": "100°F (onda de calor)",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Temperatura",
          "items": [
            "Fórmula: °C = (°F - 32) × 5/9. Rápido: subtraia 30, depois divida por 2.",
            "Pontos-chave: 32°F = 0°C, 72°F = 22°C, 98.6°F = 37°C, 212°F = 100°C.",
            "-40 é igual em ambas as escalas: -40°F = -40°C.",
            "Temps. forno EUA: 350°F = 177°C, 375°F = 191°C, 400°F = 204°C, 425°F = 218°C."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter Fahrenheit para Celsius",
          "content": "Para converter Fahrenheit para Celsius, subtraia 32 e multiplique por 5/9. A fórmula é: °C = (°F - 32) × 5/9. A escala Fahrenheit é usada diariamente nos Estados Unidos para clima, culinária e termostatos. A maioria dos outros países usa Celsius. O -32 remove o deslocamento (água congela a 32°F vs 0°C), e ×5/9 ajusta o tamanho do grau (180°F = 100°C entre congelamento e ebulição). Compreender esta conversão é essencial para viagens internacionais, seguir receitas de outros países e interpretar relatórios climáticos globais."
        },
        "howItWorks": {
          "title": "A Fórmula °F para °C Explicada",
          "content": "A fórmula exata é: °C = (°F - 32) / 1,8. O fator 1,8 (ou 9/5) existe porque há 180 graus Fahrenheit entre o congelamento (32°F) e ebulição (212°F) da água, comparado a 100 graus Celsius (0°C a 100°C). Então 180/100 = 1,8. Para cálculo mental rápido: subtraia 30 e divida por 2. Exemplo: 72°F → (72-30)/2 = 21°C (real: 22,2°C — próximo o suficiente para clima). Este atalho funciona bem entre 30°F e 100°F."
        },
        "considerations": {
          "title": "Conversões Comuns de Fahrenheit para Celsius",
          "items": [
            {
              "text": "0°F = -17,8°C — clima de inverno muito frio",
              "type": "info"
            },
            {
              "text": "32°F = 0°C — água congela, neve provável",
              "type": "info"
            },
            {
              "text": "68°F = 20°C — temperatura ambiente confortável",
              "type": "info"
            },
            {
              "text": "72°F = 22,2°C — configuração ideal do termostato",
              "type": "info"
            },
            {
              "text": "98,6°F = 37°C — temperatura corporal humana normal",
              "type": "info"
            },
            {
              "text": "212°F = 100°C — água ferve ao nível do mar",
              "type": "info"
            }
          ]
        },
        "usOvenChart": {
          "title": "Tabela de Temperatura de Forno EUA (°F → °C)",
          "items": [
            {
              "text": "250°F = 121°C — muito baixo / aquecimento",
              "type": "info"
            },
            {
              "text": "325°F = 163°C — forno baixo / assado lento",
              "type": "info"
            },
            {
              "text": "350°F = 177°C — forno moderado (maioria dos assados)",
              "type": "info"
            },
            {
              "text": "375°F = 191°C — moderado-quente (biscoitos, tortas)",
              "type": "info"
            },
            {
              "text": "400°F = 204°C — forno quente (assar vegetais)",
              "type": "info"
            },
            {
              "text": "450°F = 232°C — muito quente (pizza, pão)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Fahrenheit para Celsius",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Clima: 85°F para °C",
              "steps": [
                "85 - 32 = 53",
                "53 × 5/9 = 53 / 1,8 = 29,4°C",
                "Método rápido: (85-30)/2 = 27,5°C (próximo)",
                "85°F é um dia quente de verão"
              ],
              "result": "85°F = 29,4°C (dia quente de verão)"
            },
            {
              "title": "Forno: 375°F para °C",
              "steps": [
                "375 - 32 = 343",
                "343 × 5/9 = 343 / 1,8 = 190,6°C",
                "Arredonde para 190°C ou 191°C",
                "Equivalente a Gás Marca 5"
              ],
              "result": "375°F = 190,6°C ≈ 190°C"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual é a fórmula para Fahrenheit para Celsius?",
          "answer": "°C = (°F - 32) × 5/9, ou equivalentemente °C = (°F - 32) / 1,8. Subtraia 32 de Fahrenheit, depois multiplique por 5/9 (ou divida por 1,8) para obter Celsius."
        },
        {
          "question": "Quanto é 72°F em Celsius?",
          "answer": "72°F = 22,2°C. Esta é uma temperatura ambiente comum e configuração de termostato nos EUA. Em países que usam Celsius, 22°C é considerada temperatura interna confortável."
        },
        {
          "question": "Quanto é 98,6°F em Celsius?",
          "answer": "98,6°F = 37°C exatamente. Esta é a temperatura corporal humana normal padrão. Febre é geralmente considerada 100,4°F (38°C) ou mais."
        },
        {
          "question": "Como estimar rapidamente °F para °C?",
          "answer": "Subtraia 30 e divida por 2. Exemplo: 80°F → (80-30)/2 = 25°C (real: 26,7°C). Isto funciona dentro de ±2°C para temperaturas climáticas normais (30-100°F). Para mais precisão, subtraia 32 e divida por 1,8."
        },
        {
          "question": "Quanto é 350°F em Celsius para assar?",
          "answer": "350°F = 176,7°C, tipicamente arredondado para 177°C ou 180°C. Esta é a temperatura de assado mais comum em receitas dos EUA. Em países métricos, o equivalente é geralmente indicado como 180°C."
        },
        {
          "question": "Qual temperatura é igual em °F e °C?",
          "answer": "-40 graus é idêntico em ambas as escalas: -40°F = -40°C. Você pode verificar: (-40 - 32) × 5/9 = -72 × 5/9 = -40. Isto é extremamente frio — aproximadamente a temperatura de um inverno ártico."
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
      "name": "Convertisseur Fahrenheit vers Celsius",
      "slug": "calculateur-fahrenheit-vers-celsius",
      "subtitle": "Convertissez Fahrenheit en Celsius instantanément — essentiel pour la météo, la cuisine, les voyages et les sciences.",
      "breadcrumb": "°F vers °C",
      "seo": {
        "title": "Convertisseur Fahrenheit vers Celsius - Outil de Température Gratuit",
        "description": "Convertissez Fahrenheit en Celsius instantanément. Essentiel pour les voyages internationaux, les recettes de cuisine, la météo et les sciences. Inclut Kelvin, tableau de four et référence météo.",
        "shortDescription": "Convertissez Fahrenheit en Celsius instantanément.",
        "keywords": [
          "fahrenheit vers celsius",
          "convertisseur f vers c",
          "convertir fahrenheit celsius",
          "convertisseur température",
          "formule fahrenheit celsius",
          "convertisseur température gratuit",
          "température impérial métrique"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "amount": {
          "label": "Température",
          "helpText": "Entrez la valeur et sélectionnez l'unité"
        }
      },
      "results": {
        "celsius": {
          "label": "Celsius"
        },
        "kelvin": {
          "label": "Kelvin"
        },
        "rankine": {
          "label": "Rankine"
        }
      },
      "presets": {
        "freezing": {
          "label": "32°F",
          "description": "Point de congélation de l'eau (0°C)"
        },
        "body": {
          "label": "98.6°F",
          "description": "Température corporelle normale (37°C)"
        },
        "boiling": {
          "label": "212°F",
          "description": "Point d'ébullition de l'eau (100°C)"
        }
      },
      "values": {
        "°C": "°C",
        "°F": "°F",
        "K": "K",
        "°R": "°R"
      },
      "formats": {
        "summary": "{f}°F = {c}°C"
      },
      "infoCards": {
        "results": {
          "title": "🌡️ Résultats de Conversion",
          "items": [
            {
              "label": "Celsius",
              "valueKey": "celsius"
            },
            {
              "label": "Kelvin",
              "valueKey": "kelvin"
            },
            {
              "label": "Rankine",
              "valueKey": "rankine"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Référence Météo",
          "items": [
            {
              "label": "32°F (congélation)",
              "valueKey": "refFreeze"
            },
            {
              "label": "68°F (température ambiante)",
              "valueKey": "refRoom"
            },
            {
              "label": "77°F (journée chaude)",
              "valueKey": "ref77"
            },
            {
              "label": "100°F (canicule)",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils de Température",
          "items": [
            "Formule : °C = (°F - 32) × 5/9. Rapide : soustrayez 30, puis divisez par 2.",
            "Points clés : 32°F = 0°C, 72°F = 22°C, 98,6°F = 37°C, 212°F = 100°C.",
            "-40 est identique dans les deux échelles : -40°F = -40°C.",
            "Températures de four US : 350°F = 177°C, 375°F = 191°C, 400°F = 204°C, 425°F = 218°C."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir Fahrenheit en Celsius",
          "content": "Pour convertir Fahrenheit en Celsius, soustrayez 32 et multipliez par 5/9. La formule est : °C = (°F - 32) × 5/9. L'échelle Fahrenheit est utilisée quotidiennement aux États-Unis pour la météo, la cuisine et les thermostats. La plupart des autres pays utilisent Celsius. Le -32 supprime le décalage (l'eau gèle à 32°F contre 0°C), et ×5/9 ajuste la taille du degré (plage de 180°F = plage de 100°C entre congélation et ébullition). Comprendre cette conversion est essentiel pour les voyages internationaux, suivre les recettes d'autres pays et interpréter les bulletins météo mondiaux."
        },
        "howItWorks": {
          "title": "La Formule °F vers °C Expliquée",
          "content": "La formule exacte est : °C = (°F - 32) / 1,8. Le facteur 1,8 (ou 9/5) existe car il y a 180 degrés Fahrenheit entre la congélation (32°F) et l'ébullition (212°F) de l'eau, comparé à 100 degrés Celsius (0°C à 100°C). Donc 180/100 = 1,8. Pour un calcul mental rapide : soustrayez 30 et divisez par 2. Exemple : 72°F → (72-30)/2 = 21°C (réel : 22,2°C — assez proche pour la météo). Ce raccourci fonctionne bien entre 30°F et 100°F."
        },
        "considerations": {
          "title": "Conversions Courantes Fahrenheit vers Celsius",
          "items": [
            {
              "text": "0°F = -17,8°C — temps hivernal très froid",
              "type": "info"
            },
            {
              "text": "32°F = 0°C — l'eau gèle, neige probable",
              "type": "info"
            },
            {
              "text": "68°F = 20°C — température ambiante confortable",
              "type": "info"
            },
            {
              "text": "72°F = 22,2°C — réglage de thermostat idéal",
              "type": "info"
            },
            {
              "text": "98,6°F = 37°C — température corporelle humaine normale",
              "type": "info"
            },
            {
              "text": "212°F = 100°C — l'eau bout au niveau de la mer",
              "type": "info"
            }
          ]
        },
        "usOvenChart": {
          "title": "Tableau de Température de Four US (°F → °C)",
          "items": [
            {
              "text": "250°F = 121°C — très bas / maintien au chaud",
              "type": "info"
            },
            {
              "text": "325°F = 163°C — four bas / rôtissage lent",
              "type": "info"
            },
            {
              "text": "350°F = 177°C — four modéré (la plupart des cuissons)",
              "type": "info"
            },
            {
              "text": "375°F = 191°C — modéré-chaud (biscuits, tartes)",
              "type": "info"
            },
            {
              "text": "400°F = 204°C — four chaud (légumes rôtis)",
              "type": "info"
            },
            {
              "text": "450°F = 232°C — très chaud (pizza, pain)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples Fahrenheit vers Celsius",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Météo : 85°F vers °C",
              "steps": [
                "85 - 32 = 53",
                "53 × 5/9 = 53 / 1,8 = 29,4°C",
                "Méthode rapide : (85-30)/2 = 27,5°C (proche)",
                "85°F est une chaude journée d'été"
              ],
              "result": "85°F = 29,4°C (chaude journée d'été)"
            },
            {
              "title": "Four : 375°F vers °C",
              "steps": [
                "375 - 32 = 343",
                "343 × 5/9 = 343 / 1,8 = 190,6°C",
                "Arrondir à 190°C ou 191°C",
                "Équivalent thermostat 6-7"
              ],
              "result": "375°F = 190,6°C ≈ 190°C"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la formule pour convertir Fahrenheit en Celsius ?",
          "answer": "°C = (°F - 32) × 5/9, ou de manière équivalente °C = (°F - 32) / 1,8. Soustrayez 32 du Fahrenheit, puis multipliez par 5/9 (ou divisez par 1,8) pour obtenir Celsius."
        },
        {
          "question": "Combien fait 72°F en Celsius ?",
          "answer": "72°F = 22,2°C. C'est une température ambiante commune et un réglage de thermostat aux États-Unis. Dans les pays utilisant Celsius, 22°C est considéré comme une température intérieure confortable."
        },
        {
          "question": "Combien fait 98,6°F en Celsius ?",
          "answer": "98,6°F = 37°C exactement. C'est la température corporelle humaine normale standard. Une fièvre est généralement considérée à 38°C (100,4°F) ou plus."
        },
        {
          "question": "Comment estimer rapidement °F vers °C ?",
          "answer": "Soustrayez 30 et divisez par 2. Exemple : 80°F → (80-30)/2 = 25°C (réel : 26,7°C). Cela fonctionne à ±2°C près pour les températures météo normales (30-100°F). Pour plus de précision, soustrayez 32 et divisez par 1,8."
        },
        {
          "question": "Combien fait 350°F en Celsius pour la pâtisserie ?",
          "answer": "350°F = 176,7°C, généralement arrondi à 177°C ou 180°C. C'est la température de cuisson la plus courante dans les recettes américaines. Dans les pays métriques, l'équivalent est généralement indiqué comme 180°C."
        },
        {
          "question": "Quelle température est identique en °F et °C ?",
          "answer": "-40 degrés est identique sur les deux échelles : -40°F = -40°C. Vous pouvez vérifier : (-40 - 32) × 5/9 = -72 × 5/9 = -40. C'est extrêmement froid — environ la température d'un hiver arctique."
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
      "name": "Fahrenheit zu Celsius Umrechner",
      "slug": "fahrenheit-zu-celsius-rechner",
      "subtitle": "Fahrenheit zu Celsius sofort umrechnen — unverzichtbar für Wetter, Kochen, Reisen und Wissenschaft.",
      "breadcrumb": "°F zu °C",
      "seo": {
        "title": "Fahrenheit zu Celsius Umrechner - Kostenloses Temperatur-Tool",
        "description": "Fahrenheit zu Celsius sofort umrechnen. Unverzichtbar für internationale Reisen, Kochrezepte, Wetter und Wissenschaft. Inklusive Kelvin, Backofen-Tabelle und Wetter-Referenz.",
        "shortDescription": "Fahrenheit zu Celsius sofort umrechnen.",
        "keywords": [
          "fahrenheit zu celsius",
          "f zu c umrechner",
          "fahrenheit zu celsius umrechnen",
          "temperatur umrechner",
          "fahrenheit zu celsius formel",
          "kostenloser temperatur umrechner",
          "imperial zu metrisch temperatur"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Temperatur",
          "helpText": "Wert eingeben und Einheit auswählen"
        }
      },
      "results": {
        "celsius": {
          "label": "Celsius"
        },
        "kelvin": {
          "label": "Kelvin"
        },
        "rankine": {
          "label": "Rankine"
        }
      },
      "presets": {
        "freezing": {
          "label": "32°F",
          "description": "Wasser Gefrierpunkt (0°C)"
        },
        "body": {
          "label": "98.6°F",
          "description": "Normale Körpertemperatur (37°C)"
        },
        "boiling": {
          "label": "212°F",
          "description": "Wasser Siedepunkt (100°C)"
        }
      },
      "values": {
        "°C": "°C",
        "°F": "°F",
        "K": "K",
        "°R": "°R"
      },
      "formats": {
        "summary": "{f}°F = {c}°C"
      },
      "infoCards": {
        "results": {
          "title": "🌡️ Umrechnungsergebnisse",
          "items": [
            {
              "label": "Celsius",
              "valueKey": "celsius"
            },
            {
              "label": "Kelvin",
              "valueKey": "kelvin"
            },
            {
              "label": "Rankine",
              "valueKey": "rankine"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Wetter-Referenz",
          "items": [
            {
              "label": "32°F (Gefrierpunkt)",
              "valueKey": "refFreeze"
            },
            {
              "label": "68°F (Zimmertemp.)",
              "valueKey": "refRoom"
            },
            {
              "label": "77°F (warmer Tag)",
              "valueKey": "ref77"
            },
            {
              "label": "100°F (Hitzewelle)",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Temperatur-Tipps",
          "items": [
            "Formel: °C = (°F - 32) × 5/9. Schnell: 30 abziehen, dann durch 2 teilen.",
            "Wichtige Ankerpunkte: 32°F = 0°C, 72°F = 22°C, 98.6°F = 37°C, 212°F = 100°C.",
            "-40 ist auf beiden Skalen gleich: -40°F = -40°C.",
            "US Backofen-Temperaturen: 350°F = 177°C, 375°F = 191°C, 400°F = 204°C, 425°F = 218°C."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie man Fahrenheit zu Celsius umrechnet",
          "content": "Um Fahrenheit zu Celsius umzurechnen, ziehen Sie 32 ab und multiplizieren mit 5/9. Die Formel lautet: °C = (°F - 32) × 5/9. Die Fahrenheit-Skala wird täglich in den Vereinigten Staaten für Wetter, Kochen und Thermostate verwendet. Die meisten anderen Länder verwenden Celsius. Das -32 entfernt den Versatz (Wasser gefriert bei 32°F vs 0°C), und ×5/9 skaliert die Gradgröße (180°F-Bereich = 100°C-Bereich zwischen Gefrieren und Kochen). Das Verständnis dieser Umrechnung ist essentiell für internationale Reisen, das Befolgen von Rezepten aus anderen Ländern und das Interpretieren globaler Wetterberichte."
        },
        "howItWorks": {
          "title": "Die °F zu °C Formel erklärt",
          "content": "Die exakte Formel ist: °C = (°F - 32) / 1,8. Der Faktor 1,8 (oder 9/5) existiert, weil es 180 Fahrenheit-Grade zwischen Wassers Gefrieren (32°F) und Kochen (212°F) gibt, verglichen mit 100 Celsius-Graden (0°C bis 100°C). Also 180/100 = 1,8. Für schnelles Kopfrechnen: 30 abziehen und durch 2 teilen. Beispiel: 72°F → (72-30)/2 = 21°C (tatsächlich: 22,2°C — nah genug für Wetter). Diese Abkürzung funktioniert gut zwischen 30°F und 100°F."
        },
        "considerations": {
          "title": "Häufige Fahrenheit zu Celsius Umrechnungen",
          "items": [
            {
              "text": "0°F = -17,8°C — sehr kaltes Winterwetter",
              "type": "info"
            },
            {
              "text": "32°F = 0°C — Wasser gefriert, Schnee wahrscheinlich",
              "type": "info"
            },
            {
              "text": "68°F = 20°C — angenehme Zimmertemperatur",
              "type": "info"
            },
            {
              "text": "72°F = 22,2°C — ideale Thermostat-Einstellung",
              "type": "info"
            },
            {
              "text": "98,6°F = 37°C — normale menschliche Körpertemperatur",
              "type": "info"
            },
            {
              "text": "212°F = 100°C — Wasser kocht auf Meereshöhe",
              "type": "info"
            }
          ]
        },
        "usOvenChart": {
          "title": "US Backofen-Temperatur Tabelle (°F → °C)",
          "items": [
            {
              "text": "250°F = 121°C — sehr niedrig / warmhalten",
              "type": "info"
            },
            {
              "text": "325°F = 163°C — niedrig / langsames Rösten",
              "type": "info"
            },
            {
              "text": "350°F = 177°C — mittlerer Ofen (meistens Backen)",
              "type": "info"
            },
            {
              "text": "375°F = 191°C — mittel-heiß (Kekse, Kuchen)",
              "type": "info"
            },
            {
              "text": "400°F = 204°C — heißer Ofen (Gemüse rösten)",
              "type": "info"
            },
            {
              "text": "450°F = 232°C — sehr heiß (Pizza, Brot)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Fahrenheit zu Celsius Beispiele",
          "description": "Schritt-für-Schritt Umrechnungen",
          "examples": [
            {
              "title": "Wetter: 85°F zu °C",
              "steps": [
                "85 - 32 = 53",
                "53 × 5/9 = 53 / 1,8 = 29,4°C",
                "Schnelle Methode: (85-30)/2 = 27,5°C (nah)",
                "85°F ist ein heißer Sommertag"
              ],
              "result": "85°F = 29,4°C (heißer Sommertag)"
            },
            {
              "title": "Backofen: 375°F zu °C",
              "steps": [
                "375 - 32 = 343",
                "343 × 5/9 = 343 / 1,8 = 190,6°C",
                "Runden auf 190°C oder 191°C",
                "Entspricht Gasstufe 5"
              ],
              "result": "375°F = 190,6°C ≈ 190°C"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist die Formel für Fahrenheit zu Celsius?",
          "answer": "°C = (°F - 32) × 5/9, oder gleichwertig °C = (°F - 32) / 1,8. Ziehen Sie 32 von Fahrenheit ab, dann multiplizieren Sie mit 5/9 (oder teilen durch 1,8) um Celsius zu erhalten."
        },
        {
          "question": "Was sind 72°F in Celsius?",
          "answer": "72°F = 22,2°C. Das ist eine übliche Zimmertemperatur und Thermostat-Einstellung in den USA. In Celsius-verwendenden Ländern gelten 22°C als angenehme Innentemperatur."
        },
        {
          "question": "Was sind 98,6°F in Celsius?",
          "answer": "98,6°F = 37°C genau. Das ist die normale menschliche Körpertemperatur. Fieber wird generell ab 100,4°F (38°C) oder höher betrachtet."
        },
        {
          "question": "Wie schätze ich schnell °F zu °C ab?",
          "answer": "30 abziehen und durch 2 teilen. Beispiel: 80°F → (80-30)/2 = 25°C (tatsächlich: 26,7°C). Das funktioniert mit ±2°C Genauigkeit für normale Wetter-Temperaturen (30-100°F). Für mehr Genauigkeit, 32 abziehen und durch 1,8 teilen."
        },
        {
          "question": "Was sind 350°F in Celsius zum Backen?",
          "answer": "350°F = 176,7°C, typisch gerundet auf 177°C oder 180°C. Das ist die häufigste Backtemperatur in US-Rezepten. In metrischen Ländern wird das Äquivalent meist als 180°C angegeben."
        },
        {
          "question": "Welche Temperatur ist gleich in °F und °C?",
          "answer": "-40 Grad ist identisch auf beiden Skalen: -40°F = -40°C. Sie können das überprüfen: (-40 - 32) × 5/9 = -72 × 5/9 = -40. Das ist extrem kalt — etwa die Temperatur eines arktischen Winters."
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
      id: "amount",
      type: "number",
      defaultValue: null,
      placeholder: "72",
      unitType: "temperature",
      syncGroup: false,
      defaultUnit: "F",
    },
  ],

  inputGroups: [],

  results: [
    { id: "celsius", type: "primary", format: "text" },
    { id: "kelvin", type: "secondary", format: "text" },
    { id: "rankine", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "🌡️", itemCount: 3 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "usOvenChart", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST SI Units — Temperature", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-temperature" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units — Temperature", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "°F to °C" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["celsius-to-fahrenheit", "length-converter"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE — Temperature is NON-LINEAR, handle manually
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) >= 1e6) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function calculateFahrenheitToCelsius(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "F";
  let celsius: number;
  switch (fromUnit) {
    case "C": celsius = amount; break;
    case "K": celsius = amount - 273.15; break;
    case "R": celsius = (amount - 491.67) * 5 / 9; break;
    default: celsius = (amount - 32) * 5 / 9; // F
  }

  const fahrenheit = (celsius * 9 / 5) + 32;
  const kelvin = celsius + 273.15;
  const rankine = fahrenheit + 459.67;

  return {
    values: { celsius, kelvin, rankine },
    formatted: {
      celsius: `${fmtNum(celsius)}°C`,
      kelvin: `${fmtNum(kelvin)} K`,
      rankine: `${fmtNum(rankine)}°R`,
      refFreeze: "0°C",
      refRoom: "20°C",
      ref77: "25°C",
      ref100: "37.8°C",
    },
    summary: `${fmtNum(amount)}°${fromUnit} = ${fmtNum(celsius)}°C = ${fmtNum(kelvin)} K`,
    isValid: true,
  };
}

export default fahrenheitToCelsiusConverterConfig;
