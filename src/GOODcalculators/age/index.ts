import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// =============================================================================
// MONTH OPTIONS (values only, labels come from translations)
// =============================================================================
const MONTH_OPTIONS = [
  { value: "1" }, { value: "2" }, { value: "3" }, { value: "4" },
  { value: "5" }, { value: "6" }, { value: "7" }, { value: "8" },
  { value: "9" }, { value: "10" }, { value: "11" }, { value: "12" },
];

// =============================================================================
// CONFIG - ENGLISH ONLY - ALL TEXT IN t SECTION FOR TRANSLATION
// =============================================================================
export const ageCalculatorConfig: CalculatorConfigV4 = {
  id: "age",
  version: "4.4",
  category: "everyday",
  icon: "🎂",

  presets: [
    { id: "genAlpha", icon: "👒", values: { birthYear: 2015, birthMonth: "6", birthDay: 15 } },
    { id: "genZ", icon: "📱", values: { birthYear: 2002, birthMonth: "3", birthDay: 10 } },
    { id: "millennial", icon: "💻", values: { birthYear: 1990, birthMonth: "9", birthDay: 20 } },
    { id: "genX", icon: "📻", values: { birthYear: 1975, birthMonth: "5", birthDay: 12 } },
    { id: "boomer", icon: "📺", values: { birthYear: 1955, birthMonth: "1", birthDay: 5 } },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // TRANSLATIONS - ALL TEXT HERE FOR SCRIPT TO TRANSLATE
  // ═══════════════════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "Age Calculator",
      slug: "age-calculator",
      subtitle: "Calculate your exact age with zodiac signs, life statistics, and planetary ages",
      breadcrumb: "Age",
      seo: {
        title: "Age Calculator - Exact Age, Zodiac, Life Stats & Planetary Ages",
        description: "Calculate your exact age in years, months, days, hours, minutes. Discover zodiac sign, Chinese zodiac, generation, birthstone, birth flower, planetary ages, heartbeats, and life path number. Free comprehensive age calculator.",
        shortDescription: "Calculate exact age with zodiac, life stats, and planetary ages",
        keywords: ["age calculator", "how old am I", "birthday calculator", "zodiac sign calculator", "Chinese zodiac", "planetary age", "life path number", "birthstone", "generation calculator"],
      },
      calculator: { yourInformation: "Your Birth Date" },
      ui: { yourInformation: "Your Birth Date", calculate: "Calculate", reset: "Reset", results: "Results" },
      inputs: {
        birthYear: { label: "Birth Year", helpText: "Enter the year you were born (1900-2026)" },
        birthMonth: {
          label: "Birth Month",
          helpText: "Select your birth month",
          options: {
            "1": "January", "2": "February", "3": "March", "4": "April",
            "5": "May", "6": "June", "7": "July", "8": "August",
            "9": "September", "10": "October", "11": "November", "12": "December",
          },
        },
        birthDay: { label: "Birth Day", helpText: "Enter the day of the month (1-31)" },
      },
      inputGroups: {},
      results: {
        ageYears: { label: "Your Age" },
        totalMonths: { label: "Total Months" },
        totalWeeks: { label: "Total Weeks" },
        totalDays: { label: "Total Days" },
        totalHours: { label: "Total Hours" },
        totalMinutes: { label: "Total Minutes" },
        nextBirthday: { label: "Next Birthday" },
        daysUntilBirthday: { label: "Days Until Birthday" },
        birthDayOfWeek: { label: "Born On" },
      },
      presets: {
        genAlpha: { label: "Gen Alpha", description: "Born ~2015 (9-10 years)" },
        genZ: { label: "Gen Z", description: "Born ~2002 (22-23 years)" },
        millennial: { label: "Millennial", description: "Born ~1990 (34-35 years)" },
        genX: { label: "Gen X", description: "Born ~1975 (49-50 years)" },
        boomer: { label: "Baby Boomer", description: "Born ~1955 (69-70 years)" },
      },
      tooltips: {
        ageYears: "Your complete age broken down into years, months, and days",
        totalMonths: "Total months you have been alive",
        totalDays: "Total days that have passed since your birth",
        totalHours: "Approximate total hours you have lived",
        nextBirthday: "Date of your upcoming birthday celebration",
        daysUntilBirthday: "Countdown to your next birthday",
        birthDayOfWeek: "The day of the week you were born on",
      },
      
      // ═══════════════════════════════════════════════════════════════════════
      // VALUE TRANSLATIONS - All dynamic values that appear in results
      // ═══════════════════════════════════════════════════════════════════════
      values: {
        // Weekdays
        Sunday: "Sunday",
        Monday: "Monday",
        Tuesday: "Tuesday",
        Wednesday: "Wednesday",
        Thursday: "Thursday",
        Friday: "Friday",
        Saturday: "Saturday",
        
        // Zodiac Signs
        Capricorn: "Capricorn",
        Aquarius: "Aquarius",
        Pisces: "Pisces",
        Aries: "Aries",
        Taurus: "Taurus",
        Gemini: "Gemini",
        Cancer: "Cancer",
        Leo: "Leo",
        Virgo: "Virgo",
        Libra: "Libra",
        Scorpio: "Scorpio",
        Sagittarius: "Sagittarius",
        
        // Elements
        Fire: "Fire",
        Earth: "Earth",
        Air: "Air",
        Water: "Water",
        Wood: "Wood",
        Metal: "Metal",
        
        // Chinese Zodiac
        Rat: "Rat",
        Ox: "Ox",
        Tiger: "Tiger",
        Rabbit: "Rabbit",
        Dragon: "Dragon",
        Snake: "Snake",
        Horse: "Horse",
        Goat: "Goat",
        Monkey: "Monkey",
        Rooster: "Rooster",
        Dog: "Dog",
        Pig: "Pig",
        
        // Generations
        "Greatest Generation": "Greatest Generation",
        "Silent Generation": "Silent Generation",
        "Baby Boomers": "Baby Boomers",
        "Generation X": "Generation X",
        "Millennials": "Millennials",
        "Generation Z": "Generation Z",
        "Generation Alpha": "Generation Alpha",
        
        // Birthstones
        Garnet: "Garnet",
        Amethyst: "Amethyst",
        Aquamarine: "Aquamarine",
        Diamond: "Diamond",
        Emerald: "Emerald",
        Pearl: "Pearl",
        Ruby: "Ruby",
        Peridot: "Peridot",
        Sapphire: "Sapphire",
        Opal: "Opal",
        Topaz: "Topaz",
        Turquoise: "Turquoise",
        
        // Birthstone Meanings
        "Protection & Strength": "Protection & Strength",
        "Peace & Wisdom": "Peace & Wisdom",
        "Courage & Serenity": "Courage & Serenity",
        "Eternal Love & Clarity": "Eternal Love & Clarity",
        "Rebirth & Love": "Rebirth & Love",
        "Purity & Innocence": "Purity & Innocence",
        "Passion & Vitality": "Passion & Vitality",
        "Prosperity & Good Fortune": "Prosperity & Good Fortune",
        "Wisdom & Loyalty": "Wisdom & Loyalty",
        "Hope & Creativity": "Hope & Creativity",
        "Friendship & Strength": "Friendship & Strength",
        "Protection & Healing": "Protection & Healing",
        
        // Birth Flowers
        Carnation: "Carnation",
        Violet: "Violet",
        Daffodil: "Daffodil",
        Daisy: "Daisy",
        "Lily of the Valley": "Lily of the Valley",
        Rose: "Rose",
        Larkspur: "Larkspur",
        Gladiolus: "Gladiolus",
        Aster: "Aster",
        Marigold: "Marigold",
        Chrysanthemum: "Chrysanthemum",
        Poinsettia: "Poinsettia",
        
        // Flower Meanings
        "Love & Distinction": "Love & Distinction",
        "Loyalty & Faithfulness": "Loyalty & Faithfulness",
        "New Beginnings": "New Beginnings",
        "Innocence & Purity": "Innocence & Purity",
        "Sweetness & Humility": "Sweetness & Humility",
        "Love & Appreciation": "Love & Appreciation",
        "Positivity & Joy": "Positivity & Joy",
        "Strength & Integrity": "Strength & Integrity",
        "Wisdom & Valor": "Wisdom & Valor",
        "Warmth & Creativity": "Warmth & Creativity",
        "Joy & Optimism": "Joy & Optimism",
        "Success & Celebration": "Success & Celebration",
        
        // Life Path Meanings
        "Leadership & Independence": "Leadership & Independence",
        "Cooperation & Balance": "Cooperation & Balance",
        "Creativity & Expression": "Creativity & Expression",
        "Stability & Hard Work": "Stability & Hard Work",
        "Freedom & Adventure": "Freedom & Adventure",
        "Responsibility & Nurturing": "Responsibility & Nurturing",
        "Wisdom & Spirituality": "Wisdom & Spirituality",
        "Abundance & Power": "Abundance & Power",
        "Humanitarianism & Compassion": "Humanitarianism & Compassion",
        "Intuition & Inspiration (Master)": "Intuition & Inspiration (Master)",
        "Master Builder (Master)": "Master Builder (Master)",
        "Master Teacher (Master)": "Master Teacher (Master)",
        "Universal Love": "Universal Love",
        
        // Milestone Status
        "Yes": "Yes",
        "years away": "years away",
        "Reached!": "Reached!",
        
        // Units
        years: "years",
        months: "months",
        weeks: "weeks",
        days: "days",
        hours: "hours",
        minutes: "minutes",
        beats: "beats",
        breaths: "breaths",
        blinks: "blinks",
        "Mercury years": "Mercury years",
        "Venus years": "Venus years",
        "Mars years": "Mars years",
        "Jupiter years": "Jupiter years",
        "Saturn years": "Saturn years",
      },

      // ═══════════════════════════════════════════════════════════════════════
      // FORMAT TEMPLATES - For formatted output strings
      // ═══════════════════════════════════════════════════════════════════════
      formats: {
        ageYears: "{years} years, {months} months, {days} days",
        totalMonths: "{value} months",
        totalWeeks: "{value} weeks",
        totalDays: "{value} days",
        totalHours: "{value} hours",
        totalMinutes: "{value} minutes",
        daysUntilBirthday: "{value} days",
        heartbeats: "{value} beats",
        breaths: "{value} breaths",
        sleepYears: "~{value} years",
        blinks: "{value} blinks",
        planetaryAge: "{value} {planet} years",
        summary: "You are {years} years, {months} months, and {days} days old. Born on a {weekday}, you are a {zodiac} ({element}) and a {chineseZodiac} in Chinese zodiac. Your Life Path Number is {lifePathNumber} ({lifePathMeaning}). Your heart has beaten approximately {heartbeats} times! Next birthday in {daysUntilBirthday} days.",
      },

      // INFO CARDS
      infoCards: {
        zodiacInfo: {
          title: "⭐ Zodiac & Astrology",
          items: [
            "Western Zodiac Sign",
            "Zodiac Element",
            "Chinese Zodiac Animal",
            "Chinese Element",
            "Your Generation",
          ],
        },
        birthSymbols: {
          title: "💎 Birth Symbols",
          items: [
            "Birthstone",
            "Stone Meaning",
            "Birth Flower",
            "Flower Meaning",
          ],
        },
        lifeStats: {
          title: "❤️ Life Statistics",
          items: [
            "Total Heartbeats",
            "Total Breaths Taken",
            "Years Spent Sleeping",
            "Times You've Blinked",
          ],
        },
        milestones: {
          title: "🎯 Age Milestones",
          items: [
            "Can Drive (16 years)",
            "Can Vote (18 years)",
            "Can Drink in US (21 years)",
            "Retirement (65 years)",
          ],
        },
        planetaryAges: {
          title: "🪐 Your Age on Other Planets",
          items: [
            "Age on Mercury",
            "Age on Venus",
            "Age on Mars",
            "Age on Jupiter",
            "Age on Saturn",
          ],
        },
        numerology: {
          title: "🔢 Numerology",
          items: [
            "Life Path Number",
            "Life Path Meaning",
          ],
        },
        funFacts: {
          title: "💡 Fun Facts About Your Age",
          items: [
            "Your heart has beaten billions of times since birth",
            "You've taken millions of breaths throughout your life",
            "You've spent about a third of your life sleeping",
            "Your age on other planets varies based on their orbital periods",
          ],
        },
      },
      
      // REFERENCE DATA
      referenceData: {
        lifeMilestones: {
          title: "Life Milestones by Age",
          items: {
            driving: { label: "Driving Age (US)", value: "16 years" },
            voting: { label: "Voting Age", value: "18 years" },
            drinking: { label: "Drinking Age (US)", value: "21 years" },
            brain: { label: "Brain Fully Developed", value: "25 years" },
            midlife: { label: "Midlife", value: "40-60 years" },
            retirement: { label: "Retirement Age", value: "65-67 years" },
            lifeExpectancy: { label: "Life Expectancy (US)", value: "77-79 years" },
            supercentenarian: { label: "Supercentenarian", value: "110+ years" },
          },
        },
      },
      
      // EDUCATION
      education: {
        zodiacSigns: {
          title: "The Four Elements of Zodiac",
          cards: [
            { title: "Fire Signs", description: "Aries, Leo, Sagittarius - Passionate, dynamic, temperamental, and competitive", icon: "🔥" },
            { title: "Earth Signs", description: "Taurus, Virgo, Capricorn - Grounded, practical, reliable, and materialistic", icon: "🌍" },
            { title: "Air Signs", description: "Gemini, Libra, Aquarius - Intellectual, social, communicative, and analytical", icon: "💨" },
            { title: "Water Signs", description: "Cancer, Scorpio, Pisces - Emotional, intuitive, sensitive, and mysterious", icon: "💧" },
          ],
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "Leap year birthdays (February 29) are calculated correctly - you still age normally!", type: "info" },
            { text: "Life statistics like heartbeats are estimates based on population averages", type: "warning" },
            { text: "Chinese zodiac traditionally uses lunar calendar - this uses simplified year-based calculation", type: "info" },
            { text: "Zodiac sign dates can vary by 1-2 days depending on the year", type: "info" },
            { text: "Planetary ages are calculated using orbital periods around the Sun", type: "info" },
            { text: "Life Path Number is calculated by reducing your birth date to a single digit", type: "info" },
          ],
        },
        exampleCalculation: {
          title: "Example Age Calculation",
          description: "Step-by-step breakdown of age calculation",
          examples: [
            {
              title: "Basic Age Calculation",
              steps: ["Birth Date: January 15, 1990", "Current Date: February 1, 2026", "Years: 36", "Months since birthday: 0", "Days: 17"],
              result: "Age: 36 years, 0 months, 17 days",
            },
            {
              title: "Life Path Number Calculation",
              steps: ["Birth: January 15, 1990", "Add all digits: 0+1+1+5+1+9+9+0 = 26", "Reduce: 2+6 = 8"],
              result: "Life Path Number: 8",
            },
          ],
        },
        whatIsAge: {
          title: "What is an Age Calculator?",
          content: "An age calculator is a comprehensive tool that computes not just your chronological age, but also reveals fascinating insights about your life. It calculates your exact age down to the second, determines your zodiac signs (both Western and Chinese), identifies your birthstone and birth flower, estimates life statistics like heartbeats and breaths, calculates your age on other planets, and even determines your numerology life path number. Our calculator goes far beyond simple age calculation to give you a complete picture of your life's journey.",
        },
        howItWorks: {
          title: "How the Calculations Work",
          content: "The age calculation uses the Gregorian calendar system with precise day counting. For planetary ages, we divide your Earth age by the planet's orbital period. Life statistics use medical averages: hearts beat ~100,000 times per day, we breathe ~20,000 times per day, and blink ~15,000 times per day. The Life Path Number is calculated using numerology principles by summing all digits in your birth date and reducing to a single digit (except master numbers 11, 22, 33).",
        },
        generationsExplained: {
          title: "Understanding Generations",
          content: "Generations are defined by birth year: Greatest Generation (1901-1927) lived through WWI and the Depression. Silent Generation (1928-1945) grew up during WWII. Baby Boomers (1946-1964) experienced post-war prosperity. Generation X (1965-1980) saw the rise of personal computers. Millennials (1981-1996) came of age with the internet. Generation Z (1997-2012) are digital natives. Generation Alpha (2013+) is growing up with AI and virtual reality.",
        },
        chineseZodiacExplained: {
          title: "The Chinese Zodiac",
          content: "The Chinese zodiac is a 12-year cycle where each year is associated with an animal and one of five elements (Wood, Fire, Earth, Metal, Water). The animals are: Rat (clever), Ox (diligent), Tiger (brave), Rabbit (gentle), Dragon (confident), Snake (wise), Horse (energetic), Goat (calm), Monkey (witty), Rooster (observant), Dog (loyal), and Pig (compassionate). Your Chinese zodiac combines your animal sign with your element for a 60-year cycle.",
        },
      },
      
      // FAQs
      faqs: [
        { question: "How does the calculator handle leap year birthdays?", answer: "If you were born on February 29, the calculator correctly counts your age in days. You still age normally - one year passes each year regardless of leap years. For celebrating birthdays in non-leap years, most people choose February 28 or March 1." },
        { question: "How accurate are the life statistics?", answer: "The statistics use medical averages: ~100,000 heartbeats/day (varies by age/health), ~20,000 breaths/day (12-20 per minute), ~15,000 blinks/day, and about 1/3 of life spent sleeping. Your actual numbers depend on individual factors like health, activity level, and lifestyle." },
        { question: "What is a Life Path Number?", answer: "In numerology, your Life Path Number reveals your life's purpose and key traits. It's calculated by adding all digits in your birth date until you get a single digit (1-9) or a master number (11, 22, 33). Each number has unique characteristics: 1 is leadership, 2 is cooperation, 3 is creativity, etc." },
        { question: "How are planetary ages calculated?", answer: "Your age on other planets is your Earth age in days divided by the planet's orbital period in days. Mercury orbits in 88 days (so you're much older there), while Neptune takes 165 Earth years (so you'd be much younger). It demonstrates how age is relative to our measurement system." },
        { question: "What determines my Chinese zodiac animal?", answer: "Your Chinese zodiac is primarily determined by your birth year in a 12-year cycle. However, because Chinese New Year falls between January 21 and February 20, people born in January or early February might actually have the previous year's animal sign." },
        { question: "Why is knowing my generation important?", answer: "Generations share formative experiences that shape values, communication styles, and worldviews. Understanding your generation helps explain cultural references, workplace dynamics, and shared historical context with peers born in similar time periods." },
        { question: "What's the significance of birthstones and birth flowers?", answer: "Birthstones and birth flowers are ancient traditions assigning gems and flowers to each month. Birthstones were believed to bring luck and protection when worn during your birth month. Birth flowers represent personality traits associated with people born in that month. These traditions date back thousands of years." },
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
        shareCalculator: "Share this calculator:",
        includesValues: "includes your values",
        creating: "Creating...",
        thankYou: "Thanks for your rating!",
      },
      common: { home: "Home", calculators: "Calculators" },
    
      buttons: {
          'shareResults': 'Share Results',
          'copied': 'Copied!',
          'saveResults': 'Save Results',
          'hideDetails': 'Hide details',
          'showDetails': 'Show details',
          'calculate': 'Calculate',
          'reset': 'Reset',
          'compareScenarios': 'Compare Scenarios',
          'pdf': 'PDF',
          'csv': 'CSV',
          'save': 'Save',
          'saved': 'Saved',
          'saving': 'Saving...'
        },
      share: {
          'calculatedWith': 'Calculated with Kalcufy.com'
        },
      ui: {
          'results': 'Results',
          'yourInformation': 'Your Information',
          'loading': 'Loading...',
          'error': 'Error',
          'tryAgain': 'Try again',
          'sensitivityAnalysis': 'Sensitivity Analysis',
          'quickTips': 'Quick Tips',
          'references': 'References'
        },
      accessibility: {
          'mobileResults': 'Results summary',
          'closeModal': 'Close',
          'openMenu': 'Open menu'
        },
    },
    es: {
        'name': 'Calculadora de Edad',
        'slug': 'calculadora-age',
        'subtitle': 'Calcula tu edad exacta con signos zodiacales, estadísticas de vida y edades planetarias',
        'breadcrumb': 'Edad',
        'seo': {
          'title': 'Calculadora de Edad - Edad Exacta, Zodiaco, Estadísticas de Vida y Edades Planetarias',
          'description': 'Calcula tu edad exacta en años, meses, días, horas, minutos. Descubre tu signo zodiacal, zodiaco chino, generación, piedra natal, flor de nacimiento, edades planetarias, latidos del corazón y número del camino de vida. Calculadora de edad integral gratuita.',
          'shortDescription': 'Calcula tu edad exacta con zodiaco, estadísticas de vida y edades planetarias',
          'keywords': [
            'calculadora de edad',
            'cuántos años tengo',
            'calculadora de cumpleaños',
            'calculadora de signo zodiacal',
            'zodiaco chino',
            'edad planetaria',
            'número del camino de vida',
            'piedra natal',
            'calculadora de generación'
          ]
        },
        'calculator': {
          'yourInformation': 'Tu Fecha de Nacimiento'
        },
        'inputs': {
          'birthYear': {
            'label': 'Año de Nacimiento',
            'helpText': 'Ingresa el año en que naciste (1900-2026)'
          },
          'birthMonth': {
            'label': 'Mes de Nacimiento',
            'helpText': 'Selecciona tu mes de nacimiento',
            'options': {
              '1': 'Enero',
              '2': 'Febrero',
              '3': 'Marzo',
              '4': 'Abril',
              '5': 'Mayo',
              '6': 'Junio',
              '7': 'Julio',
              '8': 'Agosto',
              '9': 'Septiembre',
              '10': 'Octubre',
              '11': 'Noviembre',
              '12': 'Diciembre'
            }
          },
          'birthDay': {
            'label': 'Día de Nacimiento',
            'helpText': 'Ingresa el día del mes (1-31)'
          }
        },
        'inputGroups': {},
        'results': {
          'ageYears': {
            'label': 'Tu Edad'
          },
          'totalMonths': {
            'label': 'Total de Meses'
          },
          'totalWeeks': {
            'label': 'Total de Semanas'
          },
          'totalDays': {
            'label': 'Total de Días'
          },
          'totalHours': {
            'label': 'Total de Horas'
          },
          'totalMinutes': {
            'label': 'Total de Minutos'
          },
          'nextBirthday': {
            'label': 'Próximo Cumpleaños'
          },
          'daysUntilBirthday': {
            'label': 'Días Hasta tu Cumpleaños'
          },
          'birthDayOfWeek': {
            'label': 'Naciste en'
          }
        },
        'presets': {
          'genAlpha': {
            'label': 'Generación Alpha',
            'description': 'Nacidos ~2015 (9-10 años)'
          },
          'genZ': {
            'label': 'Generación Z',
            'description': 'Nacidos ~2002 (22-23 años)'
          },
          'millennial': {
            'label': 'Millennial',
            'description': 'Nacidos ~1990 (34-35 años)'
          },
          'genX': {
            'label': 'Generación X',
            'description': 'Nacidos ~1975 (49-50 años)'
          },
          'boomer': {
            'label': 'Baby Boomer',
            'description': 'Nacidos ~1955 (69-70 años)'
          }
        },
        'tooltips': {
          'ageYears': 'Tu edad completa desglosada en años, meses y días',
          'totalMonths': 'Total de meses que has estado vivo',
          'totalDays': 'Total de días que han pasado desde tu nacimiento',
          'totalHours': 'Total aproximado de horas que has vivido',
          'nextBirthday': 'Fecha de tu próxima celebración de cumpleaños',
          'daysUntilBirthday': 'Cuenta regresiva hasta tu próximo cumpleaños',
          'birthDayOfWeek': 'El día de la semana en que naciste'
        },
        'values': {
          'Sunday': 'Domingo',
          'Monday': 'Lunes',
          'Tuesday': 'Martes',
          'Wednesday': 'Miércoles',
          'Thursday': 'Jueves',
          'Friday': 'Viernes',
          'Saturday': 'Sábado',
          'Capricorn': 'Capricornio',
          'Aquarius': 'Acuario',
          'Pisces': 'Piscis',
          'Aries': 'Aries',
          'Taurus': 'Tauro',
          'Gemini': 'Géminis',
          'Cancer': 'Cáncer',
          'Leo': 'Leo',
          'Virgo': 'Virgo',
          'Libra': 'Libra',
          'Scorpio': 'Escorpio',
          'Sagittarius': 'Sagitario',
          'Fire': 'Fuego',
          'Earth': 'Tierra',
          'Air': 'Aire',
          'Water': 'Agua',
          'Wood': 'Madera',
          'Metal': 'Metal',
          'Rat': 'Rata',
          'Ox': 'Buey',
          'Tiger': 'Tigre',
          'Rabbit': 'Conejo',
          'Dragon': 'Dragón',
          'Snake': 'Serpiente',
          'Horse': 'Caballo',
          'Goat': 'Cabra',
          'Monkey': 'Mono',
          'Rooster': 'Gallo',
          'Dog': 'Perro',
          'Pig': 'Cerdo',
          'Greatest Generation': 'Generación Grandiosa',
          'Silent Generation': 'Generación Silenciosa',
          'Baby Boomers': 'Baby Boomers',
          'Generation X': 'Generación X',
          'Millennials': 'Millennials',
          'Generation Z': 'Generación Z',
          'Generation Alpha': 'Generación Alpha',
          'Garnet': 'Granate',
          'Amethyst': 'Amatista',
          'Aquamarine': 'Aguamarina',
          'Diamond': 'Diamante',
          'Emerald': 'Esmeralda',
          'Pearl': 'Perla',
          'Ruby': 'Rubí',
          'Peridot': 'Peridoto',
          'Sapphire': 'Zafiro',
          'Opal': 'Ópalo',
          'Topaz': 'Topacio',
          'Turquoise': 'Turquesa',
          'Protection & Strength': 'Protección y Fuerza',
          'Peace & Wisdom': 'Paz y Sabiduría',
          'Courage & Serenity': 'Valor y Serenidad',
          'Eternal Love & Clarity': 'Amor Eterno y Claridad',
          'Rebirth & Love': 'Renacimiento y Amor',
          'Purity & Innocence': 'Pureza e Inocencia',
          'Passion & Vitality': 'Pasión y Vitalidad',
          'Prosperity & Good Fortune': 'Prosperidad y Buena Fortuna',
          'Wisdom & Loyalty': 'Sabiduría y Lealtad',
          'Hope & Creativity': 'Esperanza y Creatividad',
          'Friendship & Strength': 'Amistad y Fuerza',
          'Protection & Healing': 'Protección y Curación',
          'Carnation': 'Clavel',
          'Violet': 'Violeta',
          'Daffodil': 'Narciso',
          'Daisy': 'Margarita',
          'Lily of the Valley': 'Lirio del Valle',
          'Rose': 'Rosa',
          'Larkspur': 'Espuela de Caballero',
          'Gladiolus': 'Gladiolo',
          'Aster': 'Áster',
          'Marigold': 'Caléndula',
          'Chrysanthemum': 'Crisantemo',
          'Poinsettia': 'Flor de Pascua',
          'Love & Distinction': 'Amor y Distinción',
          'Loyalty & Faithfulness': 'Lealtad y Fidelidad',
          'New Beginnings': 'Nuevos Comienzos',
          'Innocence & Purity': 'Inocencia y Pureza',
          'Sweetness & Humility': 'Dulzura y Humildad',
          'Love & Appreciation': 'Amor y Aprecio',
          'Positivity & Joy': 'Positividad y Alegría',
          'Strength & Integrity': 'Fuerza e Integridad',
          'Wisdom & Valor': 'Sabiduría y Valor',
          'Warmth & Creativity': 'Calidez y Creatividad',
          'Joy & Optimism': 'Alegría y Optimismo',
          'Success & Celebration': 'Éxito y Celebración',
          'Leadership & Independence': 'Liderazgo e Independencia',
          'Cooperation & Balance': 'Cooperación y Equilibrio',
          'Creativity & Expression': 'Creatividad y Expresión',
          'Stability & Hard Work': 'Estabilidad y Trabajo Duro',
          'Freedom & Adventure': 'Libertad y Aventura',
          'Responsibility & Nurturing': 'Responsabilidad y Cuidado',
          'Wisdom & Spirituality': 'Sabiduría y Espiritualidad',
          'Abundance & Power': 'Abundancia y Poder',
          'Humanitarianism & Compassion': 'Humanitarismo y Compasión',
          'Intuition & Inspiration (Master)': 'Intuición e Inspiración (Maestro)',
          'Master Builder (Master)': 'Constructor Maestro (Maestro)',
          'Master Teacher (Master)': 'Maestro Instructor (Maestro)',
          'Universal Love': 'Amor Universal',
          'Yes': 'Sí',
          'years away': 'años de distancia',
          'Reached!': '¡Alcanzado!',
          'years': 'años',
          'months': 'meses',
          'weeks': 'semanas',
          'days': 'días',
          'hours': 'horas',
          'minutes': 'minutos',
          'beats': 'latidos',
          'breaths': 'respiraciones',
          'blinks': 'parpadeos',
          'Mercury years': 'años de Mercurio',
          'Venus years': 'años de Venus',
          'Mars years': 'años de Marte',
          'Jupiter years': 'años de Júpiter',
          'Saturn years': 'años de Saturno'
        },
        'formats': {
          'ageYears': '{years} años, {months} meses, {days} días',
          'totalMonths': '{value} meses',
          'totalWeeks': '{value} semanas',
          'totalDays': '{value} días',
          'totalHours': '{value} horas',
          'totalMinutes': '{value} minutos',
          'daysUntilBirthday': '{value} días',
          'heartbeats': '{value} latidos',
          'breaths': '{value} respiraciones',
          'sleepYears': '~{value} años',
          'blinks': '{value} parpadeos',
          'planetaryAge': '{value} {planet} años',
          'summary': 'Tienes {years} años, {months} meses y {days} días. Naciste en un {weekday}, eres {zodiac} ({element}) y {chineseZodiac} en el zodiaco chino. Tu Número del Camino de Vida es {lifePathNumber} ({lifePathMeaning}). ¡Tu corazón ha latido aproximadamente {heartbeats} veces! Próximo cumpleaños en {daysUntilBirthday} días.'
        },
        'infoCards': {
          'zodiacInfo': {
            'title': '⭐ Zodiaco y Astrología',
            'items': [
              'Signo Zodiacal Occidental',
              'Elemento Zodiacal',
              'Animal del Zodiaco Chino',
              'Elemento Chino',
              'Tu Generación'
            ]
          },
          'birthSymbols': {
            'title': '💎 Símbolos de Nacimiento',
            'items': [
              'Piedra Natal',
              'Significado de la Piedra',
              'Flor de Nacimiento',
              'Significado de la Flor'
            ]
          },
          'lifeStats': {
            'title': '❤️ Estadísticas de Vida',
            'items': [
              'Total de Latidos del Corazón',
              'Total de Respiraciones',
              'Años Durmiendo',
              'Veces que has Parpadeado'
            ]
          },
          'milestones': {
            'title': '🎯 Hitos de Edad',
            'items': [
              'Puede Conducir (16 años)',
              'Puede Votar (18 años)',
              'Puede Beber en EE.UU. (21 años)',
              'Jubilación (65 años)'
            ]
          },
          'planetaryAges': {
            'title': '🪐 Tu Edad en Otros Planetas',
            'items': [
              'Edad en Mercurio',
              'Edad en Venus',
              'Edad en Marte',
              'Edad en Júpiter',
              'Edad en Saturno'
            ]
          },
          'numerology': {
            'title': '🔢 Numerología',
            'items': [
              'Número del Camino de Vida',
              'Significado del Camino de Vida'
            ]
          },
          'funFacts': {
            'title': '💡 Datos Curiosos Sobre tu Edad',
            'items': [
              'Tu corazón ha latido miles de millones de veces desde tu nacimiento',
              'Has tomado millones de respiraciones a lo largo de tu vida',
              'Has pasado aproximadamente un tercio de tu vida durmiendo',
              'Tu edad en otros planetas varía según sus períodos orbitales'
            ]
          }
        },
        'referenceData': {
          'lifeMilestones': {
            'title': 'Hitos de Vida por Edad',
            'items': {
              'driving': {
                'label': 'Edad para Conducir (EE.UU.)',
                'value': '16 años'
              },
              'voting': {
                'label': 'Edad para Votar',
                'value': '18 años'
              },
              'drinking': {
                'label': 'Edad para Beber (EE.UU.)',
                'value': '21 años'
              },
              'brain': {
                'label': 'Cerebro Completamente Desarrollado',
                'value': '25 años'
              },
              'midlife': {
                'label': 'Mediana Edad',
                'value': '40-60 años'
              },
              'retirement': {
                'label': 'Edad de Jubilación',
                'value': '65-67 años'
              },
              'lifeExpectancy': {
                'label': 'Esperanza de Vida (EE.UU.)',
                'value': '77-79 años'
              },
              'supercentenarian': {
                'label': 'Supercentenario',
                'value': '110+ años'
              }
            }
          }
        },
        'education': {
          'zodiacSigns': {
            'title': 'Los Cuatro Elementos del Zodiaco',
            'cards': [
              {
                'title': 'Signos de Fuego',
                'description': 'Aries, Leo, Sagitario - Apasionados, dinámicos, temperamentales y competitivos',
                'icon': '🔥'
              },
              {
                'title': 'Signos de Tierra',
                'description': 'Tauro, Virgo, Capricornio - Con los pies en la tierra, prácticos, confiables y materialistas',
                'icon': '🌍'
              },
              {
                'title': 'Signos de Aire',
                'description': 'Géminis, Libra, Acuario - Intelectuales, sociales, comunicativos y analíticos',
                'icon': '💨'
              },
              {
                'title': 'Signos de Agua',
                'description': 'Cáncer, Escorpio, Piscis - Emocionales, intuitivos, sensibles y misteriosos',
                'icon': '💧'
              }
            ]
          },
          'considerations': {
            'title': 'Consideraciones Importantes',
            'items': [
              {
                'text': 'Los cumpleaños de año bisiesto (29 de febrero) se calculan correctamente: ¡aún envejeces normalmente!',
                'type': 'info'
              },
              {
                'text': 'Las estadísticas de vida como los latidos del corazón son estimaciones basadas en promedios poblacionales',
                'type': 'warning'
              },
              {
                'text': 'El zodiaco chino tradicionalmente usa el calendario lunar - este usa un cálculo simplificado basado en años',
                'type': 'info'
              },
              {
                'text': 'Las fechas de los signos zodiacales pueden variar 1-2 días dependiendo del año',
                'type': 'info'
              },
              {
                'text': 'Las edades planetarias se calculan usando períodos orbitales alrededor del Sol',
                'type': 'info'
              },
              {
                'text': 'El Número del Camino de Vida se calcula reduciendo tu fecha de nacimiento a un solo dígito',
                'type': 'info'
              }
            ]
          },
          'exampleCalculation': {
            'title': 'Ejemplo de Cálculo de Edad',
            'description': 'Desglose paso a paso del cálculo de edad',
            'examples': [
              {
                'title': 'Cálculo Básico de Edad',
                'steps': [
                  'Fecha de Nacimiento: 15 de enero, 1990',
                  'Fecha Actual: 1 de febrero, 2026',
                  'Años: 36',
                  'Meses desde cumpleaños: 0',
                  'Días: 17'
                ],
                'result': 'Edad: 36 años, 0 meses, 17 días'
              },
              {
                'title': 'Cálculo del Número del Camino de Vida',
                'steps': [
                  'Nacimiento: 15 de enero, 1990',
                  'Sumar todos los dígitos: 0+1+1+5+1+9+9+0 = 26',
                  'Reducir: 2+6 = 8'
                ],
                'result': 'Número del Camino de Vida: 8'
              }
            ]
          },
          'whatIsAge': {
            'title': '¿Qué es una Calculadora de Edad?',
            'content': 'Una calculadora de edad es una herramienta integral que calcula no solo tu edad cronológica, sino que también revela ideas fascinantes sobre tu vida. Calcula tu edad exacta hasta el segundo, determina tus signos zodiacales (tanto occidental como chino), identifica tu piedra natal y flor de nacimiento, estima estadísticas de vida como latidos del corazón y respiraciones, calcula tu edad en otros planetas, e incluso determina tu número del camino de vida numerológico. Nuestra calculadora va mucho más allá del simple cálculo de edad para darte una imagen completa del viaje de tu vida.'
          },
          'howItWorks': {
            'title': 'Cómo Funcionan los Cálculos',
            'content': 'El cálculo de edad usa el sistema de calendario gregoriano con conteo preciso de días. Para las edades planetarias, dividimos tu edad terrestre por el período orbital del planeta. Las estadísticas de vida usan promedios médicos: los corazones laten ~100,000 veces por día, respiramos ~20,000 veces por día, y parpadeamos ~15,000 veces por día. El Número del Camino de Vida se calcula usando principios numerológicos sumando todos los dígitos en tu fecha de nacimiento y reduciendo a un solo dígito (excepto los números maestros 11, 22, 33).'
          },
          'generationsExplained': {
            'title': 'Entendiendo las Generaciones',
            'content': 'Las generaciones se definen por año de nacimiento: Generación Grandiosa (1901-1927) vivió la Primera Guerra Mundial y la Depresión. Generación Silenciosa (1928-1945) creció durante la Segunda Guerra Mundial. Baby Boomers (1946-1964) experimentaron la prosperidad de posguerra. Generación X (1965-1980) vio el surgimiento de las computadoras personales. Millennials (1981-1996) llegaron a la mayoría de edad con internet. Generación Z (1997-2012) son nativos digitales. Generación Alpha (2013+) está creciendo con IA y realidad virtual.'
          },
          'chineseZodiacExplained': {
            'title': 'El Zodiaco Chino',
            'content': 'El zodiaco chino es un ciclo de 12 años donde cada año está asociado con un animal y uno de cinco elementos (Madera, Fuego, Tierra, Metal, Agua). Los animales son: Rata (astuta), Buey (diligente), Tigre (valiente), Conejo (gentil), Dragón (confiado), Serpiente (sabia), Caballo (energético), Cabra (calmada), Mono (ingenioso), Gallo (observador), Perro (leal), y Cerdo (compasivo). Tu zodiaco chino combina tu signo animal con tu elemento para un ciclo de 60 años.'
          }
        },
        'faqs': [
          {
            'question': '¿Cómo maneja la calculadora los cumpleaños de año bisiesto?',
            'answer': 'Si naciste el 29 de febrero, la calculadora cuenta correctamente tu edad en días. Aún envejeces normalmente: un año pasa cada año independientemente de los años bisiestos. Para celebrar cumpleaños en años no bisiestos, la mayoría de las personas eligen el 28 de febrero o el 1 de marzo.'
          },
          {
            'question': '¿Qué tan precisas son las estadísticas de vida?',
            'answer': 'Las estadísticas usan promedios médicos: ~100,000 latidos/día (varía por edad/salud), ~20,000 respiraciones/día (12-20 por minuto), ~15,000 parpadeos/día, y aproximadamente 1/3 de la vida durmiendo. Tus números reales dependen de factores individuales como salud, nivel de actividad y estilo de vida.'
          },
          {
            'question': '¿Qué es un Número del Camino de Vida?',
            'answer': 'En numerología, tu Número del Camino de Vida revela el propósito y características clave de tu vida. Se calcula sumando todos los dígitos en tu fecha de nacimiento hasta obtener un solo dígito (1-9) o un número maestro (11, 22, 33). Cada número tiene características únicas: 1 es liderazgo, 2 es cooperación, 3 es creatividad, etc.'
          },
          {
            'question': '¿Cómo se calculan las edades planetarias?',
            'answer': 'Tu edad en otros planetas es tu edad terrestre en días dividida por el período orbital del planeta en días. Mercurio orbita en 88 días (así que eres mucho mayor allí), mientras que Neptuno toma 165 años terrestres (así que serías mucho más joven). Demuestra cómo la edad es relativa a nuestro sistema de medición.'
          },
          {
            'question': '¿Qué determina mi animal del zodiaco chino?',
            'answer': 'Tu zodiaco chino está determinado principalmente por tu año de nacimiento en un ciclo de 12 años. Sin embargo, porque el Año Nuevo Chino cae entre el 21 de enero y el 20 de febrero, las personas nacidas en enero o principios de febrero podrían realmente tener el signo animal del año anterior.'
          },
          {
            'question': '¿Por qué es importante conocer mi generación?',
            'answer': 'Las generaciones comparten experiencias formativas que moldean valores, estilos de comunicación y visiones del mundo. Entender tu generación ayuda a explicar referencias culturales, dinámicas laborales y contexto histórico compartido con pares nacidos en períodos similares.'
          },
          {
            'question': '¿Cuál es la importancia de las piedras natales y flores de nacimiento?',
            'answer': 'Las piedras natales y flores de nacimiento son tradiciones antiguas que asignan gemas y flores a cada mes. Se creía que las piedras natales traían suerte y protección cuando se usaban durante tu mes de nacimiento. Las flores de nacimiento representan rasgos de personalidad asociados con personas nacidas en ese mes. Estas tradiciones datan de miles de años.'
          }
        ],
        'rating': {
          'title': 'Califica esta Calculadora',
          'share': 'Compartir',
          'copied': '¡Copiado!',
          'copyLink': 'Copiar Enlace',
          'clickToRate': 'Haz clic para calificar',
          'youRated': 'Calificaste',
          'stars': 'estrellas',
          'averageFrom': 'promedio de',
          'ratings': 'calificaciones',
          'shareCalculator': 'Comparte esta calculadora:',
          'includesValues': 'incluye tus valores',
          'creating': 'Creando...',
          'thankYou': '¡Gracias por tu calificación!'
        },
        'common': {
          'home': 'Inicio',
          'calculators': 'Calculadoras'
        },
        'buttons': {
          'shareResults': 'Compartir Resultados',
          'copied': '¡Copiado!',
          'saveResults': 'Guardar Resultados',
          'hideDetails': 'Ocultar detalles',
          'showDetails': 'Ver detalles',
          'calculate': 'Calcular',
          'reset': 'Reiniciar',
          'compareScenarios': 'Comparar Escenarios',
          'pdf': 'PDF',
          'csv': 'CSV',
          'save': 'Guardar',
          'saved': 'Guardado',
          'saving': 'Guardando...'
        },
        'share': {
          'calculatedWith': 'Calculado con Kalcufy.com'
        },
        'ui': {
          'results': 'Resultados',
          'yourInformation': 'Tu Información',
          'loading': 'Cargando...',
          'error': 'Error',
          'tryAgain': 'Intentar de nuevo',
          'sensitivityAnalysis': 'Análisis de Sensibilidad',
          'quickTips': 'Consejos Rápidos',
          'references': 'Referencias'
        },
        'accessibility': {
          'mobileResults': 'Resumen de resultados',
          'closeModal': 'Cerrar',
          'openMenu': 'Abrir menú'
        }
      },
    pt: {
        'name': 'Calculadora de Idade',
        'slug': 'calculadora-age',
        'subtitle': 'Calcule sua idade exata com signos do zodíaco, estatísticas de vida e idades planetárias',
        'breadcrumb': 'Idade',
        'seo': {
          'title': 'Calculadora de Idade - Idade Exata, Zodíaco, Estatísticas de Vida e Idades Planetárias',
          'description': 'Calcule sua idade exata em anos, meses, dias, horas, minutos. Descubra signo do zodíaco, zodíaco chinês, geração, pedra do nascimento, flor do nascimento, idades planetárias, batimentos cardíacos e número do caminho da vida. Calculadora de idade gratuita e abrangente.',
          'shortDescription': 'Calcule idade exata com zodíaco, estatísticas de vida e idades planetárias',
          'keywords': [
            'calculadora de idade',
            'quantos anos eu tenho',
            'calculadora de aniversário',
            'calculadora de signo',
            'zodíaco chinês',
            'idade planetária',
            'número do caminho da vida',
            'pedra do nascimento',
            'calculadora de geração'
          ]
        },
        'calculator': {
          'yourInformation': 'Sua Data de Nascimento'
        },
        'inputs': {
          'birthYear': {
            'label': 'Ano de Nascimento',
            'helpText': 'Digite o ano em que você nasceu (1900-2026)'
          },
          'birthMonth': {
            'label': 'Mês de Nascimento',
            'helpText': 'Selecione seu mês de nascimento',
            'options': {
              '1': 'Janeiro',
              '2': 'Fevereiro',
              '3': 'Março',
              '4': 'Abril',
              '5': 'Maio',
              '6': 'Junho',
              '7': 'Julho',
              '8': 'Agosto',
              '9': 'Setembro',
              '10': 'Outubro',
              '11': 'Novembro',
              '12': 'Dezembro'
            }
          },
          'birthDay': {
            'label': 'Dia de Nascimento',
            'helpText': 'Digite o dia do mês (1-31)'
          }
        },
        'inputGroups': {},
        'results': {
          'ageYears': {
            'label': 'Sua Idade'
          },
          'totalMonths': {
            'label': 'Total de Meses'
          },
          'totalWeeks': {
            'label': 'Total de Semanas'
          },
          'totalDays': {
            'label': 'Total de Dias'
          },
          'totalHours': {
            'label': 'Total de Horas'
          },
          'totalMinutes': {
            'label': 'Total de Minutos'
          },
          'nextBirthday': {
            'label': 'Próximo Aniversário'
          },
          'daysUntilBirthday': {
            'label': 'Dias até o Aniversário'
          },
          'birthDayOfWeek': {
            'label': 'Nasceu Em'
          }
        },
        'presets': {
          'genAlpha': {
            'label': 'Geração Alpha',
            'description': 'Nascidos ~2015 (9-10 anos)'
          },
          'genZ': {
            'label': 'Geração Z',
            'description': 'Nascidos ~2002 (22-23 anos)'
          },
          'millennial': {
            'label': 'Millennial',
            'description': 'Nascidos ~1990 (34-35 anos)'
          },
          'genX': {
            'label': 'Geração X',
            'description': 'Nascidos ~1975 (49-50 anos)'
          },
          'boomer': {
            'label': 'Baby Boomer',
            'description': 'Nascidos ~1955 (69-70 anos)'
          }
        },
        'tooltips': {
          'ageYears': 'Sua idade completa dividida em anos, meses e dias',
          'totalMonths': 'Total de meses que você esteve vivo',
          'totalDays': 'Total de dias que se passaram desde seu nascimento',
          'totalHours': 'Total aproximado de horas que você viveu',
          'nextBirthday': 'Data da sua próxima celebração de aniversário',
          'daysUntilBirthday': 'Contagem regressiva para seu próximo aniversário',
          'birthDayOfWeek': 'O dia da semana em que você nasceu'
        },
        'values': {
          'Sunday': 'Domingo',
          'Monday': 'Segunda-feira',
          'Tuesday': 'Terça-feira',
          'Wednesday': 'Quarta-feira',
          'Thursday': 'Quinta-feira',
          'Friday': 'Sexta-feira',
          'Saturday': 'Sábado',
          'Capricorn': 'Capricórnio',
          'Aquarius': 'Aquário',
          'Pisces': 'Peixes',
          'Aries': 'Áries',
          'Taurus': 'Touro',
          'Gemini': 'Gêmeos',
          'Cancer': 'Câncer',
          'Leo': 'Leão',
          'Virgo': 'Virgem',
          'Libra': 'Libra',
          'Scorpio': 'Escorpião',
          'Sagittarius': 'Sagitário',
          'Fire': 'Fogo',
          'Earth': 'Terra',
          'Air': 'Ar',
          'Water': 'Água',
          'Wood': 'Madeira',
          'Metal': 'Metal',
          'Rat': 'Rato',
          'Ox': 'Boi',
          'Tiger': 'Tigre',
          'Rabbit': 'Coelho',
          'Dragon': 'Dragão',
          'Snake': 'Serpente',
          'Horse': 'Cavalo',
          'Goat': 'Cabra',
          'Monkey': 'Macaco',
          'Rooster': 'Galo',
          'Dog': 'Cão',
          'Pig': 'Porco',
          'Greatest Generation': 'Geração Grandiosa',
          'Silent Generation': 'Geração Silenciosa',
          'Baby Boomers': 'Baby Boomers',
          'Generation X': 'Geração X',
          'Millennials': 'Millennials',
          'Generation Z': 'Geração Z',
          'Generation Alpha': 'Geração Alpha',
          'Garnet': 'Granada',
          'Amethyst': 'Ametista',
          'Aquamarine': 'Água-marinha',
          'Diamond': 'Diamante',
          'Emerald': 'Esmeralda',
          'Pearl': 'Pérola',
          'Ruby': 'Rubi',
          'Peridot': 'Peridoto',
          'Sapphire': 'Safira',
          'Opal': 'Opala',
          'Topaz': 'Topázio',
          'Turquoise': 'Turquesa',
          'Protection & Strength': 'Proteção e Força',
          'Peace & Wisdom': 'Paz e Sabedoria',
          'Courage & Serenity': 'Coragem e Serenidade',
          'Eternal Love & Clarity': 'Amor Eterno e Clareza',
          'Rebirth & Love': 'Renascimento e Amor',
          'Purity & Innocence': 'Pureza e Inocência',
          'Passion & Vitality': 'Paixão e Vitalidade',
          'Prosperity & Good Fortune': 'Prosperidade e Boa Fortuna',
          'Wisdom & Loyalty': 'Sabedoria e Lealdade',
          'Hope & Creativity': 'Esperança e Criatividade',
          'Friendship & Strength': 'Amizade e Força',
          'Protection & Healing': 'Proteção e Cura',
          'Carnation': 'Cravo',
          'Violet': 'Violeta',
          'Daffodil': 'Narciso',
          'Daisy': 'Margarida',
          'Lily of the Valley': 'Lírio-do-vale',
          'Rose': 'Rosa',
          'Larkspur': 'Esporão',
          'Gladiolus': 'Gladíolo',
          'Aster': 'Áster',
          'Marigold': 'Calêndula',
          'Chrysanthemum': 'Crisântemo',
          'Poinsettia': 'Bico-de-papagaio',
          'Love & Distinction': 'Amor e Distinção',
          'Loyalty & Faithfulness': 'Lealdade e Fidelidade',
          'New Beginnings': 'Novos Começos',
          'Innocence & Purity': 'Inocência e Pureza',
          'Sweetness & Humility': 'Doçura e Humildade',
          'Love & Appreciation': 'Amor e Apreço',
          'Positivity & Joy': 'Positividade e Alegria',
          'Strength & Integrity': 'Força e Integridade',
          'Wisdom & Valor': 'Sabedoria e Valor',
          'Warmth & Creativity': 'Calor e Criatividade',
          'Joy & Optimism': 'Alegria e Otimismo',
          'Success & Celebration': 'Sucesso e Celebração',
          'Leadership & Independence': 'Liderança e Independência',
          'Cooperation & Balance': 'Cooperação e Equilíbrio',
          'Creativity & Expression': 'Criatividade e Expressão',
          'Stability & Hard Work': 'Estabilidade e Trabalho Árduo',
          'Freedom & Adventure': 'Liberdade e Aventura',
          'Responsibility & Nurturing': 'Responsabilidade e Cuidado',
          'Wisdom & Spirituality': 'Sabedoria e Espiritualidade',
          'Abundance & Power': 'Abundância e Poder',
          'Humanitarianism & Compassion': 'Humanitarismo e Compaixão',
          'Intuition & Inspiration (Master)': 'Intuição e Inspiração (Mestre)',
          'Master Builder (Master)': 'Construtor Mestre (Mestre)',
          'Master Teacher (Master)': 'Professor Mestre (Mestre)',
          'Universal Love': 'Amor Universal',
          'Yes': 'Sim',
          'years away': 'anos até',
          'Reached!': 'Alcançado!',
          'years': 'anos',
          'months': 'meses',
          'weeks': 'semanas',
          'days': 'dias',
          'hours': 'horas',
          'minutes': 'minutos',
          'beats': 'batimentos',
          'breaths': 'respirações',
          'blinks': 'piscadas',
          'Mercury years': 'anos de Mercúrio',
          'Venus years': 'anos de Vênus',
          'Mars years': 'anos de Marte',
          'Jupiter years': 'anos de Júpiter',
          'Saturn years': 'anos de Saturno'
        },
        'formats': {
          'ageYears': '{years} anos, {months} meses, {days} dias',
          'totalMonths': '{value} meses',
          'totalWeeks': '{value} semanas',
          'totalDays': '{value} dias',
          'totalHours': '{value} horas',
          'totalMinutes': '{value} minutos',
          'daysUntilBirthday': '{value} dias',
          'heartbeats': '{value} batimentos',
          'breaths': '{value} respirações',
          'sleepYears': '~{value} anos',
          'blinks': '{value} piscadas',
          'planetaryAge': '{value} {planet} anos',
          'summary': 'Você tem {years} anos, {months} meses e {days} dias. Nascido em uma {weekday}, você é de {zodiac} ({element}) e um {chineseZodiac} no zodíaco chinês. Seu Número do Caminho da Vida é {lifePathNumber} ({lifePathMeaning}). Seu coração bateu aproximadamente {heartbeats} vezes! Próximo aniversário em {daysUntilBirthday} dias.'
        },
        'infoCards': {
          'zodiacInfo': {
            'title': '⭐ Zodíaco e Astrologia',
            'items': [
              'Signo do Zodíaco Ocidental',
              'Elemento do Zodíaco',
              'Animal do Zodíaco Chinês',
              'Elemento Chinês',
              'Sua Geração'
            ]
          },
          'birthSymbols': {
            'title': '💎 Símbolos do Nascimento',
            'items': [
              'Pedra do Nascimento',
              'Significado da Pedra',
              'Flor do Nascimento',
              'Significado da Flor'
            ]
          },
          'lifeStats': {
            'title': '❤️ Estatísticas da Vida',
            'items': [
              'Total de Batimentos Cardíacos',
              'Total de Respirações',
              'Anos Dormindo',
              'Vezes que Piscou'
            ]
          },
          'milestones': {
            'title': '🎯 Marcos da Idade',
            'items': [
              'Pode Dirigir (16 anos)',
              'Pode Votar (18 anos)',
              'Pode Beber nos EUA (21 anos)',
              'Aposentadoria (65 anos)'
            ]
          },
          'planetaryAges': {
            'title': '🪐 Sua Idade em Outros Planetas',
            'items': [
              'Idade em Mercúrio',
              'Idade em Vênus',
              'Idade em Marte',
              'Idade em Júpiter',
              'Idade em Saturno'
            ]
          },
          'numerology': {
            'title': '🔢 Numerologia',
            'items': [
              'Número do Caminho da Vida',
              'Significado do Caminho da Vida'
            ]
          },
          'funFacts': {
            'title': '💡 Fatos Divertidos Sobre Sua Idade',
            'items': [
              'Seu coração bateu bilhões de vezes desde o nascimento',
              'Você respirou milhões de vezes ao longo da vida',
              'Você passou cerca de um terço da vida dormindo',
              'Sua idade em outros planetas varia baseada em seus períodos orbitais'
            ]
          }
        },
        'referenceData': {
          'lifeMilestones': {
            'title': 'Marcos da Vida por Idade',
            'items': {
              'driving': {
                'label': 'Idade para Dirigir (EUA)',
                'value': '16 anos'
              },
              'voting': {
                'label': 'Idade para Votar',
                'value': '18 anos'
              },
              'drinking': {
                'label': 'Idade para Beber (EUA)',
                'value': '21 anos'
              },
              'brain': {
                'label': 'Cérebro Totalmente Desenvolvido',
                'value': '25 anos'
              },
              'midlife': {
                'label': 'Meia-idade',
                'value': '40-60 anos'
              },
              'retirement': {
                'label': 'Idade da Aposentadoria',
                'value': '65-67 anos'
              },
              'lifeExpectancy': {
                'label': 'Expectativa de Vida (EUA)',
                'value': '77-79 anos'
              },
              'supercentenarian': {
                'label': 'Supercentenário',
                'value': '110+ anos'
              }
            }
          }
        },
        'education': {
          'zodiacSigns': {
            'title': 'Os Quatro Elementos do Zodíaco',
            'cards': [
              {
                'title': 'Signos de Fogo',
                'description': 'Áries, Leão, Sagitário - Apaixonados, dinâmicos, temperamentais e competitivos',
                'icon': '🔥'
              },
              {
                'title': 'Signos de Terra',
                'description': 'Touro, Virgem, Capricórnio - Práticos, confiáveis, realistas e materialistas',
                'icon': '🌍'
              },
              {
                'title': 'Signos de Ar',
                'description': 'Gêmeos, Libra, Aquário - Intelectuais, sociais, comunicativos e analíticos',
                'icon': '💨'
              },
              {
                'title': 'Signos de Água',
                'description': 'Câncer, Escorpião, Peixes - Emocionais, intuitivos, sensíveis e misteriosos',
                'icon': '💧'
              }
            ]
          },
          'considerations': {
            'title': 'Considerações Importantes',
            'items': [
              {
                'text': 'Aniversários de ano bissexto (29 de fevereiro) são calculados corretamente - você ainda envelhece normalmente!',
                'type': 'info'
              },
              {
                'text': 'Estatísticas da vida como batimentos cardíacos são estimativas baseadas em médias populacionais',
                'type': 'warning'
              },
              {
                'text': 'O zodíaco chinês tradicionalmente usa calendário lunar - este usa cálculo simplificado baseado no ano',
                'type': 'info'
              },
              {
                'text': 'Datas dos signos do zodíaco podem variar 1-2 dias dependendo do ano',
                'type': 'info'
              },
              {
                'text': 'Idades planetárias são calculadas usando períodos orbitais ao redor do Sol',
                'type': 'info'
              },
              {
                'text': 'Número do Caminho da Vida é calculado reduzindo sua data de nascimento a um dígito',
                'type': 'info'
              }
            ]
          },
          'exampleCalculation': {
            'title': 'Exemplo de Cálculo de Idade',
            'description': 'Detalhamento passo a passo do cálculo de idade',
            'examples': [
              {
                'title': 'Cálculo Básico de Idade',
                'steps': [
                  'Data de Nascimento: 15 de janeiro, 1990',
                  'Data Atual: 1 de fevereiro, 2026',
                  'Anos: 36',
                  'Meses desde aniversário: 0',
                  'Dias: 17'
                ],
                'result': 'Idade: 36 anos, 0 meses, 17 dias'
              },
              {
                'title': 'Cálculo do Número do Caminho da Vida',
                'steps': [
                  'Nascimento: 15 de janeiro, 1990',
                  'Somar todos os dígitos: 0+1+1+5+1+9+9+0 = 26',
                  'Reduzir: 2+6 = 8'
                ],
                'result': 'Número do Caminho da Vida: 8'
              }
            ]
          },
          'whatIsAge': {
            'title': 'O que é uma Calculadora de Idade?',
            'content': 'Uma calculadora de idade é uma ferramenta abrangente que calcula não apenas sua idade cronológica, mas também revela insights fascinantes sobre sua vida. Ela calcula sua idade exata até o segundo, determina seus signos do zodíaco (ocidental e chinês), identifica sua pedra e flor do nascimento, estima estatísticas da vida como batimentos cardíacos e respirações, calcula sua idade em outros planetas, e até determina seu número do caminho da vida na numerologia. Nossa calculadora vai muito além do cálculo simples de idade para dar uma visão completa da jornada da sua vida.'
          },
          'howItWorks': {
            'title': 'Como Funcionam os Cálculos',
            'content': 'O cálculo de idade usa o sistema de calendário gregoriano com contagem precisa de dias. Para idades planetárias, dividimos sua idade terrestre pelo período orbital do planeta. Estatísticas da vida usam médias médicas: corações batem ~100.000 vezes por dia, respiramos ~20.000 vezes por dia, e piscamos ~15.000 vezes por dia. O Número do Caminho da Vida é calculado usando princípios da numerologia somando todos os dígitos da sua data de nascimento e reduzindo a um dígito (exceto números mestres 11, 22, 33).'
          },
          'generationsExplained': {
            'title': 'Entendendo as Gerações',
            'content': 'As gerações são definidas por ano de nascimento: Geração Grandiosa (1901-1927) viveu através da Primeira Guerra Mundial e da Depressão. Geração Silenciosa (1928-1945) cresceu durante a Segunda Guerra. Baby Boomers (1946-1964) vivenciaram a prosperidade pós-guerra. Geração X (1965-1980) viu o surgimento dos computadores pessoais. Millennials (1981-1996) chegaram à idade adulta com a internet. Geração Z (1997-2012) são nativos digitais. Geração Alpha (2013+) está crescendo com IA e realidade virtual.'
          },
          'chineseZodiacExplained': {
            'title': 'O Zodíaco Chinês',
            'content': 'O zodíaco chinês é um ciclo de 12 anos onde cada ano é associado a um animal e um dos cinco elementos (Madeira, Fogo, Terra, Metal, Água). Os animais são: Rato (esperto), Boi (diligente), Tigre (corajoso), Coelho (gentil), Dragão (confiante), Serpente (sábio), Cavalo (energético), Cabra (calmo), Macaco (espirituoso), Galo (observador), Cão (leal), e Porco (compassivo). Seu zodíaco chinês combina seu signo animal com seu elemento para um ciclo de 60 anos.'
          }
        },
        'faqs': [
          {
            'question': 'Como a calculadora lida com aniversários de ano bissexto?',
            'answer': 'Se você nasceu em 29 de fevereiro, a calculadora conta corretamente sua idade em dias. Você ainda envelhece normalmente - um ano passa a cada ano independentemente de anos bissextos. Para celebrar aniversários em anos não bissextos, a maioria das pessoas escolhe 28 de fevereiro ou 1º de março.'
          },
          {
            'question': 'Quão precisas são as estatísticas da vida?',
            'answer': 'As estatísticas usam médias médicas: ~100.000 batimentos/dia (varia por idade/saúde), ~20.000 respirações/dia (12-20 por minuto), ~15.000 piscadas/dia, e cerca de 1/3 da vida dormindo. Seus números reais dependem de fatores individuais como saúde, nível de atividade e estilo de vida.'
          },
          {
            'question': 'O que é um Número do Caminho da Vida?',
            'answer': 'Na numerologia, seu Número do Caminho da Vida revela o propósito da sua vida e características principais. É calculado somando todos os dígitos da sua data de nascimento até obter um dígito (1-9) ou um número mestre (11, 22, 33). Cada número tem características únicas: 1 é liderança, 2 é cooperação, 3 é criatividade, etc.'
          },
          {
            'question': 'Como são calculadas as idades planetárias?',
            'answer': 'Sua idade em outros planetas é sua idade terrestre em dias dividida pelo período orbital do planeta em dias. Mercúrio orbita em 88 dias (então você é muito mais velho lá), enquanto Netuno leva 165 anos terrestres (então você seria muito mais jovem). Isso demonstra como a idade é relativa ao nosso sistema de medição.'
          },
          {
            'question': 'O que determina meu animal do zodíaco chinês?',
            'answer': 'Seu zodíaco chinês é principalmente determinado pelo seu ano de nascimento em um ciclo de 12 anos. Contudo, como o Ano Novo Chinês cai entre 21 de janeiro e 20 de fevereiro, pessoas nascidas em janeiro ou início de fevereiro podem na verdade ter o signo animal do ano anterior.'
          },
          {
            'question': 'Por que é importante conhecer minha geração?',
            'answer': 'Gerações compartilham experiências formativas que moldam valores, estilos de comunicação e visões de mundo. Entender sua geração ajuda a explicar referências culturais, dinâmicas de trabalho e contexto histórico compartilhado com pessoas nascidas em períodos similares.'
          },
          {
            'question': 'Qual é o significado das pedras e flores do nascimento?',
            'answer': 'Pedras e flores do nascimento são tradições antigas que atribuem gemas e flores a cada mês. Acreditava-se que pedras do nascimento traziam sorte e proteção quando usadas durante seu mês de nascimento. Flores do nascimento representam traços de personalidade associados a pessoas nascidas naquele mês. Essas tradições datam de milhares de anos.'
          }
        ],
        'rating': {
          'title': 'Avalie esta Calculadora',
          'share': 'Compartilhar',
          'copied': 'Copiado!',
          'copyLink': 'Copiar Link',
          'clickToRate': 'Clique para avaliar',
          'youRated': 'Você avaliou',
          'stars': 'estrelas',
          'averageFrom': 'média de',
          'ratings': 'avaliações',
          'shareCalculator': 'Compartilhe esta calculadora:',
          'includesValues': 'inclui seus valores',
          'creating': 'Criando...',
          'thankYou': 'Obrigado pela sua avaliação!'
        },
        'common': {
          'home': 'Início',
          'calculators': 'Calculadoras'
        },
        'buttons': {
          'shareResults': 'Compartilhar Resultados',
          'copied': 'Copiado!',
          'saveResults': 'Salvar Resultados',
          'hideDetails': 'Ocultar detalhes',
          'showDetails': 'Ver detalhes',
          'calculate': 'Calcular',
          'reset': 'Reiniciar',
          'compareScenarios': 'Comparar Cenários',
          'pdf': 'PDF',
          'csv': 'CSV',
          'save': 'Salvar',
          'saved': 'Salvo',
          'saving': 'Salvando...'
        },
        'share': {
          'calculatedWith': 'Calculado com Kalcufy.com'
        },
        'ui': {
          'results': 'Resultados',
          'yourInformation': 'Suas Informações',
          'loading': 'Carregando...',
          'error': 'Erro',
          'tryAgain': 'Tentar novamente',
          'sensitivityAnalysis': 'Análise de Sensibilidade',
          'quickTips': 'Dicas Rápidas',
          'references': 'Referências'
        },
        'accessibility': {
          'mobileResults': 'Resumo dos resultados',
          'closeModal': 'Fechar',
          'openMenu': 'Abrir menu'
        }
      },
    fr: {
        'name': 'Calculateur d\'Âge',
        'slug': 'calculateur-age',
        'subtitle': 'Calculez votre âge exact avec les signes du zodiaque, les statistiques de vie et les âges planétaires',
        'breadcrumb': 'Âge',
        'seo': {
          'title': 'Calculateur d\'Âge - Âge Exact, Zodiaque, Statistiques de Vie et Âges Planétaires',
          'description': 'Calculez votre âge exact en années, mois, jours, heures, minutes. Découvrez votre signe du zodiaque, zodiaque chinois, génération, pierre de naissance, fleur de naissance, âges planétaires, battements de cœur et numéro de chemin de vie. Calculateur d\'âge complet gratuit.',
          'shortDescription': 'Calculez l\'âge exact avec zodiaque, statistiques de vie et âges planétaires',
          'keywords': [
            'calculateur d\'âge',
            'quel âge ai-je',
            'calculateur d\'anniversaire',
            'calculateur signe du zodiaque',
            'zodiaque chinois',
            'âge planétaire',
            'numéro de chemin de vie',
            'pierre de naissance',
            'calculateur de génération'
          ]
        },
        'calculator': {
          'yourInformation': 'Votre Date de Naissance'
        },
        'inputs': {
          'birthYear': {
            'label': 'Année de Naissance',
            'helpText': 'Entrez l\'année de votre naissance (1900-2026)'
          },
          'birthMonth': {
            'label': 'Mois de Naissance',
            'helpText': 'Sélectionnez votre mois de naissance',
            'options': {
              '1': 'Janvier',
              '2': 'Février',
              '3': 'Mars',
              '4': 'Avril',
              '5': 'Mai',
              '6': 'Juin',
              '7': 'Juillet',
              '8': 'Août',
              '9': 'Septembre',
              '10': 'Octobre',
              '11': 'Novembre',
              '12': 'Décembre'
            }
          },
          'birthDay': {
            'label': 'Jour de Naissance',
            'helpText': 'Entrez le jour du mois (1-31)'
          }
        },
        'inputGroups': {},
        'results': {
          'ageYears': {
            'label': 'Votre Âge'
          },
          'totalMonths': {
            'label': 'Total des Mois'
          },
          'totalWeeks': {
            'label': 'Total des Semaines'
          },
          'totalDays': {
            'label': 'Total des Jours'
          },
          'totalHours': {
            'label': 'Total des Heures'
          },
          'totalMinutes': {
            'label': 'Total des Minutes'
          },
          'nextBirthday': {
            'label': 'Prochain Anniversaire'
          },
          'daysUntilBirthday': {
            'label': 'Jours Jusqu\'à l\'Anniversaire'
          },
          'birthDayOfWeek': {
            'label': 'Né le'
          }
        },
        'presets': {
          'genAlpha': {
            'label': 'Génération Alpha',
            'description': 'Né vers 2015 (9-10 ans)'
          },
          'genZ': {
            'label': 'Génération Z',
            'description': 'Né vers 2002 (22-23 ans)'
          },
          'millennial': {
            'label': 'Millénial',
            'description': 'Né vers 1990 (34-35 ans)'
          },
          'genX': {
            'label': 'Génération X',
            'description': 'Né vers 1975 (49-50 ans)'
          },
          'boomer': {
            'label': 'Baby-Boomer',
            'description': 'Né vers 1955 (69-70 ans)'
          }
        },
        'tooltips': {
          'ageYears': 'Votre âge complet décomposé en années, mois et jours',
          'totalMonths': 'Total des mois que vous avez vécus',
          'totalDays': 'Total des jours qui se sont écoulés depuis votre naissance',
          'totalHours': 'Total approximatif des heures que vous avez vécues',
          'nextBirthday': 'Date de votre prochain anniversaire',
          'daysUntilBirthday': 'Compte à rebours jusqu\'à votre prochain anniversaire',
          'birthDayOfWeek': 'Le jour de la semaine où vous êtes né'
        },
        'values': {
          'Sunday': 'Dimanche',
          'Monday': 'Lundi',
          'Tuesday': 'Mardi',
          'Wednesday': 'Mercredi',
          'Thursday': 'Jeudi',
          'Friday': 'Vendredi',
          'Saturday': 'Samedi',
          'Capricorn': 'Capricorne',
          'Aquarius': 'Verseau',
          'Pisces': 'Poissons',
          'Aries': 'Bélier',
          'Taurus': 'Taureau',
          'Gemini': 'Gémeaux',
          'Cancer': 'Cancer',
          'Leo': 'Lion',
          'Virgo': 'Vierge',
          'Libra': 'Balance',
          'Scorpio': 'Scorpion',
          'Sagittarius': 'Sagittaire',
          'Fire': 'Feu',
          'Earth': 'Terre',
          'Air': 'Air',
          'Water': 'Eau',
          'Wood': 'Bois',
          'Metal': 'Métal',
          'Rat': 'Rat',
          'Ox': 'Buffle',
          'Tiger': 'Tigre',
          'Rabbit': 'Lapin',
          'Dragon': 'Dragon',
          'Snake': 'Serpent',
          'Horse': 'Cheval',
          'Goat': 'Chèvre',
          'Monkey': 'Singe',
          'Rooster': 'Coq',
          'Dog': 'Chien',
          'Pig': 'Cochon',
          'Greatest Generation': 'Génération Grandiose',
          'Silent Generation': 'Génération Silencieuse',
          'Baby Boomers': 'Baby-Boomers',
          'Generation X': 'Génération X',
          'Millennials': 'Milléniaux',
          'Generation Z': 'Génération Z',
          'Generation Alpha': 'Génération Alpha',
          'Garnet': 'Grenat',
          'Amethyst': 'Améthyste',
          'Aquamarine': 'Aigue-marine',
          'Diamond': 'Diamant',
          'Emerald': 'Émeraude',
          'Pearl': 'Perle',
          'Ruby': 'Rubis',
          'Peridot': 'Péridot',
          'Sapphire': 'Saphir',
          'Opal': 'Opale',
          'Topaz': 'Topaze',
          'Turquoise': 'Turquoise',
          'Protection & Strength': 'Protection et Force',
          'Peace & Wisdom': 'Paix et Sagesse',
          'Courage & Serenity': 'Courage et Sérénité',
          'Eternal Love & Clarity': 'Amour Éternel et Clarté',
          'Rebirth & Love': 'Renaissance et Amour',
          'Purity & Innocence': 'Pureté et Innocence',
          'Passion & Vitality': 'Passion et Vitalité',
          'Prosperity & Good Fortune': 'Prospérité et Bonne Fortune',
          'Wisdom & Loyalty': 'Sagesse et Loyauté',
          'Hope & Creativity': 'Espoir et Créativité',
          'Friendship & Strength': 'Amitié et Force',
          'Protection & Healing': 'Protection et Guérison',
          'Carnation': 'Œillet',
          'Violet': 'Violette',
          'Daffodil': 'Jonquille',
          'Daisy': 'Marguerite',
          'Lily of the Valley': 'Muguet',
          'Rose': 'Rose',
          'Larkspur': 'Pied-d\'alouette',
          'Gladiolus': 'Glaïeul',
          'Aster': 'Aster',
          'Marigold': 'Souci',
          'Chrysanthemum': 'Chrysanthème',
          'Poinsettia': 'Poinsettia',
          'Love & Distinction': 'Amour et Distinction',
          'Loyalty & Faithfulness': 'Loyauté et Fidélité',
          'New Beginnings': 'Nouveaux Commencements',
          'Innocence & Purity': 'Innocence et Pureté',
          'Sweetness & Humility': 'Douceur et Humilité',
          'Love & Appreciation': 'Amour et Appréciation',
          'Positivity & Joy': 'Positivité et Joie',
          'Strength & Integrity': 'Force et Intégrité',
          'Wisdom & Valor': 'Sagesse et Bravoure',
          'Warmth & Creativity': 'Chaleur et Créativité',
          'Joy & Optimism': 'Joie et Optimisme',
          'Success & Celebration': 'Succès et Célébration',
          'Leadership & Independence': 'Leadership et Indépendance',
          'Cooperation & Balance': 'Coopération et Équilibre',
          'Creativity & Expression': 'Créativité et Expression',
          'Stability & Hard Work': 'Stabilité et Travail Acharné',
          'Freedom & Adventure': 'Liberté et Aventure',
          'Responsibility & Nurturing': 'Responsabilité et Bienveillance',
          'Wisdom & Spirituality': 'Sagesse et Spiritualité',
          'Abundance & Power': 'Abondance et Pouvoir',
          'Humanitarianism & Compassion': 'Humanitarisme et Compassion',
          'Intuition & Inspiration (Master)': 'Intuition et Inspiration (Maître)',
          'Master Builder (Master)': 'Maître Bâtisseur (Maître)',
          'Master Teacher (Master)': 'Maître Enseignant (Maître)',
          'Universal Love': 'Amour Universel',
          'Yes': 'Oui',
          'years away': 'années restantes',
          'Reached!': 'Atteint !',
          'years': 'années',
          'months': 'mois',
          'weeks': 'semaines',
          'days': 'jours',
          'hours': 'heures',
          'minutes': 'minutes',
          'beats': 'battements',
          'breaths': 'respirations',
          'blinks': 'clignements',
          'Mercury years': 'années de Mercure',
          'Venus years': 'années de Vénus',
          'Mars years': 'années de Mars',
          'Jupiter years': 'années de Jupiter',
          'Saturn years': 'années de Saturne'
        },
        'formats': {
          'ageYears': '{years} années, {months} mois, {days} jours',
          'totalMonths': '{value} mois',
          'totalWeeks': '{value} semaines',
          'totalDays': '{value} jours',
          'totalHours': '{value} heures',
          'totalMinutes': '{value} minutes',
          'daysUntilBirthday': '{value} jours',
          'heartbeats': '{value} battements',
          'breaths': '{value} respirations',
          'sleepYears': '~{value} années',
          'blinks': '{value} clignements',
          'planetaryAge': '{value} {planet} années',
          'summary': 'Vous avez {years} années, {months} mois et {days} jours. Né un {weekday}, vous êtes {zodiac} ({element}) et {chineseZodiac} dans le zodiaque chinois. Votre Numéro de Chemin de Vie est {lifePathNumber} ({lifePathMeaning}). Votre cœur a battu approximativement {heartbeats} fois ! Prochain anniversaire dans {daysUntilBirthday} jours.'
        },
        'infoCards': {
          'zodiacInfo': {
            'title': '⭐ Zodiaque et Astrologie',
            'items': [
              'Signe du Zodiaque Occidental',
              'Élément du Zodiaque',
              'Animal du Zodiaque Chinois',
              'Élément Chinois',
              'Votre Génération'
            ]
          },
          'birthSymbols': {
            'title': '💎 Symboles de Naissance',
            'items': [
              'Pierre de Naissance',
              'Signification de la Pierre',
              'Fleur de Naissance',
              'Signification de la Fleur'
            ]
          },
          'lifeStats': {
            'title': '❤️ Statistiques de Vie',
            'items': [
              'Total des Battements de Cœur',
              'Total des Respirations',
              'Années Passées à Dormir',
              'Nombre de Clignements'
            ]
          },
          'milestones': {
            'title': '🎯 Étapes de l\'Âge',
            'items': [
              'Peut Conduire (16 ans)',
              'Peut Voter (18 ans)',
              'Peut Boire aux États-Unis (21 ans)',
              'Retraite (65 ans)'
            ]
          },
          'planetaryAges': {
            'title': '🪐 Votre Âge sur les Autres Planètes',
            'items': [
              'Âge sur Mercure',
              'Âge sur Vénus',
              'Âge sur Mars',
              'Âge sur Jupiter',
              'Âge sur Saturne'
            ]
          },
          'numerology': {
            'title': '🔢 Numérologie',
            'items': [
              'Numéro de Chemin de Vie',
              'Signification du Chemin de Vie'
            ]
          },
          'funFacts': {
            'title': '💡 Faits Amusants sur Votre Âge',
            'items': [
              'Votre cœur a battu des milliards de fois depuis la naissance',
              'Vous avez pris des millions de respirations tout au long de votre vie',
              'Vous avez passé environ un tiers de votre vie à dormir',
              'Votre âge sur les autres planètes varie selon leurs périodes orbitales'
            ]
          }
        },
        'referenceData': {
          'lifeMilestones': {
            'title': 'Étapes de la Vie par Âge',
            'items': {
              'driving': {
                'label': 'Âge de Conduite (États-Unis)',
                'value': '16 ans'
              },
              'voting': {
                'label': 'Âge de Vote',
                'value': '18 ans'
              },
              'drinking': {
                'label': 'Âge pour Boire (États-Unis)',
                'value': '21 ans'
              },
              'brain': {
                'label': 'Cerveau Entièrement Développé',
                'value': '25 ans'
              },
              'midlife': {
                'label': 'Crise de la Quarantaine',
                'value': '40-60 ans'
              },
              'retirement': {
                'label': 'Âge de la Retraite',
                'value': '65-67 ans'
              },
              'lifeExpectancy': {
                'label': 'Espérance de Vie (États-Unis)',
                'value': '77-79 ans'
              },
              'supercentenarian': {
                'label': 'Supercentenaire',
                'value': '110+ ans'
              }
            }
          }
        },
        'education': {
          'zodiacSigns': {
            'title': 'Les Quatre Éléments du Zodiaque',
            'cards': [
              {
                'title': 'Signes de Feu',
                'description': 'Bélier, Lion, Sagittaire - Passionnés, dynamiques, colériques et compétitifs',
                'icon': '🔥'
              },
              {
                'title': 'Signes de Terre',
                'description': 'Taureau, Vierge, Capricorne - Terre-à-terre, pratiques, fiables et matérialistes',
                'icon': '🌍'
              },
              {
                'title': 'Signes d\'Air',
                'description': 'Gémeaux, Balance, Verseau - Intellectuels, sociaux, communicatifs et analytiques',
                'icon': '💨'
              },
              {
                'title': 'Signes d\'Eau',
                'description': 'Cancer, Scorpion, Poissons - Émotionnels, intuitifs, sensibles et mystérieux',
                'icon': '💧'
              }
            ]
          },
          'considerations': {
            'title': 'Considérations Importantes',
            'items': [
              {
                'text': 'Les anniversaires d\'année bissextile (29 février) sont calculés correctement - vous vieillissez toujours normalement !',
                'type': 'info'
              },
              {
                'text': 'Les statistiques de vie comme les battements de cœur sont des estimations basées sur des moyennes de population',
                'type': 'warning'
              },
              {
                'text': 'Le zodiaque chinois utilise traditionnellement le calendrier lunaire - celui-ci utilise un calcul simplifié basé sur l\'année',
                'type': 'info'
              },
              {
                'text': 'Les dates des signes du zodiaque peuvent varier de 1-2 jours selon l\'année',
                'type': 'info'
              },
              {
                'text': 'Les âges planétaires sont calculés en utilisant les périodes orbitales autour du Soleil',
                'type': 'info'
              },
              {
                'text': 'Le Numéro de Chemin de Vie est calculé en réduisant votre date de naissance à un seul chiffre',
                'type': 'info'
              }
            ]
          },
          'exampleCalculation': {
            'title': 'Exemple de Calcul d\'Âge',
            'description': 'Décomposition étape par étape du calcul d\'âge',
            'examples': [
              {
                'title': 'Calcul d\'Âge de Base',
                'steps': [
                  'Date de Naissance : 15 janvier 1990',
                  'Date Actuelle : 1er février 2026',
                  'Années : 36',
                  'Mois depuis l\'anniversaire : 0',
                  'Jours : 17'
                ],
                'result': 'Âge : 36 années, 0 mois, 17 jours'
              },
              {
                'title': 'Calcul du Numéro de Chemin de Vie',
                'steps': [
                  'Naissance : 15 janvier 1990',
                  'Additionner tous les chiffres : 0+1+1+5+1+9+9+0 = 26',
                  'Réduire : 2+6 = 8'
                ],
                'result': 'Numéro de Chemin de Vie : 8'
              }
            ]
          },
          'whatIsAge': {
            'title': 'Qu\'est-ce qu\'un Calculateur d\'Âge ?',
            'content': 'Un calculateur d\'âge est un outil complet qui calcule non seulement votre âge chronologique, mais révèle aussi des informations fascinantes sur votre vie. Il calcule votre âge exact à la seconde près, détermine vos signes du zodiaque (occidental et chinois), identifie votre pierre de naissance et fleur de naissance, estime les statistiques de vie comme les battements de cœur et respirations, calcule votre âge sur d\'autres planètes, et détermine même votre numéro de chemin de vie en numérologie. Notre calculateur va bien au-delà du simple calcul d\'âge pour vous donner une image complète du parcours de votre vie.'
          },
          'howItWorks': {
            'title': 'Comment Fonctionnent les Calculs',
            'content': 'Le calcul d\'âge utilise le système de calendrier grégorien avec un comptage précis des jours. Pour les âges planétaires, nous divisons votre âge terrestre par la période orbitale de la planète. Les statistiques de vie utilisent des moyennes médicales : les cœurs battent ~100 000 fois par jour, nous respirons ~20 000 fois par jour, et clignons ~15 000 fois par jour. Le Numéro de Chemin de Vie est calculé selon les principes de numérologie en additionnant tous les chiffres de votre date de naissance et en réduisant à un seul chiffre (sauf les numéros maîtres 11, 22, 33).'
          },
          'generationsExplained': {
            'title': 'Comprendre les Générations',
            'content': 'Les générations sont définies par l\'année de naissance : la Génération Grandiose (1901-1927) a vécu la Première Guerre mondiale et la Dépression. La Génération Silencieuse (1928-1945) a grandi pendant la Seconde Guerre mondiale. Les Baby-Boomers (1946-1964) ont connu la prospérité d\'après-guerre. La Génération X (1965-1980) a vu naître les ordinateurs personnels. Les Milléniaux (1981-1996) ont grandi avec Internet. La Génération Z (1997-2012) sont des natifs du numérique. La Génération Alpha (2013+) grandit avec l\'IA et la réalité virtuelle.'
          },
          'chineseZodiacExplained': {
            'title': 'Le Zodiaque Chinois',
            'content': 'Le zodiaque chinois est un cycle de 12 ans où chaque année est associée à un animal et à l\'un des cinq éléments (Bois, Feu, Terre, Métal, Eau). Les animaux sont : Rat (intelligent), Buffle (diligent), Tigre (brave), Lapin (doux), Dragon (confiant), Serpent (sage), Cheval (énergique), Chèvre (calme), Singe (spirituel), Coq (observateur), Chien (loyal), et Cochon (compatissant). Votre zodiaque chinois combine votre signe animal avec votre élément pour un cycle de 60 ans.'
          }
        },
        'faqs': [
          {
            'question': 'Comment le calculateur gère-t-il les anniversaires d\'année bissextile ?',
            'answer': 'Si vous êtes né le 29 février, le calculateur compte correctement votre âge en jours. Vous vieillissez toujours normalement - une année passe chaque année indépendamment des années bissextiles. Pour célébrer les anniversaires dans les années non bissextiles, la plupart des gens choisissent le 28 février ou le 1er mars.'
          },
          {
            'question': 'Quelle est la précision des statistiques de vie ?',
            'answer': 'Les statistiques utilisent des moyennes médicales : ~100 000 battements de cœur/jour (varie selon l\'âge/santé), ~20 000 respirations/jour (12-20 par minute), ~15 000 clignements/jour, et environ 1/3 de la vie passé à dormir. Vos chiffres réels dépendent de facteurs individuels comme la santé, le niveau d\'activité et le mode de vie.'
          },
          {
            'question': 'Qu\'est-ce qu\'un Numéro de Chemin de Vie ?',
            'answer': 'En numérologie, votre Numéro de Chemin de Vie révèle le but de votre vie et vos traits clés. Il est calculé en additionnant tous les chiffres de votre date de naissance jusqu\'à obtenir un seul chiffre (1-9) ou un numéro maître (11, 22, 33). Chaque numéro a des caractéristiques uniques : 1 est le leadership, 2 est la coopération, 3 est la créativité, etc.'
          },
          {
            'question': 'Comment sont calculés les âges planétaires ?',
            'answer': 'Votre âge sur d\'autres planètes est votre âge terrestre en jours divisé par la période orbitale de la planète en jours. Mercure orbite en 88 jours (donc vous êtes beaucoup plus âgé là-bas), tandis que Neptune prend 165 années terrestres (donc vous seriez beaucoup plus jeune). Cela démontre comment l\'âge est relatif à notre système de mesure.'
          },
          {
            'question': 'Qu\'est-ce qui détermine mon animal du zodiaque chinois ?',
            'answer': 'Votre zodiaque chinois est principalement déterminé par votre année de naissance dans un cycle de 12 ans. Cependant, comme le Nouvel An chinois tombe entre le 21 janvier et le 20 février, les personnes nées en janvier ou début février pourraient en fait avoir le signe animal de l\'année précédente.'
          },
          {
            'question': 'Pourquoi est-il important de connaître ma génération ?',
            'answer': 'Les générations partagent des expériences formatrices qui façonnent les valeurs, les styles de communication et les visions du monde. Comprendre votre génération aide à expliquer les références culturelles, la dynamique de travail et le contexte historique partagé avec les pairs nés dans des périodes similaires.'
          },
          {
            'question': 'Quelle est la signification des pierres de naissance et fleurs de naissance ?',
            'answer': 'Les pierres de naissance et fleurs de naissance sont des traditions anciennes attribuant des gemmes et fleurs à chaque mois. On croyait que les pierres de naissance apportaient chance et protection quand portées pendant votre mois de naissance. Les fleurs de naissance représentent les traits de personnalité associés aux personnes nées dans ce mois. Ces traditions remontent à des milliers d\'années.'
          }
        ],
        'rating': {
          'title': 'Évaluez ce Calculateur',
          'share': 'Partager',
          'copied': 'Copié !',
          'copyLink': 'Copier le Lien',
          'clickToRate': 'Cliquez pour évaluer',
          'youRated': 'Vous avez évalué',
          'stars': 'étoiles',
          'averageFrom': 'moyenne de',
          'ratings': 'évaluations',
          'shareCalculator': 'Partagez ce calculateur :',
          'includesValues': 'inclut vos valeurs',
          'creating': 'Création...',
          'thankYou': 'Merci pour votre évaluation !'
        },
        'common': {
          'home': 'Accueil',
          'calculators': 'Calculateurs'
        },
        'buttons': {
          'shareResults': 'Partager les Résultats',
          'copied': 'Copié!',
          'saveResults': 'Enregistrer les Résultats',
          'hideDetails': 'Masquer les détails',
          'showDetails': 'Voir les détails',
          'calculate': 'Calculer',
          'reset': 'Réinitialiser',
          'compareScenarios': 'Comparer les Scénarios',
          'pdf': 'PDF',
          'csv': 'CSV',
          'save': 'Enregistrer',
          'saved': 'Enregistré',
          'saving': 'Enregistrement...'
        },
        'share': {
          'calculatedWith': 'Calculé avec Kalcufy.com'
        },
        'ui': {
          'results': 'Résultats',
          'yourInformation': 'Vos Informations',
          'loading': 'Chargement...',
          'error': 'Erreur',
          'tryAgain': 'Réessayer',
          'sensitivityAnalysis': 'Analyse de Sensibilité',
          'quickTips': 'Conseils Rapides',
          'references': 'Références'
        },
        'accessibility': {
          'mobileResults': 'Résumé des résultats',
          'closeModal': 'Fermer',
          'openMenu': 'Ouvrir le menu'
        }
      },
    de: {
        'name': 'Altersrechner',
        'slug': 'rechner-age',
        'subtitle': 'Berechnen Sie Ihr genaues Alter mit Sternzeichen, Lebensstatistiken und Planetenaltern',
        'breadcrumb': 'Alter',
        'seo': {
          'title': 'Altersrechner - Genaues Alter, Sternzeichen, Lebensstatistiken & Planetenalter',
          'description': 'Berechnen Sie Ihr genaues Alter in Jahren, Monaten, Tagen, Stunden, Minuten. Entdecken Sie Sternzeichen, chinesisches Tierkreiszeichen, Generation, Geburtsstein, Geburtsblume, Planetenalter, Herzschläge und Lebenspfadnummer. Kostenloser umfassender Altersrechner.',
          'shortDescription': 'Berechnen Sie das genaue Alter mit Sternzeichen, Lebensstatistiken und Planetenaltern',
          'keywords': [
            'altersrechner',
            'wie alt bin ich',
            'geburtstagsrechner',
            'sternzeichen rechner',
            'chinesisches tierkreiszeichen',
            'planetenalter',
            'lebenspfadnummer',
            'geburtsstein',
            'generationsrechner'
          ]
        },
        'calculator': {
          'yourInformation': 'Ihr Geburtsdatum'
        },
        'inputs': {
          'birthYear': {
            'label': 'Geburtsjahr',
            'helpText': 'Geben Sie das Jahr Ihrer Geburt ein (1900-2026)'
          },
          'birthMonth': {
            'label': 'Geburtsmonat',
            'helpText': 'Wählen Sie Ihren Geburtsmonat',
            'options': {
              '1': 'Januar',
              '2': 'Februar',
              '3': 'März',
              '4': 'April',
              '5': 'Mai',
              '6': 'Juni',
              '7': 'Juli',
              '8': 'August',
              '9': 'September',
              '10': 'Oktober',
              '11': 'November',
              '12': 'Dezember'
            }
          },
          'birthDay': {
            'label': 'Geburtstag',
            'helpText': 'Geben Sie den Tag des Monats ein (1-31)'
          }
        },
        'inputGroups': {},
        'results': {
          'ageYears': {
            'label': 'Ihr Alter'
          },
          'totalMonths': {
            'label': 'Gesamte Monate'
          },
          'totalWeeks': {
            'label': 'Gesamte Wochen'
          },
          'totalDays': {
            'label': 'Gesamte Tage'
          },
          'totalHours': {
            'label': 'Gesamte Stunden'
          },
          'totalMinutes': {
            'label': 'Gesamte Minuten'
          },
          'nextBirthday': {
            'label': 'Nächster Geburtstag'
          },
          'daysUntilBirthday': {
            'label': 'Tage bis zum Geburtstag'
          },
          'birthDayOfWeek': {
            'label': 'Geboren am'
          }
        },
        'presets': {
          'genAlpha': {
            'label': 'Generation Alpha',
            'description': 'Geboren ~2015 (9-10 Jahre)'
          },
          'genZ': {
            'label': 'Generation Z',
            'description': 'Geboren ~2002 (22-23 Jahre)'
          },
          'millennial': {
            'label': 'Millennials',
            'description': 'Geboren ~1990 (34-35 Jahre)'
          },
          'genX': {
            'label': 'Generation X',
            'description': 'Geboren ~1975 (49-50 Jahre)'
          },
          'boomer': {
            'label': 'Babyboomer',
            'description': 'Geboren ~1955 (69-70 Jahre)'
          }
        },
        'tooltips': {
          'ageYears': 'Ihr vollständiges Alter aufgeteilt in Jahre, Monate und Tage',
          'totalMonths': 'Gesamte Monate, die Sie gelebt haben',
          'totalDays': 'Gesamte Tage, die seit Ihrer Geburt vergangen sind',
          'totalHours': 'Ungefähre Gesamtstunden, die Sie gelebt haben',
          'nextBirthday': 'Datum Ihrer nächsten Geburtstagsfeier',
          'daysUntilBirthday': 'Countdown bis zu Ihrem nächsten Geburtstag',
          'birthDayOfWeek': 'Der Wochentag, an dem Sie geboren wurden'
        },
        'values': {
          'Sunday': 'Sonntag',
          'Monday': 'Montag',
          'Tuesday': 'Dienstag',
          'Wednesday': 'Mittwoch',
          'Thursday': 'Donnerstag',
          'Friday': 'Freitag',
          'Saturday': 'Samstag',
          'Capricorn': 'Steinbock',
          'Aquarius': 'Wassermann',
          'Pisces': 'Fische',
          'Aries': 'Widder',
          'Taurus': 'Stier',
          'Gemini': 'Zwillinge',
          'Cancer': 'Krebs',
          'Leo': 'Löwe',
          'Virgo': 'Jungfrau',
          'Libra': 'Waage',
          'Scorpio': 'Skorpion',
          'Sagittarius': 'Schütze',
          'Fire': 'Feuer',
          'Earth': 'Erde',
          'Air': 'Luft',
          'Water': 'Wasser',
          'Wood': 'Holz',
          'Metal': 'Metall',
          'Rat': 'Ratte',
          'Ox': 'Ochse',
          'Tiger': 'Tiger',
          'Rabbit': 'Hase',
          'Dragon': 'Drache',
          'Snake': 'Schlange',
          'Horse': 'Pferd',
          'Goat': 'Ziege',
          'Monkey': 'Affe',
          'Rooster': 'Hahn',
          'Dog': 'Hund',
          'Pig': 'Schwein',
          'Greatest Generation': 'Größte Generation',
          'Silent Generation': 'Stille Generation',
          'Baby Boomers': 'Babyboomer',
          'Generation X': 'Generation X',
          'Millennials': 'Millennials',
          'Generation Z': 'Generation Z',
          'Generation Alpha': 'Generation Alpha',
          'Garnet': 'Granat',
          'Amethyst': 'Amethyst',
          'Aquamarine': 'Aquamarin',
          'Diamond': 'Diamant',
          'Emerald': 'Smaragd',
          'Pearl': 'Perle',
          'Ruby': 'Rubin',
          'Peridot': 'Peridot',
          'Sapphire': 'Saphir',
          'Opal': 'Opal',
          'Topaz': 'Topas',
          'Turquoise': 'Türkis',
          'Protection & Strength': 'Schutz & Stärke',
          'Peace & Wisdom': 'Frieden & Weisheit',
          'Courage & Serenity': 'Mut & Gelassenheit',
          'Eternal Love & Clarity': 'Ewige Liebe & Klarheit',
          'Rebirth & Love': 'Wiedergeburt & Liebe',
          'Purity & Innocence': 'Reinheit & Unschuld',
          'Passion & Vitality': 'Leidenschaft & Vitalität',
          'Prosperity & Good Fortune': 'Wohlstand & Glück',
          'Wisdom & Loyalty': 'Weisheit & Treue',
          'Hope & Creativity': 'Hoffnung & Kreativität',
          'Friendship & Strength': 'Freundschaft & Stärke',
          'Protection & Healing': 'Schutz & Heilung',
          'Carnation': 'Nelke',
          'Violet': 'Veilchen',
          'Daffodil': 'Narzisse',
          'Daisy': 'Gänseblümchen',
          'Lily of the Valley': 'Maiglöckchen',
          'Rose': 'Rose',
          'Larkspur': 'Rittersporn',
          'Gladiolus': 'Gladiole',
          'Aster': 'Aster',
          'Marigold': 'Ringelblume',
          'Chrysanthemum': 'Chrysantheme',
          'Poinsettia': 'Weihnachtsstern',
          'Love & Distinction': 'Liebe & Auszeichnung',
          'Loyalty & Faithfulness': 'Treue & Loyalität',
          'New Beginnings': 'Neue Anfänge',
          'Innocence & Purity': 'Unschuld & Reinheit',
          'Sweetness & Humility': 'Süße & Demut',
          'Love & Appreciation': 'Liebe & Wertschätzung',
          'Positivity & Joy': 'Positivität & Freude',
          'Strength & Integrity': 'Stärke & Integrität',
          'Wisdom & Valor': 'Weisheit & Tapferkeit',
          'Warmth & Creativity': 'Wärme & Kreativität',
          'Joy & Optimism': 'Freude & Optimismus',
          'Success & Celebration': 'Erfolg & Feier',
          'Leadership & Independence': 'Führung & Unabhängigkeit',
          'Cooperation & Balance': 'Kooperation & Balance',
          'Creativity & Expression': 'Kreativität & Ausdruck',
          'Stability & Hard Work': 'Stabilität & harte Arbeit',
          'Freedom & Adventure': 'Freiheit & Abenteuer',
          'Responsibility & Nurturing': 'Verantwortung & Fürsorge',
          'Wisdom & Spirituality': 'Weisheit & Spiritualität',
          'Abundance & Power': 'Überfluss & Macht',
          'Humanitarianism & Compassion': 'Humanitarismus & Mitgefühl',
          'Intuition & Inspiration (Master)': 'Intuition & Inspiration (Meister)',
          'Master Builder (Master)': 'Meisterbauer (Meister)',
          'Master Teacher (Master)': 'Meisterlehrer (Meister)',
          'Universal Love': 'Universelle Liebe',
          'Yes': 'Ja',
          'years away': 'Jahre entfernt',
          'Reached!': 'Erreicht!',
          'years': 'Jahre',
          'months': 'Monate',
          'weeks': 'Wochen',
          'days': 'Tage',
          'hours': 'Stunden',
          'minutes': 'Minuten',
          'beats': 'Schläge',
          'breaths': 'Atemzüge',
          'blinks': 'Blinzeln',
          'Mercury years': 'Merkur-Jahre',
          'Venus years': 'Venus-Jahre',
          'Mars years': 'Mars-Jahre',
          'Jupiter years': 'Jupiter-Jahre',
          'Saturn years': 'Saturn-Jahre'
        },
        'formats': {
          'ageYears': '{years} Jahre, {months} Monate, {days} Tage',
          'totalMonths': '{value} Monate',
          'totalWeeks': '{value} Wochen',
          'totalDays': '{value} Tage',
          'totalHours': '{value} Stunden',
          'totalMinutes': '{value} Minuten',
          'daysUntilBirthday': '{value} Tage',
          'heartbeats': '{value} Schläge',
          'breaths': '{value} Atemzüge',
          'sleepYears': '~{value} Jahre',
          'blinks': '{value} Blinzeln',
          'planetaryAge': '{value} {planet} Jahre',
          'summary': 'Sie sind {years} Jahre, {months} Monate und {days} Tage alt. Geboren an einem {weekday}, sind Sie ein {zodiac} ({element}) und ein {chineseZodiac} im chinesischen Tierkreiszeichen. Ihre Lebenspfadnummer ist {lifePathNumber} ({lifePathMeaning}). Ihr Herz hat ungefähr {heartbeats} Mal geschlagen! Nächster Geburtstag in {daysUntilBirthday} Tagen.'
        },
        'infoCards': {
          'zodiacInfo': {
            'title': '⭐ Sternzeichen & Astrologie',
            'items': [
              'Westliches Sternzeichen',
              'Sternzeichen-Element',
              'Chinesisches Tierkreiszeichen',
              'Chinesisches Element',
              'Ihre Generation'
            ]
          },
          'birthSymbols': {
            'title': '💎 Geburtssymbole',
            'items': [
              'Geburtsstein',
              'Stein-Bedeutung',
              'Geburtsblume',
              'Blumen-Bedeutung'
            ]
          },
          'lifeStats': {
            'title': '❤️ Lebensstatistiken',
            'items': [
              'Gesamte Herzschläge',
              'Gesamte Atemzüge',
              'Jahre im Schlaf verbracht',
              'Anzahl des Blinzelns'
            ]
          },
          'milestones': {
            'title': '🎯 Alters-Meilensteine',
            'items': [
              'Autofahren (16 Jahre)',
              'Wahlberechtigung (18 Jahre)',
              'Alkohol in USA (21 Jahre)',
              'Rente (65 Jahre)'
            ]
          },
          'planetaryAges': {
            'title': '🪐 Ihr Alter auf anderen Planeten',
            'items': [
              'Alter auf Merkur',
              'Alter auf Venus',
              'Alter auf Mars',
              'Alter auf Jupiter',
              'Alter auf Saturn'
            ]
          },
          'numerology': {
            'title': '🔢 Numerologie',
            'items': [
              'Lebenspfadnummer',
              'Lebenspfad-Bedeutung'
            ]
          },
          'funFacts': {
            'title': '💡 Lustige Fakten über Ihr Alter',
            'items': [
              'Ihr Herz hat seit der Geburt Milliarden von Malen geschlagen',
              'Sie haben Millionen von Atemzügen in Ihrem Leben gemacht',
              'Sie haben etwa ein Drittel Ihres Lebens schlafend verbracht',
              'Ihr Alter auf anderen Planeten variiert je nach deren Umlaufbahnen'
            ]
          }
        },
        'referenceData': {
          'lifeMilestones': {
            'title': 'Lebensmeilensteine nach Alter',
            'items': {
              'driving': {
                'label': 'Führerscheinalter (USA)',
                'value': '16 Jahre'
              },
              'voting': {
                'label': 'Wahlalter',
                'value': '18 Jahre'
              },
              'drinking': {
                'label': 'Alkohol-Alter (USA)',
                'value': '21 Jahre'
              },
              'brain': {
                'label': 'Gehirn vollständig entwickelt',
                'value': '25 Jahre'
              },
              'midlife': {
                'label': 'Midlife-Crisis',
                'value': '40-60 Jahre'
              },
              'retirement': {
                'label': 'Rentenalter',
                'value': '65-67 Jahre'
              },
              'lifeExpectancy': {
                'label': 'Lebenserwartung (USA)',
                'value': '77-79 Jahre'
              },
              'supercentenarian': {
                'label': 'Supercentenarian',
                'value': '110+ Jahre'
              }
            }
          }
        },
        'education': {
          'zodiacSigns': {
            'title': 'Die vier Elemente des Tierkreises',
            'cards': [
              {
                'title': 'Feuerzeichen',
                'description': 'Widder, Löwe, Schütze - Leidenschaftlich, dynamisch, temperamentvoll und konkurrenzfähig',
                'icon': '🔥'
              },
              {
                'title': 'Erdzeichen',
                'description': 'Stier, Jungfrau, Steinbock - Geerdet, praktisch, zuverlässig und materialistisch',
                'icon': '🌍'
              },
              {
                'title': 'Luftzeichen',
                'description': 'Zwillinge, Waage, Wassermann - Intellektuell, sozial, kommunikativ und analytisch',
                'icon': '💨'
              },
              {
                'title': 'Wasserzeichen',
                'description': 'Krebs, Skorpion, Fische - Emotional, intuitiv, sensibel und geheimnisvoll',
                'icon': '💧'
              }
            ]
          },
          'considerations': {
            'title': 'Wichtige Überlegungen',
            'items': [
              {
                'text': 'Schaltjahr-Geburtstage (29. Februar) werden korrekt berechnet - Sie altern trotzdem normal!',
                'type': 'info'
              },
              {
                'text': 'Lebensstatistiken wie Herzschläge sind Schätzungen basierend auf Bevölkerungsdurchschnitten',
                'type': 'warning'
              },
              {
                'text': 'Chinesisches Tierkreiszeichen verwendet traditionell den Mondkalender - dies nutzt vereinfachte jahresbasierte Berechnung',
                'type': 'info'
              },
              {
                'text': 'Sternzeichendaten können je nach Jahr um 1-2 Tage variieren',
                'type': 'info'
              },
              {
                'text': 'Planetenalter werden mit Umlaufzeiten um die Sonne berechnet',
                'type': 'info'
              },
              {
                'text': 'Die Lebenspfadnummer wird berechnet, indem das Geburtsdatum auf eine einstellige Zahl reduziert wird',
                'type': 'info'
              }
            ]
          },
          'exampleCalculation': {
            'title': 'Beispiel Altersberechnung',
            'description': 'Schritt-für-Schritt Aufschlüsselung der Altersberechnung',
            'examples': [
              {
                'title': 'Grundlegende Altersberechnung',
                'steps': [
                  'Geburtsdatum: 15. Januar 1990',
                  'Aktuelles Datum: 1. Februar 2026',
                  'Jahre: 36',
                  'Monate seit Geburtstag: 0',
                  'Tage: 17'
                ],
                'result': 'Alter: 36 Jahre, 0 Monate, 17 Tage'
              },
              {
                'title': 'Lebenspfadnummer Berechnung',
                'steps': [
                  'Geburt: 15. Januar 1990',
                  'Alle Ziffern addieren: 0+1+1+5+1+9+9+0 = 26',
                  'Reduzieren: 2+6 = 8'
                ],
                'result': 'Lebenspfadnummer: 8'
              }
            ]
          },
          'whatIsAge': {
            'title': 'Was ist ein Altersrechner?',
            'content': 'Ein Altersrechner ist ein umfassendes Werkzeug, das nicht nur Ihr chronologisches Alter berechnet, sondern auch faszinierende Einblicke in Ihr Leben offenbart. Er berechnet Ihr genaues Alter bis auf die Sekunde, bestimmt Ihre Sternzeichen (sowohl westliche als auch chinesische), identifiziert Ihren Geburtsstein und Ihre Geburtsblume, schätzt Lebensstatistiken wie Herzschläge und Atemzüge, berechnet Ihr Alter auf anderen Planeten und bestimmt sogar Ihre numerologische Lebenspfadnummer. Unser Rechner geht weit über einfache Altersberechnung hinaus und gibt Ihnen ein vollständiges Bild Ihrer Lebensreise.'
          },
          'howItWorks': {
            'title': 'Wie die Berechnungen funktionieren',
            'content': 'Die Altersberechnung verwendet das gregorianische Kalendersystem mit präziser Tageszählung. Für Planetenalter teilen wir Ihr Erdalter durch die Umlaufzeit des Planeten. Lebensstatistiken verwenden medizinische Durchschnittswerte: Herzen schlagen ~100.000 Mal pro Tag, wir atmen ~20.000 Mal pro Tag und blinzeln ~15.000 Mal pro Tag. Die Lebenspfadnummer wird nach numerologischen Prinzipien berechnet, indem alle Ziffern Ihres Geburtsdatums addiert und auf eine einstellige Zahl reduziert werden (außer Meisterzahlen 11, 22, 33).'
          },
          'generationsExplained': {
            'title': 'Generationen verstehen',
            'content': 'Generationen werden durch das Geburtsjahr definiert: Größte Generation (1901-1927) erlebte den Ersten Weltkrieg und die Depression. Stille Generation (1928-1945) wuchs während des Zweiten Weltkriegs auf. Babyboomer (1946-1964) erlebten den Nachkriegswohlstand. Generation X (1965-1980) sah den Aufstieg der Personal Computer. Millennials (1981-1996) wurden mit dem Internet erwachsen. Generation Z (1997-2012) sind Digital Natives. Generation Alpha (2013+) wächst mit KI und virtueller Realität auf.'
          },
          'chineseZodiacExplained': {
            'title': 'Das chinesische Tierkreiszeichen',
            'content': 'Das chinesische Tierkreiszeichen ist ein 12-Jahres-Zyklus, in dem jedes Jahr mit einem Tier und einem von fünf Elementen (Holz, Feuer, Erde, Metall, Wasser) verbunden ist. Die Tiere sind: Ratte (klug), Ochse (fleißig), Tiger (mutig), Hase (sanft), Drache (selbstbewusst), Schlange (weise), Pferd (energisch), Ziege (ruhig), Affe (witzig), Hahn (aufmerksam), Hund (loyal) und Schwein (mitfühlend). Ihr chinesisches Tierkreiszeichen kombiniert Ihr Tierzeichen mit Ihrem Element für einen 60-Jahres-Zyklus.'
          }
        },
        'faqs': [
          {
            'question': 'Wie behandelt der Rechner Schaltjahr-Geburtstage?',
            'answer': 'Wenn Sie am 29. Februar geboren wurden, zählt der Rechner Ihr Alter in Tagen korrekt. Sie altern trotzdem normal - ein Jahr vergeht jedes Jahr unabhängig von Schaltjahren. Für Geburtstagsfeiern in Nicht-Schaltjahren wählen die meisten Menschen den 28. Februar oder 1. März.'
          },
          {
            'question': 'Wie genau sind die Lebensstatistiken?',
            'answer': 'Die Statistiken verwenden medizinische Durchschnittswerte: ~100.000 Herzschläge/Tag (variiert nach Alter/Gesundheit), ~20.000 Atemzüge/Tag (12-20 pro Minute), ~15.000 Blinzeln/Tag und etwa 1/3 des Lebens im Schlaf verbracht. Ihre tatsächlichen Zahlen hängen von individuellen Faktoren wie Gesundheit, Aktivitätsniveau und Lebensstil ab.'
          },
          {
            'question': 'Was ist eine Lebenspfadnummer?',
            'answer': 'In der Numerologie offenbart Ihre Lebenspfadnummer den Zweck und die Schlüsseleigenschaften Ihres Lebens. Sie wird berechnet, indem alle Ziffern Ihres Geburtsdatums addiert werden, bis Sie eine einstellige Zahl (1-9) oder eine Meisterzahl (11, 22, 33) erhalten. Jede Zahl hat einzigartige Eigenschaften: 1 ist Führung, 2 ist Kooperation, 3 ist Kreativität, usw.'
          },
          {
            'question': 'Wie werden Planetenalter berechnet?',
            'answer': 'Ihr Alter auf anderen Planeten ist Ihr Erdalter in Tagen geteilt durch die Umlaufzeit des Planeten in Tagen. Merkur umkreist in 88 Tagen (also sind Sie dort viel älter), während Neptun 165 Erdjahre braucht (also wären Sie viel jünger). Es zeigt, wie relativ das Alter zu unserem Messsystem ist.'
          },
          {
            'question': 'Was bestimmt mein chinesisches Tierkreistier?',
            'answer': 'Ihr chinesisches Tierkreiszeichen wird hauptsächlich durch Ihr Geburtsjahr in einem 12-Jahres-Zyklus bestimmt. Da das chinesische Neujahr jedoch zwischen dem 21. Januar und 20. Februar fällt, könnten Menschen, die im Januar oder frühen Februar geboren wurden, tatsächlich das Tierzeichen des Vorjahres haben.'
          },
          {
            'question': 'Warum ist es wichtig, meine Generation zu kennen?',
            'answer': 'Generationen teilen prägende Erfahrungen, die Werte, Kommunikationsstile und Weltanschauungen formen. Das Verstehen Ihrer Generation hilft dabei, kulturelle Bezüge, Arbeitsplatz-Dynamiken und gemeinsame historische Kontexte mit Gleichaltrigen zu erklären, die in ähnlichen Zeiträumen geboren wurden.'
          },
          {
            'question': 'Was ist die Bedeutung von Geburtssteinen und Geburtsblumen?',
            'answer': 'Geburtssteine und Geburtsblumen sind alte Traditionen, die jedem Monat Edelsteine und Blumen zuordnen. Es wurde geglaubt, dass Geburtssteine Glück und Schutz bringen, wenn sie während Ihres Geburtsmonats getragen werden. Geburtsblumen repräsentieren Persönlichkeitsmerkmale, die mit Menschen verbunden sind, die in diesem Monat geboren wurden. Diese Traditionen gehen Tausende von Jahren zurück.'
          }
        ],
        'rating': {
          'title': 'Bewerten Sie diesen Rechner',
          'share': 'Teilen',
          'copied': 'Kopiert!',
          'copyLink': 'Link kopieren',
          'clickToRate': 'Klicken zum Bewerten',
          'youRated': 'Sie haben bewertet',
          'stars': 'Sterne',
          'averageFrom': 'Durchschnitt von',
          'ratings': 'Bewertungen',
          'shareCalculator': 'Teilen Sie diesen Rechner:',
          'includesValues': 'enthält Ihre Werte',
          'creating': 'Erstelle...',
          'thankYou': 'Danke für Ihre Bewertung!'
        },
        'common': {
          'home': 'Startseite',
          'calculators': 'Rechner'
        },
        'buttons': {
          'shareResults': 'Ergebnisse teilen',
          'copied': 'Kopiert!',
          'saveResults': 'Ergebnisse speichern',
          'hideDetails': 'Details ausblenden',
          'showDetails': 'Details anzeigen',
          'calculate': 'Berechnen',
          'reset': 'Zurücksetzen',
          'compareScenarios': 'Szenarien vergleichen',
          'pdf': 'PDF',
          'csv': 'CSV',
          'save': 'Speichern',
          'saved': 'Gespeichert',
          'saving': 'Speichern...'
        },
        'share': {
          'calculatedWith': 'Berechnet mit Kalcufy.com'
        },
        'ui': {
          'results': 'Ergebnisse',
          'yourInformation': 'Ihre Informationen',
          'loading': 'Laden...',
          'error': 'Fehler',
          'tryAgain': 'Erneut versuchen',
          'sensitivityAnalysis': 'Sensitivitätsanalyse',
          'quickTips': 'Schnelle Tipps',
          'references': 'Referenzen'
        },
        'accessibility': {
          'mobileResults': 'Ergebniszusammenfassung',
          'closeModal': 'Schließen',
          'openMenu': 'Menü öffnen'
        }
      },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    { id: "birthYear", type: "number", required: true, defaultValue: 1990, min: 1900, max: 2026, step: 1 },
    { id: "birthMonth", type: "select", required: true, defaultValue: "1", options: MONTH_OPTIONS },
    { id: "birthDay", type: "number", required: true, defaultValue: 15, min: 1, max: 31, step: 1 },
  ],

  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    { id: "ageYears", type: "primary", format: "text" },
    { id: "totalMonths", type: "secondary", format: "text" },
    { id: "totalWeeks", type: "secondary", format: "text" },
    { id: "totalDays", type: "secondary", format: "text" },
    { id: "totalHours", type: "secondary", format: "text" },
    { id: "totalMinutes", type: "secondary", format: "text" },
    { id: "nextBirthday", type: "secondary", format: "text" },
    { id: "daysUntilBirthday", type: "secondary", format: "text" },
    { id: "birthDayOfWeek", type: "secondary", format: "text" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INFO CARDS
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    {
      id: "zodiacInfo",
      type: "list",
      icon: "⭐",
      items: [
        { id: "0", valueKey: "zodiacSign" },
        { id: "1", valueKey: "zodiacElement" },
        { id: "2", valueKey: "chineseZodiac" },
        { id: "3", valueKey: "chineseElement" },
        { id: "4", valueKey: "generation" },
      ],
    },
    {
      id: "birthSymbols",
      type: "list",
      icon: "💎",
      items: [
        { id: "0", valueKey: "birthstone" },
        { id: "1", valueKey: "birthstoneMeaning" },
        { id: "2", valueKey: "birthFlower" },
        { id: "3", valueKey: "flowerMeaning" },
      ],
    },
    {
      id: "lifeStats",
      type: "list",
      icon: "❤️",
      items: [
        { id: "0", valueKey: "heartbeats" },
        { id: "1", valueKey: "breaths" },
        { id: "2", valueKey: "sleepYears" },
        { id: "3", valueKey: "blinks" },
      ],
    },
    {
      id: "milestones",
      type: "list",
      icon: "🎯",
      items: [
        { id: "0", valueKey: "canDrive" },
        { id: "1", valueKey: "canVote" },
        { id: "2", valueKey: "canDrink" },
        { id: "3", valueKey: "retirement" },
      ],
    },
    {
      id: "planetaryAges",
      type: "list",
      icon: "🪐",
      items: [
        { id: "0", valueKey: "ageMercury" },
        { id: "1", valueKey: "ageVenus" },
        { id: "2", valueKey: "ageMars" },
        { id: "3", valueKey: "ageJupiter" },
        { id: "4", valueKey: "ageSaturn" },
      ],
    },
    {
      id: "numerology",
      type: "list",
      icon: "🔢",
      items: [
        { id: "0", valueKey: "lifePathNumber" },
        { id: "1", valueKey: "lifePathMeaning" },
      ],
    },
    {
      id: "funFacts",
      type: "horizontal",
      icon: "💡",
      itemCount: 4,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  referenceData: [
    {
      id: "lifeMilestones",
      icon: "🏆",
      columns: 2,
      itemIds: ["driving", "voting", "drinking", "brain", "midlife", "retirement", "lifeExpectancy", "supercentenarian"],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    { id: "zodiacSigns", type: "cards", icon: "♈", columns: 2, cardIds: ["fire", "earth", "air", "water"] },
    { id: "considerations", type: "list", icon: "⚠️", itemCount: 6 },
    { id: "exampleCalculation", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
    { id: "whatIsAge", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "generationsExplained", type: "prose", icon: "👥" },
    { id: "chineseZodiacExplained", type: "prose", icon: "🐉" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    { authors: "Pew Research Center", year: "2024", title: "Defining generations: Where Millennials end and Generation Z begins", source: "Pew Research", url: "https://www.pewresearch.org/short-reads/2019/01/17/where-millennials-end-and-generation-z-begins/" },
    { authors: "NASA Science", year: "2024", title: "Planetary Orbital Periods and Facts", source: "NASA.gov", url: "https://science.nasa.gov/solar-system/" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // OTHER CONFIG
  // ═══════════════════════════════════════════════════════════════════════════
  hero: { badge: "Everyday", rating: { average: 4.9, count: 52300 } },
  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "everyday" },
  features: { autoCalculate: true, saveHistory: true, exportPDF: true, shareResults: true, compareEnabled: false, sensitivityEnabled: false, presetsEnabled: true },
  relatedCalculators: ["bmi-calculator", "calorie-calculator", "retirement-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// CALCULATE FUNCTION - Uses translations from config
// =============================================================================
export function calculateAge(data: {
  values: Record<string, unknown>;
  units?: Record<string, string>;
  unitSystem?: "metric" | "imperial";
  t?: Record<string, unknown>; // Translations passed from engine
}): CalculatorResults {
  const { values, t } = data;
  
  // Get translations or use English defaults
  const v = (t?.values as Record<string, string>) || ageCalculatorConfig.t.en.values;
  const f = (t?.formats as Record<string, string>) || ageCalculatorConfig.t.en.formats;

  const birthYear = (values.birthYear as number) || 1990;
  const birthMonth = parseInt((values.birthMonth as string) || "1");
  const birthDay = Math.min((values.birthDay as number) || 15, getDaysInMonth(birthYear, birthMonth));

  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  const today = new Date();

  if (birthDate > today) {
    return { values: {}, formatted: {}, summary: "Birth date cannot be in the future", isValid: false };
  }

  // Calculate exact age
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate totals
  const totalMs = today.getTime() - birthDate.getTime();
  const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(totalMs / (1000 * 60));
  const totalMonths = years * 12 + months;

  // Next birthday
  let nextBirthday = new Date(today.getFullYear(), birthMonth - 1, birthDay);
  if (nextBirthday <= today) nextBirthday = new Date(today.getFullYear() + 1, birthMonth - 1, birthDay);
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Day of week born - TRANSLATED
  const weekdayIndex = birthDate.getDay();
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const birthDayOfWeek = v[weekdays[weekdayIndex]] || weekdays[weekdayIndex];

  // Zodiac signs - TRANSLATED
  const zodiacData = getZodiacData(birthMonth, birthDay);
  const zodiacName = v[zodiacData.name] || zodiacData.name;
  const zodiacElement = v[zodiacData.element] || zodiacData.element;
  
  // Chinese zodiac - TRANSLATED
  const chineseData = getChineseZodiacData(birthYear);
  const chineseZodiac = v[chineseData.animal] || chineseData.animal;
  const chineseElement = v[chineseData.element] || chineseData.element;
  
  // Generation - TRANSLATED
  const genName = getGenerationName(birthYear);
  const generation = v[genName] || genName;
  
  // Birth symbols - TRANSLATED
  const stoneData = getBirthstoneData(birthMonth);
  const birthstone = v[stoneData.stone] || stoneData.stone;
  const birthstoneMeaning = v[stoneData.meaning] || stoneData.meaning;
  
  const flowerData = getBirthFlowerData(birthMonth);
  const birthFlower = v[flowerData.flower] || flowerData.flower;
  const flowerMeaning = v[flowerData.meaning] || flowerData.meaning;
  
  // Life statistics
  const heartbeats = Math.floor(totalDays * 100000);
  const breaths = Math.floor(totalDays * 20000);
  const sleepYears = (totalDays / 365.25 / 3).toFixed(1);
  const blinks = Math.floor(totalDays * 15000);
  
  // Milestones - TRANSLATED
  const yes = v["Yes"] || "Yes";
  const yearsAway = v["years away"] || "years away";
  const reached = v["Reached!"] || "Reached!";
  
  const canDrive = years >= 16 ? `✅ ${yes}` : `⏳ ${16 - years} ${yearsAway}`;
  const canVote = years >= 18 ? `✅ ${yes}` : `⏳ ${18 - years} ${yearsAway}`;
  const canDrink = years >= 21 ? `✅ ${yes}` : `⏳ ${21 - years} ${yearsAway}`;
  const retirementStatus = years >= 65 ? `✅ ${reached}` : `⏳ ${65 - years} ${yearsAway}`;
  
  // Planetary ages
  const PLANETS = { Mercury: 87.97, Venus: 224.7, Mars: 687, Jupiter: 4333, Saturn: 10759 };
  const earthDays = totalDays;
  const ageMercury = (earthDays / PLANETS.Mercury).toFixed(1);
  const ageVenus = (earthDays / PLANETS.Venus).toFixed(1);
  const ageMars = (earthDays / PLANETS.Mars).toFixed(2);
  const ageJupiter = (earthDays / PLANETS.Jupiter).toFixed(2);
  const ageSaturn = (earthDays / PLANETS.Saturn).toFixed(3);
  
  // Life Path Number - TRANSLATED
  const lifePath = calculateLifePathNumber(birthYear, birthMonth, birthDay);
  const lifePathMeaning = v[lifePath.meaning] || lifePath.meaning;

  // Format helpers
  const fmt = (n: number): string => n.toLocaleString("en-US");
  const nextBirthdayStr = nextBirthday.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  // Translated units
  const uYears = v["years"] || "years";
  const uMonths = v["months"] || "months";
  const uWeeks = v["weeks"] || "weeks";
  const uDays = v["days"] || "days";
  const uHours = v["hours"] || "hours";
  const uMinutes = v["minutes"] || "minutes";
  const uBeats = v["beats"] || "beats";
  const uBreaths = v["breaths"] || "breaths";
  const uBlinks = v["blinks"] || "blinks";

  return {
    values: {
      ageYears: years,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      nextBirthday: nextBirthdayStr,
      daysUntilBirthday,
      birthDayOfWeek,
      zodiacSign: `${zodiacData.symbol} ${zodiacName}`,
      zodiacElement,
      chineseZodiac,
      chineseElement,
      generation,
      birthstone,
      birthstoneMeaning,
      birthFlower,
      flowerMeaning,
      heartbeats,
      breaths,
      sleepYears,
      blinks,
      canDrive,
      canVote,
      canDrink,
      retirement: retirementStatus,
      ageMercury,
      ageVenus,
      ageMars,
      ageJupiter,
      ageSaturn,
      lifePathNumber: lifePath.number,
      lifePathMeaning,
    },
    formatted: {
      ageYears: `${years} ${uYears}, ${months} ${uMonths}, ${days} ${uDays}`,
      totalMonths: `${fmt(totalMonths)} ${uMonths}`,
      totalWeeks: `${fmt(totalWeeks)} ${uWeeks}`,
      totalDays: `${fmt(totalDays)} ${uDays}`,
      totalHours: `${fmt(totalHours)} ${uHours}`,
      totalMinutes: `${fmt(totalMinutes)} ${uMinutes}`,
      nextBirthday: nextBirthdayStr,
      daysUntilBirthday: `${daysUntilBirthday} ${uDays}`,
      birthDayOfWeek,
      zodiacSign: `${zodiacData.symbol} ${zodiacName}`,
      zodiacElement,
      chineseZodiac,
      chineseElement,
      generation,
      birthstone,
      birthstoneMeaning,
      birthFlower,
      flowerMeaning,
      heartbeats: `${fmt(heartbeats)} ${uBeats}`,
      breaths: `${fmt(breaths)} ${uBreaths}`,
      sleepYears: `~${sleepYears} ${uYears}`,
      blinks: `${fmt(blinks)} ${uBlinks}`,
      canDrive,
      canVote,
      canDrink,
      retirement: retirementStatus,
      ageMercury: `${ageMercury} ${v["Mercury years"] || "Mercury years"}`,
      ageVenus: `${ageVenus} ${v["Venus years"] || "Venus years"}`,
      ageMars: `${ageMars} ${v["Mars years"] || "Mars years"}`,
      ageJupiter: `${ageJupiter} ${v["Jupiter years"] || "Jupiter years"}`,
      ageSaturn: `${ageSaturn} ${v["Saturn years"] || "Saturn years"}`,
      lifePathNumber: String(lifePath.number),
      lifePathMeaning,
    },
    summary: `You are ${years} ${uYears}, ${months} ${uMonths}, and ${days} ${uDays} old. Born on a ${birthDayOfWeek}, you are a ${zodiacName} (${zodiacElement}) and a ${chineseZodiac} in Chinese zodiac. Your Life Path Number is ${lifePath.number} (${lifePathMeaning}). Your heart has beaten approximately ${fmt(heartbeats)} times! Next birthday in ${daysUntilBirthday} ${uDays}.`,
    isValid: true,
  };
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
function getDaysInMonth(year: number, month: number): number {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  if (month === 2 && isLeap) return 29;
  return days[month - 1];
}

function getZodiacData(month: number, day: number): { name: string; symbol: string; element: string } {
  const signs = [
    { name: "Capricorn", symbol: "♑", element: "Earth", start: [12, 22], end: [1, 19] },
    { name: "Aquarius", symbol: "♒", element: "Air", start: [1, 20], end: [2, 18] },
    { name: "Pisces", symbol: "♓", element: "Water", start: [2, 19], end: [3, 20] },
    { name: "Aries", symbol: "♈", element: "Fire", start: [3, 21], end: [4, 19] },
    { name: "Taurus", symbol: "♉", element: "Earth", start: [4, 20], end: [5, 20] },
    { name: "Gemini", symbol: "♊", element: "Air", start: [5, 21], end: [6, 20] },
    { name: "Cancer", symbol: "♋", element: "Water", start: [6, 21], end: [7, 22] },
    { name: "Leo", symbol: "♌", element: "Fire", start: [7, 23], end: [8, 22] },
    { name: "Virgo", symbol: "♍", element: "Earth", start: [8, 23], end: [9, 22] },
    { name: "Libra", symbol: "♎", element: "Air", start: [9, 23], end: [10, 22] },
    { name: "Scorpio", symbol: "♏", element: "Water", start: [10, 23], end: [11, 21] },
    { name: "Sagittarius", symbol: "♐", element: "Fire", start: [11, 22], end: [12, 21] },
  ];
  
  for (const sign of signs) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;
    if (startMonth === 12 && endMonth === 1) {
      if ((month === 12 && day >= startDay) || (month === 1 && day <= endDay)) return sign;
    } else {
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) return sign;
    }
  }
  return { name: "Unknown", symbol: "?", element: "Unknown" };
}

function getChineseZodiacData(year: number): { animal: string; element: string } {
  const animals = [
    { animal: "Rat", element: "Water" }, { animal: "Ox", element: "Earth" },
    { animal: "Tiger", element: "Wood" }, { animal: "Rabbit", element: "Wood" },
    { animal: "Dragon", element: "Earth" }, { animal: "Snake", element: "Fire" },
    { animal: "Horse", element: "Fire" }, { animal: "Goat", element: "Earth" },
    { animal: "Monkey", element: "Metal" }, { animal: "Rooster", element: "Metal" },
    { animal: "Dog", element: "Earth" }, { animal: "Pig", element: "Water" },
  ];
  const index = (year - 1900) % 12;
  return animals[index >= 0 ? index : index + 12];
}

function getGenerationName(year: number): string {
  const gens = [
    { name: "Greatest Generation", start: 1901, end: 1927 },
    { name: "Silent Generation", start: 1928, end: 1945 },
    { name: "Baby Boomers", start: 1946, end: 1964 },
    { name: "Generation X", start: 1965, end: 1980 },
    { name: "Millennials", start: 1981, end: 1996 },
    { name: "Generation Z", start: 1997, end: 2012 },
    { name: "Generation Alpha", start: 2013, end: 2030 },
  ];
  for (const gen of gens) {
    if (year >= gen.start && year <= gen.end) return gen.name;
  }
  return year < 1901 ? "Pre-1900" : "Future Generation";
}

function getBirthstoneData(month: number): { stone: string; meaning: string } {
  const stones: Record<number, { stone: string; meaning: string }> = {
    1: { stone: "Garnet", meaning: "Protection & Strength" },
    2: { stone: "Amethyst", meaning: "Peace & Wisdom" },
    3: { stone: "Aquamarine", meaning: "Courage & Serenity" },
    4: { stone: "Diamond", meaning: "Eternal Love & Clarity" },
    5: { stone: "Emerald", meaning: "Rebirth & Love" },
    6: { stone: "Pearl", meaning: "Purity & Innocence" },
    7: { stone: "Ruby", meaning: "Passion & Vitality" },
    8: { stone: "Peridot", meaning: "Prosperity & Good Fortune" },
    9: { stone: "Sapphire", meaning: "Wisdom & Loyalty" },
    10: { stone: "Opal", meaning: "Hope & Creativity" },
    11: { stone: "Topaz", meaning: "Friendship & Strength" },
    12: { stone: "Turquoise", meaning: "Protection & Healing" },
  };
  return stones[month] || { stone: "Unknown", meaning: "Unknown" };
}

function getBirthFlowerData(month: number): { flower: string; meaning: string } {
  const flowers: Record<number, { flower: string; meaning: string }> = {
    1: { flower: "Carnation", meaning: "Love & Distinction" },
    2: { flower: "Violet", meaning: "Loyalty & Faithfulness" },
    3: { flower: "Daffodil", meaning: "New Beginnings" },
    4: { flower: "Daisy", meaning: "Innocence & Purity" },
    5: { flower: "Lily of the Valley", meaning: "Sweetness & Humility" },
    6: { flower: "Rose", meaning: "Love & Appreciation" },
    7: { flower: "Larkspur", meaning: "Positivity & Joy" },
    8: { flower: "Gladiolus", meaning: "Strength & Integrity" },
    9: { flower: "Aster", meaning: "Wisdom & Valor" },
    10: { flower: "Marigold", meaning: "Warmth & Creativity" },
    11: { flower: "Chrysanthemum", meaning: "Joy & Optimism" },
    12: { flower: "Poinsettia", meaning: "Success & Celebration" },
  };
  return flowers[month] || { flower: "Unknown", meaning: "Unknown" };
}

function calculateLifePathNumber(year: number, month: number, day: number): { number: number; meaning: string } {
  const meanings: Record<number, string> = {
    1: "Leadership & Independence",
    2: "Cooperation & Balance",
    3: "Creativity & Expression",
    4: "Stability & Hard Work",
    5: "Freedom & Adventure",
    6: "Responsibility & Nurturing",
    7: "Wisdom & Spirituality",
    8: "Abundance & Power",
    9: "Humanitarianism & Compassion",
    11: "Intuition & Inspiration (Master)",
    22: "Master Builder (Master)",
    33: "Master Teacher (Master)",
  };
  
  const reduce = (n: number): number => {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
      n = String(n).split('').reduce((a, b) => a + parseInt(b), 0);
    }
    return n;
  };
  
  const sum = reduce(year) + reduce(month) + reduce(day);
  const finalNum = reduce(sum);
  
  return { number: finalNum, meaning: meanings[finalNum] || "Universal Love" };
}

export default ageCalculatorConfig;
