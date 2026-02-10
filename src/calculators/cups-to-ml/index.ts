import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const cupsToMlConverterConfig: CalculatorConfigV4 = {
  id: "cups-to-ml",
  version: "4.0",
  category: "conversion",
  icon: "🥛",

  presets: [
    { id: "halfCup", icon: "🥄", values: { amount: 0.5 } },
    { id: "oneCup", icon: "🥛", values: { amount: 1 } },
    { id: "twoCups", icon: "🫗", values: { amount: 2 } },
  ],

  t: {
    en: {
      name: "Cups to mL Converter",
      slug: "cups-to-ml",
      subtitle: "Convert cups to milliliters for cooking and baking. Includes tablespoons, teaspoons, and fluid ounces.",
      breadcrumb: "Cups to mL",

      seo: {
        title: "Cups to mL Converter - Free Cooking Measurement Tool",
        description: "Convert cups to milliliters instantly for cooking and baking. Includes US cups, metric cups, tablespoons, teaspoons, and fluid ounces.",
        shortDescription: "Convert cups to mL for recipes.",
        keywords: ["cups to ml", "cups to milliliters", "cooking converter", "baking measurements", "recipe converter", "US cups metric", "tablespoon ml", "teaspoon ml"],
      },

      calculator: { yourInformation: "Enter Volume" },
      ui: { yourInformation: "Enter Volume", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Volume", helpText: "Enter the volume to convert" },
      },

      results: {
        milliliters: { label: "Milliliters" },
        liters: { label: "Liters" },
        flOz: { label: "Fluid Ounces" },
      },

      presets: {
        halfCup: { label: "Half Cup", description: "½ cup (~118 mL)" },
        oneCup: { label: "One Cup", description: "1 cup (~237 mL)" },
        twoCups: { label: "Two Cups", description: "2 cups (~473 mL)" },
      },

      values: { "mL": "mL", "L": "L", "fl oz": "fl oz", "cups": "cups", "tbsp": "tbsp", "tsp": "tsp" },

      formats: { summary: "{value} cups = {ml} mL" },

      infoCards: {
        results: {
          title: "Conversion Results",
          items: [
            { label: "Milliliters", valueKey: "milliliters" },
            { label: "Liters", valueKey: "liters" },
            { label: "Fluid Ounces", valueKey: "flOz" },
            { label: "Tablespoons", valueKey: "tablespoons" },
          ],
        },
        reference: {
          title: "Quick Reference",
          items: [
            { label: "1 Cup (US)", valueKey: "ref1cup" },
            { label: "½ Cup", valueKey: "refHalfCup" },
            { label: "¼ Cup", valueKey: "refQuarterCup" },
            { label: "1 Tablespoon", valueKey: "ref1tbsp" },
          ],
        },
        tips: {
          title: "Cooking Tips",
          items: [
            "US cup = 237 mL, Metric cup = 250 mL",
            "1 cup = 16 tablespoons = 48 teaspoons",
            "1 tablespoon = 15 mL, 1 teaspoon = 5 mL",
            "For dry ingredients, use weight (grams) for accuracy",
          ],
        },
      },

      education: {
        whatIs: {
          title: "Understanding Cups and Milliliters",
          content: "Cups and milliliters are both units of volume commonly used in cooking. The cup is primarily used in the United States and varies slightly from metric cups used elsewhere. A US cup equals approximately 237 mL, while a metric cup equals 250 mL. Understanding these conversions is essential for following international recipes accurately.",
        },
        howItWorks: {
          title: "How the Conversion Works",
          content: "To convert US cups to milliliters, multiply by 236.588. For metric cups, multiply by 250. The difference exists because US measurements evolved separately from the metric system. This converter handles both systems and includes common cooking measurements like tablespoons and teaspoons.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "US cup = 236.588 mL (commonly rounded to 237 mL)", type: "info" },
            { text: "Metric cup (Australia, NZ) = 250 mL exactly", type: "info" },
            { text: "UK recipes may use Imperial cups (284 mL) - now rare", type: "warning" },
            { text: "Japanese cup = 200 mL (used in rice cookers)", type: "info" },
            { text: "For baking, weight measurements are more accurate", type: "warning" },
            { text: "Liquid and dry cup measurements differ slightly", type: "info" },
          ],
        },
        commonMeasures: {
          title: "Common Cooking Measurements",
          items: [
            { text: "1 cup = 237 mL = 16 tablespoons = 8 fl oz", type: "info" },
            { text: "½ cup = 118 mL = 8 tablespoons = 4 fl oz", type: "info" },
            { text: "¼ cup = 59 mL = 4 tablespoons = 2 fl oz", type: "info" },
            { text: "1 tablespoon = 15 mL = 3 teaspoons", type: "info" },
            { text: "1 teaspoon = 5 mL", type: "info" },
            { text: "1 fluid ounce = 29.57 mL = 2 tablespoons", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Recipe scenarios",
          examples: [
            {
              title: "Baking Recipe",
              steps: ["Recipe calls for 1½ cups of flour", "Convert: 1.5 × 237 = 355.5 mL", "Or use 350 mL for easy measuring"],
              result: "1½ cups = 355 mL",
            },
            {
              title: "Liquid Ingredients",
              steps: ["Need ¾ cup of milk", "Convert: 0.75 × 237 = 177.75 mL", "Round to 175 or 180 mL"],
              result: "¾ cup = 178 mL",
            },
          ],
        },
      },

      faqs: [
        { question: "How many mL in a cup?", answer: "A US cup contains approximately 237 mL (236.588 mL exactly). A metric cup used in Australia and New Zealand contains exactly 250 mL. Always check which cup measurement your recipe uses." },
        { question: "What's the difference between US and metric cups?", answer: "A US cup is 236.588 mL while a metric cup is 250 mL—a difference of about 5.5%. For most recipes this small difference won't matter, but for precise baking it can affect results." },
        { question: "How do I convert tablespoons to mL?", answer: "1 US tablespoon = 14.79 mL (usually rounded to 15 mL). So 2 tablespoons = 30 mL, and 1 cup = 16 tablespoons = 237 mL." },
        { question: "Why do recipes use cups instead of mL?", answer: "Cups are traditional in American cooking and are convenient for home cooks without scales. Professional bakers prefer weight measurements (grams) for accuracy, as volume can vary based on how ingredients are packed." },
        { question: "How many teaspoons in a tablespoon?", answer: "There are 3 teaspoons in 1 tablespoon. 1 teaspoon = 5 mL, so 1 tablespoon = 15 mL. This is consistent across US and metric measurements." },
        { question: "Should I use a liquid or dry measuring cup?", answer: "Use liquid measuring cups (with pour spout) for liquids and dry measuring cups (flat top) for dry ingredients. Liquid cups allow you to fill to the line without spilling, while dry cups let you level off ingredients." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de Tazas a mL",
      "slug": "calculadora-tazas-mililitros",
      "subtitle": "Convierte tazas a mililitros para cocinar y hornear. Incluye cucharadas, cucharaditas y onzas líquidas.",
      "breadcrumb": "Tazas a mL",
      "seo": {
        "title": "Convertidor de Tazas a mL - Herramienta Gratuita de Medidas de Cocina",
        "description": "Convierte tazas a mililitros instantáneamente para cocinar y hornear. Incluye tazas estadounidenses, tazas métricas, cucharadas, cucharaditas y onzas líquidas.",
        "shortDescription": "Convierte tazas a mL para recetas.",
        "keywords": [
          "tazas a ml",
          "tazas a mililitros",
          "conversor cocina",
          "medidas hornear",
          "conversor recetas",
          "tazas US métricas",
          "cucharada ml",
          "cucharadita ml"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Volumen",
          "helpText": "Ingresa el volumen a convertir"
        }
      },
      "results": {
        "milliliters": {
          "label": "Mililitros"
        },
        "liters": {
          "label": "Litros"
        },
        "flOz": {
          "label": "Onzas Líquidas"
        }
      },
      "presets": {
        "halfCup": {
          "label": "Media Taza",
          "description": "½ taza (~118 mL)"
        },
        "oneCup": {
          "label": "Una Taza",
          "description": "1 taza (~237 mL)"
        },
        "twoCups": {
          "label": "Dos Tazas",
          "description": "2 tazas (~473 mL)"
        }
      },
      "values": {
        "mL": "mL",
        "L": "L",
        "fl oz": "oz líq",
        "cups": "tazas",
        "tbsp": "cdas",
        "tsp": "cdtas"
      },
      "formats": {
        "summary": "{value} tazas = {ml} mL"
      },
      "infoCards": {
        "results": {
          "title": "Resultados de Conversión",
          "items": [
            {
              "label": "Mililitros",
              "valueKey": "milliliters"
            },
            {
              "label": "Litros",
              "valueKey": "liters"
            },
            {
              "label": "Onzas Líquidas",
              "valueKey": "flOz"
            },
            {
              "label": "Cucharadas",
              "valueKey": "tablespoons"
            }
          ]
        },
        "reference": {
          "title": "Referencia Rápida",
          "items": [
            {
              "label": "1 Taza (US)",
              "valueKey": "ref1cup"
            },
            {
              "label": "½ Taza",
              "valueKey": "refHalfCup"
            },
            {
              "label": "¼ Taza",
              "valueKey": "refQuarterCup"
            },
            {
              "label": "1 Cucharada",
              "valueKey": "ref1tbsp"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Cocina",
          "items": [
            "Taza US = 237 mL, Taza métrica = 250 mL",
            "1 taza = 16 cucharadas = 48 cucharaditas",
            "1 cucharada = 15 mL, 1 cucharadita = 5 mL",
            "Para ingredientes secos, usa peso (gramos) para mayor precisión"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Entendiendo Tazas y Mililitros",
          "content": "Las tazas y mililitros son ambas unidades de volumen comúnmente usadas en cocina. La taza se usa principalmente en Estados Unidos y varía ligeramente de las tazas métricas usadas en otros lugares. Una taza US equivale aproximadamente a 237 mL, mientras que una taza métrica equivale a 250 mL. Entender estas conversiones es esencial para seguir recetas internacionales con precisión."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Conversión",
          "content": "Para convertir tazas US a mililitros, multiplica por 236.588. Para tazas métricas, multiplica por 250. La diferencia existe porque las medidas US evolucionaron separadamente del sistema métrico. Este conversor maneja ambos sistemas e incluye medidas comunes de cocina como cucharadas y cucharaditas."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "Taza US = 236.588 mL (comúnmente redondeado a 237 mL)",
              "type": "info"
            },
            {
              "text": "Taza métrica (Australia, NZ) = 250 mL exactamente",
              "type": "info"
            },
            {
              "text": "Recetas británicas pueden usar tazas imperiales (284 mL) - ahora raro",
              "type": "warning"
            },
            {
              "text": "Taza japonesa = 200 mL (usada en arroceras)",
              "type": "info"
            },
            {
              "text": "Para hornear, las medidas de peso son más precisas",
              "type": "warning"
            },
            {
              "text": "Las medidas de taza para líquidos y secos difieren ligeramente",
              "type": "info"
            }
          ]
        },
        "commonMeasures": {
          "title": "Medidas Comunes de Cocina",
          "items": [
            {
              "text": "1 taza = 237 mL = 16 cucharadas = 8 oz líq",
              "type": "info"
            },
            {
              "text": "½ taza = 118 mL = 8 cucharadas = 4 oz líq",
              "type": "info"
            },
            {
              "text": "¼ taza = 59 mL = 4 cucharadas = 2 oz líq",
              "type": "info"
            },
            {
              "text": "1 cucharada = 15 mL = 3 cucharaditas",
              "type": "info"
            },
            {
              "text": "1 cucharadita = 5 mL",
              "type": "info"
            },
            {
              "text": "1 onza líquida = 29.57 mL = 2 cucharadas",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Conversión",
          "description": "Escenarios de recetas",
          "examples": [
            {
              "title": "Receta de Repostería",
              "steps": [
                "La receta pide 1½ tazas de harina",
                "Convertir: 1.5 × 237 = 355.5 mL",
                "O usa 350 mL para medición fácil"
              ],
              "result": "1½ tazas = 355 mL"
            },
            {
              "title": "Ingredientes Líquidos",
              "steps": [
                "Necesitas ¾ taza de leche",
                "Convertir: 0.75 × 237 = 177.75 mL",
                "Redondea a 175 o 180 mL"
              ],
              "result": "¾ taza = 178 mL"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos mL hay en una taza?",
          "answer": "Una taza US contiene aproximadamente 237 mL (236.588 mL exactamente). Una taza métrica usada en Australia y Nueva Zelanda contiene exactamente 250 mL. Siempre verifica qué medida de taza usa tu receta."
        },
        {
          "question": "¿Cuál es la diferencia entre tazas US y métricas?",
          "answer": "Una taza US es 236.588 mL mientras que una taza métrica es 250 mL—una diferencia de aproximadamente 5.5%. Para la mayoría de recetas esta pequeña diferencia no importará, pero para repostería precisa puede afectar los resultados."
        },
        {
          "question": "¿Cómo convierto cucharadas a mL?",
          "answer": "1 cucharada US = 14.79 mL (usualmente redondeado a 15 mL). Entonces 2 cucharadas = 30 mL, y 1 taza = 16 cucharadas = 237 mL."
        },
        {
          "question": "¿Por qué las recetas usan tazas en lugar de mL?",
          "answer": "Las tazas son tradicionales en la cocina americana y son convenientes para cocineros caseros sin básculas. Los panaderos profesionales prefieren medidas de peso (gramos) para precisión, ya que el volumen puede variar según cómo se compacten los ingredientes."
        },
        {
          "question": "¿Cuántas cucharaditas hay en una cucharada?",
          "answer": "Hay 3 cucharaditas en 1 cucharada. 1 cucharadita = 5 mL, entonces 1 cucharada = 15 mL. Esto es consistente entre medidas US y métricas."
        },
        {
          "question": "¿Debo usar una taza medidora para líquidos o secos?",
          "answer": "Usa tazas medidoras para líquidos (con pico vertedor) para líquidos y tazas medidoras para secos (tope plano) para ingredientes secos. Las tazas para líquidos te permiten llenar hasta la línea sin derramar, mientras que las tazas para secos te permiten nivelar los ingredientes."
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
      "name": "Conversor de Xícaras para mL",
      "slug": "calculadora-xicaras-para-ml",
      "subtitle": "Converta xícaras para mililitros para cozinhar e assar. Inclui colheres de sopa, colheres de chá e onças líquidas.",
      "breadcrumb": "Xícaras para mL",
      "seo": {
        "title": "Conversor de Xícaras para mL - Ferramenta Gratuita de Medidas Culinárias",
        "description": "Converta xícaras para mililitros instantaneamente para cozinhar e assar. Inclui xícaras americanas, xícaras métricas, colheres de sopa, colheres de chá e onças líquidas.",
        "shortDescription": "Converta xícaras para mL para receitas.",
        "keywords": [
          "xícaras para ml",
          "xícaras para mililitros",
          "conversor culinário",
          "medidas para assar",
          "conversor de receitas",
          "xícaras americanas métricas",
          "colher de sopa ml",
          "colher de chá ml"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Volume",
          "helpText": "Digite o volume para converter"
        }
      },
      "results": {
        "milliliters": {
          "label": "Mililitros"
        },
        "liters": {
          "label": "Litros"
        },
        "flOz": {
          "label": "Onças Líquidas"
        }
      },
      "presets": {
        "halfCup": {
          "label": "Meia Xícara",
          "description": "½ xícara (~118 mL)"
        },
        "oneCup": {
          "label": "Uma Xícara",
          "description": "1 xícara (~237 mL)"
        },
        "twoCups": {
          "label": "Duas Xícaras",
          "description": "2 xícaras (~473 mL)"
        }
      },
      "values": {
        "mL": "mL",
        "L": "L",
        "fl oz": "fl oz",
        "cups": "xícaras",
        "tbsp": "c. sopa",
        "tsp": "c. chá"
      },
      "formats": {
        "summary": "{value} xícaras = {ml} mL"
      },
      "infoCards": {
        "results": {
          "title": "Resultados da Conversão",
          "items": [
            {
              "label": "Mililitros",
              "valueKey": "milliliters"
            },
            {
              "label": "Litros",
              "valueKey": "liters"
            },
            {
              "label": "Onças Líquidas",
              "valueKey": "flOz"
            },
            {
              "label": "Colheres de Sopa",
              "valueKey": "tablespoons"
            }
          ]
        },
        "reference": {
          "title": "Referência Rápida",
          "items": [
            {
              "label": "1 Xícara (EUA)",
              "valueKey": "ref1cup"
            },
            {
              "label": "½ Xícara",
              "valueKey": "refHalfCup"
            },
            {
              "label": "¼ Xícara",
              "valueKey": "refQuarterCup"
            },
            {
              "label": "1 Colher de Sopa",
              "valueKey": "ref1tbsp"
            }
          ]
        },
        "tips": {
          "title": "Dicas Culinárias",
          "items": [
            "Xícara americana = 237 mL, Xícara métrica = 250 mL",
            "1 xícara = 16 colheres de sopa = 48 colheres de chá",
            "1 colher de sopa = 15 mL, 1 colher de chá = 5 mL",
            "Para ingredientes secos, use peso (gramas) para precisão"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Entendendo Xícaras e Mililitros",
          "content": "Xícaras e mililitros são ambas unidades de volume comumente usadas na cozinha. A xícara é usada principalmente nos Estados Unidos e varia ligeiramente das xícaras métricas usadas em outros lugares. Uma xícara americana equivale a aproximadamente 237 mL, enquanto uma xícara métrica equivale a 250 mL. Entender essas conversões é essencial para seguir receitas internacionais com precisão."
        },
        "howItWorks": {
          "title": "Como Funciona a Conversão",
          "content": "Para converter xícaras americanas para mililitros, multiplique por 236,588. Para xícaras métricas, multiplique por 250. A diferença existe porque as medidas americanas evoluíram separadamente do sistema métrico. Este conversor trabalha com ambos os sistemas e inclui medidas culinárias comuns como colheres de sopa e colheres de chá."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Xícara americana = 236,588 mL (comumente arredondada para 237 mL)",
              "type": "info"
            },
            {
              "text": "Xícara métrica (Austrália, NZ) = 250 mL exatamente",
              "type": "info"
            },
            {
              "text": "Receitas do Reino Unido podem usar xícaras imperiais (284 mL) - agora raras",
              "type": "warning"
            },
            {
              "text": "Xícara japonesa = 200 mL (usada em panelas de arroz)",
              "type": "info"
            },
            {
              "text": "Para panificação, medidas de peso são mais precisas",
              "type": "warning"
            },
            {
              "text": "Medidas de xícara para líquidos e secos diferem ligeiramente",
              "type": "info"
            }
          ]
        },
        "commonMeasures": {
          "title": "Medidas Culinárias Comuns",
          "items": [
            {
              "text": "1 xícara = 237 mL = 16 colheres de sopa = 8 fl oz",
              "type": "info"
            },
            {
              "text": "½ xícara = 118 mL = 8 colheres de sopa = 4 fl oz",
              "type": "info"
            },
            {
              "text": "¼ xícara = 59 mL = 4 colheres de sopa = 2 fl oz",
              "type": "info"
            },
            {
              "text": "1 colher de sopa = 15 mL = 3 colheres de chá",
              "type": "info"
            },
            {
              "text": "1 colher de chá = 5 mL",
              "type": "info"
            },
            {
              "text": "1 onça líquida = 29,57 mL = 2 colheres de sopa",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Conversão",
          "description": "Cenários de receitas",
          "examples": [
            {
              "title": "Receita de Panificação",
              "steps": [
                "Receita pede 1½ xícaras de farinha",
                "Converta: 1,5 × 237 = 355,5 mL",
                "Ou use 350 mL para medição fácil"
              ],
              "result": "1½ xícaras = 355 mL"
            },
            {
              "title": "Ingredientes Líquidos",
              "steps": [
                "Precisa de ¾ xícara de leite",
                "Converta: 0,75 × 237 = 177,75 mL",
                "Arredonde para 175 ou 180 mL"
              ],
              "result": "¾ xícara = 178 mL"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos mL tem uma xícara?",
          "answer": "Uma xícara americana contém aproximadamente 237 mL (236,588 mL exatamente). Uma xícara métrica usada na Austrália e Nova Zelândia contém exatamente 250 mL. Sempre verifique qual medida de xícara sua receita usa."
        },
        {
          "question": "Qual a diferença entre xícaras americanas e métricas?",
          "answer": "Uma xícara americana tem 236,588 mL enquanto uma xícara métrica tem 250 mL—uma diferença de cerca de 5,5%. Para a maioria das receitas essa pequena diferença não importa, mas para panificação precisa pode afetar os resultados."
        },
        {
          "question": "Como converter colheres de sopa para mL?",
          "answer": "1 colher de sopa americana = 14,79 mL (geralmente arredondada para 15 mL). Então 2 colheres de sopa = 30 mL, e 1 xícara = 16 colheres de sopa = 237 mL."
        },
        {
          "question": "Por que receitas usam xícaras em vez de mL?",
          "answer": "Xícaras são tradicionais na culinária americana e são convenientes para cozinheiros caseiros sem balança. Padeiros profissionais preferem medidas de peso (gramas) para precisão, já que o volume pode variar baseado em como os ingredientes são compactados."
        },
        {
          "question": "Quantas colheres de chá tem uma colher de sopa?",
          "answer": "Há 3 colheres de chá em 1 colher de sopa. 1 colher de chá = 5 mL, então 1 colher de sopa = 15 mL. Isso é consistente nas medidas americanas e métricas."
        },
        {
          "question": "Devo usar xícara de medida para líquidos ou secos?",
          "answer": "Use xícaras de medida para líquidos (com bico) para líquidos e xícaras para secos (topo plano) para ingredientes secos. Xícaras para líquidos permitem encher até a linha sem derramar, enquanto xícaras secas permitem nivelar os ingredientes."
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
      "name": "Convertisseur Tasses vers mL",
      "slug": "calculateur-tasses-vers-ml",
      "subtitle": "Convertissez les tasses en millilitres pour la cuisine et la pâtisserie. Inclut cuillères à soupe, cuillères à café et onces liquides.",
      "breadcrumb": "Tasses vers mL",
      "seo": {
        "title": "Convertisseur Tasses vers mL - Outil de Mesure Culinaire Gratuit",
        "description": "Convertissez instantanément les tasses en millilitres pour la cuisine et la pâtisserie. Inclut tasses américaines, tasses métriques, cuillères à soupe, cuillères à café et onces liquides.",
        "shortDescription": "Convertissez les tasses en mL pour vos recettes.",
        "keywords": [
          "tasses vers ml",
          "tasses vers millilitres",
          "convertisseur cuisine",
          "mesures pâtisserie",
          "convertisseur recettes",
          "tasses américaines métriques",
          "cuillère à soupe ml",
          "cuillère à café ml"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Volume",
          "helpText": "Entrez le volume à convertir"
        }
      },
      "results": {
        "milliliters": {
          "label": "Millilitres"
        },
        "liters": {
          "label": "Litres"
        },
        "flOz": {
          "label": "Onces Liquides"
        }
      },
      "presets": {
        "halfCup": {
          "label": "Demi-Tasse",
          "description": "½ tasse (~118 mL)"
        },
        "oneCup": {
          "label": "Une Tasse",
          "description": "1 tasse (~237 mL)"
        },
        "twoCups": {
          "label": "Deux Tasses",
          "description": "2 tasses (~473 mL)"
        }
      },
      "values": {
        "mL": "mL",
        "L": "L",
        "fl oz": "fl oz",
        "cups": "tasses",
        "tbsp": "c. à s.",
        "tsp": "c. à c."
      },
      "formats": {
        "summary": "{value} tasses = {ml} mL"
      },
      "infoCards": {
        "results": {
          "title": "Résultats de Conversion",
          "items": [
            {
              "label": "Millilitres",
              "valueKey": "milliliters"
            },
            {
              "label": "Litres",
              "valueKey": "liters"
            },
            {
              "label": "Onces Liquides",
              "valueKey": "flOz"
            },
            {
              "label": "Cuillères à Soupe",
              "valueKey": "tablespoons"
            }
          ]
        },
        "reference": {
          "title": "Référence Rapide",
          "items": [
            {
              "label": "1 Tasse (US)",
              "valueKey": "ref1cup"
            },
            {
              "label": "½ Tasse",
              "valueKey": "refHalfCup"
            },
            {
              "label": "¼ Tasse",
              "valueKey": "refQuarterCup"
            },
            {
              "label": "1 Cuillère à Soupe",
              "valueKey": "ref1tbsp"
            }
          ]
        },
        "tips": {
          "title": "Conseils Culinaires",
          "items": [
            "Tasse US = 237 mL, Tasse métrique = 250 mL",
            "1 tasse = 16 cuillères à soupe = 48 cuillères à café",
            "1 cuillère à soupe = 15 mL, 1 cuillère à café = 5 mL",
            "Pour les ingrédients secs, utilisez le poids (grammes) pour la précision"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comprendre les Tasses et les Millilitres",
          "content": "Les tasses et les millilitres sont deux unités de volume couramment utilisées en cuisine. La tasse est principalement utilisée aux États-Unis et varie légèrement des tasses métriques utilisées ailleurs. Une tasse américaine équivaut à environ 237 mL, tandis qu'une tasse métrique équivaut à 250 mL. Comprendre ces conversions est essentiel pour suivre précisément les recettes internationales."
        },
        "howItWorks": {
          "title": "Comment Fonctionne la Conversion",
          "content": "Pour convertir les tasses américaines en millilitres, multipliez par 236,588. Pour les tasses métriques, multipliez par 250. Cette différence existe car les mesures américaines ont évolué séparément du système métrique. Ce convertisseur gère les deux systèmes et inclut les mesures culinaires courantes comme les cuillères à soupe et à café."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "Tasse US = 236,588 mL (communément arrondi à 237 mL)",
              "type": "info"
            },
            {
              "text": "Tasse métrique (Australie, NZ) = 250 mL exactement",
              "type": "info"
            },
            {
              "text": "Les recettes britanniques peuvent utiliser des tasses impériales (284 mL) - maintenant rares",
              "type": "warning"
            },
            {
              "text": "Tasse japonaise = 200 mL (utilisée dans les cuiseurs à riz)",
              "type": "info"
            },
            {
              "text": "Pour la pâtisserie, les mesures de poids sont plus précises",
              "type": "warning"
            },
            {
              "text": "Les mesures de tasses pour liquides et solides diffèrent légèrement",
              "type": "info"
            }
          ]
        },
        "commonMeasures": {
          "title": "Mesures Culinaires Courantes",
          "items": [
            {
              "text": "1 tasse = 237 mL = 16 cuillères à soupe = 8 fl oz",
              "type": "info"
            },
            {
              "text": "½ tasse = 118 mL = 8 cuillères à soupe = 4 fl oz",
              "type": "info"
            },
            {
              "text": "¼ tasse = 59 mL = 4 cuillères à soupe = 2 fl oz",
              "type": "info"
            },
            {
              "text": "1 cuillère à soupe = 15 mL = 3 cuillères à café",
              "type": "info"
            },
            {
              "text": "1 cuillère à café = 5 mL",
              "type": "info"
            },
            {
              "text": "1 once liquide = 29,57 mL = 2 cuillères à soupe",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Conversion",
          "description": "Scénarios de recettes",
          "examples": [
            {
              "title": "Recette de Pâtisserie",
              "steps": [
                "La recette demande 1½ tasses de farine",
                "Conversion : 1,5 × 237 = 355,5 mL",
                "Ou utilisez 350 mL pour faciliter la mesure"
              ],
              "result": "1½ tasses = 355 mL"
            },
            {
              "title": "Ingrédients Liquides",
              "steps": [
                "Besoin de ¾ tasse de lait",
                "Conversion : 0,75 × 237 = 177,75 mL",
                "Arrondissez à 175 ou 180 mL"
              ],
              "result": "¾ tasse = 178 mL"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de mL dans une tasse ?",
          "answer": "Une tasse américaine contient environ 237 mL (236,588 mL exactement). Une tasse métrique utilisée en Australie et Nouvelle-Zélande contient exactement 250 mL. Vérifiez toujours quelle mesure de tasse votre recette utilise."
        },
        {
          "question": "Quelle est la différence entre les tasses américaines et métriques ?",
          "answer": "Une tasse américaine fait 236,588 mL tandis qu'une tasse métrique fait 250 mL—une différence d'environ 5,5%. Pour la plupart des recettes cette petite différence n'importera pas, mais pour une pâtisserie précise cela peut affecter les résultats."
        },
        {
          "question": "Comment convertir les cuillères à soupe en mL ?",
          "answer": "1 cuillère à soupe américaine = 14,79 mL (généralement arrondie à 15 mL). Donc 2 cuillères à soupe = 30 mL, et 1 tasse = 16 cuillères à soupe = 237 mL."
        },
        {
          "question": "Pourquoi les recettes utilisent-elles des tasses au lieu de mL ?",
          "answer": "Les tasses sont traditionnelles dans la cuisine américaine et pratiques pour les cuisiniers à domicile sans balance. Les pâtissiers professionnels préfèrent les mesures de poids (grammes) pour la précision, car le volume peut varier selon comment les ingrédients sont tassés."
        },
        {
          "question": "Combien de cuillères à café dans une cuillère à soupe ?",
          "answer": "Il y a 3 cuillères à café dans 1 cuillère à soupe. 1 cuillère à café = 5 mL, donc 1 cuillère à soupe = 15 mL. Ceci est cohérent entre les mesures américaines et métriques."
        },
        {
          "question": "Dois-je utiliser une tasse à mesurer pour liquides ou solides ?",
          "answer": "Utilisez des tasses à mesurer pour liquides (avec bec verseur) pour les liquides et des tasses à mesurer pour solides (dessus plat) pour les ingrédients secs. Les tasses pour liquides vous permettent de remplir jusqu'à la ligne sans renverser, tandis que les tasses pour solides vous permettent de niveler les ingrédients."
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
      "name": "Tassen zu mL Umrechner",
      "slug": "tassen-zu-ml-rechner",
      "subtitle": "Tassen in Milliliter für Kochen und Backen umrechnen. Inklusive Esslöffel, Teelöffel und Flüssigunzen.",
      "breadcrumb": "Tassen zu mL",
      "seo": {
        "title": "Tassen zu mL Umrechner - Kostenloses Kochmaß-Tool",
        "description": "Tassen sofort in Milliliter für Kochen und Backen umrechnen. Inklusive US-Tassen, metrische Tassen, Esslöffel, Teelöffel und Flüssigunzen.",
        "shortDescription": "Tassen zu mL für Rezepte umrechnen.",
        "keywords": [
          "tassen zu ml",
          "tassen zu milliliter",
          "koch umrechner",
          "back maße",
          "rezept umrechner",
          "US tassen metrisch",
          "esslöffel ml",
          "teelöffel ml"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Volumen",
          "helpText": "Geben Sie das umzurechnende Volumen ein"
        }
      },
      "results": {
        "milliliters": {
          "label": "Milliliter"
        },
        "liters": {
          "label": "Liter"
        },
        "flOz": {
          "label": "Flüssigunzen"
        }
      },
      "presets": {
        "halfCup": {
          "label": "Halbe Tasse",
          "description": "½ Tasse (~118 mL)"
        },
        "oneCup": {
          "label": "Eine Tasse",
          "description": "1 Tasse (~237 mL)"
        },
        "twoCups": {
          "label": "Zwei Tassen",
          "description": "2 Tassen (~473 mL)"
        }
      },
      "values": {
        "mL": "mL",
        "L": "L",
        "fl oz": "fl oz",
        "cups": "Tassen",
        "tbsp": "EL",
        "tsp": "TL"
      },
      "formats": {
        "summary": "{value} Tassen = {ml} mL"
      },
      "infoCards": {
        "results": {
          "title": "Umrechnungsergebnisse",
          "items": [
            {
              "label": "Milliliter",
              "valueKey": "milliliters"
            },
            {
              "label": "Liter",
              "valueKey": "liters"
            },
            {
              "label": "Flüssigunzen",
              "valueKey": "flOz"
            },
            {
              "label": "Esslöffel",
              "valueKey": "tablespoons"
            }
          ]
        },
        "reference": {
          "title": "Schnellreferenz",
          "items": [
            {
              "label": "1 Tasse (US)",
              "valueKey": "ref1cup"
            },
            {
              "label": "½ Tasse",
              "valueKey": "refHalfCup"
            },
            {
              "label": "¼ Tasse",
              "valueKey": "refQuarterCup"
            },
            {
              "label": "1 Esslöffel",
              "valueKey": "ref1tbsp"
            }
          ]
        },
        "tips": {
          "title": "Kochtipps",
          "items": [
            "US-Tasse = 237 mL, Metrische Tasse = 250 mL",
            "1 Tasse = 16 Esslöffel = 48 Teelöffel",
            "1 Esslöffel = 15 mL, 1 Teelöffel = 5 mL",
            "Für trockene Zutaten verwenden Sie Gewicht (Gramm) für Genauigkeit"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Tassen und Milliliter verstehen",
          "content": "Tassen und Milliliter sind beide Volumeneinheiten, die häufig beim Kochen verwendet werden. Die Tasse wird hauptsächlich in den USA verwendet und unterscheidet sich leicht von metrischen Tassen, die anderswo verwendet werden. Eine US-Tasse entspricht etwa 237 mL, während eine metrische Tasse 250 mL entspricht. Das Verstehen dieser Umrechnungen ist wichtig für das genaue Befolgen internationaler Rezepte."
        },
        "howItWorks": {
          "title": "Wie die Umrechnung funktioniert",
          "content": "Um US-Tassen in Milliliter umzurechnen, multiplizieren Sie mit 236,588. Für metrische Tassen multiplizieren Sie mit 250. Der Unterschied besteht, weil sich US-Maße getrennt vom metrischen System entwickelt haben. Dieser Umrechner behandelt beide Systeme und enthält gängige Kochmaße wie Esslöffel und Teelöffel."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "US-Tasse = 236,588 mL (meist auf 237 mL gerundet)",
              "type": "info"
            },
            {
              "text": "Metrische Tasse (Australien, NZ) = genau 250 mL",
              "type": "info"
            },
            {
              "text": "UK-Rezepte können Imperial-Tassen (284 mL) verwenden - heute selten",
              "type": "warning"
            },
            {
              "text": "Japanische Tasse = 200 mL (in Reiskochern verwendet)",
              "type": "info"
            },
            {
              "text": "Zum Backen sind Gewichtsmessungen genauer",
              "type": "warning"
            },
            {
              "text": "Flüssige und trockene Tassenmessungen unterscheiden sich leicht",
              "type": "info"
            }
          ]
        },
        "commonMeasures": {
          "title": "Gängige Kochmaße",
          "items": [
            {
              "text": "1 Tasse = 237 mL = 16 Esslöffel = 8 fl oz",
              "type": "info"
            },
            {
              "text": "½ Tasse = 118 mL = 8 Esslöffel = 4 fl oz",
              "type": "info"
            },
            {
              "text": "¼ Tasse = 59 mL = 4 Esslöffel = 2 fl oz",
              "type": "info"
            },
            {
              "text": "1 Esslöffel = 15 mL = 3 Teelöffel",
              "type": "info"
            },
            {
              "text": "1 Teelöffel = 5 mL",
              "type": "info"
            },
            {
              "text": "1 Flüssigunze = 29,57 mL = 2 Esslöffel",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Rezeptszenarien",
          "examples": [
            {
              "title": "Backrezept",
              "steps": [
                "Rezept verlangt 1½ Tassen Mehl",
                "Umrechnen: 1,5 × 237 = 355,5 mL",
                "Oder 350 mL für einfaches Messen verwenden"
              ],
              "result": "1½ Tassen = 355 mL"
            },
            {
              "title": "Flüssige Zutaten",
              "steps": [
                "Benötigen ¾ Tasse Milch",
                "Umrechnen: 0,75 × 237 = 177,75 mL",
                "Auf 175 oder 180 mL runden"
              ],
              "result": "¾ Tasse = 178 mL"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele mL sind in einer Tasse?",
          "answer": "Eine US-Tasse enthält etwa 237 mL (genau 236,588 mL). Eine metrische Tasse, die in Australien und Neuseeland verwendet wird, enthält genau 250 mL. Prüfen Sie immer, welches Tassenmaß Ihr Rezept verwendet."
        },
        {
          "question": "Was ist der Unterschied zwischen US- und metrischen Tassen?",
          "answer": "Eine US-Tasse ist 236,588 mL, während eine metrische Tasse 250 mL ist - ein Unterschied von etwa 5,5%. Für die meisten Rezepte macht dieser kleine Unterschied nichts aus, aber für präzises Backen kann es die Ergebnisse beeinflussen."
        },
        {
          "question": "Wie rechne ich Esslöffel in mL um?",
          "answer": "1 US-Esslöffel = 14,79 mL (meist auf 15 mL gerundet). Also 2 Esslöffel = 30 mL, und 1 Tasse = 16 Esslöffel = 237 mL."
        },
        {
          "question": "Warum verwenden Rezepte Tassen statt mL?",
          "answer": "Tassen sind traditionell in der amerikanischen Küche und praktisch für Hobbyköche ohne Waagen. Professionelle Bäcker bevorzugen Gewichtsmessungen (Gramm) für Genauigkeit, da das Volumen je nach Packung der Zutaten variieren kann."
        },
        {
          "question": "Wie viele Teelöffel sind in einem Esslöffel?",
          "answer": "Es sind 3 Teelöffel in 1 Esslöffel. 1 Teelöffel = 5 mL, also 1 Esslöffel = 15 mL. Dies ist bei US- und metrischen Messungen gleich."
        },
        {
          "question": "Soll ich einen Flüssigkeits- oder Trockenmessbecher verwenden?",
          "answer": "Verwenden Sie Flüssigkeitsmessbecher (mit Ausgießer) für Flüssigkeiten und Trockenmessbecher (flacher Rand) für trockene Zutaten. Flüssigkeitsbecher erlauben es, bis zur Linie zu füllen ohne zu verschütten, während Trockenbecher das Abstreichen von Zutaten ermöglichen."
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
      defaultValue: 1,
      placeholder: "1",
      min: 0,
      step: 0.25,
      unitType: "cooking_volume",
      syncGroup: false,
      defaultUnit: "cups",
      allowedUnits: ["cups", "mL", "L", "tbsp", "tsp", "fl_oz"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "milliliters", type: "primary", format: "number" },
    { id: "liters", type: "secondary", format: "number" },
    { id: "flOz", type: "secondary", format: "number" },
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
    { id: "commonMeasures", type: "list", icon: "🥄", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "USDA", year: "2024", title: "Food Composition Databases - Measurement Conversions", source: "US Department of Agriculture", url: "https://fdc.nal.usda.gov/" },
    { authors: "FDA", year: "2024", title: "Food Labeling Guide - Reference Amounts", source: "US Food and Drug Administration", url: "https://www.fda.gov/food/food-labeling-nutrition" },
  ],

  hero: { badge: "Cooking Converter", title: "Cups to mL" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["gallons-to-liters", "mph-to-kmh", "square-feet-to-square-meters"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.001) return val.toExponential(2);
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function calculateCupsToMl(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "cups";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Conversion factors to mL (from registry.ts COOKING_VOLUME)
  const toMl: Record<string, number> = {
    "cups": 236.588,
    "mL": 1,
    "L": 1000,
    "tbsp": 14.787,
    "tsp": 4.929,
    "fl_oz": 29.574,
  };

  const factor = toMl[fromUnit] || 236.588;
  const milliliters = amount * factor;
  const liters = milliliters / 1000;
  const flOz = milliliters / 29.574;
  const tablespoons = milliliters / 14.787;

  // Reference values
  const ref1cup = 236.588;
  const refHalfCup = 118.294;
  const refQuarterCup = 59.147;
  const ref1tbsp = 14.787;

  const mlUnit = v["mL"] || "mL";
  const lUnit = v["L"] || "L";
  const flOzUnit = v["fl oz"] || "fl oz";
  const tbspUnit = v["tbsp"] || "tbsp";

  return {
    values: { milliliters, liters, flOz, tablespoons, ref1cup, refHalfCup, refQuarterCup, ref1tbsp },
    formatted: {
      milliliters: `${fmtNum(milliliters)} ${mlUnit}`,
      liters: `${fmtNum(liters)} ${lUnit}`,
      flOz: `${fmtNum(flOz)} ${flOzUnit}`,
      tablespoons: `${fmtNum(tablespoons)} ${tbspUnit}`,
      ref1cup: `${fmtNum(ref1cup)} ${mlUnit}`,
      refHalfCup: `${fmtNum(refHalfCup)} ${mlUnit}`,
      refQuarterCup: `${fmtNum(refQuarterCup)} ${mlUnit}`,
      ref1tbsp: `${fmtNum(ref1tbsp)} ${mlUnit}`,
    },
    summary: `${fmtNum(amount)} cups = ${fmtNum(milliliters)} ${mlUnit}`,
    isValid: true,
  };
}

export default cupsToMlConverterConfig;
