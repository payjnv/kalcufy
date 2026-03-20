import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convert, UNIT_REGISTRY } from "@/engine/v4/units";

export const mbToGbConfig: CalculatorConfigV4 = {
  id: "mb-to-gb",
  version: "4.0",
  category: "conversion",
  icon: "💾",

  presets: [
    { id: "fiveHundred", icon: "📱", values: { amount: 500 } },
    { id: "thousand", icon: "💻", values: { amount: 1000 } },
    { id: "tenThousand", icon: "🖥️", values: { amount: 10000 } },
  ],

  t: {
    en: {
      name: "MB to GB Converter",
      slug: "mb-to-gb",
      subtitle: "Convert megabytes to gigabytes for phone storage, file sizes, and data plans.",
      breadcrumb: "MB to GB",

      seo: {
        title: "MB to GB Converter - Data Size Conversion Tool",
        description: "Convert megabytes to gigabytes instantly. 1 GB = 1,000 MB. Essential for phone storage, file sizes, and data plans.",
        shortDescription: "Convert megabytes to gigabytes for phone storage, file sizes, and data plans.",
        keywords: ["mb to gb", "megabytes to gigabytes", "storage converter", "phone storage calculator", "data plan converter", "MB GB conversion"],
      },

      calculator: { yourInformation: "Enter Data Size" },
      ui: { yourInformation: "Enter Data Size", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Data Size", helpText: "Enter the data size to convert" },
      },

      results: {
        primary: { label: "Result" },
      },

      presets: {
        fiveHundred: { label: "📱 500 MB", description: "500 MB (0.5 GB)" },
        thousand: { label: "💻 1,000 MB", description: "1,000 MB (1 GB)" },
        tenThousand: { label: "🖥️ 10,000 MB", description: "10,000 MB (10 GB)" },
      },

      values: {},
      formats: { summary: "Conversion result" },

      infoCards: {
        results: {
          title: "All Conversions",
          items: [
            { label: "Primary Result", valueKey: "primary" },
            { label: "Secondary", valueKey: "secondary1" },
            { label: "Tertiary", valueKey: "secondary2" },
            { label: "Additional", valueKey: "secondary3" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "1 GB = 1,000 MB | A typical phone photo is 3-5 MB",
            "Select any unit from the dropdown to convert from that unit instead.",
            "Results update instantly as you type.",
            "Use presets for common conversion values.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "About This Conversion",
          content: "Convert megabytes to gigabytes instantly. 1 GB = 1,000 MB. Essential for phone storage, file sizes, and data plans. This converter supports all related units in the data category, letting you convert between any combination with a single input.",
        },
        howItWorks: {
          title: "How to Convert",
          content: "Enter your value and select the source unit from the dropdown. The converter instantly shows the equivalent in all other units of this type. All conversions use precise factors from international standards (NIST/BIPM).",
        },
        considerations: {
          title: "Important Notes",
          items: [
            { text: "1 GB = 1,000 MB | A typical phone photo is 3-5 MB", type: "info" },
            { text: "Select any unit from the dropdown to change the source unit.", type: "info" },
            { text: "All conversions are bidirectional — works both ways.", type: "info" },
            { text: "Results are calculated using exact conversion factors.", type: "info" },
            { text: "For very large or small numbers, scientific notation may be used.", type: "info" },
            { text: "Bookmark this page for quick access to this converter.", type: "info" },
          ],
        },
        commonValues: {
          title: "Common Conversions",
          items: [
            { text: "Use presets above for frequently used amounts.", type: "info" },
            { text: "All results update in real-time as you type.", type: "info" },
            { text: "Works on mobile — use it anywhere.", type: "info" },
            { text: "Share results using the Share button below.", type: "info" },
            { text: "Save results for later with the Save button.", type: "info" },
            { text: "Supports all units in the data group.", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Common scenarios",
          examples: [
            {
              title: "Basic Conversion",
              steps: ["Enter value in source unit", "Read result in target unit", "Use dropdown to change source unit"],
              result: "Instant conversion result",
            },
            {
              title: "Reverse Conversion",
              steps: ["Change the dropdown to the target unit", "Enter your value", "Read the result in the original unit"],
              result: "Works both ways — just change the dropdown",
            },
          ],
        },
      },

      faqs: [
        { question: "How accurate are these conversions?", answer: "All conversions use exact factors from NIST and BIPM international standards. Results are accurate to at least 6 significant digits." },
        { question: "Can I convert in the reverse direction?", answer: "Yes! Simply change the unit in the dropdown to convert from any unit to all others. The converter is fully bidirectional." },
        { question: "What units are supported?", answer: "This converter supports all units in the data category: mb, gb, tb, kb, byte, pb. Select any from the dropdown." },
        { question: "Does this work on mobile?", answer: "Yes, this converter is fully responsive and works on any device — phone, tablet, or desktop." },
        { question: "Can I share my conversion result?", answer: "Yes! Use the Share Results button to generate a link with your exact conversion that you can send to anyone." },
        { question: "Is this converter free?", answer: "Yes, 100% free with no registration required. Use it as many times as you need." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor MB a GB",
      "slug": "calculadora-convertir-mb-a-gb",
      "subtitle": "Convierte megabytes a gigabytes para almacenamiento del teléfono, tamaños de archivos y planes de datos.",
      "breadcrumb": "MB a GB",
      "seo": {
        "title": "Convertidor MB a GB - Herramienta de Conversión de Tamaño de Datos",
        "description": "Convierte megabytes a gigabytes al instante. 1 GB = 1,000 MB. Esencial para almacenamiento del teléfono, tamaños de archivos y planes de datos.",
        "shortDescription": "Convierte megabytes a gigabytes para almacenamiento del teléfono, tamaños de archivos y planes de datos.",
        "keywords": [
          "mb a gb",
          "megabytes a gigabytes",
          "convertidor de almacenamiento",
          "calculadora almacenamiento teléfono",
          "convertidor plan de datos",
          "conversión MB GB"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "amount": {
          "label": "Tamaño de Datos",
          "helpText": "Ingresa el tamaño de datos a convertir"
        }
      },
      "results": {
        "primary": {
          "label": "Resultado"
        }
      },
      "presets": {
        "fiveHundred": {
          "label": "📱 500 MB",
          "description": "500 MB (0.5 GB)"
        },
        "thousand": {
          "label": "💻 1,000 MB",
          "description": "1,000 MB (1 GB)"
        },
        "tenThousand": {
          "label": "🖥️ 10,000 MB",
          "description": "10,000 MB (10 GB)"
        }
      },
      "values": {},
      "formats": {
        "summary": "Resultado de la conversión"
      },
      "infoCards": {
        "results": {
          "title": "Todas las Conversiones",
          "items": [
            {
              "label": "Resultado Principal",
              "valueKey": "primary"
            },
            {
              "label": "Secundario",
              "valueKey": "secondary1"
            },
            {
              "label": "Terciario",
              "valueKey": "secondary2"
            },
            {
              "label": "Adicional",
              "valueKey": "secondary3"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Conversión",
          "items": [
            "1 GB = 1,000 MB | Una foto típica de teléfono es de 3-5 MB",
            "Selecciona cualquier unidad del menú desplegable para convertir desde esa unidad.",
            "Los resultados se actualizan al instante mientras escribes.",
            "Usa los preajustes para valores de conversión comunes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Acerca de Esta Conversión",
          "content": "Convierte megabytes a gigabytes al instante. 1 GB = 1,000 MB. Esencial para almacenamiento del teléfono, tamaños de archivos y planes de datos. Este convertidor admite todas las unidades relacionadas en la categoría de datos, permitiéndote convertir entre cualquier combinación con una sola entrada."
        },
        "howItWorks": {
          "title": "Cómo Convertir",
          "content": "Ingresa tu valor y selecciona la unidad de origen del menú desplegable. El convertidor muestra instantáneamente el equivalente en todas las demás unidades de este tipo. Todas las conversiones usan factores precisos de estándares internacionales (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notas Importantes",
          "items": [
            {
              "text": "1 GB = 1,000 MB | Una foto típica de teléfono es de 3-5 MB",
              "type": "info"
            },
            {
              "text": "Selecciona cualquier unidad del menú desplegable para cambiar la unidad de origen.",
              "type": "info"
            },
            {
              "text": "Todas las conversiones son bidireccionales — funcionan en ambos sentidos.",
              "type": "info"
            },
            {
              "text": "Los resultados se calculan usando factores de conversión exactos.",
              "type": "info"
            },
            {
              "text": "Para números muy grandes o pequeños, se puede usar notación científica.",
              "type": "info"
            },
            {
              "text": "Guarda esta página en favoritos para acceso rápido a este convertidor.",
              "type": "info"
            }
          ]
        },
        "commonValues": {
          "title": "Conversiones Comunes",
          "items": [
            {
              "text": "Usa los preajustes anteriores para cantidades frecuentemente utilizadas.",
              "type": "info"
            },
            {
              "text": "Todos los resultados se actualizan en tiempo real mientras escribes.",
              "type": "info"
            },
            {
              "text": "Funciona en móviles — úsalo en cualquier lugar.",
              "type": "info"
            },
            {
              "text": "Comparte resultados usando el botón Compartir abajo.",
              "type": "info"
            },
            {
              "text": "Guarda resultados para más tarde con el botón Guardar.",
              "type": "info"
            },
            {
              "text": "Admite todas las unidades en el grupo de datos.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Conversión",
          "description": "Escenarios comunes",
          "examples": [
            {
              "title": "Conversión Básica",
              "steps": [
                "Ingresa el valor en la unidad de origen",
                "Lee el resultado en la unidad de destino",
                "Usa el menú desplegable para cambiar la unidad de origen"
              ],
              "result": "Resultado de conversión instantánea"
            },
            {
              "title": "Conversión Inversa",
              "steps": [
                "Cambia el menú desplegable a la unidad de destino",
                "Ingresa tu valor",
                "Lee el resultado en la unidad original"
              ],
              "result": "Funciona en ambos sentidos — solo cambia el menú desplegable"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué tan precisas son estas conversiones?",
          "answer": "Todas las conversiones usan factores exactos de los estándares internacionales NIST y BIPM. Los resultados son precisos hasta al menos 6 dígitos significativos."
        },
        {
          "question": "¿Puedo convertir en dirección inversa?",
          "answer": "¡Sí! Simplemente cambia la unidad en el menú desplegable para convertir desde cualquier unidad a todas las demás. El convertidor es completamente bidireccional."
        },
        {
          "question": "¿Qué unidades son compatibles?",
          "answer": "Este convertidor admite todas las unidades en la categoría de datos: mb, gb, tb, kb, byte, pb. Selecciona cualquiera del menú desplegable."
        },
        {
          "question": "¿Funciona esto en móviles?",
          "answer": "Sí, este convertidor es completamente adaptable y funciona en cualquier dispositivo — teléfono, tablet o computadora de escritorio."
        },
        {
          "question": "¿Puedo compartir mi resultado de conversión?",
          "answer": "¡Sí! Usa el botón Compartir Resultados para generar un enlace con tu conversión exacta que puedes enviar a cualquiera."
        },
        {
          "question": "¿Es gratuito este convertidor?",
          "answer": "Sí, 100% gratuito sin necesidad de registro. Úsalo tantas veces como necesites."
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
      "name": "Conversor MB para GB",
      "slug": "calculadora-mb-para-gb",
      "subtitle": "Converta megabytes para gigabytes para armazenamento de celular, tamanhos de arquivo e planos de dados.",
      "breadcrumb": "MB para GB",
      "seo": {
        "title": "Conversor MB para GB - Ferramenta de Conversão de Tamanho de Dados",
        "description": "Converta megabytes para gigabytes instantaneamente. 1 GB = 1.000 MB. Essencial para armazenamento de celular, tamanhos de arquivo e planos de dados.",
        "shortDescription": "Converta megabytes para gigabytes para armazenamento de celular, tamanhos de arquivo e planos de dados.",
        "keywords": [
          "mb para gb",
          "megabytes para gigabytes",
          "conversor armazenamento",
          "calculadora armazenamento celular",
          "conversor plano dados",
          "conversão MB GB"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Tamanho dos Dados",
          "helpText": "Digite o tamanho dos dados para converter"
        }
      },
      "results": {
        "primary": {
          "label": "Resultado"
        }
      },
      "presets": {
        "fiveHundred": {
          "label": "📱 500 MB",
          "description": "500 MB (0,5 GB)"
        },
        "thousand": {
          "label": "💻 1.000 MB",
          "description": "1.000 MB (1 GB)"
        },
        "tenThousand": {
          "label": "🖥️ 10.000 MB",
          "description": "10.000 MB (10 GB)"
        }
      },
      "values": {},
      "formats": {
        "summary": "Resultado da conversão"
      },
      "infoCards": {
        "results": {
          "title": "Todas as Conversões",
          "items": [
            {
              "label": "Resultado Principal",
              "valueKey": "primary"
            },
            {
              "label": "Secundário",
              "valueKey": "secondary1"
            },
            {
              "label": "Terciário",
              "valueKey": "secondary2"
            },
            {
              "label": "Adicional",
              "valueKey": "secondary3"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Conversão",
          "items": [
            "1 GB = 1.000 MB | Uma foto típica de celular tem 3-5 MB",
            "Selecione qualquer unidade no menu suspenso para converter a partir dessa unidade.",
            "Os resultados são atualizados instantaneamente conforme você digita.",
            "Use os valores predefinidos para conversões comuns."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Sobre Esta Conversão",
          "content": "Converta megabytes para gigabytes instantaneamente. 1 GB = 1.000 MB. Essencial para armazenamento de celular, tamanhos de arquivo e planos de dados. Este conversor suporta todas as unidades relacionadas na categoria de dados, permitindo converter entre qualquer combinação com uma única entrada."
        },
        "howItWorks": {
          "title": "Como Converter",
          "content": "Digite seu valor e selecione a unidade de origem no menu suspenso. O conversor mostra instantaneamente o equivalente em todas as outras unidades deste tipo. Todas as conversões usam fatores precisos de padrões internacionais (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notas Importantes",
          "items": [
            {
              "text": "1 GB = 1.000 MB | Uma foto típica de celular tem 3-5 MB",
              "type": "info"
            },
            {
              "text": "Selecione qualquer unidade no menu suspenso para alterar a unidade de origem.",
              "type": "info"
            },
            {
              "text": "Todas as conversões são bidirecionais — funcionam nos dois sentidos.",
              "type": "info"
            },
            {
              "text": "Os resultados são calculados usando fatores de conversão exatos.",
              "type": "info"
            },
            {
              "text": "Para números muito grandes ou pequenos, notação científica pode ser usada.",
              "type": "info"
            },
            {
              "text": "Adicione esta página aos favoritos para acesso rápido ao conversor.",
              "type": "info"
            }
          ]
        },
        "commonValues": {
          "title": "Conversões Comuns",
          "items": [
            {
              "text": "Use os valores predefinidos acima para quantidades frequentemente usadas.",
              "type": "info"
            },
            {
              "text": "Todos os resultados são atualizados em tempo real conforme você digita.",
              "type": "info"
            },
            {
              "text": "Funciona no celular — use em qualquer lugar.",
              "type": "info"
            },
            {
              "text": "Compartilhe resultados usando o botão Compartilhar abaixo.",
              "type": "info"
            },
            {
              "text": "Salve resultados para depois com o botão Salvar.",
              "type": "info"
            },
            {
              "text": "Suporta todas as unidades do grupo de dados.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Conversão",
          "description": "Cenários comuns",
          "examples": [
            {
              "title": "Conversão Básica",
              "steps": [
                "Digite o valor na unidade de origem",
                "Leia o resultado na unidade de destino",
                "Use o menu suspenso para alterar a unidade de origem"
              ],
              "result": "Resultado de conversão instantâneo"
            },
            {
              "title": "Conversão Reversa",
              "steps": [
                "Altere o menu suspenso para a unidade de destino",
                "Digite seu valor",
                "Leia o resultado na unidade original"
              ],
              "result": "Funciona nos dois sentidos — apenas altere o menu suspenso"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quão precisas são essas conversões?",
          "answer": "Todas as conversões usam fatores exatos dos padrões internacionais NIST e BIPM. Os resultados são precisos para pelo menos 6 dígitos significativos."
        },
        {
          "question": "Posso converter na direção reversa?",
          "answer": "Sim! Simplesmente altere a unidade no menu suspenso para converter de qualquer unidade para todas as outras. O conversor é totalmente bidirecional."
        },
        {
          "question": "Quais unidades são suportadas?",
          "answer": "Este conversor suporta todas as unidades na categoria de dados: mb, gb, tb, kb, byte, pb. Selecione qualquer uma no menu suspenso."
        },
        {
          "question": "Isso funciona no celular?",
          "answer": "Sim, este conversor é totalmente responsivo e funciona em qualquer dispositivo — celular, tablet ou desktop."
        },
        {
          "question": "Posso compartilhar meu resultado de conversão?",
          "answer": "Sim! Use o botão Compartilhar Resultados para gerar um link com sua conversão exata que você pode enviar para qualquer pessoa."
        },
        {
          "question": "Este conversor é gratuito?",
          "answer": "Sim, 100% gratuito sem necessidade de registro. Use quantas vezes precisar."
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
      "name": "Convertisseur MB vers GB",
      "slug": "calculateur-conversion-mb-vers-gb",
      "subtitle": "Convertissez les mégaoctets en gigaoctets pour le stockage téléphone, tailles de fichiers et forfaits de données.",
      "breadcrumb": "MB vers GB",
      "seo": {
        "title": "Convertisseur MB vers GB - Outil de Conversion de Taille de Données",
        "description": "Convertissez les mégaoctets en gigaoctets instantanément. 1 GB = 1 000 MB. Essentiel pour le stockage téléphone, tailles de fichiers et forfaits de données.",
        "shortDescription": "Convertissez les mégaoctets en gigaoctets pour le stockage téléphone, tailles de fichiers et forfaits de données.",
        "keywords": [
          "mb vers gb",
          "mégaoctets vers gigaoctets",
          "convertisseur stockage",
          "calculateur stockage téléphone",
          "convertisseur forfait données",
          "conversion MB GB"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Taille de Données",
          "helpText": "Entrez la taille de données à convertir"
        }
      },
      "results": {
        "primary": {
          "label": "Résultat"
        }
      },
      "presets": {
        "fiveHundred": {
          "label": "📱 500 MB",
          "description": "500 MB (0,5 GB)"
        },
        "thousand": {
          "label": "💻 1 000 MB",
          "description": "1 000 MB (1 GB)"
        },
        "tenThousand": {
          "label": "🖥️ 10 000 MB",
          "description": "10 000 MB (10 GB)"
        }
      },
      "values": {},
      "formats": {
        "summary": "Résultat de conversion"
      },
      "infoCards": {
        "results": {
          "title": "Toutes les Conversions",
          "items": [
            {
              "label": "Résultat Principal",
              "valueKey": "primary"
            },
            {
              "label": "Secondaire",
              "valueKey": "secondary1"
            },
            {
              "label": "Tertiaire",
              "valueKey": "secondary2"
            },
            {
              "label": "Supplémentaire",
              "valueKey": "secondary3"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Conversion",
          "items": [
            "1 GB = 1 000 MB | Une photo typique de téléphone fait 3-5 MB",
            "Sélectionnez n'importe quelle unité dans le menu déroulant pour convertir depuis cette unité.",
            "Les résultats se mettent à jour instantanément pendant que vous tapez.",
            "Utilisez les préréglages pour les valeurs de conversion courantes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "À Propos de Cette Conversion",
          "content": "Convertissez les mégaoctets en gigaoctets instantanément. 1 GB = 1 000 MB. Essentiel pour le stockage téléphone, tailles de fichiers et forfaits de données. Ce convertisseur prend en charge toutes les unités connexes dans la catégorie données, vous permettant de convertir entre n'importe quelle combinaison avec une seule saisie."
        },
        "howItWorks": {
          "title": "Comment Convertir",
          "content": "Entrez votre valeur et sélectionnez l'unité source dans le menu déroulant. Le convertisseur affiche instantanément l'équivalent dans toutes les autres unités de ce type. Toutes les conversions utilisent des facteurs précis des standards internationaux (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notes Importantes",
          "items": [
            {
              "text": "1 GB = 1 000 MB | Une photo typique de téléphone fait 3-5 MB",
              "type": "info"
            },
            {
              "text": "Sélectionnez n'importe quelle unité dans le menu déroulant pour changer l'unité source.",
              "type": "info"
            },
            {
              "text": "Toutes les conversions sont bidirectionnelles — fonctionnent dans les deux sens.",
              "type": "info"
            },
            {
              "text": "Les résultats sont calculés en utilisant des facteurs de conversion exacts.",
              "type": "info"
            },
            {
              "text": "Pour les très grands ou petits nombres, la notation scientifique peut être utilisée.",
              "type": "info"
            },
            {
              "text": "Mettez cette page en favoris pour un accès rapide à ce convertisseur.",
              "type": "info"
            }
          ]
        },
        "commonValues": {
          "title": "Conversions Courantes",
          "items": [
            {
              "text": "Utilisez les préréglages ci-dessus pour les montants fréquemment utilisés.",
              "type": "info"
            },
            {
              "text": "Tous les résultats se mettent à jour en temps réel pendant que vous tapez.",
              "type": "info"
            },
            {
              "text": "Fonctionne sur mobile — utilisez-le n'importe où.",
              "type": "info"
            },
            {
              "text": "Partagez les résultats en utilisant le bouton Partager ci-dessous.",
              "type": "info"
            },
            {
              "text": "Sauvegardez les résultats pour plus tard avec le bouton Sauvegarder.",
              "type": "info"
            },
            {
              "text": "Prend en charge toutes les unités du groupe données.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Conversion",
          "description": "Scénarios courants",
          "examples": [
            {
              "title": "Conversion de Base",
              "steps": [
                "Entrez la valeur dans l'unité source",
                "Lisez le résultat dans l'unité cible",
                "Utilisez le menu déroulant pour changer l'unité source"
              ],
              "result": "Résultat de conversion instantané"
            },
            {
              "title": "Conversion Inverse",
              "steps": [
                "Changez le menu déroulant vers l'unité cible",
                "Entrez votre valeur",
                "Lisez le résultat dans l'unité originale"
              ],
              "result": "Fonctionne dans les deux sens — changez simplement le menu déroulant"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la précision de ces conversions ?",
          "answer": "Toutes les conversions utilisent des facteurs exacts des standards internationaux NIST et BIPM. Les résultats sont précis à au moins 6 chiffres significatifs."
        },
        {
          "question": "Puis-je convertir dans le sens inverse ?",
          "answer": "Oui ! Changez simplement l'unité dans le menu déroulant pour convertir depuis n'importe quelle unité vers toutes les autres. Le convertisseur est entièrement bidirectionnel."
        },
        {
          "question": "Quelles unités sont prises en charge ?",
          "answer": "Ce convertisseur prend en charge toutes les unités de la catégorie données : mb, gb, tb, kb, octet, pb. Sélectionnez n'importe laquelle dans le menu déroulant."
        },
        {
          "question": "Est-ce que cela fonctionne sur mobile ?",
          "answer": "Oui, ce convertisseur est entièrement responsive et fonctionne sur n'importe quel appareil — téléphone, tablette ou ordinateur de bureau."
        },
        {
          "question": "Puis-je partager mon résultat de conversion ?",
          "answer": "Oui ! Utilisez le bouton Partager les Résultats pour générer un lien avec votre conversion exacte que vous pouvez envoyer à n'importe qui."
        },
        {
          "question": "Ce convertisseur est-il gratuit ?",
          "answer": "Oui, 100% gratuit sans inscription requise. Utilisez-le autant de fois que nécessaire."
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
      "name": "MB zu GB Konverter",
      "slug": "megabyte-zu-gigabyte-rechner",
      "subtitle": "Konvertieren Sie Megabyte zu Gigabyte für Telefonspeicher, Dateigrößen und Datentarife.",
      "breadcrumb": "MB zu GB",
      "seo": {
        "title": "MB zu GB Konverter - Datengrößen-Umrechnungstool",
        "description": "Konvertieren Sie Megabyte zu Gigabyte sofort. 1 GB = 1.000 MB. Unverzichtbar für Telefonspeicher, Dateigrößen und Datentarife.",
        "shortDescription": "Konvertieren Sie Megabyte zu Gigabyte für Telefonspeicher, Dateigrößen und Datentarife.",
        "keywords": [
          "mb zu gb",
          "megabyte zu gigabyte",
          "speicher konverter",
          "telefonspeicher rechner",
          "datentarif konverter",
          "MB GB umrechnung"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "amount": {
          "label": "Datengröße",
          "helpText": "Geben Sie die zu konvertierende Datengröße ein"
        }
      },
      "results": {
        "primary": {
          "label": "Ergebnis"
        }
      },
      "presets": {
        "fiveHundred": {
          "label": "📱 500 MB",
          "description": "500 MB (0,5 GB)"
        },
        "thousand": {
          "label": "💻 1.000 MB",
          "description": "1.000 MB (1 GB)"
        },
        "tenThousand": {
          "label": "🖥️ 10.000 MB",
          "description": "10.000 MB (10 GB)"
        }
      },
      "values": {},
      "formats": {
        "summary": "Konvertierungsergebnis"
      },
      "infoCards": {
        "results": {
          "title": "Alle Konvertierungen",
          "items": [
            {
              "label": "Hauptergebnis",
              "valueKey": "primary"
            },
            {
              "label": "Sekundär",
              "valueKey": "secondary1"
            },
            {
              "label": "Tertiär",
              "valueKey": "secondary2"
            },
            {
              "label": "Zusätzlich",
              "valueKey": "secondary3"
            }
          ]
        },
        "tips": {
          "title": "Konvertierungstipps",
          "items": [
            "1 GB = 1.000 MB | Ein typisches Handy-Foto ist 3-5 MB",
            "Wählen Sie eine beliebige Einheit aus dem Dropdown-Menü, um von dieser Einheit zu konvertieren.",
            "Ergebnisse werden sofort beim Tippen aktualisiert.",
            "Verwenden Sie Voreinstellungen für häufige Konvertierungswerte."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Über diese Konvertierung",
          "content": "Konvertieren Sie Megabyte zu Gigabyte sofort. 1 GB = 1.000 MB. Unverzichtbar für Telefonspeicher, Dateigrößen und Datentarife. Dieser Konverter unterstützt alle verwandten Einheiten in der Datenkategorie und ermöglicht es Ihnen, zwischen jeder Kombination mit einer einzigen Eingabe zu konvertieren."
        },
        "howItWorks": {
          "title": "Wie man konvertiert",
          "content": "Geben Sie Ihren Wert ein und wählen Sie die Quelleinheit aus dem Dropdown-Menü. Der Konverter zeigt sofort das Äquivalent in allen anderen Einheiten dieses Typs an. Alle Konvertierungen verwenden präzise Faktoren aus internationalen Standards (NIST/BIPM)."
        },
        "considerations": {
          "title": "Wichtige Hinweise",
          "items": [
            {
              "text": "1 GB = 1.000 MB | Ein typisches Handy-Foto ist 3-5 MB",
              "type": "info"
            },
            {
              "text": "Wählen Sie eine beliebige Einheit aus dem Dropdown-Menü, um die Quelleinheit zu ändern.",
              "type": "info"
            },
            {
              "text": "Alle Konvertierungen sind bidirektional — funktioniert in beide Richtungen.",
              "type": "info"
            },
            {
              "text": "Ergebnisse werden mit exakten Konvertierungsfaktoren berechnet.",
              "type": "info"
            },
            {
              "text": "Bei sehr großen oder kleinen Zahlen kann wissenschaftliche Notation verwendet werden.",
              "type": "info"
            },
            {
              "text": "Setzen Sie ein Lesezeichen auf diese Seite für schnellen Zugriff auf diesen Konverter.",
              "type": "info"
            }
          ]
        },
        "commonValues": {
          "title": "Häufige Konvertierungen",
          "items": [
            {
              "text": "Verwenden Sie Voreinstellungen oben für häufig verwendete Mengen.",
              "type": "info"
            },
            {
              "text": "Alle Ergebnisse werden in Echtzeit beim Tippen aktualisiert.",
              "type": "info"
            },
            {
              "text": "Funktioniert auf dem Handy — verwenden Sie es überall.",
              "type": "info"
            },
            {
              "text": "Teilen Sie Ergebnisse mit der Teilen-Schaltfläche unten.",
              "type": "info"
            },
            {
              "text": "Speichern Sie Ergebnisse für später mit der Speichern-Schaltfläche.",
              "type": "info"
            },
            {
              "text": "Unterstützt alle Einheiten in der Datengruppe.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Konvertierungsbeispiele",
          "description": "Häufige Szenarien",
          "examples": [
            {
              "title": "Grundkonvertierung",
              "steps": [
                "Wert in Quelleinheit eingeben",
                "Ergebnis in Zieleinheit ablesen",
                "Dropdown verwenden, um Quelleinheit zu ändern"
              ],
              "result": "Sofortiges Konvertierungsergebnis"
            },
            {
              "title": "Umgekehrte Konvertierung",
              "steps": [
                "Dropdown auf die Zieleinheit ändern",
                "Ihren Wert eingeben",
                "Ergebnis in der ursprünglichen Einheit ablesen"
              ],
              "result": "Funktioniert in beide Richtungen — einfach das Dropdown ändern"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie genau sind diese Konvertierungen?",
          "answer": "Alle Konvertierungen verwenden exakte Faktoren aus den internationalen Standards NIST und BIPM. Ergebnisse sind auf mindestens 6 signifikante Stellen genau."
        },
        {
          "question": "Kann ich in umgekehrte Richtung konvertieren?",
          "answer": "Ja! Ändern Sie einfach die Einheit im Dropdown-Menü, um von jeder Einheit zu allen anderen zu konvertieren. Der Konverter ist vollständig bidirektional."
        },
        {
          "question": "Welche Einheiten werden unterstützt?",
          "answer": "Dieser Konverter unterstützt alle Einheiten in der Datenkategorie: MB, GB, TB, KB, Byte, PB. Wählen Sie eine beliebige aus dem Dropdown-Menü."
        },
        {
          "question": "Funktioniert das auf dem Handy?",
          "answer": "Ja, dieser Konverter ist vollständig responsive und funktioniert auf jedem Gerät — Handy, Tablet oder Desktop."
        },
        {
          "question": "Kann ich mein Konvertierungsergebnis teilen?",
          "answer": "Ja! Verwenden Sie die Ergebnisse-teilen-Schaltfläche, um einen Link mit Ihrer exakten Konvertierung zu generieren, den Sie an jeden senden können."
        },
        {
          "question": "Ist dieser Konverter kostenlos?",
          "answer": "Ja, 100% kostenlos ohne erforderliche Registrierung. Verwenden Sie ihn so oft Sie möchten."
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
      defaultValue: 500,
      placeholder: "500",
      min: 0,
      step: 1,
      unitType: "data",
      syncGroup: false,
      defaultUnit: "mb",
      allowedUnits: ["mb", "gb", "tb", "kb", "byte", "pb"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "primary", type: "primary", format: "number" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "commonValues", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "NIST", year: "2024", title: "Unit Conversion Factors", source: "National Institute of Standards and Technology", url: "https://www.nist.gov/pml/owm/metric-si/unit-conversion" },
    { authors: "BIPM", year: "2023", title: "The International System of Units (SI)", source: "Bureau International des Poids et Mesures", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Converter" },
  sidebar: {},
  features: {},
  relatedCalculators: [],
  ads: {},
};

// ============================================================================
// CALCULATE
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.001) return val.toExponential(3);
  if (Math.abs(val) >= 1e9) return val.toExponential(4);
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 4 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 6 });
}

export function calculateMbToGb(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "mb";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const unitGroup = UNIT_REGISTRY["data"];
  const units = unitGroup?.units || [];
  const results: Record<string, number> = {};
  const formatted: Record<string, string> = {};

  for (const unit of units) {
    try {
      const converted = convert(amount, fromUnit, unit.id, "data");
      results[unit.id] = converted;
      formatted[unit.id] = `${fmtNum(converted)} ${unit.symbol}`;
    } catch {
      // Skip units that can't convert
    }
  }

  const allUnits = ["mb", "gb", "tb", "kb", "byte", "pb"];
  const otherUnits = allUnits.filter(u => u !== fromUnit);

  formatted.primary = formatted[otherUnits[0]] || formatted[allUnits[1]] || "—";
  formatted.secondary1 = formatted[otherUnits[1]] || "—";
  formatted.secondary2 = formatted[otherUnits[2]] || "—";
  formatted.secondary3 = formatted[otherUnits[3]] || "—";

  const fromSymbol = units.find(u => u.id === fromUnit)?.symbol || fromUnit;
  const toSymbol = units.find(u => u.id === otherUnits[0])?.symbol || otherUnits[0];
  const primaryVal = results[otherUnits[0]] || 0;

  return {
    values: { primary: primaryVal, ...results },
    formatted,
    summary: `${fmtNum(amount)} ${fromSymbol} = ${fmtNum(primaryVal)} ${toSymbol}`,
    isValid: true,
  };
}

export default mbToGbConfig;
