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

export const autoLoanCalculatorConfig: CalculatorConfigV4 = {
  id: "auto-loan",
  version: "4.0",
  category: "finance",
  icon: "🚗",

  // ─── PRESETS ───
  presets: [
    {
      id: "budgetUsed",
      icon: "🚗",
      values: {
        vehiclePrice: 15000,
        downPayment: 2000,
        includeTradein: false,
        tradeinValue: null,
        tradeinOwed: null,
        loanTerm: 4,
        interestRate: 8.5,
        salesTax: 7,
        includeTaxInLoan: true,
        fees: 300,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
      },
    },
    {
      id: "midRange",
      icon: "🚙",
      values: {
        vehiclePrice: 30000,
        downPayment: 5000,
        includeTradein: false,
        tradeinValue: null,
        tradeinOwed: null,
        loanTerm: 5,
        interestRate: 6.5,
        salesTax: 7,
        includeTaxInLoan: true,
        fees: 500,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
      },
    },
    {
      id: "luxury",
      icon: "🏎️",
      values: {
        vehiclePrice: 55000,
        downPayment: 15000,
        includeTradein: false,
        tradeinValue: null,
        tradeinOwed: null,
        loanTerm: 4,
        interestRate: 4.5,
        salesTax: 7,
        includeTaxInLoan: true,
        fees: 800,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
      },
    },
    {
      id: "truckSuv",
      icon: "🛻",
      values: {
        vehiclePrice: 45000,
        downPayment: 7000,
        includeTradein: true,
        tradeinValue: 10000,
        tradeinOwed: 3000,
        loanTerm: 6,
        interestRate: 6.9,
        salesTax: 7,
        includeTaxInLoan: true,
        fees: 600,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates) ───
  t: {
    en: {
      name: "Auto Loan Calculator",
      slug: "auto-loan",
      subtitle:
        "Calculate your monthly car payment, total interest, and see a full amortization schedule with trade-in and tax options.",
      seo: {
        title: "Auto Loan Calculator - Monthly Car Payment Estimator",
        description:
          "Estimate your monthly car payment with trade-in value, sales tax, and fees. See total interest paid, amortization schedule, and compare loan scenarios. Free online tool.",
        shortDescription: "Calculate your monthly car payment and total loan cost.",
        keywords: [
          "auto loan calculator",
          "car payment calculator",
          "car loan calculator",
          "monthly car payment",
          "auto loan interest calculator",
          "vehicle loan calculator",
          "free car payment estimator",
          "car financing calculator",
        ],
      },

      inputs: {
        vehiclePrice: {
          label: "Vehicle Price",
          helpText: "The total purchase price of the vehicle",
        },
        downPayment: {
          label: "Down Payment",
          helpText: "Cash paid upfront — 10–20% recommended to avoid being underwater",
        },
        includeTradein: {
          label: "Include Trade-In",
          helpText: "Toggle on if you're trading in a vehicle",
        },
        tradeinValue: {
          label: "Trade-In Value",
          helpText: "The market value of the vehicle you're trading in",
        },
        tradeinOwed: {
          label: "Amount Owed on Trade-In",
          helpText: "Remaining loan balance on your trade-in vehicle, if any",
        },
        loanTerm: {
          label: "Loan Term",
          helpText: "Loan duration in years — shorter terms save on interest",
        },
        interestRate: {
          label: "Interest Rate (APR)",
          helpText: "Annual percentage rate — check your pre-approval or use the credit score guide",
        },
        salesTax: {
          label: "Sales Tax Rate",
          helpText: "State/local tax rate — most states tax the price minus trade-in value",
        },
        includeTaxInLoan: {
          label: "Include Tax & Fees in Loan",
          helpText: "Toggle on to finance tax and fees instead of paying upfront",
        },
        fees: {
          label: "Title, Registration & Dealer Fees",
          helpText: "Combined title, registration, documentation, and dealer fees",
        },
        includeExtraPayment: {
          label: "Extra Monthly Payment",
          helpText: "Toggle on to see how extra payments reduce your loan term and save on interest",
        },
        extraMonthlyPayment: {
          label: "Extra Payment Amount",
          helpText: "Additional amount paid toward principal each month — even $50 extra saves hundreds",
        },
      },

      results: {
        monthlyPayment: { label: "Monthly Payment" },
        totalLoanAmount: { label: "Total Loan Amount" },
        totalInterest: { label: "Total Interest Paid" },
        totalCost: { label: "Total Cost of Vehicle" },
        payoffDate: { label: "Loan Payoff Date" },
        interestSaved: { label: "Interest Saved" },
        timeReduced: { label: "Time Saved" },
      },

      presets: {
        budgetUsed: {
          label: "Budget Used Car",
          description: "$15K used, 4 years, 8.5% APR",
        },
        midRange: {
          label: "Mid-Range New",
          description: "$30K new, 5 years, 6.5% APR",
        },
        luxury: {
          label: "Luxury New",
          description: "$55K new, 4 years, 4.5% APR",
        },
        truckSuv: {
          label: "Truck / SUV",
          description: "$45K with $10K trade-in, 6 years",
        },
      },

      values: {
        years: "years",
        year: "year",
        months: "months",
        month: "month",
        monthly: "/mo",
      },

      formats: {
        summary:
          "Your estimated monthly payment is {monthlyPayment}. Over {loanTerm}, you'll pay {totalInterest} in interest for a total cost of {totalCost}.",
      },

      infoCards: {
        metrics: {
          title: "Loan Summary",
          items: [
            { label: "Monthly Payment", valueKey: "monthlyPayment" },
            { label: "Total Loan Amount", valueKey: "totalLoanAmount" },
            { label: "Total Interest Paid", valueKey: "totalInterest" },
            { label: "Total Cost of Vehicle", valueKey: "totalCost" },
          ],
        },
        details: {
          title: "Loan Details",
          items: [
            { label: "Loan Payoff Date", valueKey: "payoffDate" },
            { label: "Down Payment %", valueKey: "downPaymentPercent" },
            { label: "Loan-to-Value Ratio", valueKey: "ltvRatio" },
            { label: "Sales Tax Amount", valueKey: "salesTaxAmount" },
            { label: "Interest Saved", valueKey: "interestSaved" },
          ],
        },
        tips: {
          title: "Smart Financing Tips",
          items: [
            "Put at least 10–20% down to avoid being upside-down on the loan and reduce total interest.",
            "Keep your loan term to 60 months or less for new cars and 36 months for used to minimize interest.",
            "Get pre-approved by your bank or credit union before visiting the dealership for better negotiating power.",
            "Even $50–$100 extra per month toward principal can save hundreds in interest and cut months off your loan.",
          ],
        },
      },

      chart: {
        title: "Payment Breakdown by Year",
        xLabel: "Year",
        yLabel: "Amount",
        series: {
          principal: "Principal",
          interest: "Interest",
        },
      },

      detailedTable: {
        amortization: {
          button: "View Amortization Schedule",
          title: "Full Amortization Schedule",
          columns: {
            month: "Month",
            payment: "Payment",
            principal: "Principal",
            interest: "Interest",
            balance: "Balance",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is an Auto Loan?",
          content:
            "An auto loan is a secured loan used to purchase a vehicle, where the car itself serves as collateral. If you fail to make payments, the lender can repossess the vehicle. Auto loans typically have fixed interest rates and fixed monthly payments over a set term, usually ranging from 24 to 84 months. The interest rate you receive depends primarily on your credit score, the loan term, whether the car is new or used, and whether you finance through a bank, credit union, or dealership. Unlike unsecured personal loans, auto loans generally offer lower interest rates because the vehicle reduces the lender's risk.",
        },
        howItWorks: {
          title: "How Auto Loan Payments Are Calculated",
          content:
            "Your monthly payment is calculated using the standard amortization formula: M = P × [r(1+r)^n] / [(1+r)^n – 1], where P is the principal (loan amount), r is the monthly interest rate (annual rate divided by 12), and n is the total number of monthly payments. The loan amount equals the vehicle price minus your down payment and trade-in value, plus any amount still owed on the trade-in, plus sales tax and fees if you choose to finance them. Each monthly payment splits between interest and principal — early payments are mostly interest, while later payments are mostly principal. This is why making extra payments early in the loan saves the most money.",
        },
        considerations: {
          title: "Key Factors That Affect Your Auto Loan",
          items: [
            {
              text: "Credit Score: The single biggest factor in your interest rate. Excellent credit (750+) can save thousands compared to fair or poor credit over the life of a loan.",
              type: "info",
            },
            {
              text: "Down Payment: Putting 10–20% down reduces your loan amount and prevents being underwater (owing more than the car is worth) from day one.",
              type: "info",
            },
            {
              text: "Loan Term: Shorter terms (36–48 months) mean higher monthly payments but dramatically lower total interest. A 72-month loan can cost 50% more in interest than a 48-month loan.",
              type: "warning",
            },
            {
              text: "New vs Used: Used car loans typically carry 1–3% higher interest rates than new car loans, but the lower purchase price often offsets this difference.",
              type: "info",
            },
            {
              text: "Trade-In Tax Benefit: In most states, sales tax is calculated on the price minus trade-in value, saving you hundreds or thousands in tax.",
              type: "info",
            },
            {
              text: "Dealer vs Direct Lending: Dealerships may mark up interest rates by 1–2%. Getting pre-approved from your bank or credit union gives you leverage to negotiate.",
              type: "warning",
            },
          ],
        },
        categories: {
          title: "Types of Auto Financing",
          items: [
            {
              text: "Direct Lending: You borrow directly from a bank, credit union, or online lender. You know your rate before visiting the dealer, giving you negotiating power.",
              type: "info",
            },
            {
              text: "Dealership Financing: The dealer arranges financing through their lender network. Convenient but may include rate markup. Always compare with pre-approval.",
              type: "info",
            },
            {
              text: "Manufacturer Financing: Special rates (0%–2.9% APR) offered by automakers through their captive finance companies. Usually requires excellent credit.",
              type: "info",
            },
            {
              text: "Lease Buyout Loan: Financing the purchase of a vehicle at the end of a lease term. Rates vary — compare with purchasing a similar used car outright.",
              type: "info",
            },
            {
              text: "Refinancing: Replacing your current auto loan with a new one at a lower rate. Makes sense if your credit has improved or rates have dropped since the original loan.",
              type: "info",
            },
            {
              text: "Buy Here Pay Here (BHPH): In-house financing at the dealership. Typically very high rates (15–25%+) and should only be considered as a last resort.",
              type: "warning",
            },
          ],
        },
        examples: {
          title: "Auto Loan Calculation Examples",
          description: "Step-by-step examples showing how monthly payments and total costs are calculated",
          examples: [
            {
              title: "New SUV — $35,000 with Trade-In",
              steps: [
                "Vehicle price: $35,000",
                "Down payment: $5,000",
                "Trade-in value: $8,000 (no amount owed)",
                "Sales tax: 7% on ($35,000 − $8,000) = 7% × $27,000 = $1,890",
                "Fees (title, registration, doc): $600",
                "Tax & fees included in loan: Yes",
                "Loan amount: $35,000 − $5,000 − $8,000 + $1,890 + $600 = $24,490",
                "Rate: 5.9% APR for 60 months",
                "Monthly rate: 5.9% ÷ 12 = 0.4917%",
                "Monthly payment: $24,490 × [0.004917 × 1.004917^60] ÷ [1.004917^60 − 1] = $473.02",
              ],
              result:
                "Monthly payment: $473.02 | Total interest: $3,891 | Total cost: $33,381",
            },
            {
              title: "Used Sedan — $18,000 Budget Buy",
              steps: [
                "Vehicle price: $18,000",
                "Down payment: $3,000",
                "No trade-in",
                "Sales tax: 6% on $18,000 = $1,080",
                "Fees: $350",
                "Tax & fees included in loan: Yes",
                "Loan amount: $18,000 − $3,000 + $1,080 + $350 = $16,430",
                "Rate: 7.9% APR for 48 months (used car, good credit)",
                "Monthly rate: 7.9% ÷ 12 = 0.6583%",
                "Monthly payment: $16,430 × [0.006583 × 1.006583^48] ÷ [1.006583^48 − 1] = $399.12",
              ],
              result:
                "Monthly payment: $399.12 | Total interest: $2,728 | Total cost: $22,158",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How much should I put down on a car?",
          answer:
            "Financial experts recommend putting down at least 20% on a new car and 10% on a used car. A larger down payment reduces your monthly payment, total interest paid, and the risk of being underwater on the loan (owing more than the car is worth). If you can't put 20% down, aim for at least 10% and avoid zero-down offers that lead to negative equity from day one.",
        },
        {
          question: "What's a good interest rate for an auto loan?",
          answer:
            "As of 2025–2026, good auto loan rates are roughly: 4–6% for new cars with excellent credit (750+), 5–7% for new cars with good credit (700–749), 7–10% for used cars with good credit, and 10–15%+ for fair or poor credit. Rates vary by lender, so always get quotes from at least 3 sources — your bank, a credit union, and the dealership — before signing.",
        },
        {
          question: "Should I choose a longer loan term for lower payments?",
          answer:
            "While longer terms (72–84 months) offer lower monthly payments, they cost significantly more in total interest. For example, a $30,000 loan at 6% costs about $3,500 in interest over 48 months but $5,800 over 72 months. Longer terms also increase the risk of being underwater. Stick to 60 months max for new cars and 36–48 months for used cars if possible.",
        },
        {
          question: "How does a trade-in reduce my sales tax?",
          answer:
            "In most US states, sales tax is calculated on the vehicle price minus the trade-in value. For example, if you buy a $40,000 car and trade in a vehicle worth $15,000, you only pay tax on $25,000 — saving $1,050 at a 7% tax rate. However, some states (California, Hawaii, Kentucky, Maryland, Michigan, Montana, Virginia, and Washington D.C.) do not offer this tax reduction.",
        },
        {
          question: "Is it better to finance through a dealer or my bank?",
          answer:
            "Getting pre-approved through your bank or credit union before visiting the dealer is almost always recommended. This gives you a baseline rate to compare against the dealer's offer and negotiating leverage. Dealers sometimes mark up the rate by 1–2% for profit. However, manufacturer financing promotions (0%–2.9% APR) through the dealer can beat bank rates — just compare the total cost carefully.",
        },
        {
          question: "What fees should I expect when buying a car?",
          answer:
            "Common fees include: title and registration ($50–$500 depending on state), documentation/dealer fees ($100–$500), sales tax (0–10%+ depending on state), and possibly advertising fees or dealer-added accessories. Always ask for an itemized breakdown of all fees before signing. Some fees are negotiable (dealer fees, accessories), while others are fixed (title, registration, tax).",
        },
        {
          question: "What does it mean to be underwater on a car loan?",
          answer:
            "Being underwater (or upside-down) means you owe more on the loan than the car is currently worth. This happens when you make a small down payment, choose a long loan term, or the car depreciates faster than you pay down the principal. New cars lose 20–30% of value in the first year. To avoid this, put at least 20% down, choose a shorter term, and avoid rolling negative equity from a previous loan into a new one.",
        },
        {
          question: "Can I pay off my auto loan early?",
          answer:
            "Most auto loans allow early payoff without penalties, but check your loan agreement for prepayment clauses. Paying extra toward principal each month — even $50–$100 — can save hundreds or thousands in interest and shorten your loan term significantly. Focus extra payments early in the loan when the interest portion of each payment is highest.",
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
      "name": "Calculadora de Préstamo Automotriz",
      "slug": "calculadora-prestamo-automotriz",
      "subtitle": "Calcula tu pago mensual del auto, interés total y ve un cronograma completo de amortización con opciones de intercambio y impuestos.",
      "seo": {
        "title": "Calculadora de Préstamo Automotriz - Estimador de Pago Mensual de Auto",
        "description": "Estima tu pago mensual del auto con valor de intercambio, impuesto de ventas y tarifas. Ve el interés total pagado, cronograma de amortización y compara escenarios de préstamo. Herramienta gratuita en línea.",
        "shortDescription": "Calcula tu pago mensual del auto y costo total del préstamo.",
        "keywords": [
          "calculadora préstamo automotriz",
          "calculadora pago auto",
          "calculadora préstamo coche",
          "pago mensual auto",
          "calculadora interés préstamo auto",
          "calculadora préstamo vehículo",
          "estimador pago auto gratuito",
          "calculadora financiamiento auto"
        ]
      },
      "inputs": {
        "vehiclePrice": {
          "label": "Precio del Vehículo",
          "helpText": "El precio total de compra del vehículo"
        },
        "downPayment": {
          "label": "Pago Inicial",
          "helpText": "Efectivo pagado por adelantado — se recomienda 10–20% para evitar estar bajo el agua"
        },
        "includeTradein": {
          "label": "Incluir Intercambio",
          "helpText": "Activa si vas a intercambiar un vehículo"
        },
        "tradeinValue": {
          "label": "Valor de Intercambio",
          "helpText": "El valor de mercado del vehículo que intercambias"
        },
        "tradeinOwed": {
          "label": "Cantidad Adeudada del Intercambio",
          "helpText": "Saldo restante del préstamo en tu vehículo de intercambio, si existe"
        },
        "loanTerm": {
          "label": "Plazo del Préstamo",
          "helpText": "Duración del préstamo en años — plazos más cortos ahorran interés"
        },
        "interestRate": {
          "label": "Tasa de Interés (TAE)",
          "helpText": "Tasa anual porcentual — verifica tu pre-aprobación o usa la guía de puntaje crediticio"
        },
        "salesTax": {
          "label": "Tasa de Impuesto de Ventas",
          "helpText": "Tasa de impuesto estatal/local — la mayoría de estados gravan el precio menos el valor de intercambio"
        },
        "includeTaxInLoan": {
          "label": "Incluir Impuesto y Tarifas en el Préstamo",
          "helpText": "Activa para financiar impuesto y tarifas en lugar de pagar por adelantado"
        },
        "fees": {
          "label": "Tarifas de Título, Registro y Concesionario",
          "helpText": "Tarifas combinadas de título, registro, documentación y concesionario"
        },
        "includeExtraPayment": {
          "label": "Pago Mensual Extra",
          "helpText": "Activa para ver cómo los pagos extra reducen tu plazo de préstamo y ahorran interés"
        },
        "extraMonthlyPayment": {
          "label": "Cantidad de Pago Extra",
          "helpText": "Cantidad adicional pagada hacia el principal cada mes — incluso $50 extra ahorra cientos"
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Pago Mensual"
        },
        "totalLoanAmount": {
          "label": "Cantidad Total del Préstamo"
        },
        "totalInterest": {
          "label": "Interés Total Pagado"
        },
        "totalCost": {
          "label": "Costo Total del Vehículo"
        },
        "payoffDate": {
          "label": "Fecha de Liquidación del Préstamo"
        },
        "interestSaved": {
          "label": "Interés Ahorrado"
        },
        "timeReduced": {
          "label": "Tiempo Ahorrado"
        }
      },
      "presets": {
        "budgetUsed": {
          "label": "Auto Usado Económico",
          "description": "$15K usado, 4 años, 8.5% TAE"
        },
        "midRange": {
          "label": "Nuevo Gama Media",
          "description": "$30K nuevo, 5 años, 6.5% TAE"
        },
        "luxury": {
          "label": "Nuevo de Lujo",
          "description": "$55K nuevo, 4 años, 4.5% TAE"
        },
        "truckSuv": {
          "label": "Camioneta / SUV",
          "description": "$45K con intercambio de $10K, 6 años"
        }
      },
      "values": {
        "years": "años",
        "year": "año",
        "months": "meses",
        "month": "mes",
        "monthly": "/mes"
      },
      "formats": {
        "summary": "Tu pago mensual estimado es {monthlyPayment}. Durante {loanTerm}, pagarás {totalInterest} en interés para un costo total de {totalCost}."
      },
      "infoCards": {
        "metrics": {
          "title": "Resumen del Préstamo",
          "items": [
            {
              "label": "Pago Mensual",
              "valueKey": "monthlyPayment"
            },
            {
              "label": "Cantidad Total del Préstamo",
              "valueKey": "totalLoanAmount"
            },
            {
              "label": "Interés Total Pagado",
              "valueKey": "totalInterest"
            },
            {
              "label": "Costo Total del Vehículo",
              "valueKey": "totalCost"
            }
          ]
        },
        "details": {
          "title": "Detalles del Préstamo",
          "items": [
            {
              "label": "Fecha de Liquidación del Préstamo",
              "valueKey": "payoffDate"
            },
            {
              "label": "% de Pago Inicial",
              "valueKey": "downPaymentPercent"
            },
            {
              "label": "Relación Préstamo-Valor",
              "valueKey": "ltvRatio"
            },
            {
              "label": "Cantidad de Impuesto de Ventas",
              "valueKey": "salesTaxAmount"
            },
            {
              "label": "Interés Ahorrado",
              "valueKey": "interestSaved"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Financiamiento Inteligente",
          "items": [
            "Pon al menos 10–20% de inicial para evitar estar bajo el agua en el préstamo y reducir el interés total.",
            "Mantén tu plazo de préstamo a 60 meses o menos para autos nuevos y 36 meses para usados para minimizar el interés.",
            "Obtén pre-aprobación de tu banco o cooperativa de crédito antes de visitar el concesionario para mayor poder de negociación.",
            "Incluso $50–$100 extra por mes hacia el principal puede ahorrar cientos en interés y reducir meses de tu préstamo."
          ]
        }
      },
      "chart": {
        "title": "Desglose de Pago por Año",
        "xLabel": "Año",
        "yLabel": "Cantidad",
        "series": {
          "principal": "Principal",
          "interest": "Interés"
        }
      },
      "detailedTable": {
        "amortization": {
          "button": "Ver Cronograma de Amortización",
          "title": "Cronograma Completo de Amortización",
          "columns": {
            "month": "Mes",
            "payment": "Pago",
            "principal": "Principal",
            "interest": "Interés",
            "balance": "Saldo"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es un Préstamo Automotriz?",
          "content": "Un préstamo automotriz es un préstamo garantizado usado para comprar un vehículo, donde el auto mismo sirve como garantía. Si no haces los pagos, el prestamista puede recuperar el vehículo. Los préstamos automotrices típicamente tienen tasas de interés fijas y pagos mensuales fijos durante un plazo establecido, usualmente de 24 a 84 meses. La tasa de interés que recibes depende principalmente de tu puntaje crediticio, el plazo del préstamo, si el auto es nuevo o usado, y si financias a través de un banco, cooperativa de crédito o concesionario. A diferencia de los préstamos personales no garantizados, los préstamos automotrices generalmente ofrecen tasas de interés más bajas porque el vehículo reduce el riesgo del prestamista."
        },
        "howItWorks": {
          "title": "Cómo se Calculan los Pagos de Préstamo Automotriz",
          "content": "Tu pago mensual se calcula usando la fórmula estándar de amortización: M = P × [r(1+r)^n] / [(1+r)^n – 1], donde P es el principal (cantidad del préstamo), r es la tasa de interés mensual (tasa anual dividida por 12), y n es el número total de pagos mensuales. La cantidad del préstamo iguala el precio del vehículo menos tu pago inicial y valor de intercambio, más cualquier cantidad aún adeudada del intercambio, más impuesto de ventas y tarifas si eliges financiarlos. Cada pago mensual se divide entre interés y principal — los primeros pagos son mayormente interés, mientras los pagos posteriores son mayormente principal. Por esto hacer pagos extra temprano en el préstamo ahorra más dinero."
        },
        "considerations": {
          "title": "Factores Clave que Afectan tu Préstamo Automotriz",
          "items": [
            {
              "text": "Puntaje Crediticio: El factor más importante en tu tasa de interés. Crédito excelente (750+) puede ahorrar miles comparado con crédito regular o pobre durante la vida del préstamo.",
              "type": "info"
            },
            {
              "text": "Pago Inicial: Poner 10–20% de inicial reduce la cantidad de tu préstamo y previene estar bajo el agua (deber más de lo que vale el auto) desde el primer día.",
              "type": "info"
            },
            {
              "text": "Plazo del Préstamo: Plazos más cortos (36–48 meses) significan pagos mensuales más altos pero dramáticamente menor interés total. Un préstamo de 72 meses puede costar 50% más en interés que uno de 48 meses.",
              "type": "warning"
            },
            {
              "text": "Nuevo vs Usado: Los préstamos de autos usados típicamente tienen tasas 1–3% más altas que préstamos de autos nuevos, pero el precio de compra menor a menudo compensa esta diferencia.",
              "type": "info"
            },
            {
              "text": "Beneficio Fiscal de Intercambio: En la mayoría de estados, el impuesto de ventas se calcula sobre el precio menos el valor de intercambio, ahorrándote cientos o miles en impuestos.",
              "type": "info"
            },
            {
              "text": "Concesionario vs Préstamo Directo: Los concesionarios pueden aumentar las tasas de interés 1–2%. Obtener pre-aprobación de tu banco o cooperativa de crédito te da poder para negociar.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Tipos de Financiamiento Automotriz",
          "items": [
            {
              "text": "Préstamo Directo: Pides prestado directamente de un banco, cooperativa de crédito o prestamista en línea. Conoces tu tasa antes de visitar el concesionario, dándote poder de negociación.",
              "type": "info"
            },
            {
              "text": "Financiamiento de Concesionario: El concesionario arregla el financiamiento a través de su red de prestamistas. Conveniente pero puede incluir aumento de tasa. Siempre compara con pre-aprobación.",
              "type": "info"
            },
            {
              "text": "Financiamiento del Fabricante: Tasas especiales (0%–2.9% TAE) ofrecidas por fabricantes de autos a través de sus compañías financieras cautivas. Usualmente requiere crédito excelente.",
              "type": "info"
            },
            {
              "text": "Préstamo de Compra de Arrendamiento: Financiar la compra de un vehículo al final de un plazo de arrendamiento. Las tasas varían — compara con comprar un auto usado similar directamente.",
              "type": "info"
            },
            {
              "text": "Refinanciamiento: Reemplazar tu préstamo automotriz actual con uno nuevo a una tasa más baja. Tiene sentido si tu crédito ha mejorado o las tasas han bajado desde el préstamo original.",
              "type": "info"
            },
            {
              "text": "Compra Aquí Paga Aquí: Financiamiento interno en el concesionario. Típicamente tasas muy altas (15–25%+) y solo debe considerarse como último recurso.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo de Préstamo Automotriz",
          "description": "Ejemplos paso a paso mostrando cómo se calculan los pagos mensuales y costos totales",
          "examples": [
            {
              "title": "SUV Nuevo — $35,000 con Intercambio",
              "steps": [
                "Precio del vehículo: $35,000",
                "Pago inicial: $5,000",
                "Valor de intercambio: $8,000 (sin cantidad adeudada)",
                "Impuesto de ventas: 7% sobre ($35,000 − $8,000) = 7% × $27,000 = $1,890",
                "Tarifas (título, registro, doc): $600",
                "Impuesto y tarifas incluidos en préstamo: Sí",
                "Cantidad del préstamo: $35,000 − $5,000 − $8,000 + $1,890 + $600 = $24,490",
                "Tasa: 5.9% TAE por 60 meses",
                "Tasa mensual: 5.9% ÷ 12 = 0.4917%",
                "Pago mensual: $24,490 × [0.004917 × 1.004917^60] ÷ [1.004917^60 − 1] = $473.02"
              ],
              "result": "Pago mensual: $473.02 | Interés total: $3,891 | Costo total: $33,381"
            },
            {
              "title": "Sedán Usado — Compra Económica $18,000",
              "steps": [
                "Precio del vehículo: $18,000",
                "Pago inicial: $3,000",
                "Sin intercambio",
                "Impuesto de ventas: 6% sobre $18,000 = $1,080",
                "Tarifas: $350",
                "Impuesto y tarifas incluidos en préstamo: Sí",
                "Cantidad del préstamo: $18,000 − $3,000 + $1,080 + $350 = $16,430",
                "Tasa: 7.9% TAE por 48 meses (auto usado, buen crédito)",
                "Tasa mensual: 7.9% ÷ 12 = 0.6583%",
                "Pago mensual: $16,430 × [0.006583 × 1.006583^48] ÷ [1.006583^48 − 1] = $399.12"
              ],
              "result": "Pago mensual: $399.12 | Interés total: $2,728 | Costo total: $22,158"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuánto debo dar de inicial en un auto?",
          "answer": "Los expertos financieros recomiendan dar al menos 20% de inicial en un auto nuevo y 10% en un auto usado. Un pago inicial mayor reduce tu pago mensual, interés total pagado y el riesgo de estar bajo el agua en el préstamo (deber más de lo que vale el auto). Si no puedes dar 20% de inicial, apunta a al menos 10% y evita ofertas de cero inicial que llevan a capital negativo desde el primer día."
        },
        {
          "question": "¿Qué es una buena tasa de interés para un préstamo automotriz?",
          "answer": "Para 2025–2026, las buenas tasas de préstamo automotriz son aproximadamente: 4–6% para autos nuevos con crédito excelente (750+), 5–7% para autos nuevos con buen crédito (700–749), 7–10% para autos usados con buen crédito, y 10–15%+ para crédito regular o pobre. Las tasas varían por prestamista, así que siempre obtén cotizaciones de al menos 3 fuentes — tu banco, una cooperativa de crédito y el concesionario — antes de firmar."
        },
        {
          "question": "¿Debo elegir un plazo de préstamo más largo para pagos menores?",
          "answer": "Aunque los plazos más largos (72–84 meses) ofrecen pagos mensuales más bajos, cuestan significativamente más en interés total. Por ejemplo, un préstamo de $30,000 al 6% cuesta alrededor de $3,500 en interés durante 48 meses pero $5,800 durante 72 meses. Los plazos más largos también aumentan el riesgo de estar bajo el agua. Mantente en 60 meses máximo para autos nuevos y 36–48 meses para autos usados si es posible."
        },
        {
          "question": "¿Cómo un intercambio reduce mi impuesto de ventas?",
          "answer": "En la mayoría de estados de EE.UU., el impuesto de ventas se calcula sobre el precio del vehículo menos el valor de intercambio. Por ejemplo, si compras un auto de $40,000 e intercambias un vehículo que vale $15,000, solo pagas impuesto sobre $25,000 — ahorrando $1,050 con una tasa de impuesto del 7%. Sin embargo, algunos estados (California, Hawái, Kentucky, Maryland, Michigan, Montana, Virginia y Washington D.C.) no ofrecen esta reducción de impuesto."
        },
        {
          "question": "¿Es mejor financiar a través de un concesionario o mi banco?",
          "answer": "Obtener pre-aprobación a través de tu banco o cooperativa de crédito antes de visitar el concesionario casi siempre se recomienda. Esto te da una tasa base para comparar contra la oferta del concesionario y poder de negociación. Los concesionarios a veces aumentan la tasa 1–2% para ganancia. Sin embargo, las promociones de financiamiento del fabricante (0%–2.9% TAE) a través del concesionario pueden superar las tasas bancarias — solo compara el costo total cuidadosamente."
        },
        {
          "question": "¿Qué tarifas debo esperar al comprar un auto?",
          "answer": "Las tarifas comunes incluyen: título y registro ($50–$500 dependiendo del estado), tarifas de documentación/concesionario ($100–$500), impuesto de ventas (0–10%+ dependiendo del estado), y posiblemente tarifas de publicidad o accesorios añadidos por el concesionario. Siempre pide un desglose detallado de todas las tarifas antes de firmar. Algunas tarifas son negociables (tarifas del concesionario, accesorios), mientras otras son fijas (título, registro, impuesto)."
        },
        {
          "question": "¿Qué significa estar bajo el agua en un préstamo de auto?",
          "answer": "Estar bajo el agua (o al revés) significa que debes más en el préstamo de lo que vale actualmente el auto. Esto pasa cuando haces un pago inicial pequeño, eliges un plazo de préstamo largo, o el auto se deprecia más rápido de lo que pagas el principal. Los autos nuevos pierden 20–30% de valor en el primer año. Para evitar esto, pon al menos 20% de inicial, elige un plazo más corto y evita transferir capital negativo de un préstamo anterior a uno nuevo."
        },
        {
          "question": "¿Puedo pagar mi préstamo automotriz anticipadamente?",
          "answer": "La mayoría de préstamos automotrices permiten pago anticipado sin penalidades, pero verifica tu contrato de préstamo por cláusulas de prepago. Pagar extra hacia el principal cada mes — incluso $50–$100 — puede ahorrar cientos o miles en interés y acortar significativamente tu plazo de préstamo. Enfoca los pagos extra temprano en el préstamo cuando la porción de interés de cada pago es más alta."
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
      "name": "Calculadora de Financiamento de Veículos",
      "slug": "calculadora-financiamento-veiculos",
      "subtitle": "Calcule sua prestação mensal do carro, juros totais e veja um cronograma completo de amortização com opções de troca e impostos.",
      "seo": {
        "title": "Calculadora de Financiamento de Veículos - Estimador de Prestação Mensal",
        "description": "Estime sua prestação mensal do carro com valor de troca, impostos de venda e taxas. Veja os juros totais pagos, cronograma de amortização e compare cenários de financiamento. Ferramenta online gratuita.",
        "shortDescription": "Calcule sua prestação mensal do carro e custo total do financiamento.",
        "keywords": [
          "calculadora financiamento veículo",
          "calculadora prestação carro",
          "calculadora financiamento carro",
          "prestação mensal carro",
          "calculadora juros financiamento",
          "calculadora empréstimo veículo",
          "estimador prestação carro grátis",
          "calculadora financiamento automóvel"
        ]
      },
      "inputs": {
        "vehiclePrice": {
          "label": "Preço do Veículo",
          "helpText": "O preço total de compra do veículo"
        },
        "downPayment": {
          "label": "Entrada",
          "helpText": "Valor pago à vista — recomendado 10–20% para evitar financiamento negativo"
        },
        "includeTradein": {
          "label": "Incluir Troca",
          "helpText": "Ative se você está dando um veículo como parte do pagamento"
        },
        "tradeinValue": {
          "label": "Valor da Troca",
          "helpText": "O valor de mercado do veículo que você está dando como troca"
        },
        "tradeinOwed": {
          "label": "Valor Devido na Troca",
          "helpText": "Saldo restante do financiamento do seu veículo de troca, se houver"
        },
        "loanTerm": {
          "label": "Prazo do Financiamento",
          "helpText": "Duração do financiamento em anos — prazos menores economizam em juros"
        },
        "interestRate": {
          "label": "Taxa de Juros (ao ano)",
          "helpText": "Taxa percentual anual — verifique sua pré-aprovação ou use o guia de score de crédito"
        },
        "salesTax": {
          "label": "Taxa de ICMS/Imposto",
          "helpText": "Taxa de imposto estadual/local — maioria dos estados cobra sobre o preço menos valor da troca"
        },
        "includeTaxInLoan": {
          "label": "Incluir Impostos e Taxas no Financiamento",
          "helpText": "Ative para financiar impostos e taxas ao invés de pagar à vista"
        },
        "fees": {
          "label": "Taxas de Documentação e Registro",
          "helpText": "Taxas combinadas de documentação, registro e concessionária"
        },
        "includeExtraPayment": {
          "label": "Pagamento Extra Mensal",
          "helpText": "Ative para ver como pagamentos extras reduzem o prazo do financiamento e economizam juros"
        },
        "extraMonthlyPayment": {
          "label": "Valor do Pagamento Extra",
          "helpText": "Valor adicional pago ao principal todo mês — mesmo R$ 100 extras economizam centenas"
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Prestação Mensal"
        },
        "totalLoanAmount": {
          "label": "Valor Total do Financiamento"
        },
        "totalInterest": {
          "label": "Total de Juros Pagos"
        },
        "totalCost": {
          "label": "Custo Total do Veículo"
        },
        "payoffDate": {
          "label": "Data de Quitação"
        },
        "interestSaved": {
          "label": "Juros Economizados"
        },
        "timeReduced": {
          "label": "Tempo Economizado"
        }
      },
      "presets": {
        "budgetUsed": {
          "label": "Usado Econômico",
          "description": "R$ 45K usado, 4 anos, 18% ao ano"
        },
        "midRange": {
          "label": "Novo Intermediário",
          "description": "R$ 90K novo, 5 anos, 15% ao ano"
        },
        "luxury": {
          "label": "Novo Premium",
          "description": "R$ 165K novo, 4 anos, 12% ao ano"
        },
        "truckSuv": {
          "label": "Picape / SUV",
          "description": "R$ 135K com troca de R$ 30K, 6 anos"
        }
      },
      "values": {
        "years": "anos",
        "year": "ano",
        "months": "meses",
        "month": "mês",
        "monthly": "/mês"
      },
      "formats": {
        "summary": "Sua prestação mensal estimada é {monthlyPayment}. Ao longo de {loanTerm}, você pagará {totalInterest} em juros para um custo total de {totalCost}."
      },
      "infoCards": {
        "metrics": {
          "title": "Resumo do Financiamento",
          "items": [
            {
              "label": "Prestação Mensal",
              "valueKey": "monthlyPayment"
            },
            {
              "label": "Valor Total do Financiamento",
              "valueKey": "totalLoanAmount"
            },
            {
              "label": "Total de Juros Pagos",
              "valueKey": "totalInterest"
            },
            {
              "label": "Custo Total do Veículo",
              "valueKey": "totalCost"
            }
          ]
        },
        "details": {
          "title": "Detalhes do Financiamento",
          "items": [
            {
              "label": "Data de Quitação",
              "valueKey": "payoffDate"
            },
            {
              "label": "% de Entrada",
              "valueKey": "downPaymentPercent"
            },
            {
              "label": "Proporção Financiamento/Valor",
              "valueKey": "ltvRatio"
            },
            {
              "label": "Valor dos Impostos",
              "valueKey": "salesTaxAmount"
            },
            {
              "label": "Juros Economizados",
              "valueKey": "interestSaved"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Financiamento Inteligente",
          "items": [
            "Dê pelo menos 10–20% de entrada para evitar financiamento negativo e reduzir juros totais.",
            "Mantenha o prazo em 60 meses ou menos para carros novos e 36 meses para usados para minimizar juros.",
            "Obtenha pré-aprovação no seu banco antes de visitar a concessionária para ter mais poder de negociação.",
            "Mesmo R$ 100–200 extras por mês no principal podem economizar milhares em juros e cortar meses do financiamento."
          ]
        }
      },
      "chart": {
        "title": "Composição do Pagamento por Ano",
        "xLabel": "Ano",
        "yLabel": "Valor",
        "series": {
          "principal": "Principal",
          "interest": "Juros"
        }
      },
      "detailedTable": {
        "amortization": {
          "button": "Ver Cronograma de Amortização",
          "title": "Cronograma Completo de Amortização",
          "columns": {
            "month": "Mês",
            "payment": "Prestação",
            "principal": "Principal",
            "interest": "Juros",
            "balance": "Saldo"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é um Financiamento de Veículo?",
          "content": "Um financiamento de veículo é um empréstimo garantido usado para comprar um veículo, onde o próprio carro serve como garantia. Se você não conseguir fazer os pagamentos, o credor pode retomar o veículo. Financiamentos de veículos normalmente têm taxas de juros fixas e pagamentos mensais fixos por um período determinado, geralmente variando de 24 a 84 meses. A taxa de juros que você recebe depende principalmente do seu score de crédito, prazo do financiamento, se o carro é novo ou usado, e se você financia através de um banco, cooperativa de crédito ou concessionária."
        },
        "howItWorks": {
          "title": "Como são Calculadas as Prestações do Financiamento",
          "content": "Sua prestação mensal é calculada usando a fórmula padrão de amortização: M = P × [r(1+r)^n] / [(1+r)^n – 1], onde P é o principal (valor do empréstimo), r é a taxa mensal de juros (taxa anual dividida por 12), e n é o número total de pagamentos mensais. O valor do empréstimo é igual ao preço do veículo menos sua entrada e valor da troca, mais qualquer valor ainda devido na troca, mais impostos e taxas se você escolher financiá-los. Cada pagamento mensal se divide entre juros e principal — pagamentos iniciais são principalmente juros, enquanto pagamentos posteriores são principalmente principal."
        },
        "considerations": {
          "title": "Fatores Principais que Afetam seu Financiamento",
          "items": [
            {
              "text": "Score de Crédito: O maior fator na sua taxa de juros. Crédito excelente (750+) pode economizar milhares comparado a crédito regular ou ruim ao longo do financiamento.",
              "type": "info"
            },
            {
              "text": "Entrada: Dar 10–20% de entrada reduz o valor do empréstimo e previne ficar devendo mais que o valor do carro desde o primeiro dia.",
              "type": "info"
            },
            {
              "text": "Prazo do Financiamento: Prazos menores (36–48 meses) significam prestações maiores mas juros totais dramaticamente menores. Um financiamento de 72 meses pode custar 50% mais em juros que um de 48 meses.",
              "type": "warning"
            },
            {
              "text": "Novo vs Usado: Financiamentos de carros usados normalmente têm taxas 3–6% maiores que carros novos, mas o preço menor frequentemente compensa essa diferença.",
              "type": "info"
            },
            {
              "text": "Benefício Fiscal da Troca: Na maioria dos estados, impostos são calculados sobre o preço menos valor da troca, economizando centenas ou milhares em impostos.",
              "type": "info"
            },
            {
              "text": "Concessionária vs Financiamento Direto: Concessionárias podem aumentar taxas de juros em 2–4%. Ter pré-aprovação do seu banco dá poder de negociação.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Tipos de Financiamento de Veículos",
          "items": [
            {
              "text": "Financiamento Direto: Você empresta diretamente de um banco, cooperativa ou credor online. Você conhece sua taxa antes de visitar a concessionária.",
              "type": "info"
            },
            {
              "text": "Financiamento da Concessionária: A concessionária arranja financiamento através da rede de credores deles. Conveniente mas pode incluir aumento de taxa.",
              "type": "info"
            },
            {
              "text": "Financiamento da Montadora: Taxas especiais oferecidas pelas montadoras através de suas financeiras. Geralmente requer crédito excelente.",
              "type": "info"
            },
            {
              "text": "Financiamento de Compra de Leasing: Financiar a compra do veículo no final de um leasing. Compare com comprar um usado similar.",
              "type": "info"
            },
            {
              "text": "Refinanciamento: Substituir seu financiamento atual por um novo com taxa menor. Faz sentido se seu crédito melhorou ou taxas caíram.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de Financiamento",
          "description": "Exemplos passo-a-passo mostrando como prestações mensais e custos totais são calculados",
          "examples": [
            {
              "title": "SUV Novo — R$ 105.000 com Troca",
              "steps": [
                "Preço do veículo: R$ 105.000",
                "Entrada: R$ 15.000",
                "Valor da troca: R$ 24.000 (sem valor devido)",
                "Impostos: 7% sobre (R$ 105.000 − R$ 24.000) = 7% × R$ 81.000 = R$ 5.670",
                "Taxas (documentação, registro): R$ 1.800",
                "Impostos e taxas inclusos no financiamento: Sim",
                "Valor do financiamento: R$ 105.000 − R$ 15.000 − R$ 24.000 + R$ 5.670 + R$ 1.800 = R$ 73.470",
                "Taxa: 15% ao ano por 60 meses",
                "Taxa mensal: 15% ÷ 12 = 1,25%",
                "Prestação mensal: R$ 1.747,23"
              ],
              "result": "Prestação mensal: R$ 1.747,23 | Juros totais: R$ 31.364 | Custo total: R$ 136.834"
            },
            {
              "title": "Sedã Usado — R$ 54.000 Econômico",
              "steps": [
                "Preço do veículo: R$ 54.000",
                "Entrada: R$ 9.000",
                "Sem troca",
                "Impostos: 6% sobre R$ 54.000 = R$ 3.240",
                "Taxas: R$ 1.050",
                "Impostos e taxas inclusos no financiamento: Sim",
                "Valor do financiamento: R$ 54.000 − R$ 9.000 + R$ 3.240 + R$ 1.050 = R$ 49.290",
                "Taxa: 18% ao ano por 48 meses (usado, bom crédito)",
                "Taxa mensal: 18% ÷ 12 = 1,5%",
                "Prestação mensal: R$ 1.445,67"
              ],
              "result": "Prestação mensal: R$ 1.445,67 | Juros totais: R$ 20.502 | Custo total: R$ 74.502"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quanto devo dar de entrada em um carro?",
          "answer": "Especialistas financeiros recomendam dar pelo menos 20% de entrada em um carro novo e 10% em um usado. Uma entrada maior reduz sua prestação mensal, juros totais pagos, e o risco de dever mais que o valor do carro. Se não puder dar 20%, tente pelo menos 10% e evite ofertas de entrada zero que levam a patrimônio negativo desde o primeiro dia."
        },
        {
          "question": "Qual é uma boa taxa de juros para financiamento de veículo?",
          "answer": "Em 2025–2026 no Brasil, boas taxas de financiamento são aproximadamente: 12–18% ao ano para carros novos com crédito excelente, 15–22% para carros novos com bom crédito, 18–25% para carros usados com bom crédito, e 25%+ para crédito regular ou ruim. Taxas variam por credor, então sempre obtenha cotações de pelo menos 3 fontes — seu banco, uma cooperativa de crédito, e a concessionária — antes de assinar."
        },
        {
          "question": "Devo escolher um prazo mais longo para prestações menores?",
          "answer": "Embora prazos mais longos (72–84 meses) ofereçam prestações mensais menores, eles custam significativamente mais em juros totais. Por exemplo, um empréstimo de R$ 90.000 a 15% custa cerca de R$ 31.500 em juros em 48 meses mas R$ 52.200 em 72 meses. Prazos longos também aumentam o risco de dever mais que o valor do carro. Mantenha 60 meses no máximo para carros novos e 36–48 meses para usados se possível."
        },
        {
          "question": "Como uma troca reduz meus impostos?",
          "answer": "Na maioria dos estados brasileiros, impostos são calculados sobre o preço do veículo menos o valor da troca. Por exemplo, se você compra um carro de R$ 120.000 e dá uma troca avaliada em R$ 45.000, você só paga imposto sobre R$ 75.000 — economizando R$ 3.150 com uma taxa de 7%. No entanto, algumas regiões podem não oferecer essa redução fiscal."
        },
        {
          "question": "É melhor financiar pela concessionária ou pelo meu banco?",
          "answer": "Obter pré-aprovação através do seu banco ou cooperativa antes de visitar a concessionária é quase sempre recomendado. Isso te dá uma taxa base para comparar com a oferta da concessionária e poder de negociação. Concessionárias às vezes aumentam a taxa em 2–4% para lucro. No entanto, promoções de financiamento da montadora podem vencer taxas bancárias — apenas compare o custo total cuidadosamente."
        },
        {
          "question": "Que taxas devo esperar ao comprar um carro?",
          "answer": "Taxas comuns incluem: documentação e registro (R$ 500–R$ 2.000 dependendo do estado), taxas da concessionária (R$ 300–R$ 1.500), impostos (varia por estado), e possivelmente taxas de publicidade ou acessórios adicionados pela concessionária. Sempre peça uma discriminação detalhada de todas as taxas antes de assinar. Algumas taxas são negociáveis (taxas da concessionária, acessórios), enquanto outras são fixas (documentação, registro, impostos)."
        },
        {
          "question": "O que significa dever mais que o valor do carro?",
          "answer": "Dever mais que o valor do carro significa que você deve mais no financiamento do que o carro vale atualmente. Isso acontece quando você dá pouca entrada, escolhe um prazo longo, ou o carro desvaloriza mais rápido que você paga o principal. Carros novos perdem 20–30% do valor no primeiro ano. Para evitar isso, dê pelo menos 20% de entrada, escolha um prazo menor, e evite incluir patrimônio negativo de um empréstimo anterior em um novo."
        },
        {
          "question": "Posso quitar meu financiamento antecipadamente?",
          "answer": "A maioria dos financiamentos de veículos permite quitação antecipada sem multas, mas verifique seu contrato por cláusulas de pagamento antecipado. Pagar extra ao principal todo mês — mesmo R$ 150–300 — pode economizar milhares em juros e encurtar significativamente o prazo do financiamento. Concentre pagamentos extras no início do empréstimo quando a porção de juros de cada pagamento é maior."
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
      "name": "Calculateur de Prêt Auto",
      "slug": "calculateur-pret-automobile",
      "subtitle": "Calculez votre paiement mensuel de voiture, les intérêts totaux, et consultez un échéancier d'amortissement complet avec options de reprise et taxes.",
      "seo": {
        "title": "Calculateur de Prêt Auto - Estimateur de Paiement Mensuel de Voiture",
        "description": "Estimez votre paiement mensuel de voiture avec valeur de reprise, taxe de vente et frais. Voyez les intérêts totaux payés, l'échéancier d'amortissement et comparez les scenarii de prêt. Outil en ligne gratuit.",
        "shortDescription": "Calculez votre paiement mensuel de voiture et le coût total du prêt.",
        "keywords": [
          "calculateur prêt auto",
          "calculateur paiement voiture",
          "calculateur prêt voiture",
          "paiement mensuel voiture",
          "calculateur intérêts prêt auto",
          "calculateur prêt véhicule",
          "estimateur paiement voiture gratuit",
          "calculateur financement auto"
        ]
      },
      "inputs": {
        "vehiclePrice": {
          "label": "Prix du Véhicule",
          "helpText": "Le prix d'achat total du véhicule"
        },
        "downPayment": {
          "label": "Mise de Fonds",
          "helpText": "Argent payé d'avance — 10-20% recommandé pour éviter d'être sous l'eau"
        },
        "includeTradein": {
          "label": "Inclure une Reprise",
          "helpText": "Activez si vous reprenez un véhicule"
        },
        "tradeinValue": {
          "label": "Valeur de Reprise",
          "helpText": "La valeur marchande du véhicule que vous reprenez"
        },
        "tradeinOwed": {
          "label": "Montant Dû sur la Reprise",
          "helpText": "Solde de prêt restant sur votre véhicule de reprise, le cas échéant"
        },
        "loanTerm": {
          "label": "Durée du Prêt",
          "helpText": "Durée du prêt en années — les termes plus courts économisent sur les intérêts"
        },
        "interestRate": {
          "label": "Taux d'Intérêt (TAP)",
          "helpText": "Taux annuel en pourcentage — vérifiez votre pré-approbation ou utilisez le guide de cote de crédit"
        },
        "salesTax": {
          "label": "Taux de Taxe de Vente",
          "helpText": "Taux de taxe provinciale/locale — la plupart des provinces taxent le prix moins la valeur de reprise"
        },
        "includeTaxInLoan": {
          "label": "Inclure Taxes et Frais dans le Prêt",
          "helpText": "Activez pour financer taxes et frais au lieu de payer d'avance"
        },
        "fees": {
          "label": "Frais de Titre, Immatriculation et Concessionnaire",
          "helpText": "Frais combinés de titre, immatriculation, documentation et concessionnaire"
        },
        "includeExtraPayment": {
          "label": "Paiement Mensuel Supplémentaire",
          "helpText": "Activez pour voir comment les paiements supplémentaires réduisent votre terme de prêt et économisent sur les intérêts"
        },
        "extraMonthlyPayment": {
          "label": "Montant de Paiement Supplémentaire",
          "helpText": "Montant additionnel payé vers le capital chaque mois — même 50$ supplémentaires économisent des centaines"
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Paiement Mensuel"
        },
        "totalLoanAmount": {
          "label": "Montant Total du Prêt"
        },
        "totalInterest": {
          "label": "Intérêts Totaux Payés"
        },
        "totalCost": {
          "label": "Coût Total du Véhicule"
        },
        "payoffDate": {
          "label": "Date de Remboursement du Prêt"
        },
        "interestSaved": {
          "label": "Intérêts Économisés"
        },
        "timeReduced": {
          "label": "Temps Économisé"
        }
      },
      "presets": {
        "budgetUsed": {
          "label": "Voiture d'Occasion Budget",
          "description": "15K$ d'occasion, 4 ans, 8,5% TAP"
        },
        "midRange": {
          "label": "Nouvelle Gamme Moyenne",
          "description": "30K$ neuve, 5 ans, 6,5% TAP"
        },
        "luxury": {
          "label": "Nouvelle Luxe",
          "description": "55K$ neuve, 4 ans, 4,5% TAP"
        },
        "truckSuv": {
          "label": "Camion / VUS",
          "description": "45K$ avec reprise de 10K$, 6 ans"
        }
      },
      "values": {
        "years": "années",
        "year": "année",
        "months": "mois",
        "month": "mois",
        "monthly": "/mois"
      },
      "formats": {
        "summary": "Votre paiement mensuel estimé est de {monthlyPayment}. Sur {loanTerm}, vous paierez {totalInterest} en intérêts pour un coût total de {totalCost}."
      },
      "infoCards": {
        "metrics": {
          "title": "Résumé du Prêt",
          "items": [
            {
              "label": "Paiement Mensuel",
              "valueKey": "monthlyPayment"
            },
            {
              "label": "Montant Total du Prêt",
              "valueKey": "totalLoanAmount"
            },
            {
              "label": "Intérêts Totaux Payés",
              "valueKey": "totalInterest"
            },
            {
              "label": "Coût Total du Véhicule",
              "valueKey": "totalCost"
            }
          ]
        },
        "details": {
          "title": "Détails du Prêt",
          "items": [
            {
              "label": "Date de Remboursement du Prêt",
              "valueKey": "payoffDate"
            },
            {
              "label": "% de Mise de Fonds",
              "valueKey": "downPaymentPercent"
            },
            {
              "label": "Ratio Prêt-Valeur",
              "valueKey": "ltvRatio"
            },
            {
              "label": "Montant de Taxe de Vente",
              "valueKey": "salesTaxAmount"
            },
            {
              "label": "Intérêts Économisés",
              "valueKey": "interestSaved"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Financement Intelligents",
          "items": [
            "Versez au moins 10-20% de mise de fonds pour éviter d'être à l'envers sur le prêt et réduire les intérêts totaux.",
            "Limitez votre terme de prêt à 60 mois ou moins pour les voitures neuves et 36 mois pour les d'occasion pour minimiser les intérêts.",
            "Obtenez une pré-approbation de votre banque ou caisse populaire avant de visiter le concessionnaire pour un meilleur pouvoir de négociation.",
            "Même 50-100$ supplémentaires par mois vers le capital peut économiser des centaines en intérêts et couper des mois de votre prêt."
          ]
        }
      },
      "chart": {
        "title": "Répartition des Paiements par Année",
        "xLabel": "Année",
        "yLabel": "Montant",
        "series": {
          "principal": "Capital",
          "interest": "Intérêts"
        }
      },
      "detailedTable": {
        "amortization": {
          "button": "Voir l'Échéancier d'Amortissement",
          "title": "Échéancier d'Amortissement Complet",
          "columns": {
            "month": "Mois",
            "payment": "Paiement",
            "principal": "Capital",
            "interest": "Intérêts",
            "balance": "Solde"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Prêt Auto?",
          "content": "Un prêt auto est un prêt garanti utilisé pour acheter un véhicule, où la voiture elle-même sert de garantie. Si vous ne faites pas les paiements, le prêteur peut reprendre possession du véhicule. Les prêts auto ont généralement des taux d'intérêt fixes et des paiements mensuels fixes sur un terme défini, habituellement de 24 à 84 mois. Le taux d'intérêt que vous recevez dépend principalement de votre cote de crédit, du terme du prêt, si la voiture est neuve ou d'occasion, et si vous financez par une banque, caisse populaire ou concessionnaire. Contrairement aux prêts personnels non garantis, les prêts auto offrent généralement des taux d'intérêt plus bas car le véhicule réduit le risque du prêteur."
        },
        "howItWorks": {
          "title": "Comment les Paiements de Prêt Auto sont Calculés",
          "content": "Votre paiement mensuel est calculé en utilisant la formule d'amortissement standard : M = P × [r(1+r)^n] / [(1+r)^n – 1], où P est le capital (montant du prêt), r est le taux d'intérêt mensuel (taux annuel divisé par 12), et n est le nombre total de paiements mensuels. Le montant du prêt égale le prix du véhicule moins votre mise de fonds et valeur de reprise, plus tout montant encore dû sur la reprise, plus taxe de vente et frais si vous choisissez de les financer. Chaque paiement mensuel se divise entre intérêts et capital — les premiers paiements sont surtout des intérêts, tandis que les derniers paiements sont surtout du capital. C'est pourquoi faire des paiements supplémentaires tôt dans le prêt économise le plus d'argent."
        },
        "considerations": {
          "title": "Facteurs Clés qui Affectent votre Prêt Auto",
          "items": [
            {
              "text": "Cote de Crédit : Le facteur le plus important dans votre taux d'intérêt. Un excellent crédit (750+) peut économiser des milliers comparé à un crédit moyen ou faible sur la vie d'un prêt.",
              "type": "info"
            },
            {
              "text": "Mise de Fonds : Verser 10-20% de mise de fonds réduit votre montant de prêt et empêche d'être sous l'eau (devoir plus que la valeur de la voiture) dès le premier jour.",
              "type": "info"
            },
            {
              "text": "Terme du Prêt : Les termes plus courts (36-48 mois) signifient des paiements mensuels plus élevés mais dramatiquement moins d'intérêts totaux. Un prêt de 72 mois peut coûter 50% de plus en intérêts qu'un prêt de 48 mois.",
              "type": "warning"
            },
            {
              "text": "Neuf vs Occasion : Les prêts de voitures d'occasion portent généralement des taux d'intérêt 1-3% plus élevés que les prêts de voitures neuves, mais le prix d'achat plus bas compense souvent cette différence.",
              "type": "info"
            },
            {
              "text": "Avantage Fiscal de Reprise : Dans la plupart des provinces, la taxe de vente est calculée sur le prix moins la valeur de reprise, vous économisant des centaines ou milliers en taxes.",
              "type": "info"
            },
            {
              "text": "Concessionnaire vs Prêt Direct : Les concessionnaires peuvent majorer les taux d'intérêt de 1-2%. Obtenir une pré-approbation de votre banque ou caisse populaire vous donne un levier pour négocier.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Types de Financement Auto",
          "items": [
            {
              "text": "Prêt Direct : Vous empruntez directement d'une banque, caisse populaire ou prêteur en ligne. Vous connaissez votre taux avant de visiter le concessionnaire, vous donnant un pouvoir de négociation.",
              "type": "info"
            },
            {
              "text": "Financement Concessionnaire : Le concessionnaire arrange le financement par son réseau de prêteurs. Pratique mais peut inclure une majoration de taux. Comparez toujours avec une pré-approbation.",
              "type": "info"
            },
            {
              "text": "Financement Fabricant : Taux spéciaux (0%-2,9% TAP) offerts par les constructeurs automobiles par leurs compagnies de financement captives. Nécessite habituellement un excellent crédit.",
              "type": "info"
            },
            {
              "text": "Prêt de Rachat de Location : Financer l'achat d'un véhicule à la fin d'un terme de location. Les taux varient — comparez avec l'achat d'une voiture d'occasion similaire directement.",
              "type": "info"
            },
            {
              "text": "Refinancement : Remplacer votre prêt auto actuel par un nouveau à un taux plus bas. Logique si votre crédit s'est amélioré ou les taux ont baissé depuis le prêt original.",
              "type": "info"
            },
            {
              "text": "Achetez Ici Payez Ici (AIPI) : Financement interne au concessionnaire. Typiquement des taux très élevés (15-25%+) et devrait seulement être considéré en dernier recours.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul de Prêt Auto",
          "description": "Exemples étape par étape montrant comment les paiements mensuels et coûts totaux sont calculés",
          "examples": [
            {
              "title": "VUS Neuf — 35 000$ avec Reprise",
              "steps": [
                "Prix du véhicule : 35 000$",
                "Mise de fonds : 5 000$",
                "Valeur de reprise : 8 000$ (aucun montant dû)",
                "Taxe de vente : 7% sur (35 000$ − 8 000$) = 7% × 27 000$ = 1 890$",
                "Frais (titre, immatriculation, doc) : 600$",
                "Taxes et frais inclus dans le prêt : Oui",
                "Montant du prêt : 35 000$ − 5 000$ − 8 000$ + 1 890$ + 600$ = 24 490$",
                "Taux : 5,9% TAP pour 60 mois",
                "Taux mensuel : 5,9% ÷ 12 = 0,4917%",
                "Paiement mensuel : 24 490$ × [0,004917 × 1,004917^60] ÷ [1,004917^60 − 1] = 473,02$"
              ],
              "result": "Paiement mensuel : 473,02$ | Intérêts totaux : 3 891$ | Coût total : 33 381$"
            },
            {
              "title": "Berline d'Occasion — 18 000$ Achat Budget",
              "steps": [
                "Prix du véhicule : 18 000$",
                "Mise de fonds : 3 000$",
                "Aucune reprise",
                "Taxe de vente : 6% sur 18 000$ = 1 080$",
                "Frais : 350$",
                "Taxes et frais inclus dans le prêt : Oui",
                "Montant du prêt : 18 000$ − 3 000$ + 1 080$ + 350$ = 16 430$",
                "Taux : 7,9% TAP pour 48 mois (voiture d'occasion, bon crédit)",
                "Taux mensuel : 7,9% ÷ 12 = 0,6583%",
                "Paiement mensuel : 16 430$ × [0,006583 × 1,006583^48] ÷ [1,006583^48 − 1] = 399,12$"
              ],
              "result": "Paiement mensuel : 399,12$ | Intérêts totaux : 2 728$ | Coût total : 22 158$"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien devrais-je verser de mise de fonds sur une voiture?",
          "answer": "Les experts financiers recommandent de verser au moins 20% sur une voiture neuve et 10% sur une voiture d'occasion. Une mise de fonds plus importante réduit votre paiement mensuel, les intérêts totaux payés, et le risque d'être sous l'eau sur le prêt (devoir plus que la valeur de la voiture). Si vous ne pouvez pas verser 20%, visez au moins 10% et évitez les offres sans mise de fonds qui mènent à un équité négative dès le premier jour."
        },
        {
          "question": "Quel est un bon taux d'intérêt pour un prêt auto?",
          "answer": "En 2025-2026, les bons taux de prêt auto sont environ : 4-6% pour les voitures neuves avec excellent crédit (750+), 5-7% pour les voitures neuves avec bon crédit (700-749), 7-10% pour les voitures d'occasion avec bon crédit, et 10-15%+ pour un crédit moyen ou faible. Les taux varient par prêteur, alors obtenez toujours des citations d'au moins 3 sources — votre banque, une caisse populaire, et le concessionnaire — avant de signer."
        },
        {
          "question": "Devrais-je choisir un terme de prêt plus long pour des paiements plus bas?",
          "answer": "Bien que les termes plus longs (72-84 mois) offrent des paiements mensuels plus bas, ils coûtent significativement plus en intérêts totaux. Par exemple, un prêt de 30 000$ à 6% coûte environ 3 500$ en intérêts sur 48 mois mais 5 800$ sur 72 mois. Les termes plus longs augmentent aussi le risque d'être sous l'eau. Tenez-vous à 60 mois maximum pour les voitures neuves et 36-48 mois pour les voitures d'occasion si possible."
        },
        {
          "question": "Comment une reprise réduit-elle ma taxe de vente?",
          "answer": "Dans la plupart des provinces canadiennes, la taxe de vente est calculée sur le prix du véhicule moins la valeur de reprise. Par exemple, si vous achetez une voiture de 40 000$ et reprenez un véhicule valant 15 000$, vous payez seulement la taxe sur 25 000$ — économisant 1 050$ à un taux de taxe de 7%. Cependant, certaines provinces peuvent ne pas offrir cette réduction de taxe."
        },
        {
          "question": "Est-il mieux de financer par un concessionnaire ou ma banque?",
          "answer": "Obtenir une pré-approbation par votre banque ou caisse populaire avant de visiter le concessionnaire est presque toujours recommandé. Cela vous donne un taux de base pour comparer avec l'offre du concessionnaire et un levier de négociation. Les concessionnaires majorent parfois le taux de 1-2% pour profit. Cependant, les promotions de financement fabricant (0%-2,9% TAP) par le concessionnaire peuvent battre les taux bancaires — comparez juste le coût total soigneusement."
        },
        {
          "question": "Quels frais devrais-je m'attendre lors de l'achat d'une voiture?",
          "answer": "Les frais communs incluent : titre et immatriculation (50$-500$ selon la province), frais de documentation/concessionnaire (100$-500$), taxe de vente (0-15%+ selon la province), et possiblement des frais de publicité ou accessoires ajoutés par le concessionnaire. Demandez toujours une ventilation détaillée de tous les frais avant de signer. Certains frais sont négociables (frais de concessionnaire, accessoires), tandis que d'autres sont fixes (titre, immatriculation, taxe)."
        },
        {
          "question": "Que signifie être sous l'eau sur un prêt auto?",
          "answer": "Être sous l'eau (ou à l'envers) signifie que vous devez plus sur le prêt que la valeur actuelle de la voiture. Cela arrive quand vous faites une petite mise de fonds, choisissez un terme de prêt long, ou la voiture se déprécie plus vite que vous remboursez le capital. Les voitures neuves perdent 20-30% de leur valeur la première année. Pour éviter cela, versez au moins 20% de mise de fonds, choisissez un terme plus court, et évitez de rouler l'équité négative d'un prêt précédent dans un nouveau."
        },
        {
          "question": "Puis-je rembourser mon prêt auto tôt?",
          "answer": "La plupart des prêts auto permettent le remboursement anticipé sans pénalités, mais vérifiez votre accord de prêt pour les clauses de prépaiement. Payer supplémentaire vers le capital chaque mois — même 50$-100$ — peut économiser des centaines ou milliers en intérêts et raccourcir significativement votre terme de prêt. Concentrez les paiements supplémentaires tôt dans le prêt quand la portion d'intérêts de chaque paiement est la plus élevée."
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
      "name": "Autokredit Rechner",
      "slug": "autokredit-rechner",
      "subtitle": "Berechnen Sie Ihre monatliche Autofinanzierung, Gesamtzinsen und sehen Sie einen vollständigen Tilgungsplan mit Inzahlungnahme und Steueroptionen.",
      "seo": {
        "title": "Autokredit Rechner - Monatliche Autofinanzierung Schätzer",
        "description": "Schätzen Sie Ihre monatliche Autofinanzierung mit Inzahlungnahme, Mehrwertsteuer und Gebühren. Sehen Sie Gesamtzinsen, Tilgungsplan und vergleichen Sie Kreditszenarien. Kostenloses Online-Tool.",
        "shortDescription": "Berechnen Sie Ihre monatliche Autofinanzierung und Gesamtkreditkosten.",
        "keywords": [
          "autokredit rechner",
          "autofinanzierung rechner",
          "fahrzeugkredit rechner",
          "monatliche autofinanzierung",
          "autokredit zinsen rechner",
          "kfz kredit rechner",
          "kostenloser autofinanzierung schätzer",
          "fahrzeugfinanzierung rechner"
        ]
      },
      "inputs": {
        "vehiclePrice": {
          "label": "Fahrzeugpreis",
          "helpText": "Der Gesamtkaufpreis des Fahrzeugs"
        },
        "downPayment": {
          "label": "Anzahlung",
          "helpText": "Sofort gezahltes Bargeld — 10–20% empfohlen, um Überschuldung zu vermeiden"
        },
        "includeTradein": {
          "label": "Inzahlungnahme einbeziehen",
          "helpText": "Aktivieren, wenn Sie ein Fahrzeug in Zahlung geben"
        },
        "tradeinValue": {
          "label": "Inzahlungnahme-Wert",
          "helpText": "Der Marktwert des Fahrzeugs, das Sie in Zahlung geben"
        },
        "tradeinOwed": {
          "label": "Restschuld der Inzahlungnahme",
          "helpText": "Verbleibende Kreditsumme für Ihr Inzahlungnahme-Fahrzeug, falls vorhanden"
        },
        "loanTerm": {
          "label": "Kreditlaufzeit",
          "helpText": "Kreditdauer in Jahren — kürzere Laufzeiten sparen Zinsen"
        },
        "interestRate": {
          "label": "Zinssatz (effektiver Jahreszins)",
          "helpText": "Effektiver Jahreszinssatz — prüfen Sie Ihre Vorabgenehmigung oder nutzen Sie den Bonitätsleitfaden"
        },
        "salesTax": {
          "label": "Mehrwertsteuersatz",
          "helpText": "Bundes-/lokaler Steuersatz — die meisten Staaten besteuern den Preis minus Inzahlungnahme-Wert"
        },
        "includeTaxInLoan": {
          "label": "Steuer & Gebühren in Kredit einbeziehen",
          "helpText": "Aktivieren, um Steuern und Gebühren zu finanzieren statt sofort zu zahlen"
        },
        "fees": {
          "label": "Zulassungs- & Händlergebühren",
          "helpText": "Kombinierte Zulassungs-, Dokumentations- und Händlergebühren"
        },
        "includeExtraPayment": {
          "label": "Zusätzliche monatliche Zahlung",
          "helpText": "Aktivieren, um zu sehen, wie Sondertilgungen Ihre Kreditlaufzeit reduzieren und Zinsen sparen"
        },
        "extraMonthlyPayment": {
          "label": "Sondertilgungsbetrag",
          "helpText": "Zusätzlicher monatlicher Betrag für die Tilgung — schon 50€ extra sparen Hunderte"
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Monatliche Rate"
        },
        "totalLoanAmount": {
          "label": "Gesamtkreditsumme"
        },
        "totalInterest": {
          "label": "Gesamtzinsen"
        },
        "totalCost": {
          "label": "Gesamtkosten des Fahrzeugs"
        },
        "payoffDate": {
          "label": "Kredittilgungsdatum"
        },
        "interestSaved": {
          "label": "Gesparte Zinsen"
        },
        "timeReduced": {
          "label": "Gesparte Zeit"
        }
      },
      "presets": {
        "budgetUsed": {
          "label": "Budget Gebrauchtwagen",
          "description": "15.000€ gebraucht, 4 Jahre, 8,5% eff. Jahreszins"
        },
        "midRange": {
          "label": "Mittelklasse Neuwagen",
          "description": "30.000€ neu, 5 Jahre, 6,5% eff. Jahreszins"
        },
        "luxury": {
          "label": "Luxus Neuwagen",
          "description": "55.000€ neu, 4 Jahre, 4,5% eff. Jahreszins"
        },
        "truckSuv": {
          "label": "LKW / SUV",
          "description": "45.000€ mit 10.000€ Inzahlungnahme, 6 Jahre"
        }
      },
      "values": {
        "years": "Jahre",
        "year": "Jahr",
        "months": "Monate",
        "month": "Monat",
        "monthly": "/Monat"
      },
      "formats": {
        "summary": "Ihre geschätzte monatliche Rate beträgt {monthlyPayment}. Über {loanTerm} zahlen Sie {totalInterest} an Zinsen für Gesamtkosten von {totalCost}."
      },
      "infoCards": {
        "metrics": {
          "title": "Kreditübersicht",
          "items": [
            {
              "label": "Monatliche Rate",
              "valueKey": "monthlyPayment"
            },
            {
              "label": "Gesamtkreditsumme",
              "valueKey": "totalLoanAmount"
            },
            {
              "label": "Gesamtzinsen",
              "valueKey": "totalInterest"
            },
            {
              "label": "Gesamtkosten des Fahrzeugs",
              "valueKey": "totalCost"
            }
          ]
        },
        "details": {
          "title": "Kreditdetails",
          "items": [
            {
              "label": "Kredittilgungsdatum",
              "valueKey": "payoffDate"
            },
            {
              "label": "Anzahlungsanteil %",
              "valueKey": "downPaymentPercent"
            },
            {
              "label": "Beleihungsgrad",
              "valueKey": "ltvRatio"
            },
            {
              "label": "Mehrwertsteuerbetrag",
              "valueKey": "salesTaxAmount"
            },
            {
              "label": "Gesparte Zinsen",
              "valueKey": "interestSaved"
            }
          ]
        },
        "tips": {
          "title": "Intelligente Finanzierungstipps",
          "items": [
            "Zahlen Sie mindestens 10–20% an, um Überschuldung zu vermeiden und Gesamtzinsen zu reduzieren.",
            "Begrenzen Sie Ihre Kreditlaufzeit auf 60 Monate oder weniger bei Neuwagen und 36 Monate bei Gebrauchtwagen, um Zinsen zu minimieren.",
            "Lassen Sie sich von Ihrer Bank oder Kreditgenossenschaft vorab genehmigen, bevor Sie zum Händler gehen, für bessere Verhandlungsmacht.",
            "Schon 50–100€ extra monatlich für die Tilgung können Hunderte an Zinsen sparen und Monate von Ihrem Kredit abschneiden."
          ]
        }
      },
      "chart": {
        "title": "Ratenaufschlüsselung nach Jahr",
        "xLabel": "Jahr",
        "yLabel": "Betrag",
        "series": {
          "principal": "Tilgung",
          "interest": "Zinsen"
        }
      },
      "detailedTable": {
        "amortization": {
          "button": "Tilgungsplan anzeigen",
          "title": "Vollständiger Tilgungsplan",
          "columns": {
            "month": "Monat",
            "payment": "Rate",
            "principal": "Tilgung",
            "interest": "Zinsen",
            "balance": "Restschuld"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Autokredit?",
          "content": "Ein Autokredit ist ein besicherter Kredit zum Kauf eines Fahrzeugs, bei dem das Auto selbst als Sicherheit dient. Bei Zahlungsausfall kann der Kreditgeber das Fahrzeug zurücknehmen. Autokredite haben typischerweise feste Zinssätze und feste monatliche Raten über eine bestimmte Laufzeit, meist 24 bis 84 Monate. Der Zinssatz hängt hauptsächlich von Ihrer Bonität, der Kreditlaufzeit, ob das Auto neu oder gebraucht ist und ob Sie über eine Bank, Kreditgenossenschaft oder den Händler finanzieren ab. Anders als unbesicherte Privatkredite bieten Autokredite generell niedrigere Zinssätze, da das Fahrzeug das Risiko des Kreditgebers reduziert."
        },
        "howItWorks": {
          "title": "Wie Autokreditraten berechnet werden",
          "content": "Ihre monatliche Rate wird mit der Standard-Tilgungsformel berechnet: M = P × [r(1+r)^n] / [(1+r)^n – 1], wobei P die Kreditsumme, r der monatliche Zinssatz (Jahreszins geteilt durch 12) und n die Gesamtzahl der monatlichen Raten ist. Die Kreditsumme entspricht dem Fahrzeugpreis minus Ihrer Anzahlung und dem Inzahlungnahme-Wert, plus eventueller Restschuld der Inzahlungnahme, plus Mehrwertsteuer und Gebühren, falls Sie diese finanzieren. Jede monatliche Rate teilt sich in Zinsen und Tilgung auf — frühe Raten sind hauptsächlich Zinsen, spätere Raten hauptsächlich Tilgung. Deshalb sparen Sondertilgungen früh im Kredit das meiste Geld."
        },
        "considerations": {
          "title": "Wichtige Faktoren, die Ihren Autokredit beeinflussen",
          "items": [
            {
              "text": "Bonität: Der wichtigste Faktor für Ihren Zinssatz. Exzellente Bonität (750+) kann Tausende im Vergleich zu mittlerer oder schlechter Bonität über die Kreditlaufzeit sparen.",
              "type": "info"
            },
            {
              "text": "Anzahlung: 10–20% Anzahlung reduziert Ihre Kreditsumme und verhindert Überschuldung (mehr schulden als das Auto wert ist) vom ersten Tag an.",
              "type": "info"
            },
            {
              "text": "Kreditlaufzeit: Kürzere Laufzeiten (36–48 Monate) bedeuten höhere monatliche Raten, aber dramatisch niedrigere Gesamtzinsen. Ein 72-Monats-Kredit kann 50% mehr Zinsen kosten als ein 48-Monats-Kredit.",
              "type": "warning"
            },
            {
              "text": "Neu vs. Gebraucht: Gebrauchtwagenkredite haben typischerweise 1–3% höhere Zinssätze als Neuwagenkredite, aber der niedrigere Kaufpreis gleicht dies oft aus.",
              "type": "info"
            },
            {
              "text": "Inzahlungnahme-Steuervorteil: In den meisten Ländern wird die Mehrwertsteuer auf den Preis minus Inzahlungnahme-Wert berechnet, was Ihnen Hunderte oder Tausende an Steuern spart.",
              "type": "info"
            },
            {
              "text": "Händler vs. Direktfinanzierung: Händler können Zinssätze um 1–2% aufschlagen. Eine Vorabgenehmigung Ihrer Bank oder Kreditgenossenschaft gibt Ihnen Verhandlungsmacht.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Arten der Autofinanzierung",
          "items": [
            {
              "text": "Direktfinanzierung: Sie leihen direkt von einer Bank, Kreditgenossenschaft oder Online-Kreditgeber. Sie kennen Ihren Zinssatz vor dem Händlerbesuch und haben Verhandlungsmacht.",
              "type": "info"
            },
            {
              "text": "Händlerfinanzierung: Der Händler organisiert die Finanzierung über sein Kreditgebernetzwerk. Bequem, kann aber Zinsaufschläge beinhalten. Immer mit Vorabgenehmigung vergleichen.",
              "type": "info"
            },
            {
              "text": "Herstellerfinanzierung: Sonderkonditionen (0%–2,9% eff. Jahreszins) von Autoherstellern über ihre Finanzierungsgesellschaften. Erfordert meist exzellente Bonität.",
              "type": "info"
            },
            {
              "text": "Leasing-Rückkauf-Kredit: Finanzierung des Kaufs eines Fahrzeugs am Ende der Leasinglaufzeit. Zinssätze variieren — mit dem direkten Kauf eines ähnlichen Gebrauchtwagens vergleichen.",
              "type": "info"
            },
            {
              "text": "Umschuldung: Ersetzung Ihres aktuellen Autokredits durch einen neuen mit niedrigerem Zinssatz. Sinnvoll, wenn sich Ihre Bonität verbessert hat oder Zinssätze seit dem ursprünglichen Kredit gefallen sind.",
              "type": "info"
            },
            {
              "text": "Händler-Eigenfinanzierung: Hausfinanzierung beim Händler. Typischerweise sehr hohe Zinssätze (15–25%+) und sollte nur als letzter Ausweg betrachtet werden.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Autokredit-Berechnungsbeispiele",
          "description": "Schritt-für-Schritt-Beispiele, die zeigen, wie monatliche Raten und Gesamtkosten berechnet werden",
          "examples": [
            {
              "title": "Neuer SUV — 35.000€ mit Inzahlungnahme",
              "steps": [
                "Fahrzeugpreis: 35.000€",
                "Anzahlung: 5.000€",
                "Inzahlungnahme-Wert: 8.000€ (keine Restschuld)",
                "Mehrwertsteuer: 19% auf (35.000€ − 8.000€) = 19% × 27.000€ = 5.130€",
                "Gebühren (Zulassung, Dokumentation): 600€",
                "Steuer & Gebühren im Kredit enthalten: Ja",
                "Kreditsumme: 35.000€ − 5.000€ − 8.000€ + 5.130€ + 600€ = 27.730€",
                "Zinssatz: 5,9% eff. Jahreszins für 60 Monate",
                "Monatlicher Zinssatz: 5,9% ÷ 12 = 0,4917%",
                "Monatliche Rate: 27.730€ × [0,004917 × 1,004917^60] ÷ [1,004917^60 − 1] = 536,02€"
              ],
              "result": "Monatliche Rate: 536,02€ | Gesamtzinsen: 4.431€ | Gesamtkosten: 36.561€"
            },
            {
              "title": "Gebrauchte Limousine — 18.000€ Budget-Kauf",
              "steps": [
                "Fahrzeugpreis: 18.000€",
                "Anzahlung: 3.000€",
                "Keine Inzahlungnahme",
                "Mehrwertsteuer: 19% auf 18.000€ = 3.420€",
                "Gebühren: 350€",
                "Steuer & Gebühren im Kredit enthalten: Ja",
                "Kreditsumme: 18.000€ − 3.000€ + 3.420€ + 350€ = 18.770€",
                "Zinssatz: 7,9% eff. Jahreszins für 48 Monate (Gebrauchtwagen, gute Bonität)",
                "Monatlicher Zinssatz: 7,9% ÷ 12 = 0,6583%",
                "Monatliche Rate: 18.770€ × [0,006583 × 1,006583^48] ÷ [1,006583^48 − 1] = 455,98€"
              ],
              "result": "Monatliche Rate: 455,98€ | Gesamtzinsen: 3.117€ | Gesamtkosten: 24.537€"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viel sollte ich für ein Auto anzahlen?",
          "answer": "Finanzexperten empfehlen, mindestens 20% für einen Neuwagen und 10% für einen Gebrauchtwagen anzuzahlen. Eine höhere Anzahlung reduziert Ihre monatliche Rate, die Gesamtzinsen und das Risiko der Überschuldung (mehr schulden als das Auto wert ist). Falls Sie keine 20% anzahlen können, streben Sie mindestens 10% an und vermeiden Sie Null-Anzahlung-Angebote, die vom ersten Tag an zu negativem Eigenkapital führen."
        },
        {
          "question": "Was ist ein guter Zinssatz für einen Autokredit?",
          "answer": "Stand 2025–2026 sind gute Autokreditzinssätze etwa: 4–6% für Neuwagen mit exzellenter Bonität (750+), 5–7% für Neuwagen mit guter Bonität (700–749), 7–10% für Gebrauchtwagen mit guter Bonität und 10–15%+ für mittlere oder schlechte Bonität. Zinssätze variieren je Kreditgeber, holen Sie daher immer Angebote von mindestens 3 Quellen ein — Ihrer Bank, einer Kreditgenossenschaft und dem Händler — bevor Sie unterschreiben."
        },
        {
          "question": "Sollte ich eine längere Kreditlaufzeit für niedrigere Raten wählen?",
          "answer": "Obwohl längere Laufzeiten (72–84 Monate) niedrigere monatliche Raten bieten, kosten sie erheblich mehr Gesamtzinsen. Zum Beispiel kostet ein 30.000€-Kredit bei 6% etwa 3.500€ Zinsen über 48 Monate, aber 5.800€ über 72 Monate. Längere Laufzeiten erhöhen auch das Risiko der Überschuldung. Bleiben Sie bei maximal 60 Monaten für Neuwagen und 36–48 Monaten für Gebrauchtwagen, wenn möglich."
        },
        {
          "question": "Wie reduziert eine Inzahlungnahme meine Mehrwertsteuer?",
          "answer": "In den meisten Ländern wird die Mehrwertsteuer auf den Fahrzeugpreis minus Inzahlungnahme-Wert berechnet. Zum Beispiel, wenn Sie ein 40.000€-Auto kaufen und ein Fahrzeug im Wert von 15.000€ in Zahlung geben, zahlen Sie nur Steuer auf 25.000€ — das spart 2.850€ bei einem 19%-Steuersatz. Jedoch bieten einige Regionen diese Steuerreduzierung nicht an."
        },
        {
          "question": "Ist es besser, über einen Händler oder meine Bank zu finanzieren?",
          "answer": "Eine Vorabgenehmigung durch Ihre Bank oder Kreditgenossenschaft vor dem Händlerbesuch ist fast immer empfehlenswert. Dies gibt Ihnen einen Basis-Zinssatz zum Vergleich mit dem Händlerangebot und Verhandlungsmacht. Händler schlagen manchmal 1–2% auf den Zinssatz für Profit auf. Jedoch können Herstellerfinanzierungs-Promotions (0%–2,9% eff. Jahreszins) über den Händler Bankzinssätze schlagen — vergleichen Sie einfach die Gesamtkosten sorgfältig."
        },
        {
          "question": "Welche Gebühren sollte ich beim Autokauf erwarten?",
          "answer": "Übliche Gebühren umfassen: Zulassung (50€–500€ je nach Region), Dokumentations-/Händlergebühren (100€–500€), Mehrwertsteuer (verschiedene Prozentsätze je nach Land) und möglicherweise Werbegebühren oder händler-hinzugefügtes Zubehör. Bitten Sie immer um eine detaillierte Aufschlüsselung aller Gebühren vor der Unterschrift. Einige Gebühren sind verhandelbar (Händlergebühren, Zubehör), andere sind festgelegt (Zulassung, Steuer)."
        },
        {
          "question": "Was bedeutet es, bei einem Autokredit überschuldet zu sein?",
          "answer": "Überschuldet zu sein bedeutet, dass Sie mehr für den Kredit schulden, als das Auto aktuell wert ist. Dies passiert bei geringer Anzahlung, langer Kreditlaufzeit oder wenn das Auto schneller an Wert verliert als Sie die Kreditsumme tilgen. Neuwagen verlieren 20–30% ihres Wertes im ersten Jahr. Um dies zu vermeiden, zahlen Sie mindestens 20% an, wählen Sie eine kürzere Laufzeit und rollen Sie kein negatives Eigenkapital von einem vorherigen Kredit in einen neuen."
        },
        {
          "question": "Kann ich meinen Autokredit vorzeitig abbezahlen?",
          "answer": "Die meisten Autokredite erlauben vorzeitige Tilgung ohne Strafgebühren, prüfen Sie aber Ihren Kreditvertrag auf Vorfälligkeitsentschädigungsklauseln. Zusätzliche monatliche Tilgungen — schon 50–100€ — können Hunderte oder Tausende an Zinsen sparen und Ihre Kreditlaufzeit erheblich verkürzen. Konzentrieren Sie Sondertilgungen auf den Kredit-Anfang, wenn der Zinsanteil jeder Rate am höchsten ist."
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

  // ─── INPUTS ───
  inputs: [
    // Vehicle Price — currency dropdown
    {
      id: "vehiclePrice",
      type: "number",
      defaultValue: null,
      placeholder: "30000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Down Payment — currency
    {
      id: "downPayment",
      type: "number",
      defaultValue: null,
      placeholder: "5000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Include Trade-In toggle
    {
      id: "includeTradein",
      type: "toggle",
      defaultValue: false,
    },
    // Trade-In Value — shown when includeTradein = true
    {
      id: "tradeinValue",
      type: "number",
      defaultValue: null,
      placeholder: "8000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeTradein", value: true },
    },
    // Amount Owed on Trade-In — shown when includeTradein = true
    {
      id: "tradeinOwed",
      type: "number",
      defaultValue: null,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeTradein", value: true },
    },
    // Loan Term — stepper (years)
    {
      id: "loanTerm",
      type: "stepper",
      defaultValue: 5,
      min: 1,
      max: 8,
      step: 1,
      suffix: "years",
    },
    // Interest Rate — number with %
    {
      id: "interestRate",
      type: "number",
      defaultValue: 6.5,
      min: 0,
      max: 30,
      step: 0.1,
      suffix: "%",
    },
    // Sales Tax Rate
    {
      id: "salesTax",
      type: "number",
      defaultValue: null,
      placeholder: "7",
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
    },
    // Include Tax & Fees in Loan toggle
    {
      id: "includeTaxInLoan",
      type: "toggle",
      defaultValue: true,
    },
    // Title, Registration & Fees — currency
    {
      id: "fees",
      type: "number",
      defaultValue: null,
      placeholder: "500",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Include Extra Payment — toggle (V4.3)
    {
      id: "includeExtraPayment",
      type: "toggle",
      defaultValue: false,
    },
    // Extra Monthly Payment — revealed when includeExtraPayment = true
    {
      id: "extraMonthlyPayment",
      type: "number",
      defaultValue: null,
      placeholder: "100",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeExtraPayment", value: true },
    },
  ],

  inputGroups: [], // EMPTY — no accordions

  // ─── RESULTS ───
  results: [
    { id: "monthlyPayment", type: "primary", format: "text" },
    { id: "totalLoanAmount", type: "secondary", format: "text" },
    { id: "totalInterest", type: "secondary", format: "text" },
    { id: "totalCost", type: "secondary", format: "text" },
    { id: "payoffDate", type: "secondary", format: "text" },
  ],

  // ─── INFO CARDS ───
  infoCards: [
    { id: "metrics", type: "list", icon: "💰", itemCount: 4 },
    { id: "details", type: "list", icon: "📋", itemCount: 5 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ───
  chart: {
    id: "paymentBreakdown",
    type: "composed",
    xKey: "year",
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "principal", type: "bar", stackId: "payment", color: "#3b82f6" },
      { key: "interest", type: "bar", stackId: "payment", color: "#f97316" },
    ],
  },

  // ─── DETAILED TABLE (Amortization Schedule) ───
  detailedTable: {
    id: "amortization",
    buttonLabel: "View Amortization Schedule",
    buttonIcon: "📅",
    modalTitle: "Full Amortization Schedule",
    columns: [
      { id: "month", label: "Month", align: "center" },
      { id: "payment", label: "Payment", align: "right" },
      { id: "principal", label: "Principal", align: "right" },
      { id: "interest", label: "Interest", align: "right" },
      { id: "balance", label: "Balance", align: "right", highlight: true },
    ],
  },

  referenceData: [], // EMPTY — use Dual List

  // ─── EDUCATION SECTIONS ───
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ─── FAQs ───
  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
  ],

  // ─── REFERENCES ───
  references: [
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2025",
      title: "Know Before You Owe: Auto Loans",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/consumer-tools/auto-loans/",
    },
    {
      authors: "Federal Trade Commission",
      year: "2024",
      title: "Buying a New Car: Understanding Vehicle Financing",
      source: "FTC",
      url: "https://consumer.ftc.gov/articles/buying-new-car",
    },
    {
      authors: "Edmunds",
      year: "2025",
      title: "Auto Loan Calculator Methodology and Current Rate Trends",
      source: "Edmunds.com",
      url: "https://www.edmunds.com/calculators/car-loan.html",
    },
  ],

  hero: {},
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculateAutoLoan(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──
  const vehiclePrice = values.vehiclePrice as number | null;
  const downPayment = (values.downPayment as number | null) || 0;
  const includeTradein = values.includeTradein as boolean;
  const tradeinValue = includeTradein ? ((values.tradeinValue as number | null) || 0) : 0;
  const tradeinOwed = includeTradein ? ((values.tradeinOwed as number | null) || 0) : 0;
  const loanTermYears = (values.loanTerm as number) || 5;
  const interestRate = (values.interestRate as number) ?? 6.5;
  const salesTaxRate = (values.salesTax as number | null) || 0;
  const includeTaxInLoan = values.includeTaxInLoan as boolean;
  const feesAmount = (values.fees as number | null) || 0;

  const includeExtraPayment = values.includeExtraPayment as boolean;
  const extraMonthlyPayment = includeExtraPayment ? ((values.extraMonthlyPayment as number | null) || 0) : 0;

  // ── Validate required ──
  if (!vehiclePrice || vehiclePrice <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Currency symbol ──
  const curr = fieldUnits?.vehiclePrice || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ── Calculate taxable amount (most states: price - trade-in) ──
  const taxableAmount = Math.max(vehiclePrice - tradeinValue, 0);
  const salesTaxAmount = taxableAmount * (salesTaxRate / 100);

  // ── Calculate net trade-in (value minus what's owed) ──
  const netTradein = tradeinValue - tradeinOwed;

  // ── Calculate loan principal ──
  let loanAmount = vehiclePrice - downPayment - netTradein;

  if (includeTaxInLoan) {
    loanAmount += salesTaxAmount + feesAmount;
  }

  // Ensure loan amount is positive
  loanAmount = Math.max(loanAmount, 0);

  if (loanAmount <= 0) {
    return {
      values: {
        monthlyPayment: 0,
        totalLoanAmount: 0,
        totalInterest: 0,
        totalCost: vehiclePrice + salesTaxAmount + feesAmount,
        payoffDate: "No loan needed",
      },
      formatted: {
        monthlyPayment: `${sym}0.00`,
        totalLoanAmount: `${sym}0`,
        totalInterest: `${sym}0`,
        totalCost: `${sym}${fmtNum(vehiclePrice + salesTaxAmount + feesAmount)}`,
        payoffDate: "No loan needed",
        downPaymentPercent: `${((downPayment / vehiclePrice) * 100).toFixed(1)}%`,
        ltvRatio: "0%",
        salesTaxAmount: `${sym}${fmtNum(salesTaxAmount)}`,
        interestSaved: "—",
        timeReduced: "—",
      },
      summary: "Your down payment and trade-in cover the full purchase — no loan needed!",
      isValid: true,
    };
  }

  // ── Calculate base monthly payment ──
  const loanTermMonths = loanTermYears * 12;
  const monthlyRate = interestRate / 100 / 12;
  let monthlyPayment: number;

  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / loanTermMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, loanTermMonths);
    monthlyPayment = loanAmount * (monthlyRate * factor) / (factor - 1);
  }

  // ── Amortize WITHOUT extra payments (baseline) ──
  let baseBalance = loanAmount;
  let baseTotalInterest = 0;

  for (let m = 1; m <= loanTermMonths; m++) {
    if (baseBalance <= 0) break;
    const intPmt = baseBalance * monthlyRate;
    const prinPmt = Math.min(monthlyPayment - intPmt, baseBalance);
    baseTotalInterest += intPmt;
    baseBalance -= prinPmt;
  }

  // ── Amortize WITH extra payments ──
  let balance = loanAmount;
  let totalInterest = 0;
  let actualMonths = 0;
  const chartData: Array<Record<string, unknown>> = [];
  const tableData: Array<Record<string, string>> = [];

  // Track yearly data for chart
  let yearPrincipal = 0;
  let yearInterest = 0;
  let currentYear = 1;

  for (let m = 1; m <= loanTermMonths; m++) {
    if (balance <= 0) break;

    const intPmt = balance * monthlyRate;
    let prinPmt = monthlyPayment - intPmt + extraMonthlyPayment;
    prinPmt = Math.min(prinPmt, balance); // don't overpay
    const actualPayment = Math.min(monthlyPayment + extraMonthlyPayment, balance + intPmt);

    totalInterest += intPmt;
    balance -= prinPmt;
    actualMonths = m;

    yearPrincipal += prinPmt;
    yearInterest += intPmt;

    // Add to amortization table
    tableData.push({
      month: `${m}`,
      payment: `${sym}${fmtNum(actualPayment)}`,
      principal: `${sym}${fmtNum(prinPmt)}`,
      interest: `${sym}${fmtNum(intPmt)}`,
      balance: `${sym}${fmtNum(Math.max(balance, 0))}`,
    });

    // End of year — push chart data
    if (m % 12 === 0 || balance <= 0) {
      chartData.push({
        year: `Y${currentYear}`,
        principal: Math.round(yearPrincipal),
        interest: Math.round(yearInterest),
      });
      yearPrincipal = 0;
      yearInterest = 0;
      currentYear++;
    }
  }

  // ── Extra payment savings ──
  const interestSaved = baseTotalInterest - totalInterest;
  const monthsSaved = loanTermMonths - actualMonths;
  const yearsSaved = Math.floor(monthsSaved / 12);
  const remainingMonthsSaved = monthsSaved % 12;

  let timeReducedStr = "";
  if (monthsSaved > 0) {
    if (yearsSaved > 0 && remainingMonthsSaved > 0) {
      timeReducedStr = `${yearsSaved} yr ${remainingMonthsSaved} mo`;
    } else if (yearsSaved > 0) {
      timeReducedStr = `${yearsSaved} ${yearsSaved === 1 ? "year" : "years"}`;
    } else {
      timeReducedStr = `${remainingMonthsSaved} ${remainingMonthsSaved === 1 ? "month" : "months"}`;
    }
  } else {
    timeReducedStr = "—";
  }

  // ── Total cost ──
  const totalPaid = monthlyPayment * actualMonths + extraMonthlyPayment * actualMonths;
  const upfrontCosts = downPayment + netTradein + (includeTaxInLoan ? 0 : salesTaxAmount + feesAmount);
  const totalCost = totalPaid + upfrontCosts;

  // ── Loan payoff date ──
  const now = new Date();
  const payoffDate = new Date(now.getFullYear(), now.getMonth() + actualMonths, 1);
  const payoffDateStr = payoffDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // ── Down payment & LTV ──
  const downPaymentPercent = (downPayment / vehiclePrice) * 100;
  const ltvRatio = (loanAmount / vehiclePrice) * 100;

  // ── Actual payoff time label ──
  const payoffYears = Math.floor(actualMonths / 12);
  const payoffRemMonths = actualMonths % 12;
  let payoffTimeStr = "";
  if (payoffYears > 0 && payoffRemMonths > 0) {
    payoffTimeStr = `${payoffYears} yr ${payoffRemMonths} mo`;
  } else if (payoffYears > 0) {
    payoffTimeStr = `${payoffYears} ${payoffYears === 1 ? "year" : "years"}`;
  } else {
    payoffTimeStr = `${payoffRemMonths} ${payoffRemMonths === 1 ? "month" : "months"}`;
  }

  // ── Loan term label ──
  const yearLabel = loanTermYears === 1 ? (v["year"] || "year") : (v["years"] || "years");
  const loanTermStr = `${loanTermYears} ${yearLabel}`;

  // ── Build summary ──
  let summary =
    f.summary
      ?.replace("{monthlyPayment}", `${sym}${fmtNum(monthlyPayment)}`)
      .replace("{loanTerm}", loanTermStr)
      .replace("{totalInterest}", `${sym}${fmtNum(totalInterest)}`)
      .replace("{totalCost}", `${sym}${fmtNum(totalCost)}`) ||
    `Monthly payment: ${sym}${fmtNum(monthlyPayment)} for ${loanTermStr}. Total interest: ${sym}${fmtNum(totalInterest)}.`;

  if (extraMonthlyPayment > 0 && interestSaved > 0) {
    summary += ` With ${sym}${fmtNum(extraMonthlyPayment)}/mo extra, you save ${sym}${fmtNum(interestSaved)} in interest and pay off ${timeReducedStr} sooner.`;
  }

  // ── Format results ──
  return {
    values: {
      monthlyPayment,
      totalLoanAmount: loanAmount,
      totalInterest,
      totalCost,
      payoffDate: payoffDateStr,
      downPaymentPercent,
      ltvRatio,
      salesTaxAmount,
      interestSaved,
      timeReduced: timeReducedStr,
    },
    formatted: {
      monthlyPayment: `${sym}${fmtNum(monthlyPayment)}`,
      totalLoanAmount: `${sym}${fmtNum(loanAmount)}`,
      totalInterest: `${sym}${fmtNum(totalInterest)}`,
      totalCost: `${sym}${fmtNum(totalCost)}`,
      payoffDate: extraMonthlyPayment > 0 ? `${payoffDateStr} (${payoffTimeStr})` : payoffDateStr,
      downPaymentPercent: `${downPaymentPercent.toFixed(1)}%`,
      ltvRatio: `${ltvRatio.toFixed(1)}%`,
      salesTaxAmount: `${sym}${fmtNum(salesTaxAmount)}`,
      interestSaved: interestSaved > 0 ? `${sym}${fmtNum(interestSaved)}` : "—",
      timeReduced: timeReducedStr,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
