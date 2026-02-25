import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { getGeoDefaults } from "@/lib/geo-intelligence";

export const studentLoanConfig: CalculatorConfigV4 = {
  id: "student-loan",
  version: "4.0",
  category: "finance",
  icon: "🎓",

  presets: [
    {
      id: "undergraduate",
      icon: "📚",
      values: {
        loanBalance: 27000,
        interestRate: 5.5,
        loanTerm: 10,
        loanType: "unsubsidized",
        repaymentPlan: "standard",
        yearsInSchool: 4,
        gracePeriod: 6,
        extraMonthly: 0,
        extraYearly: 0,
        lumpSum: 0,
        lumpSumMonth: 12,
      },
    },
    {
      id: "graduate",
      icon: "🎓",
      values: {
        loanBalance: 65000,
        interestRate: 7.05,
        loanTerm: 10,
        loanType: "unsubsidized",
        repaymentPlan: "standard",
        yearsInSchool: 2,
        gracePeriod: 6,
        extraMonthly: 100,
        extraYearly: 0,
        lumpSum: 0,
        lumpSumMonth: 12,
      },
    },
    {
      id: "medSchool",
      icon: "🩺",
      values: {
        loanBalance: 200000,
        interestRate: 7.05,
        loanTerm: 20,
        loanType: "unsubsidized",
        repaymentPlan: "income",
        annualIncome: 60000,
        familySize: 1,
        yearsInSchool: 4,
        gracePeriod: 6,
        extraMonthly: 0,
        extraYearly: 0,
        lumpSum: 0,
        lumpSumMonth: 12,
      },
    },
    {
      id: "aggressivePayoff",
      icon: "🚀",
      values: {
        loanBalance: 40000,
        interestRate: 6.5,
        loanTerm: 5,
        loanType: "unsubsidized",
        repaymentPlan: "standard",
        yearsInSchool: 4,
        gracePeriod: 0,
        extraMonthly: 300,
        extraYearly: 1000,
        lumpSum: 2000,
        lumpSumMonth: 6,
      },
    },
    {
      id: "subsidizedFederal",
      icon: "🏛️",
      values: {
        loanBalance: 23000,
        interestRate: 5.5,
        loanTerm: 10,
        loanType: "subsidized",
        repaymentPlan: "standard",
        yearsInSchool: 4,
        gracePeriod: 6,
        extraMonthly: 50,
        extraYearly: 0,
        lumpSum: 0,
        lumpSumMonth: 12,
      },
    },
  ],

  t: {
    en: {
      name: "Student Loan Calculator",
      slug: "student-loan-calculator",
      subtitle:
        "Calculate monthly payments, total interest, and payoff date for any student loan — with subsidized vs unsubsidized, extra payments (monthly/yearly/lump sum), IBR, and automatic country rates.",
      breadcrumb: "Student Loan",
      seo: {
        title: "Student Loan Calculator - Payment, Interest & Payoff",
        description:
          "Calculate student loan monthly payments, total interest, and exact payoff date. Includes subsidized vs unsubsidized interest accrual, all repayment plans, extra payment impact, and IBR income-based calculator.",
        shortDescription:
          "Calculate student loan payments, interest, and payoff with every repayment option.",
        keywords: [
          "student loan calculator",
          "student loan payment calculator",
          "student loan payoff calculator",
          "income driven repayment calculator",
          "subsidized vs unsubsidized student loan",
          "how much interest will i pay on student loans",
          "student loan extra payment calculator",
        ],
      },
      inputs: {
        loanBalance: {
          label: "Current Loan Balance",
          helpText: "Total amount owed on your student loan",
        },
        interestRate: {
          label: "Interest Rate (APR)",
          helpText:
            "Annual interest rate. We pre-fill your country's typical rate — override with your actual rate from your servicer.",
        },
        loanTerm: {
          label: "Repayment Term",
          helpText: "Number of years to repay. Standard federal loans = 10 years.",
        },
        loanType: {
          label: "Loan Type",
          helpText:
            "Subsidized: government pays interest while in school and grace period. Unsubsidized/Private: interest accrues from day one.",
          options: {
            subsidized: "Subsidized (Gov pays interest while in school)",
            unsubsidized: "Unsubsidized (Interest accrues from day 1)",
            private: "Private Loan",
          },
        },
        repaymentPlan: {
          label: "Repayment Plan",
          helpText:
            "Standard: fixed 10yr. Extended: 25yr lower payments. Graduated: starts lower and increases. Income-Based: % of your salary.",
          options: {
            standard: "Standard (Fixed Payments)",
            extended: "Extended (25 Years)",
            graduated: "Graduated (Starts Lower)",
            income: "Income-Based (IBR)",
          },
        },
        annualIncome: {
          label: "Annual Gross Income",
          helpText: "Your adjusted gross income — used to calculate income-based repayment amount",
        },
        familySize: {
          label: "Family Size",
          helpText:
            "Number of people in your household — used to determine the federal poverty line for IBR",
        },
        yearsInSchool: {
          label: "Years Remaining in School",
          helpText:
            "How many more years before graduation. Unsubsidized/private loan interest accrues daily during this period.",
        },
        gracePeriod: {
          label: "Grace Period",
          helpText:
            "Months before first payment is due after graduation. Most federal loans: 6 months. Interest accrues on unsubsidized loans during this time.",
        },
        extraMonthly: {
          label: "Extra Monthly Payment",
          helpText:
            "Additional amount paid above minimum each month. Even $50–$100 extra saves substantial interest.",
        },
        extraYearly: {
          label: "Extra Annual Payment",
          helpText:
            "One extra payment per year — e.g. apply your tax refund to your loan. Applied at month 12 of each year.",
        },
        lumpSum: {
          label: "One-Time Lump Sum",
          helpText:
            "A single large extra payment (bonus, gift, inheritance). Specify which month you plan to make it.",
        },
        lumpSumMonth: {
          label: "Lump Sum in Month #",
          helpText: "Which month from now you will apply the one-time lump sum payment to your loan",
        },
        payInterestDuringSchool: {
          label: "Paying Interest While in School?",
          helpText: "If yes, interest won't capitalize at graduation — saves hundreds to thousands depending on balance. Only applies to unsubsidized/private loans.",
        },
        capitalizeGraceInterest: {
          label: "Capitalize Grace Period Interest?",
          helpText: "When ON (default): unpaid grace period interest is added to your principal before repayment starts. Turn OFF to see your savings if you pay it upfront.",
        },
      },
      results: {
        monthlyPayment: { label: "Monthly Payment" },
        totalInterest: { label: "Total Interest Paid" },
        totalPaid: { label: "Total Amount Paid" },
        payoffTime: { label: "Payoff Time" },
        interestDuringSchool: { label: "Interest While in School" },
        balanceAtRepayment: { label: "Balance at Start of Repayment" },
        interestSaved: { label: "Interest Saved vs No Extra Payments" },
        timeSaved: { label: "Time Saved" },
      },
      presets: {
        undergraduate: {
          label: "Undergraduate",
          description: "Average 4-year degree federal debt",
        },
        graduate: {
          label: "Graduate School",
          description: "Master's degree with $100/mo extra",
        },
        medSchool: {
          label: "Medical School",
          description: "High debt on income-based plan",
        },
        aggressivePayoff: {
          label: "Aggressive Payoff",
          description: "Extra monthly + annual + lump sum",
        },
        subsidizedFederal: {
          label: "Subsidized Federal",
          description: "Gov pays interest while enrolled",
        },
      },
      infoCards: {
        loanTypes: {
          title: "Subsidized vs Unsubsidized — The Key Difference",
          items: [
            "Subsidized: the US Dept of Education pays all interest while you're enrolled at least half-time, during the 6-month grace period, and approved deferments — your balance doesn't grow",
            "Unsubsidized: interest accrues from the day the loan is disbursed, even during school years, summer breaks, and the grace period — it capitalizes when repayment begins",
            "Real impact: a $10,000 unsubsidized loan at 5.5% accumulates ~$2,200 in interest over 4 years of school plus 6 months of grace — meaning you owe $12,200 before your first payment",
            "Subsidized loans are need-based via FAFSA, available to undergraduates only, with a lifetime limit of $23,000 total",
          ],
        },
        repaymentPlans: {
          title: "Which Repayment Plan Is Right for You?",
          items: [
            "Standard (10yr): fixed equal payments, least total interest paid — best if you can afford the monthly amount",
            "Extended (25yr): ~40% lower monthly payment but roughly 2.5x more interest over the life of the loan — only if Standard is genuinely unaffordable",
            "Graduated: starts ~30% below Standard, increases every 2 years — ideal for careers with predictable salary growth",
            "Income-Based (IBR): caps at 10% of discretionary income with forgiveness after 20–25 years — best for high debt relative to income, or public service workers targeting PSLF at 10 years",
          ],
        },
        extraPaymentTips: {
          title: "Extra Payment Strategies That Make a Real Difference",
          items: [
            "Monthly extra: $100/month extra on a $35k loan saves over $2,700 in interest and cuts 27 months off repayment",
            "Annual lump sum: applying a $1,000 tax refund each year saves $2,200+ in interest and nearly 2 years of payments",
            "One-time windfall: a single $5,000 lump sum in year 1 can eliminate 1–2 years of payments and thousands in interest",
            "Servicer tip: always confirm with your loan servicer that extra payments are applied to principal — not advanced to future due dates",
          ],
        },
      },
      chart: {
        title: "Loan Balance Over Time",
        xLabel: "Year",
        yLabel: "Amount ($)",
        series: {
          balance: "Remaining Balance",
          paid: "Cumulative Paid",
        },
      },
      detailedTable: {
        amortization: {
          button: "View Full Amortization",
          title: "Year-by-Year Amortization Schedule",
          columns: {
            year: "Year",
            payment: "Annual Payment",
            principal: "Principal Paid",
            interest: "Interest Paid",
            balance: "Ending Balance",
          },
        },
      },
      educationSections: {
        howInterestAccrues: {
          title: "How Student Loan Interest Actually Works",
          content:
            "Student loan interest accrues daily on your outstanding principal balance using simple daily interest. The formula: Balance × (Annual Rate / 365) = Daily Interest Charge. On a $30,000 unsubsidized loan at 5.5%, that is $4.52 accumulating every single day — including school years, winter breaks, and the 6-month grace period after graduation. When you make a monthly payment, accrued interest is paid first and any remainder reduces principal. This is why in the early years of repayment, the majority of each payment covers interest rather than reducing your balance. Understanding this mechanism is the foundation of every smart student loan strategy.",
        },
        ibrExplained: {
          title: "How Income-Based Repayment (IBR) Is Calculated",
          content:
            "IBR caps your monthly payment at 10% of your discretionary income. The federal government defines discretionary income as your Adjusted Gross Income minus 150% of the federal poverty guideline for your family size. For 2025, the poverty guideline for a single person is $15,060. If you earn $40,000: 150% of $15,060 equals $22,590, so your discretionary income is $17,410. Your IBR payment is 10% of that divided by 12 months — approximately $145 per month. Payments are recalculated annually when you recertify your income. Any remaining balance is forgiven after 20 years (post-July 2014 borrowers) or 25 years for earlier loans. Note: forgiven amounts may be treated as taxable income under current law, though legislation changes frequently.",
        },
        loanTypesDetail: {
          title: "Federal Loan Types — Complete Guide",
          items: [
            "Direct Subsidized Stafford: The best deal in student lending. Need-based, undergraduate only, max $23,000 cumulative. Government pays all interest while enrolled half-time, during grace period, and approved deferments. Current rate: 6.39% (2025-26).",
            "Direct Unsubsidized Stafford: Available to all students regardless of financial need. Undergraduates: up to $31,000 (dependent) or $57,500 (independent). Graduate students: up to $138,500. Interest starts accruing at disbursement. Same rate as subsidized for undergrads; 7.94% for graduate level.",
            "Direct PLUS Loans: For graduate/professional students and parents of dependent undergrads. No cap beyond cost of attendance minus other aid. Higher rate (9.08% for 2025-26) plus a 4.228% origination fee deducted upfront from disbursement. Require acceptable credit history — a cosigner ('endorser') may be needed.",
            "Direct Consolidation: Combines multiple federal loans into one at a weighted average rate. Extends term up to 30 years but can significantly increase total interest paid. Can unlock income-driven repayment for older FFEL loans but may reset Public Service Loan Forgiveness (PSLF) payment count — research carefully before consolidating.",
          ],
        },
        repaymentStrategies: {
          title: "Choosing the Right Repayment Plan",
          items: [
            "Standard Plan (10yr): Equal fixed monthly payments. Lowest total interest. Default plan if you do not actively choose otherwise. Best for borrowers with stable income who can afford the payment — most graduates benefit most from this.",
            "Extended Plan (25yr): Lowers monthly payment by approximately 40% but the total interest paid roughly doubles compared to Standard. A $40,000 loan at 6.5% costs an extra $21,000 over 25 years vs 10 years. Only appropriate if the Standard payment is genuinely unmanageable.",
            "Graduated Plan: Starts about 30% below Standard, increases every 2 years. Total cost falls between Standard and Extended. Good fit for careers with predictable salary growth — entry-level workers who expect to earn significantly more within 5 years.",
            "Income-Driven Plans (IBR, PAYE, SAVE, ICR): Essential tools for high debt-to-income situations, public service employees targeting PSLF after 10 years, and anyone needing flexibility. Monthly payment can be as low as $0 if income is near the poverty line. Recertify income annually.",
          ],
        },
        examples: {
          title: "Extra Payment Impact — Real Scenarios",
          examples: [
            {
              label: "$35,000 at 6.0% — Extra Payment Comparison",
              code:
                "Standard only (10yr):\n" +
                "  Monthly:         $389/mo\n" +
                "  Total Interest:  $11,619\n" +
                "  Payoff:          10yr 0mo\n\n" +
                "Extra $100/month:\n" +
                "  Monthly:         $489/mo\n" +
                "  Total Interest:  $8,847   (saves $2,772)\n" +
                "  Payoff:          7yr 9mo  (saves 27 months)\n\n" +
                "Extra $250/month:\n" +
                "  Monthly:         $639/mo\n" +
                "  Total Interest:  $6,553   (saves $5,066)\n" +
                "  Payoff:          5yr 7mo  (saves 53 months)\n\n" +
                "Annual lump sum $1,000/yr:\n" +
                "  Monthly:         $389/mo\n" +
                "  Total Interest:  $9,402   (saves $2,217)\n" +
                "  Payoff:          8yr 4mo  (saves 20 months)\n\n" +
                "Extended 25yr (no extras):\n" +
                "  Monthly:         $226/mo\n" +
                "  Total Interest:  $32,690  ($21,071 MORE!)",
            },
            {
              label: "Subsidized vs Unsubsidized — $10,000 at 5.5%, 4yr school + 6mo grace",
              code:
                "UNSUBSIDIZED:\n" +
                "  Interest during 4yr school:   $2,200\n" +
                "  Interest during 6mo grace:    $  344\n" +
                "  Balance when repayment starts: $12,544\n" +
                "  Monthly payment (10yr):        $  136\n" +
                "  Total interest paid:           $ 3,776\n" +
                "  Total cost of loan:            $13,776\n\n" +
                "SUBSIDIZED (same rate/term):\n" +
                "  Interest during school:        $    0  (gov pays)\n" +
                "  Interest during grace:         $    0  (gov pays)\n" +
                "  Balance when repayment starts: $10,000\n" +
                "  Monthly payment (10yr):        $  109\n" +
                "  Total interest paid:           $ 3,009\n" +
                "  Total cost of loan:            $13,009\n\n" +
                "Net savings from subsidized:     $  767 less interest\n" +
                "                                 $2,544 lower opening balance",
            },
          ],
        },
      },
      faqs: [
        {
          question: "What is the difference between subsidized and unsubsidized student loans?",
          answer:
            "With subsidized federal loans, the US Department of Education pays all interest while you are enrolled at least half-time, during the 6-month grace period after leaving school, and during approved deferments. This means your balance does not grow during those periods. With unsubsidized loans, interest accrues from the day the loan is disbursed — even during school years, summer breaks, and the grace period. If you do not pay this accrued interest, it capitalizes (is added to your principal) when repayment begins, resulting in a higher balance you then pay interest on for the entire loan term.",
        },
        {
          question: "What are the current federal student loan interest rates?",
          answer:
            "For the 2025-2026 academic year: Direct Subsidized and Unsubsidized Loans for undergraduates are 6.39%. Direct Unsubsidized Loans for graduate students are 7.94%. Direct PLUS Loans (graduate students and parents) are 8.94%. These rates are fixed for the life of each individual loan — they do not change after disbursement. Private student loan rates vary widely, typically from about 4% to 17% or higher, based on your credit score, chosen lender, and whether you have a cosigner.",
        },
        {
          question: "How is income-based repayment (IBR) calculated?",
          answer:
            "IBR caps your monthly payment at 10% of your discretionary income, defined as your Adjusted Gross Income minus 150% of the federal poverty guideline for your family size. For a single person earning $40,000 in 2025: the poverty guideline is $15,060, so 150% equals $22,590. Discretionary income is $17,410. Monthly IBR payment is 10% divided by 12, or roughly $145. You recertify income annually. Any remaining balance is forgiven after 20 years (post-2014 borrowers) or 25 years for older loans. Public service workers can qualify for forgiveness after just 10 years of qualifying payments under PSLF.",
        },
        {
          question: "Do extra payments make a significant difference?",
          answer:
            "Yes — dramatically. On a $35,000 loan at 6%, adding just $100 per month extra saves over $2,700 in interest and eliminates 27 months of payments. Applying a $1,000 annual lump sum (like a tax refund) saves over $2,200 and nearly 2 years. The effect compounds because reducing principal earlier means less interest accrues in every subsequent month. The most important step: confirm with your loan servicer that extra payments are applied to principal, not simply advancing your next due date — you may need to specify this each time.",
        },
        {
          question: "How much does the average student loan payment cost per month?",
          answer:
            "For bachelor's degree graduates with approximately $29,000 in debt, the standard 10-year monthly payment at current rates is roughly $310–$330 per month. Graduate degree holders with around $65,000 in loans pay approximately $720–$760 per month on the standard plan. Medical school graduates with $200,000+ in debt may pay $2,000–$2,200 per month on standard — which is why IBR or PSLF plans are often chosen for those borrowers. The Education Data Initiative reports the average monthly payment across all borrowers at approximately $503.",
        },
        {
          question: "Why do I see interest rates auto-filled based on my country?",
          answer:
            "Kalcufy detects your country and pre-fills the typical student loan interest rate for your market. US borrowers see current federal rates (6.39% for undergraduates for 2025-26), UK users see the current Retail Price Index-linked rate, Canadian users see their provincial average, Brazilian users see the FIES program rate, and other countries see their relevant market averages. You can always override the rate with your actual loan rate from your servicer — we pre-fill to save you a lookup for your first calculation.",
        },
      ],
      values: {
        perMonth: "/mo",
        years: "yr",
        months: "mo",
        faster: "faster",
        govPays: "Covered by gov.",
        noExtra: "No extra payments",
      },
      formats: {
        summary: "{monthlyPayment}/mo — paid off in {payoffTime} with {totalInterest} in interest",
      },
      rating: {
        label: "Student Loan Calculator",
        count: "21,000+ calculations",
      },
      common: {
        calculate: "Calculate",
        reset: "Reset",
        copy: "Copy Results",
        share: "Share",
      },
      buttons: {
        calculate: "Calculate Loan",
        reset: "Reset",
      },
      share: {
        title: "Student Loan Calculator Results",
        text: "Check my student loan calculation on Kalcufy",
      },
      accessibility: {
        inputLabel: "Enter {fieldName}",
        resultLabel: "{resultName}: {value}",
      },
      sources: {
        label: "Sources",
        govSource: "Federal Student Aid (studentaid.gov)",
      },
    },
  },

  inputs: [
    {
      id: "loanBalance",
      type: "number",
      defaultValue: null,
      placeholder: "30000",
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
    },
    {
      id: "interestRate",
      type: "slider",
      defaultValue: 5.5,
      min: 0.5,
      max: 20,
      step: 0.05,
      suffix: "%",
    },
    {
      id: "loanTerm",
      type: "slider",
      defaultValue: 10,
      min: 1,
      max: 30,
      step: 1,
      suffix: "years",
    },
    {
      id: "loanType",
      type: "select",
      defaultValue: "unsubsidized",
      options: [
        { value: "subsidized", label: "Subsidized (Gov pays interest)" },
        { value: "unsubsidized", label: "Unsubsidized (Interest from day 1)" },
        { value: "private", label: "Private Loan" },
      ],
    },
    {
      id: "repaymentPlan",
      type: "select",
      defaultValue: "standard",
      options: [
        { value: "standard", label: "Standard (Fixed)" },
        { value: "extended", label: "Extended (25yr)" },
        { value: "graduated", label: "Graduated" },
        { value: "income", label: "Income-Based (IBR)" },
      ],
    },
    {
      id: "annualIncome",
      type: "number",
      defaultValue: null,
      placeholder: "50000",
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
      showWhen: { field: "repaymentPlan", value: "income" },
    },
    {
      id: "familySize",
      type: "stepper",
      defaultValue: 1,
      min: 1,
      max: 10,
      step: 1,
      showWhen: { field: "repaymentPlan", value: "income" },
    },
    {
      id: "yearsInSchool",
      type: "stepper",
      defaultValue: 0,
      min: 0,
      max: 8,
      step: 1,
    },
    {
      id: "gracePeriod",
      type: "stepper",
      defaultValue: 6,
      min: 0,
      max: 12,
      step: 1,
    },
    {
      id: "payInterestDuringSchool",
      type: "toggle",
      defaultValue: false,
      showWhen: { field: "loanType", value: ["unsubsidized", "private"] },
    },
    {
      id: "capitalizeGraceInterest",
      type: "toggle",
      defaultValue: true,
      showWhen: { field: "loanType", value: ["unsubsidized", "private"] },
    },
    {
      id: "extraMonthly",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
    },
    {
      id: "extraYearly",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
    },
    {
      id: "lumpSum",
      type: "number",
      defaultValue: 0,
      placeholder: "0",
      unitType: "currency",
      autoConvert: false,
      defaultUnit: "USD",
      syncGroup: false,
    },
    {
      id: "lumpSumMonth",
      type: "stepper",
      defaultValue: 12,
      min: 1,
      max: 360,
      step: 1,
    },
  ],

  inputGroups: [],

  results: [
    { id: "monthlyPayment", type: "primary", format: "number" },
    { id: "totalInterest", type: "secondary", format: "number" },
    { id: "totalPaid", type: "secondary", format: "number" },
    { id: "payoffTime", type: "secondary", format: "text" },
    { id: "interestDuringSchool", type: "secondary", format: "text" },
    { id: "balanceAtRepayment", type: "secondary", format: "number" },
    { id: "interestSaved", type: "secondary", format: "text" },
    { id: "timeSaved", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "loanTypes", type: "list" },
    { id: "repaymentPlans", type: "list" },
    { id: "extraPaymentTips", type: "list", layout: "horizontal" },
  ],

  chart: {
    id: "balanceOverTime",
    type: "composed",
    xKey: "year",
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "balance", type: "area", color: "#3b82f6" },
      { key: "paid", type: "line", color: "#10b981" },
    ],
  },

  detailedTable: {
    id: "amortization",
    buttonLabel: "View Full Amortization",
    buttonIcon: "📅",
    modalTitle: "Year-by-Year Amortization Schedule",
    columns: [
      { id: "year", label: "Year", align: "center" },
      { id: "payment", label: "Annual Payment", align: "right" },
      { id: "principal", label: "Principal Paid", align: "right", highlight: true },
      { id: "interest", label: "Interest Paid", align: "right" },
      { id: "balance", label: "Ending Balance", align: "right" },
    ],
  },

  educationSections: [
    { id: "howInterestAccrues", type: "prose", icon: "📖" },
    { id: "ibrExplained", type: "prose", icon: "⚙️" },
    { id: "loanTypesDetail", type: "list", icon: "📋", itemCount: 4 },
    { id: "repaymentStrategies", type: "list", icon: "📊", itemCount: 4 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ],

  referenceData: [],

  references: [
    {
      authors: "U.S. Department of Education",
      year: "2025",
      title: "Federal Student Aid Interest Rates and Fees 2025-2026",
      source: "Federal Student Aid (studentaid.gov)",
      url: "https://studentaid.gov/understand-aid/types/loans/interest-rates",
    },
    {
      authors: "Federal Student Aid, U.S. Department of Education",
      year: "2025",
      title: "Income-Driven Repayment Plans",
      source: "Federal Student Aid (studentaid.gov)",
      url: "https://studentaid.gov/manage-loans/repayment/plans/income-driven",
    },
  ],
};

// ─── Calculate Function ────────────────────────────────────────────────────────

export function calculateStudentLoan(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
  country?: string;
}): CalculatorResults {
  const { values, country = "US" } = data;
  const geo = getGeoDefaults(country);

  // ── Read inputs ─────────────────────────────────────────────────────────────
  const loanBalance = values.loanBalance as number | null;
  const interestRate =
    (values.interestRate as number) ?? (geo as Record<string, unknown>).studentLoanRate ?? 5.5;
  const loanTerm = (values.loanTerm as number) || 10;
  const loanType = (values.loanType as string) || "unsubsidized";
  const repaymentPlan = (values.repaymentPlan as string) || "standard";
  const annualIncome = (values.annualIncome as number) || 0;
  const familySize = (values.familySize as number) || 1;
  const yearsInSchool = (values.yearsInSchool as number) || 0;
  const gracePeriod = (values.gracePeriod as number) || 6;
  const extraMonthly = (values.extraMonthly as number) || 0;
  const extraYearly = (values.extraYearly as number) || 0;
  const lumpSum = (values.lumpSum as number) || 0;
  const lumpSumMonth = (values.lumpSumMonth as number) || 12;
  const payInterestDuringSchool = (values.payInterestDuringSchool as boolean) ?? false;
  const capitalizeGraceInterest = (values.capitalizeGraceInterest as boolean) ?? true;

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  // ── Validate ─────────────────────────────────────────────────────────────────
  if (!loanBalance || loanBalance <= 0) {
    return {
      values: {},
      formatted: {
        monthlyPayment: "—",
        totalInterest: "—",
        totalPaid: "—",
        payoffTime: "—",
        interestDuringSchool: "—",
        balanceAtRepayment: "—",
        interestSaved: "—",
        timeSaved: "—",
      },
      summary: "Enter your loan balance to calculate payments",
      isValid: false,
    };
  }

  const annualRate = interestRate / 100;
  const monthlyRate = annualRate / 12;
  const dailyRate = annualRate / 365;

  // ── Interest during school ──────────────────────────────────────────────────
  // Subsidized = gov pays → zero. Unsubsidized/Private paying interest → zero capitalize.
  const schoolDays = yearsInSchool * 365;
  const interestDuringSchool =
    loanType === "subsidized" || payInterestDuringSchool
      ? 0
      : loanBalance * dailyRate * schoolDays;

  // ── Interest during grace period ───────────────────────────────────────────
  const graceDays = gracePeriod * 30.44;
  const balanceAfterSchool = loanBalance + interestDuringSchool;
  const interestDuringGrace =
    loanType === "subsidized"
      ? 0
      : balanceAfterSchool * dailyRate * graceDays;

  // ── Balance when repayment starts ──────────────────────────────────────────
  // If paying interest during school → school interest = 0 already
  // capitalizeGraceInterest OFF → grace interest NOT added to principal (user pays it upfront)
  const graceCap = capitalizeGraceInterest ? interestDuringGrace : 0;
  const balanceAtRepayment = loanBalance + interestDuringSchool + graceCap;

  // ── Helper: standard amortization payment ──────────────────────────────────
  const calcPayment = (principal: number, termYears: number): number => {
    const n = termYears * 12;
    if (monthlyRate === 0 || n === 0) return principal / Math.max(n, 1);
    return (
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
      (Math.pow(1 + monthlyRate, n) - 1)
    );
  };

  // ── Base monthly payment by plan ───────────────────────────────────────────
  let baseMonthlyPayment: number;
  let effectiveTerm = loanTerm;

  if (repaymentPlan === "income" && annualIncome > 0) {
    // IBR: 10% of discretionary income
    const povertyLine = 15060 + (familySize - 1) * 5380; // 2025 guidelines
    const discretionaryIncome = Math.max(0, annualIncome - 1.5 * povertyLine);
    baseMonthlyPayment = (discretionaryIncome * 0.1) / 12;
    effectiveTerm = 20;
  } else if (repaymentPlan === "extended") {
    effectiveTerm = 25;
    baseMonthlyPayment = calcPayment(balanceAtRepayment, 25);
  } else if (repaymentPlan === "graduated") {
    // Starts at 70% of standard payment; increases 10% every 24 months
    baseMonthlyPayment = calcPayment(balanceAtRepayment, loanTerm) * 0.7;
    effectiveTerm = loanTerm;
  } else {
    baseMonthlyPayment = calcPayment(balanceAtRepayment, loanTerm);
    effectiveTerm = loanTerm;
  }

  // ── Simulate WITHOUT extra payments (for comparison) ───────────────────────
  let stdBalance = balanceAtRepayment;
  let stdTotalInterest = 0;
  let stdMonths = 0;
  const maxStdMonths = effectiveTerm * 12 + 24;

  while (stdBalance > 0.01 && stdMonths < maxStdMonths) {
    stdMonths++;
    const intCharge = stdBalance * monthlyRate;
    let pmt = baseMonthlyPayment;
    if (repaymentPlan === "graduated") {
      const period = Math.floor((stdMonths - 1) / 24);
      pmt = baseMonthlyPayment * Math.pow(1.1, period);
    }
    const prin = pmt - intCharge;
    if (prin <= 0) {
      // negative amortization (IBR edge case)
      stdBalance += intCharge - pmt;
      stdTotalInterest += intCharge;
      if (stdBalance > balanceAtRepayment * 4) break;
    } else {
      stdTotalInterest += intCharge;
      stdBalance = Math.max(0, stdBalance - prin);
    }
  }

  // ── Simulate WITH extra payments ───────────────────────────────────────────
  let balance = balanceAtRepayment;
  let totalPaidCalc = 0;
  let months = 0;
  const maxMonths = effectiveTerm * 12 + 24;

  const chartData: Array<Record<string, unknown>> = [];
  const tableData: Array<Record<string, unknown>> = [];

  let yearPrincipal = 0;
  let yearInterestAcc = 0;
  let yearPaymentAcc = 0;

  while (balance > 0.01 && months < maxMonths) {
    months++;

    // Current base payment (graduated increases every 2yr)
    let currentBase = baseMonthlyPayment;
    if (repaymentPlan === "graduated") {
      const period = Math.floor((months - 1) / 24);
      currentBase = baseMonthlyPayment * Math.pow(1.1, period);
    }

    // Extra payments this month
    let extraThisMonth = extraMonthly;
    if (extraYearly > 0 && months % 12 === 0) extraThisMonth += extraYearly;
    if (lumpSum > 0 && months === lumpSumMonth) extraThisMonth += lumpSum;

    const totalPmt = currentBase + extraThisMonth;
    const intCharge = balance * monthlyRate;
    const prin = totalPmt - intCharge;

    if (prin <= 0) {
      // Negative amortization
      balance += intCharge - totalPmt;
      totalPaidCalc += totalPmt;
      yearInterestAcc += intCharge;
      yearPaymentAcc += totalPmt;
      if (balance > balanceAtRepayment * 4) break;
    } else {
      const actualPrin = Math.min(prin, balance);
      balance -= actualPrin;
      totalPaidCalc += intCharge + actualPrin;
      yearPrincipal += actualPrin;
      yearInterestAcc += intCharge;
      yearPaymentAcc += intCharge + actualPrin;
    }

    // Year-end snapshot
    if (months % 12 === 0 || balance <= 0.01) {
      const yr = Math.ceil(months / 12);
      chartData.push({
        year: `Yr ${yr}`,
        balance: Math.max(0, Math.round(balance)),
        paid: Math.round(totalPaidCalc),
      });
      tableData.push({
        year: yr,
        payment: fmt(yearPaymentAcc),
        principal: fmt(yearPrincipal),
        interest: fmt(yearInterestAcc),
        balance: fmt(Math.max(0, balance)),
      });
      yearPrincipal = 0;
      yearInterestAcc = 0;
      yearPaymentAcc = 0;
    }
  }

  const totalInterestPaid = Math.max(0, totalPaidCalc - balanceAtRepayment);
  const interestSaved = Math.max(0, stdTotalInterest - totalInterestPaid);
  const monthsSaved = Math.max(0, stdMonths - months);
  const hasExtra = extraMonthly > 0 || extraYearly > 0 || lumpSum > 0;

  const displayPayment = baseMonthlyPayment + extraMonthly;

  const payoffYears = Math.floor(months / 12);
  const payoffRem = months % 12;
  const payoffStr =
    payoffYears > 0
      ? `${payoffYears}yr${payoffRem > 0 ? ` ${payoffRem}mo` : ""}`
      : `${months}mo`;

  const savedYears = Math.floor(monthsSaved / 12);
  const savedRem = monthsSaved % 12;
  const timeSavedStr =
    hasExtra && monthsSaved > 0
      ? savedYears > 0
        ? `${savedYears}yr${savedRem > 0 ? ` ${savedRem}mo` : ""} faster`
        : `${monthsSaved}mo faster`
      : "No extra payments";

  const interestSavedStr =
    hasExtra && interestSaved > 0 ? fmt(interestSaved) : "No extra payments";

  return {
    values: {
      monthlyPayment: displayPayment,
      totalInterest: totalInterestPaid,
      totalPaid: totalPaidCalc,
      payoffTime: months,
      interestDuringSchool,
      balanceAtRepayment,
      interestSaved,
      timeSaved: monthsSaved,
    },
    formatted: {
      monthlyPayment: `${fmt(displayPayment)}/mo`,
      totalInterest: fmt(totalInterestPaid),
      totalPaid: fmt(totalPaidCalc),
      payoffTime: payoffStr,
      interestDuringSchool:
        loanType === "subsidized"
          ? "Covered by gov."
          : payInterestDuringSchool
          ? "Paid during school ✓"
          : fmt(interestDuringSchool),
      balanceAtRepayment: fmt(balanceAtRepayment),
      interestSaved: interestSavedStr,
      timeSaved: timeSavedStr,
    },
    summary: `${fmt(displayPayment)}/mo — paid off in ${payoffStr} with ${fmt(totalInterestPaid)} in interest`,
    isValid: true,
    metadata: { chartData, tableData },
  };
}

export default studentLoanConfig;
