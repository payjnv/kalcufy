import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// FEET TO METERS CONVERTER - V4 (EN ONLY)
// ============================================================================

export const feetToMetersConverterConfig: CalculatorConfigV4 = {
  id: "feet-to-meters",
  version: "4.0",
  category: "conversion",
  icon: "📏",

  presets: [
    { id: "height6ft", icon: "🧑", values: { amount: 6 } },
    { id: "ceiling8ft", icon: "🏠", values: { amount: 8 } },
    { id: "pool100ft", icon: "🏊", values: { amount: 100 } },
  ],

  t: {
    en: {
      name: "Feet to Meters Converter",
      slug: "feet-to-meters",
      subtitle: "Convert feet to meters instantly — great for height, construction, and international measurements.",
      breadcrumb: "Feet to Meters",

      seo: {
        title: "Feet to Meters Converter - Free Length Conversion Tool",
        description: "Convert feet to meters instantly. Perfect for height, construction, real estate, and international measurements. Includes reference table and common values.",
        shortDescription: "Convert feet to meters instantly.",
        keywords: ["feet to meters", "ft to m converter", "convert feet to meters", "feet to meters chart", "height converter feet", "free feet converter", "imperial to metric length"],
      },

      calculator: { yourInformation: "Feet to Meters" },
      ui: { yourInformation: "Feet to Meters", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Length", helpText: "Enter value and select unit" },
      },

      results: {
        meters: { label: "Meters" },
        centimeters: { label: "Centimeters" },
        millimeters: { label: "Millimeters" },
        inches: { label: "Inches" },
        kilometers: { label: "Kilometers" },
      },

      presets: {
        height6ft: { label: "6 feet", description: "6 ft = 1.83 m" },
        ceiling8ft: { label: "8 feet", description: "Standard US ceiling height" },
        pool100ft: { label: "100 feet", description: "Pool or building length" },
      },

      values: { "m": "m", "cm": "cm", "mm": "mm", "in": "in", "km": "km", "ft": "ft" },
      formats: { summary: "{ft} ft = {m} meters" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Meters", valueKey: "meters" },
            { label: "Centimeters", valueKey: "centimeters" },
            { label: "Millimeters", valueKey: "millimeters" },
            { label: "Inches", valueKey: "inches" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 foot", valueKey: "ref1" },
            { label: "5 feet", valueKey: "ref5" },
            { label: "10 feet", valueKey: "ref10" },
            { label: "100 feet", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "💡 Conversion Tips",
          items: [
            "1 foot = exactly 0.3048 meters — multiply feet by 0.3 for a quick estimate.",
            "1 foot = 12 inches = 30.48 cm exactly.",
            "Quick: divide feet by 3.3 to get approximate meters.",
            "5 feet = 1.524 m, 6 feet = 1.829 m — useful height references.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Feet to Meters",
          content: "To convert feet to meters, multiply by 0.3048. One foot equals exactly 0.3048 meters (30.48 cm). This exact relationship was established in 1959 by international agreement. The foot has been used since ancient civilizations — its origin relates to the length of a human foot. Today, it's primarily used in the United States and UK (for height). Nearly every other country uses the meter, which is the SI base unit of length defined by the speed of light.",
        },
        howItWorks: {
          title: "The Feet to Meters Formula",
          content: "The formula is: meters = feet × 0.3048. This is an exact conversion factor. For feet and inches combined, first convert to total feet: total feet = feet + (inches / 12), then multiply by 0.3048. Alternatively, convert feet to inches (× 12), add remaining inches, then multiply by 0.0254. Example: 5'10\" = 5 + (10/12) = 5.833 ft × 0.3048 = 1.778 m.",
        },
        considerations: {
          title: "Common Feet to Meters Conversions",
          items: [
            { text: "1 ft = 0.3048 m = 30.48 cm exactly", type: "info" },
            { text: "3 ft (1 yard) = 0.9144 m — slightly less than a meter", type: "info" },
            { text: "5 ft = 1.524 m — short adult height", type: "info" },
            { text: "5 ft 6 in = 1.676 m — average height range", type: "info" },
            { text: "6 ft = 1.829 m — tall adult height", type: "info" },
            { text: "5,280 ft = 1 mile = 1,609.344 m", type: "info" },
          ],
        },
        heightChart: {
          title: "Height Chart: Feet to Meters",
          items: [
            { text: "5'0\" = 1.524 m = 152.4 cm", type: "info" },
            { text: "5'4\" = 1.626 m = 162.6 cm — average US female height", type: "info" },
            { text: "5'7\" = 1.702 m = 170.2 cm", type: "info" },
            { text: "5'9\" = 1.753 m = 175.3 cm — average US male height", type: "info" },
            { text: "6'0\" = 1.829 m = 182.9 cm", type: "info" },
            { text: "6'3\" = 1.905 m = 190.5 cm — well above average", type: "info" },
          ],
        },
        examples: {
          title: "Feet to Meters Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 5'10\" to meters",
              steps: ["5 feet + 10 inches", "Total inches: (5 × 12) + 10 = 70 in", "70 × 0.0254 = 1.778 m", "Or: 5.833 ft × 0.3048 = 1.778 m"],
              result: "5'10\" = 1.778 m (177.8 cm)",
            },
            {
              title: "Room: 12 × 15 feet to meters",
              steps: ["12 ft × 0.3048 = 3.658 m", "15 ft × 0.3048 = 4.572 m", "Area: 12 × 15 = 180 sq ft", "In metric: 3.66 × 4.57 = 16.72 m²"],
              result: "12 × 15 ft = 3.66 × 4.57 m (16.7 m²)",
            },
          ],
        },
      },

      faqs: [
        { question: "How many meters is 1 foot?", answer: "1 foot equals exactly 0.3048 meters (30.48 cm). This is an exact definition, not an approximation. To convert feet to meters, multiply by 0.3048." },
        { question: "How do I convert feet and inches to meters?", answer: "Convert to total inches first: (feet × 12) + inches. Then multiply by 0.0254 to get meters. Example: 5'8\" = 68 inches × 0.0254 = 1.727 m. Or convert to decimal feet: 5 + 8/12 = 5.667 ft × 0.3048 = 1.727 m." },
        { question: "What is 6 feet in meters?", answer: "6 feet = 1.8288 meters, commonly rounded to 1.83 m. In centimeters, that's 182.88 cm." },
        { question: "How many feet is 1 meter?", answer: "1 meter = 3.28084 feet ≈ 3 ft 3.4 in. A meter is slightly longer than a yard (3 feet)." },
        { question: "How do I convert square feet to square meters?", answer: "Divide square feet by 10.764 to get square meters. Example: 1,000 sq ft ÷ 10.764 = 92.9 m². This factor comes from (0.3048)² × 12² ... or simply (3.28084)² = 10.764." },
        { question: "Is a meter bigger than a foot?", answer: "Yes, significantly. 1 meter = 3.281 feet, so a meter is about 3.3 times longer than a foot. It takes about 3 feet and 3 inches to equal 1 meter." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de Pies a Metros",
      "slug": "calculadora-pies-metros",
      "subtitle": "Convierte pies a metros al instante — ideal para altura, construcción y medidas internacionales.",
      "breadcrumb": "Pies a Metros",
      "seo": {
        "title": "Convertidor de Pies a Metros - Herramienta Gratuita de Conversión de Longitud",
        "description": "Convierte pies a metros al instante. Perfecto para altura, construcción, bienes raíces y medidas internacionales. Incluye tabla de referencia y valores comunes.",
        "shortDescription": "Convierte pies a metros al instante.",
        "keywords": [
          "pies a metros",
          "convertidor ft a m",
          "convertir pies a metros",
          "tabla pies a metros",
          "convertidor de altura pies",
          "convertidor pies gratis",
          "longitud imperial a métrica"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Longitud",
          "helpText": "Ingresa el valor y selecciona la unidad"
        }
      },
      "results": {
        "meters": {
          "label": "Metros"
        },
        "centimeters": {
          "label": "Centímetros"
        },
        "millimeters": {
          "label": "Milímetros"
        },
        "inches": {
          "label": "Pulgadas"
        },
        "kilometers": {
          "label": "Kilómetros"
        }
      },
      "presets": {
        "height6ft": {
          "label": "6 pies",
          "description": "6 ft = 1.83 m"
        },
        "ceiling8ft": {
          "label": "8 pies",
          "description": "Altura estándar de techo en EE.UU."
        },
        "pool100ft": {
          "label": "100 pies",
          "description": "Longitud de piscina o edificio"
        }
      },
      "values": {
        "m": "m",
        "cm": "cm",
        "mm": "mm",
        "in": "pulg",
        "km": "km",
        "ft": "ft"
      },
      "formats": {
        "summary": "{ft} ft = {m} metros"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados de Conversión",
          "items": [
            {
              "label": "Metros",
              "valueKey": "meters"
            },
            {
              "label": "Centímetros",
              "valueKey": "centimeters"
            },
            {
              "label": "Milímetros",
              "valueKey": "millimeters"
            },
            {
              "label": "Pulgadas",
              "valueKey": "inches"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referencia Rápida",
          "items": [
            {
              "label": "1 pie",
              "valueKey": "ref1"
            },
            {
              "label": "5 pies",
              "valueKey": "ref5"
            },
            {
              "label": "10 pies",
              "valueKey": "ref10"
            },
            {
              "label": "100 pies",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Conversión",
          "items": [
            "1 pie = exactamente 0.3048 metros — multiplica los pies por 0.3 para una estimación rápida.",
            "1 pie = 12 pulgadas = 30.48 cm exactamente.",
            "Rápido: divide los pies entre 3.3 para obtener metros aproximados.",
            "5 pies = 1.524 m, 6 pies = 1.829 m — referencias útiles de altura."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir Pies a Metros",
          "content": "Para convertir pies a metros, multiplica por 0.3048. Un pie equivale exactamente a 0.3048 metros (30.48 cm). Esta relación exacta fue establecida en 1959 por acuerdo internacional. El pie se ha utilizado desde civilizaciones antiguas — su origen se relaciona con la longitud de un pie humano. Hoy en día, se usa principalmente en Estados Unidos y Reino Unido (para altura). Casi todos los demás países usan el metro, que es la unidad base SI de longitud definida por la velocidad de la luz."
        },
        "howItWorks": {
          "title": "La Fórmula de Pies a Metros",
          "content": "La fórmula es: metros = pies × 0.3048. Este es un factor de conversión exacto. Para pies y pulgadas combinados, primero convierte a pies totales: pies totales = pies + (pulgadas / 12), luego multiplica por 0.3048. Alternativamente, convierte pies a pulgadas (× 12), suma las pulgadas restantes, luego multiplica por 0.0254. Ejemplo: 5'10\" = 5 + (10/12) = 5.833 ft × 0.3048 = 1.778 m."
        },
        "considerations": {
          "title": "Conversiones Comunes de Pies a Metros",
          "items": [
            {
              "text": "1 ft = 0.3048 m = 30.48 cm exactamente",
              "type": "info"
            },
            {
              "text": "3 ft (1 yarda) = 0.9144 m — ligeramente menos que un metro",
              "type": "info"
            },
            {
              "text": "5 ft = 1.524 m — altura adulta baja",
              "type": "info"
            },
            {
              "text": "5 ft 6 in = 1.676 m — rango de altura promedio",
              "type": "info"
            },
            {
              "text": "6 ft = 1.829 m — altura adulta alta",
              "type": "info"
            },
            {
              "text": "5,280 ft = 1 milla = 1,609.344 m",
              "type": "info"
            }
          ]
        },
        "heightChart": {
          "title": "Tabla de Alturas: Pies a Metros",
          "items": [
            {
              "text": "5'0\" = 1.524 m = 152.4 cm",
              "type": "info"
            },
            {
              "text": "5'4\" = 1.626 m = 162.6 cm — altura promedio femenina en EE.UU.",
              "type": "info"
            },
            {
              "text": "5'7\" = 1.702 m = 170.2 cm",
              "type": "info"
            },
            {
              "text": "5'9\" = 1.753 m = 175.3 cm — altura promedio masculina en EE.UU.",
              "type": "info"
            },
            {
              "text": "6'0\" = 1.829 m = 182.9 cm",
              "type": "info"
            },
            {
              "text": "6'3\" = 1.905 m = 190.5 cm — muy por encima del promedio",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Pies a Metros",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Convertir 5'10\" a metros",
              "steps": [
                "5 pies + 10 pulgadas",
                "Pulgadas totales: (5 × 12) + 10 = 70 pulg",
                "70 × 0.0254 = 1.778 m",
                "O: 5.833 ft × 0.3048 = 1.778 m"
              ],
              "result": "5'10\" = 1.778 m (177.8 cm)"
            },
            {
              "title": "Habitación: 12 × 15 pies a metros",
              "steps": [
                "12 ft × 0.3048 = 3.658 m",
                "15 ft × 0.3048 = 4.572 m",
                "Área: 12 × 15 = 180 pies²",
                "En métrico: 3.66 × 4.57 = 16.72 m²"
              ],
              "result": "12 × 15 ft = 3.66 × 4.57 m (16.7 m²)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos metros es 1 pie?",
          "answer": "1 pie equivale exactamente a 0.3048 metros (30.48 cm). Esta es una definición exacta, no una aproximación. Para convertir pies a metros, multiplica por 0.3048."
        },
        {
          "question": "¿Cómo convierto pies y pulgadas a metros?",
          "answer": "Convierte primero a pulgadas totales: (pies × 12) + pulgadas. Luego multiplica por 0.0254 para obtener metros. Ejemplo: 5'8\" = 68 pulgadas × 0.0254 = 1.727 m. O convierte a pies decimales: 5 + 8/12 = 5.667 ft × 0.3048 = 1.727 m."
        },
        {
          "question": "¿Cuánto es 6 pies en metros?",
          "answer": "6 pies = 1.8288 metros, comúnmente redondeado a 1.83 m. En centímetros, son 182.88 cm."
        },
        {
          "question": "¿Cuántos pies es 1 metro?",
          "answer": "1 metro = 3.28084 pies ≈ 3 ft 3.4 pulg. Un metro es ligeramente más largo que una yarda (3 pies)."
        },
        {
          "question": "¿Cómo convierto pies cuadrados a metros cuadrados?",
          "answer": "Divide los pies cuadrados entre 10.764 para obtener metros cuadrados. Ejemplo: 1,000 pies² ÷ 10.764 = 92.9 m². Este factor proviene de (0.3048)² × 12² ... o simplemente (3.28084)² = 10.764."
        },
        {
          "question": "¿Es un metro más grande que un pie?",
          "answer": "Sí, significativamente. 1 metro = 3.281 pies, por lo que un metro es aproximadamente 3.3 veces más largo que un pie. Se necesitan aproximadamente 3 pies y 3 pulgadas para igualar 1 metro."
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
      "name": "Conversor de Pés para Metros",
      "slug": "calculadora-pes-para-metros",
      "subtitle": "Converta pés para metros instantaneamente — ideal para altura, construção e medições internacionais.",
      "breadcrumb": "Pés para Metros",
      "seo": {
        "title": "Conversor de Pés para Metros - Ferramenta Gratuita de Conversão",
        "description": "Converta pés para metros instantaneamente. Perfeito para altura, construção, imóveis e medições internacionais. Inclui tabela de referência e valores comuns.",
        "shortDescription": "Converta pés para metros instantaneamente.",
        "keywords": [
          "pés para metros",
          "conversor ft para m",
          "converter pés para metros",
          "tabela pés para metros",
          "conversor altura pés",
          "conversor pés gratuito",
          "imperial para métrico comprimento"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Comprimento",
          "helpText": "Digite o valor e selecione a unidade"
        }
      },
      "results": {
        "meters": {
          "label": "Metros"
        },
        "centimeters": {
          "label": "Centímetros"
        },
        "millimeters": {
          "label": "Milímetros"
        },
        "inches": {
          "label": "Polegadas"
        },
        "kilometers": {
          "label": "Quilômetros"
        }
      },
      "presets": {
        "height6ft": {
          "label": "6 pés",
          "description": "6 pés = 1,83 m"
        },
        "ceiling8ft": {
          "label": "8 pés",
          "description": "Altura padrão de teto nos EUA"
        },
        "pool100ft": {
          "label": "100 pés",
          "description": "Comprimento de piscina ou edifício"
        }
      },
      "values": {
        "m": "m",
        "cm": "cm",
        "mm": "mm",
        "in": "pol",
        "km": "km",
        "ft": "pés"
      },
      "formats": {
        "summary": "{ft} pés = {m} metros"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados da Conversão",
          "items": [
            {
              "label": "Metros",
              "valueKey": "meters"
            },
            {
              "label": "Centímetros",
              "valueKey": "centimeters"
            },
            {
              "label": "Milímetros",
              "valueKey": "millimeters"
            },
            {
              "label": "Polegadas",
              "valueKey": "inches"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referência Rápida",
          "items": [
            {
              "label": "1 pé",
              "valueKey": "ref1"
            },
            {
              "label": "5 pés",
              "valueKey": "ref5"
            },
            {
              "label": "10 pés",
              "valueKey": "ref10"
            },
            {
              "label": "100 pés",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Conversão",
          "items": [
            "1 pé = exatamente 0,3048 metros — multiplique pés por 0,3 para uma estimativa rápida.",
            "1 pé = 12 polegadas = 30,48 cm exatamente.",
            "Rápido: divida pés por 3,3 para obter metros aproximados.",
            "5 pés = 1,524 m, 6 pés = 1,829 m — referências úteis de altura."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter Pés para Metros",
          "content": "Para converter pés para metros, multiplique por 0,3048. Um pé equivale exatamente a 0,3048 metros (30,48 cm). Esta relação exata foi estabelecida em 1959 por acordo internacional. O pé tem sido usado desde civilizações antigas — sua origem relaciona-se ao comprimento do pé humano. Hoje, é usado principalmente nos Estados Unidos e Reino Unido (para altura). Quase todos os outros países usam o metro, que é a unidade base SI de comprimento definida pela velocidade da luz."
        },
        "howItWorks": {
          "title": "A Fórmula de Pés para Metros",
          "content": "A fórmula é: metros = pés × 0,3048. Este é um fator de conversão exato. Para pés e polegadas combinados, primeiro converta para pés totais: pés totais = pés + (polegadas / 12), depois multiplique por 0,3048. Alternativamente, converta pés para polegadas (× 12), adicione as polegadas restantes, depois multiplique por 0,0254. Exemplo: 5'10\" = 5 + (10/12) = 5,833 pés × 0,3048 = 1,778 m."
        },
        "considerations": {
          "title": "Conversões Comuns de Pés para Metros",
          "items": [
            {
              "text": "1 pé = 0,3048 m = 30,48 cm exatamente",
              "type": "info"
            },
            {
              "text": "3 pés (1 jarda) = 0,9144 m — ligeiramente menos que um metro",
              "type": "info"
            },
            {
              "text": "5 pés = 1,524 m — altura adulta baixa",
              "type": "info"
            },
            {
              "text": "5 pés 6 pol = 1,676 m — faixa de altura média",
              "type": "info"
            },
            {
              "text": "6 pés = 1,829 m — altura adulta alta",
              "type": "info"
            },
            {
              "text": "5.280 pés = 1 milha = 1.609,344 m",
              "type": "info"
            }
          ]
        },
        "heightChart": {
          "title": "Tabela de Altura: Pés para Metros",
          "items": [
            {
              "text": "5'0\" = 1,524 m = 152,4 cm",
              "type": "info"
            },
            {
              "text": "5'4\" = 1,626 m = 162,6 cm — altura média feminina nos EUA",
              "type": "info"
            },
            {
              "text": "5'7\" = 1,702 m = 170,2 cm",
              "type": "info"
            },
            {
              "text": "5'9\" = 1,753 m = 175,3 cm — altura média masculina nos EUA",
              "type": "info"
            },
            {
              "text": "6'0\" = 1,829 m = 182,9 cm",
              "type": "info"
            },
            {
              "text": "6'3\" = 1,905 m = 190,5 cm — bem acima da média",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Pés para Metros",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Converter 5'10\" para metros",
              "steps": [
                "5 pés + 10 polegadas",
                "Total em polegadas: (5 × 12) + 10 = 70 pol",
                "70 × 0,0254 = 1,778 m",
                "Ou: 5,833 pés × 0,3048 = 1,778 m"
              ],
              "result": "5'10\" = 1,778 m (177,8 cm)"
            },
            {
              "title": "Cômodo: 12 × 15 pés para metros",
              "steps": [
                "12 pés × 0,3048 = 3,658 m",
                "15 pés × 0,3048 = 4,572 m",
                "Área: 12 × 15 = 180 pés²",
                "Em métrico: 3,66 × 4,57 = 16,72 m²"
              ],
              "result": "12 × 15 pés = 3,66 × 4,57 m (16,7 m²)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos metros tem 1 pé?",
          "answer": "1 pé equivale exatamente a 0,3048 metros (30,48 cm). Esta é uma definição exata, não uma aproximação. Para converter pés para metros, multiplique por 0,3048."
        },
        {
          "question": "Como converto pés e polegadas para metros?",
          "answer": "Converta primeiro para polegadas totais: (pés × 12) + polegadas. Depois multiplique por 0,0254 para obter metros. Exemplo: 5'8\" = 68 polegadas × 0,0254 = 1,727 m. Ou converta para pés decimais: 5 + 8/12 = 5,667 pés × 0,3048 = 1,727 m."
        },
        {
          "question": "Quanto é 6 pés em metros?",
          "answer": "6 pés = 1,8288 metros, comumente arredondado para 1,83 m. Em centímetros, são 182,88 cm."
        },
        {
          "question": "Quantos pés tem 1 metro?",
          "answer": "1 metro = 3,28084 pés ≈ 3 pés 3,4 pol. Um metro é ligeiramente maior que uma jarda (3 pés)."
        },
        {
          "question": "Como converto pés quadrados para metros quadrados?",
          "answer": "Divida pés quadrados por 10,764 para obter metros quadrados. Exemplo: 1.000 pés² ÷ 10,764 = 92,9 m². Este fator vem de (0,3048)² × 12² ... ou simplesmente (3,28084)² = 10,764."
        },
        {
          "question": "O metro é maior que o pé?",
          "answer": "Sim, significativamente. 1 metro = 3,281 pés, então um metro é cerca de 3,3 vezes maior que um pé. São necessários cerca de 3 pés e 3 polegadas para igualar 1 metro."
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
      "name": "Convertisseur Pieds vers Mètres",
      "slug": "calculateur-pieds-vers-metres",
      "subtitle": "Convertissez les pieds en mètres instantanément — parfait pour la taille, la construction et les mesures internationales.",
      "breadcrumb": "Pieds vers Mètres",
      "seo": {
        "title": "Convertisseur Pieds vers Mètres - Outil de Conversion de Longueur Gratuit",
        "description": "Convertissez les pieds en mètres instantanément. Parfait pour la taille, la construction, l'immobilier et les mesures internationales. Inclut tableau de référence et valeurs courantes.",
        "shortDescription": "Convertissez les pieds en mètres instantanément.",
        "keywords": [
          "pieds vers mètres",
          "convertisseur ft vers m",
          "convertir pieds en mètres",
          "tableau pieds vers mètres",
          "convertisseur taille pieds",
          "convertisseur pieds gratuit",
          "longueur impérial vers métrique"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Longueur",
          "helpText": "Entrez la valeur et sélectionnez l'unité"
        }
      },
      "results": {
        "meters": {
          "label": "Mètres"
        },
        "centimeters": {
          "label": "Centimètres"
        },
        "millimeters": {
          "label": "Millimètres"
        },
        "inches": {
          "label": "Pouces"
        },
        "kilometers": {
          "label": "Kilomètres"
        }
      },
      "presets": {
        "height6ft": {
          "label": "6 pieds",
          "description": "6 pi = 1,83 m"
        },
        "ceiling8ft": {
          "label": "8 pieds",
          "description": "Hauteur de plafond standard US"
        },
        "pool100ft": {
          "label": "100 pieds",
          "description": "Longueur de piscine ou bâtiment"
        }
      },
      "values": {
        "m": "m",
        "cm": "cm",
        "mm": "mm",
        "in": "po",
        "km": "km",
        "ft": "pi"
      },
      "formats": {
        "summary": "{ft} pi = {m} mètres"
      },
      "infoCards": {
        "results": {
          "title": "📏 Résultats de Conversion",
          "items": [
            {
              "label": "Mètres",
              "valueKey": "meters"
            },
            {
              "label": "Centimètres",
              "valueKey": "centimeters"
            },
            {
              "label": "Millimètres",
              "valueKey": "millimeters"
            },
            {
              "label": "Pouces",
              "valueKey": "inches"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Référence Rapide",
          "items": [
            {
              "label": "1 pied",
              "valueKey": "ref1"
            },
            {
              "label": "5 pieds",
              "valueKey": "ref5"
            },
            {
              "label": "10 pieds",
              "valueKey": "ref10"
            },
            {
              "label": "100 pieds",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Astuces de Conversion",
          "items": [
            "1 pied = exactement 0,3048 mètre — multipliez les pieds par 0,3 pour une estimation rapide.",
            "1 pied = 12 pouces = 30,48 cm exactement.",
            "Astuce : divisez les pieds par 3,3 pour obtenir des mètres approximatifs.",
            "5 pieds = 1,524 m, 6 pieds = 1,829 m — références de taille utiles."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir les Pieds en Mètres",
          "content": "Pour convertir les pieds en mètres, multipliez par 0,3048. Un pied équivaut exactement à 0,3048 mètre (30,48 cm). Cette relation exacte a été établie en 1959 par accord international. Le pied est utilisé depuis les civilisations antiques — son origine se rapporte à la longueur d'un pied humain. Aujourd'hui, il est principalement utilisé aux États-Unis et au Royaume-Uni (pour la taille). Presque tous les autres pays utilisent le mètre, qui est l'unité de base SI de longueur définie par la vitesse de la lumière."
        },
        "howItWorks": {
          "title": "La Formule Pieds vers Mètres",
          "content": "La formule est : mètres = pieds × 0,3048. C'est un facteur de conversion exact. Pour les pieds et pouces combinés, convertissez d'abord en pieds totaux : pieds totaux = pieds + (pouces / 12), puis multipliez par 0,3048. Alternativement, convertissez les pieds en pouces (× 12), ajoutez les pouces restants, puis multipliez par 0,0254. Exemple : 5'10\" = 5 + (10/12) = 5,833 pi × 0,3048 = 1,778 m."
        },
        "considerations": {
          "title": "Conversions Courantes Pieds vers Mètres",
          "items": [
            {
              "text": "1 pi = 0,3048 m = 30,48 cm exactement",
              "type": "info"
            },
            {
              "text": "3 pi (1 verge) = 0,9144 m — légèrement moins qu'un mètre",
              "type": "info"
            },
            {
              "text": "5 pi = 1,524 m — taille d'adulte petite",
              "type": "info"
            },
            {
              "text": "5 pi 6 po = 1,676 m — gamme de taille moyenne",
              "type": "info"
            },
            {
              "text": "6 pi = 1,829 m — taille d'adulte grande",
              "type": "info"
            },
            {
              "text": "5 280 pi = 1 mille = 1 609,344 m",
              "type": "info"
            }
          ]
        },
        "heightChart": {
          "title": "Tableau de Taille : Pieds vers Mètres",
          "items": [
            {
              "text": "5'0\" = 1,524 m = 152,4 cm",
              "type": "info"
            },
            {
              "text": "5'4\" = 1,626 m = 162,6 cm — taille moyenne femme US",
              "type": "info"
            },
            {
              "text": "5'7\" = 1,702 m = 170,2 cm",
              "type": "info"
            },
            {
              "text": "5'9\" = 1,753 m = 175,3 cm — taille moyenne homme US",
              "type": "info"
            },
            {
              "text": "6'0\" = 1,829 m = 182,9 cm",
              "type": "info"
            },
            {
              "text": "6'3\" = 1,905 m = 190,5 cm — bien au-dessus de la moyenne",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples Pieds vers Mètres",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Convertir 5'10\" en mètres",
              "steps": [
                "5 pieds + 10 pouces",
                "Pouces totaux : (5 × 12) + 10 = 70 po",
                "70 × 0,0254 = 1,778 m",
                "Ou : 5,833 pi × 0,3048 = 1,778 m"
              ],
              "result": "5'10\" = 1,778 m (177,8 cm)"
            },
            {
              "title": "Pièce : 12 × 15 pieds vers mètres",
              "steps": [
                "12 pi × 0,3048 = 3,658 m",
                "15 pi × 0,3048 = 4,572 m",
                "Surface : 12 × 15 = 180 pi²",
                "En métrique : 3,66 × 4,57 = 16,72 m²"
              ],
              "result": "12 × 15 pi = 3,66 × 4,57 m (16,7 m²)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de mètres fait 1 pied ?",
          "answer": "1 pied équivaut exactement à 0,3048 mètre (30,48 cm). C'est une définition exacte, pas une approximation. Pour convertir les pieds en mètres, multipliez par 0,3048."
        },
        {
          "question": "Comment convertir les pieds et pouces en mètres ?",
          "answer": "Convertissez d'abord en pouces totaux : (pieds × 12) + pouces. Puis multipliez par 0,0254 pour obtenir les mètres. Exemple : 5'8\" = 68 pouces × 0,0254 = 1,727 m. Ou convertissez en pieds décimaux : 5 + 8/12 = 5,667 pi × 0,3048 = 1,727 m."
        },
        {
          "question": "Combien font 6 pieds en mètres ?",
          "answer": "6 pieds = 1,8288 mètre, couramment arrondi à 1,83 m. En centimètres, cela fait 182,88 cm."
        },
        {
          "question": "Combien de pieds fait 1 mètre ?",
          "answer": "1 mètre = 3,28084 pieds ≈ 3 pi 3,4 po. Un mètre est légèrement plus long qu'une verge (3 pieds)."
        },
        {
          "question": "Comment convertir les pieds carrés en mètres carrés ?",
          "answer": "Divisez les pieds carrés par 10,764 pour obtenir les mètres carrés. Exemple : 1 000 pi² ÷ 10,764 = 92,9 m². Ce facteur provient de (0,3048)² × 12² ... ou simplement (3,28084)² = 10,764."
        },
        {
          "question": "Un mètre est-il plus grand qu'un pied ?",
          "answer": "Oui, significativement. 1 mètre = 3,281 pieds, donc un mètre est environ 3,3 fois plus long qu'un pied. Il faut environ 3 pieds et 3 pouces pour égaler 1 mètre."
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
      "name": "Fuß zu Meter Umrechner",
      "slug": "fuss-zu-meter-rechner",
      "subtitle": "Rechnen Sie Fuß in Meter sofort um — ideal für Körpergröße, Bauwesen und internationale Maße.",
      "breadcrumb": "Fuß zu Meter",
      "seo": {
        "title": "Fuß zu Meter Umrechner - Kostenloses Längenumrechnungstool",
        "description": "Rechnen Sie Fuß in Meter sofort um. Perfekt für Körpergröße, Bauwesen, Immobilien und internationale Maße. Enthält Referenztabelle und häufige Werte.",
        "shortDescription": "Rechnen Sie Fuß in Meter sofort um.",
        "keywords": [
          "fuß zu meter",
          "ft zu m umrechner",
          "fuß in meter umrechnen",
          "fuß zu meter tabelle",
          "größe umrechner fuß",
          "kostenloser fuß umrechner",
          "imperial zu metrisch länge"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Länge",
          "helpText": "Wert eingeben und Einheit auswählen"
        }
      },
      "results": {
        "meters": {
          "label": "Meter"
        },
        "centimeters": {
          "label": "Zentimeter"
        },
        "millimeters": {
          "label": "Millimeter"
        },
        "inches": {
          "label": "Zoll"
        },
        "kilometers": {
          "label": "Kilometer"
        }
      },
      "presets": {
        "height6ft": {
          "label": "6 Fuß",
          "description": "6 ft = 1,83 m"
        },
        "ceiling8ft": {
          "label": "8 Fuß",
          "description": "Standard US-Deckenhöhe"
        },
        "pool100ft": {
          "label": "100 Fuß",
          "description": "Pool- oder Gebäudelänge"
        }
      },
      "values": {
        "m": "m",
        "cm": "cm",
        "mm": "mm",
        "in": "in",
        "km": "km",
        "ft": "ft"
      },
      "formats": {
        "summary": "{ft} ft = {m} Meter"
      },
      "infoCards": {
        "results": {
          "title": "📏 Umrechnungsergebnisse",
          "items": [
            {
              "label": "Meter",
              "valueKey": "meters"
            },
            {
              "label": "Zentimeter",
              "valueKey": "centimeters"
            },
            {
              "label": "Millimeter",
              "valueKey": "millimeters"
            },
            {
              "label": "Zoll",
              "valueKey": "inches"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Schnellreferenz",
          "items": [
            {
              "label": "1 Fuß",
              "valueKey": "ref1"
            },
            {
              "label": "5 Fuß",
              "valueKey": "ref5"
            },
            {
              "label": "10 Fuß",
              "valueKey": "ref10"
            },
            {
              "label": "100 Fuß",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Umrechnungstipps",
          "items": [
            "1 Fuß = genau 0,3048 Meter — multiplizieren Sie Fuß mit 0,3 für eine schnelle Schätzung.",
            "1 Fuß = 12 Zoll = genau 30,48 cm.",
            "Schnell: teilen Sie Fuß durch 3,3 um ungefähre Meter zu erhalten.",
            "5 Fuß = 1,524 m, 6 Fuß = 1,829 m — nützliche Größenreferenzen."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie man Fuß in Meter umrechnet",
          "content": "Um Fuß in Meter umzurechnen, multiplizieren Sie mit 0,3048. Ein Fuß entspricht genau 0,3048 Metern (30,48 cm). Diese exakte Beziehung wurde 1959 durch internationale Vereinbarung festgelegt. Der Fuß wird seit alten Zivilisationen verwendet — sein Ursprung bezieht sich auf die Länge eines menschlichen Fußes. Heute wird er hauptsächlich in den USA und Großbritannien (für Körpergröße) verwendet. Fast alle anderen Länder verwenden den Meter, der die SI-Basiseinheit der Länge ist und durch die Lichtgeschwindigkeit definiert wird."
        },
        "howItWorks": {
          "title": "Die Fuß zu Meter Formel",
          "content": "Die Formel lautet: Meter = Fuß × 0,3048. Dies ist ein exakter Umrechnungsfaktor. Für kombinierte Fuß und Zoll, erst in Gesamtfuß umrechnen: Gesamtfuß = Fuß + (Zoll / 12), dann mit 0,3048 multiplizieren. Alternativ Fuß in Zoll umrechnen (× 12), verbleibende Zoll addieren, dann mit 0,0254 multiplizieren. Beispiel: 5'10\" = 5 + (10/12) = 5,833 ft × 0,3048 = 1,778 m."
        },
        "considerations": {
          "title": "Häufige Fuß zu Meter Umrechnungen",
          "items": [
            {
              "text": "1 ft = 0,3048 m = 30,48 cm genau",
              "type": "info"
            },
            {
              "text": "3 ft (1 Yard) = 0,9144 m — etwas weniger als ein Meter",
              "type": "info"
            },
            {
              "text": "5 ft = 1,524 m — kleine Erwachsenengröße",
              "type": "info"
            },
            {
              "text": "5 ft 6 in = 1,676 m — durchschnittlicher Größenbereich",
              "type": "info"
            },
            {
              "text": "6 ft = 1,829 m — große Erwachsenengröße",
              "type": "info"
            },
            {
              "text": "5.280 ft = 1 Meile = 1.609,344 m",
              "type": "info"
            }
          ]
        },
        "heightChart": {
          "title": "Größentabelle: Fuß zu Meter",
          "items": [
            {
              "text": "5'0\" = 1,524 m = 152,4 cm",
              "type": "info"
            },
            {
              "text": "5'4\" = 1,626 m = 162,6 cm — durchschnittliche US-Frauengröße",
              "type": "info"
            },
            {
              "text": "5'7\" = 1,702 m = 170,2 cm",
              "type": "info"
            },
            {
              "text": "5'9\" = 1,753 m = 175,3 cm — durchschnittliche US-Männergröße",
              "type": "info"
            },
            {
              "text": "6'0\" = 1,829 m = 182,9 cm",
              "type": "info"
            },
            {
              "text": "6'3\" = 1,905 m = 190,5 cm — weit überdurchschnittlich",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Fuß zu Meter Beispiele",
          "description": "Schritt-für-Schritt Umrechnungen",
          "examples": [
            {
              "title": "5'10\" in Meter umrechnen",
              "steps": [
                "5 Fuß + 10 Zoll",
                "Gesamtzoll: (5 × 12) + 10 = 70 in",
                "70 × 0,0254 = 1,778 m",
                "Oder: 5,833 ft × 0,3048 = 1,778 m"
              ],
              "result": "5'10\" = 1,778 m (177,8 cm)"
            },
            {
              "title": "Raum: 12 × 15 Fuß in Meter",
              "steps": [
                "12 ft × 0,3048 = 3,658 m",
                "15 ft × 0,3048 = 4,572 m",
                "Fläche: 12 × 15 = 180 sq ft",
                "Metrisch: 3,66 × 4,57 = 16,72 m²"
              ],
              "result": "12 × 15 ft = 3,66 × 4,57 m (16,7 m²)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Meter sind 1 Fuß?",
          "answer": "1 Fuß entspricht genau 0,3048 Metern (30,48 cm). Dies ist eine exakte Definition, keine Näherung. Um Fuß in Meter umzurechnen, multiplizieren Sie mit 0,3048."
        },
        {
          "question": "Wie rechne ich Fuß und Zoll in Meter um?",
          "answer": "Rechnen Sie zuerst in Gesamtzoll um: (Fuß × 12) + Zoll. Dann mit 0,0254 multiplizieren für Meter. Beispiel: 5'8\" = 68 Zoll × 0,0254 = 1,727 m. Oder in Dezimalfuß: 5 + 8/12 = 5,667 ft × 0,3048 = 1,727 m."
        },
        {
          "question": "Was sind 6 Fuß in Metern?",
          "answer": "6 Fuß = 1,8288 Meter, üblicherweise auf 1,83 m gerundet. In Zentimetern sind das 182,88 cm."
        },
        {
          "question": "Wie viele Fuß sind 1 Meter?",
          "answer": "1 Meter = 3,28084 Fuß ≈ 3 ft 3,4 in. Ein Meter ist etwas länger als ein Yard (3 Fuß)."
        },
        {
          "question": "Wie rechne ich Quadratfuß in Quadratmeter um?",
          "answer": "Teilen Sie Quadratfuß durch 10,764 um Quadratmeter zu erhalten. Beispiel: 1.000 sq ft ÷ 10,764 = 92,9 m². Dieser Faktor ergibt sich aus (0,3048)² × 12² ... oder einfach (3,28084)² = 10,764."
        },
        {
          "question": "Ist ein Meter größer als ein Fuß?",
          "answer": "Ja, erheblich. 1 Meter = 3,281 Fuß, also ist ein Meter etwa 3,3 mal länger als ein Fuß. Es braucht etwa 3 Fuß und 3 Zoll um 1 Meter zu entsprechen."
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
      placeholder: "6",
      min: 0,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "meters", type: "primary", format: "text" },
    { id: "centimeters", type: "secondary", format: "text" },
    { id: "millimeters", type: "secondary", format: "text" },
    { id: "inches", type: "secondary", format: "text" },
    { id: "kilometers", type: "secondary", format: "text" },
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
    { id: "heightChart", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Length Specifications", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "Feet to Meters" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["meters-to-feet", "inches-to-cm", "length-converter"],
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

export function calculateFeetToMeters(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "ft";
  const meters = convertToBase(amount, fromUnit, "length");

  const cm = meters * 100;
  const mm = meters * 1000;
  const inches = meters / 0.0254;
  const km = meters / 1000;

  const ref1 = 0.3048;
  const ref5 = 5 * 0.3048;
  const ref10 = 10 * 0.3048;
  const ref100 = 100 * 0.3048;

  return {
    values: { meters, centimeters: cm, millimeters: mm, inches, kilometers: km },
    formatted: {
      meters: `${fmtNum(meters)} m`,
      centimeters: `${fmtNum(cm)} cm`,
      millimeters: `${fmtNum(mm)} mm`,
      inches: `${fmtNum(inches)} in`,
      kilometers: `${fmtNum(km)} km`,
      ref1: `${fmtNum(ref1)} m`,
      ref5: `${fmtNum(ref5)} m`,
      ref10: `${fmtNum(ref10)} m`,
      ref100: `${fmtNum(ref100)} m`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(meters)} m = ${fmtNum(cm)} cm`,
    isValid: true,
  };
}

export default feetToMetersConverterConfig;
