import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// INCHES TO FEET CONVERTER - V4 (EN ONLY)
// ============================================================================

export const inchesToFeetConverterConfig: CalculatorConfigV4 = {
  id: "inches-to-feet",
  version: "4.0",
  category: "conversion",
  icon: "📐",

  presets: [
    { id: "tv55", icon: "📺", values: { amount: 55 } },
    { id: "height70", icon: "🧑", values: { amount: 70 } },
    { id: "yard36", icon: "📏", values: { amount: 36 } },
  ],

  t: {
    en: {
      name: "Inches to Feet Converter",
      slug: "inches-to-feet",
      subtitle: "Convert inches to feet and inches instantly — great for height, screen sizes, and measurements.",
      breadcrumb: "Inches to Feet",

      seo: {
        title: "Inches to Feet Converter - Free Measurement Tool",
        description: "Convert inches to feet instantly. Ideal for height measurements, TV screen sizes, and construction. Shows feet-and-inches breakdown with metric equivalents.",
        shortDescription: "Convert inches to feet instantly.",
        keywords: ["inches to feet", "in to ft converter", "convert inches to feet", "inches to feet and inches", "height in feet", "free inches to feet", "70 inches in feet"],
      },

      calculator: { yourInformation: "Inches to Feet" },
      ui: { yourInformation: "Inches to Feet", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Length", helpText: "Enter value and select unit" },
      },

      results: {
        feetDecimal: { label: "Feet (decimal)" },
        feetInches: { label: "Feet & Inches" },
        centimeters: { label: "Centimeters" },
        meters: { label: "Meters" },
        yards: { label: "Yards" },
      },

      presets: {
        tv55: { label: "55 inches", description: "55\" TV diagonal" },
        height70: { label: "70 inches", description: "5'10\" — average male height" },
        yard36: { label: "36 inches", description: "1 yard = 3 feet exactly" },
      },

      values: { "ft": "ft", "in": "in", "cm": "cm", "m": "m", "yd": "yd" },
      formats: { summary: "{in} in = {feetInches}" },

      infoCards: {
        results: {
          title: "📐 Conversion Results",
          items: [
            { label: "Feet (decimal)", valueKey: "feetDecimal" },
            { label: "Feet & Inches", valueKey: "feetInches" },
            { label: "Centimeters", valueKey: "centimeters" },
            { label: "Meters", valueKey: "meters" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "12 inches", valueKey: "ref12" },
            { label: "24 inches", valueKey: "ref24" },
            { label: "48 inches", valueKey: "ref48" },
            { label: "72 inches", valueKey: "ref72" },
          ],
        },
        tips: {
          title: "💡 Quick Tips",
          items: [
            "Divide inches by 12 to get feet — the remainder is inches.",
            "12 inches = 1 foot, 36 inches = 3 feet (1 yard), 72 inches = 6 feet.",
            "TV screens are measured diagonally — a 55\" TV is about 4.6 feet wide.",
            "Height: 60\" = 5'0\", 66\" = 5'6\", 72\" = 6'0\".",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Inches to Feet",
          content: "To convert inches to feet, divide by 12 (since 1 foot = 12 inches). The whole number is feet, and the remainder is the leftover inches. For example, 70 inches ÷ 12 = 5 remainder 10, so 70 inches = 5 feet 10 inches. This conversion is used constantly in everyday American life — for height measurements, lumber dimensions, furniture sizing, and screen sizes. The inch-to-foot relationship is one of the most fundamental in the US measurement system.",
        },
        howItWorks: {
          title: "The Inches to Feet Formula",
          content: "The formula is: feet = inches ÷ 12. For feet and inches: whole feet = floor(inches ÷ 12), remaining inches = inches mod 12. For decimal feet: simply divide by 12. Example: 67 inches → 67 ÷ 12 = 5.583 ft → 5 ft + (0.583 × 12) = 5 ft 7 in. For metric: multiply inches by 2.54 to get cm. So 67\" × 2.54 = 170.18 cm.",
        },
        considerations: {
          title: "Common Inches to Feet Conversions",
          items: [
            { text: "48 inches = 4'0\" — standard countertop clearance", type: "info" },
            { text: "60 inches = 5'0\" — petite adult height", type: "info" },
            { text: "66 inches = 5'6\" — near-average height", type: "info" },
            { text: "70 inches = 5'10\" — average US male height", type: "info" },
            { text: "72 inches = 6'0\" (1 yard × 2) — tall benchmark", type: "info" },
            { text: "96 inches = 8'0\" — standard US ceiling height", type: "info" },
          ],
        },
        screenSizes: {
          title: "TV & Screen Sizes (diagonal inches → feet)",
          items: [
            { text: "32\" TV: 2'4\" × 1'4\" (28\" × 16\" actual screen)", type: "info" },
            { text: "43\" TV: 3'2\" × 1'9\" (37.5\" × 21\" actual)", type: "info" },
            { text: "55\" TV: 4'0\" × 2'3\" (48\" × 27\" actual)", type: "info" },
            { text: "65\" TV: 4'9\" × 2'8\" (57\" × 32\" actual)", type: "info" },
            { text: "75\" TV: 5'5\" × 3'1\" (65\" × 37\" actual)", type: "info" },
            { text: "85\" TV: 6'2\" × 3'5\" (74\" × 42\" actual)", type: "info" },
          ],
        },
        examples: {
          title: "Inches to Feet Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 67 inches (height) to feet",
              steps: ["67 ÷ 12 = 5 remainder 7", "5 feet and 7 inches", "In cm: 67 × 2.54 = 170.18 cm", "In meters: 1.70 m"],
              result: "67 inches = 5'7\" (170.2 cm)",
            },
            {
              title: "55-inch TV actual dimensions",
              steps: ["55\" is the diagonal measurement", "For 16:9 ratio: width = 55 × cos(29.4°) = 47.9\"", "Height = 55 × sin(29.4°) = 27\"", "47.9\" ÷ 12 = 4'0\", 27\" ÷ 12 = 2'3\""],
              result: "55\" TV ≈ 4'0\" wide × 2'3\" tall",
            },
          ],
        },
      },

      faqs: [
        { question: "How many feet is 72 inches?", answer: "72 inches = exactly 6 feet (72 ÷ 12 = 6). This is a clean conversion with no remaining inches." },
        { question: "How do I convert inches to feet and inches?", answer: "Divide total inches by 12. The whole number is feet, and the remainder is inches. Example: 67\" ÷ 12 = 5 feet, remainder 7 inches → 5'7\"." },
        { question: "How many feet is 60 inches?", answer: "60 inches = exactly 5 feet (60 ÷ 12 = 5). In metric, 60 inches = 152.4 cm = 1.524 m." },
        { question: "How tall is 70 inches in feet?", answer: "70 inches = 5 feet 10 inches (70 ÷ 12 = 5 remainder 10). This is approximately the average height for US adult males. In metric: 177.8 cm." },
        { question: "What is 55 inches in feet?", answer: "55 inches = 4 feet 7 inches (55 ÷ 12 = 4 remainder 7). TV screen sizes are measured diagonally — a 55\" TV is about 48\" (4 feet) wide and 27\" (2.25 feet) tall for 16:9 aspect ratio." },
        { question: "How many inches are in a yard?", answer: "1 yard = 36 inches = 3 feet exactly. A yard is a common unit for fabric, field sports (football), and landscaping measurements." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de Pulgadas a Pies",
      "slug": "calculadora-convertidor-pulgadas-pies",
      "subtitle": "Convierte pulgadas a pies y pulgadas instantáneamente — ideal para altura, tamaños de pantalla y medidas.",
      "breadcrumb": "Pulgadas a Pies",
      "seo": {
        "title": "Convertidor de Pulgadas a Pies - Herramienta de Medición Gratuita",
        "description": "Convierte pulgadas a pies instantáneamente. Ideal para medidas de altura, tamaños de TV y construcción. Muestra desglose en pies y pulgadas con equivalentes métricos.",
        "shortDescription": "Convierte pulgadas a pies instantáneamente.",
        "keywords": [
          "pulgadas a pies",
          "convertir pulgadas a pies",
          "pulgadas a pies y pulgadas",
          "altura en pies",
          "convertidor pulgadas pies gratis",
          "70 pulgadas en pies"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Longitud",
          "helpText": "Ingresa el valor y selecciona la unidad"
        }
      },
      "results": {
        "feetDecimal": {
          "label": "Pies (decimal)"
        },
        "feetInches": {
          "label": "Pies y Pulgadas"
        },
        "centimeters": {
          "label": "Centímetros"
        },
        "meters": {
          "label": "Metros"
        },
        "yards": {
          "label": "Yardas"
        }
      },
      "presets": {
        "tv55": {
          "label": "55 pulgadas",
          "description": "TV de 55\" diagonal"
        },
        "height70": {
          "label": "70 pulgadas",
          "description": "5'10\" — altura promedio masculina"
        },
        "yard36": {
          "label": "36 pulgadas",
          "description": "1 yarda = 3 pies exactos"
        }
      },
      "values": {
        "ft": "pies",
        "in": "pulg",
        "cm": "cm",
        "m": "m",
        "yd": "yd"
      },
      "formats": {
        "summary": "{in} pulg = {feetInches}"
      },
      "infoCards": {
        "results": {
          "title": "📐 Resultados de Conversión",
          "items": [
            {
              "label": "Pies (decimal)",
              "valueKey": "feetDecimal"
            },
            {
              "label": "Pies y Pulgadas",
              "valueKey": "feetInches"
            },
            {
              "label": "Centímetros",
              "valueKey": "centimeters"
            },
            {
              "label": "Metros",
              "valueKey": "meters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referencia Rápida",
          "items": [
            {
              "label": "12 pulgadas",
              "valueKey": "ref12"
            },
            {
              "label": "24 pulgadas",
              "valueKey": "ref24"
            },
            {
              "label": "48 pulgadas",
              "valueKey": "ref48"
            },
            {
              "label": "72 pulgadas",
              "valueKey": "ref72"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos Rápidos",
          "items": [
            "Divide las pulgadas entre 12 para obtener pies — el resto son pulgadas.",
            "12 pulgadas = 1 pie, 36 pulgadas = 3 pies (1 yarda), 72 pulgadas = 6 pies.",
            "Las pantallas de TV se miden diagonalmente — un TV de 55\" mide aproximadamente 4.6 pies de ancho.",
            "Altura: 60\" = 5'0\", 66\" = 5'6\", 72\" = 6'0\"."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir Pulgadas a Pies",
          "content": "Para convertir pulgadas a pies, divide entre 12 (ya que 1 pie = 12 pulgadas). El número entero son los pies, y el resto son las pulgadas restantes. Por ejemplo, 70 pulgadas ÷ 12 = 5 resto 10, entonces 70 pulgadas = 5 pies 10 pulgadas. Esta conversión se usa constantemente en la vida cotidiana americana — para medidas de altura, dimensiones de madera, dimensiones de muebles y tamaños de pantalla. La relación pulgada-pie es una de las más fundamentales en el sistema de medidas estadounidense."
        },
        "howItWorks": {
          "title": "La Fórmula de Pulgadas a Pies",
          "content": "La fórmula es: pies = pulgadas ÷ 12. Para pies y pulgadas: pies enteros = floor(pulgadas ÷ 12), pulgadas restantes = pulgadas mod 12. Para pies decimales: simplemente divide entre 12. Ejemplo: 67 pulgadas → 67 ÷ 12 = 5.583 pies → 5 pies + (0.583 × 12) = 5 pies 7 pulgadas. Para métrico: multiplica pulgadas por 2.54 para obtener cm. Entonces 67\" × 2.54 = 170.18 cm."
        },
        "considerations": {
          "title": "Conversiones Comunes de Pulgadas a Pies",
          "items": [
            {
              "text": "48 pulgadas = 4'0\" — altura estándar de encimera",
              "type": "info"
            },
            {
              "text": "60 pulgadas = 5'0\" — altura adulta pequeña",
              "type": "info"
            },
            {
              "text": "66 pulgadas = 5'6\" — altura cercana al promedio",
              "type": "info"
            },
            {
              "text": "70 pulgadas = 5'10\" — altura promedio masculina en EE.UU.",
              "type": "info"
            },
            {
              "text": "72 pulgadas = 6'0\" (1 yarda × 2) — referencia de altura alta",
              "type": "info"
            },
            {
              "text": "96 pulgadas = 8'0\" — altura estándar de techo en EE.UU.",
              "type": "info"
            }
          ]
        },
        "screenSizes": {
          "title": "Tamaños de TV y Pantalla (pulgadas diagonales → pies)",
          "items": [
            {
              "text": "TV 32\": 2'4\" × 1'4\" (pantalla real 28\" × 16\")",
              "type": "info"
            },
            {
              "text": "TV 43\": 3'2\" × 1'9\" (real 37.5\" × 21\")",
              "type": "info"
            },
            {
              "text": "TV 55\": 4'0\" × 2'3\" (real 48\" × 27\")",
              "type": "info"
            },
            {
              "text": "TV 65\": 4'9\" × 2'8\" (real 57\" × 32\")",
              "type": "info"
            },
            {
              "text": "TV 75\": 5'5\" × 3'1\" (real 65\" × 37\")",
              "type": "info"
            },
            {
              "text": "TV 85\": 6'2\" × 3'5\" (real 74\" × 42\")",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Pulgadas a Pies",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Convertir 67 pulgadas (altura) a pies",
              "steps": [
                "67 ÷ 12 = 5 resto 7",
                "5 pies y 7 pulgadas",
                "En cm: 67 × 2.54 = 170.18 cm",
                "En metros: 1.70 m"
              ],
              "result": "67 pulgadas = 5'7\" (170.2 cm)"
            },
            {
              "title": "Dimensiones reales de TV de 55 pulgadas",
              "steps": [
                "55\" es la medida diagonal",
                "Para proporción 16:9: ancho = 55 × cos(29.4°) = 47.9\"",
                "Alto = 55 × sen(29.4°) = 27\"",
                "47.9\" ÷ 12 = 4'0\", 27\" ÷ 12 = 2'3\""
              ],
              "result": "TV 55\" ≈ 4'0\" de ancho × 2'3\" de alto"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos pies son 72 pulgadas?",
          "answer": "72 pulgadas = exactamente 6 pies (72 ÷ 12 = 6). Esta es una conversión exacta sin pulgadas restantes."
        },
        {
          "question": "¿Cómo convierto pulgadas a pies y pulgadas?",
          "answer": "Divide el total de pulgadas entre 12. El número entero son los pies, y el resto son las pulgadas. Ejemplo: 67\" ÷ 12 = 5 pies, resto 7 pulgadas → 5'7\"."
        },
        {
          "question": "¿Cuántos pies son 60 pulgadas?",
          "answer": "60 pulgadas = exactamente 5 pies (60 ÷ 12 = 5). En métrico, 60 pulgadas = 152.4 cm = 1.524 m."
        },
        {
          "question": "¿Qué altura son 70 pulgadas en pies?",
          "answer": "70 pulgadas = 5 pies 10 pulgadas (70 ÷ 12 = 5 resto 10). Esta es aproximadamente la altura promedio para hombres adultos estadounidenses. En métrico: 177.8 cm."
        },
        {
          "question": "¿Cuánto son 55 pulgadas en pies?",
          "answer": "55 pulgadas = 4 pies 7 pulgadas (55 ÷ 12 = 4 resto 7). Los tamaños de pantalla de TV se miden diagonalmente — un TV de 55\" mide aproximadamente 48\" (4 pies) de ancho y 27\" (2.25 pies) de alto para proporción 16:9."
        },
        {
          "question": "¿Cuántas pulgadas hay en una yarda?",
          "answer": "1 yarda = 36 pulgadas = 3 pies exactos. Una yarda es una unidad común para telas, deportes de campo (fútbol americano) y medidas de jardinería."
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
      "name": "Conversor de Polegadas para Pés",
      "slug": "calculadora-polegadas-para-pes",
      "subtitle": "Converta polegadas para pés e polegadas instantaneamente — ótimo para altura, tamanhos de tela e medições.",
      "breadcrumb": "Polegadas para Pés",
      "seo": {
        "title": "Conversor de Polegadas para Pés - Ferramenta de Medição Gratuita",
        "description": "Converta polegadas para pés instantaneamente. Ideal para medições de altura, tamanhos de TV e construção. Mostra divisão em pés-e-polegadas com equivalentes métricos.",
        "shortDescription": "Converta polegadas para pés instantaneamente.",
        "keywords": [
          "polegadas para pés",
          "conversor in para ft",
          "converter polegadas para pés",
          "polegadas para pés e polegadas",
          "altura em pés",
          "polegadas para pés grátis",
          "70 polegadas em pés"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Comprimento",
          "helpText": "Digite o valor e selecione a unidade"
        }
      },
      "results": {
        "feetDecimal": {
          "label": "Pés (decimal)"
        },
        "feetInches": {
          "label": "Pés e Polegadas"
        },
        "centimeters": {
          "label": "Centímetros"
        },
        "meters": {
          "label": "Metros"
        },
        "yards": {
          "label": "Jardas"
        }
      },
      "presets": {
        "tv55": {
          "label": "55 polegadas",
          "description": "TV 55\" diagonal"
        },
        "height70": {
          "label": "70 polegadas",
          "description": "5'10\" — altura média masculina"
        },
        "yard36": {
          "label": "36 polegadas",
          "description": "1 jarda = 3 pés exatos"
        }
      },
      "values": {
        "ft": "pés",
        "in": "pol",
        "cm": "cm",
        "m": "m",
        "yd": "jardas"
      },
      "formats": {
        "summary": "{in} pol = {feetInches}"
      },
      "infoCards": {
        "results": {
          "title": "📐 Resultados da Conversão",
          "items": [
            {
              "label": "Pés (decimal)",
              "valueKey": "feetDecimal"
            },
            {
              "label": "Pés e Polegadas",
              "valueKey": "feetInches"
            },
            {
              "label": "Centímetros",
              "valueKey": "centimeters"
            },
            {
              "label": "Metros",
              "valueKey": "meters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referência Rápida",
          "items": [
            {
              "label": "12 polegadas",
              "valueKey": "ref12"
            },
            {
              "label": "24 polegadas",
              "valueKey": "ref24"
            },
            {
              "label": "48 polegadas",
              "valueKey": "ref48"
            },
            {
              "label": "72 polegadas",
              "valueKey": "ref72"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas Rápidas",
          "items": [
            "Divida polegadas por 12 para obter pés — o resto são polegadas.",
            "12 polegadas = 1 pé, 36 polegadas = 3 pés (1 jarda), 72 polegadas = 6 pés.",
            "Telas de TV são medidas na diagonal — uma TV 55\" tem cerca de 4,6 pés de largura.",
            "Altura: 60\" = 5'0\", 66\" = 5'6\", 72\" = 6'0\"."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter Polegadas para Pés",
          "content": "Para converter polegadas para pés, divida por 12 (já que 1 pé = 12 polegadas). O número inteiro são os pés, e o resto são as polegadas restantes. Por exemplo, 70 polegadas ÷ 12 = 5 resto 10, então 70 polegadas = 5 pés 10 polegadas. Esta conversão é usada constantemente no dia a dia americano — para medições de altura, dimensões de madeira, tamanhos de móveis e tamanhos de tela. A relação polegada-pé é uma das mais fundamentais no sistema de medição americano."
        },
        "howItWorks": {
          "title": "A Fórmula de Polegadas para Pés",
          "content": "A fórmula é: pés = polegadas ÷ 12. Para pés e polegadas: pés inteiros = piso(polegadas ÷ 12), polegadas restantes = polegadas mod 12. Para pés decimais: simplesmente divida por 12. Exemplo: 67 polegadas → 67 ÷ 12 = 5,583 pés → 5 pés + (0,583 × 12) = 5 pés 7 pol. Para métrico: multiplique polegadas por 2,54 para obter cm. Então 67\" × 2,54 = 170,18 cm."
        },
        "considerations": {
          "title": "Conversões Comuns de Polegadas para Pés",
          "items": [
            {
              "text": "48 polegadas = 4'0\" — altura padrão de balcão",
              "type": "info"
            },
            {
              "text": "60 polegadas = 5'0\" — altura de adulto pequeno",
              "type": "info"
            },
            {
              "text": "66 polegadas = 5'6\" — altura próxima à média",
              "type": "info"
            },
            {
              "text": "70 polegadas = 5'10\" — altura média masculina nos EUA",
              "type": "info"
            },
            {
              "text": "72 polegadas = 6'0\" (1 jarda × 2) — referência de altura",
              "type": "info"
            },
            {
              "text": "96 polegadas = 8'0\" — altura padrão de teto nos EUA",
              "type": "info"
            }
          ]
        },
        "screenSizes": {
          "title": "Tamanhos de TV e Tela (polegadas diagonais → pés)",
          "items": [
            {
              "text": "TV 32\": 2'4\" × 1'4\" (tela real 28\" × 16\")",
              "type": "info"
            },
            {
              "text": "TV 43\": 3'2\" × 1'9\" (real 37,5\" × 21\")",
              "type": "info"
            },
            {
              "text": "TV 55\": 4'0\" × 2'3\" (real 48\" × 27\")",
              "type": "info"
            },
            {
              "text": "TV 65\": 4'9\" × 2'8\" (real 57\" × 32\")",
              "type": "info"
            },
            {
              "text": "TV 75\": 5'5\" × 3'1\" (real 65\" × 37\")",
              "type": "info"
            },
            {
              "text": "TV 85\": 6'2\" × 3'5\" (real 74\" × 42\")",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Polegadas para Pés",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Converter 67 polegadas (altura) para pés",
              "steps": [
                "67 ÷ 12 = 5 resto 7",
                "5 pés e 7 polegadas",
                "Em cm: 67 × 2,54 = 170,18 cm",
                "Em metros: 1,70 m"
              ],
              "result": "67 polegadas = 5'7\" (170,2 cm)"
            },
            {
              "title": "Dimensões reais de TV 55 polegadas",
              "steps": [
                "55\" é a medida diagonal",
                "Para proporção 16:9: largura = 55 × cos(29,4°) = 47,9\"",
                "Altura = 55 × sin(29,4°) = 27\"",
                "47,9\" ÷ 12 = 4'0\", 27\" ÷ 12 = 2'3\""
              ],
              "result": "TV 55\" ≈ 4'0\" largura × 2'3\" altura"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos pés são 72 polegadas?",
          "answer": "72 polegadas = exatamente 6 pés (72 ÷ 12 = 6). Esta é uma conversão exata sem polegadas restantes."
        },
        {
          "question": "Como converter polegadas para pés e polegadas?",
          "answer": "Divida o total de polegadas por 12. O número inteiro são os pés, e o resto são as polegadas. Exemplo: 67\" ÷ 12 = 5 pés, resto 7 polegadas → 5'7\"."
        },
        {
          "question": "Quantos pés são 60 polegadas?",
          "answer": "60 polegadas = exatamente 5 pés (60 ÷ 12 = 5). No sistema métrico, 60 polegadas = 152,4 cm = 1,524 m."
        },
        {
          "question": "Qual a altura de 70 polegadas em pés?",
          "answer": "70 polegadas = 5 pés 10 polegadas (70 ÷ 12 = 5 resto 10). Esta é aproximadamente a altura média para homens adultos americanos. No sistema métrico: 177,8 cm."
        },
        {
          "question": "Quanto são 55 polegadas em pés?",
          "answer": "55 polegadas = 4 pés 7 polegadas (55 ÷ 12 = 4 resto 7). Tamanhos de tela de TV são medidos na diagonal — uma TV 55\" tem cerca de 48\" (4 pés) de largura e 27\" (2,25 pés) de altura para proporção 16:9."
        },
        {
          "question": "Quantas polegadas há em uma jarda?",
          "answer": "1 jarda = 36 polegadas = 3 pés exatos. Uma jarda é uma unidade comum para tecidos, esportes de campo (futebol americano) e medições de paisagismo."
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
      "name": "Convertisseur Pouces vers Pieds",
      "slug": "calculateur-pouces-vers-pieds",
      "subtitle": "Convertissez les pouces en pieds et pouces instantanément — parfait pour la taille, les écrans et les mesures.",
      "breadcrumb": "Pouces vers Pieds",
      "seo": {
        "title": "Convertisseur Pouces vers Pieds - Outil de Mesure Gratuit",
        "description": "Convertissez les pouces en pieds instantanément. Idéal pour les mesures de taille, les écrans TV et la construction. Affiche la répartition pieds-pouces avec équivalents métriques.",
        "shortDescription": "Convertissez les pouces en pieds instantanément.",
        "keywords": [
          "pouces vers pieds",
          "convertisseur in vers ft",
          "convertir pouces en pieds",
          "pouces en pieds et pouces",
          "taille en pieds",
          "pouces vers pieds gratuit",
          "70 pouces en pieds"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Longueur",
          "helpText": "Entrez la valeur et sélectionnez l'unité"
        }
      },
      "results": {
        "feetDecimal": {
          "label": "Pieds (décimal)"
        },
        "feetInches": {
          "label": "Pieds et Pouces"
        },
        "centimeters": {
          "label": "Centimètres"
        },
        "meters": {
          "label": "Mètres"
        },
        "yards": {
          "label": "Yards"
        }
      },
      "presets": {
        "tv55": {
          "label": "55 pouces",
          "description": "Diagonale TV 55\""
        },
        "height70": {
          "label": "70 pouces",
          "description": "5'10\" — taille masculine moyenne"
        },
        "yard36": {
          "label": "36 pouces",
          "description": "1 yard = 3 pieds exactement"
        }
      },
      "values": {
        "ft": "pi",
        "in": "po",
        "cm": "cm",
        "m": "m",
        "yd": "vg"
      },
      "formats": {
        "summary": "{in} po = {feetInches}"
      },
      "infoCards": {
        "results": {
          "title": "📐 Résultats de Conversion",
          "items": [
            {
              "label": "Pieds (décimal)",
              "valueKey": "feetDecimal"
            },
            {
              "label": "Pieds et Pouces",
              "valueKey": "feetInches"
            },
            {
              "label": "Centimètres",
              "valueKey": "centimeters"
            },
            {
              "label": "Mètres",
              "valueKey": "meters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Référence Rapide",
          "items": [
            {
              "label": "12 pouces",
              "valueKey": "ref12"
            },
            {
              "label": "24 pouces",
              "valueKey": "ref24"
            },
            {
              "label": "48 pouces",
              "valueKey": "ref48"
            },
            {
              "label": "72 pouces",
              "valueKey": "ref72"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils Rapides",
          "items": [
            "Divisez les pouces par 12 pour obtenir les pieds — le reste correspond aux pouces.",
            "12 pouces = 1 pied, 36 pouces = 3 pieds (1 yard), 72 pouces = 6 pieds.",
            "Les écrans TV sont mesurés en diagonale — une TV 55\" fait environ 4,6 pieds de large.",
            "Taille : 60\" = 5'0\", 66\" = 5'6\", 72\" = 6'0\"."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir les Pouces en Pieds",
          "content": "Pour convertir les pouces en pieds, divisez par 12 (puisque 1 pied = 12 pouces). Le nombre entier représente les pieds, et le reste correspond aux pouces restants. Par exemple, 70 pouces ÷ 12 = 5 reste 10, donc 70 pouces = 5 pieds 10 pouces. Cette conversion est utilisée constamment dans la vie quotidienne américaine — pour les mesures de taille, les dimensions de bois, le dimensionnement de meubles et les tailles d'écran. La relation pouce-pied est l'une des plus fondamentales du système de mesure américain."
        },
        "howItWorks": {
          "title": "La Formule Pouces vers Pieds",
          "content": "La formule est : pieds = pouces ÷ 12. Pour pieds et pouces : pieds entiers = plancher(pouces ÷ 12), pouces restants = pouces mod 12. Pour pieds décimaux : divisez simplement par 12. Exemple : 67 pouces → 67 ÷ 12 = 5,583 pi → 5 pi + (0,583 × 12) = 5 pi 7 po. Pour le métrique : multipliez les pouces par 2,54 pour obtenir les cm. Donc 67\" × 2,54 = 170,18 cm."
        },
        "considerations": {
          "title": "Conversions Courantes Pouces vers Pieds",
          "items": [
            {
              "text": "48 pouces = 4'0\" — dégagement standard de comptoir",
              "type": "info"
            },
            {
              "text": "60 pouces = 5'0\" — taille d'adulte petite",
              "type": "info"
            },
            {
              "text": "66 pouces = 5'6\" — taille proche de la moyenne",
              "type": "info"
            },
            {
              "text": "70 pouces = 5'10\" — taille masculine américaine moyenne",
              "type": "info"
            },
            {
              "text": "72 pouces = 6'0\" (1 yard × 2) — référence de grande taille",
              "type": "info"
            },
            {
              "text": "96 pouces = 8'0\" — hauteur standard de plafond américain",
              "type": "info"
            }
          ]
        },
        "screenSizes": {
          "title": "Tailles TV et Écrans (pouces diagonaux → pieds)",
          "items": [
            {
              "text": "TV 32\" : 2'4\" × 1'4\" (écran réel 28\" × 16\")",
              "type": "info"
            },
            {
              "text": "TV 43\" : 3'2\" × 1'9\" (réel 37,5\" × 21\")",
              "type": "info"
            },
            {
              "text": "TV 55\" : 4'0\" × 2'3\" (réel 48\" × 27\")",
              "type": "info"
            },
            {
              "text": "TV 65\" : 4'9\" × 2'8\" (réel 57\" × 32\")",
              "type": "info"
            },
            {
              "text": "TV 75\" : 5'5\" × 3'1\" (réel 65\" × 37\")",
              "type": "info"
            },
            {
              "text": "TV 85\" : 6'2\" × 3'5\" (réel 74\" × 42\")",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples Pouces vers Pieds",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Convertir 67 pouces (taille) en pieds",
              "steps": [
                "67 ÷ 12 = 5 reste 7",
                "5 pieds et 7 pouces",
                "En cm : 67 × 2,54 = 170,18 cm",
                "En mètres : 1,70 m"
              ],
              "result": "67 pouces = 5'7\" (170,2 cm)"
            },
            {
              "title": "Dimensions réelles TV 55 pouces",
              "steps": [
                "55\" est la mesure diagonale",
                "Pour ratio 16:9 : largeur = 55 × cos(29,4°) = 47,9\"",
                "Hauteur = 55 × sin(29,4°) = 27\"",
                "47,9\" ÷ 12 = 4'0\", 27\" ÷ 12 = 2'3\""
              ],
              "result": "TV 55\" ≈ 4'0\" large × 2'3\" haute"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de pieds font 72 pouces ?",
          "answer": "72 pouces = exactement 6 pieds (72 ÷ 12 = 6). C'est une conversion nette sans pouces restants."
        },
        {
          "question": "Comment convertir les pouces en pieds et pouces ?",
          "answer": "Divisez le total de pouces par 12. Le nombre entier représente les pieds, et le reste correspond aux pouces. Exemple : 67\" ÷ 12 = 5 pieds, reste 7 pouces → 5'7\"."
        },
        {
          "question": "Combien de pieds font 60 pouces ?",
          "answer": "60 pouces = exactement 5 pieds (60 ÷ 12 = 5). En métrique, 60 pouces = 152,4 cm = 1,524 m."
        },
        {
          "question": "Quelle taille fait 70 pouces en pieds ?",
          "answer": "70 pouces = 5 pieds 10 pouces (70 ÷ 12 = 5 reste 10). C'est approximativement la taille moyenne des hommes adultes américains. En métrique : 177,8 cm."
        },
        {
          "question": "Que font 55 pouces en pieds ?",
          "answer": "55 pouces = 4 pieds 7 pouces (55 ÷ 12 = 4 reste 7). Les tailles d'écran TV sont mesurées en diagonale — une TV 55\" fait environ 48\" (4 pieds) de large et 27\" (2,25 pieds) de haut pour un ratio 16:9."
        },
        {
          "question": "Combien de pouces dans un yard ?",
          "answer": "1 yard = 36 pouces = 3 pieds exactement. Le yard est une unité courante pour le tissu, les sports de terrain (football) et les mesures d'aménagement paysager."
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
      "name": "Zoll zu Fuß Umrechner",
      "slug": "zoll-zu-fuss-rechner",
      "subtitle": "Wandeln Sie Zoll in Fuß und Zoll sofort um — ideal für Körpergröße, Bildschirmgrößen und Messungen.",
      "breadcrumb": "Zoll zu Fuß",
      "seo": {
        "title": "Zoll zu Fuß Umrechner - Kostenloses Messtool",
        "description": "Wandeln Sie Zoll sofort in Fuß um. Ideal für Körpergrößenmessungen, TV-Bildschirmgrößen und Bauwesen. Zeigt Fuß-und-Zoll-Aufschlüsselung mit metrischen Entsprechungen.",
        "shortDescription": "Wandeln Sie Zoll sofort in Fuß um.",
        "keywords": [
          "zoll zu fuß",
          "zoll fuß umrechner",
          "zoll in fuß umrechnen",
          "zoll zu fuß und zoll",
          "größe in fuß",
          "kostenlos zoll zu fuß",
          "70 zoll in fuß"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Länge",
          "helpText": "Wert eingeben und Einheit auswählen"
        }
      },
      "results": {
        "feetDecimal": {
          "label": "Fuß (dezimal)"
        },
        "feetInches": {
          "label": "Fuß & Zoll"
        },
        "centimeters": {
          "label": "Zentimeter"
        },
        "meters": {
          "label": "Meter"
        },
        "yards": {
          "label": "Yards"
        }
      },
      "presets": {
        "tv55": {
          "label": "55 Zoll",
          "description": "55\" TV-Diagonale"
        },
        "height70": {
          "label": "70 Zoll",
          "description": "5'10\" — durchschnittliche Männergröße"
        },
        "yard36": {
          "label": "36 Zoll",
          "description": "1 Yard = genau 3 Fuß"
        }
      },
      "values": {
        "ft": "ft",
        "in": "in",
        "cm": "cm",
        "m": "m",
        "yd": "yd"
      },
      "formats": {
        "summary": "{in} in = {feetInches}"
      },
      "infoCards": {
        "results": {
          "title": "📐 Umrechnungsergebnisse",
          "items": [
            {
              "label": "Fuß (dezimal)",
              "valueKey": "feetDecimal"
            },
            {
              "label": "Fuß & Zoll",
              "valueKey": "feetInches"
            },
            {
              "label": "Zentimeter",
              "valueKey": "centimeters"
            },
            {
              "label": "Meter",
              "valueKey": "meters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Schnellreferenz",
          "items": [
            {
              "label": "12 Zoll",
              "valueKey": "ref12"
            },
            {
              "label": "24 Zoll",
              "valueKey": "ref24"
            },
            {
              "label": "48 Zoll",
              "valueKey": "ref48"
            },
            {
              "label": "72 Zoll",
              "valueKey": "ref72"
            }
          ]
        },
        "tips": {
          "title": "💡 Schnelle Tipps",
          "items": [
            "Teilen Sie Zoll durch 12, um Fuß zu erhalten — der Rest sind Zoll.",
            "12 Zoll = 1 Fuß, 36 Zoll = 3 Fuß (1 Yard), 72 Zoll = 6 Fuß.",
            "TV-Bildschirme werden diagonal gemessen — ein 55\" TV ist etwa 4,6 Fuß breit.",
            "Körpergröße: 60\" = 5'0\", 66\" = 5'6\", 72\" = 6'0\"."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie man Zoll in Fuß umrechnet",
          "content": "Um Zoll in Fuß umzurechnen, teilen Sie durch 12 (da 1 Fuß = 12 Zoll). Die ganze Zahl sind Fuß, und der Rest sind die übrigen Zoll. Zum Beispiel: 70 Zoll ÷ 12 = 5 Rest 10, also 70 Zoll = 5 Fuß 10 Zoll. Diese Umrechnung wird ständig im amerikanischen Alltag verwendet — für Körpergrößenmessungen, Holzabmessungen, Möbelgrößen und Bildschirmgrößen. Das Zoll-zu-Fuß-Verhältnis ist eines der grundlegendsten im US-Maßsystem."
        },
        "howItWorks": {
          "title": "Die Zoll-zu-Fuß-Formel",
          "content": "Die Formel lautet: Fuß = Zoll ÷ 12. Für Fuß und Zoll: ganze Fuß = floor(Zoll ÷ 12), verbleibende Zoll = Zoll mod 12. Für dezimale Fuß: einfach durch 12 teilen. Beispiel: 67 Zoll → 67 ÷ 12 = 5,583 ft → 5 ft + (0,583 × 12) = 5 ft 7 in. Für metrisch: Zoll mit 2,54 multiplizieren, um cm zu erhalten. Also 67\" × 2,54 = 170,18 cm."
        },
        "considerations": {
          "title": "Häufige Zoll-zu-Fuß-Umrechnungen",
          "items": [
            {
              "text": "48 Zoll = 4'0\" — Standard-Arbeitsplattenabstand",
              "type": "info"
            },
            {
              "text": "60 Zoll = 5'0\" — zierliche Erwachsenengröße",
              "type": "info"
            },
            {
              "text": "66 Zoll = 5'6\" — nahe Durchschnittsgröße",
              "type": "info"
            },
            {
              "text": "70 Zoll = 5'10\" — durchschnittliche US-Männergröße",
              "type": "info"
            },
            {
              "text": "72 Zoll = 6'0\" (1 Yard × 2) — große Benchmark",
              "type": "info"
            },
            {
              "text": "96 Zoll = 8'0\" — Standard-US-Deckenhöhe",
              "type": "info"
            }
          ]
        },
        "screenSizes": {
          "title": "TV- & Bildschirmgrößen (diagonale Zoll → Fuß)",
          "items": [
            {
              "text": "32\" TV: 2'4\" × 1'4\" (28\" × 16\" tatsächlicher Bildschirm)",
              "type": "info"
            },
            {
              "text": "43\" TV: 3'2\" × 1'9\" (37,5\" × 21\" tatsächlich)",
              "type": "info"
            },
            {
              "text": "55\" TV: 4'0\" × 2'3\" (48\" × 27\" tatsächlich)",
              "type": "info"
            },
            {
              "text": "65\" TV: 4'9\" × 2'8\" (57\" × 32\" tatsächlich)",
              "type": "info"
            },
            {
              "text": "75\" TV: 5'5\" × 3'1\" (65\" × 37\" tatsächlich)",
              "type": "info"
            },
            {
              "text": "85\" TV: 6'2\" × 3'5\" (74\" × 42\" tatsächlich)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Zoll-zu-Fuß-Beispiele",
          "description": "Schritt-für-Schritt-Umrechnungen",
          "examples": [
            {
              "title": "67 Zoll (Körpergröße) in Fuß umrechnen",
              "steps": [
                "67 ÷ 12 = 5 Rest 7",
                "5 Fuß und 7 Zoll",
                "In cm: 67 × 2,54 = 170,18 cm",
                "In Meter: 1,70 m"
              ],
              "result": "67 Zoll = 5'7\" (170,2 cm)"
            },
            {
              "title": "55-Zoll-TV tatsächliche Abmessungen",
              "steps": [
                "55\" ist die diagonale Messung",
                "Für 16:9-Verhältnis: Breite = 55 × cos(29,4°) = 47,9\"",
                "Höhe = 55 × sin(29,4°) = 27\"",
                "47,9\" ÷ 12 = 4'0\", 27\" ÷ 12 = 2'3\""
              ],
              "result": "55\" TV ≈ 4'0\" breit × 2'3\" hoch"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Fuß sind 72 Zoll?",
          "answer": "72 Zoll = genau 6 Fuß (72 ÷ 12 = 6). Das ist eine saubere Umrechnung ohne verbleibende Zoll."
        },
        {
          "question": "Wie rechne ich Zoll in Fuß und Zoll um?",
          "answer": "Teilen Sie die Gesamtzoll durch 12. Die ganze Zahl sind Fuß, und der Rest sind Zoll. Beispiel: 67\" ÷ 12 = 5 Fuß, Rest 7 Zoll → 5'7\"."
        },
        {
          "question": "Wie viele Fuß sind 60 Zoll?",
          "answer": "60 Zoll = genau 5 Fuß (60 ÷ 12 = 5). In metrisch: 60 Zoll = 152,4 cm = 1,524 m."
        },
        {
          "question": "Wie groß sind 70 Zoll in Fuß?",
          "answer": "70 Zoll = 5 Fuß 10 Zoll (70 ÷ 12 = 5 Rest 10). Das ist etwa die durchschnittliche Größe für erwachsene Männer in den USA. In metrisch: 177,8 cm."
        },
        {
          "question": "Was sind 55 Zoll in Fuß?",
          "answer": "55 Zoll = 4 Fuß 7 Zoll (55 ÷ 12 = 4 Rest 7). TV-Bildschirmgrößen werden diagonal gemessen — ein 55\" TV ist etwa 48\" (4 Fuß) breit und 27\" (2,25 Fuß) hoch für 16:9-Seitenverhältnis."
        },
        {
          "question": "Wie viele Zoll sind in einem Yard?",
          "answer": "1 Yard = 36 Zoll = genau 3 Fuß. Ein Yard ist eine häufige Einheit für Stoff, Feldsport (Football) und Landschaftsmessungen."
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
      placeholder: "70",
      min: 0,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "feetDecimal", type: "primary", format: "text" },
    { id: "feetInches", type: "secondary", format: "text" },
    { id: "centimeters", type: "secondary", format: "text" },
    { id: "meters", type: "secondary", format: "text" },
    { id: "yards", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "📐", itemCount: 4 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "screenSizes", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Length Specifications", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "Inches to Feet" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["feet-to-meters", "inches-to-cm", "length-converter"],
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

export function calculateInchesToFeet(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "in";
  const meters = convertToBase(amount, fromUnit, "length");

  const totalInches = meters / 0.0254;
  const totalFeet = totalInches / 12;
  const feetPart = Math.floor(totalInches / 12);
  const inchesPart = totalInches - feetPart * 12;
  const cm = meters * 100;
  const yards = meters / 0.9144;

  return {
    values: { feetDecimal: totalFeet, feetInches: totalFeet, centimeters: cm, meters, yards },
    formatted: {
      feetDecimal: `${fmtNum(totalFeet)} ft`,
      feetInches: `${feetPart}' ${fmtNum(Math.round(inchesPart * 10) / 10)}"`,
      centimeters: `${fmtNum(cm)} cm`,
      meters: `${fmtNum(meters)} m`,
      yards: `${fmtNum(yards)} yd`,
      ref12: "1' 0\" (1 foot)",
      ref24: "2' 0\" (2 feet)",
      ref48: "4' 0\" (4 feet)",
      ref72: "6' 0\" (6 feet)",
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${feetPart}' ${Math.round(inchesPart * 10) / 10}" (${fmtNum(totalFeet)} ft)`,
    isValid: true,
  };
}

export default inchesToFeetConverterConfig;
