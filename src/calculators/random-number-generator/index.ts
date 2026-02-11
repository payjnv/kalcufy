import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

// =============================================================================
// RANDOM NUMBER GENERATOR - V4 Engine
// Generate random numbers with various options: range, quantity, no repeats
// Following ALL rules from: ENGINE_V4_COMPLETE_GUIDE.md, RULE_WIDTH_HALF_UPDATE.md,
// KALCUFY_BUG_FIXES_REFERENCE.md
// =============================================================================

export const randomNumberGeneratorConfig: CalculatorConfigV4 = {
  id: "random-number-generator",
  version: "4.0",
  category: "math",
  icon: "🎲",

  // ===========================================================================
  // PRESETS - ALWAYS include icon (RULE from ENGINE_V4)
  // ===========================================================================
  presets: [
    {
      id: "coinFlip",
      icon: "🪙",
      values: {
        minValue: 1,
        maxValue: 2,
        quantity: 1,
        allowRepeats: "yes",
        sortResults: "no",
      },
    },
    {
      id: "diceRoll",
      icon: "🎲",
      values: {
        minValue: 1,
        maxValue: 6,
        quantity: 1,
        allowRepeats: "yes",
        sortResults: "no",
      },
    },
    {
      id: "lottery6of49",
      icon: "🎱",
      values: {
        minValue: 1,
        maxValue: 49,
        quantity: 6,
        allowRepeats: "no",
        sortResults: "yes",
      },
    },
    {
      id: "percentage",
      icon: "📊",
      values: {
        minValue: 1,
        maxValue: 100,
        quantity: 1,
        allowRepeats: "yes",
        sortResults: "no",
      },
    },
  ],

  // ===========================================================================
  // TRANSLATIONS - English only (script translates later)
  // ===========================================================================
  t: {
    en: {
      name: "Random Number Generator",
      slug: "random-number-generator",
      subtitle:
        "Generate random numbers instantly. Set your range, quantity, and options for lottery picks, dice rolls, or any random selection.",
      breadcrumb: "Random Number",

      // SEO: title 50-60 chars, description 120-155 chars, keywords 5-8
      seo: {
        title: "Random Number Generator - Free Online Number Picker",
        description:
          "Generate random numbers instantly. Pick lottery numbers, roll dice, or create random selections with customizable range and quantity options.",
        shortDescription: "Generate random numbers within any range",
        keywords: [
          "random number generator",
          "random number picker",
          "lottery number generator",
          "dice roller",
          "random selection",
          "number randomizer",
          "free random generator",
          "random integer generator",
        ],
      },

      calculator: { yourInformation: "Generator Settings" },
      ui: {
        yourInformation: "Generator Settings",
        calculate: "Generate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        minValue: {
          label: "Minimum Value",
          helpText: "Lowest number in the range (inclusive)",
        },
        maxValue: {
          label: "Maximum Value",
          helpText: "Highest number in the range (inclusive)",
        },
        quantity: {
          label: "Quantity",
          helpText: "How many random numbers to generate",
        },
        allowRepeats: {
          label: "Allow Repeats",
          helpText: "Can the same number appear multiple times?",
          options: {
            yes: "Yes (with replacement)",
            no: "No (unique numbers only)",
          },
        },
        sortResults: {
          label: "Sort Results",
          helpText: "Sort the generated numbers",
          options: {
            yes: "Yes (ascending)",
            no: "No (random order)",
          },
        },
        excludeNumbers: {
          label: "Exclude Numbers",
          helpText: "Numbers to exclude (comma-separated)",
        },
      },

      results: {
        randomNumbers: { label: "Random Numbers" },
        range: { label: "Range" },
        quantity: { label: "Quantity" },
        sum: { label: "Sum" },
        average: { label: "Average" },
      },

      presets: {
        coinFlip: {
          label: "Coin Flip",
          description: "1 = Heads, 2 = Tails",
        },
        diceRoll: {
          label: "Dice Roll",
          description: "Roll a 6-sided die",
        },
        lottery6of49: {
          label: "Lottery 6/49",
          description: "Pick 6 numbers from 1-49",
        },
        percentage: {
          label: "Random %",
          description: "Random 1-100",
        },
      },

      // CRITICAL: All units/labels for calculate() - NO HARDCODING
      values: {
        "to": "to",
        "numbers": "numbers",
        "number": "number",
        "sum": "Sum",
        "average": "Average",
        "range": "Range",
        "generated": "Generated",
      },

      formats: {
        summary: "Generated: {numbers}",
        range: "{min} to {max}",
      },

      // INFO CARDS: 2 list + 1 horizontal tips (tips ALWAYS last)
      infoCards: {
        results: {
          title: "Generated Numbers",
          items: [
            { label: "Numbers", valueKey: "randomNumbers" },
            { label: "Range", valueKey: "range" },
            { label: "Sum", valueKey: "sum" },
            { label: "Average", valueKey: "average" },
          ],
        },
        stats: {
          title: "Statistics",
          items: [
            { label: "Quantity", valueKey: "quantity" },
            { label: "Minimum", valueKey: "minGenerated" },
            { label: "Maximum", valueKey: "maxGenerated" },
            { label: "Spread", valueKey: "spread" },
          ],
        },
        tips: {
          title: "Quick Tips",
          items: [
            "Use 'No Repeats' for lottery-style draws",
            "Coin flip: set range 1-2 (1=Heads, 2=Tails)",
            "Dice roll: set range 1-6 for standard die",
            "Click Generate again for new random numbers",
          ],
        },
      },

      // EDUCATION: 2 prose + 2 list + 1 code-example
      education: {
        whatIs: {
          title: "What is a Random Number Generator?",
          content:
            "A random number generator (RNG) is a tool that produces numbers without any predictable pattern. True randomness is surprisingly difficult to achieve — even in nature, most phenomena follow statistical patterns. Computer-based RNGs use complex algorithms called pseudo-random number generators (PRNGs) that produce sequences of numbers that appear random for practical purposes. While not truly random in a philosophical sense, modern PRNGs are sufficient for games, simulations, sampling, and most everyday applications.",
        },
        howItWorks: {
          title: "How Random Number Generation Works",
          content:
            "Our random number generator uses cryptographically secure algorithms built into modern web browsers. When you click Generate, the system creates random numbers within your specified range. For 'no repeats' mode, it uses a shuffling algorithm similar to dealing cards — once a number is picked, it's removed from the pool. The quality of randomness is high enough for fair games, random selections, and statistical sampling, though not suitable for cryptographic security applications.",
        },
        useCases: {
          title: "Common Use Cases",
          items: [
            { text: "Lottery: Pick unique numbers from a range (e.g., 6 from 1-49)", type: "info" },
            { text: "Games: Roll dice, flip coins, draw cards", type: "info" },
            { text: "Raffles: Pick random winners from numbered entries", type: "info" },
            { text: "Decisions: Let chance decide between options", type: "info" },
            { text: "Testing: Generate random test data or samples", type: "warning" },
            { text: "Statistics: Random sampling for surveys or studies", type: "warning" },
          ],
        },
        fairness: {
          title: "Ensuring Fairness",
          items: [
            { text: "Each number has equal probability of being selected", type: "info" },
            { text: "Previous results don't affect future outcomes", type: "info" },
            { text: "No pattern or sequence can be predicted", type: "info" },
            { text: "'No repeats' ensures every number appears at most once", type: "info" },
            { text: "Results are generated client-side (in your browser)", type: "info" },
            { text: "Refresh or generate again for completely new results", type: "info" },
          ],
        },
        examples: {
          title: "Example Use Cases",
          description: "How to use the random number generator",
          examples: [
            {
              title: "Pick 6 Lottery Numbers (1-49)",
              steps: [
                "Set Minimum: 1",
                "Set Maximum: 49",
                "Set Quantity: 6",
                "Allow Repeats: No",
                "Sort Results: Yes (optional)",
              ],
              result: "Example: 7, 14, 23, 31, 38, 45",
            },
            {
              title: "Roll 3 Six-Sided Dice",
              steps: [
                "Set Minimum: 1",
                "Set Maximum: 6",
                "Set Quantity: 3",
                "Allow Repeats: Yes",
                "Click Generate",
              ],
              result: "Example: 2, 5, 3 (Sum: 10)",
            },
          ],
        },
      },

      // FAQs: 6+ required
      faqs: [
        {
          question: "How do I generate a random number between 1 and 100?",
          answer:
            "Set the Minimum Value to 1 and Maximum Value to 100, keep Quantity at 1, and click Generate. You'll get a random integer between 1 and 100, inclusive.",
        },
        {
          question: "How do I pick lottery numbers?",
          answer:
            "Set your range (e.g., 1-49), set Quantity to how many numbers you need (e.g., 6), select 'No' for Allow Repeats, and optionally sort the results. This ensures unique numbers like a real lottery draw.",
        },
        {
          question: "Are the numbers truly random?",
          answer:
            "The generator uses cryptographically secure pseudo-random algorithms that produce statistically random results. While not 'true' random (which requires physical phenomena), they're perfectly suitable for games, selections, and most applications.",
        },
        {
          question: "What's the difference between 'Allow Repeats' Yes and No?",
          answer:
            "'Yes' (with replacement) means the same number can appear multiple times, like rolling dice. 'No' (without replacement) ensures each number appears only once, like drawing from a deck of cards or picking lottery numbers.",
        },
        {
          question: "Why can't I generate more numbers than my range allows?",
          answer:
            "When 'Allow Repeats' is off, you can only generate as many unique numbers as exist in your range. For example, with range 1-10, you can generate at most 10 unique numbers. Enable 'Allow Repeats' to generate more.",
        },
        {
          question: "How do I exclude specific numbers from the results?",
          answer:
            "Enter the numbers you want to exclude in the 'Exclude Numbers' field, separated by commas (e.g., '7, 13, 21'). These numbers will never appear in your generated results.",
        },
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
        calculate: "Generate",
        reset: "Reset",
        pdf: "PDF",
        csv: "CSV",
        excel: "Excel",
        save: "Save",
        saved: "Saved",
        saving: "Saving...",
      },

      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: {
        mobileResults: "Results",
        closeModal: "Close",
        openMenu: "Menu",
      },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Generador de Números Aleatorios",
      "slug": "calculadora-generador-numeros-aleatorios",
      "subtitle": "Genera números aleatorios al instante. Establece tu rango, cantidad y opciones para sorteos de lotería, tiradas de dados o cualquier selección aleatoria.",
      "breadcrumb": "Número Aleatorio",
      "seo": {
        "title": "Generador de Números Aleatorios - Selector Online Gratis",
        "description": "Genera números aleatorios al instante. Elige números de lotería, tira dados o crea selecciones aleatorias con opciones personalizables.",
        "shortDescription": "Genera números aleatorios dentro de cualquier rango",
        "keywords": [
          "generador números aleatorios",
          "selector números aleatorios",
          "generador números lotería",
          "tirador dados",
          "selección aleatoria",
          "aleatorizador números",
          "generador aleatorio gratis",
          "generador enteros aleatorios"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "minValue": {
          "label": "Valor Mínimo",
          "helpText": "Número más bajo del rango (inclusivo)"
        },
        "maxValue": {
          "label": "Valor Máximo",
          "helpText": "Número más alto del rango (inclusivo)"
        },
        "quantity": {
          "label": "Cantidad",
          "helpText": "Cuántos números aleatorios generar"
        },
        "allowRepeats": {
          "label": "Permitir Repeticiones",
          "helpText": "¿Puede aparecer el mismo número varias veces?",
          "options": {
            "yes": "Sí (con reemplazo)",
            "no": "No (solo números únicos)"
          }
        },
        "sortResults": {
          "label": "Ordenar Resultados",
          "helpText": "Ordenar los números generados",
          "options": {
            "yes": "Sí (ascendente)",
            "no": "No (orden aleatorio)"
          }
        },
        "excludeNumbers": {
          "label": "Excluir Números",
          "helpText": "Números a excluir (separados por comas)"
        }
      },
      "results": {
        "randomNumbers": {
          "label": "Números Aleatorios"
        },
        "range": {
          "label": "Rango"
        },
        "quantity": {
          "label": "Cantidad"
        },
        "sum": {
          "label": "Suma"
        },
        "average": {
          "label": "Promedio"
        }
      },
      "presets": {
        "coinFlip": {
          "label": "Lanzar Moneda",
          "description": "1 = Cara, 2 = Cruz"
        },
        "diceRoll": {
          "label": "Tirar Dado",
          "description": "Tirar un dado de 6 caras"
        },
        "lottery6of49": {
          "label": "Lotería 6/49",
          "description": "Elegir 6 números del 1-49"
        },
        "percentage": {
          "label": "% Aleatorio",
          "description": "Aleatorio 1-100"
        }
      },
      "values": {
        "to": "a",
        "numbers": "números",
        "number": "número",
        "sum": "Suma",
        "average": "Promedio",
        "range": "Rango",
        "generated": "Generado"
      },
      "formats": {
        "summary": "Generado: {numbers}",
        "range": "{min} a {max}"
      },
      "infoCards": {
        "results": {
          "title": "Números Generados",
          "items": [
            {
              "label": "Números",
              "valueKey": "randomNumbers"
            },
            {
              "label": "Rango",
              "valueKey": "range"
            },
            {
              "label": "Suma",
              "valueKey": "sum"
            },
            {
              "label": "Promedio",
              "valueKey": "average"
            }
          ]
        },
        "stats": {
          "title": "Estadísticas",
          "items": [
            {
              "label": "Cantidad",
              "valueKey": "quantity"
            },
            {
              "label": "Mínimo",
              "valueKey": "minGenerated"
            },
            {
              "label": "Máximo",
              "valueKey": "maxGenerated"
            },
            {
              "label": "Rango",
              "valueKey": "spread"
            }
          ]
        },
        "tips": {
          "title": "Consejos Rápidos",
          "items": [
            "Usa 'Sin Repeticiones' para sorteos tipo lotería",
            "Lanzar moneda: rango 1-2 (1=Cara, 2=Cruz)",
            "Tirar dado: rango 1-6 para dado estándar",
            "Haz clic en Generar otra vez para números nuevos"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es un Generador de Números Aleatorios?",
          "content": "Un generador de números aleatorios (GNA) es una herramienta que produce números sin ningún patrón predecible. La verdadera aleatoriedad es sorprendentemente difícil de lograr — incluso en la naturaleza, la mayoría de fenómenos siguen patrones estadísticos. Los GNA basados en computadora usan algoritmos complejos llamados generadores de números pseudoaleatorios (GNPA) que producen secuencias de números que parecen aleatorias para propósitos prácticos. Aunque no son verdaderamente aleatorios en sentido filosófico, los GNPA modernos son suficientes para juegos, simulaciones, muestreo y la mayoría de aplicaciones cotidianas."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Generación de Números Aleatorios",
          "content": "Nuestro generador de números aleatorios usa algoritmos criptográficamente seguros integrados en navegadores web modernos. Cuando haces clic en Generar, el sistema crea números aleatorios dentro de tu rango especificado. Para el modo 'sin repeticiones', usa un algoritmo de mezcla similar a repartir cartas — una vez que se elige un número, se elimina del grupo. La calidad de la aleatoriedad es suficientemente alta para juegos justos, selecciones aleatorias y muestreo estadístico, aunque no es adecuada para aplicaciones de seguridad criptográfica."
        },
        "useCases": {
          "title": "Casos de Uso Comunes",
          "items": [
            {
              "text": "Lotería: Elegir números únicos de un rango (ej. 6 del 1-49)",
              "type": "info"
            },
            {
              "text": "Juegos: Tirar dados, lanzar monedas, sacar cartas",
              "type": "info"
            },
            {
              "text": "Rifas: Elegir ganadores aleatorios de entradas numeradas",
              "type": "info"
            },
            {
              "text": "Decisiones: Dejar que el azar decida entre opciones",
              "type": "info"
            },
            {
              "text": "Pruebas: Generar datos de prueba aleatorios o muestras",
              "type": "warning"
            },
            {
              "text": "Estadística: Muestreo aleatorio para encuestas o estudios",
              "type": "warning"
            }
          ]
        },
        "fairness": {
          "title": "Garantizando la Equidad",
          "items": [
            {
              "text": "Cada número tiene igual probabilidad de ser seleccionado",
              "type": "info"
            },
            {
              "text": "Los resultados anteriores no afectan resultados futuros",
              "type": "info"
            },
            {
              "text": "Ningún patrón o secuencia puede ser predicha",
              "type": "info"
            },
            {
              "text": "'Sin repeticiones' asegura que cada número aparezca máximo una vez",
              "type": "info"
            },
            {
              "text": "Los resultados se generan del lado del cliente (en tu navegador)",
              "type": "info"
            },
            {
              "text": "Actualiza o genera de nuevo para resultados completamente nuevos",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Casos de Uso",
          "description": "Cómo usar el generador de números aleatorios",
          "examples": [
            {
              "title": "Elegir 6 Números de Lotería (1-49)",
              "steps": [
                "Establecer Mínimo: 1",
                "Establecer Máximo: 49",
                "Establecer Cantidad: 6",
                "Permitir Repeticiones: No",
                "Ordenar Resultados: Sí (opcional)"
              ],
              "result": "Ejemplo: 7, 14, 23, 31, 38, 45"
            },
            {
              "title": "Tirar 3 Dados de Seis Caras",
              "steps": [
                "Establecer Mínimo: 1",
                "Establecer Máximo: 6",
                "Establecer Cantidad: 3",
                "Permitir Repeticiones: Sí",
                "Hacer clic en Generar"
              ],
              "result": "Ejemplo: 2, 5, 3 (Suma: 10)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cómo genero un número aleatorio entre 1 y 100?",
          "answer": "Establece el Valor Mínimo en 1 y el Valor Máximo en 100, mantén la Cantidad en 1, y haz clic en Generar. Obtendrás un entero aleatorio entre 1 y 100, inclusive."
        },
        {
          "question": "¿Cómo elijo números de lotería?",
          "answer": "Establece tu rango (ej. 1-49), establece la Cantidad a cuántos números necesitas (ej. 6), selecciona 'No' para Permitir Repeticiones, y opcionalmente ordena los resultados. Esto asegura números únicos como un sorteo real de lotería."
        },
        {
          "question": "¿Son los números verdaderamente aleatorios?",
          "answer": "El generador usa algoritmos pseudoaleatorios criptográficamente seguros que producen resultados estadísticamente aleatorios. Aunque no son 'verdaderamente' aleatorios (lo cual requiere fenómenos físicos), son perfectamente adecuados para juegos, selecciones y la mayoría de aplicaciones."
        },
        {
          "question": "¿Cuál es la diferencia entre 'Permitir Repeticiones' Sí y No?",
          "answer": "'Sí' (con reemplazo) significa que el mismo número puede aparecer múltiples veces, como tirar dados. 'No' (sin reemplazo) asegura que cada número aparezca solo una vez, como sacar de una baraja de cartas o elegir números de lotería."
        },
        {
          "question": "¿Por qué no puedo generar más números de los que permite mi rango?",
          "answer": "Cuando 'Permitir Repeticiones' está desactivado, solo puedes generar tantos números únicos como existen en tu rango. Por ejemplo, con rango 1-10, puedes generar máximo 10 números únicos. Habilita 'Permitir Repeticiones' para generar más."
        },
        {
          "question": "¿Cómo excluyo números específicos de los resultados?",
          "answer": "Ingresa los números que quieres excluir en el campo 'Excluir Números', separados por comas (ej. '7, 13, 21'). Estos números nunca aparecerán en tus resultados generados."
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
      "name": "Gerador de Números Aleatórios",
      "slug": "calculadora-gerador-numeros-aleatorios",
      "subtitle": "Gere números aleatórios instantaneamente. Defina sua faixa, quantidade e opções para sorteios de loteria, dados ou qualquer seleção aleatória.",
      "breadcrumb": "Número Aleatório",
      "seo": {
        "title": "Gerador de Números Aleatórios - Seletor Online Gratuito",
        "description": "Gere números aleatórios instantaneamente. Escolha números da loteria, role dados ou crie seleções aleatórias com opções personalizáveis.",
        "shortDescription": "Gere números aleatórios dentro de qualquer faixa",
        "keywords": [
          "gerador de números aleatórios",
          "seletor de números aleatórios",
          "gerador números loteria",
          "rolador de dados",
          "seleção aleatória",
          "randomizador de números",
          "gerador aleatório gratuito",
          "gerador números inteiros"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "minValue": {
          "label": "Valor Mínimo",
          "helpText": "Menor número na faixa (inclusivo)"
        },
        "maxValue": {
          "label": "Valor Máximo",
          "helpText": "Maior número na faixa (inclusivo)"
        },
        "quantity": {
          "label": "Quantidade",
          "helpText": "Quantos números aleatórios gerar"
        },
        "allowRepeats": {
          "label": "Permitir Repetições",
          "helpText": "O mesmo número pode aparecer várias vezes?",
          "options": {
            "yes": "Sim (com substituição)",
            "no": "Não (apenas números únicos)"
          }
        },
        "sortResults": {
          "label": "Ordenar Resultados",
          "helpText": "Ordenar os números gerados",
          "options": {
            "yes": "Sim (crescente)",
            "no": "Não (ordem aleatória)"
          }
        },
        "excludeNumbers": {
          "label": "Excluir Números",
          "helpText": "Números a excluir (separados por vírgula)"
        }
      },
      "results": {
        "randomNumbers": {
          "label": "Números Aleatórios"
        },
        "range": {
          "label": "Faixa"
        },
        "quantity": {
          "label": "Quantidade"
        },
        "sum": {
          "label": "Soma"
        },
        "average": {
          "label": "Média"
        }
      },
      "presets": {
        "coinFlip": {
          "label": "Cara ou Coroa",
          "description": "1 = Cara, 2 = Coroa"
        },
        "diceRoll": {
          "label": "Rolar Dado",
          "description": "Rolar um dado de 6 faces"
        },
        "lottery6of49": {
          "label": "Loteria 6/49",
          "description": "Escolher 6 números de 1-49"
        },
        "percentage": {
          "label": "% Aleatório",
          "description": "Aleatório 1-100"
        }
      },
      "values": {
        "to": "até",
        "numbers": "números",
        "number": "número",
        "sum": "Soma",
        "average": "Média",
        "range": "Faixa",
        "generated": "Gerado"
      },
      "formats": {
        "summary": "Gerado: {numbers}",
        "range": "{min} até {max}"
      },
      "infoCards": {
        "results": {
          "title": "Números Gerados",
          "items": [
            {
              "label": "Números",
              "valueKey": "randomNumbers"
            },
            {
              "label": "Faixa",
              "valueKey": "range"
            },
            {
              "label": "Soma",
              "valueKey": "sum"
            },
            {
              "label": "Média",
              "valueKey": "average"
            }
          ]
        },
        "stats": {
          "title": "Estatísticas",
          "items": [
            {
              "label": "Quantidade",
              "valueKey": "quantity"
            },
            {
              "label": "Mínimo",
              "valueKey": "minGenerated"
            },
            {
              "label": "Máximo",
              "valueKey": "maxGenerated"
            },
            {
              "label": "Amplitude",
              "valueKey": "spread"
            }
          ]
        },
        "tips": {
          "title": "Dicas Rápidas",
          "items": [
            "Use 'Não Repetir' para sorteios estilo loteria",
            "Cara ou coroa: defina faixa 1-2 (1=Cara, 2=Coroa)",
            "Rolar dado: defina faixa 1-6 para dado padrão",
            "Clique Gerar novamente para novos números aleatórios"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é um Gerador de Números Aleatórios?",
          "content": "Um gerador de números aleatórios (GNA) é uma ferramenta que produz números sem qualquer padrão previsível. A verdadeira aleatoriedade é surpreendentemente difícil de alcançar — mesmo na natureza, a maioria dos fenômenos segue padrões estatísticos. Os GNAs baseados em computador usam algoritmos complexos chamados geradores de números pseudo-aleatórios (GNPA) que produzem sequências de números que parecem aleatórios para fins práticos. Embora não sejam verdadeiramente aleatórios no sentido filosófico, os GNPAs modernos são suficientes para jogos, simulações, amostragem e a maioria das aplicações cotidianas."
        },
        "howItWorks": {
          "title": "Como Funciona a Geração de Números Aleatórios",
          "content": "Nosso gerador de números aleatórios usa algoritmos criptograficamente seguros integrados aos navegadores web modernos. Quando você clica em Gerar, o sistema cria números aleatórios dentro da sua faixa especificada. Para o modo 'sem repetições', ele usa um algoritmo de embaralhamento similar a distribuir cartas — uma vez que um número é escolhido, ele é removido do pool. A qualidade da aleatoriedade é alta o suficiente para jogos justos, seleções aleatórias e amostragem estatística, embora não seja adequada para aplicações de segurança criptográfica."
        },
        "useCases": {
          "title": "Casos de Uso Comuns",
          "items": [
            {
              "text": "Loteria: Escolher números únicos de uma faixa (ex: 6 de 1-49)",
              "type": "info"
            },
            {
              "text": "Jogos: Rolar dados, cara ou coroa, sortear cartas",
              "type": "info"
            },
            {
              "text": "Rifas: Escolher vencedores aleatórios de entradas numeradas",
              "type": "info"
            },
            {
              "text": "Decisões: Deixar o acaso decidir entre opções",
              "type": "info"
            },
            {
              "text": "Testes: Gerar dados de teste aleatórios ou amostras",
              "type": "warning"
            },
            {
              "text": "Estatísticas: Amostragem aleatória para pesquisas ou estudos",
              "type": "warning"
            }
          ]
        },
        "fairness": {
          "title": "Garantindo Imparcialidade",
          "items": [
            {
              "text": "Cada número tem probabilidade igual de ser selecionado",
              "type": "info"
            },
            {
              "text": "Resultados anteriores não afetam resultados futuros",
              "type": "info"
            },
            {
              "text": "Nenhum padrão ou sequência pode ser prevista",
              "type": "info"
            },
            {
              "text": "'Sem repetições' garante que cada número apareça no máximo uma vez",
              "type": "info"
            },
            {
              "text": "Resultados são gerados no lado do cliente (no seu navegador)",
              "type": "info"
            },
            {
              "text": "Atualize ou gere novamente para resultados completamente novos",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Casos de Uso",
          "description": "Como usar o gerador de números aleatórios",
          "examples": [
            {
              "title": "Escolher 6 Números da Loteria (1-49)",
              "steps": [
                "Definir Mínimo: 1",
                "Definir Máximo: 49",
                "Definir Quantidade: 6",
                "Permitir Repetições: Não",
                "Ordenar Resultados: Sim (opcional)"
              ],
              "result": "Exemplo: 7, 14, 23, 31, 38, 45"
            },
            {
              "title": "Rolar 3 Dados de Seis Faces",
              "steps": [
                "Definir Mínimo: 1",
                "Definir Máximo: 6",
                "Definir Quantidade: 3",
                "Permitir Repetições: Sim",
                "Clicar Gerar"
              ],
              "result": "Exemplo: 2, 5, 3 (Soma: 10)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Como gero um número aleatório entre 1 e 100?",
          "answer": "Defina o Valor Mínimo como 1 e o Valor Máximo como 100, mantenha a Quantidade em 1 e clique em Gerar. Você obterá um número inteiro aleatório entre 1 e 100, inclusive."
        },
        {
          "question": "Como escolho números da loteria?",
          "answer": "Defina sua faixa (ex: 1-49), defina a Quantidade para quantos números você precisa (ex: 6), selecione 'Não' para Permitir Repetições, e opcionalmente ordene os resultados. Isso garante números únicos como um sorteio real de loteria."
        },
        {
          "question": "Os números são verdadeiramente aleatórios?",
          "answer": "O gerador usa algoritmos pseudo-aleatórios criptograficamente seguros que produzem resultados estatisticamente aleatórios. Embora não sejam 'verdadeiramente' aleatórios (o que requer fenômenos físicos), são perfeitamente adequados para jogos, seleções e a maioria das aplicações."
        },
        {
          "question": "Qual a diferença entre 'Permitir Repetições' Sim e Não?",
          "answer": "'Sim' (com substituição) significa que o mesmo número pode aparecer várias vezes, como rolar dados. 'Não' (sem substituição) garante que cada número apareça apenas uma vez, como tirar de um baralho de cartas ou escolher números da loteria."
        },
        {
          "question": "Por que não posso gerar mais números do que minha faixa permite?",
          "answer": "Quando 'Permitir Repetições' está desativado, você só pode gerar tantos números únicos quantos existem na sua faixa. Por exemplo, com faixa 1-10, você pode gerar no máximo 10 números únicos. Ative 'Permitir Repetições' para gerar mais."
        },
        {
          "question": "Como excluo números específicos dos resultados?",
          "answer": "Digite os números que você quer excluir no campo 'Excluir Números', separados por vírgulas (ex: '7, 13, 21'). Esses números nunca aparecerão nos seus resultados gerados."
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
      "name": "Générateur de Nombres Aléatoires",
      "slug": "calculateur-generateur-nombres-aleatoires",
      "subtitle": "Générez des nombres aléatoires instantanément. Définissez votre plage, quantité et options pour tirages de loterie, lancers de dés ou toute sélection aléatoire.",
      "breadcrumb": "Nombre Aléatoire",
      "seo": {
        "title": "Générateur de Nombres Aléatoires - Sélecteur Gratuit en Ligne",
        "description": "Générez des nombres aléatoires instantanément. Tirez des numéros de loterie, lancez des dés ou créez des sélections aléatoires avec options personnalisables.",
        "shortDescription": "Générez des nombres aléatoires dans n'importe quelle plage",
        "keywords": [
          "générateur nombres aléatoires",
          "sélecteur nombres aléatoires",
          "générateur numéros loterie",
          "lanceur de dés",
          "sélection aléatoire",
          "randomiseur nombres",
          "générateur aléatoire gratuit",
          "générateur entiers aléatoires"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "minValue": {
          "label": "Valeur Minimale",
          "helpText": "Nombre le plus bas de la plage (inclus)"
        },
        "maxValue": {
          "label": "Valeur Maximale",
          "helpText": "Nombre le plus haut de la plage (inclus)"
        },
        "quantity": {
          "label": "Quantité",
          "helpText": "Combien de nombres aléatoires générer"
        },
        "allowRepeats": {
          "label": "Autoriser les Répétitions",
          "helpText": "Le même nombre peut-il apparaître plusieurs fois ?",
          "options": {
            "yes": "Oui (avec remplacement)",
            "no": "Non (nombres uniques seulement)"
          }
        },
        "sortResults": {
          "label": "Trier les Résultats",
          "helpText": "Trier les nombres générés",
          "options": {
            "yes": "Oui (croissant)",
            "no": "Non (ordre aléatoire)"
          }
        },
        "excludeNumbers": {
          "label": "Exclure les Nombres",
          "helpText": "Nombres à exclure (séparés par des virgules)"
        }
      },
      "results": {
        "randomNumbers": {
          "label": "Nombres Aléatoires"
        },
        "range": {
          "label": "Plage"
        },
        "quantity": {
          "label": "Quantité"
        },
        "sum": {
          "label": "Somme"
        },
        "average": {
          "label": "Moyenne"
        }
      },
      "presets": {
        "coinFlip": {
          "label": "Pile ou Face",
          "description": "1 = Pile, 2 = Face"
        },
        "diceRoll": {
          "label": "Lancer de Dé",
          "description": "Lancer un dé à 6 faces"
        },
        "lottery6of49": {
          "label": "Loterie 6/49",
          "description": "Choisir 6 numéros de 1 à 49"
        },
        "percentage": {
          "label": "% Aléatoire",
          "description": "Aléatoire 1-100"
        }
      },
      "values": {
        "to": "à",
        "numbers": "nombres",
        "number": "nombre",
        "sum": "Somme",
        "average": "Moyenne",
        "range": "Plage",
        "generated": "Généré"
      },
      "formats": {
        "summary": "Généré : {numbers}",
        "range": "{min} à {max}"
      },
      "infoCards": {
        "results": {
          "title": "Nombres Générés",
          "items": [
            {
              "label": "Nombres",
              "valueKey": "randomNumbers"
            },
            {
              "label": "Plage",
              "valueKey": "range"
            },
            {
              "label": "Somme",
              "valueKey": "sum"
            },
            {
              "label": "Moyenne",
              "valueKey": "average"
            }
          ]
        },
        "stats": {
          "title": "Statistiques",
          "items": [
            {
              "label": "Quantité",
              "valueKey": "quantity"
            },
            {
              "label": "Minimum",
              "valueKey": "minGenerated"
            },
            {
              "label": "Maximum",
              "valueKey": "maxGenerated"
            },
            {
              "label": "Étendue",
              "valueKey": "spread"
            }
          ]
        },
        "tips": {
          "title": "Conseils Rapides",
          "items": [
            "Utilisez 'Sans Répétitions' pour les tirages de type loterie",
            "Pile ou face : définir plage 1-2 (1=Pile, 2=Face)",
            "Lancer de dé : définir plage 1-6 pour un dé standard",
            "Cliquez Générer à nouveau pour de nouveaux nombres aléatoires"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Générateur de Nombres Aléatoires ?",
          "content": "Un générateur de nombres aléatoires (GNA) est un outil qui produit des nombres sans motif prévisible. Le véritable aléatoire est étonnamment difficile à obtenir — même dans la nature, la plupart des phénomènes suivent des modèles statistiques. Les GNA informatiques utilisent des algorithmes complexes appelés générateurs de nombres pseudo-aléatoires (GNPA) qui produisent des séquences de nombres qui semblent aléatoires à des fins pratiques. Bien qu'ils ne soient pas vraiment aléatoires au sens philosophique, les GNPA modernes sont suffisants pour les jeux, simulations, échantillonnages et la plupart des applications quotidiennes."
        },
        "howItWorks": {
          "title": "Comment Fonctionne la Génération de Nombres Aléatoires",
          "content": "Notre générateur de nombres aléatoires utilise des algorithmes cryptographiquement sécurisés intégrés dans les navigateurs web modernes. Lorsque vous cliquez Générer, le système crée des nombres aléatoires dans votre plage spécifiée. Pour le mode 'sans répétitions', il utilise un algorithme de mélange similaire à la distribution de cartes — une fois qu'un nombre est choisi, il est retiré du pool. La qualité de l'aléatoire est suffisamment élevée pour des jeux équitables, sélections aléatoires et échantillonnage statistique, bien qu'inadéquate pour les applications de sécurité cryptographique."
        },
        "useCases": {
          "title": "Cas d'Usage Courants",
          "items": [
            {
              "text": "Loterie : Choisir des numéros uniques dans une plage (ex: 6 sur 1-49)",
              "type": "info"
            },
            {
              "text": "Jeux : Lancer des dés, pile ou face, tirer des cartes",
              "type": "info"
            },
            {
              "text": "Tirages au sort : Choisir des gagnants aléatoires parmi des entrées numérotées",
              "type": "info"
            },
            {
              "text": "Décisions : Laisser le hasard décider entre les options",
              "type": "info"
            },
            {
              "text": "Tests : Générer des données de test ou échantillons aléatoires",
              "type": "warning"
            },
            {
              "text": "Statistiques : Échantillonnage aléatoire pour enquêtes ou études",
              "type": "warning"
            }
          ]
        },
        "fairness": {
          "title": "Assurer l'Équité",
          "items": [
            {
              "text": "Chaque nombre a une probabilité égale d'être sélectionné",
              "type": "info"
            },
            {
              "text": "Les résultats précédents n'affectent pas les résultats futurs",
              "type": "info"
            },
            {
              "text": "Aucun motif ou séquence ne peut être prédit",
              "type": "info"
            },
            {
              "text": "'Sans répétitions' garantit que chaque nombre apparaît au plus une fois",
              "type": "info"
            },
            {
              "text": "Les résultats sont générés côté client (dans votre navigateur)",
              "type": "info"
            },
            {
              "text": "Actualisez ou générez à nouveau pour des résultats complètement nouveaux",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples d'Utilisation",
          "description": "Comment utiliser le générateur de nombres aléatoires",
          "examples": [
            {
              "title": "Choisir 6 Numéros de Loterie (1-49)",
              "steps": [
                "Définir Minimum : 1",
                "Définir Maximum : 49",
                "Définir Quantité : 6",
                "Autoriser Répétitions : Non",
                "Trier Résultats : Oui (optionnel)"
              ],
              "result": "Exemple : 7, 14, 23, 31, 38, 45"
            },
            {
              "title": "Lancer 3 Dés à Six Faces",
              "steps": [
                "Définir Minimum : 1",
                "Définir Maximum : 6",
                "Définir Quantité : 3",
                "Autoriser Répétitions : Oui",
                "Cliquer Générer"
              ],
              "result": "Exemple : 2, 5, 3 (Somme : 10)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Comment générer un nombre aléatoire entre 1 et 100 ?",
          "answer": "Définissez la Valeur Minimale à 1 et la Valeur Maximale à 100, gardez la Quantité à 1, et cliquez Générer. Vous obtiendrez un entier aléatoire entre 1 et 100, inclus."
        },
        {
          "question": "Comment choisir des numéros de loterie ?",
          "answer": "Définissez votre plage (ex: 1-49), définissez la Quantité selon vos besoins (ex: 6), sélectionnez 'Non' pour Autoriser Répétitions, et triez optionnellement les résultats. Cela garantit des numéros uniques comme un vrai tirage de loterie."
        },
        {
          "question": "Les nombres sont-ils vraiment aléatoires ?",
          "answer": "Le générateur utilise des algorithmes pseudo-aléatoires cryptographiquement sécurisés qui produisent des résultats statistiquement aléatoires. Bien qu'ils ne soient pas 'vraiment' aléatoires (qui nécessite des phénomènes physiques), ils conviennent parfaitement aux jeux, sélections et la plupart des applications."
        },
        {
          "question": "Quelle est la différence entre 'Autoriser Répétitions' Oui et Non ?",
          "answer": "'Oui' (avec remplacement) signifie que le même nombre peut apparaître plusieurs fois, comme lancer des dés. 'Non' (sans remplacement) garantit que chaque nombre n'apparaît qu'une fois, comme tirer d'un jeu de cartes ou choisir des numéros de loterie."
        },
        {
          "question": "Pourquoi ne puis-je pas générer plus de nombres que ma plage le permet ?",
          "answer": "Quand 'Autoriser Répétitions' est désactivé, vous ne pouvez générer que autant de nombres uniques qu'il en existe dans votre plage. Par exemple, avec la plage 1-10, vous pouvez générer au maximum 10 nombres uniques. Activez 'Autoriser Répétitions' pour en générer plus."
        },
        {
          "question": "Comment exclure des nombres spécifiques des résultats ?",
          "answer": "Entrez les nombres que vous voulez exclure dans le champ 'Exclure les Nombres', séparés par des virgules (ex: '7, 13, 21'). Ces nombres n'apparaîtront jamais dans vos résultats générés."
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
      "name": "Zufallszahlen-Generator",
      "slug": "zufallszahlen-generator-rechner",
      "subtitle": "Generieren Sie sofort Zufallszahlen. Stellen Sie Ihren Bereich, die Anzahl und Optionen für Lotterie-Tipps, Würfelwürfe oder jede andere Zufallsauswahl ein.",
      "breadcrumb": "Zufallszahl",
      "seo": {
        "title": "Zufallszahlen-Generator - Kostenloser Online-Zahlenwähler",
        "description": "Generieren Sie sofort Zufallszahlen. Wählen Sie Lotteriezahlen, würfeln Sie oder erstellen Sie Zufallsauswahlen mit anpassbaren Bereichs- und Anzahloptionen.",
        "shortDescription": "Generieren Sie Zufallszahlen in jedem Bereich",
        "keywords": [
          "zufallszahlen generator",
          "zufallszahlen wähler",
          "lotto zahlen generator",
          "würfel",
          "zufallsauswahl",
          "zahlen randomizer",
          "kostenloser zufalls generator",
          "zufällige ganzzahl generator"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "minValue": {
          "label": "Minimalwert",
          "helpText": "Niedrigste Zahl im Bereich (einschließlich)"
        },
        "maxValue": {
          "label": "Maximalwert",
          "helpText": "Höchste Zahl im Bereich (einschließlich)"
        },
        "quantity": {
          "label": "Anzahl",
          "helpText": "Wie viele Zufallszahlen generiert werden sollen"
        },
        "allowRepeats": {
          "label": "Wiederholungen erlauben",
          "helpText": "Kann dieselbe Zahl mehrfach erscheinen?",
          "options": {
            "yes": "Ja (mit Wiederholung)",
            "no": "Nein (nur eindeutige Zahlen)"
          }
        },
        "sortResults": {
          "label": "Ergebnisse sortieren",
          "helpText": "Die generierten Zahlen sortieren",
          "options": {
            "yes": "Ja (aufsteigend)",
            "no": "Nein (zufällige Reihenfolge)"
          }
        },
        "excludeNumbers": {
          "label": "Zahlen ausschließen",
          "helpText": "Auszuschließende Zahlen (durch Komma getrennt)"
        }
      },
      "results": {
        "randomNumbers": {
          "label": "Zufallszahlen"
        },
        "range": {
          "label": "Bereich"
        },
        "quantity": {
          "label": "Anzahl"
        },
        "sum": {
          "label": "Summe"
        },
        "average": {
          "label": "Durchschnitt"
        }
      },
      "presets": {
        "coinFlip": {
          "label": "Münzwurf",
          "description": "1 = Kopf, 2 = Zahl"
        },
        "diceRoll": {
          "label": "Würfelwurf",
          "description": "Würfeln mit einem 6-seitigen Würfel"
        },
        "lottery6of49": {
          "label": "Lotto 6 aus 49",
          "description": "Wähle 6 Zahlen von 1-49"
        },
        "percentage": {
          "label": "Zufällige %",
          "description": "Zufällig 1-100"
        }
      },
      "values": {
        "to": "bis",
        "numbers": "Zahlen",
        "number": "Zahl",
        "sum": "Summe",
        "average": "Durchschnitt",
        "range": "Bereich",
        "generated": "Generiert"
      },
      "formats": {
        "summary": "Generiert: {numbers}",
        "range": "{min} bis {max}"
      },
      "infoCards": {
        "results": {
          "title": "Generierte Zahlen",
          "items": [
            {
              "label": "Zahlen",
              "valueKey": "randomNumbers"
            },
            {
              "label": "Bereich",
              "valueKey": "range"
            },
            {
              "label": "Summe",
              "valueKey": "sum"
            },
            {
              "label": "Durchschnitt",
              "valueKey": "average"
            }
          ]
        },
        "stats": {
          "title": "Statistiken",
          "items": [
            {
              "label": "Anzahl",
              "valueKey": "quantity"
            },
            {
              "label": "Minimum",
              "valueKey": "minGenerated"
            },
            {
              "label": "Maximum",
              "valueKey": "maxGenerated"
            },
            {
              "label": "Spannweite",
              "valueKey": "spread"
            }
          ]
        },
        "tips": {
          "title": "Schnelle Tipps",
          "items": [
            "Verwenden Sie 'Keine Wiederholungen' für Lotto-ähnliche Ziehungen",
            "Münzwurf: Bereich 1-2 setzen (1=Kopf, 2=Zahl)",
            "Würfelwurf: Bereich 1-6 für Standard-Würfel setzen",
            "Klicken Sie erneut auf Generieren für neue Zufallszahlen"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Zufallszahlen-Generator?",
          "content": "Ein Zufallszahlen-Generator (ZZG) ist ein Werkzeug, das Zahlen ohne vorhersagbares Muster produziert. Wahre Zufälligkeit ist überraschend schwer zu erreichen — selbst in der Natur folgen die meisten Phänomene statistischen Mustern. Computerbasierte ZZGs verwenden komplexe Algorithmen namens Pseudo-Zufallszahlen-Generatoren (PZZGs), die Zahlenfolgen produzieren, die für praktische Zwecke zufällig erscheinen. Obwohl nicht wirklich zufällig im philosophischen Sinne, sind moderne PZZGs ausreichend für Spiele, Simulationen, Stichproben und die meisten alltäglichen Anwendungen."
        },
        "howItWorks": {
          "title": "Wie Zufallszahlen-Generierung funktioniert",
          "content": "Unser Zufallszahlen-Generator verwendet kryptographisch sichere Algorithmen, die in moderne Webbrowser integriert sind. Wenn Sie auf Generieren klicken, erstellt das System Zufallszahlen innerhalb Ihres angegebenen Bereichs. Für den 'keine Wiederholungen'-Modus wird ein Misch-Algorithmus verwendet, ähnlich dem Kartengeben — sobald eine Zahl gewählt wurde, wird sie aus dem Pool entfernt. Die Qualität der Zufälligkeit ist hoch genug für faire Spiele, Zufallsauswahlen und statistische Stichproben, jedoch nicht geeignet für kryptographische Sicherheitsanwendungen."
        },
        "useCases": {
          "title": "Häufige Anwendungsfälle",
          "items": [
            {
              "text": "Lotterie: Eindeutige Zahlen aus einem Bereich wählen (z.B. 6 aus 1-49)",
              "type": "info"
            },
            {
              "text": "Spiele: Würfeln, Münzen werfen, Karten ziehen",
              "type": "info"
            },
            {
              "text": "Verlosungen: Zufällige Gewinner aus nummerierten Einträgen wählen",
              "type": "info"
            },
            {
              "text": "Entscheidungen: Den Zufall zwischen Optionen entscheiden lassen",
              "type": "info"
            },
            {
              "text": "Testing: Zufällige Testdaten oder Proben generieren",
              "type": "warning"
            },
            {
              "text": "Statistik: Zufallsstichproben für Umfragen oder Studien",
              "type": "warning"
            }
          ]
        },
        "fairness": {
          "title": "Fairness sicherstellen",
          "items": [
            {
              "text": "Jede Zahl hat die gleiche Wahrscheinlichkeit, ausgewählt zu werden",
              "type": "info"
            },
            {
              "text": "Vorherige Ergebnisse beeinflussen nicht die zukünftigen Ausgänge",
              "type": "info"
            },
            {
              "text": "Kein Muster oder Sequenz kann vorhergesagt werden",
              "type": "info"
            },
            {
              "text": "'Keine Wiederholungen' stellt sicher, dass jede Zahl höchstens einmal erscheint",
              "type": "info"
            },
            {
              "text": "Ergebnisse werden clientseitig generiert (in Ihrem Browser)",
              "type": "info"
            },
            {
              "text": "Aktualisieren oder erneut generieren für komplett neue Ergebnisse",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Beispiel-Anwendungsfälle",
          "description": "Wie man den Zufallszahlen-Generator verwendet",
          "examples": [
            {
              "title": "6 Lotto-Zahlen wählen (1-49)",
              "steps": [
                "Minimum setzen: 1",
                "Maximum setzen: 49",
                "Anzahl setzen: 6",
                "Wiederholungen erlauben: Nein",
                "Ergebnisse sortieren: Ja (optional)"
              ],
              "result": "Beispiel: 7, 14, 23, 31, 38, 45"
            },
            {
              "title": "3 sechsseitige Würfel werfen",
              "steps": [
                "Minimum setzen: 1",
                "Maximum setzen: 6",
                "Anzahl setzen: 3",
                "Wiederholungen erlauben: Ja",
                "Generieren klicken"
              ],
              "result": "Beispiel: 2, 5, 3 (Summe: 10)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie generiere ich eine Zufallszahl zwischen 1 und 100?",
          "answer": "Setzen Sie den Minimalwert auf 1 und den Maximalwert auf 100, lassen Sie die Anzahl bei 1 und klicken Sie auf Generieren. Sie erhalten eine zufällige ganze Zahl zwischen 1 und 100, einschließlich."
        },
        {
          "question": "Wie wähle ich Lotto-Zahlen?",
          "answer": "Stellen Sie Ihren Bereich ein (z.B. 1-49), setzen Sie die Anzahl auf die benötigte Zahl (z.B. 6), wählen Sie 'Nein' für Wiederholungen erlauben und sortieren Sie optional die Ergebnisse. Dies gewährleistet eindeutige Zahlen wie bei einer echten Lotto-Ziehung."
        },
        {
          "question": "Sind die Zahlen wirklich zufällig?",
          "answer": "Der Generator verwendet kryptographisch sichere Pseudo-Zufalls-Algorithmen, die statistisch zufällige Ergebnisse produzieren. Obwohl nicht 'echt' zufällig (was physikalische Phänomene erfordert), sind sie perfekt geeignet für Spiele, Auswahlen und die meisten Anwendungen."
        },
        {
          "question": "Was ist der Unterschied zwischen 'Wiederholungen erlauben' Ja und Nein?",
          "answer": "'Ja' (mit Wiederholung) bedeutet, dass dieselbe Zahl mehrfach erscheinen kann, wie beim Würfeln. 'Nein' (ohne Wiederholung) stellt sicher, dass jede Zahl nur einmal erscheint, wie beim Ziehen aus einem Kartenstapel oder beim Lotto."
        },
        {
          "question": "Warum kann ich nicht mehr Zahlen generieren als mein Bereich erlaubt?",
          "answer": "Wenn 'Wiederholungen erlauben' ausgeschaltet ist, können Sie nur so viele eindeutige Zahlen generieren, wie in Ihrem Bereich existieren. Zum Beispiel können Sie mit Bereich 1-10 höchstens 10 eindeutige Zahlen generieren. Aktivieren Sie 'Wiederholungen erlauben', um mehr zu generieren."
        },
        {
          "question": "Wie schließe ich bestimmte Zahlen von den Ergebnissen aus?",
          "answer": "Geben Sie die Zahlen, die Sie ausschließen möchten, im Feld 'Zahlen ausschließen' ein, getrennt durch Kommas (z.B. '7, 13, 21'). Diese Zahlen werden niemals in Ihren generierten Ergebnissen erscheinen."
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

  // ===========================================================================
  // INPUTS - Smart Defaults: sensible defaults for quick use
  // ===========================================================================
  inputs: [
    {
      id: "minValue",
      type: "number",
      defaultValue: 1,
      placeholder: "1",
      min: -1000000,
      max: 1000000,
    },
    {
      id: "maxValue",
      type: "number",
      defaultValue: 100,
      placeholder: "100",
      min: -1000000,
      max: 1000000,
    },
    {
      id: "quantity",
      type: "number",
      defaultValue: 1,
      placeholder: "1",
      min: 1,
      max: 1000,
    },
    {
      id: "allowRepeats",
      type: "radio",
      defaultValue: "yes",
      options: [
        { value: "yes" },
        { value: "no" },
      ],
    },
    {
      id: "sortResults",
      type: "radio",
      defaultValue: "no",
      options: [
        { value: "yes" },
        { value: "no" },
      ],
    },
    {
      id: "excludeNumbers",
      type: "text",
      defaultValue: "",
      placeholder: "e.g., 7, 13, 21",
    },
  ],

  // EMPTY - no accordions (RULE from ENGINE_V4)
  inputGroups: [],

  // ===========================================================================
  // RESULTS
  // ===========================================================================
  results: [
    { id: "randomNumbers", type: "primary", format: "text" },
    { id: "sum", type: "secondary", format: "number" },
    { id: "average", type: "secondary", format: "number" },
  ],

  // ===========================================================================
  // INFO CARDS - 2 list + 1 horizontal tips (tips ALWAYS last)
  // ===========================================================================
  infoCards: [
    { id: "results", type: "list", icon: "🎲", itemCount: 4 },
    { id: "stats", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // EMPTY - use Dual List instead (RULE from ENGINE_V4)
  referenceData: [],

  // ===========================================================================
  // EDUCATION - 2 prose + 2 list + 1 code-example (RULE from ENGINE_V4)
  // ===========================================================================
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "useCases", type: "list", icon: "📋", itemCount: 6 },
    { id: "fairness", type: "list", icon: "⚖️", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ===========================================================================
  // FAQs - 6+ required (RULE from ENGINE_V4)
  // ===========================================================================
  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ],

  // ===========================================================================
  // REFERENCES - 2+ required (RULE from ENGINE_V4)
  // ===========================================================================
  references: [
    {
      authors: "NIST",
      year: "2024",
      title: "Random Number Generation",
      source: "National Institute of Standards and Technology",
      url: "https://csrc.nist.gov/projects/random-bit-generation",
    },
    {
      authors: "Mozilla Developer Network",
      year: "2024",
      title: "Web Crypto API - getRandomValues()",
      source: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues",
    },
  ],

  // ===========================================================================
  // LAYOUT SECTIONS
  // ===========================================================================
  hero: {
    showBadge: true,
    showRating: true,
  },
  sidebar: {
    showTips: true,
    showRelated: true,
  },
  features: {
    showPdfExport: true,
    showSaveResults: true,
  },
  relatedCalculators: ["percentage", "probability", "statistics"],
  ads: {
    showSidebarAd: true,
    showFooterAd: true,
  },
};

// =============================================================================
// CALCULATE FUNCTION
// - Use v["key"] for ALL units - NO hardcoding
// - Handle null values from Smart Defaults
// - Return isValid: false if missing required fields
// =============================================================================

// Helper: Generate cryptographically secure random integer
function getSecureRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  const array = new Uint32Array(1);
  
  // Use crypto API if available, fallback to Math.random
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(array);
    return min + (array[0] % range);
  }
  
  return Math.floor(Math.random() * range) + min;
}

// Helper: Shuffle array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function calculateRandomNumber(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;

  // Get translations - NEVER hardcode
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const min = values.minValue as number;
  const max = values.maxValue as number;
  const quantity = values.quantity as number;
  const allowRepeats = values.allowRepeats === "yes";
  const sortResults = values.sortResults === "yes";
  const excludeStr = (values.excludeNumbers as string) || "";

  // Validate inputs
  if (min === null || min === undefined || max === null || max === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  if (min > max) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Parse excluded numbers
  const excludeNumbers = new Set<number>();
  if (excludeStr.trim()) {
    excludeStr.split(",").forEach((s) => {
      const num = parseInt(s.trim(), 10);
      if (!isNaN(num)) {
        excludeNumbers.add(num);
      }
    });
  }

  // Build available number pool
  const availableNumbers: number[] = [];
  for (let i = min; i <= max; i++) {
    if (!excludeNumbers.has(i)) {
      availableNumbers.push(i);
    }
  }

  // Check if we have enough numbers
  if (!allowRepeats && quantity > availableNumbers.length) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Generate random numbers
  let randomNumbers: number[] = [];

  if (allowRepeats) {
    // With replacement - can pick same number multiple times
    for (let i = 0; i < quantity; i++) {
      const idx = getSecureRandomInt(0, availableNumbers.length - 1);
      randomNumbers.push(availableNumbers[idx]);
    }
  } else {
    // Without replacement - each number only once
    const shuffled = shuffleArray(availableNumbers);
    randomNumbers = shuffled.slice(0, quantity);
  }

  // Sort if requested
  if (sortResults) {
    randomNumbers.sort((a, b) => a - b);
  }

  // Calculate statistics
  const sum = randomNumbers.reduce((acc, n) => acc + n, 0);
  const average = sum / randomNumbers.length;
  const minGenerated = Math.min(...randomNumbers);
  const maxGenerated = Math.max(...randomNumbers);
  const spread = maxGenerated - minGenerated;

  // Get translated units
  const numbersLabel = quantity === 1 ? (v["number"] || "number") : (v["numbers"] || "numbers");
  const toLabel = v["to"] || "to";
  const sumLabel = v["sum"] || "Sum";
  const avgLabel = v["average"] || "Average";

  // Format output
  const numbersFormatted = randomNumbers.join(", ");
  const rangeFormatted = f.range?.replace("{min}", min.toString()).replace("{max}", max.toString()) || 
    `${min} ${toLabel} ${max}`;

  const summary = f.summary?.replace("{numbers}", numbersFormatted) || 
    `Generated: ${numbersFormatted}`;

  return {
    values: {
      randomNumbers,
      sum,
      average,
      minGenerated,
      maxGenerated,
      spread,
    },
    formatted: {
      randomNumbers: numbersFormatted,
      range: rangeFormatted,
      quantity: `${quantity} ${numbersLabel}`,
      sum: `${sumLabel}: ${sum}`,
      average: `${avgLabel}: ${average.toFixed(2)}`,
      minGenerated: minGenerated.toString(),
      maxGenerated: maxGenerated.toString(),
      spread: spread.toString(),
    },
    summary,
    isValid: true,
  };
}

export default randomNumberGeneratorConfig;
