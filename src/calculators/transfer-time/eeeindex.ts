import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─────────────────────────────────────────────────────────────────────────────
// Transfer Time Calculator — V4 with Overhead, Interface Presets & Comparison
// ─────────────────────────────────────────────────────────────────────────────

export const transferTimeConfig: CalculatorConfigV4 = {
  id: "transfer-time",
  version: "4.0",
  category: "technology",
  icon: "⏱️",

  presets: [
    {
      id: "movie4k",
      icon: "🎬",
      values: { fileSize: 15, speed: 100, overheadPercent: 10 },
    },
    {
      id: "gameDownload",
      icon: "🎮",
      values: { fileSize: 80, speed: 300, overheadPercent: 10 },
    },
    {
      id: "osUpdate",
      icon: "💻",
      values: { fileSize: 5, speed: 50, overheadPercent: 10 },
    },
    {
      id: "cloudBackup",
      icon: "☁️",
      values: { fileSize: 500, speed: 20, overheadPercent: 15 },
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
      subtitle: "Estimate how long it takes to download, upload, or copy a file — with real-world overhead and speed comparison across interfaces.",
      breadcrumb: "Transfer Time",

      seo: {
        title: "Transfer Time Calculator - Download & Upload Time Estimator",
        description: "Calculate how long it takes to transfer any file. Accounts for TCP/IP overhead and compares speeds across WiFi, USB, Ethernet, and more. Free online tool.",
        shortDescription: "Estimate file transfer time with real-world overhead adjustments.",
        keywords: [
          "file transfer time calculator",
          "download time calculator",
          "upload time estimator",
          "how long to download",
          "transfer speed calculator",
          "free download time calculator",
          "data transfer time",
          "bandwidth calculator",
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
        speed: {
          label: "Connection Speed",
          helpText: "Your download, upload, or interface speed",
        },
        connectionType: {
          label: "Quick Speed Select",
          helpText: "Pick a common interface to auto-fill speed",
          options: {
            custom: "Custom Speed",
            adsl: "ADSL (8 Mbps)",
            "4g": "4G / LTE (50 Mbps)",
            cable: "Cable (100 Mbps)",
            "5g": "5G (300 Mbps)",
            fiber: "Fiber (1 Gbps)",
            wifi5: "Wi-Fi 5 / 802.11ac (400 Mbps)",
            wifi6: "Wi-Fi 6 / 802.11ax (1.2 Gbps)",
            ethernet: "Gigabit Ethernet (1 Gbps)",
            ethernet10g: "10G Ethernet (10 Gbps)",
            usb2: "USB 2.0 (480 Mbps)",
            usb3: "USB 3.0 (5 Gbps)",
            usb31: "USB 3.1 (10 Gbps)",
            usb4: "USB 4 (40 Gbps)",
            thunderbolt3: "Thunderbolt 3 (40 Gbps)",
            sata3: "SATA III (6 Gbps)",
            nvme: "NVMe SSD (32 Gbps)",
          },
        },
        overheadPercent: {
          label: "Protocol Overhead",
          helpText: "TCP/IP, encryption, and protocol overhead reduce effective speed (typically 5–15%)",
        },
      },

      results: {
        transferTime: { label: "Transfer Time" },
        totalSeconds: { label: "Total Seconds" },
        effectiveSpeed: { label: "Effective Speed" },
        effectiveSpeedBytes: { label: "Effective Speed" },
        fileSizeBytes: { label: "File Size (bytes)" },
        speedBitsPerSec: { label: "Raw Speed" },
      },

      presets: {
        movie4k: { label: "4K Movie (15 GB)", description: "15 GB at 100 Mbps" },
        gameDownload: { label: "Game Download (80 GB)", description: "80 GB at 300 Mbps" },
        osUpdate: { label: "OS Update (5 GB)", description: "5 GB at 50 Mbps" },
        cloudBackup: { label: "Cloud Backup (500 GB)", description: "500 GB at 20 Mbps upload" },
        usbTransfer: { label: "USB 3.0 Copy (256 GB)", description: "256 GB over USB 3.0" },
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
          title: "Speed Breakdown",
          items: [
            "Raw speed: {speedBitsPerSec}",
            "With {overheadPercent}% overhead: {effectiveSpeed}",
            "Bytes per second: {effectiveSpeedBytes}",
            "Total data: {fileSizeBytes}",
          ],
        },
        details: {
          title: "Quick Reference",
          items: [
            "1 byte = 8 bits — ISPs advertise in bits (Mbps)",
            "100 Mbps ≈ 12.5 MB/s real-world throughput",
            "Upload speeds are usually much slower than download",
            "Wi-Fi actual speed is typically 30–70% of rated speed",
          ],
        },
        tips: {
          title: "Speed Up Your Transfers",
          items: [
            "Use wired Ethernet instead of Wi-Fi for large files",
            "Close other apps and downloads to free bandwidth",
            "USB 3.0+ is faster than most internet connections for local copies",
            "Cloud transfers benefit from off-peak hours (nights, weekends)",
          ],
        },
      },

      detailedTable: {
        interfaceComparison: {
          button: "View Interface Comparison",
          title: "Transfer Time by Interface",
          columns: {
            interface: "Interface",
            ratedSpeed: "Rated Speed",
            effectiveSpeed: "Effective Speed",
            transferTime: "Transfer Time",
          },
        },
      },

      education: {
        whatIs: {
          title: "How File Transfer Time Is Calculated",
          content: "File transfer time depends on two factors: the size of the file (measured in bytes) and the speed of your connection (measured in bits per second). The critical detail most people miss is the distinction between bits and bytes — there are 8 bits in every byte. When your Internet Service Provider advertises a 100 Mbps connection, that translates to a theoretical maximum of 12.5 megabytes per second. In practice, protocol overhead, network congestion, and hardware limitations reduce this further. A typical TCP/IP connection loses 5–15% of its bandwidth to packet headers, acknowledgments, error correction, and encryption. That's why a 100 Mbps connection often delivers only 10–11 MB/s in real-world file transfers rather than the theoretical 12.5 MB/s.",
        },
        howItWorks: {
          title: "Understanding Bits, Bytes, and Speed Units",
          content: "The fundamental formula is simple: Transfer Time = File Size (in bits) ÷ Speed (in bits per second). However, confusion arises because file sizes use bytes (KB, MB, GB, TB) while network speeds use bits (Kbps, Mbps, Gbps). To convert, multiply the file size in bytes by 8 to get bits. Additionally, storage manufacturers use decimal prefixes (1 GB = 1,000,000,000 bytes) while some operating systems use binary prefixes (1 GiB = 1,073,741,824 bytes). This calculator uses the standard decimal (SI) convention, which matches what most ISPs and hardware manufacturers advertise. For USB and local transfers, the rated speed is the theoretical maximum — actual throughput depends on the slowest device in the chain, cable quality, and whether the bus is shared with other peripherals.",
        },
        considerations: {
          title: "Factors That Affect Transfer Speed",
          items: [
            { text: "Protocol overhead: TCP/IP headers, TLS encryption, and application-layer protocols add 5–15% overhead to every transfer.", type: "info" },
            { text: "Network congestion: shared connections, peak-hour usage, and ISP throttling can reduce your speed by 20–50%.", type: "warning" },
            { text: "Hardware bottlenecks: old routers, HDD read/write limits (~100 MB/s), and slow USB hubs can cap throughput below network speed.", type: "warning" },
            { text: "Latency: high round-trip time (>100ms) significantly reduces TCP throughput, especially for small files or many sequential transfers.", type: "info" },
            { text: "Distance: geographic distance to servers adds latency and reduces effective bandwidth due to TCP windowing.", type: "info" },
            { text: "Parallel transfers: splitting large files into chunks and sending simultaneously can improve total throughput by 2–4×.", type: "info" },
          ],
        },
        categories: {
          title: "Common Transfer Scenarios",
          items: [
            { text: "Photo (5 MB) over 4G LTE (50 Mbps): less than 1 second.", type: "info" },
            { text: "HD Movie (4 GB) over fiber (500 Mbps): about 64 seconds (~1 minute).", type: "info" },
            { text: "Game download (80 GB) over cable (200 Mbps): roughly 53 minutes.", type: "info" },
            { text: "Full backup (1 TB) over 50 Mbps upload: about 44 hours.", type: "info" },
            { text: "SSD to SSD via USB 3.0 (500 GB): roughly 17 minutes at real-world speeds.", type: "info" },
            { text: "4K video production (2 TB) over 10G Ethernet: about 27 minutes.", type: "info" },
          ],
        },
        examples: {
          title: "Step-by-Step Calculation Examples",
          description: "See how transfer time is calculated for common scenarios",
          examples: [
            {
              title: "Download a 50 GB Game at 200 Mbps",
              steps: [
                "File size: 50 GB = 50 × 8,000,000,000 = 400,000,000,000 bits",
                "Raw speed: 200 Mbps = 200,000,000 bits/second",
                "Theoretical time = 400,000,000,000 ÷ 200,000,000 = 2,000 seconds",
                "Apply 10% overhead: 2,000 ÷ 0.90 = 2,222 seconds",
                "Convert: 2,222 s = 37 minutes 2 seconds",
              ],
              result: "A 50 GB game at 200 Mbps takes about 37 minutes with 10% overhead.",
            },
            {
              title: "Copy 256 GB to USB 3.0 Drive",
              steps: [
                "File size: 256 GB = 256 × 8,000,000,000 = 2,048,000,000,000 bits",
                "USB 3.0 rated: 5 Gbps = 5,000,000,000 bits/second",
                "Real-world USB 3.0: ~60% efficiency = 3,000 Mbps effective",
                "Time = 2,048,000,000,000 ÷ 3,000,000,000 = 683 seconds",
                "Convert: 683 s = 11 minutes 23 seconds",
              ],
              result: "Copying 256 GB over USB 3.0 takes about 11 minutes at realistic speeds.",
            },
          ],
        },
      },

      faqs: [
        {
          question: "Why is my actual transfer speed slower than my internet plan?",
          answer: "Internet speeds are advertised in megabits per second (Mbps), but your computer shows file transfer rates in megabytes per second (MB/s). Since 1 byte = 8 bits, a 100 Mbps connection maxes out at 12.5 MB/s. Add TCP/IP overhead (5–15%), Wi-Fi signal loss, ISP throttling, and shared connections, and real-world speeds are typically 30–70% of the advertised rate.",
        },
        {
          question: "What is protocol overhead and how does it affect transfer time?",
          answer: "Every piece of data sent over a network is wrapped in protocol headers (TCP, IP, Ethernet frames) that consume bandwidth but don't carry your file data. TLS encryption adds further overhead. In typical scenarios, this accounts for 5–15% of the total bandwidth. For VPN connections, overhead can reach 15–20% due to additional encryption and encapsulation layers.",
        },
        {
          question: "How do I find my actual internet speed?",
          answer: "Run a speed test at speedtest.net or fast.com to measure your current download and upload speeds. Test multiple times at different hours for accuracy — peak hours (evenings) are usually slower. For local transfers, check your device specs: USB port version, Ethernet adapter speed (100 Mbps vs 1 Gbps), and storage drive type (HDD ~100 MB/s, SATA SSD ~550 MB/s, NVMe SSD ~3,500 MB/s).",
        },
        {
          question: "Is Wi-Fi slower than Ethernet for file transfers?",
          answer: "Almost always, yes. Wi-Fi signals degrade with distance, walls, and interference from other devices. Wi-Fi 6 is rated at 1.2 Gbps but typically achieves 300–600 Mbps in practice. Gigabit Ethernet consistently delivers 900+ Mbps. For large file transfers (backups, video projects), always prefer a wired connection when possible.",
        },
        {
          question: "Why does USB 3.0 transfer slower than its rated 5 Gbps?",
          answer: "USB 3.0's 5 Gbps is the bus speed, not the transfer speed. Real-world USB 3.0 achieves 300–400 MB/s (2.4–3.2 Gbps) due to protocol overhead, controller limitations, and the read/write speed of the connected drive. If your drive is an HDD (~100 MB/s), it becomes the bottleneck — even a USB 2.0 connection at 480 Mbps (60 MB/s) would suffice.",
        },
        {
          question: "How long does it take to upload 1 TB to the cloud?",
          answer: "It depends heavily on your upload speed, which is typically much lower than download. At 10 Mbps upload (common for cable): ~9.3 days. At 20 Mbps: ~4.6 days. At 100 Mbps upload (fiber): ~22 hours. Many cloud services also throttle individual upload connections. Services like AWS S3, Google Cloud, or Backblaze support multi-part uploads that can improve throughput.",
        },
      ],

      references: [
        { authors: "IEEE Standards Association", year: "2024", title: "IEEE 802.3 Ethernet Working Group", source: "IEEE", url: "https://www.ieee802.org/3/" },
        { authors: "USB Implementers Forum", year: "2024", title: "USB Specifications and Documents", source: "USB-IF", url: "https://www.usb.org/documents" },
      ],
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
      allowedUnits: ["KB", "MB", "GB", "TB", "PB"],
    },
    {
      id: "connectionType",
      type: "select",
      defaultValue: "custom",
      options: [
        { value: "custom", id: "custom" },
        { value: "adsl", id: "adsl" },
        { value: "4g", id: "4g" },
        { value: "cable", id: "cable" },
        { value: "5g", id: "5g" },
        { value: "fiber", id: "fiber" },
        { value: "wifi5", id: "wifi5" },
        { value: "wifi6", id: "wifi6" },
        { value: "ethernet", id: "ethernet" },
        { value: "ethernet10g", id: "ethernet10g" },
        { value: "usb2", id: "usb2" },
        { value: "usb3", id: "usb3" },
        { value: "usb31", id: "usb31" },
        { value: "usb4", id: "usb4" },
        { value: "thunderbolt3", id: "thunderbolt3" },
        { value: "sata3", id: "sata3" },
        { value: "nvme", id: "nvme" },
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
    { id: "transferTime", featured: true, icon: "⏱️" },
    { id: "totalSeconds", icon: "🔢" },
    { id: "effectiveSpeed", icon: "📡" },
    { id: "effectiveSpeedBytes", icon: "💾" },
    { id: "fileSizeBytes", icon: "📦" },
    { id: "speedBitsPerSec", icon: "⚡" },
  ],

  detailedTable: {
    id: "interfaceComparison",
    buttonLabel: "View Interface Comparison",
    buttonIcon: "📊",
    modalTitle: "Transfer Time by Interface",
    columns: [
      { id: "interface", label: "Interface", align: "left" },
      { id: "ratedSpeed", label: "Rated Speed", align: "center" },
      { id: "effectiveSpeed", label: "Effective Speed", align: "center" },
      { id: "transferTime", label: "Transfer Time", align: "right", highlight: true },
    ],
  },

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "📖", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

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
    { authors: "IEEE Standards Association", year: "2024", title: "IEEE 802.3 Ethernet Working Group", source: "IEEE", url: "https://www.ieee802.org/3/" },
    { authors: "USB Implementers Forum", year: "2024", title: "USB Specifications and Documents", source: "USB-IF", url: "https://www.usb.org/documents" },
  ],

  hero: { badge: "NEW" },
  sidebar: { showSaveButton: true, showPdfButton: true, showExcelButton: true },
  features: { copyResults: true },
  relatedCalculators: ["bandwidth", "password-generator", "subnet"],
  ads: { showAds: true },
};

// ─────────────────────────────────────────────────────────────────────────────
// Interface speed table (Mbps)
// ─────────────────────────────────────────────────────────────────────────────

const INTERFACE_SPEEDS: Record<string, { mbps: number; label: string }> = {
  adsl:          { mbps: 8, label: "ADSL" },
  "4g":          { mbps: 50, label: "4G / LTE" },
  cable:         { mbps: 100, label: "Cable" },
  "5g":          { mbps: 300, label: "5G" },
  fiber:         { mbps: 1000, label: "Fiber" },
  wifi5:         { mbps: 400, label: "Wi-Fi 5" },
  wifi6:         { mbps: 1200, label: "Wi-Fi 6" },
  ethernet:      { mbps: 1000, label: "Gigabit Ethernet" },
  ethernet10g:   { mbps: 10000, label: "10G Ethernet" },
  usb2:          { mbps: 480, label: "USB 2.0" },
  usb3:          { mbps: 5000, label: "USB 3.0" },
  usb31:         { mbps: 10000, label: "USB 3.1" },
  usb4:          { mbps: 40000, label: "USB 4" },
  thunderbolt3:  { mbps: 40000, label: "Thunderbolt 3" },
  sata3:         { mbps: 6000, label: "SATA III" },
  nvme:          { mbps: 32000, label: "NVMe SSD" },
};

// ─────────────────────────────────────────────────────────────────────────────
// Formatting helpers
// ─────────────────────────────────────────────────────────────────────────────

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (val < 0.001) return val.toExponential(2);
  if (val < 1000) return val.toFixed(2).replace(/\.?0+$/, "");
  return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

/** Auto-scale bits per second → Kbps / Mbps / Gbps / Tbps */
function autoBps(bps: number): string {
  if (bps >= 1e12) return `${fmtNum(bps / 1e12)} Tbps`;
  if (bps >= 1e9) return `${fmtNum(bps / 1e9)} Gbps`;
  if (bps >= 1e6) return `${fmtNum(bps / 1e6)} Mbps`;
  if (bps >= 1e3) return `${fmtNum(bps / 1e3)} Kbps`;
  return `${fmtNum(bps)} bps`;
}

/** Auto-scale bytes → KB / MB / GB / TB */
function autoBytes(bytes: number): string {
  if (bytes >= 1e15) return `${fmtNum(bytes / 1e15)} PB`;
  if (bytes >= 1e12) return `${fmtNum(bytes / 1e12)} TB`;
  if (bytes >= 1e9) return `${fmtNum(bytes / 1e9)} GB`;
  if (bytes >= 1e6) return `${fmtNum(bytes / 1e6)} MB`;
  if (bytes >= 1e3) return `${fmtNum(bytes / 1e3)} KB`;
  return `${fmtNum(bytes)} bytes`;
}

/** Auto-scale bytes/sec → KB/s / MB/s / GB/s */
function autoBytesPerSec(bps: number): string {
  const bytesPerSec = bps / 8;
  if (bytesPerSec >= 1e9) return `${fmtNum(bytesPerSec / 1e9)} GB/s`;
  if (bytesPerSec >= 1e6) return `${fmtNum(bytesPerSec / 1e6)} MB/s`;
  if (bytesPerSec >= 1e3) return `${fmtNum(bytesPerSec / 1e3)} KB/s`;
  return `${fmtNum(bytesPerSec)} B/s`;
}

/** Format seconds into human-readable time */
function formatTime(totalSeconds: number, v: (key: string) => string): string {
  if (totalSeconds < 1) return v("lessThanASecond");

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} ${days === 1 ? v("day") : v("days")}`);
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? v("hour") : v("hours")}`);
  if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? v("minute") : v("minutes")}`);
  if (seconds > 0 && days === 0) parts.push(`${seconds} ${seconds === 1 ? v("second") : v("seconds")}`);

  return parts.join(", ");
}

/** Format seconds into compact time for table */
function formatTimeCompact(totalSeconds: number): string {
  if (totalSeconds < 1) return "< 1 sec";
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
// Convert file size to bits based on selected unit
// ─────────────────────────────────────────────────────────────────────────────

function fileSizeToBits(size: number, unit: string): number {
  const multipliers: Record<string, number> = {
    KB: 8e3,         // 8,000 bits
    MB: 8e6,         // 8,000,000 bits
    GB: 8e9,         // 8,000,000,000 bits
    TB: 8e12,        // 8,000,000,000,000 bits
    PB: 8e15,        // 8,000,000,000,000,000 bits
  };
  return size * (multipliers[unit] || 8e9);
}

function fileSizeToBytes(size: number, unit: string): number {
  const multipliers: Record<string, number> = {
    KB: 1e3,
    MB: 1e6,
    GB: 1e9,
    TB: 1e12,
    PB: 1e15,
  };
  return size * (multipliers[unit] || 1e9);
}

// ─────────────────────────────────────────────────────────────────────────────
// Convert speed to bits per second based on selected unit
// ─────────────────────────────────────────────────────────────────────────────

function speedToBps(speed: number, unit: string): number {
  const multipliers: Record<string, number> = {
    Kbps: 1e3,
    Mbps: 1e6,
    Gbps: 1e9,
  };
  return speed * (multipliers[unit] || 1e6);
}

// ─────────────────────────────────────────────────────────────────────────────
// Calculate function
// ─────────────────────────────────────────────────────────────────────────────

export function calculateTransferTime(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;

  // Translation helper
  const v = (key: string): string => {
    if (t && typeof t === "object") {
      const vals = (t as Record<string, Record<string, string>>).values;
      if (vals && vals[key]) return vals[key];
    }
    return key;
  };

  // Read inputs
  const fileSize = values.fileSize as number | null;
  const speed = values.speed as number | null;
  const overheadPercent = (values.overheadPercent as number) ?? 10;
  const connectionType = (values.connectionType as string) ?? "custom";

  // Validate required fields
  if (fileSize == null || fileSize <= 0 || speed == null || speed <= 0) {
    return {
      values: {},
      formatted: {
        transferTime: "--",
        totalSeconds: "--",
        effectiveSpeed: "--",
        effectiveSpeedBytes: "--",
        fileSizeBytes: "--",
        speedBitsPerSec: "--",
      },
      summary: "",
      isValid: false,
    };
  }

  // Get units from field dropdowns
  const fileSizeUnit = fieldUnits?.fileSize || "GB";
  const speedUnit = fieldUnits?.speed || "Mbps";

  // Convert to base units
  const fileSizeBits = fileSizeToBits(fileSize, fileSizeUnit);
  const fileSizeBytesVal = fileSizeToBytes(fileSize, fileSizeUnit);
  const rawBps = speedToBps(speed, speedUnit);

  // Apply overhead
  const efficiencyFactor = 1 - overheadPercent / 100;
  const effectiveBps = rawBps * efficiencyFactor;

  // Calculate transfer time in seconds
  const totalSeconds = fileSizeBits / effectiveBps;

  // Format results
  const formattedTime = formatTime(totalSeconds, v);

  // ─── Build interface comparison table ───
  const comparisonInterfaces = [
    "adsl", "4g", "cable", "5g", "fiber",
    "wifi5", "wifi6", "ethernet", "ethernet10g",
    "usb2", "usb3", "usb31", "usb4", "sata3", "nvme",
  ];

  const tableData = comparisonInterfaces.map((key) => {
    const iface = INTERFACE_SPEEDS[key];
    const ifaceBps = iface.mbps * 1e6;
    const ifaceEffective = ifaceBps * efficiencyFactor;
    const ifaceSeconds = fileSizeBits / ifaceEffective;
    return {
      interface: iface.label,
      ratedSpeed: autoBps(ifaceBps),
      effectiveSpeed: autoBytesPerSec(ifaceEffective),
      transferTime: formatTimeCompact(ifaceSeconds),
    };
  });

  return {
    values: {
      transferTime: totalSeconds,
      totalSeconds,
      effectiveSpeed: effectiveBps,
      effectiveSpeedBytes: effectiveBps / 8,
      fileSizeBytes: fileSizeBytesVal,
      speedBitsPerSec: rawBps,
    },
    formatted: {
      transferTime: formattedTime,
      totalSeconds: fmtNum(Math.round(totalSeconds * 100) / 100),
      effectiveSpeed: autoBps(effectiveBps),
      effectiveSpeedBytes: autoBytesPerSec(effectiveBps),
      fileSizeBytes: autoBytes(fileSizeBytesVal),
      speedBitsPerSec: autoBps(rawBps),
    },
    summary: formattedTime,
    isValid: true,
    metadata: {
      tableData,
    },
  };
}

export default transferTimeConfig;
