import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ══════════════════════════════════════════════════════════════
// 📊 US CPI Annual Average Data (BLS - 1913 to 2025)
// Base: 1982-84 = 100
// Source: Bureau of Labor Statistics, CPI-U All Urban Consumers
// ══════════════════════════════════════════════════════════════
const US_CPI: Record<number, number> = {
  1913: 9.9, 1914: 10.0, 1915: 10.1, 1916: 10.9, 1917: 12.8, 1918: 15.1, 1919: 17.3, 1920: 20.0,
  1921: 17.9, 1922: 16.8, 1923: 17.1, 1924: 17.1, 1925: 17.5, 1926: 17.7, 1927: 17.4, 1928: 17.2,
  1929: 17.2, 1930: 16.7, 1931: 15.2, 1932: 13.6, 1933: 12.9, 1934: 13.4, 1935: 13.7, 1936: 13.9,
  1937: 14.4, 1938: 14.1, 1939: 13.9, 1940: 14.0, 1941: 14.7, 1942: 16.3, 1943: 17.3, 1944: 17.6,
  1945: 18.0, 1946: 19.5, 1947: 22.3, 1948: 24.1, 1949: 23.8, 1950: 24.1, 1951: 26.0, 1952: 26.6,
  1953: 26.8, 1954: 26.9, 1955: 26.8, 1956: 27.2, 1957: 28.1, 1958: 28.9, 1959: 29.2, 1960: 29.6,
  1961: 29.9, 1962: 30.3, 1963: 30.6, 1964: 31.0, 1965: 31.5, 1966: 32.5, 1967: 33.4, 1968: 34.8,
  1969: 36.7, 1970: 38.8, 1971: 40.5, 1972: 41.8, 1973: 44.4, 1974: 49.3, 1975: 53.8, 1976: 56.9,
  1977: 60.6, 1978: 65.2, 1979: 72.6, 1980: 82.4, 1981: 90.9, 1982: 96.5, 1983: 99.6, 1984: 103.9,
  1985: 107.6, 1986: 109.6, 1987: 113.6, 1988: 118.3, 1989: 124.0, 1990: 130.7, 1991: 136.2, 1992: 140.3,
  1993: 144.5, 1994: 148.2, 1995: 152.4, 1996: 156.9, 1997: 160.5, 1998: 163.0, 1999: 166.6, 2000: 172.2,
  2001: 177.1, 2002: 179.9, 2003: 184.0, 2004: 188.9, 2005: 195.3, 2006: 201.6, 2007: 207.3, 2008: 215.3,
  2009: 214.5, 2010: 218.1, 2011: 224.9, 2012: 229.6, 2013: 233.0, 2014: 236.7, 2015: 237.0, 2016: 240.0,
  2017: 245.1, 2018: 251.1, 2019: 255.7, 2020: 258.8, 2021: 271.0, 2022: 292.7, 2023: 304.7, 2024: 313.5,
  2025: 320.0,
};

const CPI_YEARS = Object.keys(US_CPI).map(Number).sort((a, b) => a - b);
const MIN_YEAR = CPI_YEARS[0]; // 1913
const MAX_YEAR = CPI_YEARS[CPI_YEARS.length - 1]; // 2025

// Generate year options for select inputs
const yearOptions = CPI_YEARS.map((y) => ({ value: String(y) }));

export const inflationCalculatorConfig: CalculatorConfigV4 = {
  id: "inflation-calculator",
  version: "4.3",
  category: "finance",
  icon: "📈",

  presets: [
    { id: "housing2000", icon: "🏠", values: { amount: 150000, fromYear: "2000", toYear: "2025", useCustomRate: false } },
    { id: "college1990", icon: "🎓", values: { amount: 10000, fromYear: "1990", toYear: "2025", useCustomRate: false } },
    { id: "coffee1980", icon: "☕", values: { amount: 0.50, fromYear: "1980", toYear: "2025", useCustomRate: false } },
    { id: "future10k", icon: "📈", values: { amount: 10000, useCustomRate: true, inflationRate: 3, years: 20 } },
  ],

  t: {
    en: {
      name: "Inflation Calculator",
      slug: "inflation-calculator",
      subtitle: "Calculate how inflation affects your money's purchasing power over time using historical CPI data or custom rates",
      breadcrumb: "Inflation",

      seo: {
        title: "Inflation Calculator — CPI Purchasing Power & Future Value | Free Tool",
        description: "Calculate inflation's impact on your money with historical US CPI data from 1913-2025. See purchasing power changes, compare salary growth, and project future costs with our free inflation calculator.",
        shortDescription: "Free inflation calculator with US CPI data from 1913 to 2025.",
        keywords: [
          "inflation calculator",
          "CPI calculator",
          "purchasing power calculator",
          "cost of living calculator",
          "inflation rate calculator",
          "dollar value over time",
          "consumer price index calculator",
          "free online inflation tool",
        ],
      },

      calculator: { yourInformation: "Inflation Details" },
      ui: {
        yourInformation: "Inflation Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        amount: { label: "Amount", helpText: "Enter the dollar amount to adjust for inflation" },
        fromYear: { label: "From Year", helpText: "Starting year" },
        toYear: { label: "To Year", helpText: "Ending year" },
        useCustomRate: { label: "Use Custom Rate", helpText: "Use a custom inflation rate instead of historical CPI data" },
        inflationRate: { label: "Annual Inflation Rate", helpText: "Expected average annual inflation rate" },
        years: { label: "Number of Years", helpText: "How many years into the future" },
        includeSalary: { label: "Compare with Salary", helpText: "See if your salary keeps up with inflation" },
        annualSalary: { label: "Your Annual Salary", helpText: "Enter your current annual salary" },
        salaryGrowthRate: { label: "Annual Salary Growth", helpText: "Expected annual salary increase rate" },
      },

      results: {
        adjustedValue: { label: "Equivalent Value" },
        purchasingPower: { label: "Purchasing Power" },
        cumulativeInflation: { label: "Cumulative Inflation" },
        avgAnnualRate: { label: "Avg. Annual Rate" },
        priceMultiplier: { label: "Price Multiplier" },
        salaryNeeded: { label: "Salary Needed to Keep Up" },
        realSalaryChange: { label: "Real Salary Change" },
      },

      presets: {
        housing2000: { label: "🏠 Housing in 2000", description: "$150K home — what's it worth now?" },
        college1990: { label: "🎓 College in 1990", description: "$10K tuition then vs today" },
        coffee1980: { label: "☕ Coffee in 1980", description: "$0.50 cup — what's it cost now?" },
        future10k: { label: "📈 Future $10K", description: "$10K in 20 years at 3% inflation" },
      },

      values: {
        "years": "years",
        "year": "year",
        "perYear": "per year",
        "inDollars": "in {toYear} dollars",
        "hadPowerOf": "has the purchasing power of",
        "pricesAre": "Prices are",
        "timesHigher": "× higher",
      },

      formats: {
        summaryHistorical: "{amount} in {fromYear} is equivalent to {adjustedValue} in {toYear} — a cumulative inflation of {cumulativeInflation}.",
        summaryCustom: "{amount} today will feel like {adjustedValue} in {years} years at {rate}% annual inflation — your purchasing power drops to {purchasingPower}.",
      },

      infoCards: {
        inflationImpact: {
          title: "💡 Inflation Impact",
          items: [
            { label: "Years to Double Prices", valueKey: "yearsToDouble" },
            { label: "Highest Inflation Year", valueKey: "highestYear" },
            { label: "Lowest Inflation Year", valueKey: "lowestYear" },
            { label: "Deflation Years in Period", valueKey: "deflationYears" },
          ],
        },
        realWorldExamples: {
          title: "🛒 Then vs Now",
          items: [
            { label: "Gallon of Gas", valueKey: "gasThenNow" },
            { label: "Movie Ticket", valueKey: "movieThenNow" },
            { label: "US Minimum Wage", valueKey: "minWageThenNow" },
            { label: "Median Home Price", valueKey: "homeThenNow" },
          ],
        },
        tips: {
          title: "💰 Beat Inflation",
          items: [
            "Invest in index funds — the S&P 500 has historically returned ~10%/year, beating inflation by ~7%",
            "Consider I Bonds — US Treasury bonds that adjust for inflation automatically, currently ~4% APY",
            "Negotiate salary raises of at least 3-4% annually to maintain purchasing power",
            "Real estate and TIPS (Treasury Inflation-Protected Securities) are classic inflation hedges",
          ],
        },
      },

      referenceData: {},

      education: {
        whatIsInflation: {
          title: "What Is Inflation?",
          content: "Inflation is the rate at which the general level of prices for goods and services rises over time, eroding purchasing power. When inflation occurs, each unit of currency buys fewer goods and services than before. The U.S. Federal Reserve targets an inflation rate of about 2% per year as healthy for economic growth. Moderate inflation encourages spending and investment, while very high inflation (hyperinflation) or deflation can be economically destructive.",
        },
        howCPIWorks: {
          title: "How the Consumer Price Index Works",
          content: "The Consumer Price Index (CPI) is the most widely used measure of inflation in the United States. Published monthly by the Bureau of Labor Statistics (BLS), it tracks price changes for a 'basket' of approximately 80,000 goods and services across 8 major categories: food, housing, apparel, transportation, medical care, recreation, education, and other goods. The CPI-U (All Urban Consumers) covers about 93% of the U.S. population. The base period is 1982-84 = 100, meaning if today's CPI is 320, prices have risen 220% since the early 1980s.",
        },
        typesOfInflation: {
          title: "Types of Inflation",
          items: [
            { text: "Demand-Pull: When demand for goods exceeds supply, pushing prices up — like post-pandemic stimulus spending", type: "info" as const },
            { text: "Cost-Push: When production costs rise (oil, wages, materials), businesses pass costs to consumers", type: "info" as const },
            { text: "Built-In: Self-perpetuating cycle where workers demand higher wages expecting inflation, which then causes more inflation", type: "info" as const },
            { text: "Hyperinflation: Extreme case (>50%/month) — seen in Zimbabwe 2008 and Venezuela 2018 where currencies became nearly worthless", type: "warning" as const },
          ],
        },
        calculationExamples: {
          title: "Inflation Calculation Examples",
          description: "Step-by-step examples using real CPI data",
          examples: [
            {
              title: "$100 from 1990 to 2025",
              steps: [
                "Look up CPI values: 1990 CPI = 130.7, 2025 CPI = 320.0",
                "Calculate ratio: 320.0 ÷ 130.7 = 2.448",
                "Multiply: $100 × 2.448 = $244.76",
                "Cumulative inflation: ((320.0 - 130.7) / 130.7) × 100 = 144.8%",
              ],
              result: "$100 in 1990 has the same purchasing power as $244.76 in 2025",
            },
            {
              title: "Future value at 3% for 20 years",
              steps: [
                "Use compound formula: Future = Amount × (1 + rate)^years",
                "Future = $1,000 × (1.03)^20",
                "Future = $1,000 × 1.8061 = $1,806.11",
                "Purchasing power: $1,000 ÷ 1.8061 = $553.68",
              ],
              result: "$1,000 today will need $1,806 to have the same purchasing power in 20 years at 3% inflation",
            },
          ],
        },
        purchasingPower: {
          title: "Understanding Purchasing Power",
          content: "Purchasing power measures how much you can buy with a given amount of money. When inflation rises, purchasing power falls — meaning you need more money to buy the same goods. For example, $1 in 1913 had the purchasing power of roughly $32 today. This is why simply saving cash loses value over time. To preserve purchasing power, your money needs to grow at least as fast as inflation. This is the fundamental reason why investing matters: a savings account earning 0.5% while inflation runs at 3% means you're losing 2.5% of purchasing power every year, even though your nominal balance grows.",
        },
        historicalContext: {
          title: "Notable Inflation Periods in US History",
          content: "The US has experienced several significant inflation events. The post-WWI spike (1917-1920) saw inflation reach 18%. The Great Depression brought severe deflation (-10.3% in 1932). The 1970s 'Great Inflation' peaked at 13.5% in 1980, driven by oil crises and loose monetary policy — Federal Reserve Chair Paul Volcker famously raised interest rates to 20% to tame it. The 2008 financial crisis brought near-deflation. Most recently, post-COVID stimulus combined with supply chain disruptions pushed inflation to 8% in 2022, the highest in 40 years. The Federal Reserve responded with aggressive rate hikes from near-zero to over 5% between 2022-2023.",
        },
      },

      faqs: [
        { question: "What is the current US inflation rate?", answer: "As of late 2025, the trailing 12-month inflation rate in the US is approximately 2.7%, measured by the Consumer Price Index (CPI). The Federal Reserve's target inflation rate is 2% per year. Inflation peaked at 9.1% in June 2022 before declining through 2023-2025 due to Federal Reserve rate hikes." },
        { question: "How is inflation calculated?", answer: "Inflation is calculated using the Consumer Price Index (CPI). The Bureau of Labor Statistics tracks prices of about 80,000 goods and services monthly. The inflation rate between two periods equals: ((CPI_new - CPI_old) / CPI_old) × 100. For example, if CPI went from 260 to 270, inflation is (10/260) × 100 = 3.85%." },
        { question: "What's the difference between CPI and PCE?", answer: "CPI (Consumer Price Index) and PCE (Personal Consumption Expenditures) both measure inflation but differ in scope and weighting. CPI covers only out-of-pocket consumer spending, while PCE includes spending on behalf of consumers (like employer health insurance). The Federal Reserve prefers PCE for policy decisions, but CPI is used for Social Security adjustments and is more widely cited in the media." },
        { question: "How can I protect my money from inflation?", answer: "Key strategies include: investing in stocks (S&P 500 averages ~10% annual returns vs ~3% inflation), buying I Bonds or TIPS from the US Treasury, investing in real estate (property values tend to rise with inflation), diversifying into commodities, and negotiating salary raises that match or exceed inflation. Keeping large amounts in low-interest savings accounts is one of the worst strategies during inflationary periods." },
        { question: "What is the Rule of 72?", answer: "The Rule of 72 is a quick way to estimate how long it takes for prices to double at a given inflation rate. Simply divide 72 by the inflation rate. At 3% inflation, prices double in approximately 72 ÷ 3 = 24 years. At 7% inflation, they double in about 10 years. This same rule works for investments: at 10% returns, your money doubles roughly every 7.2 years." },
        { question: "Does this calculator work for other countries?", answer: "The historical CPI data in this calculator is specifically for the United States (BLS CPI-U data from 1913-2025). However, you can use the Custom Rate mode with any country's average inflation rate. For example, the Eurozone averages about 2%, UK about 2.5%, Brazil about 5-6%, and Argentina has experienced much higher rates. The multi-currency feature lets you enter amounts in any currency." },
      ],

      rating: {
        title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link",
        clickToRate: "Click to rate", youRated: "You rated", stars: "stars",
        averageFrom: "average from", ratings: "ratings",
      },
      common: { home: "Home", calculators: "Calculators" },
      buttons: {
        calculate: "Calculate", reset: "Reset", pdf: "PDF", csv: "CSV",
        excel: "Excel", save: "Save", saved: "Saved", saving: "Saving...",
      },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },

      chart: {
        title: "Purchasing Power Over Time",
        xLabel: "Year",
        yLabel: "Value ($)",
        series: {
          adjustedValue: "Equivalent Value",
          purchasingPower: "Purchasing Power",
        },
      },

      detailedTable: {
        inflationTimeline: {
          button: "View Year-by-Year Breakdown",
          title: "Inflation Timeline",
          columns: {
            year: "Year",
            cpi: "CPI",
            annualRate: "Annual Rate",
            cumulative: "Cumulative",
            equivalent: "Equivalent Value",
          },
        },
      },

      references: {
        bls: "Bureau of Labor Statistics — Consumer Price Index",
        fed: "Federal Reserve — Monetary Policy & Inflation Target",
      },
    },
    es: {
      "name": "Calculadora de Inflación",
      "slug": "calculadora-inflacion",
      "subtitle": "Calcula cómo la inflación afecta el poder adquisitivo de tu dinero a lo largo del tiempo usando datos históricos del IPC o tasas personalizadas",
      "breadcrumb": "Inflación",
      "seo": {
        "title": "Calculadora de Inflación — IPC Poder Adquisitivo y Valor Futuro | Herramienta Gratuita",
        "description": "Calcula el impacto de la inflación en tu dinero con datos históricos del IPC de EE.UU. desde 1913-2025. Ve cambios en el poder adquisitivo, compara crecimiento salarial y proyecta costos futuros con nuestra calculadora gratuita.",
        "shortDescription": "Calculadora de inflación gratuita con datos del IPC de EE.UU. desde 1913 hasta 2025.",
        "keywords": [
          "calculadora de inflación",
          "calculadora IPC",
          "calculadora poder adquisitivo",
          "calculadora costo de vida",
          "calculadora tasa de inflación",
          "valor del dólar en el tiempo",
          "calculadora índice de precios al consumidor",
          "herramienta de inflación en línea gratuita"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Cantidad",
          "helpText": "Ingresa la cantidad en dólares para ajustar por inflación"
        },
        "fromYear": {
          "label": "Año Inicial",
          "helpText": "Año de inicio"
        },
        "toYear": {
          "label": "Año Final",
          "helpText": "Año de finalización"
        },
        "useCustomRate": {
          "label": "Usar Tasa Personalizada",
          "helpText": "Usar una tasa de inflación personalizada en lugar de datos históricos del IPC"
        },
        "inflationRate": {
          "label": "Tasa de Inflación Anual",
          "helpText": "Tasa promedio anual de inflación esperada"
        },
        "years": {
          "label": "Número de Años",
          "helpText": "Cuántos años hacia el futuro"
        },
        "includeSalary": {
          "label": "Comparar con Salario",
          "helpText": "Ver si tu salario se mantiene al ritmo de la inflación"
        },
        "annualSalary": {
          "label": "Tu Salario Anual",
          "helpText": "Ingresa tu salario anual actual"
        },
        "salaryGrowthRate": {
          "label": "Crecimiento Salarial Anual",
          "helpText": "Tasa esperada de aumento salarial anual"
        }
      },
      "results": {
        "adjustedValue": {
          "label": "Valor Equivalente"
        },
        "purchasingPower": {
          "label": "Poder Adquisitivo"
        },
        "cumulativeInflation": {
          "label": "Inflación Acumulada"
        },
        "avgAnnualRate": {
          "label": "Tasa Anual Prom."
        },
        "priceMultiplier": {
          "label": "Multiplicador de Precio"
        },
        "salaryNeeded": {
          "label": "Salario Necesario para Mantenerse"
        },
        "realSalaryChange": {
          "label": "Cambio Salarial Real"
        }
      },
      "presets": {
        "housing2000": {
          "label": "🏠 Vivienda en 2000",
          "description": "Casa de $150K — ¿cuánto vale ahora?"
        },
        "college1990": {
          "label": "🎓 Universidad en 1990",
          "description": "Colegiatura de $10K entonces vs hoy"
        },
        "coffee1980": {
          "label": "☕ Café en 1980",
          "description": "Taza de $0.50 — ¿cuánto cuesta ahora?"
        },
        "future10k": {
          "label": "📈 $10K Futuros",
          "description": "$10K en 20 años al 3% de inflación"
        }
      },
      "values": {
        "years": "años",
        "year": "año",
        "perYear": "por año",
        "inDollars": "en dólares de {toYear}",
        "hadPowerOf": "tiene el poder adquisitivo de",
        "pricesAre": "Los precios son",
        "timesHigher": "× más altos"
      },
      "formats": {
        "summaryHistorical": "{amount} en {fromYear} equivale a {adjustedValue} en {toYear} — una inflación acumulada de {cumulativeInflation}.",
        "summaryCustom": "{amount} hoy se sentirá como {adjustedValue} en {years} años al {rate}% de inflación anual — tu poder adquisitivo baja a {purchasingPower}."
      },
      "infoCards": {
        "inflationImpact": {
          "title": "💡 Impacto de la Inflación",
          "items": [
            {
              "label": "Años para Duplicar Precios",
              "valueKey": "yearsToDouble"
            },
            {
              "label": "Año de Mayor Inflación",
              "valueKey": "highestYear"
            },
            {
              "label": "Año de Menor Inflación",
              "valueKey": "lowestYear"
            },
            {
              "label": "Años de Deflación en el Período",
              "valueKey": "deflationYears"
            }
          ]
        },
        "realWorldExamples": {
          "title": "🛒 Entonces vs Ahora",
          "items": [
            {
              "label": "Galón de Gasolina",
              "valueKey": "gasThenNow"
            },
            {
              "label": "Boleto de Cine",
              "valueKey": "movieThenNow"
            },
            {
              "label": "Salario Mínimo de EE.UU.",
              "valueKey": "minWageThenNow"
            },
            {
              "label": "Precio Medio de Vivienda",
              "valueKey": "homeThenNow"
            }
          ]
        },
        "tips": {
          "title": "💰 Vencer la Inflación",
          "items": [
            "Invierte en fondos indexados — el S&P 500 ha retornado históricamente ~10%/año, superando la inflación por ~7%",
            "Considera Bonos I — bonos del Tesoro de EE.UU. que se ajustan automáticamente por inflación, actualmente ~4% APY",
            "Negocia aumentos salariales de al menos 3-4% anualmente para mantener el poder adquisitivo",
            "Bienes raíces y TIPS (Valores del Tesoro Protegidos contra Inflación) son coberturas clásicas contra inflación"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatIsInflation": {
          "title": "¿Qué es la Inflación?",
          "content": "La inflación es la tasa a la que el nivel general de precios de bienes y servicios aumenta con el tiempo, erosionando el poder adquisitivo. Cuando ocurre inflación, cada unidad de moneda compra menos bienes y servicios que antes. La Reserva Federal de EE.UU. busca una tasa de inflación de aproximadamente 2% anual como saludable para el crecimiento económico. La inflación moderada fomenta el gasto y la inversión, mientras que la inflación muy alta (hiperinflación) o la deflación pueden ser económicamente destructivas."
        },
        "howCPIWorks": {
          "title": "Cómo Funciona el Índice de Precios al Consumidor",
          "content": "El Índice de Precios al Consumidor (IPC) es la medida más utilizada de inflación en Estados Unidos. Publicado mensualmente por la Oficina de Estadísticas Laborales (BLS), rastrea cambios de precios para una 'canasta' de aproximadamente 80,000 bienes y servicios en 8 categorías principales: alimentos, vivienda, vestimenta, transporte, atención médica, recreación, educación y otros bienes. El IPC-U (Todos los Consumidores Urbanos) cubre aproximadamente el 93% de la población de EE.UU. El período base es 1982-84 = 100, lo que significa que si el IPC de hoy es 320, los precios han subido 220% desde principios de los años 80."
        },
        "typesOfInflation": {
          "title": "Tipos de Inflación",
          "items": [
            {
              "text": "Inflación de Demanda: Cuando la demanda de bienes excede la oferta, empujando los precios al alza — como el gasto de estímulo post-pandemia",
              "type": "info"
            },
            {
              "text": "Inflación de Costos: Cuando los costos de producción suben (petróleo, salarios, materiales), las empresas trasladan costos a los consumidores",
              "type": "info"
            },
            {
              "text": "Inflación Incorporada: Ciclo auto-perpetuante donde trabajadores exigen salarios más altos esperando inflación, lo que luego causa más inflación",
              "type": "info"
            },
            {
              "text": "Hiperinflación: Caso extremo (>50%/mes) — visto en Zimbabwe 2008 y Venezuela 2018 donde las monedas se volvieron casi inútiles",
              "type": "warning"
            }
          ]
        },
        "calculationExamples": {
          "title": "Ejemplos de Cálculo de Inflación",
          "description": "Ejemplos paso a paso usando datos reales del IPC",
          "examples": [
            {
              "title": "$100 de 1990 a 2025",
              "steps": [
                "Buscar valores IPC: 1990 IPC = 130.7, 2025 IPC = 320.0",
                "Calcular proporción: 320.0 ÷ 130.7 = 2.448",
                "Multiplicar: $100 × 2.448 = $244.76",
                "Inflación acumulada: ((320.0 - 130.7) / 130.7) × 100 = 144.8%"
              ],
              "result": "$100 en 1990 tiene el mismo poder adquisitivo que $244.76 en 2025"
            },
            {
              "title": "Valor futuro al 3% por 20 años",
              "steps": [
                "Usar fórmula compuesta: Futuro = Cantidad × (1 + tasa)^años",
                "Futuro = $1,000 × (1.03)^20",
                "Futuro = $1,000 × 1.8061 = $1,806.11",
                "Poder adquisitivo: $1,000 ÷ 1.8061 = $553.68"
              ],
              "result": "$1,000 hoy necesitará $1,806 para tener el mismo poder adquisitivo en 20 años al 3% de inflación"
            }
          ]
        },
        "purchasingPower": {
          "title": "Entendiendo el Poder Adquisitivo",
          "content": "El poder adquisitivo mide cuánto puedes comprar con una cantidad determinada de dinero. Cuando la inflación sube, el poder adquisitivo baja — significa que necesitas más dinero para comprar los mismos bienes. Por ejemplo, $1 en 1913 tenía el poder adquisitivo de aproximadamente $32 hoy. Por esto simplemente ahorrar efectivo pierde valor con el tiempo. Para preservar el poder adquisitivo, tu dinero necesita crecer al menos tan rápido como la inflación. Esta es la razón fundamental por la que invertir importa: una cuenta de ahorros ganando 0.5% mientras la inflación corre al 3% significa que estás perdiendo 2.5% de poder adquisitivo cada año, aunque tu saldo nominal crezca."
        },
        "historicalContext": {
          "title": "Períodos Notables de Inflación en la Historia de EE.UU.",
          "content": "EE.UU. ha experimentado varios eventos significativos de inflación. El pico post-Primera Guerra Mundial (1917-1920) vio inflación alcanzar 18%. La Gran Depresión trajo deflación severa (-10.3% en 1932). La 'Gran Inflación' de los años 70 alcanzó su pico en 13.5% en 1980, impulsada por crisis petroleras y política monetaria laxa — el Presidente de la Reserva Federal Paul Volcker famosamente elevó las tasas de interés al 20% para domarla. La crisis financiera de 2008 trajo casi deflación. Más recientemente, el estímulo post-COVID combinado con disrupciones en la cadena de suministro empujó la inflación al 8% en 2022, la más alta en 40 años. La Reserva Federal respondió con subidas agresivas de tasas desde cerca de cero a más del 5% entre 2022-2023."
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es la tasa de inflación actual en EE.UU.?",
          "answer": "A finales de 2025, la tasa de inflación de los últimos 12 meses en EE.UU. es aproximadamente 2.7%, medida por el Índice de Precios al Consumidor (IPC). La tasa de inflación objetivo de la Reserva Federal es 2% anual. La inflación alcanzó su pico en 9.1% en junio 2022 antes de declinar durante 2023-2025 debido a las subidas de tasas de la Reserva Federal."
        },
        {
          "question": "¿Cómo se calcula la inflación?",
          "answer": "La inflación se calcula usando el Índice de Precios al Consumidor (IPC). La Oficina de Estadísticas Laborales rastrea precios de aproximadamente 80,000 bienes y servicios mensualmente. La tasa de inflación entre dos períodos es: ((IPC_nuevo - IPC_viejo) / IPC_viejo) × 100. Por ejemplo, si el IPC fue de 260 a 270, la inflación es (10/260) × 100 = 3.85%."
        },
        {
          "question": "¿Cuál es la diferencia entre IPC y PCE?",
          "answer": "IPC (Índice de Precios al Consumidor) y PCE (Gastos de Consumo Personal) ambos miden inflación pero difieren en alcance y ponderación. El IPC cubre solo gasto directo del consumidor, mientras que PCE incluye gastos en nombre de consumidores (como seguro de salud del empleador). La Reserva Federal prefiere PCE para decisiones de política, pero el IPC se usa para ajustes de Seguridad Social y es más citado en medios."
        },
        {
          "question": "¿Cómo puedo proteger mi dinero de la inflación?",
          "answer": "Estrategias clave incluyen: invertir en acciones (S&P 500 promedia ~10% retornos anuales vs ~3% inflación), comprar Bonos I o TIPS del Tesoro de EE.UU., invertir en bienes raíces (valores de propiedad tienden a subir con inflación), diversificar en materias primas, y negociar aumentos salariales que igualen o excedan la inflación. Mantener grandes cantidades en cuentas de ahorro de bajo interés es una de las peores estrategias durante períodos inflacionarios."
        },
        {
          "question": "¿Qué es la Regla del 72?",
          "answer": "La Regla del 72 es una forma rápida de estimar cuánto tiempo toma para que los precios se dupliquen a una tasa de inflación dada. Simplemente divide 72 por la tasa de inflación. Al 3% de inflación, los precios se duplican en aproximadamente 72 ÷ 3 = 24 años. Al 7% de inflación, se duplican en aproximadamente 10 años. Esta misma regla funciona para inversiones: al 10% de retornos, tu dinero se duplica aproximadamente cada 7.2 años."
        },
        {
          "question": "¿Esta calculadora funciona para otros países?",
          "answer": "Los datos históricos del IPC en esta calculadora son específicamente para Estados Unidos (datos IPC-U del BLS de 1913-2025). Sin embargo, puedes usar el modo de Tasa Personalizada con la tasa promedio de inflación de cualquier país. Por ejemplo, la Eurozona promedia aproximadamente 2%, Reino Unido aproximadamente 2.5%, Brasil aproximadamente 5-6%, y Argentina ha experimentado tasas mucho más altas. La función multi-moneda te permite ingresar cantidades en cualquier moneda."
        }
      ],
      "chart": {
        "title": "Poder Adquisitivo a lo Largo del Tiempo",
        "xLabel": "Año",
        "yLabel": "Valor ($)",
        "series": {
          "adjustedValue": "Valor Equivalente",
          "purchasingPower": "Poder Adquisitivo"
        }
      },
      "detailedTable": {
        "inflationTimeline": {
          "button": "Ver Desglose Año por Año",
          "title": "Cronología de Inflación",
          "columns": {
            "year": "Año",
            "cpi": "IPC",
            "annualRate": "Tasa Anual",
            "cumulative": "Acumulativo",
            "equivalent": "Valor Equivalente"
          }
        }
      },
      "references": {
        "bls": "Oficina de Estadísticas Laborales — Índice de Precios al Consumidor",
        "fed": "Reserva Federal — Política Monetaria y Meta de Inflación"
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
      },
      "calculator": {
        "yourInformation": "Tu Información"
      }
    },
    pt: {
      "name": "Calculadora de Inflação",
      "slug": "calculadora-inflacao",
      "subtitle": "Calcule como a inflação afeta o poder de compra do seu dinheiro ao longo do tempo usando dados históricos do IPC ou taxas personalizadas",
      "breadcrumb": "Inflação",
      "seo": {
        "title": "Calculadora de Inflação — IPC Poder de Compra & Valor Futuro | Ferramenta Gratuita",
        "description": "Calcule o impacto da inflação no seu dinheiro com dados históricos do IPC americano de 1913-2025. Veja mudanças no poder de compra, compare crescimento salarial e projete custos futuros com nossa calculadora gratuita de inflação.",
        "shortDescription": "Calculadora gratuita de inflação com dados do IPC americano de 1913 a 2025.",
        "keywords": [
          "calculadora de inflação",
          "calculadora IPC",
          "calculadora poder de compra",
          "calculadora custo de vida",
          "calculadora taxa de inflação",
          "valor do dólar ao longo do tempo",
          "calculadora índice de preços ao consumidor",
          "ferramenta gratuita online inflação"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Valor",
          "helpText": "Digite o valor em dólar para ajustar pela inflação"
        },
        "fromYear": {
          "label": "Do Ano",
          "helpText": "Ano inicial"
        },
        "toYear": {
          "label": "Para o Ano",
          "helpText": "Ano final"
        },
        "useCustomRate": {
          "label": "Usar Taxa Personalizada",
          "helpText": "Use uma taxa de inflação personalizada em vez de dados históricos do IPC"
        },
        "inflationRate": {
          "label": "Taxa de Inflação Anual",
          "helpText": "Taxa média anual de inflação esperada"
        },
        "years": {
          "label": "Número de Anos",
          "helpText": "Quantos anos no futuro"
        },
        "includeSalary": {
          "label": "Comparar com Salário",
          "helpText": "Veja se seu salário acompanha a inflação"
        },
        "annualSalary": {
          "label": "Seu Salário Anual",
          "helpText": "Digite seu salário anual atual"
        },
        "salaryGrowthRate": {
          "label": "Crescimento Salarial Anual",
          "helpText": "Taxa esperada de aumento salarial anual"
        }
      },
      "results": {
        "adjustedValue": {
          "label": "Valor Equivalente"
        },
        "purchasingPower": {
          "label": "Poder de Compra"
        },
        "cumulativeInflation": {
          "label": "Inflação Acumulada"
        },
        "avgAnnualRate": {
          "label": "Taxa Anual Média"
        },
        "priceMultiplier": {
          "label": "Multiplicador de Preço"
        },
        "salaryNeeded": {
          "label": "Salário Necessário para Acompanhar"
        },
        "realSalaryChange": {
          "label": "Mudança Real do Salário"
        }
      },
      "presets": {
        "housing2000": {
          "label": "🏠 Habitação em 2000",
          "description": "Casa de $150K — quanto vale agora?"
        },
        "college1990": {
          "label": "🎓 Faculdade em 1990",
          "description": "Mensalidade de $10K então vs hoje"
        },
        "coffee1980": {
          "label": "☕ Café em 1980",
          "description": "Xícara de $0,50 — quanto custa agora?"
        },
        "future10k": {
          "label": "📈 Futuro $10K",
          "description": "$10K em 20 anos com inflação de 3%"
        }
      },
      "values": {
        "years": "anos",
        "year": "ano",
        "perYear": "por ano",
        "inDollars": "em dólares de {toYear}",
        "hadPowerOf": "tem o poder de compra de",
        "pricesAre": "Os preços estão",
        "timesHigher": "× maiores"
      },
      "formats": {
        "summaryHistorical": "{amount} em {fromYear} é equivalente a {adjustedValue} em {toYear} — uma inflação acumulada de {cumulativeInflation}.",
        "summaryCustom": "{amount} hoje terá o valor de {adjustedValue} em {years} anos com inflação anual de {rate}% — seu poder de compra cai para {purchasingPower}."
      },
      "infoCards": {
        "inflationImpact": {
          "title": "💡 Impacto da Inflação",
          "items": [
            {
              "label": "Anos para Duplicar Preços",
              "valueKey": "yearsToDouble"
            },
            {
              "label": "Ano de Maior Inflação",
              "valueKey": "highestYear"
            },
            {
              "label": "Ano de Menor Inflação",
              "valueKey": "lowestYear"
            },
            {
              "label": "Anos de Deflação no Período",
              "valueKey": "deflationYears"
            }
          ]
        },
        "realWorldExamples": {
          "title": "🛒 Antes vs Agora",
          "items": [
            {
              "label": "Galão de Gasolina",
              "valueKey": "gasThenNow"
            },
            {
              "label": "Ingresso de Cinema",
              "valueKey": "movieThenNow"
            },
            {
              "label": "Salário Mínimo EUA",
              "valueKey": "minWageThenNow"
            },
            {
              "label": "Preço Médio de Casa",
              "valueKey": "homeThenNow"
            }
          ]
        },
        "tips": {
          "title": "💰 Vencer a Inflação",
          "items": [
            "Invista em fundos de índice — o S&P 500 historicamente retorna ~10%/ano, superando a inflação em ~7%",
            "Considere I Bonds — títulos do Tesouro americano que se ajustam automaticamente à inflação, atualmente ~4% ao ano",
            "Negocie aumentos salariais de pelo menos 3-4% anualmente para manter o poder de compra",
            "Imóveis e TIPS (Títulos Protegidos contra Inflação do Tesouro) são proteções clássicas contra inflação"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatIsInflation": {
          "title": "O que é Inflação?",
          "content": "Inflação é a taxa pela qual o nível geral de preços de bens e serviços sobe ao longo do tempo, corroendo o poder de compra. Quando a inflação ocorre, cada unidade monetária compra menos bens e serviços do que antes. O Federal Reserve americano tem como meta uma taxa de inflação de cerca de 2% ao ano como saudável para o crescimento econômico. Inflação moderada incentiva gastos e investimentos, enquanto inflação muito alta (hiperinflação) ou deflação podem ser economicamente destrutivas."
        },
        "howCPIWorks": {
          "title": "Como Funciona o Índice de Preços ao Consumidor",
          "content": "O Índice de Preços ao Consumidor (IPC) é a medida mais utilizada de inflação nos Estados Unidos. Publicado mensalmente pelo Bureau of Labor Statistics (BLS), acompanha mudanças de preços de uma 'cesta' de aproximadamente 80.000 bens e serviços em 8 categorias principais: alimentação, habitação, vestuário, transporte, cuidados médicos, recreação, educação e outros bens. O IPC-U (Todos os Consumidores Urbanos) cobre cerca de 93% da população americana. O período base é 1982-84 = 100, significando que se o IPC atual for 320, os preços subiram 220% desde o início dos anos 1980."
        },
        "typesOfInflation": {
          "title": "Tipos de Inflação",
          "items": [
            {
              "text": "Inflação de Demanda: Quando a demanda por bens excede a oferta, empurrando os preços para cima — como os gastos com estímulo pós-pandemia",
              "type": "info"
            },
            {
              "text": "Inflação de Custos: Quando os custos de produção sobem (petróleo, salários, materiais), as empresas repassam os custos aos consumidores",
              "type": "info"
            },
            {
              "text": "Inflação Inercial: Ciclo auto-perpetuante onde trabalhadores exigem salários maiores esperando inflação, o que então causa mais inflação",
              "type": "info"
            },
            {
              "text": "Hiperinflação: Caso extremo (>50%/mês) — visto no Zimbábue em 2008 e Venezuela em 2018 onde as moedas se tornaram quase sem valor",
              "type": "warning"
            }
          ]
        },
        "calculationExamples": {
          "title": "Exemplos de Cálculo de Inflação",
          "description": "Exemplos passo a passo usando dados reais do IPC",
          "examples": [
            {
              "title": "$100 de 1990 para 2025",
              "steps": [
                "Busque valores do IPC: IPC 1990 = 130,7, IPC 2025 = 320,0",
                "Calcule a proporção: 320,0 ÷ 130,7 = 2,448",
                "Multiplique: $100 × 2,448 = $244,76",
                "Inflação acumulada: ((320,0 - 130,7) / 130,7) × 100 = 144,8%"
              ],
              "result": "$100 em 1990 tem o mesmo poder de compra que $244,76 em 2025"
            },
            {
              "title": "Valor futuro a 3% por 20 anos",
              "steps": [
                "Use fórmula composta: Futuro = Valor × (1 + taxa)^anos",
                "Futuro = $1.000 × (1,03)^20",
                "Futuro = $1.000 × 1,8061 = $1.806,11",
                "Poder de compra: $1.000 ÷ 1,8061 = $553,68"
              ],
              "result": "$1.000 hoje precisará de $1.806 para ter o mesmo poder de compra em 20 anos com inflação de 3%"
            }
          ]
        },
        "purchasingPower": {
          "title": "Entendendo o Poder de Compra",
          "content": "Poder de compra mede quanto você pode comprar com uma determinada quantia de dinheiro. Quando a inflação sobe, o poder de compra cai — significando que você precisa de mais dinheiro para comprar os mesmos bens. Por exemplo, $1 em 1913 tinha o poder de compra de aproximadamente $32 hoje. É por isso que simplesmente poupar dinheiro perde valor ao longo do tempo. Para preservar o poder de compra, seu dinheiro precisa crescer pelo menos tão rápido quanto a inflação. Esta é a razão fundamental pela qual investir importa: uma conta poupança rendendo 0,5% enquanto a inflação corre a 3% significa que você está perdendo 2,5% do poder de compra a cada ano, mesmo que seu saldo nominal cresça."
        },
        "historicalContext": {
          "title": "Períodos Notáveis de Inflação na História dos EUA",
          "content": "Os EUA experimentaram vários eventos significativos de inflação. O pico pós-Primeira Guerra (1917-1920) viu a inflação chegar a 18%. A Grande Depressão trouxe deflação severa (-10,3% em 1932). A 'Grande Inflação' dos anos 1970 atingiu o pico de 13,5% em 1980, impulsionada por crises do petróleo e política monetária frouxa — o presidente do Federal Reserve Paul Volcker famosamente elevou as taxas de juros para 20% para domá-la. A crise financeira de 2008 trouxe quase-deflação. Mais recentemente, estímulo pós-COVID combinado com interrupções na cadeia de suprimentos empurrou a inflação para 8% em 2022, a maior em 40 anos. O Federal Reserve respondeu com aumentos agressivos de taxa de quase zero para mais de 5% entre 2022-2023."
        }
      },
      "faqs": [
        {
          "question": "Qual é a taxa atual de inflação dos EUA?",
          "answer": "No final de 2025, a taxa de inflação dos últimos 12 meses nos EUA é aproximadamente 2,7%, medida pelo Índice de Preços ao Consumidor (IPC). A meta de taxa de inflação do Federal Reserve é 2% ao ano. A inflação atingiu o pico de 9,1% em junho de 2022 antes de declinar através de 2023-2025 devido aos aumentos de taxa do Federal Reserve."
        },
        {
          "question": "Como a inflação é calculada?",
          "answer": "A inflação é calculada usando o Índice de Preços ao Consumidor (IPC). O Bureau of Labor Statistics acompanha preços de cerca de 80.000 bens e serviços mensalmente. A taxa de inflação entre dois períodos é igual a: ((IPC_novo - IPC_antigo) / IPC_antigo) × 100. Por exemplo, se o IPC passou de 260 para 270, a inflação é (10/260) × 100 = 3,85%."
        },
        {
          "question": "Qual é a diferença entre IPC e PCE?",
          "answer": "IPC (Índice de Preços ao Consumidor) e PCE (Gastos de Consumo Pessoal) ambos medem inflação, mas diferem em escopo e ponderação. O IPC cobre apenas gastos diretos do consumidor, enquanto o PCE inclui gastos em nome dos consumidores (como seguro saúde do empregador). O Federal Reserve prefere PCE para decisões políticas, mas o IPC é usado para ajustes da Previdência Social e é mais amplamente citado na mídia."
        },
        {
          "question": "Como posso proteger meu dinheiro da inflação?",
          "answer": "Estratégias principais incluem: investir em ações (S&P 500 tem média de ~10% retornos anuais vs ~3% inflação), comprar I Bonds ou TIPS do Tesouro americano, investir em imóveis (valores de propriedade tendem a subir com inflação), diversificar em commodities, e negociar aumentos salariais que igualem ou excedam a inflação. Manter grandes quantias em contas poupança de baixo juro é uma das piores estratégias durante períodos inflacionários."
        },
        {
          "question": "O que é a Regra dos 72?",
          "answer": "A Regra dos 72 é uma maneira rápida de estimar quanto tempo leva para os preços dobrarem com uma dada taxa de inflação. Simplesmente divida 72 pela taxa de inflação. Com inflação de 3%, os preços dobram em aproximadamente 72 ÷ 3 = 24 anos. Com inflação de 7%, eles dobram em cerca de 10 anos. Esta mesma regra funciona para investimentos: com retornos de 10%, seu dinheiro dobra aproximadamente a cada 7,2 anos."
        },
        {
          "question": "Esta calculadora funciona para outros países?",
          "answer": "Os dados históricos do IPC nesta calculadora são especificamente para os Estados Unidos (dados IPC-U do BLS de 1913-2025). No entanto, você pode usar o modo Taxa Personalizada com a taxa média de inflação de qualquer país. Por exemplo, a Zona do Euro tem média de cerca de 2%, Reino Unido cerca de 2,5%, Brasil cerca de 5-6%, e Argentina experimentou taxas muito mais altas. O recurso multi-moeda permite inserir valores em qualquer moeda."
        }
      ],
      "chart": {
        "title": "Poder de Compra Ao Longo do Tempo",
        "xLabel": "Ano",
        "yLabel": "Valor ($)",
        "series": {
          "adjustedValue": "Valor Equivalente",
          "purchasingPower": "Poder de Compra"
        }
      },
      "detailedTable": {
        "inflationTimeline": {
          "button": "Ver Detalhamento Ano a Ano",
          "title": "Cronograma da Inflação",
          "columns": {
            "year": "Ano",
            "cpi": "IPC",
            "annualRate": "Taxa Anual",
            "cumulative": "Acumulada",
            "equivalent": "Valor Equivalente"
          }
        }
      },
      "references": {
        "bls": "Bureau of Labor Statistics — Índice de Preços ao Consumidor",
        "fed": "Federal Reserve — Política Monetária & Meta de Inflação"
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
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      }
    },
    fr: {
      "name": "Calculateur d'Inflation",
      "slug": "calculateur-inflation",
      "subtitle": "Calculez comment l'inflation affecte le pouvoir d'achat de votre argent au fil du temps en utilisant les données historiques d'IPC ou des taux personnalisés",
      "breadcrumb": "Inflation",
      "seo": {
        "title": "Calculateur d'Inflation — IPC, Pouvoir d'Achat et Valeur Future | Outil Gratuit",
        "description": "Calculez l'impact de l'inflation sur votre argent avec les données historiques d'IPC américaines de 1913-2025. Voyez les changements de pouvoir d'achat, comparez la croissance salariale et projetez les coûts futurs avec notre calculateur d'inflation gratuit.",
        "shortDescription": "Calculateur d'inflation gratuit avec données IPC américaines de 1913 à 2025.",
        "keywords": [
          "calculateur inflation",
          "calculateur IPC",
          "calculateur pouvoir achat",
          "calculateur coût vie",
          "calculateur taux inflation",
          "valeur dollar temps",
          "calculateur indice prix consommation",
          "outil inflation gratuit ligne"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Montant",
          "helpText": "Entrez le montant en dollars à ajuster pour l'inflation"
        },
        "fromYear": {
          "label": "Année de début",
          "helpText": "Année de départ"
        },
        "toYear": {
          "label": "Année de fin",
          "helpText": "Année d'arrivée"
        },
        "useCustomRate": {
          "label": "Utiliser un taux personnalisé",
          "helpText": "Utiliser un taux d'inflation personnalisé au lieu des données IPC historiques"
        },
        "inflationRate": {
          "label": "Taux d'inflation annuel",
          "helpText": "Taux d'inflation annuel moyen attendu"
        },
        "years": {
          "label": "Nombre d'années",
          "helpText": "Combien d'années dans le futur"
        },
        "includeSalary": {
          "label": "Comparer avec le salaire",
          "helpText": "Voir si votre salaire suit l'inflation"
        },
        "annualSalary": {
          "label": "Votre salaire annuel",
          "helpText": "Entrez votre salaire annuel actuel"
        },
        "salaryGrowthRate": {
          "label": "Croissance salariale annuelle",
          "helpText": "Taux d'augmentation salariale annuelle attendu"
        }
      },
      "results": {
        "adjustedValue": {
          "label": "Valeur équivalente"
        },
        "purchasingPower": {
          "label": "Pouvoir d'achat"
        },
        "cumulativeInflation": {
          "label": "Inflation cumulative"
        },
        "avgAnnualRate": {
          "label": "Taux annuel moyen"
        },
        "priceMultiplier": {
          "label": "Multiplicateur de prix"
        },
        "salaryNeeded": {
          "label": "Salaire nécessaire pour suivre"
        },
        "realSalaryChange": {
          "label": "Changement salarial réel"
        }
      },
      "presets": {
        "housing2000": {
          "label": "🏠 Logement en 2000",
          "description": "Maison 150K$ — quelle est sa valeur maintenant ?"
        },
        "college1990": {
          "label": "🎓 Université en 1990",
          "description": "10K$ de frais alors vs aujourd'hui"
        },
        "coffee1980": {
          "label": "☕ Café en 1980",
          "description": "0,50$ la tasse — combien ça coûte maintenant ?"
        },
        "future10k": {
          "label": "📈 10K$ futurs",
          "description": "10K$ dans 20 ans à 3% d'inflation"
        }
      },
      "values": {
        "years": "années",
        "year": "année",
        "perYear": "par an",
        "inDollars": "en dollars de {toYear}",
        "hadPowerOf": "a le pouvoir d'achat de",
        "pricesAre": "Les prix sont",
        "timesHigher": "× plus élevés"
      },
      "formats": {
        "summaryHistorical": "{amount} en {fromYear} équivaut à {adjustedValue} en {toYear} — une inflation cumulative de {cumulativeInflation}.",
        "summaryCustom": "{amount} aujourd'hui vaudra {adjustedValue} dans {years} ans à {rate}% d'inflation annuelle — votre pouvoir d'achat chute à {purchasingPower}."
      },
      "infoCards": {
        "inflationImpact": {
          "title": "💡 Impact de l'inflation",
          "items": [
            {
              "label": "Années pour doubler les prix",
              "valueKey": "yearsToDouble"
            },
            {
              "label": "Année d'inflation la plus élevée",
              "valueKey": "highestYear"
            },
            {
              "label": "Année d'inflation la plus basse",
              "valueKey": "lowestYear"
            },
            {
              "label": "Années de déflation dans la période",
              "valueKey": "deflationYears"
            }
          ]
        },
        "realWorldExamples": {
          "title": "🛒 Avant vs Maintenant",
          "items": [
            {
              "label": "Gallon d'essence",
              "valueKey": "gasThenNow"
            },
            {
              "label": "Billet de cinéma",
              "valueKey": "movieThenNow"
            },
            {
              "label": "Salaire minimum américain",
              "valueKey": "minWageThenNow"
            },
            {
              "label": "Prix médian d'une maison",
              "valueKey": "homeThenNow"
            }
          ]
        },
        "tips": {
          "title": "💰 Battre l'inflation",
          "items": [
            "Investissez dans les fonds indiciels — le S&P 500 a historiquement rapporté ~10%/an, battant l'inflation de ~7%",
            "Considérez les obligations I — obligations du Trésor américain qui s'ajustent automatiquement à l'inflation, actuellement ~4% de rendement",
            "Négociez des augmentations salariales d'au moins 3-4% annuellement pour maintenir le pouvoir d'achat",
            "L'immobilier et les TIPS (Titres du Trésor Protégés contre l'Inflation) sont des couvertures classiques contre l'inflation"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatIsInflation": {
          "title": "Qu'est-ce que l'inflation ?",
          "content": "L'inflation est le taux auquel le niveau général des prix des biens et services augmente au fil du temps, érodant le pouvoir d'achat. Lorsque l'inflation se produit, chaque unité monétaire achète moins de biens et services qu'auparavant. La Réserve fédérale américaine vise un taux d'inflation d'environ 2% par an comme étant sain pour la croissance économique. Une inflation modérée encourage les dépenses et l'investissement, tandis qu'une inflation très élevée (hyperinflation) ou la déflation peuvent être économiquement destructrices."
        },
        "howCPIWorks": {
          "title": "Comment fonctionne l'Indice des Prix à la Consommation",
          "content": "L'Indice des Prix à la Consommation (IPC) est la mesure d'inflation la plus largement utilisée aux États-Unis. Publié mensuellement par le Bureau des Statistiques du Travail (BLS), il suit les changements de prix pour un 'panier' d'environ 80 000 biens et services dans 8 catégories principales : alimentation, logement, vêtements, transport, soins médicaux, loisirs, éducation et autres biens. L'IPC-U (Tous les Consommateurs Urbains) couvre environ 93% de la population américaine. La période de base est 1982-84 = 100, ce qui signifie que si l'IPC d'aujourd'hui est de 320, les prix ont augmenté de 220% depuis le début des années 1980."
        },
        "typesOfInflation": {
          "title": "Types d'inflation",
          "items": [
            {
              "text": "Tirée par la demande : Quand la demande de biens dépasse l'offre, poussant les prix vers le haut — comme les dépenses de relance post-pandémie",
              "type": "info"
            },
            {
              "text": "Poussée par les coûts : Quand les coûts de production augmentent (pétrole, salaires, matériaux), les entreprises répercutent les coûts sur les consommateurs",
              "type": "info"
            },
            {
              "text": "Intégrée : Cycle auto-perpétuel où les travailleurs demandent des salaires plus élevés en s'attendant à l'inflation, ce qui cause ensuite plus d'inflation",
              "type": "info"
            },
            {
              "text": "Hyperinflation : Cas extrême (>50%/mois) — vu au Zimbabwe en 2008 et au Venezuela en 2018 où les monnaies sont devenues presque sans valeur",
              "type": "warning"
            }
          ]
        },
        "calculationExamples": {
          "title": "Exemples de calcul d'inflation",
          "description": "Exemples étape par étape utilisant des données IPC réelles",
          "examples": [
            {
              "title": "100$ de 1990 à 2025",
              "steps": [
                "Chercher les valeurs IPC : IPC 1990 = 130,7, IPC 2025 = 320,0",
                "Calculer le ratio : 320,0 ÷ 130,7 = 2,448",
                "Multiplier : 100$ × 2,448 = 244,76$",
                "Inflation cumulative : ((320,0 - 130,7) / 130,7) × 100 = 144,8%"
              ],
              "result": "100$ en 1990 a le même pouvoir d'achat que 244,76$ en 2025"
            },
            {
              "title": "Valeur future à 3% pendant 20 ans",
              "steps": [
                "Utiliser la formule composée : Futur = Montant × (1 + taux)^années",
                "Futur = 1 000$ × (1,03)^20",
                "Futur = 1 000$ × 1,8061 = 1 806,11$",
                "Pouvoir d'achat : 1 000$ ÷ 1,8061 = 553,68$"
              ],
              "result": "1 000$ aujourd'hui nécessitera 1 806$ pour avoir le même pouvoir d'achat dans 20 ans à 3% d'inflation"
            }
          ]
        },
        "purchasingPower": {
          "title": "Comprendre le pouvoir d'achat",
          "content": "Le pouvoir d'achat mesure combien vous pouvez acheter avec une somme d'argent donnée. Quand l'inflation augmente, le pouvoir d'achat diminue — ce qui signifie que vous avez besoin de plus d'argent pour acheter les mêmes biens. Par exemple, 1$ en 1913 avait le pouvoir d'achat d'environ 32$ aujourd'hui. C'est pourquoi simplement économiser de l'argent liquide perd de la valeur avec le temps. Pour préserver le pouvoir d'achat, votre argent doit croître au moins aussi vite que l'inflation. C'est la raison fondamentale pour laquelle investir importe : un compte d'épargne rapportant 0,5% alors que l'inflation tourne à 3% signifie que vous perdez 2,5% de pouvoir d'achat chaque année, même si votre solde nominal augmente."
        },
        "historicalContext": {
          "title": "Périodes d'inflation notables dans l'histoire américaine",
          "content": "Les États-Unis ont connu plusieurs événements d'inflation significatifs. Le pic post-Première Guerre mondiale (1917-1920) a vu l'inflation atteindre 18%. La Grande Dépression a apporté une déflation sévère (-10,3% en 1932). La 'Grande Inflation' des années 1970 a culminé à 13,5% en 1980, causée par les crises pétrolières et une politique monétaire laxiste — le président de la Réserve fédérale Paul Volcker a notamment relevé les taux d'intérêt à 20% pour la maîtriser. La crise financière de 2008 a apporté une quasi-déflation. Plus récemment, la relance post-COVID combinée aux perturbations de la chaîne d'approvisionnement a poussé l'inflation à 8% en 2022, le plus haut en 40 ans. La Réserve fédérale a répondu avec des hausses de taux agressives de près de zéro à plus de 5% entre 2022-2023."
        }
      },
      "faqs": [
        {
          "question": "Quel est le taux d'inflation actuel aux États-Unis ?",
          "answer": "Fin 2025, le taux d'inflation sur 12 mois glissants aux États-Unis est d'environ 2,7%, mesuré par l'Indice des Prix à la Consommation (IPC). Le taux d'inflation cible de la Réserve fédérale est de 2% par an. L'inflation a culminé à 9,1% en juin 2022 avant de décliner en 2023-2025 grâce aux hausses de taux de la Réserve fédérale."
        },
        {
          "question": "Comment l'inflation est-elle calculée ?",
          "answer": "L'inflation est calculée en utilisant l'Indice des Prix à la Consommation (IPC). Le Bureau des Statistiques du Travail suit mensuellement les prix d'environ 80 000 biens et services. Le taux d'inflation entre deux périodes égale : ((IPC_nouveau - IPC_ancien) / IPC_ancien) × 100. Par exemple, si l'IPC est passé de 260 à 270, l'inflation est (10/260) × 100 = 3,85%."
        },
        {
          "question": "Quelle est la différence entre IPC et PCE ?",
          "answer": "L'IPC (Indice des Prix à la Consommation) et le PCE (Dépenses de Consommation Personnelle) mesurent tous deux l'inflation mais diffèrent par leur portée et pondération. L'IPC ne couvre que les dépenses directes des consommateurs, tandis que le PCE inclut les dépenses au nom des consommateurs (comme l'assurance santé employeur). La Réserve fédérale préfère le PCE pour les décisions politiques, mais l'IPC est utilisé pour les ajustements de Sécurité Sociale et est plus largement cité dans les médias."
        },
        {
          "question": "Comment puis-je protéger mon argent de l'inflation ?",
          "answer": "Les stratégies clés incluent : investir en actions (le S&P 500 rapporte en moyenne ~10% annuel vs ~3% d'inflation), acheter des obligations I ou TIPS du Trésor américain, investir dans l'immobilier (les valeurs immobilières tendent à augmenter avec l'inflation), diversifier dans les matières premières, et négocier des augmentations salariales qui égalent ou dépassent l'inflation. Garder de gros montants dans des comptes d'épargne à faible intérêt est l'une des pires stratégies pendant les périodes inflationnistes."
        },
        {
          "question": "Qu'est-ce que la Règle de 72 ?",
          "answer": "La Règle de 72 est un moyen rapide d'estimer combien de temps il faut pour que les prix doublent à un taux d'inflation donné. Divisez simplement 72 par le taux d'inflation. À 3% d'inflation, les prix doublent en environ 72 ÷ 3 = 24 ans. À 7% d'inflation, ils doublent en environ 10 ans. Cette même règle fonctionne pour les investissements : à 10% de rendement, votre argent double environ tous les 7,2 ans."
        },
        {
          "question": "Ce calculateur fonctionne-t-il pour d'autres pays ?",
          "answer": "Les données IPC historiques de ce calculateur sont spécifiquement pour les États-Unis (données IPC-U du BLS de 1913-2025). Cependant, vous pouvez utiliser le mode Taux Personnalisé avec le taux d'inflation moyen de n'importe quel pays. Par exemple, la zone euro fait en moyenne environ 2%, le Royaume-Uni environ 2,5%, le Brésil environ 5-6%, et l'Argentine a connu des taux beaucoup plus élevés. La fonctionnalité multi-devises vous permet d'entrer des montants dans n'importe quelle devise."
        }
      ],
      "chart": {
        "title": "Pouvoir d'achat au fil du temps",
        "xLabel": "Année",
        "yLabel": "Valeur ($)",
        "series": {
          "adjustedValue": "Valeur équivalente",
          "purchasingPower": "Pouvoir d'achat"
        }
      },
      "detailedTable": {
        "inflationTimeline": {
          "button": "Voir la répartition année par année",
          "title": "Chronologie de l'inflation",
          "columns": {
            "year": "Année",
            "cpi": "IPC",
            "annualRate": "Taux annuel",
            "cumulative": "Cumulatif",
            "equivalent": "Valeur équivalente"
          }
        }
      },
      "references": {
        "bls": "Bureau des Statistiques du Travail — Indice des Prix à la Consommation",
        "fed": "Réserve Fédérale — Politique Monétaire et Cible d'Inflation"
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
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      }
    },
    de: {
      "name": "Inflationsrechner",
      "slug": "inflations-rechner",
      "subtitle": "Berechnen Sie, wie sich Inflation auf die Kaufkraft Ihres Geldes über die Zeit auswirkt, mit historischen VPI-Daten oder benutzerdefinierten Raten",
      "breadcrumb": "Inflation",
      "seo": {
        "title": "Inflationsrechner — VPI Kaufkraft & Zukunftswert | Kostenloses Tool",
        "description": "Berechnen Sie die Auswirkungen der Inflation auf Ihr Geld mit historischen US-VPI-Daten von 1913-2025. Sehen Sie Veränderungen der Kaufkraft, vergleichen Sie Gehaltswachstum und projizieren Sie zukünftige Kosten mit unserem kostenlosen Inflationsrechner.",
        "shortDescription": "Kostenloser Inflationsrechner mit US-VPI-Daten von 1913 bis 2025.",
        "keywords": [
          "Inflationsrechner",
          "VPI Rechner",
          "Kaufkraft Rechner",
          "Lebenshaltungskosten Rechner",
          "Inflationsrate Rechner",
          "Geldwert über Zeit",
          "Verbraucherpreisindex Rechner",
          "kostenloses Online Inflationstool"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Betrag",
          "helpText": "Geben Sie den Dollarbetrag ein, der inflationsbereinigt werden soll"
        },
        "fromYear": {
          "label": "Vom Jahr",
          "helpText": "Startjahr"
        },
        "toYear": {
          "label": "Bis Jahr",
          "helpText": "Endjahr"
        },
        "useCustomRate": {
          "label": "Benutzerdefinierte Rate verwenden",
          "helpText": "Verwenden Sie eine benutzerdefinierte Inflationsrate anstelle historischer VPI-Daten"
        },
        "inflationRate": {
          "label": "Jährliche Inflationsrate",
          "helpText": "Erwartete durchschnittliche jährliche Inflationsrate"
        },
        "years": {
          "label": "Anzahl Jahre",
          "helpText": "Wie viele Jahre in die Zukunft"
        },
        "includeSalary": {
          "label": "Mit Gehalt vergleichen",
          "helpText": "Sehen Sie, ob Ihr Gehalt mit der Inflation Schritt hält"
        },
        "annualSalary": {
          "label": "Ihr Jahresgehalt",
          "helpText": "Geben Sie Ihr aktuelles Jahresgehalt ein"
        },
        "salaryGrowthRate": {
          "label": "Jährliches Gehaltswachstum",
          "helpText": "Erwartete jährliche Gehaltserhöhungsrate"
        }
      },
      "results": {
        "adjustedValue": {
          "label": "Äquivalentwert"
        },
        "purchasingPower": {
          "label": "Kaufkraft"
        },
        "cumulativeInflation": {
          "label": "Kumulative Inflation"
        },
        "avgAnnualRate": {
          "label": "Durchschn. Jahresrate"
        },
        "priceMultiplier": {
          "label": "Preismultiplikator"
        },
        "salaryNeeded": {
          "label": "Benötigtes Gehalt zum Mithalten"
        },
        "realSalaryChange": {
          "label": "Reale Gehaltsveränderung"
        }
      },
      "presets": {
        "housing2000": {
          "label": "🏠 Wohnen im Jahr 2000",
          "description": "$150K Haus — was ist es heute wert?"
        },
        "college1990": {
          "label": "🎓 Studium 1990",
          "description": "$10K Studiengebühren damals vs. heute"
        },
        "coffee1980": {
          "label": "☕ Kaffee 1980",
          "description": "$0,50 Tasse — was kostet sie jetzt?"
        },
        "future10k": {
          "label": "📈 Zukünftige $10K",
          "description": "$10K in 20 Jahren bei 3% Inflation"
        }
      },
      "values": {
        "years": "Jahre",
        "year": "Jahr",
        "perYear": "pro Jahr",
        "inDollars": "in {toYear} Dollar",
        "hadPowerOf": "hat die Kaufkraft von",
        "pricesAre": "Preise sind",
        "timesHigher": "× höher"
      },
      "formats": {
        "summaryHistorical": "{amount} im Jahr {fromYear} entspricht {adjustedValue} im Jahr {toYear} — eine kumulative Inflation von {cumulativeInflation}.",
        "summaryCustom": "{amount} heute wird sich wie {adjustedValue} in {years} Jahren bei {rate}% jährlicher Inflation anfühlen — Ihre Kaufkraft sinkt auf {purchasingPower}."
      },
      "infoCards": {
        "inflationImpact": {
          "title": "💡 Inflationsauswirkungen",
          "items": [
            {
              "label": "Jahre bis Preise sich verdoppeln",
              "valueKey": "yearsToDouble"
            },
            {
              "label": "Höchste Inflationsjahr",
              "valueKey": "highestYear"
            },
            {
              "label": "Niedrigste Inflationsjahr",
              "valueKey": "lowestYear"
            },
            {
              "label": "Deflationsjahre im Zeitraum",
              "valueKey": "deflationYears"
            }
          ]
        },
        "realWorldExamples": {
          "title": "🛒 Damals vs. Heute",
          "items": [
            {
              "label": "Liter Benzin",
              "valueKey": "gasThenNow"
            },
            {
              "label": "Kinokarte",
              "valueKey": "movieThenNow"
            },
            {
              "label": "US-Mindestlohn",
              "valueKey": "minWageThenNow"
            },
            {
              "label": "Median Hauspreis",
              "valueKey": "homeThenNow"
            }
          ]
        },
        "tips": {
          "title": "💰 Inflation schlagen",
          "items": [
            "Investieren Sie in Indexfonds — der S&P 500 hat historisch ~10%/Jahr erzielt und die Inflation um ~7% geschlagen",
            "Erwägen Sie I-Bonds — US-Staatsanleihen, die sich automatisch an die Inflation anpassen, derzeit ~4% APY",
            "Verhandeln Sie Gehaltserhöhungen von mindestens 3-4% jährlich, um die Kaufkraft zu erhalten",
            "Immobilien und TIPS (Treasury Inflation-Protected Securities) sind klassische Inflationsabsicherungen"
          ]
        }
      },
      "referenceData": {},
      "education": {
        "whatIsInflation": {
          "title": "Was ist Inflation?",
          "content": "Inflation ist die Rate, mit der das allgemeine Preisniveau für Waren und Dienstleistungen über die Zeit steigt und dabei die Kaufkraft erodiert. Bei Inflation kann jede Währungseinheit weniger Waren und Dienstleistungen kaufen als zuvor. Die US-Notenbank strebt eine Inflationsrate von etwa 2% pro Jahr als gesund für das Wirtschaftswachstum an. Moderate Inflation ermutigt zu Ausgaben und Investitionen, während sehr hohe Inflation (Hyperinflation) oder Deflation wirtschaftlich zerstörerisch sein können."
        },
        "howCPIWorks": {
          "title": "Wie der Verbraucherpreisindex funktioniert",
          "content": "Der Verbraucherpreisindex (VPI) ist das am weitesten verbreitete Maß für Inflation in den Vereinigten Staaten. Monatlich vom Bureau of Labor Statistics (BLS) veröffentlicht, verfolgt er Preisveränderungen für einen 'Warenkorb' von etwa 80.000 Waren und Dienstleistungen in 8 Hauptkategorien: Lebensmittel, Wohnen, Bekleidung, Transport, medizinische Versorgung, Erholung, Bildung und andere Waren. Der VPI-U (Alle städtischen Verbraucher) erfasst etwa 93% der US-Bevölkerung. Die Basisperiode ist 1982-84 = 100, was bedeutet, dass bei einem heutigen VPI von 320 die Preise seit den frühen 1980er Jahren um 220% gestiegen sind."
        },
        "typesOfInflation": {
          "title": "Arten von Inflation",
          "items": [
            {
              "text": "Nachfrage-induziert: Wenn die Nachfrage nach Gütern das Angebot übersteigt und die Preise nach oben treibt — wie bei Stimulus-Ausgaben nach der Pandemie",
              "type": "info"
            },
            {
              "text": "Kosten-induziert: Wenn Produktionskosten steigen (Öl, Löhne, Materialien), geben Unternehmen Kosten an Verbraucher weiter",
              "type": "info"
            },
            {
              "text": "Eingebaut: Sich selbst perpetuierender Zyklus, bei dem Arbeiter höhere Löhne fordern in Erwartung von Inflation, was dann mehr Inflation verursacht",
              "type": "info"
            },
            {
              "text": "Hyperinflation: Extremfall (>50%/Monat) — gesehen in Simbabwe 2008 und Venezuela 2018, wo Währungen nahezu wertlos wurden",
              "type": "warning"
            }
          ]
        },
        "calculationExamples": {
          "title": "Inflationsberechnungsbeispiele",
          "description": "Schritt-für-Schritt-Beispiele mit echten VPI-Daten",
          "examples": [
            {
              "title": "$100 von 1990 bis 2025",
              "steps": [
                "VPI-Werte nachschlagen: 1990 VPI = 130,7, 2025 VPI = 320,0",
                "Verhältnis berechnen: 320,0 ÷ 130,7 = 2,448",
                "Multiplizieren: $100 × 2,448 = $244,76",
                "Kumulative Inflation: ((320,0 - 130,7) / 130,7) × 100 = 144,8%"
              ],
              "result": "$100 im Jahr 1990 haben die gleiche Kaufkraft wie $244,76 im Jahr 2025"
            },
            {
              "title": "Zukunftswert bei 3% für 20 Jahre",
              "steps": [
                "Zinseszinsformel verwenden: Zukunft = Betrag × (1 + Rate)^Jahre",
                "Zukunft = $1.000 × (1,03)^20",
                "Zukunft = $1.000 × 1,8061 = $1.806,11",
                "Kaufkraft: $1.000 ÷ 1,8061 = $553,68"
              ],
              "result": "$1.000 heute benötigen $1.806, um die gleiche Kaufkraft in 20 Jahren bei 3% Inflation zu haben"
            }
          ]
        },
        "purchasingPower": {
          "title": "Kaufkraft verstehen",
          "content": "Kaufkraft misst, wie viel Sie mit einem bestimmten Geldbetrag kaufen können. Wenn die Inflation steigt, fällt die Kaufkraft — das bedeutet, Sie benötigen mehr Geld, um die gleichen Waren zu kaufen. Zum Beispiel hatte $1 im Jahr 1913 die Kaufkraft von etwa $32 heute. Deshalb verliert das einfache Sparen von Bargeld über die Zeit an Wert. Um die Kaufkraft zu erhalten, muss Ihr Geld mindestens so schnell wachsen wie die Inflation. Dies ist der grundlegende Grund, warum Investieren wichtig ist: Ein Sparkonto mit 0,5% Zinsen bei 3% Inflation bedeutet, dass Sie jedes Jahr 2,5% Kaufkraft verlieren, obwohl Ihr nominaler Saldo wächst."
        },
        "historicalContext": {
          "title": "Bemerkenswerte Inflationsperioden in der US-Geschichte",
          "content": "Die USA haben mehrere bedeutende Inflationsereignisse erlebt. Der Anstieg nach dem Ersten Weltkrieg (1917-1920) erreichte 18% Inflation. Die Große Depression brachte schwere Deflation (-10,3% im Jahr 1932). Die 'Große Inflation' der 1970er Jahre erreichte 1980 13,5%, getrieben von Ölkrisen und lockerer Geldpolitik — Fed-Vorsitzender Paul Volcker erhöhte berühmt die Zinssätze auf 20%, um sie zu zähmen. Die Finanzkrise 2008 brachte beinahe Deflation. Zuletzt trieben COVID-Stimulus kombiniert mit Lieferkettenstörungen die Inflation 2022 auf 8%, den höchsten Stand seit 40 Jahren. Die Fed reagierte mit aggressiven Zinserhöhungen von nahe null auf über 5% zwischen 2022-2023."
        }
      },
      "faqs": [
        {
          "question": "Wie hoch ist die aktuelle US-Inflationsrate?",
          "answer": "Ende 2025 beträgt die nachlaufende 12-Monats-Inflationsrate in den USA etwa 2,7%, gemessen am Verbraucherpreisindex (VPI). Die Ziel-Inflationsrate der Federal Reserve beträgt 2% pro Jahr. Die Inflation erreichte im Juni 2022 einen Höhepunkt von 9,1%, bevor sie durch 2023-2025 aufgrund der Zinserhöhungen der Federal Reserve sank."
        },
        {
          "question": "Wie wird Inflation berechnet?",
          "answer": "Inflation wird mit dem Verbraucherpreisindex (VPI) berechnet. Das Bureau of Labor Statistics verfolgt monatlich Preise von etwa 80.000 Waren und Dienstleistungen. Die Inflationsrate zwischen zwei Perioden entspricht: ((VPI_neu - VPI_alt) / VPI_alt) × 100. Wenn beispielsweise der VPI von 260 auf 270 stieg, beträgt die Inflation (10/260) × 100 = 3,85%."
        },
        {
          "question": "Was ist der Unterschied zwischen VPI und PCE?",
          "answer": "VPI (Verbraucherpreisindex) und PCE (Persönliche Konsumausgaben) messen beide Inflation, unterscheiden sich aber in Umfang und Gewichtung. VPI erfasst nur direkte Verbraucherausgaben, während PCE Ausgaben im Namen von Verbrauchern einschließt (wie Arbeitgeber-Krankenversicherung). Die Federal Reserve bevorzugt PCE für politische Entscheidungen, aber VPI wird für Sozialversicherungsanpassungen verwendet und ist in den Medien weiter verbreitet."
        },
        {
          "question": "Wie kann ich mein Geld vor Inflation schützen?",
          "answer": "Wichtige Strategien umfassen: Investitionen in Aktien (S&P 500 erzielt durchschnittlich ~10% jährliche Rendite vs. ~3% Inflation), Kauf von I-Bonds oder TIPS vom US-Finanzministerium, Investitionen in Immobilien (Immobilienwerte steigen tendenziell mit der Inflation), Diversifizierung in Rohstoffe und Verhandlung von Gehaltserhöhungen, die die Inflation erreichen oder übertreffen. Große Beträge auf niedrig verzinsten Sparkonten zu halten ist eine der schlechtesten Strategien während inflationären Zeiten."
        },
        {
          "question": "Was ist die 72er-Regel?",
          "answer": "Die 72er-Regel ist eine schnelle Methode, um abzuschätzen, wie lange es dauert, bis sich Preise bei einer bestimmten Inflationsrate verdoppeln. Teilen Sie einfach 72 durch die Inflationsrate. Bei 3% Inflation verdoppeln sich die Preise in etwa 72 ÷ 3 = 24 Jahren. Bei 7% Inflation verdoppeln sie sich in etwa 10 Jahren. Diese Regel funktioniert auch für Investitionen: Bei 10% Rendite verdoppelt sich Ihr Geld etwa alle 7,2 Jahre."
        },
        {
          "question": "Funktioniert dieser Rechner für andere Länder?",
          "answer": "Die historischen VPI-Daten in diesem Rechner sind spezifisch für die Vereinigten Staaten (BLS VPI-U Daten von 1913-2025). Sie können jedoch den Benutzerdefinierten Modus mit der durchschnittlichen Inflationsrate eines anderen Landes verwenden. Zum Beispiel liegt die Eurozone bei etwa 2%, UK bei etwa 2,5%, Brasilien bei etwa 5-6%, und Argentinien hat viel höhere Raten erlebt. Die Mehrwährungsfunktion ermöglicht es, Beträge in jeder Währung einzugeben."
        }
      ],
      "chart": {
        "title": "Kaufkraft über die Zeit",
        "xLabel": "Jahr",
        "yLabel": "Wert ($)",
        "series": {
          "adjustedValue": "Äquivalentwert",
          "purchasingPower": "Kaufkraft"
        }
      },
      "detailedTable": {
        "inflationTimeline": {
          "button": "Jahr-für-Jahr-Aufschlüsselung anzeigen",
          "title": "Inflationszeitlinie",
          "columns": {
            "year": "Jahr",
            "cpi": "VPI",
            "annualRate": "Jahresrate",
            "cumulative": "Kumulativ",
            "equivalent": "Äquivalentwert"
          }
        }
      },
      "references": {
        "bls": "Bureau of Labor Statistics — Verbraucherpreisindex",
        "fed": "Federal Reserve — Geldpolitik & Inflationsziel"
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
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      }
    },
  },

  inputs: [
    // Amount (main input with currency dropdown)
    {
      id: "amount",
      type: "number",
      defaultValue: null,
      placeholder: "1000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },

    // ── Historical CPI Mode (default) ──
    {
      id: "fromYear",
      type: "select",
      defaultValue: "2000",
      options: yearOptions,
      width: "half" as const,
      showWhen: { field: "useCustomRate", value: false },
    },
    {
      id: "toYear",
      type: "select",
      defaultValue: "2025",
      options: yearOptions,
      width: "half" as const,
      showWhen: { field: "useCustomRate", value: false },
    },

    // ── Toggle: Custom Rate Mode ──
    {
      id: "useCustomRate",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "inflationRate",
      type: "number",
      defaultValue: 3,
      min: 0.1,
      max: 30,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "useCustomRate", value: true },
    },
    {
      id: "years",
      type: "stepper",
      defaultValue: 10,
      min: 1,
      max: 100,
      step: 1,
      suffix: "years",
      showWhen: { field: "useCustomRate", value: true },
    },

    // ── Toggle: Salary Comparison ──
    {
      id: "includeSalary",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "annualSalary",
      type: "number",
      defaultValue: null,
      placeholder: "65000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeSalary", value: true },
    },
    {
      id: "salaryGrowthRate",
      type: "number",
      defaultValue: 2.5,
      min: 0,
      max: 20,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeSalary", value: true },
    },
  ],

  inputGroups: [],

  results: [
    { id: "adjustedValue", type: "primary", format: "number" },
    { id: "purchasingPower", type: "secondary", format: "number" },
    { id: "cumulativeInflation", type: "secondary", format: "percent" },
    { id: "avgAnnualRate", type: "secondary", format: "percent" },
    { id: "priceMultiplier", type: "secondary", format: "text" },
    { id: "salaryNeeded", type: "secondary", format: "number", showWhen: { field: "includeSalary", value: true } },
    { id: "realSalaryChange", type: "secondary", format: "text", showWhen: { field: "includeSalary", value: true } },
  ],

  infoCards: [
    { id: "inflationImpact", type: "list", icon: "💡", itemCount: 4 },
    { id: "realWorldExamples", type: "list", icon: "🛒", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💰", itemCount: 4 },
  ],

  chart: {
    id: "inflationChart",
    type: "composed",
    xKey: "year",
    height: 320,
    stacked: false,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "adjustedValue", type: "area", color: "#ef4444" },
      { key: "purchasingPower", type: "area", color: "#3b82f6" },
    ],
  },

  detailedTable: {
    id: "inflationTimeline",
    buttonLabel: "View Year-by-Year Breakdown",
    buttonIcon: "📊",
    modalTitle: "Inflation Timeline",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "cpi", label: "CPI", align: "right" },
      { id: "annualRate", label: "Annual Rate", align: "right" },
      { id: "cumulative", label: "Cumulative", align: "right" },
      { id: "equivalent", label: "Equivalent Value", align: "right", highlight: true },
    ],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIsInflation", type: "prose", icon: "📖" },
    { id: "howCPIWorks", type: "prose", icon: "📊" },
    { id: "typesOfInflation", type: "list", icon: "📋", itemCount: 4 },
    { id: "calculationExamples", type: "code-example", icon: "🧮", exampleCount: 2 },
    { id: "purchasingPower", type: "prose", icon: "💵" },
    { id: "historicalContext", type: "prose", icon: "📜" },
  ],

  faqs: [
    { id: "q1" }, { id: "q2" }, { id: "q3" },
    { id: "q4" }, { id: "q5" }, { id: "q6" },
  ],

  references: [
    {
      id: "bls",
      author: "U.S. Bureau of Labor Statistics",
      year: 2025,
      title: "Consumer Price Index (CPI) Databases",
      publisher: "U.S. Department of Labor",
      url: "https://www.bls.gov/cpi/",
    },
    {
      id: "fed",
      author: "Board of Governors of the Federal Reserve System",
      year: 2025,
      title: "Why does the Federal Reserve aim for inflation of 2 percent?",
      publisher: "Federal Reserve",
      url: "https://www.federalreserve.gov/faqs/economy_14400.htm",
    },
  ],

  hero: {
    badge: "📈 Finance",
    badgeVariant: "blue",
  },

  sidebar: {
    showNewsletter: true,
    showRelated: true,
  },

  features: {
    pdf: true,
    csv: true,
    excel: true,
    save: true,
    share: true,
    print: true,
  },

  relatedCalculators: [
    "compound-interest-calculator",
    "investment-calculator",
    "savings-goal-calculator",
    "salary-converter",
  ],

  ads: {
    showTopBanner: true,
    showSidebar: true,
    showInContent: true,
  },
};

// ══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ══════════════════════════════════════════════════════════════
export function calculateInflationCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  unitSystem?: "metric" | "imperial";
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;

  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const amount = values.amount as number | null;
  const useCustomRate = values.useCustomRate as boolean;
  const includeSalary = values.includeSalary as boolean;

  // ── Validate required inputs ──
  if (amount === null || amount === undefined || amount <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  let adjustedValue: number;
  let purchasingPower: number;
  let cumulativeInflation: number;
  let avgAnnualRate: number;
  let priceMultiplier: number;
  let numYears: number;
  let chartData: Array<Record<string, unknown>> = [];
  let tableData: Array<Record<string, string>> = [];

  // InfoCard metrics
  let yearsToDouble = "";
  let highestYear = "";
  let lowestYear = "";
  let deflationYears = "";

  // Real-world comparisons
  let gasThenNow = "";
  let movieThenNow = "";
  let minWageThenNow = "";
  let homeThenNow = "";

  if (!useCustomRate) {
    // ═══════════════════════════════════════════
    // HISTORICAL CPI MODE
    // ═══════════════════════════════════════════
    const fromYear = Number(values.fromYear) || 2000;
    const toYear = Number(values.toYear) || 2025;

    const cpiFrom = US_CPI[fromYear];
    const cpiTo = US_CPI[toYear];

    if (!cpiFrom || !cpiTo) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    numYears = Math.abs(toYear - fromYear);
    if (numYears === 0) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const ratio = cpiTo / cpiFrom;
    adjustedValue = amount * ratio;
    purchasingPower = amount / ratio;
    cumulativeInflation = (ratio - 1) * 100;
    avgAnnualRate = (Math.pow(ratio, 1 / numYears) - 1) * 100;
    priceMultiplier = ratio;

    // ── Year-by-year chart & table data ──
    const startYear = Math.min(fromYear, toYear);
    const endYear = Math.max(fromYear, toYear);

    let highInf = -Infinity;
    let lowInf = Infinity;
    let highInfYear = startYear;
    let lowInfYear = startYear;
    let deflationCount = 0;

    for (let y = startYear; y <= endYear; y++) {
      const cpiY = US_CPI[y];
      if (!cpiY) continue;

      const ratioY = cpiY / cpiFrom;
      const eqValue = amount * ratioY;
      const ppValue = amount / ratioY;
      const cumPct = (ratioY - 1) * 100;

      // Annual rate
      let annualRate = 0;
      if (y > startYear && US_CPI[y - 1]) {
        annualRate = ((cpiY - US_CPI[y - 1]) / US_CPI[y - 1]) * 100;

        if (annualRate > highInf) { highInf = annualRate; highInfYear = y; }
        if (annualRate < lowInf) { lowInf = annualRate; lowInfYear = y; }
        if (annualRate < 0) deflationCount++;
      }

      chartData.push({
        year: String(y),
        adjustedValue: Math.round(eqValue * 100) / 100,
        purchasingPower: Math.round(ppValue * 100) / 100,
      });

      tableData.push({
        year: String(y),
        cpi: cpiY.toFixed(1),
        annualRate: y === startYear ? "—" : `${annualRate >= 0 ? "+" : ""}${annualRate.toFixed(1)}%`,
        cumulative: y === startYear ? "0.0%" : `${cumPct >= 0 ? "+" : ""}${cumPct.toFixed(1)}%`,
        equivalent: `$${eqValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      });
    }

    // InfoCard: Inflation Impact
    yearsToDouble = avgAnnualRate > 0 ? `~${Math.round(72 / avgAnnualRate)} years (Rule of 72)` : "N/A (deflation)";
    highestYear = highInf > -Infinity ? `${highInfYear} (+${highInf.toFixed(1)}%)` : "N/A";
    lowestYear = lowInf < Infinity ? `${lowInfYear} (${lowInf.toFixed(1)}%)` : "N/A";
    deflationYears = `${deflationCount} year${deflationCount !== 1 ? "s" : ""}`;

    // InfoCard: Real-world examples (approximate US averages)
    const realWorldData: Record<number, { gas: number; movie: number; minWage: number; home: number }> = {
      1913: { gas: 0.12, movie: 0.07, minWage: 0, home: 3500 },
      1920: { gas: 0.30, movie: 0.15, minWage: 0, home: 5000 },
      1930: { gas: 0.20, movie: 0.25, minWage: 0, home: 4800 },
      1940: { gas: 0.18, movie: 0.24, minWage: 0.30, home: 3000 },
      1950: { gas: 0.27, movie: 0.46, minWage: 0.75, home: 7400 },
      1960: { gas: 0.31, movie: 0.69, minWage: 1.00, home: 12700 },
      1970: { gas: 0.36, movie: 1.55, minWage: 1.60, home: 23400 },
      1980: { gas: 1.19, movie: 2.69, minWage: 3.10, home: 47200 },
      1990: { gas: 1.16, movie: 4.23, minWage: 3.80, home: 79100 },
      2000: { gas: 1.51, movie: 5.39, minWage: 5.15, home: 119600 },
      2005: { gas: 2.30, movie: 6.41, minWage: 5.15, home: 167500 },
      2010: { gas: 2.79, movie: 7.89, minWage: 7.25, home: 173100 },
      2015: { gas: 2.43, movie: 8.43, minWage: 7.25, home: 223900 },
      2020: { gas: 2.17, movie: 9.16, minWage: 7.25, home: 284600 },
      2025: { gas: 3.30, movie: 11.00, minWage: 7.25, home: 420000 },
    };

    // Find closest years with data
    const closestFrom = CPI_YEARS.reduce((prev, curr) =>
      Math.abs(curr - fromYear) < Math.abs(prev - fromYear) && realWorldData[curr] ? curr : prev, 2000);
    const closestTo = CPI_YEARS.reduce((prev, curr) =>
      Math.abs(curr - toYear) < Math.abs(prev - toYear) && realWorldData[curr] ? curr : prev, 2025);

    const rwFrom = realWorldData[closestFrom] || realWorldData[2000];
    const rwTo = realWorldData[closestTo] || realWorldData[2025];

    if (rwFrom && rwTo) {
      gasThenNow = `$${rwFrom.gas.toFixed(2)} → $${rwTo.gas.toFixed(2)}`;
      movieThenNow = `$${rwFrom.movie.toFixed(2)} → $${rwTo.movie.toFixed(2)}`;
      minWageThenNow = rwFrom.minWage > 0 ? `$${rwFrom.minWage.toFixed(2)} → $${rwTo.minWage.toFixed(2)}/hr` : `N/A → $${rwTo.minWage.toFixed(2)}/hr`;
      homeThenNow = `$${(rwFrom.home / 1000).toFixed(0)}K → $${(rwTo.home / 1000).toFixed(0)}K`;
    }

  } else {
    // ═══════════════════════════════════════════
    // CUSTOM RATE MODE
    // ═══════════════════════════════════════════
    const inflationRate = (values.inflationRate as number) || 3;
    numYears = (values.years as number) || 10;

    const rate = inflationRate / 100;
    priceMultiplier = Math.pow(1 + rate, numYears);
    adjustedValue = amount * priceMultiplier;
    purchasingPower = amount / priceMultiplier;
    cumulativeInflation = (priceMultiplier - 1) * 100;
    avgAnnualRate = inflationRate;

    // ── Year-by-year chart & table data ──
    const currentYear = new Date().getFullYear();
    for (let y = 0; y <= numYears; y++) {
      const mult = Math.pow(1 + rate, y);
      const eqValue = amount * mult;
      const ppValue = amount / mult;
      const cumPct = (mult - 1) * 100;

      chartData.push({
        year: String(currentYear + y),
        adjustedValue: Math.round(eqValue * 100) / 100,
        purchasingPower: Math.round(ppValue * 100) / 100,
      });

      tableData.push({
        year: String(currentYear + y),
        cpi: "—",
        annualRate: y === 0 ? "—" : `+${inflationRate.toFixed(1)}%`,
        cumulative: y === 0 ? "0.0%" : `+${cumPct.toFixed(1)}%`,
        equivalent: `$${eqValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      });
    }

    // InfoCard: Custom rate mode
    yearsToDouble = `~${Math.round(72 / inflationRate)} years (Rule of 72)`;
    highestYear = `Fixed at ${inflationRate}%`;
    lowestYear = `Fixed at ${inflationRate}%`;
    deflationYears = "0 years (custom rate)";

    // Real-world: not applicable for custom mode
    gasThenNow = "Use Historical CPI mode";
    movieThenNow = "Use Historical CPI mode";
    minWageThenNow = "Use Historical CPI mode";
    homeThenNow = "Use Historical CPI mode";
  }

  // ── Salary comparison ──
  let salaryNeeded = 0;
  let realSalaryChange = 0;
  let futureSalary = 0;
  let salaryNeededFormatted = "";
  let realSalaryChangeFormatted = "";

  if (includeSalary) {
    const annualSalary = (values.annualSalary as number) || 0;
    const salaryGrowthRate = (values.salaryGrowthRate as number) || 2.5;

    if (annualSalary > 0) {
      salaryNeeded = annualSalary * priceMultiplier;
      futureSalary = annualSalary * Math.pow(1 + salaryGrowthRate / 100, numYears);
      realSalaryChange = ((futureSalary / salaryNeeded) - 1) * 100;

      salaryNeededFormatted = `$${salaryNeeded.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
      realSalaryChangeFormatted = `${realSalaryChange >= 0 ? "+" : ""}${realSalaryChange.toFixed(1)}% ${realSalaryChange >= 0 ? "real gain" : "purchasing power lost"}`;
    }
  }

  // ── Format values ──
  const fmtCurrency = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const fmtPct = (n: number) => `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;

  // ── Build summary ──
  let summary = "";
  if (!useCustomRate) {
    const fromYear = Number(values.fromYear) || 2000;
    const toYear = Number(values.toYear) || 2025;
    summary = (f.summaryHistorical || "{amount} in {fromYear} is equivalent to {adjustedValue} in {toYear} — a cumulative inflation of {cumulativeInflation}.")
      .replace("{amount}", fmtCurrency(amount))
      .replace("{fromYear}", String(fromYear))
      .replace("{adjustedValue}", fmtCurrency(adjustedValue))
      .replace("{toYear}", String(toYear))
      .replace("{cumulativeInflation}", fmtPct(cumulativeInflation));
  } else {
    const rate = (values.inflationRate as number) || 3;
    summary = (f.summaryCustom || "{amount} today will feel like {adjustedValue} in {years} years at {rate}% annual inflation — your purchasing power drops to {purchasingPower}.")
      .replace("{amount}", fmtCurrency(amount))
      .replace("{adjustedValue}", fmtCurrency(adjustedValue))
      .replace("{years}", String(numYears))
      .replace("{rate}", String(rate))
      .replace("{purchasingPower}", fmtCurrency(purchasingPower));
  }

  return {
    values: {
      adjustedValue,
      purchasingPower,
      cumulativeInflation,
      avgAnnualRate,
      priceMultiplier,
      salaryNeeded,
      realSalaryChange,
      // InfoCard values
      yearsToDouble,
      highestYear,
      lowestYear,
      deflationYears,
      gasThenNow,
      movieThenNow,
      minWageThenNow,
      homeThenNow,
    },
    formatted: {
      adjustedValue: fmtCurrency(adjustedValue),
      purchasingPower: fmtCurrency(purchasingPower),
      cumulativeInflation: fmtPct(cumulativeInflation),
      avgAnnualRate: fmtPct(avgAnnualRate),
      priceMultiplier: `${priceMultiplier.toFixed(2)}×`,
      salaryNeeded: salaryNeededFormatted,
      realSalaryChange: realSalaryChangeFormatted,
      // InfoCard formatted
      yearsToDouble,
      highestYear,
      lowestYear,
      deflationYears,
      gasThenNow,
      movieThenNow,
      minWageThenNow,
      homeThenNow,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default inflationCalculatorConfig;
