import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─────────────────────────────────────────────────────────────────────────────
// Bandwidth Calculator — Unit Converter + Website Bandwidth Estimator
// ─────────────────────────────────────────────────────────────────────────────

export const bandwidthConfig: CalculatorConfigV4 = {
  id: "bandwidth",
  version: "4.0",
  category: "technology",
  icon: "📶",

  presets: [
    {
      id: "homeInternet",
      icon: "🏠",
      values: { mode: "convert", inputValue: 100, inputUnit: "mbps", outputUnit: "MBps" },
    },
    {
      id: "gigabitLan",
      icon: "🖥️",
      values: { mode: "convert", inputValue: 1, inputUnit: "gbps", outputUnit: "MBps" },
    },
    {
      id: "websiteBandwidth",
      icon: "🌐",
      values: { mode: "website", pageViews: 50000, avgPageSize: 2.5, pageSizeUnit: "MB", redundancy: 1.5 },
    },
    {
      id: "streamingServer",
      icon: "📺",
      values: { mode: "website", pageViews: 10000, avgPageSize: 5, pageSizeUnit: "MB", redundancy: 2 },
    },
  ],

  t: {
    en: {
      name: "Bandwidth Calculator",
      slug: "bandwidth-calculator",
      subtitle: "Convert between bandwidth units (Mbps, Gbps, MB/s) and estimate the bandwidth needed to host a website or service.",
      breadcrumb: "Bandwidth",

      seo: {
        title: "Bandwidth Calculator - Free Speed & Data Unit Converter",
        description: "Convert bandwidth units between Mbps, Gbps, MB/s, and more. Estimate website hosting bandwidth needs based on traffic. Free tool for network planning and IT pros.",
        shortDescription: "Convert bandwidth units and estimate hosting needs.",
        keywords: [
          "bandwidth calculator",
          "mbps to mbps converter",
          "bandwidth converter",
          "data transfer speed calculator",
          "website bandwidth calculator",
          "free bandwidth calculator",
          "internet speed converter",
          "network bandwidth tool",
        ],
      },

      calculator: { yourInformation: "Bandwidth Input" },
      ui: {
        yourInformation: "Bandwidth Input",
        calculate: "Calculate",
        reset: "Reset",
        results: "Bandwidth Results",
      },

      inputs: {
        mode: {
          label: "Calculator Mode",
          helpText: "Choose between unit conversion or website bandwidth estimation",
          options: {
            "convert": "Unit Converter",
            "website": "Website Bandwidth",
          },
        },
        inputValue: {
          label: "Bandwidth Value",
          helpText: "Enter the bandwidth or speed value to convert",
        },
        inputUnit: {
          label: "From Unit",
          helpText: "Source bandwidth unit",
          options: {
            "bps": "bps (bits/s)",
            "kbps": "Kbps (kilobits/s)",
            "mbps": "Mbps (megabits/s)",
            "gbps": "Gbps (gigabits/s)",
            "tbps": "Tbps (terabits/s)",
            "Bps": "B/s (bytes/s)",
            "KBps": "KB/s (kilobytes/s)",
            "MBps": "MB/s (megabytes/s)",
            "GBps": "GB/s (gigabytes/s)",
            "TBps": "TB/s (terabytes/s)",
          },
        },
        outputUnit: {
          label: "To Unit",
          helpText: "Target bandwidth unit",
          options: {
            "bps": "bps (bits/s)",
            "kbps": "Kbps (kilobits/s)",
            "mbps": "Mbps (megabits/s)",
            "gbps": "Gbps (gigabits/s)",
            "tbps": "Tbps (terabits/s)",
            "Bps": "B/s (bytes/s)",
            "KBps": "KB/s (kilobytes/s)",
            "MBps": "MB/s (megabytes/s)",
            "GBps": "GB/s (gigabytes/s)",
            "TBps": "TB/s (terabytes/s)",
          },
        },
        pageViews: {
          label: "Monthly Page Views",
          helpText: "Estimated monthly page views for your website",
        },
        avgPageSize: {
          label: "Average Page Size",
          helpText: "Average size of a single page load (HTML + images + scripts)",
        },
        pageSizeUnit: {
          label: "Page Size Unit",
          helpText: "Unit for the page size value",
          options: {
            "KB": "KB (kilobytes)",
            "MB": "MB (megabytes)",
          },
        },
        redundancy: {
          label: "Redundancy Factor",
          helpText: "Multiply bandwidth by this for headroom (1.0 = exact, 1.5 = 50% extra, 2.0 = double)",
        },
      },

      results: {
        convertedValue: { label: "Converted Value" },
        bitsPerSecond: { label: "Bits per Second" },
        bytesPerSecond: { label: "Bytes per Second" },
        kilobitsPerSec: { label: "Kilobits/s (Kbps)" },
        megabitsPerSec: { label: "Megabits/s (Mbps)" },
        gigabitsPerSec: { label: "Gigabits/s (Gbps)" },
        kilobytesPerSec: { label: "Kilobytes/s (KB/s)" },
        megabytesPerSec: { label: "Megabytes/s (MB/s)" },
        gigabytesPerSec: { label: "Gigabytes/s (GB/s)" },
        monthlyTransfer: { label: "Monthly Data Transfer" },
        dailyTransfer: { label: "Daily Data Transfer" },
        requiredBandwidth: { label: "Required Bandwidth" },
        withRedundancy: { label: "With Redundancy Factor" },
      },

      presets: {
        homeInternet: { label: "Home Internet (100 Mbps)", description: "Convert 100 Mbps to MB/s" },
        gigabitLan: { label: "Gigabit LAN", description: "Convert 1 Gbps to MB/s" },
        websiteBandwidth: { label: "Medium Website", description: "50K views/mo, 2.5 MB/page" },
        streamingServer: { label: "Streaming Server", description: "10K views/mo, 5 MB/page" },
      },

      values: {
        "perSecond": "/s",
        "perMonth": "/month",
        "perDay": "/day",
      },

      formats: {
        summary: "{inputValue} {inputUnit} = {convertedValue} {outputUnit}",
        summaryWebsite: "Your site needs ~{requiredBandwidth} Mbps ({withRedundancy} Mbps with {redundancy}x redundancy) for {pageViews} monthly views.",
      },

      infoCards: {
        metrics: {
          title: "Conversion Results",
          items: [
            { label: "Megabits/s", valueKey: "megabitsPerSec" },
            { label: "Megabytes/s", valueKey: "megabytesPerSec" },
            { label: "Gigabits/s", valueKey: "gigabitsPerSec" },
            { label: "Monthly Transfer", valueKey: "monthlyTransfer" },
          ],
        },
        details: {
          title: "All Units",
          items: [
            { label: "Bits/s", valueKey: "bitsPerSecond" },
            { label: "Kilobits/s", valueKey: "kilobitsPerSec" },
            { label: "Kilobytes/s", valueKey: "kilobytesPerSec" },
            { label: "Gigabytes/s", valueKey: "gigabytesPerSec" },
          ],
        },
        tips: {
          title: "Bandwidth Tips",
          items: [
            "ISPs advertise in Mbps (megabits). Divide by 8 to get MB/s (megabytes) — your actual download speed.",
            "1 Gbps = 125 MB/s. Gigabit Ethernet rarely reaches full speed due to overhead (expect ~940 Mbps).",
            "Wi-Fi 6 (802.11ax) theoretical max is 9.6 Gbps — real-world is typically 500–1,200 Mbps.",
            "For video streaming: 4K needs 25 Mbps, 1080p needs 5 Mbps, 720p needs 3 Mbps per stream.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is Bandwidth?",
          content: "Bandwidth is the maximum rate at which data can be transferred over a network connection, measured in bits per second (bps) and its multiples. It represents capacity, not speed — think of it as the width of a pipe through which data flows. A wider pipe (more bandwidth) allows more data to pass at once. Internet Service Providers (ISPs) advertise speeds in megabits per second (Mbps), but file sizes are measured in megabytes (MB). Since 1 byte = 8 bits, a 100 Mbps connection can transfer at most 12.5 MB per second under ideal conditions. Real-world throughput is lower due to protocol overhead (TCP/IP headers), latency, congestion, and the difference between the physical link rate and usable application bandwidth.",
        },
        howItWorks: {
          title: "Bits vs Bytes — Why the Confusion?",
          content: "The endless confusion between Mbps and MB/s comes from the bit/byte distinction. A bit (b, lowercase) is a single binary digit (0 or 1). A byte (B, uppercase) is 8 bits. Network equipment and ISPs measure bandwidth in bits per second (bps, Kbps, Mbps, Gbps), while operating systems and file managers display file sizes in bytes (KB, MB, GB). This means a '100 Mbps' connection downloads files at about 12.5 MB/s, not 100 MB/s. Additionally, there are two competing standards for prefixes: decimal (SI, where 1 KB = 1,000 bytes) and binary (IEC, where 1 KiB = 1,024 bytes). Most networking uses decimal prefixes, while RAM and some storage uses binary. This calculator uses decimal (SI) prefixes, which is the networking standard.",
        },
        considerations: {
          title: "Bandwidth Planning Factors",
          items: [
            { text: "Protocol overhead: TCP/IP adds ~3–5% overhead. Expect usable throughput around 95% of link speed.", type: "info" },
            { text: "Shared bandwidth: if 10 users share a 100 Mbps link, each gets ~10 Mbps during peak usage.", type: "warning" },
            { text: "Upload vs download: most consumer plans are asymmetric — upload is much slower than download.", type: "info" },
            { text: "Latency ≠ bandwidth: a high-bandwidth link can still be slow if latency (ping) is high.", type: "warning" },
            { text: "Bot traffic can consume 30–50% of a website's bandwidth — account for crawlers in your estimates.", type: "warning" },
            { text: "CDNs (Cloudflare, CloudFront) offload 60–90% of bandwidth by caching static assets at edge nodes.", type: "info" },
          ],
        },
        categories: {
          title: "Common Connection Speeds",
          items: [
            { text: "DSL: 1–100 Mbps download, 0.5–10 Mbps upload. Declining technology being replaced by fiber.", type: "info" },
            { text: "Cable (DOCSIS 3.1): 100–1,200 Mbps download, 5–50 Mbps upload. Shared with neighborhood.", type: "info" },
            { text: "Fiber (FTTH): 100–10,000 Mbps symmetric. Best consumer option for both speed and latency.", type: "info" },
            { text: "5G: 50–4,000 Mbps download. mmWave fastest but short range; mid-band offers best balance.", type: "info" },
            { text: "Wi-Fi 6E: up to 2,400 Mbps on 6 GHz. Best for dense environments with many devices.", type: "info" },
            { text: "10G Ethernet: 10,000 Mbps (1,250 MB/s). Standard for data centers and server interconnects.", type: "info" },
          ],
        },
        examples: {
          title: "Bandwidth Conversion Examples",
          description: "Common unit conversions",
          examples: [
            {
              title: "ISP Speed to Actual Download",
              steps: [
                "Your ISP plan: 200 Mbps (megabits per second)",
                "Convert to bytes: 200 ÷ 8 = 25 MB/s (megabytes per second)",
                "Account for overhead (~5%): 25 × 0.95 = 23.75 MB/s practical",
                "A 1 GB file takes: 1,000 ÷ 23.75 = ~42 seconds",
                "Monthly cap at full speed: 25 MB/s × 86,400 s × 30 days = ~64.8 TB",
              ],
              result: "200 Mbps = 25 MB/s theoretical, ~23.75 MB/s practical download speed.",
            },
            {
              title: "Website Bandwidth Requirement",
              steps: [
                "Monthly page views: 100,000",
                "Average page size: 3 MB (HTML + images + JS + CSS)",
                "Monthly data: 100,000 × 3 MB = 300,000 MB = ~293 GB",
                "Per second: 300,000 MB ÷ (30 × 86,400) = 0.116 MB/s = 0.926 Mbps",
                "With 2x redundancy: 0.926 × 2 = ~1.85 Mbps",
              ],
              result: "A site with 100K monthly views needs ~2 Mbps with headroom.",
            },
          ],
        },
      },

      faqs: [
        { question: "What is the difference between Mbps and MB/s?", answer: "Mbps (megabits per second) and MB/s (megabytes per second) measure data rate but in different units. Since 1 byte = 8 bits, you divide Mbps by 8 to get MB/s. A 100 Mbps internet plan gives you about 12.5 MB/s actual download speed. ISPs use Mbps because the larger number looks better in marketing, while your computer shows file downloads in MB/s." },
        { question: "Why is my actual download speed lower than my plan speed?", answer: "Several factors reduce real-world throughput: TCP/IP protocol overhead (3–5%), Wi-Fi signal loss (20–50% reduction vs wired), network congestion during peak hours, distance from the router, and ISP throttling. A 100 Mbps wired connection typically delivers 90–95 Mbps, while the same plan over Wi-Fi might deliver 50–80 Mbps depending on conditions." },
        { question: "How much bandwidth does streaming video require?", answer: "Netflix and YouTube recommend: SD (480p) = 3 Mbps, HD (1080p) = 5 Mbps, 4K UHD = 25 Mbps per stream. Multiple simultaneous streams add up — a household with 3 people streaming 4K needs about 75 Mbps just for video. Gaming adds 3–6 Mbps per player, and video calls need 1.5–4 Mbps each." },
        { question: "How do I calculate website hosting bandwidth?", answer: "Multiply monthly page views by average page size to get monthly data transfer. Then divide by seconds in a month (2,592,000) to get the average bandwidth in bytes per second. Multiply by 8 to convert to bits per second. Add a redundancy factor of 1.5–2x for traffic spikes and bot traffic. Example: 50,000 views × 2 MB = 100 GB/month = ~0.31 Mbps average, or ~0.62 Mbps with 2x redundancy." },
        { question: "What is the difference between bandwidth and throughput?", answer: "Bandwidth is the theoretical maximum capacity of a link — like the speed limit on a highway. Throughput is the actual amount of data successfully delivered — like how fast your car actually moves in traffic. Bandwidth is always higher than throughput because of protocol overhead, congestion, errors, and retransmissions. A 1 Gbps Ethernet link typically achieves 940–960 Mbps throughput." },
        { question: "Does bandwidth use decimal (1000) or binary (1024) prefixes?", answer: "Networking uses decimal (SI) prefixes: 1 Kbps = 1,000 bps, 1 Mbps = 1,000,000 bps, 1 Gbps = 1,000,000,000 bps. Storage traditionally uses binary: 1 KiB = 1,024 bytes. This creates a ~2.4% discrepancy at megabyte scale and ~7.4% at gigabyte scale. This calculator uses decimal (SI) standard, consistent with networking conventions and ISP measurements." },
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

  inputs: [
    {
      id: "mode",
      type: "radio",
      defaultValue: "convert",
      options: [{ value: "convert" }, { value: "website" }],
    },
    // --- Unit Converter fields ---
    {
      id: "inputValue",
      type: "number",
      defaultValue: null,
      placeholder: "100",
      min: 0,
      step: 0.01,
      showWhen: { field: "mode", value: "convert" },
    },
    {
      id: "inputUnit",
      type: "select",
      defaultValue: "mbps",
      showWhen: { field: "mode", value: "convert" },
    },
    {
      id: "outputUnit",
      type: "select",
      defaultValue: "MBps",
      showWhen: { field: "mode", value: "convert" },
    },
    // --- Website Bandwidth fields ---
    {
      id: "pageViews",
      type: "number",
      defaultValue: null,
      placeholder: "50000",
      min: 1,
      showWhen: { field: "mode", value: "website" },
    },
    {
      id: "avgPageSize",
      type: "number",
      defaultValue: null,
      placeholder: "2.5",
      min: 0.01,
      step: 0.1,
      showWhen: { field: "mode", value: "website" },
    },
    {
      id: "pageSizeUnit",
      type: "select",
      defaultValue: "MB",
      showWhen: { field: "mode", value: "website" },
    },
    {
      id: "redundancy",
      type: "number",
      defaultValue: 1.5,
      min: 1,
      max: 5,
      step: 0.1,
      suffix: "x",
      showWhen: { field: "mode", value: "website" },
    },
  ],
  inputGroups: [],

  results: [
    { id: "convertedValue", type: "primary", format: "text" },
    { id: "megabitsPerSec", type: "secondary", format: "text" },
    { id: "megabytesPerSec", type: "secondary", format: "text" },
    { id: "gigabitsPerSec", type: "secondary", format: "text" },
    { id: "kilobitsPerSec", type: "secondary", format: "text" },
    { id: "kilobytesPerSec", type: "secondary", format: "text" },
    { id: "monthlyTransfer", type: "secondary", format: "text" },
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
    { id: "categories", type: "list", icon: "📶", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "IEEE Standards Association",
      year: "2022",
      title: "IEEE 802.3-2022 — Ethernet Standard",
      source: "IEEE",
      url: "https://standards.ieee.org/ieee/802.3/10422/",
    },
    {
      authors: "International Telecommunication Union",
      year: "2024",
      title: "Broadband Speeds and Performance Metrics",
      source: "ITU",
      url: "https://www.itu.int/en/ITU-D/Statistics/Pages/stat/default.aspx",
    },
  ],

  hero: { showRating: true, showShare: true },
  sidebar: { showAds: true, showRelated: true },
  features: { save: true, pdf: true, csv: true, excel: true },
  relatedCalculators: ["transfer-time", "ip-subnet", "cidr"],
  ads: { sidebar: true, footer: true },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

// All conversions relative to bps (bits per second)
const UNIT_TO_BPS: Record<string, number> = {
  bps: 1,
  kbps: 1e3,
  mbps: 1e6,
  gbps: 1e9,
  tbps: 1e12,
  Bps: 8,
  KBps: 8e3,
  MBps: 8e6,
  GBps: 8e9,
  TBps: 8e12,
};

const UNIT_LABELS: Record<string, string> = {
  bps: "bps",
  kbps: "Kbps",
  mbps: "Mbps",
  gbps: "Gbps",
  tbps: "Tbps",
  Bps: "B/s",
  KBps: "KB/s",
  MBps: "MB/s",
  GBps: "GB/s",
  TBps: "TB/s",
};

function smartFormat(val: number): string {
  if (val === 0) return "0";
  if (val >= 1e12) return (val / 1e12).toFixed(2) + " T";
  if (val >= 1e9) return (val / 1e9).toFixed(2) + " G";
  if (val >= 1e6) return (val / 1e6).toFixed(2) + " M";
  if (val >= 1e3) return (val / 1e3).toFixed(2) + " K";
  if (val < 0.01) return val.toExponential(2);
  return val.toFixed(4).replace(/\.?0+$/, "");
}

function formatNum(n: number, decimals = 2): string {
  if (n >= 1e9) return (n / 1e9).toFixed(decimals) + " GB";
  if (n >= 1e6) return (n / 1e6).toFixed(decimals) + " MB";
  if (n >= 1e3) return (n / 1e3).toFixed(decimals) + " KB";
  return n.toFixed(0) + " B";
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATE
// ─────────────────────────────────────────────────────────────────────────────

export function calculateBandwidth(data: {
  values: Record<string, unknown>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const f = (t?.formats as Record<string, string>) || {};
  const mode = values.mode as string;

  if (mode === "website") {
    return calculateWebsiteBandwidth(values, f);
  }

  // --- Unit Converter Mode ---
  const inputValue = values.inputValue as number | null;
  const inputUnit = values.inputUnit as string;
  const outputUnit = values.outputUnit as string;

  if (inputValue === null || inputValue < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const bps = inputValue * (UNIT_TO_BPS[inputUnit] || 1);
  const converted = bps / (UNIT_TO_BPS[outputUnit] || 1);

  const kbps = bps / 1e3;
  const mbps = bps / 1e6;
  const gbps = bps / 1e9;
  const Bps = bps / 8;
  const KBps = Bps / 1e3;
  const MBps = Bps / 1e6;
  const GBps = Bps / 1e9;

  const monthlyBytes = Bps * 86400 * 30;

  const summary = (f.summary || "{inputValue} {inputUnit} = {convertedValue} {outputUnit}")
    .replace("{inputValue}", inputValue.toString())
    .replace("{inputUnit}", UNIT_LABELS[inputUnit] || inputUnit)
    .replace("{convertedValue}", smartFormat(converted))
    .replace("{outputUnit}", UNIT_LABELS[outputUnit] || outputUnit);

  return {
    values: {
      convertedValue: converted,
      bitsPerSecond: bps,
      bytesPerSecond: Bps,
      kilobitsPerSec: kbps,
      megabitsPerSec: mbps,
      gigabitsPerSec: gbps,
      kilobytesPerSec: KBps,
      megabytesPerSec: MBps,
      gigabytesPerSec: GBps,
      monthlyTransfer: monthlyBytes,
    },
    formatted: {
      convertedValue: `${smartFormat(converted)} ${UNIT_LABELS[outputUnit] || outputUnit}`,
      bitsPerSecond: `${smartFormat(bps)} bps`,
      bytesPerSecond: `${smartFormat(Bps)} B/s`,
      kilobitsPerSec: `${smartFormat(kbps)} Kbps`,
      megabitsPerSec: `${smartFormat(mbps)} Mbps`,
      gigabitsPerSec: `${smartFormat(gbps)} Gbps`,
      kilobytesPerSec: `${smartFormat(KBps)} KB/s`,
      megabytesPerSec: `${smartFormat(MBps)} MB/s`,
      gigabytesPerSec: `${smartFormat(GBps)} GB/s`,
      monthlyTransfer: formatNum(monthlyBytes),
    },
    summary,
    isValid: true,
  };
}

function calculateWebsiteBandwidth(
  values: Record<string, unknown>,
  f: Record<string, string>
): CalculatorResults {
  const pageViews = values.pageViews as number | null;
  const avgPageSize = values.avgPageSize as number | null;
  const pageSizeUnit = values.pageSizeUnit as string;
  const redundancy = (values.redundancy as number) || 1.5;

  if (pageViews === null || avgPageSize === null || pageViews <= 0 || avgPageSize <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const pageSizeBytes = pageSizeUnit === "MB" ? avgPageSize * 1e6 : avgPageSize * 1e3;
  const monthlyBytes = pageViews * pageSizeBytes;
  const dailyBytes = monthlyBytes / 30;
  const bpsAvg = (monthlyBytes * 8) / (30 * 86400);
  const mbpsAvg = bpsAvg / 1e6;
  const mbpsWithRedundancy = mbpsAvg * redundancy;

  const summary = (f.summaryWebsite || "Your site needs ~{requiredBandwidth} Mbps ({withRedundancy} Mbps with {redundancy}x redundancy).")
    .replace("{requiredBandwidth}", mbpsAvg.toFixed(2))
    .replace("{withRedundancy}", mbpsWithRedundancy.toFixed(2))
    .replace("{redundancy}", redundancy.toString())
    .replace("{pageViews}", pageViews.toLocaleString("en-US"));

  return {
    values: {
      convertedValue: mbpsWithRedundancy,
      monthlyTransfer: monthlyBytes,
      dailyTransfer: dailyBytes,
      requiredBandwidth: mbpsAvg,
      withRedundancy: mbpsWithRedundancy,
      megabitsPerSec: mbpsAvg,
      megabytesPerSec: mbpsAvg / 8,
      gigabitsPerSec: mbpsAvg / 1000,
      kilobitsPerSec: mbpsAvg * 1000,
      kilobytesPerSec: (mbpsAvg * 1000) / 8,
    },
    formatted: {
      convertedValue: `${mbpsWithRedundancy.toFixed(2)} Mbps (with ${redundancy}x)`,
      monthlyTransfer: formatNum(monthlyBytes),
      dailyTransfer: formatNum(dailyBytes),
      requiredBandwidth: `${mbpsAvg.toFixed(2)} Mbps`,
      withRedundancy: `${mbpsWithRedundancy.toFixed(2)} Mbps`,
      megabitsPerSec: `${mbpsAvg.toFixed(4)} Mbps`,
      megabytesPerSec: `${(mbpsAvg / 8).toFixed(4)} MB/s`,
      gigabitsPerSec: `${(mbpsAvg / 1000).toFixed(6)} Gbps`,
      kilobitsPerSec: `${(mbpsAvg * 1000).toFixed(2)} Kbps`,
      kilobytesPerSec: `${((mbpsAvg * 1000) / 8).toFixed(2)} KB/s`,
    },
    summary,
    isValid: true,
  };
}

export default bandwidthConfig;
