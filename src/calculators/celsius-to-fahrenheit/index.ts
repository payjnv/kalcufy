import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// CELSIUS TO FAHRENHEIT CONVERTER - V4 (EN ONLY)
// ============================================================================

export const celsiusToFahrenheitConverterConfig: CalculatorConfigV4 = {
  id: "celsius-to-fahrenheit",
  version: "4.0",
  category: "conversion",
  icon: "🌡️",

  presets: [
    { id: "freezing", icon: "🧊", values: { amount: 0 } },
    { id: "body", icon: "🤒", values: { amount: 37 } },
    { id: "boiling", icon: "♨️", values: { amount: 100 } },
  ],

  t: {
    en: {
      name: "Celsius to Fahrenheit Converter",
      slug: "celsius-to-fahrenheit",
      subtitle: "Convert Celsius to Fahrenheit instantly — essential for weather, cooking, travel, and science.",
      breadcrumb: "°C to °F",

      seo: {
        title: "Celsius to Fahrenheit Converter - Free Temperature Tool",
        description: "Convert Celsius to Fahrenheit instantly. Essential for weather, cooking, travel, and science. Includes Kelvin, common temperatures, and oven conversion chart.",
        shortDescription: "Convert Celsius to Fahrenheit instantly.",
        keywords: ["celsius to fahrenheit", "c to f converter", "convert celsius to fahrenheit", "temperature converter", "celsius to fahrenheit formula", "free temperature converter", "metric to imperial temperature"],
      },

      calculator: { yourInformation: "°C to °F" },
      ui: { yourInformation: "°C to °F", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Temperature", helpText: "Enter value and select unit" },
      },

      results: {
        fahrenheit: { label: "Fahrenheit" },
        kelvin: { label: "Kelvin" },
        rankine: { label: "Rankine" },
      },

      presets: {
        freezing: { label: "0°C", description: "Water freezing point (32°F)" },
        body: { label: "37°C", description: "Normal body temperature (98.6°F)" },
        boiling: { label: "100°C", description: "Water boiling point (212°F)" },
      },

      values: { "°F": "°F", "°C": "°C", "K": "K", "°R": "°R" },
      formats: { summary: "{c}°C = {f}°F" },

      infoCards: {
        results: {
          title: "🌡️ Conversion Results",
          items: [
            { label: "Fahrenheit", valueKey: "fahrenheit" },
            { label: "Kelvin", valueKey: "kelvin" },
            { label: "Rankine", valueKey: "rankine" },
          ],
        },
        quickRef: {
          title: "📊 Key Temperatures",
          items: [
            { label: "Freezing (0°C)", valueKey: "refFreeze" },
            { label: "Room temp (20°C)", valueKey: "refRoom" },
            { label: "Body temp (37°C)", valueKey: "refBody" },
            { label: "Boiling (100°C)", valueKey: "refBoil" },
          ],
        },
        tips: {
          title: "💡 Temperature Tips",
          items: [
            "Formula: °F = (°C × 9/5) + 32. Quick: double °C and add 30 for an estimate.",
            "Key anchors: 0°C = 32°F, 10°C = 50°F, 20°C = 68°F, 30°C = 86°F.",
            "-40 is the magic number — it's the same in both scales: -40°C = -40°F.",
            "Oven temps: 180°C = 356°F, 200°C = 392°F, 220°C = 428°F.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Celsius to Fahrenheit",
          content: "To convert Celsius to Fahrenheit, multiply by 9/5 (or 1.8) and add 32. The formula is: °F = (°C × 9/5) + 32. The Celsius scale (also called centigrade) was devised by Anders Celsius in 1742 and sets water's freezing point at 0° and boiling point at 100° at standard pressure. The Fahrenheit scale, created by Daniel Fahrenheit in 1724, sets water's freezing at 32° and boiling at 212°. Most of the world uses Celsius, while the US is the only major country using Fahrenheit for daily weather and cooking.",
        },
        howItWorks: {
          title: "The °C to °F Formula Explained",
          content: "The exact formula is: °F = (°C × 1.8) + 32. The factor 1.8 (or 9/5) accounts for the different scale sizes: Fahrenheit has 180 degrees between freezing and boiling (32 to 212), while Celsius has 100 degrees (0 to 100). So each Celsius degree = 1.8 Fahrenheit degrees. The +32 shifts the scale since freezing is at 32°F. For quick mental math: double the Celsius value and add 30. Example: 25°C → (25 × 2) + 30 = 80°F (actual: 77°F — close enough for weather).",
        },
        considerations: {
          title: "Common Temperature Conversions",
          items: [
            { text: "-40°C = -40°F — the only point where both scales are equal", type: "info" },
            { text: "0°C = 32°F — water freezes, snow/ice weather", type: "info" },
            { text: "20°C = 68°F — comfortable room temperature", type: "info" },
            { text: "37°C = 98.6°F — normal human body temperature", type: "info" },
            { text: "100°C = 212°F — water boils at sea level", type: "info" },
            { text: "180°C = 356°F — common oven baking temperature", type: "info" },
          ],
        },
        ovenTemps: {
          title: "Oven Temperature Conversions",
          items: [
            { text: "120°C = 248°F — very low / slow cooking", type: "info" },
            { text: "150°C = 302°F — low oven / slow roasting", type: "info" },
            { text: "180°C = 356°F — moderate oven (most baking)", type: "info" },
            { text: "200°C = 392°F — hot oven (roasting, pizza)", type: "info" },
            { text: "220°C = 428°F — very hot oven (bread, crispy skin)", type: "info" },
            { text: "250°C = 482°F — maximum for most home ovens", type: "info" },
          ],
        },
        examples: {
          title: "Celsius to Fahrenheit Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Weather: 28°C to °F",
              steps: ["28 × 1.8 = 50.4", "50.4 + 32 = 82.4°F", "Quick method: 28 × 2 + 30 = 86°F (close)", "28°C is a warm summer day"],
              result: "28°C = 82.4°F (warm day)",
            },
            {
              title: "Fever: 38.5°C to °F",
              steps: ["38.5 × 1.8 = 69.3", "69.3 + 32 = 101.3°F", "Normal body temp: 37°C = 98.6°F", "38.5°C is a moderate fever"],
              result: "38.5°C = 101.3°F (fever)",
            },
          ],
        },
      },

      faqs: [
        { question: "What is the formula for Celsius to Fahrenheit?", answer: "°F = (°C × 9/5) + 32, or equivalently °F = (°C × 1.8) + 32. Multiply the Celsius temperature by 1.8, then add 32 to get Fahrenheit." },
        { question: "What is 0°C in Fahrenheit?", answer: "0°C = 32°F. This is the freezing point of water at standard atmospheric pressure. It's one of the two key anchor points for temperature conversion." },
        { question: "What is normal body temperature in Fahrenheit?", answer: "Normal body temperature is 37°C = 98.6°F. A fever is generally considered 38°C (100.4°F) or higher. However, normal body temperature can range from 36.1°C to 37.2°C (97°F to 99°F)." },
        { question: "How do I quickly estimate °C to °F?", answer: "Double the Celsius value and add 30. Example: 25°C → 50 + 30 = 80°F (actual: 77°F). This method works well for weather temperatures (0-40°C) with about ±3°F accuracy." },
        { question: "At what temperature are Celsius and Fahrenheit equal?", answer: "-40 degrees is the only temperature that is the same on both scales: -40°C = -40°F. You can verify: (-40 × 1.8) + 32 = -72 + 32 = -40." },
        { question: "What is 180°C in Fahrenheit for baking?", answer: "180°C = 356°F, which is the most common baking temperature (often called \"moderate oven\" or Gas Mark 4). Most cakes, cookies, and casseroles bake at this temperature." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de Celsius a Fahrenheit",
      "slug": "calculadora-celsius-fahrenheit",
      "subtitle": "Convierte Celsius a Fahrenheit al instante — esencial para el clima, cocina, viajes y ciencia.",
      "breadcrumb": "°C a °F",
      "seo": {
        "title": "Convertidor de Celsius a Fahrenheit - Herramienta de Temperatura Gratis",
        "description": "Convierte Celsius a Fahrenheit al instante. Esencial para clima, cocina, viajes y ciencia. Incluye Kelvin, temperaturas comunes y tabla de conversión de horno.",
        "shortDescription": "Convierte Celsius a Fahrenheit al instante.",
        "keywords": [
          "celsius a fahrenheit",
          "convertidor c a f",
          "convertir celsius a fahrenheit",
          "convertidor de temperatura",
          "fórmula celsius a fahrenheit",
          "convertidor de temperatura gratis",
          "temperatura métrico a imperial"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Temperatura",
          "helpText": "Introduce el valor y selecciona la unidad"
        }
      },
      "results": {
        "fahrenheit": {
          "label": "Fahrenheit"
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
          "label": "0°C",
          "description": "Punto de congelación del agua (32°F)"
        },
        "body": {
          "label": "37°C",
          "description": "Temperatura corporal normal (98.6°F)"
        },
        "boiling": {
          "label": "100°C",
          "description": "Punto de ebullición del agua (212°F)"
        }
      },
      "values": {
        "°F": "°F",
        "°C": "°C",
        "K": "K",
        "°R": "°R"
      },
      "formats": {
        "summary": "{c}°C = {f}°F"
      },
      "infoCards": {
        "results": {
          "title": "🌡️ Resultados de Conversión",
          "items": [
            {
              "label": "Fahrenheit",
              "valueKey": "fahrenheit"
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
          "title": "📊 Temperaturas Clave",
          "items": [
            {
              "label": "Congelación (0°C)",
              "valueKey": "refFreeze"
            },
            {
              "label": "Temp. ambiente (20°C)",
              "valueKey": "refRoom"
            },
            {
              "label": "Temp. corporal (37°C)",
              "valueKey": "refBody"
            },
            {
              "label": "Ebullición (100°C)",
              "valueKey": "refBoil"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Temperatura",
          "items": [
            "Fórmula: °F = (°C × 9/5) + 32. Rápido: duplica °C y suma 30 para una estimación.",
            "Puntos clave: 0°C = 32°F, 10°C = 50°F, 20°C = 68°F, 30°C = 86°F.",
            "-40 es el número mágico — es igual en ambas escalas: -40°C = -40°F.",
            "Temps. de horno: 180°C = 356°F, 200°C = 392°F, 220°C = 428°F."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir Celsius a Fahrenheit",
          "content": "Para convertir Celsius a Fahrenheit, multiplica por 9/5 (o 1.8) y suma 32. La fórmula es: °F = (°C × 9/5) + 32. La escala Celsius (también llamada centígrada) fue ideada por Anders Celsius en 1742 y establece el punto de congelación del agua a 0° y el de ebullición a 100° a presión estándar. La escala Fahrenheit, creada por Daniel Fahrenheit en 1724, establece la congelación del agua a 32° y la ebullición a 212°. La mayor parte del mundo usa Celsius, mientras que EE.UU. es el único país importante que usa Fahrenheit para el clima diario y la cocina."
        },
        "howItWorks": {
          "title": "La Fórmula °C a °F Explicada",
          "content": "La fórmula exacta es: °F = (°C × 1.8) + 32. El factor 1.8 (o 9/5) cuenta las diferentes escalas: Fahrenheit tiene 180 grados entre congelación y ebullición (32 a 212), mientras Celsius tiene 100 grados (0 a 100). Así cada grado Celsius = 1.8 grados Fahrenheit. El +32 ajusta la escala ya que la congelación está a 32°F. Para cálculo mental rápido: duplica el valor Celsius y suma 30. Ejemplo: 25°C → (25 × 2) + 30 = 80°F (real: 77°F — suficientemente cerca para el clima)."
        },
        "considerations": {
          "title": "Conversiones de Temperatura Comunes",
          "items": [
            {
              "text": "-40°C = -40°F — el único punto donde ambas escalas son iguales",
              "type": "info"
            },
            {
              "text": "0°C = 32°F — el agua se congela, clima de nieve/hielo",
              "type": "info"
            },
            {
              "text": "20°C = 68°F — temperatura ambiente cómoda",
              "type": "info"
            },
            {
              "text": "37°C = 98.6°F — temperatura corporal humana normal",
              "type": "info"
            },
            {
              "text": "100°C = 212°F — el agua hierve al nivel del mar",
              "type": "info"
            },
            {
              "text": "180°C = 356°F — temperatura común de horno para hornear",
              "type": "info"
            }
          ]
        },
        "ovenTemps": {
          "title": "Conversiones de Temperatura de Horno",
          "items": [
            {
              "text": "120°C = 248°F — muy bajo / cocción lenta",
              "type": "info"
            },
            {
              "text": "150°C = 302°F — horno bajo / asado lento",
              "type": "info"
            },
            {
              "text": "180°C = 356°F — horno moderado (la mayoría de horneados)",
              "type": "info"
            },
            {
              "text": "200°C = 392°F — horno caliente (asados, pizza)",
              "type": "info"
            },
            {
              "text": "220°C = 428°F — horno muy caliente (pan, piel crujiente)",
              "type": "info"
            },
            {
              "text": "250°C = 482°F — máximo para la mayoría de hornos domésticos",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Celsius a Fahrenheit",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Clima: 28°C a °F",
              "steps": [
                "28 × 1.8 = 50.4",
                "50.4 + 32 = 82.4°F",
                "Método rápido: 28 × 2 + 30 = 86°F (aproximado)",
                "28°C es un día cálido de verano"
              ],
              "result": "28°C = 82.4°F (día cálido)"
            },
            {
              "title": "Fiebre: 38.5°C a °F",
              "steps": [
                "38.5 × 1.8 = 69.3",
                "69.3 + 32 = 101.3°F",
                "Temp. corporal normal: 37°C = 98.6°F",
                "38.5°C es una fiebre moderada"
              ],
              "result": "38.5°C = 101.3°F (fiebre)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es la fórmula para Celsius a Fahrenheit?",
          "answer": "°F = (°C × 9/5) + 32, o equivalentemente °F = (°C × 1.8) + 32. Multiplica la temperatura en Celsius por 1.8, luego suma 32 para obtener Fahrenheit."
        },
        {
          "question": "¿Cuánto es 0°C en Fahrenheit?",
          "answer": "0°C = 32°F. Este es el punto de congelación del agua a presión atmosférica estándar. Es uno de los dos puntos de referencia clave para la conversión de temperatura."
        },
        {
          "question": "¿Cuál es la temperatura corporal normal en Fahrenheit?",
          "answer": "La temperatura corporal normal es 37°C = 98.6°F. La fiebre generalmente se considera 38°C (100.4°F) o más alta. Sin embargo, la temperatura corporal normal puede variar de 36.1°C a 37.2°C (97°F a 99°F)."
        },
        {
          "question": "¿Cómo estimo rápidamente °C a °F?",
          "answer": "Duplica el valor Celsius y suma 30. Ejemplo: 25°C → 50 + 30 = 80°F (real: 77°F). Este método funciona bien para temperaturas climáticas (0-40°C) con aproximadamente ±3°F de precisión."
        },
        {
          "question": "¿A qué temperatura son iguales Celsius y Fahrenheit?",
          "answer": "-40 grados es la única temperatura que es igual en ambas escalas: -40°C = -40°F. Puedes verificar: (-40 × 1.8) + 32 = -72 + 32 = -40."
        },
        {
          "question": "¿Cuánto es 180°C en Fahrenheit para hornear?",
          "answer": "180°C = 356°F, que es la temperatura de horneado más común (a menudo llamada \"horno moderado\" o Gas Mark 4). La mayoría de pasteles, galletas y cazuelas se hornean a esta temperatura."
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
      "name": "Conversor de Celsius para Fahrenheit",
      "slug": "calculadora-celsius-para-fahrenheit",
      "subtitle": "Converta Celsius para Fahrenheit instantaneamente — essencial para clima, culinária, viagem e ciência.",
      "breadcrumb": "°C para °F",
      "seo": {
        "title": "Conversor de Celsius para Fahrenheit - Ferramenta de Temperatura Gratuita",
        "description": "Converta Celsius para Fahrenheit instantaneamente. Essencial para clima, culinária, viagem e ciência. Inclui Kelvin, temperaturas comuns e tabela de conversão de forno.",
        "shortDescription": "Converta Celsius para Fahrenheit instantaneamente.",
        "keywords": [
          "celsius para fahrenheit",
          "conversor c para f",
          "converter celsius para fahrenheit",
          "conversor de temperatura",
          "fórmula celsius para fahrenheit",
          "conversor de temperatura gratuito",
          "temperatura métrica para imperial"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Temperatura",
          "helpText": "Digite o valor e selecione a unidade"
        }
      },
      "results": {
        "fahrenheit": {
          "label": "Fahrenheit"
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
          "label": "0°C",
          "description": "Ponto de congelamento da água (32°F)"
        },
        "body": {
          "label": "37°C",
          "description": "Temperatura corporal normal (98.6°F)"
        },
        "boiling": {
          "label": "100°C",
          "description": "Ponto de ebulição da água (212°F)"
        }
      },
      "values": {
        "°F": "°F",
        "°C": "°C",
        "K": "K",
        "°R": "°R"
      },
      "formats": {
        "summary": "{c}°C = {f}°F"
      },
      "infoCards": {
        "results": {
          "title": "🌡️ Resultados da Conversão",
          "items": [
            {
              "label": "Fahrenheit",
              "valueKey": "fahrenheit"
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
          "title": "📊 Temperaturas Principais",
          "items": [
            {
              "label": "Congelamento (0°C)",
              "valueKey": "refFreeze"
            },
            {
              "label": "Temp. ambiente (20°C)",
              "valueKey": "refRoom"
            },
            {
              "label": "Temp. corporal (37°C)",
              "valueKey": "refBody"
            },
            {
              "label": "Ebulição (100°C)",
              "valueKey": "refBoil"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Temperatura",
          "items": [
            "Fórmula: °F = (°C × 9/5) + 32. Rápido: dobre °C e adicione 30 para uma estimativa.",
            "Pontos-chave: 0°C = 32°F, 10°C = 50°F, 20°C = 68°F, 30°C = 86°F.",
            "-40 é o número mágico — é igual em ambas escalas: -40°C = -40°F.",
            "Temp. do forno: 180°C = 356°F, 200°C = 392°F, 220°C = 428°F."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter Celsius para Fahrenheit",
          "content": "Para converter Celsius para Fahrenheit, multiplique por 9/5 (ou 1,8) e adicione 32. A fórmula é: °F = (°C × 9/5) + 32. A escala Celsius (também chamada centígrada) foi criada por Anders Celsius em 1742 e define o ponto de congelamento da água em 0° e o ponto de ebulição em 100° à pressão padrão. A escala Fahrenheit, criada por Daniel Fahrenheit em 1724, define o congelamento da água em 32° e a ebulição em 212°. A maior parte do mundo usa Celsius, enquanto os EUA são o único país importante que usa Fahrenheit no dia a dia para clima e culinária."
        },
        "howItWorks": {
          "title": "A Fórmula °C para °F Explicada",
          "content": "A fórmula exata é: °F = (°C × 1,8) + 32. O fator 1,8 (ou 9/5) considera os diferentes tamanhos de escala: Fahrenheit tem 180 graus entre congelamento e ebulição (32 a 212), enquanto Celsius tem 100 graus (0 a 100). Então cada grau Celsius = 1,8 graus Fahrenheit. O +32 desloca a escala já que o congelamento é em 32°F. Para cálculo mental rápido: dobre o valor Celsius e adicione 30. Exemplo: 25°C → (25 × 2) + 30 = 80°F (real: 77°F — próximo o suficiente para clima)."
        },
        "considerations": {
          "title": "Conversões de Temperatura Comuns",
          "items": [
            {
              "text": "-40°C = -40°F — o único ponto onde ambas escalas são iguais",
              "type": "info"
            },
            {
              "text": "0°C = 32°F — água congela, clima de neve/gelo",
              "type": "info"
            },
            {
              "text": "20°C = 68°F — temperatura ambiente confortável",
              "type": "info"
            },
            {
              "text": "37°C = 98,6°F — temperatura corporal humana normal",
              "type": "info"
            },
            {
              "text": "100°C = 212°F — água ferve ao nível do mar",
              "type": "info"
            },
            {
              "text": "180°C = 356°F — temperatura comum de cozimento no forno",
              "type": "info"
            }
          ]
        },
        "ovenTemps": {
          "title": "Conversões de Temperatura do Forno",
          "items": [
            {
              "text": "120°C = 248°F — muito baixo / cozimento lento",
              "type": "info"
            },
            {
              "text": "150°C = 302°F — forno baixo / assado lento",
              "type": "info"
            },
            {
              "text": "180°C = 356°F — forno moderado (maioria dos assados)",
              "type": "info"
            },
            {
              "text": "200°C = 392°F — forno quente (assados, pizza)",
              "type": "info"
            },
            {
              "text": "220°C = 428°F — forno muito quente (pão, pele crocante)",
              "type": "info"
            },
            {
              "text": "250°C = 482°F — máximo para a maioria dos fornos domésticos",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Celsius para Fahrenheit",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Clima: 28°C para °F",
              "steps": [
                "28 × 1,8 = 50,4",
                "50,4 + 32 = 82,4°F",
                "Método rápido: 28 × 2 + 30 = 86°F (próximo)",
                "28°C é um dia quente de verão"
              ],
              "result": "28°C = 82,4°F (dia quente)"
            },
            {
              "title": "Febre: 38,5°C para °F",
              "steps": [
                "38,5 × 1,8 = 69,3",
                "69,3 + 32 = 101,3°F",
                "Temp. corporal normal: 37°C = 98,6°F",
                "38,5°C é febre moderada"
              ],
              "result": "38,5°C = 101,3°F (febre)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual é a fórmula para Celsius para Fahrenheit?",
          "answer": "°F = (°C × 9/5) + 32, ou equivalentemente °F = (°C × 1,8) + 32. Multiplique a temperatura Celsius por 1,8, depois adicione 32 para obter Fahrenheit."
        },
        {
          "question": "Quanto é 0°C em Fahrenheit?",
          "answer": "0°C = 32°F. Este é o ponto de congelamento da água à pressão atmosférica padrão. É um dos dois pontos-âncora principais para conversão de temperatura."
        },
        {
          "question": "Qual é a temperatura corporal normal em Fahrenheit?",
          "answer": "A temperatura corporal normal é 37°C = 98,6°F. Febre é geralmente considerada 38°C (100,4°F) ou mais. No entanto, a temperatura corporal normal pode variar de 36,1°C a 37,2°C (97°F a 99°F)."
        },
        {
          "question": "Como estimar rapidamente °C para °F?",
          "answer": "Dobre o valor Celsius e adicione 30. Exemplo: 25°C → 50 + 30 = 80°F (real: 77°F). Este método funciona bem para temperaturas climáticas (0-40°C) com precisão de cerca de ±3°F."
        },
        {
          "question": "Em que temperatura Celsius e Fahrenheit são iguais?",
          "answer": "-40 graus é a única temperatura que é igual em ambas escalas: -40°C = -40°F. Você pode verificar: (-40 × 1,8) + 32 = -72 + 32 = -40."
        },
        {
          "question": "Quanto é 180°C em Fahrenheit para cozimento?",
          "answer": "180°C = 356°F, que é a temperatura de cozimento mais comum (frequentemente chamada de \"forno moderado\" ou Gás Marca 4). A maioria dos bolos, biscoitos e caçarolas assa nesta temperatura."
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
      "name": "Convertisseur Celsius vers Fahrenheit",
      "slug": "calculateur-celsius-vers-fahrenheit",
      "subtitle": "Convertissez instantanément Celsius en Fahrenheit — essentiel pour la météo, la cuisine, les voyages et les sciences.",
      "breadcrumb": "°C vers °F",
      "seo": {
        "title": "Convertisseur Celsius vers Fahrenheit - Outil de Température Gratuit",
        "description": "Convertissez instantanément Celsius en Fahrenheit. Essentiel pour la météo, la cuisine, les voyages et les sciences. Inclut Kelvin, températures courantes et tableau de conversion four.",
        "shortDescription": "Convertissez instantanément Celsius en Fahrenheit.",
        "keywords": [
          "celsius vers fahrenheit",
          "convertisseur c vers f",
          "convertir celsius en fahrenheit",
          "convertisseur température",
          "formule celsius fahrenheit",
          "convertisseur température gratuit",
          "métrique vers impérial température"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "amount": {
          "label": "Température",
          "helpText": "Saisissez la valeur et sélectionnez l'unité"
        }
      },
      "results": {
        "fahrenheit": {
          "label": "Fahrenheit"
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
          "label": "0°C",
          "description": "Point de congélation de l'eau (32°F)"
        },
        "body": {
          "label": "37°C",
          "description": "Température corporelle normale (98,6°F)"
        },
        "boiling": {
          "label": "100°C",
          "description": "Point d'ébullition de l'eau (212°F)"
        }
      },
      "values": {
        "°F": "°F",
        "°C": "°C",
        "K": "K",
        "°R": "°R"
      },
      "formats": {
        "summary": "{c}°C = {f}°F"
      },
      "infoCards": {
        "results": {
          "title": "🌡️ Résultats de Conversion",
          "items": [
            {
              "label": "Fahrenheit",
              "valueKey": "fahrenheit"
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
          "title": "📊 Températures Clés",
          "items": [
            {
              "label": "Congélation (0°C)",
              "valueKey": "refFreeze"
            },
            {
              "label": "Temp. ambiante (20°C)",
              "valueKey": "refRoom"
            },
            {
              "label": "Temp. corporelle (37°C)",
              "valueKey": "refBody"
            },
            {
              "label": "Ébullition (100°C)",
              "valueKey": "refBoil"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils Température",
          "items": [
            "Formule : °F = (°C × 9/5) + 32. Rapide : doublez °C et ajoutez 30 pour une estimation.",
            "Points de référence : 0°C = 32°F, 10°C = 50°F, 20°C = 68°F, 30°C = 86°F.",
            "-40 est le nombre magique — identique sur les deux échelles : -40°C = -40°F.",
            "Temp. four : 180°C = 356°F, 200°C = 392°F, 220°C = 428°F."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir Celsius en Fahrenheit",
          "content": "Pour convertir Celsius en Fahrenheit, multipliez par 9/5 (ou 1,8) et ajoutez 32. La formule est : °F = (°C × 9/5) + 32. L'échelle Celsius (aussi appelée centigrade) fut conçue par Anders Celsius en 1742 et fixe le point de congélation de l'eau à 0° et l'ébullition à 100° à pression standard. L'échelle Fahrenheit, créée par Daniel Fahrenheit en 1724, fixe la congélation de l'eau à 32° et l'ébullition à 212°. La plupart du monde utilise Celsius, tandis que les États-Unis sont le seul grand pays utilisant Fahrenheit pour la météo quotidienne et la cuisine."
        },
        "howItWorks": {
          "title": "La Formule °C vers °F Expliquée",
          "content": "La formule exacte est : °F = (°C × 1,8) + 32. Le facteur 1,8 (ou 9/5) tient compte des différentes tailles d'échelle : Fahrenheit a 180 degrés entre congélation et ébullition (32 à 212), tandis que Celsius en a 100 (0 à 100). Donc chaque degré Celsius = 1,8 degré Fahrenheit. Le +32 décale l'échelle puisque la congélation est à 32°F. Pour un calcul mental rapide : doublez la valeur Celsius et ajoutez 30. Exemple : 25°C → (25 × 2) + 30 = 80°F (réel : 77°F — assez proche pour la météo)."
        },
        "considerations": {
          "title": "Conversions de Température Courantes",
          "items": [
            {
              "text": "-40°C = -40°F — le seul point où les deux échelles sont égales",
              "type": "info"
            },
            {
              "text": "0°C = 32°F — l'eau gèle, temps de neige/glace",
              "type": "info"
            },
            {
              "text": "20°C = 68°F — température ambiante confortable",
              "type": "info"
            },
            {
              "text": "37°C = 98,6°F — température corporelle humaine normale",
              "type": "info"
            },
            {
              "text": "100°C = 212°F — l'eau bout au niveau de la mer",
              "type": "info"
            },
            {
              "text": "180°C = 356°F — température de cuisson four courante",
              "type": "info"
            }
          ]
        },
        "ovenTemps": {
          "title": "Conversions Températures Four",
          "items": [
            {
              "text": "120°C = 248°F — très bas / cuisson lente",
              "type": "info"
            },
            {
              "text": "150°C = 302°F — four bas / rôtissage lent",
              "type": "info"
            },
            {
              "text": "180°C = 356°F — four modéré (plupart pâtisseries)",
              "type": "info"
            },
            {
              "text": "200°C = 392°F — four chaud (rôtissage, pizza)",
              "type": "info"
            },
            {
              "text": "220°C = 428°F — four très chaud (pain, peau croustillante)",
              "type": "info"
            },
            {
              "text": "250°C = 482°F — maximum pour la plupart des fours domestiques",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples Celsius vers Fahrenheit",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Météo : 28°C vers °F",
              "steps": [
                "28 × 1,8 = 50,4",
                "50,4 + 32 = 82,4°F",
                "Méthode rapide : 28 × 2 + 30 = 86°F (proche)",
                "28°C est une chaude journée d'été"
              ],
              "result": "28°C = 82,4°F (journée chaude)"
            },
            {
              "title": "Fièvre : 38,5°C vers °F",
              "steps": [
                "38,5 × 1,8 = 69,3",
                "69,3 + 32 = 101,3°F",
                "Temp. corporelle normale : 37°C = 98,6°F",
                "38,5°C est une fièvre modérée"
              ],
              "result": "38,5°C = 101,3°F (fièvre)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la formule pour convertir Celsius en Fahrenheit ?",
          "answer": "°F = (°C × 9/5) + 32, ou de manière équivalente °F = (°C × 1,8) + 32. Multipliez la température Celsius par 1,8, puis ajoutez 32 pour obtenir Fahrenheit."
        },
        {
          "question": "Que vaut 0°C en Fahrenheit ?",
          "answer": "0°C = 32°F. C'est le point de congélation de l'eau à pression atmosphérique standard. C'est l'un des deux points de référence clés pour la conversion de température."
        },
        {
          "question": "Quelle est la température corporelle normale en Fahrenheit ?",
          "answer": "La température corporelle normale est 37°C = 98,6°F. La fièvre est généralement considérée à 38°C (100,4°F) ou plus. Cependant, la température corporelle normale peut varier de 36,1°C à 37,2°C (97°F à 99°F)."
        },
        {
          "question": "Comment estimer rapidement °C vers °F ?",
          "answer": "Doublez la valeur Celsius et ajoutez 30. Exemple : 25°C → 50 + 30 = 80°F (réel : 77°F). Cette méthode fonctionne bien pour les températures météo (0-40°C) avec environ ±3°F de précision."
        },
        {
          "question": "À quelle température Celsius et Fahrenheit sont-ils égaux ?",
          "answer": "-40 degrés est la seule température identique sur les deux échelles : -40°C = -40°F. Vous pouvez vérifier : (-40 × 1,8) + 32 = -72 + 32 = -40."
        },
        {
          "question": "Que vaut 180°C en Fahrenheit pour la cuisson ?",
          "answer": "180°C = 356°F, qui est la température de cuisson la plus courante (souvent appelée « four modéré » ou Thermostat 4). La plupart des gâteaux, biscuits et plats cuisent à cette température."
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
      "name": "Celsius zu Fahrenheit Umrechner",
      "slug": "celsius-zu-fahrenheit-umrechner",
      "subtitle": "Celsius zu Fahrenheit sofort umrechnen — unverzichtbar für Wetter, Kochen, Reisen und Wissenschaft.",
      "breadcrumb": "°C zu °F",
      "seo": {
        "title": "Celsius zu Fahrenheit Umrechner - Kostenloses Temperatur Tool",
        "description": "Celsius zu Fahrenheit sofort umrechnen. Unverzichtbar für Wetter, Kochen, Reisen und Wissenschaft. Inklusive Kelvin, häufige Temperaturen und Backofen-Umrechnungstabelle.",
        "shortDescription": "Celsius zu Fahrenheit sofort umrechnen.",
        "keywords": [
          "celsius zu fahrenheit",
          "c zu f umrechner",
          "celsius zu fahrenheit umrechnen",
          "temperatur umrechner",
          "celsius zu fahrenheit formel",
          "kostenloser temperatur umrechner",
          "metrisch zu imperial temperatur"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "amount": {
          "label": "Temperatur",
          "helpText": "Wert eingeben und Einheit auswählen"
        }
      },
      "results": {
        "fahrenheit": {
          "label": "Fahrenheit"
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
          "label": "0°C",
          "description": "Gefrierpunkt Wasser (32°F)"
        },
        "body": {
          "label": "37°C",
          "description": "Normale Körpertemperatur (98,6°F)"
        },
        "boiling": {
          "label": "100°C",
          "description": "Siedepunkt Wasser (212°F)"
        }
      },
      "values": {
        "°F": "°F",
        "°C": "°C",
        "K": "K",
        "°R": "°R"
      },
      "formats": {
        "summary": "{c}°C = {f}°F"
      },
      "infoCards": {
        "results": {
          "title": "🌡️ Umrechnungsergebnisse",
          "items": [
            {
              "label": "Fahrenheit",
              "valueKey": "fahrenheit"
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
          "title": "📊 Wichtige Temperaturen",
          "items": [
            {
              "label": "Gefrieren (0°C)",
              "valueKey": "refFreeze"
            },
            {
              "label": "Raumtemp. (20°C)",
              "valueKey": "refRoom"
            },
            {
              "label": "Körpertemp. (37°C)",
              "valueKey": "refBody"
            },
            {
              "label": "Sieden (100°C)",
              "valueKey": "refBoil"
            }
          ]
        },
        "tips": {
          "title": "💡 Temperatur-Tipps",
          "items": [
            "Formel: °F = (°C × 9/5) + 32. Schnell: °C verdoppeln und 30 addieren für Schätzung.",
            "Wichtige Punkte: 0°C = 32°F, 10°C = 50°F, 20°C = 68°F, 30°C = 86°F.",
            "-40 ist die magische Zahl — sie ist auf beiden Skalen gleich: -40°C = -40°F.",
            "Backofentemp.: 180°C = 356°F, 200°C = 392°F, 220°C = 428°F."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Celsius zu Fahrenheit umrechnen",
          "content": "Um Celsius zu Fahrenheit umzurechnen, multiplizieren Sie mit 9/5 (oder 1,8) und addieren 32. Die Formel lautet: °F = (°C × 9/5) + 32. Die Celsius-Skala (auch Zentiskala genannt) wurde 1742 von Anders Celsius entwickelt und setzt den Gefrierpunkt von Wasser auf 0° und den Siedepunkt auf 100° bei Standarddruck. Die Fahrenheit-Skala, 1724 von Daniel Fahrenheit entwickelt, setzt das Gefrieren von Wasser auf 32° und das Sieden auf 212°. Der Großteil der Welt verwendet Celsius, während die USA das einzige große Land sind, das Fahrenheit für tägliches Wetter und Kochen verwendet."
        },
        "howItWorks": {
          "title": "Die °C zu °F Formel erklärt",
          "content": "Die exakte Formel lautet: °F = (°C × 1,8) + 32. Der Faktor 1,8 (oder 9/5) berücksichtigt die unterschiedlichen Skalengrößen: Fahrenheit hat 180 Grad zwischen Gefrier- und Siedepunkt (32 bis 212), während Celsius 100 Grad hat (0 bis 100). Also entspricht jeder Celsius-Grad 1,8 Fahrenheit-Grad. Die +32 verschiebt die Skala, da Gefrieren bei 32°F liegt. Für schnelle Kopfrechnung: Celsius-Wert verdoppeln und 30 addieren. Beispiel: 25°C → (25 × 2) + 30 = 80°F (tatsächlich: 77°F — nah genug für Wetter)."
        },
        "considerations": {
          "title": "Häufige Temperaturumrechnungen",
          "items": [
            {
              "text": "-40°C = -40°F — der einzige Punkt, wo beide Skalen gleich sind",
              "type": "info"
            },
            {
              "text": "0°C = 32°F — Wasser gefriert, Schnee-/Eiswetter",
              "type": "info"
            },
            {
              "text": "20°C = 68°F — angenehme Raumtemperatur",
              "type": "info"
            },
            {
              "text": "37°C = 98,6°F — normale menschliche Körpertemperatur",
              "type": "info"
            },
            {
              "text": "100°C = 212°F — Wasser kocht auf Meereshöhe",
              "type": "info"
            },
            {
              "text": "180°C = 356°F — häufige Backofen-Backtemperatur",
              "type": "info"
            }
          ]
        },
        "ovenTemps": {
          "title": "Backofen-Temperaturumrechnungen",
          "items": [
            {
              "text": "120°C = 248°F — sehr niedrig / langsam garen",
              "type": "info"
            },
            {
              "text": "150°C = 302°F — niedriger Backofen / langsam rösten",
              "type": "info"
            },
            {
              "text": "180°C = 356°F — mittlerer Backofen (meiste Backwaren)",
              "type": "info"
            },
            {
              "text": "200°C = 392°F — heißer Backofen (rösten, Pizza)",
              "type": "info"
            },
            {
              "text": "220°C = 428°F — sehr heißer Backofen (Brot, knusprige Haut)",
              "type": "info"
            },
            {
              "text": "250°C = 482°F — Maximum für die meisten Haushaltsbacköfen",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Celsius zu Fahrenheit Beispiele",
          "description": "Schritt-für-Schritt Umrechnungen",
          "examples": [
            {
              "title": "Wetter: 28°C zu °F",
              "steps": [
                "28 × 1,8 = 50,4",
                "50,4 + 32 = 82,4°F",
                "Schnellmethode: 28 × 2 + 30 = 86°F (nah)",
                "28°C ist ein warmer Sommertag"
              ],
              "result": "28°C = 82,4°F (warmer Tag)"
            },
            {
              "title": "Fieber: 38,5°C zu °F",
              "steps": [
                "38,5 × 1,8 = 69,3",
                "69,3 + 32 = 101,3°F",
                "Normale Körpertemp.: 37°C = 98,6°F",
                "38,5°C ist mittleres Fieber"
              ],
              "result": "38,5°C = 101,3°F (Fieber)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist die Formel für Celsius zu Fahrenheit?",
          "answer": "°F = (°C × 9/5) + 32, oder gleichwertig °F = (°C × 1,8) + 32. Multiplizieren Sie die Celsius-Temperatur mit 1,8 und addieren dann 32 für Fahrenheit."
        },
        {
          "question": "Was sind 0°C in Fahrenheit?",
          "answer": "0°C = 32°F. Das ist der Gefrierpunkt von Wasser bei normalem Atmosphärendruck. Es ist einer der zwei wichtigen Ankerpunkte für Temperaturumrechnungen."
        },
        {
          "question": "Was ist normale Körpertemperatur in Fahrenheit?",
          "answer": "Normale Körpertemperatur ist 37°C = 98,6°F. Fieber gilt generell ab 38°C (100,4°F) oder höher. Normale Körpertemperatur kann jedoch von 36,1°C bis 37,2°C (97°F bis 99°F) reichen."
        },
        {
          "question": "Wie schätze ich schnell °C zu °F?",
          "answer": "Verdoppeln Sie den Celsius-Wert und addieren 30. Beispiel: 25°C → 50 + 30 = 80°F (tatsächlich: 77°F). Diese Methode funktioniert gut für Wettertemperaturen (0-40°C) mit etwa ±3°F Genauigkeit."
        },
        {
          "question": "Bei welcher Temperatur sind Celsius und Fahrenheit gleich?",
          "answer": "-40 Grad ist die einzige Temperatur, die auf beiden Skalen gleich ist: -40°C = -40°F. Sie können prüfen: (-40 × 1,8) + 32 = -72 + 32 = -40."
        },
        {
          "question": "Was sind 180°C in Fahrenheit zum Backen?",
          "answer": "180°C = 356°F, das ist die häufigste Backtemperatur (oft \"mittlerer Backofen\" oder Gasstufe 4 genannt). Die meisten Kuchen, Kekse und Aufläufe backen bei dieser Temperatur."
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
      id: "amount",
      type: "number",
      defaultValue: null,
      placeholder: "37",
      unitType: "temperature",
      syncGroup: false,
      defaultUnit: "C",
    },
  ],

  inputGroups: [],

  results: [
    { id: "fahrenheit", type: "primary", format: "text" },
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
    { id: "ovenTemps", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST SI Units — Temperature", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-temperature" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units — Temperature", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "°C to °F" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["fahrenheit-to-celsius", "length-converter"],
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

export function calculateCelsiusToFahrenheit(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Temperature is non-linear — convert input to °C first (base)
  const fromUnit = fieldUnits.amount || "C";
  let celsius: number;
  switch (fromUnit) {
    case "F": celsius = (amount - 32) * 5 / 9; break;
    case "K": celsius = amount - 273.15; break;
    case "R": celsius = (amount - 491.67) * 5 / 9; break;
    default: celsius = amount; // C
  }

  const fahrenheit = (celsius * 9 / 5) + 32;
  const kelvin = celsius + 273.15;
  const rankine = fahrenheit + 459.67;

  return {
    values: { fahrenheit, kelvin, rankine },
    formatted: {
      fahrenheit: `${fmtNum(fahrenheit)}°F`,
      kelvin: `${fmtNum(kelvin)} K`,
      rankine: `${fmtNum(rankine)}°R`,
      refFreeze: "32°F",
      refRoom: "68°F",
      refBody: "98.6°F",
      refBoil: "212°F",
    },
    summary: `${fmtNum(amount)}°${fromUnit} = ${fmtNum(fahrenheit)}°F = ${fmtNum(kelvin)} K`,
    isValid: true,
  };
}

export default celsiusToFahrenheitConverterConfig;
