import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// FEET TO CM CONVERTER - V4 (EN ONLY)
// ============================================================================

export const feetToCmConverterConfig: CalculatorConfigV4 = {
  id: "feet-to-cm",
  version: "4.0",
  category: "conversion",
  icon: "📏",

  presets: [
    { id: "height54", icon: "👩", values: { amount: 5.333 } },
    { id: "height59", icon: "🧑", values: { amount: 5.75 } },
    { id: "height60", icon: "🧑‍🦱", values: { amount: 6 } },
  ],

  t: {
    en: {
      name: "Feet to CM Converter",
      slug: "feet-to-cm",
      subtitle: "Convert feet to centimeters instantly — ideal for height, furniture, and room measurements.",
      breadcrumb: "Feet to CM",

      seo: {
        title: "Feet to CM Converter - Free Height Conversion Tool",
        description: "Convert feet to centimeters instantly. Ideal for height conversions, furniture sizing, and room measurements. Includes height chart and common references.",
        shortDescription: "Convert feet to centimeters instantly.",
        keywords: ["feet to cm", "ft to cm converter", "feet to centimeters", "height converter feet to cm", "5 feet in cm", "free feet to cm", "imperial to metric height"],
      },

      calculator: { yourInformation: "Feet to CM" },
      ui: { yourInformation: "Feet to CM", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Length", helpText: "Enter value and select unit" },
      },

      results: {
        centimeters: { label: "Centimeters" },
        meters: { label: "Meters" },
        millimeters: { label: "Millimeters" },
        inches: { label: "Inches" },
        yards: { label: "Yards" },
      },

      presets: {
        height54: { label: "5'4\"", description: "5.33 ft ≈ 162.6 cm (avg US female)" },
        height59: { label: "5'9\"", description: "5.75 ft ≈ 175.3 cm (avg US male)" },
        height60: { label: "6'0\"", description: "6 ft = 182.9 cm" },
      },

      values: { "cm": "cm", "m": "m", "mm": "mm", "in": "in", "yd": "yd", "ft": "ft" },
      formats: { summary: "{ft} ft = {cm} cm" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Centimeters", valueKey: "centimeters" },
            { label: "Meters", valueKey: "meters" },
            { label: "Millimeters", valueKey: "millimeters" },
            { label: "Inches", valueKey: "inches" },
          ],
        },
        quickRef: {
          title: "📊 Height Chart",
          items: [
            { label: "5'0\"", valueKey: "ref50" },
            { label: "5'6\"", valueKey: "ref56" },
            { label: "6'0\"", valueKey: "ref60" },
            { label: "6'6\"", valueKey: "ref66" },
          ],
        },
        tips: {
          title: "💡 Quick Tips",
          items: [
            "Multiply feet by 30.48 to get cm — this is exact.",
            "For feet + inches: (feet × 30.48) + (inches × 2.54).",
            "Quick reference: 5 ft = 152.4 cm, 6 ft = 182.88 cm.",
            "Each additional inch adds 2.54 cm to the total.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Feet to Centimeters",
          content: "To convert feet to centimeters, multiply by 30.48. One foot equals exactly 30.48 centimeters. For feet and inches combined, multiply the feet by 30.48 and add the inches multiplied by 2.54. This conversion is essential when comparing heights internationally, shopping for clothes or furniture from metric countries, or filling out forms that require cm. While the US uses feet and inches for height, most medical records worldwide use centimeters for greater precision.",
        },
        howItWorks: {
          title: "The Feet to CM Formula",
          content: "The formula is: cm = feet × 30.48. For feet and inches: cm = (feet × 30.48) + (inches × 2.54). The factor 30.48 comes from 12 inches per foot × 2.54 cm per inch. Example: 5'10\" = (5 × 30.48) + (10 × 2.54) = 152.4 + 25.4 = 177.8 cm. This is an exact conversion — there's no rounding involved. For decimal feet: 5.83 ft × 30.48 = 177.7 cm.",
        },
        considerations: {
          title: "Common Feet to CM Conversions",
          items: [
            { text: "5'0\" = 152.4 cm — petite height", type: "info" },
            { text: "5'4\" = 162.6 cm — average US female height", type: "info" },
            { text: "5'7\" = 170.2 cm — near global average", type: "info" },
            { text: "5'9\" = 175.3 cm — average US male height", type: "info" },
            { text: "6'0\" = 182.9 cm — considered tall", type: "info" },
            { text: "6'6\" = 198.1 cm — very tall, NBA average", type: "info" },
          ],
        },
        furnitureSizes: {
          title: "Furniture & Room Sizes (ft → cm)",
          items: [
            { text: "Standard door: 6'8\" × 2'8\" = 203 × 81 cm", type: "info" },
            { text: "Twin bed: 6'3\" × 3'3\" = 191 × 99 cm", type: "info" },
            { text: "Queen bed: 6'8\" × 5'0\" = 203 × 152 cm", type: "info" },
            { text: "King bed: 6'8\" × 6'4\" = 203 × 193 cm", type: "info" },
            { text: "Standard desk: 2'6\" high = 76 cm (30 inches)", type: "info" },
            { text: "Counter height: 3'0\" = 91.4 cm (36 inches)", type: "info" },
          ],
        },
        examples: {
          title: "Feet to CM Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 5'8\" to cm",
              steps: ["Feet portion: 5 × 30.48 = 152.4 cm", "Inches portion: 8 × 2.54 = 20.32 cm", "Total: 152.4 + 20.32 = 172.72 cm", "Or: 68 total inches × 2.54 = 172.72 cm"],
              result: "5'8\" = 172.72 cm ≈ 1.73 m",
            },
            {
              title: "Room: 10 × 12 feet to cm",
              steps: ["10 ft × 30.48 = 304.8 cm = 3.048 m", "12 ft × 30.48 = 365.76 cm = 3.658 m", "Area: 120 sq ft = 11.15 m²", "Useful for furniture planning in metric"],
              result: "10 × 12 ft = 305 × 366 cm (3.05 × 3.66 m)",
            },
          ],
        },
      },

      faqs: [
        { question: "How many cm is 1 foot?", answer: "1 foot equals exactly 30.48 centimeters. This is an exact conversion factor established by international agreement in 1959." },
        { question: "How do I convert feet and inches to cm?", answer: "Multiply feet by 30.48 and inches by 2.54, then add. Example: 5'10\" = (5 × 30.48) + (10 × 2.54) = 152.4 + 25.4 = 177.8 cm. Or convert to total inches first (5 × 12 + 10 = 70) then multiply by 2.54." },
        { question: "How many cm is 5 feet?", answer: "5 feet = 152.4 cm exactly. 5'0\" = 152.4 cm, 5'6\" = 167.64 cm, 5'9\" = 175.26 cm. Each additional inch adds 2.54 cm." },
        { question: "How tall is 6 feet in cm?", answer: "6 feet = 182.88 cm, commonly rounded to 183 cm. In meters, that's about 1.83 m. 6'0\" is considered tall in most countries." },
        { question: "Why do some countries use cm and others use feet?", answer: "Most countries adopted the metric system (cm/m) by the mid-20th century. The US retained feet/inches from the British imperial system. The UK uses a mix — metric officially but feet/inches for height in daily life. For international purposes, centimeters are the standard for height." },
        { question: "How do I convert square feet to square cm?", answer: "Multiply square feet by 929.03 to get square centimeters (30.48² = 929.03). Or multiply by 0.0929 to get square meters. Example: 200 sq ft = 185,806 cm² = 18.58 m²." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de Pies a CM",
      "slug": "calculadora-pies-a-centimetros",
      "subtitle": "Convierte pies a centímetros al instante — ideal para mediciones de altura, muebles y habitaciones.",
      "breadcrumb": "Pies a CM",
      "seo": {
        "title": "Convertidor de Pies a CM - Herramienta Gratuita de Conversión de Altura",
        "description": "Convierte pies a centímetros al instante. Ideal para conversiones de altura, dimensiones de muebles y mediciones de habitaciones. Incluye tabla de alturas y referencias comunes.",
        "shortDescription": "Convierte pies a centímetros al instante.",
        "keywords": [
          "pies a cm",
          "convertidor ft a cm",
          "pies a centímetros",
          "convertidor altura pies a cm",
          "5 pies en cm",
          "pies a cm gratis",
          "altura imperial a métrica"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Longitud",
          "helpText": "Ingrese el valor y seleccione la unidad"
        }
      },
      "results": {
        "centimeters": {
          "label": "Centímetros"
        },
        "meters": {
          "label": "Metros"
        },
        "millimeters": {
          "label": "Milímetros"
        },
        "inches": {
          "label": "Pulgadas"
        },
        "yards": {
          "label": "Yardas"
        }
      },
      "presets": {
        "height54": {
          "label": "5'4\"",
          "description": "5.33 ft ≈ 162.6 cm (promedio mujer EE.UU.)"
        },
        "height59": {
          "label": "5'9\"",
          "description": "5.75 ft ≈ 175.3 cm (promedio hombre EE.UU.)"
        },
        "height60": {
          "label": "6'0\"",
          "description": "6 ft = 182.9 cm"
        }
      },
      "values": {
        "cm": "cm",
        "m": "m",
        "mm": "mm",
        "in": "in",
        "yd": "yd",
        "ft": "ft"
      },
      "formats": {
        "summary": "{ft} ft = {cm} cm"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados de Conversión",
          "items": [
            {
              "label": "Centímetros",
              "valueKey": "centimeters"
            },
            {
              "label": "Metros",
              "valueKey": "meters"
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
          "title": "📊 Tabla de Alturas",
          "items": [
            {
              "label": "5'0\"",
              "valueKey": "ref50"
            },
            {
              "label": "5'6\"",
              "valueKey": "ref56"
            },
            {
              "label": "6'0\"",
              "valueKey": "ref60"
            },
            {
              "label": "6'6\"",
              "valueKey": "ref66"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos Rápidos",
          "items": [
            "Multiplica los pies por 30.48 para obtener cm — esto es exacto.",
            "Para pies + pulgadas: (pies × 30.48) + (pulgadas × 2.54).",
            "Referencia rápida: 5 ft = 152.4 cm, 6 ft = 182.88 cm.",
            "Cada pulgada adicional suma 2.54 cm al total."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir Pies a Centímetros",
          "content": "Para convertir pies a centímetros, multiplica por 30.48. Un pie equivale exactamente a 30.48 centímetros. Para pies y pulgadas combinados, multiplica los pies por 30.48 y suma las pulgadas multiplicadas por 2.54. Esta conversión es esencial al comparar alturas internacionalmente, comprar ropa o muebles de países métricos, o llenar formularios que requieren cm. Aunque EE.UU. usa pies y pulgadas para la altura, la mayoría de los registros médicos mundiales usan centímetros para mayor precisión."
        },
        "howItWorks": {
          "title": "La Fórmula de Pies a CM",
          "content": "La fórmula es: cm = pies × 30.48. Para pies y pulgadas: cm = (pies × 30.48) + (pulgadas × 2.54). El factor 30.48 proviene de 12 pulgadas por pie × 2.54 cm por pulgada. Ejemplo: 5'10\" = (5 × 30.48) + (10 × 2.54) = 152.4 + 25.4 = 177.8 cm. Esta es una conversión exacta — no hay redondeo involucrado. Para pies decimales: 5.83 ft × 30.48 = 177.7 cm."
        },
        "considerations": {
          "title": "Conversiones Comunes de Pies a CM",
          "items": [
            {
              "text": "5'0\" = 152.4 cm — altura pequeña",
              "type": "info"
            },
            {
              "text": "5'4\" = 162.6 cm — altura promedio mujer EE.UU.",
              "type": "info"
            },
            {
              "text": "5'7\" = 170.2 cm — cerca del promedio mundial",
              "type": "info"
            },
            {
              "text": "5'9\" = 175.3 cm — altura promedio hombre EE.UU.",
              "type": "info"
            },
            {
              "text": "6'0\" = 182.9 cm — considerado alto",
              "type": "info"
            },
            {
              "text": "6'6\" = 198.1 cm — muy alto, promedio NBA",
              "type": "info"
            }
          ]
        },
        "furnitureSizes": {
          "title": "Tamaños de Muebles y Habitaciones (ft → cm)",
          "items": [
            {
              "text": "Puerta estándar: 6'8\" × 2'8\" = 203 × 81 cm",
              "type": "info"
            },
            {
              "text": "Cama individual: 6'3\" × 3'3\" = 191 × 99 cm",
              "type": "info"
            },
            {
              "text": "Cama matrimonial: 6'8\" × 5'0\" = 203 × 152 cm",
              "type": "info"
            },
            {
              "text": "Cama king: 6'8\" × 6'4\" = 203 × 193 cm",
              "type": "info"
            },
            {
              "text": "Escritorio estándar: 2'6\" alto = 76 cm (30 pulgadas)",
              "type": "info"
            },
            {
              "text": "Altura de mostrador: 3'0\" = 91.4 cm (36 pulgadas)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Pies a CM",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Convertir 5'8\" a cm",
              "steps": [
                "Porción de pies: 5 × 30.48 = 152.4 cm",
                "Porción de pulgadas: 8 × 2.54 = 20.32 cm",
                "Total: 152.4 + 20.32 = 172.72 cm",
                "O: 68 pulgadas totales × 2.54 = 172.72 cm"
              ],
              "result": "5'8\" = 172.72 cm ≈ 1.73 m"
            },
            {
              "title": "Habitación: 10 × 12 pies a cm",
              "steps": [
                "10 ft × 30.48 = 304.8 cm = 3.048 m",
                "12 ft × 30.48 = 365.76 cm = 3.658 m",
                "Área: 120 pies² = 11.15 m²",
                "Útil para planificar muebles en métrico"
              ],
              "result": "10 × 12 ft = 305 × 366 cm (3.05 × 3.66 m)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos cm tiene 1 pie?",
          "answer": "1 pie equivale exactamente a 30.48 centímetros. Este es un factor de conversión exacto establecido por acuerdo internacional en 1959."
        },
        {
          "question": "¿Cómo convierto pies y pulgadas a cm?",
          "answer": "Multiplica los pies por 30.48 y las pulgadas por 2.54, luego suma. Ejemplo: 5'10\" = (5 × 30.48) + (10 × 2.54) = 152.4 + 25.4 = 177.8 cm. O convierte primero a pulgadas totales (5 × 12 + 10 = 70) luego multiplica por 2.54."
        },
        {
          "question": "¿Cuántos cm son 5 pies?",
          "answer": "5 pies = 152.4 cm exactamente. 5'0\" = 152.4 cm, 5'6\" = 167.64 cm, 5'9\" = 175.26 cm. Cada pulgada adicional suma 2.54 cm."
        },
        {
          "question": "¿Cuánto mide 6 pies en cm?",
          "answer": "6 pies = 182.88 cm, comúnmente redondeado a 183 cm. En metros, son aproximadamente 1.83 m. 6'0\" se considera alto en la mayoría de países."
        },
        {
          "question": "¿Por qué algunos países usan cm y otros pies?",
          "answer": "La mayoría de países adoptó el sistema métrico (cm/m) a mediados del siglo XX. EE.UU. mantuvo pies/pulgadas del sistema imperial británico. Reino Unido usa una mezcla — métrico oficialmente pero pies/pulgadas para altura en la vida diaria. Para propósitos internacionales, los centímetros son el estándar para altura."
        },
        {
          "question": "¿Cómo convierto pies cuadrados a cm cuadrados?",
          "answer": "Multiplica los pies cuadrados por 929.03 para obtener centímetros cuadrados (30.48² = 929.03). O multiplica por 0.0929 para obtener metros cuadrados. Ejemplo: 200 pies² = 185,806 cm² = 18.58 m²."
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
      "name": "Conversor de Pés para CM",
      "slug": "calculadora-pes-para-cm",
      "subtitle": "Converta pés para centímetros instantaneamente — ideal para altura, móveis e medidas de ambiente.",
      "breadcrumb": "Pés para CM",
      "seo": {
        "title": "Conversor de Pés para CM - Ferramenta Gratuita de Conversão de Altura",
        "description": "Converta pés para centímetros instantaneamente. Ideal para conversões de altura, dimensionamento de móveis e medidas de ambiente. Inclui tabela de altura e referências comuns.",
        "shortDescription": "Converta pés para centímetros instantaneamente.",
        "keywords": [
          "pés para cm",
          "conversor ft para cm",
          "pés para centímetros",
          "conversor altura pés para cm",
          "5 pés em cm",
          "pés para cm grátis",
          "altura imperial para métrica"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Comprimento",
          "helpText": "Digite o valor e selecione a unidade"
        }
      },
      "results": {
        "centimeters": {
          "label": "Centímetros"
        },
        "meters": {
          "label": "Metros"
        },
        "millimeters": {
          "label": "Milímetros"
        },
        "inches": {
          "label": "Polegadas"
        },
        "yards": {
          "label": "Jardas"
        }
      },
      "presets": {
        "height54": {
          "label": "5'4\"",
          "description": "5,33 pés ≈ 162,6 cm (média feminina EUA)"
        },
        "height59": {
          "label": "5'9\"",
          "description": "5,75 pés ≈ 175,3 cm (média masculina EUA)"
        },
        "height60": {
          "label": "6'0\"",
          "description": "6 pés = 182,9 cm"
        }
      },
      "values": {
        "cm": "cm",
        "m": "m",
        "mm": "mm",
        "in": "pol",
        "yd": "yd",
        "ft": "pés"
      },
      "formats": {
        "summary": "{ft} pés = {cm} cm"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados da Conversão",
          "items": [
            {
              "label": "Centímetros",
              "valueKey": "centimeters"
            },
            {
              "label": "Metros",
              "valueKey": "meters"
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
          "title": "📊 Tabela de Altura",
          "items": [
            {
              "label": "5'0\"",
              "valueKey": "ref50"
            },
            {
              "label": "5'6\"",
              "valueKey": "ref56"
            },
            {
              "label": "6'0\"",
              "valueKey": "ref60"
            },
            {
              "label": "6'6\"",
              "valueKey": "ref66"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas Rápidas",
          "items": [
            "Multiplique pés por 30,48 para obter cm — isso é exato.",
            "Para pés + polegadas: (pés × 30,48) + (polegadas × 2,54).",
            "Referência rápida: 5 pés = 152,4 cm, 6 pés = 182,88 cm.",
            "Cada polegada adicional acrescenta 2,54 cm ao total."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter Pés para Centímetros",
          "content": "Para converter pés para centímetros, multiplique por 30,48. Um pé equivale exatamente a 30,48 centímetros. Para pés e polegadas combinados, multiplique os pés por 30,48 e adicione as polegadas multiplicadas por 2,54. Esta conversão é essencial ao comparar alturas internacionalmente, comprar roupas ou móveis de países métricos, ou preencher formulários que exigem cm. Enquanto os EUA usam pés e polegadas para altura, a maioria dos registros médicos mundiais usa centímetros para maior precisão."
        },
        "howItWorks": {
          "title": "A Fórmula de Pés para CM",
          "content": "A fórmula é: cm = pés × 30,48. Para pés e polegadas: cm = (pés × 30,48) + (polegadas × 2,54). O fator 30,48 vem de 12 polegadas por pé × 2,54 cm por polegada. Exemplo: 5'10\" = (5 × 30,48) + (10 × 2,54) = 152,4 + 25,4 = 177,8 cm. Esta é uma conversão exata — não há arredondamento envolvido. Para pés decimais: 5,83 pés × 30,48 = 177,7 cm."
        },
        "considerations": {
          "title": "Conversões Comuns de Pés para CM",
          "items": [
            {
              "text": "5'0\" = 152,4 cm — altura baixa",
              "type": "info"
            },
            {
              "text": "5'4\" = 162,6 cm — altura média feminina EUA",
              "type": "info"
            },
            {
              "text": "5'7\" = 170,2 cm — próximo da média mundial",
              "type": "info"
            },
            {
              "text": "5'9\" = 175,3 cm — altura média masculina EUA",
              "type": "info"
            },
            {
              "text": "6'0\" = 182,9 cm — considerado alto",
              "type": "info"
            },
            {
              "text": "6'6\" = 198,1 cm — muito alto, média NBA",
              "type": "info"
            }
          ]
        },
        "furnitureSizes": {
          "title": "Móveis e Ambientes (pés → cm)",
          "items": [
            {
              "text": "Porta padrão: 6'8\" × 2'8\" = 203 × 81 cm",
              "type": "info"
            },
            {
              "text": "Cama solteiro: 6'3\" × 3'3\" = 191 × 99 cm",
              "type": "info"
            },
            {
              "text": "Cama queen: 6'8\" × 5'0\" = 203 × 152 cm",
              "type": "info"
            },
            {
              "text": "Cama king: 6'8\" × 6'4\" = 203 × 193 cm",
              "type": "info"
            },
            {
              "text": "Mesa padrão: 2'6\" altura = 76 cm (30 polegadas)",
              "type": "info"
            },
            {
              "text": "Altura balcão: 3'0\" = 91,4 cm (36 polegadas)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Pés para CM",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Converter 5'8\" para cm",
              "steps": [
                "Parte dos pés: 5 × 30,48 = 152,4 cm",
                "Parte das polegadas: 8 × 2,54 = 20,32 cm",
                "Total: 152,4 + 20,32 = 172,72 cm",
                "Ou: 68 polegadas totais × 2,54 = 172,72 cm"
              ],
              "result": "5'8\" = 172,72 cm ≈ 1,73 m"
            },
            {
              "title": "Ambiente: 10 × 12 pés para cm",
              "steps": [
                "10 pés × 30,48 = 304,8 cm = 3,048 m",
                "12 pés × 30,48 = 365,76 cm = 3,658 m",
                "Área: 120 pés² = 11,15 m²",
                "Útil para planejamento de móveis em métrico"
              ],
              "result": "10 × 12 pés = 305 × 366 cm (3,05 × 3,66 m)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos cm tem 1 pé?",
          "answer": "1 pé equivale exatamente a 30,48 centímetros. Este é um fator de conversão exato estabelecido por acordo internacional em 1959."
        },
        {
          "question": "Como converter pés e polegadas para cm?",
          "answer": "Multiplique pés por 30,48 e polegadas por 2,54, depois some. Exemplo: 5'10\" = (5 × 30,48) + (10 × 2,54) = 152,4 + 25,4 = 177,8 cm. Ou converta primeiro para polegadas totais (5 × 12 + 10 = 70) depois multiplique por 2,54."
        },
        {
          "question": "Quantos cm tem 5 pés?",
          "answer": "5 pés = 152,4 cm exatamente. 5'0\" = 152,4 cm, 5'6\" = 167,64 cm, 5'9\" = 175,26 cm. Cada polegada adicional acrescenta 2,54 cm."
        },
        {
          "question": "Qual a altura de 6 pés em cm?",
          "answer": "6 pés = 182,88 cm, comumente arredondado para 183 cm. Em metros, isso é cerca de 1,83 m. 6'0\" é considerado alto na maioria dos países."
        },
        {
          "question": "Por que alguns países usam cm e outros usam pés?",
          "answer": "A maioria dos países adotou o sistema métrico (cm/m) até meados do século XX. Os EUA mantiveram pés/polegadas do sistema imperial britânico. O Reino Unido usa uma mistura — métrico oficialmente mas pés/polegadas para altura no dia a dia. Para fins internacionais, centímetros são o padrão para altura."
        },
        {
          "question": "Como converter pés quadrados para cm quadrados?",
          "answer": "Multiplique pés quadrados por 929,03 para obter centímetros quadrados (30,48² = 929,03). Ou multiplique por 0,0929 para obter metros quadrados. Exemplo: 200 pés² = 185.806 cm² = 18,58 m²."
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
      "name": "Convertisseur Pieds vers CM",
      "slug": "calculateur-pieds-vers-centimetres",
      "subtitle": "Convertissez instantanément les pieds en centimètres — idéal pour la taille, les meubles et les mesures de pièces.",
      "breadcrumb": "Pieds vers CM",
      "seo": {
        "title": "Convertisseur Pieds vers CM - Outil de Conversion de Taille Gratuit",
        "description": "Convertissez instantanément les pieds en centimètres. Idéal pour les conversions de taille, le dimensionnement de meubles et les mesures de pièces. Inclut un tableau de tailles et des références communes.",
        "shortDescription": "Convertissez instantanément les pieds en centimètres.",
        "keywords": [
          "pieds vers cm",
          "convertisseur pi vers cm",
          "pieds en centimètres",
          "convertisseur taille pieds vers cm",
          "5 pieds en cm",
          "pieds vers cm gratuit",
          "taille impérial vers métrique"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Longueur",
          "helpText": "Entrez la valeur et sélectionnez l'unité"
        }
      },
      "results": {
        "centimeters": {
          "label": "Centimètres"
        },
        "meters": {
          "label": "Mètres"
        },
        "millimeters": {
          "label": "Millimètres"
        },
        "inches": {
          "label": "Pouces"
        },
        "yards": {
          "label": "Verges"
        }
      },
      "presets": {
        "height54": {
          "label": "5'4\"",
          "description": "5,33 pi ≈ 162,6 cm (femme américaine moyenne)"
        },
        "height59": {
          "label": "5'9\"",
          "description": "5,75 pi ≈ 175,3 cm (homme américain moyen)"
        },
        "height60": {
          "label": "6'0\"",
          "description": "6 pi = 182,9 cm"
        }
      },
      "values": {
        "cm": "cm",
        "m": "m",
        "mm": "mm",
        "in": "po",
        "yd": "vg",
        "ft": "pi"
      },
      "formats": {
        "summary": "{ft} pi = {cm} cm"
      },
      "infoCards": {
        "results": {
          "title": "📏 Résultats de Conversion",
          "items": [
            {
              "label": "Centimètres",
              "valueKey": "centimeters"
            },
            {
              "label": "Mètres",
              "valueKey": "meters"
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
          "title": "📊 Tableau des Tailles",
          "items": [
            {
              "label": "5'0\"",
              "valueKey": "ref50"
            },
            {
              "label": "5'6\"",
              "valueKey": "ref56"
            },
            {
              "label": "6'0\"",
              "valueKey": "ref60"
            },
            {
              "label": "6'6\"",
              "valueKey": "ref66"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils Rapides",
          "items": [
            "Multipliez les pieds par 30,48 pour obtenir les cm — c'est exact.",
            "Pour pieds + pouces : (pieds × 30,48) + (pouces × 2,54).",
            "Référence rapide : 5 pi = 152,4 cm, 6 pi = 182,88 cm.",
            "Chaque pouce supplémentaire ajoute 2,54 cm au total."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir les Pieds en Centimètres",
          "content": "Pour convertir les pieds en centimètres, multipliez par 30,48. Un pied équivaut exactement à 30,48 centimètres. Pour les pieds et pouces combinés, multipliez les pieds par 30,48 et ajoutez les pouces multipliés par 2,54. Cette conversion est essentielle pour comparer les tailles internationalement, acheter des vêtements ou des meubles dans des pays métriques, ou remplir des formulaires nécessitant les cm. Alors que les États-Unis utilisent les pieds et pouces pour la taille, la plupart des dossiers médicaux mondiaux utilisent les centimètres pour une plus grande précision."
        },
        "howItWorks": {
          "title": "La Formule Pieds vers CM",
          "content": "La formule est : cm = pieds × 30,48. Pour pieds et pouces : cm = (pieds × 30,48) + (pouces × 2,54). Le facteur 30,48 provient de 12 pouces par pied × 2,54 cm par pouce. Exemple : 5'10\" = (5 × 30,48) + (10 × 2,54) = 152,4 + 25,4 = 177,8 cm. C'est une conversion exacte — il n'y a pas d'arrondi. Pour les pieds décimaux : 5,83 pi × 30,48 = 177,7 cm."
        },
        "considerations": {
          "title": "Conversions Courantes Pieds vers CM",
          "items": [
            {
              "text": "5'0\" = 152,4 cm — taille petite",
              "type": "info"
            },
            {
              "text": "5'4\" = 162,6 cm — taille moyenne femme américaine",
              "type": "info"
            },
            {
              "text": "5'7\" = 170,2 cm — proche de la moyenne mondiale",
              "type": "info"
            },
            {
              "text": "5'9\" = 175,3 cm — taille moyenne homme américain",
              "type": "info"
            },
            {
              "text": "6'0\" = 182,9 cm — considéré comme grand",
              "type": "info"
            },
            {
              "text": "6'6\" = 198,1 cm — très grand, moyenne NBA",
              "type": "info"
            }
          ]
        },
        "furnitureSizes": {
          "title": "Tailles de Meubles et Pièces (pi → cm)",
          "items": [
            {
              "text": "Porte standard : 6'8\" × 2'8\" = 203 × 81 cm",
              "type": "info"
            },
            {
              "text": "Lit simple : 6'3\" × 3'3\" = 191 × 99 cm",
              "type": "info"
            },
            {
              "text": "Lit queen : 6'8\" × 5'0\" = 203 × 152 cm",
              "type": "info"
            },
            {
              "text": "Lit king : 6'8\" × 6'4\" = 203 × 193 cm",
              "type": "info"
            },
            {
              "text": "Bureau standard : 2'6\" de haut = 76 cm (30 pouces)",
              "type": "info"
            },
            {
              "text": "Hauteur comptoir : 3'0\" = 91,4 cm (36 pouces)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples Pieds vers CM",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Convertir 5'8\" en cm",
              "steps": [
                "Portion pieds : 5 × 30,48 = 152,4 cm",
                "Portion pouces : 8 × 2,54 = 20,32 cm",
                "Total : 152,4 + 20,32 = 172,72 cm",
                "Ou : 68 pouces total × 2,54 = 172,72 cm"
              ],
              "result": "5'8\" = 172,72 cm ≈ 1,73 m"
            },
            {
              "title": "Pièce : 10 × 12 pieds en cm",
              "steps": [
                "10 pi × 30,48 = 304,8 cm = 3,048 m",
                "12 pi × 30,48 = 365,76 cm = 3,658 m",
                "Surface : 120 pi² = 11,15 m²",
                "Utile pour planifier les meubles en métrique"
              ],
              "result": "10 × 12 pi = 305 × 366 cm (3,05 × 3,66 m)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de cm fait 1 pied ?",
          "answer": "1 pied équivaut exactement à 30,48 centimètres. C'est un facteur de conversion exact établi par accord international en 1959."
        },
        {
          "question": "Comment convertir pieds et pouces en cm ?",
          "answer": "Multipliez les pieds par 30,48 et les pouces par 2,54, puis additionnez. Exemple : 5'10\" = (5 × 30,48) + (10 × 2,54) = 152,4 + 25,4 = 177,8 cm. Ou convertissez d'abord en pouces total (5 × 12 + 10 = 70) puis multipliez par 2,54."
        },
        {
          "question": "Combien de cm font 5 pieds ?",
          "answer": "5 pieds = 152,4 cm exactement. 5'0\" = 152,4 cm, 5'6\" = 167,64 cm, 5'9\" = 175,26 cm. Chaque pouce supplémentaire ajoute 2,54 cm."
        },
        {
          "question": "Quelle est la taille de 6 pieds en cm ?",
          "answer": "6 pieds = 182,88 cm, communément arrondi à 183 cm. En mètres, c'est environ 1,83 m. 6'0\" est considéré comme grand dans la plupart des pays."
        },
        {
          "question": "Pourquoi certains pays utilisent les cm et d'autres les pieds ?",
          "answer": "La plupart des pays ont adopté le système métrique (cm/m) vers le milieu du XXe siècle. Les États-Unis ont conservé les pieds/pouces du système impérial britannique. Le Royaume-Uni utilise un mélange — métrique officiellement mais pieds/pouces pour la taille dans la vie quotidienne. Pour les besoins internationaux, les centimètres sont la norme pour la taille."
        },
        {
          "question": "Comment convertir les pieds carrés en cm carrés ?",
          "answer": "Multipliez les pieds carrés par 929,03 pour obtenir les centimètres carrés (30,48² = 929,03). Ou multipliez par 0,0929 pour obtenir les mètres carrés. Exemple : 200 pi² = 185 806 cm² = 18,58 m²."
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
      "name": "Fuß zu CM Umrechner",
      "slug": "fuss-zu-cm-rechner",
      "subtitle": "Fuß in Zentimeter sofort umrechnen — ideal für Körpergröße, Möbel und Raummaße.",
      "breadcrumb": "Fuß zu CM",
      "seo": {
        "title": "Fuß zu CM Umrechner - Kostenloses Größenumrechnung Tool",
        "description": "Fuß in Zentimeter sofort umrechnen. Ideal für Größenumrechnungen, Möbelmaße und Raummessungen. Enthält Größentabelle und häufige Referenzen.",
        "shortDescription": "Fuß in Zentimeter sofort umrechnen.",
        "keywords": [
          "fuß zu cm",
          "ft zu cm umrechner",
          "fuß zu zentimeter",
          "größe umrechner fuß zu cm",
          "5 fuß in cm",
          "kostenlos fuß zu cm",
          "imperial zu metrisch größe"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Länge",
          "helpText": "Wert eingeben und Einheit wählen"
        }
      },
      "results": {
        "centimeters": {
          "label": "Zentimeter"
        },
        "meters": {
          "label": "Meter"
        },
        "millimeters": {
          "label": "Millimeter"
        },
        "inches": {
          "label": "Zoll"
        },
        "yards": {
          "label": "Yards"
        }
      },
      "presets": {
        "height54": {
          "label": "5'4\"",
          "description": "5,33 ft ≈ 162,6 cm (Durchschnitt US Frauen)"
        },
        "height59": {
          "label": "5'9\"",
          "description": "5,75 ft ≈ 175,3 cm (Durchschnitt US Männer)"
        },
        "height60": {
          "label": "6'0\"",
          "description": "6 ft = 182,9 cm"
        }
      },
      "values": {
        "cm": "cm",
        "m": "m",
        "mm": "mm",
        "in": "Zoll",
        "yd": "yd",
        "ft": "ft"
      },
      "formats": {
        "summary": "{ft} ft = {cm} cm"
      },
      "infoCards": {
        "results": {
          "title": "📏 Umrechnungsergebnisse",
          "items": [
            {
              "label": "Zentimeter",
              "valueKey": "centimeters"
            },
            {
              "label": "Meter",
              "valueKey": "meters"
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
          "title": "📊 Größentabelle",
          "items": [
            {
              "label": "5'0\"",
              "valueKey": "ref50"
            },
            {
              "label": "5'6\"",
              "valueKey": "ref56"
            },
            {
              "label": "6'0\"",
              "valueKey": "ref60"
            },
            {
              "label": "6'6\"",
              "valueKey": "ref66"
            }
          ]
        },
        "tips": {
          "title": "💡 Schnelle Tipps",
          "items": [
            "Multipliziere Fuß mit 30,48 um cm zu erhalten — das ist exakt.",
            "Für Fuß + Zoll: (Fuß × 30,48) + (Zoll × 2,54).",
            "Schnellreferenz: 5 ft = 152,4 cm, 6 ft = 182,88 cm.",
            "Jeder zusätzliche Zoll fügt 2,54 cm zur Summe hinzu."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie man Fuß in Zentimeter umrechnet",
          "content": "Um Fuß in Zentimeter umzurechnen, multipliziere mit 30,48. Ein Fuß entspricht exakt 30,48 Zentimetern. Bei kombinierter Fuß- und Zoll-Angabe multipliziere die Fuß mit 30,48 und addiere die Zoll multipliziert mit 2,54. Diese Umrechnung ist wichtig beim internationalen Größenvergleich, beim Einkaufen von Kleidung oder Möbeln aus metrischen Ländern oder beim Ausfüllen von Formularen, die cm erfordern. Während die USA Fuß und Zoll für die Größe verwenden, nutzen die meisten medizinischen Aufzeichnungen weltweit Zentimeter für größere Präzision."
        },
        "howItWorks": {
          "title": "Die Fuß zu CM Formel",
          "content": "Die Formel lautet: cm = Fuß × 30,48. Für Fuß und Zoll: cm = (Fuß × 30,48) + (Zoll × 2,54). Der Faktor 30,48 ergibt sich aus 12 Zoll pro Fuß × 2,54 cm pro Zoll. Beispiel: 5'10\" = (5 × 30,48) + (10 × 2,54) = 152,4 + 25,4 = 177,8 cm. Dies ist eine exakte Umrechnung — es gibt keine Rundung. Für dezimale Fuß: 5,83 ft × 30,48 = 177,7 cm."
        },
        "considerations": {
          "title": "Häufige Fuß zu CM Umrechnungen",
          "items": [
            {
              "text": "5'0\" = 152,4 cm — kleine Größe",
              "type": "info"
            },
            {
              "text": "5'4\" = 162,6 cm — durchschnittliche US Frauengröße",
              "type": "info"
            },
            {
              "text": "5'7\" = 170,2 cm — nahe dem globalen Durchschnitt",
              "type": "info"
            },
            {
              "text": "5'9\" = 175,3 cm — durchschnittliche US Männergröße",
              "type": "info"
            },
            {
              "text": "6'0\" = 182,9 cm — gilt als groß",
              "type": "info"
            },
            {
              "text": "6'6\" = 198,1 cm — sehr groß, NBA Durchschnitt",
              "type": "info"
            }
          ]
        },
        "furnitureSizes": {
          "title": "Möbel- & Raumgrößen (ft → cm)",
          "items": [
            {
              "text": "Standard Tür: 6'8\" × 2'8\" = 203 × 81 cm",
              "type": "info"
            },
            {
              "text": "Einzelbett: 6'3\" × 3'3\" = 191 × 99 cm",
              "type": "info"
            },
            {
              "text": "Queensize Bett: 6'8\" × 5'0\" = 203 × 152 cm",
              "type": "info"
            },
            {
              "text": "Kingsize Bett: 6'8\" × 6'4\" = 203 × 193 cm",
              "type": "info"
            },
            {
              "text": "Standard Schreibtisch: 2'6\" hoch = 76 cm (30 Zoll)",
              "type": "info"
            },
            {
              "text": "Tresen Höhe: 3'0\" = 91,4 cm (36 Zoll)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Fuß zu CM Beispiele",
          "description": "Schritt-für-Schritt Umrechnungen",
          "examples": [
            {
              "title": "5'8\" in cm umrechnen",
              "steps": [
                "Fuß-Anteil: 5 × 30,48 = 152,4 cm",
                "Zoll-Anteil: 8 × 2,54 = 20,32 cm",
                "Gesamt: 152,4 + 20,32 = 172,72 cm",
                "Oder: 68 Zoll gesamt × 2,54 = 172,72 cm"
              ],
              "result": "5'8\" = 172,72 cm ≈ 1,73 m"
            },
            {
              "title": "Raum: 10 × 12 Fuß in cm",
              "steps": [
                "10 ft × 30,48 = 304,8 cm = 3,048 m",
                "12 ft × 30,48 = 365,76 cm = 3,658 m",
                "Fläche: 120 Quadratfuß = 11,15 m²",
                "Nützlich für Möbelplanung in metrisch"
              ],
              "result": "10 × 12 ft = 305 × 366 cm (3,05 × 3,66 m)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele cm hat 1 Fuß?",
          "answer": "1 Fuß entspricht exakt 30,48 Zentimetern. Dies ist ein exakter Umrechnungsfaktor, der 1959 durch internationale Vereinbarung festgelegt wurde."
        },
        {
          "question": "Wie rechne ich Fuß und Zoll in cm um?",
          "answer": "Multipliziere Fuß mit 30,48 und Zoll mit 2,54, dann addiere. Beispiel: 5'10\" = (5 × 30,48) + (10 × 2,54) = 152,4 + 25,4 = 177,8 cm. Oder rechne zuerst in Gesamtzoll um (5 × 12 + 10 = 70) und multipliziere dann mit 2,54."
        },
        {
          "question": "Wie viele cm sind 5 Fuß?",
          "answer": "5 Fuß = 152,4 cm exakt. 5'0\" = 152,4 cm, 5'6\" = 167,64 cm, 5'9\" = 175,26 cm. Jeder zusätzliche Zoll fügt 2,54 cm hinzu."
        },
        {
          "question": "Wie groß sind 6 Fuß in cm?",
          "answer": "6 Fuß = 182,88 cm, üblicherweise auf 183 cm gerundet. In Metern sind das etwa 1,83 m. 6'0\" gilt in den meisten Ländern als groß."
        },
        {
          "question": "Warum verwenden manche Länder cm und andere Fuß?",
          "answer": "Die meisten Länder übernahmen das metrische System (cm/m) bis zur Mitte des 20. Jahrhunderts. Die USA behielten Fuß/Zoll aus dem britischen imperialen System bei. Das UK verwendet eine Mischung — offiziell metrisch, aber Fuß/Zoll für Größe im Alltag. Für internationale Zwecke sind Zentimeter der Standard für Größenangaben."
        },
        {
          "question": "Wie rechne ich Quadratfuß in Quadrat-cm um?",
          "answer": "Multipliziere Quadratfuß mit 929,03 um Quadratzentimeter zu erhalten (30,48² = 929,03). Oder multipliziere mit 0,0929 um Quadratmeter zu erhalten. Beispiel: 200 Quadratfuß = 185.806 cm² = 18,58 m²."
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
      placeholder: "5.75",
      min: 0,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "centimeters", type: "primary", format: "text" },
    { id: "meters", type: "secondary", format: "text" },
    { id: "millimeters", type: "secondary", format: "text" },
    { id: "inches", type: "secondary", format: "text" },
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
    { id: "furnitureSizes", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Length Specifications", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "Centers for Disease Control and Prevention", year: "2024", title: "Anthropometric Reference Data", source: "CDC", url: "https://www.cdc.gov/nchs/data/series/sr_03/sr03-046-508.pdf" },
  ],

  hero: { badge: "Conversion", title: "Feet to CM" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["cm-to-feet", "feet-to-meters", "inches-to-cm"],
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

export function calculateFeetToCm(data: {
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
  const yards = meters / 0.9144;

  return {
    values: { centimeters: cm, meters, millimeters: mm, inches, yards },
    formatted: {
      centimeters: `${fmtNum(cm)} cm`,
      meters: `${fmtNum(meters)} m`,
      millimeters: `${fmtNum(mm)} mm`,
      inches: `${fmtNum(inches)} in`,
      yards: `${fmtNum(yards)} yd`,
      ref50: "152.4 cm",
      ref56: "167.64 cm",
      ref60: "182.88 cm",
      ref66: "198.12 cm",
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(cm)} cm (${fmtNum(meters)} m)`,
    isValid: true,
  };
}

export default feetToCmConverterConfig;
