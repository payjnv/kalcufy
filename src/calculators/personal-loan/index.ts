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

export const personalLoanCalculatorConfig: CalculatorConfigV4 = {
  id: "personal-loan",
  version: "4.0",
  category: "finance",
  icon: "🏦",

  // ─── PRESETS ───
  presets: [
    {
      id: "debtConsolidation",
      icon: "💳",
      values: {
        loanAmount: 15000,
        interestRate: 12,
        loanTerm: 3,
        includeOriginationFee: true,
        originationFee: 3,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
        includeIncome: false,
        monthlyIncome: null,
      },
    },
    {
      id: "homeImprovement",
      icon: "🏠",
      values: {
        loanAmount: 25000,
        interestRate: 9,
        loanTerm: 5,
        includeOriginationFee: false,
        originationFee: null,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
        includeIncome: false,
        monthlyIncome: null,
      },
    },
    {
      id: "emergencyMedical",
      icon: "🏥",
      values: {
        loanAmount: 5000,
        interestRate: 15,
        loanTerm: 2,
        includeOriginationFee: true,
        originationFee: 5,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
        includeIncome: false,
        monthlyIncome: null,
      },
    },
    {
      id: "majorPurchase",
      icon: "🎯",
      values: {
        loanAmount: 10000,
        interestRate: 8,
        loanTerm: 3,
        includeOriginationFee: false,
        originationFee: null,
        includeExtraPayment: true,
        extraMonthlyPayment: 50,
        includeIncome: true,
        monthlyIncome: 5000,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates) ───
  t: {
    en: {
      name: "Personal Loan Calculator",
      slug: "personal-loan",
      subtitle:
        "Calculate your monthly payment, total interest, and real APR including origination fees. See how extra payments save you thousands.",
      seo: {
        title: "Personal Loan Calculator - Monthly Payment & True Cost",
        description:
          "Calculate personal loan payments with origination fees, real APR, and extra payment savings. See your true cost, daily interest, and debt-to-income ratio. Free online tool.",
        shortDescription: "Calculate personal loan payments and see your true borrowing cost.",
        keywords: [
          "personal loan calculator",
          "loan payment calculator",
          "personal loan interest calculator",
          "loan amortization calculator",
          "personal loan APR calculator",
          "origination fee calculator",
          "loan payoff calculator",
          "debt consolidation calculator",
        ],
      },

      inputs: {
        loanAmount: {
          label: "Loan Amount",
          helpText: "Total amount you want to borrow — typical range is $1,000–$100,000",
        },
        interestRate: {
          label: "Interest Rate (APR)",
          helpText: "Annual percentage rate — depends on credit score, lender, and loan term",
        },
        loanTerm: {
          label: "Loan Term",
          helpText: "Repayment period in years — shorter terms save interest but raise monthly payments",
        },
        includeOriginationFee: {
          label: "Include Origination Fee",
          helpText: "Many lenders deduct a 1–10% fee from your loan proceeds before disbursement",
        },
        originationFee: {
          label: "Origination Fee",
          helpText: "Percentage deducted from your loan — you receive less but repay the full amount",
        },
        includeExtraPayment: {
          label: "Extra Monthly Payment",
          helpText: "Toggle on to see how extra payments reduce your loan term and save on interest",
        },
        extraMonthlyPayment: {
          label: "Extra Amount Per Month",
          helpText: "Additional amount paid toward principal each month — even $50 extra saves hundreds",
        },
        includeIncome: {
          label: "Include Monthly Income",
          helpText: "Optional — enter your income to calculate your debt-to-income ratio",
        },
        monthlyIncome: {
          label: "Gross Monthly Income",
          helpText: "Total monthly income before taxes — used to calculate DTI ratio",
        },
      },

      results: {
        monthlyPayment: { label: "Monthly Payment" },
        totalInterestPaid: { label: "Total Interest" },
        totalAmountPaid: { label: "Total Amount Paid" },
        trueCostMultiplier: { label: "True Cost Multiplier" },
        realApr: { label: "Real APR (with fees)" },
        dailyInterestCost: { label: "Daily Interest Cost" },
        netLoanAmount: { label: "Net Amount Received" },
        interestToPaymentRatio: { label: "Interest-to-Payment" },
        interestSaved: { label: "Interest Saved" },
        debtToIncomeRatio: { label: "Debt-to-Income Ratio" },
      },

      presets: {
        debtConsolidation: {
          label: "Debt Consolidation",
          description: "$15K at 12%, 3 years, 3% fee",
        },
        homeImprovement: {
          label: "Home Improvement",
          description: "$25K at 9%, 5 years, no fee",
        },
        emergencyMedical: {
          label: "Emergency / Medical",
          description: "$5K at 15%, 2 years, 5% fee",
        },
        majorPurchase: {
          label: "Major Purchase",
          description: "$10K at 8%, 3 years, +$50/mo extra",
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
          "Your monthly payment is {monthlyPayment} for {loanTerm}. Total interest: {totalInterest}. Total cost: {totalCost}.",
      },

      infoCards: {
        costBreakdown: {
          title: "Loan Cost Breakdown",
          items: [
            { label: "Daily Interest Cost", valueKey: "dailyInterestCost" },
            { label: "Monthly Interest (first month)", valueKey: "firstMonthInterest" },
            { label: "True Cost Multiplier", valueKey: "trueCostMultiplier" },
            { label: "Real APR (with fees)", valueKey: "realApr" },
          ],
        },
        paymentDetails: {
          title: "Payment Details",
          items: [
            { label: "Payoff Date", valueKey: "payoffDate" },
            { label: "Net Amount Received", valueKey: "netLoanAmount" },
            { label: "Interest-to-Payment Ratio", valueKey: "interestToPaymentRatio" },
            { label: "Debt-to-Income Ratio", valueKey: "debtToIncomeRatio" },
            { label: "Interest Saved", valueKey: "interestSaved" },
          ],
        },
        tips: {
          title: "Smart Borrowing Tips",
          items: [
            "Pre-qualify with 3+ lenders to compare rates — each soft pull won't affect your credit score.",
            "A 3-year term costs significantly less in total interest than a 5-year term, even if the monthly payment is higher.",
            "Watch for origination fees: a $15K loan with a 5% fee only puts $14,250 in your pocket, but you repay the full $15K.",
            "Even $50/month extra on a $15K loan at 12% saves over $800 in interest and cuts 6+ months off your payoff date.",
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
          title: "What Is a Personal Loan?",
          content:
            "A personal loan is an unsecured installment loan that provides a lump sum of money you repay in fixed monthly payments over a set term, typically 1 to 7 years. Unlike mortgages or auto loans, personal loans don't require collateral — the lender relies on your creditworthiness, income, and debt-to-income ratio to approve the loan and set the interest rate. Because there's no collateral backing the loan, interest rates tend to be higher than secured loans but significantly lower than credit cards. Personal loans are commonly used for debt consolidation, home improvements, medical expenses, weddings, and other large purchases. Most personal loans have fixed interest rates ranging from about 7% to 36%, depending on your credit profile.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content:
            "Enter your desired loan amount, interest rate, and repayment term to see your fixed monthly payment, total interest paid, and total cost. If your lender charges an origination fee, toggle it on to see the real APR and exactly how much cash you'll actually receive after the fee is deducted. The calculator uses standard amortization — each monthly payment covers that month's interest first, with the remainder reducing your principal. You can also toggle on extra monthly payments to see how much interest and time you'll save. The debt-to-income ratio feature helps you understand whether this loan fits safely into your budget.",
        },
        considerations: {
          title: "Key Factors That Affect Your Personal Loan",
          items: [
            { text: "Credit Score: The single biggest factor in your rate. Excellent credit (750+) gets 7–12% APR, while fair credit (650–699) may see 18–25%+ APR.", type: "info" },
            { text: "Origination Fees: Charged by many lenders (1–10% of loan amount), deducted from your proceeds. A $20K loan with 5% fee only gives you $19K cash.", type: "warning" },
            { text: "Loan Term: Shorter terms (2–3 years) mean higher monthly payments but dramatically less total interest. A 5-year loan can cost 60% more in interest than a 3-year loan.", type: "info" },
            { text: "APR vs Interest Rate: APR includes origination fees and represents the true yearly cost. Always compare APRs, not just interest rates, between lenders.", type: "warning" },
            { text: "Debt-to-Income: Lenders prefer DTI below 36%. If adding this loan pushes your DTI above 40%, you may not qualify or may get a higher rate.", type: "info" },
            { text: "Prepayment Penalties: Most personal loans have no prepayment penalty, but always check. If there's no penalty, extra payments go directly to principal.", type: "info" },
          ],
        },
        categories: {
          title: "Common Uses of Personal Loans",
          items: [
            { text: "Debt Consolidation: Replace multiple high-interest credit cards (18–28% APR) with one fixed-rate loan (8–15%). Simplify payments and save thousands in interest.", type: "info" },
            { text: "Home Improvement: Fund renovations without tapping home equity. Rates are higher than HELOCs but there's no risk to your home as collateral.", type: "info" },
            { text: "Medical Expenses: Cover unexpected medical bills. Compare the loan rate to hospital payment plans, which are often interest-free.", type: "info" },
            { text: "Major Life Events: Weddings, relocations, or emergencies. Only borrow what you need — it's tempting to take the full approved amount.", type: "warning" },
            { text: "Vehicle Repairs: Quick access to funds for essential repairs. Often cheaper than putting large expenses on a credit card.", type: "info" },
            { text: "Avoid These Uses: Vacations, discretionary spending, or investing. Borrowing at 12%+ to invest in something returning 7–10% loses money.", type: "warning" },
          ],
        },
        examples: {
          title: "Personal Loan Calculation Examples",
          description: "Step-by-step examples showing how monthly payments and total costs are calculated",
          examples: [
            {
              title: "$15,000 Debt Consolidation — 3 Years, 12% APR",
              steps: [
                "Loan amount: $15,000",
                "Interest rate: 12% APR (1% monthly)",
                "Loan term: 36 months",
                "Origination fee: 3% → $450 deducted",
                "You receive: $14,550 cash",
                "But you repay: $15,000 + interest",
                "Monthly payment: $498.21",
                "Total interest: $2,935",
                "Total paid: $17,935",
                "Real APR (including fee): ~14.2%",
              ],
              result:
                "Monthly payment: $498.21 | Total interest: $2,935 | You receive $14,550 but repay $17,935",
            },
            {
              title: "$25,000 Home Improvement — 5 Years, 9% APR",
              steps: [
                "Loan amount: $25,000",
                "Interest rate: 9% APR",
                "Loan term: 60 months",
                "No origination fee",
                "Monthly payment: $518.96",
                "Without extra payments: 60 months, $6,138 interest",
                "With $100/mo extra: 47 months, $4,627 interest",
                "Interest saved: $1,511",
                "Time saved: 13 months",
              ],
              result:
                "Extra $100/mo saves $1,511 in interest and pays off 13 months early",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What credit score do I need for a personal loan?",
          answer:
            "Most lenders require a minimum credit score of 580–620, but the best rates (7–12% APR) go to borrowers with excellent credit (750+). Good credit (700–749) typically gets 12–18% APR. Fair credit (650–699) may see 18–25% APR. Some online lenders cater to lower scores but charge higher rates (25–36% APR). Always pre-qualify with multiple lenders to compare — pre-qualification uses a soft pull and won't affect your score.",
        },
        {
          question: "What is an origination fee and how does it work?",
          answer:
            "An origination fee (typically 1–10% of the loan amount) covers the lender's processing costs. Most lenders deduct it from your loan proceeds — so a $15,000 loan with a 3% fee only gives you $14,550 in cash, but you repay the full $15,000 plus interest. This effectively raises your true borrowing cost. Always compare loans by APR (which includes the fee) rather than just the stated interest rate. Some lenders, especially banks and credit unions, charge no origination fee.",
        },
        {
          question: "What's a good interest rate for a personal loan?",
          answer:
            "As of 2025–2026, the average personal loan rate is around 12%. Rates range from about 7% for excellent credit to 36% for poor credit. A 'good' rate depends on your credit: below 10% is excellent, 10–15% is good, 15–20% is fair. For context, even 15% is much better than average credit card rates (22–28% APR), making personal loans a smart debt consolidation tool.",
        },
        {
          question: "Should I choose a shorter or longer loan term?",
          answer:
            "Shorter terms save significantly on interest but have higher monthly payments. For example, a $15,000 loan at 12%: a 3-year term costs $2,935 in interest ($498/mo), while a 5-year term costs $5,045 in interest ($334/mo). The 5-year loan saves $164/mo but costs you $2,110 more in total. Choose the shortest term your budget can handle comfortably.",
        },
        {
          question: "Can I pay off a personal loan early?",
          answer:
            "Most personal loans allow early payoff without penalties. Before signing, verify there's no prepayment penalty in the terms. When you pay extra, the additional amount goes directly to principal, which reduces future interest charges and shortens your loan term. Even $50/month extra on a $15,000 loan at 12% saves hundreds in interest and shaves months off your payoff date.",
        },
        {
          question: "Is a personal loan better than a credit card?",
          answer:
            "For carrying a balance, almost always yes. Personal loans offer fixed rates (typically 7–20%) versus credit card variable rates (18–28%+), fixed payoff dates, and no temptation to keep spending. A $10,000 balance at 22% APR on a credit card with minimum payments costs $9,000+ in interest over 15+ years. The same $10,000 as a 3-year personal loan at 12% costs just $1,957 in interest with a guaranteed payoff date.",
        },
        {
          question: "What is debt-to-income ratio and why does it matter?",
          answer:
            "Debt-to-income (DTI) ratio is your total monthly debt payments divided by your gross monthly income. Lenders use DTI to assess whether you can afford a new loan. Below 36% is considered healthy by most lenders. Between 36–43% is the maximum for many loans. Above 43% makes approval difficult. This calculator lets you enter your income to see how the new loan payment affects your DTI.",
        },
        {
          question: "How do I compare personal loan offers?",
          answer:
            "Always compare APR (not just interest rate) because APR includes origination fees. Then look at total cost over the life of the loan, monthly payment affordability, funding speed, lender reputation, and any special features like rate discounts for autopay (typically 0.25%). Pre-qualify with at least 3 lenders — each soft pull won't hurt your credit score.",
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
      "name": "Calculadora de Préstamo Personal",
      "slug": "calculadora-prestamo-personal",
      "subtitle": "Calcula tu pago mensual, interés total y TAE real incluyendo comisiones. Ve cómo los pagos extra te ahorran miles.",
      "seo": {
        "title": "Calculadora de Préstamo Personal - Pago Mensual y Costo Real",
        "description": "Calcula pagos de préstamos personales con comisiones de apertura, TAE real y ahorros por pagos extra. Ve tu costo real, interés diario y ratio deuda-ingresos. Herramienta gratuita online.",
        "shortDescription": "Calcula pagos de préstamos personales y ve tu costo real de endeudamiento.",
        "keywords": [
          "calculadora préstamo personal",
          "calculadora pago préstamo",
          "calculadora interés préstamo personal",
          "calculadora amortización préstamo",
          "calculadora TAE préstamo personal",
          "calculadora comisión apertura",
          "calculadora cancelación préstamo",
          "calculadora consolidación deudas"
        ]
      },
      "inputs": {
        "loanAmount": {
          "label": "Importe del Préstamo",
          "helpText": "Cantidad total que quieres pedir prestado — rango típico es €1.000–€100.000"
        },
        "interestRate": {
          "label": "Tipo de Interés (TAE)",
          "helpText": "Tasa anual equivalente — depende de la puntuación crediticia, prestamista y plazo del préstamo"
        },
        "loanTerm": {
          "label": "Plazo del Préstamo",
          "helpText": "Período de amortización en años — plazos más cortos ahorran interés pero aumentan los pagos mensuales"
        },
        "includeOriginationFee": {
          "label": "Incluir Comisión de Apertura",
          "helpText": "Muchos prestamistas deducen una comisión del 1–10% de los fondos del préstamo antes del desembolso"
        },
        "originationFee": {
          "label": "Comisión de Apertura",
          "helpText": "Porcentaje deducido de tu préstamo — recibes menos pero devuelves el importe completo"
        },
        "includeExtraPayment": {
          "label": "Pago Mensual Extra",
          "helpText": "Activa para ver cómo los pagos extra reducen el plazo del préstamo y ahorran intereses"
        },
        "extraMonthlyPayment": {
          "label": "Cantidad Extra por Mes",
          "helpText": "Importe adicional pagado al capital cada mes — incluso €50 extra ahorra cientos"
        },
        "includeIncome": {
          "label": "Incluir Ingresos Mensuales",
          "helpText": "Opcional — introduce tus ingresos para calcular tu ratio deuda-ingresos"
        },
        "monthlyIncome": {
          "label": "Ingresos Mensuales Brutos",
          "helpText": "Ingresos mensuales totales antes de impuestos — usado para calcular el ratio DTI"
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Pago Mensual"
        },
        "totalInterestPaid": {
          "label": "Interés Total"
        },
        "totalAmountPaid": {
          "label": "Importe Total Pagado"
        },
        "trueCostMultiplier": {
          "label": "Multiplicador Costo Real"
        },
        "realApr": {
          "label": "TAE Real (con comisiones)"
        },
        "dailyInterestCost": {
          "label": "Costo Interés Diario"
        },
        "netLoanAmount": {
          "label": "Importe Neto Recibido"
        },
        "interestToPaymentRatio": {
          "label": "Ratio Interés-Pago"
        },
        "interestSaved": {
          "label": "Interés Ahorrado"
        },
        "debtToIncomeRatio": {
          "label": "Ratio Deuda-Ingresos"
        }
      },
      "presets": {
        "debtConsolidation": {
          "label": "Consolidación de Deudas",
          "description": "€15K al 12%, 3 años, 3% comisión"
        },
        "homeImprovement": {
          "label": "Mejora del Hogar",
          "description": "€25K al 9%, 5 años, sin comisión"
        },
        "emergencyMedical": {
          "label": "Emergencia / Médico",
          "description": "€5K al 15%, 2 años, 5% comisión"
        },
        "majorPurchase": {
          "label": "Compra Importante",
          "description": "€10K al 8%, 3 años, +€50/mes extra"
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
        "summary": "Tu pago mensual es {monthlyPayment} durante {loanTerm}. Interés total: {totalInterest}. Costo total: {totalCost}."
      },
      "infoCards": {
        "costBreakdown": {
          "title": "Desglose del Costo del Préstamo",
          "items": [
            {
              "label": "Costo Interés Diario",
              "valueKey": "dailyInterestCost"
            },
            {
              "label": "Interés Mensual (primer mes)",
              "valueKey": "firstMonthInterest"
            },
            {
              "label": "Multiplicador Costo Real",
              "valueKey": "trueCostMultiplier"
            },
            {
              "label": "TAE Real (con comisiones)",
              "valueKey": "realApr"
            }
          ]
        },
        "paymentDetails": {
          "title": "Detalles del Pago",
          "items": [
            {
              "label": "Fecha de Cancelación",
              "valueKey": "payoffDate"
            },
            {
              "label": "Importe Neto Recibido",
              "valueKey": "netLoanAmount"
            },
            {
              "label": "Ratio Interés-Pago",
              "valueKey": "interestToPaymentRatio"
            },
            {
              "label": "Ratio Deuda-Ingresos",
              "valueKey": "debtToIncomeRatio"
            },
            {
              "label": "Interés Ahorrado",
              "valueKey": "interestSaved"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Endeudamiento Inteligente",
          "items": [
            "Precalifica con 3+ prestamistas para comparar tipos — cada consulta suave no afectará tu puntuación crediticia.",
            "Un plazo de 3 años cuesta significativamente menos en interés total que uno de 5 años, aunque el pago mensual sea mayor.",
            "Cuidado con las comisiones de apertura: un préstamo de €15K con 5% de comisión solo te da €14.250, pero devuelves los €15K completos.",
            "Incluso €50/mes extra en un préstamo de €15K al 12% ahorra más de €800 en intereses y reduce 6+ meses la fecha de cancelación."
          ]
        }
      },
      "chart": {
        "title": "Desglose de Pagos por Año",
        "xLabel": "Año",
        "yLabel": "Importe",
        "series": {
          "principal": "Capital",
          "interest": "Interés"
        }
      },
      "detailedTable": {
        "amortization": {
          "button": "Ver Tabla de Amortización",
          "title": "Tabla Completa de Amortización",
          "columns": {
            "month": "Mes",
            "payment": "Pago",
            "principal": "Capital",
            "interest": "Interés",
            "balance": "Saldo"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es un Préstamo Personal?",
          "content": "Un préstamo personal es un préstamo a plazos sin garantía que proporciona una suma global de dinero que devuelves en pagos mensuales fijos durante un plazo determinado, típicamente de 1 a 7 años. A diferencia de las hipotecas o préstamos para automóviles, los préstamos personales no requieren garantía — el prestamista se basa en tu solvencia crediticia, ingresos y ratio deuda-ingresos para aprobar el préstamo y establecer el tipo de interés. Debido a que no hay garantía respaldando el préstamo, los tipos de interés tienden a ser más altos que los préstamos garantizados pero significativamente más bajos que las tarjetas de crédito. Los préstamos personales se usan comúnmente para consolidación de deudas, mejoras del hogar, gastos médicos, bodas y otras compras importantes. La mayoría de los préstamos personales tienen tipos de interés fijos que van desde aproximadamente el 7% al 36%, dependiendo de tu perfil crediticio."
        },
        "howItWorks": {
          "title": "Cómo Funciona Esta Calculadora",
          "content": "Introduce el importe del préstamo deseado, tipo de interés y plazo de amortización para ver tu pago mensual fijo, interés total pagado y costo total. Si tu prestamista cobra una comisión de apertura, actívala para ver la TAE real y exactamente cuánto dinero recibirás después de que se deduzca la comisión. La calculadora usa amortización estándar — cada pago mensual cubre primero el interés de ese mes, con el resto reduciendo tu capital. También puedes activar pagos mensuales extra para ver cuánto interés y tiempo ahorrarás. La función de ratio deuda-ingresos te ayuda a entender si este préstamo encaja de forma segura en tu presupuesto."
        },
        "considerations": {
          "title": "Factores Clave que Afectan tu Préstamo Personal",
          "items": [
            {
              "text": "Puntuación Crediticia: El factor más importante en tu tipo. Crédito excelente (750+) obtiene 7–12% TAE, mientras que crédito regular (650–699) puede ver 18–25%+ TAE.",
              "type": "info"
            },
            {
              "text": "Comisiones de Apertura: Cobradas por muchos prestamistas (1–10% del importe del préstamo), deducidas de tus fondos. Un préstamo de €20K con 5% de comisión solo te da €19K en efectivo.",
              "type": "warning"
            },
            {
              "text": "Plazo del Préstamo: Plazos más cortos (2–3 años) significan pagos mensuales más altos pero dramáticamente menos interés total. Un préstamo de 5 años puede costar 60% más en interés que uno de 3 años.",
              "type": "info"
            },
            {
              "text": "TAE vs Tipo de Interés: La TAE incluye comisiones de apertura y representa el costo anual real. Siempre compara TAEs, no solo tipos de interés, entre prestamistas.",
              "type": "warning"
            },
            {
              "text": "Deuda-Ingresos: Los prestamistas prefieren DTI por debajo del 36%. Si añadir este préstamo empuja tu DTI por encima del 40%, puedes no calificar o conseguir un tipo más alto.",
              "type": "info"
            },
            {
              "text": "Penalizaciones por Prepago: La mayoría de préstamos personales no tienen penalización por prepago, pero siempre verifica. Si no hay penalización, los pagos extra van directamente al capital.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Usos Comunes de los Préstamos Personales",
          "items": [
            {
              "text": "Consolidación de Deudas: Reemplaza múltiples tarjetas de crédito de alto interés (18–28% TAE) con un préstamo de tipo fijo (8–15%). Simplifica pagos y ahorra miles en interés.",
              "type": "info"
            },
            {
              "text": "Mejora del Hogar: Financia renovaciones sin usar capital inmobiliario. Los tipos son más altos que HELOCs pero no hay riesgo para tu hogar como garantía.",
              "type": "info"
            },
            {
              "text": "Gastos Médicos: Cubre facturas médicas inesperadas. Compara el tipo del préstamo con planes de pago hospitalarios, que a menudo no tienen interés.",
              "type": "info"
            },
            {
              "text": "Eventos Importantes de la Vida: Bodas, mudanzas o emergencias. Solo pide prestado lo que necesites — es tentador tomar el importe completo aprobado.",
              "type": "warning"
            },
            {
              "text": "Reparaciones de Vehículos: Acceso rápido a fondos para reparaciones esenciales. A menudo más barato que poner gastos grandes en tarjeta de crédito.",
              "type": "info"
            },
            {
              "text": "Evita Estos Usos: Vacaciones, gastos discrecionales o invertir. Pedir prestado al 12%+ para invertir en algo que retorna 7–10% pierde dinero.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo de Préstamo Personal",
          "description": "Ejemplos paso a paso mostrando cómo se calculan los pagos mensuales y costos totales",
          "examples": [
            {
              "title": "€15.000 Consolidación de Deudas — 3 Años, 12% TAE",
              "steps": [
                "Importe del préstamo: €15.000",
                "Tipo de interés: 12% TAE (1% mensual)",
                "Plazo del préstamo: 36 meses",
                "Comisión de apertura: 3% → €450 deducidos",
                "Recibes: €14.550 en efectivo",
                "Pero devuelves: €15.000 + interés",
                "Pago mensual: €498,21",
                "Interés total: €2.935",
                "Total pagado: €17.935",
                "TAE real (incluyendo comisión): ~14,2%"
              ],
              "result": "Pago mensual: €498,21 | Interés total: €2.935 | Recibes €14.550 pero devuelves €17.935"
            },
            {
              "title": "€25.000 Mejora del Hogar — 5 Años, 9% TAE",
              "steps": [
                "Importe del préstamo: €25.000",
                "Tipo de interés: 9% TAE",
                "Plazo del préstamo: 60 meses",
                "Sin comisión de apertura",
                "Pago mensual: €518,96",
                "Sin pagos extra: 60 meses, €6.138 interés",
                "Con €100/mes extra: 47 meses, €4.627 interés",
                "Interés ahorrado: €1.511",
                "Tiempo ahorrado: 13 meses"
              ],
              "result": "€100/mes extra ahorra €1.511 en interés y se cancela 13 meses antes"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué puntuación crediticia necesito para un préstamo personal?",
          "answer": "La mayoría de prestamistas requieren una puntuación crediticia mínima de 580–620, pero los mejores tipos (7–12% TAE) van para prestatarios con crédito excelente (750+). Buen crédito (700–749) típicamente obtiene 12–18% TAE. Crédito regular (650–699) puede ver 18–25% TAE. Algunos prestamistas online atienden puntuaciones más bajas pero cobran tipos más altos (25–36% TAE). Siempre precalifica con múltiples prestamistas para comparar — la precalificación usa una consulta suave y no afectará tu puntuación."
        },
        {
          "question": "¿Qué es una comisión de apertura y cómo funciona?",
          "answer": "Una comisión de apertura (típicamente 1–10% del importe del préstamo) cubre los costos de procesamiento del prestamista. La mayoría de prestamistas la deducen de los fondos del préstamo — así que un préstamo de €15.000 con 3% de comisión solo te da €14.550 en efectivo, pero devuelves los €15.000 completos más interés. Esto efectivamente aumenta tu costo real de endeudamiento. Siempre compara préstamos por TAE (que incluye la comisión) en lugar de solo el tipo de interés declarado. Algunos prestamistas, especialmente bancos y cooperativas de crédito, no cobran comisión de apertura."
        },
        {
          "question": "¿Cuál es un buen tipo de interés para un préstamo personal?",
          "answer": "A partir de 2025–2026, el tipo promedio de préstamo personal es alrededor del 12%. Los tipos van desde aproximadamente 7% para crédito excelente hasta 36% para crédito pobre. Un tipo 'bueno' depende de tu crédito: por debajo del 10% es excelente, 10–15% es bueno, 15–20% es regular. Para contexto, incluso 15% es mucho mejor que los tipos promedio de tarjetas de crédito (22–28% TAE), haciendo los préstamos personales una herramienta inteligente de consolidación de deudas."
        },
        {
          "question": "¿Debería elegir un plazo de préstamo más corto o más largo?",
          "answer": "Los plazos más cortos ahorran significativamente en interés pero tienen pagos mensuales más altos. Por ejemplo, un préstamo de €15.000 al 12%: un plazo de 3 años cuesta €2.935 en interés (€498/mes), mientras que un plazo de 5 años cuesta €5.045 en interés (€334/mes). El préstamo de 5 años ahorra €164/mes pero te cuesta €2.110 más en total. Elige el plazo más corto que tu presupuesto pueda manejar cómodamente."
        },
        {
          "question": "¿Puedo pagar un préstamo personal antes de tiempo?",
          "answer": "La mayoría de préstamos personales permiten pago anticipado sin penalizaciones. Antes de firmar, verifica que no haya penalización por prepago en los términos. Cuando pagas extra, el importe adicional va directamente al capital, lo que reduce los cargos de interés futuros y acorta tu plazo del préstamo. Incluso €50/mes extra en un préstamo de €15.000 al 12% ahorra cientos en interés y reduce meses de tu fecha de cancelación."
        },
        {
          "question": "¿Es mejor un préstamo personal que una tarjeta de crédito?",
          "answer": "Para mantener un saldo, casi siempre sí. Los préstamos personales ofrecen tipos fijos (típicamente 7–20%) versus tipos variables de tarjetas de crédito (18–28%+), fechas de cancelación fijas, y sin tentación de seguir gastando. Un saldo de €10.000 al 22% TAE en tarjeta de crédito con pagos mínimos cuesta €9.000+ en interés durante 15+ años. Los mismos €10.000 como préstamo personal de 3 años al 12% cuesta solo €1.957 en interés con fecha de cancelación garantizada."
        },
        {
          "question": "¿Qué es el ratio deuda-ingresos y por qué importa?",
          "answer": "El ratio deuda-ingresos (DTI) es tus pagos de deuda mensuales totales divididos por tus ingresos mensuales brutos. Los prestamistas usan DTI para evaluar si puedes permitirte un nuevo préstamo. Por debajo del 36% se considera saludable por la mayoría de prestamistas. Entre 36–43% es el máximo para muchos préstamos. Por encima del 43% hace la aprobación difícil. Esta calculadora te permite introducir tus ingresos para ver cómo el nuevo pago del préstamo afecta tu DTI."
        },
        {
          "question": "¿Cómo comparo ofertas de préstamos personales?",
          "answer": "Siempre compara TAE (no solo tipo de interés) porque la TAE incluye comisiones de apertura. Luego mira el costo total durante la vida del préstamo, asequibilidad del pago mensual, velocidad de financiación, reputación del prestamista, y cualquier característica especial como descuentos de tipo por débito automático (típicamente 0,25%). Precalifica con al menos 3 prestamistas — cada consulta suave no dañará tu puntuación crediticia."
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
      "name": "Calculadora de Empréstimo Pessoal",
      "slug": "calculadora-emprestimo-pessoal",
      "subtitle": "Calcule sua prestação mensal, juros totais e TAEG real incluindo taxas de originação. Veja como pagamentos extras economizam milhares.",
      "seo": {
        "title": "Calculadora de Empréstimo Pessoal - Prestação Mensal e Custo Real",
        "description": "Calcule prestações de empréstimos pessoais com taxas de originação, TAEG real e economia com pagamentos extras. Veja seu custo real, juros diários e relação dívida/renda. Ferramenta online gratuita.",
        "shortDescription": "Calcule prestações de empréstimo pessoal e veja o custo real do seu financiamento.",
        "keywords": [
          "calculadora empréstimo pessoal",
          "calculadora prestação empréstimo",
          "calculadora juros empréstimo pessoal",
          "calculadora amortização empréstimo",
          "calculadora TAEG empréstimo pessoal",
          "calculadora taxa originação",
          "calculadora quitação empréstimo",
          "calculadora consolidação dívidas"
        ]
      },
      "inputs": {
        "loanAmount": {
          "label": "Valor do Empréstimo",
          "helpText": "Valor total que você deseja emprestar — faixa típica de R$ 1.000 a R$ 500.000"
        },
        "interestRate": {
          "label": "Taxa de Juros (TAEG)",
          "helpText": "Taxa anual efetiva global — depende do score de crédito, credor e prazo do empréstimo"
        },
        "loanTerm": {
          "label": "Prazo do Empréstimo",
          "helpText": "Período de pagamento em anos — prazos menores economizam juros mas aumentam as prestações mensais"
        },
        "includeOriginationFee": {
          "label": "Incluir Taxa de Originação",
          "helpText": "Muitos credores deduzem uma taxa de 1-10% do valor do empréstimo antes do desembolso"
        },
        "originationFee": {
          "label": "Taxa de Originação",
          "helpText": "Percentual deduzido do seu empréstimo — você recebe menos mas paga o valor total"
        },
        "includeExtraPayment": {
          "label": "Pagamento Mensal Extra",
          "helpText": "Ative para ver como pagamentos extras reduzem o prazo do empréstimo e economizam juros"
        },
        "extraMonthlyPayment": {
          "label": "Valor Extra Por Mês",
          "helpText": "Valor adicional pago ao principal a cada mês — mesmo R$ 200 extras economizam centenas"
        },
        "includeIncome": {
          "label": "Incluir Renda Mensal",
          "helpText": "Opcional — insira sua renda para calcular sua relação dívida/renda"
        },
        "monthlyIncome": {
          "label": "Renda Mensal Bruta",
          "helpText": "Renda mensal total antes dos impostos — usada para calcular a relação dívida/renda"
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Prestação Mensal"
        },
        "totalInterestPaid": {
          "label": "Juros Totais"
        },
        "totalAmountPaid": {
          "label": "Valor Total Pago"
        },
        "trueCostMultiplier": {
          "label": "Multiplicador de Custo Real"
        },
        "realApr": {
          "label": "TAEG Real (com taxas)"
        },
        "dailyInterestCost": {
          "label": "Custo de Juros Diário"
        },
        "netLoanAmount": {
          "label": "Valor Líquido Recebido"
        },
        "interestToPaymentRatio": {
          "label": "Proporção Juros/Prestação"
        },
        "interestSaved": {
          "label": "Juros Economizados"
        },
        "debtToIncomeRatio": {
          "label": "Relação Dívida/Renda"
        }
      },
      "presets": {
        "debtConsolidation": {
          "label": "Consolidação de Dívidas",
          "description": "R$ 60K a 12%, 3 anos, taxa 3%"
        },
        "homeImprovement": {
          "label": "Melhoria da Casa",
          "description": "R$ 100K a 9%, 5 anos, sem taxa"
        },
        "emergencyMedical": {
          "label": "Emergência / Médica",
          "description": "R$ 20K a 15%, 2 anos, taxa 5%"
        },
        "majorPurchase": {
          "label": "Compra Importante",
          "description": "R$ 40K a 8%, 3 anos, +R$ 200/mês extra"
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
        "summary": "Sua prestação mensal é {monthlyPayment} por {loanTerm}. Juros totais: {totalInterest}. Custo total: {totalCost}."
      },
      "infoCards": {
        "costBreakdown": {
          "title": "Detalhamento do Custo do Empréstimo",
          "items": [
            {
              "label": "Custo de Juros Diário",
              "valueKey": "dailyInterestCost"
            },
            {
              "label": "Juros Mensais (primeiro mês)",
              "valueKey": "firstMonthInterest"
            },
            {
              "label": "Multiplicador de Custo Real",
              "valueKey": "trueCostMultiplier"
            },
            {
              "label": "TAEG Real (com taxas)",
              "valueKey": "realApr"
            }
          ]
        },
        "paymentDetails": {
          "title": "Detalhes do Pagamento",
          "items": [
            {
              "label": "Data de Quitação",
              "valueKey": "payoffDate"
            },
            {
              "label": "Valor Líquido Recebido",
              "valueKey": "netLoanAmount"
            },
            {
              "label": "Proporção Juros/Prestação",
              "valueKey": "interestToPaymentRatio"
            },
            {
              "label": "Relação Dívida/Renda",
              "valueKey": "debtToIncomeRatio"
            },
            {
              "label": "Juros Economizados",
              "valueKey": "interestSaved"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Empréstimo Inteligente",
          "items": [
            "Pré-qualifique-se com 3+ credores para comparar taxas — cada consulta leve não afetará seu score de crédito.",
            "Um prazo de 3 anos custa significativamente menos em juros totais que um prazo de 5 anos, mesmo com prestação mensal maior.",
            "Cuidado com taxas de originação: um empréstimo de R$ 60K com taxa de 5% coloca apenas R$ 57K no seu bolso, mas você paga os R$ 60K completos.",
            "Mesmo R$ 200/mês extras em um empréstimo de R$ 60K a 12% economizam mais de R$ 3.200 em juros e reduzem mais de 6 meses da quitação."
          ]
        }
      },
      "chart": {
        "title": "Detalhamento do Pagamento por Ano",
        "xLabel": "Ano",
        "yLabel": "Valor",
        "series": {
          "principal": "Principal",
          "interest": "Juros"
        }
      },
      "detailedTable": {
        "amortization": {
          "button": "Ver Tabela de Amortização",
          "title": "Tabela de Amortização Completa",
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
          "title": "O Que É um Empréstimo Pessoal?",
          "content": "Um empréstimo pessoal é um empréstimo parcelado sem garantia que fornece uma quantia em dinheiro que você paga em prestações mensais fixas durante um prazo determinado, tipicamente de 1 a 7 anos. Diferentemente de financiamentos imobiliários ou de veículos, empréstimos pessoais não exigem garantia — o credor se baseia na sua capacidade de crédito, renda e relação dívida/renda para aprovar o empréstimo e definir a taxa de juros. Como não há garantia respaldando o empréstimo, as taxas de juros tendem a ser maiores que empréstimos com garantia, mas significativamente menores que cartões de crédito. Empréstimos pessoais são comumente usados para consolidação de dívidas, melhorias domésticas, despesas médicas, casamentos e outras compras importantes. A maioria dos empréstimos pessoais tem taxas fixas variando de cerca de 7% a 36%, dependendo do seu perfil de crédito."
        },
        "howItWorks": {
          "title": "Como Esta Calculadora Funciona",
          "content": "Insira o valor desejado do empréstimo, taxa de juros e prazo de pagamento para ver sua prestação mensal fixa, juros totais pagos e custo total. Se seu credor cobra taxa de originação, ative-a para ver a TAEG real e exatamente quanto dinheiro você receberá após a dedução da taxa. A calculadora usa amortização padrão — cada prestação mensal cobre primeiro os juros do mês, com o restante reduzindo seu principal. Você também pode ativar pagamentos mensais extras para ver quanto em juros e tempo você economizará. O recurso de relação dívida/renda ajuda a entender se este empréstimo se encaixa com segurança no seu orçamento."
        },
        "considerations": {
          "title": "Fatores-Chave Que Afetam Seu Empréstimo Pessoal",
          "items": [
            {
              "text": "Score de Crédito: O maior fator na sua taxa. Crédito excelente (750+) obtém 7-12% TAEG, enquanto crédito regular (650-699) pode ver 18-25%+ TAEG.",
              "type": "info"
            },
            {
              "text": "Taxas de Originação: Cobradas por muitos credores (1-10% do valor), deduzidas do seu recebimento. Empréstimo de R$ 80K com taxa de 5% dá apenas R$ 76K em dinheiro.",
              "type": "warning"
            },
            {
              "text": "Prazo do Empréstimo: Prazos menores (2-3 anos) significam prestações maiores mas dramaticamente menos juros totais. Empréstimo de 5 anos pode custar 60% mais em juros que um de 3 anos.",
              "type": "info"
            },
            {
              "text": "TAEG vs Taxa de Juros: TAEG inclui taxas de originação e representa o custo anual real. Sempre compare TAEGs, não apenas taxas de juros, entre credores.",
              "type": "warning"
            },
            {
              "text": "Relação Dívida/Renda: Credores preferem relação abaixo de 36%. Se adicionar este empréstimo empurrar sua relação acima de 40%, você pode não se qualificar ou obter taxa maior.",
              "type": "info"
            },
            {
              "text": "Multas de Pagamento Antecipado: A maioria dos empréstimos pessoais não tem multa de pagamento antecipado, mas sempre verifique. Se não há multa, pagamentos extras vão diretamente ao principal.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Usos Comuns de Empréstimos Pessoais",
          "items": [
            {
              "text": "Consolidação de Dívidas: Substitua múltiplos cartões de alta taxa (18-28% TAEG) por um empréstimo de taxa fixa (8-15%). Simplifique pagamentos e economize milhares em juros.",
              "type": "info"
            },
            {
              "text": "Melhoria da Casa: Financie reformas sem usar o patrimônio da casa. Taxas são maiores que home equity mas não há risco à sua casa como garantia.",
              "type": "info"
            },
            {
              "text": "Despesas Médicas: Cubra contas médicas inesperadas. Compare a taxa do empréstimo com planos de pagamento hospitalares, que frequentemente são sem juros.",
              "type": "info"
            },
            {
              "text": "Eventos Importantes da Vida: Casamentos, mudanças ou emergências. Empreste apenas o que precisa — é tentador pegar o valor total aprovado.",
              "type": "warning"
            },
            {
              "text": "Reparos de Veículos: Acesso rápido a fundos para reparos essenciais. Frequentemente mais barato que colocar grandes despesas no cartão de crédito.",
              "type": "info"
            },
            {
              "text": "Evite Estes Usos: Férias, gastos discricionários ou investimentos. Emprestar a 12%+ para investir em algo retornando 7-10% perde dinheiro.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de Empréstimo Pessoal",
          "description": "Exemplos passo a passo mostrando como prestações mensais e custos totais são calculados",
          "examples": [
            {
              "title": "R$ 60.000 Consolidação de Dívidas — 3 Anos, 12% TAEG",
              "steps": [
                "Valor do empréstimo: R$ 60.000",
                "Taxa de juros: 12% TAEG (1% mensal)",
                "Prazo: 36 meses",
                "Taxa de originação: 3% → R$ 1.800 deduzidos",
                "Você recebe: R$ 58.200 em dinheiro",
                "Mas você paga: R$ 60.000 + juros",
                "Prestação mensal: R$ 1.992,84",
                "Juros totais: R$ 11.742",
                "Total pago: R$ 71.742",
                "TAEG real (incluindo taxa): ~14,2%"
              ],
              "result": "Prestação mensal: R$ 1.992,84 | Juros totais: R$ 11.742 | Você recebe R$ 58.200 mas paga R$ 71.742"
            },
            {
              "title": "R$ 100.000 Melhoria da Casa — 5 Anos, 9% TAEG",
              "steps": [
                "Valor do empréstimo: R$ 100.000",
                "Taxa de juros: 9% TAEG",
                "Prazo: 60 meses",
                "Sem taxa de originação",
                "Prestação mensal: R$ 2.075,84",
                "Sem pagamentos extras: 60 meses, R$ 24.550 juros",
                "Com R$ 400/mês extra: 47 meses, R$ 18.508 juros",
                "Juros economizados: R$ 6.042",
                "Tempo economizado: 13 meses"
              ],
              "result": "R$ 400/mês extras economizam R$ 6.042 em juros e quitam 13 meses antes"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Que score de crédito preciso para um empréstimo pessoal?",
          "answer": "A maioria dos credores exige score mínimo de 580-620, mas as melhores taxas (7-12% TAEG) vão para tomadores com crédito excelente (750+). Bom crédito (700-749) tipicamente obtém 12-18% TAEG. Crédito regular (650-699) pode ver 18-25% TAEG. Alguns credores online atendem scores menores mas cobram taxas maiores (25-36% TAEG). Sempre pré-qualifique-se com múltiplos credores para comparar — pré-qualificação usa consulta leve e não afetará seu score."
        },
        {
          "question": "O que é taxa de originação e como funciona?",
          "answer": "Uma taxa de originação (tipicamente 1-10% do valor do empréstimo) cobre os custos de processamento do credor. A maioria dos credores a deduz dos recursos do empréstimo — então um empréstimo de R$ 60.000 com taxa de 3% dá apenas R$ 58.200 em dinheiro, mas você paga os R$ 60.000 completos mais juros. Isso efetivamente aumenta seu custo real de empréstimo. Sempre compare empréstimos por TAEG (que inclui a taxa) em vez de apenas a taxa de juros declarada. Alguns credores, especialmente bancos e cooperativas de crédito, não cobram taxa de originação."
        },
        {
          "question": "Qual é uma boa taxa de juros para empréstimo pessoal?",
          "answer": "Em 2025-2026, a taxa média de empréstimo pessoal está em torno de 12%. As taxas variam de cerca de 7% para crédito excelente a 36% para crédito ruim. Uma taxa 'boa' depende do seu crédito: abaixo de 10% é excelente, 10-15% é bom, 15-20% é regular. Para contexto, mesmo 15% é muito melhor que taxas médias de cartão de crédito (22-28% TAEG), tornando empréstimos pessoais uma ferramenta inteligente de consolidação de dívidas."
        },
        {
          "question": "Devo escolher prazo mais curto ou mais longo?",
          "answer": "Prazos menores economizam significativamente em juros mas têm prestações mensais maiores. Por exemplo, empréstimo de R$ 60.000 a 12%: prazo de 3 anos custa R$ 11.742 em juros (R$ 1.993/mês), enquanto prazo de 5 anos custa R$ 20.182 em juros (R$ 1.336/mês). O empréstimo de 5 anos economiza R$ 657/mês mas custa R$ 8.440 a mais no total. Escolha o prazo mais curto que seu orçamento conseguir lidar confortavelmente."
        },
        {
          "question": "Posso quitar um empréstimo pessoal antecipadamente?",
          "answer": "A maioria dos empréstimos pessoais permite quitação antecipada sem multas. Antes de assinar, verifique se não há multa de pagamento antecipado nos termos. Quando você paga extra, o valor adicional vai diretamente ao principal, o que reduz encargos futuros de juros e encurta o prazo do empréstimo. Mesmo R$ 200/mês extras em empréstimo de R$ 60.000 a 12% economizam centenas em juros e cortam meses da data de quitação."
        },
        {
          "question": "Empréstimo pessoal é melhor que cartão de crédito?",
          "answer": "Para manter saldo, quase sempre sim. Empréstimos pessoais oferecem taxas fixas (tipicamente 7-20%) versus taxas variáveis de cartão (18-28%+), datas fixas de quitação e sem tentação de continuar gastando. Saldo de R$ 40.000 a 22% TAEG no cartão com pagamentos mínimos custa R$ 36.000+ em juros ao longo de 15+ anos. Os mesmos R$ 40.000 como empréstimo pessoal de 3 anos a 12% custam apenas R$ 7.851 em juros com data garantida de quitação."
        },
        {
          "question": "O que é relação dívida/renda e por que importa?",
          "answer": "A relação dívida/renda (DTI) é seus pagamentos mensais totais de dívida divididos pela sua renda mensal bruta. Credores usam DTI para avaliar se você pode pagar um novo empréstimo. Abaixo de 36% é considerado saudável pela maioria dos credores. Entre 36-43% é o máximo para muitos empréstimos. Acima de 43% torna aprovação difícil. Esta calculadora permite inserir sua renda para ver como a nova prestação afeta seu DTI."
        },
        {
          "question": "Como comparar ofertas de empréstimo pessoal?",
          "answer": "Sempre compare TAEG (não apenas taxa de juros) porque TAEG inclui taxas de originação. Então olhe custo total ao longo da vida do empréstimo, acessibilidade da prestação mensal, velocidade de financiamento, reputação do credor e recursos especiais como descontos de taxa para débito automático (tipicamente 0,25%). Pré-qualifique-se com pelo menos 3 credores — cada consulta leve não prejudicará seu score de crédito."
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
      "name": "Calculateur de Prêt Personnel",
      "slug": "calculateur-pret-personnel",
      "subtitle": "Calculez votre paiement mensuel, les intérêts totaux et le TAP réel incluant les frais d'ouverture. Voyez comment les paiements supplémentaires vous font économiser des milliers.",
      "seo": {
        "title": "Calculateur de Prêt Personnel - Paiement Mensuel et Coût Réel",
        "description": "Calculez les paiements de prêt personnel avec frais d'ouverture, TAP réel et économies avec paiements supplémentaires. Voyez votre coût réel, intérêts quotidiens et ratio dette-revenu. Outil gratuit en ligne.",
        "shortDescription": "Calculez les paiements de prêt personnel et voyez votre coût réel d'emprunt.",
        "keywords": [
          "calculateur prêt personnel",
          "calculateur paiement prêt",
          "calculateur intérêts prêt personnel",
          "calculateur amortissement prêt",
          "calculateur TAP prêt personnel",
          "calculateur frais ouverture",
          "calculateur remboursement prêt",
          "calculateur consolidation dettes"
        ]
      },
      "inputs": {
        "loanAmount": {
          "label": "Montant du Prêt",
          "helpText": "Montant total que vous voulez emprunter — fourchette typique de 1 000 € à 100 000 €"
        },
        "interestRate": {
          "label": "Taux d'Intérêt (TAP)",
          "helpText": "Taux annuel effectif global — dépend du score de crédit, du prêteur et de la durée du prêt"
        },
        "loanTerm": {
          "label": "Durée du Prêt",
          "helpText": "Période de remboursement en années — des durées plus courtes économisent les intérêts mais augmentent les paiements mensuels"
        },
        "includeOriginationFee": {
          "label": "Inclure les Frais d'Ouverture",
          "helpText": "Beaucoup de prêteurs déduisent des frais de 1 à 10% du produit de votre prêt avant le versement"
        },
        "originationFee": {
          "label": "Frais d'Ouverture",
          "helpText": "Pourcentage déduit de votre prêt — vous recevez moins mais remboursez le montant total"
        },
        "includeExtraPayment": {
          "label": "Paiement Mensuel Supplémentaire",
          "helpText": "Activez pour voir comment les paiements supplémentaires réduisent la durée de votre prêt et économisent les intérêts"
        },
        "extraMonthlyPayment": {
          "label": "Montant Supplémentaire par Mois",
          "helpText": "Montant additionnel payé sur le capital chaque mois — même 50 € supplémentaires économisent des centaines"
        },
        "includeIncome": {
          "label": "Inclure le Revenu Mensuel",
          "helpText": "Optionnel — entrez votre revenu pour calculer votre ratio dette-revenu"
        },
        "monthlyIncome": {
          "label": "Revenu Mensuel Brut",
          "helpText": "Revenu mensuel total avant impôts — utilisé pour calculer le ratio dette-revenu"
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Paiement Mensuel"
        },
        "totalInterestPaid": {
          "label": "Intérêts Totaux"
        },
        "totalAmountPaid": {
          "label": "Montant Total Payé"
        },
        "trueCostMultiplier": {
          "label": "Multiplicateur de Coût Réel"
        },
        "realApr": {
          "label": "TAP Réel (avec frais)"
        },
        "dailyInterestCost": {
          "label": "Coût Quotidien des Intérêts"
        },
        "netLoanAmount": {
          "label": "Montant Net Reçu"
        },
        "interestToPaymentRatio": {
          "label": "Ratio Intérêts-Paiement"
        },
        "interestSaved": {
          "label": "Intérêts Économisés"
        },
        "debtToIncomeRatio": {
          "label": "Ratio Dette-Revenu"
        }
      },
      "presets": {
        "debtConsolidation": {
          "label": "Consolidation de Dettes",
          "description": "15 000 € à 12%, 3 ans, frais 3%"
        },
        "homeImprovement": {
          "label": "Amélioration Domicile",
          "description": "25 000 € à 9%, 5 ans, sans frais"
        },
        "emergencyMedical": {
          "label": "Urgence / Médical",
          "description": "5 000 € à 15%, 2 ans, frais 5%"
        },
        "majorPurchase": {
          "label": "Achat Important",
          "description": "10 000 € à 8%, 3 ans, +50 €/mois extra"
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
        "summary": "Votre paiement mensuel est de {monthlyPayment} pendant {loanTerm}. Intérêts totaux : {totalInterest}. Coût total : {totalCost}."
      },
      "infoCards": {
        "costBreakdown": {
          "title": "Répartition du Coût du Prêt",
          "items": [
            {
              "label": "Coût Quotidien des Intérêts",
              "valueKey": "dailyInterestCost"
            },
            {
              "label": "Intérêts Mensuels (premier mois)",
              "valueKey": "firstMonthInterest"
            },
            {
              "label": "Multiplicateur de Coût Réel",
              "valueKey": "trueCostMultiplier"
            },
            {
              "label": "TAP Réel (avec frais)",
              "valueKey": "realApr"
            }
          ]
        },
        "paymentDetails": {
          "title": "Détails des Paiements",
          "items": [
            {
              "label": "Date de Remboursement",
              "valueKey": "payoffDate"
            },
            {
              "label": "Montant Net Reçu",
              "valueKey": "netLoanAmount"
            },
            {
              "label": "Ratio Intérêts-Paiement",
              "valueKey": "interestToPaymentRatio"
            },
            {
              "label": "Ratio Dette-Revenu",
              "valueKey": "debtToIncomeRatio"
            },
            {
              "label": "Intérêts Économisés",
              "valueKey": "interestSaved"
            }
          ]
        },
        "tips": {
          "title": "Conseils d'Emprunt Intelligent",
          "items": [
            "Pré-qualifiez-vous auprès de 3+ prêteurs pour comparer les taux — chaque vérification souple n'affectera pas votre score de crédit.",
            "Un terme de 3 ans coûte significativement moins en intérêts totaux qu'un terme de 5 ans, même si le paiement mensuel est plus élevé.",
            "Attention aux frais d'ouverture : un prêt de 15 000 € avec 5% de frais ne met que 14 250 € dans votre poche, mais vous remboursez les 15 000 € complets.",
            "Même 50 €/mois supplémentaires sur un prêt de 15 000 € à 12% économisent plus de 800 € en intérêts et réduisent de 6+ mois votre date de remboursement."
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
          "button": "Voir le Tableau d'Amortissement",
          "title": "Tableau d'Amortissement Complet",
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
          "title": "Qu'est-ce qu'un Prêt Personnel ?",
          "content": "Un prêt personnel est un prêt à tempérament non garanti qui fournit une somme forfaitaire que vous remboursez en paiements mensuels fixes sur une durée déterminée, typiquement de 1 à 7 ans. Contrairement aux hypothèques ou prêts auto, les prêts personnels ne nécessitent pas de garantie — le prêteur s'appuie sur votre solvabilité, revenus et ratio dette-revenu pour approuver le prêt et fixer le taux d'intérêt. Parce qu'il n'y a pas de garantie, les taux d'intérêt tendent à être plus élevés que les prêts garantis mais significativement inférieurs aux cartes de crédit. Les prêts personnels sont couramment utilisés pour la consolidation de dettes, améliorations domiciliaires, dépenses médicales, mariages et autres gros achats. La plupart ont des taux fixes allant d'environ 7% à 36%, selon votre profil de crédit."
        },
        "howItWorks": {
          "title": "Comment Fonctionne ce Calculateur",
          "content": "Entrez le montant de prêt désiré, le taux d'intérêt et la durée de remboursement pour voir votre paiement mensuel fixe, les intérêts totaux payés et le coût total. Si votre prêteur facture des frais d'ouverture, activez-les pour voir le TAP réel et exactement combien d'argent vous recevrez réellement après déduction des frais. Le calculateur utilise l'amortissement standard — chaque paiement mensuel couvre d'abord les intérêts du mois, le reste réduisant votre capital. Vous pouvez aussi activer les paiements mensuels supplémentaires pour voir combien d'intérêts et de temps vous économiserez. La fonction ratio dette-revenu vous aide à comprendre si ce prêt s'intègre de manière sécuritaire dans votre budget."
        },
        "considerations": {
          "title": "Facteurs Clés Affectant Votre Prêt Personnel",
          "items": [
            {
              "text": "Score de Crédit : Le facteur le plus important pour votre taux. Crédit excellent (750+) obtient 7–12% TAP, tandis que crédit correct (650–699) peut voir 18–25%+ TAP.",
              "type": "info"
            },
            {
              "text": "Frais d'Ouverture : Facturés par beaucoup de prêteurs (1–10% du montant), déduits de vos fonds. Un prêt de 20 000 € avec 5% de frais ne vous donne que 19 000 € en liquide.",
              "type": "warning"
            },
            {
              "text": "Durée du Prêt : Des durées plus courtes (2–3 ans) signifient des paiements mensuels plus élevés mais dramatiquement moins d'intérêts totaux. Un prêt de 5 ans peut coûter 60% de plus en intérêts qu'un prêt de 3 ans.",
              "type": "info"
            },
            {
              "text": "TAP vs Taux d'Intérêt : Le TAP inclut les frais d'ouverture et représente le coût annuel réel. Comparez toujours les TAP, pas seulement les taux d'intérêt, entre prêteurs.",
              "type": "warning"
            },
            {
              "text": "Dette-Revenu : Les prêteurs préfèrent un ratio DTI sous 36%. Si ajouter ce prêt pousse votre DTI au-dessus de 40%, vous pourriez ne pas qualifier ou obtenir un taux plus élevé.",
              "type": "info"
            },
            {
              "text": "Pénalités de Remboursement Anticipé : La plupart des prêts personnels n'ont pas de pénalité, mais vérifiez toujours. S'il n'y en a pas, les paiements supplémentaires vont directement au capital.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Utilisations Courantes des Prêts Personnels",
          "items": [
            {
              "text": "Consolidation de Dettes : Remplacez plusieurs cartes de crédit à taux élevé (18–28% TAP) par un prêt à taux fixe (8–15%). Simplifiez les paiements et économisez des milliers en intérêts.",
              "type": "info"
            },
            {
              "text": "Amélioration Domiciliaire : Financez les rénovations sans puiser dans la valeur nette de la maison. Les taux sont plus élevés que les HELOC mais il n'y a pas de risque pour votre maison comme garantie.",
              "type": "info"
            },
            {
              "text": "Dépenses Médicales : Couvrez les factures médicales imprévues. Comparez le taux du prêt aux plans de paiement hospitaliers, qui sont souvent sans intérêts.",
              "type": "info"
            },
            {
              "text": "Événements de Vie Majeurs : Mariages, déménagements ou urgences. N'empruntez que ce dont vous avez besoin — il est tentant de prendre le montant total approuvé.",
              "type": "warning"
            },
            {
              "text": "Réparations Véhicules : Accès rapide aux fonds pour réparations essentielles. Souvent moins cher que de mettre de grosses dépenses sur carte de crédit.",
              "type": "info"
            },
            {
              "text": "Évitez Ces Utilisations : Vacances, dépenses discrétionnaires ou investissements. Emprunter à 12%+ pour investir dans quelque chose rapportant 7–10% fait perdre de l'argent.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calculs de Prêt Personnel",
          "description": "Exemples étape par étape montrant comment les paiements mensuels et coûts totaux sont calculés",
          "examples": [
            {
              "title": "15 000 € Consolidation de Dettes — 3 Ans, 12% TAP",
              "steps": [
                "Montant du prêt : 15 000 €",
                "Taux d'intérêt : 12% TAP (1% mensuel)",
                "Durée du prêt : 36 mois",
                "Frais d'ouverture : 3% → 450 € déduits",
                "Vous recevez : 14 550 € en liquide",
                "Mais vous remboursez : 15 000 € + intérêts",
                "Paiement mensuel : 498,21 €",
                "Intérêts totaux : 2 935 €",
                "Total payé : 17 935 €",
                "TAP réel (incluant frais) : ~14,2%"
              ],
              "result": "Paiement mensuel : 498,21 € | Intérêts totaux : 2 935 € | Vous recevez 14 550 € mais remboursez 17 935 €"
            },
            {
              "title": "25 000 € Amélioration Domicile — 5 Ans, 9% TAP",
              "steps": [
                "Montant du prêt : 25 000 €",
                "Taux d'intérêt : 9% TAP",
                "Durée du prêt : 60 mois",
                "Aucuns frais d'ouverture",
                "Paiement mensuel : 518,96 €",
                "Sans paiements supplémentaires : 60 mois, 6 138 € intérêts",
                "Avec 100 €/mois supplémentaires : 47 mois, 4 627 € intérêts",
                "Intérêts économisés : 1 511 €",
                "Temps économisé : 13 mois"
              ],
              "result": "100 € supplémentaires/mois économisent 1 511 € en intérêts et remboursent 13 mois plus tôt"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quel score de crédit ai-je besoin pour un prêt personnel ?",
          "answer": "La plupart des prêteurs exigent un score de crédit minimum de 580–620, mais les meilleurs taux (7–12% TAP) vont aux emprunteurs avec un crédit excellent (750+). Un bon crédit (700–749) obtient typiquement 12–18% TAP. Un crédit correct (650–699) peut voir 18–25% TAP. Certains prêteurs en ligne s'adressent aux scores plus bas mais facturent des taux plus élevés (25–36% TAP). Pré-qualifiez-vous toujours auprès de plusieurs prêteurs pour comparer — la pré-qualification utilise une vérification souple et n'affectera pas votre score."
        },
        {
          "question": "Qu'est-ce qu'un frais d'ouverture et comment ça fonctionne ?",
          "answer": "Un frais d'ouverture (typiquement 1–10% du montant du prêt) couvre les coûts de traitement du prêteur. La plupart des prêteurs le déduisent du produit de votre prêt — donc un prêt de 15 000 € avec 3% de frais ne vous donne que 14 550 € en liquide, mais vous remboursez les 15 000 € complets plus intérêts. Ceci augmente effectivement votre coût réel d'emprunt. Comparez toujours les prêts par TAP (qui inclut les frais) plutôt que juste le taux d'intérêt déclaré. Certains prêteurs, spécialement les banques et coopératives de crédit, ne facturent aucun frais d'ouverture."
        },
        {
          "question": "Qu'est-ce qu'un bon taux d'intérêt pour un prêt personnel ?",
          "answer": "En 2025–2026, le taux moyen de prêt personnel est d'environ 12%. Les taux vont d'environ 7% pour un crédit excellent à 36% pour un crédit pauvre. Un 'bon' taux dépend de votre crédit : sous 10% est excellent, 10–15% est bon, 15–20% est correct. Pour contexte, même 15% est beaucoup mieux que les taux moyens de carte de crédit (22–28% TAP), faisant des prêts personnels un outil intelligent de consolidation de dettes."
        },
        {
          "question": "Devrais-je choisir une durée de prêt plus courte ou plus longue ?",
          "answer": "Les durées plus courtes économisent significativement sur les intérêts mais ont des paiements mensuels plus élevés. Par exemple, un prêt de 15 000 € à 12% : une durée de 3 ans coûte 2 935 € en intérêts (498 €/mois), tandis qu'une durée de 5 ans coûte 5 045 € en intérêts (334 €/mois). Le prêt de 5 ans économise 164 €/mois mais vous coûte 2 110 € de plus au total. Choisissez la durée la plus courte que votre budget peut gérer confortablement."
        },
        {
          "question": "Puis-je rembourser un prêt personnel de manière anticipée ?",
          "answer": "La plupart des prêts personnels permettent le remboursement anticipé sans pénalités. Avant de signer, vérifiez qu'il n'y a pas de pénalité de remboursement anticipé dans les termes. Quand vous payez supplémentaire, le montant additionnel va directement au capital, ce qui réduit les charges d'intérêts futures et raccourcit la durée de votre prêt. Même 50 €/mois supplémentaires sur un prêt de 15 000 € à 12% économisent des centaines en intérêts et enlèvent des mois de votre date de remboursement."
        },
        {
          "question": "Un prêt personnel est-il meilleur qu'une carte de crédit ?",
          "answer": "Pour porter un solde, presque toujours oui. Les prêts personnels offrent des taux fixes (typiquement 7–20%) versus les taux variables de carte de crédit (18–28%+), des dates de remboursement fixes, et aucune tentation de continuer à dépenser. Un solde de 10 000 € à 22% TAP sur carte de crédit avec paiements minimums coûte 9 000 €+ en intérêts sur 15+ ans. Les mêmes 10 000 € comme prêt personnel de 3 ans à 12% coûtent juste 1 957 € en intérêts avec une date de remboursement garantie."
        },
        {
          "question": "Qu'est-ce que le ratio dette-revenu et pourquoi est-ce important ?",
          "answer": "Le ratio dette-revenu (DTI) est vos paiements de dette mensuels totaux divisés par votre revenu mensuel brut. Les prêteurs utilisent le DTI pour évaluer si vous pouvez vous permettre un nouveau prêt. Sous 36% est considéré sain par la plupart des prêteurs. Entre 36–43% est le maximum pour beaucoup de prêts. Au-dessus de 43% rend l'approbation difficile. Ce calculateur vous permet d'entrer votre revenu pour voir comment le nouveau paiement de prêt affecte votre DTI."
        },
        {
          "question": "Comment comparer les offres de prêt personnel ?",
          "answer": "Comparez toujours le TAP (pas juste le taux d'intérêt) parce que le TAP inclut les frais d'ouverture. Regardez ensuite le coût total sur la vie du prêt, l'abordabilité du paiement mensuel, la vitesse de financement, la réputation du prêteur, et toutes fonctionnalités spéciales comme les remises de taux pour autopay (typiquement 0,25%). Pré-qualifiez-vous auprès d'au moins 3 prêteurs — chaque vérification souple ne nuira pas à votre score de crédit."
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
      "name": "Privatkredit Rechner",
      "slug": "privatkredit-rechner",
      "subtitle": "Berechnen Sie Ihre monatliche Rate, Gesamtzinsen und den echten effektiven Jahreszins inklusive Bearbeitungsgebühren. Sehen Sie, wie Sondertilgungen Ihnen Tausende sparen.",
      "seo": {
        "title": "Privatkredit Rechner - Monatliche Rate & Wahre Kosten",
        "description": "Berechnen Sie Privatkredit-Raten mit Bearbeitungsgebühren, echtem effektiven Jahreszins und Sondertilgungs-Ersparnissen. Sehen Sie Ihre wahren Kosten, tägliche Zinsen und Schulden-Einkommens-Verhältnis. Kostenloses Online-Tool.",
        "shortDescription": "Berechnen Sie Privatkredit-Raten und sehen Sie Ihre wahren Kreditkosten.",
        "keywords": [
          "privatkredit rechner",
          "kreditraten rechner",
          "privatkredit zinsen rechner",
          "tilgungsplan rechner",
          "privatkredit effektiver jahreszins rechner",
          "bearbeitungsgebühr rechner",
          "kredit ablösung rechner",
          "schuldentilgung rechner"
        ]
      },
      "inputs": {
        "loanAmount": {
          "label": "Kreditsumme",
          "helpText": "Gesamtbetrag, den Sie leihen möchten — typischer Bereich ist 1.000–100.000 €"
        },
        "interestRate": {
          "label": "Zinssatz (effektiver Jahreszins)",
          "helpText": "Effektiver Jahreszins — abhängig von Bonität, Kreditgeber und Laufzeit"
        },
        "loanTerm": {
          "label": "Kreditlaufzeit",
          "helpText": "Rückzahlungszeitraum in Jahren — kürzere Laufzeiten sparen Zinsen, erhöhen aber monatliche Raten"
        },
        "includeOriginationFee": {
          "label": "Bearbeitungsgebühr einbeziehen",
          "helpText": "Viele Kreditgeber ziehen eine Gebühr von 1–10% von der Kreditsumme vor Auszahlung ab"
        },
        "originationFee": {
          "label": "Bearbeitungsgebühr",
          "helpText": "Prozentsatz, der vom Kredit abgezogen wird — Sie erhalten weniger, zahlen aber den vollen Betrag zurück"
        },
        "includeExtraPayment": {
          "label": "Zusätzliche monatliche Zahlung",
          "helpText": "Aktivieren, um zu sehen, wie Sondertilgungen Ihre Laufzeit verkürzen und Zinsen sparen"
        },
        "extraMonthlyPayment": {
          "label": "Zusätzlicher Betrag pro Monat",
          "helpText": "Zusätzlicher Betrag für die Tilgung pro Monat — schon 50 € extra sparen Hunderte"
        },
        "includeIncome": {
          "label": "Monatseinkommen einbeziehen",
          "helpText": "Optional — geben Sie Ihr Einkommen ein, um Ihr Schulden-Einkommens-Verhältnis zu berechnen"
        },
        "monthlyIncome": {
          "label": "Brutto-Monatseinkommen",
          "helpText": "Gesamtes monatliches Einkommen vor Steuern — wird für das Schulden-Einkommens-Verhältnis verwendet"
        }
      },
      "results": {
        "monthlyPayment": {
          "label": "Monatliche Rate"
        },
        "totalInterestPaid": {
          "label": "Gesamtzinsen"
        },
        "totalAmountPaid": {
          "label": "Gesamtzahlbetrag"
        },
        "trueCostMultiplier": {
          "label": "Wahre Kostenmultiplikator"
        },
        "realApr": {
          "label": "Echter effektiver Jahreszins (mit Gebühren)"
        },
        "dailyInterestCost": {
          "label": "Tägliche Zinskosten"
        },
        "netLoanAmount": {
          "label": "Netto-Auszahlungsbetrag"
        },
        "interestToPaymentRatio": {
          "label": "Zinsen-zu-Rate-Verhältnis"
        },
        "interestSaved": {
          "label": "Gesparte Zinsen"
        },
        "debtToIncomeRatio": {
          "label": "Schulden-Einkommens-Verhältnis"
        }
      },
      "presets": {
        "debtConsolidation": {
          "label": "Schuldentilgung",
          "description": "15.000 € bei 12%, 3 Jahre, 3% Gebühr"
        },
        "homeImprovement": {
          "label": "Wohnungsrenovierung",
          "description": "25.000 € bei 9%, 5 Jahre, keine Gebühr"
        },
        "emergencyMedical": {
          "label": "Notfall / Medizin",
          "description": "5.000 € bei 15%, 2 Jahre, 5% Gebühr"
        },
        "majorPurchase": {
          "label": "Größere Anschaffung",
          "description": "10.000 € bei 8%, 3 Jahre, +50 €/Monat extra"
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
        "summary": "Ihre monatliche Rate beträgt {monthlyPayment} für {loanTerm}. Gesamtzinsen: {totalInterest}. Gesamtkosten: {totalCost}."
      },
      "infoCards": {
        "costBreakdown": {
          "title": "Kreditkosten-Aufschlüsselung",
          "items": [
            {
              "label": "Tägliche Zinskosten",
              "valueKey": "dailyInterestCost"
            },
            {
              "label": "Monatliche Zinsen (erster Monat)",
              "valueKey": "firstMonthInterest"
            },
            {
              "label": "Wahre Kostenmultiplikator",
              "valueKey": "trueCostMultiplier"
            },
            {
              "label": "Echter effektiver Jahreszins (mit Gebühren)",
              "valueKey": "realApr"
            }
          ]
        },
        "paymentDetails": {
          "title": "Zahlungsdetails",
          "items": [
            {
              "label": "Ablösedatum",
              "valueKey": "payoffDate"
            },
            {
              "label": "Netto-Auszahlungsbetrag",
              "valueKey": "netLoanAmount"
            },
            {
              "label": "Zinsen-zu-Rate-Verhältnis",
              "valueKey": "interestToPaymentRatio"
            },
            {
              "label": "Schulden-Einkommens-Verhältnis",
              "valueKey": "debtToIncomeRatio"
            },
            {
              "label": "Gesparte Zinsen",
              "valueKey": "interestSaved"
            }
          ]
        },
        "tips": {
          "title": "Clevere Kreditaufnahme-Tipps",
          "items": [
            "Holen Sie sich Voranfragen bei 3+ Kreditgebern, um Zinssätze zu vergleichen — jede weiche Anfrage beeinflusst Ihre Bonität nicht.",
            "Eine 3-Jahres-Laufzeit kostet deutlich weniger Gesamtzinsen als eine 5-Jahres-Laufzeit, auch wenn die monatliche Rate höher ist.",
            "Achten Sie auf Bearbeitungsgebühren: Ein 15.000 € Kredit mit 5% Gebühr bringt nur 14.250 € in Ihre Tasche, aber Sie zahlen die vollen 15.000 € zurück.",
            "Schon 50 €/Monat extra bei einem 15.000 € Kredit mit 12% spart über 800 € Zinsen und verkürzt die Laufzeit um 6+ Monate."
          ]
        }
      },
      "chart": {
        "title": "Zahlungsaufschlüsselung nach Jahr",
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
          "title": "Was ist ein Privatkredit?",
          "content": "Ein Privatkredit ist ein unbesicherter Ratenkredit, der Ihnen eine Einmalzahlung gewährt, die Sie in festen monatlichen Raten über eine festgelegte Laufzeit, typischerweise 1 bis 7 Jahre, zurückzahlen. Anders als Hypotheken oder Autokredite erfordern Privatkredite keine Sicherheiten — der Kreditgeber verlässt sich auf Ihre Kreditwürdigkeit, Ihr Einkommen und Ihr Schulden-Einkommens-Verhältnis, um den Kredit zu genehmigen und den Zinssatz festzulegen. Da keine Sicherheiten den Kredit absichern, sind die Zinssätze höher als bei besicherten Krediten, aber deutlich niedriger als bei Kreditkarten. Privatkredite werden häufig für Schuldentilgung, Wohnungsverbesserungen, Arztkosten, Hochzeiten und andere große Anschaffungen verwendet. Die meisten Privatkredite haben feste Zinssätze zwischen etwa 7% und 36%, abhängig von Ihrem Kreditprofil."
        },
        "howItWorks": {
          "title": "Wie dieser Rechner funktioniert",
          "content": "Geben Sie Ihre gewünschte Kreditsumme, den Zinssatz und die Rückzahlungslaufzeit ein, um Ihre feste monatliche Rate, die Gesamtzinsen und die Gesamtkosten zu sehen. Wenn Ihr Kreditgeber eine Bearbeitungsgebühr erhebt, aktivieren Sie diese, um den echten effektiven Jahreszins und genau zu sehen, wie viel Bargeld Sie nach Abzug der Gebühr tatsächlich erhalten. Der Rechner verwendet die Standard-Tilgung — jede monatliche Rate deckt zuerst die Zinsen des Monats ab, der Rest reduziert Ihre Tilgung. Sie können auch zusätzliche monatliche Zahlungen aktivieren, um zu sehen, wie viele Zinsen und Zeit Sie sparen. Die Schulden-Einkommens-Verhältnis-Funktion hilft Ihnen zu verstehen, ob dieser Kredit sicher in Ihr Budget passt."
        },
        "considerations": {
          "title": "Wichtige Faktoren, die Ihren Privatkredit beeinflussen",
          "items": [
            {
              "text": "Bonität: Der wichtigste Faktor für Ihren Zinssatz. Ausgezeichnete Bonität (750+) erhält 7–12% effektiven Jahreszins, während durchschnittliche Bonität (650–699) 18–25%+ sehen kann.",
              "type": "info"
            },
            {
              "text": "Bearbeitungsgebühren: Von vielen Kreditgebern erhoben (1–10% der Kreditsumme), von Ihrer Auszahlung abgezogen. Ein 20.000 € Kredit mit 5% Gebühr gibt Ihnen nur 19.000 € Bargeld.",
              "type": "warning"
            },
            {
              "text": "Kreditlaufzeit: Kürzere Laufzeiten (2–3 Jahre) bedeuten höhere monatliche Raten, aber dramatisch weniger Gesamtzinsen. Ein 5-Jahres-Kredit kann 60% mehr Zinsen kosten als ein 3-Jahres-Kredit.",
              "type": "info"
            },
            {
              "text": "Effektiver Jahreszins vs Nominalzins: Der effektive Jahreszins beinhaltet Bearbeitungsgebühren und stellt die wahren jährlichen Kosten dar. Vergleichen Sie immer effektive Jahreszinssätze zwischen Kreditgebern.",
              "type": "warning"
            },
            {
              "text": "Schulden-Einkommens-Verhältnis: Kreditgeber bevorzugen ein Verhältnis unter 36%. Wenn dieser Kredit Ihr Verhältnis über 40% drückt, qualifizieren Sie sich möglicherweise nicht oder erhalten einen höheren Zinssatz.",
              "type": "info"
            },
            {
              "text": "Vorfälligkeitsentschädigungen: Die meisten Privatkredite haben keine Vorfälligkeitsentschädigung, aber prüfen Sie immer. Falls keine Entschädigung anfällt, gehen zusätzliche Zahlungen direkt an die Tilgung.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Häufige Verwendungen von Privatkrediten",
          "items": [
            {
              "text": "Schuldentilgung: Ersetzen Sie mehrere hochverzinsliche Kreditkarten (18–28% effektiver Jahreszins) durch einen festen Ratenkredit (8–15%). Vereinfachen Sie Zahlungen und sparen Tausende an Zinsen.",
              "type": "info"
            },
            {
              "text": "Wohnungsverbesserung: Finanzieren Sie Renovierungen ohne Eigenkapitalnutzung. Zinssätze sind höher als bei Hypothekendarlehen, aber es gibt kein Risiko für Ihr Zuhause als Sicherheit.",
              "type": "info"
            },
            {
              "text": "Arztkosten: Decken Sie unerwartete Arztrechnungen ab. Vergleichen Sie den Kreditzinssatz mit Krankenhaus-Ratenzahlungsplänen, die oft zinsfrei sind.",
              "type": "info"
            },
            {
              "text": "Wichtige Lebensereignisse: Hochzeiten, Umzüge oder Notfälle. Leihen Sie nur das, was Sie brauchen — es ist verlockend, den voll genehmigten Betrag zu nehmen.",
              "type": "warning"
            },
            {
              "text": "Fahrzeugreparaturen: Schneller Zugang zu Mitteln für notwendige Reparaturen. Oft günstiger als große Ausgaben auf eine Kreditkarte zu setzen.",
              "type": "info"
            },
            {
              "text": "Vermeiden Sie diese Verwendungen: Urlaube, freiwillige Ausgaben oder Investitionen. Bei 12%+ zu leihen, um in etwas zu investieren, das 7–10% bringt, verliert Geld.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Privatkredit-Berechnungsbeispiele",
          "description": "Schritt-für-Schritt-Beispiele, die zeigen, wie monatliche Raten und Gesamtkosten berechnet werden",
          "examples": [
            {
              "title": "15.000 € Schuldentilgung — 3 Jahre, 12% effektiver Jahreszins",
              "steps": [
                "Kreditsumme: 15.000 €",
                "Zinssatz: 12% effektiver Jahreszins (1% monatlich)",
                "Kreditlaufzeit: 36 Monate",
                "Bearbeitungsgebühr: 3% → 450 € abgezogen",
                "Sie erhalten: 14.550 € Bargeld",
                "Aber Sie zahlen zurück: 15.000 € + Zinsen",
                "Monatliche Rate: 498,21 €",
                "Gesamtzinsen: 2.935 €",
                "Gesamtzahlung: 17.935 €",
                "Echter effektiver Jahreszins (inklusive Gebühr): ~14,2%"
              ],
              "result": "Monatliche Rate: 498,21 € | Gesamtzinsen: 2.935 € | Sie erhalten 14.550 €, zahlen aber 17.935 € zurück"
            },
            {
              "title": "25.000 € Wohnungsverbesserung — 5 Jahre, 9% effektiver Jahreszins",
              "steps": [
                "Kreditsumme: 25.000 €",
                "Zinssatz: 9% effektiver Jahreszins",
                "Kreditlaufzeit: 60 Monate",
                "Keine Bearbeitungsgebühr",
                "Monatliche Rate: 518,96 €",
                "Ohne Sonderzahlungen: 60 Monate, 6.138 € Zinsen",
                "Mit 100 €/Monat extra: 47 Monate, 4.627 € Zinsen",
                "Gesparte Zinsen: 1.511 €",
                "Gesparte Zeit: 13 Monate"
              ],
              "result": "Extra 100 €/Monat spart 1.511 € Zinsen und tilgt 13 Monate früher"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Welche Bonität brauche ich für einen Privatkredit?",
          "answer": "Die meisten Kreditgeber verlangen eine Mindestbonität von 580–620, aber die besten Zinssätze (7–12% effektiver Jahreszins) gehen an Kreditnehmer mit ausgezeichneter Bonität (750+). Gute Bonität (700–749) erhält typischerweise 12–18% effektiven Jahreszins. Durchschnittliche Bonität (650–699) kann 18–25% effektiven Jahreszins sehen. Einige Online-Kreditgeber bedienen niedrigere Scores, verlangen aber höhere Zinssätze (25–36% effektiver Jahreszins). Holen Sie immer Voranfragen bei mehreren Kreditgebern — Voranfragen verwenden weiche Abfragen und beeinträchtigen Ihren Score nicht."
        },
        {
          "question": "Was ist eine Bearbeitungsgebühr und wie funktioniert sie?",
          "answer": "Eine Bearbeitungsgebühr (typischerweise 1–10% der Kreditsumme) deckt die Bearbeitungskosten des Kreditgebers. Die meisten Kreditgeber ziehen sie von Ihrer Kreditsumme ab — so gibt Ihnen ein 15.000 € Kredit mit 3% Gebühr nur 14.550 € Bargeld, aber Sie zahlen die vollen 15.000 € plus Zinsen zurück. Dies erhöht effektiv Ihre wahren Kreditkosten. Vergleichen Sie Kredite immer nach dem effektiven Jahreszins (der die Gebühr beinhaltet) statt nur dem angegebenen Zinssatz. Einige Kreditgeber, besonders Banken und Kreditgenossenschaften, verlangen keine Bearbeitungsgebühr."
        },
        {
          "question": "Was ist ein guter Zinssatz für einen Privatkredit?",
          "answer": "Stand 2025–2026 liegt der durchschnittliche Privatkredit-Zinssatz bei etwa 12%. Die Zinssätze reichen von etwa 7% für ausgezeichnete Bonität bis 36% für schlechte Bonität. Ein 'guter' Zinssatz hängt von Ihrer Bonität ab: unter 10% ist ausgezeichnet, 10–15% ist gut, 15–20% ist durchschnittlich. Zum Vergleich: selbst 15% sind viel besser als durchschnittliche Kreditkarten-Zinssätze (22–28% effektiver Jahreszins), was Privatkredite zu einem cleveren Schuldentilgungs-Tool macht."
        },
        {
          "question": "Soll ich eine kürzere oder längere Kreditlaufzeit wählen?",
          "answer": "Kürzere Laufzeiten sparen erheblich Zinsen, haben aber höhere monatliche Raten. Zum Beispiel ein 15.000 € Kredit mit 12%: Eine 3-Jahres-Laufzeit kostet 2.935 € Zinsen (498 €/Monat), während eine 5-Jahres-Laufzeit 5.045 € Zinsen kostet (334 €/Monat). Der 5-Jahres-Kredit spart 164 €/Monat, kostet Sie aber 2.110 € mehr insgesamt. Wählen Sie die kürzeste Laufzeit, die Ihr Budget bequem bewältigen kann."
        },
        {
          "question": "Kann ich einen Privatkredit vorzeitig zurückzahlen?",
          "answer": "Die meisten Privatkredite erlauben vorzeitige Rückzahlung ohne Strafen. Überprüfen Sie vor der Unterzeichnung, dass keine Vorfälligkeitsentschädigung in den Bedingungen steht. Wenn Sie extra zahlen, geht der zusätzliche Betrag direkt an die Tilgung, was zukünftige Zinszahlungen reduziert und Ihre Kreditlaufzeit verkürzt. Schon 50 €/Monat extra bei einem 15.000 € Kredit mit 12% spart Hunderte an Zinsen und verkürzt die Rückzahlung um Monate."
        },
        {
          "question": "Ist ein Privatkredit besser als eine Kreditkarte?",
          "answer": "Für das Tragen eines Saldos fast immer ja. Privatkredite bieten feste Zinssätze (typischerweise 7–20%) versus variable Kreditkarten-Zinssätze (18–28%+), feste Rückzahlungsdaten und keine Versuchung, weiter auszugeben. Ein 10.000 € Saldo mit 22% effektivem Jahreszins auf einer Kreditkarte mit Mindestzahlungen kostet über 9.000 € Zinsen über 15+ Jahre. Die gleichen 10.000 € als 3-Jahres-Privatkredit mit 12% kosten nur 1.957 € Zinsen mit garantiertem Rückzahlungsdatum."
        },
        {
          "question": "Was ist das Schulden-Einkommens-Verhältnis und warum ist es wichtig?",
          "answer": "Das Schulden-Einkommens-Verhältnis (SEV) ist Ihre gesamten monatlichen Schuldenzahlungen geteilt durch Ihr Brutto-Monatseinkommen. Kreditgeber verwenden das SEV, um zu bewerten, ob Sie sich einen neuen Kredit leisten können. Unter 36% gilt bei den meisten Kreditgebern als gesund. Zwischen 36–43% ist das Maximum für viele Kredite. Über 43% macht die Genehmigung schwierig. Dieser Rechner lässt Sie Ihr Einkommen eingeben, um zu sehen, wie die neue Kreditrate Ihr SEV beeinflusst."
        },
        {
          "question": "Wie vergleiche ich Privatkredit-Angebote?",
          "answer": "Vergleichen Sie immer den effektiven Jahreszins (nicht nur den Zinssatz), da der effektive Jahreszins Bearbeitungsgebühren beinhaltet. Dann schauen Sie auf die Gesamtkosten über die Kreditlaufzeit, Erschwinglichkeit der monatlichen Rate, Auszahlungsgeschwindigkeit, Kreditgeber-Reputation und spezielle Funktionen wie Zinsnachlässe für Lastschrift (typischerweise 0,25%). Holen Sie Voranfragen bei mindestens 3 Kreditgebern — jede weiche Abfrage schadet Ihrer Bonität nicht."
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
    // Loan Amount — currency dropdown
    {
      id: "loanAmount",
      type: "number",
      defaultValue: null,
      placeholder: "15000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Interest Rate — slider
    {
      id: "interestRate",
      type: "slider",
      defaultValue: 12,
      min: 0,
      max: 36,
      step: 0.01,
      suffix: "%",
    },
    // Loan Term — stepper (years)
    {
      id: "loanTerm",
      type: "stepper",
      defaultValue: 3,
      min: 1,
      max: 7,
      step: 1,
      suffix: "years",
    },
    // Include Origination Fee — toggle
    {
      id: "includeOriginationFee",
      type: "toggle",
      defaultValue: false,
    },
    // Origination Fee %
    {
      id: "originationFee",
      type: "number",
      defaultValue: null,
      placeholder: "3",
      min: 0,
      max: 12,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeOriginationFee", value: true },
    },
    // Include Extra Payment — toggle
    {
      id: "includeExtraPayment",
      type: "toggle",
      defaultValue: false,
    },
    // Extra Monthly Payment
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
    // Include Income — toggle
    {
      id: "includeIncome",
      type: "toggle",
      defaultValue: false,
    },
    // Monthly Income
    {
      id: "monthlyIncome",
      type: "number",
      defaultValue: null,
      placeholder: "5000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeIncome", value: true },
    },
  ],

  inputGroups: [],

  // ─── RESULTS ───
  results: [
    { id: "monthlyPayment", type: "primary", format: "text" },
    { id: "totalInterestPaid", type: "secondary", format: "text" },
    { id: "totalAmountPaid", type: "secondary", format: "text" },
    { id: "trueCostMultiplier", type: "secondary", format: "text" },
    { id: "realApr", type: "secondary", format: "text" },
    { id: "dailyInterestCost", type: "secondary", format: "text" },
    { id: "netLoanAmount", type: "secondary", format: "text" },
    { id: "interestToPaymentRatio", type: "secondary", format: "text" },
    { id: "interestSaved", type: "secondary", format: "text" },
    { id: "debtToIncomeRatio", type: "secondary", format: "text" },
  ],

  // ─── INFO CARDS ───
  infoCards: [
    { id: "costBreakdown", type: "list", icon: "💰", itemCount: 4 },
    { id: "paymentDetails", type: "list", icon: "📊", itemCount: 5 },
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

  // ─── DETAILED TABLE ───
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

  referenceData: [],

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
    { id: "0" }, { id: "1" }, { id: "2" }, { id: "3" },
    { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" },
  ],

  // ─── REFERENCES ───
  references: [
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2025",
      title: "What Is a Personal Loan?",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-personal-loan-en-2109/",
    },
    {
      authors: "Federal Reserve",
      year: "2025",
      title: "Consumer Credit Outstanding - G.19 Report",
      source: "Federal Reserve Statistical Release",
      url: "https://www.federalreserve.gov/releases/g19/current/",
    },
    {
      authors: "Bankrate",
      year: "2025",
      title: "Average Personal Loan Interest Rates",
      source: "Bankrate",
      url: "https://www.bankrate.com/loans/personal-loans/rates/",
    },
  ],

  hero: {},
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculatePersonalLoan(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──
  const loanAmount = values.loanAmount as number | null;
  const interestRate = (values.interestRate as number) ?? 12;
  const loanTermYears = (values.loanTerm as number) || 3;
  const includeOriginationFee = values.includeOriginationFee as boolean;
  const originationFeePercent = includeOriginationFee ? ((values.originationFee as number | null) || 0) : 0;
  const includeExtraPayment = values.includeExtraPayment as boolean;
  const extraMonthlyPayment = includeExtraPayment ? ((values.extraMonthlyPayment as number | null) || 0) : 0;
  const includeIncome = values.includeIncome as boolean;
  const monthlyIncome = includeIncome ? ((values.monthlyIncome as number | null) || 0) : 0;

  // ── Validate ──
  if (!loanAmount || loanAmount <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Currency symbol ──
  const curr = fieldUnits?.loanAmount || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ── Origination fee ──
  const originationFeeAmount = loanAmount * (originationFeePercent / 100);
  const netLoanAmount = loanAmount - originationFeeAmount;

  // ── Base monthly payment (standard amortization) ──
  const loanTermMonths = loanTermYears * 12;
  const monthlyRate = interestRate / 100 / 12;
  let monthlyPayment: number;

  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / loanTermMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, loanTermMonths);
    monthlyPayment = loanAmount * (monthlyRate * factor) / (factor - 1);
  }

  // ── Daily interest cost (current) ──
  const dailyInterest = loanAmount * (interestRate / 100) / 365;
  const firstMonthInterest = loanAmount * monthlyRate;

  // ── Interest-to-payment ratio (first month) ──
  const interestToPaymentRatio = monthlyPayment > 0 ? (firstMonthInterest / monthlyPayment) * 100 : 0;

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

  let yearPrincipal = 0;
  let yearInterest = 0;
  let currentYear = 1;

  for (let m = 1; m <= loanTermMonths; m++) {
    if (balance <= 0) break;

    const intPmt = balance * monthlyRate;
    let prinPmt = monthlyPayment - intPmt + extraMonthlyPayment;
    prinPmt = Math.min(prinPmt, balance);
    const actualPayment = Math.min(monthlyPayment + extraMonthlyPayment, balance + intPmt);

    totalInterest += intPmt;
    balance -= prinPmt;
    actualMonths = m;

    yearPrincipal += prinPmt;
    yearInterest += intPmt;

    // Amortization table
    tableData.push({
      month: `${m}`,
      payment: `${sym}${fmtNum(actualPayment)}`,
      principal: `${sym}${fmtNum(prinPmt)}`,
      interest: `${sym}${fmtNum(intPmt)}`,
      balance: `${sym}${fmtNum(Math.max(balance, 0))}`,
    });

    // Year-end chart data
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

  let timeReducedStr = "—";
  if (monthsSaved > 0) {
    if (yearsSaved > 0 && remainingMonthsSaved > 0) {
      timeReducedStr = `${yearsSaved} yr ${remainingMonthsSaved} mo`;
    } else if (yearsSaved > 0) {
      timeReducedStr = `${yearsSaved} ${yearsSaved === 1 ? "year" : "years"}`;
    } else {
      timeReducedStr = `${remainingMonthsSaved} ${remainingMonthsSaved === 1 ? "month" : "months"}`;
    }
  }

  // ── Total cost ──
  const totalPaid = totalInterest + loanAmount;
  const trueCostMultiplier = totalPaid / loanAmount;

  // ── Real APR (including origination fee) ──
  // Newton's method to solve for real APR given net disbursement
  let realApr = interestRate;
  if (originationFeeAmount > 0 && netLoanAmount > 0) {
    // Solve: netLoanAmount = monthlyPayment × [(1-(1+r)^-n)/r]
    let rGuess = monthlyRate * 1.1;
    for (let i = 0; i < 100; i++) {
      const f1 = Math.pow(1 + rGuess, loanTermMonths);
      const pv = monthlyPayment * (f1 - 1) / (rGuess * f1);
      const dPv = monthlyPayment * (
        ((loanTermMonths * Math.pow(1 + rGuess, loanTermMonths - 1)) * rGuess * f1 - (f1 - 1) * (f1 + rGuess * loanTermMonths * Math.pow(1 + rGuess, loanTermMonths - 1))) /
        Math.pow(rGuess * f1, 2)
      );
      const diff = pv - netLoanAmount;
      if (Math.abs(diff) < 0.01) break;
      rGuess = rGuess + diff / (dPv || 1);
      if (rGuess <= 0) rGuess = monthlyRate * 1.01;
    }
    realApr = rGuess * 12 * 100;
  }

  // ── Payoff date ──
  const now = new Date();
  const payoffDate = new Date(now.getFullYear(), now.getMonth() + actualMonths, 1);
  const payoffDateStr = payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // ── DTI Ratio ──
  const dtiRatio = monthlyIncome > 0 ? (monthlyPayment / monthlyIncome) * 100 : 0;
  let dtiLabel = "";
  if (monthlyIncome > 0) {
    if (dtiRatio < 15) dtiLabel = "Excellent";
    else if (dtiRatio < 25) dtiLabel = "Healthy";
    else if (dtiRatio < 36) dtiLabel = "Moderate";
    else if (dtiRatio < 43) dtiLabel = "High";
    else dtiLabel = "Critical";
  }

  // ── Loan term label ──
  const yearLabel = loanTermYears === 1 ? (v["year"] || "year") : (v["years"] || "years");
  const loanTermStr = `${loanTermYears} ${yearLabel}`;

  // ── Payoff time label (actual) ──
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

  // ── Build summary ──
  let summary =
    f.summary
      ?.replace("{monthlyPayment}", `${sym}${fmtNum(monthlyPayment)}`)
      .replace("{loanTerm}", loanTermStr)
      .replace("{totalInterest}", `${sym}${fmtNum(totalInterest)}`)
      .replace("{totalCost}", `${sym}${fmtNum(totalPaid)}`) ||
    `Monthly payment: ${sym}${fmtNum(monthlyPayment)} for ${loanTermStr}. Total interest: ${sym}${fmtNum(totalInterest)}.`;

  if (originationFeeAmount > 0) {
    summary += ` After a ${originationFeePercent}% origination fee, you receive ${sym}${fmtNum(netLoanAmount)}.`;
  }

  if (extraMonthlyPayment > 0 && interestSaved > 0) {
    summary += ` With ${sym}${fmtNum(extraMonthlyPayment)}/mo extra, you save ${sym}${fmtNum(interestSaved)} in interest and pay off ${timeReducedStr} sooner.`;
  }

  return {
    values: {
      monthlyPayment,
      totalInterestPaid: totalInterest,
      totalAmountPaid: totalPaid,
      trueCostMultiplier,
      realApr,
      dailyInterestCost: dailyInterest,
      firstMonthInterest,
      netLoanAmount,
      interestToPaymentRatio,
      interestSaved,
      debtToIncomeRatio: dtiRatio,
      payoffDate: payoffDateStr,
    },
    formatted: {
      monthlyPayment: `${sym}${fmtNum(monthlyPayment)}`,
      totalInterestPaid: `${sym}${fmtNum(totalInterest)}`,
      totalAmountPaid: `${sym}${fmtNum(totalPaid)}`,
      trueCostMultiplier: `${fmtNum(trueCostMultiplier, 2)}× your loan`,
      realApr: originationFeeAmount > 0 ? `${fmtNum(realApr, 2)}% (vs ${interestRate}% stated)` : `${fmtNum(interestRate, 2)}%`,
      dailyInterestCost: `${sym}${fmtNum(dailyInterest)}/day`,
      firstMonthInterest: `${sym}${fmtNum(firstMonthInterest)}`,
      netLoanAmount: originationFeeAmount > 0 ? `${sym}${fmtNum(netLoanAmount)} (−${sym}${fmtNum(originationFeeAmount)} fee)` : `${sym}${fmtNum(loanAmount)}`,
      interestToPaymentRatio: `${fmtNum(interestToPaymentRatio, 0)}% goes to interest`,
      interestSaved: interestSaved > 0 ? `${sym}${fmtNum(interestSaved)} saved (${timeReducedStr} faster)` : "—",
      debtToIncomeRatio: monthlyIncome > 0 ? `${fmtNum(dtiRatio, 1)}% — ${dtiLabel}` : "—",
      payoffDate: extraMonthlyPayment > 0 ? `${payoffDateStr} (${payoffTimeStr})` : payoffDateStr,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
