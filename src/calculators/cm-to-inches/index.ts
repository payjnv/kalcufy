import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase, convert } from "@/engine/v4/units";

// ============================================================================
// CM TO INCHES CONVERTER - V4 (EN ONLY)
// ============================================================================

export const cmToInchesConverterConfig: CalculatorConfigV4 = {
  id: "cm-to-inches",
  version: "4.0",
  category: "conversion",
  icon: "📏",

  presets: [
    { id: "height170", icon: "🧑", values: { amount: 170 } },
    { id: "foot30", icon: "👣", values: { amount: 30 } },
    { id: "meter100", icon: "📏", values: { amount: 100 } },
  ],

  t: {
    en: {
      name: "CM to Inches Converter",
      slug: "cm-to-inches",
      subtitle: "Convert centimeters to inches instantly with a conversion table for common values.",
      breadcrumb: "CM to Inches",

      seo: {
        title: "CM to Inches Converter - Free Centimeter to Inch Tool",
        description: "Convert centimeters to inches instantly. Includes a reference table, feet and inches breakdown, and common conversions for height, screen sizes, and measurements.",
        shortDescription: "Convert centimeters to inches instantly.",
        keywords: ["cm to inches", "centimeters to inches", "cm to in converter", "convert cm to inches", "cm to inches chart", "free cm converter", "metric to imperial"],
      },

      calculator: { yourInformation: "CM to Inches" },
      ui: { yourInformation: "CM to Inches", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Centimeters (cm)", helpText: "Enter the value in centimeters" },
      },

      results: {
        inches: { label: "Inches" },
        feetInches: { label: "Feet & Inches" },
        feet: { label: "Feet (decimal)" },
        millimeters: { label: "Millimeters" },
      },

      presets: {
        height170: { label: "170 cm", description: "Average height ~5'7\"" },
        foot30: { label: "30 cm", description: "About 1 foot" },
        meter100: { label: "100 cm", description: "1 meter" },
      },

      values: { "in": "in", "ft": "ft", "cm": "cm", "mm": "mm" },
      formats: { summary: "{cm} cm = {inches} inches" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Inches", valueKey: "inches" },
            { label: "Feet & Inches", valueKey: "feetInches" },
            { label: "Feet (decimal)", valueKey: "feet" },
            { label: "Millimeters", valueKey: "millimeters" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 cm", valueKey: "ref1" },
            { label: "10 cm", valueKey: "ref10" },
            { label: "30 cm (≈1 ft)", valueKey: "ref30" },
            { label: "100 cm (1 m)", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "💡 Conversion Tips",
          items: [
            "1 inch = exactly 2.54 cm — divide cm by 2.54 to get inches.",
            "Quick estimate: divide cm by 2.5 for a rough inch value.",
            "For height: 5 feet = 152.4 cm, 6 feet = 182.88 cm.",
            "Screen sizes (TVs, monitors) are always measured diagonally in inches.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert CM to Inches",
          content: "To convert centimeters to inches, divide the centimeter value by 2.54. The inch is defined as exactly 25.4 millimeters (2.54 centimeters) by international agreement since 1959. This means 1 cm = 0.393701 inches. For example, 170 cm ÷ 2.54 = 66.93 inches, which equals 5 feet 6.93 inches. This conversion is commonly needed for height measurements, screen sizes, paper dimensions, and any time you need to translate between metric and imperial systems.",
        },
        howItWorks: {
          title: "The CM to Inches Formula",
          content: "The formula is simple: inches = centimeters ÷ 2.54. Since 1 inch = 2.54 cm exactly, dividing by 2.54 converts any centimeter measurement to inches. To also express the result in feet and inches: divide total inches by 12 to get feet, and the remainder is the inches portion. For example: 180 cm ÷ 2.54 = 70.87 inches. Then 70.87 ÷ 12 = 5 feet with 10.87 inches remaining, so 180 cm = 5'10.9\".",
        },
        considerations: {
          title: "Common CM to Inches Conversions",
          items: [
            { text: "1 cm = 0.3937 inches — less than half an inch", type: "info" },
            { text: "2.54 cm = 1 inch exactly — the fundamental conversion factor", type: "info" },
            { text: "30.48 cm = 1 foot (12 inches) exactly", type: "info" },
            { text: "91.44 cm = 1 yard (3 feet) exactly", type: "info" },
            { text: "152.4 cm = 5 feet — common height reference point", type: "info" },
            { text: "182.88 cm = 6 feet — another common height reference", type: "info" },
          ],
        },
        heightChart: {
          title: "Height Conversion Chart",
          items: [
            { text: "150 cm = 4'11.1\" — short adult height", type: "info" },
            { text: "160 cm = 5'3.0\" — average female height in many countries", type: "info" },
            { text: "170 cm = 5'6.9\" — between average male and female globally", type: "info" },
            { text: "175 cm = 5'8.9\" — average male height in the US", type: "info" },
            { text: "180 cm = 5'10.9\" — tall in most countries", type: "info" },
            { text: "190 cm = 6'2.8\" — very tall, basketball player range", type: "info" },
          ],
        },
        examples: {
          title: "CM to Inches Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 175 cm to feet and inches",
              steps: ["175 ÷ 2.54 = 68.898 inches", "68.898 ÷ 12 = 5 feet remainder 8.898", "Round: 5 feet 8.9 inches", "Or approximately 5'9\""],
              result: "175 cm = 5 feet 8.9 inches (≈ 5'9\")",
            },
            {
              title: "Convert 55-inch TV to cm",
              steps: ["55 inches × 2.54 = 139.7 cm", "Screen diagonal = 139.7 cm", "Width (16:9) ≈ 121.7 cm", "Height (16:9) ≈ 68.5 cm"],
              result: "55 inches = 139.7 cm diagonal",
            },
          ],
        },
      },

      faqs: [
        { question: "How many inches is 1 cm?", answer: "1 centimeter equals 0.393701 inches. To convert cm to inches, divide the cm value by 2.54. For example, 10 cm = 10 ÷ 2.54 = 3.937 inches." },
        { question: "How do I convert cm to feet and inches?", answer: "First divide cm by 2.54 to get total inches. Then divide total inches by 12 — the whole number is feet, the remainder is inches. Example: 170 cm ÷ 2.54 = 66.93 in; 66.93 ÷ 12 = 5 ft 6.93 in ≈ 5'7\"." },
        { question: "What is 170 cm in feet and inches?", answer: "170 cm = 66.93 inches = 5 feet 6.93 inches, which is approximately 5'7\". This is close to the average adult height in many countries." },
        { question: "What is 180 cm in feet?", answer: "180 cm = 70.87 inches = 5 feet 10.87 inches, approximately 5'11\". This is considered above-average height for males in most countries." },
        { question: "How many cm in a foot?", answer: "There are exactly 30.48 centimeters in one foot. This is because 1 foot = 12 inches, and 1 inch = 2.54 cm, so 12 × 2.54 = 30.48 cm." },
        { question: "Is cm to inches exact or approximate?", answer: "The conversion is exact: 1 inch = exactly 2.54 cm by international definition (since 1959). So 1 cm = exactly 10/25.4 inches = 0.393700787... inches. Any rounding in results is due to decimal display, not imprecision in the conversion factor." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de CM a Pulgadas",
      "slug": "calculadora-centimetros-pulgadas",
      "subtitle": "Convierte centímetros a pulgadas al instante con una tabla de conversión para valores comunes.",
      "breadcrumb": "CM a Pulgadas",
      "seo": {
        "title": "Convertidor de CM a Pulgadas - Herramienta Gratuita de Centímetros a Pulgadas",
        "description": "Convierte centímetros a pulgadas al instante. Incluye tabla de referencia, desglose en pies y pulgadas, y conversiones comunes para altura, tamaños de pantalla y medidas.",
        "shortDescription": "Convierte centímetros a pulgadas al instante.",
        "keywords": [
          "cm a pulgadas",
          "centímetros a pulgadas",
          "convertidor cm a pulg",
          "convertir cm a pulgadas",
          "tabla cm a pulgadas",
          "convertidor cm gratuito",
          "métrico a imperial"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "amount": {
          "label": "Centímetros (cm)",
          "helpText": "Ingresa el valor en centímetros"
        }
      },
      "results": {
        "inches": {
          "label": "Pulgadas"
        },
        "feetInches": {
          "label": "Pies y Pulgadas"
        },
        "feet": {
          "label": "Pies (decimal)"
        },
        "millimeters": {
          "label": "Milímetros"
        }
      },
      "presets": {
        "height170": {
          "label": "170 cm",
          "description": "Altura promedio ~5'7\""
        },
        "foot30": {
          "label": "30 cm",
          "description": "Aproximadamente 1 pie"
        },
        "meter100": {
          "label": "100 cm",
          "description": "1 metro"
        }
      },
      "values": {
        "in": "pulg",
        "ft": "pies",
        "cm": "cm",
        "mm": "mm"
      },
      "formats": {
        "summary": "{cm} cm = {inches} pulgadas"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados de Conversión",
          "items": [
            {
              "label": "Pulgadas",
              "valueKey": "inches"
            },
            {
              "label": "Pies y Pulgadas",
              "valueKey": "feetInches"
            },
            {
              "label": "Pies (decimal)",
              "valueKey": "feet"
            },
            {
              "label": "Milímetros",
              "valueKey": "millimeters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referencia Rápida",
          "items": [
            {
              "label": "1 cm",
              "valueKey": "ref1"
            },
            {
              "label": "10 cm",
              "valueKey": "ref10"
            },
            {
              "label": "30 cm (≈1 pie)",
              "valueKey": "ref30"
            },
            {
              "label": "100 cm (1 m)",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Conversión",
          "items": [
            "1 pulgada = exactamente 2.54 cm — divide cm por 2.54 para obtener pulgadas.",
            "Estimación rápida: divide cm por 2.5 para un valor aproximado en pulgadas.",
            "Para altura: 5 pies = 152.4 cm, 6 pies = 182.88 cm.",
            "Tamaños de pantalla (TVs, monitores) siempre se miden diagonalmente en pulgadas."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir CM a Pulgadas",
          "content": "Para convertir centímetros a pulgadas, divide el valor en centímetros por 2.54. La pulgada se define como exactamente 25.4 milímetros (2.54 centímetros) por acuerdo internacional desde 1959. Esto significa que 1 cm = 0.393701 pulgadas. Por ejemplo, 170 cm ÷ 2.54 = 66.93 pulgadas, que equivale a 5 pies 6.93 pulgadas. Esta conversión es comúnmente necesaria para medidas de altura, tamaños de pantalla, dimensiones de papel y cualquier momento en que necesites traducir entre sistemas métrico e imperial."
        },
        "howItWorks": {
          "title": "La Fórmula de CM a Pulgadas",
          "content": "La fórmula es simple: pulgadas = centímetros ÷ 2.54. Como 1 pulgada = 2.54 cm exactamente, dividir por 2.54 convierte cualquier medida en centímetros a pulgadas. Para expresar también el resultado en pies y pulgadas: divide las pulgadas totales por 12 para obtener los pies, y el resto es la porción de pulgadas. Por ejemplo: 180 cm ÷ 2.54 = 70.87 pulgadas. Luego 70.87 ÷ 12 = 5 pies con 10.87 pulgadas restantes, así que 180 cm = 5'10.9\"."
        },
        "considerations": {
          "title": "Conversiones Comunes de CM a Pulgadas",
          "items": [
            {
              "text": "1 cm = 0.3937 pulgadas — menos de media pulgada",
              "type": "info"
            },
            {
              "text": "2.54 cm = 1 pulgada exactamente — el factor de conversión fundamental",
              "type": "info"
            },
            {
              "text": "30.48 cm = 1 pie (12 pulgadas) exactamente",
              "type": "info"
            },
            {
              "text": "91.44 cm = 1 yarda (3 pies) exactamente",
              "type": "info"
            },
            {
              "text": "152.4 cm = 5 pies — punto de referencia común de altura",
              "type": "info"
            },
            {
              "text": "182.88 cm = 6 pies — otra referencia común de altura",
              "type": "info"
            }
          ]
        },
        "heightChart": {
          "title": "Tabla de Conversión de Altura",
          "items": [
            {
              "text": "150 cm = 4'11.1\" — altura adulta baja",
              "type": "info"
            },
            {
              "text": "160 cm = 5'3.0\" — altura femenina promedio en muchos países",
              "type": "info"
            },
            {
              "text": "170 cm = 5'6.9\" — entre el promedio masculino y femenino globalmente",
              "type": "info"
            },
            {
              "text": "175 cm = 5'8.9\" — altura masculina promedio en EE.UU.",
              "type": "info"
            },
            {
              "text": "180 cm = 5'10.9\" — alto en la mayoría de países",
              "type": "info"
            },
            {
              "text": "190 cm = 6'2.8\" — muy alto, rango de jugador de baloncesto",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de CM a Pulgadas",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Convertir 175 cm a pies y pulgadas",
              "steps": [
                "175 ÷ 2.54 = 68.898 pulgadas",
                "68.898 ÷ 12 = 5 pies resto 8.898",
                "Redondear: 5 pies 8.9 pulgadas",
                "O aproximadamente 5'9\""
              ],
              "result": "175 cm = 5 pies 8.9 pulgadas (≈ 5'9\")"
            },
            {
              "title": "Convertir TV de 55 pulgadas a cm",
              "steps": [
                "55 pulgadas × 2.54 = 139.7 cm",
                "Diagonal de pantalla = 139.7 cm",
                "Ancho (16:9) ≈ 121.7 cm",
                "Alto (16:9) ≈ 68.5 cm"
              ],
              "result": "55 pulgadas = 139.7 cm diagonal"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántas pulgadas es 1 cm?",
          "answer": "1 centímetro equivale a 0.393701 pulgadas. Para convertir cm a pulgadas, divide el valor en cm por 2.54. Por ejemplo, 10 cm = 10 ÷ 2.54 = 3.937 pulgadas."
        },
        {
          "question": "¿Cómo convierto cm a pies y pulgadas?",
          "answer": "Primero divide cm por 2.54 para obtener pulgadas totales. Luego divide las pulgadas totales por 12 — el número entero son los pies, el resto son las pulgadas. Ejemplo: 170 cm ÷ 2.54 = 66.93 pulg; 66.93 ÷ 12 = 5 pies 6.93 pulg ≈ 5'7\"."
        },
        {
          "question": "¿Qué es 170 cm en pies y pulgadas?",
          "answer": "170 cm = 66.93 pulgadas = 5 pies 6.93 pulgadas, que es aproximadamente 5'7\". Esto está cerca de la altura adulta promedio en muchos países."
        },
        {
          "question": "¿Qué es 180 cm en pies?",
          "answer": "180 cm = 70.87 pulgadas = 5 pies 10.87 pulgadas, aproximadamente 5'11\". Esto se considera altura por encima del promedio para hombres en la mayoría de países."
        },
        {
          "question": "¿Cuántos cm hay en un pie?",
          "answer": "Hay exactamente 30.48 centímetros en un pie. Esto es porque 1 pie = 12 pulgadas, y 1 pulgada = 2.54 cm, así que 12 × 2.54 = 30.48 cm."
        },
        {
          "question": "¿La conversión de cm a pulgadas es exacta o aproximada?",
          "answer": "La conversión es exacta: 1 pulgada = exactamente 2.54 cm por definición internacional (desde 1959). Así que 1 cm = exactamente 10/25.4 pulgadas = 0.393700787... pulgadas. Cualquier redondeo en los resultados se debe a la visualización decimal, no a imprecisión en el factor de conversión."
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
      "name": "Conversor de CM para Polegadas",
      "slug": "calculadora-cm-para-polegadas",
      "subtitle": "Converta centímetros para polegadas instantaneamente com uma tabela de conversão para valores comuns.",
      "breadcrumb": "CM para Polegadas",
      "seo": {
        "title": "Conversor de CM para Polegadas - Ferramenta Gratuita de Centímetros para Polegadas",
        "description": "Converta centímetros para polegadas instantaneamente. Inclui tabela de referência, conversão para pés e polegadas, e conversões comuns para altura, tamanhos de tela e medidas.",
        "shortDescription": "Converta centímetros para polegadas instantaneamente.",
        "keywords": [
          "cm para polegadas",
          "centímetros para polegadas",
          "conversor cm para pol",
          "converter cm para polegadas",
          "tabela cm para polegadas",
          "conversor cm gratuito",
          "métrico para imperial"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Centímetros (cm)",
          "helpText": "Digite o valor em centímetros"
        }
      },
      "results": {
        "inches": {
          "label": "Polegadas"
        },
        "feetInches": {
          "label": "Pés e Polegadas"
        },
        "feet": {
          "label": "Pés (decimal)"
        },
        "millimeters": {
          "label": "Milímetros"
        }
      },
      "presets": {
        "height170": {
          "label": "170 cm",
          "description": "Altura média ~5'7\""
        },
        "foot30": {
          "label": "30 cm",
          "description": "Cerca de 1 pé"
        },
        "meter100": {
          "label": "100 cm",
          "description": "1 metro"
        }
      },
      "values": {
        "in": "pol",
        "ft": "pés",
        "cm": "cm",
        "mm": "mm"
      },
      "formats": {
        "summary": "{cm} cm = {inches} polegadas"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados da Conversão",
          "items": [
            {
              "label": "Polegadas",
              "valueKey": "inches"
            },
            {
              "label": "Pés e Polegadas",
              "valueKey": "feetInches"
            },
            {
              "label": "Pés (decimal)",
              "valueKey": "feet"
            },
            {
              "label": "Milímetros",
              "valueKey": "millimeters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referência Rápida",
          "items": [
            {
              "label": "1 cm",
              "valueKey": "ref1"
            },
            {
              "label": "10 cm",
              "valueKey": "ref10"
            },
            {
              "label": "30 cm (≈1 pé)",
              "valueKey": "ref30"
            },
            {
              "label": "100 cm (1 m)",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Conversão",
          "items": [
            "1 polegada = exatamente 2,54 cm — divida cm por 2,54 para obter polegadas.",
            "Estimativa rápida: divida cm por 2,5 para um valor aproximado em polegadas.",
            "Para altura: 5 pés = 152,4 cm, 6 pés = 182,88 cm.",
            "Tamanhos de tela (TVs, monitores) são sempre medidos diagonalmente em polegadas."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter CM para Polegadas",
          "content": "Para converter centímetros para polegadas, divida o valor em centímetros por 2,54. A polegada é definida como exatamente 25,4 milímetros (2,54 centímetros) por acordo internacional desde 1959. Isso significa que 1 cm = 0,393701 polegadas. Por exemplo, 170 cm ÷ 2,54 = 66,93 polegadas, que equivale a 5 pés e 6,93 polegadas. Esta conversão é comumente necessária para medidas de altura, tamanhos de tela, dimensões de papel e sempre que você precisar traduzir entre sistemas métrico e imperial."
        },
        "howItWorks": {
          "title": "A Fórmula de CM para Polegadas",
          "content": "A fórmula é simples: polegadas = centímetros ÷ 2,54. Como 1 polegada = 2,54 cm exatamente, dividir por 2,54 converte qualquer medida em centímetros para polegadas. Para também expressar o resultado em pés e polegadas: divida o total de polegadas por 12 para obter os pés, e o resto é a porção de polegadas. Por exemplo: 180 cm ÷ 2,54 = 70,87 polegadas. Então 70,87 ÷ 12 = 5 pés com 10,87 polegadas restantes, então 180 cm = 5'10,9\"."
        },
        "considerations": {
          "title": "Conversões Comuns de CM para Polegadas",
          "items": [
            {
              "text": "1 cm = 0,3937 polegadas — menos da metade de uma polegada",
              "type": "info"
            },
            {
              "text": "2,54 cm = 1 polegada exatamente — o fator de conversão fundamental",
              "type": "info"
            },
            {
              "text": "30,48 cm = 1 pé (12 polegadas) exatamente",
              "type": "info"
            },
            {
              "text": "91,44 cm = 1 jarda (3 pés) exatamente",
              "type": "info"
            },
            {
              "text": "152,4 cm = 5 pés — ponto de referência comum para altura",
              "type": "info"
            },
            {
              "text": "182,88 cm = 6 pés — outra referência comum de altura",
              "type": "info"
            }
          ]
        },
        "heightChart": {
          "title": "Tabela de Conversão de Altura",
          "items": [
            {
              "text": "150 cm = 4'11,1\" — altura adulta baixa",
              "type": "info"
            },
            {
              "text": "160 cm = 5'3,0\" — altura média feminina em muitos países",
              "type": "info"
            },
            {
              "text": "170 cm = 5'6,9\" — entre a média masculina e feminina globalmente",
              "type": "info"
            },
            {
              "text": "175 cm = 5'8,9\" — altura média masculina nos EUA",
              "type": "info"
            },
            {
              "text": "180 cm = 5'10,9\" — alto na maioria dos países",
              "type": "info"
            },
            {
              "text": "190 cm = 6'2,8\" — muito alto, faixa de jogador de basquete",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de CM para Polegadas",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Converter 175 cm para pés e polegadas",
              "steps": [
                "175 ÷ 2,54 = 68,898 polegadas",
                "68,898 ÷ 12 = 5 pés restando 8,898",
                "Arredondando: 5 pés 8,9 polegadas",
                "Ou aproximadamente 5'9\""
              ],
              "result": "175 cm = 5 pés 8,9 polegadas (≈ 5'9\")"
            },
            {
              "title": "Converter TV de 55 polegadas para cm",
              "steps": [
                "55 polegadas × 2,54 = 139,7 cm",
                "Diagonal da tela = 139,7 cm",
                "Largura (16:9) ≈ 121,7 cm",
                "Altura (16:9) ≈ 68,5 cm"
              ],
              "result": "55 polegadas = 139,7 cm diagonal"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantas polegadas tem 1 cm?",
          "answer": "1 centímetro equivale a 0,393701 polegadas. Para converter cm para polegadas, divida o valor em cm por 2,54. Por exemplo, 10 cm = 10 ÷ 2,54 = 3,937 polegadas."
        },
        {
          "question": "Como converter cm para pés e polegadas?",
          "answer": "Primeiro divida cm por 2,54 para obter o total de polegadas. Então divida o total de polegadas por 12 — o número inteiro são os pés, o resto são as polegadas. Exemplo: 170 cm ÷ 2,54 = 66,93 pol; 66,93 ÷ 12 = 5 pés 6,93 pol ≈ 5'7\"."
        },
        {
          "question": "Quanto é 170 cm em pés e polegadas?",
          "answer": "170 cm = 66,93 polegadas = 5 pés 6,93 polegadas, que é aproximadamente 5'7\". Isso está próximo da altura média de adultos em muitos países."
        },
        {
          "question": "Quanto é 180 cm em pés?",
          "answer": "180 cm = 70,87 polegadas = 5 pés 10,87 polegadas, aproximadamente 5'11\". Isso é considerado acima da média para homens na maioria dos países."
        },
        {
          "question": "Quantos cm tem um pé?",
          "answer": "Há exatamente 30,48 centímetros em um pé. Isso porque 1 pé = 12 polegadas, e 1 polegada = 2,54 cm, então 12 × 2,54 = 30,48 cm."
        },
        {
          "question": "A conversão de cm para polegadas é exata ou aproximada?",
          "answer": "A conversão é exata: 1 polegada = exatamente 2,54 cm por definição internacional (desde 1959). Então 1 cm = exatamente 10/25,4 polegadas = 0,393700787... polegadas. Qualquer arredondamento nos resultados é devido à exibição decimal, não imprecisão no fator de conversão."
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
      "name": "Convertisseur CM vers Pouces",
      "slug": "calculateur-cm-vers-pouces",
      "subtitle": "Convertissez les centimètres en pouces instantanément avec un tableau de conversion pour les valeurs courantes.",
      "breadcrumb": "CM vers Pouces",
      "seo": {
        "title": "Convertisseur CM vers Pouces - Outil Gratuit Centimètre vers Pouce",
        "description": "Convertissez les centimètres en pouces instantanément. Inclut un tableau de référence, une répartition en pieds et pouces, et les conversions courantes pour la taille, les écrans et les mesures.",
        "shortDescription": "Convertissez les centimètres en pouces instantanément.",
        "keywords": [
          "cm vers pouces",
          "centimètres vers pouces",
          "convertisseur cm vers pouces",
          "convertir cm en pouces",
          "tableau cm vers pouces",
          "convertisseur cm gratuit",
          "métrique vers impérial"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Centimètres (cm)",
          "helpText": "Entrez la valeur en centimètres"
        }
      },
      "results": {
        "inches": {
          "label": "Pouces"
        },
        "feetInches": {
          "label": "Pieds et Pouces"
        },
        "feet": {
          "label": "Pieds (décimal)"
        },
        "millimeters": {
          "label": "Millimètres"
        }
      },
      "presets": {
        "height170": {
          "label": "170 cm",
          "description": "Taille moyenne ~5'7\""
        },
        "foot30": {
          "label": "30 cm",
          "description": "Environ 1 pied"
        },
        "meter100": {
          "label": "100 cm",
          "description": "1 mètre"
        }
      },
      "values": {
        "in": "po",
        "ft": "pi",
        "cm": "cm",
        "mm": "mm"
      },
      "formats": {
        "summary": "{cm} cm = {inches} pouces"
      },
      "infoCards": {
        "results": {
          "title": "📏 Résultats de Conversion",
          "items": [
            {
              "label": "Pouces",
              "valueKey": "inches"
            },
            {
              "label": "Pieds et Pouces",
              "valueKey": "feetInches"
            },
            {
              "label": "Pieds (décimal)",
              "valueKey": "feet"
            },
            {
              "label": "Millimètres",
              "valueKey": "millimeters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Référence Rapide",
          "items": [
            {
              "label": "1 cm",
              "valueKey": "ref1"
            },
            {
              "label": "10 cm",
              "valueKey": "ref10"
            },
            {
              "label": "30 cm (≈1 pi)",
              "valueKey": "ref30"
            },
            {
              "label": "100 cm (1 m)",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils de Conversion",
          "items": [
            "1 pouce = exactement 2,54 cm — divisez les cm par 2,54 pour obtenir les pouces.",
            "Estimation rapide : divisez les cm par 2,5 pour une valeur approximative en pouces.",
            "Pour la taille : 5 pieds = 152,4 cm, 6 pieds = 182,88 cm.",
            "Les tailles d'écran (TV, moniteurs) sont toujours mesurées en diagonale en pouces."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir les CM en Pouces",
          "content": "Pour convertir les centimètres en pouces, divisez la valeur en centimètres par 2,54. Le pouce est défini comme exactement 25,4 millimètres (2,54 centimètres) par accord international depuis 1959. Cela signifie que 1 cm = 0,393701 pouce. Par exemple, 170 cm ÷ 2,54 = 66,93 pouces, ce qui équivaut à 5 pieds 6,93 pouces. Cette conversion est couramment nécessaire pour les mesures de taille, les tailles d'écran, les dimensions de papier, et chaque fois que vous devez traduire entre les systèmes métrique et impérial."
        },
        "howItWorks": {
          "title": "La Formule CM vers Pouces",
          "content": "La formule est simple : pouces = centimètres ÷ 2,54. Puisque 1 pouce = 2,54 cm exactement, diviser par 2,54 convertit toute mesure en centimètres en pouces. Pour exprimer également le résultat en pieds et pouces : divisez le total de pouces par 12 pour obtenir les pieds, et le reste est la portion en pouces. Par exemple : 180 cm ÷ 2,54 = 70,87 pouces. Puis 70,87 ÷ 12 = 5 pieds avec 10,87 pouces restants, donc 180 cm = 5'10,9\"."
        },
        "considerations": {
          "title": "Conversions Courantes CM vers Pouces",
          "items": [
            {
              "text": "1 cm = 0,3937 pouce — moins d'un demi-pouce",
              "type": "info"
            },
            {
              "text": "2,54 cm = 1 pouce exactement — le facteur de conversion fondamental",
              "type": "info"
            },
            {
              "text": "30,48 cm = 1 pied (12 pouces) exactement",
              "type": "info"
            },
            {
              "text": "91,44 cm = 1 yard (3 pieds) exactement",
              "type": "info"
            },
            {
              "text": "152,4 cm = 5 pieds — point de référence de taille courant",
              "type": "info"
            },
            {
              "text": "182,88 cm = 6 pieds — autre référence de taille courante",
              "type": "info"
            }
          ]
        },
        "heightChart": {
          "title": "Tableau de Conversion des Tailles",
          "items": [
            {
              "text": "150 cm = 4'11,1\" — petite taille adulte",
              "type": "info"
            },
            {
              "text": "160 cm = 5'3,0\" — taille moyenne féminine dans de nombreux pays",
              "type": "info"
            },
            {
              "text": "170 cm = 5'6,9\" — entre la moyenne masculine et féminine mondiale",
              "type": "info"
            },
            {
              "text": "175 cm = 5'8,9\" — taille moyenne masculine aux États-Unis",
              "type": "info"
            },
            {
              "text": "180 cm = 5'10,9\" — grand dans la plupart des pays",
              "type": "info"
            },
            {
              "text": "190 cm = 6'2,8\" — très grand, gamme joueur de basket",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples CM vers Pouces",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Convertir 175 cm en pieds et pouces",
              "steps": [
                "175 ÷ 2,54 = 68,898 pouces",
                "68,898 ÷ 12 = 5 pieds reste 8,898",
                "Arrondi : 5 pieds 8,9 pouces",
                "Ou approximativement 5'9\""
              ],
              "result": "175 cm = 5 pieds 8,9 pouces (≈ 5'9\")"
            },
            {
              "title": "Convertir une TV 55 pouces en cm",
              "steps": [
                "55 pouces × 2,54 = 139,7 cm",
                "Diagonale écran = 139,7 cm",
                "Largeur (16:9) ≈ 121,7 cm",
                "Hauteur (16:9) ≈ 68,5 cm"
              ],
              "result": "55 pouces = 139,7 cm en diagonale"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de pouces fait 1 cm ?",
          "answer": "1 centimètre équivaut à 0,393701 pouce. Pour convertir les cm en pouces, divisez la valeur en cm par 2,54. Par exemple, 10 cm = 10 ÷ 2,54 = 3,937 pouces."
        },
        {
          "question": "Comment convertir les cm en pieds et pouces ?",
          "answer": "Divisez d'abord les cm par 2,54 pour obtenir le total en pouces. Puis divisez le total de pouces par 12 — le nombre entier représente les pieds, le reste représente les pouces. Exemple : 170 cm ÷ 2,54 = 66,93 po ; 66,93 ÷ 12 = 5 pi 6,93 po ≈ 5'7\"."
        },
        {
          "question": "Que fait 170 cm en pieds et pouces ?",
          "answer": "170 cm = 66,93 pouces = 5 pieds 6,93 pouces, ce qui est approximativement 5'7\". Cela est proche de la taille adulte moyenne dans de nombreux pays."
        },
        {
          "question": "Que fait 180 cm en pieds ?",
          "answer": "180 cm = 70,87 pouces = 5 pieds 10,87 pouces, approximativement 5'11\". Cela est considéré comme une taille supérieure à la moyenne pour les hommes dans la plupart des pays."
        },
        {
          "question": "Combien de cm dans un pied ?",
          "answer": "Il y a exactement 30,48 centimètres dans un pied. C'est parce que 1 pied = 12 pouces, et 1 pouce = 2,54 cm, donc 12 × 2,54 = 30,48 cm."
        },
        {
          "question": "La conversion cm vers pouces est-elle exacte ou approximative ?",
          "answer": "La conversion est exacte : 1 pouce = exactement 2,54 cm par définition internationale (depuis 1959). Donc 1 cm = exactement 10/25,4 pouces = 0,393700787... pouces. Tout arrondi dans les résultats est dû à l'affichage décimal, pas à une imprécision du facteur de conversion."
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
      "name": "CM zu Zoll Umrechner",
      "slug": "zentimeter-zu-zoll-rechner",
      "subtitle": "Wandeln Sie Zentimeter sofort in Zoll um mit einer Umrechnungstabelle für häufige Werte.",
      "breadcrumb": "CM zu Zoll",
      "seo": {
        "title": "CM zu Zoll Umrechner - Kostenloses Zentimeter zu Zoll Tool",
        "description": "Wandeln Sie Zentimeter sofort in Zoll um. Enthält Referenztabelle, Fuß und Zoll Aufschlüsselung und häufige Umrechnungen für Körpergröße, Bildschirmgrößen und Maße.",
        "shortDescription": "Wandeln Sie Zentimeter sofort in Zoll um.",
        "keywords": [
          "cm zu zoll",
          "zentimeter zu zoll",
          "cm zu zoll umrechner",
          "cm in zoll umrechnen",
          "cm zu zoll tabelle",
          "kostenloser cm umrechner",
          "metrisch zu imperial"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Zentimeter (cm)",
          "helpText": "Geben Sie den Wert in Zentimetern ein"
        }
      },
      "results": {
        "inches": {
          "label": "Zoll"
        },
        "feetInches": {
          "label": "Fuß & Zoll"
        },
        "feet": {
          "label": "Fuß (dezimal)"
        },
        "millimeters": {
          "label": "Millimeter"
        }
      },
      "presets": {
        "height170": {
          "label": "170 cm",
          "description": "Durchschnittsgröße ~5'7\""
        },
        "foot30": {
          "label": "30 cm",
          "description": "Etwa 1 Fuß"
        },
        "meter100": {
          "label": "100 cm",
          "description": "1 Meter"
        }
      },
      "values": {
        "in": "Zoll",
        "ft": "Fuß",
        "cm": "cm",
        "mm": "mm"
      },
      "formats": {
        "summary": "{cm} cm = {inches} Zoll"
      },
      "infoCards": {
        "results": {
          "title": "📏 Umrechnungsergebnisse",
          "items": [
            {
              "label": "Zoll",
              "valueKey": "inches"
            },
            {
              "label": "Fuß & Zoll",
              "valueKey": "feetInches"
            },
            {
              "label": "Fuß (dezimal)",
              "valueKey": "feet"
            },
            {
              "label": "Millimeter",
              "valueKey": "millimeters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Schnellreferenz",
          "items": [
            {
              "label": "1 cm",
              "valueKey": "ref1"
            },
            {
              "label": "10 cm",
              "valueKey": "ref10"
            },
            {
              "label": "30 cm (≈1 Fuß)",
              "valueKey": "ref30"
            },
            {
              "label": "100 cm (1 m)",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "💡 Umrechnungstipps",
          "items": [
            "1 Zoll = genau 2,54 cm — teilen Sie cm durch 2,54 um Zoll zu erhalten.",
            "Schnelle Schätzung: teilen Sie cm durch 2,5 für einen groben Zollwert.",
            "Für Körpergröße: 5 Fuß = 152,4 cm, 6 Fuß = 182,88 cm.",
            "Bildschirmgrößen (TVs, Monitore) werden immer diagonal in Zoll gemessen."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie man CM in Zoll umrechnet",
          "content": "Um Zentimeter in Zoll umzurechnen, teilen Sie den Zentimeterwert durch 2,54. Der Zoll ist seit 1959 durch internationale Vereinbarung als genau 25,4 Millimeter (2,54 Zentimeter) definiert. Das bedeutet 1 cm = 0,393701 Zoll. Zum Beispiel: 170 cm ÷ 2,54 = 66,93 Zoll, was 5 Fuß 6,93 Zoll entspricht. Diese Umrechnung wird häufig für Körpergrößenmessungen, Bildschirmgrößen, Papierformate und immer dann benötigt, wenn Sie zwischen metrischen und imperialen Systemen übersetzen müssen."
        },
        "howItWorks": {
          "title": "Die CM zu Zoll Formel",
          "content": "Die Formel ist einfach: Zoll = Zentimeter ÷ 2,54. Da 1 Zoll = 2,54 cm genau ist, wandelt die Teilung durch 2,54 jede Zentimetermessung in Zoll um. Um das Ergebnis auch in Fuß und Zoll auszudrücken: teilen Sie die Gesamtzoll durch 12, um Fuß zu erhalten, und der Rest sind die Zoll. Zum Beispiel: 180 cm ÷ 2,54 = 70,87 Zoll. Dann 70,87 ÷ 12 = 5 Fuß mit 10,87 Zoll Rest, also 180 cm = 5'10,9\"."
        },
        "considerations": {
          "title": "Häufige CM zu Zoll Umrechnungen",
          "items": [
            {
              "text": "1 cm = 0,3937 Zoll — weniger als ein halber Zoll",
              "type": "info"
            },
            {
              "text": "2,54 cm = 1 Zoll genau — der grundlegende Umrechnungsfaktor",
              "type": "info"
            },
            {
              "text": "30,48 cm = 1 Fuß (12 Zoll) genau",
              "type": "info"
            },
            {
              "text": "91,44 cm = 1 Yard (3 Fuß) genau",
              "type": "info"
            },
            {
              "text": "152,4 cm = 5 Fuß — häufiger Größenreferenzpunkt",
              "type": "info"
            },
            {
              "text": "182,88 cm = 6 Fuß — weiterer häufiger Größenreferenzpunkt",
              "type": "info"
            }
          ]
        },
        "heightChart": {
          "title": "Körpergrößen-Umrechnungstabelle",
          "items": [
            {
              "text": "150 cm = 4'11,1\" — kleine Erwachsenengröße",
              "type": "info"
            },
            {
              "text": "160 cm = 5'3,0\" — durchschnittliche Frauengröße in vielen Ländern",
              "type": "info"
            },
            {
              "text": "170 cm = 5'6,9\" — zwischen männlichem und weiblichem Durchschnitt weltweit",
              "type": "info"
            },
            {
              "text": "175 cm = 5'8,9\" — durchschnittliche Männergröße in den USA",
              "type": "info"
            },
            {
              "text": "180 cm = 5'10,9\" — groß in den meisten Ländern",
              "type": "info"
            },
            {
              "text": "190 cm = 6'2,8\" — sehr groß, Basketballspieler-Bereich",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "CM zu Zoll Beispiele",
          "description": "Schritt-für-Schritt Umrechnungen",
          "examples": [
            {
              "title": "175 cm in Fuß und Zoll umrechnen",
              "steps": [
                "175 ÷ 2,54 = 68,898 Zoll",
                "68,898 ÷ 12 = 5 Fuß Rest 8,898",
                "Gerundet: 5 Fuß 8,9 Zoll",
                "Oder etwa 5'9\""
              ],
              "result": "175 cm = 5 Fuß 8,9 Zoll (≈ 5'9\")"
            },
            {
              "title": "55-Zoll TV in cm umrechnen",
              "steps": [
                "55 Zoll × 2,54 = 139,7 cm",
                "Bildschirmdiagonale = 139,7 cm",
                "Breite (16:9) ≈ 121,7 cm",
                "Höhe (16:9) ≈ 68,5 cm"
              ],
              "result": "55 Zoll = 139,7 cm diagonal"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Zoll sind 1 cm?",
          "answer": "1 Zentimeter entspricht 0,393701 Zoll. Um cm in Zoll umzurechnen, teilen Sie den cm-Wert durch 2,54. Zum Beispiel: 10 cm = 10 ÷ 2,54 = 3,937 Zoll."
        },
        {
          "question": "Wie rechne ich cm in Fuß und Zoll um?",
          "answer": "Teilen Sie zuerst cm durch 2,54, um die Gesamtzoll zu erhalten. Teilen Sie dann die Gesamtzoll durch 12 — die ganze Zahl sind Fuß, der Rest sind Zoll. Beispiel: 170 cm ÷ 2,54 = 66,93 Zoll; 66,93 ÷ 12 = 5 Fuß 6,93 Zoll ≈ 5'7\"."
        },
        {
          "question": "Was sind 170 cm in Fuß und Zoll?",
          "answer": "170 cm = 66,93 Zoll = 5 Fuß 6,93 Zoll, was etwa 5'7\" entspricht. Das liegt nahe der durchschnittlichen Erwachsenengröße in vielen Ländern."
        },
        {
          "question": "Was sind 180 cm in Fuß?",
          "answer": "180 cm = 70,87 Zoll = 5 Fuß 10,87 Zoll, etwa 5'11\". Das gilt als überdurchschnittliche Größe für Männer in den meisten Ländern."
        },
        {
          "question": "Wie viele cm hat ein Fuß?",
          "answer": "Es gibt genau 30,48 Zentimeter in einem Fuß. Das liegt daran, dass 1 Fuß = 12 Zoll, und 1 Zoll = 2,54 cm, also 12 × 2,54 = 30,48 cm."
        },
        {
          "question": "Ist die cm zu Zoll Umrechnung exakt oder ungefähr?",
          "answer": "Die Umrechnung ist exakt: 1 Zoll = genau 2,54 cm per internationaler Definition (seit 1959). Also 1 cm = genau 10/25,4 Zoll = 0,393700787... Zoll. Jede Rundung in den Ergebnissen liegt an der Dezimalanzeige, nicht an Ungenauigkeit des Umrechnungsfaktors."
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
      placeholder: "170",
      min: 0,
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "cm",
    },
  ],

  inputGroups: [],

  results: [
    { id: "inches", type: "primary", format: "text" },
    { id: "feetInches", type: "secondary", format: "text" },
    { id: "feet", type: "secondary", format: "text" },
    { id: "millimeters", type: "secondary", format: "text" },
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
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Specifications for Length", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: Definition of the Metre", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "CM to Inches" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["inches-to-cm", "length-converter", "feet-to-meters"],
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

export function calculateCmToInches(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Convert any input unit to mm (base of length_small), then to cm
  const fromUnit = fieldUnits.amount || "cm";
  const mm = convertToBase(amount, fromUnit, "length_small");
  const cm = mm / 10;

  const inches = cm / 2.54;
  const totalFeet = inches / 12;
  const feetPart = Math.floor(totalFeet);
  const inchesPart = inches - (feetPart * 12);
  const millimeters = cm * 10;

  // Quick reference
  const ref1 = 1 / 2.54;
  const ref10 = 10 / 2.54;
  const ref30 = 30 / 2.54;
  const ref100 = 100 / 2.54;

  return {
    values: { inches, feetInches: inches, feet: totalFeet, millimeters: mm },
    formatted: {
      inches: `${fmtNum(inches)} in`,
      feetInches: `${feetPart}' ${fmtNum(Math.round(inchesPart * 10) / 10)}"`,
      feet: `${fmtNum(totalFeet)} ft`,
      millimeters: `${fmtNum(mm)} mm`,
      ref1: `${fmtNum(ref1)} in`,
      ref10: `${fmtNum(ref10)} in`,
      ref30: `${fmtNum(ref30)} in (≈1 ft)`,
      ref100: `${fmtNum(ref100)} in`,
    },
    summary: `${fmtNum(cm)} cm = ${fmtNum(inches)} inches = ${feetPart}' ${Math.round(inchesPart * 10) / 10}"`,
    isValid: true,
  };
}

export default cmToInchesConverterConfig;
