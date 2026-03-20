import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════════
// 🎄 CHRISTMAS BONUS CALCULATOR (Aguinaldo / 13th Month / Prima)
// ═══════════════════════════════════════════════════════════════════════
// Multi-country Christmas bonus calculator for Latin America.
// Geo-detection auto-selects country. Phase 1: Mexico (highest volume).
// FEATURES vs competitors:
//   ✅ Multi-country (10 countries) — NO competitor has this
//   ✅ Two ISR methods: Art. 96 LISR + Art. 174 RLISR
//   ✅ Real ISR 2026 monthly tax tables
//   ✅ Salary frequency: monthly/biweekly/weekly/daily
//   ✅ Full year toggle + proportional days
//   ✅ UMA 2026 value in results
//   ✅ Geo-detection auto-selects country + currency
//   ✅ Detailed ISR breakdown (exempt, taxable, rate, cuota fija)
// ═══════════════════════════════════════════════════════════════════════

// ─── ISR Monthly Table 2026 (Art. 96 LISR, Anexo 8 RMF) ─────────────
// Source: SAT / Resolución Miscelánea Fiscal 2026
const ISR_TABLE_MONTHLY_2026 = [
  { lowerLimit: 0.01,      upperLimit: 746.04,      fixedFee: 0,         rate: 0.0192 },
  { lowerLimit: 746.05,    upperLimit: 6332.05,     fixedFee: 14.32,     rate: 0.0640 },
  { lowerLimit: 6332.06,   upperLimit: 11128.01,    fixedFee: 371.83,    rate: 0.1088 },
  { lowerLimit: 11128.02,  upperLimit: 12935.82,    fixedFee: 893.63,    rate: 0.1600 },
  { lowerLimit: 12935.83,  upperLimit: 15487.71,    fixedFee: 1182.88,   rate: 0.1792 },
  { lowerLimit: 15487.72,  upperLimit: 31236.49,    fixedFee: 1640.18,   rate: 0.2136 },
  { lowerLimit: 31236.50,  upperLimit: 49233.00,    fixedFee: 5004.12,   rate: 0.2352 },
  { lowerLimit: 49233.01,  upperLimit: 93993.90,    fixedFee: 8233.40,   rate: 0.3000 },
  { lowerLimit: 93993.91,  upperLimit: 125325.20,   fixedFee: 21661.67,  rate: 0.3200 },
  { lowerLimit: 125325.21, upperLimit: 375975.61,   fixedFee: 31667.83,  rate: 0.3400 },
  { lowerLimit: 375975.62, upperLimit: Infinity,     fixedFee: 116888.77, rate: 0.3500 },
];

// ─── UMA 2026 ────────────────────────────────────────────────────────
const UMA_DAILY_2026 = 117.31;
const UMA_EXEMPT_DAYS = 30;

// ─── Calculate ISR using Art. 96 table ───────────────────────────────
function calculateISRArt96(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  for (const bracket of ISR_TABLE_MONTHLY_2026) {
    if (taxableIncome >= bracket.lowerLimit && taxableIncome <= bracket.upperLimit) {
      const excess = taxableIncome - bracket.lowerLimit;
      return bracket.fixedFee + (excess * bracket.rate);
    }
  }
  const last = ISR_TABLE_MONTHLY_2026[ISR_TABLE_MONTHLY_2026.length - 1];
  return last.fixedFee + ((taxableIncome - last.lowerLimit) * last.rate);
}

// ─── Find ISR bracket for display ────────────────────────────────────
function findBracket(taxableIncome: number) {
  for (const bracket of ISR_TABLE_MONTHLY_2026) {
    if (taxableIncome >= bracket.lowerLimit && taxableIncome <= bracket.upperLimit) {
      return bracket;
    }
  }
  return ISR_TABLE_MONTHLY_2026[ISR_TABLE_MONTHLY_2026.length - 1];
}

// ─── Country Data ────────────────────────────────────────────────────
const COUNTRY_DATA: Record<string, {
  minBonusDays: number;
  maxBonusDays: number;
  defaultBonusDays: number;
  periodDays: number;
  hasISR: boolean;
  label: string;
  bonusName: string;
}> = {
  MX: { minBonusDays: 15, maxBonusDays: 90, defaultBonusDays: 15, periodDays: 365, hasISR: true, label: "Mexico", bonusName: "Aguinaldo" },
  CO: { minBonusDays: 30, maxBonusDays: 30, defaultBonusDays: 30, periodDays: 360, hasISR: false, label: "Colombia", bonusName: "Prima de Servicios" },
  AR: { minBonusDays: 30, maxBonusDays: 30, defaultBonusDays: 30, periodDays: 365, hasISR: false, label: "Argentina", bonusName: "SAC" },
  PE: { minBonusDays: 30, maxBonusDays: 30, defaultBonusDays: 30, periodDays: 365, hasISR: false, label: "Peru", bonusName: "Gratificación" },
  BR: { minBonusDays: 30, maxBonusDays: 30, defaultBonusDays: 30, periodDays: 365, hasISR: true, label: "Brazil", bonusName: "13º Salário" },
  DO: { minBonusDays: 30, maxBonusDays: 30, defaultBonusDays: 30, periodDays: 365, hasISR: false, label: "Dominican Republic", bonusName: "Salario de Navidad" },
  GT: { minBonusDays: 30, maxBonusDays: 30, defaultBonusDays: 30, periodDays: 365, hasISR: false, label: "Guatemala", bonusName: "Aguinaldo" },
  SV: { minBonusDays: 15, maxBonusDays: 21, defaultBonusDays: 15, periodDays: 365, hasISR: false, label: "El Salvador", bonusName: "Aguinaldo" },
  CR: { minBonusDays: 30, maxBonusDays: 30, defaultBonusDays: 30, periodDays: 365, hasISR: false, label: "Costa Rica", bonusName: "Aguinaldo" },
  HN: { minBonusDays: 30, maxBonusDays: 30, defaultBonusDays: 30, periodDays: 365, hasISR: false, label: "Honduras", bonusName: "Décimo Tercer Mes" },
};

// ─── Country → Currency mapping ──────────────────────────────────────
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

function fmtCurr(val: number, sym: string): string {
  if (val === 0) return `${sym}0.00`;
  return `${sym}${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ═══════════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════════
export const christmasBonusConfig: CalculatorConfigV4 = {
  id: "christmas-bonus",
  version: "4.0",
  category: "finance",
  icon: "🎄",

  presets: [
    {
      id: "mexicoMinWage",
      icon: "🇲🇽",
      values: {
        country: "MX", salaryFrequency: "monthly", salary: 7468,
        bonusDays: 15, workedFullYear: true, daysWorked: 365,
        calculateISR: true, isrMethod: "art174",
      },
    },
    {
      id: "mexicoAverage",
      icon: "💼",
      values: {
        country: "MX", salaryFrequency: "monthly", salary: 15000,
        bonusDays: 15, workedFullYear: true, daysWorked: 365,
        calculateISR: true, isrMethod: "art174",
      },
    },
    {
      id: "mexicoProfessional",
      icon: "🏢",
      values: {
        country: "MX", salaryFrequency: "monthly", salary: 35000,
        bonusDays: 30, workedFullYear: true, daysWorked: 365,
        calculateISR: true, isrMethod: "art174",
      },
    },
    {
      id: "mexicoPartYear",
      icon: "📅",
      values: {
        country: "MX", salaryFrequency: "monthly", salary: 12000,
        bonusDays: 15, workedFullYear: false, daysWorked: 180,
        calculateISR: true, isrMethod: "art174",
      },
    },
  ],

  t: {
    en: {
      name: "Christmas Bonus Calculator",
      slug: "christmas-bonus-calculator",
      subtitle: "Calculate your aguinaldo, 13th month pay, or Christmas bonus for Mexico and Latin America with ISR tax estimation using official Art. 96 and Art. 174 methods.",
      breadcrumb: "Christmas Bonus",

      seo: {
        title: "Christmas Bonus Calculator - Aguinaldo & 13th Month Pay",
        description: "Calculate your Christmas bonus (aguinaldo) for Mexico and Latin America. Get gross bonus, ISR tax with official Art. 96 and Art. 174 methods, net amount instantly.",
        shortDescription: "Calculate your aguinaldo or Christmas bonus with official ISR methods.",
        keywords: [
          "christmas bonus calculator",
          "aguinaldo calculator",
          "13th month pay calculator",
          "calculate aguinaldo mexico",
          "aguinaldo ISR tax",
          "free aguinaldo calculator",
          "calculadora de aguinaldo",
          "bonus calculator latin america",
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
          helpText: "Select your country to apply local bonus rules and tax laws",
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
        bonusDays: {
          label: "Bonus Days",
          helpText: "Days your employer pays as bonus (minimum 15 by law in Mexico). Check your contract.",
        },
        workedFullYear: {
          label: "Worked Full Year (365 days)",
          helpText: "Turn off if you started this year or didn't work the full 365 days",
        },
        daysWorked: {
          label: "Days Worked This Year",
          helpText: "Calendar days from your start date to Dec 20. Example: started July 1 ≈ 173 days.",
        },
        calculateISR: {
          label: "Calculate ISR (Income Tax)",
          helpText: "Estimate income tax using official SAT tables and UMA 2026 ($117.31/day)",
        },
        isrMethod: {
          label: "ISR Calculation Method",
          helpText: "Art. 174 usually results in lower tax. Your employer chooses the method.",
          options: {
            art96: "Art. 96 LISR (Direct)",
            art174: "Art. 174 RLISR (Annualized — lower tax)",
          },
        },
        yearsOfService: {
          label: "Years of Service",
          helpText: "Seniority determines bonus: 1-3 yrs = 15 days, 3-10 = 19 days, 10+ = 21 days",
        },
      },

      results: {
        grossBonus: { label: "Gross Bonus" },
        taxExempt: { label: "Tax Exempt (30 UMA)" },
        taxableAmount: { label: "Taxable Amount (Gravado)" },
        netBonus: { label: "Estimated Net Bonus" },
      },

      presets: {
        mexicoMinWage: { label: "🇲🇽 Minimum Wage", description: "Mexico min. wage, 15 days bonus" },
        mexicoAverage: { label: "🇲🇽 Average Salary", description: "Mexico $15K/month, 15 days" },
        mexicoProfessional: { label: "🇲🇽 Professional", description: "Mexico $35K/month, 30 days" },
        mexicoPartYear: { label: "📅 Part-Year", description: "Mexico, worked 6 months" },
      },

      values: {
        "days": "days",
        "day": "day",
        "exempt": "exempt",
        "taxable": "taxable",
        "fullYear": "Full year",
        "proportional": "Proportional",
        "noTax": "Tax-exempt in this country",
        "umaLabel": "UMA",
        "art96Label": "Art. 96 LISR (Direct)",
        "art174Label": "Art. 174 RLISR (Annualized)",
        "effectiveRate": "Effective rate",
        "fullyExempt": "Fully exempt (below 30 UMA)",
      },

      formats: {
        summary: "Your estimated Christmas bonus is {grossBonus} gross ({netBonus} net after taxes).",
      },

      infoCards: {
        metrics: {
          title: "Salary Breakdown",
          items: [
            { label: "Daily Salary", valueKey: "dailySalary" },
            { label: "Monthly Equivalent", valueKey: "monthlyEquivalent" },
            { label: "Bonus Days", valueKey: "bonusDaysUsed" },
            { label: "Proportional Factor", valueKey: "proportionalFactor" },
          ],
        },
        details: {
          title: "Calculation Details",
          items: [
            { label: "Formula Used", valueKey: "formulaUsed" },
            { label: "Tax/Legal Basis", valueKey: "isrMethodLabel" },
            { label: "Deductions", valueKey: "isrAmount" },
            { label: "Effective Rate", valueKey: "effectiveRate" },
          ],
        },
        tips: {
          title: "Important Tips",
          items: [
            "Your employer must pay the bonus by December 20th. Late payment can result in fines up to 5,000× the daily minimum wage.",
            "The legal minimum is 15 days. Many companies offer 20-40 days — check your contract or ask HR.",
            "Art. 174 (RLISR) usually results in lower ISR because it annualizes the bonus instead of adding it to one month.",
            "The 30 UMA exemption ($3,519.30 MXN in 2026) is NEVER prorated — even partial-year workers get the full exemption.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is the Christmas Bonus (Aguinaldo)?",
          content: "The Christmas bonus, known as 'aguinaldo' in Mexico and much of Latin America, is a legally mandated annual payment that employers must give to their workers. In Mexico, Article 87 of the Federal Labor Law requires employers to pay at least 15 days of salary as a year-end bonus, delivered no later than December 20th. This benefit was established in 1970 and applies to all workers with a formal employment relationship, including domestic workers, part-time employees, and seasonal staff. The aguinaldo serves as financial support during the holiday season and is one of the most important worker benefits in the region. Many companies voluntarily offer more than the legal minimum — 20, 30, or even 40 days — as part of their compensation package to attract and retain talent. Recent legislative proposals have sought to increase the minimum to 30 days, though as of 2026 the legal minimum remains at 15 days.",
        },
        howItWorks: {
          title: "How Is the Bonus Calculated? (Including ISR Methods)",
          content: "The calculation starts with your daily salary (monthly ÷ 30, biweekly ÷ 15, weekly ÷ 7). This daily rate is multiplied by your bonus days. If you didn't work the full year, the bonus is proportional: (Daily Salary × Bonus Days × Days Worked) ÷ 365. For ISR in Mexico, the first 30 UMA ($3,519.30 MXN in 2026) is always exempt. For the taxable remainder, there are TWO official methods. The Art. 96 method adds the taxable bonus directly to your monthly salary and applies the ISR table — this can push you into a higher bracket, resulting in more tax. The Art. 174 method (Reglamento) divides the taxable bonus by 365, multiplies by 30.4 to get a monthly equivalent, calculates the ISR difference (with vs without bonus), and derives an effective rate — this method typically results in 15-30% less ISR withholding. Your employer chooses which method to use, but both are legal. If you think too much ISR was withheld, you can recover the excess in your annual tax return.",
        },
        considerations: {
          title: "Key Considerations",
          items: [
            { text: "Base salary only: overtime, commissions, and performance bonuses are excluded unless your contract says otherwise. For variable pay, use the average of the last 30 working days.", type: "info" as const },
            { text: "Missing the December 20th deadline can result in employer fines of 50 to 5,000× the daily minimum wage imposed by STPS.", type: "warning" as const },
            { text: "Resigned or terminated workers are entitled to proportional bonus for days worked — this must be included in your finiquito/liquidación.", type: "info" as const },
            { text: "The 30 UMA tax exemption is NEVER prorated — even if you worked only 1 month, the full $3,519.30 MXN exemption applies to your bonus.", type: "info" as const },
            { text: "Independent contractors (honorarios/freelancers) are NOT entitled to aguinaldo unless a subordinate employment relationship can be proven legally.", type: "warning" as const },
            { text: "Employers who pay bonuses above the legal minimum should document it in the CFDI de nómina, separating exempt and taxable portions correctly.", type: "info" as const },
          ],
        },
        categories: {
          title: "Christmas Bonus by Country",
          items: [
            { text: "Mexico (Aguinaldo): Min. 15 days salary. Paid by Dec 20. First 30 UMA exempt from ISR. Two ISR methods: Art. 96 (direct) and Art. 174 (annualized).", type: "info" as const },
            { text: "Colombia (Prima de Servicios): 1 month salary/year in 2 payments (June + December). Uses 360-day periods. Includes transportation allowance if salary ≤ 2 SMMLV.", type: "info" as const },
            { text: "Argentina (SAC): 50% of best monthly salary of each semester. Paid June + December. Subject to jubilación (11%), obra social (3%), and sindicato deductions.", type: "info" as const },
            { text: "Peru (Gratificación): 1 full salary in July + December, plus 9% EsSalud bonus. Exempt from income tax since 2015. Net = salary × 1.09.", type: "info" as const },
            { text: "Brazil (13º Salário): 1 month salary in 2 installments (Nov + Dec). 1st installment: no deductions. 2nd: INSS (7.5-14%) + IRRF applied to both.", type: "info" as const },
            { text: "Dominican Republic (Salario de Navidad): 1/12 of annual earnings. 100% exempt from ISR. Must be paid by December 20.", type: "info" as const },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step calculations for common scenarios",
          examples: [
            {
              title: "Full-Year Worker — Art. 174 Method",
              steps: [
                "Monthly salary: $15,000 MXN → Daily: $500",
                "Bonus (15 days): $500 × 15 = $7,500 gross",
                "Exempt (30 UMA): 30 × $117.31 = $3,519.30",
                "Taxable: $7,500 - $3,519.30 = $3,980.70",
                "Art. 174: ($3,980.70 ÷ 365) × 30.4 = $331.56/month",
                "Effective rate applied to $3,980.70 → ISR ≈ $365",
              ],
              result: "Gross: $7,500 | ISR: ~$365 | Net: ~$7,135",
            },
            {
              title: "Part-Year Worker (6 months)",
              steps: [
                "Monthly salary: $12,000 → Daily: $400",
                "Full bonus: $400 × 15 = $6,000",
                "Proportional: $6,000 × (180 ÷ 365) = $2,958.90",
                "Exempt (30 UMA): $3,519.30",
                "$2,958.90 < $3,519.30 → entirely exempt",
              ],
              result: "Net bonus: $2,958.90 — zero ISR, you keep 100%.",
            },
          ],
        },
      },

      faqs: [
        { question: "What is the legal minimum Christmas bonus in Mexico?", answer: "The Federal Labor Law (Art. 87) requires at least 15 days of base salary. Many companies offer 20-40 days as a superior benefit. As of 2026, the legal minimum is still 15 days despite proposals to increase it to 30." },
        { question: "When must the Christmas bonus be paid?", answer: "By December 20th at the latest. Late payment can result in fines of 50 to 5,000× the daily minimum wage. File complaints with PROFEDET (800-911-7877) or STPS if your employer misses the deadline." },
        { question: "What is the difference between Art. 96 and Art. 174 for ISR?", answer: "Art. 96 (direct) adds the taxable bonus to your monthly salary and applies the tax table — this can push you into a higher bracket. Art. 174 (annualized) divides the taxable bonus by 365, multiplies by 30.4, and calculates an effective rate — usually resulting in 15-30% lower ISR. Your employer chooses the method." },
        { question: "Do I get a bonus if I worked less than a year?", answer: "Yes. You receive a proportional bonus: (Daily Salary × Bonus Days × Days Worked) ÷ 365. This applies even after resignation or termination — it must be included in your finiquito." },
        { question: "How much of my aguinaldo is tax-exempt?", answer: "The first 30 UMA ($3,519.30 MXN in 2026, based on daily UMA of $117.31) is exempt from ISR. This exemption is NEVER prorated — even if you only worked 1 month. Workers earning minimum wage typically receive their entire bonus tax-free." },
        { question: "Should I use monthly, biweekly, or daily salary?", answer: "Use whichever matches your pay stub. Monthly ÷ 30 = daily salary. Biweekly (quincenal) ÷ 15 = daily. Weekly ÷ 7 = daily. For variable income, use the average of your gross earnings from the last 30 working days." },
        { question: "Are domestic workers entitled to the Christmas bonus?", answer: "Yes. All workers with a subordinate employment relationship are entitled, including domestic workers, gardeners, caregivers, and drivers. The bonus is proportional to days worked and based on agreed wage." },
        { question: "What if my employer doesn't pay the bonus?", answer: "File a complaint with PROFEDET (800-911-7877 or gob.mx/profedet). You have up to 1 year to claim. Employers face fines and must pay the bonus plus potential interest and penalties." },
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
      buttons: { calculate: "Calculate", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },

      chart: {
        title: "Bonus Breakdown",
        xLabel: "Component",
        yLabel: "Amount",
        series: {
          exempt: "Tax Exempt",
          taxable: "Taxable (ISR)",
          isrWithheld: "ISR Withheld",
        },
      },
    },
    es: {
      "name": "Calculadora de Aguinaldo",
      "slug": "calculadora-aguinaldo",
      "subtitle": "Calcula tu aguinaldo, décimo tercer sueldo o bono navideño para México y Latinoamérica con estimación del ISR usando los métodos oficiales Art. 96 y Art. 174.",
      "breadcrumb": "Aguinaldo",
      "seo": {
        "title": "Calculadora de Aguinaldo - Bono Navideño y Décimo Tercer Sueldo",
        "description": "Calcula tu aguinaldo o bono navideño para México y Latinoamérica. Obtén el monto bruto, ISR con métodos oficiales Art. 96 y Art. 174, monto neto al instante.",
        "shortDescription": "Calcula tu aguinaldo o bono navideño con métodos oficiales de ISR.",
        "keywords": [
          "calculadora de aguinaldo",
          "calculadora bono navideño",
          "calculadora décimo tercer sueldo",
          "calcular aguinaldo méxico",
          "aguinaldo ISR",
          "calculadora aguinaldo gratis",
          "christmas bonus calculator",
          "calculadora bono latinoamérica"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "country": {
          "label": "País",
          "helpText": "Selecciona tu país para aplicar las reglas locales de bonos y leyes fiscales",
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
        "bonusDays": {
          "label": "Días de Aguinaldo",
          "helpText": "Días que tu empleador paga como aguinaldo (mínimo 15 por ley en México). Consulta tu contrato."
        },
        "workedFullYear": {
          "label": "Trabajó Año Completo (365 días)",
          "helpText": "Desactiva si empezaste este año o no trabajaste los 365 días completos"
        },
        "daysWorked": {
          "label": "Días Trabajados Este Año",
          "helpText": "Días calendario desde tu fecha de inicio hasta el 20 de diciembre. Ejemplo: empezaste el 1 de julio ≈ 173 días."
        },
        "calculateISR": {
          "label": "Calcular ISR (Impuesto Sobre la Renta)",
          "helpText": "Estimar impuesto sobre la renta usando tablas oficiales del SAT y UMA 2026 ($117.31/día)"
        },
        "isrMethod": {
          "label": "Método de Cálculo ISR",
          "helpText": "Art. 174 usualmente resulta en menor impuesto. Tu empleador elige el método.",
          "options": {
            "art96": "Art. 96 LISR (Directo)",
            "art174": "Art. 174 RLISR (Anualizado — menor impuesto)"
          }
        },
        "yearsOfService": {
          "label": "Años de Servicio",
          "helpText": "La antigüedad determina el aguinaldo: 1-3 años = 15 días, 3-10 = 19 días, 10+ = 21 días"
        }
      },
      "results": {
        "grossBonus": {
          "label": "Aguinaldo Bruto"
        },
        "taxExempt": {
          "label": "Exento de Impuestos (30 UMA)"
        },
        "taxableAmount": {
          "label": "Monto Gravable"
        },
        "netBonus": {
          "label": "Aguinaldo Neto Estimado"
        }
      },
      "presets": {
        "mexicoMinWage": {
          "label": "🇲🇽 Salario Mínimo",
          "description": "Salario mín. México, 15 días aguinaldo"
        },
        "mexicoAverage": {
          "label": "🇲🇽 Salario Promedio",
          "description": "México $15K/mes, 15 días"
        },
        "mexicoProfessional": {
          "label": "🇲🇽 Profesionista",
          "description": "México $35K/mes, 30 días"
        },
        "mexicoPartYear": {
          "label": "📅 Año Parcial",
          "description": "México, trabajó 6 meses"
        }
      },
      "values": {
        "days": "días",
        "day": "día",
        "exempt": "exento",
        "taxable": "gravable",
        "fullYear": "Año completo",
        "proportional": "Proporcional",
        "noTax": "Exento de impuestos en este país",
        "umaLabel": "UMA",
        "art96Label": "Art. 96 LISR (Directo)",
        "art174Label": "Art. 174 RLISR (Anualizado)",
        "effectiveRate": "Tasa efectiva",
        "fullyExempt": "Totalmente exento (bajo 30 UMA)"
      },
      "formats": {
        "summary": "Tu aguinaldo estimado es {grossBonus} bruto ({netBonus} neto después de impuestos)."
      },
      "infoCards": {
        "metrics": {
          "title": "Desglose Salarial",
          "items": [
            {
              "label": "Salario Diario",
              "valueKey": "dailySalary"
            },
            {
              "label": "Equivalente Mensual",
              "valueKey": "monthlyEquivalent"
            },
            {
              "label": "Días de Aguinaldo",
              "valueKey": "bonusDaysUsed"
            },
            {
              "label": "Factor Proporcional",
              "valueKey": "proportionalFactor"
            }
          ]
        },
        "details": {
          "title": "Detalles del Cálculo",
          "items": [
            {
              "label": "Fórmula Utilizada",
              "valueKey": "formulaUsed"
            },
            {
              "label": "Base Fiscal/Legal",
              "valueKey": "isrMethodLabel"
            },
            {
              "label": "Deducciones",
              "valueKey": "isrAmount"
            },
            {
              "label": "Tasa Efectiva",
              "valueKey": "effectiveRate"
            }
          ]
        },
        "tips": {
          "title": "Consejos Importantes",
          "items": [
            "Tu empleador debe pagar el aguinaldo antes del 20 de diciembre. El pago tardío puede resultar en multas hasta 5,000× el salario mínimo diario.",
            "El mínimo legal son 15 días. Muchas empresas ofrecen 20-40 días — consulta tu contrato o pregunta a RH.",
            "Art. 174 (RLISR) usualmente resulta en menor ISR porque anualiza el aguinaldo en lugar de agregarlo a un mes.",
            "La exención de 30 UMA ($3,519.30 MXN en 2026) NUNCA se prorratea — incluso trabajadores de tiempo parcial obtienen la exención completa."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el Aguinaldo?",
          "content": "El aguinaldo es un pago anual obligatorio por ley que los empleadores deben dar a sus trabajadores. En México, el Artículo 87 de la Ley Federal del Trabajo requiere que los empleadores paguen al menos 15 días de salario como aguinaldo, entregado a más tardar el 20 de diciembre. Este beneficio se estableció en 1970 y aplica a todos los trabajadores con relación laboral formal, incluyendo trabajadores domésticos, empleados de medio tiempo y personal de temporada. El aguinaldo sirve como apoyo financiero durante las fiestas decembrinas y es uno de los beneficios laborales más importantes en la región. Muchas empresas ofrecen voluntariamente más del mínimo legal — 20, 30 o hasta 40 días — como parte de su paquete de compensación para atraer y retener talento. Propuestas legislativas recientes han buscado aumentar el mínimo a 30 días, aunque a 2026 el mínimo legal permanece en 15 días."
        },
        "howItWorks": {
          "title": "¿Cómo se Calcula el Aguinaldo? (Incluyendo Métodos ISR)",
          "content": "El cálculo inicia con tu salario diario (mensual ÷ 30, quincenal ÷ 15, semanal ÷ 7). Esta tarifa diaria se multiplica por tus días de aguinaldo. Si no trabajaste el año completo, el aguinaldo es proporcional: (Salario Diario × Días de Aguinaldo × Días Trabajados) ÷ 365. Para el ISR en México, las primeras 30 UMA ($3,519.30 MXN en 2026) siempre están exentas. Para el remanente gravable, hay DOS métodos oficiales. El método Art. 96 agrega el aguinaldo gravable directamente a tu salario mensual y aplica la tabla ISR — esto puede empujarte a un rango superior, resultando en más impuesto. El método Art. 174 (Reglamento) divide el aguinaldo gravable entre 365, multiplica por 30.4 para obtener un equivalente mensual, calcula la diferencia ISR (con vs sin aguinaldo), y deriva una tasa efectiva — este método típicamente resulta en 15-30% menos retención ISR. Tu empleador elige qué método usar, pero ambos son legales. Si crees que se retuvo demasiado ISR, puedes recuperar el exceso en tu declaración anual."
        },
        "considerations": {
          "title": "Consideraciones Clave",
          "items": [
            {
              "text": "Solo salario base: horas extra, comisiones y bonos por rendimiento se excluyen a menos que tu contrato diga lo contrario. Para pago variable, usa el promedio de los últimos 30 días laborales.",
              "type": "info"
            },
            {
              "text": "Perder la fecha límite del 20 de diciembre puede resultar en multas patronales de 50 a 5,000× el salario mínimo diario impuestas por STPS.",
              "type": "warning"
            },
            {
              "text": "Trabajadores renunciados o despedidos tienen derecho a aguinaldo proporcional por días trabajados — esto debe incluirse en tu finiquito/liquidación.",
              "type": "info"
            },
            {
              "text": "La exención de 30 UMA NUNCA se prorratea — incluso si trabajaste solo 1 mes, la exención completa de $3,519.30 MXN aplica a tu aguinaldo.",
              "type": "info"
            },
            {
              "text": "Contratistas independientes (honorarios/freelancers) NO tienen derecho a aguinaldo a menos que se pueda probar legalmente una relación laboral subordinada.",
              "type": "warning"
            },
            {
              "text": "Empleadores que pagan aguinaldos por encima del mínimo legal deben documentarlo en el CFDI de nómina, separando correctamente porciones exentas y gravables.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Aguinaldo por País",
          "items": [
            {
              "text": "México (Aguinaldo): Mín. 15 días salario. Pagado antes del 20 dic. Primeras 30 UMA exentas de ISR. Dos métodos ISR: Art. 96 (directo) y Art. 174 (anualizado).",
              "type": "info"
            },
            {
              "text": "Colombia (Prima de Servicios): 1 mes salario/año en 2 pagos (junio + diciembre). Usa períodos de 360 días. Incluye auxilio de transporte si salario ≤ 2 SMMLV.",
              "type": "info"
            },
            {
              "text": "Argentina (SAC): 50% del mejor salario mensual de cada semestre. Pagado junio + diciembre. Sujeto a deducciones jubilación (11%), obra social (3%) y sindicato.",
              "type": "info"
            },
            {
              "text": "Perú (Gratificación): 1 salario completo en julio + diciembre, más bono EsSalud 9%. Exento de impuesto a la renta desde 2015. Neto = salario × 1.09.",
              "type": "info"
            },
            {
              "text": "Brasil (13º Salário): 1 mes salario en 2 cuotas (nov + dic). 1ra cuota: sin deducciones. 2da: INSS (7.5-14%) + IRRF aplicado a ambas.",
              "type": "info"
            },
            {
              "text": "República Dominicana (Salario de Navidad): 1/12 de ingresos anuales. 100% exento de ISR. Debe pagarse antes del 20 de diciembre.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Cálculos paso a paso para escenarios comunes",
          "examples": [
            {
              "title": "Trabajador Año Completo — Método Art. 174",
              "steps": [
                "Salario mensual: $15,000 MXN → Diario: $500",
                "Aguinaldo (15 días): $500 × 15 = $7,500 bruto",
                "Exento (30 UMA): 30 × $117.31 = $3,519.30",
                "Gravable: $7,500 - $3,519.30 = $3,980.70",
                "Art. 174: ($3,980.70 ÷ 365) × 30.4 = $331.56/mes",
                "Tasa efectiva aplicada a $3,980.70 → ISR ≈ $365"
              ],
              "result": "Bruto: $7,500 | ISR: ~$365 | Neto: ~$7,135"
            },
            {
              "title": "Trabajador Año Parcial (6 meses)",
              "steps": [
                "Salario mensual: $12,000 → Diario: $400",
                "Aguinaldo completo: $400 × 15 = $6,000",
                "Proporcional: $6,000 × (180 ÷ 365) = $2,958.90",
                "Exento (30 UMA): $3,519.30",
                "$2,958.90 < $3,519.30 → completamente exento"
              ],
              "result": "Aguinaldo neto: $2,958.90 — cero ISR, conservas el 100%."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es el aguinaldo mínimo legal en México?",
          "answer": "La Ley Federal del Trabajo (Art. 87) requiere al menos 15 días de salario base. Muchas empresas ofrecen 20-40 días como prestación superior. A 2026, el mínimo legal sigue siendo 15 días a pesar de propuestas para aumentarlo a 30."
        },
        {
          "question": "¿Cuándo debe pagarse el aguinaldo?",
          "answer": "A más tardar el 20 de diciembre. El pago tardío puede resultar en multas de 50 a 5,000× el salario mínimo diario. Presenta quejas con PROFEDET (800-911-7877) o STPS si tu empleador pierde la fecha límite."
        },
        {
          "question": "¿Cuál es la diferencia entre Art. 96 y Art. 174 para ISR?",
          "answer": "Art. 96 (directo) agrega el aguinaldo gravable a tu salario mensual y aplica la tabla fiscal — esto puede empujarte a un rango superior. Art. 174 (anualizado) divide el aguinaldo gravable entre 365, multiplica por 30.4, y calcula una tasa efectiva — usualmente resulta en 15-30% menos ISR. Tu empleador elige el método."
        },
        {
          "question": "¿Recibo aguinaldo si trabajé menos de un año?",
          "answer": "Sí. Recibes un aguinaldo proporcional: (Salario Diario × Días de Aguinaldo × Días Trabajados) ÷ 365. Esto aplica incluso después de renuncia o despido — debe incluirse en tu finiquito."
        },
        {
          "question": "¿Cuánto de mi aguinaldo está exento de impuestos?",
          "answer": "Las primeras 30 UMA ($3,519.30 MXN en 2026, basado en UMA diaria de $117.31) están exentas de ISR. Esta exención NUNCA se prorratea — incluso si solo trabajaste 1 mes. Trabajadores con salario mínimo típicamente reciben todo su aguinaldo libre de impuestos."
        },
        {
          "question": "¿Debo usar salario mensual, quincenal o diario?",
          "answer": "Usa el que coincida con tu recibo de nómina. Mensual ÷ 30 = salario diario. Quincenal ÷ 15 = diario. Semanal ÷ 7 = diario. Para ingresos variables, usa el promedio de tus ingresos brutos de los últimos 30 días laborales."
        },
        {
          "question": "¿Los trabajadores domésticos tienen derecho al aguinaldo?",
          "answer": "Sí. Todos los trabajadores con relación laboral subordinada tienen derecho, incluyendo trabajadores domésticos, jardineros, cuidadores y choferes. El aguinaldo es proporcional a días trabajados y basado en salario acordado."
        },
        {
          "question": "¿Qué pasa si mi empleador no paga el aguinaldo?",
          "answer": "Presenta una queja con PROFEDET (800-911-7877 o gob.mx/profedet). Tienes hasta 1 año para reclamar. Los empleadores enfrentan multas y deben pagar el aguinaldo más posibles intereses y penalizaciones."
        }
      ],
      "chart": {
        "title": "Desglose del Aguinaldo",
        "xLabel": "Componente",
        "yLabel": "Monto",
        "series": {
          "exempt": "Exento de Impuestos",
          "taxable": "Gravable (ISR)",
          "isrWithheld": "ISR Retenido"
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
      "name": "Calculadora de 13º Salário",
      "slug": "calculadora-decimo-terceiro-salario",
      "subtitle": "Calcule seu aguinaldo, 13º salário, ou gratificação natalina para México e América Latina com estimativa de imposto ISR usando métodos oficiais Art. 96 e Art. 174.",
      "breadcrumb": "13º Salário",
      "seo": {
        "title": "Calculadora de 13º Salário - Aguinaldo e Gratificação Natalina",
        "description": "Calcule seu 13º salário (aguinaldo) para México e América Latina. Obtenha valor bruto, imposto ISR com métodos oficiais Art. 96 e Art. 174, valor líquido instantaneamente.",
        "shortDescription": "Calcule seu aguinaldo ou 13º salário com métodos oficiais de ISR.",
        "keywords": [
          "calculadora 13 salário",
          "calculadora aguinaldo",
          "calculadora gratificação natalina",
          "calcular aguinaldo méxico",
          "aguinaldo ISR imposto",
          "calculadora aguinaldo grátis",
          "calculadora de aguinaldo",
          "calculadora bônus américa latina"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "country": {
          "label": "País",
          "helpText": "Selecione seu país para aplicar regras locais de bônus e leis tributárias",
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
          "label": "Frequência de Pagamento",
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
          "helpText": "Seu salário bruto (antes das deduções) para a frequência de pagamento selecionada"
        },
        "bonusDays": {
          "label": "Dias de Bônus",
          "helpText": "Dias que seu empregador paga como bônus (mínimo 15 por lei no México). Verifique seu contrato."
        },
        "workedFullYear": {
          "label": "Trabalhou o Ano Todo (365 dias)",
          "helpText": "Desative se você começou este ano ou não trabalhou os 365 dias completos"
        },
        "daysWorked": {
          "label": "Dias Trabalhados Este Ano",
          "helpText": "Dias corridos da sua data de início até 20 de dezembro. Exemplo: começou em 1º de julho ≈ 173 dias."
        },
        "calculateISR": {
          "label": "Calcular ISR (Imposto de Renda)",
          "helpText": "Estimar imposto de renda usando tabelas oficiais SAT e UMA 2026 ($117,31/dia)"
        },
        "isrMethod": {
          "label": "Método de Cálculo ISR",
          "helpText": "Art. 174 geralmente resulta em menor imposto. Seu empregador escolhe o método.",
          "options": {
            "art96": "Art. 96 LISR (Direto)",
            "art174": "Art. 174 RLISR (Anualizado — menor imposto)"
          }
        },
        "yearsOfService": {
          "label": "Anos de Serviço",
          "helpText": "Antiguidade determina bônus: 1-3 anos = 15 dias, 3-10 = 19 dias, 10+ = 21 dias"
        }
      },
      "results": {
        "grossBonus": {
          "label": "Bônus Bruto"
        },
        "taxExempt": {
          "label": "Isento de Imposto (30 UMA)"
        },
        "taxableAmount": {
          "label": "Valor Tributável (Gravado)"
        },
        "netBonus": {
          "label": "Bônus Líquido Estimado"
        }
      },
      "presets": {
        "mexicoMinWage": {
          "label": "🇲🇽 Salário Mínimo",
          "description": "Salário mín. México, 15 dias bônus"
        },
        "mexicoAverage": {
          "label": "🇲🇽 Salário Médio",
          "description": "México $15K/mês, 15 dias"
        },
        "mexicoProfessional": {
          "label": "🇲🇽 Profissional",
          "description": "México $35K/mês, 30 dias"
        },
        "mexicoPartYear": {
          "label": "📅 Meio Ano",
          "description": "México, trabalhou 6 meses"
        }
      },
      "values": {
        "days": "dias",
        "day": "dia",
        "exempt": "isento",
        "taxable": "tributável",
        "fullYear": "Ano completo",
        "proportional": "Proporcional",
        "noTax": "Isento de impostos neste país",
        "umaLabel": "UMA",
        "art96Label": "Art. 96 LISR (Direto)",
        "art174Label": "Art. 174 RLISR (Anualizado)",
        "effectiveRate": "Taxa efetiva",
        "fullyExempt": "Totalmente isento (abaixo de 30 UMA)"
      },
      "formats": {
        "summary": "Seu 13º salário estimado é {grossBonus} bruto ({netBonus} líquido após impostos)."
      },
      "infoCards": {
        "metrics": {
          "title": "Detalhamento Salarial",
          "items": [
            {
              "label": "Salário Diário",
              "valueKey": "dailySalary"
            },
            {
              "label": "Equivalente Mensal",
              "valueKey": "monthlyEquivalent"
            },
            {
              "label": "Dias de Bônus",
              "valueKey": "bonusDaysUsed"
            },
            {
              "label": "Fator Proporcional",
              "valueKey": "proportionalFactor"
            }
          ]
        },
        "details": {
          "title": "Detalhes do Cálculo",
          "items": [
            {
              "label": "Fórmula Utilizada",
              "valueKey": "formulaUsed"
            },
            {
              "label": "Base Legal/Tributária",
              "valueKey": "isrMethodLabel"
            },
            {
              "label": "Deduções",
              "valueKey": "isrAmount"
            },
            {
              "label": "Taxa Efetiva",
              "valueKey": "effectiveRate"
            }
          ]
        },
        "tips": {
          "title": "Dicas Importantes",
          "items": [
            "Seu empregador deve pagar o bônus até 20 de dezembro. Atraso pode resultar em multas de até 5.000× o salário mínimo diário.",
            "O mínimo legal são 15 dias. Muitas empresas oferecem 20-40 dias — verifique seu contrato ou pergunte ao RH.",
            "Art. 174 (RLISR) geralmente resulta em menor ISR porque anualiza o bônus em vez de adicioná-lo a um mês.",
            "A isenção de 30 UMA ($3.519,30 MXN em 2026) NUNCA é proporcional — mesmo trabalhadores de meio período recebem a isenção total."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é o 13º Salário (Aguinaldo)?",
          "content": "O 13º salário, conhecido como 'aguinaldo' no México e grande parte da América Latina, é um pagamento anual obrigatório por lei que os empregadores devem dar aos seus trabalhadores. No México, o Artigo 87 da Lei Federal do Trabalho exige que os empregadores paguem pelo menos 15 dias de salário como bônus de fim de ano, entregue até 20 de dezembro. Este benefício foi estabelecido em 1970 e se aplica a todos os trabalhadores com relação formal de emprego, incluindo trabalhadores domésticos, funcionários de meio período e pessoal sazonal. O aguinaldo serve como apoio financeiro durante a temporada de festas e é um dos benefícios trabalhistas mais importantes da região. Muitas empresas oferecem voluntariamente mais que o mínimo legal — 20, 30, ou até 40 dias — como parte de seu pacote de compensação para atrair e reter talentos."
        },
        "howItWorks": {
          "title": "Como é Calculado o Bônus? (Incluindo Métodos ISR)",
          "content": "O cálculo começa com seu salário diário (mensal ÷ 30, quinzenal ÷ 15, semanal ÷ 7). Esta taxa diária é multiplicada pelos seus dias de bônus. Se você não trabalhou o ano inteiro, o bônus é proporcional: (Salário Diário × Dias de Bônus × Dias Trabalhados) ÷ 365. Para ISR no México, os primeiros 30 UMA ($3.519,30 MXN em 2026) são sempre isentos. Para o restante tributável, há DOIS métodos oficiais. O método Art. 96 adiciona o bônus tributável diretamente ao seu salário mensal e aplica a tabela ISR — isso pode empurrá-lo para uma faixa mais alta, resultando em mais imposto. O método Art. 174 (Regulamento) divide o bônus tributável por 365, multiplica por 30,4 para obter um equivalente mensal, calcula a diferença ISR (com vs sem bônus), e deriva uma taxa efetiva — este método tipicamente resulta em 15-30% menos retenção ISR."
        },
        "considerations": {
          "title": "Considerações Principais",
          "items": [
            {
              "text": "Apenas salário base: horas extras, comissões e bônus de desempenho são excluídos, a menos que seu contrato diga o contrário. Para pagamento variável, use a média dos últimos 30 dias úteis.",
              "type": "info"
            },
            {
              "text": "Perder o prazo de 20 de dezembro pode resultar em multas ao empregador de 50 a 5.000× o salário mínimo diário impostas pelo STPS.",
              "type": "warning"
            },
            {
              "text": "Trabalhadores demitidos ou que se demitiram têm direito ao bônus proporcional pelos dias trabalhados — isso deve ser incluído no seu finiquito/liquidação.",
              "type": "info"
            },
            {
              "text": "A isenção de 30 UMA NUNCA é proporcional — mesmo se você trabalhou apenas 1 mês, a isenção total de $3.519,30 MXN se aplica ao seu bônus.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "13º Salário por País",
          "items": [
            {
              "text": "México (Aguinaldo): Mín. 15 dias de salário. Pago até 20 de dezembro. Primeiros 30 UMA isentos de ISR. Dois métodos ISR: Art. 96 (direto) e Art. 174 (anualizado).",
              "type": "info"
            },
            {
              "text": "Colômbia (Prima de Servicios): 1 mês de salário/ano em 2 pagamentos (junho + dezembro). Usa períodos de 360 dias. Inclui auxílio transporte se salário ≤ 2 SMMLV.",
              "type": "info"
            },
            {
              "text": "Argentina (SAC): 50% do melhor salário mensal de cada semestre. Pago junho + dezembro. Sujeito a deduções de jubilación (11%), obra social (3%) e sindicato.",
              "type": "info"
            },
            {
              "text": "Peru (Gratificación): 1 salário completo em julho + dezembro, mais 9% de bônus EsSalud. Isento de imposto de renda desde 2015. Líquido = salário × 1,09.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Cálculos passo a passo para cenários comuns",
          "examples": [
            {
              "title": "Trabalhador Ano Completo — Método Art. 174",
              "steps": [
                "Salário mensal: $15.000 MXN → Diário: $500",
                "Bônus (15 dias): $500 × 15 = $7.500 bruto",
                "Isento (30 UMA): 30 × $117,31 = $3.519,30",
                "Tributável: $7.500 - $3.519,30 = $3.980,70",
                "Art. 174: ($3.980,70 ÷ 365) × 30,4 = $331,56/mês",
                "Taxa efetiva aplicada a $3.980,70 → ISR ≈ $365"
              ],
              "result": "Bruto: $7.500 | ISR: ~$365 | Líquido: ~$7.135"
            },
            {
              "title": "Trabalhador Meio Ano (6 meses)",
              "steps": [
                "Salário mensal: $12.000 → Diário: $400",
                "Bônus completo: $400 × 15 = $6.000",
                "Proporcional: $6.000 × (180 ÷ 365) = $2.958,90",
                "Isento (30 UMA): $3.519,30",
                "$2.958,90 < $3.519,30 → totalmente isento"
              ],
              "result": "Bônus líquido: $2.958,90 — zero ISR, você mantém 100%."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual é o 13º salário mínimo legal no México?",
          "answer": "A Lei Federal do Trabalho (Art. 87) exige pelo menos 15 dias de salário base. Muitas empresas oferecem 20-40 dias como benefício superior. Em 2026, o mínimo legal ainda são 15 dias apesar de propostas para aumentar para 30."
        },
        {
          "question": "Quando o 13º salário deve ser pago?",
          "answer": "Até 20 de dezembro no mais tardar. Atraso pode resultar em multas de 50 a 5.000× o salário mínimo diário. Registre reclamações com PROFEDET (800-911-7877) ou STPS se seu empregador perder o prazo."
        },
        {
          "question": "Qual a diferença entre Art. 96 e Art. 174 para ISR?",
          "answer": "Art. 96 (direto) adiciona o bônus tributável ao seu salário mensal e aplica a tabela de impostos — isso pode empurrá-lo para uma faixa mais alta. Art. 174 (anualizado) divide o bônus tributável por 365, multiplica por 30,4, e calcula uma taxa efetiva — geralmente resultando em 15-30% menos ISR. Seu empregador escolhe o método."
        },
        {
          "question": "Recebo bônus se trabalhei menos de um ano?",
          "answer": "Sim. Você recebe um bônus proporcional: (Salário Diário × Dias de Bônus × Dias Trabalhados) ÷ 365. Isso se aplica mesmo após demissão ou rescisão — deve ser incluído no seu finiquito."
        },
        {
          "question": "Quanto do meu aguinaldo é isento de impostos?",
          "answer": "Os primeiros 30 UMA ($3.519,30 MXN em 2026, baseado em UMA diário de $117,31) são isentos de ISR. Esta isenção NUNCA é proporcional — mesmo se você trabalhou apenas 1 mês. Trabalhadores que ganham salário mínimo tipicamente recebem todo o bônus livre de impostos."
        }
      ],
      "chart": {
        "title": "Detalhamento do Bônus",
        "xLabel": "Componente",
        "yLabel": "Valor",
        "series": {
          "exempt": "Isento de Imposto",
          "taxable": "Tributável (ISR)",
          "isrWithheld": "ISR Retido"
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
      "name": "Calculateur de Prime de Noël",
      "slug": "calculateur-prime-noel",
      "subtitle": "Calculez votre aguinaldo, 13ème mois ou prime de Noël pour le Mexique et l'Amérique latine avec estimation d'impôt ISR utilisant les méthodes officielles Art. 96 et Art. 174.",
      "breadcrumb": "Prime de Noël",
      "seo": {
        "title": "Calculateur Prime de Noël - Aguinaldo & 13ème Mois",
        "description": "Calculez votre prime de Noël (aguinaldo) pour le Mexique et l'Amérique latine. Obtenez la prime brute, l'impôt ISR avec les méthodes officielles Art. 96 et Art. 174, montant net instantanément.",
        "shortDescription": "Calculez votre aguinaldo ou prime de Noël avec les méthodes ISR officielles.",
        "keywords": [
          "calculateur prime noel",
          "calculateur aguinaldo",
          "calculateur 13eme mois",
          "calculer aguinaldo mexique",
          "aguinaldo impot ISR",
          "calculateur aguinaldo gratuit",
          "calculadora de aguinaldo",
          "calculateur prime amerique latine"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "country": {
          "label": "Pays",
          "helpText": "Sélectionnez votre pays pour appliquer les règles locales de primes et lois fiscales",
          "options": {
            "MX": "🇲🇽 Mexique",
            "CO": "🇨🇴 Colombie",
            "AR": "🇦🇷 Argentine",
            "PE": "🇵🇪 Pérou",
            "BR": "🇧🇷 Brésil",
            "DO": "🇩🇴 Rép. Dominicaine",
            "GT": "🇬🇹 Guatemala",
            "SV": "🇸🇻 El Salvador",
            "CR": "🇨🇷 Costa Rica",
            "HN": "🇭🇳 Honduras"
          }
        },
        "salaryFrequency": {
          "label": "Fréquence de Paie",
          "helpText": "À quelle fréquence recevez-vous votre salaire",
          "options": {
            "monthly": "Mensuel",
            "biweekly": "Bihebdomadaire (Quincenal)",
            "weekly": "Hebdomadaire",
            "daily": "Quotidien"
          }
        },
        "salary": {
          "label": "Salaire Brut",
          "helpText": "Votre salaire brut (avant déductions) pour la fréquence de paie sélectionnée"
        },
        "bonusDays": {
          "label": "Jours de Prime",
          "helpText": "Jours que votre employeur paie comme prime (minimum 15 par la loi au Mexique). Vérifiez votre contrat."
        },
        "workedFullYear": {
          "label": "Travaillé Toute l'Année (365 jours)",
          "helpText": "Désactivez si vous avez commencé cette année ou n'avez pas travaillé les 365 jours complets"
        },
        "daysWorked": {
          "label": "Jours Travaillés Cette Année",
          "helpText": "Jours calendaires de votre date de début au 20 déc. Exemple: commencé le 1er juillet ≈ 173 jours."
        },
        "calculateISR": {
          "label": "Calculer ISR (Impôt sur le Revenu)",
          "helpText": "Estimer l'impôt sur le revenu en utilisant les tables officielles SAT et UMA 2026 (117,31$/jour)"
        },
        "isrMethod": {
          "label": "Méthode de Calcul ISR",
          "helpText": "L'Art. 174 résulte généralement en impôt plus faible. Votre employeur choisit la méthode.",
          "options": {
            "art96": "Art. 96 LISR (Direct)",
            "art174": "Art. 174 RLISR (Annualisé — impôt plus faible)"
          }
        },
        "yearsOfService": {
          "label": "Années de Service",
          "helpText": "L'ancienneté détermine la prime: 1-3 ans = 15 jours, 3-10 = 19 jours, 10+ = 21 jours"
        }
      },
      "results": {
        "grossBonus": {
          "label": "Prime Brute"
        },
        "taxExempt": {
          "label": "Exonéré d'Impôt (30 UMA)"
        },
        "taxableAmount": {
          "label": "Montant Imposable (Gravado)"
        },
        "netBonus": {
          "label": "Prime Nette Estimée"
        }
      },
      "presets": {
        "mexicoMinWage": {
          "label": "🇲🇽 Salaire Minimum",
          "description": "Salaire min. Mexique, prime 15 jours"
        },
        "mexicoAverage": {
          "label": "🇲🇽 Salaire Moyen",
          "description": "Mexique 15K$/mois, 15 jours"
        },
        "mexicoProfessional": {
          "label": "🇲🇽 Professionnel",
          "description": "Mexique 35K$/mois, 30 jours"
        },
        "mexicoPartYear": {
          "label": "📅 Année Partielle",
          "description": "Mexique, travaillé 6 mois"
        }
      },
      "values": {
        "days": "jours",
        "day": "jour",
        "exempt": "exonéré",
        "taxable": "imposable",
        "fullYear": "Année complète",
        "proportional": "Proportionnel",
        "noTax": "Exonéré d'impôt dans ce pays",
        "umaLabel": "UMA",
        "art96Label": "Art. 96 LISR (Direct)",
        "art174Label": "Art. 174 RLISR (Annualisé)",
        "effectiveRate": "Taux effectif",
        "fullyExempt": "Entièrement exonéré (sous 30 UMA)"
      },
      "formats": {
        "summary": "Votre prime de Noël estimée est {grossBonus} brute ({netBonus} nette après impôts)."
      },
      "infoCards": {
        "metrics": {
          "title": "Répartition Salariale",
          "items": [
            {
              "label": "Salaire Quotidien",
              "valueKey": "dailySalary"
            },
            {
              "label": "Équivalent Mensuel",
              "valueKey": "monthlyEquivalent"
            },
            {
              "label": "Jours de Prime",
              "valueKey": "bonusDaysUsed"
            },
            {
              "label": "Facteur Proportionnel",
              "valueKey": "proportionalFactor"
            }
          ]
        },
        "details": {
          "title": "Détails du Calcul",
          "items": [
            {
              "label": "Formule Utilisée",
              "valueKey": "formulaUsed"
            },
            {
              "label": "Base Fiscale/Légale",
              "valueKey": "isrMethodLabel"
            },
            {
              "label": "Déductions",
              "valueKey": "isrAmount"
            },
            {
              "label": "Taux Effectif",
              "valueKey": "effectiveRate"
            }
          ]
        },
        "tips": {
          "title": "Conseils Importants",
          "items": [
            "Votre employeur doit payer la prime avant le 20 décembre. Le retard peut entraîner des amendes jusqu'à 5 000× le salaire minimum quotidien.",
            "Le minimum légal est de 15 jours. Beaucoup d'entreprises offrent 20-40 jours — vérifiez votre contrat ou demandez aux RH.",
            "L'Art. 174 (RLISR) résulte généralement en ISR plus faible car il annualise la prime au lieu de l'ajouter à un mois.",
            "L'exonération de 30 UMA (3 519,30$ MXN en 2026) n'est JAMAIS proratisée — même les travailleurs à temps partiel obtiennent l'exonération complète."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que la Prime de Noël (Aguinaldo) ?",
          "content": "La prime de Noël, connue sous le nom d'«aguinaldo» au Mexique et dans une grande partie de l'Amérique latine, est un paiement annuel légalement obligatoire que les employeurs doivent donner à leurs travailleurs. Au Mexique, l'article 87 de la Loi fédérale du travail exige que les employeurs paient au moins 15 jours de salaire comme prime de fin d'année, livrée au plus tard le 20 décembre. Cet avantage a été établi en 1970 et s'applique à tous les travailleurs ayant une relation d'emploi formelle, y compris les employés domestiques, les employés à temps partiel et le personnel saisonnier. L'aguinaldo sert de soutien financier pendant la saison des fêtes et est l'un des avantages sociaux les plus importants de la région. De nombreuses entreprises offrent volontairement plus que le minimum légal — 20, 30 ou même 40 jours — dans le cadre de leur package de rémunération pour attirer et retenir les talents. Les propositions législatives récentes ont cherché à augmenter le minimum à 30 jours, bien qu'en 2026 le minimum légal reste à 15 jours."
        },
        "howItWorks": {
          "title": "Comment la Prime est-elle Calculée ? (Incluant les Méthodes ISR)",
          "content": "Le calcul commence par votre salaire quotidien (mensuel ÷ 30, bihebdomadaire ÷ 15, hebdomadaire ÷ 7). Ce taux quotidien est multiplié par vos jours de prime. Si vous n'avez pas travaillé toute l'année, la prime est proportionnelle: (Salaire Quotidien × Jours de Prime × Jours Travaillés) ÷ 365. Pour l'ISR au Mexique, les premiers 30 UMA (3 519,30$ MXN en 2026) sont toujours exonérés. Pour le reste imposable, il y a DEUX méthodes officielles. La méthode Art. 96 ajoute la prime imposable directement à votre salaire mensuel et applique la table ISR — cela peut vous pousser dans une tranche supérieure, résultant en plus d'impôt. La méthode Art. 174 (Reglamento) divise la prime imposable par 365, multiplie par 30,4 pour obtenir un équivalent mensuel, calcule la différence ISR (avec vs sans prime), et dérive un taux effectif — cette méthode résulte typiquement en 15-30% moins de retenue ISR. Votre employeur choisit quelle méthode utiliser, mais les deux sont légales. Si vous pensez que trop d'ISR a été retenu, vous pouvez récupérer l'excès dans votre déclaration fiscale annuelle."
        },
        "considerations": {
          "title": "Considérations Clés",
          "items": [
            {
              "text": "Salaire de base seulement: les heures supplémentaires, commissions et primes de performance sont exclues sauf si votre contrat dit le contraire. Pour la paie variable, utilisez la moyenne des 30 derniers jours travaillés.",
              "type": "info"
            },
            {
              "text": "Manquer l'échéance du 20 décembre peut résulter en amendes patronales de 50 à 5 000× le salaire minimum quotidien imposées par STPS.",
              "type": "warning"
            },
            {
              "text": "Les travailleurs démissionnaires ou licenciés ont droit à une prime proportionnelle pour les jours travaillés — cela doit être inclus dans votre finiquito/liquidación.",
              "type": "info"
            },
            {
              "text": "L'exonération de 30 UMA n'est JAMAIS proratisée — même si vous avez travaillé seulement 1 mois, la pleine exonération de 3 519,30$ MXN s'applique à votre prime.",
              "type": "info"
            },
            {
              "text": "Les contractuels indépendants (honorarios/freelancers) n'ont PAS droit à l'aguinaldo sauf si une relation d'emploi subordonnée peut être prouvée légalement.",
              "type": "warning"
            },
            {
              "text": "Les employeurs qui paient des primes au-dessus du minimum légal doivent le documenter dans le CFDI de nómina, séparant correctement les portions exonérées et imposables.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Prime de Noël par Pays",
          "items": [
            {
              "text": "Mexique (Aguinaldo): Min. 15 jours salaire. Payé avant le 20 déc. Premiers 30 UMA exonérés d'ISR. Deux méthodes ISR: Art. 96 (direct) et Art. 174 (annualisé).",
              "type": "info"
            },
            {
              "text": "Colombie (Prima de Servicios): 1 mois salaire/an en 2 paiements (juin + décembre). Utilise des périodes de 360 jours. Inclut l'allocation transport si salaire ≤ 2 SMMLV.",
              "type": "info"
            },
            {
              "text": "Argentine (SAC): 50% du meilleur salaire mensuel de chaque semestre. Payé juin + décembre. Sujet aux déductions jubilación (11%), obra social (3%), et sindicato.",
              "type": "info"
            },
            {
              "text": "Pérou (Gratificación): 1 salaire complet en juillet + décembre, plus 9% bonus EsSalud. Exonéré d'impôt sur le revenu depuis 2015. Net = salaire × 1,09.",
              "type": "info"
            },
            {
              "text": "Brésil (13º Salário): 1 mois salaire en 2 versements (nov + déc). 1er versement: pas de déductions. 2e: INSS (7,5-14%) + IRRF appliqué aux deux.",
              "type": "info"
            },
            {
              "text": "République Dominicaine (Salario de Navidad): 1/12 des revenus annuels. 100% exonéré d'ISR. Doit être payé avant le 20 décembre.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Calculs étape par étape pour des scénarios communs",
          "examples": [
            {
              "title": "Travailleur Année Complète — Méthode Art. 174",
              "steps": [
                "Salaire mensuel: 15 000$ MXN → Quotidien: 500$",
                "Prime (15 jours): 500$ × 15 = 7 500$ brut",
                "Exonéré (30 UMA): 30 × 117,31$ = 3 519,30$",
                "Imposable: 7 500$ - 3 519,30$ = 3 980,70$",
                "Art. 174: (3 980,70$ ÷ 365) × 30,4 = 331,56$/mois",
                "Taux effectif appliqué à 3 980,70$ → ISR ≈ 365$"
              ],
              "result": "Brut: 7 500$ | ISR: ~365$ | Net: ~7 135$"
            },
            {
              "title": "Travailleur Année Partielle (6 mois)",
              "steps": [
                "Salaire mensuel: 12 000$ → Quotidien: 400$",
                "Prime complète: 400$ × 15 = 6 000$",
                "Proportionnel: 6 000$ × (180 ÷ 365) = 2 958,90$",
                "Exonéré (30 UMA): 3 519,30$",
                "2 958,90$ < 3 519,30$ → entièrement exonéré"
              ],
              "result": "Prime nette: 2 958,90$ — zéro ISR, vous gardez 100%."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quel est le minimum légal de prime de Noël au Mexique ?",
          "answer": "La Loi fédérale du travail (Art. 87) exige au moins 15 jours de salaire de base. Beaucoup d'entreprises offrent 20-40 jours comme avantage supérieur. En 2026, le minimum légal est toujours de 15 jours malgré les propositions de l'augmenter à 30."
        },
        {
          "question": "Quand la prime de Noël doit-elle être payée ?",
          "answer": "Au plus tard le 20 décembre. Le retard peut résulter en amendes de 50 à 5 000× le salaire minimum quotidien. Déposez des plaintes auprès de PROFEDET (800-911-7877) ou STPS si votre employeur manque l'échéance."
        },
        {
          "question": "Quelle est la différence entre Art. 96 et Art. 174 pour l'ISR ?",
          "answer": "Art. 96 (direct) ajoute la prime imposable à votre salaire mensuel et applique la table d'impôt — cela peut vous pousser dans une tranche supérieure. Art. 174 (annualisé) divise la prime imposable par 365, multiplie par 30,4, et calcule un taux effectif — résultant généralement en 15-30% d'ISR plus faible. Votre employeur choisit la méthode."
        },
        {
          "question": "Ai-je droit à une prime si j'ai travaillé moins d'un an ?",
          "answer": "Oui. Vous recevez une prime proportionnelle: (Salaire Quotidien × Jours de Prime × Jours Travaillés) ÷ 365. Cela s'applique même après démission ou licenciement — cela doit être inclus dans votre finiquito."
        },
        {
          "question": "Combien de mon aguinaldo est exonéré d'impôt ?",
          "answer": "Les premiers 30 UMA (3 519,30$ MXN en 2026, basé sur UMA quotidien de 117,31$) sont exonérés d'ISR. Cette exonération n'est JAMAIS proratisée — même si vous avez travaillé seulement 1 mois. Les travailleurs au salaire minimum reçoivent généralement leur prime entière exonérée d'impôt."
        },
        {
          "question": "Dois-je utiliser le salaire mensuel, bihebdomadaire ou quotidien ?",
          "answer": "Utilisez celui qui correspond à votre fiche de paie. Mensuel ÷ 30 = salaire quotidien. Bihebdomadaire (quincenal) ÷ 15 = quotidien. Hebdomadaire ÷ 7 = quotidien. Pour revenu variable, utilisez la moyenne de vos revenus bruts des 30 derniers jours travaillés."
        },
        {
          "question": "Les employés domestiques ont-ils droit à la prime de Noël ?",
          "answer": "Oui. Tous les travailleurs avec une relation d'emploi subordonnée y ont droit, incluant les employés domestiques, jardiniers, soignants et chauffeurs. La prime est proportionnelle aux jours travaillés et basée sur le salaire convenu."
        },
        {
          "question": "Que faire si mon employeur ne paie pas la prime ?",
          "answer": "Déposez une plainte auprès de PROFEDET (800-911-7877 ou gob.mx/profedet). Vous avez jusqu'à 1 an pour réclamer. Les employeurs font face à des amendes et doivent payer la prime plus intérêts et pénalités potentiels."
        }
      ],
      "chart": {
        "title": "Répartition de la Prime",
        "xLabel": "Composant",
        "yLabel": "Montant",
        "series": {
          "exempt": "Exonéré d'Impôt",
          "taxable": "Imposable (ISR)",
          "isrWithheld": "ISR Retenu"
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
      "name": "Weihnachtsgeld Rechner",
      "slug": "weihnachtsgeld-rechner",
      "subtitle": "Berechnen Sie Ihr Aguinaldo, 13. Monatsgehalt oder Weihnachtsgeld für Mexiko und Lateinamerika mit ISR-Steuerschätzung nach offiziellen Art. 96 und Art. 174 Methoden.",
      "breadcrumb": "Weihnachtsgeld",
      "seo": {
        "title": "Weihnachtsgeld Rechner - Aguinaldo & 13. Monatsgehalt",
        "description": "Berechnen Sie Ihr Weihnachtsgeld (Aguinaldo) für Mexiko und Lateinamerika. Erhalten Sie Bruttobonus, ISR-Steuer mit offiziellen Art. 96 und Art. 174 Methoden, Nettobetrag sofort.",
        "shortDescription": "Berechnen Sie Ihr Aguinaldo oder Weihnachtsgeld mit offiziellen ISR-Methoden.",
        "keywords": [
          "weihnachtsgeld rechner",
          "aguinaldo rechner",
          "13 monatsgehalt rechner",
          "aguinaldo mexiko berechnen",
          "aguinaldo ISR steuer",
          "kostenloser aguinaldo rechner",
          "calculadora de aguinaldo",
          "bonus rechner lateinamerika"
        ]
      },
      "inputs": {
        "country": {
          "label": "Land",
          "helpText": "Wählen Sie Ihr Land, um lokale Bonusregeln und Steuergesetze anzuwenden",
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
          "label": "Gehaltshäufigkeit",
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
          "helpText": "Ihr Bruttogehalt (vor Abzügen) für die gewählte Gehaltshäufigkeit"
        },
        "bonusDays": {
          "label": "Bonustage",
          "helpText": "Tage, die Ihr Arbeitgeber als Bonus zahlt (mindestens 15 gesetzlich in Mexiko). Prüfen Sie Ihren Vertrag."
        },
        "workedFullYear": {
          "label": "Ganzjährig gearbeitet (365 Tage)",
          "helpText": "Deaktivieren, wenn Sie dieses Jahr angefangen haben oder nicht die vollen 365 Tage gearbeitet haben"
        },
        "daysWorked": {
          "label": "Gearbeitete Tage dieses Jahr",
          "helpText": "Kalendertage vom Anfangsdatum bis 20. Dezember. Beispiel: angefangen 1. Juli ≈ 173 Tage."
        },
        "calculateISR": {
          "label": "ISR (Einkommensteuer) berechnen",
          "helpText": "Schätzen Sie die Einkommensteuer mit offiziellen SAT-Tabellen und UMA 2026 ($117,31/Tag)"
        },
        "isrMethod": {
          "label": "ISR-Berechnungsmethode",
          "helpText": "Art. 174 führt normalerweise zu niedrigerer Steuer. Ihr Arbeitgeber wählt die Methode.",
          "options": {
            "art96": "Art. 96 LISR (Direkt)",
            "art174": "Art. 174 RLISR (Annualisiert — niedrigere Steuer)"
          }
        },
        "yearsOfService": {
          "label": "Dienstjahre",
          "helpText": "Betriebszugehörigkeit bestimmt Bonus: 1-3 Jahre = 15 Tage, 3-10 = 19 Tage, 10+ = 21 Tage"
        }
      },
      "results": {
        "grossBonus": {
          "label": "Bruttobonus"
        },
        "taxExempt": {
          "label": "Steuerfrei (30 UMA)"
        },
        "taxableAmount": {
          "label": "Steuerpflichtiger Betrag (Gravado)"
        },
        "netBonus": {
          "label": "Geschätzter Nettobonus"
        }
      },
      "presets": {
        "mexicoMinWage": {
          "label": "🇲🇽 Mindestlohn",
          "description": "Mexiko Mindestlohn, 15 Tage Bonus"
        },
        "mexicoAverage": {
          "label": "🇲🇽 Durchschnittsgehalt",
          "description": "Mexiko $15K/Monat, 15 Tage"
        },
        "mexicoProfessional": {
          "label": "🇲🇽 Fachkraft",
          "description": "Mexiko $35K/Monat, 30 Tage"
        },
        "mexicoPartYear": {
          "label": "📅 Teiljahr",
          "description": "Mexiko, 6 Monate gearbeitet"
        }
      },
      "values": {
        "days": "Tage",
        "day": "Tag",
        "exempt": "steuerfrei",
        "taxable": "steuerpflichtig",
        "fullYear": "Ganzjährig",
        "proportional": "Anteilig",
        "noTax": "Steuerfrei in diesem Land",
        "umaLabel": "UMA",
        "art96Label": "Art. 96 LISR (Direkt)",
        "art174Label": "Art. 174 RLISR (Annualisiert)",
        "effectiveRate": "Effektivsatz",
        "fullyExempt": "Vollständig befreit (unter 30 UMA)"
      },
      "formats": {
        "summary": "Ihr geschätztes Weihnachtsgeld beträgt {grossBonus} brutto ({netBonus} netto nach Steuern)."
      },
      "infoCards": {
        "metrics": {
          "title": "Gehaltsaufschlüsselung",
          "items": [
            {
              "label": "Tagesgehalt",
              "valueKey": "dailySalary"
            },
            {
              "label": "Monatsäquivalent",
              "valueKey": "monthlyEquivalent"
            },
            {
              "label": "Bonustage",
              "valueKey": "bonusDaysUsed"
            },
            {
              "label": "Anteilsfaktor",
              "valueKey": "proportionalFactor"
            }
          ]
        },
        "details": {
          "title": "Berechnungsdetails",
          "items": [
            {
              "label": "Verwendete Formel",
              "valueKey": "formulaUsed"
            },
            {
              "label": "Steuer-/Rechtsgrundlage",
              "valueKey": "isrMethodLabel"
            },
            {
              "label": "Abzüge",
              "valueKey": "isrAmount"
            },
            {
              "label": "Effektivsatz",
              "valueKey": "effectiveRate"
            }
          ]
        },
        "tips": {
          "title": "Wichtige Tipps",
          "items": [
            "Ihr Arbeitgeber muss den Bonus bis zum 20. Dezember zahlen. Verspätete Zahlung kann zu Geldstrafen bis zu 5.000× dem täglichen Mindestlohn führen.",
            "Das gesetzliche Minimum sind 15 Tage. Viele Unternehmen bieten 20-40 Tage — prüfen Sie Ihren Vertrag oder fragen Sie die Personalabteilung.",
            "Art. 174 (RLISR) führt normalerweise zu niedrigerer ISR, da der Bonus annualisiert wird, anstatt ihn zu einem Monat hinzuzufügen.",
            "Die 30 UMA-Befreiung ($3.519,30 MXN in 2026) wird NIEMALS anteilig berechnet — auch Teilzeitarbeitnehmer erhalten die volle Befreiung."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist das Weihnachtsgeld (Aguinaldo)?",
          "content": "Das Weihnachtsgeld, in Mexiko und weiten Teilen Lateinamerikas als 'Aguinaldo' bekannt, ist eine gesetzlich vorgeschriebene jährliche Zahlung, die Arbeitgeber ihren Arbeitnehmern gewähren müssen. In Mexiko schreibt Artikel 87 des Bundesarbeitsgesetzes vor, dass Arbeitgeber mindestens 15 Tage Gehalt als Jahresendbonus zahlen müssen, der spätestens am 20. Dezember ausgezahlt wird. Diese Leistung wurde 1970 eingeführt und gilt für alle Arbeitnehmer mit einem formellen Arbeitsverhältnis, einschließlich Hausangestellter, Teilzeitbeschäftigter und Saisonarbeiter. Das Aguinaldo dient als finanzielle Unterstützung während der Feiertage und ist eine der wichtigsten Arbeitnehmerleistungen in der Region. Viele Unternehmen bieten freiwillig mehr als das gesetzliche Minimum — 20, 30 oder sogar 40 Tage — als Teil ihres Vergütungspakets, um Talente zu gewinnen und zu halten. Jüngste Gesetzesvorschläge haben versucht, das Minimum auf 30 Tage zu erhöhen, obwohl das gesetzliche Minimum ab 2026 bei 15 Tagen bleibt."
        },
        "howItWorks": {
          "title": "Wie wird der Bonus berechnet? (Einschließlich ISR-Methoden)",
          "content": "Die Berechnung beginnt mit Ihrem Tagesgehalt (monatlich ÷ 30, zweiwöchentlich ÷ 15, wöchentlich ÷ 7). Dieser Tagessatz wird mit Ihren Bonustagen multipliziert. Wenn Sie nicht das ganze Jahr gearbeitet haben, ist der Bonus anteilig: (Tagesgehalt × Bonustage × Gearbeitete Tage) ÷ 365. Für ISR in Mexiko sind die ersten 30 UMA ($3.519,30 MXN in 2026) immer befreit. Für den steuerpflichtigen Rest gibt es ZWEI offizielle Methoden. Die Art. 96-Methode addiert den steuerpflichtigen Bonus direkt zu Ihrem Monatsgehalt und wendet die ISR-Tabelle an — dies kann Sie in eine höhere Steuerklasse drängen, was zu mehr Steuern führt. Die Art. 174-Methode (Reglamento) teilt den steuerpflichtigen Bonus durch 365, multipliziert mit 30,4 für ein Monatsäquivalent, berechnet die ISR-Differenz (mit vs. ohne Bonus) und leitet einen Effektivsatz ab — diese Methode führt typischerweise zu 15-30% weniger ISR-Einbehaltung. Ihr Arbeitgeber wählt, welche Methode verwendet wird, aber beide sind legal. Wenn Sie glauben, dass zu viel ISR einbehalten wurde, können Sie den Überschuss in Ihrer Jahressteuererklärung zurückerhalten."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Nur Grundgehalt: Überstunden, Provisionen und Leistungsboni sind ausgeschlossen, es sei denn, Ihr Vertrag sagt etwas anderes. Für variable Bezahlung verwenden Sie den Durchschnitt der letzten 30 Arbeitstage.",
              "type": "info"
            },
            {
              "text": "Das Verpassen der Frist vom 20. Dezember kann zu Arbeitgeberbußgeldern von 50 bis 5.000× dem täglichen Mindestlohn durch STPS führen.",
              "type": "warning"
            },
            {
              "text": "Gekündigte oder entlassene Arbeitnehmer haben Anspruch auf anteiligen Bonus für gearbeitete Tage — dies muss in Ihrem Finiquito/Liquidación enthalten sein.",
              "type": "info"
            },
            {
              "text": "Die 30 UMA-Steuerbefreiung wird NIEMALS anteilig berechnet — auch wenn Sie nur 1 Monat gearbeitet haben, gilt die volle $3.519,30 MXN-Befreiung für Ihren Bonus.",
              "type": "info"
            },
            {
              "text": "Selbständige Auftragnehmer (Honorarios/Freelancer) haben KEINEN Anspruch auf Aguinaldo, es sei denn, ein untergeordnetes Arbeitsverhältnis kann rechtlich nachgewiesen werden.",
              "type": "warning"
            },
            {
              "text": "Arbeitgeber, die Boni über das gesetzliche Minimum zahlen, sollten dies im CFDI de nómina dokumentieren und befreite und steuerpflichtige Teile korrekt trennen.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Weihnachtsgeld nach Land",
          "items": [
            {
              "text": "Mexiko (Aguinaldo): Min. 15 Tage Gehalt. Zahlung bis 20. Dez. Erste 30 UMA von ISR befreit. Zwei ISR-Methoden: Art. 96 (direkt) und Art. 174 (annualisiert).",
              "type": "info"
            },
            {
              "text": "Kolumbien (Prima de Servicios): 1 Monatsgehalt/Jahr in 2 Zahlungen (Juni + Dezember). Verwendet 360-Tage-Perioden. Beinhaltet Transportzuschuss wenn Gehalt ≤ 2 SMMLV.",
              "type": "info"
            },
            {
              "text": "Argentinien (SAC): 50% des besten Monatsgehalts jedes Halbjahres. Zahlung Juni + Dezember. Unterliegt Jubilación (11%), Obra Social (3%) und Sindicato-Abzügen.",
              "type": "info"
            },
            {
              "text": "Peru (Gratificación): 1 volles Gehalt im Juli + Dezember, plus 9% EsSalud-Bonus. Seit 2015 von Einkommensteuer befreit. Netto = Gehalt × 1,09.",
              "type": "info"
            },
            {
              "text": "Brasilien (13º Salário): 1 Monatsgehalt in 2 Raten (Nov + Dez). 1. Rate: keine Abzüge. 2.: INSS (7,5-14%) + IRRF auf beide angewendet.",
              "type": "info"
            },
            {
              "text": "Dominikanische Republik (Salario de Navidad): 1/12 des Jahreseinkommens. 100% von ISR befreit. Muss bis 20. Dezember gezahlt werden.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt-Berechnungen für häufige Szenarien",
          "examples": [
            {
              "title": "Ganzjahresarbeiter — Art. 174-Methode",
              "steps": [
                "Monatsgehalt: $15.000 MXN → Täglich: $500",
                "Bonus (15 Tage): $500 × 15 = $7.500 brutto",
                "Befreit (30 UMA): 30 × $117,31 = $3.519,30",
                "Steuerpflichtig: $7.500 - $3.519,30 = $3.980,70",
                "Art. 174: ($3.980,70 ÷ 365) × 30,4 = $331,56/Monat",
                "Effektivsatz angewendet auf $3.980,70 → ISR ≈ $365"
              ],
              "result": "Brutto: $7.500 | ISR: ~$365 | Netto: ~$7.135"
            },
            {
              "title": "Teilzeitarbeiter (6 Monate)",
              "steps": [
                "Monatsgehalt: $12.000 → Täglich: $400",
                "Voller Bonus: $400 × 15 = $6.000",
                "Anteilig: $6.000 × (180 ÷ 365) = $2.958,90",
                "Befreit (30 UMA): $3.519,30",
                "$2.958,90 < $3.519,30 → vollständig befreit"
              ],
              "result": "Nettobonus: $2.958,90 — null ISR, Sie behalten 100%."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist das gesetzliche Mindestweihnachtsgeld in Mexiko?",
          "answer": "Das Bundesarbeitsgesetz (Art. 87) schreibt mindestens 15 Tage Grundgehalt vor. Viele Unternehmen bieten 20-40 Tage als zusätzliche Leistung. Ab 2026 bleibt das gesetzliche Minimum bei 15 Tagen trotz Vorschlägen, es auf 30 zu erhöhen."
        },
        {
          "question": "Wann muss das Weihnachtsgeld gezahlt werden?",
          "answer": "Spätestens am 20. Dezember. Verspätete Zahlung kann zu Geldstrafen von 50 bis 5.000× dem täglichen Mindestlohn führen. Beschwerden bei PROFEDET (800-911-7877) oder STPS einreichen, wenn Ihr Arbeitgeber die Frist verpasst."
        },
        {
          "question": "Was ist der Unterschied zwischen Art. 96 und Art. 174 für ISR?",
          "answer": "Art. 96 (direkt) addiert den steuerpflichtigen Bonus zu Ihrem Monatsgehalt und wendet die Steuertabelle an — dies kann Sie in eine höhere Steuerklasse drängen. Art. 174 (annualisiert) teilt den steuerpflichtigen Bonus durch 365, multipliziert mit 30,4 und berechnet einen Effektivsatz — normalerweise 15-30% niedrigere ISR. Ihr Arbeitgeber wählt die Methode."
        },
        {
          "question": "Bekomme ich einen Bonus, wenn ich weniger als ein Jahr gearbeitet habe?",
          "answer": "Ja. Sie erhalten einen anteiligen Bonus: (Tagesgehalt × Bonustage × Gearbeitete Tage) ÷ 365. Dies gilt auch nach Kündigung oder Entlassung — es muss in Ihrem Finiquito enthalten sein."
        },
        {
          "question": "Wie viel meines Aguinaldos ist steuerfrei?",
          "answer": "Die ersten 30 UMA ($3.519,30 MXN in 2026, basierend auf täglicher UMA von $117,31) sind von ISR befreit. Diese Befreiung wird NIEMALS anteilig berechnet — auch wenn Sie nur 1 Monat gearbeitet haben. Mindestlohnarbeiter erhalten typischerweise ihren gesamten Bonus steuerfrei."
        },
        {
          "question": "Soll ich monatliches, zweiwöchentliches oder tägliches Gehalt verwenden?",
          "answer": "Verwenden Sie das, was zu Ihrer Gehaltsabrechnung passt. Monatlich ÷ 30 = Tagesgehalt. Zweiwöchentlich (quincenal) ÷ 15 = täglich. Wöchentlich ÷ 7 = täglich. Für variables Einkommen verwenden Sie den Durchschnitt Ihrer Bruttoeinnahmen der letzten 30 Arbeitstage."
        },
        {
          "question": "Haben Hausangestellte Anspruch auf Weihnachtsgeld?",
          "answer": "Ja. Alle Arbeitnehmer mit einem untergeordneten Arbeitsverhältnis haben Anspruch, einschließlich Hausangestellter, Gärtner, Pflegekräfte und Fahrer. Der Bonus ist anteilig zu den gearbeiteten Tagen und basiert auf dem vereinbarten Lohn."
        },
        {
          "question": "Was ist, wenn mein Arbeitgeber den Bonus nicht zahlt?",
          "answer": "Beschwerde bei PROFEDET (800-911-7877 oder gob.mx/profedet) einreichen. Sie haben bis zu 1 Jahr Zeit zum Klagen. Arbeitgeber drohen Geldstrafen und müssen den Bonus plus mögliche Zinsen und Strafen zahlen."
        }
      ],
      "chart": {
        "title": "Bonusaufschlüsselung",
        "xLabel": "Komponente",
        "yLabel": "Betrag",
        "series": {
          "exempt": "Steuerfrei",
          "taxable": "Steuerpflichtig (ISR)",
          "isrWithheld": "ISR einbehalten"
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
      id: "workedFullYear",
      type: "toggle",
      defaultValue: true,
    },
    {
      id: "daysWorked",
      type: "number",
      defaultValue: null,
      placeholder: "180",
      min: 1,
      max: 365,
      step: 1,
      suffix: "days",
      showWhen: { field: "workedFullYear", value: false },
    },
    {
      id: "calculateISR",
      type: "toggle",
      defaultValue: true,
      showWhen: { field: "country", value: "MX" },
    },
    {
      id: "isrMethod",
      type: "radio",
      defaultValue: "art174",
      options: [{ value: "art96" }, { value: "art174" }],
      showWhen: { field: "country", value: "MX" },
    },
    {
      id: "yearsOfService",
      type: "stepper",
      defaultValue: 1,
      min: 1,
      max: 50,
      step: 1,
      suffix: "years",
      showWhen: { field: "country", value: "SV" },
    },
  ],

  inputGroups: [],

  results: [
    { id: "grossBonus", type: "primary", format: "text" },
    { id: "taxExempt", type: "secondary", format: "text" },
    { id: "taxableAmount", type: "secondary", format: "text" },
    { id: "netBonus", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "💰", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "bonusBreakdown",
    type: "bar",
    xKey: "label",
    height: 280,
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "exempt", type: "bar", stackId: "bonus", color: "#10b981" },
      { key: "taxable", type: "bar", stackId: "bonus", color: "#f97316" },
      { key: "isrWithheld", type: "bar", color: "#ef4444" },
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
      title: "Ley Federal del Trabajo — Artículo 87 (Aguinaldo)",
      source: "Diario Oficial de la Federación",
      url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf",
    },
    {
      authors: "INEGI",
      year: "2026",
      title: "Unidad de Medida y Actualización (UMA) — Valor diario $117.31",
      source: "Instituto Nacional de Estadística y Geografía",
      url: "https://www.inegi.org.mx/temas/uma/",
    },
    {
      authors: "SAT — Servicio de Administración Tributaria",
      year: "2026",
      title: "LISR Art. 93 Fracc. XIV (Exención) + Art. 96 (Tablas ISR) + Reglamento Art. 174 (Método alternativo)",
      source: "SAT México",
      url: "https://www.sat.gob.mx/",
    },
  ],

  hero: { badge: "Finance", badgeVariant: "green" },
  sidebar: {},
  features: {},
  relatedCalculators: ["salary", "compound-interest", "savings-goal"],
  ads: {},
};

// ═══════════════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════════
export function calculateChristmasBonus(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
  country?: string;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ───────────────────────────────────────────────────
  const country = (values.country as string) || "MX";
  const salaryFrequency = (values.salaryFrequency as string) || "monthly";
  const salaryRaw = values.salary as number | null;
  const bonusDays = (values.bonusDays as number) || 15;
  const workedFullYear = (values.workedFullYear as boolean) ?? true;
  const daysWorked = workedFullYear ? 365 : ((values.daysWorked as number) || 0);
  const calculateISR = (values.calculateISR as boolean) ?? true;
  const isrMethod = (values.isrMethod as string) || "art174";
  const yearsOfService = (values.yearsOfService as number) || 1;

  // ── Currency symbol (auto from country) ────────────────────────────
  const currencyInfo = COUNTRY_CURRENCY[country] || COUNTRY_CURRENCY.MX;
  const sym = currencyInfo.symbol;

  // ── Validate ──────────────────────────────────────────────────────
  if (salaryRaw === null || salaryRaw <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (!workedFullYear && (!daysWorked || daysWorked <= 0)) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Convert to daily salary ───────────────────────────────────────
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
    default: // monthly
      dailySalary = salaryRaw / 30;
      monthlyEquivalent = salaryRaw;
      break;
  }

  // ── Common setup ────────────────────────────────────────────────────
  const countryData = COUNTRY_DATA[country] || COUNTRY_DATA.MX;
  const periodDays = countryData.periodDays;
  const isFullYear = daysWorked >= periodDays;
  const proportionalFactor = isFullYear ? 1 : daysWorked / periodDays;

  let grossBonus = 0;
  let taxExemptAmount = 0;
  let taxableAmount = 0;
  let isrAmount = 0;
  let netBonus = 0;
  let effectiveISRRate = 0;
  let isrMethodLabel = "";
  let effectiveBonusDays = bonusDays;
  let formulaUsed = "";

  // ═══════════════════════════════════════════════════════════════════
  // COUNTRY-SPECIFIC FORMULAS
  // ═══════════════════════════════════════════════════════════════════

  switch (country) {

    // ─── 🇲🇽 MEXICO: Daily × BonusDays × (days/365) — ISR ─────────
    case "MX": {
      grossBonus = isFullYear
        ? dailySalary * bonusDays
        : (dailySalary * bonusDays * daysWorked) / 365;

      formulaUsed = `Daily(${sym}${dailySalary.toFixed(2)}) × ${bonusDays}d` +
        (isFullYear ? "" : ` × ${daysWorked}/365`);

      // ISR calculation
      if (calculateISR) {
        taxExemptAmount = UMA_EXEMPT_DAYS * UMA_DAILY_2026; // $3,519.30

        if (grossBonus <= taxExemptAmount) {
          taxableAmount = 0;
          isrAmount = 0;
          isrMethodLabel = v["fullyExempt"] || "Fully exempt (below 30 UMA)";
        } else {
          taxableAmount = grossBonus - taxExemptAmount;

          if (isrMethod === "art174") {
            // ART. 174 RLISR (Annualized)
            const monthlyTaxableBonus = (taxableAmount / 365) * 30.4;
            const isrWithBonus = calculateISRArt96(monthlyEquivalent + monthlyTaxableBonus);
            const isrOrdinary = calculateISRArt96(monthlyEquivalent);
            const isrIncrement = isrWithBonus - isrOrdinary;
            if (monthlyTaxableBonus > 0) {
              effectiveISRRate = isrIncrement / monthlyTaxableBonus;
            }
            isrAmount = effectiveISRRate * taxableAmount;
            isrMethodLabel = v["art174Label"] || "Art. 174 RLISR (Annualized)";
          } else {
            // ART. 96 LISR (Direct)
            const isrWithBonus = calculateISRArt96(monthlyEquivalent + taxableAmount);
            const isrOrdinary = calculateISRArt96(monthlyEquivalent);
            isrAmount = isrWithBonus - isrOrdinary;
            isrMethodLabel = v["art96Label"] || "Art. 96 LISR (Direct)";
          }
          if (taxableAmount > 0) effectiveISRRate = isrAmount / taxableAmount;
        }
        isrAmount = Math.max(0, isrAmount);
      }
      netBonus = grossBonus - isrAmount;
      break;
    }

    // ─── 🇩🇴 DOMINICAN REPUBLIC: 1/12 of annual earnings ──────────
    // Art. 219 Código de Trabajo. 100% exempt from ISR.
    case "DO": {
      const annualSalary = monthlyEquivalent * 12;
      grossBonus = isFullYear
        ? annualSalary / 12       // = 1 month salary
        : (annualSalary / 12) * proportionalFactor;

      formulaUsed = `Annual(${sym}${annualSalary.toLocaleString("en-US", {maximumFractionDigits: 0})}) ÷ 12` +
        (isFullYear ? "" : ` × ${(proportionalFactor * 100).toFixed(1)}%`);
      effectiveBonusDays = 30;
      taxExemptAmount = grossBonus;
      isrMethodLabel = "100% exempt (Art. 219 CT)";
      netBonus = grossBonus;
      break;
    }

    // ─── 🇨🇴 COLOMBIA: Salary × daysWorked / 360 (per semester) ───
    // Art. 306 CST. Prima de servicios = 1 month/year in 2 payments.
    case "CO": {
      // Uses 360-day year (Colombian labor standard)
      grossBonus = isFullYear
        ? monthlyEquivalent        // Full semester = 1 month
        : monthlyEquivalent * (daysWorked / 360);

      formulaUsed = `Monthly(${sym}${monthlyEquivalent.toLocaleString("en-US", {maximumFractionDigits: 0})})` +
        (isFullYear ? "" : ` × ${daysWorked}/360`);
      effectiveBonusDays = 30;
      taxExemptAmount = grossBonus;
      isrMethodLabel = "Not subject to retention (Prima)";
      netBonus = grossBonus;
      break;
    }

    // ─── 🇦🇷 ARGENTINA: 50% of best monthly salary of semester ────
    // Art. 121-123 LCT. SAC = Sueldo Anual Complementario.
    case "AR": {
      // SAC = 50% of best monthly salary, proportional to months in semester
      const monthsWorked = isFullYear ? 6 : Math.min(6, Math.round(daysWorked / 30));
      grossBonus = (monthlyEquivalent * 0.5) * (monthsWorked / 6);

      formulaUsed = `50% × Monthly(${sym}${monthlyEquivalent.toLocaleString("en-US", {maximumFractionDigits: 0})})` +
        (monthsWorked < 6 ? ` × ${monthsWorked}/6 months` : "");
      effectiveBonusDays = 15; // equivalent
      taxExemptAmount = grossBonus;
      isrMethodLabel = "Subject to jubilación (11%), obra social (3%)";
      // Simplified: not deducting AR social charges here
      netBonus = grossBonus;
      break;
    }

    // ─── 🇵🇪 PERU: 1 full salary + 9% EsSalud bonus ──────────────
    // Ley 27735. Gratificación = salary × 1.09, proportional to months.
    case "PE": {
      const monthsWorked = isFullYear ? 6 : Math.min(6, Math.round(daysWorked / 30));
      const baseGratification = monthlyEquivalent * (monthsWorked / 6);
      const essaludBonus = baseGratification * 0.09;
      grossBonus = baseGratification + essaludBonus;

      formulaUsed = `Monthly(${sym}${monthlyEquivalent.toLocaleString("en-US", {maximumFractionDigits: 0})})` +
        (monthsWorked < 6 ? ` × ${monthsWorked}/6` : "") +
        ` + 9% EsSalud`;
      effectiveBonusDays = 30;
      taxExemptAmount = grossBonus;
      isrMethodLabel = "100% exempt from income tax (Ley 30334)";
      netBonus = grossBonus;
      break;
    }

    // ─── 🇧🇷 BRAZIL: 13º salário = monthly × months/12 — INSS ────
    // Lei 4.090/1962. Subject to INSS + IRRF deductions.
    case "BR": {
      const monthsWorked = isFullYear ? 12 : Math.max(1, Math.round(daysWorked / 30));
      grossBonus = monthlyEquivalent * (monthsWorked / 12);

      // Simplified INSS deduction (2026 rates)
      let inssRate = 0;
      if (grossBonus <= 1518.00) inssRate = 0.075;
      else if (grossBonus <= 2793.88) inssRate = 0.09;
      else if (grossBonus <= 4190.83) inssRate = 0.12;
      else inssRate = 0.14;
      const inssDeduction = grossBonus * inssRate;

      formulaUsed = `Monthly(${sym}${monthlyEquivalent.toLocaleString("en-US", {maximumFractionDigits: 0})}) × ${monthsWorked}/12 − INSS(${(inssRate * 100).toFixed(1)}%)`;
      effectiveBonusDays = 30;
      taxableAmount = grossBonus;
      isrAmount = inssDeduction; // Simplified: using INSS as main deduction
      isrMethodLabel = `INSS ${(inssRate * 100).toFixed(1)}% + IRRF (if applicable)`;
      netBonus = grossBonus - inssDeduction;
      break;
    }

    // ─── 🇸🇻 EL SALVADOR: Daily × days(seniority) × (worked/365) ──
    // Art. 196-202 CT. Days vary: 1-3yrs=15d, 3-10yrs=19d, 10+=21d.
    case "SV": {
      if (yearsOfService >= 10) effectiveBonusDays = 21;
      else if (yearsOfService >= 3) effectiveBonusDays = 19;
      else effectiveBonusDays = 15;

      grossBonus = isFullYear
        ? dailySalary * effectiveBonusDays
        : (dailySalary * effectiveBonusDays * daysWorked) / 365;

      formulaUsed = `Daily(${sym}${dailySalary.toFixed(2)}) × ${effectiveBonusDays}d (${yearsOfService}yr seniority)` +
        (isFullYear ? "" : ` × ${daysWorked}/365`);
      taxExemptAmount = grossBonus;
      isrMethodLabel = "Exempt from ISR";
      netBonus = grossBonus;
      break;
    }

    // ─── 🇬🇹🇨🇷🇭🇳 GT/CR/HN: 1 month salary, proportional ────────
    // GT: Art. 102 CT. CR: Art. 87 CT. HN: Decreto 135.
    default: {
      grossBonus = isFullYear
        ? monthlyEquivalent
        : monthlyEquivalent * proportionalFactor;

      formulaUsed = `Monthly(${sym}${monthlyEquivalent.toLocaleString("en-US", {maximumFractionDigits: 0})})` +
        (isFullYear ? "" : ` × ${(proportionalFactor * 100).toFixed(1)}%`);
      effectiveBonusDays = 30;
      taxExemptAmount = grossBonus;
      isrMethodLabel = "Exempt from income tax";
      netBonus = grossBonus;
      break;
    }
  }

  // ── Labels ────────────────────────────────────────────────────────
  const daysLabel = v["days"] || "days";
  const fullYearLabel = v["fullYear"] || "Full year";
  const proportionalLabel = v["proportional"] || "Proportional";

  // ── Chart data (MX only when ISR active) ──────────────────────────
  const chartData = country === "MX" && calculateISR && taxableAmount > 0 ? [
    {
      label: "Your Bonus",
      exempt: Math.min(grossBonus, taxExemptAmount),
      taxable: Math.max(0, taxableAmount - isrAmount),
      isrWithheld: Math.max(0, isrAmount),
    },
  ] : [];

  // ── Format results ────────────────────────────────────────────────
  const formatted: Record<string, string> = {
    grossBonus: fmtCurr(grossBonus, sym),
    taxExempt: country === "MX" && calculateISR
      ? fmtCurr(Math.min(grossBonus, taxExemptAmount), sym)
      : isrMethodLabel,
    taxableAmount: fmtCurr(taxableAmount, sym),
    netBonus: fmtCurr(netBonus, sym),
    dailySalary: fmtCurr(dailySalary, sym),
    monthlyEquivalent: fmtCurr(monthlyEquivalent, sym),
    bonusDaysUsed: country === "MX" ? `${bonusDays} ${daysLabel}` : `${effectiveBonusDays} ${daysLabel}`,
    daysWorkedDisplay: isFullYear
      ? `365 ${daysLabel} (${fullYearLabel})`
      : `${daysWorked} ${daysLabel} (${proportionalLabel})`,
    proportionalFactor: isFullYear ? "100%" : `${(proportionalFactor * 100).toFixed(1)}%`,
    umaDaily: country === "MX"
      ? `MX$${UMA_DAILY_2026.toFixed(2)} (${v["umaLabel"] || "UMA"} 2026)`
      : "N/A",
    isrAmount: fmtCurr(isrAmount, sym),
    effectiveRate: taxableAmount > 0 && isrAmount > 0
      ? `${(effectiveISRRate * 100).toFixed(2)}%`
      : "0%",
    isrMethodLabel: isrMethodLabel || "N/A",
    formulaUsed: formulaUsed,
  };

  // ── Summary ───────────────────────────────────────────────────────
  const summary = f.summary
    ?.replace("{grossBonus}", formatted.grossBonus)
    ?.replace("{netBonus}", formatted.netBonus)
    || `Your Christmas bonus is ${formatted.grossBonus} gross (${formatted.netBonus} net).`;

  return {
    values: {
      grossBonus,
      taxExempt: Math.min(grossBonus, taxExemptAmount),
      taxableAmount,
      netBonus,
      dailySalary,
      monthlyEquivalent,
      bonusDaysUsed: effectiveBonusDays,
      daysWorkedDisplay: daysWorked,
      proportionalFactor: proportionalFactor * 100,
      umaDaily: UMA_DAILY_2026,
      isrAmount,
      effectiveRate: effectiveISRRate * 100,
    },
    formatted,
    summary,
    isValid: true,
    metadata: {
      chartData,
    },
  };
}

export default christmasBonusConfig;
