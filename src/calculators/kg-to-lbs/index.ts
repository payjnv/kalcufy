import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// KG TO LBS CONVERTER - V4 (EN ONLY)
// ============================================================================

export const kgToLbsConverterConfig: CalculatorConfigV4 = {
  id: "kg-to-lbs",
  version: "4.0",
  category: "conversion",
  icon: "⚖️",

  presets: [
    { id: "kg1", icon: "📦", values: { amount: 1 } },
    { id: "kg50", icon: "🧳", values: { amount: 50 } },
    { id: "kg100", icon: "🏋️", values: { amount: 100 } },
  ],

  t: {
    en: {
      name: "KG to LBS Converter",
      slug: "kg-to-lbs",
      subtitle: "Convert kilograms to pounds instantly — essential for travel, fitness, shipping, and cooking.",
      breadcrumb: "KG to LBS",

      seo: {
        title: "KG to LBS Converter - Free Weight Conversion Tool",
        description: "Convert kilograms to pounds instantly. Essential for travel luggage, gym weights, shipping, and cooking. Includes ounces breakdown and quick reference table.",
        shortDescription: "Convert kilograms to pounds instantly.",
        keywords: ["kg to lbs", "kilograms to pounds", "kg to pounds converter", "convert kg to lbs", "weight converter", "free kg converter", "metric to imperial weight"],
      },

      calculator: { yourInformation: "KG to LBS" },
      ui: { yourInformation: "KG to LBS", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Weight", helpText: "Enter value and select unit" },
      },

      results: {
        pounds: { label: "Pounds" },
        poundsOz: { label: "Pounds & Ounces" },
        ounces: { label: "Total Ounces" },
        grams: { label: "Grams" },
        stones: { label: "Stones & Pounds (UK)" },
      },

      presets: {
        kg1: { label: "1 kg", description: "2.205 lbs" },
        kg50: { label: "50 kg", description: "Luggage limit ~110 lbs" },
        kg100: { label: "100 kg", description: "220.5 lbs" },
      },

      values: { "lbs": "lbs", "oz": "oz", "g": "g", "kg": "kg", "st": "st" },
      formats: { summary: "{kg} kg = {lbs} lbs" },

      infoCards: {
        results: {
          title: "⚖️ Conversion Results",
          items: [
            { label: "Pounds", valueKey: "pounds" },
            { label: "Pounds & Ounces", valueKey: "poundsOz" },
            { label: "Total Ounces", valueKey: "ounces" },
            { label: "Stones (UK)", valueKey: "stones" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 kg", valueKey: "ref1" },
            { label: "5 kg", valueKey: "ref5" },
            { label: "10 kg", valueKey: "ref10" },
            { label: "25 kg", valueKey: "ref25" },
          ],
        },
        tips: {
          title: "💡 Weight Tips",
          items: [
            "1 kg = 2.20462 lbs — multiply kg by 2.2 for a quick estimate.",
            "Airline luggage: typically 23 kg (50 lbs) checked, 7 kg (15 lbs) carry-on.",
            "Gym plates: 20 kg = 44 lbs, 25 kg = 55 lbs — common Olympic sizes.",
            "Body weight: 70 kg = 154 lbs, 80 kg = 176 lbs, 90 kg = 198 lbs.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert KG to Pounds",
          content: "To convert kilograms to pounds, multiply by 2.20462. One kilogram equals approximately 2.205 pounds. The kilogram is the base unit of mass in the SI (metric) system, originally defined as the mass of 1 liter of water. The pound (lb) is used primarily in the US and was historically defined as 7,000 grains. Since 1959, 1 pound = 0.45359237 kg exactly. This conversion is needed daily for international travel, fitness tracking, shipping, cooking, and any cross-border weight comparison.",
        },
        howItWorks: {
          title: "The KG to LBS Formula",
          content: "The formula is: pounds = kilograms × 2.20462. For quick mental math, multiply by 2.2 (error < 0.2%). For pounds and ounces: multiply kg by 2.20462 to get total pounds, then take the decimal × 16 for ounces. For stones (UK): divide total pounds by 14. Example: 75 kg × 2.20462 = 165.35 lbs = 11 stone 11.3 lbs. The conversion factor 2.20462 is the reciprocal of 0.45359237.",
        },
        considerations: {
          title: "Common KG to LBS Conversions",
          items: [
            { text: "1 kg = 2.205 lbs — the fundamental conversion", type: "info" },
            { text: "5 kg = 11.02 lbs — common kitchen/shipping weight", type: "info" },
            { text: "10 kg = 22.05 lbs — standard bag of rice", type: "info" },
            { text: "23 kg = 50.7 lbs — airline checked luggage limit", type: "info" },
            { text: "50 kg = 110.2 lbs — lightweight adult", type: "info" },
            { text: "100 kg = 220.5 lbs — ~1/10 of a metric ton", type: "info" },
          ],
        },
        gymWeights: {
          title: "Gym & Fitness Weights (KG → LBS)",
          items: [
            { text: "2.5 kg plate = 5.5 lbs", type: "info" },
            { text: "5 kg plate = 11 lbs (closest: 10 lb plate)", type: "info" },
            { text: "10 kg plate = 22 lbs (closest: 25 lb plate)", type: "info" },
            { text: "20 kg plate = 44 lbs (closest: 45 lb plate)", type: "info" },
            { text: "20 kg Olympic bar = 44 lbs (standard barbell)", type: "info" },
            { text: "25 kg plate = 55 lbs (competition standard)", type: "info" },
          ],
        },
        examples: {
          title: "KG to LBS Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 75 kg body weight to lbs",
              steps: ["75 × 2.20462 = 165.35 lbs", "Pounds: 165 lbs", "Ounces: 0.35 × 16 = 5.5 oz", "In stones: 165.35 ÷ 14 = 11 st 11.3 lbs"],
              result: "75 kg = 165 lbs 5.5 oz (11 st 11 lbs)",
            },
            {
              title: "Luggage: 23 kg limit in pounds",
              steps: ["23 × 2.20462 = 50.7 lbs", "Most airlines allow 50 lbs (22.7 kg)", "23 kg is slightly over 50 lbs", "Pack to 22 kg to be safe: 48.5 lbs"],
              result: "23 kg = 50.7 lbs (just over 50 lb limit)",
            },
          ],
        },
      },

      faqs: [
        { question: "How many pounds is 1 kg?", answer: "1 kilogram equals 2.20462 pounds. For quick mental math, multiply kg by 2.2 — the error is less than 0.2%. For exact conversions, use 2.20462." },
        { question: "How do I convert kg to pounds and ounces?", answer: "Multiply kg by 2.20462 for total pounds. The whole number is pounds, and multiply the decimal by 16 for ounces. Example: 3.5 kg = 7.716 lbs → 7 lbs + (0.716 × 16) = 7 lbs 11.5 oz." },
        { question: "What is the difference between kg and lbs?", answer: "The kilogram is a metric unit used worldwide, while the pound is an imperial unit used mainly in the US. 1 kg = 2.205 lbs, or 1 lb = 0.4536 kg. The kg is about 2.2 times heavier than a pound." },
        { question: "How many kg is 200 pounds?", answer: "200 lbs = 90.72 kg (200 ÷ 2.20462). For quick estimation: 200 ÷ 2.2 ≈ 91 kg." },
        { question: "What is a stone in kg?", answer: "1 stone = 14 pounds = 6.35 kg. Stones are used in the UK and Ireland for body weight. Example: 12 stone = 168 lbs = 76.2 kg." },
        { question: "How much is 23 kg in pounds for luggage?", answer: "23 kg = 50.7 lbs. Most international airlines set checked luggage at 23 kg (≈50 lbs). Note that some airlines use 50 lbs (22.7 kg) as the limit, so 23 kg may be slightly over." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de KG a Libras",
      "slug": "calculadora-kilogramos-a-libras",
      "subtitle": "Convierte kilogramos a libras al instante — esencial para viajes, fitness, envíos y cocina.",
      "breadcrumb": "KG a Libras",
      "seo": {
        "title": "Convertidor de KG a Libras - Herramienta Gratuita de Conversión de Peso",
        "description": "Convierte kilogramos a libras al instante. Esencial para equipaje de viaje, pesas del gimnasio, envíos y cocina. Incluye desglose en onzas y tabla de referencia rápida.",
        "shortDescription": "Convierte kilogramos a libras al instante.",
        "keywords": [
          "kg a libras",
          "kilogramos a libras",
          "convertidor kg a libras",
          "convertir kg a lbs",
          "convertidor de peso",
          "convertidor kg gratis",
          "peso métrico a imperial"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Peso",
          "helpText": "Ingrese el valor y seleccione la unidad"
        }
      },
      "results": {
        "pounds": {
          "label": "Libras"
        },
        "poundsOz": {
          "label": "Libras y Onzas"
        },
        "ounces": {
          "label": "Onzas Totales"
        },
        "grams": {
          "label": "Gramos"
        },
        "stones": {
          "label": "Stones y Libras (Reino Unido)"
        }
      },
      "presets": {
        "kg1": {
          "label": "1 kg",
          "description": "2.205 lbs"
        },
        "kg50": {
          "label": "50 kg",
          "description": "Límite equipaje ~110 lbs"
        },
        "kg100": {
          "label": "100 kg",
          "description": "220.5 lbs"
        }
      },
      "values": {
        "lbs": "lbs",
        "oz": "oz",
        "g": "g",
        "kg": "kg",
        "st": "st"
      },
      "formats": {
        "summary": "{kg} kg = {lbs} lbs"
      },
      "infoCards": {
        "results": {
          "title": "⚖️ Resultados de Conversión",
          "items": [
            {
              "label": "Libras",
              "valueKey": "pounds"
            },
            {
              "label": "Libras y Onzas",
              "valueKey": "poundsOz"
            },
            {
              "label": "Onzas Totales",
              "valueKey": "ounces"
            },
            {
              "label": "Stones (Reino Unido)",
              "valueKey": "stones"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referencia Rápida",
          "items": [
            {
              "label": "1 kg",
              "valueKey": "ref1"
            },
            {
              "label": "5 kg",
              "valueKey": "ref5"
            },
            {
              "label": "10 kg",
              "valueKey": "ref10"
            },
            {
              "label": "25 kg",
              "valueKey": "ref25"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Peso",
          "items": [
            "1 kg = 2.20462 lbs — multiplica kg por 2.2 para una estimación rápida.",
            "Equipaje de aerolínea: típicamente 23 kg (50 lbs) facturado, 7 kg (15 lbs) equipaje de mano.",
            "Discos de gimnasio: 20 kg = 44 lbs, 25 kg = 55 lbs — tamaños olímpicos comunes.",
            "Peso corporal: 70 kg = 154 lbs, 80 kg = 176 lbs, 90 kg = 198 lbs."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir KG a Libras",
          "content": "Para convertir kilogramos a libras, multiplica por 2.20462. Un kilogramo equivale a aproximadamente 2.205 libras. El kilogramo es la unidad base de masa en el sistema SI (métrico), originalmente definido como la masa de 1 litro de agua. La libra (lb) se usa principalmente en Estados Unidos y fue históricamente definida como 7,000 granos. Desde 1959, 1 libra = 0.45359237 kg exactamente. Esta conversión se necesita diariamente para viajes internacionales, seguimiento de fitness, envíos, cocina y cualquier comparación de peso transfronteriza."
        },
        "howItWorks": {
          "title": "La Fórmula de KG a Libras",
          "content": "La fórmula es: libras = kilogramos × 2.20462. Para cálculo mental rápido, multiplica por 2.2 (error < 0.2%). Para libras y onzas: multiplica kg por 2.20462 para obtener libras totales, luego toma el decimal × 16 para onzas. Para stones (Reino Unido): divide libras totales por 14. Ejemplo: 75 kg × 2.20462 = 165.35 lbs = 11 stone 11.3 lbs. El factor de conversión 2.20462 es el recíproco de 0.45359237."
        },
        "considerations": {
          "title": "Conversiones Comunes de KG a Libras",
          "items": [
            {
              "text": "1 kg = 2.205 lbs — la conversión fundamental",
              "type": "info"
            },
            {
              "text": "5 kg = 11.02 lbs — peso común de cocina/envío",
              "type": "info"
            },
            {
              "text": "10 kg = 22.05 lbs — bolsa estándar de arroz",
              "type": "info"
            },
            {
              "text": "23 kg = 50.7 lbs — límite equipaje facturado aerolínea",
              "type": "info"
            },
            {
              "text": "50 kg = 110.2 lbs — adulto de peso ligero",
              "type": "info"
            },
            {
              "text": "100 kg = 220.5 lbs — ~1/10 de una tonelada métrica",
              "type": "info"
            }
          ]
        },
        "gymWeights": {
          "title": "Pesos de Gimnasio y Fitness (KG → Libras)",
          "items": [
            {
              "text": "Disco de 2.5 kg = 5.5 lbs",
              "type": "info"
            },
            {
              "text": "Disco de 5 kg = 11 lbs (más cercano: disco de 10 lbs)",
              "type": "info"
            },
            {
              "text": "Disco de 10 kg = 22 lbs (más cercano: disco de 25 lbs)",
              "type": "info"
            },
            {
              "text": "Disco de 20 kg = 44 lbs (más cercano: disco de 45 lbs)",
              "type": "info"
            },
            {
              "text": "Barra olímpica de 20 kg = 44 lbs (barra estándar)",
              "type": "info"
            },
            {
              "text": "Disco de 25 kg = 55 lbs (estándar de competición)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de KG a Libras",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Convertir 75 kg de peso corporal a libras",
              "steps": [
                "75 × 2.20462 = 165.35 lbs",
                "Libras: 165 lbs",
                "Onzas: 0.35 × 16 = 5.5 oz",
                "En stones: 165.35 ÷ 14 = 11 st 11.3 lbs"
              ],
              "result": "75 kg = 165 lbs 5.5 oz (11 st 11 lbs)"
            },
            {
              "title": "Equipaje: límite de 23 kg en libras",
              "steps": [
                "23 × 2.20462 = 50.7 lbs",
                "La mayoría de aerolíneas permiten 50 lbs (22.7 kg)",
                "23 kg está ligeramente sobre 50 lbs",
                "Empaca hasta 22 kg para estar seguro: 48.5 lbs"
              ],
              "result": "23 kg = 50.7 lbs (justo sobre el límite de 50 lbs)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántas libras son 1 kg?",
          "answer": "1 kilogramo equivale a 2.20462 libras. Para cálculo mental rápido, multiplica kg por 2.2 — el error es menor al 0.2%. Para conversiones exactas, usa 2.20462."
        },
        {
          "question": "¿Cómo convierto kg a libras y onzas?",
          "answer": "Multiplica kg por 2.20462 para obtener libras totales. El número entero son las libras, y multiplica el decimal por 16 para las onzas. Ejemplo: 3.5 kg = 7.716 lbs → 7 lbs + (0.716 × 16) = 7 lbs 11.5 oz."
        },
        {
          "question": "¿Cuál es la diferencia entre kg y libras?",
          "answer": "El kilogramo es una unidad métrica usada mundialmente, mientras que la libra es una unidad imperial usada principalmente en Estados Unidos. 1 kg = 2.205 lbs, o 1 lb = 0.4536 kg. El kg es aproximadamente 2.2 veces más pesado que una libra."
        },
        {
          "question": "¿Cuántos kg son 200 libras?",
          "answer": "200 lbs = 90.72 kg (200 ÷ 2.20462). Para estimación rápida: 200 ÷ 2.2 ≈ 91 kg."
        },
        {
          "question": "¿Qué es un stone en kg?",
          "answer": "1 stone = 14 libras = 6.35 kg. Los stones se usan en Reino Unido e Irlanda para peso corporal. Ejemplo: 12 stone = 168 lbs = 76.2 kg."
        },
        {
          "question": "¿Cuánto son 23 kg en libras para equipaje?",
          "answer": "23 kg = 50.7 lbs. La mayoría de aerolíneas internacionales establecen el equipaje facturado en 23 kg (≈50 lbs). Nota que algunas aerolíneas usan 50 lbs (22.7 kg) como límite, así que 23 kg puede estar ligeramente sobre el límite."
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
      "name": "Conversor KG para LBS",
      "slug": "calculadora-kg-para-lbs",
      "subtitle": "Converta quilogramas para libras instantaneamente — essencial para viagens, fitness, envio e culinária.",
      "breadcrumb": "KG para LBS",
      "seo": {
        "title": "Conversor KG para LBS - Ferramenta Gratuita de Conversão de Peso",
        "description": "Converta quilogramas para libras instantaneamente. Essencial para bagagem de viagem, pesos de academia, envio e culinária. Inclui divisão em onças e tabela de referência rápida.",
        "shortDescription": "Converta quilogramas para libras instantaneamente.",
        "keywords": [
          "kg para lbs",
          "quilogramas para libras",
          "conversor kg para libras",
          "converter kg para lbs",
          "conversor de peso",
          "conversor kg grátis",
          "peso métrico para imperial"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Peso",
          "helpText": "Digite o valor e selecione a unidade"
        }
      },
      "results": {
        "pounds": {
          "label": "Libras"
        },
        "poundsOz": {
          "label": "Libras e Onças"
        },
        "ounces": {
          "label": "Onças Totais"
        },
        "grams": {
          "label": "Gramas"
        },
        "stones": {
          "label": "Stones e Libras (Reino Unido)"
        }
      },
      "presets": {
        "kg1": {
          "label": "1 kg",
          "description": "2,205 lbs"
        },
        "kg50": {
          "label": "50 kg",
          "description": "Limite bagagem ~110 lbs"
        },
        "kg100": {
          "label": "100 kg",
          "description": "220,5 lbs"
        }
      },
      "values": {
        "lbs": "lbs",
        "oz": "oz",
        "g": "g",
        "kg": "kg",
        "st": "st"
      },
      "formats": {
        "summary": "{kg} kg = {lbs} lbs"
      },
      "infoCards": {
        "results": {
          "title": "⚖️ Resultados da Conversão",
          "items": [
            {
              "label": "Libras",
              "valueKey": "pounds"
            },
            {
              "label": "Libras e Onças",
              "valueKey": "poundsOz"
            },
            {
              "label": "Onças Totais",
              "valueKey": "ounces"
            },
            {
              "label": "Stones (Reino Unido)",
              "valueKey": "stones"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referência Rápida",
          "items": [
            {
              "label": "1 kg",
              "valueKey": "ref1"
            },
            {
              "label": "5 kg",
              "valueKey": "ref5"
            },
            {
              "label": "10 kg",
              "valueKey": "ref10"
            },
            {
              "label": "25 kg",
              "valueKey": "ref25"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Peso",
          "items": [
            "1 kg = 2,20462 lbs — multiplique kg por 2,2 para uma estimativa rápida.",
            "Bagagem aérea: tipicamente 23 kg (50 lbs) despachada, 7 kg (15 lbs) bagagem de mão.",
            "Anilhas de academia: 20 kg = 44 lbs, 25 kg = 55 lbs — tamanhos olímpicos comuns.",
            "Peso corporal: 70 kg = 154 lbs, 80 kg = 176 lbs, 90 kg = 198 lbs."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter KG para Libras",
          "content": "Para converter quilogramas para libras, multiplique por 2,20462. Um quilograma equivale a aproximadamente 2,205 libras. O quilograma é a unidade base de massa no sistema SI (métrico), originalmente definido como a massa de 1 litro de água. A libra (lb) é usada principalmente nos EUA e foi historicamente definida como 7.000 grãos. Desde 1959, 1 libra = 0,45359237 kg exatamente. Esta conversão é necessária diariamente para viagens internacionais, acompanhamento fitness, envio, culinária e qualquer comparação de peso entre países."
        },
        "howItWorks": {
          "title": "A Fórmula KG para LBS",
          "content": "A fórmula é: libras = quilogramas × 2,20462. Para cálculo mental rápido, multiplique por 2,2 (erro < 0,2%). Para libras e onças: multiplique kg por 2,20462 para obter libras totais, depois multiplique a parte decimal × 16 para onças. Para stones (Reino Unido): divida as libras totais por 14. Exemplo: 75 kg × 2,20462 = 165,35 lbs = 11 stone 11,3 lbs. O fator de conversão 2,20462 é o recíproco de 0,45359237."
        },
        "considerations": {
          "title": "Conversões Comuns KG para LBS",
          "items": [
            {
              "text": "1 kg = 2,205 lbs — a conversão fundamental",
              "type": "info"
            },
            {
              "text": "5 kg = 11,02 lbs — peso comum de cozinha/envio",
              "type": "info"
            },
            {
              "text": "10 kg = 22,05 lbs — saco padrão de arroz",
              "type": "info"
            },
            {
              "text": "23 kg = 50,7 lbs — limite bagagem despachada",
              "type": "info"
            },
            {
              "text": "50 kg = 110,2 lbs — adulto peso leve",
              "type": "info"
            },
            {
              "text": "100 kg = 220,5 lbs — ~1/10 de uma tonelada métrica",
              "type": "info"
            }
          ]
        },
        "gymWeights": {
          "title": "Pesos de Academia e Fitness (KG → LBS)",
          "items": [
            {
              "text": "Anilha 2,5 kg = 5,5 lbs",
              "type": "info"
            },
            {
              "text": "Anilha 5 kg = 11 lbs (mais próximo: anilha 10 lb)",
              "type": "info"
            },
            {
              "text": "Anilha 10 kg = 22 lbs (mais próximo: anilha 25 lb)",
              "type": "info"
            },
            {
              "text": "Anilha 20 kg = 44 lbs (mais próximo: anilha 45 lb)",
              "type": "info"
            },
            {
              "text": "Barra olímpica 20 kg = 44 lbs (barra padrão)",
              "type": "info"
            },
            {
              "text": "Anilha 25 kg = 55 lbs (padrão competição)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos KG para LBS",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Converter 75 kg peso corporal para lbs",
              "steps": [
                "75 × 2,20462 = 165,35 lbs",
                "Libras: 165 lbs",
                "Onças: 0,35 × 16 = 5,5 oz",
                "Em stones: 165,35 ÷ 14 = 11 st 11,3 lbs"
              ],
              "result": "75 kg = 165 lbs 5,5 oz (11 st 11 lbs)"
            },
            {
              "title": "Bagagem: limite 23 kg em libras",
              "steps": [
                "23 × 2,20462 = 50,7 lbs",
                "A maioria das companhias permite 50 lbs (22,7 kg)",
                "23 kg está ligeiramente acima de 50 lbs",
                "Embale até 22 kg para segurança: 48,5 lbs"
              ],
              "result": "23 kg = 50,7 lbs (pouco acima do limite 50 lb)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantas libras são 1 kg?",
          "answer": "1 quilograma equivale a 2,20462 libras. Para cálculo mental rápido, multiplique kg por 2,2 — o erro é menos de 0,2%. Para conversões exatas, use 2,20462."
        },
        {
          "question": "Como converter kg para libras e onças?",
          "answer": "Multiplique kg por 2,20462 para libras totais. O número inteiro são as libras, e multiplique a parte decimal por 16 para onças. Exemplo: 3,5 kg = 7,716 lbs → 7 lbs + (0,716 × 16) = 7 lbs 11,5 oz."
        },
        {
          "question": "Qual a diferença entre kg e lbs?",
          "answer": "O quilograma é uma unidade métrica usada mundialmente, enquanto a libra é uma unidade imperial usada principalmente nos EUA. 1 kg = 2,205 lbs, ou 1 lb = 0,4536 kg. O kg é cerca de 2,2 vezes mais pesado que uma libra."
        },
        {
          "question": "Quantos kg são 200 libras?",
          "answer": "200 lbs = 90,72 kg (200 ÷ 2,20462). Para estimativa rápida: 200 ÷ 2,2 ≈ 91 kg."
        },
        {
          "question": "O que é um stone em kg?",
          "answer": "1 stone = 14 libras = 6,35 kg. Stones são usados no Reino Unido e Irlanda para peso corporal. Exemplo: 12 stone = 168 lbs = 76,2 kg."
        },
        {
          "question": "Quanto são 23 kg em libras para bagagem?",
          "answer": "23 kg = 50,7 lbs. A maioria das companhias aéreas internacionais estabelece bagagem despachada em 23 kg (≈50 lbs). Note que algumas companhias usam 50 lbs (22,7 kg) como limite, então 23 kg pode estar ligeiramente acima."
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
      "name": "Convertisseur KG vers LBS",
      "slug": "calculateur-conversion-kg-vers-livres",
      "subtitle": "Convertissez les kilogrammes en livres instantanément — essentiel pour les voyages, le fitness, l'expédition et la cuisine.",
      "breadcrumb": "KG vers LBS",
      "seo": {
        "title": "Convertisseur KG vers LBS - Outil de Conversion de Poids Gratuit",
        "description": "Convertissez les kilogrammes en livres instantanément. Essentiel pour les bagages de voyage, les poids de gym, l'expédition et la cuisine. Inclut la répartition en onces et un tableau de référence rapide.",
        "shortDescription": "Convertissez les kilogrammes en livres instantanément.",
        "keywords": [
          "kg vers lbs",
          "kilogrammes vers livres",
          "convertisseur kg vers livres",
          "convertir kg en lbs",
          "convertisseur de poids",
          "convertisseur kg gratuit",
          "poids métrique vers impérial"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Poids",
          "helpText": "Entrez la valeur et sélectionnez l'unité"
        }
      },
      "results": {
        "pounds": {
          "label": "Livres"
        },
        "poundsOz": {
          "label": "Livres et Onces"
        },
        "ounces": {
          "label": "Onces Totales"
        },
        "grams": {
          "label": "Grammes"
        },
        "stones": {
          "label": "Stones et Livres (UK)"
        }
      },
      "presets": {
        "kg1": {
          "label": "1 kg",
          "description": "2,205 lbs"
        },
        "kg50": {
          "label": "50 kg",
          "description": "Limite bagages ~110 lbs"
        },
        "kg100": {
          "label": "100 kg",
          "description": "220,5 lbs"
        }
      },
      "values": {
        "lbs": "lbs",
        "oz": "oz",
        "g": "g",
        "kg": "kg",
        "st": "st"
      },
      "formats": {
        "summary": "{kg} kg = {lbs} lbs"
      },
      "infoCards": {
        "results": {
          "title": "⚖️ Résultats de Conversion",
          "items": [
            {
              "label": "Livres",
              "valueKey": "pounds"
            },
            {
              "label": "Livres et Onces",
              "valueKey": "poundsOz"
            },
            {
              "label": "Onces Totales",
              "valueKey": "ounces"
            },
            {
              "label": "Stones (UK)",
              "valueKey": "stones"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Référence Rapide",
          "items": [
            {
              "label": "1 kg",
              "valueKey": "ref1"
            },
            {
              "label": "5 kg",
              "valueKey": "ref5"
            },
            {
              "label": "10 kg",
              "valueKey": "ref10"
            },
            {
              "label": "25 kg",
              "valueKey": "ref25"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils de Poids",
          "items": [
            "1 kg = 2,20462 lbs — multipliez les kg par 2,2 pour une estimation rapide.",
            "Bagages aériens : généralement 23 kg (50 lbs) en soute, 7 kg (15 lbs) en cabine.",
            "Disques de gym : 20 kg = 44 lbs, 25 kg = 55 lbs — tailles olympiques courantes.",
            "Poids corporel : 70 kg = 154 lbs, 80 kg = 176 lbs, 90 kg = 198 lbs."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir les KG en Livres",
          "content": "Pour convertir les kilogrammes en livres, multipliez par 2,20462. Un kilogramme équivaut à environ 2,205 livres. Le kilogramme est l'unité de base de la masse dans le système SI (métrique), défini à l'origine comme la masse d'1 litre d'eau. La livre (lb) est utilisée principalement aux États-Unis et était historiquement définie comme 7 000 grains. Depuis 1959, 1 livre = 0,45359237 kg exactement. Cette conversion est nécessaire quotidiennement pour les voyages internationaux, le suivi de la forme physique, l'expédition, la cuisine et toute comparaison de poids transfrontalière."
        },
        "howItWorks": {
          "title": "La Formule KG vers LBS",
          "content": "La formule est : livres = kilogrammes × 2,20462. Pour un calcul mental rapide, multipliez par 2,2 (erreur < 0,2%). Pour les livres et onces : multipliez les kg par 2,20462 pour obtenir le total en livres, puis prenez la décimale × 16 pour les onces. Pour les stones (UK) : divisez le total en livres par 14. Exemple : 75 kg × 2,20462 = 165,35 lbs = 11 stone 11,3 lbs. Le facteur de conversion 2,20462 est l'inverse de 0,45359237."
        },
        "considerations": {
          "title": "Conversions KG vers LBS Courantes",
          "items": [
            {
              "text": "1 kg = 2,205 lbs — la conversion fondamentale",
              "type": "info"
            },
            {
              "text": "5 kg = 11,02 lbs — poids courant cuisine/expédition",
              "type": "info"
            },
            {
              "text": "10 kg = 22,05 lbs — sac de riz standard",
              "type": "info"
            },
            {
              "text": "23 kg = 50,7 lbs — limite bagages enregistrés aériens",
              "type": "info"
            },
            {
              "text": "50 kg = 110,2 lbs — adulte léger",
              "type": "info"
            },
            {
              "text": "100 kg = 220,5 lbs — ~1/10 d'une tonne métrique",
              "type": "info"
            }
          ]
        },
        "gymWeights": {
          "title": "Poids de Gym et Fitness (KG → LBS)",
          "items": [
            {
              "text": "Disque 2,5 kg = 5,5 lbs",
              "type": "info"
            },
            {
              "text": "Disque 5 kg = 11 lbs (plus proche : disque 10 lb)",
              "type": "info"
            },
            {
              "text": "Disque 10 kg = 22 lbs (plus proche : disque 25 lb)",
              "type": "info"
            },
            {
              "text": "Disque 20 kg = 44 lbs (plus proche : disque 45 lb)",
              "type": "info"
            },
            {
              "text": "Barre olympique 20 kg = 44 lbs (barre standard)",
              "type": "info"
            },
            {
              "text": "Disque 25 kg = 55 lbs (standard compétition)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples KG vers LBS",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Convertir 75 kg de poids corporel en lbs",
              "steps": [
                "75 × 2,20462 = 165,35 lbs",
                "Livres : 165 lbs",
                "Onces : 0,35 × 16 = 5,5 oz",
                "En stones : 165,35 ÷ 14 = 11 st 11,3 lbs"
              ],
              "result": "75 kg = 165 lbs 5,5 oz (11 st 11 lbs)"
            },
            {
              "title": "Bagages : limite 23 kg en livres",
              "steps": [
                "23 × 2,20462 = 50,7 lbs",
                "La plupart des compagnies autorisent 50 lbs (22,7 kg)",
                "23 kg dépasse légèrement 50 lbs",
                "Emballer à 22 kg pour être sûr : 48,5 lbs"
              ],
              "result": "23 kg = 50,7 lbs (juste au-dessus de la limite 50 lb)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de livres font 1 kg ?",
          "answer": "1 kilogramme équivaut à 2,20462 livres. Pour un calcul mental rapide, multipliez les kg par 2,2 — l'erreur est inférieure à 0,2%. Pour des conversions exactes, utilisez 2,20462."
        },
        {
          "question": "Comment convertir les kg en livres et onces ?",
          "answer": "Multipliez les kg par 2,20462 pour le total en livres. Le nombre entier représente les livres, et multipliez la décimale par 16 pour les onces. Exemple : 3,5 kg = 7,716 lbs → 7 lbs + (0,716 × 16) = 7 lbs 11,5 oz."
        },
        {
          "question": "Quelle est la différence entre kg et lbs ?",
          "answer": "Le kilogramme est une unité métrique utilisée dans le monde entier, tandis que la livre est une unité impériale utilisée principalement aux États-Unis. 1 kg = 2,205 lbs, ou 1 lb = 0,4536 kg. Le kg est environ 2,2 fois plus lourd qu'une livre."
        },
        {
          "question": "Combien de kg font 200 livres ?",
          "answer": "200 lbs = 90,72 kg (200 ÷ 2,20462). Pour une estimation rapide : 200 ÷ 2,2 ≈ 91 kg."
        },
        {
          "question": "Qu'est-ce qu'un stone en kg ?",
          "answer": "1 stone = 14 livres = 6,35 kg. Les stones sont utilisés au Royaume-Uni et en Irlande pour le poids corporel. Exemple : 12 stone = 168 lbs = 76,2 kg."
        },
        {
          "question": "Combien font 23 kg en livres pour les bagages ?",
          "answer": "23 kg = 50,7 lbs. La plupart des compagnies aériennes internationales fixent les bagages enregistrés à 23 kg (≈50 lbs). Notez que certaines compagnies utilisent 50 lbs (22,7 kg) comme limite, donc 23 kg peut légèrement dépasser."
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
      "name": "KG zu Pfund Umrechner",
      "slug": "kilogramm-zu-pfund-rechner",
      "subtitle": "Kilogramm sofort in Pfund umrechnen — unverzichtbar für Reisen, Fitness, Versand und Kochen.",
      "breadcrumb": "KG zu Pfund",
      "seo": {
        "title": "KG zu Pfund Umrechner - Kostenloses Gewicht-Umrechnungstool",
        "description": "Kilogramm sofort in Pfund umrechnen. Unverzichtbar für Reisegepäck, Trainingsgewichte, Versand und Kochen. Enthält Unzen-Aufschlüsselung und Schnellreferenztabelle.",
        "shortDescription": "Kilogramm sofort in Pfund umrechnen.",
        "keywords": [
          "kg zu pfund",
          "kilogramm zu pfund",
          "kg pfund umrechner",
          "kg in pfund umrechnen",
          "gewicht umrechner",
          "kostenloser kg umrechner",
          "metrisch zu imperial gewicht"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Gewicht",
          "helpText": "Wert eingeben und Einheit auswählen"
        }
      },
      "results": {
        "pounds": {
          "label": "Pfund"
        },
        "poundsOz": {
          "label": "Pfund & Unzen"
        },
        "ounces": {
          "label": "Unzen gesamt"
        },
        "grams": {
          "label": "Gramm"
        },
        "stones": {
          "label": "Stones & Pfund (UK)"
        }
      },
      "presets": {
        "kg1": {
          "label": "1 kg",
          "description": "2,205 Pfund"
        },
        "kg50": {
          "label": "50 kg",
          "description": "Gepäcklimit ~110 Pfund"
        },
        "kg100": {
          "label": "100 kg",
          "description": "220,5 Pfund"
        }
      },
      "values": {
        "lbs": "Pfd",
        "oz": "Unz",
        "g": "g",
        "kg": "kg",
        "st": "st"
      },
      "formats": {
        "summary": "{kg} kg = {lbs} Pfd"
      },
      "infoCards": {
        "results": {
          "title": "⚖️ Umrechnungsergebnisse",
          "items": [
            {
              "label": "Pfund",
              "valueKey": "pounds"
            },
            {
              "label": "Pfund & Unzen",
              "valueKey": "poundsOz"
            },
            {
              "label": "Unzen gesamt",
              "valueKey": "ounces"
            },
            {
              "label": "Stones (UK)",
              "valueKey": "stones"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Schnellreferenz",
          "items": [
            {
              "label": "1 kg",
              "valueKey": "ref1"
            },
            {
              "label": "5 kg",
              "valueKey": "ref5"
            },
            {
              "label": "10 kg",
              "valueKey": "ref10"
            },
            {
              "label": "25 kg",
              "valueKey": "ref25"
            }
          ]
        },
        "tips": {
          "title": "💡 Gewichtstipps",
          "items": [
            "1 kg = 2,20462 Pfd — multiplizieren Sie kg mit 2,2 für eine schnelle Schätzung.",
            "Flugzeuggepäck: normalerweise 23 kg (50 Pfd) aufgegeben, 7 kg (15 Pfd) Handgepäck.",
            "Hantelscheiben: 20 kg = 44 Pfd, 25 kg = 55 Pfd — übliche olympische Größen.",
            "Körpergewicht: 70 kg = 154 Pfd, 80 kg = 176 Pfd, 90 kg = 198 Pfd."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie man KG in Pfund umrechnet",
          "content": "Um Kilogramm in Pfund umzurechnen, multiplizieren Sie mit 2,20462. Ein Kilogramm entspricht etwa 2,205 Pfund. Das Kilogramm ist die Basiseinheit der Masse im SI (metrischen) System, ursprünglich definiert als die Masse von 1 Liter Wasser. Das Pfund (lb) wird hauptsächlich in den USA verwendet und war historisch als 7.000 Grains definiert. Seit 1959 gilt: 1 Pfund = 0,45359237 kg exakt. Diese Umrechnung wird täglich für internationale Reisen, Fitness-Tracking, Versand, Kochen und jeden grenzüberschreitenden Gewichtsvergleich benötigt."
        },
        "howItWorks": {
          "title": "Die KG zu Pfund Formel",
          "content": "Die Formel lautet: Pfund = Kilogramm × 2,20462. Für schnelle Kopfrechnung multiplizieren Sie mit 2,2 (Fehler < 0,2%). Für Pfund und Unzen: multiplizieren Sie kg mit 2,20462 um die Gesamtpfund zu erhalten, dann nehmen Sie die Dezimalstelle × 16 für Unzen. Für Stones (UK): teilen Sie Gesamtpfund durch 14. Beispiel: 75 kg × 2,20462 = 165,35 Pfd = 11 Stone 11,3 Pfd. Der Umrechnungsfaktor 2,20462 ist der Kehrwert von 0,45359237."
        },
        "considerations": {
          "title": "Häufige KG zu Pfund Umrechnungen",
          "items": [
            {
              "text": "1 kg = 2,205 Pfd — die grundlegende Umrechnung",
              "type": "info"
            },
            {
              "text": "5 kg = 11,02 Pfd — häufiges Küchen-/Versandgewicht",
              "type": "info"
            },
            {
              "text": "10 kg = 22,05 Pfd — Standard-Reissack",
              "type": "info"
            },
            {
              "text": "23 kg = 50,7 Pfd — Fluglinien-Gepäcklimit",
              "type": "info"
            },
            {
              "text": "50 kg = 110,2 Pfd — leichter Erwachsener",
              "type": "info"
            },
            {
              "text": "100 kg = 220,5 Pfd — ~1/10 einer metrischen Tonne",
              "type": "info"
            }
          ]
        },
        "gymWeights": {
          "title": "Fitness & Trainingsgewichte (KG → Pfund)",
          "items": [
            {
              "text": "2,5 kg Scheibe = 5,5 Pfd",
              "type": "info"
            },
            {
              "text": "5 kg Scheibe = 11 Pfd (nächste: 10 Pfd Scheibe)",
              "type": "info"
            },
            {
              "text": "10 kg Scheibe = 22 Pfd (nächste: 25 Pfd Scheibe)",
              "type": "info"
            },
            {
              "text": "20 kg Scheibe = 44 Pfd (nächste: 45 Pfd Scheibe)",
              "type": "info"
            },
            {
              "text": "20 kg Olympiastange = 44 Pfd (Standard-Hantelstange)",
              "type": "info"
            },
            {
              "text": "25 kg Scheibe = 55 Pfd (Wettkampfstandard)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "KG zu Pfund Beispiele",
          "description": "Schritt-für-Schritt Umrechnungen",
          "examples": [
            {
              "title": "75 kg Körpergewicht in Pfund umrechnen",
              "steps": [
                "75 × 2,20462 = 165,35 Pfd",
                "Pfund: 165 Pfd",
                "Unzen: 0,35 × 16 = 5,5 Unz",
                "In Stones: 165,35 ÷ 14 = 11 st 11,3 Pfd"
              ],
              "result": "75 kg = 165 Pfd 5,5 Unz (11 st 11 Pfd)"
            },
            {
              "title": "Gepäck: 23 kg Limit in Pfund",
              "steps": [
                "23 × 2,20462 = 50,7 Pfd",
                "Die meisten Fluglinien erlauben 50 Pfd (22,7 kg)",
                "23 kg ist etwas über 50 Pfd",
                "Packen Sie zu 22 kg um sicher zu sein: 48,5 Pfd"
              ],
              "result": "23 kg = 50,7 Pfd (knapp über 50 Pfd Limit)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Pfund sind 1 kg?",
          "answer": "1 Kilogramm entspricht 2,20462 Pfund. Für schnelle Kopfrechnung multiplizieren Sie kg mit 2,2 — der Fehler ist weniger als 0,2%. Für exakte Umrechnungen verwenden Sie 2,20462."
        },
        {
          "question": "Wie rechne ich kg in Pfund und Unzen um?",
          "answer": "Multiplizieren Sie kg mit 2,20462 für die Gesamtpfund. Die ganze Zahl sind Pfund, und multiplizieren Sie die Dezimalstelle mit 16 für Unzen. Beispiel: 3,5 kg = 7,716 Pfd → 7 Pfd + (0,716 × 16) = 7 Pfd 11,5 Unz."
        },
        {
          "question": "Was ist der Unterschied zwischen kg und Pfund?",
          "answer": "Das Kilogramm ist eine metrische Einheit, die weltweit verwendet wird, während das Pfund eine imperiale Einheit ist, die hauptsächlich in den USA verwendet wird. 1 kg = 2,205 Pfd, oder 1 Pfd = 0,4536 kg. Das kg ist etwa 2,2 mal schwerer als ein Pfund."
        },
        {
          "question": "Wie viele kg sind 200 Pfund?",
          "answer": "200 Pfd = 90,72 kg (200 ÷ 2,20462). Für schnelle Schätzung: 200 ÷ 2,2 ≈ 91 kg."
        },
        {
          "question": "Was ist ein Stone in kg?",
          "answer": "1 Stone = 14 Pfund = 6,35 kg. Stones werden im Vereinigten Königreich und Irland für Körpergewicht verwendet. Beispiel: 12 Stone = 168 Pfd = 76,2 kg."
        },
        {
          "question": "Wie viel sind 23 kg in Pfund für Gepäck?",
          "answer": "23 kg = 50,7 Pfd. Die meisten internationalen Fluglinien setzen aufgegebenes Gepäck auf 23 kg (≈50 Pfd). Beachten Sie, dass einige Fluglinien 50 Pfd (22,7 kg) als Limit verwenden, daher können 23 kg etwas darüber liegen."
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
      placeholder: "75",
      min: 0,
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "kg",
      allowedUnits: ["kg", "lbs", "st", "g", "oz"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "pounds", type: "primary", format: "text" },
    { id: "poundsOz", type: "secondary", format: "text" },
    { id: "ounces", type: "secondary", format: "text" },
    { id: "grams", type: "secondary", format: "text" },
    { id: "stones", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "⚖️", itemCount: 4 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "gymWeights", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Specifications for Mass/Weight", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-mass" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units — Mass", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "KG to LBS" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["lbs-to-kg", "length-converter", "bmi"],
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

export function calculateKgToLbs(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "kg";
  const kg = convertToBase(amount, fromUnit, "weight");

  const totalLbs = kg * 2.20462;
  const lbsPart = Math.floor(totalLbs);
  const ozPart = (totalLbs - lbsPart) * 16;
  const totalOz = kg * 35.274;
  const grams = kg * 1000;
  const totalStones = totalLbs / 14;
  const stPart = Math.floor(totalStones);
  const stLbsPart = totalLbs - stPart * 14;

  return {
    values: { pounds: totalLbs, poundsOz: totalLbs, ounces: totalOz, grams, stones: totalStones },
    formatted: {
      pounds: `${fmtNum(totalLbs)} lbs`,
      poundsOz: `${lbsPart} lbs ${fmtNum(Math.round(ozPart * 10) / 10)} oz`,
      ounces: `${fmtNum(totalOz)} oz`,
      grams: `${fmtNum(grams)} g`,
      stones: `${stPart} st ${fmtNum(Math.round(stLbsPart * 10) / 10)} lbs`,
      ref1: `${fmtNum(1 * 2.20462)} lbs`,
      ref5: `${fmtNum(5 * 2.20462)} lbs`,
      ref10: `${fmtNum(10 * 2.20462)} lbs`,
      ref25: `${fmtNum(25 * 2.20462)} lbs`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(totalLbs)} lbs`,
    isValid: true,
  };
}

export default kgToLbsConverterConfig;
