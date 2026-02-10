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
