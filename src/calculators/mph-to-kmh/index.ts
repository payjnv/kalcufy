import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const mphToKmhConverterConfig: CalculatorConfigV4 = {
  id: "mph-to-kmh",
  version: "4.0",
  category: "conversion",
  icon: "🚗",

  presets: [
    { id: "citySpeed", icon: "🏙️", values: { amount: 30 } },
    { id: "highwaySpeed", icon: "🛣️", values: { amount: 65 } },
    { id: "topSpeed", icon: "🏎️", values: { amount: 100 } },
  ],

  t: {
    en: {
      name: "MPH to KM/H Converter",
      slug: "mph-to-kmh",
      subtitle: "Convert miles per hour to kilometers per hour for speed comparisons, travel planning, and vehicle specs.",
      breadcrumb: "MPH to KM/H",

      seo: {
        title: "MPH to KM/H Converter - Free Speed Conversion Tool",
        description: "Convert miles per hour to kilometers per hour instantly. Essential for travel between US and metric countries, vehicle specifications, and speed limit comparisons.",
        shortDescription: "Convert mph to km/h for speed and driving.",
        keywords: ["mph to kmh", "miles per hour to kilometers", "speed converter", "mph to kph", "speed conversion", "driving speed converter", "velocity converter", "car speed calculator"],
      },

      calculator: { yourInformation: "Enter Speed" },
      ui: { yourInformation: "Enter Speed", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Speed", helpText: "Enter the speed to convert" },
      },

      results: {
        kmh: { label: "Kilometers per Hour" },
        mps: { label: "Meters per Second" },
        knots: { label: "Knots" },
        fps: { label: "Feet per Second" },
      },

      presets: {
        citySpeed: { label: "City Driving", description: "30 mph (~48 km/h)" },
        highwaySpeed: { label: "Highway Speed", description: "65 mph (~105 km/h)" },
        topSpeed: { label: "Top Speed", description: "100 mph (161 km/h)" },
      },

      values: { "km/h": "km/h", "mph": "mph", "m/s": "m/s", "kn": "kn", "ft/s": "ft/s" },

      formats: { summary: "{value} mph = {kmh} km/h" },

      infoCards: {
        results: {
          title: "Conversion Results",
          items: [
            { label: "Kilometers per Hour", valueKey: "kmh" },
            { label: "Meters per Second", valueKey: "mps" },
            { label: "Knots", valueKey: "knots" },
            { label: "Feet per Second", valueKey: "fps" },
          ],
        },
        speedLimits: {
          title: "US Speed Limits",
          items: [
            { label: "School Zone (25 mph)", valueKey: "ref25" },
            { label: "Two-Lane (55 mph)", valueKey: "ref55" },
            { label: "Interstate (70 mph)", valueKey: "ref70" },
            { label: "Texas Toll (85 mph)", valueKey: "ref85" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "Quick estimate: multiply mph by 1.6 for km/h",
            "US uses mph; most countries use km/h",
            "Speedometers often show both units",
            "Maritime and aviation use knots",
          ],
        },
      },

      education: {
        whatIs: {
          title: "Understanding MPH and KM/H",
          content: "Miles per hour (mph) and kilometers per hour (km/h) are units of speed measuring distance traveled per unit of time. The United States, United Kingdom, and a few other countries use mph for road signs and vehicle speedometers, while most of the world uses km/h. One mile equals exactly 1.609344 kilometers, so 1 mph = 1.609344 km/h.",
        },
        howItWorks: {
          title: "How the Conversion Works",
          content: "To convert mph to km/h, multiply by 1.609344. For example, 60 mph × 1.609344 = 96.56 km/h. For quick mental math, multiply by 1.6 and round. To convert km/h to mph, divide by 1.609344 (or multiply by 0.621371).",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "US, UK, and Myanmar are the only countries using mph for road signs", type: "info" },
            { text: "Most vehicles show both mph and km/h on speedometers", type: "info" },
            { text: "GPS devices can be set to display either unit", type: "info" },
            { text: "Aviation uses knots (nautical miles per hour) globally", type: "warning" },
            { text: "Weather reports may use different units by country", type: "info" },
            { text: "Car specifications may list top speed in both units", type: "info" },
          ],
        },
        commonSpeeds: {
          title: "Common Speed Conversions",
          items: [
            { text: "25 mph (school zone) = 40 km/h", type: "info" },
            { text: "35 mph (residential) = 56 km/h", type: "info" },
            { text: "55 mph (two-lane) = 89 km/h", type: "info" },
            { text: "65 mph (highway) = 105 km/h", type: "info" },
            { text: "70 mph (interstate) = 113 km/h", type: "info" },
            { text: "100 mph = 161 km/h", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Real-world scenarios",
          examples: [
            {
              title: "Rental Car in Europe",
              steps: ["Speed limit sign: 120 km/h", "Convert: 120 ÷ 1.609 = 74.6 mph", "This is similar to US interstate speeds"],
              result: "120 km/h ≈ 75 mph",
            },
            {
              title: "Vehicle Top Speed",
              steps: ["Car specs: 155 mph top speed", "Convert: 155 × 1.609 = 249.4 km/h", "Many luxury cars are limited to 250 km/h"],
              result: "155 mph = 249 km/h",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I convert mph to km/h?", answer: "Multiply the mph value by 1.609344. For example, 60 mph × 1.609344 = 96.56 km/h. For quick mental math, multiply by 1.6." },
        { question: "What countries use mph?", answer: "Only the United States, United Kingdom, and Myanmar use miles per hour for road speed limits. All other countries use km/h." },
        { question: "Why do some countries use mph and others km/h?", answer: "The US, UK, and former British colonies originally used miles. Most of the world adopted the metric system starting in the 1790s." },
        { question: "What is a knot?", answer: "A knot is one nautical mile per hour, equal to 1.151 mph or 1.852 km/h. It's used in maritime and aviation worldwide." },
        { question: "How fast is 100 km/h in mph?", answer: "100 km/h equals 62.14 mph. This is a common highway speed limit in many countries." },
        { question: "What's the fastest speed limit in the world?", answer: "Germany's Autobahn has sections with no limit. Among posted limits, Texas has 85 mph (137 km/h) sections." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de MPH a KM/H",
      "slug": "calculadora-convertidor-millas-por-hora-kilometros",
      "subtitle": "Convierte millas por hora a kilómetros por hora para comparaciones de velocidad, planificación de viajes y especificaciones de vehículos.",
      "breadcrumb": "MPH a KM/H",
      "seo": {
        "title": "Convertidor MPH a KM/H - Herramienta Gratuita de Conversión de Velocidad",
        "description": "Convierte millas por hora a kilómetros por hora al instante. Esencial para viajar entre países de EE.UU. y métricos, especificaciones de vehículos y comparaciones de límites de velocidad.",
        "shortDescription": "Convierte mph a km/h para velocidad y conducción.",
        "keywords": [
          "mph a kmh",
          "millas por hora a kilómetros",
          "convertidor de velocidad",
          "mph a kph",
          "conversión de velocidad",
          "convertidor velocidad conducción",
          "convertidor de velocidad",
          "calculadora velocidad coche"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Velocidad",
          "helpText": "Ingrese la velocidad a convertir"
        }
      },
      "results": {
        "kmh": {
          "label": "Kilómetros por Hora"
        },
        "mps": {
          "label": "Metros por Segundo"
        },
        "knots": {
          "label": "Nudos"
        },
        "fps": {
          "label": "Pies por Segundo"
        }
      },
      "presets": {
        "citySpeed": {
          "label": "Conducción Urbana",
          "description": "30 mph (~48 km/h)"
        },
        "highwaySpeed": {
          "label": "Velocidad de Autopista",
          "description": "65 mph (~105 km/h)"
        },
        "topSpeed": {
          "label": "Velocidad Máxima",
          "description": "100 mph (161 km/h)"
        }
      },
      "values": {
        "km/h": "km/h",
        "mph": "mph",
        "m/s": "m/s",
        "kn": "kn",
        "ft/s": "ft/s"
      },
      "formats": {
        "summary": "{value} mph = {kmh} km/h"
      },
      "infoCards": {
        "results": {
          "title": "Resultados de Conversión",
          "items": [
            {
              "label": "Kilómetros por Hora",
              "valueKey": "kmh"
            },
            {
              "label": "Metros por Segundo",
              "valueKey": "mps"
            },
            {
              "label": "Nudos",
              "valueKey": "knots"
            },
            {
              "label": "Pies por Segundo",
              "valueKey": "fps"
            }
          ]
        },
        "speedLimits": {
          "title": "Límites de Velocidad de EE.UU.",
          "items": [
            {
              "label": "Zona Escolar (25 mph)",
              "valueKey": "ref25"
            },
            {
              "label": "Carretera de Dos Carriles (55 mph)",
              "valueKey": "ref55"
            },
            {
              "label": "Interestatal (70 mph)",
              "valueKey": "ref70"
            },
            {
              "label": "Autopista de Texas (85 mph)",
              "valueKey": "ref85"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Conversión",
          "items": [
            "Estimación rápida: multiplica mph por 1.6 para km/h",
            "EE.UU. usa mph; la mayoría de países usan km/h",
            "Los velocímetros a menudo muestran ambas unidades",
            "Marítimo y aviación usan nudos"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Entendiendo MPH y KM/H",
          "content": "Millas por hora (mph) y kilómetros por hora (km/h) son unidades de velocidad que miden la distancia recorrida por unidad de tiempo. Estados Unidos, Reino Unido y algunos otros países usan mph para señales de tráfico y velocímetros de vehículos, mientras que la mayoría del mundo usa km/h. Una milla equivale exactamente a 1.609344 kilómetros, así que 1 mph = 1.609344 km/h."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Conversión",
          "content": "Para convertir mph a km/h, multiplica por 1.609344. Por ejemplo, 60 mph × 1.609344 = 96.56 km/h. Para cálculo mental rápido, multiplica por 1.6 y redondea. Para convertir km/h a mph, divide por 1.609344 (o multiplica por 0.621371)."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "EE.UU., Reino Unido y Myanmar son los únicos países que usan mph en señales de tráfico",
              "type": "info"
            },
            {
              "text": "La mayoría de vehículos muestran tanto mph como km/h en los velocímetros",
              "type": "info"
            },
            {
              "text": "Los dispositivos GPS pueden configurarse para mostrar cualquier unidad",
              "type": "info"
            },
            {
              "text": "La aviación usa nudos (millas náuticas por hora) globalmente",
              "type": "warning"
            },
            {
              "text": "Los reportes del clima pueden usar diferentes unidades por país",
              "type": "info"
            },
            {
              "text": "Las especificaciones de autos pueden listar velocidad máxima en ambas unidades",
              "type": "info"
            }
          ]
        },
        "commonSpeeds": {
          "title": "Conversiones de Velocidad Comunes",
          "items": [
            {
              "text": "25 mph (zona escolar) = 40 km/h",
              "type": "info"
            },
            {
              "text": "35 mph (residencial) = 56 km/h",
              "type": "info"
            },
            {
              "text": "55 mph (dos carriles) = 89 km/h",
              "type": "info"
            },
            {
              "text": "65 mph (autopista) = 105 km/h",
              "type": "info"
            },
            {
              "text": "70 mph (interestatal) = 113 km/h",
              "type": "info"
            },
            {
              "text": "100 mph = 161 km/h",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Conversión",
          "description": "Escenarios del mundo real",
          "examples": [
            {
              "title": "Auto Rentado en Europa",
              "steps": [
                "Señal de límite de velocidad: 120 km/h",
                "Convertir: 120 ÷ 1.609 = 74.6 mph",
                "Esto es similar a velocidades de interestatal de EE.UU."
              ],
              "result": "120 km/h ≈ 75 mph"
            },
            {
              "title": "Velocidad Máxima del Vehículo",
              "steps": [
                "Especificaciones del auto: velocidad máxima 155 mph",
                "Convertir: 155 × 1.609 = 249.4 km/h",
                "Muchos autos de lujo están limitados a 250 km/h"
              ],
              "result": "155 mph = 249 km/h"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cómo convierto mph a km/h?",
          "answer": "Multiplica el valor en mph por 1.609344. Por ejemplo, 60 mph × 1.609344 = 96.56 km/h. Para cálculo mental rápido, multiplica por 1.6."
        },
        {
          "question": "¿Qué países usan mph?",
          "answer": "Solo Estados Unidos, Reino Unido y Myanmar usan millas por hora para límites de velocidad en carreteras. Todos los otros países usan km/h."
        },
        {
          "question": "¿Por qué algunos países usan mph y otros km/h?",
          "answer": "EE.UU., Reino Unido y antiguas colonias británicas originalmente usaban millas. La mayoría del mundo adoptó el sistema métrico comenzando en 1790."
        },
        {
          "question": "¿Qué es un nudo?",
          "answer": "Un nudo es una milla náutica por hora, igual a 1.151 mph o 1.852 km/h. Se usa en marítimo y aviación mundialmente."
        },
        {
          "question": "¿Qué tan rápido son 100 km/h en mph?",
          "answer": "100 km/h equivale a 62.14 mph. Este es un límite de velocidad común en autopistas en muchos países."
        },
        {
          "question": "¿Cuál es el límite de velocidad más rápido del mundo?",
          "answer": "El Autobahn de Alemania tiene secciones sin límite. Entre los límites señalizados, Texas tiene secciones de 85 mph (137 km/h)."
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
      "name": "Conversor de MPH para KM/H",
      "slug": "calculadora-conversao-mph-kmh",
      "subtitle": "Converta milhas por hora para quilômetros por hora para comparações de velocidade, planejamento de viagens e especificações de veículos.",
      "breadcrumb": "MPH para KM/H",
      "seo": {
        "title": "Conversor MPH para KM/H - Ferramenta Gratuita de Conversão de Velocidade",
        "description": "Converta milhas por hora para quilômetros por hora instantaneamente. Essencial para viagens entre países que usam sistema imperial e métrico, especificações de veículos e comparações de limites de velocidade.",
        "shortDescription": "Converta mph para km/h para velocidade e condução.",
        "keywords": [
          "mph para kmh",
          "milhas por hora para quilômetros",
          "conversor de velocidade",
          "mph para kph",
          "conversão de velocidade",
          "conversor velocidade condução",
          "conversor velocidade",
          "calculadora velocidade carro"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Velocidade",
          "helpText": "Digite a velocidade para converter"
        }
      },
      "results": {
        "kmh": {
          "label": "Quilômetros por Hora"
        },
        "mps": {
          "label": "Metros por Segundo"
        },
        "knots": {
          "label": "Nós"
        },
        "fps": {
          "label": "Pés por Segundo"
        }
      },
      "presets": {
        "citySpeed": {
          "label": "Condução Urbana",
          "description": "30 mph (~48 km/h)"
        },
        "highwaySpeed": {
          "label": "Velocidade de Rodovia",
          "description": "65 mph (~105 km/h)"
        },
        "topSpeed": {
          "label": "Velocidade Máxima",
          "description": "100 mph (161 km/h)"
        }
      },
      "values": {
        "km/h": "km/h",
        "mph": "mph",
        "m/s": "m/s",
        "kn": "nós",
        "ft/s": "pés/s"
      },
      "formats": {
        "summary": "{value} mph = {kmh} km/h"
      },
      "infoCards": {
        "results": {
          "title": "Resultados da Conversão",
          "items": [
            {
              "label": "Quilômetros por Hora",
              "valueKey": "kmh"
            },
            {
              "label": "Metros por Segundo",
              "valueKey": "mps"
            },
            {
              "label": "Nós",
              "valueKey": "knots"
            },
            {
              "label": "Pés por Segundo",
              "valueKey": "fps"
            }
          ]
        },
        "speedLimits": {
          "title": "Limites de Velocidade dos EUA",
          "items": [
            {
              "label": "Zona Escolar (25 mph)",
              "valueKey": "ref25"
            },
            {
              "label": "Pista Dupla (55 mph)",
              "valueKey": "ref55"
            },
            {
              "label": "Interestadual (70 mph)",
              "valueKey": "ref70"
            },
            {
              "label": "Pedágio Texas (85 mph)",
              "valueKey": "ref85"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Conversão",
          "items": [
            "Estimativa rápida: multiplique mph por 1,6 para obter km/h",
            "EUA usam mph; a maioria dos países usa km/h",
            "Velocímetros frequentemente mostram ambas as unidades",
            "Navegação marítima e aviação usam nós"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Entendendo MPH e KM/H",
          "content": "Milhas por hora (mph) e quilômetros por hora (km/h) são unidades de velocidade que medem a distância percorrida por unidade de tempo. Os Estados Unidos, Reino Unido e alguns outros países usam mph para placas de trânsito e velocímetros de veículos, enquanto a maior parte do mundo usa km/h. Uma milha equivale exatamente a 1,609344 quilômetros, então 1 mph = 1,609344 km/h."
        },
        "howItWorks": {
          "title": "Como Funciona a Conversão",
          "content": "Para converter mph para km/h, multiplique por 1,609344. Por exemplo, 60 mph × 1,609344 = 96,56 km/h. Para cálculo mental rápido, multiplique por 1,6 e arredonde. Para converter km/h para mph, divida por 1,609344 (ou multiplique por 0,621371)."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "EUA, Reino Unido e Mianmar são os únicos países usando mph para placas de trânsito",
              "type": "info"
            },
            {
              "text": "A maioria dos veículos mostra tanto mph quanto km/h nos velocímetros",
              "type": "info"
            },
            {
              "text": "Dispositivos GPS podem ser configurados para exibir qualquer unidade",
              "type": "info"
            },
            {
              "text": "Aviação usa nós (milhas náuticas por hora) globalmente",
              "type": "warning"
            },
            {
              "text": "Relatórios meteorológicos podem usar diferentes unidades por país",
              "type": "info"
            },
            {
              "text": "Especificações de carros podem listar velocidade máxima em ambas as unidades",
              "type": "info"
            }
          ]
        },
        "commonSpeeds": {
          "title": "Conversões de Velocidade Comuns",
          "items": [
            {
              "text": "25 mph (zona escolar) = 40 km/h",
              "type": "info"
            },
            {
              "text": "35 mph (residencial) = 56 km/h",
              "type": "info"
            },
            {
              "text": "55 mph (pista dupla) = 89 km/h",
              "type": "info"
            },
            {
              "text": "65 mph (rodovia) = 105 km/h",
              "type": "info"
            },
            {
              "text": "70 mph (interestadual) = 113 km/h",
              "type": "info"
            },
            {
              "text": "100 mph = 161 km/h",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Conversão",
          "description": "Cenários do mundo real",
          "examples": [
            {
              "title": "Carro Alugado na Europa",
              "steps": [
                "Placa de limite de velocidade: 120 km/h",
                "Converter: 120 ÷ 1,609 = 74,6 mph",
                "Isto é similar às velocidades de interestaduais dos EUA"
              ],
              "result": "120 km/h ≈ 75 mph"
            },
            {
              "title": "Velocidade Máxima do Veículo",
              "steps": [
                "Especificações do carro: 155 mph velocidade máxima",
                "Converter: 155 × 1,609 = 249,4 km/h",
                "Muitos carros de luxo são limitados a 250 km/h"
              ],
              "result": "155 mph = 249 km/h"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Como converto mph para km/h?",
          "answer": "Multiplique o valor em mph por 1,609344. Por exemplo, 60 mph × 1,609344 = 96,56 km/h. Para cálculo mental rápido, multiplique por 1,6."
        },
        {
          "question": "Quais países usam mph?",
          "answer": "Apenas os Estados Unidos, Reino Unido e Mianmar usam milhas por hora para limites de velocidade nas estradas. Todos os outros países usam km/h."
        },
        {
          "question": "Por que alguns países usam mph e outros km/h?",
          "answer": "Os EUA, Reino Unido e ex-colônias britânicas originalmente usavam milhas. A maior parte do mundo adotou o sistema métrico começando na década de 1790."
        },
        {
          "question": "O que é um nó?",
          "answer": "Um nó é uma milha náutica por hora, igual a 1,151 mph ou 1,852 km/h. É usado na navegação marítima e aviação mundialmente."
        },
        {
          "question": "Qual a velocidade de 100 km/h em mph?",
          "answer": "100 km/h equivale a 62,14 mph. Esta é uma velocidade comum de limite de rodovia em muitos países."
        },
        {
          "question": "Qual é o limite de velocidade mais alto do mundo?",
          "answer": "A Autobahn da Alemanha tem seções sem limite. Entre limites estabelecidos, o Texas tem seções de 85 mph (137 km/h)."
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
      "name": "Convertisseur MPH en KM/H",
      "slug": "calculateur-mph-vers-kmh",
      "subtitle": "Convertissez les miles par heure en kilomètres par heure pour les comparaisons de vitesse, la planification de voyage et les spécifications de véhicules.",
      "breadcrumb": "MPH vers KM/H",
      "seo": {
        "title": "Convertisseur MPH en KM/H - Outil de Conversion de Vitesse Gratuit",
        "description": "Convertissez instantanément les miles par heure en kilomètres par heure. Essentiel pour voyager entre les pays utilisant le système américain et métrique, les spécifications de véhicules et les comparaisons de limitations de vitesse.",
        "shortDescription": "Convertissez mph en km/h pour la vitesse et la conduite.",
        "keywords": [
          "mph en kmh",
          "miles par heure en kilomètres",
          "convertisseur de vitesse",
          "mph en kph",
          "conversion de vitesse",
          "convertisseur vitesse conduite",
          "convertisseur vélocité",
          "calculateur vitesse voiture"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Vitesse",
          "helpText": "Entrez la vitesse à convertir"
        }
      },
      "results": {
        "kmh": {
          "label": "Kilomètres par Heure"
        },
        "mps": {
          "label": "Mètres par Seconde"
        },
        "knots": {
          "label": "Nœuds"
        },
        "fps": {
          "label": "Pieds par Seconde"
        }
      },
      "presets": {
        "citySpeed": {
          "label": "Conduite en Ville",
          "description": "30 mph (~48 km/h)"
        },
        "highwaySpeed": {
          "label": "Vitesse Autoroute",
          "description": "65 mph (~105 km/h)"
        },
        "topSpeed": {
          "label": "Vitesse Maximale",
          "description": "100 mph (161 km/h)"
        }
      },
      "values": {
        "km/h": "km/h",
        "mph": "mph",
        "m/s": "m/s",
        "kn": "nd",
        "ft/s": "pi/s"
      },
      "formats": {
        "summary": "{value} mph = {kmh} km/h"
      },
      "infoCards": {
        "results": {
          "title": "Résultats de Conversion",
          "items": [
            {
              "label": "Kilomètres par Heure",
              "valueKey": "kmh"
            },
            {
              "label": "Mètres par Seconde",
              "valueKey": "mps"
            },
            {
              "label": "Nœuds",
              "valueKey": "knots"
            },
            {
              "label": "Pieds par Seconde",
              "valueKey": "fps"
            }
          ]
        },
        "speedLimits": {
          "title": "Limitations de Vitesse US",
          "items": [
            {
              "label": "Zone Scolaire (25 mph)",
              "valueKey": "ref25"
            },
            {
              "label": "Route à Deux Voies (55 mph)",
              "valueKey": "ref55"
            },
            {
              "label": "Interstate (70 mph)",
              "valueKey": "ref70"
            },
            {
              "label": "Autoroute à Péage Texas (85 mph)",
              "valueKey": "ref85"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Conversion",
          "items": [
            "Estimation rapide : multipliez mph par 1,6 pour km/h",
            "Les US utilisent mph ; la plupart des pays utilisent km/h",
            "Les compteurs de vitesse affichent souvent les deux unités",
            "Le maritime et l'aviation utilisent les nœuds"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comprendre MPH et KM/H",
          "content": "Les miles par heure (mph) et kilomètres par heure (km/h) sont des unités de vitesse mesurant la distance parcourue par unité de temps. Les États-Unis, le Royaume-Uni et quelques autres pays utilisent mph pour les panneaux routiers et les compteurs de vitesse des véhicules, tandis que la plupart du monde utilise km/h. Un mile équivaut exactement à 1,609344 kilomètres, donc 1 mph = 1,609344 km/h."
        },
        "howItWorks": {
          "title": "Comment Fonctionne la Conversion",
          "content": "Pour convertir mph en km/h, multipliez par 1,609344. Par exemple, 60 mph × 1,609344 = 96,56 km/h. Pour un calcul mental rapide, multipliez par 1,6 et arrondissez. Pour convertir km/h en mph, divisez par 1,609344 (ou multipliez par 0,621371)."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "Les US, UK et Myanmar sont les seuls pays utilisant mph pour les panneaux routiers",
              "type": "info"
            },
            {
              "text": "La plupart des véhicules affichent mph et km/h sur les compteurs de vitesse",
              "type": "info"
            },
            {
              "text": "Les appareils GPS peuvent être réglés pour afficher l'une ou l'autre unité",
              "type": "info"
            },
            {
              "text": "L'aviation utilise les nœuds (miles nautiques par heure) mondialement",
              "type": "warning"
            },
            {
              "text": "Les bulletins météo peuvent utiliser différentes unités selon le pays",
              "type": "info"
            },
            {
              "text": "Les spécifications automobiles peuvent lister la vitesse max dans les deux unités",
              "type": "info"
            }
          ]
        },
        "commonSpeeds": {
          "title": "Conversions de Vitesse Courantes",
          "items": [
            {
              "text": "25 mph (zone scolaire) = 40 km/h",
              "type": "info"
            },
            {
              "text": "35 mph (résidentiel) = 56 km/h",
              "type": "info"
            },
            {
              "text": "55 mph (deux voies) = 89 km/h",
              "type": "info"
            },
            {
              "text": "65 mph (autoroute) = 105 km/h",
              "type": "info"
            },
            {
              "text": "70 mph (interstate) = 113 km/h",
              "type": "info"
            },
            {
              "text": "100 mph = 161 km/h",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Conversion",
          "description": "Scénarios du monde réel",
          "examples": [
            {
              "title": "Voiture de Location en Europe",
              "steps": [
                "Panneau de limitation : 120 km/h",
                "Conversion : 120 ÷ 1,609 = 74,6 mph",
                "Ceci est similaire aux vitesses d'interstate US"
              ],
              "result": "120 km/h ≈ 75 mph"
            },
            {
              "title": "Vitesse Maximale du Véhicule",
              "steps": [
                "Spéc. voiture : vitesse max 155 mph",
                "Conversion : 155 × 1,609 = 249,4 km/h",
                "Beaucoup de voitures de luxe sont limitées à 250 km/h"
              ],
              "result": "155 mph = 249 km/h"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Comment convertir mph en km/h ?",
          "answer": "Multipliez la valeur en mph par 1,609344. Par exemple, 60 mph × 1,609344 = 96,56 km/h. Pour un calcul mental rapide, multipliez par 1,6."
        },
        {
          "question": "Quels pays utilisent mph ?",
          "answer": "Seuls les États-Unis, le Royaume-Uni et le Myanmar utilisent les miles par heure pour les limitations de vitesse routières. Tous les autres pays utilisent km/h."
        },
        {
          "question": "Pourquoi certains pays utilisent mph et d'autres km/h ?",
          "answer": "Les US, UK et anciennes colonies britanniques utilisaient originellement les miles. La plupart du monde a adopté le système métrique à partir des années 1790."
        },
        {
          "question": "Qu'est-ce qu'un nœud ?",
          "answer": "Un nœud est un mile nautique par heure, égal à 1,151 mph ou 1,852 km/h. Il est utilisé dans le maritime et l'aviation mondialement."
        },
        {
          "question": "Quelle est la vitesse de 100 km/h en mph ?",
          "answer": "100 km/h équivaut à 62,14 mph. C'est une limitation de vitesse d'autoroute commune dans beaucoup de pays."
        },
        {
          "question": "Quelle est la limitation de vitesse la plus rapide au monde ?",
          "answer": "L'Autobahn allemande a des sections sans limite. Parmi les limites affichées, le Texas a des sections à 85 mph (137 km/h)."
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
      "name": "Meilen pro Stunde zu Kilometer pro Stunde Umrechner",
      "slug": "meilen-pro-stunde-zu-kilometer-pro-stunde-rechner",
      "subtitle": "Wandeln Sie Meilen pro Stunde in Kilometer pro Stunde um für Geschwindigkeitsvergleiche, Reiseplanung und Fahrzeugspezifikationen.",
      "breadcrumb": "MPH zu KM/H",
      "seo": {
        "title": "MPH zu KM/H Umrechner - Kostenloses Geschwindigkeits-Umrechnungstool",
        "description": "Wandeln Sie Meilen pro Stunde sofort in Kilometer pro Stunde um. Unverzichtbar für Reisen zwischen den USA und metrischen Ländern, Fahrzeugspezifikationen und Geschwindigkeitsbegrenzungsvergleiche.",
        "shortDescription": "Wandeln Sie mph in km/h für Geschwindigkeit und Fahren um.",
        "keywords": [
          "mph zu kmh",
          "meilen pro stunde zu kilometer",
          "geschwindigkeitsumrechner",
          "mph zu kph",
          "geschwindigkeitsumrechnung",
          "fahrgeschwindigkeitsumrechner",
          "geschwindigkeitsrechner",
          "auto geschwindigkeitsrechner"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Geschwindigkeit",
          "helpText": "Geben Sie die umzurechnende Geschwindigkeit ein"
        }
      },
      "results": {
        "kmh": {
          "label": "Kilometer pro Stunde"
        },
        "mps": {
          "label": "Meter pro Sekunde"
        },
        "knots": {
          "label": "Knoten"
        },
        "fps": {
          "label": "Fuß pro Sekunde"
        }
      },
      "presets": {
        "citySpeed": {
          "label": "Stadtverkehr",
          "description": "30 mph (~48 km/h)"
        },
        "highwaySpeed": {
          "label": "Autobahngeschwindigkeit",
          "description": "65 mph (~105 km/h)"
        },
        "topSpeed": {
          "label": "Höchstgeschwindigkeit",
          "description": "100 mph (161 km/h)"
        }
      },
      "values": {
        "km/h": "km/h",
        "mph": "mph",
        "m/s": "m/s",
        "kn": "kn",
        "ft/s": "ft/s"
      },
      "formats": {
        "summary": "{value} mph = {kmh} km/h"
      },
      "infoCards": {
        "results": {
          "title": "Umrechnungsergebnisse",
          "items": [
            {
              "label": "Kilometer pro Stunde",
              "valueKey": "kmh"
            },
            {
              "label": "Meter pro Sekunde",
              "valueKey": "mps"
            },
            {
              "label": "Knoten",
              "valueKey": "knots"
            },
            {
              "label": "Fuß pro Sekunde",
              "valueKey": "fps"
            }
          ]
        },
        "speedLimits": {
          "title": "US Geschwindigkeitsbegrenzungen",
          "items": [
            {
              "label": "Schulzone (25 mph)",
              "valueKey": "ref25"
            },
            {
              "label": "Zweispurig (55 mph)",
              "valueKey": "ref55"
            },
            {
              "label": "Autobahn (70 mph)",
              "valueKey": "ref70"
            },
            {
              "label": "Texas Mautstraße (85 mph)",
              "valueKey": "ref85"
            }
          ]
        },
        "tips": {
          "title": "Umrechnungstipps",
          "items": [
            "Schnelle Schätzung: mph mit 1,6 für km/h multiplizieren",
            "USA verwendet mph; die meisten Länder verwenden km/h",
            "Tachometer zeigen oft beide Einheiten",
            "Seefahrt und Luftfahrt verwenden Knoten"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "MPH und KM/H verstehen",
          "content": "Meilen pro Stunde (mph) und Kilometer pro Stunde (km/h) sind Geschwindigkeitseinheiten, die die zurückgelegte Strecke pro Zeiteinheit messen. Die Vereinigten Staaten, das Vereinigte Königreich und einige andere Länder verwenden mph für Straßenschilder und Fahrzeugtachometer, während der Großteil der Welt km/h verwendet. Eine Meile entspricht exakt 1,609344 Kilometern, also 1 mph = 1,609344 km/h."
        },
        "howItWorks": {
          "title": "Wie die Umrechnung funktioniert",
          "content": "Um mph in km/h umzurechnen, multiplizieren Sie mit 1,609344. Zum Beispiel: 60 mph × 1,609344 = 96,56 km/h. Für schnelles Kopfrechnen multiplizieren Sie mit 1,6 und runden. Um km/h in mph umzurechnen, teilen Sie durch 1,609344 (oder multiplizieren mit 0,621371)."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "USA, UK und Myanmar sind die einzigen Länder mit mph auf Straßenschildern",
              "type": "info"
            },
            {
              "text": "Die meisten Fahrzeuge zeigen sowohl mph als auch km/h auf Tachometern",
              "type": "info"
            },
            {
              "text": "GPS-Geräte können auf beide Einheiten eingestellt werden",
              "type": "info"
            },
            {
              "text": "Die Luftfahrt verwendet weltweit Knoten (Seemeilen pro Stunde)",
              "type": "warning"
            },
            {
              "text": "Wetterberichte können je nach Land verschiedene Einheiten verwenden",
              "type": "info"
            },
            {
              "text": "Fahrzeugspezifikationen können Höchstgeschwindigkeit in beiden Einheiten angeben",
              "type": "info"
            }
          ]
        },
        "commonSpeeds": {
          "title": "Häufige Geschwindigkeitsumrechnungen",
          "items": [
            {
              "text": "25 mph (Schulzone) = 40 km/h",
              "type": "info"
            },
            {
              "text": "35 mph (Wohngebiet) = 56 km/h",
              "type": "info"
            },
            {
              "text": "55 mph (zweispurig) = 89 km/h",
              "type": "info"
            },
            {
              "text": "65 mph (Autobahn) = 105 km/h",
              "type": "info"
            },
            {
              "text": "70 mph (Interstate) = 113 km/h",
              "type": "info"
            },
            {
              "text": "100 mph = 161 km/h",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Realitätsnahe Szenarien",
          "examples": [
            {
              "title": "Mietwagen in Europa",
              "steps": [
                "Geschwindigkeitsschild: 120 km/h",
                "Umrechnung: 120 ÷ 1,609 = 74,6 mph",
                "Dies entspricht US-Interstate-Geschwindigkeiten"
              ],
              "result": "120 km/h ≈ 75 mph"
            },
            {
              "title": "Fahrzeug-Höchstgeschwindigkeit",
              "steps": [
                "Auto-Spezifikation: 155 mph Höchstgeschwindigkeit",
                "Umrechnung: 155 × 1,609 = 249,4 km/h",
                "Viele Luxusautos sind auf 250 km/h begrenzt"
              ],
              "result": "155 mph = 249 km/h"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie rechne ich mph in km/h um?",
          "answer": "Multiplizieren Sie den mph-Wert mit 1,609344. Zum Beispiel: 60 mph × 1,609344 = 96,56 km/h. Für schnelles Kopfrechnen multiplizieren Sie mit 1,6."
        },
        {
          "question": "Welche Länder verwenden mph?",
          "answer": "Nur die Vereinigten Staaten, das Vereinigte Königreich und Myanmar verwenden Meilen pro Stunde für Straßengeschwindigkeitsbegrenzungen. Alle anderen Länder verwenden km/h."
        },
        {
          "question": "Warum verwenden manche Länder mph und andere km/h?",
          "answer": "Die USA, UK und ehemalige britische Kolonien verwendeten ursprünglich Meilen. Der Großteil der Welt übernahm das metrische System ab den 1790er Jahren."
        },
        {
          "question": "Was ist ein Knoten?",
          "answer": "Ein Knoten ist eine Seemeile pro Stunde, entspricht 1,151 mph oder 1,852 km/h. Es wird weltweit in der Seefahrt und Luftfahrt verwendet."
        },
        {
          "question": "Wie schnell sind 100 km/h in mph?",
          "answer": "100 km/h entsprechen 62,14 mph. Dies ist eine häufige Autobahngeschwindigkeitsbegrenzung in vielen Ländern."
        },
        {
          "question": "Was ist die schnellste Geschwindigkeitsbegrenzung der Welt?",
          "answer": "Deutschlands Autobahn hat Abschnitte ohne Begrenzung. Bei ausgeschilderten Begrenzungen hat Texas Abschnitte mit 85 mph (137 km/h)."
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
      defaultValue: 60,
      placeholder: "60",
      min: 0,
      step: 1,
      unitType: "speed",
      syncGroup: false,
      defaultUnit: "mph",
      allowedUnits: ["mph", "kmh", "ms", "knots", "fts"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "kmh", type: "primary", format: "number" },
    { id: "mps", type: "secondary", format: "number" },
    { id: "knots", type: "secondary", format: "number" },
    { id: "fps", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "📊", itemCount: 4 },
    { id: "speedLimits", type: "list", icon: "🚦", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "commonSpeeds", type: "list", icon: "🚗", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "NIST", year: "2024", title: "Units of Measurement - Speed", source: "National Institute of Standards and Technology", url: "https://www.nist.gov/pml/owm/metric-si/unit-conversion" },
    { authors: "BIPM", year: "2023", title: "SI Brochure: The International System of Units", source: "International Bureau of Weights and Measures", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Speed Converter", title: "MPH to KM/H" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["gallons-to-liters", "cups-to-ml", "square-feet-to-square-meters"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.01) return val.toExponential(2);
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function calculateMphToKmh(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "mph";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Conversion factors to m/s (base) - from registry.ts SPEED
  const toMs: Record<string, number> = {
    "mph": 0.44704,
    "kmh": 0.277778,
    "ms": 1,
    "knots": 0.514444,
    "fts": 0.3048,
  };

  const factor = toMs[fromUnit] || 0.44704;
  const mps = amount * factor;
  const kmh = mps / 0.277778;
  const knots = mps / 0.514444;
  const fps = mps / 0.3048;

  // Reference values (from mph)
  const ref25 = 25 * 1.609344;
  const ref55 = 55 * 1.609344;
  const ref70 = 70 * 1.609344;
  const ref85 = 85 * 1.609344;

  const kmhUnit = v["km/h"] || "km/h";
  const mpsUnit = v["m/s"] || "m/s";
  const knUnit = v["kn"] || "kn";
  const fpsUnit = v["ft/s"] || "ft/s";

  return {
    values: { kmh, mps, knots, fps, ref25, ref55, ref70, ref85 },
    formatted: {
      kmh: `${fmtNum(kmh)} ${kmhUnit}`,
      mps: `${fmtNum(mps)} ${mpsUnit}`,
      knots: `${fmtNum(knots)} ${knUnit}`,
      fps: `${fmtNum(fps)} ${fpsUnit}`,
      ref25: `${fmtNum(ref25)} ${kmhUnit}`,
      ref55: `${fmtNum(ref55)} ${kmhUnit}`,
      ref70: `${fmtNum(ref70)} ${kmhUnit}`,
      ref85: `${fmtNum(ref85)} ${kmhUnit}`,
    },
    summary: `${fmtNum(amount)} mph = ${fmtNum(kmh)} ${kmhUnit}`,
    isValid: true,
  };
}

export default mphToKmhConverterConfig;
