import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─────────────────────────────────────────────────────────────────────────────
// IP Subnet Calculator (IPv4)
// ─────────────────────────────────────────────────────────────────────────────

export const ipSubnetConfig: CalculatorConfigV4 = {
  id: "ip-subnet",
  version: "4.0",
  category: "technology",
  icon: "🌐",

  presets: [
    {
      id: "homeNetwork",
      icon: "🏠",
      values: { octet1: 192, octet2: 168, octet3: 1, octet4: 100, cidr: "24" },
    },
    {
      id: "smallOffice",
      icon: "🏢",
      values: { octet1: 10, octet2: 0, octet3: 1, octet4: 50, cidr: "28" },
    },
    {
      id: "corporate",
      icon: "🏗️",
      values: { octet1: 172, octet2: 16, octet3: 0, octet4: 1, cidr: "16" },
    },
    {
      id: "pointToPoint",
      icon: "🔗",
      values: { octet1: 10, octet2: 1, octet3: 1, octet4: 0, cidr: "30" },
    },
  ],

  t: {
    en: {
      name: "IP Subnet Calculator",
      slug: "ip-subnet-calculator",
      subtitle: "Calculate subnet mask, network address, broadcast, wildcard mask, and usable host ranges from any IPv4 address and CIDR prefix.",
      breadcrumb: "IP Subnet",

      seo: {
        title: "IP Subnet Calculator - Free IPv4 CIDR & Mask Tool",
        description: "Calculate subnet mask, network and broadcast addresses, wildcard mask, usable host range, and binary notation for any IPv4 CIDR block. Free tool for network engineers.",
        shortDescription: "Calculate IPv4 subnet details from IP and CIDR prefix.",
        keywords: [
          "ip subnet calculator",
          "subnet mask calculator",
          "cidr calculator",
          "ipv4 subnet calculator",
          "network address calculator",
          "free subnet calculator",
          "subnetting tool",
          "wildcard mask calculator",
        ],
      },

      calculator: { yourInformation: "Network Information" },
      ui: {
        yourInformation: "Network Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Subnet Details",
      },

      inputs: {
        octet1: {
          label: "IP Address — Octet 1",
          helpText: "First octet (0–255)",
        },
        octet2: {
          label: "Octet 2",
          helpText: "Second octet (0–255)",
        },
        octet3: {
          label: "Octet 3",
          helpText: "Third octet (0–255)",
        },
        octet4: {
          label: "Octet 4",
          helpText: "Fourth octet (0–255)",
        },
        cidr: {
          label: "CIDR Prefix Length (/)",
          helpText: "Number of network bits — determines subnet size",
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
            "31": "/31 — 255.255.255.254 (2 point-to-point)",
            "32": "/32 — 255.255.255.255 (single host)",
          },
        },
      },

      results: {
        ipAddress: { label: "IP Address" },
        networkAddress: { label: "Network Address" },
        broadcastAddress: { label: "Broadcast Address" },
        subnetMask: { label: "Subnet Mask" },
        wildcardMask: { label: "Wildcard Mask" },
        totalAddresses: { label: "Total Addresses" },
        usableHosts: { label: "Usable Hosts" },
        hostRange: { label: "Usable Host Range" },
        cidrNotation: { label: "CIDR Notation" },
        ipClass: { label: "IP Class" },
        ipType: { label: "IP Type" },
        binarySubnetMask: { label: "Binary Subnet Mask" },
        binaryIp: { label: "Binary IP Address" },
        hexIp: { label: "Hex IP Address" },
        networkBits: { label: "Network Bits" },
        hostBits: { label: "Host Bits" },
      },

      presets: {
        homeNetwork: { label: "Home Network /24", description: "192.168.1.100/24 — 254 usable hosts" },
        smallOffice: { label: "Small Office /28", description: "10.0.1.50/28 — 14 usable hosts" },
        corporate: { label: "Corporate /16", description: "172.16.0.1/16 — 65,534 usable hosts" },
        pointToPoint: { label: "Point-to-Point /30", description: "10.1.1.0/30 — 2 usable hosts (router link)" },
      },

      values: {
        "hosts": "hosts",
        "host": "host",
        "addresses": "addresses",
        "bits": "bits",
        "private": "Private (RFC 1918)",
        "public": "Public",
        "loopback": "Loopback (127.x.x.x)",
        "linkLocal": "Link-Local / APIPA (169.254.x.x)",
        "multicast": "Multicast (224–239.x.x.x)",
        "reserved": "Reserved (240–255.x.x.x)",
        "broadcast": "Limited Broadcast",
        "currentNet": "Current Network",
        "classA": "Class A",
        "classB": "Class B",
        "classC": "Class C",
        "classD": "Class D (Multicast)",
        "classE": "Class E (Reserved)",
        "na": "N/A",
        "pointToPoint": "Point-to-Point (RFC 3021)",
        "singleHost": "Single Host Route",
      },

      formats: {
        summary: "{cidrNotation} — Network: {networkAddress}, Broadcast: {broadcastAddress}, Usable: {usableHosts} hosts ({firstHost} – {lastHost}).",
      },

      infoCards: {
        metrics: {
          title: "Subnet Overview",
          items: [
            { label: "Network Address", valueKey: "networkAddress" },
            { label: "Broadcast Address", valueKey: "broadcastAddress" },
            { label: "Usable Hosts", valueKey: "usableHosts" },
            { label: "CIDR Notation", valueKey: "cidrNotation" },
          ],
        },
        details: {
          title: "Address Details",
          items: [
            { label: "Subnet Mask", valueKey: "subnetMask" },
            { label: "Wildcard Mask", valueKey: "wildcardMask" },
            { label: "IP Class", valueKey: "ipClass" },
            { label: "IP Type", valueKey: "ipType" },
          ],
        },
        tips: {
          title: "Subnetting Tips",
          items: [
            "Use /24 (254 hosts) for home or small office networks — most common subnet size.",
            "Private ranges (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 — free for internal use.",
            "First IP = network ID, last IP = broadcast — neither can be assigned to a device.",
            "For router-to-router links, use /30 (2 hosts) or /31 (point-to-point, RFC 3021).",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is Subnetting?",
          content: "Subnetting is the practice of dividing a larger IP network into smaller, independent sub-networks called subnets. Each subnet has its own address range and functions as a separate broadcast domain. This technique was introduced to solve the inefficiency of classful addressing, where organizations received far more IP addresses than they needed. By borrowing bits from the host portion of an IP address, administrators can create multiple smaller networks from a single address block, improving routing efficiency, reducing broadcast traffic, enhancing security through isolation, and making better use of limited IPv4 address space. Every IPv4 address is 32 bits long, divided into a network portion (identified by the subnet mask) and a host portion (the remaining bits). The subnet mask tells routers which part of the address identifies the network and which part identifies individual devices.",
        },
        howItWorks: {
          title: "How CIDR Notation Works",
          content: "Classless Inter-Domain Routing (CIDR) replaced the rigid classful system (Class A, B, C) in 1993 with RFC 1519. Instead of fixed boundaries, CIDR uses a slash followed by a number to indicate how many bits form the network prefix. For example, /24 means 24 bits are the network portion and 8 bits are for hosts, yielding 2⁸ = 256 total addresses (254 usable). The key formula is: total addresses = 2^(32 − prefix), and usable hosts = total − 2 (subtracting network and broadcast addresses). A /16 gives 65,534 usable hosts, while /28 gives only 14. CIDR enables precise allocation — an organization needing 500 addresses can get a /23 (510 hosts) instead of wasting an entire Class B (/16 with 65,534). This flexibility dramatically reduced IPv4 address exhaustion and simplified routing tables through route aggregation (supernetting).",
        },
        considerations: {
          title: "Key Subnetting Concepts",
          items: [
            { text: "Network address: the first address in a subnet — identifies the network itself and cannot be assigned to any host.", type: "info" },
            { text: "Broadcast address: the last address — sends packets to every host on that subnet simultaneously.", type: "info" },
            { text: "Wildcard mask: the bitwise inverse of the subnet mask — used in Cisco ACLs and OSPF routing configurations.", type: "info" },
            { text: "Plan for growth: if you need 50 hosts today, /26 (62 usable) leaves little room — consider /25 (126 usable) instead.", type: "warning" },
            { text: "RFC 1918 private ranges are not routable on the public internet — NAT translates them to public IPs for external access.", type: "info" },
            { text: "Over-subnetting wastes addresses: each subnet loses 2 IPs (network + broadcast), so many tiny subnets add up.", type: "warning" },
          ],
        },
        categories: {
          title: "Common Subnet Sizes",
          items: [
            { text: "/32 — Single Host: Used for loopback addresses and host routes in routing tables.", type: "info" },
            { text: "/30 — 2 Hosts: Standard for point-to-point links between routers (also see /31 per RFC 3021).", type: "info" },
            { text: "/28 — 14 Hosts: Small server room, a few printers, or an IoT VLAN.", type: "info" },
            { text: "/24 — 254 Hosts: The most common subnet for homes, small offices, and individual VLANs.", type: "info" },
            { text: "/20 — 4,094 Hosts: Medium enterprise — an entire building floor or large department.", type: "info" },
            { text: "/16 — 65,534 Hosts: Large campus or data center; often the size of a full Class B allocation.", type: "info" },
          ],
        },
        examples: {
          title: "Subnetting Examples",
          description: "Step-by-step subnet calculations",
          examples: [
            {
              title: "Example: 192.168.1.100 /24",
              steps: [
                "IP: 192.168.1.100 → Binary: 11000000.10101000.00000001.01100100",
                "CIDR /24 → Mask: 255.255.255.0 → Binary: 11111111.11111111.11111111.00000000",
                "AND operation: Network = 192.168.1.0 (first 24 bits match, last 8 zeroed)",
                "Host bits = 32 − 24 = 8 → Total addresses = 2⁸ = 256",
                "Usable hosts = 256 − 2 = 254",
                "First usable: 192.168.1.1 | Last usable: 192.168.1.254 | Broadcast: 192.168.1.255",
              ],
              result: "192.168.1.0/24 supports 254 devices. Wildcard: 0.0.0.255",
            },
            {
              title: "Example: 10.0.1.50 /28",
              steps: [
                "IP: 10.0.1.50 → Binary: 00001010.00000000.00000001.00110010",
                "CIDR /28 → Mask: 255.255.255.240 → Last octet: 11110000",
                "Each /28 block = 16 addresses: ...0–15, 16–31, 32–47, 48–63...",
                "50 falls in block 48–63 → Network: 10.0.1.48",
                "Usable hosts = 16 − 2 = 14",
                "Range: 10.0.1.49 – 10.0.1.62 | Broadcast: 10.0.1.63",
              ],
              result: "10.0.1.48/28 supports 14 devices. Wildcard: 0.0.0.15",
            },
          ],
        },
      },

      faqs: [
        { question: "What is the difference between a subnet mask and CIDR notation?", answer: "They express the same concept in different formats. A subnet mask like 255.255.255.0 uses four decimal octets, while CIDR writes it as /24 — the count of network bits. CIDR is more concise and has become the modern standard. For example, 255.255.255.240 equals /28, and 255.255.0.0 equals /16. To convert a subnet mask to CIDR, count the consecutive 1-bits in its binary form." },
        { question: "Why can't the network and broadcast addresses be assigned to hosts?", answer: "The network address (first IP in the subnet) identifies the subnet itself in routing tables — assigning it to a device would confuse routers. The broadcast address (last IP) is reserved for sending packets to all hosts on the subnet simultaneously. Using either for a device would break routing and broadcast functionality, causing network errors." },
        { question: "What are the RFC 1918 private IP address ranges?", answer: "RFC 1918 defines three ranges reserved for private networks: 10.0.0.0/8 (10.0.0.0 – 10.255.255.255, ~16.7 million addresses), 172.16.0.0/12 (172.16.0.0 – 172.31.255.255, ~1 million addresses), and 192.168.0.0/16 (192.168.0.0 – 192.168.255.255, ~65,000 addresses). These are not routable on the public internet. NAT (Network Address Translation) maps them to public IPs for internet access." },
        { question: "What is a wildcard mask and when is it used?", answer: "A wildcard mask is the bitwise inverse of the subnet mask — where the mask has 1s, the wildcard has 0s, and vice versa. For subnet mask 255.255.255.0, the wildcard is 0.0.0.255. Wildcard masks are used in Cisco IOS for Access Control Lists (ACLs) and in OSPF area network statements to define which addresses a rule or route applies to." },
        { question: "What is the difference between /30 and /31 for point-to-point links?", answer: "A /30 provides 4 addresses (2 usable hosts + network + broadcast), which is the traditional choice for router-to-router links. RFC 3021 introduced /31, which provides exactly 2 addresses with no network or broadcast overhead — more efficient for point-to-point links where broadcast is unnecessary. Most modern routers support /31, but some legacy equipment may not." },
        { question: "How do I determine the right subnet size for my network?", answer: "Count the number of devices that need IP addresses (computers, phones, printers, servers, IoT, access points) and add 20–50% for future growth. Then find the smallest CIDR prefix that fits: for 50 devices, you'd need at least /26 (62 usable) but /25 (126 usable) gives more room. Remember each subnet loses 2 addresses (network + broadcast), and you may need IPs for gateways and management interfaces too." },
      ],

      detailedTable: {
        subnetReference: {
          button: "View All Subnet Sizes Reference",
          title: "IPv4 Subnet Reference Table",
          columns: {
            cidr: "CIDR",
            mask: "Subnet Mask",
            wildcard: "Wildcard",
            totalAddresses: "Total Addresses",
            usableHosts: "Usable Hosts",
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
      id: "octet1",
      type: "number",
      defaultValue: null,
      placeholder: "192",
      min: 0,
      max: 255,
      step: 1,
    },
    {
      id: "octet2",
      type: "number",
      defaultValue: null,
      placeholder: "168",
      min: 0,
      max: 255,
      step: 1,
    },
    {
      id: "octet3",
      type: "number",
      defaultValue: null,
      placeholder: "1",
      min: 0,
      max: 255,
      step: 1,
    },
    {
      id: "octet4",
      type: "number",
      defaultValue: null,
      placeholder: "0",
      min: 0,
      max: 255,
      step: 1,
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
    { id: "hostRange", type: "secondary", format: "text" },
    { id: "totalAddresses", type: "secondary", format: "text" },
    { id: "ipClass", type: "secondary", format: "text" },
    { id: "ipType", type: "secondary", format: "text" },
    { id: "binarySubnetMask", type: "secondary", format: "text" },
    { id: "binaryIp", type: "secondary", format: "text" },
    { id: "hexIp", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "🎯", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  detailedTable: {
    id: "subnetReference",
    buttonLabel: "View All Subnet Sizes Reference",
    buttonIcon: "📋",
    modalTitle: "IPv4 Subnet Reference Table",
    columns: [
      { id: "cidr", label: "CIDR", align: "center" },
      { id: "mask", label: "Subnet Mask", align: "left" },
      { id: "wildcard", label: "Wildcard", align: "left" },
      { id: "totalAddresses", label: "Total Addresses", align: "right" },
      { id: "usableHosts", label: "Usable Hosts", align: "right", highlight: true },
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
      authors: "Rekhter, Y., Moskowitz, B., Karrenberg, D., de Groot, G.J. & Lear, E.",
      year: "1996",
      title: "Address Allocation for Private Internets",
      source: "IETF RFC 1918",
      url: "https://datatracker.ietf.org/doc/html/rfc1918",
    },
  ],

  hero: {
    showRating: true,
    showShare: true,
  },
  sidebar: {
    showAds: true,
    showRelated: true,
  },
  features: {
    save: true,
    pdf: true,
    csv: true,
    excel: true,
  },
  relatedCalculators: ["bandwidth", "cidr", "transfer-time", "vlsm", "password-generator"],
  ads: {
    sidebar: true,
    footer: true,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

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
  if (o1 >= 1 && o1 <= 126) return "classA";
  if (o1 === 127) return "loopback";
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
  if (o1 === 0) return "currentNet";
  if (o1 === 255) return "broadcast";
  return "public";
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATE FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

export function calculateIpSubnet(data: {
  values: Record<string, unknown>;
  units?: Record<string, string>;
  unitSystem?: "metric" | "imperial";
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const o1 = values.octet1 as number | null;
  const o2 = values.octet2 as number | null;
  const o3 = values.octet3 as number | null;
  const o4 = values.octet4 as number | null;
  const cidrStr = values.cidr as string;
  const cidr = parseInt(cidrStr, 10);

  // Validate required fields
  if (o1 === null || o2 === null || o3 === null || o4 === null) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (o1 < 0 || o1 > 255 || o2 < 0 || o2 > 255 || o3 < 0 || o3 > 255 || o4 < 0 || o4 > 255) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (isNaN(cidr) || cidr < 0 || cidr > 32) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Core calculations
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
    // RFC 3021 point-to-point
    usableHosts = 2;
    firstHostInt = networkInt;
    lastHostInt = broadcastInt;
  } else {
    usableHosts = totalAddresses - 2;
    firstHostInt = networkInt + 1;
    lastHostInt = broadcastInt - 1;
  }

  const ipAddress = `${o1}.${o2}.${o3}.${o4}`;
  const networkAddress = intToIp(networkInt);
  const broadcastAddress = intToIp(broadcastInt);
  const subnetMask = intToIp(maskInt);
  const wildcardMask = intToIp(wildcardInt);
  const firstHost = intToIp(firstHostInt);
  const lastHost = intToIp(lastHostInt);
  const hostRange = `${firstHost} – ${lastHost}`;
  const cidrNotation = `${networkAddress}/${cidr}`;
  const binarySubnetMask = intToBinary(maskInt);
  const binaryIp = intToBinary(ipInt);
  const hexIp = intToHex(ipInt);

  const ipClassKey = getIpClass(o1);
  const ipTypeKey = getIpType(o1, o2);
  const ipClassLabel = v[ipClassKey] || ipClassKey;
  const ipTypeLabel = v[ipTypeKey] || ipTypeKey;

  const hostsLabel = usableHosts === 1 ? (v["host"] || "host") : (v["hosts"] || "hosts");

  // Build subnet reference table
  const tableData: Array<Record<string, string>> = [];
  const cidrValues = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
  for (const c of cidrValues) {
    const m = cidrToMask(c);
    const w = (~m) >>> 0;
    const total = Math.pow(2, 32 - c);
    const usable = c === 32 ? 1 : c === 31 ? 2 : total - 2;
    tableData.push({
      cidr: `/${c}`,
      mask: intToIp(m),
      wildcard: intToIp(w),
      totalAddresses: formatNumber(total),
      usableHosts: formatNumber(usable),
    });
  }

  // Highlight current selection row
  const currentIndex = cidrValues.indexOf(cidr);
  if (currentIndex !== -1) {
    tableData[currentIndex].cidr = `► /${cidr}`;
  }

  const f = (t?.formats as Record<string, string>) || {};
  const summaryTemplate = f.summary || "{cidrNotation} — Usable: {usableHosts} hosts";
  const summary = summaryTemplate
    .replace("{cidrNotation}", cidrNotation)
    .replace("{networkAddress}", networkAddress)
    .replace("{broadcastAddress}", broadcastAddress)
    .replace("{usableHosts}", formatNumber(usableHosts))
    .replace("{firstHost}", firstHost)
    .replace("{lastHost}", lastHost);

  return {
    values: {
      ipAddress,
      networkAddress,
      broadcastAddress,
      subnetMask,
      wildcardMask,
      totalAddresses,
      usableHosts,
      hostRange,
      cidrNotation,
      ipClass: ipClassLabel,
      ipType: ipTypeLabel,
      binarySubnetMask,
      binaryIp,
      hexIp,
      networkBits: cidr,
      hostBits: 32 - cidr,
    },
    formatted: {
      ipAddress,
      networkAddress,
      broadcastAddress,
      subnetMask,
      wildcardMask,
      totalAddresses: formatNumber(totalAddresses),
      usableHosts: `${formatNumber(usableHosts)} ${hostsLabel}`,
      hostRange,
      cidrNotation,
      ipClass: ipClassLabel,
      ipType: ipTypeLabel,
      binarySubnetMask,
      binaryIp,
      hexIp,
      networkBits: `${cidr} ${v["bits"] || "bits"}`,
      hostBits: `${32 - cidr} ${v["bits"] || "bits"}`,
    },
    summary,
    isValid: true,
    metadata: {
      tableData,
    },
  };
}

export default ipSubnetConfig;
