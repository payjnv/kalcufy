import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─────────────────────────────────────────────────────────────────────────────
// VLSM Calculator — Variable Length Subnet Masking
// ─────────────────────────────────────────────────────────────────────────────

export const vlsmConfig: CalculatorConfigV4 = {
  id: "vlsm",
  version: "4.0",
  category: "technology",
  icon: "🧩",

  presets: [
    {
      id: "smallOffice",
      icon: "🏢",
      values: {
        networkAddress: "192.168.1.0",
        cidr: "24",
        subnet1Hosts: 50,
        subnet2Hosts: 30,
        subnet3Hosts: 10,
        subnet4Hosts: 2,
      },
    },
    {
      id: "campus",
      icon: "🏫",
      values: {
        networkAddress: "10.10.0.0",
        cidr: "22",
        subnet1Hosts: 500,
        subnet2Hosts: 200,
        subnet3Hosts: 100,
        subnet4Hosts: 50,
      },
    },
    {
      id: "labNetwork",
      icon: "🔬",
      values: {
        networkAddress: "172.16.0.0",
        cidr: "24",
        subnet1Hosts: 100,
        subnet2Hosts: 60,
        subnet3Hosts: 25,
        subnet4Hosts: 5,
      },
    },],

  t: {
    en: {
      name: "VLSM Calculator",
      slug: "vlsm-calculator",
      subtitle: "Divide a network into variable-size subnets using VLSM. Allocate IP addresses efficiently with minimum waste — enter your host requirements and get optimal subnets.",
      breadcrumb: "VLSM",

      seo: {
        title: "VLSM Calculator - Variable Length Subnet Masking Tool",
        description: "Divide a network into optimally sized subnets using VLSM. Enter host requirements per subnet and get network addresses, masks, ranges, and waste analysis. Free VLSM tool.",
        shortDescription: "Divide a network into variable-size subnets with VLSM.",
        keywords: [
          "vlsm calculator",
          "variable length subnet masking",
          "vlsm subnetting",
          "vlsm cidr calculator",
          "subnet divider",
          "free vlsm calculator",
          "network subnetting tool",
          "ip address allocation",
        ],
      },

      calculator: { yourInformation: "VLSM Input" },
      ui: {
        yourInformation: "VLSM Input",
        calculate: "Calculate",
        reset: "Reset",
        results: "VLSM Allocation",
      },

      inputs: {
        networkAddress: {
          label: "Major Network Address",
          helpText: "The starting IP address block to subdivide (e.g. 192.168.1.0)",
        },
        cidr: {
          label: "Network Prefix (/)",
          helpText: "CIDR prefix of the major network",
          options: {
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
          },
        },
        subnet1Hosts: {
          label: "Subnet 1 — Required Hosts",
          helpText: "Number of devices for the largest subnet",
        },
        subnet2Hosts: {
          label: "Subnet 2 — Required Hosts",
          helpText: "Number of devices for the second subnet",
        },
        subnet3Hosts: {
          label: "Subnet 3 — Required Hosts",
          helpText: "Number of devices for the third subnet",
        },
        subnet4Hosts: {
          label: "Subnet 4 — Required Hosts",
          helpText: "Number of devices for the fourth subnet (enter 0 to skip)",
        },
      },

      results: {
        totalAllocated: { label: "Total Addresses Allocated" },
        totalAvailable: { label: "Total Addresses Available" },
        totalWasted: { label: "Addresses Wasted" },
        efficiency: { label: "Allocation Efficiency" },
        subnetsCreated: { label: "Subnets Created" },
        addressesRemaining: { label: "Addresses Remaining" },
      },

      presets: {
        smallOffice: { label: "Small Office /24", description: "192.168.1.0/24 → 4 departments (50, 30, 10, 2)" },
        campus: { label: "Campus /22", description: "10.10.0.0/22 → 4 buildings (500, 200, 100, 50)" },
        labNetwork: { label: "Lab Network /24", description: "172.16.0.0/24 → 4 VLANs (100, 60, 25, 5)" },
      },

      values: {
        "hosts": "hosts",
        "addresses": "addresses",
        "wasted": "wasted",
        "remaining": "remaining",
        "subnet": "Subnet",
        "allocated": "allocated",
        "needed": "needed",
        "available": "available",
        "efficiency": "efficiency",
        "error": "Error",
        "doesNotFit": "Required hosts do not fit in this network block.",
      },

      formats: {
        summary: "VLSM divided {networkAddress}/{cidr} into {subnetsCreated} subnets with {efficiency}% efficiency. {addressesRemaining} addresses remaining.",
      },

      infoCards: {
        metrics: {
          title: "Allocation Summary",
          items: [
            { label: "Subnets Created", valueKey: "subnetsCreated" },
            { label: "Total Allocated", valueKey: "totalAllocated" },
            { label: "Addresses Remaining", valueKey: "addressesRemaining" },
            { label: "Efficiency", valueKey: "efficiency" },
          ],
        },
        details: {
          title: "Network Block",
          items: [
            { label: "Major Network", valueKey: "totalAvailable" },
            { label: "Total Wasted", valueKey: "totalWasted" },
            { label: "Subnets Created", valueKey: "subnetsCreated" },
            { label: "Efficiency", valueKey: "efficiency" },
          ],
        },
        tips: {
          title: "VLSM Tips",
          items: [
            "VLSM always allocates the largest subnet first, then works downward — this minimizes fragmentation.",
            "Each subnet loses 2 addresses (network + broadcast) — plan for this overhead.",
            "Add 10–20% to your host count for future growth before entering requirements.",
            "VLSM is more efficient than fixed subnetting: a /24 split with VLSM can save 30–50% of wasted IPs.",
          ],
        },
      },

      detailedTable: {
        vlsmAllocation: {
          button: "View Full VLSM Allocation Table",
          title: "VLSM Subnet Allocation Details",
          columns: {
            name: "Subnet",
            needed: "Hosts Needed",
            allocated: "Size (Allocated)",
            network: "Network Address",
            mask: "Subnet Mask",
            range: "Usable Range",
            broadcast: "Broadcast",
            wasted: "Wasted IPs",
          },
        },
      },

      education: {
        whatIs: {
          title: "What Is VLSM?",
          content: "Variable Length Subnet Masking (VLSM) is a subnetting technique that allows network administrators to use different subnet mask sizes within the same address space. Unlike fixed-length subnetting where every subnet must be the same size, VLSM lets you create subnets tailored to the exact number of hosts each segment needs. For example, a department with 200 workstations gets a /24 subnet (254 hosts), while a point-to-point router link gets a /30 (2 hosts). This dramatically reduces IP address waste compared to giving both segments the same /24. VLSM became possible with the adoption of CIDR (Classless Inter-Domain Routing) and requires routing protocols that carry subnet mask information, such as OSPF, EIGRP, IS-IS, or BGP.",
        },
        howItWorks: {
          title: "How VLSM Allocation Works",
          content: "The VLSM algorithm follows a simple principle: sort all subnet requirements from largest to smallest, then allocate each one using the smallest subnet mask that fits. Start with the largest requirement — find the minimum CIDR prefix that provides enough hosts (usable = 2^host_bits − 2). Allocate that block starting from the next available address in the major network. Then move to the next largest requirement and repeat. This largest-first approach ensures optimal alignment and prevents fragmentation. For example, starting with 192.168.1.0/24 (254 usable), if you need 100, 50, and 10 hosts: the first gets /25 (126 usable), the second gets /26 (62 usable), and the third gets /28 (14 usable), using 128 + 64 + 16 = 208 of 256 addresses with 48 remaining for future growth.",
        },
        considerations: {
          title: "VLSM Planning Guidelines",
          items: [
            { text: "Always sort subnets by size (largest first) before allocating — this prevents address space fragmentation.", type: "info" },
            { text: "Each subnet must align to its block size: a /26 (64 addresses) must start at a multiple of 64.", type: "warning" },
            { text: "The minimum practical subnet is /30 (2 usable hosts) for router links; /28 (14 hosts) for device networks.", type: "info" },
            { text: "Add 20% growth margin: if you need 100 hosts, plan for 120 — this still fits in a /25 (126 usable).", type: "warning" },
            { text: "Fixed subnetting a /24 into equal /26 blocks gives 4 × 62 = 248 hosts. VLSM can fit the same needs in fewer addresses.", type: "info" },
            { text: "Document your VLSM plan carefully — variable-size subnets are harder to troubleshoot than fixed ones.", type: "warning" },
          ],
        },
        categories: {
          title: "VLSM vs Fixed Subnetting Comparison",
          items: [
            { text: "Fixed /26 for 200 + 50 + 10: needs 4 subnets = 256 IPs, wastes 196 (23% efficiency).", type: "warning" },
            { text: "VLSM for 200 + 50 + 10: /24 + /26 + /28 = 336 IPs needed, but only 256 + 64 + 16 = 336 (77% efficiency).", type: "info" },
            { text: "ISP allocation: VLSM lets ISPs give /28 to small clients, /24 to medium, /22 to large — from one /16 block.", type: "info" },
            { text: "Campus network: admin (200 PCs) gets /24, lab (30 PCs) gets /27, security cams (8) get /28.", type: "info" },
            { text: "Data center: production VLAN /23 (510 hosts), management /27 (30), out-of-band /29 (6).", type: "info" },
            { text: "Home lab: main LAN /25 (126), IoT /28 (14), guest Wi-Fi /28 (14) — all from one /24.", type: "info" },
          ],
        },
        examples: {
          title: "VLSM Allocation Examples",
          description: "Step-by-step subnet division",
          examples: [
            {
              title: "Office: 192.168.1.0/24 → 4 Subnets",
              steps: [
                "Requirements: Engineering (100), Sales (50), HR (20), Router links (2)",
                "Sort largest first: 100, 50, 20, 2",
                "Subnet 1: 100 hosts → need /25 (126 usable). Network: 192.168.1.0/25, range .1–.126",
                "Subnet 2: 50 hosts → need /26 (62 usable). Network: 192.168.1.128/26, range .129–.190",
                "Subnet 3: 20 hosts → need /27 (30 usable). Network: 192.168.1.192/27, range .193–.222",
                "Subnet 4: 2 hosts → need /30 (2 usable). Network: 192.168.1.224/30, range .225–.226",
              ],
              result: "Used 200 of 256 addresses (78% efficiency). 56 addresses remain for growth.",
            },
            {
              title: "Campus: 10.10.0.0/22 → 3 Buildings",
              steps: [
                "Total available: /22 = 1,022 usable addresses",
                "Requirements: Main building (500), Annex (200), Lab (50)",
                "Subnet 1: 500 → need /23 (510 usable). Network: 10.10.0.0/23, range .0.1–.1.254",
                "Subnet 2: 200 → need /24 (254 usable). Network: 10.10.2.0/24, range .2.1–.2.254",
                "Subnet 3: 50 → need /26 (62 usable). Network: 10.10.3.0/26, range .3.1–.3.62",
                "Remaining: 10.10.3.64/26 through 10.10.3.255 (192 addresses for future use)",
              ],
              result: "Used 832 of 1,024 addresses. 192 remain — enough for two more /26 subnets.",
            },
          ],
        },
      },

      faqs: [
        { question: "What is the difference between VLSM and CIDR?", answer: "CIDR (Classless Inter-Domain Routing) is the notation system that allows variable-length prefixes (e.g. /22, /27). VLSM (Variable Length Subnet Masking) is the technique of applying different CIDR prefix lengths to different subnets within the same address block. Think of CIDR as the language and VLSM as the design practice that uses it. VLSM requires CIDR-aware routing protocols like OSPF or EIGRP." },
        { question: "Which routing protocols support VLSM?", answer: "Modern protocols that carry subnet mask information support VLSM: OSPF (Open Shortest Path First), EIGRP (Enhanced Interior Gateway Routing Protocol), IS-IS, BGP, and RIPv2. The older RIPv1 does NOT support VLSM because it assumes classful boundaries and doesn't include the mask in routing updates. Static routes also support VLSM since the mask is manually specified." },
        { question: "Why must I sort subnets from largest to smallest?", answer: "Subnets must align to their block size — a /26 (64 addresses) must start at a multiple of 64. If you allocate a small subnet first, you may create a gap that wastes addresses because the next larger subnet can't fit there. Sorting largest-first ensures each block starts at a naturally aligned boundary, maximizing usable space and preventing fragmentation." },
        { question: "How do I know what subnet size I need for N hosts?", answer: "Find the smallest power of 2 that is greater than N + 2 (the +2 accounts for network and broadcast addresses). For 100 hosts: 100 + 2 = 102, next power of 2 is 128 = 2⁷, so host bits = 7, prefix = 32 − 7 = /25 (126 usable). For 50 hosts: 52 → 64 = 2⁶ → /26 (62 usable). For 10 hosts: 12 → 16 = 2⁴ → /28 (14 usable)." },
        { question: "Can I use VLSM with IPv6?", answer: "IPv6 uses a fixed /64 prefix for all host subnets as recommended by RFC 4291, giving each subnet 2⁶⁴ addresses — more than enough for any LAN. VLSM-style variable prefixes are used at higher levels (between /48 and /64) for allocating subnets to departments, but within each subnet the size is always /64. The massive address space of IPv6 eliminates the need for VLSM at the host level." },
        { question: "What happens if my hosts don't fit in the network block?", answer: "If the total required addresses exceed the available space in your major network, the VLSM calculation fails. For example, trying to fit 200 + 100 + 50 hosts into a /24 (254 total addresses) won't work because you need /24 (256) + /25 (128) + /26 (64) = 448 addresses. Solution: use a larger network block (like /23 or /22) or reduce your host requirements." },
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
    {
      id: "subnet1Hosts",
      type: "number",
      defaultValue: null,
      placeholder: "100",
      min: 1,
      max: 65534,
      step: 1,
    },
    {
      id: "subnet2Hosts",
      type: "number",
      defaultValue: null,
      placeholder: "50",
      min: 1,
      max: 65534,
      step: 1,
    },
    {
      id: "subnet3Hosts",
      type: "number",
      defaultValue: null,
      placeholder: "25",
      min: 0,
      max: 65534,
      step: 1,
    },
    {
      id: "subnet4Hosts",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      min: 0,
      max: 65534,
      step: 1,
    },
  ],
  inputGroups: [],

  results: [
    { id: "efficiency", type: "primary", format: "text" },
    { id: "subnetsCreated", type: "secondary", format: "text" },
    { id: "totalAllocated", type: "secondary", format: "text" },
    { id: "totalAvailable", type: "secondary", format: "text" },
    { id: "totalWasted", type: "secondary", format: "text" },
    { id: "addressesRemaining", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "🎯", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  detailedTable: {
    id: "vlsmAllocation",
    buttonLabel: "View Full VLSM Allocation Table",
    buttonIcon: "📋",
    modalTitle: "VLSM Subnet Allocation Details",
    columns: [
      { id: "name", label: "Subnet", align: "left" },
      { id: "needed", label: "Hosts Needed", align: "center" },
      { id: "allocated", label: "Size (Allocated)", align: "center" },
      { id: "network", label: "Network Address", align: "left" },
      { id: "mask", label: "Subnet Mask", align: "left" },
      { id: "range", label: "Usable Range", align: "left" },
      { id: "broadcast", label: "Broadcast", align: "left" },
      { id: "wasted", label: "Wasted IPs", align: "center", highlight: true },
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
      authors: "Pummill, T. & Manning, B.",
      year: "1995",
      title: "Variable Length Subnet Table For IPv4",
      source: "IETF RFC 1878",
      url: "https://datatracker.ietf.org/doc/html/rfc1878",
    },
    {
      authors: "Fuller, V. & Li, T.",
      year: "2006",
      title: "Classless Inter-Domain Routing (CIDR)",
      source: "IETF RFC 4632",
      url: "https://datatracker.ietf.org/doc/html/rfc4632",
    },
  ],

  hero: { showRating: true, showShare: true },
  sidebar: { showAds: true, showRelated: true },
  features: { save: true, pdf: true, csv: true, excel: true },
  relatedCalculators: ["ip-subnet", "cidr", "bandwidth", "transfer-time"],
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

function cidrToMask(cidr: number): number {
  if (cidr === 0) return 0;
  return (~0 << (32 - cidr)) >>> 0;
}

function hostsToPrefix(hosts: number): number {
  // Find smallest prefix that fits hosts + 2 (network + broadcast)
  const needed = hosts + 2;
  let bits = 0;
  while (Math.pow(2, bits) < needed) bits++;
  return 32 - bits;
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATE
// ─────────────────────────────────────────────────────────────────────────────

export function calculateVlsm(data: {
  values: Record<string, unknown>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const networkInput = values.networkAddress as string | null;
  const cidrStr = values.cidr as string;
  const majorCidr = parseInt(cidrStr, 10);

  if (!networkInput || networkInput.trim() === "") {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const octets = parseIpv4(networkInput);
  if (!octets) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Collect subnet requirements (skip 0 or null)
  const subnetKeys = ["subnet1Hosts", "subnet2Hosts", "subnet3Hosts", "subnet4Hosts"];
  const requirements: { name: string; hosts: number }[] = [];
  subnetKeys.forEach((key, i) => {
    const val = values[key] as number | null;
    if (val !== null && val > 0) {
      requirements.push({ name: `${v["subnet"] || "Subnet"} ${i + 1}`, hosts: val });
    }
  });

  if (requirements.length < 1) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Sort largest first (VLSM algorithm)
  requirements.sort((a, b) => b.hosts - a.hosts);

  const [o1, o2, o3, o4] = octets;
  const majorNetworkInt = ipToInt(o1, o2, o3, o4) & cidrToMask(majorCidr);
  const totalAvailable = Math.pow(2, 32 - majorCidr);

  // Allocate subnets
  let currentAddress = majorNetworkInt;
  const allocations: Array<{
    name: string;
    needed: number;
    prefix: number;
    blockSize: number;
    usable: number;
    networkInt: number;
    broadcastInt: number;
    firstHostInt: number;
    lastHostInt: number;
    wasted: number;
  }> = [];

  let totalAllocated = 0;
  let totalNeededHosts = 0;

  for (const req of requirements) {
    const prefix = hostsToPrefix(req.hosts);
    if (prefix < majorCidr) {
      // Doesn't fit — subnet larger than major network
      return {
        values: { error: true },
        formatted: { efficiency: v["doesNotFit"] || "Required hosts do not fit in this network block." },
        summary: v["doesNotFit"] || "Required hosts do not fit in this network block.",
        isValid: false,
      };
    }

    const blockSize = Math.pow(2, 32 - prefix);
    const usable = blockSize - 2;

    // Align to block boundary
    const remainder = currentAddress % blockSize;
    if (remainder !== 0) {
      currentAddress += blockSize - remainder;
    }

    // Check if we exceeded available space
    if (currentAddress + blockSize > majorNetworkInt + totalAvailable) {
      return {
        values: { error: true },
        formatted: { efficiency: v["doesNotFit"] || "Required hosts do not fit in this network block." },
        summary: v["doesNotFit"] || "Required hosts do not fit in this network block.",
        isValid: false,
      };
    }

    const networkInt = currentAddress;
    const broadcastInt = networkInt + blockSize - 1;
    const firstHostInt = networkInt + 1;
    const lastHostInt = broadcastInt - 1;
    const wasted = usable - req.hosts;

    allocations.push({
      name: req.name,
      needed: req.hosts,
      prefix,
      blockSize,
      usable,
      networkInt,
      broadcastInt,
      firstHostInt,
      lastHostInt,
      wasted,
    });

    totalAllocated += blockSize;
    totalNeededHosts += req.hosts;
    currentAddress += blockSize;
  }

  const addressesRemaining = totalAvailable - totalAllocated;
  const totalWasted = totalAllocated - totalNeededHosts - (allocations.length * 2); // subtract network+broadcast per subnet
  const efficiency = totalAvailable > 0 ? ((totalNeededHosts / totalAllocated) * 100) : 0;

  // Build table data
  const tableData = allocations.map((a) => ({
    name: a.name,
    needed: a.needed.toString(),
    allocated: `/${a.prefix} (${a.blockSize})`,
    network: `${intToIp(a.networkInt)}/${a.prefix}`,
    mask: intToIp(cidrToMask(a.prefix)),
    range: `${intToIp(a.firstHostInt)} – ${intToIp(a.lastHostInt)}`,
    broadcast: intToIp(a.broadcastInt),
    wasted: a.wasted.toString(),
  }));

  // Add totals row
  tableData.push({
    name: "TOTAL",
    needed: totalNeededHosts.toString(),
    allocated: totalAllocated.toLocaleString("en-US"),
    network: `${intToIp(majorNetworkInt)}/${majorCidr}`,
    mask: "—",
    range: `${addressesRemaining.toLocaleString("en-US")} ${v["remaining"] || "remaining"}`,
    broadcast: "—",
    wasted: allocations.reduce((sum, a) => sum + a.wasted, 0).toString(),
  });

  const summary = (f.summary || "VLSM divided {networkAddress}/{cidr} into {subnetsCreated} subnets with {efficiency}% efficiency.")
    .replace("{networkAddress}", intToIp(majorNetworkInt))
    .replace("{cidr}", majorCidr.toString())
    .replace("{subnetsCreated}", allocations.length.toString())
    .replace("{efficiency}", efficiency.toFixed(1))
    .replace("{addressesRemaining}", addressesRemaining.toLocaleString("en-US"));

  return {
    values: {
      totalAllocated,
      totalAvailable,
      totalWasted: allocations.reduce((sum, a) => sum + a.wasted, 0),
      efficiency: Math.round(efficiency * 10) / 10,
      subnetsCreated: allocations.length,
      addressesRemaining,
    },
    formatted: {
      totalAllocated: `${totalAllocated.toLocaleString("en-US")} ${v["addresses"] || "addresses"}`,
      totalAvailable: `${totalAvailable.toLocaleString("en-US")} ${v["addresses"] || "addresses"} (${intToIp(majorNetworkInt)}/${majorCidr})`,
      totalWasted: `${allocations.reduce((sum, a) => sum + a.wasted, 0).toLocaleString("en-US")} ${v["addresses"] || "addresses"}`,
      efficiency: `${efficiency.toFixed(1)}%`,
      subnetsCreated: `${allocations.length}`,
      addressesRemaining: `${addressesRemaining.toLocaleString("en-US")} ${v["addresses"] || "addresses"}`,
    },
    summary,
    isValid: true,
    metadata: {
      tableData,
    },
  };
}

export default vlsmConfig;
