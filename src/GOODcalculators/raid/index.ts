import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const raidConfig: CalculatorConfigV4 = {
  id: "raid",
  version: "4.0",
  category: "technology",
  icon: "💾",

  // ===========================================================================
  // PRESETS — 5 common configurations
  // ===========================================================================
  presets: [
    {
      id: "homeNAS",
      icon: "🏠",
      values: {
        raidLevel: "5",
        numDrives: 4,
        driveCapacity: 4,
        driveType: "HDD",
        driveCost: 100,
      },
    },
    {
      id: "serverBasic",
      icon: "🖥️",
      values: {
        raidLevel: "10",
        numDrives: 6,
        driveCapacity: 2,
        driveType: "SSD",
        driveCost: 150,
      },
    },
    {
      id: "serverAdvanced",
      icon: "⚡",
      values: {
        raidLevel: "6",
        numDrives: 8,
        driveCapacity: 8,
        driveType: "SSD",
        driveCost: 300,
      },
    },
    {
      id: "performance",
      icon: "🚀",
      values: {
        raidLevel: "50",
        numDrives: 8,
        driveCapacity: 1,
        driveType: "NVMe",
        driveCost: 200,
      },
    },
    {
      id: "enterprise",
      icon: "🏢",
      values: {
        raidLevel: "60",
        numDrives: 12,
        driveCapacity: 16,
        driveType: "SSD",
        driveCost: 600,
      },
    },
  ],

  // ===========================================================================
  // TRANSLATIONS (4 idiomas)
  // ===========================================================================
  t: {
    en: {
      name: "RAID Calculator",
      slug: "raid",
      subtitle: "Calculate RAID capacity, performance, rebuild time, and URE risk for all RAID levels",
      breadcrumb: "RAID Calc",

      seo: {
        title: "RAID Calculator - Capacity, IOPS, Rebuild Time & URE Risk",
        description: "Calculate RAID array usable capacity, read/write IOPS, rebuild time, and URE risk. Supports RAID 0/1/1E/5/5E/6/10/50/60 with HDD/SSD/NVMe presets. Free tool with visual charts.",
        shortDescription: "Calculate RAID capacity, performance, rebuild time",
        keywords: [
          "raid calculator",
          "raid capacity calculator",
          "raid 5 calculator",
          "raid 6 calculator",
          "raid 10 calculator",
          "ure risk calculator",
          "raid rebuild time",
          "raid iops calculator",
        ],
      },

      calculator: { configuration: "RAID Configuration" },
      ui: {
        configuration: "RAID Configuration",
        performance: "Performance Settings",
        advanced: "Advanced Options",
        calculate: "Calculate RAID",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        raidLevel: {
          label: "RAID Level",
          helpText: "Select RAID type (striping, mirroring, parity)",
          options: {
            "0": "RAID 0 - Striping (no redundancy)",
            "1": "RAID 1 - Mirroring",
            "1E": "RAID 1E - Striped Mirrors",
            "5": "RAID 5 - Single Parity",
            "5E": "RAID 5E - with Hot Spare",
            "5EE": "RAID 5EE - Distributed Hot Spare",
            "6": "RAID 6 - Double Parity",
            "10": "RAID 10 - Mirrored Stripe (1+0)",
            "50": "RAID 50 - Striped RAID 5 (5+0)",
            "60": "RAID 60 - Striped RAID 6 (6+0)",
          },
        },
        numDrives: {
          label: "Number of Drives",
          helpText: "Total drives in the array",
        },
        driveCapacity: {
          label: "Drive Capacity",
          helpText: "Capacity per drive",
        },
        driveType: {
          label: "Drive Type",
          helpText: "HDD, SSD, or NVMe (affects IOPS/throughput)",
          options: {
            HDD: "HDD (7200 RPM)",
            SSD: "SATA SSD",
            NVMe: "NVMe SSD",
          },
        },
        driveCost: {
          label: "Cost per Drive",
          helpText: "Price of each drive in USD",
        },
        drivesPerGroup: {
          label: "Drives per RAID Group",
          helpText: "For RAID 50/60 only - drives in each sub-array",
        },
        rebuildSpeed: {
          label: "Rebuild Speed",
          helpText: "MB/s rebuild rate (typical: 50-150 MB/s)",
        },
        ureRate: {
          label: "URE Rate (1 in N bits)",
          helpText: "Unrecoverable Read Error rate (HDD: 1e14, Enterprise: 1e15)",
        },
      },

      results: {
        usableCapacity: { label: "Usable Capacity" },
        overhead: { label: "Overhead (Parity/Mirror)" },
        efficiency: { label: "Storage Efficiency" },
        faultTolerance: { label: "Fault Tolerance" },
        minDrives: { label: "Minimum Drives" },
        totalCost: { label: "Total Cost" },
        costPerTB: { label: "Cost per Usable TB" },
        readIOPS: { label: "Read IOPS" },
        writeIOPS: { label: "Write IOPS" },
        readThroughput: { label: "Read Throughput" },
        writeThroughput: { label: "Write Throughput" },
        writePenalty: { label: "Write Penalty" },
        rebuildTime: { label: "Rebuild Time" },
        ureRisk: { label: "URE Risk during Rebuild" },
        recommendation: { label: "Recommendation" },
      },

      presets: {
        homeNAS: { label: "Home NAS", description: "4×4TB RAID 5 (HDD)" },
        serverBasic: { label: "Basic Server", description: "6×2TB RAID 10 (SSD)" },
        serverAdvanced: { label: "Advanced Server", description: "8×8TB RAID 6 (SSD)" },
        performance: { label: "High Performance", description: "8×1TB RAID 50 (NVMe)" },
        enterprise: { label: "Enterprise", description: "12×16TB RAID 60 (SSD)" },
      },

      values: {
        TB: "TB",
        GB: "GB",
        drives: "drives",
        drive: "drive",
        hours: "hours",
        minutes: "minutes",
        low: "Low",
        moderate: "Moderate",
        high: "High",
        veryHigh: "Very High",
        excellent: "Excellent",
        good: "Good",
        fair: "Fair",
        poor: "Poor",
        none: "None",
      },

      formats: {
        summary: "RAID {raidLevel} with {numDrives} × {driveCapacity} TB drives provides {usableCapacity} of usable capacity with {faultTolerance} fault tolerance.",
      },

      infoCards: {
        capacity: {
          title: "Capacity Breakdown",
          items: [
            { label: "Total Raw Capacity", valueKey: "totalCapacity" },
            { label: "Usable Capacity", valueKey: "usableCapacity" },
            { label: "Overhead (Parity/Mirror)", valueKey: "overhead" },
            { label: "Storage Efficiency", valueKey: "efficiency" },
          ],
        },
        performance: {
          title: "Performance Metrics",
          items: [
            { label: "Read IOPS", valueKey: "readIOPS" },
            { label: "Write IOPS", valueKey: "writeIOPS" },
            { label: "Read Throughput", valueKey: "readThroughput" },
            { label: "Write Throughput", valueKey: "writeThroughput" },
          ],
        },
        tips: {
          title: "Key Considerations",
          items: [
            "RAID is NOT a backup - always maintain separate backups",
            "Larger drives increase rebuild time and URE risk",
            "RAID 6/60 recommended for arrays > 8 drives",
            "NVMe offers 10-20x IOPS over HDD but costs more",
          ],
        },
      },

      chart: {
        title: "Capacity Distribution",
        xLabel: "Type",
        yLabel: "Capacity (TB)",
        series: {
          usable: "Usable",
          parity: "Parity/Mirror",
        },
      },

      detailedTable: {
        comparison: {
          button: "Compare RAID Levels",
          title: "RAID Levels Comparison",
          columns: {
            level: "RAID Level",
            minDrives: "Min Drives",
            faultTolerance: "Fault Tolerance",
            efficiency: "Efficiency",
            readSpeed: "Read Speed",
            writeSpeed: "Write Speed",
            useCase: "Best For",
          },
        },
      },

      education: {
        whatIsRAID: {
          title: "What is RAID?",
          content: "RAID (Redundant Array of Independent Disks) combines multiple physical drives into a single logical unit to improve performance, redundancy, or both. Different RAID levels offer varying trade-offs between capacity, speed, and fault tolerance. RAID 0 maximizes performance by striping data across drives but offers no redundancy. RAID 1 mirrors data for full redundancy at 50% capacity cost. RAID 5/6 use parity for efficient redundancy, while RAID 10/50/60 combine striping with mirroring or parity for enterprise-grade performance and protection.",
        },
        raidLevelsExplained: {
          title: "Understanding RAID Levels",
          content: "Each RAID level serves different needs. RAID 0 stripes data for maximum speed (2× IOPS with 2 drives) but one drive failure loses everything. RAID 1 mirrors data for safety but uses only 50% capacity. RAID 5 adds parity (minimum 3 drives) allowing 1 drive failure with ~67-93% efficiency. RAID 6 uses double parity (minimum 4 drives) surviving 2 failures. RAID 10 combines mirroring and striping for excellent performance with 50% capacity. RAID 50/60 stripe multiple RAID 5/6 groups for enterprise workloads requiring both speed and resilience.",
        },
        performanceFactors: {
          title: "Performance Factors",
          items: [
            { text: "Write penalty: RAID 5 = 4× I/O, RAID 6 = 6× I/O, RAID 10 = 2× I/O", type: "info" },
            { text: "Read performance scales linearly with drives (except parity overhead)", type: "info" },
            { text: "HDD: ~150 IOPS, SATA SSD: ~50k IOPS, NVMe: ~500k IOPS per drive", type: "info" },
            { text: "Throughput: HDD ~200 MB/s, SSD ~550 MB/s, NVMe ~3500 MB/s", type: "info" },
            { text: "Write-heavy workloads favor RAID 10 over RAID 5/6 due to lower penalty", type: "warning" },
            { text: "Rebuild time increases exponentially with capacity - monitor closely", type: "warning" },
          ],
        },
        choosingRAID: {
          title: "Choosing the Right RAID Level",
          items: [
            { text: "RAID 0: Maximum performance, no redundancy (temp storage, caching)", type: "info" },
            { text: "RAID 1: Simple mirroring, 50% capacity (boot drives, small critical data)", type: "info" },
            { text: "RAID 5: Balanced efficiency, 1 drive failure (SMB file servers, moderate I/O)", type: "info" },
            { text: "RAID 6: Double parity, 2 drive failures (larger arrays > 8 drives)", type: "info" },
            { text: "RAID 10: High performance + redundancy (databases, VMs, high I/O)", type: "info" },
            { text: "RAID 50/60: Enterprise workloads requiring scale + performance + resilience", type: "info" },
          ],
        },
        examples: {
          title: "Real-World Examples",
          description: "Common RAID configurations for different scenarios",
          examples: [
            {
              title: "Home Media Server",
              steps: [
                "4 × 4TB HDD in RAID 5",
                "Usable: 12 TB (3×4)",
                "Cost: ~$400 total",
                "Can lose 1 drive without data loss",
              ],
              result: "Affordable storage with basic protection",
            },
            {
              title: "Small Business File Server",
              steps: [
                "6 × 2TB SSD in RAID 10",
                "Usable: 6 TB (50% of 12 TB)",
                "Read/Write IOPS: ~300k/150k",
                "Can lose 1 drive per mirror set",
              ],
              result: "Fast performance with good redundancy",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is the difference between RAID 5 and RAID 6?",
          answer: "RAID 5 uses single parity and can survive 1 drive failure, requiring minimum 3 drives. RAID 6 uses double parity and can survive 2 drive failures, requiring minimum 4 drives. RAID 6 is safer for larger arrays (>8 drives) due to lower URE risk during rebuild, but has slightly lower write performance due to calculating two parity blocks instead of one.",
        },
        {
          question: "Why is RAID 10 faster than RAID 5/6?",
          answer: "RAID 10 has a write penalty of only 2× (one write to each mirror), while RAID 5 has 4× penalty (read data, read parity, write data, write parity) and RAID 6 has 6× penalty (double parity). For read operations, both scale linearly, but RAID 10's lower write penalty makes it significantly faster for write-heavy workloads like databases and virtual machines.",
        },
        {
          question: "What is URE risk and why does it matter?",
          answer: "URE (Unrecoverable Read Error) is when a drive cannot read a sector during rebuild. With large modern drives (>6TB), the probability of hitting a URE while rebuilding from a failed drive is significant. Consumer HDDs have URE rates of 1 in 10^14 bits (~12.5 TB), meaning a single URE can cause complete data loss in RAID 5. RAID 6's double parity protects against this - even if a URE occurs during rebuild, the second parity can recover the data.",
        },
        {
          question: "How long does RAID rebuild take?",
          answer: "Rebuild time depends on drive capacity, array size, and rebuild speed. A 4TB drive rebuilding at 100 MB/s takes ~11 hours. An 18TB drive takes ~50 hours. During rebuild, array performance degrades significantly and URE risk is highest. RAID 6/60 is recommended for large arrays to reduce URE risk. Enterprise drives with lower URE rates (1 in 10^15) also help.",
        },
        {
          question: "Can I expand a RAID array later?",
          answer: "It depends on your RAID controller and level. Some hardware controllers support online capacity expansion (adding drives) and RAID migration (changing levels). However, this is risky and slow - often taking days for large arrays. The safest approach is to plan array size upfront, backup data, destroy the old array, create a new larger one, and restore. Software RAID (mdadm, ZFS, unRAID) often has better expansion support than cheap hardware RAID.",
        },
        {
          question: "Is RAID a replacement for backups?",
          answer: "NO. RAID protects against drive failure only - it does NOT protect against: file deletion, corruption, malware/ransomware, controller failure, fire/theft, or human error. The 3-2-1 backup rule applies: 3 copies of data (production + 2 backups), 2 different media types (e.g., RAID + external), 1 offsite copy (cloud or remote location). RAID is for uptime, not backup.",
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
        calculate: "Calculate RAID",
        reset: "Reset",
        pdf: "Export PDF",
        csv: "Export CSV",
        excel: "Export Excel",
        save: "Save",
        saved: "Saved",
        saving: "Saving...",
      },

      share: { calculatedWith: "Calculated with Kalcufy.com RAID Calculator" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
  },

  // ===========================================================================
  // INPUTS — Configuration
  // ===========================================================================
  inputs: [
    {
      id: "raidLevel",
      type: "select",
      defaultValue: "5",
      options: [
        { value: "0" },
        { value: "1" },
        { value: "1E" },
        { value: "5" },
        { value: "5E" },
        { value: "5EE" },
        { value: "6" },
        { value: "10" },
        { value: "50" },
        { value: "60" },
      ],
    },
    {
      id: "numDrives",
      type: "number",
      defaultValue: 4,
      min: 2,
      max: 100,
      step: 1,
    },
    {
      id: "driveCapacity",
      type: "number",
      defaultValue: 4,
      min: 0.1,
      max: 100,
      step: 0.1,
      unitType: "data",
      syncGroup: false,
      defaultUnit: "tb",
      allowedUnits: ["gb", "tb"],
    },
    {
      id: "driveType",
      type: "select",
      defaultValue: "HDD",
      options: [{ value: "HDD" }, { value: "SSD" }, { value: "NVMe" }],
    },
    {
      id: "driveCost",
      type: "number",
      defaultValue: null,
      placeholder: "100",
      min: 0,
      max: 10000,
      step: 1,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "drivesPerGroup",
      type: "number",
      defaultValue: 4,
      min: 3,
      max: 20,
      step: 1,
      showWhen: { field: "raidLevel", value: ["50", "60"] },
    },
    {
      id: "rebuildSpeed",
      type: "number",
      defaultValue: 100,
      min: 10,
      max: 500,
      step: 10,
      suffix: "MB/s",
    },
    {
      id: "ureRate",
      type: "number",
      defaultValue: 1e14,
      min: 1e13,
      max: 1e16,
      step: 1e13,
    },
  ],

  inputGroups: [],

  // ===========================================================================
  // RESULTS
  // ===========================================================================
  results: [
    { id: "usableCapacity", type: "primary", format: "text" },
    { id: "overhead", type: "secondary", format: "text" },
    { id: "efficiency", type: "secondary", format: "percent" },
    { id: "faultTolerance", type: "secondary", format: "text" },
    { id: "totalCost", type: "secondary", format: "text" },
    { id: "costPerTB", type: "secondary", format: "text" },
    { id: "readIOPS", type: "secondary", format: "text" },
    { id: "writeIOPS", type: "secondary", format: "text" },
    { id: "readThroughput", type: "secondary", format: "text" },
    { id: "writeThroughput", type: "secondary", format: "text" },
    { id: "writePenalty", type: "secondary", format: "text" },
    { id: "rebuildTime", type: "secondary", format: "text" },
    { id: "ureRisk", type: "secondary", format: "text" },
  ],

  // ===========================================================================
  // INFO CARDS — 3 cards
  // ===========================================================================
  infoCards: [
    { id: "capacity", type: "list", icon: "💾", itemCount: 4 },
    { id: "performance", type: "list", icon: "⚡", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ===========================================================================
  // CHART — Capacity breakdown
  // ===========================================================================
  chart: {
    id: "capacityBreakdown",
    type: "bar",
    xKey: "label",
    height: 300,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "usable", color: "#10b981" },
      { key: "parity", color: "#f59e0b" },
    ],
  },

  // ===========================================================================
  // DETAILED TABLE — RAID levels comparison
  // ===========================================================================
  detailedTable: {
    id: "comparison",
    buttonLabel: "Compare RAID Levels",
    buttonIcon: "📊",
    modalTitle: "RAID Levels Comparison",
    columns: [
      { id: "level", label: "RAID Level", align: "left" },
      { id: "minDrives", label: "Min Drives", align: "center" },
      { id: "faultTolerance", label: "Fault Tolerance", align: "center" },
      { id: "efficiency", label: "Efficiency", align: "center" },
      { id: "readSpeed", label: "Read Speed", align: "center" },
      { id: "writeSpeed", label: "Write Speed", align: "center" },
      { id: "useCase", label: "Best For", align: "left" },
    ],
  },

  // ===========================================================================
  // REFERENCE DATA — Empty (use Dual List)
  // ===========================================================================
  referenceData: [],

  // ===========================================================================
  // EDUCATION SECTIONS — 5 (2 prose, 2 list, 1 code-example)
  // ===========================================================================
  educationSections: [
    { id: "whatIsRAID", type: "prose", icon: "📖" },
    { id: "raidLevelsExplained", type: "prose", icon: "🔍" },
    { id: "performanceFactors", type: "list", icon: "⚡", itemCount: 6 },
    { id: "choosingRAID", type: "list", icon: "✅", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "💡", columns: 2, exampleCount: 2 },
  ],

  // ===========================================================================
  // FAQS — 6
  // ===========================================================================
  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ],

  // ===========================================================================
  // REFERENCES — 2 (fuera de t, no se traducen)
  // ===========================================================================
  references: [
    {
      authors: "Patterson, D., Gibson, G., Katz, R.",
      year: "1988",
      title: "A Case for Redundant Arrays of Inexpensive Disks (RAID)",
      source: "ACM SIGMOD",
      url: "https://www.cs.cmu.edu/~garth/RAIDpaper/Patterson88.pdf",
    },
    {
      authors: "Schroeder, B., Gibson, G. A.",
      year: "2007",
      title: "Disk Failures in the Real World: What Does an MTTF of 1,000,000 Hours Mean to You?",
      source: "USENIX FAST",
      url: "https://www.usenix.org/legacy/events/fast07/tech/schroeder/schroeder.pdf",
    },
  ],

  // ===========================================================================
  // HERO / SIDEBAR / FEATURES / ADS
  // ===========================================================================
  hero: {
    badge: "Storage",
    rating: { average: 4.8, count: 890 },
  },
  sidebar: {},
  features: {},
  relatedCalculators: [],
  ads: {},
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateRAID(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;

  // --- Get translations ---
  const v = (t?.values as Record<string, string>) || {};

  // --- Read inputs ---
  const raidLevel = (values.raidLevel as string) || "5";
  const numDrives = (values.numDrives as number) || 4;
  let driveCapacity = (values.driveCapacity as number) || 4;
  const driveType = (values.driveType as string) || "HDD";
  const driveCost = (values.driveCost as number) || null;
  const drivesPerGroup = (values.drivesPerGroup as number) || 4;
  const rebuildSpeed = (values.rebuildSpeed as number) || 100;
  const ureRate = (values.ureRate as number) || 1e14;

  // --- Convert capacity to TB ---
  const capacityUnit = fieldUnits?.driveCapacity || "tb";
  if (capacityUnit === "gb") {
    driveCapacity = driveCapacity / 1000; // GB → TB
  }

  // --- Get currency symbol ---
  const currency = fieldUnits?.driveCost || "USD";
  const CURRENCY_SYMBOLS: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
    JPY: "¥", INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF ",
    COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  };
  const currencySymbol = CURRENCY_SYMBOLS[currency] || "$";

  // --- Validate minimum drives ---
  const minDrivesMap: Record<string, number> = {
    "0": 2,
    "1": 2,
    "1E": 3,
    "5": 3,
    "5E": 4,
    "5EE": 4,
    "6": 4,
    "10": 4,
    "50": 6,
    "60": 8,
  };

  const minDrives = minDrivesMap[raidLevel] || 2;
  if (numDrives < minDrives) {
    return {
      values: {},
      formatted: {},
      summary: `RAID ${raidLevel} requires minimum ${minDrives} drives. You have ${numDrives}.`,
      isValid: false,
    };
  }

  // --- Calculate usable capacity ---
  const totalCapacityTB = numDrives * driveCapacity;
  let usableCapacityTB = 0;
  let faultTolerance = v["none"] || "None";
  let efficiency = 0;

  switch (raidLevel) {
    case "0":
      usableCapacityTB = totalCapacityTB;
      efficiency = 100;
      faultTolerance = v["none"] || "None";
      break;
    case "1":
      usableCapacityTB = totalCapacityTB / 2;
      efficiency = 50;
      faultTolerance = `${numDrives - 1} ${v["drives"] || "drives"}`;
      break;
    case "1E":
      usableCapacityTB = totalCapacityTB / 2;
      efficiency = 50;
      faultTolerance = `1 ${v["drive"] || "drive"}`;
      break;
    case "5":
    case "5E":
    case "5EE":
      usableCapacityTB = (numDrives - 1) * driveCapacity;
      efficiency = ((numDrives - 1) / numDrives) * 100;
      faultTolerance = `1 ${v["drive"] || "drive"}`;
      break;
    case "6":
      usableCapacityTB = (numDrives - 2) * driveCapacity;
      efficiency = ((numDrives - 2) / numDrives) * 100;
      faultTolerance = `2 ${v["drives"] || "drives"}`;
      break;
    case "10":
      usableCapacityTB = totalCapacityTB / 2;
      efficiency = 50;
      faultTolerance = `1 ${v["drive"] || "drive"} per mirror`;
      break;
    case "50": {
      const groups = Math.floor(numDrives / drivesPerGroup);
      usableCapacityTB = groups * (drivesPerGroup - 1) * driveCapacity;
      efficiency = ((drivesPerGroup - 1) / drivesPerGroup) * 100;
      faultTolerance = `1 ${v["drive"] || "drive"} per group`;
      break;
    }
    case "60": {
      const groups = Math.floor(numDrives / drivesPerGroup);
      usableCapacityTB = groups * (drivesPerGroup - 2) * driveCapacity;
      efficiency = ((drivesPerGroup - 2) / drivesPerGroup) * 100;
      faultTolerance = `2 ${v["drives"] || "drives"} per group`;
      break;
    }
  }

  const overheadTB = totalCapacityTB - usableCapacityTB;

  // --- Performance metrics (IOPS and throughput) ---
  const driveIOPS: Record<string, { read: number; write: number; throughput: number }> = {
    HDD: { read: 150, write: 150, throughput: 200 },
    SSD: { read: 50000, write: 50000, throughput: 550 },
    NVMe: { read: 500000, write: 500000, throughput: 3500 },
  };

  const baseIOPS = driveIOPS[driveType] || driveIOPS.HDD;
  const baseThroughput = baseIOPS.throughput;

  let readIOPS = 0;
  let writeIOPS = 0;
  let readThroughput = 0;
  let writeThroughput = 0;
  let writePenalty = 1;

  switch (raidLevel) {
    case "0":
      readIOPS = baseIOPS.read * numDrives;
      writeIOPS = baseIOPS.write * numDrives;
      readThroughput = baseThroughput * numDrives;
      writeThroughput = baseThroughput * numDrives;
      writePenalty = 1;
      break;
    case "1":
    case "1E":
      readIOPS = baseIOPS.read * numDrives;
      writeIOPS = baseIOPS.write * (numDrives / 2);
      readThroughput = baseThroughput * numDrives;
      writeThroughput = baseThroughput * (numDrives / 2);
      writePenalty = 2;
      break;
    case "5":
    case "5E":
    case "5EE":
      readIOPS = baseIOPS.read * (numDrives - 1);
      writeIOPS = baseIOPS.write * (numDrives / 4);
      readThroughput = baseThroughput * (numDrives - 1);
      writeThroughput = baseThroughput * (numDrives / 4);
      writePenalty = 4;
      break;
    case "6":
      readIOPS = baseIOPS.read * (numDrives - 2);
      writeIOPS = baseIOPS.write * (numDrives / 6);
      readThroughput = baseThroughput * (numDrives - 2);
      writeThroughput = baseThroughput * (numDrives / 6);
      writePenalty = 6;
      break;
    case "10":
      readIOPS = baseIOPS.read * numDrives;
      writeIOPS = baseIOPS.write * (numDrives / 2);
      readThroughput = baseThroughput * numDrives;
      writeThroughput = baseThroughput * (numDrives / 2);
      writePenalty = 2;
      break;
    case "50": {
      const groups = Math.floor(numDrives / drivesPerGroup);
      readIOPS = baseIOPS.read * (drivesPerGroup - 1) * groups;
      writeIOPS = baseIOPS.write * ((drivesPerGroup / 4) * groups);
      readThroughput = baseThroughput * (drivesPerGroup - 1) * groups;
      writeThroughput = baseThroughput * ((drivesPerGroup / 4) * groups);
      writePenalty = 4;
      break;
    }
    case "60": {
      const groups = Math.floor(numDrives / drivesPerGroup);
      readIOPS = baseIOPS.read * (drivesPerGroup - 2) * groups;
      writeIOPS = baseIOPS.write * ((drivesPerGroup / 6) * groups);
      readThroughput = baseThroughput * (drivesPerGroup - 2) * groups;
      writeThroughput = baseThroughput * ((drivesPerGroup / 6) * groups);
      writePenalty = 6;
      break;
    }
  }

  // --- Rebuild time ---
  const rebuildDataTB = driveCapacity; // Rebuild 1 drive worth of data
  const rebuildDataMB = rebuildDataTB * 1000 * 1000;
  const rebuildTimeSeconds = rebuildDataMB / rebuildSpeed;
  const rebuildHours = rebuildTimeSeconds / 3600;

  let rebuildTimeFormatted = "";
  if (rebuildHours < 1) {
    rebuildTimeFormatted = `${Math.round(rebuildTimeSeconds / 60)} ${v["minutes"] || "minutes"}`;
  } else {
    rebuildTimeFormatted = `${rebuildHours.toFixed(1)} ${v["hours"] || "hours"}`;
  }

  // --- URE risk ---
  const bitsRead = rebuildDataTB * 8 * 1e12; // TB to bits
  const expectedUREs = bitsRead / ureRate;
  let ureRiskLabel = v["low"] || "Low";
  if (expectedUREs > 1) {
    ureRiskLabel = v["veryHigh"] || "Very High";
  } else if (expectedUREs > 0.5) {
    ureRiskLabel = v["high"] || "High";
  } else if (expectedUREs > 0.1) {
    ureRiskLabel = v["moderate"] || "Moderate";
  }

  // --- Cost ---
  let totalCost = 0;
  let costPerTB = 0;
  let totalCostFormatted = "-";
  let costPerTBFormatted = "-";

  if (driveCost !== null) {
    totalCost = numDrives * driveCost;
    costPerTB = totalCost / usableCapacityTB;
    totalCostFormatted = `${currencySymbol}${totalCost.toLocaleString("en-US")}`;
    costPerTBFormatted = `${currencySymbol}${costPerTB.toFixed(2)}/TB`;
  }

  // --- Format numbers ---
  function fmtNum(val: number): string {
    if (val === 0) return "0";
    if (val < 1000) return val.toFixed(1).replace(/\.0$/, "");
    if (val < 1e6) return (val / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
    if (val < 1e9) return (val / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    return (val / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  }

  // --- Summary ---
  const summary = `RAID ${raidLevel} with ${numDrives} × ${driveCapacity} TB drives provides ${usableCapacityTB.toFixed(1)} TB of usable capacity (${efficiency.toFixed(0)}% efficient) with ${faultTolerance} fault tolerance. Read/Write IOPS: ${fmtNum(readIOPS)}/${fmtNum(writeIOPS)}. Rebuild time: ${rebuildTimeFormatted}. URE risk: ${ureRiskLabel}.`;

  // --- Chart data ---
  const chartData = [
    {
      label: "Capacity",
      usable: usableCapacityTB,
      parity: overheadTB,
    },
  ];

  // --- DetailedTable data ---
  const tableData = [
    {
      level: "RAID 0",
      minDrives: "2",
      faultTolerance: "None",
      efficiency: "100%",
      readSpeed: "Excellent",
      writeSpeed: "Excellent",
      useCase: "Temp storage, caching",
    },
    {
      level: "RAID 1",
      minDrives: "2",
      faultTolerance: "N-1 drives",
      efficiency: "50%",
      readSpeed: "Good",
      writeSpeed: "Good",
      useCase: "Boot drives, critical data",
    },
    {
      level: "RAID 5",
      minDrives: "3",
      faultTolerance: "1 drive",
      efficiency: "67-93%",
      readSpeed: "Good",
      writeSpeed: "Fair",
      useCase: "SMB file servers",
    },
    {
      level: "RAID 6",
      minDrives: "4",
      faultTolerance: "2 drives",
      efficiency: "50-88%",
      readSpeed: "Good",
      writeSpeed: "Fair",
      useCase: "Large arrays > 8 drives",
    },
    {
      level: "RAID 10",
      minDrives: "4",
      faultTolerance: "1 per mirror",
      efficiency: "50%",
      readSpeed: "Excellent",
      writeSpeed: "Good",
      useCase: "Databases, VMs",
    },
    {
      level: "RAID 50",
      minDrives: "6",
      faultTolerance: "1 per group",
      efficiency: "67-93%",
      readSpeed: "Excellent",
      writeSpeed: "Good",
      useCase: "High I/O, scale",
    },
    {
      level: "RAID 60",
      minDrives: "8",
      faultTolerance: "2 per group",
      efficiency: "50-88%",
      readSpeed: "Excellent",
      writeSpeed: "Good",
      useCase: "Enterprise, critical",
    },
  ];

  // --- Return ---
  return {
    values: {
      usableCapacity: usableCapacityTB,
      overhead: overheadTB,
      efficiency: efficiency,
      faultTolerance: faultTolerance,
      totalCost: totalCost,
      costPerTB: costPerTB,
      readIOPS: readIOPS,
      writeIOPS: writeIOPS,
      readThroughput: readThroughput,
      writeThroughput: writeThroughput,
      writePenalty: writePenalty,
      rebuildTime: rebuildHours,
      ureRisk: expectedUREs,
    },
    formatted: {
      usableCapacity: `${usableCapacityTB.toFixed(1)} TB`,
      overhead: `${overheadTB.toFixed(1)} TB`,
      efficiency: `${efficiency.toFixed(1)}%`,
      faultTolerance: faultTolerance,
      totalCost: totalCostFormatted,
      costPerTB: costPerTBFormatted,
      readIOPS: fmtNum(readIOPS),
      writeIOPS: fmtNum(writeIOPS),
      readThroughput: `${fmtNum(readThroughput)} MB/s`,
      writeThroughput: `${fmtNum(writeThroughput)} MB/s`,
      writePenalty: `${writePenalty}×`,
      rebuildTime: rebuildTimeFormatted,
      ureRisk: ureRiskLabel,
      totalCapacity: `${totalCapacityTB.toFixed(1)} TB`,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default raidConfig;
