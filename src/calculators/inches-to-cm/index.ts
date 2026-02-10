import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// INCHES TO CM CONVERTER - V4 (EN ONLY)
// ============================================================================

export const inchesToCmConverterConfig: CalculatorConfigV4 = {
  id: "inches-to-cm",
  version: "4.0",
  category: "conversion",
  icon: "📏",

  presets: [
    { id: "screen55", icon: "📺", values: { amount: 55 } },
    { id: "foot12", icon: "👣", values: { amount: 12 } },
    { id: "height70", icon: "🧑", values: { amount: 70 } },
  ],

  t: {
    en: {
      name: "Inches to CM Converter",
      slug: "inches-to-cm",
      subtitle: "Convert inches to centimeters instantly with a reference table for common measurements.",
      breadcrumb: "Inches to CM",

      seo: {
        title: "Inches to CM Converter - Free Inch to Centimeter Tool",
        description: "Convert inches to centimeters instantly. Includes a conversion table, feet breakdown, and common conversions for height, screen sizes, and paper dimensions.",
        shortDescription: "Convert inches to centimeters instantly.",
        keywords: ["inches to cm", "inches to centimeters", "in to cm converter", "convert inches to cm", "inch to cm chart", "free inch converter", "imperial to metric"],
      },

      calculator: { yourInformation: "Inches to CM" },
      ui: { yourInformation: "Inches to CM", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Inches (in)", helpText: "Enter the value in inches" },
      },

      results: {
        centimeters: { label: "Centimeters" },
        meters: { label: "Meters" },
        millimeters: { label: "Millimeters" },
        feet: { label: "Feet (decimal)" },
      },

      presets: {
        screen55: { label: "55 inches", description: "Common TV screen size" },
        foot12: { label: "12 inches", description: "Exactly 1 foot" },
        height70: { label: "70 inches", description: "5'10\" — average male height" },
      },

      values: { "cm": "cm", "m": "m", "mm": "mm", "ft": "ft", "in": "in" },
      formats: { summary: "{inches} inches = {cm} cm" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Centimeters", valueKey: "centimeters" },
            { label: "Meters", valueKey: "meters" },
            { label: "Millimeters", valueKey: "millimeters" },
            { label: "Feet", valueKey: "feet" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 inch", valueKey: "ref1" },
            { label: "6 inches", valueKey: "ref6" },
            { label: "12 inches (1 ft)", valueKey: "ref12" },
            { label: "36 inches (1 yd)", valueKey: "ref36" },
          ],
        },
        tips: {
          title: "💡 Conversion Tips",
          items: [
            "Multiply inches by 2.54 to get centimeters — this is an exact conversion.",
            "Quick estimate: multiply inches by 2.5 for a rough cm value.",
            "12 inches = 1 foot = 30.48 cm exactly.",
            "Common screen sizes: 27\" = 68.58 cm, 32\" = 81.28 cm, 55\" = 139.7 cm.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Inches to Centimeters",
          content: "To convert inches to centimeters, multiply the inch value by 2.54. This conversion factor is exact — it was established by international agreement in 1959. One inch equals exactly 25.4 millimeters or 2.54 centimeters. For example, 70 inches × 2.54 = 177.8 cm. This conversion is commonly needed when shopping internationally, comparing screen sizes, converting height measurements, or working with technical specifications that use different measurement systems.",
        },
        howItWorks: {
          title: "The Inches to CM Formula",
          content: "The formula is straightforward: centimeters = inches × 2.54. Since this is an exact definition, there's no approximation involved. For feet and inches combined: first convert feet to inches (multiply by 12), add the remaining inches, then multiply the total by 2.54. For example, 5'10\" = (5 × 12) + 10 = 70 inches. Then 70 × 2.54 = 177.8 cm. You can also work in reverse: cm ÷ 2.54 = inches.",
        },
        considerations: {
          title: "Common Inches to CM Conversions",
          items: [
            { text: "1 inch = 2.54 cm exactly — the fundamental conversion factor", type: "info" },
            { text: "12 inches = 30.48 cm (1 foot)", type: "info" },
            { text: "36 inches = 91.44 cm (1 yard)", type: "info" },
            { text: "39.37 inches ≈ 100 cm (1 meter)", type: "info" },
            { text: "63,360 inches = 1 mile = 160,934 cm", type: "info" },
            { text: "Fraction conversion: 1/4\" = 0.635 cm, 1/2\" = 1.27 cm, 3/4\" = 1.905 cm", type: "info" },
          ],
        },
        screenSizes: {
          title: "Screen Size Conversions",
          items: [
            { text: "24 inches = 60.96 cm — popular desktop monitor size", type: "info" },
            { text: "27 inches = 68.58 cm — standard desktop monitor", type: "info" },
            { text: "32 inches = 81.28 cm — large monitor or small TV", type: "info" },
            { text: "43 inches = 109.22 cm — medium TV for bedrooms", type: "info" },
            { text: "55 inches = 139.7 cm — most popular living room TV size", type: "info" },
            { text: "65 inches = 165.1 cm — large living room TV", type: "info" },
          ],
        },
        examples: {
          title: "Inches to CM Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 5'10\" height to cm",
              steps: ["5 feet = 5 × 12 = 60 inches", "Total = 60 + 10 = 70 inches", "70 × 2.54 = 177.8 cm", "Or: 5 ft × 30.48 = 152.4 cm", "Plus: 10 in × 2.54 = 25.4 cm", "Total: 152.4 + 25.4 = 177.8 cm"],
              result: "5'10\" = 70 inches = 177.8 cm",
            },
            {
              title: "Convert 8.5 × 11 inches (US Letter) to cm",
              steps: ["Width: 8.5 × 2.54 = 21.59 cm", "Height: 11 × 2.54 = 27.94 cm", "Compare to A4: 21.0 × 29.7 cm", "US Letter is slightly wider", "A4 is slightly taller"],
              result: "US Letter = 21.59 × 27.94 cm",
            },
          ],
        },
      },

      faqs: [
        { question: "How many cm is 1 inch?", answer: "1 inch equals exactly 2.54 centimeters. This is an exact definition, not an approximation. To convert any inch measurement to centimeters, multiply by 2.54." },
        { question: "How do I convert feet and inches to cm?", answer: "First convert feet to inches by multiplying by 12, then add the remaining inches. Finally, multiply total inches by 2.54. Example: 5'8\" = (5×12)+8 = 68 inches × 2.54 = 172.72 cm." },
        { question: "What is 6 feet in cm?", answer: "6 feet = 72 inches = 182.88 cm. Each foot is 30.48 cm, so 6 × 30.48 = 182.88 cm exactly." },
        { question: "How big is a 55-inch TV in cm?", answer: "A 55-inch TV has a diagonal measurement of 139.7 cm (55 × 2.54). For a 16:9 aspect ratio, the screen is approximately 121.7 cm wide and 68.5 cm tall. The overall TV dimensions are slightly larger due to the bezel." },
        { question: "What is the difference between US and UK inches?", answer: "There is no difference — the international inch is exactly 25.4 mm in both the US and UK. This was standardized in 1959 when the US, UK, Canada, Australia, New Zealand, and South Africa agreed on the exact conversion: 1 inch = 25.4 mm." },
        { question: "How do I convert inch fractions to cm?", answer: "Multiply the fraction in decimal form by 2.54. Common fractions: 1/8\" = 0.3175 cm, 1/4\" = 0.635 cm, 3/8\" = 0.9525 cm, 1/2\" = 1.27 cm, 5/8\" = 1.5875 cm, 3/4\" = 1.905 cm, 7/8\" = 2.2225 cm." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de Pulgadas a CM",
      "slug": "calculadora-pulgadas-a-centimetros",
      "subtitle": "Convierte pulgadas a centímetros al instante con una tabla de referencia para medidas comunes.",
      "breadcrumb": "Pulgadas a CM",
      "seo": {
        "title": "Convertidor de Pulgadas a CM - Herramienta Gratuita de Pulgadas a Centímetros",
        "description": "Convierte pulgadas a centímetros al instante. Incluye tabla de conversión, desglose de pies y conversiones comunes para altura, tamaños de pantalla y dimensiones de papel.",
        "shortDescription": "Convierte pulgadas a centímetros al instante.",
        "keywords": [
          "pulgadas a cm",
          "pulgadas a centímetros",
          "convertidor in a cm",
          "convertir pulgadas a cm",
          "tabla pulgada a cm",
          "convertidor pulgadas gratis",
          "imperial a métrico"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "amount": {
          "label": "Pulgadas (in)",
          "helpText": "Ingresa el valor en pulgadas"
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
        "feet": {
          "label": "Pies (decimal)"
        }
      },
      "presets": {
        "screen55": {
          "label": "55 pulgadas",
          "description": "Tamaño común de pantalla de TV"
        },
        "foot12": {
          "label": "12 pulgadas",
          "description": "Exactamente 1 pie"
        },
        "height70": {
          "label": "70 pulgadas",
          "description": "5'10\" — altura promedio masculina"
        }
      },
      "values": {
        "cm": "cm",
        "m": "m",
        "mm": "mm",
        "ft": "pies",
        "in": "pulg"
      },
      "formats": {
        "summary": "{inches} pulgadas = {cm} cm"
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
              "label": "Pies",
              "valueKey": "feet"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referencia Rápida",
          "items": [
            {
              "label": "1 pulgada",
              "valueKey": "ref1"
            },
            {
              "label": "6 pulgadas",
              "valueKey": "ref6"
            },
            {
              "label": "12 pulgadas (1 pie)",
              "valueKey": "ref12"
            },
            {
              "label": "36 pulgadas (1 yarda)",
              "valueKey": "ref36"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Conversión",
          "items": [
            "Multiplica pulgadas por 2.54 para obtener centímetros — esta es una conversión exacta.",
            "Estimación rápida: multiplica pulgadas por 2.5 para un valor aproximado en cm.",
            "12 pulgadas = 1 pie = 30.48 cm exactamente.",
            "Tamaños de pantalla comunes: 27\" = 68.58 cm, 32\" = 81.28 cm, 55\" = 139.7 cm."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir Pulgadas a Centímetros",
          "content": "Para convertir pulgadas a centímetros, multiplica el valor en pulgadas por 2.54. Este factor de conversión es exacto — fue establecido por acuerdo internacional en 1959. Una pulgada equivale exactamente a 25.4 milímetros o 2.54 centímetros. Por ejemplo, 70 pulgadas × 2.54 = 177.8 cm. Esta conversión es comúnmente necesaria al comprar internacionalmente, comparar tamaños de pantalla, convertir medidas de altura, o trabajar con especificaciones técnicas que usan diferentes sistemas de medida."
        },
        "howItWorks": {
          "title": "La Fórmula de Pulgadas a CM",
          "content": "La fórmula es sencilla: centímetros = pulgadas × 2.54. Como esta es una definición exacta, no hay aproximación involucrada. Para pies y pulgadas combinados: primero convierte pies a pulgadas (multiplica por 12), suma las pulgadas restantes, luego multiplica el total por 2.54. Por ejemplo, 5'10\" = (5 × 12) + 10 = 70 pulgadas. Luego 70 × 2.54 = 177.8 cm. También puedes trabajar en reversa: cm ÷ 2.54 = pulgadas."
        },
        "considerations": {
          "title": "Conversiones Comunes de Pulgadas a CM",
          "items": [
            {
              "text": "1 pulgada = 2.54 cm exactamente — el factor de conversión fundamental",
              "type": "info"
            },
            {
              "text": "12 pulgadas = 30.48 cm (1 pie)",
              "type": "info"
            },
            {
              "text": "36 pulgadas = 91.44 cm (1 yarda)",
              "type": "info"
            },
            {
              "text": "39.37 pulgadas ≈ 100 cm (1 metro)",
              "type": "info"
            },
            {
              "text": "63,360 pulgadas = 1 milla = 160,934 cm",
              "type": "info"
            },
            {
              "text": "Conversión de fracciones: 1/4\" = 0.635 cm, 1/2\" = 1.27 cm, 3/4\" = 1.905 cm",
              "type": "info"
            }
          ]
        },
        "screenSizes": {
          "title": "Conversiones de Tamaños de Pantalla",
          "items": [
            {
              "text": "24 pulgadas = 60.96 cm — tamaño popular de monitor de escritorio",
              "type": "info"
            },
            {
              "text": "27 pulgadas = 68.58 cm — monitor de escritorio estándar",
              "type": "info"
            },
            {
              "text": "32 pulgadas = 81.28 cm — monitor grande o TV pequeña",
              "type": "info"
            },
            {
              "text": "43 pulgadas = 109.22 cm — TV mediana para dormitorios",
              "type": "info"
            },
            {
              "text": "55 pulgadas = 139.7 cm — tamaño de TV más popular para sala",
              "type": "info"
            },
            {
              "text": "65 pulgadas = 165.1 cm — TV grande para sala",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Pulgadas a CM",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Convertir altura de 5'10\" a cm",
              "steps": [
                "5 pies = 5 × 12 = 60 pulgadas",
                "Total = 60 + 10 = 70 pulgadas",
                "70 × 2.54 = 177.8 cm",
                "O: 5 pies × 30.48 = 152.4 cm",
                "Más: 10 pulg × 2.54 = 25.4 cm",
                "Total: 152.4 + 25.4 = 177.8 cm"
              ],
              "result": "5'10\" = 70 pulgadas = 177.8 cm"
            },
            {
              "title": "Convertir 8.5 × 11 pulgadas (Carta US) a cm",
              "steps": [
                "Ancho: 8.5 × 2.54 = 21.59 cm",
                "Alto: 11 × 2.54 = 27.94 cm",
                "Comparar con A4: 21.0 × 29.7 cm",
                "Carta US es ligeramente más ancha",
                "A4 es ligeramente más alta"
              ],
              "result": "Carta US = 21.59 × 27.94 cm"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos cm es 1 pulgada?",
          "answer": "1 pulgada equivale exactamente a 2.54 centímetros. Esta es una definición exacta, no una aproximación. Para convertir cualquier medida en pulgadas a centímetros, multiplica por 2.54."
        },
        {
          "question": "¿Cómo convierto pies y pulgadas a cm?",
          "answer": "Primero convierte pies a pulgadas multiplicando por 12, luego suma las pulgadas restantes. Finalmente, multiplica el total de pulgadas por 2.54. Ejemplo: 5'8\" = (5×12)+8 = 68 pulgadas × 2.54 = 172.72 cm."
        },
        {
          "question": "¿Cuánto es 6 pies en cm?",
          "answer": "6 pies = 72 pulgadas = 182.88 cm. Cada pie son 30.48 cm, así que 6 × 30.48 = 182.88 cm exactamente."
        },
        {
          "question": "¿Qué tan grande es una TV de 55 pulgadas en cm?",
          "answer": "Una TV de 55 pulgadas tiene una medida diagonal de 139.7 cm (55 × 2.54). Para una relación de aspecto 16:9, la pantalla mide aproximadamente 121.7 cm de ancho y 68.5 cm de alto. Las dimensiones totales de la TV son ligeramente más grandes debido al marco."
        },
        {
          "question": "¿Cuál es la diferencia entre pulgadas de US y Reino Unido?",
          "answer": "No hay diferencia — la pulgada internacional es exactamente 25.4 mm tanto en US como en Reino Unido. Esto se estandarizó en 1959 cuando US, Reino Unido, Canadá, Australia, Nueva Zelanda y Sudáfrica acordaron la conversión exacta: 1 pulgada = 25.4 mm."
        },
        {
          "question": "¿Cómo convierto fracciones de pulgada a cm?",
          "answer": "Multiplica la fracción en forma decimal por 2.54. Fracciones comunes: 1/8\" = 0.3175 cm, 1/4\" = 0.635 cm, 3/8\" = 0.9525 cm, 1/2\" = 1.27 cm, 5/8\" = 1.5875 cm, 3/4\" = 1.905 cm, 7/8\" = 2.2225 cm."
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
      "name": "Conversor de Polegadas para CM",
      "slug": "calculadora-polegadas-para-cm",
      "subtitle": "Converta polegadas para centímetros instantaneamente com tabela de referência para medidas comuns.",
      "breadcrumb": "Polegadas para CM",
      "seo": {
        "title": "Conversor de Polegadas para CM - Ferramenta Gratuita de Polegada para Centímetro",
        "description": "Converta polegadas para centímetros instantaneamente. Inclui tabela de conversão, divisão em pés e conversões comuns para altura, tamanhos de tela e dimensões de papel.",
        "shortDescription": "Converta polegadas para centímetros instantaneamente.",
        "keywords": [
          "polegadas para cm",
          "polegadas para centímetros",
          "conversor pol para cm",
          "converter polegadas para cm",
          "tabela polegada para cm",
          "conversor polegada gratuito",
          "imperial para métrico"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "amount": {
          "label": "Polegadas (pol)",
          "helpText": "Digite o valor em polegadas"
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
        "feet": {
          "label": "Pés (decimal)"
        }
      },
      "presets": {
        "screen55": {
          "label": "55 polegadas",
          "description": "Tamanho comum de tela de TV"
        },
        "foot12": {
          "label": "12 polegadas",
          "description": "Exatamente 1 pé"
        },
        "height70": {
          "label": "70 polegadas",
          "description": "5'10\" — altura média masculina"
        }
      },
      "values": {
        "cm": "cm",
        "m": "m",
        "mm": "mm",
        "ft": "pés",
        "in": "pol"
      },
      "formats": {
        "summary": "{inches} polegadas = {cm} cm"
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
              "label": "Pés",
              "valueKey": "feet"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Referência Rápida",
          "items": [
            {
              "label": "1 polegada",
              "valueKey": "ref1"
            },
            {
              "label": "6 polegadas",
              "valueKey": "ref6"
            },
            {
              "label": "12 polegadas (1 pé)",
              "valueKey": "ref12"
            },
            {
              "label": "36 polegadas (1 jarda)",
              "valueKey": "ref36"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Conversão",
          "items": [
            "Multiplique polegadas por 2,54 para obter centímetros — esta é uma conversão exata.",
            "Estimativa rápida: multiplique polegadas por 2,5 para um valor aproximado em cm.",
            "12 polegadas = 1 pé = 30,48 cm exatamente.",
            "Tamanhos comuns de tela: 27\" = 68,58 cm, 32\" = 81,28 cm, 55\" = 139,7 cm."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter Polegadas para Centímetros",
          "content": "Para converter polegadas para centímetros, multiplique o valor em polegadas por 2,54. Este fator de conversão é exato — foi estabelecido por acordo internacional em 1959. Uma polegada equivale exatamente a 25,4 milímetros ou 2,54 centímetros. Por exemplo, 70 polegadas × 2,54 = 177,8 cm. Esta conversão é comumente necessária ao fazer compras internacionalmente, comparar tamanhos de tela, converter medidas de altura ou trabalhar com especificações técnicas que usam sistemas de medição diferentes."
        },
        "howItWorks": {
          "title": "A Fórmula de Polegadas para CM",
          "content": "A fórmula é simples: centímetros = polegadas × 2,54. Como esta é uma definição exata, não há aproximação envolvida. Para pés e polegadas combinados: primeiro converta pés para polegadas (multiplique por 12), adicione as polegadas restantes, depois multiplique o total por 2,54. Por exemplo, 5'10\" = (5 × 12) + 10 = 70 polegadas. Então 70 × 2,54 = 177,8 cm. Você também pode trabalhar ao contrário: cm ÷ 2,54 = polegadas."
        },
        "considerations": {
          "title": "Conversões Comuns de Polegadas para CM",
          "items": [
            {
              "text": "1 polegada = 2,54 cm exatamente — o fator de conversão fundamental",
              "type": "info"
            },
            {
              "text": "12 polegadas = 30,48 cm (1 pé)",
              "type": "info"
            },
            {
              "text": "36 polegadas = 91,44 cm (1 jarda)",
              "type": "info"
            },
            {
              "text": "39,37 polegadas ≈ 100 cm (1 metro)",
              "type": "info"
            },
            {
              "text": "63.360 polegadas = 1 milha = 160.934 cm",
              "type": "info"
            },
            {
              "text": "Conversão de frações: 1/4\" = 0,635 cm, 1/2\" = 1,27 cm, 3/4\" = 1,905 cm",
              "type": "info"
            }
          ]
        },
        "screenSizes": {
          "title": "Conversões de Tamanhos de Tela",
          "items": [
            {
              "text": "24 polegadas = 60,96 cm — tamanho popular de monitor desktop",
              "type": "info"
            },
            {
              "text": "27 polegadas = 68,58 cm — monitor desktop padrão",
              "type": "info"
            },
            {
              "text": "32 polegadas = 81,28 cm — monitor grande ou TV pequena",
              "type": "info"
            },
            {
              "text": "43 polegadas = 109,22 cm — TV média para quartos",
              "type": "info"
            },
            {
              "text": "55 polegadas = 139,7 cm — tamanho de TV mais popular para sala",
              "type": "info"
            },
            {
              "text": "65 polegadas = 165,1 cm — TV grande para sala",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Polegadas para CM",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Converter altura de 5'10\" para cm",
              "steps": [
                "5 pés = 5 × 12 = 60 polegadas",
                "Total = 60 + 10 = 70 polegadas",
                "70 × 2,54 = 177,8 cm",
                "Ou: 5 pés × 30,48 = 152,4 cm",
                "Mais: 10 pol × 2,54 = 25,4 cm",
                "Total: 152,4 + 25,4 = 177,8 cm"
              ],
              "result": "5'10\" = 70 polegadas = 177,8 cm"
            },
            {
              "title": "Converter 8,5 × 11 polegadas (Carta EUA) para cm",
              "steps": [
                "Largura: 8,5 × 2,54 = 21,59 cm",
                "Altura: 11 × 2,54 = 27,94 cm",
                "Comparar com A4: 21,0 × 29,7 cm",
                "Carta EUA é ligeiramente mais larga",
                "A4 é ligeiramente mais alto"
              ],
              "result": "Carta EUA = 21,59 × 27,94 cm"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos cm tem 1 polegada?",
          "answer": "1 polegada equivale exatamente a 2,54 centímetros. Esta é uma definição exata, não uma aproximação. Para converter qualquer medida em polegadas para centímetros, multiplique por 2,54."
        },
        {
          "question": "Como converter pés e polegadas para cm?",
          "answer": "Primeiro converta pés para polegadas multiplicando por 12, depois adicione as polegadas restantes. Finalmente, multiplique o total de polegadas por 2,54. Exemplo: 5'8\" = (5×12)+8 = 68 polegadas × 2,54 = 172,72 cm."
        },
        {
          "question": "Quanto é 6 pés em cm?",
          "answer": "6 pés = 72 polegadas = 182,88 cm. Cada pé tem 30,48 cm, então 6 × 30,48 = 182,88 cm exatamente."
        },
        {
          "question": "Qual o tamanho de uma TV de 55 polegadas em cm?",
          "answer": "Uma TV de 55 polegadas tem medida diagonal de 139,7 cm (55 × 2,54). Para proporção 16:9, a tela tem aproximadamente 121,7 cm de largura e 68,5 cm de altura. As dimensões totais da TV são ligeiramente maiores devido à moldura."
        },
        {
          "question": "Qual a diferença entre polegadas americanas e inglesas?",
          "answer": "Não há diferença — a polegada internacional é exatamente 25,4 mm tanto nos EUA quanto no Reino Unido. Isso foi padronizado em 1959 quando EUA, Reino Unido, Canadá, Austrália, Nova Zelândia e África do Sul concordaram com a conversão exata: 1 polegada = 25,4 mm."
        },
        {
          "question": "Como converter frações de polegada para cm?",
          "answer": "Multiplique a fração em forma decimal por 2,54. Frações comuns: 1/8\" = 0,3175 cm, 1/4\" = 0,635 cm, 3/8\" = 0,9525 cm, 1/2\" = 1,27 cm, 5/8\" = 1,5875 cm, 3/4\" = 1,905 cm, 7/8\" = 2,2225 cm."
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
      }
    },
    fr: {
      "name": "Convertisseur Pouces vers CM",
      "slug": "calculateur-pouces-vers-cm",
      "subtitle": "Convertissez les pouces en centimètres instantanément avec un tableau de référence pour les mesures courantes.",
      "breadcrumb": "Pouces vers CM",
      "seo": {
        "title": "Convertisseur Pouces vers CM - Outil Gratuit de Conversion Pouce vers Centimètre",
        "description": "Convertissez les pouces en centimètres instantanément. Inclut un tableau de conversion, une répartition en pieds, et des conversions courantes pour la taille, les dimensions d'écran et les dimensions de papier.",
        "shortDescription": "Convertissez les pouces en centimètres instantanément.",
        "keywords": [
          "pouces vers cm",
          "pouces vers centimètres",
          "convertisseur po vers cm",
          "convertir pouces en cm",
          "tableau pouce vers cm",
          "convertisseur pouce gratuit",
          "impérial vers métrique"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "amount": {
          "label": "Pouces (po)",
          "helpText": "Entrez la valeur en pouces"
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
        "feet": {
          "label": "Pieds (décimal)"
        }
      },
      "presets": {
        "screen55": {
          "label": "55 pouces",
          "description": "Taille d'écran TV courante"
        },
        "foot12": {
          "label": "12 pouces",
          "description": "Exactement 1 pied"
        },
        "height70": {
          "label": "70 pouces",
          "description": "5'10\" — taille masculine moyenne"
        }
      },
      "values": {
        "cm": "cm",
        "m": "m",
        "mm": "mm",
        "ft": "pi",
        "in": "po"
      },
      "formats": {
        "summary": "{inches} pouces = {cm} cm"
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
              "label": "Pieds",
              "valueKey": "feet"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Référence Rapide",
          "items": [
            {
              "label": "1 pouce",
              "valueKey": "ref1"
            },
            {
              "label": "6 pouces",
              "valueKey": "ref6"
            },
            {
              "label": "12 pouces (1 pi)",
              "valueKey": "ref12"
            },
            {
              "label": "36 pouces (1 vg)",
              "valueKey": "ref36"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils de Conversion",
          "items": [
            "Multipliez les pouces par 2,54 pour obtenir les centimètres — c'est une conversion exacte.",
            "Estimation rapide : multipliez les pouces par 2,5 pour une valeur approximative en cm.",
            "12 pouces = 1 pied = 30,48 cm exactement.",
            "Tailles d'écran courantes : 27\" = 68,58 cm, 32\" = 81,28 cm, 55\" = 139,7 cm."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir les Pouces en Centimètres",
          "content": "Pour convertir les pouces en centimètres, multipliez la valeur en pouces par 2,54. Ce facteur de conversion est exact — il a été établi par accord international en 1959. Un pouce équivaut exactement à 25,4 millimètres ou 2,54 centimètres. Par exemple, 70 pouces × 2,54 = 177,8 cm. Cette conversion est couramment nécessaire lors d'achats internationaux, de comparaisons de tailles d'écran, de conversions de mesures de taille, ou lors du travail avec des spécifications techniques utilisant différents systèmes de mesure."
        },
        "howItWorks": {
          "title": "La Formule Pouces vers CM",
          "content": "La formule est simple : centimètres = pouces × 2,54. Puisque c'est une définition exacte, il n'y a aucune approximation. Pour les pieds et pouces combinés : convertissez d'abord les pieds en pouces (multipliez par 12), ajoutez les pouces restants, puis multipliez le total par 2,54. Par exemple, 5'10\" = (5 × 12) + 10 = 70 pouces. Puis 70 × 2,54 = 177,8 cm. Vous pouvez aussi faire l'inverse : cm ÷ 2,54 = pouces."
        },
        "considerations": {
          "title": "Conversions Courantes Pouces vers CM",
          "items": [
            {
              "text": "1 pouce = 2,54 cm exactement — le facteur de conversion fondamental",
              "type": "info"
            },
            {
              "text": "12 pouces = 30,48 cm (1 pied)",
              "type": "info"
            },
            {
              "text": "36 pouces = 91,44 cm (1 verge)",
              "type": "info"
            },
            {
              "text": "39,37 pouces ≈ 100 cm (1 mètre)",
              "type": "info"
            },
            {
              "text": "63 360 pouces = 1 mille = 160 934 cm",
              "type": "info"
            },
            {
              "text": "Conversion de fractions : 1/4\" = 0,635 cm, 1/2\" = 1,27 cm, 3/4\" = 1,905 cm",
              "type": "info"
            }
          ]
        },
        "screenSizes": {
          "title": "Conversions de Tailles d'Écran",
          "items": [
            {
              "text": "24 pouces = 60,96 cm — taille populaire de moniteur de bureau",
              "type": "info"
            },
            {
              "text": "27 pouces = 68,58 cm — moniteur de bureau standard",
              "type": "info"
            },
            {
              "text": "32 pouces = 81,28 cm — grand moniteur ou petite TV",
              "type": "info"
            },
            {
              "text": "43 pouces = 109,22 cm — TV moyenne pour chambres",
              "type": "info"
            },
            {
              "text": "55 pouces = 139,7 cm — taille de TV salon la plus populaire",
              "type": "info"
            },
            {
              "text": "65 pouces = 165,1 cm — grande TV de salon",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples Pouces vers CM",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Convertir une taille de 5'10\" en cm",
              "steps": [
                "5 pieds = 5 × 12 = 60 pouces",
                "Total = 60 + 10 = 70 pouces",
                "70 × 2,54 = 177,8 cm",
                "Ou : 5 pi × 30,48 = 152,4 cm",
                "Plus : 10 po × 2,54 = 25,4 cm",
                "Total : 152,4 + 25,4 = 177,8 cm"
              ],
              "result": "5'10\" = 70 pouces = 177,8 cm"
            },
            {
              "title": "Convertir 8,5 × 11 pouces (US Letter) en cm",
              "steps": [
                "Largeur : 8,5 × 2,54 = 21,59 cm",
                "Hauteur : 11 × 2,54 = 27,94 cm",
                "Comparer à A4 : 21,0 × 29,7 cm",
                "US Letter est légèrement plus large",
                "A4 est légèrement plus haut"
              ],
              "result": "US Letter = 21,59 × 27,94 cm"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de cm font 1 pouce ?",
          "answer": "1 pouce équivaut exactement à 2,54 centimètres. C'est une définition exacte, pas une approximation. Pour convertir n'importe quelle mesure en pouces en centimètres, multipliez par 2,54."
        },
        {
          "question": "Comment convertir pieds et pouces en cm ?",
          "answer": "Convertissez d'abord les pieds en pouces en multipliant par 12, puis ajoutez les pouces restants. Enfin, multipliez le total de pouces par 2,54. Exemple : 5'8\" = (5×12)+8 = 68 pouces × 2,54 = 172,72 cm."
        },
        {
          "question": "Combien font 6 pieds en cm ?",
          "answer": "6 pieds = 72 pouces = 182,88 cm. Chaque pied fait 30,48 cm, donc 6 × 30,48 = 182,88 cm exactement."
        },
        {
          "question": "Quelle est la taille d'une TV 55 pouces en cm ?",
          "answer": "Une TV 55 pouces a une mesure diagonale de 139,7 cm (55 × 2,54). Pour un format 16:9, l'écran fait environ 121,7 cm de large et 68,5 cm de haut. Les dimensions globales de la TV sont légèrement plus grandes à cause du cadre."
        },
        {
          "question": "Quelle est la différence entre les pouces US et UK ?",
          "answer": "Il n'y a aucune différence — le pouce international fait exactement 25,4 mm aux États-Unis et au Royaume-Uni. Cela a été standardisé en 1959 quand les États-Unis, le Royaume-Uni, le Canada, l'Australie, la Nouvelle-Zélande et l'Afrique du Sud se sont accordés sur la conversion exacte : 1 pouce = 25,4 mm."
        },
        {
          "question": "Comment convertir les fractions de pouce en cm ?",
          "answer": "Multipliez la fraction sous forme décimale par 2,54. Fractions courantes : 1/8\" = 0,3175 cm, 1/4\" = 0,635 cm, 3/8\" = 0,9525 cm, 1/2\" = 1,27 cm, 5/8\" = 1,5875 cm, 3/4\" = 1,905 cm, 7/8\" = 2,2225 cm."
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
      "name": "Zoll zu CM Umrechner",
      "slug": "zoll-zu-cm-rechner",
      "subtitle": "Rechnen Sie Zoll sofort in Zentimeter um mit einer Referenztabelle für gängige Maße.",
      "breadcrumb": "Zoll zu CM",
      "seo": {
        "title": "Zoll zu CM Umrechner - Kostenloses Zoll zu Zentimeter Tool",
        "description": "Rechnen Sie Zoll sofort in Zentimeter um. Enthält Umrechnungstabelle, Fuß-Aufschlüsselung und gängige Umrechnungen für Körpergröße, Bildschirmgrößen und Papierformate.",
        "shortDescription": "Rechnen Sie Zoll sofort in Zentimeter um.",
        "keywords": [
          "zoll zu cm",
          "zoll zu zentimeter",
          "inch zu cm umrechner",
          "zoll in cm umrechnen",
          "zoll cm tabelle",
          "kostenloser zoll umrechner",
          "imperial zu metrisch"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "amount": {
          "label": "Zoll (in)",
          "helpText": "Geben Sie den Wert in Zoll ein"
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
        "feet": {
          "label": "Fuß (dezimal)"
        }
      },
      "presets": {
        "screen55": {
          "label": "55 Zoll",
          "description": "Gängige TV-Bildschirmgröße"
        },
        "foot12": {
          "label": "12 Zoll",
          "description": "Genau 1 Fuß"
        },
        "height70": {
          "label": "70 Zoll",
          "description": "5'10\" — durchschnittliche männliche Körpergröße"
        }
      },
      "values": {
        "cm": "cm",
        "m": "m",
        "mm": "mm",
        "ft": "ft",
        "in": "in"
      },
      "formats": {
        "summary": "{inches} Zoll = {cm} cm"
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
              "label": "Fuß",
              "valueKey": "feet"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Schnellreferenz",
          "items": [
            {
              "label": "1 Zoll",
              "valueKey": "ref1"
            },
            {
              "label": "6 Zoll",
              "valueKey": "ref6"
            },
            {
              "label": "12 Zoll (1 ft)",
              "valueKey": "ref12"
            },
            {
              "label": "36 Zoll (1 yd)",
              "valueKey": "ref36"
            }
          ]
        },
        "tips": {
          "title": "💡 Umrechnungstipps",
          "items": [
            "Multiplizieren Sie Zoll mit 2,54 um Zentimeter zu erhalten — das ist eine exakte Umrechnung.",
            "Schnelle Schätzung: multiplizieren Sie Zoll mit 2,5 für einen groben cm-Wert.",
            "12 Zoll = 1 Fuß = genau 30,48 cm.",
            "Gängige Bildschirmgrößen: 27\" = 68,58 cm, 32\" = 81,28 cm, 55\" = 139,7 cm."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie man Zoll in Zentimeter umrechnet",
          "content": "Um Zoll in Zentimeter umzurechnen, multiplizieren Sie den Zollwert mit 2,54. Dieser Umrechnungsfaktor ist exakt — er wurde 1959 durch internationale Vereinbarung festgelegt. Ein Zoll entspricht genau 25,4 Millimetern oder 2,54 Zentimetern. Zum Beispiel: 70 Zoll × 2,54 = 177,8 cm. Diese Umrechnung wird häufig beim internationalen Einkauf, beim Vergleich von Bildschirmgrößen, bei der Umrechnung von Körpergrößen oder bei der Arbeit mit technischen Spezifikationen benötigt, die verschiedene Maßsysteme verwenden."
        },
        "howItWorks": {
          "title": "Die Zoll zu CM Formel",
          "content": "Die Formel ist einfach: Zentimeter = Zoll × 2,54. Da dies eine exakte Definition ist, ist keine Annäherung erforderlich. Für kombinierte Fuß und Zoll: wandeln Sie zuerst Fuß in Zoll um (mit 12 multiplizieren), addieren Sie die verbleibenden Zoll, dann multiplizieren Sie die Gesamtzahl mit 2,54. Zum Beispiel: 5'10\" = (5 × 12) + 10 = 70 Zoll. Dann 70 × 2,54 = 177,8 cm. Sie können auch rückwärts rechnen: cm ÷ 2,54 = Zoll."
        },
        "considerations": {
          "title": "Gängige Zoll zu CM Umrechnungen",
          "items": [
            {
              "text": "1 Zoll = genau 2,54 cm — der grundlegende Umrechnungsfaktor",
              "type": "info"
            },
            {
              "text": "12 Zoll = 30,48 cm (1 Fuß)",
              "type": "info"
            },
            {
              "text": "36 Zoll = 91,44 cm (1 Yard)",
              "type": "info"
            },
            {
              "text": "39,37 Zoll ≈ 100 cm (1 Meter)",
              "type": "info"
            },
            {
              "text": "63.360 Zoll = 1 Meile = 160.934 cm",
              "type": "info"
            },
            {
              "text": "Bruch-Umrechnung: 1/4\" = 0,635 cm, 1/2\" = 1,27 cm, 3/4\" = 1,905 cm",
              "type": "info"
            }
          ]
        },
        "screenSizes": {
          "title": "Bildschirmgrößen-Umrechnungen",
          "items": [
            {
              "text": "24 Zoll = 60,96 cm — beliebte Desktop-Monitorgröße",
              "type": "info"
            },
            {
              "text": "27 Zoll = 68,58 cm — Standard-Desktop-Monitor",
              "type": "info"
            },
            {
              "text": "32 Zoll = 81,28 cm — großer Monitor oder kleiner TV",
              "type": "info"
            },
            {
              "text": "43 Zoll = 109,22 cm — mittelgroßer TV für Schlafzimmer",
              "type": "info"
            },
            {
              "text": "55 Zoll = 139,7 cm — beliebteste Wohnzimmer-TV-Größe",
              "type": "info"
            },
            {
              "text": "65 Zoll = 165,1 cm — großer Wohnzimmer-TV",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Zoll zu CM Beispiele",
          "description": "Schritt-für-Schritt Umrechnungen",
          "examples": [
            {
              "title": "Körpergröße 5'10\" in cm umrechnen",
              "steps": [
                "5 Fuß = 5 × 12 = 60 Zoll",
                "Gesamt = 60 + 10 = 70 Zoll",
                "70 × 2,54 = 177,8 cm",
                "Oder: 5 ft × 30,48 = 152,4 cm",
                "Plus: 10 in × 2,54 = 25,4 cm",
                "Gesamt: 152,4 + 25,4 = 177,8 cm"
              ],
              "result": "5'10\" = 70 Zoll = 177,8 cm"
            },
            {
              "title": "8,5 × 11 Zoll (US Letter) in cm umrechnen",
              "steps": [
                "Breite: 8,5 × 2,54 = 21,59 cm",
                "Höhe: 11 × 2,54 = 27,94 cm",
                "Vergleich zu A4: 21,0 × 29,7 cm",
                "US Letter ist etwas breiter",
                "A4 ist etwas höher"
              ],
              "result": "US Letter = 21,59 × 27,94 cm"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele cm sind 1 Zoll?",
          "answer": "1 Zoll entspricht genau 2,54 Zentimetern. Das ist eine exakte Definition, keine Annäherung. Um jedes Zollmaß in Zentimeter umzurechnen, multiplizieren Sie mit 2,54."
        },
        {
          "question": "Wie rechne ich Fuß und Zoll in cm um?",
          "answer": "Wandeln Sie zuerst Fuß in Zoll um, indem Sie mit 12 multiplizieren, dann addieren Sie die verbleibenden Zoll. Schließlich multiplizieren Sie die Gesamtzoll mit 2,54. Beispiel: 5'8\" = (5×12)+8 = 68 Zoll × 2,54 = 172,72 cm."
        },
        {
          "question": "Was sind 6 Fuß in cm?",
          "answer": "6 Fuß = 72 Zoll = 182,88 cm. Jeder Fuß sind 30,48 cm, also 6 × 30,48 = genau 182,88 cm."
        },
        {
          "question": "Wie groß ist ein 55-Zoll-TV in cm?",
          "answer": "Ein 55-Zoll-TV hat ein Diagonalmaß von 139,7 cm (55 × 2,54). Bei einem 16:9-Seitenverhältnis ist der Bildschirm etwa 121,7 cm breit und 68,5 cm hoch. Die Gesamt-TV-Abmessungen sind wegen des Rahmens etwas größer."
        },
        {
          "question": "Was ist der Unterschied zwischen US- und UK-Zoll?",
          "answer": "Es gibt keinen Unterschied — der internationale Zoll ist sowohl in den USA als auch in Großbritannien genau 25,4 mm. Das wurde 1959 standardisiert, als die USA, Großbritannien, Kanada, Australien, Neuseeland und Südafrika die exakte Umrechnung vereinbarten: 1 Zoll = 25,4 mm."
        },
        {
          "question": "Wie rechne ich Zoll-Brüche in cm um?",
          "answer": "Multiplizieren Sie den Bruch in Dezimalform mit 2,54. Gängige Brüche: 1/8\" = 0,3175 cm, 1/4\" = 0,635 cm, 3/8\" = 0,9525 cm, 1/2\" = 1,27 cm, 5/8\" = 1,5875 cm, 3/4\" = 1,905 cm, 7/8\" = 2,2225 cm."
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
      placeholder: "70",
      min: 0,
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "in",
    },
  ],

  inputGroups: [],

  results: [
    { id: "centimeters", type: "primary", format: "text" },
    { id: "meters", type: "secondary", format: "text" },
    { id: "millimeters", type: "secondary", format: "text" },
    { id: "feet", type: "secondary", format: "text" },
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
    { id: "screenSizes", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Length Specifications", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "Inches to CM" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["cm-to-inches", "length-converter", "feet-to-cm"],
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

export function calculateInchesToCm(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Convert any input unit to mm (base of length_small), then derive all
  const fromUnit = fieldUnits.amount || "in";
  const mm = convertToBase(amount, fromUnit, "length_small");
  const inches = mm / 25.4;
  const cm = mm / 10;
  const meters = cm / 100;
  const feet = inches / 12;

  // Quick reference
  const ref1 = 1 * 2.54;
  const ref6 = 6 * 2.54;
  const ref12 = 12 * 2.54;
  const ref36 = 36 * 2.54;

  return {
    values: { centimeters: cm, meters, millimeters: mm, feet },
    formatted: {
      centimeters: `${fmtNum(cm)} cm`,
      meters: `${fmtNum(meters)} m`,
      millimeters: `${fmtNum(mm)} mm`,
      feet: `${fmtNum(feet)} ft`,
      ref1: `${fmtNum(ref1)} cm`,
      ref6: `${fmtNum(ref6)} cm`,
      ref12: `${fmtNum(ref12)} cm (1 ft)`,
      ref36: `${fmtNum(ref36)} cm (1 yd)`,
    },
    summary: `${fmtNum(inches)} in = ${fmtNum(cm)} cm = ${fmtNum(meters)} m`,
    isValid: true,
  };
}

export default inchesToCmConverterConfig;
