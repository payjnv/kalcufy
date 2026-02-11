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

export const creditCardInterestCalculatorConfig: CalculatorConfigV4 = {
  id: "credit-card-interest",
  version: "4.0",
  category: "finance",
  icon: "💳",

  // ─── PRESETS ───
  presets: [
    {
      id: "averageBalance",
      icon: "💳",
      values: {
        cardBalance: 6500,
        annualRate: 22.99,
        monthlyPayment: 200,
        minimumPaymentPercent: "2",
        includeBalanceTransfer: false,
        transferRate: null,
        transferFee: 3,
      },
    },
    {
      id: "highInterest",
      icon: "🔥",
      values: {
        cardBalance: 10000,
        annualRate: 27.49,
        monthlyPayment: 250,
        minimumPaymentPercent: "2",
        includeBalanceTransfer: false,
        transferRate: null,
        transferFee: 3,
      },
    },
    {
      id: "minimumTrap",
      icon: "📉",
      values: {
        cardBalance: 5000,
        annualRate: 19.99,
        monthlyPayment: null,
        minimumPaymentPercent: "2",
        includeBalanceTransfer: false,
        transferRate: null,
        transferFee: 3,
      },
    },
    {
      id: "almostDone",
      icon: "✨",
      values: {
        cardBalance: 1500,
        annualRate: 15.99,
        monthlyPayment: 100,
        minimumPaymentPercent: "2",
        includeBalanceTransfer: false,
        transferRate: null,
        transferFee: 3,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates) ───
  t: {
    en: {
      name: "Credit Card Interest Calculator",
      slug: "credit-card-interest",
      subtitle:
        "See exactly how much interest you're paying, your true cost, and how faster payments or a balance transfer can save you thousands.",
      seo: {
        title: "Credit Card Interest Calculator - See Your True Cost",
        description:
          "Calculate your credit card interest cost daily, monthly, and yearly. See how extra payments save thousands and compare balance transfer savings. Free online tool.",
        shortDescription: "Calculate credit card interest and find your payoff date.",
        keywords: [
          "credit card interest calculator",
          "credit card payoff calculator",
          "credit card payment calculator",
          "how much interest on credit card",
          "credit card interest rate calculator",
          "credit card balance calculator",
          "pay off credit card",
          "credit card true cost",
        ],
      },

      inputs: {
        cardBalance: {
          label: "Credit Card Balance",
          helpText: "Your current outstanding balance — check your latest statement",
        },
        annualRate: {
          label: "Interest Rate (APR)",
          helpText: "Annual percentage rate — found on your statement under 'Interest Charge Calculation'",
        },
        monthlyPayment: {
          label: "Your Monthly Payment",
          helpText: "Amount you plan to pay each month — leave empty to see minimum payment scenario",
        },
        minimumPaymentPercent: {
          label: "Minimum Payment Calculation",
          helpText: "How your card calculates minimum payment — most cards use 2% of balance or $25 minimum",
          options: {
            "2": "2% of balance (most common)",
            "3": "3% of balance",
            "4": "4% of balance",
          },
        },
        includeBalanceTransfer: {
          label: "Compare Balance Transfer",
          helpText: "Toggle on to see how much you'd save transferring to a lower-rate card",
        },
        transferRate: {
          label: "Balance Transfer APR",
          helpText: "The APR on the new card after any intro period — enter 0 for 0% intro APR offers",
        },
        transferFee: {
          label: "Balance Transfer Fee",
          helpText: "One-time fee charged for the transfer — typically 3–5% of the balance",
        },
      },

      results: {
        payoffDate: { label: "PAYOFF DATE" },
        totalInterestPaid: { label: "Total Interest" },
        totalAmountPaid: { label: "Total Amount Paid" },
        trueCostMultiplier: { label: "True Cost Multiplier" },
        dailyInterestCost: { label: "Daily Interest" },
        monthlyInterestCost: { label: "Monthly Interest" },
        interestToPaymentRatio: { label: "Interest-to-Payment" },
        minimumPayoffTime: { label: "At Minimum Only" },
        interestSavedVsMin: { label: "Interest Saved vs Min" },
        balanceTransferSavings: { label: "Balance Transfer Savings" },
      },

      presets: {
        averageBalance: {
          label: "Average Balance",
          description: "$6,500 at 22.99%, $200/mo",
        },
        highInterest: {
          label: "High Interest",
          description: "$10,000 at 27.49%, $250/mo",
        },
        minimumTrap: {
          label: "Minimum Trap",
          description: "$5,000 at 19.99%, min only",
        },
        almostDone: {
          label: "Almost Done",
          description: "$1,500 at 15.99%, $100/mo",
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
          "Your {balance} balance at {rate}% APR costs {dailyInterest}/day in interest. With {payment}/mo payments, you'll be debt-free by {payoffDate}, paying {totalInterest} in total interest.",
      },

      infoCards: {
        interestBreakdown: {
          title: "Interest Breakdown",
          items: [
            { label: "Daily Interest Cost", valueKey: "dailyInterestCost" },
            { label: "Monthly Interest Cost", valueKey: "monthlyInterestCost" },
            { label: "Yearly Interest Cost", valueKey: "yearlyInterestCost" },
            { label: "True Cost Multiplier", valueKey: "trueCostMultiplier" },
          ],
        },
        paymentAnalysis: {
          title: "Payment Analysis",
          items: [
            { label: "Payoff Date", valueKey: "payoffDate" },
            { label: "Total Interest Paid", valueKey: "totalInterestPaid" },
            { label: "Interest-to-Payment Ratio", valueKey: "interestToPaymentRatio" },
            { label: "Interest Saved vs Minimum", valueKey: "interestSavedVsMin" },
            { label: "Time Saved vs Minimum", valueKey: "timeSavedVsMin" },
          ],
        },
        tips: {
          title: "Save on Interest",
          items: [
            "Pay your balance in full each month to avoid all interest charges — the grace period resets when you pay in full.",
            "Even $50 extra per month on a $5,000 balance at 22% APR saves over $2,000 in interest and pays off 3 years faster.",
            "Consider a 0% intro APR balance transfer card if you have good credit — you could save thousands during the intro period.",
            "Make payments early in your billing cycle. Since interest compounds daily, paying earlier reduces your average daily balance.",
          ],
        },
      },

      chart: {
        title: "Balance Over Time",
        xLabel: "Month",
        yLabel: "Amount",
        series: {
          balance: "Remaining Balance",
          cumulativeInterest: "Cumulative Interest",
        },
      },

      detailedTable: {
        paymentSchedule: {
          button: "View Payment Schedule",
          title: "Full Payment Schedule",
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
          title: "How Credit Card Interest Works",
          content:
            "Credit card interest is the cost you pay for carrying a balance from one billing cycle to the next. Unlike simple interest, credit card interest compounds daily — meaning you pay interest on interest every single day. Your card's APR (Annual Percentage Rate) is divided by 365 to get a daily periodic rate. Each day, that rate is applied to your current balance, and the resulting interest is added to what you owe. This daily compounding effect is why credit card debt grows so quickly and why even small balances can become expensive over time. The key insight is that if you pay your full statement balance by the due date every month, you pay zero interest — the grace period protects you. But the moment you carry any balance forward, interest starts accruing on everything immediately.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content:
            "Enter your current credit card balance, your card's APR, and the amount you plan to pay monthly. The calculator simulates your payoff journey using daily compounding interest, showing exactly how long it will take to reach zero and how much total interest you'll pay. It also calculates what would happen if you only made minimum payments — revealing the shocking true cost of the minimum payment trap. Unique metrics like the true cost multiplier show how much your original purchases actually cost after interest, while the daily interest cost makes the urgency real. If you toggle on the balance transfer comparison, it calculates whether transferring your balance to a lower-rate card would save you money after accounting for the transfer fee.",
        },
        considerations: {
          title: "Key Factors Affecting Credit Card Interest",
          items: [
            { text: "Daily Compounding: Interest is calculated daily and added to your balance. A $5,000 balance at 22% APR grows by $3.01 every single day.", type: "warning" },
            { text: "Grace Period: If you pay your full statement balance by the due date, you pay zero interest on purchases. Carrying any balance eliminates this protection.", type: "info" },
            { text: "Minimum Payment Trap: Paying 2% minimum on $10,000 at 22% APR takes 27+ years and costs over $16,000 in interest — more than the original debt.", type: "warning" },
            { text: "APR vs Daily Rate: Your APR divided by 365 gives your daily rate. At 22% APR, that's 0.0603% per day — small-sounding but devastating over time.", type: "info" },
            { text: "Multiple APRs: Many cards charge different rates for purchases, balance transfers, and cash advances. Cash advances (25–30%+) have no grace period.", type: "warning" },
            { text: "Variable Rates: Most credit cards have variable APRs tied to the prime rate. When the Fed raises rates, your credit card rate rises automatically.", type: "info" },
          ],
        },
        categories: {
          title: "Credit Card Interest Rate Ranges",
          items: [
            { text: "Excellent Credit (750+): 14–19% APR. The lowest standard rates available, but still expensive compared to other loan types.", type: "info" },
            { text: "Good Credit (700–749): 18–24% APR. The most common range for rewards cards. Even 'good' rates are high in absolute terms.", type: "info" },
            { text: "Fair Credit (650–699): 22–27% APR. Higher rates mean interest compounds faster — prioritize paying these balances aggressively.", type: "warning" },
            { text: "Poor Credit (below 650): 25–30%+ APR. At these rates, a $5,000 balance costs $4+ per day. Consider debt counseling if struggling.", type: "warning" },
            { text: "Store Cards: Typically 25–30% APR. Among the highest rates available — avoid carrying balances on store-branded cards.", type: "warning" },
            { text: "Balance Transfer Cards: 0% intro APR for 12–21 months. Powerful tool for paying down debt, but watch the fee (3–5%) and post-intro rate.", type: "info" },
          ],
        },
        examples: {
          title: "Credit Card Interest Examples",
          description: "Step-by-step examples showing how interest accumulates and the impact of different payment strategies",
          examples: [
            {
              title: "$5,000 Balance — Minimum vs Fixed Payment",
              steps: [
                "Balance: $5,000 at 22.99% APR",
                "Daily rate: 22.99% ÷ 365 = 0.0630% per day",
                "Day 1 interest: $5,000 × 0.000630 = $3.15",
                "First month interest: ~$95.79 (compounds daily)",
                "Minimum payment (2%): $100 → only $4.21 goes to principal!",
                "At minimum only: 32 years, $9,447 in interest",
                "At $200/month fixed: 32 months, $1,357 in interest",
                "Difference: save $8,090 and 29+ years!",
              ],
              result:
                "Paying $200/mo instead of minimum saves $8,090 in interest and 29 years of payments",
            },
            {
              title: "$10,000 Balance — Balance Transfer Comparison",
              steps: [
                "Current card: $10,000 at 24.99% APR, $300/mo",
                "Monthly interest (first month): ~$208",
                "Only $92 of $300 goes to principal",
                "Payoff at current rate: 50 months, $4,840 interest",
                "Balance transfer: 0% intro for 18 months, 3% fee",
                "Transfer fee: $10,000 × 3% = $300",
                "$300/mo for 18 months = $5,400 (pays off $5,100 net)",
                "Remaining $4,900 at new rate after intro period",
              ],
              result:
                "Balance transfer saves ~$3,200 in interest if you can pay off most during the 0% intro period",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How is credit card interest calculated?",
          answer:
            "Credit card interest is calculated using daily compounding. Your APR is divided by 365 to get a daily periodic rate. Each day, that rate is multiplied by your current balance to determine that day's interest charge. This interest is added to your balance, so the next day you're paying interest on a slightly higher amount. At 22% APR, a $5,000 balance accrues about $3.01 per day in interest.",
        },
        {
          question: "What is the true cost of minimum payments?",
          answer:
            "Minimum payments are designed to keep you in debt as long as possible. On a $5,000 balance at 22% APR, paying only the 2% minimum would take over 30 years and cost more than $9,000 in interest — nearly double the original balance. The minimum payment starts at $100 but shrinks as your balance decreases, meaning less and less goes to principal over time.",
        },
        {
          question: "How can I avoid paying credit card interest?",
          answer:
            "Pay your full statement balance by the due date every month. This activates your grace period, which means no interest is charged on new purchases. If you already have a balance, you won't have a grace period until you pay it off completely. Consider setting up autopay for the full balance to ensure you never miss a payment and always avoid interest.",
        },
        {
          question: "What is a good credit card interest rate?",
          answer:
            "Credit card rates are generally high compared to other loans. As of 2025–2026, rates range from about 14% for excellent credit to 30%+ for poor credit. A 'good' rate is below 18%, but even that is expensive for long-term borrowing. If you carry a balance regularly, a low-interest card (13–16% APR) or a 0% balance transfer card is worth considering.",
        },
        {
          question: "Is a balance transfer worth it?",
          answer:
            "A balance transfer to a 0% intro APR card is worth it if: the interest savings exceed the transfer fee (typically 3–5% of the balance), you can pay off a significant portion during the intro period, and you won't rack up new debt. For example, transferring $8,000 with a 3% fee ($240) from a 24% APR card saves about $160/month in interest during the 0% period.",
        },
        {
          question: "Why does my balance grow even though I'm making payments?",
          answer:
            "If your monthly payment is close to or less than the interest charged, very little goes toward reducing your actual balance. At 24% APR on a $10,000 balance, about $200/month goes to interest alone. If your payment is $210, only $10 reduces your balance — meaning it would take 83+ years to pay off. You need to pay significantly more than the interest portion to make real progress.",
        },
        {
          question: "What is the difference between APR and daily rate?",
          answer:
            "APR (Annual Percentage Rate) is the yearly interest rate on your card. The daily periodic rate is your APR divided by 365. For example, 22% APR becomes 0.0603% per day. While 0.06% sounds tiny, it compounds every day — meaning you pay interest on yesterday's interest. Over a year, this daily compounding makes the effective rate slightly higher than the stated APR.",
        },
        {
          question: "Does paying more than the minimum help that much?",
          answer:
            "Dramatically. On a $5,000 balance at 22% APR: minimum payments take 30+ years and cost $9,000+ in interest. Paying $150/month fixed takes 44 months and costs $1,538. Paying $300/month takes 19 months and costs $667. Every extra dollar above the minimum goes directly to principal, creating a snowball effect that accelerates your payoff.",
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
      "name": "Calculadora de Intereses de Tarjeta de Crédito",
      "slug": "calculadora-intereses-tarjeta-credito",
      "subtitle": "Ve exactamente cuánto interés estás pagando, tu costo real, y cómo pagos más rápidos o una transferencia de saldo pueden ahorrarte miles.",
      "seo": {
        "title": "Calculadora de Intereses de Tarjeta de Crédito - Ve Tu Costo Real",
        "description": "Calcula el costo de intereses de tu tarjeta de crédito diario, mensual y anual. Ve cómo los pagos extra ahorran miles y compara ahorros de transferencia de saldo. Herramienta gratuita online.",
        "shortDescription": "Calcula intereses de tarjeta de crédito y encuentra tu fecha de liquidación.",
        "keywords": [
          "calculadora intereses tarjeta de crédito",
          "calculadora liquidación tarjeta de crédito",
          "calculadora pagos tarjeta de crédito",
          "cuánto interés tarjeta de crédito",
          "calculadora tasa interés tarjeta de crédito",
          "calculadora saldo tarjeta de crédito",
          "liquidar tarjeta de crédito",
          "costo real tarjeta de crédito"
        ]
      },
      "inputs": {
        "cardBalance": {
          "label": "Saldo de Tarjeta de Crédito",
          "helpText": "Tu saldo pendiente actual — revisa tu último estado de cuenta"
        },
        "annualRate": {
          "label": "Tasa de Interés (TAE)",
          "helpText": "Tasa anual efectiva — se encuentra en tu estado de cuenta bajo 'Cálculo de Cargos por Intereses'"
        },
        "monthlyPayment": {
          "label": "Tu Pago Mensual",
          "helpText": "Cantidad que planeas pagar cada mes — deja vacío para ver el escenario de pago mínimo"
        },
        "minimumPaymentPercent": {
          "label": "Cálculo de Pago Mínimo",
          "helpText": "Cómo tu tarjeta calcula el pago mínimo — la mayoría de tarjetas usan 2% del saldo o $25 mínimo",
          "options": {
            "2": "2% del saldo (más común)",
            "3": "3% del saldo",
            "4": "4% del saldo"
          }
        },
        "includeBalanceTransfer": {
          "label": "Comparar Transferencia de Saldo",
          "helpText": "Activa para ver cuánto ahorrarías transfiriendo a una tarjeta con menor tasa"
        },
        "transferRate": {
          "label": "TAE de Transferencia de Saldo",
          "helpText": "La TAE en la nueva tarjeta después de cualquier período introductorio — ingresa 0 para ofertas de TAE introductoria 0%"
        },
        "transferFee": {
          "label": "Comisión de Transferencia de Saldo",
          "helpText": "Comisión única cobrada por la transferencia — típicamente 3–5% del saldo"
        }
      },
      "results": {
        "payoffDate": {
          "label": "FECHA DE LIQUIDACIÓN"
        },
        "totalInterestPaid": {
          "label": "Interés Total"
        },
        "totalAmountPaid": {
          "label": "Cantidad Total Pagada"
        },
        "trueCostMultiplier": {
          "label": "Multiplicador de Costo Real"
        },
        "dailyInterestCost": {
          "label": "Interés Diario"
        },
        "monthlyInterestCost": {
          "label": "Interés Mensual"
        },
        "interestToPaymentRatio": {
          "label": "Relación Interés-Pago"
        },
        "minimumPayoffTime": {
          "label": "Solo con Mínimo"
        },
        "interestSavedVsMin": {
          "label": "Interés Ahorrado vs Mín"
        },
        "balanceTransferSavings": {
          "label": "Ahorro Transferencia Saldo"
        }
      },
      "presets": {
        "averageBalance": {
          "label": "Saldo Promedio",
          "description": "$6,500 al 22.99%, $200/mes"
        },
        "highInterest": {
          "label": "Interés Alto",
          "description": "$10,000 al 27.49%, $250/mes"
        },
        "minimumTrap": {
          "label": "Trampa del Mínimo",
          "description": "$5,000 al 19.99%, solo mínimo"
        },
        "almostDone": {
          "label": "Casi Terminado",
          "description": "$1,500 al 15.99%, $100/mes"
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
        "summary": "Tu saldo de {balance} al {rate}% TAE cuesta {dailyInterest}/día en intereses. Con pagos de {payment}/mes, estarás libre de deuda para {payoffDate}, pagando {totalInterest} en intereses totales."
      },
      "infoCards": {
        "interestBreakdown": {
          "title": "Desglose de Intereses",
          "items": [
            {
              "label": "Costo Diario de Intereses",
              "valueKey": "dailyInterestCost"
            },
            {
              "label": "Costo Mensual de Intereses",
              "valueKey": "monthlyInterestCost"
            },
            {
              "label": "Costo Anual de Intereses",
              "valueKey": "yearlyInterestCost"
            },
            {
              "label": "Multiplicador de Costo Real",
              "valueKey": "trueCostMultiplier"
            }
          ]
        },
        "paymentAnalysis": {
          "title": "Análisis de Pagos",
          "items": [
            {
              "label": "Fecha de Liquidación",
              "valueKey": "payoffDate"
            },
            {
              "label": "Interés Total Pagado",
              "valueKey": "totalInterestPaid"
            },
            {
              "label": "Relación Interés-Pago",
              "valueKey": "interestToPaymentRatio"
            },
            {
              "label": "Interés Ahorrado vs Mínimo",
              "valueKey": "interestSavedVsMin"
            },
            {
              "label": "Tiempo Ahorrado vs Mínimo",
              "valueKey": "timeSavedVsMin"
            }
          ]
        },
        "tips": {
          "title": "Ahorra en Intereses",
          "items": [
            "Paga tu saldo completo cada mes para evitar todos los cargos por intereses — el período de gracia se reinicia cuando pagas en total.",
            "Incluso $50 extra por mes en un saldo de $5,000 al 22% TAE ahorra más de $2,000 en intereses y se liquida 3 años más rápido.",
            "Considera una tarjeta de transferencia de saldo con TAE introductoria 0% si tienes buen crédito — podrías ahorrar miles durante el período introductorio.",
            "Haz pagos temprano en tu ciclo de facturación. Como el interés se capitaliza diariamente, pagar antes reduce tu saldo diario promedio."
          ]
        }
      },
      "chart": {
        "title": "Saldo a lo Largo del Tiempo",
        "xLabel": "Mes",
        "yLabel": "Cantidad",
        "series": {
          "balance": "Saldo Restante",
          "cumulativeInterest": "Interés Acumulado"
        }
      },
      "detailedTable": {
        "paymentSchedule": {
          "button": "Ver Cronograma de Pagos",
          "title": "Cronograma Completo de Pagos",
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
          "title": "Cómo Funciona el Interés de Tarjeta de Crédito",
          "content": "El interés de tarjeta de crédito es el costo que pagas por mantener un saldo de un ciclo de facturación al siguiente. A diferencia del interés simple, el interés de tarjeta de crédito se capitaliza diariamente — significa que pagas interés sobre interés cada día. La TAE de tu tarjeta se divide entre 365 para obtener una tasa periódica diaria. Cada día, esa tasa se aplica a tu saldo actual, y el interés resultante se agrega a lo que debes. Este efecto de capitalización diaria es por lo que la deuda de tarjeta de crédito crece tan rápidamente y por qué incluso saldos pequeños pueden volverse costosos con el tiempo. La clave es que si pagas tu saldo total del estado de cuenta antes de la fecha de vencimiento cada mes, pagas cero interés — el período de gracia te protege. Pero en el momento que mantienes cualquier saldo, el interés comienza a acumularse en todo inmediatamente."
        },
        "howItWorks": {
          "title": "Cómo Funciona Esta Calculadora",
          "content": "Ingresa tu saldo actual de tarjeta de crédito, la TAE de tu tarjeta, y la cantidad que planeas pagar mensualmente. La calculadora simula tu trayectoria de liquidación usando interés de capitalización diaria, mostrando exactamente cuánto tiempo tomará llegar a cero y cuánto interés total pagarás. También calcula qué pasaría si solo hicieras pagos mínimos — revelando el costo real impactante de la trampa del pago mínimo. Métricas únicas como el multiplicador de costo real muestran cuánto realmente costaron tus compras originales después del interés, mientras que el costo diario de interés hace la urgencia real. Si activas la comparación de transferencia de saldo, calcula si transferir tu saldo a una tarjeta de menor tasa te ahorraría dinero después de considerar la comisión de transferencia."
        },
        "considerations": {
          "title": "Factores Clave que Afectan el Interés de Tarjeta de Crédito",
          "items": [
            {
              "text": "Capitalización Diaria: El interés se calcula diariamente y se agrega a tu saldo. Un saldo de $5,000 al 22% TAE crece $3.01 cada día.",
              "type": "warning"
            },
            {
              "text": "Período de Gracia: Si pagas tu saldo total del estado de cuenta antes de la fecha de vencimiento, pagas cero interés en compras. Mantener cualquier saldo elimina esta protección.",
              "type": "info"
            },
            {
              "text": "Trampa del Pago Mínimo: Pagar 2% mínimo en $10,000 al 22% TAE toma 27+ años y cuesta más de $16,000 en intereses — más que la deuda original.",
              "type": "warning"
            },
            {
              "text": "TAE vs Tasa Diaria: Tu TAE dividida entre 365 da tu tasa diaria. Al 22% TAE, eso es 0.0603% por día — suena pequeño pero devastador con el tiempo.",
              "type": "info"
            },
            {
              "text": "Múltiples TAE: Muchas tarjetas cobran tasas diferentes para compras, transferencias de saldo, y adelantos de efectivo. Los adelantos (25–30%+) no tienen período de gracia.",
              "type": "warning"
            },
            {
              "text": "Tasas Variables: La mayoría de tarjetas de crédito tienen TAE variables vinculadas a la tasa preferencial. Cuando la Fed sube tasas, tu tasa de tarjeta sube automáticamente.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Rangos de Tasas de Interés de Tarjetas de Crédito",
          "items": [
            {
              "text": "Crédito Excelente (750+): 14–19% TAE. Las tasas estándar más bajas disponibles, pero aún costosas comparadas con otros tipos de préstamos.",
              "type": "info"
            },
            {
              "text": "Buen Crédito (700–749): 18–24% TAE. El rango más común para tarjetas de recompensas. Incluso las tasas 'buenas' son altas en términos absolutos.",
              "type": "info"
            },
            {
              "text": "Crédito Regular (650–699): 22–27% TAE. Tasas más altas significan que el interés se capitaliza más rápido — prioriza pagar estos saldos agresivamente.",
              "type": "warning"
            },
            {
              "text": "Crédito Malo (menos de 650): 25–30%+ TAE. A estas tasas, un saldo de $5,000 cuesta $4+ por día. Considera consejería de deuda si tienes dificultades.",
              "type": "warning"
            },
            {
              "text": "Tarjetas de Tienda: Típicamente 25–30% TAE. Entre las tasas más altas disponibles — evita mantener saldos en tarjetas de marca de tienda.",
              "type": "warning"
            },
            {
              "text": "Tarjetas de Transferencia de Saldo: 0% TAE introductoria por 12–21 meses. Herramienta poderosa para pagar deuda, pero observa la comisión (3–5%) y la tasa post-introductoria.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Intereses de Tarjeta de Crédito",
          "description": "Ejemplos paso a paso mostrando cómo se acumula el interés y el impacto de diferentes estrategias de pago",
          "examples": [
            {
              "title": "Saldo $5,000 — Mínimo vs Pago Fijo",
              "steps": [
                "Saldo: $5,000 al 22.99% TAE",
                "Tasa diaria: 22.99% ÷ 365 = 0.0630% por día",
                "Interés día 1: $5,000 × 0.000630 = $3.15",
                "Interés primer mes: ~$95.79 (se capitaliza diariamente)",
                "Pago mínimo (2%): $100 → ¡solo $4.21 va al principal!",
                "Solo con mínimo: 32 años, $9,447 en intereses",
                "Con $200/mes fijo: 32 meses, $1,357 en intereses",
                "Diferencia: ¡ahorra $8,090 y 29+ años!"
              ],
              "result": "Pagar $200/mes en lugar del mínimo ahorra $8,090 en intereses y 29 años de pagos"
            },
            {
              "title": "Saldo $10,000 — Comparación Transferencia de Saldo",
              "steps": [
                "Tarjeta actual: $10,000 al 24.99% TAE, $300/mes",
                "Interés mensual (primer mes): ~$208",
                "Solo $92 de $300 va al principal",
                "Liquidación a tasa actual: 50 meses, $4,840 interés",
                "Transferencia de saldo: 0% introductorio por 18 meses, comisión 3%",
                "Comisión de transferencia: $10,000 × 3% = $300",
                "$300/mes por 18 meses = $5,400 (liquida $5,100 neto)",
                "Restante $4,900 a nueva tasa después período introductorio"
              ],
              "result": "La transferencia de saldo ahorra ~$3,200 en intereses si puedes liquidar la mayor parte durante el período introductorio 0%"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cómo se calcula el interés de tarjeta de crédito?",
          "answer": "El interés de tarjeta de crédito se calcula usando capitalización diaria. Tu TAE se divide entre 365 para obtener una tasa periódica diaria. Cada día, esa tasa se multiplica por tu saldo actual para determinar el cargo por interés de ese día. Este interés se agrega a tu saldo, así que al día siguiente estás pagando interés sobre una cantidad ligeramente mayor. Al 22% TAE, un saldo de $5,000 acumula aproximadamente $3.01 por día en intereses."
        },
        {
          "question": "¿Cuál es el costo real de los pagos mínimos?",
          "answer": "Los pagos mínimos están diseñados para mantenerte en deuda el mayor tiempo posible. En un saldo de $5,000 al 22% TAE, pagar solo el mínimo del 2% tomaría más de 30 años y costaría más de $9,000 en intereses — casi el doble del saldo original. El pago mínimo comienza en $100 pero se reduce conforme tu saldo disminuye, significando que cada vez menos va al principal con el tiempo."
        },
        {
          "question": "¿Cómo puedo evitar pagar interés de tarjeta de crédito?",
          "answer": "Paga tu saldo total del estado de cuenta antes de la fecha de vencimiento cada mes. Esto activa tu período de gracia, lo que significa que no se cobra interés en compras nuevas. Si ya tienes un saldo, no tendrás período de gracia hasta que lo liquides completamente. Considera configurar autopago por el saldo total para asegurar que nunca pierdas un pago y siempre evites intereses."
        },
        {
          "question": "¿Qué es una buena tasa de interés de tarjeta de crédito?",
          "answer": "Las tasas de tarjeta de crédito son generalmente altas comparadas con otros préstamos. A partir de 2025–2026, las tasas van desde aproximadamente 14% para crédito excelente hasta 30%+ para crédito malo. Una tasa 'buena' está por debajo del 18%, pero incluso eso es costoso para préstamos a largo plazo. Si mantienes un saldo regularmente, vale la pena considerar una tarjeta de bajo interés (13–16% TAE) o una tarjeta de transferencia de saldo al 0%."
        },
        {
          "question": "¿Vale la pena una transferencia de saldo?",
          "answer": "Una transferencia de saldo a una tarjeta con TAE introductoria 0% vale la pena si: los ahorros en interés superan la comisión de transferencia (típicamente 3–5% del saldo), puedes liquidar una porción significativa durante el período introductorio, y no acumularás nueva deuda. Por ejemplo, transferir $8,000 con una comisión del 3% ($240) desde una tarjeta al 24% TAE ahorra aproximadamente $160/mes en intereses durante el período 0%."
        },
        {
          "question": "¿Por qué mi saldo crece aunque estoy haciendo pagos?",
          "answer": "Si tu pago mensual está cerca o es menor que el interés cobrado, muy poco va hacia reducir tu saldo real. Al 24% TAE en un saldo de $10,000, aproximadamente $200/mes van solo a intereses. Si tu pago es $210, solo $10 reducen tu saldo — significando que tomaría 83+ años liquidarlo. Necesitas pagar significativamente más que la porción de interés para hacer progreso real."
        },
        {
          "question": "¿Cuál es la diferencia entre TAE y tasa diaria?",
          "answer": "TAE (Tasa Anual Efectiva) es la tasa de interés anual en tu tarjeta. La tasa periódica diaria es tu TAE dividida entre 365. Por ejemplo, 22% TAE se convierte en 0.0603% por día. Aunque 0.06% suena diminuto, se capitaliza cada día — significando que pagas interés sobre el interés de ayer. Durante un año, esta capitalización diaria hace que la tasa efectiva sea ligeramente mayor que la TAE declarada."
        },
        {
          "question": "¿Ayuda tanto pagar más del mínimo?",
          "answer": "Dramáticamente. En un saldo de $5,000 al 22% TAE: los pagos mínimos toman 30+ años y cuestan $9,000+ en intereses. Pagar $150/mes fijo toma 44 meses y cuesta $1,538. Pagar $300/mes toma 19 meses y cuesta $667. Cada dólar extra sobre el mínimo va directamente al principal, creando un efecto bola de nieve que acelera tu liquidación."
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
      "name": "Calculadora de Juros do Cartão de Crédito",
      "slug": "calculadora-juros-cartao-credito",
      "subtitle": "Veja exatamente quanto de juros você está pagando, seu custo real, e como pagamentos mais rápidos ou uma transferência de saldo podem economizar milhares.",
      "seo": {
        "title": "Calculadora de Juros do Cartão de Crédito - Veja Seu Custo Real",
        "description": "Calcule o custo dos juros do seu cartão de crédito diário, mensal e anual. Veja como pagamentos extras economizam milhares e compare economias com transferência de saldo. Ferramenta online gratuita.",
        "shortDescription": "Calcule juros do cartão de crédito e encontre sua data de quitação.",
        "keywords": [
          "calculadora juros cartão crédito",
          "calculadora quitação cartão crédito",
          "calculadora pagamento cartão crédito",
          "quanto juros cartão crédito",
          "calculadora taxa juros cartão",
          "calculadora saldo cartão crédito",
          "quitar cartão crédito",
          "custo real cartão crédito"
        ]
      },
      "inputs": {
        "cardBalance": {
          "label": "Saldo do Cartão de Crédito",
          "helpText": "Seu saldo devedor atual — verifique sua última fatura"
        },
        "annualRate": {
          "label": "Taxa de Juros (% ao ano)",
          "helpText": "Taxa de juros anual — encontrada na sua fatura na seção 'Cálculo de Encargos de Juros'"
        },
        "monthlyPayment": {
          "label": "Seu Pagamento Mensal",
          "helpText": "Valor que você planeja pagar mensalmente — deixe vazio para ver o cenário de pagamento mínimo"
        },
        "minimumPaymentPercent": {
          "label": "Cálculo do Pagamento Mínimo",
          "helpText": "Como seu cartão calcula o pagamento mínimo — a maioria dos cartões usa 2% do saldo ou R$ 50 mínimo",
          "options": {
            "2": "2% do saldo (mais comum)",
            "3": "3% do saldo",
            "4": "4% do saldo"
          }
        },
        "includeBalanceTransfer": {
          "label": "Comparar Transferência de Saldo",
          "helpText": "Ative para ver quanto você economizaria transferindo para um cartão com taxa menor"
        },
        "transferRate": {
          "label": "Taxa da Transferência de Saldo",
          "helpText": "A taxa anual do novo cartão após qualquer período promocional — digite 0 para ofertas promocionais de 0%"
        },
        "transferFee": {
          "label": "Taxa de Transferência de Saldo",
          "helpText": "Taxa única cobrada pela transferência — tipicamente 3–5% do saldo"
        }
      },
      "results": {
        "payoffDate": {
          "label": "DATA DE QUITAÇÃO"
        },
        "totalInterestPaid": {
          "label": "Total de Juros"
        },
        "totalAmountPaid": {
          "label": "Valor Total Pago"
        },
        "trueCostMultiplier": {
          "label": "Multiplicador de Custo Real"
        },
        "dailyInterestCost": {
          "label": "Juros Diários"
        },
        "monthlyInterestCost": {
          "label": "Juros Mensais"
        },
        "interestToPaymentRatio": {
          "label": "Proporção Juros-Pagamento"
        },
        "minimumPayoffTime": {
          "label": "Apenas com Mínimo"
        },
        "interestSavedVsMin": {
          "label": "Juros Economizados vs Mín"
        },
        "balanceTransferSavings": {
          "label": "Economia com Transferência"
        }
      },
      "presets": {
        "averageBalance": {
          "label": "Saldo Médio",
          "description": "R$ 6.500 a 22,99%, R$ 200/mês"
        },
        "highInterest": {
          "label": "Juros Altos",
          "description": "R$ 10.000 a 27,49%, R$ 250/mês"
        },
        "minimumTrap": {
          "label": "Armadilha do Mínimo",
          "description": "R$ 5.000 a 19,99%, apenas mínimo"
        },
        "almostDone": {
          "label": "Quase Terminando",
          "description": "R$ 1.500 a 15,99%, R$ 100/mês"
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
        "summary": "Seu saldo de {balance} com taxa de {rate}% ao ano custa {dailyInterest}/dia em juros. Com pagamentos de {payment}/mês, você estará livre de dívidas em {payoffDate}, pagando {totalInterest} em juros totais."
      },
      "infoCards": {
        "interestBreakdown": {
          "title": "Detalhamento dos Juros",
          "items": [
            {
              "label": "Custo Diário de Juros",
              "valueKey": "dailyInterestCost"
            },
            {
              "label": "Custo Mensal de Juros",
              "valueKey": "monthlyInterestCost"
            },
            {
              "label": "Custo Anual de Juros",
              "valueKey": "yearlyInterestCost"
            },
            {
              "label": "Multiplicador de Custo Real",
              "valueKey": "trueCostMultiplier"
            }
          ]
        },
        "paymentAnalysis": {
          "title": "Análise de Pagamento",
          "items": [
            {
              "label": "Data de Quitação",
              "valueKey": "payoffDate"
            },
            {
              "label": "Total de Juros Pagos",
              "valueKey": "totalInterestPaid"
            },
            {
              "label": "Proporção Juros-Pagamento",
              "valueKey": "interestToPaymentRatio"
            },
            {
              "label": "Juros Economizados vs Mínimo",
              "valueKey": "interestSavedVsMin"
            },
            {
              "label": "Tempo Economizado vs Mínimo",
              "valueKey": "timeSavedVsMin"
            }
          ]
        },
        "tips": {
          "title": "Economize em Juros",
          "items": [
            "Pague seu saldo integral mensalmente para evitar todos os encargos de juros — o período de carência reinicia quando você paga integralmente.",
            "Mesmo R$ 100 extras por mês em um saldo de R$ 5.000 a 22% economiza mais de R$ 4.000 em juros e quita 3 anos mais rápido.",
            "Considere um cartão com taxa promocional de 0% se você tem bom score — você pode economizar milhares durante o período promocional.",
            "Faça pagamentos no início do ciclo de cobrança. Como os juros são compostos diariamente, pagar mais cedo reduz seu saldo médio diário."
          ]
        }
      },
      "chart": {
        "title": "Saldo ao Longo do Tempo",
        "xLabel": "Mês",
        "yLabel": "Valor",
        "series": {
          "balance": "Saldo Restante",
          "cumulativeInterest": "Juros Acumulados"
        }
      },
      "detailedTable": {
        "paymentSchedule": {
          "button": "Ver Cronograma de Pagamentos",
          "title": "Cronograma Completo de Pagamentos",
          "columns": {
            "month": "Mês",
            "payment": "Pagamento",
            "principal": "Principal",
            "interest": "Juros",
            "balance": "Saldo"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Funcionam os Juros do Cartão de Crédito",
          "content": "Os juros do cartão de crédito são o custo que você paga por manter um saldo de um ciclo de cobrança para o próximo. Diferente dos juros simples, os juros do cartão são compostos diariamente — significando que você paga juros sobre juros todos os dias. A taxa anual do seu cartão é dividida por 365 para obter uma taxa periódica diária. A cada dia, essa taxa é aplicada ao seu saldo atual, e os juros resultantes são adicionados ao que você deve. Este efeito de composição diária é por que a dívida do cartão de crédito cresce tão rapidamente e por que mesmo saldos pequenos podem se tornar caros ao longo do tempo. O ponto-chave é que se você pagar o saldo integral da fatura até a data de vencimento todo mês, você paga zero juros — o período de carência protege você. Mas no momento em que você carrega qualquer saldo, os juros começam a incidir sobre tudo imediatamente."
        },
        "howItWorks": {
          "title": "Como Esta Calculadora Funciona",
          "content": "Insira seu saldo atual do cartão de crédito, a taxa anual do seu cartão e o valor que você planeja pagar mensalmente. A calculadora simula sua jornada de quitação usando juros compostos diários, mostrando exatamente quanto tempo levará para chegar a zero e quanto de juros totais você pagará. Também calcula o que aconteceria se você fizesse apenas os pagamentos mínimos — revelando o custo real chocante da armadilha do pagamento mínimo. Métricas únicas como o multiplicador de custo real mostram quanto suas compras originais realmente custam depois dos juros, enquanto o custo diário de juros torna a urgência real. Se você ativar a comparação de transferência de saldo, calcula se transferir seu saldo para um cartão com taxa menor economizaria dinheiro após considerar a taxa de transferência."
        },
        "considerations": {
          "title": "Fatores-Chave que Afetam os Juros do Cartão de Crédito",
          "items": [
            {
              "text": "Composição Diária: Os juros são calculados diariamente e adicionados ao seu saldo. Um saldo de R$ 5.000 a 22% cresce R$ 3,01 todos os dias.",
              "type": "warning"
            },
            {
              "text": "Período de Carência: Se você pagar o saldo integral da fatura até a data de vencimento, paga zero juros nas compras. Carregar qualquer saldo elimina esta proteção.",
              "type": "info"
            },
            {
              "text": "Armadilha do Pagamento Mínimo: Pagar 2% de mínimo em R$ 10.000 a 22% leva 27+ anos e custa mais de R$ 16.000 em juros — mais que a dívida original.",
              "type": "warning"
            },
            {
              "text": "Taxa Anual vs Taxa Diária: Sua taxa anual dividida por 365 dá sua taxa diária. A 22% ao ano, são 0,0603% por dia — parece pequeno mas é devastador ao longo do tempo.",
              "type": "info"
            },
            {
              "text": "Múltiplas Taxas: Muitos cartões cobram taxas diferentes para compras, transferências de saldo e saques. Saques (25–30%+) não têm período de carência.",
              "type": "warning"
            },
            {
              "text": "Taxas Variáveis: A maioria dos cartões tem taxas variáveis vinculadas à taxa básica. Quando o Banco Central aumenta as taxas, sua taxa do cartão sobe automaticamente.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Faixas de Taxa de Juros do Cartão de Crédito",
          "items": [
            {
              "text": "Score Excelente (750+): 14–19% ao ano. As menores taxas padrão disponíveis, mas ainda caras comparadas a outros tipos de empréstimo.",
              "type": "info"
            },
            {
              "text": "Bom Score (700–749): 18–24% ao ano. A faixa mais comum para cartões com recompensas. Mesmo taxas 'boas' são altas em termos absolutos.",
              "type": "info"
            },
            {
              "text": "Score Regular (650–699): 22–27% ao ano. Taxas mais altas significam juros compostos mais rápidos — priorize pagar estes saldos agressivamente.",
              "type": "warning"
            },
            {
              "text": "Score Baixo (abaixo de 650): 25–30%+ ao ano. Nestas taxas, um saldo de R$ 5.000 custa R$ 4+ por dia. Considere aconselhamento financeiro se estiver com dificuldades.",
              "type": "warning"
            },
            {
              "text": "Cartões de Loja: Tipicamente 25–30% ao ano. Entre as maiores taxas disponíveis — evite carregar saldos em cartões de loja.",
              "type": "warning"
            },
            {
              "text": "Cartões de Transferência de Saldo: 0% promocional por 12–21 meses. Ferramenta poderosa para quitar dívidas, mas observe a taxa (3–5%) e a taxa pós-promocional.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Juros do Cartão de Crédito",
          "description": "Exemplos passo a passo mostrando como os juros se acumulam e o impacto de diferentes estratégias de pagamento",
          "examples": [
            {
              "title": "Saldo R$ 5.000 — Mínimo vs Pagamento Fixo",
              "steps": [
                "Saldo: R$ 5.000 a 22,99% ao ano",
                "Taxa diária: 22,99% ÷ 365 = 0,0630% por dia",
                "Juros do 1º dia: R$ 5.000 × 0,000630 = R$ 3,15",
                "Juros do primeiro mês: ~R$ 95,79 (composto diariamente)",
                "Pagamento mínimo (2%): R$ 100 → apenas R$ 4,21 vai para o principal!",
                "Apenas no mínimo: 32 anos, R$ 9.447 em juros",
                "Com R$ 200/mês fixo: 32 meses, R$ 1.357 em juros",
                "Diferença: economiza R$ 8.090 e 29+ anos!"
              ],
              "result": "Pagando R$ 200/mês em vez do mínimo economiza R$ 8.090 em juros e 29 anos de pagamentos"
            },
            {
              "title": "Saldo R$ 10.000 — Comparação de Transferência de Saldo",
              "steps": [
                "Cartão atual: R$ 10.000 a 24,99% ao ano, R$ 300/mês",
                "Juros mensais (primeiro mês): ~R$ 208",
                "Apenas R$ 92 dos R$ 300 vão para o principal",
                "Quitação na taxa atual: 50 meses, R$ 4.840 juros",
                "Transferência de saldo: 0% promocional por 18 meses, taxa 3%",
                "Taxa de transferência: R$ 10.000 × 3% = R$ 300",
                "R$ 300/mês por 18 meses = R$ 5.400 (quita R$ 5.100 líquidos)",
                "Restam R$ 4.900 na nova taxa após período promocional"
              ],
              "result": "Transferência de saldo economiza ~R$ 3.200 em juros se você conseguir quitar a maior parte durante o período promocional de 0%"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Como são calculados os juros do cartão de crédito?",
          "answer": "Os juros do cartão de crédito são calculados usando composição diária. Sua taxa anual é dividida por 365 para obter uma taxa periódica diária. A cada dia, essa taxa é multiplicada pelo seu saldo atual para determinar os juros daquele dia. Estes juros são adicionados ao seu saldo, então no dia seguinte você está pagando juros sobre um valor ligeiramente maior. A 22% ao ano, um saldo de R$ 5.000 acumula cerca de R$ 3,01 por dia em juros."
        },
        {
          "question": "Qual é o custo real dos pagamentos mínimos?",
          "answer": "Os pagamentos mínimos são projetados para mantê-lo endividado pelo maior tempo possível. Em um saldo de R$ 5.000 a 22% ao ano, pagando apenas o mínimo de 2% levaria mais de 30 anos e custaria mais de R$ 9.000 em juros — quase o dobro do saldo original. O pagamento mínimo começa em R$ 100 mas diminui conforme seu saldo decresce, significando que menos e menos vai para o principal ao longo do tempo."
        },
        {
          "question": "Como posso evitar pagar juros do cartão de crédito?",
          "answer": "Pague o saldo integral da sua fatura até a data de vencimento todo mês. Isso ativa seu período de carência, o que significa que nenhum juro é cobrado sobre novas compras. Se você já tem um saldo, não terá período de carência até quitá-lo completamente. Considere configurar débito automático para o saldo total para garantir que nunca perca um pagamento e sempre evite juros."
        },
        {
          "question": "O que é uma boa taxa de juros para cartão de crédito?",
          "answer": "As taxas de cartão de crédito são geralmente altas comparadas a outros empréstimos. Em 2025–2026, as taxas variam de cerca de 14% para score excelente até 30%+ para score baixo. Uma taxa 'boa' fica abaixo de 18%, mas mesmo isso é caro para empréstimos de longo prazo. Se você carrega saldo regularmente, um cartão de baixos juros (13–16% ao ano) ou um cartão de transferência de saldo com 0% vale a pena considerar."
        },
        {
          "question": "Vale a pena fazer uma transferência de saldo?",
          "answer": "Uma transferência de saldo para um cartão com taxa promocional de 0% vale a pena se: a economia de juros exceder a taxa de transferência (tipicamente 3–5% do saldo), você conseguir quitar uma parte significativa durante o período promocional, e não acumular nova dívida. Por exemplo, transferir R$ 8.000 com taxa de 3% (R$ 240) de um cartão a 24% economiza cerca de R$ 160/mês em juros durante o período de 0%."
        },
        {
          "question": "Por que meu saldo cresce mesmo fazendo pagamentos?",
          "answer": "Se seu pagamento mensal está próximo ou menor que os juros cobrados, muito pouco vai para reduzir seu saldo real. A 24% ao ano em um saldo de R$ 10.000, cerca de R$ 200/mês vão apenas para juros. Se seu pagamento é R$ 210, apenas R$ 10 reduzem seu saldo — significando que levaria 83+ anos para quitar. Você precisa pagar significativamente mais que a parcela de juros para fazer progresso real."
        },
        {
          "question": "Qual a diferença entre taxa anual e taxa diária?",
          "answer": "A taxa anual é a taxa de juros anual do seu cartão. A taxa periódica diária é sua taxa anual dividida por 365. Por exemplo, 22% ao ano se torna 0,0603% por dia. Embora 0,06% pareça minúsculo, ela é composta todos os dias — significando que você paga juros sobre os juros de ontem. Ao longo de um ano, esta composição diária torna a taxa efetiva ligeiramente maior que a taxa anual declarada."
        },
        {
          "question": "Pagar mais que o mínimo ajuda tanto assim?",
          "answer": "Dramaticamente. Em um saldo de R$ 5.000 a 22% ao ano: pagamentos mínimos levam 30+ anos e custam R$ 9.000+ em juros. Pagando R$ 150/mês fixo leva 44 meses e custa R$ 1.538. Pagando R$ 300/mês leva 19 meses e custa R$ 667. Cada real extra acima do mínimo vai diretamente para o principal, criando um efeito bola de neve que acelera sua quitação."
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
      "name": "Calculateur d'Intérêts de Carte de Crédit",
      "slug": "calculateur-interets-carte-credit",
      "subtitle": "Voyez exactement combien d'intérêts vous payez, votre coût réel, et comment des paiements plus rapides ou un transfert de solde peuvent vous faire économiser des milliers.",
      "seo": {
        "title": "Calculateur d'Intérêts de Carte de Crédit - Voyez Votre Coût Réel",
        "description": "Calculez le coût des intérêts de votre carte de crédit quotidiennement, mensuellement et annuellement. Voyez comment des paiements supplémentaires économisent des milliers et comparez les économies de transfert de solde. Outil gratuit en ligne.",
        "shortDescription": "Calculez les intérêts de carte de crédit et trouvez votre date de remboursement.",
        "keywords": [
          "calculateur intérêts carte de crédit",
          "calculateur remboursement carte de crédit",
          "calculateur paiement carte de crédit",
          "combien d'intérêts carte de crédit",
          "calculateur taux intérêt carte de crédit",
          "calculateur solde carte de crédit",
          "rembourser carte de crédit",
          "coût réel carte de crédit"
        ]
      },
      "inputs": {
        "cardBalance": {
          "label": "Solde de la Carte de Crédit",
          "helpText": "Votre solde impayé actuel — vérifiez votre dernier relevé"
        },
        "annualRate": {
          "label": "Taux d'Intérêt (TAP)",
          "helpText": "Taux annuel effectif global — trouvé sur votre relevé sous 'Calcul des Frais d'Intérêt'"
        },
        "monthlyPayment": {
          "label": "Votre Paiement Mensuel",
          "helpText": "Montant que vous prévoyez payer chaque mois — laissez vide pour voir le scénario de paiement minimum"
        },
        "minimumPaymentPercent": {
          "label": "Calcul du Paiement Minimum",
          "helpText": "Comment votre carte calcule le paiement minimum — la plupart des cartes utilisent 2% du solde ou 25$ minimum",
          "options": {
            "2": "2% du solde (le plus courant)",
            "3": "3% du solde",
            "4": "4% du solde"
          }
        },
        "includeBalanceTransfer": {
          "label": "Comparer le Transfert de Solde",
          "helpText": "Activez pour voir combien vous économiseriez en transférant vers une carte à taux plus bas"
        },
        "transferRate": {
          "label": "TAP du Transfert de Solde",
          "helpText": "Le TAP sur la nouvelle carte après toute période promotionnelle — entrez 0 pour les offres TAP promotionnel à 0%"
        },
        "transferFee": {
          "label": "Frais de Transfert de Solde",
          "helpText": "Frais unique facturé pour le transfert — généralement 3–5% du solde"
        }
      },
      "results": {
        "payoffDate": {
          "label": "DATE DE REMBOURSEMENT"
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
        "dailyInterestCost": {
          "label": "Intérêts Quotidiens"
        },
        "monthlyInterestCost": {
          "label": "Intérêts Mensuels"
        },
        "interestToPaymentRatio": {
          "label": "Ratio Intérêts-Paiement"
        },
        "minimumPayoffTime": {
          "label": "Au Minimum Seulement"
        },
        "interestSavedVsMin": {
          "label": "Intérêts Économisés vs Min"
        },
        "balanceTransferSavings": {
          "label": "Économies Transfert de Solde"
        }
      },
      "presets": {
        "averageBalance": {
          "label": "Solde Moyen",
          "description": "6 500$ à 22,99%, 200$/mois"
        },
        "highInterest": {
          "label": "Intérêts Élevés",
          "description": "10 000$ à 27,49%, 250$/mois"
        },
        "minimumTrap": {
          "label": "Piège du Minimum",
          "description": "5 000$ à 19,99%, minimum seulement"
        },
        "almostDone": {
          "label": "Presque Terminé",
          "description": "1 500$ à 15,99%, 100$/mois"
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
        "summary": "Votre solde de {balance} à {rate}% TAP coûte {dailyInterest}/jour en intérêts. Avec des paiements de {payment}/mois, vous serez libre de dettes d'ici {payoffDate}, payant {totalInterest} en intérêts totaux."
      },
      "infoCards": {
        "interestBreakdown": {
          "title": "Répartition des Intérêts",
          "items": [
            {
              "label": "Coût Quotidien des Intérêts",
              "valueKey": "dailyInterestCost"
            },
            {
              "label": "Coût Mensuel des Intérêts",
              "valueKey": "monthlyInterestCost"
            },
            {
              "label": "Coût Annuel des Intérêts",
              "valueKey": "yearlyInterestCost"
            },
            {
              "label": "Multiplicateur de Coût Réel",
              "valueKey": "trueCostMultiplier"
            }
          ]
        },
        "paymentAnalysis": {
          "title": "Analyse des Paiements",
          "items": [
            {
              "label": "Date de Remboursement",
              "valueKey": "payoffDate"
            },
            {
              "label": "Intérêts Totaux Payés",
              "valueKey": "totalInterestPaid"
            },
            {
              "label": "Ratio Intérêts-Paiement",
              "valueKey": "interestToPaymentRatio"
            },
            {
              "label": "Intérêts Économisés vs Minimum",
              "valueKey": "interestSavedVsMin"
            },
            {
              "label": "Temps Économisé vs Minimum",
              "valueKey": "timeSavedVsMin"
            }
          ]
        },
        "tips": {
          "title": "Économisez sur les Intérêts",
          "items": [
            "Payez votre solde en entier chaque mois pour éviter tous les frais d'intérêts — la période de grâce se remet à zéro quand vous payez en entier.",
            "Même 50$ supplémentaires par mois sur un solde de 5 000$ à 22% TAP économise plus de 2 000$ en intérêts et rembourse 3 ans plus tôt.",
            "Considérez une carte de transfert de solde TAP promotionnel 0% si vous avez un bon crédit — vous pourriez économiser des milliers pendant la période promotionnelle.",
            "Effectuez les paiements tôt dans votre cycle de facturation. Comme les intérêts composent quotidiennement, payer plus tôt réduit votre solde quotidien moyen."
          ]
        }
      },
      "chart": {
        "title": "Solde au Fil du Temps",
        "xLabel": "Mois",
        "yLabel": "Montant",
        "series": {
          "balance": "Solde Restant",
          "cumulativeInterest": "Intérêts Cumulés"
        }
      },
      "detailedTable": {
        "paymentSchedule": {
          "button": "Voir l'Échéancier de Paiement",
          "title": "Échéancier de Paiement Complet",
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
          "title": "Comment Fonctionnent les Intérêts de Carte de Crédit",
          "content": "Les intérêts de carte de crédit sont le coût que vous payez pour reporter un solde d'un cycle de facturation au suivant. Contrairement aux intérêts simples, les intérêts de carte de crédit composent quotidiennement — ce qui signifie que vous payez des intérêts sur les intérêts chaque jour. Le TAP de votre carte (Taux Annuel Effectif Global) est divisé par 365 pour obtenir un taux périodique quotidien. Chaque jour, ce taux est appliqué à votre solde actuel, et les intérêts résultants sont ajoutés à ce que vous devez. Cet effet de composition quotidienne explique pourquoi la dette de carte de crédit croît si rapidement et pourquoi même de petits soldes peuvent devenir coûteux au fil du temps. L'insight clé est que si vous payez votre solde de relevé complet avant la date d'échéance chaque mois, vous payez zéro intérêt — la période de grâce vous protège. Mais dès que vous reportez un solde, les intérêts commencent à s'accumuler sur tout immédiatement."
        },
        "howItWorks": {
          "title": "Comment Fonctionne ce Calculateur",
          "content": "Entrez votre solde de carte de crédit actuel, le TAP de votre carte, et le montant que vous prévoyez payer mensuellement. Le calculateur simule votre parcours de remboursement en utilisant les intérêts composés quotidiens, montrant exactement combien de temps il faudra pour atteindre zéro et combien d'intérêts totaux vous paierez. Il calcule aussi ce qui arriverait si vous ne faisiez que les paiements minimums — révélant le coût réel choquant du piège du paiement minimum. Des métriques uniques comme le multiplicateur de coût réel montrent combien vos achats originaux coûtent réellement après intérêts, tandis que le coût quotidien des intérêts rend l'urgence réelle. Si vous activez la comparaison de transfert de solde, il calcule si transférer votre solde vers une carte à taux plus bas vous ferait économiser de l'argent après avoir comptabilisé les frais de transfert."
        },
        "considerations": {
          "title": "Facteurs Clés Affectant les Intérêts de Carte de Crédit",
          "items": [
            {
              "text": "Composition Quotidienne: Les intérêts sont calculés quotidiennement et ajoutés à votre solde. Un solde de 5 000$ à 22% TAP augmente de 3,01$ chaque jour.",
              "type": "warning"
            },
            {
              "text": "Période de Grâce: Si vous payez votre solde de relevé complet avant la date d'échéance, vous payez zéro intérêt sur les achats. Reporter un solde élimine cette protection.",
              "type": "info"
            },
            {
              "text": "Piège du Paiement Minimum: Payer le minimum de 2% sur 10 000$ à 22% TAP prend 27+ ans et coûte plus de 16 000$ en intérêts — plus que la dette originale.",
              "type": "warning"
            },
            {
              "text": "TAP vs Taux Quotidien: Votre TAP divisé par 365 donne votre taux quotidien. À 22% TAP, c'est 0,0603% par jour — ça sonne petit mais c'est dévastateur au fil du temps.",
              "type": "info"
            },
            {
              "text": "TAP Multiples: Plusieurs cartes facturent des taux différents pour les achats, transferts de solde et avances de fonds. Les avances de fonds (25–30%+) n'ont pas de période de grâce.",
              "type": "warning"
            },
            {
              "text": "Taux Variables: La plupart des cartes de crédit ont des TAP variables liés au taux préférentiel. Quand la banque centrale augmente les taux, votre taux de carte de crédit augmente automatiquement.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Gammes de Taux d'Intérêt de Carte de Crédit",
          "items": [
            {
              "text": "Crédit Excellent (750+): TAP 14–19%. Les taux standard les plus bas disponibles, mais toujours coûteux comparés à d'autres types de prêts.",
              "type": "info"
            },
            {
              "text": "Bon Crédit (700–749): TAP 18–24%. La gamme la plus commune pour les cartes récompenses. Même les 'bons' taux sont élevés en termes absolus.",
              "type": "info"
            },
            {
              "text": "Crédit Correct (650–699): TAP 22–27%. Des taux plus élevés signifient que les intérêts composent plus vite — priorisez le paiement agressif de ces soldes.",
              "type": "warning"
            },
            {
              "text": "Crédit Pauvre (moins de 650): TAP 25–30%+. À ces taux, un solde de 5 000$ coûte 4$+ par jour. Considérez le conseil en dette si vous avez des difficultés.",
              "type": "warning"
            },
            {
              "text": "Cartes de Magasin: Généralement TAP 25–30%. Parmi les taux les plus élevés disponibles — évitez de reporter des soldes sur les cartes de magasin.",
              "type": "warning"
            },
            {
              "text": "Cartes de Transfert de Solde: TAP promotionnel 0% pour 12–21 mois. Outil puissant pour rembourser les dettes, mais surveillez les frais (3–5%) et le taux post-promotionnel.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples d'Intérêts de Carte de Crédit",
          "description": "Exemples étape par étape montrant comment les intérêts s'accumulent et l'impact de différentes stratégies de paiement",
          "examples": [
            {
              "title": "Solde de 5 000$ — Minimum vs Paiement Fixe",
              "steps": [
                "Solde: 5 000$ à 22,99% TAP",
                "Taux quotidien: 22,99% ÷ 365 = 0,0630% par jour",
                "Intérêts jour 1: 5 000$ × 0,000630 = 3,15$",
                "Intérêts premier mois: ~95,79$ (compose quotidiennement)",
                "Paiement minimum (2%): 100$ → seulement 4,21$ va au capital!",
                "Au minimum seulement: 32 ans, 9 447$ en intérêts",
                "À 200$/mois fixe: 32 mois, 1 357$ en intérêts",
                "Différence: économisez 8 090$ et 29+ ans!"
              ],
              "result": "Payer 200$/mois au lieu du minimum économise 8 090$ en intérêts et 29 ans de paiements"
            },
            {
              "title": "Solde de 10 000$ — Comparaison de Transfert de Solde",
              "steps": [
                "Carte actuelle: 10 000$ à 24,99% TAP, 300$/mois",
                "Intérêts mensuels (premier mois): ~208$",
                "Seulement 92$ des 300$ va au capital",
                "Remboursement au taux actuel: 50 mois, 4 840$ intérêts",
                "Transfert de solde: 0% promotionnel pour 18 mois, frais 3%",
                "Frais de transfert: 10 000$ × 3% = 300$",
                "300$/mois pour 18 mois = 5 400$ (rembourse 5 100$ net)",
                "Restant 4 900$ au nouveau taux après la période promotionnelle"
              ],
              "result": "Le transfert de solde économise ~3 200$ en intérêts si vous pouvez rembourser la majorité pendant la période promotionnelle 0%"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Comment sont calculés les intérêts de carte de crédit?",
          "answer": "Les intérêts de carte de crédit sont calculés en utilisant la composition quotidienne. Votre TAP est divisé par 365 pour obtenir un taux périodique quotidien. Chaque jour, ce taux est multiplié par votre solde actuel pour déterminer les frais d'intérêts de ce jour. Ces intérêts sont ajoutés à votre solde, donc le lendemain vous payez des intérêts sur un montant légèrement plus élevé. À 22% TAP, un solde de 5 000$ accumule environ 3,01$ par jour en intérêts."
        },
        {
          "question": "Quel est le coût réel des paiements minimums?",
          "answer": "Les paiements minimums sont conçus pour vous garder endetté le plus longtemps possible. Sur un solde de 5 000$ à 22% TAP, payer seulement le minimum de 2% prendrait plus de 30 ans et coûterait plus de 9 000$ en intérêts — presque le double du solde original. Le paiement minimum commence à 100$ mais diminue à mesure que votre solde décroît, signifiant que de moins en moins va au capital au fil du temps."
        },
        {
          "question": "Comment puis-je éviter de payer des intérêts de carte de crédit?",
          "answer": "Payez votre solde de relevé complet avant la date d'échéance chaque mois. Cela active votre période de grâce, ce qui signifie qu'aucun intérêt n'est facturé sur les nouveaux achats. Si vous avez déjà un solde, vous n'aurez pas de période de grâce jusqu'à ce que vous le remboursiez complètement. Considérez configurer un paiement automatique pour le solde complet pour vous assurer de ne jamais manquer un paiement et toujours éviter les intérêts."
        },
        {
          "question": "Qu'est-ce qu'un bon taux d'intérêt de carte de crédit?",
          "answer": "Les taux de carte de crédit sont généralement élevés comparés à d'autres prêts. En 2025–2026, les taux vont d'environ 14% pour un excellent crédit à 30%+ pour un crédit pauvre. Un 'bon' taux est en dessous de 18%, mais même cela est coûteux pour un emprunt à long terme. Si vous reportez un solde régulièrement, une carte à bas intérêts (13–16% TAP) ou une carte de transfert de solde à 0% vaut la peine d'être considérée."
        },
        {
          "question": "Un transfert de solde en vaut-il la peine?",
          "answer": "Un transfert de solde vers une carte TAP promotionnel 0% en vaut la peine si: les économies d'intérêts dépassent les frais de transfert (généralement 3–5% du solde), vous pouvez rembourser une portion significative pendant la période promotionnelle, et vous n'accumulerez pas de nouvelle dette. Par exemple, transférer 8 000$ avec des frais de 3% (240$) d'une carte à 24% TAP économise environ 160$/mois en intérêts pendant la période 0%."
        },
        {
          "question": "Pourquoi mon solde augmente-t-il même si je fais des paiements?",
          "answer": "Si votre paiement mensuel est proche ou inférieur aux intérêts facturés, très peu va à réduire votre solde réel. À 24% TAP sur un solde de 10 000$, environ 200$/mois va aux intérêts seulement. Si votre paiement est de 210$, seulement 10$ réduit votre solde — signifiant qu'il faudrait 83+ ans pour rembourser. Vous devez payer significativement plus que la portion d'intérêts pour faire de vrais progrès."
        },
        {
          "question": "Quelle est la différence entre TAP et taux quotidien?",
          "answer": "TAP (Taux Annuel Effectif Global) est le taux d'intérêt annuel sur votre carte. Le taux périodique quotidien est votre TAP divisé par 365. Par exemple, 22% TAP devient 0,0603% par jour. Bien que 0,06% sonne minuscule, il compose chaque jour — signifiant que vous payez des intérêts sur les intérêts d'hier. Sur une année, cette composition quotidienne rend le taux effectif légèrement plus élevé que le TAP déclaré."
        },
        {
          "question": "Payer plus que le minimum aide-t-il tant que ça?",
          "answer": "Dramatiquement. Sur un solde de 5 000$ à 22% TAP: les paiements minimums prennent 30+ ans et coûtent 9 000$+ en intérêts. Payer 150$/mois fixe prend 44 mois et coûte 1 538$. Payer 300$/mois prend 19 mois et coûte 667$. Chaque dollar supplémentaire au-dessus du minimum va directement au capital, créant un effet boule de neige qui accélère votre remboursement."
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
      "name": "Kreditkarten-Zinsrechner",
      "slug": "kreditkarten-zins-rechner",
      "subtitle": "Sehen Sie genau, wie viel Zinsen Sie zahlen, Ihre wahren Kosten und wie schnellere Zahlungen oder ein Saldoübertrag Ihnen Tausende sparen können.",
      "seo": {
        "title": "Kreditkarten-Zinsrechner - Sehen Sie Ihre wahren Kosten",
        "description": "Berechnen Sie Ihre Kreditkarten-Zinskosten täglich, monatlich und jährlich. Sehen Sie, wie Sonderzahlungen Tausende sparen und vergleichen Sie Saldoübertragungs-Ersparnisse. Kostenloses Online-Tool.",
        "shortDescription": "Berechnen Sie Kreditkartenzinsen und finden Sie Ihr Tilgungsdatum.",
        "keywords": [
          "kreditkarten zinsrechner",
          "kreditkarten tilgungsrechner",
          "kreditkarten zahlungsrechner",
          "wie viel zinsen kreditkarte",
          "kreditkarten zinssatz rechner",
          "kreditkarten saldo rechner",
          "kreditkarte abbezahlen",
          "kreditkarte wahre kosten"
        ]
      },
      "inputs": {
        "cardBalance": {
          "label": "Kreditkarten-Saldo",
          "helpText": "Ihr aktueller ausstehender Saldo — prüfen Sie Ihre letzte Abrechnung"
        },
        "annualRate": {
          "label": "Zinssatz (effektiver Jahreszins)",
          "helpText": "Effektiver Jahreszinssatz — zu finden auf Ihrer Abrechnung unter 'Zinsberechnung'"
        },
        "monthlyPayment": {
          "label": "Ihre monatliche Zahlung",
          "helpText": "Betrag, den Sie jeden Monat zahlen möchten — leer lassen für Mindestzahlungs-Szenario"
        },
        "minimumPaymentPercent": {
          "label": "Mindestzahlungs-Berechnung",
          "helpText": "Wie Ihre Karte die Mindestzahlung berechnet — die meisten Karten verwenden 2% des Saldos oder 25€ Minimum",
          "options": {
            "2": "2% des Saldos (am häufigsten)",
            "3": "3% des Saldos",
            "4": "4% des Saldos"
          }
        },
        "includeBalanceTransfer": {
          "label": "Saldoübertragung vergleichen",
          "helpText": "Aktivieren, um zu sehen, wie viel Sie durch Übertragung auf eine Karte mit niedrigerem Zinssatz sparen würden"
        },
        "transferRate": {
          "label": "Saldoübertragungs-Zinssatz",
          "helpText": "Der Zinssatz auf der neuen Karte nach der Einführungsperiode — geben Sie 0 für 0%-Einführungsangebote ein"
        },
        "transferFee": {
          "label": "Saldoübertragungs-Gebühr",
          "helpText": "Einmalige Gebühr für die Übertragung — typischerweise 3–5% des Saldos"
        }
      },
      "results": {
        "payoffDate": {
          "label": "TILGUNGSDATUM"
        },
        "totalInterestPaid": {
          "label": "Zinsen gesamt"
        },
        "totalAmountPaid": {
          "label": "Gesamtbetrag gezahlt"
        },
        "trueCostMultiplier": {
          "label": "Wahre Kostenmultiplikator"
        },
        "dailyInterestCost": {
          "label": "Tägliche Zinsen"
        },
        "monthlyInterestCost": {
          "label": "Monatliche Zinsen"
        },
        "interestToPaymentRatio": {
          "label": "Zinsen-zu-Zahlung"
        },
        "minimumPayoffTime": {
          "label": "Nur bei Minimum"
        },
        "interestSavedVsMin": {
          "label": "Ersparte Zinsen vs Min"
        },
        "balanceTransferSavings": {
          "label": "Saldoübertragungs-Ersparnisse"
        }
      },
      "presets": {
        "averageBalance": {
          "label": "Durchschnittssaldo",
          "description": "6.500€ bei 22,99%, 200€/Monat"
        },
        "highInterest": {
          "label": "Hohe Zinsen",
          "description": "10.000€ bei 27,49%, 250€/Monat"
        },
        "minimumTrap": {
          "label": "Minimum-Falle",
          "description": "5.000€ bei 19,99%, nur Minimum"
        },
        "almostDone": {
          "label": "Fast fertig",
          "description": "1.500€ bei 15,99%, 100€/Monat"
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
        "summary": "Ihr {balance} Saldo bei {rate}% Zinssatz kostet {dailyInterest}/Tag an Zinsen. Mit {payment}/Monat Zahlungen sind Sie bis {payoffDate} schuldenfrei und zahlen {totalInterest} an Gesamtzinsen."
      },
      "infoCards": {
        "interestBreakdown": {
          "title": "Zinsaufschlüsselung",
          "items": [
            {
              "label": "Tägliche Zinskosten",
              "valueKey": "dailyInterestCost"
            },
            {
              "label": "Monatliche Zinskosten",
              "valueKey": "monthlyInterestCost"
            },
            {
              "label": "Jährliche Zinskosten",
              "valueKey": "yearlyInterestCost"
            },
            {
              "label": "Wahre Kostenmultiplikator",
              "valueKey": "trueCostMultiplier"
            }
          ]
        },
        "paymentAnalysis": {
          "title": "Zahlungsanalyse",
          "items": [
            {
              "label": "Tilgungsdatum",
              "valueKey": "payoffDate"
            },
            {
              "label": "Gesamte gezahlte Zinsen",
              "valueKey": "totalInterestPaid"
            },
            {
              "label": "Zinsen-zu-Zahlung-Verhältnis",
              "valueKey": "interestToPaymentRatio"
            },
            {
              "label": "Ersparte Zinsen vs Minimum",
              "valueKey": "interestSavedVsMin"
            },
            {
              "label": "Gesparte Zeit vs Minimum",
              "valueKey": "timeSavedVsMin"
            }
          ]
        },
        "tips": {
          "title": "Zinsen sparen",
          "items": [
            "Zahlen Sie Ihren Saldo jeden Monat vollständig, um alle Zinsgebühren zu vermeiden — die Karenzzeit wird zurückgesetzt, wenn Sie vollständig zahlen.",
            "Bereits 50€ extra pro Monat bei einem 5.000€ Saldo mit 22% Zinssatz spart über 2.000€ an Zinsen und tilgt 3 Jahre schneller.",
            "Erwägen Sie eine 0%-Einführungszinssatz-Saldoübertragungskarte bei guter Bonität — Sie könnten während der Einführungsperiode Tausende sparen.",
            "Zahlen Sie früh im Abrechnungszyklus. Da Zinsen täglich anfallen, reduziert früheres Zahlen Ihren durchschnittlichen Tagessaldo."
          ]
        }
      },
      "chart": {
        "title": "Saldo über Zeit",
        "xLabel": "Monat",
        "yLabel": "Betrag",
        "series": {
          "balance": "Verbleibender Saldo",
          "cumulativeInterest": "Kumulierte Zinsen"
        }
      },
      "detailedTable": {
        "paymentSchedule": {
          "button": "Zahlungsplan anzeigen",
          "title": "Vollständiger Zahlungsplan",
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
          "title": "Wie Kreditkartenzinsen funktionieren",
          "content": "Kreditkartenzinsen sind die Kosten, die Sie für das Übertragen eines Saldos von einem Abrechnungszyklus zum nächsten zahlen. Anders als einfache Zinsen werden Kreditkartenzinsen täglich kapitalisiert — das bedeutet, Sie zahlen jeden einzelnen Tag Zinsen auf Zinsen. Der effektive Jahreszinssatz (APR) Ihrer Karte wird durch 365 geteilt, um einen täglichen periodischen Zinssatz zu erhalten. Jeden Tag wird dieser Satz auf Ihren aktuellen Saldo angewendet, und die resultierenden Zinsen werden zu Ihren Schulden addiert. Dieser tägliche Zinseszinseffekt ist der Grund, warum Kreditkartenschulden so schnell wachsen und warum selbst kleine Salden über die Zeit teuer werden können. Der Schlüssel ist: Wenn Sie jeden Monat Ihren vollständigen Abrechnungssaldo bis zum Fälligkeitsdatum zahlen, zahlen Sie null Zinsen — die Karenzzeit schützt Sie. Aber sobald Sie irgendeinen Saldo vorwärts tragen, beginnen sofort Zinsen auf alles anzufallen."
        },
        "howItWorks": {
          "title": "Wie dieser Rechner funktioniert",
          "content": "Geben Sie Ihren aktuellen Kreditkartensaldo, den effektiven Jahreszinssatz Ihrer Karte und den Betrag ein, den Sie monatlich zu zahlen planen. Der Rechner simuliert Ihren Tilgungsweg unter Verwendung täglich kapitalisierter Zinsen und zeigt genau, wie lange es dauert, um null zu erreichen und wie viel Gesamtzinsen Sie zahlen werden. Er berechnet auch, was passieren würde, wenn Sie nur Mindestzahlungen leisten würden — und enthüllt die schockierenden wahren Kosten der Mindestzahlungs-Falle. Einzigartige Metriken wie der wahre Kostenmultiplikator zeigen, wie viel Ihre ursprünglichen Käufe nach Zinsen tatsächlich kosten, während die täglichen Zinskosten die Dringlichkeit real machen. Wenn Sie den Saldoübertragungs-Vergleich aktivieren, berechnet er, ob die Übertragung Ihres Saldos auf eine Karte mit niedrigerem Zinssatz Ihnen nach Berücksichtigung der Übertragungs-Gebühr Geld sparen würde."
        },
        "considerations": {
          "title": "Schlüsselfaktoren, die Kreditkartenzinsen beeinflussen",
          "items": [
            {
              "text": "Tägliche Kapitalisierung: Zinsen werden täglich berechnet und zu Ihrem Saldo addiert. Ein 5.000€ Saldo bei 22% Zinssatz wächst jeden einzelnen Tag um 3,01€.",
              "type": "warning"
            },
            {
              "text": "Karenzzeit: Wenn Sie Ihren vollständigen Abrechnungssaldo bis zum Fälligkeitsdatum zahlen, zahlen Sie null Zinsen auf Käufe. Das Tragen irgendeines Saldos eliminiert diesen Schutz.",
              "type": "info"
            },
            {
              "text": "Mindestzahlungs-Falle: 2% Minimum auf 10.000€ bei 22% Zinssatz zahlen dauert 27+ Jahre und kostet über 16.000€ an Zinsen — mehr als die ursprüngliche Schuld.",
              "type": "warning"
            },
            {
              "text": "Effektiver Jahreszins vs Tagessatz: Ihr effektiver Jahreszins geteilt durch 365 ergibt Ihren Tagessatz. Bei 22% sind das 0,0603% pro Tag — klingt klein, ist aber über die Zeit verheerend.",
              "type": "info"
            },
            {
              "text": "Mehrere Zinssätze: Viele Karten berechnen unterschiedliche Sätze für Käufe, Saldoübertragungen und Bargeldvorschüsse. Bargeldvorschüsse (25–30%+) haben keine Karenzzeit.",
              "type": "warning"
            },
            {
              "text": "Variable Zinssätze: Die meisten Kreditkarten haben variable Zinssätze, die an den Leitzins gekoppelt sind. Wenn die Zentralbank die Zinsen erhöht, steigt Ihr Kreditkartenzinssatz automatisch.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Kreditkarten-Zinssatz-Bereiche",
          "items": [
            {
              "text": "Ausgezeichnete Bonität (750+): 14–19% Zinssatz. Die niedrigsten verfügbaren Standardsätze, aber immer noch teuer im Vergleich zu anderen Darlehensarten.",
              "type": "info"
            },
            {
              "text": "Gute Bonität (700–749): 18–24% Zinssatz. Der häufigste Bereich für Prämienkarten. Selbst 'gute' Sätze sind in absoluten Zahlen hoch.",
              "type": "info"
            },
            {
              "text": "Faire Bonität (650–699): 22–27% Zinssatz. Höhere Sätze bedeuten, dass Zinsen schneller kapitalisieren — priorisieren Sie aggressive Tilgung dieser Salden.",
              "type": "warning"
            },
            {
              "text": "Schlechte Bonität (unter 650): 25–30%+ Zinssatz. Bei diesen Sätzen kostet ein 5.000€ Saldo 4€+ pro Tag. Erwägen Sie Schuldnerberatung bei Problemen.",
              "type": "warning"
            },
            {
              "text": "Geschäftskarten: Typischerweise 25–30% Zinssatz. Unter den höchsten verfügbaren Sätzen — vermeiden Sie das Tragen von Salden auf Geschäfts-Markenkarten.",
              "type": "warning"
            },
            {
              "text": "Saldoübertragungs-Karten: 0% Einführungszinssatz für 12–21 Monate. Mächtiges Werkzeug zum Schuldenabbau, aber achten Sie auf die Gebühr (3–5%) und den Post-Einführungs-Satz.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Kreditkartenzins-Beispiele",
          "description": "Schritt-für-Schritt-Beispiele, die zeigen, wie sich Zinsen ansammeln und welche Auswirkungen verschiedene Zahlungsstrategien haben",
          "examples": [
            {
              "title": "5.000€ Saldo — Minimum vs feste Zahlung",
              "steps": [
                "Saldo: 5.000€ bei 22,99% Zinssatz",
                "Tagessatz: 22,99% ÷ 365 = 0,0630% pro Tag",
                "Tag 1 Zinsen: 5.000€ × 0,000630 = 3,15€",
                "Erster Monat Zinsen: ~95,79€ (täglich kapitalisiert)",
                "Mindestzahlung (2%): 100€ → nur 4,21€ gehen zur Tilgung!",
                "Nur bei Minimum: 32 Jahre, 9.447€ Zinsen",
                "Bei 200€/Monat fest: 32 Monate, 1.357€ Zinsen",
                "Unterschied: sparen Sie 8.090€ und 29+ Jahre!"
              ],
              "result": "200€/Monat statt Minimum zahlen spart 8.090€ Zinsen und 29 Jahre Zahlungen"
            },
            {
              "title": "10.000€ Saldo — Saldoübertragungs-Vergleich",
              "steps": [
                "Aktuelle Karte: 10.000€ bei 24,99% Zinssatz, 300€/Monat",
                "Monatliche Zinsen (erster Monat): ~208€",
                "Nur 92€ von 300€ gehen zur Tilgung",
                "Tilgung bei aktuellem Satz: 50 Monate, 4.840€ Zinsen",
                "Saldoübertragung: 0% Einführung für 18 Monate, 3% Gebühr",
                "Übertragungsgebühr: 10.000€ × 3% = 300€",
                "300€/Monat für 18 Monate = 5.400€ (tilgt 5.100€ netto)",
                "Verbleibende 4.900€ bei neuem Satz nach Einführungsperiode"
              ],
              "result": "Saldoübertragung spart ~3.200€ Zinsen, wenn Sie das meiste während der 0% Einführungsperiode tilgen können"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie werden Kreditkartenzinsen berechnet?",
          "answer": "Kreditkartenzinsen werden mit täglicher Kapitalisierung berechnet. Ihr effektiver Jahreszinssatz wird durch 365 geteilt, um einen täglichen periodischen Zinssatz zu erhalten. Jeden Tag wird dieser Satz mit Ihrem aktuellen Saldo multipliziert, um die Zinsbelastung dieses Tages zu bestimmen. Diese Zinsen werden zu Ihrem Saldo addiert, sodass Sie am nächsten Tag Zinsen auf einen etwas höheren Betrag zahlen. Bei 22% Zinssatz fallen bei einem 5.000€ Saldo etwa 3,01€ pro Tag an Zinsen an."
        },
        {
          "question": "Was sind die wahren Kosten von Mindestzahlungen?",
          "answer": "Mindestzahlungen sind darauf ausgelegt, Sie so lange wie möglich in Schulden zu halten. Bei einem 5.000€ Saldo mit 22% Zinssatz würde das Zahlen nur des 2% Minimums über 30 Jahre dauern und mehr als 9.000€ an Zinsen kosten — fast das Doppelte des ursprünglichen Saldos. Die Mindestzahlung beginnt bei 100€, schrumpft aber, wenn Ihr Saldo sinkt, was bedeutet, dass über die Zeit immer weniger zur Tilgung geht."
        },
        {
          "question": "Wie kann ich Kreditkartenzinsen vermeiden?",
          "answer": "Zahlen Sie jeden Monat Ihren vollständigen Abrechnungssaldo bis zum Fälligkeitsdatum. Dies aktiviert Ihre Karenzzeit, was bedeutet, dass keine Zinsen auf neue Käufe berechnet werden. Wenn Sie bereits einen Saldo haben, haben Sie keine Karenzzeit, bis Sie ihn vollständig abbezahlt haben. Erwägen Sie, einen Dauerauftrag für den vollständigen Saldo einzurichten, um sicherzustellen, dass Sie nie eine Zahlung verpassen und immer Zinsen vermeiden."
        },
        {
          "question": "Was ist ein guter Kreditkarten-Zinssatz?",
          "answer": "Kreditkarten-Zinssätze sind generell hoch im Vergleich zu anderen Darlehen. Ab 2025–2026 reichen die Sätze von etwa 14% für ausgezeichnete Bonität bis 30%+ für schlechte Bonität. Ein 'guter' Satz liegt unter 18%, aber selbst das ist teuer für langfristige Kreditaufnahme. Wenn Sie regelmäßig einen Saldo tragen, ist eine Niedrigzins-Karte (13–16% Zinssatz) oder eine 0% Saldoübertragungs-Karte erwägenswert."
        },
        {
          "question": "Lohnt sich eine Saldoübertragung?",
          "answer": "Eine Saldoübertragung auf eine 0% Einführungszinssatz-Karte lohnt sich, wenn: die Zinsersparnisse die Übertragungsgebühr (typischerweise 3–5% des Saldos) übersteigen, Sie einen bedeutenden Teil während der Einführungsperiode abbezahlen können und Sie keine neuen Schulden anhäufen. Zum Beispiel: die Übertragung von 8.000€ mit einer 3% Gebühr (240€) von einer 24% Zinssatz-Karte spart etwa 160€/Monat an Zinsen während der 0% Periode."
        },
        {
          "question": "Warum wächst mein Saldo, obwohl ich Zahlungen leiste?",
          "answer": "Wenn Ihre monatliche Zahlung nahe oder weniger als die berechneten Zinsen ist, geht sehr wenig zur tatsächlichen Saldoreduktion. Bei 24% Zinssatz auf einen 10.000€ Saldo gehen etwa 200€/Monat allein für Zinsen drauf. Wenn Ihre Zahlung 210€ beträgt, reduzieren nur 10€ Ihren Saldo — das bedeutet, es würde 83+ Jahre dauern, um ihn abzuzahlen. Sie müssen deutlich mehr als den Zinsanteil zahlen, um echten Fortschritt zu machen."
        },
        {
          "question": "Was ist der Unterschied zwischen effektivem Jahreszins und Tagessatz?",
          "answer": "Der effektive Jahreszins ist der jährliche Zinssatz auf Ihrer Karte. Der tägliche periodische Zinssatz ist Ihr effektiver Jahreszins geteilt durch 365. Zum Beispiel werden 22% Jahreszins zu 0,0603% pro Tag. Während 0,06% winzig klingt, kapitalisiert es jeden Tag — das bedeutet, Sie zahlen Zinsen auf die gestrigen Zinsen. Über ein Jahr macht diese tägliche Kapitalisierung den effektiven Satz etwas höher als den angegebenen Jahreszins."
        },
        {
          "question": "Hilft es so viel, mehr als das Minimum zu zahlen?",
          "answer": "Dramatisch. Bei einem 5.000€ Saldo mit 22% Zinssatz: Mindestzahlungen dauern 30+ Jahre und kosten 9.000€+ an Zinsen. 150€/Monat fest zu zahlen dauert 44 Monate und kostet 1.538€. 300€/Monat zu zahlen dauert 19 Monate und kostet 667€. Jeder extra Euro über dem Minimum geht direkt zur Tilgung und erzeugt einen Schneeballeffekt, der Ihre Tilgung beschleunigt."
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
    // Credit Card Balance
    {
      id: "cardBalance",
      type: "number",
      defaultValue: null,
      placeholder: "5000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // APR — slider
    {
      id: "annualRate",
      type: "slider",
      defaultValue: 22.99,
      min: 0,
      max: 35,
      step: 0.01,
      suffix: "%",
    },
    // Monthly Payment
    {
      id: "monthlyPayment",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // Minimum Payment %
    {
      id: "minimumPaymentPercent",
      type: "select",
      defaultValue: "2",
      options: [
        { value: "2" },
        { value: "3" },
        { value: "4" },
      ],
    },
    // Balance Transfer toggle
    {
      id: "includeBalanceTransfer",
      type: "toggle",
      defaultValue: false,
    },
    // Transfer APR
    {
      id: "transferRate",
      type: "number",
      defaultValue: null,
      placeholder: "0",
      min: 0,
      max: 30,
      step: 0.01,
      suffix: "%",
      showWhen: { field: "includeBalanceTransfer", value: true },
    },
    // Transfer Fee %
    {
      id: "transferFee",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 10,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeBalanceTransfer", value: true },
    },
  ],

  inputGroups: [],

  // ─── RESULTS ───
  results: [
    { id: "payoffDate", type: "primary", format: "text" },
    { id: "totalInterestPaid", type: "secondary", format: "text" },
    { id: "totalAmountPaid", type: "secondary", format: "text" },
    { id: "trueCostMultiplier", type: "secondary", format: "text" },
    { id: "dailyInterestCost", type: "secondary", format: "text" },
    { id: "monthlyInterestCost", type: "secondary", format: "text" },
    { id: "interestToPaymentRatio", type: "secondary", format: "text" },
    { id: "minimumPayoffTime", type: "secondary", format: "text" },
    { id: "interestSavedVsMin", type: "secondary", format: "text" },
    { id: "balanceTransferSavings", type: "secondary", format: "text" },
  ],

  // ─── INFO CARDS ───
  infoCards: [
    { id: "interestBreakdown", type: "list", icon: "💰", itemCount: 4 },
    { id: "paymentAnalysis", type: "list", icon: "📊", itemCount: 5 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ───
  chart: {
    id: "balanceOverTime",
    type: "composed",
    xKey: "month",
    stacked: false,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "balance", type: "area", color: "#ef4444" },
      { key: "cumulativeInterest", type: "area", color: "#f97316" },
    ],
  },

  // ─── DETAILED TABLE ───
  detailedTable: {
    id: "paymentSchedule",
    buttonLabel: "View Payment Schedule",
    buttonIcon: "📅",
    modalTitle: "Full Payment Schedule",
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
      title: "Credit Card Interest and Charges",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/ask-cfpb/how-is-interest-calculated-on-my-credit-card-en-51/",
    },
    {
      authors: "Federal Reserve",
      year: "2025",
      title: "Consumer Credit - G.19 Report",
      source: "Federal Reserve Statistical Release",
      url: "https://www.federalreserve.gov/releases/g19/current/",
    },
    {
      authors: "NerdWallet",
      year: "2025",
      title: "How Credit Card Interest Is Calculated",
      source: "NerdWallet",
      url: "https://www.nerdwallet.com/article/credit-cards/how-is-credit-card-interest-calculated",
    },
  ],

  hero: {},
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

function simulatePayoff(
  balance: number,
  aprPercent: number,
  fixedPayment: number | null,
  minPaymentPercent: number,
  maxMonths = 600
) {
  const dailyRate = aprPercent / 100 / 365;
  const minFloor = 25; // Minimum dollar floor
  let bal = balance;
  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;

  const snapshots: Array<{ month: number; balance: number; cumulativeInterest: number }> = [];
  const schedule: Array<Record<string, string>> = [];

  snapshots.push({ month: 0, balance: bal, cumulativeInterest: 0 });

  while (bal > 0.01 && month < maxMonths) {
    month++;

    // Calculate monthly interest via daily compounding (30 days avg)
    let monthInterest = 0;
    let tempBal = bal;
    for (let d = 0; d < 30; d++) {
      const dayInt = tempBal * dailyRate;
      tempBal += dayInt;
      monthInterest += dayInt;
    }

    // Determine payment
    const minPayment = Math.max(bal * (minPaymentPercent / 100), minFloor);
    let payment: number;
    if (fixedPayment !== null && fixedPayment > 0) {
      payment = Math.max(fixedPayment, minFloor);
    } else {
      payment = minPayment; // Minimum only
    }

    // Don't overpay
    payment = Math.min(payment, bal + monthInterest);

    const principalPaid = payment - monthInterest;
    bal = bal + monthInterest - payment;
    if (bal < 0.01) bal = 0;

    totalInterest += monthInterest;
    totalPaid += payment;

    // Snapshots
    if (month <= 24 || month % 3 === 0 || bal <= 0.01) {
      snapshots.push({
        month,
        balance: Math.max(0, Math.round(bal)),
        cumulativeInterest: Math.round(totalInterest),
      });
    }

    // Table rows
    if (month <= 12 || month % 6 === 0 || bal <= 0.01) {
      schedule.push({
        month: `${month}`,
        payment: `${Math.round(payment * 100) / 100}`,
        principal: `${Math.round(Math.max(principalPaid, 0) * 100) / 100}`,
        interest: `${Math.round(monthInterest * 100) / 100}`,
        balance: `${Math.round(Math.max(bal, 0) * 100) / 100}`,
      });
    }
  }

  return { totalInterest, totalPaid, totalMonths: month, snapshots, schedule };
}

export function calculateCreditCardInterest(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Parse inputs ───
  const cardBalance = values.cardBalance as number | null;
  const annualRate = (values.annualRate as number) ?? 22.99;
  const monthlyPayment = (values.monthlyPayment as number | null) || null;
  const minPaymentPercent = Number(values.minimumPaymentPercent) || 2;
  const includeTransfer = values.includeBalanceTransfer as boolean;
  const transferRate = includeTransfer ? ((values.transferRate as number | null) ?? 0) : 0;
  const transferFeePercent = includeTransfer ? ((values.transferFee as number) ?? 3) : 0;

  // ─── Validate ───
  if (!cardBalance || cardBalance <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ─── Currency symbol ───
  const curr = fieldUnits?.cardBalance || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ─── Current interest metrics ───
  const dailyInterest = cardBalance * (annualRate / 100) / 365;
  const monthlyInterest = cardBalance * (annualRate / 100) / 12;
  const yearlyInterest = cardBalance * (annualRate / 100);

  // ─── Simulate: Custom Payment ───
  const customResult = simulatePayoff(cardBalance, annualRate, monthlyPayment, minPaymentPercent);

  // ─── Simulate: Minimum Only ───
  const minResult = simulatePayoff(cardBalance, annualRate, null, minPaymentPercent);

  // ─── Interest-to-payment ratio (first month) ───
  const firstMonthPayment = monthlyPayment || Math.max(cardBalance * (minPaymentPercent / 100), 25);
  const interestToPaymentRatio = (monthlyInterest / firstMonthPayment) * 100;

  // ─── True cost multiplier ───
  const trueCostMultiplier = customResult.totalPaid / cardBalance;

  // ─── Savings vs minimum ───
  const interestSavedVsMin = minResult.totalInterest - customResult.totalInterest;
  const timeSavedMonths = minResult.totalMonths - customResult.totalMonths;
  const timeSavedYears = Math.floor(Math.abs(timeSavedMonths) / 12);
  const timeSavedRemMonths = Math.abs(timeSavedMonths) % 12;

  // ─── Minimum payoff time string ───
  const minYears = Math.floor(minResult.totalMonths / 12);
  const minRemMonths = minResult.totalMonths % 12;
  let minPayoffStr = "";
  if (minYears > 0 && minRemMonths > 0) {
    minPayoffStr = `${minYears} yr ${minRemMonths} mo`;
  } else if (minYears > 0) {
    minPayoffStr = `${minYears} ${minYears === 1 ? "year" : "years"}`;
  } else {
    minPayoffStr = `${minRemMonths} ${minRemMonths === 1 ? "month" : "months"}`;
  }

  // ─── Time saved string ───
  let timeSavedStr = "—";
  if (timeSavedMonths > 0) {
    if (timeSavedYears > 0 && timeSavedRemMonths > 0) {
      timeSavedStr = `${timeSavedYears} yr ${timeSavedRemMonths} mo faster`;
    } else if (timeSavedYears > 0) {
      timeSavedStr = `${timeSavedYears} ${timeSavedYears === 1 ? "year" : "years"} faster`;
    } else {
      timeSavedStr = `${timeSavedRemMonths} mo faster`;
    }
  }

  // ─── Payoff date ───
  const now = new Date();
  const payoffDate = new Date(now.getFullYear(), now.getMonth() + customResult.totalMonths, 1);
  const payoffDateStr = payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // ─── Balance transfer comparison ───
  let transferSavingsStr = "—";
  let transferSavingsVal = 0;
  if (includeTransfer) {
    const transferFeeAmount = cardBalance * (transferFeePercent / 100);
    const transferResult = simulatePayoff(
      cardBalance + transferFeeAmount,
      transferRate,
      monthlyPayment,
      minPaymentPercent
    );
    transferSavingsVal = customResult.totalInterest - transferResult.totalInterest - transferFeeAmount;
    if (transferSavingsVal > 0) {
      transferSavingsStr = `${sym}${fmtNum(transferSavingsVal)} saved`;
    } else {
      transferSavingsStr = `Not worth it (${sym}${fmtNum(Math.abs(transferSavingsVal))} more)`;
    }
  }

  // ─── Build summary ───
  const paymentStr = monthlyPayment ? `${sym}${fmtNum(monthlyPayment)}` : `${sym}${fmtNum(Math.max(cardBalance * (minPaymentPercent / 100), 25))} (min)`;
  let summary =
    f.summary
      ?.replace("{balance}", `${sym}${fmtNum(cardBalance, 0)}`)
      .replace("{rate}", `${annualRate}`)
      .replace("{dailyInterest}", `${sym}${fmtNum(dailyInterest)}`)
      .replace("{payment}", paymentStr)
      .replace("{payoffDate}", payoffDateStr)
      .replace("{totalInterest}", `${sym}${fmtNum(customResult.totalInterest)}`) ||
    `Your ${sym}${fmtNum(cardBalance, 0)} balance at ${annualRate}% costs ${sym}${fmtNum(dailyInterest)}/day. Payoff by ${payoffDateStr}, total interest: ${sym}${fmtNum(customResult.totalInterest)}.`;

  if (interestSavedVsMin > 100 && monthlyPayment) {
    summary += ` You save ${sym}${fmtNum(interestSavedVsMin)} vs minimum payments.`;
  }

  // ─── Chart data ───
  const chartData = customResult.snapshots.map((s) => ({
    month: `${s.month}`,
    balance: s.balance,
    cumulativeInterest: s.cumulativeInterest,
  }));

  // ─── Table data ───
  const tableData = customResult.schedule.map((row) => ({
    month: row.month,
    payment: `${sym}${fmtNum(Number(row.payment))}`,
    principal: `${sym}${fmtNum(Number(row.principal))}`,
    interest: `${sym}${fmtNum(Number(row.interest))}`,
    balance: `${sym}${fmtNum(Number(row.balance))}`,
  }));

  return {
    values: {
      payoffDate: customResult.totalMonths,
      totalInterestPaid: customResult.totalInterest,
      totalAmountPaid: customResult.totalPaid,
      trueCostMultiplier,
      dailyInterestCost: dailyInterest,
      monthlyInterestCost: monthlyInterest,
      yearlyInterestCost: yearlyInterest,
      interestToPaymentRatio,
      minimumPayoffTime: minResult.totalMonths,
      interestSavedVsMin,
      timeSavedVsMin: timeSavedMonths,
      balanceTransferSavings: transferSavingsVal,
    },
    formatted: {
      payoffDate: payoffDateStr,
      totalInterestPaid: `${sym}${fmtNum(customResult.totalInterest)}`,
      totalAmountPaid: `${sym}${fmtNum(customResult.totalPaid)}`,
      trueCostMultiplier: `${fmtNum(trueCostMultiplier, 2)}× your balance`,
      dailyInterestCost: `${sym}${fmtNum(dailyInterest)}/day`,
      monthlyInterestCost: `${sym}${fmtNum(monthlyInterest)}/month`,
      yearlyInterestCost: `${sym}${fmtNum(yearlyInterest)}/year`,
      interestToPaymentRatio: `${fmtNum(interestToPaymentRatio, 0)}% goes to interest`,
      minimumPayoffTime: `${minPayoffStr}, ${sym}${fmtNum(minResult.totalInterest)} interest`,
      interestSavedVsMin: interestSavedVsMin > 0 ? `${sym}${fmtNum(interestSavedVsMin)} saved` : "—",
      timeSavedVsMin: timeSavedStr,
      balanceTransferSavings: transferSavingsStr,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
