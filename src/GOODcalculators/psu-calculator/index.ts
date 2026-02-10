import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ============================================================
// PSU Calculator — Power Supply Unit Wattage Calculator
// Engine V4 — Kalcufy.com
// ============================================================

export const psuCalculatorConfig: CalculatorConfigV4 = {
  id: "psu-calculator",
  version: "4.0",
  category: "technology",
  icon: "⚡",

  presets: [
    {
      id: "officePc",
      icon: "🖥️",
      values: {
        cpuWatts: 65,
        gpuWatts: 0,
        ramSticks: 2,
        sataStorage: 1,
        nvmeStorage: 1,
        hddStorage: 0,
        fans: 2,
        usbDevices: 3,
        rgbLighting: "none",
        overclocking: "none",
        efficiencyRating: "80plus_bronze",
        usageHours: 8,
        electricityCost: 0.12,
      },
    },
    {
      id: "midGaming",
      icon: "🎮",
      values: {
        cpuWatts: 105,
        gpuWatts: 200,
        ramSticks: 2,
        sataStorage: 1,
        nvmeStorage: 1,
        hddStorage: 0,
        fans: 4,
        usbDevices: 4,
        rgbLighting: "moderate",
        overclocking: "none",
        efficiencyRating: "80plus_gold",
        usageHours: 6,
        electricityCost: 0.12,
      },
    },
    {
      id: "highEndGaming",
      icon: "🔥",
      values: {
        cpuWatts: 170,
        gpuWatts: 450,
        ramSticks: 4,
        sataStorage: 1,
        nvmeStorage: 2,
        hddStorage: 0,
        fans: 6,
        usbDevices: 5,
        rgbLighting: "heavy",
        overclocking: "moderate",
        efficiencyRating: "80plus_gold",
        usageHours: 6,
        electricityCost: 0.12,
      },
    },
    {
      id: "workstation",
      icon: "🏗️",
      values: {
        cpuWatts: 280,
        gpuWatts: 350,
        ramSticks: 8,
        sataStorage: 2,
        nvmeStorage: 2,
        hddStorage: 2,
        fans: 6,
        usbDevices: 6,
        rgbLighting: "none",
        overclocking: "none",
        efficiencyRating: "80plus_platinum",
        usageHours: 12,
        electricityCost: 0.12,
      },
    },
  ],

  t: {
    en: {
      name: "PSU Calculator",
      slug: "psu-calculator",
      subtitle: "Calculate the right power supply wattage for your PC build and see annual energy costs.",
      breadcrumb: "PSU Calc",

      seo: {
        title: "PSU Calculator - PC Power Supply Wattage Tool",
        description: "Calculate the exact power supply wattage your PC needs. Enter your CPU, GPU, and components to get PSU recommendations with efficiency ratings and energy costs.",
        shortDescription: "Find the right PSU wattage for your PC build.",
        keywords: [
          "psu calculator",
          "power supply calculator",
          "pc wattage calculator",
          "psu wattage calculator",
          "how many watts does my pc need",
          "free psu calculator",
          "pc power consumption calculator",
          "power supply size",
        ],
      },

      calculator: { yourInformation: "Your PC Components" },
      ui: {
        yourInformation: "Your PC Components",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        cpuWatts: {
          label: "CPU TDP",
          helpText: "Thermal Design Power of your processor (check manufacturer specs). Common: i5 = 65-125W, i7 = 125-253W, i9 = 150-253W, Ryzen 5 = 65W, Ryzen 7 = 105W, Ryzen 9 = 170W.",
        },
        gpuWatts: {
          label: "GPU TDP",
          helpText: "Graphics card power draw. Enter 0 if using integrated graphics. Common: RTX 4060 = 115W, RTX 4070 = 200W, RTX 4080 = 320W, RTX 4090 = 450W, RX 7800 XT = 263W, RTX 5080 = 350W, RTX 5090 = 500W.",
        },
        ramSticks: {
          label: "RAM Sticks",
          helpText: "Number of RAM modules installed (each uses ~3-5W).",
        },
        sataStorage: {
          label: "SATA SSDs",
          helpText: "Number of 2.5-inch SATA SSDs (~5W each).",
        },
        nvmeStorage: {
          label: "NVMe SSDs",
          helpText: "Number of M.2 NVMe drives (~7W each).",
        },
        hddStorage: {
          label: "Hard Drives (HDD)",
          helpText: "Number of mechanical hard drives (~10W each).",
        },
        fans: {
          label: "Case Fans",
          helpText: "Total number of case fans (~3W each). Include CPU cooler fans.",
        },
        usbDevices: {
          label: "USB Devices",
          helpText: "Number of USB peripherals (keyboard, mouse, headset, webcam, etc.) (~2.5W each).",
        },
        rgbLighting: {
          label: "RGB Lighting",
          helpText: "Amount of RGB lighting in your build.",
          options: {
            none: "None",
            minimal: "Minimal (1-2 strips)",
            moderate: "Moderate (fans + strips)",
            heavy: "Heavy (full RGB build)",
          },
        },
        overclocking: {
          label: "Overclocking",
          helpText: "Overclocking increases power consumption significantly.",
          options: {
            none: "None (stock)",
            light: "Light OC (+10%)",
            moderate: "Moderate OC (+20%)",
            heavy: "Heavy OC (+30%)",
          },
        },
        efficiencyRating: {
          label: "PSU Efficiency Rating",
          helpText: "Higher efficiency = less wasted power as heat. 80+ Gold is the sweet spot for most builds.",
          options: {
            "80plus": "80 Plus (80%)",
            "80plus_bronze": "80+ Bronze (85%)",
            "80plus_silver": "80+ Silver (88%)",
            "80plus_gold": "80+ Gold (90%)",
            "80plus_platinum": "80+ Platinum (92%)",
            "80plus_titanium": "80+ Titanium (94%)",
          },
        },
        usageHours: {
          label: "Daily Usage",
          helpText: "Average hours per day your PC is running.",
        },
        electricityCost: {
          label: "Electricity Cost",
          helpText: "Cost per kilowatt-hour (kWh). US average is ~$0.12. Check your electricity bill.",
        },
      },

      results: {
        totalSystemWatts: { label: "Total System Power Draw" },
        recommendedPsu: { label: "Recommended PSU" },
        minimumPsu: { label: "Minimum PSU" },
        loadPercentage: { label: "Load at Recommended PSU" },
        annualEnergyCost: { label: "Estimated Annual Energy Cost" },
        dailyKwh: { label: "Daily Energy Usage" },
      },

      presets: {
        officePc: {
          label: "Office PC",
          description: "Basic desktop for productivity and web browsing",
        },
        midGaming: {
          label: "Mid-Range Gaming",
          description: "RTX 4060-class gaming build",
        },
        highEndGaming: {
          label: "High-End Gaming",
          description: "RTX 4090-class enthusiast build",
        },
        workstation: {
          label: "Workstation",
          description: "Content creation and professional workloads",
        },
      },

      values: {
        W: "W",
        kWh: "kWh",
        year: "year",
      },

      formats: {
        summary: "Your PC needs approximately {totalWatts}W. We recommend a {recommended}W power supply ({efficiency} efficiency) for optimal performance with headroom for upgrades.",
      },

      infoCards: {
        metrics: {
          title: "Power Summary",
          items: [
            { label: "Total System Draw", valueKey: "totalSystemWatts" },
            { label: "Recommended PSU", valueKey: "recommendedPsu" },
            { label: "PSU Load %", valueKey: "loadPercentage" },
            { label: "Annual Cost", valueKey: "annualEnergyCost" },
          ],
        },
        details: {
          title: "Component Breakdown",
          items: [
            { label: "CPU Power", valueKey: "cpuPower" },
            { label: "GPU Power", valueKey: "gpuPower" },
            { label: "Other Components", valueKey: "otherPower" },
            { label: "OC Overhead", valueKey: "ocOverhead" },
          ],
        },
        tips: {
          title: "PSU Tips",
          items: [
            "Never run a PSU above 80% load for extended periods — it reduces lifespan and increases noise.",
            "80+ Gold efficiency is the best value for most builds. Platinum and Titanium offer diminishing returns.",
            "Always buy from reputable brands: Corsair, Seasonic, EVGA, be quiet!, Thermaltake. Cheap PSUs can damage components.",
            "A modular PSU helps with cable management and airflow, improving overall system cooling.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a PSU Calculator?",
          content:
            "A PSU (Power Supply Unit) calculator estimates the total power consumption of your computer system based on the components you've selected. Every component in your PC draws electrical power — from the CPU and GPU to RAM, storage drives, fans, and peripherals. The calculator sums these power requirements and adds a safety margin to recommend an appropriately sized power supply. Choosing the right PSU is critical: an underpowered unit can cause system instability, random shutdowns, and even permanent hardware damage, while an oversized PSU wastes money and operates less efficiently. Modern PSU calculators account for real-world power consumption rather than just TDP (Thermal Design Power) ratings, which represent maximum heat output rather than actual power draw under typical loads.",
        },
        howItWorks: {
          title: "How PSU Wattage Is Calculated",
          content:
            "The calculator adds up the TDP (Thermal Design Power) or TGP (Total Graphics Power) of each component in your system. The CPU and GPU are the two biggest power consumers, often accounting for 70-85% of total system power. RAM uses about 3-5W per stick, SSDs use 5-8W each, and HDDs about 10W. Fans, USB devices, and RGB lighting add smaller amounts. After summing all components, the calculator applies an overclocking multiplier if applicable (10-30% increase) and then adds a 20-25% headroom buffer for power spikes, efficiency losses, and future upgrades. The recommended PSU wattage is then rounded up to the nearest standard PSU size (450W, 550W, 650W, 750W, 850W, 1000W, etc.). The efficiency rating determines how much wall power is actually delivered to components — an 80+ Gold PSU at 50% load delivers 90% efficiency, meaning only 10% is wasted as heat.",
        },
        considerations: {
          title: "Key Considerations",
          items: [
            { text: "CPU and GPU account for 70-85% of total power consumption. Get their TDP values from manufacturer specs.", type: "info" },
            { text: "Modern GPUs like the RTX 4090 (450W) and RTX 5090 (500W) have transient power spikes that can briefly exceed their TDP by 2x.", type: "warning" },
            { text: "Running a PSU at 40-60% load is the efficiency sweet spot. This is why we add headroom to recommendations.", type: "info" },
            { text: "Cheap, unbranded PSUs often can't deliver their rated wattage and may damage components. Always buy from reputable brands.", type: "warning" },
            { text: "Modular PSUs let you use only the cables you need, improving airflow and cable management.", type: "info" },
            { text: "PSU efficiency degrades over time. A 5-year-old PSU may deliver 5-10% less than its rated output.", type: "warning" },
          ],
        },
        categories: {
          title: "PSU Efficiency Ratings",
          items: [
            { text: "80 Plus (80%): Entry-level certification. Adequate for budget builds but wastes more power as heat.", type: "info" },
            { text: "80+ Bronze (85%): Good value for budget to mid-range builds. Most popular certification tier.", type: "info" },
            { text: "80+ Silver (88%): Less common but a step up from Bronze. Good middle ground.", type: "info" },
            { text: "80+ Gold (90%): Best value for most builds. Recommended for gaming and workstation PCs.", type: "info" },
            { text: "80+ Platinum (92%): Premium efficiency for always-on workstations and servers.", type: "info" },
            { text: "80+ Titanium (94%): Highest efficiency, premium price. Best for 24/7 high-load systems.", type: "info" },
          ],
        },
        examples: {
          title: "Example Builds",
          description: "Step-by-step PSU calculation for common PC builds",
          examples: [
            {
              title: "Mid-Range Gaming PC",
              steps: [
                "CPU: Intel i5-14600K = 125W TDP",
                "GPU: NVIDIA RTX 4070 = 200W TGP",
                "2x 16GB DDR5 RAM = 2 × 5W = 10W",
                "1x NVMe SSD = 7W, 1x SATA SSD = 5W",
                "Motherboard = 50W, 4 fans = 12W, USB = 10W",
                "Total: 125 + 200 + 10 + 12 + 50 + 12 + 10 = 419W",
                "With 20% headroom: 419 × 1.20 = 503W",
                "Recommended: 550W 80+ Gold PSU",
              ],
              result: "550W PSU",
            },
            {
              title: "High-End Enthusiast Build",
              steps: [
                "CPU: AMD Ryzen 9 9900X = 170W TDP",
                "GPU: NVIDIA RTX 4090 = 450W TGP",
                "4x 16GB DDR5 RAM = 4 × 5W = 20W",
                "2x NVMe SSD = 14W, 1x HDD = 10W",
                "Motherboard = 80W, 6 fans = 18W, RGB = 15W, USB = 12W",
                "Total: 170 + 450 + 20 + 24 + 80 + 18 + 15 + 12 = 789W",
                "With moderate OC (+20%): 789 × 1.20 = 947W",
                "With 20% headroom: 947 × 1.20 = 1136W",
                "Recommended: 1200W 80+ Gold PSU",
              ],
              result: "1200W PSU",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What happens if my PSU is too small for my PC?",
          answer:
            "An underpowered PSU can cause random shutdowns, system instability, blue screens, and in worst cases, permanent damage to your components. Modern PSUs have overcurrent protection (OCP) that shuts the system down before damage occurs, but cheap units may not have adequate protections. If you're experiencing random crashes under heavy load (gaming, rendering), your PSU may be insufficient.",
        },
        {
          question: "Is it bad to have a PSU that's too powerful?",
          answer:
            "Having a PSU rated higher than needed is not harmful — it simply means your system uses a smaller percentage of the PSU's capacity. However, PSUs are most efficient at 40-60% load, so a vastly oversized PSU (like 1200W for a 300W system) may be slightly less efficient at very low loads. The main downside is the extra cost. A moderately oversized PSU gives you room for future GPU upgrades.",
        },
        {
          question: "What's the difference between TDP and actual power consumption?",
          answer:
            "TDP (Thermal Design Power) specifies how much heat a cooling solution must dissipate, not actual power draw. Real-world power consumption is often lower than TDP during normal use but can spike above it during intense workloads. For GPU, TGP (Total Graphics Power) is a closer measure. Modern GPUs can have transient spikes up to 2x their rated TDP for microseconds, which is why PSU headroom is important.",
        },
        {
          question: "Should I get a modular or non-modular PSU?",
          answer:
            "Modular PSUs let you detach unused cables, improving airflow and aesthetics. Semi-modular units have essential cables (24-pin ATX, 8-pin CPU) permanently attached with optional extras. Fully modular PSUs are best for clean builds. Non-modular units are cheaper but leave unused cables cluttering the case. For most builders, semi-modular is the best value.",
        },
        {
          question: "How long does a PSU last?",
          answer:
            "Quality PSUs from reputable brands typically last 7-10 years. Many premium units come with 10-year warranties. However, PSU efficiency degrades over time — a 5-year-old unit may deliver 5-10% less power than rated. Capacitor aging is the primary factor. If your PSU is over 5 years old and you're upgrading to a more power-hungry GPU, consider replacing the PSU as well.",
        },
        {
          question: "Does overclocking significantly increase power consumption?",
          answer:
            "Yes. Overclocking increases power consumption substantially because power scales with voltage squared times frequency. A moderate CPU overclock (+10-15% frequency) can increase power draw by 20-40%. GPU overclocking typically adds 10-20% power draw. Heavy overclocking with voltage increases can push power consumption 30-50% above stock. Always account for overclocking when sizing your PSU.",
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

      chart: {
        title: "Power Distribution by Component",
        xLabel: "Component",
        yLabel: "Watts (W)",
        series: {
          watts: "Power Draw",
        },
      },

      detailedTable: {
        componentBreakdown: {
          button: "View Component Breakdown",
          title: "Power Consumption by Component",
          columns: {
            component: "Component",
            watts: "Power Draw",
            percentage: "% of Total",
            notes: "Notes",
          },
        },
      },
    },
  },

  inputs: [
    // === CPU & GPU (biggest power consumers) ===
    {
      id: "cpuWatts",
      type: "number",
      defaultValue: null,
      placeholder: "125",
      min: 15,
      max: 500,
      step: 1,
      suffix: "W",
    },
    {
      id: "gpuWatts",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      min: 0,
      max: 1000,
      step: 1,
      suffix: "W",
    },

    // === Memory & Storage ===
    {
      id: "ramSticks",
      type: "number",
      defaultValue: 2,
      min: 1,
      max: 16,
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
      max: 8,
      step: 1,
    },
    {
      id: "hddStorage",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 10,
      step: 1,
    },

    // === Cooling & Peripherals ===
    {
      id: "fans",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 20,
      step: 1,
    },
    {
      id: "usbDevices",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 15,
      step: 1,
    },
    {
      id: "rgbLighting",
      type: "select",
      defaultValue: "none",
      options: [
        { value: "none" },
        { value: "minimal" },
        { value: "moderate" },
        { value: "heavy" },
      ],
    },

    // === Overclocking ===
    {
      id: "overclocking",
      type: "select",
      defaultValue: "none",
      options: [
        { value: "none" },
        { value: "light" },
        { value: "moderate" },
        { value: "heavy" },
      ],
    },

    // === PSU Efficiency ===
    {
      id: "efficiencyRating",
      type: "select",
      defaultValue: "80plus_gold",
      options: [
        { value: "80plus" },
        { value: "80plus_bronze" },
        { value: "80plus_silver" },
        { value: "80plus_gold" },
        { value: "80plus_platinum" },
        { value: "80plus_titanium" },
      ],
    },

    // === Energy Cost ===
    {
      id: "usageHours",
      type: "number",
      defaultValue: 6,
      min: 1,
      max: 24,
      step: 1,
      suffix: "hrs/day",
    },
    {
      id: "electricityCost",
      type: "number",
      defaultValue: 0.12,
      min: 0.01,
      max: 1.00,
      step: 0.01,
      prefix: "$",
      suffix: "/kWh",
    },
  ],

  inputGroups: [],

  results: [
    { id: "recommendedPsu", type: "primary", format: "text" },
    { id: "totalSystemWatts", type: "secondary", format: "text" },
    { id: "minimumPsu", type: "secondary", format: "text" },
    { id: "loadPercentage", type: "secondary", format: "text" },
    { id: "annualEnergyCost", type: "secondary", format: "text" },
    { id: "dailyKwh", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "⚡", itemCount: 4 },
    { id: "details", type: "list", icon: "🖥️", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "powerDistribution",
    type: "bar",
    xKey: "component",
    height: 320,
    stacked: false,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "watts", type: "bar", color: "#f59e0b" },
    ],
  },

  detailedTable: {
    id: "componentBreakdown",
    buttonLabel: "View Component Breakdown",
    buttonIcon: "📊",
    modalTitle: "Power Consumption by Component",
    columns: [
      { id: "component", label: "Component", align: "left" },
      { id: "watts", label: "Power Draw", align: "right", highlight: true },
      { id: "percentage", label: "% of Total", align: "center" },
      { id: "notes", label: "Notes", align: "left" },
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
      authors: "NVIDIA Corporation",
      year: "2025",
      title: "GeForce RTX 50 & 40 Series Specifications",
      source: "NVIDIA",
      url: "https://www.nvidia.com/en-us/geforce/",
    },
    {
      authors: "CLEAResult / 80 PLUS",
      year: "2024",
      title: "80 PLUS Certified Power Supplies and Manufacturers",
      source: "80 PLUS Program",
      url: "https://www.clearesult.com/80plus/",
    },
  ],

  hero: {
    badge: "Free Tool",
    badgeVariant: "primary",
  },

  sidebar: {
    showRelated: true,
  },

  features: {
    pdf: true,
    csv: true,
    excel: true,
    save: true,
    share: true,
  },

  relatedCalculators: [
    "electricity-cost-calculator",
  ],

  ads: {
    showAds: true,
  },
};

// ============================================================
// PSU Standard Sizes
// ============================================================
const PSU_STANDARD_SIZES = [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 1000, 1100, 1200, 1300, 1500, 1600, 2000];

function roundToNextPsuSize(watts: number): number {
  for (const size of PSU_STANDARD_SIZES) {
    if (size >= watts) return size;
  }
  return PSU_STANDARD_SIZES[PSU_STANDARD_SIZES.length - 1];
}

// ============================================================
// Efficiency map (at 50% load, typical values)
// ============================================================
const EFFICIENCY_MAP: Record<string, number> = {
  "80plus": 0.80,
  "80plus_bronze": 0.85,
  "80plus_silver": 0.88,
  "80plus_gold": 0.90,
  "80plus_platinum": 0.92,
  "80plus_titanium": 0.94,
};

const EFFICIENCY_LABELS: Record<string, string> = {
  "80plus": "80 Plus",
  "80plus_bronze": "80+ Bronze",
  "80plus_silver": "80+ Silver",
  "80plus_gold": "80+ Gold",
  "80plus_platinum": "80+ Platinum",
  "80plus_titanium": "80+ Titanium",
};

// ============================================================
// RGB wattage
// ============================================================
const RGB_WATTS: Record<string, number> = {
  none: 0,
  minimal: 5,
  moderate: 15,
  heavy: 30,
};

// ============================================================
// OC multiplier
// ============================================================
const OC_MULTIPLIER: Record<string, number> = {
  none: 1.0,
  light: 1.10,
  moderate: 1.20,
  heavy: 1.30,
};

// ============================================================
// CALCULATE FUNCTION
// ============================================================
export function calculatePsuCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;

  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // Read inputs
  const cpuWatts = values.cpuWatts as number | null;
  const gpuWatts = values.gpuWatts as number | null;

  // Validate required
  if (cpuWatts === null || cpuWatts === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (gpuWatts === null || gpuWatts === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const ramSticks = (values.ramSticks as number) || 2;
  const sataStorage = (values.sataStorage as number) || 0;
  const nvmeStorage = (values.nvmeStorage as number) || 0;
  const hddStorage = (values.hddStorage as number) || 0;
  const fans = (values.fans as number) || 0;
  const usbDevices = (values.usbDevices as number) || 0;
  const rgbLighting = (values.rgbLighting as string) || "none";
  const overclocking = (values.overclocking as string) || "none";
  const efficiencyRating = (values.efficiencyRating as string) || "80plus_gold";
  const usageHours = (values.usageHours as number) || 6;
  const electricityCost = (values.electricityCost as number) || 0.12;

  // === Component power calculations ===
  const motherboardWatts = 50 + (ramSticks > 4 ? 30 : 0); // higher-end boards for many RAM sticks
  const ramWatts = ramSticks * 5; // ~5W per DDR5 stick
  const sataWatts = sataStorage * 5;
  const nvmeWatts = nvmeStorage * 7;
  const hddWatts = hddStorage * 10;
  const fanWatts = fans * 3;
  const usbWatts = usbDevices * 2.5;
  const rgbWatts = RGB_WATTS[rgbLighting] || 0;

  // Base total (before OC)
  const baseTotalWatts =
    cpuWatts +
    gpuWatts +
    motherboardWatts +
    ramWatts +
    sataWatts +
    nvmeWatts +
    hddWatts +
    fanWatts +
    usbWatts +
    rgbWatts;

  // Apply overclocking multiplier (affects CPU + GPU only)
  const ocMultiplier = OC_MULTIPLIER[overclocking] || 1.0;
  const cpuWithOc = cpuWatts * ocMultiplier;
  const gpuWithOc = gpuWatts * ocMultiplier;
  const ocOverheadWatts = (cpuWithOc - cpuWatts) + (gpuWithOc - gpuWatts);

  const totalSystemWatts = Math.round(baseTotalWatts + ocOverheadWatts);

  // Other components (everything except CPU and GPU)
  const otherWatts = Math.round(
    motherboardWatts + ramWatts + sataWatts + nvmeWatts + hddWatts + fanWatts + usbWatts + rgbWatts
  );

  // === PSU Recommendations ===
  // Headroom: 20% buffer for spikes, degradation, future upgrades
  const headroomMultiplier = 1.20;
  const recommendedWatts = Math.round(totalSystemWatts * headroomMultiplier);
  const recommendedPsu = roundToNextPsuSize(recommendedWatts);

  // Minimum: 10% buffer (tight, not recommended)
  const minimumWatts = Math.round(totalSystemWatts * 1.10);
  const minimumPsu = roundToNextPsuSize(minimumWatts);

  // Load percentage at recommended PSU
  const loadPercentage = Math.round((totalSystemWatts / recommendedPsu) * 100);

  // === Energy cost calculations ===
  const efficiency = EFFICIENCY_MAP[efficiencyRating] || 0.90;
  const wallWatts = totalSystemWatts / efficiency; // actual draw from wall
  const dailyKwh = (wallWatts * usageHours) / 1000;
  const monthlyKwh = dailyKwh * 30;
  const annualKwh = dailyKwh * 365;
  const annualCost = annualKwh * electricityCost;
  const monthlyCost = monthlyKwh * electricityCost;

  const effLabel = EFFICIENCY_LABELS[efficiencyRating] || "80+ Gold";
  const wUnit = v["W"] || "W";
  const kwhUnit = v["kWh"] || "kWh";

  // === Chart data ===
  const chartData: Array<Record<string, unknown>> = [];

  if (Math.round(cpuWithOc) > 0) {
    chartData.push({ component: "CPU", watts: Math.round(cpuWithOc) });
  }
  if (Math.round(gpuWithOc) > 0) {
    chartData.push({ component: "GPU", watts: Math.round(gpuWithOc) });
  }
  if (motherboardWatts > 0) {
    chartData.push({ component: "Motherboard", watts: motherboardWatts });
  }
  if (ramWatts > 0) {
    chartData.push({ component: "RAM", watts: ramWatts });
  }
  const storageTotal = sataWatts + nvmeWatts + hddWatts;
  if (storageTotal > 0) {
    chartData.push({ component: "Storage", watts: storageTotal });
  }
  const peripheralTotal = fanWatts + usbWatts + rgbWatts;
  if (peripheralTotal > 0) {
    chartData.push({ component: "Fans/USB/RGB", watts: Math.round(peripheralTotal) });
  }

  // === Detailed table: component breakdown ===
  const tableData: Array<Record<string, string>> = [
    { component: "CPU", watts: `${Math.round(cpuWithOc)} ${wUnit}`, percentage: `${Math.round((cpuWithOc / totalSystemWatts) * 100)}%`, notes: overclocking !== "none" ? `Includes OC (+${Math.round(ocMultiplier * 100 - 100)}%)` : "Stock" },
    { component: "GPU", watts: `${Math.round(gpuWithOc)} ${wUnit}`, percentage: `${gpuWatts > 0 ? Math.round((gpuWithOc / totalSystemWatts) * 100) : 0}%`, notes: gpuWatts === 0 ? "Integrated graphics" : (overclocking !== "none" ? `Includes OC (+${Math.round(ocMultiplier * 100 - 100)}%)` : "Dedicated GPU") },
    { component: "Motherboard", watts: `${motherboardWatts} ${wUnit}`, percentage: `${Math.round((motherboardWatts / totalSystemWatts) * 100)}%`, notes: ramSticks > 4 ? "High-end (8+ DIMM slots)" : "Standard ATX" },
    { component: "RAM", watts: `${ramWatts} ${wUnit}`, percentage: `${Math.round((ramWatts / totalSystemWatts) * 100)}%`, notes: `${ramSticks} × 5W per stick` },
    { component: "Storage", watts: `${storageTotal} ${wUnit}`, percentage: `${Math.round((storageTotal / totalSystemWatts) * 100)}%`, notes: `${nvmeStorage} NVMe + ${sataStorage} SATA + ${hddStorage} HDD` },
    { component: "Fans", watts: `${fanWatts} ${wUnit}`, percentage: `${Math.round((fanWatts / totalSystemWatts) * 100)}%`, notes: `${fans} × 3W each` },
    { component: "USB Devices", watts: `${Math.round(usbWatts)} ${wUnit}`, percentage: `${Math.round((usbWatts / totalSystemWatts) * 100)}%`, notes: `${usbDevices} × 2.5W each` },
    { component: "RGB Lighting", watts: `${rgbWatts} ${wUnit}`, percentage: `${Math.round((rgbWatts / totalSystemWatts) * 100)}%`, notes: rgbLighting.charAt(0).toUpperCase() + rgbLighting.slice(1) },
    { component: "Total", watts: `${totalSystemWatts} ${wUnit}`, percentage: "100%", notes: `Recommended: ${recommendedPsu}W PSU` },
  ];

  return {
    values: {
      totalSystemWatts,
      recommendedPsu,
      minimumPsu,
      loadPercentage,
      annualEnergyCost: annualCost,
      dailyKwh,
      cpuPower: Math.round(cpuWithOc),
      gpuPower: Math.round(gpuWithOc),
      otherPower: otherWatts,
      ocOverhead: Math.round(ocOverheadWatts),
    },
    formatted: {
      totalSystemWatts: `${totalSystemWatts} ${wUnit}`,
      recommendedPsu: `${recommendedPsu} ${wUnit}`,
      minimumPsu: `${minimumPsu} ${wUnit}`,
      loadPercentage: `${loadPercentage}%`,
      annualEnergyCost: `$${annualCost.toFixed(2)}/${v["year"] || "year"}`,
      dailyKwh: `${dailyKwh.toFixed(2)} ${kwhUnit}`,
      cpuPower: `${Math.round(cpuWithOc)} ${wUnit}`,
      gpuPower: `${Math.round(gpuWithOc)} ${wUnit}`,
      otherPower: `${otherWatts} ${wUnit}`,
      ocOverhead: ocOverheadWatts > 0 ? `+${Math.round(ocOverheadWatts)} ${wUnit}` : `0 ${wUnit}`,
    },
    summary:
      f.summary
        ?.replace("{totalWatts}", totalSystemWatts.toString())
        .replace("{recommended}", recommendedPsu.toString())
        .replace("{efficiency}", effLabel) || "",
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default psuCalculatorConfig;
