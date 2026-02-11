import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const discountCalculatorConfig: CalculatorConfigV4 = {
  id: "discount",
  version: "4.0",
  category: "everyday",
  icon: "🏷️",

  presets: [
    {
      id: "sale20",
      icon: "🛍️",
      values: { originalPrice: 99.99, discountPercent: 20, taxRate: 0 },
    },
    {
      id: "clearance50",
      icon: "🔥",
      values: { originalPrice: 249.99, discountPercent: 50, taxRate: 8.25 },
    },
    {
      id: "coupon15",
      icon: "🎟️",
      values: { originalPrice: 65, discountPercent: 15, taxRate: 7 },
    },
  ],

  t: {
    en: {
      name: "Discount Calculator",
      slug: "discount-calculator",
      subtitle: "Calculate the sale price, savings amount, and final cost after discount and tax instantly.",
      breadcrumb: "Discount",

      seo: {
        title: "Discount Calculator - Sale Price & Savings Tool",
        description: "Calculate your savings instantly. Enter the original price and discount percentage to see the sale price, amount saved, and total after tax. Free online tool.",
        shortDescription: "Calculate discounts, sale prices, and savings.",
        keywords: [
          "discount calculator",
          "sale price calculator",
          "percent off calculator",
          "calculate discount",
          "how much do I save",
          "free discount calculator",
          "online discount tool",
          "price after discount",
        ],
      },

      calculator: { yourInformation: "Price & Discount" },
      ui: {
        yourInformation: "Price & Discount",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        originalPrice: {
          label: "Original Price",
          helpText: "The full price before any discount",
        },
        discountPercent: {
          label: "Discount",
          helpText: "Percentage off the original price",
        },
        taxRate: {
          label: "Tax Rate (Optional)",
          helpText: "Sales tax percentage applied after discount",
        },
      },

      results: {
        salePrice: { label: "Sale Price" },
        youSave: { label: "You Save" },
        finalPrice: { label: "Final Price (with Tax)" },
      },

      presets: {
        sale20: { label: "20% Off $99.99", description: "Standard sale" },
        clearance50: { label: "50% Off $249.99", description: "Clearance + tax" },
        coupon15: { label: "15% Coupon on $65", description: "Coupon with tax" },
      },

      values: {
        "%": "%",
        "off": "off",
        "saved": "saved",
        "tax": "tax",
      },

      formats: {
        summary: "You save {saved} ({percent}% off). Sale price: {salePrice}",
      },

      infoCards: {
        metrics: {
          title: "Price Breakdown",
          items: [
            { label: "Original Price", valueKey: "originalPrice" },
            { label: "Discount Amount", valueKey: "youSave" },
            { label: "Sale Price", valueKey: "salePrice" },
            { label: "Final Price (w/ Tax)", valueKey: "finalPrice" },
          ],
        },
        details: {
          title: "Quick Discounts",
          items: [
            { label: "10% Off", valueKey: "ref10" },
            { label: "25% Off", valueKey: "ref25" },
            { label: "50% Off", valueKey: "ref50" },
            { label: "75% Off", valueKey: "ref75" },
          ],
        },
        tips: {
          title: "Shopping Tips",
          items: [
            "Stack coupons when allowed — apply the bigger discount first for maximum savings",
            "Compare unit prices, not just sale prices, to find the true best deal",
            "A 50% discount followed by an additional 20% off is NOT 70% off — it's 60% off total",
            "Always check if the discount is applied before or after tax — it can change your total",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Discount?",
          content: "A discount is a reduction in the regular price of a product or service, typically expressed as a percentage. Retailers use discounts to attract customers, clear inventory, and boost sales during seasonal events. Understanding how discounts work helps you evaluate whether a deal is genuinely worth taking. The calculation is straightforward: multiply the original price by the discount percentage divided by 100, then subtract that amount from the original price. For instance, a 30% discount on a $50 item means you save $15 and pay $35. Tax, if applicable, is usually calculated on the discounted price, not the original.",
        },
        howItWorks: {
          title: "How to Calculate a Discount",
          content: "The discount calculation follows a simple three-step process. First, calculate the savings amount by multiplying the original price by the discount rate: Savings = Price × (Discount% / 100). Second, subtract the savings from the original price to get the sale price: Sale Price = Price - Savings. Third, if sales tax applies, calculate it on the discounted price and add it: Final = Sale Price × (1 + Tax% / 100). For example, a $120 jacket at 25% off with 8% tax: savings = $30, sale price = $90, tax = $7.20, final price = $97.20. You can also combine these into one formula: Final = Price × (1 - Discount/100) × (1 + Tax/100).",
        },
        considerations: {
          title: "Things to Watch For",
          items: [
            { text: "Stacking discounts: Two 25% discounts ≠ 50% off. First 25% off $100 = $75, then 25% off $75 = $56.25 (43.75% total)", type: "warning" },
            { text: "Original price inflated: Some stores raise prices before a 'sale' — check price history on tools like CamelCamelCamel", type: "warning" },
            { text: "Minimum purchases: Many coupons require a minimum spend — make sure you're not buying extra just to use the coupon", type: "info" },
            { text: "Clearance math: 70% off means you pay 30% of the original — a $200 item costs just $60", type: "info" },
            { text: "Buy one get one 50% off: This is effectively 25% off total when buying two identical items", type: "info" },
            { text: "Tax varies by location: US sales tax ranges from 0% (Oregon) to over 10% (parts of Louisiana, Tennessee)", type: "info" },
          ],
        },
        categories: {
          title: "Types of Discounts",
          items: [
            { text: "Percentage off: The most common type — a fixed percentage reduction from the original price (e.g., 20% off)", type: "info" },
            { text: "Dollar amount off: A fixed dollar savings regardless of price (e.g., $10 off any purchase over $50)", type: "info" },
            { text: "BOGO (Buy One Get One): Get a free or discounted additional item with a purchase", type: "info" },
            { text: "Tiered discounts: Bigger savings at higher quantities (e.g., 10% off 1, 15% off 2, 20% off 3+)", type: "info" },
            { text: "Cashback: A percentage of your purchase returned to you after buying, often via credit card or app", type: "info" },
            { text: "Seasonal/Clearance: Deep discounts to clear old inventory, often 50-75% off during end-of-season sales", type: "info" },
          ],
        },
        examples: {
          title: "Discount Examples",
          description: "Common discount scenarios step by step",
          examples: [
            {
              title: "30% Off a $150 Pair of Shoes",
              steps: [
                "Savings = $150 × 30/100 = $45",
                "Sale price = $150 - $45 = $105",
              ],
              result: "You pay $105, saving $45",
            },
            {
              title: "$80 Item at 40% Off + 8% Tax",
              steps: [
                "Savings = $80 × 40/100 = $32",
                "Sale price = $80 - $32 = $48",
                "Tax = $48 × 8/100 = $3.84",
                "Final = $48 + $3.84 = $51.84",
              ],
              result: "Final price $51.84 (saved $32)",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I calculate a percentage discount?", answer: "Multiply the original price by the discount percentage divided by 100. Then subtract that from the original price. Example: 25% off $80 = $80 × 0.25 = $20 savings, so you pay $60." },
        { question: "Is tax calculated before or after the discount?", answer: "In most US states and countries, sales tax is calculated on the discounted price (after the discount is applied), not the original price. This means you pay less tax on discounted items." },
        { question: "How do I calculate the original price from a sale price?", answer: "Divide the sale price by (1 - discount/100). For example, if something costs $60 after a 25% discount: $60 / (1 - 0.25) = $60 / 0.75 = $80 original price." },
        { question: "How do stacking discounts work?", answer: "Stacking means applying multiple discounts sequentially. A 20% off + 10% off doesn't equal 30% off. Instead: first apply 20% (pay 80%), then 10% off the new price (pay 72%). Total discount is 28%, not 30%." },
        { question: "What does 'up to X% off' mean?", answer: "It means the maximum discount available is X%, but most items may have smaller discounts. Typically only a few items reach the advertised maximum percentage off." },
        { question: "Is a bigger percentage off always a better deal?", answer: "Not necessarily. A higher-priced item at 20% off might save you more dollars than a cheaper item at 40% off. Always compare the actual dollar savings and final prices between options." },
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
      "name": "Calculadora de Descuentos",
      "slug": "calculadora-descuentos",
      "subtitle": "Calcula el precio de venta, el monto de ahorro y el costo final después del descuento e impuestos al instante.",
      "breadcrumb": "Descuentos",
      "seo": {
        "title": "Calculadora de Descuentos - Herramienta de Precio de Venta y Ahorros",
        "description": "Calcula tus ahorros al instante. Ingresa el precio original y el porcentaje de descuento para ver el precio de venta, cantidad ahorrada y total después de impuestos. Herramienta gratuita en línea.",
        "shortDescription": "Calcula descuentos, precios de venta y ahorros.",
        "keywords": [
          "calculadora de descuentos",
          "calculadora precio de venta",
          "calculadora porcentaje descuento",
          "calcular descuento",
          "cuánto ahorro",
          "calculadora descuentos gratis",
          "herramienta descuentos online",
          "precio después del descuento"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "originalPrice": {
          "label": "Precio Original",
          "helpText": "El precio completo antes de cualquier descuento"
        },
        "discountPercent": {
          "label": "Descuento",
          "helpText": "Porcentaje de descuento del precio original"
        },
        "taxRate": {
          "label": "Tasa de Impuesto (Opcional)",
          "helpText": "Porcentaje de impuesto aplicado después del descuento"
        }
      },
      "results": {
        "salePrice": {
          "label": "Precio de Venta"
        },
        "youSave": {
          "label": "Ahorras"
        },
        "finalPrice": {
          "label": "Precio Final (con Impuesto)"
        }
      },
      "presets": {
        "sale20": {
          "label": "20% de Descuento en $99.99",
          "description": "Oferta estándar"
        },
        "clearance50": {
          "label": "50% de Descuento en $249.99",
          "description": "Liquidación + impuesto"
        },
        "coupon15": {
          "label": "Cupón 15% en $65",
          "description": "Cupón con impuesto"
        }
      },
      "values": {
        "%": "%",
        "off": "desc.",
        "saved": "ahorrado",
        "tax": "impuesto"
      },
      "formats": {
        "summary": "Ahorras {saved} ({percent}% desc.). Precio de venta: {salePrice}"
      },
      "infoCards": {
        "metrics": {
          "title": "Desglose de Precios",
          "items": [
            {
              "label": "Precio Original",
              "valueKey": "originalPrice"
            },
            {
              "label": "Monto del Descuento",
              "valueKey": "youSave"
            },
            {
              "label": "Precio de Venta",
              "valueKey": "salePrice"
            },
            {
              "label": "Precio Final (c/ Impuesto)",
              "valueKey": "finalPrice"
            }
          ]
        },
        "details": {
          "title": "Descuentos Rápidos",
          "items": [
            {
              "label": "10% de Descuento",
              "valueKey": "ref10"
            },
            {
              "label": "25% de Descuento",
              "valueKey": "ref25"
            },
            {
              "label": "50% de Descuento",
              "valueKey": "ref50"
            },
            {
              "label": "75% de Descuento",
              "valueKey": "ref75"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Compra",
          "items": [
            "Combina cupones cuando esté permitido: aplica primero el descuento mayor para maximizar ahorros",
            "Compara precios por unidad, no solo precios de oferta, para encontrar la mejor oferta",
            "Un 50% de descuento seguido de un 20% adicional NO es 70% de descuento total, es 60%",
            "Siempre verifica si el descuento se aplica antes o después del impuesto, puede cambiar tu total"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es un Descuento?",
          "content": "Un descuento es una reducción en el precio regular de un producto o servicio, típicamente expresado como porcentaje. Los comerciantes usan descuentos para atraer clientes, liquidar inventario y aumentar ventas durante eventos estacionales. Entender cómo funcionan los descuentos te ayuda a evaluar si una oferta realmente vale la pena. El cálculo es sencillo: multiplica el precio original por el porcentaje de descuento dividido por 100, luego resta esa cantidad del precio original. Por ejemplo, un 30% de descuento en un artículo de $50 significa que ahorras $15 y pagas $35. El impuesto, si aplica, usualmente se calcula sobre el precio con descuento, no el original."
        },
        "howItWorks": {
          "title": "Cómo Calcular un Descuento",
          "content": "El cálculo de descuento sigue un proceso simple de tres pasos. Primero, calcula el monto de ahorro multiplicando el precio original por la tasa de descuento: Ahorro = Precio × (Descuento% / 100). Segundo, resta el ahorro del precio original para obtener el precio de venta: Precio de Venta = Precio - Ahorro. Tercero, si aplica impuesto de venta, calcúlalo sobre el precio con descuento y súmalo: Final = Precio de Venta × (1 + Impuesto% / 100). Por ejemplo, una chaqueta de $120 con 25% de descuento y 8% de impuesto: ahorro = $30, precio de venta = $90, impuesto = $7.20, precio final = $97.20. También puedes combinar estos en una fórmula: Final = Precio × (1 - Descuento/100) × (1 + Impuesto/100)."
        },
        "considerations": {
          "title": "Cosas a Considerar",
          "items": [
            {
              "text": "Descuentos acumulados: Dos descuentos del 25% ≠ 50% desc. Primero 25% desc. de $100 = $75, luego 25% desc. de $75 = $56.25 (43.75% total)",
              "type": "warning"
            },
            {
              "text": "Precio original inflado: Algunas tiendas suben precios antes de una 'oferta': verifica historial de precios en herramientas como CamelCamelCamel",
              "type": "warning"
            },
            {
              "text": "Compras mínimas: Muchos cupones requieren gasto mínimo: asegúrate de no comprar extra solo para usar el cupón",
              "type": "info"
            },
            {
              "text": "Matemática de liquidación: 70% desc. significa que pagas 30% del original: un artículo de $200 cuesta solo $60",
              "type": "info"
            },
            {
              "text": "Lleva uno y el segundo 50% desc.: Esto es efectivamente 25% desc. total al comprar dos artículos idénticos",
              "type": "info"
            },
            {
              "text": "Impuesto varía por ubicación: En EE.UU. el impuesto de venta va de 0% (Oregón) a más del 10% (partes de Louisiana, Tennessee)",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Tipos de Descuentos",
          "items": [
            {
              "text": "Porcentaje de descuento: El tipo más común, una reducción porcentual fija del precio original (ej. 20% desc.)",
              "type": "info"
            },
            {
              "text": "Descuento en dinero: Un ahorro fijo en dólares sin importar el precio (ej. $10 desc. en compras sobre $50)",
              "type": "info"
            },
            {
              "text": "BOGO (Lleva Uno Lleva Otro): Obtén un artículo adicional gratis o con descuento al comprar",
              "type": "info"
            },
            {
              "text": "Descuentos por niveles: Mayores ahorros en cantidades altas (ej. 10% desc. 1, 15% desc. 2, 20% desc. 3+)",
              "type": "info"
            },
            {
              "text": "Cashback: Un porcentaje de tu compra devuelto después de comprar, a menudo vía tarjeta de crédito o app",
              "type": "info"
            },
            {
              "text": "Estacional/Liquidación: Descuentos profundos para liquidar inventario viejo, a menudo 50-75% desc. al final de temporada",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Descuentos",
          "description": "Escenarios comunes de descuentos paso a paso",
          "examples": [
            {
              "title": "30% de Descuento en Zapatos de $150",
              "steps": [
                "Ahorro = $150 × 30/100 = $45",
                "Precio de venta = $150 - $45 = $105"
              ],
              "result": "Pagas $105, ahorrando $45"
            },
            {
              "title": "Artículo de $80 con 40% Desc. + 8% Impuesto",
              "steps": [
                "Ahorro = $80 × 40/100 = $32",
                "Precio de venta = $80 - $32 = $48",
                "Impuesto = $48 × 8/100 = $3.84",
                "Final = $48 + $3.84 = $51.84"
              ],
              "result": "Precio final $51.84 (ahorraste $32)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cómo calculo un descuento porcentual?",
          "answer": "Multiplica el precio original por el porcentaje de descuento dividido por 100. Luego resta eso del precio original. Ejemplo: 25% desc. en $80 = $80 × 0.25 = $20 de ahorro, entonces pagas $60."
        },
        {
          "question": "¿El impuesto se calcula antes o después del descuento?",
          "answer": "En la mayoría de estados de EE.UU. y países, el impuesto de venta se calcula sobre el precio con descuento (después de aplicar el descuento), no el precio original. Esto significa que pagas menos impuesto en artículos con descuento."
        },
        {
          "question": "¿Cómo calculo el precio original desde un precio de oferta?",
          "answer": "Divide el precio de oferta por (1 - descuento/100). Por ejemplo, si algo cuesta $60 después de un 25% de descuento: $60 / (1 - 0.25) = $60 / 0.75 = $80 precio original."
        },
        {
          "question": "¿Cómo funcionan los descuentos acumulados?",
          "answer": "Acumular significa aplicar múltiples descuentos secuencialmente. Un 20% desc. + 10% desc. no es igual a 30% desc. En su lugar: primero aplica 20% (pagas 80%), luego 10% desc. del nuevo precio (pagas 72%). Descuento total es 28%, no 30%."
        },
        {
          "question": "¿Qué significa 'hasta X% de descuento'?",
          "answer": "Significa que el descuento máximo disponible es X%, pero la mayoría de artículos pueden tener descuentos menores. Típicamente solo unos pocos artículos alcanzan el porcentaje máximo anunciado."
        },
        {
          "question": "¿Un mayor porcentaje de descuento siempre es mejor oferta?",
          "answer": "No necesariamente. Un artículo de mayor precio con 20% desc. podría ahorrarte más dólares que un artículo más barato con 40% desc. Siempre compara el ahorro real en dólares y precios finales entre opciones."
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
      "name": "Calculadora de Desconto",
      "slug": "calculadora-desconto",
      "subtitle": "Calcule o preço de venda, valor da economia e custo final após desconto e imposto instantaneamente.",
      "breadcrumb": "Desconto",
      "seo": {
        "title": "Calculadora de Desconto - Ferramenta de Preço de Venda e Economia",
        "description": "Calcule sua economia instantaneamente. Digite o preço original e a porcentagem de desconto para ver o preço de venda, valor economizado e total após impostos. Ferramenta online gratuita.",
        "shortDescription": "Calcule descontos, preços de venda e economia.",
        "keywords": [
          "calculadora de desconto",
          "calculadora de preço de venda",
          "calculadora de porcentagem de desconto",
          "calcular desconto",
          "quanto eu economizo",
          "calculadora de desconto grátis",
          "ferramenta de desconto online",
          "preço após desconto"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "originalPrice": {
          "label": "Preço Original",
          "helpText": "O preço cheio antes de qualquer desconto"
        },
        "discountPercent": {
          "label": "Desconto",
          "helpText": "Porcentagem de desconto sobre o preço original"
        },
        "taxRate": {
          "label": "Taxa de Imposto (Opcional)",
          "helpText": "Porcentagem de imposto aplicada após o desconto"
        }
      },
      "results": {
        "salePrice": {
          "label": "Preço de Venda"
        },
        "youSave": {
          "label": "Você Economiza"
        },
        "finalPrice": {
          "label": "Preço Final (com Imposto)"
        }
      },
      "presets": {
        "sale20": {
          "label": "20% Desconto R$ 99,99",
          "description": "Promoção padrão"
        },
        "clearance50": {
          "label": "50% Desconto R$ 249,99",
          "description": "Liquidação + imposto"
        },
        "coupon15": {
          "label": "Cupom 15% em R$ 65",
          "description": "Cupom com imposto"
        }
      },
      "values": {
        "%": "%",
        "off": "desconto",
        "saved": "economizado",
        "tax": "imposto"
      },
      "formats": {
        "summary": "Você economiza {saved} ({percent}% desconto). Preço de venda: {salePrice}"
      },
      "infoCards": {
        "metrics": {
          "title": "Detalhamento do Preço",
          "items": [
            {
              "label": "Preço Original",
              "valueKey": "originalPrice"
            },
            {
              "label": "Valor do Desconto",
              "valueKey": "youSave"
            },
            {
              "label": "Preço de Venda",
              "valueKey": "salePrice"
            },
            {
              "label": "Preço Final (c/ Imposto)",
              "valueKey": "finalPrice"
            }
          ]
        },
        "details": {
          "title": "Descontos Rápidos",
          "items": [
            {
              "label": "10% Desconto",
              "valueKey": "ref10"
            },
            {
              "label": "25% Desconto",
              "valueKey": "ref25"
            },
            {
              "label": "50% Desconto",
              "valueKey": "ref50"
            },
            {
              "label": "75% Desconto",
              "valueKey": "ref75"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Compras",
          "items": [
            "Combine cupons quando permitido — aplique o maior desconto primeiro para economia máxima",
            "Compare preços unitários, não apenas preços promocionais, para encontrar a melhor oferta",
            "Um desconto de 50% seguido de 20% adicional NÃO é 70% de desconto — é 60% no total",
            "Sempre verifique se o desconto é aplicado antes ou depois do imposto — pode alterar seu total"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é um Desconto?",
          "content": "Um desconto é uma redução no preço regular de um produto ou serviço, tipicamente expressa como porcentagem. Varejistas usam descontos para atrair clientes, limpar estoque e aumentar vendas durante eventos sazonais. Entender como descontos funcionam ajuda você a avaliar se uma oferta vale realmente a pena. O cálculo é direto: multiplique o preço original pela porcentagem de desconto dividida por 100, depois subtraia esse valor do preço original. Por exemplo, um desconto de 30% em um item de R$ 50 significa que você economiza R$ 15 e paga R$ 35. Imposto, se aplicável, é geralmente calculado sobre o preço com desconto, não o original."
        },
        "howItWorks": {
          "title": "Como Calcular um Desconto",
          "content": "O cálculo de desconto segue um processo simples de três passos. Primeiro, calcule o valor da economia multiplicando o preço original pela taxa de desconto: Economia = Preço × (Desconto% / 100). Segundo, subtraia a economia do preço original para obter o preço de venda: Preço de Venda = Preço - Economia. Terceiro, se houver imposto, calcule-o sobre o preço com desconto e adicione: Final = Preço de Venda × (1 + Imposto% / 100). Por exemplo, uma jaqueta de R$ 120 com 25% de desconto e 8% de imposto: economia = R$ 30, preço de venda = R$ 90, imposto = R$ 7,20, preço final = R$ 97,20. Você também pode combinar em uma fórmula: Final = Preço × (1 - Desconto/100) × (1 + Imposto/100)."
        },
        "considerations": {
          "title": "Pontos de Atenção",
          "items": [
            {
              "text": "Descontos empilhados: Dois descontos de 25% ≠ 50% de desconto. Primeiro 25% de R$ 100 = R$ 75, depois 25% de R$ 75 = R$ 56,25 (43,75% total)",
              "type": "warning"
            },
            {
              "text": "Preço original inflacionado: Algumas lojas aumentam preços antes de uma 'promoção' — verifique o histórico de preços",
              "type": "warning"
            },
            {
              "text": "Compras mínimas: Muitos cupons exigem valor mínimo — certifique-se de não comprar extra só para usar o cupom",
              "type": "info"
            },
            {
              "text": "Liquidação: 70% de desconto significa que você paga 30% do original — um item de R$ 200 custa apenas R$ 60",
              "type": "info"
            },
            {
              "text": "Leve um e pague 50% no segundo: Isso é efetivamente 25% de desconto no total ao comprar dois itens idênticos",
              "type": "info"
            },
            {
              "text": "Impostos variam por localização: No Brasil, pode haver diferenças entre estados e tipos de produto",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Tipos de Descontos",
          "items": [
            {
              "text": "Porcentagem de desconto: O tipo mais comum — uma redução percentual fixa do preço original (ex: 20% de desconto)",
              "type": "info"
            },
            {
              "text": "Valor fixo de desconto: Uma economia fixa independente do preço (ex: R$ 10 de desconto em compras acima de R$ 50)",
              "type": "info"
            },
            {
              "text": "Leve 1 Pague 1: Ganhe um item adicional grátis ou com desconto na compra",
              "type": "info"
            },
            {
              "text": "Descontos em níveis: Maior economia em quantidades maiores (ex: 10% em 1, 15% em 2, 20% em 3+)",
              "type": "info"
            },
            {
              "text": "Cashback: Uma porcentagem da compra devolvida após comprar, frequentemente via cartão de crédito ou app",
              "type": "info"
            },
            {
              "text": "Sazonal/Liquidação: Descontos profundos para limpar estoque antigo, frequentemente 50-75% de desconto",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Desconto",
          "description": "Cenários comuns de desconto passo a passo",
          "examples": [
            {
              "title": "30% Desconto em um Sapato de R$ 150",
              "steps": [
                "Economia = R$ 150 × 30/100 = R$ 45",
                "Preço de venda = R$ 150 - R$ 45 = R$ 105"
              ],
              "result": "Você paga R$ 105, economizando R$ 45"
            },
            {
              "title": "Item de R$ 80 com 40% Desconto + 8% Imposto",
              "steps": [
                "Economia = R$ 80 × 40/100 = R$ 32",
                "Preço de venda = R$ 80 - R$ 32 = R$ 48",
                "Imposto = R$ 48 × 8/100 = R$ 3,84",
                "Final = R$ 48 + R$ 3,84 = R$ 51,84"
              ],
              "result": "Preço final R$ 51,84 (economizou R$ 32)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Como calcular um desconto percentual?",
          "answer": "Multiplique o preço original pela porcentagem de desconto dividida por 100. Depois subtraia isso do preço original. Exemplo: 25% de desconto em R$ 80 = R$ 80 × 0,25 = R$ 20 de economia, então você paga R$ 60."
        },
        {
          "question": "O imposto é calculado antes ou depois do desconto?",
          "answer": "Na maioria dos estados brasileiros e países, o imposto é calculado sobre o preço com desconto (após aplicar o desconto), não sobre o preço original. Isso significa que você paga menos imposto em itens com desconto."
        },
        {
          "question": "Como calcular o preço original a partir do preço de venda?",
          "answer": "Divida o preço de venda por (1 - desconto/100). Por exemplo, se algo custa R$ 60 após 25% de desconto: R$ 60 / (1 - 0,25) = R$ 60 / 0,75 = R$ 80 preço original."
        },
        {
          "question": "Como funcionam descontos empilhados?",
          "answer": "Empilhar significa aplicar múltiplos descontos sequencialmente. 20% + 10% de desconto não é igual a 30%. Em vez disso: primeiro aplique 20% (pague 80%), depois 10% do novo preço (pague 72%). Desconto total é 28%, não 30%."
        },
        {
          "question": "O que significa 'até X% de desconto'?",
          "answer": "Significa que o desconto máximo disponível é X%, mas a maioria dos itens pode ter descontos menores. Tipicamente apenas alguns itens chegam à porcentagem máxima anunciada."
        },
        {
          "question": "Uma porcentagem maior de desconto é sempre melhor negócio?",
          "answer": "Não necessariamente. Um item mais caro com 20% de desconto pode economizar mais reais que um item mais barato com 40% de desconto. Sempre compare a economia real em reais e os preços finais entre as opções."
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
      "name": "Calculateur de Remise",
      "slug": "calculateur-remise",
      "subtitle": "Calculez instantanément le prix soldé, le montant des économies et le coût final après remise et taxe.",
      "breadcrumb": "Remise",
      "seo": {
        "title": "Calculateur de Remise - Outil de Prix Soldé et Économies",
        "description": "Calculez vos économies instantanément. Entrez le prix original et le pourcentage de remise pour voir le prix soldé, le montant économisé et le total après taxe. Outil gratuit en ligne.",
        "shortDescription": "Calculez les remises, prix soldés et économies.",
        "keywords": [
          "calculateur de remise",
          "calculateur prix soldé",
          "calculateur pourcentage de réduction",
          "calculer remise",
          "combien j'économise",
          "calculateur remise gratuit",
          "outil remise en ligne",
          "prix après remise"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "originalPrice": {
          "label": "Prix Original",
          "helpText": "Le prix complet avant toute remise"
        },
        "discountPercent": {
          "label": "Remise",
          "helpText": "Pourcentage de réduction du prix original"
        },
        "taxRate": {
          "label": "Taux de Taxe (Optionnel)",
          "helpText": "Pourcentage de taxe de vente appliqué après la remise"
        }
      },
      "results": {
        "salePrice": {
          "label": "Prix Soldé"
        },
        "youSave": {
          "label": "Vous Économisez"
        },
        "finalPrice": {
          "label": "Prix Final (avec Taxe)"
        }
      },
      "presets": {
        "sale20": {
          "label": "20% de Réduction sur 99,99€",
          "description": "Solde standard"
        },
        "clearance50": {
          "label": "50% de Réduction sur 249,99€",
          "description": "Liquidation + taxe"
        },
        "coupon15": {
          "label": "Coupon 15% sur 65€",
          "description": "Coupon avec taxe"
        }
      },
      "values": {
        "%": "%",
        "off": "de réduction",
        "saved": "économisé",
        "tax": "taxe"
      },
      "formats": {
        "summary": "Vous économisez {saved} ({percent}% de réduction). Prix soldé : {salePrice}"
      },
      "infoCards": {
        "metrics": {
          "title": "Détail des Prix",
          "items": [
            {
              "label": "Prix Original",
              "valueKey": "originalPrice"
            },
            {
              "label": "Montant de la Remise",
              "valueKey": "youSave"
            },
            {
              "label": "Prix Soldé",
              "valueKey": "salePrice"
            },
            {
              "label": "Prix Final (avec Taxe)",
              "valueKey": "finalPrice"
            }
          ]
        },
        "details": {
          "title": "Remises Rapides",
          "items": [
            {
              "label": "10% de Réduction",
              "valueKey": "ref10"
            },
            {
              "label": "25% de Réduction",
              "valueKey": "ref25"
            },
            {
              "label": "50% de Réduction",
              "valueKey": "ref50"
            },
            {
              "label": "75% de Réduction",
              "valueKey": "ref75"
            }
          ]
        },
        "tips": {
          "title": "Conseils d'Achat",
          "items": [
            "Cumulez les coupons quand c'est autorisé — appliquez d'abord la plus grosse remise pour maximiser les économies",
            "Comparez les prix unitaires, pas seulement les prix soldés, pour trouver la vraie meilleure affaire",
            "Une remise de 50% suivie de 20% supplémentaires ne fait PAS 70% de réduction — c'est 60% au total",
            "Vérifiez toujours si la remise s'applique avant ou après la taxe — cela peut changer votre total"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'une Remise ?",
          "content": "Une remise est une réduction du prix régulier d'un produit ou service, généralement exprimée en pourcentage. Les détaillants utilisent les remises pour attirer les clients, écouler les stocks et stimuler les ventes pendant les événements saisonniers. Comprendre comment fonctionnent les remises vous aide à évaluer si une offre vaut vraiment la peine. Le calcul est simple : multipliez le prix original par le pourcentage de remise divisé par 100, puis soustrayez ce montant du prix original. Par exemple, une remise de 30% sur un article à 50€ signifie que vous économisez 15€ et payez 35€. La taxe, si applicable, est généralement calculée sur le prix remisé, pas sur le prix original."
        },
        "howItWorks": {
          "title": "Comment Calculer une Remise",
          "content": "Le calcul de remise suit un processus simple en trois étapes. Premièrement, calculez le montant des économies en multipliant le prix original par le taux de remise : Économies = Prix × (Remise% / 100). Deuxièmement, soustrayez les économies du prix original pour obtenir le prix soldé : Prix Soldé = Prix - Économies. Troisièmement, si la taxe de vente s'applique, calculez-la sur le prix remisé et ajoutez-la : Final = Prix Soldé × (1 + Taxe% / 100). Par exemple, une veste à 120€ avec 25% de remise et 20% de taxe : économies = 30€, prix soldé = 90€, taxe = 18€, prix final = 108€. Vous pouvez aussi combiner cela en une formule : Final = Prix × (1 - Remise/100) × (1 + Taxe/100)."
        },
        "considerations": {
          "title": "Points d'Attention",
          "items": [
            {
              "text": "Cumul de remises : Deux remises de 25% ≠ 50% de réduction. D'abord 25% sur 100€ = 75€, puis 25% sur 75€ = 56,25€ (43,75% au total)",
              "type": "warning"
            },
            {
              "text": "Prix original gonflé : Certains magasins augmentent les prix avant une 'promotion' — vérifiez l'historique des prix",
              "type": "warning"
            },
            {
              "text": "Achats minimums : Beaucoup de coupons nécessitent un montant minimum — ne pas acheter plus juste pour utiliser le coupon",
              "type": "info"
            },
            {
              "text": "Calcul liquidation : 70% de réduction signifie payer 30% de l'original — un article à 200€ coûte seulement 60€",
              "type": "info"
            },
            {
              "text": "Achetez-en un obtenez le second à 50% : Équivaut effectivement à 25% de réduction sur le total pour deux articles identiques",
              "type": "info"
            },
            {
              "text": "La taxe varie selon la localisation : La TVA en France est de 20%, mais varie dans d'autres pays",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Types de Remises",
          "items": [
            {
              "text": "Pourcentage de réduction : Le type le plus courant — une réduction en pourcentage fixe du prix original (ex: 20% de réduction)",
              "type": "info"
            },
            {
              "text": "Montant fixe : Une économie en euros fixes indépendamment du prix (ex: 10€ de réduction sur tout achat de plus de 50€)",
              "type": "info"
            },
            {
              "text": "2 pour 1 : Obtenez un article gratuit ou à prix réduit avec un achat",
              "type": "info"
            },
            {
              "text": "Remises échelonnées : Plus d'économies pour plus de quantité (ex: 10% sur 1, 15% sur 2, 20% sur 3+)",
              "type": "info"
            },
            {
              "text": "Cashback : Un pourcentage de votre achat vous est rendu après l'achat, souvent via carte ou app",
              "type": "info"
            },
            {
              "text": "Saisonnier/Liquidation : Grosses remises pour écouler les anciens stocks, souvent 50-75% lors des fins de saison",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Remises",
          "description": "Scénarios de remise courants étape par étape",
          "examples": [
            {
              "title": "30% de Réduction sur des Chaussures à 150€",
              "steps": [
                "Économies = 150€ × 30/100 = 45€",
                "Prix soldé = 150€ - 45€ = 105€"
              ],
              "result": "Vous payez 105€, économisant 45€"
            },
            {
              "title": "Article à 80€ avec 40% de Réduction + 20% de Taxe",
              "steps": [
                "Économies = 80€ × 40/100 = 32€",
                "Prix soldé = 80€ - 32€ = 48€",
                "Taxe = 48€ × 20/100 = 9,60€",
                "Final = 48€ + 9,60€ = 57,60€"
              ],
              "result": "Prix final 57,60€ (économisé 32€)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Comment calculer une remise en pourcentage ?",
          "answer": "Multipliez le prix original par le pourcentage de remise divisé par 100. Puis soustrayez cela du prix original. Exemple : 25% de réduction sur 80€ = 80€ × 0,25 = 20€ d'économies, donc vous payez 60€."
        },
        {
          "question": "La taxe est-elle calculée avant ou après la remise ?",
          "answer": "Dans la plupart des pays, la taxe de vente est calculée sur le prix remisé (après application de la remise), pas sur le prix original. Cela signifie que vous payez moins de taxe sur les articles remisés."
        },
        {
          "question": "Comment calculer le prix original à partir d'un prix soldé ?",
          "answer": "Divisez le prix soldé par (1 - remise/100). Par exemple, si quelque chose coûte 60€ après une remise de 25% : 60€ / (1 - 0,25) = 60€ / 0,75 = 80€ prix original."
        },
        {
          "question": "Comment fonctionnent les remises cumulées ?",
          "answer": "Cumuler signifie appliquer plusieurs remises séquentiellement. 20% + 10% ne fait pas 30%. Au lieu de cela : d'abord 20% (payez 80%), puis 10% sur le nouveau prix (payez 72%). La remise totale est de 28%, pas 30%."
        },
        {
          "question": "Que signifie 'jusqu'à X% de réduction' ?",
          "answer": "Cela signifie que la remise maximum disponible est de X%, mais la plupart des articles peuvent avoir des remises plus petites. Généralement, seuls quelques articles atteignent le pourcentage maximum annoncé."
        },
        {
          "question": "Un plus gros pourcentage de réduction est-il toujours une meilleure affaire ?",
          "answer": "Pas nécessairement. Un article plus cher à 20% de réduction peut vous faire économiser plus d'euros qu'un article moins cher à 40% de réduction. Comparez toujours les économies réelles en euros et les prix finaux entre les options."
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
      "name": "Rabatt Rechner",
      "slug": "rabatt-rechner",
      "subtitle": "Berechnen Sie sofort den Verkaufspreis, die Ersparnis und die Endkosten nach Rabatt und Steuern.",
      "breadcrumb": "Rabatt",
      "seo": {
        "title": "Rabatt Rechner - Verkaufspreis & Ersparnisse Tool",
        "description": "Berechnen Sie Ihre Ersparnisse sofort. Geben Sie den ursprünglichen Preis und den Rabattprozentsatz ein, um den Verkaufspreis, die gesparte Summe und den Gesamtbetrag nach Steuern zu sehen. Kostenloses Online-Tool.",
        "shortDescription": "Berechnen Sie Rabatte, Verkaufspreise und Ersparnisse.",
        "keywords": [
          "rabatt rechner",
          "verkaufspreis rechner",
          "prozent rabatt rechner",
          "rabatt berechnen",
          "wie viel spare ich",
          "kostenloser rabatt rechner",
          "online rabatt tool",
          "preis nach rabatt"
        ]
      },
      "inputs": {
        "originalPrice": {
          "label": "Ursprünglicher Preis",
          "helpText": "Der volle Preis vor jedem Rabatt"
        },
        "discountPercent": {
          "label": "Rabatt",
          "helpText": "Prozentualer Abschlag vom ursprünglichen Preis"
        },
        "taxRate": {
          "label": "Steuersatz (Optional)",
          "helpText": "Umsatzsteuerprozentsatz, der nach dem Rabatt angewendet wird"
        }
      },
      "results": {
        "salePrice": {
          "label": "Verkaufspreis"
        },
        "youSave": {
          "label": "Sie sparen"
        },
        "finalPrice": {
          "label": "Endpreis (mit Steuer)"
        }
      },
      "presets": {
        "sale20": {
          "label": "20% Rabatt auf 99,99€",
          "description": "Standard-Angebot"
        },
        "clearance50": {
          "label": "50% Rabatt auf 249,99€",
          "description": "Ausverkauf + Steuer"
        },
        "coupon15": {
          "label": "15% Gutschein auf 65€",
          "description": "Gutschein mit Steuer"
        }
      },
      "values": {
        "%": "%",
        "off": "Rabatt",
        "saved": "gespart",
        "tax": "Steuer"
      },
      "formats": {
        "summary": "Sie sparen {saved} ({percent}% Rabatt). Verkaufspreis: {salePrice}"
      },
      "infoCards": {
        "metrics": {
          "title": "Preisaufschlüsselung",
          "items": [
            {
              "label": "Ursprünglicher Preis",
              "valueKey": "originalPrice"
            },
            {
              "label": "Rabattbetrag",
              "valueKey": "youSave"
            },
            {
              "label": "Verkaufspreis",
              "valueKey": "salePrice"
            },
            {
              "label": "Endpreis (m. Steuer)",
              "valueKey": "finalPrice"
            }
          ]
        },
        "details": {
          "title": "Schnelle Rabatte",
          "items": [
            {
              "label": "10% Rabatt",
              "valueKey": "ref10"
            },
            {
              "label": "25% Rabatt",
              "valueKey": "ref25"
            },
            {
              "label": "50% Rabatt",
              "valueKey": "ref50"
            },
            {
              "label": "75% Rabatt",
              "valueKey": "ref75"
            }
          ]
        },
        "tips": {
          "title": "Einkaufstipps",
          "items": [
            "Stapeln Sie Gutscheine wenn erlaubt — wenden Sie den größeren Rabatt zuerst an für maximale Ersparnisse",
            "Vergleichen Sie Stückpreise, nicht nur Verkaufspreise, um das wirklich beste Angebot zu finden",
            "50% Rabatt gefolgt von weiteren 20% Rabatt sind NICHT 70% Rabatt — es sind insgesamt 60% Rabatt",
            "Prüfen Sie immer, ob der Rabatt vor oder nach der Steuer angewendet wird — das kann Ihren Gesamtbetrag ändern"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Rabatt?",
          "content": "Ein Rabatt ist eine Reduzierung des regulären Preises eines Produkts oder einer Dienstleistung, typischerweise als Prozentsatz ausgedrückt. Einzelhändler nutzen Rabatte, um Kunden anzulocken, Lagerbestände zu räumen und den Umsatz während saisonaler Ereignisse zu steigern. Das Verstehen, wie Rabatte funktionieren, hilft Ihnen zu bewerten, ob ein Angebot wirklich lohnenswert ist. Die Berechnung ist einfach: multiplizieren Sie den ursprünglichen Preis mit dem Rabattprozentsatz geteilt durch 100, dann subtrahieren Sie diesen Betrag vom ursprünglichen Preis. Zum Beispiel bedeutet ein 30% Rabatt auf einen 50€ Artikel, dass Sie 15€ sparen und 35€ zahlen. Steuer, falls anwendbar, wird normalerweise auf den rabattierten Preis berechnet, nicht auf den ursprünglichen."
        },
        "howItWorks": {
          "title": "Wie man einen Rabatt berechnet",
          "content": "Die Rabattberechnung folgt einem einfachen dreistufigen Prozess. Erstens, berechnen Sie die Ersparnis, indem Sie den ursprünglichen Preis mit dem Rabattprozentsatz multiplizieren: Ersparnis = Preis × (Rabatt% / 100). Zweitens, subtrahieren Sie die Ersparnis vom ursprünglichen Preis, um den Verkaufspreis zu erhalten: Verkaufspreis = Preis - Ersparnis. Drittens, falls Umsatzsteuer anfällt, berechnen Sie sie auf den rabattierten Preis und addieren Sie sie: Endpreis = Verkaufspreis × (1 + Steuer% / 100). Zum Beispiel, eine 120€ Jacke mit 25% Rabatt und 19% Steuer: Ersparnis = 30€, Verkaufspreis = 90€, Steuer = 17,10€, Endpreis = 107,10€. Sie können diese auch in eine Formel kombinieren: Endpreis = Preis × (1 - Rabatt/100) × (1 + Steuer/100)."
        },
        "considerations": {
          "title": "Worauf Sie achten sollten",
          "items": [
            {
              "text": "Gestapelte Rabatte: Zwei 25% Rabatte ≠ 50% Rabatt. Erst 25% von 100€ = 75€, dann 25% von 75€ = 56,25€ (43,75% insgesamt)",
              "type": "warning"
            },
            {
              "text": "Aufgeblähter ursprünglicher Preis: Manche Geschäfte erhöhen Preise vor einem 'Ausverkauf' — prüfen Sie die Preishistorie mit Tools wie Keepa",
              "type": "warning"
            },
            {
              "text": "Mindesteinkauf: Viele Gutscheine erfordern einen Mindesteinkauf — stellen Sie sicher, dass Sie nicht extra kaufen, nur um den Gutschein zu nutzen",
              "type": "info"
            },
            {
              "text": "Ausverkaufs-Rechnung: 70% Rabatt bedeutet, Sie zahlen 30% des ursprünglichen Preises — ein 200€ Artikel kostet nur 60€",
              "type": "info"
            },
            {
              "text": "Kaufe eins, erhalte eins 50% günstiger: Das sind effektiv 25% Rabatt auf den Gesamtbetrag beim Kauf von zwei identischen Artikeln",
              "type": "info"
            },
            {
              "text": "Steuer variiert je nach Standort: Die deutsche MwSt. beträgt 19% (ermäßigt 7%), in anderen Ländern variiert sie stark",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Arten von Rabatten",
          "items": [
            {
              "text": "Prozentualer Rabatt: Die häufigste Art — eine feste prozentuale Reduzierung vom ursprünglichen Preis (z.B. 20% Rabatt)",
              "type": "info"
            },
            {
              "text": "Euro-Betrag Rabatt: Eine feste Euro-Ersparnis unabhängig vom Preis (z.B. 10€ Rabatt bei Einkäufen über 50€)",
              "type": "info"
            },
            {
              "text": "BOGO (Kaufe eins, erhalte eins): Erhalten Sie einen kostenlosen oder rabattierten zusätzlichen Artikel mit einem Kauf",
              "type": "info"
            },
            {
              "text": "Staffelrabatte: Größere Ersparnisse bei höheren Mengen (z.B. 10% ab 1, 15% ab 2, 20% ab 3+ Stück)",
              "type": "info"
            },
            {
              "text": "Cashback: Ein Prozentsatz Ihres Einkaufs wird Ihnen nach dem Kauf zurückgegeben, oft über Kreditkarte oder App",
              "type": "info"
            },
            {
              "text": "Saison-/Ausverkauf: Tiefe Rabatte zum Räumen alter Lagerbestände, oft 50-75% Rabatt während Saisonende-Verkäufen",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Rabatt-Beispiele",
          "description": "Häufige Rabattszenarien Schritt für Schritt",
          "examples": [
            {
              "title": "30% Rabatt auf ein 150€ Paar Schuhe",
              "steps": [
                "Ersparnis = 150€ × 30/100 = 45€",
                "Verkaufspreis = 150€ - 45€ = 105€"
              ],
              "result": "Sie zahlen 105€ und sparen 45€"
            },
            {
              "title": "80€ Artikel mit 40% Rabatt + 19% MwSt.",
              "steps": [
                "Ersparnis = 80€ × 40/100 = 32€",
                "Verkaufspreis = 80€ - 32€ = 48€",
                "Steuer = 48€ × 19/100 = 9,12€",
                "Endpreis = 48€ + 9,12€ = 57,12€"
              ],
              "result": "Endpreis 57,12€ (32€ gespart)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie berechne ich einen prozentualen Rabatt?",
          "answer": "Multiplizieren Sie den ursprünglichen Preis mit dem Rabattprozentsatz geteilt durch 100. Dann subtrahieren Sie das vom ursprünglichen Preis. Beispiel: 25% Rabatt auf 80€ = 80€ × 0,25 = 20€ Ersparnis, Sie zahlen also 60€."
        },
        {
          "question": "Wird die Steuer vor oder nach dem Rabatt berechnet?",
          "answer": "In Deutschland und den meisten anderen Ländern wird die Umsatzsteuer auf den rabattierten Preis berechnet (nachdem der Rabatt angewendet wurde), nicht auf den ursprünglichen Preis. Das bedeutet, Sie zahlen weniger Steuer auf rabattierte Artikel."
        },
        {
          "question": "Wie berechne ich den ursprünglichen Preis aus einem Verkaufspreis?",
          "answer": "Teilen Sie den Verkaufspreis durch (1 - Rabatt/100). Zum Beispiel, wenn etwas 60€ nach 25% Rabatt kostet: 60€ / (1 - 0,25) = 60€ / 0,75 = 80€ ursprünglicher Preis."
        },
        {
          "question": "Wie funktionieren gestapelte Rabatte?",
          "answer": "Stapeln bedeutet, mehrere Rabatte nacheinander anzuwenden. 20% Rabatt + 10% Rabatt entspricht nicht 30% Rabatt. Stattdessen: erst 20% anwenden (zahlen 80%), dann 10% vom neuen Preis (zahlen 72%). Gesamtrabatt ist 28%, nicht 30%."
        },
        {
          "question": "Was bedeutet 'bis zu X% Rabatt'?",
          "answer": "Es bedeutet, dass der maximale verfügbare Rabatt X% beträgt, aber die meisten Artikel möglicherweise kleinere Rabatte haben. Typischerweise erreichen nur wenige Artikel den beworbenen maximalen Rabattprozentsatz."
        },
        {
          "question": "Ist ein größerer Prozentrabatt immer das bessere Angebot?",
          "answer": "Nicht unbedingt. Ein teurerer Artikel mit 20% Rabatt könnte Ihnen mehr Euro sparen als ein günstigerer Artikel mit 40% Rabatt. Vergleichen Sie immer die tatsächlichen Euro-Ersparnisse und Endpreise zwischen den Optionen."
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
      id: "originalPrice",
      type: "number",
      defaultValue: null,
      placeholder: "99.99",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
    },
    {
      id: "discountPercent",
      type: "number",
      defaultValue: null,
      placeholder: "20",
      suffix: "%",
      min: 0,
      max: 100,
      step: 0.5,
    },
    {
      id: "taxRate",
      type: "number",
      defaultValue: 0,
      placeholder: "8.25",
      suffix: "%",
      min: 0,
      max: 30,
      step: 0.25,
    },
  ],

  inputGroups: [],

  results: [
    { id: "salePrice", type: "primary", format: "text" },
    { id: "youSave", type: "secondary", format: "text" },
    { id: "finalPrice", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "🏷️", itemCount: 4 },
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
      authors: "Federal Trade Commission",
      year: "2024",
      title: "Shopping and Saving: Understanding Discounts and Sales",
      source: "FTC",
      url: "https://consumer.ftc.gov/",
    },
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2024",
      title: "Understanding Pricing and Sales Tax",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/",
    },
  ],

  hero: { icon: "🏷️" },
  sidebar: {},
  features: {},
  relatedCalculators: ["percentage-calculator", "tip-calculator", "grade-calculator"],
  ads: {},
};

export function calculateDiscountCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const originalPrice = values.originalPrice as number | null;
  const discountPercent = values.discountPercent as number | null;
  const taxRate = (values.taxRate as number) || 0;

  if (originalPrice === null || originalPrice === undefined || discountPercent === null || discountPercent === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Currency symbol
  const curr = fieldUnits?.originalPrice || "USD";
  const SYMBOLS: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
    JPY: "¥", INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF ",
    COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  };
  const sym = SYMBOLS[curr] || "$";

  const savings = originalPrice * (discountPercent / 100);
  const salePrice = originalPrice - savings;
  const taxAmount = salePrice * (taxRate / 100);
  const finalPrice = salePrice + taxAmount;

  // Quick reference
  const ref10 = originalPrice * 0.9;
  const ref25 = originalPrice * 0.75;
  const ref50 = originalPrice * 0.5;
  const ref75 = originalPrice * 0.25;

  // Chart data - discount breakdown
  const chartData = [
    { label: "You Pay", value: salePrice, savings: 0 },
    { label: "You Save", value: 0, savings: savings },
  ];

  const fmtPrice = (n: number) => `${sym}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return {
    values: {
      salePrice,
      youSave: savings,
      finalPrice,
      originalPrice,
      taxAmount,
      ref10,
      ref25,
      ref50,
      ref75,
    },
    formatted: {
      salePrice: fmtPrice(salePrice),
      youSave: `${fmtPrice(savings)} (${discountPercent}${v["%"] || "%"} ${v["off"] || "off"})`,
      finalPrice: taxRate > 0 ? `${fmtPrice(finalPrice)} (incl. ${fmtPrice(taxAmount)} ${v["tax"] || "tax"})` : fmtPrice(salePrice),
      originalPrice: fmtPrice(originalPrice),
      ref10: fmtPrice(ref10),
      ref25: fmtPrice(ref25),
      ref50: fmtPrice(ref50),
      ref75: fmtPrice(ref75),
    },
    summary:
      f.summary
        ?.replace("{saved}", fmtPrice(savings))
        .replace("{percent}", String(discountPercent))
        .replace("{salePrice}", fmtPrice(salePrice)) ||
      `You save ${fmtPrice(savings)} (${discountPercent}% off). Sale price: ${fmtPrice(salePrice)}`,
    isValid: true,
    metadata: {
      chartData,
    },
  };
}

export default discountCalculatorConfig;
