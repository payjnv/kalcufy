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
