import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// KM TO MILES CONVERTER - V4 (EN ONLY)
// ============================================================================

export const kmToMilesConverterConfig: CalculatorConfigV4 = {
  id: "km-to-miles",
  version: "4.0",
  category: "conversion",
  icon: "🛣️",

  presets: [
    { id: "fiveK", icon: "🏃", values: { amount: 5 } },
    { id: "tenK", icon: "🏅", values: { amount: 10 } },
    { id: "marathon", icon: "🏆", values: { amount: 42.195 } },
  ],

  t: {
    en: {
      name: "KM to Miles Converter",
      slug: "km-to-miles",
      subtitle: "Convert kilometers to miles instantly — perfect for running, driving, and travel distances.",
      breadcrumb: "KM to Miles",

      seo: {
        title: "KM to Miles Converter - Free Distance Conversion Tool",
        description: "Convert kilometers to miles instantly. Great for running distances, road trips, and speed conversions. Includes quick reference table and common distances.",
        shortDescription: "Convert kilometers to miles instantly.",
        keywords: ["km to miles", "kilometers to miles", "km to mi converter", "convert km to miles", "distance converter", "free km converter", "metric to imperial distance"],
      },

      calculator: { yourInformation: "KM to Miles" },
      ui: { yourInformation: "KM to Miles", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Kilometers (km)", helpText: "Enter the distance in kilometers" },
      },

      results: {
        miles: { label: "Miles" },
        meters: { label: "Meters" },
        feet: { label: "Feet" },
        yards: { label: "Yards" },
        nauticalMiles: { label: "Nautical Miles" },
      },

      presets: {
        fiveK: { label: "5K Race", description: "5 kilometer running race" },
        tenK: { label: "10K Race", description: "10 kilometer running race" },
        marathon: { label: "Marathon", description: "42.195 km full marathon" },
      },

      values: { "mi": "mi", "m": "m", "ft": "ft", "yd": "yd", "nmi": "nmi", "km": "km" },
      formats: { summary: "{km} km = {miles} miles" },

      infoCards: {
        results: {
          title: "🛣️ Conversion Results",
          items: [
            { label: "Miles", valueKey: "miles" },
            { label: "Meters", valueKey: "meters" },
            { label: "Feet", valueKey: "feet" },
            { label: "Yards", valueKey: "yards" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 km", valueKey: "ref1" },
            { label: "5 km (5K)", valueKey: "ref5" },
            { label: "10 km (10K)", valueKey: "ref10" },
            { label: "42.195 km (marathon)", valueKey: "refMarathon" },
          ],
        },
        tips: {
          title: "💡 Distance Tips",
          items: [
            "Quick estimate: multiply km by 0.6 to get approximate miles (exact: 0.621371).",
            "Or divide km by 1.6 — easy mental math for road trips.",
            "5K = 3.1 mi, 10K = 6.2 mi, half marathon = 13.1 mi, marathon = 26.2 mi.",
            "Speed: 100 km/h ≈ 62 mph — common European highway speed limit.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Kilometers to Miles",
          content: "To convert kilometers to miles, multiply the kilometer value by 0.621371 (or divide by 1.60934). One kilometer equals approximately 0.621 miles, or about 5/8 of a mile. This conversion is essential for travelers, runners, and anyone working with international distance measurements. The kilometer is the standard unit of distance in most countries, while the mile is primarily used in the United States, United Kingdom, and a few other countries for road distances.",
        },
        howItWorks: {
          title: "The KM to Miles Formula",
          content: "The conversion formula is: miles = kilometers × 0.621371. This factor comes from the exact definition: 1 mile = 1,609.344 meters exactly. So 1 km = 1,000 / 1,609.344 = 0.621371 miles. For a quick mental approximation, multiply by 5/8 or 0.6. For example, 100 km × 0.6 = 60 miles (exact: 62.14 miles). Another trick: use Fibonacci numbers — 3, 5, 8, 13, 21, 34 km roughly equals 2, 3, 5, 8, 13, 21 miles.",
        },
        considerations: {
          title: "Common KM to Miles Conversions",
          items: [
            { text: "1 km = 0.6214 miles — just over half a mile", type: "info" },
            { text: "1.609 km = 1 mile exactly — the key reference value", type: "info" },
            { text: "100 km = 62.14 miles — typical European road trip unit", type: "info" },
            { text: "100 km/h = 62.14 mph — common highway speed limit comparison", type: "info" },
            { text: "1 nautical mile = 1.852 km — used in aviation and maritime", type: "info" },
            { text: "The circumference of Earth ≈ 40,075 km = 24,901 miles", type: "info" },
          ],
        },
        runningDistances: {
          title: "Running Race Distances",
          items: [
            { text: "1 mile = 1.609 km — the classic track & field distance", type: "info" },
            { text: "5K = 5 km = 3.107 miles — most popular beginner race distance", type: "info" },
            { text: "10K = 10 km = 6.214 miles — popular intermediate race distance", type: "info" },
            { text: "Half marathon = 21.0975 km = 13.109 miles — growing in popularity", type: "info" },
            { text: "Marathon = 42.195 km = 26.219 miles — the iconic long-distance race", type: "info" },
            { text: "Ultra-marathon = 50 km+ (31+ miles) — extreme endurance races", type: "info" },
          ],
        },
        examples: {
          title: "KM to Miles Examples",
          description: "Step-by-step distance conversions",
          examples: [
            {
              title: "Convert 10K race to miles",
              steps: ["10 km × 0.621371 = 6.21371 miles", "Round: 6.21 miles or ~6.2 mi", "Average 10K time: 50-70 min", "Pace: ~8-11 min/mile"],
              result: "10 km = 6.21 miles",
            },
            {
              title: "Road trip: 500 km to miles",
              steps: ["500 km × 0.621371 = 310.69 miles", "At 100 km/h (62 mph): ~5 hours", "Quick estimate: 500 × 0.6 = 300 mi", "Exact: 310.7 miles"],
              result: "500 km = 310.7 miles (~5 hr drive)",
            },
          ],
        },
      },

      faqs: [
        { question: "How many miles is 1 km?", answer: "1 kilometer equals 0.621371 miles, or approximately 5/8 of a mile. For quick mental math, multiply km by 0.6 for a close estimate." },
        { question: "How do I convert km to miles quickly?", answer: "The simplest mental math trick: multiply km by 0.6 or divide by 1.6. For better accuracy, multiply by 5/8. For the exact result, multiply by 0.621371." },
        { question: "How many km is a marathon?", answer: "A full marathon is exactly 42.195 kilometers, which equals 26.219 miles (commonly rounded to 26.2 miles). A half marathon is 21.0975 km (13.1 miles)." },
        { question: "How far is 100 km in miles?", answer: "100 km = 62.14 miles. This is a useful reference point: 100 km/h (a common speed limit in Europe) equals about 62 mph." },
        { question: "What is the difference between a mile and a kilometer?", answer: "A mile is longer: 1 mile = 1.60934 km, and 1 km = 0.621 miles. The mile is used primarily in the US and UK for road distances, while the kilometer is used by most other countries. The km is a metric unit (1 km = 1,000 m) while the mile is an imperial unit (1 mi = 5,280 ft)." },
        { question: "Is 5K 3 miles?", answer: "A 5K is slightly more than 3 miles — exactly 3.107 miles (5 × 0.621371). For practical purposes, a 5K is commonly described as about 3.1 miles." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Conversor de KM a Millas",
      "slug": "calculadora-conversion-kilometros-millas",
      "subtitle": "Convierte kilómetros a millas al instante — perfecto para distancias de carrera, conducción y viaje.",
      "breadcrumb": "KM a Millas",
      "seo": {
        "title": "Conversor de KM a Millas - Herramienta Gratuita de Conversión de Distancias",
        "description": "Convierte kilómetros a millas al instante. Ideal para distancias de carrera, viajes por carretera y conversiones de velocidad. Incluye tabla de referencia rápida y distancias comunes.",
        "shortDescription": "Convierte kilómetros a millas al instante.",
        "keywords": [
          "km a millas",
          "kilómetros a millas",
          "conversor km a mi",
          "convertir km a millas",
          "conversor de distancia",
          "conversor km gratis",
          "distancia métrica a imperial"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Kilómetros (km)",
          "helpText": "Ingresa la distancia en kilómetros"
        }
      },
      "results": {
        "miles": {
          "label": "Millas"
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
        "fiveK": {
          "label": "Carrera 5K",
          "description": "Carrera de 5 kilómetros"
        },
        "tenK": {
          "label": "Carrera 10K",
          "description": "Carrera de 10 kilómetros"
        },
        "marathon": {
          "label": "Maratón",
          "description": "Maratón completo de 42.195 km"
        }
      },
      "values": {
        "mi": "mi",
        "m": "m",
        "ft": "ft",
        "yd": "yd",
        "nmi": "mn",
        "km": "km"
      },
      "formats": {
        "summary": "{km} km = {miles} millas"
      },
      "infoCards": {
        "results": {
          "title": "🛣️ Resultados de Conversión",
          "items": [
            {
              "label": "Millas",
              "valueKey": "miles"
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
              "label": "1 km",
              "valueKey": "ref1"
            },
            {
              "label": "5 km (5K)",
              "valueKey": "ref5"
            },
            {
              "label": "10 km (10K)",
              "valueKey": "ref10"
            },
            {
              "label": "42.195 km (maratón)",
              "valueKey": "refMarathon"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Distancia",
          "items": [
            "Estimación rápida: multiplica km por 0.6 para obtener millas aproximadas (exacto: 0.621371).",
            "O divide km entre 1.6 — matemática mental fácil para viajes por carretera.",
            "5K = 3.1 mi, 10K = 6.2 mi, medio maratón = 13.1 mi, maratón = 26.2 mi.",
            "Velocidad: 100 km/h ≈ 62 mph — límite de velocidad común en autopistas europeas."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir Kilómetros a Millas",
          "content": "Para convertir kilómetros a millas, multiplica el valor en kilómetros por 0.621371 (o divide entre 1.60934). Un kilómetro equivale aproximadamente a 0.621 millas, o cerca de 5/8 de una milla. Esta conversión es esencial para viajeros, corredores y cualquiera que trabaje con medidas de distancia internacionales. El kilómetro es la unidad estándar de distancia en la mayoría de países, mientras que la milla se usa principalmente en Estados Unidos, Reino Unido y algunos otros países para distancias viales."
        },
        "howItWorks": {
          "title": "La Fórmula de KM a Millas",
          "content": "La fórmula de conversión es: millas = kilómetros × 0.621371. Este factor proviene de la definición exacta: 1 milla = 1,609.344 metros exactamente. Así que 1 km = 1,000 / 1,609.344 = 0.621371 millas. Para una aproximación mental rápida, multiplica por 5/8 o 0.6. Por ejemplo, 100 km × 0.6 = 60 millas (exacto: 62.14 millas). Otro truco: usa números de Fibonacci — 3, 5, 8, 13, 21, 34 km equivale aproximadamente a 2, 3, 5, 8, 13, 21 millas."
        },
        "considerations": {
          "title": "Conversiones Comunes de KM a Millas",
          "items": [
            {
              "text": "1 km = 0.6214 millas — poco más de media milla",
              "type": "info"
            },
            {
              "text": "1.609 km = 1 milla exactamente — el valor de referencia clave",
              "type": "info"
            },
            {
              "text": "100 km = 62.14 millas — unidad típica de viaje europeo",
              "type": "info"
            },
            {
              "text": "100 km/h = 62.14 mph — comparación común de límite de velocidad en autopista",
              "type": "info"
            },
            {
              "text": "1 milla náutica = 1.852 km — usada en aviación y marítimo",
              "type": "info"
            },
            {
              "text": "La circunferencia de la Tierra ≈ 40,075 km = 24,901 millas",
              "type": "info"
            }
          ]
        },
        "runningDistances": {
          "title": "Distancias de Carreras",
          "items": [
            {
              "text": "1 milla = 1.609 km — la distancia clásica de atletismo",
              "type": "info"
            },
            {
              "text": "5K = 5 km = 3.107 millas — distancia de carrera más popular para principiantes",
              "type": "info"
            },
            {
              "text": "10K = 10 km = 6.214 millas — distancia popular intermedia",
              "type": "info"
            },
            {
              "text": "Medio maratón = 21.0975 km = 13.109 millas — creciendo en popularidad",
              "type": "info"
            },
            {
              "text": "Maratón = 42.195 km = 26.219 millas — la carrera icónica de larga distancia",
              "type": "info"
            },
            {
              "text": "Ultra-maratón = 50 km+ (31+ millas) — carreras de resistencia extrema",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de KM a Millas",
          "description": "Conversiones de distancia paso a paso",
          "examples": [
            {
              "title": "Convertir carrera 10K a millas",
              "steps": [
                "10 km × 0.621371 = 6.21371 millas",
                "Redondear: 6.21 millas o ~6.2 mi",
                "Tiempo promedio 10K: 50-70 min",
                "Ritmo: ~8-11 min/milla"
              ],
              "result": "10 km = 6.21 millas"
            },
            {
              "title": "Viaje por carretera: 500 km a millas",
              "steps": [
                "500 km × 0.621371 = 310.69 millas",
                "A 100 km/h (62 mph): ~5 horas",
                "Estimación rápida: 500 × 0.6 = 300 mi",
                "Exacto: 310.7 millas"
              ],
              "result": "500 km = 310.7 millas (~5 hr de manejo)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántas millas es 1 km?",
          "answer": "1 kilómetro equivale a 0.621371 millas, o aproximadamente 5/8 de una milla. Para matemática mental rápida, multiplica km por 0.6 para una estimación cercana."
        },
        {
          "question": "¿Cómo convierto km a millas rápidamente?",
          "answer": "El truco de matemática mental más simple: multiplica km por 0.6 o divide entre 1.6. Para mejor precisión, multiplica por 5/8. Para el resultado exacto, multiplica por 0.621371."
        },
        {
          "question": "¿Cuántos km es un maratón?",
          "answer": "Un maratón completo son exactamente 42.195 kilómetros, que equivale a 26.219 millas (comúnmente redondeado a 26.2 millas). Un medio maratón son 21.0975 km (13.1 millas)."
        },
        {
          "question": "¿Qué tan lejos están 100 km en millas?",
          "answer": "100 km = 62.14 millas. Este es un punto de referencia útil: 100 km/h (un límite de velocidad común en Europa) equivale a cerca de 62 mph."
        },
        {
          "question": "¿Cuál es la diferencia entre una milla y un kilómetro?",
          "answer": "Una milla es más larga: 1 milla = 1.60934 km, y 1 km = 0.621 millas. La milla se usa principalmente en EE.UU. y Reino Unido para distancias viales, mientras que el kilómetro lo usan la mayoría de otros países. El km es una unidad métrica (1 km = 1,000 m) mientras que la milla es una unidad imperial (1 mi = 5,280 ft)."
        },
        {
          "question": "¿Un 5K son 3 millas?",
          "answer": "Un 5K es ligeramente más de 3 millas — exactamente 3.107 millas (5 × 0.621371). Para propósitos prácticos, un 5K se describe comúnmente como cerca de 3.1 millas."
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
      "name": "Conversor de KM para Milhas",
      "slug": "calculadora-quilometros-milhas",
      "subtitle": "Converta quilômetros para milhas instantaneamente — perfeito para corrida, direção e distâncias de viagem.",
      "breadcrumb": "KM para Milhas",
      "seo": {
        "title": "Conversor de KM para Milhas - Ferramenta Gratuita de Conversão de Distância",
        "description": "Converta quilômetros para milhas instantaneamente. Ótimo para distâncias de corrida, viagens rodoviárias e conversões de velocidade. Inclui tabela de referência rápida e distâncias comuns.",
        "shortDescription": "Converta quilômetros para milhas instantaneamente.",
        "keywords": [
          "km para milhas",
          "quilômetros para milhas",
          "conversor km para mi",
          "converter km para milhas",
          "conversor de distância",
          "conversor km gratuito",
          "métrico para imperial distância"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Quilômetros (km)",
          "helpText": "Digite a distância em quilômetros"
        }
      },
      "results": {
        "miles": {
          "label": "Milhas"
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
        "fiveK": {
          "label": "Corrida 5K",
          "description": "Corrida de 5 quilômetros"
        },
        "tenK": {
          "label": "Corrida 10K",
          "description": "Corrida de 10 quilômetros"
        },
        "marathon": {
          "label": "Maratona",
          "description": "Maratona completa de 42.195 km"
        }
      },
      "values": {
        "mi": "mi",
        "m": "m",
        "ft": "pés",
        "yd": "jardas",
        "nmi": "mn",
        "km": "km"
      },
      "formats": {
        "summary": "{km} km = {miles} milhas"
      },
      "infoCards": {
        "results": {
          "title": "🛣️ Resultados da Conversão",
          "items": [
            {
              "label": "Milhas",
              "valueKey": "miles"
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
              "label": "1 km",
              "valueKey": "ref1"
            },
            {
              "label": "5 km (5K)",
              "valueKey": "ref5"
            },
            {
              "label": "10 km (10K)",
              "valueKey": "ref10"
            },
            {
              "label": "42.195 km (maratona)",
              "valueKey": "refMarathon"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Distância",
          "items": [
            "Estimativa rápida: multiplique km por 0,6 para obter milhas aproximadas (exato: 0,621371).",
            "Ou divida km por 1,6 — cálculo mental fácil para viagens rodoviárias.",
            "5K = 3,1 mi, 10K = 6,2 mi, meia maratona = 13,1 mi, maratona = 26,2 mi.",
            "Velocidade: 100 km/h ≈ 62 mph — limite de velocidade comum em rodovias europeias."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter Quilômetros para Milhas",
          "content": "Para converter quilômetros para milhas, multiplique o valor em quilômetros por 0,621371 (ou divida por 1,60934). Um quilômetro equivale a aproximadamente 0,621 milhas, ou cerca de 5/8 de milha. Esta conversão é essencial para viajantes, corredores e qualquer pessoa que trabalhe com medidas internacionais de distância. O quilômetro é a unidade padrão de distância na maioria dos países, enquanto a milha é usada principalmente nos Estados Unidos, Reino Unido e alguns outros países para distâncias rodoviárias."
        },
        "howItWorks": {
          "title": "A Fórmula de KM para Milhas",
          "content": "A fórmula de conversão é: milhas = quilômetros × 0,621371. Este fator vem da definição exata: 1 milha = 1.609,344 metros exatamente. Então 1 km = 1.000 / 1.609,344 = 0,621371 milhas. Para uma aproximação mental rápida, multiplique por 5/8 ou 0,6. Por exemplo, 100 km × 0,6 = 60 milhas (exato: 62,14 milhas). Outro truque: use números de Fibonacci — 3, 5, 8, 13, 21, 34 km equivalem aproximadamente a 2, 3, 5, 8, 13, 21 milhas."
        },
        "considerations": {
          "title": "Conversões Comuns de KM para Milhas",
          "items": [
            {
              "text": "1 km = 0,6214 milhas — pouco mais de meia milha",
              "type": "info"
            },
            {
              "text": "1,609 km = 1 milha exatamente — o valor de referência chave",
              "type": "info"
            },
            {
              "text": "100 km = 62,14 milhas — unidade típica de viagem rodoviária europeia",
              "type": "info"
            },
            {
              "text": "100 km/h = 62,14 mph — comparação comum de limite de velocidade em rodovias",
              "type": "info"
            },
            {
              "text": "1 milha náutica = 1,852 km — usada na aviação e marítima",
              "type": "info"
            },
            {
              "text": "A circunferência da Terra ≈ 40.075 km = 24.901 milhas",
              "type": "info"
            }
          ]
        },
        "runningDistances": {
          "title": "Distâncias de Corrida",
          "items": [
            {
              "text": "1 milha = 1,609 km — a distância clássica de atletismo",
              "type": "info"
            },
            {
              "text": "5K = 5 km = 3,107 milhas — distância de corrida mais popular para iniciantes",
              "type": "info"
            },
            {
              "text": "10K = 10 km = 6,214 milhas — distância popular intermediária",
              "type": "info"
            },
            {
              "text": "Meia maratona = 21,0975 km = 13,109 milhas — crescendo em popularidade",
              "type": "info"
            },
            {
              "text": "Maratona = 42,195 km = 26,219 milhas — a corrida icônica de longa distância",
              "type": "info"
            },
            {
              "text": "Ultra-maratona = 50 km+ (31+ milhas) — corridas de resistência extrema",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de KM para Milhas",
          "description": "Conversões de distância passo a passo",
          "examples": [
            {
              "title": "Converter corrida 10K para milhas",
              "steps": [
                "10 km × 0,621371 = 6,21371 milhas",
                "Arredondar: 6,21 milhas ou ~6,2 mi",
                "Tempo médio 10K: 50-70 min",
                "Ritmo: ~8-11 min/milha"
              ],
              "result": "10 km = 6,21 milhas"
            },
            {
              "title": "Viagem rodoviária: 500 km para milhas",
              "steps": [
                "500 km × 0,621371 = 310,69 milhas",
                "A 100 km/h (62 mph): ~5 horas",
                "Estimativa rápida: 500 × 0,6 = 300 mi",
                "Exato: 310,7 milhas"
              ],
              "result": "500 km = 310,7 milhas (~5 h de viagem)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantas milhas são 1 km?",
          "answer": "1 quilômetro equivale a 0,621371 milhas, ou aproximadamente 5/8 de milha. Para cálculo mental rápido, multiplique km por 0,6 para uma estimativa próxima."
        },
        {
          "question": "Como converter km para milhas rapidamente?",
          "answer": "O truque de cálculo mental mais simples: multiplique km por 0,6 ou divida por 1,6. Para melhor precisão, multiplique por 5/8. Para o resultado exato, multiplique por 0,621371."
        },
        {
          "question": "Quantos km tem uma maratona?",
          "answer": "Uma maratona completa tem exatamente 42,195 quilômetros, que equivale a 26,219 milhas (comumente arredondado para 26,2 milhas). Uma meia maratona tem 21,0975 km (13,1 milhas)."
        },
        {
          "question": "Quão longe é 100 km em milhas?",
          "answer": "100 km = 62,14 milhas. Este é um ponto de referência útil: 100 km/h (um limite de velocidade comum na Europa) equivale a cerca de 62 mph."
        },
        {
          "question": "Qual é a diferença entre uma milha e um quilômetro?",
          "answer": "Uma milha é mais longa: 1 milha = 1,60934 km, e 1 km = 0,621 milhas. A milha é usada principalmente nos EUA e Reino Unido para distâncias rodoviárias, enquanto o quilômetro é usado pela maioria dos outros países. O km é uma unidade métrica (1 km = 1.000 m) enquanto a milha é uma unidade imperial (1 mi = 5.280 pés)."
        },
        {
          "question": "5K são 3 milhas?",
          "answer": "Um 5K é ligeiramente mais que 3 milhas — exatamente 3,107 milhas (5 × 0,621371). Para fins práticos, um 5K é comumente descrito como cerca de 3,1 milhas."
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
      "name": "Convertisseur KM en Miles",
      "slug": "calculateur-kilometres-miles",
      "subtitle": "Convertissez les kilomètres en miles instantanément — parfait pour la course, la conduite et les distances de voyage.",
      "breadcrumb": "KM en Miles",
      "seo": {
        "title": "Convertisseur KM en Miles - Outil Gratuit de Conversion de Distance",
        "description": "Convertissez les kilomètres en miles instantanément. Idéal pour les distances de course, les voyages en voiture et les conversions de vitesse. Inclut un tableau de référence rapide et les distances courantes.",
        "shortDescription": "Convertissez les kilomètres en miles instantanément.",
        "keywords": [
          "km en miles",
          "kilomètres en miles",
          "convertisseur km miles",
          "convertir km en miles",
          "convertisseur distance",
          "convertisseur km gratuit",
          "distance métrique impériale"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "amount": {
          "label": "Kilomètres (km)",
          "helpText": "Entrez la distance en kilomètres"
        }
      },
      "results": {
        "miles": {
          "label": "Miles"
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
        "fiveK": {
          "label": "Course 5K",
          "description": "Course de 5 kilomètres"
        },
        "tenK": {
          "label": "Course 10K",
          "description": "Course de 10 kilomètres"
        },
        "marathon": {
          "label": "Marathon",
          "description": "Marathon complet de 42,195 km"
        }
      },
      "values": {
        "mi": "mi",
        "m": "m",
        "ft": "pi",
        "yd": "yd",
        "nmi": "mn",
        "km": "km"
      },
      "formats": {
        "summary": "{km} km = {miles} miles"
      },
      "infoCards": {
        "results": {
          "title": "🛣️ Résultats de Conversion",
          "items": [
            {
              "label": "Miles",
              "valueKey": "miles"
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
              "label": "1 km",
              "valueKey": "ref1"
            },
            {
              "label": "5 km (5K)",
              "valueKey": "ref5"
            },
            {
              "label": "10 km (10K)",
              "valueKey": "ref10"
            },
            {
              "label": "42,195 km (marathon)",
              "valueKey": "refMarathon"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils de Distance",
          "items": [
            "Estimation rapide : multipliez les km par 0,6 pour obtenir des miles approximatifs (exact : 0,621371).",
            "Ou divisez les km par 1,6 — calcul mental facile pour les voyages en voiture.",
            "5K = 3,1 mi, 10K = 6,2 mi, semi-marathon = 13,1 mi, marathon = 26,2 mi.",
            "Vitesse : 100 km/h ≈ 62 mph — limite de vitesse commune sur autoroute européenne."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir les Kilomètres en Miles",
          "content": "Pour convertir les kilomètres en miles, multipliez la valeur en kilomètres par 0,621371 (ou divisez par 1,60934). Un kilomètre équivaut à environ 0,621 miles, ou environ 5/8 de mile. Cette conversion est essentielle pour les voyageurs, les coureurs et toute personne travaillant avec des mesures de distance internationales. Le kilomètre est l'unité standard de distance dans la plupart des pays, tandis que le mile est principalement utilisé aux États-Unis, au Royaume-Uni et dans quelques autres pays pour les distances routières."
        },
        "howItWorks": {
          "title": "La Formule KM vers Miles",
          "content": "La formule de conversion est : miles = kilomètres × 0,621371. Ce facteur provient de la définition exacte : 1 mile = 1 609,344 mètres exactement. Donc 1 km = 1 000 / 1 609,344 = 0,621371 miles. Pour une approximation mentale rapide, multipliez par 5/8 ou 0,6. Par exemple, 100 km × 0,6 = 60 miles (exact : 62,14 miles). Autre astuce : utilisez les nombres de Fibonacci — 3, 5, 8, 13, 21, 34 km équivalent approximativement à 2, 3, 5, 8, 13, 21 miles."
        },
        "considerations": {
          "title": "Conversions Courantes KM vers Miles",
          "items": [
            {
              "text": "1 km = 0,6214 miles — un peu plus d'un demi-mile",
              "type": "info"
            },
            {
              "text": "1,609 km = 1 mile exactement — la valeur de référence clé",
              "type": "info"
            },
            {
              "text": "100 km = 62,14 miles — unité typique de voyage routier européen",
              "type": "info"
            },
            {
              "text": "100 km/h = 62,14 mph — comparaison commune de limite de vitesse d'autoroute",
              "type": "info"
            },
            {
              "text": "1 mile nautique = 1,852 km — utilisé en aviation et maritime",
              "type": "info"
            },
            {
              "text": "La circonférence de la Terre ≈ 40 075 km = 24 901 miles",
              "type": "info"
            }
          ]
        },
        "runningDistances": {
          "title": "Distances de Course",
          "items": [
            {
              "text": "1 mile = 1,609 km — la distance classique d'athlétisme",
              "type": "info"
            },
            {
              "text": "5K = 5 km = 3,107 miles — distance de course débutant la plus populaire",
              "type": "info"
            },
            {
              "text": "10K = 10 km = 6,214 miles — distance de course intermédiaire populaire",
              "type": "info"
            },
            {
              "text": "Semi-marathon = 21,0975 km = 13,109 miles — gagne en popularité",
              "type": "info"
            },
            {
              "text": "Marathon = 42,195 km = 26,219 miles — la course longue distance iconique",
              "type": "info"
            },
            {
              "text": "Ultra-marathon = 50 km+ (31+ miles) — courses d'endurance extrême",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples KM vers Miles",
          "description": "Conversions de distance étape par étape",
          "examples": [
            {
              "title": "Convertir une course 10K en miles",
              "steps": [
                "10 km × 0,621371 = 6,21371 miles",
                "Arrondi : 6,21 miles ou ~6,2 mi",
                "Temps moyen 10K : 50-70 min",
                "Allure : ~8-11 min/mile"
              ],
              "result": "10 km = 6,21 miles"
            },
            {
              "title": "Voyage routier : 500 km en miles",
              "steps": [
                "500 km × 0,621371 = 310,69 miles",
                "À 100 km/h (62 mph) : ~5 heures",
                "Estimation rapide : 500 × 0,6 = 300 mi",
                "Exact : 310,7 miles"
              ],
              "result": "500 km = 310,7 miles (~5h de route)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de miles font 1 km ?",
          "answer": "1 kilomètre équivaut à 0,621371 miles, ou environ 5/8 de mile. Pour un calcul mental rapide, multipliez les km par 0,6 pour une estimation proche."
        },
        {
          "question": "Comment convertir rapidement les km en miles ?",
          "answer": "L'astuce de calcul mental la plus simple : multipliez les km par 0,6 ou divisez par 1,6. Pour une meilleure précision, multipliez par 5/8. Pour le résultat exact, multipliez par 0,621371."
        },
        {
          "question": "Combien de km fait un marathon ?",
          "answer": "Un marathon complet fait exactement 42,195 kilomètres, ce qui équivaut à 26,219 miles (communément arrondi à 26,2 miles). Un semi-marathon fait 21,0975 km (13,1 miles)."
        },
        {
          "question": "Quelle distance font 100 km en miles ?",
          "answer": "100 km = 62,14 miles. C'est un point de référence utile : 100 km/h (une limite de vitesse commune en Europe) équivaut à environ 62 mph."
        },
        {
          "question": "Quelle est la différence entre un mile et un kilomètre ?",
          "answer": "Un mile est plus long : 1 mile = 1,60934 km, et 1 km = 0,621 miles. Le mile est utilisé principalement aux États-Unis et au Royaume-Uni pour les distances routières, tandis que le kilomètre est utilisé par la plupart des autres pays. Le km est une unité métrique (1 km = 1 000 m) tandis que le mile est une unité impériale (1 mi = 5 280 pi)."
        },
        {
          "question": "Un 5K fait-il 3 miles ?",
          "answer": "Un 5K fait un peu plus de 3 miles — exactement 3,107 miles (5 × 0,621371). À des fins pratiques, un 5K est communément décrit comme environ 3,1 miles."
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
      "name": "Kilometer zu Meilen Umrechner",
      "slug": "kilometer-zu-meilen-rechner",
      "subtitle": "Konvertieren Sie Kilometer sofort in Meilen — perfekt für Lauf-, Fahr- und Reiseentfernungen.",
      "breadcrumb": "Kilometer zu Meilen",
      "seo": {
        "title": "Kilometer zu Meilen Umrechner - Kostenloser Entfernungskonverter",
        "description": "Konvertieren Sie Kilometer sofort in Meilen. Ideal für Laufstrecken, Straßenfahrten und Geschwindigkeitskonvertierungen. Enthält Schnellreferenztabelle und häufige Entfernungen.",
        "shortDescription": "Konvertieren Sie Kilometer sofort in Meilen.",
        "keywords": [
          "km zu meilen",
          "kilometer zu meilen",
          "km zu mi umrechner",
          "kilometer in meilen umrechnen",
          "entfernungsrechner",
          "kostenloser km umrechner",
          "metrisch zu imperial entfernung"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Kilometer (km)",
          "helpText": "Geben Sie die Entfernung in Kilometern ein"
        }
      },
      "results": {
        "miles": {
          "label": "Meilen"
        },
        "meters": {
          "label": "Meter"
        },
        "feet": {
          "label": "Fuß"
        },
        "yards": {
          "label": "Yard"
        },
        "nauticalMiles": {
          "label": "Seemeilen"
        }
      },
      "presets": {
        "fiveK": {
          "label": "5K Lauf",
          "description": "5 Kilometer Laufrennen"
        },
        "tenK": {
          "label": "10K Lauf",
          "description": "10 Kilometer Laufrennen"
        },
        "marathon": {
          "label": "Marathon",
          "description": "42,195 km Vollmarathon"
        }
      },
      "values": {
        "mi": "mi",
        "m": "m",
        "ft": "ft",
        "yd": "yd",
        "nmi": "sm",
        "km": "km"
      },
      "formats": {
        "summary": "{km} km = {miles} Meilen"
      },
      "infoCards": {
        "results": {
          "title": "🛣️ Umrechnungsergebnisse",
          "items": [
            {
              "label": "Meilen",
              "valueKey": "miles"
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
              "label": "Yard",
              "valueKey": "yards"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Schnellreferenz",
          "items": [
            {
              "label": "1 km",
              "valueKey": "ref1"
            },
            {
              "label": "5 km (5K)",
              "valueKey": "ref5"
            },
            {
              "label": "10 km (10K)",
              "valueKey": "ref10"
            },
            {
              "label": "42,195 km (Marathon)",
              "valueKey": "refMarathon"
            }
          ]
        },
        "tips": {
          "title": "💡 Entfernungstipps",
          "items": [
            "Schnelle Schätzung: multiplizieren Sie km mit 0,6 um ungefähre Meilen zu erhalten (exakt: 0,621371).",
            "Oder teilen Sie km durch 1,6 — einfache Kopfrechnung für Autofahrten.",
            "5K = 3,1 mi, 10K = 6,2 mi, Halbmarathon = 13,1 mi, Marathon = 26,2 mi.",
            "Geschwindigkeit: 100 km/h ≈ 62 mph — häufiges europäisches Autobahntempolimit."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "So rechnen Sie Kilometer in Meilen um",
          "content": "Um Kilometer in Meilen umzurechnen, multiplizieren Sie den Kilometerwert mit 0,621371 (oder teilen durch 1,60934). Ein Kilometer entspricht etwa 0,621 Meilen oder etwa 5/8 einer Meile. Diese Umrechnung ist wichtig für Reisende, Läufer und jeden, der mit internationalen Entfernungsmessungen arbeitet. Der Kilometer ist die Standardeinheit für Entfernung in den meisten Ländern, während die Meile hauptsächlich in den USA, Großbritannien und einigen anderen Ländern für Straßenentfernungen verwendet wird."
        },
        "howItWorks": {
          "title": "Die Kilometer zu Meilen Formel",
          "content": "Die Umrechnungsformel lautet: Meilen = Kilometer × 0,621371. Dieser Faktor ergibt sich aus der exakten Definition: 1 Meile = 1.609,344 Meter exakt. Also 1 km = 1.000 / 1.609,344 = 0,621371 Meilen. Für eine schnelle mentale Annäherung multiplizieren Sie mit 5/8 oder 0,6. Zum Beispiel: 100 km × 0,6 = 60 Meilen (exakt: 62,14 Meilen). Ein anderer Trick: verwenden Sie Fibonacci-Zahlen — 3, 5, 8, 13, 21, 34 km entspricht etwa 2, 3, 5, 8, 13, 21 Meilen."
        },
        "considerations": {
          "title": "Häufige Kilometer zu Meilen Umrechnungen",
          "items": [
            {
              "text": "1 km = 0,6214 Meilen — etwas mehr als eine halbe Meile",
              "type": "info"
            },
            {
              "text": "1,609 km = 1 Meile exakt — der wichtige Referenzwert",
              "type": "info"
            },
            {
              "text": "100 km = 62,14 Meilen — typische europäische Autoreise-Einheit",
              "type": "info"
            },
            {
              "text": "100 km/h = 62,14 mph — häufiger Vergleich von Autobahntempolimits",
              "type": "info"
            },
            {
              "text": "1 Seemeile = 1,852 km — verwendet in der Luftfahrt und Seefahrt",
              "type": "info"
            },
            {
              "text": "Der Erdumfang ≈ 40.075 km = 24.901 Meilen",
              "type": "info"
            }
          ]
        },
        "runningDistances": {
          "title": "Laufrennen-Entfernungen",
          "items": [
            {
              "text": "1 Meile = 1,609 km — die klassische Leichtathletik-Distanz",
              "type": "info"
            },
            {
              "text": "5K = 5 km = 3,107 Meilen — beliebteste Anfänger-Renndistanz",
              "type": "info"
            },
            {
              "text": "10K = 10 km = 6,214 Meilen — beliebte Fortgeschrittenen-Renndistanz",
              "type": "info"
            },
            {
              "text": "Halbmarathon = 21,0975 km = 13,109 Meilen — wächst an Beliebtheit",
              "type": "info"
            },
            {
              "text": "Marathon = 42,195 km = 26,219 Meilen — das ikonische Langstreckenrennen",
              "type": "info"
            },
            {
              "text": "Ultramarathon = 50 km+ (31+ Meilen) — extreme Ausdauerrennen",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Kilometer zu Meilen Beispiele",
          "description": "Schritt-für-Schritt Entfernungsumrechnungen",
          "examples": [
            {
              "title": "10K Rennen in Meilen umrechnen",
              "steps": [
                "10 km × 0,621371 = 6,21371 Meilen",
                "Runden: 6,21 Meilen oder ~6,2 mi",
                "Durchschnittliche 10K Zeit: 50-70 Min",
                "Tempo: ~8-11 Min/Meile"
              ],
              "result": "10 km = 6,21 Meilen"
            },
            {
              "title": "Autofahrt: 500 km in Meilen",
              "steps": [
                "500 km × 0,621371 = 310,69 Meilen",
                "Bei 100 km/h (62 mph): ~5 Stunden",
                "Schnelle Schätzung: 500 × 0,6 = 300 mi",
                "Exakt: 310,7 Meilen"
              ],
              "result": "500 km = 310,7 Meilen (~5 Std Fahrt)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Meilen sind 1 km?",
          "answer": "1 Kilometer entspricht 0,621371 Meilen oder etwa 5/8 einer Meile. Für schnelle Kopfrechnung multiplizieren Sie km mit 0,6 für eine nahe Schätzung."
        },
        {
          "question": "Wie rechne ich km schnell in Meilen um?",
          "answer": "Der einfachste Kopfrechentrick: multiplizieren Sie km mit 0,6 oder teilen durch 1,6. Für bessere Genauigkeit multiplizieren Sie mit 5/8. Für das exakte Ergebnis multiplizieren Sie mit 0,621371."
        },
        {
          "question": "Wie viele km ist ein Marathon?",
          "answer": "Ein Vollmarathon ist exakt 42,195 Kilometer, was 26,219 Meilen entspricht (häufig auf 26,2 Meilen gerundet). Ein Halbmarathon ist 21,0975 km (13,1 Meilen)."
        },
        {
          "question": "Wie weit sind 100 km in Meilen?",
          "answer": "100 km = 62,14 Meilen. Das ist ein nützlicher Referenzpunkt: 100 km/h (ein häufiges Tempolimit in Europa) entspricht etwa 62 mph."
        },
        {
          "question": "Was ist der Unterschied zwischen einer Meile und einem Kilometer?",
          "answer": "Eine Meile ist länger: 1 Meile = 1,60934 km und 1 km = 0,621 Meilen. Die Meile wird hauptsächlich in den USA und Großbritannien für Straßenentfernungen verwendet, während der Kilometer von den meisten anderen Ländern verwendet wird. Der km ist eine metrische Einheit (1 km = 1.000 m), während die Meile eine imperiale Einheit ist (1 mi = 5.280 ft)."
        },
        {
          "question": "Sind 5K gleich 3 Meilen?",
          "answer": "Ein 5K ist etwas mehr als 3 Meilen — exakt 3,107 Meilen (5 × 0,621371). Praktisch wird ein 5K häufig als etwa 3,1 Meilen beschrieben."
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
      placeholder: "10",
      min: 0,
      unitType: "length_large",
      syncGroup: false,
      defaultUnit: "km",
    },
  ],

  inputGroups: [],

  results: [
    { id: "miles", type: "primary", format: "text" },
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
    { id: "runningDistances", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Special Publication 811 — Guide for the Use of SI", source: "NIST", url: "https://www.nist.gov/pml/special-publication-811" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "KM to Miles" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["miles-to-km", "length-converter", "mph-to-kmh"],
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

export function calculateKmToMiles(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Convert any input unit to km (base of length_large), then derive all
  const fromUnit = fieldUnits.amount || "km";
  const km = convertToBase(amount, fromUnit, "length_large");

  const miles = km * 0.621371;
  const meters = km * 1000;
  const feet = meters * 3.28084;
  const yards = feet / 3;
  const nauticalMiles = km / 1.852;

  // Quick reference
  const ref1 = 1 * 0.621371;
  const ref5 = 5 * 0.621371;
  const ref10 = 10 * 0.621371;
  const refMarathon = 42.195 * 0.621371;

  return {
    values: { miles, meters, feet, yards, nauticalMiles },
    formatted: {
      miles: `${fmtNum(miles)} mi`,
      meters: `${fmtNum(meters)} m`,
      feet: `${fmtNum(feet)} ft`,
      yards: `${fmtNum(yards)} yd`,
      nauticalMiles: `${fmtNum(nauticalMiles)} nmi`,
      ref1: `${fmtNum(ref1)} mi`,
      ref5: `${fmtNum(ref5)} mi`,
      ref10: `${fmtNum(ref10)} mi`,
      refMarathon: `${fmtNum(refMarathon)} mi`,
    },
    summary: `${fmtNum(km)} km = ${fmtNum(miles)} miles`,
    isValid: true,
  };
}

export default kmToMilesConverterConfig;
