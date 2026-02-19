import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════
// 🏛️ INCOME TAX CALCULATOR — Federal + State + FICA (2025)
// ═══════════════════════════════════════════════════════════════════

export const incomeTaxCalculatorConfig: CalculatorConfigV4 = {
  id: "income-tax-calculator",
  version: "4.0",
  category: "finance",
  icon: "🏛️",

  presets: [
    {
      id: "singleBasic",
      icon: "👤",
      values: {
        filingStatus: "single",
        grossIncome: 55000,
        otherIncome: 0,
        deductionType: "standard",
        itemizedDeductions: 0,
        retirement401k: 0,
        iraContribution: 0,
        hsaContribution: 0,
        studentLoanInterest: 0,
        childrenUnder17: 0,
        childrenOther: 0,
        includeState: false,
        stateRate: 5,
        selfEmployed: false,
        selfEmploymentIncome: 0,
      },
    },
    {
      id: "singleWithRetirement",
      icon: "📈",
      values: {
        filingStatus: "single",
        grossIncome: 85000,
        otherIncome: 2000,
        deductionType: "standard",
        itemizedDeductions: 0,
        retirement401k: 10000,
        iraContribution: 6500,
        hsaContribution: 4150,
        studentLoanInterest: 2500,
        childrenUnder17: 0,
        childrenOther: 0,
        includeState: true,
        stateRate: 5.5,
        selfEmployed: false,
        selfEmploymentIncome: 0,
      },
    },
    {
      id: "marriedFamily",
      icon: "👨‍👩‍👧‍👦",
      values: {
        filingStatus: "marriedJoint",
        grossIncome: 130000,
        otherIncome: 5000,
        deductionType: "standard",
        itemizedDeductions: 0,
        retirement401k: 15000,
        iraContribution: 0,
        hsaContribution: 8300,
        studentLoanInterest: 0,
        childrenUnder17: 2,
        childrenOther: 0,
        includeState: true,
        stateRate: 4.5,
        selfEmployed: false,
        selfEmploymentIncome: 0,
      },
    },
    {
      id: "highEarner",
      icon: "💎",
      values: {
        filingStatus: "marriedJoint",
        grossIncome: 250000,
        otherIncome: 15000,
        deductionType: "itemized",
        itemizedDeductions: 42000,
        retirement401k: 23500,
        iraContribution: 0,
        hsaContribution: 8300,
        studentLoanInterest: 0,
        childrenUnder17: 3,
        childrenOther: 1,
        includeState: true,
        stateRate: 7.5,
        selfEmployed: false,
        selfEmploymentIncome: 0,
      },
    },
    {
      id: "selfEmployedFreelancer",
      icon: "💻",
      values: {
        filingStatus: "single",
        grossIncome: 0,
        otherIncome: 0,
        deductionType: "standard",
        itemizedDeductions: 0,
        retirement401k: 0,
        iraContribution: 6500,
        hsaContribution: 4150,
        studentLoanInterest: 0,
        childrenUnder17: 0,
        childrenOther: 0,
        includeState: true,
        stateRate: 5,
        selfEmployed: true,
        selfEmploymentIncome: 95000,
      },
    },
  ],

  t: {
    en: {
      name: "Income Tax Calculator",
      slug: "income-tax-calculator",
      breadcrumb: "Income Tax Calculator",

      seo: {
        title: "Income Tax Calculator - 2025 Federal Tax Estimator",
        description: "Estimate your 2025 federal income tax with updated brackets, standard deduction, child tax credits, and FICA. Supports all filing statuses. Free tax calculator.",
        shortDescription: "Estimate your 2025 federal income tax and effective rate.",
        keywords: [
          "income tax calculator",
          "federal tax calculator",
          "tax calculator 2025",
          "tax bracket calculator",
          "tax refund estimator",
          "free tax calculator",
          "how much tax do I owe",
          "effective tax rate calculator",
        ],
      },

      subtitle: "Estimate your 2025 federal income tax, see your tax bracket, and calculate your effective rate with deductions and credits.",

      calculator: { yourInformation: "Your Information" },
      ui: {
        yourInformation: "Tax Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        filingStatus: {
          label: "Filing Status",
          helpText: "Your federal income tax filing status for 2025",
          options: {
            single: "Single",
            marriedJoint: "Married Filing Jointly",
            marriedSeparate: "Married Filing Separately",
            headOfHousehold: "Head of Household",
          },
        },
        grossIncome: {
          label: "Gross Income (W-2)",
          helpText: "Total wages, salary, and tips from all W-2 jobs",
        },
        otherIncome: {
          label: "Other Income",
          helpText: "Interest, dividends, capital gains, rental income, etc.",
        },
        deductionType: {
          label: "Deduction Type",
          helpText: "Standard deduction or itemize your deductions",
          options: {
            standard: "Standard Deduction",
            itemized: "Itemized Deductions",
          },
        },
        itemizedDeductions: {
          label: "Itemized Deductions",
          helpText: "Total of mortgage interest, state/local taxes (SALT up to $10K), charitable contributions, medical expenses over 7.5% AGI",
        },
        retirement401k: {
          label: "401(k) Contribution",
          helpText: "Annual pre-tax 401(k) contributions (2025 limit: $23,500, $31,000 if 50+)",
        },
        iraContribution: {
          label: "Traditional IRA",
          helpText: "Deductible IRA contributions (2025 limit: $7,000, $8,000 if 50+)",
        },
        hsaContribution: {
          label: "HSA Contribution",
          helpText: "Health Savings Account (2025 limit: $4,300 individual, $8,550 family)",
        },
        studentLoanInterest: {
          label: "Student Loan Interest",
          helpText: "Deductible student loan interest paid (max $2,500/year)",
        },
        childrenUnder17: {
          label: "Children Under 17",
          helpText: "Number of qualifying children under 17 for Child Tax Credit ($2,000 each)",
        },
        childrenOther: {
          label: "Other Dependents",
          helpText: "Other dependents for Credit for Other Dependents ($500 each)",
        },
        includeState: {
          label: "Include State Tax Estimate",
          helpText: "Add an estimated state income tax calculation",
        },
        stateRate: {
          label: "State Tax Rate",
          helpText: "Your effective state income tax rate",
        },
        selfEmployed: {
          label: "Self-Employment Income",
          helpText: "Include self-employment income and SE tax calculation",
        },
        selfEmploymentIncome: {
          label: "Self-Employment Income",
          helpText: "Net self-employment earnings (1099 income minus business expenses)",
        },
      },

      results: {
        totalTax: { label: "Total Federal Tax" },
        effectiveRate: { label: "Effective Tax Rate" },
        marginalRate: { label: "Marginal Tax Rate" },
        taxableIncome: { label: "Taxable Income" },
        federalIncomeTax: { label: "Federal Income Tax" },
        socialSecurity: { label: "Social Security Tax" },
        medicare: { label: "Medicare Tax" },
        ficaTotal: { label: "Total FICA" },
        stateTax: { label: "State Tax Estimate" },
        childTaxCredit: { label: "Child Tax Credit" },
        selfEmploymentTax: { label: "Self-Employment Tax" },
        afterTaxIncome: { label: "After-Tax Income" },
      },

      presets: {
        singleBasic: { label: "Single Basic", description: "$55K salary, single, standard deduction" },
        singleWithRetirement: { label: "Single + Retirement", description: "$85K salary, 401(k) + IRA + HSA" },
        marriedFamily: { label: "Married Family", description: "$130K, married, 2 kids, 401(k) + HSA" },
        highEarner: { label: "High Earner", description: "$250K, married, 3 kids, itemized deductions" },
        selfEmployedFreelancer: { label: "Freelancer (SE)", description: "$95K self-employment, single" },
      },

      values: {
        "perBracket": "per bracket",
        "on": "on",
        "of": "of",
        "taxBracket": "tax bracket",
      },

      formats: {
        summary: "Your estimated 2025 federal tax is {totalTax} on {taxableIncome} taxable income, for an effective rate of {effectiveRate}.",
      },

      infoCards: {
        metrics: {
          title: "Tax Insights",
          items: [
            { label: "Monthly Tax Burden", valueKey: "monthlyTax" },
            { label: "Tax per Working Hour", valueKey: "taxPerHour" },
            { label: "Percent You Keep", valueKey: "percentKept" },
            { label: "Tax Freedom Day", valueKey: "taxFreedomDay" },
          ],
        },
        details: {
          title: "Deduction Impact",
          items: [
            { label: "Total Above-the-Line", valueKey: "totalAboveLine" },
            { label: "Deduction Used", valueKey: "deductionUsed" },
            { label: "Deduction Tax Savings", valueKey: "deductionSavings" },
            { label: "Credits Applied", valueKey: "totalCredits" },
          ],
        },
        tips: {
          title: "Tax Reduction Tips",
          items: [
            "Max out your 401(k) to reduce taxable income by up to $23,500 ($31,000 if 50+) in 2025",
            "HSA contributions are triple tax-advantaged: deductible, grow tax-free, and withdraw tax-free for medical",
            "Bunching charitable donations into alternating years can help you itemize in high-giving years",
            "Long-term capital gains are taxed at lower rates (0%, 15%, or 20%) than ordinary income",
          ],
        },
      },

      chart: {
        title: "Tax Bracket Breakdown",
        xLabel: "Bracket",
        yLabel: "Tax Amount",
        series: {
          taxAmount: "Tax in Bracket",
        },
      },

      detailedTable: {
        bracketTable: {
          button: "View Tax Bracket Breakdown",
          title: "2025 Federal Tax Bracket Breakdown",
          columns: {
            bracket: "Tax Bracket",
            range: "Income Range",
            taxableInBracket: "Taxable in Bracket",
            taxInBracket: "Tax in Bracket",
            cumulativeTax: "Cumulative Tax",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is Income Tax?",
          content: "Federal income tax is a progressive tax on your earnings collected by the Internal Revenue Service (IRS). Progressive means the tax rate increases as your income rises, with income divided into brackets taxed at different rates ranging from 10% to 37% for 2025. Only the income within each bracket is taxed at that rate — not your entire income. Your total tax bill also includes FICA taxes (Social Security at 6.2% and Medicare at 1.45%), plus any self-employment tax if applicable. Credits like the Child Tax Credit directly reduce your tax bill, while deductions reduce the income that gets taxed. Understanding the difference between your marginal rate (highest bracket) and effective rate (actual percentage paid) is crucial for financial planning.",
        },
        howItWorks: {
          title: "How Federal Income Tax Is Calculated",
          content: "Federal income tax calculation follows a specific order: start with gross income (wages, salary, tips, interest, dividends, capital gains, and other earnings), then subtract above-the-line deductions (401k, IRA, HSA, student loan interest) to get Adjusted Gross Income (AGI). Next, subtract either the standard deduction or itemized deductions to arrive at taxable income. Apply the progressive tax brackets for your filing status to calculate the base tax. Subtract tax credits (Child Tax Credit, education credits) to get your final tax liability. If your total withholding and estimated payments exceed this amount, you receive a refund. If they fall short, you owe the difference. FICA taxes are calculated separately as a flat percentage of gross wages.",
        },
        considerations: {
          title: "Key Tax Considerations for 2025",
          items: [
            { text: "Standard deduction for 2025: $15,000 (single), $30,000 (married joint), $22,500 (head of household)", type: "info" },
            { text: "Child Tax Credit: $2,000 per qualifying child under 17, with $1,700 refundable per child", type: "info" },
            { text: "401(k) limit: $23,500 ($31,000 if 50+), IRA limit: $7,000 ($8,000 if 50+), HSA: $4,300/$8,550", type: "info" },
            { text: "SALT deduction cap remains at $10,000 for state and local taxes when itemizing", type: "warning" },
            { text: "Social Security wage cap for 2025 is $176,100 — income above this is not subject to the 6.2% SS tax", type: "info" },
            { text: "Net Investment Income Tax (NIIT) of 3.8% applies to investment income above $200K (single)/$250K (married)", type: "warning" },
          ],
        },
        categories: {
          title: "2025 Federal Tax Brackets",
          items: [
            { text: "10% Bracket: $0 to $11,925 (single) / $0 to $23,850 (married joint) — lowest rate on first dollars earned", type: "info" },
            { text: "12% Bracket: $11,926 to $48,475 (single) / $23,851 to $96,950 (married) — most common bracket for average earners", type: "info" },
            { text: "22% Bracket: $48,476 to $103,350 (single) / $96,951 to $206,700 (married) — where many professionals fall", type: "info" },
            { text: "24% Bracket: $103,351 to $197,300 (single) / $206,701 to $394,600 (married) — upper-middle income range", type: "info" },
            { text: "32% Bracket: $197,301 to $250,525 (single) / $394,601 to $501,050 (married) — high earner territory", type: "info" },
            { text: "35-37% Brackets: Above $250,525 (single) / $501,050 (married) — top marginal rates for highest earners", type: "info" },
          ],
        },
        examples: {
          title: "Tax Calculation Examples",
          description: "Step-by-step tax calculations for common scenarios",
          examples: [
            {
              title: "$75,000 Salary, Single, Standard Deduction",
              steps: [
                "Gross Income: $75,000",
                "Standard Deduction: -$15,000",
                "Taxable Income: $60,000",
                "10% on first $11,925 = $1,192.50",
                "12% on $11,926–$48,475 = $4,386.00",
                "22% on $48,476–$60,000 = $2,535.50",
              ],
              result: "Federal Tax: $8,114 | Effective Rate: 10.8% | Marginal Rate: 22%",
            },
            {
              title: "$150,000 Married Joint, 2 Kids, 401(k) $20K",
              steps: [
                "Gross Income: $150,000 - $20,000 (401k) = $130,000 AGI",
                "Standard Deduction: -$30,000",
                "Taxable Income: $100,000",
                "10% on first $23,850 = $2,385",
                "12% on $23,851–$96,950 = $8,772",
                "22% on $96,951–$100,000 = $671.50",
              ],
              result: "Tax before credits: $11,829 - $4,000 (2 kids) = $7,829 | Effective: 5.2%",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is the difference between marginal and effective tax rate?",
          answer: "Your marginal tax rate is the rate applied to your last dollar of taxable income — the highest bracket you reach. Your effective tax rate is the total tax divided by total income, representing your actual average rate. For example, a single filer earning $75,000 has a 22% marginal rate but only pays about 10.8% effective rate because the first portions of income are taxed at 10% and 12%. The effective rate is more useful for budgeting and comparing tax burdens.",
        },
        {
          question: "Should I take the standard deduction or itemize?",
          answer: "Take whichever gives you a larger deduction. For 2025, the standard deduction is $15,000 (single) or $30,000 (married filing jointly). You should itemize only if your total deductible expenses exceed these amounts. Common itemized deductions include mortgage interest, state and local taxes (SALT, capped at $10,000), charitable contributions, and medical expenses exceeding 7.5% of AGI. Most taxpayers (about 90%) benefit more from the standard deduction since the 2017 tax reform nearly doubled it.",
        },
        {
          question: "How does the Child Tax Credit work in 2025?",
          answer: "For 2025, the Child Tax Credit is $2,000 per qualifying child under age 17. Of this, up to $1,700 is refundable (meaning you can receive it even if you owe no tax). The credit phases out for higher incomes: it begins reducing at $200,000 AGI for single filers and $400,000 for married filing jointly, declining by $50 for every $1,000 of income above the threshold. Children must have a valid Social Security number and be claimed as dependents on your return.",
        },
        {
          question: "How is self-employment tax calculated?",
          answer: "Self-employed individuals pay both the employee and employer portions of FICA: 12.4% for Social Security (up to $176,100 in 2025) plus 2.9% for Medicare, totaling 15.3%. However, you first multiply net self-employment income by 92.35% (to account for the employer-equivalent portion), and you can deduct half of the SE tax as an above-the-line deduction on your income tax. So on $100,000 SE income: SE base = $92,350, SE tax = $14,130, and you deduct $7,065 from your income tax calculation.",
        },
        {
          question: "What are above-the-line deductions?",
          answer: "Above-the-line deductions (officially 'adjustments to income') reduce your Adjusted Gross Income (AGI) regardless of whether you itemize. Key above-the-line deductions for 2025 include: traditional 401(k) contributions ($23,500 limit), traditional IRA contributions ($7,000 limit), HSA contributions ($4,300 individual/$8,550 family), student loan interest (up to $2,500), half of self-employment tax, and educator expenses ($300). Lower AGI can also qualify you for other credits and deductions that have income phase-outs.",
        },
        {
          question: "When do I need to pay estimated taxes?",
          answer: "You generally need to pay estimated taxes quarterly if you expect to owe $1,000 or more in tax after subtracting withholding and credits. This commonly applies to self-employed individuals, freelancers, investors with significant capital gains, and retirees. Quarterly due dates are April 15, June 15, September 15, and January 15 of the following year. Penalties apply for underpayment, though you can avoid them by paying at least 100% of last year's tax (110% if AGI exceeded $150,000).",
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
      "name": "Calculadora de Impuesto sobre la Renta",
      "slug": "calculadora-impuesto-sobre-la-renta",
      "breadcrumb": "Calculadora de Impuesto sobre la Renta",
      "seo": {
        "title": "Calculadora de Impuesto sobre la Renta - Estimador Fiscal Federal 2025",
        "description": "Estime su impuesto federal sobre la renta 2025 con tramos actualizados, deducción estándar, créditos fiscales por hijos y FICA. Compatible con todos los estados civiles. Calculadora fiscal gratuita.",
        "shortDescription": "Estime su impuesto federal sobre la renta 2025 y tasa efectiva.",
        "keywords": [
          "calculadora impuesto sobre la renta",
          "calculadora impuesto federal",
          "calculadora fiscal 2025",
          "calculadora tramos fiscales",
          "estimador reembolso fiscal",
          "calculadora fiscal gratuita",
          "cuánto impuesto debo",
          "calculadora tasa efectiva impuestos"
        ]
      },
      "subtitle": "Estime su impuesto federal sobre la renta 2025, vea su tramo fiscal y calcule su tasa efectiva con deducciones y créditos.",
      "inputs": {
        "filingStatus": {
          "label": "Estado Civil Fiscal",
          "helpText": "Su estado civil para el impuesto federal sobre la renta para 2025",
          "options": {
            "single": "Soltero",
            "marriedJoint": "Casado Declarando Conjuntamente",
            "marriedSeparate": "Casado Declarando por Separado",
            "headOfHousehold": "Cabeza de Familia"
          }
        },
        "grossIncome": {
          "label": "Ingreso Bruto (W-2)",
          "helpText": "Total de salarios, sueldo y propinas de todos los trabajos W-2"
        },
        "otherIncome": {
          "label": "Otros Ingresos",
          "helpText": "Intereses, dividendos, ganancias de capital, ingresos por alquiler, etc."
        },
        "deductionType": {
          "label": "Tipo de Deducción",
          "helpText": "Deducción estándar o detallar sus deducciones",
          "options": {
            "standard": "Deducción Estándar",
            "itemized": "Deducciones Detalladas"
          }
        },
        "itemizedDeductions": {
          "label": "Deducciones Detalladas",
          "helpText": "Total de intereses hipotecarios, impuestos estatales/locales (SALT hasta $10K), contribuciones benéficas, gastos médicos superiores al 7.5% del IGR"
        },
        "retirement401k": {
          "label": "Contribución 401(k)",
          "helpText": "Contribuciones anuales antes de impuestos al 401(k) (límite 2025: $23,500, $31,000 si es mayor de 50)"
        },
        "iraContribution": {
          "label": "IRA Tradicional",
          "helpText": "Contribuciones deducibles al IRA (límite 2025: $7,000, $8,000 si es mayor de 50)"
        },
        "hsaContribution": {
          "label": "Contribución HSA",
          "helpText": "Cuenta de Ahorros para la Salud (límite 2025: $4,300 individual, $8,550 familiar)"
        },
        "studentLoanInterest": {
          "label": "Interés Préstamos Estudiantiles",
          "helpText": "Interés deducible de préstamos estudiantiles pagado (máx $2,500/año)"
        },
        "childrenUnder17": {
          "label": "Niños Menores de 17",
          "helpText": "Número de hijos calificados menores de 17 para el Crédito Fiscal por Hijos ($2,000 cada uno)"
        },
        "childrenOther": {
          "label": "Otros Dependientes",
          "helpText": "Otros dependientes para Crédito por Otros Dependientes ($500 cada uno)"
        },
        "includeState": {
          "label": "Incluir Estimación Impuesto Estatal",
          "helpText": "Agregar cálculo estimado del impuesto estatal sobre la renta"
        },
        "stateRate": {
          "label": "Tasa Impuesto Estatal",
          "helpText": "Su tasa efectiva del impuesto estatal sobre la renta"
        },
        "selfEmployed": {
          "label": "Ingresos por Trabajo Independiente",
          "helpText": "Incluir ingresos por trabajo independiente y cálculo de impuesto SE"
        },
        "selfEmploymentIncome": {
          "label": "Ingresos por Trabajo Independiente",
          "helpText": "Ganancias netas por trabajo independiente (ingresos 1099 menos gastos comerciales)"
        }
      },
      "results": {
        "totalTax": {
          "label": "Impuesto Federal Total"
        },
        "effectiveRate": {
          "label": "Tasa Efectiva de Impuesto"
        },
        "marginalRate": {
          "label": "Tasa Marginal de Impuesto"
        },
        "taxableIncome": {
          "label": "Ingreso Gravable"
        },
        "federalIncomeTax": {
          "label": "Impuesto Federal sobre la Renta"
        },
        "socialSecurity": {
          "label": "Impuesto Seguridad Social"
        },
        "medicare": {
          "label": "Impuesto Medicare"
        },
        "ficaTotal": {
          "label": "Total FICA"
        },
        "stateTax": {
          "label": "Estimación Impuesto Estatal"
        },
        "childTaxCredit": {
          "label": "Crédito Fiscal por Hijos"
        },
        "selfEmploymentTax": {
          "label": "Impuesto Trabajo Independiente"
        },
        "afterTaxIncome": {
          "label": "Ingreso Después de Impuestos"
        }
      },
      "presets": {
        "singleBasic": {
          "label": "Soltero Básico",
          "description": "Salario $55K, soltero, deducción estándar"
        },
        "singleWithRetirement": {
          "label": "Soltero + Jubilación",
          "description": "Salario $85K, 401(k) + IRA + HSA"
        },
        "marriedFamily": {
          "label": "Familia Casada",
          "description": "$130K, casados, 2 hijos, 401(k) + HSA"
        },
        "highEarner": {
          "label": "Alto Ingreso",
          "description": "$250K, casados, 3 hijos, deducciones detalladas"
        },
        "selfEmployedFreelancer": {
          "label": "Freelancer (TI)",
          "description": "$95K trabajo independiente, soltero"
        }
      },
      "values": {
        "perBracket": "por tramo",
        "on": "sobre",
        "of": "de",
        "taxBracket": "tramo fiscal"
      },
      "formats": {
        "summary": "Su impuesto federal estimado para 2025 es {totalTax} sobre {taxableIncome} de ingreso gravable, para una tasa efectiva de {effectiveRate}."
      },
      "infoCards": {
        "metrics": {
          "title": "Información Fiscal",
          "items": [
            {
              "label": "Carga Fiscal Mensual",
              "valueKey": "monthlyTax"
            },
            {
              "label": "Impuesto por Hora de Trabajo",
              "valueKey": "taxPerHour"
            },
            {
              "label": "Porcentaje que Conserva",
              "valueKey": "percentKept"
            },
            {
              "label": "Día de Libertad Fiscal",
              "valueKey": "taxFreedomDay"
            }
          ]
        },
        "details": {
          "title": "Impacto de Deducciones",
          "items": [
            {
              "label": "Total Ajustes al Ingreso",
              "valueKey": "totalAboveLine"
            },
            {
              "label": "Deducción Utilizada",
              "valueKey": "deductionUsed"
            },
            {
              "label": "Ahorro Fiscal por Deducción",
              "valueKey": "deductionSavings"
            },
            {
              "label": "Créditos Aplicados",
              "valueKey": "totalCredits"
            }
          ]
        },
        "tips": {
          "title": "Consejos para Reducir Impuestos",
          "items": [
            "Maximice su 401(k) para reducir el ingreso gravable hasta $23,500 ($31,000 si es mayor de 50) en 2025",
            "Las contribuciones HSA tienen triple ventaja fiscal: deducibles, crecen libres de impuestos y se retiran libres de impuestos para gastos médicos",
            "Agrupar donaciones benéficas en años alternos puede ayudarle a detallar en años de altas donaciones",
            "Las ganancias de capital a largo plazo se gravan a tasas más bajas (0%, 15% o 20%) que los ingresos ordinarios"
          ]
        }
      },
      "chart": {
        "title": "Desglose por Tramos Fiscales",
        "xLabel": "Tramo",
        "yLabel": "Cantidad de Impuesto",
        "series": {
          "taxAmount": "Impuesto en el Tramo"
        }
      },
      "detailedTable": {
        "bracketTable": {
          "button": "Ver Desglose de Tramos Fiscales",
          "title": "Desglose de Tramos Fiscales Federales 2025",
          "columns": {
            "bracket": "Tramo Fiscal",
            "range": "Rango de Ingresos",
            "taxableInBracket": "Gravable en el Tramo",
            "taxInBracket": "Impuesto en el Tramo",
            "cumulativeTax": "Impuesto Acumulado"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el Impuesto sobre la Renta?",
          "content": "El impuesto federal sobre la renta es un impuesto progresivo sobre sus ganancias recaudado por el Servicio de Rentas Internas (IRS). Progresivo significa que la tasa de impuesto aumenta conforme aumenta su ingreso, con el ingreso dividido en tramos gravados a diferentes tasas que van del 10% al 37% para 2025. Solo el ingreso dentro de cada tramo se grava a esa tasa, no todo su ingreso. Su factura fiscal total también incluye impuestos FICA (Seguridad Social al 6.2% y Medicare al 1.45%), más cualquier impuesto por trabajo independiente si aplica. Los créditos como el Crédito Fiscal por Hijos reducen directamente su factura fiscal, mientras que las deducciones reducen el ingreso que se grava. Entender la diferencia entre su tasa marginal (tramo más alto) y tasa efectiva (porcentaje real pagado) es crucial para la planificación financiera."
        },
        "howItWorks": {
          "title": "Cómo se Calcula el Impuesto Federal sobre la Renta",
          "content": "El cálculo del impuesto federal sobre la renta sigue un orden específico: comience con el ingreso bruto (salarios, sueldo, propinas, intereses, dividendos, ganancias de capital y otras ganancias), luego reste los ajustes al ingreso (401k, IRA, HSA, interés de préstamos estudiantiles) para obtener el Ingreso Bruto Ajustado (IGR). Después, reste la deducción estándar o las deducciones detalladas para llegar al ingreso gravable. Aplique los tramos fiscales progresivos para su estado civil para calcular el impuesto base. Reste los créditos fiscales (Crédito Fiscal por Hijos, créditos educativos) para obtener su obligación fiscal final. Si sus retenciones totales y pagos estimados exceden esta cantidad, recibe un reembolso. Si son insuficientes, debe la diferencia. Los impuestos FICA se calculan por separado como un porcentaje fijo de los salarios brutos."
        },
        "considerations": {
          "title": "Consideraciones Fiscales Clave para 2025",
          "items": [
            {
              "text": "Deducción estándar para 2025: $15,000 (soltero), $30,000 (casado conjunto), $22,500 (cabeza de familia)",
              "type": "info"
            },
            {
              "text": "Crédito Fiscal por Hijos: $2,000 por hijo calificado menor de 17, con $1,700 reembolsables por hijo",
              "type": "info"
            },
            {
              "text": "Límite 401(k): $23,500 ($31,000 si es mayor de 50), límite IRA: $7,000 ($8,000 si es mayor de 50), HSA: $4,300/$8,550",
              "type": "info"
            },
            {
              "text": "El límite de deducción SALT permanece en $10,000 para impuestos estatales y locales al detallar",
              "type": "warning"
            },
            {
              "text": "El límite salarial de Seguridad Social para 2025 es $176,100: el ingreso superior no está sujeto al impuesto SS del 6.2%",
              "type": "info"
            },
            {
              "text": "El Impuesto sobre Ingresos Netos de Inversión (NIIT) del 3.8% se aplica a ingresos de inversión superiores a $200K (soltero)/$250K (casado)",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Tramos Fiscales Federales 2025",
          "items": [
            {
              "text": "Tramo 10%: $0 a $11,925 (soltero) / $0 a $23,850 (casado conjunto) — tasa más baja en primeros dólares ganados",
              "type": "info"
            },
            {
              "text": "Tramo 12%: $11,926 a $48,475 (soltero) / $23,851 a $96,950 (casado) — tramo más común para ingresos promedio",
              "type": "info"
            },
            {
              "text": "Tramo 22%: $48,476 a $103,350 (soltero) / $96,951 a $206,700 (casado) — donde caen muchos profesionales",
              "type": "info"
            },
            {
              "text": "Tramo 24%: $103,351 a $197,300 (soltero) / $206,701 a $394,600 (casado) — rango de ingresos medio-altos",
              "type": "info"
            },
            {
              "text": "Tramo 32%: $197,301 a $250,525 (soltero) / $394,601 a $501,050 (casado) — territorio de altos ingresos",
              "type": "info"
            },
            {
              "text": "Tramos 35-37%: Superior a $250,525 (soltero) / $501,050 (casado) — tasas marginales máximas para mayores ingresos",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo Fiscal",
          "description": "Cálculos fiscales paso a paso para escenarios comunes",
          "examples": [
            {
              "title": "Salario $75,000, Soltero, Deducción Estándar",
              "steps": [
                "Ingreso Bruto: $75,000",
                "Deducción Estándar: -$15,000",
                "Ingreso Gravable: $60,000",
                "10% sobre primeros $11,925 = $1,192.50",
                "12% sobre $11,926–$48,475 = $4,386.00",
                "22% sobre $48,476–$60,000 = $2,535.50"
              ],
              "result": "Impuesto Federal: $8,114 | Tasa Efectiva: 10.8% | Tasa Marginal: 22%"
            },
            {
              "title": "$150,000 Casado Conjunto, 2 Hijos, 401(k) $20K",
              "steps": [
                "Ingreso Bruto: $150,000 - $20,000 (401k) = $130,000 IGR",
                "Deducción Estándar: -$30,000",
                "Ingreso Gravable: $100,000",
                "10% sobre primeros $23,850 = $2,385",
                "12% sobre $23,851–$96,950 = $8,772",
                "22% sobre $96,951–$100,000 = $671.50"
              ],
              "result": "Impuesto antes de créditos: $11,829 - $4,000 (2 hijos) = $7,829 | Efectiva: 5.2%"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es la diferencia entre tasa marginal y efectiva de impuesto?",
          "answer": "Su tasa marginal de impuesto es la tasa aplicada a su último dólar de ingreso gravable — el tramo más alto que alcanza. Su tasa efectiva de impuesto es el impuesto total dividido por el ingreso total, representando su tasa promedio real. Por ejemplo, un declarante soltero que gana $75,000 tiene una tasa marginal del 22% pero solo paga aproximadamente 10.8% de tasa efectiva porque las primeras porciones del ingreso se gravan al 10% y 12%. La tasa efectiva es más útil para presupuestar y comparar cargas fiscales."
        },
        {
          "question": "¿Debo tomar la deducción estándar o detallar?",
          "answer": "Tome la que le dé una deducción mayor. Para 2025, la deducción estándar es $15,000 (soltero) o $30,000 (casado declarando conjuntamente). Solo debe detallar si sus gastos deducibles totales exceden estas cantidades. Las deducciones detalladas comunes incluyen intereses hipotecarios, impuestos estatales y locales (SALT, limitado a $10,000), contribuciones benéficas y gastos médicos que excedan el 7.5% del IGR. La mayoría de los contribuyentes (alrededor del 90%) se benefician más de la deducción estándar desde que la reforma fiscal de 2017 casi la duplicó."
        },
        {
          "question": "¿Cómo funciona el Crédito Fiscal por Hijos en 2025?",
          "answer": "Para 2025, el Crédito Fiscal por Hijos es $2,000 por hijo calificado menor de 17 años. De esto, hasta $1,700 es reembolsable (significa que puede recibirlo incluso si no debe impuestos). El crédito se reduce para ingresos más altos: comienza a reducirse a $200,000 de IGR para declarantes solteros y $400,000 para casados declarando conjuntamente, disminuyendo $50 por cada $1,000 de ingreso sobre el límite. Los niños deben tener un número de Seguro Social válido y ser reclamados como dependientes en su declaración."
        },
        {
          "question": "¿Cómo se calcula el impuesto por trabajo independiente?",
          "answer": "Las personas que trabajan por cuenta propia pagan tanto la porción del empleado como del empleador de FICA: 12.4% para Seguridad Social (hasta $176,100 en 2025) más 2.9% para Medicare, totalizando 15.3%. Sin embargo, primero multiplica el ingreso neto por trabajo independiente por 92.35% (para considerar la porción equivalente al empleador), y puede deducir la mitad del impuesto SE como ajuste al ingreso en su impuesto sobre la renta. Así en $100,000 de ingreso SE: base SE = $92,350, impuesto SE = $14,130, y deduce $7,065 del cálculo de su impuesto sobre la renta."
        },
        {
          "question": "¿Qué son los ajustes al ingreso?",
          "answer": "Los ajustes al ingreso (oficialmente 'ajustes al ingreso') reducen su Ingreso Bruto Ajustado (IGR) independientemente de si detalla. Los principales ajustes al ingreso para 2025 incluyen: contribuciones 401(k) tradicional (límite $23,500), contribuciones IRA tradicional (límite $7,000), contribuciones HSA ($4,300 individual/$8,550 familiar), interés de préstamos estudiantiles (hasta $2,500), mitad del impuesto por trabajo independiente y gastos de educadores ($300). Un IGR más bajo también puede calificarlo para otros créditos y deducciones que tienen límites de ingreso."
        },
        {
          "question": "¿Cuándo necesito pagar impuestos estimados?",
          "answer": "Generalmente necesita pagar impuestos estimados trimestralmente si espera deber $1,000 o más en impuestos después de restar retenciones y créditos. Esto comúnmente aplica a personas que trabajan por cuenta propia, freelancers, inversionistas con ganancias de capital significativas y jubilados. Las fechas de vencimiento trimestrales son 15 de abril, 15 de junio, 15 de septiembre y 15 de enero del año siguiente. Se aplican penalidades por pago insuficiente, aunque puede evitarlas pagando al menos el 100% del impuesto del año pasado (110% si el IGR excedió $150,000)."
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
      "name": "Calculadora de Imposto de Renda",
      "slug": "calculadora-imposto-renda",
      "breadcrumb": "Calculadora de Imposto de Renda",
      "seo": {
        "title": "Calculadora de Imposto de Renda - Estimador Fiscal Federal 2025",
        "description": "Estime seu imposto de renda federal 2025 com tabelas atualizadas, dedução padrão, créditos fiscais infantis e FICA. Suporta todos os tipos de declaração. Calculadora gratuita.",
        "shortDescription": "Estime seu imposto de renda federal 2025 e taxa efetiva.",
        "keywords": [
          "calculadora imposto de renda",
          "calculadora imposto federal",
          "calculadora imposto 2025",
          "calculadora faixa imposto",
          "estimador restituição",
          "calculadora imposto gratuita",
          "quanto imposto devo",
          "calculadora taxa efetiva"
        ]
      },
      "subtitle": "Estime seu imposto de renda federal 2025, veja sua faixa tributária e calcule sua taxa efetiva com deduções e créditos.",
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "filingStatus": {
          "label": "Status de Declaração",
          "helpText": "Seu status de declaração de imposto de renda federal para 2025",
          "options": {
            "single": "Solteiro",
            "marriedJoint": "Casado Declaração Conjunta",
            "marriedSeparate": "Casado Declaração Separada",
            "headOfHousehold": "Chefe de Família"
          }
        },
        "grossIncome": {
          "label": "Renda Bruta (W-2)",
          "helpText": "Total de salários, vencimentos e gorjetas de todos os empregos W-2"
        },
        "otherIncome": {
          "label": "Outras Rendas",
          "helpText": "Juros, dividendos, ganhos de capital, renda de aluguel, etc."
        },
        "deductionType": {
          "label": "Tipo de Dedução",
          "helpText": "Dedução padrão ou especificar suas deduções",
          "options": {
            "standard": "Dedução Padrão",
            "itemized": "Deduções Especificadas"
          }
        },
        "itemizedDeductions": {
          "label": "Deduções Especificadas",
          "helpText": "Total de juros hipotecários, impostos estaduais/locais (SALT até $10K), contribuições beneficentes, despesas médicas acima de 7.5% AGI"
        },
        "retirement401k": {
          "label": "Contribuição 401(k)",
          "helpText": "Contribuições anuais pré-imposto 401(k) (limite 2025: $23,500, $31,000 se 50+)"
        },
        "iraContribution": {
          "label": "IRA Tradicional",
          "helpText": "Contribuições dedutíveis IRA (limite 2025: $7,000, $8,000 se 50+)"
        },
        "hsaContribution": {
          "label": "Contribuição HSA",
          "helpText": "Conta Poupança Saúde (limite 2025: $4,300 individual, $8,550 família)"
        },
        "studentLoanInterest": {
          "label": "Juros Empréstimo Estudantil",
          "helpText": "Juros dedutíveis de empréstimo estudantil pagos (máx $2,500/ano)"
        },
        "childrenUnder17": {
          "label": "Crianças Menores de 17",
          "helpText": "Número de filhos qualificados menores de 17 para Crédito Fiscal Infantil ($2,000 cada)"
        },
        "childrenOther": {
          "label": "Outros Dependentes",
          "helpText": "Outros dependentes para Crédito para Outros Dependentes ($500 cada)"
        },
        "includeState": {
          "label": "Incluir Estimativa Imposto Estadual",
          "helpText": "Adicionar cálculo estimado de imposto de renda estadual"
        },
        "stateRate": {
          "label": "Taxa Imposto Estadual",
          "helpText": "Sua taxa efetiva de imposto de renda estadual"
        },
        "selfEmployed": {
          "label": "Renda Autônoma",
          "helpText": "Incluir renda de trabalho autônomo e cálculo de imposto SE"
        },
        "selfEmploymentIncome": {
          "label": "Renda de Trabalho Autônomo",
          "helpText": "Ganhos líquidos de trabalho autônomo (renda 1099 menos despesas comerciais)"
        }
      },
      "results": {
        "totalTax": {
          "label": "Imposto Federal Total"
        },
        "effectiveRate": {
          "label": "Taxa de Imposto Efetiva"
        },
        "marginalRate": {
          "label": "Taxa de Imposto Marginal"
        },
        "taxableIncome": {
          "label": "Renda Tributável"
        },
        "federalIncomeTax": {
          "label": "Imposto de Renda Federal"
        },
        "socialSecurity": {
          "label": "Imposto Previdência Social"
        },
        "medicare": {
          "label": "Imposto Medicare"
        },
        "ficaTotal": {
          "label": "FICA Total"
        },
        "stateTax": {
          "label": "Estimativa Imposto Estadual"
        },
        "childTaxCredit": {
          "label": "Crédito Fiscal Infantil"
        },
        "selfEmploymentTax": {
          "label": "Imposto Trabalho Autônomo"
        },
        "afterTaxIncome": {
          "label": "Renda Após Impostos"
        }
      },
      "presets": {
        "singleBasic": {
          "label": "Solteiro Básico",
          "description": "Salário $55K, solteiro, dedução padrão"
        },
        "singleWithRetirement": {
          "label": "Solteiro + Aposentadoria",
          "description": "Salário $85K, 401(k) + IRA + HSA"
        },
        "marriedFamily": {
          "label": "Família Casada",
          "description": "$130K, casados, 2 filhos, 401(k) + HSA"
        },
        "highEarner": {
          "label": "Alta Renda",
          "description": "$250K, casados, 3 filhos, deduções especificadas"
        },
        "selfEmployedFreelancer": {
          "label": "Freelancer (Autônomo)",
          "description": "$95K trabalho autônomo, solteiro"
        }
      },
      "values": {
        "perBracket": "por faixa",
        "on": "sobre",
        "of": "de",
        "taxBracket": "faixa tributária"
      },
      "formats": {
        "summary": "Seu imposto federal estimado para 2025 é {totalTax} sobre {taxableIncome} de renda tributável, para uma taxa efetiva de {effectiveRate}."
      },
      "infoCards": {
        "metrics": {
          "title": "Insights Tributários",
          "items": [
            {
              "label": "Carga Tributária Mensal",
              "valueKey": "monthlyTax"
            },
            {
              "label": "Imposto por Hora Trabalhada",
              "valueKey": "taxPerHour"
            },
            {
              "label": "Percentual que Você Mantém",
              "valueKey": "percentKept"
            },
            {
              "label": "Dia da Liberdade Fiscal",
              "valueKey": "taxFreedomDay"
            }
          ]
        },
        "details": {
          "title": "Impacto das Deduções",
          "items": [
            {
              "label": "Total Acima da Linha",
              "valueKey": "totalAboveLine"
            },
            {
              "label": "Dedução Utilizada",
              "valueKey": "deductionUsed"
            },
            {
              "label": "Economia Fiscal da Dedução",
              "valueKey": "deductionSavings"
            },
            {
              "label": "Créditos Aplicados",
              "valueKey": "totalCredits"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Redução de Impostos",
          "items": [
            "Maximize seu 401(k) para reduzir renda tributável em até $23,500 ($31,000 se 50+) em 2025",
            "Contribuições HSA são triplamente vantajosas: dedutíveis, crescem livres de impostos e saques livres para fins médicos",
            "Agrupar doações beneficentes em anos alternados pode ajudar a especificar em anos de altas doações",
            "Ganhos de capital de longo prazo são tributados em alíquotas menores (0%, 15% ou 20%) que renda ordinária"
          ]
        }
      },
      "chart": {
        "title": "Detalhamento por Faixa Tributária",
        "xLabel": "Faixa",
        "yLabel": "Valor do Imposto",
        "series": {
          "taxAmount": "Imposto na Faixa"
        }
      },
      "detailedTable": {
        "bracketTable": {
          "button": "Ver Detalhamento Faixas Tributárias",
          "title": "Detalhamento Faixas Tributárias Federais 2025",
          "columns": {
            "bracket": "Faixa Tributária",
            "range": "Faixa de Renda",
            "taxableInBracket": "Tributável na Faixa",
            "taxInBracket": "Imposto na Faixa",
            "cumulativeTax": "Imposto Cumulativo"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é Imposto de Renda?",
          "content": "O imposto de renda federal é um imposto progressivo sobre seus ganhos coletado pela Receita Federal (IRS). Progressivo significa que a alíquota aumenta conforme sua renda sobe, com a renda dividida em faixas tributadas a diferentes alíquotas variando de 10% a 37% para 2025. Apenas a renda dentro de cada faixa é tributada nessa alíquota — não toda sua renda. Sua conta total também inclui impostos FICA (Previdência Social a 6,2% e Medicare a 1,45%), além de qualquer imposto de trabalho autônomo se aplicável. Créditos como o Crédito Fiscal Infantil reduzem diretamente sua conta de impostos, enquanto deduções reduzem a renda que é tributada. Entender a diferença entre sua alíquota marginal (faixa mais alta) e alíquota efetiva (percentual real pago) é crucial para planejamento financeiro."
        },
        "howItWorks": {
          "title": "Como é Calculado o Imposto de Renda Federal",
          "content": "O cálculo do imposto de renda federal segue uma ordem específica: comece com a renda bruta (salários, vencimentos, gorjetas, juros, dividendos, ganhos de capital e outros ganhos), depois subtraia deduções acima da linha (401k, IRA, HSA, juros de empréstimo estudantil) para obter a Renda Bruta Ajustada (AGI). Em seguida, subtraia a dedução padrão ou deduções especificadas para chegar à renda tributável. Aplique as faixas tributárias progressivas para seu status de declaração para calcular o imposto base. Subtraia créditos fiscais (Crédito Fiscal Infantil, créditos educacionais) para obter sua responsabilidade fiscal final. Se seu total de retenções e pagamentos estimados excederem esse valor, você recebe restituição. Se ficarem aquém, você deve a diferença. Impostos FICA são calculados separadamente como um percentual fixo dos salários brutos."
        },
        "considerations": {
          "title": "Considerações Fiscais Principais para 2025",
          "items": [
            {
              "text": "Dedução padrão para 2025: $15,000 (solteiro), $30,000 (casados conjunta), $22,500 (chefe família)",
              "type": "info"
            },
            {
              "text": "Crédito Fiscal Infantil: $2,000 por filho qualificado menor de 17, com $1,700 reembolsável por filho",
              "type": "info"
            },
            {
              "text": "Limite 401(k): $23,500 ($31,000 se 50+), limite IRA: $7,000 ($8,000 se 50+), HSA: $4,300/$8,550",
              "type": "info"
            },
            {
              "text": "Teto dedução SALT permanece em $10,000 para impostos estaduais e locais ao especificar",
              "type": "warning"
            },
            {
              "text": "Teto salarial Previdência Social para 2025 é $176,100 — renda acima não está sujeita ao imposto PS de 6,2%",
              "type": "info"
            },
            {
              "text": "Imposto sobre Renda Líquida de Investimento (NIIT) de 3,8% aplica-se à renda de investimento acima de $200K (solteiro)/$250K (casados)",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Faixas Tributárias Federais 2025",
          "items": [
            {
              "text": "Faixa 10%: $0 a $11,925 (solteiro) / $0 a $23,850 (casados conjunta) — menor alíquota sobre primeiros dólares",
              "type": "info"
            },
            {
              "text": "Faixa 12%: $11,926 a $48,475 (solteiro) / $23,851 a $96,950 (casados) — faixa mais comum para assalariados médios",
              "type": "info"
            },
            {
              "text": "Faixa 22%: $48,476 a $103,350 (solteiro) / $96,951 a $206,700 (casados) — onde muitos profissionais se enquadram",
              "type": "info"
            },
            {
              "text": "Faixa 24%: $103,351 a $197,300 (solteiro) / $206,701 a $394,600 (casados) — faixa de renda média-alta",
              "type": "info"
            },
            {
              "text": "Faixa 32%: $197,301 a $250,525 (solteiro) / $394,601 a $501,050 (casados) — território de alta renda",
              "type": "info"
            },
            {
              "text": "Faixas 35-37%: Acima de $250,525 (solteiro) / $501,050 (casados) — alíquotas marginais máximas para maiores rendas",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de Impostos",
          "description": "Cálculos tributários passo a passo para cenários comuns",
          "examples": [
            {
              "title": "Salário $75,000, Solteiro, Dedução Padrão",
              "steps": [
                "Renda Bruta: $75,000",
                "Dedução Padrão: -$15,000",
                "Renda Tributável: $60,000",
                "10% sobre primeiros $11,925 = $1,192.50",
                "12% sobre $11,926–$48,475 = $4,386.00",
                "22% sobre $48,476–$60,000 = $2,535.50"
              ],
              "result": "Imposto Federal: $8,114 | Taxa Efetiva: 10,8% | Taxa Marginal: 22%"
            },
            {
              "title": "$150,000 Casados Conjunta, 2 Filhos, 401(k) $20K",
              "steps": [
                "Renda Bruta: $150,000 - $20,000 (401k) = $130,000 AGI",
                "Dedução Padrão: -$30,000",
                "Renda Tributável: $100,000",
                "10% sobre primeiros $23,850 = $2,385",
                "12% sobre $23,851–$96,950 = $8,772",
                "22% sobre $96,951–$100,000 = $671.50"
              ],
              "result": "Imposto antes créditos: $11,829 - $4,000 (2 filhos) = $7,829 | Efetiva: 5,2%"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual a diferença entre taxa marginal e taxa efetiva de imposto?",
          "answer": "Sua taxa marginal de imposto é a alíquota aplicada ao seu último real de renda tributável — a faixa mais alta que você atinge. Sua taxa efetiva de imposto é o imposto total dividido pela renda total, representando sua alíquota média real. Por exemplo, um declarante solteiro ganhando $75,000 tem uma taxa marginal de 22% mas paga apenas cerca de 10,8% de taxa efetiva porque as primeiras parcelas da renda são tributadas a 10% e 12%. A taxa efetiva é mais útil para orçamento e comparação de cargas tributárias."
        },
        {
          "question": "Devo usar a dedução padrão ou especificar?",
          "answer": "Use qualquer uma que lhe dê a maior dedução. Para 2025, a dedução padrão é $15,000 (solteiro) ou $30,000 (casados declaração conjunta). Você deve especificar apenas se suas despesas dedutíveis totais excederem esses valores. Deduções especificadas comuns incluem juros hipotecários, impostos estaduais e locais (SALT, limitado a $10,000), contribuições beneficentes e despesas médicas que excedam 7,5% do AGI. A maioria dos contribuintes (cerca de 90%) se beneficia mais da dedução padrão desde que a reforma tributária de 2017 quase a dobrou."
        },
        {
          "question": "Como funciona o Crédito Fiscal Infantil em 2025?",
          "answer": "Para 2025, o Crédito Fiscal Infantil é $2,000 por filho qualificado menor de 17 anos. Deste valor, até $1,700 é reembolsável (significa que você pode recebê-lo mesmo se não deve impostos). O crédito é reduzido para rendas mais altas: começa a diminuir em $200,000 AGI para declarantes solteiros e $400,000 para casados declaração conjunta, diminuindo $50 para cada $1,000 de renda acima do limite. Filhos devem ter número válido de Previdência Social e serem declarados como dependentes em sua declaração."
        },
        {
          "question": "Como é calculado o imposto de trabalho autônomo?",
          "answer": "Indivíduos autônomos pagam tanto a parte do empregado quanto do empregador do FICA: 12,4% para Previdência Social (até $176,100 em 2025) mais 2,9% para Medicare, totalizando 15,3%. Porém, você primeiro multiplica a renda líquida de trabalho autônomo por 92,35% (para contabilizar a parte equivalente ao empregador), e pode deduzir metade do imposto SE como dedução acima da linha em seu imposto de renda. Então sobre $100,000 de renda SE: base SE = $92,350, imposto SE = $14,130, e você deduz $7,065 do seu cálculo de imposto de renda."
        },
        {
          "question": "O que são deduções acima da linha?",
          "answer": "Deduções acima da linha (oficialmente 'ajustes à renda') reduzem sua Renda Bruta Ajustada (AGI) independentemente de você especificar ou não. Principais deduções acima da linha para 2025 incluem: contribuições 401(k) tradicionais (limite $23,500), contribuições IRA tradicionais (limite $7,000), contribuições HSA ($4,300 individual/$8,550 família), juros de empréstimo estudantil (até $2,500), metade do imposto de trabalho autônomo, e despesas de educadores ($300). AGI menor também pode qualificá-lo para outros créditos e deduções que têm limites de renda."
        },
        {
          "question": "Quando preciso pagar impostos estimados?",
          "answer": "Você geralmente precisa pagar impostos estimados trimestralmente se espera dever $1,000 ou mais em impostos após subtrair retenções e créditos. Isso comumente se aplica a indivíduos autônomos, freelancers, investidores com ganhos de capital significativos e aposentados. Datas de vencimento trimestrais são 15 de abril, 15 de junho, 15 de setembro e 15 de janeiro do ano seguinte. Penalidades se aplicam por pagamento insuficiente, embora você possa evitá-las pagando pelo menos 100% do imposto do ano anterior (110% se AGI excedeu $150,000)."
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
      "name": "Calculateur d'Impôt sur le Revenu",
      "slug": "calculateur-impot-revenu",
      "breadcrumb": "Calculateur d'Impôt sur le Revenu",
      "seo": {
        "title": "Calculateur d'Impôt sur le Revenu - Estimateur Fiscal Fédéral 2025",
        "description": "Estimez votre impôt fédéral sur le revenu 2025 avec les tranches mises à jour, déduction standard, crédits d'impôt enfant et FICA. Tous statuts de déclaration. Calculateur gratuit.",
        "shortDescription": "Estimez votre impôt fédéral sur le revenu 2025 et taux effectif.",
        "keywords": [
          "calculateur impôt revenu",
          "calculateur impôt fédéral",
          "calculateur impôt 2025",
          "calculateur tranche fiscale",
          "estimateur remboursement impôt",
          "calculateur impôt gratuit",
          "combien d'impôt dois-je",
          "calculateur taux effectif impôt"
        ]
      },
      "subtitle": "Estimez votre impôt fédéral sur le revenu 2025, voyez votre tranche fiscale et calculez votre taux effectif avec déductions et crédits.",
      "inputs": {
        "filingStatus": {
          "label": "Statut de Déclaration",
          "helpText": "Votre statut de déclaration d'impôt fédéral pour 2025",
          "options": {
            "single": "Célibataire",
            "marriedJoint": "Marié Déclaration Conjointe",
            "marriedSeparate": "Marié Déclaration Séparée",
            "headOfHousehold": "Chef de Famille"
          }
        },
        "grossIncome": {
          "label": "Revenu Brut (W-2)",
          "helpText": "Total des salaires, traitements et pourboires de tous les emplois W-2"
        },
        "otherIncome": {
          "label": "Autres Revenus",
          "helpText": "Intérêts, dividendes, gains en capital, revenus locatifs, etc."
        },
        "deductionType": {
          "label": "Type de Déduction",
          "helpText": "Déduction standard ou détaillez vos déductions",
          "options": {
            "standard": "Déduction Standard",
            "itemized": "Déductions Détaillées"
          }
        },
        "itemizedDeductions": {
          "label": "Déductions Détaillées",
          "helpText": "Total des intérêts hypothécaires, taxes locales/étatiques (SALT jusqu'à 10K$), contributions caritatives, frais médicaux dépassant 7,5% du RBA"
        },
        "retirement401k": {
          "label": "Contribution 401(k)",
          "helpText": "Contributions annuelles 401(k) avant impôt (limite 2025 : 23 500$, 31 000$ si 50+)"
        },
        "iraContribution": {
          "label": "IRA Traditionnel",
          "helpText": "Contributions IRA déductibles (limite 2025 : 7 000$, 8 000$ si 50+)"
        },
        "hsaContribution": {
          "label": "Contribution HSA",
          "helpText": "Compte d'épargne santé (limite 2025 : 4 300$ individuel, 8 550$ famille)"
        },
        "studentLoanInterest": {
          "label": "Intérêts Prêt Étudiant",
          "helpText": "Intérêts de prêt étudiant déductibles payés (max 2 500$/an)"
        },
        "childrenUnder17": {
          "label": "Enfants de Moins de 17 ans",
          "helpText": "Nombre d'enfants qualifiés de moins de 17 ans pour le Crédit d'Impôt Enfant (2 000$ chacun)"
        },
        "childrenOther": {
          "label": "Autres Personnes à Charge",
          "helpText": "Autres personnes à charge pour le Crédit pour Autres Personnes à Charge (500$ chacune)"
        },
        "includeState": {
          "label": "Inclure Estimation Impôt d'État",
          "helpText": "Ajouter un calcul estimé de l'impôt sur le revenu d'État"
        },
        "stateRate": {
          "label": "Taux d'Impôt d'État",
          "helpText": "Votre taux effectif d'impôt sur le revenu d'État"
        },
        "selfEmployed": {
          "label": "Revenus de Travail Autonome",
          "helpText": "Inclure les revenus de travail autonome et le calcul de l'impôt TA"
        },
        "selfEmploymentIncome": {
          "label": "Revenus de Travail Autonome",
          "helpText": "Gains nets de travail autonome (revenus 1099 moins frais d'entreprise)"
        }
      },
      "results": {
        "totalTax": {
          "label": "Impôt Fédéral Total"
        },
        "effectiveRate": {
          "label": "Taux d'Imposition Effectif"
        },
        "marginalRate": {
          "label": "Taux d'Imposition Marginal"
        },
        "taxableIncome": {
          "label": "Revenu Imposable"
        },
        "federalIncomeTax": {
          "label": "Impôt Fédéral sur le Revenu"
        },
        "socialSecurity": {
          "label": "Impôt Sécurité Sociale"
        },
        "medicare": {
          "label": "Impôt Medicare"
        },
        "ficaTotal": {
          "label": "Total FICA"
        },
        "stateTax": {
          "label": "Estimation Impôt d'État"
        },
        "childTaxCredit": {
          "label": "Crédit d'Impôt Enfant"
        },
        "selfEmploymentTax": {
          "label": "Impôt Travail Autonome"
        },
        "afterTaxIncome": {
          "label": "Revenu Après Impôt"
        }
      },
      "presets": {
        "singleBasic": {
          "label": "Célibataire de Base",
          "description": "Salaire 55K$, célibataire, déduction standard"
        },
        "singleWithRetirement": {
          "label": "Célibataire + Retraite",
          "description": "Salaire 85K$, 401(k) + IRA + HSA"
        },
        "marriedFamily": {
          "label": "Famille Mariée",
          "description": "130K$, marié, 2 enfants, 401(k) + HSA"
        },
        "highEarner": {
          "label": "Haut Revenu",
          "description": "250K$, marié, 3 enfants, déductions détaillées"
        },
        "selfEmployedFreelancer": {
          "label": "Travailleur Autonome",
          "description": "95K$ travail autonome, célibataire"
        }
      },
      "values": {
        "perBracket": "par tranche",
        "on": "sur",
        "of": "de",
        "taxBracket": "tranche fiscale"
      },
      "formats": {
        "summary": "Votre impôt fédéral estimé 2025 est {totalTax} sur {taxableIncome} de revenu imposable, pour un taux effectif de {effectiveRate}."
      },
      "infoCards": {
        "metrics": {
          "title": "Aperçus Fiscaux",
          "items": [
            {
              "label": "Charge Fiscale Mensuelle",
              "valueKey": "monthlyTax"
            },
            {
              "label": "Impôt par Heure de Travail",
              "valueKey": "taxPerHour"
            },
            {
              "label": "Pourcentage Conservé",
              "valueKey": "percentKept"
            },
            {
              "label": "Jour de Libération Fiscale",
              "valueKey": "taxFreedomDay"
            }
          ]
        },
        "details": {
          "title": "Impact des Déductions",
          "items": [
            {
              "label": "Total Avant Ligne",
              "valueKey": "totalAboveLine"
            },
            {
              "label": "Déduction Utilisée",
              "valueKey": "deductionUsed"
            },
            {
              "label": "Économies Fiscales Déduction",
              "valueKey": "deductionSavings"
            },
            {
              "label": "Crédits Appliqués",
              "valueKey": "totalCredits"
            }
          ]
        },
        "tips": {
          "title": "Conseils Réduction Fiscale",
          "items": [
            "Maximisez votre 401(k) pour réduire le revenu imposable jusqu'à 23 500$ (31 000$ si 50+) en 2025",
            "Les contributions HSA sont triple avantage fiscal : déductibles, croissance libre d'impôt, et retrait libre d'impôt pour frais médicaux",
            "Regrouper les dons caritatifs en années alternées peut vous aider à détailler dans les années de dons élevés",
            "Les gains en capital à long terme sont imposés à des taux plus bas (0%, 15% ou 20%) que le revenu ordinaire"
          ]
        }
      },
      "chart": {
        "title": "Répartition des Tranches Fiscales",
        "xLabel": "Tranche",
        "yLabel": "Montant d'Impôt",
        "series": {
          "taxAmount": "Impôt dans la Tranche"
        }
      },
      "detailedTable": {
        "bracketTable": {
          "button": "Voir Répartition Tranches Fiscales",
          "title": "Répartition Tranches Fiscales Fédérales 2025",
          "columns": {
            "bracket": "Tranche Fiscale",
            "range": "Fourchette de Revenu",
            "taxableInBracket": "Imposable dans la Tranche",
            "taxInBracket": "Impôt dans la Tranche",
            "cumulativeTax": "Impôt Cumulatif"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que l'Impôt sur le Revenu ?",
          "content": "L'impôt fédéral sur le revenu est un impôt progressif sur vos gains perçu par l'Internal Revenue Service (IRS). Progressif signifie que le taux d'imposition augmente à mesure que votre revenu augmente, avec le revenu divisé en tranches imposées à différents taux allant de 10% à 37% pour 2025. Seul le revenu dans chaque tranche est imposé à ce taux — pas la totalité de votre revenu. Votre facture fiscale totale inclut aussi les impôts FICA (Sécurité Sociale à 6,2% et Medicare à 1,45%), plus tout impôt de travail autonome si applicable. Les crédits comme le Crédit d'Impôt Enfant réduisent directement votre facture fiscale, tandis que les déductions réduisent le revenu qui est imposé. Comprendre la différence entre votre taux marginal (tranche la plus élevée) et taux effectif (pourcentage réel payé) est crucial pour la planification financière."
        },
        "howItWorks": {
          "title": "Comment l'Impôt Fédéral sur le Revenu est Calculé",
          "content": "Le calcul de l'impôt fédéral sur le revenu suit un ordre spécifique : commencez par le revenu brut (salaires, traitements, pourboires, intérêts, dividendes, gains en capital et autres gains), puis soustrayez les déductions avant ligne (401k, IRA, HSA, intérêts prêt étudiant) pour obtenir le Revenu Brut Ajusté (RBA). Ensuite, soustrayez soit la déduction standard soit les déductions détaillées pour arriver au revenu imposable. Appliquez les tranches fiscales progressives pour votre statut de déclaration pour calculer l'impôt de base. Soustrayez les crédits d'impôt (Crédit d'Impôt Enfant, crédits éducation) pour obtenir votre responsabilité fiscale finale. Si votre total de retenues et paiements estimés dépasse ce montant, vous recevez un remboursement. S'ils sont insuffisants, vous devez la différence. Les impôts FICA sont calculés séparément comme un pourcentage fixe des salaires bruts."
        },
        "considerations": {
          "title": "Considérations Fiscales Clés pour 2025",
          "items": [
            {
              "text": "Déduction standard pour 2025 : 15 000$ (célibataire), 30 000$ (marié conjoint), 22 500$ (chef de famille)",
              "type": "info"
            },
            {
              "text": "Crédit d'Impôt Enfant : 2 000$ par enfant qualifié de moins de 17 ans, avec 1 700$ remboursable par enfant",
              "type": "info"
            },
            {
              "text": "Limite 401(k) : 23 500$ (31 000$ si 50+), limite IRA : 7 000$ (8 000$ si 50+), HSA : 4 300$/8 550$",
              "type": "info"
            },
            {
              "text": "Le plafond de déduction SALT reste à 10 000$ pour les taxes locales et d'État lors de la détaillon",
              "type": "warning"
            },
            {
              "text": "Le plafond salarial Sécurité Sociale pour 2025 est 176 100$ — les revenus au-dessus ne sont pas sujets à l'impôt SS de 6,2%",
              "type": "info"
            },
            {
              "text": "L'Impôt sur le Revenu Net d'Investissement (NIIT) de 3,8% s'applique aux revenus d'investissement au-dessus de 200K$ (célibataire)/250K$ (marié)",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Tranches Fiscales Fédérales 2025",
          "items": [
            {
              "text": "Tranche 10% : 0$ à 11 925$ (célibataire) / 0$ à 23 850$ (marié conjoint) — taux le plus bas sur les premiers dollars gagnés",
              "type": "info"
            },
            {
              "text": "Tranche 12% : 11 926$ à 48 475$ (célibataire) / 23 851$ à 96 950$ (marié) — tranche la plus commune pour les revenus moyens",
              "type": "info"
            },
            {
              "text": "Tranche 22% : 48 476$ à 103 350$ (célibataire) / 96 951$ à 206 700$ (marié) — où tombent beaucoup de professionnels",
              "type": "info"
            },
            {
              "text": "Tranche 24% : 103 351$ à 197 300$ (célibataire) / 206 701$ à 394 600$ (marié) — fourchette de revenus classe moyenne supérieure",
              "type": "info"
            },
            {
              "text": "Tranche 32% : 197 301$ à 250 525$ (célibataire) / 394 601$ à 501 050$ (marié) — territoire des hauts revenus",
              "type": "info"
            },
            {
              "text": "Tranches 35-37% : Au-dessus de 250 525$ (célibataire) / 501 050$ (marié) — taux marginaux supérieurs pour les plus hauts revenus",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul Fiscal",
          "description": "Calculs fiscaux étape par étape pour des scenarios communs",
          "examples": [
            {
              "title": "Salaire 75 000$, Célibataire, Déduction Standard",
              "steps": [
                "Revenu Brut : 75 000$",
                "Déduction Standard : -15 000$",
                "Revenu Imposable : 60 000$",
                "10% sur les premiers 11 925$ = 1 192,50$",
                "12% sur 11 926$–48 475$ = 4 386,00$",
                "22% sur 48 476$–60 000$ = 2 535,50$"
              ],
              "result": "Impôt Fédéral : 8 114$ | Taux Effectif : 10,8% | Taux Marginal : 22%"
            },
            {
              "title": "150 000$ Marié Conjoint, 2 Enfants, 401(k) 20K$",
              "steps": [
                "Revenu Brut : 150 000$ - 20 000$ (401k) = 130 000$ RBA",
                "Déduction Standard : -30 000$",
                "Revenu Imposable : 100 000$",
                "10% sur les premiers 23 850$ = 2 385$",
                "12% sur 23 851$–96 950$ = 8 772$",
                "22% sur 96 951$–100 000$ = 671,50$"
              ],
              "result": "Impôt avant crédits : 11 829$ - 4 000$ (2 enfants) = 7 829$ | Effectif : 5,2%"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la différence entre taux d'imposition marginal et effectif ?",
          "answer": "Votre taux d'imposition marginal est le taux appliqué au dernier dollar de votre revenu imposable — la tranche la plus élevée que vous atteignez. Votre taux d'imposition effectif est l'impôt total divisé par le revenu total, représentant votre taux moyen réel. Par exemple, un déclarant célibataire gagnant 75 000$ a un taux marginal de 22% mais ne paie qu'environ 10,8% de taux effectif car les premières portions du revenu sont imposées à 10% et 12%. Le taux effectif est plus utile pour budgéter et comparer les charges fiscales."
        },
        {
          "question": "Dois-je prendre la déduction standard ou détailler ?",
          "answer": "Prenez celle qui vous donne la plus grande déduction. Pour 2025, la déduction standard est de 15 000$ (célibataire) ou 30 000$ (marié déclaration conjointe). Vous devriez détailler seulement si vos dépenses déductibles totales dépassent ces montants. Les déductions détaillées communes incluent les intérêts hypothécaires, les taxes locales et d'État (SALT, plafonné à 10 000$), les contributions caritatives, et les frais médicaux dépassant 7,5% du RBA. La plupart des contribuables (environ 90%) bénéficient plus de la déduction standard depuis que la réforme fiscale de 2017 l'a presque doublée."
        },
        {
          "question": "Comment fonctionne le Crédit d'Impôt Enfant en 2025 ?",
          "answer": "Pour 2025, le Crédit d'Impôt Enfant est de 2 000$ par enfant qualifié de moins de 17 ans. De cela, jusqu'à 1 700$ est remboursable (signifiant que vous pouvez le recevoir même si vous ne devez pas d'impôt). Le crédit diminue pour les revenus plus élevés : il commence à réduire à 200 000$ RBA pour les déclarants célibataires et 400 000$ pour les mariés déclarant conjointement, diminuant de 50$ pour chaque 1 000$ de revenu au-dessus du seuil. Les enfants doivent avoir un numéro de Sécurité Sociale valide et être réclamés comme personnes à charge sur votre déclaration."
        },
        {
          "question": "Comment l'impôt de travail autonome est-il calculé ?",
          "answer": "Les travailleurs autonomes paient les portions employé et employeur de FICA : 12,4% pour la Sécurité Sociale (jusqu'à 176 100$ en 2025) plus 2,9% pour Medicare, totalisant 15,3%. Cependant, vous multipliez d'abord le revenu net de travail autonome par 92,35% (pour tenir compte de la portion équivalente employeur), et vous pouvez déduire la moitié de l'impôt TA comme déduction avant ligne sur votre impôt sur le revenu. Donc sur 100 000$ de revenu TA : base TA = 92 350$, impôt TA = 14 130$, et vous déduisez 7 065$ de votre calcul d'impôt sur le revenu."
        },
        {
          "question": "Que sont les déductions avant ligne ?",
          "answer": "Les déductions avant ligne (officiellement 'ajustements au revenu') réduisent votre Revenu Brut Ajusté (RBA) indépendamment de si vous détaillez. Les déductions avant ligne clés pour 2025 incluent : contributions 401(k) traditionnelles (limite 23 500$), contributions IRA traditionnelles (limite 7 000$), contributions HSA (4 300$ individuel/8 550$ famille), intérêts prêt étudiant (jusqu'à 2 500$), moitié de l'impôt de travail autonome, et dépenses éducateur (300$). Un RBA plus bas peut aussi vous qualifier pour d'autres crédits et déductions qui ont des éliminations progressives de revenu."
        },
        {
          "question": "Quand dois-je payer des impôts estimés ?",
          "answer": "Vous devez généralement payer des impôts estimés trimestriellement si vous vous attendez à devoir 1 000$ ou plus d'impôt après soustraction des retenues et crédits. Ceci s'applique communément aux travailleurs autonomes, freelancers, investisseurs avec des gains en capital significatifs, et retraités. Les dates d'échéance trimestrielles sont le 15 avril, 15 juin, 15 septembre, et 15 janvier de l'année suivante. Des pénalités s'appliquent pour sous-paiement, bien que vous puissiez les éviter en payant au moins 100% de l'impôt de l'année dernière (110% si le RBA dépassait 150 000$)."
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
      "name": "Einkommensteuer Rechner",
      "slug": "einkommensteuer-rechner",
      "breadcrumb": "Einkommensteuer Rechner",
      "seo": {
        "title": "Einkommensteuer Rechner - 2025 Bundessteuer Schätzer",
        "description": "Schätzen Sie Ihre 2025 Bundeseinkommensteuer mit aktualisierten Steuersätzen, Standardabzug, Kindergeld und Sozialversicherung. Unterstützt alle Anmeldestatus. Kostenloser Steuerrechner.",
        "shortDescription": "Schätzen Sie Ihre 2025 Bundeseinkommensteuer und effektiven Steuersatz.",
        "keywords": [
          "einkommensteuer rechner",
          "bundessteuer rechner",
          "steuerrechner 2025",
          "steuersatz rechner",
          "steuerrückerstattung schätzer",
          "kostenloser steuerrechner",
          "wie viel steuer schulde ich",
          "effektiver steuersatz rechner"
        ]
      },
      "subtitle": "Schätzen Sie Ihre 2025 Bundeseinkommensteuer, sehen Sie Ihren Steuersatz und berechnen Sie Ihren effektiven Satz mit Abzügen und Krediten.",
      "inputs": {
        "filingStatus": {
          "label": "Anmeldestatus",
          "helpText": "Ihr Bundeseinkommensteuer-Anmeldestatus für 2025",
          "options": {
            "single": "Ledig",
            "marriedJoint": "Verheiratet gemeinsam veranlagt",
            "marriedSeparate": "Verheiratet getrennt veranlagt",
            "headOfHousehold": "Haushaltsvorstand"
          }
        },
        "grossIncome": {
          "label": "Bruttoeinkommen (Lohnsteuerbescheinigung)",
          "helpText": "Gesamtlöhne, Gehälter und Trinkgelder aus allen Anstellungen"
        },
        "otherIncome": {
          "label": "Sonstige Einkünfte",
          "helpText": "Zinsen, Dividenden, Kapitalgewinne, Mieteinnahmen, usw."
        },
        "deductionType": {
          "label": "Abzugsart",
          "helpText": "Standardabzug oder Einzelabzüge auflisten",
          "options": {
            "standard": "Standardabzug",
            "itemized": "Einzelabzüge"
          }
        },
        "itemizedDeductions": {
          "label": "Einzelabzüge",
          "helpText": "Summe aus Hypothekenzinsen, staatliche/lokale Steuern (bis zu 10.000€), Spenden, Krankheitskosten über 7,5% des bereinigten Bruttoeinkommens"
        },
        "retirement401k": {
          "label": "Rentenbeitrag (401k)",
          "helpText": "Jährliche Vorsteuer-Rentenbeiträge (2025 Limit: 23.500€, 31.000€ ab 50)"
        },
        "iraContribution": {
          "label": "Traditionelle Rente",
          "helpText": "Abzugsfähige Rentenbeiträge (2025 Limit: 7.000€, 8.000€ ab 50)"
        },
        "hsaContribution": {
          "label": "Gesundheitssparkonto Beitrag",
          "helpText": "Gesundheitssparkonto (2025 Limit: 4.300€ einzeln, 8.550€ Familie)"
        },
        "studentLoanInterest": {
          "label": "Studienkreditzinsen",
          "helpText": "Abzugsfähige Studienkreditzinsen (max 2.500€/Jahr)"
        },
        "childrenUnder17": {
          "label": "Kinder unter 17",
          "helpText": "Anzahl qualifizierter Kinder unter 17 für Kindergeld (2.000€ pro Kind)"
        },
        "childrenOther": {
          "label": "Andere Angehörige",
          "helpText": "Andere Angehörige für Kredit für andere Angehörige (500€ pro Person)"
        },
        "includeState": {
          "label": "Landessteuer-Schätzung einbeziehen",
          "helpText": "Eine geschätzte Landeseinkommensteuer-Berechnung hinzufügen"
        },
        "stateRate": {
          "label": "Landessteuersatz",
          "helpText": "Ihr effektiver Landeseinkommensteuersatz"
        },
        "selfEmployed": {
          "label": "Selbstständigeneinkommen",
          "helpText": "Selbstständigeneinkommen und Selbstständigensteuer einbeziehen"
        },
        "selfEmploymentIncome": {
          "label": "Selbstständigeneinkommen",
          "helpText": "Netto-Selbstständigeneinkommen (1099 Einkommen minus Geschäftsausgaben)"
        }
      },
      "results": {
        "totalTax": {
          "label": "Gesamte Bundessteuer"
        },
        "effectiveRate": {
          "label": "Effektiver Steuersatz"
        },
        "marginalRate": {
          "label": "Grenzsteuersatz"
        },
        "taxableIncome": {
          "label": "Steuerpflichtiges Einkommen"
        },
        "federalIncomeTax": {
          "label": "Bundeseinkommensteuer"
        },
        "socialSecurity": {
          "label": "Sozialversicherungssteuer"
        },
        "medicare": {
          "label": "Krankenversicherungssteuer"
        },
        "ficaTotal": {
          "label": "Gesamte Sozialabgaben"
        },
        "stateTax": {
          "label": "Landessteuer-Schätzung"
        },
        "childTaxCredit": {
          "label": "Kindergeld"
        },
        "selfEmploymentTax": {
          "label": "Selbstständigensteuer"
        },
        "afterTaxIncome": {
          "label": "Nettoeinkommen"
        }
      },
      "presets": {
        "singleBasic": {
          "label": "Ledig Basis",
          "description": "55.000€ Gehalt, ledig, Standardabzug"
        },
        "singleWithRetirement": {
          "label": "Ledig + Rente",
          "description": "85.000€ Gehalt, 401k + Rente + Gesundheitssparkonto"
        },
        "marriedFamily": {
          "label": "Verheiratete Familie",
          "description": "130.000€, verheiratet, 2 Kinder, 401k + Gesundheitssparkonto"
        },
        "highEarner": {
          "label": "Gutverdiener",
          "description": "250.000€, verheiratet, 3 Kinder, Einzelabzüge"
        },
        "selfEmployedFreelancer": {
          "label": "Freiberufler (Selbstständig)",
          "description": "95.000€ Selbstständigeneinkommen, ledig"
        }
      },
      "values": {
        "perBracket": "pro Stufe",
        "on": "auf",
        "of": "von",
        "taxBracket": "Steuerstufe"
      },
      "formats": {
        "summary": "Ihre geschätzte 2025 Bundessteuer beträgt {totalTax} auf {taxableIncome} steuerpflichtiges Einkommen, für einen effektiven Satz von {effectiveRate}."
      },
      "infoCards": {
        "metrics": {
          "title": "Steuer-Einblicke",
          "items": [
            {
              "label": "Monatliche Steuerlast",
              "valueKey": "monthlyTax"
            },
            {
              "label": "Steuer pro Arbeitsstunde",
              "valueKey": "taxPerHour"
            },
            {
              "label": "Prozent den Sie behalten",
              "valueKey": "percentKept"
            },
            {
              "label": "Steuerfreiheitstag",
              "valueKey": "taxFreedomDay"
            }
          ]
        },
        "details": {
          "title": "Abzugs-Auswirkung",
          "items": [
            {
              "label": "Gesamte oberhalb der Linie",
              "valueKey": "totalAboveLine"
            },
            {
              "label": "Verwendeter Abzug",
              "valueKey": "deductionUsed"
            },
            {
              "label": "Abzugs-Steuerersparnis",
              "valueKey": "deductionSavings"
            },
            {
              "label": "Angewandte Kredite",
              "valueKey": "totalCredits"
            }
          ]
        },
        "tips": {
          "title": "Steuerreduzierungs-Tipps",
          "items": [
            "Maximieren Sie Ihren 401k um das steuerpflichtige Einkommen um bis zu 23.500€ (31.000€ ab 50) in 2025 zu reduzieren",
            "Gesundheitssparkonto-Beiträge sind dreifach steuerlich begünstigt: abzugsfähig, wachsen steuerfrei und steuerfreie Entnahme für medizinische Zwecke",
            "Spenden in abwechselnden Jahren zu bündeln kann helfen, in Jahren mit hohen Spenden einzeln aufzulisten",
            "Langfristige Kapitalgewinne werden niedriger besteuert (0%, 15% oder 20%) als gewöhnliches Einkommen"
          ]
        }
      },
      "chart": {
        "title": "Steuerstufen-Aufschlüsselung",
        "xLabel": "Stufe",
        "yLabel": "Steuerbetrag",
        "series": {
          "taxAmount": "Steuer in Stufe"
        }
      },
      "detailedTable": {
        "bracketTable": {
          "button": "Steuerstufen-Aufschlüsselung anzeigen",
          "title": "2025 Bundessteuerstufen-Aufschlüsselung",
          "columns": {
            "bracket": "Steuerstufe",
            "range": "Einkommensbereich",
            "taxableInBracket": "Steuerpflichtig in Stufe",
            "taxInBracket": "Steuer in Stufe",
            "cumulativeTax": "Kumulative Steuer"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist Einkommensteuer?",
          "content": "Die Bundeseinkommensteuer ist eine progressive Steuer auf Ihre Einkünfte, die vom Bundesfinanzamt erhoben wird. Progressiv bedeutet, dass der Steuersatz mit steigendem Einkommen zunimmt, wobei das Einkommen in Stufen unterteilt wird, die mit unterschiedlichen Sätzen von 10% bis 37% für 2025 besteuert werden. Nur das Einkommen innerhalb jeder Stufe wird mit diesem Satz besteuert — nicht Ihr gesamtes Einkommen. Ihre Gesamtsteuerrechnung umfasst auch Sozialabgaben (Sozialversicherung mit 6,2% und Krankenversicherung mit 1,45%) sowie ggf. Selbstständigensteuer. Kredite wie das Kindergeld reduzieren direkt Ihre Steuerrechnung, während Abzüge das zu versteuernde Einkommen reduzieren. Das Verständnis des Unterschieds zwischen Ihrem Grenzsteuersatz (höchste Stufe) und effektiven Satz (tatsächlich gezahlter Prozentsatz) ist entscheidend für die Finanzplanung."
        },
        "howItWorks": {
          "title": "Wie die Bundeseinkommensteuer berechnet wird",
          "content": "Die Bundeseinkommensteuer-Berechnung folgt einer bestimmten Reihenfolge: Beginnen Sie mit dem Bruttoeinkommen (Löhne, Gehälter, Trinkgelder, Zinsen, Dividenden, Kapitalgewinne und andere Einkünfte), ziehen Sie dann oberhalb-der-Linie-Abzüge ab (401k, Rente, Gesundheitssparkonto, Studienkreditzinsen) um das bereinigte Bruttoeinkommen zu erhalten. Als nächstes ziehen Sie entweder den Standardabzug oder Einzelabzüge ab, um das steuerpflichtige Einkommen zu erhalten. Wenden Sie die progressiven Steuerstufen für Ihren Anmeldestatus an, um die Grundsteuer zu berechnen. Ziehen Sie Steuerkredite (Kindergeld, Bildungskredite) ab, um Ihre endgültige Steuerschuld zu erhalten. Wenn Ihre Gesamteinbehaltung und geschätzten Zahlungen diesen Betrag übersteigen, erhalten Sie eine Rückerstattung. Fallen sie zu niedrig aus, schulden Sie die Differenz. Sozialabgaben werden separat als fester Prozentsatz des Bruttolohns berechnet."
        },
        "considerations": {
          "title": "Wichtige Steuerüberlegungen für 2025",
          "items": [
            {
              "text": "Standardabzug für 2025: 15.000€ (ledig), 30.000€ (verheiratet gemeinsam), 22.500€ (Haushaltsvorstand)",
              "type": "info"
            },
            {
              "text": "Kindergeld: 2.000€ pro qualifiziertem Kind unter 17, mit 1.700€ erstattungsfähig pro Kind",
              "type": "info"
            },
            {
              "text": "401k-Limit: 23.500€ (31.000€ ab 50), Renten-Limit: 7.000€ (8.000€ ab 50), Gesundheitssparkonto: 4.300€/8.550€",
              "type": "info"
            },
            {
              "text": "Staatliche und lokale Steuerabzugs-Obergrenze bleibt bei 10.000€ bei Einzelauflistung",
              "type": "warning"
            },
            {
              "text": "Sozialversicherungs-Lohnobergrenze für 2025 ist 176.100€ — Einkommen darüber unterliegt nicht der 6,2% Sozialversicherungssteuer",
              "type": "info"
            },
            {
              "text": "Netto-Kapitalertragssteuer von 3,8% gilt für Kapitalerträge über 200.000€ (ledig)/250.000€ (verheiratet)",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "2025 Bundessteuerstufen",
          "items": [
            {
              "text": "10% Stufe: 0€ bis 11.925€ (ledig) / 0€ bis 23.850€ (verheiratet gemeinsam) — niedrigster Satz auf erste verdiente Euro",
              "type": "info"
            },
            {
              "text": "12% Stufe: 11.926€ bis 48.475€ (ledig) / 23.851€ bis 96.950€ (verheiratet) — häufigste Stufe für Durchschnittsverdiener",
              "type": "info"
            },
            {
              "text": "22% Stufe: 48.476€ bis 103.350€ (ledig) / 96.951€ bis 206.700€ (verheiratet) — wo viele Fachkräfte fallen",
              "type": "info"
            },
            {
              "text": "24% Stufe: 103.351€ bis 197.300€ (ledig) / 206.701€ bis 394.600€ (verheiratet) — obere Mittelschicht",
              "type": "info"
            },
            {
              "text": "32% Stufe: 197.301€ bis 250.525€ (ledig) / 394.601€ bis 501.050€ (verheiratet) — Gutverdiener-Bereich",
              "type": "info"
            },
            {
              "text": "35-37% Stufen: Über 250.525€ (ledig) / 501.050€ (verheiratet) — Spitzen-Grenzsteuersätze für Höchstverdiener",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Steuerberechnungs-Beispiele",
          "description": "Schrittweise Steuerberechnungen für häufige Szenarien",
          "examples": [
            {
              "title": "75.000€ Gehalt, Ledig, Standardabzug",
              "steps": [
                "Bruttoeinkommen: 75.000€",
                "Standardabzug: -15.000€",
                "Steuerpflichtiges Einkommen: 60.000€",
                "10% auf erste 11.925€ = 1.192,50€",
                "12% auf 11.926€–48.475€ = 4.386,00€",
                "22% auf 48.476€–60.000€ = 2.535,50€"
              ],
              "result": "Bundessteuer: 8.114€ | Effektiver Satz: 10,8% | Grenzsteuersatz: 22%"
            },
            {
              "title": "150.000€ Verheiratet Gemeinsam, 2 Kinder, 401k 20.000€",
              "steps": [
                "Bruttoeinkommen: 150.000€ - 20.000€ (401k) = 130.000€ bereinigtes Bruttoeinkommen",
                "Standardabzug: -30.000€",
                "Steuerpflichtiges Einkommen: 100.000€",
                "10% auf erste 23.850€ = 2.385€",
                "12% auf 23.851€–96.950€ = 8.772€",
                "22% auf 96.951€–100.000€ = 671,50€"
              ],
              "result": "Steuer vor Krediten: 11.829€ - 4.000€ (2 Kinder) = 7.829€ | Effektiv: 5,2%"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist der Unterschied zwischen Grenz- und effektivem Steuersatz?",
          "answer": "Ihr Grenzsteuersatz ist der Satz, der auf Ihren letzten Euro des steuerpflichtigen Einkommens angewendet wird — die höchste Stufe, die Sie erreichen. Ihr effektiver Steuersatz ist die Gesamtsteuer geteilt durch das Gesamteinkommen und stellt Ihren tatsächlichen Durchschnittssatz dar. Zum Beispiel hat ein lediger Antragsteller mit 75.000€ Einkommen einen 22% Grenzsteuersatz, zahlt aber nur etwa 10,8% effektiven Satz, da die ersten Einkommensteile mit 10% und 12% besteuert werden. Der effektive Satz ist nützlicher für die Budgetierung und den Vergleich von Steuerlasten."
        },
        {
          "question": "Sollte ich den Standardabzug nehmen oder einzeln auflisten?",
          "answer": "Nehmen Sie den größeren Abzug. Für 2025 beträgt der Standardabzug 15.000€ (ledig) oder 30.000€ (verheiratet gemeinsam veranlagt). Sie sollten nur einzeln auflisten, wenn Ihre gesamten abzugsfähigen Ausgaben diese Beträge übersteigen. Häufige Einzelabzüge umfassen Hypothekenzinsen, staatliche und lokale Steuern (begrenzt auf 10.000€), Spenden und Krankheitskosten über 7,5% des bereinigten Bruttoeinkommens. Die meisten Steuerzahler (etwa 90%) profitieren mehr vom Standardabzug, da die Steuerreform 2017 ihn fast verdoppelt hat."
        },
        {
          "question": "Wie funktioniert das Kindergeld in 2025?",
          "answer": "Für 2025 beträgt das Kindergeld 2.000€ pro qualifiziertem Kind unter 17 Jahren. Davon sind bis zu 1.700€ erstattungsfähig (das bedeutet, Sie können es auch erhalten, wenn Sie keine Steuern schulden). Der Kredit wird bei höheren Einkommen reduziert: Er beginnt sich bei 200.000€ bereinigtem Bruttoeinkommen für ledige Antragsteller und 400.000€ für verheiratete gemeinsam Veranlagte zu reduzieren, um 50€ für jeden 1.000€ Einkommen über der Schwelle. Kinder müssen eine gültige Sozialversicherungsnummer haben und als Angehörige in Ihrer Steuererklärung aufgeführt werden."
        },
        {
          "question": "Wie wird die Selbstständigensteuer berechnet?",
          "answer": "Selbstständige zahlen sowohl den Arbeitnehmer- als auch den Arbeitgeberanteil der Sozialabgaben: 12,4% für Sozialversicherung (bis zu 176.100€ in 2025) plus 2,9% für Krankenversicherung, insgesamt 15,3%. Sie multiplizieren jedoch zuerst das Netto-Selbstständigeneinkommen mit 92,35% (um den arbeitgeberäquivalenten Teil zu berücksichtigen), und Sie können die Hälfte der Selbstständigensteuer als oberhalb-der-Linie-Abzug bei Ihrer Einkommensteuer abziehen. Also bei 100.000€ Selbstständigeneinkommen: Selbstständigenbasis = 92.350€, Selbstständigensteuer = 14.130€, und Sie ziehen 7.065€ von Ihrer Einkommensteuerberechnung ab."
        },
        {
          "question": "Was sind oberhalb-der-Linie-Abzüge?",
          "answer": "Oberhalb-der-Linie-Abzüge (offiziell 'Anpassungen des Einkommens') reduzieren Ihr bereinigtes Bruttoeinkommen unabhängig davon, ob Sie einzeln auflisten. Wichtige oberhalb-der-Linie-Abzüge für 2025 umfassen: traditionelle 401k-Beiträge (23.500€ Limit), traditionelle Rentenbeiträge (7.000€ Limit), Gesundheitssparkonto-Beiträge (4.300€ einzeln/8.550€ Familie), Studienkreditzinsen (bis zu 2.500€), die Hälfte der Selbstständigensteuer und Bildungsausgaben (300€). Ein niedrigeres bereinigtes Bruttoeinkommen kann Sie auch für andere Kredite und Abzüge qualifizieren, die Einkommensauslaufgrenzen haben."
        },
        {
          "question": "Wann muss ich geschätzte Steuern zahlen?",
          "answer": "Sie müssen im Allgemeinen vierteljährlich geschätzte Steuern zahlen, wenn Sie erwarten, 1.000€ oder mehr an Steuern nach Abzug von Einbehaltung und Krediten zu schulden. Dies gilt häufig für Selbstständige, Freiberufler, Investoren mit erheblichen Kapitalgewinnen und Rentner. Vierteljährliche Fälligkeitstermine sind 15. April, 15. Juni, 15. September und 15. Januar des Folgejahres. Strafen gelten für Unterzahlung, obwohl Sie diese vermeiden können, indem Sie mindestens 100% der letztjährigen Steuer zahlen (110% wenn das bereinigte Bruttoeinkommen 150.000€ überstieg)."
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
      id: "grossIncome",
      type: "number",
      defaultValue: null,
      placeholder: "75000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 100000000,
    },
    {
      id: "otherIncome",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 100000000,
    },
    {
      id: "deductionType",
      type: "radio",
      defaultValue: "standard",
      options: [{ value: "standard" }, { value: "itemized" }],
    },
    {
      id: "itemizedDeductions",
      type: "number",
      defaultValue: null,
      placeholder: "25000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 10000000,
      showWhen: { field: "deductionType", value: "itemized" },
    },
    {
      id: "retirement401k",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 70000,
    },
    {
      id: "iraContribution",
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
      id: "hsaContribution",
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
      id: "studentLoanInterest",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 2500,
    },
    {
      id: "childrenUnder17",
      type: "stepper",
      defaultValue: 0,
      min: 0,
      max: 10,
      step: 1,
    },
    {
      id: "childrenOther",
      type: "stepper",
      defaultValue: 0,
      min: 0,
      max: 10,
      step: 1,
    },
    {
      id: "selfEmployed",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "selfEmploymentIncome",
      type: "number",
      defaultValue: null,
      placeholder: "75000",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      min: 0,
      max: 100000000,
      showWhen: { field: "selfEmployed", value: true },
    },
    {
      id: "includeState",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "stateRate",
      type: "number",
      defaultValue: 5,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeState", value: true },
    },
  ],

  inputGroups: [],

  results: [
    { id: "totalTax", type: "primary", format: "number" },
    { id: "effectiveRate", type: "secondary", format: "percent" },
    { id: "marginalRate", type: "secondary", format: "percent" },
    { id: "taxableIncome", type: "secondary", format: "number" },
    { id: "federalIncomeTax", type: "secondary", format: "number" },
    { id: "ficaTotal", type: "secondary", format: "number" },
    { id: "selfEmploymentTax", type: "secondary", format: "number" },
    { id: "stateTax", type: "secondary", format: "number" },
    { id: "childTaxCredit", type: "secondary", format: "number" },
    { id: "afterTaxIncome", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "🏛️", itemCount: 4 },
    { id: "details", type: "list", icon: "📋", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "bracketBreakdown",
    type: "bar",
    xKey: "bracket",
    height: 320,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "taxAmount", type: "bar", color: "#3b82f6" },
    ],
  },

  detailedTable: {
    id: "bracketTable",
    buttonLabel: "View Tax Bracket Breakdown",
    buttonIcon: "📊",
    modalTitle: "2025 Federal Tax Bracket Breakdown",
    columns: [
      { id: "bracket", label: "Tax Bracket", align: "center" },
      { id: "range", label: "Income Range", align: "left" },
      { id: "taxableInBracket", label: "Taxable in Bracket", align: "right" },
      { id: "taxInBracket", label: "Tax in Bracket", align: "right", highlight: true },
      { id: "cumulativeTax", label: "Cumulative Tax", align: "right", highlight: true },
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
      title: "Revenue Procedure 2024-40 — 2025 Tax Year Inflation Adjustments",
      source: "IRS",
      url: "https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2025",
    },
    {
      authors: "Internal Revenue Service",
      year: "2025",
      title: "Publication 17 — Your Federal Income Tax (For Individuals)",
      source: "IRS",
      url: "https://www.irs.gov/publications/p17",
    },
  ],

  hero: { badge: "Finance", headline: "Income Tax Calculator" },
  sidebar: {},
  features: {},
  relatedCalculators: [
    "paycheck-calculator",
    "salary-calculator",
    "tax-bracket-calculator",
    "self-employment-tax-calculator",
  ],
  ads: {},
};

// ═══════════════════════════════════════════════════════════════════
// 🧮 CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════

const BRACKETS: Record<string, Array<{ min: number; max: number; rate: number }>> = {
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

const STD_DED: Record<string, number> = {
  single: 15000, marriedJoint: 30000, marriedSeparate: 15000, headOfHousehold: 22500,
};

const SS_RATE = 0.062;
const SS_CAP = 176100;
const MED_RATE = 0.0145;
const MED_ADD_RATE = 0.009;
const MED_ADD_SINGLE = 200000;
const MED_ADD_MARRIED = 250000;
const SE_RATE = 0.153;
const SE_FACTOR = 0.9235;
const CHILD_CREDIT = 2000;
const OTHER_DEP_CREDIT = 500;

export function calculateIncomeTaxCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const filingStatus = (values.filingStatus as string) || "single";
  const grossIncome = (values.grossIncome as number | null) ?? 0;
  const otherIncome = (values.otherIncome as number | null) ?? 0;
  const deductionType = (values.deductionType as string) || "standard";
  const itemizedDeductions = (values.itemizedDeductions as number | null) ?? 0;
  const retirement401k = (values.retirement401k as number | null) ?? 0;
  const iraContribution = (values.iraContribution as number | null) ?? 0;
  const hsaContribution = (values.hsaContribution as number | null) ?? 0;
  const studentLoanInterest = (values.studentLoanInterest as number | null) ?? 0;
  const childrenUnder17 = (values.childrenUnder17 as number | null) ?? 0;
  const childrenOther = (values.childrenOther as number | null) ?? 0;
  const selfEmployed = values.selfEmployed === true;
  const seIncome = selfEmployed ? ((values.selfEmploymentIncome as number | null) ?? 0) : 0;
  const includeState = values.includeState === true;
  const stateRate = includeState ? ((values.stateRate as number | null) ?? 5) : 0;

  const totalGross = grossIncome + otherIncome + seIncome;
  if (totalGross <= 0) return { values: {}, formatted: {}, summary: "", isValid: false };

  // ─── Self-Employment Tax ────────────────────────────────────
  const seBase = seIncome * SE_FACTOR;
  const seTax = selfEmployed ? Math.min(seBase, SS_CAP) * 0.124 + seBase * 0.029 : 0;
  const seDeduction = seTax / 2;

  // ─── Above-the-line deductions ──────────────────────────────
  const aboveLine = retirement401k + iraContribution + hsaContribution +
    Math.min(studentLoanInterest, 2500) + seDeduction;
  const agi = totalGross - aboveLine;

  // ─── Below-the-line deduction ───────────────────────────────
  const stdDed = STD_DED[filingStatus] || 15000;
  const deduction = deductionType === "itemized" ? Math.max(itemizedDeductions, 0) : stdDed;
  const taxableIncome = Math.max(0, agi - deduction);

  // ─── Federal income tax with bracket breakdown ──────────────
  const brackets = BRACKETS[filingStatus] || BRACKETS.single;
  let federalTax = 0;
  let marginalRate = 0;
  let cumulativeTax = 0;
  const bracketBreakdown: Array<{
    rate: number; min: number; max: number; taxable: number; tax: number; cumulative: number;
  }> = [];

  for (const b of brackets) {
    if (taxableIncome <= b.min) {
      bracketBreakdown.push({ rate: b.rate, min: b.min, max: b.max, taxable: 0, tax: 0, cumulative: cumulativeTax });
      continue;
    }
    const taxableInBracket = Math.min(taxableIncome, b.max) - b.min;
    const taxInBracket = taxableInBracket * b.rate;
    federalTax += taxInBracket;
    cumulativeTax += taxInBracket;
    if (taxableInBracket > 0) marginalRate = b.rate;
    bracketBreakdown.push({
      rate: b.rate, min: b.min, max: b.max, taxable: taxableInBracket,
      tax: taxInBracket, cumulative: cumulativeTax,
    });
  }

  // ─── Credits ────────────────────────────────────────────────
  const childCredit = childrenUnder17 * CHILD_CREDIT;
  const otherDepCredit = childrenOther * OTHER_DEP_CREDIT;
  const totalCredits = childCredit + otherDepCredit;
  federalTax = Math.max(0, federalTax - totalCredits);

  // ─── FICA (on W-2 wages only) ──────────────────────────────
  const ssWages = Math.min(grossIncome, SS_CAP);
  const ssTax = ssWages * SS_RATE;
  const medThreshold = filingStatus === "marriedJoint" ? MED_ADD_MARRIED : MED_ADD_SINGLE;
  let medTax = grossIncome * MED_RATE;
  if (grossIncome > medThreshold) medTax += (grossIncome - medThreshold) * MED_ADD_RATE;
  const ficaTotal = ssTax + medTax;

  // ─── State tax ──────────────────────────────────────────────
  const stateTaxAmount = includeState ? Math.max(0, agi * (stateRate / 100)) : 0;

  // ─── Totals ─────────────────────────────────────────────────
  const totalFederalTax = federalTax + ficaTotal + seTax;
  const totalAllTax = totalFederalTax + stateTaxAmount;
  const effectiveRate = totalGross > 0 ? (totalAllTax / totalGross) * 100 : 0;
  const afterTaxIncome = totalGross - totalAllTax;

  const currSym = sym(fieldUnits);

  // ─── Chart data (bracket breakdown) ─────────────────────────
  const chartData = bracketBreakdown
    .filter(b => b.taxable > 0)
    .map(b => ({
      bracket: `${(b.rate * 100).toFixed(0)}%`,
      taxAmount: Math.round(b.tax),
    }));

  // ─── Table data ─────────────────────────────────────────────
  const tableData = bracketBreakdown.map(b => ({
    bracket: `${(b.rate * 100).toFixed(0)}%`,
    range: `${fmtCurr(b.min, currSym)} – ${b.max === Infinity ? "∞" : fmtCurr(b.max, currSym)}`,
    taxableInBracket: b.taxable > 0 ? fmtCurr(b.taxable, currSym) : "—",
    taxInBracket: b.tax > 0 ? fmtCurr(b.tax, currSym) : "—",
    cumulativeTax: b.cumulative > 0 ? fmtCurr(b.cumulative, currSym) : "—",
  }));

  const summary = (f.summary || "Your estimated 2025 federal tax is {totalTax} on {taxableIncome} taxable income, for an effective rate of {effectiveRate}.")
    .replace("{totalTax}", fmtCurr(totalAllTax, currSym))
    .replace("{taxableIncome}", fmtCurr(taxableIncome, currSym))
    .replace("{effectiveRate}", `${effectiveRate.toFixed(1)}%`);

  // ─── NEW: InfoCard-only computed values ──────────────────────
  const monthlyTaxVal = totalAllTax / 12;
  const taxPerHourVal = totalAllTax / 2080;
  const percentKeptVal = totalGross > 0 ? (afterTaxIncome / totalGross) * 100 : 0;
  const taxDayNum = totalGross > 0 ? Math.round((totalAllTax / totalGross) * 365) : 0;
  const taxDate = new Date(2025, 0, 1);
  taxDate.setDate(taxDate.getDate() + taxDayNum);
  const tfm = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const taxFreedomLabel = `${tfm[taxDate.getMonth()]} ${taxDate.getDate()}`;
  const deductionSavingsVal = deduction * marginalRate;
  const deductionLabel = deductionType === "itemized" ? `Itemized: ${fmtCurr(itemizedDeductions, currSym)}` : `Standard: ${fmtCurr(stdDed, currSym)}`;

  return {
    values: {
      totalTax: Math.round(totalAllTax * 100) / 100,
      effectiveRate: Math.round(effectiveRate * 100) / 100,
      marginalRate: marginalRate * 100,
      taxableIncome: Math.round(taxableIncome),
      federalIncomeTax: Math.round(federalTax * 100) / 100,
      socialSecurity: Math.round(ssTax * 100) / 100,
      medicare: Math.round(medTax * 100) / 100,
      ficaTotal: Math.round(ficaTotal * 100) / 100,
      selfEmploymentTax: Math.round(seTax * 100) / 100,
      stateTax: Math.round(stateTaxAmount * 100) / 100,
      childTaxCredit: totalCredits,
      afterTaxIncome: Math.round(afterTaxIncome * 100) / 100,
      monthlyTax: Math.round(monthlyTaxVal * 100) / 100,
      taxPerHour: Math.round(taxPerHourVal * 100) / 100,
      percentKept: Math.round(percentKeptVal * 10) / 10,
    },
    formatted: {
      totalTax: fmtCurr(totalAllTax, currSym),
      effectiveRate: `${effectiveRate.toFixed(1)}%`,
      marginalRate: `${(marginalRate * 100).toFixed(0)}%`,
      taxableIncome: fmtCurr(taxableIncome, currSym),
      federalIncomeTax: fmtCurr(federalTax, currSym),
      socialSecurity: fmtCurr(ssTax, currSym),
      medicare: fmtCurr(medTax, currSym),
      ficaTotal: fmtCurr(ficaTotal, currSym),
      selfEmploymentTax: selfEmployed ? fmtCurr(seTax, currSym) : "—",
      stateTax: includeState ? fmtCurr(stateTaxAmount, currSym) : "—",
      childTaxCredit: totalCredits > 0 ? `-${fmtCurr(totalCredits, currSym)}` : "—",
      afterTaxIncome: fmtCurr(afterTaxIncome, currSym),
      monthlyTax: fmtCurr(monthlyTaxVal, currSym),
      taxPerHour: `${fmtCurr(taxPerHourVal, currSym)}/hr`,
      percentKept: `${percentKeptVal.toFixed(1)}%`,
      taxFreedomDay: taxFreedomLabel,
      totalAboveLine: aboveLine > 0 ? fmtCurr(aboveLine, currSym) : "—",
      deductionUsed: deductionLabel,
      deductionSavings: fmtCurr(deductionSavingsVal, currSym),
      totalCredits: totalCredits > 0 ? fmtCurr(totalCredits, currSym) : "—",
    },
    summary,
    isValid: true,
    metadata: { chartData, tableData },
  };
}

function sym(fieldUnits?: Record<string, string>): string {
  const curr = fieldUnits?.grossIncome || "USD";
  const S: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$", JPY: "¥", INR: "₹",
    CAD: "C$", AUD: "A$", CHF: "CHF ", COP: "COL$", ARS: "AR$", PEN: "S/",
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

export default incomeTaxCalculatorConfig;
