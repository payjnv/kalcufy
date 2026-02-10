import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─────────────────────────────────────────────────────────────────────────────
// TRANSFER TIME CALCULATOR — V4.3
// ─────────────────────────────────────────────────────────────────────────────
// Calculates: file transfer/download/upload time with overhead, 20 interface
// comparison (incl. WiFi 7, Thunderbolt 5, USB4 v2), chart, unit dropdowns.
// ─────────────────────────────────────────────────────────────────────────────

export const transferTimeConfig: CalculatorConfigV4 = {
  id: "transfer-time",
  version: "4.3",
  category: "technology",
  icon: "⏱️",

  presets: [
    {
      id: "movie4k",
      icon: "🎬",
      values: { fileSize: 15, speed: 100, overheadPercent: 10, connectionType: "custom" },
    },
    {
      id: "gameDownload",
      icon: "🎮",
      values: { fileSize: 80, speed: 300, overheadPercent: 10, connectionType: "custom" },
    },
    {
      id: "cloudBackup",
      icon: "☁️",
      values: { fileSize: 500, speed: 20, overheadPercent: 15, connectionType: "custom" },
    },
    {
      id: "usbTransfer",
      icon: "🔌",
      values: { fileSize: 256, speed: 5000, overheadPercent: 5, connectionType: "usb3" },
    },
  ],

  t: {
    en: {
      name: "Transfer Time Calculator",
      slug: "transfer-time-calculator",
      subtitle: "Estimate how long it takes to download, upload, or copy any file. Compares 20 interfaces including WiFi 7, Thunderbolt 5, and USB4 v2 — with real-world overhead.",
      breadcrumb: "Transfer Time",

      seo: {
        title: "Transfer Time Calculator - Download & Upload Time Estimator (2025)",
        description: "Calculate file transfer time for any size and speed. Compares 20 interfaces (WiFi 7, Thunderbolt 5, USB4 v2, 10G Ethernet). Accounts for TCP/IP overhead. Free multilingual tool.",
        shortDescription: "Estimate file transfer time with real-world overhead and interface comparison.",
        keywords: [
          "file transfer time calculator",
          "download time calculator",
          "upload time estimator",
          "how long to download",
          "transfer speed calculator",
          "data transfer time",
          "bandwidth time calculator",
          "wifi 7 transfer speed",
        ],
      },

      calculator: { yourInformation: "Transfer Details" },
      ui: {
        yourInformation: "Transfer Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Transfer Time",
      },

      inputs: {
        fileSize: {
          label: "File Size",
          helpText: "Size of the file or data to transfer",
        },
        connectionType: {
          label: "Quick Speed Select",
          helpText: "Pick a common interface to auto-fill speed, or use Custom",
          options: {
            custom: "Custom Speed",
            adsl: "ADSL (8 Mbps)",
            "4g": "4G / LTE (50 Mbps)",
            cable: "Cable / DOCSIS 3.1 (200 Mbps)",
            "5g": "5G (1 Gbps)",
            "5g_mmwave": "5G mmWave (4 Gbps)",
            fiber: "Fiber FTTH (1 Gbps)",
            fiber10g: "Fiber 10G GPON (10 Gbps)",
            wifi5: "Wi-Fi 5 / 802.11ac (867 Mbps)",
            wifi6: "Wi-Fi 6 / 802.11ax (1.2 Gbps)",
            wifi6e: "Wi-Fi 6E / 6 GHz (2.4 Gbps)",
            wifi7: "Wi-Fi 7 / 802.11be (5.8 Gbps)",
            ethernet: "Gigabit Ethernet (1 Gbps)",
            ethernet10g: "10G Ethernet (10 Gbps)",
            usb2: "USB 2.0 (480 Mbps)",
            usb3: "USB 3.2 Gen 1 (5 Gbps)",
            usb32: "USB 3.2 Gen 2×2 (20 Gbps)",
            usb4: "USB4 v1 (40 Gbps)",
            usb4v2: "USB4 v2 (80 Gbps)",
            thunderbolt4: "Thunderbolt 4 (40 Gbps)",
            thunderbolt5: "Thunderbolt 5 (80/120 Gbps)",
            sata3: "SATA III (6 Gbps)",
            nvme3: "NVMe Gen 3 (32 Gbps)",
            nvme4: "NVMe Gen 4 (64 Gbps)",
            nvme5: "NVMe Gen 5 (128 Gbps)",
          },
        },
        speed: {
          label: "Connection Speed",
          helpText: "Your actual download, upload, or interface speed",
        },
        overheadPercent: {
          label: "Protocol Overhead",
          helpText: "TCP/IP, encryption, and protocol overhead reduce effective speed (typically 5–15%)",
        },
      },

      results: {
        transferTime: { label: "Transfer Time" },
        totalSeconds: { label: "Total Seconds" },
        rawSpeedMbps: { label: "Raw Speed (Mbps)" },
        rawSpeedMBps: { label: "Raw Speed (MB/s)" },
        effectiveSpeedMBps: { label: "Effective Speed (MB/s)" },
        fileSizeFormatted: { label: "File Size" },
        dataTransferred: { label: "Data to Transfer" },
        overheadLoss: { label: "Overhead Loss" },
      },

      presets: {
        movie4k: { label: "4K Movie (15 GB)", description: "15 GB at 100 Mbps cable" },
        gameDownload: { label: "AAA Game (80 GB)", description: "80 GB at 300 Mbps 5G" },
        cloudBackup: { label: "Cloud Backup (500 GB)", description: "500 GB at 20 Mbps upload" },
        usbTransfer: { label: "USB 3.0 Copy (256 GB)", description: "256 GB over USB 3.2 Gen 1" },
      },

      values: {
        days: "days",
        day: "day",
        hours: "hours",
        hour: "hour",
        minutes: "minutes",
        minute: "minute",
        seconds: "seconds",
        second: "second",
        lessThanASecond: "Less than a second",
      },

      formats: {
        summary: "Transferring {fileSize} at {speed} ({overhead}% overhead) takes approximately {transferTime}. Effective throughput: {effectiveSpeed}.",
      },

      infoCards: {
        metrics: {
          title: "Speed Analysis",
          items: [
            { label: "Transfer Time", valueKey: "transferTime" },
            { label: "Effective Speed", valueKey: "effectiveSpeedMBps" },
            { label: "Raw Speed", valueKey: "rawSpeedMBps" },
            { label: "Overhead Loss", valueKey: "overheadLoss" },
          ],
        },
        details: {
          title: "Transfer Details",
          items: [
            { label: "File Size", valueKey: "fileSizeFormatted" },
            { label: "Data in Bits", valueKey: "dataTransferred" },
            { label: "Total Seconds", valueKey: "totalSeconds" },
            { label: "Raw Speed (Mbps)", valueKey: "rawSpeedMbps" },
            { label: "Raw Speed (MB/s)", valueKey: "rawSpeedMBps" },
            { label: "Effective (MB/s)", valueKey: "effectiveSpeedMBps" },
          ],
        },
        tips: {
          title: "Speed Up Your Transfers",
          items: [
            "Use wired Ethernet over Wi-Fi for large files — consistent 900+ Mbps vs variable Wi-Fi speeds.",
            "ISPs advertise in Mbps (bits), but files show MB (bytes). Divide advertised speed by 8 for real MB/s.",
            "USB 3.2 Gen 1 is only fast if your drive is an SSD. An HDD caps at ~100 MB/s regardless of USB version.",
            "For cloud uploads, schedule large transfers overnight — less congestion and some ISPs lift throttling.",
          ],
        },
      },

      chart: {
        title: "Transfer Time by Interface",
        xLabel: "Interface",
        yLabel: "Seconds (log scale)",
        series: {
          logSeconds: "Time (log₁₀ sec)",
        },
      },

      detailedTable: {
        interfaceComparison: {
          button: "Compare All 20 Interfaces",
          title: "Transfer Time by Interface — Your File Size",
          columns: {
            interface: "Interface",
            ratedSpeed: "Rated Speed",
            realWorldSpeed: "Real-World Speed",
            transferTime: "Transfer Time",
          },
        },
      },

      education: {
        whatIs: {
          title: "How File Transfer Time Is Calculated",
          content: "File transfer time depends on two factors: the size of the file (measured in bytes) and the speed of your connection (measured in bits per second). The critical detail most people miss is the distinction between bits and bytes — there are 8 bits in every byte. When your ISP advertises a 100 Mbps connection, that translates to a theoretical maximum of 12.5 megabytes per second. In practice, protocol overhead, network congestion, and hardware limitations reduce this further. A typical TCP/IP connection loses 5–15% of its bandwidth to packet headers, acknowledgments, error correction, and TLS encryption. That is why a 100 Mbps connection often delivers only 10–11 MB/s in real-world file transfers rather than the theoretical 12.5 MB/s. This calculator accounts for that overhead and lets you adjust it based on your specific conditions.",
        },
        howItWorks: {
          title: "Understanding Bits, Bytes, and Speed Units",
          content: "The fundamental formula is: Transfer Time = File Size (bits) ÷ Effective Speed (bits/sec). Confusion arises because file sizes use bytes (KB, MB, GB, TB) while network speeds use bits (Kbps, Mbps, Gbps). To convert, multiply the file size in bytes by 8 to get bits. Additionally, storage manufacturers use decimal prefixes (1 GB = 1,000,000,000 bytes) while some operating systems use binary prefixes (1 GiB = 1,073,741,824 bytes). This calculator uses the standard decimal (SI) convention, which matches what ISPs and hardware manufacturers advertise. For USB and local transfers, the rated speed is the theoretical maximum — actual throughput depends on the slowest device in the chain (often the hard drive), cable quality, and whether the bus is shared with other peripherals. Wi-Fi real-world speeds are typically 30–60% of the rated maximum due to signal degradation, interference, and shared airtime.",
        },
        considerations: {
          title: "Factors That Affect Transfer Speed",
          items: [
            { text: "Protocol overhead: TCP/IP headers, TLS encryption, and application-layer protocols add 5–15% overhead to every transfer. VPN connections can add 15–20%.", type: "info" },
            { text: "Network congestion: shared connections, peak-hour usage, and ISP throttling can reduce your speed by 20–50% during evenings.", type: "warning" },
            { text: "Hardware bottleneck: old routers, HDD read/write limits (~100 MB/s), and slow USB hubs can cap throughput far below your network speed.", type: "warning" },
            { text: "Latency: high round-trip time (>100ms) significantly reduces TCP throughput for small files. For large files, bandwidth matters more than latency.", type: "info" },
            { text: "Wi-Fi signal: distance, walls, interference from other devices, and the number of connected clients all degrade Wi-Fi speeds significantly.", type: "info" },
            { text: "Server-side limits: cloud services (Google Drive, Dropbox, S3) may throttle individual connections regardless of your bandwidth.", type: "info" },
          ],
        },
        categories: {
          title: "Common Transfer Scenarios",
          items: [
            { text: "Photo (5 MB) over 4G LTE (50 Mbps): less than 1 second. Even slow connections handle small files instantly.", type: "info" },
            { text: "HD Movie (4 GB) over fiber (500 Mbps): about 64 seconds (~1 minute). Fiber makes HD downloads trivial.", type: "info" },
            { text: "AAA Game (80 GB) over cable (200 Mbps): roughly 53 minutes. Plan for an hour with real-world overhead.", type: "info" },
            { text: "Full backup (1 TB) over 50 Mbps upload: about 44 hours (~2 days). Schedule overnight for multi-day transfers.", type: "info" },
            { text: "SSD to SSD via USB 3.2 Gen 1 (500 GB): roughly 17 minutes at real-world speeds (~400 MB/s effective).", type: "info" },
            { text: "4K video production (2 TB) over Thunderbolt 5: about 3.5 minutes. The fastest consumer interface available.", type: "info" },
          ],
        },
        examples: {
          title: "Step-by-Step Calculation Examples",
          description: "See how transfer time is calculated for common scenarios",
          examples: [
            {
              title: "Download 50 GB Game at 200 Mbps",
              steps: [
                "File size: 50 GB = 50 × 1,000,000,000 × 8 = 400,000,000,000 bits",
                "Raw speed: 200 Mbps = 200,000,000 bits/second",
                "Theoretical time: 400B bits ÷ 200M bps = 2,000 seconds",
                "Apply 10% overhead: 2,000 ÷ 0.90 = 2,222 seconds",
                "Convert: 2,222 s = 37 minutes 2 seconds",
              ],
              result: "A 50 GB game at 200 Mbps takes about 37 minutes with 10% overhead.",
            },
            {
              title: "Copy 256 GB SSD via USB 3.2 Gen 1",
              steps: [
                "File size: 256 GB = 256 × 8,000,000,000 = 2.048 × 10¹² bits",
                "USB 3.2 Gen 1 rated: 5 Gbps = 5,000,000,000 bps",
                "Real-world USB 3.2: ~60% efficiency = 3,000 Mbps effective",
                "Time: 2.048 × 10¹² ÷ 3 × 10⁹ = 683 seconds",
                "Convert: 683 s ≈ 11 minutes 23 seconds",
              ],
              result: "Copying 256 GB over USB 3.2 Gen 1 takes about 11 minutes with an SSD. With an HDD, expect 40+ minutes.",
            },
          ],
        },
      },

      faqs: {
        "0": {
          question: "Why is my actual transfer speed slower than my internet plan?",
          answer: "Internet speeds are advertised in megabits per second (Mbps), but file managers show transfer rates in megabytes per second (MB/s). Since 1 byte = 8 bits, a 100 Mbps connection maxes out at 12.5 MB/s — not 100. Add TCP/IP overhead (5–15%), Wi-Fi signal loss, ISP throttling, shared connections, and router limitations, and real-world speeds are typically 30–70% of the advertised rate.",
        },
        "1": {
          question: "What is protocol overhead and how does it affect transfers?",
          answer: "Every piece of data sent over a network is wrapped in protocol headers (TCP, IP, Ethernet frames) that consume bandwidth but do not carry your file data. TLS/SSL encryption adds further overhead. In typical scenarios, this accounts for 5–15% of total bandwidth. VPN connections add 15–20% due to additional encryption and encapsulation layers. For local USB/Thunderbolt transfers, overhead is lower (3–5%).",
        },
        "2": {
          question: "How do I find my actual internet speed?",
          answer: "Run a speed test at speedtest.net or fast.com to measure your current download and upload speeds. Test multiple times at different hours for accuracy — peak hours (evenings) are usually slower. For local transfers, check your device specs: USB port version, Ethernet adapter speed (100 Mbps vs 1 Gbps vs 2.5 Gbps), and storage drive type (HDD ~100 MB/s, SATA SSD ~550 MB/s, NVMe Gen 4 ~7,000 MB/s).",
        },
        "3": {
          question: "Is Wi-Fi slower than Ethernet for file transfers?",
          answer: "Almost always, yes. Wi-Fi signals degrade with distance, walls, and interference. Wi-Fi 6 is rated at 1.2 Gbps but typically achieves 300–600 Mbps. Wi-Fi 7 promises 5.8 Gbps but real-world speeds will be 1–3 Gbps. Gigabit Ethernet consistently delivers 940+ Mbps. For large file transfers (backups, video projects, gaming downloads), always prefer a wired connection when possible.",
        },
        "4": {
          question: "Why does USB 3.0 transfer slower than its rated 5 Gbps?",
          answer: "USB 3.2 Gen 1 (formerly USB 3.0) at 5 Gbps is the bus speed, not the transfer speed. Real-world USB 3.2 Gen 1 achieves 300–400 MB/s (2.4–3.2 Gbps) with an SSD, due to protocol overhead and controller limitations. If your drive is an HDD (~100 MB/s), the drive becomes the bottleneck — it cannot feed data fast enough to saturate even USB 2.0. Always pair fast USB ports with SSDs for maximum benefit.",
        },
        "5": {
          question: "How long does it take to upload 1 TB to the cloud?",
          answer: "It depends entirely on your upload speed, which is typically much slower than download. At 10 Mbps upload (common cable): about 9.3 days. At 20 Mbps: about 4.6 days. At 100 Mbps upload (fiber): about 22 hours. At 1 Gbps symmetric fiber: about 2.2 hours. Many cloud services also throttle individual connections. AWS S3 and Google Cloud support multi-part parallel uploads that can improve throughput 2–4×.",
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
      id: "fileSize",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      min: 0.001,
      max: 999999,
      unitType: "data",
      syncGroup: false,
      defaultUnit: "GB",
      allowedUnits: ["MB", "GB", "TB"],
    },
    {
      id: "connectionType",
      type: "select",
      defaultValue: "custom",
      options: [
        { value: "custom" },
        { value: "adsl" },
        { value: "4g" },
        { value: "cable" },
        { value: "5g" },
        { value: "5g_mmwave" },
        { value: "fiber" },
        { value: "fiber10g" },
        { value: "wifi5" },
        { value: "wifi6" },
        { value: "wifi6e" },
        { value: "wifi7" },
        { value: "ethernet" },
        { value: "ethernet10g" },
        { value: "usb2" },
        { value: "usb3" },
        { value: "usb32" },
        { value: "usb4" },
        { value: "usb4v2" },
        { value: "thunderbolt4" },
        { value: "thunderbolt5" },
        { value: "sata3" },
        { value: "nvme3" },
        { value: "nvme4" },
        { value: "nvme5" },
      ],
    },
    {
      id: "speed",
      type: "number",
      defaultValue: null,
      placeholder: "100",
      min: 0.001,
      max: 999999,
      unitType: "data_rate",
      syncGroup: false,
      defaultUnit: "Mbps",
      allowedUnits: ["Kbps", "Mbps", "Gbps"],
    },
    {
      id: "overheadPercent",
      type: "slider",
      defaultValue: 10,
      min: 0,
      max: 30,
      step: 1,
      suffix: "%",
    },
  ],

  inputGroups: [],

  results: [
    { id: "transferTime", type: "primary", format: "text" },
    { id: "totalSeconds", type: "secondary", format: "text" },
    { id: "rawSpeedMbps", type: "secondary", format: "text" },
    { id: "rawSpeedMBps", type: "secondary", format: "text" },
    { id: "effectiveSpeedMBps", type: "secondary", format: "text" },
    { id: "fileSizeFormatted", type: "secondary", format: "text" },
    { id: "dataTransferred", type: "secondary", format: "text" },
    { id: "overheadLoss", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "📖", itemCount: 6 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "interfaceChart",
    type: "bar",
    xKey: "interface",
    height: 350,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "logSeconds", color: "#3b82f6" },
    ],
  },

  detailedTable: {
    id: "interfaceComparison",
    buttonLabel: "Compare All Interfaces",
    buttonIcon: "📊",
    modalTitle: "Transfer Time by Interface — Your File Size",
    columns: [
      { id: "interface", label: "Interface", align: "left" },
      { id: "ratedSpeed", label: "Rated Speed", align: "center" },
      { id: "realWorldSpeed", label: "Real-World Speed", align: "center" },
      { id: "transferTime", label: "Transfer Time", align: "right", highlight: true },
    ],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📗" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "IEEE Standards Association",
      year: "2024",
      title: "IEEE 802.3 Ethernet Working Group",
      source: "IEEE",
      url: "https://www.ieee802.org/3/",
    },
    {
      authors: "USB Implementers Forum",
      year: "2024",
      title: "USB4 Version 2.0 Specification",
      source: "USB-IF",
      url: "https://www.usb.org/documents",
    },
    {
      authors: "Wi-Fi Alliance",
      year: "2024",
      title: "Wi-Fi 7 (802.11be) Certification Program",
      source: "Wi-Fi Alliance",
      url: "https://www.wi-fi.org/discover-wi-fi/wi-fi-certified-7",
    },
  ],

  hero: { showRating: true, showShare: true },
  sidebar: { showAds: true, showRelated: true },
  features: { save: true, pdf: true, csv: true, excel: true },
  relatedCalculators: ["bandwidth", "psu-calculator", "cidr"],
  ads: { sidebar: true, footer: true },
};

// ─────────────────────────────────────────────────────────────────────────────
// CONVERSION MAPS
// ─────────────────────────────────────────────────────────────────────────────

const SIZE_TO_BYTES: Record<string, number> = {
  KB: 1e3,
  MB: 1e6,
  GB: 1e9,
  TB: 1e12,
};

const SPEED_TO_BPS: Record<string, number> = {
  Kbps: 1e3,
  Mbps: 1e6,
  Gbps: 1e9,
};

// ─────────────────────────────────────────────────────────────────────────────
// INTERFACE DATABASE — rated speed (Mbps) + real-world efficiency factor
// ─────────────────────────────────────────────────────────────────────────────

interface InterfaceSpec {
  mbps: number;
  label: string;
  efficiency: number; // Real-world fraction of rated speed (0.0–1.0)
}

const INTERFACES: Record<string, InterfaceSpec> = {
  adsl:           { mbps: 8,       label: "ADSL",                efficiency: 0.85 },
  "4g":           { mbps: 50,      label: "4G / LTE",            efficiency: 0.60 },
  cable:          { mbps: 200,     label: "Cable / DOCSIS 3.1",  efficiency: 0.75 },
  "5g":           { mbps: 1000,    label: "5G Sub-6",            efficiency: 0.50 },
  "5g_mmwave":    { mbps: 4000,    label: "5G mmWave",           efficiency: 0.35 },
  fiber:          { mbps: 1000,    label: "Fiber FTTH",          efficiency: 0.93 },
  fiber10g:       { mbps: 10000,   label: "Fiber 10G GPON",      efficiency: 0.90 },
  wifi5:          { mbps: 867,     label: "Wi-Fi 5 (ac)",        efficiency: 0.45 },
  wifi6:          { mbps: 1200,    label: "Wi-Fi 6 (ax)",        efficiency: 0.50 },
  wifi6e:         { mbps: 2400,    label: "Wi-Fi 6E (6 GHz)",    efficiency: 0.50 },
  wifi7:          { mbps: 5800,    label: "Wi-Fi 7 (be)",        efficiency: 0.45 },
  ethernet:       { mbps: 1000,    label: "Gigabit Ethernet",    efficiency: 0.94 },
  ethernet10g:    { mbps: 10000,   label: "10G Ethernet",        efficiency: 0.93 },
  usb2:           { mbps: 480,     label: "USB 2.0",             efficiency: 0.60 },
  usb3:           { mbps: 5000,    label: "USB 3.2 Gen 1",       efficiency: 0.60 },
  usb32:          { mbps: 20000,   label: "USB 3.2 Gen 2×2",     efficiency: 0.55 },
  usb4:           { mbps: 40000,   label: "USB4 v1",             efficiency: 0.50 },
  usb4v2:         { mbps: 80000,   label: "USB4 v2",             efficiency: 0.45 },
  thunderbolt4:   { mbps: 40000,   label: "Thunderbolt 4",       efficiency: 0.55 },
  thunderbolt5:   { mbps: 80000,   label: "Thunderbolt 5",       efficiency: 0.50 },
  sata3:          { mbps: 6000,    label: "SATA III",            efficiency: 0.88 },
  nvme3:          { mbps: 32000,   label: "NVMe Gen 3",          efficiency: 0.85 },
  nvme4:          { mbps: 64000,   label: "NVMe Gen 4",          efficiency: 0.80 },
  nvme5:          { mbps: 128000,  label: "NVMe Gen 5",          efficiency: 0.70 },
};

// Subset for chart (too many = unreadable)
const CHART_INTERFACES = [
  "adsl", "4g", "cable", "5g", "fiber", "wifi6", "wifi7",
  "ethernet", "ethernet10g", "usb3", "usb4", "thunderbolt5", "nvme4",
];

// ─────────────────────────────────────────────────────────────────────────────
// FORMATTING HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (val < 0.001) return val.toExponential(2);
  if (val < 1000) return val.toFixed(2).replace(/\.?0+$/, "");
  return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function smartBytes(bytes: number): string {
  if (bytes >= 1e12) return `${fmtNum(bytes / 1e12)} TB`;
  if (bytes >= 1e9) return `${fmtNum(bytes / 1e9)} GB`;
  if (bytes >= 1e6) return `${fmtNum(bytes / 1e6)} MB`;
  if (bytes >= 1e3) return `${fmtNum(bytes / 1e3)} KB`;
  return `${fmtNum(bytes)} B`;
}

function smartBits(bitsPerSec: number): string {
  if (bitsPerSec >= 1e12) return `${fmtNum(bitsPerSec / 1e12)} Tbps`;
  if (bitsPerSec >= 1e9) return `${fmtNum(bitsPerSec / 1e9)} Gbps`;
  if (bitsPerSec >= 1e6) return `${fmtNum(bitsPerSec / 1e6)} Mbps`;
  if (bitsPerSec >= 1e3) return `${fmtNum(bitsPerSec / 1e3)} Kbps`;
  return `${fmtNum(bitsPerSec)} bps`;
}

function formatDuration(totalSeconds: number, v: Record<string, string>): string {
  if (totalSeconds < 1) return v["lessThanASecond"] || "Less than a second";

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} ${days === 1 ? (v["day"] || "day") : (v["days"] || "days")}`);
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? (v["hour"] || "hour") : (v["hours"] || "hours")}`);
  if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? (v["minute"] || "minute") : (v["minutes"] || "minutes")}`);
  if (seconds > 0 && days === 0) parts.push(`${seconds} ${seconds === 1 ? (v["second"] || "second") : (v["seconds"] || "seconds")}`);

  return parts.join(", ");
}

function formatTimeCompact(totalSeconds: number): string {
  if (totalSeconds < 0.01) return "instant";
  if (totalSeconds < 1) return `${Math.round(totalSeconds * 1000)} ms`;
  if (totalSeconds < 60) return `${Math.ceil(totalSeconds)} sec`;
  if (totalSeconds < 3600) {
    const m = Math.floor(totalSeconds / 60);
    const s = Math.floor(totalSeconds % 60);
    return s > 0 ? `${m} min ${s} sec` : `${m} min`;
  }
  if (totalSeconds < 86400) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    return m > 0 ? `${h} hr ${m} min` : `${h} hr`;
  }
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  return h > 0 ? `${d} d ${h} hr` : `${d} d`;
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATE
// ─────────────────────────────────────────────────────────────────────────────

export function calculateTransferTime(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const fileSize = values.fileSize as number | null;
  const speed = values.speed as number | null;
  const overheadPercent = (values.overheadPercent as number) ?? 10;

  // Read units from unitType dropdowns
  const fileSizeUnit = fieldUnits?.fileSize || "GB";
  const speedUnit = fieldUnits?.speed || "Mbps";

  if (fileSize === null || speed === null || fileSize <= 0 || speed <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Convert to base units ───────────────────────────────────────────
  const fileSizeBytes = fileSize * (SIZE_TO_BYTES[fileSizeUnit] || 1e9);
  const fileSizeBits = fileSizeBytes * 8;
  const rawBps = speed * (SPEED_TO_BPS[speedUnit] || 1e6);

  // ── Apply overhead ──────────────────────────────────────────────────
  const efficiencyFactor = 1 - overheadPercent / 100;
  const effectiveBps = rawBps * efficiencyFactor;

  // ── Derived speeds ──────────────────────────────────────────────────
  const rawMbps = rawBps / 1e6;
  const rawMBps = rawBps / 8e6;
  const effectiveMBps = effectiveBps / 8e6;
  const overheadLossMBps = rawMBps - effectiveMBps;

  // ── Transfer time ───────────────────────────────────────────────────
  const totalSeconds = fileSizeBits / effectiveBps;
  const transferTimeStr = formatDuration(totalSeconds, v);

  // ── Interface comparison table ──────────────────────────────────────
  const allInterfaceKeys = Object.keys(INTERFACES);
  const tableData = allInterfaceKeys.map((key) => {
    const iface = INTERFACES[key];
    const ratedBps = iface.mbps * 1e6;
    const realWorldBps = ratedBps * iface.efficiency;
    const ifaceSeconds = fileSizeBits / realWorldBps;
    return {
      interface: iface.label,
      ratedSpeed: smartBits(ratedBps),
      realWorldSpeed: `${fmtNum(realWorldBps / 8e6)} MB/s`,
      transferTime: formatTimeCompact(ifaceSeconds),
    };
  });

  // ── Chart data (subset for readability) ─────────────────────────────
  const chartData = CHART_INTERFACES.map((key) => {
    const iface = INTERFACES[key];
    if (!iface) return null;
    const realWorldBps = iface.mbps * 1e6 * iface.efficiency;
    const ifaceSeconds = fileSizeBits / realWorldBps;
    const logSec = ifaceSeconds > 0 ? Math.log10(Math.max(ifaceSeconds, 0.001)) : 0;
    return {
      interface: iface.label.split(" (")[0].split(" /")[0],
      logSeconds: Math.round(logSec * 100) / 100,
    };
  }).filter(Boolean);

  // ── Summary ─────────────────────────────────────────────────────────
  const summary = (f.summary || "Transferring {fileSize} at {speed} ({overhead}% overhead) takes approximately {transferTime}. Effective throughput: {effectiveSpeed}.")
    .replace("{fileSize}", `${fmtNum(fileSize)} ${fileSizeUnit}`)
    .replace("{speed}", `${fmtNum(speed)} ${speedUnit}`)
    .replace("{overhead}", `${overheadPercent}`)
    .replace("{transferTime}", transferTimeStr)
    .replace("{effectiveSpeed}", `${fmtNum(effectiveMBps)} MB/s`);

  return {
    values: {
      transferTime: totalSeconds,
      totalSeconds,
      rawSpeedMbps: rawMbps,
      rawSpeedMBps: rawMBps,
      effectiveSpeedMBps: effectiveMBps,
      fileSizeFormatted: fileSizeBytes,
      dataTransferred: fileSizeBits,
      overheadLoss: overheadLossMBps,
    },
    formatted: {
      transferTime: transferTimeStr,
      totalSeconds: `${fmtNum(Math.round(totalSeconds * 100) / 100)} sec`,
      rawSpeedMbps: `${fmtNum(rawMbps)} Mbps`,
      rawSpeedMBps: `${fmtNum(rawMBps)} MB/s`,
      effectiveSpeedMBps: `${fmtNum(effectiveMBps)} MB/s`,
      fileSizeFormatted: smartBytes(fileSizeBytes),
      dataTransferred: `${fmtNum(fileSizeBits)} bits`,
      overheadLoss: `−${fmtNum(overheadLossMBps)} MB/s (${overheadPercent}%)`,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default transferTimeConfig;
