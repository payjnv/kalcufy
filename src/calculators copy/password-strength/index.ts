import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ============================================================================
// PASSWORD STRENGTH CALCULATOR — V4
// ============================================================================
// Calculates: entropy (bits), charset size, search space, crack time
// for multiple attack scenarios (online, offline, GPU cluster)
// All client-side, no password sent to server.
// ============================================================================

export const passwordStrengthConfig: CalculatorConfigV4 = {
  id: "password-strength",
  version: "4.0",
  category: "technology",
  icon: "🔐",

  presets: [
    {
      id: "weak",
      icon: "⚠️",
      values: {
        password: "password123",
        attackScenario: "offline",
      },
    },
    {
      id: "medium",
      icon: "🔒",
      values: {
        password: "MyD0g$Name!",
        attackScenario: "offline",
      },
    },
    {
      id: "strong",
      icon: "🛡️",
      values: {
        password: "cH8$kLm#Qz!9Xp2w",
        attackScenario: "gpu",
      },
    },],

  t: {
    en: {
      name: "Password Strength Calculator",
      slug: "password-strength",
      subtitle: "Check your password entropy, crack time, and security score — instantly and privately.",
      breadcrumb: "Password Strength",

      seo: {
        title: "Password Strength Calculator - Entropy & Crack Time Tool",
        description: "Check how strong your password is with entropy analysis, brute-force crack time estimates, and security scoring. 100% client-side, your password never leaves your browser.",
        shortDescription: "Calculate password entropy and estimated crack time",
        keywords: [
          "password strength calculator",
          "password entropy calculator",
          "how strong is my password",
          "password crack time",
          "password security checker",
          "free password strength tester",
          "brute force time calculator",
          "password bits entropy",
        ],
      },

      calculator: { yourInformation: "Your Password" },
      ui: {
        yourInformation: "Your Password",
        calculate: "Analyze",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        password: {
          label: "Enter Password",
          helpText: "Your password is analyzed locally — it never leaves your browser",
        },
        attackScenario: {
          label: "Attack Scenario",
          helpText: "Select the attacker's computing power",
          options: {
            online: "Online Attack (1K guesses/sec)",
            offline: "Offline Attack (10B guesses/sec)",
            gpu: "GPU Cluster (100B guesses/sec)",
          },
        },
      },

      results: {
        entropyBits: { label: "Entropy" },
        strength: { label: "Strength" },
        crackTime: { label: "Crack Time" },
        charsetSize: { label: "Charset Size" },
        searchSpace: { label: "Search Space" },
        score: { label: "Score" },
      },

      presets: {
        weak: { label: "Weak Example", description: "Common password pattern" },
        medium: { label: "Medium Example", description: "Mixed case with symbols" },
        strong: { label: "Strong Random", description: "17-char random mix" },
      },

      values: {
        bits: "bits",
        characters: "characters",
        combinations: "combinations",
        instant: "Instant",
        seconds: "seconds",
        minutes: "minutes",
        hours: "hours",
        days: "days",
        weeks: "weeks",
        months: "months",
        years: "years",
        centuries: "centuries",
        millennia: "millennia",
        veryWeak: "Very Weak",
        weak: "Weak",
        fair: "Fair",
        strong: "Strong",
        veryStrong: "Very Strong",
        lowercase: "Lowercase (a-z)",
        uppercase: "Uppercase (A-Z)",
        digits: "Digits (0-9)",
        symbols: "Symbols (!@#$...)",
        spaces: "Spaces",
        other: "Other/Unicode",
        yes: "Yes",
        no: "No",
      },

      formats: {
        summary: "Your password has {entropy} bits of entropy — rated {strength}. Estimated crack time: {crackTime}.",
      },

      infoCards: {
        metrics: {
          title: "Password Analysis",
          items: [
            { label: "Entropy", valueKey: "entropyBits" },
            { label: "Strength", valueKey: "strength" },
            { label: "Crack Time", valueKey: "crackTime" },
            { label: "Charset Size", valueKey: "charsetSize" },
          ],
        },
        details: {
          title: "Character Breakdown",
          items: [
            { label: "Password Length", valueKey: "passwordLength" },
            { label: "Has Lowercase", valueKey: "hasLowercase" },
            { label: "Has Uppercase", valueKey: "hasUppercase" },
            { label: "Has Digits", valueKey: "hasDigits" },
            { label: "Has Symbols", valueKey: "hasSymbols" },
            { label: "Search Space", valueKey: "searchSpace" },
          ],
        },
        tips: {
          title: "Password Security Tips",
          items: [
            "Use at least 14 characters — every extra character doubles security",
            "Mix uppercase, lowercase, numbers, and symbols for maximum entropy",
            "Passphrases (4+ random words) are easier to remember and very strong",
            "Never reuse passwords — use a password manager for unique passwords",
          ],
        },
      },

      detailedTable: {
        crackScenarios: {
          button: "View All Attack Scenarios",
          title: "Crack Time by Attack Scenario",
          columns: {
            scenario: "Attack Scenario",
            speed: "Guesses/sec",
            time: "Time to Crack",
            example: "Example Attacker",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is Password Entropy?",
          content: "Password entropy measures the unpredictability of a password in bits. It represents how many binary decisions (yes/no) an attacker would need to make to guess your password through brute force. A password with 40 bits of entropy has 2^40 (about 1 trillion) possible combinations. Each additional bit doubles the search space, making the password exponentially harder to crack. The formula is simple: Entropy = Length × log₂(Charset Size). For example, an 8-character password using only lowercase letters (charset = 26) has 8 × 4.7 = 37.6 bits of entropy.",
        },
        howItWorks: {
          title: "How Crack Time Is Calculated",
          content: "Crack time estimates are based on the total search space (charset^length) divided by the attacker's guessing speed. We model three scenarios: Online attacks are throttled by servers to about 1,000 guesses per second. Offline attacks using a stolen hash file run at about 10 billion guesses per second on modern hardware. GPU clusters used by well-funded attackers can reach 100 billion guesses per second or more. The actual crack time is the search space divided by two times the guessing speed — on average, an attacker finds the password halfway through the search space.",
        },
        considerations: {
          title: "Key Security Considerations",
          items: [
            { text: "Length beats complexity: a 20-character lowercase password is stronger than an 8-character mixed password", type: "info" },
            { text: "Common passwords like 'Password123!' have near-zero real entropy despite using all character types", type: "warning" },
            { text: "Dictionary words, names, dates, and keyboard patterns (qwerty, 12345) drastically reduce effective entropy", type: "warning" },
            { text: "Passphrases of 4+ random words provide 50+ bits of entropy and are much easier to remember", type: "info" },
            { text: "Password managers generate truly random passwords — the only way to guarantee maximum entropy", type: "info" },
            { text: "Multi-factor authentication (MFA) protects you even if your password is compromised", type: "info" },
          ],
        },
        categories: {
          title: "Entropy Strength Categories",
          items: [
            { text: "0–28 bits (Very Weak): Crackable in seconds. Common passwords, short numeric PINs, dictionary words", type: "warning" },
            { text: "28–35 bits (Weak): Crackable in minutes to hours. Short mixed-case passwords, simple substitutions", type: "warning" },
            { text: "36–59 bits (Fair): Crackable in days to years. Medium-length passwords with some complexity", type: "info" },
            { text: "60–79 bits (Strong): Would take decades to centuries. Long passwords or passphrases with mixed characters", type: "info" },
            { text: "80–127 bits (Very Strong): Effectively uncrackable by current technology. Random 16+ character passwords", type: "info" },
            { text: "128+ bits (Maximum): Beyond brute force. Equivalent to encryption-grade security keys", type: "info" },
          ],
        },
        examples: {
          title: "Password Entropy Examples",
          description: "Step-by-step entropy calculations for different password types",
          examples: [
            {
              title: "Simple Password: hello123",
              steps: [
                "Characters used: lowercase (a-z) + digits (0-9)",
                "Charset size: 26 + 10 = 36",
                "Password length: 8 characters",
                "Entropy = 8 × log₂(36) = 8 × 5.17 = 41.4 bits",
                "Search space: 36⁸ = 2.82 × 10¹² combinations",
              ],
              result: "41.4 bits — Fair. An offline attacker cracks this in about 2 minutes.",
            },
            {
              title: "Strong Random: kQ8#mL!2xP$5nR",
              steps: [
                "Characters used: lowercase + uppercase + digits + symbols",
                "Charset size: 26 + 26 + 10 + 32 = 94",
                "Password length: 14 characters",
                "Entropy = 14 × log₂(94) = 14 × 6.55 = 91.7 bits",
                "Search space: 94¹⁴ = 4.21 × 10²⁷ combinations",
              ],
              result: "91.7 bits — Very Strong. Would take millions of years to crack even with GPU clusters.",
            },
          ],
        },
      },

      faqs: [
        {
          question: "Is it safe to type my password into this calculator?",
          answer: "Yes. This calculator runs 100% in your browser — your password is never sent to any server. All analysis happens locally on your device using JavaScript. You can verify this by disconnecting from the internet and using the calculator offline.",
        },
        {
          question: "What is password entropy and why does it matter?",
          answer: "Password entropy measures how unpredictable your password is, expressed in bits. Each bit doubles the number of guesses needed. A password with 40 bits of entropy requires about 1 trillion guesses, while 80 bits requires over 1 sextillion guesses. Higher entropy means it takes exponentially longer to crack your password through brute force.",
        },
        {
          question: "How long should my password be?",
          answer: "At minimum 12 characters, ideally 16 or more. NIST (National Institute of Standards and Technology) recommends at least 8 characters, but modern security experts suggest 14+ characters. Every additional character multiplies the search space by the charset size — adding one character to a mixed-case alphanumeric password multiplies difficulty by 62x.",
        },
        {
          question: "Are passphrases better than complex passwords?",
          answer: "Often yes. A 4-word passphrase like 'correct horse battery staple' has about 44-55 bits of entropy depending on the word list, is easy to remember, and is resistant to brute force. A 6-word passphrase exceeds 77 bits. Passphrases are easier to type, harder to forget, and can be just as strong as random character passwords.",
        },
        {
          question: "What does the attack scenario setting do?",
          answer: "It changes the assumed computing power of the attacker. Online attacks are limited to about 1,000 guesses/second by server rate-limiting. Offline attacks on stolen password hashes run at ~10 billion/second. GPU clusters can reach 100 billion guesses/second. The same password has very different crack times depending on the scenario.",
        },
        {
          question: "Why does my 'complex' password score poorly?",
          answer: "Because entropy is based on the character set and length, not human-perceived complexity. A password like 'P@ssw0rd!' uses common substitution patterns that actual password crackers check first. Real entropy comes from randomness and length — not from swapping 'a' with '@' or 'o' with '0'. Use a password manager to generate truly random passwords.",
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
        calculate: "Analyze",
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
      id: "password",
      type: "text",
      defaultValue: null,
      placeholder: "Enter your password...",
    },
    {
      id: "attackScenario",
      type: "radio",
      defaultValue: "offline",
      options: [
        { value: "online" },
        { value: "offline" },
        { value: "gpu" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "entropyBits", type: "primary", format: "text" },
    { id: "strength", type: "secondary", format: "text" },
    { id: "crackTime", type: "secondary", format: "text" },
    { id: "charsetSize", type: "secondary", format: "text" },
    { id: "searchSpace", type: "secondary", format: "text" },
    { id: "score", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "🔐", itemCount: 4 },
    { id: "details", type: "list", icon: "📊", itemCount: 6 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "crackTimeComparison",
    type: "bar",
    xKey: "scenario",
    height: 300,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "logTime", color: "#3b82f6" },
    ],
  },

  detailedTable: {
    id: "crackScenarios",
    buttonLabel: "View All Attack Scenarios",
    buttonIcon: "⚔️",
    modalTitle: "Crack Time by Attack Scenario",
    columns: [
      { id: "scenario", label: "Attack Scenario", align: "left" },
      { id: "speed", label: "Guesses/sec", align: "right" },
      { id: "time", label: "Time to Crack", align: "right", highlight: true },
      { id: "example", label: "Example Attacker", align: "left" },
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
      authors: "National Institute of Standards and Technology",
      year: "2024",
      title: "Digital Identity Guidelines — Authentication and Lifecycle Management",
      source: "NIST SP 800-63B",
      url: "https://pages.nist.gov/800-63-4/sp800-63b.html",
    },
    {
      authors: "Wheeler, D. (Dropbox)",
      year: "2016",
      title: "zxcvbn: Low-Budget Password Strength Estimation",
      source: "USENIX Security Symposium",
      url: "https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/wheeler",
    },
  ],

  hero: {
    badge: "Security",
    gradient: "from-blue-600 to-indigo-700",
  },

  sidebar: {
    popular: true,
    trending: true,
  },

  features: {
    pdf: true,
    csv: true,
    excel: true,
    save: true,
    share: true,
  },

  relatedCalculators: [],

  ads: {
    sidebar: true,
    bottom: true,
  },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (val < 0.001) return val.toExponential(2);
  if (val < 1000) return val.toFixed(2).replace(/\.?0+$/, "");
  return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function formatSearchSpace(combinations: number): string {
  if (combinations < 1e6) return fmtNum(combinations);
  if (combinations < 1e9) return `${(combinations / 1e6).toFixed(2)} million`;
  if (combinations < 1e12) return `${(combinations / 1e9).toFixed(2)} billion`;
  if (combinations < 1e15) return `${(combinations / 1e12).toFixed(2)} trillion`;
  if (combinations < 1e18) return `${(combinations / 1e15).toFixed(2)} quadrillion`;
  if (combinations < 1e21) return `${(combinations / 1e18).toFixed(2)} quintillion`;
  if (combinations < 1e24) return `${(combinations / 1e21).toFixed(2)} sextillion`;
  return combinations.toExponential(2);
}

function formatCrackTime(seconds: number, v: Record<string, string>): string {
  if (seconds < 0.001) return v["instant"] || "Instant";
  if (seconds < 60) return `${fmtNum(seconds)} ${v["seconds"] || "seconds"}`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${fmtNum(minutes)} ${v["minutes"] || "minutes"}`;
  const hours = minutes / 60;
  if (hours < 24) return `${fmtNum(hours)} ${v["hours"] || "hours"}`;
  const days = hours / 24;
  if (days < 7) return `${fmtNum(days)} ${v["days"] || "days"}`;
  const weeks = days / 7;
  if (weeks < 4.345) return `${fmtNum(weeks)} ${v["weeks"] || "weeks"}`;
  const months = days / 30.44;
  if (months < 12) return `${fmtNum(months)} ${v["months"] || "months"}`;
  const years = days / 365.25;
  if (years < 100) return `${fmtNum(years)} ${v["years"] || "years"}`;
  if (years < 1e6) return `${fmtNum(years)} ${v["years"] || "years"}`;
  if (years < 1e9) return `${fmtNum(years / 1e6)} million ${v["years"] || "years"}`;
  if (years < 1e12) return `${fmtNum(years / 1e9)} billion ${v["years"] || "years"}`;
  return `${v["centuries"] || "centuries"}+`;
}

function getStrengthLabel(entropy: number, v: Record<string, string>): string {
  if (entropy < 28) return v["veryWeak"] || "Very Weak";
  if (entropy < 36) return v["weak"] || "Weak";
  if (entropy < 60) return v["fair"] || "Fair";
  if (entropy < 80) return v["strong"] || "Strong";
  return v["veryStrong"] || "Very Strong";
}

function getStrengthScore(entropy: number): number {
  if (entropy < 28) return 1;
  if (entropy < 36) return 2;
  if (entropy < 60) return 3;
  if (entropy < 80) return 4;
  return 5;
}

function getAttackSpeed(scenario: string): number {
  switch (scenario) {
    case "online": return 1e3;          // 1,000 guesses/sec
    case "offline": return 1e10;        // 10 billion guesses/sec
    case "gpu": return 1e11;            // 100 billion guesses/sec
    default: return 1e10;
  }
}

export function calculatePasswordStrength(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const password = (values.password as string) || "";
  const attackScenario = (values.attackScenario as string) || "offline";

  // Validate
  if (!password || password.length === 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Character Analysis ──
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigits = /[0-9]/.test(password);
  const hasSymbols = /[^A-Za-z0-9\s]/.test(password);
  const hasSpaces = /\s/.test(password);
  const hasOther = /[^\x20-\x7E]/.test(password); // Non-ASCII

  let charsetSize = 0;
  if (hasLower) charsetSize += 26;
  if (hasUpper) charsetSize += 26;
  if (hasDigits) charsetSize += 10;
  if (hasSymbols) charsetSize += 32;
  if (hasSpaces) charsetSize += 1;
  if (hasOther) charsetSize += 64; // Approximate Unicode range

  // Minimum charset = 1 to avoid log(0)
  if (charsetSize === 0) charsetSize = 1;

  const length = password.length;

  // ── Entropy Calculation ──
  // Entropy = length × log₂(charsetSize)
  const entropy = length * Math.log2(charsetSize);
  const entropyRounded = Math.round(entropy * 10) / 10;

  // ── Search Space ──
  const searchSpace = Math.pow(charsetSize, length);

  // ── Crack Time Calculations ──
  const attackSpeed = getAttackSpeed(attackScenario);
  const crackTimeSeconds = searchSpace / (2 * attackSpeed); // Average = half search space

  // All scenarios for table
  const scenarios = [
    { id: "online_throttled", speed: 100, label: "Online (throttled)", example: "Web login with rate limit" },
    { id: "online_unthrottled", speed: 1e3, label: "Online (unthrottled)", example: "Web login without limit" },
    { id: "offline_slow", speed: 1e4, label: "Offline (slow hash)", example: "bcrypt/scrypt hash" },
    { id: "offline_fast", speed: 1e10, label: "Offline (fast hash)", example: "MD5/SHA-1 hash" },
    { id: "gpu_single", speed: 1e11, label: "GPU cluster", example: "8× RTX 4090 rig" },
    { id: "gpu_farm", speed: 1e13, label: "State-level", example: "Nation-state resources" },
  ];

  const tableData = scenarios.map((s) => {
    const time = searchSpace / (2 * s.speed);
    return {
      scenario: s.label,
      speed: fmtNum(s.speed),
      time: formatCrackTime(time, v),
      example: s.example,
    };
  });

  // ── Chart Data: log₁₀ of crack time for visual comparison ──
  const chartData = scenarios.map((s) => {
    const time = searchSpace / (2 * s.speed);
    const logTime = time > 0 ? Math.log10(Math.max(time, 0.001)) : 0;
    return {
      scenario: s.label.split(" (")[0], // Short label
      logTime: Math.round(logTime * 100) / 100,
    };
  });

  // ── Strength Label & Score ──
  const strength = getStrengthLabel(entropyRounded, v);
  const score = getStrengthScore(entropyRounded);

  const yesLabel = v["yes"] || "Yes";
  const noLabel = v["no"] || "No";
  const bitsLabel = v["bits"] || "bits";
  const charsLabel = v["characters"] || "characters";

  return {
    values: {
      entropyBits: entropyRounded,
      strength: strength,
      crackTime: crackTimeSeconds,
      charsetSize: charsetSize,
      searchSpace: searchSpace,
      score: score,
      passwordLength: length,
      hasLowercase: hasLower,
      hasUppercase: hasUpper,
      hasDigits: hasDigits,
      hasSymbols: hasSymbols,
      hasSpaces: hasSpaces,
    },
    formatted: {
      entropyBits: `${entropyRounded} ${bitsLabel}`,
      strength: strength,
      crackTime: formatCrackTime(crackTimeSeconds, v),
      charsetSize: `${charsetSize} ${charsLabel}`,
      searchSpace: formatSearchSpace(searchSpace),
      score: `${score}/5`,
      passwordLength: `${length} ${charsLabel}`,
      hasLowercase: hasLower ? yesLabel : noLabel,
      hasUppercase: hasUpper ? yesLabel : noLabel,
      hasDigits: hasDigits ? yesLabel : noLabel,
      hasSymbols: hasSymbols ? yesLabel : noLabel,
      hasSpaces: hasSpaces ? yesLabel : noLabel,
    },
    summary:
      f.summary
        ?.replace("{entropy}", `${entropyRounded}`)
        ?.replace("{strength}", strength)
        ?.replace("{crackTime}", formatCrackTime(crackTimeSeconds, v)) || "",
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default passwordStrengthConfig;
