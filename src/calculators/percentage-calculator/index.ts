import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const percentageCalculatorConfig: CalculatorConfigV4 = {
  id: "percentage-calculator",
  version: "4.0",
  category: "everyday",
  icon: "📊",

  presets: [
    {
      id: "tipCalc",
      icon: "🍽️",
      values: {
        mode: "whatIsXPercentOfY",
        percentValue: 18,
        ofValue: 85,
        isValue: null,
        totalValue: null,
        fromValue: null,
        toValue: null,
      },
    },
    {
      id: "discount",
      icon: "🏷️",
      values: {
        mode: "whatIsXPercentOfY",
        percentValue: 25,
        ofValue: 120,
        isValue: null,
        totalValue: null,
        fromValue: null,
        toValue: null,
      },
    },
    {
      id: "gradeCalc",
      icon: "📝",
      values: {
        mode: "xIsWhatPercentOfY",
        percentValue: null,
        ofValue: 50,
        isValue: 42,
        totalValue: null,
        fromValue: null,
        toValue: null,
      },
    },
  ],

  t: {
    en: {
      name: "Percentage Calculator",
      slug: "percentage-calculator",
      subtitle: "Calculate percentages instantly — find X% of Y, what percent X is of Y, or the percentage change between two numbers.",
      breadcrumb: "Percentage",

      seo: {
        title: "Percentage Calculator - Quick & Free Online Tool",
        description: "Calculate percentages easily. Find what X% of Y is, what percent one number is of another, or the percentage change between values. Free and instant.",
        shortDescription: "Calculate percentages quickly and easily online.",
        keywords: [
          "percentage calculator",
          "percent calculator",
          "calculate percentage",
          "what percent is",
          "percentage change",
          "free percentage calculator",
          "online percent tool",
          "percentage formula",
        ],
      },

      calculator: { yourInformation: "Your Calculation" },
      ui: {
        yourInformation: "Your Calculation",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        mode: {
          label: "Calculation Type",
          helpText: "Choose what you want to calculate",
          options: {
            whatIsXPercentOfY: "What is X% of Y?",
            xIsWhatPercentOfY: "X is what % of Y?",
            percentageChange: "Percentage change",
          },
        },
        percentValue: {
          label: "Percentage",
          helpText: "Enter the percentage value",
        },
        ofValue: {
          label: "Of Value",
          helpText: "The total or base number",
        },
        isValue: {
          label: "Is Value",
          helpText: "The part or portion",
        },
        totalValue: {
          label: "Total",
          helpText: "The total or base number",
        },
        fromValue: {
          label: "From Value",
          helpText: "The original value",
        },
        toValue: {
          label: "To Value",
          helpText: "The new value",
        },
      },

      results: {
        answer: { label: "Answer" },
        formula: { label: "Formula Used" },
        breakdown: { label: "Step-by-Step" },
      },

      presets: {
        tipCalc: { label: "18% Tip on $85", description: "Restaurant tip calculation" },
        discount: { label: "25% Off $120", description: "Shopping discount" },
        gradeCalc: { label: "42 out of 50", description: "Grade percentage" },
      },

      values: {
        "%": "%",
        "of": "of",
        "is": "is",
        "increase": "increase",
        "decrease": "decrease",
      },

      formats: {
        summary: "{answer}",
      },

      infoCards: {
        metrics: {
          title: "Your Result",
          items: [
            { label: "Answer", valueKey: "answer" },
            { label: "Calculation", valueKey: "formula" },
            { label: "Decimal", valueKey: "decimal" },
            { label: "Fraction", valueKey: "fraction" },
          ],
        },
        details: {
          title: "Quick Reference",
          items: [
            { label: "10%", valueKey: "ref10" },
            { label: "25%", valueKey: "ref25" },
            { label: "50%", valueKey: "ref50" },
            { label: "75%", valueKey: "ref75" },
          ],
        },
        tips: {
          title: "Percentage Tips",
          items: [
            "To find 10%, just move the decimal point one place to the left",
            "To find 50%, simply divide the number by 2",
            "To find 25%, divide by 4 or halve the 50% result",
            "Percentage increase = (new - old) / old × 100",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Percentage?",
          content: "A percentage is a way of expressing a number as a fraction of 100. The word comes from the Latin 'per centum,' meaning 'by the hundred.' Percentages are used everywhere in daily life — from calculating discounts and tips to understanding interest rates, test scores, and statistics. When you see 25%, it means 25 out of every 100, or one quarter of the total. The concept makes it easy to compare proportions regardless of the actual quantities involved. For example, saying a product is '30% off' immediately communicates the savings without needing to know the original price.",
        },
        howItWorks: {
          title: "How to Calculate Percentages",
          content: "There are three fundamental percentage calculations. First, finding X% of Y: multiply Y by X and divide by 100. For example, 15% of 200 is (200 × 15) / 100 = 30. Second, finding what percent X is of Y: divide X by Y and multiply by 100. For example, 30 is what percent of 200? (30 / 200) × 100 = 15%. Third, percentage change: subtract the old value from the new value, divide by the old value, and multiply by 100. If a price goes from $80 to $100, the change is ((100 - 80) / 80) × 100 = 25% increase. Each formula is simply a rearrangement of the same basic relationship: Part = Percentage × Whole / 100.",
        },
        considerations: {
          title: "Common Percentage Mistakes",
          items: [
            { text: "Percentage points vs. percentages: Going from 10% to 15% is a 5 percentage point increase but a 50% increase", type: "warning" },
            { text: "Order matters for change: A 50% increase followed by a 50% decrease does NOT return to the original value", type: "warning" },
            { text: "Base confusion: '20% of 50' and '50% of 20' give the same result (10), but represent different scenarios", type: "info" },
            { text: "Compounding: Repeated percentage changes compound — 10% growth per year for 7 years roughly doubles the value", type: "info" },
            { text: "Rounding errors: Always use the full decimal in intermediate steps and only round the final answer", type: "info" },
            { text: "Negative percentages: A negative percentage change means a decrease, not an error", type: "info" },
          ],
        },
        categories: {
          title: "Real-World Percentage Uses",
          items: [
            { text: "Shopping: Calculate discounts, sales tax, and final prices to make informed purchase decisions", type: "info" },
            { text: "Finance: Interest rates, returns on investment, inflation rates, and loan APRs are all expressed as percentages", type: "info" },
            { text: "Cooking: Scale recipes up or down by a percentage to serve more or fewer people", type: "info" },
            { text: "Grades: Convert raw scores (42 out of 50) to percentages (84%) for standardized comparison", type: "info" },
            { text: "Tipping: Calculate restaurant tips by finding 15-20% of the pre-tax bill", type: "info" },
            { text: "Statistics: Polls, surveys, and research results rely on percentages to convey findings clearly", type: "info" },
          ],
        },
        examples: {
          title: "Step-by-Step Examples",
          description: "See how common percentage problems are solved",
          examples: [
            {
              title: "25% Discount on $80 Item",
              steps: [
                "Discount = 80 × 25 / 100 = $20",
                "Sale price = $80 - $20 = $60",
              ],
              result: "You save $20, paying $60",
            },
            {
              title: "Score 37 out of 45 on a Test",
              steps: [
                "Percentage = (37 / 45) × 100",
                "Percentage = 0.8222 × 100 = 82.2%",
              ],
              result: "Your score is 82.2%",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I calculate a percentage of a number?", answer: "Multiply the number by the percentage and divide by 100. For example, 20% of 150 = 150 × 20 / 100 = 30." },
        { question: "How do I find what percentage one number is of another?", answer: "Divide the part by the whole and multiply by 100. For example, 45 is what percent of 200? (45 / 200) × 100 = 22.5%." },
        { question: "How do I calculate percentage change?", answer: "Subtract the old value from the new value, divide by the old value, and multiply by 100. Formula: ((New - Old) / Old) × 100." },
        { question: "What is the difference between percentage and percentage points?", answer: "If an interest rate goes from 5% to 8%, it increased by 3 percentage points but by 60% as a percentage change ((8-5)/5 × 100 = 60%)." },
        { question: "How do I convert a fraction to a percentage?", answer: "Divide the numerator by the denominator and multiply by 100. For example, 3/8 = 0.375 × 100 = 37.5%." },
        { question: "How do I reverse a percentage to find the original value?", answer: "If you know the final value after a percentage increase/decrease, divide by (1 + rate/100) for increases or (1 - rate/100) for decreases. Example: $120 after a 20% increase means the original was 120 / 1.20 = $100." },
      ],

      rating: {
        title: "Rate this Calculator",
        share: "Share",
        copied: "Copied!",
        copyLink: "Copy Link",
        clickToRate: "Click to rate",
        youRated: "You rated",
        stars: "stars",
        averageFrom: "average from",
        ratings: "ratings",
      },

      common: { home: "Home", calculators: "Calculators" },

      buttons: {
        calculate: "Calculate",
        reset: "Reset",
        pdf: "PDF",
        csv: "CSV",
        excel: "Excel",
        save: "Save",
        saved: "Saved",
        saving: "Saving...",
      },

      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de Porcentajes",
      "slug": "calculadora-porcentajes",
      "subtitle": "Calcula porcentajes al instante — encuentra el X% de Y, qué porcentaje representa X de Y, o el cambio porcentual entre dos números.",
      "breadcrumb": "Porcentajes",
      "seo": {
        "title": "Calculadora de Porcentajes - Herramienta Online Rápida y Gratuita",
        "description": "Calcula porcentajes fácilmente. Encuentra qué es el X% de Y, qué porcentaje representa un número de otro, o el cambio porcentual entre valores. Gratuita e instantánea.",
        "shortDescription": "Calcula porcentajes rápida y fácilmente en línea.",
        "keywords": [
          "calculadora de porcentajes",
          "calculadora de por ciento",
          "calcular porcentaje",
          "qué porcentaje es",
          "cambio porcentual",
          "calculadora de porcentajes gratuita",
          "herramienta de porcentajes online",
          "fórmula de porcentaje"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "mode": {
          "label": "Tipo de Cálculo",
          "helpText": "Elige qué quieres calcular",
          "options": {
            "whatIsXPercentOfY": "¿Cuánto es el X% de Y?",
            "xIsWhatPercentOfY": "¿X es qué % de Y?",
            "percentageChange": "Cambio porcentual"
          }
        },
        "percentValue": {
          "label": "Porcentaje",
          "helpText": "Ingresa el valor del porcentaje"
        },
        "ofValue": {
          "label": "Del Valor",
          "helpText": "El número total o base"
        },
        "isValue": {
          "label": "Es Valor",
          "helpText": "La parte o porción"
        },
        "totalValue": {
          "label": "Total",
          "helpText": "El número total o base"
        },
        "fromValue": {
          "label": "Valor Inicial",
          "helpText": "El valor original"
        },
        "toValue": {
          "label": "Valor Final",
          "helpText": "El valor nuevo"
        }
      },
      "results": {
        "answer": {
          "label": "Respuesta"
        },
        "formula": {
          "label": "Fórmula Utilizada"
        },
        "breakdown": {
          "label": "Paso a Paso"
        }
      },
      "presets": {
        "tipCalc": {
          "label": "18% de Propina en $85",
          "description": "Cálculo de propina de restaurante"
        },
        "discount": {
          "label": "25% de Descuento en $120",
          "description": "Descuento de compras"
        },
        "gradeCalc": {
          "label": "42 de 50",
          "description": "Porcentaje de calificación"
        }
      },
      "values": {
        "%": "%",
        "of": "de",
        "is": "es",
        "increase": "aumento",
        "decrease": "disminución"
      },
      "formats": {
        "summary": "{answer}"
      },
      "infoCards": {
        "metrics": {
          "title": "Tu Resultado",
          "items": [
            {
              "label": "Respuesta",
              "valueKey": "answer"
            },
            {
              "label": "Cálculo",
              "valueKey": "formula"
            },
            {
              "label": "Decimal",
              "valueKey": "decimal"
            },
            {
              "label": "Fracción",
              "valueKey": "fraction"
            }
          ]
        },
        "details": {
          "title": "Referencia Rápida",
          "items": [
            {
              "label": "10%",
              "valueKey": "ref10"
            },
            {
              "label": "25%",
              "valueKey": "ref25"
            },
            {
              "label": "50%",
              "valueKey": "ref50"
            },
            {
              "label": "75%",
              "valueKey": "ref75"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Porcentajes",
          "items": [
            "Para encontrar el 10%, simplemente mueve el punto decimal un lugar hacia la izquierda",
            "Para encontrar el 50%, simplemente divide el número entre 2",
            "Para encontrar el 25%, divide entre 4 o toma la mitad del resultado del 50%",
            "Aumento porcentual = (nuevo - viejo) / viejo × 100"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es un Porcentaje?",
          "content": "Un porcentaje es una forma de expresar un número como una fracción de 100. La palabra proviene del latín 'per centum', que significa 'por ciento'. Los porcentajes se usan en todas partes en la vida diaria: desde calcular descuentos y propinas hasta entender tasas de interés, calificaciones y estadísticas. Cuando ves 25%, significa 25 de cada 100, o una cuarta parte del total. El concepto facilita comparar proporciones sin importar las cantidades reales involucradas. Por ejemplo, decir que un producto tiene '30% de descuento' comunica inmediatamente el ahorro sin necesidad de conocer el precio original."
        },
        "howItWorks": {
          "title": "Cómo Calcular Porcentajes",
          "content": "Hay tres cálculos de porcentajes fundamentales. Primero, encontrar el X% de Y: multiplica Y por X y divide entre 100. Por ejemplo, el 15% de 200 es (200 × 15) / 100 = 30. Segundo, encontrar qué porcentaje representa X de Y: divide X entre Y y multiplica por 100. Por ejemplo, ¿30 es qué porcentaje de 200? (30 / 200) × 100 = 15%. Tercero, cambio porcentual: resta el valor viejo del valor nuevo, divide entre el valor viejo y multiplica por 100. Si un precio va de $80 a $100, el cambio es ((100 - 80) / 80) × 100 = 25% de aumento. Cada fórmula es simplemente un reordenamiento de la misma relación básica: Parte = Porcentaje × Total / 100."
        },
        "considerations": {
          "title": "Errores Comunes con Porcentajes",
          "items": [
            {
              "text": "Puntos porcentuales vs. porcentajes: Ir del 10% al 15% es un aumento de 5 puntos porcentuales pero un aumento del 50%",
              "type": "warning"
            },
            {
              "text": "El orden importa para el cambio: Un aumento del 50% seguido de una disminución del 50% NO regresa al valor original",
              "type": "warning"
            },
            {
              "text": "Confusión de base: '20% de 50' y '50% de 20' dan el mismo resultado (10), pero representan escenarios diferentes",
              "type": "info"
            },
            {
              "text": "Composición: Los cambios porcentuales repetidos se componen — 10% de crecimiento anual durante 7 años aproximadamente duplica el valor",
              "type": "info"
            },
            {
              "text": "Errores de redondeo: Siempre usa el decimal completo en pasos intermedios y redondea solo la respuesta final",
              "type": "info"
            },
            {
              "text": "Porcentajes negativos: Un cambio porcentual negativo significa una disminución, no un error",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Usos de Porcentajes en la Vida Real",
          "items": [
            {
              "text": "Compras: Calcular descuentos, impuestos de venta y precios finales para tomar decisiones de compra informadas",
              "type": "info"
            },
            {
              "text": "Finanzas: Tasas de interés, rendimientos de inversión, tasas de inflación y APR de préstamos se expresan como porcentajes",
              "type": "info"
            },
            {
              "text": "Cocina: Escalar recetas hacia arriba o abajo por un porcentaje para servir a más o menos personas",
              "type": "info"
            },
            {
              "text": "Calificaciones: Convertir puntajes brutos (42 de 50) a porcentajes (84%) para comparación estandarizada",
              "type": "info"
            },
            {
              "text": "Propinas: Calcular propinas de restaurante encontrando el 15-20% de la cuenta antes de impuestos",
              "type": "info"
            },
            {
              "text": "Estadísticas: Encuestas, sondeos y resultados de investigación dependen de porcentajes para transmitir hallazgos claramente",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos Paso a Paso",
          "description": "Ve cómo se resuelven problemas comunes de porcentajes",
          "examples": [
            {
              "title": "25% de Descuento en Artículo de $80",
              "steps": [
                "Descuento = 80 × 25 / 100 = $20",
                "Precio de venta = $80 - $20 = $60"
              ],
              "result": "Ahorras $20, pagando $60"
            },
            {
              "title": "Puntuación de 37 de 45 en un Examen",
              "steps": [
                "Porcentaje = (37 / 45) × 100",
                "Porcentaje = 0.8222 × 100 = 82.2%"
              ],
              "result": "Tu puntuación es 82.2%"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cómo calculo un porcentaje de un número?",
          "answer": "Multiplica el número por el porcentaje y divide entre 100. Por ejemplo, 20% de 150 = 150 × 20 / 100 = 30."
        },
        {
          "question": "¿Cómo encuentro qué porcentaje representa un número de otro?",
          "answer": "Divide la parte entre el total y multiplica por 100. Por ejemplo, ¿45 es qué porcentaje de 200? (45 / 200) × 100 = 22.5%."
        },
        {
          "question": "¿Cómo calculo el cambio porcentual?",
          "answer": "Resta el valor viejo del valor nuevo, divide entre el valor viejo y multiplica por 100. Fórmula: ((Nuevo - Viejo) / Viejo) × 100."
        },
        {
          "question": "¿Cuál es la diferencia entre porcentaje y puntos porcentuales?",
          "answer": "Si una tasa de interés va del 5% al 8%, aumentó 3 puntos porcentuales pero 60% como cambio porcentual ((8-5)/5 × 100 = 60%)."
        },
        {
          "question": "¿Cómo convierto una fracción a porcentaje?",
          "answer": "Divide el numerador entre el denominador y multiplica por 100. Por ejemplo, 3/8 = 0.375 × 100 = 37.5%."
        },
        {
          "question": "¿Cómo revierto un porcentaje para encontrar el valor original?",
          "answer": "Si conoces el valor final después de un aumento/disminución porcentual, divide entre (1 + tasa/100) para aumentos o (1 - tasa/100) para disminuciones. Ejemplo: $120 después de un aumento del 20% significa que el original era 120 / 1.20 = $100."
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
      "name": "Calculadora de Porcentagem",
      "slug": "calculadora-porcentagem",
      "subtitle": "Calcule porcentagens instantaneamente — encontre X% de Y, que porcentagem X é de Y, ou a mudança percentual entre dois números.",
      "breadcrumb": "Porcentagem",
      "seo": {
        "title": "Calculadora de Porcentagem - Ferramenta Online Rápida e Gratuita",
        "description": "Calcule porcentagens facilmente. Descubra quanto é X% de Y, que porcentagem um número é de outro, ou a mudança percentual entre valores. Gratuita e instantânea.",
        "shortDescription": "Calcule porcentagens rápida e facilmente online.",
        "keywords": [
          "calculadora de porcentagem",
          "calculadora de percentual",
          "calcular porcentagem",
          "que porcentagem é",
          "mudança percentual",
          "calculadora de porcentagem gratuita",
          "ferramenta de percentual online",
          "fórmula de porcentagem"
        ]
      },
      "inputs": {
        "mode": {
          "label": "Tipo de Cálculo",
          "helpText": "Escolha o que você quer calcular",
          "options": {
            "whatIsXPercentOfY": "Quanto é X% de Y?",
            "xIsWhatPercentOfY": "X é que % de Y?",
            "percentageChange": "Mudança percentual"
          }
        },
        "percentValue": {
          "label": "Porcentagem",
          "helpText": "Digite o valor da porcentagem"
        },
        "ofValue": {
          "label": "Valor Total",
          "helpText": "O número total ou base"
        },
        "isValue": {
          "label": "Valor Parte",
          "helpText": "A parte ou porção"
        },
        "totalValue": {
          "label": "Total",
          "helpText": "O número total ou base"
        },
        "fromValue": {
          "label": "Valor Inicial",
          "helpText": "O valor original"
        },
        "toValue": {
          "label": "Valor Final",
          "helpText": "O novo valor"
        }
      },
      "results": {
        "answer": {
          "label": "Resposta"
        },
        "formula": {
          "label": "Fórmula Utilizada"
        },
        "breakdown": {
          "label": "Passo a Passo"
        }
      },
      "presets": {
        "tipCalc": {
          "label": "Gorjeta de 18% em R$ 85",
          "description": "Cálculo de gorjeta de restaurante"
        },
        "discount": {
          "label": "25% de Desconto em R$ 120",
          "description": "Desconto de compras"
        },
        "gradeCalc": {
          "label": "42 de 50",
          "description": "Porcentagem de nota"
        }
      },
      "values": {
        "%": "%",
        "of": "de",
        "is": "é",
        "increase": "aumento",
        "decrease": "diminuição"
      },
      "formats": {
        "summary": "{answer}"
      },
      "infoCards": {
        "metrics": {
          "title": "Seu Resultado",
          "items": [
            {
              "label": "Resposta",
              "valueKey": "answer"
            },
            {
              "label": "Cálculo",
              "valueKey": "formula"
            },
            {
              "label": "Decimal",
              "valueKey": "decimal"
            },
            {
              "label": "Fração",
              "valueKey": "fraction"
            }
          ]
        },
        "details": {
          "title": "Referência Rápida",
          "items": [
            {
              "label": "10%",
              "valueKey": "ref10"
            },
            {
              "label": "25%",
              "valueKey": "ref25"
            },
            {
              "label": "50%",
              "valueKey": "ref50"
            },
            {
              "label": "75%",
              "valueKey": "ref75"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Porcentagem",
          "items": [
            "Para encontrar 10%, simplesmente mova a vírgula decimal uma casa para a esquerda",
            "Para encontrar 50%, simplesmente divida o número por 2",
            "Para encontrar 25%, divida por 4 ou divida o resultado de 50% pela metade",
            "Aumento percentual = (novo - antigo) / antigo × 100"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Porcentagem?",
          "content": "Uma porcentagem é uma forma de expressar um número como uma fração de 100. A palavra vem do latim 'per centum', que significa 'por cem'. As porcentagens são usadas em todos os lugares da vida diária — desde calcular descontos e gorjetas até entender taxas de juros, notas de testes e estatísticas. Quando você vê 25%, significa 25 de cada 100, ou um quarto do total. O conceito facilita a comparação de proporções independentemente das quantidades reais envolvidas. Por exemplo, dizer que um produto tem '30% de desconto' comunica imediatamente a economia sem precisar saber o preço original."
        },
        "howItWorks": {
          "title": "Como Calcular Porcentagens",
          "content": "Existem três cálculos fundamentais de porcentagem. Primeiro, encontrar X% de Y: multiplique Y por X e divida por 100. Por exemplo, 15% de 200 é (200 × 15) / 100 = 30. Segundo, encontrar que porcentagem X é de Y: divida X por Y e multiplique por 100. Por exemplo, 30 é que porcentagem de 200? (30 / 200) × 100 = 15%. Terceiro, mudança percentual: subtraia o valor antigo do novo valor, divida pelo valor antigo e multiplique por 100. Se um preço vai de R$ 80 para R$ 100, a mudança é ((100 - 80) / 80) × 100 = 25% de aumento. Cada fórmula é simplesmente um rearranjo da mesma relação básica: Parte = Porcentagem × Todo / 100."
        },
        "considerations": {
          "title": "Erros Comuns com Porcentagens",
          "items": [
            {
              "text": "Pontos percentuais vs. porcentagens: Ir de 10% para 15% é um aumento de 5 pontos percentuais, mas um aumento de 50%",
              "type": "warning"
            },
            {
              "text": "A ordem importa para mudanças: Um aumento de 50% seguido de uma diminuição de 50% NÃO retorna ao valor original",
              "type": "warning"
            },
            {
              "text": "Confusão de base: '20% de 50' e '50% de 20' dão o mesmo resultado (10), mas representam cenários diferentes",
              "type": "info"
            },
            {
              "text": "Composição: Mudanças percentuais repetidas se compõem — 10% de crescimento por ano durante 7 anos aproximadamente dobra o valor",
              "type": "info"
            },
            {
              "text": "Erros de arredondamento: Sempre use o decimal completo nas etapas intermediárias e arredonde apenas a resposta final",
              "type": "info"
            },
            {
              "text": "Porcentagens negativas: Uma mudança percentual negativa significa uma diminuição, não um erro",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Usos Reais de Porcentagens",
          "items": [
            {
              "text": "Compras: Calcule descontos, impostos sobre vendas e preços finais para tomar decisões de compra informadas",
              "type": "info"
            },
            {
              "text": "Finanças: Taxas de juros, retornos sobre investimentos, taxas de inflação e TACs de empréstimos são expressos como porcentagens",
              "type": "info"
            },
            {
              "text": "Culinária: Ajuste receitas para mais ou menos por uma porcentagem para servir mais ou menos pessoas",
              "type": "info"
            },
            {
              "text": "Notas: Converta pontuações brutas (42 de 50) em porcentagens (84%) para comparação padronizada",
              "type": "info"
            },
            {
              "text": "Gorjetas: Calcule gorjetas de restaurante encontrando 15-20% da conta antes dos impostos",
              "type": "info"
            },
            {
              "text": "Estatísticas: Pesquisas, levantamentos e resultados de pesquisa dependem de porcentagens para transmitir descobertas claramente",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos Passo a Passo",
          "description": "Veja como problemas comuns de porcentagem são resolvidos",
          "examples": [
            {
              "title": "25% de Desconto em Item de R$ 80",
              "steps": [
                "Desconto = 80 × 25 / 100 = R$ 20",
                "Preço de venda = R$ 80 - R$ 20 = R$ 60"
              ],
              "result": "Você economiza R$ 20, pagando R$ 60"
            },
            {
              "title": "Pontuação de 37 de 45 em um Teste",
              "steps": [
                "Porcentagem = (37 / 45) × 100",
                "Porcentagem = 0,8222 × 100 = 82,2%"
              ],
              "result": "Sua pontuação é 82,2%"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Como calcular uma porcentagem de um número?",
          "answer": "Multiplique o número pela porcentagem e divida por 100. Por exemplo, 20% de 150 = 150 × 20 / 100 = 30."
        },
        {
          "question": "Como descobrir que porcentagem um número é de outro?",
          "answer": "Divida a parte pelo todo e multiplique por 100. Por exemplo, 45 é que porcentagem de 200? (45 / 200) × 100 = 22,5%."
        },
        {
          "question": "Como calcular mudança percentual?",
          "answer": "Subtraia o valor antigo do novo valor, divida pelo valor antigo e multiplique por 100. Fórmula: ((Novo - Antigo) / Antigo) × 100."
        },
        {
          "question": "Qual é a diferença entre porcentagem e pontos percentuais?",
          "answer": "Se uma taxa de juros vai de 5% para 8%, ela aumentou 3 pontos percentuais, mas 60% como mudança percentual ((8-5)/5 × 100 = 60%)."
        },
        {
          "question": "Como converter uma fração em porcentagem?",
          "answer": "Divida o numerador pelo denominador e multiplique por 100. Por exemplo, 3/8 = 0,375 × 100 = 37,5%."
        },
        {
          "question": "Como reverter uma porcentagem para encontrar o valor original?",
          "answer": "Se você conhece o valor final após um aumento/diminuição percentual, divida por (1 + taxa/100) para aumentos ou (1 - taxa/100) para diminuições. Exemplo: R$ 120 após um aumento de 20% significa que o original era 120 / 1,20 = R$ 100."
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
      "name": "Calculateur de Pourcentage",
      "slug": "calculateur-pourcentage",
      "subtitle": "Calculez les pourcentages instantanément — trouvez X% de Y, quel pourcentage X représente de Y, ou le changement de pourcentage entre deux nombres.",
      "breadcrumb": "Pourcentage",
      "seo": {
        "title": "Calculateur de Pourcentage - Outil en Ligne Rapide et Gratuit",
        "description": "Calculez facilement les pourcentages. Trouvez ce que X% de Y représente, quel pourcentage un nombre représente d'un autre, ou le changement de pourcentage entre valeurs. Gratuit et instantané.",
        "shortDescription": "Calculez les pourcentages rapidement et facilement en ligne.",
        "keywords": [
          "calculateur de pourcentage",
          "calculateur de pour cent",
          "calculer pourcentage",
          "quel pourcentage est",
          "changement de pourcentage",
          "calculateur de pourcentage gratuit",
          "outil pour cent en ligne",
          "formule de pourcentage"
        ]
      },
      "inputs": {
        "mode": {
          "label": "Type de Calcul",
          "helpText": "Choisissez ce que vous voulez calculer",
          "options": {
            "whatIsXPercentOfY": "Combien vaut X% de Y ?",
            "xIsWhatPercentOfY": "X représente quel % de Y ?",
            "percentageChange": "Changement de pourcentage"
          }
        },
        "percentValue": {
          "label": "Pourcentage",
          "helpText": "Entrez la valeur du pourcentage"
        },
        "ofValue": {
          "label": "De la Valeur",
          "helpText": "Le nombre total ou de base"
        },
        "isValue": {
          "label": "Est la Valeur",
          "helpText": "La partie ou portion"
        },
        "totalValue": {
          "label": "Total",
          "helpText": "Le nombre total ou de base"
        },
        "fromValue": {
          "label": "De la Valeur",
          "helpText": "La valeur originale"
        },
        "toValue": {
          "label": "À la Valeur",
          "helpText": "La nouvelle valeur"
        }
      },
      "results": {
        "answer": {
          "label": "Réponse"
        },
        "formula": {
          "label": "Formule Utilisée"
        },
        "breakdown": {
          "label": "Étape par Étape"
        }
      },
      "presets": {
        "tipCalc": {
          "label": "Pourboire 18% sur 85€",
          "description": "Calcul de pourboire restaurant"
        },
        "discount": {
          "label": "25% de Remise sur 120€",
          "description": "Remise shopping"
        },
        "gradeCalc": {
          "label": "42 sur 50",
          "description": "Pourcentage de note"
        }
      },
      "values": {
        "%": "%",
        "of": "de",
        "is": "est",
        "increase": "augmentation",
        "decrease": "diminution"
      },
      "formats": {
        "summary": "{answer}"
      },
      "infoCards": {
        "metrics": {
          "title": "Votre Résultat",
          "items": [
            {
              "label": "Réponse",
              "valueKey": "answer"
            },
            {
              "label": "Calcul",
              "valueKey": "formula"
            },
            {
              "label": "Décimal",
              "valueKey": "decimal"
            },
            {
              "label": "Fraction",
              "valueKey": "fraction"
            }
          ]
        },
        "details": {
          "title": "Référence Rapide",
          "items": [
            {
              "label": "10%",
              "valueKey": "ref10"
            },
            {
              "label": "25%",
              "valueKey": "ref25"
            },
            {
              "label": "50%",
              "valueKey": "ref50"
            },
            {
              "label": "75%",
              "valueKey": "ref75"
            }
          ]
        },
        "tips": {
          "title": "Astuces Pourcentages",
          "items": [
            "Pour trouver 10%, déplacez simplement la virgule d'un cran vers la gauche",
            "Pour trouver 50%, divisez simplement le nombre par 2",
            "Pour trouver 25%, divisez par 4 ou prenez la moitié du résultat de 50%",
            "Augmentation en pourcentage = (nouveau - ancien) / ancien × 100"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Pourcentage ?",
          "content": "Un pourcentage est une façon d'exprimer un nombre comme une fraction de 100. Le mot vient du latin 'per centum,' signifiant 'par cent.' Les pourcentages sont utilisés partout dans la vie quotidienne — pour calculer les remises et pourboires, comprendre les taux d'intérêt, notes d'examens et statistiques. Quand vous voyez 25%, cela signifie 25 sur 100, ou un quart du total. Ce concept facilite la comparaison de proportions indépendamment des quantités réelles impliquées. Par exemple, dire qu'un produit a '30% de réduction' communique immédiatement l'économie sans avoir besoin de connaître le prix original."
        },
        "howItWorks": {
          "title": "Comment Calculer les Pourcentages",
          "content": "Il y a trois calculs fondamentaux de pourcentage. Premièrement, trouver X% de Y : multipliez Y par X et divisez par 100. Par exemple, 15% de 200 est (200 × 15) / 100 = 30. Deuxièmement, trouver quel pourcentage X représente de Y : divisez X par Y et multipliez par 100. Par exemple, 30 représente quel pourcentage de 200 ? (30 / 200) × 100 = 15%. Troisièmement, changement de pourcentage : soustrayez l'ancienne valeur de la nouvelle valeur, divisez par l'ancienne valeur, et multipliez par 100. Si un prix passe de 80€ à 100€, le changement est ((100 - 80) / 80) × 100 = 25% d'augmentation. Chaque formule est simplement un réarrangement de la même relation de base : Partie = Pourcentage × Total / 100."
        },
        "considerations": {
          "title": "Erreurs Courantes de Pourcentage",
          "items": [
            {
              "text": "Points de pourcentage vs pourcentages : Passer de 10% à 15% est une augmentation de 5 points de pourcentage mais une augmentation de 50%",
              "type": "warning"
            },
            {
              "text": "L'ordre compte pour le changement : Une augmentation de 50% suivie d'une diminution de 50% ne revient PAS à la valeur originale",
              "type": "warning"
            },
            {
              "text": "Confusion de base : '20% de 50' et '50% de 20' donnent le même résultat (10), mais représentent différents scénarios",
              "type": "info"
            },
            {
              "text": "Composition : Les changements de pourcentage répétés se composent — 10% de croissance par an pendant 7 ans double approximativement la valeur",
              "type": "info"
            },
            {
              "text": "Erreurs d'arrondi : Utilisez toujours la décimale complète dans les étapes intermédiaires et arrondissez seulement la réponse finale",
              "type": "info"
            },
            {
              "text": "Pourcentages négatifs : Un changement de pourcentage négatif signifie une diminution, pas une erreur",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Utilisations Réelles des Pourcentages",
          "items": [
            {
              "text": "Shopping : Calculez les remises, taxes de vente et prix finaux pour prendre des décisions d'achat éclairées",
              "type": "info"
            },
            {
              "text": "Finance : Taux d'intérêt, retours sur investissement, taux d'inflation et TAP de prêts sont tous exprimés en pourcentages",
              "type": "info"
            },
            {
              "text": "Cuisine : Ajustez les recettes en haut ou en bas d'un pourcentage pour servir plus ou moins de personnes",
              "type": "info"
            },
            {
              "text": "Notes : Convertissez les scores bruts (42 sur 50) en pourcentages (84%) pour une comparaison standardisée",
              "type": "info"
            },
            {
              "text": "Pourboires : Calculez les pourboires de restaurant en trouvant 15-20% de l'addition avant taxes",
              "type": "info"
            },
            {
              "text": "Statistiques : Sondages, enquêtes et résultats de recherche s'appuient sur les pourcentages pour transmettre clairement les résultats",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples Étape par Étape",
          "description": "Voyez comment les problèmes courants de pourcentage sont résolus",
          "examples": [
            {
              "title": "25% de Remise sur Article 80€",
              "steps": [
                "Remise = 80 × 25 / 100 = 20€",
                "Prix soldé = 80€ - 20€ = 60€"
              ],
              "result": "Vous économisez 20€, payez 60€"
            },
            {
              "title": "Score 37 sur 45 à un Examen",
              "steps": [
                "Pourcentage = (37 / 45) × 100",
                "Pourcentage = 0,8222 × 100 = 82,2%"
              ],
              "result": "Votre score est 82,2%"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Comment calculer un pourcentage d'un nombre ?",
          "answer": "Multipliez le nombre par le pourcentage et divisez par 100. Par exemple, 20% de 150 = 150 × 20 / 100 = 30."
        },
        {
          "question": "Comment trouver quel pourcentage un nombre représente d'un autre ?",
          "answer": "Divisez la partie par le tout et multipliez par 100. Par exemple, 45 représente quel pourcentage de 200 ? (45 / 200) × 100 = 22,5%."
        },
        {
          "question": "Comment calculer un changement de pourcentage ?",
          "answer": "Soustrayez l'ancienne valeur de la nouvelle valeur, divisez par l'ancienne valeur, et multipliez par 100. Formule : ((Nouveau - Ancien) / Ancien) × 100."
        },
        {
          "question": "Quelle est la différence entre pourcentage et points de pourcentage ?",
          "answer": "Si un taux d'intérêt passe de 5% à 8%, il a augmenté de 3 points de pourcentage mais de 60% comme changement de pourcentage ((8-5)/5 × 100 = 60%)."
        },
        {
          "question": "Comment convertir une fraction en pourcentage ?",
          "answer": "Divisez le numérateur par le dénominateur et multipliez par 100. Par exemple, 3/8 = 0,375 × 100 = 37,5%."
        },
        {
          "question": "Comment inverser un pourcentage pour trouver la valeur originale ?",
          "answer": "Si vous connaissez la valeur finale après une augmentation/diminution de pourcentage, divisez par (1 + taux/100) pour les augmentations ou (1 - taux/100) pour les diminutions. Exemple : 120€ après une augmentation de 20% signifie que l'original était 120 / 1,20 = 100€."
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
      "name": "Prozentrechner",
      "slug": "prozent-rechner",
      "subtitle": "Berechnen Sie Prozentsätze sofort — finden Sie X% von Y, wie viel Prozent X von Y ist, oder die prozentuale Veränderung zwischen zwei Zahlen.",
      "breadcrumb": "Prozent",
      "seo": {
        "title": "Prozentrechner - Schnelles & Kostenloses Online-Tool",
        "description": "Berechnen Sie Prozentsätze einfach. Finden Sie heraus, was X% von Y ist, wie viel Prozent eine Zahl von einer anderen ist, oder die prozentuale Veränderung zwischen Werten. Kostenlos und sofort.",
        "shortDescription": "Berechnen Sie Prozentsätze schnell und einfach online.",
        "keywords": [
          "prozentrechner",
          "prozent rechner",
          "prozent berechnen",
          "wie viel prozent ist",
          "prozentuale veränderung",
          "kostenloser prozentrechner",
          "online prozent tool",
          "prozent formel"
        ]
      },
      "inputs": {
        "mode": {
          "label": "Berechnungsart",
          "helpText": "Wählen Sie aus, was Sie berechnen möchten",
          "options": {
            "whatIsXPercentOfY": "Was sind X% von Y?",
            "xIsWhatPercentOfY": "X ist wie viel % von Y?",
            "percentageChange": "Prozentuale Veränderung"
          }
        },
        "percentValue": {
          "label": "Prozentsatz",
          "helpText": "Geben Sie den Prozentsatz ein"
        },
        "ofValue": {
          "label": "Von-Wert",
          "helpText": "Die Gesamtmenge oder Grundzahl"
        },
        "isValue": {
          "label": "Ist-Wert",
          "helpText": "Der Teil oder Anteil"
        },
        "totalValue": {
          "label": "Gesamt",
          "helpText": "Die Gesamtmenge oder Grundzahl"
        },
        "fromValue": {
          "label": "Von-Wert",
          "helpText": "Der ursprüngliche Wert"
        },
        "toValue": {
          "label": "Zu-Wert",
          "helpText": "Der neue Wert"
        }
      },
      "results": {
        "answer": {
          "label": "Antwort"
        },
        "formula": {
          "label": "Verwendete Formel"
        },
        "breakdown": {
          "label": "Schritt-für-Schritt"
        }
      },
      "presets": {
        "tipCalc": {
          "label": "18% Trinkgeld auf 85€",
          "description": "Restaurant-Trinkgeld-Berechnung"
        },
        "discount": {
          "label": "25% Rabatt auf 120€",
          "description": "Einkaufsrabatt"
        },
        "gradeCalc": {
          "label": "42 von 50",
          "description": "Notenprozentsatz"
        }
      },
      "values": {
        "%": "%",
        "of": "von",
        "is": "ist",
        "increase": "Erhöhung",
        "decrease": "Verringerung"
      },
      "formats": {
        "summary": "{answer}"
      },
      "infoCards": {
        "metrics": {
          "title": "Ihr Ergebnis",
          "items": [
            {
              "label": "Antwort",
              "valueKey": "answer"
            },
            {
              "label": "Berechnung",
              "valueKey": "formula"
            },
            {
              "label": "Dezimal",
              "valueKey": "decimal"
            },
            {
              "label": "Bruch",
              "valueKey": "fraction"
            }
          ]
        },
        "details": {
          "title": "Schnellreferenz",
          "items": [
            {
              "label": "10%",
              "valueKey": "ref10"
            },
            {
              "label": "25%",
              "valueKey": "ref25"
            },
            {
              "label": "50%",
              "valueKey": "ref50"
            },
            {
              "label": "75%",
              "valueKey": "ref75"
            }
          ]
        },
        "tips": {
          "title": "Prozent-Tipps",
          "items": [
            "Um 10% zu finden, verschieben Sie einfach das Komma um eine Stelle nach links",
            "Um 50% zu finden, teilen Sie die Zahl einfach durch 2",
            "Um 25% zu finden, teilen Sie durch 4 oder halbieren Sie das 50%-Ergebnis",
            "Prozentuale Erhöhung = (neu - alt) / alt × 100"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Prozentsatz?",
          "content": "Ein Prozentsatz ist eine Art, eine Zahl als Bruchteil von 100 auszudrücken. Das Wort stammt vom lateinischen 'per centum', was 'je hundert' bedeutet. Prozentsätze werden überall im täglichen Leben verwendet — von der Berechnung von Rabatten und Trinkgeldern bis hin zum Verstehen von Zinssätzen, Testergebnissen und Statistiken. Wenn Sie 25% sehen, bedeutet das 25 von je 100, oder ein Viertel des Gesamten. Das Konzept macht es einfach, Proportionen zu vergleichen, unabhängig von den tatsächlich beteiligten Mengen. Zum Beispiel vermittelt die Aussage, ein Produkt sei '30% reduziert', sofort die Ersparnis, ohne den ursprünglichen Preis kennen zu müssen."
        },
        "howItWorks": {
          "title": "Wie man Prozentsätze berechnet",
          "content": "Es gibt drei grundlegende Prozentberechnungen. Erstens, X% von Y finden: Multiplizieren Sie Y mit X und teilen durch 100. Zum Beispiel, 15% von 200 ist (200 × 15) / 100 = 30. Zweitens, finden, wie viel Prozent X von Y ist: Teilen Sie X durch Y und multiplizieren mit 100. Zum Beispiel, 30 ist wie viel Prozent von 200? (30 / 200) × 100 = 15%. Drittens, prozentuale Veränderung: Subtrahieren Sie den alten Wert vom neuen Wert, teilen durch den alten Wert und multiplizieren mit 100. Wenn ein Preis von 80€ auf 100€ steigt, ist die Veränderung ((100 - 80) / 80) × 100 = 25% Erhöhung. Jede Formel ist einfach eine Umstellung derselben grundlegenden Beziehung: Teil = Prozentsatz × Ganzes / 100."
        },
        "considerations": {
          "title": "Häufige Prozent-Fehler",
          "items": [
            {
              "text": "Prozentpunkte vs. Prozentsätze: Von 10% auf 15% zu gehen ist eine 5-Prozentpunkte-Erhöhung, aber eine 50%-Erhöhung",
              "type": "warning"
            },
            {
              "text": "Reihenfolge ist wichtig bei Veränderungen: Eine 50%-Erhöhung gefolgt von einer 50%-Verringerung führt NICHT zum ursprünglichen Wert zurück",
              "type": "warning"
            },
            {
              "text": "Basis-Verwirrung: '20% von 50' und '50% von 20' ergeben dasselbe Resultat (10), repräsentieren aber verschiedene Szenarien",
              "type": "info"
            },
            {
              "text": "Zinseszinseffekt: Wiederholte prozentuale Veränderungen sind kumulativ — 10% Wachstum pro Jahr für 7 Jahre verdoppelt etwa den Wert",
              "type": "info"
            },
            {
              "text": "Rundungsfehler: Verwenden Sie immer die volle Dezimalzahl in Zwischenschritten und runden nur das Endergebnis",
              "type": "info"
            },
            {
              "text": "Negative Prozentsätze: Eine negative prozentuale Veränderung bedeutet eine Verringerung, nicht einen Fehler",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Prozent-Anwendungen im echten Leben",
          "items": [
            {
              "text": "Einkaufen: Berechnen Sie Rabatte, Mehrwertsteuer und Endpreise für informierte Kaufentscheidungen",
              "type": "info"
            },
            {
              "text": "Finanzen: Zinssätze, Anlagerenditen, Inflationsraten und Kreditzinsen werden alle als Prozentsätze ausgedrückt",
              "type": "info"
            },
            {
              "text": "Kochen: Skalieren Sie Rezepte um einen Prozentsatz nach oben oder unten, um mehr oder weniger Personen zu bedienen",
              "type": "info"
            },
            {
              "text": "Noten: Konvertieren Sie Rohwerte (42 von 50) in Prozentsätze (84%) für standardisierten Vergleich",
              "type": "info"
            },
            {
              "text": "Trinkgeld: Berechnen Sie Restaurant-Trinkgelder durch Finden von 15-20% der Rechnung vor Steuern",
              "type": "info"
            },
            {
              "text": "Statistiken: Umfragen und Forschungsergebnisse beruhen auf Prozentsätzen, um Erkenntnisse klar zu vermitteln",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Schritt-für-Schritt-Beispiele",
          "description": "Sehen Sie, wie häufige Prozentprobleme gelöst werden",
          "examples": [
            {
              "title": "25% Rabatt auf 80€ Artikel",
              "steps": [
                "Rabatt = 80 × 25 / 100 = 20€",
                "Verkaufspreis = 80€ - 20€ = 60€"
              ],
              "result": "Sie sparen 20€ und zahlen 60€"
            },
            {
              "title": "Punktzahl 37 von 45 in einem Test",
              "steps": [
                "Prozentsatz = (37 / 45) × 100",
                "Prozentsatz = 0,8222 × 100 = 82,2%"
              ],
              "result": "Ihre Punktzahl ist 82,2%"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie berechne ich einen Prozentsatz einer Zahl?",
          "answer": "Multiplizieren Sie die Zahl mit dem Prozentsatz und teilen durch 100. Zum Beispiel, 20% von 150 = 150 × 20 / 100 = 30."
        },
        {
          "question": "Wie finde ich heraus, welcher Prozentsatz eine Zahl von einer anderen ist?",
          "answer": "Teilen Sie den Teil durch das Ganze und multiplizieren mit 100. Zum Beispiel, 45 ist wie viel Prozent von 200? (45 / 200) × 100 = 22,5%."
        },
        {
          "question": "Wie berechne ich prozentuale Veränderung?",
          "answer": "Subtrahieren Sie den alten Wert vom neuen Wert, teilen durch den alten Wert und multiplizieren mit 100. Formel: ((Neu - Alt) / Alt) × 100."
        },
        {
          "question": "Was ist der Unterschied zwischen Prozentsatz und Prozentpunkten?",
          "answer": "Wenn ein Zinssatz von 5% auf 8% steigt, erhöhte er sich um 3 Prozentpunkte, aber um 60% als prozentuale Veränderung ((8-5)/5 × 100 = 60%)."
        },
        {
          "question": "Wie konvertiere ich einen Bruch in einen Prozentsatz?",
          "answer": "Teilen Sie den Zähler durch den Nenner und multiplizieren mit 100. Zum Beispiel, 3/8 = 0,375 × 100 = 37,5%."
        },
        {
          "question": "Wie kehre ich einen Prozentsatz um, um den ursprünglichen Wert zu finden?",
          "answer": "Wenn Sie den Endwert nach einer prozentualen Erhöhung/Verringerung kennen, teilen Sie durch (1 + Rate/100) für Erhöhungen oder (1 - Rate/100) für Verringerungen. Beispiel: 120€ nach einer 20%-Erhöhung bedeutet, das Original war 120 / 1,20 = 100€."
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
      id: "mode",
      type: "select",
      defaultValue: "whatIsXPercentOfY",
      options: [
        { value: "whatIsXPercentOfY" },
        { value: "xIsWhatPercentOfY" },
        { value: "percentageChange" },
      ],
    },
    {
      id: "percentValue",
      type: "number",
      defaultValue: null,
      placeholder: "15",
      suffix: "%",
      showWhen: { field: "mode", value: "whatIsXPercentOfY" },
    },
    {
      id: "ofValue",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      showWhen: { field: "mode", value: "whatIsXPercentOfY" },
    },
    {
      id: "isValue",
      type: "number",
      defaultValue: null,
      placeholder: "30",
      showWhen: { field: "mode", value: "xIsWhatPercentOfY" },
    },
    {
      id: "totalValue",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      showWhen: { field: "mode", value: "xIsWhatPercentOfY" },
    },
    {
      id: "fromValue",
      type: "number",
      defaultValue: null,
      placeholder: "80",
      showWhen: { field: "mode", value: "percentageChange" },
    },
    {
      id: "toValue",
      type: "number",
      defaultValue: null,
      placeholder: "100",
      showWhen: { field: "mode", value: "percentageChange" },
    },
  ],

  inputGroups: [],

  results: [
    { id: "answer", type: "primary", format: "text" },
    { id: "formula", type: "secondary", format: "text" },
    { id: "breakdown", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "🔢", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "Khan Academy",
      year: "2024",
      title: "Intro to Percentages",
      source: "Khan Academy",
      url: "https://www.khanacademy.org/math/pre-algebra/pre-algebra-ratios-rates/pre-algebra-percent-problems/v/finding-a-percentage",
    },
    {
      authors: "National Center for Education Statistics",
      year: "2024",
      title: "Mathematical Literacy: Understanding Percentages",
      source: "NCES",
      url: "https://nces.ed.gov/",
    },
  ],

  hero: {
    icon: "📊",
  },

  sidebar: {},

  features: {},

  relatedCalculators: ["tip-calculator", "discount-calculator", "grade-calculator", "gpa-calculator"],

  ads: {},
};

export function calculatePercentageCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const mode = values.mode as string;

  // Mode 1: What is X% of Y?
  if (mode === "whatIsXPercentOfY") {
    const percent = values.percentValue as number | null;
    const ofVal = values.ofValue as number | null;

    if (percent === null || percent === undefined || ofVal === null || ofVal === undefined) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const answer = (ofVal * percent) / 100;
    const pct = v["%"] || "%";

    // Quick reference values
    const ref10 = (ofVal * 10) / 100;
    const ref25 = (ofVal * 25) / 100;
    const ref50 = (ofVal * 50) / 100;
    const ref75 = (ofVal * 75) / 100;

    return {
      values: { answer, decimal: answer, ref10, ref25, ref50, ref75 },
      formatted: {
        answer: `${fmtNum(answer)}`,
        formula: `${percent}${pct} of ${fmtNum(ofVal)} = ${fmtNum(answer)}`,
        breakdown: `${fmtNum(ofVal)} × ${percent} / 100 = ${fmtNum(answer)}`,
        decimal: `${answer.toFixed(4)}`,
        fraction: simpleFraction(percent, 100),
        ref10: `${fmtNum(ref10)}`,
        ref25: `${fmtNum(ref25)}`,
        ref50: `${fmtNum(ref50)}`,
        ref75: `${fmtNum(ref75)}`,
      },
      summary:
        f.summary?.replace("{answer}", `${percent}% of ${fmtNum(ofVal)} = ${fmtNum(answer)}`) ||
        `${percent}% of ${fmtNum(ofVal)} = ${fmtNum(answer)}`,
      isValid: true,
    };
  }

  // Mode 2: X is what % of Y?
  if (mode === "xIsWhatPercentOfY") {
    const isVal = values.isValue as number | null;
    const totalVal = values.totalValue as number | null;

    if (isVal === null || isVal === undefined || totalVal === null || totalVal === undefined || totalVal === 0) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const answer = (isVal / totalVal) * 100;
    const pct = v["%"] || "%";

    const ref10 = (totalVal * 10) / 100;
    const ref25 = (totalVal * 25) / 100;
    const ref50 = (totalVal * 50) / 100;
    const ref75 = (totalVal * 75) / 100;

    return {
      values: { answer, decimal: isVal / totalVal, ref10, ref25, ref50, ref75 },
      formatted: {
        answer: `${answer.toFixed(2)}${pct}`,
        formula: `${fmtNum(isVal)} is ${answer.toFixed(2)}${pct} of ${fmtNum(totalVal)}`,
        breakdown: `(${fmtNum(isVal)} / ${fmtNum(totalVal)}) × 100 = ${answer.toFixed(2)}${pct}`,
        decimal: `${(isVal / totalVal).toFixed(4)}`,
        fraction: simpleFraction(Math.round(answer * 100), 10000),
        ref10: `${fmtNum(ref10)}`,
        ref25: `${fmtNum(ref25)}`,
        ref50: `${fmtNum(ref50)}`,
        ref75: `${fmtNum(ref75)}`,
      },
      summary:
        f.summary?.replace("{answer}", `${fmtNum(isVal)} is ${answer.toFixed(2)}% of ${fmtNum(totalVal)}`) ||
        `${fmtNum(isVal)} is ${answer.toFixed(2)}% of ${fmtNum(totalVal)}`,
      isValid: true,
    };
  }

  // Mode 3: Percentage change
  if (mode === "percentageChange") {
    const fromVal = values.fromValue as number | null;
    const toVal = values.toValue as number | null;

    if (fromVal === null || fromVal === undefined || toVal === null || toVal === undefined || fromVal === 0) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const change = ((toVal - fromVal) / Math.abs(fromVal)) * 100;
    const diff = toVal - fromVal;
    const pct = v["%"] || "%";
    const direction = change >= 0 ? (v["increase"] || "increase") : (v["decrease"] || "decrease");

    const ref10 = fromVal * 0.1;
    const ref25 = fromVal * 0.25;
    const ref50 = fromVal * 0.5;
    const ref75 = fromVal * 0.75;

    return {
      values: { answer: change, decimal: change / 100, ref10, ref25, ref50, ref75 },
      formatted: {
        answer: `${Math.abs(change).toFixed(2)}${pct} ${direction}`,
        formula: `${fmtNum(fromVal)} → ${fmtNum(toVal)} = ${change >= 0 ? "+" : ""}${change.toFixed(2)}${pct}`,
        breakdown: `((${fmtNum(toVal)} - ${fmtNum(fromVal)}) / |${fmtNum(fromVal)}|) × 100 = ${change.toFixed(2)}${pct}`,
        decimal: `${(change / 100).toFixed(4)}`,
        fraction: `${change >= 0 ? "+" : ""}${fmtNum(diff)}`,
        ref10: `${fmtNum(fromVal + ref10)}`,
        ref25: `${fmtNum(fromVal + ref25)}`,
        ref50: `${fmtNum(fromVal + ref50)}`,
        ref75: `${fmtNum(fromVal + ref75)}`,
      },
      summary:
        f.summary?.replace("{answer}", `${Math.abs(change).toFixed(2)}% ${direction} from ${fmtNum(fromVal)} to ${fmtNum(toVal)}`) ||
        `${Math.abs(change).toFixed(2)}% ${direction} from ${fmtNum(fromVal)} to ${fmtNum(toVal)}`,
      isValid: true,
    };
  }

  return { values: {}, formatted: {}, summary: "", isValid: false };
}

// --- Helper functions ---

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.001) return val.toExponential(2);
  if (Math.abs(val) < 1000) {
    const s = val.toFixed(4).replace(/\.?0+$/, "");
    return s;
  }
  return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function simpleFraction(num: number, den: number): string {
  const g = gcd(Math.abs(Math.round(num)), Math.abs(Math.round(den)));
  if (g === 0) return `${num}/${den}`;
  return `${Math.round(num) / g}/${Math.round(den) / g}`;
}

function gcd(a: number, b: number): number {
  if (b === 0) return a;
  return gcd(b, a % b);
}

export default percentageCalculatorConfig;
