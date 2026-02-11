import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─────────────────────────────────────────────────────────────────────────────
// PSU CALCULATOR — V4.3
// ─────────────────────────────────────────────────────────────────────────────
// Calculates: total system wattage, recommended PSU size, per-component
// breakdown, 80+ efficiency levels, annual energy cost, capacitor aging,
// transient spike warnings, ATX 3.x recommendations.
// ─────────────────────────────────────────────────────────────────────────────

export const psuCalculatorConfig: CalculatorConfigV4 = {
  id: "psu-calculator",
  version: "4.3",
  category: "technology",
  icon: "⚡",

  presets: [
    {
      id: "officePc",
      icon: "🖥️",
      values: {
        cpuTier: "mid_range",
        gpuTier: "none",
        ramSticks: 2,
        sataStorage: 1,
        nvmeStorage: 1,
        fans: 2,
        overclock: "none",
        usageHours: 8,
        electricityCost: 0.12,
      },
    },
    {
      id: "gamingPc",
      icon: "🎮",
      values: {
        cpuTier: "high_end",
        gpuTier: "high_end",
        ramSticks: 2,
        sataStorage: 1,
        nvmeStorage: 1,
        fans: 4,
        overclock: "moderate",
        usageHours: 6,
        electricityCost: 0.12,
      },
    },
    {
      id: "enthusiast",
      icon: "🔥",
      values: {
        cpuTier: "flagship",
        gpuTier: "flagship",
        ramSticks: 4,
        sataStorage: 2,
        nvmeStorage: 2,
        fans: 6,
        overclock: "heavy",
        usageHours: 8,
        electricityCost: 0.12,
      },
    },
    {
      id: "workstation",
      icon: "🏢",
      values: {
        cpuTier: "workstation",
        gpuTier: "workstation",
        ramSticks: 4,
        sataStorage: 4,
        nvmeStorage: 2,
        fans: 6,
        overclock: "none",
        usageHours: 12,
        electricityCost: 0.12,
      },
    },
  ],

  t: {
    en: {
      name: "PSU Calculator",
      slug: "psu-calculator",
      subtitle: "Calculate the ideal power supply wattage for your PC build. Accounts for overclocking, capacitor aging, 80 PLUS efficiency, and annual energy cost.",
      breadcrumb: "PSU Calculator",

      seo: {
        title: "PSU Calculator - PC Power Supply Wattage Calculator (2025)",
        description: "Find the perfect PSU for your PC build. Calculates total wattage from CPU, GPU, RAM, storage, and fans. Includes overclocking headroom, 80+ efficiency ratings, transient spike warnings, and annual electricity cost. Free multilingual tool.",
        shortDescription: "Calculate the right power supply wattage for your PC.",
        keywords: [
          "psu calculator",
          "power supply calculator",
          "pc wattage calculator",
          "psu wattage calculator",
          "how many watts do i need",
          "rtx 5090 psu",
          "gaming pc power supply",
          "pc power consumption calculator",
        ],
      },

      calculator: { yourInformation: "System Components" },
      ui: {
        yourInformation: "System Components",
        calculate: "Calculate",
        reset: "Reset",
        results: "PSU Recommendation",
      },

      inputs: {
        cpuTier: {
          label: "CPU Tier",
          helpText: "Select the performance tier that matches your processor",
          options: {
            budget: "Budget — 45-65W (Ryzen 5 5600, i3-14100)",
            mid_range: "Mid-Range — 65-105W (Ryzen 5 7600, i5-14600K)",
            high_end: "High-End — 105-150W (Ryzen 7 9800X3D, i7-14700K)",
            flagship: "Flagship — 150-253W (Ryzen 9 9950X, i9-14900K, Ultra 9 285K)",
            workstation: "Workstation — 280-350W (Threadripper, Xeon W)",
          },
        },
        gpuTier: {
          label: "GPU Tier",
          helpText: "Select the performance tier that matches your graphics card",
          options: {
            none: "None / Integrated Graphics — 0W",
            budget: "Budget — 75-120W (RTX 4060, RX 7600)",
            mid_range: "Mid-Range — 150-200W (RTX 4070, RX 7800 XT)",
            high_end: "High-End — 220-320W (RTX 4080/5070 Ti, RX 7900 XT)",
            flagship: "Flagship — 350-575W (RTX 4090, RTX 5080, RTX 5090)",
            workstation: "Workstation — 300-450W (RTX A6000, Quadro)",
          },
        },
        ramSticks: {
          label: "RAM Sticks",
          helpText: "Number of memory modules (typically 2 or 4)",
        },
        sataStorage: {
          label: "SATA Drives (HDD/SSD)",
          helpText: "Number of 2.5\" SSDs or 3.5\" HDDs",
        },
        nvmeStorage: {
          label: "NVMe M.2 Drives",
          helpText: "Number of NVMe M.2 SSDs",
        },
        fans: {
          label: "Case Fans + AIO/RGB",
          helpText: "Total case fans, AIO pump, and RGB controllers",
        },
        overclock: {
          label: "Overclocking",
          helpText: "Overclocking increases power draw significantly",
          options: {
            none: "None — Stock settings",
            moderate: "Moderate — +10-15% power draw",
            heavy: "Heavy — +20-30% power draw",
          },
        },
        usageHours: {
          label: "Daily Usage (hours)",
          helpText: "Average hours per day the PC is powered on (for energy cost calculation)",
        },
        electricityCost: {
          label: "Electricity Cost",
          helpText: "Cost per kWh in your area (for annual energy cost estimate)",
        },
      },

      results: {
        recommendedPsu: { label: "Recommended PSU" },
        totalSystemWattage: { label: "Total System Wattage" },
        peakWithSpikes: { label: "Peak with Transients" },
        cpuWattage: { label: "CPU Power Draw" },
        gpuWattage: { label: "GPU Power Draw" },
        otherWattage: { label: "Other Components" },
        overclockBonus: { label: "Overclock Headroom" },
        safetyMargin: { label: "Safety Margin (20%)" },
        efficiencyAtLoad: { label: "Efficiency at Load" },
        annualEnergyCost: { label: "Annual Energy Cost" },
        atxStandard: { label: "ATX Standard" },
        transientWarning: { label: "Transient Spikes" },
      },

      presets: {
        officePc: { label: "Office PC", description: "Mid-range CPU, integrated graphics" },
        gamingPc: { label: "Gaming PC", description: "High-end CPU + GPU, moderate OC" },
        enthusiast: { label: "Enthusiast Build", description: "Flagship CPU + GPU, heavy OC" },
        workstation: { label: "Workstation", description: "Threadripper/Xeon + Pro GPU" },
      },

      values: {
        watts: "W",
        hours: "hours",
        perYear: "/year",
        none: "None",
        recommended: "Recommended",
        minimum: "Minimum",
        atx2: "ATX 2.x (standard)",
        atx3: "ATX 3.0/3.1 (recommended for RTX 40/50)",
        lowRisk: "Low — within safe margins",
        mediumRisk: "Medium — GPU may spike 1.5× TDP",
        highRisk: "High — GPU may spike 2× TDP, ATX 3.x strongly recommended",
      },

      formats: {
        summary: "Your system draws approximately {totalWattage}W (peak {peakWattage}W with transients). Recommended PSU: {recommendedPsu}W ({efficiency} efficiency). Estimated annual energy cost: {annualCost}.",
      },

      infoCards: {
        metrics: {
          title: "Power Summary",
          items: [
            { label: "Recommended PSU", valueKey: "recommendedPsu" },
            { label: "System Wattage", valueKey: "totalSystemWattage" },
            { label: "Peak with Spikes", valueKey: "peakWithSpikes" },
            { label: "Annual Energy Cost", valueKey: "annualEnergyCost" },
          ],
        },
        details: {
          title: "Component Breakdown",
          items: [
            { label: "CPU", valueKey: "cpuWattage" },
            { label: "GPU", valueKey: "gpuWattage" },
            { label: "RAM + Storage + Fans", valueKey: "otherWattage" },
            { label: "Overclock Headroom", valueKey: "overclockBonus" },
            { label: "Safety Margin", valueKey: "safetyMargin" },
            { label: "ATX Standard", valueKey: "atxStandard" },
            { label: "Transient Spike Risk", valueKey: "transientWarning" },
            { label: "Efficiency at Load", valueKey: "efficiencyAtLoad" },
          ],
        },
        tips: {
          title: "PSU Buying Tips",
          items: [
            "Always buy more than you need — a PSU running at 50-80% load is most efficient and lasts longest.",
            "80 PLUS Gold or higher saves real money on electricity. The difference between Bronze and Gold can be $20-50/year.",
            "For RTX 4090/5080/5090, use an ATX 3.0/3.1 PSU with a native 12VHPWR connector to handle transient power spikes safely.",
            "Capacitors degrade over time. After 3-5 years, expect ~10% less effective power. Size your PSU with this in mind.",
          ],
        },
      },

      chart: {
        title: "Power Distribution",
        xLabel: "Component",
        yLabel: "Watts",
        series: {
          value: "Wattage (W)",
        },
      },

      detailedTable: {
        efficiencyTable: {
          button: "View 80 PLUS Efficiency Levels",
          title: "80 PLUS Certification — Efficiency at Different Loads",
          columns: {
            tier: "Certification",
            at20: "20% Load",
            at50: "50% Load",
            at100: "100% Load",
            savings: "Annual Savings vs Bronze",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is a PSU Calculator?",
          content: "A PSU (Power Supply Unit) calculator estimates the total power consumption of your PC components and recommends the appropriate power supply wattage. Every component in your computer — from the CPU and GPU to RAM, storage drives, and fans — draws power from the PSU. If your power supply cannot deliver enough wattage, your system will crash, restart randomly, or fail to boot entirely. Conversely, an oversized PSU wastes money and operates at lower efficiency. The ideal PSU runs at 50-80% of its rated capacity, where modern 80 PLUS certified units achieve their highest efficiency. This calculator accounts for real-world factors that simpler tools ignore: overclocking headroom, GPU transient power spikes (which can briefly reach 2× the rated TDP), capacitor aging over time, and the efficiency losses inherent in AC-to-DC power conversion.",
        },
        howItWorks: {
          title: "How PSU Wattage Is Calculated",
          content: "The calculation starts by summing the TDP (Thermal Design Power) of each component. For CPUs, TDP ranges from 45W for budget chips to 350W for workstation processors. GPUs range from 75W to 575W for the latest flagship cards. RAM uses about 3-5W per stick, SATA drives 5-10W, NVMe drives 5-8W, and fans 2-5W each. Overclocking adds 10-30% on top. A 20% safety margin is applied for system stability and future headroom. For GPUs in the RTX 40/50 series, transient power spikes are a critical factor — these cards can briefly draw 1.5-2× their rated TDP in millisecond-scale bursts. ATX 3.0/3.1 power supplies are designed to handle these spikes; older ATX 2.x units may trigger over-current protection and shut down. The recommended PSU wattage is then rounded up to the nearest standard PSU size (450W, 550W, 650W, 750W, 850W, 1000W, 1200W, or 1500W).",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "GPU transient spikes: Modern high-end GPUs (RTX 4090, 5080, 5090) can spike to 2× their TDP for microseconds. ATX 3.0/3.1 PSUs handle this natively; older PSUs may shut down.", type: "warning" },
            { text: "Capacitor aging: PSU capacitors lose 5-15% capacity over 3-5 years. A PSU rated at 850W may only deliver 720-800W after years of use. Size accordingly.", type: "warning" },
            { text: "80 PLUS efficiency matters: At 50% load, a Gold PSU is 90% efficient (draws 555W from wall to deliver 500W). A basic 80+ unit is only 82% efficient (draws 610W for the same 500W).", type: "info" },
            { text: "Multi-GPU setups double GPU power. If running two GPUs, multiply GPU wattage by 2 and add 50W for motherboard overhead.", type: "info" },
            { text: "USB peripherals, RGB strips, and external devices add 10-50W. Budget extra headroom if you have many USB devices.", type: "info" },
            { text: "Modular PSUs reduce cable clutter and improve airflow. Fully modular is ideal for custom builds; semi-modular is fine for most users.", type: "info" },
          ],
        },
        categories: {
          title: "PSU Tiers by Build Type",
          items: [
            { text: "Office/HTPC (300-450W): Integrated graphics, low-power CPU. A 450W 80+ Bronze is plenty. Prioritize quiet operation.", type: "info" },
            { text: "Budget Gaming (450-550W): Mid-range GPU like RTX 4060 or RX 7600. A 550W 80+ Bronze/Gold handles this easily.", type: "info" },
            { text: "Mid-Range Gaming (550-750W): RTX 4070/5070 Ti class GPU. A 650-750W 80+ Gold is the sweet spot for most gamers.", type: "info" },
            { text: "High-End Gaming (750-1000W): RTX 4080/5080 class. Get an 850W+ ATX 3.0 Gold/Platinum for transient spike handling.", type: "info" },
            { text: "Enthusiast/Flagship (1000-1200W): RTX 4090/5090 builds. 1000W+ ATX 3.1 Platinum is strongly recommended. These GPUs spike hard.", type: "warning" },
            { text: "Workstation (1200-1600W): Threadripper/Xeon + Pro GPU. Consider redundant PSU setups for critical workloads.", type: "info" },
          ],
        },
        examples: {
          title: "PSU Calculation Examples",
          description: "Step-by-step wattage calculations for real builds",
          examples: [
            {
              title: "Gaming Build: Ryzen 7 9800X3D + RTX 5080",
              steps: [
                "CPU: Ryzen 7 9800X3D = 120W TDP",
                "GPU: RTX 5080 = 360W TDP (spikes to ~540W)",
                "RAM: 2× DDR5 = 10W | NVMe: 1× = 7W | SATA: 1× = 8W",
                "Fans: 4× = 16W | Motherboard overhead: 80W",
                "Base total: 120 + 360 + 10 + 7 + 8 + 16 + 80 = 601W",
                "Safety margin (20%): 601 × 1.2 = 721W → 750W PSU",
              ],
              result: "Recommended: 850W ATX 3.0 Gold — provides headroom for GPU transient spikes up to 540W and future upgrades.",
            },
            {
              title: "Enthusiast: i9-14900K + RTX 5090 (Heavy OC)",
              steps: [
                "CPU: i9-14900K = 253W TDP + 30% OC = 329W",
                "GPU: RTX 5090 = 575W TDP (spikes to ~1000W!)",
                "RAM: 4× DDR5 = 20W | NVMe: 2× = 14W | SATA: 2× = 16W",
                "Fans: 6× = 24W | Motherboard overhead: 80W",
                "Base total: 329 + 575 + 20 + 14 + 16 + 24 + 80 = 1058W",
                "Safety margin (20%): 1058 × 1.2 = 1270W → 1200W PSU",
              ],
              result: "Recommended: 1200-1500W ATX 3.1 Platinum. The RTX 5090 can spike to nearly 1000W, making ATX 3.x essential.",
            },
          ],
        },
      },

      faqs: {
        "0": {
          question: "How do I know what wattage PSU I need?",
          answer: "Add up the TDP (Thermal Design Power) of your CPU and GPU — these are the two biggest power consumers. Then add roughly 100-150W for everything else (RAM, storage, fans, motherboard). Apply a 20% safety margin, and round up to the nearest standard PSU size. For example: a 150W CPU + 300W GPU + 120W other = 570W × 1.2 = 684W → get a 750W PSU. This calculator does all of this automatically.",
        },
        "1": {
          question: "Is it bad to have a PSU that's too powerful?",
          answer: "Not harmful, but inefficient. A 1200W PSU running a 400W system operates at about 33% load, which is below the optimal 50-80% efficiency range. You'll pay slightly more on electricity and the PSU costs more upfront. However, it does give maximum headroom for future upgrades. The sweet spot is a PSU where your typical load falls between 50-80% of its rated capacity.",
        },
        "2": {
          question: "What are GPU transient power spikes?",
          answer: "Modern GPUs, especially NVIDIA's RTX 40 and 50 series, can briefly draw 1.5-2× their rated TDP in microsecond-scale bursts. An RTX 4090 rated at 450W can spike to 600-900W momentarily. An RTX 5090 at 575W can spike to nearly 1000W. These transients can trigger overcurrent protection on older PSUs, causing shutdowns. ATX 3.0 and 3.1 power supplies are specifically designed to handle these spikes through the 12VHPWR/12V-2×6 connector, which supports up to 600W continuous per connector.",
        },
        "3": {
          question: "What does 80 PLUS Gold/Platinum mean?",
          answer: "80 PLUS is an efficiency certification. It measures how much AC power from the wall is converted to usable DC power. 80 PLUS (basic) means at least 80% efficiency. Bronze adds about 2-3%, Gold about 87-90%, Platinum 89-92%, and Titanium 91-94% at typical loads. The difference is real money: a Gold PSU powering a 500W system saves about $15-25/year over Bronze. Over 5-7 years, Platinum pays for itself versus Bronze in many electricity markets.",
        },
        "4": {
          question: "Do I need an ATX 3.0 or 3.1 power supply?",
          answer: "If you're using an RTX 4070 Ti or higher GPU, ATX 3.0/3.1 is strongly recommended. These standards added the 12VHPWR (ATX 3.0) and 12V-2×6 (ATX 3.1) connectors, which support 600W per connector and are designed to handle GPU transient spikes. ATX 3.1 tightened voltage regulation tolerances and improved connector safety after early 12VHPWR melting issues. For lower-end builds, ATX 2.x is still perfectly fine.",
        },
        "5": {
          question: "How does overclocking affect PSU requirements?",
          answer: "Overclocking increases both voltage and frequency, which dramatically increases power consumption. A moderate CPU overclock adds 10-15% power draw, while heavy overclocking can add 25-30% or more. GPU overclocking typically adds 10-20%. The formula is roughly: Power ∝ Voltage² × Frequency. So a 10% voltage increase actually adds about 21% more power consumption (1.1² = 1.21). Always account for overclocking when sizing your PSU.",
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
        calculate: "Calculate",
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
      "name": "Calculadora de Fuente de Alimentación",
      "slug": "calculadora-fuente-alimentacion",
      "subtitle": "Calcula el vataje ideal de la fuente de alimentación para tu PC. Considera overclocking, envejecimiento de condensadores, eficiencia 80 PLUS y costo energético anual.",
      "breadcrumb": "Calculadora de PSU",
      "seo": {
        "title": "Calculadora de PSU - Calculadora de Vataje de Fuente de Alimentación PC (2025)",
        "description": "Encuentra la PSU perfecta para tu PC. Calcula el vataje total de CPU, GPU, RAM, almacenamiento y ventiladores. Incluye margen de overclocking, certificaciones 80+, advertencias de picos transitorios y costo eléctrico anual. Herramienta gratuita multiidioma.",
        "shortDescription": "Calcula el vataje correcto de fuente de alimentación para tu PC.",
        "keywords": [
          "calculadora psu",
          "calculadora fuente alimentacion",
          "calculadora vatios pc",
          "calculadora vataje psu",
          "cuantos vatios necesito",
          "rtx 5090 psu",
          "fuente gaming pc",
          "calculadora consumo pc"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "cpuTier": {
          "label": "Nivel de CPU",
          "helpText": "Selecciona el nivel de rendimiento que coincida con tu procesador",
          "options": {
            "budget": "Básico — 45-65W (Ryzen 5 5600, i3-14100)",
            "mid_range": "Gama Media — 65-105W (Ryzen 5 7600, i5-14600K)",
            "high_end": "Gama Alta — 105-150W (Ryzen 7 9800X3D, i7-14700K)",
            "flagship": "Tope de Gama — 150-253W (Ryzen 9 9950X, i9-14900K, Ultra 9 285K)",
            "workstation": "Estación de Trabajo — 280-350W (Threadripper, Xeon W)"
          }
        },
        "gpuTier": {
          "label": "Nivel de GPU",
          "helpText": "Selecciona el nivel de rendimiento que coincida con tu tarjeta gráfica",
          "options": {
            "none": "Ninguna / Gráficos Integrados — 0W",
            "budget": "Básico — 75-120W (RTX 4060, RX 7600)",
            "mid_range": "Gama Media — 150-200W (RTX 4070, RX 7800 XT)",
            "high_end": "Gama Alta — 220-320W (RTX 4080/5070 Ti, RX 7900 XT)",
            "flagship": "Tope de Gama — 350-575W (RTX 4090, RTX 5080, RTX 5090)",
            "workstation": "Estación de Trabajo — 300-450W (RTX A6000, Quadro)"
          }
        },
        "ramSticks": {
          "label": "Módulos de RAM",
          "helpText": "Número de módulos de memoria (típicamente 2 o 4)"
        },
        "sataStorage": {
          "label": "Unidades SATA (HDD/SSD)",
          "helpText": "Número de SSD de 2.5\" o HDD de 3.5\""
        },
        "nvmeStorage": {
          "label": "Unidades NVMe M.2",
          "helpText": "Número de SSD NVMe M.2"
        },
        "fans": {
          "label": "Ventiladores + AIO/RGB",
          "helpText": "Total de ventiladores, bomba AIO y controladores RGB"
        },
        "overclock": {
          "label": "Overclocking",
          "helpText": "El overclocking aumenta significativamente el consumo",
          "options": {
            "none": "Ninguno — Configuración de fábrica",
            "moderate": "Moderado — +10-15% consumo",
            "heavy": "Intenso — +20-30% consumo"
          }
        },
        "usageHours": {
          "label": "Uso Diario (horas)",
          "helpText": "Horas promedio por día que el PC está encendido (para cálculo de costo energético)"
        },
        "electricityCost": {
          "label": "Costo de Electricidad",
          "helpText": "Costo por kWh en tu área (para estimación de costo energético anual)"
        }
      },
      "results": {
        "recommendedPsu": {
          "label": "PSU Recomendada"
        },
        "totalSystemWattage": {
          "label": "Vataje Total del Sistema"
        },
        "peakWithSpikes": {
          "label": "Pico con Transitorios"
        },
        "cpuWattage": {
          "label": "Consumo del CPU"
        },
        "gpuWattage": {
          "label": "Consumo de la GPU"
        },
        "otherWattage": {
          "label": "Otros Componentes"
        },
        "overclockBonus": {
          "label": "Margen de Overclocking"
        },
        "safetyMargin": {
          "label": "Margen de Seguridad (20%)"
        },
        "efficiencyAtLoad": {
          "label": "Eficiencia en Carga"
        },
        "annualEnergyCost": {
          "label": "Costo Energético Anual"
        },
        "atxStandard": {
          "label": "Estándar ATX"
        },
        "transientWarning": {
          "label": "Picos Transitorios"
        }
      },
      "presets": {
        "officePc": {
          "label": "PC de Oficina",
          "description": "CPU gama media, gráficos integrados"
        },
        "gamingPc": {
          "label": "PC Gaming",
          "description": "CPU + GPU gama alta, OC moderado"
        },
        "enthusiast": {
          "label": "Build Enthusiast",
          "description": "CPU + GPU tope de gama, OC intenso"
        },
        "workstation": {
          "label": "Estación de Trabajo",
          "description": "Threadripper/Xeon + GPU Pro"
        }
      },
      "values": {
        "watts": "W",
        "hours": "horas",
        "perYear": "/año",
        "none": "Ninguno",
        "recommended": "Recomendado",
        "minimum": "Mínimo",
        "atx2": "ATX 2.x (estándar)",
        "atx3": "ATX 3.0/3.1 (recomendado para RTX 40/50)",
        "lowRisk": "Bajo — dentro de márgenes seguros",
        "mediumRisk": "Medio — GPU puede alcanzar picos de 1.5× TDP",
        "highRisk": "Alto — GPU puede alcanzar picos de 2× TDP, ATX 3.x muy recomendado"
      },
      "formats": {
        "summary": "Tu sistema consume aproximadamente {totalWattage}W (pico {peakWattage}W con transitorios). PSU recomendada: {recommendedPsu}W ({efficiency} eficiencia). Costo energético anual estimado: {annualCost}."
      },
      "infoCards": {
        "metrics": {
          "title": "Resumen de Potencia",
          "items": [
            {
              "label": "PSU Recomendada",
              "valueKey": "recommendedPsu"
            },
            {
              "label": "Vataje del Sistema",
              "valueKey": "totalSystemWattage"
            },
            {
              "label": "Pico con Spikes",
              "valueKey": "peakWithSpikes"
            },
            {
              "label": "Costo Energético Anual",
              "valueKey": "annualEnergyCost"
            }
          ]
        },
        "details": {
          "title": "Desglose por Componente",
          "items": [
            {
              "label": "CPU",
              "valueKey": "cpuWattage"
            },
            {
              "label": "GPU",
              "valueKey": "gpuWattage"
            },
            {
              "label": "RAM + Almacenamiento + Ventiladores",
              "valueKey": "otherWattage"
            },
            {
              "label": "Margen Overclocking",
              "valueKey": "overclockBonus"
            },
            {
              "label": "Margen de Seguridad",
              "valueKey": "safetyMargin"
            },
            {
              "label": "Estándar ATX",
              "valueKey": "atxStandard"
            },
            {
              "label": "Riesgo Picos Transitorios",
              "valueKey": "transientWarning"
            },
            {
              "label": "Eficiencia en Carga",
              "valueKey": "efficiencyAtLoad"
            }
          ]
        },
        "tips": {
          "title": "Consejos para Comprar PSU",
          "items": [
            "Siempre compra más de lo que necesitas — una PSU funcionando al 50-80% de carga es más eficiente y dura más tiempo.",
            "80 PLUS Gold o superior ahorra dinero real en electricidad. La diferencia entre Bronze y Gold puede ser $20-50/año.",
            "Para RTX 4090/5080/5090, usa una PSU ATX 3.0/3.1 con conector 12VHPWR nativo para manejar picos de potencia transitoria de forma segura.",
            "Los condensadores se degradan con el tiempo. Después de 3-5 años, espera ~10% menos potencia efectiva. Dimensiona tu PSU considerando esto."
          ]
        }
      },
      "chart": {
        "title": "Distribución de Potencia",
        "xLabel": "Componente",
        "yLabel": "Vatios",
        "series": {
          "value": "Vataje (W)"
        }
      },
      "detailedTable": {
        "efficiencyTable": {
          "button": "Ver Niveles de Eficiencia 80 PLUS",
          "title": "Certificación 80 PLUS — Eficiencia en Diferentes Cargas",
          "columns": {
            "tier": "Certificación",
            "at20": "Carga 20%",
            "at50": "Carga 50%",
            "at100": "Carga 100%",
            "savings": "Ahorro Anual vs Bronze"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es una Calculadora de PSU?",
          "content": "Una calculadora de PSU (Unidad de Fuente de Alimentación) estima el consumo total de potencia de los componentes de tu PC y recomienda el vataje apropiado de la fuente de alimentación. Cada componente en tu computadora — desde el CPU y GPU hasta RAM, unidades de almacenamiento y ventiladores — consume energía de la PSU. Si tu fuente de alimentación no puede entregar suficiente vataje, tu sistema se bloqueará, se reiniciará aleatoriamente o fallará al arrancar completamente. Por el contrario, una PSU sobredimensionada desperdicia dinero y opera a menor eficiencia. La PSU ideal funciona al 50-80% de su capacidad nominal, donde las unidades modernas certificadas 80 PLUS alcanzan su mayor eficiencia. Esta calculadora considera factores del mundo real que herramientas más simples ignoran: margen de overclocking, picos de potencia transitoria de GPU (que pueden alcanzar brevemente 2× el TDP nominal), envejecimiento de condensadores con el tiempo, y las pérdidas de eficiencia inherentes en la conversión de potencia AC a DC."
        },
        "howItWorks": {
          "title": "Cómo se Calcula el Vataje de PSU",
          "content": "El cálculo comienza sumando el TDP (Potencia de Diseño Térmico) de cada componente. Para CPUs, el TDP va desde 45W para chips básicos hasta 350W para procesadores de estación de trabajo. Las GPUs van desde 75W hasta 575W para las últimas tarjetas tope de gama. La RAM usa aproximadamente 3-5W por módulo, unidades SATA 5-10W, unidades NVMe 5-8W, y ventiladores 2-5W cada uno. El overclocking añade 10-30% adicional. Se aplica un margen de seguridad del 20% para estabilidad del sistema y margen futuro. Para GPUs de las series RTX 40/50, los picos de potencia transitoria son un factor crítico — estas tarjetas pueden consumir brevemente 1.5-2× su TDP nominal en ráfagas de escala de milisegundos. Las fuentes de alimentación ATX 3.0/3.1 están diseñadas para manejar estos picos; las unidades ATX 2.x más antiguas pueden activar la protección contra sobrecorriente y apagarse. El vataje de PSU recomendado se redondea entonces al tamaño de PSU estándar más cercano (450W, 550W, 650W, 750W, 850W, 1000W, 1200W, o 1500W)."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "Picos transitorios de GPU: Las GPUs modernas de gama alta (RTX 4090, 5080, 5090) pueden alcanzar picos de 2× su TDP por microsegundos. Las PSUs ATX 3.0/3.1 manejan esto nativamente; PSUs más antiguas pueden apagarse.",
              "type": "warning"
            },
            {
              "text": "Envejecimiento de condensadores: Los condensadores de PSU pierden 5-15% de capacidad en 3-5 años. Una PSU de 850W puede solo entregar 720-800W después de años de uso. Dimensiona en consecuencia.",
              "type": "warning"
            },
            {
              "text": "La eficiencia 80 PLUS importa: Al 50% de carga, una PSU Gold es 90% eficiente (consume 555W de la pared para entregar 500W). Una unidad básica 80+ es solo 82% eficiente (consume 610W para los mismos 500W).",
              "type": "info"
            },
            {
              "text": "Configuraciones multi-GPU duplican la potencia de GPU. Si usas dos GPUs, multiplica el vataje de GPU por 2 y añade 50W por overhead de placa base.",
              "type": "info"
            },
            {
              "text": "Periféricos USB, tiras RGB y dispositivos externos añaden 10-50W. Presupuesta margen extra si tienes muchos dispositivos USB.",
              "type": "info"
            },
            {
              "text": "Las PSUs modulares reducen el desorden de cables y mejoran el flujo de aire. Completamente modular es ideal para builds personalizados; semi-modular está bien para la mayoría de usuarios.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Niveles de PSU por Tipo de Build",
          "items": [
            {
              "text": "Oficina/HTPC (300-450W): Gráficos integrados, CPU de bajo consumo. Una 450W 80+ Bronze es suficiente. Prioriza operación silenciosa.",
              "type": "info"
            },
            {
              "text": "Gaming Básico (450-550W): GPU gama media como RTX 4060 o RX 7600. Una 550W 80+ Bronze/Gold maneja esto fácilmente.",
              "type": "info"
            },
            {
              "text": "Gaming Gama Media (550-750W): GPU clase RTX 4070/5070 Ti. Una 650-750W 80+ Gold es el punto óptimo para la mayoría de gamers.",
              "type": "info"
            },
            {
              "text": "Gaming Gama Alta (750-1000W): Clase RTX 4080/5080. Consigue una 850W+ ATX 3.0 Gold/Platinum para manejo de picos transitorios.",
              "type": "info"
            },
            {
              "text": "Enthusiast/Tope de Gama (1000-1200W): Builds RTX 4090/5090. 1000W+ ATX 3.1 Platinum es muy recomendado. Estas GPUs tienen picos fuertes.",
              "type": "warning"
            },
            {
              "text": "Estación de Trabajo (1200-1600W): Threadripper/Xeon + GPU Pro. Considera configuraciones de PSU redundante para cargas críticas.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo de PSU",
          "description": "Cálculos de vataje paso a paso para builds reales",
          "examples": [
            {
              "title": "Build Gaming: Ryzen 7 9800X3D + RTX 5080",
              "steps": [
                "CPU: Ryzen 7 9800X3D = 120W TDP",
                "GPU: RTX 5080 = 360W TDP (picos a ~540W)",
                "RAM: 2× DDR5 = 10W | NVMe: 1× = 7W | SATA: 1× = 8W",
                "Ventiladores: 4× = 16W | Overhead placa base: 80W",
                "Total base: 120 + 360 + 10 + 7 + 8 + 16 + 80 = 601W",
                "Margen seguridad (20%): 601 × 1.2 = 721W → PSU 750W"
              ],
              "result": "Recomendado: 850W ATX 3.0 Gold — proporciona margen para picos transitorios de GPU hasta 540W y futuras actualizaciones."
            },
            {
              "title": "Enthusiast: i9-14900K + RTX 5090 (OC Intenso)",
              "steps": [
                "CPU: i9-14900K = 253W TDP + 30% OC = 329W",
                "GPU: RTX 5090 = 575W TDP (¡picos a ~1000W!)",
                "RAM: 4× DDR5 = 20W | NVMe: 2× = 14W | SATA: 2× = 16W",
                "Ventiladores: 6× = 24W | Overhead placa base: 80W",
                "Total base: 329 + 575 + 20 + 14 + 16 + 24 + 80 = 1058W",
                "Margen seguridad (20%): 1058 × 1.2 = 1270W → PSU 1200W"
              ],
              "result": "Recomendado: 1200-1500W ATX 3.1 Platinum. La RTX 5090 puede alcanzar picos de casi 1000W, haciendo ATX 3.x esencial."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "¿Cómo sé qué vataje de PSU necesito?",
          "answer": "Suma el TDP (Potencia de Diseño Térmico) de tu CPU y GPU — estos son los dos mayores consumidores de energía. Luego añade aproximadamente 100-150W para todo lo demás (RAM, almacenamiento, ventiladores, placa base). Aplica un margen de seguridad del 20%, y redondea al tamaño de PSU estándar más cercano. Por ejemplo: un CPU de 150W + GPU de 300W + otros 120W = 570W × 1.2 = 684W → consigue una PSU de 750W. Esta calculadora hace todo esto automáticamente."
        },
        "1": {
          "question": "¿Es malo tener una PSU demasiado potente?",
          "answer": "No es dañino, pero ineficiente. Una PSU de 1200W ejecutando un sistema de 400W opera a aproximadamente 33% de carga, que está por debajo del rango de eficiencia óptimo de 50-80%. Pagarás ligeramente más en electricidad y la PSU cuesta más inicialmente. Sin embargo, sí proporciona máximo margen para futuras actualizaciones. El punto óptimo es una PSU donde tu carga típica caiga entre 50-80% de su capacidad nominal."
        },
        "2": {
          "question": "¿Qué son los picos de potencia transitoria de GPU?",
          "answer": "Las GPUs modernas, especialmente las series RTX 40 y 50 de NVIDIA, pueden consumir brevemente 1.5-2× su TDP nominal en ráfagas de escala de microsegundos. Una RTX 4090 con 450W nominales puede alcanzar picos de 600-900W momentáneamente. Una RTX 5090 a 575W puede alcanzar picos de casi 1000W. Estos transitorios pueden activar la protección contra sobrecorriente en PSUs más antiguas, causando apagados. Las fuentes de alimentación ATX 3.0 y 3.1 están específicamente diseñadas para manejar estos picos a través del conector 12VHPWR/12V-2×6, que soporta hasta 600W continuos por conector."
        },
        "3": {
          "question": "¿Qué significa 80 PLUS Gold/Platinum?",
          "answer": "80 PLUS es una certificación de eficiencia. Mide cuánta potencia AC de la pared se convierte a potencia DC utilizable. 80 PLUS (básico) significa al menos 80% de eficiencia. Bronze añade aproximadamente 2-3%, Gold aproximadamente 87-90%, Platinum 89-92%, y Titanium 91-94% en cargas típicas. La diferencia es dinero real: una PSU Gold alimentando un sistema de 500W ahorra aproximadamente $15-25/año sobre Bronze. En 5-7 años, Platinum se paga a sí mismo versus Bronze en muchos mercados eléctricos."
        },
        "4": {
          "question": "¿Necesito una fuente de alimentación ATX 3.0 o 3.1?",
          "answer": "Si estás usando una GPU RTX 4070 Ti o superior, ATX 3.0/3.1 es muy recomendado. Estos estándares añadieron los conectores 12VHPWR (ATX 3.0) y 12V-2×6 (ATX 3.1), que soportan 600W por conector y están diseñados para manejar picos transitorios de GPU. ATX 3.1 ajustó las tolerancias de regulación de voltaje y mejoró la seguridad del conector después de los problemas iniciales de derretimiento del 12VHPWR. Para builds de gama baja, ATX 2.x sigue siendo perfectamente bueno."
        },
        "5": {
          "question": "¿Cómo afecta el overclocking los requerimientos de PSU?",
          "answer": "El overclocking aumenta tanto el voltaje como la frecuencia, lo que aumenta dramáticamente el consumo de energía. Un overclock moderado de CPU añade 10-15% de consumo, mientras que el overclocking intenso puede añadir 25-30% o más. El overclocking de GPU típicamente añade 10-20%. La fórmula es aproximadamente: Potencia ∝ Voltaje² × Frecuencia. Así que un aumento de voltaje del 10% realmente añade aproximadamente 21% más consumo de energía (1.1² = 1.21). Siempre considera el overclocking al dimensionar tu PSU."
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
      "name": "Calculadora de Fonte",
      "slug": "calculadora-fonte-alimentacao",
      "subtitle": "Calcule a potência ideal da fonte de alimentação para o seu PC. Considera overclocking, envelhecimento de capacitores, eficiência 80 PLUS e custo energético anual.",
      "breadcrumb": "Calculadora de Fonte",
      "seo": {
        "title": "Calculadora de Fonte - Calculadora de Potência PSU para PC (2025)",
        "description": "Encontre a fonte perfeita para o seu PC. Calcula potência total de CPU, GPU, RAM, armazenamento e ventoinhas. Inclui margem para overclocking, classificações 80+, avisos de picos transitórios e custo anual de eletricidade. Ferramenta gratuita multilíngue.",
        "shortDescription": "Calcule a potência correta da fonte de alimentação para o seu PC.",
        "keywords": [
          "calculadora fonte",
          "calculadora fonte alimentação",
          "calculadora potência pc",
          "calculadora watts pc",
          "quantos watts preciso",
          "rtx 5090 fonte",
          "fonte pc gamer",
          "calculadora consumo pc"
        ]
      },
      "inputs": {
        "cpuTier": {
          "label": "Categoria do CPU",
          "helpText": "Selecione a categoria de desempenho que corresponde ao seu processador",
          "options": {
            "budget": "Básico — 45-65W (Ryzen 5 5600, i3-14100)",
            "mid_range": "Intermediário — 65-105W (Ryzen 5 7600, i5-14600K)",
            "high_end": "Avançado — 105-150W (Ryzen 7 9800X3D, i7-14700K)",
            "flagship": "Top de Linha — 150-253W (Ryzen 9 9950X, i9-14900K, Ultra 9 285K)",
            "workstation": "Workstation — 280-350W (Threadripper, Xeon W)"
          }
        },
        "gpuTier": {
          "label": "Categoria da GPU",
          "helpText": "Selecione a categoria de desempenho que corresponde à sua placa de vídeo",
          "options": {
            "none": "Nenhuma / Gráficos Integrados — 0W",
            "budget": "Básica — 75-120W (RTX 4060, RX 7600)",
            "mid_range": "Intermediária — 150-200W (RTX 4070, RX 7800 XT)",
            "high_end": "Avançada — 220-320W (RTX 4080/5070 Ti, RX 7900 XT)",
            "flagship": "Top de Linha — 350-575W (RTX 4090, RTX 5080, RTX 5090)",
            "workstation": "Workstation — 300-450W (RTX A6000, Quadro)"
          }
        },
        "ramSticks": {
          "label": "Pentes de RAM",
          "helpText": "Número de módulos de memória (normalmente 2 ou 4)"
        },
        "sataStorage": {
          "label": "Drives SATA (HDD/SSD)",
          "helpText": "Número de SSDs 2.5\" ou HDDs 3.5\""
        },
        "nvmeStorage": {
          "label": "Drives NVMe M.2",
          "helpText": "Número de SSDs NVMe M.2"
        },
        "fans": {
          "label": "Ventoinhas + AIO/RGB",
          "helpText": "Total de ventoinhas do gabinete, bomba AIO e controladores RGB"
        },
        "overclock": {
          "label": "Overclocking",
          "helpText": "Overclocking aumenta significativamente o consumo de energia",
          "options": {
            "none": "Nenhum — Configurações padrão",
            "moderate": "Moderado — +10-15% de consumo",
            "heavy": "Intenso — +20-30% de consumo"
          }
        },
        "usageHours": {
          "label": "Uso Diário (horas)",
          "helpText": "Média de horas por dia que o PC fica ligado (para cálculo do custo energético)"
        },
        "electricityCost": {
          "label": "Custo da Eletricidade",
          "helpText": "Custo por kWh na sua região (para estimativa do custo energético anual)"
        }
      },
      "results": {
        "recommendedPsu": {
          "label": "Fonte Recomendada"
        },
        "totalSystemWattage": {
          "label": "Potência Total do Sistema"
        },
        "peakWithSpikes": {
          "label": "Pico com Transitórios"
        },
        "cpuWattage": {
          "label": "Consumo do CPU"
        },
        "gpuWattage": {
          "label": "Consumo da GPU"
        },
        "otherWattage": {
          "label": "Outros Componentes"
        },
        "overclockBonus": {
          "label": "Margem para Overclocking"
        },
        "safetyMargin": {
          "label": "Margem de Segurança (20%)"
        },
        "efficiencyAtLoad": {
          "label": "Eficiência na Carga"
        },
        "annualEnergyCost": {
          "label": "Custo Energético Anual"
        },
        "atxStandard": {
          "label": "Padrão ATX"
        },
        "transientWarning": {
          "label": "Picos Transitórios"
        }
      },
      "presets": {
        "officePc": {
          "label": "PC de Escritório",
          "description": "CPU intermediário, gráficos integrados"
        },
        "gamingPc": {
          "label": "PC Gamer",
          "description": "CPU + GPU avançados, OC moderado"
        },
        "enthusiast": {
          "label": "Build Entusiasta",
          "description": "CPU + GPU top de linha, OC intenso"
        },
        "workstation": {
          "label": "Workstation",
          "description": "Threadripper/Xeon + GPU Pro"
        }
      },
      "values": {
        "watts": "W",
        "hours": "horas",
        "perYear": "/ano",
        "none": "Nenhum",
        "recommended": "Recomendado",
        "minimum": "Mínimo",
        "atx2": "ATX 2.x (padrão)",
        "atx3": "ATX 3.0/3.1 (recomendado para RTX 40/50)",
        "lowRisk": "Baixo — dentro das margens seguras",
        "mediumRisk": "Médio — GPU pode pico 1.5× TDP",
        "highRisk": "Alto — GPU pode pico 2× TDP, ATX 3.x fortemente recomendado"
      },
      "formats": {
        "summary": "Seu sistema consome aproximadamente {totalWattage}W (pico {peakWattage}W com transitórios). Fonte recomendada: {recommendedPsu}W (eficiência {efficiency}). Custo energético anual estimado: {annualCost}."
      },
      "infoCards": {
        "metrics": {
          "title": "Resumo de Potência",
          "items": [
            {
              "label": "Fonte Recomendada",
              "valueKey": "recommendedPsu"
            },
            {
              "label": "Potência do Sistema",
              "valueKey": "totalSystemWattage"
            },
            {
              "label": "Pico com Transitórios",
              "valueKey": "peakWithSpikes"
            },
            {
              "label": "Custo Energético Anual",
              "valueKey": "annualEnergyCost"
            }
          ]
        },
        "details": {
          "title": "Detalhamento de Componentes",
          "items": [
            {
              "label": "CPU",
              "valueKey": "cpuWattage"
            },
            {
              "label": "GPU",
              "valueKey": "gpuWattage"
            },
            {
              "label": "RAM + Armazenamento + Ventoinhas",
              "valueKey": "otherWattage"
            },
            {
              "label": "Margem para Overclocking",
              "valueKey": "overclockBonus"
            },
            {
              "label": "Margem de Segurança",
              "valueKey": "safetyMargin"
            },
            {
              "label": "Padrão ATX",
              "valueKey": "atxStandard"
            },
            {
              "label": "Risco de Pico Transitório",
              "valueKey": "transientWarning"
            },
            {
              "label": "Eficiência na Carga",
              "valueKey": "efficiencyAtLoad"
            }
          ]
        },
        "tips": {
          "title": "Dicas para Compra de Fonte",
          "items": [
            "Sempre compre mais do que precisa — uma fonte operando entre 50-80% da carga é mais eficiente e dura mais.",
            "80 PLUS Gold ou superior economiza dinheiro real na eletricidade. A diferença entre Bronze e Gold pode ser R$100-250/ano.",
            "Para RTX 4090/5080/5090, use uma fonte ATX 3.0/3.1 com conector 12VHPWR nativo para lidar com picos de potência transitórios com segurança.",
            "Capacitores se degradam com o tempo. Após 3-5 anos, espere ~10% menos potência efetiva. Dimensione sua fonte considerando isso."
          ]
        }
      },
      "chart": {
        "title": "Distribuição de Potência",
        "xLabel": "Componente",
        "yLabel": "Watts",
        "series": {
          "value": "Potência (W)"
        }
      },
      "detailedTable": {
        "efficiencyTable": {
          "button": "Ver Níveis de Eficiência 80 PLUS",
          "title": "Certificação 80 PLUS — Eficiência em Diferentes Cargas",
          "columns": {
            "tier": "Certificação",
            "at20": "Carga 20%",
            "at50": "Carga 50%",
            "at100": "Carga 100%",
            "savings": "Economia Anual vs Bronze"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Calculadora de Fonte?",
          "content": "Uma calculadora de fonte estima o consumo total de energia dos componentes do seu PC e recomenda a potência apropriada da fonte de alimentação. Todo componente no seu computador — desde CPU e GPU até RAM, drives de armazenamento e ventoinhas — consome energia da fonte. Se sua fonte não conseguir fornecer potência suficiente, seu sistema travará, reiniciará aleatoriamente ou falhará ao inicializar. Por outro lado, uma fonte superdimensionada desperdiça dinheiro e opera com menor eficiência. A fonte ideal opera entre 50-80% da sua capacidade nominal, onde unidades certificadas 80 PLUS modernas alcançam sua maior eficiência. Esta calculadora considera fatores do mundo real que ferramentas mais simples ignoram: margem para overclocking, picos de potência transitórios da GPU (que podem brevemente alcançar 2× o TDP nominal), envelhecimento de capacitores ao longo do tempo e perdas de eficiência inerentes à conversão AC-DC."
        },
        "howItWorks": {
          "title": "Como a Potência da Fonte é Calculada",
          "content": "O cálculo começa somando o TDP (Thermal Design Power) de cada componente. Para CPUs, o TDP varia de 45W para chips básicos até 350W para processadores workstation. GPUs variam de 75W até 575W para as placas top de linha mais recentes. RAM usa cerca de 3-5W por pente, drives SATA 5-10W, drives NVMe 5-8W e ventoinhas 2-5W cada. Overclocking adiciona 10-30% por cima. Uma margem de segurança de 20% é aplicada para estabilidade do sistema e margem futura. Para GPUs das séries RTX 40/50, picos de potência transitórios são um fator crítico — essas placas podem brevemente consumir 1,5-2× seu TDP nominal em rajadas de escala de milissegundos. Fontes ATX 3.0/3.1 são projetadas para lidar com esses picos; unidades ATX 2.x mais antigas podem disparar proteção contra sobrecorrente e desligar. A potência recomendada da fonte é então arredondada para o tamanho padrão mais próximo (450W, 550W, 650W, 750W, 850W, 1000W, 1200W ou 1500W)."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Picos transitórios da GPU: GPUs modernas de alto desempenho (RTX 4090, 5080, 5090) podem pico até 2× seu TDP por microssegundos. Fontes ATX 3.0/3.1 lidam com isso nativamente; fontes mais antigas podem desligar.",
              "type": "warning"
            },
            {
              "text": "Envelhecimento de capacitores: Capacitores da fonte perdem 5-15% da capacidade em 3-5 anos. Uma fonte de 850W pode entregar apenas 720-800W após anos de uso. Dimensione adequadamente.",
              "type": "warning"
            },
            {
              "text": "Eficiência 80 PLUS importa: A 50% de carga, uma fonte Gold tem 90% de eficiência (consome 555W da tomada para entregar 500W). Uma unidade 80+ básica tem apenas 82% (consome 610W para os mesmos 500W).",
              "type": "info"
            },
            {
              "text": "Configurações multi-GPU dobram o consumo da GPU. Se usar duas GPUs, multiplique a potência da GPU por 2 e adicione 50W para overhead da placa-mãe.",
              "type": "info"
            },
            {
              "text": "Periféricos USB, fitas RGB e dispositivos externos adicionam 10-50W. Reserve margem extra se tiver muitos dispositivos USB.",
              "type": "info"
            },
            {
              "text": "Fontes modulares reduzem bagunça de cabos e melhoram o fluxo de ar. Totalmente modular é ideal para builds personalizados; semi-modular serve para a maioria dos usuários.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Categorias de Fonte por Tipo de Build",
          "items": [
            {
              "text": "Escritório/HTPC (300-450W): Gráficos integrados, CPU de baixo consumo. Uma 450W 80+ Bronze é suficiente. Priorize operação silenciosa.",
              "type": "info"
            },
            {
              "text": "Gaming Básico (450-550W): GPU intermediária como RTX 4060 ou RX 7600. Uma 550W 80+ Bronze/Gold lida com isso facilmente.",
              "type": "info"
            },
            {
              "text": "Gaming Intermediário (550-750W): GPU classe RTX 4070/5070 Ti. Uma 650-750W 80+ Gold é o ponto ideal para a maioria dos gamers.",
              "type": "info"
            },
            {
              "text": "Gaming Avançado (750-1000W): GPU classe RTX 4080/5080. Obtenha uma 850W+ ATX 3.0 Gold/Platinum para lidar com picos transitórios.",
              "type": "info"
            },
            {
              "text": "Entusiasta/Top de Linha (1000-1200W): Builds RTX 4090/5090. 1000W+ ATX 3.1 Platinum é fortemente recomendado. Essas GPUs têm picos intensos.",
              "type": "warning"
            },
            {
              "text": "Workstation (1200-1600W): Threadripper/Xeon + GPU Pro. Considere configurações de fonte redundante para cargas críticas.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de Fonte",
          "description": "Cálculos passo a passo de potência para builds reais",
          "examples": [
            {
              "title": "Build Gamer: Ryzen 7 9800X3D + RTX 5080",
              "steps": [
                "CPU: Ryzen 7 9800X3D = 120W TDP",
                "GPU: RTX 5080 = 360W TDP (picos até ~540W)",
                "RAM: 2× DDR5 = 10W | NVMe: 1× = 7W | SATA: 1× = 8W",
                "Ventoinhas: 4× = 16W | Overhead da placa-mãe: 80W",
                "Total base: 120 + 360 + 10 + 7 + 8 + 16 + 80 = 601W",
                "Margem de segurança (20%): 601 × 1,2 = 721W → Fonte 750W"
              ],
              "result": "Recomendado: 850W ATX 3.0 Gold — fornece margem para picos transitórios da GPU até 540W e upgrades futuros."
            },
            {
              "title": "Entusiasta: i9-14900K + RTX 5090 (OC Intenso)",
              "steps": [
                "CPU: i9-14900K = 253W TDP + 30% OC = 329W",
                "GPU: RTX 5090 = 575W TDP (picos até ~1000W!)",
                "RAM: 4× DDR5 = 20W | NVMe: 2× = 14W | SATA: 2× = 16W",
                "Ventoinhas: 6× = 24W | Overhead da placa-mãe: 80W",
                "Total base: 329 + 575 + 20 + 14 + 16 + 24 + 80 = 1058W",
                "Margem de segurança (20%): 1058 × 1,2 = 1270W → Fonte 1200W"
              ],
              "result": "Recomendado: 1200-1500W ATX 3.1 Platinum. A RTX 5090 pode picar até quase 1000W, tornando ATX 3.x essencial."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Como sei que potência de fonte preciso?",
          "answer": "Some o TDP (Thermal Design Power) do seu CPU e GPU — estes são os dois maiores consumidores de energia. Depois adicione aproximadamente 100-150W para todo o resto (RAM, armazenamento, ventoinhas, placa-mãe). Aplique uma margem de segurança de 20% e arredonde para o tamanho padrão de fonte mais próximo. Por exemplo: CPU 150W + GPU 300W + outros 120W = 570W × 1,2 = 684W → compre uma fonte de 750W. Esta calculadora faz tudo isso automaticamente."
        },
        "1": {
          "question": "É ruim ter uma fonte muito potente?",
          "answer": "Não é prejudicial, mas ineficiente. Uma fonte de 1200W rodando um sistema de 400W opera em cerca de 33% de carga, que está abaixo da faixa de eficiência ideal de 50-80%. Você pagará um pouco mais na eletricidade e a fonte custa mais inicialmente. Porém, oferece margem máxima para upgrades futuros. O ponto ideal é uma fonte onde sua carga típica fica entre 50-80% da capacidade nominal."
        },
        "2": {
          "question": "O que são picos de potência transitórios da GPU?",
          "answer": "GPUs modernas, especialmente as séries RTX 40 e 50 da NVIDIA, podem brevemente consumir 1,5-2× seu TDP nominal em rajadas de escala de microssegundos. Uma RTX 4090 com 450W pode picar até 600-900W momentaneamente. Uma RTX 5090 com 575W pode picar até quase 1000W. Esses transitórios podem disparar proteção contra sobrecorrente em fontes antigas, causando desligamentos. Fontes ATX 3.0 e 3.1 são especificamente projetadas para lidar com esses picos através do conector 12VHPWR/12V-2×6, que suporta até 600W contínuos por conector."
        },
        "3": {
          "question": "O que significa 80 PLUS Gold/Platinum?",
          "answer": "80 PLUS é uma certificação de eficiência. Mede quanta energia AC da tomada é convertida em energia DC utilizável. 80 PLUS (básico) significa pelo menos 80% de eficiência. Bronze adiciona cerca de 2-3%, Gold cerca de 87-90%, Platinum 89-92% e Titanium 91-94% em cargas típicas. A diferença é dinheiro real: uma fonte Gold alimentando um sistema de 500W economiza cerca de R$75-125/ano sobre Bronze. Ao longo de 5-7 anos, Platinum se paga versus Bronze em muitos mercados de eletricidade."
        },
        "4": {
          "question": "Preciso de uma fonte ATX 3.0 ou 3.1?",
          "answer": "Se você está usando uma GPU RTX 4070 Ti ou superior, ATX 3.0/3.1 é fortemente recomendado. Esses padrões adicionaram os conectores 12VHPWR (ATX 3.0) e 12V-2×6 (ATX 3.1), que suportam 600W por conector e são projetados para lidar com picos transitórios da GPU. ATX 3.1 apertou as tolerâncias de regulação de voltagem e melhorou a segurança do conector após problemas iniciais de derretimento do 12VHPWR. Para builds de entrada, ATX 2.x ainda é perfeitamente adequado."
        },
        "5": {
          "question": "Como o overclocking afeta os requisitos da fonte?",
          "answer": "Overclocking aumenta tanto voltagem quanto frequência, o que aumenta drasticamente o consumo de energia. Um overclock moderado de CPU adiciona 10-15% de consumo, enquanto overclocking pesado pode adicionar 25-30% ou mais. Overclocking de GPU tipicamente adiciona 10-20%. A fórmula é aproximadamente: Potência ∝ Voltagem² × Frequência. Então um aumento de 10% na voltagem na verdade adiciona cerca de 21% mais consumo de energia (1,1² = 1,21). Sempre considere overclocking ao dimensionar sua fonte."
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
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      }
    },
    fr: {
      "name": "Calculateur d'Alimentation PC",
      "slug": "calculateur-alimentation-pc",
      "subtitle": "Calculez la puissance d'alimentation idéale pour votre configuration PC. Prend en compte l'overclocking, le vieillissement des condensateurs, l'efficacité 80 PLUS et le coût énergétique annuel.",
      "breadcrumb": "Calculateur d'Alimentation PC",
      "seo": {
        "title": "Calculateur d'Alimentation PC - Calculateur de Puissance PSU (2025)",
        "description": "Trouvez l'alimentation parfaite pour votre PC. Calcule la puissance totale du CPU, GPU, RAM, stockage et ventilateurs. Inclut la marge d'overclocking, les certifications 80+, les alertes de pics transitoires et le coût électrique annuel. Outil gratuit multilingue.",
        "shortDescription": "Calculez la puissance d'alimentation appropriée pour votre PC.",
        "keywords": [
          "calculateur psu",
          "calculateur alimentation pc",
          "calculateur puissance pc",
          "calculateur wattage alimentation",
          "combien de watts j'ai besoin",
          "rtx 5090 alimentation",
          "alimentation pc gaming",
          "calculateur consommation pc"
        ]
      },
      "inputs": {
        "cpuTier": {
          "label": "Gamme de CPU",
          "helpText": "Sélectionnez la gamme de performance qui correspond à votre processeur",
          "options": {
            "budget": "Entrée de gamme — 45-65W (Ryzen 5 5600, i3-14100)",
            "mid_range": "Milieu de gamme — 65-105W (Ryzen 5 7600, i5-14600K)",
            "high_end": "Haut de gamme — 105-150W (Ryzen 7 9800X3D, i7-14700K)",
            "flagship": "Premium — 150-253W (Ryzen 9 9950X, i9-14900K, Ultra 9 285K)",
            "workstation": "Station de travail — 280-350W (Threadripper, Xeon W)"
          }
        },
        "gpuTier": {
          "label": "Gamme de GPU",
          "helpText": "Sélectionnez la gamme de performance qui correspond à votre carte graphique",
          "options": {
            "none": "Aucune / Graphiques intégrés — 0W",
            "budget": "Entrée de gamme — 75-120W (RTX 4060, RX 7600)",
            "mid_range": "Milieu de gamme — 150-200W (RTX 4070, RX 7800 XT)",
            "high_end": "Haut de gamme — 220-320W (RTX 4080/5070 Ti, RX 7900 XT)",
            "flagship": "Premium — 350-575W (RTX 4090, RTX 5080, RTX 5090)",
            "workstation": "Station de travail — 300-450W (RTX A6000, Quadro)"
          }
        },
        "ramSticks": {
          "label": "Barrettes RAM",
          "helpText": "Nombre de modules mémoire (généralement 2 ou 4)"
        },
        "sataStorage": {
          "label": "Lecteurs SATA (HDD/SSD)",
          "helpText": "Nombre de SSD 2,5\" ou HDD 3,5\""
        },
        "nvmeStorage": {
          "label": "Lecteurs NVMe M.2",
          "helpText": "Nombre de SSD NVMe M.2"
        },
        "fans": {
          "label": "Ventilateurs boîtier + AIO/RGB",
          "helpText": "Total des ventilateurs boîtier, pompe AIO et contrôleurs RGB"
        },
        "overclock": {
          "label": "Overclocking",
          "helpText": "L'overclocking augmente significativement la consommation",
          "options": {
            "none": "Aucun — Paramètres d'usine",
            "moderate": "Modéré — +10-15% de consommation",
            "heavy": "Important — +20-30% de consommation"
          }
        },
        "usageHours": {
          "label": "Utilisation quotidienne (heures)",
          "helpText": "Heures moyennes par jour où le PC est allumé (pour le calcul du coût énergétique)"
        },
        "electricityCost": {
          "label": "Coût de l'électricité",
          "helpText": "Coût par kWh dans votre région (pour l'estimation du coût énergétique annuel)"
        }
      },
      "results": {
        "recommendedPsu": {
          "label": "Alimentation recommandée"
        },
        "totalSystemWattage": {
          "label": "Puissance totale du système"
        },
        "peakWithSpikes": {
          "label": "Pic avec transitoires"
        },
        "cpuWattage": {
          "label": "Consommation CPU"
        },
        "gpuWattage": {
          "label": "Consommation GPU"
        },
        "otherWattage": {
          "label": "Autres composants"
        },
        "overclockBonus": {
          "label": "Marge d'overclocking"
        },
        "safetyMargin": {
          "label": "Marge de sécurité (20%)"
        },
        "efficiencyAtLoad": {
          "label": "Efficacité à la charge"
        },
        "annualEnergyCost": {
          "label": "Coût énergétique annuel"
        },
        "atxStandard": {
          "label": "Standard ATX"
        },
        "transientWarning": {
          "label": "Pics transitoires"
        }
      },
      "presets": {
        "officePc": {
          "label": "PC Bureau",
          "description": "CPU milieu de gamme, graphiques intégrés"
        },
        "gamingPc": {
          "label": "PC Gaming",
          "description": "CPU + GPU haut de gamme, OC modéré"
        },
        "enthusiast": {
          "label": "Build Enthusiaste",
          "description": "CPU + GPU premium, OC important"
        },
        "workstation": {
          "label": "Station de travail",
          "description": "Threadripper/Xeon + GPU Pro"
        }
      },
      "values": {
        "watts": "W",
        "hours": "heures",
        "perYear": "/an",
        "none": "Aucun",
        "recommended": "Recommandé",
        "minimum": "Minimum",
        "atx2": "ATX 2.x (standard)",
        "atx3": "ATX 3.0/3.1 (recommandé pour RTX 40/50)",
        "lowRisk": "Faible — dans les marges sécurisées",
        "mediumRisk": "Moyen — le GPU peut piquer à 1,5× TDP",
        "highRisk": "Élevé — le GPU peut piquer à 2× TDP, ATX 3.x fortement recommandé"
      },
      "formats": {
        "summary": "Votre système consomme approximativement {totalWattage}W (pic {peakWattage}W avec transitoires). Alimentation recommandée : {recommendedPsu}W (efficacité {efficiency}). Coût énergétique annuel estimé : {annualCost}."
      },
      "infoCards": {
        "metrics": {
          "title": "Résumé de la puissance",
          "items": [
            {
              "label": "Alimentation recommandée",
              "valueKey": "recommendedPsu"
            },
            {
              "label": "Puissance du système",
              "valueKey": "totalSystemWattage"
            },
            {
              "label": "Pic avec transitoires",
              "valueKey": "peakWithSpikes"
            },
            {
              "label": "Coût énergétique annuel",
              "valueKey": "annualEnergyCost"
            }
          ]
        },
        "details": {
          "title": "Détail des composants",
          "items": [
            {
              "label": "CPU",
              "valueKey": "cpuWattage"
            },
            {
              "label": "GPU",
              "valueKey": "gpuWattage"
            },
            {
              "label": "RAM + Stockage + Ventilateurs",
              "valueKey": "otherWattage"
            },
            {
              "label": "Marge d'overclocking",
              "valueKey": "overclockBonus"
            },
            {
              "label": "Marge de sécurité",
              "valueKey": "safetyMargin"
            },
            {
              "label": "Standard ATX",
              "valueKey": "atxStandard"
            },
            {
              "label": "Risque de pics transitoires",
              "valueKey": "transientWarning"
            },
            {
              "label": "Efficacité à la charge",
              "valueKey": "efficiencyAtLoad"
            }
          ]
        },
        "tips": {
          "title": "Conseils d'achat d'alimentation",
          "items": [
            "Achetez toujours plus que nécessaire — une alimentation fonctionnant à 50-80% de charge est plus efficace et dure plus longtemps.",
            "80 PLUS Gold ou supérieur économise vraiment sur l'électricité. La différence entre Bronze et Gold peut être de 20-50€/an.",
            "Pour RTX 4090/5080/5090, utilisez une alimentation ATX 3.0/3.1 avec connecteur 12VHPWR natif pour gérer les pics de puissance transitoires en sécurité.",
            "Les condensateurs se dégradent avec le temps. Après 3-5 ans, attendez-vous à ~10% de puissance effective en moins. Dimensionnez votre alimentation en conséquence."
          ]
        }
      },
      "chart": {
        "title": "Répartition de la puissance",
        "xLabel": "Composant",
        "yLabel": "Watts",
        "series": {
          "value": "Puissance (W)"
        }
      },
      "detailedTable": {
        "efficiencyTable": {
          "button": "Voir les niveaux d'efficacité 80 PLUS",
          "title": "Certification 80 PLUS — Efficacité selon les charges",
          "columns": {
            "tier": "Certification",
            "at20": "Charge 20%",
            "at50": "Charge 50%",
            "at100": "Charge 100%",
            "savings": "Économies annuelles vs Bronze"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un calculateur d'alimentation PC ?",
          "content": "Un calculateur d'alimentation PC estime la consommation totale de vos composants PC et recommande la puissance d'alimentation appropriée. Chaque composant de votre ordinateur — du CPU et GPU à la RAM, aux disques de stockage et aux ventilateurs — tire sa puissance de l'alimentation. Si votre alimentation ne peut pas fournir assez de watts, votre système plantera, redémarrera aléatoirement ou ne démarrera pas du tout. Inversement, une alimentation surdimensionnée gaspille de l'argent et fonctionne à une efficacité moindre. L'alimentation idéale fonctionne à 50-80% de sa capacité nominale, où les unités certifiées 80 PLUS modernes atteignent leur efficacité maximale. Ce calculateur tient compte des facteurs du monde réel que les outils plus simples ignorent : marge d'overclocking, pics de puissance transitoires du GPU (qui peuvent brièvement atteindre 2× le TDP nominal), vieillissement des condensateurs dans le temps, et les pertes d'efficacité inhérentes à la conversion AC-DC."
        },
        "howItWorks": {
          "title": "Comment la puissance d'alimentation est calculée",
          "content": "Le calcul commence par additionner le TDP (Thermal Design Power) de chaque composant. Pour les CPU, le TDP va de 45W pour les puces d'entrée de gamme à 350W pour les processeurs de station de travail. Les GPU vont de 75W à 575W pour les dernières cartes premium. La RAM utilise environ 3-5W par barrette, les disques SATA 5-10W, les disques NVMe 5-8W, et les ventilateurs 2-5W chacun. L'overclocking ajoute 10-30% en plus. Une marge de sécurité de 20% est appliquée pour la stabilité du système et une marge future. Pour les GPU des séries RTX 40/50, les pics de puissance transitoires sont un facteur critique — ces cartes peuvent brièvement consommer 1,5-2× leur TDP nominal en rafales de l'ordre de la milliseconde. Les alimentations ATX 3.0/3.1 sont conçues pour gérer ces pics ; les anciennes unités ATX 2.x peuvent déclencher la protection contre les surintensités et s'arrêter. La puissance d'alimentation recommandée est alors arrondie à la taille d'alimentation standard la plus proche (450W, 550W, 650W, 750W, 850W, 1000W, 1200W, ou 1500W)."
        },
        "considerations": {
          "title": "Considérations importantes",
          "items": [
            {
              "text": "Pics transitoires du GPU : Les GPU haut de gamme modernes (RTX 4090, 5080, 5090) peuvent piquer à 2× leur TDP pendant des microsecondes. Les alimentations ATX 3.0/3.1 gèrent cela nativement ; les anciennes alimentations peuvent s'arrêter.",
              "type": "warning"
            },
            {
              "text": "Vieillissement des condensateurs : Les condensateurs d'alimentation perdent 5-15% de capacité sur 3-5 ans. Une alimentation de 850W ne peut délivrer que 720-800W après des années d'utilisation. Dimensionnez en conséquence.",
              "type": "warning"
            },
            {
              "text": "L'efficacité 80 PLUS compte : À 50% de charge, une alimentation Gold est efficace à 90% (tire 555W du mur pour délivrer 500W). Une unité 80+ basique n'est efficace qu'à 82% (tire 610W pour les mêmes 500W).",
              "type": "info"
            },
            {
              "text": "Les configurations multi-GPU doublent la puissance GPU. Si vous utilisez deux GPU, multipliez la puissance GPU par 2 et ajoutez 50W pour la surcharge de la carte mère.",
              "type": "info"
            },
            {
              "text": "Les périphériques USB, bandes LED RGB et appareils externes ajoutent 10-50W. Prévoyez une marge supplémentaire si vous avez beaucoup d'appareils USB.",
              "type": "info"
            },
            {
              "text": "Les alimentations modulaires réduisent l'encombrement des câbles et améliorent le flux d'air. Entièrement modulaire est idéal pour les builds personnalisés ; semi-modulaire convient à la plupart des utilisateurs.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Gammes d'alimentation par type de build",
          "items": [
            {
              "text": "Bureau/HTPC (300-450W) : Graphiques intégrés, CPU basse consommation. Une 450W 80+ Bronze suffit largement. Privilégiez le fonctionnement silencieux.",
              "type": "info"
            },
            {
              "text": "Gaming entrée de gamme (450-550W) : GPU milieu de gamme comme RTX 4060 ou RX 7600. Une 550W 80+ Bronze/Gold gère cela facilement.",
              "type": "info"
            },
            {
              "text": "Gaming milieu de gamme (550-750W) : GPU classe RTX 4070/5070 Ti. Une 650-750W 80+ Gold est le point idéal pour la plupart des gamers.",
              "type": "info"
            },
            {
              "text": "Gaming haut de gamme (750-1000W) : Classe RTX 4080/5080. Prenez une 850W+ ATX 3.0 Gold/Platinum pour la gestion des pics transitoires.",
              "type": "info"
            },
            {
              "text": "Enthusiaste/Premium (1000-1200W) : Builds RTX 4090/5090. 1000W+ ATX 3.1 Platinum fortement recommandé. Ces GPU piquent fort.",
              "type": "warning"
            },
            {
              "text": "Station de travail (1200-1600W) : Threadripper/Xeon + GPU Pro. Considérez des configurations d'alimentation redondantes pour les charges critiques.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de calcul d'alimentation",
          "description": "Calculs de puissance étape par étape pour des builds réels",
          "examples": [
            {
              "title": "Build Gaming : Ryzen 7 9800X3D + RTX 5080",
              "steps": [
                "CPU : Ryzen 7 9800X3D = 120W TDP",
                "GPU : RTX 5080 = 360W TDP (pique à ~540W)",
                "RAM : 2× DDR5 = 10W | NVMe : 1× = 7W | SATA : 1× = 8W",
                "Ventilateurs : 4× = 16W | Surcharge carte mère : 80W",
                "Total de base : 120 + 360 + 10 + 7 + 8 + 16 + 80 = 601W",
                "Marge de sécurité (20%) : 601 × 1,2 = 721W → Alimentation 750W"
              ],
              "result": "Recommandé : 850W ATX 3.0 Gold — fournit une marge pour les pics transitoires du GPU jusqu'à 540W et les futures améliorations."
            },
            {
              "title": "Enthusiaste : i9-14900K + RTX 5090 (OC important)",
              "steps": [
                "CPU : i9-14900K = 253W TDP + 30% OC = 329W",
                "GPU : RTX 5090 = 575W TDP (pique à ~1000W !)",
                "RAM : 4× DDR5 = 20W | NVMe : 2× = 14W | SATA : 2× = 16W",
                "Ventilateurs : 6× = 24W | Surcharge carte mère : 80W",
                "Total de base : 329 + 575 + 20 + 14 + 16 + 24 + 80 = 1058W",
                "Marge de sécurité (20%) : 1058 × 1,2 = 1270W → Alimentation 1200W"
              ],
              "result": "Recommandé : 1200-1500W ATX 3.1 Platinum. La RTX 5090 peut piquer à près de 1000W, rendant ATX 3.x essentiel."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Comment savoir quelle puissance d'alimentation j'ai besoin ?",
          "answer": "Additionnez le TDP (Thermal Design Power) de votre CPU et GPU — ce sont les deux plus gros consommateurs. Puis ajoutez environ 100-150W pour tout le reste (RAM, stockage, ventilateurs, carte mère). Appliquez une marge de sécurité de 20%, et arrondissez à la taille d'alimentation standard la plus proche. Par exemple : un CPU 150W + GPU 300W + autres 120W = 570W × 1,2 = 684W → prenez une alimentation 750W. Ce calculateur fait tout cela automatiquement."
        },
        "1": {
          "question": "Est-ce mauvais d'avoir une alimentation trop puissante ?",
          "answer": "Pas nuisible, mais inefficace. Une alimentation 1200W alimentant un système 400W fonctionne à environ 33% de charge, ce qui est en dessous de la plage d'efficacité optimale de 50-80%. Vous paierez légèrement plus d'électricité et l'alimentation coûte plus cher à l'achat. Cependant, cela donne une marge maximale pour les futures améliorations. Le point idéal est une alimentation où votre charge typique se situe entre 50-80% de sa capacité nominale."
        },
        "2": {
          "question": "Que sont les pics de puissance transitoires du GPU ?",
          "answer": "Les GPU modernes, spécialement les séries RTX 40 et 50 de NVIDIA, peuvent brièvement consommer 1,5-2× leur TDP nominal en rafales de l'ordre de la microseconde. Une RTX 4090 de 450W peut piquer à 600-900W momentanément. Une RTX 5090 à 575W peut piquer à près de 1000W. Ces transitoires peuvent déclencher la protection contre les surintensités sur les anciennes alimentations, causant des arrêts. Les alimentations ATX 3.0 et 3.1 sont spécifiquement conçues pour gérer ces pics via le connecteur 12VHPWR/12V-2×6, qui supporte jusqu'à 600W continu par connecteur."
        },
        "3": {
          "question": "Que signifie 80 PLUS Gold/Platinum ?",
          "answer": "80 PLUS est une certification d'efficacité. Elle mesure combien de puissance AC du mur est convertie en puissance DC utilisable. 80 PLUS (basique) signifie au moins 80% d'efficacité. Bronze ajoute environ 2-3%, Gold environ 87-90%, Platinum 89-92%, et Titanium 91-94% à charges typiques. La différence représente de l'argent réel : une alimentation Gold alimentant un système 500W économise environ 15-25€/an par rapport à Bronze. Sur 5-7 ans, Platinum se rentabilise par rapport à Bronze dans beaucoup de marchés électriques."
        },
        "4": {
          "question": "Ai-je besoin d'une alimentation ATX 3.0 ou 3.1 ?",
          "answer": "Si vous utilisez un GPU RTX 4070 Ti ou supérieur, ATX 3.0/3.1 est fortement recommandé. Ces standards ont ajouté les connecteurs 12VHPWR (ATX 3.0) et 12V-2×6 (ATX 3.1), qui supportent 600W par connecteur et sont conçus pour gérer les pics transitoires du GPU. ATX 3.1 a resserré les tolérances de régulation de tension et amélioré la sécurité des connecteurs après les premiers problèmes de fusion du 12VHPWR. Pour les builds d'entrée de gamme, ATX 2.x convient encore parfaitement."
        },
        "5": {
          "question": "Comment l'overclocking affecte-t-il les exigences d'alimentation ?",
          "answer": "L'overclocking augmente à la fois la tension et la fréquence, ce qui augmente dramatiquement la consommation. Un overclocking modéré du CPU ajoute 10-15% de consommation, tandis qu'un overclocking important peut ajouter 25-30% ou plus. L'overclocking GPU ajoute typiquement 10-20%. La formule est approximativement : Puissance ∝ Tension² × Fréquence. Donc une augmentation de tension de 10% ajoute en fait environ 21% de consommation en plus (1,1² = 1,21). Tenez toujours compte de l'overclocking lors du dimensionnement de votre alimentation."
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
      "name": "Netzteil Rechner",
      "slug": "netzteil-rechner",
      "subtitle": "Berechnen Sie die ideale Netzteilleistung für Ihren PC-Build. Berücksichtigt Übertaktung, Kondensatoralterung, 80 PLUS Effizienz und jährliche Energiekosten.",
      "breadcrumb": "Netzteil Rechner",
      "seo": {
        "title": "Netzteil Rechner - PC Netzteil Watt Rechner (2025)",
        "description": "Finden Sie das perfekte Netzteil für Ihren PC-Build. Berechnet Gesamtleistung von CPU, GPU, RAM, Speicher und Lüftern. Inklusive Übertaktungsreserve, 80+ Effizienzklassen, Transientenspitzen-Warnungen und jährliche Stromkosten. Kostenloses mehrsprachiges Tool.",
        "shortDescription": "Berechnen Sie die richtige Netzteilleistung für Ihren PC.",
        "keywords": [
          "netzteil rechner",
          "netzteil calculator",
          "pc watt rechner",
          "netzteil watt rechner",
          "wie viel watt brauche ich",
          "rtx 5090 netzteil",
          "gaming pc netzteil",
          "pc stromverbrauch rechner"
        ]
      },
      "inputs": {
        "cpuTier": {
          "label": "CPU Klasse",
          "helpText": "Wählen Sie die Leistungsklasse Ihres Prozessors",
          "options": {
            "budget": "Budget — 45-65W (Ryzen 5 5600, i3-14100)",
            "mid_range": "Mittelklasse — 65-105W (Ryzen 5 7600, i5-14600K)",
            "high_end": "High-End — 105-150W (Ryzen 7 9800X3D, i7-14700K)",
            "flagship": "Flagship — 150-253W (Ryzen 9 9950X, i9-14900K, Ultra 9 285K)",
            "workstation": "Workstation — 280-350W (Threadripper, Xeon W)"
          }
        },
        "gpuTier": {
          "label": "GPU Klasse",
          "helpText": "Wählen Sie die Leistungsklasse Ihrer Grafikkarte",
          "options": {
            "none": "Keine / Integrierte Grafik — 0W",
            "budget": "Budget — 75-120W (RTX 4060, RX 7600)",
            "mid_range": "Mittelklasse — 150-200W (RTX 4070, RX 7800 XT)",
            "high_end": "High-End — 220-320W (RTX 4080/5070 Ti, RX 7900 XT)",
            "flagship": "Flagship — 350-575W (RTX 4090, RTX 5080, RTX 5090)",
            "workstation": "Workstation — 300-450W (RTX A6000, Quadro)"
          }
        },
        "ramSticks": {
          "label": "RAM Riegel",
          "helpText": "Anzahl der Speichermodule (typisch 2 oder 4)"
        },
        "sataStorage": {
          "label": "SATA Laufwerke (HDD/SSD)",
          "helpText": "Anzahl der 2,5\" SSDs oder 3,5\" HDDs"
        },
        "nvmeStorage": {
          "label": "NVMe M.2 Laufwerke",
          "helpText": "Anzahl der NVMe M.2 SSDs"
        },
        "fans": {
          "label": "Gehäuselüfter + AIO/RGB",
          "helpText": "Gesamtzahl Gehäuselüfter, AIO-Pumpe und RGB-Controller"
        },
        "overclock": {
          "label": "Übertaktung",
          "helpText": "Übertaktung erhöht den Stromverbrauch erheblich",
          "options": {
            "none": "Keine — Standardeinstellungen",
            "moderate": "Moderat — +10-15% Stromverbrauch",
            "heavy": "Stark — +20-30% Stromverbrauch"
          }
        },
        "usageHours": {
          "label": "Tägliche Nutzung (Stunden)",
          "helpText": "Durchschnittliche Stunden pro Tag, die der PC eingeschaltet ist (für Energiekostenberechnung)"
        },
        "electricityCost": {
          "label": "Stromkosten",
          "helpText": "Kosten pro kWh in Ihrer Region (für jährliche Energiekostenschätzung)"
        }
      },
      "results": {
        "recommendedPsu": {
          "label": "Empfohlenes Netzteil"
        },
        "totalSystemWattage": {
          "label": "Gesamtsystemleistung"
        },
        "peakWithSpikes": {
          "label": "Spitze mit Transienten"
        },
        "cpuWattage": {
          "label": "CPU Leistungsaufnahme"
        },
        "gpuWattage": {
          "label": "GPU Leistungsaufnahme"
        },
        "otherWattage": {
          "label": "Andere Komponenten"
        },
        "overclockBonus": {
          "label": "Übertaktungsreserve"
        },
        "safetyMargin": {
          "label": "Sicherheitsmarge (20%)"
        },
        "efficiencyAtLoad": {
          "label": "Effizienz bei Last"
        },
        "annualEnergyCost": {
          "label": "Jährliche Energiekosten"
        },
        "atxStandard": {
          "label": "ATX Standard"
        },
        "transientWarning": {
          "label": "Transientenspitzen"
        }
      },
      "presets": {
        "officePc": {
          "label": "Büro PC",
          "description": "Mittelklasse CPU, integrierte Grafik"
        },
        "gamingPc": {
          "label": "Gaming PC",
          "description": "High-End CPU + GPU, moderate ÜT"
        },
        "enthusiast": {
          "label": "Enthusiast Build",
          "description": "Flagship CPU + GPU, starke ÜT"
        },
        "workstation": {
          "label": "Workstation",
          "description": "Threadripper/Xeon + Pro GPU"
        }
      },
      "values": {
        "watts": "W",
        "hours": "Stunden",
        "perYear": "/Jahr",
        "none": "Keine",
        "recommended": "Empfohlen",
        "minimum": "Minimum",
        "atx2": "ATX 2.x (Standard)",
        "atx3": "ATX 3.0/3.1 (empfohlen für RTX 40/50)",
        "lowRisk": "Niedrig — innerhalb sicherer Grenzen",
        "mediumRisk": "Mittel — GPU kann 1,5× TDP erreichen",
        "highRisk": "Hoch — GPU kann 2× TDP erreichen, ATX 3.x dringend empfohlen"
      },
      "formats": {
        "summary": "Ihr System verbraucht etwa {totalWattage}W (Spitze {peakWattage}W mit Transienten). Empfohlenes Netzteil: {recommendedPsu}W ({efficiency} Effizienz). Geschätzte jährliche Energiekosten: {annualCost}."
      },
      "infoCards": {
        "metrics": {
          "title": "Leistungsübersicht",
          "items": [
            {
              "label": "Empfohlenes Netzteil",
              "valueKey": "recommendedPsu"
            },
            {
              "label": "Systemleistung",
              "valueKey": "totalSystemWattage"
            },
            {
              "label": "Spitze mit Spitzen",
              "valueKey": "peakWithSpikes"
            },
            {
              "label": "Jährliche Energiekosten",
              "valueKey": "annualEnergyCost"
            }
          ]
        },
        "details": {
          "title": "Komponentenaufschlüsselung",
          "items": [
            {
              "label": "CPU",
              "valueKey": "cpuWattage"
            },
            {
              "label": "GPU",
              "valueKey": "gpuWattage"
            },
            {
              "label": "RAM + Speicher + Lüfter",
              "valueKey": "otherWattage"
            },
            {
              "label": "Übertaktungsreserve",
              "valueKey": "overclockBonus"
            },
            {
              "label": "Sicherheitsmarge",
              "valueKey": "safetyMargin"
            },
            {
              "label": "ATX Standard",
              "valueKey": "atxStandard"
            },
            {
              "label": "Transientenspitzen-Risiko",
              "valueKey": "transientWarning"
            },
            {
              "label": "Effizienz bei Last",
              "valueKey": "efficiencyAtLoad"
            }
          ]
        },
        "tips": {
          "title": "Netzteil Kauftipps",
          "items": [
            "Kaufen Sie immer mehr als nötig — ein Netzteil bei 50-80% Last ist am effizientesten und langlebigsten.",
            "80 PLUS Gold oder höher spart echtes Geld bei Stromkosten. Der Unterschied zwischen Bronze und Gold kann 20-50€/Jahr betragen.",
            "Für RTX 4090/5080/5090 verwenden Sie ein ATX 3.0/3.1 Netzteil mit nativem 12VHPWR-Anschluss für sichere Transientenspitzen.",
            "Kondensatoren altern mit der Zeit. Nach 3-5 Jahren erwarten Sie ~10% weniger effektive Leistung. Planen Sie Ihr Netzteil entsprechend."
          ]
        }
      },
      "chart": {
        "title": "Leistungsverteilung",
        "xLabel": "Komponente",
        "yLabel": "Watt",
        "series": {
          "value": "Leistung (W)"
        }
      },
      "detailedTable": {
        "efficiencyTable": {
          "button": "80 PLUS Effizienzklassen anzeigen",
          "title": "80 PLUS Zertifizierung — Effizienz bei verschiedenen Lasten",
          "columns": {
            "tier": "Zertifizierung",
            "at20": "20% Last",
            "at50": "50% Last",
            "at100": "100% Last",
            "savings": "Jährliche Ersparnis vs Bronze"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Netzteil-Rechner?",
          "content": "Ein Netzteil-Rechner schätzt den gesamten Stromverbrauch Ihrer PC-Komponenten und empfiehlt die geeignete Netzteilleistung. Jede Komponente in Ihrem Computer — von CPU und GPU bis zu RAM, Laufwerken und Lüftern — bezieht Strom vom Netzteil. Kann Ihr Netzteil nicht genug Leistung liefern, stürzt Ihr System ab, startet zufällig neu oder bootet gar nicht. Umgekehrt verschwendet ein überdimensioniertes Netzteil Geld und arbeitet mit geringerer Effizienz. Das ideale Netzteil läuft bei 50-80% seiner Nennkapazität, wo moderne 80 PLUS zertifizierte Einheiten ihre höchste Effizienz erreichen. Dieser Rechner berücksichtigt reale Faktoren, die einfachere Tools ignorieren: Übertaktungsreserve, GPU-Transientenspitzen (die kurz 2× die Nenn-TDP erreichen können), Kondensatoralterung über Zeit und Effizienzverluste bei AC-zu-DC-Wandlung."
        },
        "howItWorks": {
          "title": "Wie Netzteilleistung berechnet wird",
          "content": "Die Berechnung beginnt mit der Summierung der TDP (Thermal Design Power) jeder Komponente. Bei CPUs reicht die TDP von 45W für Budget-Chips bis 350W für Workstation-Prozessoren. GPUs reichen von 75W bis 575W für die neuesten Flaggschiff-Karten. RAM verbraucht etwa 3-5W pro Riegel, SATA-Laufwerke 5-10W, NVMe-Laufwerke 5-8W und Lüfter 2-5W jeweils. Übertaktung fügt 10-30% hinzu. Eine 20% Sicherheitsmarge wird für Systemstabilität und zukünftige Reserve angewendet. Bei GPUs der RTX 40/50-Serie sind Transientenspitzen ein kritischer Faktor — diese Karten können kurz 1,5-2× ihre Nenn-TDP in Millisekundenschnellen Spitzen ziehen. ATX 3.0/3.1 Netzteile sind für diese Spitzen ausgelegt; ältere ATX 2.x Einheiten können Überstromschutz auslösen und abschalten. Die empfohlene Netzteilleistung wird dann auf die nächste Standard-Netzteilgröße aufgerundet."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "GPU-Transientenspitzen: Moderne High-End-GPUs (RTX 4090, 5080, 5090) können mikrosekundenlang auf 2× ihrer TDP springen. ATX 3.0/3.1 Netzteile handhaben das nativ; ältere Netzteile können abschalten.",
              "type": "warning"
            },
            {
              "text": "Kondensatoralterung: Netzteilkondensatoren verlieren über 3-5 Jahre 5-15% Kapazität. Ein 850W Netzteil liefert nach Jahren nur noch 720-800W. Entsprechend dimensionieren.",
              "type": "warning"
            },
            {
              "text": "80 PLUS Effizienz wichtig: Bei 50% Last ist ein Gold-Netzteil 90% effizient (zieht 555W aus der Wand für 500W). Eine Basic 80+ Einheit ist nur 82% effizient (610W für dieselben 500W).",
              "type": "info"
            },
            {
              "text": "Multi-GPU-Setups verdoppeln GPU-Leistung. Bei zwei GPUs GPU-Verbrauch × 2 plus 50W Mainboard-Overhead rechnen.",
              "type": "info"
            },
            {
              "text": "USB-Peripherie, RGB-Strips und externe Geräte fügen 10-50W hinzu. Extra Reserve für viele USB-Geräte einplanen.",
              "type": "info"
            },
            {
              "text": "Modulare Netzteile reduzieren Kabelsalat und verbessern Airflow. Voll-modular ideal für Custom-Builds; semi-modular für die meisten Nutzer ausreichend.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Netzteil-Klassen nach Build-Typ",
          "items": [
            {
              "text": "Büro/HTPC (300-450W): Integrierte Grafik, stromsparende CPU. 450W 80+ Bronze reicht. Leisen Betrieb priorisieren.",
              "type": "info"
            },
            {
              "text": "Budget Gaming (450-550W): Mittelklasse GPU wie RTX 4060 oder RX 7600. 550W 80+ Bronze/Gold reicht problemlos.",
              "type": "info"
            },
            {
              "text": "Mittelklasse Gaming (550-750W): RTX 4070/5070 Ti Klasse GPU. 650-750W 80+ Gold ist der Sweet Spot für die meisten Gamer.",
              "type": "info"
            },
            {
              "text": "High-End Gaming (750-1000W): RTX 4080/5080 Klasse. 850W+ ATX 3.0 Gold/Platinum für Transientenspitzen-Handling.",
              "type": "info"
            },
            {
              "text": "Enthusiast/Flagship (1000-1200W): RTX 4090/5090 Builds. 1000W+ ATX 3.1 Platinum dringend empfohlen. Diese GPUs spiken hart.",
              "type": "warning"
            },
            {
              "text": "Workstation (1200-1600W): Threadripper/Xeon + Pro GPU. Redundante Netzteil-Setups für kritische Workloads erwägen.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Netzteil-Berechnungsbeispiele",
          "description": "Schritt-für-Schritt Wattage-Berechnungen für echte Builds",
          "examples": [
            {
              "title": "Gaming Build: Ryzen 7 9800X3D + RTX 5080",
              "steps": [
                "CPU: Ryzen 7 9800X3D = 120W TDP",
                "GPU: RTX 5080 = 360W TDP (spitzt auf ~540W)",
                "RAM: 2× DDR5 = 10W | NVMe: 1× = 7W | SATA: 1× = 8W",
                "Lüfter: 4× = 16W | Mainboard-Overhead: 80W",
                "Basis gesamt: 120 + 360 + 10 + 7 + 8 + 16 + 80 = 601W",
                "Sicherheitsmarge (20%): 601 × 1,2 = 721W → 750W Netzteil"
              ],
              "result": "Empfohlen: 850W ATX 3.0 Gold — bietet Reserve für GPU-Transientenspitzen bis 540W und zukünftige Upgrades."
            },
            {
              "title": "Enthusiast: i9-14900K + RTX 5090 (Starke ÜT)",
              "steps": [
                "CPU: i9-14900K = 253W TDP + 30% ÜT = 329W",
                "GPU: RTX 5090 = 575W TDP (spitzt auf ~1000W!)",
                "RAM: 4× DDR5 = 20W | NVMe: 2× = 14W | SATA: 2× = 16W",
                "Lüfter: 6× = 24W | Mainboard-Overhead: 80W",
                "Basis gesamt: 329 + 575 + 20 + 14 + 16 + 24 + 80 = 1058W",
                "Sicherheitsmarge (20%): 1058 × 1,2 = 1270W → 1200W Netzteil"
              ],
              "result": "Empfohlen: 1200-1500W ATX 3.1 Platinum. Die RTX 5090 kann auf fast 1000W spitzen, macht ATX 3.x essentiell."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Woher weiß ich, welche Netzteil-Wattage ich brauche?",
          "answer": "Addieren Sie die TDP (Thermal Design Power) Ihrer CPU und GPU — das sind die beiden größten Stromverbraucher. Dann fügen Sie etwa 100-150W für alles andere hinzu (RAM, Speicher, Lüfter, Mainboard). Wenden Sie 20% Sicherheitsmarge an und runden auf die nächste Standard-Netzteilgröße auf. Beispiel: 150W CPU + 300W GPU + 120W andere = 570W × 1,2 = 684W → 750W Netzteil nehmen. Dieser Rechner macht das alles automatisch."
        },
        "1": {
          "question": "Ist ein zu starkes Netzteil schlecht?",
          "answer": "Nicht schädlich, aber ineffizient. Ein 1200W Netzteil für ein 400W System läuft bei etwa 33% Last, was unter dem optimalen 50-80% Effizienzbereich liegt. Sie zahlen etwas mehr Strom und das Netzteil kostet mehr. Es gibt aber maximale Reserve für zukünftige Upgrades. Der Sweet Spot ist ein Netzteil, wo Ihre typische Last zwischen 50-80% seiner Nennkapazität fällt."
        },
        "2": {
          "question": "Was sind GPU-Transientenspitzen?",
          "answer": "Moderne GPUs, besonders NVIDIAs RTX 40 und 50 Serie, können kurz 1,5-2× ihrer Nenn-TDP in Mikrosekundenschnellen Spitzen ziehen. Eine RTX 4090 mit 450W kann momentan auf 600-900W spitzen. Eine RTX 5090 bei 575W kann auf fast 1000W spitzen. Diese Transienten können Überstromschutz bei älteren Netzteilen auslösen und Abschaltungen verursachen. ATX 3.0 und 3.1 Netzteile sind speziell für diese Spitzen durch den 12VHPWR/12V-2×6 Stecker ausgelegt, der bis zu 600W kontinuierlich pro Stecker unterstützt."
        },
        "3": {
          "question": "Was bedeutet 80 PLUS Gold/Platinum?",
          "answer": "80 PLUS ist eine Effizienzzertifizierung. Sie misst, wie viel AC-Strom aus der Wand in nutzbaren DC-Strom gewandelt wird. 80 PLUS (basic) bedeutet mindestens 80% Effizienz. Bronze fügt etwa 2-3% hinzu, Gold etwa 87-90%, Platinum 89-92% und Titanium 91-94% bei typischen Lasten. Der Unterschied ist echtes Geld: Ein Gold-Netzteil für ein 500W System spart etwa 15-25€/Jahr gegenüber Bronze. Über 5-7 Jahre amortisiert sich Platinum gegenüber Bronze in vielen Strommärkten."
        },
        "4": {
          "question": "Brauche ich ein ATX 3.0 oder 3.1 Netzteil?",
          "answer": "Falls Sie eine RTX 4070 Ti oder höhere GPU verwenden, ist ATX 3.0/3.1 dringend empfohlen. Diese Standards fügten die 12VHPWR (ATX 3.0) und 12V-2×6 (ATX 3.1) Stecker hinzu, die 600W pro Stecker unterstützen und für GPU-Transientenspitzen ausgelegt sind. ATX 3.1 verschärfte Spannungsregulierungs-Toleranzen und verbesserte Steckersicherheit nach frühen 12VHPWR-Schmelzproblemen. Für Low-End-Builds ist ATX 2.x immer noch völlig in Ordnung."
        },
        "5": {
          "question": "Wie beeinflusst Übertaktung Netzteil-Anforderungen?",
          "answer": "Übertaktung erhöht sowohl Spannung als auch Frequenz, was den Stromverbrauch dramatisch steigert. Eine moderate CPU-Übertaktung fügt 10-15% Stromverbrauch hinzu, während starke Übertaktung 25-30% oder mehr hinzufügen kann. GPU-Übertaktung fügt typisch 10-20% hinzu. Die Formel ist etwa: Leistung ∝ Spannung² × Frequenz. Eine 10% Spannungserhöhung fügt also etwa 21% mehr Stromverbrauch hinzu (1,1² = 1,21). Berücksichtigen Sie immer Übertaktung bei der Netzteil-Dimensionierung."
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
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      }
    },
  },

  inputs: [
    {
      id: "cpuTier",
      type: "select",
      defaultValue: "mid_range",
      options: [
        { value: "budget" },
        { value: "mid_range" },
        { value: "high_end" },
        { value: "flagship" },
        { value: "workstation" },
      ],
    },
    {
      id: "gpuTier",
      type: "select",
      defaultValue: "mid_range",
      options: [
        { value: "none" },
        { value: "budget" },
        { value: "mid_range" },
        { value: "high_end" },
        { value: "flagship" },
        { value: "workstation" },
      ],
    },
    {
      id: "ramSticks",
      type: "number",
      defaultValue: 2,
      min: 1,
      max: 8,
      step: 1,
    },
    {
      id: "sataStorage",
      type: "number",
      defaultValue: 1,
      min: 0,
      max: 10,
      step: 1,
    },
    {
      id: "nvmeStorage",
      type: "number",
      defaultValue: 1,
      min: 0,
      max: 6,
      step: 1,
    },
    {
      id: "fans",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 15,
      step: 1,
    },
    {
      id: "overclock",
      type: "select",
      defaultValue: "none",
      options: [
        { value: "none" },
        { value: "moderate" },
        { value: "heavy" },
      ],
    },
    {
      id: "usageHours",
      type: "number",
      defaultValue: 8,
      min: 1,
      max: 24,
      step: 1,
    },
    {
      id: "electricityCost",
      type: "number",
      defaultValue: null,
      min: 0.01,
      max: 1.0,
      step: 0.01,
      placeholder: "0.12",
    },
  ],
  inputGroups: [],

  results: [
    { id: "recommendedPsu", type: "primary", format: "text" },
    { id: "totalSystemWattage", type: "secondary", format: "text" },
    { id: "peakWithSpikes", type: "secondary", format: "text" },
    { id: "cpuWattage", type: "secondary", format: "text" },
    { id: "gpuWattage", type: "secondary", format: "text" },
    { id: "otherWattage", type: "secondary", format: "text" },
    { id: "overclockBonus", type: "secondary", format: "text" },
    { id: "safetyMargin", type: "secondary", format: "text" },
    { id: "efficiencyAtLoad", type: "secondary", format: "text" },
    { id: "annualEnergyCost", type: "secondary", format: "text" },
    { id: "atxStandard", type: "secondary", format: "text" },
    { id: "transientWarning", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "⚡", itemCount: 4 },
    { id: "details", type: "list", icon: "📊", itemCount: 8 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "powerBreakdown",
    type: "bar",
    xKey: "component",
    height: 320,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "value", color: "#3b82f6" },
    ],
  },

  detailedTable: {
    id: "efficiencyTable",
    buttonLabel: "View 80 PLUS Efficiency Levels",
    buttonIcon: "⚡",
    modalTitle: "80 PLUS Certification — Efficiency at Different Loads",
    columns: [
      { id: "tier", label: "Certification", align: "left" },
      { id: "at20", label: "20% Load", align: "center" },
      { id: "at50", label: "50% Load", align: "center", highlight: true },
      { id: "at100", label: "100% Load", align: "center" },
      { id: "savings", label: "Annual Savings vs Bronze", align: "right" },
    ],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "⚠️", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "Intel Corporation",
      year: "2025",
      title: "ATX12V Power Supply Design Guide v3.1",
      source: "Intel Technical Documentation",
      url: "https://www.intel.com/content/www/us/en/standards/atx12v-psu-design-guide.html",
    },
    {
      authors: "80 PLUS / Ecova",
      year: "2025",
      title: "80 PLUS Certified Power Supplies and Manufacturers",
      source: "80 PLUS Program",
      url: "https://www.clearesult.com/80plus/",
    },
    {
      authors: "NVIDIA Corporation",
      year: "2025",
      title: "GeForce RTX 50 Series System Requirements",
      source: "NVIDIA Technical Docs",
      url: "https://www.nvidia.com/en-us/geforce/",
    },
  ],

  hero: { showRating: true, showShare: true },
  sidebar: { showAds: true, showRelated: true },
  features: { save: true, pdf: true, csv: true, excel: true },
  relatedCalculators: ["electricity-cost", "bandwidth", "transfer-time", "ip-subnet"],
  ads: { sidebar: true, footer: true },
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT WATTAGE DATA
// ─────────────────────────────────────────────────────────────────────────────

interface ComponentPower {
  typical: number;   // Typical load wattage
  peak: number;      // Peak/TDP wattage
  spikeFactor: number; // Transient spike multiplier (1.0 = no spikes)
}

const CPU_TIERS: Record<string, ComponentPower> = {
  budget:      { typical: 45,  peak: 65,  spikeFactor: 1.0 },
  mid_range:   { typical: 65,  peak: 105, spikeFactor: 1.0 },
  high_end:    { typical: 105, peak: 150, spikeFactor: 1.05 },
  flagship:    { typical: 150, peak: 253, spikeFactor: 1.1 },
  workstation: { typical: 280, peak: 350, spikeFactor: 1.1 },
};

const GPU_TIERS: Record<string, ComponentPower> = {
  none:        { typical: 0,   peak: 0,   spikeFactor: 1.0 },
  budget:      { typical: 75,  peak: 120, spikeFactor: 1.2 },
  mid_range:   { typical: 150, peak: 200, spikeFactor: 1.3 },
  high_end:    { typical: 220, peak: 320, spikeFactor: 1.5 },
  flagship:    { typical: 350, peak: 575, spikeFactor: 1.8 },
  workstation: { typical: 300, peak: 450, spikeFactor: 1.4 },
};

const PER_UNIT_WATTS = {
  ram: 5,        // per stick (DDR4/DDR5 ~3-5W)
  sata: 8,       // per HDD ~8-10W, SSD ~3-5W, average 8W
  nvme: 7,       // per NVMe M.2
  fan: 4,        // per fan/RGB strip
  motherboard: 80, // base motherboard + chipset + USB etc.
};

const OVERCLOCK_MULTIPLIER: Record<string, number> = {
  none: 1.0,
  moderate: 1.15,
  heavy: 1.30,
};

// Standard PSU sizes available on market
const PSU_SIZES = [450, 550, 650, 750, 850, 1000, 1200, 1500, 1600];

// 80 PLUS efficiency at 50% load (sweet spot)
const EFFICIENCY_80PLUS: Record<string, number> = {
  basic:    0.82,
  bronze:   0.85,
  silver:   0.88,
  gold:     0.90,
  platinum: 0.92,
  titanium: 0.94,
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function roundToNearestPsu(watts: number): number {
  for (const size of PSU_SIZES) {
    if (size >= watts) return size;
  }
  return PSU_SIZES[PSU_SIZES.length - 1];
}

function getTransientRisk(gpuTier: string): string {
  if (gpuTier === "flagship") return "highRisk";
  if (gpuTier === "high_end") return "mediumRisk";
  return "lowRisk";
}

function getAtxStandard(gpuTier: string): string {
  if (gpuTier === "flagship" || gpuTier === "high_end") return "atx3";
  return "atx2";
}

function fmtNum(val: number): string {
  return Math.round(val).toLocaleString("en-US");
}

function fmtCurrency(val: number): string {
  return `$${val.toFixed(2)}`;
}

// 80 PLUS efficiency table data
function generateEfficiencyTable(systemWattage: number, usageHours: number, electricityCost: number): Array<Record<string, string>> {
  const hoursPerYear = usageHours * 365;
  const bronzeCost = (systemWattage / EFFICIENCY_80PLUS.bronze) * hoursPerYear / 1000 * electricityCost;

  return Object.entries(EFFICIENCY_80PLUS).map(([tier, eff]) => {
    const wallWatts = systemWattage / eff;
    const annualKwh = wallWatts * hoursPerYear / 1000;
    const annualCost = annualKwh * electricityCost;
    const savings = bronzeCost - annualCost;

    return {
      tier: `80+ ${tier.charAt(0).toUpperCase() + tier.slice(1)}`,
      at20: `${Math.round(eff * 100 - 5)}%`,
      at50: `${Math.round(eff * 100)}%`,
      at100: `${Math.round(eff * 100 - 3)}%`,
      savings: tier === "bronze" ? "—" : `${fmtCurrency(savings)}/yr`,
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATE
// ─────────────────────────────────────────────────────────────────────────────

export function calculatePsu(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const cpuTier = (values.cpuTier as string) || "mid_range";
  const gpuTier = (values.gpuTier as string) || "mid_range";
  const ramSticks = Number(values.ramSticks) || 2;
  const sataStorage = Number(values.sataStorage) || 0;
  const nvmeStorage = Number(values.nvmeStorage) || 1;
  const fans = Number(values.fans) || 3;
  const overclock = (values.overclock as string) || "none";
  const usageHours = Number(values.usageHours) || 8;
  const electricityCost = Number(values.electricityCost) || 0.12;

  // ── Component wattages ──────────────────────────────────────────────
  const cpu = CPU_TIERS[cpuTier] || CPU_TIERS.mid_range;
  const gpu = GPU_TIERS[gpuTier] || GPU_TIERS.none;

  const cpuWatts = cpu.peak;
  const gpuWatts = gpu.peak;
  const ramWatts = ramSticks * PER_UNIT_WATTS.ram;
  const sataWatts = sataStorage * PER_UNIT_WATTS.sata;
  const nvmeWatts = nvmeStorage * PER_UNIT_WATTS.nvme;
  const fanWatts = fans * PER_UNIT_WATTS.fan;
  const moboWatts = PER_UNIT_WATTS.motherboard;

  const otherWatts = ramWatts + sataWatts + nvmeWatts + fanWatts + moboWatts;

  // ── Base total (before OC) ──────────────────────────────────────────
  const baseTotal = cpuWatts + gpuWatts + otherWatts;

  // ── Overclock adjustment (applied to CPU + GPU only) ────────────────
  const ocMultiplier = OVERCLOCK_MULTIPLIER[overclock] || 1.0;
  const ocCpuWatts = Math.round(cpuWatts * ocMultiplier);
  const ocGpuWatts = Math.round(gpuWatts * ocMultiplier);
  const overclockBonus = (ocCpuWatts - cpuWatts) + (ocGpuWatts - gpuWatts);

  const totalWithOc = ocCpuWatts + ocGpuWatts + otherWatts;

  // ── Safety margin (20%) ─────────────────────────────────────────────
  const safetyMarginWatts = Math.round(totalWithOc * 0.20);
  const totalWithSafety = totalWithOc + safetyMarginWatts;

  // ── Transient spikes (GPU peak × spike factor) ──────────────────────
  const gpuSpikeWatts = Math.round(ocGpuWatts * gpu.spikeFactor);
  const peakWithSpikes = ocCpuWatts + gpuSpikeWatts + otherWatts;

  // ── Recommended PSU size ────────────────────────────────────────────
  // Use the higher of (total + safety) or (peak with spikes)
  const targetWattage = Math.max(totalWithSafety, peakWithSpikes);
  const recommendedPsu = roundToNearestPsu(targetWattage);

  // ── Efficiency calculation ──────────────────────────────────────────
  const loadPercentage = totalWithOc / recommendedPsu;
  // Estimate 80+ Gold efficiency at this load
  let efficiencyEstimate: number;
  if (loadPercentage < 0.20) efficiencyEstimate = 0.87;
  else if (loadPercentage <= 0.50) efficiencyEstimate = 0.90;
  else if (loadPercentage <= 0.80) efficiencyEstimate = 0.89;
  else efficiencyEstimate = 0.87;

  const wallWatts = totalWithOc / efficiencyEstimate;
  const efficiencyStr = `~${Math.round(efficiencyEstimate * 100)}% (80+ Gold at ${Math.round(loadPercentage * 100)}% load)`;

  // ── Annual energy cost ──────────────────────────────────────────────
  // Use typical load (not peak) for energy cost
  const typicalLoad = cpu.typical + gpu.typical + otherWatts;
  const typicalWallWatts = typicalLoad / efficiencyEstimate;
  const annualKwh = (typicalWallWatts * usageHours * 365) / 1000;
  const annualCost = annualKwh * electricityCost;

  // ── ATX standard ────────────────────────────────────────────────────
  const atxKey = getAtxStandard(gpuTier);
  const atxLabel = v[atxKey] || (atxKey === "atx3" ? "ATX 3.0/3.1 (recommended)" : "ATX 2.x (standard)");

  // ── Transient risk ──────────────────────────────────────────────────
  const riskKey = getTransientRisk(gpuTier);
  const riskLabel = v[riskKey] || riskKey;

  const wattsLabel = v["watts"] || "W";

  // ── Chart data ──────────────────────────────────────────────────────
  const chartData = [
    { component: "CPU", value: ocCpuWatts },
    { component: "GPU", value: ocGpuWatts },
    { component: "RAM", value: ramWatts },
    { component: "Storage", value: sataWatts + nvmeWatts },
    { component: "Fans/RGB", value: fanWatts },
    { component: "Motherboard", value: moboWatts },
  ].filter((d) => d.value > 0);

  // ── Efficiency table ────────────────────────────────────────────────
  const tableData = generateEfficiencyTable(totalWithOc, usageHours, electricityCost);

  // ── Summary ─────────────────────────────────────────────────────────
  const summary = (f.summary || "Your system draws approximately {totalWattage}W (peak {peakWattage}W with transients). Recommended PSU: {recommendedPsu}W ({efficiency} efficiency). Estimated annual energy cost: {annualCost}.")
    .replace("{totalWattage}", `${totalWithOc}`)
    .replace("{peakWattage}", `${peakWithSpikes}`)
    .replace("{recommendedPsu}", `${recommendedPsu}`)
    .replace("{efficiency}", `${Math.round(efficiencyEstimate * 100)}%`)
    .replace("{annualCost}", fmtCurrency(annualCost));

  return {
    values: {
      recommendedPsu,
      totalSystemWattage: totalWithOc,
      peakWithSpikes,
      cpuWattage: ocCpuWatts,
      gpuWattage: ocGpuWatts,
      otherWattage: otherWatts,
      overclockBonus,
      safetyMargin: safetyMarginWatts,
      efficiencyAtLoad: efficiencyEstimate,
      annualEnergyCost: annualCost,
      atxStandard: atxLabel,
      transientWarning: riskLabel,
    },
    formatted: {
      recommendedPsu: `${fmtNum(recommendedPsu)}${wattsLabel}`,
      totalSystemWattage: `${fmtNum(totalWithOc)}${wattsLabel}`,
      peakWithSpikes: `${fmtNum(peakWithSpikes)}${wattsLabel}`,
      cpuWattage: `${fmtNum(ocCpuWatts)}${wattsLabel}`,
      gpuWattage: `${fmtNum(ocGpuWatts)}${wattsLabel}`,
      otherWattage: `${fmtNum(otherWatts)}${wattsLabel}`,
      overclockBonus: overclockBonus > 0 ? `+${fmtNum(overclockBonus)}${wattsLabel}` : `0${wattsLabel}`,
      safetyMargin: `+${fmtNum(safetyMarginWatts)}${wattsLabel}`,
      efficiencyAtLoad: efficiencyStr,
      annualEnergyCost: `${fmtCurrency(annualCost)}${v["perYear"] || "/year"}`,
      atxStandard: atxLabel,
      transientWarning: riskLabel,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default psuCalculatorConfig;
