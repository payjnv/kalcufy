import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─────────────────────────────────────────────────────────────────────────────
// CIDR Calculator — Supernetting & Range Finder
// ─────────────────────────────────────────────────────────────────────────────

export const cidrConfig: CalculatorConfigV4 = {
  id: "cidr",
  version: "4.0",
  category: "technology",
  icon: "🔢",

  presets: [
    {
      id: "classC",
      icon: "🏠",
      values: { networkAddress: "192.168.1.0", cidr: "24" },
    },
    {
      id: "awsVpc",
      icon: "☁️",
      values: { networkAddress: "10.0.0.0", cidr: "16" },
    },
    {
      id: "smallSubnet",
      icon: "📦",
      values: { networkAddress: "172.16.10.0", cidr: "27" },
    },
    {
      id: "largeBlock",
      icon: "🌍",
      values: { networkAddress: "10.0.0.0", cidr: "8" },
    },
  ],

  t: {
    en: {
      name: "CIDR Calculator",
      slug: "cidr-calculator",
      subtitle: "Convert between CIDR notation and subnet masks, calculate IP ranges, and find the aggregate CIDR block for any IPv4 network.",
      breadcrumb: "CIDR",

      seo: {
        title: "CIDR Calculator - Free CIDR to Subnet Mask Converter",
        description: "Convert CIDR notation to subnet masks and IP ranges instantly. Calculate network address, broadcast, usable hosts, and wildcard mask. Free tool for network planning.",
        shortDescription: "Convert CIDR notation to subnet masks and IP ranges.",
        keywords: [
          "cidr calculator",
          "cidr to subnet mask",
          "cidr notation calculator",
          "subnet to cidr converter",
          "ip range calculator",
          "free cidr calculator",
          "cidr block calculator",
          "network cidr tool",
        ],
      },

      calculator: { yourInformation: "CIDR Input" },
      ui: {
        yourInformation: "CIDR Input",
        calculate: "Calculate",
        reset: "Reset",
        results: "CIDR Details",
      },

      inputs: {
        networkAddress: {
          label: "Network Address",
          helpText: "IPv4 address in dotted decimal (e.g. 192.168.1.0)",
        },
        cidr: {
          label: "CIDR Prefix Length (/)",
          helpText: "Number of network bits (1–32)",
          options: {
            "8": "/8 — 16,777,214 hosts",
            "9": "/9 — 8,388,606 hosts",
            "10": "/10 — 4,194,302 hosts",
            "11": "/11 — 2,097,150 hosts",
            "12": "/12 — 1,048,574 hosts",
            "13": "/13 — 524,286 hosts",
            "14": "/14 — 262,142 hosts",
            "15": "/15 — 131,070 hosts",
            "16": "/16 — 65,534 hosts",
            "17": "/17 — 32,766 hosts",
            "18": "/18 — 16,382 hosts",
            "19": "/19 — 8,190 hosts",
            "20": "/20 — 4,094 hosts",
            "21": "/21 — 2,046 hosts",
            "22": "/22 — 1,022 hosts",
            "23": "/23 — 510 hosts",
            "24": "/24 — 254 hosts",
            "25": "/25 — 126 hosts",
            "26": "/26 — 62 hosts",
            "27": "/27 — 30 hosts",
            "28": "/28 — 14 hosts",
            "29": "/29 — 6 hosts",
            "30": "/30 — 2 hosts",
            "31": "/31 — 2 (point-to-point)",
            "32": "/32 — 1 (single host)",
          },
        },
      },

      results: {
        cidrNotation: { label: "CIDR Notation" },
        networkAddress: { label: "Network Address" },
        broadcastAddress: { label: "Broadcast Address" },
        firstUsable: { label: "First Usable IP" },
        lastUsable: { label: "Last Usable IP" },
        subnetMask: { label: "Subnet Mask" },
        wildcardMask: { label: "Wildcard Mask" },
        totalAddresses: { label: "Total Addresses" },
        usableHosts: { label: "Usable Hosts" },
        ipRange: { label: "Full IP Range" },
        binaryMask: { label: "Binary Subnet Mask" },
        ipType: { label: "IP Type" },
        subnetsAvailable: { label: "Possible /24 Subnets" },
      },

      presets: {
        classC: { label: "Standard /24", description: "192.168.1.0/24 — 254 hosts" },
        awsVpc: { label: "AWS VPC /16", description: "10.0.0.0/16 — 65,534 hosts" },
        smallSubnet: { label: "Small /27", description: "172.16.10.0/27 — 30 hosts" },
        largeBlock: { label: "Enterprise /8", description: "10.0.0.0/8 — 16.7M hosts" },
      },

      values: {
        "hosts": "hosts",
        "host": "host",
        "addresses": "addresses",
        "subnets": "subnets",
        "private": "Private (RFC 1918)",
        "public": "Public",
        "loopback": "Loopback",
        "linkLocal": "Link-Local",
        "multicast": "Multicast",
        "reserved": "Reserved",
      },

      formats: {
        summary: "{cidrNotation} contains {totalAddresses} addresses ({usableHosts} usable). Range: {firstUsable} – {lastUsable}.",
      },

      infoCards: {
        metrics: {
          title: "Network Range",
          items: [
            { label: "CIDR Block", valueKey: "cidrNotation" },
            { label: "Usable Hosts", valueKey: "usableHosts" },
            { label: "First Usable", valueKey: "firstUsable" },
            { label: "Last Usable", valueKey: "lastUsable" },
          ],
        },
        details: {
          title: "Mask & Type",
          items: [
            { label: "Subnet Mask", valueKey: "subnetMask" },
            { label: "Wildcard Mask", valueKey: "wildcardMask" },
            { label: "IP Type", valueKey: "ipType" },
            { label: "/24 Subnets Inside", valueKey: "subnetsAvailable" },
          ],
        },
        tips: {
          title: "CIDR Tips",
          items: [
            "CIDR /24 is the most common — equivalent to the old Class C (255.255.255.0).",
            "Each step up in CIDR prefix halves the network: /23 = 510 hosts, /24 = 254, /25 = 126.",
            "AWS VPCs support /16 to /28. Azure VNets support /8 to /29.",
            "Use CIDR aggregation (supernetting) to combine contiguous blocks and shrink routing tables.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is CIDR?",
          content: "Classless Inter-Domain Routing (CIDR) is an IP addressing scheme that replaced the old classful system (Class A, B, C) in 1993. CIDR uses a variable-length prefix to define network boundaries, written as a slash followed by the number of network bits — for example, 10.0.0.0/16. This flexibility allows ISPs and organizations to allocate exactly the IP address space they need, rather than being forced into fixed class sizes. CIDR also enables route aggregation (supernetting), where multiple contiguous networks are advertised as a single route, dramatically reducing the size of internet routing tables. Without CIDR, the global routing table would be orders of magnitude larger and IPv4 exhaustion would have occurred much earlier.",
        },
        howItWorks: {
          title: "CIDR Notation Explained",
          content: "A CIDR block like 192.168.0.0/22 means the first 22 bits are the network prefix and the remaining 10 bits are for host addresses. The total number of addresses is always 2^(32 − prefix). So /22 gives 2^10 = 1,024 addresses (1,022 usable). The subnet mask equivalent is found by setting the first 22 bits to 1: 11111111.11111111.11111100.00000000 = 255.255.252.0. The wildcard mask (used in ACLs) is the inverse: 0.0.3.255. Every CIDR block has a network address (all host bits zero) and a broadcast address (all host bits one). Usable IPs fall between these two, except for /31 (RFC 3021 point-to-point) and /32 (single host).",
        },
        considerations: {
          title: "CIDR Planning Considerations",
          items: [
            { text: "CIDR blocks must be naturally aligned — a /22 network must start at a multiple of 1,024 addresses.", type: "warning" },
            { text: "Supernetting: two contiguous /24 blocks (e.g. 10.0.0.0/24 and 10.0.1.0/24) can be aggregated into one /23.", type: "info" },
            { text: "Cloud providers reserve additional IPs: AWS reserves 5 per subnet, Azure reserves 5, GCP reserves 4.", type: "warning" },
            { text: "When planning VPCs, use non-overlapping CIDR blocks to avoid conflicts with VPN/peering.", type: "info" },
            { text: "The smallest practical subnet for hosts is /29 (6 usable IPs) — smaller sizes are for links only.", type: "info" },
            { text: "Internet registries (ARIN, RIPE, APNIC) allocate public IP space in CIDR blocks, typically /24 minimum.", type: "info" },
          ],
        },
        categories: {
          title: "CIDR Block Sizes for Cloud & Enterprise",
          items: [
            { text: "AWS VPC: supports /16 to /28 (65,534 to 14 IPs). Default VPC is 172.31.0.0/16.", type: "info" },
            { text: "Azure VNet: supports /8 to /29. Can span up to 16M addresses per VNet.", type: "info" },
            { text: "GCP VPC: supports /8 to /29. Auto-mode subnets use /20 per region.", type: "info" },
            { text: "Docker: default bridge network is 172.17.0.0/16. Custom networks can use any private CIDR.", type: "info" },
            { text: "Kubernetes: pod CIDR is typically /16, service CIDR is /12 or /16.", type: "info" },
            { text: "Home routers: most use 192.168.0.0/24 or 192.168.1.0/24 by default.", type: "info" },
          ],
        },
        examples: {
          title: "CIDR Calculation Examples",
          description: "Step-by-step CIDR conversions",
          examples: [
            {
              title: "CIDR /22 — Medium Network",
              steps: [
                "Input: 10.10.0.0/22",
                "Prefix bits: 22 → Host bits: 32 − 22 = 10",
                "Total addresses: 2¹⁰ = 1,024",
                "Usable hosts: 1,024 − 2 = 1,022",
                "Subnet mask: 255.255.252.0 (binary: 11111111.11111111.11111100.00000000)",
                "Range: 10.10.0.1 – 10.10.3.254 | Broadcast: 10.10.3.255",
              ],
              result: "10.10.0.0/22 contains 1,022 usable hosts across 4 contiguous /24 blocks.",
            },
            {
              title: "CIDR /28 — Small Server Subnet",
              steps: [
                "Input: 172.16.5.0/28",
                "Prefix bits: 28 → Host bits: 32 − 28 = 4",
                "Total addresses: 2⁴ = 16",
                "Usable hosts: 16 − 2 = 14",
                "Subnet mask: 255.255.255.240 | Wildcard: 0.0.0.15",
                "Range: 172.16.5.1 – 172.16.5.14 | Broadcast: 172.16.5.15",
              ],
              result: "172.16.5.0/28 supports 14 hosts — perfect for a small server VLAN.",
            },
          ],
        },
      },

      faqs: [
        { question: "What does CIDR notation mean?", answer: "CIDR notation combines an IP address with a prefix length separated by a slash. For example, 192.168.1.0/24 means the first 24 of 32 bits identify the network, leaving 8 bits (256 addresses) for hosts. The prefix length replaces the older subnet mask notation — /24 equals 255.255.255.0. Larger prefix numbers mean smaller networks: /28 has 16 addresses while /16 has 65,536." },
        { question: "How do I convert a subnet mask to CIDR notation?", answer: "Count the number of consecutive 1-bits in the binary subnet mask. For 255.255.255.0: binary is 11111111.11111111.11111111.00000000 — that's 24 ones, so it's /24. For 255.255.255.192: binary is ...11000000 — 26 ones = /26. A quick shortcut: subtract the last non-255 octet from 256 and find the power of 2. Example: 255.255.255.240 → 256 − 240 = 16 = 2⁴ → 32 − 4 = /28." },
        { question: "What is the difference between CIDR and VLSM?", answer: "CIDR (Classless Inter-Domain Routing) is the addressing system that allows variable-length network prefixes. VLSM (Variable Length Subnet Masking) is the technique of using CIDR within a single network to create subnets of different sizes. CIDR is the notation and allocation system; VLSM is the design practice of applying different prefix lengths to different subnets within the same address space." },
        { question: "Can I combine two CIDR blocks into one?", answer: "Yes, this is called supernetting or route aggregation. Two contiguous blocks of the same size can be combined by reducing the prefix by 1. For example, 10.0.0.0/24 and 10.0.1.0/24 become 10.0.0.0/23. The blocks must be contiguous and properly aligned — you cannot aggregate 10.0.1.0/24 and 10.0.3.0/24 because 10.0.2.0/24 sits between them." },
        { question: "How many IPs does AWS reserve in each subnet?", answer: "AWS reserves 5 IP addresses in each VPC subnet: the network address, the VPC router (network + 1), the DNS server (network + 2), a future-use address (network + 3), and the broadcast address. So a /24 subnet in AWS has 251 usable IPs instead of 254. Azure also reserves 5 per subnet. GCP reserves 4 (network, gateway, second-to-last, and broadcast)." },
        { question: "What is the smallest CIDR block I can advertise on the internet?", answer: "Most internet registries (ARIN, RIPE, APNIC) and transit providers accept /24 as the smallest routable prefix on the public internet. Blocks smaller than /24 are typically filtered and won't be propagated by BGP routers. Some providers accept /25 in specific peering arrangements, but /24 is the practical minimum for guaranteed global reachability." },
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
    },
  },

  inputs: [
    {
      id: "networkAddress",
      type: "text",
      defaultValue: null,
      placeholder: "192.168.1.0",
    },
    {
      id: "cidr",
      type: "select",
      defaultValue: "24",
    },
  ],
  inputGroups: [],

  results: [
    { id: "cidrNotation", type: "primary", format: "text" },
    { id: "networkAddress", type: "secondary", format: "text" },
    { id: "broadcastAddress", type: "secondary", format: "text" },
    { id: "subnetMask", type: "secondary", format: "text" },
    { id: "wildcardMask", type: "secondary", format: "text" },
    { id: "usableHosts", type: "secondary", format: "text" },
    { id: "ipRange", type: "secondary", format: "text" },
    { id: "totalAddresses", type: "secondary", format: "text" },
    { id: "ipType", type: "secondary", format: "text" },
    { id: "binaryMask", type: "secondary", format: "text" },
    { id: "subnetsAvailable", type: "secondary", format: "text" },
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
    { id: "categories", type: "list", icon: "☁️", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "Fuller, V. & Li, T.",
      year: "2006",
      title: "Classless Inter-Domain Routing (CIDR): The Internet Address Assignment and Aggregation Plan",
      source: "IETF RFC 4632",
      url: "https://datatracker.ietf.org/doc/html/rfc4632",
    },
    {
      authors: "Amazon Web Services",
      year: "2025",
      title: "VPC CIDR Blocks — Amazon Virtual Private Cloud User Guide",
      source: "AWS Documentation",
      url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html",
    },
  ],

  hero: { showRating: true, showShare: true },
  sidebar: { showAds: true, showRelated: true },
  features: { save: true, pdf: true, csv: true, excel: true },
  relatedCalculators: ["ip-subnet", "bandwidth", "transfer-time", "vlsm"],
  ads: { sidebar: true, footer: true },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function parseIpv4(ip: string): number[] | null {
  const trimmed = ip.trim();
  const parts = trimmed.split(".");
  if (parts.length !== 4) return null;
  const octets = parts.map((p) => parseInt(p, 10));
  if (octets.some((o) => isNaN(o) || o < 0 || o > 255)) return null;
  return octets;
}

function ipToInt(o1: number, o2: number, o3: number, o4: number): number {
  return ((o1 << 24) | (o2 << 16) | (o3 << 8) | o4) >>> 0;
}

function intToIp(num: number): string {
  return `${(num >>> 24) & 255}.${(num >>> 16) & 255}.${(num >>> 8) & 255}.${num & 255}`;
}

function intToBinary(num: number): string {
  return [
    ((num >>> 24) & 255).toString(2).padStart(8, "0"),
    ((num >>> 16) & 255).toString(2).padStart(8, "0"),
    ((num >>> 8) & 255).toString(2).padStart(8, "0"),
    (num & 255).toString(2).padStart(8, "0"),
  ].join(".");
}

function cidrToMask(cidr: number): number {
  if (cidr === 0) return 0;
  return (~0 << (32 - cidr)) >>> 0;
}

function getIpType(o1: number, o2: number): string {
  if (o1 === 10) return "private";
  if (o1 === 172 && o2 >= 16 && o2 <= 31) return "private";
  if (o1 === 192 && o2 === 168) return "private";
  if (o1 === 127) return "loopback";
  if (o1 === 169 && o2 === 254) return "linkLocal";
  if (o1 >= 224 && o1 <= 239) return "multicast";
  if (o1 >= 240) return "reserved";
  return "public";
}

function formatNum(n: number): string {
  return n.toLocaleString("en-US");
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATE
// ─────────────────────────────────────────────────────────────────────────────

export function calculateCidr(data: {
  values: Record<string, unknown>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const networkInput = values.networkAddress as string | null;
  const cidrStr = values.cidr as string;
  const cidr = parseInt(cidrStr, 10);

  if (!networkInput || networkInput.trim() === "") {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const octets = parseIpv4(networkInput);
  if (!octets) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const [o1, o2, o3, o4] = octets;
  const ipInt = ipToInt(o1, o2, o3, o4);
  const maskInt = cidrToMask(cidr);
  const wildcardInt = (~maskInt) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;

  const totalAddresses = Math.pow(2, 32 - cidr);
  let usableHosts: number;
  let firstHostInt: number;
  let lastHostInt: number;

  if (cidr === 32) {
    usableHosts = 1;
    firstHostInt = networkInt;
    lastHostInt = networkInt;
  } else if (cidr === 31) {
    usableHosts = 2;
    firstHostInt = networkInt;
    lastHostInt = broadcastInt;
  } else {
    usableHosts = totalAddresses - 2;
    firstHostInt = networkInt + 1;
    lastHostInt = broadcastInt - 1;
  }

  const networkAddress = intToIp(networkInt);
  const broadcastAddress = intToIp(broadcastInt);
  const subnetMask = intToIp(maskInt);
  const wildcardMask = intToIp(wildcardInt);
  const firstUsable = intToIp(firstHostInt);
  const lastUsable = intToIp(lastHostInt);
  const cidrNotation = `${networkAddress}/${cidr}`;
  const ipRange = `${firstUsable} – ${lastUsable}`;
  const binaryMask = intToBinary(maskInt);

  const ipTypeKey = getIpType(o1, o2);
  const ipTypeLabel = v[ipTypeKey] || ipTypeKey;

  const subnets24 = cidr <= 24 ? Math.pow(2, 24 - cidr) : 0;

  const hostsLabel = usableHosts === 1 ? (v["host"] || "host") : (v["hosts"] || "hosts");

  const summary = (f.summary || "{cidrNotation} contains {totalAddresses} addresses ({usableHosts} usable).")
    .replace("{cidrNotation}", cidrNotation)
    .replace("{totalAddresses}", formatNum(totalAddresses))
    .replace("{usableHosts}", formatNum(usableHosts))
    .replace("{firstUsable}", firstUsable)
    .replace("{lastUsable}", lastUsable);

  return {
    values: {
      cidrNotation,
      networkAddress,
      broadcastAddress,
      firstUsable,
      lastUsable,
      subnetMask,
      wildcardMask,
      totalAddresses,
      usableHosts,
      ipRange,
      binaryMask,
      ipType: ipTypeLabel,
      subnetsAvailable: subnets24,
    },
    formatted: {
      cidrNotation,
      networkAddress,
      broadcastAddress,
      firstUsable,
      lastUsable,
      subnetMask,
      wildcardMask,
      totalAddresses: formatNum(totalAddresses),
      usableHosts: `${formatNum(usableHosts)} ${hostsLabel}`,
      ipRange,
      binaryMask,
      ipType: ipTypeLabel,
      subnetsAvailable: subnets24 > 0 ? `${formatNum(subnets24)} ${v["subnets"] || "subnets"}` : "N/A (smaller than /24)",
    },
    summary,
    isValid: true,
  };
}

export default cidrConfig;
