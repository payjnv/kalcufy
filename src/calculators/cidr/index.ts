import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─────────────────────────────────────────────────────────────────────────────
// CIDR Calculator V4.3 — Supernetting, Cloud IPs, Reverse Mode
// Features: CIDR→Range, Range→CIDR (reverse), cloud provider reserved IPs,
//           supernet detection, adjacent blocks, IP class, hex IP,
//           chart visualization, CIDR reference table
// ─────────────────────────────────────────────────────────────────────────────

export const cidrConfig: CalculatorConfigV4 = {
  id: "cidr",
  version: "4.3",
  category: "technology",
  icon: "🔢",

  presets: [
    {
      id: "classC",
      icon: "🏠",
      values: { mode: "cidr", networkAddress: "192.168.1.0", cidr: "24", cloudProvider: "standard", startIp: "", endIp: "" },
    },
    {
      id: "awsVpc",
      icon: "☁️",
      values: { mode: "cidr", networkAddress: "10.0.0.0", cidr: "16", cloudProvider: "aws", startIp: "", endIp: "" },
    },
    {
      id: "smallSubnet",
      icon: "📦",
      values: { mode: "cidr", networkAddress: "172.16.10.0", cidr: "27", cloudProvider: "standard", startIp: "", endIp: "" },
    },
    {
      id: "largeBlock",
      icon: "🌍",
      values: { mode: "cidr", networkAddress: "10.0.0.0", cidr: "8", cloudProvider: "standard", startIp: "", endIp: "" },
    },
  ],

  t: {
    en: {
      name: "CIDR Calculator",
      slug: "cidr-calculator",
      subtitle: "Convert between CIDR notation, subnet masks, and IP ranges. Calculate network details with cloud provider support, supernet detection, and reverse IP-to-CIDR conversion.",
      breadcrumb: "CIDR",

      seo: {
        title: "CIDR Calculator - Free CIDR to Subnet Mask & IP Range Converter",
        description: "Convert CIDR notation to subnet masks and IP ranges instantly. Supports AWS, Azure, GCP reserved IPs, reverse IP-to-CIDR conversion, and supernet detection. Free multilingual tool.",
        shortDescription: "Convert CIDR notation to subnet masks and IP ranges.",
        keywords: [
          "cidr calculator",
          "cidr to subnet mask",
          "cidr notation calculator",
          "subnet to cidr converter",
          "ip range to cidr",
          "cidr block calculator",
          "aws vpc cidr",
          "free cidr calculator",
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
        mode: {
          label: "Calculation Mode",
          helpText: "CIDR → IP range, or reverse: IP range → CIDR notation",
          options: {
            cidr: "CIDR → IP Range",
            reverse: "IP Range → CIDR",
          },
        },
        networkAddress: {
          label: "Network Address",
          helpText: "IPv4 address in dotted decimal (e.g. 192.168.1.0)",
        },
        cidr: {
          label: "CIDR Prefix Length (/)",
          helpText: "Number of network bits (1–32)",
          options: {
            "8": "/8 — 255.0.0.0 (16.7M hosts)",
            "9": "/9 — 255.128.0.0 (8.3M hosts)",
            "10": "/10 — 255.192.0.0 (4.1M hosts)",
            "11": "/11 — 255.224.0.0 (2M hosts)",
            "12": "/12 — 255.240.0.0 (1M hosts)",
            "13": "/13 — 255.248.0.0 (524K hosts)",
            "14": "/14 — 255.252.0.0 (262K hosts)",
            "15": "/15 — 255.254.0.0 (131K hosts)",
            "16": "/16 — 255.255.0.0 (65,534 hosts)",
            "17": "/17 — 255.255.128.0 (32,766 hosts)",
            "18": "/18 — 255.255.192.0 (16,382 hosts)",
            "19": "/19 — 255.255.224.0 (8,190 hosts)",
            "20": "/20 — 255.255.240.0 (4,094 hosts)",
            "21": "/21 — 255.255.248.0 (2,046 hosts)",
            "22": "/22 — 255.255.252.0 (1,022 hosts)",
            "23": "/23 — 255.255.254.0 (510 hosts)",
            "24": "/24 — 255.255.255.0 (254 hosts)",
            "25": "/25 — 255.255.255.128 (126 hosts)",
            "26": "/26 — 255.255.255.192 (62 hosts)",
            "27": "/27 — 255.255.255.224 (30 hosts)",
            "28": "/28 — 255.255.255.240 (14 hosts)",
            "29": "/29 — 255.255.255.248 (6 hosts)",
            "30": "/30 — 255.255.255.252 (2 hosts)",
            "31": "/31 — 255.255.255.254 (point-to-point)",
            "32": "/32 — 255.255.255.255 (single host)",
          },
        },
        cloudProvider: {
          label: "Cloud Provider",
          helpText: "Cloud providers reserve extra IPs per subnet — affects usable host count",
          options: {
            standard: "Standard Network",
            aws: "AWS VPC (−5 IPs)",
            azure: "Azure VNet (−5 IPs)",
            gcp: "Google Cloud VPC (−4 IPs)",
          },
        },
        startIp: {
          label: "Start IP Address",
          helpText: "First IP address in the range (e.g. 192.168.1.0)",
        },
        endIp: {
          label: "End IP Address",
          helpText: "Last IP address in the range (e.g. 192.168.1.255)",
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
        ipClass: { label: "IP Class" },
        ipType: { label: "IP Type" },
        networkBits: { label: "Network Bits" },
        hostBits: { label: "Host Bits" },
        subnetsAvailable: { label: "/24 Subnets Inside" },
        reservedIps: { label: "Reserved IPs" },
        nextBlock: { label: "Next CIDR Block" },
        previousBlock: { label: "Previous CIDR Block" },
        // Reverse mode
        reverseCidrs: { label: "CIDR Blocks" },
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
        "bits": "bits",
        "private": "Private (RFC 1918)",
        "public": "Public",
        "loopback": "Loopback (127.x.x.x)",
        "linkLocal": "Link-Local (169.254.x.x)",
        "multicast": "Multicast (224–239)",
        "reserved": "Reserved",
        "classA": "Class A (1–126)",
        "classB": "Class B (128–191)",
        "classC": "Class C (192–223)",
        "classD": "Class D (Multicast)",
        "classE": "Class E (Reserved)",
      },

      formats: {
        summary: "{cidrNotation} — Network: {networkAddress}, Broadcast: {broadcastAddress}, Usable: {usableHosts} ({firstUsable} – {lastUsable}).",
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
          title: "Technical Details",
          items: [
            { label: "Binary Mask", valueKey: "binaryMask" },
            { label: "Hex IP", valueKey: "hexIp" },
            { label: "Full IP Range", valueKey: "ipRange" },
            { label: "Supernet Info", valueKey: "supernetInfo" },
          ],
        },
        tips: {
          title: "CIDR Tips",
          items: [
            "CIDR /24 is the most common — equivalent to the old Class C (255.255.255.0, 254 usable hosts).",
            "Each step up in prefix halves the network: /23 = 510, /24 = 254, /25 = 126 hosts.",
            "AWS/Azure reserve 5 IPs per subnet, GCP reserves 4 — use cloud mode for accurate counts.",
            "Use the reverse mode (IP Range → CIDR) to find the minimum CIDR blocks covering any IP range.",
          ],
        },
      },

      chart: {
        title: "Address Allocation",
        tabs: {
          "address-breakdown": "Address Breakdown",
        },
      },

      education: {
        whatIs: {
          title: "What Is CIDR?",
          content: "Classless Inter-Domain Routing (CIDR) is an IP addressing scheme that replaced the old classful system (Class A, B, C) in 1993. CIDR uses a variable-length prefix to define network boundaries, written as a slash followed by the number of network bits — for example, 10.0.0.0/16. This flexibility allows ISPs and organizations to allocate exactly the IP address space they need, rather than being forced into fixed class sizes. CIDR also enables route aggregation (supernetting), where multiple contiguous networks are advertised as a single route, dramatically reducing the size of internet routing tables. Without CIDR, the global routing table would be orders of magnitude larger and IPv4 exhaustion would have occurred much earlier.",
        },
        howItWorks: {
          title: "CIDR Notation Explained",
          content: "A CIDR block like 192.168.0.0/22 means the first 22 bits are the network prefix and the remaining 10 bits are for host addresses. The total number of addresses is always 2^(32 − prefix). So /22 gives 2^10 = 1,024 addresses (1,022 usable). The subnet mask equivalent is found by setting the first 22 bits to 1: 11111111.11111111.11111100.00000000 = 255.255.252.0. The wildcard mask (used in ACLs and firewall rules) is the bitwise inverse: 0.0.3.255. Every CIDR block has a network address (all host bits zero) and a broadcast address (all host bits one). Usable IPs fall between these two, except for /31 (RFC 3021 point-to-point) and /32 (single host route).",
        },
        considerations: {
          title: "CIDR Planning Considerations",
          items: [
            { text: "CIDR blocks must be naturally aligned — a /22 network must start at a multiple of 1,024 addresses (host bits all zero).", type: "warning" },
            { text: "Supernetting: two contiguous /24 blocks can be aggregated into one /23, but only if the first block starts at an even boundary.", type: "info" },
            { text: "Cloud providers reserve extra IPs: AWS and Azure reserve 5 per subnet (.0, .1, .2, .3, broadcast), GCP reserves 4.", type: "warning" },
            { text: "When planning VPCs, use non-overlapping CIDR blocks to avoid conflicts with VPN, peering, or hybrid cloud setups.", type: "info" },
            { text: "The smallest practical subnet for hosts is /29 (6 usable IPs after reservations) — smaller sizes are for point-to-point links only.", type: "info" },
            { text: "Internet registries (ARIN, RIPE, APNIC) require /24 minimum for globally routable BGP announcements.", type: "info" },
          ],
        },
        categories: {
          title: "CIDR Block Sizes for Cloud & Enterprise",
          items: [
            { text: "AWS VPC: supports /16 to /28 (65,534 to 14 IPs). Default VPC is 172.31.0.0/16. Reserves .0 (network), .1 (router), .2 (DNS), .3 (future), broadcast.", type: "info" },
            { text: "Azure VNet: supports /8 to /29. Reserves .0 (network), .1 (gateway), .2 (DNS primary), .3 (DNS secondary), broadcast.", type: "info" },
            { text: "GCP VPC: supports /8 to /29. Auto-mode subnets use /20 per region. Reserves .0 (network), .1 (gateway), broadcast, DHCP.", type: "info" },
            { text: "Docker: default bridge network is 172.17.0.0/16. Custom networks can use any private CIDR. Overlay networks span multiple hosts.", type: "info" },
            { text: "Kubernetes: pod CIDR is typically /16, service CIDR is /12 or /16. Each node gets a /24 slice for pods by default.", type: "info" },
            { text: "Home routers: most use 192.168.0.0/24 or 192.168.1.0/24. Enterprise routers often use 10.x.x.x/8 for large internal networks.", type: "info" },
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
                "Usable hosts: 1,024 − 2 = 1,022 (standard) | 1,019 (AWS)",
                "Subnet mask: 255.255.252.0",
                "Range: 10.10.0.1 – 10.10.3.254 | Broadcast: 10.10.3.255",
              ],
              result: "10.10.0.0/22 contains 1,022 usable hosts across 4 contiguous /24 blocks.",
            },
            {
              title: "IP Range → CIDR (Reverse)",
              steps: [
                "Input: Start 192.168.1.0, End 192.168.1.255",
                "Range spans 256 addresses (2⁸)",
                "256 = 2⁸ → prefix = 32 − 8 = /24",
                "Start address 192.168.1.0 is aligned to /24 boundary",
                "Result: 192.168.1.0/24 (single block covers entire range)",
                "If range was 192.168.1.0 – 192.168.2.127: needs /24 + /25",
              ],
              result: "The reverse calculator finds the minimum set of CIDR blocks to cover any IP range.",
            },
          ],
        },
      },

      faqs: {
        "0": { question: "What does CIDR notation mean?", answer: "CIDR notation combines an IP address with a prefix length separated by a slash. For example, 192.168.1.0/24 means the first 24 of 32 bits identify the network, leaving 8 bits (256 addresses) for hosts. The prefix length replaces the older subnet mask notation — /24 equals 255.255.255.0. Larger prefix numbers mean smaller networks: /28 has 16 addresses while /16 has 65,536." },
        "1": { question: "How do I convert a subnet mask to CIDR?", answer: "Count the number of consecutive 1-bits in the binary subnet mask. For 255.255.255.0: binary is 11111111.11111111.11111111.00000000 — that's 24 ones, so it's /24. A quick shortcut: subtract the last non-255 octet from 256 and find the power of 2. Example: 255.255.255.240 → 256 − 240 = 16 = 2⁴ → 32 − 4 = /28." },
        "2": { question: "What is the difference between CIDR and VLSM?", answer: "CIDR (Classless Inter-Domain Routing) is the addressing system that allows variable-length network prefixes for route aggregation. VLSM (Variable Length Subnet Masking) is the technique of using different-sized subnets within a single network. CIDR is the notation and allocation system used by ISPs; VLSM is the design practice applied within organizations." },
        "3": { question: "Can I combine two CIDR blocks into one?", answer: "Yes, this is called supernetting or route aggregation. Two contiguous blocks of the same size can be combined by reducing the prefix by 1. For example, 10.0.0.0/24 and 10.0.1.0/24 become 10.0.0.0/23. The blocks must be contiguous and the first block must be naturally aligned — you cannot aggregate 10.0.1.0/24 and 10.0.2.0/24 into a /23 because 10.0.1.0 is not aligned to a /23 boundary." },
        "4": { question: "How many IPs does each cloud provider reserve?", answer: "AWS reserves 5 IPs per subnet: network address (.0), VPC router (.1), DNS server (.2), future use (.3), and broadcast. Azure also reserves 5: network (.0), default gateway (.1), DNS primary (.2), DNS secondary (.3), and broadcast. GCP reserves 4: network (.0), default gateway (.1), second-to-last, and broadcast. So a /24 gives 251 usable IPs on AWS/Azure, 252 on GCP, vs 254 standard." },
        "5": { question: "What is the smallest routable CIDR block on the internet?", answer: "Most internet registries (ARIN, RIPE, APNIC) and transit providers accept /24 as the smallest routable prefix. Blocks smaller than /24 are typically filtered by BGP routers and won't propagate globally. Some providers accept /25 in specific peering arrangements, but /24 is the practical minimum for guaranteed global reachability." },
      },

      detailedTable: {
        cidrReference: {
          button: "View All CIDR Sizes",
          title: "Complete CIDR Reference Table",
          columns: {
            cidr: "CIDR",
            mask: "Subnet Mask",
            addresses: "Total IPs",
            usable: "Usable (Std)",
            usableAws: "Usable (AWS)",
          },
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
      id: "mode",
      type: "select",
      defaultValue: "cidr",
      options: [
        { value: "cidr" },
        { value: "reverse" },
      ],
    },
    // ── CIDR mode inputs ────────────────────────────────────────────────
    {
      id: "networkAddress",
      type: "text",
      defaultValue: null,
      placeholder: "192.168.1.0",
      showWhen: { field: "mode", value: "cidr" },
    },
    {
      id: "cidr",
      type: "select",
      defaultValue: "24",
      options: [
        { value: "8" }, { value: "9" }, { value: "10" }, { value: "11" },
        { value: "12" }, { value: "13" }, { value: "14" }, { value: "15" },
        { value: "16" }, { value: "17" }, { value: "18" }, { value: "19" },
        { value: "20" }, { value: "21" }, { value: "22" }, { value: "23" },
        { value: "24" }, { value: "25" }, { value: "26" }, { value: "27" },
        { value: "28" }, { value: "29" }, { value: "30" }, { value: "31" },
        { value: "32" },
      ],
      showWhen: { field: "mode", value: "cidr" },
    },
    {
      id: "cloudProvider",
      type: "select",
      defaultValue: "standard",
      options: [
        { value: "standard" },
        { value: "aws" },
        { value: "azure" },
        { value: "gcp" },
      ],
      showWhen: { field: "mode", value: "cidr" },
    },
    // ── Reverse mode inputs ─────────────────────────────────────────────
    {
      id: "startIp",
      type: "text",
      defaultValue: null,
      placeholder: "192.168.1.0",
      showWhen: { field: "mode", value: "reverse" },
    },
    {
      id: "endIp",
      type: "text",
      defaultValue: null,
      placeholder: "192.168.1.255",
      showWhen: { field: "mode", value: "reverse" },
    },
  ],
  inputGroups: [],

  results: [
    { id: "cidrNotation", type: "primary", format: "text" },
    { id: "networkAddress", type: "secondary", format: "text" },
    { id: "broadcastAddress", type: "secondary", format: "text" },
    { id: "firstUsable", type: "secondary", format: "text" },
    { id: "lastUsable", type: "secondary", format: "text" },
    { id: "subnetMask", type: "secondary", format: "text" },
    { id: "wildcardMask", type: "secondary", format: "text" },
    { id: "totalAddresses", type: "secondary", format: "text" },
    { id: "usableHosts", type: "secondary", format: "text" },
    { id: "ipClass", type: "secondary", format: "text" },
    { id: "ipType", type: "secondary", format: "text" },
    { id: "networkBits", type: "secondary", format: "text" },
    { id: "hostBits", type: "secondary", format: "text" },
    { id: "subnetsAvailable", type: "secondary", format: "text" },
    { id: "reservedIps", type: "secondary", format: "text" },
    { id: "nextBlock", type: "secondary", format: "text" },
    { id: "previousBlock", type: "secondary", format: "text" },
    // Reverse mode result
    { id: "reverseCidrs", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "🎯", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  detailedTable: {
    id: "cidrReference",
    buttonLabel: "View All CIDR Sizes",
    buttonIcon: "📋",
    modalTitle: "Complete CIDR Reference Table",
    columns: [
      { id: "cidr", label: "CIDR", align: "center" },
      { id: "mask", label: "Subnet Mask", align: "left" },
      { id: "addresses", label: "Total IPs", align: "right" },
      { id: "usable", label: "Usable (Std)", align: "right" },
      { id: "usableAws", label: "Usable (AWS)", align: "right", highlight: true },
    ],
  },

  chart: {
    title: "Address Allocation",
    xKey: "name",
    type: "bar",
    stacked: false,
    series: [
      { key: "value", color: "#3B82F6" },
    ],
  },

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
  if (!ip || !ip.trim()) return null;
  const parts = ip.trim().split(".");
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

function intToHex(num: number): string {
  return [
    ((num >>> 24) & 255).toString(16).padStart(2, "0").toUpperCase(),
    ((num >>> 16) & 255).toString(16).padStart(2, "0").toUpperCase(),
    ((num >>> 8) & 255).toString(16).padStart(2, "0").toUpperCase(),
    (num & 255).toString(16).padStart(2, "0").toUpperCase(),
  ].join(":");
}

function cidrToMask(cidr: number): number {
  if (cidr === 0) return 0;
  return (~0 << (32 - cidr)) >>> 0;
}

function getIpClass(o1: number): string {
  if (o1 <= 126) return "classA";
  if (o1 >= 128 && o1 <= 191) return "classB";
  if (o1 >= 192 && o1 <= 223) return "classC";
  if (o1 >= 224 && o1 <= 239) return "classD";
  return "classE";
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

function getReservedCount(provider: string, cidr: number): number {
  if (cidr >= 31) return 0; // /31 and /32 have special handling
  if (provider === "aws" || provider === "azure") return 5;
  if (provider === "gcp") return 4;
  return 2; // network + broadcast
}

function getReservedLabel(provider: string): string {
  if (provider === "aws") return "5 IPs (.0, .1, .2, .3, bcast)";
  if (provider === "azure") return "5 IPs (.0, .1, .2, .3, bcast)";
  if (provider === "gcp") return "4 IPs (.0, .1, bcast, DHCP)";
  return "2 IPs (.0 network, broadcast)";
}

function formatNum(n: number): string {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  return n.toLocaleString("en-US");
}

// Reverse: find minimum CIDR blocks to cover an IP range
function rangeToCidrs(startInt: number, endInt: number): string[] {
  const cidrs: string[] = [];
  let current = startInt;

  while (current <= endInt) {
    // Find the largest block starting at 'current' that fits within range
    let maxBits = 32;

    for (let bits = 32; bits >= 0; bits--) {
      const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
      const blockStart = (current & mask) >>> 0;
      const blockEnd = (blockStart | (~mask >>> 0)) >>> 0;

      if (blockStart === current && blockEnd <= endInt) {
        maxBits = bits;
      } else if (blockStart === current && blockEnd > endInt) {
        break;
      }
    }

    cidrs.push(`${intToIp(current)}/${maxBits}`);
    const blockSize = Math.pow(2, 32 - maxBits);
    current = (current + blockSize) >>> 0;

    if (cidrs.length > 32) break; // Safety limit
  }

  return cidrs;
}

// Supernet: can this block + adjacent be merged?
function getSupernetInfo(networkInt: number, cidr: number): string {
  if (cidr <= 1) return "Already the largest possible block";
  const parentCidr = cidr - 1;
  const parentMask = cidrToMask(parentCidr);
  const parentNetwork = (networkInt & parentMask) >>> 0;
  const siblingNetwork = parentNetwork === networkInt
    ? (networkInt + Math.pow(2, 32 - cidr)) >>> 0
    : parentNetwork;
  return `Mergeable with ${intToIp(siblingNetwork)}/${cidr} → ${intToIp(parentNetwork)}/${parentCidr}`;
}

// Generate CIDR reference table data
function generateReferenceTable(): Array<Record<string, string>> {
  const rows: Array<Record<string, string>> = [];
  for (let c = 8; c <= 32; c++) {
    const total = Math.pow(2, 32 - c);
    const usableStd = c >= 31 ? (c === 32 ? 1 : 2) : total - 2;
    const usableAws = c >= 31 ? (c === 32 ? 1 : 2) : Math.max(0, total - 5);
    rows.push({
      cidr: `/${c}`,
      mask: intToIp(cidrToMask(c)),
      addresses: formatNum(total),
      usable: formatNum(usableStd),
      usableAws: formatNum(usableAws),
    });
  }
  return rows;
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

  const mode = (values.mode as string) || "cidr";

  // ── REVERSE MODE: IP Range → CIDR ───────────────────────────────────
  if (mode === "reverse") {
    const startOctets = parseIpv4(values.startIp as string);
    const endOctets = parseIpv4(values.endIp as string);

    if (!startOctets || !endOctets) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const startInt = ipToInt(startOctets[0], startOctets[1], startOctets[2], startOctets[3]);
    const endInt = ipToInt(endOctets[0], endOctets[1], endOctets[2], endOctets[3]);

    if (startInt > endInt) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const cidrs = rangeToCidrs(startInt, endInt);
    const totalAddresses = endInt - startInt + 1;
    const reverseCidrsStr = cidrs.join(", ");

    return {
      values: {
        cidrNotation: cidrs[0] || "",
        reverseCidrs: reverseCidrsStr,
        totalAddresses,
        networkAddress: intToIp(startInt),
        broadcastAddress: intToIp(endInt),
      },
      formatted: {
        cidrNotation: cidrs.length === 1 ? cidrs[0] : `${cidrs.length} blocks`,
        reverseCidrs: reverseCidrsStr,
        totalAddresses: `${formatNum(totalAddresses)} addresses`,
        networkAddress: intToIp(startInt),
        broadcastAddress: intToIp(endInt),
      },
      summary: `IP range ${intToIp(startInt)} – ${intToIp(endInt)} = ${cidrs.length} CIDR block(s): ${reverseCidrsStr}. Total: ${formatNum(totalAddresses)} addresses.`,
      isValid: true,
      metadata: {
        tableData: generateReferenceTable(),
      },
    };
  }

  // ── CIDR MODE: Standard calculation ─────────────────────────────────
  const networkInput = values.networkAddress as string | null;
  const cidrStr = values.cidr as string;
  const cidr = parseInt(cidrStr, 10);
  const cloudProvider = (values.cloudProvider as string) || "standard";

  if (!networkInput || !networkInput.trim()) {
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
  const reservedCount = getReservedCount(cloudProvider, cidr);

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
    usableHosts = totalAddresses - reservedCount;
    // Cloud providers reserve extra IPs at the beginning
    if (cloudProvider === "aws" || cloudProvider === "azure") {
      firstHostInt = networkInt + 4; // .0-.3 reserved, first usable is .4
      lastHostInt = broadcastInt - 1;
    } else if (cloudProvider === "gcp") {
      firstHostInt = networkInt + 2; // .0-.1 reserved
      lastHostInt = broadcastInt - 2; // broadcast and DHCP reserved
    } else {
      firstHostInt = networkInt + 1;
      lastHostInt = broadcastInt - 1;
    }
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
  const hexIp = intToHex(ipInt);

  const ipClassKey = getIpClass(o1);
  const ipClassLabel = v[ipClassKey] || ipClassKey;
  const ipTypeKey = getIpType(o1, o2);
  const ipTypeLabel = v[ipTypeKey] || ipTypeKey;

  const subnets24 = cidr <= 24 ? Math.pow(2, 24 - cidr) : 0;
  const networkBits = cidr;
  const hostBits = 32 - cidr;

  // Adjacent blocks
  const nextBlockInt = (broadcastInt + 1) >>> 0;
  const prevBlockInt = (networkInt - totalAddresses) >>> 0;
  const nextBlock = nextBlockInt > 0 ? `${intToIp(nextBlockInt)}/${cidr}` : "N/A";
  const previousBlock = networkInt > 0 ? `${intToIp(prevBlockInt)}/${cidr}` : "N/A";

  // Supernet info
  const supernetInfo = getSupernetInfo(networkInt, cidr);

  // Reserved IPs label
  const reservedIps = getReservedLabel(cloudProvider);

  const hostsLabel = usableHosts === 1 ? (v["host"] || "host") : (v["hosts"] || "hosts");
  const bitsLabel = v["bits"] || "bits";

  // ── Chart data ─────────────────────────────────────────────────────
  const chartData = cidr < 31
    ? [
        { name: "Reserved", value: reservedCount },
        { name: "Usable Hosts", value: usableHosts },
      ]
    : [
        { name: "Addresses", value: totalAddresses },
      ];

  // ── Reference table ────────────────────────────────────────────────
  const tableData = generateReferenceTable();

  // ── Summary ────────────────────────────────────────────────────────
  const summary = (f.summary || "{cidrNotation} — Usable: {usableHosts} ({firstUsable} – {lastUsable}).")
    .replace("{cidrNotation}", cidrNotation)
    .replace("{networkAddress}", networkAddress)
    .replace("{broadcastAddress}", broadcastAddress)
    .replace("{totalAddresses}", formatNum(totalAddresses))
    .replace("{usableHosts}", `${formatNum(usableHosts)} ${hostsLabel}`)
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
      ipClass: ipClassLabel,
      ipType: ipTypeLabel,
      networkBits,
      hostBits,
      subnetsAvailable: subnets24,
      reservedIps,
      nextBlock,
      previousBlock,
      // Hidden values for infoCards
      binaryMask,
      hexIp,
      ipRange,
      supernetInfo,
    },
    formatted: {
      cidrNotation,
      networkAddress,
      broadcastAddress,
      firstUsable,
      lastUsable,
      subnetMask,
      wildcardMask,
      totalAddresses: `${formatNum(totalAddresses)} ${v["addresses"] || "addresses"}`,
      usableHosts: `${formatNum(usableHosts)} ${hostsLabel}`,
      ipClass: ipClassLabel,
      ipType: ipTypeLabel,
      networkBits: `${networkBits} ${bitsLabel}`,
      hostBits: `${hostBits} ${bitsLabel}`,
      subnetsAvailable: subnets24 > 0 ? `${formatNum(subnets24)} ${v["subnets"] || "subnets"}` : "N/A (smaller than /24)",
      reservedIps,
      nextBlock,
      previousBlock,
      // Hidden values for infoCards
      binaryMask,
      hexIp,
      ipRange,
      supernetInfo,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default cidrConfig;
