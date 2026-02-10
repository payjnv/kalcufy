import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// 1 tarea = 628.86 m² (Dominican Republic standard)
// 1 hectárea = 10,000 m²
// 1 tarea ≈ 0.062886 hectáreas
const TAREA_TO_M2 = 628.86;
const HA_TO_M2 = 10000;
const TAREA_TO_HA = TAREA_TO_M2 / HA_TO_M2;
const ACRE_TO_M2 = 4046.8564224;

export const tareasToMetrosCuadradosConfig: CalculatorConfigV4 = {
  id: "tareas-to-metros-cuadrados",
  version: "4.0",
  category: "conversion",
  icon: "🌴",
  presets: [
    { id: "smallLot", icon: "🏡", values: { tareaValue: 1 } },
    { id: "residentialLot", icon: "🏠", values: { tareaValue: 5 } },
    { id: "farm", icon: "🌾", values: { tareaValue: 50 } },
    { id: "largeFinca", icon: "🏞️", values: { tareaValue: 200 } },
  ],
  t: {
    en: {
      name: "Tareas to Square Meters Converter", slug: "tareas-to-square-meters-converter",
      subtitle: "Convert tareas to square meters, hectares, and acres — the Dominican Republic's land measurement unit.",
      breadcrumb: "Tareas to m²",
      seo: {
        title: "Tareas to Square Meters Converter - Dominican Land Unit",
        description: "Convert tareas to square meters and hectares. The tarea is the standard land unit in the Dominican Republic. 1 tarea = 628.86 m². Free online converter.",
        shortDescription: "Convert Dominican tareas to square meters.",
        keywords: ["tarea to square meters", "tarea converter", "tarea a metros cuadrados", "dominican republic land unit", "convert tarea", "tarea to hectare", "cuantos metros tiene una tarea", "tarea de tierra"],
      },
      calculator: { yourInformation: "Enter Value" },
      ui: { yourInformation: "Enter Value", calculate: "Convert", reset: "Reset", results: "Results" },
      inputs: { tareaValue: { label: "Tareas", helpText: "Enter the number of tareas to convert" } },
      results: { m2: { label: "Square Meters" }, hectares: { label: "Hectares" }, acres: { label: "Acres" }, km2: { label: "Square Kilometers" }, ft2: { label: "Square Feet" } },
      presets: {
        smallLot: { label: "1 Tarea", description: "628.86 m²" },
        residentialLot: { label: "5 Tareas", description: "Residential lot" },
        farm: { label: "50 Tareas", description: "Small farm" },
        largeFinca: { label: "200 Tareas", description: "Large farm" },
      },
      values: { m2: "m²", ha: "ha", ac: "acres", km2: "km²", ft2: "ft²", ta: "tareas" },
      formats: { summary: "{tareaValue} tareas = {m2} m²" },
      infoCards: {
        quickConversions: {
          title: "Quick Reference",
          items: [
            { label: "1 tarea", valueKey: "ref1" }, { label: "5 tareas", valueKey: "ref5" },
            { label: "10 tareas", valueKey: "ref10" }, { label: "50 tareas", valueKey: "ref50" },
            { label: "100 tareas", valueKey: "ref100" }, { label: "16 tareas", valueKey: "ref16" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "1 tarea = 628.86 m² — roughly 25m × 25m",
            "Quick rule: 16 tareas ≈ 1 hectare (actually 15.9 tareas = 1 ha)",
            "For acres: 1 tarea ≈ 0.155 acres — about 1/6 of an acre",
            "Common lot sizes: residential 2-5 tareas, farms 50-500 tareas",
          ],
        },
      },
      education: {
        howToConvert: { title: "How to Convert Tareas to Square Meters", content: "To convert tareas to square meters, multiply the number of tareas by 628.86. This is the standard Dominican tarea based on a square of 25.07 meters per side (100 Dominican varas of 0.2507 m each, squared). To convert to hectares, multiply by 628.86 and divide by 10,000, or simply multiply by 0.062886. The quick rule that '16 tareas equals approximately 1 hectare' is widely used in the Dominican Republic — the exact number is 15.9 tareas per hectare. This conversion is essential for anyone buying property in the Dominican Republic, as land is almost exclusively measured in tareas." },
        commonUses: { title: "Where the Tarea Is Used Today", content: "The tarea is the universal land measurement unit in the Dominican Republic, used for everything from small residential lots to large agricultural properties. Real estate listings on Dominican property websites always quote land area in tareas. The Tribunal de Tierras (Land Court) and the Dirección Nacional de Mensuras Catastrales (National Cadastral Survey Office) use tareas in official documents. Agricultural production reports measure coffee, cacao, tobacco, and sugar cane yields per tarea. Construction permits reference lot sizes in tareas. Even casual conversations about property in the Dominican Republic use tareas — 'tengo un solar de 3 tareas' is how Dominicans describe lot sizes. Foreign buyers investing in Dominican real estate must understand this unit to navigate the market." },
        examples: {
          title: "Conversion Examples", description: "Step-by-step tarea conversions",
          examples: [
            { title: "Convert 10 tareas to square meters", steps: ["Formula: m² = tareas × 628.86", "10 × 628.86 = 6,288.6", "10 tareas = 6,288.6 m²"], result: "10 tareas = 6,288.6 m²" },
            { title: "How many tareas in 1 hectare?", steps: ["1 hectare = 10,000 m²", "Tareas = 10,000 ÷ 628.86", "= 15.9 tareas"], result: "1 hectare ≈ 15.9 tareas" },
          ],
        },
      },
      faqs: [
        { question: "How many square meters is 1 tarea?", answer: "1 tarea equals 628.86 square meters in the Dominican Republic." },
        { question: "How many tareas make 1 hectare?", answer: "Approximately 15.9 tareas equal 1 hectare (10,000 m² ÷ 628.86 m² = 15.9)." },
        { question: "How many tareas in an acre?", answer: "1 acre ≈ 6.44 tareas (4,046.86 m² ÷ 628.86 m² = 6.44)." },
        { question: "Is the tarea used only in the Dominican Republic?", answer: "The tarea of 628.86 m² is specific to the Dominican Republic. Puerto Rico also has a unit called 'tarea' but it equals approximately 3,930 m², which is much larger." },
        { question: "Why is the Dominican tarea 628.86 m²?", answer: "It is defined as a square of 100 Dominican varas per side, where 1 Dominican vara = 0.2507 meters. So (100 × 0.2507)² = 25.07² = 628.86 m²." },
        { question: "Is the tarea officially recognized?", answer: "Yes, the tarea is the standard land measurement in Dominican property law, used in the Tribunal Superior de Tierras, land titles (Certificados de Título), and cadastral surveys." },
      ],
      rating: { title: "Rate this Converter", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Converted with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
      detailedTable: { conversionTable: { button: "View Full Conversion Table", title: "Tareas to Square Meters Conversion Table", columns: { ta: "Tareas", m2: "Square Meters", ha: "Hectares", acres: "Acres" } } },
    },
    es: {
      "name": "Convertidor de Tareas a Metros Cuadrados",
      "slug": "calculadora-convertidor-tareas-metros-cuadrados",
      "subtitle": "Convierte tareas a metros cuadrados, hectáreas y acres — la unidad de medida de tierra de República Dominicana.",
      "breadcrumb": "Tareas a m²",
      "seo": {
        "title": "Convertidor de Tareas a Metros Cuadrados - Unidad de Tierra Dominicana",
        "description": "Convierte tareas a metros cuadrados y hectáreas. La tarea es la unidad estándar de tierra en República Dominicana. 1 tarea = 628.86 m². Convertidor gratuito online.",
        "shortDescription": "Convierte tareas dominicanas a metros cuadrados.",
        "keywords": [
          "tarea a metros cuadrados",
          "convertidor tarea",
          "tarea a metros cuadrados",
          "unidad de tierra republica dominicana",
          "convertir tarea",
          "tarea a hectarea",
          "cuantos metros tiene una tarea",
          "tarea de tierra"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "tareaValue": {
          "label": "Tareas",
          "helpText": "Ingrese el número de tareas a convertir"
        }
      },
      "results": {
        "m2": {
          "label": "Metros Cuadrados"
        },
        "hectares": {
          "label": "Hectáreas"
        },
        "acres": {
          "label": "Acres"
        },
        "km2": {
          "label": "Kilómetros Cuadrados"
        },
        "ft2": {
          "label": "Pies Cuadrados"
        }
      },
      "presets": {
        "smallLot": {
          "label": "1 Tarea",
          "description": "628.86 m²"
        },
        "residentialLot": {
          "label": "5 Tareas",
          "description": "Lote residencial"
        },
        "farm": {
          "label": "50 Tareas",
          "description": "Finca pequeña"
        },
        "largeFinca": {
          "label": "200 Tareas",
          "description": "Finca grande"
        }
      },
      "values": {
        "m2": "m²",
        "ha": "ha",
        "ac": "acres",
        "km2": "km²",
        "ft2": "ft²",
        "ta": "tareas"
      },
      "formats": {
        "summary": "{tareaValue} tareas = {m2} m²"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Referencia Rápida",
          "items": [
            {
              "label": "1 tarea",
              "valueKey": "ref1"
            },
            {
              "label": "5 tareas",
              "valueKey": "ref5"
            },
            {
              "label": "10 tareas",
              "valueKey": "ref10"
            },
            {
              "label": "50 tareas",
              "valueKey": "ref50"
            },
            {
              "label": "100 tareas",
              "valueKey": "ref100"
            },
            {
              "label": "16 tareas",
              "valueKey": "ref16"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Conversión",
          "items": [
            "1 tarea = 628.86 m² — aproximadamente 25m × 25m",
            "Regla rápida: 16 tareas ≈ 1 hectárea (en realidad 15.9 tareas = 1 ha)",
            "Para acres: 1 tarea ≈ 0.155 acres — aproximadamente 1/6 de acre",
            "Tamaños comunes de lotes: residenciales 2-5 tareas, fincas 50-500 tareas"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Cómo Convertir Tareas a Metros Cuadrados",
          "content": "Para convertir tareas a metros cuadrados, multiplique el número de tareas por 628.86. Esta es la tarea dominicana estándar basada en un cuadrado de 25.07 metros por lado (100 varas dominicanas de 0.2507 m cada una, al cuadrado). Para convertir a hectáreas, multiplique por 628.86 y divida entre 10,000, o simplemente multiplique por 0.062886. La regla rápida de que '16 tareas equivalen aproximadamente a 1 hectárea' es ampliamente usada en República Dominicana — el número exacto es 15.9 tareas por hectárea. Esta conversión es esencial para cualquier persona que compre propiedades en República Dominicana, ya que la tierra se mide casi exclusivamente en tareas."
        },
        "commonUses": {
          "title": "Dónde se Usa la Tarea Hoy",
          "content": "La tarea es la unidad universal de medida de tierra en República Dominicana, usada para todo desde pequeños lotes residenciales hasta grandes propiedades agrícolas. Los anuncios inmobiliarios en sitios web de propiedades dominicanas siempre cotizan el área de tierra en tareas. El Tribunal de Tierras y la Dirección Nacional de Mensuras Catastrales usan tareas en documentos oficiales. Los informes de producción agrícola miden los rendimientos de café, cacao, tabaco y caña de azúcar por tarea. Los permisos de construcción referencian tamaños de lotes en tareas. Incluso las conversaciones casuales sobre propiedades en República Dominicana usan tareas — 'tengo un solar de 3 tareas' es como los dominicanos describen tamaños de lotes. Los compradores extranjeros que invierten en bienes raíces dominicanos deben entender esta unidad para navegar el mercado."
        },
        "examples": {
          "title": "Ejemplos de Conversión",
          "description": "Conversiones de tareas paso a paso",
          "examples": [
            {
              "title": "Convertir 10 tareas a metros cuadrados",
              "steps": [
                "Fórmula: m² = tareas × 628.86",
                "10 × 628.86 = 6,288.6",
                "10 tareas = 6,288.6 m²"
              ],
              "result": "10 tareas = 6,288.6 m²"
            },
            {
              "title": "¿Cuántas tareas hay en 1 hectárea?",
              "steps": [
                "1 hectárea = 10,000 m²",
                "Tareas = 10,000 ÷ 628.86",
                "= 15.9 tareas"
              ],
              "result": "1 hectárea ≈ 15.9 tareas"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos metros cuadrados tiene 1 tarea?",
          "answer": "1 tarea equivale a 628.86 metros cuadrados en República Dominicana."
        },
        {
          "question": "¿Cuántas tareas forman 1 hectárea?",
          "answer": "Aproximadamente 15.9 tareas equivalen a 1 hectárea (10,000 m² ÷ 628.86 m² = 15.9)."
        },
        {
          "question": "¿Cuántas tareas hay en un acre?",
          "answer": "1 acre ≈ 6.44 tareas (4,046.86 m² ÷ 628.86 m² = 6.44)."
        },
        {
          "question": "¿Se usa la tarea solo en República Dominicana?",
          "answer": "La tarea de 628.86 m² es específica de República Dominicana. Puerto Rico también tiene una unidad llamada 'tarea' pero equivale a aproximadamente 3,930 m², que es mucho más grande."
        },
        {
          "question": "¿Por qué la tarea dominicana es 628.86 m²?",
          "answer": "Se define como un cuadrado de 100 varas dominicanas por lado, donde 1 vara dominicana = 0.2507 metros. Entonces (100 × 0.2507)² = 25.07² = 628.86 m²."
        },
        {
          "question": "¿Está oficialmente reconocida la tarea?",
          "answer": "Sí, la tarea es la medida estándar de tierra en la ley de propiedades dominicana, usada en el Tribunal Superior de Tierras, títulos de propiedad (Certificados de Título) y levantamientos catastrales."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Ver Tabla de Conversión Completa",
          "title": "Tabla de Conversión de Tareas a Metros Cuadrados",
          "columns": {
            "ta": "Tareas",
            "m2": "Metros Cuadrados",
            "ha": "Hectáreas",
            "acres": "Acres"
          }
        }
      },
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
      "name": "Conversor de Tareas para Metros Quadrados",
      "slug": "calculadora-conversao-tareas-metros-quadrados",
      "subtitle": "Converta tareas para metros quadrados, hectares e acres — a unidade de medida de terra da República Dominicana.",
      "breadcrumb": "Tareas para m²",
      "seo": {
        "title": "Conversor de Tareas para Metros Quadrados - Unidade de Terra Dominicana",
        "description": "Converta tareas para metros quadrados e hectares. A tarea é a unidade padrão de terra na República Dominicana. 1 tarea = 628,86 m². Conversor online gratuito.",
        "shortDescription": "Converta tareas dominicanas para metros quadrados.",
        "keywords": [
          "tarea para metros quadrados",
          "conversor tarea",
          "tarea a metros cuadrados",
          "unidade terra republica dominicana",
          "converter tarea",
          "tarea para hectare",
          "cuantos metros tiene una tarea",
          "tarea de tierra"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "tareaValue": {
          "label": "Tareas",
          "helpText": "Digite o número de tareas para converter"
        }
      },
      "results": {
        "m2": {
          "label": "Metros Quadrados"
        },
        "hectares": {
          "label": "Hectares"
        },
        "acres": {
          "label": "Acres"
        },
        "km2": {
          "label": "Quilômetros Quadrados"
        },
        "ft2": {
          "label": "Pés Quadrados"
        }
      },
      "presets": {
        "smallLot": {
          "label": "1 Tarea",
          "description": "628,86 m²"
        },
        "residentialLot": {
          "label": "5 Tareas",
          "description": "Lote residencial"
        },
        "farm": {
          "label": "50 Tareas",
          "description": "Fazenda pequena"
        },
        "largeFinca": {
          "label": "200 Tareas",
          "description": "Fazenda grande"
        }
      },
      "values": {
        "m2": "m²",
        "ha": "ha",
        "ac": "acres",
        "km2": "km²",
        "ft2": "ft²",
        "ta": "tareas"
      },
      "formats": {
        "summary": "{tareaValue} tareas = {m2} m²"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Referência Rápida",
          "items": [
            {
              "label": "1 tarea",
              "valueKey": "ref1"
            },
            {
              "label": "5 tareas",
              "valueKey": "ref5"
            },
            {
              "label": "10 tareas",
              "valueKey": "ref10"
            },
            {
              "label": "50 tareas",
              "valueKey": "ref50"
            },
            {
              "label": "100 tareas",
              "valueKey": "ref100"
            },
            {
              "label": "16 tareas",
              "valueKey": "ref16"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Conversão",
          "items": [
            "1 tarea = 628,86 m² — aproximadamente 25m × 25m",
            "Regra rápida: 16 tareas ≈ 1 hectare (na verdade 15,9 tareas = 1 ha)",
            "Para acres: 1 tarea ≈ 0,155 acres — cerca de 1/6 de um acre",
            "Tamanhos comuns de lotes: residencial 2-5 tareas, fazendas 50-500 tareas"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Como Converter Tareas para Metros Quadrados",
          "content": "Para converter tareas para metros quadrados, multiplique o número de tareas por 628,86. Esta é a tarea dominicana padrão baseada em um quadrado de 25,07 metros por lado (100 varas dominicanas de 0,2507 m cada, ao quadrado). Para converter para hectares, multiplique por 628,86 e divida por 10.000, ou simplesmente multiplique por 0,062886. A regra rápida de que '16 tareas equivalem aproximadamente a 1 hectare' é amplamente usada na República Dominicana — o número exato é 15,9 tareas por hectare. Esta conversão é essencial para quem compra propriedades na República Dominicana, já que a terra é quase exclusivamente medida em tareas."
        },
        "commonUses": {
          "title": "Onde a Tarea é Usada Hoje",
          "content": "A tarea é a unidade universal de medição de terra na República Dominicana, usada para tudo, desde pequenos lotes residenciais até grandes propriedades agrícolas. Anúncios imobiliários em sites de propriedades dominicanos sempre citam a área da terra em tareas. O Tribunal de Tierras (Tribunal de Terras) e a Dirección Nacional de Mensuras Catastrales (Diretoria Nacional de Levantamentos Cadastrais) usam tareas em documentos oficiais. Relatórios de produção agrícola medem a produtividade de café, cacau, tabaco e cana-de-açúcar por tarea. Licenças de construção referenciam tamanhos de lotes em tareas. Até conversas casuais sobre propriedades na República Dominicana usam tareas — 'tengo un solar de 3 tareas' é como os dominicanos descrevem tamanhos de lotes. Compradores estrangeiros investindo em imóveis dominicanos devem entender esta unidade para navegar no mercado."
        },
        "examples": {
          "title": "Exemplos de Conversão",
          "description": "Conversões de tareas passo a passo",
          "examples": [
            {
              "title": "Converter 10 tareas para metros quadrados",
              "steps": [
                "Fórmula: m² = tareas × 628,86",
                "10 × 628,86 = 6.288,6",
                "10 tareas = 6.288,6 m²"
              ],
              "result": "10 tareas = 6.288,6 m²"
            },
            {
              "title": "Quantas tareas em 1 hectare?",
              "steps": [
                "1 hectare = 10.000 m²",
                "Tareas = 10.000 ÷ 628,86",
                "= 15,9 tareas"
              ],
              "result": "1 hectare ≈ 15,9 tareas"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos metros quadrados tem 1 tarea?",
          "answer": "1 tarea equivale a 628,86 metros quadrados na República Dominicana."
        },
        {
          "question": "Quantas tareas fazem 1 hectare?",
          "answer": "Aproximadamente 15,9 tareas equivalem a 1 hectare (10.000 m² ÷ 628,86 m² = 15,9)."
        },
        {
          "question": "Quantas tareas em um acre?",
          "answer": "1 acre ≈ 6,44 tareas (4.046,86 m² ÷ 628,86 m² = 6,44)."
        },
        {
          "question": "A tarea é usada apenas na República Dominicana?",
          "answer": "A tarea de 628,86 m² é específica da República Dominicana. Porto Rico também tem uma unidade chamada 'tarea', mas equivale a aproximadamente 3.930 m², que é muito maior."
        },
        {
          "question": "Por que a tarea dominicana tem 628,86 m²?",
          "answer": "É definida como um quadrado de 100 varas dominicanas por lado, onde 1 vara dominicana = 0,2507 metros. Então (100 × 0,2507)² = 25,07² = 628,86 m²."
        },
        {
          "question": "A tarea é oficialmente reconhecida?",
          "answer": "Sim, a tarea é a medição padrão de terra na lei de propriedade dominicana, usada no Tribunal Superior de Tierras, títulos de propriedade (Certificados de Título) e levantamentos cadastrais."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Ver Tabela de Conversão Completa",
          "title": "Tabela de Conversão Tareas para Metros Quadrados",
          "columns": {
            "ta": "Tareas",
            "m2": "Metros Quadrados",
            "ha": "Hectares",
            "acres": "Acres"
          }
        }
      },
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
      "name": "Convertisseur de Tareas en Mètres Carrés",
      "slug": "calculateur-convertisseur-tareas-metres-carres",
      "subtitle": "Convertissez les tareas en mètres carrés, hectares et acres — l'unité de mesure foncière de la République Dominicaine.",
      "breadcrumb": "Tareas vers m²",
      "seo": {
        "title": "Convertisseur Tareas en Mètres Carrés - Unité Foncière Dominicaine",
        "description": "Convertissez les tareas en mètres carrés et hectares. La tarea est l'unité foncière standard en République Dominicaine. 1 tarea = 628,86 m². Convertisseur gratuit en ligne.",
        "shortDescription": "Convertissez les tareas dominicaines en mètres carrés.",
        "keywords": [
          "tarea en mètres carrés",
          "convertisseur tarea",
          "tarea à metros cuadrados",
          "unité foncière république dominicaine",
          "convertir tarea",
          "tarea en hectare",
          "cuantos metros tiene una tarea",
          "tarea de tierra"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "tareaValue": {
          "label": "Tareas",
          "helpText": "Saisissez le nombre de tareas à convertir"
        }
      },
      "results": {
        "m2": {
          "label": "Mètres Carrés"
        },
        "hectares": {
          "label": "Hectares"
        },
        "acres": {
          "label": "Acres"
        },
        "km2": {
          "label": "Kilomètres Carrés"
        },
        "ft2": {
          "label": "Pieds Carrés"
        }
      },
      "presets": {
        "smallLot": {
          "label": "1 Tarea",
          "description": "628,86 m²"
        },
        "residentialLot": {
          "label": "5 Tareas",
          "description": "Terrain résidentiel"
        },
        "farm": {
          "label": "50 Tareas",
          "description": "Petite ferme"
        },
        "largeFinca": {
          "label": "200 Tareas",
          "description": "Grande ferme"
        }
      },
      "values": {
        "m2": "m²",
        "ha": "ha",
        "ac": "acres",
        "km2": "km²",
        "ft2": "pi²",
        "ta": "tareas"
      },
      "formats": {
        "summary": "{tareaValue} tareas = {m2} m²"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Référence Rapide",
          "items": [
            {
              "label": "1 tarea",
              "valueKey": "ref1"
            },
            {
              "label": "5 tareas",
              "valueKey": "ref5"
            },
            {
              "label": "10 tareas",
              "valueKey": "ref10"
            },
            {
              "label": "50 tareas",
              "valueKey": "ref50"
            },
            {
              "label": "100 tareas",
              "valueKey": "ref100"
            },
            {
              "label": "16 tareas",
              "valueKey": "ref16"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Conversion",
          "items": [
            "1 tarea = 628,86 m² — environ 25m × 25m",
            "Règle rapide : 16 tareas ≈ 1 hectare (en réalité 15,9 tareas = 1 ha)",
            "Pour les acres : 1 tarea ≈ 0,155 acres — environ 1/6 d'acre",
            "Tailles courantes : résidentiel 2-5 tareas, fermes 50-500 tareas"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Comment Convertir les Tareas en Mètres Carrés",
          "content": "Pour convertir les tareas en mètres carrés, multipliez le nombre de tareas par 628,86. C'est la tarea dominicaine standard basée sur un carré de 25,07 mètres de côté (100 varas dominicaines de 0,2507 m chacune, au carré). Pour convertir en hectares, multipliez par 628,86 et divisez par 10 000, ou simplement multipliez par 0,062886. La règle rapide selon laquelle '16 tareas équivaut approximativement à 1 hectare' est largement utilisée en République Dominicaine — le nombre exact est 15,9 tareas par hectare. Cette conversion est essentielle pour quiconque achète une propriété en République Dominicaine, car les terrains sont presque exclusivement mesurés en tareas."
        },
        "commonUses": {
          "title": "Où la Tarea Est Utilisée Aujourd'hui",
          "content": "La tarea est l'unité universelle de mesure foncière en République Dominicaine, utilisée pour tout, des petits terrains résidentiels aux grandes propriétés agricoles. Les annonces immobilières sur les sites de propriétés dominicains indiquent toujours la superficie en tareas. Le Tribunal de Tierras (Tribunal Foncier) et la Dirección Nacional de Mensuras Catastrales (Office National d'Arpentage Cadastral) utilisent les tareas dans les documents officiels. Les rapports de production agricole mesurent les rendements de café, cacao, tabac et canne à sucre par tarea. Les permis de construire référencent les tailles de terrains en tareas. Même les conversations informelles sur l'immobilier en République Dominicaine utilisent les tareas — 'tengo un solar de 3 tareas' est la façon dont les Dominicains décrivent les tailles de terrains. Les acheteurs étrangers investissant dans l'immobilier dominicain doivent comprendre cette unité pour naviguer sur le marché."
        },
        "examples": {
          "title": "Exemples de Conversion",
          "description": "Conversions de tareas étape par étape",
          "examples": [
            {
              "title": "Convertir 10 tareas en mètres carrés",
              "steps": [
                "Formule : m² = tareas × 628,86",
                "10 × 628,86 = 6 288,6",
                "10 tareas = 6 288,6 m²"
              ],
              "result": "10 tareas = 6 288,6 m²"
            },
            {
              "title": "Combien de tareas dans 1 hectare ?",
              "steps": [
                "1 hectare = 10 000 m²",
                "Tareas = 10 000 ÷ 628,86",
                "= 15,9 tareas"
              ],
              "result": "1 hectare ≈ 15,9 tareas"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de mètres carrés fait 1 tarea ?",
          "answer": "1 tarea équivaut à 628,86 mètres carrés en République Dominicaine."
        },
        {
          "question": "Combien de tareas font 1 hectare ?",
          "answer": "Environ 15,9 tareas équivalent à 1 hectare (10 000 m² ÷ 628,86 m² = 15,9)."
        },
        {
          "question": "Combien de tareas dans un acre ?",
          "answer": "1 acre ≈ 6,44 tareas (4 046,86 m² ÷ 628,86 m² = 6,44)."
        },
        {
          "question": "La tarea n'est-elle utilisée qu'en République Dominicaine ?",
          "answer": "La tarea de 628,86 m² est spécifique à la République Dominicaine. Porto Rico a aussi une unité appelée 'tarea' mais elle équivaut à environ 3 930 m², ce qui est beaucoup plus grand."
        },
        {
          "question": "Pourquoi la tarea dominicaine fait-elle 628,86 m² ?",
          "answer": "Elle est définie comme un carré de 100 varas dominicaines de côté, où 1 vara dominicaine = 0,2507 mètres. Donc (100 × 0,2507)² = 25,07² = 628,86 m²."
        },
        {
          "question": "La tarea est-elle officiellement reconnue ?",
          "answer": "Oui, la tarea est la mesure foncière standard dans le droit immobilier dominicain, utilisée au Tribunal Superior de Tierras, dans les titres fonciers (Certificados de Título) et les relevés cadastraux."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Voir le Tableau de Conversion Complet",
          "title": "Tableau de Conversion Tareas vers Mètres Carrés",
          "columns": {
            "ta": "Tareas",
            "m2": "Mètres Carrés",
            "ha": "Hectares",
            "acres": "Acres"
          }
        }
      },
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
      "name": "Tareas in Quadratmeter Umrechner",
      "slug": "tareas-zu-quadratmetern-umrechner-rechner",
      "subtitle": "Konvertieren Sie Tareas in Quadratmeter, Hektar und Acres — die Landmaßeinheit der Dominikanischen Republik.",
      "breadcrumb": "Tareas zu m²",
      "seo": {
        "title": "Tareas zu Quadratmeter Umrechner - Dominikanische Landeinheit",
        "description": "Konvertieren Sie Tareas in Quadratmeter und Hektar. Die Tarea ist die Standard-Landeinheit in der Dominikanischen Republik. 1 Tarea = 628,86 m². Kostenloser Online-Umrechner.",
        "shortDescription": "Konvertieren Sie dominikanische Tareas in Quadratmeter.",
        "keywords": [
          "tarea zu quadratmeter",
          "tarea umrechner",
          "tarea a metros cuadrados",
          "dominikanische republik landeinheit",
          "tarea konvertieren",
          "tarea zu hektar",
          "cuantos metros tiene una tarea",
          "tarea de tierra"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "tareaValue": {
          "label": "Tareas",
          "helpText": "Geben Sie die Anzahl der Tareas zum Konvertieren ein"
        }
      },
      "results": {
        "m2": {
          "label": "Quadratmeter"
        },
        "hectares": {
          "label": "Hektar"
        },
        "acres": {
          "label": "Acres"
        },
        "km2": {
          "label": "Quadratkilometer"
        },
        "ft2": {
          "label": "Quadratfuß"
        }
      },
      "presets": {
        "smallLot": {
          "label": "1 Tarea",
          "description": "628,86 m²"
        },
        "residentialLot": {
          "label": "5 Tareas",
          "description": "Wohngrundstück"
        },
        "farm": {
          "label": "50 Tareas",
          "description": "Kleiner Bauernhof"
        },
        "largeFinca": {
          "label": "200 Tareas",
          "description": "Großer Bauernhof"
        }
      },
      "values": {
        "m2": "m²",
        "ha": "ha",
        "ac": "Acres",
        "km2": "km²",
        "ft2": "ft²",
        "ta": "Tareas"
      },
      "formats": {
        "summary": "{tareaValue} Tareas = {m2} m²"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Schnellreferenz",
          "items": [
            {
              "label": "1 Tarea",
              "valueKey": "ref1"
            },
            {
              "label": "5 Tareas",
              "valueKey": "ref5"
            },
            {
              "label": "10 Tareas",
              "valueKey": "ref10"
            },
            {
              "label": "50 Tareas",
              "valueKey": "ref50"
            },
            {
              "label": "100 Tareas",
              "valueKey": "ref100"
            },
            {
              "label": "16 Tareas",
              "valueKey": "ref16"
            }
          ]
        },
        "tips": {
          "title": "Umrechnungstipps",
          "items": [
            "1 Tarea = 628,86 m² — ungefähr 25m × 25m",
            "Faustformel: 16 Tareas ≈ 1 Hektar (tatsächlich 15,9 Tareas = 1 ha)",
            "Für Acres: 1 Tarea ≈ 0,155 Acres — etwa 1/6 eines Acres",
            "Übliche Grundstücksgrößen: Wohn 2-5 Tareas, Bauernhöfe 50-500 Tareas"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Wie man Tareas in Quadratmeter umrechnet",
          "content": "Um Tareas in Quadratmeter umzurechnen, multiplizieren Sie die Anzahl der Tareas mit 628,86. Dies ist die Standard-Dominikanische Tarea basierend auf einem Quadrat von 25,07 Metern pro Seite (100 Dominikanische Varas von je 0,2507 m, quadriert). Um in Hektar umzurechnen, multiplizieren Sie mit 628,86 und teilen durch 10.000, oder multiplizieren einfach mit 0,062886. Die Faustformel, dass '16 Tareas ungefähr 1 Hektar entsprechen' ist in der Dominikanischen Republik weit verbreitet — die genaue Zahl sind 15,9 Tareas pro Hektar. Diese Umrechnung ist wichtig für jeden, der Immobilien in der Dominikanischen Republik kauft, da Land fast ausschließlich in Tareas gemessen wird."
        },
        "commonUses": {
          "title": "Wo die Tarea heute verwendet wird",
          "content": "Die Tarea ist die universelle Landvermessungseinheit in der Dominikanischen Republik, verwendet für alles von kleinen Wohngrundstücken bis zu großen landwirtschaftlichen Eigenschaften. Immobilienanzeigen auf dominikanischen Immobilien-Websites geben Grundstücksflächen immer in Tareas an. Das Tribunal de Tierras (Landgericht) und die Dirección Nacional de Mensuras Catastrales (Nationale Katastervermessungsamt) verwenden Tareas in offiziellen Dokumenten. Landwirtschaftliche Produktionsberichte messen Kaffee-, Kakao-, Tabak- und Zuckerrohr-Erträge pro Tarea. Baugenehmigungen beziehen sich auf Grundstücksgrößen in Tareas. Selbst beiläufige Gespräche über Immobilien in der Dominikanischen Republik verwenden Tareas — 'tengo un solar de 3 tareas' ist wie Dominikaner Grundstücksgrößen beschreiben. Ausländische Käufer, die in dominikanische Immobilien investieren, müssen diese Einheit verstehen, um den Markt zu navigieren."
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Schritt-für-Schritt Tarea-Umrechnungen",
          "examples": [
            {
              "title": "10 Tareas in Quadratmeter umrechnen",
              "steps": [
                "Formel: m² = Tareas × 628,86",
                "10 × 628,86 = 6.288,6",
                "10 Tareas = 6.288,6 m²"
              ],
              "result": "10 Tareas = 6.288,6 m²"
            },
            {
              "title": "Wie viele Tareas in 1 Hektar?",
              "steps": [
                "1 Hektar = 10.000 m²",
                "Tareas = 10.000 ÷ 628,86",
                "= 15,9 Tareas"
              ],
              "result": "1 Hektar ≈ 15,9 Tareas"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Quadratmeter hat 1 Tarea?",
          "answer": "1 Tarea entspricht 628,86 Quadratmeter in der Dominikanischen Republik."
        },
        {
          "question": "Wie viele Tareas ergeben 1 Hektar?",
          "answer": "Ungefähr 15,9 Tareas entsprechen 1 Hektar (10.000 m² ÷ 628,86 m² = 15,9)."
        },
        {
          "question": "Wie viele Tareas in einem Acre?",
          "answer": "1 Acre ≈ 6,44 Tareas (4.046,86 m² ÷ 628,86 m² = 6,44)."
        },
        {
          "question": "Wird die Tarea nur in der Dominikanischen Republik verwendet?",
          "answer": "Die Tarea von 628,86 m² ist spezifisch für die Dominikanische Republik. Puerto Rico hat auch eine Einheit namens 'Tarea', aber sie entspricht etwa 3.930 m², was viel größer ist."
        },
        {
          "question": "Warum ist die dominikanische Tarea 628,86 m²?",
          "answer": "Sie ist definiert als ein Quadrat von 100 dominikanischen Varas pro Seite, wobei 1 dominikanische Vara = 0,2507 Meter. Also (100 × 0,2507)² = 25,07² = 628,86 m²."
        },
        {
          "question": "Ist die Tarea offiziell anerkannt?",
          "answer": "Ja, die Tarea ist die Standard-Landvermessung im dominikanischen Eigentumsrecht, verwendet im Tribunal Superior de Tierras, Landtiteln (Certificados de Título) und Katastervermessungen."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Vollständige Umrechnungstabelle anzeigen",
          "title": "Tareas zu Quadratmeter Umrechnungstabelle",
          "columns": {
            "ta": "Tareas",
            "m2": "Quadratmeter",
            "ha": "Hektar",
            "acres": "Acres"
          }
        }
      },
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
  inputs: [{ id: "tareaValue", type: "number", defaultValue: null, placeholder: "10", min: 0.001, max: 100000000, step: 0.01, suffix: "tareas" }],
  inputGroups: [],
  results: [
    { id: "m2", type: "primary", format: "number" },
    { id: "hectares", type: "secondary", format: "number" },
    { id: "acres", type: "secondary", format: "number" },
    { id: "km2", type: "secondary", format: "number" },
    { id: "ft2", type: "secondary", format: "number" },
  ],
  infoCards: [ { id: "quickConversions", type: "list", icon: "📋", itemCount: 6 }, { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 } ],
  detailedTable: {
    id: "conversionTable", buttonLabel: "View Full Conversion Table", buttonIcon: "📊", modalTitle: "Tareas to Square Meters Conversion Table",
    columns: [ { id: "ta", label: "Tareas", align: "center" }, { id: "m2", label: "Square Meters", align: "right", highlight: true }, { id: "ha", label: "Hectares", align: "right" }, { id: "acres", label: "Acres", align: "right" } ],
  },
  referenceData: [],
  educationSections: [ { id: "howToConvert", type: "prose", icon: "📖" }, { id: "commonUses", type: "prose", icon: "🌍" }, { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 } ],
  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],
  references: [
    { authors: "Tribunal Superior de Tierras", year: "2023", title: "Jurisdicción Inmobiliaria de la República Dominicana", source: "Poder Judicial, República Dominicana", url: "https://www.poderjudicial.gob.do/" },
    { authors: "United Nations Statistics Division", year: "1966", title: "World Weights and Measures: Handbook for Statisticians", source: "United Nations", url: "https://unstats.un.org/unsd/publication/SeriesM/SeriesM_21.pdf" },
  ],
  hero: { badge: "Free Tool", badgeVariant: "blue" as const },
  sidebar: { showNewsletter: true, showRelated: true },
  features: { export: true, save: true, share: true, rating: true },
  relatedCalculators: ["manzanas-to-hectareas", "fanegadas-to-hectareas", "cuadras-to-hectareas", "varas-to-metros"],
  ads: { sidebar: true, footer: true },
};

export function calculateTareasToMetrosCuadrados(data: { values: Record<string, unknown>; fieldUnits?: Record<string, string>; t?: Record<string, unknown> }): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};
  const tareaValue = values.tareaValue as number | null;
  if (tareaValue === null || tareaValue === undefined || tareaValue <= 0) return { values: {}, formatted: {}, summary: "", isValid: false };

  const m2 = tareaValue * TAREA_TO_M2;
  const hectares = m2 / HA_TO_M2;
  const acres = m2 / ACRE_TO_M2;
  const km2 = m2 / 1000000;
  const ft2 = m2 * 10.7639;

  const m2Unit = v["m2"] || "m²"; const haUnit = v["ha"] || "ha"; const acUnit = v["ac"] || "acres"; const km2Unit = v["km2"] || "km²"; const ft2Unit = v["ft2"] || "ft²";
  const fmt = (n: number, d: number = 4) => n >= 1000 ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : n.toFixed(d).replace(/0+$/, "").replace(/\.$/, "");

  const refTa = [1, 5, 10, 16, 50, 100];
  const refs: Record<string, string> = {};
  refTa.forEach((ta) => { refs[`ref${ta}`] = `${fmt(ta * TAREA_TO_M2, 0)} ${m2Unit}`; });

  const commonValues = [1, 2, 3, 5, 8, 10, 15, 16, 20, 25, 30, 50, 75, 100, 150, 200, 500, tareaValue];
  const uniqueVals = [...new Set(commonValues.map((v) => Math.round(v * 1000) / 1000))].sort((a, b) => a - b);
  const tableData = uniqueVals.map((ta) => ({
    ta: `${ta}`, m2: fmt(ta * TAREA_TO_M2, 0), ha: fmt(ta * TAREA_TO_HA, 4), acres: fmt(ta * TAREA_TO_M2 / ACRE_TO_M2, 3),
  }));

  const summary = f.summary?.replace("{tareaValue}", tareaValue.toString()).replace("{m2}", fmt(m2, 0)) || `${tareaValue} tareas = ${fmt(m2, 0)} m²`;
  return {
    values: { m2, hectares, acres, km2, ft2, ...refs },
    formatted: { m2: `${fmt(m2, 0)} ${m2Unit}`, hectares: `${fmt(hectares, 4)} ${haUnit}`, acres: `${fmt(acres, 3)} ${acUnit}`, km2: `${fmt(km2)} ${km2Unit}`, ft2: `${fmt(ft2, 0)} ${ft2Unit}`, ...refs },
    summary, isValid: true, metadata: { tableData },
  };
}

export default tareasToMetrosCuadradosConfig;
