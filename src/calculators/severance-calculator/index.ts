import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════════
// ⚖️ SEVERANCE & SETTLEMENT CALCULATOR (Finiquito / Liquidación)
// ═══════════════════════════════════════════════════════════════════════
// Multi-country severance pay calculator for Latin America.
// Phase 1: Mexico (full LFT compliance). Architecture ready for 10 countries.
// FEATURES vs competitors:
//   ✅ Multi-country (10 countries) — Only FiniquitoJusto has this, poorly
//   ✅ 3 exit reasons: Resignation / Unjust dismissal / Mutual agreement
//   ✅ Auto vacation days from seniority (post-2023 "Vacaciones Dignas")
//   ✅ SDI (Salario Diario Integrado) auto-calculated
//   ✅ ISR separation: Art. 95 (indemnization) vs Art. 96 (salary)
//   ✅ Prima de antigüedad with 2×SM cap
//   ✅ Geo-detection auto-selects country + currency
//   ✅ DetailedTable with line-by-line breakdown
// ═══════════════════════════════════════════════════════════════════════

// ─── 2026 Official Values ────────────────────────────────────────────
const UMA_DAILY_2026 = 117.31;
const SM_GENERAL_2026 = 315.04;       // Salario Mínimo General
const SM_FRONTERA_2026 = 473.45;      // SM Zona Frontera Norte
const PRIMA_ANTIGUEDAD_TOPE = SM_GENERAL_2026 * 2; // $630.08/day

// ─── ISR Monthly Table 2026 (Art. 96 LISR) ──────────────────────────
const ISR_TABLE_2026 = [
  { lower: 0.01,      upper: 746.04,      fee: 0,         rate: 0.0192 },
  { lower: 746.05,    upper: 6332.05,     fee: 14.32,     rate: 0.0640 },
  { lower: 6332.06,   upper: 11128.01,    fee: 371.83,    rate: 0.1088 },
  { lower: 11128.02,  upper: 12935.82,    fee: 893.63,    rate: 0.1600 },
  { lower: 12935.83,  upper: 15487.71,    fee: 1182.88,   rate: 0.1792 },
  { lower: 15487.72,  upper: 31236.49,    fee: 1640.18,   rate: 0.2136 },
  { lower: 31236.50,  upper: 49233.00,    fee: 5004.12,   rate: 0.2352 },
  { lower: 49233.01,  upper: 93993.90,    fee: 8233.40,   rate: 0.3000 },
  { lower: 93993.91,  upper: 125325.20,   fee: 21661.67,  rate: 0.3200 },
  { lower: 125325.21, upper: 375975.61,   fee: 31667.83,  rate: 0.3400 },
  { lower: 375975.62, upper: Infinity,     fee: 116888.77, rate: 0.3500 },
];

function calcISR96(income: number): number {
  if (income <= 0) return 0;
  for (const b of ISR_TABLE_2026) {
    if (income >= b.lower && income <= b.upper) {
      return b.fee + ((income - b.lower) * b.rate);
    }
  }
  const last = ISR_TABLE_2026[ISR_TABLE_2026.length - 1];
  return last.fee + ((income - last.lower) * last.rate);
}

// ─── Vacation Table (Post-2023 "Vacaciones Dignas" Reform) ───────────
// Art. 76 LFT — Reformed Dec 27, 2022, effective Jan 1, 2023
function getVacationDays(yearsWorked: number): number {
  if (yearsWorked < 1) return 0;
  if (yearsWorked <= 5) return 10 + (yearsWorked * 2); // 1yr=12, 2yr=14, 3yr=16, 4yr=18, 5yr=20
  // After year 5: +2 days per 5-year block
  const extraBlocks = Math.floor((yearsWorked - 5) / 5);
  return 20 + (extraBlocks * 2) + 2; // 6-10=22, 11-15=24, 16-20=26...
}

// ─── Country → Currency ──────────────────────────────────────────────
const COUNTRY_CURRENCY: Record<string, { code: string; symbol: string }> = {
  MX: { code: "MXN", symbol: "MX$" },
  CO: { code: "COP", symbol: "COL$" },
  AR: { code: "ARS", symbol: "AR$" },
  PE: { code: "PEN", symbol: "S/" },
  BR: { code: "BRL", symbol: "R$" },
  DO: { code: "DOP", symbol: "RD$" },
  GT: { code: "GTQ", symbol: "Q" },
  SV: { code: "SVC", symbol: "$" },
  CR: { code: "CRC", symbol: "₡" },
  HN: { code: "HNL", symbol: "L" },
};

function fmtC(val: number, sym: string): string {
  if (val === 0) return `${sym}0.00`;
  return `${sym}${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtN(val: number): string {
  return val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ═══════════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════════
export const severanceCalculatorConfig: CalculatorConfigV4 = {
  id: "severance-calculator",
  version: "4.0",
  category: "finance",
  icon: "⚖️",

  presets: [
    {
      id: "resignationMX",
      icon: "🚶",
      values: {
        country: "MX", salaryFrequency: "monthly", salary: 15000,
        exitReason: "resignation", yearsWorked: 3, monthsWorked: 6,
        bonusDays: 15, primaVacPct: 25, pendingVacationDays: 0,
        unpaidDays: 10,
      },
    },
    {
      id: "dismissalMX",
      icon: "⚖️",
      values: {
        country: "MX", salaryFrequency: "monthly", salary: 20000,
        exitReason: "unjustDismissal", yearsWorked: 5, monthsWorked: 0,
        bonusDays: 15, primaVacPct: 25, pendingVacationDays: 5,
        unpaidDays: 15,
      },
    },
    {
      id: "mutualMX",
      icon: "🤝",
      values: {
        country: "MX", salaryFrequency: "monthly", salary: 35000,
        exitReason: "mutualAgreement", yearsWorked: 8, monthsWorked: 0,
        bonusDays: 30, primaVacPct: 25, pendingVacationDays: 0,
        unpaidDays: 5,
      },
    },
    {
      id: "minWageMX",
      icon: "🇲🇽",
      values: {
        country: "MX", salaryFrequency: "monthly", salary: 9451,
        exitReason: "unjustDismissal", yearsWorked: 2, monthsWorked: 0,
        bonusDays: 15, primaVacPct: 25, pendingVacationDays: 0,
        unpaidDays: 8,
      },
    },
  ],

  t: {
    en: {
      name: "Severance Calculator",
      slug: "severance-calculator",
      subtitle: "Calculate your finiquito, liquidación, or severance pay for Mexico and Latin America. Includes ISR, SDI, vacation table, and indemnification by law.",
      breadcrumb: "Severance",

      seo: {
        title: "Severance Calculator - Finiquito & Liquidación Mexico",
        description: "Calculate your severance pay (finiquito and liquidación) for Mexico. Get unpaid wages, proportional aguinaldo, vacation, prima, indemnification, and ISR instantly.",
        shortDescription: "Calculate finiquito and liquidación with official Mexican labor law formulas.",
        keywords: [
          "severance calculator",
          "finiquito calculator",
          "liquidacion calculator mexico",
          "calculadora de finiquito",
          "calculadora de liquidacion",
          "severance pay mexico",
          "indemnizacion despido mexico",
          "free finiquito calculator",
        ],
      },

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Employment Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        country: {
          label: "Country",
          helpText: "Select your country to apply local labor laws",
          options: {
            MX: "🇲🇽 Mexico", CO: "🇨🇴 Colombia", AR: "🇦🇷 Argentina",
            PE: "🇵🇪 Peru", BR: "🇧🇷 Brazil", DO: "🇩🇴 Dominican Rep.",
            GT: "🇬🇹 Guatemala", SV: "🇸🇻 El Salvador", CR: "🇨🇷 Costa Rica",
            HN: "🇭🇳 Honduras",
          },
        },
        salaryFrequency: {
          label: "Pay Frequency",
          helpText: "How often you receive your salary",
          options: {
            monthly: "Monthly",
            biweekly: "Biweekly (Quincenal)",
            weekly: "Weekly",
            daily: "Daily",
          },
        },
        salary: {
          label: "Gross Salary",
          helpText: "Your gross salary (before deductions) for the selected pay frequency",
        },
        exitReason: {
          label: "Reason for Leaving",
          helpText: "This determines which payments apply. Unjust dismissal includes indemnification (3 months + 20 days/year).",
          options: {
            resignation: "Voluntary Resignation",
            unjustDismissal: "Unjustified Dismissal",
            mutualAgreement: "Mutual Agreement",
          },
        },
        yearsWorked: {
          label: "Full Years Worked",
          helpText: "Complete years of seniority at the company",
        },
        monthsWorked: {
          label: "Additional Months",
          helpText: "Extra months beyond the full years (0-11)",
        },
        bonusDays: {
          label: "Aguinaldo Days per Year",
          helpText: "Minimum 15 by law. Check your contract — some companies offer 20, 30, or 40 days.",
        },
        primaVacPct: {
          label: "Vacation Premium %",
          helpText: "Minimum 25% by law (Art. 80 LFT). Some contracts offer more.",
        },
        pendingVacationDays: {
          label: "Pending Vacation Days (prior years)",
          helpText: "Vacation days from PREVIOUS years you never took. These must be paid in your settlement.",
        },
        unpaidDays: {
          label: "Unpaid Days Worked",
          helpText: "Days worked in the current pay period that haven't been paid yet.",
        },
      },

      results: {
        totalNet: { label: "Total Net Payment" },
        finiquitoTotal: { label: "Finiquito (Settlement)" },
        liquidacionTotal: { label: "Liquidación (Indemnification)" },
        totalISR: { label: "Estimated ISR Withheld" },
      },

      presets: {
        resignationMX: { label: "🚶 Resignation", description: "Voluntary quit, 3.5 years, $15K/month" },
        dismissalMX: { label: "⚖️ Unjust Dismissal", description: "Fired without cause, 5 years, $20K" },
        mutualMX: { label: "🤝 Mutual Agreement", description: "Negotiated exit, 8 years, $35K" },
        minWageMX: { label: "🇲🇽 Minimum Wage", description: "Min wage dismissal, 2 years" },
      },

      values: {
        "days": "days",
        "years": "years",
        "months": "months",
        "resignation": "Voluntary Resignation",
        "unjustDismissal": "Unjustified Dismissal",
        "mutualAgreement": "Mutual Agreement",
        "finiquito": "Finiquito",
        "liquidacion": "Liquidación",
        "noLiquidacion": "Not applicable (resignation)",
      },

      formats: {
        summary: "Your total estimated payment is {totalNet} net ({finiquitoTotal} finiquito + {liquidacionTotal} liquidación − {totalISR} ISR).",
      },

      infoCards: {
        metrics: {
          title: "Finiquito Breakdown",
          items: [
            { label: "Unpaid Days", valueKey: "unpaidDaysAmount" },
            { label: "Proportional Aguinaldo", valueKey: "aguinaldoProp" },
            { label: "Proportional Vacation", valueKey: "vacationProp" },
            { label: "Prima Vacacional", valueKey: "primaVacAmount" },
          ],
        },
        details: {
          title: "Liquidación Details",
          items: [
            { label: "Indemnification (90 days)", valueKey: "indemnification90" },
            { label: "20 Days per Year", valueKey: "twentyDaysPerYear" },
            { label: "Prima de Antigüedad", valueKey: "primaAntiguedad" },
            { label: "SDI (Integrated Salary)", valueKey: "sdiDisplay" },
          ],
        },
        tips: {
          title: "Know Your Rights",
          items: [
            "Your employer must pay finiquito immediately or within 3 business days. Delays are illegal — contact PROFEDET (800-911-7877).",
            "NEVER sign your finiquito if the amount looks wrong. Once signed, it's very hard to claim more. You have 1 year to file a claim.",
            "If you were fired, you're entitled to finiquito PLUS liquidación. If you resigned, you only get finiquito. Don't let employers call a dismissal a 'resignation'.",
            "Prima de antigüedad (12 days/year) is capped at 2× minimum wage ($630.08/day in 2026). For resignations, it only applies after 15+ years of service.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "Finiquito vs Liquidación: What's the Difference?",
          content: "In Mexico, there are two distinct payments when employment ends. The 'finiquito' (settlement) includes all earned but unpaid compensation: unpaid salary days, proportional aguinaldo (Christmas bonus), proportional vacation days, and vacation premium (prima vacacional). Every worker receives finiquito regardless of why they left — resignation, dismissal, or mutual agreement. The 'liquidación' (severance/indemnification) is ADDITIONAL compensation paid ONLY when the worker is fired without justified cause (despido injustificado). It includes: 3 months of integrated daily salary (indemnización constitucional, Art. 48 LFT), 20 days per year worked (Art. 50 LFT, in specific cases), and prima de antigüedad (12 days per year, Art. 162 LFT). The total for unjust dismissal can represent 6-15+ months of salary depending on seniority, making it crucial to calculate correctly.",
        },
        howItWorks: {
          title: "How Is Each Concept Calculated?",
          content: "All calculations start with the daily salary (monthly ÷ 30). For indemnification, the Salario Diario Integrado (SDI) is used — this includes the proportional value of aguinaldo and prima vacacional built into the daily rate. The SDI factor for minimum benefits (15 days aguinaldo, 25% prima vacacional on 12 vacation days) is approximately 1.0493. Unpaid days are simply the daily salary times days worked in the current period. Proportional aguinaldo is (15 ÷ 365) × days worked this year × daily salary. Vacation days are determined by seniority using the official LFT table (12 days for year 1, increasing to 20 by year 5, then +2 every 5 years). The vacation premium is 25% of vacation pay. For dismissals, the indemnification is 90 × SDI, and prima de antigüedad is 12 × years × MIN(daily salary, 2×minimum wage). ISR is calculated separately for finiquito (normal Art. 96) and indemnification (Art. 95, with 90 UMA exemption).",
        },
        considerations: {
          title: "Key Considerations",
          items: [
            { text: "The finiquito must be paid the same day or within 3 business days of termination. There is no legal excuse for delays — your employer cannot hold it pending 'paperwork'.", type: "warning" as const },
            { text: "You have exactly 1 year from the date of termination to file a labor claim for unpaid amounts (Art. 516 LFT). Don't wait — evidence gets harder to gather over time.", type: "warning" as const },
            { text: "Since the 2023 reform ('Vacaciones Dignas'), minimum vacation days start at 12 (not 6) per year. Make sure your employer uses the updated table.", type: "info" as const },
            { text: "Prima de antigüedad for voluntary resignation is ONLY mandatory if you worked 15+ years. For dismissals, it's always paid regardless of seniority.", type: "info" as const },
            { text: "The SDI (Integrated Daily Salary) is always higher than your regular daily salary because it includes proportional aguinaldo and prima vacacional. This is the base for indemnification calculations.", type: "info" as const },
            { text: "If you believe your dismissal was unjustified, PROFEDET offers FREE legal representation. Call 800-911-7877 or visit gob.mx/profedet.", type: "info" as const },
          ],
        },
        categories: {
          title: "What You Get by Exit Reason",
          items: [
            { text: "Voluntary Resignation: Unpaid days + proportional aguinaldo + proportional vacation + prima vacacional. NO indemnification. Prima de antigüedad only if 15+ years.", type: "info" as const },
            { text: "Unjustified Dismissal: Everything from finiquito PLUS 90 days × SDI (constitutional indemnification) + 20 days × years × SDI + prima de antigüedad (12 days/year, always).", type: "info" as const },
            { text: "Mutual Agreement: Finiquito + negotiated indemnification (usually similar to dismissal). Everything must be documented in writing and signed by both parties.", type: "info" as const },
            { text: "Contract End: Same as resignation — finiquito only (unpaid days, proportional aguinaldo, vacation, prima vacacional). No indemnification.", type: "info" as const },
            { text: "Justified Dismissal (Art. 47): Only finiquito. The employer must prove the cause was justified (theft, violence, repeated absences, etc.).", type: "info" as const },
            { text: "Company Closure: Full liquidación applies — 3 months + 20 days/year + prima de antigüedad + all pending finiquito amounts.", type: "info" as const },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step real scenarios",
          examples: [
            {
              title: "Resignation after 3 years ($15,000/month)",
              steps: [
                "Daily salary: $15,000 ÷ 30 = $500",
                "Unpaid days (10): $500 × 10 = $5,000",
                "Aguinaldo prop (6 months = 182 days): (15÷365) × 182 × $500 = $3,739.73",
                "Vacation days (year 3 = 16 days): (16÷365) × 182 × $500 = $3,989.04",
                "Prima vacacional: $3,989.04 × 25% = $997.26",
              ],
              result: "Total finiquito: ~$13,726. No liquidación (voluntary resignation).",
            },
            {
              title: "Unjust Dismissal after 5 years ($20,000/month)",
              steps: [
                "Daily salary: $666.67 | SDI factor 1.0493 → SDI: $699.53",
                "Finiquito: unpaid days + aguinaldo + vacation + prima ≈ $15,200",
                "Indemnification (90 days): 90 × $699.53 = $62,957.70",
                "20 days/year: 20 × 5 × $699.53 = $69,953.00",
                "Prima antigüedad: 12 × 5 × MIN($666.67, $630.08) = $37,804.80",
              ],
              result: "Total: ~$185,915. Approximately 9.3 months of salary.",
            },
          ],
        },
      },

      faqs: [
        { question: "What is the difference between finiquito and liquidación?", answer: "Finiquito is the payment of pending compensation (unpaid salary, proportional aguinaldo, vacation, prima vacacional) and is paid in ALL terminations. Liquidación is ADDITIONAL indemnification (3 months salary + 20 days/year + prima de antigüedad) paid ONLY in unjustified dismissals. You always get finiquito; you only get liquidación if you were wrongfully fired." },
        { question: "How long does my employer have to pay me?", answer: "The finiquito must be paid immediately upon termination or within 3 business days at most. There is no legal provision allowing longer delays. If your employer doesn't pay, contact PROFEDET at 800-911-7877 for free legal assistance." },
        { question: "What is the SDI (Salario Diario Integrado)?", answer: "The SDI is your daily salary plus the proportional value of your benefits (aguinaldo and prima vacacional). For minimum legal benefits (15 days aguinaldo, 25% prima on vacation), the SDI factor is approximately 1.0493. Indemnification is always calculated on SDI, not your regular daily salary." },
        { question: "Do I get prima de antigüedad if I resign?", answer: "Only if you worked 15 or more years at the company (Art. 162 LFT). In unjustified dismissals, prima de antigüedad is ALWAYS paid regardless of seniority. It's calculated as 12 days per year of service, capped at 2× the daily minimum wage ($630.08/day in 2026)." },
        { question: "How many vacation days do I get by law?", answer: "Since the 2023 'Vacaciones Dignas' reform: Year 1 = 12 days, Year 2 = 14, Year 3 = 16, Year 4 = 18, Year 5 = 20. After that, +2 days every 5 years (Years 6-10 = 22, Years 11-15 = 24, etc.). The old table with 6 days for year 1 is no longer valid." },
        { question: "Is the finiquito taxed?", answer: "Yes, partially. Unpaid days are taxed as regular income. Aguinaldo is exempt up to 30 UMA ($3,519.30). Prima vacacional is exempt up to 15 UMA ($1,759.65). Indemnification is exempt up to 90 UMA ($10,557.90). Prima de antigüedad is exempt up to 90 UMA. Only amounts exceeding these thresholds pay ISR." },
        { question: "What if I think my finiquito amount is wrong?", answer: "Do NOT sign the document. Once signed, it's very difficult to claim additional amounts. Use this calculator to verify the numbers, then contact PROFEDET (800-911-7877) for free legal review. You have 1 year from termination to file a claim (Art. 516 LFT)." },
        { question: "Does mutual agreement get the same as dismissal?", answer: "Not automatically. In mutual agreements, the terms are negotiated. Most employers offer similar to unjustified dismissal (3 months + prima de antigüedad) to avoid legal disputes. Always negotiate in writing and don't accept less than what the law provides for a dismissal." },
      ],

      rating: {
        title: "Rate this Calculator",
        share: "Share", copied: "Copied!", copyLink: "Copy Link",
        clickToRate: "Click to rate", youRated: "You rated",
        stars: "stars", averageFrom: "average from", ratings: "ratings",
      },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Calculate", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },

      chart: {
        title: "Payment Breakdown",
        xLabel: "",
        yLabel: "Amount",
        series: {
          unpaidDays: "Unpaid Days",
          aguinaldo: "Aguinaldo",
          vacation: "Vacation + Prima",
          indemnification: "Indemnification",
          primaAnt: "Prima Antigüedad",
        },
      },
    },
    es: {
      "name": "Calculadora de Finiquito",
      "slug": "calculadora-finiquito-liquidacion",
      "subtitle": "Calcula tu finiquito, liquidación o indemnización para México y Latinoamérica. Incluye ISR, SDI, tabla de vacaciones e indemnización por ley.",
      "breadcrumb": "Finiquito",
      "seo": {
        "title": "Calculadora de Finiquito - Finiquito y Liquidación México",
        "description": "Calcula tu finiquito y liquidación para México. Obtén salarios pendientes, aguinaldo proporcional, vacaciones, prima e indemnización e ISR al instante.",
        "shortDescription": "Calcula finiquito y liquidación con fórmulas oficiales de la ley laboral mexicana.",
        "keywords": [
          "calculadora de finiquito",
          "calculadora finiquito",
          "calculadora liquidacion mexico",
          "calculadora de liquidacion",
          "finiquito mexico",
          "indemnizacion despido mexico",
          "calculadora finiquito gratis"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "country": {
          "label": "País",
          "helpText": "Selecciona tu país para aplicar las leyes laborales locales",
          "options": {
            "MX": "🇲🇽 México",
            "CO": "🇨🇴 Colombia",
            "AR": "🇦🇷 Argentina",
            "PE": "🇵🇪 Perú",
            "BR": "🇧🇷 Brasil",
            "DO": "🇩🇴 Rep. Dominicana",
            "GT": "🇬🇹 Guatemala",
            "SV": "🇸🇻 El Salvador",
            "CR": "🇨🇷 Costa Rica",
            "HN": "🇭🇳 Honduras"
          }
        },
        "salaryFrequency": {
          "label": "Frecuencia de Pago",
          "helpText": "Con qué frecuencia recibes tu salario",
          "options": {
            "monthly": "Mensual",
            "biweekly": "Quincenal",
            "weekly": "Semanal",
            "daily": "Diario"
          }
        },
        "salary": {
          "label": "Salario Bruto",
          "helpText": "Tu salario bruto (antes de deducciones) para la frecuencia de pago seleccionada"
        },
        "exitReason": {
          "label": "Motivo de Salida",
          "helpText": "Esto determina qué pagos aplican. El despido injustificado incluye indemnización (3 meses + 20 días/año).",
          "options": {
            "resignation": "Renuncia Voluntaria",
            "unjustDismissal": "Despido Injustificado",
            "mutualAgreement": "Convenio Mutuo"
          }
        },
        "yearsWorked": {
          "label": "Años Completos Trabajados",
          "helpText": "Años completos de antigüedad en la empresa"
        },
        "monthsWorked": {
          "label": "Meses Adicionales",
          "helpText": "Meses extra más allá de los años completos (0-11)"
        },
        "bonusDays": {
          "label": "Días de Aguinaldo por Año",
          "helpText": "Mínimo 15 por ley. Revisa tu contrato — algunas empresas ofrecen 20, 30 o 40 días."
        },
        "primaVacPct": {
          "label": "Prima Vacacional %",
          "helpText": "Mínimo 25% por ley (Art. 80 LFT). Algunos contratos ofrecen más."
        },
        "pendingVacationDays": {
          "label": "Días de Vacaciones Pendientes (años anteriores)",
          "helpText": "Días de vacaciones de años ANTERIORES que nunca tomaste. Deben pagarse en tu finiquito."
        },
        "unpaidDays": {
          "label": "Días Trabajados No Pagados",
          "helpText": "Días trabajados en el período actual que aún no han sido pagados."
        }
      },
      "results": {
        "totalNet": {
          "label": "Pago Neto Total"
        },
        "finiquitoTotal": {
          "label": "Finiquito"
        },
        "liquidacionTotal": {
          "label": "Liquidación (Indemnización)"
        },
        "totalISR": {
          "label": "ISR Estimado Retenido"
        }
      },
      "presets": {
        "resignationMX": {
          "label": "🚶 Renuncia",
          "description": "Renuncia voluntaria, 3.5 años, $15K/mes"
        },
        "dismissalMX": {
          "label": "⚖️ Despido Injustificado",
          "description": "Despedido sin causa, 5 años, $20K"
        },
        "mutualMX": {
          "label": "🤝 Convenio Mutuo",
          "description": "Salida negociada, 8 años, $35K"
        },
        "minWageMX": {
          "label": "🇲🇽 Salario Mínimo",
          "description": "Despido salario mínimo, 2 años"
        }
      },
      "values": {
        "days": "días",
        "years": "años",
        "months": "meses",
        "resignation": "Renuncia Voluntaria",
        "unjustDismissal": "Despido Injustificado",
        "mutualAgreement": "Convenio Mutuo",
        "finiquito": "Finiquito",
        "liquidacion": "Liquidación",
        "noLiquidacion": "No aplica (renuncia)"
      },
      "formats": {
        "summary": "Tu pago total estimado es {totalNet} neto ({finiquitoTotal} finiquito + {liquidacionTotal} liquidación − {totalISR} ISR)."
      },
      "infoCards": {
        "metrics": {
          "title": "Desglose de Finiquito",
          "items": [
            {
              "label": "Días No Pagados",
              "valueKey": "unpaidDaysAmount"
            },
            {
              "label": "Aguinaldo Proporcional",
              "valueKey": "aguinaldoProp"
            },
            {
              "label": "Vacaciones Proporcionales",
              "valueKey": "vacationProp"
            },
            {
              "label": "Prima Vacacional",
              "valueKey": "primaVacAmount"
            }
          ]
        },
        "details": {
          "title": "Detalles de Liquidación",
          "items": [
            {
              "label": "Indemnización (90 días)",
              "valueKey": "indemnification90"
            },
            {
              "label": "20 Días por Año",
              "valueKey": "twentyDaysPerYear"
            },
            {
              "label": "Prima de Antigüedad",
              "valueKey": "primaAntiguedad"
            },
            {
              "label": "SDI (Salario Diario Integrado)",
              "valueKey": "sdiDisplay"
            }
          ]
        },
        "tips": {
          "title": "Conoce Tus Derechos",
          "items": [
            "Tu patrón debe pagar el finiquito inmediatamente o dentro de 3 días hábiles. Las demoras son ilegales — contacta PROFEDET (800-911-7877).",
            "NUNCA firmes tu finiquito si la cantidad se ve incorrecta. Una vez firmado, es muy difícil reclamar más. Tienes 1 año para presentar una demanda.",
            "Si te despidieron, tienes derecho a finiquito MÁS liquidación. Si renunciaste, solo obtienes finiquito. No dejes que los patrones llamen 'renuncia' a un despido.",
            "La prima de antigüedad (12 días/año) está limitada a 2× salario mínimo ($630.08/día en 2026). Para renuncias, solo aplica después de 15+ años de servicio."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Finiquito vs Liquidación: ¿Cuál es la Diferencia?",
          "content": "En México, hay dos pagos distintos cuando termina el empleo. El 'finiquito' incluye toda la compensación ganada pero no pagada: días de salario no pagados, aguinaldo proporcional, días de vacaciones proporcionales y prima vacacional. Todo trabajador recibe finiquito sin importar por qué se fue — renuncia, despido o convenio mutuo. La 'liquidación' es compensación ADICIONAL pagada SOLO cuando el trabajador es despedido sin causa justificada (despido injustificado). Incluye: 3 meses de salario diario integrado (indemnización constitucional, Art. 48 LFT), 20 días por año trabajado (Art. 50 LFT, en casos específicos), y prima de antigüedad (12 días por año, Art. 162 LFT). El total por despido injusto puede representar 6-15+ meses de salario dependiendo de la antigüedad, haciendo crucial calcularlo correctamente."
        },
        "howItWorks": {
          "title": "¿Cómo se Calcula Cada Concepto?",
          "content": "Todos los cálculos comienzan con el salario diario (mensual ÷ 30). Para indemnización, se usa el Salario Diario Integrado (SDI) — esto incluye el valor proporcional de aguinaldo y prima vacacional integrado en la tarifa diaria. El factor SDI para beneficios mínimos (15 días aguinaldo, 25% prima vacacional sobre 12 días de vacaciones) es aproximadamente 1.0493. Los días no pagados son simplemente el salario diario por días trabajados en el período actual. El aguinaldo proporcional es (15 ÷ 365) × días trabajados este año × salario diario. Los días de vacaciones se determinan por antigüedad usando la tabla oficial LFT (12 días para año 1, aumentando a 20 para año 5, luego +2 cada 5 años). La prima vacacional es 25% del pago de vacaciones. Para despidos, la indemnización es 90 × SDI, y prima de antigüedad es 12 × años × MIN(salario diario, 2×salario mínimo). El ISR se calcula por separado para finiquito (Art. 96 normal) e indemnización (Art. 95, con exención de 90 UMA)."
        },
        "considerations": {
          "title": "Consideraciones Clave",
          "items": [
            {
              "text": "El finiquito debe pagarse el mismo día o dentro de 3 días hábiles de la terminación. No hay excusa legal para demoras — tu patrón no puede retenerlo esperando 'papeleo'.",
              "type": "warning"
            },
            {
              "text": "Tienes exactamente 1 año desde la fecha de terminación para presentar una demanda laboral por cantidades no pagadas (Art. 516 LFT). No esperes — la evidencia se vuelve más difícil de reunir con el tiempo.",
              "type": "warning"
            },
            {
              "text": "Desde la reforma 2023 ('Vacaciones Dignas'), los días mínimos de vacaciones comienzan en 12 (no 6) por año. Asegúrate de que tu patrón use la tabla actualizada.",
              "type": "info"
            },
            {
              "text": "La prima de antigüedad por renuncia voluntaria es SOLO obligatoria si trabajaste 15+ años. Para despidos, siempre se paga independientemente de la antigüedad.",
              "type": "info"
            },
            {
              "text": "El SDI (Salario Diario Integrado) siempre es más alto que tu salario diario regular porque incluye aguinaldo y prima vacacional proporcionales. Esta es la base para cálculos de indemnización.",
              "type": "info"
            },
            {
              "text": "Si crees que tu despido fue injustificado, PROFEDET ofrece representación legal GRATUITA. Llama al 800-911-7877 o visita gob.mx/profedet.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Qué Obtienes por Motivo de Salida",
          "items": [
            {
              "text": "Renuncia Voluntaria: Días no pagados + aguinaldo proporcional + vacaciones proporcionales + prima vacacional. SIN indemnización. Prima de antigüedad solo si 15+ años.",
              "type": "info"
            },
            {
              "text": "Despido Injustificado: Todo del finiquito MÁS 90 días × SDI (indemnización constitucional) + 20 días × años × SDI + prima de antigüedad (12 días/año, siempre).",
              "type": "info"
            },
            {
              "text": "Convenio Mutuo: Finiquito + indemnización negociada (usualmente similar a despido). Todo debe documentarse por escrito y firmarse por ambas partes.",
              "type": "info"
            },
            {
              "text": "Fin de Contrato: Igual que renuncia — solo finiquito (días no pagados, aguinaldo proporcional, vacaciones, prima vacacional). Sin indemnización.",
              "type": "info"
            },
            {
              "text": "Despido Justificado (Art. 47): Solo finiquito. El patrón debe probar que la causa fue justificada (robo, violencia, faltas repetidas, etc.).",
              "type": "info"
            },
            {
              "text": "Cierre de Empresa: Aplica liquidación completa — 3 meses + 20 días/año + prima de antigüedad + todas las cantidades de finiquito pendientes.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Escenarios reales paso a paso",
          "examples": [
            {
              "title": "Renuncia después de 3 años ($15,000/mes)",
              "steps": [
                "Salario diario: $15,000 ÷ 30 = $500",
                "Días no pagados (10): $500 × 10 = $5,000",
                "Aguinaldo prop (6 meses = 182 días): (15÷365) × 182 × $500 = $3,739.73",
                "Días de vacaciones (año 3 = 16 días): (16÷365) × 182 × $500 = $3,989.04",
                "Prima vacacional: $3,989.04 × 25% = $997.26"
              ],
              "result": "Total finiquito: ~$13,726. Sin liquidación (renuncia voluntaria)."
            },
            {
              "title": "Despido Injusto después de 5 años ($20,000/mes)",
              "steps": [
                "Salario diario: $666.67 | Factor SDI 1.0493 → SDI: $699.53",
                "Finiquito: días no pagados + aguinaldo + vacaciones + prima ≈ $15,200",
                "Indemnización (90 días): 90 × $699.53 = $62,957.70",
                "20 días/año: 20 × 5 × $699.53 = $69,953.00",
                "Prima antigüedad: 12 × 5 × MIN($666.67, $630.08) = $37,804.80"
              ],
              "result": "Total: ~$185,915. Aproximadamente 9.3 meses de salario."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es la diferencia entre finiquito y liquidación?",
          "answer": "El finiquito es el pago de compensaciones pendientes (salario no pagado, aguinaldo proporcional, vacaciones, prima vacacional) y se paga en TODAS las terminaciones. La liquidación es indemnización ADICIONAL (3 meses de salario + 20 días/año + prima de antigüedad) pagada SOLO en despidos injustificados. Siempre obtienes finiquito; solo obtienes liquidación si te despidieron injustamente."
        },
        {
          "question": "¿Cuánto tiempo tiene mi patrón para pagarme?",
          "answer": "El finiquito debe pagarse inmediatamente al terminar o dentro de 3 días hábiles como máximo. No hay disposición legal que permita demoras más largas. Si tu patrón no paga, contacta PROFEDET al 800-911-7877 para asistencia legal gratuita."
        },
        {
          "question": "¿Qué es el SDI (Salario Diario Integrado)?",
          "answer": "El SDI es tu salario diario más el valor proporcional de tus beneficios (aguinaldo y prima vacacional). Para beneficios legales mínimos (15 días aguinaldo, 25% prima sobre vacaciones), el factor SDI es aproximadamente 1.0493. La indemnización siempre se calcula sobre SDI, no sobre tu salario diario regular."
        },
        {
          "question": "¿Obtengo prima de antigüedad si renuncio?",
          "answer": "Solo si trabajaste 15 o más años en la empresa (Art. 162 LFT). En despidos injustificados, la prima de antigüedad SIEMPRE se paga independientemente de la antigüedad. Se calcula como 12 días por año de servicio, limitada a 2× el salario mínimo diario ($630.08/día en 2026)."
        },
        {
          "question": "¿Cuántos días de vacaciones me tocan por ley?",
          "answer": "Desde la reforma 'Vacaciones Dignas' 2023: Año 1 = 12 días, Año 2 = 14, Año 3 = 16, Año 4 = 18, Año 5 = 20. Después, +2 días cada 5 años (Años 6-10 = 22, Años 11-15 = 24, etc.). La tabla antigua con 6 días para año 1 ya no es válida."
        },
        {
          "question": "¿Se grava el finiquito con impuestos?",
          "answer": "Sí, parcialmente. Los días no pagados se gravan como ingreso regular. El aguinaldo está exento hasta 30 UMA ($3,519.30). La prima vacacional está exenta hasta 15 UMA ($1,759.65). La indemnización está exenta hasta 90 UMA ($10,557.90). La prima de antigüedad está exenta hasta 90 UMA. Solo las cantidades que excedan estos umbrales pagan ISR."
        },
        {
          "question": "¿Qué pasa si creo que mi finiquito está mal?",
          "answer": "NO firmes el documento. Una vez firmado, es muy difícil reclamar cantidades adicionales. Usa esta calculadora para verificar los números, luego contacta PROFEDET (800-911-7877) para revisión legal gratuita. Tienes 1 año desde la terminación para presentar demanda (Art. 516 LFT)."
        },
        {
          "question": "¿El convenio mutuo recibe lo mismo que el despido?",
          "answer": "No automáticamente. En convenios mutuos, los términos se negocian. La mayoría de patrones ofrecen similar al despido injustificado (3 meses + prima de antigüedad) para evitar disputas legales. Siempre negocia por escrito y no aceptes menos de lo que la ley prevé para un despido."
        }
      ],
      "chart": {
        "title": "Desglose de Pagos",
        "xLabel": "",
        "yLabel": "Cantidad",
        "series": {
          "unpaidDays": "Días No Pagados",
          "aguinaldo": "Aguinaldo",
          "vacation": "Vacaciones + Prima",
          "indemnification": "Indemnización",
          "primaAnt": "Prima Antigüedad"
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
      "name": "Calculadora de Rescisão",
      "slug": "calculadora-rescisao-trabalho",
      "subtitle": "Calcule sua rescisão, indenização ou pagamento de demissão para Brasil e América Latina. Inclui IR, INSS, férias proporcionais e indenização por lei.",
      "breadcrumb": "Rescisão",
      "seo": {
        "title": "Calculadora de Rescisão - Indenização & Demissão Brasil",
        "description": "Calcule sua rescisão trabalhista (indenização e demissão) para o Brasil. Obtenha salários não pagos, 13º proporcional, férias, terço constitucional e IR instantaneamente.",
        "shortDescription": "Calcule rescisão e indenização com fórmulas oficiais da legislação trabalhista brasileira.",
        "keywords": [
          "calculadora de rescisao",
          "calculadora de indenizacao",
          "rescisao trabalhista brasil",
          "calculadora de demissao",
          "calculadora de finiquito",
          "rescisao trabalhista gratuita",
          "indenizacao demissao brasil",
          "calculadora rescisao online"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "country": {
          "label": "País",
          "helpText": "Selecione seu país para aplicar as leis trabalhistas locais",
          "options": {
            "MX": "🇲🇽 México",
            "CO": "🇨🇴 Colômbia",
            "AR": "🇦🇷 Argentina",
            "PE": "🇵🇪 Peru",
            "BR": "🇧🇷 Brasil",
            "DO": "🇩🇴 Rep. Dominicana",
            "GT": "🇬🇹 Guatemala",
            "SV": "🇸🇻 El Salvador",
            "CR": "🇨🇷 Costa Rica",
            "HN": "🇭🇳 Honduras"
          }
        },
        "salaryFrequency": {
          "label": "Frequência do Pagamento",
          "helpText": "Com que frequência você recebe seu salário",
          "options": {
            "monthly": "Mensal",
            "biweekly": "Quinzenal",
            "weekly": "Semanal",
            "daily": "Diário"
          }
        },
        "salary": {
          "label": "Salário Bruto",
          "helpText": "Seu salário bruto (antes dos descontos) para a frequência de pagamento selecionada"
        },
        "exitReason": {
          "label": "Motivo da Saída",
          "helpText": "Isso determina quais pagamentos se aplicam. Demissão sem justa causa inclui indenização (multa de 40% do FGTS + aviso prévio).",
          "options": {
            "resignation": "Demissão Voluntária",
            "unjustDismissal": "Demissão sem Justa Causa",
            "mutualAgreement": "Acordo Mútuo"
          }
        },
        "yearsWorked": {
          "label": "Anos Completos Trabalhados",
          "helpText": "Anos completos de trabalho na empresa"
        },
        "monthsWorked": {
          "label": "Meses Adicionais",
          "helpText": "Meses extras além dos anos completos (0-11)"
        },
        "bonusDays": {
          "label": "Dias de 13º Salário por Ano",
          "helpText": "Padrão de 30 dias por lei. Verifique seu contrato — algumas empresas oferecem valores diferenciados."
        },
        "primaVacPct": {
          "label": "Terço Constitucional %",
          "helpText": "33,33% por lei (Art. 7º CF). Alguns contratos podem oferecer mais."
        },
        "pendingVacationDays": {
          "label": "Dias de Férias Pendentes (anos anteriores)",
          "helpText": "Dias de férias de anos ANTERIORES que você nunca tirou. Devem ser pagos na rescisão."
        },
        "unpaidDays": {
          "label": "Dias Trabalhados Não Pagos",
          "helpText": "Dias trabalhados no período atual que ainda não foram pagos."
        }
      },
      "results": {
        "totalNet": {
          "label": "Pagamento Líquido Total"
        },
        "finiquitoTotal": {
          "label": "Rescisão (Verbas Rescisórias)"
        },
        "liquidacionTotal": {
          "label": "Indenização (Multas e Avisos)"
        },
        "totalISR": {
          "label": "IR Estimado Retido"
        }
      },
      "presets": {
        "resignationMX": {
          "label": "🚶 Demissão Voluntária",
          "description": "Pedido de demissão, 3,5 anos, R$ 3.000/mês"
        },
        "dismissalMX": {
          "label": "⚖️ Demissão sem Justa Causa",
          "description": "Demitido sem motivo, 5 anos, R$ 4.000"
        },
        "mutualMX": {
          "label": "🤝 Acordo Mútuo",
          "description": "Saída negociada, 8 anos, R$ 7.000"
        },
        "minWageMX": {
          "label": "🇧🇷 Salário Mínimo",
          "description": "Demissão salário mínimo, 2 anos"
        }
      },
      "values": {
        "days": "dias",
        "years": "anos",
        "months": "meses",
        "resignation": "Demissão Voluntária",
        "unjustDismissal": "Demissão sem Justa Causa",
        "mutualAgreement": "Acordo Mútuo",
        "finiquito": "Rescisão",
        "liquidacion": "Indenização",
        "noLiquidacion": "Não aplicável (demissão voluntária)"
      },
      "formats": {
        "summary": "Seu pagamento total estimado é {totalNet} líquido ({finiquitoTotal} rescisão + {liquidacionTotal} indenização − {totalISR} IR)."
      },
      "infoCards": {
        "metrics": {
          "title": "Detalhamento da Rescisão",
          "items": [
            {
              "label": "Dias Não Pagos",
              "valueKey": "unpaidDaysAmount"
            },
            {
              "label": "13º Proporcional",
              "valueKey": "aguinaldoProp"
            },
            {
              "label": "Férias Proporcionais",
              "valueKey": "vacationProp"
            },
            {
              "label": "Terço Constitucional",
              "valueKey": "primaVacAmount"
            }
          ]
        },
        "details": {
          "title": "Detalhes da Indenização",
          "items": [
            {
              "label": "Multa FGTS (40%)",
              "valueKey": "indemnification90"
            },
            {
              "label": "Aviso Prévio",
              "valueKey": "twentyDaysPerYear"
            },
            {
              "label": "Saldo FGTS",
              "valueKey": "primaAntiguedad"
            },
            {
              "label": "Salário Base",
              "valueKey": "sdiDisplay"
            }
          ]
        },
        "tips": {
          "title": "Conheça Seus Direitos",
          "items": [
            "Seu empregador deve pagar a rescisão em até 10 dias corridos após a demissão. Atrasos podem gerar multa adicional.",
            "NUNCA assine sua rescisão se o valor parecer errado. Uma vez assinado, é muito difícil contestar. Você tem 2 anos para entrar com ação trabalhista.",
            "Se você foi demitido sem justa causa, tem direito a rescisão MAIS indenização. Se pediu demissão, só tem direito às verbas rescisórias básicas.",
            "O saque do FGTS é liberado apenas em demissões sem justa causa, aposentadoria ou outras situações previstas em lei."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Rescisão vs Indenização: Qual a Diferença?",
          "content": "No Brasil, existem dois tipos distintos de pagamentos quando o emprego termina. A 'rescisão' (verbas rescisórias) inclui todas as compensações devidas: salário não pago, 13º proporcional, férias proporcionais e vencidas, terço constitucional. Todo trabalhador recebe rescisão independentemente do motivo da saída. A 'indenização' é compensação ADICIONAL paga APENAS quando o trabalhador é demitido sem justa causa. Inclui: multa de 40% sobre o FGTS depositado, aviso prévio (30 dias + 3 dias por ano trabalhado), e liberação do saque do FGTS. O total para demissão sem justa causa pode representar 2-4+ meses de salário dependendo do tempo de serviço."
        },
        "howItWorks": {
          "title": "Como Cada Conceito é Calculado?",
          "content": "Todos os cálculos partem do salário mensal e diário (mensal ÷ 30). Salário não pago é simplesmente o salário diário vezes os dias trabalhados no período. O 13º proporcional é (meses trabalhados no ano ÷ 12) × salário mensal. Férias proporcionais são (meses trabalhados ÷ 12) × 30 dias, mais 1/3 constitucional (33,33%). Para demissões sem justa causa: aviso prévio é 30 dias + 3 dias por ano completo (máximo 90 dias), multa FGTS é 40% sobre todos os depósitos do contrato, e há liberação do saque integral do FGTS. O IR incide sobre o total conforme tabela progressiva, com algumas isenções para indenizações."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "A rescisão deve ser paga em até 10 dias corridos da demissão. Atraso gera multa adicional de 1 salário mínimo.",
              "type": "warning"
            },
            {
              "text": "Você tem 2 anos da demissão para entrar com ação trabalhista por valores não pagos. Durante o contrato, o prazo é de 5 anos.",
              "type": "warning"
            },
            {
              "text": "Férias vencidas (período aquisitivo completo) devem ser pagas em dobro se não usufruídas no prazo legal.",
              "type": "info"
            },
            {
              "text": "No acordo mútuo (Lei 13.467/2017), o trabalhador recebe 20% da multa do FGTS e pode sacar 80% do saldo, mas perde o seguro-desemprego.",
              "type": "info"
            },
            {
              "text": "O aviso prévio pode ser trabalhado ou indenizado. Se indenizado, conta como tempo de serviço para todos os cálculos.",
              "type": "info"
            },
            {
              "text": "Para dúvidas trabalhistas, procure o sindicato da categoria ou a Superintendência Regional do Trabalho.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "O Que Você Recebe Por Tipo de Saída",
          "items": [
            {
              "text": "Demissão Voluntária: Salário proporcional + 13º proporcional + férias proporcionais e vencidas + 1/3 constitucional. SEM multa FGTS, sem aviso, sem saque FGTS.",
              "type": "info"
            },
            {
              "text": "Demissão sem Justa Causa: Tudo da rescisão MAIS aviso prévio + multa 40% FGTS + saque integral FGTS + seguro-desemprego.",
              "type": "info"
            },
            {
              "text": "Acordo Mútuo: Rescisão + 50% do aviso prévio + 20% multa FGTS + saque de 80% do FGTS. SEM seguro-desemprego.",
              "type": "info"
            },
            {
              "text": "Fim de Contrato Determinado: Apenas verbas rescisórias proporcionais. SEM aviso prévio, SEM multa FGTS, saque FGTS apenas se não renovar em 90 dias.",
              "type": "info"
            },
            {
              "text": "Demissão por Justa Causa: Apenas salário proporcional e férias vencidas (se houver). SEM 13º, SEM aviso, SEM multa, SEM saque FGTS.",
              "type": "info"
            },
            {
              "text": "Aposentadoria: Verbas rescisórias completas + saque integral FGTS. Pode continuar trabalhando se houver acordo com empregador.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Cenários reais passo a passo",
          "examples": [
            {
              "title": "Demissão voluntária após 3 anos (R$ 3.000/mês)",
              "steps": [
                "Salário diário: R$ 3.000 ÷ 30 = R$ 100",
                "Dias não pagos (15): R$ 100 × 15 = R$ 1.500",
                "13º proporcional (8 meses): (8÷12) × R$ 3.000 = R$ 2.000",
                "Férias proporcionais (8 meses): (8÷12) × R$ 3.000 = R$ 2.000",
                "1/3 constitucional: R$ 2.000 × 33,33% = R$ 666,60"
              ],
              "result": "Total rescisão: ~R$ 6.166,60. Sem indenização (demissão voluntária)."
            },
            {
              "title": "Demissão sem justa causa após 5 anos (R$ 4.000/mês)",
              "steps": [
                "Rescisão básica: salário + 13º + férias + 1/3 ≈ R$ 8.000",
                "Aviso prévio: 30 + (3×5) = 45 dias → R$ 6.000",
                "FGTS estimado 5 anos: R$ 20.000",
                "Multa 40% FGTS: R$ 20.000 × 40% = R$ 8.000",
                "Saque FGTS: R$ 20.000 (liberado para saque)"
              ],
              "result": "Total: ~R$ 42.000 (R$ 22.000 pagos + R$ 20.000 FGTS sacável). Cerca de 5,5 meses de salário."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual a diferença entre rescisão e indenização?",
          "answer": "Rescisão são as verbas trabalhistas devidas (salário, 13º, férias, 1/3) pagas em TODAS as demissões. Indenização é compensação ADICIONAL (multa FGTS, aviso prévio) paga APENAS em demissões sem justa causa. Sempre recebe rescisão; só recebe indenização se for demitido sem motivo."
        },
        {
          "question": "Quanto tempo meu empregador tem para me pagar?",
          "answer": "A rescisão deve ser paga em até 10 dias corridos da demissão. Não há previsão legal para prazos maiores. Se não pagar no prazo, deve multa adicional de 1 salário mínimo nacional."
        },
        {
          "question": "Como funciona o aviso prévio?",
          "answer": "Todo empregado com mais de 1 ano tem direito a aviso prévio de 30 dias + 3 dias por ano trabalhado (máximo 90 dias). Pode ser trabalhado (com redução de 2h/dia ou 7 dias corridos) ou indenizado (pago em dinheiro)."
        },
        {
          "question": "Quando posso sacar meu FGTS?",
          "answer": "O FGTS pode ser sacado integralmente em: demissão sem justa causa, aposentadoria, compra da casa própria, doenças graves, após 3 anos sem depósitos, e outras situações específicas. Na demissão voluntária ou justa causa, o FGTS fica bloqueado."
        },
        {
          "question": "Quantos dias de férias tenho direito?",
          "answer": "Todo trabalhador tem direito a 30 dias corridos de férias após cada período aquisitivo de 12 meses, mais 1/3 constitucional (33,33% do valor). Faltas podem reduzir este direito conforme escala legal."
        },
        {
          "question": "A rescisão é tributada pelo IR?",
          "answer": "Sim, parcialmente. Salários, 13º e férias seguem tabela progressiva normal. Indenizações (aviso prévio, multa FGTS) têm tratamento específico e podem ter isenção parcial dependendo do valor e tempo de serviço."
        },
        {
          "question": "E se eu achar que o valor da rescisão está errado?",
          "answer": "NÃO assine o documento. Uma vez assinado, é muito difícil contestar. Use esta calculadora para verificar, procure seu sindicato ou um advogado trabalhista. Você tem 2 anos da demissão para entrar com ação."
        },
        {
          "question": "Como funciona o acordo mútuo?",
          "answer": "No acordo mútuo (Lei 13.467/2017), você recebe: verbas rescisórias + 50% do aviso prévio + 20% da multa FGTS + pode sacar 80% do FGTS. Porém, perde direito ao seguro-desemprego. Deve ser formalizado no sindicato ou Ministério do Trabalho."
        }
      ],
      "chart": {
        "title": "Detalhamento do Pagamento",
        "xLabel": "",
        "yLabel": "Valor",
        "series": {
          "unpaidDays": "Dias Não Pagos",
          "aguinaldo": "13º Salário",
          "vacation": "Férias + 1/3",
          "indemnification": "Indenização",
          "primaAnt": "FGTS + Multa"
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
      "name": "Calculateur d'Indemnités de Licenciement",
      "slug": "calculateur-indemnites-licenciement",
      "subtitle": "Calculez vos indemnités de fin de contrat, liquidation ou indemnités de licenciement pour le Mexique et l'Amérique latine. Inclut l'ISR, le SDI, le tableau des vacances et l'indemnisation légale.",
      "breadcrumb": "Indemnités de Licenciement",
      "seo": {
        "title": "Calculateur d'Indemnités de Licenciement - Finiquito et Liquidación Mexique",
        "description": "Calculez vos indemnités de licenciement (finiquito et liquidación) pour le Mexique. Obtenez les salaires impayés, l'aguinaldo proportionnel, les vacances, la prime et l'indemnisation instantanément.",
        "shortDescription": "Calculez le finiquito et la liquidación avec les formules officielles du droit du travail mexicain.",
        "keywords": [
          "calculateur indemnités licenciement",
          "calculateur finiquito",
          "calculateur liquidacion mexique",
          "calculatrice finiquito",
          "calculatrice liquidacion",
          "indemnités licenciement mexique",
          "indemnisation licenciement mexique",
          "calculateur finiquito gratuit"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "country": {
          "label": "Pays",
          "helpText": "Sélectionnez votre pays pour appliquer les lois du travail locales",
          "options": {
            "MX": "🇲🇽 Mexique",
            "CO": "🇨🇴 Colombie",
            "AR": "🇦🇷 Argentine",
            "PE": "🇵🇪 Pérou",
            "BR": "🇧🇷 Brésil",
            "DO": "🇩🇴 Rép. Dominicaine",
            "GT": "🇬🇹 Guatemala",
            "SV": "🇸🇻 Salvador",
            "CR": "🇨🇷 Costa Rica",
            "HN": "🇭🇳 Honduras"
          }
        },
        "salaryFrequency": {
          "label": "Fréquence de Paie",
          "helpText": "À quelle fréquence recevez-vous votre salaire",
          "options": {
            "monthly": "Mensuel",
            "biweekly": "Bimensuel (Quincenal)",
            "weekly": "Hebdomadaire",
            "daily": "Quotidien"
          }
        },
        "salary": {
          "label": "Salaire Brut",
          "helpText": "Votre salaire brut (avant déductions) pour la fréquence de paie sélectionnée"
        },
        "exitReason": {
          "label": "Motif de Départ",
          "helpText": "Ceci détermine quels paiements s'appliquent. Le licenciement injustifié inclut l'indemnisation (3 mois + 20 jours/an).",
          "options": {
            "resignation": "Démission Volontaire",
            "unjustDismissal": "Licenciement Injustifié",
            "mutualAgreement": "Accord Mutuel"
          }
        },
        "yearsWorked": {
          "label": "Années Complètes Travaillées",
          "helpText": "Années complètes d'ancienneté dans l'entreprise"
        },
        "monthsWorked": {
          "label": "Mois Supplémentaires",
          "helpText": "Mois supplémentaires au-delà des années complètes (0-11)"
        },
        "bonusDays": {
          "label": "Jours d'Aguinaldo par An",
          "helpText": "Minimum 15 par la loi. Vérifiez votre contrat — certaines entreprises offrent 20, 30 ou 40 jours."
        },
        "primaVacPct": {
          "label": "Prime de Vacances %",
          "helpText": "Minimum 25% par la loi (Art. 80 LFT). Certains contrats offrent plus."
        },
        "pendingVacationDays": {
          "label": "Jours de Vacances en Attente (années précédentes)",
          "helpText": "Jours de vacances des années PRÉCÉDENTES que vous n'avez jamais pris. Ceux-ci doivent être payés dans votre règlement."
        },
        "unpaidDays": {
          "label": "Jours de Travail Impayés",
          "helpText": "Jours travaillés dans la période de paie actuelle qui n'ont pas encore été payés."
        }
      },
      "results": {
        "totalNet": {
          "label": "Paiement Net Total"
        },
        "finiquitoTotal": {
          "label": "Finiquito (Règlement)"
        },
        "liquidacionTotal": {
          "label": "Liquidación (Indemnisation)"
        },
        "totalISR": {
          "label": "ISR Estimé Retenu"
        }
      },
      "presets": {
        "resignationMX": {
          "label": "🚶 Démission",
          "description": "Démission volontaire, 3,5 ans, 15K$/mois"
        },
        "dismissalMX": {
          "label": "⚖️ Licenciement Injuste",
          "description": "Licencié sans cause, 5 ans, 20K$"
        },
        "mutualMX": {
          "label": "🤝 Accord Mutuel",
          "description": "Sortie négociée, 8 ans, 35K$"
        },
        "minWageMX": {
          "label": "🇲🇽 Salaire Minimum",
          "description": "Licenciement salaire min, 2 ans"
        }
      },
      "values": {
        "days": "jours",
        "years": "années",
        "months": "mois",
        "resignation": "Démission Volontaire",
        "unjustDismissal": "Licenciement Injustifié",
        "mutualAgreement": "Accord Mutuel",
        "finiquito": "Finiquito",
        "liquidacion": "Liquidación",
        "noLiquidacion": "Non applicable (démission)"
      },
      "formats": {
        "summary": "Votre paiement total estimé est de {totalNet} net ({finiquitoTotal} finiquito + {liquidacionTotal} liquidación − {totalISR} ISR)."
      },
      "infoCards": {
        "metrics": {
          "title": "Détail du Finiquito",
          "items": [
            {
              "label": "Jours Impayés",
              "valueKey": "unpaidDaysAmount"
            },
            {
              "label": "Aguinaldo Proportionnel",
              "valueKey": "aguinaldoProp"
            },
            {
              "label": "Vacances Proportionnelles",
              "valueKey": "vacationProp"
            },
            {
              "label": "Prima Vacacional",
              "valueKey": "primaVacAmount"
            }
          ]
        },
        "details": {
          "title": "Détails de la Liquidación",
          "items": [
            {
              "label": "Indemnisation (90 jours)",
              "valueKey": "indemnification90"
            },
            {
              "label": "20 Jours par Année",
              "valueKey": "twentyDaysPerYear"
            },
            {
              "label": "Prima de Antigüedad",
              "valueKey": "primaAntiguedad"
            },
            {
              "label": "SDI (Salaire Intégré)",
              "valueKey": "sdiDisplay"
            }
          ]
        },
        "tips": {
          "title": "Connaissez Vos Droits",
          "items": [
            "Votre employeur doit payer le finiquito immédiatement ou dans les 3 jours ouvrables. Les retards sont illégaux — contactez PROFEDET (800-911-7877).",
            "NE signez JAMAIS votre finiquito si le montant semble incorrect. Une fois signé, il est très difficile de réclamer plus. Vous avez 1 an pour déposer une réclamation.",
            "Si vous avez été licencié, vous avez droit au finiquito PLUS la liquidación. Si vous avez démissionné, vous ne recevez que le finiquito. Ne laissez pas les employeurs appeler un licenciement une 'démission'.",
            "La prima de antigüedad (12 jours/an) est plafonnée à 2× le salaire minimum (630,08$/jour en 2026). Pour les démissions, elle ne s'applique qu'après 15+ années de service."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Finiquito vs Liquidación : Quelle est la Différence ?",
          "content": "Au Mexique, il existe deux paiements distincts à la fin de l'emploi. Le 'finiquito' (règlement) comprend toute la rémunération gagnée mais impayée : jours de salaire impayés, aguinaldo proportionnel (prime de Noël), jours de vacances proportionnels et prime de vacances (prima vacacional). Chaque travailleur reçoit un finiquito quelle que soit la raison de son départ — démission, licenciement ou accord mutuel. La 'liquidación' (indemnité de licenciement) est une compensation SUPPLÉMENTAIRE payée UNIQUEMENT lorsque le travailleur est licencié sans cause justifiée (despido injustificado). Elle comprend : 3 mois de salaire journalier intégré (indemnización constitucional, Art. 48 LFT), 20 jours par année travaillée (Art. 50 LFT, dans des cas spécifiques), et prima de antigüedad (12 jours par année, Art. 162 LFT). Le total pour licenciement injuste peut représenter 6-15+ mois de salaire selon l'ancienneté, rendant crucial un calcul correct."
        },
        "howItWorks": {
          "title": "Comment Chaque Concept est-il Calculé ?",
          "content": "Tous les calculs commencent par le salaire journalier (mensuel ÷ 30). Pour l'indemnisation, le Salario Diario Integrado (SDI) est utilisé — ceci inclut la valeur proportionnelle de l'aguinaldo et de la prima vacacional intégrée dans le taux journalier. Le facteur SDI pour les prestations minimales (15 jours d'aguinaldo, 25% prima vacacional sur 12 jours de vacances) est d'environ 1,0493. Les jours impayés sont simplement le salaire journalier multiplié par les jours travaillés dans la période actuelle. L'aguinaldo proportionnel est (15 ÷ 365) × jours travaillés cette année × salaire journalier. Les jours de vacances sont déterminés par l'ancienneté selon le tableau officiel LFT (12 jours pour l'année 1, augmentant à 20 en année 5, puis +2 tous les 5 ans). La prime de vacances est de 25% de la paie de vacances. Pour les licenciements, l'indemnisation est 90 × SDI, et la prima de antigüedad est 12 × années × MIN(salaire journalier, 2×salaire minimum). L'ISR est calculé séparément pour le finiquito (Art. 96 normal) et l'indemnisation (Art. 95, avec exemption de 90 UMA)."
        },
        "considerations": {
          "title": "Considérations Clés",
          "items": [
            {
              "text": "Le finiquito doit être payé le jour même ou dans les 3 jours ouvrables suivant la résiliation. Il n'y a aucune excuse légale pour les retards — votre employeur ne peut pas le retenir en attente de 'paperasserie'.",
              "type": "warning"
            },
            {
              "text": "Vous avez exactement 1 an à partir de la date de résiliation pour déposer une réclamation de travail pour les montants impayés (Art. 516 LFT). N'attendez pas — les preuves deviennent plus difficiles à rassembler avec le temps.",
              "type": "warning"
            },
            {
              "text": "Depuis la réforme de 2023 ('Vacaciones Dignas'), les jours de vacances minimums commencent à 12 (pas 6) par an. Assurez-vous que votre employeur utilise le tableau mis à jour.",
              "type": "info"
            },
            {
              "text": "La prima de antigüedad pour démission volontaire n'est obligatoire QUE si vous avez travaillé 15+ années. Pour les licenciements, elle est toujours payée quelle que soit l'ancienneté.",
              "type": "info"
            },
            {
              "text": "Le SDI (Salaire Journalier Intégré) est toujours plus élevé que votre salaire journalier régulier car il inclut l'aguinaldo proportionnel et la prima vacacional. C'est la base pour les calculs d'indemnisation.",
              "type": "info"
            },
            {
              "text": "Si vous croyez que votre licenciement était injustifié, PROFEDET offre une représentation légale GRATUITE. Appelez le 800-911-7877 ou visitez gob.mx/profedet.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Ce que Vous Obtenez selon le Motif de Départ",
          "items": [
            {
              "text": "Démission Volontaire : Jours impayés + aguinaldo proportionnel + vacances proportionnelles + prima vacacional. AUCUNE indemnisation. Prima de antigüedad seulement si 15+ années.",
              "type": "info"
            },
            {
              "text": "Licenciement Injustifié : Tout du finiquito PLUS 90 jours × SDI (indemnisation constitutionnelle) + 20 jours × années × SDI + prima de antigüedad (12 jours/an, toujours).",
              "type": "info"
            },
            {
              "text": "Accord Mutuel : Finiquito + indemnisation négociée (généralement similaire au licenciement). Tout doit être documenté par écrit et signé par les deux parties.",
              "type": "info"
            },
            {
              "text": "Fin de Contrat : Même chose que la démission — finiquito seulement (jours impayés, aguinaldo proportionnel, vacances, prima vacacional). Aucune indemnisation.",
              "type": "info"
            },
            {
              "text": "Licenciement Justifié (Art. 47) : Finiquito seulement. L'employeur doit prouver que la cause était justifiée (vol, violence, absences répétées, etc.).",
              "type": "info"
            },
            {
              "text": "Fermeture d'Entreprise : Liquidación complète s'applique — 3 mois + 20 jours/an + prima de antigüedad + tous les montants de finiquito en attente.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Scénarios réels étape par étape",
          "examples": [
            {
              "title": "Démission après 3 ans (15 000$/mois)",
              "steps": [
                "Salaire journalier : 15 000$ ÷ 30 = 500$",
                "Jours impayés (10) : 500$ × 10 = 5 000$",
                "Aguinaldo prop (6 mois = 182 jours) : (15÷365) × 182 × 500$ = 3 739,73$",
                "Jours de vacances (année 3 = 16 jours) : (16÷365) × 182 × 500$ = 3 989,04$",
                "Prima vacacional : 3 989,04$ × 25% = 997,26$"
              ],
              "result": "Total finiquito : ~13 726$. Aucune liquidación (démission volontaire)."
            },
            {
              "title": "Licenciement Injuste après 5 ans (20 000$/mois)",
              "steps": [
                "Salaire journalier : 666,67$ | Facteur SDI 1,0493 → SDI : 699,53$",
                "Finiquito : jours impayés + aguinaldo + vacances + prima ≈ 15 200$",
                "Indemnisation (90 jours) : 90 × 699,53$ = 62 957,70$",
                "20 jours/an : 20 × 5 × 699,53$ = 69 953,00$",
                "Prima antigüedad : 12 × 5 × MIN(666,67$, 630,08$) = 37 804,80$"
              ],
              "result": "Total : ~185 915$. Environ 9,3 mois de salaire."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la différence entre finiquito et liquidación ?",
          "answer": "Le finiquito est le paiement de la rémunération en attente (salaire impayé, aguinaldo proportionnel, vacances, prima vacacional) et est payé dans TOUTES les résiliations. La liquidación est une indemnisation SUPPLÉMENTAIRE (3 mois de salaire + 20 jours/an + prima de antigüedad) payée UNIQUEMENT dans les licenciements injustifiés. Vous obtenez toujours le finiquito ; vous n'obtenez la liquidación que si vous avez été licencié abusivement."
        },
        {
          "question": "Combien de temps mon employeur a-t-il pour me payer ?",
          "answer": "Le finiquito doit être payé immédiatement à la résiliation ou dans les 3 jours ouvrables au maximum. Il n'y a aucune disposition légale permettant des retards plus longs. Si votre employeur ne paie pas, contactez PROFEDET au 800-911-7877 pour une assistance légale gratuite."
        },
        {
          "question": "Qu'est-ce que le SDI (Salario Diario Integrado) ?",
          "answer": "Le SDI est votre salaire journalier plus la valeur proportionnelle de vos prestations (aguinaldo et prima vacacional). Pour les prestations légales minimales (15 jours d'aguinaldo, 25% prima sur vacances), le facteur SDI est d'environ 1,0493. L'indemnisation est toujours calculée sur le SDI, pas votre salaire journalier régulier."
        },
        {
          "question": "Est-ce que j'obtiens la prima de antigüedad si je démissionne ?",
          "answer": "Seulement si vous avez travaillé 15 ans ou plus dans l'entreprise (Art. 162 LFT). Dans les licenciements injustifiés, la prima de antigüedad est TOUJOURS payée quelle que soit l'ancienneté. Elle est calculée comme 12 jours par année de service, plafonnée à 2× le salaire minimum journalier (630,08$/jour en 2026)."
        },
        {
          "question": "Combien de jours de vacances ai-je droit par la loi ?",
          "answer": "Depuis la réforme 'Vacaciones Dignas' de 2023 : Année 1 = 12 jours, Année 2 = 14, Année 3 = 16, Année 4 = 18, Année 5 = 20. Après cela, +2 jours tous les 5 ans (Années 6-10 = 22, Années 11-15 = 24, etc.). L'ancien tableau avec 6 jours pour l'année 1 n'est plus valide."
        },
        {
          "question": "Le finiquito est-il imposé ?",
          "answer": "Oui, partiellement. Les jours impayés sont imposés comme revenu régulier. L'aguinaldo est exempté jusqu'à 30 UMA (3 519,30$). La prima vacacional est exemptée jusqu'à 15 UMA (1 759,65$). L'indemnisation est exemptée jusqu'à 90 UMA (10 557,90$). La prima de antigüedad est exemptée jusqu'à 90 UMA. Seuls les montants dépassant ces seuils paient l'ISR."
        },
        {
          "question": "Que faire si je pense que le montant de mon finiquito est incorrect ?",
          "answer": "NE signez PAS le document. Une fois signé, il est très difficile de réclamer des montants supplémentaires. Utilisez ce calculateur pour vérifier les chiffres, puis contactez PROFEDET (800-911-7877) pour un examen légal gratuit. Vous avez 1 an à partir de la résiliation pour déposer une réclamation (Art. 516 LFT)."
        },
        {
          "question": "L'accord mutuel donne-t-il la même chose que le licenciement ?",
          "answer": "Pas automatiquement. Dans les accords mutuels, les termes sont négociés. La plupart des employeurs offrent similaire au licenciement injustifié (3 mois + prima de antigüedad) pour éviter les disputes légales. Négociez toujours par écrit et n'acceptez pas moins que ce que la loi prévoit pour un licenciement."
        }
      ],
      "chart": {
        "title": "Répartition des Paiements",
        "xLabel": "",
        "yLabel": "Montant",
        "series": {
          "unpaidDays": "Jours Impayés",
          "aguinaldo": "Aguinaldo",
          "vacation": "Vacances + Prime",
          "indemnification": "Indemnisation",
          "primaAnt": "Prima Antigüedad"
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
      "name": "Abfindungsrechner",
      "slug": "abfindungs-rechner",
      "subtitle": "Berechnen Sie Ihre Abfindung, Liquidation oder Abschlusszahlung für Mexiko und Lateinamerika. Einschließlich ISR, SDI, Urlaubstabelle und gesetzliche Entschädigung.",
      "breadcrumb": "Abfindung",
      "seo": {
        "title": "Abfindungsrechner - Finiquito & Liquidación Mexiko",
        "description": "Berechnen Sie Ihre Abfindung (Finiquito und Liquidación) für Mexiko. Erhalten Sie sofort unbezahlte Löhne, anteiligen Aguinaldo, Urlaub, Prima und Entschädigung sowie ISR.",
        "shortDescription": "Berechnen Sie Finiquito und Liquidación mit offiziellen mexikanischen Arbeitsrechtsformeln.",
        "keywords": [
          "abfindungsrechner",
          "finiquito rechner",
          "liquidacion rechner mexiko",
          "abfindung berechnen",
          "entschädigung berechnen",
          "abfindung mexiko",
          "kündigung entschädigung mexiko",
          "kostenloser abfindungsrechner"
        ]
      },
      "inputs": {
        "country": {
          "label": "Land",
          "helpText": "Wählen Sie Ihr Land zur Anwendung der lokalen Arbeitsgesetze",
          "options": {
            "MX": "🇲🇽 Mexiko",
            "CO": "🇨🇴 Kolumbien",
            "AR": "🇦🇷 Argentinien",
            "PE": "🇵🇪 Peru",
            "BR": "🇧🇷 Brasilien",
            "DO": "🇩🇴 Dominikanische Rep.",
            "GT": "🇬🇹 Guatemala",
            "SV": "🇸🇻 El Salvador",
            "CR": "🇨🇷 Costa Rica",
            "HN": "🇭🇳 Honduras"
          }
        },
        "salaryFrequency": {
          "label": "Zahlungshäufigkeit",
          "helpText": "Wie oft Sie Ihr Gehalt erhalten",
          "options": {
            "monthly": "Monatlich",
            "biweekly": "Zweiwöchentlich (Quincenal)",
            "weekly": "Wöchentlich",
            "daily": "Täglich"
          }
        },
        "salary": {
          "label": "Bruttogehalt",
          "helpText": "Ihr Bruttogehalt (vor Abzügen) für die gewählte Zahlungshäufigkeit"
        },
        "exitReason": {
          "label": "Kündigungsgrund",
          "helpText": "Dies bestimmt, welche Zahlungen anfallen. Ungerechtfertigte Kündigung beinhaltet Entschädigung (3 Monate + 20 Tage/Jahr).",
          "options": {
            "resignation": "Freiwillige Kündigung",
            "unjustDismissal": "Ungerechtfertigte Kündigung",
            "mutualAgreement": "Einvernehmliche Trennung"
          }
        },
        "yearsWorked": {
          "label": "Vollständige Arbeitsjahre",
          "helpText": "Vollständige Jahre der Betriebszugehörigkeit im Unternehmen"
        },
        "monthsWorked": {
          "label": "Zusätzliche Monate",
          "helpText": "Zusätzliche Monate über die vollen Jahre hinaus (0-11)"
        },
        "bonusDays": {
          "label": "Aguinaldo-Tage pro Jahr",
          "helpText": "Mindestens 15 nach Gesetz. Prüfen Sie Ihren Vertrag — manche Unternehmen bieten 20, 30 oder 40 Tage."
        },
        "primaVacPct": {
          "label": "Urlaubsprämie %",
          "helpText": "Mindestens 25% nach Gesetz (Art. 80 LFT). Manche Verträge bieten mehr."
        },
        "pendingVacationDays": {
          "label": "Ausstehende Urlaubstage (Vorjahre)",
          "helpText": "Urlaubstage aus VORHERIGEN Jahren, die Sie nie genommen haben. Diese müssen in Ihrer Abrechnung bezahlt werden."
        },
        "unpaidDays": {
          "label": "Unbezahlte Arbeitstage",
          "helpText": "Tage, die in der aktuellen Zahlungsperiode gearbeitet, aber noch nicht bezahlt wurden."
        }
      },
      "results": {
        "totalNet": {
          "label": "Gesamt-Nettozahlung"
        },
        "finiquitoTotal": {
          "label": "Finiquito (Abrechnung)"
        },
        "liquidacionTotal": {
          "label": "Liquidación (Entschädigung)"
        },
        "totalISR": {
          "label": "Geschätzte ISR-Einbehaltung"
        }
      },
      "presets": {
        "resignationMX": {
          "label": "🚶 Kündigung",
          "description": "Freiwillige Kündigung, 3,5 Jahre, $15K/Monat"
        },
        "dismissalMX": {
          "label": "⚖️ Ungerechtfertigte Kündigung",
          "description": "Kündigung ohne Grund, 5 Jahre, $20K"
        },
        "mutualMX": {
          "label": "🤝 Einvernehmliche Trennung",
          "description": "Verhandelte Trennung, 8 Jahre, $35K"
        },
        "minWageMX": {
          "label": "🇲🇽 Mindestlohn",
          "description": "Mindestlohn-Kündigung, 2 Jahre"
        }
      },
      "values": {
        "days": "Tage",
        "years": "Jahre",
        "months": "Monate",
        "resignation": "Freiwillige Kündigung",
        "unjustDismissal": "Ungerechtfertigte Kündigung",
        "mutualAgreement": "Einvernehmliche Trennung",
        "finiquito": "Finiquito",
        "liquidacion": "Liquidación",
        "noLiquidacion": "Nicht anwendbar (Kündigung)"
      },
      "formats": {
        "summary": "Ihre geschätzte Gesamtzahlung beträgt {totalNet} netto ({finiquitoTotal} Finiquito + {liquidacionTotal} Liquidación − {totalISR} ISR)."
      },
      "infoCards": {
        "metrics": {
          "title": "Finiquito-Aufschlüsselung",
          "items": [
            {
              "label": "Unbezahlte Tage",
              "valueKey": "unpaidDaysAmount"
            },
            {
              "label": "Anteiliger Aguinaldo",
              "valueKey": "aguinaldoProp"
            },
            {
              "label": "Anteiliger Urlaub",
              "valueKey": "vacationProp"
            },
            {
              "label": "Prima Vacacional",
              "valueKey": "primaVacAmount"
            }
          ]
        },
        "details": {
          "title": "Liquidación-Details",
          "items": [
            {
              "label": "Entschädigung (90 Tage)",
              "valueKey": "indemnification90"
            },
            {
              "label": "20 Tage pro Jahr",
              "valueKey": "twentyDaysPerYear"
            },
            {
              "label": "Prima de Antigüedad",
              "valueKey": "primaAntiguedad"
            },
            {
              "label": "SDI (Integriertes Gehalt)",
              "valueKey": "sdiDisplay"
            }
          ]
        },
        "tips": {
          "title": "Kennen Sie Ihre Rechte",
          "items": [
            "Ihr Arbeitgeber muss das Finiquito sofort oder innerhalb von 3 Werktagen zahlen. Verzögerungen sind illegal — kontaktieren Sie PROFEDET (800-911-7877).",
            "Unterschreiben Sie NIEMALS Ihr Finiquito, wenn der Betrag falsch aussieht. Einmal unterschrieben, ist es sehr schwer, mehr zu beanspruchen. Sie haben 1 Jahr für eine Klage.",
            "Wenn Sie gekündigt wurden, haben Sie Anspruch auf Finiquito PLUS Liquidación. Bei eigener Kündigung erhalten Sie nur Finiquito. Lassen Sie nicht zu, dass Arbeitgeber eine Kündigung als 'Resignation' bezeichnen.",
            "Prima de antigüedad (12 Tage/Jahr) ist auf das 2-fache des Mindestlohns begrenzt ($630,08/Tag in 2026). Bei Eigenkünd­igung gilt es nur nach 15+ Dienstjahren."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Finiquito vs Liquidación: Was ist der Unterschied?",
          "content": "In Mexiko gibt es zwei verschiedene Zahlungen bei Beendigung des Arbeitsverhältnisses. Das 'Finiquito' (Abrechnung) umfasst alle verdienten, aber unbezahlten Vergütungen: unbezahlte Gehaltstage, anteiliger Aguinaldo (Weihnachtsbonus), anteilige Urlaubstage und Urlaubsprämie (Prima Vacacional). Jeder Arbeiter erhält Finiquito unabhängig vom Kündigungsgrund — Eigenk­ündigung, Kündigung oder einvernehmliche Trennung. Die 'Liquidación' (Abfindung/Entschädigung) ist ZUSÄTZLICHE Vergütung, die NUR gezahlt wird, wenn der Arbeiter ohne gerechtfertigten Grund gekündigt wird (Despido Injustificado). Sie umfasst: 3 Monate des integrierten Tageslohns (Indemnización Constitucional, Art. 48 LFT), 20 Tage pro Arbeitsjahr (Art. 50 LFT, in bestimmten Fällen) und Prima de Antigüedad (12 Tage pro Jahr, Art. 162 LFT). Die Gesamtsumme für ungerechtfertigte Kündigung kann 6-15+ Monatsgehälter je nach Betriebszugehörigkeit betragen, was eine korrekte Berechnung entscheidend macht."
        },
        "howItWorks": {
          "title": "Wie wird jedes Konzept berechnet?",
          "content": "Alle Berechnungen beginnen mit dem Tageslohn (Monatlich ÷ 30). Für die Entschädigung wird das Salario Diario Integrado (SDI) verwendet — dies beinhaltet den anteiligen Wert von Aguinaldo und Prima Vacacional, eingebaut in den Tagessatz. Der SDI-Faktor für Mindestleistungen (15 Tage Aguinaldo, 25% Prima Vacacional auf 12 Urlaubstage) beträgt etwa 1,0493. Unbezahlte Tage sind einfach der Tageslohn mal gearbeitete Tage in der aktuellen Periode. Anteiliger Aguinaldo ist (15 ÷ 365) × gearbeitete Tage dieses Jahr × Tageslohn. Urlaubstage werden nach Betriebszugehörigkeit anhand der offiziellen LFT-Tabelle bestimmt (12 Tage für Jahr 1, steigend auf 20 bis Jahr 5, dann +2 alle 5 Jahre). Die Urlaubsprämie beträgt 25% der Urlaubsbezahlung. Bei Kün­digungen beträgt die Entschädigung 90 × SDI, und Prima de Antigüedad ist 12 × Jahre × MIN(Tageslohn, 2×Mindestlohn). ISR wird separat für Finiquito (normal Art. 96) und Entschädigung (Art. 95, mit 90 UMA Befreiung) berechnet."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Das Finiquito muss am selben Tag oder innerhalb von 3 Werktagen nach Kündigung bezahlt werden. Es gibt keine rechtliche Ausrede für Verzögerungen — Ihr Arbeitgeber kann es nicht wegen 'Papierkram' zurückhalten.",
              "type": "warning"
            },
            {
              "text": "Sie haben genau 1 Jahr ab Kündigungsdatum, um eine Arbeitsklage für unbezahlte Beträge einzureichen (Art. 516 LFT). Warten Sie nicht — Beweise werden mit der Zeit schwerer zu sammeln.",
              "type": "warning"
            },
            {
              "text": "Seit der Reform 2023 ('Vacaciones Dignas') beginnen Mindesturlaubstage bei 12 (nicht 6) pro Jahr. Stellen Sie sicher, dass Ihr Arbeitgeber die aktualisierte Tabelle verwendet.",
              "type": "info"
            },
            {
              "text": "Prima de Antigüedad bei freiwilliger Kündigung ist NUR bei 15+ Arbeitsjahren verpflichtend. Bei Kündigungen wird sie immer gezahlt, unabhängig von der Betriebszugehörigkeit.",
              "type": "info"
            },
            {
              "text": "Das SDI (Integrierter Tageslohn) ist immer höher als Ihr regulärer Tageslohn, da es anteiliges Aguinaldo und Prima Vacacional beinhaltet. Dies ist die Basis für Entschädigungsberechnungen.",
              "type": "info"
            },
            {
              "text": "Wenn Sie glauben, Ihre Kündigung war ungerechtfertigt, bietet PROFEDET KOSTENLOSE Rechtsvertretung. Rufen Sie 800-911-7877 an oder besuchen Sie gob.mx/profedet.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Was Sie je nach Kündigungsgrund erhalten",
          "items": [
            {
              "text": "Freiwillige Kündigung: Unbezahlte Tage + anteiliger Aguinaldo + anteiliger Urlaub + Prima Vacacional. KEINE Entschädigung. Prima de Antigüedad nur bei 15+ Jahren.",
              "type": "info"
            },
            {
              "text": "Ungerechtfertigte Kündigung: Alles aus Finiquito PLUS 90 Tage × SDI (verfassungsrechtliche Entschädigung) + 20 Tage × Jahre × SDI + Prima de Antigüedad (12 Tage/Jahr, immer).",
              "type": "info"
            },
            {
              "text": "Einvernehmliche Trennung: Finiquito + verhandelte Entschädigung (meist ähnlich wie Kündigung). Alles muss schriftlich dokumentiert und von beiden Parteien unterzeichnet werden.",
              "type": "info"
            },
            {
              "text": "Vertragsende: Wie Kündigung — nur Finiquito (unbezahlte Tage, anteiliger Aguinaldo, Urlaub, Prima Vacacional). Keine Entschädigung.",
              "type": "info"
            },
            {
              "text": "Gerechtfertigte Kündigung (Art. 47): Nur Finiquito. Der Arbeitgeber muss beweisen, dass der Grund gerechtfertigt war (Diebstahl, Gewalt, wiederholtes Fehlen, etc.).",
              "type": "info"
            },
            {
              "text": "Unternehmenssschließung: Vollständige Liquidación gilt — 3 Monate + 20 Tage/Jahr + Prima de Antigüedad + alle ausstehenden Finiquito-Beträge.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt reale Szenarien",
          "examples": [
            {
              "title": "Kündigung nach 3 Jahren ($15.000/Monat)",
              "steps": [
                "Tageslohn: $15.000 ÷ 30 = $500",
                "Unbezahlte Tage (10): $500 × 10 = $5.000",
                "Aguinaldo anteilig (6 Monate = 182 Tage): (15÷365) × 182 × $500 = $3.739,73",
                "Urlaubstage (Jahr 3 = 16 Tage): (16÷365) × 182 × $500 = $3.989,04",
                "Prima Vacacional: $3.989,04 × 25% = $997,26"
              ],
              "result": "Gesamt-Finiquito: ~$13.726. Keine Liquidación (freiwillige Kündigung)."
            },
            {
              "title": "Ungerechtfertigte Kündigung nach 5 Jahren ($20.000/Monat)",
              "steps": [
                "Tageslohn: $666,67 | SDI-Faktor 1,0493 → SDI: $699,53",
                "Finiquito: unbezahlte Tage + Aguinaldo + Urlaub + Prima ≈ $15.200",
                "Entschädigung (90 Tage): 90 × $699,53 = $62.957,70",
                "20 Tage/Jahr: 20 × 5 × $699,53 = $69.953,00",
                "Prima Antigüedad: 12 × 5 × MIN($666,67, $630,08) = $37.804,80"
              ],
              "result": "Gesamt: ~$185.915. Etwa 9,3 Monatsgehälter."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist der Unterschied zwischen Finiquito und Liquidación?",
          "answer": "Finiquito ist die Zahlung ausstehender Vergütungen (unbezahltes Gehalt, anteiliger Aguinaldo, Urlaub, Prima Vacacional) und wird bei ALLEN Kündigungen gezahlt. Liquidación ist ZUSÄTZLICHE Entschädigung (3 Monatsgehälter + 20 Tage/Jahr + Prima de Antigüedad), die NUR bei ungerechtfertigten Kündigungen gezahlt wird. Sie erhalten immer Finiquito; Sie erhalten nur Liquidación, wenn Sie unrechtmäßig gekündigt wurden."
        },
        {
          "question": "Wie lange hat mein Arbeitgeber Zeit, mich zu bezahlen?",
          "answer": "Das Finiquito muss sofort bei Kündigung oder innerhalb von höchstens 3 Werktagen bezahlt werden. Es gibt keine gesetzliche Bestimmung, die längere Verzögerungen erlaubt. Wenn Ihr Arbeitgeber nicht zahlt, kontaktieren Sie PROFEDET unter 800-911-7877 für kostenlose Rechtsberatung."
        },
        {
          "question": "Was ist das SDI (Salario Diario Integrado)?",
          "answer": "Das SDI ist Ihr Tageslohn plus der anteilige Wert Ihrer Leistungen (Aguinaldo und Prima Vacacional). Für gesetzliche Mindestleistungen (15 Tage Aguinaldo, 25% Prima auf Urlaub) beträgt der SDI-Faktor etwa 1,0493. Entschädigung wird immer auf SDI berechnet, nicht auf Ihren regulären Tageslohn."
        },
        {
          "question": "Erhalte ich Prima de Antigüedad, wenn ich kündige?",
          "answer": "Nur wenn Sie 15 oder mehr Jahre im Unternehmen gearbeitet haben (Art. 162 LFT). Bei ungerechtfertigten Kündigungen wird Prima de Antigüedad IMMER gezahlt, unabhängig von der Betriebszugehörigkeit. Sie wird als 12 Tage pro Dienstjahr berechnet, begrenzt auf das 2-fache des täglichen Mindestlohns ($630,08/Tag in 2026)."
        },
        {
          "question": "Wie viele Urlaubstage stehen mir gesetzlich zu?",
          "answer": "Seit der Reform 'Vacaciones Dignas' 2023: Jahr 1 = 12 Tage, Jahr 2 = 14, Jahr 3 = 16, Jahr 4 = 18, Jahr 5 = 20. Danach +2 Tage alle 5 Jahre (Jahre 6-10 = 22, Jahre 11-15 = 24, etc.). Die alte Tabelle mit 6 Tagen für Jahr 1 ist nicht mehr gültig."
        },
        {
          "question": "Wird das Finiquito besteuert?",
          "answer": "Ja, teilweise. Unbezahlte Tage werden als reguläres Einkommen besteuert. Aguinaldo ist bis zu 30 UMA ($3.519,30) befreit. Prima Vacacional ist bis zu 15 UMA ($1.759,65) befreit. Entschädigung ist bis zu 90 UMA ($10.557,90) befreit. Prima de Antigüedad ist bis zu 90 UMA befreit. Nur Beträge über diesen Schwellenwerten zahlen ISR."
        },
        {
          "question": "Was, wenn ich denke, mein Finiquito-Betrag ist falsch?",
          "answer": "Unterschreiben Sie das Dokument NICHT. Einmal unterschrieben, ist es sehr schwierig, zusätzliche Beträge zu beanspruchen. Verwenden Sie diesen Rechner zur Überprüfung der Zahlen, dann kontaktieren Sie PROFEDET (800-911-7877) für kostenlose rechtliche Prüfung. Sie haben 1 Jahr ab Kündigung für eine Klage (Art. 516 LFT)."
        },
        {
          "question": "Erhält man bei einvernehmlicher Trennung dasselbe wie bei Kündigung?",
          "answer": "Nicht automatisch. Bei einvernehmlichen Trennungen werden die Bedingungen verhandelt. Die meisten Arbeitgeber bieten ähnlich wie bei ungerechtfertigter Kündigung (3 Monate + Prima de Antigüedad), um Rechtsstreitigkeiten zu vermeiden. Verhandeln Sie immer schriftlich und akzeptieren Sie nicht weniger als das Gesetz für eine Kündigung vorsieht."
        }
      ],
      "chart": {
        "title": "Zahlungsaufschlüsselung",
        "xLabel": "",
        "yLabel": "Betrag",
        "series": {
          "unpaidDays": "Unbezahlte Tage",
          "aguinaldo": "Aguinaldo",
          "vacation": "Urlaub + Prima",
          "indemnification": "Entschädigung",
          "primaAnt": "Prima Antigüedad"
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

  inputs: [
    {
      id: "country",
      type: "select",
      defaultValue: "MX",
      options: [
        { value: "MX" }, { value: "CO" }, { value: "AR" }, { value: "PE" },
        { value: "BR" }, { value: "DO" }, { value: "GT" }, { value: "SV" },
        { value: "CR" }, { value: "HN" },
      ],
    },
    {
      id: "exitReason",
      type: "select",
      defaultValue: "resignation",
      options: [
        { value: "resignation" },
        { value: "unjustDismissal" },
        { value: "mutualAgreement" },
      ],
    },
    {
      id: "salaryFrequency",
      type: "select",
      defaultValue: "monthly",
      options: [
        { value: "monthly" }, { value: "biweekly" },
        { value: "weekly" }, { value: "daily" },
      ],
    },
    {
      id: "salary",
      type: "number",
      defaultValue: null,
      placeholder: "15000",
      min: 1,
    },
    {
      id: "yearsWorked",
      type: "stepper",
      defaultValue: 1,
      min: 0,
      max: 50,
      step: 1,
      suffix: "years",
    },
    {
      id: "monthsWorked",
      type: "stepper",
      defaultValue: 0,
      min: 0,
      max: 11,
      step: 1,
      suffix: "months",
    },
    {
      id: "unpaidDays",
      type: "number",
      defaultValue: 15,
      min: 0,
      max: 31,
      step: 1,
      suffix: "days",
    },
    {
      id: "bonusDays",
      type: "stepper",
      defaultValue: 15,
      min: 15,
      max: 90,
      step: 1,
      suffix: "days",
      showWhen: { field: "country", value: "MX" },
    },
    {
      id: "primaVacPct",
      type: "number",
      defaultValue: 25,
      min: 25,
      max: 100,
      step: 1,
      suffix: "%",
      showWhen: { field: "country", value: "MX" },
    },
    {
      id: "pendingVacationDays",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      min: 0,
      max: 60,
      step: 1,
      suffix: "days",
    },
  ],

  inputGroups: [],

  results: [
    { id: "totalNet", type: "primary", format: "text" },
    { id: "finiquitoTotal", type: "secondary", format: "text" },
    { id: "liquidacionTotal", type: "secondary", format: "text" },
    { id: "totalISR", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "⚖️", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "severanceBreakdown",
    type: "bar",
    xKey: "label",
    height: 300,
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "unpaidDays", type: "bar", stackId: "pay", color: "#6366f1" },
      { key: "aguinaldo", type: "bar", stackId: "pay", color: "#10b981" },
      { key: "vacation", type: "bar", stackId: "pay", color: "#f59e0b" },
      { key: "indemnification", type: "bar", stackId: "pay", color: "#ef4444" },
      { key: "primaAnt", type: "bar", stackId: "pay", color: "#8b5cf6" },
    ],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [
    { id: "0" }, { id: "1" }, { id: "2" }, { id: "3" },
    { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" },
  ],

  references: [
    {
      authors: "Cámara de Diputados de México",
      year: "2026",
      title: "Ley Federal del Trabajo — Art. 48, 50, 76-87, 162 (Finiquito, Liquidación, Vacaciones, Prima)",
      source: "Diario Oficial de la Federación",
      url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf",
    },
    {
      authors: "CONASAMI",
      year: "2026",
      title: "Salario Mínimo General 2026: $315.04/día | Zona Frontera: $473.45/día",
      source: "Comisión Nacional de los Salarios Mínimos",
      url: "https://www.gob.mx/conasami",
    },
    {
      authors: "SAT / INEGI",
      year: "2026",
      title: "UMA 2026: $117.31/día | Tablas ISR Art. 95-96 LISR | Resolución Miscelánea Fiscal",
      source: "SAT México / INEGI",
      url: "https://www.sat.gob.mx/",
    },
  ],

  hero: { badge: "Finance", badgeVariant: "blue" },
  sidebar: {},
  features: {},
  relatedCalculators: ["christmas-bonus", "salary", "compound-interest"],
  ads: {},
};

// ═══════════════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════════
export function calculateSeverance(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
  country?: string;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ───────────────────────────────────────────────────
  const country = (values.country as string) || "MX";
  const salaryFrequency = (values.salaryFrequency as string) || "monthly";
  const salaryRaw = values.salary as number | null;
  const exitReason = (values.exitReason as string) || "resignation";
  const yearsWorked = (values.yearsWorked as number) || 0;
  const monthsWorked = (values.monthsWorked as number) || 0;
  const bonusDays = (values.bonusDays as number) || 15;
  const primaVacPct = ((values.primaVacPct as number) || 25) / 100;
  const pendingVacDays = (values.pendingVacationDays as number) || 0;
  const unpaidDays = (values.unpaidDays as number) || 0;

  // ── Currency ──────────────────────────────────────────────────────
  const curr = COUNTRY_CURRENCY[country] || COUNTRY_CURRENCY.MX;
  const sym = curr.symbol;

  // ── Validate ──────────────────────────────────────────────────────
  if (salaryRaw === null || salaryRaw <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Daily salary ──────────────────────────────────────────────────
  let dailySalary: number;
  let monthlyEquivalent: number;

  switch (salaryFrequency) {
    case "biweekly":
      dailySalary = salaryRaw / 15;
      monthlyEquivalent = salaryRaw * 2;
      break;
    case "weekly":
      dailySalary = salaryRaw / 7;
      monthlyEquivalent = dailySalary * 30;
      break;
    case "daily":
      dailySalary = salaryRaw;
      monthlyEquivalent = salaryRaw * 30;
      break;
    default:
      dailySalary = salaryRaw / 30;
      monthlyEquivalent = salaryRaw;
      break;
  }

  // ── Total seniority in days ───────────────────────────────────────
  const totalYears = yearsWorked + (monthsWorked / 12);
  const totalDaysWorked = Math.round(totalYears * 365);
  const daysWorkedThisYear = Math.min(365, Math.round(monthsWorked * 30.4) + (yearsWorked > 0 ? 0 : 0));
  // For proportional calculations: days in current calendar year
  const daysInCurrentYear = monthsWorked > 0 ? Math.round(monthsWorked * 30.4) : 365;

  // ── Vacation days by seniority ────────────────────────────────────
  const vacDaysByLaw = getVacationDays(Math.max(1, Math.ceil(totalYears)));

  // ── SDI (Salario Diario Integrado) ────────────────────────────────
  // SDI = SD × (1 + aguinaldo/365 + (vacDays × primaVacPct) / 365)
  const sdiIntegrationFactor = 1 + (bonusDays / 365) + ((vacDaysByLaw * primaVacPct) / 365);
  const sdi = dailySalary * sdiIntegrationFactor;

  // ═══════════════════════════════════════════════════════════════════
  // FINIQUITO (always paid, all exit reasons)
  // ═══════════════════════════════════════════════════════════════════

  // 1. Unpaid days worked
  const unpaidDaysAmount = dailySalary * unpaidDays;

  // 2. Proportional aguinaldo: (bonusDays ÷ 365) × daysInCurrentYear × SD
  const aguinaldoProp = (bonusDays / 365) * daysInCurrentYear * dailySalary;

  // 3. Proportional vacation: (vacDays ÷ 365) × daysInCurrentYear × SD
  const vacationPropDays = (vacDaysByLaw / 365) * daysInCurrentYear;
  const vacationPropAmount = vacationPropDays * dailySalary;

  // 4. Prima vacacional on proportional vacation
  const primaVacAmount = vacationPropAmount * primaVacPct;

  // 5. Pending vacation from previous years
  const pendingVacAmount = pendingVacDays * dailySalary;
  const pendingPrimaVac = pendingVacAmount * primaVacPct;

  const finiquitoGross = unpaidDaysAmount + aguinaldoProp + vacationPropAmount + primaVacAmount + pendingVacAmount + pendingPrimaVac;

  // ═══════════════════════════════════════════════════════════════════
  // LIQUIDACIÓN (only for unjust dismissal or mutual agreement)
  // ═══════════════════════════════════════════════════════════════════

  let indemnification90 = 0;
  let twentyDaysPerYear = 0;
  let primaAntiguedad = 0;
  let liquidacionGross = 0;
  const includesLiquidacion = exitReason === "unjustDismissal" || exitReason === "mutualAgreement";

  if (includesLiquidacion) {
    // Constitutional indemnification: 90 days × SDI (Art. 48 LFT)
    indemnification90 = 90 * sdi;

    // 20 days per year worked × SDI (Art. 50 LFT)
    twentyDaysPerYear = 20 * Math.max(1, Math.ceil(totalYears)) * sdi;

    // Prima de antigüedad: 12 days × years × MIN(SD, 2×SM) (Art. 162 LFT)
    const primaBase = Math.min(dailySalary, PRIMA_ANTIGUEDAD_TOPE);
    primaAntiguedad = 12 * Math.max(1, Math.ceil(totalYears)) * primaBase;

    liquidacionGross = indemnification90 + twentyDaysPerYear + primaAntiguedad;
  } else if (exitReason === "resignation" && totalYears >= 15) {
    // Resignation with 15+ years: prima de antigüedad applies (Art. 162 LFT)
    const primaBase = Math.min(dailySalary, PRIMA_ANTIGUEDAD_TOPE);
    primaAntiguedad = 12 * Math.ceil(totalYears) * primaBase;
    liquidacionGross = primaAntiguedad;
  }

  // ═══════════════════════════════════════════════════════════════════
  // ISR (Simplified estimation)
  // ═══════════════════════════════════════════════════════════════════

  // ISR Finiquito: normal monthly Art. 96 method
  const finiquitoISR = calcISR96(finiquitoGross) * 0.4; // Simplified: ~40% effective on finiquito components

  // ISR Liquidación: Art. 95 LISR — exempt up to 90 UMA
  let liquidacionISR = 0;
  if (liquidacionGross > 0) {
    const exemptAmount = 90 * UMA_DAILY_2026; // $10,557.90
    const taxableLiq = Math.max(0, liquidacionGross - exemptAmount);
    if (taxableLiq > 0) {
      // Simplified: apply effective rate from Art. 96 table
      liquidacionISR = calcISR96(taxableLiq / 12) * 0.5; // Simplified estimation
    }
  }

  const totalISR = Math.max(0, finiquitoISR + liquidacionISR);
  const totalGross = finiquitoGross + liquidacionGross;
  const totalNet = totalGross - totalISR;

  // ── Exit reason label ─────────────────────────────────────────────
  const reasonLabels: Record<string, string> = {
    resignation: v["resignation"] || "Voluntary Resignation",
    unjustDismissal: v["unjustDismissal"] || "Unjustified Dismissal",
    mutualAgreement: v["mutualAgreement"] || "Mutual Agreement",
  };

  // ── Chart data ────────────────────────────────────────────────────
  const chartData = [{
    label: "Your Payment",
    unpaidDays: unpaidDaysAmount,
    aguinaldo: aguinaldoProp,
    vacation: vacationPropAmount + primaVacAmount + pendingVacAmount + pendingPrimaVac,
    indemnification: indemnification90 + twentyDaysPerYear,
    primaAnt: primaAntiguedad,
  }];

  // ── Format ────────────────────────────────────────────────────────
  const formatted: Record<string, string> = {
    totalNet: fmtC(totalNet, sym),
    finiquitoTotal: fmtC(finiquitoGross, sym),
    liquidacionTotal: includesLiquidacion || primaAntiguedad > 0
      ? fmtC(liquidacionGross, sym)
      : (v["noLiquidacion"] || "Not applicable"),
    totalISR: fmtC(totalISR, sym),
    // InfoCard: Finiquito
    unpaidDaysAmount: `${fmtC(unpaidDaysAmount, sym)} (${unpaidDays} ${v["days"] || "days"})`,
    aguinaldoProp: fmtC(aguinaldoProp, sym),
    vacationProp: `${fmtC(vacationPropAmount, sym)} (${vacationPropDays.toFixed(1)} ${v["days"] || "days"})`,
    primaVacAmount: fmtC(primaVacAmount + pendingPrimaVac, sym),
    // InfoCard: Liquidación
    indemnification90: includesLiquidacion ? `${fmtC(indemnification90, sym)} (90 ${v["days"] || "days"} × SDI)` : "N/A",
    twentyDaysPerYear: includesLiquidacion ? `${fmtC(twentyDaysPerYear, sym)} (20 × ${Math.ceil(totalYears)} ${v["years"] || "yrs"})` : "N/A",
    primaAntiguedad: primaAntiguedad > 0 ? `${fmtC(primaAntiguedad, sym)} (12 × ${Math.ceil(totalYears)} ${v["years"] || "yrs"})` : "N/A",
    sdiDisplay: `${fmtC(sdi, sym)}/day (factor: ${sdiIntegrationFactor.toFixed(4)})`,
    // Extra
    dailySalary: fmtC(dailySalary, sym),
    monthlyEquivalent: fmtC(monthlyEquivalent, sym),
    vacDaysByLaw: `${vacDaysByLaw} ${v["days"] || "days"} (${Math.ceil(totalYears)} ${v["years"] || "yrs"} seniority)`,
    exitReasonLabel: reasonLabels[exitReason] || exitReason,
    totalMonthsEquivalent: `≈ ${(totalGross / monthlyEquivalent).toFixed(1)} ${v["months"] || "months"} of salary`,
  };

  // ── Summary ───────────────────────────────────────────────────────
  const summary = f.summary
    ?.replace("{totalNet}", formatted.totalNet)
    ?.replace("{finiquitoTotal}", formatted.finiquitoTotal)
    ?.replace("{liquidacionTotal}", formatted.liquidacionTotal)
    ?.replace("{totalISR}", formatted.totalISR)
    || `Total payment: ${formatted.totalNet} net (${formatted.finiquitoTotal} finiquito + ${formatted.liquidacionTotal} liquidación − ${formatted.totalISR} ISR).`;

  return {
    values: {
      totalNet,
      finiquitoTotal: finiquitoGross,
      liquidacionTotal: liquidacionGross,
      totalISR,
      unpaidDaysAmount,
      aguinaldoProp,
      vacationProp: vacationPropAmount,
      primaVacAmount: primaVacAmount + pendingPrimaVac,
      indemnification90,
      twentyDaysPerYear,
      primaAntiguedad,
      sdi,
      dailySalary,
      monthlyEquivalent,
      vacDaysByLaw,
    },
    formatted,
    summary,
    isValid: true,
    metadata: { chartData },
  };
}

export default severanceCalculatorConfig;
