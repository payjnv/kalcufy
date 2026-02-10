import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

/* ═══════════════════════════════════════════════════════════════════
   COMPOUND INTEREST CALCULATOR — V4 Engine
   A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) − 1) / (r/n)]
   KEY DIFFERENTIATORS:
   • "Interest on Interest" metric — exact $ earned BY accumulated interest
   • Simple vs Compound side-by-side difference
   • Rule of 72 doubling time integrated
   • Daily earnings display ("$X.XX/day right now")
   • Effective Annual Rate (APY) vs stated rate
   • Optional inflation + tax impact toggles
   • 3-layer stacked area chart (contributions + principal interest + interest-on-interest)
   + Chart: Stacked area — Contributions + Interest from Principal + Interest on Interest
   ═══════════════════════════════════════════════════════════════════ */

export const compoundInterestConfig: CalculatorConfigV4 = {
  id: "compound-interest",
  version: "4.0",
  category: "finance",
  icon: "📈",

  // ═══════════════════════════════════════════════════════════════
  // PRESETS
  // ═══════════════════════════════════════════════════════════════
  presets: [
    {
      id: "savingsAccount",
      icon: "🏦",
      values: {
        initialInvestment: 5000,
        interestRate: 4.5,
        investmentPeriod: 5,
        compoundingFrequency: "daily",
        includeContributions: true,
        monthlyContribution: 200,
        includeInflation: false,
        inflationRate: 3,
        includeTax: false,
        taxRate: 25,
      },
    },
    {
      id: "sp500Index",
      icon: "📈",
      values: {
        initialInvestment: 10000,
        interestRate: 10,
        investmentPeriod: 20,
        compoundingFrequency: "annually",
        includeContributions: true,
        monthlyContribution: 500,
        includeInflation: true,
        inflationRate: 3,
        includeTax: false,
        taxRate: 25,
      },
    },
    {
      id: "conservative",
      icon: "🛡️",
      values: {
        initialInvestment: 25000,
        interestRate: 5,
        investmentPeriod: 10,
        compoundingFrequency: "monthly",
        includeContributions: false,
        monthlyContribution: 0,
        includeInflation: false,
        inflationRate: 3,
        includeTax: false,
        taxRate: 25,
      },
    },
    {
      id: "aggressiveGrowth",
      icon: "🚀",
      values: {
        initialInvestment: 1000,
        interestRate: 12,
        investmentPeriod: 30,
        compoundingFrequency: "monthly",
        includeContributions: true,
        monthlyContribution: 300,
        includeInflation: true,
        inflationRate: 3,
        includeTax: false,
        taxRate: 25,
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // CHART — 3-layer stacked area
  // ═══════════════════════════════════════════════════════════════
  chart: {
    id: "growthProjection",
    type: "composed",
    xKey: "year",
    height: 320,
    stacked: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [
      { key: "contributions", type: "area", color: "#64748b" },
      { key: "principalInterest", type: "area", color: "#3b82f6" },
      { key: "interestOnInterest", type: "area", color: "#10b981" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // TRANSLATIONS — English only, other languages via install script
  // ═══════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Compound Interest Calculator",
      slug: "compound-interest-calculator",
      subtitle:
        "Calculate how your money grows with compound interest, regular contributions, and see the real impact of inflation and taxes on your returns",
      breadcrumb: "Compound Interest",

      seo: {
        title:
          "Compound Interest Calculator — Growth, APY & Rule of 72 | Free",
        description:
          "Free compound interest calculator with interest-on-interest breakdown, Rule of 72 doubling time, daily earnings, inflation adjustment, and tax impact. See exactly how compounding grows your wealth over time.",
        shortDescription:
          "See how compound interest grows your money over time",
        keywords: [
          "compound interest calculator",
          "interest on interest calculator",
          "compound growth calculator",
          "investment growth calculator",
          "rule of 72 calculator",
          "APY calculator",
          "compound interest with monthly contributions",
          "savings growth calculator",
          "inflation adjusted returns",
          "compound interest formula",
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
        initialInvestment: {
          label: "Initial Investment",
          helpText: "The starting amount you invest or deposit",
          placeholder: "10000",
        },
        interestRate: {
          label: "Annual Interest Rate",
          helpText: "The nominal annual rate of return (before compounding)",
        },
        investmentPeriod: {
          label: "Investment Period",
          helpText: "How many years you plan to keep the money invested",
        },
        compoundingFrequency: {
          label: "Compounding Frequency",
          helpText: "How often interest is calculated and added to your balance",
          options: {
            daily: "Daily (365×/yr)",
            monthly: "Monthly (12×/yr)",
            quarterly: "Quarterly (4×/yr)",
            semiannually: "Semi-Annually (2×/yr)",
            annually: "Annually (1×/yr)",
          },
        },
        includeContributions: {
          label: "Include Monthly Contributions",
          helpText: "Add regular monthly deposits to your investment",
        },
        monthlyContribution: {
          label: "Monthly Contribution",
          helpText: "Amount you add each month",
          placeholder: "200",
        },
        includeInflation: {
          label: "Adjust for Inflation",
          helpText: "See the real purchasing power of your future money",
        },
        inflationRate: {
          label: "Expected Inflation Rate",
          helpText: "Average annual inflation (US historical avg: ~3%)",
        },
        includeTax: {
          label: "Include Tax on Interest",
          helpText: "Deduct taxes from interest earnings",
        },
        taxRate: {
          label: "Tax Rate",
          helpText: "Your marginal tax rate on investment income",
        },
      },

      // ─── RESULTS ───────────────────────────────────────────
      results: {
        futureValue: { label: "Future Value" },
        totalInterestEarned: { label: "Total Interest Earned" },
        totalContributions: { label: "Total Contributions" },
        interestOnInterest: { label: "Interest on Interest" },
        effectiveRate: { label: "Effective Rate (APY)" },
        doublingTime: { label: "Doubling Time (Rule of 72)" },
        dailyEarnings: { label: "Daily Earnings (Today)" },
        simpleVsCompoundDiff: { label: "Compounding Advantage" },
        inflationAdjustedValue: { label: "Inflation-Adjusted Value" },
        afterTaxValue: { label: "After-Tax Value" },
      },

      // ─── PRESETS ───────────────────────────────────────────
      presets: {
        savingsAccount: {
          label: "Savings Account",
          description: "$5K initial, 4.5% APY, daily, +$200/mo",
        },
        sp500Index: {
          label: "S&P 500 Index",
          description: "$10K, 10% avg, 20yr, +$500/mo",
        },
        conservative: {
          label: "Conservative",
          description: "$25K, 5%, 10yr, no contributions",
        },
        aggressiveGrowth: {
          label: "Aggressive Growth",
          description: "$1K, 12%, 30yr, +$300/mo",
        },
      },

      // ─── TOOLTIPS ──────────────────────────────────────────
      tooltips: {
        futureValue: "The total value of your investment at the end of the period",
        totalInterestEarned: "Total interest earned over the investment period",
        totalContributions: "Your initial deposit plus all monthly contributions",
        interestOnInterest: "The amount of interest earned by your previously earned interest — the 'magic' of compounding",
        effectiveRate: "The actual annual rate after compounding — higher than the stated nominal rate",
        doublingTime: "How many years until your initial investment doubles using the Rule of 72",
        dailyEarnings: "How much interest your current balance earns per day right now",
        simpleVsCompoundDiff: "How much MORE you earn with compound interest vs simple interest",
        inflationAdjustedValue: "What your future money will actually be worth in today's purchasing power",
        afterTaxValue: "Your final value after deducting taxes on interest earned",
      },

      // ─── DYNAMIC VALUES ────────────────────────────────────
      values: {
        "years": "years",
        "year": "year",
        "months": "months",
        "month": "month",
        "day": "day",
        "/day": "/day",
        "/yr": "/yr",
        "Year": "Year",
        "Contributions": "Contributions",
        "Interest from Principal": "Interest from Principal",
        "Interest on Interest": "Interest on Interest",
        "Balance": "Balance",
        "Interest": "Interest",
        "Cumulative": "Cumulative",
        "of total interest": "of total interest",
        "vs simple interest": "vs simple interest",
        "real purchasing power": "real purchasing power",
        "after tax": "after tax",
      },

      // ─── FORMATS ───────────────────────────────────────────
      formats: {
        summary:
          "Invest {initial} at {rate}% for {period} years → {futureValue}. Total interest: {totalInterest} ({interestOnInterest} from compounding alone). Your money doubles in ~{doublingTime}. Daily earnings: {dailyEarnings}.",
      },

      // ─── CHART ─────────────────────────────────────────────
      chart: {
        title: "Investment Growth Projection",
        xLabel: "Year",
        yLabel: "Value",
        series: {
          contributions: "Contributions",
          principalInterest: "Interest from Principal",
          interestOnInterest: "Interest on Interest",
        },
      },

      // ─── INFO CARDS ────────────────────────────────────────
      infoCards: {
        growthBreakdown: {
          title: "📊 Growth Breakdown",
          items: [
            "Total Interest Earned: see how much your money worked for you",
            "Interest on Interest: the compounding 'snowball' effect",
            "Effective Rate (APY): actual annual yield after compounding",
            "Simple vs Compound: extra money earned from compounding alone",
          ],
        },
        timeInsights: {
          title: "⏱️ Time & Impact Insights",
          items: [
            "Doubling Time: years to double your initial investment",
            "Daily Earnings: how much your money earns every day",
            "Inflation Impact: real purchasing power of future value",
            "Start Early: 5 years earlier = dramatically more at retirement",
          ],
        },
        compoundingTips: {
          title: "💡 Compounding Tips",
          items: [
            "Start now — time is the most powerful factor in compounding",
            "Automate contributions — consistency beats timing the market",
            "Reinvest all dividends and interest — never withdraw early",
            "Higher compounding frequency means slightly higher returns",
          ],
        },
      },

      // ─── REFERENCE DATA ────────────────────────────────────
      referenceData: {
        compoundingComparison: {
          title: "Compounding Frequency Impact",
          items: {
            daily: {
              label: "Daily (365×/yr)",
              value: "Highest effective rate — used by banks & savings accounts",
            },
            monthly: {
              label: "Monthly (12×/yr)",
              value: "Most common — mortgages, credit cards, many investments",
            },
            quarterly: {
              label: "Quarterly (4×/yr)",
              value: "Corporate bonds, some dividends",
            },
            semiannually: {
              label: "Semi-Annually (2×/yr)",
              value: "US Treasury bonds, some CDs",
            },
            annually: {
              label: "Annually (1×/yr)",
              value: "Simplest calculation — many international bonds",
            },
          },
        },
      },

      // ─── DETAILED TABLE ────────────────────────────────────
      detailedTable: {
        yearlyBreakdown: {
          button: "View Year-by-Year Growth Schedule",
          title: "Year-by-Year Compound Interest Schedule",
          columns: {
            year: "Year",
            contributions: "Contributions",
            interest: "Interest Earned",
            balance: "Balance",
            inflationAdjusted: "Real Value",
          },
        },
      },

      // ─── EDUCATION ─────────────────────────────────────────
      education: {
        whatIs: {
          title: "What Is Compound Interest?",
          content:
            "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods — earning 'interest on interest.' Unlike simple interest (which only earns on the original amount), compound interest creates exponential growth because each interest payment increases the base amount for the next calculation. Albert Einstein reportedly called compound interest 'the eighth wonder of the world.' Over long time horizons, the difference between simple and compound interest becomes dramatic: $10,000 at 8% simple interest earns $800/year forever, while at 8% compound interest it doubles roughly every 9 years, growing to $46,610 in 20 years vs $26,000 with simple interest.",
        },
        howItWorks: {
          title: "How the Compound Interest Formula Works",
          content:
            "The compound interest formula is A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual rate (decimal), n is the compounding frequency per year, and t is years. When you add regular contributions (PMT), the future value of an annuity formula is added: PMT × [((1 + r/n)^(nt) − 1) / (r/n)]. The key insight is that higher compounding frequency (n) means the exponent grows faster: daily compounding at 5% yields an effective rate of 5.127%, while annual compounding stays at exactly 5%. This calculator separates 'interest from principal' and 'interest on interest' so you can see exactly how much of your earnings come from the compounding effect alone.",
        },
        compoundingStrategies: {
          title: "Strategies to Maximize Compound Growth",
          items: [
            {
              text: "Start as early as possible — a 25-year-old investing $300/month at 8% will have more at 65 than a 35-year-old investing $600/month",
              type: "info",
            },
            {
              text: "Use tax-advantaged accounts (401k, IRA, Roth) — tax-deferred growth can increase effective returns by 20-30% over taxable accounts",
              type: "info",
            },
            {
              text: "Reinvest ALL dividends and interest — this single habit can double your long-term returns compared to taking distributions",
              type: "info",
            },
            {
              text: "Don't withdraw early — breaking compounding resets the exponential curve and costs exponentially more the earlier you withdraw",
              type: "warning",
            },
            {
              text: "Increase contributions with raises — boost your monthly amount by even 1% per year for significantly faster growth",
              type: "info",
            },
            {
              text: "Avoid high-fee funds — a 1% annual fee can reduce your final balance by 25%+ over 30 years due to lost compounding",
              type: "warning",
            },
          ],
        },
        commonMistakes: {
          title: "Common Compound Interest Mistakes",
          items: [
            {
              text: "Ignoring inflation — $1M in 30 years buys roughly what $400K buys today at 3% inflation",
              type: "warning",
            },
            {
              text: "Confusing nominal rate with APY — a 5% rate compounded monthly actually yields 5.12% per year",
              type: "warning",
            },
            {
              text: "Waiting to start — delaying investing by just 5 years can cost 30-40% of your final balance",
              type: "warning",
            },
            {
              text: "Panic selling during downturns — interrupting compounding during a temporary dip costs more than the dip itself",
              type: "warning",
            },
            {
              text: "Forgetting taxes on interest income — taxable accounts compound slower because taxes reduce the amount that reinvests each period",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step compound interest calculations",
          examples: [
            {
              title: "$10,000 at 7% for 20 years, monthly compounding",
              steps: [
                "Formula: A = P(1 + r/n)^(nt)",
                "A = 10,000 × (1 + 0.07/12)^(12×20)",
                "A = 10,000 × (1.005833)^240",
                "A = 10,000 × 4.0387 = $40,387",
                "Total interest: $30,387",
                "Simple interest would be: 10,000 × 0.07 × 20 = $14,000",
                "Compounding advantage: $30,387 − $14,000 = $16,387 extra",
              ],
              result:
                "$10,000 grows to $40,387 in 20 years. Compounding earned $16,387 MORE than simple interest would have.",
            },
            {
              title: "$5,000 + $200/mo at 8% for 30 years, monthly",
              steps: [
                "Principal growth: 5,000 × (1 + 0.08/12)^360 = $54,184",
                "Contribution growth: 200 × [((1.00667)^360 − 1) / 0.00667]",
                "Contribution FV = 200 × 1,490.36 = $298,072",
                "Total future value: $54,184 + $298,072 = $352,256",
                "Total contributed: $5,000 + ($200 × 360) = $77,000",
                "Total interest earned: $352,256 − $77,000 = $275,256",
                "Rule of 72: 72 ÷ 8 = 9 years to double",
              ],
              result:
                "$77,000 in total contributions grows to $352,256 — earning $275,256 in interest. Money doubles every ~9 years.",
            },
          ],
        },
      },

      // ─── FAQs ──────────────────────────────────────────────
      faqs: [
        {
          question: "What is compound interest and how does it differ from simple interest?",
          answer:
            "Compound interest calculates interest on both the original principal and all previously earned interest — 'interest on interest.' Simple interest only calculates on the original principal. Example: $10,000 at 5% for 10 years earns $5,000 in simple interest but $6,289 in compound interest (annually) — that extra $1,289 is the interest earned on interest.",
        },
        {
          question: "How does compounding frequency affect my returns?",
          answer:
            "More frequent compounding means slightly higher effective returns. At 5% nominal rate: annual compounding yields 5.00% APY, monthly yields 5.12%, daily yields 5.13%. The difference is small at low rates but compounds significantly over long periods. For a $100,000 investment over 30 years at 7%, daily vs annual compounding means roughly $10,000 more.",
        },
        {
          question: "What is the Rule of 72 and how accurate is it?",
          answer:
            "The Rule of 72 estimates how many years it takes to double your money: divide 72 by the annual interest rate. At 8%, money doubles in ~9 years (72÷8=9). It's most accurate for rates between 6-10%. For rates below 5%, use the Rule of 70 instead. The rule works for annual compounding; daily compounding doubles slightly faster.",
        },
        {
          question: "What is APY (Annual Percentage Yield) vs APR?",
          answer:
            "APR (Annual Percentage Rate) is the stated nominal interest rate. APY (Annual Percentage Yield) is the effective rate after accounting for compounding frequency. APY is always ≥ APR. A credit card at 24% APR compounded daily has an APY of 27.11%. When comparing investments, always compare APY to APY for a fair comparison.",
        },
        {
          question: "How does inflation affect my compound interest returns?",
          answer:
            "Inflation reduces the purchasing power of future money. At 3% inflation, $100,000 in 20 years only buys what $55,368 buys today. To find your 'real' return, subtract inflation from your nominal rate: 8% return − 3% inflation ≈ 5% real return. This calculator shows both nominal and inflation-adjusted values so you can plan realistically.",
        },
        {
          question: "Should I contribute monthly or invest a lump sum?",
          answer:
            "Mathematically, a lump sum invested immediately earns more because it compounds for the full period. However, most people don't have a lump sum available. Dollar-cost averaging (regular monthly contributions) is the practical approach for building wealth and also smooths out market volatility. The key is consistency — automate contributions and don't try to time the market.",
        },
        {
          question: "How much should I invest to reach a specific goal?",
          answer:
            "Use this calculator in reverse: enter your target amount as the future value and adjust the initial investment and monthly contributions until you reach it. For example, to have $1M in 30 years at 8% annual return, you'd need either ~$99,400 today with no contributions, or ~$670/month starting from $0. Starting with $10,000 + $500/month gets you there too.",
        },
        {
          question: "What is 'interest on interest' and why does it matter?",
          answer:
            "Interest on interest is the portion of your earnings generated by previously earned interest — not by your original deposits. It's the core mechanism of compounding. Over long periods, it becomes the majority of your returns: in a 30-year investment at 8%, about 75% of your final balance is interest on interest. This is why time is the most powerful factor in wealth building.",
        },
      ],

      // ─── FIXED UI BLOCKS ───────────────────────────────────
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
      accessibility: {
        mobileResults: "Results summary",
        closeModal: "Close",
        openMenu: "Open menu",
      },
      sources: { title: "Sources & References" },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "initialInvestment",
      type: "number",
      defaultValue: null,
      placeholder: "10000",
      showSlider: false,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "interestRate",
      type: "slider",
      defaultValue: 7,
      min: 0,
      max: 30,
      step: 0.01,
      suffix: "%",
    },
    {
      id: "investmentPeriod",
      type: "stepper",
      defaultValue: 10,
      min: 1,
      max: 50,
      step: 1,
      suffix: "years",
    },
    {
      id: "compoundingFrequency",
      type: "select",
      defaultValue: "monthly",
      options: [
        { value: "daily" },
        { value: "monthly" },
        { value: "quarterly" },
        { value: "semiannually" },
        { value: "annually" },
      ],
    },

    // ── Monthly Contributions (toggle) ─────────────────────
    {
      id: "includeContributions",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "monthlyContribution",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      showSlider: false,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeContributions", value: true },
    },

    // ── Inflation Adjustment (toggle) ──────────────────────
    {
      id: "includeInflation",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "inflationRate",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 15,
      step: 0.1,
      suffix: "%",
      showWhen: { field: "includeInflation", value: true },
    },

    // ── Tax on Interest (toggle) ───────────────────────────
    {
      id: "includeTax",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "taxRate",
      type: "number",
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 1,
      suffix: "%",
      showWhen: { field: "includeTax", value: true },
    },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════
  results: [
    { id: "futureValue", type: "primary", format: "currency" },
    { id: "totalInterestEarned", type: "secondary", format: "currency" },
    { id: "totalContributions", type: "secondary", format: "currency" },
    { id: "interestOnInterest", type: "secondary", format: "text" },
    { id: "effectiveRate", type: "secondary", format: "text" },
    { id: "doublingTime", type: "secondary", format: "text" },
    { id: "dailyEarnings", type: "secondary", format: "text" },
    { id: "simpleVsCompoundDiff", type: "secondary", format: "text" },
    { id: "inflationAdjustedValue", type: "secondary", format: "text" },
    { id: "afterTaxValue", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // DETAILED TABLE — Year-by-year growth schedule
  // ═══════════════════════════════════════════════════════════════
  detailedTable: {
    id: "yearlyBreakdown",
    buttonLabel: "detailedTable.yearlyBreakdown.button",
    modalTitle: "detailedTable.yearlyBreakdown.title",
    columns: [
      { key: "year", label: "detailedTable.yearlyBreakdown.columns.year" },
      {
        key: "contributions",
        label: "detailedTable.yearlyBreakdown.columns.contributions",
      },
      {
        key: "interest",
        label: "detailedTable.yearlyBreakdown.columns.interest",
      },
      {
        key: "balance",
        label: "detailedTable.yearlyBreakdown.columns.balance",
        highlight: true,
      },
      {
        key: "inflationAdjusted",
        label: "detailedTable.yearlyBreakdown.columns.inflationAdjusted",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════
  infoCards: [
    { id: "growthBreakdown", type: "list", icon: "📊", itemCount: 4 },
    { id: "timeInsights", type: "list", icon: "⏱️", itemCount: 4 },
    { id: "compoundingTips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ═══════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════
  referenceData: [],

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "compoundingStrategies", type: "list", icon: "✅", itemCount: 6 },
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
  // FAQs
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
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Investopedia",
      year: "2025",
      title: "Compound Interest: Definition, Formula, and Calculation",
      source: "Investopedia Financial Education",
      url: "https://www.investopedia.com/terms/c/compoundinterest.asp",
    },
    {
      authors: "U.S. Securities and Exchange Commission",
      year: "2025",
      title: "Compound Interest Calculator",
      source: "Investor.gov Financial Tools",
      url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
    },
    {
      authors: "Board of Governors of the Federal Reserve System",
      year: "2025",
      title: "Truth in Savings (Regulation DD)",
      source: "Federal Reserve Consumer Compliance Handbook",
      url: "https://www.federalreserve.gov/boarddocs/supmanual/cch/tis.pdf",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // MISC CONFIG
  // ═══════════════════════════════════════════════════════════════
  hero: {
    badge: "Finance",
    rating: { average: 4.9, count: 12400 },
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
    "savings-calculator",
    "investment-calculator",
    "retirement-calculator",
    "simple-interest-calculator",
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
   Core formula: A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) − 1) / (r/n)]
   Unique features:
   • Separates "interest from principal" vs "interest on interest"
   • Calculates simple interest for comparison
   • Rule of 72 doubling time
   • Effective Annual Rate (APY)
   • Daily earnings at current balance
   • Inflation-adjusted value
   • After-tax value
   ═══════════════════════════════════════════════════════════════════ */

// Compounding periods per year
const COMPOUND_N: Record<string, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  semiannually: 2,
  annually: 1,
};

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

function formatCurrency(amount: number, sym: string): string {
  if (Math.abs(amount) >= 1_000_000) {
    return `${sym}${(amount / 1_000_000).toFixed(2)}M`;
  }
  return `${sym}${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function formatCurrencyDecimals(amount: number, sym: string): string {
  return `${sym}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function calculateCompoundInterest(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;

  // ── Translations ──────────────────────────────────────────
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Currency symbol ───────────────────────────────────────
  const curr = fieldUnits?.initialInvestment || "USD";
  const sym = CURRENCY_SYMBOLS[curr] || "$";

  // ── Read inputs ───────────────────────────────────────────
  const principal = (values.initialInvestment as number) || 0;
  const annualRate = (values.interestRate as number) || 0;
  const years = (values.investmentPeriod as number) || 1;
  const compFreq = (values.compoundingFrequency as string) || "monthly";
  const includeContrib = values.includeContributions === true;
  const monthlyPMT = includeContrib ? ((values.monthlyContribution as number) || 0) : 0;
  const includeInflation = values.includeInflation === true;
  const inflationRate = includeInflation ? ((values.inflationRate as number) || 3) : 0;
  const includeTax = values.includeTax === true;
  const taxRate = includeTax ? ((values.taxRate as number) || 25) : 0;

  // ── Validation ────────────────────────────────────────────
  if (principal <= 0 && monthlyPMT <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Core calculations ─────────────────────────────────────
  const r = annualRate / 100;
  const n = COMPOUND_N[compFreq] || 12;
  const totalPeriods = n * years;
  const ratePerPeriod = r / n;

  // Future value of principal: P × (1 + r/n)^(nt)
  const fvPrincipal = principal * Math.pow(1 + ratePerPeriod, totalPeriods);

  // Future value of contributions (annuity)
  // Convert monthly contribution to per-period contribution
  let fvContributions = 0;
  let totalContributed = principal;

  if (monthlyPMT > 0 && ratePerPeriod > 0) {
    // Convert monthly to per-period amount
    const periodsPerMonth = n / 12;
    const pmtPerPeriod = monthlyPMT / periodsPerMonth;

    fvContributions =
      pmtPerPeriod *
      ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);

    totalContributed = principal + monthlyPMT * 12 * years;
  } else if (monthlyPMT > 0 && ratePerPeriod === 0) {
    fvContributions = monthlyPMT * 12 * years;
    totalContributed = principal + monthlyPMT * 12 * years;
  }

  const futureValue = fvPrincipal + fvContributions;
  const totalInterest = futureValue - totalContributed;

  // ── Simple interest for comparison ────────────────────────
  const simpleInterest = principal * r * years;
  // For simple interest on contributions: each monthly deposit earns simple interest
  // for remaining months
  let simpleContribInterest = 0;
  if (monthlyPMT > 0) {
    const totalMonths = years * 12;
    for (let m = 1; m <= totalMonths; m++) {
      const remainingYears = (totalMonths - m) / 12;
      simpleContribInterest += monthlyPMT * r * remainingYears;
    }
  }
  const simpleTotalWithContrib = principal + simpleInterest + (monthlyPMT * 12 * years) + simpleContribInterest;
  const compoundAdvantage = futureValue - simpleTotalWithContrib;

  // ── Interest on Interest ──────────────────────────────────
  // Simple interest on the same amounts = interest ONLY from principal/contributions
  // Compound interest total − simple interest total = interest earned BY interest
  const totalSimpleInterest = simpleInterest + simpleContribInterest;
  const interestOnInterest = Math.max(0, totalInterest - totalSimpleInterest);
  const ioiPercent =
    totalInterest > 0
      ? Math.round((interestOnInterest / totalInterest) * 100)
      : 0;

  // ── Effective Annual Rate (APY) ───────────────────────────
  const effectiveRate = (Math.pow(1 + ratePerPeriod, n) - 1) * 100;

  // ── Rule of 72 Doubling Time ──────────────────────────────
  const doublingYears = annualRate > 0 ? 72 / annualRate : Infinity;

  // ── Daily Earnings (at current principal, day 1) ──────────
  const dailyRate = r / 365;
  const dailyEarnings = principal * dailyRate;

  // ── Inflation-adjusted value ──────────────────────────────
  const inflationFactor =
    inflationRate > 0
      ? Math.pow(1 + inflationRate / 100, years)
      : 1;
  const inflationAdjusted = futureValue / inflationFactor;

  // ── After-tax value ───────────────────────────────────────
  const taxOnInterest = totalInterest * (taxRate / 100);
  const afterTaxValue = futureValue - taxOnInterest;

  // ── Translated units ──────────────────────────────────────
  const ofTotalInterest = v["of total interest"] || "of total interest";
  const vsSimple = v["vs simple interest"] || "vs simple interest";
  const realPower = v["real purchasing power"] || "real purchasing power";
  const afterTaxLabel = v["after tax"] || "after tax";
  const perDay = v["/day"] || "/day";

  // ── Format results ────────────────────────────────────────
  const fmtFutureValue = formatCurrency(Math.round(futureValue), sym);
  const fmtTotalInterest = formatCurrency(Math.round(totalInterest), sym);
  const fmtTotalContrib = formatCurrency(Math.round(totalContributed), sym);
  const fmtIoI = `${formatCurrency(Math.round(interestOnInterest), sym)} (${ioiPercent}% ${ofTotalInterest})`;
  const fmtEffective = `${effectiveRate.toFixed(2)}% APY`;
  const fmtDoubling =
    annualRate > 0
      ? `~${doublingYears.toFixed(1)} ${v["years"] || "years"}`
      : "N/A";
  const fmtDaily = `${formatCurrencyDecimals(dailyEarnings, sym)}${perDay}`;
  const fmtCompoundAdv = `+${formatCurrency(Math.round(compoundAdvantage), sym)} ${vsSimple}`;
  const fmtInflation = includeInflation
    ? `${formatCurrency(Math.round(inflationAdjusted), sym)} ${realPower}`
    : "—";
  const fmtAfterTax = includeTax
    ? `${formatCurrency(Math.round(afterTaxValue), sym)} ${afterTaxLabel}`
    : "—";

  // ── Summary ───────────────────────────────────────────────
  const summaryTemplate =
    f.summary ||
    "Invest {initial} at {rate}% for {period} years → {futureValue}. Total interest: {totalInterest} ({interestOnInterest} from compounding alone). Your money doubles in ~{doublingTime}. Daily earnings: {dailyEarnings}.";

  const summary = summaryTemplate
    .replace("{initial}", formatCurrency(Math.round(principal), sym))
    .replace("{rate}", annualRate.toString())
    .replace("{period}", years.toString())
    .replace("{futureValue}", fmtFutureValue)
    .replace("{totalInterest}", fmtTotalInterest)
    .replace("{interestOnInterest}", formatCurrency(Math.round(interestOnInterest), sym))
    .replace("{doublingTime}", doublingYears > 0 && doublingYears < Infinity ? `${doublingYears.toFixed(1)} ${v["years"] || "years"}` : "N/A")
    .replace("{dailyEarnings}", fmtDaily);

  // ═════════════════════════════════════════════════════════════
  // CHART DATA — 3-layer stacked area (year-by-year)
  // Layer 1: Contributions (deposits)
  // Layer 2: Interest from principal (simple interest equivalent)
  // Layer 3: Interest on interest (the compounding magic)
  // ═════════════════════════════════════════════════════════════
  const chartData: Array<Record<string, unknown>> = [];

  // Year 0 — starting point
  chartData.push({
    year: `Y0`,
    contributions: Math.round(principal),
    principalInterest: 0,
    interestOnInterest: 0,
  });

  // Determine chart step for readability
  let chartStep: number;
  if (years <= 20) chartStep = 1;
  else if (years <= 35) chartStep = 2;
  else chartStep = 5;

  for (let y = chartStep; y <= years; y += chartStep) {
    const yPeriods = n * y;

    // Compound future value at year y
    const yFvPrincipal = principal * Math.pow(1 + ratePerPeriod, yPeriods);
    let yFvContrib = 0;
    if (monthlyPMT > 0 && ratePerPeriod > 0) {
      const periodsPerMonth = n / 12;
      const pmtPerPeriod = monthlyPMT / periodsPerMonth;
      yFvContrib =
        pmtPerPeriod *
        ((Math.pow(1 + ratePerPeriod, yPeriods) - 1) / ratePerPeriod);
    } else if (monthlyPMT > 0) {
      yFvContrib = monthlyPMT * 12 * y;
    }

    const yTotalValue = yFvPrincipal + yFvContrib;
    const yTotalContrib = principal + monthlyPMT * 12 * y;
    const yTotalInterest = yTotalValue - yTotalContrib;

    // Simple interest at year y (for breakdown)
    const ySimpleFromPrincipal = principal * r * y;
    let ySimpleFromContrib = 0;
    if (monthlyPMT > 0) {
      const totalMonths = y * 12;
      for (let m = 1; m <= totalMonths; m++) {
        const remainingYears = (totalMonths - m) / 12;
        ySimpleFromContrib += monthlyPMT * r * remainingYears;
      }
    }
    const ySimpleInterest = ySimpleFromPrincipal + ySimpleFromContrib;
    const yIoI = Math.max(0, yTotalInterest - ySimpleInterest);

    chartData.push({
      year: `Y${y}`,
      contributions: Math.round(yTotalContrib),
      principalInterest: Math.round(ySimpleInterest),
      interestOnInterest: Math.round(yIoI),
    });
  }

  // Ensure final year is always included
  const lastChartYear = chartData[chartData.length - 1];
  if (lastChartYear.year !== `Y${years}`) {
    chartData.push({
      year: `Y${years}`,
      contributions: Math.round(totalContributed),
      principalInterest: Math.round(totalSimpleInterest),
      interestOnInterest: Math.round(interestOnInterest),
    });
  }

  // ═════════════════════════════════════════════════════════════
  // DETAILED TABLE — Year-by-year schedule
  // ═════════════════════════════════════════════════════════════
  const tableData: Record<string, string>[] = [];
  let prevBalance = principal;

  for (let y = 1; y <= years; y++) {
    const yPeriods = n * y;

    // Compound future value at year y
    const yFvPrincipal = principal * Math.pow(1 + ratePerPeriod, yPeriods);
    let yFvContrib = 0;
    if (monthlyPMT > 0 && ratePerPeriod > 0) {
      const periodsPerMonth = n / 12;
      const pmtPerPeriod = monthlyPMT / periodsPerMonth;
      yFvContrib =
        pmtPerPeriod *
        ((Math.pow(1 + ratePerPeriod, yPeriods) - 1) / ratePerPeriod);
    } else if (monthlyPMT > 0) {
      yFvContrib = monthlyPMT * 12 * y;
    }

    const yBalance = yFvPrincipal + yFvContrib;
    const yTotalContrib = principal + monthlyPMT * 12 * y;
    const yInterestThisYear = yBalance - prevBalance - (monthlyPMT * 12);
    const yInflAdj = includeInflation
      ? yBalance / Math.pow(1 + inflationRate / 100, y)
      : yBalance;

    tableData.push({
      year: `${v["Year"] || "Year"} ${y}`,
      contributions: formatCurrency(Math.round(yTotalContrib), sym),
      interest: formatCurrency(Math.round(Math.max(0, yInterestThisYear)), sym),
      balance: formatCurrency(Math.round(yBalance), sym),
      inflationAdjusted: includeInflation
        ? formatCurrency(Math.round(yInflAdj), sym)
        : "—",
    });

    prevBalance = yBalance;
  }

  // ═════════════════════════════════════════════════════════════
  // RETURN
  // ═════════════════════════════════════════════════════════════
  return {
    values: {
      futureValue: Math.round(futureValue),
      totalInterestEarned: Math.round(totalInterest),
      totalContributions: Math.round(totalContributed),
      interestOnInterest: Math.round(interestOnInterest),
      effectiveRate: parseFloat(effectiveRate.toFixed(2)),
      doublingTime: parseFloat(doublingYears.toFixed(1)),
      dailyEarnings: parseFloat(dailyEarnings.toFixed(2)),
      simpleVsCompoundDiff: Math.round(compoundAdvantage),
      inflationAdjustedValue: includeInflation ? Math.round(inflationAdjusted) : null,
      afterTaxValue: includeTax ? Math.round(afterTaxValue) : null,
    },
    formatted: {
      futureValue: fmtFutureValue,
      totalInterestEarned: fmtTotalInterest,
      totalContributions: fmtTotalContrib,
      interestOnInterest: fmtIoI,
      effectiveRate: fmtEffective,
      doublingTime: fmtDoubling,
      dailyEarnings: fmtDaily,
      simpleVsCompoundDiff: fmtCompoundAdv,
      inflationAdjustedValue: fmtInflation,
      afterTaxValue: fmtAfterTax,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default compoundInterestConfig;
