import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// METERS TO FEET CONVERTER - V4 (EN ONLY)
// ============================================================================

export const metersToFeetConverterConfig: CalculatorConfigV4 = {
  id: "meters-to-feet",
  version: "4.0",
  category: "conversion",
  icon: "📏",

  presets: [
    { id: "height180", icon: "🧑", values: { amount: 1.80 } },
    { id: "room3", icon: "🏠", values: { amount: 3 } },
    { id: "pool25", icon: "🏊", values: { amount: 25 } },
  ],

  t: {
    en: {
      name: "Meters to Feet Converter",
      slug: "meters-to-feet",
      subtitle: "Convert meters to feet instantly — ideal for height, construction, and real estate measurements.",
      breadcrumb: "Meters to Feet",

      seo: {
        title: "Meters to Feet Converter - Free Length Conversion Tool",
        description: "Convert meters to feet instantly. Ideal for height conversions, construction projects, and real estate. Includes feet-and-inches breakdown and reference table.",
        shortDescription: "Convert meters to feet instantly.",
        keywords: ["meters to feet", "m to ft converter", "convert meters to feet", "meters to feet and inches", "height converter", "free meters converter", "metric to imperial length"],
      },

      calculator: { yourInformation: "Meters to Feet" },
      ui: { yourInformation: "Meters to Feet", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Length", helpText: "Enter value and select unit" },
      },

      results: {
        feet: { label: "Feet (decimal)" },
        feetInches: { label: "Feet & Inches" },
        inches: { label: "Inches" },
        centimeters: { label: "Centimeters" },
        yards: { label: "Yards" },
      },

      presets: {
        height180: { label: "1.80 m", description: "Average tall height ~5'11\"" },
        room3: { label: "3 meters", description: "Standard room height ~10 ft" },
        pool25: { label: "25 meters", description: "Olympic short course pool" },
      },

      values: { "ft": "ft", "in": "in", "cm": "cm", "yd": "yd", "m": "m" },
      formats: { summary: "{m} m = {ft} feet" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Feet (decimal)", valueKey: "feet" },
            { label: "Feet & Inches", valueKey: "feetInches" },
            { label: "Total Inches", valueKey: "inches" },
            { label: "Centimeters", valueKey: "centimeters" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 meter", valueKey: "ref1" },
            { label: "2 meters", valueKey: "ref2" },
            { label: "5 meters", valueKey: "ref5" },
            { label: "10 meters", valueKey: "ref10" },
          ],
        },
        tips: {
          title: "💡 Conversion Tips",
          items: [
            "1 meter = 3.28084 feet — multiply meters by 3.3 for a quick estimate.",
            "1 meter ≈ 3 feet 3⅜ inches — slightly longer than a yard.",
            "Standard ceiling height: 2.4 m = 7.87 ft (US: 8 ft = 2.44 m).",
            "A 6-foot person is 1.83 m, a 5'4\" person is 1.63 m.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Meters to Feet",
          content: "To convert meters to feet, multiply by 3.28084. One meter equals exactly 100 centimeters or about 3 feet 3.37 inches. The meter is the base unit of length in the metric system, defined as the distance light travels in 1/299,792,458 of a second. The foot is an imperial unit used primarily in the US, UK (for height), and Canada, defined as exactly 0.3048 meters since 1959. This conversion is commonly needed for height measurements, room dimensions, property sizes, and construction projects.",
        },
        howItWorks: {
          title: "The Meters to Feet Formula",
          content: "The formula is: feet = meters × 3.28084 (or meters / 0.3048). Since 1 foot = 0.3048 meters exactly, dividing meters by 0.3048 gives precise feet. For feet and inches: multiply meters by 3.28084 to get total feet, then take the decimal portion × 12 for inches. Example: 1.75 m × 3.28084 = 5.741 ft. The .741 × 12 = 8.9 inches, so 1.75 m = 5 ft 8.9 in.",
        },
        considerations: {
          title: "Common Meters to Feet Conversions",
          items: [
            { text: "1 m = 3.281 ft = 3 ft 3.37 in — slightly more than a yard", type: "info" },
            { text: "1.5 m = 4.921 ft = 4 ft 11.1 in — short adult height", type: "info" },
            { text: "1.7 m = 5.577 ft = 5 ft 6.9 in — average height range", type: "info" },
            { text: "1.8 m = 5.906 ft = 5 ft 10.9 in — tall adult height", type: "info" },
            { text: "2.0 m = 6.562 ft = 6 ft 6.7 in — very tall", type: "info" },
            { text: "100 m = 328.084 ft — length of a football (soccer) field", type: "info" },
          ],
        },
        buildingHeights: {
          title: "Building & Structure Heights",
          items: [
            { text: "Standard door: 2.03 m = 6 ft 8 in", type: "info" },
            { text: "Standard ceiling: 2.44 m = 8 ft (US) or 2.7 m = 8 ft 10 in (EU)", type: "info" },
            { text: "Basketball hoop: 3.05 m = 10 ft", type: "info" },
            { text: "One story: ~3 m = ~10 ft", type: "info" },
            { text: "Statue of Liberty (to torch): 93 m = 305 ft", type: "info" },
            { text: "Eiffel Tower: 330 m = 1,083 ft", type: "info" },
          ],
        },
        examples: {
          title: "Meters to Feet Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 1.75 m height to feet & inches",
              steps: ["1.75 × 3.28084 = 5.7415 feet", "Whole feet: 5", "Decimal: 0.7415 × 12 = 8.898 inches", "Round: 5 ft 8.9 in ≈ 5'9\""],
              result: "1.75 m = 5 ft 8.9 in (≈ 5'9\")",
            },
            {
              title: "Room: 4.5 × 3.5 meters to feet",
              steps: ["Length: 4.5 × 3.28084 = 14.76 ft", "Width: 3.5 × 3.28084 = 11.48 ft", "Area: 14.76 × 11.48 = 169.5 sq ft", "Or: 4.5 × 3.5 = 15.75 m² = 169.5 ft²"],
              result: "4.5 × 3.5 m = 14.8 × 11.5 ft (169.5 ft²)",
            },
          ],
        },
      },

      faqs: [
        { question: "How many feet is 1 meter?", answer: "1 meter equals 3.28084 feet, or about 3 feet 3.37 inches. For quick estimation, think of a meter as slightly longer than a yard (3 feet)." },
        { question: "How do I convert meters to feet and inches?", answer: "Multiply meters by 3.28084 to get decimal feet. The whole number is feet. Multiply the decimal by 12 to get inches. Example: 1.65 m × 3.28084 = 5.413 ft → 5 ft + (0.413 × 12) = 5 ft 5.0 in." },
        { question: "What is 2 meters in feet?", answer: "2 meters = 6.562 feet = 6 feet 6.7 inches. This is very tall — only about 1% of men are 6'6\" or taller." },
        { question: "How tall is 1.70 meters in feet?", answer: "1.70 m = 5.577 ft = 5 feet 6.9 inches, approximately 5'7\". This is close to the average adult height in many countries." },
        { question: "Is a meter longer than a foot?", answer: "Yes, significantly. 1 meter = 3.281 feet, so a meter is more than 3 times longer than a foot. A meter is also slightly longer than a yard (1 m = 1.094 yd)." },
        { question: "How do I convert square meters to square feet?", answer: "Multiply square meters by 10.764 to get square feet. For example, a 50 m² apartment = 538.2 sq ft. This is because (3.28084)² = 10.764." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Conversor de Metros a Pies",
      "slug": "calculadora-metros-a-pies",
      "subtitle": "Convierte metros a pies al instante — ideal para mediciones de altura, construcción y bienes raíces.",
      "breadcrumb": "Metros a Pies",
      "seo": {
        "title": "Conversor de Metros a Pies - Herramienta Gratuita de Conversión de Longitud",
        "description": "Convierte metros a pies al instante. Ideal para conversiones de altura, proyectos de construcción y bienes raíces. Incluye desglose en pies y pulgadas y tabla de referencia.",
        "shortDescription": "Convierte metros a pies al instante.",
        "keywords": [
          "metros a pies",
          "conversor m a ft",
          "convertir metros a pies",
          "metros a pies y pulgadas",
          "conversor de altura",
          "conversor de metros gratis",
          "longitud métrico a imperial"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Longitud",
          "helpText": "Ingrese el valor y seleccione la unidad"
        }
      },
      "results": {
        "feet": {
          "label": "Pies (decimal)"
        },
        "feetInches": {
          "label": "Pies y Pulgadas"
        },
        "inches": {
          "label": "Pulgadas"
        },
        "centimeters": {
          "label": "Centímetros"
        },
        "yards": {
          "label": "Yardas"
        }
      },
      "presets": {
        "height180": {
          "label": "1.80 m",
          "description": "Altura promedio alta ~5'11\""
        },
        "room3": {
          "label": "3 metros",
          "description": "Altura estándar de habitación ~10 ft"
        },
        "pool25": {
          "label": "25 metros",
          "description": "Piscina olímpica de curso corto"
        }
      },
      "values": {
        "ft": "ft",
        "in": "in",
        "cm": "cm",
        "yd": "yd",
        "m": "m"
      },
      "formats": {
        "summary": "{m} m = {ft} pies"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados de Conversión",
          "items": [
            {
              "label": "Pies (decimal)",
              "valueKey": "feet"
            },
            {
              "label": "Pies y Pulgadas",
              "valueKey": "feetInches"
            },
            {
              "label": "Total Pulgadas",
              "valueKey": "inches"
            },
            {
              "label": "Centímetros",
              "valueKey": "centimeters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referencia Rápida",
          "items": [
            {
              "label": "1 metro",
              "valueKey": "ref1"
            },
            {
              "label": "2 metros",
              "valueKey": "ref2"
            },
            {
              "label": "5 metros",
              "valueKey": "ref5"
            },
            {
              "label": "10 metros",
              "valueKey": "ref10"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Conversión",
          "items": [
            "1 metro = 3.28084 pies — multiplique metros por 3.3 para una estimación rápida.",
            "1 metro ≈ 3 pies 3⅜ pulgadas — ligeramente más largo que una yarda.",
            "Altura estándar de techo: 2.4 m = 7.87 ft (EE.UU.: 8 ft = 2.44 m).",
            "Una persona de 6 pies mide 1.83 m, una persona de 5'4\" mide 1.63 m."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir Metros a Pies",
          "content": "Para convertir metros a pies, multiplique por 3.28084. Un metro equivale exactamente a 100 centímetros o aproximadamente 3 pies 3.37 pulgadas. El metro es la unidad base de longitud en el sistema métrico, definido como la distancia que recorre la luz en 1/299,792,458 de segundo. El pie es una unidad imperial utilizada principalmente en EE.UU., Reino Unido (para altura) y Canadá, definido como exactamente 0.3048 metros desde 1959. Esta conversión es comúnmente necesaria para mediciones de altura, dimensiones de habitaciones, tamaños de propiedades y proyectos de construcción."
        },
        "howItWorks": {
          "title": "La Fórmula de Metros a Pies",
          "content": "La fórmula es: pies = metros × 3.28084 (o metros / 0.3048). Dado que 1 pie = 0.3048 metros exactamente, dividir metros por 0.3048 da pies precisos. Para pies y pulgadas: multiplique metros por 3.28084 para obtener pies totales, luego tome la porción decimal × 12 para pulgadas. Ejemplo: 1.75 m × 3.28084 = 5.741 ft. El .741 × 12 = 8.9 pulgadas, así que 1.75 m = 5 ft 8.9 in."
        },
        "considerations": {
          "title": "Conversiones Comunes de Metros a Pies",
          "items": [
            {
              "text": "1 m = 3.281 ft = 3 ft 3.37 in — ligeramente más que una yarda",
              "type": "info"
            },
            {
              "text": "1.5 m = 4.921 ft = 4 ft 11.1 in — altura de adulto bajo",
              "type": "info"
            },
            {
              "text": "1.7 m = 5.577 ft = 5 ft 6.9 in — rango de altura promedio",
              "type": "info"
            },
            {
              "text": "1.8 m = 5.906 ft = 5 ft 10.9 in — altura de adulto alto",
              "type": "info"
            },
            {
              "text": "2.0 m = 6.562 ft = 6 ft 6.7 in — muy alto",
              "type": "info"
            },
            {
              "text": "100 m = 328.084 ft — longitud de un campo de fútbol",
              "type": "info"
            }
          ]
        },
        "buildingHeights": {
          "title": "Alturas de Edificios y Estructuras",
          "items": [
            {
              "text": "Puerta estándar: 2.03 m = 6 ft 8 in",
              "type": "info"
            },
            {
              "text": "Techo estándar: 2.44 m = 8 ft (EE.UU.) o 2.7 m = 8 ft 10 in (UE)",
              "type": "info"
            },
            {
              "text": "Canasta de baloncesto: 3.05 m = 10 ft",
              "type": "info"
            },
            {
              "text": "Un piso: ~3 m = ~10 ft",
              "type": "info"
            },
            {
              "text": "Estatua de la Libertad (hasta la antorcha): 93 m = 305 ft",
              "type": "info"
            },
            {
              "text": "Torre Eiffel: 330 m = 1,083 ft",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Metros a Pies",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Convertir altura de 1.75 m a pies y pulgadas",
              "steps": [
                "1.75 × 3.28084 = 5.7415 pies",
                "Pies enteros: 5",
                "Decimal: 0.7415 × 12 = 8.898 pulgadas",
                "Redondeo: 5 ft 8.9 in ≈ 5'9\""
              ],
              "result": "1.75 m = 5 ft 8.9 in (≈ 5'9\")"
            },
            {
              "title": "Habitación: 4.5 × 3.5 metros a pies",
              "steps": [
                "Largo: 4.5 × 3.28084 = 14.76 ft",
                "Ancho: 3.5 × 3.28084 = 11.48 ft",
                "Área: 14.76 × 11.48 = 169.5 ft²",
                "O: 4.5 × 3.5 = 15.75 m² = 169.5 ft²"
              ],
              "result": "4.5 × 3.5 m = 14.8 × 11.5 ft (169.5 ft²)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos pies es 1 metro?",
          "answer": "1 metro equivale a 3.28084 pies, o aproximadamente 3 pies 3.37 pulgadas. Para una estimación rápida, piense en un metro como ligeramente más largo que una yarda (3 pies)."
        },
        {
          "question": "¿Cómo convierto metros a pies y pulgadas?",
          "answer": "Multiplique metros por 3.28084 para obtener pies decimales. El número entero son los pies. Multiplique el decimal por 12 para obtener pulgadas. Ejemplo: 1.65 m × 3.28084 = 5.413 ft → 5 ft + (0.413 × 12) = 5 ft 5.0 in."
        },
        {
          "question": "¿Cuánto son 2 metros en pies?",
          "answer": "2 metros = 6.562 pies = 6 pies 6.7 pulgadas. Esto es muy alto — solo alrededor del 1% de los hombres miden 6'6\" o más."
        },
        {
          "question": "¿Qué tan alto es 1.70 metros en pies?",
          "answer": "1.70 m = 5.577 ft = 5 pies 6.9 pulgadas, aproximadamente 5'7\". Esto está cerca de la altura promedio de adultos en muchos países."
        },
        {
          "question": "¿Es un metro más largo que un pie?",
          "answer": "Sí, significativamente. 1 metro = 3.281 pies, así que un metro es más de 3 veces más largo que un pie. Un metro también es ligeramente más largo que una yarda (1 m = 1.094 yd)."
        },
        {
          "question": "¿Cómo convierto metros cuadrados a pies cuadrados?",
          "answer": "Multiplique metros cuadrados por 10.764 para obtener pies cuadrados. Por ejemplo, un apartamento de 50 m² = 538.2 ft². Esto es porque (3.28084)² = 10.764."
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
      "name": "Conversor de Metros para Pés",
      "slug": "calculadora-metros-para-pes",
      "subtitle": "Converta metros para pés instantaneamente — ideal para medições de altura, construção e imóveis.",
      "breadcrumb": "Metros para Pés",
      "seo": {
        "title": "Conversor de Metros para Pés - Ferramenta Gratuita de Conversão de Comprimento",
        "description": "Converta metros para pés instantaneamente. Ideal para conversões de altura, projetos de construção e imóveis. Inclui divisão em pés e polegadas e tabela de referência.",
        "shortDescription": "Converta metros para pés instantaneamente.",
        "keywords": [
          "metros para pés",
          "conversor m para ft",
          "converter metros para pés",
          "metros para pés e polegadas",
          "conversor de altura",
          "conversor metros gratuito",
          "comprimento métrico para imperial"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Comprimento",
          "helpText": "Digite o valor e selecione a unidade"
        }
      },
      "results": {
        "feet": {
          "label": "Pés (decimal)"
        },
        "feetInches": {
          "label": "Pés e Polegadas"
        },
        "inches": {
          "label": "Polegadas"
        },
        "centimeters": {
          "label": "Centímetros"
        },
        "yards": {
          "label": "Jardas"
        }
      },
      "presets": {
        "height180": {
          "label": "1,80 m",
          "description": "Altura alta média ~5'11\""
        },
        "room3": {
          "label": "3 metros",
          "description": "Altura padrão de sala ~10 ft"
        },
        "pool25": {
          "label": "25 metros",
          "description": "Piscina olímpica curso curto"
        }
      },
      "values": {
        "ft": "ft",
        "in": "pol",
        "cm": "cm",
        "yd": "jd",
        "m": "m"
      },
      "formats": {
        "summary": "{m} m = {ft} pés"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados da Conversão",
          "items": [
            {
              "label": "Pés (decimal)",
              "valueKey": "feet"
            },
            {
              "label": "Pés e Polegadas",
              "valueKey": "feetInches"
            },
            {
              "label": "Total em Polegadas",
              "valueKey": "inches"
            },
            {
              "label": "Centímetros",
              "valueKey": "centimeters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referência Rápida",
          "items": [
            {
              "label": "1 metro",
              "valueKey": "ref1"
            },
            {
              "label": "2 metros",
              "valueKey": "ref2"
            },
            {
              "label": "5 metros",
              "valueKey": "ref5"
            },
            {
              "label": "10 metros",
              "valueKey": "ref10"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Conversão",
          "items": [
            "1 metro = 3,28084 pés — multiplique metros por 3,3 para uma estimativa rápida.",
            "1 metro ≈ 3 pés 3⅜ polegadas — ligeiramente maior que uma jarda.",
            "Altura padrão do teto: 2,4 m = 7,87 ft (EUA: 8 ft = 2,44 m).",
            "Uma pessoa de 6 pés tem 1,83 m, uma pessoa de 5'4\" tem 1,63 m."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter Metros para Pés",
          "content": "Para converter metros para pés, multiplique por 3,28084. Um metro equivale exatamente a 100 centímetros ou cerca de 3 pés 3,37 polegadas. O metro é a unidade base de comprimento no sistema métrico, definido como a distância que a luz percorre em 1/299.792.458 de segundo. O pé é uma unidade imperial usada principalmente nos EUA, Reino Unido (para altura) e Canadá, definido como exatamente 0,3048 metros desde 1959. Esta conversão é comumente necessária para medições de altura, dimensões de salas, tamanhos de propriedades e projetos de construção."
        },
        "howItWorks": {
          "title": "A Fórmula de Metros para Pés",
          "content": "A fórmula é: pés = metros × 3,28084 (ou metros / 0,3048). Como 1 pé = 0,3048 metros exatamente, dividir metros por 0,3048 dá pés precisos. Para pés e polegadas: multiplique metros por 3,28084 para obter o total de pés, depois pegue a porção decimal × 12 para polegadas. Exemplo: 1,75 m × 3,28084 = 5,741 ft. O 0,741 × 12 = 8,9 polegadas, então 1,75 m = 5 ft 8,9 pol."
        },
        "considerations": {
          "title": "Conversões Comuns de Metros para Pés",
          "items": [
            {
              "text": "1 m = 3,281 ft = 3 ft 3,37 pol — ligeiramente mais que uma jarda",
              "type": "info"
            },
            {
              "text": "1,5 m = 4,921 ft = 4 ft 11,1 pol — altura baixa de adulto",
              "type": "info"
            },
            {
              "text": "1,7 m = 5,577 ft = 5 ft 6,9 pol — faixa de altura média",
              "type": "info"
            },
            {
              "text": "1,8 m = 5,906 ft = 5 ft 10,9 pol — altura alta de adulto",
              "type": "info"
            },
            {
              "text": "2,0 m = 6,562 ft = 6 ft 6,7 pol — muito alto",
              "type": "info"
            },
            {
              "text": "100 m = 328,084 ft — comprimento de um campo de futebol",
              "type": "info"
            }
          ]
        },
        "buildingHeights": {
          "title": "Alturas de Edifícios e Estruturas",
          "items": [
            {
              "text": "Porta padrão: 2,03 m = 6 ft 8 pol",
              "type": "info"
            },
            {
              "text": "Teto padrão: 2,44 m = 8 ft (EUA) ou 2,7 m = 8 ft 10 pol (UE)",
              "type": "info"
            },
            {
              "text": "Cesta de basquete: 3,05 m = 10 ft",
              "type": "info"
            },
            {
              "text": "Um andar: ~3 m = ~10 ft",
              "type": "info"
            },
            {
              "text": "Estátua da Liberdade (até a tocha): 93 m = 305 ft",
              "type": "info"
            },
            {
              "text": "Torre Eiffel: 330 m = 1.083 ft",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Metros para Pés",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Converter altura de 1,75 m para pés e polegadas",
              "steps": [
                "1,75 × 3,28084 = 5,7415 pés",
                "Pés inteiros: 5",
                "Decimal: 0,7415 × 12 = 8,898 polegadas",
                "Arredondado: 5 ft 8,9 pol ≈ 5'9\""
              ],
              "result": "1,75 m = 5 ft 8,9 pol (≈ 5'9\")"
            },
            {
              "title": "Sala: 4,5 × 3,5 metros para pés",
              "steps": [
                "Comprimento: 4,5 × 3,28084 = 14,76 ft",
                "Largura: 3,5 × 3,28084 = 11,48 ft",
                "Área: 14,76 × 11,48 = 169,5 pés²",
                "Ou: 4,5 × 3,5 = 15,75 m² = 169,5 ft²"
              ],
              "result": "4,5 × 3,5 m = 14,8 × 11,5 ft (169,5 ft²)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos pés tem 1 metro?",
          "answer": "1 metro equivale a 3,28084 pés, ou cerca de 3 pés 3,37 polegadas. Para estimativa rápida, pense em um metro como ligeiramente maior que uma jarda (3 pés)."
        },
        {
          "question": "Como converter metros para pés e polegadas?",
          "answer": "Multiplique metros por 3,28084 para obter pés decimais. O número inteiro são os pés. Multiplique o decimal por 12 para obter polegadas. Exemplo: 1,65 m × 3,28084 = 5,413 ft → 5 ft + (0,413 × 12) = 5 ft 5,0 pol."
        },
        {
          "question": "Quanto é 2 metros em pés?",
          "answer": "2 metros = 6,562 pés = 6 pés 6,7 polegadas. Isso é muito alto — apenas cerca de 1% dos homens têm 6'6\" ou mais."
        },
        {
          "question": "Qual a altura de 1,70 metros em pés?",
          "answer": "1,70 m = 5,577 ft = 5 pés 6,9 polegadas, aproximadamente 5'7\". Isso está próximo da altura média de adultos em muitos países."
        },
        {
          "question": "Um metro é maior que um pé?",
          "answer": "Sim, significativamente. 1 metro = 3,281 pés, então um metro é mais de 3 vezes maior que um pé. Um metro também é ligeiramente maior que uma jarda (1 m = 1,094 jd)."
        },
        {
          "question": "Como converter metros quadrados para pés quadrados?",
          "answer": "Multiplique metros quadrados por 10,764 para obter pés quadrados. Por exemplo, um apartamento de 50 m² = 538,2 pés². Isso ocorre porque (3,28084)² = 10,764."
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
      "name": "Convertisseur Mètres vers Pieds",
      "slug": "calculateur-metres-vers-pieds",
      "subtitle": "Convertissez les mètres en pieds instantanément — idéal pour les mesures de taille, construction et immobilier.",
      "breadcrumb": "Mètres vers Pieds",
      "seo": {
        "title": "Convertisseur Mètres vers Pieds - Outil de Conversion de Longueur Gratuit",
        "description": "Convertissez les mètres en pieds instantanément. Idéal pour les conversions de taille, projets de construction et immobilier. Inclut la répartition pieds-et-pouces et tableau de référence.",
        "shortDescription": "Convertissez les mètres en pieds instantanément.",
        "keywords": [
          "mètres vers pieds",
          "convertisseur m vers ft",
          "convertir mètres en pieds",
          "mètres vers pieds et pouces",
          "convertisseur de taille",
          "convertisseur de mètres gratuit",
          "longueur métrique vers impériale"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Longueur",
          "helpText": "Entrez la valeur et sélectionnez l'unité"
        }
      },
      "results": {
        "feet": {
          "label": "Pieds (décimal)"
        },
        "feetInches": {
          "label": "Pieds et Pouces"
        },
        "inches": {
          "label": "Pouces"
        },
        "centimeters": {
          "label": "Centimètres"
        },
        "yards": {
          "label": "Yards"
        }
      },
      "presets": {
        "height180": {
          "label": "1,80 m",
          "description": "Taille grande moyenne ~5'11\""
        },
        "room3": {
          "label": "3 mètres",
          "description": "Hauteur de pièce standard ~10 ft"
        },
        "pool25": {
          "label": "25 mètres",
          "description": "Piscine olympique petit bassin"
        }
      },
      "values": {
        "ft": "pi",
        "in": "po",
        "cm": "cm",
        "yd": "yd",
        "m": "m"
      },
      "formats": {
        "summary": "{m} m = {ft} pieds"
      },
      "infoCards": {
        "results": {
          "title": "📏 Résultats de Conversion",
          "items": [
            {
              "label": "Pieds (décimal)",
              "valueKey": "feet"
            },
            {
              "label": "Pieds et Pouces",
              "valueKey": "feetInches"
            },
            {
              "label": "Pouces Total",
              "valueKey": "inches"
            },
            {
              "label": "Centimètres",
              "valueKey": "centimeters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Référence Rapide",
          "items": [
            {
              "label": "1 mètre",
              "valueKey": "ref1"
            },
            {
              "label": "2 mètres",
              "valueKey": "ref2"
            },
            {
              "label": "5 mètres",
              "valueKey": "ref5"
            },
            {
              "label": "10 mètres",
              "valueKey": "ref10"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils de Conversion",
          "items": [
            "1 mètre = 3,28084 pieds — multipliez les mètres par 3,3 pour une estimation rapide.",
            "1 mètre ≈ 3 pieds 3⅜ pouces — légèrement plus long qu'un yard.",
            "Hauteur de plafond standard : 2,4 m = 7,87 pi (US : 8 pi = 2,44 m).",
            "Une personne de 6 pieds mesure 1,83 m, une personne de 5'4\" mesure 1,63 m."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir les Mètres en Pieds",
          "content": "Pour convertir les mètres en pieds, multipliez par 3,28084. Un mètre équivaut exactement à 100 centimètres ou environ 3 pieds 3,37 pouces. Le mètre est l'unité de base de longueur dans le système métrique, défini comme la distance que parcourt la lumière en 1/299 792 458 de seconde. Le pied est une unité impériale utilisée principalement aux États-Unis, au Royaume-Uni (pour la taille) et au Canada, défini comme exactement 0,3048 mètre depuis 1959. Cette conversion est couramment nécessaire pour les mesures de taille, dimensions de pièces, tailles de propriétés et projets de construction."
        },
        "howItWorks": {
          "title": "La Formule Mètres vers Pieds",
          "content": "La formule est : pieds = mètres × 3,28084 (ou mètres ÷ 0,3048). Puisque 1 pied = 0,3048 mètre exactement, diviser les mètres par 0,3048 donne des pieds précis. Pour pieds et pouces : multipliez les mètres par 3,28084 pour obtenir le total en pieds, puis prenez la partie décimale × 12 pour les pouces. Exemple : 1,75 m × 3,28084 = 5,741 pi. Le 0,741 × 12 = 8,9 pouces, donc 1,75 m = 5 pi 8,9 po."
        },
        "considerations": {
          "title": "Conversions Courantes Mètres vers Pieds",
          "items": [
            {
              "text": "1 m = 3,281 pi = 3 pi 3,37 po — légèrement plus qu'un yard",
              "type": "info"
            },
            {
              "text": "1,5 m = 4,921 pi = 4 pi 11,1 po — taille adulte petite",
              "type": "info"
            },
            {
              "text": "1,7 m = 5,577 pi = 5 pi 6,9 po — gamme de taille moyenne",
              "type": "info"
            },
            {
              "text": "1,8 m = 5,906 pi = 5 pi 10,9 po — taille adulte grande",
              "type": "info"
            },
            {
              "text": "2,0 m = 6,562 pi = 6 pi 6,7 po — très grand",
              "type": "info"
            },
            {
              "text": "100 m = 328,084 pi — longueur d'un terrain de football",
              "type": "info"
            }
          ]
        },
        "buildingHeights": {
          "title": "Hauteurs de Bâtiments et Structures",
          "items": [
            {
              "text": "Porte standard : 2,03 m = 6 pi 8 po",
              "type": "info"
            },
            {
              "text": "Plafond standard : 2,44 m = 8 pi (US) ou 2,7 m = 8 pi 10 po (UE)",
              "type": "info"
            },
            {
              "text": "Panier de basket : 3,05 m = 10 pi",
              "type": "info"
            },
            {
              "text": "Un étage : ~3 m = ~10 pi",
              "type": "info"
            },
            {
              "text": "Statue de la Liberté (jusqu'à la torche) : 93 m = 305 pi",
              "type": "info"
            },
            {
              "text": "Tour Eiffel : 330 m = 1 083 pi",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples Mètres vers Pieds",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Convertir 1,75 m de taille en pieds et pouces",
              "steps": [
                "1,75 × 3,28084 = 5,7415 pieds",
                "Pieds entiers : 5",
                "Décimale : 0,7415 × 12 = 8,898 pouces",
                "Arrondi : 5 pi 8,9 po ≈ 5'9\""
              ],
              "result": "1,75 m = 5 pi 8,9 po (≈ 5'9\")"
            },
            {
              "title": "Pièce : 4,5 × 3,5 mètres en pieds",
              "steps": [
                "Longueur : 4,5 × 3,28084 = 14,76 pi",
                "Largeur : 3,5 × 3,28084 = 11,48 pi",
                "Surface : 14,76 × 11,48 = 169,5 pi²",
                "Ou : 4,5 × 3,5 = 15,75 m² = 169,5 pi²"
              ],
              "result": "4,5 × 3,5 m = 14,8 × 11,5 pi (169,5 pi²)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de pieds fait 1 mètre ?",
          "answer": "1 mètre équivaut à 3,28084 pieds, ou environ 3 pieds 3,37 pouces. Pour une estimation rapide, pensez au mètre comme légèrement plus long qu'un yard (3 pieds)."
        },
        {
          "question": "Comment convertir les mètres en pieds et pouces ?",
          "answer": "Multipliez les mètres par 3,28084 pour obtenir les pieds décimaux. Le nombre entier représente les pieds. Multipliez la décimale par 12 pour obtenir les pouces. Exemple : 1,65 m × 3,28084 = 5,413 pi → 5 pi + (0,413 × 12) = 5 pi 5,0 po."
        },
        {
          "question": "Que font 2 mètres en pieds ?",
          "answer": "2 mètres = 6,562 pieds = 6 pieds 6,7 pouces. C'est très grand — seulement environ 1% des hommes mesurent 6'6\" ou plus."
        },
        {
          "question": "Quelle taille fait 1,70 mètre en pieds ?",
          "answer": "1,70 m = 5,577 pi = 5 pieds 6,9 pouces, approximativement 5'7\". C'est proche de la taille adulte moyenne dans de nombreux pays."
        },
        {
          "question": "Un mètre est-il plus long qu'un pied ?",
          "answer": "Oui, considérablement. 1 mètre = 3,281 pieds, donc un mètre est plus de 3 fois plus long qu'un pied. Un mètre est aussi légèrement plus long qu'un yard (1 m = 1,094 yd)."
        },
        {
          "question": "Comment convertir les mètres carrés en pieds carrés ?",
          "answer": "Multipliez les mètres carrés par 10,764 pour obtenir les pieds carrés. Par exemple, un appartement de 50 m² = 538,2 pi². C'est parce que (3,28084)² = 10,764."
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
      "name": "Meter zu Fuß Umrechner",
      "slug": "meter-zu-fuss-rechner",
      "subtitle": "Meter sofort in Fuß umrechnen — ideal für Größen-, Bau- und Immobilienmessungen.",
      "breadcrumb": "Meter zu Fuß",
      "seo": {
        "title": "Meter zu Fuß Umrechner - Kostenloses Längenumrechnungstool",
        "description": "Meter sofort in Fuß umrechnen. Ideal für Größenumrechnungen, Bauprojekte und Immobilien. Inklusive Fuß-und-Zoll-Aufschlüsselung und Referenztabelle.",
        "shortDescription": "Meter sofort in Fuß umrechnen.",
        "keywords": [
          "meter zu fuß",
          "m zu ft umrechner",
          "meter in fuß umrechnen",
          "meter zu fuß und zoll",
          "größenumrechner",
          "kostenloser meter umrechner",
          "metrisch zu imperial länge"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Länge",
          "helpText": "Wert eingeben und Einheit auswählen"
        }
      },
      "results": {
        "feet": {
          "label": "Fuß (dezimal)"
        },
        "feetInches": {
          "label": "Fuß & Zoll"
        },
        "inches": {
          "label": "Zoll"
        },
        "centimeters": {
          "label": "Zentimeter"
        },
        "yards": {
          "label": "Yards"
        }
      },
      "presets": {
        "height180": {
          "label": "1,80 m",
          "description": "Durchschnittliche große Körpergröße ~5'11\""
        },
        "room3": {
          "label": "3 Meter",
          "description": "Standard Raumhöhe ~10 ft"
        },
        "pool25": {
          "label": "25 Meter",
          "description": "Olympisches Kurzbahn-Schwimmbecken"
        }
      },
      "values": {
        "ft": "ft",
        "in": "in",
        "cm": "cm",
        "yd": "yd",
        "m": "m"
      },
      "formats": {
        "summary": "{m} m = {ft} Fuß"
      },
      "infoCards": {
        "results": {
          "title": "📏 Umrechnungsergebnisse",
          "items": [
            {
              "label": "Fuß (dezimal)",
              "valueKey": "feet"
            },
            {
              "label": "Fuß & Zoll",
              "valueKey": "feetInches"
            },
            {
              "label": "Zoll gesamt",
              "valueKey": "inches"
            },
            {
              "label": "Zentimeter",
              "valueKey": "centimeters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Schnellreferenz",
          "items": [
            {
              "label": "1 Meter",
              "valueKey": "ref1"
            },
            {
              "label": "2 Meter",
              "valueKey": "ref2"
            },
            {
              "label": "5 Meter",
              "valueKey": "ref5"
            },
            {
              "label": "10 Meter",
              "valueKey": "ref10"
            }
          ]
        },
        "tips": {
          "title": "💡 Umrechnungstipps",
          "items": [
            "1 Meter = 3,28084 Fuß — multipliziere Meter mit 3,3 für eine schnelle Schätzung.",
            "1 Meter ≈ 3 Fuß 3⅜ Zoll — etwas länger als ein Yard.",
            "Standard Deckenhöhe: 2,4 m = 7,87 ft (USA: 8 ft = 2,44 m).",
            "Eine 6-Fuß-Person ist 1,83 m, eine 5'4\"-Person ist 1,63 m."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie man Meter in Fuß umrechnet",
          "content": "Um Meter in Fuß umzurechnen, multipliziere mit 3,28084. Ein Meter entspricht genau 100 Zentimetern oder etwa 3 Fuß 3,37 Zoll. Der Meter ist die Grundeinheit der Länge im metrischen System, definiert als die Strecke, die das Licht in 1/299.792.458 einer Sekunde zurücklegt. Der Fuß ist eine imperiale Einheit, die hauptsächlich in den USA, Großbritannien (für Körpergröße) und Kanada verwendet wird, seit 1959 als genau 0,3048 Meter definiert. Diese Umrechnung wird häufig für Größenmessungen, Raumabmessungen, Immobiliengrößen und Bauprojekte benötigt."
        },
        "howItWorks": {
          "title": "Die Meter zu Fuß Formel",
          "content": "Die Formel lautet: Fuß = Meter × 3,28084 (oder Meter ÷ 0,3048). Da 1 Fuß = 0,3048 Meter genau, ergibt die Division von Metern durch 0,3048 präzise Fuß. Für Fuß und Zoll: multipliziere Meter mit 3,28084 um die Gesamtfuß zu erhalten, dann nimm den Dezimalanteil × 12 für Zoll. Beispiel: 1,75 m × 3,28084 = 5,741 ft. Die 0,741 × 12 = 8,9 Zoll, also 1,75 m = 5 ft 8,9 in."
        },
        "considerations": {
          "title": "Häufige Meter zu Fuß Umrechnungen",
          "items": [
            {
              "text": "1 m = 3,281 ft = 3 ft 3,37 in — etwas mehr als ein Yard",
              "type": "info"
            },
            {
              "text": "1,5 m = 4,921 ft = 4 ft 11,1 in — kleine Erwachsenengröße",
              "type": "info"
            },
            {
              "text": "1,7 m = 5,577 ft = 5 ft 6,9 in — durchschnittlicher Größenbereich",
              "type": "info"
            },
            {
              "text": "1,8 m = 5,906 ft = 5 ft 10,9 in — große Erwachsenengröße",
              "type": "info"
            },
            {
              "text": "2,0 m = 6,562 ft = 6 ft 6,7 in — sehr groß",
              "type": "info"
            },
            {
              "text": "100 m = 328,084 ft — Länge eines Fußballfeldes",
              "type": "info"
            }
          ]
        },
        "buildingHeights": {
          "title": "Gebäude- und Strukturhöhen",
          "items": [
            {
              "text": "Standard Tür: 2,03 m = 6 ft 8 in",
              "type": "info"
            },
            {
              "text": "Standard Decke: 2,44 m = 8 ft (USA) oder 2,7 m = 8 ft 10 in (EU)",
              "type": "info"
            },
            {
              "text": "Basketballkorb: 3,05 m = 10 ft",
              "type": "info"
            },
            {
              "text": "Ein Stockwerk: ~3 m = ~10 ft",
              "type": "info"
            },
            {
              "text": "Freiheitsstatue (bis zur Fackel): 93 m = 305 ft",
              "type": "info"
            },
            {
              "text": "Eiffelturm: 330 m = 1.083 ft",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Meter zu Fuß Beispiele",
          "description": "Schritt-für-Schritt Umrechnungen",
          "examples": [
            {
              "title": "1,75 m Körpergröße in Fuß & Zoll umrechnen",
              "steps": [
                "1,75 × 3,28084 = 5,7415 Fuß",
                "Ganze Fuß: 5",
                "Dezimal: 0,7415 × 12 = 8,898 Zoll",
                "Runden: 5 ft 8,9 in ≈ 5'9\""
              ],
              "result": "1,75 m = 5 ft 8,9 in (≈ 5'9\")"
            },
            {
              "title": "Raum: 4,5 × 3,5 Meter in Fuß",
              "steps": [
                "Länge: 4,5 × 3,28084 = 14,76 ft",
                "Breite: 3,5 × 3,28084 = 11,48 ft",
                "Fläche: 14,76 × 11,48 = 169,5 sq ft",
                "Oder: 4,5 × 3,5 = 15,75 m² = 169,5 ft²"
              ],
              "result": "4,5 × 3,5 m = 14,8 × 11,5 ft (169,5 ft²)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Fuß sind 1 Meter?",
          "answer": "1 Meter entspricht 3,28084 Fuß oder etwa 3 Fuß 3,37 Zoll. Für eine schnelle Schätzung denke an einen Meter als etwas länger als ein Yard (3 Fuß)."
        },
        {
          "question": "Wie rechne ich Meter in Fuß und Zoll um?",
          "answer": "Multipliziere Meter mit 3,28084 um Dezimalfuß zu erhalten. Die ganze Zahl sind die Fuß. Multipliziere die Dezimalstelle mit 12 um Zoll zu erhalten. Beispiel: 1,65 m × 3,28084 = 5,413 ft → 5 ft + (0,413 × 12) = 5 ft 5,0 in."
        },
        {
          "question": "Was sind 2 Meter in Fuß?",
          "answer": "2 Meter = 6,562 Fuß = 6 Fuß 6,7 Zoll. Das ist sehr groß — nur etwa 1% der Männer sind 6'6\" oder größer."
        },
        {
          "question": "Wie groß sind 1,70 Meter in Fuß?",
          "answer": "1,70 m = 5,577 ft = 5 Fuß 6,9 Zoll, ungefähr 5'7\". Das ist nahe der durchschnittlichen Erwachsenengröße in vielen Ländern."
        },
        {
          "question": "Ist ein Meter länger als ein Fuß?",
          "answer": "Ja, erheblich. 1 Meter = 3,281 Fuß, also ist ein Meter mehr als 3 Mal länger als ein Fuß. Ein Meter ist auch etwas länger als ein Yard (1 m = 1,094 yd)."
        },
        {
          "question": "Wie rechne ich Quadratmeter in Quadratfuß um?",
          "answer": "Multipliziere Quadratmeter mit 10,764 um Quadratfuß zu erhalten. Zum Beispiel: eine 50 m² Wohnung = 538,2 sq ft. Das liegt daran, dass (3,28084)² = 10,764."
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
      placeholder: "1.80",
      min: 0,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "m",
      allowedUnits: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "feet", type: "primary", format: "text" },
    { id: "feetInches", type: "secondary", format: "text" },
    { id: "inches", type: "secondary", format: "text" },
    { id: "centimeters", type: "secondary", format: "text" },
    { id: "yards", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "📏", itemCount: 4 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "buildingHeights", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Length Specifications", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "Meters to Feet" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["feet-to-meters", "cm-to-inches", "length-converter"],
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

export function calculateMetersToFeet(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "m";
  const meters = convertToBase(amount, fromUnit, "length");

  const totalFeet = meters / 0.3048;
  const feetPart = Math.floor(totalFeet);
  const inchesPart = (totalFeet - feetPart) * 12;
  const totalInches = meters / 0.0254;
  const cm = meters * 100;
  const yards = meters / 0.9144;

  const ref1 = 1 / 0.3048;
  const ref2 = 2 / 0.3048;
  const ref5 = 5 / 0.3048;
  const ref10 = 10 / 0.3048;

  return {
    values: { feet: totalFeet, feetInches: totalFeet, inches: totalInches, centimeters: cm, yards },
    formatted: {
      feet: `${fmtNum(totalFeet)} ft`,
      feetInches: `${feetPart}' ${fmtNum(Math.round(inchesPart * 10) / 10)}"`,
      inches: `${fmtNum(totalInches)} in`,
      centimeters: `${fmtNum(cm)} cm`,
      yards: `${fmtNum(yards)} yd`,
      ref1: `${fmtNum(ref1)} ft`,
      ref2: `${fmtNum(ref2)} ft`,
      ref5: `${fmtNum(ref5)} ft`,
      ref10: `${fmtNum(ref10)} ft`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(totalFeet)} ft = ${feetPart}' ${Math.round(inchesPart * 10) / 10}"`,
    isValid: true,
  };
}

export default metersToFeetConverterConfig;
