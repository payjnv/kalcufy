import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// =============================================================================
// LOAN CALCULATOR V4 — Generic Loan Payment & Amortization Calculator
// SEO Target: "loan calculator" (~2-5M/mo global), "loan payment calculator",
//             "loan amortization calculator", "loan interest calculator"
// Differentiators: Extra payments + Term comparison table + True Cost Multiplier
//                  + Multi-currency + 5 languages + Amortization schedule
// =============================================================================

export const loanCalculatorConfig: CalculatorConfigV4 = {
  id: "loan-calculator",
  version: "4.0",
  category: "finance",
  icon: "💰",

  // ---------------------------------------------------------------------------
  // PRESETS
  // ---------------------------------------------------------------------------
  presets: [
    {
      id: "carLoan",
      icon: "🚗",
      values: { loanAmount: 25000, interestRate: 6.5, loanTerm: 5, extraPayment: 0 },
    },
    {
      id: "homeImprovement",
      icon: "🏠",
      values: { loanAmount: 15000, interestRate: 8.5, loanTerm: 3, extraPayment: 0 },
    },
    {
      id: "studentLoan",
      icon: "🎓",
      values: { loanAmount: 35000, interestRate: 5.5, loanTerm: 10, extraPayment: 0 },
    },
    {
      id: "debtConsolidation",
      icon: "💳",
      values: { loanAmount: 10000, interestRate: 12, loanTerm: 3, extraPayment: 50 },
    },
    {
      id: "businessLoan",
      icon: "🏢",
      values: { loanAmount: 50000, interestRate: 9, loanTerm: 7, extraPayment: 0 },
    },
  ],

  // ---------------------------------------------------------------------------
  // TRANSLATIONS (EN only — script translates to ES/PT/FR/DE)
  // ---------------------------------------------------------------------------
  t: {
    en: {
      name: "Loan Calculator",
      slug: "loan-calculator",
      subtitle: "Calculate your monthly loan payment, total interest, and view a full amortization schedule. See how extra payments save you money.",
      breadcrumb: "Loan Calc",

      seo: {
        title: "Loan Calculator - Free Payment & Amortization Tool",
        description: "Calculate your loan payment, total interest cost, and payoff date. View amortization schedule, compare terms, and see how extra payments save thousands.",
        shortDescription: "Free loan payment and amortization calculator.",
        keywords: [
          "loan calculator",
          "loan payment calculator",
          "loan amortization calculator",
          "loan interest calculator",
          "calculate loan payment",
          "loan payoff calculator",
          "extra payment calculator",
          "free loan calculator online",
        ],
      },

      calculator: { yourInformation: "Loan Details" },
      ui: {
        yourInformation: "Loan Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        loanAmount: {
          label: "Loan Amount",
          helpText: "Total amount you plan to borrow",
        },
        interestRate: {
          label: "Interest Rate (APR)",
          helpText: "Annual percentage rate charged by the lender",
        },
        loanTerm: {
          label: "Loan Term",
          helpText: "Number of years to repay the loan",
        },
        extraPayment: {
          label: "Extra Monthly Payment",
          helpText: "Additional amount paid toward principal each month (optional)",
        },
      },

      results: {
        monthlyPayment: { label: "Monthly Payment" },
        totalInterest: { label: "Total Interest" },
        totalCost: { label: "Total Cost" },
        costMultiplier: { label: "True Cost Multiplier" },
        payoffDate: { label: "Payoff Date" },
        interestRatio: { label: "Interest-to-Principal" },
        interestSaved: { label: "Interest Saved" },
        timeSaved: { label: "Time Saved" },
      },

      presets: {
        carLoan: { label: "Car Loan", description: "$25K at 6.5% for 5 years" },
        homeImprovement: { label: "Home Improvement", description: "$15K at 8.5% for 3 years" },
        studentLoan: { label: "Student Loan", description: "$35K at 5.5% for 10 years" },
        debtConsolidation: { label: "Debt Consolidation", description: "$10K at 12% for 3 years" },
        businessLoan: { label: "Business Loan", description: "$50K at 9% for 7 years" },
      },

      values: {
        years: "years",
        year: "year",
        months: "months",
        month: "month",
        perMonth: "/mo",
      },

      formats: {
        summary: "Your monthly payment is {monthlyPayment} for {loanTerm} years. Total interest: {totalInterest}. Total cost: {totalCost}.",
      },

      infoCards: {
        metrics: {
          title: "Loan Breakdown",
          items: [
            { label: "Monthly Payment", valueKey: "monthlyPayment" },
            { label: "Total Interest Paid", valueKey: "totalInterest" },
            { label: "Total Amount Paid", valueKey: "totalCost" },
            { label: "True Cost Multiplier", valueKey: "costMultiplier" },
          ],
        },
        details: {
          title: "Key Facts",
          items: [
            { label: "A shorter term means less total interest but higher monthly payments. A 15-year loan typically costs 40-60% less in interest than a 30-year loan." },
            { label: "Your credit score directly impacts your interest rate. A score above 740 can save thousands over the life of the loan compared to below 670." },
            { label: "Secured loans (backed by collateral like a car or home) generally offer lower rates than unsecured personal loans by 2-5 percentage points." },
            { label: "Even small extra payments can dramatically reduce total interest. An extra $50/month on a $25,000 loan can save over $1,500 in interest." },
          ],
        },
        tips: {
          title: "Save Money on Your Loan",
          items: [
            "Improve your credit score before applying — even 20 points can lower your rate by 0.25-0.5%",
            "Compare offers from at least 3 lenders — rates can vary by 2-3% for the same borrower",
            "Make extra payments toward principal whenever possible — every dollar goes directly to reducing your balance",
            "Watch for origination fees and prepayment penalties — they can add 1-6% to the true cost of borrowing",
          ],
        },
      },

      detailedTable: {
        amortizationSchedule: {
          button: "View Amortization Schedule",
          title: "Amortization Schedule",
          columns: {
            period: "Month",
            payment: "Payment",
            principal: "Principal",
            interest: "Interest",
            extraPmt: "Extra",
            balance: "Balance",
          },
        },
      },

      chart: {
        title: "Payment Breakdown Over Time",
        xLabel: "Year",
        yLabel: "Amount",
        series: {
          principal: "Principal",
          interest: "Interest",
        },
      },

      education: {
        whatIs: {
          title: "How Loan Payments Are Calculated",
          content: "When you take out a loan, the lender uses an amortization formula to determine your fixed monthly payment. This formula balances the loan amount (principal), annual interest rate, and loan term so that each payment covers both interest charges and a portion of the principal. In the early months, most of your payment goes toward interest because the outstanding balance is still high. As you pay down the principal over time, the interest portion shrinks and more of each payment reduces your balance. This predictable structure is what makes fixed-rate amortized loans the most common type of consumer loan — you always know exactly what you owe each month. The standard monthly payment formula is M = P × [r(1+r)^n] / [(1+r)^n – 1], where P is the principal, r is the monthly interest rate, and n is the total number of payments. Understanding this formula helps you see why even small changes in interest rate or term length can significantly affect your total cost.",
        },
        howItWorks: {
          title: "Understanding Amortization and Interest",
          content: "Amortization is the process of spreading a loan into a series of fixed payments over time. Each payment is split between interest (the cost of borrowing) and principal (reducing what you owe). At the start of a 30-year mortgage, roughly 70-80% of each payment goes to interest. By the halfway point, the split is closer to 50/50, and in the final years nearly all of your payment reduces the balance. This front-loaded interest structure means that making extra payments early in the loan term has the greatest impact on reducing total interest. For example, paying an extra $100 per month in the first year of a $200,000 mortgage at 6% could save over $30,000 in total interest over the life of the loan. This is also why refinancing to a shorter term or lower rate can produce dramatic savings — you're changing the underlying math that determines how much of each dollar goes to interest versus principal.",
        },
        considerations: {
          title: "Factors That Affect Your Loan Cost",
          items: [
            { text: "Credit score — The single biggest factor in your interest rate. Excellent credit (740+) can get rates 2-4% lower than fair credit (580-669), potentially saving tens of thousands over the loan term.", type: "info" as const },
            { text: "Loan term — Shorter terms mean higher monthly payments but dramatically less total interest. A 15-year loan vs. 30-year loan at the same rate can cut total interest by more than half.", type: "info" as const },
            { text: "Secured vs. unsecured — Secured loans (auto, mortgage) use collateral, allowing lower rates (3-8%). Unsecured personal loans carry higher rates (6-36%) because the lender takes more risk.", type: "info" as const },
            { text: "Prepayment penalties — Some lenders charge fees for paying off early. Always check before signing. Federal student loans and most mortgages originated after 2014 cannot have prepayment penalties.", type: "warning" as const },
            { text: "Origination fees — Upfront fees of 1-8% that increase your effective APR. A $10,000 loan with a 5% origination fee means you only receive $9,500 but repay the full $10,000 plus interest.", type: "warning" as const },
            { text: "APR vs. interest rate — APR includes fees and gives the true cost of borrowing. Always compare APRs, not just interest rates, when shopping for loans.", type: "info" as const },
          ],
        },
        categories: {
          title: "Common Types of Loans",
          items: [
            { text: "Personal loans — Unsecured, fixed-rate loans for almost any purpose. Typical rates: 6-36% APR. Terms: 1-7 years. Best for debt consolidation, home improvements, or major purchases.", type: "info" as const },
            { text: "Auto loans — Secured by the vehicle. Typical rates: 4-12% APR. Terms: 2-7 years. New cars generally get better rates than used cars. Experts recommend terms no longer than 60 months.", type: "info" as const },
            { text: "Mortgage loans — Secured by the home. Typical rates: 5-8% APR. Terms: 15 or 30 years. The largest loan most people will ever take. Interest may be tax-deductible.", type: "info" as const },
            { text: "Student loans — Federal loans offer fixed rates set by Congress (currently ~5-7%). Private student loans vary by creditworthiness. Income-driven repayment plans are available for federal loans.", type: "info" as const },
            { text: "Business loans — SBA loans offer rates from 5-10%. Traditional bank loans: 6-13%. Online lenders: 7-30%+. Terms vary widely from 1-25 years depending on the loan type and purpose.", type: "info" as const },
            { text: "Home equity loans — Secured by home equity. Typical rates: 7-12% APR. Can borrow up to 80-85% of equity. Interest may be tax-deductible if used for home improvements.", type: "info" as const },
          ],
        },
        examples: {
          title: "Step-by-Step Loan Calculations",
          description: "Two real-world examples showing how loan terms affect total cost",
          examples: [
            {
              title: "Car Loan: $25,000 at 6.5% for 5 years",
              steps: [
                "Principal (P) = $25,000",
                "Monthly rate (r) = 6.5% ÷ 12 = 0.5417%",
                "Number of payments (n) = 5 × 12 = 60",
                "M = $25,000 × [0.005417 × (1.005417)^60] / [(1.005417)^60 – 1]",
                "M = $25,000 × [0.005417 × 1.3829] / [1.3829 – 1]",
                "M = $25,000 × 0.007492 / 0.3829",
                "Monthly Payment = $489.15",
                "Total Paid = $489.15 × 60 = $29,349",
                "Total Interest = $29,349 – $25,000 = $4,349",
              ],
              result: "Monthly payment: $489.15 | Total interest: $4,349 | True cost: 1.17× the loan amount",
            },
            {
              title: "Student Loan: $35,000 at 5.5% for 10 years",
              steps: [
                "Principal (P) = $35,000",
                "Monthly rate (r) = 5.5% ÷ 12 = 0.4583%",
                "Number of payments (n) = 10 × 12 = 120",
                "M = $35,000 × [0.004583 × (1.004583)^120] / [(1.004583)^120 – 1]",
                "M = $35,000 × [0.004583 × 1.7289] / [1.7289 – 1]",
                "M = $35,000 × 0.007924 / 0.7289",
                "Monthly Payment = $380.03",
                "Total Paid = $380.03 × 120 = $45,604",
                "Total Interest = $45,604 – $35,000 = $10,604",
              ],
              result: "Monthly payment: $380.03 | Total interest: $10,604 | True cost: 1.30× the loan amount",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is the difference between APR and interest rate?",
          answer: "Interest rate is the base cost of borrowing money, expressed as a percentage. APR (Annual Percentage Rate) includes the interest rate plus additional fees like origination fees, closing costs, and discount points. APR gives you the true total cost of borrowing and is the best way to compare loan offers from different lenders. For example, a loan with a 5% interest rate and a 2% origination fee has an APR higher than 5%. Federal law requires lenders to disclose the APR before you sign any loan agreement.",
        },
        {
          question: "How does my credit score affect my loan interest rate?",
          answer: "Your credit score is the primary factor lenders use to set your interest rate. Borrowers with excellent credit (740-850) typically receive rates 2-4% lower than those with fair credit (580-669). On a $25,000 5-year loan, the difference between a 6% rate and a 12% rate is approximately $4,500 in extra interest. To improve your rate: pay bills on time, reduce credit card balances below 30% of limits, avoid opening new accounts before applying, and check your credit report for errors at AnnualCreditReport.com.",
        },
        {
          question: "Should I choose a shorter or longer loan term?",
          answer: "It depends on your financial priorities. A shorter term (e.g., 3 years vs. 7 years) means higher monthly payments but significantly less total interest — often 50-70% less. A longer term keeps monthly payments affordable but costs more over time. The best approach for many borrowers is to take the longer term for flexibility but make extra payments when possible. This gives you the safety net of lower required payments while still reducing interest if you can afford to pay more. Use this calculator to compare different terms and see the exact savings.",
        },
        {
          question: "What is amortization and how does it work?",
          answer: "Amortization is the process of paying off a loan through scheduled, equal payments over time. Each payment includes two parts: interest (the lender's fee for borrowing) and principal (reducing what you owe). In the early payments, most goes to interest. Over time, as the balance decreases, more of each payment goes toward the principal. This is why paying extra early in the loan term has the biggest impact — you reduce the balance that interest is calculated on, creating a compounding savings effect throughout the remaining term.",
        },
        {
          question: "Can I pay off my loan early without penalty?",
          answer: "Most modern loans allow early payoff without penalties. Federal student loans, most auto loans, and mortgages originated after January 2014 (under the Ability-to-Repay rule) cannot charge prepayment penalties. However, some personal loans and older mortgages may include them. Always check your loan agreement for a prepayment penalty clause before signing. If your loan has no penalty, making extra payments is one of the best financial moves you can make — even an extra $50-100 per month can save thousands in interest and shave years off your payoff date.",
        },
        {
          question: "How much can I save by making extra payments on my loan?",
          answer: "Extra payments go directly toward reducing your principal balance, which lowers the interest calculated on all future payments. The savings depend on your loan size, rate, and term. For example, adding $100/month extra to a $25,000 loan at 7% for 5 years saves approximately $800 in interest and pays off the loan 10 months early. On a larger loan like a $200,000 mortgage at 6% for 30 years, an extra $200/month saves over $65,000 in interest and cuts nearly 7 years off the term. Use the extra payment field in this calculator to see your exact savings.",
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
      "name": "Calculadora de Préstamos",
      "slug": "calculadora-prestamos",
      "subtitle": "Calcula tu pago mensual de préstamo, interés total y visualiza un cronograma completo de amortización. Descubre cómo los pagos adicionales te ahorran dinero.",
      "breadcrumb": "Calc Préstamo",
      "seo": {
        "title": "Calculadora de Préstamos - Herramienta Gratuita de Pagos y Amortización",
        "description": "Calcula tu pago de préstamo, costo total de intereses y fecha de liquidación. Visualiza cronograma de amortización, compara términos y descubre cómo los pagos adicionales ahorran miles.",
        "shortDescription": "Calculadora gratuita de pagos de préstamos y amortización.",
        "keywords": [
          "calculadora de préstamos",
          "calculadora de pagos de préstamo",
          "calculadora de amortización de préstamo",
          "calculadora de interés de préstamo",
          "calcular pago de préstamo",
          "calculadora de liquidación de préstamo",
          "calculadora de pagos adicionales",
          "calculadora de préstamos gratis online"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "loanAmount": {
          "label": "Monto del Préstamo",
          "helpText": "Cantidad total que planeas pedir prestado"
        },
        "interestRate": {
          "label": "Tasa de Interés (TAE)",
          "helpText": "Tasa anual porcentual cobrada por el prestamista"
        },
        "loanTerm": {
          "label": "Plazo del Préstamo",
          "helpText": "Número de años para pagar el préstamo"
        },
        "extraPayment": {
          "label": "Pago Mensual Adicional",
          "helpText": "Cantidad adicional pagada hacia el capital cada mes (opcional)"
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Pago Mensual"
        },
        "totalInterest": {
          "label": "Interés Total"
        },
        "totalCost": {
          "label": "Costo Total"
        },
        "costMultiplier": {
          "label": "Multiplicador de Costo Real"
        },
        "payoffDate": {
          "label": "Fecha de Liquidación"
        },
        "interestRatio": {
          "label": "Interés-a-Capital"
        },
        "interestSaved": {
          "label": "Interés Ahorrado"
        },
        "timeSaved": {
          "label": "Tiempo Ahorrado"
        }
      },
      "presets": {
        "carLoan": {
          "label": "Préstamo de Auto",
          "description": "$25K al 6.5% por 5 años"
        },
        "homeImprovement": {
          "label": "Mejoras del Hogar",
          "description": "$15K al 8.5% por 3 años"
        },
        "studentLoan": {
          "label": "Préstamo Estudiantil",
          "description": "$35K al 5.5% por 10 años"
        },
        "debtConsolidation": {
          "label": "Consolidación de Deuda",
          "description": "$10K al 12% por 3 años"
        },
        "businessLoan": {
          "label": "Préstamo Comercial",
          "description": "$50K al 9% por 7 años"
        }
      },
      "values": {
        "years": "años",
        "year": "año",
        "months": "meses",
        "month": "mes",
        "perMonth": "/mes"
      },
      "formats": {
        "summary": "Tu pago mensual es {monthlyPayment} por {loanTerm} años. Interés total: {totalInterest}. Costo total: {totalCost}."
      },
      "infoCards": {
        "metrics": {
          "title": "Desglose del Préstamo",
          "items": [
            {
              "label": "Pago Mensual",
              "valueKey": "monthlyPayment"
            },
            {
              "label": "Interés Total Pagado",
              "valueKey": "totalInterest"
            },
            {
              "label": "Cantidad Total Pagada",
              "valueKey": "totalCost"
            },
            {
              "label": "Multiplicador de Costo Real",
              "valueKey": "costMultiplier"
            }
          ]
        },
        "details": {
          "title": "Datos Clave",
          "items": [
            {
              "label": "Un plazo más corto significa menos interés total pero pagos mensuales más altos. Un préstamo de 15 años típicamente cuesta 40-60% menos en intereses que uno de 30 años."
            },
            {
              "label": "Tu puntaje crediticio impacta directamente tu tasa de interés. Un puntaje superior a 740 puede ahorrar miles durante la vida del préstamo comparado con menos de 670."
            },
            {
              "label": "Los préstamos garantizados (respaldados por colateral como un auto o casa) generalmente ofrecen tasas más bajas que los préstamos personales no garantizados por 2-5 puntos porcentuales."
            },
            {
              "label": "Incluso pagos adicionales pequeños pueden reducir dramáticamente el interés total. Un extra de $50/mes en un préstamo de $25,000 puede ahorrar más de $1,500 en intereses."
            }
          ]
        },
        "tips": {
          "title": "Ahorra Dinero en tu Préstamo",
          "items": [
            "Mejora tu puntaje crediticio antes de aplicar — incluso 20 puntos pueden reducir tu tasa en 0.25-0.5%",
            "Compara ofertas de al menos 3 prestamistas — las tasas pueden variar 2-3% para el mismo solicitante",
            "Haz pagos adicionales hacia el capital cuando sea posible — cada dólar va directamente a reducir tu saldo",
            "Cuidado con las comisiones de originación y penalidades por pago anticipado — pueden agregar 1-6% al costo real del préstamo"
          ]
        }
      },
      "detailedTable": {
        "amortizationSchedule": {
          "button": "Ver Cronograma de Amortización",
          "title": "Cronograma de Amortización",
          "columns": {
            "period": "Mes",
            "payment": "Pago",
            "principal": "Capital",
            "interest": "Interés",
            "extraPmt": "Extra",
            "balance": "Saldo"
          }
        }
      },
      "chart": {
        "title": "Desglose de Pagos a lo Largo del Tiempo",
        "xLabel": "Año",
        "yLabel": "Cantidad",
        "series": {
          "principal": "Capital",
          "interest": "Interés"
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo se Calculan los Pagos de Préstamo",
          "content": "Cuando solicitas un préstamo, el prestamista usa una fórmula de amortización para determinar tu pago mensual fijo. Esta fórmula equilibra el monto del préstamo (capital), tasa de interés anual y plazo del préstamo para que cada pago cubra tanto los cargos por intereses como una porción del capital. En los primeros meses, la mayor parte de tu pago va hacia intereses porque el saldo pendiente sigue siendo alto. A medida que pagas el capital con el tiempo, la porción de intereses se reduce y más de cada pago reduce tu saldo. Esta estructura predecible es lo que hace que los préstamos amortizados de tasa fija sean el tipo más común de préstamo al consumidor — siempre sabes exactamente lo que debes cada mes. La fórmula estándar de pago mensual es M = P × [r(1+r)^n] / [(1+r)^n – 1], donde P es el capital, r es la tasa de interés mensual y n es el número total de pagos. Entender esta fórmula te ayuda a ver por qué incluso pequeños cambios en la tasa de interés o duración del plazo pueden afectar significativamente tu costo total."
        },
        "howItWorks": {
          "title": "Entendiendo la Amortización y el Interés",
          "content": "La amortización es el proceso de dividir un préstamo en una serie de pagos fijos durante el tiempo. Cada pago se divide entre interés (el costo de pedir prestado) y capital (reduciendo lo que debes). Al inicio de una hipoteca de 30 años, aproximadamente 70-80% de cada pago va a intereses. En el punto medio, la división es cercana a 50/50, y en los años finales casi todo tu pago reduce el saldo. Esta estructura de interés cargada al frente significa que hacer pagos adicionales temprano en el plazo del préstamo tiene el mayor impacto en reducir el interés total. Por ejemplo, pagar $100 adicionales por mes en el primer año de una hipoteca de $200,000 al 6% podría ahorrar más de $30,000 en interés total durante la vida del préstamo. Esta es también la razón por la que refinanciar a un plazo más corto o tasa más baja puede producir ahorros dramáticos — estás cambiando las matemáticas subyacentes que determinan cuánto de cada dólar va a intereses versus capital."
        },
        "considerations": {
          "title": "Factores que Afectan el Costo de tu Préstamo",
          "items": [
            {
              "text": "Puntaje crediticio — El factor más importante en tu tasa de interés. Crédito excelente (740+) puede obtener tasas 2-4% más bajas que crédito regular (580-669), potencialmente ahorrando decenas de miles durante el plazo del préstamo.",
              "type": "info"
            },
            {
              "text": "Plazo del préstamo — Plazos más cortos significan pagos mensuales más altos pero dramáticamente menos interés total. Un préstamo de 15 años vs. 30 años a la misma tasa puede reducir el interés total en más de la mitad.",
              "type": "info"
            },
            {
              "text": "Garantizado vs. no garantizado — Los préstamos garantizados (auto, hipoteca) usan colateral, permitiendo tasas más bajas (3-8%). Los préstamos personales no garantizados tienen tasas más altas (6-36%) porque el prestamista toma más riesgo.",
              "type": "info"
            },
            {
              "text": "Penalidades por pago anticipado — Algunos prestamistas cobran comisiones por pagar anticipadamente. Siempre verifica antes de firmar. Los préstamos estudiantiles federales y la mayoría de hipotecas originadas después de 2014 no pueden tener penalidades por pago anticipado.",
              "type": "warning"
            },
            {
              "text": "Comisiones de originación — Comisiones iniciales de 1-8% que aumentan tu TAE efectiva. Un préstamo de $10,000 con una comisión de originación de 5% significa que solo recibes $9,500 pero pagas los $10,000 completos más intereses.",
              "type": "warning"
            },
            {
              "text": "TAE vs. tasa de interés — La TAE incluye comisiones y da el costo real del préstamo. Siempre compara TAEs, no solo tasas de interés, cuando busques préstamos.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Tipos Comunes de Préstamos",
          "items": [
            {
              "text": "Préstamos personales — No garantizados, préstamos de tasa fija para casi cualquier propósito. Tasas típicas: 6-36% TAE. Plazos: 1-7 años. Mejores para consolidación de deudas, mejoras del hogar o compras importantes.",
              "type": "info"
            },
            {
              "text": "Préstamos de auto — Garantizados por el vehículo. Tasas típicas: 4-12% TAE. Plazos: 2-7 años. Los autos nuevos generalmente obtienen mejores tasas que los usados. Los expertos recomiendan plazos no mayores a 60 meses.",
              "type": "info"
            },
            {
              "text": "Préstamos hipotecarios — Garantizados por la casa. Tasas típicas: 5-8% TAE. Plazos: 15 o 30 años. El préstamo más grande que la mayoría de personas tendrá. El interés puede ser deducible de impuestos.",
              "type": "info"
            },
            {
              "text": "Préstamos estudiantiles — Los préstamos federales ofrecen tasas fijas establecidas por el Congreso (actualmente ~5-7%). Los préstamos estudiantiles privados varían según la solvencia crediticia. Planes de pago basados en ingresos están disponibles para préstamos federales.",
              "type": "info"
            },
            {
              "text": "Préstamos comerciales — Los préstamos SBA ofrecen tasas de 5-10%. Préstamos bancarios tradicionales: 6-13%. Prestamistas en línea: 7-30%+. Los plazos varían ampliamente de 1-25 años dependiendo del tipo de préstamo y propósito.",
              "type": "info"
            },
            {
              "text": "Préstamos sobre el valor de la vivienda — Garantizados por el valor de la vivienda. Tasas típicas: 7-12% TAE. Puedes pedir prestado hasta 80-85% del valor. El interés puede ser deducible de impuestos si se usa para mejoras de la casa.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Cálculos de Préstamos Paso a Paso",
          "description": "Dos ejemplos del mundo real mostrando cómo los términos del préstamo afectan el costo total",
          "examples": [
            {
              "title": "Préstamo de Auto: $25,000 al 6.5% por 5 años",
              "steps": [
                "Capital (P) = $25,000",
                "Tasa mensual (r) = 6.5% ÷ 12 = 0.5417%",
                "Número de pagos (n) = 5 × 12 = 60",
                "M = $25,000 × [0.005417 × (1.005417)^60] / [(1.005417)^60 – 1]",
                "M = $25,000 × [0.005417 × 1.3829] / [1.3829 – 1]",
                "M = $25,000 × 0.007492 / 0.3829",
                "Pago Mensual = $489.15",
                "Total Pagado = $489.15 × 60 = $29,349",
                "Interés Total = $29,349 – $25,000 = $4,349"
              ],
              "result": "Pago mensual: $489.15 | Interés total: $4,349 | Costo real: 1.17× el monto del préstamo"
            },
            {
              "title": "Préstamo Estudiantil: $35,000 al 5.5% por 10 años",
              "steps": [
                "Capital (P) = $35,000",
                "Tasa mensual (r) = 5.5% ÷ 12 = 0.4583%",
                "Número de pagos (n) = 10 × 12 = 120",
                "M = $35,000 × [0.004583 × (1.004583)^120] / [(1.004583)^120 – 1]",
                "M = $35,000 × [0.004583 × 1.7289] / [1.7289 – 1]",
                "M = $35,000 × 0.007924 / 0.7289",
                "Pago Mensual = $380.03",
                "Total Pagado = $380.03 × 120 = $45,604",
                "Interés Total = $45,604 – $35,000 = $10,604"
              ],
              "result": "Pago mensual: $380.03 | Interés total: $10,604 | Costo real: 1.30× el monto del préstamo"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es la diferencia entre TAE y tasa de interés?",
          "answer": "La tasa de interés es el costo base de pedir dinero prestado, expresado como porcentaje. La TAE (Tasa Anual Equivalente) incluye la tasa de interés más comisiones adicionales como comisiones de originación, costos de cierre y puntos de descuento. La TAE te da el costo total real del préstamo y es la mejor manera de comparar ofertas de préstamos de diferentes prestamistas. Por ejemplo, un préstamo con una tasa de interés del 5% y una comisión de originación del 2% tiene una TAE superior al 5%. La ley federal requiere que los prestamistas divulguen la TAE antes de que firmes cualquier acuerdo de préstamo."
        },
        {
          "question": "¿Cómo afecta mi puntaje crediticio a la tasa de interés de mi préstamo?",
          "answer": "Tu puntaje crediticio es el factor principal que los prestamistas usan para establecer tu tasa de interés. Los prestatarios con crédito excelente (740-850) típicamente reciben tasas 2-4% más bajas que aquellos con crédito regular (580-669). En un préstamo de $25,000 a 5 años, la diferencia entre una tasa del 6% y una del 12% es aproximadamente $4,500 en interés adicional. Para mejorar tu tasa: paga las cuentas a tiempo, reduce los saldos de tarjetas de crédito por debajo del 30% de los límites, evita abrir nuevas cuentas antes de aplicar y revisa tu reporte crediticio por errores en AnnualCreditReport.com."
        },
        {
          "question": "¿Debería elegir un plazo de préstamo más corto o más largo?",
          "answer": "Depende de tus prioridades financieras. Un plazo más corto (ej., 3 años vs. 7 años) significa pagos mensuales más altos pero significativamente menos interés total — a menudo 50-70% menos. Un plazo más largo mantiene los pagos mensuales accesibles pero cuesta más con el tiempo. El mejor enfoque para muchos prestatarios es tomar el plazo más largo para flexibilidad pero hacer pagos adicionales cuando sea posible. Esto te da la red de seguridad de pagos requeridos más bajos mientras aún reduces el interés si puedes permitirte pagar más. Usa esta calculadora para comparar diferentes plazos y ver los ahorros exactos."
        },
        {
          "question": "¿Qué es la amortización y cómo funciona?",
          "answer": "La amortización es el proceso de pagar un préstamo a través de pagos programados e iguales durante el tiempo. Cada pago incluye dos partes: interés (la comisión del prestamista por prestar) y capital (reduciendo lo que debes). En los primeros pagos, la mayoría va a intereses. Con el tiempo, a medida que el saldo disminuye, más de cada pago va hacia el capital. Esta es la razón por la que pagar extra temprano en el plazo del préstamo tiene el mayor impacto — reduces el saldo sobre el cual se calcula el interés, creando un efecto de ahorro compuesto durante el plazo restante."
        },
        {
          "question": "¿Puedo pagar mi préstamo anticipadamente sin penalidad?",
          "answer": "La mayoría de los préstamos modernos permiten el pago anticipado sin penalidades. Los préstamos estudiantiles federales, la mayoría de préstamos de auto e hipotecas originadas después de enero 2014 (bajo la regla de Capacidad de Pago) no pueden cobrar penalidades por pago anticipado. Sin embargo, algunos préstamos personales e hipotecas más antiguas pueden incluirlas. Siempre revisa tu acuerdo de préstamo por una cláusula de penalidad por pago anticipado antes de firmar. Si tu préstamo no tiene penalidad, hacer pagos adicionales es una de las mejores decisiones financieras que puedes hacer — incluso $50-100 extra por mes puede ahorrar miles en intereses y reducir años de tu fecha de liquidación."
        },
        {
          "question": "¿Cuánto puedo ahorrar haciendo pagos adicionales en mi préstamo?",
          "answer": "Los pagos adicionales van directamente hacia reducir tu saldo de capital, lo cual reduce el interés calculado en todos los pagos futuros. Los ahorros dependen del tamaño de tu préstamo, tasa y plazo. Por ejemplo, agregar $100/mes extra a un préstamo de $25,000 al 7% por 5 años ahorra aproximadamente $800 en intereses y paga el préstamo 10 meses antes. En un préstamo más grande como una hipoteca de $200,000 al 6% por 30 años, $200 extra por mes ahorra más de $65,000 en intereses y reduce casi 7 años del plazo. Usa el campo de pago adicional en esta calculadora para ver tus ahorros exactos."
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
      "name": "Calculadora de Empréstimo",
      "slug": "calculadora-emprestimo",
      "subtitle": "Calcule sua parcela mensal do empréstimo, juros totais e visualize uma tabela completa de amortização. Veja como pagamentos extras economizam dinheiro.",
      "breadcrumb": "Calc Empréstimo",
      "seo": {
        "title": "Calculadora de Empréstimo - Ferramenta Gratuita de Pagamento e Amortização",
        "description": "Calcule sua parcela de empréstimo, custo total de juros e data de quitação. Visualize tabela de amortização, compare termos e veja como pagamentos extras economizam milhares.",
        "shortDescription": "Calculadora gratuita de pagamento e amortização de empréstimo.",
        "keywords": [
          "calculadora de empréstimo",
          "calculadora de parcela de empréstimo",
          "calculadora de amortização de empréstimo",
          "calculadora de juros de empréstimo",
          "calcular parcela de empréstimo",
          "calculadora de quitação de empréstimo",
          "calculadora de pagamento extra",
          "calculadora de empréstimo online grátis"
        ]
      },
      "inputs": {
        "loanAmount": {
          "label": "Valor do Empréstimo",
          "helpText": "Valor total que você planeja pedir emprestado"
        },
        "interestRate": {
          "label": "Taxa de Juros (a.a.)",
          "helpText": "Taxa percentual anual cobrada pelo credor"
        },
        "loanTerm": {
          "label": "Prazo do Empréstimo",
          "helpText": "Número de anos para quitar o empréstimo"
        },
        "extraPayment": {
          "label": "Pagamento Mensal Extra",
          "helpText": "Valor adicional pago ao principal a cada mês (opcional)"
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Parcela Mensal"
        },
        "totalInterest": {
          "label": "Juros Totais"
        },
        "totalCost": {
          "label": "Custo Total"
        },
        "costMultiplier": {
          "label": "Multiplicador de Custo Real"
        },
        "payoffDate": {
          "label": "Data de Quitação"
        },
        "interestRatio": {
          "label": "Juros sobre Principal"
        },
        "interestSaved": {
          "label": "Juros Economizados"
        },
        "timeSaved": {
          "label": "Tempo Economizado"
        }
      },
      "presets": {
        "carLoan": {
          "label": "Financiamento de Carro",
          "description": "R$ 150.000 a 6,5% por 5 anos"
        },
        "homeImprovement": {
          "label": "Reforma da Casa",
          "description": "R$ 90.000 a 8,5% por 3 anos"
        },
        "studentLoan": {
          "label": "Empréstimo Estudantil",
          "description": "R$ 210.000 a 5,5% por 10 anos"
        },
        "debtConsolidation": {
          "label": "Consolidação de Dívidas",
          "description": "R$ 60.000 a 12% por 3 anos"
        },
        "businessLoan": {
          "label": "Empréstimo Empresarial",
          "description": "R$ 300.000 a 9% por 7 anos"
        }
      },
      "values": {
        "years": "anos",
        "year": "ano",
        "months": "meses",
        "month": "mês",
        "perMonth": "/mês"
      },
      "formats": {
        "summary": "Sua parcela mensal é {monthlyPayment} por {loanTerm} anos. Juros totais: {totalInterest}. Custo total: {totalCost}."
      },
      "infoCards": {
        "metrics": {
          "title": "Detalhamento do Empréstimo",
          "items": [
            {
              "label": "Parcela Mensal",
              "valueKey": "monthlyPayment"
            },
            {
              "label": "Juros Totais Pagos",
              "valueKey": "totalInterest"
            },
            {
              "label": "Valor Total Pago",
              "valueKey": "totalCost"
            },
            {
              "label": "Multiplicador de Custo Real",
              "valueKey": "costMultiplier"
            }
          ]
        },
        "details": {
          "title": "Fatos Importantes",
          "items": [
            {
              "label": "Um prazo menor significa menos juros totais, mas parcelas mensais maiores. Um empréstimo de 15 anos normalmente custa 40-60% menos em juros que um de 30 anos."
            },
            {
              "label": "Seu score de crédito impacta diretamente sua taxa de juros. Um score acima de 740 pode economizar milhares ao longo do empréstimo comparado a abaixo de 670."
            },
            {
              "label": "Empréstimos garantidos (com garantia como carro ou casa) geralmente oferecem taxas 2-5 pontos percentuais menores que empréstimos pessoais sem garantia."
            },
            {
              "label": "Mesmo pequenos pagamentos extras podem reduzir drasticamente os juros totais. R$ 300 extras por mês em um empréstimo de R$ 150.000 pode economizar mais de R$ 9.000 em juros."
            }
          ]
        },
        "tips": {
          "title": "Economize Dinheiro no seu Empréstimo",
          "items": [
            "Melhore seu score de crédito antes de solicitar — mesmo 20 pontos podem diminuir sua taxa em 0,25-0,5%",
            "Compare ofertas de pelo menos 3 credores — as taxas podem variar 2-3% para o mesmo tomador",
            "Faça pagamentos extras ao principal sempre que possível — cada real vai diretamente para reduzir seu saldo",
            "Fique atento a taxas de abertura e multas por pagamento antecipado — podem adicionar 1-6% ao custo real do empréstimo"
          ]
        }
      },
      "detailedTable": {
        "amortizationSchedule": {
          "button": "Ver Tabela de Amortização",
          "title": "Tabela de Amortização",
          "columns": {
            "period": "Mês",
            "payment": "Parcela",
            "principal": "Principal",
            "interest": "Juros",
            "extraPmt": "Extra",
            "balance": "Saldo"
          }
        }
      },
      "chart": {
        "title": "Composição da Parcela ao Longo do Tempo",
        "xLabel": "Ano",
        "yLabel": "Valor",
        "series": {
          "principal": "Principal",
          "interest": "Juros"
        }
      },
      "education": {
        "whatIs": {
          "title": "Como as Parcelas de Empréstimo são Calculadas",
          "content": "Quando você contrata um empréstimo, o credor usa uma fórmula de amortização para determinar sua parcela mensal fixa. Esta fórmula equilibra o valor do empréstimo (principal), taxa de juros anual e prazo do empréstimo para que cada parcela cubra tanto os juros quanto uma porção do principal. Nos primeiros meses, a maior parte da parcela vai para juros porque o saldo devedor ainda é alto. Conforme você paga o principal ao longo do tempo, a porção de juros diminui e mais de cada parcela reduz seu saldo. Esta estrutura previsível faz dos empréstimos amortizados com taxa fixa o tipo mais comum de empréstimo ao consumidor — você sempre sabe exatamente o que deve pagar a cada mês. A fórmula padrão de parcela mensal é M = P × [r(1+r)^n] / [(1+r)^n – 1], onde P é o principal, r é a taxa mensal de juros, e n é o número total de parcelas. Entender esta fórmula ajuda a ver por que mesmo pequenas mudanças na taxa de juros ou prazo podem afetar significativamente seu custo total."
        },
        "howItWorks": {
          "title": "Entendendo Amortização e Juros",
          "content": "Amortização é o processo de dividir um empréstimo em uma série de parcelas fixas ao longo do tempo. Cada parcela é dividida entre juros (o custo de pedir emprestado) e principal (reduzindo o que você deve). No início de um financiamento de 30 anos, aproximadamente 70-80% de cada parcela vai para juros. Na metade do prazo, a divisão fica próxima de 50/50, e nos anos finais quase toda sua parcela reduz o saldo. Esta estrutura de juros concentrados no início significa que fazer pagamentos extras no início do prazo tem o maior impacto na redução dos juros totais. Por exemplo, pagar R$ 600 extras por mês no primeiro ano de um financiamento de R$ 1.200.000 a 6% pode economizar mais de R$ 180.000 em juros totais. É por isso que refinanciar para um prazo menor ou taxa menor pode produzir economias dramáticas — você está mudando a matemática que determina quanto de cada real vai para juros versus principal."
        },
        "considerations": {
          "title": "Fatores que Afetam o Custo do seu Empréstimo",
          "items": [
            {
              "text": "Score de crédito — O maior fator isolado na sua taxa de juros. Crédito excelente (740+) pode conseguir taxas 2-4% menores que crédito regular (580-669), potencialmente economizando dezenas de milhares ao longo do prazo.",
              "type": "info"
            },
            {
              "text": "Prazo do empréstimo — Prazos menores significam parcelas mensais maiores mas dramaticamente menos juros totais. Um empréstimo de 15 anos vs. 30 anos na mesma taxa pode cortar os juros totais pela metade.",
              "type": "info"
            },
            {
              "text": "Garantido vs. não garantido — Empréstimos garantidos (auto, imóvel) usam garantia, permitindo taxas menores (3-8%). Empréstimos pessoais não garantidos têm taxas maiores (6-36%) porque o credor assume mais risco.",
              "type": "info"
            },
            {
              "text": "Multas por pagamento antecipado — Alguns credores cobram taxas por quitar antes do prazo. Sempre verifique antes de assinar. Empréstimos estudantis federais e a maioria dos financiamentos imobiliários não podem ter multas por pagamento antecipado.",
              "type": "warning"
            },
            {
              "text": "Taxas de abertura — Taxas iniciais de 1-8% que aumentam sua taxa efetiva. Um empréstimo de R$ 60.000 com taxa de abertura de 5% significa que você recebe apenas R$ 57.000 mas paga os R$ 60.000 completos mais juros.",
              "type": "warning"
            },
            {
              "text": "Taxa efetiva vs. taxa nominal — A taxa efetiva inclui taxas e dá o custo real do empréstimo. Sempre compare taxas efetivas, não apenas taxas nominais, ao pesquisar empréstimos.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Tipos Comuns de Empréstimos",
          "items": [
            {
              "text": "Empréstimos pessoais — Sem garantia, taxa fixa para quase qualquer propósito. Taxas típicas: 6-36% a.a. Prazos: 1-7 anos. Melhor para consolidação de dívidas, reformas ou compras importantes.",
              "type": "info"
            },
            {
              "text": "Financiamento de veículos — Garantido pelo veículo. Taxas típicas: 4-12% a.a. Prazos: 2-7 anos. Carros novos geralmente conseguem taxas melhores que usados. Especialistas recomendam prazos não maiores que 60 meses.",
              "type": "info"
            },
            {
              "text": "Financiamento imobiliário — Garantido pelo imóvel. Taxas típicas: 5-8% a.a. Prazos: 15 ou 30 anos. O maior empréstimo que a maioria das pessoas terá. Juros podem ser dedutíveis no imposto de renda.",
              "type": "info"
            },
            {
              "text": "Empréstimos estudantis — Empréstimos federais oferecem taxas fixas definidas pelo governo (atualmente ~5-7%). Empréstimos estudantis privados variam por capacidade de crédito. Planos de pagamento baseados em renda estão disponíveis.",
              "type": "info"
            },
            {
              "text": "Empréstimos empresariais — Empréstimos BNDES oferecem taxas de 5-10%. Empréstimos bancários tradicionais: 6-13%. Credores online: 7-30%+. Prazos variam amplamente de 1-25 anos dependendo do tipo e propósito.",
              "type": "info"
            },
            {
              "text": "Empréstimos com garantia de imóvel — Garantidos pelo patrimônio imobiliário. Taxas típicas: 7-12% a.a. Pode pedir emprestado até 80-85% do patrimônio. Juros podem ser dedutíveis se usados para melhorias no imóvel.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Cálculos de Empréstimo Passo a Passo",
          "description": "Dois exemplos do mundo real mostrando como os termos do empréstimo afetam o custo total",
          "examples": [
            {
              "title": "Financiamento de Carro: R$ 150.000 a 6,5% por 5 anos",
              "steps": [
                "Principal (P) = R$ 150.000",
                "Taxa mensal (r) = 6,5% ÷ 12 = 0,5417%",
                "Número de parcelas (n) = 5 × 12 = 60",
                "M = R$ 150.000 × [0,005417 × (1,005417)^60] / [(1,005417)^60 – 1]",
                "M = R$ 150.000 × [0,005417 × 1,3829] / [1,3829 – 1]",
                "M = R$ 150.000 × 0,007492 / 0,3829",
                "Parcela Mensal = R$ 2.934,90",
                "Total Pago = R$ 2.934,90 × 60 = R$ 176.094",
                "Juros Totais = R$ 176.094 – R$ 150.000 = R$ 26.094"
              ],
              "result": "Parcela mensal: R$ 2.934,90 | Juros totais: R$ 26.094 | Custo real: 1,17× o valor do empréstimo"
            },
            {
              "title": "Empréstimo Estudantil: R$ 210.000 a 5,5% por 10 anos",
              "steps": [
                "Principal (P) = R$ 210.000",
                "Taxa mensal (r) = 5,5% ÷ 12 = 0,4583%",
                "Número de parcelas (n) = 10 × 12 = 120",
                "M = R$ 210.000 × [0,004583 × (1,004583)^120] / [(1,004583)^120 – 1]",
                "M = R$ 210.000 × [0,004583 × 1,7289] / [1,7289 – 1]",
                "M = R$ 210.000 × 0,007924 / 0,7289",
                "Parcela Mensal = R$ 2.280,18",
                "Total Pago = R$ 2.280,18 × 120 = R$ 273.622",
                "Juros Totais = R$ 273.622 – R$ 210.000 = R$ 63.622"
              ],
              "result": "Parcela mensal: R$ 2.280,18 | Juros totais: R$ 63.622 | Custo real: 1,30× o valor do empréstimo"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual é a diferença entre taxa efetiva e taxa de juros?",
          "answer": "Taxa de juros é o custo básico de pedir dinheiro emprestado, expressa como porcentagem. Taxa efetiva inclui a taxa de juros mais taxas adicionais como taxas de abertura, custos de fechamento e pontos de desconto. A taxa efetiva dá o custo total real do empréstimo e é a melhor forma de comparar ofertas de diferentes credores. Por exemplo, um empréstimo com taxa de juros de 5% e taxa de abertura de 2% tem uma taxa efetiva maior que 5%. A lei federal exige que os credores divulguem a taxa efetiva antes de você assinar qualquer contrato de empréstimo."
        },
        {
          "question": "Como meu score de crédito afeta a taxa de juros do empréstimo?",
          "answer": "Seu score de crédito é o principal fator que os credores usam para definir sua taxa de juros. Mutuários com crédito excelente (740-850) normalmente recebem taxas 2-4% menores que aqueles com crédito regular (580-669). Em um empréstimo de R$ 150.000 por 5 anos, a diferença entre uma taxa de 6% e uma de 12% é aproximadamente R$ 27.000 em juros extras. Para melhorar sua taxa: pague contas em dia, reduza saldos do cartão de crédito abaixo de 30% do limite, evite abrir novas contas antes de solicitar, e verifique seu relatório de crédito por erros no SPC/Serasa."
        },
        {
          "question": "Devo escolher um prazo mais curto ou mais longo para o empréstimo?",
          "answer": "Depende de suas prioridades financeiras. Um prazo mais curto (ex: 3 anos vs. 7 anos) significa parcelas mensais maiores mas significativamente menos juros totais — frequentemente 50-70% menos. Um prazo mais longo mantém as parcelas mensais acessíveis mas custa mais ao longo do tempo. A melhor abordagem para muitos mutuários é pegar o prazo mais longo para flexibilidade mas fazer pagamentos extras quando possível. Isso dá a segurança de parcelas obrigatórias menores enquanto ainda reduz juros se você puder pagar mais. Use esta calculadora para comparar diferentes prazos e ver as economias exatas."
        },
        {
          "question": "O que é amortização e como funciona?",
          "answer": "Amortização é o processo de quitar um empréstimo através de parcelas programadas e iguais ao longo do tempo. Cada parcela inclui duas partes: juros (a taxa do credor por emprestar) e principal (reduzindo o que você deve). Nos primeiros pagamentos, a maior parte vai para juros. Com o tempo, conforme o saldo diminui, mais de cada parcela vai para o principal. É por isso que pagar extra no início do prazo tem o maior impacto — você reduz o saldo sobre o qual os juros são calculados, criando um efeito de economia composta ao longo do prazo restante."
        },
        {
          "question": "Posso quitar meu empréstimo antecipadamente sem multa?",
          "answer": "A maioria dos empréstimos modernos permite quitação antecipada sem multas. Empréstimos estudantis federais, a maioria dos financiamentos de veículos e financiamentos imobiliários não podem cobrar multas por pagamento antecipado. Porém, alguns empréstimos pessoais e financiamentos mais antigos podem incluí-las. Sempre verifique seu contrato de empréstimo por uma cláusula de multa por pagamento antecipado antes de assinar. Se seu empréstimo não tem multa, fazer pagamentos extras é uma das melhores decisões financeiras que você pode tomar — mesmo R$ 300-600 extras por mês podem economizar milhares em juros e cortar anos da sua data de quitação."
        },
        {
          "question": "Quanto posso economizar fazendo pagamentos extras no meu empréstimo?",
          "answer": "Pagamentos extras vão diretamente para reduzir seu saldo principal, o que diminui os juros calculados em todos os pagamentos futuros. As economias dependem do tamanho, taxa e prazo do seu empréstimo. Por exemplo, adicionar R$ 600/mês extra a um empréstimo de R$ 150.000 a 7% por 5 anos economiza aproximadamente R$ 4.800 em juros e quita o empréstimo 10 meses mais cedo. Em um empréstimo maior como um financiamento de R$ 1.200.000 a 6% por 30 anos, R$ 1.200 extras por mês economizam mais de R$ 390.000 em juros e cortam quase 7 anos do prazo. Use o campo de pagamento extra nesta calculadora para ver suas economias exatas."
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
      "name": "Calculateur de Prêt",
      "slug": "calculateur-pret",
      "subtitle": "Calculez votre paiement mensuel de prêt, les intérêts totaux et consultez un échéancier d'amortissement complet. Voyez comment les paiements supplémentaires vous font économiser.",
      "breadcrumb": "Calc. Prêt",
      "seo": {
        "title": "Calculateur de Prêt - Outil de Paiement et d'Amortissement Gratuit",
        "description": "Calculez votre paiement de prêt, le coût total des intérêts et la date de remboursement. Consultez l'échéancier d'amortissement, comparez les conditions et voyez comment les paiements supplémentaires économisent des milliers.",
        "shortDescription": "Calculateur gratuit de paiement de prêt et d'amortissement.",
        "keywords": [
          "calculateur de prêt",
          "calculateur paiement prêt",
          "calculateur amortissement prêt",
          "calculateur intérêts prêt",
          "calculer paiement prêt",
          "calculateur remboursement prêt",
          "calculateur paiement supplémentaire",
          "calculateur prêt gratuit en ligne"
        ]
      },
      "inputs": {
        "loanAmount": {
          "label": "Montant du Prêt",
          "helpText": "Montant total que vous prévoyez emprunter"
        },
        "interestRate": {
          "label": "Taux d'Intérêt (TAP)",
          "helpText": "Taux annuel en pourcentage facturé par le prêteur"
        },
        "loanTerm": {
          "label": "Durée du Prêt",
          "helpText": "Nombre d'années pour rembourser le prêt"
        },
        "extraPayment": {
          "label": "Paiement Mensuel Supplémentaire",
          "helpText": "Montant supplémentaire versé au capital chaque mois (optionnel)"
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Paiement Mensuel"
        },
        "totalInterest": {
          "label": "Intérêts Totaux"
        },
        "totalCost": {
          "label": "Coût Total"
        },
        "costMultiplier": {
          "label": "Multiplicateur de Coût Réel"
        },
        "payoffDate": {
          "label": "Date de Remboursement"
        },
        "interestRatio": {
          "label": "Ratio Intérêts-Capital"
        },
        "interestSaved": {
          "label": "Intérêts Économisés"
        },
        "timeSaved": {
          "label": "Temps Économisé"
        }
      },
      "presets": {
        "carLoan": {
          "label": "Prêt Auto",
          "description": "25 000€ à 6,5% sur 5 ans"
        },
        "homeImprovement": {
          "label": "Amélioration Domicile",
          "description": "15 000€ à 8,5% sur 3 ans"
        },
        "studentLoan": {
          "label": "Prêt Étudiant",
          "description": "35 000€ à 5,5% sur 10 ans"
        },
        "debtConsolidation": {
          "label": "Consolidation Dettes",
          "description": "10 000€ à 12% sur 3 ans"
        },
        "businessLoan": {
          "label": "Prêt Professionnel",
          "description": "50 000€ à 9% sur 7 ans"
        }
      },
      "values": {
        "years": "ans",
        "year": "an",
        "months": "mois",
        "month": "mois",
        "perMonth": "/mois"
      },
      "formats": {
        "summary": "Votre paiement mensuel est de {monthlyPayment} sur {loanTerm} ans. Intérêts totaux : {totalInterest}. Coût total : {totalCost}."
      },
      "infoCards": {
        "metrics": {
          "title": "Répartition du Prêt",
          "items": [
            {
              "label": "Paiement Mensuel",
              "valueKey": "monthlyPayment"
            },
            {
              "label": "Intérêts Totaux Payés",
              "valueKey": "totalInterest"
            },
            {
              "label": "Montant Total Payé",
              "valueKey": "totalCost"
            },
            {
              "label": "Multiplicateur de Coût Réel",
              "valueKey": "costMultiplier"
            }
          ]
        },
        "details": {
          "title": "Faits Essentiels",
          "items": [
            {
              "label": "Une durée plus courte signifie moins d'intérêts totaux mais des paiements mensuels plus élevés. Un prêt de 15 ans coûte généralement 40-60% de moins en intérêts qu'un prêt de 30 ans."
            },
            {
              "label": "Votre cote de crédit impacte directement votre taux d'intérêt. Une cote supérieure à 740 peut économiser des milliers sur la durée du prêt comparé à moins de 670."
            },
            {
              "label": "Les prêts garantis (soutenus par une garantie comme une voiture ou une maison) offrent généralement des taux inférieurs de 2-5 points de pourcentage aux prêts personnels non garantis."
            },
            {
              "label": "Même de petits paiements supplémentaires peuvent réduire drastiquement les intérêts totaux. Un supplément de 50€/mois sur un prêt de 25 000€ peut économiser plus de 1 500€ d'intérêts."
            }
          ]
        },
        "tips": {
          "title": "Économisez sur Votre Prêt",
          "items": [
            "Améliorez votre cote de crédit avant de postuler — même 20 points peuvent réduire votre taux de 0,25-0,5%",
            "Comparez les offres d'au moins 3 prêteurs — les taux peuvent varier de 2-3% pour le même emprunteur",
            "Effectuez des paiements supplémentaires au capital quand possible — chaque euro va directement à la réduction de votre solde",
            "Surveillez les frais d'ouverture et les pénalités de remboursement anticipé — ils peuvent ajouter 1-6% au coût réel d'emprunt"
          ]
        }
      },
      "detailedTable": {
        "amortizationSchedule": {
          "button": "Voir l'Échéancier d'Amortissement",
          "title": "Échéancier d'Amortissement",
          "columns": {
            "period": "Mois",
            "payment": "Paiement",
            "principal": "Capital",
            "interest": "Intérêts",
            "extraPmt": "Supplément",
            "balance": "Solde"
          }
        }
      },
      "chart": {
        "title": "Répartition des Paiements dans le Temps",
        "xLabel": "Année",
        "yLabel": "Montant",
        "series": {
          "principal": "Capital",
          "interest": "Intérêts"
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment les Paiements de Prêt sont Calculés",
          "content": "Lorsque vous contractez un prêt, le prêteur utilise une formule d'amortissement pour déterminer votre paiement mensuel fixe. Cette formule équilibre le montant du prêt (capital), le taux d'intérêt annuel et la durée du prêt afin que chaque paiement couvre à la fois les charges d'intérêts et une portion du capital. Dans les premiers mois, la plupart de votre paiement va aux intérêts car le solde impayé est encore élevé. En remboursant le capital au fil du temps, la portion d'intérêts diminue et une plus grande partie de chaque paiement réduit votre solde. Cette structure prévisible fait des prêts amortis à taux fixe le type de prêt à la consommation le plus courant — vous savez toujours exactement ce que vous devez chaque mois. La formule standard de paiement mensuel est M = P × [r(1+r)^n] / [(1+r)^n – 1], où P est le capital, r est le taux d'intérêt mensuel, et n est le nombre total de paiements. Comprendre cette formule vous aide à voir pourquoi même de petits changements dans le taux d'intérêt ou la durée peuvent affecter significativement votre coût total."
        },
        "howItWorks": {
          "title": "Comprendre l'Amortissement et les Intérêts",
          "content": "L'amortissement est le processus de répartition d'un prêt en une série de paiements fixes dans le temps. Chaque paiement est divisé entre les intérêts (le coût d'emprunt) et le capital (réduction de ce que vous devez). Au début d'un prêt hypothécaire de 30 ans, environ 70-80% de chaque paiement va aux intérêts. À mi-parcours, la répartition est proche de 50/50, et dans les dernières années presque tout votre paiement réduit le solde. Cette structure d'intérêts front-chargés signifie qu'effectuer des paiements supplémentaires tôt dans la durée du prêt a le plus grand impact sur la réduction des intérêts totaux. Par exemple, payer un supplément de 100€ par mois la première année d'un prêt hypothécaire de 200 000€ à 6% pourrait économiser plus de 30 000€ d'intérêts totaux sur la vie du prêt. C'est aussi pourquoi refinancer vers une durée plus courte ou un taux plus bas peut produire des économies dramatiques — vous changez les mathématiques sous-jacentes qui déterminent combien de chaque euro va aux intérêts versus le capital."
        },
        "considerations": {
          "title": "Facteurs qui Affectent le Coût de Votre Prêt",
          "items": [
            {
              "text": "Cote de crédit — Le facteur le plus important de votre taux d'intérêt. Un crédit excellent (740+) peut obtenir des taux 2-4% inférieurs à un crédit moyen (580-669), économisant potentiellement des dizaines de milliers sur la durée du prêt.",
              "type": "info"
            },
            {
              "text": "Durée du prêt — Des durées plus courtes signifient des paiements mensuels plus élevés mais dramatiquement moins d'intérêts totaux. Un prêt de 15 ans vs 30 ans au même taux peut réduire les intérêts totaux de plus de la moitié.",
              "type": "info"
            },
            {
              "text": "Garanti vs non garanti — Les prêts garantis (auto, hypothèque) utilisent une garantie, permettant des taux plus bas (3-8%). Les prêts personnels non garantis ont des taux plus élevés (6-36%) car le prêteur prend plus de risques.",
              "type": "info"
            },
            {
              "text": "Pénalités de remboursement anticipé — Certains prêteurs facturent des frais pour un remboursement anticipé. Vérifiez toujours avant de signer. Les prêts étudiants fédéraux et la plupart des prêts hypothécaires émis après 2014 ne peuvent avoir de pénalités de remboursement anticipé.",
              "type": "warning"
            },
            {
              "text": "Frais d'ouverture — Frais initiaux de 1-8% qui augmentent votre TAP effectif. Un prêt de 10 000€ avec des frais d'ouverture de 5% signifie que vous ne recevez que 9 500€ mais remboursez les 10 000€ complets plus les intérêts.",
              "type": "warning"
            },
            {
              "text": "TAP vs taux d'intérêt — Le TAP inclut les frais et donne le coût réel d'emprunt. Comparez toujours les TAP, pas seulement les taux d'intérêt, lors de la recherche de prêts.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Types Courants de Prêts",
          "items": [
            {
              "text": "Prêts personnels — Prêts non garantis à taux fixe pour presque tout usage. Taux typiques : 6-36% TAP. Durées : 1-7 ans. Meilleur pour la consolidation de dettes, améliorations domiciliaires ou achats importants.",
              "type": "info"
            },
            {
              "text": "Prêts auto — Garantis par le véhicule. Taux typiques : 4-12% TAP. Durées : 2-7 ans. Les voitures neuves obtiennent généralement de meilleurs taux que les voitures usagées. Les experts recommandent des durées de maximum 60 mois.",
              "type": "info"
            },
            {
              "text": "Prêts hypothécaires — Garantis par la maison. Taux typiques : 5-8% TAP. Durées : 15 ou 30 ans. Le plus gros prêt que la plupart des gens contracteront. Les intérêts peuvent être déductibles fiscalement.",
              "type": "info"
            },
            {
              "text": "Prêts étudiants — Les prêts fédéraux offrent des taux fixes fixés par le Congrès (actuellement ~5-7%). Les prêts étudiants privés varient selon la solvabilité. Les plans de remboursement basés sur les revenus sont disponibles pour les prêts fédéraux.",
              "type": "info"
            },
            {
              "text": "Prêts professionnels — Les prêts SBA offrent des taux de 5-10%. Prêts bancaires traditionnels : 6-13%. Prêteurs en ligne : 7-30%+. Les durées varient largement de 1-25 ans selon le type de prêt et l'objectif.",
              "type": "info"
            },
            {
              "text": "Prêts sur valeur domiciliaire — Garantis par la valeur nette de la maison. Taux typiques : 7-12% TAP. Peuvent emprunter jusqu'à 80-85% de la valeur nette. Les intérêts peuvent être déductibles fiscalement si utilisés pour des améliorations domiciliaires.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Calculs de Prêt Étape par Étape",
          "description": "Deux exemples concrets montrant comment les conditions de prêt affectent le coût total",
          "examples": [
            {
              "title": "Prêt Auto : 25 000€ à 6,5% sur 5 ans",
              "steps": [
                "Capital (P) = 25 000€",
                "Taux mensuel (r) = 6,5% ÷ 12 = 0,5417%",
                "Nombre de paiements (n) = 5 × 12 = 60",
                "M = 25 000€ × [0,005417 × (1,005417)^60] / [(1,005417)^60 – 1]",
                "M = 25 000€ × [0,005417 × 1,3829] / [1,3829 – 1]",
                "M = 25 000€ × 0,007492 / 0,3829",
                "Paiement Mensuel = 489,15€",
                "Total Payé = 489,15€ × 60 = 29 349€",
                "Intérêts Totaux = 29 349€ – 25 000€ = 4 349€"
              ],
              "result": "Paiement mensuel : 489,15€ | Intérêts totaux : 4 349€ | Coût réel : 1,17× le montant du prêt"
            },
            {
              "title": "Prêt Étudiant : 35 000€ à 5,5% sur 10 ans",
              "steps": [
                "Capital (P) = 35 000€",
                "Taux mensuel (r) = 5,5% ÷ 12 = 0,4583%",
                "Nombre de paiements (n) = 10 × 12 = 120",
                "M = 35 000€ × [0,004583 × (1,004583)^120] / [(1,004583)^120 – 1]",
                "M = 35 000€ × [0,004583 × 1,7289] / [1,7289 – 1]",
                "M = 35 000€ × 0,007924 / 0,7289",
                "Paiement Mensuel = 380,03€",
                "Total Payé = 380,03€ × 120 = 45 604€",
                "Intérêts Totaux = 45 604€ – 35 000€ = 10 604€"
              ],
              "result": "Paiement mensuel : 380,03€ | Intérêts totaux : 10 604€ | Coût réel : 1,30× le montant du prêt"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la différence entre le TAP et le taux d'intérêt ?",
          "answer": "Le taux d'intérêt est le coût de base d'emprunt d'argent, exprimé en pourcentage. Le TAP (Taux Annuel en Pourcentage) inclut le taux d'intérêt plus les frais supplémentaires comme les frais d'ouverture, frais de clôture et points de réduction. Le TAP vous donne le coût total réel d'emprunt et est la meilleure façon de comparer les offres de prêt de différents prêteurs. Par exemple, un prêt avec un taux d'intérêt de 5% et des frais d'ouverture de 2% a un TAP supérieur à 5%. La loi fédérale exige que les prêteurs divulguent le TAP avant que vous signiez tout accord de prêt."
        },
        {
          "question": "Comment ma cote de crédit affecte-t-elle mon taux d'intérêt de prêt ?",
          "answer": "Votre cote de crédit est le facteur principal que les prêteurs utilisent pour fixer votre taux d'intérêt. Les emprunteurs avec un crédit excellent (740-850) reçoivent généralement des taux 2-4% inférieurs à ceux avec un crédit moyen (580-669). Sur un prêt de 25 000€ sur 5 ans, la différence entre un taux de 6% et 12% est d'environ 4 500€ d'intérêts supplémentaires. Pour améliorer votre taux : payez les factures à temps, réduisez les soldes de cartes de crédit sous 30% des limites, évitez d'ouvrir de nouveaux comptes avant de postuler, et vérifiez votre rapport de crédit pour les erreurs."
        },
        {
          "question": "Dois-je choisir une durée de prêt plus courte ou plus longue ?",
          "answer": "Cela dépend de vos priorités financières. Une durée plus courte (ex. 3 ans vs 7 ans) signifie des paiements mensuels plus élevés mais significativement moins d'intérêts totaux — souvent 50-70% de moins. Une durée plus longue garde les paiements mensuels abordables mais coûte plus dans le temps. La meilleure approche pour beaucoup d'emprunteurs est de prendre la durée plus longue pour la flexibilité mais faire des paiements supplémentaires quand possible. Cela vous donne le filet de sécurité de paiements requis plus bas tout en réduisant les intérêts si vous pouvez vous permettre de payer plus. Utilisez ce calculateur pour comparer différentes durées et voir les économies exactes."
        },
        {
          "question": "Qu'est-ce que l'amortissement et comment ça fonctionne ?",
          "answer": "L'amortissement est le processus de remboursement d'un prêt par des paiements programmés et égaux dans le temps. Chaque paiement inclut deux parties : les intérêts (les frais du prêteur pour emprunter) et le capital (réduction de ce que vous devez). Dans les premiers paiements, la plupart va aux intérêts. Au fil du temps, alors que le solde diminue, plus de chaque paiement va vers le capital. C'est pourquoi payer un supplément tôt dans la durée du prêt a le plus grand impact — vous réduisez le solde sur lequel les intérêts sont calculés, créant un effet d'économies composées tout au long de la durée restante."
        },
        {
          "question": "Puis-je rembourser mon prêt plus tôt sans pénalité ?",
          "answer": "La plupart des prêts modernes permettent un remboursement anticipé sans pénalités. Les prêts étudiants fédéraux, la plupart des prêts auto et les prêts hypothécaires émis après janvier 2014 (sous la règle Ability-to-Repay) ne peuvent facturer de pénalités de remboursement anticipé. Cependant, certains prêts personnels et anciens prêts hypothécaires peuvent les inclure. Vérifiez toujours votre accord de prêt pour une clause de pénalité de remboursement anticipé avant de signer. Si votre prêt n'a pas de pénalité, faire des paiements supplémentaires est l'un des meilleurs mouvements financiers que vous puissiez faire — même un supplément de 50-100€ par mois peut économiser des milliers en intérêts et retrancher des années de votre date de remboursement."
        },
        {
          "question": "Combien puis-je économiser en effectuant des paiements supplémentaires sur mon prêt ?",
          "answer": "Les paiements supplémentaires vont directement à la réduction de votre solde capital, ce qui réduit les intérêts calculés sur tous les paiements futurs. Les économies dépendent de la taille de votre prêt, du taux et de la durée. Par exemple, ajouter 100€/mois de supplément à un prêt de 25 000€ à 7% sur 5 ans économise environ 800€ d'intérêts et rembourse le prêt 10 mois plus tôt. Sur un prêt plus gros comme un prêt hypothécaire de 200 000€ à 6% sur 30 ans, un supplément de 200€/mois économise plus de 65 000€ d'intérêts et réduit de près de 7 ans la durée. Utilisez le champ paiement supplémentaire de ce calculateur pour voir vos économies exactes."
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
      "name": "Darlehensrechner",
      "slug": "darlehensrechner-rechner",
      "subtitle": "Berechnen Sie Ihre monatliche Darlehensrate, die Gesamtzinsen und sehen Sie einen vollständigen Tilgungsplan. Erfahren Sie, wie Sondertilgungen Ihnen Geld sparen.",
      "breadcrumb": "Darlehensrechner",
      "seo": {
        "title": "Darlehensrechner - Kostenloses Raten- & Tilgungsrechner-Tool",
        "description": "Berechnen Sie Ihre Darlehensrate, Gesamtzinskosten und Rückzahlungsdatum. Sehen Sie den Tilgungsplan, vergleichen Sie Laufzeiten und erfahren Sie, wie Sondertilgungen Tausende sparen.",
        "shortDescription": "Kostenloser Darlehensraten- und Tilgungsrechner.",
        "keywords": [
          "darlehensrechner",
          "kreditrechner",
          "tilgungsrechner",
          "zinsenrechner",
          "darlehensrate berechnen",
          "kreditrückzahlung rechner",
          "sondertilgung rechner",
          "kostenloser darlehensrechner online"
        ]
      },
      "inputs": {
        "loanAmount": {
          "label": "Darlehensbetrag",
          "helpText": "Gesamtbetrag, den Sie zu leihen planen"
        },
        "interestRate": {
          "label": "Zinssatz (Effektiver Jahreszins)",
          "helpText": "Jährlicher Prozentsatz, der vom Kreditgeber berechnet wird"
        },
        "loanTerm": {
          "label": "Laufzeit",
          "helpText": "Anzahl der Jahre zur Rückzahlung des Darlehens"
        },
        "extraPayment": {
          "label": "Zusätzliche monatliche Zahlung",
          "helpText": "Zusätzlicher Betrag, der monatlich zur Tilgung gezahlt wird (optional)"
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Monatliche Rate"
        },
        "totalInterest": {
          "label": "Gesamtzinsen"
        },
        "totalCost": {
          "label": "Gesamtkosten"
        },
        "costMultiplier": {
          "label": "Wahre Kostenmultiplikator"
        },
        "payoffDate": {
          "label": "Rückzahlungsdatum"
        },
        "interestRatio": {
          "label": "Zins-zu-Tilgung"
        },
        "interestSaved": {
          "label": "Gesparte Zinsen"
        },
        "timeSaved": {
          "label": "Gesparte Zeit"
        }
      },
      "presets": {
        "carLoan": {
          "label": "Autokredit",
          "description": "25.000€ zu 6,5% für 5 Jahre"
        },
        "homeImprovement": {
          "label": "Modernisierungskredit",
          "description": "15.000€ zu 8,5% für 3 Jahre"
        },
        "studentLoan": {
          "label": "Studienkredit",
          "description": "35.000€ zu 5,5% für 10 Jahre"
        },
        "debtConsolidation": {
          "label": "Umschuldung",
          "description": "10.000€ zu 12% für 3 Jahre"
        },
        "businessLoan": {
          "label": "Geschäftskredit",
          "description": "50.000€ zu 9% für 7 Jahre"
        }
      },
      "values": {
        "years": "Jahre",
        "year": "Jahr",
        "months": "Monate",
        "month": "Monat",
        "perMonth": "/Mon."
      },
      "formats": {
        "summary": "Ihre monatliche Rate beträgt {monthlyPayment} für {loanTerm} Jahre. Gesamtzinsen: {totalInterest}. Gesamtkosten: {totalCost}."
      },
      "infoCards": {
        "metrics": {
          "title": "Darlehens-Übersicht",
          "items": [
            {
              "label": "Monatliche Rate",
              "valueKey": "monthlyPayment"
            },
            {
              "label": "Gesamte gezahlte Zinsen",
              "valueKey": "totalInterest"
            },
            {
              "label": "Gesamtbetrag gezahlt",
              "valueKey": "totalCost"
            },
            {
              "label": "Wahre Kostenmultiplikator",
              "valueKey": "costMultiplier"
            }
          ]
        },
        "details": {
          "title": "Wichtige Fakten",
          "items": [
            {
              "label": "Eine kürzere Laufzeit bedeutet weniger Gesamtzinsen, aber höhere monatliche Raten. Ein 15-Jahres-Darlehen kostet typischerweise 40-60% weniger Zinsen als ein 30-Jahres-Darlehen."
            },
            {
              "label": "Ihre Kreditwürdigkeit beeinflusst direkt Ihren Zinssatz. Ein Score über 740 kann Tausende über die Laufzeit des Darlehens sparen im Vergleich zu unter 670."
            },
            {
              "label": "Besicherte Kredite (durch Sicherheiten wie Auto oder Haus abgesichert) bieten generell 2-5 Prozentpunkte niedrigere Zinsen als unbesicherte Privatkredite."
            },
            {
              "label": "Selbst kleine Sondertilgungen können die Gesamtzinsen drastisch reduzieren. Zusätzliche 50€/Monat bei einem 25.000€-Kredit können über 1.500€ an Zinsen sparen."
            }
          ]
        },
        "tips": {
          "title": "Sparen Sie Geld bei Ihrem Darlehen",
          "items": [
            "Verbessern Sie Ihre Bonität vor der Antragstellung — schon 20 Punkte können Ihren Zinssatz um 0,25-0,5% senken",
            "Vergleichen Sie Angebote von mindestens 3 Kreditgebern — Zinssätze können für denselben Kreditnehmer um 2-3% variieren",
            "Leisten Sie wann immer möglich Sondertilgungen — jeder Euro geht direkt zur Reduzierung Ihres Saldos",
            "Achten Sie auf Bearbeitungsgebühren und Vorfälligkeitsentschädigungen — sie können 1-6% zu den wahren Kreditkosten hinzufügen"
          ]
        }
      },
      "detailedTable": {
        "amortizationSchedule": {
          "button": "Tilgungsplan anzeigen",
          "title": "Tilgungsplan",
          "columns": {
            "period": "Monat",
            "payment": "Rate",
            "principal": "Tilgung",
            "interest": "Zinsen",
            "extraPmt": "Sondertilgung",
            "balance": "Restschuld"
          }
        }
      },
      "chart": {
        "title": "Ratenaufteilung über die Zeit",
        "xLabel": "Jahr",
        "yLabel": "Betrag",
        "series": {
          "principal": "Tilgung",
          "interest": "Zinsen"
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie Darlehensraten berechnet werden",
          "content": "Wenn Sie ein Darlehen aufnehmen, verwendet der Kreditgeber eine Tilgungsformel zur Bestimmung Ihrer festen monatlichen Rate. Diese Formel balanciert den Darlehensbetrag (Kapital), den jährlichen Zinssatz und die Laufzeit so aus, dass jede Rate sowohl Zinskosten als auch einen Teil des Kapitals abdeckt. In den ersten Monaten geht der größte Teil Ihrer Rate zu den Zinsen, da der ausstehende Betrag noch hoch ist. Während Sie das Kapital über die Zeit abbezahlen, schrumpft der Zinsanteil und mehr von jeder Rate reduziert Ihren Saldo. Diese vorhersagbare Struktur macht Festzins-Tilgungsdarlehen zur häufigsten Art von Verbraucherkrediten — Sie wissen immer genau, was Sie jeden Monat schulden. Die Standard-Monatsratenformel ist M = P × [r(1+r)^n] / [(1+r)^n – 1], wobei P das Kapital, r der monatliche Zinssatz und n die Gesamtzahl der Zahlungen ist. Das Verständnis dieser Formel hilft Ihnen zu sehen, warum selbst kleine Änderungen im Zinssatz oder der Laufzeit Ihre Gesamtkosten erheblich beeinflussen können."
        },
        "howItWorks": {
          "title": "Tilgung und Zinsen verstehen",
          "content": "Tilgung ist der Prozess der Verteilung eines Darlehens in eine Reihe fester Zahlungen über die Zeit. Jede Zahlung teilt sich zwischen Zinsen (Kosten des Leihens) und Tilgung (Reduzierung dessen, was Sie schulden) auf. Zu Beginn einer 30-jährigen Hypothek gehen etwa 70-80% jeder Zahlung zu den Zinsen. Zur Hälfte der Laufzeit ist die Aufteilung näher bei 50/50, und in den letzten Jahren reduziert fast Ihre gesamte Zahlung den Saldo. Diese zinsbelastete Struktur am Anfang bedeutet, dass Sondertilgungen früh in der Darlehenslaufzeit die größte Auswirkung auf die Reduzierung der Gesamtzinsen haben. Zum Beispiel könnte eine zusätzliche Zahlung von 100€ pro Monat im ersten Jahr einer 200.000€-Hypothek zu 6% über 30.000€ an Gesamtzinsen über die Darlehenslaufzeit sparen. Deshalb kann eine Umschuldung zu einer kürzeren Laufzeit oder einem niedrigeren Zinssatz dramatische Einsparungen bringen — Sie ändern die zugrundeliegende Mathematik, die bestimmt, wie viel von jedem Euro zu Zinsen versus Tilgung geht."
        },
        "considerations": {
          "title": "Faktoren, die Ihre Darlehenskosten beeinflussen",
          "items": [
            {
              "text": "Kreditwürdigkeit — Der wichtigste Faktor für Ihren Zinssatz. Ausgezeichnete Bonität (740+) kann Zinssätze 2-4% niedriger als mittlere Bonität (580-669) erhalten, was potenziell Zehntausende über die Darlehenslaufzeit spart.",
              "type": "info"
            },
            {
              "text": "Darlehenslaufzeit — Kürzere Laufzeiten bedeuten höhere monatliche Raten, aber drastisch weniger Gesamtzinsen. Ein 15-Jahres- vs. 30-Jahres-Darlehen zum gleichen Zinssatz kann die Gesamtzinsen um mehr als die Hälfte reduzieren.",
              "type": "info"
            },
            {
              "text": "Besichert vs. unbesichert — Besicherte Darlehen (Auto, Hypothek) verwenden Sicherheiten und ermöglichen niedrigere Zinssätze (3-8%). Unbesicherte Privatkredite haben höhere Zinssätze (6-36%), weil der Kreditgeber mehr Risiko trägt.",
              "type": "info"
            },
            {
              "text": "Vorfälligkeitsentschädigungen — Einige Kreditgeber berechnen Gebühren für vorzeitige Rückzahlung. Prüfen Sie dies immer vor der Unterzeichnung. Bundesstudentendarlehen und die meisten nach 2014 vergebenen Hypotheken können keine Vorfälligkeitsentschädigungen haben.",
              "type": "warning"
            },
            {
              "text": "Bearbeitungsgebühren — Vorabgebühren von 1-8%, die Ihren effektiven Jahreszins erhöhen. Ein 10.000€-Darlehen mit 5% Bearbeitungsgebühr bedeutet, Sie erhalten nur 9.500€, aber zahlen die vollen 10.000€ plus Zinsen zurück.",
              "type": "warning"
            },
            {
              "text": "Effektiver Jahreszins vs. Nominalzins — Der effektive Jahreszins beinhaltet Gebühren und gibt die wahren Kreditkosten an. Vergleichen Sie immer effektive Jahreszinssätze, nicht nur Nominalzinssätze, beim Kreditvergleich.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Häufige Darlehensarten",
          "items": [
            {
              "text": "Privatkredite — Unbesicherte, festverzinsliche Darlehen für fast jeden Zweck. Typische Zinssätze: 6-36% effektiver Jahreszins. Laufzeiten: 1-7 Jahre. Ideal für Umschuldung, Modernisierungen oder größere Anschaffungen.",
              "type": "info"
            },
            {
              "text": "Autokredite — Durch das Fahrzeug besichert. Typische Zinssätze: 4-12% effektiver Jahreszins. Laufzeiten: 2-7 Jahre. Neuwagen erhalten generell bessere Zinssätze als Gebrauchtwagen. Experten empfehlen Laufzeiten nicht länger als 60 Monate.",
              "type": "info"
            },
            {
              "text": "Immobiliendarlehen — Durch das Haus besichert. Typische Zinssätze: 5-8% effektiver Jahreszins. Laufzeiten: 15 oder 30 Jahre. Das größte Darlehen, das die meisten Menschen je aufnehmen werden. Zinsen können steuerlich absetzbar sein.",
              "type": "info"
            },
            {
              "text": "Studienkredite — Bundesstudentendarlehen bieten vom Kongress festgelegte Festzinssätze (derzeit ~5-7%). Private Studienkredite variieren je nach Kreditwürdigkeit. Einkommensabhängige Rückzahlungspläne sind für Bundesstudentendarlehen verfügbar.",
              "type": "info"
            },
            {
              "text": "Geschäftskredite — KfW-Kredite bieten Zinssätze von 5-10%. Traditionelle Bankkredite: 6-13%. Online-Kreditgeber: 7-30%+. Laufzeiten variieren stark von 1-25 Jahren je nach Kreditart und Zweck.",
              "type": "info"
            },
            {
              "text": "Immobilienkredite — Durch Eigenheimwert besichert. Typische Zinssätze: 7-12% effektiver Jahreszins. Kann bis zu 80-85% des Eigenkapitals beleihen. Zinsen können steuerlich absetzbar sein, wenn für Modernisierungen verwendet.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Schritt-für-Schritt Darlehensberechnungen",
          "description": "Zwei reale Beispiele, die zeigen, wie Darlehensbedingungen die Gesamtkosten beeinflussen",
          "examples": [
            {
              "title": "Autokredit: 25.000€ zu 6,5% für 5 Jahre",
              "steps": [
                "Kapital (P) = 25.000€",
                "Monatlicher Zinssatz (r) = 6,5% ÷ 12 = 0,5417%",
                "Anzahl Zahlungen (n) = 5 × 12 = 60",
                "M = 25.000€ × [0,005417 × (1,005417)^60] / [(1,005417)^60 – 1]",
                "M = 25.000€ × [0,005417 × 1,3829] / [1,3829 – 1]",
                "M = 25.000€ × 0,007492 / 0,3829",
                "Monatliche Rate = 489,15€",
                "Gesamt gezahlt = 489,15€ × 60 = 29.349€",
                "Gesamtzinsen = 29.349€ – 25.000€ = 4.349€"
              ],
              "result": "Monatliche Rate: 489,15€ | Gesamtzinsen: 4.349€ | Wahre Kosten: 1,17× des Darlehensbetrags"
            },
            {
              "title": "Studienkredit: 35.000€ zu 5,5% für 10 Jahre",
              "steps": [
                "Kapital (P) = 35.000€",
                "Monatlicher Zinssatz (r) = 5,5% ÷ 12 = 0,4583%",
                "Anzahl Zahlungen (n) = 10 × 12 = 120",
                "M = 35.000€ × [0,004583 × (1,004583)^120] / [(1,004583)^120 – 1]",
                "M = 35.000€ × [0,004583 × 1,7289] / [1,7289 – 1]",
                "M = 35.000€ × 0,007924 / 0,7289",
                "Monatliche Rate = 380,03€",
                "Gesamt gezahlt = 380,03€ × 120 = 45.604€",
                "Gesamtzinsen = 45.604€ – 35.000€ = 10.604€"
              ],
              "result": "Monatliche Rate: 380,03€ | Gesamtzinsen: 10.604€ | Wahre Kosten: 1,30× des Darlehensbetrags"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist der Unterschied zwischen effektivem Jahreszins und Nominalzins?",
          "answer": "Der Nominalzins sind die Grundkosten für das Leihen von Geld, ausgedrückt als Prozentsatz. Der effektive Jahreszins beinhaltet den Nominalzins plus zusätzliche Gebühren wie Bearbeitungsgebühren, Abschlusskosten und Disagio. Der effektive Jahreszins gibt Ihnen die wahren Gesamtkosten des Leihens und ist der beste Weg, Darlehensangebote verschiedener Kreditgeber zu vergleichen. Zum Beispiel hat ein Darlehen mit 5% Nominalzins und 2% Bearbeitungsgebühr einen effektiven Jahreszins höher als 5%. Das Gesetz verpflichtet Kreditgeber, den effektiven Jahreszins vor der Unterzeichnung offenzulegen."
        },
        {
          "question": "Wie beeinflusst meine Kreditwürdigkeit meinen Darlehenszinssatz?",
          "answer": "Ihre Kreditwürdigkeit ist der Hauptfaktor, den Kreditgeber zur Festsetzung Ihres Zinssatzes verwenden. Kreditnehmer mit ausgezeichneter Bonität (740-850) erhalten typischerweise Zinssätze 2-4% niedriger als die mit mittlerer Bonität (580-669). Bei einem 25.000€-Darlehen über 5 Jahre beträgt der Unterschied zwischen einem 6%-Zinssatz und einem 12%-Zinssatz etwa 4.500€ zusätzliche Zinsen. Um Ihren Zinssatz zu verbessern: zahlen Sie Rechnungen pünktlich, reduzieren Sie Kreditkartensalden unter 30% der Limits, vermeiden Sie neue Konten vor der Antragstellung und prüfen Sie Ihren Kreditbericht auf Fehler."
        },
        {
          "question": "Sollte ich eine kürzere oder längere Darlehenslaufzeit wählen?",
          "answer": "Das hängt von Ihren finanziellen Prioritäten ab. Eine kürzere Laufzeit (z.B. 3 Jahre vs. 7 Jahre) bedeutet höhere monatliche Raten, aber erheblich weniger Gesamtzinsen — oft 50-70% weniger. Eine längere Laufzeit hält die monatlichen Raten bezahlbar, kostet aber über die Zeit mehr. Der beste Ansatz für viele Kreditnehmer ist, die längere Laufzeit für Flexibilität zu nehmen, aber Sondertilgungen zu leisten, wenn möglich. Das gibt Ihnen das Sicherheitsnetz niedrigerer erforderlicher Zahlungen, während Sie trotzdem Zinsen reduzieren, wenn Sie sich mehr leisten können. Verwenden Sie diesen Rechner, um verschiedene Laufzeiten zu vergleichen und die genauen Einsparungen zu sehen."
        },
        {
          "question": "Was ist Tilgung und wie funktioniert sie?",
          "answer": "Tilgung ist der Prozess der Rückzahlung eines Darlehens durch geplante, gleiche Zahlungen über die Zeit. Jede Zahlung beinhaltet zwei Teile: Zinsen (Gebühr des Kreditgebers fürs Leihen) und Tilgung (Reduzierung dessen, was Sie schulden). Bei den frühen Zahlungen geht das meiste zu den Zinsen. Über die Zeit, wenn der Saldo sinkt, geht mehr von jeder Zahlung zur Tilgung. Deshalb haben Sondertilgungen früh in der Darlehenslaufzeit die größte Auswirkung — Sie reduzieren den Saldo, auf dem Zinsen berechnet werden, was einen kumulativen Spareffekt während der verbleibenden Laufzeit schafft."
        },
        {
          "question": "Kann ich mein Darlehen vorzeitig ohne Strafe abbezahlen?",
          "answer": "Die meisten modernen Darlehen erlauben vorzeitige Rückzahlung ohne Strafen. Bundesstudentendarlehen, die meisten Autokredite und nach Januar 2014 vergebene Hypotheken (unter der Rückzahlungsfähigkeits-Regel) können keine Vorfälligkeitsentschädigungen berechnen. Einige Privatkredite und ältere Hypotheken können sie jedoch beinhalten. Prüfen Sie immer Ihren Darlehensvertrag auf eine Vorfälligkeitsentschädigungsklausel vor der Unterzeichnung. Wenn Ihr Darlehen keine Strafe hat, sind Sondertilgungen eine der besten finanziellen Entscheidungen, die Sie treffen können — selbst zusätzliche 50-100€ pro Monat können Tausende an Zinsen sparen und Jahre von Ihrem Rückzahlungsdatum abziehen."
        },
        {
          "question": "Wie viel kann ich durch Sondertilgungen bei meinem Darlehen sparen?",
          "answer": "Sondertilgungen gehen direkt zur Reduzierung Ihres Kapitalsaldos, was die auf alle zukünftigen Zahlungen berechneten Zinsen senkt. Die Einsparungen hängen von Ihrer Darlehensgröße, dem Zinssatz und der Laufzeit ab. Zum Beispiel spart das Hinzufügen von 100€/Monat extra zu einem 25.000€-Darlehen zu 7% für 5 Jahre etwa 800€ an Zinsen und zahlt das Darlehen 10 Monate früher ab. Bei einem größeren Darlehen wie einer 200.000€-Hypothek zu 6% für 30 Jahre sparen zusätzliche 200€/Monat über 65.000€ an Zinsen und kürzen fast 7 Jahre von der Laufzeit. Verwenden Sie das Feld für Sondertilgungen in diesem Rechner, um Ihre genauen Einsparungen zu sehen."
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

  // ---------------------------------------------------------------------------
  // INPUTS
  // ---------------------------------------------------------------------------
  inputs: [
    {
      id: "loanAmount",
      type: "number",
      defaultValue: null,
      placeholder: "25000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 100,
      max: 10000000,
    },
    {
      id: "interestRate",
      type: "number",
      defaultValue: 7,
      min: 0,
      max: 36,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "loanTerm",
      type: "number",
      defaultValue: 5,
      min: 1,
      max: 30,
      suffix: "years",
    },
    {
      id: "extraPayment",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 100000,
    },
  ],

  inputGroups: [],

  // ---------------------------------------------------------------------------
  // RESULTS
  // ---------------------------------------------------------------------------
  results: [
    { id: "monthlyPayment", type: "primary", format: "text" },
    { id: "totalInterest", type: "secondary", format: "text" },
    { id: "totalCost", type: "secondary", format: "text" },
    { id: "costMultiplier", type: "secondary", format: "text" },
    { id: "payoffDate", type: "secondary", format: "text" },
    { id: "interestRatio", type: "secondary", format: "text" },
    { id: "interestSaved", type: "secondary", format: "text" },
    { id: "timeSaved", type: "secondary", format: "text" },
  ],

  // ---------------------------------------------------------------------------
  // INFOCARDS (2 list + 1 horizontal tips)
  // ---------------------------------------------------------------------------
  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "🎯", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ---------------------------------------------------------------------------
  // CHART — Stacked bar: principal vs interest per year
  // ---------------------------------------------------------------------------
  chart: {
    id: "paymentBreakdown",
    type: "bar",
    xKey: "year",
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "principal", color: "#3b82f6", stackId: "pmt" },
      { key: "interest", color: "#f97316", stackId: "pmt" },
    ],
  },

  // ---------------------------------------------------------------------------
  // DETAILED TABLE — Amortization Schedule
  // ---------------------------------------------------------------------------
  detailedTable: {
    id: "amortizationSchedule",
    buttonLabel: "View Amortization Schedule",
    buttonIcon: "📋",
    modalTitle: "Amortization Schedule",
    columns: [
      { id: "period", label: "Month", align: "center" as const },
      { id: "payment", label: "Payment", align: "right" as const },
      { id: "principal", label: "Principal", align: "right" as const },
      { id: "interest", label: "Interest", align: "right" as const },
      { id: "extraPmt", label: "Extra", align: "right" as const },
      { id: "balance", label: "Balance", align: "right" as const, highlight: true },
    ],
  },

  referenceData: [],

  // ---------------------------------------------------------------------------
  // EDUCATION SECTIONS (2 prose + 2 list + 1 code-example)
  // ---------------------------------------------------------------------------
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ---------------------------------------------------------------------------
  // FAQS (6 — targeting long-tail keywords for SEO)
  // ---------------------------------------------------------------------------
  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  // ---------------------------------------------------------------------------
  // REFERENCES (E-E-A-T signals for Google)
  // ---------------------------------------------------------------------------
  references: [
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2024",
      title: "What is amortization and how could it affect my auto loan?",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-and-how-could-it-affect-my-auto-loan-en-2069/",
    },
    {
      authors: "Board of Governors of the Federal Reserve System",
      year: "2024",
      title: "Consumer Credit - G.19 Statistical Release",
      source: "Federal Reserve",
      url: "https://www.federalreserve.gov/releases/g19/current/",
    },
  ],

  hero: {},
  sidebar: {},
  features: {},
  relatedCalculators: [
    "personal-loan-calculator",
    "mortgage-calculator",
    "auto-loan-calculator",
    "compound-interest-calculator",
    "credit-card-payoff-calculator",
  ],
  ads: {},
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateLoanCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits } = data;

  // --- Read inputs ---
  const loanAmount = values.loanAmount as number;
  const annualRate = values.interestRate as number;
  const termYears = values.loanTerm as number;
  const extraPayment = (values.extraPayment as number) || 0;

  // --- Validate ---
  if (!loanAmount || loanAmount <= 0 || !annualRate || annualRate <= 0 || !termYears || termYears <= 0) {
    return {
      values: {},
      formatted: {},
      summary: "",
      isValid: false,
    };
  }

  // --- Currency symbol ---
  const curr = fieldUnits?.loanAmount || "USD";
  const SYMBOLS: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
    JPY: "¥", INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF ",
    COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
    CNY: "¥", KRW: "₩", SEK: "kr ", NOK: "kr ", DKK: "kr ",
    PLN: "zł ", CZK: "Kč ", HUF: "Ft ", TRY: "₺",
    ZAR: "R ", NZD: "NZ$", SGD: "S$", HKD: "HK$", TWD: "NT$",
    THB: "฿", PHP: "₱", IDR: "Rp ", MYR: "RM ",
  };
  const sym = SYMBOLS[curr] || "$";

  // --- Helper functions ---
  const fmtMoney = (val: number): string => {
    if (Math.abs(val) >= 1000) {
      return sym + val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    return sym + val.toFixed(2);
  };

  const fmtNum = (val: number, decimals = 0): string => {
    return val.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  // --- Core calculation ---
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = termYears * 12;

  // Standard amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / totalPayments;
  } else {
    const factor = Math.pow(1 + monthlyRate, totalPayments);
    monthlyPayment = loanAmount * (monthlyRate * factor) / (factor - 1);
  }

  // --- WITHOUT extra payments (baseline) ---
  const totalPaidBaseline = monthlyPayment * totalPayments;
  const totalInterestBaseline = totalPaidBaseline - loanAmount;

  // --- WITH extra payments (iterative amortization) ---
  let balance = loanAmount;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;
  let totalExtraPaid = 0;
  let actualPayments = 0;

  // For amortization table
  const tableData: Array<Record<string, string>> = [];

  // For chart — aggregate by year
  const yearlyPrincipal: Record<number, number> = {};
  const yearlyInterest: Record<number, number> = {};

  while (balance > 0.01 && actualPayments < totalPayments * 2) {
    actualPayments++;
    const interestPortion = balance * monthlyRate;
    let principalPortion = monthlyPayment - interestPortion;

    // Cap if payment exceeds balance
    let extra = extraPayment;
    if (principalPortion + extra > balance) {
      const remaining = balance;
      principalPortion = Math.min(principalPortion, remaining);
      extra = Math.max(0, remaining - principalPortion);
    }

    totalInterestPaid += interestPortion;
    totalPrincipalPaid += principalPortion;
    totalExtraPaid += extra;
    balance -= (principalPortion + extra);
    if (balance < 0) balance = 0;

    // Year aggregation
    const yearNum = Math.ceil(actualPayments / 12);
    yearlyPrincipal[yearNum] = (yearlyPrincipal[yearNum] || 0) + principalPortion + extra;
    yearlyInterest[yearNum] = (yearlyInterest[yearNum] || 0) + interestPortion;

    // Amortization table row
    const totalPmt = interestPortion + principalPortion + extra;
    tableData.push({
      period: String(actualPayments),
      payment: fmtMoney(totalPmt),
      principal: fmtMoney(principalPortion),
      interest: fmtMoney(interestPortion),
      extraPmt: extra > 0 ? fmtMoney(extra) : "—",
      balance: fmtMoney(balance),
    });
  }

  const totalPaidActual = totalPrincipalPaid + totalInterestPaid + totalExtraPaid;
  const costMultiplier = totalPaidActual / loanAmount;

  // --- Interest saved & time saved ---
  const interestSaved = extraPayment > 0 ? totalInterestBaseline - totalInterestPaid : 0;
  const timeSavedMonths = extraPayment > 0 ? totalPayments - actualPayments : 0;
  const timeSavedYears = Math.floor(timeSavedMonths / 12);
  const timeSavedRemMonths = timeSavedMonths % 12;

  // --- Payoff date ---
  const now = new Date();
  const payoffDate = new Date(now);
  payoffDate.setMonth(payoffDate.getMonth() + actualPayments);
  const payoffStr = payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // --- Interest ratio ---
  const interestPct = (totalInterestPaid / totalPaidActual) * 100;

  // --- Chart data (per year) ---
  const chartData: Array<Record<string, unknown>> = [];
  const maxYear = Math.ceil(actualPayments / 12);
  for (let y = 1; y <= maxYear; y++) {
    chartData.push({
      year: `Y${y}`,
      principal: Math.round(yearlyPrincipal[y] || 0),
      interest: Math.round(yearlyInterest[y] || 0),
    });
  }

  // --- Time saved string ---
  let timeSavedStr = "—";
  if (extraPayment > 0 && timeSavedMonths > 0) {
    if (timeSavedYears > 0 && timeSavedRemMonths > 0) {
      timeSavedStr = `${timeSavedYears} yr ${timeSavedRemMonths} mo`;
    } else if (timeSavedYears > 0) {
      timeSavedStr = `${timeSavedYears} yr`;
    } else {
      timeSavedStr = `${timeSavedRemMonths} mo`;
    }
  }

  return {
    values: {
      monthlyPayment,
      totalInterest: totalInterestPaid,
      totalCost: totalPaidActual,
      costMultiplier,
      payoffDate: payoffDate.getTime(),
      interestRatio: interestPct,
      interestSaved,
      timeSaved: timeSavedMonths,
    },
    formatted: {
      monthlyPayment: fmtMoney(Math.round(monthlyPayment * 100) / 100),
      totalInterest: fmtMoney(Math.round(totalInterestPaid)),
      totalCost: fmtMoney(Math.round(totalPaidActual)),
      costMultiplier: `${costMultiplier.toFixed(2)}×`,
      payoffDate: payoffStr,
      interestRatio: `${interestPct.toFixed(1)}%`,
      interestSaved: interestSaved > 0 ? fmtMoney(Math.round(interestSaved)) : "—",
      timeSaved: timeSavedStr,
    },
    summary: `Your monthly payment is ${fmtMoney(Math.round(monthlyPayment * 100) / 100)} for ${termYears} years. Total interest: ${fmtMoney(Math.round(totalInterestPaid))}. Total cost: ${fmtMoney(Math.round(totalPaidActual))}.`,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default loanCalculatorConfig;
