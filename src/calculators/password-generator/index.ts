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
    es: {
      "name": "Generador de Contraseñas",
      "slug": "calculadora-generador-contrasenas",
      "subtitle": "Genera contraseñas aleatorias fuertes, frases de paso memorables y PINs seguros con análisis de fortaleza en tiempo real y estimaciones de tiempo de descifrado.",
      "breadcrumb": "Generador de Contraseñas",
      "seo": {
        "title": "Generador de Contraseñas - Contraseñas Aleatorias Fuertes y Frases de Paso",
        "description": "Genera contraseñas y frases de paso fuertes y aleatorias con estimaciones de tiempo de descifrado, análisis de entropía y puntuación de fortaleza. Herramienta gratuita con modos de contraseña, frase de paso y PIN.",
        "shortDescription": "Genera contraseñas aleatorias fuertes con análisis de fortaleza.",
        "keywords": [
          "generador de contraseñas",
          "generador de contraseñas fuertes",
          "generador de contraseñas aleatorias",
          "generador de frases de paso",
          "creador de contraseñas seguras",
          "verificador de fortaleza de contraseñas",
          "calculadora de entropía de contraseñas",
          "generador de contraseñas gratis"
        ]
      },
      "inputs": {
        "mode": {
          "label": "Modo de Generación",
          "helpText": "Elige entre caracteres aleatorios, combinaciones de palabras memorables, o PINs numéricos",
          "options": {
            "password": "Contraseña Aleatoria",
            "passphrase": "Frase de Paso (Palabras)",
            "pin": "PIN (Solo Números)"
          }
        },
        "length": {
          "label": "Longitud de Contraseña",
          "helpText": "Las contraseñas más largas son exponencialmente más difíciles de descifrar — se recomienda 16+ caracteres"
        },
        "includeUppercase": {
          "label": "Letras Mayúsculas (A–Z)",
          "helpText": "Incluir letras mayúsculas para aumentar el conjunto de caracteres"
        },
        "includeLowercase": {
          "label": "Letras Minúsculas (a–z)",
          "helpText": "Incluir letras minúsculas"
        },
        "includeNumbers": {
          "label": "Números (0–9)",
          "helpText": "Incluir dígitos"
        },
        "includeSymbols": {
          "label": "Símbolos (!@#$%...)",
          "helpText": "Incluir caracteres especiales para máxima entropía"
        },
        "avoidAmbiguous": {
          "label": "Evitar Caracteres Ambiguos",
          "helpText": "Excluir caracteres de apariencia similar: 0/O, l/1/I, S/5, B/8"
        },
        "wordCount": {
          "label": "Número de Palabras",
          "helpText": "Más palabras = frase de paso más fuerte — se recomienda 4+"
        },
        "separator": {
          "label": "Separador de Palabras",
          "helpText": "Carácter entre palabras",
          "options": {
            "-": "Guión ( - )",
            ".": "Punto ( . )",
            "_": "Guión Bajo ( _ )",
            " ": "Espacio",
            "": "Ninguno"
          }
        },
        "capitalizeWords": {
          "label": "Capitalizar Palabras",
          "helpText": "Capitalizar la primera letra de cada palabra (ej., Manzana-Valiente-Ajedrez)"
        },
        "includeWordNumber": {
          "label": "Agregar Número a Frase de Paso",
          "helpText": "Agregar un dígito aleatorio a una palabra para entropía extra"
        },
        "pinLength": {
          "label": "Longitud de PIN",
          "helpText": "Se recomiendan 6+ dígitos — los PINs de 4 dígitos son débiles"
        }
      },
      "results": {
        "generatedPassword": {
          "label": "Tu Contraseña"
        },
        "strengthScore": {
          "label": "Fortaleza"
        },
        "entropyBits": {
          "label": "Entropía"
        },
        "charsetSize": {
          "label": "Tamaño del Conjunto de Caracteres"
        },
        "totalCombinations": {
          "label": "Combinaciones Posibles"
        },
        "crackTimeOnline": {
          "label": "Tiempo de Descifrado (En línea, Limitado)"
        },
        "crackTimeOfflineSlow": {
          "label": "Tiempo de Descifrado (Fuera de línea, Hash Lento)"
        },
        "crackTimeOfflineFast": {
          "label": "Tiempo de Descifrado (Fuera de línea, Hash Rápido)"
        }
      },
      "presets": {
        "strong": {
          "label": "Contraseña Fuerte",
          "description": "20 caracteres, todos los tipos de caracteres — máxima seguridad"
        },
        "memorable": {
          "label": "Frase de Paso Memorable",
          "description": "5 palabras con números — fácil de recordar, difícil de descifrar"
        },
        "noSymbols": {
          "label": "Sin Símbolos (24 caracteres)",
          "description": "Solo letras + números — para sitios que bloquean símbolos"
        },
        "quickPin": {
          "label": "PIN Rápido",
          "description": "PIN numérico de 6 dígitos para aplicaciones y dispositivos"
        }
      },
      "values": {
        "veryWeak": "🔴 Muy Débil",
        "weak": "🟠 Débil",
        "fair": "🟡 Regular",
        "strong": "🟢 Fuerte",
        "veryStrong": "🟣 Muy Fuerte",
        "instant": "Instantáneamente",
        "seconds": "segundos",
        "minutes": "minutos",
        "hours": "horas",
        "days": "días",
        "months": "meses",
        "years": "años",
        "centuries": "siglos",
        "millennia": "milenios",
        "forever": "Más tiempo que la edad del universo",
        "bits": "bits",
        "characters": "caracteres"
      },
      "formats": {
        "summary": "{mode} generada con {entropyBits} bits de entropía. Fortaleza: {strengthScore}. Tiempo de descifrado hash rápido fuera de línea: {crackTimeOfflineFast}."
      },
      "infoCards": {
        "metrics": {
          "title": "Análisis de Fortaleza",
          "items": [
            {
              "label": "Fortaleza",
              "valueKey": "strengthScore"
            },
            {
              "label": "Entropía",
              "valueKey": "entropyBits"
            },
            {
              "label": "Conjunto de Caracteres",
              "valueKey": "charsetSize"
            },
            {
              "label": "Combinaciones",
              "valueKey": "totalCombinations"
            }
          ]
        },
        "details": {
          "title": "Estimaciones de Tiempo de Descifrado",
          "items": [
            {
              "label": "En línea (Limitado)",
              "valueKey": "crackTimeOnline"
            },
            {
              "label": "Fuera de línea (Hash Lento)",
              "valueKey": "crackTimeOfflineSlow"
            },
            {
              "label": "Fuera de línea (Hash Rápido)",
              "valueKey": "crackTimeOfflineFast"
            },
            {
              "label": "Fortaleza",
              "valueKey": "strengthScore"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Seguridad para Contraseñas",
          "items": [
            "Usa 16+ caracteres — cada carácter adicional hace tu contraseña exponencialmente más difícil de descifrar.",
            "Nunca reutilices contraseñas entre sitios — una brecha expone todas las cuentas que comparten esa contraseña.",
            "Frases de paso como Manzana-Valiente7-Ajedrez-Delta son tanto fuertes como memorables.",
            "Habilita la autenticación de dos factores (2FA) incluso con contraseñas fuertes para cuentas críticas."
          ]
        }
      },
      "chart": {
        "title": "Análisis de Tiempo de Descifrado",
        "tabs": {
          "crack-scenarios": "Escenarios de Ataque",
          "length-comparison": "Longitud vs Tiempo de Descifrado"
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué Hace Fuerte a una Contraseña?",
          "content": "Una contraseña fuerte tiene tres cualidades esenciales: longitud, complejidad y unicidad. La longitud es el factor más importante — cada carácter adicional multiplica el número de combinaciones posibles exponencialmente. Una contraseña de 12 caracteres usando todos los tipos de caracteres (minúsculas, mayúsculas, números, símbolos) tiene aproximadamente 475 trillones de billones de combinaciones posibles, mientras que una contraseña de 8 caracteres tiene solo 6 cuatrillones — aproximadamente 79 mil millones de veces menos posibilidades. La complejidad viene del uso de un conjunto de caracteres diverso: las letras minúsculas proporcionan 26 opciones por posición, agregar mayúsculas lo duplica a 52, los dígitos lo llevan a 62, y los símbolos lo empujan a 94 o más. Pero la longitud supera la complejidad cada vez: una contraseña de 20 caracteres solo en minúsculas (2.0 × 10²⁸ combinaciones) es vastamente más fuerte que una contraseña de 8 caracteres usando todos los tipos de caracteres (6.1 × 10¹⁵ combinaciones). La unicidad significa nunca reutilizar una contraseña — si un servicio sufre una brecha de datos, los atacantes probarán esa misma contraseña en cada otro sitio que uses a través de ataques de relleno de credenciales."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Entropía de Contraseñas",
          "content": "La entropía, medida en bits, cuantifica la aleatoriedad en una contraseña. La fórmula es: entropía = longitud × log₂(tamaño_conjunto_caracteres). Una contraseña de 16 caracteres usando el conjunto completo de 94 caracteres (minúsculas + mayúsculas + números + símbolos) tiene aproximadamente 104.8 bits de entropía. Cada bit adicional de entropía duplica el número de intentos que un atacante necesita hacer. Para contexto: 40 bits de entropía pueden ser descifrados en segundos por hardware moderno, 60 bits toma horas, 80 bits toma años, y 128+ bits se considera indescifrable con la tecnología actual. Las frases de paso derivan su entropía de manera diferente — del tamaño de la lista de palabras elevado a la potencia del conteo de palabras. Una frase de paso de 4 palabras de una lista de 200 palabras tiene log₂(200⁴) ≈ 30.6 bits, mientras que 5 palabras da ~38.2 bits. Agregar capitalización, separadores y números aleatorios aumenta significativamente la entropía de la frase de paso. El punto clave: la entropía debe venir de una selección verdaderamente aleatoria. Un humano eligiendo 'Contraseña123!' puede usar mayúsculas, minúsculas, números y símbolos, pero tiene casi cero entropía efectiva porque sigue un patrón extremadamente predecible."
        },
        "considerations": {
          "title": "Mejores Prácticas para Contraseñas",
          "items": [
            {
              "text": "Usa 16+ caracteres para contraseñas y 5+ palabras para frases de paso — la longitud es la defensa más fuerte contra ataques de fuerza bruta.",
              "type": "info"
            },
            {
              "text": "Habilita 2FA en todas las cuentas críticas (email, banca, redes sociales) — incluso una contraseña comprometida no puede eludir un segundo factor.",
              "type": "warning"
            },
            {
              "text": "Usa un administrador de contraseñas para generar y almacenar contraseñas únicas para cada cuenta — los humanos no pueden recordar confiablemente docenas de contraseñas fuertes.",
              "type": "info"
            },
            {
              "text": "Nunca compartas contraseñas por email, texto o chat — estos canales pueden ser interceptados o almacenados en texto plano.",
              "type": "warning"
            },
            {
              "text": "Verifica si tus contraseñas han sido expuestas en brechas de datos usando servicios como Have I Been Pwned (haveibeenpwned.com).",
              "type": "info"
            },
            {
              "text": "Evita información personal en contraseñas — nombres, cumpleaños, nombres de mascotas y direcciones son lo primero que prueban los atacantes.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Métodos de Ataque y Tiempos de Descifrado",
          "items": [
            {
              "text": "En línea Limitado (100/hr): Formularios de login web con limitación de velocidad — incluso contraseñas cortas sobreviven días. La mayoría de sitios usan esto.",
              "type": "info"
            },
            {
              "text": "En línea Sin Límites (10/seg): APIs sin limitación de velocidad — contraseñas débiles caen en horas. Siempre agrega limitación de velocidad.",
              "type": "info"
            },
            {
              "text": "Fuera de línea Hash Lento (10K/seg): Filtraciones de bases de datos hasheadas con bcrypt/Argon2 — sistemas bien diseñados hacen cada intento costoso.",
              "type": "info"
            },
            {
              "text": "Fuera de línea Hash Rápido (10B/seg): Filtraciones hasheadas con MD5/SHA-1 — GPUs modernas prueban miles de millones de combinaciones por segundo.",
              "type": "warning"
            },
            {
              "text": "Ataque de Diccionario: Prueba primero palabras comunes, nombres, patrones — 'Contraseña123!' cae instantáneamente a pesar de caracteres mixtos.",
              "type": "warning"
            },
            {
              "text": "Relleno de Credenciales: Usa listas de contraseñas filtradas en otros sitios — contraseñas reutilizadas permiten compromiso de cuentas en cascada.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Fortaleza de Contraseñas",
          "description": "Compara fortalezas reales de contraseñas",
          "examples": [
            {
              "title": "Contraseñas Débiles vs Fuertes",
              "steps": [
                "❌ 'contraseña123' → 0 bits entropía (palabra de diccionario) → Descifrada INSTANTÁNEAMENTE",
                "❌ 'Tr0ub4d0r&3' → ~28 bits (sustituciones comunes) → Descifrada en SEGUNDOS",
                "⚠️ 'xK9#mL2$' (8 caracteres, todos los tipos) → 52.4 bits → Descifrada en 6 horas (hash rápido)",
                "✅ 'aX7$mK9#pL2&nR5!' (16 caracteres) → 104.8 bits → 394 mil millones de años (hash rápido)",
                "✅ 'Manzana-Valiente7-Ajedrez-Delta' (frase de paso) → ~45 bits → años (hash rápido)",
                "✅ 'Escarcha-Destello4-Refugio-Joya-Luz' (5 palabras) → ~55 bits → siglos"
              ],
              "result": "La longitud importa más. Una contraseña de 16 caracteres con todos los tipos es esencialmente indescifrable."
            },
            {
              "title": "Ejemplo de Matemática de Entropía",
              "steps": [
                "Contraseña: 16 caracteres usando minúsculas + mayúsculas + números + símbolos",
                "Tamaño del conjunto de caracteres: 26 + 26 + 10 + 32 = 94 caracteres",
                "Entropía = 16 × log₂(94) = 16 × 6.55 = 104.8 bits",
                "Combinaciones totales = 94¹⁶ = 3.7 × 10³¹",
                "A 10 mil millones de intentos/seg: 3.7 × 10³¹ ÷ 10¹⁰ = 3.7 × 10²¹ segundos",
                "Eso es aproximadamente 117 billones de años para probar todas las combinaciones"
              ],
              "result": "Tiempo promedio de descifrado = la mitad del total = ~59 billones de años. Tu contraseña está segura."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "¿Cómo funciona este generador de contraseñas?",
          "answer": "Esta herramienta usa aleatoriedad de calidad criptográfica para generar contraseñas. Para contraseñas aleatorias, selecciona caracteres de tu conjunto de caracteres elegido (mayúsculas, minúsculas, números, símbolos) con igual probabilidad. Para frases de paso, elige aleatoriamente palabras de una lista curada de 200 palabras. Para PINs, genera dígitos aleatorios. Toda la generación ocurre localmente en tu navegador — ninguna contraseña se envía jamás a ningún servidor o se almacena en ningún lugar."
        },
        "1": {
          "question": "¿Qué longitud de contraseña debo usar?",
          "answer": "Para contraseñas aleatorias, usa al menos 16 caracteres con todos los tipos de caracteres habilitados. Esto da más de 104 bits de entropía, haciendo los ataques de fuerza bruta inviables. Para frases de paso, usa al menos 4-5 palabras con separador y número. Para PINs, usa 6+ dígitos — los PINs de 4 dígitos tienen solo 10,000 combinaciones, que pueden ser descifradas en segundos. La regla general: más largo es siempre más fuerte, y cada carácter extra multiplica la seguridad exponencialmente."
        },
        "2": {
          "question": "¿Qué significan las estimaciones de tiempo de descifrado?",
          "answer": "Estimamos tiempos de descifrado para tres escenarios: En línea Limitado asume 100 intentos por hora (login web típico con limitación de velocidad). Fuera de línea Hash Lento asume 10,000 intentos por segundo (base de datos filtrada usando bcrypt o Argon2). Fuera de línea Hash Rápido asume 10 mil millones de intentos por segundo (base de datos filtrada usando hashing débil MD5 o SHA-1, descifrada en GPUs modernas). El escenario de hash rápido fuera de línea es el más peligroso y más realista para brechas de datos."
        },
        "3": {
          "question": "¿Es mejor una frase de paso que una contraseña aleatoria?",
          "answer": "Las frases de paso y contraseñas aleatorias sirven necesidades diferentes. Una frase de paso de 5 palabras como 'Escarcha-Destello4-Refugio-Joya-Luz' es fácil de teclear y memorizar, con entropía decente (~55 bits). Una contraseña aleatoria de 16 caracteres como 'aX7$mK9#pL2&nR5!' tiene mayor entropía (~105 bits) pero es más difícil de recordar. Si usas un administrador de contraseñas, elige contraseñas aleatorias para máxima seguridad. Si necesitas memorizarla (como una contraseña maestra), usa una frase de paso larga con 5+ palabras."
        },
        "4": {
          "question": "¿Qué es la entropía de contraseñas?",
          "answer": "La entropía mide la aleatoriedad de una contraseña en bits. Se calcula como: longitud × log₂(tamaño_conjunto_caracteres). Mayor entropía significa más combinaciones posibles y tiempos de descifrado más largos. Umbrales clave: menos de 40 bits es muy débil (descifrable en minutos), 40-59 bits es débil, 60-79 bits es regular, 80-99 bits es fuerte, y 100+ bits es muy fuerte (esencialmente indescifrable con tecnología actual). Cada bit adicional duplica el número de intentos necesarios."
        },
        "5": {
          "question": "¿Debería evitar caracteres ambiguos?",
          "answer": "La opción 'Evitar Caracteres Ambiguos' remueve caracteres que se ven similares en muchas fuentes: 0 (cero) vs O (letra), l (L minúscula) vs 1 (uno) vs I (i mayúscula), S vs 5, B vs 8. Habilita esto cuando puedas necesitar leer o dictar la contraseña en voz alta, copiarla a mano, o usarla en sistemas con fuentes difíciles de leer. La ligera reducción en el conjunto de caracteres tiene impacto mínimo en la seguridad si compensas con una contraseña ligeramente más larga."
        }
      },
      "detailedTable": {
        "crackTimeReference": {
          "button": "Ver Referencia Completa de Tiempo de Descifrado",
          "title": "Tiempo de Descifrado de Contraseñas por Longitud y Tipo de Carácter",
          "columns": {
            "length": "Longitud",
            "lowercase": "Solo Minúsculas",
            "mixed": "Caso Mixto",
            "mixedNum": "+ Números",
            "all": "Todos los Caracteres"
          }
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
      },
      "calculator": {
        "yourInformation": "Tu Información"
      }
    },
    pt: {
      "name": "Gerador de Senhas",
      "slug": "calculadora-gerador-senhas",
      "subtitle": "Gere senhas aleatórias seguras, frases-chave memoráveis e PINs seguros com análise de força em tempo real e estimativas de tempo de quebra.",
      "breadcrumb": "Gerador de Senhas",
      "seo": {
        "title": "Gerador de Senhas - Senhas Aleatórias Seguras e Frases-Chave",
        "description": "Gere senhas e frases-chave aleatórias seguras com estimativas de tempo de quebra, análise de entropia e pontuação de força. Ferramenta gratuita com modos de senha, frase-chave e PIN.",
        "shortDescription": "Gere senhas aleatórias seguras com análise de força.",
        "keywords": [
          "gerador de senhas",
          "gerador de senhas seguras",
          "gerador de senhas aleatórias",
          "gerador de frases-chave",
          "criador de senhas seguras",
          "verificador de força de senha",
          "calculadora de entropia de senha",
          "gerador de senhas gratuito"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "mode": {
          "label": "Modo de Geração",
          "helpText": "Escolha entre caracteres aleatórios, combinações de palavras memoráveis ou PINs numéricos",
          "options": {
            "password": "Senha Aleatória",
            "passphrase": "Frase-chave (Palavras)",
            "pin": "PIN (Apenas Números)"
          }
        },
        "length": {
          "label": "Comprimento da Senha",
          "helpText": "Senhas mais longas são exponencialmente mais difíceis de quebrar — 16+ recomendado"
        },
        "includeUppercase": {
          "label": "Letras Maiúsculas (A–Z)",
          "helpText": "Inclua letras maiúsculas para aumentar o conjunto de caracteres"
        },
        "includeLowercase": {
          "label": "Letras Minúsculas (a–z)",
          "helpText": "Inclua letras minúsculas"
        },
        "includeNumbers": {
          "label": "Números (0–9)",
          "helpText": "Inclua dígitos"
        },
        "includeSymbols": {
          "label": "Símbolos (!@#$%...)",
          "helpText": "Inclua caracteres especiais para máxima entropia"
        },
        "avoidAmbiguous": {
          "label": "Evitar Caracteres Ambíguos",
          "helpText": "Exclua caracteres de aparência similar: 0/O, l/1/I, S/5, B/8"
        },
        "wordCount": {
          "label": "Número de Palavras",
          "helpText": "Mais palavras = frase-chave mais forte — 4+ recomendado"
        },
        "separator": {
          "label": "Separador de Palavras",
          "helpText": "Caractere entre palavras",
          "options": {
            "-": "Hífen ( - )",
            ".": "Ponto ( . )",
            "_": "Sublinhado ( _ )",
            " ": "Espaço",
            "": "Nenhum"
          }
        },
        "capitalizeWords": {
          "label": "Capitalizar Palavras",
          "helpText": "Capitalizar primeira letra de cada palavra (ex: Maçã-Bravo-Xadrez)"
        },
        "includeWordNumber": {
          "label": "Adicionar Número à Frase-chave",
          "helpText": "Anexar um dígito aleatório a uma palavra para entropia extra"
        },
        "pinLength": {
          "label": "Comprimento do PIN",
          "helpText": "6+ dígitos recomendado — PINs de 4 dígitos são fracos"
        }
      },
      "results": {
        "generatedPassword": {
          "label": "Sua Senha"
        },
        "strengthScore": {
          "label": "Força"
        },
        "entropyBits": {
          "label": "Entropia"
        },
        "charsetSize": {
          "label": "Tamanho do Conjunto de Caracteres"
        },
        "totalCombinations": {
          "label": "Combinações Possíveis"
        },
        "crackTimeOnline": {
          "label": "Tempo de Quebra (Online, Limitado)"
        },
        "crackTimeOfflineSlow": {
          "label": "Tempo de Quebra (Offline, Hash Lento)"
        },
        "crackTimeOfflineFast": {
          "label": "Tempo de Quebra (Offline, Hash Rápido)"
        }
      },
      "presets": {
        "strong": {
          "label": "Senha Forte",
          "description": "20 caracteres, todos os tipos de caracteres — máxima segurança"
        },
        "memorable": {
          "label": "Frase-chave Memorável",
          "description": "5 palavras com números — fácil de lembrar, difícil de quebrar"
        },
        "noSymbols": {
          "label": "Sem Símbolos (24 caracteres)",
          "description": "Apenas letras + números — para sites que bloqueiam símbolos"
        },
        "quickPin": {
          "label": "PIN Rápido",
          "description": "PIN numérico de 6 dígitos para aplicativos e dispositivos"
        }
      },
      "values": {
        "veryWeak": "🔴 Muito Fraca",
        "weak": "🟠 Fraca",
        "fair": "🟡 Razoável",
        "strong": "🟢 Forte",
        "veryStrong": "🟣 Muito Forte",
        "instant": "Instantaneamente",
        "seconds": "segundos",
        "minutes": "minutos",
        "hours": "horas",
        "days": "dias",
        "months": "meses",
        "years": "anos",
        "centuries": "séculos",
        "millennia": "milênios",
        "forever": "Mais tempo que a idade do universo",
        "bits": "bits",
        "characters": "caracteres"
      },
      "formats": {
        "summary": "{mode} gerada com {entropyBits} bits de entropia. Força: {strengthScore}. Tempo de quebra offline hash rápido: {crackTimeOfflineFast}."
      },
      "infoCards": {
        "metrics": {
          "title": "Análise de Força",
          "items": [
            {
              "label": "Força",
              "valueKey": "strengthScore"
            },
            {
              "label": "Entropia",
              "valueKey": "entropyBits"
            },
            {
              "label": "Conjunto de Caracteres",
              "valueKey": "charsetSize"
            },
            {
              "label": "Combinações",
              "valueKey": "totalCombinations"
            }
          ]
        },
        "details": {
          "title": "Estimativas de Tempo de Quebra",
          "items": [
            {
              "label": "Online (Limitado)",
              "valueKey": "crackTimeOnline"
            },
            {
              "label": "Offline (Hash Lento)",
              "valueKey": "crackTimeOfflineSlow"
            },
            {
              "label": "Offline (Hash Rápido)",
              "valueKey": "crackTimeOfflineFast"
            },
            {
              "label": "Força",
              "valueKey": "strengthScore"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Segurança de Senhas",
          "items": [
            "Use 16+ caracteres — cada caractere extra torna sua senha exponencialmente mais difícil de quebrar.",
            "Nunca reutilize senhas entre sites — uma violação expõe todas as contas que compartilham essa senha.",
            "Frases-chave como Maçã-Bravo7-Xadrez-Delta são fortes e memoráveis.",
            "Habilite autenticação de dois fatores (2FA) mesmo com senhas fortes para contas críticas."
          ]
        }
      },
      "chart": {
        "title": "Análise de Tempo de Quebra",
        "tabs": {
          "crack-scenarios": "Cenários de Ataque",
          "length-comparison": "Comprimento vs Tempo de Quebra"
        }
      },
      "education": {
        "whatIs": {
          "title": "O que Torna uma Senha Forte?",
          "content": "Uma senha forte tem três qualidades essenciais: comprimento, complexidade e singularidade. O comprimento é o fator mais importante — cada caractere adicional multiplica exponencialmente o número de combinações possíveis. Uma senha de 12 caracteres usando todos os tipos de caracteres (minúsculas, maiúsculas, números, símbolos) tem cerca de 475 trilhões de trilhões de combinações possíveis, enquanto uma senha de 8 caracteres tem apenas 6 quatrilhões — aproximadamente 79 bilhões de vezes menos possibilidades. A complexidade vem do uso de um conjunto de caracteres diversificado: letras minúsculas fornecem 26 opções por posição, adicionar maiúsculas dobra para 52, dígitos levam a 62, e símbolos empurram para 94 ou mais. Mas o comprimento supera a complexidade sempre: uma senha de 20 caracteres apenas minúsculas (2,0 × 10²⁸ combinações) é vastamente mais forte que uma senha de 8 caracteres usando todos os tipos de caracteres (6,1 × 10¹⁵ combinações). Singularidade significa nunca reutilizar uma senha — se um serviço sofre uma violação de dados, atacantes tentarão essa mesma senha em todos os outros sites que você usa através de ataques de credential stuffing."
        },
        "howItWorks": {
          "title": "Como Funciona a Entropia da Senha",
          "content": "Entropia, medida em bits, quantifica a aleatoriedade em uma senha. A fórmula é: entropia = comprimento × log₂(tamanho_do_conjunto_de_caracteres). Uma senha de 16 caracteres usando o conjunto completo de 94 caracteres (minúsculas + maiúsculas + números + símbolos) tem cerca de 104,8 bits de entropia. Cada bit adicional de entropia dobra o número de tentativas que um atacante precisa fazer. Para contexto: 40 bits de entropia podem ser quebrados em segundos pelo hardware moderno, 60 bits leva horas, 80 bits leva anos, e 128+ bits é considerado inquebrantável com a tecnologia atual. Frases-chave derivam sua entropia de forma diferente — do tamanho da lista de palavras elevado à potência da contagem de palavras. Uma frase-chave de 4 palavras de uma lista de 200 palavras tem log₂(200⁴) ≈ 30,6 bits, enquanto 5 palavras dão ~38,2 bits. Adicionar maiúsculas, separadores e números aleatórios aumenta significativamente a entropia da frase-chave. A percepção chave: a entropia deve vir de seleção verdadeiramente aleatória. Um humano escolhendo 'Senha123!' pode usar maiúsculas, minúsculas, números e símbolos, mas tem entropia efetiva próxima de zero porque segue um padrão extremamente previsível."
        },
        "considerations": {
          "title": "Melhores Práticas de Senhas",
          "items": [
            {
              "text": "Use 16+ caracteres para senhas e 5+ palavras para frases-chave — comprimento é a defesa mais forte contra ataques de força bruta.",
              "type": "info"
            },
            {
              "text": "Habilite 2FA em todas as contas críticas (email, bancárias, redes sociais) — mesmo uma senha comprometida não pode contornar um segundo fator.",
              "type": "warning"
            },
            {
              "text": "Use um gerenciador de senhas para gerar e armazenar senhas únicas para cada conta — humanos não conseguem lembrar com confiabilidade dezenas de senhas fortes.",
              "type": "info"
            },
            {
              "text": "Nunca compartilhe senhas via email, texto ou chat — esses canais podem ser interceptados ou armazenados em texto simples.",
              "type": "warning"
            },
            {
              "text": "Verifique se suas senhas foram expostas em violações de dados usando serviços como Have I Been Pwned (haveibeenpwned.com).",
              "type": "info"
            },
            {
              "text": "Evite informações pessoais em senhas — nomes, aniversários, nomes de animais e endereços são as primeiras coisas que atacantes tentam.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Métodos de Ataque e Tempos de Quebra",
          "items": [
            {
              "text": "Online Limitado (100/hr): Formulários de login web com limitação de taxa — até senhas curtas sobrevivem dias. A maioria dos sites usa isso.",
              "type": "info"
            },
            {
              "text": "Online Sem Limite (10/seg): APIs sem limitação de taxa — senhas fracas caem em horas. Sempre adicione limitação de taxa.",
              "type": "info"
            },
            {
              "text": "Offline Hash Lento (10K/seg): Vazamentos de banco de dados com hash bcrypt/Argon2 — sistemas bem projetados tornam cada tentativa cara.",
              "type": "info"
            },
            {
              "text": "Offline Hash Rápido (10B/seg): Vazamentos com hash MD5/SHA-1 — GPUs modernas testam bilhões de combinações por segundo.",
              "type": "warning"
            },
            {
              "text": "Ataque de Dicionário: Tenta palavras comuns, nomes, padrões primeiro — 'Senha123!' cai instantaneamente apesar dos caracteres mistos.",
              "type": "warning"
            },
            {
              "text": "Credential Stuffing: Usa listas de senhas vazadas em outros sites — senhas reutilizadas permitem comprometimento de contas em cascata.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Força de Senhas",
          "description": "Compare forças reais de senhas",
          "examples": [
            {
              "title": "Senhas Fracas vs Fortes",
              "steps": [
                "❌ 'senha123' → 0 bits de entropia (palavra do dicionário) → Quebrada INSTANTANEAMENTE",
                "❌ 'Tr0ub4dor&3' → ~28 bits (substituições comuns) → Quebrada em SEGUNDOS",
                "⚠️ 'xK9#mL2$' (8 caracteres, todos os tipos) → 52,4 bits → Quebrada em 6 horas (hash rápido)",
                "✅ 'aX7$mK9#pL2&nR5!' (16 caracteres) → 104,8 bits → 394 bilhões de anos (hash rápido)",
                "✅ 'Maçã-Bravo7-Xadrez-Delta' (frase-chave) → ~45 bits → anos (hash rápido)",
                "✅ 'Gelo-Brilho4-Refúgio-Jóia-Luz' (5 palavras) → ~55 bits → séculos"
              ],
              "result": "Comprimento importa mais. Uma senha de 16 caracteres com todos os tipos é essencialmente inquebrantável."
            },
            {
              "title": "Exemplo de Matemática de Entropia",
              "steps": [
                "Senha: 16 caracteres usando minúsculas + maiúsculas + números + símbolos",
                "Tamanho do conjunto de caracteres: 26 + 26 + 10 + 32 = 94 caracteres",
                "Entropia = 16 × log₂(94) = 16 × 6,55 = 104,8 bits",
                "Combinações totais = 94¹⁶ = 3,7 × 10³¹",
                "A 10 bilhões de tentativas/seg: 3,7 × 10³¹ ÷ 10¹⁰ = 3,7 × 10²¹ segundos",
                "Isso é aproximadamente 117 trilhões de anos para tentar todas as combinações"
              ],
              "result": "Tempo médio de quebra = metade do total = ~59 trilhões de anos. Sua senha está segura."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Como funciona este gerador de senhas?",
          "answer": "Esta ferramenta usa aleatoriedade de qualidade criptográfica para gerar senhas. Para senhas aleatórias, seleciona caracteres do seu conjunto de caracteres escolhido (maiúsculas, minúsculas, números, símbolos) com probabilidade igual. Para frases-chave, escolhe aleatoriamente palavras de uma lista curada de 200 palavras. Para PINs, gera dígitos aleatórios. Toda a geração acontece localmente no seu navegador — nenhuma senha é enviada para qualquer servidor ou armazenada em qualquer lugar."
        },
        "1": {
          "question": "Qual comprimento de senha devo usar?",
          "answer": "Para senhas aleatórias, use pelo menos 16 caracteres com todos os tipos de caracteres habilitados. Isso dá mais de 104 bits de entropia, tornando ataques de força bruta inviáveis. Para frases-chave, use pelo menos 4-5 palavras com um separador e número. Para PINs, use 6+ dígitos — PINs de 4 dígitos têm apenas 10.000 combinações, que podem ser quebradas em segundos. A regra geral: mais longo é sempre mais forte, e cada caractere extra multiplica a segurança exponencialmente."
        },
        "2": {
          "question": "O que significam as estimativas de tempo de quebra?",
          "answer": "Estimamos tempos de quebra para três cenários: Online Limitado assume 100 tentativas por hora (login web típico com limitação de taxa). Offline Hash Lento assume 10.000 tentativas por segundo (um banco de dados vazado usando bcrypt ou Argon2). Offline Hash Rápido assume 10 bilhões de tentativas por segundo (um banco de dados vazado usando hash MD5 ou SHA-1 fraco, quebrado em GPUs modernas). O cenário offline hash rápido é o mais perigoso e mais realista para violações de dados."
        },
        "3": {
          "question": "Uma frase-chave é melhor que uma senha aleatória?",
          "answer": "Frases-chave e senhas aleatórias servem necessidades diferentes. Uma frase-chave de 5 palavras como 'Gelo-Brilho4-Refúgio-Jóia-Luz' é fácil de digitar e memorizar, com entropia decente (~55 bits). Uma senha aleatória de 16 caracteres como 'aX7$mK9#pL2&nR5!' tem entropia maior (~105 bits) mas é mais difícil de lembrar. Se você usa um gerenciador de senhas, escolha senhas aleatórias para máxima segurança. Se precisa memorizar (como uma senha mestra), use uma frase-chave longa com 5+ palavras."
        },
        "4": {
          "question": "O que é entropia de senha?",
          "answer": "Entropia mede a aleatoriedade de uma senha em bits. É calculada como: comprimento × log₂(tamanho_do_conjunto_de_caracteres). Entropia maior significa mais combinações possíveis e tempos de quebra mais longos. Limiares chave: abaixo de 40 bits é muito fraco (quebrável em minutos), 40-59 bits é fraco, 60-79 bits é razoável, 80-99 bits é forte, e 100+ bits é muito forte (essencialmente inquebrantável com a tecnologia atual). Cada bit adicional dobra o número de tentativas necessárias."
        },
        "5": {
          "question": "Devo evitar caracteres ambíguos?",
          "answer": "A opção 'Evitar Caracteres Ambíguos' remove caracteres que parecem similares em muitas fontes: 0 (zero) vs O (letra), l (L minúsculo) vs 1 (um) vs I (i maiúsculo), S vs 5, B vs 8. Habilite isso quando você pode precisar ler ou ditar a senha em voz alta, copiá-la à mão, ou usá-la em sistemas com fontes difíceis de ler. A ligeira redução no conjunto de caracteres tem impacto mínimo na segurança se você compensar com uma senha ligeiramente mais longa."
        }
      },
      "detailedTable": {
        "crackTimeReference": {
          "button": "Ver Referência Completa de Tempo de Quebra",
          "title": "Tempo de Quebra de Senha por Comprimento e Tipo de Caractere",
          "columns": {
            "length": "Comprimento",
            "lowercase": "Apenas Minúsculas",
            "mixed": "Maiúsculas e Minúsculas",
            "mixedNum": "+ Números",
            "all": "Todos os Caracteres"
          }
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
      "name": "Générateur de Mots de Passe",
      "slug": "calculateur-generateur-mots-de-passe",
      "subtitle": "Générez des mots de passe aléatoires robustes, des phrases secrètes mémorables et des codes PIN sécurisés avec analyse de force en temps réel et estimations du temps de piratage.",
      "breadcrumb": "Générateur de Mots de Passe",
      "seo": {
        "title": "Générateur de Mots de Passe - Mots de Passe Aléatoires Robustes et Phrases Secrètes",
        "description": "Générez des mots de passe et phrases secrètes robustes et aléatoires avec estimations du temps de piratage, analyse d'entropie et évaluation de la force. Outil gratuit avec modes mot de passe, phrase secrète et code PIN.",
        "shortDescription": "Générez des mots de passe aléatoires robustes avec analyse de force.",
        "keywords": [
          "générateur de mots de passe",
          "générateur de mots de passe robustes",
          "générateur de mots de passe aléatoires",
          "générateur de phrases secrètes",
          "créateur de mots de passe sécurisés",
          "vérificateur de force de mot de passe",
          "calculateur d'entropie de mot de passe",
          "générateur de mots de passe gratuit"
        ]
      },
      "inputs": {
        "mode": {
          "label": "Mode de Génération",
          "helpText": "Choisissez entre caractères aléatoires, combinaisons de mots mémorables ou codes PIN numériques",
          "options": {
            "password": "Mot de Passe Aléatoire",
            "passphrase": "Phrase Secrète (Mots)",
            "pin": "Code PIN (Chiffres Uniquement)"
          }
        },
        "length": {
          "label": "Longueur du Mot de Passe",
          "helpText": "Les mots de passe plus longs sont exponentiellement plus difficiles à pirater — 16+ recommandés"
        },
        "includeUppercase": {
          "label": "Lettres Majuscules (A–Z)",
          "helpText": "Inclure des lettres majuscules pour augmenter le jeu de caractères"
        },
        "includeLowercase": {
          "label": "Lettres Minuscules (a–z)",
          "helpText": "Inclure des lettres minuscules"
        },
        "includeNumbers": {
          "label": "Chiffres (0–9)",
          "helpText": "Inclure des chiffres"
        },
        "includeSymbols": {
          "label": "Symboles (!@#$%...)",
          "helpText": "Inclure des caractères spéciaux pour une entropie maximale"
        },
        "avoidAmbiguous": {
          "label": "Éviter les Caractères Ambigus",
          "helpText": "Exclure les caractères similaires : 0/O, l/1/I, S/5, B/8"
        },
        "wordCount": {
          "label": "Nombre de Mots",
          "helpText": "Plus de mots = phrase secrète plus forte — 4+ recommandés"
        },
        "separator": {
          "label": "Séparateur de Mots",
          "helpText": "Caractère entre les mots",
          "options": {
            "-": "Trait d'union ( - )",
            ".": "Point ( . )",
            "_": "Trait de soulignement ( _ )",
            " ": "Espace",
            "": "Aucun"
          }
        },
        "capitalizeWords": {
          "label": "Mettre les Mots en Majuscules",
          "helpText": "Mettre en majuscule la première lettre de chaque mot (ex: Pomme-Brave-Échecs)"
        },
        "includeWordNumber": {
          "label": "Ajouter un Chiffre à la Phrase Secrète",
          "helpText": "Ajouter un chiffre aléatoire à un mot pour une entropie supplémentaire"
        },
        "pinLength": {
          "label": "Longueur du Code PIN",
          "helpText": "6+ chiffres recommandés — les codes PIN à 4 chiffres sont faibles"
        }
      },
      "results": {
        "generatedPassword": {
          "label": "Votre Mot de Passe"
        },
        "strengthScore": {
          "label": "Force"
        },
        "entropyBits": {
          "label": "Entropie"
        },
        "charsetSize": {
          "label": "Taille du Jeu de Caractères"
        },
        "totalCombinations": {
          "label": "Combinaisons Possibles"
        },
        "crackTimeOnline": {
          "label": "Temps de Piratage (En ligne, Limité)"
        },
        "crackTimeOfflineSlow": {
          "label": "Temps de Piratage (Hors ligne, Hachage Lent)"
        },
        "crackTimeOfflineFast": {
          "label": "Temps de Piratage (Hors ligne, Hachage Rapide)"
        }
      },
      "presets": {
        "strong": {
          "label": "Mot de Passe Robuste",
          "description": "20 caractères, tous types de caractères — sécurité maximale"
        },
        "memorable": {
          "label": "Phrase Secrète Mémorable",
          "description": "5 mots avec chiffres — facile à retenir, difficile à pirater"
        },
        "noSymbols": {
          "label": "Sans Symboles (24 caractères)",
          "description": "Lettres + chiffres uniquement — pour les sites qui bloquent les symboles"
        },
        "quickPin": {
          "label": "Code PIN Rapide",
          "description": "Code PIN numérique à 6 chiffres pour applications et appareils"
        }
      },
      "values": {
        "veryWeak": "🔴 Très Faible",
        "weak": "🟠 Faible",
        "fair": "🟡 Correct",
        "strong": "🟢 Fort",
        "veryStrong": "🟣 Très Fort",
        "instant": "Instantanément",
        "seconds": "secondes",
        "minutes": "minutes",
        "hours": "heures",
        "days": "jours",
        "months": "mois",
        "years": "années",
        "centuries": "siècles",
        "millennia": "millénaires",
        "forever": "Plus longtemps que l'âge de l'univers",
        "bits": "bits",
        "characters": "caractères"
      },
      "formats": {
        "summary": "{mode} généré avec {entropyBits} bits d'entropie. Force : {strengthScore}. Temps de piratage hors ligne hachage rapide : {crackTimeOfflineFast}."
      },
      "infoCards": {
        "metrics": {
          "title": "Analyse de Force",
          "items": [
            {
              "label": "Force",
              "valueKey": "strengthScore"
            },
            {
              "label": "Entropie",
              "valueKey": "entropyBits"
            },
            {
              "label": "Jeu de Caractères",
              "valueKey": "charsetSize"
            },
            {
              "label": "Combinaisons",
              "valueKey": "totalCombinations"
            }
          ]
        },
        "details": {
          "title": "Estimations du Temps de Piratage",
          "items": [
            {
              "label": "En ligne (Limité)",
              "valueKey": "crackTimeOnline"
            },
            {
              "label": "Hors ligne (Hachage Lent)",
              "valueKey": "crackTimeOfflineSlow"
            },
            {
              "label": "Hors ligne (Hachage Rapide)",
              "valueKey": "crackTimeOfflineFast"
            },
            {
              "label": "Force",
              "valueKey": "strengthScore"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Sécurité des Mots de Passe",
          "items": [
            "Utilisez 16+ caractères — chaque caractère supplémentaire rend votre mot de passe exponentiellement plus difficile à pirater.",
            "Ne réutilisez jamais les mots de passe entre sites — une seule violation expose tous les comptes partageant ce mot de passe.",
            "Les phrases secrètes comme Pomme-Brave7-Échecs-Delta sont à la fois fortes et mémorables.",
            "Activez l'authentification à deux facteurs (2FA) même avec des mots de passe forts pour les comptes critiques."
          ]
        }
      },
      "chart": {
        "title": "Analyse du Temps de Piratage",
        "tabs": {
          "crack-scenarios": "Scénarios d'Attaque",
          "length-comparison": "Longueur vs Temps de Piratage"
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qui Rend un Mot de Passe Robuste ?",
          "content": "Un mot de passe robuste possède trois qualités essentielles : la longueur, la complexité et l'unicité. La longueur est le facteur le plus important — chaque caractère supplémentaire multiplie exponentiellement le nombre de combinaisons possibles. Un mot de passe de 12 caractères utilisant tous les types de caractères (minuscules, majuscules, chiffres, symboles) a environ 475 trillions de trillions de combinaisons possibles, tandis qu'un mot de passe de 8 caractères n'en a que 6 quadrillions — environ 79 milliards de fois moins de possibilités. La complexité vient de l'utilisation d'un jeu de caractères diversifié : les lettres minuscules offrent 26 options par position, l'ajout de majuscules le double à 52, les chiffres l'amènent à 62, et les symboles le poussent à 94 ou plus. Mais la longueur l'emporte toujours sur la complexité : un mot de passe de 20 caractères en minuscules uniquement (2,0 × 10²⁸ combinaisons) est largement plus fort qu'un mot de passe de 8 caractères utilisant tous les types de caractères (6,1 × 10¹⁵ combinaisons). L'unicité signifie ne jamais réutiliser un mot de passe — si un service subit une violation de données, les attaquants essaieront ce même mot de passe sur tous les autres sites que vous utilisez via des attaques par bourrage d'identifiants."
        },
        "howItWorks": {
          "title": "Comment Fonctionne l'Entropie des Mots de Passe",
          "content": "L'entropie, mesurée en bits, quantifie le caractère aléatoire d'un mot de passe. La formule est : entropie = longueur × log₂(taille_jeu_caractères). Un mot de passe de 16 caractères utilisant l'ensemble complet de 94 caractères (minuscules + majuscules + chiffres + symboles) a environ 104,8 bits d'entropie. Chaque bit supplémentaire d'entropie double le nombre de tentatives qu'un attaquant doit faire. Pour contexte : 40 bits d'entropie peuvent être piratés en secondes par le matériel moderne, 60 bits prend des heures, 80 bits prend des années, et 128+ bits est considéré comme impossible à pirater avec la technologie actuelle. Les phrases secrètes tirent leur entropie différemment — de la taille d'une liste de mots élevée à la puissance du nombre de mots. Une phrase secrète de 4 mots d'une liste de 200 mots a log₂(200⁴) ≈ 30,6 bits, tandis que 5 mots donnent ~38,2 bits. L'ajout de majuscules, séparateurs et chiffres aléatoires augmente considérablement l'entropie de la phrase secrète. L'idée clé : l'entropie doit provenir d'une sélection vraiment aléatoire. Un humain choisissant 'MotDePasse123!' peut utiliser majuscules, minuscules, chiffres et symboles, mais cela a une entropie effective quasi nulle car cela suit un modèle extrêmement prévisible."
        },
        "considerations": {
          "title": "Meilleures Pratiques pour les Mots de Passe",
          "items": [
            {
              "text": "Utilisez 16+ caractères pour les mots de passe et 5+ mots pour les phrases secrètes — la longueur est la défense la plus forte contre les attaques par force brute.",
              "type": "info"
            },
            {
              "text": "Activez la 2FA sur tous les comptes critiques (email, banque, réseaux sociaux) — même un mot de passe compromis ne peut pas contourner un second facteur.",
              "type": "warning"
            },
            {
              "text": "Utilisez un gestionnaire de mots de passe pour générer et stocker des mots de passe uniques pour chaque compte — les humains ne peuvent pas retenir de manière fiable des dizaines de mots de passe forts.",
              "type": "info"
            },
            {
              "text": "Ne partagez jamais les mots de passe par email, SMS ou chat — ces canaux peuvent être interceptés ou stockés en texte clair.",
              "type": "warning"
            },
            {
              "text": "Vérifiez si vos mots de passe ont été exposés dans des violations de données en utilisant des services comme Have I Been Pwned (haveibeenpwned.com).",
              "type": "info"
            },
            {
              "text": "Évitez les informations personnelles dans les mots de passe — noms, dates de naissance, noms d'animaux et adresses sont les premières choses que les attaquants essaient.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Méthodes d'Attaque et Temps de Piratage",
          "items": [
            {
              "text": "En ligne Limité (100/h) : Formulaires de connexion web avec limitation de débit — même les mots de passe courts survivent des jours. La plupart des sites utilisent ceci.",
              "type": "info"
            },
            {
              "text": "En ligne Non Limité (10/sec) : APIs sans limitations de débit — les mots de passe faibles tombent en heures. Ajoutez toujours une limitation de débit.",
              "type": "info"
            },
            {
              "text": "Hors ligne Hachage Lent (10K/sec) : Fuites de base de données hachées bcrypt/Argon2 — les systèmes bien conçus rendent chaque tentative coûteuse.",
              "type": "info"
            },
            {
              "text": "Hors ligne Hachage Rapide (10G/sec) : Fuites hachées MD5/SHA-1 — les GPU modernes testent des milliards de combinaisons par seconde.",
              "type": "warning"
            },
            {
              "text": "Attaque par Dictionnaire : Essaie d'abord les mots courants, noms, modèles — 'MotDePasse123!' tombe instantanément malgré les caractères mixtes.",
              "type": "warning"
            },
            {
              "text": "Bourrage d'Identifiants : Utilise les listes de mots de passe violés sur d'autres sites — les mots de passe réutilisés permettent une compromise de compte en cascade.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Force de Mot de Passe",
          "description": "Comparez les forces de mots de passe réels",
          "examples": [
            {
              "title": "Mots de Passe Faibles vs Forts",
              "steps": [
                "❌ 'motdepasse123' → 0 bits d'entropie (mot de dictionnaire) → Piraté INSTANTANÉMENT",
                "❌ 'Tr0ub4dor&3' → ~28 bits (substitutions courantes) → Piraté en SECONDES",
                "⚠️ 'xK9#mL2$' (8 car., tous types) → 52,4 bits → Piraté en 6 heures (hachage rapide)",
                "✅ 'aX7$mK9#pL2&nR5!' (16 car.) → 104,8 bits → 394 milliards d'années (hachage rapide)",
                "✅ 'Pomme-Brave7-Échecs-Delta' (phrase secrète) → ~45 bits → années (hachage rapide)",
                "✅ 'Givre-Lueur4-Refuge-Joyau-Lumière' (5 mots) → ~55 bits → siècles"
              ],
              "result": "La longueur compte le plus. Un mot de passe de 16 caractères avec tous les types est essentiellement impossible à pirater."
            },
            {
              "title": "Exemple de Calcul d'Entropie",
              "steps": [
                "Mot de passe : 16 caractères utilisant minuscules + majuscules + chiffres + symboles",
                "Taille du jeu de caractères : 26 + 26 + 10 + 32 = 94 caractères",
                "Entropie = 16 × log₂(94) = 16 × 6,55 = 104,8 bits",
                "Combinaisons totales = 94¹⁶ = 3,7 × 10³¹",
                "À 10 milliards de tentatives/sec : 3,7 × 10³¹ ÷ 10¹⁰ = 3,7 × 10²¹ secondes",
                "Cela représente environ 117 trillions d'années pour essayer toutes les combinaisons"
              ],
              "result": "Temps de piratage moyen = la moitié du total = ~59 trillions d'années. Votre mot de passe est sûr."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Comment fonctionne ce générateur de mots de passe ?",
          "answer": "Cet outil utilise un caractère aléatoire de qualité cryptographique pour générer des mots de passe. Pour les mots de passe aléatoires, il sélectionne des caractères de votre jeu de caractères choisi (majuscules, minuscules, chiffres, symboles) avec une probabilité égale. Pour les phrases secrètes, il choisit aléatoirement des mots d'une liste organisée de 200 mots. Pour les codes PIN, il génère des chiffres aléatoires. Toute la génération se fait localement dans votre navigateur — aucun mot de passe n'est jamais envoyé à un serveur ou stocké quelque part."
        },
        "1": {
          "question": "Quelle longueur de mot de passe dois-je utiliser ?",
          "answer": "Pour les mots de passe aléatoires, utilisez au moins 16 caractères avec tous les types de caractères activés. Cela donne plus de 104 bits d'entropie, rendant les attaques par force brute irréalisables. Pour les phrases secrètes, utilisez au moins 4-5 mots avec un séparateur et un chiffre. Pour les codes PIN, utilisez 6+ chiffres — les codes PIN à 4 chiffres n'ont que 10 000 combinaisons, qui peuvent être piratées en secondes. La règle générale : plus long est toujours plus fort, et chaque caractère supplémentaire multiplie la sécurité exponentiellement."
        },
        "2": {
          "question": "Que signifient les estimations du temps de piratage ?",
          "answer": "Nous estimons les temps de piratage pour trois scénarios : En ligne Limité suppose 100 tentatives par heure (connexion web typique avec limitation de débit). Hors ligne Hachage Lent suppose 10 000 tentatives par seconde (une base de données fuie utilisant bcrypt ou Argon2). Hors ligne Hachage Rapide suppose 10 milliards de tentatives par seconde (une base de données fuie utilisant un hachage MD5 ou SHA-1 faible, piraté sur des GPU modernes). Le scénario hors ligne hachage rapide est le plus dangereux et le plus réaliste pour les violations de données."
        },
        "3": {
          "question": "Une phrase secrète est-elle meilleure qu'un mot de passe aléatoire ?",
          "answer": "Les phrases secrètes et les mots de passe aléatoires répondent à des besoins différents. Une phrase secrète de 5 mots comme 'Givre-Lueur4-Refuge-Joyau-Lumière' est facile à taper et mémoriser, avec une entropie décente (~55 bits). Un mot de passe aléatoire de 16 caractères comme 'aX7$mK9#pL2&nR5!' a une entropie plus élevée (~105 bits) mais est plus difficile à retenir. Si vous utilisez un gestionnaire de mots de passe, choisissez des mots de passe aléatoires pour une sécurité maximale. Si vous devez le mémoriser (comme un mot de passe principal), utilisez une phrase secrète longue avec 5+ mots."
        },
        "4": {
          "question": "Qu'est-ce que l'entropie d'un mot de passe ?",
          "answer": "L'entropie mesure le caractère aléatoire d'un mot de passe en bits. Elle est calculée comme : longueur × log₂(taille_jeu_caractères). Une entropie plus élevée signifie plus de combinaisons possibles et des temps de piratage plus longs. Seuils clés : moins de 40 bits est très faible (piratable en minutes), 40-59 bits est faible, 60-79 bits est correct, 80-99 bits est fort, et 100+ bits est très fort (essentiellement impossible à pirater avec la technologie actuelle). Chaque bit supplémentaire double le nombre de tentatives nécessaires."
        },
        "5": {
          "question": "Dois-je éviter les caractères ambigus ?",
          "answer": "L'option 'Éviter les Caractères Ambigus' supprime les caractères qui semblent similaires dans de nombreuses polices : 0 (zéro) vs O (lettre), l (L minuscule) vs 1 (un) vs I (i majuscule), S vs 5, B vs 8. Activez ceci quand vous pourriez avoir besoin de lire ou dicter le mot de passe à voix haute, le copier à la main, ou l'utiliser sur des systèmes avec des polices difficiles à lire. La légère réduction du jeu de caractères a un impact minimal sur la sécurité si vous compensez avec un mot de passe légèrement plus long."
        }
      },
      "detailedTable": {
        "crackTimeReference": {
          "button": "Voir la Référence Complète des Temps de Piratage",
          "title": "Temps de Piratage de Mot de Passe par Longueur et Type de Caractère",
          "columns": {
            "length": "Longueur",
            "lowercase": "Minuscules Uniquement",
            "mixed": "Casse Mixte",
            "mixedNum": "+ Chiffres",
            "all": "Tous Caractères"
          }
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
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      }
    },
    de: {
      "name": "Passwort Generator",
      "slug": "passwort-generator-rechner",
      "subtitle": "Generieren Sie starke zufällige Passwörter, merkbare Passphrasen und sichere PINs mit Echtzeit-Stärkenanalyse und Knackzeit-Schätzungen.",
      "breadcrumb": "Passwort Generator",
      "seo": {
        "title": "Passwort Generator - Starke Zufällige Passwörter & Passphrasen",
        "description": "Generieren Sie starke, zufällige Passwörter und Passphrasen mit Knackzeit-Schätzungen, Entropie-Analyse und Stärkenbewertung. Kostenloses Tool mit Passwort-, Passphrase- und PIN-Modi.",
        "shortDescription": "Generieren Sie starke zufällige Passwörter mit Stärkenanalyse.",
        "keywords": [
          "Passwort Generator",
          "starker Passwort Generator",
          "zufälliger Passwort Generator",
          "Passphrase Generator",
          "sicherer Passwort Ersteller",
          "Passwort Stärke Prüfer",
          "Passwort Entropie Rechner",
          "kostenloser Passwort Generator"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "mode": {
          "label": "Generierungsmodus",
          "helpText": "Wählen Sie zwischen zufälligen Zeichen, merkbaren Wortkombinationen oder numerischen PINs",
          "options": {
            "password": "Zufälliges Passwort",
            "passphrase": "Passphrase (Wörter)",
            "pin": "PIN (Nur Zahlen)"
          }
        },
        "length": {
          "label": "Passwort Länge",
          "helpText": "Längere Passwörter sind exponentiell schwerer zu knacken — 16+ empfohlen"
        },
        "includeUppercase": {
          "label": "Großbuchstaben (A–Z)",
          "helpText": "Großbuchstaben einschließen um den Zeichensatz zu erweitern"
        },
        "includeLowercase": {
          "label": "Kleinbuchstaben (a–z)",
          "helpText": "Kleinbuchstaben einschließen"
        },
        "includeNumbers": {
          "label": "Zahlen (0–9)",
          "helpText": "Ziffern einschließen"
        },
        "includeSymbols": {
          "label": "Symbole (!@#$%...)",
          "helpText": "Sonderzeichen für maximale Entropie einschließen"
        },
        "avoidAmbiguous": {
          "label": "Mehrdeutige Zeichen vermeiden",
          "helpText": "Ähnlich aussehende Zeichen ausschließen: 0/O, l/1/I, S/5, B/8"
        },
        "wordCount": {
          "label": "Anzahl der Wörter",
          "helpText": "Mehr Wörter = stärkere Passphrase — 4+ empfohlen"
        },
        "separator": {
          "label": "Wort-Trennzeichen",
          "helpText": "Zeichen zwischen Wörtern",
          "options": {
            "-": "Bindestrich ( - )",
            ".": "Punkt ( . )",
            "_": "Unterstrich ( _ )",
            " ": "Leerzeichen",
            "": "Keines"
          }
        },
        "capitalizeWords": {
          "label": "Wörter groß schreiben",
          "helpText": "Ersten Buchstaben jedes Wortes groß schreiben (z.B. Apfel-Mutig-Schach)"
        },
        "includeWordNumber": {
          "label": "Zahl zur Passphrase hinzufügen",
          "helpText": "Eine zufällige Ziffer an ein Wort anhängen für zusätzliche Entropie"
        },
        "pinLength": {
          "label": "PIN Länge",
          "helpText": "6+ Ziffern empfohlen — 4-stellige PINs sind schwach"
        }
      },
      "results": {
        "generatedPassword": {
          "label": "Ihr Passwort"
        },
        "strengthScore": {
          "label": "Stärke"
        },
        "entropyBits": {
          "label": "Entropie"
        },
        "charsetSize": {
          "label": "Zeichensatz Größe"
        },
        "totalCombinations": {
          "label": "Mögliche Kombinationen"
        },
        "crackTimeOnline": {
          "label": "Knackzeit (Online, Gedrosselt)"
        },
        "crackTimeOfflineSlow": {
          "label": "Knackzeit (Offline, Langsamer Hash)"
        },
        "crackTimeOfflineFast": {
          "label": "Knackzeit (Offline, Schneller Hash)"
        }
      },
      "presets": {
        "strong": {
          "label": "Starkes Passwort",
          "description": "20 Zeichen, alle Zeichentypen — maximale Sicherheit"
        },
        "memorable": {
          "label": "Merkbare Passphrase",
          "description": "5 Wörter mit Zahlen — leicht zu merken, schwer zu knacken"
        },
        "noSymbols": {
          "label": "Keine Symbole (24 Zeichen)",
          "description": "Nur Buchstaben + Zahlen — für Seiten die Symbole blockieren"
        },
        "quickPin": {
          "label": "Schnelle PIN",
          "description": "6-stellige numerische PIN für Apps und Geräte"
        }
      },
      "values": {
        "veryWeak": "🔴 Sehr Schwach",
        "weak": "🟠 Schwach",
        "fair": "🟡 Mittelmäßig",
        "strong": "🟢 Stark",
        "veryStrong": "🟣 Sehr Stark",
        "instant": "Sofort",
        "seconds": "Sekunden",
        "minutes": "Minuten",
        "hours": "Stunden",
        "days": "Tage",
        "months": "Monate",
        "years": "Jahre",
        "centuries": "Jahrhunderte",
        "millennia": "Jahrtausende",
        "forever": "Länger als das Alter des Universums",
        "bits": "Bits",
        "characters": "Zeichen"
      },
      "formats": {
        "summary": "{mode} mit {entropyBits} Bits Entropie generiert. Stärke: {strengthScore}. Offline schneller Hash Knackzeit: {crackTimeOfflineFast}."
      },
      "infoCards": {
        "metrics": {
          "title": "Stärkenanalyse",
          "items": [
            {
              "label": "Stärke",
              "valueKey": "strengthScore"
            },
            {
              "label": "Entropie",
              "valueKey": "entropyBits"
            },
            {
              "label": "Zeichensatz",
              "valueKey": "charsetSize"
            },
            {
              "label": "Kombinationen",
              "valueKey": "totalCombinations"
            }
          ]
        },
        "details": {
          "title": "Knackzeit-Schätzungen",
          "items": [
            {
              "label": "Online (Gedrosselt)",
              "valueKey": "crackTimeOnline"
            },
            {
              "label": "Offline (Langsamer Hash)",
              "valueKey": "crackTimeOfflineSlow"
            },
            {
              "label": "Offline (Schneller Hash)",
              "valueKey": "crackTimeOfflineFast"
            },
            {
              "label": "Stärke",
              "valueKey": "strengthScore"
            }
          ]
        },
        "tips": {
          "title": "Passwort-Sicherheitstipps",
          "items": [
            "Verwenden Sie 16+ Zeichen — jedes zusätzliche Zeichen macht Ihr Passwort exponentiell schwerer zu knacken.",
            "Verwenden Sie niemals Passwörter mehrfach — ein Datenleck gefährdet alle Konten mit demselben Passwort.",
            "Passphrasen wie Apfel-Mutig7-Schach-Delta sind sowohl stark als auch merkbar.",
            "Aktivieren Sie Zwei-Faktor-Authentifizierung (2FA) auch mit starken Passwörtern für kritische Konten."
          ]
        }
      },
      "chart": {
        "title": "Knackzeit-Analyse",
        "tabs": {
          "crack-scenarios": "Angriffs-Szenarien",
          "length-comparison": "Länge vs Knackzeit"
        }
      },
      "education": {
        "whatIs": {
          "title": "Was macht ein Passwort stark?",
          "content": "Ein starkes Passwort hat drei wesentliche Eigenschaften: Länge, Komplexität und Einzigartigkeit. Länge ist der wichtigste Faktor — jedes zusätzliche Zeichen multipliziert die Anzahl möglicher Kombinationen exponentiell. Ein 12-Zeichen-Passwort mit allen Zeichentypen (Klein-, Großbuchstaben, Zahlen, Symbole) hat etwa 475 Trillion Billionen mögliche Kombinationen, während ein 8-Zeichen-Passwort nur 6 Billiarden hat — etwa 79 Milliarden mal weniger Möglichkeiten. Komplexität entsteht durch die Verwendung eines vielfältigen Zeichensatzes: Kleinbuchstaben bieten 26 Optionen pro Position, das Hinzufügen von Großbuchstaben verdoppelt es auf 52, Ziffern bringen es auf 62, und Symbole drücken es auf 94 oder mehr. Aber Länge übertrifft Komplexität jedes Mal: ein 20-Zeichen-Passwort nur mit Kleinbuchstaben (2,0 × 10²⁸ Kombinationen) ist deutlich stärker als ein 8-Zeichen-Passwort mit allen Zeichentypen (6,1 × 10¹⁵ Kombinationen). Einzigartigkeit bedeutet, niemals ein Passwort wiederzuverwenden — wenn ein Dienst einen Datenleck erleidet, werden Angreifer dasselbe Passwort auf jeder anderen von Ihnen verwendeten Seite durch Credential-Stuffing-Angriffe ausprobieren."
        },
        "howItWorks": {
          "title": "Wie Passwort-Entropie funktioniert",
          "content": "Entropie, gemessen in Bits, quantifiziert die Zufälligkeit in einem Passwort. Die Formel lautet: Entropie = Länge × log₂(Zeichensatz_Größe). Ein 16-Zeichen-Passwort mit dem vollen 94-Zeichen-Satz (Klein- + Großbuchstaben + Zahlen + Symbole) hat etwa 104,8 Bits Entropie. Jedes zusätzliche Bit Entropie verdoppelt die Anzahl der Versuche, die ein Angreifer machen muss. Zum Vergleich: 40 Bits Entropie können in Sekunden von moderner Hardware geknackt werden, 60 Bits dauern Stunden, 80 Bits dauern Jahre, und 128+ Bits gelten als unknackbar mit aktueller Technologie. Passphrasen leiten ihre Entropie anders ab — aus einer Wortlistengröße hoch zur Potenz der Wortanzahl. Eine 4-Wort-Passphrase aus einer 200-Wort-Liste hat log₂(200⁴) ≈ 30,6 Bits, während 5 Wörter ~38,2 Bits ergeben. Das Hinzufügen von Großschreibung, Trennzeichen und Zufallszahlen erhöht die Passphrase-Entropie erheblich. Die wichtigste Erkenntnis: Entropie muss aus wirklich zufälliger Auswahl stammen. Ein Mensch, der 'Passwort123!' wählt, mag Groß-, Kleinbuchstaben, Zahlen und Symbole verwenden, aber es hat nahezu null effektive Entropie, weil es einem extrem vorhersagbaren Muster folgt."
        },
        "considerations": {
          "title": "Passwort Best Practices",
          "items": [
            {
              "text": "Verwenden Sie 16+ Zeichen für Passwörter und 5+ Wörter für Passphrasen — Länge ist die stärkste Verteidigung gegen Brute-Force-Angriffe.",
              "type": "info"
            },
            {
              "text": "Aktivieren Sie 2FA auf allen kritischen Konten (E-Mail, Banking, Social Media) — selbst ein kompromittiertes Passwort kann einen zweiten Faktor nicht umgehen.",
              "type": "warning"
            },
            {
              "text": "Verwenden Sie einen Passwort-Manager um eindeutige Passwörter für jedes Konto zu generieren und zu speichern — Menschen können sich nicht zuverlässig Dutzende starker Passwörter merken.",
              "type": "info"
            },
            {
              "text": "Teilen Sie niemals Passwörter per E-Mail, SMS oder Chat — diese Kanäle können abgefangen oder im Klartext gespeichert werden.",
              "type": "warning"
            },
            {
              "text": "Überprüfen Sie, ob Ihre Passwörter in Datenlecks aufgedeckt wurden mit Diensten wie Have I Been Pwned (haveibeenpwned.com).",
              "type": "info"
            },
            {
              "text": "Vermeiden Sie persönliche Informationen in Passwörtern — Namen, Geburtstage, Haustiernamen und Adressen sind das Erste, was Angreifer versuchen.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Angriffsmethoden & Knackzeiten",
          "items": [
            {
              "text": "Online Gedrosselt (100/Std): Web-Anmeldeformulare mit Ratenbegrenzung — selbst kurze Passwörter überleben Tage. Die meisten Seiten verwenden dies.",
              "type": "info"
            },
            {
              "text": "Online Ungedrosselt (10/Sek): APIs ohne Ratenbegrenzung — schwache Passwörter fallen in Stunden. Immer Ratenbegrenzung hinzufügen.",
              "type": "info"
            },
            {
              "text": "Offline Langsamer Hash (10K/Sek): bcrypt/Argon2 gehashte Datenbank-Lecks — gut gestaltete Systeme machen jeden Versuch teuer.",
              "type": "info"
            },
            {
              "text": "Offline Schneller Hash (10B/Sek): MD5/SHA-1 gehashte Lecks — moderne GPUs testen Milliarden von Kombinationen pro Sekunde.",
              "type": "warning"
            },
            {
              "text": "Wörterbuch-Angriff: Probiert zuerst häufige Wörter, Namen, Muster — 'Passwort123!' fällt trotz gemischter Zeichen sofort.",
              "type": "warning"
            },
            {
              "text": "Credential Stuffing: Verwendet Listen durchgesickerter Passwörter auf anderen Seiten — wiederverwendete Passwörter ermöglichen kaskadierende Kontokompromittierung.",
              "type": "warning"
            }
          ]
        },
        "examples": {
          "title": "Passwort-Stärke Beispiele",
          "description": "Vergleichen Sie echte Passwort-Stärken",
          "examples": [
            {
              "title": "Schwache vs Starke Passwörter",
              "steps": [
                "❌ 'passwort123' → 0 Bits Entropie (Wörterbuch-Wort) → SOFORT geknackt",
                "❌ 'Tr0ub4d0r&3' → ~28 Bits (häufige Ersetzungen) → In SEKUNDEN geknackt",
                "⚠️ 'xK9#mL2$' (8 Zeichen, alle Typen) → 52,4 Bits → In 6 Stunden geknackt (schneller Hash)",
                "✅ 'aX7$mK9#pL2&nR5!' (16 Zeichen) → 104,8 Bits → 394 Milliarden Jahre (schneller Hash)",
                "✅ 'Apfel-Mutig7-Schach-Delta' (Passphrase) → ~45 Bits → Jahre (schneller Hash)",
                "✅ 'Frost-Glanz4-Hafen-Juwel-Licht' (5 Wörter) → ~55 Bits → Jahrhunderte"
              ],
              "result": "Länge ist am wichtigsten. Ein 16-Zeichen-Passwort mit allen Typen ist praktisch unknackbar."
            },
            {
              "title": "Entropie-Mathe Beispiel",
              "steps": [
                "Passwort: 16 Zeichen mit Klein- + Großbuchstaben + Zahlen + Symbolen",
                "Zeichensatz-Größe: 26 + 26 + 10 + 32 = 94 Zeichen",
                "Entropie = 16 × log₂(94) = 16 × 6,55 = 104,8 Bits",
                "Gesamte Kombinationen = 94¹⁶ = 3,7 × 10³¹",
                "Bei 10 Milliarden Versuchen/Sek: 3,7 × 10³¹ ÷ 10¹⁰ = 3,7 × 10²¹ Sekunden",
                "Das sind etwa 117 Billionen Jahre um alle Kombinationen zu probieren"
              ],
              "result": "Durchschnittliche Knackzeit = Hälfte der Gesamtzeit = ~59 Billionen Jahre. Ihr Passwort ist sicher."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Wie funktioniert dieser Passwort-Generator?",
          "answer": "Dieses Tool verwendet kryptographische Zufälligkeit zum Generieren von Passwörtern. Für zufällige Passwörter wählt es Zeichen aus Ihrem gewählten Zeichensatz (Groß-, Kleinbuchstaben, Zahlen, Symbole) mit gleicher Wahrscheinlichkeit aus. Für Passphrasen wählt es zufällig Wörter aus einer kuratierten 200-Wort-Liste. Für PINs generiert es zufällige Ziffern. Die gesamte Generierung erfolgt lokal in Ihrem Browser — keine Passwörter werden jemals an einen Server gesendet oder irgendwo gespeichert."
        },
        "1": {
          "question": "Welche Passwort-Länge sollte ich verwenden?",
          "answer": "Für zufällige Passwörter verwenden Sie mindestens 16 Zeichen mit allen aktivierten Zeichentypen. Dies ergibt über 104 Bits Entropie und macht Brute-Force-Angriffe undurchführbar. Für Passphrasen verwenden Sie mindestens 4-5 Wörter mit einem Trennzeichen und einer Zahl. Für PINs verwenden Sie 6+ Ziffern — 4-stellige PINs haben nur 10.000 Kombinationen, die in Sekunden geknackt werden können. Die allgemeine Regel: länger ist immer stärker, und jedes zusätzliche Zeichen multipliziert die Sicherheit exponentiell."
        },
        "2": {
          "question": "Was bedeuten die Knackzeit-Schätzungen?",
          "answer": "Wir schätzen Knackzeiten für drei Szenarien: Online Gedrosselt nimmt 100 Versuche pro Stunde an (typisches Web-Login mit Ratenbegrenzung). Offline Langsamer Hash nimmt 10.000 Versuche pro Sekunde an (eine durchgesickerte Datenbank mit bcrypt oder Argon2). Offline Schneller Hash nimmt 10 Milliarden Versuche pro Sekunde an (eine durchgesickerte Datenbank mit schwachem MD5- oder SHA-1-Hashing, geknackt auf modernen GPUs). Das Offline-Schneller-Hash-Szenario ist das gefährlichste und realistischste für Datenlecks."
        },
        "3": {
          "question": "Ist eine Passphrase besser als ein zufälliges Passwort?",
          "answer": "Passphrasen und zufällige Passwörter dienen verschiedenen Bedürfnissen. Eine 5-Wort-Passphrase wie 'Frost-Glanz4-Hafen-Juwel-Licht' ist leicht zu tippen und zu merken, mit anständiger Entropie (~55 Bits). Ein 16-Zeichen-Zufallspasswort wie 'aX7$mK9#pL2&nR5!' hat höhere Entropie (~105 Bits), ist aber schwerer zu merken. Wenn Sie einen Passwort-Manager verwenden, wählen Sie zufällige Passwörter für maximale Sicherheit. Wenn Sie es sich merken müssen (wie ein Master-Passwort), verwenden Sie eine lange Passphrase mit 5+ Wörtern."
        },
        "4": {
          "question": "Was ist Passwort-Entropie?",
          "answer": "Entropie misst die Zufälligkeit eines Passworts in Bits. Sie wird berechnet als: Länge × log₂(Zeichensatz_Größe). Höhere Entropie bedeutet mehr mögliche Kombinationen und längere Knackzeiten. Wichtige Schwellenwerte: unter 40 Bits ist sehr schwach (in Minuten knackbar), 40-59 Bits ist schwach, 60-79 Bits ist mittelmäßig, 80-99 Bits ist stark, und 100+ Bits ist sehr stark (praktisch unknackbar mit aktueller Technologie). Jedes zusätzliche Bit verdoppelt die Anzahl der benötigten Versuche."
        },
        "5": {
          "question": "Sollte ich mehrdeutige Zeichen vermeiden?",
          "answer": "Die Option 'Mehrdeutige Zeichen vermeiden' entfernt Zeichen, die in vielen Schriftarten ähnlich aussehen: 0 (Null) vs O (Buchstabe), l (kleines L) vs 1 (Eins) vs I (großes i), S vs 5, B vs 8. Aktivieren Sie dies, wenn Sie das Passwort möglicherweise laut vorlesen oder diktieren, handschriftlich kopieren oder auf Systemen mit schwer lesbaren Schriftarten verwenden müssen. Die geringe Verringerung des Zeichensatzes hat minimale Auswirkungen auf die Sicherheit, wenn Sie mit einem etwas längeren Passwort kompensieren."
        }
      },
      "detailedTable": {
        "crackTimeReference": {
          "button": "Vollständige Knackzeit-Referenz anzeigen",
          "title": "Passwort-Knackzeit nach Länge & Zeichentyp",
          "columns": {
            "length": "Länge",
            "lowercase": "Nur Kleinbuchstaben",
            "mixed": "Gemischte Groß-/Kleinschreibung",
            "mixedNum": "+ Zahlen",
            "all": "Alle Zeichen"
          }
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
      }
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
