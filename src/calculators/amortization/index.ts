import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─── HELPER: Format number with commas ───
function fmtNum(val: number, decimals = 2): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.01) return val.toFixed(decimals);
  return val.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ─── HELPER: Currency symbols ───
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", CAD: "C$", AUD: "A$",
  MXN: "MX$", BRL: "R$", JPY: "¥", INR: "₹", CHF: "CHF ",
  COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  CNY: "¥", KRW: "₩", SEK: "kr ", NOK: "kr ", DKK: "kr ",
  PLN: "zł ", CZK: "Kč ", HUF: "Ft ", TRY: "₺",
  ZAR: "R", NZD: "NZ$", SGD: "S$", HKD: "HK$",
  THB: "฿", MYR: "RM ", PHP: "₱", IDR: "Rp ",
  VND: "₫", EGP: "E£", NGN: "₦",
};

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════

export const amortizationCalculatorConfig: CalculatorConfigV4 = {
  id: "amortization",
  version: "4.0",
  category: "finance",
  icon: "📋",

  // ─── PRESETS (4 Loan Types) ───
  presets: [
    {
      id: "homeMortgage",
      icon: "🏠",
      values: {
        loanAmount: 350000,
        annualInterestRate: 6.8,
        loanTermYears: 30,
        paymentFrequency: "monthly",
        includeExtraPayments: false,
        extraMonthlyPayment: null,
        extraYearlyPayment: null,
        extraOneTimePayment: null,
        oneTimePaymentMonth: 12,
      },
    },
    {
      id: "autoLoan",
      icon: "🚗",
      values: {
        loanAmount: 35000,
        annualInterestRate: 6.5,
        loanTermYears: 5,
        paymentFrequency: "monthly",
        includeExtraPayments: true,
        extraMonthlyPayment: 50,
        extraYearlyPayment: null,
        extraOneTimePayment: null,
        oneTimePaymentMonth: 12,
      },
    },
    {
      id: "studentLoan",
      icon: "🎓",
      values: {
        loanAmount: 45000,
        annualInterestRate: 5.5,
        loanTermYears: 10,
        paymentFrequency: "monthly",
        includeExtraPayments: false,
        extraMonthlyPayment: null,
        extraYearlyPayment: null,
        extraOneTimePayment: null,
        oneTimePaymentMonth: 12,
      },
    },
    {
      id: "personalLoan",
      icon: "💼",
      values: {
        loanAmount: 15000,
        annualInterestRate: 10.5,
        loanTermYears: 3,
        paymentFrequency: "monthly",
        includeExtraPayments: true,
        extraMonthlyPayment: 100,
        extraYearlyPayment: null,
        extraOneTimePayment: null,
        oneTimePaymentMonth: 12,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only → script translates) ───
  t: {
    en: {
      name: "Amortization Calculator",
      slug: "amortization",
      subtitle: "Generate a complete amortization schedule and see how extra payments can save you thousands in interest.",
      breadcrumb: "Amortization",

      seo: {
        title: "Amortization Calculator - Free Loan Payment Schedule",
        description: "Generate a detailed amortization schedule for any loan. See payment breakdowns, interest savings from extra payments, and biweekly comparison. Works for mortgages, auto loans, student loans, and more.",
        shortDescription: "Free amortization schedule calculator with extra payment analysis.",
        keywords: [
          "amortization calculator",
          "amortization schedule",
          "loan amortization",
          "mortgage amortization calculator",
          "extra payment calculator",
          "loan payoff calculator",
          "free amortization table",
          "biweekly payment savings",
        ],
      },

      calculator: { yourInformation: "Loan Details" },
      ui: {
        yourInformation: "Loan Details",
        calculate: "Generate Schedule",
        reset: "Reset",
        results: "Amortization Results",
      },

      inputs: {
        loanAmount: {
          label: "Loan Amount",
          helpText: "The total principal amount you borrowed or plan to borrow.",
        },
        annualInterestRate: {
          label: "Annual Interest Rate",
          helpText: "The yearly interest rate on your loan (APR).",
        },
        loanTermYears: {
          label: "Loan Term",
          helpText: "The total length of the loan in years.",
        },
        paymentFrequency: {
          label: "Payment Frequency",
          helpText: "How often you make payments. Biweekly = 26 payments/year (saves interest).",
          options: {
            monthly: "Monthly (12/yr)",
            biweekly: "Biweekly (26/yr)",
            acceleratedBiweekly: "Accelerated Biweekly",
            weekly: "Weekly (52/yr)",
            semiMonthly: "Semi-Monthly (24/yr)",
          },
        },
        includeExtraPayments: {
          label: "Include Extra Payments",
          helpText: "Add extra payments to pay off your loan faster and save on interest.",
        },
        extraMonthlyPayment: {
          label: "Extra Monthly Payment",
          helpText: "Additional amount added to every regular payment toward principal.",
        },
        extraYearlyPayment: {
          label: "Extra Yearly Payment",
          helpText: "One additional payment each year applied entirely to principal.",
        },
        extraOneTimePayment: {
          label: "Extra One-Time Payment",
          helpText: "A single lump sum payment applied toward the principal.",
        },
        oneTimePaymentMonth: {
          label: "One-Time Payment at Month #",
          helpText: "The payment number when the lump sum is applied (e.g., 12 = end of year 1).",
        },
      },

      results: {
        monthlyPayment: { label: "Regular Payment" },
        totalInterest: { label: "Total Interest" },
        totalPaid: { label: "Total Amount Paid" },
        interestToPrincipalRatio: { label: "Interest per $1 Borrowed" },
        dailyInterestCost: { label: "Daily Interest Cost (Year 1)" },
        payoffDate: { label: "Payoff Date" },
        interestSaved: { label: "Interest Saved" },
        timeSaved: { label: "Time Saved" },
      },

      presets: {
        homeMortgage: { label: "Home Mortgage", description: "$350K, 6.8%, 30 years" },
        autoLoan: { label: "Auto Loan", description: "$35K, 6.5%, 5 years" },
        studentLoan: { label: "Student Loan", description: "$45K, 5.5%, 10 years" },
        personalLoan: { label: "Personal Loan", description: "$15K, 10.5%, 3 years" },
      },

      values: {
        years: "years",
        year: "year",
        months: "months",
        month: "month",
        days: "days",
        day: "day",
        perDay: "/day",
        perDollar: "per $1 borrowed",
        weekly: "weekly",
        biweekly: "biweekly",
        monthly: "monthly",
        semiMonthly: "semi-monthly",
        acceleratedBiweekly: "accel. biweekly",
        saved: "saved",
        earlier: "earlier",
        none: "—",
      },

      formats: {
        summary: "Your regular payment is {monthlyPayment}. Over the life of the loan, you'll pay {totalInterest} in interest — that's {interestToPrincipalRatio} for every dollar borrowed.",
      },

      infoCards: {
        snapshot: {
          title: "Loan Snapshot",
          items: [
            { label: "Regular Payment", valueKey: "monthlyPayment" },
            { label: "Total Interest", valueKey: "totalInterest" },
            { label: "Total Paid", valueKey: "totalPaid" },
            { label: "Payoff Date", valueKey: "payoffDate" },
          ],
        },
        breakdown: {
          title: "Payment Insights",
          items: [
            { label: "First Payment — Interest", valueKey: "firstPaymentInterest" },
            { label: "First Payment — Principal", valueKey: "firstPaymentPrincipal" },
            { label: "Daily Interest Cost (Year 1)", valueKey: "dailyInterestCost" },
            { label: "Equity at Midpoint", valueKey: "equityAtMidpoint" },
            { label: "Biweekly Savings", valueKey: "biweeklySavings" },
          ],
        },
        tips: {
          title: "Save Money on Your Loan",
          items: [
            "Switch to biweekly payments — you'll make one extra payment per year and save thousands in interest.",
            "Adding even $50–$100/month extra to principal dramatically shortens your loan and reduces total interest.",
            "Refinance when rates drop 1%+ below your current rate — it can save tens of thousands over the loan life.",
            "Apply windfalls (tax refunds, bonuses) as one-time extra payments to slash years off your loan.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is Loan Amortization?",
          content: "Loan amortization is the process of paying off a debt through regular, scheduled payments over a set period of time. Each payment is divided between two components: interest (the cost of borrowing) and principal (reducing what you owe). In the early years of a loan, the majority of each payment goes toward interest. As you progress through the schedule, more of each payment is applied to principal. This gradual shift is why an amortization schedule is so valuable — it shows exactly where your money goes with each payment and helps you understand the true cost of borrowing. Understanding amortization empowers you to make strategic decisions, such as when to make extra payments or whether refinancing makes financial sense.",
        },
        howItWorks: {
          title: "How the Amortization Calculator Works",
          content: "This calculator uses the standard amortization formula to determine your fixed periodic payment based on your loan amount, interest rate, and term. It then generates a complete payment-by-payment schedule showing the interest portion, principal portion, and remaining balance for each payment. The formula divides your annual interest rate by the number of payment periods per year, then uses this periodic rate to calculate a fixed payment that fully amortizes the loan over the specified term. When you enable extra payments, the calculator applies those additional amounts directly to the principal balance, recalculating interest savings and the shortened payoff timeline. The biweekly comparison shows how splitting your monthly payment into 26 bi-weekly payments (equivalent to 13 monthly payments per year) accelerates your payoff.",
        },
        considerations: {
          title: "Key Factors to Consider",
          items: [
            { text: "A longer loan term means lower monthly payments but significantly more total interest paid over the life of the loan.", type: "info" },
            { text: "Even small rate differences matter enormously — 0.5% on a $300K mortgage over 30 years can mean $30,000+ in extra interest.", type: "warning" },
            { text: "Front-loaded interest means you build equity slowly at first — after 5 years on a 30-year mortgage, you may have only paid off 5-10% of the principal.", type: "info" },
            { text: "Check your loan terms for prepayment penalties before making extra payments. Most modern loans allow prepayment without penalty.", type: "warning" },
            { text: "Biweekly payments effectively add one full extra monthly payment per year, potentially saving tens of thousands in interest.", type: "info" },
            { text: "Consider your opportunity cost — if your loan rate is 4% but you can invest at 8%, extra payments may not be optimal.", type: "info" },
          ],
        },
        strategies: {
          title: "Extra Payment Strategies",
          items: [
            { text: "Round up: If your payment is $1,287, round to $1,300 — the extra $13/month adds up significantly over time.", type: "info" },
            { text: "One extra payment per year: Make 13 payments instead of 12 — this alone can cut 4-6 years off a 30-year mortgage.", type: "info" },
            { text: "Lump sum windfalls: Apply tax refunds, bonuses, or inheritances directly to principal for maximum impact.", type: "info" },
            { text: "Dollar-cost averaging: Increase your extra payment by $10-25 each year as your income grows.", type: "info" },
            { text: "Target the crossover point: Pay extra until you reach the month where principal exceeds interest in your regular payment.", type: "info" },
            { text: "Refinance + maintain payment: If you refinance to a lower rate, keep paying the same amount — the difference goes to principal.", type: "info" },
          ],
        },
        examples: {
          title: "Amortization Examples",
          description: "See how amortization works with real numbers",
          examples: [
            {
              title: "30-Year Mortgage — $300,000 at 6.5%",
              steps: [
                "Monthly payment: $1,896.20",
                "First payment: $1,625 interest + $271 principal",
                "Total interest over 30 years: $382,633",
                "Interest-to-principal ratio: $1.28 per $1 borrowed",
                "With $200/mo extra: Save $99,838 in interest, pay off 7 years early",
              ],
              result: "Adding just $200/month saves nearly $100,000 and eliminates 7 years of payments.",
            },
            {
              title: "5-Year Auto Loan — $30,000 at 6.0%",
              steps: [
                "Monthly payment: $579.98",
                "First payment: $150 interest + $430 principal",
                "Total interest over 5 years: $4,799",
                "Interest-to-principal ratio: $0.16 per $1 borrowed",
                "With $100/mo extra: Save $507 in interest, pay off 9 months early",
              ],
              result: "Shorter loan terms mean less interest overall — always choose the shortest term you can afford.",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is an amortization schedule?",
          answer: "An amortization schedule is a detailed table showing every payment over the life of your loan. For each payment, it breaks down how much goes toward interest versus principal, and shows the remaining balance. Early payments are mostly interest, while later payments are mostly principal. This schedule helps you understand the true cost of your loan and plan extra payment strategies.",
        },
        {
          question: "How do extra payments reduce my total interest?",
          answer: "Extra payments go directly toward reducing your principal balance. Since interest is calculated on the remaining balance, a lower principal means less interest accrues each period. This creates a compounding effect — each extra dollar paid toward principal saves more than a dollar in future interest. Even small extra payments can save thousands over the life of a long-term loan.",
        },
        {
          question: "What's the difference between biweekly and monthly payments?",
          answer: "With monthly payments, you make 12 payments per year. With biweekly payments, you pay half the monthly amount every two weeks, resulting in 26 half-payments (equivalent to 13 full monthly payments per year). That extra payment each year goes entirely to principal, which can shorten a 30-year mortgage by about 4-5 years and save tens of thousands in interest.",
        },
        {
          question: "Does this calculator work for different loan types?",
          answer: "Yes! This amortization calculator works for any fixed-rate installment loan including mortgages, auto loans, student loans, personal loans, and business loans. Simply enter your loan amount, interest rate, and term. The presets provide typical values for common loan types to get you started quickly.",
        },
        {
          question: "Why does so much of my early payment go to interest?",
          answer: "In a standard amortized loan, interest is calculated on the remaining balance. At the start, your balance is at its highest, so the interest charge is large. As you gradually pay down the principal, less interest accrues and more of each payment goes toward principal. For example, on a $300,000 mortgage at 6.5%, your first payment includes about $1,625 in interest but only $271 toward principal.",
        },
        {
          question: "What is the interest-to-principal ratio?",
          answer: "This is a unique metric that shows how much you pay in interest for every dollar you borrowed. For example, a ratio of $0.63 means you pay 63 cents in interest for every $1 of principal. This helps you quickly assess the true cost of borrowing — higher ratios indicate more expensive loans, typically from higher rates or longer terms.",
        },
        {
          question: "Should I make extra payments or invest the money instead?",
          answer: "Compare your loan interest rate to potential investment returns. If your loan rate is higher than expected investment returns (after taxes), extra payments make sense. If your loan rate is low (e.g., 3-4%) and you can invest at higher returns (e.g., 7-10% historically in stocks), investing may be more profitable. However, paying off debt also provides a guaranteed, risk-free return and peace of mind.",
        },
        {
          question: "How accurate is this amortization calculator?",
          answer: "This calculator uses the standard amortization formula used by banks and financial institutions worldwide. Results match official bank calculations for fixed-rate loans. However, actual payments may vary slightly due to rounding, varying month lengths, or additional costs like taxes, insurance, and fees that aren't included in the base amortization calculation.",
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
        calculate: "Generate Schedule",
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

      chart: {
        title: "Loan Balance Over Time",
        xLabel: "Year",
        yLabel: "Amount",
        series: {
          balance: "Remaining Balance",
          cumulativePrincipal: "Cumulative Principal Paid",
          cumulativeInterest: "Cumulative Interest Paid",
        },
      },

      detailedTable: {
        amortizationSchedule: {
          button: "View Full Amortization Schedule",
          title: "Year-by-Year Amortization Schedule",
          columns: {
            year: "Year",
            payment: "Annual Payment",
            principal: "Principal Paid",
            interest: "Interest Paid",
            cumulativeInterest: "Cumulative Interest",
            balance: "Remaining Balance",
          },
        },
      },
    },
    es: {
      "name": "Calculadora de Amortización",
      "slug": "calculadora-amortizacion",
      "subtitle": "Genera un cronograma completo de amortización y ve cómo los pagos extra pueden ahorrarte miles en intereses.",
      "breadcrumb": "Amortización",
      "seo": {
        "title": "Calculadora de Amortización - Cronograma de Pagos de Préstamo Gratis",
        "description": "Genera un cronograma detallado de amortización para cualquier préstamo. Ve desglose de pagos, ahorros de intereses con pagos extra, y comparación quincenal. Funciona para hipotecas, préstamos de auto, préstamos estudiantiles y más.",
        "shortDescription": "Calculadora gratuita de cronograma de amortización con análisis de pagos extra.",
        "keywords": [
          "calculadora de amortización",
          "cronograma de amortización",
          "amortización de préstamo",
          "calculadora de amortización hipotecaria",
          "calculadora de pagos extra",
          "calculadora de liquidación de préstamo",
          "tabla de amortización gratuita",
          "ahorros de pagos quincenales"
        ]
      },
      "inputs": {
        "loanAmount": {
          "label": "Monto del Préstamo",
          "helpText": "El monto principal total que pediste prestado o planeas pedir prestado."
        },
        "annualInterestRate": {
          "label": "Tasa de Interés Anual",
          "helpText": "La tasa de interés anual de tu préstamo (TAE)."
        },
        "loanTermYears": {
          "label": "Plazo del Préstamo",
          "helpText": "La duración total del préstamo en años."
        },
        "paymentFrequency": {
          "label": "Frecuencia de Pago",
          "helpText": "Con qué frecuencia realizas pagos. Quincenal = 26 pagos/año (ahorra intereses).",
          "options": {
            "monthly": "Mensual (12/año)",
            "biweekly": "Quincenal (26/año)",
            "acceleratedBiweekly": "Quincenal Acelerado",
            "weekly": "Semanal (52/año)",
            "semiMonthly": "Semimensual (24/año)"
          }
        },
        "includeExtraPayments": {
          "label": "Incluir Pagos Extra",
          "helpText": "Agrega pagos extra para liquidar tu préstamo más rápido y ahorrar en intereses."
        },
        "extraMonthlyPayment": {
          "label": "Pago Mensual Extra",
          "helpText": "Cantidad adicional añadida a cada pago regular hacia el principal."
        },
        "extraYearlyPayment": {
          "label": "Pago Anual Extra",
          "helpText": "Un pago adicional cada año aplicado completamente al principal."
        },
        "extraOneTimePayment": {
          "label": "Pago Único Extra",
          "helpText": "Un pago único de suma global aplicado hacia el principal."
        },
        "oneTimePaymentMonth": {
          "label": "Pago Único en el Mes #",
          "helpText": "El número de pago cuando se aplica la suma global (ej., 12 = final del año 1)."
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Pago Regular"
        },
        "totalInterest": {
          "label": "Interés Total"
        },
        "totalPaid": {
          "label": "Cantidad Total Pagada"
        },
        "interestToPrincipalRatio": {
          "label": "Interés por $1 Prestado"
        },
        "dailyInterestCost": {
          "label": "Costo de Interés Diario (Año 1)"
        },
        "payoffDate": {
          "label": "Fecha de Liquidación"
        },
        "interestSaved": {
          "label": "Interés Ahorrado"
        },
        "timeSaved": {
          "label": "Tiempo Ahorrado"
        }
      },
      "presets": {
        "homeMortgage": {
          "label": "Hipoteca de Casa",
          "description": "$350K, 6.8%, 30 años"
        },
        "autoLoan": {
          "label": "Préstamo de Auto",
          "description": "$35K, 6.5%, 5 años"
        },
        "studentLoan": {
          "label": "Préstamo Estudiantil",
          "description": "$45K, 5.5%, 10 años"
        },
        "personalLoan": {
          "label": "Préstamo Personal",
          "description": "$15K, 10.5%, 3 años"
        }
      },
      "values": {
        "years": "años",
        "year": "año",
        "months": "meses",
        "month": "mes",
        "days": "días",
        "day": "día",
        "perDay": "/día",
        "perDollar": "por $1 prestado",
        "weekly": "semanal",
        "biweekly": "quincenal",
        "monthly": "mensual",
        "semiMonthly": "semimensual",
        "acceleratedBiweekly": "quincenal acelerado",
        "saved": "ahorrado",
        "earlier": "antes",
        "none": "—"
      },
      "formats": {
        "summary": "Tu pago regular es {monthlyPayment}. Durante la vida del préstamo, pagarás {totalInterest} en intereses — eso es {interestToPrincipalRatio} por cada dólar prestado."
      },
      "infoCards": {
        "snapshot": {
          "title": "Resumen del Préstamo",
          "items": [
            {
              "label": "Pago Regular",
              "valueKey": "monthlyPayment"
            },
            {
              "label": "Interés Total",
              "valueKey": "totalInterest"
            },
            {
              "label": "Total Pagado",
              "valueKey": "totalPaid"
            },
            {
              "label": "Fecha de Liquidación",
              "valueKey": "payoffDate"
            }
          ]
        },
        "breakdown": {
          "title": "Información de Pagos",
          "items": [
            {
              "label": "Primer Pago — Interés",
              "valueKey": "firstPaymentInterest"
            },
            {
              "label": "Primer Pago — Principal",
              "valueKey": "firstPaymentPrincipal"
            },
            {
              "label": "Costo de Interés Diario (Año 1)",
              "valueKey": "dailyInterestCost"
            },
            {
              "label": "Patrimonio a la Mitad",
              "valueKey": "equityAtMidpoint"
            },
            {
              "label": "Ahorros Quincenales",
              "valueKey": "biweeklySavings"
            }
          ]
        },
        "tips": {
          "title": "Ahorra Dinero en tu Préstamo",
          "items": [
            "Cambia a pagos quincenales — harás un pago extra por año y ahorrarás miles en intereses.",
            "Agregar incluso $50–$100/mes extra al principal reduce dramáticamente tu préstamo y el interés total.",
            "Refinancia cuando las tasas bajen 1%+ por debajo de tu tasa actual — puede ahorrar decenas de miles durante la vida del préstamo.",
            "Aplica ingresos inesperados (devoluciones de impuestos, bonos) como pagos extra únicos para eliminar años de tu préstamo."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es la Amortización de Préstamos?",
          "content": "La amortización de préstamos es el proceso de pagar una deuda a través de pagos regulares y programados durante un período determinado. Cada pago se divide entre dos componentes: interés (el costo de pedir prestado) y principal (reducir lo que debes). En los primeros años de un préstamo, la mayoría de cada pago va hacia el interés. A medida que avanzas en el cronograma, más de cada pago se aplica al principal. Este cambio gradual es por lo que un cronograma de amortización es tan valioso: muestra exactamente a dónde va tu dinero con cada pago y te ayuda a entender el verdadero costo de pedir prestado. Entender la amortización te permite tomar decisiones estratégicas, como cuándo hacer pagos extra o si refinanciar tiene sentido financiero."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Calculadora de Amortización",
          "content": "Esta calculadora usa la fórmula estándar de amortización para determinar tu pago periódico fijo basado en el monto de tu préstamo, tasa de interés y plazo. Luego genera un cronograma completo pago por pago mostrando la porción de interés, porción de principal y saldo restante para cada pago. La fórmula divide tu tasa de interés anual por el número de períodos de pago por año, luego usa esta tasa periódica para calcular un pago fijo que amortiza completamente el préstamo durante el plazo especificado. Cuando habilitas pagos extra, la calculadora aplica esas cantidades adicionales directamente al saldo principal, recalculando los ahorros de interés y el cronograma de pago acortado. La comparación quincenal muestra cómo dividir tu pago mensual en 26 pagos quincenales (equivalente a 13 pagos mensuales por año) acelera tu liquidación."
        },
        "considerations": {
          "title": "Factores Clave a Considerar",
          "items": [
            {
              "text": "Un plazo de préstamo más largo significa pagos mensuales más bajos pero significativamente más interés total pagado durante la vida del préstamo.",
              "type": "info"
            },
            {
              "text": "Incluso pequeñas diferencias de tasa importan enormemente — 0.5% en una hipoteca de $300K durante 30 años puede significar $30,000+ en interés extra.",
              "type": "warning"
            },
            {
              "text": "El interés cargado al frente significa que construyes patrimonio lentamente al principio — después de 5 años en una hipoteca de 30 años, puedes haber pagado solo 5-10% del principal.",
              "type": "info"
            },
            {
              "text": "Revisa los términos de tu préstamo por penalidades de pago anticipado antes de hacer pagos extra. La mayoría de los préstamos modernos permiten pago anticipado sin penalidad.",
              "type": "warning"
            },
            {
              "text": "Los pagos quincenales efectivamente agregan un pago mensual completo extra por año, potencialmente ahorrando decenas de miles en intereses.",
              "type": "info"
            },
            {
              "text": "Considera tu costo de oportunidad — si la tasa de tu préstamo es 4% pero puedes invertir al 8%, los pagos extra pueden no ser óptimos.",
              "type": "info"
            }
          ]
        },
        "strategies": {
          "title": "Estrategias de Pagos Extra",
          "items": [
            {
              "text": "Redondea hacia arriba: Si tu pago es $1,287, redondea a $1,300 — los $13/mes extra se acumulan significativamente con el tiempo.",
              "type": "info"
            },
            {
              "text": "Un pago extra por año: Haz 13 pagos en lugar de 12 — esto solo puede reducir 4-6 años de una hipoteca de 30 años.",
              "type": "info"
            },
            {
              "text": "Sumas globales inesperadas: Aplica devoluciones de impuestos, bonos o herencias directamente al principal para máximo impacto.",
              "type": "info"
            },
            {
              "text": "Promediación del costo: Aumenta tu pago extra en $10-25 cada año conforme crece tu ingreso.",
              "type": "info"
            },
            {
              "text": "Apunta al punto de cruce: Paga extra hasta alcanzar el mes donde el principal excede el interés en tu pago regular.",
              "type": "info"
            },
            {
              "text": "Refinancia + mantén el pago: Si refinancias a una tasa menor, sigue pagando la misma cantidad — la diferencia va al principal.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Amortización",
          "description": "Ve cómo funciona la amortización con números reales",
          "examples": [
            {
              "title": "Hipoteca de 30 Años — $300,000 al 6.5%",
              "steps": [
                "Pago mensual: $1,896.20",
                "Primer pago: $1,625 interés + $271 principal",
                "Interés total durante 30 años: $382,633",
                "Relación interés-principal: $1.28 por $1 prestado",
                "Con $200/mes extra: Ahorra $99,838 en intereses, liquida 7 años antes"
              ],
              "result": "Agregar solo $200/mes ahorra casi $100,000 y elimina 7 años de pagos."
            },
            {
              "title": "Préstamo de Auto de 5 Años — $30,000 al 6.0%",
              "steps": [
                "Pago mensual: $579.98",
                "Primer pago: $150 interés + $430 principal",
                "Interés total durante 5 años: $4,799",
                "Relación interés-principal: $0.16 por $1 prestado",
                "Con $100/mes extra: Ahorra $507 en intereses, liquida 9 meses antes"
              ],
              "result": "Plazos de préstamo más cortos significan menos interés total — siempre elige el plazo más corto que puedas permitirte."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué es un cronograma de amortización?",
          "answer": "Un cronograma de amortización es una tabla detallada que muestra cada pago durante la vida de tu préstamo. Para cada pago, desglosa cuánto va hacia el interés versus el principal, y muestra el saldo restante. Los pagos tempranos son principalmente interés, mientras que los pagos posteriores son principalmente principal. Este cronograma te ayuda a entender el verdadero costo de tu préstamo y planear estrategias de pagos extra."
        },
        {
          "question": "¿Cómo los pagos extra reducen mi interés total?",
          "answer": "Los pagos extra van directamente hacia reducir tu saldo principal. Dado que el interés se calcula sobre el saldo restante, un principal menor significa que se acumula menos interés cada período. Esto crea un efecto compuesto — cada dólar extra pagado hacia el principal ahorra más de un dólar en interés futuro. Incluso pagos extra pequeños pueden ahorrar miles durante la vida de un préstamo a largo plazo."
        },
        {
          "question": "¿Cuál es la diferencia entre pagos quincenales y mensuales?",
          "answer": "Con pagos mensuales, haces 12 pagos por año. Con pagos quincenales, pagas la mitad del monto mensual cada dos semanas, resultando en 26 medios pagos (equivalente a 13 pagos mensuales completos por año). Ese pago extra cada año va completamente al principal, lo que puede acortar una hipoteca de 30 años por aproximadamente 4-5 años y ahorrar decenas de miles en intereses."
        },
        {
          "question": "¿Esta calculadora funciona para diferentes tipos de préstamos?",
          "answer": "¡Sí! Esta calculadora de amortización funciona para cualquier préstamo de cuotas de tasa fija incluyendo hipotecas, préstamos de auto, préstamos estudiantiles, préstamos personales y préstamos comerciales. Simplemente ingresa el monto de tu préstamo, tasa de interés y plazo. Los preajustes proporcionan valores típicos para tipos de préstamos comunes para ayudarte a comenzar rápidamente."
        },
        {
          "question": "¿Por qué tanto de mi pago temprano va hacia el interés?",
          "answer": "En un préstamo amortizado estándar, el interés se calcula sobre el saldo restante. Al inicio, tu saldo está en su punto más alto, por lo que el cargo de interés es grande. A medida que gradualmente pagas el principal, se acumula menos interés y más de cada pago va hacia el principal. Por ejemplo, en una hipoteca de $300,000 al 6.5%, tu primer pago incluye aproximadamente $1,625 en interés pero solo $271 hacia el principal."
        },
        {
          "question": "¿Qué es la relación interés-principal?",
          "answer": "Esta es una métrica única que muestra cuánto pagas en interés por cada dólar que pediste prestado. Por ejemplo, una relación de $0.63 significa que pagas 63 centavos en interés por cada $1 de principal. Esto te ayuda a evaluar rápidamente el verdadero costo de pedir prestado — relaciones más altas indican préstamos más caros, típicamente por tasas más altas o plazos más largos."
        },
        {
          "question": "¿Debería hacer pagos extra o invertir el dinero en su lugar?",
          "answer": "Compara la tasa de interés de tu préstamo con los retornos de inversión potenciales. Si la tasa de tu préstamo es más alta que los retornos de inversión esperados (después de impuestos), los pagos extra tienen sentido. Si la tasa de tu préstamo es baja (ej., 3-4%) y puedes invertir a retornos más altos (ej., 7-10% históricamente en acciones), invertir puede ser más rentable. Sin embargo, pagar deuda también proporciona un retorno garantizado, libre de riesgo y tranquilidad mental."
        },
        {
          "question": "¿Qué tan precisa es esta calculadora de amortización?",
          "answer": "Esta calculadora usa la fórmula estándar de amortización usada por bancos e instituciones financieras mundialmente. Los resultados coinciden con cálculos bancarios oficiales para préstamos de tasa fija. Sin embargo, los pagos reales pueden variar ligeramente debido al redondeo, longitudes variables de mes, o costos adicionales como impuestos, seguros y tarifas que no están incluidos en el cálculo base de amortización."
        }
      ],
      "chart": {
        "title": "Saldo del Préstamo a lo Largo del Tiempo",
        "xLabel": "Año",
        "yLabel": "Cantidad",
        "series": {
          "balance": "Saldo Restante",
          "cumulativePrincipal": "Principal Acumulativo Pagado",
          "cumulativeInterest": "Interés Acumulativo Pagado"
        }
      },
      "detailedTable": {
        "amortizationSchedule": {
          "button": "Ver Cronograma Completo de Amortización",
          "title": "Cronograma de Amortización Año por Año",
          "columns": {
            "year": "Año",
            "payment": "Pago Anual",
            "principal": "Principal Pagado",
            "interest": "Interés Pagado",
            "cumulativeInterest": "Interés Acumulativo",
            "balance": "Saldo Restante"
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
      },
      "calculator": {
        "yourInformation": "Tu Información"
      }
    },
    pt: {
      "name": "Calculadora de Amortização",
      "slug": "calculadora-amortizacao",
      "subtitle": "Gere uma tabela completa de amortização e veja como pagamentos extras podem economizar milhares em juros.",
      "breadcrumb": "Amortização",
      "seo": {
        "title": "Calculadora de Amortização - Cronograma Gratuito de Pagamentos",
        "description": "Gere uma tabela detalhada de amortização para qualquer empréstimo. Veja detalhamentos de pagamentos, economia de juros com pagamentos extras e comparação quinzenal. Funciona para hipotecas, financiamentos de veículos, empréstimos estudantis e mais.",
        "shortDescription": "Calculadora gratuita de cronograma de amortização com análise de pagamentos extras.",
        "keywords": [
          "calculadora de amortização",
          "tabela de amortização",
          "amortização de empréstimo",
          "calculadora de amortização de hipoteca",
          "calculadora de pagamento extra",
          "calculadora de quitação de empréstimo",
          "tabela de amortização gratuita",
          "economia pagamento quinzenal"
        ]
      },
      "inputs": {
        "loanAmount": {
          "label": "Valor do Empréstimo",
          "helpText": "O valor total do principal que você emprestou ou planeja emprestar."
        },
        "annualInterestRate": {
          "label": "Taxa de Juros Anual",
          "helpText": "A taxa de juros anual do seu empréstimo (TAE)."
        },
        "loanTermYears": {
          "label": "Prazo do Empréstimo",
          "helpText": "A duração total do empréstimo em anos."
        },
        "paymentFrequency": {
          "label": "Frequência de Pagamento",
          "helpText": "Com que frequência você faz os pagamentos. Quinzenal = 26 pagamentos/ano (economiza juros).",
          "options": {
            "monthly": "Mensal (12/ano)",
            "biweekly": "Quinzenal (26/ano)",
            "acceleratedBiweekly": "Quinzenal Acelerado",
            "weekly": "Semanal (52/ano)",
            "semiMonthly": "Bimensal (24/ano)"
          }
        },
        "includeExtraPayments": {
          "label": "Incluir Pagamentos Extras",
          "helpText": "Adicione pagamentos extras para quitar seu empréstimo mais rápido e economizar juros."
        },
        "extraMonthlyPayment": {
          "label": "Pagamento Extra Mensal",
          "helpText": "Valor adicional adicionado a cada pagamento regular direcionado ao principal."
        },
        "extraYearlyPayment": {
          "label": "Pagamento Extra Anual",
          "helpText": "Um pagamento adicional a cada ano aplicado inteiramente ao principal."
        },
        "extraOneTimePayment": {
          "label": "Pagamento Extra Único",
          "helpText": "Um único pagamento à vista aplicado ao principal."
        },
        "oneTimePaymentMonth": {
          "label": "Pagamento Único no Mês #",
          "helpText": "O número do pagamento quando a quantia única é aplicada (ex: 12 = final do ano 1)."
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Pagamento Regular"
        },
        "totalInterest": {
          "label": "Total de Juros"
        },
        "totalPaid": {
          "label": "Valor Total Pago"
        },
        "interestToPrincipalRatio": {
          "label": "Juros por R$1 Emprestado"
        },
        "dailyInterestCost": {
          "label": "Custo Diário de Juros (Ano 1)"
        },
        "payoffDate": {
          "label": "Data de Quitação"
        },
        "interestSaved": {
          "label": "Juros Economizados"
        },
        "timeSaved": {
          "label": "Tempo Economizado"
        }
      },
      "presets": {
        "homeMortgage": {
          "label": "Hipoteca Residencial",
          "description": "R$350mil, 6,8%, 30 anos"
        },
        "autoLoan": {
          "label": "Financiamento de Veículo",
          "description": "R$35mil, 6,5%, 5 anos"
        },
        "studentLoan": {
          "label": "Empréstimo Estudantil",
          "description": "R$45mil, 5,5%, 10 anos"
        },
        "personalLoan": {
          "label": "Empréstimo Pessoal",
          "description": "R$15mil, 10,5%, 3 anos"
        }
      },
      "values": {
        "years": "anos",
        "year": "ano",
        "months": "meses",
        "month": "mês",
        "days": "dias",
        "day": "dia",
        "perDay": "/dia",
        "perDollar": "por R$1 emprestado",
        "weekly": "semanal",
        "biweekly": "quinzenal",
        "monthly": "mensal",
        "semiMonthly": "bimensal",
        "acceleratedBiweekly": "quinz. acelerado",
        "saved": "economizado",
        "earlier": "mais cedo",
        "none": "—"
      },
      "formats": {
        "summary": "Seu pagamento regular é {monthlyPayment}. Durante a vida do empréstimo, você pagará {totalInterest} em juros — isso é {interestToPrincipalRatio} para cada real emprestado."
      },
      "infoCards": {
        "snapshot": {
          "title": "Resumo do Empréstimo",
          "items": [
            {
              "label": "Pagamento Regular",
              "valueKey": "monthlyPayment"
            },
            {
              "label": "Total de Juros",
              "valueKey": "totalInterest"
            },
            {
              "label": "Total Pago",
              "valueKey": "totalPaid"
            },
            {
              "label": "Data de Quitação",
              "valueKey": "payoffDate"
            }
          ]
        },
        "breakdown": {
          "title": "Detalhes do Pagamento",
          "items": [
            {
              "label": "Primeiro Pagamento — Juros",
              "valueKey": "firstPaymentInterest"
            },
            {
              "label": "Primeiro Pagamento — Principal",
              "valueKey": "firstPaymentPrincipal"
            },
            {
              "label": "Custo Diário de Juros (Ano 1)",
              "valueKey": "dailyInterestCost"
            },
            {
              "label": "Patrimônio no Meio do Prazo",
              "valueKey": "equityAtMidpoint"
            },
            {
              "label": "Economia Quinzenal",
              "valueKey": "biweeklySavings"
            }
          ]
        },
        "tips": {
          "title": "Economize Dinheiro no Seu Empréstimo",
          "items": [
            "Mude para pagamentos quinzenais — você fará um pagamento extra por ano e economizará milhares em juros.",
            "Adicionar até R$50–R$100/mês extras ao principal reduz drasticamente seu empréstimo e diminui o total de juros.",
            "Refinancie quando as taxas caírem 1%+ abaixo da sua taxa atual — pode economizar dezenas de milhares durante a vida do empréstimo.",
            "Aplique recursos extras (restituição do IR, bônus) como pagamentos únicos extras para cortar anos do seu empréstimo."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é Amortização de Empréstimo?",
          "content": "A amortização de empréstimo é o processo de quitar uma dívida através de pagamentos regulares e programados durante um período determinado. Cada pagamento é dividido entre dois componentes: juros (o custo do empréstimo) e principal (redução do que você deve). Nos primeiros anos de um empréstimo, a maior parte de cada pagamento vai para juros. À medida que você avança no cronograma, mais de cada pagamento é aplicado ao principal. Essa mudança gradual é por que uma tabela de amortização é tão valiosa — ela mostra exatamente para onde vai seu dinheiro com cada pagamento e ajuda você a entender o custo real do empréstimo. Compreender a amortização permite tomar decisões estratégicas, como quando fazer pagamentos extras ou se refinanciar faz sentido financeiro."
        },
        "howItWorks": {
          "title": "Como Funciona a Calculadora de Amortização",
          "content": "Esta calculadora usa a fórmula padrão de amortização para determinar seu pagamento periódico fixo baseado no valor do empréstimo, taxa de juros e prazo. Em seguida, gera um cronograma completo pagamento por pagamento mostrando a parte dos juros, parte do principal e saldo restante para cada pagamento. A fórmula divide sua taxa de juros anual pelo número de períodos de pagamento por ano, então usa essa taxa periódica para calcular um pagamento fixo que amortiza completamente o empréstimo durante o prazo especificado. Quando você ativa pagamentos extras, a calculadora aplica esses valores adicionais diretamente ao saldo principal, recalculando a economia de juros e o cronograma de quitação reduzido. A comparação quinzenal mostra como dividir seu pagamento mensal em 26 pagamentos quinzenais (equivalente a 13 pagamentos mensais por ano) acelera sua quitação."
        },
        "considerations": {
          "title": "Fatores Principais a Considerar",
          "items": [
            {
              "text": "Um prazo de empréstimo maior significa pagamentos mensais menores, mas significativamente mais juros totais pagos durante a vida do empréstimo.",
              "type": "info"
            },
            {
              "text": "Até pequenas diferenças de taxa importam enormemente — 0,5% em uma hipoteca de R$300mil por 30 anos pode significar R$30mil+ em juros extras.",
              "type": "warning"
            },
            {
              "text": "Juros frontais significam que você constrói patrimônio lentamente no início — após 5 anos em uma hipoteca de 30 anos, você pode ter pago apenas 5-10% do principal.",
              "type": "info"
            },
            {
              "text": "Verifique os termos do seu empréstimo para penalidades de pagamento antecipado antes de fazer pagamentos extras. A maioria dos empréstimos modernos permite pagamento antecipado sem penalidade.",
              "type": "warning"
            },
            {
              "text": "Pagamentos quinzenais efetivamente adicionam um pagamento mensal completo extra por ano, potencialmente economizando dezenas de milhares em juros.",
              "type": "info"
            },
            {
              "text": "Considere seu custo de oportunidade — se sua taxa de empréstimo é 4% mas você pode investir a 8%, pagamentos extras podem não ser ideais.",
              "type": "info"
            }
          ]
        },
        "strategies": {
          "title": "Estratégias de Pagamento Extra",
          "items": [
            {
              "text": "Arredondar: Se seu pagamento é R$1.287, arredonde para R$1.300 — os R$13 extras/mês se acumulam significativamente ao longo do tempo.",
              "type": "info"
            },
            {
              "text": "Um pagamento extra por ano: Faça 13 pagamentos em vez de 12 — isso sozinho pode cortar 4-6 anos de uma hipoteca de 30 anos.",
              "type": "info"
            },
            {
              "text": "Recursos extras únicos: Aplique restituições de IR, bônus ou heranças diretamente ao principal para máximo impacto.",
              "type": "info"
            },
            {
              "text": "Média de custo em reais: Aumente seu pagamento extra em R$10-25 a cada ano conforme sua renda cresce.",
              "type": "info"
            },
            {
              "text": "Mire no ponto de cruzamento: Pague extra até atingir o mês onde o principal excede os juros no seu pagamento regular.",
              "type": "info"
            },
            {
              "text": "Refinancie + mantenha pagamento: Se refinanciar para uma taxa menor, continue pagando o mesmo valor — a diferença vai para o principal.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Amortização",
          "description": "Veja como a amortização funciona com números reais",
          "examples": [
            {
              "title": "Hipoteca de 30 Anos — R$300.000 a 6,5%",
              "steps": [
                "Pagamento mensal: R$1.896,20",
                "Primeiro pagamento: R$1.625 juros + R$271 principal",
                "Total de juros em 30 anos: R$382.633",
                "Razão juros-principal: R$1,28 por R$1 emprestado",
                "Com R$200/mês extra: Economize R$99.838 em juros, quite 7 anos mais cedo"
              ],
              "result": "Adicionar apenas R$200/mês economiza quase R$100.000 e elimina 7 anos de pagamentos."
            },
            {
              "title": "Financiamento de Veículo de 5 Anos — R$30.000 a 6,0%",
              "steps": [
                "Pagamento mensal: R$579,98",
                "Primeiro pagamento: R$150 juros + R$430 principal",
                "Total de juros em 5 anos: R$4.799",
                "Razão juros-principal: R$0,16 por R$1 emprestado",
                "Com R$100/mês extra: Economize R$507 em juros, quite 9 meses mais cedo"
              ],
              "result": "Prazos de empréstimo menores significam menos juros no geral — sempre escolha o prazo mais curto que puder pagar."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "O que é uma tabela de amortização?",
          "answer": "Uma tabela de amortização é uma tabela detalhada mostrando cada pagamento durante a vida do seu empréstimo. Para cada pagamento, ela detalha quanto vai para juros versus principal, e mostra o saldo restante. Pagamentos iniciais são principalmente juros, enquanto pagamentos posteriores são principalmente principal. Esta tabela ajuda você a entender o custo real do seu empréstimo e planejar estratégias de pagamento extra."
        },
        {
          "question": "Como pagamentos extras reduzem meu total de juros?",
          "answer": "Pagamentos extras vão diretamente para reduzir seu saldo principal. Como os juros são calculados sobre o saldo restante, um principal menor significa que menos juros se acumulam a cada período. Isso cria um efeito composto — cada real extra pago ao principal economiza mais de um real em juros futuros. Até pequenos pagamentos extras podem economizar milhares durante a vida de um empréstimo de longo prazo."
        },
        {
          "question": "Qual a diferença entre pagamentos quinzenais e mensais?",
          "answer": "Com pagamentos mensais, você faz 12 pagamentos por ano. Com pagamentos quinzenais, você paga metade do valor mensal a cada duas semanas, resultando em 26 meio-pagamentos (equivalente a 13 pagamentos mensais completos por ano). Esse pagamento extra a cada ano vai inteiramente para o principal, o que pode encurtar uma hipoteca de 30 anos em cerca de 4-5 anos e economizar dezenas de milhares em juros."
        },
        {
          "question": "Esta calculadora funciona para diferentes tipos de empréstimo?",
          "answer": "Sim! Esta calculadora de amortização funciona para qualquer empréstimo parcelado de taxa fixa, incluindo hipotecas, financiamentos de veículos, empréstimos estudantis, empréstimos pessoais e empréstimos empresariais. Simplesmente insira o valor do empréstimo, taxa de juros e prazo. Os presets fornecem valores típicos para tipos comuns de empréstimo para começar rapidamente."
        },
        {
          "question": "Por que tanto do meu pagamento inicial vai para juros?",
          "answer": "Em um empréstimo amortizado padrão, os juros são calculados sobre o saldo restante. No início, seu saldo está no máximo, então a cobrança de juros é grande. À medida que você gradualmente paga o principal, menos juros se acumulam e mais de cada pagamento vai para o principal. Por exemplo, em uma hipoteca de R$300.000 a 6,5%, seu primeiro pagamento inclui cerca de R$1.625 em juros mas apenas R$271 para o principal."
        },
        {
          "question": "O que é a razão juros-principal?",
          "answer": "Esta é uma métrica única que mostra quanto você paga em juros para cada real que emprestou. Por exemplo, uma razão de R$0,63 significa que você paga 63 centavos em juros para cada R$1 de principal. Isso ajuda você a avaliar rapidamente o custo real do empréstimo — razões maiores indicam empréstimos mais caros, tipicamente de taxas maiores ou prazos mais longos."
        },
        {
          "question": "Devo fazer pagamentos extras ou investir o dinheiro?",
          "answer": "Compare sua taxa de juros do empréstimo com retornos potenciais de investimento. Se sua taxa de empréstimo é maior que retornos esperados de investimento (após impostos), pagamentos extras fazem sentido. Se sua taxa de empréstimo é baixa (ex: 3-4%) e você pode investir com retornos maiores (ex: 7-10% historicamente em ações), investir pode ser mais lucrativo. Porém, pagar dívidas também fornece um retorno garantido, sem risco e paz de espírito."
        },
        {
          "question": "Quão precisa é esta calculadora de amortização?",
          "answer": "Esta calculadora usa a fórmula padrão de amortização usada por bancos e instituições financeiras mundialmente. Os resultados combinam com cálculos bancários oficiais para empréstimos de taxa fixa. Porém, pagamentos reais podem variar ligeiramente devido a arredondamentos, durações variáveis de mês, ou custos adicionais como impostos, seguros e taxas que não estão incluídos no cálculo básico de amortização."
        }
      ],
      "chart": {
        "title": "Saldo do Empréstimo ao Longo do Tempo",
        "xLabel": "Ano",
        "yLabel": "Valor",
        "series": {
          "balance": "Saldo Restante",
          "cumulativePrincipal": "Principal Acumulado Pago",
          "cumulativeInterest": "Juros Acumulados Pagos"
        }
      },
      "detailedTable": {
        "amortizationSchedule": {
          "button": "Ver Tabela Completa de Amortização",
          "title": "Cronograma de Amortização Ano a Ano",
          "columns": {
            "year": "Ano",
            "payment": "Pagamento Anual",
            "principal": "Principal Pago",
            "interest": "Juros Pagos",
            "cumulativeInterest": "Juros Acumulados",
            "balance": "Saldo Restante"
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
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      }
    },
    fr: {
      "name": "Calculateur d'Amortissement",
      "slug": "calculateur-amortissement",
      "subtitle": "Générez un tableau d'amortissement complet et voyez comment les paiements supplémentaires peuvent vous faire économiser des milliers en intérêts.",
      "breadcrumb": "Amortissement",
      "seo": {
        "title": "Calculateur d'Amortissement - Échéancier de Prêt Gratuit",
        "description": "Générez un tableau d'amortissement détaillé pour tout prêt. Voyez la répartition des paiements, les économies d'intérêts avec paiements supplémentaires, et la comparaison bihebdomadaire. Fonctionne pour hypothèques, prêts auto, prêts étudiants et plus.",
        "shortDescription": "Calculateur d'échéancier d'amortissement gratuit avec analyse des paiements supplémentaires.",
        "keywords": [
          "calculateur amortissement",
          "tableau amortissement",
          "amortissement prêt",
          "calculateur amortissement hypothèque",
          "calculateur paiement supplémentaire",
          "calculateur remboursement prêt",
          "table amortissement gratuite",
          "économies paiement bihebdomadaire"
        ]
      },
      "inputs": {
        "loanAmount": {
          "label": "Montant du Prêt",
          "helpText": "Le montant principal total que vous avez emprunté ou prévoyez emprunter."
        },
        "annualInterestRate": {
          "label": "Taux d'Intérêt Annuel",
          "helpText": "Le taux d'intérêt annuel de votre prêt (TAP)."
        },
        "loanTermYears": {
          "label": "Durée du Prêt",
          "helpText": "La durée totale du prêt en années."
        },
        "paymentFrequency": {
          "label": "Fréquence de Paiement",
          "helpText": "À quelle fréquence vous effectuez les paiements. Bihebdomadaire = 26 paiements/an (économise des intérêts).",
          "options": {
            "monthly": "Mensuel (12/an)",
            "biweekly": "Bihebdomadaire (26/an)",
            "acceleratedBiweekly": "Bihebdomadaire Accéléré",
            "weekly": "Hebdomadaire (52/an)",
            "semiMonthly": "Bimensuel (24/an)"
          }
        },
        "includeExtraPayments": {
          "label": "Inclure Paiements Supplémentaires",
          "helpText": "Ajoutez des paiements supplémentaires pour rembourser votre prêt plus rapidement et économiser sur les intérêts."
        },
        "extraMonthlyPayment": {
          "label": "Paiement Mensuel Supplémentaire",
          "helpText": "Montant additionnel ajouté à chaque paiement régulier vers le capital."
        },
        "extraYearlyPayment": {
          "label": "Paiement Annuel Supplémentaire",
          "helpText": "Un paiement additionnel chaque année appliqué entièrement au capital."
        },
        "extraOneTimePayment": {
          "label": "Paiement Unique Supplémentaire",
          "helpText": "Un paiement forfaitaire unique appliqué vers le capital."
        },
        "oneTimePaymentMonth": {
          "label": "Paiement Unique au Mois #",
          "helpText": "Le numéro de paiement quand la somme forfaitaire est appliquée (ex: 12 = fin de l'année 1)."
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Paiement Régulier"
        },
        "totalInterest": {
          "label": "Intérêt Total"
        },
        "totalPaid": {
          "label": "Montant Total Payé"
        },
        "interestToPrincipalRatio": {
          "label": "Intérêt par 1€ Emprunté"
        },
        "dailyInterestCost": {
          "label": "Coût d'Intérêt Quotidien (Année 1)"
        },
        "payoffDate": {
          "label": "Date de Remboursement"
        },
        "interestSaved": {
          "label": "Intérêt Économisé"
        },
        "timeSaved": {
          "label": "Temps Économisé"
        }
      },
      "presets": {
        "homeMortgage": {
          "label": "Hypothèque Résidentielle",
          "description": "350K€, 6,8%, 30 ans"
        },
        "autoLoan": {
          "label": "Prêt Auto",
          "description": "35K€, 6,5%, 5 ans"
        },
        "studentLoan": {
          "label": "Prêt Étudiant",
          "description": "45K€, 5,5%, 10 ans"
        },
        "personalLoan": {
          "label": "Prêt Personnel",
          "description": "15K€, 10,5%, 3 ans"
        }
      },
      "values": {
        "years": "ans",
        "year": "an",
        "months": "mois",
        "month": "mois",
        "days": "jours",
        "day": "jour",
        "perDay": "/jour",
        "perDollar": "par 1€ emprunté",
        "weekly": "hebdomadaire",
        "biweekly": "bihebdomadaire",
        "monthly": "mensuel",
        "semiMonthly": "bimensuel",
        "acceleratedBiweekly": "bihebdo. accéléré",
        "saved": "économisé",
        "earlier": "plus tôt",
        "none": "—"
      },
      "formats": {
        "summary": "Votre paiement régulier est de {monthlyPayment}. Sur la durée du prêt, vous paierez {totalInterest} en intérêts — soit {interestToPrincipalRatio} pour chaque euro emprunté."
      },
      "infoCards": {
        "snapshot": {
          "title": "Aperçu du Prêt",
          "items": [
            {
              "label": "Paiement Régulier",
              "valueKey": "monthlyPayment"
            },
            {
              "label": "Intérêt Total",
              "valueKey": "totalInterest"
            },
            {
              "label": "Total Payé",
              "valueKey": "totalPaid"
            },
            {
              "label": "Date de Remboursement",
              "valueKey": "payoffDate"
            }
          ]
        },
        "breakdown": {
          "title": "Analyse des Paiements",
          "items": [
            {
              "label": "Premier Paiement — Intérêt",
              "valueKey": "firstPaymentInterest"
            },
            {
              "label": "Premier Paiement — Capital",
              "valueKey": "firstPaymentPrincipal"
            },
            {
              "label": "Coût d'Intérêt Quotidien (Année 1)",
              "valueKey": "dailyInterestCost"
            },
            {
              "label": "Capital à Mi-parcours",
              "valueKey": "equityAtMidpoint"
            },
            {
              "label": "Économies Bihebdomadaires",
              "valueKey": "biweeklySavings"
            }
          ]
        },
        "tips": {
          "title": "Économisez sur Votre Prêt",
          "items": [
            "Passez aux paiements bihebdomadaires — vous effectuerez un paiement supplémentaire par an et économiserez des milliers en intérêts.",
            "Ajouter même 50-100€/mois supplémentaires au capital raccourcit drastiquement votre prêt et réduit les intérêts totaux.",
            "Refinancez quand les taux chutent de 1%+ sous votre taux actuel — cela peut économiser des dizaines de milliers sur la durée du prêt.",
            "Appliquez les gains exceptionnels (remboursements d'impôts, primes) comme paiements uniques supplémentaires pour éliminer des années de votre prêt."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que l'Amortissement de Prêt?",
          "content": "L'amortissement de prêt est le processus de remboursement d'une dette par des paiements réguliers et planifiés sur une période déterminée. Chaque paiement est divisé entre deux composantes : les intérêts (le coût d'emprunt) et le capital (réduction de ce que vous devez). Dans les premières années d'un prêt, la majorité de chaque paiement va vers les intérêts. Au fur et à mesure que vous progressez dans l'échéancier, plus de chaque paiement est appliqué au capital. Ce changement graduel explique pourquoi un tableau d'amortissement est si précieux — il montre exactement où va votre argent à chaque paiement et vous aide à comprendre le vrai coût d'emprunt. Comprendre l'amortissement vous permet de prendre des décisions stratégiques, comme quand effectuer des paiements supplémentaires ou si le refinancement a du sens financièrement."
        },
        "howItWorks": {
          "title": "Comment Fonctionne le Calculateur d'Amortissement",
          "content": "Ce calculateur utilise la formule d'amortissement standard pour déterminer votre paiement périodique fixe basé sur votre montant de prêt, taux d'intérêt et durée. Il génère ensuite un échéancier complet paiement par paiement montrant la portion d'intérêt, la portion de capital et le solde restant pour chaque paiement. La formule divise votre taux d'intérêt annuel par le nombre de périodes de paiement par an, puis utilise ce taux périodique pour calculer un paiement fixe qui amortit complètement le prêt sur la durée spécifiée. Quand vous activez les paiements supplémentaires, le calculateur applique ces montants additionnels directement au solde du capital, recalculant les économies d'intérêts et la chronologie de remboursement raccourcie. La comparaison bihebdomadaire montre comment diviser votre paiement mensuel en 26 paiements bi-hebdomadaires (équivalent à 13 paiements mensuels par an) accélère votre remboursement."
        },
        "considerations": {
          "title": "Facteurs Clés à Considérer",
          "items": [
            {
              "text": "Une durée de prêt plus longue signifie des paiements mensuels plus faibles mais significativement plus d'intérêts totaux payés sur la durée du prêt.",
              "type": "info"
            },
            {
              "text": "Même de petites différences de taux comptent énormément — 0,5% sur une hypothèque de 300K€ sur 30 ans peut signifier 30 000€+ d'intérêts supplémentaires.",
              "type": "warning"
            },
            {
              "text": "Les intérêts frontaux signifient que vous constituez lentement du capital au début — après 5 ans sur une hypothèque de 30 ans, vous pourriez n'avoir remboursé que 5-10% du capital.",
              "type": "info"
            },
            {
              "text": "Vérifiez les conditions de votre prêt pour les pénalités de remboursement anticipé avant d'effectuer des paiements supplémentaires. La plupart des prêts modernes permettent le remboursement anticipé sans pénalité.",
              "type": "warning"
            },
            {
              "text": "Les paiements bihebdomadaires ajoutent effectivement un paiement mensuel complet supplémentaire par an, économisant potentiellement des dizaines de milliers en intérêts.",
              "type": "info"
            },
            {
              "text": "Considérez votre coût d'opportunité — si votre taux de prêt est de 4% mais vous pouvez investir à 8%, les paiements supplémentaires pourraient ne pas être optimaux.",
              "type": "info"
            }
          ]
        },
        "strategies": {
          "title": "Stratégies de Paiements Supplémentaires",
          "items": [
            {
              "text": "Arrondissez : Si votre paiement est 1 287€, arrondissez à 1 300€ — les 13€ supplémentaires/mois s'accumulent significativement avec le temps.",
              "type": "info"
            },
            {
              "text": "Un paiement supplémentaire par an : Effectuez 13 paiements au lieu de 12 — cela seul peut réduire de 4-6 ans une hypothèque de 30 ans.",
              "type": "info"
            },
            {
              "text": "Gains exceptionnels forfaitaires : Appliquez les remboursements d'impôts, primes ou héritages directement au capital pour un impact maximum.",
              "type": "info"
            },
            {
              "text": "Moyenne d'achat périodique : Augmentez votre paiement supplémentaire de 10-25€ chaque année à mesure que vos revenus croissent.",
              "type": "info"
            },
            {
              "text": "Ciblez le point de croisement : Payez extra jusqu'à atteindre le mois où le capital dépasse les intérêts dans votre paiement régulier.",
              "type": "info"
            },
            {
              "text": "Refinancez + maintenez le paiement : Si vous refinancez à un taux plus bas, continuez à payer le même montant — la différence va au capital.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples d'Amortissement",
          "description": "Voyez comment fonctionne l'amortissement avec de vrais chiffres",
          "examples": [
            {
              "title": "Hypothèque 30 ans — 300 000€ à 6,5%",
              "steps": [
                "Paiement mensuel : 1 896,20€",
                "Premier paiement : 1 625€ intérêts + 271€ capital",
                "Intérêts totaux sur 30 ans : 382 633€",
                "Ratio intérêt-capital : 1,28€ par 1€ emprunté",
                "Avec 200€/mois extra : Économisez 99 838€ en intérêts, remboursez 7 ans plus tôt"
              ],
              "result": "Ajouter seulement 200€/mois économise près de 100 000€ et élimine 7 ans de paiements."
            },
            {
              "title": "Prêt Auto 5 ans — 30 000€ à 6,0%",
              "steps": [
                "Paiement mensuel : 579,98€",
                "Premier paiement : 150€ intérêts + 430€ capital",
                "Intérêts totaux sur 5 ans : 4 799€",
                "Ratio intérêt-capital : 0,16€ par 1€ emprunté",
                "Avec 100€/mois extra : Économisez 507€ en intérêts, remboursez 9 mois plus tôt"
              ],
              "result": "Des durées de prêt plus courtes signifient moins d'intérêts globalement — choisissez toujours la durée la plus courte que vous pouvez vous permettre."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qu'est-ce qu'un tableau d'amortissement?",
          "answer": "Un tableau d'amortissement est un tableau détaillé montrant chaque paiement sur la durée de votre prêt. Pour chaque paiement, il décompose combien va vers les intérêts versus le capital, et montre le solde restant. Les premiers paiements sont principalement des intérêts, tandis que les paiements ultérieurs sont principalement du capital. Ce tableau vous aide à comprendre le vrai coût de votre prêt et à planifier des stratégies de paiements supplémentaires."
        },
        {
          "question": "Comment les paiements supplémentaires réduisent-ils mes intérêts totaux?",
          "answer": "Les paiements supplémentaires vont directement vers la réduction de votre solde de capital. Puisque les intérêts sont calculés sur le solde restant, un capital plus faible signifie moins d'intérêts accumulés à chaque période. Cela crée un effet composé — chaque euro supplémentaire payé vers le capital économise plus d'un euro en intérêts futurs. Même de petits paiements supplémentaires peuvent économiser des milliers sur la durée d'un prêt à long terme."
        },
        {
          "question": "Quelle est la différence entre les paiements bihebdomadaires et mensuels?",
          "answer": "Avec les paiements mensuels, vous effectuez 12 paiements par an. Avec les paiements bihebdomadaires, vous payez la moitié du montant mensuel toutes les deux semaines, résultant en 26 demi-paiements (équivalent à 13 paiements mensuels complets par an). Ce paiement supplémentaire chaque année va entièrement au capital, ce qui peut raccourcir une hypothèque de 30 ans d'environ 4-5 ans et économiser des dizaines de milliers en intérêts."
        },
        {
          "question": "Ce calculateur fonctionne-t-il pour différents types de prêts?",
          "answer": "Oui ! Ce calculateur d'amortissement fonctionne pour tout prêt à tempérament à taux fixe incluant hypothèques, prêts auto, prêts étudiants, prêts personnels et prêts d'entreprise. Entrez simplement votre montant de prêt, taux d'intérêt et durée. Les préréglages fournissent des valeurs typiques pour les types de prêts courants pour vous aider à commencer rapidement."
        },
        {
          "question": "Pourquoi tant de mon paiement initial va-t-il aux intérêts?",
          "answer": "Dans un prêt amorti standard, les intérêts sont calculés sur le solde restant. Au début, votre solde est à son maximum, donc la charge d'intérêt est importante. Alors que vous remboursez graduellement le capital, moins d'intérêts s'accumulent et plus de chaque paiement va vers le capital. Par exemple, sur une hypothèque de 300 000€ à 6,5%, votre premier paiement inclut environ 1 625€ en intérêts mais seulement 271€ vers le capital."
        },
        {
          "question": "Qu'est-ce que le ratio intérêt-capital?",
          "answer": "C'est une métrique unique qui montre combien vous payez en intérêts pour chaque euro que vous avez emprunté. Par exemple, un ratio de 0,63€ signifie que vous payez 63 centimes d'intérêts pour chaque euro de capital. Cela vous aide à évaluer rapidement le vrai coût d'emprunt — des ratios plus élevés indiquent des prêts plus chers, typiquement dus à des taux plus élevés ou des durées plus longues."
        },
        {
          "question": "Devrais-je effectuer des paiements supplémentaires ou investir l'argent à la place?",
          "answer": "Comparez votre taux de prêt aux rendements d'investissement potentiels. Si votre taux de prêt est plus élevé que les rendements d'investissement attendus (après impôts), les paiements supplémentaires ont du sens. Si votre taux de prêt est bas (ex: 3-4%) et vous pouvez investir à des rendements plus élevés (ex: 7-10% historiquement en actions), investir pourrait être plus profitable. Cependant, rembourser la dette fournit aussi un rendement garanti, sans risque et la tranquillité d'esprit."
        },
        {
          "question": "À quel point ce calculateur d'amortissement est-il précis?",
          "answer": "Ce calculateur utilise la formule d'amortissement standard utilisée par les banques et institutions financières dans le monde entier. Les résultats correspondent aux calculs bancaires officiels pour les prêts à taux fixe. Cependant, les paiements réels peuvent varier légèrement dus aux arrondissements, aux longueurs variables des mois, ou aux coûts additionnels comme taxes, assurances et frais qui ne sont pas inclus dans le calcul d'amortissement de base."
        }
      ],
      "chart": {
        "title": "Solde du Prêt dans le Temps",
        "xLabel": "Année",
        "yLabel": "Montant",
        "series": {
          "balance": "Solde Restant",
          "cumulativePrincipal": "Capital Cumulé Payé",
          "cumulativeInterest": "Intérêts Cumulés Payés"
        }
      },
      "detailedTable": {
        "amortizationSchedule": {
          "button": "Voir le Tableau d'Amortissement Complet",
          "title": "Tableau d'Amortissement Année par Année",
          "columns": {
            "year": "Année",
            "payment": "Paiement Annuel",
            "principal": "Capital Payé",
            "interest": "Intérêt Payé",
            "cumulativeInterest": "Intérêts Cumulés",
            "balance": "Solde Restant"
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
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      }
    },
    de: {
      "name": "Tilgungsrechner",
      "slug": "tilgungs-rechner",
      "subtitle": "Erstellen Sie einen vollständigen Tilgungsplan und sehen Sie, wie Sondertilgungen Ihnen Tausende von Euro an Zinsen sparen können.",
      "breadcrumb": "Tilgungsrechner",
      "seo": {
        "title": "Tilgungsrechner - Kostenloser Darlehen-Zahlungsplan",
        "description": "Erstellen Sie einen detaillierten Tilgungsplan für jedes Darlehen. Sehen Sie Zahlungsaufschlüsselungen, Zinsersparnisse durch Sondertilgungen und Vergleiche bei zweiwöchentlichen Zahlungen. Funktioniert für Hypotheken, Autokredite, Studiendarlehen und mehr.",
        "shortDescription": "Kostenloser Tilgungsplan-Rechner mit Sondertilgungs-Analyse.",
        "keywords": [
          "Tilgungsrechner",
          "Tilgungsplan",
          "Darlehenstilgung",
          "Hypotheken-Tilgungsrechner",
          "Sondertilgungs-Rechner",
          "Darlehens-Rückzahlungsrechner",
          "kostenlose Tilgungstabelle",
          "zweiwöchentliche Zahlungsersparnisse"
        ]
      },
      "inputs": {
        "loanAmount": {
          "label": "Darlehensbetrag",
          "helpText": "Der gesamte Kapitalbetrag, den Sie geliehen haben oder zu leihen planen."
        },
        "annualInterestRate": {
          "label": "Jährlicher Zinssatz",
          "helpText": "Der jährliche Zinssatz für Ihr Darlehen (effektiver Jahreszins)."
        },
        "loanTermYears": {
          "label": "Darlehenslaufzeit",
          "helpText": "Die Gesamtlaufzeit des Darlehens in Jahren."
        },
        "paymentFrequency": {
          "label": "Zahlungshäufigkeit",
          "helpText": "Wie oft Sie Zahlungen leisten. Zweiwöchentlich = 26 Zahlungen/Jahr (spart Zinsen).",
          "options": {
            "monthly": "Monatlich (12/Jahr)",
            "biweekly": "Zweiwöchentlich (26/Jahr)",
            "acceleratedBiweekly": "Beschleunigte Zweiwochenzahlung",
            "weekly": "Wöchentlich (52/Jahr)",
            "semiMonthly": "Halbmonatlich (24/Jahr)"
          }
        },
        "includeExtraPayments": {
          "label": "Sondertilgungen einbeziehen",
          "helpText": "Fügen Sie Sonderzahlungen hinzu, um Ihr Darlehen schneller abzuzahlen und Zinsen zu sparen."
        },
        "extraMonthlyPayment": {
          "label": "Monatliche Sondertilgung",
          "helpText": "Zusätzlicher Betrag, der zu jeder regulären Zahlung für die Tilgung hinzugefügt wird."
        },
        "extraYearlyPayment": {
          "label": "Jährliche Sondertilgung",
          "helpText": "Eine zusätzliche Zahlung pro Jahr, die vollständig für die Tilgung verwendet wird."
        },
        "extraOneTimePayment": {
          "label": "Einmalige Sondertilgung",
          "helpText": "Eine einmalige Pauschalzahlung, die für die Tilgung verwendet wird."
        },
        "oneTimePaymentMonth": {
          "label": "Einmalzahlung in Monat Nr.",
          "helpText": "Die Zahlungsnummer, wann die Pauschalzahlung angewandt wird (z.B. 12 = Ende Jahr 1)."
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Reguläre Zahlung"
        },
        "totalInterest": {
          "label": "Gesamtzinsen"
        },
        "totalPaid": {
          "label": "Gesamtbetrag gezahlt"
        },
        "interestToPrincipalRatio": {
          "label": "Zinsen pro 1€ geliehen"
        },
        "dailyInterestCost": {
          "label": "Tägliche Zinskosten (Jahr 1)"
        },
        "payoffDate": {
          "label": "Rückzahlungsdatum"
        },
        "interestSaved": {
          "label": "Gesparte Zinsen"
        },
        "timeSaved": {
          "label": "Gesparte Zeit"
        }
      },
      "presets": {
        "homeMortgage": {
          "label": "Eigenheim-Hypothek",
          "description": "350.000€, 6,8%, 30 Jahre"
        },
        "autoLoan": {
          "label": "Autokredit",
          "description": "35.000€, 6,5%, 5 Jahre"
        },
        "studentLoan": {
          "label": "Studiendarlehen",
          "description": "45.000€, 5,5%, 10 Jahre"
        },
        "personalLoan": {
          "label": "Privatdarlehen",
          "description": "15.000€, 10,5%, 3 Jahre"
        }
      },
      "values": {
        "years": "Jahre",
        "year": "Jahr",
        "months": "Monate",
        "month": "Monat",
        "days": "Tage",
        "day": "Tag",
        "perDay": "/Tag",
        "perDollar": "pro 1€ geliehen",
        "weekly": "wöchentlich",
        "biweekly": "zweiwöchentlich",
        "monthly": "monatlich",
        "semiMonthly": "halbmonatlich",
        "acceleratedBiweekly": "beschl. zweiwöchentlich",
        "saved": "gespart",
        "earlier": "früher",
        "none": "—"
      },
      "formats": {
        "summary": "Ihre reguläre Zahlung beträgt {monthlyPayment}. Über die Laufzeit des Darlehens zahlen Sie {totalInterest} an Zinsen — das sind {interestToPrincipalRatio} für jeden geliehenen Euro."
      },
      "infoCards": {
        "snapshot": {
          "title": "Darlehens-Übersicht",
          "items": [
            {
              "label": "Reguläre Zahlung",
              "valueKey": "monthlyPayment"
            },
            {
              "label": "Gesamtzinsen",
              "valueKey": "totalInterest"
            },
            {
              "label": "Gesamtbetrag gezahlt",
              "valueKey": "totalPaid"
            },
            {
              "label": "Rückzahlungsdatum",
              "valueKey": "payoffDate"
            }
          ]
        },
        "breakdown": {
          "title": "Zahlungs-Einblicke",
          "items": [
            {
              "label": "Erste Zahlung — Zinsen",
              "valueKey": "firstPaymentInterest"
            },
            {
              "label": "Erste Zahlung — Tilgung",
              "valueKey": "firstPaymentPrincipal"
            },
            {
              "label": "Tägliche Zinskosten (Jahr 1)",
              "valueKey": "dailyInterestCost"
            },
            {
              "label": "Eigenkapital zur Halbzeit",
              "valueKey": "equityAtMidpoint"
            },
            {
              "label": "Zweiwöchentliche Ersparnisse",
              "valueKey": "biweeklySavings"
            }
          ]
        },
        "tips": {
          "title": "Sparen Sie Geld bei Ihrem Darlehen",
          "items": [
            "Wechseln Sie zu zweiwöchentlichen Zahlungen — Sie leisten eine zusätzliche Zahlung pro Jahr und sparen Tausende an Zinsen.",
            "Bereits 50-100€ extra monatlich für die Tilgung verkürzen Ihr Darlehen dramatisch und reduzieren die Gesamtzinsen.",
            "Refinanzieren Sie, wenn die Zinsen 1%+ unter Ihren aktuellen Zinssatz fallen — das kann Zehntausende über die Darlehenslaufzeit sparen.",
            "Verwenden Sie Glücksfälle (Steuerrückerstattungen, Boni) als einmalige Sondertilgungen, um Jahre von Ihrem Darlehen zu streichen."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist Darlehensamortisation?",
          "content": "Darlehensamortisation ist der Prozess der Rückzahlung einer Schuld durch regelmäßige, planmäßige Zahlungen über einen festgelegten Zeitraum. Jede Zahlung wird zwischen zwei Komponenten aufgeteilt: Zinsen (die Kosten der Kreditaufnahme) und Tilgung (Reduzierung dessen, was Sie schulden). In den frühen Jahren eines Darlehens geht der Großteil jeder Zahlung zu den Zinsen. Während Sie durch den Plan fortschreiten, wird mehr von jeder Zahlung auf die Tilgung angewandt. Diese graduelle Verschiebung ist der Grund, warum ein Tilgungsplan so wertvoll ist — er zeigt genau, wohin Ihr Geld mit jeder Zahlung geht und hilft Ihnen, die wahren Kosten der Kreditaufnahme zu verstehen. Das Verständnis der Amortisation ermächtigt Sie, strategische Entscheidungen zu treffen, wie wann Sie Sonderzahlungen leisten oder ob eine Umschuldung finanziell sinnvoll ist."
        },
        "howItWorks": {
          "title": "Wie der Tilgungsrechner funktioniert",
          "content": "Dieser Rechner verwendet die Standard-Tilgungsformel, um Ihre feste periodische Zahlung basierend auf Ihrem Darlehensbetrag, Zinssatz und Laufzeit zu bestimmen. Er erstellt dann einen vollständigen zahlungsweisen Plan, der den Zinsanteil, Tilgungsanteil und verbleibenden Saldo für jede Zahlung zeigt. Die Formel teilt Ihren jährlichen Zinssatz durch die Anzahl der Zahlungsperioden pro Jahr und verwendet dann diesen periodischen Zinssatz, um eine feste Zahlung zu berechnen, die das Darlehen über die angegebene Laufzeit vollständig tilgt. Wenn Sie Sonderzahlungen aktivieren, wendet der Rechner diese zusätzlichen Beträge direkt auf den Tilgungssaldo an und berechnet Zinsersparnisse und die verkürzte Rückzahlungszeit neu. Der zweiwöchentliche Vergleich zeigt, wie die Aufteilung Ihrer monatlichen Zahlung in 26 zweiwöchentliche Zahlungen (entspricht 13 monatlichen Zahlungen pro Jahr) Ihre Rückzahlung beschleunigt."
        },
        "considerations": {
          "title": "Wichtige Faktoren zu berücksichtigen",
          "items": [
            {
              "text": "Eine längere Darlehenslaufzeit bedeutet niedrigere monatliche Zahlungen, aber deutlich mehr Gesamtzinsen über die Laufzeit des Darlehens.",
              "type": "info"
            },
            {
              "text": "Selbst kleine Zinsunterschiede sind enorm wichtig — 0,5% auf eine 300.000€ Hypothek über 30 Jahre können 30.000€+ an zusätzlichen Zinsen bedeuten.",
              "type": "warning"
            },
            {
              "text": "Front-loaded Zinsen bedeuten, dass Sie anfangs langsam Eigenkapital aufbauen — nach 5 Jahren bei einer 30-jährigen Hypothek haben Sie möglicherweise nur 5-10% der Tilgung abbezahlt.",
              "type": "info"
            },
            {
              "text": "Prüfen Sie Ihre Darlehenskonditionen auf Vorfälligkeitsentschädigungen, bevor Sie Sonderzahlungen leisten. Die meisten modernen Darlehen erlauben Vorauszahlungen ohne Strafe.",
              "type": "warning"
            },
            {
              "text": "Zweiwöchentliche Zahlungen fügen effektiv eine volle zusätzliche monatliche Zahlung pro Jahr hinzu und können möglicherweise Zehntausende an Zinsen sparen.",
              "type": "info"
            },
            {
              "text": "Berücksichtigen Sie Ihre Opportunitätskosten — wenn Ihr Darlehenszinssatz 4% beträgt, Sie aber zu 8% investieren können, sind Sonderzahlungen möglicherweise nicht optimal.",
              "type": "info"
            }
          ]
        },
        "strategies": {
          "title": "Sonderzahlungs-Strategien",
          "items": [
            {
              "text": "Aufrunden: Wenn Ihre Zahlung 1.287€ beträgt, runden Sie auf 1.300€ auf — die zusätzlichen 13€/Monat summieren sich über die Zeit erheblich.",
              "type": "info"
            },
            {
              "text": "Eine zusätzliche Zahlung pro Jahr: Leisten Sie 13 Zahlungen statt 12 — das allein kann 4-6 Jahre von einer 30-jährigen Hypothek abschneiden.",
              "type": "info"
            },
            {
              "text": "Glücksfälle als Pauschalsumme: Wenden Sie Steuerrückerstattungen, Boni oder Erbschaften direkt auf die Tilgung für maximale Wirkung an.",
              "type": "info"
            },
            {
              "text": "Dollar-Cost-Averaging: Erhöhen Sie Ihre Sonderzahlung jährlich um 10-25€, während Ihr Einkommen wächst.",
              "type": "info"
            },
            {
              "text": "Zielen Sie auf den Wendepunkt: Zahlen Sie extra, bis Sie den Monat erreichen, wo die Tilgung die Zinsen in Ihrer regulären Zahlung übersteigt.",
              "type": "info"
            },
            {
              "text": "Umschuldung + Zahlung beibehalten: Wenn Sie zu einem niedrigeren Zinssatz umschulden, zahlen Sie weiterhin den gleichen Betrag — die Differenz geht zur Tilgung.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Tilgungs-Beispiele",
          "description": "Sehen Sie, wie Tilgung mit echten Zahlen funktioniert",
          "examples": [
            {
              "title": "30-jährige Hypothek — 300.000€ zu 6,5%",
              "steps": [
                "Monatliche Zahlung: 1.896,20€",
                "Erste Zahlung: 1.625€ Zinsen + 271€ Tilgung",
                "Gesamtzinsen über 30 Jahre: 382.633€",
                "Zins-zu-Tilgungs-Verhältnis: 1,28€ pro 1€ geliehen",
                "Mit 200€/Monat extra: Sparen Sie 99.838€ an Zinsen, zahlen Sie 7 Jahre früher ab"
              ],
              "result": "Nur 200€ zusätzlich pro Monat spart fast 100.000€ und eliminiert 7 Jahre an Zahlungen."
            },
            {
              "title": "5-jähriger Autokredit — 30.000€ zu 6,0%",
              "steps": [
                "Monatliche Zahlung: 579,98€",
                "Erste Zahlung: 150€ Zinsen + 430€ Tilgung",
                "Gesamtzinsen über 5 Jahre: 4.799€",
                "Zins-zu-Tilgungs-Verhältnis: 0,16€ pro 1€ geliehen",
                "Mit 100€/Monat extra: Sparen Sie 507€ an Zinsen, zahlen Sie 9 Monate früher ab"
              ],
              "result": "Kürzere Darlehenslaufzeiten bedeuten weniger Zinsen insgesamt — wählen Sie immer die kürzeste Laufzeit, die Sie sich leisten können."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist ein Tilgungsplan?",
          "answer": "Ein Tilgungsplan ist eine detaillierte Tabelle, die jede Zahlung über die Laufzeit Ihres Darlehens zeigt. Für jede Zahlung schlüsselt er auf, wie viel zu Zinsen versus Tilgung geht, und zeigt den verbleibenden Saldo. Frühe Zahlungen sind meist Zinsen, während spätere Zahlungen meist Tilgung sind. Dieser Plan hilft Ihnen, die wahren Kosten Ihres Darlehens zu verstehen und Sonderzahlungsstrategien zu planen."
        },
        {
          "question": "Wie reduzieren Sonderzahlungen meine Gesamtzinsen?",
          "answer": "Sonderzahlungen gehen direkt zur Reduzierung Ihres Tilgungssaldos. Da Zinsen auf den verbleibenden Saldo berechnet werden, bedeutet eine niedrigere Tilgung, dass weniger Zinsen jede Periode anfallen. Das schafft einen Zinseszinseffekt — jeder zusätzliche Euro, der zur Tilgung gezahlt wird, spart mehr als einen Euro an zukünftigen Zinsen. Selbst kleine Sonderzahlungen können über die Laufzeit eines langfristigen Darlehens Tausende sparen."
        },
        {
          "question": "Was ist der Unterschied zwischen zweiwöchentlichen und monatlichen Zahlungen?",
          "answer": "Bei monatlichen Zahlungen leisten Sie 12 Zahlungen pro Jahr. Bei zweiwöchentlichen Zahlungen zahlen Sie die Hälfte des monatlichen Betrags alle zwei Wochen, was zu 26 Halbzahlungen (entspricht 13 vollen monatlichen Zahlungen pro Jahr) führt. Diese zusätzliche Zahlung jedes Jahr geht vollständig zur Tilgung, was eine 30-jährige Hypothek um etwa 4-5 Jahre verkürzen und Zehntausende an Zinsen sparen kann."
        },
        {
          "question": "Funktioniert dieser Rechner für verschiedene Darlehensarten?",
          "answer": "Ja! Dieser Tilgungsrechner funktioniert für jedes festverzinsliche Ratendarlehen einschließlich Hypotheken, Autokredite, Studiendarlehen, Privatdarlehen und Geschäftsdarlehen. Geben Sie einfach Ihren Darlehensbetrag, Zinssatz und Laufzeit ein. Die Voreinstellungen bieten typische Werte für gängige Darlehensarten, um Sie schnell zu starten."
        },
        {
          "question": "Warum geht so viel meiner frühen Zahlung zu Zinsen?",
          "answer": "Bei einem standardmäßig amortisierten Darlehen werden Zinsen auf den verbleibenden Saldo berechnet. Am Anfang ist Ihr Saldo am höchsten, daher ist die Zinsbelastung groß. Während Sie schrittweise die Tilgung abbezahlen, fallen weniger Zinsen an und mehr von jeder Zahlung geht zur Tilgung. Zum Beispiel bei einer 300.000€ Hypothek zu 6,5% umfasst Ihre erste Zahlung etwa 1.625€ an Zinsen, aber nur 271€ zur Tilgung."
        },
        {
          "question": "Was ist das Zins-zu-Tilgungs-Verhältnis?",
          "answer": "Das ist eine einzigartige Kennzahl, die zeigt, wie viel Sie an Zinsen für jeden Euro zahlen, den Sie geliehen haben. Zum Beispiel bedeutet ein Verhältnis von 0,63€, dass Sie 63 Cent an Zinsen für jeden 1€ Tilgung zahlen. Das hilft Ihnen, schnell die wahren Kosten der Kreditaufnahme zu bewerten — höhere Verhältnisse zeigen teurere Darlehen an, typischerweise von höheren Zinssätzen oder längeren Laufzeiten."
        },
        {
          "question": "Sollte ich Sonderzahlungen leisten oder das Geld stattdessen investieren?",
          "answer": "Vergleichen Sie Ihren Darlehenszinssatz mit möglichen Anlagerenditen. Wenn Ihr Darlehenszinssatz höher ist als erwartete Anlagerenditen (nach Steuern), machen Sonderzahlungen Sinn. Wenn Ihr Darlehenszinssatz niedrig ist (z.B. 3-4%) und Sie zu höheren Renditen investieren können (z.B. historisch 7-10% in Aktien), könnte das Investieren profitabler sein. Schulden abzuzahlen bietet jedoch auch eine garantierte, risikofreie Rendite und Seelenfrieden."
        },
        {
          "question": "Wie genau ist dieser Tilgungsrechner?",
          "answer": "Dieser Rechner verwendet die Standard-Tilgungsformel, die von Banken und Finanzinstituten weltweit verwendet wird. Die Ergebnisse stimmen mit offiziellen Bankberechnungen für festverzinsliche Darlehen überein. Tatsächliche Zahlungen können jedoch aufgrund von Rundungen, unterschiedlichen Monatslängen oder zusätzlichen Kosten wie Steuern, Versicherungen und Gebühren, die nicht in der Basis-Tilgungsberechnung enthalten sind, leicht variieren."
        }
      ],
      "chart": {
        "title": "Darlehenssaldo über Zeit",
        "xLabel": "Jahr",
        "yLabel": "Betrag",
        "series": {
          "balance": "Verbleibendes Guthaben",
          "cumulativePrincipal": "Kumulative Tilgung gezahlt",
          "cumulativeInterest": "Kumulative Zinsen gezahlt"
        }
      },
      "detailedTable": {
        "amortizationSchedule": {
          "button": "Vollständigen Tilgungsplan anzeigen",
          "title": "Jahr-für-Jahr Tilgungsplan",
          "columns": {
            "year": "Jahr",
            "payment": "Jahreszahlung",
            "principal": "Tilgung gezahlt",
            "interest": "Zinsen gezahlt",
            "cumulativeInterest": "Kumulative Zinsen",
            "balance": "Verbleibendes Guthaben"
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
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      }
    },
  },

  // ─── INPUTS ───
  inputs: [
    {
      id: "loanAmount",
      type: "number",
      defaultValue: null,
      placeholder: "200000",
      min: 1,
      max: 100000000,
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
    },
    {
      id: "annualInterestRate",
      type: "number",
      defaultValue: null,
      placeholder: "6.8",
      min: 0.1,
      max: 30,
      step: 0.1,
      suffix: "%",
      showSlider: true,
    },
    {
      id: "loanTermYears",
      type: "number",
      defaultValue: null,
      placeholder: "30",
      min: 1,
      max: 50,
      suffix: "years",
    },
    {
      id: "paymentFrequency",
      type: "select",
      defaultValue: "monthly",
      options: [
        { value: "monthly" },
        { value: "biweekly" },
        { value: "acceleratedBiweekly" },
        { value: "weekly" },
        { value: "semiMonthly" },
      ],
    },
    {
      id: "includeExtraPayments",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "extraMonthlyPayment",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      min: 0,
      max: 1000000,
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
      showWhen: { field: "includeExtraPayments", value: true },
    },
    {
      id: "extraYearlyPayment",
      type: "number",
      defaultValue: null,
      placeholder: "1000",
      min: 0,
      max: 10000000,
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
      showWhen: { field: "includeExtraPayments", value: true },
    },
    {
      id: "extraOneTimePayment",
      type: "number",
      defaultValue: null,
      placeholder: "5000",
      min: 0,
      max: 100000000,
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
      showWhen: { field: "includeExtraPayments", value: true },
    },
    {
      id: "oneTimePaymentMonth",
      type: "number",
      defaultValue: 12,
      min: 1,
      max: 600,
      suffix: "month #",
      showWhen: { field: "includeExtraPayments", value: true },
    },
  ],

  inputGroups: [],

  // ─── RESULTS ───
  results: [
    { id: "monthlyPayment", type: "primary", format: "text" },
    { id: "totalInterest", type: "secondary", format: "text" },
    { id: "totalPaid", type: "secondary", format: "text" },
    { id: "interestToPrincipalRatio", type: "secondary", format: "text" },
    { id: "dailyInterestCost", type: "secondary", format: "text" },
    { id: "payoffDate", type: "secondary", format: "text" },
    { id: "interestSaved", type: "secondary", format: "text" },
    { id: "timeSaved", type: "secondary", format: "text" },
  ],

  // ─── INFOCARDS ───
  infoCards: [
    { id: "snapshot", type: "list", icon: "📊", itemCount: 4 },
    { id: "breakdown", type: "list", icon: "🔍", itemCount: 5 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ───
  chart: {
    id: "amortizationChart",
    type: "composed",
    xKey: "year",
    height: 340,
    stacked: false,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "balance", type: "area", color: "#3b82f6" },
      { key: "cumulativePrincipal", type: "area", color: "#10b981" },
      { key: "cumulativeInterest", type: "area", color: "#f59e0b" },
    ],
  },

  // ─── DETAILED TABLE ───
  detailedTable: {
    id: "amortizationSchedule",
    buttonLabel: "View Full Amortization Schedule",
    buttonIcon: "📋",
    modalTitle: "Year-by-Year Amortization Schedule",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "payment", label: "Annual Payment", align: "right" },
      { id: "principal", label: "Principal Paid", align: "right" },
      { id: "interest", label: "Interest Paid", align: "right" },
      { id: "cumulativeInterest", label: "Cumulative Interest", align: "right" },
      { id: "balance", label: "Remaining Balance", align: "right", highlight: true },
    ],
  },

  referenceData: [],

  // ─── EDUCATION SECTIONS ───
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "strategies", type: "list", icon: "📈", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ─── FAQs ───
  faqs: [
    { id: "0" }, { id: "1" }, { id: "2" }, { id: "3" },
    { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" },
  ],

  // ─── REFERENCES ───
  references: [
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2025",
      title: "Understand How Mortgage Payments Are Applied",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/owning-a-home/",
    },
    {
      authors: "Federal Reserve Board",
      year: "2024",
      title: "Consumer Credit and Loan Amortization",
      source: "Federal Reserve",
      url: "https://www.federalreserve.gov/",
    },
    {
      authors: "Investopedia",
      year: "2025",
      title: "Amortization: Definition, Formula, and Calculation",
      source: "Investopedia",
      url: "https://www.investopedia.com/terms/a/amortization.asp",
    },
    {
      authors: "U.S. Department of Education",
      year: "2025",
      title: "Federal Student Loan Repayment Plans",
      source: "StudentAid.gov",
      url: "https://studentaid.gov/manage-loans/repayment/plans",
    },
  ],

  hero: {
    badge: "Finance",
    title: "Amortization Calculator",
    subtitle: "Generate a complete amortization schedule and see how extra payments can save you thousands in interest.",
  },

  sidebar: {
    popular: true,
    trending: true,
  },

  features: {
    pdf: true,
    csv: true,
    excel: true,
    save: true,
    share: true,
    rating: true,
  },

  relatedCalculators: ["mortgage", "auto-loan", "loan", "compound-interest", "savings-goal"],

  ads: { showTopBanner: false, showSidebar: true },
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculateAmortization(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits } = data;

  // ─── Extract values ───
  const loanAmount = Number(values.loanAmount) || 0;
  const annualRate = Number(values.annualInterestRate) || 0;
  const termYears = Number(values.loanTermYears) || 0;
  const frequency = String(values.paymentFrequency || "monthly");
  const includeExtra = values.includeExtraPayments === true;
  const extraMonthly = includeExtra ? (Number(values.extraMonthlyPayment) || 0) : 0;
  const extraYearly = includeExtra ? (Number(values.extraYearlyPayment) || 0) : 0;
  const extraOneTime = includeExtra ? (Number(values.extraOneTimePayment) || 0) : 0;
  const oneTimeMonth = includeExtra ? (Number(values.oneTimePaymentMonth) || 12) : 0;

  // ─── Validation ───
  if (loanAmount <= 0 || annualRate <= 0 || termYears <= 0) {
    return {
      values: {},
      formatted: {},
      summary: "",
      isValid: false,
      metadata: {},
    };
  }

  // ─── Currency symbol ───
  const currencyUnit = fieldUnits?.loanAmount || "USD";
  const sym = CURRENCY_SYMBOLS[currencyUnit] || "$";

  // ─── Payment frequency parameters ───
  let periodsPerYear: number;
  let paymentLabel: string;

  switch (frequency) {
    case "weekly":
      periodsPerYear = 52;
      paymentLabel = "weekly";
      break;
    case "biweekly":
      periodsPerYear = 26;
      paymentLabel = "biweekly";
      break;
    case "acceleratedBiweekly":
      periodsPerYear = 26;
      paymentLabel = "accel. biweekly";
      break;
    case "semiMonthly":
      periodsPerYear = 24;
      paymentLabel = "semi-monthly";
      break;
    default:
      periodsPerYear = 12;
      paymentLabel = "monthly";
  }

  // ─── Calculate periodic payment ───
  const periodicRate = annualRate / 100 / periodsPerYear;
  let totalPeriods = termYears * periodsPerYear;

  let regularPayment: number;
  if (frequency === "acceleratedBiweekly") {
    // Accelerated biweekly: monthly payment ÷ 2
    const monthlyRate = annualRate / 100 / 12;
    const monthlyPeriods = termYears * 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, monthlyPeriods)) /
      (Math.pow(1 + monthlyRate, monthlyPeriods) - 1);
    regularPayment = monthlyPayment / 2;
    // Total periods will be determined by simulation
    totalPeriods = termYears * 26; // max periods
  } else {
    regularPayment = loanAmount * (periodicRate * Math.pow(1 + periodicRate, totalPeriods)) /
      (Math.pow(1 + periodicRate, totalPeriods) - 1);
  }

  // ─── Helper: Calculate monthly equivalent for extras ───
  const extraPerPeriod = (() => {
    if (frequency === "monthly") return extraMonthly;
    if (frequency === "biweekly" || frequency === "acceleratedBiweekly") return extraMonthly * 12 / 26;
    if (frequency === "weekly") return extraMonthly * 12 / 52;
    if (frequency === "semiMonthly") return extraMonthly * 12 / 24;
    return extraMonthly;
  })();

  // ─── Simulate WITHOUT extra payments (baseline) ───
  let baseBalance = loanAmount;
  let baseTotalInterest = 0;
  let baseTotalPeriods = 0;

  for (let p = 1; p <= totalPeriods * 2 && baseBalance > 0.01; p++) {
    const interest = baseBalance * periodicRate;
    let principal = regularPayment - interest;
    if (principal > baseBalance) principal = baseBalance;
    baseBalance -= principal;
    baseTotalInterest += interest;
    baseTotalPeriods = p;
  }

  const baseTotalPaid = loanAmount + baseTotalInterest;

  // ─── Simulate WITH extra payments ───
  let balance = loanAmount;
  let totalInterest = 0;
  let totalExtraPaid = 0;
  let actualPeriods = 0;

  // Track year-by-year data
  const yearlyData: Array<{
    year: number;
    totalPayment: number;
    totalPrincipal: number;
    totalInterest: number;
    cumulativeInterest: number;
    endBalance: number;
  }> = [];

  let currentYearPayment = 0;
  let currentYearPrincipal = 0;
  let currentYearInterest = 0;
  let cumulativeInterest = 0;

  // First payment breakdown
  let firstPaymentInterest = 0;
  let firstPaymentPrincipal = 0;

  // Monthly equivalent tracking for yearly/one-time
  const monthEquivPeriods = periodsPerYear / 12; // periods per month

  for (let p = 1; p <= totalPeriods * 2 && balance > 0.01; p++) {
    const interest = balance * periodicRate;
    let principal = regularPayment - interest;

    // Extra monthly
    let extraThisPeriod = extraPerPeriod;

    // Extra yearly: apply at end of each year
    const currentMonth = Math.ceil(p / monthEquivPeriods);
    if (extraYearly > 0 && p % periodsPerYear === 0) {
      extraThisPeriod += extraYearly;
    }

    // Extra one-time: apply at the specified month
    if (extraOneTime > 0 && currentMonth === oneTimeMonth && (p - 1) % Math.round(monthEquivPeriods) === 0) {
      extraThisPeriod += extraOneTime;
    }

    // Cap total payment at remaining balance
    if (principal + extraThisPeriod > balance) {
      principal = balance;
      extraThisPeriod = 0;
    }

    balance -= principal;
    if (extraThisPeriod > 0 && balance > 0) {
      const actualExtra = Math.min(extraThisPeriod, balance);
      balance -= actualExtra;
      totalExtraPaid += actualExtra;
    }

    totalInterest += interest;
    cumulativeInterest += interest;
    actualPeriods = p;

    // First payment
    if (p === 1) {
      firstPaymentInterest = interest;
      firstPaymentPrincipal = regularPayment - interest;
    }

    // Year tracking
    currentYearPayment += regularPayment + (extraThisPeriod > 0 ? extraThisPeriod : 0);
    currentYearPrincipal += principal + (extraThisPeriod > 0 ? Math.min(extraThisPeriod, balance + Math.min(extraThisPeriod, balance)) : 0);
    currentYearInterest += interest;

    if (p % periodsPerYear === 0 || balance <= 0.01) {
      const yearNum = yearlyData.length + 1;
      yearlyData.push({
        year: yearNum,
        totalPayment: currentYearPayment,
        totalPrincipal: currentYearPayment - currentYearInterest,
        totalInterest: currentYearInterest,
        cumulativeInterest,
        endBalance: Math.max(0, balance),
      });
      currentYearPayment = 0;
      currentYearPrincipal = 0;
      currentYearInterest = 0;
    }
  }

  const totalPaid = loanAmount + totalInterest;

  // ─── Unique Metrics ───

  // Interest-to-principal ratio
  const interestRatio = totalInterest / loanAmount;

  // Daily interest cost (year 1)
  const dailyInterest = (loanAmount * (annualRate / 100)) / 365;

  // Equity at midpoint
  const midpointPeriod = Math.floor(actualPeriods / 2);
  let midBalance = loanAmount;
  for (let p = 1; p <= midpointPeriod && midBalance > 0.01; p++) {
    const int = midBalance * periodicRate;
    const princ = Math.min(regularPayment - int, midBalance);
    midBalance -= princ;
  }
  const equityAtMidpoint = ((loanAmount - midBalance) / loanAmount) * 100;

  // Biweekly comparison (only show if currently monthly)
  let biweeklySavingsAmount = 0;
  let biweeklySavedMonths = 0;
  if (frequency === "monthly") {
    const biweeklyRate = annualRate / 100 / 26;
    const biweeklyPayment = regularPayment / 2;
    let bwBalance = loanAmount;
    let bwTotalInterest = 0;
    let bwPeriods = 0;
    for (let p = 1; p <= termYears * 26 * 2 && bwBalance > 0.01; p++) {
      const int = bwBalance * biweeklyRate;
      let princ = biweeklyPayment - int;
      if (princ > bwBalance) princ = bwBalance;
      bwBalance -= princ;
      bwTotalInterest += int;
      bwPeriods = p;
    }
    biweeklySavingsAmount = baseTotalInterest - bwTotalInterest;
    const bwMonths = (bwPeriods / 26) * 12;
    const baseMonths = termYears * 12;
    biweeklySavedMonths = baseMonths - bwMonths;
  }

  // Interest saved and time saved from extra payments
  const interestSaved = baseTotalInterest - totalInterest;
  const timeSavedPeriods = baseTotalPeriods - actualPeriods;
  const timeSavedMonths = Math.round((timeSavedPeriods / periodsPerYear) * 12);
  const timeSavedYears = Math.floor(timeSavedMonths / 12);
  const timeSavedRemMonths = timeSavedMonths % 12;

  // Payoff date
  const now = new Date();
  const payoffMonths = Math.round((actualPeriods / periodsPerYear) * 12);
  const payoffDate = new Date(now.getFullYear(), now.getMonth() + payoffMonths, 1);
  const payoffDateStr = payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // ─── Chart Data ───
  const chartData: Array<Record<string, unknown>> = [];
  let chartCumPrincipal = 0;
  let chartCumInterest = 0;
  for (const yd of yearlyData) {
    chartCumPrincipal += yd.totalPrincipal;
    chartCumInterest += yd.totalInterest;
    chartData.push({
      year: yd.year,
      balance: Math.round(yd.endBalance),
      cumulativePrincipal: Math.round(chartCumPrincipal),
      cumulativeInterest: Math.round(chartCumInterest),
    });
  }

  // ─── Table Data ───
  const tableData = yearlyData.map((yd) => ({
    year: String(yd.year),
    payment: `${sym}${fmtNum(yd.totalPayment)}`,
    principal: `${sym}${fmtNum(yd.totalPrincipal)}`,
    interest: `${sym}${fmtNum(yd.totalInterest)}`,
    cumulativeInterest: `${sym}${fmtNum(yd.cumulativeInterest)}`,
    balance: `${sym}${fmtNum(yd.endBalance)}`,
  }));

  // ─── Format time saved string ───
  let timeSavedStr = "—";
  if (includeExtra && timeSavedMonths > 0) {
    if (timeSavedYears > 0) {
      timeSavedStr = `${timeSavedYears} yr ${timeSavedRemMonths} mo earlier`;
    } else {
      timeSavedStr = `${timeSavedRemMonths} months earlier`;
    }
  }

  // ─── Format biweekly savings ───
  let biweeklySavingsStr = "—";
  if (frequency === "monthly" && biweeklySavingsAmount > 0) {
    const bwYears = Math.floor(biweeklySavedMonths / 12);
    const bwMo = Math.round(biweeklySavedMonths % 12);
    biweeklySavingsStr = `Save ${sym}${fmtNum(biweeklySavingsAmount, 0)} & ${bwYears} yr ${bwMo} mo`;
  } else if (frequency !== "monthly") {
    biweeklySavingsStr = "Already using accelerated frequency";
  }

  // ─── Build results ───
  return {
    values: {
      monthlyPayment: regularPayment,
      totalInterest,
      totalPaid,
      interestToPrincipalRatio: interestRatio,
      dailyInterestCost: dailyInterest,
      payoffDate: payoffDateStr,
      interestSaved,
      timeSaved: timeSavedMonths,
      firstPaymentInterest,
      firstPaymentPrincipal,
      equityAtMidpoint,
      biweeklySavings: biweeklySavingsAmount,
    },
    formatted: {
      monthlyPayment: `${sym}${fmtNum(regularPayment)} ${paymentLabel}`,
      totalInterest: `${sym}${fmtNum(totalInterest)}`,
      totalPaid: `${sym}${fmtNum(totalPaid)}`,
      interestToPrincipalRatio: `${sym}${fmtNum(interestRatio)} per $1 borrowed`,
      dailyInterestCost: `${sym}${fmtNum(dailyInterest)}/day`,
      payoffDate: payoffDateStr,
      interestSaved: includeExtra && interestSaved > 0 ? `${sym}${fmtNum(interestSaved)} saved` : "—",
      timeSaved: timeSavedStr,
      firstPaymentInterest: `${sym}${fmtNum(firstPaymentInterest)}`,
      firstPaymentPrincipal: `${sym}${fmtNum(firstPaymentPrincipal)}`,
      equityAtMidpoint: `${fmtNum(equityAtMidpoint, 1)}% paid off at midpoint`,
      biweeklySavings: biweeklySavingsStr,
    },
    summary: `Your ${paymentLabel} payment is ${sym}${fmtNum(regularPayment)}. Over the life of the loan, you'll pay ${sym}${fmtNum(totalInterest)} in interest — that's ${sym}${fmtNum(interestRatio)} for every dollar borrowed.`,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default amortizationCalculatorConfig;
