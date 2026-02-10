import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// MILES TO KM CONVERTER - V4 (EN ONLY)
// ============================================================================

export const milesToKmConverterConfig: CalculatorConfigV4 = {
  id: "miles-to-km",
  version: "4.0",
  category: "conversion",
  icon: "🛣️",

  presets: [
    { id: "mile1", icon: "🏃", values: { amount: 1 } },
    { id: "halfMarathon", icon: "🏅", values: { amount: 13.1 } },
    { id: "marathon", icon: "🏆", values: { amount: 26.2 } },
  ],

  t: {
    en: {
      name: "Miles to KM Converter",
      slug: "miles-to-km",
      subtitle: "Convert miles to kilometers instantly — perfect for running, driving, and navigation.",
      breadcrumb: "Miles to KM",

      seo: {
        title: "Miles to KM Converter - Free Distance Conversion Tool",
        description: "Convert miles to kilometers instantly. Great for running races, road trips, and international travel. Includes common distances and quick reference table.",
        shortDescription: "Convert miles to kilometers instantly.",
        keywords: ["miles to km", "miles to kilometers", "mi to km converter", "convert miles to km", "distance converter", "free miles converter", "imperial to metric distance"],
      },

      calculator: { yourInformation: "Miles to KM" },
      ui: { yourInformation: "Miles to KM", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Distance", helpText: "Enter distance and select unit from dropdown" },
      },

      results: {
        kilometers: { label: "Kilometers" },
        meters: { label: "Meters" },
        feet: { label: "Feet" },
        yards: { label: "Yards" },
        nauticalMiles: { label: "Nautical Miles" },
      },

      presets: {
        mile1: { label: "1 Mile", description: "Standard mile distance" },
        halfMarathon: { label: "Half Marathon", description: "13.1 miles" },
        marathon: { label: "Marathon", description: "26.2 miles" },
      },

      values: { "km": "km", "m": "m", "ft": "ft", "yd": "yd", "nmi": "nmi", "mi": "mi" },
      formats: { summary: "{miles} mi = {km} km" },

      infoCards: {
        results: {
          title: "🛣️ Conversion Results",
          items: [
            { label: "Kilometers", valueKey: "kilometers" },
            { label: "Meters", valueKey: "meters" },
            { label: "Feet", valueKey: "feet" },
            { label: "Yards", valueKey: "yards" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 mile", valueKey: "ref1" },
            { label: "5 miles", valueKey: "ref5" },
            { label: "10 miles", valueKey: "ref10" },
            { label: "100 miles", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "💡 Distance Tips",
          items: [
            "Quick estimate: multiply miles by 1.6 to get approximate kilometers.",
            "1 mile = exactly 1.609344 km — or about 8/5 of a km.",
            "Marathon: 26.2 mi = 42.195 km, Half marathon: 13.1 mi = 21.1 km.",
            "Speed: 60 mph = 96.6 km/h, 70 mph = 112.7 km/h.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Miles to Kilometers",
          content: "To convert miles to kilometers, multiply the mile value by 1.60934. One mile equals exactly 1.609344 kilometers. This conversion is essential when traveling internationally, since most countries outside the US and UK use kilometers for road signs and distances. The mile originated from the Roman 'mille passus' (1,000 paces) and was standardized to 5,280 feet. The kilometer, part of the metric system, is defined as 1,000 meters and is the world's standard unit for road distances.",
        },
        howItWorks: {
          title: "The Miles to KM Formula",
          content: "The formula is: kilometers = miles × 1.609344. This factor is exact — 1 international mile is defined as exactly 1,609.344 meters. For quick mental math, multiply by 1.6 or by 8/5. For example, 10 miles × 1.6 = 16 km (exact: 16.09 km). A fun trick: consecutive Fibonacci numbers approximate the conversion — 5 mi ≈ 8 km, 8 mi ≈ 13 km, 13 mi ≈ 21 km.",
        },
        considerations: {
          title: "Common Miles to KM Conversions",
          items: [
            { text: "1 mile = 1.609 km — the fundamental conversion factor", type: "info" },
            { text: "1 mile = 5,280 feet = 1,760 yards = 1,609.344 meters", type: "info" },
            { text: "60 mph = 96.56 km/h — common US highway speed", type: "info" },
            { text: "100 miles = 160.9 km — useful road trip reference", type: "info" },
            { text: "1 nautical mile = 1.151 statute miles = 1.852 km", type: "info" },
            { text: "The Fibonacci trick: 3→5, 5→8, 8→13, 13→21 (mi→km)", type: "info" },
          ],
        },
        drivingDistances: {
          title: "US Driving Distances in KM",
          items: [
            { text: "NYC to Philadelphia: 97 mi = 156 km (~2 hours)", type: "info" },
            { text: "LA to San Francisco: 382 mi = 615 km (~6 hours)", type: "info" },
            { text: "NYC to Chicago: 790 mi = 1,271 km (~12 hours)", type: "info" },
            { text: "NYC to Miami: 1,280 mi = 2,060 km (~19 hours)", type: "info" },
            { text: "NYC to LA: 2,790 mi = 4,489 km (~40 hours)", type: "info" },
            { text: "London to Edinburgh: 403 mi = 649 km (~7 hours)", type: "info" },
          ],
        },
        examples: {
          title: "Miles to KM Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Half marathon in km",
              steps: ["Half marathon = 13.1 miles", "13.1 × 1.609344 = 21.08 km", "Official distance = 21.0975 km", "Average pace: 9 min/mi = 5:35 min/km"],
              result: "13.1 miles = 21.1 km",
            },
            {
              title: "Road trip: 300 miles to km",
              steps: ["300 × 1.609344 = 482.8 km", "Quick estimate: 300 × 1.6 = 480 km", "At 65 mph (105 km/h): ~4.6 hours", "Gas: ~10-15 gallons at 20-30 mpg"],
              result: "300 miles = 482.8 km",
            },
          ],
        },
      },

      faqs: [
        { question: "How many km is 1 mile?", answer: "1 mile equals exactly 1.609344 kilometers. For quick mental math, multiply miles by 1.6. So 1 mile ≈ 1.6 km." },
        { question: "How do I convert miles to km quickly?", answer: "Multiply by 1.6 for a quick estimate. For better accuracy, multiply by 1.609. The Fibonacci trick also works: 5 mi ≈ 8 km, 8 mi ≈ 13 km, 13 mi ≈ 21 km — each Fibonacci number in miles roughly equals the next one in km." },
        { question: "How far is a marathon in km?", answer: "A full marathon is 26.219 miles = 42.195 km. A half marathon is 13.109 miles = 21.0975 km. These are exact standardized distances set by World Athletics." },
        { question: "How many km is 100 miles?", answer: "100 miles = 160.934 km. This is a useful reference: at 60 mph, that's about 1 hour 40 minutes of driving. In metric, 100 km at 100 km/h is exactly 1 hour." },
        { question: "Why does the US use miles instead of km?", answer: "The US inherited the imperial system from Britain and never officially adopted the metric system for everyday use. While the US metric system was legalized in 1866 and is used in science and medicine, road signs, speed limits, and common distances remain in miles. The UK also still uses miles for road distances despite using metric for most other measurements." },
        { question: "Is a mile longer than a kilometer?", answer: "Yes, a mile is about 61% longer than a kilometer. 1 mile = 1.609 km, so it takes more than 1.5 km to equal 1 mile. Put another way, 1 km is about 0.621 miles, or roughly 5/8 of a mile." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Conversor de Millas a KM",
      "slug": "calculadora-convertir-millas-kilometros",
      "subtitle": "Convierte millas a kilómetros al instante — perfecto para correr, conducir y navegación.",
      "breadcrumb": "Millas a KM",
      "seo": {
        "title": "Conversor de Millas a KM - Herramienta Gratuita de Conversión de Distancias",
        "description": "Convierte millas a kilómetros al instante. Ideal para carreras, viajes por carretera y viajes internacionales. Incluye distancias comunes y tabla de referencia rápida.",
        "shortDescription": "Convierte millas a kilómetros al instante.",
        "keywords": [
          "millas a km",
          "millas a kilómetros",
          "conversor mi a km",
          "convertir millas a km",
          "conversor de distancia",
          "conversor gratuito de millas",
          "distancia imperial a métrica"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Distancia",
          "helpText": "Ingresa la distancia y selecciona la unidad del menú desplegable"
        }
      },
      "results": {
        "kilometers": {
          "label": "Kilómetros"
        },
        "meters": {
          "label": "Metros"
        },
        "feet": {
          "label": "Pies"
        },
        "yards": {
          "label": "Yardas"
        },
        "nauticalMiles": {
          "label": "Millas Náuticas"
        }
      },
      "presets": {
        "mile1": {
          "label": "1 Milla",
          "description": "Distancia estándar de una milla"
        },
        "halfMarathon": {
          "label": "Media Maratón",
          "description": "13.1 millas"
        },
        "marathon": {
          "label": "Maratón",
          "description": "26.2 millas"
        }
      },
      "values": {
        "km": "km",
        "m": "m",
        "ft": "pies",
        "yd": "yd",
        "nmi": "mn",
        "mi": "mi"
      },
      "formats": {
        "summary": "{miles} mi = {km} km"
      },
      "infoCards": {
        "results": {
          "title": "🛣️ Resultados de Conversión",
          "items": [
            {
              "label": "Kilómetros",
              "valueKey": "kilometers"
            },
            {
              "label": "Metros",
              "valueKey": "meters"
            },
            {
              "label": "Pies",
              "valueKey": "feet"
            },
            {
              "label": "Yardas",
              "valueKey": "yards"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referencia Rápida",
          "items": [
            {
              "label": "1 milla",
              "valueKey": "ref1"
            },
            {
              "label": "5 millas",
              "valueKey": "ref5"
            },
            {
              "label": "10 millas",
              "valueKey": "ref10"
            },
            {
              "label": "100 millas",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Distancia",
          "items": [
            "Estimación rápida: multiplica las millas por 1.6 para obtener kilómetros aproximados.",
            "1 milla = exactamente 1.609344 km — o aproximadamente 8/5 de un km.",
            "Maratón: 26.2 mi = 42.195 km, Media maratón: 13.1 mi = 21.1 km.",
            "Velocidad: 60 mph = 96.6 km/h, 70 mph = 112.7 km/h."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir Millas a Kilómetros",
          "content": "Para convertir millas a kilómetros, multiplica el valor en millas por 1.60934. Una milla equivale exactamente a 1.609344 kilómetros. Esta conversión es esencial al viajar internacionalmente, ya que la mayoría de países fuera de EE.UU. y Reino Unido usan kilómetros para señales de tráfico y distancias. La milla se originó del romano 'mille passus' (1,000 pasos) y fue estandarizada a 5,280 pies. El kilómetro, parte del sistema métrico, se define como 1,000 metros y es la unidad estándar mundial para distancias por carretera."
        },
        "howItWorks": {
          "title": "La Fórmula de Millas a KM",
          "content": "La fórmula es: kilómetros = millas × 1.609344. Este factor es exacto — 1 milla internacional se define como exactamente 1,609.344 metros. Para cálculos mentales rápidos, multiplica por 1.6 o por 8/5. Por ejemplo, 10 millas × 1.6 = 16 km (exacto: 16.09 km). Un truco divertido: los números de Fibonacci consecutivos aproximan la conversión — 5 mi ≈ 8 km, 8 mi ≈ 13 km, 13 mi ≈ 21 km."
        },
        "considerations": {
          "title": "Conversiones Comunes de Millas a KM",
          "items": [
            {
              "text": "1 milla = 1.609 km — el factor de conversión fundamental",
              "type": "info"
            },
            {
              "text": "1 milla = 5,280 pies = 1,760 yardas = 1,609.344 metros",
              "type": "info"
            },
            {
              "text": "60 mph = 96.56 km/h — velocidad común en autopistas de EE.UU.",
              "type": "info"
            },
            {
              "text": "100 millas = 160.9 km — referencia útil para viajes por carretera",
              "type": "info"
            },
            {
              "text": "1 milla náutica = 1.151 millas terrestres = 1.852 km",
              "type": "info"
            },
            {
              "text": "El truco de Fibonacci: 3→5, 5→8, 8→13, 13→21 (mi→km)",
              "type": "info"
            }
          ]
        },
        "drivingDistances": {
          "title": "Distancias de Conducción de EE.UU. en KM",
          "items": [
            {
              "text": "NYC a Filadelfia: 97 mi = 156 km (~2 horas)",
              "type": "info"
            },
            {
              "text": "LA a San Francisco: 382 mi = 615 km (~6 horas)",
              "type": "info"
            },
            {
              "text": "NYC a Chicago: 790 mi = 1,271 km (~12 horas)",
              "type": "info"
            },
            {
              "text": "NYC a Miami: 1,280 mi = 2,060 km (~19 horas)",
              "type": "info"
            },
            {
              "text": "NYC a LA: 2,790 mi = 4,489 km (~40 horas)",
              "type": "info"
            },
            {
              "text": "Londres a Edimburgo: 403 mi = 649 km (~7 horas)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Millas a KM",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Media maratón en km",
              "steps": [
                "Media maratón = 13.1 millas",
                "13.1 × 1.609344 = 21.08 km",
                "Distancia oficial = 21.0975 km",
                "Ritmo promedio: 9 min/mi = 5:35 min/km"
              ],
              "result": "13.1 millas = 21.1 km"
            },
            {
              "title": "Viaje por carretera: 300 millas a km",
              "steps": [
                "300 × 1.609344 = 482.8 km",
                "Estimación rápida: 300 × 1.6 = 480 km",
                "A 65 mph (105 km/h): ~4.6 horas",
                "Gasolina: ~10-15 galones a 20-30 mpg"
              ],
              "result": "300 millas = 482.8 km"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos km son 1 milla?",
          "answer": "1 milla equivale exactamente a 1.609344 kilómetros. Para cálculos mentales rápidos, multiplica las millas por 1.6. Así que 1 milla ≈ 1.6 km."
        },
        {
          "question": "¿Cómo convierto millas a km rápidamente?",
          "answer": "Multiplica por 1.6 para una estimación rápida. Para mayor precisión, multiplica por 1.609. El truco de Fibonacci también funciona: 5 mi ≈ 8 km, 8 mi ≈ 13 km, 13 mi ≈ 21 km — cada número de Fibonacci en millas equivale aproximadamente al siguiente en km."
        },
        {
          "question": "¿Qué distancia tiene un maratón en km?",
          "answer": "Un maratón completo son 26.219 millas = 42.195 km. Una media maratón son 13.109 millas = 21.0975 km. Estas son distancias estandarizadas exactas establecidas por World Athletics."
        },
        {
          "question": "¿Cuántos km son 100 millas?",
          "answer": "100 millas = 160.934 km. Esta es una referencia útil: a 60 mph, son aproximadamente 1 hora 40 minutos de conducción. En métrico, 100 km a 100 km/h es exactamente 1 hora."
        },
        {
          "question": "¿Por qué EE.UU. usa millas en lugar de km?",
          "answer": "EE.UU. heredó el sistema imperial de Gran Bretaña y nunca adoptó oficialmente el sistema métrico para uso cotidiano. Aunque el sistema métrico de EE.UU. fue legalizado en 1866 y se usa en ciencia y medicina, las señales de tráfico, límites de velocidad y distancias comunes siguen siendo en millas. Reino Unido también sigue usando millas para distancias por carretera a pesar de usar métrico para la mayoría de otras mediciones."
        },
        {
          "question": "¿Es una milla más larga que un kilómetro?",
          "answer": "Sí, una milla es aproximadamente 61% más larga que un kilómetro. 1 milla = 1.609 km, así que se necesitan más de 1.5 km para igualar 1 milla. Dicho de otra manera, 1 km son aproximadamente 0.621 millas, o roughly 5/8 de una milla."
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
      "name": "Conversor de Milhas para KM",
      "slug": "calculadora-milhas-para-quilometros",
      "subtitle": "Converta milhas para quilômetros instantaneamente — perfeito para corrida, direção e navegação.",
      "breadcrumb": "Milhas para KM",
      "seo": {
        "title": "Conversor de Milhas para KM - Ferramenta Gratuita de Conversão de Distância",
        "description": "Converta milhas para quilômetros instantaneamente. Ótimo para corridas, viagens rodoviárias e viagens internacionais. Inclui distâncias comuns e tabela de referência rápida.",
        "shortDescription": "Converta milhas para quilômetros instantaneamente.",
        "keywords": [
          "milhas para km",
          "milhas para quilômetros",
          "mi para km conversor",
          "converter milhas para km",
          "conversor de distância",
          "conversor gratuito de milhas",
          "imperial para métrico distância"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Distância",
          "helpText": "Digite a distância e selecione a unidade no menu suspenso"
        }
      },
      "results": {
        "kilometers": {
          "label": "Quilômetros"
        },
        "meters": {
          "label": "Metros"
        },
        "feet": {
          "label": "Pés"
        },
        "yards": {
          "label": "Jardas"
        },
        "nauticalMiles": {
          "label": "Milhas Náuticas"
        }
      },
      "presets": {
        "mile1": {
          "label": "1 Milha",
          "description": "Distância padrão de uma milha"
        },
        "halfMarathon": {
          "label": "Meia Maratona",
          "description": "13,1 milhas"
        },
        "marathon": {
          "label": "Maratona",
          "description": "26,2 milhas"
        }
      },
      "values": {
        "km": "km",
        "m": "m",
        "ft": "pés",
        "yd": "jardas",
        "nmi": "mn",
        "mi": "mi"
      },
      "formats": {
        "summary": "{miles} mi = {km} km"
      },
      "infoCards": {
        "results": {
          "title": "🛣️ Resultados da Conversão",
          "items": [
            {
              "label": "Quilômetros",
              "valueKey": "kilometers"
            },
            {
              "label": "Metros",
              "valueKey": "meters"
            },
            {
              "label": "Pés",
              "valueKey": "feet"
            },
            {
              "label": "Jardas",
              "valueKey": "yards"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referência Rápida",
          "items": [
            {
              "label": "1 milha",
              "valueKey": "ref1"
            },
            {
              "label": "5 milhas",
              "valueKey": "ref5"
            },
            {
              "label": "10 milhas",
              "valueKey": "ref10"
            },
            {
              "label": "100 milhas",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Distância",
          "items": [
            "Estimativa rápida: multiplique milhas por 1,6 para obter quilômetros aproximados.",
            "1 milha = exatamente 1,609344 km — ou cerca de 8/5 de um km.",
            "Maratona: 26,2 mi = 42,195 km, Meia maratona: 13,1 mi = 21,1 km.",
            "Velocidade: 60 mph = 96,6 km/h, 70 mph = 112,7 km/h."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter Milhas para Quilômetros",
          "content": "Para converter milhas para quilômetros, multiplique o valor em milhas por 1,60934. Uma milha equivale exatamente a 1,609344 quilômetros. Esta conversão é essencial ao viajar internacionalmente, pois a maioria dos países fora dos EUA e Reino Unido usa quilômetros em placas de sinalização e distâncias. A milha se originou do romano 'mille passus' (1.000 passos) e foi padronizada para 5.280 pés. O quilômetro, parte do sistema métrico, é definido como 1.000 metros e é a unidade padrão mundial para distâncias rodoviárias."
        },
        "howItWorks": {
          "title": "A Fórmula de Milhas para KM",
          "content": "A fórmula é: quilômetros = milhas × 1,609344. Este fator é exato — 1 milha internacional é definida como exatamente 1.609,344 metros. Para cálculo mental rápido, multiplique por 1,6 ou por 8/5. Por exemplo, 10 milhas × 1,6 = 16 km (exato: 16,09 km). Um truque divertido: números de Fibonacci consecutivos aproximam a conversão — 5 mi ≈ 8 km, 8 mi ≈ 13 km, 13 mi ≈ 21 km."
        },
        "considerations": {
          "title": "Conversões Comuns de Milhas para KM",
          "items": [
            {
              "text": "1 milha = 1,609 km — o fator de conversão fundamental",
              "type": "info"
            },
            {
              "text": "1 milha = 5.280 pés = 1.760 jardas = 1.609,344 metros",
              "type": "info"
            },
            {
              "text": "60 mph = 96,56 km/h — velocidade comum em rodovias dos EUA",
              "type": "info"
            },
            {
              "text": "100 milhas = 160,9 km — referência útil para viagens",
              "type": "info"
            },
            {
              "text": "1 milha náutica = 1,151 milhas terrestres = 1,852 km",
              "type": "info"
            },
            {
              "text": "O truque de Fibonacci: 3→5, 5→8, 8→13, 13→21 (mi→km)",
              "type": "info"
            }
          ]
        },
        "drivingDistances": {
          "title": "Distâncias de Condução dos EUA em KM",
          "items": [
            {
              "text": "NYC para Filadélfia: 97 mi = 156 km (~2 horas)",
              "type": "info"
            },
            {
              "text": "LA para São Francisco: 382 mi = 615 km (~6 horas)",
              "type": "info"
            },
            {
              "text": "NYC para Chicago: 790 mi = 1.271 km (~12 horas)",
              "type": "info"
            },
            {
              "text": "NYC para Miami: 1.280 mi = 2.060 km (~19 horas)",
              "type": "info"
            },
            {
              "text": "NYC para LA: 2.790 mi = 4.489 km (~40 horas)",
              "type": "info"
            },
            {
              "text": "Londres para Edimburgo: 403 mi = 649 km (~7 horas)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Milhas para KM",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Meia maratona em km",
              "steps": [
                "Meia maratona = 13,1 milhas",
                "13,1 × 1,609344 = 21,08 km",
                "Distância oficial = 21,0975 km",
                "Ritmo médio: 9 min/mi = 5:35 min/km"
              ],
              "result": "13,1 milhas = 21,1 km"
            },
            {
              "title": "Viagem rodoviária: 300 milhas para km",
              "steps": [
                "300 × 1,609344 = 482,8 km",
                "Estimativa rápida: 300 × 1,6 = 480 km",
                "A 65 mph (105 km/h): ~4,6 horas",
                "Combustível: ~10-15 galões a 20-30 mpg"
              ],
              "result": "300 milhas = 482,8 km"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos km são 1 milha?",
          "answer": "1 milha equivale exatamente a 1,609344 quilômetros. Para cálculo mental rápido, multiplique milhas por 1,6. Então 1 milha ≈ 1,6 km."
        },
        {
          "question": "Como converter milhas para km rapidamente?",
          "answer": "Multiplique por 1,6 para uma estimativa rápida. Para melhor precisão, multiplique por 1,609. O truque de Fibonacci também funciona: 5 mi ≈ 8 km, 8 mi ≈ 13 km, 13 mi ≈ 21 km — cada número de Fibonacci em milhas é aproximadamente igual ao próximo em km."
        },
        {
          "question": "Qual a distância de uma maratona em km?",
          "answer": "Uma maratona completa tem 26,219 milhas = 42,195 km. Uma meia maratona tem 13,109 milhas = 21,0975 km. Estas são distâncias padronizadas exatas definidas pela World Athletics."
        },
        {
          "question": "Quantos km são 100 milhas?",
          "answer": "100 milhas = 160,934 km. Esta é uma referência útil: a 60 mph, são cerca de 1 hora e 40 minutos dirigindo. No sistema métrico, 100 km a 100 km/h é exatamente 1 hora."
        },
        {
          "question": "Por que os EUA usam milhas em vez de km?",
          "answer": "Os EUA herdaram o sistema imperial da Grã-Bretanha e nunca adotaram oficialmente o sistema métrico para uso cotidiano. Embora o sistema métrico americano tenha sido legalizado em 1866 e seja usado na ciência e medicina, placas de sinalização, limites de velocidade e distâncias comuns permanecem em milhas. O Reino Unido também ainda usa milhas para distâncias rodoviárias, apesar de usar o sistema métrico para a maioria das outras medições."
        },
        {
          "question": "Uma milha é maior que um quilômetro?",
          "answer": "Sim, uma milha é cerca de 61% maior que um quilômetro. 1 milha = 1,609 km, então são necessários mais de 1,5 km para igualar 1 milha. Em outras palavras, 1 km equivale a cerca de 0,621 milhas, ou aproximadamente 5/8 de uma milha."
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
      "name": "Convertisseur Miles en KM",
      "slug": "calculateur-conversion-miles-kilometres",
      "subtitle": "Convertissez les miles en kilomètres instantanément — parfait pour la course, la conduite et la navigation.",
      "breadcrumb": "Miles en KM",
      "seo": {
        "title": "Convertisseur Miles en KM - Outil de Conversion de Distance Gratuit",
        "description": "Convertissez les miles en kilomètres instantanément. Idéal pour les courses à pied, les voyages routiers et les voyages internationaux. Inclut les distances courantes et un tableau de référence rapide.",
        "shortDescription": "Convertissez les miles en kilomètres instantanément.",
        "keywords": [
          "miles en km",
          "miles en kilomètres",
          "convertisseur mi en km",
          "convertir miles en km",
          "convertisseur de distance",
          "convertisseur miles gratuit",
          "distance impérial vers métrique"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Distance",
          "helpText": "Entrez la distance et sélectionnez l'unité dans le menu déroulant"
        }
      },
      "results": {
        "kilometers": {
          "label": "Kilomètres"
        },
        "meters": {
          "label": "Mètres"
        },
        "feet": {
          "label": "Pieds"
        },
        "yards": {
          "label": "Yards"
        },
        "nauticalMiles": {
          "label": "Miles Nautiques"
        }
      },
      "presets": {
        "mile1": {
          "label": "1 Mile",
          "description": "Distance d'un mile standard"
        },
        "halfMarathon": {
          "label": "Semi-marathon",
          "description": "13,1 miles"
        },
        "marathon": {
          "label": "Marathon",
          "description": "26,2 miles"
        }
      },
      "values": {
        "km": "km",
        "m": "m",
        "ft": "pi",
        "yd": "yd",
        "nmi": "mn",
        "mi": "mi"
      },
      "formats": {
        "summary": "{miles} mi = {km} km"
      },
      "infoCards": {
        "results": {
          "title": "🛣️ Résultats de Conversion",
          "items": [
            {
              "label": "Kilomètres",
              "valueKey": "kilometers"
            },
            {
              "label": "Mètres",
              "valueKey": "meters"
            },
            {
              "label": "Pieds",
              "valueKey": "feet"
            },
            {
              "label": "Yards",
              "valueKey": "yards"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Référence Rapide",
          "items": [
            {
              "label": "1 mile",
              "valueKey": "ref1"
            },
            {
              "label": "5 miles",
              "valueKey": "ref5"
            },
            {
              "label": "10 miles",
              "valueKey": "ref10"
            },
            {
              "label": "100 miles",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils Distance",
          "items": [
            "Estimation rapide : multipliez les miles par 1,6 pour obtenir les kilomètres approximatifs.",
            "1 mile = exactement 1,609344 km — ou environ 8/5 d'un km.",
            "Marathon : 26,2 mi = 42,195 km, Semi-marathon : 13,1 mi = 21,1 km.",
            "Vitesse : 60 mph = 96,6 km/h, 70 mph = 112,7 km/h."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir les Miles en Kilomètres",
          "content": "Pour convertir les miles en kilomètres, multipliez la valeur en miles par 1,60934. Un mile équivaut exactement à 1,609344 kilomètres. Cette conversion est essentielle lors de voyages internationaux, car la plupart des pays en dehors des États-Unis et du Royaume-Uni utilisent les kilomètres pour les panneaux routiers et les distances. Le mile provient du 'mille passus' romain (1 000 pas) et a été standardisé à 5 280 pieds. Le kilomètre, faisant partie du système métrique, est défini comme 1 000 mètres et est l'unité standard mondiale pour les distances routières."
        },
        "howItWorks": {
          "title": "La Formule Miles vers KM",
          "content": "La formule est : kilomètres = miles × 1,609344. Ce facteur est exact — 1 mile international est défini comme exactement 1 609,344 mètres. Pour un calcul mental rapide, multipliez par 1,6 ou par 8/5. Par exemple, 10 miles × 1,6 = 16 km (exact : 16,09 km). Une astuce amusante : les nombres de Fibonacci consécutifs approximent la conversion — 5 mi ≈ 8 km, 8 mi ≈ 13 km, 13 mi ≈ 21 km."
        },
        "considerations": {
          "title": "Conversions Miles vers KM Courantes",
          "items": [
            {
              "text": "1 mile = 1,609 km — le facteur de conversion fondamental",
              "type": "info"
            },
            {
              "text": "1 mile = 5 280 pieds = 1 760 yards = 1 609,344 mètres",
              "type": "info"
            },
            {
              "text": "60 mph = 96,56 km/h — vitesse courante sur autoroute américaine",
              "type": "info"
            },
            {
              "text": "100 miles = 160,9 km — référence utile pour voyage routier",
              "type": "info"
            },
            {
              "text": "1 mile nautique = 1,151 miles terrestres = 1,852 km",
              "type": "info"
            },
            {
              "text": "L'astuce Fibonacci : 3→5, 5→8, 8→13, 13→21 (mi→km)",
              "type": "info"
            }
          ]
        },
        "drivingDistances": {
          "title": "Distances de Conduite aux États-Unis en KM",
          "items": [
            {
              "text": "NYC à Philadelphie : 97 mi = 156 km (~2 heures)",
              "type": "info"
            },
            {
              "text": "LA à San Francisco : 382 mi = 615 km (~6 heures)",
              "type": "info"
            },
            {
              "text": "NYC à Chicago : 790 mi = 1 271 km (~12 heures)",
              "type": "info"
            },
            {
              "text": "NYC à Miami : 1 280 mi = 2 060 km (~19 heures)",
              "type": "info"
            },
            {
              "text": "NYC à LA : 2 790 mi = 4 489 km (~40 heures)",
              "type": "info"
            },
            {
              "text": "Londres à Édimbourg : 403 mi = 649 km (~7 heures)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples Miles vers KM",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Semi-marathon en km",
              "steps": [
                "Semi-marathon = 13,1 miles",
                "13,1 × 1,609344 = 21,08 km",
                "Distance officielle = 21,0975 km",
                "Rythme moyen : 9 min/mi = 5:35 min/km"
              ],
              "result": "13,1 miles = 21,1 km"
            },
            {
              "title": "Voyage routier : 300 miles en km",
              "steps": [
                "300 × 1,609344 = 482,8 km",
                "Estimation rapide : 300 × 1,6 = 480 km",
                "À 65 mph (105 km/h) : ~4,6 heures",
                "Essence : ~38-57 litres à 7,8-11,8 L/100km"
              ],
              "result": "300 miles = 482,8 km"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de km fait 1 mile ?",
          "answer": "1 mile équivaut exactement à 1,609344 kilomètres. Pour un calcul mental rapide, multipliez les miles par 1,6. Donc 1 mile ≈ 1,6 km."
        },
        {
          "question": "Comment convertir rapidement les miles en km ?",
          "answer": "Multipliez par 1,6 pour une estimation rapide. Pour une meilleure précision, multipliez par 1,609. L'astuce Fibonacci fonctionne aussi : 5 mi ≈ 8 km, 8 mi ≈ 13 km, 13 mi ≈ 21 km — chaque nombre de Fibonacci en miles équivaut approximativement au suivant en km."
        },
        {
          "question": "Quelle est la distance d'un marathon en km ?",
          "answer": "Un marathon complet fait 26,219 miles = 42,195 km. Un semi-marathon fait 13,109 miles = 21,0975 km. Ce sont des distances standardisées exactes établies par World Athletics."
        },
        {
          "question": "Combien de km font 100 miles ?",
          "answer": "100 miles = 160,934 km. C'est une référence utile : à 60 mph, cela représente environ 1 heure 40 minutes de conduite. En métrique, 100 km à 100 km/h font exactement 1 heure."
        },
        {
          "question": "Pourquoi les États-Unis utilisent-ils les miles au lieu des km ?",
          "answer": "Les États-Unis ont hérité du système impérial de la Grande-Bretagne et n'ont jamais officiellement adopté le système métrique pour l'usage quotidien. Bien que le système métrique américain ait été légalisé en 1866 et soit utilisé en sciences et médecine, les panneaux routiers, limitations de vitesse et distances courantes restent en miles. Le Royaume-Uni utilise aussi encore les miles pour les distances routières malgré l'usage du métrique pour la plupart des autres mesures."
        },
        {
          "question": "Un mile est-il plus long qu'un kilomètre ?",
          "answer": "Oui, un mile est environ 61% plus long qu'un kilomètre. 1 mile = 1,609 km, donc il faut plus de 1,5 km pour égaler 1 mile. Autrement dit, 1 km fait environ 0,621 miles, soit environ 5/8 de mile."
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
      "name": "Meilen zu KM Umrechner",
      "slug": "meilen-zu-km-rechner",
      "subtitle": "Wandeln Sie Meilen sofort in Kilometer um — perfekt für Laufen, Fahren und Navigation.",
      "breadcrumb": "Meilen zu KM",
      "seo": {
        "title": "Meilen zu KM Umrechner - Kostenloses Entfernungsumrechner-Tool",
        "description": "Wandeln Sie Meilen sofort in Kilometer um. Ideal für Laufrennen, Autofahrten und internationale Reisen. Enthält gängige Entfernungen und Schnellreferenztabelle.",
        "shortDescription": "Wandeln Sie Meilen sofort in Kilometer um.",
        "keywords": [
          "meilen zu km",
          "meilen zu kilometer",
          "mi zu km umrechner",
          "meilen in km umrechnen",
          "entfernungsumrechner",
          "kostenloser meilen umrechner",
          "imperial zu metrische entfernung"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Entfernung",
          "helpText": "Geben Sie die Entfernung ein und wählen Sie die Einheit aus dem Dropdown-Menü"
        }
      },
      "results": {
        "kilometers": {
          "label": "Kilometer"
        },
        "meters": {
          "label": "Meter"
        },
        "feet": {
          "label": "Fuß"
        },
        "yards": {
          "label": "Yards"
        },
        "nauticalMiles": {
          "label": "Seemeilen"
        }
      },
      "presets": {
        "mile1": {
          "label": "1 Meile",
          "description": "Standard-Meilenentfernung"
        },
        "halfMarathon": {
          "label": "Halbmarathon",
          "description": "13,1 Meilen"
        },
        "marathon": {
          "label": "Marathon",
          "description": "26,2 Meilen"
        }
      },
      "values": {
        "km": "km",
        "m": "m",
        "ft": "ft",
        "yd": "yd",
        "nmi": "sm",
        "mi": "mi"
      },
      "formats": {
        "summary": "{miles} mi = {km} km"
      },
      "infoCards": {
        "results": {
          "title": "🛣️ Umrechnungsergebnisse",
          "items": [
            {
              "label": "Kilometer",
              "valueKey": "kilometers"
            },
            {
              "label": "Meter",
              "valueKey": "meters"
            },
            {
              "label": "Fuß",
              "valueKey": "feet"
            },
            {
              "label": "Yards",
              "valueKey": "yards"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Schnellreferenz",
          "items": [
            {
              "label": "1 Meile",
              "valueKey": "ref1"
            },
            {
              "label": "5 Meilen",
              "valueKey": "ref5"
            },
            {
              "label": "10 Meilen",
              "valueKey": "ref10"
            },
            {
              "label": "100 Meilen",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Entfernungstipps",
          "items": [
            "Schnelle Schätzung: Multiplizieren Sie Meilen mit 1,6, um ungefähre Kilometer zu erhalten.",
            "1 Meile = genau 1,609344 km — oder etwa 8/5 eines km.",
            "Marathon: 26,2 mi = 42,195 km, Halbmarathon: 13,1 mi = 21,1 km.",
            "Geschwindigkeit: 60 mph = 96,6 km/h, 70 mph = 112,7 km/h."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie man Meilen in Kilometer umrechnet",
          "content": "Um Meilen in Kilometer umzurechnen, multiplizieren Sie den Meilenwert mit 1,60934. Eine Meile entspricht genau 1,609344 Kilometer. Diese Umrechnung ist beim internationalen Reisen unerlässlich, da die meisten Länder außerhalb der USA und Großbritanniens Kilometer für Straßenschilder und Entfernungen verwenden. Die Meile stammt vom römischen 'mille passus' (1.000 Schritte) und wurde auf 5.280 Fuß standardisiert. Der Kilometer, Teil des metrischen Systems, ist als 1.000 Meter definiert und ist die weltweite Standardeinheit für Straßenentfernungen."
        },
        "howItWorks": {
          "title": "Die Meilen zu KM Formel",
          "content": "Die Formel lautet: Kilometer = Meilen × 1,609344. Dieser Faktor ist exakt — 1 internationale Meile ist als genau 1.609,344 Meter definiert. Für schnelle Kopfrechnung multiplizieren Sie mit 1,6 oder mit 8/5. Zum Beispiel: 10 Meilen × 1,6 = 16 km (exakt: 16,09 km). Ein lustiger Trick: aufeinanderfolgende Fibonacci-Zahlen approximieren die Umrechnung — 5 mi ≈ 8 km, 8 mi ≈ 13 km, 13 mi ≈ 21 km."
        },
        "considerations": {
          "title": "Gängige Meilen zu KM Umrechnungen",
          "items": [
            {
              "text": "1 Meile = 1,609 km — der grundlegende Umrechnungsfaktor",
              "type": "info"
            },
            {
              "text": "1 Meile = 5.280 Fuß = 1.760 Yards = 1.609,344 Meter",
              "type": "info"
            },
            {
              "text": "60 mph = 96,56 km/h — gängige US-Autobahngeschwindigkeit",
              "type": "info"
            },
            {
              "text": "100 Meilen = 160,9 km — nützliche Reisereferenz",
              "type": "info"
            },
            {
              "text": "1 Seemeile = 1,151 Landmeilen = 1,852 km",
              "type": "info"
            },
            {
              "text": "Der Fibonacci-Trick: 3→5, 5→8, 8→13, 13→21 (mi→km)",
              "type": "info"
            }
          ]
        },
        "drivingDistances": {
          "title": "US-Fahrentfernungen in KM",
          "items": [
            {
              "text": "NYC nach Philadelphia: 97 mi = 156 km (~2 Stunden)",
              "type": "info"
            },
            {
              "text": "LA nach San Francisco: 382 mi = 615 km (~6 Stunden)",
              "type": "info"
            },
            {
              "text": "NYC nach Chicago: 790 mi = 1.271 km (~12 Stunden)",
              "type": "info"
            },
            {
              "text": "NYC nach Miami: 1.280 mi = 2.060 km (~19 Stunden)",
              "type": "info"
            },
            {
              "text": "NYC nach LA: 2.790 mi = 4.489 km (~40 Stunden)",
              "type": "info"
            },
            {
              "text": "London nach Edinburgh: 403 mi = 649 km (~7 Stunden)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Meilen zu KM Beispiele",
          "description": "Schritt-für-Schritt-Umrechnungen",
          "examples": [
            {
              "title": "Halbmarathon in km",
              "steps": [
                "Halbmarathon = 13,1 Meilen",
                "13,1 × 1,609344 = 21,08 km",
                "Offizielle Distanz = 21,0975 km",
                "Durchschnittstempo: 9 min/mi = 5:35 min/km"
              ],
              "result": "13,1 Meilen = 21,1 km"
            },
            {
              "title": "Autofahrt: 300 Meilen zu km",
              "steps": [
                "300 × 1,609344 = 482,8 km",
                "Schnelle Schätzung: 300 × 1,6 = 480 km",
                "Bei 65 mph (105 km/h): ~4,6 Stunden",
                "Sprit: ~38-57 Liter bei 7,8-11,8 l/100km"
              ],
              "result": "300 Meilen = 482,8 km"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele km sind 1 Meile?",
          "answer": "1 Meile entspricht genau 1,609344 Kilometer. Für schnelle Kopfrechnung multiplizieren Sie Meilen mit 1,6. Also 1 Meile ≈ 1,6 km."
        },
        {
          "question": "Wie rechne ich Meilen schnell in km um?",
          "answer": "Multiplizieren Sie mit 1,6 für eine schnelle Schätzung. Für bessere Genauigkeit multiplizieren Sie mit 1,609. Der Fibonacci-Trick funktioniert auch: 5 mi ≈ 8 km, 8 mi ≈ 13 km, 13 mi ≈ 21 km — jede Fibonacci-Zahl in Meilen entspricht ungefähr der nächsten in km."
        },
        {
          "question": "Wie weit ist ein Marathon in km?",
          "answer": "Ein vollständiger Marathon ist 26,219 Meilen = 42,195 km. Ein Halbmarathon ist 13,109 Meilen = 21,0975 km. Dies sind exakte standardisierte Distanzen, die von World Athletics festgelegt wurden."
        },
        {
          "question": "Wie viele km sind 100 Meilen?",
          "answer": "100 Meilen = 160,934 km. Das ist eine nützliche Referenz: bei 60 mph sind das etwa 1 Stunde 40 Minuten Fahrzeit. Metrisch sind 100 km bei 100 km/h genau 1 Stunde."
        },
        {
          "question": "Warum verwenden die USA Meilen anstatt km?",
          "answer": "Die USA übernahmen das imperiale System von Großbritannien und führten das metrische System nie offiziell für den täglichen Gebrauch ein. Obwohl das US-metrische System 1866 legalisiert wurde und in Wissenschaft und Medizin verwendet wird, bleiben Straßenschilder, Geschwindigkeitsbegrenzungen und übliche Entfernungen in Meilen. Großbritannien verwendet auch noch Meilen für Straßenentfernungen, obwohl es für die meisten anderen Messungen metrisch ist."
        },
        {
          "question": "Ist eine Meile länger als ein Kilometer?",
          "answer": "Ja, eine Meile ist etwa 61% länger als ein Kilometer. 1 Meile = 1,609 km, also braucht es mehr als 1,5 km, um 1 Meile zu entsprechen. Anders ausgedrückt: 1 km sind etwa 0,621 Meilen oder ungefähr 5/8 einer Meile."
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
      placeholder: "26.2",
      min: 0,
      unitType: "length_large",
      syncGroup: false,
      defaultUnit: "mi",
    },
  ],

  inputGroups: [],

  results: [
    { id: "kilometers", type: "primary", format: "text" },
    { id: "meters", type: "secondary", format: "text" },
    { id: "feet", type: "secondary", format: "text" },
    { id: "yards", type: "secondary", format: "text" },
    { id: "nauticalMiles", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "🛣️", itemCount: 4 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "drivingDistances", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Units of Measurement", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "Miles to KM" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["km-to-miles", "length-converter", "mph-to-kmh"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) >= 1e6) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (Math.abs(val) < 0.01) return val.toFixed(4);
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

export function calculateMilesToKm(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "mi";
  const km = convertToBase(amount, fromUnit, "length_large");

  const meters = km * 1000;
  const miles = km * 0.621371;
  const feet = meters * 3.28084;
  const yards = feet / 3;
  const nauticalMiles = km / 1.852;

  const ref1 = 1.609344;
  const ref5 = 5 * 1.609344;
  const ref10 = 10 * 1.609344;
  const ref100 = 100 * 1.609344;

  return {
    values: { kilometers: km, meters, feet, yards, nauticalMiles },
    formatted: {
      kilometers: `${fmtNum(km)} km`,
      meters: `${fmtNum(meters)} m`,
      feet: `${fmtNum(feet)} ft`,
      yards: `${fmtNum(yards)} yd`,
      nauticalMiles: `${fmtNum(nauticalMiles)} nmi`,
      ref1: `${fmtNum(ref1)} km`,
      ref5: `${fmtNum(ref5)} km`,
      ref10: `${fmtNum(ref10)} km`,
      ref100: `${fmtNum(ref100)} km`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(km)} km`,
    isValid: true,
  };
}

export default milesToKmConverterConfig;
