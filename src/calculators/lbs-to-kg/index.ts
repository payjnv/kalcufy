import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// LBS TO KG CONVERTER - V4 (EN ONLY)
// ============================================================================

export const lbsToKgConverterConfig: CalculatorConfigV4 = {
  id: "lbs-to-kg",
  version: "4.0",
  category: "conversion",
  icon: "⚖️",

  presets: [
    { id: "lbs150", icon: "🧑", values: { amount: 150 } },
    { id: "lbs200", icon: "🏋️", values: { amount: 200 } },
    { id: "plate45", icon: "🏋️‍♂️", values: { amount: 45 } },
  ],

  t: {
    en: {
      name: "LBS to KG Converter",
      slug: "lbs-to-kg",
      subtitle: "Convert pounds to kilograms instantly — perfect for fitness, travel, shipping, and cooking.",
      breadcrumb: "LBS to KG",

      seo: {
        title: "LBS to KG Converter - Free Weight Conversion Tool",
        description: "Convert pounds to kilograms instantly. Perfect for fitness tracking, international travel, shipping, and recipes. Includes ounces-to-grams and common weight references.",
        shortDescription: "Convert pounds to kilograms instantly.",
        keywords: ["lbs to kg", "pounds to kilograms", "lbs to kg converter", "convert pounds to kg", "weight converter", "free lbs converter", "imperial to metric weight"],
      },

      calculator: { yourInformation: "LBS to KG" },
      ui: { yourInformation: "LBS to KG", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Weight", helpText: "Enter value and select unit" },
      },

      results: {
        kilograms: { label: "Kilograms" },
        grams: { label: "Grams" },
        ounces: { label: "Total Ounces" },
        stones: { label: "Stones & Pounds (UK)" },
        metricTons: { label: "Metric Tons" },
      },

      presets: {
        lbs150: { label: "150 lbs", description: "68 kg — average weight" },
        lbs200: { label: "200 lbs", description: "90.7 kg — above average" },
        plate45: { label: "45 lbs", description: "Standard barbell plate (~20.4 kg)" },
      },

      values: { "kg": "kg", "g": "g", "oz": "oz", "st": "st", "t": "t", "lbs": "lbs" },
      formats: { summary: "{lbs} lbs = {kg} kg" },

      infoCards: {
        results: {
          title: "⚖️ Conversion Results",
          items: [
            { label: "Kilograms", valueKey: "kilograms" },
            { label: "Grams", valueKey: "grams" },
            { label: "Total Ounces", valueKey: "ounces" },
            { label: "Stones (UK)", valueKey: "stones" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 lb", valueKey: "ref1" },
            { label: "10 lbs", valueKey: "ref10" },
            { label: "50 lbs", valueKey: "ref50" },
            { label: "100 lbs", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "💡 Weight Tips",
          items: [
            "Divide lbs by 2.2 for a quick kg estimate — close enough for most uses.",
            "Airline luggage: 50 lbs = 22.7 kg (most airlines allow 23 kg).",
            "Gym: 45 lb plate = 20.4 kg (Olympic plates are 20 kg = 44 lbs).",
            "Body weight: 150 lbs = 68 kg, 180 lbs = 82 kg, 200 lbs = 91 kg.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Pounds to Kilograms",
          content: "To convert pounds to kilograms, divide by 2.20462 (or multiply by 0.453592). One pound equals exactly 0.45359237 kilograms by international definition. The pound (abbreviated lb, from the Latin 'libra') is the primary unit of weight in the US customary system. The kilogram is the SI base unit of mass, used by virtually every country except the US. Converting between these units is one of the most common daily conversions for international travelers, fitness enthusiasts, and online shoppers.",
        },
        howItWorks: {
          title: "The LBS to KG Formula",
          content: "The formula is: kilograms = pounds × 0.453592. For quick mental math, divide pounds by 2.2 (error < 0.2%). For grams: multiply the kg result by 1000. For stones: divide pounds by 14. Example: 180 lbs × 0.453592 = 81.65 kg = 81,647 g. Or quickly: 180 ÷ 2.2 ≈ 81.8 kg. The exact factor 0.45359237 kg/lb is the international definition since 1959.",
        },
        considerations: {
          title: "Common LBS to KG Conversions",
          items: [
            { text: "1 lb = 0.4536 kg = 453.6 g — the fundamental conversion", type: "info" },
            { text: "10 lbs = 4.536 kg — bag of potatoes", type: "info" },
            { text: "50 lbs = 22.68 kg — airline luggage limit", type: "info" },
            { text: "100 lbs = 45.36 kg — round number reference", type: "info" },
            { text: "150 lbs = 68.04 kg — average adult weight", type: "info" },
            { text: "200 lbs = 90.72 kg — above-average adult weight", type: "info" },
          ],
        },
        shippingWeights: {
          title: "Shipping & Package Weights",
          items: [
            { text: "USPS First Class: up to 13 oz (0.37 kg)", type: "info" },
            { text: "USPS Priority Mail: up to 70 lbs (31.75 kg)", type: "info" },
            { text: "FedEx/UPS standard: up to 150 lbs (68 kg)", type: "info" },
            { text: "Amazon Prime box: typically 1-5 lbs (0.5-2.3 kg)", type: "info" },
            { text: "Airline carry-on: 15-22 lbs (7-10 kg) varies by airline", type: "info" },
            { text: "Airline checked: 50 lbs (23 kg) economy, 70 lbs (32 kg) business", type: "info" },
          ],
        },
        examples: {
          title: "LBS to KG Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 185 lbs body weight to kg",
              steps: ["185 × 0.453592 = 83.91 kg", "Quick check: 185 ÷ 2.2 = 84.1 kg (close)", "In grams: 83,915 g", "In stones: 185 ÷ 14 = 13 st 3 lbs"],
              result: "185 lbs = 83.9 kg (13 st 3 lbs)",
            },
            {
              title: "Shipping package: 12 lbs 8 oz to kg",
              steps: ["Convert to decimal lbs: 12 + 8/16 = 12.5 lbs", "12.5 × 0.453592 = 5.67 kg", "In grams: 5,670 g", "Under most shipping limits"],
              result: "12 lbs 8 oz = 5.67 kg",
            },
          ],
        },
      },

      faqs: [
        { question: "How many kg is 1 pound?", answer: "1 pound equals exactly 0.45359237 kilograms (commonly rounded to 0.4536 kg). For quick mental math, divide pounds by 2.2 to get kg." },
        { question: "How do I convert lbs to kg quickly?", answer: "Divide by 2.2 for a fast estimate. For more accuracy, multiply by 0.4536. Example: 180 lbs ÷ 2.2 ≈ 81.8 kg (exact: 81.65 kg). The error with ÷2.2 is less than 0.2%." },
        { question: "How many kg is 200 lbs?", answer: "200 lbs = 90.72 kg. Quick check: 200 ÷ 2.2 = 90.9 kg. This is close to the metric \"round number\" of 91 kg." },
        { question: "What is the difference between lbs and kg?", answer: "The pound (lb) is an imperial unit used in the US, while the kilogram (kg) is a metric unit used worldwide. 1 kg = 2.205 lbs, so a kg is about 2.2× heavier than a lb. Technically, kg measures mass while lb measures force (weight), but in everyday use they're interchangeable." },
        { question: "How much is 50 lbs in kg for luggage?", answer: "50 lbs = 22.68 kg. Most international airlines set the checked luggage limit at 23 kg, which is 50.7 lbs. So a 50-lb bag is just under the limit. Always check your specific airline's rules." },
        { question: "Is a 45 lb plate the same as 20 kg?", answer: "Close but not exact. A 45 lb plate = 20.41 kg, while a 20 kg plate = 44.09 lbs. The difference is about 0.9 lbs (0.41 kg). In competition, Olympic plates are calibrated in kg (20 kg), while most US gym plates are 45 lbs." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Conversor de Libras a Kilogramos",
      "slug": "calculadora-libras-a-kilogramos",
      "subtitle": "Convierte libras a kilogramos al instante — perfecto para fitness, viajes, envíos y cocina.",
      "breadcrumb": "Libras a KG",
      "seo": {
        "title": "Conversor de Libras a KG - Herramienta Gratuita de Conversión de Peso",
        "description": "Convierte libras a kilogramos al instante. Perfecto para seguimiento de fitness, viajes internacionales, envíos y recetas. Incluye onzas a gramos y referencias de peso comunes.",
        "shortDescription": "Convierte libras a kilogramos al instante.",
        "keywords": [
          "libras a kg",
          "libras a kilogramos",
          "conversor libras a kg",
          "convertir libras a kg",
          "conversor de peso",
          "conversor libras gratis",
          "peso imperial a métrico"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "amount": {
          "label": "Peso",
          "helpText": "Ingresa el valor y selecciona la unidad"
        }
      },
      "results": {
        "kilograms": {
          "label": "Kilogramos"
        },
        "grams": {
          "label": "Gramos"
        },
        "ounces": {
          "label": "Onzas Totales"
        },
        "stones": {
          "label": "Stones y Libras (Reino Unido)"
        },
        "metricTons": {
          "label": "Toneladas Métricas"
        }
      },
      "presets": {
        "lbs150": {
          "label": "150 lbs",
          "description": "68 kg — peso promedio"
        },
        "lbs200": {
          "label": "200 lbs",
          "description": "90.7 kg — por encima del promedio"
        },
        "plate45": {
          "label": "45 lbs",
          "description": "Disco de barra estándar (~20.4 kg)"
        }
      },
      "values": {
        "kg": "kg",
        "g": "g",
        "oz": "oz",
        "st": "st",
        "t": "t",
        "lbs": "lbs"
      },
      "formats": {
        "summary": "{lbs} lbs = {kg} kg"
      },
      "infoCards": {
        "results": {
          "title": "⚖️ Resultados de Conversión",
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
              "label": "1 lb",
              "valueKey": "ref1"
            },
            {
              "label": "10 lbs",
              "valueKey": "ref10"
            },
            {
              "label": "50 lbs",
              "valueKey": "ref50"
            },
            {
              "label": "100 lbs",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Peso",
          "items": [
            "Divide las libras entre 2.2 para una estimación rápida en kg — suficientemente preciso para la mayoría de usos.",
            "Equipaje de aerolínea: 50 lbs = 22.7 kg (la mayoría de aerolíneas permiten 23 kg).",
            "Gimnasio: disco de 45 lb = 20.4 kg (discos olímpicos son 20 kg = 44 lbs).",
            "Peso corporal: 150 lbs = 68 kg, 180 lbs = 82 kg, 200 lbs = 91 kg."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir Libras a Kilogramos",
          "content": "Para convertir libras a kilogramos, divide entre 2.20462 (o multiplica por 0.453592). Una libra equivale exactamente a 0.45359237 kilogramos por definición internacional. La libra (abreviada lb, del latín 'libra') es la unidad principal de peso en el sistema imperial estadounidense. El kilogramo es la unidad base SI de masa, usada por prácticamente todos los países excepto Estados Unidos. Convertir entre estas unidades es una de las conversiones diarias más comunes para viajeros internacionales, entusiastas del fitness y compradores en línea."
        },
        "howItWorks": {
          "title": "La Fórmula de Libras a KG",
          "content": "La fórmula es: kilogramos = libras × 0.453592. Para cálculo mental rápido, divide las libras entre 2.2 (error < 0.2%). Para gramos: multiplica el resultado en kg por 1000. Para stones: divide libras entre 14. Ejemplo: 180 lbs × 0.453592 = 81.65 kg = 81,647 g. O rápidamente: 180 ÷ 2.2 ≈ 81.8 kg. El factor exacto 0.45359237 kg/lb es la definición internacional desde 1959."
        },
        "considerations": {
          "title": "Conversiones Comunes de Libras a KG",
          "items": [
            {
              "text": "1 lb = 0.4536 kg = 453.6 g — la conversión fundamental",
              "type": "info"
            },
            {
              "text": "10 lbs = 4.536 kg — bolsa de papas",
              "type": "info"
            },
            {
              "text": "50 lbs = 22.68 kg — límite de equipaje de aerolínea",
              "type": "info"
            },
            {
              "text": "100 lbs = 45.36 kg — referencia de número redondo",
              "type": "info"
            },
            {
              "text": "150 lbs = 68.04 kg — peso promedio de adulto",
              "type": "info"
            },
            {
              "text": "200 lbs = 90.72 kg — peso de adulto por encima del promedio",
              "type": "info"
            }
          ]
        },
        "shippingWeights": {
          "title": "Pesos de Envío y Paquetes",
          "items": [
            {
              "text": "USPS Primera Clase: hasta 13 oz (0.37 kg)",
              "type": "info"
            },
            {
              "text": "USPS Priority Mail: hasta 70 lbs (31.75 kg)",
              "type": "info"
            },
            {
              "text": "FedEx/UPS estándar: hasta 150 lbs (68 kg)",
              "type": "info"
            },
            {
              "text": "Caja Amazon Prime: típicamente 1-5 lbs (0.5-2.3 kg)",
              "type": "info"
            },
            {
              "text": "Equipaje de mano: 15-22 lbs (7-10 kg) varía por aerolínea",
              "type": "info"
            },
            {
              "text": "Equipaje facturado: 50 lbs (23 kg) económica, 70 lbs (32 kg) ejecutiva",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Libras a KG",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Convertir 185 lbs de peso corporal a kg",
              "steps": [
                "185 × 0.453592 = 83.91 kg",
                "Verificación rápida: 185 ÷ 2.2 = 84.1 kg (cerca)",
                "En gramos: 83,915 g",
                "En stones: 185 ÷ 14 = 13 st 3 lbs"
              ],
              "result": "185 lbs = 83.9 kg (13 st 3 lbs)"
            },
            {
              "title": "Paquete de envío: 12 lbs 8 oz a kg",
              "steps": [
                "Convertir a libras decimales: 12 + 8/16 = 12.5 lbs",
                "12.5 × 0.453592 = 5.67 kg",
                "En gramos: 5,670 g",
                "Bajo la mayoría de límites de envío"
              ],
              "result": "12 lbs 8 oz = 5.67 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos kg es 1 libra?",
          "answer": "1 libra equivale exactamente a 0.45359237 kilogramos (comúnmente redondeado a 0.4536 kg). Para cálculo mental rápido, divide las libras entre 2.2 para obtener kg."
        },
        {
          "question": "¿Cómo convierto libras a kg rápidamente?",
          "answer": "Divide entre 2.2 para una estimación rápida. Para más precisión, multiplica por 0.4536. Ejemplo: 180 lbs ÷ 2.2 ≈ 81.8 kg (exacto: 81.65 kg). El error con ÷2.2 es menor al 0.2%."
        },
        {
          "question": "¿Cuántos kg son 200 lbs?",
          "answer": "200 lbs = 90.72 kg. Verificación rápida: 200 ÷ 2.2 = 90.9 kg. Esto está cerca del \"número redondo\" métrico de 91 kg."
        },
        {
          "question": "¿Cuál es la diferencia entre lbs y kg?",
          "answer": "La libra (lb) es una unidad imperial usada en EE.UU., mientras que el kilogramo (kg) es una unidad métrica usada mundialmente. 1 kg = 2.205 lbs, así que un kg es aproximadamente 2.2× más pesado que una lb. Técnicamente, kg mide masa mientras lb mide fuerza (peso), pero en uso cotidiano son intercambiables."
        },
        {
          "question": "¿Cuánto son 50 lbs en kg para equipaje?",
          "answer": "50 lbs = 22.68 kg. La mayoría de aerolíneas internacionales establecen el límite de equipaje facturado en 23 kg, que son 50.7 lbs. Así que una maleta de 50 lb está justo bajo el límite. Siempre verifica las reglas de tu aerolínea específica."
        },
        {
          "question": "¿Es un disco de 45 lb igual a 20 kg?",
          "answer": "Cerca pero no exacto. Un disco de 45 lb = 20.41 kg, mientras que un disco de 20 kg = 44.09 lbs. La diferencia es aproximadamente 0.9 lbs (0.41 kg). En competencia, los discos olímpicos están calibrados en kg (20 kg), mientras que la mayoría de discos de gimnasios estadounidenses son de 45 lbs."
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
      "name": "Conversor de LBS para KG",
      "slug": "calculadora-libras-para-quilogramas",
      "subtitle": "Converta libras para quilogramas instantaneamente — perfeito para fitness, viagens, envios e culinária.",
      "breadcrumb": "LBS para KG",
      "seo": {
        "title": "Conversor LBS para KG - Ferramenta Gratuita de Conversão de Peso",
        "description": "Converta libras para quilogramas instantaneamente. Perfeito para acompanhamento fitness, viagens internacionais, envios e receitas. Inclui conversão onças-gramas e referências de peso comuns.",
        "shortDescription": "Converta libras para quilogramas instantaneamente.",
        "keywords": [
          "lbs para kg",
          "libras para quilogramas",
          "conversor lbs para kg",
          "converter libras para kg",
          "conversor de peso",
          "conversor lbs gratuito",
          "peso imperial para métrico"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Peso",
          "helpText": "Digite o valor e selecione a unidade"
        }
      },
      "results": {
        "kilograms": {
          "label": "Quilogramas"
        },
        "grams": {
          "label": "Gramas"
        },
        "ounces": {
          "label": "Onças Totais"
        },
        "stones": {
          "label": "Stones e Libras (Reino Unido)"
        },
        "metricTons": {
          "label": "Toneladas Métricas"
        }
      },
      "presets": {
        "lbs150": {
          "label": "150 lbs",
          "description": "68 kg — peso médio"
        },
        "lbs200": {
          "label": "200 lbs",
          "description": "90,7 kg — acima da média"
        },
        "plate45": {
          "label": "45 lbs",
          "description": "Anilha padrão de barra (~20,4 kg)"
        }
      },
      "values": {
        "kg": "kg",
        "g": "g",
        "oz": "oz",
        "st": "st",
        "t": "t",
        "lbs": "lbs"
      },
      "formats": {
        "summary": "{lbs} lbs = {kg} kg"
      },
      "infoCards": {
        "results": {
          "title": "⚖️ Resultados da Conversão",
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
              "label": "1 lb",
              "valueKey": "ref1"
            },
            {
              "label": "10 lbs",
              "valueKey": "ref10"
            },
            {
              "label": "50 lbs",
              "valueKey": "ref50"
            },
            {
              "label": "100 lbs",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Peso",
          "items": [
            "Divida lbs por 2,2 para uma estimativa rápida de kg — suficientemente precisa para a maioria dos usos.",
            "Bagagem de avião: 50 lbs = 22,7 kg (a maioria das companhias permite 23 kg).",
            "Academia: anilha de 45 lb = 20,4 kg (anilhas olímpicas são 20 kg = 44 lbs).",
            "Peso corporal: 150 lbs = 68 kg, 180 lbs = 82 kg, 200 lbs = 91 kg."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter Libras para Quilogramas",
          "content": "Para converter libras para quilogramas, divida por 2,20462 (ou multiplique por 0,453592). Uma libra equivale exatamente a 0,45359237 quilogramas por definição internacional. A libra (abreviada lb, do latim 'libra') é a unidade principal de peso no sistema customário americano. O quilograma é a unidade base SI de massa, usado por praticamente todos os países exceto os EUA. Converter entre essas unidades é uma das conversões diárias mais comuns para viajantes internacionais, entusiastas do fitness e compradores online."
        },
        "howItWorks": {
          "title": "A Fórmula LBS para KG",
          "content": "A fórmula é: quilogramas = libras × 0,453592. Para cálculo mental rápido, divida libras por 2,2 (erro < 0,2%). Para gramas: multiplique o resultado em kg por 1000. Para stones: divida libras por 14. Exemplo: 180 lbs × 0,453592 = 81,65 kg = 81.647 g. Ou rapidamente: 180 ÷ 2,2 ≈ 81,8 kg. O fator exato 0,45359237 kg/lb é a definição internacional desde 1959."
        },
        "considerations": {
          "title": "Conversões Comuns de LBS para KG",
          "items": [
            {
              "text": "1 lb = 0,4536 kg = 453,6 g — a conversão fundamental",
              "type": "info"
            },
            {
              "text": "10 lbs = 4,536 kg — saco de batatas",
              "type": "info"
            },
            {
              "text": "50 lbs = 22,68 kg — limite de bagagem de avião",
              "type": "info"
            },
            {
              "text": "100 lbs = 45,36 kg — referência de número redondo",
              "type": "info"
            },
            {
              "text": "150 lbs = 68,04 kg — peso médio de adulto",
              "type": "info"
            },
            {
              "text": "200 lbs = 90,72 kg — peso de adulto acima da média",
              "type": "info"
            }
          ]
        },
        "shippingWeights": {
          "title": "Pesos de Envio e Encomendas",
          "items": [
            {
              "text": "USPS First Class: até 13 oz (0,37 kg)",
              "type": "info"
            },
            {
              "text": "USPS Priority Mail: até 70 lbs (31,75 kg)",
              "type": "info"
            },
            {
              "text": "FedEx/UPS padrão: até 150 lbs (68 kg)",
              "type": "info"
            },
            {
              "text": "Caixa Amazon Prime: tipicamente 1-5 lbs (0,5-2,3 kg)",
              "type": "info"
            },
            {
              "text": "Bagagem de mão: 15-22 lbs (7-10 kg) varia por companhia",
              "type": "info"
            },
            {
              "text": "Bagagem despachada: 50 lbs (23 kg) econômica, 70 lbs (32 kg) executiva",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de LBS para KG",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Converter 185 lbs de peso corporal para kg",
              "steps": [
                "185 × 0,453592 = 83,91 kg",
                "Verificação rápida: 185 ÷ 2,2 = 84,1 kg (próximo)",
                "Em gramas: 83.915 g",
                "Em stones: 185 ÷ 14 = 13 st 3 lbs"
              ],
              "result": "185 lbs = 83,9 kg (13 st 3 lbs)"
            },
            {
              "title": "Encomenda: 12 lbs 8 oz para kg",
              "steps": [
                "Converter para lbs decimais: 12 + 8/16 = 12,5 lbs",
                "12,5 × 0,453592 = 5,67 kg",
                "Em gramas: 5.670 g",
                "Dentro da maioria dos limites de envio"
              ],
              "result": "12 lbs 8 oz = 5,67 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos kg tem 1 libra?",
          "answer": "1 libra equivale exatamente a 0,45359237 quilogramas (comumente arredondado para 0,4536 kg). Para cálculo mental rápido, divida libras por 2,2 para obter kg."
        },
        {
          "question": "Como converter lbs para kg rapidamente?",
          "answer": "Divida por 2,2 para uma estimativa rápida. Para mais precisão, multiplique por 0,4536. Exemplo: 180 lbs ÷ 2,2 ≈ 81,8 kg (exato: 81,65 kg). O erro com ÷2,2 é menor que 0,2%."
        },
        {
          "question": "Quantos kg são 200 lbs?",
          "answer": "200 lbs = 90,72 kg. Verificação rápida: 200 ÷ 2,2 = 90,9 kg. Isso está próximo do \"número redondo\" métrico de 91 kg."
        },
        {
          "question": "Qual é a diferença entre lbs e kg?",
          "answer": "A libra (lb) é uma unidade imperial usada nos EUA, enquanto o quilograma (kg) é uma unidade métrica usada mundialmente. 1 kg = 2,205 lbs, então um kg é cerca de 2,2× mais pesado que uma lb. Tecnicamente, kg mede massa enquanto lb mede força (peso), mas no uso cotidiano são intercambiáveis."
        },
        {
          "question": "Quanto são 50 lbs em kg para bagagem?",
          "answer": "50 lbs = 22,68 kg. A maioria das companhias aéreas internacionais estabelece o limite de bagagem despachada em 23 kg, que são 50,7 lbs. Então uma mala de 50 lb está logo abaixo do limite. Sempre verifique as regras da sua companhia específica."
        },
        {
          "question": "Uma anilha de 45 lb é igual a 20 kg?",
          "answer": "Próximo mas não exato. Uma anilha de 45 lb = 20,41 kg, enquanto uma anilha de 20 kg = 44,09 lbs. A diferença é cerca de 0,9 lbs (0,41 kg). Em competições, anilhas olímpicas são calibradas em kg (20 kg), enquanto a maioria das anilhas de academia americanas são 45 lbs."
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
      "name": "Convertisseur LBS vers KG",
      "slug": "calculateur-livres-vers-kilogrammes",
      "subtitle": "Convertissez les livres en kilogrammes instantanément — parfait pour le fitness, les voyages, l'expédition et la cuisine.",
      "breadcrumb": "LBS vers KG",
      "seo": {
        "title": "Convertisseur LBS vers KG - Outil de Conversion de Poids Gratuit",
        "description": "Convertissez les livres en kilogrammes instantanément. Parfait pour le suivi fitness, les voyages internationaux, l'expédition et les recettes. Inclut onces-vers-grammes et références de poids communes.",
        "shortDescription": "Convertissez les livres en kilogrammes instantanément.",
        "keywords": [
          "lbs vers kg",
          "livres vers kilogrammes",
          "convertisseur lbs vers kg",
          "convertir livres en kg",
          "convertisseur de poids",
          "convertisseur lbs gratuit",
          "poids impérial vers métrique"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Poids",
          "helpText": "Entrez la valeur et sélectionnez l'unité"
        }
      },
      "results": {
        "kilograms": {
          "label": "Kilogrammes"
        },
        "grams": {
          "label": "Grammes"
        },
        "ounces": {
          "label": "Onces Totales"
        },
        "stones": {
          "label": "Stones et Livres (UK)"
        },
        "metricTons": {
          "label": "Tonnes Métriques"
        }
      },
      "presets": {
        "lbs150": {
          "label": "150 lbs",
          "description": "68 kg — poids moyen"
        },
        "lbs200": {
          "label": "200 lbs",
          "description": "90,7 kg — au-dessus de la moyenne"
        },
        "plate45": {
          "label": "45 lbs",
          "description": "Disque de barre standard (~20,4 kg)"
        }
      },
      "values": {
        "kg": "kg",
        "g": "g",
        "oz": "oz",
        "st": "st",
        "t": "t",
        "lbs": "lbs"
      },
      "formats": {
        "summary": "{lbs} lbs = {kg} kg"
      },
      "infoCards": {
        "results": {
          "title": "⚖️ Résultats de Conversion",
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
              "label": "1 lb",
              "valueKey": "ref1"
            },
            {
              "label": "10 lbs",
              "valueKey": "ref10"
            },
            {
              "label": "50 lbs",
              "valueKey": "ref50"
            },
            {
              "label": "100 lbs",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils de Poids",
          "items": [
            "Divisez les lbs par 2,2 pour une estimation rapide en kg — suffisant pour la plupart des usages.",
            "Bagages d'avion : 50 lbs = 22,7 kg (la plupart des compagnies autorisent 23 kg).",
            "Gym : disque de 45 lb = 20,4 kg (les disques olympiques font 20 kg = 44 lbs).",
            "Poids corporel : 150 lbs = 68 kg, 180 lbs = 82 kg, 200 lbs = 91 kg."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir les Livres en Kilogrammes",
          "content": "Pour convertir les livres en kilogrammes, divisez par 2,20462 (ou multipliez par 0,453592). Une livre équivaut exactement à 0,45359237 kilogrammes selon la définition internationale. La livre (abrégée lb, du latin 'libra') est l'unité principale de poids dans le système impérial américain. Le kilogramme est l'unité de base SI de masse, utilisée par pratiquement tous les pays sauf les États-Unis. La conversion entre ces unités est l'une des conversions quotidiennes les plus communes pour les voyageurs internationaux, les passionnés de fitness et les acheteurs en ligne."
        },
        "howItWorks": {
          "title": "La Formule LBS vers KG",
          "content": "La formule est : kilogrammes = livres × 0,453592. Pour un calcul mental rapide, divisez les livres par 2,2 (erreur < 0,2%). Pour les grammes : multipliez le résultat en kg par 1000. Pour les stones : divisez les livres par 14. Exemple : 180 lbs × 0,453592 = 81,65 kg = 81 647 g. Ou rapidement : 180 ÷ 2,2 ≈ 81,8 kg. Le facteur exact 0,45359237 kg/lb est la définition internationale depuis 1959."
        },
        "considerations": {
          "title": "Conversions Communes LBS vers KG",
          "items": [
            {
              "text": "1 lb = 0,4536 kg = 453,6 g — la conversion fondamentale",
              "type": "info"
            },
            {
              "text": "10 lbs = 4,536 kg — sac de pommes de terre",
              "type": "info"
            },
            {
              "text": "50 lbs = 22,68 kg — limite bagages d'avion",
              "type": "info"
            },
            {
              "text": "100 lbs = 45,36 kg — référence nombre rond",
              "type": "info"
            },
            {
              "text": "150 lbs = 68,04 kg — poids adulte moyen",
              "type": "info"
            },
            {
              "text": "200 lbs = 90,72 kg — poids adulte au-dessus de la moyenne",
              "type": "info"
            }
          ]
        },
        "shippingWeights": {
          "title": "Poids d'Expédition et Colis",
          "items": [
            {
              "text": "USPS First Class : jusqu'à 13 oz (0,37 kg)",
              "type": "info"
            },
            {
              "text": "USPS Priority Mail : jusqu'à 70 lbs (31,75 kg)",
              "type": "info"
            },
            {
              "text": "FedEx/UPS standard : jusqu'à 150 lbs (68 kg)",
              "type": "info"
            },
            {
              "text": "Colis Amazon Prime : typiquement 1-5 lbs (0,5-2,3 kg)",
              "type": "info"
            },
            {
              "text": "Bagage cabine : 15-22 lbs (7-10 kg) varie selon la compagnie",
              "type": "info"
            },
            {
              "text": "Bagage enregistré : 50 lbs (23 kg) économique, 70 lbs (32 kg) affaires",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples LBS vers KG",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Convertir 185 lbs de poids corporel en kg",
              "steps": [
                "185 × 0,453592 = 83,91 kg",
                "Vérification rapide : 185 ÷ 2,2 = 84,1 kg (proche)",
                "En grammes : 83 915 g",
                "En stones : 185 ÷ 14 = 13 st 3 lbs"
              ],
              "result": "185 lbs = 83,9 kg (13 st 3 lbs)"
            },
            {
              "title": "Colis d'expédition : 12 lbs 8 oz vers kg",
              "steps": [
                "Convertir en lbs décimales : 12 + 8/16 = 12,5 lbs",
                "12,5 × 0,453592 = 5,67 kg",
                "En grammes : 5 670 g",
                "Sous la plupart des limites d'expédition"
              ],
              "result": "12 lbs 8 oz = 5,67 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de kg fait 1 livre ?",
          "answer": "1 livre équivaut exactement à 0,45359237 kilogrammes (communément arrondi à 0,4536 kg). Pour un calcul mental rapide, divisez les livres par 2,2 pour obtenir les kg."
        },
        {
          "question": "Comment convertir rapidement les lbs en kg ?",
          "answer": "Divisez par 2,2 pour une estimation rapide. Pour plus de précision, multipliez par 0,4536. Exemple : 180 lbs ÷ 2,2 ≈ 81,8 kg (exact : 81,65 kg). L'erreur avec ÷2,2 est inférieure à 0,2%."
        },
        {
          "question": "Combien de kg font 200 lbs ?",
          "answer": "200 lbs = 90,72 kg. Vérification rapide : 200 ÷ 2,2 = 90,9 kg. Ceci est proche du \"nombre rond\" métrique de 91 kg."
        },
        {
          "question": "Quelle est la différence entre lbs et kg ?",
          "answer": "La livre (lb) est une unité impériale utilisée aux États-Unis, tandis que le kilogramme (kg) est une unité métrique utilisée dans le monde entier. 1 kg = 2,205 lbs, donc un kg est environ 2,2× plus lourd qu'une lb. Techniquement, le kg mesure la masse tandis que la lb mesure la force (poids), mais dans l'usage quotidien ils sont interchangeables."
        },
        {
          "question": "Combien font 50 lbs en kg pour les bagages ?",
          "answer": "50 lbs = 22,68 kg. La plupart des compagnies aériennes internationales fixent la limite des bagages enregistrés à 23 kg, ce qui fait 50,7 lbs. Donc un sac de 50 lb est juste sous la limite. Vérifiez toujours les règles de votre compagnie spécifique."
        },
        {
          "question": "Un disque de 45 lb est-il identique à 20 kg ?",
          "answer": "Proche mais pas exact. Un disque de 45 lb = 20,41 kg, tandis qu'un disque de 20 kg = 44,09 lbs. La différence est d'environ 0,9 lbs (0,41 kg). En compétition, les disques olympiques sont calibrés en kg (20 kg), tandis que la plupart des disques de gym américains font 45 lbs."
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
      "name": "Pfund zu Kilogramm Umrechner",
      "slug": "pfund-zu-kilogramm-rechner",
      "subtitle": "Pfund sofort in Kilogramm umrechnen — perfekt für Fitness, Reisen, Versand und Kochen.",
      "breadcrumb": "Pfund zu KG",
      "seo": {
        "title": "Pfund zu KG Umrechner - Kostenloses Gewichtsumrechnungs-Tool",
        "description": "Pfund sofort in Kilogramm umrechnen. Perfekt für Fitness-Tracking, internationale Reisen, Versand und Rezepte. Enthält Unzen-zu-Gramm und häufige Gewichtsreferenzen.",
        "shortDescription": "Pfund sofort in Kilogramm umrechnen.",
        "keywords": [
          "pfund zu kg",
          "pounds zu kilogramm",
          "pfund zu kg umrechner",
          "pfund in kg umrechnen",
          "gewichtsumrechner",
          "kostenloser pfund umrechner",
          "imperial zu metrisch gewicht"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "amount": {
          "label": "Gewicht",
          "helpText": "Wert eingeben und Einheit auswählen"
        }
      },
      "results": {
        "kilograms": {
          "label": "Kilogramm"
        },
        "grams": {
          "label": "Gramm"
        },
        "ounces": {
          "label": "Unzen gesamt"
        },
        "stones": {
          "label": "Stones & Pfund (UK)"
        },
        "metricTons": {
          "label": "Metrische Tonnen"
        }
      },
      "presets": {
        "lbs150": {
          "label": "150 lbs",
          "description": "68 kg — Durchschnittsgewicht"
        },
        "lbs200": {
          "label": "200 lbs",
          "description": "90,7 kg — überdurchschnittlich"
        },
        "plate45": {
          "label": "45 lbs",
          "description": "Standard Hantelscheibe (~20,4 kg)"
        }
      },
      "values": {
        "kg": "kg",
        "g": "g",
        "oz": "oz",
        "st": "st",
        "t": "t",
        "lbs": "lbs"
      },
      "formats": {
        "summary": "{lbs} lbs = {kg} kg"
      },
      "infoCards": {
        "results": {
          "title": "⚖️ Umrechnungsergebnisse",
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
              "label": "1 lb",
              "valueKey": "ref1"
            },
            {
              "label": "10 lbs",
              "valueKey": "ref10"
            },
            {
              "label": "50 lbs",
              "valueKey": "ref50"
            },
            {
              "label": "100 lbs",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Gewichts-Tipps",
          "items": [
            "Teilen Sie lbs durch 2,2 für eine schnelle kg-Schätzung — für die meisten Zwecke ausreichend.",
            "Fluggepäck: 50 lbs = 22,7 kg (die meisten Fluggesellschaften erlauben 23 kg).",
            "Fitnessstudio: 45 lb Scheibe = 20,4 kg (olympische Scheiben sind 20 kg = 44 lbs).",
            "Körpergewicht: 150 lbs = 68 kg, 180 lbs = 82 kg, 200 lbs = 91 kg."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie man Pfund in Kilogramm umrechnet",
          "content": "Um Pfund in Kilogramm umzurechnen, teilen Sie durch 2,20462 (oder multiplizieren mit 0,453592). Ein Pfund entspricht genau 0,45359237 Kilogramm nach internationaler Definition. Das Pfund (abgekürzt lb, vom lateinischen 'libra') ist die primäre Gewichtseinheit im US-amerikanischen System. Das Kilogramm ist die SI-Basiseinheit der Masse, die von praktisch allen Ländern außer den USA verwendet wird. Die Umrechnung zwischen diesen Einheiten ist eine der häufigsten täglichen Umrechnungen für internationale Reisende, Fitness-Enthusiasten und Online-Käufer."
        },
        "howItWorks": {
          "title": "Die Pfund zu KG Formel",
          "content": "Die Formel lautet: Kilogramm = Pfund × 0,453592. Für schnelles Kopfrechnen teilen Sie Pfund durch 2,2 (Fehler < 0,2%). Für Gramm: multiplizieren Sie das kg-Ergebnis mit 1000. Für Stones: teilen Sie Pfund durch 14. Beispiel: 180 lbs × 0,453592 = 81,65 kg = 81.647 g. Oder schnell: 180 ÷ 2,2 ≈ 81,8 kg. Der exakte Faktor 0,45359237 kg/lb ist die internationale Definition seit 1959."
        },
        "considerations": {
          "title": "Häufige Pfund zu KG Umrechnungen",
          "items": [
            {
              "text": "1 lb = 0,4536 kg = 453,6 g — die grundlegende Umrechnung",
              "type": "info"
            },
            {
              "text": "10 lbs = 4,536 kg — Sack Kartoffeln",
              "type": "info"
            },
            {
              "text": "50 lbs = 22,68 kg — Fluggepäck-Limit",
              "type": "info"
            },
            {
              "text": "100 lbs = 45,36 kg — runde Zahl als Referenz",
              "type": "info"
            },
            {
              "text": "150 lbs = 68,04 kg — durchschnittliches Erwachsenengewicht",
              "type": "info"
            },
            {
              "text": "200 lbs = 90,72 kg — überdurchschnittliches Erwachsenengewicht",
              "type": "info"
            }
          ]
        },
        "shippingWeights": {
          "title": "Versand- und Paketgewichte",
          "items": [
            {
              "text": "Deutsche Post Brief: bis 20 g (0,02 kg)",
              "type": "info"
            },
            {
              "text": "DHL Paket S: bis 2 kg",
              "type": "info"
            },
            {
              "text": "DHL Standard: bis 31,5 kg",
              "type": "info"
            },
            {
              "text": "Amazon Paket: typisch 0,5-2,3 kg",
              "type": "info"
            },
            {
              "text": "Flugzeug Handgepäck: 7-10 kg je nach Fluggesellschaft",
              "type": "info"
            },
            {
              "text": "Flugzeug Aufgabegepäck: 23 kg Economy, 32 kg Business",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Pfund zu KG Beispiele",
          "description": "Schritt-für-Schritt Umrechnungen",
          "examples": [
            {
              "title": "185 lbs Körpergewicht in kg umrechnen",
              "steps": [
                "185 × 0,453592 = 83,91 kg",
                "Schnellcheck: 185 ÷ 2,2 = 84,1 kg (nah dran)",
                "In Gramm: 83.915 g",
                "In Stones: 185 ÷ 14 = 13 st 3 lbs"
              ],
              "result": "185 lbs = 83,9 kg (13 st 3 lbs)"
            },
            {
              "title": "Versandpaket: 12 lbs 8 oz in kg",
              "steps": [
                "In Dezimal-lbs umrechnen: 12 + 8/16 = 12,5 lbs",
                "12,5 × 0,453592 = 5,67 kg",
                "In Gramm: 5.670 g",
                "Unter den meisten Versandlimits"
              ],
              "result": "12 lbs 8 oz = 5,67 kg"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele kg sind 1 Pfund?",
          "answer": "1 Pfund entspricht genau 0,45359237 Kilogramm (üblicherweise auf 0,4536 kg gerundet). Für schnelles Kopfrechnen teilen Sie Pfund durch 2,2 um kg zu erhalten."
        },
        {
          "question": "Wie rechne ich lbs schnell in kg um?",
          "answer": "Teilen Sie durch 2,2 für eine schnelle Schätzung. Für mehr Genauigkeit multiplizieren Sie mit 0,4536. Beispiel: 180 lbs ÷ 2,2 ≈ 81,8 kg (exakt: 81,65 kg). Der Fehler bei ÷2,2 beträgt weniger als 0,2%."
        },
        {
          "question": "Wie viele kg sind 200 lbs?",
          "answer": "200 lbs = 90,72 kg. Schnellcheck: 200 ÷ 2,2 = 90,9 kg. Das ist nahe der metrischen 'runden Zahl' von 91 kg."
        },
        {
          "question": "Was ist der Unterschied zwischen lbs und kg?",
          "answer": "Das Pfund (lb) ist eine imperiale Einheit aus den USA, während das Kilogramm (kg) eine metrische Einheit ist, die weltweit verwendet wird. 1 kg = 2,205 lbs, also ist ein kg etwa 2,2× schwerer als ein lb. Technisch misst kg die Masse während lb die Kraft (Gewicht) misst, aber im Alltag sind sie austauschbar."
        },
        {
          "question": "Wie viel sind 50 lbs in kg für Gepäck?",
          "answer": "50 lbs = 22,68 kg. Die meisten internationalen Fluggesellschaften setzen das Aufgabegepäck-Limit bei 23 kg, was 50,7 lbs entspricht. Ein 50-lb-Koffer liegt also knapp unter dem Limit. Prüfen Sie immer die spezifischen Regeln Ihrer Fluggesellschaft."
        },
        {
          "question": "Ist eine 45 lb Scheibe dasselbe wie 20 kg?",
          "answer": "Nah dran, aber nicht exakt. Eine 45 lb Scheibe = 20,41 kg, während eine 20 kg Scheibe = 44,09 lbs. Der Unterschied beträgt etwa 0,9 lbs (0,41 kg). Im Wettkampf sind olympische Scheiben in kg kalibriert (20 kg), während die meisten US-Fitnessstudio-Scheiben 45 lbs haben."
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
      placeholder: "180",
      min: 0,
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "lbs",
      allowedUnits: ["kg", "lbs", "st", "g", "oz"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "kilograms", type: "primary", format: "text" },
    { id: "grams", type: "secondary", format: "text" },
    { id: "ounces", type: "secondary", format: "text" },
    { id: "stones", type: "secondary", format: "text" },
    { id: "metricTons", type: "secondary", format: "text" },
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
    { id: "shippingWeights", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Specifications for Mass/Weight", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-mass" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units — Mass", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "LBS to KG" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["kg-to-lbs", "bmi", "ideal-weight"],
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

export function calculateLbsToKg(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "lbs";
  const kg = convertToBase(amount, fromUnit, "weight");

  const grams = kg * 1000;
  const totalLbs = kg * 2.20462;
  const totalOz = totalLbs * 16;
  const totalStones = totalLbs / 14;
  const stPart = Math.floor(totalStones);
  const stLbsPart = totalLbs - stPart * 14;
  const metricTons = kg / 1000;

  return {
    values: { kilograms: kg, grams, ounces: totalOz, stones: totalStones, metricTons },
    formatted: {
      kilograms: `${fmtNum(kg)} kg`,
      grams: `${fmtNum(grams)} g`,
      ounces: `${fmtNum(totalOz)} oz`,
      stones: `${stPart} st ${fmtNum(Math.round(stLbsPart * 10) / 10)} lbs`,
      metricTons: `${fmtNum(metricTons)} t`,
      ref1: `${fmtNum(0.4536)} kg`,
      ref10: `${fmtNum(4.536)} kg`,
      ref50: `${fmtNum(22.68)} kg`,
      ref100: `${fmtNum(45.36)} kg`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(kg)} kg`,
    isValid: true,
  };
}

export default lbsToKgConverterConfig;
