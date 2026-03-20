import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convert, UNIT_REGISTRY } from "@/engine/v4/units";

export const gramsToKgConfig: CalculatorConfigV4 = {
  id: "grams-to-kg",
  version: "4.0",
  category: "conversion",
  icon: "⚖️",

  presets: [
    { id: "hundred", icon: "🧈", values: { amount: 100 } },
    { id: "fiveHundred", icon: "⚖️", values: { amount: 500 } },
    { id: "thousand", icon: "📦", values: { amount: 1000 } },
  ],

  t: {
    en: {
      name: "Grams to Kilograms Converter",
      slug: "grams-to-kg",
      subtitle: "Convert grams to kilograms for cooking, science, and international measurements.",
      breadcrumb: "Grams to Kilograms",

      seo: {
        title: "Grams to KG Converter - Weight Conversion Tool",
        description: "Convert grams to kilograms instantly. 1000 g = 1 kg. Perfect for cooking, science, and international measurements.",
        shortDescription: "Convert grams to kilograms for cooking, science, and international measurements.",
        keywords: ["grams to kg", "grams to kilograms", "weight converter", "g to kg", "metric weight conversion", "cooking weight"],
      },

      calculator: { yourInformation: "Enter Weight" },
      ui: { yourInformation: "Enter Weight", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Weight", helpText: "Enter the weight to convert" },
      },

      results: {
        primary: { label: "Result" },
      },

      presets: {
        hundred: { label: "🧈 100 g", description: "100 g (0.1 kg)" },
        fiveHundred: { label: "⚖️ 500 g", description: "500 g (0.5 kg)" },
        thousand: { label: "📦 1,000 g", description: "1,000 g (1 kg)" },
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
            "1,000 grams = 1 kilogram | 500 g = 0.5 kg",
            "Select any unit from the dropdown to convert from that unit instead.",
            "Results update instantly as you type.",
            "Use presets for common conversion values.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "About This Conversion",
          content: "Convert grams to kilograms instantly. 1000 g = 1 kg. Perfect for cooking, science, and international measurements. This converter supports all related units in the mass category, letting you convert between any combination with a single input.",
        },
        howItWorks: {
          title: "How to Convert",
          content: "Enter your value and select the source unit from the dropdown. The converter instantly shows the equivalent in all other units of this type. All conversions use precise factors from international standards (NIST/BIPM).",
        },
        considerations: {
          title: "Important Notes",
          items: [
            { text: "1,000 grams = 1 kilogram | 500 g = 0.5 kg", type: "info" },
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
            { text: "Supports all units in the mass group.", type: "info" },
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
        { question: "What units are supported?", answer: "This converter supports all units in the mass category: g, kg, mg, lbs, oz. Select any from the dropdown." },
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
      "name": "Convertidor de Gramos a Kilogramos",
      "slug": "calculadora-gramos-a-kilogramos",
      "subtitle": "Convierte gramos a kilogramos para cocina, ciencia y medidas internacionales.",
      "breadcrumb": "Gramos a Kilogramos",
      "seo": {
        "title": "Convertidor de Gramos a KG - Herramienta de Conversión de Peso",
        "description": "Convierte gramos a kilogramos al instante. 1000 g = 1 kg. Perfecto para cocina, ciencia y medidas internacionales.",
        "shortDescription": "Convierte gramos a kilogramos para cocina, ciencia y medidas internacionales.",
        "keywords": [
          "gramos a kg",
          "gramos a kilogramos",
          "convertidor de peso",
          "g a kg",
          "conversión métrica de peso",
          "peso para cocina"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "amount": {
          "label": "Peso",
          "helpText": "Ingrese el peso a convertir"
        }
      },
      "results": {
        "primary": {
          "label": "Resultado"
        }
      },
      "presets": {
        "hundred": {
          "label": "🧈 100 g",
          "description": "100 g (0.1 kg)"
        },
        "fiveHundred": {
          "label": "⚖️ 500 g",
          "description": "500 g (0.5 kg)"
        },
        "thousand": {
          "label": "📦 1,000 g",
          "description": "1,000 g (1 kg)"
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
            "1,000 gramos = 1 kilogramo | 500 g = 0.5 kg",
            "Seleccione cualquier unidad del menú desplegable para convertir desde esa unidad.",
            "Los resultados se actualizan instantáneamente mientras escribe.",
            "Use valores predefinidos para conversiones comunes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Acerca de Esta Conversión",
          "content": "Convierte gramos a kilogramos al instante. 1000 g = 1 kg. Perfecto para cocina, ciencia y medidas internacionales. Este convertidor admite todas las unidades relacionadas en la categoría de masa, permitiéndole convertir entre cualquier combinación con una sola entrada."
        },
        "howItWorks": {
          "title": "Cómo Convertir",
          "content": "Ingrese su valor y seleccione la unidad de origen del menú desplegable. El convertidor muestra instantáneamente el equivalente en todas las demás unidades de este tipo. Todas las conversiones usan factores precisos de estándares internacionales (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notas Importantes",
          "items": [
            {
              "text": "1,000 gramos = 1 kilogramo | 500 g = 0.5 kg",
              "type": "info"
            },
            {
              "text": "Seleccione cualquier unidad del menú desplegable para cambiar la unidad de origen.",
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
              "text": "Guarde esta página en favoritos para acceso rápido a este convertidor.",
              "type": "info"
            }
          ]
        },
        "commonValues": {
          "title": "Conversiones Comunes",
          "items": [
            {
              "text": "Use valores predefinidos arriba para cantidades frecuentemente usadas.",
              "type": "info"
            },
            {
              "text": "Todos los resultados se actualizan en tiempo real mientras escribe.",
              "type": "info"
            },
            {
              "text": "Funciona en móviles — úselo en cualquier lugar.",
              "type": "info"
            },
            {
              "text": "Comparta resultados usando el botón Compartir abajo.",
              "type": "info"
            },
            {
              "text": "Guarde resultados para después con el botón Guardar.",
              "type": "info"
            },
            {
              "text": "Admite todas las unidades del grupo de masa.",
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
                "Ingrese valor en unidad de origen",
                "Lea resultado en unidad de destino",
                "Use menú desplegable para cambiar unidad de origen"
              ],
              "result": "Resultado de conversión instantáneo"
            },
            {
              "title": "Conversión Inversa",
              "steps": [
                "Cambie el menú desplegable a la unidad de destino",
                "Ingrese su valor",
                "Lea el resultado en la unidad original"
              ],
              "result": "Funciona en ambos sentidos — solo cambie el menú desplegable"
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
          "answer": "¡Sí! Simplemente cambie la unidad en el menú desplegable para convertir de cualquier unidad a todas las demás. El convertidor es completamente bidireccional."
        },
        {
          "question": "¿Qué unidades son compatibles?",
          "answer": "Este convertidor admite todas las unidades en la categoría de masa: g, kg, mg, lbs, oz. Seleccione cualquiera del menú desplegable."
        },
        {
          "question": "¿Funciona esto en móviles?",
          "answer": "Sí, este convertidor es completamente responsivo y funciona en cualquier dispositivo — teléfono, tableta o escritorio."
        },
        {
          "question": "¿Puedo compartir mi resultado de conversión?",
          "answer": "¡Sí! Use el botón Compartir Resultados para generar un enlace con su conversión exacta que puede enviar a cualquier persona."
        },
        {
          "question": "¿Es gratuito este convertidor?",
          "answer": "Sí, 100% gratuito sin registro requerido. Úselo tantas veces como necesite."
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
      "name": "Conversor de Gramas para Quilogramas",
      "slug": "calculadora-gramas-para-quilogramas",
      "subtitle": "Converta gramas para quilogramas para culinária, ciência e medidas internacionais.",
      "breadcrumb": "Gramas para Quilogramas",
      "seo": {
        "title": "Conversor de Gramas para KG - Ferramenta de Conversão de Peso",
        "description": "Converta gramas para quilogramas instantaneamente. 1000 g = 1 kg. Perfeito para culinária, ciência e medidas internacionais.",
        "shortDescription": "Converta gramas para quilogramas para culinária, ciência e medidas internacionais.",
        "keywords": [
          "gramas para kg",
          "gramas para quilogramas",
          "conversor de peso",
          "g para kg",
          "conversão de peso métrico",
          "peso culinário"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Peso",
          "helpText": "Digite o peso para converter"
        }
      },
      "results": {
        "primary": {
          "label": "Resultado"
        }
      },
      "presets": {
        "hundred": {
          "label": "🧈 100 g",
          "description": "100 g (0,1 kg)"
        },
        "fiveHundred": {
          "label": "⚖️ 500 g",
          "description": "500 g (0,5 kg)"
        },
        "thousand": {
          "label": "📦 1.000 g",
          "description": "1.000 g (1 kg)"
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
            "1.000 gramas = 1 quilograma | 500 g = 0,5 kg",
            "Selecione qualquer unidade do menu suspenso para converter a partir dessa unidade.",
            "Os resultados são atualizados instantaneamente enquanto você digita.",
            "Use predefinições para valores de conversão comuns."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Sobre Esta Conversão",
          "content": "Converta gramas para quilogramas instantaneamente. 1000 g = 1 kg. Perfeito para culinária, ciência e medidas internacionais. Este conversor suporta todas as unidades relacionadas na categoria de massa, permitindo converter entre qualquer combinação com uma única entrada."
        },
        "howItWorks": {
          "title": "Como Converter",
          "content": "Digite seu valor e selecione a unidade de origem no menu suspenso. O conversor mostra instantaneamente o equivalente em todas as outras unidades deste tipo. Todas as conversões usam fatores precisos de padrões internacionais (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notas Importantes",
          "items": [
            {
              "text": "1.000 gramas = 1 quilograma | 500 g = 0,5 kg",
              "type": "info"
            },
            {
              "text": "Selecione qualquer unidade do menu suspenso para alterar a unidade de origem.",
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
              "text": "Use predefinições acima para quantidades usadas com frequência.",
              "type": "info"
            },
            {
              "text": "Todos os resultados são atualizados em tempo real enquanto você digita.",
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
              "text": "Suporta todas as unidades no grupo de massa.",
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
          "answer": "Este conversor suporta todas as unidades na categoria de massa: g, kg, mg, lbs, oz. Selecione qualquer uma do menu suspenso."
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
      "name": "Convertisseur Grammes en Kilogrammes",
      "slug": "calculateur-grammes-vers-kilogrammes",
      "subtitle": "Convertissez les grammes en kilogrammes pour la cuisine, les sciences et les mesures internationales.",
      "breadcrumb": "Grammes en Kilogrammes",
      "seo": {
        "title": "Convertisseur Grammes vers KG - Outil de Conversion de Poids",
        "description": "Convertissez instantanément les grammes en kilogrammes. 1000 g = 1 kg. Parfait pour la cuisine, les sciences et les mesures internationales.",
        "shortDescription": "Convertissez les grammes en kilogrammes pour la cuisine, les sciences et les mesures internationales.",
        "keywords": [
          "grammes vers kg",
          "grammes en kilogrammes",
          "convertisseur de poids",
          "g vers kg",
          "conversion poids métrique",
          "poids cuisine"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Poids",
          "helpText": "Entrez le poids à convertir"
        }
      },
      "results": {
        "primary": {
          "label": "Résultat"
        }
      },
      "presets": {
        "hundred": {
          "label": "🧈 100 g",
          "description": "100 g (0,1 kg)"
        },
        "fiveHundred": {
          "label": "⚖️ 500 g",
          "description": "500 g (0,5 kg)"
        },
        "thousand": {
          "label": "📦 1 000 g",
          "description": "1 000 g (1 kg)"
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
            "1 000 grammes = 1 kilogramme | 500 g = 0,5 kg",
            "Sélectionnez n'importe quelle unité dans le menu déroulant pour convertir à partir de cette unité.",
            "Les résultats se mettent à jour instantanément pendant que vous tapez.",
            "Utilisez les préréglages pour les valeurs de conversion courantes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "À Propos de Cette Conversion",
          "content": "Convertissez instantanément les grammes en kilogrammes. 1000 g = 1 kg. Parfait pour la cuisine, les sciences et les mesures internationales. Ce convertisseur prend en charge toutes les unités associées dans la catégorie masse, vous permettant de convertir entre n'importe quelle combinaison avec une seule saisie."
        },
        "howItWorks": {
          "title": "Comment Convertir",
          "content": "Entrez votre valeur et sélectionnez l'unité source dans le menu déroulant. Le convertisseur affiche instantanément l'équivalent dans toutes les autres unités de ce type. Toutes les conversions utilisent des facteurs précis des normes internationales (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notes Importantes",
          "items": [
            {
              "text": "1 000 grammes = 1 kilogramme | 500 g = 0,5 kg",
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
              "text": "Mettez cette page en favori pour un accès rapide à ce convertisseur.",
              "type": "info"
            }
          ]
        },
        "commonValues": {
          "title": "Conversions Courantes",
          "items": [
            {
              "text": "Utilisez les préréglages ci-dessus pour les quantités fréquemment utilisées.",
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
              "text": "Prend en charge toutes les unités du groupe masse.",
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
          "question": "À quel point ces conversions sont-elles précises ?",
          "answer": "Toutes les conversions utilisent des facteurs exacts des normes internationales NIST et BIPM. Les résultats sont précis à au moins 6 chiffres significatifs."
        },
        {
          "question": "Puis-je convertir dans le sens inverse ?",
          "answer": "Oui ! Changez simplement l'unité dans le menu déroulant pour convertir de n'importe quelle unité vers toutes les autres. Le convertisseur est entièrement bidirectionnel."
        },
        {
          "question": "Quelles unités sont prises en charge ?",
          "answer": "Ce convertisseur prend en charge toutes les unités de la catégorie masse : g, kg, mg, lbs, oz. Sélectionnez n'importe laquelle dans le menu déroulant."
        },
        {
          "question": "Est-ce que cela fonctionne sur mobile ?",
          "answer": "Oui, ce convertisseur est entièrement adaptatif et fonctionne sur n'importe quel appareil — téléphone, tablette ou ordinateur."
        },
        {
          "question": "Puis-je partager mon résultat de conversion ?",
          "answer": "Oui ! Utilisez le bouton Partager les Résultats pour générer un lien avec votre conversion exacte que vous pouvez envoyer à n'importe qui."
        },
        {
          "question": "Ce convertisseur est-il gratuit ?",
          "answer": "Oui, 100% gratuit sans inscription requise. Utilisez-le autant de fois que vous le souhaitez."
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
      "name": "Gramm zu Kilogramm Umrechner",
      "slug": "gramm-zu-kilogramm-rechner",
      "subtitle": "Wandeln Sie Gramm in Kilogramm um für Kochen, Wissenschaft und internationale Messungen.",
      "breadcrumb": "Gramm zu Kilogramm",
      "seo": {
        "title": "Gramm zu KG Umrechner - Gewicht Umrechnungstool",
        "description": "Wandeln Sie Gramm in Kilogramm sofort um. 1000 g = 1 kg. Perfekt für Kochen, Wissenschaft und internationale Messungen.",
        "shortDescription": "Wandeln Sie Gramm in Kilogramm um für Kochen, Wissenschaft und internationale Messungen.",
        "keywords": [
          "gramm zu kg",
          "gramm zu kilogramm",
          "gewicht umrechner",
          "g zu kg",
          "metrische gewicht umrechnung",
          "koch gewicht"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Gewicht",
          "helpText": "Geben Sie das umzurechnende Gewicht ein"
        }
      },
      "results": {
        "primary": {
          "label": "Ergebnis"
        }
      },
      "presets": {
        "hundred": {
          "label": "🧈 100 g",
          "description": "100 g (0,1 kg)"
        },
        "fiveHundred": {
          "label": "⚖️ 500 g",
          "description": "500 g (0,5 kg)"
        },
        "thousand": {
          "label": "📦 1.000 g",
          "description": "1.000 g (1 kg)"
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
            "1.000 Gramm = 1 Kilogramm | 500 g = 0,5 kg",
            "Wählen Sie eine beliebige Einheit aus dem Dropdown-Menü, um von dieser Einheit umzurechnen.",
            "Ergebnisse werden sofort während der Eingabe aktualisiert.",
            "Verwenden Sie Voreinstellungen für häufige Umrechnungswerte."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Über diese Umrechnung",
          "content": "Wandeln Sie Gramm in Kilogramm sofort um. 1000 g = 1 kg. Perfekt für Kochen, Wissenschaft und internationale Messungen. Dieser Umrechner unterstützt alle verwandten Einheiten in der Massekategorie und ermöglicht es Ihnen, zwischen jeder Kombination mit einer einzigen Eingabe umzurechnen."
        },
        "howItWorks": {
          "title": "Wie umrechnen",
          "content": "Geben Sie Ihren Wert ein und wählen Sie die Quelleinheit aus dem Dropdown-Menü. Der Umrechner zeigt sofort das Äquivalent in allen anderen Einheiten dieses Typs. Alle Umrechnungen verwenden präzise Faktoren aus internationalen Standards (NIST/BIPM)."
        },
        "considerations": {
          "title": "Wichtige Hinweise",
          "items": [
            {
              "text": "1.000 Gramm = 1 Kilogramm | 500 g = 0,5 kg",
              "type": "info"
            },
            {
              "text": "Wählen Sie eine beliebige Einheit aus dem Dropdown-Menü, um die Quelleinheit zu ändern.",
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
              "text": "Setzen Sie ein Lesezeichen für diese Seite für schnellen Zugriff auf diesen Umrechner.",
              "type": "info"
            }
          ]
        },
        "commonValues": {
          "title": "Häufige Umrechnungen",
          "items": [
            {
              "text": "Verwenden Sie Voreinstellungen oben für häufig verwendete Mengen.",
              "type": "info"
            },
            {
              "text": "Alle Ergebnisse werden in Echtzeit während der Eingabe aktualisiert.",
              "type": "info"
            },
            {
              "text": "Funktioniert auf Mobilgeräten — verwenden Sie es überall.",
              "type": "info"
            },
            {
              "text": "Teilen Sie Ergebnisse mit dem Teilen-Button unten.",
              "type": "info"
            },
            {
              "text": "Speichern Sie Ergebnisse für später mit dem Speichern-Button.",
              "type": "info"
            },
            {
              "text": "Unterstützt alle Einheiten in der Massegruppe.",
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
                "Geben Sie Wert in Quelleinheit ein",
                "Lesen Sie Ergebnis in Zieleinheit ab",
                "Verwenden Sie Dropdown, um Quelleinheit zu ändern"
              ],
              "result": "Sofortiges Umrechnungsergebnis"
            },
            {
              "title": "Umkehrumrechnung",
              "steps": [
                "Ändern Sie das Dropdown zur Zieleinheit",
                "Geben Sie Ihren Wert ein",
                "Lesen Sie das Ergebnis in der ursprünglichen Einheit ab"
              ],
              "result": "Funktioniert in beide Richtungen — ändern Sie einfach das Dropdown"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie genau sind diese Umrechnungen?",
          "answer": "Alle Umrechnungen verwenden exakte Faktoren aus NIST und BIPM internationalen Standards. Ergebnisse sind auf mindestens 6 signifikante Stellen genau."
        },
        {
          "question": "Kann ich in umgekehrter Richtung umrechnen?",
          "answer": "Ja! Ändern Sie einfach die Einheit im Dropdown, um von jeder Einheit zu allen anderen umzurechnen. Der Umrechner ist vollständig bidirektional."
        },
        {
          "question": "Welche Einheiten werden unterstützt?",
          "answer": "Dieser Umrechner unterstützt alle Einheiten in der Massekategorie: g, kg, mg, lbs, oz. Wählen Sie eine beliebige aus dem Dropdown."
        },
        {
          "question": "Funktioniert das auf Mobilgeräten?",
          "answer": "Ja, dieser Umrechner ist vollständig responsiv und funktioniert auf jedem Gerät — Telefon, Tablet oder Desktop."
        },
        {
          "question": "Kann ich mein Umrechnungsergebnis teilen?",
          "answer": "Ja! Verwenden Sie den Ergebnisse Teilen-Button, um einen Link mit Ihrer exakten Umrechnung zu generieren, den Sie an jeden senden können."
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
      defaultValue: 100,
      placeholder: "100",
      min: 0,
      step: 1,
      unitType: "mass",
      syncGroup: false,
      defaultUnit: "g",
      allowedUnits: ["g", "kg", "mg", "lbs", "oz"],
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

export function calculateGramsToKg(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "g";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const unitGroup = UNIT_REGISTRY["mass"];
  const units = unitGroup?.units || [];
  const results: Record<string, number> = {};
  const formatted: Record<string, string> = {};

  for (const unit of units) {
    try {
      const converted = convert(amount, fromUnit, unit.id, "mass");
      results[unit.id] = converted;
      formatted[unit.id] = `${fmtNum(converted)} ${unit.symbol}`;
    } catch {
      // Skip units that can't convert
    }
  }

  const allUnits = ["g", "kg", "mg", "lbs", "oz"];
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

export default gramsToKgConfig;
