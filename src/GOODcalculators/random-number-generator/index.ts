import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

// =============================================================================
// RANDOM NUMBER GENERATOR - V4 Engine
// Generate random numbers with various options: range, quantity, no repeats
// Following ALL rules from: ENGINE_V4_COMPLETE_GUIDE.md, RULE_WIDTH_HALF_UPDATE.md,
// KALCUFY_BUG_FIXES_REFERENCE.md
// =============================================================================

export const randomNumberGeneratorConfig: CalculatorConfigV4 = {
  id: "random-number-generator",
  version: "4.0",
  category: "math",
  icon: "🎲",

  // ===========================================================================
  // PRESETS - ALWAYS include icon (RULE from ENGINE_V4)
  // ===========================================================================
  presets: [
    {
      id: "coinFlip",
      icon: "🪙",
      values: {
        minValue: 1,
        maxValue: 2,
        quantity: 1,
        allowRepeats: "yes",
        sortResults: "no",
      },
    },
    {
      id: "diceRoll",
      icon: "🎲",
      values: {
        minValue: 1,
        maxValue: 6,
        quantity: 1,
        allowRepeats: "yes",
        sortResults: "no",
      },
    },
    {
      id: "lottery6of49",
      icon: "🎱",
      values: {
        minValue: 1,
        maxValue: 49,
        quantity: 6,
        allowRepeats: "no",
        sortResults: "yes",
      },
    },
    {
      id: "percentage",
      icon: "📊",
      values: {
        minValue: 1,
        maxValue: 100,
        quantity: 1,
        allowRepeats: "yes",
        sortResults: "no",
      },
    },
  ],

  // ===========================================================================
  // TRANSLATIONS - English only (script translates later)
  // ===========================================================================
  t: {
    en: {
      name: "Random Number Generator",
      slug: "random-number-generator",
      subtitle:
        "Generate random numbers instantly. Set your range, quantity, and options for lottery picks, dice rolls, or any random selection.",
      breadcrumb: "Random Number",

      // SEO: title 50-60 chars, description 120-155 chars, keywords 5-8
      seo: {
        title: "Random Number Generator - Free Online Number Picker",
        description:
          "Generate random numbers instantly. Pick lottery numbers, roll dice, or create random selections with customizable range and quantity options.",
        shortDescription: "Generate random numbers within any range",
        keywords: [
          "random number generator",
          "random number picker",
          "lottery number generator",
          "dice roller",
          "random selection",
          "number randomizer",
          "free random generator",
          "random integer generator",
        ],
      },

      calculator: { yourInformation: "Generator Settings" },
      ui: {
        yourInformation: "Generator Settings",
        calculate: "Generate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        minValue: {
          label: "Minimum Value",
          helpText: "Lowest number in the range (inclusive)",
        },
        maxValue: {
          label: "Maximum Value",
          helpText: "Highest number in the range (inclusive)",
        },
        quantity: {
          label: "Quantity",
          helpText: "How many random numbers to generate",
        },
        allowRepeats: {
          label: "Allow Repeats",
          helpText: "Can the same number appear multiple times?",
          options: {
            yes: "Yes (with replacement)",
            no: "No (unique numbers only)",
          },
        },
        sortResults: {
          label: "Sort Results",
          helpText: "Sort the generated numbers",
          options: {
            yes: "Yes (ascending)",
            no: "No (random order)",
          },
        },
        excludeNumbers: {
          label: "Exclude Numbers",
          helpText: "Numbers to exclude (comma-separated)",
        },
      },

      results: {
        randomNumbers: { label: "Random Numbers" },
        range: { label: "Range" },
        quantity: { label: "Quantity" },
        sum: { label: "Sum" },
        average: { label: "Average" },
      },

      presets: {
        coinFlip: {
          label: "Coin Flip",
          description: "1 = Heads, 2 = Tails",
        },
        diceRoll: {
          label: "Dice Roll",
          description: "Roll a 6-sided die",
        },
        lottery6of49: {
          label: "Lottery 6/49",
          description: "Pick 6 numbers from 1-49",
        },
        percentage: {
          label: "Random %",
          description: "Random 1-100",
        },
      },

      // CRITICAL: All units/labels for calculate() - NO HARDCODING
      values: {
        "to": "to",
        "numbers": "numbers",
        "number": "number",
        "sum": "Sum",
        "average": "Average",
        "range": "Range",
        "generated": "Generated",
      },

      formats: {
        summary: "Generated: {numbers}",
        range: "{min} to {max}",
      },

      // INFO CARDS: 2 list + 1 horizontal tips (tips ALWAYS last)
      infoCards: {
        results: {
          title: "Generated Numbers",
          items: [
            { label: "Numbers", valueKey: "randomNumbers" },
            { label: "Range", valueKey: "range" },
            { label: "Sum", valueKey: "sum" },
            { label: "Average", valueKey: "average" },
          ],
        },
        stats: {
          title: "Statistics",
          items: [
            { label: "Quantity", valueKey: "quantity" },
            { label: "Minimum", valueKey: "minGenerated" },
            { label: "Maximum", valueKey: "maxGenerated" },
            { label: "Spread", valueKey: "spread" },
          ],
        },
        tips: {
          title: "Quick Tips",
          items: [
            "Use 'No Repeats' for lottery-style draws",
            "Coin flip: set range 1-2 (1=Heads, 2=Tails)",
            "Dice roll: set range 1-6 for standard die",
            "Click Generate again for new random numbers",
          ],
        },
      },

      // EDUCATION: 2 prose + 2 list + 1 code-example
      education: {
        whatIs: {
          title: "What is a Random Number Generator?",
          content:
            "A random number generator (RNG) is a tool that produces numbers without any predictable pattern. True randomness is surprisingly difficult to achieve — even in nature, most phenomena follow statistical patterns. Computer-based RNGs use complex algorithms called pseudo-random number generators (PRNGs) that produce sequences of numbers that appear random for practical purposes. While not truly random in a philosophical sense, modern PRNGs are sufficient for games, simulations, sampling, and most everyday applications.",
        },
        howItWorks: {
          title: "How Random Number Generation Works",
          content:
            "Our random number generator uses cryptographically secure algorithms built into modern web browsers. When you click Generate, the system creates random numbers within your specified range. For 'no repeats' mode, it uses a shuffling algorithm similar to dealing cards — once a number is picked, it's removed from the pool. The quality of randomness is high enough for fair games, random selections, and statistical sampling, though not suitable for cryptographic security applications.",
        },
        useCases: {
          title: "Common Use Cases",
          items: [
            { text: "Lottery: Pick unique numbers from a range (e.g., 6 from 1-49)", type: "info" },
            { text: "Games: Roll dice, flip coins, draw cards", type: "info" },
            { text: "Raffles: Pick random winners from numbered entries", type: "info" },
            { text: "Decisions: Let chance decide between options", type: "info" },
            { text: "Testing: Generate random test data or samples", type: "warning" },
            { text: "Statistics: Random sampling for surveys or studies", type: "warning" },
          ],
        },
        fairness: {
          title: "Ensuring Fairness",
          items: [
            { text: "Each number has equal probability of being selected", type: "info" },
            { text: "Previous results don't affect future outcomes", type: "info" },
            { text: "No pattern or sequence can be predicted", type: "info" },
            { text: "'No repeats' ensures every number appears at most once", type: "info" },
            { text: "Results are generated client-side (in your browser)", type: "info" },
            { text: "Refresh or generate again for completely new results", type: "info" },
          ],
        },
        examples: {
          title: "Example Use Cases",
          description: "How to use the random number generator",
          examples: [
            {
              title: "Pick 6 Lottery Numbers (1-49)",
              steps: [
                "Set Minimum: 1",
                "Set Maximum: 49",
                "Set Quantity: 6",
                "Allow Repeats: No",
                "Sort Results: Yes (optional)",
              ],
              result: "Example: 7, 14, 23, 31, 38, 45",
            },
            {
              title: "Roll 3 Six-Sided Dice",
              steps: [
                "Set Minimum: 1",
                "Set Maximum: 6",
                "Set Quantity: 3",
                "Allow Repeats: Yes",
                "Click Generate",
              ],
              result: "Example: 2, 5, 3 (Sum: 10)",
            },
          ],
        },
      },

      // FAQs: 6+ required
      faqs: [
        {
          question: "How do I generate a random number between 1 and 100?",
          answer:
            "Set the Minimum Value to 1 and Maximum Value to 100, keep Quantity at 1, and click Generate. You'll get a random integer between 1 and 100, inclusive.",
        },
        {
          question: "How do I pick lottery numbers?",
          answer:
            "Set your range (e.g., 1-49), set Quantity to how many numbers you need (e.g., 6), select 'No' for Allow Repeats, and optionally sort the results. This ensures unique numbers like a real lottery draw.",
        },
        {
          question: "Are the numbers truly random?",
          answer:
            "The generator uses cryptographically secure pseudo-random algorithms that produce statistically random results. While not 'true' random (which requires physical phenomena), they're perfectly suitable for games, selections, and most applications.",
        },
        {
          question: "What's the difference between 'Allow Repeats' Yes and No?",
          answer:
            "'Yes' (with replacement) means the same number can appear multiple times, like rolling dice. 'No' (without replacement) ensures each number appears only once, like drawing from a deck of cards or picking lottery numbers.",
        },
        {
          question: "Why can't I generate more numbers than my range allows?",
          answer:
            "When 'Allow Repeats' is off, you can only generate as many unique numbers as exist in your range. For example, with range 1-10, you can generate at most 10 unique numbers. Enable 'Allow Repeats' to generate more.",
        },
        {
          question: "How do I exclude specific numbers from the results?",
          answer:
            "Enter the numbers you want to exclude in the 'Exclude Numbers' field, separated by commas (e.g., '7, 13, 21'). These numbers will never appear in your generated results.",
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
        calculate: "Generate",
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
        mobileResults: "Results",
        closeModal: "Close",
        openMenu: "Menu",
      },
      sources: { title: "Sources & References" },
    },
  },

  // ===========================================================================
  // INPUTS - Smart Defaults: sensible defaults for quick use
  // ===========================================================================
  inputs: [
    {
      id: "minValue",
      type: "number",
      defaultValue: 1,
      placeholder: "1",
      min: -1000000,
      max: 1000000,
    },
    {
      id: "maxValue",
      type: "number",
      defaultValue: 100,
      placeholder: "100",
      min: -1000000,
      max: 1000000,
    },
    {
      id: "quantity",
      type: "number",
      defaultValue: 1,
      placeholder: "1",
      min: 1,
      max: 1000,
    },
    {
      id: "allowRepeats",
      type: "radio",
      defaultValue: "yes",
      options: [
        { value: "yes" },
        { value: "no" },
      ],
    },
    {
      id: "sortResults",
      type: "radio",
      defaultValue: "no",
      options: [
        { value: "yes" },
        { value: "no" },
      ],
    },
    {
      id: "excludeNumbers",
      type: "text",
      defaultValue: "",
      placeholder: "e.g., 7, 13, 21",
    },
  ],

  // EMPTY - no accordions (RULE from ENGINE_V4)
  inputGroups: [],

  // ===========================================================================
  // RESULTS
  // ===========================================================================
  results: [
    { id: "randomNumbers", type: "primary", format: "text" },
    { id: "sum", type: "secondary", format: "number" },
    { id: "average", type: "secondary", format: "number" },
  ],

  // ===========================================================================
  // INFO CARDS - 2 list + 1 horizontal tips (tips ALWAYS last)
  // ===========================================================================
  infoCards: [
    { id: "results", type: "list", icon: "🎲", itemCount: 4 },
    { id: "stats", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // EMPTY - use Dual List instead (RULE from ENGINE_V4)
  referenceData: [],

  // ===========================================================================
  // EDUCATION - 2 prose + 2 list + 1 code-example (RULE from ENGINE_V4)
  // ===========================================================================
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "useCases", type: "list", icon: "📋", itemCount: 6 },
    { id: "fairness", type: "list", icon: "⚖️", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ===========================================================================
  // FAQs - 6+ required (RULE from ENGINE_V4)
  // ===========================================================================
  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ],

  // ===========================================================================
  // REFERENCES - 2+ required (RULE from ENGINE_V4)
  // ===========================================================================
  references: [
    {
      authors: "NIST",
      year: "2024",
      title: "Random Number Generation",
      source: "National Institute of Standards and Technology",
      url: "https://csrc.nist.gov/projects/random-bit-generation",
    },
    {
      authors: "Mozilla Developer Network",
      year: "2024",
      title: "Web Crypto API - getRandomValues()",
      source: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues",
    },
  ],

  // ===========================================================================
  // LAYOUT SECTIONS
  // ===========================================================================
  hero: {
    showBadge: true,
    showRating: true,
  },
  sidebar: {
    showTips: true,
    showRelated: true,
  },
  features: {
    showPdfExport: true,
    showSaveResults: true,
  },
  relatedCalculators: ["percentage", "probability", "statistics"],
  ads: {
    showSidebarAd: true,
    showFooterAd: true,
  },
};

// =============================================================================
// CALCULATE FUNCTION
// - Use v["key"] for ALL units - NO hardcoding
// - Handle null values from Smart Defaults
// - Return isValid: false if missing required fields
// =============================================================================

// Helper: Generate cryptographically secure random integer
function getSecureRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  const array = new Uint32Array(1);
  
  // Use crypto API if available, fallback to Math.random
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(array);
    return min + (array[0] % range);
  }
  
  return Math.floor(Math.random() * range) + min;
}

// Helper: Shuffle array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function calculateRandomNumber(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;

  // Get translations - NEVER hardcode
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const min = values.minValue as number;
  const max = values.maxValue as number;
  const quantity = values.quantity as number;
  const allowRepeats = values.allowRepeats === "yes";
  const sortResults = values.sortResults === "yes";
  const excludeStr = (values.excludeNumbers as string) || "";

  // Validate inputs
  if (min === null || min === undefined || max === null || max === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  if (min > max) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Parse excluded numbers
  const excludeNumbers = new Set<number>();
  if (excludeStr.trim()) {
    excludeStr.split(",").forEach((s) => {
      const num = parseInt(s.trim(), 10);
      if (!isNaN(num)) {
        excludeNumbers.add(num);
      }
    });
  }

  // Build available number pool
  const availableNumbers: number[] = [];
  for (let i = min; i <= max; i++) {
    if (!excludeNumbers.has(i)) {
      availableNumbers.push(i);
    }
  }

  // Check if we have enough numbers
  if (!allowRepeats && quantity > availableNumbers.length) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Generate random numbers
  let randomNumbers: number[] = [];

  if (allowRepeats) {
    // With replacement - can pick same number multiple times
    for (let i = 0; i < quantity; i++) {
      const idx = getSecureRandomInt(0, availableNumbers.length - 1);
      randomNumbers.push(availableNumbers[idx]);
    }
  } else {
    // Without replacement - each number only once
    const shuffled = shuffleArray(availableNumbers);
    randomNumbers = shuffled.slice(0, quantity);
  }

  // Sort if requested
  if (sortResults) {
    randomNumbers.sort((a, b) => a - b);
  }

  // Calculate statistics
  const sum = randomNumbers.reduce((acc, n) => acc + n, 0);
  const average = sum / randomNumbers.length;
  const minGenerated = Math.min(...randomNumbers);
  const maxGenerated = Math.max(...randomNumbers);
  const spread = maxGenerated - minGenerated;

  // Get translated units
  const numbersLabel = quantity === 1 ? (v["number"] || "number") : (v["numbers"] || "numbers");
  const toLabel = v["to"] || "to";
  const sumLabel = v["sum"] || "Sum";
  const avgLabel = v["average"] || "Average";

  // Format output
  const numbersFormatted = randomNumbers.join(", ");
  const rangeFormatted = f.range?.replace("{min}", min.toString()).replace("{max}", max.toString()) || 
    `${min} ${toLabel} ${max}`;

  const summary = f.summary?.replace("{numbers}", numbersFormatted) || 
    `Generated: ${numbersFormatted}`;

  return {
    values: {
      randomNumbers,
      sum,
      average,
      minGenerated,
      maxGenerated,
      spread,
    },
    formatted: {
      randomNumbers: numbersFormatted,
      range: rangeFormatted,
      quantity: `${quantity} ${numbersLabel}`,
      sum: `${sumLabel}: ${sum}`,
      average: `${avgLabel}: ${average.toFixed(2)}`,
      minGenerated: minGenerated.toString(),
      maxGenerated: maxGenerated.toString(),
      spread: spread.toString(),
    },
    summary,
    isValid: true,
  };
}

export default randomNumberGeneratorConfig;
