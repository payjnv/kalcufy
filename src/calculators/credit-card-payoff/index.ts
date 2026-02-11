import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

/* ═══════════════════════════════════════════════════════════════════
   CREDIT CARD PAYOFF CALCULATOR — V4 Engine
   Iterative amortization: balance × (APR/12) monthly interest accrual
   KEY DIFFERENTIATORS:
   • "Cost of Minimum Payments" shock metric — total paid if only minimums
   • Daily interest bleeding: "$X.XX/day charged right now"
   • Interest-to-payment ratio: "68% of your first payment is interest"
   • Effective cost per dollar: "You'll pay $1.47 for every $1 borrowed"
   • Balance transfer savings integrated (0% APR intro comparison)
   • Savings vs minimum: exact $ saved by paying more than minimum
   • Calendar debt-free date: "September 12, 2028"
   • Balance decay chart: minimum vs fixed vs extra payment lines
   + Chart: Composed lines — Minimum-Only vs Your Payment vs Extra Payment balance decay
   ═══════════════════════════════════════════════════════════════════ */

export const creditCardPayoffConfig: CalculatorConfigV4 = {
  id: "credit-card-payoff",
  version: "4.0",
  category: "finance",
  icon: "💳",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS
  // ═══════════════════════════════════════════════════════════════
  presets: [
    {
      id: "averageAmerican",
      icon: "🇺🇸",
      values: {
        currentBalance: 6501,
        apr: 22.76,
        minimumPaymentPercent: 2,
        minimumPaymentFloor: 35,
        monthlyPayment: 200,
        includeExtraPayment: false,
        extraPayment: 0,
        includeBalanceTransfer: false,
        introAprMonths: 18,
        transferFeePercent: 3,
      },
    },
    {
      id: "highInterest",
      icon: "🔥",
      values: {
        currentBalance: 10000,
        apr: 29.99,
        minimumPaymentPercent: 2,
        minimumPaymentFloor: 35,
        monthlyPayment: 300,
        includeExtraPayment: false,
        extraPayment: 0,
        includeBalanceTransfer: true,
        introAprMonths: 18,
        transferFeePercent: 3,
      },
    },
    {
      id: "manageable",
      icon: "✅",
      values: {
        currentBalance: 2000,
        apr: 18.99,
        minimumPaymentPercent: 2,
        minimumPaymentFloor: 35,
        monthlyPayment: 150,
        includeExtraPayment: false,
        extraPayment: 0,
        includeBalanceTransfer: false,
        introAprMonths: 15,
        transferFeePercent: 3,
      },
    },
    {
      id: "minimumTrap",
      icon: "⚠️",
      values: {
        currentBalance: 5000,
        apr: 24.99,
        minimumPaymentPercent: 2,
        minimumPaymentFloor: 35,
        monthlyPayment: 0,
        includeExtraPayment: false,
        extraPayment: 0,
        includeBalanceTransfer: false,
        introAprMonths: 18,
        transferFeePercent: 3,
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // CHART — Balance decay comparison (3 lines)
  // ═══════════════════════════════════════════════════════════════
  chart: {
    id: "balanceDecay",
    type: "composed",
    xKey: "month",
    height: 320,
    stacked: false,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "minimumOnly", type: "line", color: "#ef4444" },
      { key: "fixedPayment", type: "line", color: "#3b82f6" },
      { key: "withExtra", type: "line", color: "#10b981" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // TRANSLATIONS — English only, other languages via install script
  // ═══════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Credit Card Payoff Calculator",
      slug: "credit-card-payoff-calculator",
      subtitle:
        "Find out how long it takes to pay off your credit card, see the true cost of minimum payments, and discover how much faster you can be debt-free",
      breadcrumb: "Credit Card Payoff",

      seo: {
        title:
          "Credit Card Payoff Calculator — Debt-Free Date & Savings | Free",
        description:
          "Calculate your credit card payoff timeline with daily interest cost, minimum payment shock analysis, balance transfer savings, and a personalized debt-free date. See exactly how much faster extra payments eliminate your debt.",
        shortDescription:
          "See how long to pay off your credit card and save on interest",
        keywords: [
          "credit card payoff calculator",
          "credit card payment calculator",
          "pay off credit card debt",
          "credit card interest calculator",
          "minimum payment calculator",
          "debt payoff calculator",
          "balance transfer savings calculator",
          "credit card debt-free date",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      // ─── INPUTS ────────────────────────────────────────────
      inputs: {
        currentBalance: {
          label: "Current Balance",
          helpText:
            "The total outstanding balance on your credit card statement",
          placeholder: "5000",
        },
        apr: {
          label: "Annual Percentage Rate (APR)",
          helpText:
            "Your card's interest rate — find it on your statement or card agreement",
        },
        minimumPaymentPercent: {
          label: "Minimum Payment Percentage",
          helpText:
            "The % of your balance used to calculate minimum payment (typically 1–3%)",
        },
        minimumPaymentFloor: {
          label: "Minimum Payment Floor",
          helpText:
            "The lowest minimum payment your issuer allows (usually $25–$35)",
        },
        monthlyPayment: {
          label: "Your Monthly Payment",
          helpText:
            "The fixed amount you plan to pay each month — leave empty to see minimum-only results",
          placeholder: "200",
        },
        includeExtraPayment: {
          label: "Add Extra Monthly Payment",
          helpText: "See how an additional payment each month accelerates payoff",
        },
        extraPayment: {
          label: "Extra Monthly Payment",
          helpText:
            "Additional amount beyond your regular monthly payment",
          placeholder: "50",
        },
        includeBalanceTransfer: {
          label: "Compare Balance Transfer",
          helpText:
            "See how much you could save by transferring to a 0% intro APR card",
        },
        introAprMonths: {
          label: "0% Intro APR Period",
          helpText:
            "Number of months with 0% interest on the new card (typically 12–21 months)",
        },
        transferFeePercent: {
          label: "Balance Transfer Fee",
          helpText:
            "One-time fee charged for the transfer (typically 3–5% of the balance)",
        },
      },

      // ─── RESULTS ───────────────────────────────────────────
      results: {
        payoffTime: { label: "Time to Pay Off" },
        totalInterestPaid: { label: "Total Interest Paid" },
        totalAmountPaid: { label: "Total Amount Paid" },
        dailyInterestCost: { label: "Daily Interest Cost" },
        interestRatioFirstPayment: { label: "Interest in First Payment" },
        minimumOnlyPayoff: { label: "Minimum-Only Payoff" },
        savingsVsMinimum: { label: "Savings vs Minimum" },
        debtFreeDate: { label: "Debt-Free Date" },
        balanceTransferSavings: { label: "Balance Transfer Savings" },
        effectiveCostPerDollar: { label: "Cost per $1 Borrowed" },
      },

      // ─── PRESETS ───────────────────────────────────────────
      presets: {
        averageAmerican: {
          label: "Average American",
          description: "$6,501 balance, 22.76% APR, $200/mo payment",
        },
        highInterest: {
          label: "High Interest Debt",
          description: "$10K at 29.99% APR, $300/mo + balance transfer",
        },
        manageable: {
          label: "Manageable Balance",
          description: "$2,000 at 18.99% APR, $150/mo payment",
        },
        minimumTrap: {
          label: "Minimum Payment Trap",
          description: "$5,000 at 24.99% — what happens with only minimums",
        },
      },

      // ─── TOOLTIPS ──────────────────────────────────────────
      tooltips: {
        payoffTime:
          "How many months and years until your balance reaches zero",
        totalInterestPaid:
          "The total interest charges you'll pay over the life of your debt — this is the 'cost' of borrowing",
        totalAmountPaid:
          "Your original balance plus all interest — the true total cost",
        dailyInterestCost:
          "How much interest your card charges you every single day right now",
        interestRatioFirstPayment:
          "What percentage of your very first payment goes to interest vs actually paying down the balance",
        minimumOnlyPayoff:
          "How long and how much it costs if you only ever pay the minimum — the shock metric",
        savingsVsMinimum:
          "How much money you save in interest by paying your fixed amount instead of just the minimum",
        debtFreeDate:
          "The exact calendar date you'll make your final payment and be completely debt-free",
        balanceTransferSavings:
          "How much you could save by transferring your balance to a 0% intro APR card (minus the transfer fee)",
        effectiveCostPerDollar:
          "For every $1 you originally charged, this is how much you'll actually end up paying back",
      },

      // ─── DYNAMIC VALUES ────────────────────────────────────
      values: {
        "years": "years",
        "year": "year",
        "months": "months",
        "month": "month",
        "days": "days",
        "/day": "/day",
        "Month": "Month",
        "Payment": "Payment",
        "Interest": "Interest",
        "Principal": "Principal",
        "Balance": "Balance",
        "Minimum Only": "Minimum Only",
        "Your Payment": "Your Payment",
        "With Extra": "With Extra",
        "of first payment is interest": "of first payment is interest",
        "minimum only": "minimum only",
        "saved vs minimum": "saved vs minimum",
        "with balance transfer": "with balance transfer",
        "per $1 borrowed": "per $1 borrowed",
        "You pay": "You pay",
        "for every": "for every",
        "borrowed": "borrowed",
        "Transfer fee": "Transfer fee",
        "Debt-free": "Debt-free",
      },

      // ─── FORMATS ───────────────────────────────────────────
      formats: {
        summary:
          "Pay off {balance} at {apr}% APR in {payoffTime} with {payment}/mo payments. Total interest: {totalInterest}. Your card charges {dailyCost}/day. Debt-free by {debtFreeDate}.",
      },

      // ─── CHART ─────────────────────────────────────────────
      chart: {
        title: "Balance Payoff Comparison",
        xLabel: "Month",
        yLabel: "Remaining Balance",
        series: {
          minimumOnly: "Minimum Only",
          fixedPayment: "Your Payment",
          withExtra: "With Extra",
        },
      },

      // ─── DETAILED TABLE ────────────────────────────────────
      detailedTable: {
        paymentSchedule: {
          button: "View Payment Schedule",
          title: "Monthly Payment Schedule",
          columns: {
            month: "Month",
            payment: "Payment",
            interest: "Interest",
            principal: "Principal",
            balance: "Balance",
          },
        },
      },

      // ─── INFO CARDS ────────────────────────────────────────
      infoCards: {
        costBreakdown: {
          title: "💰 True Cost Breakdown",
          items: [
            "Total Interest Paid: the hidden price of carrying a balance month to month",
            "Daily Interest Cost: your card charges interest every single day, not just monthly",
            "Interest Ratio: see how much of your first payment actually reduces your debt vs feeds interest",
            "Cost Per Dollar: the real price tag — for every $1 charged, you may pay back $1.40+",
          ],
        },
        payoffStrategy: {
          title: "📊 Payoff Strategy Insights",
          items: [
            "Minimum Payment Trap: only paying the minimum can turn 3 years of debt into 15+ years",
            "Extra Payment Power: even $50/mo extra can cut years off your payoff timeline",
            "Balance Transfer: a 0% intro APR card can save hundreds or thousands in interest",
            "Debt-Free Date: knowing your exact payoff date provides motivation to stay on track",
          ],
        },
        actionTips: {
          title: "💡 Accelerate Your Payoff",
          items: [
            "Pay more than the minimum — every extra dollar goes directly to reducing your balance",
            "Consider the debt avalanche: pay highest-APR cards first to minimize total interest",
            "Call your issuer and negotiate a lower APR — success rate is higher than most people think",
            "Set up autopay above the minimum to avoid late fees and guarantee progress every month",
          ],
        },
      },

      // ─── EDUCATION SECTIONS ────────────────────────────────
      educationSections: {
        whatIs: {
          title: "📖 How Credit Card Interest Works",
          content:
            "Credit card interest is calculated daily using the Average Daily Balance (ADB) method. Your Annual Percentage Rate (APR) is divided by 365 to get a Daily Periodic Rate (DPR). Each day, the DPR is multiplied by your current balance, and that interest is added to what you owe. This means interest compounds daily — you pay interest on interest — which is why credit card debt can grow so quickly even when you're making payments.\n\nFor example, a $5,000 balance at 22% APR means your daily rate is about 0.0603%. That's roughly $3.01 charged every single day. Over a month, that adds up to about $91.67 in interest alone. If your minimum payment is only $100, just $8.33 actually reduces your balance. This is why the minimum payment trap exists: most of your money feeds interest, not debt reduction.",
        },
        howItWorks: {
          title: "⚙️ How This Calculator Works",
          content:
            "This calculator uses an iterative month-by-month amortization model that mirrors how credit card issuers actually process payments. Each month, it calculates the interest charge (balance × APR ÷ 12), subtracts that from your payment to determine how much goes to principal, then reduces the balance accordingly. It repeats this process until the balance reaches zero.\n\nUnlike simple payoff estimators, this tool also computes: the exact cost of making only minimum payments (which decrease as your balance drops, extending payoff dramatically), the impact of extra payments, and the potential savings from a 0% balance transfer. The minimum payment each month is recalculated as the greater of (balance × minimum %) or the minimum floor amount, just as real issuers compute it.",
        },
        payoffStrategies: {
          title: "✅ Proven Payoff Strategies",
          items: [
            "Debt Avalanche: Pay minimums on all cards, put extra toward the highest-APR card. Saves the most money mathematically but requires patience.",
            "Debt Snowball: Pay off the smallest balance first for quick psychological wins. Slightly more expensive but keeps you motivated.",
            "Balance Transfer: Move debt to a 0% intro APR card. You'll pay a 3–5% transfer fee but eliminate interest for 12–21 months.",
            "Lump-Sum Payments: Use tax refunds, bonuses, or windfalls to make large one-time payments that dramatically cut your timeline.",
            "Bi-Weekly Payments: Pay half your monthly payment every two weeks — you'll make 26 half-payments (13 full payments) per year instead of 12.",
            "Negotiate Your APR: Call your issuer and ask for a rate reduction. Long-time customers with good payment history have a 60–70% success rate.",
          ],
        },
        commonMistakes: {
          title: "⚠️ Costly Mistakes to Avoid",
          items: [
            "Only Paying the Minimum: A $5,000 balance at 22% with minimum payments takes 25+ years and costs over $8,000 in interest alone.",
            "Ignoring the APR: Many cardholders don't know their rate. The average is 22.76% — check your statement and negotiate lower if possible.",
            "Missing Payments: A single late payment can trigger a penalty APR of 29.99%, spike your minimum, and damage your credit score.",
            "Continuing to Charge: Making payments while still adding to the balance creates a treadmill effect where you never make progress.",
            "Closing Paid-Off Cards: Closing accounts reduces your total credit limit, increasing your utilization ratio and potentially lowering your credit score.",
          ],
        },
        examples: {
          title: "🧮 Real Payoff Scenarios",
          columns: 2,
          examples: [
            {
              title: "Average Balance — Fixed vs Minimum",
              content:
                "Balance: $6,501 | APR: 22.76% | Minimum: 2% or $35\n\nMinimum only: 24 years, 3 months — Total paid: $17,476\nFixed $200/mo: 3 years, 4 months — Total paid: $7,987\n\n→ You save $9,489 and 21 years by paying $200/mo instead of the minimum.",
            },
            {
              title: "High-Interest + Balance Transfer",
              content:
                "Balance: $10,000 | APR: 29.99% | Payment: $300/mo\n\nWithout transfer: 4 years, 4 months — Total interest: $5,428\nWith 0% transfer (18mo, 3% fee): Total interest: $1,868\n\n→ Balance transfer saves $3,560 even after the $300 fee. You're debt-free 14 months sooner.",
            },
          ],
        },
      },

      // ─── FAQs ──────────────────────────────────────────────
      faqs: {
        "0": {
          question: "How long will it take to pay off my credit card?",
          answer:
            "It depends on your balance, APR, and monthly payment. With a $5,000 balance at 22% APR, paying $200/month takes about 31 months. Paying only the minimum could take over 20 years. Use this calculator to get your personalized timeline.",
        },
        "1": {
          question:
            "How much of my credit card payment goes to interest vs principal?",
          answer:
            "In the early months, the majority of your payment goes to interest. For example, on a $5,000 balance at 22% APR, the first month's interest is about $91.67. If you pay $200, only $108.33 actually reduces your balance. As your balance decreases, more of each payment goes to principal.",
        },
        "2": {
          question:
            "Why is paying only the minimum so expensive?",
          answer:
            "Minimum payments are designed to keep your account current, not to pay off debt efficiently. They're typically 1–3% of your balance, which barely covers interest. As your balance drops, the minimum drops too — so you pay less and less each month, stretching payoff over decades. A $5,000 balance at 24.99% APR with 2% minimums takes over 30 years and costs more than $12,000 in interest.",
        },
        "3": {
          question: "Is a balance transfer worth it?",
          answer:
            "A balance transfer to a 0% intro APR card can save you hundreds or thousands of dollars in interest, but only if you can pay off most of the balance during the intro period (typically 12–21 months). You'll pay a transfer fee of 3–5%, which is added to your balance. This calculator compares both scenarios so you can see the exact savings.",
        },
        "4": {
          question:
            "Should I use the debt snowball or debt avalanche method?",
          answer:
            "The debt avalanche (highest APR first) saves the most money mathematically. The debt snowball (smallest balance first) provides faster psychological wins. Research shows that the snowball method has higher completion rates because the quick wins keep people motivated. Choose the method you'll stick with — the best strategy is the one you actually follow.",
        },
        "5": {
          question: "How is credit card interest calculated?",
          answer:
            "Most issuers use the Average Daily Balance method. Your APR is divided by 365 to get a daily rate. Each day, that rate is multiplied by your balance. These daily charges are summed at the end of the billing cycle. This means interest compounds daily — you're charged interest on previously accrued interest — which is why credit card debt grows faster than most people expect.",
        },
        "6": {
          question:
            "What happens if I pay more than the minimum but less than the full balance?",
          answer:
            "Any amount above the minimum goes directly to reducing your principal balance. Even an extra $25–$50 per month can cut years off your payoff timeline and save significant interest. This calculator lets you compare different payment amounts to see the exact impact.",
        },
        "7": {
          question:
            "Can I negotiate a lower APR on my credit card?",
          answer:
            "Yes, and it's worth trying. Studies show that 60–80% of people who call their issuer and ask for a rate reduction receive one. Having a good payment history, long account tenure, and a competing offer from another card strengthens your case. Even a 2–3% reduction can save hundreds of dollars over the life of your balance.",
        },
      },

      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de Pago de Tarjeta de Crédito",
      "slug": "calculadora-pago-tarjeta-credito",
      "subtitle": "Descubre cuánto tiempo te tomará pagar tu tarjeta de crédito, conoce el verdadero costo de los pagos mínimos y descubre qué tan rápido puedes estar libre de deudas",
      "breadcrumb": "Pago de Tarjeta de Crédito",
      "seo": {
        "title": "Calculadora de Pago de Tarjeta de Crédito — Fecha Libre de Deudas y Ahorros | Gratis",
        "description": "Calcula tu cronograma de pago de tarjeta de crédito con costo de interés diario, análisis de pagos mínimos, ahorros por transferencia de saldo y una fecha personalizada libre de deudas. Ve exactamente qué tan rápido los pagos extra eliminan tu deuda.",
        "shortDescription": "Ve cuánto tiempo toma pagar tu tarjeta de crédito y ahorrar en intereses",
        "keywords": [
          "calculadora de pago de tarjeta de crédito",
          "calculadora de pagos de tarjeta de crédito",
          "pagar deuda de tarjeta de crédito",
          "calculadora de interés de tarjeta de crédito",
          "calculadora de pago mínimo",
          "calculadora de pago de deudas",
          "calculadora de ahorros por transferencia de saldo",
          "fecha libre de deudas de tarjeta de crédito"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "currentBalance": {
          "label": "Saldo Actual",
          "helpText": "El saldo total pendiente en tu estado de cuenta de tarjeta de crédito",
          "placeholder": "5000"
        },
        "apr": {
          "label": "Tasa de Porcentaje Anual (APR)",
          "helpText": "La tasa de interés de tu tarjeta — encuéntrala en tu estado de cuenta o contrato de tarjeta"
        },
        "minimumPaymentPercent": {
          "label": "Porcentaje de Pago Mínimo",
          "helpText": "El % de tu saldo usado para calcular el pago mínimo (típicamente 1–3%)"
        },
        "minimumPaymentFloor": {
          "label": "Piso de Pago Mínimo",
          "helpText": "El pago mínimo más bajo que permite tu emisor (usualmente $25–$35)"
        },
        "monthlyPayment": {
          "label": "Tu Pago Mensual",
          "helpText": "La cantidad fija que planeas pagar cada mes — deja vacío para ver resultados solo de mínimos",
          "placeholder": "200"
        },
        "includeExtraPayment": {
          "label": "Agregar Pago Mensual Extra",
          "helpText": "Ve cómo un pago adicional cada mes acelera el pago total"
        },
        "extraPayment": {
          "label": "Pago Mensual Extra",
          "helpText": "Cantidad adicional más allá de tu pago mensual regular",
          "placeholder": "50"
        },
        "includeBalanceTransfer": {
          "label": "Comparar Transferencia de Saldo",
          "helpText": "Ve cuánto podrías ahorrar transfiriendo a una tarjeta con APR introductorio del 0%"
        },
        "introAprMonths": {
          "label": "Período de APR Introductorio del 0%",
          "helpText": "Número de meses con 0% de interés en la nueva tarjeta (típicamente 12–21 meses)"
        },
        "transferFeePercent": {
          "label": "Comisión por Transferencia de Saldo",
          "helpText": "Comisión única cobrada por la transferencia (típicamente 3–5% del saldo)"
        }
      },
      "results": {
        "payoffTime": {
          "label": "Tiempo para Pagar"
        },
        "totalInterestPaid": {
          "label": "Interés Total Pagado"
        },
        "totalAmountPaid": {
          "label": "Cantidad Total Pagada"
        },
        "dailyInterestCost": {
          "label": "Costo de Interés Diario"
        },
        "interestRatioFirstPayment": {
          "label": "Interés en el Primer Pago"
        },
        "minimumOnlyPayoff": {
          "label": "Pago Solo Mínimos"
        },
        "savingsVsMinimum": {
          "label": "Ahorros vs Mínimo"
        },
        "debtFreeDate": {
          "label": "Fecha Libre de Deudas"
        },
        "balanceTransferSavings": {
          "label": "Ahorros por Transferencia de Saldo"
        },
        "effectiveCostPerDollar": {
          "label": "Costo por $1 Prestado"
        }
      },
      "presets": {
        "averageAmerican": {
          "label": "Estadounidense Promedio",
          "description": "Saldo de $6,501, APR 22.76%, pago de $200/mes"
        },
        "highInterest": {
          "label": "Deuda de Alto Interés",
          "description": "$10K al 29.99% APR, $300/mes + transferencia de saldo"
        },
        "manageable": {
          "label": "Saldo Manejable",
          "description": "$2,000 al 18.99% APR, pago de $150/mes"
        },
        "minimumTrap": {
          "label": "Trampa del Pago Mínimo",
          "description": "$5,000 al 24.99% — qué pasa solo con mínimos"
        }
      },
      "tooltips": {
        "payoffTime": "Cuántos meses y años hasta que tu saldo llegue a cero",
        "totalInterestPaid": "Los cargos de interés totales que pagarás durante la vida de tu deuda — este es el 'costo' de pedir prestado",
        "totalAmountPaid": "Tu saldo original más todos los intereses — el costo total verdadero",
        "dailyInterestCost": "Cuánto interés te cobra tu tarjeta todos los días ahora mismo",
        "interestRatioFirstPayment": "Qué porcentaje de tu primer pago va a intereses vs realmente pagar el saldo",
        "minimumOnlyPayoff": "Cuánto tiempo y cuánto cuesta si solo pagas el mínimo — la métrica de shock",
        "savingsVsMinimum": "Cuánto dinero ahorras en intereses pagando tu cantidad fija en lugar de solo el mínimo",
        "debtFreeDate": "La fecha exacta del calendario en que harás tu pago final y estarás completamente libre de deudas",
        "balanceTransferSavings": "Cuánto podrías ahorrar transfiriendo tu saldo a una tarjeta con APR introductorio del 0% (menos la comisión de transferencia)",
        "effectiveCostPerDollar": "Por cada $1 que originalmente cargaste, esto es cuánto realmente terminarás pagando"
      },
      "values": {
        "years": "años",
        "year": "año",
        "months": "meses",
        "month": "mes",
        "days": "días",
        "/day": "/día",
        "Month": "Mes",
        "Payment": "Pago",
        "Interest": "Interés",
        "Principal": "Principal",
        "Balance": "Saldo",
        "Minimum Only": "Solo Mínimo",
        "Your Payment": "Tu Pago",
        "With Extra": "Con Extra",
        "of first payment is interest": "del primer pago es interés",
        "minimum only": "solo mínimo",
        "saved vs minimum": "ahorrado vs mínimo",
        "with balance transfer": "con transferencia de saldo",
        "per $1 borrowed": "por $1 prestado",
        "You pay": "Pagas",
        "for every": "por cada",
        "borrowed": "prestado",
        "Transfer fee": "Comisión de transferencia",
        "Debt-free": "Libre de deudas"
      },
      "formats": {
        "summary": "Pagar {balance} al {apr}% APR en {payoffTime} con pagos de {payment}/mes. Interés total: {totalInterest}. Tu tarjeta cobra {dailyCost}/día. Libre de deudas para {debtFreeDate}."
      },
      "chart": {
        "title": "Comparación de Pago de Saldo",
        "xLabel": "Mes",
        "yLabel": "Saldo Restante",
        "series": {
          "minimumOnly": "Solo Mínimo",
          "fixedPayment": "Tu Pago",
          "withExtra": "Con Extra"
        }
      },
      "detailedTable": {
        "paymentSchedule": {
          "button": "Ver Cronograma de Pagos",
          "title": "Cronograma de Pagos Mensuales",
          "columns": {
            "month": "Mes",
            "payment": "Pago",
            "interest": "Interés",
            "principal": "Principal",
            "balance": "Saldo"
          }
        }
      },
      "infoCards": {
        "costBreakdown": {
          "title": "💰 Desglose de Costo Verdadero",
          "items": [
            "Interés Total Pagado: el precio oculto de mantener un saldo mes tras mes",
            "Costo de Interés Diario: tu tarjeta cobra interés todos los días, no solo mensualmente",
            "Proporción de Interés: ve cuánto de tu primer pago realmente reduce tu deuda vs alimenta el interés",
            "Costo Por Dólar: el precio real — por cada $1 cargado, puedes pagar $1.40 o más"
          ]
        },
        "payoffStrategy": {
          "title": "📊 Perspectivas de Estrategia de Pago",
          "items": [
            "Trampa del Pago Mínimo: solo pagar el mínimo puede convertir 3 años de deuda en 15+ años",
            "Poder del Pago Extra: incluso $50/mes extra puede quitar años de tu cronograma de pago",
            "Transferencia de Saldo: una tarjeta con APR introductorio del 0% puede ahorrar cientos o miles en intereses",
            "Fecha Libre de Deudas: conocer tu fecha exacta de pago proporciona motivación para mantenerte en el camino"
          ]
        },
        "actionTips": {
          "title": "💡 Acelera tu Pago",
          "items": [
            "Paga más que el mínimo — cada dólar extra va directamente a reducir tu saldo",
            "Considera la avalancha de deudas: paga primero las tarjetas con APR más alto para minimizar el interés total",
            "Llama a tu emisor y negocia un APR más bajo — la tasa de éxito es más alta de lo que la mayoría piensa",
            "Configura autopago por encima del mínimo para evitar cargos por pago tardío y garantizar progreso cada mes"
          ]
        }
      },
      "educationSections": {
        "whatIs": {
          "title": "📖 Cómo Funciona el Interés de Tarjeta de Crédito",
          "content": "El interés de tarjeta de crédito se calcula diariamente usando el método de Saldo Diario Promedio (SDP). Tu Tasa de Porcentaje Anual (APR) se divide por 365 para obtener una Tasa Periódica Diaria (TPD). Cada día, la TPD se multiplica por tu saldo actual, y ese interés se suma a lo que debes. Esto significa que el interés se capitaliza diariamente — pagas interés sobre interés — razón por la cual la deuda de tarjeta de crédito puede crecer tan rápidamente incluso cuando estás haciendo pagos.\n\nPor ejemplo, un saldo de $5,000 al 22% APR significa que tu tasa diaria es aproximadamente 0.0603%. Eso es aproximadamente $3.01 cobrados todos los días. Durante un mes, eso suma aproximadamente $91.67 solo en intereses. Si tu pago mínimo es solo $100, solo $8.33 realmente reduce tu saldo. Por esto existe la trampa del pago mínimo: la mayor parte de tu dinero alimenta el interés, no la reducción de deuda."
        },
        "howItWorks": {
          "title": "⚙️ Cómo Funciona Esta Calculadora",
          "content": "Esta calculadora usa un modelo iterativo de amortización mes a mes que refleja cómo los emisores de tarjetas de crédito realmente procesan los pagos. Cada mes, calcula el cargo de interés (saldo × APR ÷ 12), lo resta de tu pago para determinar cuánto va al principal, luego reduce el saldo acordemente. Repite este proceso hasta que el saldo llegue a cero.\n\nA diferencia de estimadores simples de pago, esta herramienta también calcula: el costo exacto de hacer solo pagos mínimos (que disminuyen a medida que tu saldo baja, extendiendo dramáticamente el pago), el impacto de pagos extra, y los ahorros potenciales de una transferencia de saldo al 0%. El pago mínimo cada mes se recalcula como el mayor entre (saldo × % mínimo) o la cantidad mínima base, tal como lo calculan los emisores reales."
        },
        "payoffStrategies": {
          "title": "✅ Estrategias de Pago Comprobadas",
          "items": [
            "Avalancha de Deudas: Paga mínimos en todas las tarjetas, pon extra hacia la tarjeta con APR más alto. Ahorra más dinero matemáticamente pero requiere paciencia.",
            "Bola de Nieve de Deudas: Paga primero el saldo más pequeño para victorias psicológicas rápidas. Ligeramente más caro pero te mantiene motivado.",
            "Transferencia de Saldo: Mueve la deuda a una tarjeta con APR introductorio del 0%. Pagarás una comisión de transferencia del 3–5% pero eliminarás intereses por 12–21 meses.",
            "Pagos de Suma Global: Usa reembolsos de impuestos, bonos o ganancias inesperadas para hacer pagos únicos grandes que reduzcan dramáticamente tu cronograma.",
            "Pagos Quincenales: Paga la mitad de tu pago mensual cada dos semanas — harás 26 medios pagos (13 pagos completos) por año en lugar de 12.",
            "Negocia tu APR: Llama a tu emisor y pide una reducción de tasa. Clientes de largo tiempo con buen historial de pagos tienen una tasa de éxito del 60–70%."
          ]
        },
        "commonMistakes": {
          "title": "⚠️ Errores Costosos que Evitar",
          "items": [
            "Solo Pagar el Mínimo: Un saldo de $5,000 al 22% con pagos mínimos toma 25+ años y cuesta más de $8,000 solo en intereses.",
            "Ignorar el APR: Muchos portadores de tarjetas no conocen su tasa. El promedio es 22.76% — revisa tu estado de cuenta y negocia más bajo si es posible.",
            "Perder Pagos: Un solo pago tardío puede activar un APR de penalización del 29.99%, aumentar tu mínimo y dañar tu puntaje de crédito.",
            "Continuar Cargando: Hacer pagos mientras sigues agregando al saldo crea un efecto de rueda de ejercicio donde nunca haces progreso.",
            "Cerrar Tarjetas Pagadas: Cerrar cuentas reduce tu límite de crédito total, aumentando tu proporción de utilización y potencialmente bajando tu puntaje de crédito."
          ]
        },
        "examples": {
          "title": "🧮 Escenarios Reales de Pago",
          "columns": 2,
          "examples": [
            {
              "title": "Saldo Promedio — Fijo vs Mínimo",
              "content": "Saldo: $6,501 | APR: 22.76% | Mínimo: 2% o $35\n\nSolo mínimo: 24 años, 3 meses — Total pagado: $17,476\nFijo $200/mes: 3 años, 4 meses — Total pagado: $7,987\n\n→ Ahorras $9,489 y 21 años pagando $200/mes en lugar del mínimo."
            },
            {
              "title": "Alto Interés + Transferencia de Saldo",
              "content": "Saldo: $10,000 | APR: 29.99% | Pago: $300/mes\n\nSin transferencia: 4 años, 4 meses — Interés total: $5,428\nCon transferencia 0% (18 meses, comisión 3%): Interés total: $1,868\n\n→ La transferencia de saldo ahorra $3,560 incluso después de la comisión de $300. Estás libre de deudas 14 meses antes."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "¿Cuánto tiempo tomará pagar mi tarjeta de crédito?",
          "answer": "Depende de tu saldo, APR y pago mensual. Con un saldo de $5,000 al 22% APR, pagar $200/mes toma aproximadamente 31 meses. Pagar solo el mínimo podría tomar más de 20 años. Usa esta calculadora para obtener tu cronograma personalizado."
        },
        "1": {
          "question": "¿Cuánto de mi pago de tarjeta de crédito va a interés vs principal?",
          "answer": "En los primeros meses, la mayoría de tu pago va a intereses. Por ejemplo, en un saldo de $5,000 al 22% APR, el interés del primer mes es aproximadamente $91.67. Si pagas $200, solo $108.33 realmente reduce tu saldo. A medida que tu saldo disminuye, más de cada pago va al principal."
        },
        "2": {
          "question": "¿Por qué es tan caro pagar solo el mínimo?",
          "answer": "Los pagos mínimos están diseñados para mantener tu cuenta al día, no para pagar deuda eficientemente. Típicamente son 1–3% de tu saldo, lo que apenas cubre el interés. A medida que tu saldo baja, el mínimo también baja — así pagas menos y menos cada mes, extendiendo el pago por décadas. Un saldo de $5,000 al 24.99% APR con mínimos del 2% toma más de 30 años y cuesta más de $12,000 en intereses."
        },
        "3": {
          "question": "¿Vale la pena una transferencia de saldo?",
          "answer": "Una transferencia de saldo a una tarjeta con APR introductorio del 0% puede ahorrarte cientos o miles de dólares en intereses, pero solo si puedes pagar la mayor parte del saldo durante el período introductorio (típicamente 12–21 meses). Pagarás una comisión de transferencia del 3–5%, que se agrega a tu saldo. Esta calculadora compara ambos escenarios para que puedas ver los ahorros exactos."
        },
        "4": {
          "question": "¿Debo usar el método de bola de nieve o avalancha de deudas?",
          "answer": "La avalancha de deudas (APR más alto primero) ahorra más dinero matemáticamente. La bola de nieve de deudas (saldo más pequeño primero) proporciona victorias psicológicas más rápidas. La investigación muestra que el método de bola de nieve tiene tasas de finalización más altas porque las victorias rápidas mantienen a las personas motivadas. Elige el método que seguirás — la mejor estrategia es la que realmente sigues."
        },
        "5": {
          "question": "¿Cómo se calcula el interés de tarjeta de crédito?",
          "answer": "La mayoría de los emisores usan el método de Saldo Diario Promedio. Tu APR se divide por 365 para obtener una tasa diaria. Cada día, esa tasa se multiplica por tu saldo. Estos cargos diarios se suman al final del ciclo de facturación. Esto significa que el interés se capitaliza diariamente — te cobran interés sobre interés previamente acumulado — razón por la cual la deuda de tarjeta de crédito crece más rápido de lo que la mayoría espera."
        },
        "6": {
          "question": "¿Qué pasa si pago más que el mínimo pero menos que el saldo completo?",
          "answer": "Cualquier cantidad por encima del mínimo va directamente a reducir tu saldo principal. Incluso $25–$50 extra por mes puede quitar años de tu cronograma de pago y ahorrar interés significativo. Esta calculadora te permite comparar diferentes cantidades de pago para ver el impacto exacto."
        },
        "7": {
          "question": "¿Puedo negociar un APR más bajo en mi tarjeta de crédito?",
          "answer": "Sí, y vale la pena intentar. Los estudios muestran que 60–80% de las personas que llaman a su emisor y piden una reducción de tasa la reciben. Tener un buen historial de pagos, tenencia de cuenta larga y una oferta competitiva de otra tarjeta fortalece tu caso. Incluso una reducción del 2–3% puede ahorrar cientos de dólares durante la vida de tu saldo."
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
      }
    },
    pt: {
      "name": "Calculadora de Quitação de Cartão de Crédito",
      "slug": "calculadora-quitacao-cartao-credito",
      "subtitle": "Descubra quanto tempo leva para quitar seu cartão de crédito, veja o custo real dos pagamentos mínimos e descubra o quão mais rápido você pode ficar livre de dívidas",
      "breadcrumb": "Quitação de Cartão de Crédito",
      "seo": {
        "title": "Calculadora de Quitação de Cartão de Crédito — Data Livre de Dívidas e Economia | Grátis",
        "description": "Calcule o prazo de quitação do seu cartão de crédito com custo diário de juros, análise de choque de pagamento mínimo, economia de portabilidade e uma data personalizada livre de dívidas. Veja exatamente o quão mais rápido pagamentos extras eliminam sua dívida.",
        "shortDescription": "Veja quanto tempo para quitar seu cartão de crédito e economizar em juros",
        "keywords": [
          "calculadora quitação cartão crédito",
          "calculadora pagamento cartão crédito",
          "quitar dívida cartão crédito",
          "calculadora juros cartão crédito",
          "calculadora pagamento mínimo",
          "calculadora quitação dívida",
          "calculadora economia portabilidade saldo",
          "data livre dívidas cartão crédito"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "currentBalance": {
          "label": "Saldo Atual",
          "helpText": "O saldo total em aberto na fatura do seu cartão de crédito",
          "placeholder": "5000"
        },
        "apr": {
          "label": "Taxa Anual de Juros (TAC)",
          "helpText": "A taxa de juros do seu cartão — encontre na sua fatura ou contrato do cartão"
        },
        "minimumPaymentPercent": {
          "label": "Porcentagem do Pagamento Mínimo",
          "helpText": "A % do seu saldo usada para calcular o pagamento mínimo (tipicamente 1–3%)"
        },
        "minimumPaymentFloor": {
          "label": "Piso do Pagamento Mínimo",
          "helpText": "O menor pagamento mínimo que sua operadora permite (geralmente R$ 25–R$ 35)"
        },
        "monthlyPayment": {
          "label": "Seu Pagamento Mensal",
          "helpText": "O valor fixo que você planeja pagar a cada mês — deixe vazio para ver resultados apenas do mínimo",
          "placeholder": "200"
        },
        "includeExtraPayment": {
          "label": "Adicionar Pagamento Extra Mensal",
          "helpText": "Veja como um pagamento adicional a cada mês acelera a quitação"
        },
        "extraPayment": {
          "label": "Pagamento Extra Mensal",
          "helpText": "Valor adicional além do seu pagamento mensal regular",
          "placeholder": "50"
        },
        "includeBalanceTransfer": {
          "label": "Comparar Portabilidade de Saldo",
          "helpText": "Veja quanto você poderia economizar transferindo para um cartão com juros 0% introdutório"
        },
        "introAprMonths": {
          "label": "Período de Juros 0% Introdutório",
          "helpText": "Número de meses com 0% de juros no novo cartão (tipicamente 12–21 meses)"
        },
        "transferFeePercent": {
          "label": "Taxa de Portabilidade",
          "helpText": "Taxa única cobrada pela transferência (tipicamente 3–5% do saldo)"
        }
      },
      "results": {
        "payoffTime": {
          "label": "Tempo para Quitar"
        },
        "totalInterestPaid": {
          "label": "Total de Juros Pagos"
        },
        "totalAmountPaid": {
          "label": "Valor Total Pago"
        },
        "dailyInterestCost": {
          "label": "Custo Diário de Juros"
        },
        "interestRatioFirstPayment": {
          "label": "Juros no Primeiro Pagamento"
        },
        "minimumOnlyPayoff": {
          "label": "Quitação Apenas Mínimo"
        },
        "savingsVsMinimum": {
          "label": "Economia vs Mínimo"
        },
        "debtFreeDate": {
          "label": "Data Livre de Dívidas"
        },
        "balanceTransferSavings": {
          "label": "Economia com Portabilidade"
        },
        "effectiveCostPerDollar": {
          "label": "Custo por R$ 1 Emprestado"
        }
      },
      "presets": {
        "averageAmerican": {
          "label": "Brasileiro Médio",
          "description": "Saldo de R$ 6.501, juros 22,76%, pagamento R$ 200/mês"
        },
        "highInterest": {
          "label": "Dívida com Juros Altos",
          "description": "R$ 10mil a 29,99% de juros, R$ 300/mês + portabilidade"
        },
        "manageable": {
          "label": "Saldo Gerenciável",
          "description": "R$ 2.000 a 18,99% de juros, pagamento R$ 150/mês"
        },
        "minimumTrap": {
          "label": "Armadilha do Pagamento Mínimo",
          "description": "R$ 5.000 a 24,99% — o que acontece apenas com mínimos"
        }
      },
      "tooltips": {
        "payoffTime": "Quantos meses e anos até seu saldo chegar a zero",
        "totalInterestPaid": "O total de juros que você pagará durante a vida da sua dívida — este é o 'custo' do empréstimo",
        "totalAmountPaid": "Seu saldo original mais todos os juros — o custo total real",
        "dailyInterestCost": "Quanto de juros seu cartão te cobra todos os dias agora mesmo",
        "interestRatioFirstPayment": "Qual porcentagem do seu primeiro pagamento vai para juros vs realmente abater o saldo",
        "minimumOnlyPayoff": "Quanto tempo e quanto custa se você sempre pagar apenas o mínimo — a métrica de choque",
        "savingsVsMinimum": "Quanto dinheiro você economiza em juros pagando seu valor fixo em vez de apenas o mínimo",
        "debtFreeDate": "A data exata do calendário em que você fará seu pagamento final e estará completamente livre de dívidas",
        "balanceTransferSavings": "Quanto você poderia economizar transferindo seu saldo para um cartão com juros 0% introdutório (menos a taxa de transferência)",
        "effectiveCostPerDollar": "Para cada R$ 1 que você originalmente gastou, é quanto você realmente acabará pagando de volta"
      },
      "values": {
        "years": "anos",
        "year": "ano",
        "months": "meses",
        "month": "mês",
        "days": "dias",
        "/day": "/dia",
        "Month": "Mês",
        "Payment": "Pagamento",
        "Interest": "Juros",
        "Principal": "Principal",
        "Balance": "Saldo",
        "Minimum Only": "Apenas Mínimo",
        "Your Payment": "Seu Pagamento",
        "With Extra": "Com Extra",
        "of first payment is interest": "do primeiro pagamento são juros",
        "minimum only": "apenas mínimo",
        "saved vs minimum": "economizado vs mínimo",
        "with balance transfer": "com portabilidade de saldo",
        "per $1 borrowed": "por R$ 1 emprestado",
        "You pay": "Você paga",
        "for every": "para cada",
        "borrowed": "emprestado",
        "Transfer fee": "Taxa de transferência",
        "Debt-free": "Livre de dívidas"
      },
      "formats": {
        "summary": "Quite {balance} a {apr}% de juros anuais em {payoffTime} com pagamentos de {payment}/mês. Total de juros: {totalInterest}. Seu cartão cobra {dailyCost}/dia. Livre de dívidas em {debtFreeDate}."
      },
      "chart": {
        "title": "Comparação de Quitação de Saldo",
        "xLabel": "Mês",
        "yLabel": "Saldo Restante",
        "series": {
          "minimumOnly": "Apenas Mínimo",
          "fixedPayment": "Seu Pagamento",
          "withExtra": "Com Extra"
        }
      },
      "detailedTable": {
        "paymentSchedule": {
          "button": "Ver Cronograma de Pagamentos",
          "title": "Cronograma Mensal de Pagamentos",
          "columns": {
            "month": "Mês",
            "payment": "Pagamento",
            "interest": "Juros",
            "principal": "Principal",
            "balance": "Saldo"
          }
        }
      },
      "infoCards": {
        "costBreakdown": {
          "title": "💰 Detalhamento do Custo Real",
          "items": [
            "Total de Juros Pagos: o preço oculto de manter um saldo mês a mês",
            "Custo Diário de Juros: seu cartão cobra juros todos os dias, não apenas mensalmente",
            "Proporção de Juros: veja quanto do seu primeiro pagamento realmente reduz sua dívida vs alimenta juros",
            "Custo por Real: o preço real — para cada R$ 1 gasto, você pode pagar de volta R$ 1,40+"
          ]
        },
        "payoffStrategy": {
          "title": "📊 Insights da Estratégia de Quitação",
          "items": [
            "Armadilha do Pagamento Mínimo: pagar apenas o mínimo pode transformar 3 anos de dívida em 15+ anos",
            "Poder do Pagamento Extra: mesmo R$ 50/mês extra pode cortar anos do seu cronograma de quitação",
            "Portabilidade de Saldo: um cartão com juros 0% introdutório pode economizar centenas ou milhares em juros",
            "Data Livre de Dívidas: saber sua data exata de quitação proporciona motivação para manter o rumo"
          ]
        },
        "actionTips": {
          "title": "💡 Acelere Sua Quitação",
          "items": [
            "Pague mais que o mínimo — cada real extra vai diretamente para reduzir seu saldo",
            "Considere a avalanche de dívidas: pague cartões com juros mais altos primeiro para minimizar juros totais",
            "Ligue para sua operadora e negocie juros menores — a taxa de sucesso é maior do que a maioria pensa",
            "Configure débito automático acima do mínimo para evitar multas e garantir progresso todo mês"
          ]
        }
      },
      "educationSections": {
        "whatIs": {
          "title": "📖 Como Funcionam os Juros do Cartão de Crédito",
          "content": "Os juros do cartão de crédito são calculados diariamente usando o método de Saldo Médio Diário. Sua Taxa Anual de Juros é dividida por 365 para obter uma Taxa Periódica Diária. Cada dia, essa taxa é multiplicada pelo seu saldo atual, e esses juros são adicionados ao que você deve. Isso significa que os juros são compostos diariamente — você paga juros sobre juros — razão pela qual a dívida do cartão pode crescer tão rapidamente mesmo quando você está fazendo pagamentos.\n\nPor exemplo, um saldo de R$ 5.000 a 22% de juros anuais significa que sua taxa diária é cerca de 0,0603%. Isso é aproximadamente R$ 3,01 cobrados todos os dias. Durante um mês, isso soma cerca de R$ 91,67 apenas em juros. Se seu pagamento mínimo é apenas R$ 100, apenas R$ 8,33 realmente reduzem seu saldo. É por isso que a armadilha do pagamento mínimo existe: a maior parte do seu dinheiro alimenta juros, não redução de dívida."
        },
        "howItWorks": {
          "title": "⚙️ Como Esta Calculadora Funciona",
          "content": "Esta calculadora usa um modelo de amortização iterativo mês a mês que espelha como as operadoras de cartão realmente processam pagamentos. A cada mês, calcula a cobrança de juros (saldo × juros anuais ÷ 12), subtrai isso do seu pagamento para determinar quanto vai para o principal, então reduz o saldo adequadamente. Repete esse processo até o saldo chegar a zero.\n\nAo contrário de estimadores simples de quitação, esta ferramenta também calcula: o custo exato de fazer apenas pagamentos mínimos (que diminuem conforme seu saldo cai, estendendo a quitação dramaticamente), o impacto de pagamentos extras, e a economia potencial de uma portabilidade com 0% de juros. O pagamento mínimo a cada mês é recalculado como o maior entre (saldo × % mínima) ou o valor mínimo base, exatamente como operadoras reais calculam."
        },
        "payoffStrategies": {
          "title": "✅ Estratégias Comprovadas de Quitação",
          "items": [
            "Avalanche de Dívidas: Pague mínimos em todos os cartões, coloque extra no cartão com maior taxa. Economiza mais dinheiro matematicamente mas requer paciência.",
            "Bola de Neve de Dívidas: Quite primeiro o menor saldo para vitórias psicológicas rápidas. Ligeiramente mais caro mas mantém você motivado.",
            "Portabilidade de Saldo: Mova a dívida para um cartão com 0% de juros introdutório. Você pagará uma taxa de 3–5% mas elimina juros por 12–21 meses.",
            "Pagamentos em Parcela Única: Use restituições de imposto, bônus ou recursos extras para fazer grandes pagamentos únicos que reduzem drasticamente seu cronograma.",
            "Pagamentos Quinzenais: Pague metade do seu pagamento mensal a cada duas semanas — você fará 26 meio-pagamentos (13 pagamentos completos) por ano em vez de 12.",
            "Negocie Sua Taxa: Ligue para sua operadora e peça redução da taxa. Clientes antigos com bom histórico de pagamento têm 60–70% de taxa de sucesso."
          ]
        },
        "commonMistakes": {
          "title": "⚠️ Erros Custosos a Evitar",
          "items": [
            "Pagar Apenas o Mínimo: Um saldo de R$ 5.000 a 22% com pagamentos mínimos leva 25+ anos e custa mais de R$ 8.000 apenas em juros.",
            "Ignorar a Taxa de Juros: Muitos portadores não conhecem sua taxa. A média é 22,76% — verifique sua fatura e negocie menor se possível.",
            "Perder Pagamentos: Um único pagamento atrasado pode disparar taxa de juros punitiva de 29,99%, aumentar seu mínimo e danificar seu score.",
            "Continuar Gastando: Fazer pagamentos enquanto ainda adiciona ao saldo cria um efeito esteira onde você nunca progride.",
            "Fechar Cartões Quitados: Fechar contas reduz seu limite total de crédito, aumentando sua taxa de utilização e potencialmente baixando seu score."
          ]
        },
        "examples": {
          "title": "🧮 Cenários Reais de Quitação",
          "columns": 2,
          "examples": [
            {
              "title": "Saldo Médio — Fixo vs Mínimo",
              "content": "Saldo: R$ 6.501 | Juros: 22,76% | Mínimo: 2% ou R$ 35\n\nApenas mínimo: 24 anos, 3 meses — Total pago: R$ 17.476\nFixo R$ 200/mês: 3 anos, 4 meses — Total pago: R$ 7.987\n\n→ Você economiza R$ 9.489 e 21 anos pagando R$ 200/mês em vez do mínimo."
            },
            {
              "title": "Juros Altos + Portabilidade",
              "content": "Saldo: R$ 10.000 | Juros: 29,99% | Pagamento: R$ 300/mês\n\nSem portabilidade: 4 anos, 4 meses — Juros totais: R$ 5.428\nCom portabilidade 0% (18 meses, taxa 3%): Juros totais: R$ 1.868\n\n→ Portabilidade economiza R$ 3.560 mesmo após a taxa de R$ 300. Você fica livre de dívidas 14 meses antes."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Quanto tempo levará para quitar meu cartão de crédito?",
          "answer": "Depende do seu saldo, taxa de juros e pagamento mensal. Com um saldo de R$ 5.000 a 22% de juros, pagando R$ 200/mês leva cerca de 31 meses. Pagando apenas o mínimo pode levar mais de 20 anos. Use esta calculadora para obter seu cronograma personalizado."
        },
        "1": {
          "question": "Quanto do meu pagamento vai para juros vs principal?",
          "answer": "Nos primeiros meses, a maioria do seu pagamento vai para juros. Por exemplo, em um saldo de R$ 5.000 a 22% de juros, os juros do primeiro mês são cerca de R$ 91,67. Se você pagar R$ 200, apenas R$ 108,33 realmente reduzem seu saldo. Conforme seu saldo diminui, mais de cada pagamento vai para o principal."
        },
        "2": {
          "question": "Por que pagar apenas o mínimo é tão caro?",
          "answer": "Pagamentos mínimos são projetados para manter sua conta em dia, não para quitar dívida eficientemente. São tipicamente 1–3% do seu saldo, que mal cobre os juros. Conforme seu saldo cai, o mínimo cai também — então você paga cada vez menos por mês, estendendo a quitação por décadas. Um saldo de R$ 5.000 a 24,99% com mínimos de 2% leva mais de 30 anos e custa mais de R$ 12.000 em juros."
        },
        "3": {
          "question": "Vale a pena fazer portabilidade?",
          "answer": "Uma portabilidade para um cartão com 0% de juros introdutório pode economizar centenas ou milhares em juros, mas apenas se você conseguir quitar a maior parte do saldo durante o período introdutório (tipicamente 12–21 meses). Você pagará uma taxa de portabilidade de 3–5%, que é adicionada ao seu saldo. Esta calculadora compara ambos os cenários para você ver a economia exata."
        },
        "4": {
          "question": "Devo usar o método bola de neve ou avalanche de dívidas?",
          "answer": "A avalanche de dívidas (maior taxa primeiro) economiza mais dinheiro matematicamente. A bola de neve (menor saldo primeiro) proporciona vitórias psicológicas mais rápidas. Pesquisas mostram que o método bola de neve tem maiores taxas de conclusão porque as vitórias rápidas mantêm as pessoas motivadas. Escolha o método que você seguirá — a melhor estratégia é aquela que você realmente segue."
        },
        "5": {
          "question": "Como são calculados os juros do cartão de crédito?",
          "answer": "A maioria das operadoras usa o método de Saldo Médio Diário. Sua taxa anual é dividida por 365 para obter uma taxa diária. Cada dia, essa taxa é multiplicada pelo seu saldo. Essas cobranças diárias são somadas no final do ciclo de faturamento. Isso significa que os juros são compostos diariamente — você é cobrado juros sobre juros acumulados anteriormente — razão pela qual a dívida do cartão cresce mais rápido do que a maioria espera."
        },
        "6": {
          "question": "O que acontece se eu pagar mais que o mínimo mas menos que o saldo total?",
          "answer": "Qualquer valor acima do mínimo vai diretamente para reduzir seu saldo principal. Mesmo R$ 25–R$ 50 extras por mês podem cortar anos do seu cronograma de quitação e economizar juros significativos. Esta calculadora permite comparar diferentes valores de pagamento para ver o impacto exato."
        },
        "7": {
          "question": "Posso negociar uma taxa menor no meu cartão de crédito?",
          "answer": "Sim, e vale a pena tentar. Estudos mostram que 60–80% das pessoas que ligam para sua operadora e pedem redução da taxa recebem uma. Ter um bom histórico de pagamento, conta antiga e uma oferta concorrente de outro cartão fortalece seu caso. Mesmo uma redução de 2–3% pode economizar centenas de reais durante a vida do seu saldo."
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
      }
    },
    fr: {
      "name": "Calculateur de Remboursement de Carte de Crédit",
      "slug": "calculateur-remboursement-carte-credit",
      "subtitle": "Découvrez combien de temps il faut pour rembourser votre carte de crédit, voyez le vrai coût des paiements minimums, et découvrez à quelle vitesse vous pouvez être libre de dettes",
      "breadcrumb": "Remboursement Carte de Crédit",
      "seo": {
        "title": "Calculateur de Remboursement de Carte de Crédit — Date de Liberté de Dette et Économies | Gratuit",
        "description": "Calculez votre calendrier de remboursement de carte de crédit avec le coût d'intérêt quotidien, l'analyse de choc des paiements minimums, les économies de transfert de solde, et une date personnalisée de liberté de dette. Voyez exactement à quelle vitesse les paiements supplémentaires éliminent votre dette.",
        "shortDescription": "Voyez combien de temps pour rembourser votre carte de crédit et économiser sur les intérêts",
        "keywords": [
          "calculateur remboursement carte crédit",
          "calculateur paiement carte crédit",
          "rembourser dette carte crédit",
          "calculateur intérêt carte crédit",
          "calculateur paiement minimum",
          "calculateur remboursement dette",
          "calculateur économies transfert solde",
          "date liberté dette carte crédit"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "currentBalance": {
          "label": "Solde Actuel",
          "helpText": "Le solde total impayé sur votre relevé de carte de crédit",
          "placeholder": "5000"
        },
        "apr": {
          "label": "Taux Annuel Effectif Global (TAEG)",
          "helpText": "Le taux d'intérêt de votre carte — trouvez-le sur votre relevé ou contrat de carte"
        },
        "minimumPaymentPercent": {
          "label": "Pourcentage de Paiement Minimum",
          "helpText": "Le % de votre solde utilisé pour calculer le paiement minimum (généralement 1–3%)"
        },
        "minimumPaymentFloor": {
          "label": "Plancher de Paiement Minimum",
          "helpText": "Le paiement minimum le plus bas que votre émetteur autorise (habituellement 25–35€)"
        },
        "monthlyPayment": {
          "label": "Votre Paiement Mensuel",
          "helpText": "Le montant fixe que vous prévoyez payer chaque mois — laissez vide pour voir les résultats minimum seulement",
          "placeholder": "200"
        },
        "includeExtraPayment": {
          "label": "Ajouter Paiement Mensuel Supplémentaire",
          "helpText": "Voyez comment un paiement supplémentaire chaque mois accélère le remboursement"
        },
        "extraPayment": {
          "label": "Paiement Mensuel Supplémentaire",
          "helpText": "Montant supplémentaire au-delà de votre paiement mensuel régulier",
          "placeholder": "50"
        },
        "includeBalanceTransfer": {
          "label": "Comparer Transfert de Solde",
          "helpText": "Voyez combien vous pourriez économiser en transférant vers une carte avec TAEG promotionnel 0%"
        },
        "introAprMonths": {
          "label": "Période TAEG Promotionnel 0%",
          "helpText": "Nombre de mois avec 0% d'intérêt sur la nouvelle carte (généralement 12–21 mois)"
        },
        "transferFeePercent": {
          "label": "Frais de Transfert de Solde",
          "helpText": "Frais unique facturé pour le transfert (généralement 3–5% du solde)"
        }
      },
      "results": {
        "payoffTime": {
          "label": "Temps de Remboursement"
        },
        "totalInterestPaid": {
          "label": "Total des Intérêts Payés"
        },
        "totalAmountPaid": {
          "label": "Montant Total Payé"
        },
        "dailyInterestCost": {
          "label": "Coût d'Intérêt Quotidien"
        },
        "interestRatioFirstPayment": {
          "label": "Intérêt dans le Premier Paiement"
        },
        "minimumOnlyPayoff": {
          "label": "Remboursement Minimum Seulement"
        },
        "savingsVsMinimum": {
          "label": "Économies vs Minimum"
        },
        "debtFreeDate": {
          "label": "Date de Liberté de Dette"
        },
        "balanceTransferSavings": {
          "label": "Économies Transfert de Solde"
        },
        "effectiveCostPerDollar": {
          "label": "Coût par 1€ Emprunté"
        }
      },
      "presets": {
        "averageAmerican": {
          "label": "Français Moyen",
          "description": "Solde de 6 501€, TAEG 22,76%, paiement 200€/mois"
        },
        "highInterest": {
          "label": "Dette à Taux Élevé",
          "description": "10 000€ à 29,99% TAEG, 300€/mois + transfert de solde"
        },
        "manageable": {
          "label": "Solde Gérable",
          "description": "2 000€ à 18,99% TAEG, paiement 150€/mois"
        },
        "minimumTrap": {
          "label": "Piège du Paiement Minimum",
          "description": "5 000€ à 24,99% — ce qui arrive avec seulement les minimums"
        }
      },
      "tooltips": {
        "payoffTime": "Combien de mois et d'années jusqu'à ce que votre solde atteigne zéro",
        "totalInterestPaid": "Le total des charges d'intérêt que vous paierez sur la durée de vie de votre dette — c'est le 'coût' de l'emprunt",
        "totalAmountPaid": "Votre solde original plus tous les intérêts — le vrai coût total",
        "dailyInterestCost": "Combien d'intérêt votre carte vous facture chaque jour en ce moment",
        "interestRatioFirstPayment": "Quel pourcentage de votre tout premier paiement va aux intérêts vs réellement rembourser le solde",
        "minimumOnlyPayoff": "Combien de temps et combien cela coûte si vous ne payez jamais que le minimum — la métrique choc",
        "savingsVsMinimum": "Combien d'argent vous économisez en intérêts en payant votre montant fixe au lieu du minimum seulement",
        "debtFreeDate": "La date exacte du calendrier où vous ferez votre paiement final et serez complètement libre de dettes",
        "balanceTransferSavings": "Combien vous pourriez économiser en transférant votre solde vers une carte avec TAEG promotionnel 0% (moins les frais de transfert)",
        "effectiveCostPerDollar": "Pour chaque 1€ que vous avez initialement facturé, c'est combien vous finirez par rembourser"
      },
      "values": {
        "years": "années",
        "year": "année",
        "months": "mois",
        "month": "mois",
        "days": "jours",
        "/day": "/jour",
        "Month": "Mois",
        "Payment": "Paiement",
        "Interest": "Intérêt",
        "Principal": "Principal",
        "Balance": "Solde",
        "Minimum Only": "Minimum Seulement",
        "Your Payment": "Votre Paiement",
        "With Extra": "Avec Supplément",
        "of first payment is interest": "du premier paiement est de l'intérêt",
        "minimum only": "minimum seulement",
        "saved vs minimum": "économisé vs minimum",
        "with balance transfer": "avec transfert de solde",
        "per $1 borrowed": "par 1€ emprunté",
        "You pay": "Vous payez",
        "for every": "pour chaque",
        "borrowed": "emprunté",
        "Transfer fee": "Frais de transfert",
        "Debt-free": "Libre de dettes"
      },
      "formats": {
        "summary": "Remboursez {balance} à {apr}% TAEG en {payoffTime} avec des paiements de {payment}/mois. Intérêts totaux : {totalInterest}. Votre carte facture {dailyCost}/jour. Libre de dettes d'ici {debtFreeDate}."
      },
      "chart": {
        "title": "Comparaison de Remboursement de Solde",
        "xLabel": "Mois",
        "yLabel": "Solde Restant",
        "series": {
          "minimumOnly": "Minimum Seulement",
          "fixedPayment": "Votre Paiement",
          "withExtra": "Avec Supplément"
        }
      },
      "detailedTable": {
        "paymentSchedule": {
          "button": "Voir Calendrier de Paiements",
          "title": "Calendrier de Paiements Mensuels",
          "columns": {
            "month": "Mois",
            "payment": "Paiement",
            "interest": "Intérêt",
            "principal": "Principal",
            "balance": "Solde"
          }
        }
      },
      "infoCards": {
        "costBreakdown": {
          "title": "💰 Ventilation du Coût Réel",
          "items": [
            "Total des Intérêts Payés : le prix caché de porter un solde mois après mois",
            "Coût d'Intérêt Quotidien : votre carte facture des intérêts chaque jour, pas seulement mensuellement",
            "Ratio d'Intérêt : voyez combien de votre premier paiement réduit réellement votre dette vs nourrit l'intérêt",
            "Coût par Euro : le vrai prix — pour chaque 1€ facturé, vous pourriez rembourser 1,40€+"
          ]
        },
        "payoffStrategy": {
          "title": "📊 Aperçus de Stratégie de Remboursement",
          "items": [
            "Piège du Paiement Minimum : ne payer que le minimum peut transformer 3 ans de dette en 15+ ans",
            "Pouvoir du Paiement Supplémentaire : même 50€/mois supplémentaires peuvent retrancher des années de votre chronologie de remboursement",
            "Transfert de Solde : une carte avec TAEG promotionnel 0% peut économiser des centaines ou milliers d'euros d'intérêts",
            "Date de Liberté de Dette : connaître votre date exacte de remboursement fournit la motivation pour rester sur la bonne voie"
          ]
        },
        "actionTips": {
          "title": "💡 Accélérez Votre Remboursement",
          "items": [
            "Payez plus que le minimum — chaque euro supplémentaire va directement à la réduction de votre solde",
            "Considérez l'avalanche de dettes : payez d'abord les cartes avec le TAEG le plus élevé pour minimiser l'intérêt total",
            "Appelez votre émetteur et négociez un TAEG plus bas — le taux de succès est plus élevé que la plupart des gens pensent",
            "Configurez un paiement automatique au-dessus du minimum pour éviter les frais de retard et garantir des progrès chaque mois"
          ]
        }
      },
      "educationSections": {
        "whatIs": {
          "title": "📖 Comment Fonctionnent les Intérêts de Carte de Crédit",
          "content": "Les intérêts de carte de crédit sont calculés quotidiennement en utilisant la méthode du Solde Quotidien Moyen (SQM). Votre Taux Annuel Effectif Global (TAEG) est divisé par 365 pour obtenir un Taux Périodique Quotidien (TPQ). Chaque jour, le TPQ est multiplié par votre solde actuel, et cet intérêt est ajouté à ce que vous devez. Cela signifie que l'intérêt se compose quotidiennement — vous payez de l'intérêt sur l'intérêt — c'est pourquoi la dette de carte de crédit peut croître si rapidement même quand vous faites des paiements.\n\nPar exemple, un solde de 5 000€ à 22% TAEG signifie que votre taux quotidien est d'environ 0,0603%. C'est environ 3,01€ facturé chaque jour. Sur un mois, cela s'additionne à environ 91,67€ d'intérêts seuls. Si votre paiement minimum n'est que de 100€, seulement 8,33€ réduisent réellement votre solde. C'est pourquoi le piège du paiement minimum existe : la plupart de votre argent nourrit l'intérêt, pas la réduction de dette."
        },
        "howItWorks": {
          "title": "⚙️ Comment Fonctionne Ce Calculateur",
          "content": "Ce calculateur utilise un modèle d'amortissement itératif mois par mois qui reflète comment les émetteurs de cartes de crédit traitent réellement les paiements. Chaque mois, il calcule les charges d'intérêt (solde × TAEG ÷ 12), soustrait cela de votre paiement pour déterminer combien va au principal, puis réduit le solde en conséquence. Il répète ce processus jusqu'à ce que le solde atteigne zéro.\n\nContrairement aux estimateurs de remboursement simples, cet outil calcule aussi : le coût exact de ne faire que des paiements minimums (qui diminuent à mesure que votre solde baisse, prolongeant dramatiquement le remboursement), l'impact des paiements supplémentaires, et les économies potentielles d'un transfert de solde à 0%. Le paiement minimum chaque mois est recalculé comme le plus grand entre (solde × % minimum) ou le montant plancher minimum, exactement comme les vrais émetteurs le calculent."
        },
        "payoffStrategies": {
          "title": "✅ Stratégies de Remboursement Prouvées",
          "items": [
            "Avalanche de Dettes : Payez les minimums sur toutes les cartes, mettez l'extra vers la carte avec le TAEG le plus élevé. Économise le plus d'argent mathématiquement mais nécessite de la patience.",
            "Boule de Neige de Dettes : Remboursez d'abord le plus petit solde pour des victoires psychologiques rapides. Légèrement plus cher mais vous garde motivé.",
            "Transfert de Solde : Déplacez la dette vers une carte avec TAEG promotionnel 0%. Vous paierez des frais de transfert de 3–5% mais éliminerez les intérêts pendant 12–21 mois.",
            "Paiements Forfaitaires : Utilisez les remboursements d'impôts, primes, ou aubaines pour faire de gros paiements uniques qui réduisent dramatiquement votre chronologie.",
            "Paiements Bi-Hebdomadaires : Payez la moitié de votre paiement mensuel toutes les deux semaines — vous ferez 26 demi-paiements (13 paiements complets) par an au lieu de 12.",
            "Négociez Votre TAEG : Appelez votre émetteur et demandez une réduction de taux. Les clients de longue date avec un bon historique de paiement ont un taux de succès de 60–70%."
          ]
        },
        "commonMistakes": {
          "title": "⚠️ Erreurs Coûteuses à Éviter",
          "items": [
            "Ne Payer Que le Minimum : Un solde de 5 000€ à 22% avec des paiements minimums prend 25+ ans et coûte plus de 8 000€ d'intérêts seuls.",
            "Ignorer le TAEG : Beaucoup de porteurs de cartes ne connaissent pas leur taux. La moyenne est de 22,76% — vérifiez votre relevé et négociez plus bas si possible.",
            "Manquer des Paiements : Un seul paiement en retard peut déclencher un TAEG de pénalité de 29,99%, faire monter votre minimum, et endommager votre score de crédit.",
            "Continuer à Facturer : Faire des paiements tout en continuant à ajouter au solde crée un effet de tapis roulant où vous ne faites jamais de progrès.",
            "Fermer les Cartes Remboursées : Fermer des comptes réduit votre limite de crédit totale, augmentant votre ratio d'utilisation et potentiellement baissant votre score de crédit."
          ]
        },
        "examples": {
          "title": "🧮 Scénarios de Remboursement Réels",
          "columns": 2,
          "examples": [
            {
              "title": "Solde Moyen — Fixe vs Minimum",
              "content": "Solde : 6 501€ | TAEG : 22,76% | Minimum : 2% ou 35€\n\nMinimum seulement : 24 ans, 3 mois — Total payé : 17 476€\nFixe 200€/mois : 3 ans, 4 mois — Total payé : 7 987€\n\n→ Vous économisez 9 489€ et 21 ans en payant 200€/mois au lieu du minimum."
            },
            {
              "title": "Taux Élevé + Transfert de Solde",
              "content": "Solde : 10 000€ | TAEG : 29,99% | Paiement : 300€/mois\n\nSans transfert : 4 ans, 4 mois — Intérêts totaux : 5 428€\nAvec transfert 0% (18 mois, 3% frais) : Intérêts totaux : 1 868€\n\n→ Le transfert de solde économise 3 560€ même après les 300€ de frais. Vous êtes libre de dettes 14 mois plus tôt."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Combien de temps faudra-t-il pour rembourser ma carte de crédit ?",
          "answer": "Cela dépend de votre solde, TAEG, et paiement mensuel. Avec un solde de 5 000€ à 22% TAEG, payer 200€/mois prend environ 31 mois. Ne payer que le minimum pourrait prendre plus de 20 ans. Utilisez ce calculateur pour obtenir votre chronologie personnalisée."
        },
        "1": {
          "question": "Combien de mon paiement de carte de crédit va aux intérêts vs le principal ?",
          "answer": "Dans les premiers mois, la majorité de votre paiement va aux intérêts. Par exemple, sur un solde de 5 000€ à 22% TAEG, l'intérêt du premier mois est d'environ 91,67€. Si vous payez 200€, seulement 108,33€ réduisent réellement votre solde. À mesure que votre solde diminue, plus de chaque paiement va au principal."
        },
        "2": {
          "question": "Pourquoi payer seulement le minimum est-il si cher ?",
          "answer": "Les paiements minimums sont conçus pour garder votre compte à jour, pas pour rembourser la dette efficacement. Ils sont généralement 1–3% de votre solde, ce qui couvre à peine les intérêts. À mesure que votre solde baisse, le minimum baisse aussi — donc vous payez de moins en moins chaque mois, étirant le remboursement sur des décennies. Un solde de 5 000€ à 24,99% TAEG avec 2% de minimums prend plus de 30 ans et coûte plus de 12 000€ d'intérêts."
        },
        "3": {
          "question": "Un transfert de solde en vaut-il la peine ?",
          "answer": "Un transfert de solde vers une carte avec TAEG promotionnel 0% peut vous faire économiser des centaines ou milliers d'euros d'intérêts, mais seulement si vous pouvez rembourser la plupart du solde pendant la période promotionnelle (généralement 12–21 mois). Vous paierez des frais de transfert de 3–5%, qui sont ajoutés à votre solde. Ce calculateur compare les deux scénarios pour que vous puissiez voir les économies exactes."
        },
        "4": {
          "question": "Devrais-je utiliser la méthode boule de neige ou avalanche de dettes ?",
          "answer": "L'avalanche de dettes (TAEG le plus élevé en premier) économise le plus d'argent mathématiquement. La boule de neige de dettes (plus petit solde en premier) fournit des victoires psychologiques plus rapides. La recherche montre que la méthode boule de neige a des taux d'achèvement plus élevés car les victoires rapides gardent les gens motivés. Choisissez la méthode à laquelle vous vous tiendrez — la meilleure stratégie est celle que vous suivez réellement."
        },
        "5": {
          "question": "Comment les intérêts de carte de crédit sont-ils calculés ?",
          "answer": "La plupart des émetteurs utilisent la méthode du Solde Quotidien Moyen. Votre TAEG est divisé par 365 pour obtenir un taux quotidien. Chaque jour, ce taux est multiplié par votre solde. Ces charges quotidiennes sont additionnées à la fin du cycle de facturation. Cela signifie que l'intérêt se compose quotidiennement — vous êtes facturé de l'intérêt sur l'intérêt précédemment accumulé — c'est pourquoi la dette de carte de crédit croît plus rapidement que la plupart des gens s'y attendent."
        },
        "6": {
          "question": "Que se passe-t-il si je paie plus que le minimum mais moins que le solde complet ?",
          "answer": "Tout montant au-dessus du minimum va directement à la réduction de votre solde principal. Même 25–50€ supplémentaires par mois peuvent retrancher des années de votre chronologie de remboursement et économiser des intérêts significatifs. Ce calculateur vous permet de comparer différents montants de paiement pour voir l'impact exact."
        },
        "7": {
          "question": "Puis-je négocier un TAEG plus bas sur ma carte de crédit ?",
          "answer": "Oui, et cela vaut la peine d'essayer. Les études montrent que 60–80% des personnes qui appellent leur émetteur et demandent une réduction de taux en reçoivent une. Avoir un bon historique de paiement, une ancienneté de compte longue, et une offre concurrente d'une autre carte renforce votre cas. Même une réduction de 2–3% peut économiser des centaines d'euros sur la durée de vie de votre solde."
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
      }
    },
    de: {
      "name": "Kreditkarten-Tilgungsrechner",
      "slug": "kreditkarten-tilgungs-rechner",
      "subtitle": "Finden Sie heraus, wie lange es dauert, Ihre Kreditkarte abzubezahlen, sehen Sie die wahren Kosten von Mindestzahlungen und entdecken Sie, wie viel schneller Sie schuldenfrei sein können",
      "breadcrumb": "Kreditkarten-Tilgung",
      "seo": {
        "title": "Kreditkarten-Tilgungsrechner — Schuldenfreies Datum & Ersparnisse | Kostenlos",
        "description": "Berechnen Sie Ihren Kreditkarten-Tilgungsplan mit täglichen Zinskosten, Mindestzahlungsschock-Analyse, Umschuldungsersparnissen und einem personalisierten schuldenfreien Datum. Sehen Sie genau, wie viel schneller Zusatzzahlungen Ihre Schulden beseitigen.",
        "shortDescription": "Sehen Sie, wie lange es dauert, Ihre Kreditkarte abzubezahlen und Zinsen zu sparen",
        "keywords": [
          "kreditkarten tilgungsrechner",
          "kreditkarten zahlungsrechner",
          "kreditkartenschulden abbezahlen",
          "kreditkarten zinsrechner",
          "mindestzahlungsrechner",
          "schuldentilgungsrechner",
          "umschuldungsersparnisrechner",
          "kreditkarten schuldenfreies datum"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "currentBalance": {
          "label": "Aktueller Saldo",
          "helpText": "Der gesamte ausstehende Saldo auf Ihrer Kreditkartenabrechnung",
          "placeholder": "5000"
        },
        "apr": {
          "label": "Effektiver Jahreszins (APR)",
          "helpText": "Der Zinssatz Ihrer Karte — finden Sie ihn auf Ihrer Abrechnung oder dem Kartenvertrag"
        },
        "minimumPaymentPercent": {
          "label": "Mindestzahlungsprozentsatz",
          "helpText": "Der Prozentsatz Ihres Saldos zur Berechnung der Mindestzahlung (typischerweise 1–3%)"
        },
        "minimumPaymentFloor": {
          "label": "Mindestzahlungsuntergrenze",
          "helpText": "Die niedrigste Mindestzahlung, die Ihr Anbieter erlaubt (normalerweise 25–35€)"
        },
        "monthlyPayment": {
          "label": "Ihre monatliche Zahlung",
          "helpText": "Der feste Betrag, den Sie jeden Monat zu zahlen planen — lassen Sie es leer, um nur Mindestergebnisse zu sehen",
          "placeholder": "200"
        },
        "includeExtraPayment": {
          "label": "Zusätzliche monatliche Zahlung hinzufügen",
          "helpText": "Sehen Sie, wie eine zusätzliche Zahlung jeden Monat die Tilgung beschleunigt"
        },
        "extraPayment": {
          "label": "Zusätzliche monatliche Zahlung",
          "helpText": "Zusätzlicher Betrag über Ihre reguläre monatliche Zahlung hinaus",
          "placeholder": "50"
        },
        "includeBalanceTransfer": {
          "label": "Umschuldung vergleichen",
          "helpText": "Sehen Sie, wie viel Sie durch Übertragung auf eine 0% Einführungszins-Karte sparen könnten"
        },
        "introAprMonths": {
          "label": "0% Einführungszins-Zeitraum",
          "helpText": "Anzahl der Monate mit 0% Zinsen auf der neuen Karte (typischerweise 12–21 Monate)"
        },
        "transferFeePercent": {
          "label": "Umschuldungsgebühr",
          "helpText": "Einmalige Gebühr für die Übertragung (typischerweise 3–5% des Saldos)"
        }
      },
      "results": {
        "payoffTime": {
          "label": "Zeit bis zur Tilgung"
        },
        "totalInterestPaid": {
          "label": "Gezahlte Gesamtzinsen"
        },
        "totalAmountPaid": {
          "label": "Gezahlter Gesamtbetrag"
        },
        "dailyInterestCost": {
          "label": "Tägliche Zinskosten"
        },
        "interestRatioFirstPayment": {
          "label": "Zinsen in erster Zahlung"
        },
        "minimumOnlyPayoff": {
          "label": "Nur-Mindest-Tilgung"
        },
        "savingsVsMinimum": {
          "label": "Ersparnisse vs. Minimum"
        },
        "debtFreeDate": {
          "label": "Schuldenfreies Datum"
        },
        "balanceTransferSavings": {
          "label": "Umschuldungsersparnisse"
        },
        "effectiveCostPerDollar": {
          "label": "Kosten pro 1€ Kredit"
        }
      },
      "presets": {
        "averageAmerican": {
          "label": "Durchschnittsdeutscher",
          "description": "6.501€ Saldo, 22,76% APR, 200€/Monat Zahlung"
        },
        "highInterest": {
          "label": "Hochzinsschulden",
          "description": "10.000€ bei 29,99% APR, 300€/Monat + Umschuldung"
        },
        "manageable": {
          "label": "Bewältigbarer Saldo",
          "description": "2.000€ bei 18,99% APR, 150€/Monat Zahlung"
        },
        "minimumTrap": {
          "label": "Mindestzahlungsfalle",
          "description": "5.000€ bei 24,99% — was bei nur Mindestzahlungen passiert"
        }
      },
      "tooltips": {
        "payoffTime": "Wie viele Monate und Jahre bis Ihr Saldo null erreicht",
        "totalInterestPaid": "Die gesamten Zinsgebühren, die Sie über die Laufzeit Ihrer Schuld zahlen werden — das sind die 'Kosten' des Kredits",
        "totalAmountPaid": "Ihr ursprünglicher Saldo plus alle Zinsen — die wahren Gesamtkosten",
        "dailyInterestCost": "Wie viel Zinsen Ihre Karte Ihnen jeden einzelnen Tag gerade jetzt berechnet",
        "interestRatioFirstPayment": "Welcher Prozentsatz Ihrer allerersten Zahlung für Zinsen vs. tatsächliche Saldoreduktion verwendet wird",
        "minimumOnlyPayoff": "Wie lange und wie viel es kostet, wenn Sie nur das Minimum zahlen — die Schockmetrik",
        "savingsVsMinimum": "Wie viel Geld Sie bei Zinsen sparen, indem Sie Ihren festen Betrag statt nur das Minimum zahlen",
        "debtFreeDate": "Das genaue Kalenderdatum, an dem Sie Ihre letzte Zahlung leisten und völlig schuldenfrei sein werden",
        "balanceTransferSavings": "Wie viel Sie durch Übertragung Ihres Saldos auf eine 0% Einführungszins-Karte sparen könnten (minus Übertragungsgebühr)",
        "effectiveCostPerDollar": "Für jeden 1€, den Sie ursprünglich belastet haben, ist dies, wie viel Sie tatsächlich zurückzahlen werden"
      },
      "values": {
        "years": "Jahre",
        "year": "Jahr",
        "months": "Monate",
        "month": "Monat",
        "days": "Tage",
        "/day": "/Tag",
        "Month": "Monat",
        "Payment": "Zahlung",
        "Interest": "Zinsen",
        "Principal": "Kapital",
        "Balance": "Saldo",
        "Minimum Only": "Nur Minimum",
        "Your Payment": "Ihre Zahlung",
        "With Extra": "Mit Extra",
        "of first payment is interest": "der ersten Zahlung sind Zinsen",
        "minimum only": "nur minimum",
        "saved vs minimum": "gespart vs. minimum",
        "with balance transfer": "mit umschuldung",
        "per $1 borrowed": "pro 1€ kredit",
        "You pay": "Sie zahlen",
        "for every": "für jeden",
        "borrowed": "geliehen",
        "Transfer fee": "Übertragungsgebühr",
        "Debt-free": "Schuldenfrei"
      },
      "formats": {
        "summary": "Bezahlen Sie {balance} bei {apr}% APR in {payoffTime} mit {payment}€/Monat Zahlungen ab. Gesamtzinsen: {totalInterest}. Ihre Karte berechnet {dailyCost}/Tag. Schuldenfrei bis {debtFreeDate}."
      },
      "chart": {
        "title": "Saldo-Tilgungsvergleich",
        "xLabel": "Monat",
        "yLabel": "Verbleibender Saldo",
        "series": {
          "minimumOnly": "Nur Minimum",
          "fixedPayment": "Ihre Zahlung",
          "withExtra": "Mit Extra"
        }
      },
      "detailedTable": {
        "paymentSchedule": {
          "button": "Zahlungsplan anzeigen",
          "title": "Monatlicher Zahlungsplan",
          "columns": {
            "month": "Monat",
            "payment": "Zahlung",
            "interest": "Zinsen",
            "principal": "Kapital",
            "balance": "Saldo"
          }
        }
      },
      "infoCards": {
        "costBreakdown": {
          "title": "💰 Wahre Kostenaufschlüsselung",
          "items": [
            "Gezahlte Gesamtzinsen: der versteckte Preis für das monatliche Führen eines Saldos",
            "Tägliche Zinskosten: Ihre Karte berechnet Zinsen jeden einzelnen Tag, nicht nur monatlich",
            "Zinsverhältnis: sehen Sie, wie viel Ihrer ersten Zahlung tatsächlich Ihre Schuld reduziert vs. Zinsen füttert",
            "Kosten pro Euro: der echte Preisschild — für jeden geliehenen 1€ zahlen Sie möglicherweise 1,40€+ zurück"
          ]
        },
        "payoffStrategy": {
          "title": "📊 Tilgungsstrategie-Einblicke",
          "items": [
            "Mindestzahlungsfalle: nur das Minimum zu zahlen kann 3 Jahre Schulden in 15+ Jahre verwandeln",
            "Extra-Zahlungskraft: selbst 50€/Monat extra können Jahre von Ihrem Tilgungsplan abschneiden",
            "Umschuldung: eine 0% Einführungszins-Karte kann Hunderte oder Tausende an Zinsen sparen",
            "Schuldenfreies Datum: Ihr genaues Tilgungsdatum zu kennen motiviert, am Ball zu bleiben"
          ]
        },
        "actionTips": {
          "title": "💡 Beschleunigen Sie Ihre Tilgung",
          "items": [
            "Zahlen Sie mehr als das Minimum — jeder Extra-Euro geht direkt zur Saldoreduktion",
            "Erwägen Sie die Schuldenlawine: zahlen Sie zuerst Karten mit höchstem APR, um Gesamtzinsen zu minimieren",
            "Rufen Sie Ihren Anbieter an und verhandeln Sie einen niedrigeren APR — Erfolgsrate ist höher als die meisten denken",
            "Richten Sie Autopay über dem Minimum ein, um Verspätungsgebühren zu vermeiden und jeden Monat Fortschritt zu garantieren"
          ]
        }
      },
      "educationSections": {
        "whatIs": {
          "title": "📖 Wie Kreditkartenzinsen funktionieren",
          "content": "Kreditkartenzinsen werden täglich mit der Durchschnittlichen Täglichen Saldo (ADB) Methode berechnet. Ihr Effektiver Jahreszins (APR) wird durch 365 geteilt, um einen Täglichen Periodischen Satz (DPR) zu erhalten. Jeden Tag wird der DPR mit Ihrem aktuellen Saldo multipliziert, und diese Zinsen werden zu dem hinzugefügt, was Sie schulden. Das bedeutet, Zinsen werden täglich kapitalisiert — Sie zahlen Zinsen auf Zinsen — weshalb Kreditkartenschulden so schnell wachsen können, selbst wenn Sie Zahlungen leisten.\n\nZum Beispiel bedeutet ein 5.000€ Saldo bei 22% APR, dass Ihr Tagessatz etwa 0,0603% beträgt. Das sind etwa 3,01€, die jeden Tag berechnet werden. Über einen Monat summiert sich das auf etwa 91,67€ nur an Zinsen. Wenn Ihre Mindestzahlung nur 100€ beträgt, reduzieren nur 8,33€ tatsächlich Ihren Saldo. Deshalb existiert die Mindestzahlungsfalle: das meiste Ihres Geldes füttert Zinsen, nicht Schuldenabbau."
        },
        "howItWorks": {
          "title": "⚙️ Wie dieser Rechner funktioniert",
          "content": "Dieser Rechner verwendet ein iteratives Monat-für-Monat-Tilgungsmodell, das widerspiegelt, wie Kreditkartenanbieter tatsächlich Zahlungen verarbeiten. Jeden Monat berechnet er die Zinsbelastung (Saldo × APR ÷ 12), subtrahiert das von Ihrer Zahlung, um zu bestimmen, wie viel zum Kapital geht, dann reduziert den Saldo entsprechend. Er wiederholt diesen Prozess, bis der Saldo null erreicht.\n\nIm Gegensatz zu einfachen Tilgungsschätzern berechnet dieses Tool auch: die genauen Kosten, nur Mindestzahlungen zu leisten (die sinken, wenn Ihr Saldo fällt, was die Tilgung dramatisch verlängert), die Auswirkung von Zusatzzahlungen und die potentiellen Ersparnisse einer 0% Umschuldung. Die Mindestzahlung jeden Monat wird neu berechnet als das Größere von (Saldo × Mindest-%) oder dem Mindestbetrag, genau wie echte Anbieter es berechnen."
        },
        "payoffStrategies": {
          "title": "✅ Bewährte Tilgungsstrategien",
          "items": [
            "Schuldenlawine: Zahlen Sie Mindest auf alle Karten, setzen Sie Extra auf die höchste APR-Karte. Spart mathematisch das meiste Geld, erfordert aber Geduld.",
            "Schuldenschneeball: Zahlen Sie zuerst den kleinsten Saldo ab für schnelle psychologische Siege. Etwas teurer, aber hält Sie motiviert.",
            "Umschuldung: Verschieben Sie Schulden auf eine 0% Einführungszins-Karte. Sie zahlen eine 3–5% Übertragungsgebühr, aber eliminieren Zinsen für 12–21 Monate.",
            "Einmalzahlungen: Nutzen Sie Steuerrückerstattungen, Boni oder Glücksfälle für große Einmalzahlungen, die Ihren Zeitplan dramatisch verkürzen.",
            "Zweiwöchentliche Zahlungen: Zahlen Sie die Hälfte Ihrer Monatszahlung alle zwei Wochen — Sie machen 26 halbe Zahlungen (13 volle Zahlungen) pro Jahr statt 12.",
            "Verhandeln Sie Ihren APR: Rufen Sie Ihren Anbieter an und bitten Sie um eine Zinssenkung. Langjährige Kunden mit guter Zahlungshistorie haben eine 60–70% Erfolgsrate."
          ]
        },
        "commonMistakes": {
          "title": "⚠️ Teure Fehler zu vermeiden",
          "items": [
            "Nur das Minimum zahlen: Ein 5.000€ Saldo bei 22% mit Mindestzahlungen dauert 25+ Jahre und kostet über 8.000€ nur an Zinsen.",
            "Den APR ignorieren: Viele Karteninhaber kennen ihren Satz nicht. Der Durchschnitt liegt bei 22,76% — prüfen Sie Ihre Abrechnung und verhandeln Sie niedriger, wenn möglich.",
            "Zahlungen verpassen: Eine einzige verspätete Zahlung kann einen Straf-APR von 29,99% auslösen, Ihr Minimum erhöhen und Ihre Kreditwürdigkeit schädigen.",
            "Weiter belasten: Zahlungen zu leisten, während Sie weiterhin zum Saldo hinzufügen, erzeugt einen Laufbandeffekt, wo Sie nie Fortschritt machen.",
            "Abbezahlte Karten schließen: Konten zu schließen reduziert Ihr Gesamtkreditlimit, erhöht Ihre Nutzungsrate und kann Ihre Kreditwürdigkeit senken."
          ]
        },
        "examples": {
          "title": "🧮 Echte Tilgungsszenarien",
          "columns": 2,
          "examples": [
            {
              "title": "Durchschnittssaldo — Fest vs. Minimum",
              "content": "Saldo: 6.501€ | APR: 22,76% | Minimum: 2% oder 35€\n\nNur Minimum: 24 Jahre, 3 Monate — Gesamt gezahlt: 17.476€\nFest 200€/Monat: 3 Jahre, 4 Monate — Gesamt gezahlt: 7.987€\n\n→ Sie sparen 9.489€ und 21 Jahre durch Zahlung von 200€/Monat statt dem Minimum."
            },
            {
              "title": "Hochzins + Umschuldung",
              "content": "Saldo: 10.000€ | APR: 29,99% | Zahlung: 300€/Monat\n\nOhne Übertragung: 4 Jahre, 4 Monate — Gesamtzinsen: 5.428€\nMit 0% Übertragung (18 Mo, 3% Gebühr): Gesamtzinsen: 1.868€\n\n→ Umschuldung spart 3.560€ selbst nach der 300€ Gebühr. Sie sind 14 Monate früher schuldenfrei."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Wie lange dauert es, meine Kreditkarte abzubezahlen?",
          "answer": "Es hängt von Ihrem Saldo, APR und monatlicher Zahlung ab. Mit einem 5.000€ Saldo bei 22% APR dauert die Zahlung von 200€/Monat etwa 31 Monate. Nur das Minimum zu zahlen könnte über 20 Jahre dauern. Nutzen Sie diesen Rechner für Ihren personalisierten Zeitplan."
        },
        "1": {
          "question": "Wie viel meiner Kreditkartenzahlung geht für Zinsen vs. Kapital?",
          "answer": "In den ersten Monaten geht der Großteil Ihrer Zahlung für Zinsen. Zum Beispiel bei einem 5.000€ Saldo bei 22% APR betragen die Zinsen des ersten Monats etwa 91,67€. Wenn Sie 200€ zahlen, reduzieren nur 108,33€ tatsächlich Ihren Saldo. Wenn Ihr Saldo sinkt, geht mehr von jeder Zahlung zum Kapital."
        },
        "2": {
          "question": "Warum ist es so teuer, nur das Minimum zu zahlen?",
          "answer": "Mindestzahlungen sind darauf ausgelegt, Ihr Konto aktuell zu halten, nicht Schulden effizient abzubezahlen. Sie betragen typischerweise 1–3% Ihres Saldos, was kaum die Zinsen abdeckt. Wenn Ihr Saldo sinkt, sinkt auch das Minimum — also zahlen Sie jeden Monat weniger und weniger, was die Tilgung über Jahrzehnte streckt. Ein 5.000€ Saldo bei 24,99% APR mit 2% Mindest dauert über 30 Jahre und kostet mehr als 12.000€ an Zinsen."
        },
        "3": {
          "question": "Lohnt sich eine Umschuldung?",
          "answer": "Eine Umschuldung auf eine 0% Einführungszins-Karte kann Ihnen Hunderte oder Tausende von Euros an Zinsen sparen, aber nur wenn Sie den größten Teil des Saldos während der Einführungsperiode abbezahlen können (typischerweise 12–21 Monate). Sie zahlen eine Übertragungsgebühr von 3–5%, die zu Ihrem Saldo hinzugefügt wird. Dieser Rechner vergleicht beide Szenarien, damit Sie die genauen Ersparnisse sehen können."
        },
        "4": {
          "question": "Soll ich die Schuldenschneeball- oder Schuldenlawinen-Methode verwenden?",
          "answer": "Die Schuldenlawine (höchster APR zuerst) spart mathematisch das meiste Geld. Der Schuldenschneeball (kleinster Saldo zuerst) bietet schnellere psychologische Siege. Forschung zeigt, dass die Schneeball-Methode höhere Abschlussraten hat, weil die schnellen Siege Menschen motiviert halten. Wählen Sie die Methode, bei der Sie bleiben — die beste Strategie ist die, die Sie tatsächlich befolgen."
        },
        "5": {
          "question": "Wie werden Kreditkartenzinsen berechnet?",
          "answer": "Die meisten Anbieter verwenden die Durchschnittliche Tägliche Saldo Methode. Ihr APR wird durch 365 geteilt, um einen Tagessatz zu erhalten. Jeden Tag wird dieser Satz mit Ihrem Saldo multipliziert. Diese täglichen Belastungen werden am Ende des Abrechnungszyklus summiert. Das bedeutet, Zinsen werden täglich kapitalisiert — Sie werden auf zuvor aufgelaufene Zinsen belastet — weshalb Kreditkartenschulden schneller wachsen, als die meisten Menschen erwarten."
        },
        "6": {
          "question": "Was passiert, wenn ich mehr als das Minimum, aber weniger als den vollen Saldo zahle?",
          "answer": "Jeder Betrag über dem Minimum geht direkt zur Reduzierung Ihres Hauptsaldos. Selbst zusätzliche 25–50€ pro Monat können Jahre von Ihrem Tilgungsplan abschneiden und erhebliche Zinsen sparen. Dieser Rechner lässt Sie verschiedene Zahlungsbeträge vergleichen, um die genaue Auswirkung zu sehen."
        },
        "7": {
          "question": "Kann ich einen niedrigeren APR auf meiner Kreditkarte verhandeln?",
          "answer": "Ja, und es ist einen Versuch wert. Studien zeigen, dass 60–80% der Menschen, die ihren Anbieter anrufen und um eine Zinssenkung bitten, eine erhalten. Eine gute Zahlungshistorie, lange Kontodauer und ein Konkurrenzangebot einer anderen Karte stärken Ihre Position. Selbst eine 2–3% Reduzierung kann Hunderte von Euros über die Laufzeit Ihres Saldos sparen."
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
      }
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════
  inputs: [
    // ── Balance & APR ────────────────────────────────────────
    {
      id: "currentBalance",
      type: "number",
      defaultValue: null,
      placeholder: "5000",
      showSlider: false,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "apr",
      type: "slider",
      defaultValue: 22.76,
      min: 0,
      max: 36,
      step: 0.01,
      suffix: "%",
    },

    // ── Minimum Payment Config ───────────────────────────────
    {
      id: "minimumPaymentPercent",
      type: "slider",
      defaultValue: 2,
      min: 1,
      max: 5,
      step: 0.5,
      suffix: "%",
    },
    {
      id: "minimumPaymentFloor",
      type: "stepper",
      defaultValue: 35,
      min: 15,
      max: 50,
      step: 5,
      suffix: "$",
    },

    // ── Your Monthly Payment ─────────────────────────────────
    {
      id: "monthlyPayment",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      showSlider: false,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },

    // ── Extra Payment (toggle) ───────────────────────────────
    {
      id: "includeExtraPayment",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "extraPayment",
      type: "number",
      defaultValue: null,
      placeholder: "50",
      showSlider: false,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeExtraPayment", value: true },
    },

    // ── Balance Transfer (toggle) ────────────────────────────
    {
      id: "includeBalanceTransfer",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "introAprMonths",
      type: "stepper",
      defaultValue: 18,
      min: 6,
      max: 24,
      step: 1,
      suffix: "months",
      showWhen: { field: "includeBalanceTransfer", value: true },
    },
    {
      id: "transferFeePercent",
      type: "slider",
      defaultValue: 3,
      min: 0,
      max: 5,
      step: 0.5,
      suffix: "%",
      showWhen: { field: "includeBalanceTransfer", value: true },
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════
  results: [
    { id: "payoffTime", type: "primary", format: "text" },
    { id: "totalInterestPaid", type: "secondary", format: "currency" },
    { id: "totalAmountPaid", type: "secondary", format: "currency" },
    { id: "dailyInterestCost", type: "secondary", format: "text" },
    { id: "interestRatioFirstPayment", type: "secondary", format: "text" },
    { id: "minimumOnlyPayoff", type: "secondary", format: "text" },
    { id: "savingsVsMinimum", type: "secondary", format: "text" },
    { id: "debtFreeDate", type: "secondary", format: "text" },
    { id: "balanceTransferSavings", type: "secondary", format: "text" },
    { id: "effectiveCostPerDollar", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // DETAILED TABLE — Monthly payment schedule
  // ═══════════════════════════════════════════════════════════════
  detailedTable: {
    id: "paymentSchedule",
    buttonLabel: "detailedTable.paymentSchedule.button",
    modalTitle: "detailedTable.paymentSchedule.title",
    columns: [
      { key: "month", label: "detailedTable.paymentSchedule.columns.month" },
      {
        key: "payment",
        label: "detailedTable.paymentSchedule.columns.payment",
      },
      {
        key: "interest",
        label: "detailedTable.paymentSchedule.columns.interest",
      },
      {
        key: "principal",
        label: "detailedTable.paymentSchedule.columns.principal",
      },
      {
        key: "balance",
        label: "detailedTable.paymentSchedule.columns.balance",
        highlight: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // INFO CARDS — 2 list + 1 horizontal (tips last)
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    { id: "costBreakdown", type: "list", icon: "💰", itemCount: 4 },
    { id: "payoffStrategy", type: "list", icon: "📊", itemCount: 4 },
    { id: "actionTips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ═══════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════
  referenceData: [],

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS — 2 prose + 2 list + 1 code-example
  // ═══════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "payoffStrategies", type: "list", icon: "✅", itemCount: 6 },
    { id: "commonMistakes", type: "list", icon: "⚠️", itemCount: 5 },
    {
      id: "examples",
      type: "code-example",
      icon: "🧮",
      columns: 2,
      exampleCount: 2,
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // FAQs — 8 for Schema.org rich snippets
  // ═══════════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════════
  // REFERENCES — E-E-A-T for Google
  // ═══════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Consumer Financial Protection Bureau",
      year: "2025",
      title:
        "What is a minimum payment on a credit card?",
      source: "CFPB Consumer Education",
      url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-minimum-payment-on-a-credit-card-en-69/",
    },
    {
      authors: "Board of Governors of the Federal Reserve System",
      year: "2025",
      title: "Consumer Credit — G.19 Statistical Release",
      source: "Federal Reserve Economic Data",
      url: "https://www.federalreserve.gov/releases/g19/current/",
    },
    {
      authors: "Investopedia",
      year: "2025",
      title:
        "How Credit Card Interest Is Calculated",
      source: "Investopedia Financial Education",
      url: "https://www.investopedia.com/terms/a/averagedailybalance.asp",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MISC CONFIG
  // ═══════════════════════════════════════════════════════════════
  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 8700 },
  },
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: false,
    category: "finance",
  },
  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },
  relatedCalculators: [
    "debt-payoff-calculator",
    "loan-calculator",
    "compound-interest-calculator",
    "savings-calculator",
  ],
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

/* ═══════════════════════════════════════════════════════════════════
   CALCULATE FUNCTION
   Iterative amortization: each month → interest = balance × (APR/12)
   Unique features:
   • Minimum-only scenario (decreasing payments)
   • Fixed payment scenario
   • Extra payment scenario
   • Balance transfer comparison (0% intro + fee)
   • Daily interest cost
   • Interest-to-payment ratio on first payment
   • Effective cost per dollar borrowed
   • Calendar debt-free date
   • Chart data: 3-line balance decay comparison
   • Table data: month-by-month payment schedule
   ═══════════════════════════════════════════════════════════════════ */

// Currency symbols for formatting
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
  JPY: "¥", INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF ",
  COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  CNY: "¥", KRW: "₩", SEK: "kr ", NOK: "kr ", DKK: "kr ",
  PLN: "zł", CZK: "Kč ", HUF: "Ft ", TRY: "₺", ZAR: "R",
  SGD: "S$", HKD: "HK$", NZD: "NZ$", THB: "฿", TWD: "NT$",
  ILS: "₪", PHP: "₱", MYR: "RM ",
};

function fmtCurr(amount: number, sym: string): string {
  if (Math.abs(amount) >= 1_000_000) {
    return `${sym}${(amount / 1_000_000).toFixed(2)}M`;
  }
  return `${sym}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

function fmtCurrDec(amount: number, sym: string): string {
  return `${sym}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// ── Payoff simulation engine ─────────────────────────────────
interface PayoffResult {
  months: number;
  totalPaid: number;
  totalInterest: number;
  schedule: Array<{
    month: number;
    payment: number;
    interest: number;
    principal: number;
    balance: number;
  }>;
}

const MAX_MONTHS = 600; // 50-year safety cap

/**
 * Simulate credit card payoff month by month.
 * @param balance     Starting balance
 * @param aprPercent  Annual Percentage Rate (e.g. 22.76)
 * @param getPayment  Function that returns payment amount given current balance
 * @returns PayoffResult with schedule
 */
function simulatePayoff(
  balance: number,
  aprPercent: number,
  getPayment: (bal: number) => number,
): PayoffResult {
  const monthlyRate = aprPercent / 100 / 12;
  let remaining = balance;
  let totalPaid = 0;
  let totalInterest = 0;
  const schedule: PayoffResult["schedule"] = [];

  for (let m = 1; m <= MAX_MONTHS && remaining > 0.01; m++) {
    const interest = remaining * monthlyRate;
    let payment = getPayment(remaining);

    // Payment must at least cover interest to make progress
    // If payment < interest, flag but continue (negative amortization)
    if (payment > remaining + interest) {
      payment = remaining + interest; // Final payment
    }

    const principal = payment - interest;
    remaining = Math.max(0, remaining - principal);
    totalPaid += payment;
    totalInterest += interest;

    schedule.push({
      month: m,
      payment: Math.round(payment * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      principal: Math.round(principal * 100) / 100,
      balance: Math.round(remaining * 100) / 100,
    });
  }

  return {
    months: schedule.length,
    totalPaid: Math.round(totalPaid * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    schedule,
  };
}

/**
 * Simulate balance transfer scenario:
 * 0% interest during intro period, then revert to original APR
 */
function simulateBalanceTransfer(
  balance: number,
  aprPercent: number,
  introMonths: number,
  transferFeePercent: number,
  getPayment: (bal: number) => number,
): PayoffResult {
  const transferFee = balance * (transferFeePercent / 100);
  const startBalance = balance + transferFee;
  const monthlyRate = aprPercent / 100 / 12;
  let remaining = startBalance;
  let totalPaid = 0;
  let totalInterest = 0;
  const schedule: PayoffResult["schedule"] = [];

  for (let m = 1; m <= MAX_MONTHS && remaining > 0.01; m++) {
    // During intro period: 0% interest. After: normal APR
    const interest = m <= introMonths ? 0 : remaining * monthlyRate;
    let payment = getPayment(remaining);

    if (payment > remaining + interest) {
      payment = remaining + interest;
    }

    const principal = payment - interest;
    remaining = Math.max(0, remaining - principal);
    totalPaid += payment;
    totalInterest += interest;

    schedule.push({
      month: m,
      payment: Math.round(payment * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      principal: Math.round(principal * 100) / 100,
      balance: Math.round(remaining * 100) / 100,
    });
  }

  return {
    months: schedule.length,
    totalPaid: Math.round(totalPaid * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    schedule,
  };
}

// ── Format time duration ─────────────────────────────────────
function formatDuration(
  totalMonths: number,
  v: Record<string, string>,
): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const yLabel = years === 1 ? (v["year"] || "year") : (v["years"] || "years");
  const mLabel =
    months === 1 ? (v["month"] || "month") : (v["months"] || "months");

  if (years === 0) return `${months} ${mLabel}`;
  if (months === 0) return `${years} ${yLabel}`;
  return `${years} ${yLabel}, ${months} ${mLabel}`;
}

// ── Get debt-free date ───────────────────────────────────────
function getDebtFreeDate(monthsFromNow: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsFromNow);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ═══════════════════════════════════════════════════════════════
// MAIN CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

export function calculateCreditCardPayoff(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  // ── Translations ──────────────────────────────────────────
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Currency symbol ───────────────────────────────────────
  const curr = fieldUnits?.currentBalance || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ── Read inputs ───────────────────────────────────────────
  const balance = (values.currentBalance as number) || 0;
  const apr = (values.apr as number) || 0;
  const minPayPct = (values.minimumPaymentPercent as number) || 2;
  const minPayFloor = (values.minimumPaymentFloor as number) || 35;
  const fixedPayment = (values.monthlyPayment as number) || 0;
  const includeExtra = values.includeExtraPayment === true;
  const extraPay = includeExtra ? ((values.extraPayment as number) || 0) : 0;
  const includeTransfer = values.includeBalanceTransfer === true;
  const introMonths = includeTransfer
    ? ((values.introAprMonths as number) || 18)
    : 0;
  const transferFeePct = includeTransfer
    ? ((values.transferFeePercent as number) || 3)
    : 0;

  // ── Validation ────────────────────────────────────────────
  if (balance <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Minimum payment function (decreasing) ─────────────────
  const getMinPayment = (bal: number): number => {
    return Math.max(bal * (minPayPct / 100), minPayFloor, 0);
  };

  // ── Determine effective monthly payment ───────────────────
  // If user entered a payment, use it. Otherwise, use minimum.
  const hasFixedPayment = fixedPayment > 0;
  const totalFixedPayment = hasFixedPayment
    ? fixedPayment + extraPay
    : 0;

  // ── SCENARIO 1: Minimum-only payoff ───────────────────────
  const minResult = simulatePayoff(balance, apr, (bal) =>
    getMinPayment(bal),
  );

  // ── SCENARIO 2: Fixed payment payoff ──────────────────────
  let fixedResult: PayoffResult;
  if (hasFixedPayment) {
    const effectivePayment = totalFixedPayment;
    // Ensure payment is at least the first minimum
    const firstMin = getMinPayment(balance);
    if (effectivePayment < firstMin) {
      // Payment too low — use their amount anyway (they'll see warnings)
      fixedResult = simulatePayoff(balance, apr, () => effectivePayment);
    } else {
      fixedResult = simulatePayoff(balance, apr, () => effectivePayment);
    }
  } else {
    // No fixed payment: same as minimum
    fixedResult = minResult;
  }

  // ── SCENARIO 3: With extra payment (for chart) ────────────
  let extraResult: PayoffResult | null = null;
  if (hasFixedPayment && extraPay > 0) {
    extraResult = fixedResult; // already includes extra
    // For the chart, also calculate without extra
    const withoutExtra = simulatePayoff(balance, apr, () => fixedPayment);
    fixedResult = withoutExtra;
    // Swap: fixedResult = payment only, extraResult = payment + extra
  } else if (hasFixedPayment) {
    // No extra toggle — extra line same as fixed
    extraResult = null;
  }

  // Use the "main" result — the user's actual plan
  const mainResult = extraResult || fixedResult;

  // ── SCENARIO 4: Balance transfer ──────────────────────────
  let transferResult: PayoffResult | null = null;
  let transferSavings = 0;
  let transferFeeAmt = 0;
  if (includeTransfer && hasFixedPayment) {
    const paymentForTransfer = totalFixedPayment;
    transferResult = simulateBalanceTransfer(
      balance,
      apr,
      introMonths,
      transferFeePct,
      () => paymentForTransfer,
    );
    transferFeeAmt = balance * (transferFeePct / 100);
    transferSavings = mainResult.totalInterest - transferResult.totalInterest;
  }

  // ── Compute metrics ───────────────────────────────────────
  const monthlyRate = apr / 100 / 12;
  const dailyInterest = balance * (apr / 100 / 365);
  const firstMonthInterest = balance * monthlyRate;
  const effectiveFirstPayment = hasFixedPayment
    ? totalFixedPayment
    : getMinPayment(balance);
  const interestRatio =
    effectiveFirstPayment > 0
      ? (firstMonthInterest / effectiveFirstPayment) * 100
      : 0;
  const costPerDollar =
    balance > 0 ? mainResult.totalPaid / balance : 0;
  const savingsVsMin =
    minResult.totalInterest - mainResult.totalInterest;

  // ── Chart data — balance over time ────────────────────────
  const chartData: Array<Record<string, unknown>> = [];
  const maxChartMonths = Math.max(
    minResult.months,
    fixedResult.months,
    extraResult?.months || 0,
  );
  // Sample every N months to keep chart readable (max ~60 data points)
  const step = Math.max(1, Math.floor(maxChartMonths / 60));

  for (let m = 0; m <= maxChartMonths; m += step) {
    const minBal =
      m === 0
        ? balance
        : m <= minResult.months
          ? (minResult.schedule[m - 1]?.balance ?? 0)
          : 0;
    const fixBal =
      m === 0
        ? balance
        : m <= fixedResult.months
          ? (fixedResult.schedule[m - 1]?.balance ?? 0)
          : 0;
    const extBal =
      extraResult
        ? m === 0
          ? balance
          : m <= extraResult.months
            ? (extraResult.schedule[m - 1]?.balance ?? 0)
            : 0
        : fixBal;

    chartData.push({
      month: `${m}`,
      minimumOnly: Math.round(minBal),
      fixedPayment: Math.round(fixBal),
      withExtra: Math.round(extBal),
    });
  }

  // ── Table data — payment schedule for user's plan ─────────
  const tableData = mainResult.schedule.map((row) => ({
    month: `${row.month}`,
    payment: fmtCurrDec(row.payment, sym),
    interest: fmtCurrDec(row.interest, sym),
    principal: fmtCurrDec(row.principal, sym),
    balance: fmtCurrDec(row.balance, sym),
  }));

  // ── Format results ────────────────────────────────────────
  const payoffMonths = mainResult.months;
  const payoffTimeStr = formatDuration(payoffMonths, v);
  const minPayoffTimeStr = formatDuration(minResult.months, v);
  const debtFreeStr = getDebtFreeDate(payoffMonths);

  const dayLabel = v["/day"] || "/day";
  const minOnlyLabel = v["minimum only"] || "minimum only";
  const savedLabel = v["saved vs minimum"] || "saved vs minimum";
  const perDollarLabel = v["per $1 borrowed"] || "per $1 borrowed";
  const transferLabel = v["with balance transfer"] || "with balance transfer";
  const ofFirstLabel =
    v["of first payment is interest"] || "of first payment is interest";
  const transferFeeLabel = v["Transfer fee"] || "Transfer fee";

  // ── Build formatted object ────────────────────────────────
  const formatted: Record<string, string> = {
    payoffTime: payoffTimeStr,
    totalInterestPaid: fmtCurr(mainResult.totalInterest, sym),
    totalAmountPaid: fmtCurr(mainResult.totalPaid, sym),
    dailyInterestCost: `${fmtCurrDec(dailyInterest, sym)}${dayLabel}`,
    interestRatioFirstPayment: `${interestRatio.toFixed(0)}% ${ofFirstLabel}`,
    minimumOnlyPayoff: `${minPayoffTimeStr} · ${fmtCurr(minResult.totalInterest, sym)} ${minOnlyLabel}`,
    savingsVsMinimum:
      savingsVsMin > 0
        ? `${fmtCurr(savingsVsMin, sym)} ${savedLabel}`
        : "—",
    debtFreeDate: debtFreeStr,
    balanceTransferSavings:
      transferResult && transferSavings > 0
        ? `${fmtCurr(transferSavings, sym)} ${transferLabel} (${transferFeeLabel}: ${fmtCurr(transferFeeAmt, sym)})`
        : includeTransfer
          ? `${fmtCurr(0, sym)} — ${transferLabel}`
          : "—",
    effectiveCostPerDollar: `${fmtCurrDec(costPerDollar, sym)} ${perDollarLabel}`,
  };

  // ── Summary ───────────────────────────────────────────────
  const summaryTemplate =
    f["summary"] ||
    "Pay off {balance} at {apr}% APR in {payoffTime} with {payment}/mo payments. Total interest: {totalInterest}. Your card charges {dailyCost}/day. Debt-free by {debtFreeDate}.";
  const summary = summaryTemplate
    .replace("{balance}", fmtCurr(balance, sym))
    .replace("{apr}", apr.toFixed(2))
    .replace("{payoffTime}", payoffTimeStr)
    .replace(
      "{payment}",
      fmtCurr(hasFixedPayment ? totalFixedPayment : getMinPayment(balance), sym),
    )
    .replace("{totalInterest}", fmtCurr(mainResult.totalInterest, sym))
    .replace("{dailyCost}", fmtCurrDec(dailyInterest, sym))
    .replace("{debtFreeDate}", debtFreeStr);

  return {
    values: {
      payoffTime: payoffMonths,
      totalInterestPaid: mainResult.totalInterest,
      totalAmountPaid: mainResult.totalPaid,
      dailyInterestCost: dailyInterest,
      interestRatioFirstPayment: interestRatio,
      minimumOnlyPayoff: minResult.months,
      savingsVsMinimum: savingsVsMin,
      debtFreeDate: payoffMonths,
      balanceTransferSavings: transferSavings,
      effectiveCostPerDollar: costPerDollar,
    },
    formatted,
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}