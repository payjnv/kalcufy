import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

// ─── BTU Calculator Config ─────────────────────────────────────────────────────

export const btuCalculatorConfig: CalculatorConfigV4 = {
  id: "btu-calculator",
  version: "4.0",
  category: "home",
  icon: "🌡️",

  presets: [
    {
      id: "smallBedroom",
      icon: "🛏️",
      values: {
        calculationType: "cooling",
        roomLength: 12,
        roomWidth: 12,
        ceilingHeight: 8,
        insulationQuality: "average",
        sunExposure: "average",
        numberOfWindows: 1,
        numberOfOccupants: 1,
        roomType: "bedroom",
        showAdvanced: false,
        climateZone: "moderate",
        numberOfExteriorWalls: 1,
        estimateEnergyCost: false,
        electricityRate: 0.12,
        hoursPerDay: 8,
      },
    },
    {
      id: "livingRoom",
      icon: "🛋️",
      values: {
        calculationType: "cooling",
        roomLength: 20,
        roomWidth: 15,
        ceilingHeight: 8,
        insulationQuality: "average",
        sunExposure: "highSun",
        numberOfWindows: 3,
        numberOfOccupants: 4,
        roomType: "livingRoom",
        showAdvanced: false,
        climateZone: "moderate",
        numberOfExteriorWalls: 2,
        estimateEnergyCost: false,
        electricityRate: 0.12,
        hoursPerDay: 10,
      },
    },
    {
      id: "masterSuite",
      icon: "🏠",
      values: {
        calculationType: "cooling",
        roomLength: 16,
        roomWidth: 14,
        ceilingHeight: 9,
        insulationQuality: "good",
        sunExposure: "average",
        numberOfWindows: 2,
        numberOfOccupants: 2,
        roomType: "bedroom",
        showAdvanced: false,
        climateZone: "moderate",
        numberOfExteriorWalls: 2,
        estimateEnergyCost: false,
        electricityRate: 0.12,
        hoursPerDay: 8,
      },
    },
    {
      id: "homeOffice",
      icon: "💻",
      values: {
        calculationType: "cooling",
        roomLength: 12,
        roomWidth: 10,
        ceilingHeight: 8,
        insulationQuality: "average",
        sunExposure: "average",
        numberOfWindows: 1,
        numberOfOccupants: 1,
        roomType: "office",
        showAdvanced: false,
        climateZone: "moderate",
        numberOfExteriorWalls: 1,
        estimateEnergyCost: false,
        electricityRate: 0.12,
        hoursPerDay: 10,
      },
    },
    {
      id: "sunroom",
      icon: "☀️",
      values: {
        calculationType: "cooling",
        roomLength: 14,
        roomWidth: 12,
        ceilingHeight: 10,
        insulationQuality: "poor",
        sunExposure: "highSun",
        numberOfWindows: 6,
        numberOfOccupants: 2,
        roomType: "sunroom",
        showAdvanced: true,
        climateZone: "hotHumid",
        numberOfExteriorWalls: 3,
        estimateEnergyCost: true,
        electricityRate: 0.14,
        hoursPerDay: 12,
      },
    },
  ],

  t: {
    en: {
      name: "BTU Calculator",
      slug: "btu-calculator",
      subtitle:
        "Calculate the BTU cooling or heating capacity needed for any room based on size, insulation, sun exposure, and occupancy.",
      breadcrumb: "BTU Calc",

      seo: {
        title: "BTU Calculator - AC & Heating Size Estimator | Free Tool",
        description:
          "Calculate how many BTUs you need to cool or heat any room. Enter room dimensions, insulation, sun exposure, and occupancy for an accurate AC or heater sizing recommendation.",
        shortDescription:
          "Estimate BTU needs for AC and heating based on room size and conditions.",
        keywords: [
          "btu calculator",
          "ac size calculator",
          "how many btu do i need",
          "air conditioner sizing",
          "hvac calculator",
          "cooling capacity calculator",
          "heating btu calculator",
          "room btu estimator",
        ],
      },

      calculator: { yourInformation: "Room Details" },
      ui: {
        yourInformation: "Room Details",
        calculate: "Calculate BTU",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        calculationType: {
          label: "Calculation Type",
          helpText: "Choose whether you need cooling (AC) or heating capacity",
          options: {
            cooling: "Cooling",
            heating: "Heating",
          },
        },
        roomLength: {
          label: "Room Length",
          helpText: "Measure the longest wall of the room",
        },
        roomWidth: {
          label: "Room Width",
          helpText: "Measure the wall perpendicular to the length",
        },
        ceilingHeight: {
          label: "Ceiling Height",
          helpText:
            "Standard is 8 ft. Higher ceilings require more BTU to condition the extra air volume",
        },
        insulationQuality: {
          label: "Insulation Quality",
          helpText:
            "Newer homes (post-2000) typically have good insulation. Older homes may have poor insulation",
          options: {
            poor: "Poor (old home, no upgrades)",
            average: "Average (standard construction)",
            good: "Good (newer home, upgraded)",
            excellent: "Excellent (high R-value, sealed)",
          },
        },
        sunExposure: {
          label: "Sun Exposure",
          helpText:
            "How much direct sunlight does the room receive during peak hours?",
          options: {
            heavyShade: "Heavy Shade (north-facing, trees)",
            average: "Average (mixed exposure)",
            highSun: "Heavy Sun (south/west-facing, large windows)",
          },
        },
        numberOfWindows: {
          label: "Number of Windows",
          helpText: "Count all windows in the room. More windows increase heat gain/loss",
          suffix: "windows",
        },
        numberOfOccupants: {
          label: "Regular Occupants",
          helpText:
            "Number of people who typically use this room. Each person adds ~600 BTU of body heat",
          suffix: "people",
        },
        roomType: {
          label: "Room Type",
          helpText:
            "Kitchens need extra cooling for appliances. Attics and sunrooms have higher heat loads",
          options: {
            bedroom: "Bedroom",
            livingRoom: "Living Room",
            kitchen: "Kitchen",
            office: "Home Office",
            bathroom: "Bathroom",
            basement: "Basement",
            attic: "Attic / Bonus Room",
            sunroom: "Sunroom / Enclosed Patio",
          },
        },
        showAdvanced: {
          label: "Show Advanced Options",
          helpText: "Fine-tune your estimate with climate zone, exterior walls, and energy cost",
        },
        climateZone: {
          label: "Climate Zone",
          helpText: "Select the climate closest to your location for accurate sizing",
          options: {
            hotHumid: "Hot & Humid (Miami, Houston, LATAM tropics)",
            hotDry: "Hot & Dry (Phoenix, Las Vegas)",
            moderate: "Moderate (Atlanta, Dallas, Charlotte)",
            cool: "Cool (Chicago, Denver, NYC)",
            cold: "Cold (Minneapolis, Boston)",
            veryCold: "Very Cold (Anchorage, northern Canada)",
          },
        },
        numberOfExteriorWalls: {
          label: "Exterior Walls",
          helpText:
            "Walls that face outside (not shared with other rooms). More exterior walls increase heat transfer",
          suffix: "walls",
        },
        estimateEnergyCost: {
          label: "Estimate Monthly Energy Cost",
          helpText:
            "Calculate approximate monthly electricity cost to run the AC or heater",
        },
        electricityRate: {
          label: "Electricity Rate",
          helpText:
            "Your cost per kilowatt-hour. Check your electricity bill for this rate",
        },
        hoursPerDay: {
          label: "Usage Hours Per Day",
          helpText: "Average hours per day the AC or heater runs",
          suffix: "hrs/day",
        },
      },

      results: {
        requiredBTU: { label: "Recommended BTU" },
        btuRange: { label: "Comfort Range" },
        tonnage: { label: "AC Tonnage" },
        roomArea: { label: "Room Area" },
        roomVolume: { label: "Room Volume" },
        monthlyCost: { label: "Est. Monthly Cost" },
      },

      presets: {
        smallBedroom: {
          label: "Small Bedroom",
          description: "12×12 ft, 1 window, 1 person",
        },
        livingRoom: {
          label: "Living Room",
          description: "20×15 ft, 3 windows, 4 people, sunny",
        },
        masterSuite: {
          label: "Master Suite",
          description: "16×14 ft, 9ft ceiling, good insulation",
        },
        homeOffice: {
          label: "Home Office",
          description: "12×10 ft, electronics heat gain",
        },
        sunroom: {
          label: "Sunroom",
          description: "14×12 ft, 6 windows, heavy sun, poor insulation",
        },
      },

      values: {
        btuHr: "BTU/hr",
        tons: "tons",
        ton: "ton",
        sqft: "sq ft",
        cuft: "cu ft",
        month: "/month",
        ft: "ft",
      },

      formats: {
        summary:
          "Your room needs approximately {btu} BTU/hr for {type}. Recommended AC size: {tonnage} ton unit.",
      },

      infoCards: {
        sizing: {
          title: "Sizing Results",
          items: [
            { label: "Recommended BTU", valueKey: "requiredBTU" },
            { label: "Comfort Range", valueKey: "btuRange" },
            { label: "AC Tonnage", valueKey: "tonnage" },
            { label: "Room Area", valueKey: "roomArea" },
          ],
        },
        breakdown: {
          title: "Load Breakdown",
          items: [
            { label: "Base Load", valueKey: "baseLoad" },
            { label: "Ceiling Adjustment", valueKey: "ceilingAdj" },
            { label: "Occupant Load", valueKey: "occupantLoad" },
            { label: "Window & Sun Adj.", valueKey: "windowSunAdj" },
          ],
        },
        tips: {
          title: "Sizing Tips",
          items: [
            "Don't oversize — an AC unit that's too large will short-cycle, causing poor humidity control and higher energy bills.",
            "Check your insulation first. Upgrading insulation is often more cost-effective than buying a larger AC unit.",
            "Seal air leaks around windows, doors, and ducts before sizing. Leaks can add 20-30% to your cooling needs.",
            "Schedule annual HVAC maintenance to keep your system running at peak efficiency and extend its lifespan.",
          ],
        },
      },

      chart: {
        title: "BTU Load Breakdown",
        xLabel: "Factor",
        yLabel: "BTU",
        series: {
          btu: "BTU Impact",
        },
      },

      education: {
        whatIs: {
          title: "What Is a BTU?",
          content:
            "A BTU (British Thermal Unit) is a standard unit of energy used to measure thermal output. Specifically, one BTU is the amount of energy required to raise the temperature of one pound of water by 1°F at sea level. In the context of HVAC (Heating, Ventilation, and Air Conditioning), BTU/hr ratings indicate how much heat an air conditioner can remove from a room per hour, or how much heat a furnace can produce per hour. The higher the BTU rating, the more powerful the unit's heating or cooling capacity. For residential applications, air conditioners typically range from 5,000 BTU for small rooms to 60,000+ BTU for whole-house central systems. Understanding your room's BTU requirements ensures you select equipment that maintains comfortable temperatures without wasting energy or money.",
        },
        howItWorks: {
          title: "How AC and Heater Sizing Works",
          content:
            "Proper HVAC sizing starts with calculating your room's thermal load — the amount of heat that enters (for cooling) or escapes (for heating) the space. The industry standard begins with a baseline of 20-25 BTU per square foot, then applies correction factors for real-world conditions. Ceiling height matters because taller rooms contain more air volume to condition. Sun exposure through windows adds significant heat gain, especially on south and west-facing walls during summer. Occupants generate body heat (approximately 600 BTU per person), and kitchen appliances can add 4,000+ BTU of heat gain. Insulation quality determines how quickly conditioned air is lost to the outdoors. Climate zone affects both the temperature differential your system must overcome and humidity levels that impact cooling loads. Professional HVAC contractors use Manual J calculations (developed by ACCA) for precise load analysis, but this calculator provides an excellent estimate for equipment selection and budgeting.",
        },
        considerations: {
          title: "Key Sizing Factors",
          items: [
            {
              text: "Oversized units cool too quickly without properly dehumidifying, leading to clammy air, mold risk, and frequent on/off cycling that wastes energy and shortens equipment life.",
              type: "warning",
            },
            {
              text: "Undersized units run continuously without reaching the desired temperature, consuming excess energy and failing to maintain comfort on the hottest or coldest days.",
              type: "warning",
            },
            {
              text: "Windows are the biggest source of heat gain in most rooms. Double-pane, Low-E glass windows can reduce solar heat gain by 25-50% compared to single-pane windows.",
              type: "info",
            },
            {
              text: "Insulation is rated by R-value. Attic insulation of R-38 to R-60 is recommended for most U.S. climate zones, while walls should have R-13 to R-21.",
              type: "info",
            },
            {
              text: "Ceiling fans don't reduce room temperature, but they allow you to set the thermostat 2-3°F higher while maintaining the same comfort level, reducing energy use by 10-15%.",
              type: "info",
            },
            {
              text: "Ductwork losses in unconditioned spaces (attics, crawlspaces) can waste 20-30% of conditioned air. Sealing and insulating ducts is one of the highest-ROI home improvements.",
              type: "warning",
            },
          ],
        },
        categories: {
          title: "AC Unit Types by BTU",
          items: [
            {
              text: "Window AC (5,000-15,000 BTU): Best for single rooms. Most affordable option. Easy DIY installation. Ideal for apartments and bedrooms.",
              type: "info",
            },
            {
              text: "Portable AC (8,000-14,000 BTU): Flexible placement, no permanent installation. Less efficient than window units. Good for rooms where window units aren't allowed.",
              type: "info",
            },
            {
              text: "Ductless Mini-Split (9,000-36,000 BTU): Highly efficient, quiet operation, zone control. Higher upfront cost but lower operating cost. Ideal for additions and renovations.",
              type: "info",
            },
            {
              text: "Central AC (24,000-60,000 BTU): Whole-house cooling through ductwork. Most common in U.S. homes. Requires professional installation and existing ductwork.",
              type: "info",
            },
            {
              text: "Heat Pump (12,000-60,000 BTU): Provides both heating and cooling. 2-3× more efficient than electric resistance heating. Increasingly popular even in cold climates.",
              type: "info",
            },
            {
              text: "1 ton of cooling = 12,000 BTU/hr. Residential AC units typically come in 0.5-ton increments: 1, 1.5, 2, 2.5, 3, 3.5, 4, and 5 tons.",
              type: "info",
            },
          ],
        },
        examples: {
          title: "BTU Calculation Examples",
          description: "Step-by-step examples for common rooms",
          examples: [
            {
              title: "Standard Bedroom (12×14 ft, 8ft ceiling)",
              steps: [
                "Room area = 12 × 14 = 168 sq ft",
                "Base BTU = 168 × 20 = 3,360 BTU",
                "Ceiling adjustment: 8 ft (standard) → no adjustment",
                "Sun exposure: Average → ×1.0 (no change)",
                "Insulation: Average → ×1.0 (no change)",
                "Occupants: 2 people (standard) → no extra BTU",
                "Windows: 2 windows (standard) → no extra BTU",
                "Room type: Bedroom → no modifier",
              ],
              result:
                "Recommended: ~3,360 BTU. A 5,000 BTU window AC unit would be appropriate.",
            },
            {
              title: "Large Kitchen (16×20 ft, 9ft ceiling, heavy sun)",
              steps: [
                "Room area = 16 × 20 = 320 sq ft",
                "Base BTU = 320 × 20 = 6,400 BTU",
                "Ceiling: 9 ft → +12.5% = +800 BTU",
                "Sun exposure: Heavy → +10% = +720 BTU",
                "Kitchen modifier: +4,000 BTU (appliance heat)",
                "Occupants: 3 people → +600 BTU (1 above standard)",
                "Windows: 4 → +2,000 BTU (2 above standard)",
              ],
              result:
                "Recommended: ~14,520 BTU. A 15,000 BTU unit or 1.5-ton mini-split would be ideal.",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How many BTU do I need per square foot?",
          answer:
            "The general rule of thumb is 20 BTU per square foot for cooling, assuming standard 8-foot ceilings and average insulation. However, this can range from 15 BTU/sq ft for well-insulated, shaded rooms to 40 BTU/sq ft for poorly insulated, sun-drenched spaces like sunrooms. Factors like ceiling height, window count, occupancy, and climate zone all affect the actual number. This calculator applies those corrections automatically so you get an accurate estimate rather than a rough guess.",
        },
        {
          question: "What happens if I buy an AC unit that's too big?",
          answer:
            "An oversized AC unit will cool the room too quickly without properly removing humidity from the air. This leads to short cycling (frequent on/off), which wastes energy, increases wear on the compressor, causes uneven temperatures, and creates a clammy, uncomfortable environment. Properly sized units run longer cycles that effectively dehumidify while maintaining consistent temperatures.",
        },
        {
          question: "How do I convert BTU to AC tonnage?",
          answer:
            "Divide the BTU rating by 12,000 to get tonnage. For example, 24,000 BTU ÷ 12,000 = 2 tons. Residential AC units typically come in half-ton increments: 1 ton (12,000 BTU), 1.5 tons (18,000 BTU), 2 tons (24,000 BTU), 2.5 tons (30,000 BTU), 3 tons (36,000 BTU), and so on up to 5 tons (60,000 BTU) for larger homes.",
        },
        {
          question: "Does ceiling height affect BTU requirements?",
          answer:
            "Yes, significantly. Standard BTU calculations assume 8-foot ceilings. For every foot above 8 feet, you should add approximately 12.5% more BTU. A 10-foot ceiling has 25% more air volume than an 8-foot ceiling in the same footprint, meaning the AC must condition substantially more air. Rooms with cathedral or vaulted ceilings may need even higher adjustments.",
        },
        {
          question: "Should I calculate BTU for each room separately?",
          answer:
            "Yes, for the most accurate sizing. Each room has different characteristics — window count, sun exposure, occupancy, and heat sources all vary. Calculate BTU for each room individually, especially if using ductless mini-splits or window AC units. For central AC systems, sum the BTU of all rooms and add 10-20% for duct losses, then select a system close to that total.",
        },
        {
          question:
            "How does insulation quality affect my heating and cooling costs?",
          answer:
            "Insulation quality has one of the largest impacts on BTU requirements. Homes with poor insulation may need 25% or more additional BTU compared to the baseline. Upgrading from poor to good insulation (e.g., adding attic insulation from R-11 to R-38) can reduce heating and cooling costs by 20-30%. New construction with high-performance insulation and air sealing can reduce BTU needs by 15% below standard calculations.",
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
        calculate: "Calculate BTU",
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
    es: {
      "name": "Calculadora de BTU",
      "slug": "calculadora-btu",
      "subtitle": "Calcula la capacidad de refrigeración o calefacción BTU necesaria para cualquier habitación basándose en el tamaño, aislamiento, exposición solar y ocupación.",
      "breadcrumb": "Calc BTU",
      "seo": {
        "title": "Calculadora de BTU - Estimador de Tamaño de AC y Calefacción | Herramienta Gratuita",
        "description": "Calcula cuántos BTU necesitas para enfriar o calentar cualquier habitación. Ingresa las dimensiones del cuarto, aislamiento, exposición solar y ocupación para una recomendación precisa de AC o calefactor.",
        "shortDescription": "Estima las necesidades de BTU para AC y calefacción basándose en el tamaño y condiciones del cuarto.",
        "keywords": [
          "calculadora btu",
          "calculadora tamaño ac",
          "cuantos btu necesito",
          "dimensionamiento aire acondicionado",
          "calculadora hvac",
          "calculadora capacidad refrigeracion",
          "calculadora btu calefaccion",
          "estimador btu habitacion"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "calculationType": {
          "label": "Tipo de Cálculo",
          "helpText": "Elige si necesitas capacidad de refrigeración (AC) o calefacción",
          "options": {
            "cooling": "Refrigeración",
            "heating": "Calefacción"
          }
        },
        "roomLength": {
          "label": "Longitud del Cuarto",
          "helpText": "Mide la pared más larga del cuarto"
        },
        "roomWidth": {
          "label": "Ancho del Cuarto",
          "helpText": "Mide la pared perpendicular a la longitud"
        },
        "ceilingHeight": {
          "label": "Altura del Techo",
          "helpText": "El estándar es 8 pies. Techos más altos requieren más BTU para acondicionar el volumen extra de aire"
        },
        "insulationQuality": {
          "label": "Calidad del Aislamiento",
          "helpText": "Casas nuevas (después del 2000) típicamente tienen buen aislamiento. Casas viejas pueden tener aislamiento pobre",
          "options": {
            "poor": "Pobre (casa vieja, sin mejoras)",
            "average": "Promedio (construcción estándar)",
            "good": "Bueno (casa nueva, mejorado)",
            "excellent": "Excelente (alto valor R, sellado)"
          }
        },
        "sunExposure": {
          "label": "Exposición Solar",
          "helpText": "¿Cuánta luz solar directa recibe el cuarto durante las horas pico?",
          "options": {
            "heavyShade": "Sombra Intensa (orientado al norte, árboles)",
            "average": "Promedio (exposición mixta)",
            "highSun": "Sol Intenso (orientado sur/oeste, ventanas grandes)"
          }
        },
        "numberOfWindows": {
          "label": "Número de Ventanas",
          "helpText": "Cuenta todas las ventanas en el cuarto. Más ventanas incrementan la ganancia/pérdida de calor",
          "suffix": "ventanas"
        },
        "numberOfOccupants": {
          "label": "Ocupantes Regulares",
          "helpText": "Número de personas que típicamente usan este cuarto. Cada persona añade ~600 BTU de calor corporal",
          "suffix": "personas"
        },
        "roomType": {
          "label": "Tipo de Cuarto",
          "helpText": "Las cocinas necesitan refrigeración extra por electrodomésticos. Áticos y terrazas acristaladas tienen cargas térmicas más altas",
          "options": {
            "bedroom": "Dormitorio",
            "livingRoom": "Sala de Estar",
            "kitchen": "Cocina",
            "office": "Oficina en Casa",
            "bathroom": "Baño",
            "basement": "Sótano",
            "attic": "Ático / Cuarto Bonus",
            "sunroom": "Terraza Acristalada / Patio Cerrado"
          }
        },
        "showAdvanced": {
          "label": "Mostrar Opciones Avanzadas",
          "helpText": "Ajusta tu estimación con zona climática, paredes exteriores y costo de energía"
        },
        "climateZone": {
          "label": "Zona Climática",
          "helpText": "Selecciona el clima más cercano a tu ubicación para un dimensionamiento preciso",
          "options": {
            "hotHumid": "Caliente y Húmedo (Miami, Houston, trópicos de Latinoamérica)",
            "hotDry": "Caliente y Seco (Phoenix, Las Vegas)",
            "moderate": "Moderado (Atlanta, Dallas, Charlotte)",
            "cool": "Fresco (Chicago, Denver, NYC)",
            "cold": "Frío (Minneapolis, Boston)",
            "veryCold": "Muy Frío (Anchorage, norte de Canadá)"
          }
        },
        "numberOfExteriorWalls": {
          "label": "Paredes Exteriores",
          "helpText": "Paredes que dan al exterior (no compartidas con otros cuartos). Más paredes exteriores incrementan la transferencia de calor",
          "suffix": "paredes"
        },
        "estimateEnergyCost": {
          "label": "Estimar Costo Mensual de Energía",
          "helpText": "Calcula el costo aproximado mensual de electricidad para operar el AC o calefactor"
        },
        "electricityRate": {
          "label": "Tarifa de Electricidad",
          "helpText": "Tu costo por kilovatio-hora. Revisa tu recibo de electricidad para esta tarifa"
        },
        "hoursPerDay": {
          "label": "Horas de Uso Por Día",
          "helpText": "Promedio de horas por día que funciona el AC o calefactor",
          "suffix": "hrs/día"
        }
      },
      "results": {
        "requiredBTU": {
          "label": "BTU Recomendado"
        },
        "btuRange": {
          "label": "Rango de Confort"
        },
        "tonnage": {
          "label": "Tonelaje de AC"
        },
        "roomArea": {
          "label": "Área del Cuarto"
        },
        "roomVolume": {
          "label": "Volumen del Cuarto"
        },
        "monthlyCost": {
          "label": "Costo Mensual Est."
        }
      },
      "presets": {
        "smallBedroom": {
          "label": "Dormitorio Pequeño",
          "description": "12×12 pies, 1 ventana, 1 persona"
        },
        "livingRoom": {
          "label": "Sala de Estar",
          "description": "20×15 pies, 3 ventanas, 4 personas, soleado"
        },
        "masterSuite": {
          "label": "Suite Principal",
          "description": "16×14 pies, techo de 9 pies, buen aislamiento"
        },
        "homeOffice": {
          "label": "Oficina en Casa",
          "description": "12×10 pies, ganancia de calor por electrónicos"
        },
        "sunroom": {
          "label": "Terraza Acristalada",
          "description": "14×12 pies, 6 ventanas, sol intenso, aislamiento pobre"
        }
      },
      "values": {
        "btuHr": "BTU/hr",
        "tons": "toneladas",
        "ton": "tonelada",
        "sqft": "pies²",
        "cuft": "pies³",
        "month": "/mes",
        "ft": "pies"
      },
      "formats": {
        "summary": "Tu cuarto necesita aproximadamente {btu} BTU/hr para {type}. Tamaño de AC recomendado: unidad de {tonnage} tonelada."
      },
      "infoCards": {
        "sizing": {
          "title": "Resultados de Dimensionamiento",
          "items": [
            {
              "label": "BTU Recomendado",
              "valueKey": "requiredBTU"
            },
            {
              "label": "Rango de Confort",
              "valueKey": "btuRange"
            },
            {
              "label": "Tonelaje de AC",
              "valueKey": "tonnage"
            },
            {
              "label": "Área del Cuarto",
              "valueKey": "roomArea"
            }
          ]
        },
        "breakdown": {
          "title": "Desglose de Carga",
          "items": [
            {
              "label": "Carga Base",
              "valueKey": "baseLoad"
            },
            {
              "label": "Ajuste de Techo",
              "valueKey": "ceilingAdj"
            },
            {
              "label": "Carga de Ocupantes",
              "valueKey": "occupantLoad"
            },
            {
              "label": "Ajuste Ventanas y Sol",
              "valueKey": "windowSunAdj"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Dimensionamiento",
          "items": [
            "No sobredimensiones — una unidad de AC demasiado grande funcionará en ciclos cortos, causando mal control de humedad y facturas de energía más altas.",
            "Revisa tu aislamiento primero. Mejorar el aislamiento es a menudo más rentable que comprar una unidad de AC más grande.",
            "Sella las fugas de aire alrededor de ventanas, puertas y ductos antes de dimensionar. Las fugas pueden agregar 20-30% a tus necesidades de refrigeración.",
            "Programa mantenimiento anual de HVAC para mantener tu sistema funcionando a máxima eficiencia y extender su vida útil."
          ]
        }
      },
      "chart": {
        "title": "Desglose de Carga BTU",
        "xLabel": "Factor",
        "yLabel": "BTU",
        "series": {
          "btu": "Impacto BTU"
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es un BTU?",
          "content": "Un BTU (Unidad Térmica Británica) es una unidad estándar de energía utilizada para medir la salida térmica. Específicamente, un BTU es la cantidad de energía requerida para elevar la temperatura de una libra de agua por 1°F al nivel del mar. En el contexto de HVAC (Calefacción, Ventilación y Aire Acondicionado), las clasificaciones BTU/hr indican cuánto calor puede remover un aire acondicionado de un cuarto por hora, o cuánto calor puede producir un horno por hora. Entre mayor sea la clasificación BTU, más poderosa es la capacidad de calefacción o refrigeración de la unidad. Para aplicaciones residenciales, los aires acondicionados típicamente van de 5,000 BTU para cuartos pequeños a 60,000+ BTU para sistemas centrales de toda la casa. Entender los requerimientos BTU de tu cuarto asegura que selecciones equipo que mantenga temperaturas cómodas sin desperdiciar energía o dinero."
        },
        "howItWorks": {
          "title": "Cómo Funciona el Dimensionamiento de AC y Calefactores",
          "content": "El dimensionamiento apropiado de HVAC comienza con calcular la carga térmica de tu cuarto — la cantidad de calor que entra (para refrigeración) o escapa (para calefacción) del espacio. El estándar de la industria comienza con una línea base de 20-25 BTU por pie cuadrado, luego aplica factores de corrección para condiciones del mundo real. La altura del techo importa porque cuartos más altos contienen más volumen de aire para acondicionar. La exposición solar a través de ventanas añade ganancia significativa de calor, especialmente en paredes orientadas al sur y oeste durante el verano. Los ocupantes generan calor corporal (aproximadamente 600 BTU por persona), y los electrodomésticos de cocina pueden agregar 4,000+ BTU de ganancia de calor. La calidad del aislamiento determina qué tan rápido se pierde el aire acondicionado hacia el exterior. La zona climática afecta tanto el diferencial de temperatura que tu sistema debe superar como los niveles de humedad que impactan las cargas de refrigeración. Los contratistas profesionales de HVAC usan cálculos Manual J (desarrollados por ACCA) para análisis preciso de carga, pero esta calculadora proporciona una excelente estimación para selección de equipo y presupuesto."
        },
        "considerations": {
          "title": "Factores Clave de Dimensionamiento",
          "items": [
            {
              "text": "Unidades sobredimensionadas enfrían muy rápido sin deshumidificar apropiadamente, llevando a aire húmedo, riesgo de moho y ciclos frecuentes de encendido/apagado que desperdician energía y acortan la vida del equipo.",
              "type": "warning"
            },
            {
              "text": "Unidades subdimensionadas funcionan continuamente sin alcanzar la temperatura deseada, consumiendo energía excesiva y fallando en mantener comodidad en los días más calientes o fríos.",
              "type": "warning"
            },
            {
              "text": "Las ventanas son la mayor fuente de ganancia de calor en la mayoría de cuartos. Ventanas de doble panel con vidrio Low-E pueden reducir la ganancia de calor solar en 25-50% comparado con ventanas de panel simple.",
              "type": "info"
            },
            {
              "text": "El aislamiento se clasifica por valor R. Aislamiento de ático de R-38 a R-60 se recomienda para la mayoría de zonas climáticas de EE.UU., mientras que las paredes deben tener R-13 a R-21.",
              "type": "info"
            },
            {
              "text": "Los ventiladores de techo no reducen la temperatura del cuarto, pero te permiten ajustar el termostato 2-3°F más alto mientras mantienes el mismo nivel de comodidad, reduciendo el uso de energía en 10-15%.",
              "type": "info"
            },
            {
              "text": "Las pérdidas en ductos en espacios no acondicionados (áticos, sótanos) pueden desperdiciar 20-30% del aire acondicionado. Sellar y aislar ductos es una de las mejoras del hogar con mayor retorno de inversión.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Tipos de Unidades AC por BTU",
          "items": [
            {
              "text": "AC de Ventana (5,000-15,000 BTU): Mejor para cuartos individuales. Opción más económica. Instalación DIY fácil. Ideal para apartamentos y dormitorios.",
              "type": "info"
            },
            {
              "text": "AC Portátil (8,000-14,000 BTU): Colocación flexible, sin instalación permanente. Menos eficiente que unidades de ventana. Bueno para cuartos donde no se permiten unidades de ventana.",
              "type": "info"
            },
            {
              "text": "Mini-Split Sin Ductos (9,000-36,000 BTU): Altamente eficiente, operación silenciosa, control por zonas. Costo inicial más alto pero menor costo operativo. Ideal para adiciones y renovaciones.",
              "type": "info"
            },
            {
              "text": "AC Central (24,000-60,000 BTU): Refrigeración de toda la casa a través de ductos. Más común en casas de EE.UU. Requiere instalación profesional y ductos existentes.",
              "type": "info"
            },
            {
              "text": "Bomba de Calor (12,000-60,000 BTU): Proporciona calefacción y refrigeración. 2-3× más eficiente que calefacción eléctrica por resistencia. Cada vez más popular incluso en climas fríos.",
              "type": "info"
            },
            {
              "text": "1 tonelada de refrigeración = 12,000 BTU/hr. Las unidades AC residenciales típicamente vienen en incrementos de media tonelada: 1, 1.5, 2, 2.5, 3, 3.5, 4, y 5 toneladas.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo BTU",
          "description": "Ejemplos paso a paso para cuartos comunes",
          "examples": [
            {
              "title": "Dormitorio Estándar (12×14 pies, techo de 8 pies)",
              "steps": [
                "Área del cuarto = 12 × 14 = 168 pies²",
                "BTU base = 168 × 20 = 3,360 BTU",
                "Ajuste de techo: 8 pies (estándar) → sin ajuste",
                "Exposición solar: Promedio → ×1.0 (sin cambio)",
                "Aislamiento: Promedio → ×1.0 (sin cambio)",
                "Ocupantes: 2 personas (estándar) → sin BTU extra",
                "Ventanas: 2 ventanas (estándar) → sin BTU extra",
                "Tipo de cuarto: Dormitorio → sin modificador"
              ],
              "result": "Recomendado: ~3,360 BTU. Una unidad AC de ventana de 5,000 BTU sería apropiada."
            },
            {
              "title": "Cocina Grande (16×20 pies, techo de 9 pies, sol intenso)",
              "steps": [
                "Área del cuarto = 16 × 20 = 320 pies²",
                "BTU base = 320 × 20 = 6,400 BTU",
                "Techo: 9 pies → +12.5% = +800 BTU",
                "Exposición solar: Intensa → +10% = +720 BTU",
                "Modificador de cocina: +4,000 BTU (calor de electrodomésticos)",
                "Ocupantes: 3 personas → +600 BTU (1 sobre estándar)",
                "Ventanas: 4 → +2,000 BTU (2 sobre estándar)"
              ],
              "result": "Recomendado: ~14,520 BTU. Una unidad de 15,000 BTU o mini-split de 1.5 toneladas sería ideal."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos BTU necesito por pie cuadrado?",
          "answer": "La regla general es 20 BTU por pie cuadrado para refrigeración, asumiendo techos estándar de 8 pies y aislamiento promedio. Sin embargo, esto puede variar de 15 BTU/pie² para cuartos bien aislados y sombreados a 40 BTU/pie² para espacios mal aislados y expuestos al sol como terrazas acristaladas. Factores como altura del techo, número de ventanas, ocupación y zona climática afectan el número real. Esta calculadora aplica esas correcciones automáticamente para que obtengas una estimación precisa en lugar de una suposición aproximada."
        },
        {
          "question": "¿Qué pasa si compro una unidad de AC que es demasiado grande?",
          "answer": "Una unidad de AC sobredimensionada enfriará el cuarto demasiado rápido sin remover apropiadamente la humedad del aire. Esto lleva a ciclos cortos (encendido/apagado frecuente), lo que desperdicia energía, incrementa el desgaste del compresor, causa temperaturas desiguales y crea un ambiente húmedo e incómodo. Las unidades dimensionadas apropiadamente funcionan en ciclos más largos que deshumidifican efectivamente mientras mantienen temperaturas consistentes."
        },
        {
          "question": "¿Cómo convierto BTU a tonelaje de AC?",
          "answer": "Divide la clasificación BTU entre 12,000 para obtener el tonelaje. Por ejemplo, 24,000 BTU ÷ 12,000 = 2 toneladas. Las unidades AC residenciales típicamente vienen en incrementos de media tonelada: 1 tonelada (12,000 BTU), 1.5 toneladas (18,000 BTU), 2 toneladas (24,000 BTU), 2.5 toneladas (30,000 BTU), 3 toneladas (36,000 BTU), y así sucesivamente hasta 5 toneladas (60,000 BTU) para casas más grandes."
        },
        {
          "question": "¿La altura del techo afecta los requerimientos de BTU?",
          "answer": "Sí, significativamente. Los cálculos BTU estándar asumen techos de 8 pies. Por cada pie sobre 8 pies, deberías agregar aproximadamente 12.5% más BTU. Un techo de 10 pies tiene 25% más volumen de aire que un techo de 8 pies en la misma superficie, significando que el AC debe acondicionar sustancialmente más aire. Cuartos con techos catedral o abovedados pueden necesitar ajustes aún mayores."
        },
        {
          "question": "¿Debo calcular BTU para cada cuarto por separado?",
          "answer": "Sí, para el dimensionamiento más preciso. Cada cuarto tiene características diferentes — número de ventanas, exposición solar, ocupación y fuentes de calor varían. Calcula BTU para cada cuarto individualmente, especialmente si usas mini-splits sin ductos o unidades AC de ventana. Para sistemas AC centrales, suma los BTU de todos los cuartos y agrega 10-20% por pérdidas en ductos, luego selecciona un sistema cercano a ese total."
        },
        {
          "question": "¿Cómo afecta la calidad del aislamiento mis costos de calefacción y refrigeración?",
          "answer": "La calidad del aislamiento tiene uno de los mayores impactos en los requerimientos BTU. Casas con aislamiento pobre pueden necesitar 25% o más BTU adicionales comparado con la línea base. Mejorar de aislamiento pobre a bueno (ej. agregar aislamiento de ático de R-11 a R-38) puede reducir costos de calefacción y refrigeración en 20-30%. Construcción nueva con aislamiento de alto rendimiento y sellado de aire puede reducir las necesidades BTU en 15% bajo los cálculos estándar."
        }
      ],
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
      "name": "Calculadora de BTU",
      "slug": "calculadora-btu",
      "subtitle": "Calcule a capacidade de resfriamento ou aquecimento em BTU necessária para qualquer ambiente baseado no tamanho, isolamento, exposição solar e ocupação.",
      "breadcrumb": "Calc BTU",
      "seo": {
        "title": "Calculadora de BTU - Estimador de Tamanho para Ar Condicionado e Aquecimento | Ferramenta Gratuita",
        "description": "Calcule quantos BTUs você precisa para resfriar ou aquecer qualquer ambiente. Insira as dimensões do ambiente, isolamento, exposição solar e ocupação para uma recomendação precisa de dimensionamento de ar condicionado ou aquecedor.",
        "shortDescription": "Estime as necessidades de BTU para ar condicionado e aquecimento baseado no tamanho e condições do ambiente.",
        "keywords": [
          "calculadora de btu",
          "calculadora de tamanho de ar condicionado",
          "quantos btu preciso",
          "dimensionamento de ar condicionado",
          "calculadora hvac",
          "calculadora de capacidade de refrigeração",
          "calculadora de btu para aquecimento",
          "estimador de btu para ambiente"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "calculationType": {
          "label": "Tipo de Cálculo",
          "helpText": "Escolha se você precisa de capacidade de resfriamento (ar condicionado) ou aquecimento",
          "options": {
            "cooling": "Resfriamento",
            "heating": "Aquecimento"
          }
        },
        "roomLength": {
          "label": "Comprimento do Ambiente",
          "helpText": "Meça a parede mais longa do ambiente"
        },
        "roomWidth": {
          "label": "Largura do Ambiente",
          "helpText": "Meça a parede perpendicular ao comprimento"
        },
        "ceilingHeight": {
          "label": "Altura do Teto",
          "helpText": "O padrão é 2,4 m. Tetos mais altos requerem mais BTU para climatizar o volume de ar extra"
        },
        "insulationQuality": {
          "label": "Qualidade do Isolamento",
          "helpText": "Casas mais novas (pós-2000) tipicamente têm bom isolamento. Casas mais antigas podem ter isolamento pobre",
          "options": {
            "poor": "Pobre (casa antiga, sem melhorias)",
            "average": "Média (construção padrão)",
            "good": "Boa (casa nova, melhorada)",
            "excellent": "Excelente (alto valor R, vedada)"
          }
        },
        "sunExposure": {
          "label": "Exposição Solar",
          "helpText": "Quanto sol direto o ambiente recebe durante as horas de pico?",
          "options": {
            "heavyShade": "Muita Sombra (face norte, árvores)",
            "average": "Média (exposição mista)",
            "highSun": "Muito Sol (face sul/oeste, janelas grandes)"
          }
        },
        "numberOfWindows": {
          "label": "Número de Janelas",
          "helpText": "Conte todas as janelas no ambiente. Mais janelas aumentam o ganho/perda de calor",
          "suffix": "janelas"
        },
        "numberOfOccupants": {
          "label": "Ocupantes Regulares",
          "helpText": "Número de pessoas que tipicamente usam este ambiente. Cada pessoa adiciona ~600 BTU de calor corporal",
          "suffix": "pessoas"
        },
        "roomType": {
          "label": "Tipo de Ambiente",
          "helpText": "Cozinhas precisam de resfriamento extra para eletrodomésticos. Sótãos e varandas fechadas têm cargas térmicas maiores",
          "options": {
            "bedroom": "Quarto",
            "livingRoom": "Sala de Estar",
            "kitchen": "Cozinha",
            "office": "Escritório",
            "bathroom": "Banheiro",
            "basement": "Porão",
            "attic": "Sótão / Quarto Extra",
            "sunroom": "Varanda Fechada / Pátio Coberto"
          }
        },
        "showAdvanced": {
          "label": "Mostrar Opções Avançadas",
          "helpText": "Refine sua estimativa com zona climática, paredes externas e custo energético"
        },
        "climateZone": {
          "label": "Zona Climática",
          "helpText": "Selecione o clima mais próximo da sua localização para dimensionamento preciso",
          "options": {
            "hotHumid": "Quente e Úmido (Rio, Salvador, trópicos)",
            "hotDry": "Quente e Seco (interior do Nordeste)",
            "moderate": "Moderado (São Paulo, Belo Horizonte)",
            "cool": "Frio (Sul do Brasil, serra)",
            "cold": "Muito Frio (serra gaúcha)",
            "veryCold": "Extremamente Frio (regiões montanhosas)"
          }
        },
        "numberOfExteriorWalls": {
          "label": "Paredes Externas",
          "helpText": "Paredes que dão para fora (não compartilhadas com outros ambientes). Mais paredes externas aumentam a transferência de calor",
          "suffix": "paredes"
        },
        "estimateEnergyCost": {
          "label": "Estimar Custo Energético Mensal",
          "helpText": "Calcule o custo aproximado mensal de eletricidade para operar o ar condicionado ou aquecedor"
        },
        "electricityRate": {
          "label": "Tarifa de Eletricidade",
          "helpText": "Seu custo por quilowatt-hora. Verifique sua conta de luz para esta tarifa"
        },
        "hoursPerDay": {
          "label": "Horas de Uso Por Dia",
          "helpText": "Horas médias por dia que o ar condicionado ou aquecedor funciona",
          "suffix": "hrs/dia"
        }
      },
      "results": {
        "requiredBTU": {
          "label": "BTU Recomendado"
        },
        "btuRange": {
          "label": "Faixa de Conforto"
        },
        "tonnage": {
          "label": "Tonelagem do Ar"
        },
        "roomArea": {
          "label": "Área do Ambiente"
        },
        "roomVolume": {
          "label": "Volume do Ambiente"
        },
        "monthlyCost": {
          "label": "Custo Mensal Est."
        }
      },
      "presets": {
        "smallBedroom": {
          "label": "Quarto Pequeno",
          "description": "3,6×3,6 m, 1 janela, 1 pessoa"
        },
        "livingRoom": {
          "label": "Sala de Estar",
          "description": "6×4,5 m, 3 janelas, 4 pessoas, ensolarado"
        },
        "masterSuite": {
          "label": "Suíte Master",
          "description": "4,8×4,2 m, teto 2,7m, bom isolamento"
        },
        "homeOffice": {
          "label": "Escritório",
          "description": "3,6×3 m, ganho de calor de eletrônicos"
        },
        "sunroom": {
          "label": "Varanda Fechada",
          "description": "4,2×3,6 m, 6 janelas, muito sol, isolamento pobre"
        }
      },
      "values": {
        "btuHr": "BTU/h",
        "tons": "toneladas",
        "ton": "tonelada",
        "sqft": "m²",
        "cuft": "m³",
        "month": "/mês",
        "ft": "m"
      },
      "formats": {
        "summary": "Seu ambiente precisa de aproximadamente {btu} BTU/h para {type}. Tamanho recomendado do ar: unidade de {tonnage} tonelada."
      },
      "infoCards": {
        "sizing": {
          "title": "Resultados do Dimensionamento",
          "items": [
            {
              "label": "BTU Recomendado",
              "valueKey": "requiredBTU"
            },
            {
              "label": "Faixa de Conforto",
              "valueKey": "btuRange"
            },
            {
              "label": "Tonelagem do Ar",
              "valueKey": "tonnage"
            },
            {
              "label": "Área do Ambiente",
              "valueKey": "roomArea"
            }
          ]
        },
        "breakdown": {
          "title": "Análise da Carga",
          "items": [
            {
              "label": "Carga Base",
              "valueKey": "baseLoad"
            },
            {
              "label": "Ajuste do Teto",
              "valueKey": "ceilingAdj"
            },
            {
              "label": "Carga dos Ocupantes",
              "valueKey": "occupantLoad"
            },
            {
              "label": "Ajuste Janelas e Sol",
              "valueKey": "windowSunAdj"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Dimensionamento",
          "items": [
            "Não superdimensione — um ar condicionado muito grande fará ciclos curtos, causando controle de umidade ruim e contas de energia mais altas.",
            "Verifique primeiro seu isolamento. Melhorar o isolamento geralmente é mais econômico que comprar uma unidade de ar maior.",
            "Vede vazamentos de ar ao redor de janelas, portas e dutos antes de dimensionar. Vazamentos podem adicionar 20-30% às suas necessidades de resfriamento.",
            "Agende manutenção anual do HVAC para manter seu sistema funcionando com eficiência máxima e prolongar sua vida útil."
          ]
        }
      },
      "chart": {
        "title": "Análise da Carga de BTU",
        "xLabel": "Fator",
        "yLabel": "BTU",
        "series": {
          "btu": "Impacto BTU"
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é BTU?",
          "content": "BTU (British Thermal Unit) é uma unidade padrão de energia usada para medir saída térmica. Especificamente, um BTU é a quantidade de energia necessária para elevar a temperatura de uma libra de água em 1°F ao nível do mar. No contexto de HVAC (Aquecimento, Ventilação e Ar Condicionado), classificações BTU/h indicam quanto calor um ar condicionado pode remover de um ambiente por hora, ou quanto calor um aquecedor pode produzir por hora. Quanto maior a classificação BTU, mais poderosa é a capacidade de aquecimento ou resfriamento da unidade. Para aplicações residenciais, ares condicionados tipicamente variam de 5.000 BTU para ambientes pequenos até 60.000+ BTU para sistemas centrais de casa inteira. Entender os requisitos de BTU do seu ambiente garante que você selecione equipamentos que mantenham temperaturas confortáveis sem desperdiçar energia ou dinheiro."
        },
        "howItWorks": {
          "title": "Como Funciona o Dimensionamento de Ar e Aquecedor",
          "content": "O dimensionamento adequado de HVAC começa com o cálculo da carga térmica do seu ambiente — a quantidade de calor que entra (para resfriamento) ou escapa (para aquecimento) do espaço. O padrão da indústria começa com uma linha base de 20-25 BTU por metro quadrado, depois aplica fatores de correção para condições do mundo real. A altura do teto importa porque ambientes mais altos contêm mais volume de ar para climatizar. Exposição solar através de janelas adiciona ganho significativo de calor, especialmente em paredes voltadas para sul e oeste durante o verão. Ocupantes geram calor corporal (aproximadamente 600 BTU por pessoa), e eletrodomésticos de cozinha podem adicionar 4.000+ BTU de ganho de calor. A qualidade do isolamento determina quão rapidamente o ar climatizado se perde para o exterior. A zona climática afeta tanto a diferença de temperatura que seu sistema deve superar quanto os níveis de umidade que impactam cargas de resfriamento. Empreiteiros profissionais de HVAC usam cálculos Manual J (desenvolvidos pela ACCA) para análise precisa de carga, mas esta calculadora fornece uma excelente estimativa para seleção de equipamentos e orçamento."
        },
        "considerations": {
          "title": "Fatores Chave de Dimensionamento",
          "items": [
            {
              "text": "Unidades superdimensionadas resfriam muito rapidamente sem desumidificar adequadamente, levando ao ar abafado, risco de mofo e ciclagem frequente liga/desliga que desperdiça energia e encurta a vida do equipamento.",
              "type": "warning"
            },
            {
              "text": "Unidades subdimensionadas funcionam continuamente sem atingir a temperatura desejada, consumindo energia excessiva e falhando em manter conforto nos dias mais quentes ou frios.",
              "type": "warning"
            },
            {
              "text": "Janelas são a maior fonte de ganho de calor na maioria dos ambientes. Janelas de vidro duplo, Low-E podem reduzir o ganho de calor solar em 25-50% comparado a janelas de vidro simples.",
              "type": "info"
            },
            {
              "text": "Isolamento é classificado por valor R. Isolamento de sótão de R-38 a R-60 é recomendado para a maioria das zonas climáticas, enquanto paredes devem ter R-13 a R-21.",
              "type": "info"
            },
            {
              "text": "Ventiladores de teto não reduzem a temperatura do ambiente, mas permitem que você ajuste o termostato 2-3°C mais alto mantendo o mesmo nível de conforto, reduzindo o uso de energia em 10-15%.",
              "type": "info"
            },
            {
              "text": "Perdas em dutos em espaços não climatizados (sótãos, porões) podem desperdiçar 20-30% do ar climatizado. Vedar e isolar dutos é uma das melhorias residenciais com maior ROI.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Tipos de Unidades de Ar por BTU",
          "items": [
            {
              "text": "Ar de Janela (5.000-15.000 BTU): Melhor para ambientes únicos. Opção mais acessível. Instalação DIY fácil. Ideal para apartamentos e quartos.",
              "type": "info"
            },
            {
              "text": "Ar Portátil (8.000-14.000 BTU): Posicionamento flexível, sem instalação permanente. Menos eficiente que unidades de janela. Bom para ambientes onde ares de janela não são permitidos.",
              "type": "info"
            },
            {
              "text": "Mini-Split sem Dutos (9.000-36.000 BTU): Altamente eficiente, operação silenciosa, controle por zona. Custo inicial mais alto mas custo operacional menor. Ideal para adições e reformas.",
              "type": "info"
            },
            {
              "text": "Ar Central (24.000-60.000 BTU): Resfriamento de casa inteira através de dutos. Mais comum em casas. Requer instalação profissional e dutos existentes.",
              "type": "info"
            },
            {
              "text": "Bomba de Calor (12.000-60.000 BTU): Fornece aquecimento e resfriamento. 2-3× mais eficiente que aquecimento elétrico resistivo. Cada vez mais popular mesmo em climas frios.",
              "type": "info"
            },
            {
              "text": "1 tonelada de resfriamento = 12.000 BTU/h. Unidades de ar residenciais tipicamente vêm em incrementos de 0,5 tonelada: 1, 1,5, 2, 2,5, 3, 3,5, 4 e 5 toneladas.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de BTU",
          "description": "Exemplos passo a passo para ambientes comuns",
          "examples": [
            {
              "title": "Quarto Padrão (3,6×4,2 m, teto 2,4m)",
              "steps": [
                "Área do ambiente = 3,6 × 4,2 = 15,1 m²",
                "BTU base = 15,1 × 215 = 3.247 BTU (conversão para m²)",
                "Ajuste do teto: 2,4 m (padrão) → sem ajuste",
                "Exposição solar: Média → ×1,0 (sem mudança)",
                "Isolamento: Médio → ×1,0 (sem mudança)",
                "Ocupantes: 2 pessoas (padrão) → sem BTU extra",
                "Janelas: 2 janelas (padrão) → sem BTU extra",
                "Tipo de ambiente: Quarto → sem modificador"
              ],
              "result": "Recomendado: ~3.247 BTU. Uma unidade de ar de janela de 5.000 BTU seria apropriada."
            },
            {
              "title": "Cozinha Grande (4,8×6 m, teto 2,7m, muito sol)",
              "steps": [
                "Área do ambiente = 4,8 × 6 = 28,8 m²",
                "BTU base = 28,8 × 215 = 6.192 BTU",
                "Teto: 2,7 m → +12,5% = +774 BTU",
                "Exposição solar: Pesada → +10% = +697 BTU",
                "Modificador cozinha: +4.000 BTU (calor de eletrodomésticos)",
                "Ocupantes: 3 pessoas → +600 BTU (1 acima do padrão)",
                "Janelas: 4 → +2.000 BTU (2 acima do padrão)"
              ],
              "result": "Recomendado: ~14.263 BTU. Uma unidade de 15.000 BTU ou mini-split de 1,5 tonelada seria ideal."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos BTU preciso por metro quadrado?",
          "answer": "A regra geral é 215 BTU por metro quadrado para resfriamento, assumindo tetos padrão de 2,4 metros e isolamento médio. No entanto, isso pode variar de 160 BTU/m² para ambientes bem isolados e sombreados até 430 BTU/m² para espaços mal isolados e muito ensolarados como varandas fechadas. Fatores como altura do teto, número de janelas, ocupação e zona climática afetam o número real. Esta calculadora aplica essas correções automaticamente para que você obtenha uma estimativa precisa ao invés de um palpite aproximado."
        },
        {
          "question": "O que acontece se eu comprar um ar condicionado muito grande?",
          "answer": "Um ar condicionado superdimensionado resfriará o ambiente muito rapidamente sem remover adequadamente a umidade do ar. Isso leva a ciclos curtos (liga/desliga frequente), que desperdiça energia, aumenta o desgaste do compressor, causa temperaturas desiguais e cria um ambiente abafado e desconfortável. Unidades dimensionadas adequadamente funcionam em ciclos mais longos que desumidificam efetivamente mantendo temperaturas consistentes."
        },
        {
          "question": "Como converter BTU para tonelagem de ar condicionado?",
          "answer": "Divida a classificação BTU por 12.000 para obter a tonelagem. Por exemplo, 24.000 BTU ÷ 12.000 = 2 toneladas. Unidades de ar residenciais tipicamente vêm em incrementos de meia tonelada: 1 tonelada (12.000 BTU), 1,5 tonelada (18.000 BTU), 2 toneladas (24.000 BTU), 2,5 toneladas (30.000 BTU), 3 toneladas (36.000 BTU), e assim por diante até 5 toneladas (60.000 BTU) para casas maiores."
        },
        {
          "question": "A altura do teto afeta os requisitos de BTU?",
          "answer": "Sim, significativamente. Cálculos padrão de BTU assumem tetos de 2,4 metros. Para cada 30 cm acima de 2,4 metros, você deve adicionar aproximadamente 12,5% mais BTU. Um teto de 3 metros tem 25% mais volume de ar que um teto de 2,4 metros na mesma área, significando que o ar deve climatizar substancialmente mais ar. Ambientes com tetos catedral ou abobadados podem precisar de ajustes ainda maiores."
        },
        {
          "question": "Devo calcular BTU para cada ambiente separadamente?",
          "answer": "Sim, para o dimensionamento mais preciso. Cada ambiente tem características diferentes — número de janelas, exposição solar, ocupação e fontes de calor variam. Calcule BTU para cada ambiente individualmente, especialmente se usar mini-splits sem dutos ou ares de janela. Para sistemas de ar central, some os BTU de todos os ambientes e adicione 10-20% para perdas em dutos, então selecione um sistema próximo a esse total."
        },
        {
          "question": "Como a qualidade do isolamento afeta meus custos de aquecimento e resfriamento?",
          "answer": "A qualidade do isolamento tem um dos maiores impactos nos requisitos de BTU. Casas com isolamento pobre podem precisar de 25% ou mais BTU adicionais comparado à linha base. Melhorar de isolamento pobre para bom (ex: adicionar isolamento no sótão de R-11 para R-38) pode reduzir custos de aquecimento e resfriamento em 20-30%. Construções novas com isolamento de alta performance e vedação a ar podem reduzir necessidades de BTU em 15% abaixo dos cálculos padrão."
        }
      ],
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
      "name": "Calculateur BTU",
      "slug": "calculateur-btu",
      "subtitle": "Calculez la capacité de refroidissement ou de chauffage BTU nécessaire pour n'importe quelle pièce en fonction de la taille, de l'isolation, de l'exposition au soleil et de l'occupation.",
      "breadcrumb": "Calc BTU",
      "seo": {
        "title": "Calculateur BTU - Estimateur de Taille Climatisation & Chauffage | Outil Gratuit",
        "description": "Calculez combien de BTU vous avez besoin pour refroidir ou chauffer n'importe quelle pièce. Entrez les dimensions, l'isolation, l'exposition au soleil et l'occupation pour une recommandation précise de dimensionnement de climatisation ou chauffage.",
        "shortDescription": "Estimez les besoins BTU pour climatisation et chauffage selon la taille et conditions de la pièce.",
        "keywords": [
          "calculateur btu",
          "calculateur taille climatisation",
          "combien de btu ai-je besoin",
          "dimensionnement climatiseur",
          "calculateur cvc",
          "calculateur capacité refroidissement",
          "calculateur btu chauffage",
          "estimateur btu pièce"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "calculationType": {
          "label": "Type de Calcul",
          "helpText": "Choisissez si vous avez besoin de refroidissement (climatisation) ou de capacité de chauffage",
          "options": {
            "cooling": "Refroidissement",
            "heating": "Chauffage"
          }
        },
        "roomLength": {
          "label": "Longueur de la Pièce",
          "helpText": "Mesurez le mur le plus long de la pièce"
        },
        "roomWidth": {
          "label": "Largeur de la Pièce",
          "helpText": "Mesurez le mur perpendiculaire à la longueur"
        },
        "ceilingHeight": {
          "label": "Hauteur de Plafond",
          "helpText": "La norme est 2,4 m. Les plafonds plus hauts nécessitent plus de BTU pour conditionner le volume d'air supplémentaire"
        },
        "insulationQuality": {
          "label": "Qualité d'Isolation",
          "helpText": "Les maisons récentes (post-2000) ont généralement une bonne isolation. Les anciennes maisons peuvent avoir une isolation déficiente",
          "options": {
            "poor": "Médiocre (ancienne maison, pas d'améliorations)",
            "average": "Moyenne (construction standard)",
            "good": "Bonne (maison récente, améliorée)",
            "excellent": "Excellente (valeur R élevée, étanche)"
          }
        },
        "sunExposure": {
          "label": "Exposition au Soleil",
          "helpText": "Combien de lumière directe du soleil la pièce reçoit-elle pendant les heures de pointe ?",
          "options": {
            "heavyShade": "Très Ombragé (orienté nord, arbres)",
            "average": "Moyenne (exposition mixte)",
            "highSun": "Très Ensoleillé (orienté sud/ouest, grandes fenêtres)"
          }
        },
        "numberOfWindows": {
          "label": "Nombre de Fenêtres",
          "helpText": "Comptez toutes les fenêtres de la pièce. Plus de fenêtres augmentent le gain/perte de chaleur",
          "suffix": "fenêtres"
        },
        "numberOfOccupants": {
          "label": "Occupants Réguliers",
          "helpText": "Nombre de personnes qui utilisent généralement cette pièce. Chaque personne ajoute ~600 BTU de chaleur corporelle",
          "suffix": "personnes"
        },
        "roomType": {
          "label": "Type de Pièce",
          "helpText": "Les cuisines ont besoin de refroidissement supplémentaire pour les appareils. Les greniers et vérandas ont des charges thermiques plus élevées",
          "options": {
            "bedroom": "Chambre",
            "livingRoom": "Salon",
            "kitchen": "Cuisine",
            "office": "Bureau",
            "bathroom": "Salle de Bain",
            "basement": "Sous-sol",
            "attic": "Grenier / Pièce Bonus",
            "sunroom": "Véranda / Patio Fermé"
          }
        },
        "showAdvanced": {
          "label": "Afficher les Options Avancées",
          "helpText": "Affinez votre estimation avec la zone climatique, les murs extérieurs et le coût énergétique"
        },
        "climateZone": {
          "label": "Zone Climatique",
          "helpText": "Sélectionnez le climat le plus proche de votre localisation pour un dimensionnement précis",
          "options": {
            "hotHumid": "Chaud & Humide (Miami, Houston, tropiques LATAM)",
            "hotDry": "Chaud & Sec (Phoenix, Las Vegas)",
            "moderate": "Modéré (Atlanta, Dallas, Charlotte)",
            "cool": "Frais (Chicago, Denver, NYC)",
            "cold": "Froid (Minneapolis, Boston)",
            "veryCold": "Très Froid (Anchorage, nord du Canada)"
          }
        },
        "numberOfExteriorWalls": {
          "label": "Murs Extérieurs",
          "helpText": "Murs qui donnent sur l'extérieur (non partagés avec d'autres pièces). Plus de murs extérieurs augmentent le transfert de chaleur",
          "suffix": "murs"
        },
        "estimateEnergyCost": {
          "label": "Estimer le Coût Énergétique Mensuel",
          "helpText": "Calculer le coût approximatif mensuel d'électricité pour faire fonctionner la climatisation ou le chauffage"
        },
        "electricityRate": {
          "label": "Tarif Électricité",
          "helpText": "Votre coût par kilowatt-heure. Vérifiez votre facture d'électricité pour ce tarif"
        },
        "hoursPerDay": {
          "label": "Heures d'Usage par Jour",
          "helpText": "Heures moyennes par jour où la climatisation ou le chauffage fonctionne",
          "suffix": "h/jour"
        }
      },
      "results": {
        "requiredBTU": {
          "label": "BTU Recommandé"
        },
        "btuRange": {
          "label": "Plage de Confort"
        },
        "tonnage": {
          "label": "Tonnage Climatisation"
        },
        "roomArea": {
          "label": "Surface Pièce"
        },
        "roomVolume": {
          "label": "Volume Pièce"
        },
        "monthlyCost": {
          "label": "Coût Mensuel Est."
        }
      },
      "presets": {
        "smallBedroom": {
          "label": "Petite Chambre",
          "description": "3,6×3,6 m, 1 fenêtre, 1 personne"
        },
        "livingRoom": {
          "label": "Salon",
          "description": "6×4,5 m, 3 fenêtres, 4 personnes, ensoleillé"
        },
        "masterSuite": {
          "label": "Suite Parentale",
          "description": "4,8×4,2 m, plafond 2,7m, bonne isolation"
        },
        "homeOffice": {
          "label": "Bureau Maison",
          "description": "3,6×3 m, gain de chaleur électronique"
        },
        "sunroom": {
          "label": "Véranda",
          "description": "4,2×3,6 m, 6 fenêtres, très ensoleillé, isolation médiocre"
        }
      },
      "values": {
        "btuHr": "BTU/h",
        "tons": "tonnes",
        "ton": "tonne",
        "sqft": "m²",
        "cuft": "m³",
        "month": "/mois",
        "ft": "m"
      },
      "formats": {
        "summary": "Votre pièce a besoin d'environ {btu} BTU/h pour le {type}. Taille de climatisation recommandée : unité de {tonnage} tonne."
      },
      "infoCards": {
        "sizing": {
          "title": "Résultats de Dimensionnement",
          "items": [
            {
              "label": "BTU Recommandé",
              "valueKey": "requiredBTU"
            },
            {
              "label": "Plage de Confort",
              "valueKey": "btuRange"
            },
            {
              "label": "Tonnage Climatisation",
              "valueKey": "tonnage"
            },
            {
              "label": "Surface Pièce",
              "valueKey": "roomArea"
            }
          ]
        },
        "breakdown": {
          "title": "Répartition de Charge",
          "items": [
            {
              "label": "Charge de Base",
              "valueKey": "baseLoad"
            },
            {
              "label": "Ajustement Plafond",
              "valueKey": "ceilingAdj"
            },
            {
              "label": "Charge Occupants",
              "valueKey": "occupantLoad"
            },
            {
              "label": "Ajust. Fenêtres & Soleil",
              "valueKey": "windowSunAdj"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Dimensionnement",
          "items": [
            "Ne surdimensionnez pas — une unité de climatisation trop grande fera du cyclage court, causant un mauvais contrôle d'humidité et des factures d'énergie plus élevées.",
            "Vérifiez d'abord votre isolation. L'amélioration de l'isolation est souvent plus rentable que l'achat d'une unité de climatisation plus grande.",
            "Scellez les fuites d'air autour des fenêtres, portes et conduits avant le dimensionnement. Les fuites peuvent ajouter 20-30% à vos besoins de refroidissement.",
            "Planifiez la maintenance annuelle CVC pour maintenir votre système au maximum d'efficacité et prolonger sa durée de vie."
          ]
        }
      },
      "chart": {
        "title": "Répartition de Charge BTU",
        "xLabel": "Facteur",
        "yLabel": "BTU",
        "series": {
          "btu": "Impact BTU"
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un BTU ?",
          "content": "Un BTU (British Thermal Unit) est une unité standard d'énergie utilisée pour mesurer la production thermique. Spécifiquement, un BTU est la quantité d'énergie nécessaire pour élever la température d'une livre d'eau de 1°F au niveau de la mer. Dans le contexte du CVC (Chauffage, Ventilation et Climatisation), les classifications BTU/h indiquent combien de chaleur un climatiseur peut retirer d'une pièce par heure, ou combien de chaleur un système de chauffage peut produire par heure. Plus la classification BTU est élevée, plus la capacité de chauffage ou de refroidissement de l'unité est puissante. Pour les applications résidentielles, les climatiseurs vont typiquement de 5 000 BTU pour les petites pièces à 60 000+ BTU pour les systèmes centraux de toute la maison."
        },
        "howItWorks": {
          "title": "Comment Fonctionne le Dimensionnement de Climatisation et Chauffage",
          "content": "Le dimensionnement CVC approprié commence par calculer la charge thermique de votre pièce — la quantité de chaleur qui entre (pour le refroidissement) ou s'échappe (pour le chauffage) de l'espace. La norme de l'industrie commence avec une base de 20-25 BTU par mètre carré, puis applique des facteurs de correction pour les conditions réelles. La hauteur de plafond compte parce que les pièces plus hautes contiennent plus de volume d'air à conditionner. L'exposition au soleil par les fenêtres ajoute un gain de chaleur significatif, surtout sur les murs orientés sud et ouest pendant l'été. Les occupants génèrent de la chaleur corporelle (environ 600 BTU par personne), et les appareils de cuisine peuvent ajouter plus de 4 000 BTU de gain de chaleur."
        },
        "considerations": {
          "title": "Facteurs Clés de Dimensionnement",
          "items": [
            {
              "text": "Les unités surdimensionnées refroidissent trop rapidement sans déshumidifier correctement, menant à un air moite, un risque de moisissure et un cyclage fréquent marche/arrêt qui gaspille l'énergie.",
              "type": "warning"
            },
            {
              "text": "Les unités sous-dimensionnées fonctionnent continuellement sans atteindre la température désirée, consommant un excès d'énergie et échouant à maintenir le confort.",
              "type": "warning"
            },
            {
              "text": "Les fenêtres sont la plus grande source de gain de chaleur dans la plupart des pièces. Les fenêtres double vitrage Low-E peuvent réduire le gain de chaleur solaire de 25-50%.",
              "type": "info"
            },
            {
              "text": "L'isolation est classée par valeur R. L'isolation de grenier de R-38 à R-60 est recommandée pour la plupart des zones climatiques, tandis que les murs devraient avoir R-13 à R-21.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Types d'Unités de Climatisation par BTU",
          "items": [
            {
              "text": "Climatisation Fenêtre (5 000-15 000 BTU) : Idéal pour les pièces individuelles. Option la plus abordable. Installation DIY facile.",
              "type": "info"
            },
            {
              "text": "Climatisation Portable (8 000-14 000 BTU) : Placement flexible, pas d'installation permanente. Moins efficace que les unités de fenêtre.",
              "type": "info"
            },
            {
              "text": "Mini-Split Sans Conduit (9 000-36 000 BTU) : Très efficace, fonctionnement silencieux, contrôle par zones. Coût initial plus élevé mais coût d'exploitation plus bas.",
              "type": "info"
            },
            {
              "text": "Climatisation Centrale (24 000-60 000 BTU) : Refroidissement de toute la maison par conduits. Plus courant dans les maisons. Nécessite installation professionnelle.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul BTU",
          "description": "Exemples étape par étape pour les pièces communes",
          "examples": [
            {
              "title": "Chambre Standard (3,6×4,2 m, plafond 2,4m)",
              "steps": [
                "Surface pièce = 3,6 × 4,2 = 15,1 m²",
                "BTU de base = 15,1 × 20 = 302 BTU",
                "Ajustement plafond : 2,4 m (standard) → pas d'ajustement",
                "Exposition soleil : Moyenne → ×1,0 (pas de changement)",
                "Isolation : Moyenne → ×1,0 (pas de changement)",
                "Occupants : 2 personnes (standard) → pas de BTU extra"
              ],
              "result": "Recommandé : ~3 020 BTU. Une unité de climatisation fenêtre de 5 000 BTU serait appropriée."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de BTU ai-je besoin par mètre carré ?",
          "answer": "La règle générale est de 20 BTU par mètre carré pour le refroidissement, en supposant des plafonds standards de 2,4 m et une isolation moyenne. Cependant, cela peut varier de 15 BTU/m² pour les pièces bien isolées et ombragées à 40 BTU/m² pour les espaces mal isolés et très ensoleillés comme les vérandas. Ce calculateur applique automatiquement ces corrections."
        },
        {
          "question": "Que se passe-t-il si j'achète une unité de climatisation trop grande ?",
          "answer": "Une unité de climatisation surdimensionnée refroidira la pièce trop rapidement sans retirer correctement l'humidité de l'air. Cela conduit au cyclage court (marche/arrêt fréquent), qui gaspille l'énergie, augmente l'usure du compresseur, cause des températures inégales et crée un environnement moite et inconfortable."
        },
        {
          "question": "Comment convertir les BTU en tonnage de climatisation ?",
          "answer": "Divisez la classification BTU par 12 000 pour obtenir le tonnage. Par exemple, 24 000 BTU ÷ 12 000 = 2 tonnes. Les unités de climatisation résidentielles viennent généralement par incréments d'une demi-tonne : 1 tonne (12 000 BTU), 1,5 tonnes (18 000 BTU), 2 tonnes (24 000 BTU), etc."
        },
        {
          "question": "La hauteur de plafond affecte-t-elle les exigences BTU ?",
          "answer": "Oui, significativement. Les calculs BTU standard supposent des plafonds de 2,4 m. Pour chaque 30 cm au-dessus de 2,4 m, vous devriez ajouter environ 12,5% de BTU supplémentaires. Un plafond de 3 m a 25% plus de volume d'air qu'un plafond de 2,4 m dans la même superficie."
        },
        {
          "question": "Dois-je calculer les BTU pour chaque pièce séparément ?",
          "answer": "Oui, pour le dimensionnement le plus précis. Chaque pièce a des caractéristiques différentes — nombre de fenêtres, exposition au soleil, occupation et sources de chaleur varient toutes. Calculez les BTU pour chaque pièce individuellement, surtout si vous utilisez des mini-splits sans conduit ou des unités de climatisation de fenêtre."
        },
        {
          "question": "Comment la qualité d'isolation affecte-t-elle mes coûts de chauffage et refroidissement ?",
          "answer": "La qualité d'isolation a l'un des plus grands impacts sur les exigences BTU. Les maisons avec une isolation médiocre peuvent nécessiter 25% ou plus de BTU supplémentaires comparé à la base. L'amélioration de l'isolation médiocre à bonne peut réduire les coûts de chauffage et refroidissement de 20-30%."
        }
      ],
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
      "name": "BTU Rechner",
      "slug": "btu-rechner",
      "subtitle": "Berechnen Sie die benötigte BTU-Kühl- oder Heizleistung für jeden Raum basierend auf Größe, Dämmung, Sonneneinstrahlung und Belegung.",
      "breadcrumb": "BTU Rechner",
      "seo": {
        "title": "BTU Rechner - Klimaanlage & Heizung Größenschätzer | Kostenloses Tool",
        "description": "Berechnen Sie wie viele BTUs Sie zum Kühlen oder Heizen eines Raumes benötigen. Geben Sie Raumabmessungen, Dämmung, Sonneneinstrahlung und Belegung ein für eine genaue Klimaanlage oder Heizungsempfehlung.",
        "shortDescription": "Schätzen Sie BTU-Bedarf für Klimaanlage und Heizung basierend auf Raumgröße und Bedingungen.",
        "keywords": [
          "btu rechner",
          "klimaanlage größenrechner",
          "wie viele btu brauche ich",
          "klimaanlage dimensionierung",
          "hvac rechner",
          "kühlleistung rechner",
          "heizung btu rechner",
          "raum btu schätzer"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "calculationType": {
          "label": "Berechnungsart",
          "helpText": "Wählen Sie ob Sie Kühl- (Klimaanlage) oder Heizleistung benötigen",
          "options": {
            "cooling": "Kühlung",
            "heating": "Heizung"
          }
        },
        "roomLength": {
          "label": "Raumlänge",
          "helpText": "Messen Sie die längste Wand des Raumes"
        },
        "roomWidth": {
          "label": "Raumbreite",
          "helpText": "Messen Sie die Wand senkrecht zur Länge"
        },
        "ceilingHeight": {
          "label": "Deckenhöhe",
          "helpText": "Standard sind 2,4 m. Höhere Decken benötigen mehr BTU um das zusätzliche Luftvolumen zu konditionieren"
        },
        "insulationQuality": {
          "label": "Dämmqualität",
          "helpText": "Neuere Häuser (nach 2000) haben typischerweise gute Dämmung. Ältere Häuser können schlechte Dämmung haben",
          "options": {
            "poor": "Schlecht (altes Haus, keine Modernisierung)",
            "average": "Durchschnittlich (Standard Bauweise)",
            "good": "Gut (neues Haus, modernisiert)",
            "excellent": "Ausgezeichnet (hoher R-Wert, versiegelt)"
          }
        },
        "sunExposure": {
          "label": "Sonneneinstrahlung",
          "helpText": "Wie viel direktes Sonnenlicht erhält der Raum während der Spitzenzeiten?",
          "options": {
            "heavyShade": "Starker Schatten (Nordseite, Bäume)",
            "average": "Durchschnittlich (gemischte Ausrichtung)",
            "highSun": "Starke Sonne (Süd-/Westseite, große Fenster)"
          }
        },
        "numberOfWindows": {
          "label": "Anzahl Fenster",
          "helpText": "Zählen Sie alle Fenster im Raum. Mehr Fenster erhöhen Wärmegewinn/-verlust",
          "suffix": "Fenster"
        },
        "numberOfOccupants": {
          "label": "Regelmäßige Bewohner",
          "helpText": "Anzahl Personen die diesen Raum typischerweise nutzen. Jede Person fügt ~600 BTU Körperwärme hinzu",
          "suffix": "Personen"
        },
        "roomType": {
          "label": "Raumtyp",
          "helpText": "Küchen benötigen extra Kühlung für Geräte. Dachböden und Wintergärten haben höhere Wärmelasten",
          "options": {
            "bedroom": "Schlafzimmer",
            "livingRoom": "Wohnzimmer",
            "kitchen": "Küche",
            "office": "Heimbüro",
            "bathroom": "Badezimmer",
            "basement": "Keller",
            "attic": "Dachboden / Zusatzzimmer",
            "sunroom": "Wintergarten / Überdachte Terrasse"
          }
        },
        "showAdvanced": {
          "label": "Erweiterte Optionen anzeigen",
          "helpText": "Verfeinern Sie Ihre Schätzung mit Klimazone, Außenwänden und Energiekosten"
        },
        "climateZone": {
          "label": "Klimazone",
          "helpText": "Wählen Sie das Klima das Ihrem Standort am nächsten kommt für genaue Dimensionierung",
          "options": {
            "hotHumid": "Heiß & Feucht (Miami, Houston, tropisches Lateinamerika)",
            "hotDry": "Heiß & Trocken (Phoenix, Las Vegas)",
            "moderate": "Gemäßigt (Atlanta, Dallas, Charlotte)",
            "cool": "Kühl (Chicago, Denver, NYC)",
            "cold": "Kalt (Minneapolis, Boston)",
            "veryCold": "Sehr kalt (Anchorage, Nordkanada)"
          }
        },
        "numberOfExteriorWalls": {
          "label": "Außenwände",
          "helpText": "Wände die nach außen zeigen (nicht mit anderen Räumen geteilt). Mehr Außenwände erhöhen Wärmeübertragung",
          "suffix": "Wände"
        },
        "estimateEnergyCost": {
          "label": "Monatliche Energiekosten schätzen",
          "helpText": "Berechnen Sie ungefähre monatliche Stromkosten für Betrieb der Klimaanlage oder Heizung"
        },
        "electricityRate": {
          "label": "Stromtarif",
          "helpText": "Ihre Kosten pro Kilowattstunde. Prüfen Sie Ihre Stromrechnung für diesen Tarif"
        },
        "hoursPerDay": {
          "label": "Nutzungsstunden pro Tag",
          "helpText": "Durchschnittliche Stunden pro Tag an denen Klimaanlage oder Heizung läuft",
          "suffix": "Std/Tag"
        }
      },
      "results": {
        "requiredBTU": {
          "label": "Empfohlene BTU"
        },
        "btuRange": {
          "label": "Komfortbereich"
        },
        "tonnage": {
          "label": "Klimaanlagen-Tonnage"
        },
        "roomArea": {
          "label": "Raumfläche"
        },
        "roomVolume": {
          "label": "Raumvolumen"
        },
        "monthlyCost": {
          "label": "Geschätzte monatliche Kosten"
        }
      },
      "presets": {
        "smallBedroom": {
          "label": "Kleines Schlafzimmer",
          "description": "3,7×3,7 m, 1 Fenster, 1 Person"
        },
        "livingRoom": {
          "label": "Wohnzimmer",
          "description": "6×4,5 m, 3 Fenster, 4 Personen, sonnig"
        },
        "masterSuite": {
          "label": "Hauptschlafzimmer",
          "description": "4,9×4,3 m, 2,7m Decke, gute Dämmung"
        },
        "homeOffice": {
          "label": "Heimbüro",
          "description": "3,7×3 m, Elektronik-Wärmeabgabe"
        },
        "sunroom": {
          "label": "Wintergarten",
          "description": "4,3×3,7 m, 6 Fenster, starke Sonne, schlechte Dämmung"
        }
      },
      "values": {
        "btuHr": "BTU/Std",
        "tons": "Tonnen",
        "ton": "Tonne",
        "sqft": "m²",
        "cuft": "m³",
        "month": "/Monat",
        "ft": "m"
      },
      "formats": {
        "summary": "Ihr Raum benötigt etwa {btu} BTU/Std für {type}. Empfohlene Klimaanlagen-Größe: {tonnage} Tonnen-Einheit."
      },
      "infoCards": {
        "sizing": {
          "title": "Dimensionierungsergebnisse",
          "items": [
            {
              "label": "Empfohlene BTU",
              "valueKey": "requiredBTU"
            },
            {
              "label": "Komfortbereich",
              "valueKey": "btuRange"
            },
            {
              "label": "Klimaanlagen-Tonnage",
              "valueKey": "tonnage"
            },
            {
              "label": "Raumfläche",
              "valueKey": "roomArea"
            }
          ]
        },
        "breakdown": {
          "title": "Lastaufschlüsselung",
          "items": [
            {
              "label": "Grundlast",
              "valueKey": "baseLoad"
            },
            {
              "label": "Deckenanpassung",
              "valueKey": "ceilingAdj"
            },
            {
              "label": "Personenlast",
              "valueKey": "occupantLoad"
            },
            {
              "label": "Fenster & Sonne Anp.",
              "valueKey": "windowSunAdj"
            }
          ]
        },
        "tips": {
          "title": "Dimensionierungstipps",
          "items": [
            "Überdimensionieren Sie nicht — eine zu große Klimaanlage wird kurz takten, was zu schlechter Feuchtigkeitskontrolle und höheren Energierechnungen führt.",
            "Prüfen Sie zuerst Ihre Dämmung. Dämmung zu verbessern ist oft kosteneffektiver als eine größere Klimaanlage zu kaufen.",
            "Dichten Sie Luftlecks um Fenster, Türen und Kanäle ab bevor Sie dimensionieren. Lecks können 20-30% zu Ihrem Kühlbedarf hinzufügen.",
            "Planen Sie jährliche HLK-Wartung um Ihr System bei Spitzeneffizienz laufen zu lassen und die Lebensdauer zu verlängern."
          ]
        }
      },
      "chart": {
        "title": "BTU Lastaufschlüsselung",
        "xLabel": "Faktor",
        "yLabel": "BTU",
        "series": {
          "btu": "BTU Auswirkung"
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist eine BTU?",
          "content": "Eine BTU (British Thermal Unit) ist eine Standardeinheit der Energie zur Messung der Wärmeabgabe. Spezifisch ist eine BTU die Energiemenge die benötigt wird um die Temperatur von einem Pfund Wasser um 1°F auf Meereshöhe zu erhöhen. Im Kontext von HLK (Heizung, Lüftung und Klimatisierung) geben BTU/Std-Bewertungen an wie viel Wärme eine Klimaanlage pro Stunde aus einem Raum entfernen kann, oder wie viel Wärme ein Ofen pro Stunde produzieren kann. Je höher die BTU-Bewertung, desto stärker die Heiz- oder Kühlleistung der Einheit. Für Wohnanwendungen reichen Klimaanlagen typischerweise von 5.000 BTU für kleine Räume bis 60.000+ BTU für ganze Haus-Zentralsysteme. Das Verständnis der BTU-Anforderungen Ihres Raumes stellt sicher dass Sie Ausrüstung wählen die komfortable Temperaturen aufrechterhält ohne Energie oder Geld zu verschwenden."
        },
        "howItWorks": {
          "title": "Wie Klimaanlage und Heizung Dimensionierung funktioniert",
          "content": "Ordnungsgemäße HLK-Dimensionierung beginnt mit der Berechnung der thermischen Last Ihres Raumes — die Wärmemenge die in den Raum eintritt (für Kühlung) oder entweicht (für Heizung). Der Industriestandard beginnt mit einer Grundlinie von 20-25 BTU pro Quadratmeter, wendet dann Korrekturfaktoren für reale Bedingungen an. Deckenhöhe ist wichtig weil höhere Räume mehr Luftvolumen zum Konditionieren enthalten. Sonneneinstrahlung durch Fenster fügt signifikanten Wärmegewinn hinzu, besonders an Süd- und Westwänden im Sommer. Bewohner erzeugen Körperwärme (etwa 600 BTU pro Person), und Küchengeräte können 4.000+ BTU Wärmegewinn hinzufügen. Dämmqualität bestimmt wie schnell konditionierte Luft nach außen verloren geht. Klimazone beeinflusst sowohl den Temperaturunterschied den Ihr System überwinden muss als auch Feuchtigkeitsniveaus die Kühllasten beeinflussen. Professionelle HLK-Installateure verwenden Manual J Berechnungen (entwickelt von ACCA) für präzise Lastanalyse, aber dieser Rechner bietet eine ausgezeichnete Schätzung für Geräteauswahl und Budgetierung."
        },
        "considerations": {
          "title": "Wichtige Dimensionierungsfaktoren",
          "items": [
            {
              "text": "Überdimensionierte Einheiten kühlen zu schnell ohne ordnungsgemäße Entfeuchtung, was zu feuchter Luft, Schimmelrisiko und häufigem Ein/Aus-Takten führt das Energie verschwendet und Gerätelebensdauer verkürzt.",
              "type": "warning"
            },
            {
              "text": "Unterdimensionierte Einheiten laufen kontinuierlich ohne die gewünschte Temperatur zu erreichen, verbrauchen überschüssige Energie und schaffen es nicht Komfort an den heißesten oder kältesten Tagen aufrechtzuerhalten.",
              "type": "warning"
            },
            {
              "text": "Fenster sind die größte Quelle des Wärmegewinns in den meisten Räumen. Doppelscheiben-Low-E-Glas-Fenster können solaren Wärmegewinn um 25-50% verglichen mit Einscheiben-Fenstern reduzieren.",
              "type": "info"
            },
            {
              "text": "Dämmung wird durch R-Wert bewertet. Dachbodendämmung von R-38 bis R-60 wird für die meisten deutschen Klimazonen empfohlen, während Wände R-13 bis R-21 haben sollten.",
              "type": "info"
            },
            {
              "text": "Deckenventilatoren reduzieren nicht die Raumtemperatur, aber sie erlauben es den Thermostat 2-3°C höher einzustellen während dasselbe Komfortniveau beibehalten wird, was Energieverbrauch um 10-15% reduziert.",
              "type": "info"
            },
            {
              "text": "Kanalverluste in unkonditionierten Bereichen (Dachböden, Kriechkeller) können 20-30% konditionierter Luft verschwenden. Kanäle zu dichten und zu dämmen ist eine der höchsten ROI Hausverbesserungen.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Klimaanlagen-Typen nach BTU",
          "items": [
            {
              "text": "Fenster-Klimaanlage (5.000-15.000 BTU): Am besten für einzelne Räume. Günstigste Option. Einfache Heimwerker-Installation. Ideal für Wohnungen und Schlafzimmer.",
              "type": "info"
            },
            {
              "text": "Mobile Klimaanlage (8.000-14.000 BTU): Flexible Platzierung, keine permanente Installation. Weniger effizient als Fenstergeräte. Gut für Räume wo Fenstergeräte nicht erlaubt sind.",
              "type": "info"
            },
            {
              "text": "Kanallose Mini-Split (9.000-36.000 BTU): Hocheffizient, leiser Betrieb, Zonenkontrolle. Höhere Anschaffungskosten aber niedrigere Betriebskosten. Ideal für Anbauten und Renovierungen.",
              "type": "info"
            },
            {
              "text": "Zentrale Klimaanlage (24.000-60.000 BTU): Ganzhaus-Kühlung durch Kanalsystem. Am häufigsten in deutschen Häusern. Erfordert professionelle Installation und vorhandene Kanäle.",
              "type": "info"
            },
            {
              "text": "Wärmepumpe (12.000-60.000 BTU): Bietet sowohl Heizung als auch Kühlung. 2-3× effizienter als elektrische Widerstandsheizung. Zunehmend beliebt auch in kalten Klimata.",
              "type": "info"
            },
            {
              "text": "1 Tonne Kühlung = 12.000 BTU/Std. Wohn-Klimaanlagen kommen typischerweise in 0,5-Tonnen-Schritten: 1, 1,5, 2, 2,5, 3, 3,5, 4 und 5 Tonnen.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "BTU Berechnungsbeispiele",
          "description": "Schritt-für-Schritt Beispiele für häufige Räume",
          "examples": [
            {
              "title": "Standard Schlafzimmer (3,7×4,3 m, 2,4m Decke)",
              "steps": [
                "Raumfläche = 3,7 × 4,3 = 15,9 m²",
                "Basis BTU = 15,9 × 215 = 3.419 BTU",
                "Deckenanpassung: 2,4 m (Standard) → keine Anpassung",
                "Sonneneinstrahlung: Durchschnittlich → ×1,0 (keine Änderung)",
                "Dämmung: Durchschnittlich → ×1,0 (keine Änderung)",
                "Bewohner: 2 Personen (Standard) → keine extra BTU",
                "Fenster: 2 Fenster (Standard) → keine extra BTU",
                "Raumtyp: Schlafzimmer → kein Modifikator"
              ],
              "result": "Empfohlen: ~3.419 BTU. Eine 5.000 BTU Fenster-Klimaanlage wäre angemessen."
            },
            {
              "title": "Große Küche (4,9×6,1 m, 2,7m Decke, starke Sonne)",
              "steps": [
                "Raumfläche = 4,9 × 6,1 = 29,9 m²",
                "Basis BTU = 29,9 × 215 = 6.429 BTU",
                "Decke: 2,7 m → +12,5% = +804 BTU",
                "Sonneneinstrahlung: Stark → +10% = +723 BTU",
                "Küchen-Modifikator: +4.000 BTU (Geräte-Wärme)",
                "Bewohner: 3 Personen → +600 BTU (1 über Standard)",
                "Fenster: 4 → +2.000 BTU (2 über Standard)"
              ],
              "result": "Empfohlen: ~14.556 BTU. Eine 15.000 BTU Einheit oder 1,5-Tonnen Mini-Split wäre ideal."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele BTU brauche ich pro Quadratmeter?",
          "answer": "Die allgemeine Faustregel ist 215 BTU pro Quadratmeter für Kühlung, bei Standard 2,4-Meter-Decken und durchschnittlicher Dämmung. Dies kann jedoch von 161 BTU/m² für gut gedämmte, beschattete Räume bis 430 BTU/m² für schlecht gedämmte, sonnengeflutete Bereiche wie Wintergärten reichen. Faktoren wie Deckenhöhe, Fensteranzahl, Belegung und Klimazone beeinflussen alle die tatsächliche Zahl. Dieser Rechner wendet diese Korrekturen automatisch an, sodass Sie eine genaue Schätzung statt einer groben Vermutung erhalten."
        },
        {
          "question": "Was passiert wenn ich eine zu große Klimaanlage kaufe?",
          "answer": "Eine überdimensionierte Klimaanlage kühlt den Raum zu schnell ohne ordnungsgemäße Entfeuchtung der Luft. Dies führt zu Kurztaktung (häufiges Ein/Aus), was Energie verschwendet, Verschleiß am Kompressor erhöht, ungleichmäßige Temperaturen verursacht und eine feuchte, unkomfortable Umgebung schafft. Ordnungsgemäß dimensionierte Einheiten laufen längere Zyklen die effektiv entfeuchten während konstante Temperaturen beibehalten werden."
        },
        {
          "question": "Wie konvertiere ich BTU zu Klimaanlagen-Tonnage?",
          "answer": "Teilen Sie die BTU-Bewertung durch 12.000 um Tonnage zu erhalten. Zum Beispiel 24.000 BTU ÷ 12.000 = 2 Tonnen. Wohn-Klimaanlagen kommen typischerweise in halben Tonnen-Schritten: 1 Tonne (12.000 BTU), 1,5 Tonnen (18.000 BTU), 2 Tonnen (24.000 BTU), 2,5 Tonnen (30.000 BTU), 3 Tonnen (36.000 BTU), und so weiter bis 5 Tonnen (60.000 BTU) für größere Häuser."
        },
        {
          "question": "Beeinflusst Deckenhöhe BTU-Anforderungen?",
          "answer": "Ja, erheblich. Standard BTU-Berechnungen nehmen 2,4-Meter-Decken an. Für jeden Meter über 2,4 Meter sollten Sie etwa 12,5% mehr BTU hinzufügen. Eine 3-Meter-Decke hat 25% mehr Luftvolumen als eine 2,4-Meter-Decke bei derselben Grundfläche, was bedeutet die Klimaanlage muss wesentlich mehr Luft konditionieren. Räume mit Kathedralen- oder Gewölbedecken können noch höhere Anpassungen benötigen."
        },
        {
          "question": "Sollte ich BTU für jeden Raum separat berechnen?",
          "answer": "Ja, für die genaueste Dimensionierung. Jeder Raum hat verschiedene Eigenschaften — Fensteranzahl, Sonneneinstrahlung, Belegung und Wärmequellen variieren alle. Berechnen Sie BTU für jeden Raum individuell, besonders wenn kanallose Mini-Splits oder Fenster-Klimaanlagen verwendet werden. Für zentrale Klimaanlagen summieren Sie die BTU aller Räume und fügen 10-20% für Kanalverluste hinzu, wählen dann ein System nahe dieser Gesamtsumme."
        },
        {
          "question": "Wie beeinflusst Dämmqualität meine Heiz- und Kühlkosten?",
          "answer": "Dämmqualität hat eine der größten Auswirkungen auf BTU-Anforderungen. Häuser mit schlechter Dämmung können 25% oder mehr zusätzliche BTU verglichen mit der Grundlinie benötigen. Verbesserung von schlechter zu guter Dämmung (z.B. Hinzufügen von Dachbodendämmung von R-11 zu R-38) kann Heiz- und Kühlkosten um 20-30% reduzieren. Neubau mit Hochleistungsdämmung und Luftdichtung kann BTU-Bedarf um 15% unter Standardberechnungen reduzieren."
        }
      ],
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
    // ── Calculation Type (imageradio) ──────────────────────────────────
    {
      id: "calculationType",
      type: "imageradio",
      columns: 2,
      defaultValue: "cooling",
      options: [
        { value: "cooling", label: "Cooling", icon: "❄️" },
        { value: "heating", label: "Heating", icon: "🔥" },
      ],
    },

    // ── Room Dimensions ─────────────────────────────────────────────────
    {
      id: "roomLength",
      type: "number",
      defaultValue: null,
      placeholder: "20",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      min: 3,
      max: 100,
    },
    {
      id: "roomWidth",
      type: "number",
      defaultValue: null,
      placeholder: "15",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      min: 3,
      max: 100,
    },
    {
      id: "ceilingHeight",
      type: "number",
      defaultValue: 8,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      min: 6,
      max: 25,
    },

    // ── Room Conditions ─────────────────────────────────────────────────
    {
      id: "insulationQuality",
      type: "select",
      defaultValue: "average",
      options: [
        { value: "poor" },
        { value: "average" },
        { value: "good" },
        { value: "excellent" },
      ],
    },
    {
      id: "sunExposure",
      type: "select",
      defaultValue: "average",
      options: [
        { value: "heavyShade" },
        { value: "average" },
        { value: "highSun" },
      ],
    },
    {
      id: "numberOfWindows",
      type: "stepper",
      defaultValue: 2,
      min: 0,
      max: 20,
      step: 1,
    },
    {
      id: "numberOfOccupants",
      type: "stepper",
      defaultValue: 2,
      min: 1,
      max: 20,
      step: 1,
    },
    {
      id: "roomType",
      type: "select",
      defaultValue: "bedroom",
      options: [
        { value: "bedroom" },
        { value: "livingRoom" },
        { value: "kitchen" },
        { value: "office" },
        { value: "bathroom" },
        { value: "basement" },
        { value: "attic" },
        { value: "sunroom" },
      ],
    },

    // ── Advanced Options (toggle) ───────────────────────────────────────
    {
      id: "showAdvanced",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "climateZone",
      type: "select",
      defaultValue: "moderate",
      options: [
        { value: "hotHumid" },
        { value: "hotDry" },
        { value: "moderate" },
        { value: "cool" },
        { value: "cold" },
        { value: "veryCold" },
      ],
      showWhen: { field: "showAdvanced", value: true },
    },
    {
      id: "numberOfExteriorWalls",
      type: "stepper",
      defaultValue: 2,
      min: 0,
      max: 4,
      step: 1,
      showWhen: { field: "showAdvanced", value: true },
    },

    // ── Energy Cost (toggle) ────────────────────────────────────────────
    {
      id: "estimateEnergyCost",
      type: "toggle",
      defaultValue: false,
      showWhen: { field: "showAdvanced", value: true },
    },
    {
      id: "electricityRate",
      type: "number",
      defaultValue: null,
      placeholder: "0.12",
      prefix: "$",
      suffix: "/kWh",
      min: 0.01,
      max: 1,
      step: 0.01,
      showWhen: { field: "estimateEnergyCost", value: true },
    },
    {
      id: "hoursPerDay",
      type: "number",
      defaultValue: 8,
      min: 1,
      max: 24,
      step: 1,
      suffix: "hrs/day",
      showWhen: { field: "estimateEnergyCost", value: true },
    },
  ],

  inputGroups: [],

  results: [
    { id: "requiredBTU", type: "primary", format: "number" },
    { id: "btuRange", type: "secondary", format: "text" },
    { id: "tonnage", type: "secondary", format: "text" },
    { id: "roomArea", type: "secondary", format: "text" },
    { id: "roomVolume", type: "secondary", format: "text" },
    { id: "monthlyCost", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "sizing", type: "list", icon: "🌡️", itemCount: 4 },
    { id: "breakdown", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "btuBreakdown",
    type: "bar",
    xKey: "factor",
    height: 320,
    stacked: false,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "number",
    series: [{ key: "btu", type: "bar", color: "#3b82f6" }],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    {
      id: "examples",
      type: "code-example",
      icon: "🧮",
      columns: 2,
      exampleCount: 2,
    },
  ],

  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ],

  references: [
    {
      authors: "Air Conditioning Contractors of America (ACCA)",
      year: "2023",
      title: "Manual J – Residential Load Calculation (8th Edition)",
      source: "ACCA",
      url: "https://www.acca.org/standards/technical-manual/manual-j",
    },
    {
      authors: "U.S. Department of Energy",
      year: "2024",
      title: "Sizing and Selecting Air Conditioning Equipment",
      source: "Energy.gov",
      url: "https://www.energy.gov/energysaver/sizing-and-selecting-air-conditioning-equipment",
    },
    {
      authors: "ENERGY STAR",
      year: "2024",
      title: "Properly Sized Room Air Conditioners",
      source: "ENERGY STAR",
      url: "https://www.energystar.gov/products/room_air_conditioners",
    },
  ],

  hero: {
    icon: "🌡️",
    label: "Home & Construction",
  },

  sidebar: {
    showRelated: true,
    showPopular: true,
  },

  features: {
    saveResults: true,
    pdfExport: true,
    sharing: true,
  },

  relatedCalculators: [
    "square-footage-calculator",
    "paint-calculator",
    "drywall-calculator",
  ],

  ads: {
    showSidebar: true,
    showBetweenSections: true,
  },
};

// ─── Calculate Function ──────────────────────────────────────────────────────

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (val < 1000) return val.toFixed(0);
  return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function calculateBtuCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  // ── Read inputs ─────────────────────────────────────────────────────
  const calcType = (values.calculationType as string) || "cooling";
  const rawLength = values.roomLength as number | null;
  const rawWidth = values.roomWidth as number | null;
  const rawCeiling = (values.ceilingHeight as number) || 8;

  // Validate required fields
  if (rawLength === null || rawWidth === null) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (rawLength <= 0 || rawWidth <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Convert to feet ─────────────────────────────────────────────────
  const lengthUnit = fieldUnits?.roomLength || "ft";
  const widthUnit = fieldUnits?.roomWidth || "ft";
  const ceilingUnit = fieldUnits?.ceilingHeight || "ft";

  const mToFt = 3.28084;
  const lengthFt = lengthUnit === "m" ? rawLength * mToFt : rawLength;
  const widthFt = widthUnit === "m" ? rawWidth * mToFt : rawWidth;
  const ceilingFt = ceilingUnit === "m" ? rawCeiling * mToFt : rawCeiling;

  const insulation = (values.insulationQuality as string) || "average";
  const sunExposure = (values.sunExposure as string) || "average";
  const windows = (values.numberOfWindows as number) ?? 2;
  const occupants = (values.numberOfOccupants as number) ?? 2;
  const roomType = (values.roomType as string) || "bedroom";
  const showAdvanced = values.showAdvanced as boolean;
  const climateZone = (values.climateZone as string) || "moderate";
  const exteriorWalls = (values.numberOfExteriorWalls as number) ?? 2;
  const estimateCost = values.estimateEnergyCost as boolean;
  const electricityRate = (values.electricityRate as number) || 0.12;
  const hoursPerDay = (values.hoursPerDay as number) || 8;

  // ── Room metrics ────────────────────────────────────────────────────
  const roomArea = lengthFt * widthFt;
  const roomVolume = roomArea * ceilingFt;

  // ── Base BTU (20 BTU per sqft for cooling) ─────────────────────────
  const btuPerSqft = calcType === "cooling" ? 20 : 25;
  let baseBTU = roomArea * btuPerSqft;

  // ── Ceiling height adjustment ───────────────────────────────────────
  let ceilingAdj = 0;
  if (ceilingFt > 8) {
    const extraFeet = ceilingFt - 8;
    ceilingAdj = baseBTU * (extraFeet * 0.125);
  }

  // ── Sun exposure adjustment ─────────────────────────────────────────
  let sunMultiplier = 1.0;
  if (sunExposure === "heavyShade") sunMultiplier = 0.9;
  if (sunExposure === "highSun") sunMultiplier = 1.1;
  const sunAdj = baseBTU * (sunMultiplier - 1.0);

  // ── Insulation adjustment ───────────────────────────────────────────
  let insulationMultiplier = 1.0;
  if (insulation === "poor") insulationMultiplier = 1.25;
  if (insulation === "good") insulationMultiplier = 0.9;
  if (insulation === "excellent") insulationMultiplier = 0.85;
  const insulationAdj = baseBTU * (insulationMultiplier - 1.0);

  // ── Occupant adjustment (+600 BTU per person above 2) ──────────────
  const occupantAdj = Math.max(0, occupants - 2) * 600;

  // ── Window adjustment (+1,000 BTU per window above 2) ──────────────
  const windowAdj = Math.max(0, windows - 2) * 1000;

  // ── Room type adjustment ────────────────────────────────────────────
  let roomTypeAdj = 0;
  if (roomType === "kitchen") roomTypeAdj = 4000;
  if (roomType === "attic") roomTypeAdj = baseBTU * 0.2;
  if (roomType === "sunroom") roomTypeAdj = baseBTU * 0.3;
  if (roomType === "basement") roomTypeAdj = baseBTU * -0.1;
  if (roomType === "office") roomTypeAdj = 1000; // electronics heat

  // ── Climate zone adjustment (advanced) ──────────────────────────────
  let climateMultiplier = 1.0;
  if (showAdvanced) {
    if (calcType === "cooling") {
      if (climateZone === "hotHumid") climateMultiplier = 1.15;
      if (climateZone === "hotDry") climateMultiplier = 1.1;
      if (climateZone === "cool") climateMultiplier = 0.95;
      if (climateZone === "cold") climateMultiplier = 0.9;
      if (climateZone === "veryCold") climateMultiplier = 0.85;
    } else {
      // Heating
      if (climateZone === "hotHumid") climateMultiplier = 0.8;
      if (climateZone === "hotDry") climateMultiplier = 0.85;
      if (climateZone === "cool") climateMultiplier = 1.1;
      if (climateZone === "cold") climateMultiplier = 1.25;
      if (climateZone === "veryCold") climateMultiplier = 1.4;
    }
  }

  // ── Exterior walls adjustment (advanced) ────────────────────────────
  let exteriorWallAdj = 0;
  if (showAdvanced && exteriorWalls > 2) {
    exteriorWallAdj = baseBTU * (exteriorWalls - 2) * 0.05;
  }

  // ── Calculate total ─────────────────────────────────────────────────
  const subtotal =
    baseBTU +
    ceilingAdj +
    sunAdj +
    insulationAdj +
    occupantAdj +
    windowAdj +
    roomTypeAdj +
    exteriorWallAdj;

  const totalBTU = Math.round(subtotal * climateMultiplier);

  // Round to nearest 500
  const recommendedBTU = Math.round(totalBTU / 500) * 500;

  // Comfort range ±10%
  const lowRange = Math.round(recommendedBTU * 0.9 / 500) * 500;
  const highRange = Math.round(recommendedBTU * 1.1 / 500) * 500;

  // Tonnage
  const tonnageRaw = recommendedBTU / 12000;
  // Round to nearest 0.5 ton
  const tonnage = Math.round(tonnageRaw * 2) / 2;

  // ── Energy cost estimate ────────────────────────────────────────────
  let monthlyCost = 0;
  if (estimateCost && showAdvanced) {
    // EER ≈ SEER × 0.875 ; assume SEER 14 (standard)
    const eer = 14 * 0.875; // ~12.25
    const wattsWhenRunning = recommendedBTU / eer;
    const kwhPerMonth = (wattsWhenRunning * hoursPerDay * 30) / 1000;
    monthlyCost = kwhPerMonth * electricityRate;
  }

  // ── Units ───────────────────────────────────────────────────────────
  const btuUnit = v["btuHr"] || "BTU/hr";
  const sqftUnit = v["sqft"] || "sq ft";
  const cuftUnit = v["cuft"] || "cu ft";
  const tonLabel = tonnage === 1 ? v["ton"] || "ton" : v["tons"] || "tons";
  const monthUnit = v["month"] || "/month";

  // ── Chart data ──────────────────────────────────────────────────────
  const chartData: Array<Record<string, unknown>> = [];

  chartData.push({ factor: "Base Load", btu: Math.round(baseBTU) });
  if (Math.abs(ceilingAdj) > 0) {
    chartData.push({ factor: "Ceiling Height", btu: Math.round(ceilingAdj) });
  }
  if (Math.abs(sunAdj) > 0) {
    chartData.push({ factor: "Sun Exposure", btu: Math.round(sunAdj) });
  }
  if (Math.abs(insulationAdj) > 0) {
    chartData.push({ factor: "Insulation", btu: Math.round(insulationAdj) });
  }
  if (occupantAdj > 0) {
    chartData.push({ factor: "Occupants", btu: occupantAdj });
  }
  if (windowAdj > 0) {
    chartData.push({ factor: "Windows", btu: windowAdj });
  }
  if (Math.abs(roomTypeAdj) > 0) {
    chartData.push({ factor: "Room Type", btu: Math.round(roomTypeAdj) });
  }
  if (exteriorWallAdj > 0) {
    chartData.push({
      factor: "Exterior Walls",
      btu: Math.round(exteriorWallAdj),
    });
  }

  // ── Format summary ─────────────────────────────────────────────────
  const f = (t?.formats as Record<string, string>) || {};
  const typeLabel = calcType === "cooling" ? "cooling" : "heating";
  const summary =
    f.summary
      ?.replace("{btu}", fmtNum(recommendedBTU))
      .replace("{type}", typeLabel)
      .replace("{tonnage}", tonnage.toFixed(1)) || "";

  // ── Return ──────────────────────────────────────────────────────────
  return {
    values: {
      requiredBTU: recommendedBTU,
      btuRange: `${fmtNum(lowRange)} - ${fmtNum(highRange)}`,
      tonnage: tonnage,
      roomArea: Math.round(roomArea),
      roomVolume: Math.round(roomVolume),
      monthlyCost: monthlyCost,
      // InfoCard breakdown values
      baseLoad: Math.round(baseBTU),
      ceilingAdj: Math.round(ceilingAdj),
      occupantLoad: occupantAdj,
      windowSunAdj: Math.round(sunAdj + windowAdj),
    },
    formatted: {
      requiredBTU: `${fmtNum(recommendedBTU)} ${btuUnit}`,
      btuRange: `${fmtNum(lowRange)} – ${fmtNum(highRange)} ${btuUnit}`,
      tonnage: `${tonnage.toFixed(1)} ${tonLabel}`,
      roomArea: `${fmtNum(Math.round(roomArea))} ${sqftUnit}`,
      roomVolume: `${fmtNum(Math.round(roomVolume))} ${cuftUnit}`,
      monthlyCost:
        estimateCost && showAdvanced
          ? `$${monthlyCost.toFixed(2)}${monthUnit}`
          : "—",
      // InfoCard breakdown
      baseLoad: `${fmtNum(Math.round(baseBTU))} ${btuUnit}`,
      ceilingAdj:
        ceilingAdj !== 0
          ? `${ceilingAdj > 0 ? "+" : ""}${fmtNum(Math.round(ceilingAdj))} ${btuUnit}`
          : "No adjustment (8 ft)",
      occupantLoad:
        occupantAdj > 0
          ? `+${fmtNum(occupantAdj)} ${btuUnit}`
          : "Standard (≤2 people)",
      windowSunAdj:
        sunAdj + windowAdj !== 0
          ? `${sunAdj + windowAdj > 0 ? "+" : ""}${fmtNum(Math.round(sunAdj + windowAdj))} ${btuUnit}`
          : "No adjustment",
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
    },
  };
}

export default btuCalculatorConfig;
