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
    es: {
      "name": "Calculadora de Fuerza de Contraseña",
      "slug": "calculadora-fuerza-contrasena",
      "subtitle": "Analiza la entropía de contraseñas, detecta patrones débiles y estima tiempos de descifrado en 7 escenarios de ataque, incluyendo computación cuántica. 100% privado, nada sale de tu navegador.",
      "breadcrumb": "Fuerza de Contraseña",
      "seo": {
        "title": "Calculadora de Fuerza de Contraseña - Entropía, Tiempo de Descifrado y Análisis de Patrones",
        "description": "Verifica qué tan fuerte es realmente tu contraseña. Detecta patrones comunes, secuencias de teclado, leet speak y caracteres repetidos. Estima tiempo de descifrado para 7 escenarios incluyendo computación cuántica. Gratis, del lado del cliente, multiidioma.",
        "shortDescription": "Analiza la fuerza de contraseñas con entropía, detección de patrones y estimaciones de tiempo de descifrado.",
        "keywords": [
          "calculadora fuerza contraseña",
          "calculadora entropía contraseña",
          "qué tan fuerte es mi contraseña",
          "tiempo descifrado contraseña",
          "verificador seguridad contraseña",
          "calculadora tiempo fuerza bruta",
          "detector patrones contraseña",
          "tiempo descifrado cuántico contraseña"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "password": {
          "label": "Ingresa Contraseña",
          "helpText": "Analizada 100% localmente — tu contraseña nunca sale de tu navegador"
        },
        "attackScenario": {
          "label": "Escenario de Ataque Principal",
          "helpText": "Establece el poder computacional del atacante principal para el resultado del tiempo de descifrado primario",
          "options": {
            "online_throttled": "En Línea — Limitado (100/seg)",
            "online_unthrottled": "En Línea — Sin Límites (1K/seg)",
            "offline_slow": "Fuera de Línea — Hash Lento (10K/seg)",
            "offline_fast": "Fuera de Línea — Hash Rápido (10B/seg)",
            "gpu_cluster": "Clúster GPU (100B/seg)",
            "state_level": "Nivel Estatal (10T/seg)",
            "quantum": "Computadora Cuántica (teórico)"
          }
        }
      },
      "results": {
        "strength": {
          "label": "Fuerza"
        },
        "entropyBits": {
          "label": "Entropía"
        },
        "effectiveEntropy": {
          "label": "Entropía Efectiva"
        },
        "crackTime": {
          "label": "Tiempo de Descifrado"
        },
        "charsetSize": {
          "label": "Tamaño del Conjunto de Caracteres"
        },
        "searchSpace": {
          "label": "Espacio de Búsqueda"
        },
        "score": {
          "label": "Puntuación"
        },
        "passwordLength": {
          "label": "Longitud"
        },
        "patternsFound": {
          "label": "Patrones Encontrados"
        },
        "penaltyApplied": {
          "label": "Penalización de Entropía"
        }
      },
      "presets": {
        "weak": {
          "label": "Ejemplo Débil",
          "description": "Patrón de contraseña común"
        },
        "medium": {
          "label": "Mezcla Media",
          "description": "Mayúsculas y minúsculas con símbolos y año"
        },
        "strong": {
          "label": "Aleatoria Fuerte",
          "description": "Mezcla aleatoria de 19 caracteres"
        },
        "passphrase": {
          "label": "Frase de Paso",
          "description": "Frase de paso estilo XKCD de 4 palabras"
        }
      },
      "values": {
        "bits": "bits",
        "characters": "caracteres",
        "combinations": "combinaciones",
        "instant": "Instantáneo",
        "seconds": "segundos",
        "minutes": "minutos",
        "hours": "horas",
        "days": "días",
        "weeks": "semanas",
        "months": "meses",
        "years": "años",
        "centuries": "siglos",
        "millennia": "milenios",
        "veryWeak": "Muy Débil",
        "weak": "Débil",
        "fair": "Regular",
        "strong": "Fuerte",
        "veryStrong": "Muy Fuerte",
        "lowercase": "Minúsculas (a-z)",
        "uppercase": "Mayúsculas (A-Z)",
        "digits": "Dígitos (0-9)",
        "symbols": "Símbolos (!@#$...)",
        "spaces": "Espacios",
        "unicode": "Unicode/Extendido",
        "yes": "Sí",
        "no": "No",
        "none": "Ninguno detectado"
      },
      "formats": {
        "summary": "Tu contraseña tiene {entropy} bits de entropía ({effectiveEntropy} efectiva) — calificada como {strength}. Tiempo estimado de descifrado ({scenario}): {crackTime}."
      },
      "infoCards": {
        "metrics": {
          "title": "Resumen de Seguridad",
          "items": [
            {
              "label": "Calificación de Fuerza",
              "valueKey": "strength"
            },
            {
              "label": "Entropía Bruta",
              "valueKey": "entropyBits"
            },
            {
              "label": "Entropía Efectiva",
              "valueKey": "effectiveEntropy"
            },
            {
              "label": "Tiempo de Descifrado",
              "valueKey": "crackTime"
            }
          ]
        },
        "details": {
          "title": "Análisis de Caracteres y Patrones",
          "items": [
            {
              "label": "Longitud de Contraseña",
              "valueKey": "passwordLength"
            },
            {
              "label": "Tiene Minúsculas",
              "valueKey": "hasLowercase"
            },
            {
              "label": "Tiene Mayúsculas",
              "valueKey": "hasUppercase"
            },
            {
              "label": "Tiene Dígitos",
              "valueKey": "hasDigits"
            },
            {
              "label": "Tiene Símbolos",
              "valueKey": "hasSymbols"
            },
            {
              "label": "Patrones Detectados",
              "valueKey": "patternsFound"
            },
            {
              "label": "Penalización de Entropía",
              "valueKey": "penaltyApplied"
            },
            {
              "label": "Consejos de Mejora",
              "valueKey": "suggestions"
            }
          ]
        },
        "tips": {
          "title": "Mejores Prácticas de Seguridad de Contraseñas",
          "items": [
            "Usa 16+ caracteres — cada carácter extra aumenta exponencialmente la seguridad. La longitud supera la complejidad.",
            "Evita patrones predecibles: secuencias de teclado (qwerty), series (12345), caracteres repetidos (aaa) y leet speak (P@$$w0rd).",
            "Las frases de paso de 5+ palabras aleatorias son fáciles de recordar y proporcionan 60+ bits de entropía.",
            "Usa un gestor de contraseñas para generar contraseñas verdaderamente aleatorias y únicas para cada cuenta."
          ]
        }
      },
      "chart": {
        "title": "Tiempo de Descifrado por Escenario de Ataque",
        "xLabel": "Escenario",
        "yLabel": "Log₁₀ Segundos",
        "series": {
          "logTime": "Tiempo (log₁₀ seg)"
        }
      },
      "detailedTable": {
        "crackScenarios": {
          "button": "Ver Todos los Escenarios de Ataque",
          "title": "Comparación de Tiempo de Descifrado — Los 7 Escenarios",
          "columns": {
            "scenario": "Escenario de Ataque",
            "speed": "Intentos/seg",
            "time": "Tiempo para Descifrar",
            "example": "Ejemplo de Atacante"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es la Entropía de Contraseña?",
          "content": "La entropía de contraseña mide la impredecibilidad de una contraseña en bits. Representa el número de decisiones binarias sí/no que un atacante debe tomar para adivinar tu contraseña mediante fuerza bruta. Una contraseña con 40 bits de entropía tiene 2⁴⁰ (aproximadamente 1.1 billones) de combinaciones posibles. Cada bit adicional duplica el espacio de búsqueda, haciendo la contraseña exponencialmente más difícil de descifrar. La fórmula es: Entropía = Longitud × log₂(Tamaño del Conjunto de Caracteres). Por ejemplo, una contraseña de 8 caracteres usando solo letras minúsculas (conjunto = 26) tiene 8 × 4.7 = 37.6 bits de entropía. Sin embargo, la entropía bruta asume que cada carácter es perfectamente aleatorio — las contraseñas del mundo real a menudo contienen patrones que reducen su fuerza efectiva. Esta calculadora detecta esos patrones y aplica penalizaciones para darte una evaluación de seguridad más realista."
        },
        "howItWorks": {
          "title": "Cómo Funciona Esta Calculadora",
          "content": "Esta calculadora va más allá de las matemáticas simples de entropía aplicando un análisis multicapa. Primero, calcula la entropía bruta del tamaño del conjunto de caracteres y la longitud de la contraseña. Luego escanea en busca de patrones de debilidad: contraseñas comunes (las 200 principales de bases de datos de filtraciones), secuencias de teclado (qwerty, asdf), caracteres secuenciales (abc, 123), caracteres repetidos (aaa), sustituciones leet speak (@ por a, 0 por o) y patrones de año al final (2024, 2025). Cada patrón detectado aplica una penalización de entropía, produciendo una puntuación de 'entropía efectiva' que refleja mejor la capacidad de descifrado del mundo real. Los tiempos de descifrado se estiman para 7 escenarios: desde ataques en línea con límite de velocidad (100 intentos/seg) hasta computadoras cuánticas teóricas usando el algoritmo de Grover (que reduce a la mitad la longitud efectiva de bits). Todo el análisis se ejecuta completamente en tu navegador — tu contraseña nunca se transmite a ningún lugar."
        },
        "considerations": {
          "title": "Consideraciones Críticas de Seguridad",
          "items": [
            {
              "text": "La longitud supera la complejidad: una contraseña de 20 caracteres en minúsculas (94 bits) es más fuerte que una contraseña mixta de 8 caracteres (52 bits). Siempre prioriza la longitud.",
              "type": "info"
            },
            {
              "text": "Las contraseñas comunes como 'Password123!' tienen casi cero entropía real a pesar de usar todos los tipos de caracteres. Los atacantes verifican primero las listas de diccionarios y filtraciones.",
              "type": "warning"
            },
            {
              "text": "Los patrones de teclado (qwerty, zxcv), secuencias (abcd, 1234) y leet speak (P@$$w0rd) son lo primero que prueban las herramientas de descifrado después de los diccionarios.",
              "type": "warning"
            },
            {
              "text": "Las frases de paso de 5+ palabras aleatorias proporcionan 60+ bits de entropía y son mucho más fáciles de recordar que cadenas de caracteres aleatorios.",
              "type": "info"
            },
            {
              "text": "Los gestores de contraseñas generan contraseñas verdaderamente aleatorias — la única manera de garantizar máxima entropía. Usa uno para cada cuenta.",
              "type": "info"
            },
            {
              "text": "La autenticación multifactor (MFA) te protege incluso si tu contraseña está comprometida. Actívala en todos los lugares posibles, especialmente para correo, banca y cuentas en la nube.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Niveles de Fuerza de Entropía",
          "items": [
            {
              "text": "0–28 bits (Muy Débil): Descifrable en segundos. Incluye contraseñas comunes, PINs cortos, palabras simples del diccionario y patrones triviales.",
              "type": "warning"
            },
            {
              "text": "28–35 bits (Débil): Descifrable en minutos a horas sin conexión. Contraseñas cortas de mayúsculas y minúsculas, sustituciones simples como P@ss, números de teléfono.",
              "type": "warning"
            },
            {
              "text": "36–59 bits (Regular): Toma días a años sin conexión. Contraseñas de longitud media con algo de complejidad. Adecuado solo para cuentas de bajo valor.",
              "type": "info"
            },
            {
              "text": "60–79 bits (Fuerte): Tomaría décadas a siglos. Contraseñas largas o frases de paso de 4+ palabras. Bueno para la mayoría de cuentas.",
              "type": "info"
            },
            {
              "text": "80–127 bits (Muy Fuerte): Efectivamente indescifrable por la tecnología actual. Contraseñas aleatorias de 16+ caracteres. Recomendado para cuentas críticas.",
              "type": "info"
            },
            {
              "text": "128+ bits (Máximo): Excede la seguridad de grado de cifrado. Incluso las computadoras cuánticas necesitarían tiempo astronómico. Excesivo para la mayoría de propósitos.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Entropía de Contraseña",
          "description": "Cálculos paso a paso mostrando entropía bruta vs efectiva",
          "examples": [
            {
              "title": "Débil: password123",
              "steps": [
                "Conjunto de caracteres: minúsculas (26) + dígitos (10) = 36",
                "Longitud: 11 caracteres",
                "Entropía bruta = 11 × log₂(36) = 11 × 5.17 = 56.8 bits",
                "⚠️ Patrón detectado: coincidencia de contraseña común → penalización de −30 bits",
                "⚠️ Patrón detectado: dígitos secuenciales (123) → penalización de −10 bits",
                "Entropía efectiva = 56.8 − 40 = 16.8 bits → Muy Débil"
              ],
              "result": "A pesar de 56.8 bits de entropía bruta, la entropía efectiva es solo 16.8 bits porque 'password123' está en todas las bases de datos de filtraciones. Sería descifrada instantáneamente."
            },
            {
              "title": "Fuerte: kQ8#mL!2xP$5nR7&wZ",
              "steps": [
                "Conjunto de caracteres: minúsculas (26) + mayúsculas (26) + dígitos (10) + símbolos (32) = 94",
                "Longitud: 18 caracteres",
                "Entropía bruta = 18 × log₂(94) = 18 × 6.55 = 117.9 bits",
                "✅ No se detectaron patrones → 0 penalización",
                "Entropía efectiva = 117.9 bits → Muy Fuerte",
                "Tiempo de descifrado del clúster GPU: 2.1 × 10¹⁵ años"
              ],
              "result": "117.9 bits sin penalizaciones. Esta contraseña verdaderamente aleatoria es efectivamente indescifrable por cualquier tecnología actual o del futuro cercano."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "¿Es seguro escribir mi contraseña real aquí?",
          "answer": "Sí. Esta calculadora funciona 100% en tu navegador usando JavaScript — tu contraseña nunca se envía a ningún servidor, API o tercero. Todo el análisis ocurre localmente en tu dispositivo. Puedes verificar esto desconectándote de internet y usando la calculadora sin conexión. Nunca almacenamos, registramos o transmitimos tu entrada."
        },
        "1": {
          "question": "¿Cuál es la diferencia entre entropía bruta y efectiva?",
          "answer": "La entropía bruta es el máximo teórico basado puramente en la longitud de la contraseña y el tamaño del conjunto de caracteres (la fórmula clásica: Longitud × log₂(conjunto de caracteres)). La entropía efectiva considera las debilidades del mundo real: si tu contraseña contiene palabras comunes, patrones de teclado, caracteres secuenciales o sustituciones leet speak, los atacantes no necesitan forzar brutalmente cada combinación. Prueban estos patrones primero. La entropía efectiva resta penalizaciones por cada patrón detectado, dando una puntuación de seguridad más realista."
        },
        "2": {
          "question": "¿Qué tan larga debería ser mi contraseña?",
          "answer": "Como mínimo 14 caracteres, idealmente 16 o más. NIST SP 800-63B recomienda al menos 8 caracteres como línea base, pero los expertos en seguridad modernos y organizaciones como CISA recomiendan 16+. Cada carácter adicional multiplica el espacio de búsqueda por el tamaño del conjunto de caracteres — agregar un carácter a una contraseña alfanumérica de mayúsculas y minúsculas multiplica la dificultad de fuerza bruta por 62×. Una contraseña de 20 caracteres tiene más de mil millones de veces más combinaciones que una de 14 caracteres usando el mismo conjunto de caracteres."
        },
        "3": {
          "question": "¿Son mejores las frases de paso que las contraseñas aleatorias?",
          "answer": "Para la memorabilidad, sí. Una frase de paso de 5 palabras de una lista de 7,776 palabras (como la Diceware de EFF) tiene aproximadamente 64 bits de entropía — equivalente a una contraseña mixta aleatoria de 10 caracteres. Una frase de paso de 7 palabras alcanza 90 bits. Las frases de paso son mucho más fáciles de escribir y recordar. Sin embargo, las palabras deben ser verdaderamente aleatorias (no una oración que dirías naturalmente). Para máxima seguridad, una contraseña aleatoria de 18+ caracteres de un gestor de contraseñas sigue siendo el estándar de oro."
        },
        "4": {
          "question": "¿Qué es el escenario de computación cuántica?",
          "answer": "El algoritmo de Grover permite a una computadora cuántica buscar en una base de datos no ordenada en √N operaciones en lugar de N. Para contraseñas, esto efectivamente reduce a la mitad los bits de entropía: una contraseña de 128 bits se vuelve equivalente a 64 bits contra un ataque cuántico. Las computadoras cuánticas actuales son demasiado pequeñas y propensas a errores para esto, pero es una métrica útil de planificación. La recomendación estándar es usar contraseñas con 128+ bits de entropía para mantenerse seguro incluso contra futuras amenazas cuánticas."
        },
        "5": {
          "question": "¿Por qué 'P@$$w0rd!' obtiene una puntuación pobre a pesar de usar todos los tipos de caracteres?",
          "answer": "Porque los atacantes reales no fuerzan brutalmente carácter por carácter — usan diccionarios, bases de datos de filtraciones y ataques basados en reglas que prueban primero sustituciones comunes. 'P@$$w0rd!' es una variante leet-speak de la contraseña #1 más común del mundo. Los crackeadores de contraseñas como Hashcat y John the Ripper incluyen reglas que automáticamente prueban a→@, s→$, o→0 y sustituciones similares. La fórmula de entropía bruta asume que cada carácter es aleatorio, pero estos patrones hacen que la contraseña sea altamente predecible."
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
      }
    },
    pt: {
      "name": "Calculadora de Força de Senha",
      "slug": "calculadora-forca-senha",
      "subtitle": "Analise a entropia da senha, detecte padrões fracos e estime tempos de quebra em 7 cenários de ataque — incluindo computação quântica. 100% privado, nada sai do seu navegador.",
      "breadcrumb": "Força de Senha",
      "seo": {
        "title": "Calculadora de Força de Senha - Entropia, Tempo de Quebra e Análise de Padrões",
        "description": "Verifique quão forte sua senha realmente é. Detecta padrões comuns, sequências de teclado, leet speak e caracteres repetidos. Estima tempo de quebra para 7 cenários incluindo computação quântica. Gratuito, local, multilíngue.",
        "shortDescription": "Analise a força da senha com entropia, detecção de padrões e estimativas de tempo de quebra.",
        "keywords": [
          "calculadora força senha",
          "calculadora entropia senha",
          "quão forte é minha senha",
          "tempo quebra senha",
          "verificador segurança senha",
          "calculadora tempo força bruta",
          "detector padrão senha",
          "tempo quebra senha quântica"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "password": {
          "label": "Digite a Senha",
          "helpText": "Analisada 100% localmente — sua senha nunca sai do seu navegador"
        },
        "attackScenario": {
          "label": "Cenário de Ataque Principal",
          "helpText": "Define o poder computacional do atacante principal para o resultado de tempo de quebra primário",
          "options": {
            "online_throttled": "Online — Limitado (100/seg)",
            "online_unthrottled": "Online — Ilimitado (1K/seg)",
            "offline_slow": "Offline — Hash Lento (10K/seg)",
            "offline_fast": "Offline — Hash Rápido (10B/seg)",
            "gpu_cluster": "Cluster GPU (100B/seg)",
            "state_level": "Nível Estatal (10T/seg)",
            "quantum": "Computador Quântico (teórico)"
          }
        }
      },
      "results": {
        "strength": {
          "label": "Força"
        },
        "entropyBits": {
          "label": "Entropia"
        },
        "effectiveEntropy": {
          "label": "Entropia Efetiva"
        },
        "crackTime": {
          "label": "Tempo de Quebra"
        },
        "charsetSize": {
          "label": "Tamanho do Conjunto de Caracteres"
        },
        "searchSpace": {
          "label": "Espaço de Busca"
        },
        "score": {
          "label": "Pontuação"
        },
        "passwordLength": {
          "label": "Comprimento"
        },
        "patternsFound": {
          "label": "Padrões Encontrados"
        },
        "penaltyApplied": {
          "label": "Penalidade de Entropia"
        }
      },
      "presets": {
        "weak": {
          "label": "Exemplo Fraco",
          "description": "Padrão comum de senha"
        },
        "medium": {
          "label": "Mistura Média",
          "description": "Maiúsculas e minúsculas com símbolos e ano"
        },
        "strong": {
          "label": "Aleatório Forte",
          "description": "Mistura aleatória de 19 caracteres"
        },
        "passphrase": {
          "label": "Frase-senha",
          "description": "Frase-senha de 4 palavras estilo XKCD"
        }
      },
      "values": {
        "bits": "bits",
        "characters": "caracteres",
        "combinations": "combinações",
        "instant": "Instantâneo",
        "seconds": "segundos",
        "minutes": "minutos",
        "hours": "horas",
        "days": "dias",
        "weeks": "semanas",
        "months": "meses",
        "years": "anos",
        "centuries": "séculos",
        "millennia": "milênios",
        "veryWeak": "Muito Fraca",
        "weak": "Fraca",
        "fair": "Razoável",
        "strong": "Forte",
        "veryStrong": "Muito Forte",
        "lowercase": "Minúsculas (a-z)",
        "uppercase": "Maiúsculas (A-Z)",
        "digits": "Dígitos (0-9)",
        "symbols": "Símbolos (!@#$...)",
        "spaces": "Espaços",
        "unicode": "Unicode/Estendido",
        "yes": "Sim",
        "no": "Não",
        "none": "Nenhum detectado"
      },
      "formats": {
        "summary": "Sua senha tem {entropy} bits de entropia ({effectiveEntropy} efetivos) — classificada como {strength}. Tempo estimado de quebra ({scenario}): {crackTime}."
      },
      "infoCards": {
        "metrics": {
          "title": "Visão Geral de Segurança",
          "items": [
            {
              "label": "Classificação de Força",
              "valueKey": "strength"
            },
            {
              "label": "Entropia Bruta",
              "valueKey": "entropyBits"
            },
            {
              "label": "Entropia Efetiva",
              "valueKey": "effectiveEntropy"
            },
            {
              "label": "Tempo de Quebra",
              "valueKey": "crackTime"
            }
          ]
        },
        "details": {
          "title": "Análise de Caracteres e Padrões",
          "items": [
            {
              "label": "Comprimento da Senha",
              "valueKey": "passwordLength"
            },
            {
              "label": "Tem Minúsculas",
              "valueKey": "hasLowercase"
            },
            {
              "label": "Tem Maiúsculas",
              "valueKey": "hasUppercase"
            },
            {
              "label": "Tem Dígitos",
              "valueKey": "hasDigits"
            },
            {
              "label": "Tem Símbolos",
              "valueKey": "hasSymbols"
            },
            {
              "label": "Padrões Detectados",
              "valueKey": "patternsFound"
            },
            {
              "label": "Penalidade de Entropia",
              "valueKey": "penaltyApplied"
            },
            {
              "label": "Dicas de Melhoria",
              "valueKey": "suggestions"
            }
          ]
        },
        "tips": {
          "title": "Melhores Práticas de Segurança de Senhas",
          "items": [
            "Use 16+ caracteres — cada caractere extra aumenta exponencialmente a segurança. Comprimento supera complexidade.",
            "Evite padrões previsíveis: sequências de teclado (qwerty), sequências (12345), caracteres repetidos (aaa) e leet speak (P@$$w0rd).",
            "Frases-senha de 5+ palavras aleatórias são fáceis de lembrar e fornecem 60+ bits de entropia.",
            "Use um gerenciador de senhas para gerar senhas verdadeiramente aleatórias e únicas para cada conta."
          ]
        }
      },
      "chart": {
        "title": "Tempo de Quebra por Cenário de Ataque",
        "xLabel": "Cenário",
        "yLabel": "Log₁₀ Segundos",
        "series": {
          "logTime": "Tempo (log₁₀ seg)"
        }
      },
      "detailedTable": {
        "crackScenarios": {
          "button": "Ver Todos os Cenários de Ataque",
          "title": "Comparação de Tempo de Quebra — Todos os 7 Cenários",
          "columns": {
            "scenario": "Cenário de Ataque",
            "speed": "Tentativas/seg",
            "time": "Tempo para Quebrar",
            "example": "Exemplo de Atacante"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O Que É Entropia de Senha?",
          "content": "A entropia de senha mede a imprevisibilidade de uma senha em bits. Representa o número de decisões binárias sim/não que um atacante deve fazer para adivinhar sua senha por força bruta. Uma senha com 40 bits de entropia tem 2⁴⁰ (cerca de 1,1 trilhão) de combinações possíveis. Cada bit adicional dobra o espaço de busca, tornando a senha exponencialmente mais difícil de quebrar. A fórmula é: Entropia = Comprimento × log₂(Tamanho do Conjunto). Por exemplo, uma senha de 8 caracteres usando apenas letras minúsculas (conjunto = 26) tem 8 × 4,7 = 37,6 bits de entropia. No entanto, a entropia bruta assume que cada caractere é perfeitamente aleatório — senhas do mundo real frequentemente contêm padrões que reduzem sua força efetiva. Esta calculadora detecta esses padrões e aplica penalidades para dar uma avaliação de segurança mais realista."
        },
        "howItWorks": {
          "title": "Como Esta Calculadora Funciona",
          "content": "Esta calculadora vai além da matemática simples de entropia aplicando uma análise de múltiplas camadas. Primeiro, calcula a entropia bruta do tamanho do conjunto de caracteres e comprimento da senha. Então varre por padrões de fraqueza: senhas comuns (top 200 de bancos de dados de vazamentos), sequências de teclado (qwerty, asdf), caracteres sequenciais (abc, 123), caracteres repetidos (aaa), substituições leet speak (@ por a, 0 por o) e padrões de anos finais (2024, 2025). Cada padrão detectado aplica uma penalidade de entropia, produzindo uma pontuação de 'entropia efetiva' que melhor reflete a capacidade de quebra do mundo real. Os tempos de quebra são estimados para 7 cenários: de ataques online com limite de taxa (100 tentativas/seg) até computadores quânticos teóricos usando o algoritmo de Grover (que reduz pela metade o comprimento efetivo de bits). Toda análise roda inteiramente no seu navegador — sua senha nunca é transmitida para lugar algum."
        },
        "considerations": {
          "title": "Considerações Críticas de Segurança",
          "items": [
            {
              "text": "Comprimento supera complexidade: uma senha de 20 caracteres minúsculos (94 bits) é mais forte que uma senha mista de 8 caracteres (52 bits). Sempre priorize comprimento.",
              "type": "info"
            },
            {
              "text": "Senhas comuns como 'Password123!' têm entropia real quase zero apesar de usar todos os tipos de caracteres. Atacantes verificam listas de dicionários e vazamentos primeiro.",
              "type": "warning"
            },
            {
              "text": "Padrões de teclado (qwerty, zxcv), sequências (abcd, 1234) e leet speak (P@$$w0rd) são as primeiras coisas que ferramentas de quebra tentam depois de dicionários.",
              "type": "warning"
            },
            {
              "text": "Frases-senha de 5+ palavras aleatórias fornecem 60+ bits de entropia e são muito mais fáceis de lembrar que strings de caracteres aleatórios.",
              "type": "info"
            },
            {
              "text": "Gerenciadores de senhas geram senhas verdadeiramente aleatórias — a única maneira de garantir entropia máxima. Use um para cada conta.",
              "type": "info"
            },
            {
              "text": "Autenticação de múltiplos fatores (AMF) protege você mesmo se sua senha for comprometida. Ative em todos os lugares possíveis, especialmente para email, bancos e contas na nuvem.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Níveis de Força de Entropia",
          "items": [
            {
              "text": "0–28 bits (Muito Fraca): Quebrável em segundos. Inclui senhas comuns, PINs curtos, palavras únicas de dicionário e padrões triviais.",
              "type": "warning"
            },
            {
              "text": "28–35 bits (Fraca): Quebrável em minutos a horas offline. Senhas curtas mistas, substituições simples como P@ss, números de telefone.",
              "type": "warning"
            },
            {
              "text": "36–59 bits (Razoável): Leva dias a anos offline. Senhas de comprimento médio com alguma complexidade. Adequado apenas para contas de baixo valor.",
              "type": "info"
            },
            {
              "text": "60–79 bits (Forte): Levaria décadas a séculos. Senhas longas ou frases-senha de 4+ palavras. Bom para a maioria das contas.",
              "type": "info"
            },
            {
              "text": "80–127 bits (Muito Forte): Efetivamente inquebráveis pela tecnologia atual. Senhas aleatórias de 16+ caracteres. Recomendado para contas críticas.",
              "type": "info"
            },
            {
              "text": "128+ bits (Máximo): Excede segurança de nível de criptografia. Até computadores quânticos precisariam de tempo astronômico. Exagero para a maioria dos propósitos.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Entropia de Senha",
          "description": "Cálculos passo a passo mostrando entropia bruta vs efetiva",
          "examples": [
            {
              "title": "Fraca: password123",
              "steps": [
                "Conjunto: minúsculas (26) + dígitos (10) = 36",
                "Comprimento: 11 caracteres",
                "Entropia bruta = 11 × log₂(36) = 11 × 5,17 = 56,8 bits",
                "⚠️ Padrão detectado: senha comum correspondente → penalidade de −30 bits",
                "⚠️ Padrão detectado: dígitos sequenciais (123) → penalidade de −10 bits",
                "Entropia efetiva = 56,8 − 40 = 16,8 bits → Muito Fraca"
              ],
              "result": "Apesar dos 56,8 bits de entropia bruta, a entropia efetiva é apenas 16,8 bits porque 'password123' está em todo banco de dados de vazamento. Seria quebrada instantaneamente."
            },
            {
              "title": "Forte: kQ8#mL!2xP$5nR7&wZ",
              "steps": [
                "Conjunto: minúsculas (26) + maiúsculas (26) + dígitos (10) + símbolos (32) = 94",
                "Comprimento: 18 caracteres",
                "Entropia bruta = 18 × log₂(94) = 18 × 6,55 = 117,9 bits",
                "✅ Nenhum padrão detectado → penalidade 0",
                "Entropia efetiva = 117,9 bits → Muito Forte",
                "Tempo de quebra cluster GPU: 2,1 × 10¹⁵ anos"
              ],
              "result": "117,9 bits sem penalidades. Esta senha verdadeiramente aleatória é efetivamente inquebrada por qualquer tecnologia atual ou futura próxima."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "É seguro digitar minha senha real aqui?",
          "answer": "Sim. Esta calculadora roda 100% no seu navegador usando JavaScript — sua senha nunca é enviada para nenhum servidor, API ou terceiros. Toda análise acontece localmente no seu dispositivo. Você pode verificar isso desconectando da internet e usando a calculadora offline. Nunca armazenamos, registramos ou transmitimos sua entrada."
        },
        "1": {
          "question": "Qual é a diferença entre entropia bruta e efetiva?",
          "answer": "Entropia bruta é o máximo teórico baseado puramente no comprimento da senha e tamanho do conjunto de caracteres (a fórmula clássica: Comprimento × log₂(conjunto)). Entropia efetiva conta fraquezas do mundo real: se sua senha contém palavras comuns, padrões de teclado, caracteres sequenciais ou substituições leet speak, atacantes não precisam forçar brutamente todas as combinações. Eles tentam esses padrões primeiro. Entropia efetiva subtrai penalidades para cada padrão detectado, dando uma pontuação de segurança mais realista."
        },
        "2": {
          "question": "Qual deve ser o comprimento da minha senha?",
          "answer": "No mínimo 14 caracteres, idealmente 16 ou mais. NIST SP 800-63B recomenda pelo menos 8 caracteres como linha de base, mas especialistas em segurança modernos e organizações como CISA recomendam 16+. Cada caractere adicional multiplica o espaço de busca pelo tamanho do conjunto — adicionar um caractere a uma senha alfanumérica mista multiplica a dificuldade de força bruta por 62×. Uma senha de 20 caracteres tem mais de um bilhão de vezes mais combinações que uma de 14 caracteres usando o mesmo conjunto."
        },
        "3": {
          "question": "Frases-senha são melhores que senhas aleatórias?",
          "answer": "Para memorização, sim. Uma frase-senha de 5 palavras de uma lista de 7.776 palavras (como o Diceware da EFF) tem cerca de 64 bits de entropia — equivalente a uma senha mista aleatória de 10 caracteres. Uma frase-senha de 7 palavras atinge 90 bits. Frases-senha são muito mais fáceis de digitar e lembrar. No entanto, as palavras devem ser verdadeiramente aleatórias (não uma frase que você diria naturalmente). Para segurança máxima, uma senha aleatória de 18+ caracteres de um gerenciador de senhas ainda é o padrão ouro."
        },
        "4": {
          "question": "O que é o cenário de computação quântica?",
          "answer": "O algoritmo de Grover permite que um computador quântico busque em uma base de dados não ordenada em √N operações em vez de N. Para senhas, isso efetivamente reduz pela metade os bits de entropia: uma senha de 128 bits torna-se equivalente a 64 bits contra um ataque quântico. Computadores quânticos atuais são muito pequenos e propensos a erros para isso, mas é uma métrica útil de planejamento. A recomendação padrão é usar senhas com 128+ bits de entropia para permanecer seguro mesmo contra ameaças quânticas futuras."
        },
        "5": {
          "question": "Por que 'P@$$w0rd!' pontua mal apesar de usar todos os tipos de caracteres?",
          "answer": "Porque atacantes reais não forçam brutamente caractere por caractere — eles usam dicionários, bancos de dados de vazamentos e ataques baseados em regras que tentam substituições comuns primeiro. 'P@$$w0rd!' é uma variante leet speak da senha #1 mais comum do mundo. Quebradores de senhas como Hashcat e John the Ripper incluem regras que automaticamente tentam a→@, s→$, o→0 e substituições similares. A fórmula de entropia bruta assume que cada caractere é aleatório, mas esses padrões tornam a senha altamente previsível."
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
      "name": "Calculateur de Force de Mot de Passe",
      "slug": "calculateur-force-mot-de-passe",
      "subtitle": "Analysez l'entropie des mots de passe, détectez les motifs faibles et estimez les temps de piratage dans 7 scénarios d'attaque — y compris l'informatique quantique. 100% privé, rien ne quitte votre navigateur.",
      "breadcrumb": "Force du Mot de Passe",
      "seo": {
        "title": "Calculateur de Force de Mot de Passe - Entropie, Temps de Piratage & Analyse de Motifs",
        "description": "Vérifiez la véritable force de votre mot de passe. Détecte les motifs courants, les séquences clavier, le leet speak et les caractères répétés. Estime le temps de piratage pour 7 scénarios incluant l'informatique quantique. Gratuit, côté client, multilingue.",
        "shortDescription": "Analysez la force des mots de passe avec l'entropie, la détection de motifs et les estimations de temps de piratage.",
        "keywords": [
          "calculateur force mot de passe",
          "calculateur entropie mot de passe",
          "force de mon mot de passe",
          "temps piratage mot de passe",
          "vérificateur sécurité mot de passe",
          "calculateur temps force brute",
          "détecteur motifs mot de passe",
          "temps piratage quantique mot de passe"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "password": {
          "label": "Saisir le Mot de Passe",
          "helpText": "Analysé 100% localement — votre mot de passe ne quitte jamais votre navigateur"
        },
        "attackScenario": {
          "label": "Scénario d'Attaque Principal",
          "helpText": "Définit la puissance de calcul principale de l'attaquant pour le résultat de temps de piratage principal",
          "options": {
            "online_throttled": "En ligne — Limité (100/sec)",
            "online_unthrottled": "En ligne — Non limité (1K/sec)",
            "offline_slow": "Hors ligne — Hash Lent (10K/sec)",
            "offline_fast": "Hors ligne — Hash Rapide (10B/sec)",
            "gpu_cluster": "Cluster GPU (100B/sec)",
            "state_level": "Niveau État (10T/sec)",
            "quantum": "Ordinateur Quantique (théorique)"
          }
        }
      },
      "results": {
        "strength": {
          "label": "Force"
        },
        "entropyBits": {
          "label": "Entropie"
        },
        "effectiveEntropy": {
          "label": "Entropie Effective"
        },
        "crackTime": {
          "label": "Temps de Piratage"
        },
        "charsetSize": {
          "label": "Taille du Jeu de Caractères"
        },
        "searchSpace": {
          "label": "Espace de Recherche"
        },
        "score": {
          "label": "Score"
        },
        "passwordLength": {
          "label": "Longueur"
        },
        "patternsFound": {
          "label": "Motifs Trouvés"
        },
        "penaltyApplied": {
          "label": "Pénalité d'Entropie"
        }
      },
      "presets": {
        "weak": {
          "label": "Exemple Faible",
          "description": "Motif de mot de passe courant"
        },
        "medium": {
          "label": "Mélange Moyen",
          "description": "Casse mixte avec symboles et année"
        },
        "strong": {
          "label": "Aléatoire Fort",
          "description": "Mélange aléatoire de 19 caractères"
        },
        "passphrase": {
          "label": "Phrase de Passe",
          "description": "Phrase de passe style XKCD de 4 mots"
        }
      },
      "values": {
        "bits": "bits",
        "characters": "caractères",
        "combinations": "combinaisons",
        "instant": "Instantané",
        "seconds": "secondes",
        "minutes": "minutes",
        "hours": "heures",
        "days": "jours",
        "weeks": "semaines",
        "months": "mois",
        "years": "années",
        "centuries": "siècles",
        "millennia": "millénaires",
        "veryWeak": "Très Faible",
        "weak": "Faible",
        "fair": "Correct",
        "strong": "Fort",
        "veryStrong": "Très Fort",
        "lowercase": "Minuscules (a-z)",
        "uppercase": "Majuscules (A-Z)",
        "digits": "Chiffres (0-9)",
        "symbols": "Symboles (!@#$...)",
        "spaces": "Espaces",
        "unicode": "Unicode/Étendu",
        "yes": "Oui",
        "no": "Non",
        "none": "Aucun détecté"
      },
      "formats": {
        "summary": "Votre mot de passe a {entropy} bits d'entropie ({effectiveEntropy} effective) — noté {strength}. Temps de piratage estimé ({scenario}) : {crackTime}."
      },
      "infoCards": {
        "metrics": {
          "title": "Aperçu de Sécurité",
          "items": [
            {
              "label": "Note de Force",
              "valueKey": "strength"
            },
            {
              "label": "Entropie Brute",
              "valueKey": "entropyBits"
            },
            {
              "label": "Entropie Effective",
              "valueKey": "effectiveEntropy"
            },
            {
              "label": "Temps de Piratage",
              "valueKey": "crackTime"
            }
          ]
        },
        "details": {
          "title": "Analyse des Caractères et Motifs",
          "items": [
            {
              "label": "Longueur du Mot de Passe",
              "valueKey": "passwordLength"
            },
            {
              "label": "A des Minuscules",
              "valueKey": "hasLowercase"
            },
            {
              "label": "A des Majuscules",
              "valueKey": "hasUppercase"
            },
            {
              "label": "A des Chiffres",
              "valueKey": "hasDigits"
            },
            {
              "label": "A des Symboles",
              "valueKey": "hasSymbols"
            },
            {
              "label": "Motifs Détectés",
              "valueKey": "patternsFound"
            },
            {
              "label": "Pénalité d'Entropie",
              "valueKey": "penaltyApplied"
            },
            {
              "label": "Conseils d'Amélioration",
              "valueKey": "suggestions"
            }
          ]
        },
        "tips": {
          "title": "Meilleures Pratiques de Sécurité des Mots de Passe",
          "items": [
            "Utilisez 16+ caractères — chaque caractère supplémentaire augmente exponentiellement la sécurité. La longueur bat la complexité.",
            "Évitez les motifs prévisibles : séquences clavier (qwerty), suites (12345), caractères répétés (aaa), et leet speak (P@$$w0rd).",
            "Les phrases de passe de 5+ mots aléatoires sont faciles à retenir et fournissent 60+ bits d'entropie.",
            "Utilisez un gestionnaire de mots de passe pour générer des mots de passe vraiment aléatoires et uniques pour chaque compte."
          ]
        }
      },
      "chart": {
        "title": "Temps de Piratage par Scénario d'Attaque",
        "xLabel": "Scénario",
        "yLabel": "Log₁₀ Secondes",
        "series": {
          "logTime": "Temps (log₁₀ sec)"
        }
      },
      "detailedTable": {
        "crackScenarios": {
          "button": "Voir Tous les Scénarios d'Attaque",
          "title": "Comparaison Temps de Piratage — Tous les 7 Scénarios",
          "columns": {
            "scenario": "Scénario d'Attaque",
            "speed": "Tentatives/sec",
            "time": "Temps pour Pirater",
            "example": "Exemple d'Attaquant"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que l'Entropie d'un Mot de Passe ?",
          "content": "L'entropie d'un mot de passe mesure l'imprévisibilité d'un mot de passe en bits. Elle représente le nombre de décisions binaires oui/non qu'un attaquant doit prendre pour deviner votre mot de passe par force brute. Un mot de passe avec 40 bits d'entropie a 2⁴⁰ (environ 1,1 billion) combinaisons possibles. Chaque bit supplémentaire double l'espace de recherche, rendant le mot de passe exponentiellement plus difficile à pirater. La formule est : Entropie = Longueur × log₂(Taille du Jeu de Caractères). Par exemple, un mot de passe de 8 caractères utilisant uniquement des lettres minuscules (jeu = 26) a 8 × 4,7 = 37,6 bits d'entropie. Cependant, l'entropie brute suppose que chaque caractère est parfaitement aléatoire — les mots de passe réels contiennent souvent des motifs qui réduisent leur force effective. Ce calculateur détecte ces motifs et applique des pénalités pour vous donner une évaluation de sécurité plus réaliste."
        },
        "howItWorks": {
          "title": "Comment Fonctionne ce Calculateur",
          "content": "Ce calculateur va au-delà des mathématiques simples d'entropie en appliquant une analyse multicouche. D'abord, il calcule l'entropie brute à partir de la taille du jeu de caractères et de la longueur du mot de passe. Ensuite, il recherche des motifs de faiblesse : mots de passe courants (top 200 des bases de données de fuites), séquences clavier (qwerty, asdf), caractères séquentiels (abc, 123), caractères répétés (aaa), substitutions leet speak (@ pour a, 0 pour o), et motifs d'années finales (2024, 2025). Chaque motif détecté applique une pénalité d'entropie, produisant un score d'« entropie effective » qui reflète mieux la piratabilité réelle. Les temps de piratage sont estimés pour 7 scénarios : des attaques en ligne limitées en débit (100 tentatives/sec) aux ordinateurs quantiques théoriques utilisant l'algorithme de Grover (qui divise par deux la longueur effective en bits). Toute l'analyse s'exécute entièrement dans votre navigateur — votre mot de passe n'est jamais transmis nulle part."
        },
        "considerations": {
          "title": "Considérations Critiques de Sécurité",
          "items": [
            {
              "text": "La longueur bat la complexité : un mot de passe de 20 caractères en minuscules (94 bits) est plus fort qu'un mot de passe mixte de 8 caractères (52 bits). Privilégiez toujours la longueur.",
              "type": "info"
            },
            {
              "text": "Les mots de passe courants comme 'Password123!' ont une entropie réelle proche de zéro malgré l'utilisation de tous les types de caractères. Les attaquants vérifient d'abord les dictionnaires et les listes de fuites.",
              "type": "warning"
            },
            {
              "text": "Les motifs clavier (qwerty, zxcv), les séquences (abcd, 1234), et le leet speak (P@$$w0rd) sont les premières choses que les outils de piratage essaient après les dictionnaires.",
              "type": "warning"
            },
            {
              "text": "Les phrases de passe de 5+ mots aléatoires fournissent 60+ bits d'entropie et sont beaucoup plus faciles à retenir que les chaînes de caractères aléatoires.",
              "type": "info"
            },
            {
              "text": "Les gestionnaires de mots de passe génèrent des mots de passe vraiment aléatoires — la seule façon de garantir une entropie maximale. Utilisez-en un pour chaque compte.",
              "type": "info"
            },
            {
              "text": "L'authentification multifacteur (AMF) vous protège même si votre mot de passe est compromis. Activez-la partout où c'est possible, surtout pour l'email, la banque et les comptes cloud.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Niveaux de Force d'Entropie",
          "items": [
            {
              "text": "0–28 bits (Très Faible) : Piratable en secondes. Inclut les mots de passe courants, les PIN courts, les mots de dictionnaire simples et les motifs triviaux.",
              "type": "warning"
            },
            {
              "text": "28–35 bits (Faible) : Piratable en minutes à heures hors ligne. Mots de passe courts à casse mixte, substitutions simples comme P@ss, numéros de téléphone.",
              "type": "warning"
            },
            {
              "text": "36–59 bits (Correct) : Prend des jours à années hors ligne. Mots de passe de longueur moyenne avec une certaine complexité. Adéquat uniquement pour les comptes de faible valeur.",
              "type": "info"
            },
            {
              "text": "60–79 bits (Fort) : Prendrait des décennies à siècles. Mots de passe longs ou phrases de passe de 4+ mots. Bon pour la plupart des comptes.",
              "type": "info"
            },
            {
              "text": "80–127 bits (Très Fort) : Effectivement inpiratables par la technologie actuelle. Mots de passe aléatoires de 16+ caractères. Recommandé pour les comptes critiques.",
              "type": "info"
            },
            {
              "text": "128+ bits (Maximum) : Dépasse la sécurité de niveau cryptographique. Même les ordinateurs quantiques auraient besoin d'un temps astronomique. Excessif pour la plupart des usages.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples d'Entropie de Mots de Passe",
          "description": "Calculs étape par étape montrant l'entropie brute vs effective",
          "examples": [
            {
              "title": "Faible : password123",
              "steps": [
                "Jeu de caractères : minuscules (26) + chiffres (10) = 36",
                "Longueur : 11 caractères",
                "Entropie brute = 11 × log₂(36) = 11 × 5,17 = 56,8 bits",
                "⚠️ Motif détecté : correspondance mot de passe courant → pénalité −30 bits",
                "⚠️ Motif détecté : chiffres séquentiels (123) → pénalité −10 bits",
                "Entropie effective = 56,8 − 40 = 16,8 bits → Très Faible"
              ],
              "result": "Malgré 56,8 bits d'entropie brute, l'entropie effective n'est que de 16,8 bits car 'password123' est dans toutes les bases de données de fuites. Il serait piraté instantanément."
            },
            {
              "title": "Fort : kQ8#mL!2xP$5nR7&wZ",
              "steps": [
                "Jeu de caractères : min (26) + maj (26) + chiffres (10) + symboles (32) = 94",
                "Longueur : 18 caractères",
                "Entropie brute = 18 × log₂(94) = 18 × 6,55 = 117,9 bits",
                "✅ Aucun motif détecté → 0 pénalité",
                "Entropie effective = 117,9 bits → Très Fort",
                "Temps de piratage cluster GPU : 2,1 × 10¹⁵ années"
              ],
              "result": "117,9 bits sans pénalités. Ce mot de passe vraiment aléatoire est effectivement inpiratables par toute technologie actuelle ou future proche."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Est-il sûr de taper mon vrai mot de passe ici ?",
          "answer": "Oui. Ce calculateur fonctionne 100% dans votre navigateur en utilisant JavaScript — votre mot de passe n'est jamais envoyé à aucun serveur, API ou tiers. Toute l'analyse se fait localement sur votre appareil. Vous pouvez le vérifier en vous déconnectant d'internet et en utilisant le calculateur hors ligne. Nous ne stockons, n'enregistrons ni ne transmettons jamais votre saisie."
        },
        "1": {
          "question": "Quelle est la différence entre l'entropie brute et effective ?",
          "answer": "L'entropie brute est le maximum théorique basé purement sur la longueur du mot de passe et la taille du jeu de caractères (la formule classique : Longueur × log₂(jeu)). L'entropie effective tient compte des faiblesses du monde réel : si votre mot de passe contient des mots courants, des motifs clavier, des caractères séquentiels, ou des substitutions leet speak, les attaquants n'ont pas besoin de forcer brute toutes les combinaisons. Ils essaient ces motifs en premier. L'entropie effective soustrait des pénalités pour chaque motif détecté, donnant un score de sécurité plus réaliste."
        },
        "2": {
          "question": "Quelle longueur devrait avoir mon mot de passe ?",
          "answer": "Au minimum 14 caractères, idéalement 16 ou plus. Le NIST SP 800-63B recommande au moins 8 caractères comme base, mais les experts en sécurité modernes et les organisations comme CISA recommandent 16+. Chaque caractère supplémentaire multiplie l'espace de recherche par la taille du jeu de caractères — ajouter un caractère à un mot de passe alphanumérique à casse mixte multiplie la difficulté de force brute par 62×. Un mot de passe de 20 caractères a plus d'un milliard de fois plus de combinaisons qu'un de 14 caractères utilisant le même jeu."
        },
        "3": {
          "question": "Les phrases de passe sont-elles meilleures que les mots de passe aléatoires ?",
          "answer": "Pour la mémorisation, oui. Une phrase de passe de 5 mots d'une liste de 7 776 mots (comme la Diceware d'EFF) a environ 64 bits d'entropie — équivalent à un mot de passe mixte aléatoire de 10 caractères. Une phrase de passe de 7 mots atteint 90 bits. Les phrases de passe sont beaucoup plus faciles à taper et retenir. Cependant, les mots doivent être vraiment aléatoires (pas une phrase que vous diriez naturellement). Pour une sécurité maximale, un mot de passe aléatoire de 18+ caractères d'un gestionnaire de mots de passe reste l'étalon-or."
        },
        "4": {
          "question": "Qu'est-ce que le scénario informatique quantique ?",
          "answer": "L'algorithme de Grover permet à un ordinateur quantique de chercher dans une base de données non triée en √N opérations au lieu de N. Pour les mots de passe, cela divise effectivement par deux les bits d'entropie : un mot de passe de 128 bits devient équivalent à 64 bits contre une attaque quantique. Les ordinateurs quantiques actuels sont trop petits et sujets aux erreurs pour cela, mais c'est une métrique de planification utile. La recommandation standard est d'utiliser des mots de passe avec 128+ bits d'entropie pour rester sûr même contre les menaces quantiques futures."
        },
        "5": {
          "question": "Pourquoi 'P@$$w0rd!' score-t-il mal malgré l'utilisation de tous les types de caractères ?",
          "answer": "Parce que les vrais attaquants ne forcent pas caractère par caractère — ils utilisent des dictionnaires, des bases de données de fuites et des attaques basées sur des règles qui essaient d'abord les substitutions courantes. 'P@$$w0rd!' est une variante leet-speak du mot de passe #1 le plus courant au monde. Les piratoires de mots de passe comme Hashcat et John the Ripper incluent des règles qui essaient automatiquement a→@, s→$, o→0, et des substitutions similaires. La formule d'entropie brute suppose que chaque caractère est aléatoire, mais ces motifs rendent le mot de passe très prévisible."
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
      }
    },
    de: {
      "name": "Passwort-Stärke-Rechner",
      "slug": "passwort-staerke-rechner",
      "subtitle": "Analysieren Sie Passwort-Entropie, erkennen Sie schwache Muster und schätzen Sie Knackzeiten über 7 Angriffsszenarien — einschließlich Quantencomputing. 100% privat, nichts verlässt Ihren Browser.",
      "breadcrumb": "Passwort-Stärke",
      "seo": {
        "title": "Passwort-Stärke-Rechner - Entropie, Knackzeit & Muster-Analyse",
        "description": "Überprüfen Sie, wie stark Ihr Passwort wirklich ist. Erkennt häufige Muster, Tastaturwege, Leet-Speak und wiederholte Zeichen. Schätzt Knackzeiten für 7 Szenarien einschließlich Quantencomputing. Kostenlos, clientseitig, mehrsprachig.",
        "shortDescription": "Analysieren Sie die Passwort-Stärke mit Entropie, Mustererkennung und Knackzeit-Schätzungen.",
        "keywords": [
          "Passwort-Stärke-Rechner",
          "Passwort-Entropie-Rechner",
          "wie stark ist mein Passwort",
          "Passwort Knackzeit",
          "Passwort-Sicherheit Prüfer",
          "Brute-Force Zeit Rechner",
          "Passwort Muster Detektor",
          "Quantum Passwort Knackzeit"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "password": {
          "label": "Passwort eingeben",
          "helpText": "100% lokal analysiert — Ihr Passwort verlässt niemals Ihren Browser"
        },
        "attackScenario": {
          "label": "Primäres Angriffsszenario",
          "helpText": "Legt die Rechenleistung des Hauptangreifers für das primäre Knackzeit-Ergebnis fest",
          "options": {
            "online_throttled": "Online — Gedrosselt (100/Sek)",
            "online_unthrottled": "Online — Ungedrosselt (1K/Sek)",
            "offline_slow": "Offline — Langsamer Hash (10K/Sek)",
            "offline_fast": "Offline — Schneller Hash (10B/Sek)",
            "gpu_cluster": "GPU-Cluster (100B/Sek)",
            "state_level": "Staatliche Ebene (10T/Sek)",
            "quantum": "Quantencomputer (theoretisch)"
          }
        }
      },
      "results": {
        "strength": {
          "label": "Stärke"
        },
        "entropyBits": {
          "label": "Entropie"
        },
        "effectiveEntropy": {
          "label": "Effektive Entropie"
        },
        "crackTime": {
          "label": "Knackzeit"
        },
        "charsetSize": {
          "label": "Zeichensatzgröße"
        },
        "searchSpace": {
          "label": "Suchraum"
        },
        "score": {
          "label": "Bewertung"
        },
        "passwordLength": {
          "label": "Länge"
        },
        "patternsFound": {
          "label": "Gefundene Muster"
        },
        "penaltyApplied": {
          "label": "Entropie-Strafe"
        }
      },
      "presets": {
        "weak": {
          "label": "Schwaches Beispiel",
          "description": "Häufiges Passwort-Muster"
        },
        "medium": {
          "label": "Mittlere Mischung",
          "description": "Gemischte Groß-/Kleinschreibung mit Symbolen & Jahr"
        },
        "strong": {
          "label": "Stark Zufällig",
          "description": "19-Zeichen zufällige Mischung"
        },
        "passphrase": {
          "label": "Passphrase",
          "description": "4-Wort XKCD-Stil Passphrase"
        }
      },
      "values": {
        "bits": "Bits",
        "characters": "Zeichen",
        "combinations": "Kombinationen",
        "instant": "Sofort",
        "seconds": "Sekunden",
        "minutes": "Minuten",
        "hours": "Stunden",
        "days": "Tage",
        "weeks": "Wochen",
        "months": "Monate",
        "years": "Jahre",
        "centuries": "Jahrhunderte",
        "millennia": "Jahrtausende",
        "veryWeak": "Sehr Schwach",
        "weak": "Schwach",
        "fair": "Ordentlich",
        "strong": "Stark",
        "veryStrong": "Sehr Stark",
        "lowercase": "Kleinbuchstaben (a-z)",
        "uppercase": "Großbuchstaben (A-Z)",
        "digits": "Ziffern (0-9)",
        "symbols": "Symbole (!@#$...)",
        "spaces": "Leerzeichen",
        "unicode": "Unicode/Erweitert",
        "yes": "Ja",
        "no": "Nein",
        "none": "Keine erkannt"
      },
      "formats": {
        "summary": "Ihr Passwort hat {entropy} Bits Entropie ({effectiveEntropy} effektiv) — bewertet als {strength}. Geschätzte Knackzeit ({scenario}): {crackTime}."
      },
      "infoCards": {
        "metrics": {
          "title": "Sicherheitsübersicht",
          "items": [
            {
              "label": "Stärke-Bewertung",
              "valueKey": "strength"
            },
            {
              "label": "Rohe Entropie",
              "valueKey": "entropyBits"
            },
            {
              "label": "Effektive Entropie",
              "valueKey": "effectiveEntropy"
            },
            {
              "label": "Knackzeit",
              "valueKey": "crackTime"
            }
          ]
        },
        "details": {
          "title": "Zeichen- & Muster-Analyse",
          "items": [
            {
              "label": "Passwort-Länge",
              "valueKey": "passwordLength"
            },
            {
              "label": "Hat Kleinbuchstaben",
              "valueKey": "hasLowercase"
            },
            {
              "label": "Hat Großbuchstaben",
              "valueKey": "hasUppercase"
            },
            {
              "label": "Hat Ziffern",
              "valueKey": "hasDigits"
            },
            {
              "label": "Hat Symbole",
              "valueKey": "hasSymbols"
            },
            {
              "label": "Erkannte Muster",
              "valueKey": "patternsFound"
            },
            {
              "label": "Entropie-Strafe",
              "valueKey": "penaltyApplied"
            },
            {
              "label": "Verbesserungs-Tipps",
              "valueKey": "suggestions"
            }
          ]
        },
        "tips": {
          "title": "Passwort-Sicherheit Best Practices",
          "items": [
            "Verwenden Sie 16+ Zeichen — jedes zusätzliche Zeichen erhöht die Sicherheit exponentiell. Länge schlägt Komplexität.",
            "Vermeiden Sie vorhersagbare Muster: Tastaturwege (qwerty), Sequenzen (12345), wiederholte Zeichen (aaa) und Leet-Speak (P@$$w0rd).",
            "Passphrasen aus 5+ zufälligen Wörtern sind leicht zu merken und bieten 60+ Bits Entropie.",
            "Verwenden Sie einen Passwort-Manager, um wirklich zufällige, einzigartige Passwörter für jedes Konto zu generieren."
          ]
        }
      },
      "chart": {
        "title": "Knackzeit nach Angriffsszenario",
        "xLabel": "Szenario",
        "yLabel": "Log₁₀ Sekunden",
        "series": {
          "logTime": "Zeit (log₁₀ Sek)"
        }
      },
      "detailedTable": {
        "crackScenarios": {
          "button": "Alle Angriffsszenarien anzeigen",
          "title": "Knackzeit-Vergleich — Alle 7 Szenarien",
          "columns": {
            "scenario": "Angriffsszenario",
            "speed": "Versuche/Sek",
            "time": "Zeit zum Knacken",
            "example": "Beispiel-Angreifer"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist Passwort-Entropie?",
          "content": "Passwort-Entropie misst die Unvorhersagbarkeit eines Passworts in Bits. Sie repräsentiert die Anzahl binärer Ja/Nein-Entscheidungen, die ein Angreifer treffen muss, um Ihr Passwort durch Brute-Force zu erraten. Ein Passwort mit 40 Bits Entropie hat 2⁴⁰ (etwa 1,1 Billionen) mögliche Kombinationen. Jedes zusätzliche Bit verdoppelt den Suchraum und macht das Passwort exponentiell schwerer zu knacken. Die Formel ist: Entropie = Länge × log₂(Zeichensatzgröße). Zum Beispiel hat ein 8-Zeichen-Passwort mit nur Kleinbuchstaben (Zeichensatz = 26) 8 × 4,7 = 37,6 Bits Entropie. Jedoch nimmt die Roentropie an, dass jedes Zeichen perfekt zufällig ist — echte Passwörter enthalten oft Muster, die ihre effektive Stärke reduzieren. Dieser Rechner erkennt diese Muster und wendet Strafen an, um Ihnen eine realistischere Sicherheitsbewertung zu geben."
        },
        "howItWorks": {
          "title": "Wie dieser Rechner funktioniert",
          "content": "Dieser Rechner geht über einfache Entropie-Mathematik hinaus, indem er eine mehrstufige Analyse anwendet. Zuerst berechnet er die Roentropie aus Zeichensatzgröße und Passwort-Länge. Dann scannt er nach Schwachstellen-Mustern: häufige Passwörter (Top 200 aus Breach-Datenbanken), Tastaturwege (qwerty, asdf), sequenzielle Zeichen (abc, 123), wiederholte Zeichen (aaa), Leet-Speak-Substitutionen (@ für a, 0 für o) und nachgestellte Jahresmuster (2024, 2025). Jedes erkannte Muster wendet eine Entropie-Strafe an und produziert einen 'effektive Entropie'-Score, der die reale Knackbarkeit besser widerspiegelt. Knackzeiten werden für 7 Szenarien geschätzt: von ratenbegrenzten Online-Angriffen (100 Versuche/Sek) bis zu theoretischen Quantencomputern mit Grovers Algorithmus (der die effektive Bit-Länge halbiert). Alle Analysen laufen vollständig in Ihrem Browser — Ihr Passwort wird niemals irgendwohin übertragen."
        },
        "considerations": {
          "title": "Kritische Sicherheitsüberlegungen",
          "items": [
            {
              "text": "Länge schlägt Komplexität: ein 20-Zeichen-Kleinbuchstaben-Passwort (94 Bits) ist stärker als ein 8-Zeichen-gemischtes Passwort (52 Bits). Priorisieren Sie immer die Länge.",
              "type": "info"
            },
            {
              "text": "Häufige Passwörter wie 'Password123!' haben nahezu null echte Entropie, obwohl sie alle Zeichentypen verwenden. Angreifer prüfen zuerst Wörterbuch- und Breach-Listen.",
              "type": "warning"
            },
            {
              "text": "Tastaturmuster (qwerty, zxcv), Sequenzen (abcd, 1234) und Leet-Speak (P@$$w0rd) sind das Erste, was Knack-Tools nach Wörterbüchern probieren.",
              "type": "warning"
            },
            {
              "text": "Passphrasen aus 5+ zufälligen Wörtern bieten 60+ Bits Entropie und sind viel einfacher zu merken als zufällige Zeichenketten.",
              "type": "info"
            },
            {
              "text": "Passwort-Manager generieren wirklich zufällige Passwörter — der einzige Weg, maximale Entropie zu garantieren. Verwenden Sie einen für jedes Konto.",
              "type": "info"
            },
            {
              "text": "Multi-Faktor-Authentifizierung (MFA) schützt Sie selbst bei kompromittierten Passwörtern. Aktivieren Sie sie überall, besonders für E-Mail, Banking und Cloud-Konten.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Entropie-Stärke-Level",
          "items": [
            {
              "text": "0–28 Bits (Sehr Schwach): In Sekunden knackbar. Umfasst häufige Passwörter, kurze PINs, einzelne Wörterbuch-Wörter und triviale Muster.",
              "type": "warning"
            },
            {
              "text": "28–35 Bits (Schwach): Offline in Minuten bis Stunden knackbar. Kurze gemischte Passwörter, einfache Substitutionen wie P@ss, Telefonnummern.",
              "type": "warning"
            },
            {
              "text": "36–59 Bits (Ordentlich): Dauert Tage bis Jahre offline. Mittellange Passwörter mit etwas Komplexität. Nur für niedrigwertige Konten geeignet.",
              "type": "info"
            },
            {
              "text": "60–79 Bits (Stark): Würde Jahrzehnte bis Jahrhunderte dauern. Lange Passwörter oder 4+ Wort-Passphrasen. Gut für die meisten Konten.",
              "type": "info"
            },
            {
              "text": "80–127 Bits (Sehr Stark): Praktisch unknackbar mit aktueller Technologie. Zufällige 16+ Zeichen-Passwörter. Empfohlen für kritische Konten.",
              "type": "info"
            },
            {
              "text": "128+ Bits (Maximum): Übersteigt Verschlüsselungs-Sicherheit. Selbst Quantencomputer bräuchten astronomische Zeit. Übertrieben für die meisten Zwecke.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Passwort-Entropie-Beispiele",
          "description": "Schritt-für-Schritt-Berechnungen zeigen rohe vs. effektive Entropie",
          "examples": [
            {
              "title": "Schwach: password123",
              "steps": [
                "Zeichensatz: Kleinbuchstaben (26) + Ziffern (10) = 36",
                "Länge: 11 Zeichen",
                "Rohe Entropie = 11 × log₂(36) = 11 × 5,17 = 56,8 Bits",
                "⚠️ Muster erkannt: häufiges Passwort-Match → −30 Bits Strafe",
                "⚠️ Muster erkannt: sequenzielle Ziffern (123) → −10 Bits Strafe",
                "Effektive Entropie = 56,8 − 40 = 16,8 Bits → Sehr Schwach"
              ],
              "result": "Trotz 56,8 Bits roher Entropie beträgt die effektive Entropie nur 16,8 Bits, weil 'password123' in jeder Breach-Datenbank steht. Es würde sofort geknackt."
            },
            {
              "title": "Stark: kQ8#mL!2xP$5nR7&wZ",
              "steps": [
                "Zeichensatz: Klein (26) + Groß (26) + Ziffern (10) + Symbole (32) = 94",
                "Länge: 18 Zeichen",
                "Rohe Entropie = 18 × log₂(94) = 18 × 6,55 = 117,9 Bits",
                "✅ Keine Muster erkannt → 0 Strafe",
                "Effektive Entropie = 117,9 Bits → Sehr Stark",
                "GPU-Cluster Knackzeit: 2,1 × 10¹⁵ Jahre"
              ],
              "result": "117,9 Bits ohne Strafen. Dieses wirklich zufällige Passwort ist praktisch unknackbar mit aktueller oder naher Zukunftstechnologie."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Ist es sicher, mein echtes Passwort hier einzugeben?",
          "answer": "Ja. Dieser Rechner läuft 100% in Ihrem Browser mit JavaScript — Ihr Passwort wird niemals an einen Server, API oder Drittanbieter gesendet. Alle Analysen finden lokal auf Ihrem Gerät statt. Sie können dies überprüfen, indem Sie die Internetverbindung trennen und den Rechner offline verwenden. Wir speichern, protokollieren oder übertragen Ihre Eingabe niemals."
        },
        "1": {
          "question": "Was ist der Unterschied zwischen roher und effektiver Entropie?",
          "answer": "Rohe Entropie ist das theoretische Maximum basierend nur auf Passwort-Länge und Zeichensatzgröße (die klassische Formel: Länge × log₂(Zeichensatz)). Effektive Entropie berücksichtigt reale Schwächen: wenn Ihr Passwort häufige Wörter, Tastaturmuster, sequenzielle Zeichen oder Leet-Speak-Substitutionen enthält, müssen Angreifer nicht jede Kombination per Brute-Force probieren. Sie versuchen diese Muster zuerst. Effektive Entropie subtrahiert Strafen für jedes erkannte Muster und gibt einen realistischeren Sicherheits-Score."
        },
        "2": {
          "question": "Wie lang sollte mein Passwort sein?",
          "answer": "Mindestens 14 Zeichen, idealerweise 16 oder mehr. NIST SP 800-63B empfiehlt mindestens 8 Zeichen als Basis, aber moderne Sicherheitsexperten und Organisationen wie CISA empfehlen 16+. Jedes zusätzliche Zeichen multipliziert den Suchraum mit der Zeichensatzgröße — ein Zeichen zu einem gemischten alphanumerischen Passwort hinzuzufügen multipliziert die Brute-Force-Schwierigkeit um 62×. Ein 20-Zeichen-Passwort hat über eine Milliarde Mal mehr Kombinationen als ein 14-Zeichen-Passwort mit demselben Zeichensatz."
        },
        "3": {
          "question": "Sind Passphrasen besser als zufällige Passwörter?",
          "answer": "Für die Merkbarkeit, ja. Eine 5-Wort-Passphrase aus einer 7.776-Wort-Liste (wie EFFs Diceware) hat etwa 64 Bits Entropie — äquivalent zu einem 10-Zeichen zufälligen gemischten Passwort. Eine 7-Wort-Passphrase erreicht 90 Bits. Passphrasen sind viel einfacher zu tippen und zu merken. Jedoch müssen die Wörter wirklich zufällig sein (nicht ein Satz, den Sie natürlich sagen würden). Für maximale Sicherheit ist ein zufälliges 18+ Zeichen-Passwort aus einem Passwort-Manager immer noch der Goldstandard."
        },
        "4": {
          "question": "Was ist das Quantencomputing-Szenario?",
          "answer": "Grovers Algorithmus erlaubt einem Quantencomputer, eine unsortierte Datenbank in √N Operationen statt N zu durchsuchen. Für Passwörter halbiert dies effektiv die Entropie-Bits: ein 128-Bit-Passwort wird gegen einen Quantenangriff äquivalent zu 64 Bits. Aktuelle Quantencomputer sind viel zu klein und fehleranfällig dafür, aber es ist eine nützliche Planungsmetrik. Die Standardempfehlung ist, Passwörter mit 128+ Bits Entropie zu verwenden, um selbst gegen zukünftige Quantenbedrohungen sicher zu bleiben."
        },
        "5": {
          "question": "Warum schneidet 'P@$$w0rd!' trotz aller Zeichentypen schlecht ab?",
          "answer": "Weil echte Angreifer nicht Zeichen für Zeichen per Brute-Force vorgehen — sie verwenden Wörterbücher, Breach-Datenbanken und regelbasierte Angriffe, die häufige Substitutionen zuerst probieren. 'P@$$w0rd!' ist eine Leet-Speak-Variante des weltweit häufigsten Passworts Nr. 1. Passwort-Knacker wie Hashcat und John the Ripper enthalten Regeln, die automatisch a→@, s→$, o→0 und ähnliche Substitutionen probieren. Die Roentropie-Formel nimmt an, dass jedes Zeichen zufällig ist, aber diese Muster machen das Passwort hochgradig vorhersagbar."
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
