import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ============================================================================
// CURRENCY CONVERTER - V4 (EN ONLY)
// ============================================================================

export const currencyConverterConfig: CalculatorConfigV4 = {
  id: "currency-converter",
  version: "4.0",
  category: "conversion",
  icon: "💱",

  presets: [
    { id: "hundred", icon: "💵", values: { amount: 100 } },
    { id: "thousand", icon: "💰", values: { amount: 1000 } },
    { id: "tenK", icon: "🏦", values: { amount: 10000 } },
  ],

  t: {
    en: {
      name: "Currency Converter",
      slug: "currency-converter",
      subtitle: "Convert between 45+ world currencies using mid-market exchange rates.",
      breadcrumb: "Currency",

      seo: {
        title: "Currency Converter - Free Exchange Rate Calculator",
        description: "Convert between 45+ world currencies instantly. See mid-market exchange rates for USD, EUR, GBP, MXN, BRL, JPY, and more with our free converter.",
        shortDescription: "Convert between world currencies instantly.",
        keywords: [
          "currency converter",
          "exchange rate calculator",
          "usd to eur",
          "convert currency",
          "money converter",
          "free currency calculator",
          "forex calculator",
          "dollar to euro",
        ],
      },

      calculator: { yourInformation: "Currency Conversion" },
      ui: {
        yourInformation: "Currency Conversion",
        calculate: "Convert",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        amount: {
          label: "Amount",
          helpText: "Enter amount to convert",
        },
        toCurrency: {
          label: "Convert To",
          helpText: "Target currency",
          options: {
            USD: "US Dollar (USD)",
            EUR: "Euro (EUR)",
            GBP: "British Pound (GBP)",
            JPY: "Japanese Yen (JPY)",
            CAD: "Canadian Dollar (CAD)",
            AUD: "Australian Dollar (AUD)",
            CHF: "Swiss Franc (CHF)",
            MXN: "Mexican Peso (MXN)",
            BRL: "Brazilian Real (BRL)",
            INR: "Indian Rupee (INR)",
            COP: "Colombian Peso (COP)",
            ARS: "Argentine Peso (ARS)",
            PEN: "Peruvian Sol (PEN)",
            CLP: "Chilean Peso (CLP)",
          },
        },
      },

      results: {
        converted: { label: "Converted Amount" },
        rate: { label: "Exchange Rate" },
        inverse: { label: "Inverse Rate" },
      },

      presets: {
        hundred: { label: "$100", description: "Quick 100 unit conversion" },
        thousand: { label: "$1,000", description: "One thousand units" },
        tenK: { label: "$10,000", description: "Ten thousand units" },
      },

      values: {},

      formats: {
        summary: "{amount} {from} = {converted} {to}",
      },

      infoCards: {
        results: {
          title: "💱 Conversion Results",
          items: [
            { label: "Converted Amount", valueKey: "converted" },
            { label: "Exchange Rate", valueKey: "rate" },
            { label: "Inverse Rate", valueKey: "inverse" },
            { label: "Last Updated", valueKey: "lastUpdated" },
          ],
        },
        popular: {
          title: "📊 Popular Rates",
          items: [
            { label: "1 USD → EUR", valueKey: "usdEur" },
            { label: "1 USD → GBP", valueKey: "usdGbp" },
            { label: "1 USD → JPY", valueKey: "usdJpy" },
            { label: "1 USD → MXN", valueKey: "usdMxn" },
          ],
        },
        tips: {
          title: "💡 Currency Tips",
          items: [
            "Mid-market rates shown here — banks and services add a markup of 1-5% on top.",
            "Exchange rates fluctuate constantly based on economic conditions, interest rates, and market sentiment.",
            "For large transfers, compare services like Wise, Revolut, or OFX to get the best rates.",
            "Some currencies like JPY and KRW don't use decimals — 1 USD ≈ 150 JPY is normal.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "Understanding Exchange Rates",
          content: "An exchange rate tells you how much one currency is worth in terms of another. The mid-market rate (also called the interbank rate) is the midpoint between buy and sell prices on the global currency market. This is the 'real' exchange rate that banks use between themselves. When you exchange money at a bank, airport kiosk, or online service, they add a margin (markup) to this rate — typically 1-5% for online services and 5-12% for airport exchanges. Always compare the rate you're offered to the mid-market rate to know how much you're paying in hidden fees.",
        },
        howItWorks: {
          title: "How Currency Conversion Works",
          content: "Currency values are determined by supply and demand in the foreign exchange (forex) market — the world's largest financial market with over $7 trillion traded daily. Factors that affect exchange rates include interest rates set by central banks, inflation rates, political stability, trade balances, and economic performance. When a country raises interest rates, its currency typically strengthens because investors seek higher returns. Conversely, high inflation or political instability can weaken a currency. Exchange rates can be fixed (pegged to another currency), floating (determined by market forces), or managed (floating with central bank intervention).",
        },
        considerations: {
          title: "Things to Know About Currency Exchange",
          items: [
            { text: "The rates shown are mid-market reference rates — actual exchange rates from banks and services will differ", type: "warning" },
            { text: "Exchange rates change constantly during trading hours (Sunday 5pm - Friday 5pm ET)", type: "info" },
            { text: "Some countries have capital controls that restrict currency conversion amounts", type: "warning" },
            { text: "Credit cards often offer competitive exchange rates with a 1-3% foreign transaction fee", type: "info" },
            { text: "For travel, notify your bank before going abroad to avoid card blocks", type: "info" },
            { text: "Cryptocurrency exchanges offer another option but with their own volatility risks", type: "info" },
          ],
        },
        majorCurrencies: {
          title: "Major World Currencies",
          items: [
            { text: "USD (US Dollar) — World's primary reserve currency, used in ~88% of all forex transactions", type: "info" },
            { text: "EUR (Euro) — Second most traded currency, used by 20 EU countries with 340+ million people", type: "info" },
            { text: "JPY (Japanese Yen) — Third most traded, known as a 'safe haven' currency in times of uncertainty", type: "info" },
            { text: "GBP (British Pound) — One of the oldest currencies still in use, fourth most traded globally", type: "info" },
            { text: "CNY (Chinese Yuan) — Growing in international trade, partially managed by China's central bank", type: "info" },
            { text: "MXN (Mexican Peso) — Most traded Latin American currency, heavily influenced by US economy", type: "info" },
          ],
        },
        examples: {
          title: "Currency Conversion Examples",
          description: "Step-by-step conversion calculations",
          examples: [
            {
              title: "USD to EUR Conversion",
              steps: [
                "Amount: $1,000 USD",
                "Exchange rate: 1 USD = 0.92 EUR",
                "Calculation: 1,000 × 0.92 = €920",
                "Bank adds 2% markup: 0.92 × 0.98 = 0.9016",
                "You receive: 1,000 × 0.9016 = €901.60",
                "Hidden fee: €920 - €901.60 = €18.40",
              ],
              result: "You receive €901.60 (bank keeps €18.40 in markup)",
            },
            {
              title: "EUR to MXN Conversion",
              steps: [
                "Amount: €500 EUR",
                "EUR/USD rate: 1.087",
                "USD/MXN rate: 17.15",
                "EUR → USD: 500 × 1.087 = $543.50",
                "USD → MXN: 543.50 × 17.15 = MX$9,321",
                "Direct: 500 × 18.64 = MX$9,321",
              ],
              result: "€500 = approximately MX$9,321",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is the mid-market exchange rate?",
          answer: "The mid-market rate is the midpoint between the buy and sell prices of two currencies on the global market. It's considered the 'real' exchange rate. Banks, airports, and money transfer services add their margin on top of this rate. The difference between what you pay and the mid-market rate is essentially a hidden fee.",
        },
        {
          question: "Why is my bank's exchange rate different?",
          answer: "Banks add a markup (spread) to the mid-market rate to make a profit. This markup typically ranges from 1-5% for online banking and wire transfers, 3-8% for in-branch exchanges, and 5-12% for airport kiosks. Online services like Wise or Revolut typically offer rates closer to the mid-market rate with transparent fees.",
        },
        {
          question: "When is the best time to exchange currency?",
          answer: "Exchange rates fluctuate throughout the day based on market conditions. Generally, rates tend to be most competitive during overlapping trading hours (8am-12pm ET when both European and US markets are open). However, predicting rate movements is extremely difficult — even professional traders can't consistently time the market. For most people, the best strategy is to compare services and find the lowest total cost rather than trying to time the rate.",
        },
        {
          question: "How often do exchange rates change?",
          answer: "For major currency pairs (EUR/USD, GBP/USD, USD/JPY), rates change multiple times per second during trading hours. The forex market operates 24 hours a day, 5 days a week (Sunday 5pm ET to Friday 5pm ET). Weekends and holidays have no trading, so rates stay fixed until markets reopen. Our converter uses reference rates that are updated periodically.",
        },
        {
          question: "What are the most traded currencies in the world?",
          answer: "The top 5 most traded currencies by daily volume are: US Dollar (USD) — involved in 88% of all trades; Euro (EUR) — 31%; Japanese Yen (JPY) — 17%; British Pound (GBP) — 13%; and Chinese Yuan (CNY) — 7%. The USD/EUR pair is the single most traded currency pair, accounting for about 23% of all forex transactions.",
        },
        {
          question: "Is it better to exchange money before or during travel?",
          answer: "Generally, exchanging a small amount before your trip for immediate expenses (taxi, tips) is wise, but use a credit card with no foreign transaction fees for most purchases abroad. ATMs in your destination country often offer better rates than airport exchanges. Avoid exchanging large amounts at airports or hotels — their rates are typically the worst. Compare online services for larger transfers.",
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
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Conversor de Divisas",
      "slug": "calculadora-conversor-divisas",
      "subtitle": "Convierte entre más de 45 monedas mundiales usando tasas de cambio del mercado medio.",
      "breadcrumb": "Divisas",
      "seo": {
        "title": "Conversor de Divisas - Calculadora Gratuita de Tipos de Cambio",
        "description": "Convierte entre más de 45 monedas mundiales al instante. Ve las tasas de cambio del mercado medio para USD, EUR, GBP, MXN, BRL, JPY y más con nuestro conversor gratuito.",
        "shortDescription": "Convierte entre monedas mundiales al instante.",
        "keywords": [
          "conversor de divisas",
          "calculadora tipo de cambio",
          "usd a eur",
          "convertir moneda",
          "conversor de dinero",
          "calculadora divisas gratis",
          "calculadora forex",
          "dólar a euro"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "amount": {
          "label": "Cantidad",
          "helpText": "Ingresa la cantidad a convertir"
        },
        "toCurrency": {
          "label": "Convertir A",
          "helpText": "Moneda de destino",
          "options": {
            "USD": "Dólar Estadounidense (USD)",
            "EUR": "Euro (EUR)",
            "GBP": "Libra Esterlina (GBP)",
            "JPY": "Yen Japonés (JPY)",
            "CAD": "Dólar Canadiense (CAD)",
            "AUD": "Dólar Australiano (AUD)",
            "CHF": "Franco Suizo (CHF)",
            "MXN": "Peso Mexicano (MXN)",
            "BRL": "Real Brasileño (BRL)",
            "INR": "Rupia India (INR)",
            "COP": "Peso Colombiano (COP)",
            "ARS": "Peso Argentino (ARS)",
            "PEN": "Sol Peruano (PEN)",
            "CLP": "Peso Chileno (CLP)"
          }
        }
      },
      "results": {
        "converted": {
          "label": "Cantidad Convertida"
        },
        "rate": {
          "label": "Tipo de Cambio"
        },
        "inverse": {
          "label": "Tipo Inverso"
        }
      },
      "presets": {
        "hundred": {
          "label": "$100",
          "description": "Conversión rápida de 100 unidades"
        },
        "thousand": {
          "label": "$1,000",
          "description": "Mil unidades"
        },
        "tenK": {
          "label": "$10,000",
          "description": "Diez mil unidades"
        }
      },
      "values": {},
      "formats": {
        "summary": "{amount} {from} = {converted} {to}"
      },
      "infoCards": {
        "results": {
          "title": "💱 Resultados de Conversión",
          "items": [
            {
              "label": "Cantidad Convertida",
              "valueKey": "converted"
            },
            {
              "label": "Tipo de Cambio",
              "valueKey": "rate"
            },
            {
              "label": "Tipo Inverso",
              "valueKey": "inverse"
            },
            {
              "label": "Última Actualización",
              "valueKey": "lastUpdated"
            }
          ]
        },
        "popular": {
          "title": "📊 Tipos Populares",
          "items": [
            {
              "label": "1 USD → EUR",
              "valueKey": "usdEur"
            },
            {
              "label": "1 USD → GBP",
              "valueKey": "usdGbp"
            },
            {
              "label": "1 USD → JPY",
              "valueKey": "usdJpy"
            },
            {
              "label": "1 USD → MXN",
              "valueKey": "usdMxn"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Divisas",
          "items": [
            "Las tasas del mercado medio que se muestran aquí — los bancos y servicios añaden un margen del 1-5% adicional.",
            "Los tipos de cambio fluctúan constantemente según las condiciones económicas, tasas de interés y sentimiento del mercado.",
            "Para transferencias grandes, compara servicios como Wise, Revolut o OFX para obtener las mejores tasas.",
            "Algunas monedas como JPY y KRW no usan decimales — 1 USD ≈ 150 JPY es normal."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Entendiendo los Tipos de Cambio",
          "content": "Un tipo de cambio te dice cuánto vale una moneda en términos de otra. La tasa del mercado medio (también llamada tasa interbancaria) es el punto medio entre los precios de compra y venta en el mercado mundial de divisas. Esta es la tasa de cambio 'real' que usan los bancos entre ellos. Cuando cambias dinero en un banco, quiosco de aeropuerto o servicio en línea, añaden un margen (sobreprecio) a esta tasa — típicamente 1-5% para servicios en línea y 5-12% para cambios de aeropuerto. Siempre compara la tasa que te ofrecen con la tasa del mercado medio para saber cuánto estás pagando en comisiones ocultas."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Conversión de Divisas",
          "content": "Los valores de las monedas se determinan por la oferta y demanda en el mercado de divisas (forex) — el mercado financiero más grande del mundo con más de $7 billones negociados diariamente. Los factores que afectan los tipos de cambio incluyen las tasas de interés establecidas por los bancos centrales, tasas de inflación, estabilidad política, balanzas comerciales y desempeño económico. Cuando un país aumenta las tasas de interés, su moneda típicamente se fortalece porque los inversores buscan mayores rendimientos. Por el contrario, alta inflación o inestabilidad política pueden debilitar una moneda. Los tipos de cambio pueden ser fijos (vinculados a otra moneda), flotantes (determinados por fuerzas del mercado) o administrados (flotantes con intervención del banco central)."
        },
        "considerations": {
          "title": "Cosas que Debes Saber sobre el Cambio de Divisas",
          "items": [
            {
              "text": "Las tasas mostradas son tasas de referencia del mercado medio — las tasas reales de bancos y servicios diferirán",
              "type": "warning"
            },
            {
              "text": "Los tipos de cambio cambian constantemente durante horas de negociación (domingo 5pm - viernes 5pm ET)",
              "type": "info"
            },
            {
              "text": "Algunos países tienen controles de capital que restringen las cantidades de conversión de moneda",
              "type": "warning"
            },
            {
              "text": "Las tarjetas de crédito a menudo ofrecen tipos de cambio competitivos con una comisión por transacción extranjera del 1-3%",
              "type": "info"
            },
            {
              "text": "Para viajes, notifica a tu banco antes de ir al extranjero para evitar bloqueos de tarjeta",
              "type": "info"
            },
            {
              "text": "Los intercambios de criptomonedas ofrecen otra opción pero con sus propios riesgos de volatilidad",
              "type": "info"
            }
          ]
        },
        "majorCurrencies": {
          "title": "Principales Monedas Mundiales",
          "items": [
            {
              "text": "USD (Dólar Estadounidense) — Principal moneda de reserva mundial, usada en ~88% de todas las transacciones forex",
              "type": "info"
            },
            {
              "text": "EUR (Euro) — Segunda moneda más negociada, usada por 20 países de la UE con más de 340 millones de personas",
              "type": "info"
            },
            {
              "text": "JPY (Yen Japonés) — Tercera más negociada, conocida como moneda de 'refugio seguro' en tiempos de incertidumbre",
              "type": "info"
            },
            {
              "text": "GBP (Libra Esterlina) — Una de las monedas más antiguas aún en uso, cuarta más negociada globalmente",
              "type": "info"
            },
            {
              "text": "CNY (Yuan Chino) — Creciendo en el comercio internacional, parcialmente administrada por el banco central de China",
              "type": "info"
            },
            {
              "text": "MXN (Peso Mexicano) — Moneda latinoamericana más negociada, fuertemente influenciada por la economía estadounidense",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Conversión de Divisas",
          "description": "Cálculos de conversión paso a paso",
          "examples": [
            {
              "title": "Conversión USD a EUR",
              "steps": [
                "Cantidad: $1,000 USD",
                "Tipo de cambio: 1 USD = 0.92 EUR",
                "Cálculo: 1,000 × 0.92 = €920",
                "El banco añade 2% de margen: 0.92 × 0.98 = 0.9016",
                "Recibes: 1,000 × 0.9016 = €901.60",
                "Comisión oculta: €920 - €901.60 = €18.40"
              ],
              "result": "Recibes €901.60 (el banco se queda con €18.40 de margen)"
            },
            {
              "title": "Conversión EUR a MXN",
              "steps": [
                "Cantidad: €500 EUR",
                "Tipo EUR/USD: 1.087",
                "Tipo USD/MXN: 17.15",
                "EUR → USD: 500 × 1.087 = $543.50",
                "USD → MXN: 543.50 × 17.15 = MX$9,321",
                "Directo: 500 × 18.64 = MX$9,321"
              ],
              "result": "€500 = aproximadamente MX$9,321"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué es la tasa de cambio del mercado medio?",
          "answer": "La tasa del mercado medio es el punto medio entre los precios de compra y venta de dos monedas en el mercado global. Se considera la tasa de cambio 'real'. Los bancos, aeropuertos y servicios de transferencia de dinero añaden su margen sobre esta tasa. La diferencia entre lo que pagas y la tasa del mercado medio es esencialmente una comisión oculta."
        },
        {
          "question": "¿Por qué la tasa de cambio de mi banco es diferente?",
          "answer": "Los bancos añaden un margen (diferencial) a la tasa del mercado medio para obtener ganancias. Este margen típicamente varía del 1-5% para banca en línea y transferencias bancarias, 3-8% para cambios en sucursal, y 5-12% para quioscos de aeropuerto. Los servicios en línea como Wise o Revolut típicamente ofrecen tasas más cercanas a la tasa del mercado medio con comisiones transparentes."
        },
        {
          "question": "¿Cuándo es el mejor momento para cambiar divisas?",
          "answer": "Los tipos de cambio fluctúan durante el día según las condiciones del mercado. Generalmente, las tasas tienden a ser más competitivas durante horas de negociación superpuestas (8am-12pm ET cuando tanto los mercados europeos como estadounidenses están abiertos). Sin embargo, predecir movimientos de tasas es extremadamente difícil — incluso los comerciantes profesionales no pueden cronometrar el mercado consistentemente. Para la mayoría de personas, la mejor estrategia es comparar servicios y encontrar el costo total más bajo en lugar de intentar cronometrar la tasa."
        },
        {
          "question": "¿Con qué frecuencia cambian los tipos de cambio?",
          "answer": "Para los pares de divisas principales (EUR/USD, GBP/USD, USD/JPY), las tasas cambian múltiples veces por segundo durante horas de negociación. El mercado forex opera 24 horas al día, 5 días a la semana (domingo 5pm ET hasta viernes 5pm ET). Los fines de semana y feriados no hay negociación, así que las tasas permanecen fijas hasta que los mercados reabren. Nuestro conversor usa tasas de referencia que se actualizan periódicamente."
        },
        {
          "question": "¿Cuáles son las monedas más negociadas del mundo?",
          "answer": "Las 5 monedas más negociadas por volumen diario son: Dólar Estadounidense (USD) — involucrado en 88% de todas las operaciones; Euro (EUR) — 31%; Yen Japonés (JPY) — 17%; Libra Esterlina (GBP) — 13%; y Yuan Chino (CNY) — 7%. El par USD/EUR es el par de divisas más negociado individualmente, representando cerca del 23% de todas las transacciones forex."
        },
        {
          "question": "¿Es mejor cambiar dinero antes o durante el viaje?",
          "answer": "Generalmente, cambiar una pequeña cantidad antes de tu viaje para gastos inmediatos (taxi, propinas) es prudente, pero usa una tarjeta de crédito sin comisiones por transacciones extranjeras para la mayoría de compras en el extranjero. Los cajeros automáticos en tu país de destino a menudo ofrecen mejores tasas que los cambios de aeropuerto. Evita cambiar grandes cantidades en aeropuertos u hoteles — sus tasas son típicamente las peores. Compara servicios en línea para transferencias mayores."
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
      "name": "Conversor de Moedas",
      "slug": "calculadora-conversor-moedas",
      "subtitle": "Converta entre mais de 45 moedas mundiais usando taxas de câmbio do mercado médio.",
      "breadcrumb": "Moeda",
      "seo": {
        "title": "Conversor de Moedas - Calculadora Gratuita de Taxa de Câmbio",
        "description": "Converta entre mais de 45 moedas mundiais instantaneamente. Veja taxas de câmbio do mercado médio para USD, EUR, GBP, MXN, BRL, JPY e mais com nosso conversor gratuito.",
        "shortDescription": "Converta entre moedas mundiais instantaneamente.",
        "keywords": [
          "conversor de moedas",
          "calculadora taxa de câmbio",
          "usd para eur",
          "converter moeda",
          "conversor de dinheiro",
          "calculadora de moeda gratuita",
          "calculadora forex",
          "dólar para euro"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "amount": {
          "label": "Valor",
          "helpText": "Digite o valor a ser convertido"
        },
        "toCurrency": {
          "label": "Converter Para",
          "helpText": "Moeda de destino",
          "options": {
            "USD": "Dólar Americano (USD)",
            "EUR": "Euro (EUR)",
            "GBP": "Libra Esterlina (GBP)",
            "JPY": "Iene Japonês (JPY)",
            "CAD": "Dólar Canadense (CAD)",
            "AUD": "Dólar Australiano (AUD)",
            "CHF": "Franco Suíço (CHF)",
            "MXN": "Peso Mexicano (MXN)",
            "BRL": "Real Brasileiro (BRL)",
            "INR": "Rupia Indiana (INR)",
            "COP": "Peso Colombiano (COP)",
            "ARS": "Peso Argentino (ARS)",
            "PEN": "Sol Peruano (PEN)",
            "CLP": "Peso Chileno (CLP)"
          }
        }
      },
      "results": {
        "converted": {
          "label": "Valor Convertido"
        },
        "rate": {
          "label": "Taxa de Câmbio"
        },
        "inverse": {
          "label": "Taxa Inversa"
        }
      },
      "presets": {
        "hundred": {
          "label": "$100",
          "description": "Conversão rápida de 100 unidades"
        },
        "thousand": {
          "label": "$1.000",
          "description": "Mil unidades"
        },
        "tenK": {
          "label": "$10.000",
          "description": "Dez mil unidades"
        }
      },
      "values": {},
      "formats": {
        "summary": "{amount} {from} = {converted} {to}"
      },
      "infoCards": {
        "results": {
          "title": "💱 Resultados da Conversão",
          "items": [
            {
              "label": "Valor Convertido",
              "valueKey": "converted"
            },
            {
              "label": "Taxa de Câmbio",
              "valueKey": "rate"
            },
            {
              "label": "Taxa Inversa",
              "valueKey": "inverse"
            },
            {
              "label": "Última Atualização",
              "valueKey": "lastUpdated"
            }
          ]
        },
        "popular": {
          "title": "📊 Taxas Populares",
          "items": [
            {
              "label": "1 USD → EUR",
              "valueKey": "usdEur"
            },
            {
              "label": "1 USD → GBP",
              "valueKey": "usdGbp"
            },
            {
              "label": "1 USD → JPY",
              "valueKey": "usdJpy"
            },
            {
              "label": "1 USD → MXN",
              "valueKey": "usdMxn"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Moeda",
          "items": [
            "As taxas do mercado médio mostradas aqui — bancos e serviços adicionam uma margem de 1-5% por cima.",
            "As taxas de câmbio flutuam constantemente baseadas em condições econômicas, taxas de juros e sentimento do mercado.",
            "Para transferências grandes, compare serviços como Wise, Revolut ou OFX para obter as melhores taxas.",
            "Algumas moedas como JPY e KRW não usam decimais — 1 USD ≈ 150 JPY é normal."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Entendendo as Taxas de Câmbio",
          "content": "Uma taxa de câmbio informa quanto uma moeda vale em termos de outra. A taxa do mercado médio (também chamada de taxa interbancária) é o ponto médio entre os preços de compra e venda no mercado global de moedas. Esta é a taxa de câmbio 'real' que os bancos usam entre si. Quando você troca dinheiro em um banco, quiosque de aeroporto ou serviço online, eles adicionam uma margem (markup) a esta taxa — tipicamente 1-5% para serviços online e 5-12% para câmbios de aeroporto. Sempre compare a taxa oferecida com a taxa do mercado médio para saber quanto está pagando em taxas ocultas."
        },
        "howItWorks": {
          "title": "Como Funciona a Conversão de Moedas",
          "content": "Os valores das moedas são determinados pela oferta e demanda no mercado de câmbio (forex) — o maior mercado financeiro do mundo com mais de US$ 7 trilhões negociados diariamente. Fatores que afetam as taxas de câmbio incluem taxas de juros definidas pelos bancos centrais, taxas de inflação, estabilidade política, balanças comerciais e desempenho econômico. Quando um país aumenta as taxas de juros, sua moeda tipicamente se fortalece porque os investidores buscam retornos maiores. Por outro lado, alta inflação ou instabilidade política podem enfraquecer uma moeda. As taxas de câmbio podem ser fixas (atreladas a outra moeda), flutuantes (determinadas pelas forças do mercado) ou administradas (flutuantes com intervenção do banco central)."
        },
        "considerations": {
          "title": "Coisas a Saber Sobre Câmbio de Moedas",
          "items": [
            {
              "text": "As taxas mostradas são taxas de referência do mercado médio — taxas reais de bancos e serviços serão diferentes",
              "type": "warning"
            },
            {
              "text": "Taxas de câmbio mudam constantemente durante o horário de negociação (domingo 17h - sexta 17h ET)",
              "type": "info"
            },
            {
              "text": "Alguns países têm controles de capital que restringem valores de conversão de moeda",
              "type": "warning"
            },
            {
              "text": "Cartões de crédito frequentemente oferecem taxas competitivas com uma taxa de transação internacional de 1-3%",
              "type": "info"
            },
            {
              "text": "Para viagens, notifique seu banco antes de ir ao exterior para evitar bloqueios do cartão",
              "type": "info"
            },
            {
              "text": "Exchanges de criptomoedas oferecem outra opção mas com seus próprios riscos de volatilidade",
              "type": "info"
            }
          ]
        },
        "majorCurrencies": {
          "title": "Principais Moedas Mundiais",
          "items": [
            {
              "text": "USD (Dólar Americano) — Principal moeda de reserva mundial, usada em ~88% de todas as transações forex",
              "type": "info"
            },
            {
              "text": "EUR (Euro) — Segunda moeda mais negociada, usada por 20 países da UE com mais de 340 milhões de pessoas",
              "type": "info"
            },
            {
              "text": "JPY (Iene Japonês) — Terceira mais negociada, conhecida como moeda 'porto seguro' em tempos de incerteza",
              "type": "info"
            },
            {
              "text": "GBP (Libra Esterlina) — Uma das moedas mais antigas ainda em uso, quarta mais negociada globalmente",
              "type": "info"
            },
            {
              "text": "CNY (Yuan Chinês) — Crescendo no comércio internacional, parcialmente administrada pelo banco central da China",
              "type": "info"
            },
            {
              "text": "MXN (Peso Mexicano) — Moeda latino-americana mais negociada, fortemente influenciada pela economia americana",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Conversão de Moedas",
          "description": "Cálculos de conversão passo a passo",
          "examples": [
            {
              "title": "Conversão USD para EUR",
              "steps": [
                "Valor: $1.000 USD",
                "Taxa de câmbio: 1 USD = 0,92 EUR",
                "Cálculo: 1.000 × 0,92 = €920",
                "Banco adiciona 2% de margem: 0,92 × 0,98 = 0,9016",
                "Você recebe: 1.000 × 0,9016 = €901,60",
                "Taxa oculta: €920 - €901,60 = €18,40"
              ],
              "result": "Você recebe €901,60 (banco fica com €18,40 de margem)"
            },
            {
              "title": "Conversão EUR para MXN",
              "steps": [
                "Valor: €500 EUR",
                "Taxa EUR/USD: 1,087",
                "Taxa USD/MXN: 17,15",
                "EUR → USD: 500 × 1,087 = $543,50",
                "USD → MXN: 543,50 × 17,15 = MX$9.321",
                "Direto: 500 × 18,64 = MX$9.321"
              ],
              "result": "€500 = aproximadamente MX$9.321"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "O que é a taxa de câmbio do mercado médio?",
          "answer": "A taxa do mercado médio é o ponto médio entre os preços de compra e venda de duas moedas no mercado global. É considerada a taxa de câmbio 'real'. Bancos, aeroportos e serviços de transferência de dinheiro adicionam sua margem sobre esta taxa. A diferença entre o que você paga e a taxa do mercado médio é essencialmente uma taxa oculta."
        },
        {
          "question": "Por que a taxa de câmbio do meu banco é diferente?",
          "answer": "Os bancos adicionam uma margem (spread) à taxa do mercado médio para obter lucro. Esta margem tipicamente varia de 1-5% para internet banking e transferências, 3-8% para câmbios na agência, e 5-12% para quiosques de aeroporto. Serviços online como Wise ou Revolut tipicamente oferecem taxas mais próximas da taxa do mercado médio com taxas transparentes."
        },
        {
          "question": "Qual é o melhor momento para trocar moeda?",
          "answer": "As taxas de câmbio flutuam ao longo do dia baseadas nas condições do mercado. Geralmente, as taxas tendem a ser mais competitivas durante horários de negociação sobrepostos (8h-12h ET quando mercados europeus e americanos estão abertos). Porém, prever movimentos de taxa é extremamente difícil — até traders profissionais não conseguem cronometrar o mercado consistentemente. Para a maioria das pessoas, a melhor estratégia é comparar serviços e encontrar o menor custo total ao invés de tentar cronometrar a taxa."
        },
        {
          "question": "Com que frequência as taxas de câmbio mudam?",
          "answer": "Para pares de moedas principais (EUR/USD, GBP/USD, USD/JPY), as taxas mudam múltiplas vezes por segundo durante o horário de negociação. O mercado forex opera 24 horas por dia, 5 dias por semana (domingo 17h ET até sexta 17h ET). Fins de semana e feriados não têm negociação, então as taxas ficam fixas até os mercados reabrirem. Nosso conversor usa taxas de referência que são atualizadas periodicamente."
        },
        {
          "question": "Quais são as moedas mais negociadas no mundo?",
          "answer": "As 5 moedas mais negociadas por volume diário são: Dólar Americano (USD) — envolvido em 88% de todas as negociações; Euro (EUR) — 31%; Iene Japonês (JPY) — 17%; Libra Esterlina (GBP) — 13%; e Yuan Chinês (CNY) — 7%. O par USD/EUR é o par de moedas mais negociado individualmente, representando cerca de 23% de todas as transações forex."
        },
        {
          "question": "É melhor trocar dinheiro antes ou durante a viagem?",
          "answer": "Geralmente, trocar uma pequena quantia antes da viagem para despesas imediatas (táxi, gorjetas) é sensato, mas use um cartão de crédito sem taxa de transação internacional para a maioria das compras no exterior. Caixas eletrônicos no país de destino frequentemente oferecem melhores taxas que câmbios de aeroporto. Evite trocar grandes quantias em aeroportos ou hotéis — suas taxas são tipicamente as piores. Compare serviços online para transferências maiores."
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
      "name": "Convertisseur de Devises",
      "slug": "calculateur-convertisseur-devises",
      "subtitle": "Convertissez entre plus de 45 devises mondiales en utilisant les taux de change du marché intermédiaire.",
      "breadcrumb": "Devises",
      "seo": {
        "title": "Convertisseur de Devises - Calculateur de Taux de Change Gratuit",
        "description": "Convertissez instantanément entre plus de 45 devises mondiales. Consultez les taux de change du marché intermédiaire pour USD, EUR, GBP, MXN, BRL, JPY, et plus avec notre convertisseur gratuit.",
        "shortDescription": "Convertissez instantanément entre les devises mondiales.",
        "keywords": [
          "convertisseur de devises",
          "calculateur taux de change",
          "usd vers eur",
          "convertir devise",
          "convertisseur argent",
          "calculateur devise gratuit",
          "calculateur forex",
          "dollar vers euro"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "amount": {
          "label": "Montant",
          "helpText": "Saisissez le montant à convertir"
        },
        "toCurrency": {
          "label": "Convertir vers",
          "helpText": "Devise de destination",
          "options": {
            "USD": "Dollar Américain (USD)",
            "EUR": "Euro (EUR)",
            "GBP": "Livre Sterling (GBP)",
            "JPY": "Yen Japonais (JPY)",
            "CAD": "Dollar Canadien (CAD)",
            "AUD": "Dollar Australien (AUD)",
            "CHF": "Franc Suisse (CHF)",
            "MXN": "Peso Mexicain (MXN)",
            "BRL": "Réal Brésilien (BRL)",
            "INR": "Roupie Indienne (INR)",
            "COP": "Peso Colombien (COP)",
            "ARS": "Peso Argentin (ARS)",
            "PEN": "Sol Péruvien (PEN)",
            "CLP": "Peso Chilien (CLP)"
          }
        }
      },
      "results": {
        "converted": {
          "label": "Montant Converti"
        },
        "rate": {
          "label": "Taux de Change"
        },
        "inverse": {
          "label": "Taux Inverse"
        }
      },
      "presets": {
        "hundred": {
          "label": "100 $",
          "description": "Conversion rapide de 100 unités"
        },
        "thousand": {
          "label": "1 000 $",
          "description": "Mille unités"
        },
        "tenK": {
          "label": "10 000 $",
          "description": "Dix mille unités"
        }
      },
      "values": {},
      "formats": {
        "summary": "{amount} {from} = {converted} {to}"
      },
      "infoCards": {
        "results": {
          "title": "💱 Résultats de Conversion",
          "items": [
            {
              "label": "Montant Converti",
              "valueKey": "converted"
            },
            {
              "label": "Taux de Change",
              "valueKey": "rate"
            },
            {
              "label": "Taux Inverse",
              "valueKey": "inverse"
            },
            {
              "label": "Dernière Mise à Jour",
              "valueKey": "lastUpdated"
            }
          ]
        },
        "popular": {
          "title": "📊 Taux Populaires",
          "items": [
            {
              "label": "1 USD → EUR",
              "valueKey": "usdEur"
            },
            {
              "label": "1 USD → GBP",
              "valueKey": "usdGbp"
            },
            {
              "label": "1 USD → JPY",
              "valueKey": "usdJpy"
            },
            {
              "label": "1 USD → MXN",
              "valueKey": "usdMxn"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils Devises",
          "items": [
            "Les taux du marché intermédiaire sont affichés ici — les banques et services ajoutent une marge de 1-5% en plus.",
            "Les taux de change fluctuent constamment selon les conditions économiques, les taux d'intérêt et le sentiment du marché.",
            "Pour les gros transferts, comparez les services comme Wise, Revolut, ou OFX pour obtenir les meilleurs taux.",
            "Certaines devises comme le JPY et KRW n'utilisent pas de décimales — 1 USD ≈ 150 JPY est normal."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comprendre les Taux de Change",
          "content": "Un taux de change vous indique la valeur d'une devise par rapport à une autre. Le taux du marché intermédiaire (aussi appelé taux interbancaire) est le point médian entre les prix d'achat et de vente sur le marché mondial des devises. C'est le taux de change 'réel' que les banques utilisent entre elles. Quand vous échangez de l'argent dans une banque, un kiosque d'aéroport, ou un service en ligne, ils ajoutent une marge (majoration) à ce taux — typiquement 1-5% pour les services en ligne et 5-12% pour les changes d'aéroport. Comparez toujours le taux qu'on vous propose au taux du marché intermédiaire pour savoir combien vous payez en frais cachés."
        },
        "howItWorks": {
          "title": "Comment Fonctionne la Conversion de Devises",
          "content": "Les valeurs des devises sont déterminées par l'offre et la demande sur le marché des changes (forex) — le plus grand marché financier mondial avec plus de 7 000 milliards de dollars échangés quotidiennement. Les facteurs qui affectent les taux de change incluent les taux d'intérêt fixés par les banques centrales, les taux d'inflation, la stabilité politique, les balances commerciales, et la performance économique. Quand un pays augmente ses taux d'intérêt, sa devise se renforce généralement car les investisseurs recherchent de meilleurs rendements. À l'inverse, une inflation élevée ou une instabilité politique peut affaiblir une devise. Les taux de change peuvent être fixes (arrimés à une autre devise), flottants (déterminés par les forces du marché), ou gérés (flottants avec intervention de la banque centrale)."
        },
        "considerations": {
          "title": "À Savoir sur le Change de Devises",
          "items": [
            {
              "text": "Les taux affichés sont des taux de référence du marché intermédiaire — les taux réels des banques et services différeront",
              "type": "warning"
            },
            {
              "text": "Les taux de change changent constamment pendant les heures de trading (dimanche 17h - vendredi 17h ET)",
              "type": "info"
            },
            {
              "text": "Certains pays ont des contrôles de capitaux qui limitent les montants de conversion de devises",
              "type": "warning"
            },
            {
              "text": "Les cartes de crédit offrent souvent des taux de change compétitifs avec des frais de transaction étrangère de 1-3%",
              "type": "info"
            },
            {
              "text": "Pour voyager, prévenez votre banque avant de partir à l'étranger pour éviter le blocage de carte",
              "type": "info"
            },
            {
              "text": "Les échanges de cryptomonnaies offrent une autre option mais avec leurs propres risques de volatilité",
              "type": "info"
            }
          ]
        },
        "majorCurrencies": {
          "title": "Principales Devises Mondiales",
          "items": [
            {
              "text": "USD (Dollar Américain) — Principale devise de réserve mondiale, utilisée dans ~88% de toutes les transactions forex",
              "type": "info"
            },
            {
              "text": "EUR (Euro) — Deuxième devise la plus échangée, utilisée par 20 pays de l'UE avec plus de 340 millions d'habitants",
              "type": "info"
            },
            {
              "text": "JPY (Yen Japonais) — Troisième devise la plus échangée, connue comme devise 'refuge' en période d'incertitude",
              "type": "info"
            },
            {
              "text": "GBP (Livre Sterling) — Une des plus anciennes devises encore utilisées, quatrième plus échangée mondialement",
              "type": "info"
            },
            {
              "text": "CNY (Yuan Chinois) — En croissance dans le commerce international, partiellement géré par la banque centrale chinoise",
              "type": "info"
            },
            {
              "text": "MXN (Peso Mexicain) — Devise latino-américaine la plus échangée, fortement influencée par l'économie américaine",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Conversion de Devises",
          "description": "Calculs de conversion étape par étape",
          "examples": [
            {
              "title": "Conversion USD vers EUR",
              "steps": [
                "Montant : 1 000 $ USD",
                "Taux de change : 1 USD = 0,92 EUR",
                "Calcul : 1 000 × 0,92 = 920 €",
                "La banque ajoute 2% de marge : 0,92 × 0,98 = 0,9016",
                "Vous recevez : 1 000 × 0,9016 = 901,60 €",
                "Frais cachés : 920 € - 901,60 € = 18,40 €"
              ],
              "result": "Vous recevez 901,60 € (la banque garde 18,40 € en marge)"
            },
            {
              "title": "Conversion EUR vers MXN",
              "steps": [
                "Montant : 500 € EUR",
                "Taux EUR/USD : 1,087",
                "Taux USD/MXN : 17,15",
                "EUR → USD : 500 × 1,087 = 543,50 $",
                "USD → MXN : 543,50 × 17,15 = 9 321 MX$",
                "Direct : 500 × 18,64 = 9 321 MX$"
              ],
              "result": "500 € = environ 9 321 MX$"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qu'est-ce que le taux de change du marché intermédiaire ?",
          "answer": "Le taux du marché intermédiaire est le point médian entre les prix d'achat et de vente de deux devises sur le marché mondial. Il est considéré comme le taux de change 'réel'. Les banques, aéroports, et services de transfert d'argent ajoutent leur marge en plus de ce taux. La différence entre ce que vous payez et le taux du marché intermédiaire est essentiellement un frais caché."
        },
        {
          "question": "Pourquoi le taux de change de ma banque est-il différent ?",
          "answer": "Les banques ajoutent une majoration (spread) au taux du marché intermédiaire pour faire du profit. Cette majoration varie généralement de 1-5% pour les services bancaires en ligne et virements, 3-8% pour les changes en agence, et 5-12% pour les kiosques d'aéroport. Les services en ligne comme Wise ou Revolut offrent généralement des taux plus proches du marché intermédiaire avec des frais transparents."
        },
        {
          "question": "Quel est le meilleur moment pour échanger des devises ?",
          "answer": "Les taux de change fluctuent tout au long de la journée selon les conditions du marché. Généralement, les taux tendent à être plus compétitifs pendant les heures de trading qui se chevauchent (8h-12h ET quand les marchés européen et américain sont ouverts). Cependant, prédire les mouvements de taux est extrêmement difficile — même les traders professionnels ne peuvent pas chronométrer le marché de façon constante. Pour la plupart des gens, la meilleure stratégie est de comparer les services et trouver le coût total le plus bas plutôt que d'essayer de chronométrer le taux."
        },
        {
          "question": "À quelle fréquence les taux de change changent-ils ?",
          "answer": "Pour les paires de devises majeures (EUR/USD, GBP/USD, USD/JPY), les taux changent plusieurs fois par seconde pendant les heures de trading. Le marché forex fonctionne 24 heures sur 24, 5 jours par semaine (dimanche 17h ET au vendredi 17h ET). Les week-ends et jours fériés n'ont pas de trading, donc les taux restent fixes jusqu'à la réouverture des marchés. Notre convertisseur utilise des taux de référence mis à jour périodiquement."
        },
        {
          "question": "Quelles sont les devises les plus échangées au monde ?",
          "answer": "Les 5 devises les plus échangées par volume quotidien sont : le Dollar Américain (USD) — impliqué dans 88% de tous les échanges ; l'Euro (EUR) — 31% ; le Yen Japonais (JPY) — 17% ; la Livre Sterling (GBP) — 13% ; et le Yuan Chinois (CNY) — 7%. La paire USD/EUR est la paire de devises la plus échangée, représentant environ 23% de toutes les transactions forex."
        },
        {
          "question": "Vaut-il mieux échanger de l'argent avant ou pendant le voyage ?",
          "answer": "Généralement, échanger une petite somme avant votre voyage pour les dépenses immédiates (taxi, pourboires) est sage, mais utilisez une carte de crédit sans frais de transaction étrangère pour la plupart des achats à l'étranger. Les distributeurs automatiques dans votre pays de destination offrent souvent de meilleurs taux que les changes d'aéroport. Évitez d'échanger de gros montants dans les aéroports ou hôtels — leurs taux sont généralement les pires. Comparez les services en ligne pour les transferts plus importants."
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
      "name": "Währungsumrechner",
      "slug": "waehrungsumrechner-rechner",
      "subtitle": "Rechnen Sie zwischen 45+ Weltwährungen mit Mittelmarktkursen um.",
      "breadcrumb": "Währung",
      "seo": {
        "title": "Währungsumrechner - Kostenloser Wechselkursrechner",
        "description": "Rechnen Sie sofort zwischen 45+ Weltwährungen um. Sehen Sie Mittelmarktkurse für USD, EUR, GBP, MXN, BRL, JPY und mehr mit unserem kostenlosen Umrechner.",
        "shortDescription": "Rechnen Sie sofort zwischen Weltwährungen um.",
        "keywords": [
          "währungsumrechner",
          "wechselkursrechner",
          "usd zu eur",
          "währung umrechnen",
          "geld umrechner",
          "kostenloser währungsrechner",
          "forex rechner",
          "dollar zu euro"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "amount": {
          "label": "Betrag",
          "helpText": "Geben Sie den umzurechnenden Betrag ein"
        },
        "toCurrency": {
          "label": "Umrechnen in",
          "helpText": "Zielwährung",
          "options": {
            "USD": "US-Dollar (USD)",
            "EUR": "Euro (EUR)",
            "GBP": "Britisches Pfund (GBP)",
            "JPY": "Japanischer Yen (JPY)",
            "CAD": "Kanadischer Dollar (CAD)",
            "AUD": "Australischer Dollar (AUD)",
            "CHF": "Schweizer Franken (CHF)",
            "MXN": "Mexikanischer Peso (MXN)",
            "BRL": "Brasilianischer Real (BRL)",
            "INR": "Indische Rupie (INR)",
            "COP": "Kolumbianischer Peso (COP)",
            "ARS": "Argentinischer Peso (ARS)",
            "PEN": "Peruanischer Sol (PEN)",
            "CLP": "Chilenischer Peso (CLP)"
          }
        }
      },
      "results": {
        "converted": {
          "label": "Umgerechneter Betrag"
        },
        "rate": {
          "label": "Wechselkurs"
        },
        "inverse": {
          "label": "Umgekehrter Kurs"
        }
      },
      "presets": {
        "hundred": {
          "label": "100€",
          "description": "Schnelle 100-Einheiten-Umrechnung"
        },
        "thousand": {
          "label": "1.000€",
          "description": "Eintausend Einheiten"
        },
        "tenK": {
          "label": "10.000€",
          "description": "Zehntausend Einheiten"
        }
      },
      "values": {},
      "formats": {
        "summary": "{amount} {from} = {converted} {to}"
      },
      "infoCards": {
        "results": {
          "title": "💱 Umrechnungsergebnisse",
          "items": [
            {
              "label": "Umgerechneter Betrag",
              "valueKey": "converted"
            },
            {
              "label": "Wechselkurs",
              "valueKey": "rate"
            },
            {
              "label": "Umgekehrter Kurs",
              "valueKey": "inverse"
            },
            {
              "label": "Zuletzt aktualisiert",
              "valueKey": "lastUpdated"
            }
          ]
        },
        "popular": {
          "title": "📊 Beliebte Kurse",
          "items": [
            {
              "label": "1 USD → EUR",
              "valueKey": "usdEur"
            },
            {
              "label": "1 USD → GBP",
              "valueKey": "usdGbp"
            },
            {
              "label": "1 USD → JPY",
              "valueKey": "usdJpy"
            },
            {
              "label": "1 USD → MXN",
              "valueKey": "usdMxn"
            }
          ]
        },
        "tips": {
          "title": "💡 Währungstipps",
          "items": [
            "Hier werden Mittelmarktkurse angezeigt — Banken und Dienste fügen einen Aufschlag von 1-5% hinzu.",
            "Wechselkurse schwanken ständig basierend auf wirtschaftlichen Bedingungen, Zinssätzen und Marktstimmung.",
            "Für große Überweisungen vergleichen Sie Dienste wie Wise, Revolut oder OFX für die besten Kurse.",
            "Einige Währungen wie JPY und KRW verwenden keine Dezimalstellen — 1 USD ≈ 150 JPY ist normal."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Wechselkurse verstehen",
          "content": "Ein Wechselkurs sagt Ihnen, wie viel eine Währung in einer anderen wert ist. Der Mittelmarktkurs (auch Interbankenkurs genannt) ist der Mittelwert zwischen Kauf- und Verkaufspreisen auf dem globalen Währungsmarkt. Das ist der 'echte' Wechselkurs, den Banken untereinander verwenden. Wenn Sie Geld bei einer Bank, einem Flughafenkiosk oder einem Online-Dienst tauschen, fügen sie eine Marge (Aufschlag) zu diesem Kurs hinzu — typischerweise 1-5% für Online-Dienste und 5-12% für Flughafentauschstellen. Vergleichen Sie immer den angebotenen Kurs mit dem Mittelmarktkurs, um zu wissen, wie viel Sie an versteckten Gebühren zahlen."
        },
        "howItWorks": {
          "title": "Wie Währungsumrechnung funktioniert",
          "content": "Währungswerte werden durch Angebot und Nachfrage auf dem Devisenmarkt (Forex) bestimmt — dem größten Finanzmarkt der Welt mit über 7 Billionen Dollar täglichem Handelsvolumen. Faktoren, die Wechselkurse beeinflussen, umfassen von Zentralbanken festgelegte Zinssätze, Inflationsraten, politische Stabilität, Handelsbilanzen und wirtschaftliche Leistung. Wenn ein Land die Zinssätze erhöht, stärkt sich seine Währung typischerweise, weil Investoren höhere Renditen suchen. Umgekehrt können hohe Inflation oder politische Instabilität eine Währung schwächen. Wechselkurse können fest (an eine andere Währung gekoppelt), frei schwankend (durch Marktkräfte bestimmt) oder verwaltet (schwankend mit Zentralbankintervention) sein."
        },
        "considerations": {
          "title": "Wissenswertes über Währungstausch",
          "items": [
            {
              "text": "Die angezeigten Kurse sind Mittelmarkt-Referenzkurse — tatsächliche Wechselkurse von Banken und Diensten werden abweichen",
              "type": "warning"
            },
            {
              "text": "Wechselkurse ändern sich während der Handelszeiten ständig (Sonntag 23:00 - Freitag 23:00 MEZ)",
              "type": "info"
            },
            {
              "text": "Einige Länder haben Kapitalkontrollen, die Währungsumtauschbeträge beschränken",
              "type": "warning"
            },
            {
              "text": "Kreditkarten bieten oft wettbewerbsfähige Wechselkurse mit 1-3% Auslandstransaktionsgebühr",
              "type": "info"
            },
            {
              "text": "Informieren Sie Ihre Bank vor Auslandsreisen, um Kartensperrungen zu vermeiden",
              "type": "info"
            },
            {
              "text": "Kryptowährungsbörsen bieten eine weitere Option, aber mit eigenen Volatilitätsrisiken",
              "type": "info"
            }
          ]
        },
        "majorCurrencies": {
          "title": "Wichtige Weltwährungen",
          "items": [
            {
              "text": "USD (US-Dollar) — Weltweite primäre Reservewährung, verwendet in ~88% aller Forex-Transaktionen",
              "type": "info"
            },
            {
              "text": "EUR (Euro) — Zweitmeist gehandelte Währung, verwendet von 20 EU-Ländern mit 340+ Millionen Menschen",
              "type": "info"
            },
            {
              "text": "JPY (Japanischer Yen) — Drittmeist gehandelt, bekannt als 'sicherer Hafen' in unsicheren Zeiten",
              "type": "info"
            },
            {
              "text": "GBP (Britisches Pfund) — Eine der ältesten noch verwendeten Währungen, viertmeist gehandelt weltweit",
              "type": "info"
            },
            {
              "text": "CNY (Chinesischer Yuan) — Wächst im internationalen Handel, teilweise von Chinas Zentralbank verwaltet",
              "type": "info"
            },
            {
              "text": "MXN (Mexikanischer Peso) — Meistgehandelte lateinamerikanische Währung, stark von der US-Wirtschaft beeinflusst",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Währungsumrechnungsbeispiele",
          "description": "Schritt-für-Schritt-Umrechnungsberechnungen",
          "examples": [
            {
              "title": "USD zu EUR Umrechnung",
              "steps": [
                "Betrag: $1.000 USD",
                "Wechselkurs: 1 USD = 0,92 EUR",
                "Berechnung: 1.000 × 0,92 = €920",
                "Bank fügt 2% Aufschlag hinzu: 0,92 × 0,98 = 0,9016",
                "Sie erhalten: 1.000 × 0,9016 = €901,60",
                "Versteckte Gebühr: €920 - €901,60 = €18,40"
              ],
              "result": "Sie erhalten €901,60 (Bank behält €18,40 als Aufschlag)"
            },
            {
              "title": "EUR zu MXN Umrechnung",
              "steps": [
                "Betrag: €500 EUR",
                "EUR/USD Kurs: 1,087",
                "USD/MXN Kurs: 17,15",
                "EUR → USD: 500 × 1,087 = $543,50",
                "USD → MXN: 543,50 × 17,15 = MX$9.321",
                "Direkt: 500 × 18,64 = MX$9.321"
              ],
              "result": "€500 = ungefähr MX$9.321"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist der Mittelmarkt-Wechselkurs?",
          "answer": "Der Mittelmarktkurs ist der Mittelwert zwischen den Kauf- und Verkaufspreisen zweier Währungen auf dem globalen Markt. Er gilt als der 'echte' Wechselkurs. Banken, Flughäfen und Geldtransferdienste fügen ihre Marge zu diesem Kurs hinzu. Der Unterschied zwischen dem, was Sie zahlen, und dem Mittelmarktkurs ist im Wesentlichen eine versteckte Gebühr."
        },
        {
          "question": "Warum ist der Wechselkurs meiner Bank anders?",
          "answer": "Banken fügen einen Aufschlag (Spread) zum Mittelmarktkurs hinzu, um Gewinn zu erzielen. Dieser Aufschlag reicht typischerweise von 1-5% für Online-Banking und Überweisungen, 3-8% für Filialtausch und 5-12% für Flughafenkioske. Online-Dienste wie Wise oder Revolut bieten typischerweise Kurse näher am Mittelmarktkurs mit transparenten Gebühren."
        },
        {
          "question": "Wann ist die beste Zeit zum Währungstausch?",
          "answer": "Wechselkurse schwanken den ganzen Tag basierend auf Marktbedingungen. Generell sind Kurse während überlappender Handelszeiten am wettbewerbsfähigsten (14:00-18:00 MEZ, wenn sowohl europäische als auch US-Märkte geöffnet sind). Kursbewegungen vorherzusagen ist jedoch extrem schwierig — selbst professionelle Händler können den Markt nicht konsistent timen. Für die meisten Menschen ist die beste Strategie, Dienste zu vergleichen und die niedrigsten Gesamtkosten zu finden, anstatt zu versuchen, den Kurs zu timen."
        },
        {
          "question": "Wie oft ändern sich Wechselkurse?",
          "answer": "Für wichtige Währungspaare (EUR/USD, GBP/USD, USD/JPY) ändern sich Kurse mehrmals pro Sekunde während der Handelszeiten. Der Forex-Markt operiert 24 Stunden am Tag, 5 Tage die Woche (Sonntag 23:00 MEZ bis Freitag 23:00 MEZ). Wochenenden und Feiertage haben keinen Handel, sodass Kurse bis zur Wiedereröffnung der Märkte festbleiben. Unser Umrechner verwendet Referenzkurse, die regelmäßig aktualisiert werden."
        },
        {
          "question": "Was sind die meistgehandelten Währungen der Welt?",
          "answer": "Die Top 5 meistgehandelten Währungen nach täglichem Volumen sind: US-Dollar (USD) — beteiligt an 88% aller Trades; Euro (EUR) — 31%; Japanischer Yen (JPY) — 17%; Britisches Pfund (GBP) — 13%; und Chinesischer Yuan (CNY) — 7%. Das USD/EUR Paar ist das einzelne meistgehandelte Währungspaar und macht etwa 23% aller Forex-Transaktionen aus."
        },
        {
          "question": "Ist es besser, Geld vor oder während der Reise zu tauschen?",
          "answer": "Generell ist es klug, vor Ihrer Reise einen kleinen Betrag für sofortige Ausgaben (Taxi, Trinkgelder) zu tauschen, aber verwenden Sie eine Kreditkarte ohne Auslandstransaktionsgebühren für die meisten Käufe im Ausland. Geldautomaten im Zielland bieten oft bessere Kurse als Flughafentauschstellen. Vermeiden Sie den Tausch großer Beträge an Flughäfen oder Hotels — deren Kurse sind typischerweise die schlechtesten. Vergleichen Sie Online-Dienste für größere Überweisungen."
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
      defaultValue: null,
      placeholder: "1000",
      min: 0,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "toCurrency",
      type: "select",
      defaultValue: "EUR",
      options: [
        { value: "USD" }, { value: "EUR" }, { value: "GBP" }, { value: "JPY" },
        { value: "CAD" }, { value: "AUD" }, { value: "CHF" }, { value: "MXN" },
        { value: "BRL" }, { value: "INR" }, { value: "COP" }, { value: "ARS" },
        { value: "PEN" }, { value: "CLP" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "converted", type: "primary", format: "text" },
    { id: "rate", type: "secondary", format: "text" },
    { id: "inverse", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "💱", itemCount: 4 },
    { id: "popular", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "majorCurrencies", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "European Central Bank", year: "2025", title: "Euro Foreign Exchange Reference Rates", source: "ECB", url: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html" },
    { authors: "Bank for International Settlements", year: "2024", title: "Triennial Central Bank Survey of Foreign Exchange", source: "BIS", url: "https://www.bis.org/statistics/rpfx22.htm" },
  ],

  hero: { badge: "Finance", title: "Currency Converter" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["compound-interest", "mortgage"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE — Reference rates (static mid-market approximations)
// ============================================================================

const RATES_TO_USD: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, CAD: 1.36, AUD: 1.53,
  CHF: 0.88, MXN: 17.15, BRL: 4.97, INR: 83.1, COP: 3950, ARS: 870,
  PEN: 3.72, CLP: 935, CNY: 7.24, KRW: 1320, SEK: 10.45, NOK: 10.55,
  DKK: 6.88, NZD: 1.63, SGD: 1.34, HKD: 7.82, TWD: 31.5, THB: 35.2,
  PHP: 56.1, IDR: 15650, MYR: 4.72, VND: 24500, ZAR: 18.7, TRY: 30.2,
  PLN: 4.02, CZK: 22.8, HUF: 355, RON: 4.58, BGN: 1.80, HRK: 6.93,
  RUB: 92, UAH: 37.5, EGP: 30.9, NGN: 1550, KES: 155, GHS: 12.5,
  DOP: 56.8, GTQ: 7.82, HNL: 24.7, NIO: 36.7, CRC: 525, PAB: 1,
  UYU: 39.2, PYG: 7300, BOB: 6.91, VES: 36.5,
};

const SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", CAD: "C$", AUD: "A$",
  CHF: "CHF ", MXN: "MX$", BRL: "R$", INR: "₹", COP: "COL$", ARS: "AR$",
  PEN: "S/", CLP: "CLP ", CNY: "¥", KRW: "₩", SEK: "kr", NOK: "kr",
  DOP: "RD$", GTQ: "Q", CRC: "₡", UYU: "$U",
};

function fmtCurr(val: number, curr: string): string {
  const sym = SYMBOLS[curr] || "";
  if (val >= 1000) return `${sym}${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `${sym}${val.toFixed(val < 1 ? 6 : 2)}`;
}

export function calculateCurrencyConverter(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;

  const amount = values.amount as number | null;
  if (!amount || amount <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromCurr = fieldUnits.amount || "USD";
  const toCurr = values.toCurrency as string || "EUR";

  const fromRate = RATES_TO_USD[fromCurr] || 1;
  const toRate = RATES_TO_USD[toCurr] || 1;

  // Convert: amount in fromCurr → USD → toCurr
  const amountUSD = amount / fromRate;
  const converted = amountUSD * toRate;
  const rate = toRate / fromRate;
  const inverseRate = fromRate / toRate;

  // Popular rates
  const eurRate = RATES_TO_USD["EUR"];
  const gbpRate = RATES_TO_USD["GBP"];
  const jpyRate = RATES_TO_USD["JPY"];
  const mxnRate = RATES_TO_USD["MXN"];

  return {
    values: { converted, rate, inverseRate },
    formatted: {
      converted: fmtCurr(converted, toCurr),
      rate: `1 ${fromCurr} = ${rate < 1 ? rate.toFixed(6) : rate.toFixed(4)} ${toCurr}`,
      inverse: `1 ${toCurr} = ${inverseRate < 1 ? inverseRate.toFixed(6) : inverseRate.toFixed(4)} ${fromCurr}`,
      lastUpdated: "Reference rates (approximate)",
      usdEur: `€${eurRate.toFixed(4)}`,
      usdGbp: `£${gbpRate.toFixed(4)}`,
      usdJpy: `¥${jpyRate.toFixed(2)}`,
      usdMxn: `MX$${mxnRate.toFixed(2)}`,
    },
    summary: `${fmtCurr(amount, fromCurr)} ${fromCurr} = ${fmtCurr(converted, toCurr)} ${toCurr}`,
    isValid: true,
  };
}

export default currencyConverterConfig;
