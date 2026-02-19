import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════
// 💵 PAYCHECK CALCULATOR — Take-Home Pay Estimator
// ═══════════════════════════════════════════════════════════════════

export const paycheckCalculatorConfig: CalculatorConfigV4 = {
  id: "paycheck-calculator",
  version: "4.0",
  category: "finance",
  icon: "💵",

  presets: [
    {
      id: "entrySalary",
      icon: "🎓",
      values: {
        payType: "salary",
        grossSalary: 45000,
        hourlyRate: 21.63,
        hoursPerWeek: 40,
        payFrequency: "biweekly",
        filingStatus: "single",
        state: "none",
        allowances: 1,
        preTax401k: 0,
        preTaxHealth: 0,
        preTaxHSA: 0,
        otherPreTax: 0,
        includeOvertime: false,
        overtimeHours: 0,
        overtimeRate: 1.5,
      },
    },
    {
      id: "midCareer",
      icon: "💼",
      values: {
        payType: "salary",
        grossSalary: 75000,
        hourlyRate: 36.06,
        hoursPerWeek: 40,
        payFrequency: "biweekly",
        filingStatus: "single",
        state: "CA",
        allowances: 1,
        preTax401k: 375,
        preTaxHealth: 200,
        preTaxHSA: 0,
        otherPreTax: 0,
        includeOvertime: false,
        overtimeHours: 0,
        overtimeRate: 1.5,
      },
    },
    {
      id: "familyProvider",
      icon: "👨‍👩‍👧",
      values: {
        payType: "salary",
        grossSalary: 95000,
        hourlyRate: 45.67,
        hoursPerWeek: 40,
        payFrequency: "biweekly",
        filingStatus: "marriedJoint",
        state: "TX",
        allowances: 4,
        preTax401k: 500,
        preTaxHealth: 450,
        preTaxHSA: 150,
        otherPreTax: 0,
        includeOvertime: false,
        overtimeHours: 0,
        overtimeRate: 1.5,
      },
    },
    {
      id: "hourlyWorker",
      icon: "⏰",
      values: {
        payType: "hourly",
        grossSalary: 41600,
        hourlyRate: 20,
        hoursPerWeek: 40,
        payFrequency: "biweekly",
        filingStatus: "single",
        state: "FL",
        allowances: 1,
        preTax401k: 0,
        preTaxHealth: 100,
        preTaxHSA: 0,
        otherPreTax: 0,
        includeOvertime: true,
        overtimeHours: 5,
        overtimeRate: 1.5,
      },
    },
    {
      id: "highEarner",
      icon: "🏆",
      values: {
        payType: "salary",
        grossSalary: 175000,
        hourlyRate: 84.13,
        hoursPerWeek: 40,
        payFrequency: "monthly",
        filingStatus: "marriedJoint",
        state: "NY",
        allowances: 3,
        preTax401k: 1000,
        preTaxHealth: 500,
        preTaxHSA: 300,
        otherPreTax: 0,
        includeOvertime: false,
        overtimeHours: 0,
        overtimeRate: 1.5,
      },
    },
  ],

  t: {
    en: {
      name: "Paycheck Calculator",
      slug: "paycheck-calculator",
      breadcrumb: "Paycheck Calculator",

      seo: {
        title: "Paycheck Calculator - Free Take-Home Pay Estimator",
        description: "Calculate your take-home pay after federal tax, state tax, Social Security, and Medicare. Supports all 50 US states, hourly and salary. Free paycheck calculator.",
        shortDescription: "Estimate your net paycheck after all taxes and deductions.",
        keywords: [
          "paycheck calculator",
          "take home pay calculator",
          "salary calculator after taxes",
          "net pay calculator",
          "payroll calculator",
          "free paycheck calculator",
          "hourly paycheck calculator",
          "paycheck tax calculator",
        ],
      },

      subtitle: "See exactly how much you take home each paycheck after federal tax, state tax, Social Security, Medicare, and deductions.",

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Paycheck Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        payType: {
          label: "Pay Type",
          helpText: "How you are compensated",
          options: {
            salary: "Annual Salary",
            hourly: "Hourly Rate",
          },
        },
        grossSalary: {
          label: "Annual Gross Salary",
          helpText: "Your total annual salary before any deductions",
        },
        hourlyRate: {
          label: "Hourly Rate",
          helpText: "Your regular hourly wage",
        },
        hoursPerWeek: {
          label: "Hours per Week",
          helpText: "Regular hours worked per week (before overtime)",
        },
        payFrequency: {
          label: "Pay Frequency",
          helpText: "How often you receive a paycheck",
          options: {
            weekly: "Weekly (52/yr)",
            biweekly: "Bi-weekly (26/yr)",
            semimonthly: "Semi-monthly (24/yr)",
            monthly: "Monthly (12/yr)",
          },
        },
        filingStatus: {
          label: "Filing Status",
          helpText: "Your federal tax filing status",
          options: {
            single: "Single",
            marriedJoint: "Married Filing Jointly",
            marriedSeparate: "Married Filing Separately",
            headOfHousehold: "Head of Household",
          },
        },
        state: {
          label: "State",
          helpText: "Your state for state income tax calculation",
          options: {
            none: "No State Tax",
            AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas",
            CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
            FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho",
            IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas",
            KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
            MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
            MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
            NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
            NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma",
            OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
            SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah",
            VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia",
            WI: "Wisconsin", WY: "Wyoming", DC: "Washington D.C.",
          },
        },
        allowances: {
          label: "Federal Allowances",
          helpText: "Number of allowances from your W-4 (0 = most tax withheld)",
        },
        preTax401k: {
          label: "401(k) Contribution",
          helpText: "Pre-tax retirement contribution per paycheck",
        },
        preTaxHealth: {
          label: "Health Insurance",
          helpText: "Pre-tax health insurance premium per paycheck",
        },
        preTaxHSA: {
          label: "HSA Contribution",
          helpText: "Health Savings Account contribution per paycheck",
        },
        otherPreTax: {
          label: "Other Pre-Tax Deductions",
          helpText: "Other pre-tax deductions per paycheck (FSA, transit, etc.)",
        },
        includeOvertime: {
          label: "Include Overtime",
          helpText: "Add overtime hours to your paycheck calculation",
        },
        overtimeHours: {
          label: "Overtime Hours/Week",
          helpText: "Average overtime hours per week",
        },
        overtimeRate: {
          label: "Overtime Multiplier",
          helpText: "Overtime pay rate multiplier (1.5x = time and a half)",
          options: {
            "1.5": "1.5x (Time & Half)",
            "2": "2x (Double Time)",
          },
        },
      },

      results: {
        netPay: { label: "Take-Home Pay" },
        grossPay: { label: "Gross Pay" },
        federalTax: { label: "Federal Tax" },
        stateTax: { label: "State Tax" },
        socialSecurity: { label: "Social Security" },
        medicare: { label: "Medicare" },
        totalTax: { label: "Total Taxes" },
        totalDeductions: { label: "Total Deductions" },
        effectiveTaxRate: { label: "Effective Tax Rate" },
        annualNet: { label: "Annual Take-Home" },
        annualGross: { label: "Annual Gross" },
        annualTax: { label: "Annual Total Tax" },
      },

      presets: {
        entrySalary: { label: "Entry Level", description: "$45K salary, single, no state tax" },
        midCareer: { label: "Mid Career", description: "$75K salary, single, California, 401(k)" },
        familyProvider: { label: "Family Provider", description: "$95K, married, Texas, full benefits" },
        hourlyWorker: { label: "Hourly + OT", description: "$20/hr + 5hrs overtime, biweekly, Florida" },
        highEarner: { label: "High Earner", description: "$175K, married, New York, max deductions" },
      },

      values: {
        "perPaycheck": "/paycheck",
        "perYear": "/year",
        "perMonth": "/month",
        "perWeek": "/week",
        "weekly": "Weekly",
        "biweekly": "Bi-weekly",
        "semimonthly": "Semi-monthly",
        "monthly": "Monthly",
      },

      formats: {
        summary: "Your take-home pay is {netPay} per paycheck ({annualNet} annually) from a gross of {grossPay} after {totalTax} in total taxes.",
      },

      infoCards: {
        metrics: {
          title: "Pay Insights",
          items: [
            { label: "Percent You Keep", valueKey: "percentKept" },
            { label: "Hourly Equivalent (Net)", valueKey: "netHourly" },
            { label: "Daily Take-Home", valueKey: "dailyNet" },
            { label: "Monthly Take-Home", valueKey: "monthlyNet" },
          ],
        },
        details: {
          title: "Tax Insights",
          items: [
            { label: "Tax Freedom Day", valueKey: "taxFreedomDay" },
            { label: "FICA as % of Gross", valueKey: "ficaPercent" },
            { label: "Deduction Tax Savings", valueKey: "deductionSavings" },
            { label: "Annual Pre-Tax Deductions", valueKey: "annualPreTax" },
          ],
        },
        tips: {
          title: "Paycheck Tips",
          items: [
            "Maximize 401(k) contributions to lower taxable income — every pre-tax dollar saves you your marginal rate",
            "HSA contributions are triple tax-advantaged: deductible, grow tax-free, and tax-free for medical expenses",
            "Review your W-4 after major life changes — marriage, new child, or buying a home affects withholding",
            "Nine US states have no income tax: AK, FL, NV, NH, SD, TN, TX, WA, WY",
          ],
        },
      },

      chart: {
        title: "Paycheck Breakdown",
        xLabel: "Category",
        yLabel: "Amount",
        series: {
          netPay: "Take-Home Pay",
          federalTax: "Federal Tax",
          stateTax: "State Tax",
          fica: "FICA (SS + Medicare)",
          deductions: "Deductions",
        },
      },

      detailedTable: {
        annualTable: {
          button: "View Annual Tax Summary",
          title: "Annual Tax & Deduction Summary",
          columns: {
            item: "Item",
            perPaycheck: "Per Paycheck",
            monthly: "Monthly",
            annual: "Annual",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is a Paycheck Calculator?",
          content: "A paycheck calculator estimates your take-home pay — the amount deposited into your bank account after all taxes and deductions are withheld from your gross pay. Your employer withholds federal income tax, state income tax (in most states), Social Security tax (6.2%), and Medicare tax (1.45%) from every paycheck. Additionally, voluntary pre-tax deductions like 401(k) contributions, health insurance premiums, and HSA contributions reduce your taxable income and are subtracted before taxes are calculated. Understanding your net pay helps you budget accurately, compare job offers, and optimize your tax withholding strategy.",
        },
        howItWorks: {
          title: "How Paycheck Taxes Are Calculated",
          content: "Federal income tax uses progressive brackets where different portions of your income are taxed at increasing rates. For 2025, a single filer pays 10% on income up to $11,925, then 12% up to $48,475, 22% up to $103,350, 24% up to $197,300, and higher rates above that. Your taxable income is your gross pay minus pre-tax deductions and the standard deduction ($15,000 for single, $30,000 for married filing jointly in 2025). Social Security tax is a flat 6.2% on income up to $176,100. Medicare is 1.45% on all income, plus an additional 0.9% on income over $200,000 (single) or $250,000 (married). State taxes vary widely from 0% to over 13% depending on the state.",
        },
        considerations: {
          title: "Important Paycheck Factors",
          items: [
            { text: "Pre-tax deductions (401k, health, HSA) reduce your taxable income, effectively giving you a discount equal to your marginal tax rate", type: "info" },
            { text: "The standard deduction for 2025 is $15,000 (single) or $30,000 (married filing jointly) — this is not taxed at all", type: "info" },
            { text: "Social Security tax stops at $176,100 in 2025 — higher earners see a paycheck bump after reaching this cap", type: "info" },
            { text: "State income tax varies dramatically: California tops out at 13.3%, while 9 states charge nothing", type: "warning" },
            { text: "Overtime pay is taxed at your regular income tax rate, not a special higher rate — it just may push you into a higher bracket", type: "info" },
            { text: "Changing your W-4 allowances adjusts withholding — more allowances means less tax withheld per paycheck", type: "warning" },
          ],
        },
        categories: {
          title: "Types of Paycheck Deductions",
          items: [
            { text: "Federal Income Tax: Progressive brackets from 10% to 37%, based on filing status and taxable income", type: "info" },
            { text: "State Income Tax: Ranges from 0% (9 states) to 13.3% (California), with flat or progressive rates", type: "info" },
            { text: "Social Security (OASDI): Flat 6.2% on income up to $176,100 (2025 cap), employer matches 6.2%", type: "info" },
            { text: "Medicare: Flat 1.45% on all income, plus 0.9% additional tax on income over $200K (single)/$250K (married)", type: "info" },
            { text: "401(k)/403(b): Voluntary pre-tax retirement savings, 2025 limit $23,500 ($31,000 if 50+)", type: "info" },
            { text: "Health Insurance & HSA: Pre-tax premiums and savings for medical expenses, HSA limit $4,300 (individual)/$8,550 (family)", type: "info" },
          ],
        },
        examples: {
          title: "Paycheck Calculation Examples",
          description: "Step-by-step paycheck breakdowns for common scenarios",
          examples: [
            {
              title: "$60,000 Salary, Single, Bi-weekly, Texas (no state tax)",
              steps: [
                "Gross per paycheck: $60,000 / 26 = $2,307.69",
                "Standard deduction equivalent: $15,000 / 26 = $576.92",
                "Taxable per paycheck: $2,307.69 - $576.92 = $1,730.77",
                "Federal tax: ~$207 (effective ~9%)",
                "SS: $2,307.69 × 6.2% = $143.08",
                "Medicare: $2,307.69 × 1.45% = $33.46",
              ],
              result: "Take-home: ~$1,924 per paycheck, $49,928 annually (83.2% of gross)",
            },
            {
              title: "$20/hr + 5hrs OT, Bi-weekly, Single, Florida",
              steps: [
                "Regular: 80 hrs × $20 = $1,600",
                "Overtime: 10 hrs × $30 (1.5x) = $300",
                "Gross per paycheck: $1,900",
                "Federal tax: ~$125 (after standard deduction)",
                "SS: $1,900 × 6.2% = $117.80",
                "Medicare: $1,900 × 1.45% = $27.55",
              ],
              result: "Take-home: ~$1,630 per paycheck, OT adds ~$220 net after taxes",
            },
          ],
        },
      },

      faqs: [
        {
          question: "Why is my first paycheck smaller than expected?",
          answer: "Several factors can make your first paycheck smaller: tax withholding may be calculated at a higher annualized rate, you may have started mid-pay-period and received partial pay, initial health insurance premiums may be double-deducted to cover retroactive coverage, and some employers have a one-period lag in pay. Check your pay stub for a detailed breakdown and ensure your W-4 allowances are set correctly.",
        },
        {
          question: "How much of my paycheck goes to taxes?",
          answer: "For most Americans, total tax withholding ranges from 20-35% of gross pay. This includes federal income tax (10-37% marginal, but typically 10-18% effective), Social Security (6.2% up to $176,100), Medicare (1.45-2.35%), and state income tax (0-13.3%). A single person earning $60,000 typically takes home about 75-80% of gross pay after all taxes.",
        },
        {
          question: "What states have no income tax?",
          answer: "Nine US states have no state income tax: Alaska, Florida, Nevada, New Hampshire (only taxes interest/dividends), South Dakota, Tennessee, Texas, Washington, and Wyoming. Living in these states means your paycheck is only subject to federal tax and FICA, resulting in significantly higher take-home pay compared to high-tax states like California (up to 13.3%) or New York (up to 10.9%).",
        },
        {
          question: "Should I increase my 401(k) contribution?",
          answer: "Generally yes, especially if your employer offers matching — not contributing enough to get the full match is leaving free money on the table. Every dollar contributed pre-tax reduces your current tax bill by your marginal rate. For someone in the 22% bracket, a $100 401(k) contribution only reduces take-home pay by about $78. The 2025 contribution limit is $23,500, or $31,000 if you are 50 or older.",
        },
        {
          question: "How does overtime affect my taxes?",
          answer: "Overtime pay is taxed as regular income — there is no special overtime tax rate. However, if your overtime pushes your total income into a higher tax bracket, that additional income is taxed at the higher rate. For example, moving from the 22% to 24% bracket means only the income above the threshold is taxed at 24%. Your employer may temporarily over-withhold on overtime paychecks because payroll systems annualize each paycheck to estimate your bracket.",
        },
        {
          question: "What is the difference between gross pay and net pay?",
          answer: "Gross pay is your total earnings before any deductions — your salary divided by pay periods, or hours × rate for hourly workers. Net pay (take-home pay) is what you actually receive after all deductions: federal tax, state tax, Social Security, Medicare, and voluntary deductions like 401(k), health insurance, and HSA contributions. Your net pay is typically 65-80% of gross pay depending on your tax situation and deduction choices.",
        },
      ],

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
      "name": "Calculadora de Sueldo",
      "slug": "calculadora-sueldo-neto",
      "breadcrumb": "Calculadora de Sueldo",
      "seo": {
        "title": "Calculadora de Sueldo - Estimador Gratuito de Salario Neto",
        "description": "Calcula tu salario neto después de impuestos federales, estatales, Seguro Social y Medicare. Compatible con los 50 estados de EE.UU., por horas y salario. Calculadora de sueldo gratuita.",
        "shortDescription": "Estima tu sueldo neto después de todos los impuestos y deducciones.",
        "keywords": [
          "calculadora de sueldo",
          "calculadora salario neto",
          "calculadora sueldo después impuestos",
          "calculadora pago neto",
          "calculadora nómina",
          "calculadora sueldo gratuita",
          "calculadora sueldo por horas",
          "calculadora impuestos sueldo"
        ]
      },
      "subtitle": "Ve exactamente cuánto recibes en cada cheque de pago después de impuestos federales, estatales, Seguro Social, Medicare y deducciones.",
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "payType": {
          "label": "Tipo de Pago",
          "helpText": "Cómo eres compensado",
          "options": {
            "salary": "Salario Anual",
            "hourly": "Tarifa por Hora"
          }
        },
        "grossSalary": {
          "label": "Salario Bruto Anual",
          "helpText": "Tu salario anual total antes de cualquier deducción"
        },
        "hourlyRate": {
          "label": "Tarifa por Hora",
          "helpText": "Tu salario regular por hora"
        },
        "hoursPerWeek": {
          "label": "Horas por Semana",
          "helpText": "Horas regulares trabajadas por semana (antes de horas extra)"
        },
        "payFrequency": {
          "label": "Frecuencia de Pago",
          "helpText": "Con qué frecuencia recibes un cheque de pago",
          "options": {
            "weekly": "Semanal (52/año)",
            "biweekly": "Quincenal (26/año)",
            "semimonthly": "Dos veces al mes (24/año)",
            "monthly": "Mensual (12/año)"
          }
        },
        "filingStatus": {
          "label": "Estado Civil Fiscal",
          "helpText": "Tu estado civil para impuestos federales",
          "options": {
            "single": "Soltero",
            "marriedJoint": "Casado Declarando Conjuntamente",
            "marriedSeparate": "Casado Declarando Por Separado",
            "headOfHousehold": "Jefe de Familia"
          }
        },
        "state": {
          "label": "Estado",
          "helpText": "Tu estado para el cálculo de impuestos estatales",
          "options": {
            "none": "Sin Impuesto Estatal",
            "AL": "Alabama",
            "AK": "Alaska",
            "AZ": "Arizona",
            "AR": "Arkansas",
            "CA": "California",
            "CO": "Colorado",
            "CT": "Connecticut",
            "DE": "Delaware",
            "FL": "Florida",
            "GA": "Georgia",
            "HI": "Hawái",
            "ID": "Idaho",
            "IL": "Illinois",
            "IN": "Indiana",
            "IA": "Iowa",
            "KS": "Kansas",
            "KY": "Kentucky",
            "LA": "Luisiana",
            "ME": "Maine",
            "MD": "Maryland",
            "MA": "Massachusetts",
            "MI": "Michigan",
            "MN": "Minnesota",
            "MS": "Mississippi",
            "MO": "Missouri",
            "MT": "Montana",
            "NE": "Nebraska",
            "NV": "Nevada",
            "NH": "Nuevo Hampshire",
            "NJ": "Nueva Jersey",
            "NM": "Nuevo México",
            "NY": "Nueva York",
            "NC": "Carolina del Norte",
            "ND": "Dakota del Norte",
            "OH": "Ohio",
            "OK": "Oklahoma",
            "OR": "Oregon",
            "PA": "Pensilvania",
            "RI": "Rhode Island",
            "SC": "Carolina del Sur",
            "SD": "Dakota del Sur",
            "TN": "Tennessee",
            "TX": "Texas",
            "UT": "Utah",
            "VT": "Vermont",
            "VA": "Virginia",
            "WA": "Washington",
            "WV": "Virginia Occidental",
            "WI": "Wisconsin",
            "WY": "Wyoming",
            "DC": "Washington D.C."
          }
        },
        "allowances": {
          "label": "Exenciones Federales",
          "helpText": "Número de exenciones de tu W-4 (0 = más impuestos retenidos)"
        },
        "preTax401k": {
          "label": "Contribución 401(k)",
          "helpText": "Contribución de jubilación antes de impuestos por cheque de pago"
        },
        "preTaxHealth": {
          "label": "Seguro de Salud",
          "helpText": "Prima de seguro de salud antes de impuestos por cheque de pago"
        },
        "preTaxHSA": {
          "label": "Contribución HSA",
          "helpText": "Contribución a Cuenta de Ahorros de Salud por cheque de pago"
        },
        "otherPreTax": {
          "label": "Otras Deducciones Antes de Impuestos",
          "helpText": "Otras deducciones antes de impuestos por cheque de pago (FSA, transporte, etc.)"
        },
        "includeOvertime": {
          "label": "Incluir Horas Extra",
          "helpText": "Agregar horas extra al cálculo de tu cheque de pago"
        },
        "overtimeHours": {
          "label": "Horas Extra/Semana",
          "helpText": "Promedio de horas extra por semana"
        },
        "overtimeRate": {
          "label": "Multiplicador Horas Extra",
          "helpText": "Multiplicador de tarifa de pago por horas extra (1.5x = tiempo y medio)",
          "options": {
            "2": "2x (Tiempo Doble)",
            "1.5": "1.5x (Tiempo y Medio)"
          }
        }
      },
      "results": {
        "netPay": {
          "label": "Salario Neto"
        },
        "grossPay": {
          "label": "Salario Bruto"
        },
        "federalTax": {
          "label": "Impuesto Federal"
        },
        "stateTax": {
          "label": "Impuesto Estatal"
        },
        "socialSecurity": {
          "label": "Seguro Social"
        },
        "medicare": {
          "label": "Medicare"
        },
        "totalTax": {
          "label": "Impuestos Totales"
        },
        "totalDeductions": {
          "label": "Deducciones Totales"
        },
        "effectiveTaxRate": {
          "label": "Tasa Impositiva Efectiva"
        },
        "annualNet": {
          "label": "Salario Neto Anual"
        },
        "annualGross": {
          "label": "Salario Bruto Anual"
        },
        "annualTax": {
          "label": "Impuestos Anuales Totales"
        }
      },
      "presets": {
        "entrySalary": {
          "label": "Nivel Inicial",
          "description": "Salario $45K, soltero, sin impuesto estatal"
        },
        "midCareer": {
          "label": "Media Carrera",
          "description": "Salario $75K, soltero, California, 401(k)"
        },
        "familyProvider": {
          "label": "Proveedor Familiar",
          "description": "$95K, casado, Texas, beneficios completos"
        },
        "hourlyWorker": {
          "label": "Por Horas + Extra",
          "description": "$20/hr + 5hrs extra, quincenal, Florida"
        },
        "highEarner": {
          "label": "Alto Ingreso",
          "description": "$175K, casado, Nueva York, deducciones máximas"
        }
      },
      "values": {
        "perPaycheck": "/cheque",
        "perYear": "/año",
        "perMonth": "/mes",
        "perWeek": "/semana",
        "weekly": "Semanal",
        "biweekly": "Quincenal",
        "semimonthly": "Dos veces al mes",
        "monthly": "Mensual"
      },
      "formats": {
        "summary": "Tu salario neto es {netPay} por cheque de pago ({annualNet} anualmente) de un bruto de {grossPay} después de {totalTax} en impuestos totales."
      },
      "infoCards": {
        "metrics": {
          "title": "Perspectivas del Sueldo",
          "items": [
            {
              "label": "Porcentaje que Conservas",
              "valueKey": "percentKept"
            },
            {
              "label": "Equivalente por Hora (Neto)",
              "valueKey": "netHourly"
            },
            {
              "label": "Salario Diario Neto",
              "valueKey": "dailyNet"
            },
            {
              "label": "Salario Mensual Neto",
              "valueKey": "monthlyNet"
            }
          ]
        },
        "details": {
          "title": "Perspectivas Fiscales",
          "items": [
            {
              "label": "Día de Libertad Fiscal",
              "valueKey": "taxFreedomDay"
            },
            {
              "label": "FICA como % del Bruto",
              "valueKey": "ficaPercent"
            },
            {
              "label": "Ahorro Fiscal por Deducciones",
              "valueKey": "deductionSavings"
            },
            {
              "label": "Deducciones Anuales Antes de Impuestos",
              "valueKey": "annualPreTax"
            }
          ]
        },
        "tips": {
          "title": "Consejos para el Sueldo",
          "items": [
            "Maximiza las contribuciones 401(k) para reducir el ingreso gravable — cada dólar antes de impuestos te ahorra tu tasa marginal",
            "Las contribuciones HSA tienen triple ventaja fiscal: deducibles, crecen libres de impuestos y son libres de impuestos para gastos médicos",
            "Revisa tu W-4 después de cambios importantes en la vida — matrimonio, nuevo hijo o comprar una casa afecta la retención",
            "Nueve estados de EE.UU. no tienen impuesto sobre la renta: AK, FL, NV, NH, SD, TN, TX, WA, WY"
          ]
        }
      },
      "chart": {
        "title": "Desglose del Cheque de Pago",
        "xLabel": "Categoría",
        "yLabel": "Cantidad",
        "series": {
          "netPay": "Salario Neto",
          "federalTax": "Impuesto Federal",
          "stateTax": "Impuesto Estatal",
          "fica": "FICA (SS + Medicare)",
          "deductions": "Deducciones"
        }
      },
      "detailedTable": {
        "annualTable": {
          "button": "Ver Resumen Fiscal Anual",
          "title": "Resumen Anual de Impuestos y Deducciones",
          "columns": {
            "item": "Artículo",
            "perPaycheck": "Por Cheque",
            "monthly": "Mensual",
            "annual": "Anual"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es una Calculadora de Sueldo?",
          "content": "Una calculadora de sueldo estima tu salario neto — la cantidad depositada en tu cuenta bancaria después de que todos los impuestos y deducciones son retenidos de tu salario bruto. Tu empleador retiene impuesto federal sobre la renta, impuesto estatal sobre la renta (en la mayoría de estados), impuesto del Seguro Social (6.2%) e impuesto de Medicare (1.45%) de cada cheque de pago. Además, las deducciones voluntarias antes de impuestos como contribuciones 401(k), primas de seguro de salud y contribuciones HSA reducen tu ingreso gravable y se sustraen antes de que se calculen los impuestos. Entender tu salario neto te ayuda a presupuestar con precisión, comparar ofertas de trabajo y optimizar tu estrategia de retención de impuestos."
        },
        "howItWorks": {
          "title": "Cómo se Calculan los Impuestos del Sueldo",
          "content": "El impuesto federal sobre la renta usa escalones progresivos donde diferentes porciones de tu ingreso son gravadas a tasas crecientes. Para 2025, un declarante soltero paga 10% sobre ingresos hasta $11,925, luego 12% hasta $48,475, 22% hasta $103,350, 24% hasta $197,300, y tasas más altas por encima de eso. Tu ingreso gravable es tu salario bruto menos las deducciones antes de impuestos y la deducción estándar ($15,000 para solteros, $30,000 para casados declarando conjuntamente en 2025). El impuesto del Seguro Social es un 6.2% fijo sobre ingresos hasta $176,100. Medicare es 1.45% sobre todos los ingresos, más un 0.9% adicional sobre ingresos por encima de $200,000 (soltero) o $250,000 (casado). Los impuestos estatales varían ampliamente de 0% a más de 13% dependiendo del estado."
        },
        "considerations": {
          "title": "Factores Importantes del Sueldo",
          "items": [
            {
              "text": "Las deducciones antes de impuestos (401k, salud, HSA) reducen tu ingreso gravable, efectivamente dándote un descuento igual a tu tasa impositiva marginal",
              "type": "info"
            },
            {
              "text": "La deducción estándar para 2025 es $15,000 (soltero) o $30,000 (casado declarando conjuntamente) — esto no se grava en absoluto",
              "type": "info"
            },
            {
              "text": "El impuesto del Seguro Social se detiene en $176,100 en 2025 — los que ganan más ven un aumento en el cheque después de alcanzar este límite",
              "type": "info"
            },
            {
              "text": "El impuesto estatal sobre la renta varía dramáticamente: California llega hasta 13.3%, mientras que 9 estados no cobran nada",
              "type": "warning"
            },
            {
              "text": "El pago por horas extra se grava a tu tasa regular de impuesto sobre la renta, no a una tasa especial más alta — solo puede empujarte a un escalón más alto",
              "type": "info"
            },
            {
              "text": "Cambiar las exenciones de tu W-4 ajusta la retención — más exenciones significa menos impuestos retenidos por cheque",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Tipos de Deducciones del Sueldo",
          "items": [
            {
              "text": "Impuesto Federal sobre la Renta: Escalones progresivos del 10% al 37%, basado en estado civil e ingreso gravable",
              "type": "info"
            },
            {
              "text": "Impuesto Estatal sobre la Renta: Va del 0% (9 estados) al 13.3% (California), con tasas fijas o progresivas",
              "type": "info"
            },
            {
              "text": "Seguro Social (OASDI): 6.2% fijo sobre ingresos hasta $176,100 (límite 2025), empleador equipara 6.2%",
              "type": "info"
            },
            {
              "text": "Medicare: 1.45% fijo sobre todos los ingresos, más 0.9% de impuesto adicional sobre ingresos por encima de $200K (soltero)/$250K (casado)",
              "type": "info"
            },
            {
              "text": "401(k)/403(b): Ahorros voluntarios para jubilación antes de impuestos, límite 2025 $23,500 ($31,000 si 50+)",
              "type": "info"
            },
            {
              "text": "Seguro de Salud y HSA: Primas antes de impuestos y ahorros para gastos médicos, límite HSA $4,300 (individual)/$8,550 (familia)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo de Sueldo",
          "description": "Desgloses paso a paso del sueldo para escenarios comunes",
          "examples": [
            {
              "title": "Salario $60,000, Soltero, Quincenal, Texas (sin impuesto estatal)",
              "steps": [
                "Bruto por cheque: $60,000 / 26 = $2,307.69",
                "Equivalente deducción estándar: $15,000 / 26 = $576.92",
                "Gravable por cheque: $2,307.69 - $576.92 = $1,730.77",
                "Impuesto federal: ~$207 (efectivo ~9%)",
                "SS: $2,307.69 × 6.2% = $143.08",
                "Medicare: $2,307.69 × 1.45% = $33.46"
              ],
              "result": "Salario neto: ~$1,924 por cheque, $49,928 anualmente (83.2% del bruto)"
            },
            {
              "title": "$20/hr + 5hrs Extra, Quincenal, Soltero, Florida",
              "steps": [
                "Regular: 80 hrs × $20 = $1,600",
                "Horas extra: 10 hrs × $30 (1.5x) = $300",
                "Bruto por cheque: $1,900",
                "Impuesto federal: ~$125 (después de deducción estándar)",
                "SS: $1,900 × 6.2% = $117.80",
                "Medicare: $1,900 × 1.45% = $27.55"
              ],
              "result": "Salario neto: ~$1,630 por cheque, horas extra añaden ~$220 neto después de impuestos"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Por qué mi primer cheque de pago es más pequeño de lo esperado?",
          "answer": "Varios factores pueden hacer que tu primer cheque sea más pequeño: la retención de impuestos puede calcularse a una tasa anualizada más alta, puedes haber empezado a mitad del período de pago y recibido pago parcial, las primas iniciales del seguro de salud pueden deducirse doble para cubrir la cobertura retroactiva, y algunos empleadores tienen un retraso de un período en el pago. Revisa tu talón de pago para un desglose detallado y asegúrate de que tus exenciones W-4 estén configuradas correctamente."
        },
        {
          "question": "¿Cuánto de mi cheque de pago va a impuestos?",
          "answer": "Para la mayoría de los estadounidenses, la retención total de impuestos va del 20-35% del salario bruto. Esto incluye impuesto federal sobre la renta (10-37% marginal, pero típicamente 10-18% efectivo), Seguro Social (6.2% hasta $176,100), Medicare (1.45-2.35%), e impuesto estatal sobre la renta (0-13.3%). Una persona soltera que gana $60,000 típicamente se lleva a casa aproximadamente 75-80% del salario bruto después de todos los impuestos."
        },
        {
          "question": "¿Qué estados no tienen impuesto sobre la renta?",
          "answer": "Nueve estados de EE.UU. no tienen impuesto estatal sobre la renta: Alaska, Florida, Nevada, Nuevo Hampshire (solo grava intereses/dividendos), Dakota del Sur, Tennessee, Texas, Washington y Wyoming. Vivir en estos estados significa que tu cheque de pago solo está sujeto a impuestos federales y FICA, resultando en un salario neto significativamente más alto comparado con estados de altos impuestos como California (hasta 13.3%) o Nueva York (hasta 10.9%)."
        },
        {
          "question": "¿Debería aumentar mi contribución 401(k)?",
          "answer": "Generalmente sí, especialmente si tu empleador ofrece equiparación — no contribuir lo suficiente para obtener la equiparación completa es dejar dinero gratis sobre la mesa. Cada dólar contribuido antes de impuestos reduce tu factura fiscal actual por tu tasa marginal. Para alguien en el escalón del 22%, una contribución 401(k) de $100 solo reduce el salario neto en aproximadamente $78. El límite de contribución 2025 es $23,500, o $31,000 si tienes 50 años o más."
        },
        {
          "question": "¿Cómo afectan las horas extra a mis impuestos?",
          "answer": "El pago por horas extra se grava como ingreso regular — no hay una tasa especial de impuesto por horas extra. Sin embargo, si tus horas extra empujan tu ingreso total a un escalón fiscal más alto, ese ingreso adicional se grava a la tasa más alta. Por ejemplo, moverse del escalón del 22% al 24% significa que solo el ingreso por encima del umbral se grava al 24%. Tu empleador puede retener temporalmente de más en los cheques de horas extra porque los sistemas de nómina anualizan cada cheque para estimar tu escalón."
        },
        {
          "question": "¿Cuál es la diferencia entre salario bruto y salario neto?",
          "answer": "El salario bruto son tus ganancias totales antes de cualquier deducción — tu salario dividido por períodos de pago, u horas × tasa para trabajadores por horas. El salario neto (salario que te llevas) es lo que realmente recibes después de todas las deducciones: impuesto federal, impuesto estatal, Seguro Social, Medicare, y deducciones voluntarias como 401(k), seguro de salud y contribuciones HSA. Tu salario neto es típicamente 65-80% del salario bruto dependiendo de tu situación fiscal y elecciones de deducciones."
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
      }
    },
    pt: {
      "name": "Calculadora de Contracheque",
      "slug": "calculadora-contracheque",
      "breadcrumb": "Calculadora de Contracheque",
      "seo": {
        "title": "Calculadora de Contracheque - Estimador Gratuito de Salário Líquido",
        "description": "Calcule seu salário líquido após imposto federal, estadual, Previdência Social e Medicare. Suporta todos os 50 estados americanos, por hora e salário. Calculadora gratuita.",
        "shortDescription": "Estime seu contracheque líquido após todos os impostos e deduções.",
        "keywords": [
          "calculadora contracheque",
          "calculadora salário líquido",
          "calculadora salário após impostos",
          "calculadora pagamento líquido",
          "calculadora folha pagamento",
          "calculadora contracheque gratuita",
          "calculadora contracheque por hora",
          "calculadora imposto contracheque"
        ]
      },
      "subtitle": "Veja exatamente quanto você recebe em cada contracheque após imposto federal, estadual, Previdência Social, Medicare e deduções.",
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "payType": {
          "label": "Tipo de Pagamento",
          "helpText": "Como você é remunerado",
          "options": {
            "salary": "Salário Anual",
            "hourly": "Taxa por Hora"
          }
        },
        "grossSalary": {
          "label": "Salário Bruto Anual",
          "helpText": "Seu salário anual total antes de qualquer dedução"
        },
        "hourlyRate": {
          "label": "Taxa por Hora",
          "helpText": "Seu salário por hora regular"
        },
        "hoursPerWeek": {
          "label": "Horas por Semana",
          "helpText": "Horas regulares trabalhadas por semana (antes das horas extras)"
        },
        "payFrequency": {
          "label": "Frequência de Pagamento",
          "helpText": "Com que frequência você recebe um contracheque",
          "options": {
            "weekly": "Semanal (52/ano)",
            "biweekly": "Quinzenal (26/ano)",
            "semimonthly": "Semi-mensal (24/ano)",
            "monthly": "Mensal (12/ano)"
          }
        },
        "filingStatus": {
          "label": "Status de Declaração",
          "helpText": "Seu status de declaração de imposto federal",
          "options": {
            "single": "Solteiro",
            "marriedJoint": "Casado Declarando em Conjunto",
            "marriedSeparate": "Casado Declarando Separadamente",
            "headOfHousehold": "Chefe de Família"
          }
        },
        "state": {
          "label": "Estado",
          "helpText": "Seu estado para cálculo do imposto de renda estadual",
          "options": {
            "none": "Sem Imposto Estadual",
            "AL": "Alabama",
            "AK": "Alaska",
            "AZ": "Arizona",
            "AR": "Arkansas",
            "CA": "Califórnia",
            "CO": "Colorado",
            "CT": "Connecticut",
            "DE": "Delaware",
            "FL": "Flórida",
            "GA": "Geórgia",
            "HI": "Havaí",
            "ID": "Idaho",
            "IL": "Illinois",
            "IN": "Indiana",
            "IA": "Iowa",
            "KS": "Kansas",
            "KY": "Kentucky",
            "LA": "Louisiana",
            "ME": "Maine",
            "MD": "Maryland",
            "MA": "Massachusetts",
            "MI": "Michigan",
            "MN": "Minnesota",
            "MS": "Mississippi",
            "MO": "Missouri",
            "MT": "Montana",
            "NE": "Nebraska",
            "NV": "Nevada",
            "NH": "New Hampshire",
            "NJ": "New Jersey",
            "NM": "Novo México",
            "NY": "Nova York",
            "NC": "Carolina do Norte",
            "ND": "Dakota do Norte",
            "OH": "Ohio",
            "OK": "Oklahoma",
            "OR": "Oregon",
            "PA": "Pensilvânia",
            "RI": "Rhode Island",
            "SC": "Carolina do Sul",
            "SD": "Dakota do Sul",
            "TN": "Tennessee",
            "TX": "Texas",
            "UT": "Utah",
            "VT": "Vermont",
            "VA": "Virgínia",
            "WA": "Washington",
            "WV": "Virgínia Ocidental",
            "WI": "Wisconsin",
            "WY": "Wyoming",
            "DC": "Washington D.C."
          }
        },
        "allowances": {
          "label": "Isenções Federais",
          "helpText": "Número de isenções do seu W-4 (0 = mais imposto retido)"
        },
        "preTax401k": {
          "label": "Contribuição 401(k)",
          "helpText": "Contribuição de aposentadoria pré-imposto por contracheque"
        },
        "preTaxHealth": {
          "label": "Seguro Saúde",
          "helpText": "Prêmio de seguro saúde pré-imposto por contracheque"
        },
        "preTaxHSA": {
          "label": "Contribuição HSA",
          "helpText": "Contribuição da Conta Poupança Saúde por contracheque"
        },
        "otherPreTax": {
          "label": "Outras Deduções Pré-Imposto",
          "helpText": "Outras deduções pré-imposto por contracheque (FSA, transporte, etc.)"
        },
        "includeOvertime": {
          "label": "Incluir Horas Extras",
          "helpText": "Adicionar horas extras ao cálculo do contracheque"
        },
        "overtimeHours": {
          "label": "Horas Extras/Semana",
          "helpText": "Média de horas extras por semana"
        },
        "overtimeRate": {
          "label": "Multiplicador de Hora Extra",
          "helpText": "Multiplicador da taxa de pagamento de hora extra (1,5x = uma vez e meia)",
          "options": {
            "2": "2x (Tempo Dobrado)",
            "1.5": "1,5x (Uma Vez e Meia)"
          }
        }
      },
      "results": {
        "netPay": {
          "label": "Salário Líquido"
        },
        "grossPay": {
          "label": "Salário Bruto"
        },
        "federalTax": {
          "label": "Imposto Federal"
        },
        "stateTax": {
          "label": "Imposto Estadual"
        },
        "socialSecurity": {
          "label": "Previdência Social"
        },
        "medicare": {
          "label": "Medicare"
        },
        "totalTax": {
          "label": "Total de Impostos"
        },
        "totalDeductions": {
          "label": "Total de Deduções"
        },
        "effectiveTaxRate": {
          "label": "Taxa de Imposto Efetiva"
        },
        "annualNet": {
          "label": "Líquido Anual"
        },
        "annualGross": {
          "label": "Bruto Anual"
        },
        "annualTax": {
          "label": "Total de Impostos Anuais"
        }
      },
      "presets": {
        "entrySalary": {
          "label": "Nível Iniciante",
          "description": "Salário $45K, solteiro, sem imposto estadual"
        },
        "midCareer": {
          "label": "Meio da Carreira",
          "description": "Salário $75K, solteiro, Califórnia, 401(k)"
        },
        "familyProvider": {
          "label": "Provedor da Família",
          "description": "$95K, casado, Texas, benefícios completos"
        },
        "hourlyWorker": {
          "label": "Por Hora + HE",
          "description": "$20/hr + 5hrs extras, quinzenal, Flórida"
        },
        "highEarner": {
          "label": "Alta Renda",
          "description": "$175K, casado, Nova York, deduções máximas"
        }
      },
      "values": {
        "perPaycheck": "/contracheque",
        "perYear": "/ano",
        "perMonth": "/mês",
        "perWeek": "/semana",
        "weekly": "Semanal",
        "biweekly": "Quinzenal",
        "semimonthly": "Semi-mensal",
        "monthly": "Mensal"
      },
      "formats": {
        "summary": "Seu salário líquido é {netPay} por contracheque ({annualNet} anualmente) de um bruto de {grossPay} após {totalTax} em impostos totais."
      },
      "infoCards": {
        "metrics": {
          "title": "Insights do Pagamento",
          "items": [
            {
              "label": "Percentual que Você Mantém",
              "valueKey": "percentKept"
            },
            {
              "label": "Equivalente por Hora (Líquido)",
              "valueKey": "netHourly"
            },
            {
              "label": "Líquido Diário",
              "valueKey": "dailyNet"
            },
            {
              "label": "Líquido Mensal",
              "valueKey": "monthlyNet"
            }
          ]
        },
        "details": {
          "title": "Insights de Impostos",
          "items": [
            {
              "label": "Dia da Liberdade Fiscal",
              "valueKey": "taxFreedomDay"
            },
            {
              "label": "FICA como % do Bruto",
              "valueKey": "ficaPercent"
            },
            {
              "label": "Economia Fiscal de Dedução",
              "valueKey": "deductionSavings"
            },
            {
              "label": "Deduções Anuais Pré-Imposto",
              "valueKey": "annualPreTax"
            }
          ]
        },
        "tips": {
          "title": "Dicas do Contracheque",
          "items": [
            "Maximize as contribuições 401(k) para diminuir a renda tributável — cada dólar pré-imposto economiza sua taxa marginal",
            "Contribuições HSA têm tripla vantagem fiscal: dedutível, crescem livres de impostos e livres de impostos para despesas médicas",
            "Revise seu W-4 após mudanças importantes na vida — casamento, novo filho ou comprar uma casa afeta a retenção",
            "Nove estados americanos não têm imposto de renda: AK, FL, NV, NH, SD, TN, TX, WA, WY"
          ]
        }
      },
      "chart": {
        "title": "Divisão do Contracheque",
        "xLabel": "Categoria",
        "yLabel": "Valor",
        "series": {
          "netPay": "Salário Líquido",
          "federalTax": "Imposto Federal",
          "stateTax": "Imposto Estadual",
          "fica": "FICA (SS + Medicare)",
          "deductions": "Deduções"
        }
      },
      "detailedTable": {
        "annualTable": {
          "button": "Ver Resumo Fiscal Anual",
          "title": "Resumo Anual de Impostos e Deduções",
          "columns": {
            "item": "Item",
            "perPaycheck": "Por Contracheque",
            "monthly": "Mensal",
            "annual": "Anual"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Calculadora de Contracheque?",
          "content": "Uma calculadora de contracheque estima seu salário líquido — o valor depositado na sua conta bancária após todos os impostos e deduções serem retidos do seu salário bruto. Seu empregador retém imposto de renda federal, imposto de renda estadual (na maioria dos estados), imposto da Previdência Social (6,2%) e imposto do Medicare (1,45%) de cada contracheque. Além disso, deduções voluntárias pré-imposto como contribuições 401(k), prêmios de seguro saúde e contribuições HSA reduzem sua renda tributável e são subtraídas antes dos impostos serem calculados. Entender seu pagamento líquido ajuda você a fazer orçamento com precisão, comparar ofertas de emprego e otimizar sua estratégia de retenção fiscal."
        },
        "howItWorks": {
          "title": "Como os Impostos do Contracheque são Calculados",
          "content": "O imposto de renda federal usa faixas progressivas onde diferentes partes da sua renda são tributadas em taxas crescentes. Para 2025, um declarante solteiro paga 10% na renda até $11.925, depois 12% até $48.475, 22% até $103.350, 24% até $197.300 e taxas mais altas acima disso. Sua renda tributável é seu salário bruto menos deduções pré-imposto e a dedução padrão ($15.000 para solteiro, $30.000 para casado declarando em conjunto em 2025). O imposto da Previdência Social é 6,2% fixos na renda até $176.100. O Medicare é 1,45% em toda renda, mais 0,9% adicional na renda acima de $200.000 (solteiro) ou $250.000 (casado). Os impostos estaduais variam amplamente de 0% a mais de 13% dependendo do estado."
        },
        "considerations": {
          "title": "Fatores Importantes do Contracheque",
          "items": [
            {
              "text": "Deduções pré-imposto (401k, saúde, HSA) reduzem sua renda tributável, efetivamente dando um desconto igual à sua taxa marginal",
              "type": "info"
            },
            {
              "text": "A dedução padrão para 2025 é $15.000 (solteiro) ou $30.000 (casado declarando em conjunto) — isso não é tributado",
              "type": "info"
            },
            {
              "text": "O imposto da Previdência Social para em $176.100 em 2025 — pessoas com renda mais alta veem um aumento no contracheque após atingir este limite",
              "type": "info"
            },
            {
              "text": "O imposto de renda estadual varia drasticamente: Califórnia chega a 13,3%, enquanto 9 estados não cobram nada",
              "type": "warning"
            },
            {
              "text": "Pagamento de hora extra é tributado à sua taxa normal de imposto de renda, não uma taxa especial mais alta — pode apenas empurrá-lo para uma faixa mais alta",
              "type": "info"
            },
            {
              "text": "Mudar suas isenções W-4 ajusta a retenção — mais isenções significa menos imposto retido por contracheque",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Tipos de Deduções do Contracheque",
          "items": [
            {
              "text": "Imposto de Renda Federal: Faixas progressivas de 10% a 37%, baseadas no status de declaração e renda tributável",
              "type": "info"
            },
            {
              "text": "Imposto de Renda Estadual: Varia de 0% (9 estados) a 13,3% (Califórnia), com taxas fixas ou progressivas",
              "type": "info"
            },
            {
              "text": "Previdência Social (OASDI): 6,2% fixos na renda até $176.100 (limite 2025), empregador contribui 6,2%",
              "type": "info"
            },
            {
              "text": "Medicare: 1,45% fixos em toda renda, mais 0,9% de imposto adicional na renda acima de $200K (solteiro)/$250K (casado)",
              "type": "info"
            },
            {
              "text": "401(k)/403(b): Poupança voluntária de aposentadoria pré-imposto, limite 2025 $23.500 ($31.000 se 50+)",
              "type": "info"
            },
            {
              "text": "Seguro Saúde e HSA: Prêmios pré-imposto e poupança para despesas médicas, limite HSA $4.300 (individual)/$8.550 (família)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de Contracheque",
          "description": "Divisões passo a passo do contracheque para cenários comuns",
          "examples": [
            {
              "title": "Salário $60.000, Solteiro, Quinzenal, Texas (sem imposto estadual)",
              "steps": [
                "Bruto por contracheque: $60.000 / 26 = $2.307,69",
                "Equivalente dedução padrão: $15.000 / 26 = $576,92",
                "Tributável por contracheque: $2.307,69 - $576,92 = $1.730,77",
                "Imposto federal: ~$207 (efetivo ~9%)",
                "SS: $2.307,69 × 6,2% = $143,08",
                "Medicare: $2.307,69 × 1,45% = $33,46"
              ],
              "result": "Líquido: ~$1.924 por contracheque, $49.928 anualmente (83,2% do bruto)"
            },
            {
              "title": "$20/hr + 5hrs HE, Quinzenal, Solteiro, Flórida",
              "steps": [
                "Regular: 80 hrs × $20 = $1.600",
                "Hora extra: 10 hrs × $30 (1,5x) = $300",
                "Bruto por contracheque: $1.900",
                "Imposto federal: ~$125 (após dedução padrão)",
                "SS: $1.900 × 6,2% = $117,80",
                "Medicare: $1.900 × 1,45% = $27,55"
              ],
              "result": "Líquido: ~$1.630 por contracheque, HE adiciona ~$220 líquido após impostos"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Por que meu primeiro contracheque é menor que o esperado?",
          "answer": "Vários fatores podem tornar seu primeiro contracheque menor: a retenção fiscal pode ser calculada a uma taxa anualizada mais alta, você pode ter começado no meio do período de pagamento e recebido pagamento parcial, os prêmios iniciais do seguro saúde podem ser deduzidos em dobro para cobrir a cobertura retroativa, e alguns empregadores têm um atraso de um período no pagamento. Verifique seu comprovante de pagamento para uma divisão detalhada e certifique-se de que suas isenções W-4 estão definidas corretamente."
        },
        {
          "question": "Quanto do meu contracheque vai para impostos?",
          "answer": "Para a maioria dos americanos, a retenção fiscal total varia de 20-35% do pagamento bruto. Isso inclui imposto de renda federal (10-37% marginal, mas tipicamente 10-18% efetivo), Previdência Social (6,2% até $176.100), Medicare (1,45-2,35%) e imposto de renda estadual (0-13,3%). Uma pessoa solteira ganhando $60.000 tipicamente leva para casa cerca de 75-80% do pagamento bruto após todos os impostos."
        },
        {
          "question": "Quais estados não têm imposto de renda?",
          "answer": "Nove estados americanos não têm imposto de renda estadual: Alaska, Flórida, Nevada, New Hampshire (apenas tributa juros/dividendos), Dakota do Sul, Tennessee, Texas, Washington e Wyoming. Viver nesses estados significa que seu contracheque está sujeito apenas ao imposto federal e FICA, resultando em salário líquido significativamente maior comparado a estados de alta tributação como Califórnia (até 13,3%) ou Nova York (até 10,9%)."
        },
        {
          "question": "Devo aumentar minha contribuição 401(k)?",
          "answer": "Geralmente sim, especialmente se seu empregador oferece contrapartida — não contribuir o suficiente para obter a contrapartida completa é deixar dinheiro grátis na mesa. Cada dólar contribuído pré-imposto reduz sua conta fiscal atual pela sua taxa marginal. Para alguém na faixa de 22%, uma contribuição 401(k) de $100 apenas reduz o salário líquido em cerca de $78. O limite de contribuição 2025 é $23.500, ou $31.000 se você tem 50 anos ou mais."
        },
        {
          "question": "Como a hora extra afeta meus impostos?",
          "answer": "O pagamento de hora extra é tributado como renda regular — não há taxa especial de imposto de hora extra. No entanto, se sua hora extra empurra sua renda total para uma faixa de imposto mais alta, essa renda adicional é tributada à taxa mais alta. Por exemplo, mover da faixa de 22% para 24% significa que apenas a renda acima do limite é tributada a 24%. Seu empregador pode temporariamente reter demais nos contracheques de hora extra porque os sistemas de folha de pagamento anualizam cada contracheque para estimar sua faixa."
        },
        {
          "question": "Qual é a diferença entre salário bruto e salário líquido?",
          "answer": "Salário bruto é seu ganho total antes de qualquer dedução — seu salário dividido pelos períodos de pagamento, ou horas × taxa para trabalhadores por hora. Salário líquido (salário líquido) é o que você realmente recebe após todas as deduções: imposto federal, imposto estadual, Previdência Social, Medicare e deduções voluntárias como 401(k), seguro saúde e contribuições HSA. Seu salário líquido é tipicamente 65-80% do salário bruto dependendo da sua situação fiscal e escolhas de dedução."
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
      }
    },
    fr: {
      "name": "Calculateur de Salaire",
      "slug": "calculateur-salaire-net",
      "breadcrumb": "Calculateur de Salaire",
      "seo": {
        "title": "Calculateur de Salaire - Estimateur Gratuit de Salaire Net",
        "description": "Calculez votre salaire net après impôt fédéral, impôt d'état, Sécurité Sociale et Medicare. Supporte les 50 états américains, horaire et salaire. Calculateur de paie gratuit.",
        "shortDescription": "Estimez votre salaire net après tous les impôts et déductions.",
        "keywords": [
          "calculateur de salaire",
          "calculateur salaire net",
          "calculateur salaire après impôts",
          "calculateur paie nette",
          "calculateur paie",
          "calculateur salaire gratuit",
          "calculateur salaire horaire",
          "calculateur impôt salaire"
        ]
      },
      "subtitle": "Voyez exactement combien vous gagnez net à chaque paie après impôt fédéral, impôt d'état, Sécurité Sociale, Medicare et déductions.",
      "inputs": {
        "payType": {
          "label": "Type de Rémunération",
          "helpText": "Comment vous êtes rémunéré",
          "options": {
            "salary": "Salaire Annuel",
            "hourly": "Taux Horaire"
          }
        },
        "grossSalary": {
          "label": "Salaire Brut Annuel",
          "helpText": "Votre salaire annuel total avant toute déduction"
        },
        "hourlyRate": {
          "label": "Taux Horaire",
          "helpText": "Votre salaire horaire régulier"
        },
        "hoursPerWeek": {
          "label": "Heures par Semaine",
          "helpText": "Heures régulières travaillées par semaine (avant heures supplémentaires)"
        },
        "payFrequency": {
          "label": "Fréquence de Paie",
          "helpText": "À quelle fréquence vous recevez un salaire",
          "options": {
            "weekly": "Hebdomadaire (52/an)",
            "biweekly": "Bi-hebdomadaire (26/an)",
            "semimonthly": "Semi-mensuel (24/an)",
            "monthly": "Mensuel (12/an)"
          }
        },
        "filingStatus": {
          "label": "Statut Fiscal",
          "helpText": "Votre statut de déclaration d'impôt fédéral",
          "options": {
            "single": "Célibataire",
            "marriedJoint": "Marié Déclarant Conjointement",
            "marriedSeparate": "Marié Déclarant Séparément",
            "headOfHousehold": "Chef de Famille"
          }
        },
        "state": {
          "label": "État",
          "helpText": "Votre état pour le calcul de l'impôt sur le revenu d'état",
          "options": {
            "none": "Pas d'Impôt d'État",
            "AL": "Alabama",
            "AK": "Alaska",
            "AZ": "Arizona",
            "AR": "Arkansas",
            "CA": "Californie",
            "CO": "Colorado",
            "CT": "Connecticut",
            "DE": "Delaware",
            "FL": "Floride",
            "GA": "Géorgie",
            "HI": "Hawaï",
            "ID": "Idaho",
            "IL": "Illinois",
            "IN": "Indiana",
            "IA": "Iowa",
            "KS": "Kansas",
            "KY": "Kentucky",
            "LA": "Louisiane",
            "ME": "Maine",
            "MD": "Maryland",
            "MA": "Massachusetts",
            "MI": "Michigan",
            "MN": "Minnesota",
            "MS": "Mississippi",
            "MO": "Missouri",
            "MT": "Montana",
            "NE": "Nebraska",
            "NV": "Nevada",
            "NH": "New Hampshire",
            "NJ": "New Jersey",
            "NM": "Nouveau-Mexique",
            "NY": "New York",
            "NC": "Caroline du Nord",
            "ND": "Dakota du Nord",
            "OH": "Ohio",
            "OK": "Oklahoma",
            "OR": "Oregon",
            "PA": "Pennsylvanie",
            "RI": "Rhode Island",
            "SC": "Caroline du Sud",
            "SD": "Dakota du Sud",
            "TN": "Tennessee",
            "TX": "Texas",
            "UT": "Utah",
            "VT": "Vermont",
            "VA": "Virginie",
            "WA": "Washington",
            "WV": "Virginie-Occidentale",
            "WI": "Wisconsin",
            "WY": "Wyoming",
            "DC": "Washington D.C."
          }
        },
        "allowances": {
          "label": "Allocations Fédérales",
          "helpText": "Nombre d'allocations de votre W-4 (0 = le plus d'impôt retenu)"
        },
        "preTax401k": {
          "label": "Contribution 401(k)",
          "helpText": "Contribution retraite avant impôt par paie"
        },
        "preTaxHealth": {
          "label": "Assurance Santé",
          "helpText": "Prime d'assurance santé avant impôt par paie"
        },
        "preTaxHSA": {
          "label": "Contribution HSA",
          "helpText": "Contribution Compte Épargne Santé par paie"
        },
        "otherPreTax": {
          "label": "Autres Déductions Avant Impôt",
          "helpText": "Autres déductions avant impôt par paie (FSA, transport, etc.)"
        },
        "includeOvertime": {
          "label": "Inclure Heures Supplémentaires",
          "helpText": "Ajouter les heures supplémentaires au calcul de votre paie"
        },
        "overtimeHours": {
          "label": "Heures Supplémentaires/Semaine",
          "helpText": "Heures supplémentaires moyennes par semaine"
        },
        "overtimeRate": {
          "label": "Multiplicateur Heures Supplémentaires",
          "helpText": "Multiplicateur taux heures supplémentaires (1,5x = temps et demi)",
          "options": {
            "2": "2x (Temps Double)",
            "1.5": "1,5x (Temps et Demi)"
          }
        }
      },
      "results": {
        "netPay": {
          "label": "Salaire Net"
        },
        "grossPay": {
          "label": "Salaire Brut"
        },
        "federalTax": {
          "label": "Impôt Fédéral"
        },
        "stateTax": {
          "label": "Impôt d'État"
        },
        "socialSecurity": {
          "label": "Sécurité Sociale"
        },
        "medicare": {
          "label": "Medicare"
        },
        "totalTax": {
          "label": "Total Impôts"
        },
        "totalDeductions": {
          "label": "Total Déductions"
        },
        "effectiveTaxRate": {
          "label": "Taux d'Imposition Effectif"
        },
        "annualNet": {
          "label": "Net Annuel"
        },
        "annualGross": {
          "label": "Brut Annuel"
        },
        "annualTax": {
          "label": "Total Impôts Annuel"
        }
      },
      "presets": {
        "entrySalary": {
          "label": "Niveau Débutant",
          "description": "45K$ salaire, célibataire, pas d'impôt d'état"
        },
        "midCareer": {
          "label": "Mi-Carrière",
          "description": "75K$ salaire, célibataire, Californie, 401(k)"
        },
        "familyProvider": {
          "label": "Soutien de Famille",
          "description": "95K$, marié, Texas, prestations complètes"
        },
        "hourlyWorker": {
          "label": "Horaire + HS",
          "description": "20$/h + 5h supplémentaires, bi-hebdomadaire, Floride"
        },
        "highEarner": {
          "label": "Haut Revenu",
          "description": "175K$, marié, New York, déductions maximales"
        }
      },
      "values": {
        "perPaycheck": "/paie",
        "perYear": "/an",
        "perMonth": "/mois",
        "perWeek": "/semaine",
        "weekly": "Hebdomadaire",
        "biweekly": "Bi-hebdomadaire",
        "semimonthly": "Semi-mensuel",
        "monthly": "Mensuel"
      },
      "formats": {
        "summary": "Votre salaire net est de {netPay} par paie ({annualNet} annuellement) d'un brut de {grossPay} après {totalTax} d'impôts totaux."
      },
      "infoCards": {
        "metrics": {
          "title": "Aperçus Salaire",
          "items": [
            {
              "label": "Pourcentage Conservé",
              "valueKey": "percentKept"
            },
            {
              "label": "Équivalent Horaire (Net)",
              "valueKey": "netHourly"
            },
            {
              "label": "Net Quotidien",
              "valueKey": "dailyNet"
            },
            {
              "label": "Net Mensuel",
              "valueKey": "monthlyNet"
            }
          ]
        },
        "details": {
          "title": "Aperçus Impôts",
          "items": [
            {
              "label": "Jour Libération Fiscale",
              "valueKey": "taxFreedomDay"
            },
            {
              "label": "FICA en % du Brut",
              "valueKey": "ficaPercent"
            },
            {
              "label": "Économies Déductions",
              "valueKey": "deductionSavings"
            },
            {
              "label": "Déductions Annuelles Avant Impôt",
              "valueKey": "annualPreTax"
            }
          ]
        },
        "tips": {
          "title": "Conseils Salaire",
          "items": [
            "Maximisez les contributions 401(k) pour réduire le revenu imposable — chaque dollar avant impôt vous fait économiser votre taux marginal",
            "Les contributions HSA ont un triple avantage fiscal : déductibles, croissance non imposée, et non imposées pour frais médicaux",
            "Révisez votre W-4 après changements majeurs — mariage, nouvel enfant, ou achat maison affecte la retenue",
            "Neuf états américains n'ont pas d'impôt sur le revenu : AK, FL, NV, NH, SD, TN, TX, WA, WY"
          ]
        }
      },
      "chart": {
        "title": "Répartition du Salaire",
        "xLabel": "Catégorie",
        "yLabel": "Montant",
        "series": {
          "netPay": "Salaire Net",
          "federalTax": "Impôt Fédéral",
          "stateTax": "Impôt d'État",
          "fica": "FICA (SS + Medicare)",
          "deductions": "Déductions"
        }
      },
      "detailedTable": {
        "annualTable": {
          "button": "Voir Résumé Fiscal Annuel",
          "title": "Résumé Annuel Impôts & Déductions",
          "columns": {
            "item": "Article",
            "perPaycheck": "Par Paie",
            "monthly": "Mensuel",
            "annual": "Annuel"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Calculateur de Salaire ?",
          "content": "Un calculateur de salaire estime votre salaire net — le montant déposé dans votre compte bancaire après que tous les impôts et déductions sont retenus de votre salaire brut. Votre employeur retient l'impôt fédéral sur le revenu, l'impôt d'état (dans la plupart des états), la taxe Sécurité Sociale (6,2%), et la taxe Medicare (1,45%) de chaque paie. De plus, les déductions volontaires avant impôt comme les contributions 401(k), primes d'assurance santé, et contributions HSA réduisent votre revenu imposable et sont soustraites avant que les impôts soient calculés. Comprendre votre paie nette vous aide à budgétiser précisément, comparer les offres d'emploi, et optimiser votre stratégie de retenue d'impôt."
        },
        "howItWorks": {
          "title": "Comment les Impôts sur Salaire sont Calculés",
          "content": "L'impôt fédéral sur le revenu utilise des tranches progressives où différentes portions de votre revenu sont imposées à des taux croissants. Pour 2025, un déclarant célibataire paie 10% sur le revenu jusqu'à 11 925$, puis 12% jusqu'à 48 475$, 22% jusqu'à 103 350$, 24% jusqu'à 197 300$, et des taux plus élevés au-dessus. Votre revenu imposable est votre salaire brut moins les déductions avant impôt et la déduction standard (15 000$ pour célibataire, 30 000$ pour marié déclarant conjointement en 2025). La taxe Sécurité Sociale est un taux fixe de 6,2% sur le revenu jusqu'à 176 100$. Medicare est 1,45% sur tous les revenus, plus 0,9% supplémentaire sur les revenus au-dessus de 200 000$ (célibataire) ou 250 000$ (marié). Les impôts d'état varient largement de 0% à plus de 13% selon l'état."
        },
        "considerations": {
          "title": "Facteurs Importants du Salaire",
          "items": [
            {
              "text": "Les déductions avant impôt (401k, santé, HSA) réduisent votre revenu imposable, vous donnant effectivement une remise égale à votre taux marginal",
              "type": "info"
            },
            {
              "text": "La déduction standard pour 2025 est de 15 000$ (célibataire) ou 30 000$ (marié déclarant conjointement) — ceci n'est pas imposé du tout",
              "type": "info"
            },
            {
              "text": "La taxe Sécurité Sociale s'arrête à 176 100$ en 2025 — les hauts revenus voient une augmentation de paie après avoir atteint ce plafond",
              "type": "info"
            },
            {
              "text": "L'impôt d'état sur le revenu varie dramatiquement : la Californie atteint 13,3%, tandis que 9 états ne facturent rien",
              "type": "warning"
            },
            {
              "text": "La paie des heures supplémentaires est imposée à votre taux d'impôt sur le revenu régulier, pas un taux spécial plus élevé — cela peut juste vous pousser dans une tranche plus élevée",
              "type": "info"
            },
            {
              "text": "Changer vos allocations W-4 ajuste la retenue — plus d'allocations signifie moins d'impôt retenu par paie",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Types de Déductions sur Salaire",
          "items": [
            {
              "text": "Impôt Fédéral sur le Revenu : Tranches progressives de 10% à 37%, basées sur le statut fiscal et le revenu imposable",
              "type": "info"
            },
            {
              "text": "Impôt d'État sur le Revenu : Varie de 0% (9 états) à 13,3% (Californie), avec taux fixes ou progressifs",
              "type": "info"
            },
            {
              "text": "Sécurité Sociale (OASDI) : Taux fixe 6,2% sur revenu jusqu'à 176 100$ (plafond 2025), employeur égale 6,2%",
              "type": "info"
            },
            {
              "text": "Medicare : Taux fixe 1,45% sur tous revenus, plus 0,9% taxe supplémentaire sur revenu au-dessus 200K$ (célibataire)/250K$ (marié)",
              "type": "info"
            },
            {
              "text": "401(k)/403(b) : Épargne retraite volontaire avant impôt, limite 2025 23 500$ (31 000$ si 50+)",
              "type": "info"
            },
            {
              "text": "Assurance Santé & HSA : Primes avant impôt et épargne pour frais médicaux, limite HSA 4 300$ (individuel)/8 550$ (famille)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul de Salaire",
          "description": "Répartitions détaillées de salaire pour scénarios communs",
          "examples": [
            {
              "title": "60 000$ Salaire, Célibataire, Bi-hebdomadaire, Texas (pas d'impôt d'état)",
              "steps": [
                "Brut par paie : 60 000$ / 26 = 2 307,69$",
                "Équivalent déduction standard : 15 000$ / 26 = 576,92$",
                "Imposable par paie : 2 307,69$ - 576,92$ = 1 730,77$",
                "Impôt fédéral : ~207$ (effectif ~9%)",
                "SS : 2 307,69$ × 6,2% = 143,08$",
                "Medicare : 2 307,69$ × 1,45% = 33,46$"
              ],
              "result": "Net : ~1 924$ par paie, 49 928$ annuellement (83,2% du brut)"
            },
            {
              "title": "20$/h + 5h HS, Bi-hebdomadaire, Célibataire, Floride",
              "steps": [
                "Régulier : 80 h × 20$ = 1 600$",
                "Heures supplémentaires : 10 h × 30$ (1,5x) = 300$",
                "Brut par paie : 1 900$",
                "Impôt fédéral : ~125$ (après déduction standard)",
                "SS : 1 900$ × 6,2% = 117,80$",
                "Medicare : 1 900$ × 1,45% = 27,55$"
              ],
              "result": "Net : ~1 630$ par paie, HS ajoute ~220$ net après impôts"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Pourquoi ma première paie est-elle plus petite que prévu ?",
          "answer": "Plusieurs facteurs peuvent rendre votre première paie plus petite : la retenue d'impôt peut être calculée à un taux annualisé plus élevé, vous avez peut-être commencé en milieu de période de paie et reçu une paie partielle, les primes d'assurance santé initiales peuvent être doublement déduites pour couvrir la couverture rétroactive, et certains employeurs ont un décalage d'une période dans la paie. Vérifiez votre bulletin de paie pour une répartition détaillée et assurez-vous que vos allocations W-4 sont correctement définies."
        },
        {
          "question": "Quelle partie de ma paie va aux impôts ?",
          "answer": "Pour la plupart des Américains, la retenue fiscale totale varie de 20 à 35% du salaire brut. Ceci inclut l'impôt fédéral sur le revenu (10-37% marginal, mais typiquement 10-18% effectif), la Sécurité Sociale (6,2% jusqu'à 176 100$), Medicare (1,45-2,35%), et l'impôt d'état sur le revenu (0-13,3%). Une personne célibataire gagnant 60 000$ ramène généralement à la maison environ 75-80% du salaire brut après tous les impôts."
        },
        {
          "question": "Quels états n'ont pas d'impôt sur le revenu ?",
          "answer": "Neuf états américains n'ont pas d'impôt d'état sur le revenu : Alaska, Floride, Nevada, New Hampshire (impose seulement intérêts/dividendes), Dakota du Sud, Tennessee, Texas, Washington, et Wyoming. Vivre dans ces états signifie que votre paie n'est soumise qu'à l'impôt fédéral et FICA, résultant en un salaire net significativement plus élevé comparé aux états à haute taxation comme la Californie (jusqu'à 13,3%) ou New York (jusqu'à 10,9%)."
        },
        {
          "question": "Devrais-je augmenter ma contribution 401(k) ?",
          "answer": "Généralement oui, surtout si votre employeur offre une contrepartie — ne pas contribuer assez pour obtenir la contrepartie complète c'est laisser de l'argent gratuit sur la table. Chaque dollar contributeur avant impôt réduit votre facture fiscale actuelle de votre taux marginal. Pour quelqu'un dans la tranche de 22%, une contribution 401(k) de 100$ ne réduit le salaire net que d'environ 78$. La limite de contribution 2025 est de 23 500$, ou 31 000$ si vous avez 50 ans ou plus."
        },
        {
          "question": "Comment les heures supplémentaires affectent-elles mes impôts ?",
          "answer": "La paie des heures supplémentaires est imposée comme revenu régulier — il n'y a pas de taux d'impôt spécial pour les heures supplémentaires. Cependant, si vos heures supplémentaires poussent votre revenu total dans une tranche d'imposition plus élevée, ce revenu supplémentaire est imposé au taux plus élevé. Par exemple, passer de la tranche 22% à 24% signifie que seul le revenu au-dessus du seuil est imposé à 24%. Votre employeur peut temporairement sur-retenir sur les paies d'heures supplémentaires car les systèmes de paie annualisent chaque paie pour estimer votre tranche."
        },
        {
          "question": "Quelle est la différence entre salaire brut et salaire net ?",
          "answer": "Le salaire brut est votre total des gains avant toute déduction — votre salaire divisé par périodes de paie, ou heures × taux pour les travailleurs horaires. Le salaire net (salaire à emporter) est ce que vous recevez réellement après toutes les déductions : impôt fédéral, impôt d'état, Sécurité Sociale, Medicare, et déductions volontaires comme 401(k), assurance santé, et contributions HSA. Votre salaire net est typiquement 65-80% du salaire brut selon votre situation fiscale et choix de déductions."
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
      "name": "Gehaltsabrechnung Rechner",
      "slug": "gehaltsabrechnung-rechner",
      "breadcrumb": "Gehaltsabrechnung Rechner",
      "seo": {
        "title": "Gehaltsabrechnung Rechner - Kostenloser Nettolohn Kalkulator",
        "description": "Berechnen Sie Ihren Nettolohn nach Bundessteuer, Ländersteuer, Sozialversicherung und Medicare. Unterstützt alle 50 US-Bundesstaaten, Stunden- und Gehaltslohn. Kostenloser Gehaltsrechner.",
        "shortDescription": "Schätzen Sie Ihren Nettolohn nach allen Steuern und Abzügen.",
        "keywords": [
          "gehaltsabrechnung rechner",
          "nettolohn rechner",
          "gehaltsrechner nach steuern",
          "nettolohn kalkulator",
          "lohnabrechnung rechner",
          "kostenloser gehaltsrechner",
          "stundenlohn rechner",
          "gehalt steuerrechner"
        ]
      },
      "subtitle": "Sehen Sie genau, wie viel Sie nach Bundessteuer, Ländersteuer, Sozialversicherung, Medicare und Abzügen netto erhalten.",
      "inputs": {
        "payType": {
          "label": "Lohnart",
          "helpText": "Wie Sie entlohnt werden",
          "options": {
            "salary": "Jahresgehalt",
            "hourly": "Stundenlohn"
          }
        },
        "grossSalary": {
          "label": "Jährliches Bruttogehalt",
          "helpText": "Ihr gesamtes Jahresgehalt vor allen Abzügen"
        },
        "hourlyRate": {
          "label": "Stundenlohn",
          "helpText": "Ihr regulärer Stundenlohn"
        },
        "hoursPerWeek": {
          "label": "Stunden pro Woche",
          "helpText": "Reguläre Arbeitsstunden pro Woche (vor Überstunden)"
        },
        "payFrequency": {
          "label": "Zahlungshäufigkeit",
          "helpText": "Wie oft Sie eine Gehaltsabrechnung erhalten",
          "options": {
            "weekly": "Wöchentlich (52/Jahr)",
            "biweekly": "Zweiwöchentlich (26/Jahr)",
            "semimonthly": "Halbmonatlich (24/Jahr)",
            "monthly": "Monatlich (12/Jahr)"
          }
        },
        "filingStatus": {
          "label": "Steuerstatus",
          "helpText": "Ihr Bundessteuerstatus",
          "options": {
            "single": "Ledig",
            "marriedJoint": "Verheiratet, gemeinsame Veranlagung",
            "marriedSeparate": "Verheiratet, getrennte Veranlagung",
            "headOfHousehold": "Haushaltsvorstand"
          }
        },
        "state": {
          "label": "Bundesstaat",
          "helpText": "Ihr Bundesstaat für die Berechnung der Einkommenssteuer",
          "options": {
            "none": "Keine Ländersteuer",
            "AL": "Alabama",
            "AK": "Alaska",
            "AZ": "Arizona",
            "AR": "Arkansas",
            "CA": "Kalifornien",
            "CO": "Colorado",
            "CT": "Connecticut",
            "DE": "Delaware",
            "FL": "Florida",
            "GA": "Georgia",
            "HI": "Hawaii",
            "ID": "Idaho",
            "IL": "Illinois",
            "IN": "Indiana",
            "IA": "Iowa",
            "KS": "Kansas",
            "KY": "Kentucky",
            "LA": "Louisiana",
            "ME": "Maine",
            "MD": "Maryland",
            "MA": "Massachusetts",
            "MI": "Michigan",
            "MN": "Minnesota",
            "MS": "Mississippi",
            "MO": "Missouri",
            "MT": "Montana",
            "NE": "Nebraska",
            "NV": "Nevada",
            "NH": "New Hampshire",
            "NJ": "New Jersey",
            "NM": "New Mexico",
            "NY": "New York",
            "NC": "North Carolina",
            "ND": "North Dakota",
            "OH": "Ohio",
            "OK": "Oklahoma",
            "OR": "Oregon",
            "PA": "Pennsylvania",
            "RI": "Rhode Island",
            "SC": "South Carolina",
            "SD": "South Dakota",
            "TN": "Tennessee",
            "TX": "Texas",
            "UT": "Utah",
            "VT": "Vermont",
            "VA": "Virginia",
            "WA": "Washington",
            "WV": "West Virginia",
            "WI": "Wisconsin",
            "WY": "Wyoming",
            "DC": "Washington D.C."
          }
        },
        "allowances": {
          "label": "Bundesfreibeträge",
          "helpText": "Anzahl der Freibeträge aus Ihrem W-4 (0 = meiste Steuer einbehalten)"
        },
        "preTax401k": {
          "label": "401(k) Beitrag",
          "helpText": "Vorsteuerlicher Rentenbeitrag pro Gehaltsabrechnung"
        },
        "preTaxHealth": {
          "label": "Krankenversicherung",
          "helpText": "Vorsteuerliche Krankenversicherungsprämie pro Gehaltsabrechnung"
        },
        "preTaxHSA": {
          "label": "HSA Beitrag",
          "helpText": "Gesundheitssparkonto-Beitrag pro Gehaltsabrechnung"
        },
        "otherPreTax": {
          "label": "Andere vorsteuerliche Abzüge",
          "helpText": "Andere vorsteuerliche Abzüge pro Gehaltsabrechnung (FSA, Verkehr, etc.)"
        },
        "includeOvertime": {
          "label": "Überstunden einbeziehen",
          "helpText": "Überstunden zur Gehaltsberechnung hinzufügen"
        },
        "overtimeHours": {
          "label": "Überstunden/Woche",
          "helpText": "Durchschnittliche Überstunden pro Woche"
        },
        "overtimeRate": {
          "label": "Überstunden-Multiplikator",
          "helpText": "Überstunden-Lohnsatz-Multiplikator (1,5x = Zeit und die Hälfte)",
          "options": {
            "2": "2x (Doppelte Zeit)",
            "1.5": "1,5x (Zeit & Hälfte)"
          }
        }
      },
      "results": {
        "netPay": {
          "label": "Nettolohn"
        },
        "grossPay": {
          "label": "Bruttolohn"
        },
        "federalTax": {
          "label": "Bundessteuer"
        },
        "stateTax": {
          "label": "Ländersteuer"
        },
        "socialSecurity": {
          "label": "Sozialversicherung"
        },
        "medicare": {
          "label": "Medicare"
        },
        "totalTax": {
          "label": "Gesamtsteuern"
        },
        "totalDeductions": {
          "label": "Gesamtabzüge"
        },
        "effectiveTaxRate": {
          "label": "Effektiver Steuersatz"
        },
        "annualNet": {
          "label": "Jährlicher Nettolohn"
        },
        "annualGross": {
          "label": "Jährlicher Bruttolohn"
        },
        "annualTax": {
          "label": "Jährliche Gesamtsteuer"
        }
      },
      "presets": {
        "entrySalary": {
          "label": "Einstiegslevel",
          "description": "45.000$ Gehalt, ledig, keine Ländersteuer"
        },
        "midCareer": {
          "label": "Mitte der Laufbahn",
          "description": "75.000$ Gehalt, ledig, Kalifornien, 401(k)"
        },
        "familyProvider": {
          "label": "Familienversorger",
          "description": "95.000$, verheiratet, Texas, volle Leistungen"
        },
        "hourlyWorker": {
          "label": "Stundenlohn + ÜS",
          "description": "20$/Std + 5Std Überstunden, zweiwöchentlich, Florida"
        },
        "highEarner": {
          "label": "Gutverdiener",
          "description": "175.000$, verheiratet, New York, maximale Abzüge"
        }
      },
      "values": {
        "perPaycheck": "/Gehaltsabrechnung",
        "perYear": "/Jahr",
        "perMonth": "/Monat",
        "perWeek": "/Woche",
        "weekly": "Wöchentlich",
        "biweekly": "Zweiwöchentlich",
        "semimonthly": "Halbmonatlich",
        "monthly": "Monatlich"
      },
      "formats": {
        "summary": "Ihr Nettolohn beträgt {netPay} pro Gehaltsabrechnung ({annualNet} jährlich) von einem Bruttolohn von {grossPay} nach {totalTax} Gesamtsteuern."
      },
      "infoCards": {
        "metrics": {
          "title": "Lohn-Einblicke",
          "items": [
            {
              "label": "Prozent den Sie behalten",
              "valueKey": "percentKept"
            },
            {
              "label": "Stundenlohn-Äquivalent (Netto)",
              "valueKey": "netHourly"
            },
            {
              "label": "Täglicher Nettolohn",
              "valueKey": "dailyNet"
            },
            {
              "label": "Monatlicher Nettolohn",
              "valueKey": "monthlyNet"
            }
          ]
        },
        "details": {
          "title": "Steuer-Einblicke",
          "items": [
            {
              "label": "Steuerbefreiungstag",
              "valueKey": "taxFreedomDay"
            },
            {
              "label": "FICA als % vom Brutto",
              "valueKey": "ficaPercent"
            },
            {
              "label": "Abzug-Steuerersparnis",
              "valueKey": "deductionSavings"
            },
            {
              "label": "Jährliche vorsteuerliche Abzüge",
              "valueKey": "annualPreTax"
            }
          ]
        },
        "tips": {
          "title": "Gehaltsabrechnung-Tipps",
          "items": [
            "Maximieren Sie 401(k) Beiträge um das steuerpflichtige Einkommen zu senken — jeder vorsteuerliche Dollar spart Ihnen Ihren Grenzsteuersatz",
            "HSA-Beiträge sind dreifach steuerbegünstigt: absetzbar, wachsen steuerfrei und steuerfrei für medizinische Ausgaben",
            "Überprüfen Sie Ihr W-4 nach wichtigen Lebensveränderungen — Heirat, neues Kind oder Hauskauf beeinflusst die Quellensteuer",
            "Neun US-Bundesstaaten haben keine Einkommenssteuer: AK, FL, NV, NH, SD, TN, TX, WA, WY"
          ]
        }
      },
      "chart": {
        "title": "Gehaltsabrechnung-Aufschlüsselung",
        "xLabel": "Kategorie",
        "yLabel": "Betrag",
        "series": {
          "netPay": "Nettolohn",
          "federalTax": "Bundessteuer",
          "stateTax": "Ländersteuer",
          "fica": "FICA (SS + Medicare)",
          "deductions": "Abzüge"
        }
      },
      "detailedTable": {
        "annualTable": {
          "button": "Jährliche Steuerzusammenfassung anzeigen",
          "title": "Jährliche Steuer- und Abzugszusammenfassung",
          "columns": {
            "item": "Position",
            "perPaycheck": "Pro Gehaltsabrechnung",
            "monthly": "Monatlich",
            "annual": "Jährlich"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Gehaltsabrechnungsrechner?",
          "content": "Ein Gehaltsabrechnungsrechner schätzt Ihren Nettolohn — den Betrag, der nach allen Steuern und Abzügen von Ihrem Bruttolohn auf Ihr Bankkonto eingezahlt wird. Ihr Arbeitgeber behält Bundeseinkommenssteuer, Ländereinkommenssteuer (in den meisten Staaten), Sozialversicherungssteuer (6,2%) und Medicare-Steuer (1,45%) von jeder Gehaltsabrechnung ein. Zusätzlich reduzieren freiwillige vorsteuerliche Abzüge wie 401(k)-Beiträge, Krankenversicherungsprämien und HSA-Beiträge Ihr steuerpflichtiges Einkommen und werden vor der Steuerberechnung abgezogen. Das Verständnis Ihres Nettolohns hilft Ihnen, genau zu budgetieren, Stellenangebote zu vergleichen und Ihre Steuereinbehaltungsstrategie zu optimieren."
        },
        "howItWorks": {
          "title": "Wie Gehaltsabrechnungssteuern berechnet werden",
          "content": "Die Bundeseinkommenssteuer verwendet progressive Stufen, bei denen verschiedene Teile Ihres Einkommens mit steigenden Sätzen besteuert werden. Für 2025 zahlt ein Alleinstehender 10% auf Einkommen bis 11.925$, dann 12% bis 48.475$, 22% bis 103.350$, 24% bis 197.300$ und höhere Sätze darüber hinaus. Ihr steuerpflichtiges Einkommen ist Ihr Bruttolohn minus vorsteuerliche Abzüge und Standardabzug (15.000$ für Alleinstehende, 30.000$ für gemeinsam veranlagte Verheiratete in 2025). Die Sozialversicherungssteuer beträgt pauschal 6,2% auf Einkommen bis 176.100$. Medicare beträgt 1,45% auf das gesamte Einkommen, plus zusätzliche 0,9% auf Einkommen über 200.000$ (Alleinstehende) oder 250.000$ (Verheiratete). Ländersteuern variieren stark von 0% bis über 13% je nach Bundesstaat."
        },
        "considerations": {
          "title": "Wichtige Gehaltsabrechnungsfaktoren",
          "items": [
            {
              "text": "Vorsteuerliche Abzüge (401k, Gesundheit, HSA) reduzieren Ihr steuerpflichtiges Einkommen und geben Ihnen effektiv einen Rabatt gleich Ihrem Grenzsteuersatz",
              "type": "info"
            },
            {
              "text": "Der Standardabzug für 2025 beträgt 15.000$ (Alleinstehende) oder 30.000$ (gemeinsam veranlagte Verheiratete) — dies wird überhaupt nicht besteuert",
              "type": "info"
            },
            {
              "text": "Die Sozialversicherungssteuer stoppt bei 176.100$ in 2025 — Gutverdiener sehen eine Gehaltserhöhung nach Erreichen dieser Obergrenze",
              "type": "info"
            },
            {
              "text": "Ländereinkommenssteuer variiert dramatisch: Kalifornien erreicht bis zu 13,3%, während 9 Staaten nichts verlangen",
              "type": "warning"
            },
            {
              "text": "Überstundenlohn wird mit Ihrem regulären Einkommensteuersatz besteuert, nicht mit einem speziellen höheren Satz — es kann Sie nur in eine höhere Steuerklasse bringen",
              "type": "info"
            },
            {
              "text": "Die Änderung Ihrer W-4-Freibeträge passt die Quellensteuer an — mehr Freibeträge bedeutet weniger einbehaltene Steuer pro Gehaltsabrechnung",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Arten von Gehaltsabrechnungsabzügen",
          "items": [
            {
              "text": "Bundeseinkommenssteuer: Progressive Stufen von 10% bis 37%, basierend auf Steuerstatus und steuerpflichtigem Einkommen",
              "type": "info"
            },
            {
              "text": "Ländereinkommenssteuer: Reicht von 0% (9 Staaten) bis 13,3% (Kalifornien), mit pauschalen oder progressiven Sätzen",
              "type": "info"
            },
            {
              "text": "Sozialversicherung (OASDI): Pauschal 6,2% auf Einkommen bis 176.100$ (2025 Obergrenze), Arbeitgeber zahlt 6,2% dazu",
              "type": "info"
            },
            {
              "text": "Medicare: Pauschal 1,45% auf das gesamte Einkommen, plus 0,9% zusätzliche Steuer auf Einkommen über 200.000$ (Alleinstehende)/250.000$ (Verheiratete)",
              "type": "info"
            },
            {
              "text": "401(k)/403(b): Freiwillige vorsteuerliche Altersvorsorge, 2025 Limit 23.500$ (31.000$ wenn 50+)",
              "type": "info"
            },
            {
              "text": "Krankenversicherung & HSA: Vorsteuerliche Prämien und Sparen für medizinische Ausgaben, HSA Limit 4.300$ (Individual)/8.550$ (Familie)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Gehaltsabrechnungsberechnungsbeispiele",
          "description": "Schritt-für-Schritt Gehaltsabrechnungsaufschlüsselungen für häufige Szenarien",
          "examples": [
            {
              "title": "60.000$ Gehalt, Alleinstehend, Zweiwöchentlich, Texas (keine Ländersteuer)",
              "steps": [
                "Brutto pro Gehaltsabrechnung: 60.000$ / 26 = 2.307,69$",
                "Standardabzug-Äquivalent: 15.000$ / 26 = 576,92$",
                "Steuerpflichtig pro Gehaltsabrechnung: 2.307,69$ - 576,92$ = 1.730,77$",
                "Bundessteuer: ~207$ (effektiv ~9%)",
                "SS: 2.307,69$ × 6,2% = 143,08$",
                "Medicare: 2.307,69$ × 1,45% = 33,46$"
              ],
              "result": "Nettolohn: ~1.924$ pro Gehaltsabrechnung, 49.928$ jährlich (83,2% vom Brutto)"
            },
            {
              "title": "20$/Std + 5Std ÜS, Zweiwöchentlich, Alleinstehend, Florida",
              "steps": [
                "Regulär: 80 Std × 20$ = 1.600$",
                "Überstunden: 10 Std × 30$ (1,5x) = 300$",
                "Brutto pro Gehaltsabrechnung: 1.900$",
                "Bundessteuer: ~125$ (nach Standardabzug)",
                "SS: 1.900$ × 6,2% = 117,80$",
                "Medicare: 1.900$ × 1,45% = 27,55$"
              ],
              "result": "Nettolohn: ~1.630$ pro Gehaltsabrechnung, ÜS fügt ~220$ netto nach Steuern hinzu"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Warum ist meine erste Gehaltsabrechnung kleiner als erwartet?",
          "answer": "Mehrere Faktoren können Ihre erste Gehaltsabrechnung kleiner machen: Die Steuereinbehaltung kann mit einem höheren jährlichen Satz berechnet werden, Sie haben möglicherweise mitten in der Abrechnungsperiode begonnen und teilweisen Lohn erhalten, anfängliche Krankenversicherungsprämien können doppelt abgezogen werden um rückwirkende Deckung abzudecken, und einige Arbeitgeber haben eine Periodenverschiebung beim Lohn. Überprüfen Sie Ihre Lohnabrechnung für eine detaillierte Aufschlüsselung und stellen Sie sicher, dass Ihre W-4-Freibeträge korrekt eingestellt sind."
        },
        {
          "question": "Wie viel meiner Gehaltsabrechnung geht für Steuern drauf?",
          "answer": "Für die meisten Amerikaner liegt die gesamte Steuereinbehaltung zwischen 20-35% des Bruttolohns. Dies beinhaltet Bundeseinkommenssteuer (10-37% Grenzsteuersatz, aber typischerweise 10-18% effektiv), Sozialversicherung (6,2% bis 176.100$), Medicare (1,45-2,35%) und Ländereinkommenssteuer (0-13,3%). Eine alleinstehende Person mit 60.000$ Einkommen behält typischerweise etwa 75-80% des Bruttolohns nach allen Steuern."
        },
        {
          "question": "Welche Staaten haben keine Einkommenssteuer?",
          "answer": "Neun US-Staaten haben keine Ländereinkommenssteuer: Alaska, Florida, Nevada, New Hampshire (besteuert nur Zinsen/Dividenden), South Dakota, Tennessee, Texas, Washington und Wyoming. Das Leben in diesen Staaten bedeutet, dass Ihre Gehaltsabrechnung nur der Bundessteuer und FICA unterliegt, was zu deutlich höherem Nettolohn im Vergleich zu steuerreichen Staaten wie Kalifornien (bis zu 13,3%) oder New York (bis zu 10,9%) führt."
        },
        {
          "question": "Sollte ich meinen 401(k)-Beitrag erhöhen?",
          "answer": "Grundsätzlich ja, besonders wenn Ihr Arbeitgeber Matching anbietet — nicht genug beizutragen um das volle Matching zu bekommen bedeutet, kostenloses Geld liegen zu lassen. Jeder vorsteuerlich beigetragene Dollar reduziert Ihre aktuelle Steuerlast um Ihren Grenzsteuersatz. Für jemanden in der 22%-Steuerklasse reduziert ein 100$-401(k)-Beitrag den Nettolohn nur um etwa 78$. Das 2025-Beitragslimit beträgt 23.500$ oder 31.000$ wenn Sie 50 oder älter sind."
        },
        {
          "question": "Wie beeinflussen Überstunden meine Steuern?",
          "answer": "Überstundenlohn wird als reguläres Einkommen besteuert — es gibt keinen speziellen Überstunden-Steuersatz. Wenn jedoch Ihre Überstunden Ihr Gesamteinkommen in eine höhere Steuerklasse bringen, wird dieses zusätzliche Einkommen mit dem höheren Satz besteuert. Zum Beispiel bedeutet der Wechsel von der 22%- zur 24%-Klasse, dass nur das Einkommen über der Schwelle mit 24% besteuert wird. Ihr Arbeitgeber kann vorübergehend zu viel bei Überstunden-Gehaltsabrechnungen einbehalten, da Lohnsysteme jede Gehaltsabrechnung hochrechnen um Ihre Steuerklasse zu schätzen."
        },
        {
          "question": "Was ist der Unterschied zwischen Brutto- und Nettolohn?",
          "answer": "Bruttolohn ist Ihr Gesamtverdienst vor allen Abzügen — Ihr Gehalt geteilt durch Abrechnungsperioden, oder Stunden × Satz für Stundenlöhner. Nettolohn (Nettolohn) ist was Sie tatsächlich nach allen Abzügen erhalten: Bundessteuer, Ländersteuer, Sozialversicherung, Medicare und freiwillige Abzüge wie 401(k), Krankenversicherung und HSA-Beiträge. Ihr Nettolohn beträgt typischerweise 65-80% des Bruttolohns abhängig von Ihrer Steuersituation und Abzugswahlen."
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

  // ─── INPUTS ─────────────────────────────────────────────────────
  inputs: [
    {
      id: "payType",
      type: "radio",
      defaultValue: "salary",
      options: [{ value: "salary" }, { value: "hourly" }],
    },
    {
      id: "grossSalary",
      type: "number",
      defaultValue: null,
      placeholder: "60000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 10000000,
      showWhen: { field: "payType", value: "salary" },
    },
    {
      id: "hourlyRate",
      type: "number",
      defaultValue: null,
      placeholder: "25",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 10000,
      showWhen: { field: "payType", value: "hourly" },
    },
    {
      id: "hoursPerWeek",
      type: "number",
      defaultValue: 40,
      min: 1,
      max: 168,
      step: 1,
      suffix: "hrs/week",
      showWhen: { field: "payType", value: "hourly" },
    },
    {
      id: "payFrequency",
      type: "select",
      defaultValue: "biweekly",
      options: [
        { value: "weekly" },
        { value: "biweekly" },
        { value: "semimonthly" },
        { value: "monthly" },
      ],
    },
    {
      id: "filingStatus",
      type: "select",
      defaultValue: "single",
      options: [
        { value: "single" },
        { value: "marriedJoint" },
        { value: "marriedSeparate" },
        { value: "headOfHousehold" },
      ],
    },
    {
      id: "state",
      type: "select",
      defaultValue: "none",
      options: [
        { value: "none" },
        { value: "AL" }, { value: "AK" }, { value: "AZ" }, { value: "AR" },
        { value: "CA" }, { value: "CO" }, { value: "CT" }, { value: "DE" },
        { value: "FL" }, { value: "GA" }, { value: "HI" }, { value: "ID" },
        { value: "IL" }, { value: "IN" }, { value: "IA" }, { value: "KS" },
        { value: "KY" }, { value: "LA" }, { value: "ME" }, { value: "MD" },
        { value: "MA" }, { value: "MI" }, { value: "MN" }, { value: "MS" },
        { value: "MO" }, { value: "MT" }, { value: "NE" }, { value: "NV" },
        { value: "NH" }, { value: "NJ" }, { value: "NM" }, { value: "NY" },
        { value: "NC" }, { value: "ND" }, { value: "OH" }, { value: "OK" },
        { value: "OR" }, { value: "PA" }, { value: "RI" }, { value: "SC" },
        { value: "SD" }, { value: "TN" }, { value: "TX" }, { value: "UT" },
        { value: "VT" }, { value: "VA" }, { value: "WA" }, { value: "WV" },
        { value: "WI" }, { value: "WY" }, { value: "DC" },
      ],
    },
    {
      id: "allowances",
      type: "stepper",
      defaultValue: 1,
      min: 0,
      max: 10,
      step: 1,
    },
    {
      id: "preTax401k",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 50000,
    },
    {
      id: "preTaxHealth",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 10000,
    },
    {
      id: "preTaxHSA",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 10000,
    },
    {
      id: "otherPreTax",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 50000,
    },
    {
      id: "includeOvertime",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "overtimeHours",
      type: "number",
      defaultValue: 5,
      min: 0,
      max: 80,
      step: 1,
      suffix: "hrs/week",
      showWhen: { field: "includeOvertime", value: true },
    },
    {
      id: "overtimeRate",
      type: "radio",
      defaultValue: "1.5",
      options: [{ value: "1.5" }, { value: "2" }],
      showWhen: { field: "includeOvertime", value: true },
    },
  ],

  inputGroups: [],

  results: [
    { id: "netPay", type: "primary", format: "number" },
    { id: "grossPay", type: "secondary", format: "number" },
    { id: "federalTax", type: "secondary", format: "number" },
    { id: "stateTax", type: "secondary", format: "number" },
    { id: "socialSecurity", type: "secondary", format: "number" },
    { id: "medicare", type: "secondary", format: "number" },
    { id: "totalTax", type: "secondary", format: "number" },
    { id: "totalDeductions", type: "secondary", format: "number" },
    { id: "effectiveTaxRate", type: "secondary", format: "percent" },
    { id: "annualNet", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "💵", itemCount: 4 },
    { id: "details", type: "list", icon: "📋", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "paycheckBreakdown",
    type: "bar",
    xKey: "label",
    height: 300,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "amount", type: "bar", color: "#3b82f6" },
    ],
  },

  detailedTable: {
    id: "annualTable",
    buttonLabel: "View Annual Tax Summary",
    buttonIcon: "📊",
    modalTitle: "Annual Tax & Deduction Summary",
    columns: [
      { id: "item", label: "Item", align: "left" },
      { id: "perPaycheck", label: "Per Paycheck", align: "right" },
      { id: "monthly", label: "Monthly", align: "right" },
      { id: "annual", label: "Annual", align: "right", highlight: true },
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

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "Internal Revenue Service",
      year: "2025",
      title: "Publication 15 (Circular E) — Employer's Tax Guide",
      source: "IRS",
      url: "https://www.irs.gov/publications/p15",
    },
    {
      authors: "Social Security Administration",
      year: "2025",
      title: "Contribution and Benefit Base — 2025 FICA Limits",
      source: "SSA",
      url: "https://www.ssa.gov/oact/cola/cbb.html",
    },
  ],

  hero: { badge: "Finance", headline: "Paycheck Calculator" },
  sidebar: {},
  features: {},
  relatedCalculators: [
    "salary-calculator",
    "income-tax-calculator",
    "hourly-to-salary-calculator",
    "tax-bracket-calculator",
  ],
  ads: {},
};

// ═══════════════════════════════════════════════════════════════════
// 🧮 CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════

// 2025 Federal Tax Brackets
const BRACKETS_2025: Record<string, Array<{ min: number; max: number; rate: number }>> = {
  single: [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
  marriedJoint: [
    { min: 0, max: 23850, rate: 0.10 },
    { min: 23850, max: 96950, rate: 0.12 },
    { min: 96950, max: 206700, rate: 0.22 },
    { min: 206700, max: 394600, rate: 0.24 },
    { min: 394600, max: 501050, rate: 0.32 },
    { min: 501050, max: 751600, rate: 0.35 },
    { min: 751600, max: Infinity, rate: 0.37 },
  ],
  marriedSeparate: [
    { min: 0, max: 11925, rate: 0.10 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 375800, rate: 0.35 },
    { min: 375800, max: Infinity, rate: 0.37 },
  ],
  headOfHousehold: [
    { min: 0, max: 17000, rate: 0.10 },
    { min: 17000, max: 64850, rate: 0.12 },
    { min: 64850, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250500, rate: 0.32 },
    { min: 250500, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
};

const STANDARD_DEDUCTION_2025: Record<string, number> = {
  single: 15000,
  marriedJoint: 30000,
  marriedSeparate: 15000,
  headOfHousehold: 22500,
};

// Simplified state tax rates (effective rates for estimation)
const STATE_TAX_RATES: Record<string, number> = {
  none: 0, AK: 0, FL: 0, NV: 0, NH: 0, SD: 0, TN: 0, TX: 0, WA: 0, WY: 0,
  AL: 0.04, AZ: 0.025, AR: 0.044, CA: 0.0725, CO: 0.044, CT: 0.055,
  DE: 0.055, GA: 0.0549, HI: 0.065, ID: 0.058, IL: 0.0495, IN: 0.0305,
  IA: 0.044, KS: 0.046, KY: 0.04, LA: 0.0425, ME: 0.058, MD: 0.05,
  MA: 0.05, MI: 0.0425, MN: 0.0685, MS: 0.047, MO: 0.048, MT: 0.059,
  NE: 0.0564, NJ: 0.055, NM: 0.049, NY: 0.065, NC: 0.045, ND: 0.0195,
  OH: 0.035, OK: 0.0425, OR: 0.0875, PA: 0.0307, RI: 0.0525, SC: 0.064,
  VT: 0.066, VA: 0.0575, WV: 0.052, WI: 0.053, DC: 0.065, UT: 0.0465,
};

const SS_RATE = 0.062;
const SS_CAP_2025 = 176100;
const MEDICARE_RATE = 0.0145;
const MEDICARE_ADDITIONAL_RATE = 0.009;
const MEDICARE_ADDITIONAL_THRESHOLD_SINGLE = 200000;
const MEDICARE_ADDITIONAL_THRESHOLD_MARRIED = 250000;

function calcFederalTax(taxableIncome: number, filingStatus: string): number {
  const brackets = BRACKETS_2025[filingStatus] || BRACKETS_2025.single;
  let tax = 0;
  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break;
    const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
    tax += taxableInBracket * bracket.rate;
  }
  return Math.max(0, tax);
}

export function calculatePaycheckCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const payType = (values.payType as string) || "salary";
  const payFrequency = (values.payFrequency as string) || "biweekly";
  const filingStatus = (values.filingStatus as string) || "single";
  const state = (values.state as string) || "none";
  const allowances = (values.allowances as number | null) ?? 1;
  const includeOvertime = values.includeOvertime === true;

  // Pay periods per year
  const periodsMap: Record<string, number> = {
    weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12,
  };
  const periodsPerYear = periodsMap[payFrequency] || 26;

  // ─── Calculate annual gross ─────────────────────────────────
  let annualGross: number;
  if (payType === "hourly") {
    const hourlyRate = (values.hourlyRate as number | null) ?? 0;
    const hoursPerWeek = (values.hoursPerWeek as number | null) ?? 40;
    if (hourlyRate <= 0) return { values: {}, formatted: {}, summary: "", isValid: false };

    annualGross = hourlyRate * hoursPerWeek * 52;

    if (includeOvertime) {
      const otHours = (values.overtimeHours as number | null) ?? 0;
      const otRate = parseFloat((values.overtimeRate as string) || "1.5");
      annualGross += hourlyRate * otRate * otHours * 52;
    }
  } else {
    annualGross = (values.grossSalary as number | null) ?? 0;
    if (annualGross <= 0) return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const grossPerPaycheck = annualGross / periodsPerYear;

  // ─── Pre-tax deductions (per paycheck) ──────────────────────
  const preTax401k = (values.preTax401k as number | null) ?? 0;
  const preTaxHealth = (values.preTaxHealth as number | null) ?? 0;
  const preTaxHSA = (values.preTaxHSA as number | null) ?? 0;
  const otherPreTax = (values.otherPreTax as number | null) ?? 0;
  const totalPreTaxPerPaycheck = preTax401k + preTaxHealth + preTaxHSA + otherPreTax;
  const annualPreTax = totalPreTaxPerPaycheck * periodsPerYear;

  // ─── Federal tax ────────────────────────────────────────────
  const stdDeduction = STANDARD_DEDUCTION_2025[filingStatus] || 15000;
  const allowanceDeduction = allowances * 4300;
  const annualTaxableIncome = Math.max(0, annualGross - annualPreTax - stdDeduction - allowanceDeduction);
  const annualFederalTax = calcFederalTax(annualTaxableIncome, filingStatus);
  const federalPerPaycheck = annualFederalTax / periodsPerYear;

  // ─── State tax ──────────────────────────────────────────────
  const stateRate = STATE_TAX_RATES[state] || 0;
  const annualStateTax = Math.max(0, (annualGross - annualPreTax) * stateRate);
  const statePerPaycheck = annualStateTax / periodsPerYear;

  // ─── FICA ───────────────────────────────────────────────────
  const ssAnnual = Math.min(annualGross, SS_CAP_2025) * SS_RATE;
  const ssPerPaycheck = ssAnnual / periodsPerYear;

  const medicareThreshold = filingStatus === "marriedJoint"
    ? MEDICARE_ADDITIONAL_THRESHOLD_MARRIED
    : MEDICARE_ADDITIONAL_THRESHOLD_SINGLE;
  let medicareAnnual = annualGross * MEDICARE_RATE;
  if (annualGross > medicareThreshold) {
    medicareAnnual += (annualGross - medicareThreshold) * MEDICARE_ADDITIONAL_RATE;
  }
  const medicarePerPaycheck = medicareAnnual / periodsPerYear;

  // ─── Totals ─────────────────────────────────────────────────
  const totalTaxPerPaycheck = federalPerPaycheck + statePerPaycheck + ssPerPaycheck + medicarePerPaycheck;
  const totalDeductionsPerPaycheck = totalTaxPerPaycheck + totalPreTaxPerPaycheck;
  const netPerPaycheck = grossPerPaycheck - totalDeductionsPerPaycheck;

  const annualNet = netPerPaycheck * periodsPerYear;
  const annualTotalTax = totalTaxPerPaycheck * periodsPerYear;
  const effectiveTaxRate = annualGross > 0 ? (annualTotalTax / annualGross) * 100 : 0;

  const currSym = sym(fieldUnits);

  // ─── Chart data ─────────────────────────────────────────────
  const chartData = [
    { label: "Take-Home", amount: Math.round(netPerPaycheck) },
    { label: "Federal", amount: Math.round(federalPerPaycheck) },
    { label: "State", amount: Math.round(statePerPaycheck) },
    { label: "SS", amount: Math.round(ssPerPaycheck) },
    { label: "Medicare", amount: Math.round(medicarePerPaycheck) },
    { label: "Deductions", amount: Math.round(totalPreTaxPerPaycheck) },
  ];

  // ─── Table data ─────────────────────────────────────────────
  const items = [
    { name: "Gross Pay", pp: grossPerPaycheck },
    { name: "Federal Tax", pp: -federalPerPaycheck },
    { name: "State Tax", pp: -statePerPaycheck },
    { name: "Social Security", pp: -ssPerPaycheck },
    { name: "Medicare", pp: -medicarePerPaycheck },
    { name: "401(k)", pp: -preTax401k },
    { name: "Health Insurance", pp: -preTaxHealth },
    { name: "HSA", pp: -preTaxHSA },
    { name: "Other Pre-Tax", pp: -otherPreTax },
    { name: "Net Pay", pp: netPerPaycheck },
  ];

  const mFactor = periodsPerYear / 12;
  const tableData = items.map(item => ({
    item: item.name,
    perPaycheck: fmtCurr(item.pp, currSym),
    monthly: fmtCurr(item.pp * mFactor, currSym),
    annual: fmtCurr(item.pp * periodsPerYear, currSym),
  }));

  const summary = (f.summary || "Your take-home pay is {netPay} per paycheck ({annualNet} annually) from a gross of {grossPay} after {totalTax} in total taxes.")
    .replace("{netPay}", fmtCurr(netPerPaycheck, currSym))
    .replace("{annualNet}", fmtCurr(annualNet, currSym))
    .replace("{grossPay}", fmtCurr(grossPerPaycheck, currSym))
    .replace("{totalTax}", fmtCurr(totalTaxPerPaycheck, currSym));

  // ─── NEW: InfoCard-only computed values ──────────────────────
  const percentKeptVal = annualGross > 0 ? (annualNet / annualGross) * 100 : 0;
  const netHourlyVal = annualNet / 2080;
  const dailyNetVal = annualNet / 260;
  const monthlyNetVal = annualNet / 12;
  const taxFreedomDayNum = annualGross > 0 ? Math.round((annualTotalTax / annualGross) * 365) : 0;
  const taxFreedomDate = new Date(2025, 0, 1);
  taxFreedomDate.setDate(taxFreedomDate.getDate() + taxFreedomDayNum);
  const tfMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const taxFreedomLabel = `${tfMonths[taxFreedomDate.getMonth()]} ${taxFreedomDate.getDate()}`;
  const ficaPercentVal = annualGross > 0 ? ((ssAnnual + medicareAnnual) / annualGross) * 100 : 0;
  const deductionSavingsVal = annualPreTax * (effectiveTaxRate / 100);
  const annualPreTaxTotal = annualPreTax;

  return {
    values: {
      netPay: Math.round(netPerPaycheck * 100) / 100,
      grossPay: Math.round(grossPerPaycheck * 100) / 100,
      federalTax: Math.round(federalPerPaycheck * 100) / 100,
      stateTax: Math.round(statePerPaycheck * 100) / 100,
      socialSecurity: Math.round(ssPerPaycheck * 100) / 100,
      medicare: Math.round(medicarePerPaycheck * 100) / 100,
      totalTax: Math.round(totalTaxPerPaycheck * 100) / 100,
      totalDeductions: Math.round(totalDeductionsPerPaycheck * 100) / 100,
      effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100,
      annualNet: Math.round(annualNet * 100) / 100,
      annualGross: Math.round(annualGross * 100) / 100,
      annualTax: Math.round(annualTotalTax * 100) / 100,
      percentKept: Math.round(percentKeptVal * 10) / 10,
      netHourly: Math.round(netHourlyVal * 100) / 100,
      dailyNet: Math.round(dailyNetVal * 100) / 100,
      monthlyNet: Math.round(monthlyNetVal * 100) / 100,
    },
    formatted: {
      netPay: fmtCurr(netPerPaycheck, currSym),
      grossPay: fmtCurr(grossPerPaycheck, currSym),
      federalTax: fmtCurr(federalPerPaycheck, currSym),
      stateTax: stateRate > 0 ? fmtCurr(statePerPaycheck, currSym) : `${currSym}0`,
      socialSecurity: fmtCurr(ssPerPaycheck, currSym),
      medicare: fmtCurr(medicarePerPaycheck, currSym),
      totalTax: fmtCurr(totalTaxPerPaycheck, currSym),
      totalDeductions: fmtCurr(totalDeductionsPerPaycheck, currSym),
      effectiveTaxRate: `${effectiveTaxRate.toFixed(1)}%`,
      annualNet: fmtCurr(annualNet, currSym),
      annualGross: fmtCurr(annualGross, currSym),
      annualTax: fmtCurr(annualTotalTax, currSym),
      percentKept: `${percentKeptVal.toFixed(1)}%`,
      netHourly: `${fmtCurr(netHourlyVal, currSym)}/hr`,
      dailyNet: `${fmtCurr(dailyNetVal, currSym)}/day`,
      monthlyNet: fmtCurr(monthlyNetVal, currSym),
      taxFreedomDay: taxFreedomLabel,
      ficaPercent: `${ficaPercentVal.toFixed(1)}%`,
      deductionSavings: annualPreTaxTotal > 0 ? fmtCurr(deductionSavingsVal, currSym) : "—",
      annualPreTax: annualPreTaxTotal > 0 ? fmtCurr(annualPreTaxTotal, currSym) : "—",
    },
    summary,
    isValid: true,
    metadata: { chartData, tableData },
  };
}

function sym(fieldUnits?: Record<string, string>): string {
  const curr = fieldUnits?.grossSalary || fieldUnits?.hourlyRate || "USD";
  const S: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$", JPY: "¥", INR: "₹",
    CAD: "C$", AUD: "A$", CHF: "CHF ", COP: "COL$", ARS: "AR$", PEN: "S/",
    CLP: "CLP ", CNY: "¥", KRW: "₩", PLN: "zł", TRY: "₺", ZAR: "R",
  };
  return S[curr] || "$";
}

function fmtCurr(val: number, symbol: string): string {
  if (val === 0) return `${symbol}0`;
  const abs = Math.abs(val);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: abs >= 100 ? 0 : 2,
    maximumFractionDigits: abs >= 100 ? 0 : 2,
  });
  return val < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

export default paycheckCalculatorConfig;
