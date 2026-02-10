import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─────────────────────────────────────────────────────────────────────────────
// Password Generator Calculator — V4.3
// Modes: Random Password, Passphrase, PIN
// Features: Crack time estimation (4 scenarios), entropy, strength score
// ─────────────────────────────────────────────────────────────────────────────

// Compact EFF-inspired word list (200 words, 4-8 chars, easy to remember)
const WORD_LIST = [
  "apple","arrow","badge","beach","bells","blade","blank","blaze","blend","block",
  "bloom","board","bonus","brave","bread","brick","brief","bring","broad","brown",
  "brush","burst","cabin","cable","candy","cargo","cedar","chain","chair","charm",
  "chase","chess","chief","chill","civil","claim","clash","clean","clear","climb",
  "clock","close","cloud","coast","coral","couch","could","craft","crane","crash",
  "cream","crisp","cross","crown","crush","curve","cycle","dance","dealt","delta",
  "depth","diary","digit","draft","drain","drawn","dream","dress","drift","drink",
  "drive","drone","earth","eight","elite","ember","equal","event","exact","extra",
  "fable","faith","feast","fiber","field","final","flame","flash","fleet","float",
  "flood","floor","fluid","focal","forge","forum","frame","fresh","front","frost",
  "fruit","given","glade","glass","gleam","globe","glyph","grace","grain","grand",
  "grant","graph","grasp","gravel","green","grind","grove","guard","guide","haven",
  "heart","honey","house","human","hyper","index","inner","ivory","jewel","judge",
  "juice","karma","knack","knife","knock","label","large","layer","lemon","level",
  "light","linen","logic","lotus","lunar","magic","manor","maple","march","match",
  "media","melon","mercy","merit","metal","might","minor","model","mount","music",
  "nerve","noble","north","noted","novel","ocean","olive","onset","opera","orbit",
  "order","outer","oxide","panel","patch","pearl","phase","piano","pilot","pixel",
  "place","plain","plane","plant","plate","plaza","plumb","point","polar","power",
  "press","pride","prime","print","prize","probe","proud","prism","pulse","quake",
];

export const passwordGeneratorConfig: CalculatorConfigV4 = {
  id: "password-generator",
  version: "4.3",
  category: "technology",
  icon: "🔐",

  presets: [
    {
      id: "strong",
      icon: "🛡️",
      values: { mode: "password", length: 20, includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSymbols: true, avoidAmbiguous: false, wordCount: 4, separator: "-", capitalizeWords: true, includeWordNumber: true, pinLength: 6 },
    },
    {
      id: "memorable",
      icon: "🧠",
      values: { mode: "passphrase", length: 16, includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSymbols: false, avoidAmbiguous: false, wordCount: 5, separator: "-", capitalizeWords: true, includeWordNumber: true, pinLength: 6 },
    },
    {
      id: "noSymbols",
      icon: "📝",
      values: { mode: "password", length: 24, includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSymbols: false, avoidAmbiguous: true, wordCount: 4, separator: "-", capitalizeWords: true, includeWordNumber: true, pinLength: 6 },
    },
    {
      id: "quickPin",
      icon: "📱",
      values: { mode: "pin", length: 16, includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSymbols: true, avoidAmbiguous: false, wordCount: 4, separator: "-", capitalizeWords: true, includeWordNumber: true, pinLength: 6 },
    },
  ],

  t: {
    en: {
      name: "Password Generator",
      slug: "password-generator-calculator",
      subtitle: "Generate strong random passwords, memorable passphrases, and secure PINs with real-time strength analysis and crack time estimates.",
      breadcrumb: "Password Generator",

      seo: {
        title: "Password Generator - Strong Random Passwords & Passphrases",
        description: "Generate strong, random passwords and passphrases with crack time estimates, entropy analysis, and strength scoring. Free tool with password, passphrase, and PIN modes.",
        shortDescription: "Generate strong random passwords with strength analysis.",
        keywords: [
          "password generator",
          "strong password generator",
          "random password generator",
          "passphrase generator",
          "secure password creator",
          "password strength checker",
          "password entropy calculator",
          "free password generator",
        ],
      },

      calculator: { yourInformation: "Password Settings" },
      ui: {
        yourInformation: "Password Settings",
        calculate: "Generate",
        reset: "Reset",
        results: "Generated Password",
      },

      inputs: {
        mode: {
          label: "Generation Mode",
          helpText: "Choose between random characters, memorable word combinations, or numeric PINs",
          options: {
            password: "Random Password",
            passphrase: "Passphrase (Words)",
            pin: "PIN (Numbers Only)",
          },
        },
        length: {
          label: "Password Length",
          helpText: "Longer passwords are exponentially harder to crack — 16+ recommended",
        },
        includeUppercase: {
          label: "Uppercase Letters (A–Z)",
          helpText: "Include capital letters to increase character set",
        },
        includeLowercase: {
          label: "Lowercase Letters (a–z)",
          helpText: "Include lowercase letters",
        },
        includeNumbers: {
          label: "Numbers (0–9)",
          helpText: "Include digits",
        },
        includeSymbols: {
          label: "Symbols (!@#$%...)",
          helpText: "Include special characters for maximum entropy",
        },
        avoidAmbiguous: {
          label: "Avoid Ambiguous Characters",
          helpText: "Exclude similar-looking characters: 0/O, l/1/I, S/5, B/8",
        },
        wordCount: {
          label: "Number of Words",
          helpText: "More words = stronger passphrase — 4+ recommended",
        },
        separator: {
          label: "Word Separator",
          helpText: "Character between words",
          options: {
            "-": "Hyphen ( - )",
            ".": "Dot ( . )",
            "_": "Underscore ( _ )",
            " ": "Space",
            "": "None",
          },
        },
        capitalizeWords: {
          label: "Capitalize Words",
          helpText: "Capitalize first letter of each word (e.g., Apple-Brave-Chess)",
        },
        includeWordNumber: {
          label: "Add Number to Passphrase",
          helpText: "Append a random digit to one word for extra entropy",
        },
        pinLength: {
          label: "PIN Length",
          helpText: "6+ digits recommended — 4-digit PINs are weak",
        },
      },

      results: {
        generatedPassword: { label: "Your Password" },
        strengthScore: { label: "Strength" },
        entropyBits: { label: "Entropy" },
        charsetSize: { label: "Character Set Size" },
        totalCombinations: { label: "Possible Combinations" },
        crackTimeOnline: { label: "Crack Time (Online, Throttled)" },
        crackTimeOfflineSlow: { label: "Crack Time (Offline, Slow Hash)" },
        crackTimeOfflineFast: { label: "Crack Time (Offline, Fast Hash)" },
      },

      presets: {
        strong: { label: "Strong Password", description: "20 chars, all character types — maximum security" },
        memorable: { label: "Memorable Passphrase", description: "5 words with numbers — easy to remember, hard to crack" },
        noSymbols: { label: "No Symbols (24 chars)", description: "Letters + numbers only — for sites that block symbols" },
        quickPin: { label: "Quick PIN", description: "6-digit numeric PIN for apps and devices" },
      },

      values: {
        "veryWeak": "🔴 Very Weak",
        "weak": "🟠 Weak",
        "fair": "🟡 Fair",
        "strong": "🟢 Strong",
        "veryStrong": "🟣 Very Strong",
        "instant": "Instantly",
        "seconds": "seconds",
        "minutes": "minutes",
        "hours": "hours",
        "days": "days",
        "months": "months",
        "years": "years",
        "centuries": "centuries",
        "millennia": "millennia",
        "forever": "Longer than the age of the universe",
        "bits": "bits",
        "characters": "characters",
      },

      formats: {
        summary: "Generated {mode} with {entropyBits} bits of entropy. Strength: {strengthScore}. Offline fast hash crack time: {crackTimeOfflineFast}.",
      },

      infoCards: {
        metrics: {
          title: "Strength Analysis",
          items: [
            { label: "Strength", valueKey: "strengthScore" },
            { label: "Entropy", valueKey: "entropyBits" },
            { label: "Character Set", valueKey: "charsetSize" },
            { label: "Combinations", valueKey: "totalCombinations" },
          ],
        },
        details: {
          title: "Crack Time Estimates",
          items: [
            { label: "Online (Throttled)", valueKey: "crackTimeOnline" },
            { label: "Offline (Slow Hash)", valueKey: "crackTimeOfflineSlow" },
            { label: "Offline (Fast Hash)", valueKey: "crackTimeOfflineFast" },
            { label: "Strength", valueKey: "strengthScore" },
          ],
        },
        tips: {
          title: "Password Security Tips",
          items: [
            "Use 16+ characters — each extra character makes your password exponentially harder to crack.",
            "Never reuse passwords across sites — one breach exposes all accounts sharing that password.",
            "Passphrases like Apple-Brave7-Chess-Delta are both strong and memorable.",
            "Enable two-factor authentication (2FA) even with strong passwords for critical accounts.",
          ],
        },
      },

      chart: {
        title: "Crack Time Analysis",
        tabs: {
          "crack-scenarios": "Attack Scenarios",
          "length-comparison": "Length vs Crack Time",
        },
      },

      education: {
        whatIs: {
          title: "What Makes a Password Strong?",
          content: "A strong password has three essential qualities: length, complexity, and uniqueness. Length is the single most important factor — each additional character multiplies the number of possible combinations exponentially. A 12-character password using all character types (lowercase, uppercase, numbers, symbols) has about 475 trillion trillion possible combinations, while an 8-character password has only 6 quadrillion — roughly 79 billion times fewer possibilities. Complexity comes from using a diverse character set: lowercase letters provide 26 options per position, adding uppercase doubles it to 52, digits bring it to 62, and symbols push it to 94 or more. But length trumps complexity every time: a 20-character lowercase-only password (2.0 × 10²⁸ combinations) is vastly stronger than an 8-character password using all character types (6.1 × 10¹⁵ combinations). Uniqueness means never reusing a password — if one service suffers a data breach, attackers will try that same password on every other site you use through credential stuffing attacks.",
        },
        howItWorks: {
          title: "How Password Entropy Works",
          content: "Entropy, measured in bits, quantifies the randomness in a password. The formula is: entropy = length × log₂(charset_size). A 16-character password using the full 94-character set (lowercase + uppercase + numbers + symbols) has about 104.8 bits of entropy. Every additional bit of entropy doubles the number of guesses an attacker needs to make. For context: 40 bits of entropy can be cracked in seconds by modern hardware, 60 bits takes hours, 80 bits takes years, and 128+ bits is considered uncrackable with current technology. Passphrases derive their entropy differently — from a word list size raised to the power of the word count. A 4-word passphrase from a 200-word list has log₂(200⁴) ≈ 30.6 bits, while 5 words gives ~38.2 bits. Adding capitalization, separators, and random numbers significantly boosts passphrase entropy. The key insight: entropy must come from truly random selection. A human choosing 'Password123!' might use uppercase, lowercase, numbers, and symbols, but it has near-zero effective entropy because it follows an extremely predictable pattern.",
        },
        considerations: {
          title: "Password Best Practices",
          items: [
            { text: "Use 16+ characters for passwords and 5+ words for passphrases — length is the strongest defense against brute force attacks.", type: "info" },
            { text: "Enable 2FA on all critical accounts (email, banking, social media) — even a compromised password cannot bypass a second factor.", type: "warning" },
            { text: "Use a password manager to generate and store unique passwords for every account — humans cannot reliably remember dozens of strong passwords.", type: "info" },
            { text: "Never share passwords via email, text, or chat — these channels can be intercepted or stored in plaintext.", type: "warning" },
            { text: "Check if your passwords have been exposed in data breaches using services like Have I Been Pwned (haveibeenpwned.com).", type: "info" },
            { text: "Avoid personal information in passwords — names, birthdays, pet names, and addresses are the first things attackers try.", type: "warning" },
          ],
        },
        categories: {
          title: "Attack Methods & Crack Times",
          items: [
            { text: "Online Throttled (100/hr): Web login forms with rate limiting — even short passwords survive days. Most sites use this.", type: "info" },
            { text: "Online Unthrottled (10/sec): APIs without rate limits — weak passwords fall in hours. Always add rate limiting.", type: "info" },
            { text: "Offline Slow Hash (10K/sec): bcrypt/Argon2 hashed database leaks — well-designed systems make each guess expensive.", type: "info" },
            { text: "Offline Fast Hash (10B/sec): MD5/SHA-1 hashed leaks — modern GPUs test billions of combinations per second.", type: "warning" },
            { text: "Dictionary Attack: Tries common words, names, patterns first — 'Password123!' falls instantly despite mixed characters.", type: "warning" },
            { text: "Credential Stuffing: Uses breached password lists on other sites — reused passwords enable cascading account compromise.", type: "warning" },
          ],
        },
        examples: {
          title: "Password Strength Examples",
          description: "Compare real password strengths",
          examples: [
            {
              title: "Weak vs Strong Passwords",
              steps: [
                "❌ 'password123' → 0 bits entropy (dictionary word) → Cracked INSTANTLY",
                "❌ 'Tr0ub4dor&3' → ~28 bits (common substitutions) → Cracked in SECONDS",
                "⚠️ 'xK9#mL2$' (8 chars, all types) → 52.4 bits → Cracked in 6 hours (fast hash)",
                "✅ 'aX7$mK9#pL2&nR5!' (16 chars) → 104.8 bits → 394 billion years (fast hash)",
                "✅ 'Apple-Brave7-Chess-Delta' (passphrase) → ~45 bits → years (fast hash)",
                "✅ 'Frost-Gleam4-Haven-Jewel-Light' (5 words) → ~55 bits → centuries",
              ],
              result: "Length matters most. A 16-char password with all types is essentially uncrackable.",
            },
            {
              title: "Entropy Math Example",
              steps: [
                "Password: 16 characters using lowercase + uppercase + numbers + symbols",
                "Character set size: 26 + 26 + 10 + 32 = 94 characters",
                "Entropy = 16 × log₂(94) = 16 × 6.55 = 104.8 bits",
                "Total combinations = 94¹⁶ = 3.7 × 10³¹",
                "At 10 billion guesses/sec: 3.7 × 10³¹ ÷ 10¹⁰ = 3.7 × 10²¹ seconds",
                "That's approximately 117 trillion years to try all combinations",
              ],
              result: "Average crack time = half of total = ~59 trillion years. Your password is safe.",
            },
          ],
        },
      },

      faqs: {
        "0": {
          question: "How does this password generator work?",
          answer: "This tool uses cryptographic-quality randomness to generate passwords. For random passwords, it selects characters from your chosen character set (uppercase, lowercase, numbers, symbols) with equal probability. For passphrases, it randomly picks words from a curated 200-word list. For PINs, it generates random digits. All generation happens locally in your browser — no passwords are ever sent to any server or stored anywhere.",
        },
        "1": {
          question: "What password length should I use?",
          answer: "For random passwords, use at least 16 characters with all character types enabled. This gives over 104 bits of entropy, making brute-force attacks infeasible. For passphrases, use at least 4-5 words with a separator and number. For PINs, use 6+ digits — 4-digit PINs have only 10,000 combinations, which can be cracked in seconds. The general rule: longer is always stronger, and every extra character multiplies security exponentially.",
        },
        "2": {
          question: "What do the crack time estimates mean?",
          answer: "We estimate crack times for three scenarios: Online Throttled assumes 100 guesses per hour (typical web login with rate limiting). Offline Slow Hash assumes 10,000 guesses per second (a leaked database using bcrypt or Argon2). Offline Fast Hash assumes 10 billion guesses per second (a leaked database using weak MD5 or SHA-1 hashing, cracked on modern GPUs). The offline fast hash scenario is the most dangerous and most realistic for data breaches.",
        },
        "3": {
          question: "Is a passphrase better than a random password?",
          answer: "Passphrases and random passwords serve different needs. A 5-word passphrase like 'Frost-Gleam4-Haven-Jewel-Light' is easy to type and memorize, with decent entropy (~55 bits). A 16-character random password like 'aX7$mK9#pL2&nR5!' has higher entropy (~105 bits) but is harder to remember. If you use a password manager, choose random passwords for maximum security. If you need to memorize it (like a master password), use a long passphrase with 5+ words.",
        },
        "4": {
          question: "What is password entropy?",
          answer: "Entropy measures the randomness of a password in bits. It's calculated as: length × log₂(character_set_size). Higher entropy means more possible combinations and longer crack times. Key thresholds: under 40 bits is very weak (crackable in minutes), 40-59 bits is weak, 60-79 bits is fair, 80-99 bits is strong, and 100+ bits is very strong (essentially uncrackable with current technology). Each additional bit doubles the number of guesses needed.",
        },
        "5": {
          question: "Should I avoid ambiguous characters?",
          answer: "The 'Avoid Ambiguous Characters' option removes characters that look similar in many fonts: 0 (zero) vs O (letter), l (lowercase L) vs 1 (one) vs I (uppercase i), S vs 5, B vs 8. Enable this when you might need to read or dictate the password aloud, copy it by hand, or use it on systems with hard-to-read fonts. The slight reduction in character set has minimal impact on security if you compensate with a slightly longer password.",
        },
      },

      detailedTable: {
        crackTimeReference: {
          button: "View Full Crack Time Reference",
          title: "Password Crack Time by Length & Character Type",
          columns: {
            length: "Length",
            lowercase: "Lowercase Only",
            mixed: "Mixed Case",
            mixedNum: "+ Numbers",
            all: "All Characters",
          },
        },
      },

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
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
  },

  inputs: [
    {
      id: "mode",
      type: "select",
      defaultValue: "password",
      options: [
        { value: "password" },
        { value: "passphrase" },
        { value: "pin" },
      ],
    },

    // ── Password mode inputs ──────────────────────────────────────────────
    {
      id: "length",
      type: "number",
      defaultValue: 16,
      min: 4,
      max: 128,
      step: 1,
      showWhen: { field: "mode", value: "password" },
    },
    {
      id: "includeUppercase",
      type: "toggle",
      defaultValue: true,
      showWhen: { field: "mode", value: "password" },
    },
    {
      id: "includeLowercase",
      type: "toggle",
      defaultValue: true,
      showWhen: { field: "mode", value: "password" },
    },
    {
      id: "includeNumbers",
      type: "toggle",
      defaultValue: true,
      showWhen: { field: "mode", value: "password" },
    },
    {
      id: "includeSymbols",
      type: "toggle",
      defaultValue: true,
      showWhen: { field: "mode", value: "password" },
    },
    {
      id: "avoidAmbiguous",
      type: "toggle",
      defaultValue: false,
      showWhen: { field: "mode", value: "password" },
    },

    // ── Passphrase mode inputs ────────────────────────────────────────────
    {
      id: "wordCount",
      type: "number",
      defaultValue: 4,
      min: 3,
      max: 10,
      step: 1,
      showWhen: { field: "mode", value: "passphrase" },
    },
    {
      id: "separator",
      type: "select",
      defaultValue: "-",
      options: [
        { value: "-" },
        { value: "." },
        { value: "_" },
        { value: " " },
        { value: "" },
      ],
      showWhen: { field: "mode", value: "passphrase" },
    },
    {
      id: "capitalizeWords",
      type: "toggle",
      defaultValue: true,
      showWhen: { field: "mode", value: "passphrase" },
    },
    {
      id: "includeWordNumber",
      type: "toggle",
      defaultValue: true,
      showWhen: { field: "mode", value: "passphrase" },
    },

    // ── PIN mode inputs ───────────────────────────────────────────────────
    {
      id: "pinLength",
      type: "number",
      defaultValue: 6,
      min: 4,
      max: 12,
      step: 1,
      showWhen: { field: "mode", value: "pin" },
    },
  ],
  inputGroups: [],

  results: [
    { id: "generatedPassword", type: "primary", format: "text" },
    { id: "strengthScore", type: "secondary", format: "text" },
    { id: "entropyBits", type: "secondary", format: "text" },
    { id: "charsetSize", type: "secondary", format: "text" },
    { id: "totalCombinations", type: "secondary", format: "text" },
    { id: "crackTimeOnline", type: "secondary", format: "text" },
    { id: "crackTimeOfflineSlow", type: "secondary", format: "text" },
    { id: "crackTimeOfflineFast", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "⏱️", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  detailedTable: {
    id: "crackTimeReference",
    buttonLabel: "View Full Crack Time Reference",
    buttonIcon: "📋",
    modalTitle: "Password Crack Time by Length & Character Type",
    columns: [
      { id: "length", label: "Length", align: "center" },
      { id: "lowercase", label: "Lowercase Only", align: "right" },
      { id: "mixed", label: "Mixed Case", align: "right" },
      { id: "mixedNum", label: "+ Numbers", align: "right" },
      { id: "all", label: "All Characters", align: "right", highlight: true },
    ],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "🔓", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "Grassi, P.A., Fenton, J.L., Newton, E.M. et al.",
      year: "2024",
      title: "Digital Identity Guidelines: Authentication and Lifecycle Management (SP 800-63B)",
      source: "NIST Special Publication",
      url: "https://pages.nist.gov/800-63-4/sp800-63b.html",
    },
    {
      authors: "Wheeler, D.L.",
      year: "2016",
      title: "zxcvbn: Low-Budget Password Strength Estimation",
      source: "USENIX Security Symposium",
      url: "https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/wheeler",
    },
  ],

  chart: {
    title: "Crack Time Analysis",
    xKey: "name",
    type: "bar",
    stacked: false,
    tabs: [
      {
        id: "crack-scenarios",
        label: "Attack Scenarios",
        series: [
          { key: "value", name: "Time (log₁₀ seconds)", color: "#EF4444" },
        ],
      },
      {
        id: "length-comparison",
        label: "Length vs Entropy",
        series: [
          { key: "value", name: "Entropy (bits)", color: "#3B82F6" },
        ],
      },
    ],
  },

  hero: {
    showRating: true,
    showShare: true,
  },
  sidebar: {
    showAds: true,
    showRelated: true,
  },
  features: {
    save: true,
    pdf: true,
    csv: true,
    excel: true,
  },
  relatedCalculators: ["ip-subnet", "bandwidth", "hash-generator", "uuid-generator"],
  ads: {
    sidebar: true,
    footer: true,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  uppercaseNoAmbig: "ACDEFGHJKLMNPQRTUVWXY",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  lowercaseNoAmbig: "acdefghjkmnpqrtuvwxy",
  numbers: "0123456789",
  numbersNoAmbig: "2346789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?/~`",
};

function generatePassword(length: number, charset: string): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset[Math.floor(Math.random() * charset.length)];
  }
  return result;
}

function generatePassphrase(
  wordCount: number,
  separator: string,
  capitalize: boolean,
  includeNumber: boolean,
): string {
  const words: string[] = [];
  const usedIndices = new Set<number>();

  for (let i = 0; i < wordCount; i++) {
    let idx: number;
    do {
      idx = Math.floor(Math.random() * WORD_LIST.length);
    } while (usedIndices.has(idx) && usedIndices.size < WORD_LIST.length);
    usedIndices.add(idx);

    let word = WORD_LIST[idx];
    if (capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    words.push(word);
  }

  // Add random number to a random word
  if (includeNumber) {
    const randWordIdx = Math.floor(Math.random() * words.length);
    const randDigit = Math.floor(Math.random() * 10);
    words[randWordIdx] = words[randWordIdx] + randDigit;
  }

  return words.join(separator);
}

function generatePin(length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

function calcEntropy(length: number, charsetSize: number): number {
  if (charsetSize <= 0 || length <= 0) return 0;
  return length * Math.log2(charsetSize);
}

function formatTime(seconds: number, v: Record<string, string>): string {
  if (seconds < 0.001) return v["instant"] || "Instantly";
  if (seconds < 60) return `${Math.round(seconds)} ${v["seconds"] || "seconds"}`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} ${v["minutes"] || "minutes"}`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} ${v["hours"] || "hours"}`;
  if (seconds < 2592000) return `${Math.round(seconds / 86400)} ${v["days"] || "days"}`;
  if (seconds < 31536000) return `${Math.round(seconds / 2592000)} ${v["months"] || "months"}`;

  const years = seconds / 31536000;
  if (years < 1000) return `${Math.round(years)} ${v["years"] || "years"}`;
  if (years < 1e6) return `${(years / 1000).toFixed(1)}K ${v["years"] || "years"}`;
  if (years < 1e9) return `${(years / 1e6).toFixed(1)}M ${v["years"] || "years"}`;
  if (years < 1e12) return `${(years / 1e9).toFixed(1)}B ${v["years"] || "years"}`;
  if (years < 1e15) return `${(years / 1e12).toFixed(1)}T ${v["years"] || "years"}`;
  return v["forever"] || "Longer than the age of the universe";
}

function getStrengthScore(entropy: number, v: Record<string, string>): string {
  if (entropy < 40) return v["veryWeak"] || "Very Weak";
  if (entropy < 60) return v["weak"] || "Weak";
  if (entropy < 80) return v["fair"] || "Fair";
  if (entropy < 100) return v["strong"] || "Strong";
  return v["veryStrong"] || "Very Strong";
}

function formatCombinations(entropy: number): string {
  const combos = Math.pow(2, entropy);
  if (entropy < 10) return Math.round(combos).toLocaleString("en-US");
  if (entropy < 33) return `~${(combos).toExponential(1)}`;
  return `~2^${Math.round(entropy)}`;
}

function crackTimeTableRow(len: number): Record<string, string> {
  const scenarios = [
    { charset: 26, label: "lowercase" },
    { charset: 52, label: "mixed" },
    { charset: 62, label: "mixedNum" },
    { charset: 94, label: "all" },
  ];
  const RATE = 1e10; // 10 billion guesses/sec (offline fast hash)
  const row: Record<string, string> = { length: `${len} chars` };

  for (const s of scenarios) {
    const combos = Math.pow(s.charset, len);
    const seconds = combos / (2 * RATE); // average = half of total
    row[s.label] = formatTime(seconds, {});
  }

  return row;
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATE FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

export function calculatePasswordGenerator(data: {
  values: Record<string, unknown>;
  units?: Record<string, string>;
  unitSystem?: "metric" | "imperial";
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const mode = (values.mode as string) || "password";

  let password = "";
  let entropy = 0;
  let charsetSize = 0;
  let effectiveLength = 0;

  if (mode === "password") {
    const length = (values.length as number) || 16;
    const upper = values.includeUppercase !== false;
    const lower = values.includeLowercase !== false;
    const nums = values.includeNumbers !== false;
    const syms = values.includeSymbols === true;
    const noAmbig = values.avoidAmbiguous === true;

    // Build charset
    let charset = "";
    if (upper) charset += noAmbig ? CHARSETS.uppercaseNoAmbig : CHARSETS.uppercase;
    if (lower) charset += noAmbig ? CHARSETS.lowercaseNoAmbig : CHARSETS.lowercase;
    if (nums) charset += noAmbig ? CHARSETS.numbersNoAmbig : CHARSETS.numbers;
    if (syms) charset += CHARSETS.symbols;

    // Fallback: if nothing selected, use lowercase
    if (charset.length === 0) charset = CHARSETS.lowercase;

    charsetSize = charset.length;
    effectiveLength = length;
    password = generatePassword(length, charset);
    entropy = calcEntropy(length, charsetSize);

  } else if (mode === "passphrase") {
    const wordCount = (values.wordCount as number) || 4;
    const separator = (values.separator as string) ?? "-";
    const capitalize = values.capitalizeWords !== false;
    const includeNum = values.includeWordNumber !== false;

    password = generatePassphrase(wordCount, separator, capitalize, includeNum);

    // Entropy calculation for passphrase
    // Base: wordCount * log2(wordListSize)
    charsetSize = WORD_LIST.length;
    entropy = wordCount * Math.log2(WORD_LIST.length);

    // Capitalization adds ~1 bit per word
    if (capitalize) entropy += wordCount * 1;
    // Number adds log2(10 * wordCount) bits
    if (includeNum) entropy += Math.log2(10 * wordCount);
    // Separator adds log2(num_separator_options) if chosen
    if (separator) entropy += Math.log2(5);

    effectiveLength = password.length;

  } else if (mode === "pin") {
    const pinLength = (values.pinLength as number) || 6;
    password = generatePin(pinLength);
    charsetSize = 10;
    effectiveLength = pinLength;
    entropy = calcEntropy(pinLength, 10);
  }

  // ── Crack time calculations ────────────────────────────────────────────
  const totalCombinations = Math.pow(2, entropy);
  const avgGuesses = totalCombinations / 2; // Average = half of keyspace

  // Attack scenarios (guesses per second)
  const ONLINE_THROTTLED = 100 / 3600;       // 100 per hour
  const OFFLINE_SLOW = 1e4;                   // 10K/sec (bcrypt)
  const OFFLINE_FAST = 1e10;                  // 10B/sec (MD5/SHA1 + GPU)

  const crackTimeOnlineSec = avgGuesses / ONLINE_THROTTLED;
  const crackTimeOfflineSlowSec = avgGuesses / OFFLINE_SLOW;
  const crackTimeOfflineFastSec = avgGuesses / OFFLINE_FAST;

  const strengthScore = getStrengthScore(entropy, v);
  const bitsLabel = v["bits"] || "bits";
  const charsLabel = v["characters"] || "characters";

  // ── Chart data ─────────────────────────────────────────────────────────

  // Tab 1: Attack scenario comparison (log10 seconds)
  const crackScenariosData = [
    { name: "Online (Throttled)", value: Math.max(0, Math.log10(crackTimeOnlineSec + 0.001)) },
    { name: "Offline (Slow)", value: Math.max(0, Math.log10(crackTimeOfflineSlowSec + 0.001)) },
    { name: "Offline (Fast)", value: Math.max(0, Math.log10(crackTimeOfflineFastSec + 0.001)) },
  ];

  // Tab 2: Length comparison showing entropy
  const currentLen = mode === "pin" ? (values.pinLength as number || 6) : (mode === "passphrase" ? (values.wordCount as number || 4) : (values.length as number || 16));
  const lengthCompData: Array<{ name: string; value: number }> = [];

  if (mode === "password") {
    for (const len of [8, 12, 16, 20, 24, 32]) {
      lengthCompData.push({
        name: `${len} chars`,
        value: Math.round(calcEntropy(len, charsetSize)),
      });
    }
  } else if (mode === "passphrase") {
    for (const wc of [3, 4, 5, 6, 7, 8]) {
      const e = wc * Math.log2(WORD_LIST.length) + wc + Math.log2(50) + Math.log2(5);
      lengthCompData.push({
        name: `${wc} words`,
        value: Math.round(e),
      });
    }
  } else {
    for (const pl of [4, 6, 8, 10, 12]) {
      lengthCompData.push({
        name: `${pl} digits`,
        value: Math.round(calcEntropy(pl, 10)),
      });
    }
  }

  // ── Crack time reference table ─────────────────────────────────────────
  const tableData = [6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32].map(crackTimeTableRow);

  // ── Summary ────────────────────────────────────────────────────────────
  const f = (t?.formats as Record<string, string>) || {};
  const summaryTemplate = f.summary || "Generated {mode} with {entropyBits} bits of entropy. Strength: {strengthScore}.";
  const summary = summaryTemplate
    .replace("{mode}", mode)
    .replace("{entropyBits}", Math.round(entropy).toString())
    .replace("{strengthScore}", strengthScore)
    .replace("{crackTimeOfflineFast}", formatTime(crackTimeOfflineFastSec, v));

  // ── Return ─────────────────────────────────────────────────────────────
  return {
    values: {
      generatedPassword: password,
      strengthScore,
      entropyBits: Math.round(entropy * 10) / 10,
      charsetSize,
      totalCombinations: formatCombinations(entropy),
      crackTimeOnline: formatTime(crackTimeOnlineSec, v),
      crackTimeOfflineSlow: formatTime(crackTimeOfflineSlowSec, v),
      crackTimeOfflineFast: formatTime(crackTimeOfflineFastSec, v),
    },
    formatted: {
      generatedPassword: password,
      strengthScore,
      entropyBits: `${(Math.round(entropy * 10) / 10)} ${bitsLabel}`,
      charsetSize: `${charsetSize} ${charsLabel}`,
      totalCombinations: formatCombinations(entropy),
      crackTimeOnline: formatTime(crackTimeOnlineSec, v),
      crackTimeOfflineSlow: formatTime(crackTimeOfflineSlowSec, v),
      crackTimeOfflineFast: formatTime(crackTimeOfflineFastSec, v),
    },
    summary,
    isValid: true,
    metadata: {
      tableData,
      chartsData: {
        "crack-scenarios": crackScenariosData,
        "length-comparison": lengthCompData,
      },
    },
  };
}

export default passwordGeneratorConfig;
