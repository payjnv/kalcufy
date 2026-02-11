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

export const debtPayoffCalculatorConfig: CalculatorConfigV4 = {
  id: "debt-payoff",
  version: "4.0",
  category: "finance",
  icon: "💳",

  // ─── PRESETS ───
  presets: [
    {
      id: "creditCardCrisis",
      icon: "💳",
      values: {
        debt1Balance: 8000,
        debt1Rate: 22.99,
        debt1MinPayment: 200,
        debt2Balance: 3000,
        debt2Rate: 19.49,
        debt2MinPayment: 75,
        numberOfDebts: "3",
        debt3Balance: 15000,
        debt3Rate: 6.5,
        debt3MinPayment: 350,
        debt4Balance: null,
        debt4Rate: null,
        debt4MinPayment: null,
        payoffStrategy: "avalanche",
        includeExtraPayment: true,
        extraMonthlyPayment: 200,
        includeIncome: true,
        monthlyIncome: 5000,
      },
    },
    {
      id: "mixedDebt",
      icon: "🚗",
      values: {
        debt1Balance: 5000,
        debt1Rate: 21.49,
        debt1MinPayment: 125,
        debt2Balance: 18000,
        debt2Rate: 6.5,
        debt2MinPayment: 400,
        numberOfDebts: "3",
        debt3Balance: 10000,
        debt3Rate: 12,
        debt3MinPayment: 250,
        debt4Balance: null,
        debt4Rate: null,
        debt4MinPayment: null,
        payoffStrategy: "avalanche",
        includeExtraPayment: true,
        extraMonthlyPayment: 150,
        includeIncome: false,
        monthlyIncome: null,
      },
    },
    {
      id: "studentHeavy",
      icon: "🎓",
      values: {
        debt1Balance: 35000,
        debt1Rate: 6.0,
        debt1MinPayment: 400,
        debt2Balance: 15000,
        debt2Rate: 5.0,
        debt2MinPayment: 170,
        numberOfDebts: "3",
        debt3Balance: 4000,
        debt3Rate: 20.49,
        debt3MinPayment: 100,
        debt4Balance: null,
        debt4Rate: null,
        debt4MinPayment: null,
        payoffStrategy: "snowball",
        includeExtraPayment: true,
        extraMonthlyPayment: 100,
        includeIncome: false,
        monthlyIncome: null,
      },
    },
    {
      id: "highBalance",
      icon: "🏠",
      values: {
        debt1Balance: 40000,
        debt1Rate: 8.5,
        debt1MinPayment: 500,
        debt2Balance: 12000,
        debt2Rate: 24.49,
        debt2MinPayment: 300,
        numberOfDebts: "4",
        debt3Balance: 22000,
        debt3Rate: 5.5,
        debt3MinPayment: 450,
        debt4Balance: 8000,
        debt4Rate: 11,
        debt4MinPayment: 200,
        payoffStrategy: "avalanche",
        includeExtraPayment: true,
        extraMonthlyPayment: 300,
        includeIncome: true,
        monthlyIncome: 7500,
      },
    },
  ],

  // ─── TRANSLATIONS (EN only — script translates) ───
  t: {
    en: {
      name: "Debt Payoff Calculator",
      slug: "debt-payoff",
      subtitle:
        "Create your personalized debt-free plan using snowball, avalanche, or minimum payment strategies.",
      seo: {
        title: "Debt Payoff Calculator - Create Your Debt-Free Plan",
        description:
          "Plan your debt payoff with snowball or avalanche strategies. See your debt-free date, daily interest cost, and how extra payments save thousands. Free online tool.",
        shortDescription: "Create a debt payoff plan and see your debt-free date.",
        keywords: [
          "debt payoff calculator",
          "debt snowball calculator",
          "debt avalanche calculator",
          "pay off debt fast",
          "debt free calculator",
          "credit card payoff",
          "debt repayment plan",
          "debt elimination calculator",
        ],
      },

      inputs: {
        debt1Balance: {
          label: "Debt 1 — Balance",
          helpText: "Current balance owed on your first debt",
        },
        debt1Rate: {
          label: "Debt 1 — Interest Rate (APR)",
          helpText: "Annual percentage rate on this debt",
        },
        debt1MinPayment: {
          label: "Debt 1 — Minimum Payment",
          helpText: "Minimum monthly payment required by the lender",
        },
        debt2Balance: {
          label: "Debt 2 — Balance",
          helpText: "Current balance owed on your second debt",
        },
        debt2Rate: {
          label: "Debt 2 — Interest Rate (APR)",
          helpText: "Annual percentage rate on this debt",
        },
        debt2MinPayment: {
          label: "Debt 2 — Minimum Payment",
          helpText: "Minimum monthly payment required by the lender",
        },
        numberOfDebts: {
          label: "Additional Debts",
          helpText: "Select how many total debts you want to include",
          options: {
            "2": "2 Debts Only",
            "3": "3 Debts",
            "4": "4 Debts",
          },
        },
        debt3Balance: {
          label: "Debt 3 — Balance",
          helpText: "Current balance owed on your third debt",
        },
        debt3Rate: {
          label: "Debt 3 — Interest Rate (APR)",
          helpText: "Annual percentage rate on this debt",
        },
        debt3MinPayment: {
          label: "Debt 3 — Minimum Payment",
          helpText: "Minimum monthly payment required by the lender",
        },
        debt4Balance: {
          label: "Debt 4 — Balance",
          helpText: "Current balance owed on your fourth debt",
        },
        debt4Rate: {
          label: "Debt 4 — Interest Rate (APR)",
          helpText: "Annual percentage rate on this debt",
        },
        debt4MinPayment: {
          label: "Debt 4 — Minimum Payment",
          helpText: "Minimum monthly payment required by the lender",
        },
        payoffStrategy: {
          label: "Payoff Strategy",
          helpText: "Avalanche saves the most money. Snowball gives faster wins. Minimum shows the baseline.",
          options: {
            avalanche: "Avalanche (Highest Rate First)",
            snowball: "Snowball (Smallest Balance First)",
            minimum: "Minimum Payments Only",
          },
        },
        includeExtraPayment: {
          label: "Extra Monthly Payment",
          helpText: "Toggle on to add extra money each month toward your targeted debt",
        },
        extraMonthlyPayment: {
          label: "Extra Amount Per Month",
          helpText: "This extra amount is applied to the targeted debt on top of all minimum payments",
        },
        includeIncome: {
          label: "Include Monthly Income",
          helpText: "Optional — enter your income to calculate your debt-to-income ratio",
        },
        monthlyIncome: {
          label: "Gross Monthly Income",
          helpText: "Total monthly income before taxes — used to calculate debt-to-income ratio",
        },
      },

      results: {
        debtFreeDate: { label: "DEBT-FREE DATE" },
        totalInterestPaid: { label: "Total Interest" },
        totalAmountPaid: { label: "Total Amount Paid" },
        monthlyInterestDrain: { label: "Monthly Interest Drain" },
        dailyInterestCost: { label: "Daily Interest Cost" },
        weightedAvgRate: { label: "Weighted Avg Rate" },
        debtToIncomeRatio: { label: "Debt-to-Income Ratio" },
        interestSaved: { label: "Interest Saved" },
        timeSaved: { label: "Time Saved" },
        firstDebtEliminated: { label: "First Win" },
      },

      presets: {
        creditCardCrisis: {
          label: "Credit Card Crisis",
          description: "$26K debt, CC at 22.99% + 19.49%",
        },
        mixedDebt: {
          label: "Mixed Debt",
          description: "$33K across CC, auto, personal",
        },
        studentHeavy: {
          label: "Student Heavy",
          description: "$54K mostly student loans",
        },
        highBalance: {
          label: "High Balance",
          description: "$82K HELOC, CC, auto, personal",
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
          "Using the {strategy} method, you'll be debt-free by {debtFreeDate}. Total interest: {totalInterest}.",
      },

      infoCards: {
        overview: {
          title: "Debt Overview",
          items: [
            { label: "Total Debt", valueKey: "totalDebt" },
            { label: "Weighted Avg APR", valueKey: "weightedAvgRate" },
            { label: "Debt-to-Income", valueKey: "debtToIncomeRatio" },
            { label: "Daily Interest Cost", valueKey: "dailyInterestCost" },
          ],
        },
        plan: {
          title: "Your Payoff Plan",
          items: [
            { label: "Debt-Free Date", valueKey: "debtFreeDate" },
            { label: "Total Interest Paid", valueKey: "totalInterestPaid" },
            { label: "Interest Saved vs Minimum", valueKey: "interestSaved" },
            { label: "Time Saved vs Minimum", valueKey: "timeSaved" },
            { label: "First Debt Eliminated", valueKey: "firstDebtEliminated" },
          ],
        },
        tips: {
          title: "Debt-Free Tips",
          items: [
            "Target credit cards first (15–25% APR) — they cost 3–5× more than auto or student loans in interest.",
            "Adding just $100/month to your highest-rate debt can save thousands in interest and years off your timeline.",
            "Call your credit card company and ask for a lower rate. A 5% reduction on $10K saves $500/year in interest.",
            "Freeze credit cards and use cash or debit while paying off debt. New charges undo your payoff progress.",
          ],
        },
      },

      chart: {
        title: "Debt Balance Over Time",
        xLabel: "Month",
        yLabel: "Balance",
        series: {
          totalBalance: "Remaining Balance",
          cumulativeInterest: "Cumulative Interest",
        },
      },

      detailedTable: {
        payoffSchedule: {
          button: "View Full Payoff Schedule",
          title: "Month-by-Month Payoff Schedule",
          columns: {
            month: "Month",
            targetedDebt: "Debt Targeted",
            payment: "Payment",
            principal: "Principal",
            interest: "Interest",
            remaining: "Total Remaining",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is a Debt Payoff Plan?",
          content:
            "A debt payoff plan is a strategic approach to eliminating your debts by organizing payments in a specific order. Rather than making random payments across multiple accounts, a payoff plan prioritizes certain debts to either minimize total interest paid or build psychological momentum through quick wins. The two most popular strategies are the debt avalanche method, which targets the highest interest rate first, and the debt snowball method, which tackles the smallest balance first. Both approaches keep you making minimum payments on all debts while directing any extra funds toward a single targeted debt. When that debt is eliminated, the freed-up payment rolls over to the next debt in line, creating an accelerating payment effect. Studies show that people who follow a structured payoff plan are significantly more likely to become debt-free compared to those who pay randomly.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content:
            "Enter each of your debts with its current balance, annual interest rate (APR), and minimum monthly payment. Choose your preferred strategy — avalanche or snowball — and optionally add an extra monthly payment amount. The calculator simulates your entire payoff journey month by month, tracking how each debt shrinks over time. It calculates your debt-free date, total interest paid, and compares your chosen strategy against minimum-only payments to show exactly how much time and money you save. Unique metrics like daily interest cost and monthly interest drain reveal how much your debt costs in real-time, while the weighted average rate gives you a single number to assess your overall debt health.",
        },
        considerations: {
          title: "Avalanche vs Snowball: Key Differences",
          items: [
            { text: "Avalanche targets the highest interest rate first, minimizing the total interest you pay over the life of all debts.", type: "info" },
            { text: "Snowball pays off the smallest balance first, eliminating debts quickly and building motivation to continue.", type: "info" },
            { text: "In most scenarios, avalanche saves hundreds to thousands more in interest compared to snowball.", type: "info" },
            { text: "Research shows people using snowball are more likely to stick with their plan and actually become debt-free.", type: "info" },
            { text: "For debts with similar interest rates, the savings difference between methods can be just $100–500.", type: "info" },
            { text: "The best method is the one you'll actually follow. Choose avalanche if disciplined, snowball if you need quick wins.", type: "warning" },
          ],
        },
        categories: {
          title: "Common Debt Types & Typical Rates",
          items: [
            { text: "Credit Cards: Typically 15–28% APR. The most expensive common debt — always prioritize paying these off first.", type: "warning" },
            { text: "Personal Loans: Usually 8–15% APR. Fixed payments and terms make them predictable to plan around.", type: "info" },
            { text: "Student Loans: Federal 4–7% APR, Private 5–14% APR. May qualify for income-driven repayment or forgiveness programs.", type: "info" },
            { text: "Auto Loans: Typically 4–10% APR. Secured by the vehicle. Refinancing may lower your rate if credit has improved.", type: "info" },
            { text: "Medical Debt: Often 0% if on a payment plan directly with the provider. Negotiate before putting it on a credit card.", type: "info" },
            { text: "Home Equity / HELOC: Usually 7–12% APR with variable rates that can increase. Secured by your home — be cautious.", type: "warning" },
          ],
        },
        examples: {
          title: "Debt Payoff Calculation Examples",
          description: "Step-by-step examples showing how payoff strategies and timelines are calculated",
          examples: [
            {
              title: "Credit Card Crisis ($11K, 2 cards)",
              steps: [
                "Card A: $8,000 at 22.99% APR, $200 min payment",
                "Card B: $3,000 at 19.49% APR, $75 min payment",
                "Extra payment: $200/month",
                "Avalanche targets Card A first (higher rate)",
                "Card A paid off in ~22 months",
                "Freed-up $200 + $200 extra rolls to Card B",
                "Card B paid off in ~26 months total",
                "Total interest: $3,847 (vs $7,231 minimum-only)",
              ],
              result:
                "Debt-free in 26 months | Interest saved: $3,384 | 38 months faster than minimum payments",
            },
            {
              title: "Mixed Debt ($33K, 3 types)",
              steps: [
                "Credit Card: $5,000 at 21% APR, $125 min",
                "Auto Loan: $18,000 at 6.5% APR, $400 min",
                "Personal Loan: $10,000 at 12% APR, $250 min",
                "Extra payment: $150/month",
                "Avalanche order: CC → Personal → Auto",
                "First win: Credit Card gone in ~15 months",
                "All payments roll forward to next target",
                "Total interest: $4,219 (vs $6,327 minimum-only)",
              ],
              result:
                "Debt-free in 38 months | Interest saved: $2,108 | 14 months faster than minimum payments",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is the debt avalanche method?",
          answer:
            "The debt avalanche method focuses on paying off the debt with the highest interest rate first while making minimum payments on all other debts. Once the highest-rate debt is paid off, you move to the next highest rate. This approach minimizes the total interest you pay over time and is mathematically the most cost-efficient strategy.",
        },
        {
          question: "What is the debt snowball method?",
          answer:
            "The debt snowball method targets the debt with the smallest balance first, regardless of interest rate. As each small debt is eliminated, you roll that payment into the next smallest debt. This approach provides quick psychological wins that keep you motivated. Research shows people using snowball are more likely to complete their payoff plan.",
        },
        {
          question: "How much can I save with extra monthly payments?",
          answer:
            "Even small extra payments make a huge difference. Adding $100/month to a $10,000 credit card at 22% APR can save over $4,000 in interest and pay it off 3+ years faster. The calculator shows your exact savings based on your specific debts and extra payment amount.",
        },
        {
          question: "What is a good debt-to-income ratio?",
          answer:
            "A debt-to-income (DTI) ratio below 36% is generally considered healthy. Between 36–43% is manageable but may limit your ability to get new loans. Above 43% is high risk by most lender standards, and above 50% signals a debt crisis that needs immediate attention. Enter your monthly income in this calculator to see your DTI.",
        },
        {
          question: "Should I pay off debt or invest?",
          answer:
            "A general rule: if your debt interest rate exceeds expected investment returns (historically 7–10% for stocks), pay off the debt first. This means always prioritize credit card debt (15–25% APR) over investing. For low-rate debt like mortgages (3–7%), investing while making minimum payments may build more wealth long-term.",
        },
        {
          question: "How is daily interest cost calculated?",
          answer:
            "Daily interest cost equals each debt's balance multiplied by its annual rate, divided by 365, then summed across all debts. For example, $10,000 at 22% APR accrues $6.03 per day. This metric helps you feel the urgency — every day you delay costs real money.",
        },
        {
          question: "Can I combine avalanche and snowball methods?",
          answer:
            "Yes, a hybrid approach is popular. Some people start with snowball to quickly eliminate 1–2 small debts for motivation, then switch to avalanche for the remaining larger debts. The key is consistency — any structured approach beats making random payments.",
        },
        {
          question: "Does this calculator work for all debt types?",
          answer:
            "Yes, this calculator works for credit cards, personal loans, auto loans, student loans, medical debt, HELOCs, and any other fixed or revolving debt. Enter the current balance, APR, and minimum payment for each debt regardless of type.",
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
      "name": "Calculadora de Pago de Deudas",
      "slug": "calculadora-pago-deudas",
      "subtitle": "Crea tu plan personalizado libre de deudas usando estrategias de bola de nieve, avalancha o pagos mínimos.",
      "seo": {
        "title": "Calculadora de Pago de Deudas - Crea Tu Plan Libre de Deudas",
        "description": "Planifica el pago de tus deudas con estrategias de bola de nieve o avalancha. Ve tu fecha libre de deudas, costo diario de intereses y cómo los pagos extra ahorran miles. Herramienta gratuita en línea.",
        "shortDescription": "Crea un plan de pago de deudas y ve tu fecha libre de deudas.",
        "keywords": [
          "calculadora pago deudas",
          "calculadora bola de nieve deudas",
          "calculadora avalancha deudas",
          "pagar deudas rapido",
          "calculadora libre deudas",
          "pago tarjetas credito",
          "plan pago deudas",
          "calculadora eliminacion deudas"
        ]
      },
      "inputs": {
        "debt1Balance": {
          "label": "Deuda 1 — Saldo",
          "helpText": "Saldo actual que debes en tu primera deuda"
        },
        "debt1Rate": {
          "label": "Deuda 1 — Tasa de Interés (APR)",
          "helpText": "Porcentaje anual de esta deuda"
        },
        "debt1MinPayment": {
          "label": "Deuda 1 — Pago Mínimo",
          "helpText": "Pago mensual mínimo requerido por el prestamista"
        },
        "debt2Balance": {
          "label": "Deuda 2 — Saldo",
          "helpText": "Saldo actual que debes en tu segunda deuda"
        },
        "debt2Rate": {
          "label": "Deuda 2 — Tasa de Interés (APR)",
          "helpText": "Porcentaje anual de esta deuda"
        },
        "debt2MinPayment": {
          "label": "Deuda 2 — Pago Mínimo",
          "helpText": "Pago mensual mínimo requerido por el prestamista"
        },
        "numberOfDebts": {
          "label": "Deudas Adicionales",
          "helpText": "Selecciona cuántas deudas totales quieres incluir",
          "options": {
            "2": "Solo 2 Deudas",
            "3": "3 Deudas",
            "4": "4 Deudas"
          }
        },
        "debt3Balance": {
          "label": "Deuda 3 — Saldo",
          "helpText": "Saldo actual que debes en tu tercera deuda"
        },
        "debt3Rate": {
          "label": "Deuda 3 — Tasa de Interés (APR)",
          "helpText": "Porcentaje anual de esta deuda"
        },
        "debt3MinPayment": {
          "label": "Deuda 3 — Pago Mínimo",
          "helpText": "Pago mensual mínimo requerido por el prestamista"
        },
        "debt4Balance": {
          "label": "Deuda 4 — Saldo",
          "helpText": "Saldo actual que debes en tu cuarta deuda"
        },
        "debt4Rate": {
          "label": "Deuda 4 — Tasa de Interés (APR)",
          "helpText": "Porcentaje anual de esta deuda"
        },
        "debt4MinPayment": {
          "label": "Deuda 4 — Pago Mínimo",
          "helpText": "Pago mensual mínimo requerido por el prestamista"
        },
        "payoffStrategy": {
          "label": "Estrategia de Pago",
          "helpText": "Avalancha ahorra más dinero. Bola de nieve da victorias más rápidas. Mínimo muestra la línea base.",
          "options": {
            "avalanche": "Avalancha (Mayor Tasa Primero)",
            "snowball": "Bola de Nieve (Menor Saldo Primero)",
            "minimum": "Solo Pagos Mínimos"
          }
        },
        "includeExtraPayment": {
          "label": "Pago Mensual Extra",
          "helpText": "Activa para agregar dinero extra cada mes hacia tu deuda objetivo"
        },
        "extraMonthlyPayment": {
          "label": "Cantidad Extra por Mes",
          "helpText": "Esta cantidad extra se aplica a la deuda objetivo además de todos los pagos mínimos"
        },
        "includeIncome": {
          "label": "Incluir Ingreso Mensual",
          "helpText": "Opcional — ingresa tu ingreso para calcular tu proporción deuda-ingreso"
        },
        "monthlyIncome": {
          "label": "Ingreso Mensual Bruto",
          "helpText": "Ingreso mensual total antes de impuestos — usado para calcular proporción deuda-ingreso"
        }
      },
      "results": {
        "debtFreeDate": {
          "label": "FECHA LIBRE DE DEUDAS"
        },
        "totalInterestPaid": {
          "label": "Interés Total"
        },
        "totalAmountPaid": {
          "label": "Cantidad Total Pagada"
        },
        "monthlyInterestDrain": {
          "label": "Drenaje Mensual de Interés"
        },
        "dailyInterestCost": {
          "label": "Costo Diario de Interés"
        },
        "weightedAvgRate": {
          "label": "Tasa Promedio Ponderada"
        },
        "debtToIncomeRatio": {
          "label": "Proporción Deuda-Ingreso"
        },
        "interestSaved": {
          "label": "Interés Ahorrado"
        },
        "timeSaved": {
          "label": "Tiempo Ahorrado"
        },
        "firstDebtEliminated": {
          "label": "Primera Victoria"
        }
      },
      "presets": {
        "creditCardCrisis": {
          "label": "Crisis de Tarjetas de Crédito",
          "description": "$26K deuda, TC al 22.99% + 19.49%"
        },
        "mixedDebt": {
          "label": "Deuda Mixta",
          "description": "$33K entre TC, auto, personal"
        },
        "studentHeavy": {
          "label": "Carga Estudiantil",
          "description": "$54K mayormente préstamos estudiantiles"
        },
        "highBalance": {
          "label": "Saldo Alto",
          "description": "$82K HELOC, TC, auto, personal"
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
        "summary": "Usando el método {strategy}, estarás libre de deudas para {debtFreeDate}. Interés total: {totalInterest}."
      },
      "infoCards": {
        "overview": {
          "title": "Resumen de Deudas",
          "items": [
            {
              "label": "Deuda Total",
              "valueKey": "totalDebt"
            },
            {
              "label": "APR Promedio Ponderado",
              "valueKey": "weightedAvgRate"
            },
            {
              "label": "Deuda-Ingreso",
              "valueKey": "debtToIncomeRatio"
            },
            {
              "label": "Costo Diario de Interés",
              "valueKey": "dailyInterestCost"
            }
          ]
        },
        "plan": {
          "title": "Tu Plan de Pago",
          "items": [
            {
              "label": "Fecha Libre de Deudas",
              "valueKey": "debtFreeDate"
            },
            {
              "label": "Interés Total Pagado",
              "valueKey": "totalInterestPaid"
            },
            {
              "label": "Interés Ahorrado vs Mínimo",
              "valueKey": "interestSaved"
            },
            {
              "label": "Tiempo Ahorrado vs Mínimo",
              "valueKey": "timeSaved"
            },
            {
              "label": "Primera Deuda Eliminada",
              "valueKey": "firstDebtEliminated"
            }
          ]
        },
        "tips": {
          "title": "Consejos Libre de Deudas",
          "items": [
            "Apunta a las tarjetas de crédito primero (15–25% APR) — cuestan 3–5× más que préstamos de auto o estudiantiles en interés.",
            "Agregar solo $100/mes a tu deuda de mayor tasa puede ahorrar miles en interés y años de tu cronograma.",
            "Llama a tu compañía de tarjeta de crédito y pide una tasa menor. Una reducción del 5% en $10K ahorra $500/año en interés.",
            "Congela las tarjetas de crédito y usa efectivo o débito mientras pagas deudas. Los nuevos cargos deshacen tu progreso de pago."
          ]
        }
      },
      "chart": {
        "title": "Saldo de Deuda a Través del Tiempo",
        "xLabel": "Mes",
        "yLabel": "Saldo",
        "series": {
          "totalBalance": "Saldo Restante",
          "cumulativeInterest": "Interés Acumulativo"
        }
      },
      "detailedTable": {
        "payoffSchedule": {
          "button": "Ver Cronograma Completo de Pago",
          "title": "Cronograma de Pago Mes a Mes",
          "columns": {
            "month": "Mes",
            "targetedDebt": "Deuda Objetivo",
            "payment": "Pago",
            "principal": "Capital",
            "interest": "Interés",
            "remaining": "Total Restante"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué Es un Plan de Pago de Deudas?",
          "content": "Un plan de pago de deudas es un enfoque estratégico para eliminar tus deudas organizando los pagos en un orden específico. En lugar de hacer pagos aleatorios en múltiples cuentas, un plan de pago prioriza ciertas deudas para minimizar el interés total pagado o crear impulso psicológico a través de victorias rápidas. Las dos estrategias más populares son el método de avalancha de deudas, que apunta a la tasa de interés más alta primero, y el método de bola de nieve de deudas, que aborda el saldo más pequeño primero. Ambos enfoques mantienen pagos mínimos en todas las deudas mientras dirigen fondos extra hacia una sola deuda objetivo. Cuando esa deuda se elimina, el pago liberado se transfiere a la siguiente deuda en línea, creando un efecto de pago acelerado. Los estudios muestran que las personas que siguen un plan estructurado de pago tienen significativamente más probabilidades de quedar libres de deudas comparado con quienes pagan aleatoriamente."
        },
        "howItWorks": {
          "title": "Cómo Funciona Esta Calculadora",
          "content": "Ingresa cada una de tus deudas con su saldo actual, tasa de interés anual (APR) y pago mensual mínimo. Elige tu estrategia preferida — avalancha o bola de nieve — y opcionalmente agrega una cantidad de pago mensual extra. La calculadora simula todo tu viaje de pago mes a mes, rastreando cómo cada deuda se reduce con el tiempo. Calcula tu fecha libre de deudas, interés total pagado y compara tu estrategia elegida contra pagos solo mínimos para mostrar exactamente cuánto tiempo y dinero ahorras. Métricas únicas como costo diario de interés y drenaje mensual de interés revelan cuánto cuesta tu deuda en tiempo real, mientras que la tasa promedio ponderada te da un solo número para evaluar tu salud general de deudas."
        },
        "considerations": {
          "title": "Avalancha vs Bola de Nieve: Diferencias Clave",
          "items": [
            {
              "text": "Avalancha apunta a la tasa de interés más alta primero, minimizando el interés total que pagas durante la vida de todas las deudas.",
              "type": "info"
            },
            {
              "text": "Bola de nieve paga el saldo más pequeño primero, eliminando deudas rápidamente y creando motivación para continuar.",
              "type": "info"
            },
            {
              "text": "En la mayoría de escenarios, avalancha ahorra cientos a miles más en interés comparado con bola de nieve.",
              "type": "info"
            },
            {
              "text": "La investigación muestra que las personas usando bola de nieve tienen más probabilidades de mantener su plan y realmente quedar libres de deudas.",
              "type": "info"
            },
            {
              "text": "Para deudas con tasas de interés similares, la diferencia de ahorro entre métodos puede ser solo $100–500.",
              "type": "info"
            },
            {
              "text": "El mejor método es el que realmente seguirás. Elige avalancha si eres disciplinado, bola de nieve si necesitas victorias rápidas.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Tipos Comunes de Deuda y Tasas Típicas",
          "items": [
            {
              "text": "Tarjetas de Crédito: Típicamente 15–28% APR. La deuda común más cara — siempre prioriza pagar estas primero.",
              "type": "warning"
            },
            {
              "text": "Préstamos Personales: Usualmente 8–15% APR. Pagos fijos y términos los hacen predecibles para planificar.",
              "type": "info"
            },
            {
              "text": "Préstamos Estudiantiles: Federal 4–7% APR, Privado 5–14% APR. Pueden calificar para pagos basados en ingresos o programas de perdón.",
              "type": "info"
            },
            {
              "text": "Préstamos de Auto: Típicamente 4–10% APR. Garantizados por el vehículo. Refinanciar puede bajar tu tasa si el crédito ha mejorado.",
              "type": "info"
            },
            {
              "text": "Deuda Médica: A menudo 0% si está en un plan de pago directo con el proveedor. Negocia antes de ponerlo en una tarjeta de crédito.",
              "type": "info"
            },
            {
              "text": "Patrimonio del Hogar / HELOC: Usualmente 7–12% APR con tasas variables que pueden aumentar. Garantizado por tu casa — ten cuidado.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo de Pago de Deudas",
          "description": "Ejemplos paso a paso mostrando cómo se calculan las estrategias y cronogramas de pago",
          "examples": [
            {
              "title": "Crisis de Tarjetas de Crédito ($11K, 2 tarjetas)",
              "steps": [
                "Tarjeta A: $8,000 al 22.99% APR, $200 pago mín",
                "Tarjeta B: $3,000 al 19.49% APR, $75 pago mín",
                "Pago extra: $200/mes",
                "Avalancha apunta a Tarjeta A primero (tasa mayor)",
                "Tarjeta A pagada en ~22 meses",
                "$200 liberados + $200 extra van a Tarjeta B",
                "Tarjeta B pagada en ~26 meses total",
                "Interés total: $3,847 (vs $7,231 solo mínimo)"
              ],
              "result": "Libre de deudas en 26 meses | Interés ahorrado: $3,384 | 38 meses más rápido que pagos mínimos"
            },
            {
              "title": "Deuda Mixta ($33K, 3 tipos)",
              "steps": [
                "Tarjeta de Crédito: $5,000 al 21% APR, $125 mín",
                "Préstamo Auto: $18,000 al 6.5% APR, $400 mín",
                "Préstamo Personal: $10,000 al 12% APR, $250 mín",
                "Pago extra: $150/mes",
                "Orden avalancha: TC → Personal → Auto",
                "Primera victoria: Tarjeta de Crédito eliminada en ~15 meses",
                "Todos los pagos se transfieren al siguiente objetivo",
                "Interés total: $4,219 (vs $6,327 solo mínimo)"
              ],
              "result": "Libre de deudas en 38 meses | Interés ahorrado: $2,108 | 14 meses más rápido que pagos mínimos"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué es el método de avalancha de deudas?",
          "answer": "El método de avalancha de deudas se enfoca en pagar primero la deuda con la tasa de interés más alta mientras hace pagos mínimos en todas las otras deudas. Una vez que la deuda de mayor tasa se paga, te mueves a la siguiente tasa más alta. Este enfoque minimiza el interés total que pagas con el tiempo y es matemáticamente la estrategia más eficiente en costos."
        },
        {
          "question": "¿Qué es el método de bola de nieve de deudas?",
          "answer": "El método de bola de nieve de deudas apunta a la deuda con el saldo más pequeño primero, sin importar la tasa de interés. Mientras cada deuda pequeña se elimina, transfieres ese pago a la siguiente deuda más pequeña. Este enfoque proporciona victorias psicológicas rápidas que te mantienen motivado. La investigación muestra que las personas usando bola de nieve tienen más probabilidades de completar su plan de pago."
        },
        {
          "question": "¿Cuánto puedo ahorrar con pagos mensuales extra?",
          "answer": "Incluso pagos extra pequeños hacen una gran diferencia. Agregar $100/mes a una tarjeta de crédito de $10,000 al 22% APR puede ahorrar más de $4,000 en interés y pagarla 3+ años más rápido. La calculadora muestra tus ahorros exactos basados en tus deudas específicas y cantidad de pago extra."
        },
        {
          "question": "¿Qué es una buena proporción deuda-ingreso?",
          "answer": "Una proporción deuda-ingreso (DTI) por debajo del 36% generalmente se considera saludable. Entre 36–43% es manejable pero puede limitar tu capacidad de obtener nuevos préstamos. Por encima del 43% es alto riesgo según los estándares de la mayoría de prestamistas, y por encima del 50% señala una crisis de deuda que necesita atención inmediata. Ingresa tu ingreso mensual en esta calculadora para ver tu DTI."
        },
        {
          "question": "¿Debo pagar deudas o invertir?",
          "answer": "Una regla general: si tu tasa de interés de deuda excede los retornos de inversión esperados (históricamente 7–10% para acciones), paga la deuda primero. Esto significa siempre priorizar deuda de tarjeta de crédito (15–25% APR) sobre invertir. Para deuda de tasa baja como hipotecas (3–7%), invertir mientras haces pagos mínimos puede crear más riqueza a largo plazo."
        },
        {
          "question": "¿Cómo se calcula el costo diario de interés?",
          "answer": "El costo diario de interés iguala el saldo de cada deuda multiplicado por su tasa anual, dividido por 365, luego sumado en todas las deudas. Por ejemplo, $10,000 al 22% APR acumula $6.03 por día. Esta métrica te ayuda a sentir la urgencia — cada día que retrases cuesta dinero real."
        },
        {
          "question": "¿Puedo combinar los métodos avalancha y bola de nieve?",
          "answer": "Sí, un enfoque híbrido es popular. Algunas personas comienzan con bola de nieve para eliminar rápidamente 1–2 deudas pequeñas para motivación, luego cambian a avalancha para las deudas grandes restantes. La clave es consistencia — cualquier enfoque estructurado vence hacer pagos aleatorios."
        },
        {
          "question": "¿Funciona esta calculadora para todos los tipos de deuda?",
          "answer": "Sí, esta calculadora funciona para tarjetas de crédito, préstamos personales, préstamos de auto, préstamos estudiantiles, deuda médica, HELOCs, y cualquier otra deuda fija o revolvente. Ingresa el saldo actual, APR y pago mínimo para cada deuda sin importar el tipo."
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
      "name": "Calculadora de Quitação de Dívidas",
      "slug": "calculadora-quitacao-dividas",
      "subtitle": "Crie seu plano personalizado para ficar livre de dívidas usando estratégias bola de neve, avalanche ou pagamentos mínimos.",
      "seo": {
        "title": "Calculadora de Quitação de Dívidas - Crie Seu Plano Livre de Dívidas",
        "description": "Planeje a quitação de suas dívidas com estratégias bola de neve ou avalanche. Veja sua data livre de dívidas, custo diário de juros e como pagamentos extras economizam milhares. Ferramenta online gratuita.",
        "shortDescription": "Crie um plano de quitação de dívidas e veja sua data livre de dívidas.",
        "keywords": [
          "calculadora quitação dívidas",
          "calculadora bola de neve dívidas",
          "calculadora avalanche dívidas",
          "quitar dívidas rápido",
          "calculadora livre de dívidas",
          "quitação cartão de crédito",
          "plano pagamento dívidas",
          "calculadora eliminação dívidas"
        ]
      },
      "inputs": {
        "debt1Balance": {
          "label": "Dívida 1 — Saldo",
          "helpText": "Saldo atual devido na sua primeira dívida"
        },
        "debt1Rate": {
          "label": "Dívida 1 — Taxa de Juros (TAA)",
          "helpText": "Taxa anual de juros desta dívida"
        },
        "debt1MinPayment": {
          "label": "Dívida 1 — Pagamento Mínimo",
          "helpText": "Pagamento mensal mínimo exigido pelo credor"
        },
        "debt2Balance": {
          "label": "Dívida 2 — Saldo",
          "helpText": "Saldo atual devido na sua segunda dívida"
        },
        "debt2Rate": {
          "label": "Dívida 2 — Taxa de Juros (TAA)",
          "helpText": "Taxa anual de juros desta dívida"
        },
        "debt2MinPayment": {
          "label": "Dívida 2 — Pagamento Mínimo",
          "helpText": "Pagamento mensal mínimo exigido pelo credor"
        },
        "numberOfDebts": {
          "label": "Dívidas Adicionais",
          "helpText": "Selecione quantas dívidas totais você quer incluir",
          "options": {
            "2": "Apenas 2 Dívidas",
            "3": "3 Dívidas",
            "4": "4 Dívidas"
          }
        },
        "debt3Balance": {
          "label": "Dívida 3 — Saldo",
          "helpText": "Saldo atual devido na sua terceira dívida"
        },
        "debt3Rate": {
          "label": "Dívida 3 — Taxa de Juros (TAA)",
          "helpText": "Taxa anual de juros desta dívida"
        },
        "debt3MinPayment": {
          "label": "Dívida 3 — Pagamento Mínimo",
          "helpText": "Pagamento mensal mínimo exigido pelo credor"
        },
        "debt4Balance": {
          "label": "Dívida 4 — Saldo",
          "helpText": "Saldo atual devido na sua quarta dívida"
        },
        "debt4Rate": {
          "label": "Dívida 4 — Taxa de Juros (TAA)",
          "helpText": "Taxa anual de juros desta dívida"
        },
        "debt4MinPayment": {
          "label": "Dívida 4 — Pagamento Mínimo",
          "helpText": "Pagamento mensal mínimo exigido pelo credor"
        },
        "payoffStrategy": {
          "label": "Estratégia de Quitação",
          "helpText": "Avalanche economiza mais dinheiro. Bola de neve gera vitórias mais rápidas. Mínimo mostra a linha de base.",
          "options": {
            "avalanche": "Avalanche (Maior Taxa Primeiro)",
            "snowball": "Bola de Neve (Menor Saldo Primeiro)",
            "minimum": "Apenas Pagamentos Mínimos"
          }
        },
        "includeExtraPayment": {
          "label": "Pagamento Extra Mensal",
          "helpText": "Ative para adicionar dinheiro extra a cada mês para sua dívida alvo"
        },
        "extraMonthlyPayment": {
          "label": "Valor Extra Por Mês",
          "helpText": "Este valor extra é aplicado à dívida alvo além de todos os pagamentos mínimos"
        },
        "includeIncome": {
          "label": "Incluir Renda Mensal",
          "helpText": "Opcional — insira sua renda para calcular sua relação dívida-renda"
        },
        "monthlyIncome": {
          "label": "Renda Mensal Bruta",
          "helpText": "Renda mensal total antes dos impostos — usada para calcular a relação dívida-renda"
        }
      },
      "results": {
        "debtFreeDate": {
          "label": "DATA LIVRE DE DÍVIDAS"
        },
        "totalInterestPaid": {
          "label": "Total de Juros"
        },
        "totalAmountPaid": {
          "label": "Valor Total Pago"
        },
        "monthlyInterestDrain": {
          "label": "Dreno de Juros Mensais"
        },
        "dailyInterestCost": {
          "label": "Custo Diário de Juros"
        },
        "weightedAvgRate": {
          "label": "Taxa Média Ponderada"
        },
        "debtToIncomeRatio": {
          "label": "Relação Dívida-Renda"
        },
        "interestSaved": {
          "label": "Juros Economizados"
        },
        "timeSaved": {
          "label": "Tempo Economizado"
        },
        "firstDebtEliminated": {
          "label": "Primeira Vitória"
        }
      },
      "presets": {
        "creditCardCrisis": {
          "label": "Crise de Cartão de Crédito",
          "description": "R$ 130k de dívida, cartões a 22,99% + 19,49%"
        },
        "mixedDebt": {
          "label": "Dívida Mista",
          "description": "R$ 165k entre cartão, auto, pessoal"
        },
        "studentHeavy": {
          "label": "Estudantil Pesada",
          "description": "R$ 270k principalmente empréstimos estudantis"
        },
        "highBalance": {
          "label": "Saldo Alto",
          "description": "R$ 410k crédito consignado, cartão, auto, pessoal"
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
        "summary": "Usando o método {strategy}, você estará livre de dívidas em {debtFreeDate}. Total de juros: {totalInterest}."
      },
      "infoCards": {
        "overview": {
          "title": "Visão Geral das Dívidas",
          "items": [
            {
              "label": "Dívida Total",
              "valueKey": "totalDebt"
            },
            {
              "label": "TAA Média Ponderada",
              "valueKey": "weightedAvgRate"
            },
            {
              "label": "Dívida-Renda",
              "valueKey": "debtToIncomeRatio"
            },
            {
              "label": "Custo Diário de Juros",
              "valueKey": "dailyInterestCost"
            }
          ]
        },
        "plan": {
          "title": "Seu Plano de Quitação",
          "items": [
            {
              "label": "Data Livre de Dívidas",
              "valueKey": "debtFreeDate"
            },
            {
              "label": "Total de Juros Pagos",
              "valueKey": "totalInterestPaid"
            },
            {
              "label": "Juros Economizados vs Mínimo",
              "valueKey": "interestSaved"
            },
            {
              "label": "Tempo Economizado vs Mínimo",
              "valueKey": "timeSaved"
            },
            {
              "label": "Primeira Dívida Eliminada",
              "valueKey": "firstDebtEliminated"
            }
          ]
        },
        "tips": {
          "title": "Dicas para Ficar Livre de Dívidas",
          "items": [
            "Foque primeiro nos cartões de crédito (15–25% ao ano) — eles custam 3–5× mais que financiamentos de auto ou estudantis em juros.",
            "Adicionar apenas R$ 500/mês à sua dívida com maior taxa pode economizar milhares em juros e anos da sua timeline.",
            "Ligue para sua operadora de cartão e peça uma taxa menor. Uma redução de 5% em R$ 50k economiza R$ 2.500/ano em juros.",
            "Congele cartões de crédito e use dinheiro ou débito enquanto quita dívidas. Novas compras desfazem seu progresso de quitação."
          ]
        }
      },
      "chart": {
        "title": "Saldo da Dívida ao Longo do Tempo",
        "xLabel": "Mês",
        "yLabel": "Saldo",
        "series": {
          "totalBalance": "Saldo Restante",
          "cumulativeInterest": "Juros Cumulativos"
        }
      },
      "detailedTable": {
        "payoffSchedule": {
          "button": "Ver Cronograma Completo de Quitação",
          "title": "Cronograma de Quitação Mês a Mês",
          "columns": {
            "month": "Mês",
            "targetedDebt": "Dívida Alvo",
            "payment": "Pagamento",
            "principal": "Principal",
            "interest": "Juros",
            "remaining": "Total Restante"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O Que É um Plano de Quitação de Dívidas?",
          "content": "Um plano de quitação de dívidas é uma abordagem estratégica para eliminar suas dívidas organizando os pagamentos em uma ordem específica. Em vez de fazer pagamentos aleatórios em várias contas, um plano de quitação prioriza certas dívidas para minimizar o total de juros pagos ou construir impulso psicológico através de vitórias rápidas. As duas estratégias mais populares são o método avalanche, que foca na maior taxa de juros primeiro, e o método bola de neve, que ataca o menor saldo primeiro. Ambas as abordagens mantêm você fazendo pagamentos mínimos em todas as dívidas enquanto direciona fundos extras para uma única dívida alvo. Quando essa dívida é eliminada, o pagamento liberado passa para a próxima dívida na fila, criando um efeito de pagamento acelerado. Estudos mostram que pessoas que seguem um plano estruturado de quitação têm significativamente mais chances de ficarem livres de dívidas comparadas àquelas que pagam aleatoriamente."
        },
        "howItWorks": {
          "title": "Como Esta Calculadora Funciona",
          "content": "Insira cada uma de suas dívidas com seu saldo atual, taxa de juros anual e pagamento mensal mínimo. Escolha sua estratégia preferida — avalanche ou bola de neve — e opcionalmente adicione um valor de pagamento extra mensal. A calculadora simula toda sua jornada de quitação mês a mês, rastreando como cada dívida diminui ao longo do tempo. Ela calcula sua data livre de dívidas, total de juros pagos e compara sua estratégia escolhida contra pagamentos apenas mínimos para mostrar exatamente quanto tempo e dinheiro você economiza. Métricas únicas como custo diário de juros e dreno mensal de juros revelam quanto sua dívida custa em tempo real, enquanto a taxa média ponderada te dá um único número para avaliar a saúde geral de suas dívidas."
        },
        "considerations": {
          "title": "Avalanche vs Bola de Neve: Principais Diferenças",
          "items": [
            {
              "text": "Avalanche foca na maior taxa de juros primeiro, minimizando o total de juros que você paga ao longo da vida de todas as dívidas.",
              "type": "info"
            },
            {
              "text": "Bola de neve quita o menor saldo primeiro, eliminando dívidas rapidamente e construindo motivação para continuar.",
              "type": "info"
            },
            {
              "text": "Na maioria dos cenários, avalanche economiza centenas a milhares a mais em juros comparado à bola de neve.",
              "type": "info"
            },
            {
              "text": "Pesquisas mostram que pessoas usando bola de neve têm mais chances de seguir com seu plano e realmente ficarem livres de dívidas.",
              "type": "info"
            },
            {
              "text": "Para dívidas com taxas de juros similares, a diferença de economia entre métodos pode ser apenas R$ 500–2.500.",
              "type": "info"
            },
            {
              "text": "O melhor método é aquele que você realmente seguirá. Escolha avalanche se disciplinado, bola de neve se precisa de vitórias rápidas.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Tipos Comuns de Dívida e Taxas Típicas",
          "items": [
            {
              "text": "Cartões de Crédito: Tipicamente 15–28% ao ano. A dívida comum mais cara — sempre priorize quitá-los primeiro.",
              "type": "warning"
            },
            {
              "text": "Empréstimos Pessoais: Geralmente 8–15% ao ano. Pagamentos fixos e prazos os tornam previsíveis para planejamento.",
              "type": "info"
            },
            {
              "text": "Empréstimos Estudantis: Federal 4–7% ao ano, Privado 5–14% ao ano. Podem qualificar para pagamento baseado em renda ou programas de perdão.",
              "type": "info"
            },
            {
              "text": "Financiamentos de Auto: Tipicamente 4–10% ao ano. Garantidos pelo veículo. Refinanciamento pode reduzir sua taxa se o score melhorou.",
              "type": "info"
            },
            {
              "text": "Dívida Médica: Frequentemente 0% se em plano de pagamento direto com o provedor. Negocie antes de colocar no cartão de crédito.",
              "type": "info"
            },
            {
              "text": "Crédito Consignado / LCI: Geralmente 7–12% ao ano com taxas variáveis que podem aumentar. Garantidos pela sua casa — seja cauteloso.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de Quitação de Dívidas",
          "description": "Exemplos passo a passo mostrando como estratégias de quitação e cronogramas são calculados",
          "examples": [
            {
              "title": "Crise de Cartão de Crédito (R$ 55k, 2 cartões)",
              "steps": [
                "Cartão A: R$ 40.000 a 22,99% ao ano, R$ 1.000 pagamento mín",
                "Cartão B: R$ 15.000 a 19,49% ao ano, R$ 375 pagamento mín",
                "Pagamento extra: R$ 1.000/mês",
                "Avalanche foca no Cartão A primeiro (maior taxa)",
                "Cartão A quitado em ~22 meses",
                "R$ 1.000 liberado + R$ 1.000 extra vai para Cartão B",
                "Cartão B quitado em ~26 meses total",
                "Total de juros: R$ 19.235 (vs R$ 36.155 apenas mínimo)"
              ],
              "result": "Livre de dívidas em 26 meses | Juros economizados: R$ 16.920 | 38 meses mais rápido que pagamentos mínimos"
            },
            {
              "title": "Dívida Mista (R$ 165k, 3 tipos)",
              "steps": [
                "Cartão de Crédito: R$ 25.000 a 21% ao ano, R$ 625 mín",
                "Financiamento Auto: R$ 90.000 a 6,5% ao ano, R$ 2.000 mín",
                "Empréstimo Pessoal: R$ 50.000 a 12% ao ano, R$ 1.250 mín",
                "Pagamento extra: R$ 750/mês",
                "Ordem avalanche: CC → Pessoal → Auto",
                "Primeira vitória: Cartão quitado em ~15 meses",
                "Todos os pagamentos passam para próximo alvo",
                "Total de juros: R$ 21.095 (vs R$ 31.635 apenas mínimo)"
              ],
              "result": "Livre de dívidas em 38 meses | Juros economizados: R$ 10.540 | 14 meses mais rápido que pagamentos mínimos"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "O que é o método avalanche de dívidas?",
          "answer": "O método avalanche foca em quitar a dívida com a maior taxa de juros primeiro enquanto faz pagamentos mínimos em todas as outras dívidas. Uma vez que a dívida com maior taxa é quitada, você passa para a próxima maior taxa. Esta abordagem minimiza o total de juros que você paga ao longo do tempo e é matematicamente a estratégia mais eficiente em custos."
        },
        {
          "question": "O que é o método bola de neve de dívidas?",
          "answer": "O método bola de neve foca na dívida com o menor saldo primeiro, independentemente da taxa de juros. Conforme cada pequena dívida é eliminada, você transfere esse pagamento para a próxima menor dívida. Esta abordagem proporciona vitórias psicológicas rápidas que mantêm você motivado. Pesquisas mostram que pessoas usando bola de neve têm mais chances de completar seu plano de quitação."
        },
        {
          "question": "Quanto posso economizar com pagamentos extras mensais?",
          "answer": "Mesmo pequenos pagamentos extras fazem uma diferença enorme. Adicionar R$ 500/mês a um cartão de crédito de R$ 50.000 a 22% ao ano pode economizar mais de R$ 20.000 em juros e quitá-lo 3+ anos mais cedo. A calculadora mostra suas economias exatas baseadas em suas dívidas específicas e valor de pagamento extra."
        },
        {
          "question": "Qual é uma boa relação dívida-renda?",
          "answer": "Uma relação dívida-renda abaixo de 36% é geralmente considerada saudável. Entre 36–43% é administrável mas pode limitar sua capacidade de conseguir novos empréstimos. Acima de 43% é alto risco pelos padrões da maioria dos credores, e acima de 50% sinaliza uma crise de dívidas que precisa de atenção imediata. Insira sua renda mensal nesta calculadora para ver sua relação."
        },
        {
          "question": "Devo quitar dívidas ou investir?",
          "answer": "Uma regra geral: se a taxa de juros da sua dívida excede os retornos esperados de investimento (historicamente 7–10% para ações), quite a dívida primeiro. Isso significa sempre priorizar dívidas de cartão de crédito (15–25% ao ano) sobre investimentos. Para dívidas de baixa taxa como financiamentos imobiliários (3–7%), investir enquanto faz pagamentos mínimos pode construir mais riqueza a longo prazo."
        },
        {
          "question": "Como é calculado o custo diário de juros?",
          "answer": "O custo diário de juros é igual ao saldo de cada dívida multiplicado por sua taxa anual, dividido por 365, depois somado em todas as dívidas. Por exemplo, R$ 50.000 a 22% ao ano acumula R$ 30,14 por dia. Esta métrica ajuda você a sentir a urgência — cada dia de atraso custa dinheiro real."
        },
        {
          "question": "Posso combinar os métodos avalanche e bola de neve?",
          "answer": "Sim, uma abordagem híbrida é popular. Algumas pessoas começam com bola de neve para rapidamente eliminar 1–2 dívidas pequenas por motivação, depois mudam para avalanche para as dívidas maiores restantes. O importante é consistência — qualquer abordagem estruturada é melhor que fazer pagamentos aleatórios."
        },
        {
          "question": "Esta calculadora funciona para todos os tipos de dívida?",
          "answer": "Sim, esta calculadora funciona para cartões de crédito, empréstimos pessoais, financiamentos de auto, empréstimos estudantis, dívidas médicas, crédito consignado e qualquer outra dívida fixa ou rotativa. Insira o saldo atual, taxa de juros e pagamento mínimo para cada dívida independentemente do tipo."
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
      "name": "Calculateur de Remboursement de Dettes",
      "slug": "calculateur-remboursement-dettes",
      "subtitle": "Créez votre plan personnalisé pour vous libérer de vos dettes en utilisant les stratégies boule de neige, avalanche ou paiements minimums.",
      "seo": {
        "title": "Calculateur de Remboursement de Dettes - Créez Votre Plan de Liberté Financière",
        "description": "Planifiez le remboursement de vos dettes avec les stratégies boule de neige ou avalanche. Voyez votre date de liberté financière, le coût quotidien des intérêts et comment les paiements supplémentaires économisent des milliers. Outil gratuit en ligne.",
        "shortDescription": "Créez un plan de remboursement de dettes et voyez votre date de liberté financière.",
        "keywords": [
          "calculateur remboursement dettes",
          "calculateur boule de neige dettes",
          "calculateur avalanche dettes",
          "rembourser dettes rapidement",
          "calculateur liberté financière",
          "remboursement carte crédit",
          "plan remboursement dettes",
          "calculateur élimination dettes"
        ]
      },
      "inputs": {
        "debt1Balance": {
          "label": "Dette 1 — Solde",
          "helpText": "Solde actuel dû sur votre première dette"
        },
        "debt1Rate": {
          "label": "Dette 1 — Taux d'Intérêt (TAE)",
          "helpText": "Taux annuel effectif sur cette dette"
        },
        "debt1MinPayment": {
          "label": "Dette 1 — Paiement Minimum",
          "helpText": "Paiement mensuel minimum requis par le prêteur"
        },
        "debt2Balance": {
          "label": "Dette 2 — Solde",
          "helpText": "Solde actuel dû sur votre deuxième dette"
        },
        "debt2Rate": {
          "label": "Dette 2 — Taux d'Intérêt (TAE)",
          "helpText": "Taux annuel effectif sur cette dette"
        },
        "debt2MinPayment": {
          "label": "Dette 2 — Paiement Minimum",
          "helpText": "Paiement mensuel minimum requis par le prêteur"
        },
        "numberOfDebts": {
          "label": "Dettes Supplémentaires",
          "helpText": "Sélectionnez combien de dettes au total vous voulez inclure",
          "options": {
            "2": "2 Dettes Seulement",
            "3": "3 Dettes",
            "4": "4 Dettes"
          }
        },
        "debt3Balance": {
          "label": "Dette 3 — Solde",
          "helpText": "Solde actuel dû sur votre troisième dette"
        },
        "debt3Rate": {
          "label": "Dette 3 — Taux d'Intérêt (TAE)",
          "helpText": "Taux annuel effectif sur cette dette"
        },
        "debt3MinPayment": {
          "label": "Dette 3 — Paiement Minimum",
          "helpText": "Paiement mensuel minimum requis par le prêteur"
        },
        "debt4Balance": {
          "label": "Dette 4 — Solde",
          "helpText": "Solde actuel dû sur votre quatrième dette"
        },
        "debt4Rate": {
          "label": "Dette 4 — Taux d'Intérêt (TAE)",
          "helpText": "Taux annuel effectif sur cette dette"
        },
        "debt4MinPayment": {
          "label": "Dette 4 — Paiement Minimum",
          "helpText": "Paiement mensuel minimum requis par le prêteur"
        },
        "payoffStrategy": {
          "label": "Stratégie de Remboursement",
          "helpText": "L'avalanche économise le plus d'argent. La boule de neige donne des victoires plus rapides. Le minimum montre la base de référence.",
          "options": {
            "avalanche": "Avalanche (Taux le Plus Élevé en Premier)",
            "snowball": "Boule de Neige (Plus Petit Solde en Premier)",
            "minimum": "Paiements Minimums Seulement"
          }
        },
        "includeExtraPayment": {
          "label": "Paiement Mensuel Supplémentaire",
          "helpText": "Activez pour ajouter de l'argent supplémentaire chaque mois vers votre dette ciblée"
        },
        "extraMonthlyPayment": {
          "label": "Montant Supplémentaire Par Mois",
          "helpText": "Ce montant supplémentaire est appliqué à la dette ciblée en plus de tous les paiements minimums"
        },
        "includeIncome": {
          "label": "Inclure Revenu Mensuel",
          "helpText": "Optionnel — entrez votre revenu pour calculer votre ratio dette-revenu"
        },
        "monthlyIncome": {
          "label": "Revenu Mensuel Brut",
          "helpText": "Revenu mensuel total avant impôts — utilisé pour calculer le ratio dette-revenu"
        }
      },
      "results": {
        "debtFreeDate": {
          "label": "DATE DE LIBERTÉ FINANCIÈRE"
        },
        "totalInterestPaid": {
          "label": "Intérêts Totaux"
        },
        "totalAmountPaid": {
          "label": "Montant Total Payé"
        },
        "monthlyInterestDrain": {
          "label": "Saignée Mensuelle d'Intérêts"
        },
        "dailyInterestCost": {
          "label": "Coût Quotidien des Intérêts"
        },
        "weightedAvgRate": {
          "label": "Taux Moyen Pondéré"
        },
        "debtToIncomeRatio": {
          "label": "Ratio Dette-Revenu"
        },
        "interestSaved": {
          "label": "Intérêts Économisés"
        },
        "timeSaved": {
          "label": "Temps Économisé"
        },
        "firstDebtEliminated": {
          "label": "Première Victoire"
        }
      },
      "presets": {
        "creditCardCrisis": {
          "label": "Crise Cartes de Crédit",
          "description": "26K€ de dettes, CC à 22,99% + 19,49%"
        },
        "mixedDebt": {
          "label": "Dettes Mixtes",
          "description": "33K€ répartis entre CC, auto, personnel"
        },
        "studentHeavy": {
          "label": "Étudiant Lourd",
          "description": "54K€ principalement prêts étudiants"
        },
        "highBalance": {
          "label": "Solde Élevé",
          "description": "82K€ HELOC, CC, auto, personnel"
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
        "summary": "En utilisant la méthode {strategy}, vous serez libre de dettes d'ici {debtFreeDate}. Intérêts totaux : {totalInterest}."
      },
      "infoCards": {
        "overview": {
          "title": "Aperçu des Dettes",
          "items": [
            {
              "label": "Dette Totale",
              "valueKey": "totalDebt"
            },
            {
              "label": "TAE Moyen Pondéré",
              "valueKey": "weightedAvgRate"
            },
            {
              "label": "Dette-Revenu",
              "valueKey": "debtToIncomeRatio"
            },
            {
              "label": "Coût Quotidien des Intérêts",
              "valueKey": "dailyInterestCost"
            }
          ]
        },
        "plan": {
          "title": "Votre Plan de Remboursement",
          "items": [
            {
              "label": "Date de Liberté Financière",
              "valueKey": "debtFreeDate"
            },
            {
              "label": "Intérêts Totaux Payés",
              "valueKey": "totalInterestPaid"
            },
            {
              "label": "Intérêts Économisés vs Minimum",
              "valueKey": "interestSaved"
            },
            {
              "label": "Temps Économisé vs Minimum",
              "valueKey": "timeSaved"
            },
            {
              "label": "Première Dette Éliminée",
              "valueKey": "firstDebtEliminated"
            }
          ]
        },
        "tips": {
          "title": "Conseils pour se Libérer des Dettes",
          "items": [
            "Ciblez d'abord les cartes de crédit (15-25% TAE) — elles coûtent 3-5× plus en intérêts que les prêts auto ou étudiants.",
            "Ajouter seulement 100€/mois à votre dette au taux le plus élevé peut économiser des milliers en intérêts et des années sur votre échéancier.",
            "Appelez votre compagnie de carte de crédit et demandez un taux plus bas. Une réduction de 5% sur 10K€ économise 500€/an en intérêts.",
            "Gelez les cartes de crédit et utilisez de l'argent liquide ou une carte de débit pendant le remboursement. Les nouveaux frais annulent vos progrès."
          ]
        }
      },
      "chart": {
        "title": "Évolution du Solde des Dettes",
        "xLabel": "Mois",
        "yLabel": "Solde",
        "series": {
          "totalBalance": "Solde Restant",
          "cumulativeInterest": "Intérêts Cumulés"
        }
      },
      "detailedTable": {
        "payoffSchedule": {
          "button": "Voir l'Échéancier Complet de Remboursement",
          "title": "Échéancier de Remboursement Mois par Mois",
          "columns": {
            "month": "Mois",
            "targetedDebt": "Dette Ciblée",
            "payment": "Paiement",
            "principal": "Capital",
            "interest": "Intérêts",
            "remaining": "Total Restant"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Plan de Remboursement de Dettes ?",
          "content": "Un plan de remboursement de dettes est une approche stratégique pour éliminer vos dettes en organisant les paiements dans un ordre spécifique. Plutôt que de faire des paiements aléatoires sur plusieurs comptes, un plan de remboursement priorise certaines dettes pour soit minimiser les intérêts totaux payés, soit créer un élan psychologique grâce à des victoires rapides. Les deux stratégies les plus populaires sont la méthode avalanche, qui cible le taux d'intérêt le plus élevé en premier, et la méthode boule de neige, qui s'attaque au plus petit solde en premier. Les deux approches maintiennent les paiements minimums sur toutes les dettes tout en dirigeant les fonds supplémentaires vers une seule dette ciblée. Quand cette dette est éliminée, le paiement libéré se reporte sur la dette suivante, créant un effet d'accélération des paiements. Les études montrent que les personnes qui suivent un plan de remboursement structuré sont significativement plus susceptibles de devenir libres de dettes comparé à celles qui paient au hasard."
        },
        "howItWorks": {
          "title": "Comment Fonctionne ce Calculateur",
          "content": "Entrez chacune de vos dettes avec son solde actuel, son taux d'intérêt annuel (TAE) et son paiement mensuel minimum. Choisissez votre stratégie préférée — avalanche ou boule de neige — et ajoutez optionnellement un montant de paiement mensuel supplémentaire. Le calculateur simule tout votre parcours de remboursement mois par mois, suivant comment chaque dette diminue au fil du temps. Il calcule votre date de liberté financière, les intérêts totaux payés, et compare votre stratégie choisie contre les paiements minimums seulement pour montrer exactement combien de temps et d'argent vous économisez. Des métriques uniques comme le coût quotidien des intérêts et la saignée mensuelle d'intérêts révèlent combien votre dette coûte en temps réel, tandis que le taux moyen pondéré vous donne un chiffre unique pour évaluer votre santé financière globale."
        },
        "considerations": {
          "title": "Avalanche vs Boule de Neige : Différences Clés",
          "items": [
            {
              "text": "L'avalanche cible le taux d'intérêt le plus élevé en premier, minimisant les intérêts totaux que vous payez sur la durée de vie de toutes les dettes.",
              "type": "info"
            },
            {
              "text": "La boule de neige rembourse le plus petit solde en premier, éliminant les dettes rapidement et créant de la motivation pour continuer.",
              "type": "info"
            },
            {
              "text": "Dans la plupart des scénarios, l'avalanche économise des centaines à des milliers d'euros de plus en intérêts comparé à la boule de neige.",
              "type": "info"
            },
            {
              "text": "La recherche montre que les personnes utilisant la boule de neige sont plus susceptibles de s'en tenir à leur plan et de devenir réellement libres de dettes.",
              "type": "info"
            },
            {
              "text": "Pour les dettes avec des taux d'intérêt similaires, la différence d'économies entre les méthodes peut être seulement de 100-500€.",
              "type": "info"
            },
            {
              "text": "La meilleure méthode est celle que vous suivrez réellement. Choisissez l'avalanche si vous êtes discipliné, la boule de neige si vous avez besoin de victoires rapides.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Types de Dettes Communes et Taux Typiques",
          "items": [
            {
              "text": "Cartes de Crédit : Typiquement 15-28% TAE. La dette commune la plus chère — toujours prioriser leur remboursement en premier.",
              "type": "warning"
            },
            {
              "text": "Prêts Personnels : Habituellement 8-15% TAE. Paiements et termes fixes les rendent prévisibles à planifier.",
              "type": "info"
            },
            {
              "text": "Prêts Étudiants : Fédéral 4-7% TAE, Privé 5-14% TAE. Peuvent qualifier pour un remboursement basé sur le revenu ou des programmes d'annulation.",
              "type": "info"
            },
            {
              "text": "Prêts Auto : Typiquement 4-10% TAE. Garantis par le véhicule. Le refinancement peut réduire votre taux si le crédit s'est amélioré.",
              "type": "info"
            },
            {
              "text": "Dette Médicale : Souvent 0% si sur un plan de paiement directement avec le fournisseur. Négociez avant de la mettre sur une carte de crédit.",
              "type": "info"
            },
            {
              "text": "Équité Domicile / HELOC : Habituellement 7-12% TAE avec des taux variables qui peuvent augmenter. Garantis par votre maison — soyez prudent.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul de Remboursement de Dettes",
          "description": "Exemples étape par étape montrant comment les stratégies de remboursement et les échéanciers sont calculés",
          "examples": [
            {
              "title": "Crise Cartes de Crédit (11K€, 2 cartes)",
              "steps": [
                "Carte A : 8 000€ à 22,99% TAE, 200€ paiement min",
                "Carte B : 3 000€ à 19,49% TAE, 75€ paiement min",
                "Paiement supplémentaire : 200€/mois",
                "L'avalanche cible d'abord la Carte A (taux plus élevé)",
                "Carte A remboursée en ~22 mois",
                "Les 200€ libérés + 200€ supplémentaires se reportent sur la Carte B",
                "Carte B remboursée en ~26 mois au total",
                "Intérêts totaux : 3 847€ (vs 7 231€ minimum seulement)"
              ],
              "result": "Libre de dettes en 26 mois | Intérêts économisés : 3 384€ | 38 mois plus rapide que les paiements minimums"
            },
            {
              "title": "Dettes Mixtes (33K€, 3 types)",
              "steps": [
                "Carte de Crédit : 5 000€ à 21% TAE, 125€ min",
                "Prêt Auto : 18 000€ à 6,5% TAE, 400€ min",
                "Prêt Personnel : 10 000€ à 12% TAE, 250€ min",
                "Paiement supplémentaire : 150€/mois",
                "Ordre avalanche : CC → Personnel → Auto",
                "Première victoire : Carte de Crédit finie en ~15 mois",
                "Tous les paiements se reportent sur la cible suivante",
                "Intérêts totaux : 4 219€ (vs 6 327€ minimum seulement)"
              ],
              "result": "Libre de dettes en 38 mois | Intérêts économisés : 2 108€ | 14 mois plus rapide que les paiements minimums"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qu'est-ce que la méthode avalanche de dettes ?",
          "answer": "La méthode avalanche de dettes se concentre sur le remboursement de la dette avec le taux d'intérêt le plus élevé en premier tout en faisant des paiements minimums sur toutes les autres dettes. Une fois la dette au taux le plus élevé remboursée, vous passez au taux suivant le plus élevé. Cette approche minimise les intérêts totaux que vous payez au fil du temps et est mathématiquement la stratégie la plus rentable."
        },
        {
          "question": "Qu'est-ce que la méthode boule de neige de dettes ?",
          "answer": "La méthode boule de neige de dettes cible la dette avec le plus petit solde en premier, indépendamment du taux d'intérêt. À mesure que chaque petite dette est éliminée, vous reportez ce paiement sur la dette suivante la plus petite. Cette approche fournit des victoires psychologiques rapides qui vous maintiennent motivé. La recherche montre que les personnes utilisant la boule de neige sont plus susceptibles de compléter leur plan de remboursement."
        },
        {
          "question": "Combien puis-je économiser avec des paiements mensuels supplémentaires ?",
          "answer": "Même de petits paiements supplémentaires font une énorme différence. Ajouter 100€/mois à une carte de crédit de 10 000€ à 22% TAE peut économiser plus de 4 000€ en intérêts et la rembourser 3+ années plus rapidement. Le calculateur montre vos économies exactes basées sur vos dettes spécifiques et votre montant de paiement supplémentaire."
        },
        {
          "question": "Qu'est-ce qu'un bon ratio dette-revenu ?",
          "answer": "Un ratio dette-revenu (DTI) en dessous de 36% est généralement considéré comme sain. Entre 36-43% est gérable mais peut limiter votre capacité à obtenir de nouveaux prêts. Au-dessus de 43% est un risque élevé selon la plupart des standards de prêteurs, et au-dessus de 50% signale une crise de dettes qui nécessite une attention immédiate. Entrez votre revenu mensuel dans ce calculateur pour voir votre DTI."
        },
        {
          "question": "Devrais-je rembourser les dettes ou investir ?",
          "answer": "Une règle générale : si le taux d'intérêt de votre dette dépasse les rendements d'investissement attendus (historiquement 7-10% pour les actions), remboursez d'abord la dette. Cela signifie toujours prioriser la dette de carte de crédit (15-25% TAE) plutôt qu'investir. Pour les dettes à faible taux comme les hypothèques (3-7%), investir tout en faisant des paiements minimums peut créer plus de richesse à long terme."
        },
        {
          "question": "Comment le coût quotidien des intérêts est-il calculé ?",
          "answer": "Le coût quotidien des intérêts égale le solde de chaque dette multiplié par son taux annuel, divisé par 365, puis additionné sur toutes les dettes. Par exemple, 10 000€ à 22% TAE accumule 6,03€ par jour. Cette métrique vous aide à ressentir l'urgence — chaque jour de retard coûte de l'argent réel."
        },
        {
          "question": "Puis-je combiner les méthodes avalanche et boule de neige ?",
          "answer": "Oui, une approche hybride est populaire. Certaines personnes commencent avec la boule de neige pour éliminer rapidement 1-2 petites dettes pour la motivation, puis passent à l'avalanche pour les dettes restantes plus importantes. La clé est la cohérence — toute approche structurée bat faire des paiements aléatoires."
        },
        {
          "question": "Ce calculateur fonctionne-t-il pour tous les types de dettes ?",
          "answer": "Oui, ce calculateur fonctionne pour les cartes de crédit, prêts personnels, prêts auto, prêts étudiants, dette médicale, HELOCs, et tout autre type de dette fixe ou renouvelable. Entrez le solde actuel, le TAE, et le paiement minimum pour chaque dette quel que soit le type."
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
      "name": "Schulden-Tilgungs-Rechner",
      "slug": "schulden-tilgungs-rechner",
      "subtitle": "Erstellen Sie Ihren personalisierten schuldenfreien Plan mit Schneeball-, Lawinen- oder Mindestratungszahlungsstrategien.",
      "seo": {
        "title": "Schulden-Tilgungs-Rechner - Erstellen Sie Ihren schuldenfreien Plan",
        "description": "Planen Sie Ihre Schuldentilgung mit Schneeball- oder Lawinenstrategien. Sehen Sie Ihr schuldenfreies Datum, tägliche Zinskosten und wie Zusatzzahlungen Tausende sparen. Kostenloses Online-Tool.",
        "shortDescription": "Erstellen Sie einen Schuldentilgungsplan und sehen Sie Ihr schuldenfreies Datum.",
        "keywords": [
          "schulden tilgungsrechner",
          "schulden schneeball rechner",
          "schulden lawinen rechner",
          "schulden schnell abbezahlen",
          "schuldenfrei rechner",
          "kreditkarten tilgung",
          "schulden rückzahlungsplan",
          "schulden eliminierungs rechner"
        ]
      },
      "inputs": {
        "debt1Balance": {
          "label": "Schuld 1 — Saldo",
          "helpText": "Aktueller geschuldeter Betrag Ihrer ersten Schuld"
        },
        "debt1Rate": {
          "label": "Schuld 1 — Zinssatz (APR)",
          "helpText": "Jährlicher Zinssatz auf diese Schuld"
        },
        "debt1MinPayment": {
          "label": "Schuld 1 — Mindestzahlung",
          "helpText": "Monatliche Mindestrate, die vom Kreditgeber verlangt wird"
        },
        "debt2Balance": {
          "label": "Schuld 2 — Saldo",
          "helpText": "Aktueller geschuldeter Betrag Ihrer zweiten Schuld"
        },
        "debt2Rate": {
          "label": "Schuld 2 — Zinssatz (APR)",
          "helpText": "Jährlicher Zinssatz auf diese Schuld"
        },
        "debt2MinPayment": {
          "label": "Schuld 2 — Mindestzahlung",
          "helpText": "Monatliche Mindestrate, die vom Kreditgeber verlangt wird"
        },
        "numberOfDebts": {
          "label": "Zusätzliche Schulden",
          "helpText": "Wählen Sie aus, wie viele Schulden insgesamt Sie einbeziehen möchten",
          "options": {
            "2": "Nur 2 Schulden",
            "3": "3 Schulden",
            "4": "4 Schulden"
          }
        },
        "debt3Balance": {
          "label": "Schuld 3 — Saldo",
          "helpText": "Aktueller geschuldeter Betrag Ihrer dritten Schuld"
        },
        "debt3Rate": {
          "label": "Schuld 3 — Zinssatz (APR)",
          "helpText": "Jährlicher Zinssatz auf diese Schuld"
        },
        "debt3MinPayment": {
          "label": "Schuld 3 — Mindestzahlung",
          "helpText": "Monatliche Mindestrate, die vom Kreditgeber verlangt wird"
        },
        "debt4Balance": {
          "label": "Schuld 4 — Saldo",
          "helpText": "Aktueller geschuldeter Betrag Ihrer vierten Schuld"
        },
        "debt4Rate": {
          "label": "Schuld 4 — Zinssatz (APR)",
          "helpText": "Jährlicher Zinssatz auf diese Schuld"
        },
        "debt4MinPayment": {
          "label": "Schuld 4 — Mindestzahlung",
          "helpText": "Monatliche Mindestrate, die vom Kreditgeber verlangt wird"
        },
        "payoffStrategy": {
          "label": "Tilgungsstrategie",
          "helpText": "Lawine spart das meiste Geld. Schneeball gibt schnellere Erfolge. Minimum zeigt die Grundlinie.",
          "options": {
            "avalanche": "Lawine (Höchster Zinssatz zuerst)",
            "snowball": "Schneeball (Kleinster Saldo zuerst)",
            "minimum": "Nur Mindestzahlungen"
          }
        },
        "includeExtraPayment": {
          "label": "Zusätzliche monatliche Zahlung",
          "helpText": "Einschalten, um jeden Monat zusätzliches Geld für Ihre Zielschuld hinzuzufügen"
        },
        "extraMonthlyPayment": {
          "label": "Zusätzlicher Betrag pro Monat",
          "helpText": "Dieser Zusatzbetrag wird zusätzlich zu allen Mindestzahlungen auf die Zielschuld angewendet"
        },
        "includeIncome": {
          "label": "Monatliches Einkommen einbeziehen",
          "helpText": "Optional — geben Sie Ihr Einkommen ein, um Ihr Schulden-zu-Einkommen-Verhältnis zu berechnen"
        },
        "monthlyIncome": {
          "label": "Brutto-Monatseinkommen",
          "helpText": "Gesamtmonatseinkommen vor Steuern — verwendet zur Berechnung des Schulden-zu-Einkommen-Verhältnisses"
        }
      },
      "results": {
        "debtFreeDate": {
          "label": "SCHULDENFREIES DATUM"
        },
        "totalInterestPaid": {
          "label": "Gesamte Zinsen"
        },
        "totalAmountPaid": {
          "label": "Gesamtbetrag bezahlt"
        },
        "monthlyInterestDrain": {
          "label": "Monatliche Zinsbelastung"
        },
        "dailyInterestCost": {
          "label": "Tägliche Zinskosten"
        },
        "weightedAvgRate": {
          "label": "Gewichteter Ø-Zinssatz"
        },
        "debtToIncomeRatio": {
          "label": "Schulden-zu-Einkommen-Verhältnis"
        },
        "interestSaved": {
          "label": "Gesparte Zinsen"
        },
        "timeSaved": {
          "label": "Gesparte Zeit"
        },
        "firstDebtEliminated": {
          "label": "Erster Erfolg"
        }
      },
      "presets": {
        "creditCardCrisis": {
          "label": "Kreditkarten-Krise",
          "description": "26.000€ Schulden, KK bei 22,99% + 19,49%"
        },
        "mixedDebt": {
          "label": "Gemischte Schulden",
          "description": "33.000€ auf KK, Auto, Privatkredit"
        },
        "studentHeavy": {
          "label": "Studienkredite dominant",
          "description": "54.000€ hauptsächlich Studienkredite"
        },
        "highBalance": {
          "label": "Hoher Saldo",
          "description": "82.000€ HELOC, KK, Auto, Privatkredit"
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
        "summary": "Mit der {strategy}-Methode werden Sie bis {debtFreeDate} schuldenfrei sein. Gesamtzinsen: {totalInterest}."
      },
      "infoCards": {
        "overview": {
          "title": "Schulden-Übersicht",
          "items": [
            {
              "label": "Gesamtschulden",
              "valueKey": "totalDebt"
            },
            {
              "label": "Gewichteter Ø APR",
              "valueKey": "weightedAvgRate"
            },
            {
              "label": "Schulden-zu-Einkommen",
              "valueKey": "debtToIncomeRatio"
            },
            {
              "label": "Tägliche Zinskosten",
              "valueKey": "dailyInterestCost"
            }
          ]
        },
        "plan": {
          "title": "Ihr Tilgungsplan",
          "items": [
            {
              "label": "Schuldenfreies Datum",
              "valueKey": "debtFreeDate"
            },
            {
              "label": "Gesamte gezahlte Zinsen",
              "valueKey": "totalInterestPaid"
            },
            {
              "label": "Gesparte Zinsen vs. Minimum",
              "valueKey": "interestSaved"
            },
            {
              "label": "Gesparte Zeit vs. Minimum",
              "valueKey": "timeSaved"
            },
            {
              "label": "Erste Schuld eliminiert",
              "valueKey": "firstDebtEliminated"
            }
          ]
        },
        "tips": {
          "title": "Schuldenfreie Tipps",
          "items": [
            "Zielen Sie zuerst auf Kreditkarten (15–25% APR) — sie kosten 3–5× mehr als Auto- oder Studienkredite an Zinsen.",
            "Nur 100€/Monat zusätzlich zu Ihrer höchstverzinsten Schuld kann Tausende an Zinsen sparen und Jahre von Ihrer Timeline abziehen.",
            "Rufen Sie Ihr Kreditkartenunternehmen an und bitten Sie um einen niedrigeren Zinssatz. Eine 5%-Reduktion auf 10.000€ spart 500€/Jahr an Zinsen.",
            "Frieren Sie Kreditkarten ein und verwenden Sie Bargeld oder EC-Karte während der Schuldentilgung. Neue Belastungen machen Ihren Tilgungsfortschritt zunichte."
          ]
        }
      },
      "chart": {
        "title": "Schuldensaldo über Zeit",
        "xLabel": "Monat",
        "yLabel": "Saldo",
        "series": {
          "totalBalance": "Verbleibendes Guthaben",
          "cumulativeInterest": "Kumulative Zinsen"
        }
      },
      "detailedTable": {
        "payoffSchedule": {
          "button": "Vollständigen Tilgungsplan anzeigen",
          "title": "Monat-für-Monat Tilgungsplan",
          "columns": {
            "month": "Monat",
            "targetedDebt": "Zielschuld",
            "payment": "Zahlung",
            "principal": "Tilgung",
            "interest": "Zinsen",
            "remaining": "Gesamt verbleibend"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Schuldentilgungsplan?",
          "content": "Ein Schuldentilgungsplan ist ein strategischer Ansatz zur Eliminierung Ihrer Schulden durch die Organisation von Zahlungen in einer bestimmten Reihenfolge. Anstatt zufällige Zahlungen über mehrere Konten zu leisten, priorisiert ein Tilgungsplan bestimmte Schulden, um entweder die insgesamt gezahlten Zinsen zu minimieren oder psychologische Dynamik durch schnelle Erfolge aufzubauen. Die zwei beliebtesten Strategien sind die Schulden-Lawinen-Methode, die den höchsten Zinssatz zuerst angeht, und die Schulden-Schneeball-Methode, die den kleinsten Saldo zuerst angeht. Beide Ansätze halten Sie dabei, Mindestzahlungen auf alle Schulden zu leisten, während alle zusätzlichen Mittel auf eine einzige Zielschuld gerichtet werden. Wenn diese Schuld eliminiert ist, wird die freigewordene Zahlung auf die nächste Schuld in der Reihe übertragen, wodurch ein beschleunigender Zahlungseffekt entsteht. Studien zeigen, dass Menschen, die einen strukturierten Tilgungsplan befolgen, deutlich wahrscheinlicher schuldenfrei werden im Vergleich zu denen, die zufällig zahlen."
        },
        "howItWorks": {
          "title": "Wie dieser Rechner funktioniert",
          "content": "Geben Sie jede Ihrer Schulden mit ihrem aktuellen Saldo, jährlichen Zinssatz (APR) und monatlichen Mindestzahlung ein. Wählen Sie Ihre bevorzugte Strategie — Lawine oder Schneeball — und fügen Sie optional einen zusätzlichen monatlichen Zahlungsbetrag hinzu. Der Rechner simuliert Ihre gesamte Tilgungsreise Monat für Monat und verfolgt, wie jede Schuld über die Zeit schrumpft. Er berechnet Ihr schuldenfreies Datum, die insgesamt gezahlten Zinsen und vergleicht Ihre gewählte Strategie mit Nur-Minimum-Zahlungen, um genau zu zeigen, wie viel Zeit und Geld Sie sparen. Einzigartige Metriken wie tägliche Zinskosten und monatliche Zinsbelastung zeigen auf, wie viel Ihre Schuld in Echtzeit kostet, während der gewichtete Durchschnittszinssatz Ihnen eine einzige Zahl gibt, um Ihre allgemeine Schuldengesundheit zu bewerten."
        },
        "considerations": {
          "title": "Lawine vs Schneeball: Hauptunterschiede",
          "items": [
            {
              "text": "Lawine zielt auf den höchsten Zinssatz zuerst ab und minimiert die Gesamtzinsen, die Sie über die Laufzeit aller Schulden zahlen.",
              "type": "info"
            },
            {
              "text": "Schneeball zahlt den kleinsten Saldo zuerst ab, eliminiert Schulden schnell und baut Motivation zum Weitermachen auf.",
              "type": "info"
            },
            {
              "text": "In den meisten Szenarien spart Lawine Hunderte bis Tausende mehr an Zinsen im Vergleich zu Schneeball.",
              "type": "info"
            },
            {
              "text": "Forschung zeigt, dass Menschen, die Schneeball verwenden, eher bei ihrem Plan bleiben und tatsächlich schuldenfrei werden.",
              "type": "info"
            },
            {
              "text": "Bei Schulden mit ähnlichen Zinssätzen kann der Sparunterschied zwischen den Methoden nur 100–500€ betragen.",
              "type": "info"
            },
            {
              "text": "Die beste Methode ist die, die Sie tatsächlich befolgen werden. Wählen Sie Lawine, wenn diszipliniert, Schneeball, wenn Sie schnelle Erfolge brauchen.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Häufige Schuldenarten & typische Zinssätze",
          "items": [
            {
              "text": "Kreditkarten: Typisch 15–28% APR. Die teuerste häufige Schuld — priorisieren Sie immer deren Abbezahlung zuerst.",
              "type": "warning"
            },
            {
              "text": "Privatkredite: Normalerweise 8–15% APR. Feste Zahlungen und Laufzeiten machen sie vorhersagbar zu planen.",
              "type": "info"
            },
            {
              "text": "Studienkredite: Staatlich 4–7% APR, Privat 5–14% APR. Könnten für einkommensabhängige Rückzahlung oder Erlassprogramme qualifiziert sein.",
              "type": "info"
            },
            {
              "text": "Autokredite: Typisch 4–10% APR. Durch das Fahrzeug gesichert. Umschuldung könnte Ihren Zinssatz senken, wenn sich die Kreditwürdigkeit verbessert hat.",
              "type": "info"
            },
            {
              "text": "Medizinische Schulden: Oft 0%, wenn auf einem Zahlungsplan direkt mit dem Anbieter. Verhandeln Sie, bevor Sie es auf eine Kreditkarte setzen.",
              "type": "info"
            },
            {
              "text": "Eigenheimkredit / HELOC: Normalerweise 7–12% APR mit variablen Zinssätzen, die steigen können. Durch Ihr Zuhause gesichert — seien Sie vorsichtig.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Schuldentilgungs-Berechnungsbeispiele",
          "description": "Schritt-für-Schritt-Beispiele, die zeigen, wie Tilgungsstrategien und Zeitpläne berechnet werden",
          "examples": [
            {
              "title": "Kreditkarten-Krise (11.000€, 2 Karten)",
              "steps": [
                "Karte A: 8.000€ bei 22,99% APR, 200€ Mindestzahlung",
                "Karte B: 3.000€ bei 19,49% APR, 75€ Mindestzahlung",
                "Zusatzzahlung: 200€/Monat",
                "Lawine zielt zuerst auf Karte A (höherer Zinssatz)",
                "Karte A in ~22 Monaten abbezahlt",
                "Freigewordene 200€ + 200€ Extra rollen zu Karte B",
                "Karte B in insgesamt ~26 Monaten abbezahlt",
                "Gesamtzinsen: 3.847€ (vs 7.231€ nur Minimum)"
              ],
              "result": "Schuldenfrei in 26 Monaten | Gesparte Zinsen: 3.384€ | 38 Monate schneller als Mindestzahlungen"
            },
            {
              "title": "Gemischte Schulden (33.000€, 3 Arten)",
              "steps": [
                "Kreditkarte: 5.000€ bei 21% APR, 125€ Min.",
                "Autokredit: 18.000€ bei 6,5% APR, 400€ Min.",
                "Privatkredit: 10.000€ bei 12% APR, 250€ Min.",
                "Zusatzzahlung: 150€/Monat",
                "Lawinen-Reihenfolge: KK → Privat → Auto",
                "Erster Erfolg: Kreditkarte weg in ~15 Monaten",
                "Alle Zahlungen rollen zum nächsten Ziel",
                "Gesamtzinsen: 4.219€ (vs 6.327€ nur Minimum)"
              ],
              "result": "Schuldenfrei in 38 Monaten | Gesparte Zinsen: 2.108€ | 14 Monate schneller als Mindestzahlungen"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist die Schulden-Lawinen-Methode?",
          "answer": "Die Schulden-Lawinen-Methode konzentriert sich darauf, die Schuld mit dem höchsten Zinssatz zuerst abzuzahlen, während Mindestzahlungen auf alle anderen Schulden geleistet werden. Sobald die höchstverzinste Schuld abbezahlt ist, wechseln Sie zum nächsthöchsten Zinssatz. Dieser Ansatz minimiert die Gesamtzinsen, die Sie über die Zeit zahlen, und ist mathematisch die kosteneffizienteste Strategie."
        },
        {
          "question": "Was ist die Schulden-Schneeball-Methode?",
          "answer": "Die Schulden-Schneeball-Methode zielt auf die Schuld mit dem kleinsten Saldo zuerst ab, unabhängig vom Zinssatz. Wenn jede kleine Schuld eliminiert ist, übertragen Sie diese Zahlung auf die nächstkleinste Schuld. Dieser Ansatz bietet schnelle psychologische Erfolge, die Sie motiviert halten. Forschung zeigt, dass Menschen, die Schneeball verwenden, eher ihren Tilgungsplan vollenden."
        },
        {
          "question": "Wie viel kann ich mit zusätzlichen monatlichen Zahlungen sparen?",
          "answer": "Selbst kleine Zusatzzahlungen machen einen riesigen Unterschied. 100€/Monat zusätzlich zu einer 10.000€ Kreditkarte bei 22% APR kann über 4.000€ an Zinsen sparen und sie 3+ Jahre schneller abbezahlen. Der Rechner zeigt Ihre exakten Ersparnisse basierend auf Ihren spezifischen Schulden und dem Zusatzzahlungsbetrag."
        },
        {
          "question": "Was ist ein gutes Schulden-zu-Einkommen-Verhältnis?",
          "answer": "Ein Schulden-zu-Einkommen (DTI) Verhältnis unter 36% gilt allgemein als gesund. Zwischen 36–43% ist handhabbar, kann aber Ihre Fähigkeit begrenzen, neue Kredite zu bekommen. Über 43% ist hohes Risiko nach den Standards der meisten Kreditgeber, und über 50% signalisiert eine Schuldenkrise, die sofortige Aufmerksamkeit benötigt. Geben Sie Ihr monatliches Einkommen in diesem Rechner ein, um Ihr DTI zu sehen."
        },
        {
          "question": "Soll ich Schulden abbezahlen oder investieren?",
          "answer": "Eine allgemeine Regel: Wenn Ihr Schuldenzinssatz die erwarteten Investitionsrenditen übersteigt (historisch 7–10% für Aktien), zahlen Sie zuerst die Schuld ab. Das bedeutet, priorisieren Sie immer Kreditkartenschulden (15–25% APR) über das Investieren. Bei niedrigverzinsten Schulden wie Hypotheken (3–7%) könnte das Investieren bei gleichzeitigen Mindestzahlungen langfristig mehr Vermögen aufbauen."
        },
        {
          "question": "Wie werden tägliche Zinskosten berechnet?",
          "answer": "Tägliche Zinskosten entsprechen dem Saldo jeder Schuld multipliziert mit ihrem jährlichen Zinssatz, geteilt durch 365, dann über alle Schulden summiert. Zum Beispiel fallen bei 10.000€ bei 22% APR 6,03€ pro Tag an. Diese Metrik hilft Ihnen, die Dringlichkeit zu spüren — jeder Tag Verzögerung kostet echtes Geld."
        },
        {
          "question": "Kann ich Lawinen- und Schneeball-Methoden kombinieren?",
          "answer": "Ja, ein Hybridansatz ist beliebt. Manche Menschen beginnen mit Schneeball, um schnell 1–2 kleine Schulden für Motivation zu eliminieren, dann wechseln sie zu Lawine für die verbleibenden größeren Schulden. Der Schlüssel ist Beständigkeit — jeder strukturierte Ansatz schlägt zufällige Zahlungen."
        },
        {
          "question": "Funktioniert dieser Rechner für alle Schuldenarten?",
          "answer": "Ja, dieser Rechner funktioniert für Kreditkarten, Privatkredite, Autokredite, Studienkredite, medizinische Schulden, HELOCs und jede andere feste oder revolvierende Schuld. Geben Sie den aktuellen Saldo, APR und die Mindestzahlung für jede Schuld unabhängig vom Typ ein."
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
    // ── Debt 1 (always visible) ──
    {
      id: "debt1Balance",
      type: "number",
      defaultValue: null,
      placeholder: "5000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "debt1Rate",
      type: "number",
      defaultValue: null,
      placeholder: "19.99",
      min: 0,
      max: 50,
      step: 0.01,
      suffix: "%",
    },
    {
      id: "debt1MinPayment",
      type: "number",
      defaultValue: null,
      placeholder: "150",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // ── Debt 2 (always visible) ──
    {
      id: "debt2Balance",
      type: "number",
      defaultValue: null,
      placeholder: "3000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "debt2Rate",
      type: "number",
      defaultValue: null,
      placeholder: "22.99",
      min: 0,
      max: 50,
      step: 0.01,
      suffix: "%",
    },
    {
      id: "debt2MinPayment",
      type: "number",
      defaultValue: null,
      placeholder: "75",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    // ── Number of debts ──
    {
      id: "numberOfDebts",
      type: "select",
      defaultValue: "2",
      options: [
        { value: "2" },
        { value: "3" },
        { value: "4" },
      ],
    },
    // ── Debt 3 (shown when >= 3) ──
    {
      id: "debt3Balance",
      type: "number",
      defaultValue: null,
      placeholder: "10000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "numberOfDebts", value: ["3", "4"] },
    },
    {
      id: "debt3Rate",
      type: "number",
      defaultValue: null,
      placeholder: "12",
      min: 0,
      max: 50,
      step: 0.01,
      suffix: "%",
      showWhen: { field: "numberOfDebts", value: ["3", "4"] },
    },
    {
      id: "debt3MinPayment",
      type: "number",
      defaultValue: null,
      placeholder: "250",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "numberOfDebts", value: ["3", "4"] },
    },
    // ── Debt 4 (shown when = 4) ──
    {
      id: "debt4Balance",
      type: "number",
      defaultValue: null,
      placeholder: "8000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "numberOfDebts", value: "4" },
    },
    {
      id: "debt4Rate",
      type: "number",
      defaultValue: null,
      placeholder: "11",
      min: 0,
      max: 50,
      step: 0.01,
      suffix: "%",
      showWhen: { field: "numberOfDebts", value: "4" },
    },
    {
      id: "debt4MinPayment",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "numberOfDebts", value: "4" },
    },
    // ── Strategy ──
    {
      id: "payoffStrategy",
      type: "select",
      defaultValue: "avalanche",
      options: [
        { value: "avalanche" },
        { value: "snowball" },
        { value: "minimum" },
      ],
    },
    // ── Extra Payment ──
    {
      id: "includeExtraPayment",
      type: "toggle",
      defaultValue: false,
    },
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
    // ── Income ──
    {
      id: "includeIncome",
      type: "toggle",
      defaultValue: false,
    },
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
    { id: "debtFreeDate", type: "primary", format: "text" },
    { id: "totalInterestPaid", type: "secondary", format: "text" },
    { id: "totalAmountPaid", type: "secondary", format: "text" },
    { id: "monthlyInterestDrain", type: "secondary", format: "text" },
    { id: "dailyInterestCost", type: "secondary", format: "text" },
    { id: "weightedAvgRate", type: "secondary", format: "text" },
    { id: "debtToIncomeRatio", type: "secondary", format: "text" },
    { id: "interestSaved", type: "secondary", format: "text" },
    { id: "timeSaved", type: "secondary", format: "text" },
    { id: "firstDebtEliminated", type: "secondary", format: "text" },
  ],

  // ─── INFO CARDS ───
  infoCards: [
    { id: "overview", type: "list", icon: "📊", itemCount: 4 },
    { id: "plan", type: "list", icon: "🎯", itemCount: 5 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ─── CHART ───
  chart: {
    id: "debtOverTime",
    type: "composed",
    xKey: "month",
    stacked: false,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "totalBalance", type: "area", color: "#ef4444" },
      { key: "cumulativeInterest", type: "area", color: "#f97316" },
    ],
  },

  // ─── DETAILED TABLE ───
  detailedTable: {
    id: "payoffSchedule",
    buttonLabel: "View Full Payoff Schedule",
    buttonIcon: "📅",
    modalTitle: "Month-by-Month Payoff Schedule",
    columns: [
      { id: "month", label: "Month", align: "center" },
      { id: "targetedDebt", label: "Debt Targeted", align: "left" },
      { id: "payment", label: "Payment", align: "right" },
      { id: "principal", label: "Principal", align: "right" },
      { id: "interest", label: "Interest", align: "right" },
      { id: "remaining", label: "Total Remaining", align: "right", highlight: true },
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
      title: "Paying Down Debt",
      source: "CFPB",
      url: "https://www.consumerfinance.gov/consumer-tools/debt-collection/",
    },
    {
      authors: "Federal Reserve",
      year: "2025",
      title: "Consumer Credit Outstanding",
      source: "Federal Reserve Statistical Release",
      url: "https://www.federalreserve.gov/releases/g19/current/",
    },
    {
      authors: "Investopedia",
      year: "2025",
      title: "Debt Avalanche vs. Debt Snowball: What's the Difference?",
      source: "Investopedia",
      url: "https://www.investopedia.com/articles/personal-finance/080716/debt-avalanche-vs-debt-snowball-which-best-you.asp",
    },
  ],

  hero: {},
};

// ═══════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════

interface DebtEntry {
  label: string;
  balance: number;
  rate: number;
  minPayment: number;
}

interface SimDebt {
  label: string;
  balance: number;
  rate: number;
  minPayment: number;
  paidOff: boolean;
  paidOffMonth: number;
}

function simulatePayoff(
  debts: DebtEntry[],
  strategy: string,
  extraMonthly: number,
  maxMonths = 600
) {
  const simDebts: SimDebt[] = debts.map((d) => ({
    label: d.label,
    balance: d.balance,
    rate: d.rate / 100,
    minPayment: d.minPayment,
    paidOff: false,
    paidOffMonth: 0,
  }));

  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;
  let firstPaidOff: { label: string; month: number } | null = null;
  const snapshots: Array<{ month: number; totalBalance: number; cumulativeInterest: number }> = [];
  const schedule: Array<Record<string, string>> = [];

  const initialBalance = simDebts.reduce((s, d) => s + d.balance, 0);
  snapshots.push({ month: 0, totalBalance: initialBalance, cumulativeInterest: 0 });

  while (month < maxMonths) {
    const activeDebts = simDebts.filter((d) => !d.paidOff);
    if (activeDebts.length === 0) break;
    month++;

    let monthPayment = 0;
    let monthInterest = 0;
    let monthPrincipal = 0;

    // Determine target
    let targetDebt: SimDebt | null = null;
    if (strategy === "avalanche") {
      targetDebt = activeDebts.reduce((best, d) => (d.rate > best.rate ? d : best), activeDebts[0]);
    } else if (strategy === "snowball") {
      targetDebt = activeDebts.reduce((best, d) => (d.balance < best.balance ? d : best), activeDebts[0]);
    }

    // Apply interest to all active debts
    for (const d of activeDebts) {
      const mi = d.balance * (d.rate / 12);
      d.balance += mi;
      monthInterest += mi;
    }

    // Pay minimums on non-target debts
    let extraAvailable = extraMonthly;
    for (const d of activeDebts) {
      if (d.paidOff) continue;
      const isTarget = targetDebt && d.label === targetDebt.label;
      if (isTarget && strategy !== "minimum") continue;

      const pmt = Math.min(d.minPayment, d.balance);
      d.balance -= pmt;
      monthPayment += pmt;
      monthPrincipal += pmt;

      if (d.balance <= 0.01) {
        d.balance = 0;
        d.paidOff = true;
        d.paidOffMonth = month;
        extraAvailable += d.minPayment;
        if (!firstPaidOff) firstPaidOff = { label: d.label, month };
      }
    }

    // Pay target debt (min + extra + freed-up)
    if (targetDebt && !targetDebt.paidOff && strategy !== "minimum") {
      const pmt = Math.min(targetDebt.minPayment + extraAvailable, targetDebt.balance);
      targetDebt.balance -= pmt;
      monthPayment += pmt;
      monthPrincipal += pmt;

      if (targetDebt.balance <= 0.01) {
        targetDebt.balance = 0;
        targetDebt.paidOff = true;
        targetDebt.paidOffMonth = month;
        if (!firstPaidOff) firstPaidOff = { label: targetDebt.label, month };
      }
    }

    totalInterest += monthInterest;
    totalPaid += monthPayment;
    const remaining = simDebts.reduce((s, d) => s + d.balance, 0);

    // Snapshots for chart
    if (month <= 24 || month % 3 === 0 || remaining <= 0.01) {
      snapshots.push({
        month,
        totalBalance: Math.max(0, remaining),
        cumulativeInterest: totalInterest,
      });
    }

    // Schedule rows for table
    if (month <= 12 || month % 3 === 0 || remaining <= 0.01) {
      schedule.push({
        month: `${month}`,
        targetedDebt: targetDebt ? targetDebt.label : "All (min)",
        payment: `${Math.round(monthPayment * 100) / 100}`,
        principal: `${Math.round(monthPrincipal * 100) / 100}`,
        interest: `${Math.round(monthInterest * 100) / 100}`,
        remaining: `${Math.round(Math.max(0, remaining) * 100) / 100}`,
      });
    }

    if (remaining <= 0.01) break;
  }

  return { totalInterest, totalPaid, totalMonths: month, firstPaidOff, snapshots, schedule };
}

export function calculateDebtPayoff(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Parse debts ───
  const debts: DebtEntry[] = [];
  const numDebts = Number(values.numberOfDebts) || 2;

  for (let i = 1; i <= numDebts; i++) {
    const bal = Number(values[`debt${i}Balance`]) || 0;
    const rate = Number(values[`debt${i}Rate`]) || 0;
    const minPmt = Number(values[`debt${i}MinPayment`]) || 0;
    if (bal > 0 && minPmt > 0) {
      debts.push({ label: `Debt ${i}`, balance: bal, rate, minPayment: minPmt });
    }
  }

  if (debts.length === 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ─── Parse options ───
  const strategy = String(values.payoffStrategy || "avalanche");
  const includeExtra = values.includeExtraPayment as boolean;
  const extraMonthly = includeExtra ? (Number(values.extraMonthlyPayment) || 0) : 0;
  const includeIncome = values.includeIncome as boolean;
  const monthlyIncome = includeIncome ? (Number(values.monthlyIncome) || 0) : 0;

  // ─── Currency symbol ───
  const curr = fieldUnits?.debt1Balance || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ─── Key metrics ───
  const totalDebt = debts.reduce((s, d) => s + d.balance, 0);
  const totalMinPayments = debts.reduce((s, d) => s + d.minPayment, 0);
  const weightedAvgRate = debts.reduce((s, d) => s + d.rate * (d.balance / totalDebt), 0);
  const dailyInterest = debts.reduce((s, d) => s + (d.balance * (d.rate / 100)) / 365, 0);
  const monthlyInterest = debts.reduce((s, d) => s + (d.balance * (d.rate / 100)) / 12, 0);

  // DTI
  const dtiRatio = monthlyIncome > 0 ? (totalMinPayments / monthlyIncome) * 100 : 0;
  let dtiLabel = "";
  if (monthlyIncome > 0) {
    if (dtiRatio < 36) dtiLabel = "Healthy";
    else if (dtiRatio < 43) dtiLabel = "Caution";
    else if (dtiRatio < 50) dtiLabel = "High Risk";
    else dtiLabel = "Critical";
  }

  // Rate health
  let rateLabel = "";
  if (weightedAvgRate < 8) rateLabel = "Low";
  else if (weightedAvgRate < 15) rateLabel = "Moderate";
  else if (weightedAvgRate < 22) rateLabel = "High";
  else rateLabel = "Critical";

  // ─── Simulate ───
  const result = simulatePayoff(debts, strategy, extraMonthly);
  const minimumResult = strategy !== "minimum" ? simulatePayoff(debts, "minimum", 0) : result;

  const interestSaved = strategy !== "minimum" ? minimumResult.totalInterest - result.totalInterest : 0;
  const timeSavedMonths = strategy !== "minimum" ? minimumResult.totalMonths - result.totalMonths : 0;
  const timeSavedYears = Math.floor(Math.abs(timeSavedMonths) / 12);
  const timeSavedRemMonths = Math.abs(timeSavedMonths) % 12;

  // Debt-free date
  const now = new Date();
  const freeDate = new Date(now.getFullYear(), now.getMonth() + result.totalMonths, 1);
  const freeDateStr = freeDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // First win
  const firstWinStr = result.firstPaidOff
    ? `${result.firstPaidOff.label} — ${result.firstPaidOff.month} mo`
    : "—";

  // Time saved string
  let timeSavedStr = "—";
  if (timeSavedMonths > 0) {
    timeSavedStr = timeSavedYears > 0
      ? `${timeSavedYears} yr ${timeSavedRemMonths} mo faster`
      : `${timeSavedRemMonths} mo faster`;
  }

  // Strategy name
  const strategyName = strategy === "avalanche" ? "avalanche" : strategy === "snowball" ? "snowball" : "minimum payment";

  // ─── Build summary ───
  let summary =
    f.summary
      ?.replace("{strategy}", strategyName)
      .replace("{debtFreeDate}", freeDateStr)
      .replace("{totalInterest}", `${sym}${fmtNum(result.totalInterest)}`) ||
    `Using the ${strategyName} method, you'll be debt-free by ${freeDateStr}. Total interest: ${sym}${fmtNum(result.totalInterest)}.`;

  if (interestSaved > 0) {
    summary += ` You save ${sym}${fmtNum(interestSaved)} and ${timeSavedStr} compared to minimum payments.`;
  }

  // ─── Chart data ───
  const chartData = result.snapshots.map((s) => ({
    month: `${s.month}`,
    totalBalance: Math.round(s.totalBalance),
    cumulativeInterest: Math.round(s.cumulativeInterest),
  }));

  // ─── Table data ───
  const tableData = result.schedule.map((row) => ({
    month: row.month,
    targetedDebt: row.targetedDebt,
    payment: `${sym}${fmtNum(Number(row.payment))}`,
    principal: `${sym}${fmtNum(Number(row.principal))}`,
    interest: `${sym}${fmtNum(Number(row.interest))}`,
    remaining: `${sym}${fmtNum(Number(row.remaining))}`,
  }));

  return {
    values: {
      debtFreeDate: result.totalMonths,
      totalInterestPaid: result.totalInterest,
      totalAmountPaid: result.totalPaid,
      monthlyInterestDrain: monthlyInterest,
      dailyInterestCost: dailyInterest,
      weightedAvgRate,
      debtToIncomeRatio: dtiRatio,
      interestSaved,
      timeSaved: timeSavedMonths,
      firstDebtEliminated: result.firstPaidOff?.month || 0,
      totalDebt,
    },
    formatted: {
      debtFreeDate: freeDateStr,
      totalInterestPaid: `${sym}${fmtNum(result.totalInterest)}`,
      totalAmountPaid: `${sym}${fmtNum(result.totalPaid)}`,
      monthlyInterestDrain: `${sym}${fmtNum(monthlyInterest)}/mo to interest`,
      dailyInterestCost: `${sym}${fmtNum(dailyInterest)}/day accruing`,
      weightedAvgRate: `${fmtNum(weightedAvgRate, 1)}% — ${rateLabel}`,
      debtToIncomeRatio: monthlyIncome > 0 ? `${fmtNum(dtiRatio, 1)}% — ${dtiLabel}` : "—",
      interestSaved: interestSaved > 0 ? `${sym}${fmtNum(interestSaved)} saved` : "—",
      timeSaved: timeSavedStr,
      firstDebtEliminated: firstWinStr,
      totalDebt: `${sym}${fmtNum(totalDebt, 0)}`,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
