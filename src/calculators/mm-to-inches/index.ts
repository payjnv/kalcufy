import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// MM TO INCHES CONVERTER - V4 (EN ONLY)
// ============================================================================

export const mmToInchesConverterConfig: CalculatorConfigV4 = {
  id: "mm-to-inches",
  version: "4.0",
  category: "conversion",
  icon: "📏",

  presets: [
    { id: "bolt10mm", icon: "🔩", values: { amount: 10 } },
    { id: "screen6mm", icon: "📱", values: { amount: 6.1 } },
    { id: "pipe25mm", icon: "🔧", values: { amount: 25.4 } },
  ],

  t: {
    en: {
      name: "MM to Inches Converter",
      slug: "mm-to-inches",
      subtitle: "Convert millimeters to inches instantly — essential for engineering, manufacturing, and precision work.",
      breadcrumb: "MM to Inches",

      seo: {
        title: "MM to Inches Converter - Free Millimeter to Inch Tool",
        description: "Convert millimeters to inches instantly. Essential for engineering, manufacturing, 3D printing, and precision measurements. Includes fraction chart and common sizes.",
        shortDescription: "Convert millimeters to inches instantly.",
        keywords: ["mm to inches", "millimeters to inches", "mm to in converter", "convert mm to inches", "mm to inches chart", "free mm converter", "mm to fraction inches"],
      },

      calculator: { yourInformation: "MM to Inches" },
      ui: { yourInformation: "MM to Inches", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Measurement", helpText: "Enter value and select unit" },
      },

      results: {
        inches: { label: "Inches (decimal)" },
        fraction: { label: "Inches (fraction)" },
        centimeters: { label: "Centimeters" },
        mils: { label: "Mils (thou)" },
      },

      presets: {
        bolt10mm: { label: "10 mm", description: "Common bolt/screw size" },
        screen6mm: { label: "6.1 mm", description: "Smartphone thickness" },
        pipe25mm: { label: "25.4 mm", description: "Exactly 1 inch" },
      },

      values: { "in": "in", "cm": "cm", "mm": "mm", "mil": "mil" },
      formats: { summary: "{mm} mm = {inches} inches" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Inches (decimal)", valueKey: "inches" },
            { label: "Inches (fraction)", valueKey: "fraction" },
            { label: "Centimeters", valueKey: "centimeters" },
            { label: "Mils (thousandths)", valueKey: "mils" },
          ],
        },
        quickRef: {
          title: "📊 Common Sizes",
          items: [
            { label: "1 mm", valueKey: "ref1" },
            { label: "5 mm", valueKey: "ref5" },
            { label: "10 mm", valueKey: "ref10" },
            { label: "25.4 mm (1 in)", valueKey: "ref25" },
          ],
        },
        tips: {
          title: "💡 Precision Tips",
          items: [
            "1 inch = exactly 25.4 mm — divide mm by 25.4 to get inches.",
            "Quick estimate: divide mm by 25 for a rough inch value.",
            "Common wrench sizes: 10mm ≈ 3/8\", 13mm ≈ 1/2\", 19mm ≈ 3/4\".",
            "1 mil (thou) = 0.001 inches = 0.0254 mm — used in manufacturing.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert MM to Inches",
          content: "To convert millimeters to inches, divide by 25.4. One inch equals exactly 25.4 millimeters by international definition (since 1959). So 1 mm = 0.03937 inches, or approximately 1/25 of an inch. This conversion is essential in engineering, manufacturing, 3D printing, CNC machining, and any field where metric and imperial specifications intersect. Many bolts, screws, and hardware come in both metric (mm) and imperial (inches) sizes.",
        },
        howItWorks: {
          title: "The MM to Inches Formula",
          content: "The formula is: inches = millimeters ÷ 25.4. For fractional inches (common in US construction and hardware), find the nearest fraction: divide the decimal inches by the fraction increment (1/16, 1/32, or 1/64) and round. For example, 10 mm = 0.3937\" ≈ 25/64\" (0.3906\") or approximately 3/8\" (0.375\"). The 'mil' or 'thou' (thousandth of an inch) is useful for thin materials: 1 mm = 39.37 mils.",
        },
        considerations: {
          title: "Common MM to Inches Conversions",
          items: [
            { text: "1 mm = 0.03937 in = ~1/25\" — about the thickness of a credit card", type: "info" },
            { text: "3.175 mm = 1/8 inch exactly", type: "info" },
            { text: "6.35 mm = 1/4 inch exactly", type: "info" },
            { text: "12.7 mm = 1/2 inch exactly", type: "info" },
            { text: "19.05 mm = 3/4 inch exactly", type: "info" },
            { text: "25.4 mm = 1 inch exactly — the key reference value", type: "info" },
          ],
        },
        wrenchSizes: {
          title: "Wrench & Socket Size Equivalents",
          items: [
            { text: "8 mm ≈ 5/16\" (0.3125\") — small bolt", type: "info" },
            { text: "10 mm ≈ 3/8\" (0.375\") — very common automotive", type: "info" },
            { text: "13 mm ≈ 1/2\" (0.5\") — standard bolt size", type: "info" },
            { text: "17 mm ≈ 11/16\" (0.6875\") — lug nuts, larger bolts", type: "info" },
            { text: "19 mm ≈ 3/4\" (0.75\") — common lug nut size", type: "info" },
            { text: "22 mm ≈ 7/8\" (0.875\") — large industrial bolts", type: "info" },
          ],
        },
        examples: {
          title: "MM to Inches Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 10mm wrench to inches",
              steps: ["10 ÷ 25.4 = 0.3937 inches", "Nearest fraction: 0.3937 × 16 = 6.3", "Round to 6/16 = 3/8\" (0.375\")", "Difference: 0.3937 - 0.375 = 0.019\"", "3/8\" wrench fits ~10mm bolts"],
              result: "10 mm = 0.394\" ≈ 3/8\" (close but not exact)",
            },
            {
              title: "3D print layer height: 0.2mm",
              steps: ["0.2 ÷ 25.4 = 0.00787 inches", "In mils: 0.2 × 39.37 = 7.87 mils", "This is ~8 thou (thousandths)", "Common range: 0.1-0.3 mm (4-12 thou)"],
              result: "0.2 mm = 0.008\" = 7.87 mils",
            },
          ],
        },
      },

      faqs: [
        { question: "How many inches is 1 mm?", answer: "1 millimeter equals 0.03937 inches, or approximately 1/25 of an inch. To convert mm to inches, divide by 25.4. To convert inches to mm, multiply by 25.4." },
        { question: "How do I convert mm to fractional inches?", answer: "Divide mm by 25.4 to get decimal inches. Then multiply by the denominator you want (16 for 16ths, 32 for 32nds, 64 for 64ths) and round. Example: 10 mm = 0.3937\" × 32 = 12.6/32 ≈ 13/32\"." },
        { question: "What is 25.4 mm in inches?", answer: "25.4 mm equals exactly 1 inch. This is the exact definition — 1 inch = 25.4 mm was established by international agreement in 1959." },
        { question: "Is a 10mm wrench the same as 3/8 inch?", answer: "Very close but not exact. 10mm = 0.3937\" while 3/8\" = 0.375\" — a difference of 0.019\" (0.47 mm). A 3/8\" wrench can usually fit a 10mm bolt, but it may be slightly loose. For precision work, use the correct metric or imperial tool." },
        { question: "What is a mil or thou?", answer: "A mil (also called thou) is 1/1000 of an inch = 0.0254 mm. It's used in manufacturing for thin materials like sheet metal, wire gauge, paint thickness, and PCB traces. 1 mm = 39.37 mils." },
        { question: "How do I measure mm without a metric ruler?", answer: "If you only have an imperial ruler: 1/16\" ≈ 1.6 mm, 1/8\" ≈ 3.2 mm, 1/4\" ≈ 6.4 mm, 1/2\" ≈ 12.7 mm, 1\" = 25.4 mm. For precise work, use a digital caliper that displays both mm and inches." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de MM a Pulgadas",
      "slug": "calculadora-milimetros-a-pulgadas",
      "subtitle": "Convierte milímetros a pulgadas al instante — esencial para ingeniería, manufactura y trabajo de precisión.",
      "breadcrumb": "MM a Pulgadas",
      "seo": {
        "title": "Convertidor MM a Pulgadas - Herramienta Gratuita de Milímetros a Pulgadas",
        "description": "Convierte milímetros a pulgadas al instante. Esencial para ingeniería, manufactura, impresión 3D y mediciones de precisión. Incluye tabla de fracciones y tamaños comunes.",
        "shortDescription": "Convierte milímetros a pulgadas al instante.",
        "keywords": [
          "mm a pulgadas",
          "milímetros a pulgadas",
          "conversor mm a pulgadas",
          "convertir mm a pulgadas",
          "tabla mm a pulgadas",
          "conversor mm gratis",
          "mm a pulgadas fraccionarias"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "amount": {
          "label": "Medida",
          "helpText": "Ingresa el valor y selecciona la unidad"
        }
      },
      "results": {
        "inches": {
          "label": "Pulgadas (decimal)"
        },
        "fraction": {
          "label": "Pulgadas (fracción)"
        },
        "centimeters": {
          "label": "Centímetros"
        },
        "mils": {
          "label": "Milésimas (thou)"
        }
      },
      "presets": {
        "bolt10mm": {
          "label": "10 mm",
          "description": "Tamaño común de perno/tornillo"
        },
        "screen6mm": {
          "label": "6.1 mm",
          "description": "Grosor de smartphone"
        },
        "pipe25mm": {
          "label": "25.4 mm",
          "description": "Exactamente 1 pulgada"
        }
      },
      "values": {
        "in": "pulg",
        "cm": "cm",
        "mm": "mm",
        "mil": "mil"
      },
      "formats": {
        "summary": "{mm} mm = {inches} pulgadas"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados de Conversión",
          "items": [
            {
              "label": "Pulgadas (decimal)",
              "valueKey": "inches"
            },
            {
              "label": "Pulgadas (fracción)",
              "valueKey": "fraction"
            },
            {
              "label": "Centímetros",
              "valueKey": "centimeters"
            },
            {
              "label": "Milésimas",
              "valueKey": "mils"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Tamaños Comunes",
          "items": [
            {
              "label": "1 mm",
              "valueKey": "ref1"
            },
            {
              "label": "5 mm",
              "valueKey": "ref5"
            },
            {
              "label": "10 mm",
              "valueKey": "ref10"
            },
            {
              "label": "25.4 mm (1 pulg)",
              "valueKey": "ref25"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Precisión",
          "items": [
            "1 pulgada = exactamente 25.4 mm — divide mm entre 25.4 para obtener pulgadas.",
            "Estimación rápida: divide mm entre 25 para obtener un valor aproximado en pulgadas.",
            "Tamaños comunes de llaves: 10mm ≈ 3/8\", 13mm ≈ 1/2\", 19mm ≈ 3/4\".",
            "1 mil (thou) = 0.001 pulgadas = 0.0254 mm — usado en manufactura."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir MM a Pulgadas",
          "content": "Para convertir milímetros a pulgadas, divide entre 25.4. Una pulgada equivale exactamente a 25.4 milímetros por definición internacional (desde 1959). Entonces 1 mm = 0.03937 pulgadas, o aproximadamente 1/25 de pulgada. Esta conversión es esencial en ingeniería, manufactura, impresión 3D, mecanizado CNC y cualquier campo donde se intersecan especificaciones métricas e imperiales. Muchos pernos, tornillos y hardware vienen en tamaños tanto métricos (mm) como imperiales (pulgadas)."
        },
        "howItWorks": {
          "title": "La Fórmula de MM a Pulgadas",
          "content": "La fórmula es: pulgadas = milímetros ÷ 25.4. Para pulgadas fraccionarias (común en construcción y hardware de EE.UU.), encuentra la fracción más cercana: divide las pulgadas decimales entre el incremento de fracción (1/16, 1/32, o 1/64) y redondea. Por ejemplo, 10 mm = 0.3937\" ≈ 25/64\" (0.3906\") o aproximadamente 3/8\" (0.375\"). El 'mil' o 'thou' (milésima de pulgada) es útil para materiales delgados: 1 mm = 39.37 mils."
        },
        "considerations": {
          "title": "Conversiones Comunes de MM a Pulgadas",
          "items": [
            {
              "text": "1 mm = 0.03937 pulg = ~1/25\" — aproximadamente el grosor de una tarjeta de crédito",
              "type": "info"
            },
            {
              "text": "3.175 mm = 1/8 pulgada exactamente",
              "type": "info"
            },
            {
              "text": "6.35 mm = 1/4 pulgada exactamente",
              "type": "info"
            },
            {
              "text": "12.7 mm = 1/2 pulgada exactamente",
              "type": "info"
            },
            {
              "text": "19.05 mm = 3/4 pulgada exactamente",
              "type": "info"
            },
            {
              "text": "25.4 mm = 1 pulgada exactamente — el valor de referencia clave",
              "type": "info"
            }
          ]
        },
        "wrenchSizes": {
          "title": "Equivalencias de Tamaños de Llaves y Dados",
          "items": [
            {
              "text": "8 mm ≈ 5/16\" (0.3125\") — perno pequeño",
              "type": "info"
            },
            {
              "text": "10 mm ≈ 3/8\" (0.375\") — muy común en automotriz",
              "type": "info"
            },
            {
              "text": "13 mm ≈ 1/2\" (0.5\") — tamaño estándar de perno",
              "type": "info"
            },
            {
              "text": "17 mm ≈ 11/16\" (0.6875\") — tuercas de rueda, pernos grandes",
              "type": "info"
            },
            {
              "text": "19 mm ≈ 3/4\" (0.75\") — tamaño común de tuerca de rueda",
              "type": "info"
            },
            {
              "text": "22 mm ≈ 7/8\" (0.875\") — pernos industriales grandes",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de MM a Pulgadas",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Convertir llave de 10mm a pulgadas",
              "steps": [
                "10 ÷ 25.4 = 0.3937 pulgadas",
                "Fracción más cercana: 0.3937 × 16 = 6.3",
                "Redondear a 6/16 = 3/8\" (0.375\")",
                "Diferencia: 0.3937 - 0.375 = 0.019\"",
                "Llave de 3/8\" sirve para pernos de ~10mm"
              ],
              "result": "10 mm = 0.394\" ≈ 3/8\" (cerca pero no exacto)"
            },
            {
              "title": "Altura de capa impresión 3D: 0.2mm",
              "steps": [
                "0.2 ÷ 25.4 = 0.00787 pulgadas",
                "En mils: 0.2 × 39.37 = 7.87 mils",
                "Esto es ~8 thou (milésimas)",
                "Rango común: 0.1-0.3 mm (4-12 thou)"
              ],
              "result": "0.2 mm = 0.008\" = 7.87 mils"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántas pulgadas es 1 mm?",
          "answer": "1 milímetro equivale a 0.03937 pulgadas, o aproximadamente 1/25 de pulgada. Para convertir mm a pulgadas, divide entre 25.4. Para convertir pulgadas a mm, multiplica por 25.4."
        },
        {
          "question": "¿Cómo convierto mm a pulgadas fraccionarias?",
          "answer": "Divide mm entre 25.4 para obtener pulgadas decimales. Luego multiplica por el denominador que quieras (16 para dieciseisavos, 32 para treintaidosavos, 64 para sesentaicuatroavos) y redondea. Ejemplo: 10 mm = 0.3937\" × 32 = 12.6/32 ≈ 13/32\"."
        },
        {
          "question": "¿Cuánto es 25.4 mm en pulgadas?",
          "answer": "25.4 mm equivale exactamente a 1 pulgada. Esta es la definición exacta — 1 pulgada = 25.4 mm fue establecido por acuerdo internacional en 1959."
        },
        {
          "question": "¿Es una llave de 10mm igual a 3/8 de pulgada?",
          "answer": "Muy cerca pero no exacto. 10mm = 0.3937\" mientras que 3/8\" = 0.375\" — una diferencia de 0.019\" (0.47 mm). Una llave de 3/8\" generalmente puede servir para un perno de 10mm, pero puede estar ligeramente holgada. Para trabajo de precisión, usa la herramienta métrica o imperial correcta."
        },
        {
          "question": "¿Qué es un mil o thou?",
          "answer": "Un mil (también llamado thou) es 1/1000 de pulgada = 0.0254 mm. Se usa en manufactura para materiales delgados como lámina metálica, calibre de alambre, grosor de pintura y trazas de PCB. 1 mm = 39.37 mils."
        },
        {
          "question": "¿Cómo mido mm sin una regla métrica?",
          "answer": "Si solo tienes una regla imperial: 1/16\" ≈ 1.6 mm, 1/8\" ≈ 3.2 mm, 1/4\" ≈ 6.4 mm, 1/2\" ≈ 12.7 mm, 1\" = 25.4 mm. Para trabajo preciso, usa un calibrador digital que muestre tanto mm como pulgadas."
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
      "name": "Conversor de MM para Polegadas",
      "slug": "calculadora-mm-para-polegadas",
      "subtitle": "Converta milímetros para polegadas instantaneamente — essencial para engenharia, manufatura e trabalho de precisão.",
      "breadcrumb": "MM para Polegadas",
      "seo": {
        "title": "Conversor de MM para Polegadas - Ferramenta Gratuita de Milímetros para Polegadas",
        "description": "Converta milímetros para polegadas instantaneamente. Essencial para engenharia, manufatura, impressão 3D e medições de precisão. Inclui tabela de frações e tamanhos comuns.",
        "shortDescription": "Converta milímetros para polegadas instantaneamente.",
        "keywords": [
          "mm para polegadas",
          "milímetros para polegadas",
          "conversor mm para pol",
          "converter mm para polegadas",
          "tabela mm para polegadas",
          "conversor mm gratuito",
          "mm para polegadas fracionárias"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Medição",
          "helpText": "Digite o valor e selecione a unidade"
        }
      },
      "results": {
        "inches": {
          "label": "Polegadas (decimal)"
        },
        "fraction": {
          "label": "Polegadas (fração)"
        },
        "centimeters": {
          "label": "Centímetros"
        },
        "mils": {
          "label": "Mils (milésimos)"
        }
      },
      "presets": {
        "bolt10mm": {
          "label": "10 mm",
          "description": "Tamanho comum de parafuso"
        },
        "screen6mm": {
          "label": "6.1 mm",
          "description": "Espessura de smartphone"
        },
        "pipe25mm": {
          "label": "25.4 mm",
          "description": "Exatamente 1 polegada"
        }
      },
      "values": {
        "in": "pol",
        "cm": "cm",
        "mm": "mm",
        "mil": "mil"
      },
      "formats": {
        "summary": "{mm} mm = {inches} polegadas"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados da Conversão",
          "items": [
            {
              "label": "Polegadas (decimal)",
              "valueKey": "inches"
            },
            {
              "label": "Polegadas (fração)",
              "valueKey": "fraction"
            },
            {
              "label": "Centímetros",
              "valueKey": "centimeters"
            },
            {
              "label": "Mils (milésimos)",
              "valueKey": "mils"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Tamanhos Comuns",
          "items": [
            {
              "label": "1 mm",
              "valueKey": "ref1"
            },
            {
              "label": "5 mm",
              "valueKey": "ref5"
            },
            {
              "label": "10 mm",
              "valueKey": "ref10"
            },
            {
              "label": "25.4 mm (1 pol)",
              "valueKey": "ref25"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Precisão",
          "items": [
            "1 polegada = exatamente 25.4 mm — divida mm por 25.4 para obter polegadas.",
            "Estimativa rápida: divida mm por 25 para um valor aproximado em polegadas.",
            "Tamanhos comuns de chave: 10mm ≈ 3/8\", 13mm ≈ 1/2\", 19mm ≈ 3/4\".",
            "1 mil (milésimo) = 0.001 polegadas = 0.0254 mm — usado na manufatura."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter MM para Polegadas",
          "content": "Para converter milímetros para polegadas, divida por 25.4. Uma polegada equivale a exatamente 25.4 milímetros por definição internacional (desde 1959). Assim, 1 mm = 0.03937 polegadas, ou aproximadamente 1/25 de polegada. Esta conversão é essencial em engenharia, manufatura, impressão 3D, usinagem CNC e qualquer área onde especificações métricas e imperiais se intersectam. Muitos parafusos e ferragens vêm em tamanhos métricos (mm) e imperiais (polegadas)."
        },
        "howItWorks": {
          "title": "A Fórmula de MM para Polegadas",
          "content": "A fórmula é: polegadas = milímetros ÷ 25.4. Para polegadas fracionárias (comuns na construção e ferragens dos EUA), encontre a fração mais próxima: divida as polegadas decimais pelo incremento da fração (1/16, 1/32 ou 1/64) e arredonde. Por exemplo, 10 mm = 0.3937\" ≈ 25/64\" (0.3906\") ou aproximadamente 3/8\" (0.375\"). O 'mil' ou milésimo de polegada é útil para materiais finos: 1 mm = 39.37 mils."
        },
        "considerations": {
          "title": "Conversões Comuns de MM para Polegadas",
          "items": [
            {
              "text": "1 mm = 0.03937 pol = ~1/25\" — aproximadamente a espessura de um cartão de crédito",
              "type": "info"
            },
            {
              "text": "3.175 mm = 1/8 polegada exatamente",
              "type": "info"
            },
            {
              "text": "6.35 mm = 1/4 polegada exatamente",
              "type": "info"
            },
            {
              "text": "12.7 mm = 1/2 polegada exatamente",
              "type": "info"
            },
            {
              "text": "19.05 mm = 3/4 polegada exatamente",
              "type": "info"
            },
            {
              "text": "25.4 mm = 1 polegada exatamente — o valor de referência chave",
              "type": "info"
            }
          ]
        },
        "wrenchSizes": {
          "title": "Equivalências de Tamanhos de Chaves",
          "items": [
            {
              "text": "8 mm ≈ 5/16\" (0.3125\") — parafuso pequeno",
              "type": "info"
            },
            {
              "text": "10 mm ≈ 3/8\" (0.375\") — muito comum automotivo",
              "type": "info"
            },
            {
              "text": "13 mm ≈ 1/2\" (0.5\") — tamanho padrão de parafuso",
              "type": "info"
            },
            {
              "text": "17 mm ≈ 11/16\" (0.6875\") — porcas de roda, parafusos maiores",
              "type": "info"
            },
            {
              "text": "19 mm ≈ 3/4\" (0.75\") — tamanho comum de porca de roda",
              "type": "info"
            },
            {
              "text": "22 mm ≈ 7/8\" (0.875\") — parafusos industriais grandes",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de MM para Polegadas",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Converter chave de 10mm para polegadas",
              "steps": [
                "10 ÷ 25.4 = 0.3937 polegadas",
                "Fração mais próxima: 0.3937 × 16 = 6.3",
                "Arredondar para 6/16 = 3/8\" (0.375\")",
                "Diferença: 0.3937 - 0.375 = 0.019\"",
                "Chave 3/8\" serve ~parafusos 10mm"
              ],
              "result": "10 mm = 0.394\" ≈ 3/8\" (próximo mas não exato)"
            },
            {
              "title": "Altura de camada impressão 3D: 0.2mm",
              "steps": [
                "0.2 ÷ 25.4 = 0.00787 polegadas",
                "Em mils: 0.2 × 39.37 = 7.87 mils",
                "Isso é ~8 milésimos",
                "Faixa comum: 0.1-0.3 mm (4-12 milésimos)"
              ],
              "result": "0.2 mm = 0.008\" = 7.87 mils"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantas polegadas equivalem a 1 mm?",
          "answer": "1 milímetro equivale a 0.03937 polegadas, ou aproximadamente 1/25 de polegada. Para converter mm para polegadas, divida por 25.4. Para converter polegadas para mm, multiplique por 25.4."
        },
        {
          "question": "Como converter mm para polegadas fracionárias?",
          "answer": "Divida mm por 25.4 para obter polegadas decimais. Então multiplique pelo denominador desejado (16 para dezesseis avos, 32 para trinta e dois avos, 64 para sessenta e quatro avos) e arredonde. Exemplo: 10 mm = 0.3937\" × 32 = 12.6/32 ≈ 13/32\"."
        },
        {
          "question": "Quanto é 25.4 mm em polegadas?",
          "answer": "25.4 mm equivale exatamente a 1 polegada. Esta é a definição exata — 1 polegada = 25.4 mm foi estabelecida por acordo internacional em 1959."
        },
        {
          "question": "Uma chave de 10mm é igual a 3/8 polegada?",
          "answer": "Muito próximo mas não exato. 10mm = 0.3937\" enquanto 3/8\" = 0.375\" — uma diferença de 0.019\" (0.47 mm). Uma chave 3/8\" geralmente pode encaixar um parafuso 10mm, mas pode ficar ligeiramente folgada. Para trabalho de precisão, use a ferramenta métrica ou imperial correta."
        },
        {
          "question": "O que é mil ou milésimo?",
          "answer": "Um mil (também chamado milésimo) é 1/1000 de polegada = 0.0254 mm. É usado na manufatura para materiais finos como chapas metálicas, bitola de fio, espessura de tinta e trilhas de PCB. 1 mm = 39.37 mils."
        },
        {
          "question": "Como medir mm sem régua métrica?",
          "answer": "Se você só tem uma régua imperial: 1/16\" ≈ 1.6 mm, 1/8\" ≈ 3.2 mm, 1/4\" ≈ 6.4 mm, 1/2\" ≈ 12.7 mm, 1\" = 25.4 mm. Para trabalho preciso, use um paquímetro digital que exiba mm e polegadas."
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
      "name": "Convertisseur MM vers Pouces",
      "slug": "calculateur-mm-vers-pouces",
      "subtitle": "Convertissez les millimètres en pouces instantanément — essentiel pour l'ingénierie, la fabrication et le travail de précision.",
      "breadcrumb": "MM vers Pouces",
      "seo": {
        "title": "Convertisseur MM vers Pouces - Outil Gratuit Millimètre vers Pouce",
        "description": "Convertissez les millimètres en pouces instantanément. Essentiel pour l'ingénierie, la fabrication, l'impression 3D et les mesures de précision. Inclut tableau de fractions et tailles communes.",
        "shortDescription": "Convertissez les millimètres en pouces instantanément.",
        "keywords": [
          "mm vers pouces",
          "millimètres vers pouces",
          "convertisseur mm vers pouces",
          "convertir mm en pouces",
          "tableau mm vers pouces",
          "convertisseur mm gratuit",
          "mm vers pouces fraction"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Mesure",
          "helpText": "Entrez la valeur et sélectionnez l'unité"
        }
      },
      "results": {
        "inches": {
          "label": "Pouces (décimal)"
        },
        "fraction": {
          "label": "Pouces (fraction)"
        },
        "centimeters": {
          "label": "Centimètres"
        },
        "mils": {
          "label": "Mils (thou)"
        }
      },
      "presets": {
        "bolt10mm": {
          "label": "10 mm",
          "description": "Taille commune boulon/vis"
        },
        "screen6mm": {
          "label": "6,1 mm",
          "description": "Épaisseur smartphone"
        },
        "pipe25mm": {
          "label": "25,4 mm",
          "description": "Exactement 1 pouce"
        }
      },
      "values": {
        "in": "po",
        "cm": "cm",
        "mm": "mm",
        "mil": "mil"
      },
      "formats": {
        "summary": "{mm} mm = {inches} pouces"
      },
      "infoCards": {
        "results": {
          "title": "📏 Résultats de Conversion",
          "items": [
            {
              "label": "Pouces (décimal)",
              "valueKey": "inches"
            },
            {
              "label": "Pouces (fraction)",
              "valueKey": "fraction"
            },
            {
              "label": "Centimètres",
              "valueKey": "centimeters"
            },
            {
              "label": "Mils (millièmes)",
              "valueKey": "mils"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Tailles Communes",
          "items": [
            {
              "label": "1 mm",
              "valueKey": "ref1"
            },
            {
              "label": "5 mm",
              "valueKey": "ref5"
            },
            {
              "label": "10 mm",
              "valueKey": "ref10"
            },
            {
              "label": "25,4 mm (1 po)",
              "valueKey": "ref25"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils de Précision",
          "items": [
            "1 pouce = exactement 25,4 mm — divisez mm par 25,4 pour obtenir les pouces.",
            "Estimation rapide : divisez mm par 25 pour une valeur approximative en pouces.",
            "Tailles de clés communes : 10mm ≈ 3/8\", 13mm ≈ 1/2\", 19mm ≈ 3/4\".",
            "1 mil (thou) = 0,001 pouces = 0,0254 mm — utilisé en fabrication."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir MM en Pouces",
          "content": "Pour convertir les millimètres en pouces, divisez par 25,4. Un pouce équivaut exactement à 25,4 millimètres par définition internationale (depuis 1959). Donc 1 mm = 0,03937 pouces, ou approximativement 1/25 de pouce. Cette conversion est essentielle en ingénierie, fabrication, impression 3D, usinage CNC, et tout domaine où les spécifications métriques et impériales se croisent. De nombreux boulons, vis et quincaillerie existent en tailles métriques (mm) et impériales (pouces)."
        },
        "howItWorks": {
          "title": "La Formule MM vers Pouces",
          "content": "La formule est : pouces = millimètres ÷ 25,4. Pour les pouces fractionnaires (courants dans la construction et quincaillerie américaines), trouvez la fraction la plus proche : divisez les pouces décimaux par l'incrément de fraction (1/16, 1/32, ou 1/64) et arrondissez. Par exemple, 10 mm = 0,3937\" ≈ 25/64\" (0,3906\") ou approximativement 3/8\" (0,375\"). Le 'mil' ou 'thou' (millième de pouce) est utile pour les matériaux fins : 1 mm = 39,37 mils."
        },
        "considerations": {
          "title": "Conversions Communes MM vers Pouces",
          "items": [
            {
              "text": "1 mm = 0,03937 po = ~1/25\" — environ l'épaisseur d'une carte de crédit",
              "type": "info"
            },
            {
              "text": "3,175 mm = 1/8 pouce exactement",
              "type": "info"
            },
            {
              "text": "6,35 mm = 1/4 pouce exactement",
              "type": "info"
            },
            {
              "text": "12,7 mm = 1/2 pouce exactement",
              "type": "info"
            },
            {
              "text": "19,05 mm = 3/4 pouce exactement",
              "type": "info"
            },
            {
              "text": "25,4 mm = 1 pouce exactement — la valeur de référence clé",
              "type": "info"
            }
          ]
        },
        "wrenchSizes": {
          "title": "Équivalences Tailles de Clés et Douilles",
          "items": [
            {
              "text": "8 mm ≈ 5/16\" (0,3125\") — petit boulon",
              "type": "info"
            },
            {
              "text": "10 mm ≈ 3/8\" (0,375\") — très courant en automobile",
              "type": "info"
            },
            {
              "text": "13 mm ≈ 1/2\" (0,5\") — taille standard de boulon",
              "type": "info"
            },
            {
              "text": "17 mm ≈ 11/16\" (0,6875\") — écrous de roue, gros boulons",
              "type": "info"
            },
            {
              "text": "19 mm ≈ 3/4\" (0,75\") — taille courante d'écrou de roue",
              "type": "info"
            },
            {
              "text": "22 mm ≈ 7/8\" (0,875\") — gros boulons industriels",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples MM vers Pouces",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Convertir clé 10mm en pouces",
              "steps": [
                "10 ÷ 25,4 = 0,3937 pouces",
                "Fraction la plus proche : 0,3937 × 16 = 6,3",
                "Arrondir à 6/16 = 3/8\" (0,375\")",
                "Différence : 0,3937 - 0,375 = 0,019\"",
                "Clé 3/8\" convient aux boulons ~10mm"
              ],
              "result": "10 mm = 0,394\" ≈ 3/8\" (proche mais pas exact)"
            },
            {
              "title": "Hauteur couche impression 3D : 0,2mm",
              "steps": [
                "0,2 ÷ 25,4 = 0,00787 pouces",
                "En mils : 0,2 × 39,37 = 7,87 mils",
                "Ceci fait ~8 thou (millièmes)",
                "Plage courante : 0,1-0,3 mm (4-12 thou)"
              ],
              "result": "0,2 mm = 0,008\" = 7,87 mils"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de pouces font 1 mm ?",
          "answer": "1 millimètre équivaut à 0,03937 pouces, ou approximativement 1/25 de pouce. Pour convertir mm en pouces, divisez par 25,4. Pour convertir pouces en mm, multipliez par 25,4."
        },
        {
          "question": "Comment convertir mm en pouces fractionnaires ?",
          "answer": "Divisez mm par 25,4 pour obtenir les pouces décimaux. Puis multipliez par le dénominateur voulu (16 pour les 16èmes, 32 pour les 32èmes, 64 pour les 64èmes) et arrondissez. Exemple : 10 mm = 0,3937\" × 32 = 12,6/32 ≈ 13/32\"."
        },
        {
          "question": "Combien font 25,4 mm en pouces ?",
          "answer": "25,4 mm équivalent exactement à 1 pouce. C'est la définition exacte — 1 pouce = 25,4 mm fut établi par accord international en 1959."
        },
        {
          "question": "Une clé 10mm est-elle identique à 3/8 pouce ?",
          "answer": "Très proche mais pas exacte. 10mm = 0,3937\" tandis que 3/8\" = 0,375\" — une différence de 0,019\" (0,47 mm). Une clé 3/8\" peut généralement s'adapter à un boulon 10mm, mais elle peut être légèrement lâche. Pour un travail de précision, utilisez l'outil métrique ou impérial correct."
        },
        {
          "question": "Qu'est-ce qu'un mil ou thou ?",
          "answer": "Un mil (aussi appelé thou) est 1/1000 de pouce = 0,0254 mm. Il est utilisé en fabrication pour les matériaux fins comme la tôle, le calibre de fil, l'épaisseur de peinture, et les traces de PCB. 1 mm = 39,37 mils."
        },
        {
          "question": "Comment mesurer en mm sans règle métrique ?",
          "answer": "Si vous n'avez qu'une règle impériale : 1/16\" ≈ 1,6 mm, 1/8\" ≈ 3,2 mm, 1/4\" ≈ 6,4 mm, 1/2\" ≈ 12,7 mm, 1\" = 25,4 mm. Pour un travail précis, utilisez un pied à coulisse numérique qui affiche mm et pouces."
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
      "name": "MM zu Zoll Umrechner",
      "slug": "millimeter-zu-zoll-rechner",
      "subtitle": "Millimeter zu Zoll sofort umrechnen — unverzichtbar für Ingenieurswesen, Fertigung und Präzisionsarbeit.",
      "breadcrumb": "MM zu Zoll",
      "seo": {
        "title": "MM zu Zoll Umrechner - Kostenloses Millimeter zu Zoll Tool",
        "description": "Millimeter zu Zoll sofort umrechnen. Unverzichtbar für Ingenieurswesen, Fertigung, 3D-Druck und Präzisionsmessungen. Inkl. Bruch-Tabelle und gängige Größen.",
        "shortDescription": "Millimeter zu Zoll sofort umrechnen.",
        "keywords": [
          "mm zu zoll",
          "millimeter zu zoll",
          "mm zu zoll umrechner",
          "mm in zoll umrechnen",
          "mm zu zoll tabelle",
          "kostenloser mm umrechner",
          "mm zu bruch zoll"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Messung",
          "helpText": "Wert eingeben und Einheit auswählen"
        }
      },
      "results": {
        "inches": {
          "label": "Zoll (dezimal)"
        },
        "fraction": {
          "label": "Zoll (Bruch)"
        },
        "centimeters": {
          "label": "Zentimeter"
        },
        "mils": {
          "label": "Mils (Tausendstel)"
        }
      },
      "presets": {
        "bolt10mm": {
          "label": "10 mm",
          "description": "Gängige Schraubengröße"
        },
        "screen6mm": {
          "label": "6,1 mm",
          "description": "Smartphone-Dicke"
        },
        "pipe25mm": {
          "label": "25,4 mm",
          "description": "Genau 1 Zoll"
        }
      },
      "values": {
        "in": "Zoll",
        "cm": "cm",
        "mm": "mm",
        "mil": "mil"
      },
      "formats": {
        "summary": "{mm} mm = {inches} Zoll"
      },
      "infoCards": {
        "results": {
          "title": "📏 Umrechnungsergebnisse",
          "items": [
            {
              "label": "Zoll (dezimal)",
              "valueKey": "inches"
            },
            {
              "label": "Zoll (Bruch)",
              "valueKey": "fraction"
            },
            {
              "label": "Zentimeter",
              "valueKey": "centimeters"
            },
            {
              "label": "Mils (Tausendstel)",
              "valueKey": "mils"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Gängige Größen",
          "items": [
            {
              "label": "1 mm",
              "valueKey": "ref1"
            },
            {
              "label": "5 mm",
              "valueKey": "ref5"
            },
            {
              "label": "10 mm",
              "valueKey": "ref10"
            },
            {
              "label": "25,4 mm (1 Zoll)",
              "valueKey": "ref25"
            }
          ]
        },
        "tips": {
          "title": "💡 Präzisions-Tipps",
          "items": [
            "1 Zoll = genau 25,4 mm — teile mm durch 25,4 um Zoll zu erhalten.",
            "Schnelle Schätzung: teile mm durch 25 für einen groben Zoll-Wert.",
            "Gängige Schlüsselgrößen: 10mm ≈ 3/8\", 13mm ≈ 1/2\", 19mm ≈ 3/4\".",
            "1 mil (Tausendstel) = 0,001 Zoll = 0,0254 mm — wird in der Fertigung verwendet."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie man MM zu Zoll umrechnet",
          "content": "Um Millimeter in Zoll umzurechnen, teile durch 25,4. Ein Zoll entspricht genau 25,4 Millimetern nach internationaler Definition (seit 1959). Also 1 mm = 0,03937 Zoll, oder etwa 1/25 Zoll. Diese Umrechnung ist unverzichtbar in Ingenieurswesen, Fertigung, 3D-Druck, CNC-Bearbeitung und jedem Bereich, wo metrische und imperiale Spezifikationen aufeinandertreffen. Viele Schrauben, Bolzen und Hardware gibt es sowohl in metrischen (mm) als auch imperialen (Zoll) Größen."
        },
        "howItWorks": {
          "title": "Die MM zu Zoll Formel",
          "content": "Die Formel lautet: Zoll = Millimeter ÷ 25,4. Für Bruch-Zoll (üblich im US-Bauwesen und Hardware), finde den nächstliegenden Bruch: teile die dezimalen Zoll durch die Bruch-Schritte (1/16, 1/32, oder 1/64) und runde. Zum Beispiel: 10 mm = 0,3937\" ≈ 25/64\" (0,3906\") oder etwa 3/8\" (0,375\"). Das 'mil' oder 'thou' (Tausendstel Zoll) ist nützlich für dünne Materialien: 1 mm = 39,37 mils."
        },
        "considerations": {
          "title": "Gängige MM zu Zoll Umrechnungen",
          "items": [
            {
              "text": "1 mm = 0,03937 Zoll = ~1/25\" — etwa die Dicke einer Kreditkarte",
              "type": "info"
            },
            {
              "text": "3,175 mm = 1/8 Zoll genau",
              "type": "info"
            },
            {
              "text": "6,35 mm = 1/4 Zoll genau",
              "type": "info"
            },
            {
              "text": "12,7 mm = 1/2 Zoll genau",
              "type": "info"
            },
            {
              "text": "19,05 mm = 3/4 Zoll genau",
              "type": "info"
            },
            {
              "text": "25,4 mm = 1 Zoll genau — der Schlüssel-Referenzwert",
              "type": "info"
            }
          ]
        },
        "wrenchSizes": {
          "title": "Schlüssel- & Steckschlüssel-Größen Entsprechungen",
          "items": [
            {
              "text": "8 mm ≈ 5/16\" (0,3125\") — kleine Schraube",
              "type": "info"
            },
            {
              "text": "10 mm ≈ 3/8\" (0,375\") — sehr gängig in der Automobilindustrie",
              "type": "info"
            },
            {
              "text": "13 mm ≈ 1/2\" (0,5\") — Standard-Schraubengröße",
              "type": "info"
            },
            {
              "text": "17 mm ≈ 11/16\" (0,6875\") — Radmuttern, größere Schrauben",
              "type": "info"
            },
            {
              "text": "19 mm ≈ 3/4\" (0,75\") — gängige Radmutter-Größe",
              "type": "info"
            },
            {
              "text": "22 mm ≈ 7/8\" (0,875\") — große Industrieschrauben",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "MM zu Zoll Beispiele",
          "description": "Schritt-für-Schritt Umrechnungen",
          "examples": [
            {
              "title": "10mm Schlüssel zu Zoll umrechnen",
              "steps": [
                "10 ÷ 25,4 = 0,3937 Zoll",
                "Nächster Bruch: 0,3937 × 16 = 6,3",
                "Runde auf 6/16 = 3/8\" (0,375\")",
                "Unterschied: 0,3937 - 0,375 = 0,019\"",
                "3/8\" Schlüssel passt auf ~10mm Schrauben"
              ],
              "result": "10 mm = 0,394\" ≈ 3/8\" (nah aber nicht exakt)"
            },
            {
              "title": "3D-Druck Schichthöhe: 0,2mm",
              "steps": [
                "0,2 ÷ 25,4 = 0,00787 Zoll",
                "In Mils: 0,2 × 39,37 = 7,87 Mils",
                "Das sind ~8 Tausendstel",
                "Gängiger Bereich: 0,1-0,3 mm (4-12 Tausendstel)"
              ],
              "result": "0,2 mm = 0,008\" = 7,87 Mils"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Zoll sind 1 mm?",
          "answer": "1 Millimeter entspricht 0,03937 Zoll, oder etwa 1/25 Zoll. Um mm in Zoll umzurechnen, teile durch 25,4. Um Zoll in mm umzurechnen, multipliziere mit 25,4."
        },
        {
          "question": "Wie rechne ich mm in Bruch-Zoll um?",
          "answer": "Teile mm durch 25,4 um dezimale Zoll zu erhalten. Dann multipliziere mit dem gewünschten Nenner (16 für Sechzehntel, 32 für Zweiunddreißigstel, 64 für Vierundsechzigstel) und runde. Beispiel: 10 mm = 0,3937\" × 32 = 12,6/32 ≈ 13/32\"."
        },
        {
          "question": "Was sind 25,4 mm in Zoll?",
          "answer": "25,4 mm entspricht genau 1 Zoll. Das ist die exakte Definition — 1 Zoll = 25,4 mm wurde durch internationale Vereinbarung 1959 festgelegt."
        },
        {
          "question": "Ist ein 10mm Schlüssel dasselbe wie 3/8 Zoll?",
          "answer": "Sehr nah aber nicht exakt. 10mm = 0,3937\" während 3/8\" = 0,375\" — ein Unterschied von 0,019\" (0,47 mm). Ein 3/8\" Schlüssel kann normalerweise auf eine 10mm Schraube passen, aber er könnte etwas locker sein. Für Präzisionsarbeit verwende das korrekte metrische oder imperiale Werkzeug."
        },
        {
          "question": "Was ist ein Mil oder Thou?",
          "answer": "Ein Mil (auch Thou genannt) ist 1/1000 Zoll = 0,0254 mm. Es wird in der Fertigung für dünne Materialien wie Blech, Drahtdicke, Lackdicke und Leiterplatten-Leiterbahnen verwendet. 1 mm = 39,37 Mils."
        },
        {
          "question": "Wie messe ich mm ohne metrisches Lineal?",
          "answer": "Wenn du nur ein imperiales Lineal hast: 1/16\" ≈ 1,6 mm, 1/8\" ≈ 3,2 mm, 1/4\" ≈ 6,4 mm, 1/2\" ≈ 12,7 mm, 1\" = 25,4 mm. Für präzise Arbeit verwende einen digitalen Messschieber, der sowohl mm als auch Zoll anzeigt."
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
      placeholder: "10",
      min: 0,
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "mm",
    },
  ],

  inputGroups: [],

  results: [
    { id: "inches", type: "primary", format: "text" },
    { id: "fraction", type: "secondary", format: "text" },
    { id: "centimeters", type: "secondary", format: "text" },
    { id: "mils", type: "secondary", format: "text" },
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
    { id: "wrenchSizes", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Specifications for Length", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "ISO", year: "2023", title: "ISO 80000-3 — Quantities and Units: Space and Time", source: "ISO", url: "https://www.iso.org/standard/64974.html" },
  ],

  hero: { badge: "Conversion", title: "MM to Inches" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["inches-to-mm", "cm-to-inches", "length-converter"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) >= 1e6) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (Math.abs(val) < 0.001) return val.toExponential(3);
  if (Math.abs(val) < 0.01) return val.toFixed(4);
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

function toFraction(decimal: number): string {
  const denominators = [2, 4, 8, 16, 32, 64];
  let bestNum = 0, bestDen = 1, bestErr = decimal;
  for (const den of denominators) {
    const num = Math.round(decimal * den);
    const err = Math.abs(decimal - num / den);
    if (err < bestErr) { bestNum = num; bestDen = den; bestErr = err; }
  }
  if (bestNum === 0) return "0";
  // Simplify
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const d = gcd(bestNum, bestDen);
  const sNum = bestNum / d;
  const sDen = bestDen / d;
  if (sDen === 1) return `${sNum}`;
  const whole = Math.floor(sNum / sDen);
  const rem = sNum % sDen;
  if (whole > 0 && rem > 0) return `${whole} ${rem}/${sDen * d / bestDen}"`;
  return `${sNum}/${sDen}`;
}

export function calculateMmToInches(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "mm";
  const mm = convertToBase(amount, fromUnit, "length_small");

  const inches = mm / 25.4;
  const cm = mm / 10;
  const mils = inches * 1000;
  const fractionStr = toFraction(inches) + "\"";

  const ref1 = 1 / 25.4;
  const ref5 = 5 / 25.4;
  const ref10 = 10 / 25.4;
  const ref25 = 25.4 / 25.4;

  return {
    values: { inches, fraction: inches, centimeters: cm, mils },
    formatted: {
      inches: `${fmtNum(inches)} in`,
      fraction: `≈ ${fractionStr}`,
      centimeters: `${fmtNum(cm)} cm`,
      mils: `${fmtNum(mils)} mil`,
      ref1: `${fmtNum(ref1)} in`,
      ref5: `${fmtNum(ref5)} in`,
      ref10: `${fmtNum(ref10)} in`,
      ref25: `1 in (exact)`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(inches)} inches ≈ ${fractionStr}`,
    isValid: true,
  };
}

export default mmToInchesConverterConfig;
