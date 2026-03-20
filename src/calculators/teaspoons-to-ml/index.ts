import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convert, UNIT_REGISTRY } from "@/engine/v4/units";

export const teaspoonsToMlConfig: CalculatorConfigV4 = {
  id: "teaspoons-to-ml",
  version: "4.0",
  category: "conversion",
  icon: "🫖",

  presets: [
    { id: "one", icon: "🫖", values: { amount: 1 } },
    { id: "three", icon: "🥄", values: { amount: 3 } },
    { id: "twelve", icon: "🥛", values: { amount: 12 } },
  ],

  t: {
    en: {
      name: "Teaspoons to mL Converter",
      slug: "teaspoons-to-ml",
      subtitle: "Convert teaspoons to milliliters for cooking, baking, and medicine measurements.",
      breadcrumb: "Teaspoons to mL",

      seo: {
        title: "Teaspoons to mL Converter - Kitchen Measurement Tool",
        description: "Convert teaspoons to milliliters for precise cooking, baking, and medicine dosing. Includes tablespoons and cups.",
        shortDescription: "Convert teaspoons to milliliters for cooking, baking, and medicine measurements.",
        keywords: ["teaspoons to ml", "tsp to mL", "teaspoon milliliter converter", "cooking measurement", "baking conversion", "medicine dosing tsp"],
      },

      calculator: { yourInformation: "Enter Amount" },
      ui: { yourInformation: "Enter Amount", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Amount", helpText: "Enter the amount to convert" },
      },

      results: {
        primary: { label: "Result" },
      },

      presets: {
        one: { label: "🫖 1 tsp", description: "1 tsp (5 mL)" },
        three: { label: "🥄 3 tsp = 1 tbsp", description: "3 tsp = 1 tbsp" },
        twelve: { label: "🥛 12 tsp = ¼ cup", description: "12 tsp = ¼ cup" },
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
            "1 US teaspoon = exactly 4.929 mL (often rounded to 5 mL)",
            "Select any unit from the dropdown to convert from that unit instead.",
            "Results update instantly as you type.",
            "Use presets for common conversion values.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "About This Conversion",
          content: "Convert teaspoons to milliliters for precise cooking, baking, and medicine dosing. Includes tablespoons and cups. This converter supports all related units in the cooking_volume category, letting you convert between any combination with a single input.",
        },
        howItWorks: {
          title: "How to Convert",
          content: "Enter your value and select the source unit from the dropdown. The converter instantly shows the equivalent in all other units of this type. All conversions use precise factors from international standards (NIST/BIPM).",
        },
        considerations: {
          title: "Important Notes",
          items: [
            { text: "1 US teaspoon = exactly 4.929 mL (often rounded to 5 mL)", type: "info" },
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
            { text: "See the Quick Reference card for common values.", type: "info" },
            { text: "Use presets above for frequently used amounts.", type: "info" },
            { text: "All results update in real-time as you type.", type: "info" },
            { text: "Works on mobile — use it anywhere.", type: "info" },
            { text: "Share results using the Share button below.", type: "info" },
            { text: "Save results for later with the Save button.", type: "info" },
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
        { question: "What units are supported?", answer: "This converter supports all units in the cooking_volume category: tsp, mL, tbsp, cups, fl_oz, L. Select any from the dropdown." },
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
      "name": "Convertidor de Cucharaditas a mL",
      "slug": "calculadora-cucharaditas-a-ml",
      "subtitle": "Convierte cucharaditas a mililitros para medidas de cocina, repostería y medicina.",
      "breadcrumb": "Cucharaditas a mL",
      "seo": {
        "title": "Convertidor de Cucharaditas a mL - Herramienta de Medidas de Cocina",
        "description": "Convierte cucharaditas a mililitros para cocina precisa, repostería y dosificación médica. Incluye cucharadas y tazas.",
        "shortDescription": "Convierte cucharaditas a mililitros para medidas de cocina, repostería y medicina.",
        "keywords": [
          "cucharaditas a ml",
          "cdta a mL",
          "convertidor cucharadita mililitro",
          "medida cocina",
          "conversión repostería",
          "dosificación medicina cdta"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Cantidad",
          "helpText": "Ingrese la cantidad a convertir"
        }
      },
      "results": {
        "primary": {
          "label": "Resultado"
        }
      },
      "presets": {
        "one": {
          "label": "🫖 1 cdta",
          "description": "1 cdta (5 mL)"
        },
        "three": {
          "label": "🥄 3 cdta = 1 cda",
          "description": "3 cdta = 1 cda"
        },
        "twelve": {
          "label": "🥛 12 cdta = ¼ taza",
          "description": "12 cdta = ¼ taza"
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
            "1 cucharadita estadounidense = exactamente 4.929 mL (a menudo redondeada a 5 mL)",
            "Seleccione cualquier unidad del menú desplegable para convertir desde esa unidad.",
            "Los resultados se actualizan instantáneamente mientras escribe.",
            "Use presets para valores de conversión comunes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Acerca de Esta Conversión",
          "content": "Convierte cucharaditas a mililitros para cocina precisa, repostería y dosificación médica. Incluye cucharadas y tazas. Este convertidor soporta todas las unidades relacionadas en la categoría volumen_cocina, permitiéndote convertir entre cualquier combinación con una sola entrada."
        },
        "howItWorks": {
          "title": "Cómo Convertir",
          "content": "Ingrese su valor y seleccione la unidad de origen del menú desplegable. El convertidor muestra instantáneamente el equivalente en todas las demás unidades de este tipo. Todas las conversiones usan factores precisos de estándares internacionales (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notas Importantes",
          "items": [
            {
              "text": "1 cucharadita estadounidense = exactamente 4.929 mL (a menudo redondeada a 5 mL)",
              "type": "info"
            },
            {
              "text": "Seleccione cualquier unidad del menú desplegable para cambiar la unidad de origen.",
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
              "text": "Guarde esta página en favoritos para acceso rápido a este convertidor.",
              "type": "info"
            }
          ]
        },
        "commonValues": {
          "title": "Conversiones Comunes",
          "items": [
            {
              "text": "Vea la tarjeta de Referencia Rápida para valores comunes.",
              "type": "info"
            },
            {
              "text": "Use presets arriba para cantidades frecuentemente usadas.",
              "type": "info"
            },
            {
              "text": "Todos los resultados se actualizan en tiempo real mientras escribe.",
              "type": "info"
            },
            {
              "text": "Funciona en móvil — úselo en cualquier lugar.",
              "type": "info"
            },
            {
              "text": "Comparta resultados usando el botón Compartir abajo.",
              "type": "info"
            },
            {
              "text": "Guarde resultados para más tarde con el botón Guardar.",
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
                "Lea resultado en unidad objetivo",
                "Use menú desplegable para cambiar unidad de origen"
              ],
              "result": "Resultado de conversión instantáneo"
            },
            {
              "title": "Conversión Inversa",
              "steps": [
                "Cambie el menú desplegable a la unidad objetivo",
                "Ingrese su valor",
                "Lea el resultado en la unidad original"
              ],
              "result": "Funciona en ambas direcciones — solo cambie el menú desplegable"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué tan precisas son estas conversiones?",
          "answer": "Todas las conversiones usan factores exactos de estándares internacionales NIST y BIPM. Los resultados son precisos hasta al menos 6 dígitos significativos."
        },
        {
          "question": "¿Puedo convertir en dirección inversa?",
          "answer": "¡Sí! Simplemente cambie la unidad en el menú desplegable para convertir desde cualquier unidad a todas las demás. El convertidor es completamente bidireccional."
        },
        {
          "question": "¿Qué unidades están soportadas?",
          "answer": "Este convertidor soporta todas las unidades en la categoría volumen_cocina: cdta, mL, cda, tazas, oz_líq, L. Seleccione cualquiera del menú desplegable."
        },
        {
          "question": "¿Funciona esto en móvil?",
          "answer": "Sí, este convertidor es completamente responsivo y funciona en cualquier dispositivo — teléfono, tableta o escritorio."
        },
        {
          "question": "¿Puedo compartir mi resultado de conversión?",
          "answer": "¡Sí! Use el botón Compartir Resultados para generar un enlace con su conversión exacta que puede enviar a cualquiera."
        },
        {
          "question": "¿Es gratuito este convertidor?",
          "answer": "Sí, 100% gratuito sin necesidad de registro. Úselo tantas veces como necesite."
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
      "name": "Conversor de Colheres de Chá para mL",
      "slug": "calculadora-colheres-cha-para-ml",
      "subtitle": "Converta colheres de chá para mililitros para medidas culinárias, confeitaria e medicamentos.",
      "breadcrumb": "Colheres de Chá para mL",
      "seo": {
        "title": "Conversor de Colheres de Chá para mL - Ferramenta de Medidas Culinárias",
        "description": "Converta colheres de chá para mililitros para cozinhar, assar e dosear medicamentos com precisão. Inclui colheres de sopa e xícaras.",
        "shortDescription": "Converta colheres de chá para mililitros para medidas culinárias, confeitaria e medicamentos.",
        "keywords": [
          "colheres de chá para ml",
          "colher chá para mL",
          "conversor colher chá mililitro",
          "medidas culinárias",
          "conversão confeitaria",
          "dosagem medicamento colher chá"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Quantidade",
          "helpText": "Digite a quantidade para converter"
        }
      },
      "results": {
        "primary": {
          "label": "Resultado"
        }
      },
      "presets": {
        "one": {
          "label": "🫖 1 colher de chá",
          "description": "1 colher de chá (5 mL)"
        },
        "three": {
          "label": "🥄 3 colheres de chá = 1 colher de sopa",
          "description": "3 colheres de chá = 1 colher de sopa"
        },
        "twelve": {
          "label": "🥛 12 colheres de chá = ¼ xícara",
          "description": "12 colheres de chá = ¼ xícara"
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
            "1 colher de chá americana = exatamente 4,929 mL (frequentemente arredondado para 5 mL)",
            "Selecione qualquer unidade do menu suspenso para converter dessa unidade.",
            "Os resultados são atualizados instantaneamente enquanto você digita.",
            "Use as predefinições para valores de conversão comuns."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Sobre Esta Conversão",
          "content": "Converta colheres de chá para mililitros para cozinhar, assar e dosear medicamentos com precisão. Inclui colheres de sopa e xícaras. Este conversor suporta todas as unidades relacionadas na categoria volume_culinario, permitindo converter entre qualquer combinação com uma única entrada."
        },
        "howItWorks": {
          "title": "Como Converter",
          "content": "Digite seu valor e selecione a unidade de origem no menu suspenso. O conversor mostra instantaneamente o equivalente em todas as outras unidades deste tipo. Todas as conversões usam fatores precisos dos padrões internacionais (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notas Importantes",
          "items": [
            {
              "text": "1 colher de chá americana = exatamente 4,929 mL (frequentemente arredondado para 5 mL)",
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
              "text": "Para números muito grandes ou pequenos, a notação científica pode ser usada.",
              "type": "info"
            },
            {
              "text": "Adicione esta página aos favoritos para acesso rápido a este conversor.",
              "type": "info"
            }
          ]
        },
        "commonValues": {
          "title": "Conversões Comuns",
          "items": [
            {
              "text": "Veja o cartão de Referência Rápida para valores comuns.",
              "type": "info"
            },
            {
              "text": "Use as predefinições acima para quantidades frequentemente usadas.",
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
          "question": "Qual a precisão dessas conversões?",
          "answer": "Todas as conversões usam fatores exatos dos padrões internacionais NIST e BIPM. Os resultados são precisos para pelo menos 6 dígitos significativos."
        },
        {
          "question": "Posso converter na direção inversa?",
          "answer": "Sim! Simplesmente altere a unidade no menu suspenso para converter de qualquer unidade para todas as outras. O conversor é totalmente bidirecional."
        },
        {
          "question": "Quais unidades são suportadas?",
          "answer": "Este conversor suporta todas as unidades na categoria volume_culinario: colher de chá, mL, colher de sopa, xícaras, fl_oz, L. Selecione qualquer uma do menu suspenso."
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
      "name": "Convertisseur Cuillères à Café vers mL",
      "slug": "calculateur-cuilleres-cafe-ml",
      "subtitle": "Convertissez les cuillères à café en millilitres pour la cuisine, la pâtisserie et les médicaments.",
      "breadcrumb": "Cuillères à café vers mL",
      "seo": {
        "title": "Convertisseur Cuillères à Café vers mL - Outil de Mesure Cuisine",
        "description": "Convertissez les cuillères à café en millilitres pour la cuisine précise, la pâtisserie et le dosage de médicaments. Inclut cuillères à soupe et tasses.",
        "shortDescription": "Convertissez les cuillères à café en millilitres pour la cuisine, la pâtisserie et les médicaments.",
        "keywords": [
          "cuillères à café en ml",
          "cac en mL",
          "convertisseur cuillère millilitre",
          "mesure cuisine",
          "conversion pâtisserie",
          "dosage médicament cac"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Quantité",
          "helpText": "Entrez la quantité à convertir"
        }
      },
      "results": {
        "primary": {
          "label": "Résultat"
        }
      },
      "presets": {
        "one": {
          "label": "🫖 1 cac",
          "description": "1 cac (5 mL)"
        },
        "three": {
          "label": "🥄 3 cac = 1 cas",
          "description": "3 cac = 1 cas"
        },
        "twelve": {
          "label": "🥛 12 cac = ¼ tasse",
          "description": "12 cac = ¼ tasse"
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
            "1 cuillère à café US = exactement 4,929 mL (souvent arrondie à 5 mL)",
            "Sélectionnez n'importe quelle unité dans le menu déroulant pour convertir depuis cette unité.",
            "Les résultats se mettent à jour instantanément pendant que vous tapez.",
            "Utilisez les préréglages pour les valeurs de conversion courantes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "À Propos de Cette Conversion",
          "content": "Convertissez les cuillères à café en millilitres pour la cuisine précise, la pâtisserie et le dosage de médicaments. Inclut cuillères à soupe et tasses. Ce convertisseur prend en charge toutes les unités liées dans la catégorie cooking_volume, vous permettant de convertir entre n'importe quelle combinaison avec une seule saisie."
        },
        "howItWorks": {
          "title": "Comment Convertir",
          "content": "Entrez votre valeur et sélectionnez l'unité source dans le menu déroulant. Le convertisseur affiche instantanément l'équivalent dans toutes les autres unités de ce type. Toutes les conversions utilisent des facteurs précis des standards internationaux (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notes Importantes",
          "items": [
            {
              "text": "1 cuillère à café US = exactement 4,929 mL (souvent arrondie à 5 mL)",
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
              "text": "Pour de très grands ou petits nombres, la notation scientifique peut être utilisée.",
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
              "text": "Voir la carte Référence Rapide pour les valeurs courantes.",
              "type": "info"
            },
            {
              "text": "Utilisez les préréglages ci-dessus pour les quantités fréquemment utilisées.",
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
          "answer": "Oui ! Changez simplement l'unité dans le menu déroulant pour convertir de n'importe quelle unité vers toutes les autres. Le convertisseur est entièrement bidirectionnel."
        },
        {
          "question": "Quelles unités sont supportées ?",
          "answer": "Ce convertisseur supporte toutes les unités de la catégorie cooking_volume : cac, mL, cas, tasses, fl_oz, L. Sélectionnez n'importe laquelle dans le menu déroulant."
        },
        {
          "question": "Cela fonctionne-t-il sur mobile ?",
          "answer": "Oui, ce convertisseur est entièrement adaptatif et fonctionne sur n'importe quel appareil — téléphone, tablette ou ordinateur."
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
      "name": "Teelöffel zu mL Umrechner",
      "slug": "teeloeffel-zu-ml-rechner",
      "subtitle": "Konvertieren Sie Teelöffel zu Milliliter für Koch-, Back- und Medikamentenmessungen.",
      "breadcrumb": "Teelöffel zu mL",
      "seo": {
        "title": "Teelöffel zu mL Umrechner - Küchen-Messwerkzeug",
        "description": "Konvertieren Sie Teelöffel zu Milliliter für präzises Kochen, Backen und Medikamentendosierung. Enthält Esslöffel und Tassen.",
        "shortDescription": "Konvertieren Sie Teelöffel zu Milliliter für Koch-, Back- und Medikamentenmessungen.",
        "keywords": [
          "teelöffel zu ml",
          "tl zu mL",
          "teelöffel milliliter umrechner",
          "kochmessung",
          "backumrechnung",
          "medikamentendosierung tl"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Menge",
          "helpText": "Geben Sie die zu konvertierende Menge ein"
        }
      },
      "results": {
        "primary": {
          "label": "Ergebnis"
        }
      },
      "presets": {
        "one": {
          "label": "🫖 1 TL",
          "description": "1 TL (5 mL)"
        },
        "three": {
          "label": "🥄 3 TL = 1 EL",
          "description": "3 TL = 1 EL"
        },
        "twelve": {
          "label": "🥛 12 TL = ¼ Tasse",
          "description": "12 TL = ¼ Tasse"
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
            "1 US-Teelöffel = genau 4,929 mL (oft auf 5 mL gerundet)",
            "Wählen Sie eine beliebige Einheit aus dem Dropdown-Menü, um von dieser Einheit zu konvertieren.",
            "Ergebnisse werden sofort beim Tippen aktualisiert.",
            "Verwenden Sie Voreinstellungen für häufige Umrechnungswerte."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Über diese Umrechnung",
          "content": "Konvertieren Sie Teelöffel zu Milliliter für präzises Kochen, Backen und Medikamentendosierung. Enthält Esslöffel und Tassen. Dieser Umrechner unterstützt alle verwandten Einheiten der Kochvolumen-Kategorie und ermöglicht die Konvertierung zwischen beliebigen Kombinationen mit einer einzigen Eingabe."
        },
        "howItWorks": {
          "title": "So funktioniert die Umrechnung",
          "content": "Geben Sie Ihren Wert ein und wählen Sie die Quelleinheit aus dem Dropdown-Menü. Der Umrechner zeigt sofort das Äquivalent in allen anderen Einheiten dieses Typs an. Alle Umrechnungen verwenden präzise Faktoren von internationalen Standards (NIST/BIPM)."
        },
        "considerations": {
          "title": "Wichtige Hinweise",
          "items": [
            {
              "text": "1 US-Teelöffel = genau 4,929 mL (oft auf 5 mL gerundet)",
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
              "text": "Bei sehr großen oder kleinen Zahlen kann wissenschaftliche Notation verwendet werden.",
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
              "text": "Siehe die Schnellreferenz-Karte für häufige Werte.",
              "type": "info"
            },
            {
              "text": "Verwenden Sie oben stehende Voreinstellungen für häufig verwendete Mengen.",
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
            }
          ]
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Häufige Szenarien",
          "examples": [
            {
              "title": "Grundlegende Umrechnung",
              "steps": [
                "Wert in Quelleinheit eingeben",
                "Ergebnis in Zieleinheit ablesen",
                "Dropdown verwenden, um Quelleinheit zu ändern"
              ],
              "result": "Sofortiges Umrechnungsergebnis"
            },
            {
              "title": "Umgekehrte Umrechnung",
              "steps": [
                "Dropdown auf Zieleinheit ändern",
                "Ihren Wert eingeben",
                "Ergebnis in ursprünglicher Einheit ablesen"
              ],
              "result": "Funktioniert in beide Richtungen — einfach Dropdown ändern"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie genau sind diese Umrechnungen?",
          "answer": "Alle Umrechnungen verwenden exakte Faktoren von NIST- und BIPM-Internationalen Standards. Ergebnisse sind auf mindestens 6 signifikante Stellen genau."
        },
        {
          "question": "Kann ich in umgekehrter Richtung umrechnen?",
          "answer": "Ja! Ändern Sie einfach die Einheit im Dropdown-Menü, um von jeder Einheit zu allen anderen zu konvertieren. Der Umrechner ist vollständig bidirektional."
        },
        {
          "question": "Welche Einheiten werden unterstützt?",
          "answer": "Dieser Umrechner unterstützt alle Einheiten der Kochvolumen-Kategorie: TL, mL, EL, Tassen, fl_oz, L. Wählen Sie eine beliebige aus dem Dropdown-Menü."
        },
        {
          "question": "Funktioniert das auf Mobilgeräten?",
          "answer": "Ja, dieser Umrechner ist vollständig responsive und funktioniert auf jedem Gerät — Telefon, Tablet oder Desktop."
        },
        {
          "question": "Kann ich mein Umrechnungsergebnis teilen?",
          "answer": "Ja! Verwenden Sie die Ergebnisse teilen-Schaltfläche, um einen Link mit Ihrer exakten Umrechnung zu generieren, den Sie an jeden senden können."
        },
        {
          "question": "Ist dieser Umrechner kostenlos?",
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
      step: 1,
      unitType: "cooking_volume",
      syncGroup: false,
      defaultUnit: "tsp",
      allowedUnits: ["tsp", "mL", "tbsp", "cups", "fl_oz", "L"],
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

export function calculateTeaspoonsToMl(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "tsp";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const unitGroup = UNIT_REGISTRY["cooking_volume"];
  const units = unitGroup?.units || [];
  const results: Record<string, number> = {};
  const formatted: Record<string, string> = {};

  // Convert to all available units
  for (const unit of units) {
    try {
      const converted = convert(amount, fromUnit, unit.id, "cooking_volume");
      results[unit.id] = converted;
      formatted[unit.id] = `${fmtNum(converted)} ${unit.symbol}`;
    } catch {
      // Skip units that can't convert
    }
  }

  // Map to standard result keys
  const allUnits = ["tsp", "mL", "tbsp", "cups", "fl_oz", "L"];
  const otherUnits = allUnits.filter(u => u !== fromUnit);

  formatted.primary = formatted[otherUnits[0]] || formatted[allUnits[1]] || "—";
  formatted.secondary1 = formatted[otherUnits[1]] || "—";
  formatted.secondary2 = formatted[otherUnits[2]] || "—";
  formatted.secondary3 = formatted[otherUnits[3]] || "—";

  // Reference values
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

export default teaspoonsToMlConfig;
