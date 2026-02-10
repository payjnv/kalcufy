import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─────────────────────────────────────────────────────────────────────────────
// Transfer Time Calculator — File Download/Upload Time Estimator
// Migrated to unitType dropdowns (data + data_rate)
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
      values: { fileSize: 15, speed: 100 },
    },
    {
      id: "backup100gb",
      icon: "💾",
      values: { fileSize: 100, speed: 50 },
    },
    {
      id: "gameDownload",
      icon: "🎮",
      values: { fileSize: 80, speed: 300 },
    },
    {
      id: "cloudBackup1tb",
      icon: "☁️",
      values: { fileSize: 1000, speed: 20 },
    },
  ],

  t: {
    en: {
      name: "Transfer Time Calculator",
      slug: "transfer-time-calculator",
      subtitle: "Estimate how long it takes to download or upload a file based on your connection speed and file size.",
      breadcrumb: "Transfer Time",

      seo: {
        title: "Transfer Time Calculator - Download & Upload Time Estimator",
        description: "Calculate how long it takes to download or upload any file size at any connection speed. Supports MB, GB, TB and Mbps, Gbps. Free tool for IT planning and backups.",
        shortDescription: "Estimate file transfer duration from size and speed.",
        keywords: [
          "download time calculator",
          "file transfer time calculator",
          "upload time estimator",
          "how long to download",
          "transfer speed calculator",
          "free download time calculator",
          "data transfer time",
          "backup time estimator",
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
          helpText: "Your download or upload speed",
        },
      },

      results: {
        transferTime: { label: "Transfer Time" },
        totalSeconds: { label: "Total Seconds" },
        effectiveSpeed: { label: "Effective Speed" },
        fileSizeBytes: { label: "File Size (bytes)" },
        fileSizeBits: { label: "File Size (bits)" },
        speedMbps: { label: "Speed (Mbps)" },
        speedMBps: { label: "Speed (MB/s)" },
      },

      presets: {
        movie4k: { label: "4K Movie (15 GB)", description: "15 GB at 100 Mbps" },
        backup100gb: { label: "Backup (100 GB)", description: "100 GB at 50 Mbps upload" },
        gameDownload: { label: "Game Download (80 GB)", description: "80 GB at 300 Mbps" },
        cloudBackup1tb: { label: "Cloud Backup (1 TB)", description: "1 TB at 20 Mbps upload" },
      },

      values: {
        "days": "days",
        "day": "day",
        "hours": "hours",
        "hour": "hour",
        "minutes": "minutes",
        "minute": "minute",
        "seconds": "seconds",
        "second": "second",
        "lessThanASecond": "Less than a second",
      },

      formats: {
        summary: "Transferring {fileSize} at {speed} takes approximately {transferTime}.",
      },

      infoCards: {
        metrics: {
          title: "Transfer Summary",
          items: [
            { label: "Transfer Time", valueKey: "transferTime" },
            { label: "Total Seconds", valueKey: "totalSeconds" },
            { label: "Speed (Mbps)", valueKey: "speedMbps" },
            { label: "Speed (MB/s)", valueKey: "speedMBps" },
          ],
        },
        details: {
          title: "File Details",
          items: [
            { label: "File Size (bytes)", valueKey: "fileSizeBytes" },
            { label: "File Size (bits)", valueKey: "fileSizeBits" },
            { label: "Effective Speed", valueKey: "effectiveSpeed" },
            { label: "Transfer Time", valueKey: "transferTime" },
          ],
        },
        tips: {
          title: "Transfer Tips",
          items: [
            "Real-world speed is ~90–95% of your plan due to TCP/IP overhead and network conditions.",
            "Upload speeds are typically 5–10x slower than download on cable and DSL connections.",
            "For large backups, consider physical transfer (USB/drive shipping) — often faster than uploading.",
            "Use compression (zip, tar.gz) to reduce file size 30–70% before transferring over slow links.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is Transfer Time?",
          content: "Transfer time is the duration required to move a file or dataset from one point to another over a network connection. It depends on two primary factors: the size of the data being transferred and the available bandwidth (speed) of the connection. The formula is simple: Time = File Size ÷ Speed. However, the tricky part is matching units — file sizes are in bytes (KB, MB, GB) while network speeds are in bits (Kbps, Mbps, Gbps). Since 1 byte = 8 bits, you must convert between the two. Real-world transfers also face overhead from protocols (TCP, HTTP, encryption), retransmissions due to packet loss, and shared bandwidth with other users or applications on the same connection.",
        },
        howItWorks: {
          title: "The Transfer Time Formula",
          content: "The basic equation is: Transfer Time (seconds) = File Size (bits) ÷ Speed (bits per second). To convert file sizes: 1 KB = 8,000 bits, 1 MB = 8,000,000 bits, 1 GB = 8,000,000,000 bits, 1 TB = 8,000,000,000,000 bits. For practical calculations: if you have a 10 GB file and a 100 Mbps connection, convert 10 GB to bits = 80,000,000,000 bits ÷ 100,000,000 bps = 800 seconds ≈ 13.3 minutes. This is theoretical maximum — actual time will be slightly longer due to the overhead factors described above. Protocol overhead typically adds 3–5% to the transfer time, and shared connections further reduce effective throughput.",
        },
        considerations: {
          title: "Factors Affecting Transfer Speed",
          items: [
            { text: "Protocol overhead: TCP headers, encryption (TLS), and application protocols add 3–10% to transfer time.", type: "info" },
            { text: "Latency: high ping (>100ms) reduces throughput for TCP connections, especially over long distances.", type: "warning" },
            { text: "Packet loss: even 1% packet loss can reduce TCP throughput by 30–50% due to retransmissions.", type: "warning" },
            { text: "Disk I/O: if your storage is slow (HDD vs SSD), the drive may bottleneck before the network does.", type: "info" },
            { text: "ISP throttling: some providers throttle specific traffic types (torrents, streaming) to lower speeds.", type: "warning" },
            { text: "Parallel transfers: splitting a file into chunks and transferring simultaneously can improve total time.", type: "info" },
          ],
        },
        categories: {
          title: "Common Transfer Scenarios",
          items: [
            { text: "Photo (5 MB) over 4G (30 Mbps): ~1.3 seconds.", type: "info" },
            { text: "HD Movie (4 GB) over fiber (500 Mbps): ~64 seconds (~1 minute).", type: "info" },
            { text: "Game download (80 GB) over cable (200 Mbps): ~3,200 seconds (~53 minutes).", type: "info" },
            { text: "Full backup (1 TB) over 50 Mbps upload: ~160,000 seconds (~44 hours).", type: "info" },
            { text: "Database migration (500 GB) over 10G LAN: ~400 seconds (~7 minutes).", type: "info" },
            { text: "AWS S3 upload (100 GB) over 100 Mbps: ~8,000 seconds (~2.2 hours) single-thread.", type: "info" },
          ],
        },
        examples: {
          title: "Transfer Time Examples",
          description: "Step-by-step calculations",
          examples: [
            {
              title: "Download a 50 GB Game at 200 Mbps",
              steps: [
                "File size: 50 GB = 50 × 8 × 10⁹ = 400,000,000,000 bits",
                "Speed: 200 Mbps = 200,000,000 bps",
                "Time = 400,000,000,000 ÷ 200,000,000 = 2,000 seconds",
                "Convert: 2,000 s ÷ 60 = 33.3 minutes",
                "With 5% overhead: 33.3 × 1.05 = ~35 minutes",
              ],
              result: "A 50 GB game at 200 Mbps takes about 35 minutes in practice.",
            },
            {
              title: "Upload 500 GB Backup at 20 Mbps",
              steps: [
                "File size: 500 GB = 500 × 8 × 10⁹ = 4,000,000,000,000 bits",
                "Upload speed: 20 Mbps = 20,000,000 bps",
                "Time = 4,000,000,000,000 ÷ 20,000,000 = 200,000 seconds",
                "Convert: 200,000 ÷ 3,600 = ~55.6 hours = ~2.3 days",
                "Alternative: ship a 500 GB drive overnight — often faster!",
              ],
              result: "A 500 GB upload at 20 Mbps takes about 2.3 days nonstop.",
            },
          ],
        },
      },

      faqs: [
        { question: "Why does my download take longer than this calculator estimates?", answer: "This calculator shows theoretical minimum time. Real downloads are slower because of TCP/IP overhead (3–5%), shared bandwidth with other devices on your network, server-side speed limits, Wi-Fi signal degradation, ISP congestion during peak hours, and DNS lookup and connection setup time. A good rule of thumb: multiply the estimate by 1.1–1.3 for a realistic expectation." },
        { question: "What is the difference between download and upload speed?", answer: "Most consumer internet plans are asymmetric — download speed is much higher than upload. A typical cable plan might be 200 Mbps down but only 10 Mbps up. This matters for cloud backups, video calls, and uploading to servers. Fiber connections are often symmetric (same speed both ways). Always use your upload speed when calculating backup or upload times." },
        { question: "Is it faster to ship a hard drive than upload over the internet?", answer: "Often yes, especially for large datasets. A 2 TB drive shipped overnight delivers an effective bandwidth of about 185 Mbps, which beats most consumer upload speeds. AWS even offers 'Snowball' devices for physically shipping petabytes of data. The break-even point depends on your upload speed: at 100 Mbps, it takes ~44 hours to upload 2 TB. If overnight shipping is 16 hours, the drive wins." },
        { question: "How do I measure my actual connection speed?", answer: "Use speed test tools like Speedtest.net, fast.com (Netflix), or your ISP's speed test. For accurate results: use a wired (Ethernet) connection, close other apps and tabs, test multiple times at different hours, and test to servers in different locations. The results show your current throughput, which may be lower than your plan's rated speed." },
        { question: "Does file compression reduce transfer time?", answer: "Yes, compression can significantly reduce transfer time by shrinking the file before sending. Text-based files (documents, CSV, logs, code) compress 60–90%. Images in PNG format compress 10–30%. Already-compressed formats (JPEG, MP4, ZIP) see minimal benefit. For large transfers, the time saved on transfer usually outweighs the time spent compressing — especially on slow links." },
        { question: "What speed do I need for real-time video calls?", answer: "Zoom recommends 3.8 Mbps up and down for HD (1080p) video. Google Meet needs 3.2 Mbps. Microsoft Teams needs 4 Mbps. For group calls with multiple videos, double these numbers. The critical factor is actually latency and jitter, not bandwidth — a 10 Mbps connection with 200ms ping will perform worse for calls than a 5 Mbps connection with 20ms ping." },
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
      buttons: { calculate: "Calculate", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // INPUTS — unitType dropdowns instead of separate selects
  // ─────────────────────────────────────────────────────────────────────────
  inputs: [
    {
      id: "fileSize",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      min: 0.001,
      step: 0.1,
      unitType: "data",
      defaultUnit: "gb",
      syncGroup: false,
      allowedUnits: ["kb", "mb", "gb", "tb"],
    },
    {
      id: "speed",
      type: "number",
      defaultValue: null,
      placeholder: "100",
      min: 0.001,
      step: 0.1,
      unitType: "data_rate",
      defaultUnit: "mbps",
      syncGroup: false,
      allowedUnits: ["kbps", "mbps", "gbps", "kb_s", "mb_s", "gb_s"],
    },
  ],
  inputGroups: [],

  results: [
    { id: "transferTime", type: "primary", format: "text" },
    { id: "totalSeconds", type: "secondary", format: "text" },
    { id: "speedMbps", type: "secondary", format: "text" },
    { id: "speedMBps", type: "secondary", format: "text" },
    { id: "fileSizeBytes", type: "secondary", format: "text" },
    { id: "effectiveSpeed", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "🎯", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "⏱️", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "Cerf, V. & Kahn, R.",
      year: "1974",
      title: "A Protocol for Packet Network Intercommunication",
      source: "IEEE Transactions on Communications",
      url: "https://ieeexplore.ieee.org/document/1092259",
    },
    {
      authors: "Braden, R.",
      year: "1989",
      title: "Requirements for Internet Hosts — Communication Layers",
      source: "IETF RFC 1122",
      url: "https://datatracker.ietf.org/doc/html/rfc1122",
    },
  ],

  hero: { showRating: true, showShare: true },
  sidebar: { showAds: true, showRelated: true },
  features: { save: true, pdf: true, csv: true, excel: true },
  relatedCalculators: ["bandwidth", "ip-subnet", "cidr"],
  ads: { sidebar: true, footer: true },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

// Conversion from unit dropdown IDs (lowercase) to bytes
const SIZE_TO_BYTES: Record<string, number> = {
  byte: 1,
  kb: 1e3,
  mb: 1e6,
  gb: 1e9,
  tb: 1e12,
  pb: 1e15,
  kib: 1024,
  mib: 1048576,
  gib: 1073741824,
  tib: 1099511627776,
};

// Conversion from unit dropdown IDs (lowercase) to bits per second
const SPEED_TO_BPS: Record<string, number> = {
  bps: 1,
  kbps: 1e3,
  mbps: 1e6,
  gbps: 1e9,
  byte_s: 8,
  kb_s: 8e3,
  mb_s: 8e6,
  gb_s: 8e9,
};

// Unit display symbols (ID → what user sees)
const SIZE_SYMBOLS: Record<string, string> = {
  byte: "B", kb: "KB", mb: "MB", gb: "GB", tb: "TB", pb: "PB",
  kib: "KiB", mib: "MiB", gib: "GiB", tib: "TiB",
};

const SPEED_SYMBOLS: Record<string, string> = {
  bps: "bps", kbps: "Kbps", mbps: "Mbps", gbps: "Gbps",
  byte_s: "B/s", kb_s: "KB/s", mb_s: "MB/s", gb_s: "GB/s",
};

function formatDuration(totalSeconds: number, v: Record<string, string>): string {
  if (totalSeconds < 1) return v["lessThanASecond"] || "Less than a second";

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.round(totalSeconds % 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} ${days === 1 ? (v["day"] || "day") : (v["days"] || "days")}`);
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? (v["hour"] || "hour") : (v["hours"] || "hours")}`);
  if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? (v["minute"] || "minute") : (v["minutes"] || "minutes")}`);
  if (seconds > 0 && days === 0) parts.push(`${seconds} ${seconds === 1 ? (v["second"] || "second") : (v["seconds"] || "seconds")}`);

  return parts.join(", ");
}

function smartBytes(bytes: number): string {
  if (bytes >= 1e12) return `${(bytes / 1e12).toFixed(2)} TB`;
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(2)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(2)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(2)} KB`;
  return `${bytes} B`;
}

function smartBits(bits: number): string {
  if (bits >= 1e12) return `${(bits / 1e12).toFixed(2)} Tb`;
  if (bits >= 1e9) return `${(bits / 1e9).toFixed(2)} Gb`;
  if (bits >= 1e6) return `${(bits / 1e6).toFixed(2)} Mb`;
  if (bits >= 1e3) return `${(bits / 1e3).toFixed(2)} Kb`;
  return `${bits} b`;
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATE — reads fieldUnits from unit dropdowns
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

  // Read selected units from dropdowns (lowercase IDs)
  const sizeUnit = fieldUnits?.fileSize || "gb";
  const speedUnit = fieldUnits?.speed || "mbps";

  if (fileSize === null || speed === null || fileSize <= 0 || speed <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Convert using dropdown unit IDs
  const fileSizeBytes = fileSize * (SIZE_TO_BYTES[sizeUnit] || 1e9);
  const fileSizeBits = fileSizeBytes * 8;
  const speedBps = speed * (SPEED_TO_BPS[speedUnit] || 1e6);
  const speedMbps = speedBps / 1e6;
  const speedMBps = speedBps / 8e6;

  const totalSeconds = fileSizeBits / speedBps;
  const transferTime = formatDuration(totalSeconds, v);

  // Get display symbols for summary
  const sizeSymbol = SIZE_SYMBOLS[sizeUnit] || "GB";
  const speedSymbol = SPEED_SYMBOLS[speedUnit] || "Mbps";

  const summary = (f.summary || "Transferring {fileSize} at {speed} takes approximately {transferTime}.")
    .replace("{fileSize}", `${fileSize} ${sizeSymbol}`)
    .replace("{speed}", `${speed} ${speedSymbol}`)
    .replace("{transferTime}", transferTime);

  return {
    values: {
      transferTime,
      totalSeconds,
      speedMbps,
      speedMBps,
      fileSizeBytes,
      fileSizeBits,
      effectiveSpeed: speedMBps,
    },
    formatted: {
      transferTime,
      totalSeconds: `${totalSeconds.toLocaleString("en-US", { maximumFractionDigits: 1 })} s`,
      speedMbps: `${speedMbps.toFixed(2)} Mbps`,
      speedMBps: `${speedMBps.toFixed(2)} MB/s`,
      fileSizeBytes: smartBytes(fileSizeBytes),
      fileSizeBits: smartBits(fileSizeBits),
      effectiveSpeed: `${speedMBps.toFixed(2)} MB/s`,
    },
    summary,
    isValid: true,
  };
}

export default transferTimeConfig;
