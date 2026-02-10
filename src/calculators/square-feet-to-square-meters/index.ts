import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const squareFeetToSquareMetersConverterConfig: CalculatorConfigV4 = {
  id: "square-feet-to-square-meters",
  version: "4.0",
  category: "conversion",
  icon: "📐",

  presets: [
    { id: "bedroom", icon: "🛏️", values: { amount: 150 } },
    { id: "apartment", icon: "🏠", values: { amount: 1000 } },
    { id: "house", icon: "🏡", values: { amount: 2500 } },
  ],

  t: {
    en: {
      name: "Square Feet to Square Meters Converter",
      slug: "square-feet-to-square-meters",
      subtitle: "Convert square feet to square meters for real estate, construction, and floor planning.",
      breadcrumb: "Sq Ft to Sq M",

      seo: {
        title: "Square Feet to Square Meters Converter - Free Area Tool",
        description: "Convert square feet to square meters instantly for real estate, construction, and interior design. Includes acres, hectares, and square yards.",
        shortDescription: "Convert sq ft to sq m for real estate.",
        keywords: ["square feet to square meters", "sq ft to sq m", "area converter", "floor area calculator", "real estate converter", "construction calculator", "sqft to m2", "feet squared to meters squared"],
      },

      calculator: { yourInformation: "Enter Area" },
      ui: { yourInformation: "Enter Area", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Area", helpText: "Enter the area to convert" },
      },

      results: {
        squareMeters: { label: "Square Meters" },
        squareYards: { label: "Square Yards" },
        acres: { label: "Acres" },
      },

      presets: {
        bedroom: { label: "Bedroom", description: "150 sq ft (~14 m²)" },
        apartment: { label: "Apartment", description: "1,000 sq ft (~93 m²)" },
        house: { label: "House", description: "2,500 sq ft (~232 m²)" },
      },

      values: { "m²": "m²", "ft²": "ft²", "yd²": "yd²", "acres": "acres", "hectares": "hectares", "cm²": "cm²", "in²": "in²" },

      formats: { summary: "{value} ft² = {sqm} m²" },

      infoCards: {
        results: {
          title: "Conversion Results",
          items: [
            { label: "Square Meters", valueKey: "squareMeters" },
            { label: "Square Yards", valueKey: "squareYards" },
            { label: "Acres", valueKey: "acres" },
            { label: "Hectares", valueKey: "hectares" },
          ],
        },
        reference: {
          title: "Quick Reference",
          items: [
            { label: "100 sq ft", valueKey: "ref100" },
            { label: "500 sq ft", valueKey: "ref500" },
            { label: "1,000 sq ft", valueKey: "ref1000" },
            { label: "1 acre", valueKey: "ref1acre" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "1 sq ft = 0.0929 m² (divide by ~10.764 to convert)",
            "1 sq m = 10.764 sq ft (multiply by ~10.76)",
            "1 acre = 43,560 sq ft = 4,047 m²",
            "1 hectare = 10,000 m² = 2.471 acres",
          ],
        },
      },

      education: {
        whatIs: {
          title: "Understanding Square Feet and Square Meters",
          content: "Square feet and square meters are units of area used to measure two-dimensional spaces like floors, rooms, and land. Square feet (ft²) is the standard in the United States, United Kingdom, and Canada for real estate. Square meters (m²) is used throughout most of the world and is part of the metric system. Converting between them is essential for international property listings, construction projects, and interior design.",
        },
        howItWorks: {
          title: "How the Conversion Works",
          content: "Since 1 foot = 0.3048 meters exactly, 1 square foot = 0.3048² = 0.092903 square meters. To convert square feet to square meters, multiply by 0.092903. To convert square meters to square feet, multiply by 10.7639. These conversion factors are exact by international agreement since 1959.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "1 square foot = 0.092903 square meters exactly", type: "info" },
            { text: "1 square meter = 10.7639 square feet", type: "info" },
            { text: "Real estate in US/UK uses sq ft; most other countries use m²", type: "info" },
            { text: "Apartment sizes in Asia are often listed in 'ping' (Taiwan) or 'pyeong' (Korea)", type: "warning" },
            { text: "Commercial real estate may use different measurement standards", type: "warning" },
            { text: "Always verify which measurement method was used for listed areas", type: "info" },
          ],
        },
        commonAreas: {
          title: "Common Area References",
          items: [
            { text: "Parking space: ~150 sq ft (14 m²)", type: "info" },
            { text: "Small bedroom: 100-150 sq ft (9-14 m²)", type: "info" },
            { text: "Master bedroom: 200-350 sq ft (19-33 m²)", type: "info" },
            { text: "1-bedroom apartment: 600-800 sq ft (56-74 m²)", type: "info" },
            { text: "Average US home: 2,300 sq ft (214 m²)", type: "info" },
            { text: "Tennis court: 2,808 sq ft (261 m²)", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Real estate scenarios",
          examples: [
            {
              title: "Apartment Listing",
              steps: ["US listing: 850 sq ft apartment", "Convert: 850 × 0.0929 = 78.97 m²", "This is a typical 1-2 bedroom size"],
              result: "850 sq ft = 79 m²",
            },
            {
              title: "Land Plot",
              steps: ["Land area: 0.5 acres", "Convert to sq ft: 0.5 × 43,560 = 21,780 sq ft", "Convert to m²: 21,780 × 0.0929 = 2,023 m²"],
              result: "0.5 acres = 2,023 m²",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I convert square feet to square meters?", answer: "Multiply square feet by 0.092903 to get square meters. For quick mental math, divide by 10.76 or roughly divide by 11 for an estimate. Example: 1,000 sq ft ÷ 10.76 = 93 m²." },
        { question: "How many square feet in a square meter?", answer: "There are 10.7639 square feet in one square meter. So a 100 m² apartment equals 1,076 sq ft." },
        { question: "What's the average apartment size in square meters?", answer: "This varies by country: US averages 80-90 m² (850-970 sq ft), UK averages 67 m² (720 sq ft), Hong Kong averages 40 m² (430 sq ft), and Australia averages 90 m² (970 sq ft)." },
        { question: "How do I convert acres to square meters?", answer: "1 acre = 4,046.86 square meters = 43,560 square feet. To convert acres to m², multiply by 4,047. Example: 2 acres × 4,047 = 8,094 m²." },
        { question: "What is a hectare?", answer: "A hectare is 10,000 square meters (100m × 100m), which equals 2.471 acres or 107,639 square feet. It's commonly used for measuring large land areas outside the US." },
        { question: "Why do some countries use square feet and others square meters?", answer: "Countries that were part of the British Empire (US, UK, Canada, India) traditionally use square feet. Most other countries adopted the metric system and use square meters. Even the UK now commonly uses both." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de Pies Cuadrados a Metros Cuadrados",
      "slug": "calculadora-pies-cuadrados-metros-cuadrados",
      "subtitle": "Convierte pies cuadrados a metros cuadrados para bienes raíces, construcción y planificación de espacios.",
      "breadcrumb": "Pies² a m²",
      "seo": {
        "title": "Convertidor de Pies Cuadrados a Metros Cuadrados - Herramienta Gratuita",
        "description": "Convierte pies cuadrados a metros cuadrados instantáneamente para bienes raíces, construcción y diseño interior. Incluye acres, hectáreas y yardas cuadradas.",
        "shortDescription": "Convierte pies² a m² para bienes raíces.",
        "keywords": [
          "pies cuadrados a metros cuadrados",
          "ft² a m²",
          "convertidor de área",
          "calculadora área suelo",
          "convertidor bienes raíces",
          "calculadora construcción",
          "pies² a m²",
          "pies cuadrados a metros cuadrados"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Área",
          "helpText": "Ingresa el área a convertir"
        }
      },
      "results": {
        "squareMeters": {
          "label": "Metros Cuadrados"
        },
        "squareYards": {
          "label": "Yardas Cuadradas"
        },
        "acres": {
          "label": "Acres"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Dormitorio",
          "description": "150 pies² (~14 m²)"
        },
        "apartment": {
          "label": "Apartamento",
          "description": "1,000 pies² (~93 m²)"
        },
        "house": {
          "label": "Casa",
          "description": "2,500 pies² (~232 m²)"
        }
      },
      "values": {
        "m²": "m²",
        "ft²": "pies²",
        "yd²": "yd²",
        "acres": "acres",
        "hectares": "hectáreas",
        "cm²": "cm²",
        "in²": "pulg²"
      },
      "formats": {
        "summary": "{value} pies² = {sqm} m²"
      },
      "infoCards": {
        "results": {
          "title": "Resultados de Conversión",
          "items": [
            {
              "label": "Metros Cuadrados",
              "valueKey": "squareMeters"
            },
            {
              "label": "Yardas Cuadradas",
              "valueKey": "squareYards"
            },
            {
              "label": "Acres",
              "valueKey": "acres"
            },
            {
              "label": "Hectáreas",
              "valueKey": "hectares"
            }
          ]
        },
        "reference": {
          "title": "Referencia Rápida",
          "items": [
            {
              "label": "100 pies²",
              "valueKey": "ref100"
            },
            {
              "label": "500 pies²",
              "valueKey": "ref500"
            },
            {
              "label": "1,000 pies²",
              "valueKey": "ref1000"
            },
            {
              "label": "1 acre",
              "valueKey": "ref1acre"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Conversión",
          "items": [
            "1 pie² = 0.0929 m² (divide entre ~10.764 para convertir)",
            "1 m² = 10.764 pies² (multiplica por ~10.76)",
            "1 acre = 43,560 pies² = 4,047 m²",
            "1 hectárea = 10,000 m² = 2.471 acres"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Entendiendo Pies Cuadrados y Metros Cuadrados",
          "content": "Los pies cuadrados y metros cuadrados son unidades de área utilizadas para medir espacios bidimensionales como pisos, habitaciones y terrenos. Los pies cuadrados (pies²) son el estándar en Estados Unidos, Reino Unido y Canadá para bienes raíces. Los metros cuadrados (m²) se usan en la mayoría del mundo y son parte del sistema métrico. La conversión entre ellos es esencial para listados de propiedades internacionales, proyectos de construcción y diseño interior."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Conversión",
          "content": "Dado que 1 pie = 0.3048 metros exactamente, 1 pie cuadrado = 0.3048² = 0.092903 metros cuadrados. Para convertir pies cuadrados a metros cuadrados, multiplica por 0.092903. Para convertir metros cuadrados a pies cuadrados, multiplica por 10.7639. Estos factores de conversión son exactos por acuerdo internacional desde 1959."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "1 pie cuadrado = 0.092903 metros cuadrados exactamente",
              "type": "info"
            },
            {
              "text": "1 metro cuadrado = 10.7639 pies cuadrados",
              "type": "info"
            },
            {
              "text": "Bienes raíces en EE.UU./Reino Unido usan pies²; la mayoría de otros países usan m²",
              "type": "info"
            },
            {
              "text": "Tamaños de apartamentos en Asia a menudo se listan en 'ping' (Taiwán) o 'pyeong' (Corea)",
              "type": "warning"
            },
            {
              "text": "Bienes raíces comerciales pueden usar diferentes estándares de medición",
              "type": "warning"
            },
            {
              "text": "Siempre verifica qué método de medición se usó para las áreas listadas",
              "type": "info"
            }
          ]
        },
        "commonAreas": {
          "title": "Referencias de Áreas Comunes",
          "items": [
            {
              "text": "Espacio de estacionamiento: ~150 pies² (14 m²)",
              "type": "info"
            },
            {
              "text": "Dormitorio pequeño: 100-150 pies² (9-14 m²)",
              "type": "info"
            },
            {
              "text": "Dormitorio principal: 200-350 pies² (19-33 m²)",
              "type": "info"
            },
            {
              "text": "Apartamento de 1 dormitorio: 600-800 pies² (56-74 m²)",
              "type": "info"
            },
            {
              "text": "Casa promedio en EE.UU.: 2,300 pies² (214 m²)",
              "type": "info"
            },
            {
              "text": "Cancha de tenis: 2,808 pies² (261 m²)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Conversión",
          "description": "Escenarios de bienes raíces",
          "examples": [
            {
              "title": "Listado de Apartamento",
              "steps": [
                "Listado en EE.UU.: apartamento de 850 pies²",
                "Convertir: 850 × 0.0929 = 78.97 m²",
                "Este es un tamaño típico de 1-2 dormitorios"
              ],
              "result": "850 pies² = 79 m²"
            },
            {
              "title": "Parcela de Terreno",
              "steps": [
                "Área del terreno: 0.5 acres",
                "Convertir a pies²: 0.5 × 43,560 = 21,780 pies²",
                "Convertir a m²: 21,780 × 0.0929 = 2,023 m²"
              ],
              "result": "0.5 acres = 2,023 m²"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cómo convierto pies cuadrados a metros cuadrados?",
          "answer": "Multiplica los pies cuadrados por 0.092903 para obtener metros cuadrados. Para cálculo mental rápido, divide entre 10.76 o aproximadamente entre 11 para una estimación. Ejemplo: 1,000 pies² ÷ 10.76 = 93 m²."
        },
        {
          "question": "¿Cuántos pies cuadrados hay en un metro cuadrado?",
          "answer": "Hay 10.7639 pies cuadrados en un metro cuadrado. Así que un apartamento de 100 m² equivale a 1,076 pies²."
        },
        {
          "question": "¿Cuál es el tamaño promedio de apartamento en metros cuadrados?",
          "answer": "Esto varía por país: EE.UU. promedia 80-90 m² (850-970 pies²), Reino Unido promedia 67 m² (720 pies²), Hong Kong promedia 40 m² (430 pies²), y Australia promedia 90 m² (970 pies²)."
        },
        {
          "question": "¿Cómo convierto acres a metros cuadrados?",
          "answer": "1 acre = 4,046.86 metros cuadrados = 43,560 pies cuadrados. Para convertir acres a m², multiplica por 4,047. Ejemplo: 2 acres × 4,047 = 8,094 m²."
        },
        {
          "question": "¿Qué es una hectárea?",
          "answer": "Una hectárea es 10,000 metros cuadrados (100m × 100m), que equivale a 2.471 acres o 107,639 pies cuadrados. Se usa comúnmente para medir grandes áreas de terreno fuera de EE.UU."
        },
        {
          "question": "¿Por qué algunos países usan pies cuadrados y otros metros cuadrados?",
          "answer": "Los países que fueron parte del Imperio Británico (EE.UU., Reino Unido, Canadá, India) tradicionalmente usan pies cuadrados. La mayoría de otros países adoptaron el sistema métrico y usan metros cuadrados. Incluso el Reino Unido ahora comúnmente usa ambos."
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
      "name": "Conversor de Pés Quadrados para Metros Quadrados",
      "slug": "calculadora-pes-quadrados-para-metros-quadrados",
      "subtitle": "Converta pés quadrados para metros quadrados para imóveis, construção e planejamento de pisos.",
      "breadcrumb": "Pés² para m²",
      "seo": {
        "title": "Conversor de Pés Quadrados para Metros Quadrados - Ferramenta de Área Gratuita",
        "description": "Converta pés quadrados para metros quadrados instantaneamente para imóveis, construção e design de interiores. Inclui acres, hectares e jardas quadradas.",
        "shortDescription": "Converta pés² para m² para imóveis.",
        "keywords": [
          "pés quadrados para metros quadrados",
          "pés² para m²",
          "conversor de área",
          "calculadora de área do piso",
          "conversor de imóveis",
          "calculadora de construção",
          "ft² para m²",
          "pés ao quadrado para metros ao quadrado"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Área",
          "helpText": "Digite a área para converter"
        }
      },
      "results": {
        "squareMeters": {
          "label": "Metros Quadrados"
        },
        "squareYards": {
          "label": "Jardas Quadradas"
        },
        "acres": {
          "label": "Acres"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Quarto",
          "description": "150 pés² (~14 m²)"
        },
        "apartment": {
          "label": "Apartamento",
          "description": "1.000 pés² (~93 m²)"
        },
        "house": {
          "label": "Casa",
          "description": "2.500 pés² (~232 m²)"
        }
      },
      "values": {
        "m²": "m²",
        "ft²": "pés²",
        "yd²": "jardas²",
        "acres": "acres",
        "hectares": "hectares",
        "cm²": "cm²",
        "in²": "pol²"
      },
      "formats": {
        "summary": "{value} pés² = {sqm} m²"
      },
      "infoCards": {
        "results": {
          "title": "Resultados da Conversão",
          "items": [
            {
              "label": "Metros Quadrados",
              "valueKey": "squareMeters"
            },
            {
              "label": "Jardas Quadradas",
              "valueKey": "squareYards"
            },
            {
              "label": "Acres",
              "valueKey": "acres"
            },
            {
              "label": "Hectares",
              "valueKey": "hectares"
            }
          ]
        },
        "reference": {
          "title": "Referência Rápida",
          "items": [
            {
              "label": "100 pés²",
              "valueKey": "ref100"
            },
            {
              "label": "500 pés²",
              "valueKey": "ref500"
            },
            {
              "label": "1.000 pés²",
              "valueKey": "ref1000"
            },
            {
              "label": "1 acre",
              "valueKey": "ref1acre"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Conversão",
          "items": [
            "1 pé² = 0,0929 m² (divida por ~10,764 para converter)",
            "1 m² = 10,764 pés² (multiplique por ~10,76)",
            "1 acre = 43.560 pés² = 4.047 m²",
            "1 hectare = 10.000 m² = 2,471 acres"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Entendendo Pés Quadrados e Metros Quadrados",
          "content": "Pés quadrados e metros quadrados são unidades de área usadas para medir espaços bidimensionais como pisos, quartos e terrenos. Pés quadrados (pés²) é o padrão nos Estados Unidos, Reino Unido e Canadá para imóveis. Metros quadrados (m²) é usado na maior parte do mundo e faz parte do sistema métrico. Converter entre eles é essencial para listagens de propriedades internacionais, projetos de construção e design de interiores."
        },
        "howItWorks": {
          "title": "Como Funciona a Conversão",
          "content": "Como 1 pé = 0,3048 metros exatamente, 1 pé quadrado = 0,3048² = 0,092903 metros quadrados. Para converter pés quadrados para metros quadrados, multiplique por 0,092903. Para converter metros quadrados para pés quadrados, multiplique por 10,7639. Esses fatores de conversão são exatos por acordo internacional desde 1959."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "1 pé quadrado = 0,092903 metros quadrados exatamente",
              "type": "info"
            },
            {
              "text": "1 metro quadrado = 10,7639 pés quadrados",
              "type": "info"
            },
            {
              "text": "Imóveis nos EUA/Reino Unido usam pés²; a maioria dos outros países usa m²",
              "type": "info"
            },
            {
              "text": "Tamanhos de apartamentos na Ásia são frequentemente listados em 'ping' (Taiwan) ou 'pyeong' (Coreia)",
              "type": "warning"
            },
            {
              "text": "Imóveis comerciais podem usar diferentes padrões de medição",
              "type": "warning"
            },
            {
              "text": "Sempre verifique qual método de medição foi usado para áreas listadas",
              "type": "info"
            }
          ]
        },
        "commonAreas": {
          "title": "Referências de Áreas Comuns",
          "items": [
            {
              "text": "Vaga de estacionamento: ~150 pés² (14 m²)",
              "type": "info"
            },
            {
              "text": "Quarto pequeno: 100-150 pés² (9-14 m²)",
              "type": "info"
            },
            {
              "text": "Quarto master: 200-350 pés² (19-33 m²)",
              "type": "info"
            },
            {
              "text": "Apartamento de 1 quarto: 600-800 pés² (56-74 m²)",
              "type": "info"
            },
            {
              "text": "Casa média nos EUA: 2.300 pés² (214 m²)",
              "type": "info"
            },
            {
              "text": "Quadra de tênis: 2.808 pés² (261 m²)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Conversão",
          "description": "Cenários de imóveis",
          "examples": [
            {
              "title": "Listagem de Apartamento",
              "steps": [
                "Listagem nos EUA: apartamento de 850 pés²",
                "Converter: 850 × 0,0929 = 78,97 m²",
                "Este é um tamanho típico de 1-2 quartos"
              ],
              "result": "850 pés² = 79 m²"
            },
            {
              "title": "Lote de Terra",
              "steps": [
                "Área do terreno: 0,5 acres",
                "Converter para pés²: 0,5 × 43.560 = 21.780 pés²",
                "Converter para m²: 21.780 × 0,0929 = 2.023 m²"
              ],
              "result": "0,5 acres = 2.023 m²"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Como converter pés quadrados para metros quadrados?",
          "answer": "Multiplique os pés quadrados por 0,092903 para obter metros quadrados. Para cálculo mental rápido, divida por 10,76 ou aproximadamente por 11 para uma estimativa. Exemplo: 1.000 pés² ÷ 10,76 = 93 m²."
        },
        {
          "question": "Quantos pés quadrados há em um metro quadrado?",
          "answer": "Há 10,7639 pés quadrados em um metro quadrado. Então um apartamento de 100 m² equivale a 1.076 pés²."
        },
        {
          "question": "Qual é o tamanho médio de apartamento em metros quadrados?",
          "answer": "Isso varia por país: EUA tem média de 80-90 m² (850-970 pés²), Reino Unido tem média de 67 m² (720 pés²), Hong Kong tem média de 40 m² (430 pés²), e Austrália tem média de 90 m² (970 pés²)."
        },
        {
          "question": "Como converter acres para metros quadrados?",
          "answer": "1 acre = 4.046,86 metros quadrados = 43.560 pés quadrados. Para converter acres para m², multiplique por 4.047. Exemplo: 2 acres × 4.047 = 8.094 m²."
        },
        {
          "question": "O que é um hectare?",
          "answer": "Um hectare é 10.000 metros quadrados (100m × 100m), que equivale a 2,471 acres ou 107.639 pés quadrados. É comumente usado para medir grandes áreas de terra fora dos EUA."
        },
        {
          "question": "Por que alguns países usam pés quadrados e outros metros quadrados?",
          "answer": "Países que faziam parte do Império Britânico (EUA, Reino Unido, Canadá, Índia) tradicionalmente usam pés quadrados. A maioria dos outros países adotou o sistema métrico e usa metros quadrados. Até mesmo o Reino Unido agora usa ambos comumente."
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
      "name": "Convertisseur Pieds Carrés vers Mètres Carrés",
      "slug": "calculateur-pieds-carres-vers-metres-carres",
      "subtitle": "Convertissez les pieds carrés en mètres carrés pour l'immobilier, la construction et l'aménagement d'espaces.",
      "breadcrumb": "Pi² vers m²",
      "seo": {
        "title": "Convertisseur Pieds Carrés vers Mètres Carrés - Outil Gratuit de Surface",
        "description": "Convertissez instantanément les pieds carrés en mètres carrés pour l'immobilier, la construction et la décoration intérieure. Inclut acres, hectares et yards carrés.",
        "shortDescription": "Convertissez pi² en m² pour l'immobilier.",
        "keywords": [
          "pieds carrés vers mètres carrés",
          "pi² vers m²",
          "convertisseur de surface",
          "calculateur surface au sol",
          "convertisseur immobilier",
          "calculateur construction",
          "sqft vers m2",
          "pieds carrés vers mètres carrés"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "amount": {
          "label": "Surface",
          "helpText": "Entrez la surface à convertir"
        }
      },
      "results": {
        "squareMeters": {
          "label": "Mètres Carrés"
        },
        "squareYards": {
          "label": "Yards Carrés"
        },
        "acres": {
          "label": "Acres"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Chambre",
          "description": "150 pi² (~14 m²)"
        },
        "apartment": {
          "label": "Appartement",
          "description": "1 000 pi² (~93 m²)"
        },
        "house": {
          "label": "Maison",
          "description": "2 500 pi² (~232 m²)"
        }
      },
      "values": {
        "m²": "m²",
        "ft²": "pi²",
        "yd²": "yd²",
        "acres": "acres",
        "hectares": "hectares",
        "cm²": "cm²",
        "in²": "po²"
      },
      "formats": {
        "summary": "{value} pi² = {sqm} m²"
      },
      "infoCards": {
        "results": {
          "title": "Résultats de Conversion",
          "items": [
            {
              "label": "Mètres Carrés",
              "valueKey": "squareMeters"
            },
            {
              "label": "Yards Carrés",
              "valueKey": "squareYards"
            },
            {
              "label": "Acres",
              "valueKey": "acres"
            },
            {
              "label": "Hectares",
              "valueKey": "hectares"
            }
          ]
        },
        "reference": {
          "title": "Référence Rapide",
          "items": [
            {
              "label": "100 pi²",
              "valueKey": "ref100"
            },
            {
              "label": "500 pi²",
              "valueKey": "ref500"
            },
            {
              "label": "1 000 pi²",
              "valueKey": "ref1000"
            },
            {
              "label": "1 acre",
              "valueKey": "ref1acre"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Conversion",
          "items": [
            "1 pi² = 0,0929 m² (diviser par ~10,764 pour convertir)",
            "1 m² = 10,764 pi² (multiplier par ~10,76)",
            "1 acre = 43 560 pi² = 4 047 m²",
            "1 hectare = 10 000 m² = 2,471 acres"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comprendre les Pieds Carrés et les Mètres Carrés",
          "content": "Les pieds carrés et les mètres carrés sont des unités de superficie utilisées pour mesurer des espaces bidimensionnels comme les planchers, les pièces et les terrains. Le pied carré (pi²) est la norme aux États-Unis, au Royaume-Uni et au Canada pour l'immobilier. Le mètre carré (m²) est utilisé dans la plupart des pays du monde et fait partie du système métrique. La conversion entre ces unités est essentielle pour les annonces immobilières internationales, les projets de construction et la décoration intérieure."
        },
        "howItWorks": {
          "title": "Comment Fonctionne la Conversion",
          "content": "Puisque 1 pied = 0,3048 mètres exactement, 1 pied carré = 0,3048² = 0,092903 mètres carrés. Pour convertir les pieds carrés en mètres carrés, multipliez par 0,092903. Pour convertir les mètres carrés en pieds carrés, multipliez par 10,7639. Ces facteurs de conversion sont exacts selon l'accord international depuis 1959."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "1 pied carré = 0,092903 mètres carrés exactement",
              "type": "info"
            },
            {
              "text": "1 mètre carré = 10,7639 pieds carrés",
              "type": "info"
            },
            {
              "text": "L'immobilier aux États-Unis/Royaume-Uni utilise les pi² ; la plupart des autres pays utilisent les m²",
              "type": "info"
            },
            {
              "text": "Les tailles d'appartements en Asie sont souvent listées en 'ping' (Taïwan) ou 'pyeong' (Corée)",
              "type": "warning"
            },
            {
              "text": "L'immobilier commercial peut utiliser différentes normes de mesure",
              "type": "warning"
            },
            {
              "text": "Vérifiez toujours quelle méthode de mesure a été utilisée pour les surfaces annoncées",
              "type": "info"
            }
          ]
        },
        "commonAreas": {
          "title": "Références de Surfaces Courantes",
          "items": [
            {
              "text": "Place de parking : ~150 pi² (14 m²)",
              "type": "info"
            },
            {
              "text": "Petite chambre : 100-150 pi² (9-14 m²)",
              "type": "info"
            },
            {
              "text": "Chambre principale : 200-350 pi² (19-33 m²)",
              "type": "info"
            },
            {
              "text": "Appartement 1 chambre : 600-800 pi² (56-74 m²)",
              "type": "info"
            },
            {
              "text": "Maison américaine moyenne : 2 300 pi² (214 m²)",
              "type": "info"
            },
            {
              "text": "Court de tennis : 2 808 pi² (261 m²)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Conversion",
          "description": "Scénarios immobiliers",
          "examples": [
            {
              "title": "Annonce d'Appartement",
              "steps": [
                "Annonce américaine : appartement de 850 pi²",
                "Convertir : 850 × 0,0929 = 78,97 m²",
                "Ceci est une taille typique de 1-2 chambres"
              ],
              "result": "850 pi² = 79 m²"
            },
            {
              "title": "Terrain",
              "steps": [
                "Surface du terrain : 0,5 acres",
                "Convertir en pi² : 0,5 × 43 560 = 21 780 pi²",
                "Convertir en m² : 21 780 × 0,0929 = 2 023 m²"
              ],
              "result": "0,5 acres = 2 023 m²"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Comment convertir les pieds carrés en mètres carrés ?",
          "answer": "Multipliez les pieds carrés par 0,092903 pour obtenir les mètres carrés. Pour un calcul mental rapide, divisez par 10,76 ou approximativement par 11 pour une estimation. Exemple : 1 000 pi² ÷ 10,76 = 93 m²."
        },
        {
          "question": "Combien de pieds carrés dans un mètre carré ?",
          "answer": "Il y a 10,7639 pieds carrés dans un mètre carré. Donc un appartement de 100 m² équivaut à 1 076 pi²."
        },
        {
          "question": "Quelle est la taille moyenne d'un appartement en mètres carrés ?",
          "answer": "Cela varie selon les pays : États-Unis moyenne 80-90 m² (850-970 pi²), Royaume-Uni moyenne 67 m² (720 pi²), Hong Kong moyenne 40 m² (430 pi²), et Australie moyenne 90 m² (970 pi²)."
        },
        {
          "question": "Comment convertir les acres en mètres carrés ?",
          "answer": "1 acre = 4 046,86 mètres carrés = 43 560 pieds carrés. Pour convertir les acres en m², multipliez par 4 047. Exemple : 2 acres × 4 047 = 8 094 m²."
        },
        {
          "question": "Qu'est-ce qu'un hectare ?",
          "answer": "Un hectare fait 10 000 mètres carrés (100m × 100m), ce qui équivaut à 2,471 acres ou 107 639 pieds carrés. Il est couramment utilisé pour mesurer de grandes surfaces de terrain en dehors des États-Unis."
        },
        {
          "question": "Pourquoi certains pays utilisent les pieds carrés et d'autres les mètres carrés ?",
          "answer": "Les pays qui faisaient partie de l'Empire britannique (États-Unis, Royaume-Uni, Canada, Inde) utilisent traditionnellement les pieds carrés. La plupart des autres pays ont adopté le système métrique et utilisent les mètres carrés. Même le Royaume-Uni utilise maintenant couramment les deux."
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
      "name": "Quadratfuß zu Quadratmeter Umrechner",
      "slug": "quadratfuss-zu-quadratmeter-rechner",
      "subtitle": "Quadratfuß in Quadratmeter umrechnen für Immobilien, Bauwesen und Grundrissplanung.",
      "breadcrumb": "Quadratfuß zu m²",
      "seo": {
        "title": "Quadratfuß zu Quadratmeter Umrechner - Kostenloses Flächentool",
        "description": "Quadratfuß sofort in Quadratmeter umrechnen für Immobilien, Bauwesen und Innenarchitektur. Inklusive Acres, Hektar und Quadratyard.",
        "shortDescription": "Quadratfuß zu Quadratmeter für Immobilien umrechnen.",
        "keywords": [
          "quadratfuß zu quadratmeter",
          "sq ft zu m²",
          "flächenumrechner",
          "bodenfläche rechner",
          "immobilien umrechner",
          "bau rechner",
          "quadratfuß zu m2",
          "fuß quadrat zu meter quadrat"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Fläche",
          "helpText": "Geben Sie die umzurechnende Fläche ein"
        }
      },
      "results": {
        "squareMeters": {
          "label": "Quadratmeter"
        },
        "squareYards": {
          "label": "Quadratyard"
        },
        "acres": {
          "label": "Acres"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Schlafzimmer",
          "description": "150 sq ft (~14 m²)"
        },
        "apartment": {
          "label": "Wohnung",
          "description": "1.000 sq ft (~93 m²)"
        },
        "house": {
          "label": "Haus",
          "description": "2.500 sq ft (~232 m²)"
        }
      },
      "values": {
        "m²": "m²",
        "ft²": "ft²",
        "yd²": "yd²",
        "acres": "Acres",
        "hectares": "Hektar",
        "cm²": "cm²",
        "in²": "in²"
      },
      "formats": {
        "summary": "{value} ft² = {sqm} m²"
      },
      "infoCards": {
        "results": {
          "title": "Umrechnungsergebnisse",
          "items": [
            {
              "label": "Quadratmeter",
              "valueKey": "squareMeters"
            },
            {
              "label": "Quadratyard",
              "valueKey": "squareYards"
            },
            {
              "label": "Acres",
              "valueKey": "acres"
            },
            {
              "label": "Hektar",
              "valueKey": "hectares"
            }
          ]
        },
        "reference": {
          "title": "Schnellreferenz",
          "items": [
            {
              "label": "100 sq ft",
              "valueKey": "ref100"
            },
            {
              "label": "500 sq ft",
              "valueKey": "ref500"
            },
            {
              "label": "1.000 sq ft",
              "valueKey": "ref1000"
            },
            {
              "label": "1 Acre",
              "valueKey": "ref1acre"
            }
          ]
        },
        "tips": {
          "title": "Umrechnungstipps",
          "items": [
            "1 sq ft = 0,0929 m² (durch ~10,764 teilen zum Umrechnen)",
            "1 m² = 10,764 sq ft (mit ~10,76 multiplizieren)",
            "1 Acre = 43.560 sq ft = 4.047 m²",
            "1 Hektar = 10.000 m² = 2,471 Acres"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Quadratfuß und Quadratmeter verstehen",
          "content": "Quadratfuß und Quadratmeter sind Flächeneinheiten zur Messung zweidimensionaler Räume wie Böden, Zimmer und Grundstücke. Quadratfuß (ft²) ist der Standard in den Vereinigten Staaten, Großbritannien und Kanada für Immobilien. Quadratmeter (m²) wird in den meisten Ländern der Welt verwendet und ist Teil des metrischen Systems. Die Umrechnung zwischen beiden ist für internationale Immobilieninserate, Bauprojekte und Innenarchitektur unerlässlich."
        },
        "howItWorks": {
          "title": "Wie die Umrechnung funktioniert",
          "content": "Da 1 Fuß = 0,3048 Meter genau entspricht, ist 1 Quadratfuß = 0,3048² = 0,092903 Quadratmeter. Um Quadratfuß in Quadratmeter umzurechnen, multiplizieren Sie mit 0,092903. Um Quadratmeter in Quadratfuß umzurechnen, multiplizieren Sie mit 10,7639. Diese Umrechnungsfaktoren sind seit 1959 durch internationale Vereinbarung exakt."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "1 Quadratfuß = 0,092903 Quadratmeter exakt",
              "type": "info"
            },
            {
              "text": "1 Quadratmeter = 10,7639 Quadratfuß",
              "type": "info"
            },
            {
              "text": "Immobilien in USA/UK verwenden sq ft; die meisten anderen Länder verwenden m²",
              "type": "info"
            },
            {
              "text": "Wohnungsgrößen in Asien werden oft in 'Ping' (Taiwan) oder 'Pyeong' (Korea) angegeben",
              "type": "warning"
            },
            {
              "text": "Gewerbeimmobilien können unterschiedliche Messstandards verwenden",
              "type": "warning"
            },
            {
              "text": "Überprüfen Sie immer, welche Messmethode für angegebene Flächen verwendet wurde",
              "type": "info"
            }
          ]
        },
        "commonAreas": {
          "title": "Häufige Flächenreferenzen",
          "items": [
            {
              "text": "Parkplatz: ~150 sq ft (14 m²)",
              "type": "info"
            },
            {
              "text": "Kleines Schlafzimmer: 100-150 sq ft (9-14 m²)",
              "type": "info"
            },
            {
              "text": "Hauptschlafzimmer: 200-350 sq ft (19-33 m²)",
              "type": "info"
            },
            {
              "text": "1-Zimmer-Wohnung: 600-800 sq ft (56-74 m²)",
              "type": "info"
            },
            {
              "text": "Durchschnittliches US-Haus: 2.300 sq ft (214 m²)",
              "type": "info"
            },
            {
              "text": "Tennisplatz: 2.808 sq ft (261 m²)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Immobilien-Szenarien",
          "examples": [
            {
              "title": "Wohnungsinserat",
              "steps": [
                "US-Inserat: 850 sq ft Wohnung",
                "Umrechnung: 850 × 0,0929 = 78,97 m²",
                "Das ist eine typische 1-2 Zimmer Größe"
              ],
              "result": "850 sq ft = 79 m²"
            },
            {
              "title": "Grundstück",
              "steps": [
                "Grundstücksfläche: 0,5 Acres",
                "In sq ft umrechnen: 0,5 × 43.560 = 21.780 sq ft",
                "In m² umrechnen: 21.780 × 0,0929 = 2.023 m²"
              ],
              "result": "0,5 Acres = 2.023 m²"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie rechne ich Quadratfuß in Quadratmeter um?",
          "answer": "Multiplizieren Sie Quadratfuß mit 0,092903, um Quadratmeter zu erhalten. Für schnelle Kopfrechnung teilen Sie durch 10,76 oder grob durch 11 für eine Schätzung. Beispiel: 1.000 sq ft ÷ 10,76 = 93 m²."
        },
        {
          "question": "Wie viele Quadratfuß sind ein Quadratmeter?",
          "answer": "Es gibt 10,7639 Quadratfuß in einem Quadratmeter. Also entspricht eine 100 m² Wohnung 1.076 sq ft."
        },
        {
          "question": "Wie groß ist die durchschnittliche Wohnung in Quadratmetern?",
          "answer": "Das variiert je nach Land: USA durchschnittlich 80-90 m² (850-970 sq ft), UK durchschnittlich 67 m² (720 sq ft), Hongkong durchschnittlich 40 m² (430 sq ft), und Australien durchschnittlich 90 m² (970 sq ft)."
        },
        {
          "question": "Wie rechne ich Acres in Quadratmeter um?",
          "answer": "1 Acre = 4.046,86 Quadratmeter = 43.560 Quadratfuß. Um Acres in m² umzurechnen, multiplizieren Sie mit 4.047. Beispiel: 2 Acres × 4.047 = 8.094 m²."
        },
        {
          "question": "Was ist ein Hektar?",
          "answer": "Ein Hektar sind 10.000 Quadratmeter (100m × 100m), was 2,471 Acres oder 107.639 Quadratfuß entspricht. Er wird häufig zur Messung großer Grundstücksflächen außerhalb der USA verwendet."
        },
        {
          "question": "Warum verwenden manche Länder Quadratfuß und andere Quadratmeter?",
          "answer": "Länder, die Teil des britischen Empires waren (USA, UK, Kanada, Indien), verwenden traditionell Quadratfuß. Die meisten anderen Länder haben das metrische System übernommen und verwenden Quadratmeter. Selbst das UK verwendet heute häufig beide Einheiten."
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
      defaultValue: 100,
      placeholder: "100",
      min: 0,
      step: 1,
      unitType: "area",
      syncGroup: false,
      defaultUnit: "ft2",
      allowedUnits: ["ft2", "m2", "yd2", "in2", "cm2", "acres", "hectares"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "squareMeters", type: "primary", format: "number" },
    { id: "squareYards", type: "secondary", format: "number" },
    { id: "acres", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "📊", itemCount: 4 },
    { id: "reference", type: "list", icon: "📖", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "commonAreas", type: "list", icon: "🏠", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "NIST", year: "2024", title: "Handbook 44 - Specifications for Area Measures", source: "National Institute of Standards and Technology", url: "https://www.nist.gov/pml/weights-and-measures/publications/nist-handbooks/handbook-44" },
    { authors: "International Bureau of Weights and Measures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Area Converter", title: "Square Feet to Square Meters" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["gallons-to-liters", "cups-to-ml", "mph-to-kmh"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.0001) return val.toExponential(2);
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

export function calculateSquareFeetToSquareMeters(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "ft2";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Conversion factors to m² (from registry.ts AREA)
  const toM2: Record<string, number> = {
    "ft2": 0.092903,
    "m2": 1,
    "yd2": 0.836127,
    "in2": 0.00064516,
    "cm2": 0.0001,
    "acres": 4046.86,
    "hectares": 10000,
  };

  const factor = toM2[fromUnit] || 0.092903;
  const squareMeters = amount * factor;
  const squareYards = squareMeters / 0.836127;
  const acres = squareMeters / 4046.86;
  const hectares = squareMeters / 10000;

  // Reference values (in m²)
  const ref100 = 100 * 0.092903;
  const ref500 = 500 * 0.092903;
  const ref1000 = 1000 * 0.092903;
  const ref1acre = 4046.86;

  const m2Unit = v["m²"] || "m²";
  const yd2Unit = v["yd²"] || "yd²";
  const acresUnit = v["acres"] || "acres";
  const hectaresUnit = v["hectares"] || "hectares";

  return {
    values: { squareMeters, squareYards, acres, hectares, ref100, ref500, ref1000, ref1acre },
    formatted: {
      squareMeters: `${fmtNum(squareMeters)} ${m2Unit}`,
      squareYards: `${fmtNum(squareYards)} ${yd2Unit}`,
      acres: `${fmtNum(acres)} ${acresUnit}`,
      hectares: `${fmtNum(hectares)} ${hectaresUnit}`,
      ref100: `${fmtNum(ref100)} ${m2Unit}`,
      ref500: `${fmtNum(ref500)} ${m2Unit}`,
      ref1000: `${fmtNum(ref1000)} ${m2Unit}`,
      ref1acre: `${fmtNum(ref1acre)} ${m2Unit}`,
    },
    summary: `${fmtNum(amount)} ft² = ${fmtNum(squareMeters)} ${m2Unit}`,
    isValid: true,
  };
}

export default squareFeetToSquareMetersConverterConfig;
