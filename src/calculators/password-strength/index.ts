import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─────────────────────────────────────────────────────────────────────────────
// PASSWORD STRENGTH CALCULATOR — V4.3
// ─────────────────────────────────────────────────────────────────────────────
// Entropy analysis, pattern detection, penalty system, 7 attack scenarios
// (incl. quantum), improvement suggestions. 100% client-side.
// ─────────────────────────────────────────────────────────────────────────────

export const passwordStrengthConfig: CalculatorConfigV4 = {
  id: "password-strength",
  version: "4.3",
  category: "technology",
  icon: "🔐",

  presets: [
    {
      id: "weak",
      icon: "⚠️",
      values: { password: "password123", attackScenario: "offline_fast" },
    },
    {
      id: "medium",
      icon: "🔒",
      values: { password: "MyD0g$Name!2024", attackScenario: "offline_fast" },
    },
    {
      id: "strong",
      icon: "🛡️",
      values: { password: "cH8$kLm#Qz!9Xp2wB&", attackScenario: "gpu_cluster" },
    },
    {
      id: "passphrase",
      icon: "📝",
      values: { password: "correct horse battery staple", attackScenario: "gpu_cluster" },
    },
  ],

  t: {
    en: {
      name: "Password Strength Calculator",
      slug: "password-strength",
      subtitle: "Analyze password entropy, detect weak patterns, and estimate crack times across 7 attack scenarios — including quantum computing. 100% private, nothing leaves your browser.",
      breadcrumb: "Password Strength",

      seo: {
        title: "Password Strength Calculator - Entropy, Crack Time & Pattern Analysis",
        description: "Check how strong your password really is. Detects common patterns, keyboard walks, leet speak, and repeated characters. Estimates crack time for 7 scenarios including quantum computing. Free, client-side, multilingual.",
        shortDescription: "Analyze password strength with entropy, pattern detection, and crack time estimates.",
        keywords: [
          "password strength calculator",
          "password entropy calculator",
          "how strong is my password",
          "password crack time",
          "password security checker",
          "brute force time calculator",
          "password pattern detector",
          "quantum password crack time",
        ],
      },

      calculator: { yourInformation: "Your Password" },
      ui: {
        yourInformation: "Your Password",
        calculate: "Analyze",
        reset: "Reset",
        results: "Security Analysis",
      },

      inputs: {
        password: {
          label: "Enter Password",
          helpText: "Analyzed 100% locally — your password never leaves your browser",
        },
        attackScenario: {
          label: "Primary Attack Scenario",
          helpText: "Sets the main attacker's computing power for the primary crack time result",
          options: {
            online_throttled: "Online — Throttled (100/sec)",
            online_unthrottled: "Online — Unthrottled (1K/sec)",
            offline_slow: "Offline — Slow Hash (10K/sec)",
            offline_fast: "Offline — Fast Hash (10B/sec)",
            gpu_cluster: "GPU Cluster (100B/sec)",
            state_level: "State-Level (10T/sec)",
            quantum: "Quantum Computer (theoretical)",
          },
        },
      },

      results: {
        strength: { label: "Strength" },
        entropyBits: { label: "Entropy" },
        effectiveEntropy: { label: "Effective Entropy" },
        crackTime: { label: "Crack Time" },
        charsetSize: { label: "Charset Size" },
        searchSpace: { label: "Search Space" },
        score: { label: "Score" },
        passwordLength: { label: "Length" },
        patternsFound: { label: "Patterns Found" },
        penaltyApplied: { label: "Entropy Penalty" },
      },

      presets: {
        weak: { label: "Weak Example", description: "Common password pattern" },
        medium: { label: "Medium Mix", description: "Mixed case with symbols & year" },
        strong: { label: "Strong Random", description: "19-char random mix" },
        passphrase: { label: "Passphrase", description: "4-word XKCD-style passphrase" },
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
        unicode: "Unicode/Extended",
        yes: "Yes",
        no: "No",
        none: "None detected",
      },

      formats: {
        summary: "Your password has {entropy} bits of entropy ({effectiveEntropy} effective) — rated {strength}. Estimated crack time ({scenario}): {crackTime}.",
      },

      infoCards: {
        metrics: {
          title: "Security Overview",
          items: [
            { label: "Strength Rating", valueKey: "strength" },
            { label: "Raw Entropy", valueKey: "entropyBits" },
            { label: "Effective Entropy", valueKey: "effectiveEntropy" },
            { label: "Crack Time", valueKey: "crackTime" },
          ],
        },
        details: {
          title: "Character & Pattern Analysis",
          items: [
            { label: "Password Length", valueKey: "passwordLength" },
            { label: "Has Lowercase", valueKey: "hasLowercase" },
            { label: "Has Uppercase", valueKey: "hasUppercase" },
            { label: "Has Digits", valueKey: "hasDigits" },
            { label: "Has Symbols", valueKey: "hasSymbols" },
            { label: "Patterns Detected", valueKey: "patternsFound" },
            { label: "Entropy Penalty", valueKey: "penaltyApplied" },
            { label: "Improvement Tips", valueKey: "suggestions" },
          ],
        },
        tips: {
          title: "Password Security Best Practices",
          items: [
            "Use 16+ characters — each extra character exponentially increases security. Length beats complexity.",
            "Avoid predictable patterns: keyboard walks (qwerty), sequences (12345), repeated characters (aaa), and leet speak (P@$$w0rd).",
            "Passphrases of 5+ random words are easy to remember and provide 60+ bits of entropy.",
            "Use a password manager to generate truly random, unique passwords for every account.",
          ],
        },
      },

      chart: {
        title: "Crack Time by Attack Scenario",
        xLabel: "Scenario",
        yLabel: "Log₁₀ Seconds",
        series: {
          logTime: "Time (log₁₀ sec)",
        },
      },

      detailedTable: {
        crackScenarios: {
          button: "View All Attack Scenarios",
          title: "Crack Time Comparison — All 7 Scenarios",
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
          content: "Password entropy measures the unpredictability of a password in bits. It represents the number of binary yes/no decisions an attacker must make to guess your password through brute force. A password with 40 bits of entropy has 2⁴⁰ (about 1.1 trillion) possible combinations. Each additional bit doubles the search space, making the password exponentially harder to crack. The formula is: Entropy = Length × log₂(Charset Size). For example, an 8-character password using only lowercase letters (charset = 26) has 8 × 4.7 = 37.6 bits of entropy. However, raw entropy assumes each character is perfectly random — real-world passwords often contain patterns that reduce their effective strength. This calculator detects those patterns and applies penalties to give you a more realistic security assessment.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content: "This calculator goes beyond simple entropy math by applying a multi-layer analysis. First, it calculates raw entropy from the character set size and password length. Then it scans for weakness patterns: common passwords (top 200 from breach databases), keyboard walks (qwerty, asdf), sequential characters (abc, 123), repeated characters (aaa), leet speak substitutions (@ for a, 0 for o), and trailing year patterns (2024, 2025). Each detected pattern applies an entropy penalty, producing an 'effective entropy' score that better reflects real-world crackability. Crack times are estimated for 7 scenarios: from rate-limited online attacks (100 guesses/sec) to theoretical quantum computers using Grover's algorithm (which halves the effective bit length). All analysis runs entirely in your browser — your password is never transmitted anywhere.",
        },
        considerations: {
          title: "Critical Security Considerations",
          items: [
            { text: "Length beats complexity: a 20-character lowercase password (94 bits) is stronger than an 8-character mixed password (52 bits). Always prioritize length.", type: "info" },
            { text: "Common passwords like 'Password123!' have near-zero real entropy despite using all character types. Attackers check dictionary and breach lists first.", type: "warning" },
            { text: "Keyboard patterns (qwerty, zxcv), sequences (abcd, 1234), and leet speak (P@$$w0rd) are the first things cracking tools try after dictionaries.", type: "warning" },
            { text: "Passphrases of 5+ random words provide 60+ bits of entropy and are much easier to remember than random character strings.", type: "info" },
            { text: "Password managers generate truly random passwords — the only way to guarantee maximum entropy. Use one for every account.", type: "info" },
            { text: "Multi-factor authentication (MFA) protects you even if your password is compromised. Enable it everywhere possible, especially for email, banking, and cloud accounts.", type: "info" },
          ],
        },
        categories: {
          title: "Entropy Strength Levels",
          items: [
            { text: "0–28 bits (Very Weak): Crackable in seconds. Includes common passwords, short PINs, single dictionary words, and trivial patterns.", type: "warning" },
            { text: "28–35 bits (Weak): Crackable in minutes to hours offline. Short mixed-case passwords, simple substitutions like P@ss, phone numbers.", type: "warning" },
            { text: "36–59 bits (Fair): Takes days to years offline. Medium-length passwords with some complexity. Adequate for low-value accounts only.", type: "info" },
            { text: "60–79 bits (Strong): Would take decades to centuries. Long passwords or 4+ word passphrases. Good for most accounts.", type: "info" },
            { text: "80–127 bits (Very Strong): Effectively uncrackable by current technology. Random 16+ character passwords. Recommended for critical accounts.", type: "info" },
            { text: "128+ bits (Maximum): Exceeds encryption-grade security. Even quantum computers would need astronomical time. Overkill for most purposes.", type: "info" },
          ],
        },
        examples: {
          title: "Password Entropy Examples",
          description: "Step-by-step calculations showing raw vs effective entropy",
          examples: [
            {
              title: "Weak: password123",
              steps: [
                "Charset: lowercase (26) + digits (10) = 36",
                "Length: 11 characters",
                "Raw entropy = 11 × log₂(36) = 11 × 5.17 = 56.8 bits",
                "⚠️ Pattern detected: common password match → −30 bits penalty",
                "⚠️ Pattern detected: sequential digits (123) → −10 bits penalty",
                "Effective entropy = 56.8 − 40 = 16.8 bits → Very Weak",
              ],
              result: "Despite 56.8 bits raw entropy, the effective entropy is only 16.8 bits because 'password123' is in every breach database. It would be cracked instantly.",
            },
            {
              title: "Strong: kQ8#mL!2xP$5nR7&wZ",
              steps: [
                "Charset: lower (26) + upper (26) + digits (10) + symbols (32) = 94",
                "Length: 18 characters",
                "Raw entropy = 18 × log₂(94) = 18 × 6.55 = 117.9 bits",
                "✅ No patterns detected → 0 penalty",
                "Effective entropy = 117.9 bits → Very Strong",
                "GPU cluster crack time: 2.1 × 10¹⁵ years",
              ],
              result: "117.9 bits with no penalties. This truly random password is effectively uncrackable by any current or near-future technology.",
            },
          ],
        },
      },

      faqs: {
        "0": {
          question: "Is it safe to type my real password here?",
          answer: "Yes. This calculator runs 100% in your browser using JavaScript — your password is never sent to any server, API, or third party. All analysis happens locally on your device. You can verify this by disconnecting from the internet and using the calculator offline. We never store, log, or transmit your input.",
        },
        "1": {
          question: "What is the difference between raw and effective entropy?",
          answer: "Raw entropy is the theoretical maximum based purely on password length and character set size (the classic formula: Length × log₂(charset)). Effective entropy accounts for real-world weaknesses: if your password contains common words, keyboard patterns, sequential characters, or leet speak substitutions, attackers don't need to brute-force every combination. They try these patterns first. Effective entropy subtracts penalties for each detected pattern, giving a more realistic security score.",
        },
        "2": {
          question: "How long should my password be?",
          answer: "At minimum 14 characters, ideally 16 or more. NIST SP 800-63B recommends at least 8 characters as a baseline, but modern security experts and organizations like CISA recommend 16+. Every additional character multiplies the search space by the charset size — adding one character to a mixed-case alphanumeric password multiplies brute-force difficulty by 62×. A 20-character password has over a billion times more combinations than a 14-character one using the same charset.",
        },
        "3": {
          question: "Are passphrases better than random passwords?",
          answer: "For memorability, yes. A 5-word passphrase from a 7,776-word list (like EFF's Diceware) has about 64 bits of entropy — equivalent to a 10-character random mixed password. A 7-word passphrase reaches 90 bits. Passphrases are much easier to type and remember. However, the words must be truly random (not a sentence you'd naturally say). For maximum security, a random 18+ character password from a password manager is still the gold standard.",
        },
        "4": {
          question: "What is the quantum computing scenario?",
          answer: "Grover's algorithm allows a quantum computer to search an unsorted database in √N operations instead of N. For passwords, this effectively halves the entropy bits: a 128-bit password becomes equivalent to 64 bits against a quantum attack. Current quantum computers are far too small and error-prone for this, but it's a useful planning metric. The standard recommendation is to use passwords with 128+ bits of entropy to remain secure even against future quantum threats.",
        },
        "5": {
          question: "Why does 'P@$$w0rd!' score poorly despite using all character types?",
          answer: "Because real attackers don't brute-force character by character — they use dictionaries, breach databases, and rule-based attacks that try common substitutions first. 'P@$$w0rd!' is a leet-speak variant of the #1 most common password in the world. Password crackers like Hashcat and John the Ripper include rules that automatically try a→@, s→$, o→0, and similar substitutions. The raw entropy formula assumes each character is random, but these patterns make the password highly predictable.",
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
      type: "select",
      defaultValue: "offline_fast",
      options: [
        { value: "online_throttled" },
        { value: "online_unthrottled" },
        { value: "offline_slow" },
        { value: "offline_fast" },
        { value: "gpu_cluster" },
        { value: "state_level" },
        { value: "quantum" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "strength", type: "primary", format: "text" },
    { id: "entropyBits", type: "secondary", format: "text" },
    { id: "effectiveEntropy", type: "secondary", format: "text" },
    { id: "crackTime", type: "secondary", format: "text" },
    { id: "charsetSize", type: "secondary", format: "text" },
    { id: "searchSpace", type: "secondary", format: "text" },
    { id: "score", type: "secondary", format: "text" },
    { id: "passwordLength", type: "secondary", format: "text" },
    { id: "patternsFound", type: "secondary", format: "text" },
    { id: "penaltyApplied", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "🔐", itemCount: 4 },
    { id: "details", type: "list", icon: "📊", itemCount: 8 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "crackTimeComparison",
    type: "bar",
    xKey: "scenario",
    height: 320,
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
    modalTitle: "Crack Time Comparison — All 7 Scenarios",
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
    {
      authors: "Grover, L. K.",
      year: "1996",
      title: "A Fast Quantum Mechanical Algorithm for Database Search",
      source: "Proceedings of ACM STOC",
      url: "https://arxiv.org/abs/quant-ph/9605043",
    },
  ],

  hero: { showRating: true, showShare: true },
  sidebar: { showAds: true, showRelated: true },
  features: { save: true, pdf: true, csv: true, excel: true },
  relatedCalculators: ["password-generator", "hash", "encryption-strength"],
  ads: { sidebar: true, footer: true },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (val < 0.001) return val.toExponential(2);
  if (val < 1000) return val.toFixed(2).replace(/\.?0+$/, "");
  return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function formatSearchSpace(combinations: number): string {
  if (!isFinite(combinations)) return "∞";
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
  if (!isFinite(seconds) || seconds > 1e30) return `${v["millennia"] || "millennia"}+`;
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
  if (years < 1000) return `${fmtNum(years)} ${v["years"] || "years"}`;
  if (years < 1e6) return `${fmtNum(Math.round(years))} ${v["years"] || "years"}`;
  if (years < 1e9) return `${fmtNum(years / 1e6)} million ${v["years"] || "years"}`;
  if (years < 1e12) return `${fmtNum(years / 1e9)} billion ${v["years"] || "years"}`;
  if (years < 1e15) return `${fmtNum(years / 1e12)} trillion ${v["years"] || "years"}`;
  return `${v["millennia"] || "millennia"}+`;
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

// ─────────────────────────────────────────────────────────────────────────────
// PATTERN DETECTION & PENALTY SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

// Top 200 most common passwords from breach databases
const COMMON_PASSWORDS = new Set([
  "password", "123456", "12345678", "qwerty", "abc123", "monkey", "1234567",
  "letmein", "trustno1", "dragon", "baseball", "iloveyou", "master", "sunshine",
  "ashley", "bailey", "shadow", "123123", "654321", "superman", "qazwsx",
  "michael", "football", "password1", "password123", "batman", "login",
  "princess", "admin", "welcome", "hello", "charlie", "donald", "qwerty123",
  "password1!", "starwars", "whatever", "freedom", "thunder", "mustang",
  "pepper", "killer", "george", "jordan", "summer", "computer", "hannah",
  "jessica", "ginger", "joshua", "abcdef", "internet", "silver", "samsung",
  "11111", "111111", "1111111", "11111111", "000000", "121212", "987654321",
  "passw0rd", "p@ssword", "p@ssw0rd", "p@$$w0rd", "p@$$word", "pa$$word",
  "password!", "password1!", "password123!", "qwerty1", "qwerty12", "asdfgh",
  "zxcvbn", "1q2w3e", "1q2w3e4r", "1qaz2wsx", "q1w2e3r4", "zaq12wsx",
  "access", "flower", "hottie", "loveme", "zaq1xsw2", "trustno1", "merlin",
  "cookie", "buster", "jennifer", "soccer", "hockey", "ranger", "harley",
  "thomas", "falcon", "andrea", "robert", "joshua1", "matthew", "hunter",
  "marina", "secret", "samantha", "daniel", "nicole", "amanda", "chelsea",
  "diamond", "orange", "banana", "chocolate", "jackson", "jessica1",
  "mercedes", "corvette", "maverick", "matrix", "phantom", "guitar",
  "creative", "blazer", "bigdog", "compaq", "player1", "test", "testing",
  "pass", "pussy", "fucking", "asshole", "6969", "booboo", "lovely",
  "purple", "maria", "angel", "friends", "lovely1", "butter", "sophie",
  "rocket", "junior", "dallas", "yankees", "tigers", "eagles", "steelers",
  "cowboys", "packers", "raiders", "niners", "redsox", "lakers", "celtics",
  "warrior", "spartan", "phoenix", "viking", "ninja", "pirate", "matrix1",
  "matrix12", "letmein1", "superman1", "batman1", "spiderman", "ironman",
  "captain", "avenger", "startrek", "gandalf", "pokemon", "digimon",
  "google", "apple", "amazon", "facebook", "twitter", "linkedin",
  "master1", "master123", "admin1", "admin123", "root", "toor", "changeme",
]);

const KEYBOARD_ROWS = [
  "qwertyuiop", "asdfghjkl", "zxcvbnm",
  "1234567890", "!@#$%^&*()",
  "qwertz", "azerty",  // German/French layouts
];

const LEET_MAP: Record<string, string> = {
  "@": "a", "4": "a", "^": "a",
  "8": "b",
  "(": "c", "{": "c", "<": "c",
  "3": "e",
  "6": "g", "9": "g",
  "#": "h",
  "1": "i", "!": "i", "|": "i",
  "0": "o",
  "$": "s", "5": "s",
  "7": "t", "+": "t",
  "2": "z",
};

interface PatternResult {
  patterns: string[];
  penalty: number;
}

function detectPatterns(password: string): PatternResult {
  const patterns: string[] = [];
  let penalty = 0;
  const lower = password.toLowerCase();

  // 1. Common password match (exact or contained)
  if (COMMON_PASSWORDS.has(lower)) {
    patterns.push("Common password (exact match)");
    penalty += 30;
  } else {
    // Check if password is a common password with appended digits/symbols
    for (const common of COMMON_PASSWORDS) {
      if (lower.startsWith(common) && lower.length <= common.length + 4) {
        patterns.push(`Common password variant ("${common}" + suffix)`);
        penalty += 25;
        break;
      }
    }
  }

  // 2. Leet speak detection — convert and re-check
  const deleetedChars = password.split("").map((c) => LEET_MAP[c] || c.toLowerCase());
  const deleeted = deleetedChars.join("");
  if (deleeted !== lower && COMMON_PASSWORDS.has(deleeted)) {
    patterns.push(`Leet speak variant of "${deleeted}"`);
    penalty += 25;
  }

  // 3. Keyboard walk detection (3+ consecutive chars from same row)
  for (const row of KEYBOARD_ROWS) {
    for (let i = 0; i <= lower.length - 3; i++) {
      const slice = lower.slice(i, i + 3);
      const reversed = slice.split("").reverse().join("");
      if (row.includes(slice) || row.includes(reversed)) {
        patterns.push(`Keyboard walk ("${password.slice(i, i + 3)}")`);
        penalty += 10;
        break;
      }
    }
  }

  // 4. Sequential characters (3+ sequential letters or digits)
  let seqCount = 0;
  for (let i = 1; i < password.length; i++) {
    if (password.charCodeAt(i) === password.charCodeAt(i - 1) + 1) {
      seqCount++;
      if (seqCount >= 2) {
        patterns.push(`Sequential characters ("${password.slice(i - seqCount, i + 1)}")`);
        penalty += 10;
        break;
      }
    } else {
      seqCount = 0;
    }
  }

  // 5. Reverse sequential (cba, 321)
  let revSeqCount = 0;
  for (let i = 1; i < password.length; i++) {
    if (password.charCodeAt(i) === password.charCodeAt(i - 1) - 1) {
      revSeqCount++;
      if (revSeqCount >= 2) {
        patterns.push(`Reverse sequential ("${password.slice(i - revSeqCount, i + 1)}")`);
        penalty += 10;
        break;
      }
    } else {
      revSeqCount = 0;
    }
  }

  // 6. Repeated characters (3+ same char in a row)
  const repeatMatch = password.match(/(.)\1{2,}/);
  if (repeatMatch) {
    patterns.push(`Repeated character ("${repeatMatch[0]}")`);
    penalty += 10;
  }

  // 7. All same character type (only digits, only lowercase, etc.)
  if (/^\d+$/.test(password)) {
    patterns.push("Digits only");
    penalty += 15;
  } else if (/^[a-z]+$/.test(password)) {
    patterns.push("Lowercase only");
    penalty += 10;
  } else if (/^[A-Z]+$/.test(password)) {
    patterns.push("Uppercase only");
    penalty += 10;
  }

  // 8. Trailing year pattern (2019-2030)
  if (/(?:19|20)\d{2}$/.test(password)) {
    patterns.push("Trailing year pattern");
    penalty += 5;
  }

  // 9. Too short (<8)
  if (password.length < 8) {
    patterns.push("Too short (< 8 characters)");
    penalty += 15;
  }

  // Cap penalty at 80% of any reasonable entropy
  penalty = Math.min(penalty, 80);

  return { patterns, penalty };
}

// Generate improvement suggestions based on analysis
function getSuggestions(
  password: string,
  hasLower: boolean,
  hasUpper: boolean,
  hasDigits: boolean,
  hasSymbols: boolean,
  patterns: string[],
  effectiveEntropy: number,
): string[] {
  const suggestions: string[] = [];

  if (password.length < 14) {
    suggestions.push(`Add ${14 - password.length}+ more characters (length is the #1 factor)`);
  }
  if (!hasLower) suggestions.push("Add lowercase letters (a-z)");
  if (!hasUpper) suggestions.push("Add uppercase letters (A-Z)");
  if (!hasDigits) suggestions.push("Add digits (0-9)");
  if (!hasSymbols) suggestions.push("Add symbols (!@#$%^&*)");

  if (patterns.some((p) => p.includes("Common password"))) {
    suggestions.push("Avoid dictionary words and common passwords entirely");
  }
  if (patterns.some((p) => p.includes("Leet speak"))) {
    suggestions.push("Simple letter→symbol substitutions don't fool cracking tools");
  }
  if (patterns.some((p) => p.includes("Keyboard walk"))) {
    suggestions.push("Avoid keyboard patterns — use truly random characters");
  }
  if (patterns.some((p) => p.includes("Trailing year"))) {
    suggestions.push("Remove the year — attackers append common years automatically");
  }

  if (effectiveEntropy >= 80 && suggestions.length === 0) {
    suggestions.push("Excellent! Your password is very strong");
  }

  return suggestions.slice(0, 4); // Max 4 suggestions
}

// ─────────────────────────────────────────────────────────────────────────────
// ATTACK SCENARIOS
// ─────────────────────────────────────────────────────────────────────────────

interface AttackScenario {
  id: string;
  speed: number;
  label: string;
  example: string;
  isQuantum?: boolean;
}

const ATTACK_SCENARIOS: AttackScenario[] = [
  { id: "online_throttled", speed: 100, label: "Online (throttled)", example: "Web login with rate-limiting, CAPTCHA" },
  { id: "online_unthrottled", speed: 1e3, label: "Online (unthrottled)", example: "API without rate limits" },
  { id: "offline_slow", speed: 1e4, label: "Offline (slow hash)", example: "bcrypt/Argon2 on single CPU" },
  { id: "offline_fast", speed: 1e10, label: "Offline (fast hash)", example: "MD5/SHA-1 on modern GPU" },
  { id: "gpu_cluster", speed: 1e11, label: "GPU cluster", example: "8× RTX 4090 or cloud rig" },
  { id: "state_level", speed: 1e13, label: "State-level", example: "Nation-state resources" },
  { id: "quantum", speed: 0, label: "Quantum (Grover)", example: "Theoretical quantum computer", isQuantum: true },
];

function getScenarioSpeed(scenarioId: string): number {
  const found = ATTACK_SCENARIOS.find((s) => s.id === scenarioId);
  return found?.speed || 1e10;
}

function getCrackTimeForScenario(
  searchSpace: number,
  effectiveEntropy: number,
  scenario: AttackScenario,
): number {
  if (scenario.isQuantum) {
    // Grover's algorithm: effective entropy is halved
    const quantumEntropy = effectiveEntropy / 2;
    const quantumSpace = Math.pow(2, quantumEntropy);
    // Assume 1 million quantum operations/sec (optimistic near-future)
    return quantumSpace / (2 * 1e6);
  }
  return searchSpace / (2 * scenario.speed);
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATE
// ─────────────────────────────────────────────────────────────────────────────

export function calculatePasswordStrength(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const password = (values.password as string) || "";
  const attackScenarioId = (values.attackScenario as string) || "offline_fast";

  if (!password || password.length === 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Character Analysis ──────────────────────────────────────────────
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigits = /[0-9]/.test(password);
  const hasSymbols = /[^A-Za-z0-9\s]/.test(password);
  const hasSpaces = /\s/.test(password);
  const hasUnicode = /[^\x20-\x7E]/.test(password);

  let charsetSize = 0;
  if (hasLower) charsetSize += 26;
  if (hasUpper) charsetSize += 26;
  if (hasDigits) charsetSize += 10;
  if (hasSymbols) charsetSize += 32;
  if (hasSpaces) charsetSize += 1;
  if (hasUnicode) charsetSize += 64;
  if (charsetSize === 0) charsetSize = 1;

  const length = password.length;

  // ── Raw Entropy ─────────────────────────────────────────────────────
  const rawEntropy = length * Math.log2(charsetSize);
  const rawEntropyRounded = Math.round(rawEntropy * 10) / 10;

  // ── Pattern Detection & Penalties ───────────────────────────────────
  const { patterns, penalty } = detectPatterns(password);
  const effectiveEntropy = Math.max(0, Math.round((rawEntropy - penalty) * 10) / 10);

  // ── Search Space (based on effective entropy for crack time) ────────
  const rawSearchSpace = Math.pow(charsetSize, length);
  const effectiveSearchSpace = Math.pow(2, effectiveEntropy);

  // ── Primary Crack Time ──────────────────────────────────────────────
  const primaryScenario = ATTACK_SCENARIOS.find((s) => s.id === attackScenarioId) || ATTACK_SCENARIOS[3];
  const primaryCrackTime = getCrackTimeForScenario(effectiveSearchSpace, effectiveEntropy, primaryScenario);

  // ── All Scenarios for Table & Chart ─────────────────────────────────
  const tableData = ATTACK_SCENARIOS.map((s) => {
    const time = getCrackTimeForScenario(effectiveSearchSpace, effectiveEntropy, s);
    return {
      scenario: s.label,
      speed: s.isQuantum ? "√N reduction" : fmtNum(s.speed),
      time: formatCrackTime(time, v),
      example: s.example,
    };
  });

  const chartData = ATTACK_SCENARIOS.map((s) => {
    const time = getCrackTimeForScenario(effectiveSearchSpace, effectiveEntropy, s);
    const logTime = time > 0 && isFinite(time) ? Math.log10(Math.max(time, 0.001)) : 0;
    return {
      scenario: s.label.split(" (")[0],
      logTime: Math.round(logTime * 100) / 100,
    };
  });

  // ── Strength & Score ────────────────────────────────────────────────
  const strength = getStrengthLabel(effectiveEntropy, v);
  const score = getStrengthScore(effectiveEntropy);

  // ── Suggestions ─────────────────────────────────────────────────────
  const suggestions = getSuggestions(password, hasLower, hasUpper, hasDigits, hasSymbols, patterns, effectiveEntropy);

  // ── Format labels ───────────────────────────────────────────────────
  const yesLabel = v["yes"] || "Yes";
  const noLabel = v["no"] || "No";
  const bitsLabel = v["bits"] || "bits";
  const charsLabel = v["characters"] || "characters";
  const noneLabel = v["none"] || "None detected";

  const patternsStr = patterns.length > 0 ? patterns.join("; ") : noneLabel;
  const penaltyStr = penalty > 0 ? `−${penalty} ${bitsLabel}` : `0 ${bitsLabel}`;
  const suggestionsStr = suggestions.join(" • ");

  // ── Scenario label for summary ──────────────────────────────────────
  const scenarioLabel = primaryScenario.label;

  const summary = (f.summary || "Your password has {entropy} bits of entropy ({effectiveEntropy} effective) — rated {strength}. Crack time ({scenario}): {crackTime}.")
    .replace("{entropy}", `${rawEntropyRounded}`)
    .replace("{effectiveEntropy}", `${effectiveEntropy}`)
    .replace("{strength}", strength)
    .replace("{scenario}", scenarioLabel)
    .replace("{crackTime}", formatCrackTime(primaryCrackTime, v));

  return {
    values: {
      strength,
      entropyBits: rawEntropyRounded,
      effectiveEntropy,
      crackTime: primaryCrackTime,
      charsetSize,
      searchSpace: rawSearchSpace,
      score,
      passwordLength: length,
      patternsFound: patterns.length,
      penaltyApplied: penalty,
      // Hidden values for infoCards
      hasLowercase: hasLower,
      hasUppercase: hasUpper,
      hasDigits: hasDigits,
      hasSymbols: hasSymbols,
      hasSpaces: hasSpaces,
      suggestions: suggestionsStr,
    },
    formatted: {
      strength,
      entropyBits: `${rawEntropyRounded} ${bitsLabel}`,
      effectiveEntropy: `${effectiveEntropy} ${bitsLabel}`,
      crackTime: formatCrackTime(primaryCrackTime, v),
      charsetSize: `${charsetSize} ${charsLabel}`,
      searchSpace: formatSearchSpace(rawSearchSpace),
      score: `${score}/5`,
      passwordLength: `${length} ${charsLabel}`,
      patternsFound: patterns.length > 0 ? `${patterns.length} (${patternsStr})` : noneLabel,
      penaltyApplied: penaltyStr,
      // Hidden values for infoCards
      hasLowercase: hasLower ? yesLabel : noLabel,
      hasUppercase: hasUpper ? yesLabel : noLabel,
      hasDigits: hasDigits ? yesLabel : noLabel,
      hasSymbols: hasSymbols ? yesLabel : noLabel,
      hasSpaces: hasSpaces ? yesLabel : noLabel,
      suggestions: suggestionsStr || "No suggestions — your password is strong!",
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default passwordStrengthConfig;
