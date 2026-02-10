import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// =============================================================================
// LOAN TERMS
// =============================================================================
const LOAN_TERMS = [
  { value: "24", label: "24 months (2 years)" },
  { value: "36", label: "36 months (3 years)" },
  { value: "48", label: "48 months (4 years)" },
  { value: "60", label: "60 months (5 years)" },
  { value: "72", label: "72 months (6 years)" },
  { value: "84", label: "84 months (7 years)" },
];

// =============================================================================
// CONFIG
// =============================================================================
export const autoLoanCalculatorConfig: CalculatorConfigV4 = {
  id: "auto-loan",
  version: "4.1", // ✅ Updated version
  category: "finance",
  icon: "🚗",

  // ═══════════════════════════════════════════════════════════════════════════
  // ✨ NEW: PRESETS (Quick Scenarios)
  // ═══════════════════════════════════════════════════════════════════════════
  presets: [
    {
      id: "usedEconomy",
      icon: "🚙",
      values: {
        vehiclePrice: 18000,
        downPayment: 2000,
        tradeInValue: 0,
        loanTerm: "48",
        interestRate: 7.5,
        salesTax: 6,
        fees: 300,
        includeTaxInLoan: "yes",
      },
    },
    {
      id: "newSedan",
      icon: "🚗",
      values: {
        vehiclePrice: 32000,
        downPayment: 5000,
        tradeInValue: 8000,
        loanTerm: "60",
        interestRate: 5.9,
        salesTax: 6,
        fees: 500,
        includeTaxInLoan: "yes",
      },
    },
    {
      id: "newSUV",
      icon: "🚙",
      values: {
        vehiclePrice: 45000,
        downPayment: 10000,
        tradeInValue: 12000,
        loanTerm: "60",
        interestRate: 5.5,
        salesTax: 6,
        fees: 600,
        includeTaxInLoan: "yes",
      },
    },
    {
      id: "luxuryVehicle",
      icon: "🏎️",
      values: {
        vehiclePrice: 75000,
        downPayment: 15000,
        tradeInValue: 20000,
        loanTerm: "72",
        interestRate: 6.9,
        salesTax: 6,
        fees: 800,
        includeTaxInLoan: "yes",
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // ✨ NEW: SENSITIVITY CONFIG
  // ═══════════════════════════════════════════════════════════════════════════
  sensitivity: {
    inputId: "interestRate",
    resultId: "monthlyPayment",
    steps: 20,
    rangePercent: 50,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TRANSLATIONS - 5 LANGUAGES (EN, ES, PT, FR, DE)
  // ═══════════════════════════════════════════════════════════════════════════
  t: {
    // ─────────────────────────────────────────────────────────────────────────
    // ENGLISH
    // ─────────────────────────────────────────────────────────────────────────
    en: {
      name: "Auto Loan Calculator",
      slug: "auto-loan-calculator",
      subtitle: "Calculate monthly car loan payments",
      breadcrumb: "Auto Loan",
      seo: {
        title: "Auto Loan Calculator - Car Payment & Amortization Schedule",
        description: "Calculate your monthly car payment, total interest, and see a full amortization schedule. Compare loan terms, factor in trade-in value, taxes, and fees. Free auto loan calculator.",
        shortDescription: "Calculate monthly car payments and loan costs",
        keywords: ["auto loan calculator", "car payment calculator", "car loan calculator", "auto financing", "amortization schedule", "car payment estimator", "vehicle loan"],
      },
      calculator: {
        yourInformation: "Vehicle & Loan Details",
      },
      ui: {
        yourInformation: "Vehicle & Loan Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },
      inputs: {
        vehiclePrice: {
          label: "Vehicle Price",
          helpText: "Total purchase price of the vehicle",
        },
        downPayment: {
          label: "Down Payment",
          helpText: "Cash you'll pay upfront",
        },
        tradeInValue: {
          label: "Trade-in Value",
          helpText: "Value of your current vehicle",
        },
        loanTerm: {
          label: "Loan Term",
          helpText: "Length of the loan in months",
          options: {
            "24": "24 months (2 years)",
            "36": "36 months (3 years)",
            "48": "48 months (4 years)",
            "60": "60 months (5 years)",
            "72": "72 months (6 years)",
            "84": "84 months (7 years)",
          },
        },
        interestRate: {
          label: "Interest Rate (APR)",
          helpText: "Annual Percentage Rate",
        },
        salesTax: {
          label: "Sales Tax Rate",
          helpText: "State/local sales tax on vehicle",
        },
        fees: {
          label: "Title, Registration & Fees",
          helpText: "DMV fees, doc fees, etc.",
        },
        includeTaxInLoan: {
          label: "Include Tax & Fees in Loan?",
          helpText: "Choose whether to finance taxes and fees",
          options: {
            yes: "Yes, finance them",
            no: "No, pay upfront",
          },
        },
      },
      inputGroups: {
        taxesAndFees: "Taxes & Fees",
      },
      results: {
        monthlyPayment: { label: "Monthly Payment" },
        loanAmount: { label: "Loan Amount" },
        totalInterest: { label: "Total Interest" },
        totalCost: { label: "Total Cost" },
        payoffDate: { label: "Payoff Date" },
      },
      // ✨ NEW: PRESETS TRANSLATIONS
      presets: {
        usedEconomy: {
          label: "Used Economy",
          description: "Budget-friendly used car ~$18K",
        },
        newSedan: {
          label: "New Sedan",
          description: "Mid-range new car ~$32K with trade-in",
        },
        newSUV: {
          label: "New SUV",
          description: "Family SUV ~$45K with good down payment",
        },
        luxuryVehicle: {
          label: "Luxury Vehicle",
          description: "Premium car ~$75K with trade-in",
        },
      },
      // ✨ NEW: TOOLTIPS FOR RESULTS
      tooltips: {
        monthlyPayment: "Your fixed monthly payment including principal and interest. Does not include insurance or maintenance costs.",
        loanAmount: "The total amount you're borrowing after subtracting down payment and trade-in value.",
        totalInterest: "Total interest you'll pay over the life of the loan. Shorter terms or larger down payments reduce this.",
        totalCost: "Total amount paid over the loan term (principal + all interest). This is what the car really costs you.",
        payoffDate: "The month and year when your final payment is due if you make all scheduled payments.",
      },
      infoCards: {
        loanSummary: {
          title: "Loan Summary",
          items: {
            downPayment: "Down Payment",
            tradeInCredit: "Trade-in Credit",
            amountFinanced: "Amount Financed",
            interestCost: "Interest Cost",
          },
        },
        quickTips: {
          title: "Quick Tips",
          items: [
            "Aim for 20% down payment to avoid being upside-down",
            "Shorter terms save money but have higher payments",
            "Get pre-approved before visiting the dealer",
            "Compare APRs, not just interest rates",
          ],
        },
      },
      referenceData: {
        ratesByCredit: {
          title: "Average Rates by Credit Score (2026)",
          items: {
            excellent: { label: "Excellent (750+)", value: "4-6% new, 5-7% used" },
            good: { label: "Good (700-749)", value: "6-8% new, 7-10% used" },
            fair: { label: "Fair (650-699)", value: "9-13%" },
            poor: { label: "Poor (<650)", value: "14-20%+" },
          },
        },
      },
      education: {
        loanTerms: {
          title: "Understanding Loan Terms",
          cards: [
            { title: "Short Term (24-36 mo)", description: "Higher payments but less total interest. Best if you can afford higher monthly payments.", icon: "⚡" },
            { title: "Medium Term (48-60 mo)", description: "Balance between payment size and total cost. Most popular choice for new cars.", icon: "⚖️" },
            { title: "Long Term (72-84 mo)", description: "Lower payments but more total interest. Risk of being upside-down on your loan.", icon: "⏳" },
            { title: "APR vs Interest Rate", description: "APR includes fees and gives the true cost of borrowing. Always compare APRs, not just rates.", icon: "📊" },
          ],
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "Longer loan terms mean lower payments but significantly more interest paid overall", type: "warning" },
            { text: "A 20% down payment helps avoid being 'upside-down' (owing more than car is worth)", type: "info" },
            { text: "New car loans typically have lower rates (3-7%) than used car loans (5-10%)", type: "info" },
            { text: "Your credit score significantly impacts your interest rate—check before shopping", type: "info" },
            { text: "Some states don't charge sales tax on vehicles: Alaska, Delaware, Montana, New Hampshire, Oregon", type: "info" },
            { text: "Gap insurance may be worth considering if your down payment is less than 20%", type: "warning" },
          ],
        },
        exampleCalculation: {
          title: "Example Calculation",
          description: "$35,000 vehicle with $5,000 down, 60 months at 6.5% APR",
          examples: [
            {
              title: "Calculate Loan Amount",
              steps: ["Vehicle Price: $35,000", "Down Payment: -$5,000", "Sales Tax (6%): +$2,100", "Fees: +$500"],
              result: "Loan Amount: $32,600",
            },
            {
              title: "Calculate Monthly Payment",
              steps: ["Principal: $32,600", "Monthly Rate: 6.5% / 12 = 0.542%", "Term: 60 months", "PMT = P × [r(1+r)^n] / [(1+r)^n - 1]"],
              result: "Monthly Payment: $636.51",
            },
          ],
        },
        whatIsAmortization: {
          title: "What is Loan Amortization?",
          content: "Amortization is the process of paying off a loan through regular installment payments. Each payment consists of two parts: principal (the original loan amount) and interest (the cost of borrowing). In the early months of your loan, most of your payment goes toward interest. As the loan progresses, more of each payment goes toward paying down the principal. This is why making extra payments early in the loan can save significant money on interest.",
        },
        newVsUsed: {
          title: "New vs Used Car Financing",
          content: "New cars typically qualify for lower interest rates (sometimes 0% promotional rates from manufacturers) but depreciate faster—losing 20-30% of value in the first year. Used cars have higher interest rates but less depreciation risk. A 2-3 year old certified pre-owned vehicle often offers the best value, combining lower purchase price with manufacturer warranty coverage. Always get pre-approved from your bank or credit union before visiting dealerships to have negotiating leverage.",
        },
        avoidUpsideDown: {
          title: "Avoiding Being Upside-Down",
          content: "Being 'upside-down' or 'underwater' means owing more on your loan than your car is worth. This happens when depreciation outpaces your loan payoff. To avoid this: make at least a 20% down payment, choose the shortest loan term you can afford, and avoid rolling negative equity from a previous loan into a new one. If you're already upside-down, consider making extra principal payments or keeping the car until you're right-side up.",
        },
        dealerVsBank: {
          title: "Dealer Financing vs Bank/Credit Union",
          content: "Dealer financing is convenient but may not offer the best rate. Banks and credit unions often have lower rates, especially for members with good credit. Get pre-approved before visiting the dealer—this gives you negotiating power and a backup option. Some manufacturers offer 0% or low-rate financing on new cars, which can beat any bank rate. Always compare the total cost of the loan, not just the monthly payment, when evaluating offers.",
        },
      },
      faqs: [
        { question: "What's a good interest rate for a car loan?", answer: "As of 2026, good rates are: Excellent credit (750+): 4-6% for new, 5-7% for used. Good credit (700-749): 6-8% for new, 7-10% for used. Fair credit (650-699): 9-13%. Poor credit (below 650): 14-20%+. Rates vary by lender, so always shop around and get pre-approved." },
        { question: "Should I choose a longer loan term for lower payments?", answer: "While tempting, longer terms (72-84 months) cost significantly more in interest. A $30,000 loan at 6% costs $3,481 in interest over 48 months but $5,797 over 72 months—66% more! Longer terms also increase the risk of being upside-down. Choose the shortest term you can comfortably afford." },
        { question: "How much should I put down on a car?", answer: "Aim for at least 20% down to avoid being upside-down immediately due to depreciation. For a $35,000 car, that's $7,000. If you can't afford 20%, at least cover the sales tax and fees out of pocket so you're not financing those costs. Any down payment reduces your loan amount and total interest." },
        { question: "Is 0% financing really free?", answer: "Manufacturer 0% financing can be a great deal, but check if you're giving up a cash rebate. Sometimes taking the rebate and getting a low-rate loan from a bank results in lower total cost. Also, 0% offers require excellent credit (usually 720+) and are typically only for new cars with specific terms." },
        { question: "What fees are typically included in a car loan?", answer: "Common fees include: Documentation fee ($100-700), Title and registration (varies by state), Destination charge (new cars, ~$1,000-1,500), and Dealer add-ons. Sales tax is usually 5-10% of purchase price. Some fees are negotiable (doc fee, add-ons), while others are fixed (title, registration, tax)." },
        { question: "Should I pay off my car loan early?", answer: "Usually yes! Paying extra toward principal saves interest. Check for prepayment penalties (rare but possible). One strategy: round up payments ($487 → $500) or make one extra payment per year. However, if your rate is very low (under 4%), investing the extra money might yield better returns." },
        { question: "What's the difference between APR and interest rate?", answer: "The interest rate is the cost of borrowing the principal. APR (Annual Percentage Rate) includes the interest rate plus fees, giving you the true cost of the loan. A loan with a 5% rate but $1,000 in fees might have a 5.5% APR. Always compare APRs, not just interest rates." },
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
        shareCalculator: "Share this calculator:",
        includesValues: "includes your values",
        creating: "Creating...",
        thankYou: "Thanks for your rating!",
      },
      common: {
        home: "Home",
        calculators: "Calculators",
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SPANISH
    // ─────────────────────────────────────────────────────────────────────────
    es: {
      name: "Calculadora de Préstamo Auto",
      slug: "calculadora-prestamo-auto",
      subtitle: "Calcula el pago mensual de tu auto",
      breadcrumb: "Préstamo Auto",
      seo: {
        title: "Calculadora de Préstamo Auto - Pago de Auto y Tabla de Amortización",
        description: "Calcula tu pago mensual de auto, interés total y ve una tabla completa de amortización. Compara términos de préstamo, incluye valor de intercambio, impuestos y tarifas. Calculadora gratuita de préstamo auto.",
        shortDescription: "Calcula pagos mensuales del auto y costos del préstamo",
        keywords: ["calculadora préstamo auto", "calculadora pago auto", "calculadora préstamo coche", "financiamiento auto", "tabla amortización", "estimador pago auto", "préstamo vehículo"],
      },
      calculator: {
        yourInformation: "Detalles del Vehículo y Préstamo",
      },
      ui: {
        yourInformation: "Detalles del Vehículo y Préstamo",
        calculate: "Calcular",
        reset: "Reiniciar",
        results: "Resultados",
      },
      inputs: {
        vehiclePrice: {
          label: "Precio del Vehículo",
          helpText: "Precio total de compra del vehículo",
        },
        downPayment: {
          label: "Pago Inicial",
          helpText: "Efectivo que pagarás por adelantado",
        },
        tradeInValue: {
          label: "Valor de Intercambio",
          helpText: "Valor de tu vehículo actual",
        },
        loanTerm: {
          label: "Plazo del Préstamo",
          helpText: "Duración del préstamo en meses",
          options: {
            "24": "24 meses (2 años)",
            "36": "36 meses (3 años)",
            "48": "48 meses (4 años)",
            "60": "60 meses (5 años)",
            "72": "72 meses (6 años)",
            "84": "84 meses (7 años)",
          },
        },
        interestRate: {
          label: "Tasa de Interés (TAE)",
          helpText: "Tasa Anual Efectiva",
        },
        salesTax: {
          label: "Tasa de Impuesto de Venta",
          helpText: "Impuesto estatal/local sobre el vehículo",
        },
        fees: {
          label: "Título, Registro y Tarifas",
          helpText: "Tarifas de DMV, documentación, etc.",
        },
        includeTaxInLoan: {
          label: "¿Incluir Impuesto y Tarifas en el Préstamo?",
          helpText: "Elige si financiar impuestos y tarifas",
          options: {
            yes: "Sí, financiarlos",
            no: "No, pagar por adelantado",
          },
        },
      },
      inputGroups: {
        taxesAndFees: "Impuestos y Tarifas",
      },
      results: {
        monthlyPayment: { label: "Pago Mensual" },
        loanAmount: { label: "Monto del Préstamo" },
        totalInterest: { label: "Interés Total" },
        totalCost: { label: "Costo Total" },
        payoffDate: { label: "Fecha de Liquidación" },
      },
      // ✨ PRESETS EN ESPAÑOL
      presets: {
        usedEconomy: {
          label: "Usado Económico",
          description: "Auto usado económico ~$18K",
        },
        newSedan: {
          label: "Sedán Nuevo",
          description: "Auto nuevo mediano ~$32K con intercambio",
        },
        newSUV: {
          label: "SUV Nueva",
          description: "SUV familiar ~$45K con buen enganche",
        },
        luxuryVehicle: {
          label: "Vehículo de Lujo",
          description: "Auto premium ~$75K con intercambio",
        },
      },
      // ✨ TOOLTIPS EN ESPAÑOL
      tooltips: {
        monthlyPayment: "Tu pago mensual fijo incluyendo capital e interés. No incluye seguro ni costos de mantenimiento.",
        loanAmount: "La cantidad total que estás pidiendo prestada después de restar enganche y valor de intercambio.",
        totalInterest: "Interés total que pagarás durante la vida del préstamo. Plazos más cortos o enganches mayores reducen esto.",
        totalCost: "Monto total pagado durante el plazo del préstamo (capital + todos los intereses). Esto es lo que realmente te cuesta el auto.",
        payoffDate: "El mes y año cuando tu pago final vence si haces todos los pagos programados.",
      },
      infoCards: {
        loanSummary: {
          title: "Resumen del Préstamo",
          items: {
            downPayment: "Pago Inicial",
            tradeInCredit: "Crédito de Intercambio",
            amountFinanced: "Monto Financiado",
            interestCost: "Costo de Interés",
          },
        },
        quickTips: {
          title: "Consejos Rápidos",
          items: [
            "Busca un pago inicial del 20% para evitar estar en negativo",
            "Plazos más cortos ahorran dinero pero tienen pagos más altos",
            "Obtén preaprobación antes de visitar el concesionario",
            "Compara TAE, no solo tasas de interés",
          ],
        },
      },
      referenceData: {
        ratesByCredit: {
          title: "Tasas Promedio por Puntaje de Crédito (2026)",
          items: {
            excellent: { label: "Excelente (750+)", value: "4-6% nuevo, 5-7% usado" },
            good: { label: "Bueno (700-749)", value: "6-8% nuevo, 7-10% usado" },
            fair: { label: "Regular (650-699)", value: "9-13%" },
            poor: { label: "Pobre (<650)", value: "14-20%+" },
          },
        },
      },
      education: {
        loanTerms: {
          title: "Entendiendo los Plazos de Préstamo",
          cards: [
            { title: "Plazo Corto (24-36 meses)", description: "Pagos más altos pero menos interés total. Mejor si puedes pagar mensualidades más altas.", icon: "⚡" },
            { title: "Plazo Medio (48-60 meses)", description: "Balance entre tamaño de pago y costo total. Opción más popular para autos nuevos.", icon: "⚖️" },
            { title: "Plazo Largo (72-84 meses)", description: "Pagos más bajos pero más interés total. Riesgo de estar en negativo en tu préstamo.", icon: "⏳" },
            { title: "TAE vs Tasa de Interés", description: "TAE incluye tarifas y da el costo real de pedir prestado. Siempre compara TAE, no solo tasas.", icon: "📊" },
          ],
        },
        considerations: {
          title: "Consideraciones Importantes",
          items: [
            { text: "Plazos de préstamo más largos significan pagos más bajos pero significativamente más interés pagado en total", type: "warning" },
            { text: "Un pago inicial del 20% ayuda a evitar estar 'en negativo' (deber más de lo que vale el auto)", type: "info" },
            { text: "Los préstamos de autos nuevos típicamente tienen tasas más bajas (3-7%) que los de autos usados (5-10%)", type: "info" },
            { text: "Tu puntaje de crédito impacta significativamente tu tasa de interés—verifica antes de comprar", type: "info" },
            { text: "Algunos estados no cobran impuesto de venta en vehículos: Alaska, Delaware, Montana, New Hampshire, Oregon", type: "info" },
            { text: "El seguro de brecha puede valer la pena considerarlo si tu pago inicial es menos del 20%", type: "warning" },
          ],
        },
        exampleCalculation: {
          title: "Ejemplo de Cálculo",
          description: "Vehículo de $35,000 con $5,000 de enganche, 60 meses al 6.5% TAE",
          examples: [
            {
              title: "Calcular Monto del Préstamo",
              steps: ["Precio del Vehículo: $35,000", "Pago Inicial: -$5,000", "Impuesto de Venta (6%): +$2,100", "Tarifas: +$500"],
              result: "Monto del Préstamo: $32,600",
            },
            {
              title: "Calcular Pago Mensual",
              steps: ["Capital: $32,600", "Tasa Mensual: 6.5% / 12 = 0.542%", "Plazo: 60 meses", "PMT = P × [r(1+r)^n] / [(1+r)^n - 1]"],
              result: "Pago Mensual: $636.51",
            },
          ],
        },
        whatIsAmortization: {
          title: "¿Qué es la Amortización de Préstamo?",
          content: "La amortización es el proceso de pagar un préstamo a través de pagos regulares a plazos. Cada pago consiste en dos partes: capital (el monto original del préstamo) e interés (el costo del préstamo). En los primeros meses de tu préstamo, la mayoría de tu pago va hacia el interés. Conforme el préstamo progresa, más de cada pago va hacia pagar el capital. Por esto hacer pagos extra temprano en el préstamo puede ahorrar dinero significativo en intereses.",
        },
        newVsUsed: {
          title: "Financiamiento de Auto Nuevo vs Usado",
          content: "Los autos nuevos típicamente califican para tasas de interés más bajas (a veces tasas promocionales del 0% de fabricantes) pero se deprecian más rápido—perdiendo 20-30% de valor en el primer año. Los autos usados tienen tasas de interés más altas pero menos riesgo de depreciación. Un vehículo certificado pre-owned de 2-3 años a menudo ofrece el mejor valor, combinando precio de compra más bajo con cobertura de garantía del fabricante. Siempre obtén preaprobación de tu banco o cooperativa de crédito antes de visitar concesionarios para tener ventaja en la negociación.",
        },
        avoidUpsideDown: {
          title: "Evitando Estar en Negativo",
          content: "Estar 'en negativo' o 'bajo el agua' significa deber más en tu préstamo de lo que vale tu auto. Esto pasa cuando la depreciación supera el pago de tu préstamo. Para evitar esto: haz al menos un pago inicial del 20%, elige el plazo más corto que puedas pagar, y evita incluir capital negativo de un préstamo anterior en uno nuevo. Si ya estás en negativo, considera hacer pagos extra al capital o mantener el auto hasta estar en positivo.",
        },
        dealerVsBank: {
          title: "Financiamiento del Concesionario vs Banco/Cooperativa",
          content: "El financiamiento del concesionario es conveniente pero puede no ofrecer la mejor tasa. Los bancos y cooperativas de crédito a menudo tienen tasas más bajas, especialmente para miembros con buen crédito. Obtén preaprobación antes de visitar el concesionario—esto te da poder de negociación y una opción de respaldo. Algunos fabricantes ofrecen financiamiento del 0% o tasa baja en autos nuevos, que puede superar cualquier tasa bancaria. Siempre compara el costo total del préstamo, no solo el pago mensual, al evaluar ofertas.",
        },
      },
      faqs: [
        { question: "¿Qué es una buena tasa de interés para un préstamo de auto?", answer: "A partir de 2026, las buenas tasas son: Crédito excelente (750+): 4-6% para nuevo, 5-7% para usado. Buen crédito (700-749): 6-8% para nuevo, 7-10% para usado. Crédito regular (650-699): 9-13%. Mal crédito (menos de 650): 14-20%+. Las tasas varían por prestamista, así que siempre compara y obtén preaprobación." },
        { question: "¿Debería elegir un plazo más largo para pagos más bajos?", answer: "Aunque tentador, plazos más largos (72-84 meses) cuestan significativamente más en intereses. Un préstamo de $30,000 al 6% cuesta $3,481 en interés en 48 meses pero $5,797 en 72 meses—¡66% más! Los plazos más largos también aumentan el riesgo de estar en negativo. Elige el plazo más corto que puedas pagar cómodamente." },
        { question: "¿Cuánto debería dar de pago inicial?", answer: "Busca al menos 20% de inicial para evitar estar en negativo inmediatamente debido a la depreciación. Para un auto de $35,000, eso son $7,000. Si no puedes pagar el 20%, al menos cubre el impuesto de venta y tarifas de tu bolsillo para no financiar esos costos. Cualquier pago inicial reduce el monto de tu préstamo y el interés total." },
        { question: "¿Es realmente gratis el financiamiento al 0%?", answer: "El financiamiento al 0% del fabricante puede ser una gran oferta, pero verifica si estás renunciando a un reembolso en efectivo. A veces tomar el reembolso y obtener un préstamo de tasa baja de un banco resulta en menor costo total. Además, las ofertas del 0% requieren crédito excelente (usualmente 720+) y típicamente son solo para autos nuevos con términos específicos." },
        { question: "¿Qué tarifas se incluyen típicamente?", answer: "Las tarifas comunes incluyen: Tarifa de documentación ($100-700), Título y registro (varía por estado), Cargo de destino (autos nuevos, ~$1,000-1,500), y Agregados del concesionario. El impuesto de venta es usualmente 5-10% del precio de compra. Algunas tarifas son negociables (tarifa de doc, agregados), mientras otras son fijas (título, registro, impuesto)." },
        { question: "¿Debería pagar mi préstamo antes de tiempo?", answer: "¡Usualmente sí! Pagar extra hacia el capital ahorra interés. Verifica penalidades por pago anticipado (raras pero posibles). Una estrategia: redondear pagos ($487 → $500) o hacer un pago extra por año. Sin embargo, si tu tasa es muy baja (menos del 4%), invertir el dinero extra podría dar mejores retornos." },
        { question: "¿Cuál es la diferencia entre TAE y tasa de interés?", answer: "La tasa de interés es el costo de pedir prestado el capital. TAE (Tasa Anual Efectiva) incluye la tasa de interés más tarifas, dándote el costo real del préstamo. Un préstamo con tasa del 5% pero $1,000 en tarifas podría tener una TAE del 5.5%. Siempre compara TAE, no solo tasas de interés." },
      ],
      rating: {
        title: "Calificar esta Calculadora",
        share: "Compartir",
        copied: "¡Copiado!",
        copyLink: "Copiar Enlace",
        clickToRate: "Haz clic para calificar",
        youRated: "Calificaste",
        stars: "estrellas",
        averageFrom: "promedio de",
        ratings: "calificaciones",
        shareCalculator: "Compartir esta calculadora:",
        includesValues: "incluye tus valores",
        creating: "Creando...",
        thankYou: "¡Gracias por tu calificación!",
      },
      common: {
        home: "Inicio",
        calculators: "Calculadoras",
        reviews: "reseñas",
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PORTUGUESE
    // ─────────────────────────────────────────────────────────────────────────
    pt: {
      name: "Calculadora de Financiamento de Veículo",
      slug: "calculadora-financiamento-veiculo",
      subtitle: "Calcule a parcela mensal do seu carro",
      breadcrumb: "Financiamento de Veículo",
      seo: {
        title: "Calculadora de Financiamento de Veículo - Parcelas e Cronograma de Amortização",
        description: "Calcule sua parcela mensal do carro, juros totais e veja o cronograma completo de amortização. Compare prazos de financiamento, considere valor do usado na troca, impostos e taxas. Calculadora gratuita de financiamento automotivo.",
        shortDescription: "Calcule prestações mensais e custos do financiamento",
        keywords: ["calculadora financiamento veículo", "calculadora parcela carro", "calculadora empréstimo carro", "financiamento automotivo", "cronograma amortização", "simulador parcela carro", "empréstimo veicular"],
      },
      calculator: {
        yourInformation: "Detalhes do Veículo e Financiamento",
      },
      ui: {
        yourInformation: "Detalhes do Veículo e Financiamento",
        calculate: "Calcular",
        reset: "Limpar",
        results: "Resultados",
      },
      inputs: {
        vehiclePrice: {
          label: "Preço do Veículo",
          helpText: "Preço total de compra do veículo",
        },
        downPayment: {
          label: "Entrada",
          helpText: "Valor que você pagará à vista",
        },
        tradeInValue: {
          label: "Valor da Troca",
          helpText: "Valor do seu veículo atual",
        },
        loanTerm: {
          label: "Prazo do Financiamento",
          helpText: "Duração do financiamento em meses",
          options: {
            "24": "24 meses (2 anos)",
            "36": "36 meses (3 anos)",
            "48": "48 meses (4 anos)",
            "60": "60 meses (5 anos)",
            "72": "72 meses (6 anos)",
            "84": "84 meses (7 anos)",
          },
        },
        interestRate: {
          label: "Taxa de Juros (% a.a.)",
          helpText: "Taxa de Porcentagem Anual",
        },
        salesTax: {
          label: "Taxa de Imposto sobre Vendas",
          helpText: "Imposto estadual/municipal sobre o veículo",
        },
        fees: {
          label: "Documentação, Registro e Taxas",
          helpText: "Taxas do DETRAN, documentação, etc.",
        },
        includeTaxInLoan: {
          label: "Incluir Impostos e Taxas no Financiamento?",
          helpText: "Escolha se deseja financiar impostos e taxas",
          options: {
            yes: "Sim, financiar",
            no: "Não, pagar à vista",
          },
        },
      },
      inputGroups: {
        taxesAndFees: "Impostos e Taxas",
      },
      results: {
        monthlyPayment: { label: "Parcela Mensal" },
        loanAmount: { label: "Valor Financiado" },
        totalInterest: { label: "Juros Totais" },
        totalCost: { label: "Custo Total" },
        payoffDate: { label: "Data de Quitação" },
      },
      // ✨ PRESETS EM PORTUGUÊS
      presets: {
        usedEconomy: {
          label: "Usado Econômico",
          description: "Carro usado econômico ~R$90K",
        },
        newSedan: {
          label: "Sedã Novo",
          description: "Carro novo médio ~R$160K com troca",
        },
        newSUV: {
          label: "SUV Nova",
          description: "SUV familiar ~R$225K com boa entrada",
        },
        luxuryVehicle: {
          label: "Veículo de Luxo",
          description: "Carro premium ~R$375K com troca",
        },
      },
      // ✨ TOOLTIPS EM PORTUGUÊS
      tooltips: {
        monthlyPayment: "Sua parcela mensal fixa incluindo principal e juros. Não inclui seguro ou custos de manutenção.",
        loanAmount: "O valor total que você está financiando após subtrair entrada e valor da troca.",
        totalInterest: "Juros totais que você pagará durante a vida do financiamento. Prazos mais curtos ou entradas maiores reduzem isso.",
        totalCost: "Valor total pago durante o prazo do financiamento (principal + todos os juros). Isso é o que o carro realmente custa para você.",
        payoffDate: "O mês e ano quando sua parcela final vence se você fizer todos os pagamentos programados.",
      },
      infoCards: {
        loanSummary: {
          title: "Resumo do Financiamento",
          items: {
            downPayment: "Entrada",
            tradeInCredit: "Crédito da Troca",
            amountFinanced: "Valor Financiado",
            interestCost: "Custo dos Juros",
          },
        },
        quickTips: {
          title: "Dicas Rápidas",
          items: [
            "Busque 20% de entrada para evitar ficar negativo",
            "Prazos mais curtos economizam dinheiro mas têm parcelas mais altas",
            "Obtenha pré-aprovação antes de visitar a concessionária",
            "Compare taxas efetivas, não apenas taxas de juros",
          ],
        },
      },
      referenceData: {
        ratesByCredit: {
          title: "Taxas Médias por Score de Crédito (2026)",
          items: {
            excellent: { label: "Excelente (750+)", value: "4-6% novo, 5-7% usado" },
            good: { label: "Bom (700-749)", value: "6-8% novo, 7-10% usado" },
            fair: { label: "Regular (650-699)", value: "9-13%" },
            poor: { label: "Ruim (<650)", value: "14-20%+" },
          },
        },
      },
      education: {
        loanTerms: {
          title: "Entendendo os Prazos de Financiamento",
          cards: [
            { title: "Prazo Curto (24-36 meses)", description: "Parcelas mais altas mas menos juros totais. Melhor se você pode pagar mensalidades mais altas.", icon: "⚡" },
            { title: "Prazo Médio (48-60 meses)", description: "Equilíbrio entre tamanho da parcela e custo total. Escolha mais popular para carros novos.", icon: "⚖️" },
            { title: "Prazo Longo (72-84 meses)", description: "Parcelas mais baixas mas mais juros totais. Risco de ficar negativo no seu financiamento.", icon: "⏳" },
            { title: "CET vs Taxa de Juros", description: "CET inclui taxas e dá o custo real de empréstimo. Sempre compare CET, não apenas taxas.", icon: "📊" },
          ],
        },
        considerations: {
          title: "Considerações Importantes",
          items: [
            { text: "Prazos de financiamento mais longos significam parcelas mais baixas mas significativamente mais juros pagos no total", type: "warning" },
            { text: "Uma entrada de 20% ajuda a evitar ficar 'negativo' (dever mais do que o carro vale)", type: "info" },
            { text: "Financiamentos de carros novos tipicamente têm taxas mais baixas (3-7%) do que de carros usados (5-10%)", type: "info" },
            { text: "Seu score de crédito impacta significativamente sua taxa de juros—verifique antes de comprar", type: "info" },
            { text: "Algumas regiões têm impostos diferentes sobre veículos—verifique as taxas locais", type: "info" },
            { text: "O seguro gap pode valer a pena considerar se sua entrada é menos de 20%", type: "warning" },
          ],
        },
        exampleCalculation: {
          title: "Exemplo de Cálculo",
          description: "Veículo de R$175.000 com R$25.000 de entrada, 60 meses a 6,5% a.a.",
          examples: [
            {
              title: "Calcular Valor Financiado",
              steps: ["Preço do Veículo: R$175.000", "Entrada: -R$25.000", "IPVA (3%): +R$5.250", "Taxas: +R$2.500"],
              result: "Valor Financiado: R$157.750",
            },
            {
              title: "Calcular Parcela Mensal",
              steps: ["Principal: R$157.750", "Taxa Mensal: 6,5% / 12 = 0,542%", "Prazo: 60 meses", "PMT = P × [r(1+r)^n] / [(1+r)^n - 1]"],
              result: "Parcela Mensal: R$3.082,55",
            },
          ],
        },
        whatIsAmortization: {
          title: "O que é Amortização de Financiamento?",
          content: "Amortização é o processo de pagar um financiamento através de parcelas regulares. Cada pagamento consiste em duas partes: principal (o valor original do empréstimo) e juros (o custo do empréstimo). Nos primeiros meses do seu financiamento, a maior parte do seu pagamento vai para os juros. Conforme o financiamento progride, mais de cada pagamento vai para pagar o principal. Por isso fazer pagamentos extras no início do financiamento pode economizar dinheiro significativo em juros.",
        },
        newVsUsed: {
          title: "Financiamento de Carro Novo vs Usado",
          content: "Carros novos tipicamente qualificam para taxas de juros mais baixas (às vezes taxas promocionais de 0% de fabricantes) mas depreciam mais rápido—perdendo 20-30% do valor no primeiro ano. Carros usados têm taxas de juros mais altas mas menos risco de depreciação. Um veículo certificado seminovo de 2-3 anos frequentemente oferece o melhor valor, combinando preço de compra mais baixo com cobertura de garantia do fabricante. Sempre obtenha pré-aprovação do seu banco ou cooperativa antes de visitar concessionárias para ter poder de negociação.",
        },
        avoidUpsideDown: {
          title: "Evitando Ficar Negativo",
          content: "Ficar 'negativo' ou 'submerso' significa dever mais no seu financiamento do que seu carro vale. Isso acontece quando a depreciação ultrapassa seu pagamento do financiamento. Para evitar isso: faça pelo menos 20% de entrada, escolha o prazo mais curto que você pode pagar, e evite rolar equity negativo de um financiamento anterior para um novo. Se você já está negativo, considere fazer pagamentos extras ao principal ou manter o carro até ficar positivo.",
        },
        dealerVsBank: {
          title: "Financiamento da Concessionária vs Banco/Cooperativa",
          content: "O financiamento da concessionária é conveniente mas pode não oferecer a melhor taxa. Bancos e cooperativas frequentemente têm taxas mais baixas, especialmente para membros com bom crédito. Obtenha pré-aprovação antes de visitar a concessionária—isso te dá poder de negociação e uma opção de backup. Alguns fabricantes oferecem financiamento de 0% ou taxa baixa em carros novos, que pode superar qualquer taxa de banco. Sempre compare o custo total do financiamento, não apenas a parcela mensal, ao avaliar ofertas.",
        },
      },
      faqs: [
        { question: "Qual é uma boa taxa de juros para financiamento de veículo?", answer: "Em 2026, boas taxas são: Crédito excelente (750+): 4-6% para novo, 5-7% para usado. Bom crédito (700-749): 6-8% para novo, 7-10% para usado. Crédito regular (650-699): 9-13%. Crédito ruim (abaixo de 650): 14-20%+. As taxas variam por instituição, então sempre compare e obtenha pré-aprovação." },
        { question: "Devo escolher um prazo mais longo para parcelas mais baixas?", answer: "Embora tentador, prazos mais longos (72-84 meses) custam significativamente mais em juros. Um financiamento de R$150.000 a 6% custa R$17.405 em juros em 48 meses mas R$28.985 em 72 meses—66% mais! Prazos mais longos também aumentam o risco de ficar negativo. Escolha o prazo mais curto que você pode confortavelmente pagar." },
        { question: "Quanto devo dar de entrada em um carro?", answer: "Busque pelo menos 20% de entrada para evitar ficar negativo imediatamente devido à depreciação. Para um carro de R$175.000, isso são R$35.000. Se você não pode pagar 20%, pelo menos cubra os impostos e taxas do seu bolso para não financiar esses custos. Qualquer entrada reduz o valor financiado e os juros totais." },
        { question: "O financiamento a 0% é realmente gratuito?", answer: "O financiamento a 0% do fabricante pode ser uma ótima oferta, mas verifique se você está abrindo mão de um desconto à vista. Às vezes pegar o desconto e obter um financiamento de taxa baixa de um banco resulta em custo total menor. Além disso, ofertas de 0% requerem crédito excelente (geralmente 720+) e tipicamente são apenas para carros novos com termos específicos." },
        { question: "Quais taxas são tipicamente incluídas?", answer: "Taxas comuns incluem: Taxa de documentação (R$500-3.500), Licenciamento e IPVA (varia por estado), Frete (carros novos, ~R$5.000-7.500), e Acessórios da concessionária. IPVA é geralmente 2-4% do valor do veículo. Algumas taxas são negociáveis (taxa de doc, acessórios), enquanto outras são fixas (licenciamento, IPVA)." },
        { question: "Devo quitar meu financiamento antecipadamente?", answer: "Geralmente sim! Pagar extra para o principal economiza juros. Verifique penalidades por pagamento antecipado (raras mas possíveis). Uma estratégia: arredondar parcelas (R$2.437 → R$2.500) ou fazer uma parcela extra por ano. Porém, se sua taxa é muito baixa (abaixo de 4%), investir o dinheiro extra pode render melhores retornos." },
        { question: "Qual é a diferença entre CET e taxa de juros?", answer: "A taxa de juros é o custo de emprestar o principal. CET (Custo Efetivo Total) inclui a taxa de juros mais taxas, te dando o custo real do financiamento. Um financiamento com taxa de 5% mas R$5.000 em taxas pode ter um CET de 5,5%. Sempre compare CET, não apenas taxas de juros." },
      ],
      rating: {
        title: "Avalie esta Calculadora",
        share: "Compartilhar",
        copied: "Copiado!",
        copyLink: "Copiar Link",
        clickToRate: "Clique para avaliar",
        youRated: "Você avaliou",
        stars: "estrelas",
        averageFrom: "média de",
        ratings: "avaliações",
        shareCalculator: "Compartilhe esta calculadora:",
        includesValues: "inclui seus valores",
        creating: "Criando...",
        thankYou: "Obrigado pela sua avaliação!",
      },
      common: {
        home: "Início",
        calculators: "Calculadoras",
        reviews: "avaliações",
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // FRENCH
    // ─────────────────────────────────────────────────────────────────────────
    fr: {
      name: "Calculateur de Prêt Auto",
      slug: "calculateur-pret-auto",
      subtitle: "Calculez vos mensualités auto",
      breadcrumb: "Prêt Auto",
      seo: {
        title: "Calculateur de Prêt Auto - Paiement Voiture et Tableau d'Amortissement",
        description: "Calculez votre paiement mensuel de voiture, les intérêts totaux, et voyez un tableau d'amortissement complet. Comparez les termes de prêt, incluez la valeur d'échange, taxes et frais. Calculateur de prêt auto gratuit.",
        shortDescription: "Calculez les paiements mensuels de voiture et les coûts de prêt",
        keywords: ["calculateur prêt auto", "calculateur paiement voiture", "calculateur prêt voiture", "financement auto", "tableau amortissement", "estimateur paiement voiture", "prêt véhicule"],
      },
      calculator: {
        yourInformation: "Détails du Véhicule et du Prêt",
      },
      ui: {
        yourInformation: "Détails du Véhicule et du Prêt",
        calculate: "Calculer",
        reset: "Réinitialiser",
        results: "Résultats",
      },
      inputs: {
        vehiclePrice: {
          label: "Prix du Véhicule",
          helpText: "Prix d'achat total du véhicule",
        },
        downPayment: {
          label: "Mise de Fonds",
          helpText: "Argent que vous paierez d'avance",
        },
        tradeInValue: {
          label: "Valeur d'Échange",
          helpText: "Valeur de votre véhicule actuel",
        },
        loanTerm: {
          label: "Durée du Prêt",
          helpText: "Durée du prêt en mois",
          options: {
            "24": "24 mois (2 ans)",
            "36": "36 mois (3 ans)",
            "48": "48 mois (4 ans)",
            "60": "60 mois (5 ans)",
            "72": "72 mois (6 ans)",
            "84": "84 mois (7 ans)",
          },
        },
        interestRate: {
          label: "Taux d'Intérêt (TEG)",
          helpText: "Taux Effectif Global",
        },
        salesTax: {
          label: "Taux de Taxe de Vente",
          helpText: "Taxe de vente provinciale/locale sur le véhicule",
        },
        fees: {
          label: "Titre, Immatriculation et Frais",
          helpText: "Frais SAAQ, frais de documentation, etc.",
        },
        includeTaxInLoan: {
          label: "Inclure Taxe et Frais dans le Prêt?",
          helpText: "Choisir si vous voulez financer les taxes et frais",
          options: {
            yes: "Oui, les financer",
            no: "Non, payer d'avance",
          },
        },
      },
      inputGroups: {
        taxesAndFees: "Taxes et Frais",
      },
      results: {
        monthlyPayment: { label: "Paiement Mensuel" },
        loanAmount: { label: "Montant du Prêt" },
        totalInterest: { label: "Intérêts Totaux" },
        totalCost: { label: "Coût Total" },
        payoffDate: { label: "Date de Remboursement" },
      },
      // ✨ PRESETS EN FRANÇAIS
      presets: {
        usedEconomy: {
          label: "Occasion Économique",
          description: "Voiture d'occasion économique ~18K€",
        },
        newSedan: {
          label: "Berline Neuve",
          description: "Voiture neuve moyenne ~32K€ avec échange",
        },
        newSUV: {
          label: "SUV Neuf",
          description: "SUV familial ~45K€ avec bonne mise de fonds",
        },
        luxuryVehicle: {
          label: "Véhicule de Luxe",
          description: "Voiture premium ~75K€ avec échange",
        },
      },
      // ✨ TOOLTIPS EN FRANÇAIS
      tooltips: {
        monthlyPayment: "Votre paiement mensuel fixe incluant capital et intérêts. N'inclut pas l'assurance ou les frais d'entretien.",
        loanAmount: "Le montant total que vous empruntez après soustraction de la mise de fonds et de la valeur d'échange.",
        totalInterest: "Intérêts totaux que vous paierez sur la durée du prêt. Des termes plus courts ou des mises de fonds plus importantes réduisent ceci.",
        totalCost: "Montant total payé sur la durée du prêt (capital + tous les intérêts). C'est ce que la voiture vous coûte réellement.",
        payoffDate: "Le mois et l'année de votre paiement final si vous effectuez tous les paiements prévus.",
      },
      infoCards: {
        loanSummary: {
          title: "Résumé du Prêt",
          items: {
            downPayment: "Mise de Fonds",
            tradeInCredit: "Crédit d'Échange",
            amountFinanced: "Montant Financé",
            interestCost: "Coût des Intérêts",
          },
        },
        quickTips: {
          title: "Conseils Rapides",
          items: [
            "Visez une mise de fonds de 20% pour éviter d'être en négatif",
            "Les termes plus courts économisent de l'argent mais ont des paiements plus élevés",
            "Obtenez une pré-approbation avant de visiter le concessionnaire",
            "Comparez les TEG, pas seulement les taux d'intérêt",
          ],
        },
      },
      referenceData: {
        ratesByCredit: {
          title: "Taux Moyens par Pointage de Crédit (2026)",
          items: {
            excellent: { label: "Excellent (750+)", value: "4-6% neuf, 5-7% usagé" },
            good: { label: "Bon (700-749)", value: "6-8% neuf, 7-10% usagé" },
            fair: { label: "Passable (650-699)", value: "9-13%" },
            poor: { label: "Pauvre (<650)", value: "14-20%+" },
          },
        },
      },
      education: {
        loanTerms: {
          title: "Comprendre les Termes de Prêt",
          cards: [
            { title: "Terme Court (24-36 mo)", description: "Paiements plus élevés mais moins d'intérêts totaux. Idéal si vous pouvez vous permettre des paiements mensuels plus élevés.", icon: "⚡" },
            { title: "Terme Moyen (48-60 mo)", description: "Équilibre entre la taille du paiement et le coût total. Choix le plus populaire pour les voitures neuves.", icon: "⚖️" },
            { title: "Terme Long (72-84 mo)", description: "Paiements plus bas mais plus d'intérêts totaux. Risque d'être en négatif sur votre prêt.", icon: "⏳" },
            { title: "TEG vs Taux d'Intérêt", description: "Le TEG inclut les frais et donne le vrai coût d'emprunt. Comparez toujours les TEG, pas seulement les taux.", icon: "📊" },
          ],
        },
        considerations: {
          title: "Considérations Importantes",
          items: [
            { text: "Des termes de prêt plus longs signifient des paiements plus bas mais significativement plus d'intérêts payés au total", type: "warning" },
            { text: "Une mise de fonds de 20% aide à éviter d'être 'en négatif' (devoir plus que la valeur de la voiture)", type: "info" },
            { text: "Les prêts pour voitures neuves ont typiquement des taux plus bas (3-7%) que les prêts pour voitures usagées (5-10%)", type: "info" },
            { text: "Votre pointage de crédit impacte significativement votre taux d'intérêt—vérifiez avant de magasiner", type: "info" },
            { text: "Certaines provinces ont des taxes de vente différentes sur les véhicules—vérifiez les taux locaux", type: "info" },
            { text: "L'assurance écart peut valoir la peine d'être considérée si votre mise de fonds est moins de 20%", type: "warning" },
          ],
        },
        exampleCalculation: {
          title: "Exemple de Calcul",
          description: "Véhicule de 35 000$ avec 5 000$ de mise de fonds, 60 mois à 6,5% TEG",
          examples: [
            {
              title: "Calculer le Montant du Prêt",
              steps: ["Prix du Véhicule: 35 000$", "Mise de Fonds: -5 000$", "Taxe de Vente (6%): +2 100$", "Frais: +500$"],
              result: "Montant du Prêt: 32 600$",
            },
            {
              title: "Calculer le Paiement Mensuel",
              steps: ["Capital: 32 600$", "Taux Mensuel: 6,5% / 12 = 0,542%", "Terme: 60 mois", "PMT = P × [r(1+r)^n] / [(1+r)^n - 1]"],
              result: "Paiement Mensuel: 636,51$",
            },
          ],
        },
        whatIsAmortization: {
          title: "Qu'est-ce que l'Amortissement de Prêt?",
          content: "L'amortissement est le processus de remboursement d'un prêt par des paiements réguliers. Chaque paiement comprend deux parties: le capital (le montant original du prêt) et les intérêts (le coût d'emprunt). Dans les premiers mois de votre prêt, la plupart de votre paiement va vers les intérêts. À mesure que le prêt progresse, plus de chaque paiement va vers le remboursement du capital. C'est pourquoi faire des paiements supplémentaires tôt dans le prêt peut économiser beaucoup d'argent sur les intérêts.",
        },
        newVsUsed: {
          title: "Financement Voiture Neuve vs Usagée",
          content: "Les voitures neuves qualifient typiquement pour des taux d'intérêt plus bas (parfois 0% de taux promotionnels des manufacturiers) mais se déprécient plus rapidement—perdant 20-30% de valeur la première année. Les voitures usagées ont des taux d'intérêt plus élevés mais moins de risque de dépréciation. Un véhicule certifié pré-possédé de 2-3 ans offre souvent la meilleure valeur, combinant prix d'achat plus bas avec couverture de garantie du manufacturier. Obtenez toujours une pré-approbation de votre banque ou caisse populaire avant de visiter les concessionnaires pour avoir un pouvoir de négociation.",
        },
        avoidUpsideDown: {
          title: "Éviter d'Être en Négatif",
          content: "Être 'en négatif' ou 'sous l'eau' signifie devoir plus sur votre prêt que la valeur de votre voiture. Cela arrive quand la dépréciation dépasse votre remboursement de prêt. Pour éviter ceci: faites au moins une mise de fonds de 20%, choisissez le terme de prêt le plus court que vous pouvez vous permettre, et évitez de rouler l'équité négative d'un prêt précédent dans un nouveau. Si vous êtes déjà en négatif, considérez faire des paiements de capital supplémentaires ou garder la voiture jusqu'à ce que vous soyez à l'endroit.",
        },
        dealerVsBank: {
          title: "Financement Concessionnaire vs Banque/Caisse",
          content: "Le financement de concessionnaire est pratique mais peut ne pas offrir le meilleur taux. Les banques et caisses populaires ont souvent des taux plus bas, surtout pour les membres avec bon crédit. Obtenez une pré-approbation avant de visiter le concessionnaire—ceci vous donne un pouvoir de négociation et une option de secours. Certains manufacturiers offrent 0% ou financement à taux bas sur les voitures neuves, qui peut battre tout taux de banque. Comparez toujours le coût total du prêt, pas seulement le paiement mensuel, en évaluant les offres.",
        },
      },
      faqs: [
        { question: "Qu'est-ce qu'un bon taux d'intérêt pour un prêt auto?", answer: "En 2026, les bons taux sont: Crédit excellent (750+): 4-6% pour neuf, 5-7% pour usagé. Bon crédit (700-749): 6-8% pour neuf, 7-10% pour usagé. Crédit passable (650-699): 9-13%. Crédit pauvre (sous 650): 14-20%+. Les taux varient par prêteur, alors magasinez toujours et obtenez une pré-approbation." },
        { question: "Devrais-je choisir un terme plus long pour des paiements plus bas?", answer: "Bien que tentant, les termes plus longs (72-84 mois) coûtent significativement plus en intérêts. Un prêt de 30 000$ à 6% coûte 3 481$ en intérêts sur 48 mois mais 5 797$ sur 72 mois—66% de plus! Les termes plus longs augmentent aussi le risque d'être en négatif. Choisissez le terme le plus court que vous pouvez confortablement vous permettre." },
        { question: "Combien devrais-je mettre de mise de fonds?", answer: "Visez au moins 20% de mise de fonds pour éviter d'être en négatif immédiatement dû à la dépréciation. Pour une voiture de 35 000$, c'est 7 000$. Si vous ne pouvez pas vous permettre 20%, au moins couvrez la taxe de vente et les frais de votre poche pour ne pas financer ces coûts. Toute mise de fonds réduit votre montant de prêt et intérêts totaux." },
        { question: "Le financement à 0% est-il vraiment gratuit?", answer: "Le financement à 0% du manufacturier peut être une excellente affaire, mais vérifiez si vous abandonnez un rabais en argent. Parfois prendre le rabais et obtenir un prêt à taux bas d'une banque résulte en coût total plus bas. Aussi, les offres à 0% requièrent un crédit excellent (habituellement 720+) et sont typiquement seulement pour les voitures neuves avec termes spécifiques." },
        { question: "Quels frais sont typiquement inclus?", answer: "Les frais communs incluent: Frais de documentation (100-700$), Titre et immatriculation (varie par province), Frais de destination (voitures neuves, ~1 000-1 500$), et Ajouts de concessionnaire. La taxe de vente est habituellement 5-15% du prix d'achat. Certains frais sont négociables (frais de doc, ajouts), tandis que d'autres sont fixes (titre, immatriculation, taxe)." },
        { question: "Devrais-je rembourser mon prêt auto tôt?", answer: "Habituellement oui! Payer extra vers le capital économise les intérêts. Vérifiez pour les pénalités de prépaiement (rares mais possibles). Une stratégie: arrondir les paiements (487$ → 500$) ou faire un paiement extra par année. Cependant, si votre taux est très bas (sous 4%), investir l'argent extra pourrait donner de meilleurs retours." },
        { question: "Quelle est la différence entre TEG et taux d'intérêt?", answer: "Le taux d'intérêt est le coût d'emprunter le capital. Le TEG (Taux Effectif Global) inclut le taux d'intérêt plus les frais, vous donnant le vrai coût du prêt. Un prêt avec un taux de 5% mais 1 000$ en frais pourrait avoir un TEG de 5,5%. Comparez toujours les TEG, pas seulement les taux d'intérêt." },
      ],
      rating: {
        title: "Évaluez ce Calculateur",
        share: "Partager",
        copied: "Copié!",
        copyLink: "Copier le Lien",
        clickToRate: "Cliquez pour évaluer",
        youRated: "Vous avez évalué",
        stars: "étoiles",
        averageFrom: "moyenne de",
        ratings: "évaluations",
        shareCalculator: "Partagez ce calculateur:",
        includesValues: "inclut vos valeurs",
        creating: "Création...",
        thankYou: "Merci pour votre évaluation!",
      },
      common: {
        home: "Accueil",
        calculators: "Calculateurs",
        reviews: "avis",
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // GERMAN
    // ─────────────────────────────────────────────────────────────────────────
    de: {
      name: "Autokredit Rechner",
      slug: "autokredit-rechner",
      subtitle: "Berechnen Sie Ihre Autokredit-Rate",
      breadcrumb: "Autokredit",
      seo: {
        title: "Autokredit Rechner - Fahrzeugfinanzierung & Tilgungsplan",
        description: "Berechnen Sie Ihre monatliche Autofinanzierung, Gesamtzinsen und sehen Sie einen vollständigen Tilgungsplan. Vergleichen Sie Kreditlaufzeiten, berücksichtigen Sie Inzahlungnahme, Steuern und Gebühren. Kostenloser Autokredit Rechner.",
        shortDescription: "Berechnen Sie monatliche Autokreditzahlungen und Kreditkosten",
        keywords: ["autokredit rechner", "autofinanzierung rechner", "fahrzeugkredit rechner", "kfz finanzierung", "tilgungsplan", "autokredit kalkulator", "fahrzeugdarlehen"],
      },
      calculator: {
        yourInformation: "Fahrzeug & Kreditdetails",
      },
      ui: {
        yourInformation: "Fahrzeug & Kreditdetails",
        calculate: "Berechnen",
        reset: "Zurücksetzen",
        results: "Ergebnisse",
      },
      inputs: {
        vehiclePrice: {
          label: "Fahrzeugpreis",
          helpText: "Gesamter Kaufpreis des Fahrzeugs",
        },
        downPayment: {
          label: "Anzahlung",
          helpText: "Bargeld, das Sie im Voraus zahlen",
        },
        tradeInValue: {
          label: "Inzahlungnahmewert",
          helpText: "Wert Ihres aktuellen Fahrzeugs",
        },
        loanTerm: {
          label: "Kreditlaufzeit",
          helpText: "Dauer des Kredits in Monaten",
          options: {
            "24": "24 Monate (2 Jahre)",
            "36": "36 Monate (3 Jahre)",
            "48": "48 Monate (4 Jahre)",
            "60": "60 Monate (5 Jahre)",
            "72": "72 Monate (6 Jahre)",
            "84": "84 Monate (7 Jahre)",
          },
        },
        interestRate: {
          label: "Zinssatz (Effektivzins)",
          helpText: "Effektiver Jahreszins",
        },
        salesTax: {
          label: "Mehrwertsteuersatz",
          helpText: "Staatliche/lokale Mehrwertsteuer auf Fahrzeug",
        },
        fees: {
          label: "Zulassung, Anmeldung & Gebühren",
          helpText: "Zulassungsgebühren, Dokumentengebühren, etc.",
        },
        includeTaxInLoan: {
          label: "Steuern & Gebühren im Kredit einschließen?",
          helpText: "Wählen Sie, ob Sie Steuern und Gebühren finanzieren möchten",
          options: {
            yes: "Ja, finanzieren",
            no: "Nein, im Voraus zahlen",
          },
        },
      },
      inputGroups: {
        taxesAndFees: "Steuern & Gebühren",
      },
      results: {
        monthlyPayment: { label: "Monatliche Rate" },
        loanAmount: { label: "Kreditbetrag" },
        totalInterest: { label: "Gesamtzinsen" },
        totalCost: { label: "Gesamtkosten" },
        payoffDate: { label: "Tilgungsdatum" },
      },
      // ✨ PRESETS AUF DEUTSCH
      presets: {
        usedEconomy: {
          label: "Gebrauchter Kleinwagen",
          description: "Günstiger Gebrauchtwagen ~18K€",
        },
        newSedan: {
          label: "Neue Limousine",
          description: "Mittelklasse Neuwagen ~32K€ mit Inzahlungnahme",
        },
        newSUV: {
          label: "Neuer SUV",
          description: "Familien-SUV ~45K€ mit guter Anzahlung",
        },
        luxuryVehicle: {
          label: "Luxusfahrzeug",
          description: "Premium-Auto ~75K€ mit Inzahlungnahme",
        },
      },
      // ✨ TOOLTIPS AUF DEUTSCH
      tooltips: {
        monthlyPayment: "Ihre feste monatliche Rate inklusive Kapital und Zinsen. Enthält keine Versicherungs- oder Wartungskosten.",
        loanAmount: "Der Gesamtbetrag, den Sie leihen, nach Abzug von Anzahlung und Inzahlungnahmewert.",
        totalInterest: "Gesamtzinsen, die Sie über die Laufzeit des Kredits zahlen. Kürzere Laufzeiten oder höhere Anzahlungen reduzieren dies.",
        totalCost: "Gesamtbetrag, der über die Kreditlaufzeit gezahlt wird (Kapital + alle Zinsen). Das ist, was das Auto Sie wirklich kostet.",
        payoffDate: "Der Monat und das Jahr Ihrer letzten Zahlung, wenn Sie alle geplanten Zahlungen leisten.",
      },
      infoCards: {
        loanSummary: {
          title: "Kreditübersicht",
          items: {
            downPayment: "Anzahlung",
            tradeInCredit: "Inzahlungnahme-Gutschrift",
            amountFinanced: "Finanzierter Betrag",
            interestCost: "Zinskosten",
          },
        },
        quickTips: {
          title: "Schnelle Tipps",
          items: [
            "Streben Sie 20% Anzahlung an, um nicht ins Minus zu geraten",
            "Kürzere Laufzeiten sparen Geld, haben aber höhere Raten",
            "Holen Sie sich eine Vorabgenehmigung, bevor Sie den Händler besuchen",
            "Vergleichen Sie Effektivzinsen, nicht nur Nominalzinsen",
          ],
        },
      },
      referenceData: {
        ratesByCredit: {
          title: "Durchschnittliche Zinsen nach Kreditwürdigkeit (2026)",
          items: {
            excellent: { label: "Ausgezeichnet (750+)", value: "4-6% neu, 5-7% gebraucht" },
            good: { label: "Gut (700-749)", value: "6-8% neu, 7-10% gebraucht" },
            fair: { label: "Durchschnittlich (650-699)", value: "9-13%" },
            poor: { label: "Schlecht (<650)", value: "14-20%+" },
          },
        },
      },
      education: {
        loanTerms: {
          title: "Kreditlaufzeiten Verstehen",
          cards: [
            { title: "Kurze Laufzeit (24-36 Mo)", description: "Höhere Raten aber weniger Gesamtzinsen. Am besten, wenn Sie sich höhere monatliche Zahlungen leisten können.", icon: "⚡" },
            { title: "Mittlere Laufzeit (48-60 Mo)", description: "Balance zwischen Ratenhöhe und Gesamtkosten. Beliebteste Wahl für Neuwagen.", icon: "⚖️" },
            { title: "Lange Laufzeit (72-84 Mo)", description: "Niedrigere Raten aber mehr Gesamtzinsen. Risiko, bei Ihrem Kredit ins Minus zu geraten.", icon: "⏳" },
            { title: "Effektivzins vs Nominalzins", description: "Der Effektivzins enthält Gebühren und gibt die wahren Kreditkosten an. Vergleichen Sie immer Effektivzinsen, nicht nur Nominalzinsen.", icon: "📊" },
          ],
        },
        considerations: {
          title: "Wichtige Überlegungen",
          items: [
            { text: "Längere Kreditlaufzeiten bedeuten niedrigere Raten aber deutlich mehr Zinsen insgesamt", type: "warning" },
            { text: "Eine 20% Anzahlung hilft zu vermeiden, 'im Minus' zu sein (mehr zu schulden als das Auto wert ist)", type: "info" },
            { text: "Neuwagenkredite haben typischerweise niedrigere Zinsen (3-7%) als Gebrauchtwagenkredite (5-10%)", type: "info" },
            { text: "Ihre Kreditwürdigkeit beeinflusst Ihren Zinssatz erheblich—prüfen Sie vor dem Einkauf", type: "info" },
            { text: "Einige Regionen haben unterschiedliche Steuersätze für Fahrzeuge—prüfen Sie lokale Sätze", type: "info" },
            { text: "Eine GAP-Versicherung kann sich lohnen, wenn Ihre Anzahlung weniger als 20% beträgt", type: "warning" },
          ],
        },
        exampleCalculation: {
          title: "Beispielrechnung",
          description: "35.000€ Fahrzeug mit 5.000€ Anzahlung, 60 Monate bei 6,5% Effektivzins",
          examples: [
            {
              title: "Kreditbetrag Berechnen",
              steps: ["Fahrzeugpreis: 35.000€", "Anzahlung: -5.000€", "MwSt. (19%): +6.650€", "Gebühren: +500€"],
              result: "Kreditbetrag: 37.150€",
            },
            {
              title: "Monatliche Rate Berechnen",
              steps: ["Kapital: 37.150€", "Monatszins: 6,5% / 12 = 0,542%", "Laufzeit: 60 Monate", "PMT = P × [r(1+r)^n] / [(1+r)^n - 1]"],
              result: "Monatliche Rate: 725,34€",
            },
          ],
        },
        whatIsAmortization: {
          title: "Was ist Kredittilgung?",
          content: "Tilgung ist der Prozess der Rückzahlung eines Kredits durch regelmäßige Ratenzahlungen. Jede Zahlung besteht aus zwei Teilen: Kapital (der ursprüngliche Kreditbetrag) und Zinsen (die Kosten der Kreditaufnahme). In den ersten Monaten Ihres Kredits geht der größte Teil Ihrer Zahlung in Zinsen. Im Verlauf des Kredits geht mehr von jeder Zahlung in die Tilgung des Kapitals. Deshalb können zusätzliche Zahlungen früh im Kredit erheblich Geld bei den Zinsen sparen.",
        },
        newVsUsed: {
          title: "Neuwagen vs Gebrauchtwagen Finanzierung",
          content: "Neuwagen qualifizieren sich typischerweise für niedrigere Zinssätze (manchmal 0% Aktionszinsen von Herstellern), verlieren aber schneller an Wert—20-30% Wertverlust im ersten Jahr. Gebrauchtwagen haben höhere Zinssätze aber weniger Abschreibungsrisiko. Ein 2-3 Jahre alter zertifizierter Gebrauchtwagen bietet oft den besten Wert, kombiniert niedrigeren Kaufpreis mit Herstellergarantie. Holen Sie sich immer eine Vorabgenehmigung von Ihrer Bank oder Kreditgenossenschaft, bevor Sie Händler besuchen, um Verhandlungsmacht zu haben.",
        },
        avoidUpsideDown: {
          title: "Vermeiden Sie Negative Equity",
          content: "'Im Minus' oder 'unter Wasser' zu sein bedeutet, mehr auf Ihren Kredit zu schulden als Ihr Auto wert ist. Dies passiert, wenn die Abschreibung Ihre Kredittilgung überholt. Um dies zu vermeiden: Leisten Sie mindestens 20% Anzahlung, wählen Sie die kürzeste Laufzeit, die Sie sich leisten können, und vermeiden Sie es, negative Equity von einem vorherigen Kredit in einen neuen zu rollen. Wenn Sie bereits im Minus sind, erwägen Sie zusätzliche Kapitalzahlungen oder behalten Sie das Auto, bis Sie wieder im Plus sind.",
        },
        dealerVsBank: {
          title: "Händlerfinanzierung vs Bank/Kreditgenossenschaft",
          content: "Händlerfinanzierung ist bequem, bietet aber möglicherweise nicht den besten Zinssatz. Banken und Kreditgenossenschaften haben oft niedrigere Zinsen, besonders für Mitglieder mit guter Bonität. Holen Sie sich eine Vorabgenehmigung, bevor Sie den Händler besuchen—das gibt Ihnen Verhandlungsmacht und eine Backup-Option. Einige Hersteller bieten 0% oder niedrige Finanzierung für Neuwagen an, die jeden Bankzins schlagen kann. Vergleichen Sie immer die Gesamtkosten des Kredits, nicht nur die monatliche Rate, wenn Sie Angebote bewerten.",
        },
      },
      faqs: [
        { question: "Was ist ein guter Zinssatz für einen Autokredit?", answer: "Im Jahr 2026 sind gute Zinsen: Ausgezeichnete Bonität (750+): 4-6% für neu, 5-7% für gebraucht. Gute Bonität (700-749): 6-8% für neu, 7-10% für gebraucht. Durchschnittliche Bonität (650-699): 9-13%. Schlechte Bonität (unter 650): 14-20%+. Zinsen variieren je nach Kreditgeber, also vergleichen Sie immer und holen Sie sich eine Vorabgenehmigung." },
        { question: "Sollte ich eine längere Laufzeit für niedrigere Raten wählen?", answer: "Obwohl verlockend, kosten längere Laufzeiten (72-84 Monate) deutlich mehr Zinsen. Ein 30.000€ Kredit bei 6% kostet 3.481€ Zinsen über 48 Monate aber 5.797€ über 72 Monate—66% mehr! Längere Laufzeiten erhöhen auch das Risiko, ins Minus zu geraten. Wählen Sie die kürzeste Laufzeit, die Sie sich bequem leisten können." },
        { question: "Wie viel sollte ich als Anzahlung leisten?", answer: "Streben Sie mindestens 20% Anzahlung an, um nicht sofort aufgrund von Wertminderung ins Minus zu geraten. Für ein 35.000€ Auto sind das 7.000€. Wenn Sie sich 20% nicht leisten können, zahlen Sie zumindest die Steuern und Gebühren aus eigener Tasche, um diese Kosten nicht zu finanzieren. Jede Anzahlung reduziert Ihren Kreditbetrag und die Gesamtzinsen." },
        { question: "Ist 0% Finanzierung wirklich kostenlos?", answer: "Hersteller-0%-Finanzierung kann ein tolles Angebot sein, aber prüfen Sie, ob Sie auf einen Barrabatt verzichten. Manchmal führt die Annahme des Rabatts und ein zinsgünstiger Bankkredit zu geringeren Gesamtkosten. Außerdem erfordern 0%-Angebote ausgezeichnete Bonität (normalerweise 720+) und gelten typischerweise nur für Neuwagen mit bestimmten Bedingungen." },
        { question: "Welche Gebühren sind typischerweise enthalten?", answer: "Übliche Gebühren umfassen: Dokumentengebühr (100-700€), Zulassung und Anmeldung (variiert nach Region), Überführungskosten (Neuwagen, ~1.000-1.500€), und Händlerzubehör. MwSt. beträgt normalerweise 19% des Kaufpreises. Einige Gebühren sind verhandelbar (Dokumentengebühr, Zubehör), während andere fest sind (Zulassung, Anmeldung, Steuer)." },
        { question: "Sollte ich meinen Autokredit vorzeitig abbezahlen?", answer: "Normalerweise ja! Extra zum Kapital zu zahlen spart Zinsen. Prüfen Sie auf Vorfälligkeitsentschädigungen (selten aber möglich). Eine Strategie: Zahlungen aufrunden (487€ → 500€) oder eine zusätzliche Zahlung pro Jahr leisten. Wenn Ihr Zinssatz jedoch sehr niedrig ist (unter 4%), könnte es bessere Renditen bringen, das zusätzliche Geld zu investieren." },
        { question: "Was ist der Unterschied zwischen Effektivzins und Nominalzins?", answer: "Der Nominalzins ist die Kosten für das Ausleihen des Kapitals. Der Effektivzins enthält den Nominalzins plus Gebühren und gibt Ihnen die wahren Kreditkosten. Ein Kredit mit 5% Nominalzins aber 1.000€ Gebühren könnte einen Effektivzins von 5,5% haben. Vergleichen Sie immer Effektivzinsen, nicht nur Nominalzinsen." },
      ],
      rating: {
        title: "Bewerten Sie diesen Rechner",
        share: "Teilen",
        copied: "Kopiert!",
        copyLink: "Link Kopieren",
        clickToRate: "Klicken zum Bewerten",
        youRated: "Sie haben bewertet",
        stars: "Sterne",
        averageFrom: "Durchschnitt von",
        ratings: "Bewertungen",
        shareCalculator: "Teilen Sie diesen Rechner:",
        includesValues: "enthält Ihre Werte",
        creating: "Erstellen...",
        thankYou: "Danke für Ihre Bewertung!",
      },
      common: {
        home: "Startseite",
        calculators: "Rechner",
        reviews: "Bewertungen",
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "vehiclePrice",
      type: "currency",
      required: true,
      defaultValue: 35000,
      min: 1000,
      max: 500000,
      step: 500,
    },
    {
      id: "downPayment",
      type: "currency",
      required: false,
      defaultValue: 5000,
      min: 0,
      max: 200000,
      step: 500,
    },
    {
      id: "tradeInValue",
      type: "currency",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 200000,
      step: 500,
    },
    {
      id: "loanTerm",
      type: "select",
      required: true,
      defaultValue: "60",
      options: LOAN_TERMS,
    },
    {
      id: "interestRate",
      type: "percentage",
      required: true,
      defaultValue: 6.5,
      min: 0,
      max: 30,
      step: 0.1,
    },
    {
      id: "salesTax",
      type: "percentage",
      required: false,
      defaultValue: 6,
      min: 0,
      max: 15,
      step: 0.25,
      group: "taxesAndFees",
    },
    {
      id: "fees",
      type: "currency",
      required: false,
      defaultValue: 500,
      min: 0,
      max: 5000,
      step: 50,
      group: "taxesAndFees",
    },
    {
      id: "includeTaxInLoan",
      type: "radio",
      required: true,
      defaultValue: "yes",
      options: [
        { value: "yes" },
        { value: "no" },
      ],
      group: "taxesAndFees",
    },
  ],

  inputGroups: [
    {
      id: "taxesAndFees",
      collapsible: true,
      defaultExpanded: false,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    { id: "monthlyPayment", type: "primary", format: "currency" },
    { id: "loanAmount", type: "secondary", format: "currency" },
    { id: "totalInterest", type: "secondary", format: "currency" },
    { id: "totalCost", type: "secondary", format: "currency" },
    { id: "payoffDate", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "loanSummary",
      type: "list",
      icon: "📊",
      items: [
        { id: "downPayment", valueKey: "downPayment" },
        { id: "tradeInCredit", valueKey: "tradeInValue" },
        { id: "amountFinanced", valueKey: "loanAmount" },
        { id: "interestCost", valueKey: "totalInterest" },
      ],
    },
    {
      id: "quickTips",
      type: "horizontal",
      icon: "💡",
      itemCount: 4,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "ratesByCredit",
      icon: "📋",
      columns: 2,
      itemIds: ["excellent", "good", "fair", "poor"],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    {
      id: "loanTerms",
      type: "cards",
      icon: "📚",
      columns: 2,
      cardIds: ["shortTerm", "mediumTerm", "longTerm", "aprVsRate"],
    },
    {
      id: "considerations",
      type: "list",
      icon: "⚠️",
      itemCount: 6,
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      icon: "🧮",
      columns: 2,
      exampleCount: 2,
    },
    {
      id: "whatIsAmortization",
      type: "prose",
      icon: "📖",
    },
    {
      id: "newVsUsed",
      type: "prose",
      icon: "🚗",
    },
    {
      id: "avoidUpsideDown",
      type: "prose",
      icon: "⚠️",
    },
    {
      id: "dealerVsBank",
      type: "prose",
      icon: "🏦",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    { id: "goodRate" },
    { id: "longerTerm" },
    { id: "downPayment" },
    { id: "zeroFinancing" },
    { id: "fees" },
    { id: "payEarly" },
    { id: "aprVsRate" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    { authors: "Consumer Financial Protection Bureau", year: "2026", title: "Shopping for an Auto Loan", source: "CFPB.gov", url: "https://www.consumerfinance.gov/consumer-tools/auto-loans/" },
    { authors: "Edmunds", year: "2026", title: "Auto Loan Interest Rates", source: "Edmunds.com", url: "https://www.edmunds.com/car-loan/" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // OTHER CONFIG
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge: "Finance",
    rating: { average: 4.8, count: 32400 },
  },

  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: false,
    category: "finance",
  },

  // ✨ UPDATED FEATURES WITH NEW OPTIONS
  features: {
    autoCalculate: true,
    saveHistory: true,
    exportPDF: true,
    shareResults: true,
    compareEnabled: true,      // ✨ NEW
    sensitivityEnabled: true,  // ✨ NEW
    presetsEnabled: true,      // ✨ NEW
  },

  relatedCalculators: ["loan-calculator", "mortgage-calculator", "compound-interest-calculator"],

  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateAutoLoan(data: {
  values: Record<string, unknown>;
  units?: Record<string, string>;
  unitSystem?: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  const vehiclePrice = (values.vehiclePrice as number) || 35000;
  const downPayment = (values.downPayment as number) || 0;
  const tradeInValue = (values.tradeInValue as number) || 0;
  const loanTermMonths = parseInt((values.loanTerm as string) || "60");
  const interestRate = ((values.interestRate as number) || 6.5) / 100;
  const salesTaxRate = ((values.salesTax as number) || 0) / 100;
  const fees = (values.fees as number) || 0;
  const includeTaxInLoan = (values.includeTaxInLoan as string) === "yes";

  // Calculate taxable amount (usually vehicle price minus trade-in in most states)
  const taxableAmount = vehiclePrice - tradeInValue;
  const salesTax = taxableAmount * salesTaxRate;

  // Calculate total out-the-door price
  const totalPrice = vehiclePrice + salesTax + fees;

  // Calculate loan amount
  let loanAmount: number;
  if (includeTaxInLoan) {
    loanAmount = totalPrice - downPayment - tradeInValue;
  } else {
    loanAmount = vehiclePrice - downPayment - tradeInValue;
  }

  // Ensure loan amount is positive
  loanAmount = Math.max(0, loanAmount);

  // Calculate monthly payment using PMT formula
  const monthlyRate = interestRate / 12;
  let monthlyPayment: number;
  let totalInterest: number;

  if (monthlyRate === 0) {
    // 0% interest
    monthlyPayment = loanAmount / loanTermMonths;
    totalInterest = 0;
  } else {
    monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / 
                     (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
    totalInterest = (monthlyPayment * loanTermMonths) - loanAmount;
  }

  const totalCost = monthlyPayment * loanTermMonths;

  // Calculate payoff date
  const today = new Date();
  const payoffDate = new Date(today.setMonth(today.getMonth() + loanTermMonths));
  const payoffDateStr = payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // Helper function for currency formatting
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return {
    values: {
      monthlyPayment,
      loanAmount,
      totalInterest,
      totalCost,
      downPayment,
      tradeInValue,
      vehiclePrice,
      salesTax,
      fees,
    },
    formatted: {
      monthlyPayment: String(monthlyPayment),
      loanAmount: String(loanAmount),
      totalInterest: String(totalInterest),
      totalCost: String(totalCost),
      downPayment: String(downPayment),
      tradeInValue: String(tradeInValue),
      payoffDate: payoffDateStr,
    },
    summary: `Your monthly payment is ${formatCurrency(monthlyPayment)} for ${loanTermMonths} months. Total interest: ${formatCurrency(totalInterest)}. Loan payoff: ${payoffDateStr}.`,
    isValid: true,
  };
}

export default autoLoanCalculatorConfig;
