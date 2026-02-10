import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ============================================================================
// CURRENCY CONVERTER - V4 (EN ONLY)
// ============================================================================

export const currencyConverterConfig: CalculatorConfigV4 = {
  id: "currency-converter",
  version: "4.0",
  category: "conversion",
  icon: "💱",

  presets: [
    { id: "hundred", icon: "💵", values: { amount: 100 } },
    { id: "thousand", icon: "💰", values: { amount: 1000 } },
    { id: "tenK", icon: "🏦", values: { amount: 10000 } },
  ],

  t: {
    en: {
      name: "Currency Converter",
      slug: "currency-converter",
      subtitle: "Convert between 45+ world currencies using mid-market exchange rates.",
      breadcrumb: "Currency",

      seo: {
        title: "Currency Converter - Free Exchange Rate Calculator",
        description: "Convert between 45+ world currencies instantly. See mid-market exchange rates for USD, EUR, GBP, MXN, BRL, JPY, and more with our free converter.",
        shortDescription: "Convert between world currencies instantly.",
        keywords: [
          "currency converter",
          "exchange rate calculator",
          "usd to eur",
          "convert currency",
          "money converter",
          "free currency calculator",
          "forex calculator",
          "dollar to euro",
        ],
      },

      calculator: { yourInformation: "Currency Conversion" },
      ui: {
        yourInformation: "Currency Conversion",
        calculate: "Convert",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        amount: {
          label: "Amount",
          helpText: "Enter amount to convert",
        },
        toCurrency: {
          label: "Convert To",
          helpText: "Target currency",
          options: {
            USD: "US Dollar (USD)",
            EUR: "Euro (EUR)",
            GBP: "British Pound (GBP)",
            JPY: "Japanese Yen (JPY)",
            CAD: "Canadian Dollar (CAD)",
            AUD: "Australian Dollar (AUD)",
            CHF: "Swiss Franc (CHF)",
            MXN: "Mexican Peso (MXN)",
            BRL: "Brazilian Real (BRL)",
            INR: "Indian Rupee (INR)",
            COP: "Colombian Peso (COP)",
            ARS: "Argentine Peso (ARS)",
            PEN: "Peruvian Sol (PEN)",
            CLP: "Chilean Peso (CLP)",
          },
        },
      },

      results: {
        converted: { label: "Converted Amount" },
        rate: { label: "Exchange Rate" },
        inverse: { label: "Inverse Rate" },
      },

      presets: {
        hundred: { label: "$100", description: "Quick 100 unit conversion" },
        thousand: { label: "$1,000", description: "One thousand units" },
        tenK: { label: "$10,000", description: "Ten thousand units" },
      },

      values: {},

      formats: {
        summary: "{amount} {from} = {converted} {to}",
      },

      infoCards: {
        results: {
          title: "💱 Conversion Results",
          items: [
            { label: "Converted Amount", valueKey: "converted" },
            { label: "Exchange Rate", valueKey: "rate" },
            { label: "Inverse Rate", valueKey: "inverse" },
            { label: "Last Updated", valueKey: "lastUpdated" },
          ],
        },
        popular: {
          title: "📊 Popular Rates",
          items: [
            { label: "1 USD → EUR", valueKey: "usdEur" },
            { label: "1 USD → GBP", valueKey: "usdGbp" },
            { label: "1 USD → JPY", valueKey: "usdJpy" },
            { label: "1 USD → MXN", valueKey: "usdMxn" },
          ],
        },
        tips: {
          title: "💡 Currency Tips",
          items: [
            "Mid-market rates shown here — banks and services add a markup of 1-5% on top.",
            "Exchange rates fluctuate constantly based on economic conditions, interest rates, and market sentiment.",
            "For large transfers, compare services like Wise, Revolut, or OFX to get the best rates.",
            "Some currencies like JPY and KRW don't use decimals — 1 USD ≈ 150 JPY is normal.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "Understanding Exchange Rates",
          content: "An exchange rate tells you how much one currency is worth in terms of another. The mid-market rate (also called the interbank rate) is the midpoint between buy and sell prices on the global currency market. This is the 'real' exchange rate that banks use between themselves. When you exchange money at a bank, airport kiosk, or online service, they add a margin (markup) to this rate — typically 1-5% for online services and 5-12% for airport exchanges. Always compare the rate you're offered to the mid-market rate to know how much you're paying in hidden fees.",
        },
        howItWorks: {
          title: "How Currency Conversion Works",
          content: "Currency values are determined by supply and demand in the foreign exchange (forex) market — the world's largest financial market with over $7 trillion traded daily. Factors that affect exchange rates include interest rates set by central banks, inflation rates, political stability, trade balances, and economic performance. When a country raises interest rates, its currency typically strengthens because investors seek higher returns. Conversely, high inflation or political instability can weaken a currency. Exchange rates can be fixed (pegged to another currency), floating (determined by market forces), or managed (floating with central bank intervention).",
        },
        considerations: {
          title: "Things to Know About Currency Exchange",
          items: [
            { text: "The rates shown are mid-market reference rates — actual exchange rates from banks and services will differ", type: "warning" },
            { text: "Exchange rates change constantly during trading hours (Sunday 5pm - Friday 5pm ET)", type: "info" },
            { text: "Some countries have capital controls that restrict currency conversion amounts", type: "warning" },
            { text: "Credit cards often offer competitive exchange rates with a 1-3% foreign transaction fee", type: "info" },
            { text: "For travel, notify your bank before going abroad to avoid card blocks", type: "info" },
            { text: "Cryptocurrency exchanges offer another option but with their own volatility risks", type: "info" },
          ],
        },
        majorCurrencies: {
          title: "Major World Currencies",
          items: [
            { text: "USD (US Dollar) — World's primary reserve currency, used in ~88% of all forex transactions", type: "info" },
            { text: "EUR (Euro) — Second most traded currency, used by 20 EU countries with 340+ million people", type: "info" },
            { text: "JPY (Japanese Yen) — Third most traded, known as a 'safe haven' currency in times of uncertainty", type: "info" },
            { text: "GBP (British Pound) — One of the oldest currencies still in use, fourth most traded globally", type: "info" },
            { text: "CNY (Chinese Yuan) — Growing in international trade, partially managed by China's central bank", type: "info" },
            { text: "MXN (Mexican Peso) — Most traded Latin American currency, heavily influenced by US economy", type: "info" },
          ],
        },
        examples: {
          title: "Currency Conversion Examples",
          description: "Step-by-step conversion calculations",
          examples: [
            {
              title: "USD to EUR Conversion",
              steps: [
                "Amount: $1,000 USD",
                "Exchange rate: 1 USD = 0.92 EUR",
                "Calculation: 1,000 × 0.92 = €920",
                "Bank adds 2% markup: 0.92 × 0.98 = 0.9016",
                "You receive: 1,000 × 0.9016 = €901.60",
                "Hidden fee: €920 - €901.60 = €18.40",
              ],
              result: "You receive €901.60 (bank keeps €18.40 in markup)",
            },
            {
              title: "EUR to MXN Conversion",
              steps: [
                "Amount: €500 EUR",
                "EUR/USD rate: 1.087",
                "USD/MXN rate: 17.15",
                "EUR → USD: 500 × 1.087 = $543.50",
                "USD → MXN: 543.50 × 17.15 = MX$9,321",
                "Direct: 500 × 18.64 = MX$9,321",
              ],
              result: "€500 = approximately MX$9,321",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is the mid-market exchange rate?",
          answer: "The mid-market rate is the midpoint between the buy and sell prices of two currencies on the global market. It's considered the 'real' exchange rate. Banks, airports, and money transfer services add their margin on top of this rate. The difference between what you pay and the mid-market rate is essentially a hidden fee.",
        },
        {
          question: "Why is my bank's exchange rate different?",
          answer: "Banks add a markup (spread) to the mid-market rate to make a profit. This markup typically ranges from 1-5% for online banking and wire transfers, 3-8% for in-branch exchanges, and 5-12% for airport kiosks. Online services like Wise or Revolut typically offer rates closer to the mid-market rate with transparent fees.",
        },
        {
          question: "When is the best time to exchange currency?",
          answer: "Exchange rates fluctuate throughout the day based on market conditions. Generally, rates tend to be most competitive during overlapping trading hours (8am-12pm ET when both European and US markets are open). However, predicting rate movements is extremely difficult — even professional traders can't consistently time the market. For most people, the best strategy is to compare services and find the lowest total cost rather than trying to time the rate.",
        },
        {
          question: "How often do exchange rates change?",
          answer: "For major currency pairs (EUR/USD, GBP/USD, USD/JPY), rates change multiple times per second during trading hours. The forex market operates 24 hours a day, 5 days a week (Sunday 5pm ET to Friday 5pm ET). Weekends and holidays have no trading, so rates stay fixed until markets reopen. Our converter uses reference rates that are updated periodically.",
        },
        {
          question: "What are the most traded currencies in the world?",
          answer: "The top 5 most traded currencies by daily volume are: US Dollar (USD) — involved in 88% of all trades; Euro (EUR) — 31%; Japanese Yen (JPY) — 17%; British Pound (GBP) — 13%; and Chinese Yuan (CNY) — 7%. The USD/EUR pair is the single most traded currency pair, accounting for about 23% of all forex transactions.",
        },
        {
          question: "Is it better to exchange money before or during travel?",
          answer: "Generally, exchanging a small amount before your trip for immediate expenses (taxi, tips) is wise, but use a credit card with no foreign transaction fees for most purchases abroad. ATMs in your destination country often offer better rates than airport exchanges. Avoid exchanging large amounts at airports or hotels — their rates are typically the worst. Compare online services for larger transfers.",
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
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
  },

  inputs: [
    {
      id: "amount",
      type: "number",
      defaultValue: null,
      placeholder: "1000",
      min: 0,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "toCurrency",
      type: "select",
      defaultValue: "EUR",
      options: [
        { value: "USD" }, { value: "EUR" }, { value: "GBP" }, { value: "JPY" },
        { value: "CAD" }, { value: "AUD" }, { value: "CHF" }, { value: "MXN" },
        { value: "BRL" }, { value: "INR" }, { value: "COP" }, { value: "ARS" },
        { value: "PEN" }, { value: "CLP" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "converted", type: "primary", format: "text" },
    { id: "rate", type: "secondary", format: "text" },
    { id: "inverse", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "💱", itemCount: 4 },
    { id: "popular", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "majorCurrencies", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "European Central Bank", year: "2025", title: "Euro Foreign Exchange Reference Rates", source: "ECB", url: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html" },
    { authors: "Bank for International Settlements", year: "2024", title: "Triennial Central Bank Survey of Foreign Exchange", source: "BIS", url: "https://www.bis.org/statistics/rpfx22.htm" },
  ],

  hero: { badge: "Finance", title: "Currency Converter" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["compound-interest", "mortgage"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE — Reference rates (static mid-market approximations)
// ============================================================================

const RATES_TO_USD: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, CAD: 1.36, AUD: 1.53,
  CHF: 0.88, MXN: 17.15, BRL: 4.97, INR: 83.1, COP: 3950, ARS: 870,
  PEN: 3.72, CLP: 935, CNY: 7.24, KRW: 1320, SEK: 10.45, NOK: 10.55,
  DKK: 6.88, NZD: 1.63, SGD: 1.34, HKD: 7.82, TWD: 31.5, THB: 35.2,
  PHP: 56.1, IDR: 15650, MYR: 4.72, VND: 24500, ZAR: 18.7, TRY: 30.2,
  PLN: 4.02, CZK: 22.8, HUF: 355, RON: 4.58, BGN: 1.80, HRK: 6.93,
  RUB: 92, UAH: 37.5, EGP: 30.9, NGN: 1550, KES: 155, GHS: 12.5,
  DOP: 56.8, GTQ: 7.82, HNL: 24.7, NIO: 36.7, CRC: 525, PAB: 1,
  UYU: 39.2, PYG: 7300, BOB: 6.91, VES: 36.5,
};

const SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", CAD: "C$", AUD: "A$",
  CHF: "CHF ", MXN: "MX$", BRL: "R$", INR: "₹", COP: "COL$", ARS: "AR$",
  PEN: "S/", CLP: "CLP ", CNY: "¥", KRW: "₩", SEK: "kr", NOK: "kr",
  DOP: "RD$", GTQ: "Q", CRC: "₡", UYU: "$U",
};

function fmtCurr(val: number, curr: string): string {
  const sym = SYMBOLS[curr] || "";
  if (val >= 1000) return `${sym}${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `${sym}${val.toFixed(val < 1 ? 6 : 2)}`;
}

export function calculateCurrencyConverter(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;

  const amount = values.amount as number | null;
  if (!amount || amount <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromCurr = fieldUnits.amount || "USD";
  const toCurr = values.toCurrency as string || "EUR";

  const fromRate = RATES_TO_USD[fromCurr] || 1;
  const toRate = RATES_TO_USD[toCurr] || 1;

  // Convert: amount in fromCurr → USD → toCurr
  const amountUSD = amount / fromRate;
  const converted = amountUSD * toRate;
  const rate = toRate / fromRate;
  const inverseRate = fromRate / toRate;

  // Popular rates
  const eurRate = RATES_TO_USD["EUR"];
  const gbpRate = RATES_TO_USD["GBP"];
  const jpyRate = RATES_TO_USD["JPY"];
  const mxnRate = RATES_TO_USD["MXN"];

  return {
    values: { converted, rate, inverseRate },
    formatted: {
      converted: fmtCurr(converted, toCurr),
      rate: `1 ${fromCurr} = ${rate < 1 ? rate.toFixed(6) : rate.toFixed(4)} ${toCurr}`,
      inverse: `1 ${toCurr} = ${inverseRate < 1 ? inverseRate.toFixed(6) : inverseRate.toFixed(4)} ${fromCurr}`,
      lastUpdated: "Reference rates (approximate)",
      usdEur: `€${eurRate.toFixed(4)}`,
      usdGbp: `£${gbpRate.toFixed(4)}`,
      usdJpy: `¥${jpyRate.toFixed(2)}`,
      usdMxn: `MX$${mxnRate.toFixed(2)}`,
    },
    summary: `${fmtCurr(amount, fromCurr)} ${fromCurr} = ${fmtCurr(converted, toCurr)} ${toCurr}`,
    isValid: true,
  };
}

export default currencyConverterConfig;
