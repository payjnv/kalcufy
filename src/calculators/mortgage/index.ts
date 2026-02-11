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

export const mortgageCalculatorConfig: CalculatorConfigV4 = {
  id: "mortgage",
  version: "4.0",
  category: "finance",
  icon: "🏠",

  // ─── PRESETS ───
  presets: [
    {
      id: "starterHome",
      icon: "🏡",
      values: {
        homePrice: 250000,
        downPayment: 25000,
        loanTerm: 30,
        interestRate: 6.5,
        includeTaxInsurance: true,
        propertyTaxRate: 1.2,
        annualInsurance: 1500,
        includePmi: true,
        pmiRate: 0.5,
        includeHoa: false,
        hoaMonthly: null,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
      },
    },
    {
      id: "familyHome",
      icon: "🏠",
      values: {
        homePrice: 450000,
        downPayment: 90000,
        loanTerm: 30,
        interestRate: 6.5,
        includeTaxInsurance: true,
        propertyTaxRate: 1.2,
        annualInsurance: 2200,
        includePmi: false,
        pmiRate: null,
        includeHoa: false,
        hoaMonthly: null,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
      },
    },
    {
      id: "luxury",
      icon: "🏢",
      values: {
        homePrice: 800000,
        downPayment: 200000,
        loanTerm: 15,
        interestRate: 5.9,
        includeTaxInsurance: true,
        propertyTaxRate: 1.4,
        annualInsurance: 3800,
        includePmi: false,
        pmiRate: null,
        includeHoa: true,
        hoaMonthly: 450,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
      },
    },
    {
      id: "investment",
      icon: "🏘️",
      values: {
        homePrice: 300000,
        downPayment: 75000,
        loanTerm: 30,
        interestRate: 7,
        includeTaxInsurance: true,
        propertyTaxRate: 1.3,
        annualInsurance: 1800,
        includePmi: false,
        pmiRate: null,
        includeHoa: false,
        hoaMonthly: null,
        includeExtraPayment: false,
        extraMonthlyPayment: null,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates) ───
  t: {
    en: {
      name: "Mortgage Calculator",
      slug: "mortgage",
      subtitle:
        "Estimate your monthly mortgage payment including principal, interest, taxes, insurance, PMI, and HOA — with a full amortization schedule.",
      seo: {
        title: "Mortgage Calculator - Monthly Payment & Amortization Estimator",
        description:
          "Calculate your monthly mortgage payment with property taxes, insurance, PMI, and HOA fees. View amortization schedule, payment breakdown chart, and compare loan scenarios. Free online tool.",
        shortDescription: "Estimate your monthly mortgage payment with taxes, insurance, and PMI.",
        keywords: [
          "mortgage calculator",
          "mortgage payment calculator",
          "home loan calculator",
          "monthly mortgage payment",
          "mortgage amortization calculator",
          "house payment calculator",
          "mortgage calculator with PMI",
          "mortgage calculator with taxes",
        ],
      },

      inputs: {
        homePrice: {
          label: "Home Price",
          helpText: "The total purchase price of the property",
        },
        downPayment: {
          label: "Down Payment",
          helpText: "Cash paid upfront — 20% avoids PMI, but 3–10% is common for first-time buyers",
        },
        loanTerm: {
          label: "Loan Term",
          helpText: "Loan duration — 30 years is most common, 15 years saves on interest",
        },
        interestRate: {
          label: "Interest Rate",
          helpText: "Annual percentage rate — check current rates from your lender or bank",
        },
        includeTaxInsurance: {
          label: "Include Taxes & Insurance",
          helpText: "Toggle on to add property tax and homeowners insurance to your payment",
        },
        propertyTaxRate: {
          label: "Property Tax Rate",
          helpText: "Annual property tax as a percentage of home value — U.S. average is about 1.1%",
        },
        annualInsurance: {
          label: "Annual Home Insurance",
          helpText: "Yearly homeowners insurance premium — average is $1,500–$3,000 depending on location",
        },
        includePmi: {
          label: "Include PMI",
          helpText: "Private mortgage insurance is typically required when down payment is less than 20%",
        },
        pmiRate: {
          label: "PMI Rate",
          helpText: "Annual PMI as a percentage of loan amount — typically 0.3% to 1.5% based on credit score and LTV",
        },
        includeHoa: {
          label: "Include HOA Fees",
          helpText: "Toggle on if the property is in a homeowners association",
        },
        hoaMonthly: {
          label: "Monthly HOA Fee",
          helpText: "Monthly homeowners association fee — covers shared amenities and maintenance",
        },
        includeExtraPayment: {
          label: "Extra Monthly Payment",
          helpText: "Toggle on to see how extra payments reduce your loan term and save on interest",
        },
        extraMonthlyPayment: {
          label: "Extra Payment Amount",
          helpText: "Additional amount paid toward principal each month — even $100 extra can save years",
        },
      },

      presets: {
        starterHome: {
          label: "Starter Home",
          description: "$250K, 10% down, 30yr, 6.5%",
        },
        familyHome: {
          label: "Family Home",
          description: "$450K, 20% down, 30yr, no PMI",
        },
        luxury: {
          label: "Luxury Home",
          description: "$800K, 25% down, 15yr, HOA",
        },
        investment: {
          label: "Investment",
          description: "$300K, 25% down, 30yr, 7%",
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

      results: {
        monthlyPayment: { label: "Monthly Payment" },
        principalInterest: { label: "Principal & Interest" },
        monthlyTax: { label: "Monthly Tax" },
        monthlyInsurance: { label: "Monthly Insurance" },
        monthlyPmi: { label: "Monthly PMI" },
        totalInterest: { label: "Total Interest Paid" },
        totalPayments: { label: "Total of All Payments" },
        payoffDate: { label: "Payoff Date" },
        interestSaved: { label: "Interest Saved" },
        timeReduced: { label: "Time Saved" },
      },

      infoCards: {
        breakdown: {
          title: "Payment Breakdown",
          items: [
            { label: "Principal & Interest", valueKey: "principalInterest" },
            { label: "Property Tax", valueKey: "monthlyTax" },
            { label: "Home Insurance", valueKey: "monthlyInsurance" },
            { label: "PMI", valueKey: "monthlyPmi" },
            { label: "HOA Fees", valueKey: "hoaMonthly" },
          ],
        },
        details: {
          title: "Loan Details",
          items: [
            { label: "Loan Amount", valueKey: "loanAmount" },
            { label: "Down Payment %", valueKey: "downPaymentPercent" },
            { label: "Loan-to-Value", valueKey: "ltvRatio" },
            { label: "Total of All Payments", valueKey: "totalPayments" },
            { label: "Payoff Date", valueKey: "payoffDate" },
          ],
        },
        tips: {
          title: "Mortgage Tips",
          items: [
            "Put 20% down to avoid PMI and get better rates — even 1% less interest saves thousands over 30 years.",
            "A 15-year mortgage has higher payments but saves massively on total interest compared to 30 years.",
            "Get pre-approved by at least 3 lenders — rates can vary by 0.5% or more, which adds up fast.",
            "Extra payments go directly to principal — even $100/month extra can cut years off a 30-year mortgage.",
          ],
        },
      },

      chart: {
        title: "Loan Balance Over Time",
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
          title: "What Is a Mortgage?",
          text: "A mortgage is a loan used to purchase real estate, where the property itself serves as collateral. The borrower agrees to repay the loan over a set period (typically 15 or 30 years) through monthly payments that include both principal and interest. In the United States, the 30-year fixed-rate mortgage is the most common type, representing roughly 70–90% of all home loans. Your monthly payment is determined by the loan amount, interest rate, and term length.",
        },
        piti: {
          title: "Understanding PITI: The Full Monthly Payment",
          text: "Your true monthly mortgage payment is more than just principal and interest. Lenders and financial advisors use the acronym PITI — Principal, Interest, Taxes, and Insurance — to describe the complete monthly housing cost. Property taxes are assessed annually by your local government (U.S. average: ~1.1% of home value). Homeowners insurance protects your property against damage (average: $1,500–$3,000/year). If your down payment is less than 20%, you'll also pay Private Mortgage Insurance (PMI), which protects the lender — not you — if you default.",
        },
        downPayment: {
          title: "How Much Should You Put Down?",
          text: "The traditional advice is 20% down to avoid PMI and secure the best interest rates. However, many loan programs accept much less: conventional loans allow as low as 3%, FHA loans require 3.5%, and VA/USDA loans may require 0%. A larger down payment reduces your monthly payment, total interest paid, and the risk of being 'underwater' (owing more than the home is worth). Use the 28/36 rule as a guideline: spend no more than 28% of gross monthly income on housing costs, and no more than 36% on total debt including housing.",
        },
        termComparison: {
          title: "15-Year vs. 30-Year Mortgage",
          text: "A 30-year mortgage offers lower monthly payments but costs significantly more in total interest. For example, a $300,000 loan at 6.5% costs about $1,896/month over 30 years (total interest: $382,633) versus $2,613/month over 15 years (total interest: $170,269). That's a $212,364 difference in interest. The 15-year term also typically comes with a lower interest rate (0.5–0.75% less). Choose 30 years if you need payment flexibility; choose 15 years if you can handle higher payments and want to build equity faster.",
        },
        amortization: {
          title: "How Amortization Works",
          text: "Early in your mortgage, most of each payment goes toward interest rather than reducing your loan balance. On a 30-year, $300,000 loan at 6.5%, your first payment allocates $1,625 to interest and only $271 to principal. By year 15, it flips — $963 goes to principal and $933 to interest. This is why extra payments in the early years are so powerful: every additional dollar goes directly to principal, saving you multiple dollars in future interest and potentially shaving years off your loan.",
        },
      },

      faqs: [
        {
          question: "How much house can I afford?",
          answer: "Use the 28/36 rule: your monthly housing costs (PITI + HOA) should not exceed 28% of your gross monthly income, and your total debt payments should stay below 36%. For example, if you earn $6,000/month gross, aim for a maximum housing payment of $1,680. Factor in property taxes, insurance, and PMI — not just the loan payment. Also consider closing costs (2–5% of home price), moving expenses, and an emergency fund covering 3–6 months of payments.",
        },
        {
          question: "What is PMI and how do I avoid it?",
          answer: "Private Mortgage Insurance (PMI) protects the lender — not you — if you default on the loan. It's typically required when your down payment is less than 20% of the home price. PMI costs 0.3–1.5% of the loan amount annually, adding $100–$300/month on a typical loan. To avoid PMI: put 20% or more down, use a piggyback loan (80/10/10), or choose a VA loan (no PMI required). If you already have PMI, request removal once your loan-to-value ratio drops below 80% — lenders must automatically cancel it at 78% LTV.",
        },
        {
          question: "Should I choose a fixed-rate or adjustable-rate mortgage?",
          answer: "A fixed-rate mortgage locks your interest rate for the entire loan term, providing predictable payments. An adjustable-rate mortgage (ARM) starts with a lower rate that adjusts after an initial period (typically 5, 7, or 10 years). ARMs can save money if you plan to sell or refinance before the adjustment period, but carry risk if rates rise. In a high-rate environment, ARMs may offer meaningful initial savings. In a low-rate environment, locking in a fixed rate provides long-term security.",
        },
        {
          question: "What fees should I expect at closing?",
          answer: "Closing costs typically run 2–5% of the home price and include: lender origination fees (0.5–1%), appraisal ($300–$600), title search and insurance ($500–$3,000), attorney fees, recording fees, and prepaid items (property tax and insurance escrow). On a $350,000 home, expect $7,000–$17,500 in closing costs. Some costs are negotiable, and sellers sometimes contribute toward closing costs as part of the deal. Always request a Loan Estimate from your lender for a detailed breakdown.",
        },
        {
          question: "How does property tax affect my monthly payment?",
          answer: "Property taxes are assessed annually by your local government based on your home's assessed value. The U.S. average effective rate is about 1.1%, but it varies dramatically by state — from 0.27% in Hawaii to 2.47% in New Jersey. On a $350,000 home at 1.2%, that's $4,200/year or $350/month added to your mortgage payment. Most lenders require an escrow account where 1/12 of your annual tax bill is collected each month and paid on your behalf.",
        },
        {
          question: "Is it worth paying extra toward my mortgage?",
          answer: "Extra payments can save substantial interest and shorten your loan term. On a $300,000 loan at 6.5% over 30 years, paying just $200 extra per month saves about $115,000 in interest and pays off the loan 7 years early. Even one extra payment per year (or biweekly payments) can cut 4–6 years off a 30-year mortgage. However, prioritize high-interest debt and retirement savings first — if your mortgage rate is 3–4%, investing the extra money may yield better returns.",
        },
        {
          question: "What is an amortization schedule?",
          answer: "An amortization schedule is a month-by-month table showing exactly how each payment is split between principal and interest, plus the remaining loan balance. It reveals that early payments are mostly interest (often 80%+ in year one), gradually shifting toward principal over time. Reviewing your amortization schedule helps you understand when you'll reach 20% equity (to remove PMI), how extra payments impact your payoff timeline, and the true cost of your loan over its lifetime.",
        },
        {
          question: "Can I use this calculator for mortgages outside the U.S.?",
          answer: "Yes — the core principal and interest calculation works universally for any fixed-rate amortizing loan. Select your local currency from the dropdown to see results in your currency. Note that property tax rates, insurance costs, and PMI rules vary by country. In many countries outside the U.S., mortgage terms, regulations, and typical structures differ (e.g., variable rates are more common in the UK and Australia). Adjust the inputs to match your local conditions for the most accurate estimate.",
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
    },
    es: {
      "name": "Calculadora de Hipoteca",
      "slug": "calculadora-hipoteca",
      "subtitle": "Estima tu pago mensual de hipoteca incluyendo capital, intereses, impuestos, seguro, PMI y HOA — con un cronograma de amortización completo.",
      "seo": {
        "title": "Calculadora de Hipoteca - Estimador de Pago Mensual y Amortización",
        "description": "Calcula tu pago mensual de hipoteca con impuestos de propiedad, seguro, PMI y cuotas HOA. Ve el cronograma de amortización, gráfico de desglose de pagos y compara escenarios de préstamos. Herramienta gratuita en línea.",
        "shortDescription": "Estima tu pago mensual de hipoteca con impuestos, seguro y PMI.",
        "keywords": [
          "calculadora de hipoteca",
          "calculadora de pago de hipoteca",
          "calculadora de préstamo hipotecario",
          "pago mensual de hipoteca",
          "calculadora de amortización de hipoteca",
          "calculadora de pago de casa",
          "calculadora de hipoteca con PMI",
          "calculadora de hipoteca con impuestos"
        ]
      },
      "inputs": {
        "homePrice": {
          "label": "Precio de la Casa",
          "helpText": "El precio total de compra de la propiedad"
        },
        "downPayment": {
          "label": "Pago Inicial",
          "helpText": "Dinero pagado por adelantado — 20% evita PMI, pero 3–10% es común para compradores primerizos"
        },
        "loanTerm": {
          "label": "Plazo del Préstamo",
          "helpText": "Duración del préstamo — 30 años es más común, 15 años ahorra en intereses"
        },
        "interestRate": {
          "label": "Tasa de Interés",
          "helpText": "Tasa de porcentaje anual — verifica las tasas actuales con tu prestamista o banco"
        },
        "includeTaxInsurance": {
          "label": "Incluir Impuestos y Seguro",
          "helpText": "Actívalo para agregar impuestos de propiedad y seguro de hogar a tu pago"
        },
        "propertyTaxRate": {
          "label": "Tasa de Impuesto de Propiedad",
          "helpText": "Impuesto anual de propiedad como porcentaje del valor de la casa — promedio de EE.UU. es cerca de 1.1%"
        },
        "annualInsurance": {
          "label": "Seguro Anual de Hogar",
          "helpText": "Prima anual de seguro de propietarios — promedio es $1,500–$3,000 dependiendo de la ubicación"
        },
        "includePmi": {
          "label": "Incluir PMI",
          "helpText": "El seguro hipotecario privado típicamente se requiere cuando el pago inicial es menos del 20%"
        },
        "pmiRate": {
          "label": "Tasa PMI",
          "helpText": "PMI anual como porcentaje del monto del préstamo — típicamente 0.3% a 1.5% basado en puntaje crediticio y LTV"
        },
        "includeHoa": {
          "label": "Incluir Cuotas HOA",
          "helpText": "Actívalo si la propiedad está en una asociación de propietarios"
        },
        "hoaMonthly": {
          "label": "Cuota Mensual HOA",
          "helpText": "Cuota mensual de la asociación de propietarios — cubre amenidades compartidas y mantenimiento"
        },
        "includeExtraPayment": {
          "label": "Pago Mensual Extra",
          "helpText": "Actívalo para ver cómo los pagos extra reducen el plazo de tu préstamo y ahorran en intereses"
        },
        "extraMonthlyPayment": {
          "label": "Monto de Pago Extra",
          "helpText": "Cantidad adicional pagada hacia el capital cada mes — incluso $100 extra puede ahorrar años"
        }
      },
      "presets": {
        "starterHome": {
          "label": "Casa Inicial",
          "description": "$250K, 10% inicial, 30 años, 6.5%"
        },
        "familyHome": {
          "label": "Casa Familiar",
          "description": "$450K, 20% inicial, 30 años, sin PMI"
        },
        "luxury": {
          "label": "Casa de Lujo",
          "description": "$800K, 25% inicial, 15 años, HOA"
        },
        "investment": {
          "label": "Inversión",
          "description": "$300K, 25% inicial, 30 años, 7%"
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
        "summary": "Tu pago mensual estimado es {monthlyPayment}. En {loanTerm}, pagarás {totalInterest} en intereses para un costo total de {totalCost}."
      },
      "results": {
        "monthlyPayment": {
          "label": "Pago Mensual"
        },
        "principalInterest": {
          "label": "Capital e Intereses"
        },
        "monthlyTax": {
          "label": "Impuesto Mensual"
        },
        "monthlyInsurance": {
          "label": "Seguro Mensual"
        },
        "monthlyPmi": {
          "label": "PMI Mensual"
        },
        "totalInterest": {
          "label": "Total de Intereses Pagados"
        },
        "totalPayments": {
          "label": "Total de Todos los Pagos"
        },
        "payoffDate": {
          "label": "Fecha de Liquidación"
        },
        "interestSaved": {
          "label": "Intereses Ahorrados"
        },
        "timeReduced": {
          "label": "Tiempo Ahorrado"
        }
      },
      "infoCards": {
        "breakdown": {
          "title": "Desglose del Pago",
          "items": [
            {
              "label": "Capital e Intereses",
              "valueKey": "principalInterest"
            },
            {
              "label": "Impuesto de Propiedad",
              "valueKey": "monthlyTax"
            },
            {
              "label": "Seguro de Hogar",
              "valueKey": "monthlyInsurance"
            },
            {
              "label": "PMI",
              "valueKey": "monthlyPmi"
            },
            {
              "label": "Cuotas HOA",
              "valueKey": "hoaMonthly"
            }
          ]
        },
        "details": {
          "title": "Detalles del Préstamo",
          "items": [
            {
              "label": "Monto del Préstamo",
              "valueKey": "loanAmount"
            },
            {
              "label": "% Pago Inicial",
              "valueKey": "downPaymentPercent"
            },
            {
              "label": "Relación Préstamo-Valor",
              "valueKey": "ltvRatio"
            },
            {
              "label": "Total de Todos los Pagos",
              "valueKey": "totalPayments"
            },
            {
              "label": "Fecha de Liquidación",
              "valueKey": "payoffDate"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Hipoteca",
          "items": [
            "Pon 20% de inicial para evitar PMI y obtener mejores tasas — incluso 1% menos de interés ahorra miles durante 30 años.",
            "Una hipoteca de 15 años tiene pagos más altos pero ahorra enormemente en intereses totales comparado con 30 años.",
            "Obtén pre-aprobación de al menos 3 prestamistas — las tasas pueden variar 0.5% o más, lo cual suma rápido.",
            "Los pagos extra van directamente al capital — incluso $100/mes extra puede reducir años de una hipoteca de 30 años."
          ]
        }
      },
      "chart": {
        "title": "Saldo del Préstamo a Través del Tiempo",
        "xLabel": "Año",
        "yLabel": "Cantidad",
        "series": {
          "principal": "Capital",
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
            "principal": "Capital",
            "interest": "Interés",
            "balance": "Saldo"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es una Hipoteca?",
          "text": "Una hipoteca es un préstamo usado para comprar bienes raíces, donde la propiedad misma sirve como garantía. El prestatario acepta pagar el préstamo durante un período establecido (típicamente 15 o 30 años) a través de pagos mensuales que incluyen tanto capital como intereses. En Estados Unidos, la hipoteca de tasa fija a 30 años es el tipo más común, representando aproximadamente 70–90% de todos los préstamos hipotecarios. Tu pago mensual se determina por el monto del préstamo, tasa de interés y duración del plazo."
        },
        "piti": {
          "title": "Entendiendo PITI: El Pago Mensual Completo",
          "text": "Tu verdadero pago mensual de hipoteca es más que solo capital e intereses. Los prestamistas y asesores financieros usan el acrónimo PITI — Principal, Intereses, Impuestos y Seguro — para describir el costo mensual completo de vivienda. Los impuestos de propiedad son evaluados anualmente por tu gobierno local (promedio de EE.UU.: ~1.1% del valor de la casa). El seguro de propietarios protege tu propiedad contra daños (promedio: $1,500–$3,000/año). Si tu pago inicial es menos del 20%, también pagarás Seguro Hipotecario Privado (PMI), que protege al prestamista — no a ti — si no pagas."
        },
        "downPayment": {
          "title": "¿Cuánto Deberías Poner de Inicial?",
          "text": "El consejo tradicional es 20% inicial para evitar PMI y asegurar las mejores tasas de interés. Sin embargo, muchos programas de préstamos aceptan mucho menos: préstamos convencionales permiten tan poco como 3%, préstamos FHA requieren 3.5%, y préstamos VA/USDA pueden requerir 0%. Un pago inicial mayor reduce tu pago mensual, intereses totales pagados, y el riesgo de estar 'bajo el agua' (deber más de lo que vale la casa). Usa la regla 28/36 como guía: gasta no más del 28% del ingreso bruto mensual en costos de vivienda, y no más del 36% en deuda total incluyendo vivienda."
        },
        "termComparison": {
          "title": "Hipoteca de 15 años vs. 30 años",
          "text": "Una hipoteca de 30 años ofrece pagos mensuales más bajos pero cuesta significativamente más en intereses totales. Por ejemplo, un préstamo de $300,000 al 6.5% cuesta alrededor de $1,896/mes durante 30 años (interés total: $382,633) versus $2,613/mes durante 15 años (interés total: $170,269). Esa es una diferencia de $212,364 en intereses. El plazo de 15 años también típicamente viene con una tasa de interés menor (0.5–0.75% menos). Elige 30 años si necesitas flexibilidad de pagos; elige 15 años si puedes manejar pagos más altos y quieres construir patrimonio más rápido."
        },
        "amortization": {
          "title": "Cómo Funciona la Amortización",
          "text": "Al principio de tu hipoteca, la mayor parte de cada pago va hacia intereses en lugar de reducir el saldo de tu préstamo. En una hipoteca de 30 años de $300,000 al 6.5%, tu primer pago asigna $1,625 a intereses y solo $271 a capital. Para el año 15, se voltea — $963 va a capital y $933 a intereses. Por esto los pagos extra en los primeros años son tan poderosos: cada dólar adicional va directamente al capital, ahorrándote múltiples dólares en intereses futuros y potencialmente reduciendo años de tu préstamo."
        }
      },
      "faqs": [
        {
          "question": "¿Cuánta casa puedo permitirme?",
          "answer": "Usa la regla 28/36: tus costos mensuales de vivienda (PITI + HOA) no deben exceder el 28% de tu ingreso bruto mensual, y tus pagos totales de deuda deben mantenerse debajo del 36%. Por ejemplo, si ganas $6,000/mes bruto, apunta a un pago máximo de vivienda de $1,680. Considera impuestos de propiedad, seguro y PMI — no solo el pago del préstamo. También considera costos de cierre (2–5% del precio de la casa), gastos de mudanza y un fondo de emergencia cubriendo 3–6 meses de pagos."
        },
        {
          "question": "¿Qué es PMI y cómo lo evito?",
          "answer": "El Seguro Hipotecario Privado (PMI) protege al prestamista — no a ti — si no pagas el préstamo. Típicamente se requiere cuando tu pago inicial es menos del 20% del precio de la casa. PMI cuesta 0.3–1.5% del monto del préstamo anualmente, agregando $100–$300/mes en un préstamo típico. Para evitar PMI: pon 20% o más de inicial, usa un préstamo piggyback (80/10/10), o elige un préstamo VA (no requiere PMI). Si ya tienes PMI, solicita la remoción una vez que tu relación préstamo-valor baje del 80% — los prestamistas deben cancelarlo automáticamente al 78% LTV."
        },
        {
          "question": "¿Debería elegir una hipoteca de tasa fija o ajustable?",
          "answer": "Una hipoteca de tasa fija bloquea tu tasa de interés por todo el plazo del préstamo, proporcionando pagos predecibles. Una hipoteca de tasa ajustable (ARM) comienza con una tasa menor que se ajusta después de un período inicial (típicamente 5, 7 o 10 años). Los ARM pueden ahorrar dinero si planeas vender o refinanciar antes del período de ajuste, pero conllevan riesgo si las tasas suben. En un ambiente de tasas altas, los ARM pueden ofrecer ahorros iniciales significativos. En un ambiente de tasas bajas, bloquear una tasa fija proporciona seguridad a largo plazo."
        },
        {
          "question": "¿Qué tarifas debo esperar al cierre?",
          "answer": "Los costos de cierre típicamente van del 2–5% del precio de la casa e incluyen: tarifas de originación del prestamista (0.5–1%), avalúo ($300–$600), búsqueda de título y seguro ($500–$3,000), honorarios de abogado, tarifas de registro, y artículos prepagados (custodia de impuesto de propiedad y seguro). En una casa de $350,000, espera $7,000–$17,500 en costos de cierre. Algunos costos son negociables, y los vendedores a veces contribuyen hacia los costos de cierre como parte del trato. Siempre solicita un Estimado de Préstamo de tu prestamista para un desglose detallado."
        },
        {
          "question": "¿Cómo afecta el impuesto de propiedad mi pago mensual?",
          "answer": "Los impuestos de propiedad son evaluados anualmente por tu gobierno local basado en el valor tasado de tu casa. La tasa efectiva promedio de EE.UU. es cerca del 1.1%, pero varía dramáticamente por estado — desde 0.27% en Hawái hasta 2.47% en Nueva Jersey. En una casa de $350,000 al 1.2%, eso es $4,200/año o $350/mes agregados a tu pago de hipoteca. La mayoría de los prestamistas requieren una cuenta de custodia donde 1/12 de tu cuenta anual de impuestos se cobra cada mes y se paga en tu nombre."
        },
        {
          "question": "¿Vale la pena pagar extra hacia mi hipoteca?",
          "answer": "Los pagos extra pueden ahorrar intereses sustanciales y acortar el plazo de tu préstamo. En un préstamo de $300,000 al 6.5% durante 30 años, pagar solo $200 extra por mes ahorra aproximadamente $115,000 en intereses y paga el préstamo 7 años antes. Incluso un pago extra por año (o pagos quincenales) puede reducir 4–6 años de una hipoteca de 30 años. Sin embargo, prioriza deuda de alto interés y ahorros de jubilación primero — si tu tasa de hipoteca es 3–4%, invertir el dinero extra puede generar mejores rendimientos."
        },
        {
          "question": "¿Qué es un cronograma de amortización?",
          "answer": "Un cronograma de amortización es una tabla mes a mes que muestra exactamente cómo cada pago se divide entre capital e intereses, más el saldo restante del préstamo. Revela que los pagos tempranos son mayormente intereses (a menudo 80%+ en el primer año), gradualmente cambiando hacia el capital con el tiempo. Revisar tu cronograma de amortización te ayuda a entender cuándo alcanzarás 20% de patrimonio (para remover PMI), cómo los pagos extra impactan tu cronograma de liquidación, y el costo verdadero de tu préstamo durante su vida útil."
        },
        {
          "question": "¿Puedo usar esta calculadora para hipotecas fuera de EE.UU.?",
          "answer": "Sí — el cálculo central de capital e intereses funciona universalmente para cualquier préstamo amortizable de tasa fija. Selecciona tu moneda local del menú desplegable para ver resultados en tu moneda. Nota que las tasas de impuestos de propiedad, costos de seguro y reglas PMI varían por país. En muchos países fuera de EE.UU., los términos de hipoteca, regulaciones y estructuras típicas difieren (ej., las tasas variables son más comunes en Reino Unido y Australia). Ajusta los valores para que coincidan con tus condiciones locales para el estimado más preciso."
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
      "name": "Calculadora de Financiamento Imobiliário",
      "slug": "calculadora-financiamento-imobiliario",
      "subtitle": "Estime sua prestação mensal incluindo principal, juros, impostos, seguro, PMI e taxa de condomínio — com cronograma completo de amortização.",
      "seo": {
        "title": "Calculadora de Financiamento Imobiliário - Estimativa de Prestação Mensal e Amortização",
        "description": "Calcule sua prestação mensal de financiamento com impostos sobre propriedade, seguro, PMI e taxas de condomínio. Visualize o cronograma de amortização, gráfico detalhado da prestação e compare cenários de empréstimo. Ferramenta online gratuita.",
        "shortDescription": "Estime sua prestação mensal de financiamento com impostos, seguro e PMI.",
        "keywords": [
          "calculadora financiamento imobiliário",
          "calculadora prestação financiamento",
          "calculadora empréstimo casa própria",
          "prestação mensal financiamento",
          "calculadora amortização financiamento",
          "calculadora prestação casa",
          "calculadora financiamento com PMI",
          "calculadora financiamento com impostos"
        ]
      },
      "inputs": {
        "homePrice": {
          "label": "Preço do Imóvel",
          "helpText": "O preço total de compra da propriedade"
        },
        "downPayment": {
          "label": "Entrada",
          "helpText": "Valor pago à vista — 20% evita PMI, mas 3–10% é comum para compradores de primeira viagem"
        },
        "loanTerm": {
          "label": "Prazo do Financiamento",
          "helpText": "Duração do empréstimo — 30 anos é mais comum, 15 anos economiza em juros"
        },
        "interestRate": {
          "label": "Taxa de Juros",
          "helpText": "Taxa percentual anual — consulte as taxas atuais com seu banco ou financiadora"
        },
        "includeTaxInsurance": {
          "label": "Incluir Impostos e Seguro",
          "helpText": "Ative para adicionar imposto sobre propriedade e seguro residencial à sua prestação"
        },
        "propertyTaxRate": {
          "label": "Taxa de Imposto sobre Propriedade",
          "helpText": "Imposto anual sobre propriedade como percentual do valor do imóvel — média nos EUA é cerca de 1,1%"
        },
        "annualInsurance": {
          "label": "Seguro Residencial Anual",
          "helpText": "Prêmio anual do seguro residencial — média é R$ 1.500–R$ 3.000 dependendo da localização"
        },
        "includePmi": {
          "label": "Incluir PMI",
          "helpText": "Seguro hipotecário privado é normalmente obrigatório quando a entrada é menor que 20%"
        },
        "pmiRate": {
          "label": "Taxa PMI",
          "helpText": "PMI anual como percentual do valor do empréstimo — normalmente 0,3% a 1,5% baseado no score de crédito e LTV"
        },
        "includeHoa": {
          "label": "Incluir Taxa de Condomínio",
          "helpText": "Ative se a propriedade está em um condomínio fechado"
        },
        "hoaMonthly": {
          "label": "Taxa Mensal de Condomínio",
          "helpText": "Taxa mensal do condomínio — cobre comodidades compartilhadas e manutenção"
        },
        "includeExtraPayment": {
          "label": "Pagamento Extra Mensal",
          "helpText": "Ative para ver como pagamentos extras reduzem o prazo do empréstimo e economizam juros"
        },
        "extraMonthlyPayment": {
          "label": "Valor do Pagamento Extra",
          "helpText": "Valor adicional pago ao principal mensalmente — até mesmo R$ 100 extras podem economizar anos"
        }
      },
      "presets": {
        "starterHome": {
          "label": "Casa Inicial",
          "description": "R$ 250mil, 10% entrada, 30 anos, 6,5%"
        },
        "familyHome": {
          "label": "Casa Familiar",
          "description": "R$ 450mil, 20% entrada, 30 anos, sem PMI"
        },
        "luxury": {
          "label": "Casa de Luxo",
          "description": "R$ 800mil, 25% entrada, 15 anos, condomínio"
        },
        "investment": {
          "label": "Investimento",
          "description": "R$ 300mil, 25% entrada, 30 anos, 7%"
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
        "summary": "Sua prestação mensal estimada é {monthlyPayment}. Em {loanTerm}, você pagará {totalInterest} em juros para um custo total de {totalCost}."
      },
      "results": {
        "monthlyPayment": {
          "label": "Prestação Mensal"
        },
        "principalInterest": {
          "label": "Principal e Juros"
        },
        "monthlyTax": {
          "label": "Imposto Mensal"
        },
        "monthlyInsurance": {
          "label": "Seguro Mensal"
        },
        "monthlyPmi": {
          "label": "PMI Mensal"
        },
        "totalInterest": {
          "label": "Total de Juros Pagos"
        },
        "totalPayments": {
          "label": "Total de Todos os Pagamentos"
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
      "infoCards": {
        "breakdown": {
          "title": "Detalhamento da Prestação",
          "items": [
            {
              "label": "Principal e Juros",
              "valueKey": "principalInterest"
            },
            {
              "label": "Imposto sobre Propriedade",
              "valueKey": "monthlyTax"
            },
            {
              "label": "Seguro Residencial",
              "valueKey": "monthlyInsurance"
            },
            {
              "label": "PMI",
              "valueKey": "monthlyPmi"
            },
            {
              "label": "Taxa de Condomínio",
              "valueKey": "hoaMonthly"
            }
          ]
        },
        "details": {
          "title": "Detalhes do Empréstimo",
          "items": [
            {
              "label": "Valor do Empréstimo",
              "valueKey": "loanAmount"
            },
            {
              "label": "% de Entrada",
              "valueKey": "downPaymentPercent"
            },
            {
              "label": "Relação Empréstimo-Valor",
              "valueKey": "ltvRatio"
            },
            {
              "label": "Total de Todos os Pagamentos",
              "valueKey": "totalPayments"
            },
            {
              "label": "Data de Quitação",
              "valueKey": "payoffDate"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Financiamento",
          "items": [
            "Dê 20% de entrada para evitar PMI e obter melhores taxas — até mesmo 1% menos de juros economiza milhares em 30 anos.",
            "Um financiamento de 15 anos tem prestações maiores mas economiza massivamente no total de juros comparado aos 30 anos.",
            "Seja pré-aprovado por pelo menos 3 bancos — as taxas podem variar 0,5% ou mais, o que faz muita diferença.",
            "Pagamentos extras vão diretamente ao principal — até mesmo R$ 100/mês extras podem cortar anos de um financiamento de 30 anos."
          ]
        }
      },
      "chart": {
        "title": "Saldo do Empréstimo ao Longo do Tempo",
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
          "title": "O que é um Financiamento Imobiliário?",
          "text": "Um financiamento imobiliário é um empréstimo usado para comprar imóveis, onde a própria propriedade serve como garantia. O mutuário concorda em reembolsar o empréstimo durante um período determinado (normalmente 15 ou 30 anos) através de prestações mensais que incluem principal e juros. No Brasil, o financiamento de 30 anos com taxa fixa é o tipo mais comum. Sua prestação mensal é determinada pelo valor do empréstimo, taxa de juros e prazo."
        },
        "piti": {
          "title": "Entendendo PITI: A Prestação Mensal Completa",
          "text": "Sua verdadeira prestação mensal de financiamento é mais que apenas principal e juros. Bancos e consultores financeiros usam a sigla PITI — Principal, Juros, Impostos e Seguro — para descrever o custo habitacional mensal completo. Impostos sobre propriedade são cobrados anualmente pelo governo local (média EUA: ~1,1% do valor do imóvel). O seguro residencial protege sua propriedade contra danos (média: R$ 1.500–R$ 3.000/ano). Se sua entrada for menor que 20%, você também pagará Seguro Hipotecário Privado (PMI), que protege o banco — não você — se você não conseguir pagar."
        },
        "downPayment": {
          "title": "Quanto Você Deve Dar de Entrada?",
          "text": "O conselho tradicional é 20% de entrada para evitar PMI e garantir as melhores taxas de juros. No entanto, muitos programas de empréstimo aceitam muito menos: empréstimos convencionais permitem até 3%, empréstimos FHA exigem 3,5%, e empréstimos VA/USDA podem exigir 0%. Uma entrada maior reduz sua prestação mensal, total de juros pagos e o risco de estar 'negativo' (devendo mais que o valor do imóvel). Use a regra 28/36 como orientação: gaste no máximo 28% da renda mensal bruta em custos habitacionais, e no máximo 36% em dívidas totais incluindo habitação."
        },
        "termComparison": {
          "title": "Financiamento de 15 Anos vs. 30 Anos",
          "text": "Um financiamento de 30 anos oferece prestações mensais menores mas custa significativamente mais em juros totais. Por exemplo, um empréstimo de R$ 300.000 a 6,5% custa cerca de R$ 1.896/mês em 30 anos (juros totais: R$ 382.633) versus R$ 2.613/mês em 15 anos (juros totais: R$ 170.269). Isso é uma diferença de R$ 212.364 em juros. O prazo de 15 anos também normalmente vem com taxa de juros menor (0,5–0,75% menos). Escolha 30 anos se precisar de flexibilidade no pagamento; escolha 15 anos se conseguir lidar com prestações maiores e quiser construir patrimônio mais rápido."
        },
        "amortization": {
          "title": "Como Funciona a Amortização",
          "text": "No início do seu financiamento, a maior parte de cada prestação vai para juros em vez de reduzir o saldo do empréstimo. Em um empréstimo de 30 anos de R$ 300.000 a 6,5%, sua primeira prestação aloca R$ 1.625 para juros e apenas R$ 271 para principal. No ano 15, isso se inverte — R$ 963 vão para principal e R$ 933 para juros. É por isso que pagamentos extras nos primeiros anos são tão poderosos: cada real adicional vai diretamente ao principal, economizando múltiplos reais em juros futuros e potencialmente cortando anos do seu empréstimo."
        }
      },
      "faqs": [
        {
          "question": "Que valor de casa posso pagar?",
          "answer": "Use a regra 28/36: seus custos habitacionais mensais (PITI + condomínio) não devem exceder 28% de sua renda mensal bruta, e seus pagamentos totais de dívida devem ficar abaixo de 36%. Por exemplo, se você ganha R$ 6.000/mês brutos, mire num pagamento habitacional máximo de R$ 1.680. Considere impostos sobre propriedade, seguro e PMI — não apenas a prestação do empréstimo. Também considere custos de fechamento (2–5% do preço da casa), despesas de mudança e fundo de emergência cobrindo 3–6 meses de prestações."
        },
        {
          "question": "O que é PMI e como evitá-lo?",
          "answer": "Seguro Hipotecário Privado (PMI) protege o banco — não você — se você não conseguir pagar o empréstimo. É normalmente obrigatório quando sua entrada é menor que 20% do preço da casa. PMI custa 0,3–1,5% do valor do empréstimo anualmente, adicionando R$ 100–R$ 300/mês num empréstimo típico. Para evitar PMI: dê 20% ou mais de entrada, use um empréstimo piggyback (80/10/10), ou escolha um empréstimo VA (sem PMI obrigatório). Se já tem PMI, solicite remoção quando sua relação empréstimo-valor cair abaixo de 80% — bancos devem cancelar automaticamente em 78% LTV."
        },
        {
          "question": "Devo escolher um financiamento de taxa fixa ou variável?",
          "answer": "Um financiamento de taxa fixa trava sua taxa de juros por todo o prazo do empréstimo, fornecendo prestações previsíveis. Um financiamento de taxa variável (ARM) começa com uma taxa menor que se ajusta após um período inicial (normalmente 5, 7 ou 10 anos). ARMs podem economizar dinheiro se você planeja vender ou refinanciar antes do período de ajuste, mas carregam risco se as taxas subirem. Num ambiente de taxas altas, ARMs podem oferecer economias iniciais significativas. Num ambiente de taxas baixas, travar numa taxa fixa fornece segurança a longo prazo."
        },
        {
          "question": "Que taxas devo esperar no fechamento?",
          "answer": "Custos de fechamento normalmente variam de 2–5% do preço da casa e incluem: taxas de originação do banco (0,5–1%), avaliação (R$ 300–R$ 600), busca e seguro de título (R$ 500–R$ 3.000), honorários advocatícios, taxas de registro e itens pré-pagos (caução de imposto sobre propriedade e seguro). Numa casa de R$ 350.000, espere R$ 7.000–R$ 17.500 em custos de fechamento. Alguns custos são negociáveis, e vendedores às vezes contribuem com custos de fechamento como parte do negócio. Sempre solicite uma Estimativa de Empréstimo do seu banco para um detalhamento completo."
        },
        {
          "question": "Como o imposto sobre propriedade afeta minha prestação mensal?",
          "answer": "Impostos sobre propriedade são cobrados anualmente pelo seu governo local baseado no valor avaliado do seu imóvel. A taxa efetiva média nos EUA é cerca de 1,1%, mas varia drasticamente por estado — de 0,27% no Havaí a 2,47% em Nova Jersey. Numa casa de R$ 350.000 a 1,2%, isso é R$ 4.200/ano ou R$ 350/mês adicionados à sua prestação de financiamento. A maioria dos bancos exige uma conta caução onde 1/12 da sua conta anual de imposto é coletada mensalmente e paga em seu nome."
        },
        {
          "question": "Vale a pena pagar extra no meu financiamento?",
          "answer": "Pagamentos extras podem economizar juros substanciais e encurtar o prazo do empréstimo. Num empréstimo de R$ 300.000 a 6,5% em 30 anos, pagando apenas R$ 200 extras por mês economiza cerca de R$ 115.000 em juros e quita o empréstimo 7 anos antes. Até mesmo um pagamento extra por ano (ou pagamentos quinzenais) pode cortar 4–6 anos de um financiamento de 30 anos. No entanto, priorize dívidas de juros altos e poupança para aposentadoria primeiro — se sua taxa de financiamento for 3–4%, investir o dinheiro extra pode render melhores retornos."
        },
        {
          "question": "O que é um cronograma de amortização?",
          "answer": "Um cronograma de amortização é uma tabela mês a mês mostrando exatamente como cada prestação é dividida entre principal e juros, mais o saldo remanescente do empréstimo. Ele revela que prestações iniciais são principalmente juros (frequentemente 80%+ no primeiro ano), gradualmente mudando para principal ao longo do tempo. Revisar seu cronograma de amortização ajuda você a entender quando alcançará 20% de patrimônio (para remover PMI), como pagamentos extras impactam seu cronograma de quitação e o verdadeiro custo do seu empréstimo durante sua vida útil."
        },
        {
          "question": "Posso usar esta calculadora para financiamentos fora do Brasil?",
          "answer": "Sim — o cálculo central de principal e juros funciona universalmente para qualquer empréstimo amortizado de taxa fixa. Selecione sua moeda local no dropdown para ver resultados na sua moeda. Note que taxas de imposto sobre propriedade, custos de seguro e regras de PMI variam por país. Em muitos países fora do Brasil, prazos de financiamento, regulamentações e estruturas típicas diferem (ex: taxas variáveis são mais comuns no Reino Unido e Austrália). Ajuste as entradas para combinar com suas condições locais para a estimativa mais precisa."
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
      "name": "Calculateur Hypothécaire",
      "slug": "calculateur-hypotheque",
      "subtitle": "Estimez votre paiement hypothécaire mensuel incluant capital, intérêts, taxes, assurance, PAH et frais de copropriété — avec un tableau d'amortissement complet.",
      "seo": {
        "title": "Calculateur Hypothécaire - Estimateur de Paiement Mensuel et Amortissement",
        "description": "Calculez votre paiement hypothécaire mensuel avec taxes foncières, assurance, PAH et frais de copropriété. Consultez le tableau d'amortissement, graphique de répartition des paiements et comparez les scénarios de prêt. Outil en ligne gratuit.",
        "shortDescription": "Estimez votre paiement hypothécaire mensuel avec taxes, assurance et PAH.",
        "keywords": [
          "calculateur hypothécaire",
          "calculateur paiement hypothèque",
          "calculateur prêt immobilier",
          "paiement hypothécaire mensuel",
          "calculateur amortissement hypothèque",
          "calculateur paiement maison",
          "calculateur hypothèque avec PAH",
          "calculateur hypothèque avec taxes"
        ]
      },
      "inputs": {
        "homePrice": {
          "label": "Prix de la Maison",
          "helpText": "Le prix d'achat total de la propriété"
        },
        "downPayment": {
          "label": "Mise de Fonds",
          "helpText": "Montant payé comptant à l'avance — 20% évite la PAH, mais 3–10% est courant pour les premiers acheteurs"
        },
        "loanTerm": {
          "label": "Durée du Prêt",
          "helpText": "Durée du prêt — 30 ans est le plus courant, 15 ans économise sur les intérêts"
        },
        "interestRate": {
          "label": "Taux d'Intérêt",
          "helpText": "Taux annuel en pourcentage — vérifiez les taux actuels auprès de votre prêteur ou banque"
        },
        "includeTaxInsurance": {
          "label": "Inclure Taxes et Assurance",
          "helpText": "Activez pour ajouter la taxe foncière et l'assurance habitation à votre paiement"
        },
        "propertyTaxRate": {
          "label": "Taux de Taxe Foncière",
          "helpText": "Taxe foncière annuelle en pourcentage de la valeur de la maison — moyenne américaine environ 1,1%"
        },
        "annualInsurance": {
          "label": "Assurance Habitation Annuelle",
          "helpText": "Prime d'assurance habitation annuelle — moyenne de 1 500$–3 000$ selon l'emplacement"
        },
        "includePmi": {
          "label": "Inclure PAH",
          "helpText": "L'assurance hypothécaire privée est généralement requise quand la mise de fonds est inférieure à 20%"
        },
        "pmiRate": {
          "label": "Taux PAH",
          "helpText": "PAH annuelle en pourcentage du montant du prêt — typiquement 0,3% à 1,5% selon la cote de crédit et le ratio prêt-valeur"
        },
        "includeHoa": {
          "label": "Inclure Frais de Copropriété",
          "helpText": "Activez si la propriété est dans une association de copropriétaires"
        },
        "hoaMonthly": {
          "label": "Frais de Copropriété Mensuels",
          "helpText": "Frais mensuels d'association de copropriétaires — couvre les équipements partagés et l'entretien"
        },
        "includeExtraPayment": {
          "label": "Paiement Mensuel Supplémentaire",
          "helpText": "Activez pour voir comment les paiements supplémentaires réduisent la durée de votre prêt et économisent sur les intérêts"
        },
        "extraMonthlyPayment": {
          "label": "Montant de Paiement Supplémentaire",
          "helpText": "Montant additionnel payé vers le capital chaque mois — même 100$ supplémentaires peuvent économiser des années"
        }
      },
      "presets": {
        "starterHome": {
          "label": "Première Maison",
          "description": "250 000$, 10% de mise de fonds, 30 ans, 6,5%"
        },
        "familyHome": {
          "label": "Maison Familiale",
          "description": "450 000$, 20% de mise de fonds, 30 ans, sans PAH"
        },
        "luxury": {
          "label": "Maison de Luxe",
          "description": "800 000$, 25% de mise de fonds, 15 ans, copropriété"
        },
        "investment": {
          "label": "Investissement",
          "description": "300 000$, 25% de mise de fonds, 30 ans, 7%"
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
      "results": {
        "monthlyPayment": {
          "label": "Paiement Mensuel"
        },
        "principalInterest": {
          "label": "Capital et Intérêts"
        },
        "monthlyTax": {
          "label": "Taxe Mensuelle"
        },
        "monthlyInsurance": {
          "label": "Assurance Mensuelle"
        },
        "monthlyPmi": {
          "label": "PAH Mensuelle"
        },
        "totalInterest": {
          "label": "Total des Intérêts Payés"
        },
        "totalPayments": {
          "label": "Total de Tous les Paiements"
        },
        "payoffDate": {
          "label": "Date de Remboursement"
        },
        "interestSaved": {
          "label": "Intérêts Économisés"
        },
        "timeReduced": {
          "label": "Temps Économisé"
        }
      },
      "infoCards": {
        "breakdown": {
          "title": "Répartition du Paiement",
          "items": [
            {
              "label": "Capital et Intérêts",
              "valueKey": "principalInterest"
            },
            {
              "label": "Taxe Foncière",
              "valueKey": "monthlyTax"
            },
            {
              "label": "Assurance Habitation",
              "valueKey": "monthlyInsurance"
            },
            {
              "label": "PAH",
              "valueKey": "monthlyPmi"
            },
            {
              "label": "Frais de Copropriété",
              "valueKey": "hoaMonthly"
            }
          ]
        },
        "details": {
          "title": "Détails du Prêt",
          "items": [
            {
              "label": "Montant du Prêt",
              "valueKey": "loanAmount"
            },
            {
              "label": "% Mise de Fonds",
              "valueKey": "downPaymentPercent"
            },
            {
              "label": "Ratio Prêt-Valeur",
              "valueKey": "ltvRatio"
            },
            {
              "label": "Total de Tous les Paiements",
              "valueKey": "totalPayments"
            },
            {
              "label": "Date de Remboursement",
              "valueKey": "payoffDate"
            }
          ]
        },
        "tips": {
          "title": "Conseils Hypothécaires",
          "items": [
            "Mettez 20% de mise de fonds pour éviter la PAH et obtenir de meilleurs taux — même 1% d'intérêt en moins économise des milliers sur 30 ans.",
            "Une hypothèque de 15 ans a des paiements plus élevés mais économise massivement sur les intérêts totaux comparée à 30 ans.",
            "Obtenez une pré-approbation d'au moins 3 prêteurs — les taux peuvent varier de 0,5% ou plus, ce qui s'accumule rapidement.",
            "Les paiements supplémentaires vont directement au capital — même 100$/mois supplémentaires peuvent retrancher des années d'une hypothèque de 30 ans."
          ]
        }
      },
      "chart": {
        "title": "Solde du Prêt dans le Temps",
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
          "title": "Qu'est-ce qu'une Hypothèque ?",
          "text": "Une hypothèque est un prêt utilisé pour acheter un bien immobilier, où la propriété elle-même sert de garantie. L'emprunteur accepte de rembourser le prêt sur une période déterminée (généralement 15 ou 30 ans) par des paiements mensuels qui incluent le capital et les intérêts. Aux États-Unis, l'hypothèque à taux fixe de 30 ans est le type le plus courant, représentant environ 70–90% de tous les prêts immobiliers. Votre paiement mensuel est déterminé par le montant du prêt, le taux d'intérêt et la durée du terme."
        },
        "piti": {
          "title": "Comprendre CTAI : Le Paiement Mensuel Complet",
          "text": "Votre vrai paiement hypothécaire mensuel est plus que juste le capital et les intérêts. Les prêteurs et conseillers financiers utilisent l'acronyme CTAI — Capital, Taxe, Assurance et Intérêts — pour décrire le coût complet mensuel du logement. Les taxes foncières sont évaluées annuellement par votre gouvernement local (moyenne américaine : ~1,1% de la valeur de la maison). L'assurance habitation protège votre propriété contre les dommages (moyenne : 1 500$–3 000$/an). Si votre mise de fonds est inférieure à 20%, vous paierez aussi l'Assurance Hypothécaire Privée (PAH), qui protège le prêteur — pas vous — si vous faites défaut."
        },
        "downPayment": {
          "title": "Combien Devriez-vous Mettre de Mise de Fonds ?",
          "text": "Le conseil traditionnel est de 20% de mise de fonds pour éviter la PAH et obtenir les meilleurs taux d'intérêt. Cependant, plusieurs programmes de prêt acceptent beaucoup moins : les prêts conventionnels permettent aussi peu que 3%, les prêts FHA exigent 3,5%, et les prêts VA/USDA peuvent ne requérir 0%. Une mise de fonds plus importante réduit votre paiement mensuel, les intérêts totaux payés, et le risque d'être 'sous l'eau' (devoir plus que la valeur de la maison). Utilisez la règle 28/36 comme guide : dépensez pas plus de 28% du revenu brut mensuel sur les coûts de logement, et pas plus de 36% sur la dette totale incluant le logement."
        },
        "termComparison": {
          "title": "Hypothèque de 15 ans vs 30 ans",
          "text": "Une hypothèque de 30 ans offre des paiements mensuels plus bas mais coûte significativement plus en intérêts totaux. Par exemple, un prêt de 300 000$ à 6,5% coûte environ 1 896$/mois sur 30 ans (intérêts totaux : 382 633$) versus 2 613$/mois sur 15 ans (intérêts totaux : 170 269$). C'est une différence de 212 364$ en intérêts. Le terme de 15 ans vient aussi typiquement avec un taux d'intérêt plus bas (0,5–0,75% de moins). Choisissez 30 ans si vous avez besoin de flexibilité de paiement ; choisissez 15 ans si vous pouvez gérer des paiements plus élevés et voulez bâtir l'équité plus rapidement."
        },
        "amortization": {
          "title": "Comment Fonctionne l'Amortissement",
          "text": "Tôt dans votre hypothèque, la plupart de chaque paiement va vers les intérêts plutôt que de réduire votre solde de prêt. Sur un prêt de 30 ans de 300 000$ à 6,5%, votre premier paiement alloue 1 625$ aux intérêts et seulement 271$ au capital. À l'année 15, ça s'inverse — 963$ va au capital et 933$ aux intérêts. C'est pourquoi les paiements supplémentaires dans les premières années sont si puissants : chaque dollar additionnel va directement au capital, vous économisant plusieurs dollars en intérêts futurs et potentiellement retranchant des années de votre prêt."
        }
      },
      "faqs": [
        {
          "question": "Combien de maison puis-je me permettre ?",
          "answer": "Utilisez la règle 28/36 : vos coûts mensuels de logement (CTAI + copropriété) ne devraient pas dépasser 28% de votre revenu brut mensuel, et vos paiements de dette totaux devraient rester sous 36%. Par exemple, si vous gagnez 6 000$/mois brut, visez un paiement de logement maximum de 1 680$. Tenez compte des taxes foncières, assurance et PAH — pas juste le paiement de prêt. Considérez aussi les frais de clôture (2–5% du prix de la maison), frais de déménagement, et un fonds d'urgence couvrant 3–6 mois de paiements."
        },
        {
          "question": "Qu'est-ce que la PAH et comment l'éviter ?",
          "answer": "L'Assurance Hypothécaire Privée (PAH) protège le prêteur — pas vous — si vous faites défaut sur le prêt. Elle est typiquement requise quand votre mise de fonds est inférieure à 20% du prix de la maison. La PAH coûte 0,3–1,5% du montant du prêt annuellement, ajoutant 100$–300$/mois sur un prêt typique. Pour éviter la PAH : mettez 20% ou plus de mise de fonds, utilisez un prêt piggyback (80/10/10), ou choisissez un prêt VA (pas de PAH requise). Si vous avez déjà la PAH, demandez le retrait une fois que votre ratio prêt-valeur tombe sous 80% — les prêteurs doivent automatiquement l'annuler à 78% RPV."
        },
        {
          "question": "Devrais-je choisir une hypothèque à taux fixe ou variable ?",
          "answer": "Une hypothèque à taux fixe verrouille votre taux d'intérêt pour toute la durée du prêt, fournissant des paiements prévisibles. Une hypothèque à taux variable (ATV) commence avec un taux plus bas qui s'ajuste après une période initiale (typiquement 5, 7 ou 10 ans). Les ATV peuvent économiser de l'argent si vous planifiez vendre ou refinancer avant la période d'ajustement, mais portent un risque si les taux montent. Dans un environnement de taux élevés, les ATV peuvent offrir des économies initiales significatives. Dans un environnement de taux bas, verrouiller un taux fixe fournit une sécurité à long terme."
        },
        {
          "question": "Quels frais devrais-je m'attendre à la clôture ?",
          "answer": "Les frais de clôture s'élèvent typiquement à 2–5% du prix de la maison et incluent : frais d'origine du prêteur (0,5–1%), évaluation (300$–600$), recherche et assurance titre (500$–3 000$), frais d'avocat, frais d'enregistrement, et items prépayés (séquestre de taxe foncière et assurance). Sur une maison de 350 000$, attendez-vous à 7 000$–17 500$ en frais de clôture. Certains coûts sont négociables, et les vendeurs contribuent parfois vers les frais de clôture dans le cadre de l'entente. Demandez toujours une Estimation de Prêt de votre prêteur pour une ventilation détaillée."
        },
        {
          "question": "Comment la taxe foncière affecte-t-elle mon paiement mensuel ?",
          "answer": "Les taxes foncières sont évaluées annuellement par votre gouvernement local basé sur la valeur évaluée de votre maison. Le taux effectif moyen américain est d'environ 1,1%, mais varie dramatiquement par état — de 0,27% à Hawaii à 2,47% au New Jersey. Sur une maison de 350 000$ à 1,2%, c'est 4 200$/an ou 350$/mois ajouté à votre paiement hypothécaire. La plupart des prêteurs exigent un compte séquestre où 1/12 de votre facture de taxe annuelle est collectée chaque mois et payée en votre nom."
        },
        {
          "question": "Vaut-il la peine de payer supplémentaire vers mon hypothèque ?",
          "answer": "Les paiements supplémentaires peuvent économiser des intérêts substantiels et raccourcir votre terme de prêt. Sur un prêt de 300 000$ à 6,5% sur 30 ans, payer juste 200$ supplémentaires par mois économise environ 115 000$ en intérêts et rembourse le prêt 7 ans plus tôt. Même un paiement supplémentaire par année (ou paiements bihebdomadaires) peut retrancher 4–6 ans d'une hypothèque de 30 ans. Cependant, priorisez la dette à intérêt élevé et l'épargne-retraite d'abord — si votre taux hypothécaire est 3–4%, investir l'argent supplémentaire peut donner de meilleurs rendements."
        },
        {
          "question": "Qu'est-ce qu'un tableau d'amortissement ?",
          "answer": "Un tableau d'amortissement est un tableau mois par mois montrant exactement comment chaque paiement est divisé entre capital et intérêts, plus le solde de prêt restant. Il révèle que les premiers paiements sont surtout des intérêts (souvent 80%+ en première année), changeant graduellement vers le capital avec le temps. Réviser votre tableau d'amortissement vous aide à comprendre quand vous atteindrez 20% d'équité (pour retirer la PAH), comment les paiements supplémentaires impactent votre échéancier de remboursement, et le vrai coût de votre prêt sur sa durée de vie."
        },
        {
          "question": "Puis-je utiliser ce calculateur pour des hypothèques hors des États-Unis ?",
          "answer": "Oui — le calcul principal du capital et intérêts fonctionne universellement pour tout prêt amortissant à taux fixe. Sélectionnez votre devise locale du menu déroulant pour voir les résultats dans votre devise. Notez que les taux de taxe foncière, coûts d'assurance et règles de PAH varient par pays. Dans plusieurs pays hors des États-Unis, les termes hypothécaires, réglementations et structures typiques diffèrent (ex: les taux variables sont plus communs au Royaume-Uni et en Australie). Ajustez les entrées pour correspondre à vos conditions locales pour l'estimation la plus précise."
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
      "name": "Hypothekenrechner",
      "slug": "hypotheken-rechner",
      "subtitle": "Berechnen Sie Ihre monatliche Hypothekenzahlung einschließlich Tilgung, Zinsen, Steuern, Versicherung, PMI und HOA — mit vollständigem Tilgungsplan.",
      "seo": {
        "title": "Hypothekenrechner - Monatliche Zahlung & Tilgungsschätzung",
        "description": "Berechnen Sie Ihre monatliche Hypothekenzahlung mit Grundsteuern, Versicherung, PMI und HOA-Gebühren. Sehen Sie Tilgungsplan, Zahlungsaufschlüsselung und vergleichen Sie Darlehensszenarien. Kostenloses Online-Tool.",
        "shortDescription": "Schätzen Sie Ihre monatliche Hypothekenzahlung mit Steuern, Versicherung und PMI.",
        "keywords": [
          "Hypothekenrechner",
          "Hypothekenzahlungsrechner",
          "Hausdarlehensrechner",
          "monatliche Hypothekenzahlung",
          "Hypothekentilgungsrechner",
          "Hauszahlungsrechner",
          "Hypothekenrechner mit PMI",
          "Hypothekenrechner mit Steuern"
        ]
      },
      "inputs": {
        "homePrice": {
          "label": "Haushaltspreise",
          "helpText": "Der gesamte Kaufpreis der Immobilie"
        },
        "downPayment": {
          "label": "Anzahlung",
          "helpText": "Vorausbezahltes Bargeld — 20% vermeiden PMI, aber 3–10% sind üblich für Erstkäufer"
        },
        "loanTerm": {
          "label": "Darlehenslaufzeit",
          "helpText": "Darlehensdauer — 30 Jahre ist am häufigsten, 15 Jahre sparen Zinsen"
        },
        "interestRate": {
          "label": "Zinssatz",
          "helpText": "Jährlicher Zinssatz — prüfen Sie aktuelle Zinssätze bei Ihrem Kreditgeber oder Ihrer Bank"
        },
        "includeTaxInsurance": {
          "label": "Steuern & Versicherung einbeziehen",
          "helpText": "Einschalten, um Grundsteuer und Hausversicherung zu Ihrer Zahlung hinzuzufügen"
        },
        "propertyTaxRate": {
          "label": "Grundsteuersatz",
          "helpText": "Jährliche Grundsteuer als Prozentsatz des Hauswerts — US-Durchschnitt liegt bei etwa 1,1%"
        },
        "annualInsurance": {
          "label": "Jährliche Hausversicherung",
          "helpText": "Jährliche Hausversicherungsprämie — Durchschnitt liegt bei 1.500–3.000 € je nach Standort"
        },
        "includePmi": {
          "label": "PMI einbeziehen",
          "helpText": "Private Hypothekenversicherung ist typischerweise erforderlich, wenn die Anzahlung weniger als 20% beträgt"
        },
        "pmiRate": {
          "label": "PMI-Satz",
          "helpText": "Jährliche PMI als Prozentsatz des Darlehensbetrags — typischerweise 0,3% bis 1,5% basierend auf Kreditwürdigkeit und LTV"
        },
        "includeHoa": {
          "label": "HOA-Gebühren einbeziehen",
          "helpText": "Einschalten, wenn die Immobilie in einer Hausbesitzergemeinschaft liegt"
        },
        "hoaMonthly": {
          "label": "Monatliche HOA-Gebühr",
          "helpText": "Monatliche Hausbesitzergemeinschaftsgebühr — deckt gemeinsame Annehmlichkeiten und Wartung ab"
        },
        "includeExtraPayment": {
          "label": "Zusätzliche monatliche Zahlung",
          "helpText": "Einschalten, um zu sehen, wie zusätzliche Zahlungen Ihre Darlehenslaufzeit reduzieren und Zinsen sparen"
        },
        "extraMonthlyPayment": {
          "label": "Zusätzlicher Zahlungsbetrag",
          "helpText": "Zusätzlicher Betrag, der monatlich zur Tilgung gezahlt wird — schon 100 € extra können Jahre sparen"
        }
      },
      "presets": {
        "starterHome": {
          "label": "Starter-Haus",
          "description": "250.000 €, 10% Anzahlung, 30J, 6,5%"
        },
        "familyHome": {
          "label": "Familienhaus",
          "description": "450.000 €, 20% Anzahlung, 30J, ohne PMI"
        },
        "luxury": {
          "label": "Luxushaus",
          "description": "800.000 €, 25% Anzahlung, 15J, HOA"
        },
        "investment": {
          "label": "Investition",
          "description": "300.000 €, 25% Anzahlung, 30J, 7%"
        }
      },
      "values": {
        "years": "Jahre",
        "year": "Jahr",
        "months": "Monate",
        "month": "Monat",
        "monthly": "/Mon"
      },
      "formats": {
        "summary": "Ihre geschätzte monatliche Zahlung beträgt {monthlyPayment}. Über {loanTerm} zahlen Sie {totalInterest} an Zinsen für Gesamtkosten von {totalCost}."
      },
      "results": {
        "monthlyPayment": {
          "label": "Monatliche Zahlung"
        },
        "principalInterest": {
          "label": "Tilgung & Zinsen"
        },
        "monthlyTax": {
          "label": "Monatliche Steuer"
        },
        "monthlyInsurance": {
          "label": "Monatliche Versicherung"
        },
        "monthlyPmi": {
          "label": "Monatliche PMI"
        },
        "totalInterest": {
          "label": "Gesamte gezahlte Zinsen"
        },
        "totalPayments": {
          "label": "Summe aller Zahlungen"
        },
        "payoffDate": {
          "label": "Rückzahlungsdatum"
        },
        "interestSaved": {
          "label": "Gesparte Zinsen"
        },
        "timeReduced": {
          "label": "Gesparte Zeit"
        }
      },
      "infoCards": {
        "breakdown": {
          "title": "Zahlungsaufschlüsselung",
          "items": [
            {
              "label": "Tilgung & Zinsen",
              "valueKey": "principalInterest"
            },
            {
              "label": "Grundsteuer",
              "valueKey": "monthlyTax"
            },
            {
              "label": "Hausversicherung",
              "valueKey": "monthlyInsurance"
            },
            {
              "label": "PMI",
              "valueKey": "monthlyPmi"
            },
            {
              "label": "HOA-Gebühren",
              "valueKey": "hoaMonthly"
            }
          ]
        },
        "details": {
          "title": "Darlehensdetails",
          "items": [
            {
              "label": "Darlehensbetrag",
              "valueKey": "loanAmount"
            },
            {
              "label": "Anzahlung %",
              "valueKey": "downPaymentPercent"
            },
            {
              "label": "Beleihungswert",
              "valueKey": "ltvRatio"
            },
            {
              "label": "Summe aller Zahlungen",
              "valueKey": "totalPayments"
            },
            {
              "label": "Rückzahlungsdatum",
              "valueKey": "payoffDate"
            }
          ]
        },
        "tips": {
          "title": "Hypotheken-Tipps",
          "items": [
            "Zahlen Sie 20% an, um PMI zu vermeiden und bessere Zinssätze zu erhalten — schon 1% weniger Zinsen sparen Tausende über 30 Jahre.",
            "Eine 15-jährige Hypothek hat höhere Zahlungen, spart aber massiv bei den Gesamtzinsen im Vergleich zu 30 Jahren.",
            "Lassen Sie sich von mindestens 3 Kreditgebern vorab genehmigen — Zinssätze können um 0,5% oder mehr variieren.",
            "Zusätzliche Zahlungen gehen direkt zur Tilgung — schon 100 €/Monat extra können Jahre von einer 30-jährigen Hypothek abschneiden."
          ]
        }
      },
      "chart": {
        "title": "Darlehenssaldo über Zeit",
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
            "payment": "Zahlung",
            "principal": "Tilgung",
            "interest": "Zinsen",
            "balance": "Saldo"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist eine Hypothek?",
          "text": "Eine Hypothek ist ein Darlehen zum Kauf von Immobilien, bei dem die Immobilie selbst als Sicherheit dient. Der Kreditnehmer verpflichtet sich, das Darlehen über einen bestimmten Zeitraum (typischerweise 15 oder 30 Jahre) durch monatliche Zahlungen zurückzuzahlen, die sowohl Tilgung als auch Zinsen umfassen. Die 30-jährige Festzinshypothek ist die häufigste Art und macht etwa 70–90% aller Wohnungsbaudarlehen aus. Ihre monatliche Zahlung wird durch den Darlehensbetrag, Zinssatz und die Laufzeit bestimmt."
        },
        "piti": {
          "title": "PITI verstehen: Die vollständige monatliche Zahlung",
          "text": "Ihre wahre monatliche Hypothekenzahlung besteht aus mehr als nur Tilgung und Zinsen. Kreditgeber verwenden das Akronym PITI — Tilgung, Zinsen, Steuern und Versicherung — um die vollständigen monatlichen Wohnkosten zu beschreiben. Grundsteuern werden jährlich von Ihrer Lokalregierung erhoben (Durchschnitt: ~1,1% des Hauswerts). Die Hausversicherung schützt Ihre Immobilie vor Schäden (Durchschnitt: 1.500–3.000 €/Jahr). Bei einer Anzahlung unter 20% zahlen Sie auch eine Private Hypothekenversicherung (PMI), die den Kreditgeber — nicht Sie — bei Zahlungsausfall schützt."
        },
        "downPayment": {
          "title": "Wie viel sollten Sie anzahlen?",
          "text": "Der traditionelle Rat sind 20% Anzahlung, um PMI zu vermeiden und die besten Zinssätze zu sichern. Jedoch akzeptieren viele Programme viel weniger: herkömmliche Darlehen erlauben bis zu 3%, FHA-Darlehen erfordern 3,5%. Eine größere Anzahlung reduziert Ihre monatliche Zahlung, die gesamten gezahlten Zinsen und das Risiko einer Unterwassersituation. Verwenden Sie die 28/36-Regel als Richtlinie: geben Sie nicht mehr als 28% des Bruttomonatseinkommens für Wohnkosten aus und nicht mehr als 36% für Gesamtschulden."
        },
        "termComparison": {
          "title": "15-jährige vs. 30-jährige Hypothek",
          "text": "Eine 30-jährige Hypothek bietet niedrigere monatliche Zahlungen, kostet aber deutlich mehr an Gesamtzinsen. Beispiel: Ein 300.000 €-Darlehen mit 6,5% kostet etwa 1.896 €/Monat über 30 Jahre (Gesamtzinsen: 382.633 €) versus 2.613 €/Monat über 15 Jahre (Gesamtzinsen: 170.269 €). Das sind 212.364 € Unterschied bei den Zinsen. Die 15-jährige Laufzeit kommt auch typischerweise mit einem niedrigeren Zinssatz. Wählen Sie 30 Jahre für Zahlungsflexibilität; wählen Sie 15 Jahre, wenn Sie höhere Zahlungen bewältigen können."
        },
        "amortization": {
          "title": "Wie Tilgung funktioniert",
          "text": "Früh in Ihrer Hypothek geht der Großteil jeder Zahlung zu Zinsen statt zur Reduzierung Ihres Darlehenssaldos. Bei einem 30-jährigen 300.000 €-Darlehen mit 6,5% werden von Ihrer ersten Zahlung 1.625 € für Zinsen und nur 271 € für Tilgung verwendet. Nach Jahr 15 kehrt es sich um — 963 € gehen zur Tilgung und 933 € zu Zinsen. Deshalb sind zusätzliche Zahlungen in den frühen Jahren so kraftvoll: jeder zusätzliche Euro geht direkt zur Tilgung."
        }
      },
      "faqs": [
        {
          "question": "Wie viel Haus kann ich mir leisten?",
          "answer": "Verwenden Sie die 28/36-Regel: Ihre monatlichen Wohnkosten (PITI + HOA) sollten 28% Ihres Bruttomonatseinkommens nicht überschreiten, und Ihre gesamten Schuldenzahlungen sollten unter 36% bleiben. Beispiel: Bei einem Bruttoeinkommen von 6.000 €/Monat zielen Sie auf eine maximale Wohnzahlung von 1.680 €. Berücksichtigen Sie Grundsteuern, Versicherung und PMI — nicht nur die Darlehenszahlung."
        },
        {
          "question": "Was ist PMI und wie vermeide ich es?",
          "answer": "Die Private Hypothekenversicherung (PMI) schützt den Kreditgeber — nicht Sie — bei Zahlungsausfall. Sie ist typischerweise erforderlich, wenn Ihre Anzahlung weniger als 20% des Hauspreises beträgt. PMI kostet 0,3–1,5% des Darlehensbetrags jährlich. Um PMI zu vermeiden: zahlen Sie 20% oder mehr an, verwenden Sie ein Huckepack-Darlehen, oder wählen Sie ein VA-Darlehen. Wenn Sie bereits PMI haben, beantragen Sie die Entfernung, sobald Ihr Beleihungswert unter 80% fällt."
        },
        {
          "question": "Sollte ich eine Festzins- oder variable Hypothek wählen?",
          "answer": "Eine Festzinshypothek sperrt Ihren Zinssatz für die gesamte Darlehenslaufzeit und bietet vorhersagbare Zahlungen. Eine variable Hypothek (ARM) beginnt mit einem niedrigeren Zinssatz, der sich nach einer anfänglichen Periode anpasst. ARMs können Geld sparen, wenn Sie planen, vor der Anpassungsperiode zu verkaufen oder zu refinanzieren, bergen aber Risiken, wenn die Zinssätze steigen."
        },
        {
          "question": "Welche Gebühren sollte ich beim Abschluss erwarten?",
          "answer": "Abschlusskosten liegen typischerweise bei 2–5% des Hauspreises und umfassen: Kreditgeber-Bearbeitungsgebühren (0,5–1%), Bewertung (300–600 €), Titelsuche und -versicherung (500–3.000 €), Anwaltsgebühren und vorausbezahlte Posten. Bei einem 350.000 €-Haus erwarten Sie 7.000–17.500 € Abschlusskosten. Einige Kosten sind verhandelbar, und Verkäufer tragen manchmal zu den Abschlusskosten bei."
        },
        {
          "question": "Wie beeinflusst die Grundsteuer meine monatliche Zahlung?",
          "answer": "Grundsteuern werden jährlich von Ihrer Lokalregierung basierend auf dem geschätzten Wert Ihres Hauses erhoben. Der durchschnittliche effektive Satz liegt bei etwa 1,1%, variiert aber dramatisch nach Region. Bei einem 350.000 €-Haus mit 1,2% sind das 4.200 €/Jahr oder 350 €/Monat, die zu Ihrer Hypothekenzahlung hinzugefügt werden. Die meisten Kreditgeber erfordern ein Treuhandkonto."
        },
        {
          "question": "Lohnt es sich, zusätzlich zur Hypothek zu zahlen?",
          "answer": "Zusätzliche Zahlungen können erhebliche Zinsen sparen und Ihre Darlehenslaufzeit verkürzen. Bei einem 300.000 €-Darlehen mit 6,5% über 30 Jahre sparen nur 200 € extra pro Monat etwa 115.000 € Zinsen und zahlen das Darlehen 7 Jahre früher ab. Jedoch priorisieren Sie zuerst hochverzinsliche Schulden und Altersvorsorge."
        },
        {
          "question": "Was ist ein Tilgungsplan?",
          "answer": "Ein Tilgungsplan ist eine monatliche Tabelle, die genau zeigt, wie jede Zahlung zwischen Tilgung und Zinsen aufgeteilt wird, plus den verbleibenden Darlehenssaldo. Er zeigt, dass frühe Zahlungen meist Zinsen sind (oft 80%+ im ersten Jahr), die sich allmählich zur Tilgung verschieben. Die Überprüfung hilft zu verstehen, wann Sie 20% Eigenkapital erreichen."
        },
        {
          "question": "Kann ich diesen Rechner für Hypotheken außerhalb der EU verwenden?",
          "answer": "Ja — die Kern-Tilgungs- und Zinsberechnung funktioniert universell für jedes Festzins-Tilgungsdarlehen. Wählen Sie Ihre lokale Währung aus dem Dropdown, um Ergebnisse in Ihrer Währung zu sehen. Beachten Sie, dass Grundsteuersätze, Versicherungskosten und PMI-Regeln nach Land variieren. Passen Sie die Eingaben an Ihre lokalen Bedingungen für die genaueste Schätzung an."
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

  // ─── INPUT FIELDS ───
  inputs: [
    // Home Price — currency with unitType
    {
      id: "homePrice",
      type: "number",
      defaultValue: null,
      placeholder: "350000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Down Payment — currency with unitType
    {
      id: "downPayment",
      type: "number",
      defaultValue: null,
      placeholder: "70000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Loan Term — stepper (years)
    {
      id: "loanTerm",
      type: "stepper",
      defaultValue: 30,
      min: 1,
      max: 30,
      step: 1,
      suffix: "years",
    },
    // Interest Rate — number with slider
    {
      id: "interestRate",
      type: "number",
      defaultValue: 6.5,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
    },
    // Include Taxes & Insurance — toggle (V4.3)
    {
      id: "includeTaxInsurance",
      type: "toggle",
      defaultValue: true,
    },
    // Property Tax Rate — revealed when includeTaxInsurance = true
    {
      id: "propertyTaxRate",
      type: "number",
      defaultValue: null,
      placeholder: "1.2",
      min: 0,
      max: 5,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeTaxInsurance", value: true },
    },
    // Annual Home Insurance — revealed when includeTaxInsurance = true
    {
      id: "annualInsurance",
      type: "number",
      defaultValue: null,
      placeholder: "1500",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeTaxInsurance", value: true },
    },
    // Include PMI — toggle (V4.3)
    {
      id: "includePmi",
      type: "toggle",
      defaultValue: false,
    },
    // PMI Rate — revealed when includePmi = true
    {
      id: "pmiRate",
      type: "number",
      defaultValue: null,
      placeholder: "0.5",
      min: 0.1,
      max: 2,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includePmi", value: true },
    },
    // Include HOA — toggle (V4.3)
    {
      id: "includeHoa",
      type: "toggle",
      defaultValue: false,
    },
    // Monthly HOA Fee — revealed when includeHoa = true
    {
      id: "hoaMonthly",
      type: "number",
      defaultValue: null,
      placeholder: "300",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeHoa", value: true },
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
      placeholder: "200",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeExtraPayment", value: true },
    },
  ],

  // ─── RESULTS ───
  results: [
    { id: "monthlyPayment", type: "primary", format: "text" },
    { id: "principalInterest", type: "secondary", format: "text" },
    { id: "monthlyTax", type: "secondary", format: "text" },
    { id: "monthlyInsurance", type: "secondary", format: "text" },
    { id: "monthlyPmi", type: "secondary", format: "text" },
    { id: "totalInterest", type: "secondary", format: "text" },
    { id: "totalPayments", type: "secondary", format: "text" },
    { id: "payoffDate", type: "secondary", format: "text" },
  ],

  // ─── INFO CARDS ───
  infoCards: [
    { id: "breakdown", type: "list", icon: "💰", itemCount: 5 },
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

  referenceData: [],

  // ─── EDUCATION SECTIONS ───
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "piti", type: "prose", icon: "💵" },
    { id: "downPayment", type: "prose", icon: "💰" },
    { id: "termComparison", type: "prose", icon: "⚖️" },
    { id: "amortization", type: "prose", icon: "📊" },
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
      text: "Consumer Financial Protection Bureau — Mortgage Guide",
      url: "https://www.consumerfinance.gov/owning-a-home/",
    },
    {
      text: "Fannie Mae — Mortgage Calculator & Resources",
      url: "https://yourhome.fanniemae.com/",
    },
    {
      text: "Federal Reserve — Mortgage Interest Rates",
      url: "https://www.federalreserve.gov/releases/h15/",
    },
    {
      text: "U.S. Census Bureau — Homeownership Data",
      url: "https://www.census.gov/housing/hvs/index.html",
    },
  ],

  // ─── EDUCATION (Hero section) ───
  hero: {},
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculateMortgage(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──
  const homePrice = values.homePrice as number | null;
  const downPayment = (values.downPayment as number | null) || 0;
  const loanTermYears = (values.loanTerm as number) || 30;
  const interestRate = (values.interestRate as number) ?? 6.5;

  const includeTaxInsurance = values.includeTaxInsurance as boolean;
  const propertyTaxRate = includeTaxInsurance ? ((values.propertyTaxRate as number | null) || 0) : 0;
  const annualInsurance = includeTaxInsurance ? ((values.annualInsurance as number | null) || 0) : 0;

  const includePmi = values.includePmi as boolean;
  const pmiRate = includePmi ? ((values.pmiRate as number | null) || 0) : 0;

  const includeHoa = values.includeHoa as boolean;
  const hoaMonthly = includeHoa ? ((values.hoaMonthly as number | null) || 0) : 0;

  const includeExtraPayment = values.includeExtraPayment as boolean;
  const extraMonthlyPayment = includeExtraPayment ? ((values.extraMonthlyPayment as number | null) || 0) : 0;

  // ── Validate required ──
  if (!homePrice || homePrice <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Currency symbol ──
  const curr = fieldUnits?.homePrice || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ── Calculate loan amount ──
  const loanAmount = Math.max(homePrice - downPayment, 0);

  if (loanAmount <= 0) {
    return {
      values: {
        monthlyPayment: 0,
        principalInterest: 0,
        totalInterest: 0,
        totalPayments: homePrice,
      },
      formatted: {
        monthlyPayment: `${sym}0.00`,
        principalInterest: `${sym}0.00`,
        monthlyTax: `${sym}0.00`,
        monthlyInsurance: `${sym}0.00`,
        monthlyPmi: `${sym}0.00`,
        hoaMonthly: `${sym}0.00`,
        totalInterest: `${sym}0`,
        totalPayments: `${sym}${fmtNum(homePrice)}`,
        loanAmount: `${sym}0`,
        downPaymentPercent: "100%",
        ltvRatio: "0%",
        payoffDate: "—",
      },
      summary: "Your down payment covers the full purchase — no mortgage needed!",
      isValid: true,
    };
  }

  // ── Calculate base monthly P&I (without extra payments) ──
  const loanTermMonths = loanTermYears * 12;
  const monthlyRate = interestRate / 100 / 12;
  let monthlyPI: number;

  if (monthlyRate === 0) {
    monthlyPI = loanAmount / loanTermMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, loanTermMonths);
    monthlyPI = loanAmount * (monthlyRate * factor) / (factor - 1);
  }

  // ── Monthly tax, insurance, PMI, HOA ──
  const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = annualInsurance / 12;
  const monthlyPmi = (loanAmount * (pmiRate / 100)) / 12;

  // ── Total monthly payment (PITI + HOA + extra) ──
  const monthlyPaymentBase = monthlyPI + monthlyTax + monthlyInsurance + monthlyPmi + hoaMonthly;
  const monthlyPaymentTotal = monthlyPaymentBase + extraMonthlyPayment;

  // ── Amortize WITHOUT extra payments (baseline) ──
  let baseBalance = loanAmount;
  let baseTotalInterest = 0;
  const baseMonths = loanTermMonths;

  for (let m = 1; m <= loanTermMonths; m++) {
    if (baseBalance <= 0) break;
    const intPmt = baseBalance * monthlyRate;
    const prinPmt = Math.min(monthlyPI - intPmt, baseBalance);
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
    let prinPmt = monthlyPI - intPmt + extraMonthlyPayment;
    prinPmt = Math.min(prinPmt, balance); // don't overpay
    const actualPayment = Math.min(monthlyPI + extraMonthlyPayment, balance + intPmt);

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
        year: `${currentYear}`,
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
  const monthsSaved = baseMonths - actualMonths;
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

  // ── Total payments (all costs over life of loan) ──
  const totalPrincipalInterest = monthlyPI * actualMonths + extraMonthlyPayment * actualMonths;
  const totalExtras = (monthlyTax + monthlyInsurance + monthlyPmi + hoaMonthly) * actualMonths;
  const totalPayments = downPayment + loanAmount + totalInterest + totalExtras;

  // ── LTV and down payment % ──
  const downPaymentPercent = (downPayment / homePrice) * 100;
  const ltvRatio = (loanAmount / homePrice) * 100;

  // ── Payoff date ──
  const now = new Date();
  const payoffDate = new Date(now.getFullYear(), now.getMonth() + actualMonths, 1);
  const payoffDateStr = payoffDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

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

  // ── Time label for summary ──
  const yearLabel = loanTermYears === 1 ? (v["year"] || "year") : (v["years"] || "years");
  const loanTermStr = `${loanTermYears} ${yearLabel}`;

  // ── Build summary ──
  let summary =
    f.summary
      ?.replace("{monthlyPayment}", `${sym}${fmtNum(monthlyPaymentBase)}`)
      .replace("{loanTerm}", loanTermStr)
      .replace("{totalInterest}", `${sym}${fmtNum(totalInterest)}`)
      .replace("{totalCost}", `${sym}${fmtNum(totalPayments)}`) ||
    `Monthly payment: ${sym}${fmtNum(monthlyPaymentBase)} for ${loanTermStr}. Total interest: ${sym}${fmtNum(totalInterest)}.`;

  if (extraMonthlyPayment > 0 && interestSaved > 0) {
    summary += ` With ${sym}${fmtNum(extraMonthlyPayment)}/mo extra, you save ${sym}${fmtNum(interestSaved)} in interest and pay off ${timeReducedStr} sooner.`;
  }

  // ── Format results ──
  return {
    values: {
      monthlyPayment: monthlyPaymentBase,
      principalInterest: monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyPmi,
      totalInterest,
      totalPayments,
      loanAmount,
      downPaymentPercent,
      ltvRatio,
      hoaMonthly,
      payoffDate: payoffDateStr,
      interestSaved,
      timeReduced: timeReducedStr,
    },
    formatted: {
      monthlyPayment: `${sym}${fmtNum(monthlyPaymentBase)}`,
      principalInterest: `${sym}${fmtNum(monthlyPI)}`,
      monthlyTax: `${sym}${fmtNum(monthlyTax)}`,
      monthlyInsurance: `${sym}${fmtNum(monthlyInsurance)}`,
      monthlyPmi: `${sym}${fmtNum(monthlyPmi)}`,
      hoaMonthly: `${sym}${fmtNum(hoaMonthly)}`,
      totalInterest: `${sym}${fmtNum(totalInterest)}`,
      totalPayments: `${sym}${fmtNum(totalPayments)}`,
      loanAmount: `${sym}${fmtNum(loanAmount)}`,
      downPaymentPercent: `${downPaymentPercent.toFixed(1)}%`,
      ltvRatio: `${ltvRatio.toFixed(1)}%`,
      payoffDate: extraMonthlyPayment > 0 ? `${payoffDateStr} (${payoffTimeStr})` : payoffDateStr,
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
