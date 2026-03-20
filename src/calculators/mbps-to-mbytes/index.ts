import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convert, UNIT_REGISTRY } from "@/engine/v4/units";

export const mbpsToMbytesConfig: CalculatorConfigV4 = {
  id: "mbps-to-mbytes",
  version: "4.0",
  category: "conversion",
  icon: "📶",

  presets: [
    { id: "fifty", icon: "📶", values: { amount: 50 } },
    { id: "hundred", icon: "🌐", values: { amount: 100 } },
    { id: "gig", icon: "⚡", values: { amount: 1000 } },
  ],

  t: {
    en: {
      name: "Mbps to MB/s Converter",
      slug: "mbps-to-mbytes",
      subtitle: "Convert Mbps to MB/s to understand your real internet download and upload speeds.",
      breadcrumb: "Mbps to MB/s",

      seo: {
        title: "Mbps to MB/s Converter - Internet Speed Tool",
        description: "Convert megabits per second to megabytes per second. Understand your real download speed: 100 Mbps = 12.5 MB/s.",
        shortDescription: "Convert Mbps to MB/s to understand your real internet download and upload speeds",
        keywords: ["mbps to mb/s", "megabits to megabytes", "internet speed converter", "download speed calculator", "bandwidth converter", "mbps mbytes conversion"],
      },

      calculator: { yourInformation: "Enter Speed" },
      ui: { yourInformation: "Enter Speed", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Speed", helpText: "Enter the speed to convert" },
      },

      results: {
        primary: { label: "Result" },
      },

      presets: {
        fifty: { label: "📶 50 Mbps", description: "50 Mbps (6.25 MB/s)" },
        hundred: { label: "🌐 100 Mbps", description: "100 Mbps (12.5 MB/s)" },
        gig: { label: "⚡ 1 Gbps", description: "1 Gbps (125 MB/s)" },
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
            "Divide Mbps by 8 to get MB/s. Example: 100 Mbps = 12.5 MB/s",
            "Select any unit from the dropdown to convert from that unit instead.",
            "Results update instantly as you type.",
            "Use presets for common conversion values.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "About This Conversion",
          content: "Convert megabits per second to megabytes per second. Understand your real download speed: 100 Mbps = 12.5 MB/s. This converter supports all related units in the data_rate category, letting you convert between any combination with a single input.",
        },
        howItWorks: {
          title: "How to Convert",
          content: "Enter your value and select the source unit from the dropdown. The converter instantly shows the equivalent in all other units of this type. All conversions use precise factors from international standards (NIST/BIPM).",
        },
        considerations: {
          title: "Important Notes",
          items: [
            { text: "Divide Mbps by 8 to get MB/s. Example: 100 Mbps = 12.5 MB/s", type: "info" },
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
            { text: "Supports all units in the data_rate group.", type: "info" },
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
        { question: "What units are supported?", answer: "This converter supports all units in the data_rate category: mbps, mb_s, gbps, gb_s, kbps, kb_s, bps. Select any from the dropdown." },
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
      "name": "Convertidor de Mbps a MB/s",
      "slug": "calculadora-conversion-mbps-megabytes",
      "subtitle": "Convierte Mbps a MB/s para entender la velocidad real de descarga y subida de tu internet.",
      "breadcrumb": "Mbps a MB/s",
      "seo": {
        "title": "Convertidor de Mbps a MB/s - Herramienta de Velocidad de Internet",
        "description": "Convierte megabits por segundo a megabytes por segundo. Entiende tu velocidad de descarga real: 100 Mbps = 12.5 MB/s.",
        "shortDescription": "Convierte Mbps a MB/s para entender la velocidad real de descarga y subida de tu internet",
        "keywords": [
          "mbps a mb/s",
          "megabits a megabytes",
          "convertidor velocidad internet",
          "calculadora velocidad descarga",
          "convertidor ancho banda",
          "conversion mbps megabytes"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Velocidad",
          "helpText": "Ingresa la velocidad a convertir"
        }
      },
      "results": {
        "primary": {
          "label": "Resultado"
        }
      },
      "presets": {
        "fifty": {
          "label": "📶 50 Mbps",
          "description": "50 Mbps (6.25 MB/s)"
        },
        "hundred": {
          "label": "🌐 100 Mbps",
          "description": "100 Mbps (12.5 MB/s)"
        },
        "gig": {
          "label": "⚡ 1 Gbps",
          "description": "1 Gbps (125 MB/s)"
        }
      },
      "values": {},
      "formats": {
        "summary": "Resultado de conversión"
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
            "Divide Mbps entre 8 para obtener MB/s. Ejemplo: 100 Mbps = 12.5 MB/s",
            "Selecciona cualquier unidad del menú desplegable para convertir desde esa unidad.",
            "Los resultados se actualizan instantáneamente mientras escribes.",
            "Usa las configuraciones predefinidas para valores de conversión comunes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Acerca de Esta Conversión",
          "content": "Convierte megabits por segundo a megabytes por segundo. Entiende tu velocidad de descarga real: 100 Mbps = 12.5 MB/s. Este convertidor soporta todas las unidades relacionadas en la categoría velocidad_datos, permitiéndote convertir entre cualquier combinación con una sola entrada."
        },
        "howItWorks": {
          "title": "Cómo Convertir",
          "content": "Ingresa tu valor y selecciona la unidad de origen del menú desplegable. El convertidor muestra instantáneamente el equivalente en todas las otras unidades de este tipo. Todas las conversiones usan factores precisos de estándares internacionales (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notas Importantes",
          "items": [
            {
              "text": "Divide Mbps entre 8 para obtener MB/s. Ejemplo: 100 Mbps = 12.5 MB/s",
              "type": "info"
            },
            {
              "text": "Selecciona cualquier unidad del menú desplegable para cambiar la unidad de origen.",
              "type": "info"
            },
            {
              "text": "Todas las conversiones son bidireccionales — funciona en ambas direcciones.",
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
              "text": "Usa las configuraciones predefinidas arriba para cantidades frecuentemente usadas.",
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
              "text": "Guarda resultados para después con el botón Guardar.",
              "type": "info"
            },
            {
              "text": "Soporta todas las unidades en el grupo velocidad_datos.",
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
                "Ingresa valor en unidad de origen",
                "Lee resultado en unidad objetivo",
                "Usa menú desplegable para cambiar unidad de origen"
              ],
              "result": "Resultado de conversión instantáneo"
            },
            {
              "title": "Conversión Inversa",
              "steps": [
                "Cambia el menú desplegable a la unidad objetivo",
                "Ingresa tu valor",
                "Lee el resultado en la unidad original"
              ],
              "result": "Funciona en ambas direcciones — solo cambia el menú desplegable"
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
          "answer": "¡Sí! Simplemente cambia la unidad en el menú desplegable para convertir desde cualquier unidad a todas las otras. El convertidor es completamente bidireccional."
        },
        {
          "question": "¿Qué unidades son soportadas?",
          "answer": "Este convertidor soporta todas las unidades en la categoría velocidad_datos: mbps, mb_s, gbps, gb_s, kbps, kb_s, bps. Selecciona cualquiera del menú desplegable."
        },
        {
          "question": "¿Esto funciona en móviles?",
          "answer": "Sí, este convertidor es completamente responsivo y funciona en cualquier dispositivo — teléfono, tablet o escritorio."
        },
        {
          "question": "¿Puedo compartir mi resultado de conversión?",
          "answer": "¡Sí! Usa el botón Compartir Resultados para generar un enlace con tu conversión exacta que puedes enviar a cualquiera."
        },
        {
          "question": "¿Este convertidor es gratis?",
          "answer": "Sí, 100% gratis sin registro requerido. Úsalo tantas veces como necesites."
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
      "name": "Conversor Mbps para MB/s",
      "slug": "calculadora-conversao-mbps-para-mbs",
      "subtitle": "Converta Mbps para MB/s para entender suas velocidades reais de download e upload da internet.",
      "breadcrumb": "Mbps para MB/s",
      "seo": {
        "title": "Conversor Mbps para MB/s - Ferramenta de Velocidade da Internet",
        "description": "Converta megabits por segundo para megabytes por segundo. Entenda sua velocidade real de download: 100 Mbps = 12,5 MB/s.",
        "shortDescription": "Converta Mbps para MB/s para entender suas velocidades reais de download e upload da internet",
        "keywords": [
          "mbps para mb/s",
          "megabits para megabytes",
          "conversor velocidade internet",
          "calculadora velocidade download",
          "conversor largura banda",
          "conversao mbps mbytes"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Velocidade",
          "helpText": "Digite a velocidade para converter"
        }
      },
      "results": {
        "primary": {
          "label": "Resultado"
        }
      },
      "presets": {
        "fifty": {
          "label": "📶 50 Mbps",
          "description": "50 Mbps (6,25 MB/s)"
        },
        "hundred": {
          "label": "🌐 100 Mbps",
          "description": "100 Mbps (12,5 MB/s)"
        },
        "gig": {
          "label": "⚡ 1 Gbps",
          "description": "1 Gbps (125 MB/s)"
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
            "Divida Mbps por 8 para obter MB/s. Exemplo: 100 Mbps = 12,5 MB/s",
            "Selecione qualquer unidade no menu suspenso para converter a partir dessa unidade.",
            "Os resultados são atualizados instantaneamente conforme você digita.",
            "Use predefinições para valores de conversão comuns."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Sobre Esta Conversão",
          "content": "Converta megabits por segundo para megabytes por segundo. Entenda sua velocidade real de download: 100 Mbps = 12,5 MB/s. Este conversor suporta todas as unidades relacionadas na categoria taxa_dados, permitindo converter entre qualquer combinação com uma única entrada."
        },
        "howItWorks": {
          "title": "Como Converter",
          "content": "Digite seu valor e selecione a unidade de origem no menu suspenso. O conversor mostra instantaneamente o equivalente em todas as outras unidades deste tipo. Todas as conversões usam fatores precisos de padrões internacionais (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notas Importantes",
          "items": [
            {
              "text": "Divida Mbps por 8 para obter MB/s. Exemplo: 100 Mbps = 12,5 MB/s",
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
              "text": "Marque esta página para acesso rápido a este conversor.",
              "type": "info"
            }
          ]
        },
        "commonValues": {
          "title": "Conversões Comuns",
          "items": [
            {
              "text": "Use predefinições acima para quantidades frequentemente usadas.",
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
              "text": "Suporta todas as unidades no grupo taxa_dados.",
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
          "question": "Que unidades são suportadas?",
          "answer": "Este conversor suporta todas as unidades na categoria taxa_dados: mbps, mb_s, gbps, gb_s, kbps, kb_s, bps. Selecione qualquer uma no menu suspenso."
        },
        {
          "question": "Isso funciona no celular?",
          "answer": "Sim, este conversor é totalmente responsivo e funciona em qualquer dispositivo — telefone, tablet ou desktop."
        },
        {
          "question": "Posso compartilhar meu resultado de conversão?",
          "answer": "Sim! Use o botão Compartilhar Resultados para gerar um link com sua conversão exata que você pode enviar para qualquer pessoa."
        },
        {
          "question": "Este conversor é gratuito?",
          "answer": "Sim, 100% gratuito sem necessidade de cadastro. Use quantas vezes precisar."
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
      "name": "Convertisseur Mbps vers Mo/s",
      "slug": "calculateur-convertisseur-mbps-vers-mo-s",
      "subtitle": "Convertissez les Mbps en Mo/s pour comprendre vos véritables vitesses de téléchargement et d'upload internet.",
      "breadcrumb": "Mbps vers Mo/s",
      "seo": {
        "title": "Convertisseur Mbps vers Mo/s - Outil de Vitesse Internet",
        "description": "Convertissez les mégabits par seconde en mégaoctets par seconde. Comprenez votre vraie vitesse de téléchargement : 100 Mbps = 12,5 Mo/s.",
        "shortDescription": "Convertissez les Mbps en Mo/s pour comprendre vos véritables vitesses de téléchargement et d'upload internet",
        "keywords": [
          "mbps vers mo/s",
          "mégabits vers mégaoctets",
          "convertisseur vitesse internet",
          "calculateur vitesse téléchargement",
          "convertisseur bande passante",
          "conversion mbps mo/s"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Vitesse",
          "helpText": "Entrez la vitesse à convertir"
        }
      },
      "results": {
        "primary": {
          "label": "Résultat"
        }
      },
      "presets": {
        "fifty": {
          "label": "📶 50 Mbps",
          "description": "50 Mbps (6,25 Mo/s)"
        },
        "hundred": {
          "label": "🌐 100 Mbps",
          "description": "100 Mbps (12,5 Mo/s)"
        },
        "gig": {
          "label": "⚡ 1 Gbps",
          "description": "1 Gbps (125 Mo/s)"
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
              "label": "Additionnel",
              "valueKey": "secondary3"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Conversion",
          "items": [
            "Divisez les Mbps par 8 pour obtenir les Mo/s. Exemple : 100 Mbps = 12,5 Mo/s",
            "Sélectionnez n'importe quelle unité dans le menu déroulant pour convertir depuis cette unité.",
            "Les résultats se mettent à jour instantanément pendant que vous tapez.",
            "Utilisez les préréglages pour les valeurs de conversion courantes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "À Propos de Cette Conversion",
          "content": "Convertissez les mégabits par seconde en mégaoctets par seconde. Comprenez votre vraie vitesse de téléchargement : 100 Mbps = 12,5 Mo/s. Ce convertisseur prend en charge toutes les unités associées de la catégorie débit de données, vous permettant de convertir entre n'importe quelle combinaison avec une seule saisie."
        },
        "howItWorks": {
          "title": "Comment Convertir",
          "content": "Entrez votre valeur et sélectionnez l'unité source dans le menu déroulant. Le convertisseur affiche instantanément l'équivalent dans toutes les autres unités de ce type. Toutes les conversions utilisent des facteurs précis des standards internationaux (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notes Importantes",
          "items": [
            {
              "text": "Divisez les Mbps par 8 pour obtenir les Mo/s. Exemple : 100 Mbps = 12,5 Mo/s",
              "type": "info"
            },
            {
              "text": "Sélectionnez n'importe quelle unité dans le menu déroulant pour changer l'unité source.",
              "type": "info"
            },
            {
              "text": "Toutes les conversions sont bidirectionnelles — fonctionne dans les deux sens.",
              "type": "info"
            },
            {
              "text": "Les résultats sont calculés en utilisant des facteurs de conversion exacts.",
              "type": "info"
            },
            {
              "text": "Pour les très grands ou très petits nombres, la notation scientifique peut être utilisée.",
              "type": "info"
            },
            {
              "text": "Marquez cette page pour un accès rapide à ce convertisseur.",
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
              "text": "Fonctionne sur mobile — utilisez-le partout.",
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
              "text": "Prend en charge toutes les unités du groupe débit de données.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Conversion",
          "description": "Scénarios courants",
          "examples": [
            {
              "title": "Conversion Basique",
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
          "answer": "Ce convertisseur prend en charge toutes les unités de la catégorie débit de données : mbps, mo_s, gbps, go_s, kbps, ko_s, bps. Sélectionnez n'importe laquelle dans le menu déroulant."
        },
        {
          "question": "Est-ce que cela fonctionne sur mobile ?",
          "answer": "Oui, ce convertisseur est entièrement responsive et fonctionne sur n'importe quel appareil — téléphone, tablette ou ordinateur."
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
      "name": "Mbps zu MB/s Umrechner",
      "slug": "mbps-zu-mb-s-umrechner",
      "subtitle": "Wandeln Sie Mbps in MB/s um, um Ihre echten Internet-Download- und Upload-Geschwindigkeiten zu verstehen.",
      "breadcrumb": "Mbps zu MB/s",
      "seo": {
        "title": "Mbps zu MB/s Umrechner - Internet-Geschwindigkeits-Tool",
        "description": "Wandeln Sie Megabit pro Sekunde in Megabyte pro Sekunde um. Verstehen Sie Ihre echte Download-Geschwindigkeit: 100 Mbps = 12,5 MB/s.",
        "shortDescription": "Wandeln Sie Mbps in MB/s um, um Ihre echten Internet-Download- und Upload-Geschwindigkeiten zu verstehen",
        "keywords": [
          "mbps zu mb/s",
          "megabit zu megabyte",
          "internet geschwindigkeits umrechner",
          "download geschwindigkeits rechner",
          "bandbreiten umrechner",
          "mbps mbytes umrechnung"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "amount": {
          "label": "Geschwindigkeit",
          "helpText": "Geben Sie die umzurechnende Geschwindigkeit ein"
        }
      },
      "results": {
        "primary": {
          "label": "Ergebnis"
        }
      },
      "presets": {
        "fifty": {
          "label": "📶 50 Mbps",
          "description": "50 Mbps (6,25 MB/s)"
        },
        "hundred": {
          "label": "🌐 100 Mbps",
          "description": "100 Mbps (12,5 MB/s)"
        },
        "gig": {
          "label": "⚡ 1 Gbps",
          "description": "1 Gbps (125 MB/s)"
        }
      },
      "values": {},
      "formats": {
        "summary": "Umrechnungsergebnis"
      },
      "infoCards": {
        "results": {
          "title": "Alle Umrechnungen",
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
          "title": "Umrechnungstipps",
          "items": [
            "Teilen Sie Mbps durch 8, um MB/s zu erhalten. Beispiel: 100 Mbps = 12,5 MB/s",
            "Wählen Sie eine beliebige Einheit aus der Dropdown-Liste, um stattdessen von dieser Einheit umzurechnen.",
            "Ergebnisse werden sofort beim Tippen aktualisiert.",
            "Verwenden Sie Voreinstellungen für gängige Umrechnungswerte."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Über diese Umrechnung",
          "content": "Wandeln Sie Megabit pro Sekunde in Megabyte pro Sekunde um. Verstehen Sie Ihre echte Download-Geschwindigkeit: 100 Mbps = 12,5 MB/s. Dieser Umrechner unterstützt alle verwandten Einheiten in der Datenraten-Kategorie und ermöglicht es Ihnen, mit einer einzigen Eingabe zwischen beliebigen Kombinationen umzurechnen."
        },
        "howItWorks": {
          "title": "So rechnen Sie um",
          "content": "Geben Sie Ihren Wert ein und wählen Sie die Quelleinheit aus der Dropdown-Liste. Der Umrechner zeigt sofort das Äquivalent in allen anderen Einheiten dieses Typs. Alle Umrechnungen verwenden präzise Faktoren von internationalen Standards (NIST/BIPM)."
        },
        "considerations": {
          "title": "Wichtige Hinweise",
          "items": [
            {
              "text": "Teilen Sie Mbps durch 8, um MB/s zu erhalten. Beispiel: 100 Mbps = 12,5 MB/s",
              "type": "info"
            },
            {
              "text": "Wählen Sie eine beliebige Einheit aus der Dropdown-Liste, um die Quelleinheit zu ändern.",
              "type": "info"
            },
            {
              "text": "Alle Umrechnungen sind bidirektional — funktioniert in beide Richtungen.",
              "type": "info"
            },
            {
              "text": "Ergebnisse werden mit exakten Umrechnungsfaktoren berechnet.",
              "type": "info"
            },
            {
              "text": "Für sehr große oder kleine Zahlen kann wissenschaftliche Notation verwendet werden.",
              "type": "info"
            },
            {
              "text": "Setzen Sie ein Lesezeichen auf diese Seite für schnellen Zugriff auf diesen Umrechner.",
              "type": "info"
            }
          ]
        },
        "commonValues": {
          "title": "Häufige Umrechnungen",
          "items": [
            {
              "text": "Verwenden Sie Voreinstellungen oben für häufig verwendete Werte.",
              "type": "info"
            },
            {
              "text": "Alle Ergebnisse werden in Echtzeit beim Tippen aktualisiert.",
              "type": "info"
            },
            {
              "text": "Funktioniert auf Mobilgeräten — verwenden Sie es überall.",
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
              "text": "Unterstützt alle Einheiten in der Datenraten-Gruppe.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Häufige Szenarien",
          "examples": [
            {
              "title": "Grundumrechnung",
              "steps": [
                "Wert in Quelleinheit eingeben",
                "Ergebnis in Zieleinheit ablesen",
                "Dropdown verwenden, um Quelleinheit zu ändern"
              ],
              "result": "Sofortiges Umrechnungsergebnis"
            },
            {
              "title": "Rückumrechnung",
              "steps": [
                "Dropdown auf Zieleinheit ändern",
                "Ihren Wert eingeben",
                "Ergebnis in ursprünglicher Einheit ablesen"
              ],
              "result": "Funktioniert in beide Richtungen — ändern Sie einfach das Dropdown"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie genau sind diese Umrechnungen?",
          "answer": "Alle Umrechnungen verwenden exakte Faktoren von NIST- und BIPM-internationalen Standards. Ergebnisse sind auf mindestens 6 signifikante Stellen genau."
        },
        {
          "question": "Kann ich in umgekehrter Richtung umrechnen?",
          "answer": "Ja! Ändern Sie einfach die Einheit im Dropdown, um von jeder Einheit zu allen anderen umzurechnen. Der Umrechner ist vollständig bidirektional."
        },
        {
          "question": "Welche Einheiten werden unterstützt?",
          "answer": "Dieser Umrechner unterstützt alle Einheiten in der Datenraten-Kategorie: mbps, mb_s, gbps, gb_s, kbps, kb_s, bps. Wählen Sie eine beliebige aus dem Dropdown."
        },
        {
          "question": "Funktioniert das auf Mobilgeräten?",
          "answer": "Ja, dieser Umrechner ist vollständig responsiv und funktioniert auf jedem Gerät — Telefon, Tablet oder Desktop."
        },
        {
          "question": "Kann ich mein Umrechnungsergebnis teilen?",
          "answer": "Ja! Verwenden Sie die Schaltfläche 'Ergebnisse teilen', um einen Link mit Ihrer exakten Umrechnung zu generieren, den Sie an jeden senden können."
        },
        {
          "question": "Ist dieser Umrechner kostenlos?",
          "answer": "Ja, 100% kostenlos ohne Registrierung erforderlich. Verwenden Sie ihn so oft Sie möchten."
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
      defaultValue: 50,
      placeholder: "50",
      min: 0,
      step: 1,
      unitType: "data_rate",
      syncGroup: false,
      defaultUnit: "mbps",
      allowedUnits: ["mbps", "mb_s", "gbps", "gb_s", "kbps", "kb_s", "bps"],
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

export function calculateMbpsToMbytes(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "mbps";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const unitGroup = UNIT_REGISTRY["data_rate"];
  const units = unitGroup?.units || [];
  const results: Record<string, number> = {};
  const formatted: Record<string, string> = {};

  for (const unit of units) {
    try {
      const converted = convert(amount, fromUnit, unit.id, "data_rate");
      results[unit.id] = converted;
      formatted[unit.id] = `${fmtNum(converted)} ${unit.symbol}`;
    } catch {
      // Skip units that can't convert
    }
  }

  const allUnits = ["mbps", "mb_s", "gbps", "gb_s", "kbps", "kb_s", "bps"];
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

export default mbpsToMbytesConfig;
