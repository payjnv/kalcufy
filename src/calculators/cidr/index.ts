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
    es: {
      "name": "Calculadora CIDR",
      "slug": "calculadora-cidr",
      "subtitle": "Convierte entre notación CIDR, máscaras de subred y rangos IP. Calcula detalles de red con soporte para proveedores cloud, detección de superredes y conversión inversa IP-a-CIDR.",
      "breadcrumb": "CIDR",
      "seo": {
        "title": "Calculadora CIDR - Conversor Gratuito de CIDR a Máscara de Subred y Rango IP",
        "description": "Convierte notación CIDR a máscaras de subred y rangos IP al instante. Soporta IPs reservadas de AWS, Azure, GCP, conversión inversa IP-a-CIDR y detección de superredes. Herramienta gratuita multiidioma.",
        "shortDescription": "Convierte notación CIDR a máscaras de subred y rangos IP.",
        "keywords": [
          "calculadora cidr",
          "cidr a máscara de subred",
          "calculadora notación cidr",
          "conversor subred a cidr",
          "rango ip a cidr",
          "calculadora bloque cidr",
          "aws vpc cidr",
          "calculadora cidr gratuita"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "mode": {
          "label": "Modo de Cálculo",
          "helpText": "CIDR → rango IP, o inverso: rango IP → notación CIDR",
          "options": {
            "cidr": "CIDR → Rango IP",
            "reverse": "Rango IP → CIDR"
          }
        },
        "networkAddress": {
          "label": "Dirección de Red",
          "helpText": "Dirección IPv4 en decimal con puntos (ej. 192.168.1.0)"
        },
        "cidr": {
          "label": "Longitud de Prefijo CIDR (/)",
          "helpText": "Número de bits de red (1–32)",
          "options": {
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
            "31": "/31 — 255.255.255.254 (punto a punto)",
            "32": "/32 — 255.255.255.255 (host único)"
          }
        },
        "cloudProvider": {
          "label": "Proveedor Cloud",
          "helpText": "Los proveedores cloud reservan IPs adicionales por subred — afecta el conteo de hosts utilizables",
          "options": {
            "standard": "Red Estándar",
            "aws": "AWS VPC (−5 IPs)",
            "azure": "Azure VNet (−5 IPs)",
            "gcp": "Google Cloud VPC (−4 IPs)"
          }
        },
        "startIp": {
          "label": "Dirección IP Inicial",
          "helpText": "Primera dirección IP en el rango (ej. 192.168.1.0)"
        },
        "endIp": {
          "label": "Dirección IP Final",
          "helpText": "Última dirección IP en el rango (ej. 192.168.1.255)"
        }
      },
      "results": {
        "cidrNotation": {
          "label": "Notación CIDR"
        },
        "networkAddress": {
          "label": "Dirección de Red"
        },
        "broadcastAddress": {
          "label": "Dirección de Broadcast"
        },
        "firstUsable": {
          "label": "Primera IP Utilizable"
        },
        "lastUsable": {
          "label": "Última IP Utilizable"
        },
        "subnetMask": {
          "label": "Máscara de Subred"
        },
        "wildcardMask": {
          "label": "Máscara Wildcard"
        },
        "totalAddresses": {
          "label": "Direcciones Totales"
        },
        "usableHosts": {
          "label": "Hosts Utilizables"
        },
        "ipClass": {
          "label": "Clase IP"
        },
        "ipType": {
          "label": "Tipo IP"
        },
        "networkBits": {
          "label": "Bits de Red"
        },
        "hostBits": {
          "label": "Bits de Host"
        },
        "subnetsAvailable": {
          "label": "Subredes /24 Internas"
        },
        "reservedIps": {
          "label": "IPs Reservadas"
        },
        "nextBlock": {
          "label": "Siguiente Bloque CIDR"
        },
        "previousBlock": {
          "label": "Bloque CIDR Anterior"
        },
        "reverseCidrs": {
          "label": "Bloques CIDR"
        }
      },
      "presets": {
        "classC": {
          "label": "/24 Estándar",
          "description": "192.168.1.0/24 — 254 hosts"
        },
        "awsVpc": {
          "label": "AWS VPC /16",
          "description": "10.0.0.0/16 — 65,534 hosts"
        },
        "smallSubnet": {
          "label": "Pequeña /27",
          "description": "172.16.10.0/27 — 30 hosts"
        },
        "largeBlock": {
          "label": "Empresa /8",
          "description": "10.0.0.0/8 — 16.7M hosts"
        }
      },
      "values": {
        "hosts": "hosts",
        "host": "host",
        "addresses": "direcciones",
        "subnets": "subredes",
        "bits": "bits",
        "private": "Privada (RFC 1918)",
        "public": "Pública",
        "loopback": "Loopback (127.x.x.x)",
        "linkLocal": "Enlace Local (169.254.x.x)",
        "multicast": "Multicast (224–239)",
        "reserved": "Reservada",
        "classA": "Clase A (1–126)",
        "classB": "Clase B (128–191)",
        "classC": "Clase C (192–223)",
        "classD": "Clase D (Multicast)",
        "classE": "Clase E (Reservada)"
      },
      "formats": {
        "summary": "{cidrNotation} — Red: {networkAddress}, Broadcast: {broadcastAddress}, Utilizables: {usableHosts} ({firstUsable} – {lastUsable})."
      },
      "infoCards": {
        "metrics": {
          "title": "Rango de Red",
          "items": [
            {
              "label": "Bloque CIDR",
              "valueKey": "cidrNotation"
            },
            {
              "label": "Hosts Utilizables",
              "valueKey": "usableHosts"
            },
            {
              "label": "Primera Utilizable",
              "valueKey": "firstUsable"
            },
            {
              "label": "Última Utilizable",
              "valueKey": "lastUsable"
            }
          ]
        },
        "details": {
          "title": "Detalles Técnicos",
          "items": [
            {
              "label": "Máscara Binaria",
              "valueKey": "binaryMask"
            },
            {
              "label": "IP Hex",
              "valueKey": "hexIp"
            },
            {
              "label": "Rango IP Completo",
              "valueKey": "ipRange"
            },
            {
              "label": "Info Superred",
              "valueKey": "supernetInfo"
            }
          ]
        },
        "tips": {
          "title": "Consejos CIDR",
          "items": [
            "CIDR /24 es el más común — equivalente a la antigua Clase C (255.255.255.0, 254 hosts utilizables).",
            "Cada paso en el prefijo reduce a la mitad la red: /23 = 510, /24 = 254, /25 = 126 hosts.",
            "AWS/Azure reservan 5 IPs por subred, GCP reserva 4 — usa modo cloud para conteos precisos.",
            "Usa el modo inverso (Rango IP → CIDR) para encontrar los bloques CIDR mínimos que cubran cualquier rango IP."
          ]
        }
      },
      "chart": {
        "title": "Asignación de Direcciones",
        "tabs": {
          "address-breakdown": "Desglose de Direcciones"
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es CIDR?",
          "content": "El Enrutamiento Inter-Dominio Sin Clases (CIDR) es un esquema de direccionamiento IP que reemplazó el sistema clasista antiguo (Clase A, B, C) en 1993. CIDR utiliza un prefijo de longitud variable para definir límites de red, escrito como una barra seguida del número de bits de red — por ejemplo, 10.0.0.0/16. Esta flexibilidad permite a ISPs y organizaciones asignar exactamente el espacio de direcciones IP que necesitan, en lugar de estar forzados a tamaños de clase fijos. CIDR también habilita la agregación de rutas (superredes), donde múltiples redes contiguas se anuncian como una sola ruta, reduciendo dramáticamente el tamaño de las tablas de enrutamiento de internet. Sin CIDR, la tabla de enrutamiento global sería órdenes de magnitud más grande y el agotamiento de IPv4 habría ocurrido mucho antes."
        },
        "howItWorks": {
          "title": "Notación CIDR Explicada",
          "content": "Un bloque CIDR como 192.168.0.0/22 significa que los primeros 22 bits son el prefijo de red y los 10 bits restantes son para direcciones de host. El número total de direcciones siempre es 2^(32 − prefijo). Así /22 da 2^10 = 1,024 direcciones (1,022 utilizables). La máscara de subred equivalente se encuentra poniendo los primeros 22 bits en 1: 11111111.11111111.11111100.00000000 = 255.255.252.0. La máscara wildcard (usada en ACLs y reglas de firewall) es el inverso bit a bit: 0.0.3.255. Cada bloque CIDR tiene una dirección de red (todos los bits de host en cero) y una dirección de broadcast (todos los bits de host en uno). Las IPs utilizables caen entre estas dos, excepto para /31 (RFC 3021 punto a punto) y /32 (ruta de host único)."
        },
        "considerations": {
          "title": "Consideraciones de Planificación CIDR",
          "items": [
            {
              "text": "Los bloques CIDR deben estar alineados naturalmente — una red /22 debe comenzar en un múltiplo de 1,024 direcciones (todos los bits de host en cero).",
              "type": "warning"
            },
            {
              "text": "Superredes: dos bloques /24 contiguos pueden agregarse en un /23, pero solo si el primer bloque comienza en un límite par.",
              "type": "info"
            },
            {
              "text": "Los proveedores cloud reservan IPs extra: AWS y Azure reservan 5 por subred (.0, .1, .2, .3, broadcast), GCP reserva 4.",
              "type": "warning"
            },
            {
              "text": "Al planificar VPCs, usa bloques CIDR no superpuestos para evitar conflictos con VPN, peering o configuraciones cloud híbridas.",
              "type": "info"
            },
            {
              "text": "La subred más pequeña práctica para hosts es /29 (6 IPs utilizables después de reservas) — tamaños menores son solo para enlaces punto a punto.",
              "type": "info"
            },
            {
              "text": "Los registros de internet (ARIN, RIPE, APNIC) requieren /24 mínimo para anuncios BGP enrutables globalmente.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Tamaños de Bloque CIDR para Cloud y Empresas",
          "items": [
            {
              "text": "AWS VPC: soporta /16 a /28 (65,534 a 14 IPs). VPC por defecto es 172.31.0.0/16. Reserva .0 (red), .1 (router), .2 (DNS), .3 (futuro), broadcast.",
              "type": "info"
            },
            {
              "text": "Azure VNet: soporta /8 a /29. Reserva .0 (red), .1 (gateway), .2 (DNS primario), .3 (DNS secundario), broadcast.",
              "type": "info"
            },
            {
              "text": "GCP VPC: soporta /8 a /29. Subredes modo-auto usan /20 por región. Reserva .0 (red), .1 (gateway), broadcast, DHCP.",
              "type": "info"
            },
            {
              "text": "Docker: red bridge por defecto es 172.17.0.0/16. Redes personalizadas pueden usar cualquier CIDR privado. Redes overlay abarcan múltiples hosts.",
              "type": "info"
            },
            {
              "text": "Kubernetes: CIDR de pods típicamente /16, CIDR de servicios es /12 o /16. Cada nodo obtiene una porción /24 para pods por defecto.",
              "type": "info"
            },
            {
              "text": "Routers domésticos: la mayoría usa 192.168.0.0/24 o 192.168.1.0/24. Routers empresariales a menudo usan 10.x.x.x/8 para redes internas grandes.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo CIDR",
          "description": "Conversiones CIDR paso a paso",
          "examples": [
            {
              "title": "CIDR /22 — Red Media",
              "steps": [
                "Entrada: 10.10.0.0/22",
                "Bits de prefijo: 22 → Bits de host: 32 − 22 = 10",
                "Direcciones totales: 2¹⁰ = 1,024",
                "Hosts utilizables: 1,024 − 2 = 1,022 (estándar) | 1,019 (AWS)",
                "Máscara de subred: 255.255.252.0",
                "Rango: 10.10.0.1 – 10.10.3.254 | Broadcast: 10.10.3.255"
              ],
              "result": "10.10.0.0/22 contiene 1,022 hosts utilizables a través de 4 bloques /24 contiguos."
            },
            {
              "title": "Rango IP → CIDR (Inverso)",
              "steps": [
                "Entrada: Inicio 192.168.1.0, Fin 192.168.1.255",
                "Rango abarca 256 direcciones (2⁸)",
                "256 = 2⁸ → prefijo = 32 − 8 = /24",
                "Dirección inicial 192.168.1.0 está alineada al límite /24",
                "Resultado: 192.168.1.0/24 (bloque único cubre todo el rango)",
                "Si el rango fuera 192.168.1.0 – 192.168.2.127: necesita /24 + /25"
              ],
              "result": "La calculadora inversa encuentra el conjunto mínimo de bloques CIDR para cubrir cualquier rango IP."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "¿Qué significa la notación CIDR?",
          "answer": "La notación CIDR combina una dirección IP con una longitud de prefijo separada por una barra. Por ejemplo, 192.168.1.0/24 significa que los primeros 24 de 32 bits identifican la red, dejando 8 bits (256 direcciones) para hosts. La longitud de prefijo reemplaza la notación antigua de máscara de subred — /24 equivale a 255.255.255.0. Números de prefijo más grandes significan redes más pequeñas: /28 tiene 16 direcciones mientras /16 tiene 65,536."
        },
        "1": {
          "question": "¿Cómo convierto una máscara de subred a CIDR?",
          "answer": "Cuenta el número de bits 1 consecutivos en la máscara de subred binaria. Para 255.255.255.0: binario es 11111111.11111111.11111111.00000000 — esos son 24 unos, así que es /24. Un atajo rápido: resta el último octeto no-255 de 256 y encuentra la potencia de 2. Ejemplo: 255.255.255.240 → 256 − 240 = 16 = 2⁴ → 32 − 4 = /28."
        },
        "2": {
          "question": "¿Cuál es la diferencia entre CIDR y VLSM?",
          "answer": "CIDR (Enrutamiento Inter-Dominio Sin Clases) es el sistema de direccionamiento que permite prefijos de red de longitud variable para agregación de rutas. VLSM (Máscara de Subred de Longitud Variable) es la técnica de usar subredes de diferentes tamaños dentro de una sola red. CIDR es la notación y sistema de asignación usado por ISPs; VLSM es la práctica de diseño aplicada dentro de organizaciones."
        },
        "3": {
          "question": "¿Puedo combinar dos bloques CIDR en uno?",
          "answer": "Sí, esto se llama superred o agregación de rutas. Dos bloques contiguos del mismo tamaño pueden combinarse reduciendo el prefijo en 1. Por ejemplo, 10.0.0.0/24 y 10.0.1.0/24 se convierten en 10.0.0.0/23. Los bloques deben ser contiguos y el primer bloque debe estar alineado naturalmente — no puedes agregar 10.0.1.0/24 y 10.0.2.0/24 en un /23 porque 10.0.1.0 no está alineado a un límite /23."
        },
        "4": {
          "question": "¿Cuántas IPs reserva cada proveedor cloud?",
          "answer": "AWS reserva 5 IPs por subred: dirección de red (.0), router VPC (.1), servidor DNS (.2), uso futuro (.3), y broadcast. Azure también reserva 5: red (.0), gateway por defecto (.1), DNS primario (.2), DNS secundario (.3), y broadcast. GCP reserva 4: red (.0), gateway por defecto (.1), penúltima, y broadcast. Así que un /24 da 251 IPs utilizables en AWS/Azure, 252 en GCP, vs 254 estándar."
        },
        "5": {
          "question": "¿Cuál es el bloque CIDR más pequeño enrutable en internet?",
          "answer": "La mayoría de registros de internet (ARIN, RIPE, APNIC) y proveedores de tránsito aceptan /24 como el prefijo más pequeño enrutable. Bloques menores que /24 típicamente son filtrados por routers BGP y no se propagarán globalmente. Algunos proveedores aceptan /25 en acuerdos de peering específicos, pero /24 es el mínimo práctico para alcance global garantizado."
        }
      },
      "detailedTable": {
        "cidrReference": {
          "button": "Ver Todos los Tamaños CIDR",
          "title": "Tabla de Referencia CIDR Completa",
          "columns": {
            "cidr": "CIDR",
            "mask": "Máscara de Subred",
            "addresses": "IPs Totales",
            "usable": "Utilizables (Est)",
            "usableAws": "Utilizables (AWS)"
          }
        }
      },
      "buttons": {
        "calculate": "Calcular",
        "reset": "Reiniciar",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Guardar",
        "saved": "Guardado",
        "saving": "Guardando..."
      },
      "share": {
        "calculatedWith": "Calculado con Kalcufy.com"
      },
      "ui": {
        "results": "Resultados",
        "yourInformation": "Tu Información"
      },
      "accessibility": {
        "mobileResults": "Resumen de resultados",
        "closeModal": "Cerrar",
        "openMenu": "Abrir menú"
      },
      "rating": {
        "title": "Califica esta Calculadora",
        "share": "Compartir",
        "copied": "¡Copiado!",
        "copyLink": "Copiar Enlace",
        "clickToRate": "Clic para calificar",
        "youRated": "Calificaste",
        "stars": "estrellas",
        "averageFrom": "promedio de",
        "ratings": "calificaciones"
      },
      "common": {
        "home": "Inicio",
        "calculators": "Calculadoras"
      },
      "sources": {
        "title": "Fuentes y Referencias"
      }
    },
    pt: {
      "name": "Calculadora CIDR",
      "slug": "calculadora-cidr",
      "subtitle": "Converta entre notação CIDR, máscaras de sub-rede e intervalos de IP. Calcule detalhes de rede com suporte para provedores de nuvem, detecção de superrede e conversão reversa IP-para-CIDR.",
      "breadcrumb": "CIDR",
      "seo": {
        "title": "Calculadora CIDR - Conversor Gratuito de CIDR para Máscara de Sub-rede e Intervalo IP",
        "description": "Converta notação CIDR para máscaras de sub-rede e intervalos IP instantaneamente. Suporta IPs reservados AWS, Azure, GCP, conversão reversa IP-para-CIDR e detecção de superrede. Ferramenta multilíngue gratuita.",
        "shortDescription": "Converta notação CIDR para máscaras de sub-rede e intervalos IP.",
        "keywords": [
          "calculadora cidr",
          "cidr para máscara de sub-rede",
          "calculadora notação cidr",
          "conversor sub-rede para cidr",
          "intervalo ip para cidr",
          "calculadora bloco cidr",
          "aws vpc cidr",
          "calculadora cidr gratuita"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "mode": {
          "label": "Modo de Cálculo",
          "helpText": "CIDR → intervalo IP, ou reverso: intervalo IP → notação CIDR",
          "options": {
            "cidr": "CIDR → Intervalo IP",
            "reverse": "Intervalo IP → CIDR"
          }
        },
        "networkAddress": {
          "label": "Endereço de Rede",
          "helpText": "Endereço IPv4 em decimal pontuado (ex: 192.168.1.0)"
        },
        "cidr": {
          "label": "Comprimento do Prefixo CIDR (/)",
          "helpText": "Número de bits de rede (1–32)",
          "options": {
            "8": "/8 — 255.0.0.0 (16,7M hosts)",
            "9": "/9 — 255.128.0.0 (8,3M hosts)",
            "10": "/10 — 255.192.0.0 (4,1M hosts)",
            "11": "/11 — 255.224.0.0 (2M hosts)",
            "12": "/12 — 255.240.0.0 (1M hosts)",
            "13": "/13 — 255.248.0.0 (524K hosts)",
            "14": "/14 — 255.252.0.0 (262K hosts)",
            "15": "/15 — 255.254.0.0 (131K hosts)",
            "16": "/16 — 255.255.0.0 (65.534 hosts)",
            "17": "/17 — 255.255.128.0 (32.766 hosts)",
            "18": "/18 — 255.255.192.0 (16.382 hosts)",
            "19": "/19 — 255.255.224.0 (8.190 hosts)",
            "20": "/20 — 255.255.240.0 (4.094 hosts)",
            "21": "/21 — 255.255.248.0 (2.046 hosts)",
            "22": "/22 — 255.255.252.0 (1.022 hosts)",
            "23": "/23 — 255.255.254.0 (510 hosts)",
            "24": "/24 — 255.255.255.0 (254 hosts)",
            "25": "/25 — 255.255.255.128 (126 hosts)",
            "26": "/26 — 255.255.255.192 (62 hosts)",
            "27": "/27 — 255.255.255.224 (30 hosts)",
            "28": "/28 — 255.255.255.240 (14 hosts)",
            "29": "/29 — 255.255.255.248 (6 hosts)",
            "30": "/30 — 255.255.255.252 (2 hosts)",
            "31": "/31 — 255.255.255.254 (ponto-a-ponto)",
            "32": "/32 — 255.255.255.255 (host único)"
          }
        },
        "cloudProvider": {
          "label": "Provedor de Nuvem",
          "helpText": "Provedores de nuvem reservam IPs extras por sub-rede — afeta contagem de hosts utilizáveis",
          "options": {
            "standard": "Rede Padrão",
            "aws": "AWS VPC (−5 IPs)",
            "azure": "Azure VNet (−5 IPs)",
            "gcp": "Google Cloud VPC (−4 IPs)"
          }
        },
        "startIp": {
          "label": "Endereço IP Inicial",
          "helpText": "Primeiro endereço IP no intervalo (ex: 192.168.1.0)"
        },
        "endIp": {
          "label": "Endereço IP Final",
          "helpText": "Último endereço IP no intervalo (ex: 192.168.1.255)"
        }
      },
      "results": {
        "cidrNotation": {
          "label": "Notação CIDR"
        },
        "networkAddress": {
          "label": "Endereço de Rede"
        },
        "broadcastAddress": {
          "label": "Endereço de Broadcast"
        },
        "firstUsable": {
          "label": "Primeiro IP Utilizável"
        },
        "lastUsable": {
          "label": "Último IP Utilizável"
        },
        "subnetMask": {
          "label": "Máscara de Sub-rede"
        },
        "wildcardMask": {
          "label": "Máscara Coringa"
        },
        "totalAddresses": {
          "label": "Total de Endereços"
        },
        "usableHosts": {
          "label": "Hosts Utilizáveis"
        },
        "ipClass": {
          "label": "Classe IP"
        },
        "ipType": {
          "label": "Tipo IP"
        },
        "networkBits": {
          "label": "Bits de Rede"
        },
        "hostBits": {
          "label": "Bits de Host"
        },
        "subnetsAvailable": {
          "label": "Sub-redes /24 Internas"
        },
        "reservedIps": {
          "label": "IPs Reservados"
        },
        "nextBlock": {
          "label": "Próximo Bloco CIDR"
        },
        "previousBlock": {
          "label": "Bloco CIDR Anterior"
        },
        "reverseCidrs": {
          "label": "Blocos CIDR"
        }
      },
      "presets": {
        "classC": {
          "label": "/24 Padrão",
          "description": "192.168.1.0/24 — 254 hosts"
        },
        "awsVpc": {
          "label": "AWS VPC /16",
          "description": "10.0.0.0/16 — 65.534 hosts"
        },
        "smallSubnet": {
          "label": "/27 Pequena",
          "description": "172.16.10.0/27 — 30 hosts"
        },
        "largeBlock": {
          "label": "Empresarial /8",
          "description": "10.0.0.0/8 — 16,7M hosts"
        }
      },
      "values": {
        "hosts": "hosts",
        "host": "host",
        "addresses": "endereços",
        "subnets": "sub-redes",
        "bits": "bits",
        "private": "Privado (RFC 1918)",
        "public": "Público",
        "loopback": "Loopback (127.x.x.x)",
        "linkLocal": "Link-Local (169.254.x.x)",
        "multicast": "Multicast (224–239)",
        "reserved": "Reservado",
        "classA": "Classe A (1–126)",
        "classB": "Classe B (128–191)",
        "classC": "Classe C (192–223)",
        "classD": "Classe D (Multicast)",
        "classE": "Classe E (Reservado)"
      },
      "formats": {
        "summary": "{cidrNotation} — Rede: {networkAddress}, Broadcast: {broadcastAddress}, Utilizáveis: {usableHosts} ({firstUsable} – {lastUsable})."
      },
      "infoCards": {
        "metrics": {
          "title": "Intervalo de Rede",
          "items": [
            {
              "label": "Bloco CIDR",
              "valueKey": "cidrNotation"
            },
            {
              "label": "Hosts Utilizáveis",
              "valueKey": "usableHosts"
            },
            {
              "label": "Primeiro Utilizável",
              "valueKey": "firstUsable"
            },
            {
              "label": "Último Utilizável",
              "valueKey": "lastUsable"
            }
          ]
        },
        "details": {
          "title": "Detalhes Técnicos",
          "items": [
            {
              "label": "Máscara Binária",
              "valueKey": "binaryMask"
            },
            {
              "label": "IP Hexadecimal",
              "valueKey": "hexIp"
            },
            {
              "label": "Intervalo IP Completo",
              "valueKey": "ipRange"
            },
            {
              "label": "Info da Superrede",
              "valueKey": "supernetInfo"
            }
          ]
        },
        "tips": {
          "title": "Dicas CIDR",
          "items": [
            "CIDR /24 é o mais comum — equivalente à antiga Classe C (255.255.255.0, 254 hosts utilizáveis).",
            "Cada incremento no prefixo reduz a rede pela metade: /23 = 510, /24 = 254, /25 = 126 hosts.",
            "AWS/Azure reservam 5 IPs por sub-rede, GCP reserva 4 — use o modo nuvem para contagens precisas.",
            "Use o modo reverso (Intervalo IP → CIDR) para encontrar os blocos CIDR mínimos cobrindo qualquer intervalo IP."
          ]
        }
      },
      "chart": {
        "title": "Alocação de Endereços",
        "tabs": {
          "address-breakdown": "Divisão de Endereços"
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é CIDR?",
          "content": "Roteamento Inter-Domínio Sem Classes (CIDR) é um esquema de endereçamento IP que substituiu o antigo sistema com classes (Classe A, B, C) em 1993. O CIDR usa um prefixo de comprimento variável para definir limites de rede, escrito como uma barra seguida pelo número de bits de rede — por exemplo, 10.0.0.0/16. Esta flexibilidade permite que ISPs e organizações aloquem exatamente o espaço de endereço IP que precisam, ao invés de serem forçados a tamanhos fixos de classe. O CIDR também permite agregação de rotas (superrede), onde múltiplas redes contíguas são anunciadas como uma única rota, reduzindo drasticamente o tamanho das tabelas de roteamento da internet. Sem CIDR, a tabela de roteamento global seria ordens de grandeza maior e o esgotamento do IPv4 teria ocorrido muito antes."
        },
        "howItWorks": {
          "title": "Notação CIDR Explicada",
          "content": "Um bloco CIDR como 192.168.0.0/22 significa que os primeiros 22 bits são o prefixo de rede e os 10 bits restantes são para endereços de host. O número total de endereços é sempre 2^(32 − prefixo). Então /22 dá 2^10 = 1.024 endereços (1.022 utilizáveis). O equivalente da máscara de sub-rede é encontrado definindo os primeiros 22 bits como 1: 11111111.11111111.11111100.00000000 = 255.255.252.0. A máscara coringa (usada em ACLs e regras de firewall) é o inverso bitwise: 0.0.3.255. Todo bloco CIDR tem um endereço de rede (todos os bits de host zero) e um endereço de broadcast (todos os bits de host um). IPs utilizáveis ficam entre estes dois, exceto para /31 (RFC 3021 ponto-a-ponto) e /32 (rota de host único)."
        },
        "considerations": {
          "title": "Considerações de Planejamento CIDR",
          "items": [
            {
              "text": "Blocos CIDR devem ser naturalmente alinhados — uma rede /22 deve começar em um múltiplo de 1.024 endereços (todos os bits de host zero).",
              "type": "warning"
            },
            {
              "text": "Superrede: dois blocos /24 contíguos podem ser agregados em um /23, mas apenas se o primeiro bloco começar em um limite par.",
              "type": "info"
            },
            {
              "text": "Provedores de nuvem reservam IPs extras: AWS e Azure reservam 5 por sub-rede (.0, .1, .2, .3, broadcast), GCP reserva 4.",
              "type": "warning"
            },
            {
              "text": "Ao planejar VPCs, use blocos CIDR não sobrepostos para evitar conflitos com VPN, peering ou configurações de nuvem híbrida.",
              "type": "info"
            },
            {
              "text": "A menor sub-rede prática para hosts é /29 (6 IPs utilizáveis após reservas) — tamanhos menores são apenas para links ponto-a-ponto.",
              "type": "info"
            },
            {
              "text": "Registros de internet (ARIN, RIPE, APNIC) exigem /24 mínimo para anúncios BGP globalmente roteáveis.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Tamanhos de Blocos CIDR para Nuvem e Empresa",
          "items": [
            {
              "text": "AWS VPC: suporta /16 a /28 (65.534 a 14 IPs). VPC padrão é 172.31.0.0/16. Reserva .0 (rede), .1 (roteador), .2 (DNS), .3 (futuro), broadcast.",
              "type": "info"
            },
            {
              "text": "Azure VNet: suporta /8 a /29. Reserva .0 (rede), .1 (gateway), .2 (DNS primário), .3 (DNS secundário), broadcast.",
              "type": "info"
            },
            {
              "text": "GCP VPC: suporta /8 a /29. Sub-redes em modo automático usam /20 por região. Reserva .0 (rede), .1 (gateway), broadcast, DHCP.",
              "type": "info"
            },
            {
              "text": "Docker: rede bridge padrão é 172.17.0.0/16. Redes customizadas podem usar qualquer CIDR privado. Redes overlay abrangem múltiplos hosts.",
              "type": "info"
            },
            {
              "text": "Kubernetes: CIDR de pod é tipicamente /16, CIDR de serviço é /12 ou /16. Cada nó recebe uma fatia /24 para pods por padrão.",
              "type": "info"
            },
            {
              "text": "Roteadores domésticos: a maioria usa 192.168.0.0/24 ou 192.168.1.0/24. Roteadores empresariais frequentemente usam 10.x.x.x/8 para grandes redes internas.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo CIDR",
          "description": "Conversões CIDR passo a passo",
          "examples": [
            {
              "title": "CIDR /22 — Rede Média",
              "steps": [
                "Entrada: 10.10.0.0/22",
                "Bits de prefixo: 22 → Bits de host: 32 − 22 = 10",
                "Total de endereços: 2¹⁰ = 1.024",
                "Hosts utilizáveis: 1.024 − 2 = 1.022 (padrão) | 1.019 (AWS)",
                "Máscara de sub-rede: 255.255.252.0",
                "Intervalo: 10.10.0.1 – 10.10.3.254 | Broadcast: 10.10.3.255"
              ],
              "result": "10.10.0.0/22 contém 1.022 hosts utilizáveis através de 4 blocos /24 contíguos."
            },
            {
              "title": "Intervalo IP → CIDR (Reverso)",
              "steps": [
                "Entrada: Início 192.168.1.0, Fim 192.168.1.255",
                "Intervalo abrange 256 endereços (2⁸)",
                "256 = 2⁸ → prefixo = 32 − 8 = /24",
                "Endereço inicial 192.168.1.0 está alinhado ao limite /24",
                "Resultado: 192.168.1.0/24 (bloco único cobre todo o intervalo)",
                "Se intervalo fosse 192.168.1.0 – 192.168.2.127: precisaria /24 + /25"
              ],
              "result": "A calculadora reversa encontra o conjunto mínimo de blocos CIDR para cobrir qualquer intervalo IP."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "O que significa notação CIDR?",
          "answer": "Notação CIDR combina um endereço IP com um comprimento de prefixo separado por uma barra. Por exemplo, 192.168.1.0/24 significa que os primeiros 24 de 32 bits identificam a rede, deixando 8 bits (256 endereços) para hosts. O comprimento do prefixo substitui a notação antiga de máscara de sub-rede — /24 equivale a 255.255.255.0. Números de prefixo maiores significam redes menores: /28 tem 16 endereços enquanto /16 tem 65.536."
        },
        "1": {
          "question": "Como converto uma máscara de sub-rede para CIDR?",
          "answer": "Conte o número de bits 1 consecutivos na máscara de sub-rede binária. Para 255.255.255.0: o binário é 11111111.11111111.11111111.00000000 — são 24 uns, então é /24. Um atalho rápido: subtraia o último octeto não-255 de 256 e encontre a potência de 2. Exemplo: 255.255.255.240 → 256 − 240 = 16 = 2⁴ → 32 − 4 = /28."
        },
        "2": {
          "question": "Qual é a diferença entre CIDR e VLSM?",
          "answer": "CIDR (Roteamento Inter-Domínio Sem Classes) é o sistema de endereçamento que permite prefixos de rede de comprimento variável para agregação de rotas. VLSM (Mascaramento de Sub-rede de Comprimento Variável) é a técnica de usar sub-redes de tamanhos diferentes dentro de uma única rede. CIDR é a notação e sistema de alocação usado por ISPs; VLSM é a prática de design aplicada dentro de organizações."
        },
        "3": {
          "question": "Posso combinar dois blocos CIDR em um?",
          "answer": "Sim, isso é chamado de superrede ou agregação de rotas. Dois blocos contíguos do mesmo tamanho podem ser combinados reduzindo o prefixo em 1. Por exemplo, 10.0.0.0/24 e 10.0.1.0/24 se tornam 10.0.0.0/23. Os blocos devem ser contíguos e o primeiro bloco deve estar naturalmente alinhado — você não pode agregar 10.0.1.0/24 e 10.0.2.0/24 em um /23 porque 10.0.1.0 não está alinhado a um limite /23."
        },
        "4": {
          "question": "Quantos IPs cada provedor de nuvem reserva?",
          "answer": "AWS reserva 5 IPs por sub-rede: endereço de rede (.0), roteador VPC (.1), servidor DNS (.2), uso futuro (.3) e broadcast. Azure também reserva 5: rede (.0), gateway padrão (.1), DNS primário (.2), DNS secundário (.3) e broadcast. GCP reserva 4: rede (.0), gateway padrão (.1), penúltimo e broadcast. Então um /24 dá 251 IPs utilizáveis na AWS/Azure, 252 no GCP, vs 254 padrão."
        },
        "5": {
          "question": "Qual é o menor bloco CIDR roteável na internet?",
          "answer": "A maioria dos registros de internet (ARIN, RIPE, APNIC) e provedores de trânsito aceitam /24 como o menor prefixo roteável. Blocos menores que /24 são tipicamente filtrados por roteadores BGP e não se propagam globalmente. Alguns provedores aceitam /25 em acordos de peering específicos, mas /24 é o mínimo prático para alcançabilidade global garantida."
        }
      },
      "detailedTable": {
        "cidrReference": {
          "button": "Ver Todos os Tamanhos CIDR",
          "title": "Tabela de Referência CIDR Completa",
          "columns": {
            "cidr": "CIDR",
            "mask": "Máscara de Sub-rede",
            "addresses": "Total IPs",
            "usable": "Utilizáveis (Padrão)",
            "usableAws": "Utilizáveis (AWS)"
          }
        }
      },
      "buttons": {
        "calculate": "Calcular",
        "reset": "Reiniciar",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Salvar",
        "saved": "Salvo",
        "saving": "Salvando..."
      },
      "share": {
        "calculatedWith": "Calculado com Kalcufy.com"
      },
      "ui": {
        "results": "Resultados",
        "yourInformation": "Suas Informações"
      },
      "accessibility": {
        "mobileResults": "Resumo dos resultados",
        "closeModal": "Fechar",
        "openMenu": "Abrir menu"
      },
      "rating": {
        "title": "Avalie esta Calculadora",
        "share": "Compartilhar",
        "copied": "Copiado!",
        "copyLink": "Copiar Link",
        "clickToRate": "Clique para avaliar",
        "youRated": "Você avaliou",
        "stars": "estrelas",
        "averageFrom": "média de",
        "ratings": "avaliações"
      },
      "common": {
        "home": "Início",
        "calculators": "Calculadoras"
      },
      "sources": {
        "title": "Fontes e Referências"
      }
    },
    fr: {
      "name": "Calculateur CIDR",
      "slug": "calculateur-cidr",
      "subtitle": "Convertit entre la notation CIDR, les masques de sous-réseau et les plages IP. Calcule les détails réseau avec support des fournisseurs cloud, détection de superréseau et conversion inverse IP vers CIDR.",
      "breadcrumb": "CIDR",
      "seo": {
        "title": "Calculateur CIDR - Convertisseur Gratuit CIDR vers Masque de Sous-réseau et Plage IP",
        "description": "Convertissez instantanément la notation CIDR vers masques de sous-réseau et plages IP. Supporte les IP réservées AWS, Azure, GCP, conversion inverse IP vers CIDR et détection de superréseau. Outil multilingue gratuit.",
        "shortDescription": "Convertit la notation CIDR vers masques de sous-réseau et plages IP.",
        "keywords": [
          "calculateur cidr",
          "cidr vers masque sous réseau",
          "calculateur notation cidr",
          "convertisseur sous réseau vers cidr",
          "plage ip vers cidr",
          "calculateur bloc cidr",
          "aws vpc cidr",
          "calculateur cidr gratuit"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "mode": {
          "label": "Mode de Calcul",
          "helpText": "CIDR → plage IP, ou inverse : plage IP → notation CIDR",
          "options": {
            "cidr": "CIDR → Plage IP",
            "reverse": "Plage IP → CIDR"
          }
        },
        "networkAddress": {
          "label": "Adresse Réseau",
          "helpText": "Adresse IPv4 en notation décimale pointée (ex. 192.168.1.0)"
        },
        "cidr": {
          "label": "Longueur Préfixe CIDR (/)",
          "helpText": "Nombre de bits réseau (1–32)",
          "options": {
            "8": "/8 — 255.0.0.0 (16,7M hôtes)",
            "9": "/9 — 255.128.0.0 (8,3M hôtes)",
            "10": "/10 — 255.192.0.0 (4,1M hôtes)",
            "11": "/11 — 255.224.0.0 (2M hôtes)",
            "12": "/12 — 255.240.0.0 (1M hôtes)",
            "13": "/13 — 255.248.0.0 (524K hôtes)",
            "14": "/14 — 255.252.0.0 (262K hôtes)",
            "15": "/15 — 255.254.0.0 (131K hôtes)",
            "16": "/16 — 255.255.0.0 (65 534 hôtes)",
            "17": "/17 — 255.255.128.0 (32 766 hôtes)",
            "18": "/18 — 255.255.192.0 (16 382 hôtes)",
            "19": "/19 — 255.255.224.0 (8 190 hôtes)",
            "20": "/20 — 255.255.240.0 (4 094 hôtes)",
            "21": "/21 — 255.255.248.0 (2 046 hôtes)",
            "22": "/22 — 255.255.252.0 (1 022 hôtes)",
            "23": "/23 — 255.255.254.0 (510 hôtes)",
            "24": "/24 — 255.255.255.0 (254 hôtes)",
            "25": "/25 — 255.255.255.128 (126 hôtes)",
            "26": "/26 — 255.255.255.192 (62 hôtes)",
            "27": "/27 — 255.255.255.224 (30 hôtes)",
            "28": "/28 — 255.255.255.240 (14 hôtes)",
            "29": "/29 — 255.255.255.248 (6 hôtes)",
            "30": "/30 — 255.255.255.252 (2 hôtes)",
            "31": "/31 — 255.255.255.254 (point à point)",
            "32": "/32 — 255.255.255.255 (hôte unique)"
          }
        },
        "cloudProvider": {
          "label": "Fournisseur Cloud",
          "helpText": "Les fournisseurs cloud réservent des IP supplémentaires par sous-réseau — affecte le nombre d'hôtes utilisables",
          "options": {
            "standard": "Réseau Standard",
            "aws": "AWS VPC (−5 IP)",
            "azure": "Azure VNet (−5 IP)",
            "gcp": "Google Cloud VPC (−4 IP)"
          }
        },
        "startIp": {
          "label": "Adresse IP de Début",
          "helpText": "Première adresse IP de la plage (ex. 192.168.1.0)"
        },
        "endIp": {
          "label": "Adresse IP de Fin",
          "helpText": "Dernière adresse IP de la plage (ex. 192.168.1.255)"
        }
      },
      "results": {
        "cidrNotation": {
          "label": "Notation CIDR"
        },
        "networkAddress": {
          "label": "Adresse Réseau"
        },
        "broadcastAddress": {
          "label": "Adresse de Diffusion"
        },
        "firstUsable": {
          "label": "Première IP Utilisable"
        },
        "lastUsable": {
          "label": "Dernière IP Utilisable"
        },
        "subnetMask": {
          "label": "Masque de Sous-réseau"
        },
        "wildcardMask": {
          "label": "Masque Générique"
        },
        "totalAddresses": {
          "label": "Adresses Totales"
        },
        "usableHosts": {
          "label": "Hôtes Utilisables"
        },
        "ipClass": {
          "label": "Classe IP"
        },
        "ipType": {
          "label": "Type IP"
        },
        "networkBits": {
          "label": "Bits Réseau"
        },
        "hostBits": {
          "label": "Bits Hôte"
        },
        "subnetsAvailable": {
          "label": "Sous-réseaux /24 Intégrés"
        },
        "reservedIps": {
          "label": "IP Réservées"
        },
        "nextBlock": {
          "label": "Bloc CIDR Suivant"
        },
        "previousBlock": {
          "label": "Bloc CIDR Précédent"
        },
        "reverseCidrs": {
          "label": "Blocs CIDR"
        }
      },
      "presets": {
        "classC": {
          "label": "Standard /24",
          "description": "192.168.1.0/24 — 254 hôtes"
        },
        "awsVpc": {
          "label": "AWS VPC /16",
          "description": "10.0.0.0/16 — 65 534 hôtes"
        },
        "smallSubnet": {
          "label": "Petit /27",
          "description": "172.16.10.0/27 — 30 hôtes"
        },
        "largeBlock": {
          "label": "Entreprise /8",
          "description": "10.0.0.0/8 — 16,7M hôtes"
        }
      },
      "values": {
        "hosts": "hôtes",
        "host": "hôte",
        "addresses": "adresses",
        "subnets": "sous-réseaux",
        "bits": "bits",
        "private": "Privée (RFC 1918)",
        "public": "Publique",
        "loopback": "Bouclage (127.x.x.x)",
        "linkLocal": "Lien Local (169.254.x.x)",
        "multicast": "Multidiffusion (224–239)",
        "reserved": "Réservée",
        "classA": "Classe A (1–126)",
        "classB": "Classe B (128–191)",
        "classC": "Classe C (192–223)",
        "classD": "Classe D (Multidiffusion)",
        "classE": "Classe E (Réservée)"
      },
      "formats": {
        "summary": "{cidrNotation} — Réseau : {networkAddress}, Diffusion : {broadcastAddress}, Utilisable : {usableHosts} ({firstUsable} – {lastUsable})."
      },
      "infoCards": {
        "metrics": {
          "title": "Plage Réseau",
          "items": [
            {
              "label": "Bloc CIDR",
              "valueKey": "cidrNotation"
            },
            {
              "label": "Hôtes Utilisables",
              "valueKey": "usableHosts"
            },
            {
              "label": "Première Utilisable",
              "valueKey": "firstUsable"
            },
            {
              "label": "Dernière Utilisable",
              "valueKey": "lastUsable"
            }
          ]
        },
        "details": {
          "title": "Détails Techniques",
          "items": [
            {
              "label": "Masque Binaire",
              "valueKey": "binaryMask"
            },
            {
              "label": "IP Hexadécimale",
              "valueKey": "hexIp"
            },
            {
              "label": "Plage IP Complète",
              "valueKey": "ipRange"
            },
            {
              "label": "Info Superréseau",
              "valueKey": "supernetInfo"
            }
          ]
        },
        "tips": {
          "title": "Conseils CIDR",
          "items": [
            "CIDR /24 est le plus courant — équivalent à l'ancienne Classe C (255.255.255.0, 254 hôtes utilisables).",
            "Chaque étape du préfixe divise le réseau par deux : /23 = 510, /24 = 254, /25 = 126 hôtes.",
            "AWS/Azure réservent 5 IP par sous-réseau, GCP en réserve 4 — utilisez le mode cloud pour des comptes précis.",
            "Utilisez le mode inverse (Plage IP → CIDR) pour trouver les blocs CIDR minimaux couvrant toute plage IP."
          ]
        }
      },
      "chart": {
        "title": "Allocation d'Adresses",
        "tabs": {
          "address-breakdown": "Répartition des Adresses"
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que CIDR ?",
          "content": "Le routage inter-domaine sans classe (CIDR) est un schéma d'adressage IP qui a remplacé l'ancien système par classes (Classe A, B, C) en 1993. CIDR utilise un préfixe de longueur variable pour définir les limites réseau, écrit sous forme de barre oblique suivie du nombre de bits réseau — par exemple, 10.0.0.0/16. Cette flexibilité permet aux FAI et organisations d'allouer exactement l'espace d'adressage IP dont ils ont besoin, plutôt que d'être contraints à des tailles de classe fixes. CIDR permet aussi l'agrégation de routes (superréseau), où plusieurs réseaux contigus sont annoncés comme une seule route, réduisant drastiquement la taille des tables de routage internet. Sans CIDR, la table de routage globale serait plusieurs ordres de grandeur plus large et l'épuisement IPv4 aurait eu lieu bien plus tôt."
        },
        "howItWorks": {
          "title": "Notation CIDR Expliquée",
          "content": "Un bloc CIDR comme 192.168.0.0/22 signifie que les 22 premiers bits constituent le préfixe réseau et les 10 bits restants sont pour les adresses d'hôtes. Le nombre total d'adresses est toujours 2^(32 − préfixe). Donc /22 donne 2^10 = 1 024 adresses (1 022 utilisables). Le masque de sous-réseau équivalent se trouve en mettant les 22 premiers bits à 1 : 11111111.11111111.11111100.00000000 = 255.255.252.0. Le masque générique (utilisé dans les ACL et règles pare-feu) est l'inverse binaire : 0.0.3.255. Chaque bloc CIDR a une adresse réseau (tous les bits hôte à zéro) et une adresse de diffusion (tous les bits hôte à un). Les IP utilisables se situent entre ces deux, sauf pour /31 (RFC 3021 point à point) et /32 (route hôte unique)."
        },
        "considerations": {
          "title": "Considérations de Planification CIDR",
          "items": [
            {
              "text": "Les blocs CIDR doivent être naturellement alignés — un réseau /22 doit commencer à un multiple de 1 024 adresses (tous les bits hôte à zéro).",
              "type": "warning"
            },
            {
              "text": "Superréseau : deux blocs /24 contigus peuvent être agrégés en un /23, mais seulement si le premier bloc commence à une limite paire.",
              "type": "info"
            },
            {
              "text": "Les fournisseurs cloud réservent des IP supplémentaires : AWS et Azure réservent 5 par sous-réseau (.0, .1, .2, .3, diffusion), GCP en réserve 4.",
              "type": "warning"
            },
            {
              "text": "Lors de la planification VPC, utilisez des blocs CIDR non chevauchants pour éviter les conflits avec VPN, peering ou configurations cloud hybrides.",
              "type": "info"
            },
            {
              "text": "Le plus petit sous-réseau pratique pour les hôtes est /29 (6 IP utilisables après réservations) — les tailles plus petites sont uniquement pour les liens point à point.",
              "type": "info"
            },
            {
              "text": "Les registres internet (ARIN, RIPE, APNIC) exigent /24 minimum pour les annonces BGP globalement routables.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Tailles de Blocs CIDR pour Cloud et Entreprise",
          "items": [
            {
              "text": "AWS VPC : supporte /16 à /28 (65 534 à 14 IP). VPC par défaut est 172.31.0.0/16. Réserve .0 (réseau), .1 (routeur), .2 (DNS), .3 (futur), diffusion.",
              "type": "info"
            },
            {
              "text": "Azure VNet : supporte /8 à /29. Réserve .0 (réseau), .1 (passerelle), .2 (DNS primaire), .3 (DNS secondaire), diffusion.",
              "type": "info"
            },
            {
              "text": "GCP VPC : supporte /8 à /29. Sous-réseaux auto-mode utilisent /20 par région. Réserve .0 (réseau), .1 (passerelle), diffusion, DHCP.",
              "type": "info"
            },
            {
              "text": "Docker : réseau pont par défaut est 172.17.0.0/16. Réseaux personnalisés peuvent utiliser tout CIDR privé. Réseaux overlay couvrent plusieurs hôtes.",
              "type": "info"
            },
            {
              "text": "Kubernetes : CIDR pod est typiquement /16, CIDR service est /12 ou /16. Chaque nœud obtient une tranche /24 pour les pods par défaut.",
              "type": "info"
            },
            {
              "text": "Routeurs domestiques : la plupart utilisent 192.168.0.0/24 ou 192.168.1.0/24. Routeurs entreprise utilisent souvent 10.x.x.x/8 pour de grands réseaux internes.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul CIDR",
          "description": "Conversions CIDR étape par étape",
          "examples": [
            {
              "title": "CIDR /22 — Réseau Moyen",
              "steps": [
                "Entrée : 10.10.0.0/22",
                "Bits préfixe : 22 → Bits hôte : 32 − 22 = 10",
                "Adresses totales : 2¹⁰ = 1 024",
                "Hôtes utilisables : 1 024 − 2 = 1 022 (standard) | 1 019 (AWS)",
                "Masque sous-réseau : 255.255.252.0",
                "Plage : 10.10.0.1 – 10.10.3.254 | Diffusion : 10.10.3.255"
              ],
              "result": "10.10.0.0/22 contient 1 022 hôtes utilisables à travers 4 blocs /24 contigus."
            },
            {
              "title": "Plage IP → CIDR (Inverse)",
              "steps": [
                "Entrée : Début 192.168.1.0, Fin 192.168.1.255",
                "Plage couvre 256 adresses (2⁸)",
                "256 = 2⁸ → préfixe = 32 − 8 = /24",
                "Adresse début 192.168.1.0 est alignée à la limite /24",
                "Résultat : 192.168.1.0/24 (bloc unique couvre toute la plage)",
                "Si plage était 192.168.1.0 – 192.168.2.127 : nécessite /24 + /25"
              ],
              "result": "Le calculateur inverse trouve l'ensemble minimal de blocs CIDR pour couvrir toute plage IP."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Que signifie la notation CIDR ?",
          "answer": "La notation CIDR combine une adresse IP avec une longueur de préfixe séparée par une barre oblique. Par exemple, 192.168.1.0/24 signifie que les 24 premiers des 32 bits identifient le réseau, laissant 8 bits (256 adresses) pour les hôtes. La longueur de préfixe remplace l'ancienne notation de masque de sous-réseau — /24 équivaut à 255.255.255.0. Des nombres de préfixe plus grands signifient des réseaux plus petits : /28 a 16 adresses tandis que /16 en a 65 536."
        },
        "1": {
          "question": "Comment convertir un masque de sous-réseau en CIDR ?",
          "answer": "Comptez le nombre de bits à 1 consécutifs dans le masque de sous-réseau binaire. Pour 255.255.255.0 : le binaire est 11111111.11111111.11111111.00000000 — c'est 24 uns, donc c'est /24. Un raccourci rapide : soustrayez le dernier octet non-255 de 256 et trouvez la puissance de 2. Exemple : 255.255.255.240 → 256 − 240 = 16 = 2⁴ → 32 − 4 = /28."
        },
        "2": {
          "question": "Quelle est la différence entre CIDR et VLSM ?",
          "answer": "CIDR (routage inter-domaine sans classe) est le système d'adressage qui permet des préfixes réseau de longueur variable pour l'agrégation de routes. VLSM (masquage de sous-réseau à longueur variable) est la technique d'utiliser des sous-réseaux de tailles différentes au sein d'un même réseau. CIDR est la notation et le système d'allocation utilisé par les FAI ; VLSM est la pratique de conception appliquée au sein des organisations."
        },
        "3": {
          "question": "Puis-je combiner deux blocs CIDR en un seul ?",
          "answer": "Oui, cela s'appelle le superréseau ou agrégation de routes. Deux blocs contigus de même taille peuvent être combinés en réduisant le préfixe de 1. Par exemple, 10.0.0.0/24 et 10.0.1.0/24 deviennent 10.0.0.0/23. Les blocs doivent être contigus et le premier bloc doit être naturellement aligné — vous ne pouvez pas agréger 10.0.1.0/24 et 10.0.2.0/24 en un /23 car 10.0.1.0 n'est pas aligné à une limite /23."
        },
        "4": {
          "question": "Combien d'IP chaque fournisseur cloud réserve-t-il ?",
          "answer": "AWS réserve 5 IP par sous-réseau : adresse réseau (.0), routeur VPC (.1), serveur DNS (.2), usage futur (.3), et diffusion. Azure réserve aussi 5 : réseau (.0), passerelle par défaut (.1), DNS primaire (.2), DNS secondaire (.3), et diffusion. GCP réserve 4 : réseau (.0), passerelle par défaut (.1), avant-dernière, et diffusion. Donc un /24 donne 251 IP utilisables sur AWS/Azure, 252 sur GCP, vs 254 standard."
        },
        "5": {
          "question": "Quel est le plus petit bloc CIDR routable sur internet ?",
          "answer": "La plupart des registres internet (ARIN, RIPE, APNIC) et fournisseurs de transit acceptent /24 comme plus petit préfixe routable. Les blocs plus petits que /24 sont généralement filtrés par les routeurs BGP et ne se propagent pas globalement. Certains fournisseurs acceptent /25 dans des arrangements de peering spécifiques, mais /24 est le minimum pratique pour une accessibilité globale garantie."
        }
      },
      "detailedTable": {
        "cidrReference": {
          "button": "Voir Toutes les Tailles CIDR",
          "title": "Table de Référence CIDR Complète",
          "columns": {
            "cidr": "CIDR",
            "mask": "Masque Sous-réseau",
            "addresses": "IP Totales",
            "usable": "Utilisables (Std)",
            "usableAws": "Utilisables (AWS)"
          }
        }
      },
      "buttons": {
        "calculate": "Calculer",
        "reset": "Réinitialiser",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Sauvegarder",
        "saved": "Sauvegardé",
        "saving": "Sauvegarde..."
      },
      "share": {
        "calculatedWith": "Calculé avec Kalcufy.com"
      },
      "ui": {
        "results": "Résultats",
        "yourInformation": "Vos Informations"
      },
      "accessibility": {
        "mobileResults": "Résumé des résultats",
        "closeModal": "Fermer",
        "openMenu": "Ouvrir le menu"
      },
      "rating": {
        "title": "Notez cette Calculatrice",
        "share": "Partager",
        "copied": "Copié!",
        "copyLink": "Copier le Lien",
        "clickToRate": "Cliquez pour noter",
        "youRated": "Vous avez noté",
        "stars": "étoiles",
        "averageFrom": "moyenne de",
        "ratings": "évaluations"
      },
      "common": {
        "home": "Accueil",
        "calculators": "Calculatrices"
      },
      "sources": {
        "title": "Sources et Références"
      }
    },
    de: {
      "name": "CIDR Rechner",
      "slug": "cidr-rechner",
      "subtitle": "Konvertiere zwischen CIDR-Notation, Subnetzmasken und IP-Bereichen. Berechne Netzwerkdetails mit Cloud-Provider-Unterstützung, Supernetz-Erkennung und umgekehrter IP-zu-CIDR-Konvertierung.",
      "breadcrumb": "CIDR",
      "seo": {
        "title": "CIDR Rechner - Kostenloser CIDR zu Subnetzmaske & IP-Bereich Konverter",
        "description": "Konvertiere CIDR-Notation sofort zu Subnetzmasken und IP-Bereichen. Unterstützt AWS, Azure, GCP reservierte IPs, umgekehrte IP-zu-CIDR-Konvertierung und Supernetz-Erkennung. Kostenloses mehrsprachiges Tool.",
        "shortDescription": "Konvertiere CIDR-Notation zu Subnetzmasken und IP-Bereichen.",
        "keywords": [
          "cidr rechner",
          "cidr zu subnetzmaske",
          "cidr notation rechner",
          "subnetz zu cidr konverter",
          "ip bereich zu cidr",
          "cidr block rechner",
          "aws vpc cidr",
          "kostenloser cidr rechner"
        ]
      },
      "inputs": {
        "mode": {
          "label": "Berechnungsmodus",
          "helpText": "CIDR → IP-Bereich oder umgekehrt: IP-Bereich → CIDR-Notation",
          "options": {
            "cidr": "CIDR → IP-Bereich",
            "reverse": "IP-Bereich → CIDR"
          }
        },
        "networkAddress": {
          "label": "Netzwerkadresse",
          "helpText": "IPv4-Adresse in gepunkteter Dezimaldarstellung (z.B. 192.168.1.0)"
        },
        "cidr": {
          "label": "CIDR-Präfixlänge (/)",
          "helpText": "Anzahl der Netzwerkbits (1–32)",
          "options": {
            "8": "/8 — 255.0.0.0 (16,7M Hosts)",
            "9": "/9 — 255.128.0.0 (8,3M Hosts)",
            "10": "/10 — 255.192.0.0 (4,1M Hosts)",
            "11": "/11 — 255.224.0.0 (2M Hosts)",
            "12": "/12 — 255.240.0.0 (1M Hosts)",
            "13": "/13 — 255.248.0.0 (524K Hosts)",
            "14": "/14 — 255.252.0.0 (262K Hosts)",
            "15": "/15 — 255.254.0.0 (131K Hosts)",
            "16": "/16 — 255.255.0.0 (65.534 Hosts)",
            "17": "/17 — 255.255.128.0 (32.766 Hosts)",
            "18": "/18 — 255.255.192.0 (16.382 Hosts)",
            "19": "/19 — 255.255.224.0 (8.190 Hosts)",
            "20": "/20 — 255.255.240.0 (4.094 Hosts)",
            "21": "/21 — 255.255.248.0 (2.046 Hosts)",
            "22": "/22 — 255.255.252.0 (1.022 Hosts)",
            "23": "/23 — 255.255.254.0 (510 Hosts)",
            "24": "/24 — 255.255.255.0 (254 Hosts)",
            "25": "/25 — 255.255.255.128 (126 Hosts)",
            "26": "/26 — 255.255.255.192 (62 Hosts)",
            "27": "/27 — 255.255.255.224 (30 Hosts)",
            "28": "/28 — 255.255.255.240 (14 Hosts)",
            "29": "/29 — 255.255.255.248 (6 Hosts)",
            "30": "/30 — 255.255.255.252 (2 Hosts)",
            "31": "/31 — 255.255.255.254 (Punkt-zu-Punkt)",
            "32": "/32 — 255.255.255.255 (einzelner Host)"
          }
        },
        "cloudProvider": {
          "label": "Cloud-Anbieter",
          "helpText": "Cloud-Anbieter reservieren zusätzliche IPs pro Subnetz — beeinflusst die nutzbare Host-Anzahl",
          "options": {
            "standard": "Standard-Netzwerk",
            "aws": "AWS VPC (−5 IPs)",
            "azure": "Azure VNet (−5 IPs)",
            "gcp": "Google Cloud VPC (−4 IPs)"
          }
        },
        "startIp": {
          "label": "Start-IP-Adresse",
          "helpText": "Erste IP-Adresse im Bereich (z.B. 192.168.1.0)"
        },
        "endIp": {
          "label": "End-IP-Adresse",
          "helpText": "Letzte IP-Adresse im Bereich (z.B. 192.168.1.255)"
        }
      },
      "results": {
        "cidrNotation": {
          "label": "CIDR-Notation"
        },
        "networkAddress": {
          "label": "Netzwerkadresse"
        },
        "broadcastAddress": {
          "label": "Broadcast-Adresse"
        },
        "firstUsable": {
          "label": "Erste nutzbare IP"
        },
        "lastUsable": {
          "label": "Letzte nutzbare IP"
        },
        "subnetMask": {
          "label": "Subnetzmaske"
        },
        "wildcardMask": {
          "label": "Wildcard-Maske"
        },
        "totalAddresses": {
          "label": "Gesamtadressen"
        },
        "usableHosts": {
          "label": "Nutzbare Hosts"
        },
        "ipClass": {
          "label": "IP-Klasse"
        },
        "ipType": {
          "label": "IP-Typ"
        },
        "networkBits": {
          "label": "Netzwerkbits"
        },
        "hostBits": {
          "label": "Host-Bits"
        },
        "subnetsAvailable": {
          "label": "/24 Subnetze innen"
        },
        "reservedIps": {
          "label": "Reservierte IPs"
        },
        "nextBlock": {
          "label": "Nächster CIDR-Block"
        },
        "previousBlock": {
          "label": "Vorheriger CIDR-Block"
        },
        "reverseCidrs": {
          "label": "CIDR-Blöcke"
        }
      },
      "presets": {
        "classC": {
          "label": "Standard /24",
          "description": "192.168.1.0/24 — 254 Hosts"
        },
        "awsVpc": {
          "label": "AWS VPC /16",
          "description": "10.0.0.0/16 — 65.534 Hosts"
        },
        "smallSubnet": {
          "label": "Kleines /27",
          "description": "172.16.10.0/27 — 30 Hosts"
        },
        "largeBlock": {
          "label": "Unternehmen /8",
          "description": "10.0.0.0/8 — 16,7M Hosts"
        }
      },
      "values": {
        "hosts": "Hosts",
        "host": "Host",
        "addresses": "Adressen",
        "subnets": "Subnetze",
        "bits": "Bits",
        "private": "Privat (RFC 1918)",
        "public": "Öffentlich",
        "loopback": "Loopback (127.x.x.x)",
        "linkLocal": "Link-Lokal (169.254.x.x)",
        "multicast": "Multicast (224–239)",
        "reserved": "Reserviert",
        "classA": "Klasse A (1–126)",
        "classB": "Klasse B (128–191)",
        "classC": "Klasse C (192–223)",
        "classD": "Klasse D (Multicast)",
        "classE": "Klasse E (Reserviert)"
      },
      "formats": {
        "summary": "{cidrNotation} — Netzwerk: {networkAddress}, Broadcast: {broadcastAddress}, Nutzbar: {usableHosts} ({firstUsable} – {lastUsable})."
      },
      "infoCards": {
        "metrics": {
          "title": "Netzwerkbereich",
          "items": [
            {
              "label": "CIDR-Block",
              "valueKey": "cidrNotation"
            },
            {
              "label": "Nutzbare Hosts",
              "valueKey": "usableHosts"
            },
            {
              "label": "Erste nutzbare",
              "valueKey": "firstUsable"
            },
            {
              "label": "Letzte nutzbare",
              "valueKey": "lastUsable"
            }
          ]
        },
        "details": {
          "title": "Technische Details",
          "items": [
            {
              "label": "Binäre Maske",
              "valueKey": "binaryMask"
            },
            {
              "label": "Hex IP",
              "valueKey": "hexIp"
            },
            {
              "label": "Vollständiger IP-Bereich",
              "valueKey": "ipRange"
            },
            {
              "label": "Supernetz-Info",
              "valueKey": "supernetInfo"
            }
          ]
        },
        "tips": {
          "title": "CIDR-Tipps",
          "items": [
            "CIDR /24 ist das gebräuchlichste — entspricht der alten Klasse C (255.255.255.0, 254 nutzbare Hosts).",
            "Jeder Schritt nach oben im Präfix halbiert das Netzwerk: /23 = 510, /24 = 254, /25 = 126 Hosts.",
            "AWS/Azure reservieren 5 IPs pro Subnetz, GCP reserviert 4 — verwende den Cloud-Modus für genaue Zahlen.",
            "Verwende den umgekehrten Modus (IP-Bereich → CIDR) um die minimalen CIDR-Blöcke zu finden, die jeden IP-Bereich abdecken."
          ]
        }
      },
      "chart": {
        "title": "Adresszuweisung",
        "tabs": {
          "address-breakdown": "Adressaufteilung"
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist CIDR?",
          "content": "Classless Inter-Domain Routing (CIDR) ist ein IP-Adressierungsschema, das das alte klassenbasierte System (Klasse A, B, C) 1993 ersetzte. CIDR verwendet ein Präfix variabler Länge zur Definition von Netzwerkgrenzen, geschrieben als Schrägstrich gefolgt von der Anzahl der Netzwerkbits — zum Beispiel 10.0.0.0/16. Diese Flexibilität ermöglicht es ISPs und Organisationen, genau den benötigten IP-Adressraum zuzuteilen, anstatt auf feste Klassengrößen beschränkt zu sein. CIDR ermöglicht auch Route-Aggregation (Supernetting), bei der mehrere zusammenhängende Netzwerke als eine einzige Route beworben werden, was die Größe der Internet-Routing-Tabellen drastisch reduziert. Ohne CIDR wäre die globale Routing-Tabelle um Größenordnungen größer und die IPv4-Erschöpfung wäre viel früher eingetreten."
        },
        "howItWorks": {
          "title": "CIDR-Notation erklärt",
          "content": "Ein CIDR-Block wie 192.168.0.0/22 bedeutet, dass die ersten 22 Bits das Netzwerkpräfix sind und die verbleibenden 10 Bits für Host-Adressen verwendet werden. Die Gesamtanzahl der Adressen ist immer 2^(32 − Präfix). Also ergibt /22 2^10 = 1.024 Adressen (1.022 nutzbare). Die entsprechende Subnetzmaske wird gefunden, indem die ersten 22 Bits auf 1 gesetzt werden: 11111111.11111111.11111100.00000000 = 255.255.252.0. Die Wildcard-Maske (in ACLs und Firewall-Regeln verwendet) ist die bitweise Umkehrung: 0.0.3.255. Jeder CIDR-Block hat eine Netzwerkadresse (alle Host-Bits null) und eine Broadcast-Adresse (alle Host-Bits eins). Nutzbare IPs liegen zwischen diesen beiden, außer für /31 (RFC 3021 Punkt-zu-Punkt) und /32 (einzelne Host-Route)."
        },
        "considerations": {
          "title": "CIDR-Planungsüberlegungen",
          "items": [
            {
              "text": "CIDR-Blöcke müssen natürlich ausgerichtet sein — ein /22-Netzwerk muss bei einem Vielfachen von 1.024 Adressen beginnen (alle Host-Bits null).",
              "type": "warning"
            },
            {
              "text": "Supernetting: zwei zusammenhängende /24-Blöcke können zu einem /23 aggregiert werden, aber nur wenn der erste Block an einer geraden Grenze beginnt.",
              "type": "info"
            },
            {
              "text": "Cloud-Anbieter reservieren zusätzliche IPs: AWS und Azure reservieren 5 pro Subnetz (.0, .1, .2, .3, Broadcast), GCP reserviert 4.",
              "type": "warning"
            },
            {
              "text": "Bei der VPC-Planung verwende nicht überlappende CIDR-Blöcke, um Konflikte mit VPN, Peering oder Hybrid-Cloud-Setups zu vermeiden.",
              "type": "info"
            },
            {
              "text": "Das kleinste praktische Subnetz für Hosts ist /29 (6 nutzbare IPs nach Reservierungen) — kleinere Größen sind nur für Punkt-zu-Punkt-Links.",
              "type": "info"
            },
            {
              "text": "Internet-Registrierungsstellen (ARIN, RIPE, APNIC) erfordern mindestens /24 für global routbare BGP-Ankündigungen.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "CIDR-Blockgrößen für Cloud & Unternehmen",
          "items": [
            {
              "text": "AWS VPC: unterstützt /16 bis /28 (65.534 bis 14 IPs). Standard-VPC ist 172.31.0.0/16. Reserviert .0 (Netzwerk), .1 (Router), .2 (DNS), .3 (Zukunft), Broadcast.",
              "type": "info"
            },
            {
              "text": "Azure VNet: unterstützt /8 bis /29. Reserviert .0 (Netzwerk), .1 (Gateway), .2 (DNS primär), .3 (DNS sekundär), Broadcast.",
              "type": "info"
            },
            {
              "text": "GCP VPC: unterstützt /8 bis /29. Auto-Modus-Subnetze verwenden /20 pro Region. Reserviert .0 (Netzwerk), .1 (Gateway), Broadcast, DHCP.",
              "type": "info"
            },
            {
              "text": "Docker: Standard-Bridge-Netzwerk ist 172.17.0.0/16. Benutzerdefinierte Netzwerke können jedes private CIDR verwenden. Overlay-Netzwerke erstrecken sich über mehrere Hosts.",
              "type": "info"
            },
            {
              "text": "Kubernetes: Pod-CIDR ist typischerweise /16, Service-CIDR ist /12 oder /16. Jeder Knoten erhält standardmäßig ein /24-Segment für Pods.",
              "type": "info"
            },
            {
              "text": "Heimrouter: die meisten verwenden 192.168.0.0/24 oder 192.168.1.0/24. Unternehmensrouter verwenden oft 10.x.x.x/8 für große interne Netzwerke.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "CIDR-Berechnungsbeispiele",
          "description": "Schritt-für-Schritt CIDR-Konvertierungen",
          "examples": [
            {
              "title": "CIDR /22 — Mittleres Netzwerk",
              "steps": [
                "Eingabe: 10.10.0.0/22",
                "Präfix-Bits: 22 → Host-Bits: 32 − 22 = 10",
                "Gesamtadressen: 2¹⁰ = 1.024",
                "Nutzbare Hosts: 1.024 − 2 = 1.022 (Standard) | 1.019 (AWS)",
                "Subnetzmaske: 255.255.252.0",
                "Bereich: 10.10.0.1 – 10.10.3.254 | Broadcast: 10.10.3.255"
              ],
              "result": "10.10.0.0/22 enthält 1.022 nutzbare Hosts über 4 zusammenhängende /24-Blöcke."
            },
            {
              "title": "IP-Bereich → CIDR (Umgekehrt)",
              "steps": [
                "Eingabe: Start 192.168.1.0, Ende 192.168.1.255",
                "Bereich umfasst 256 Adressen (2⁸)",
                "256 = 2⁸ → Präfix = 32 − 8 = /24",
                "Startadresse 192.168.1.0 ist an /24-Grenze ausgerichtet",
                "Ergebnis: 192.168.1.0/24 (einzelner Block deckt gesamten Bereich ab)",
                "Wenn Bereich 192.168.1.0 – 192.168.2.127 wäre: benötigt /24 + /25"
              ],
              "result": "Der umgekehrte Rechner findet das minimale Set von CIDR-Blöcken, um jeden IP-Bereich abzudecken."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Was bedeutet CIDR-Notation?",
          "answer": "CIDR-Notation kombiniert eine IP-Adresse mit einer Präfixlänge, getrennt durch einen Schrägstrich. Zum Beispiel bedeutet 192.168.1.0/24, dass die ersten 24 von 32 Bits das Netzwerk identifizieren und 8 Bits (256 Adressen) für Hosts übrig bleiben. Die Präfixlänge ersetzt die ältere Subnetzmasken-Notation — /24 entspricht 255.255.255.0. Größere Präfixzahlen bedeuten kleinere Netzwerke: /28 hat 16 Adressen, während /16 65.536 hat."
        },
        "1": {
          "question": "Wie konvertiere ich eine Subnetzmaske zu CIDR?",
          "answer": "Zähle die Anzahl der aufeinanderfolgenden 1-Bits in der binären Subnetzmaske. Für 255.255.255.0: binär ist 11111111.11111111.11111111.00000000 — das sind 24 Einsen, also /24. Eine schnelle Abkürzung: subtrahiere das letzte Nicht-255-Oktett von 256 und finde die Potenz von 2. Beispiel: 255.255.255.240 → 256 − 240 = 16 = 2⁴ → 32 − 4 = /28."
        },
        "2": {
          "question": "Was ist der Unterschied zwischen CIDR und VLSM?",
          "answer": "CIDR (Classless Inter-Domain Routing) ist das Adressierungssystem, das Netzwerkpräfixe variabler Länge für Route-Aggregation ermöglicht. VLSM (Variable Length Subnet Masking) ist die Technik, verschiedene Subnetzgrößen innerhalb eines einzelnen Netzwerks zu verwenden. CIDR ist die von ISPs verwendete Notation und das Zuteilungssystem; VLSM ist die innerhalb von Organisationen angewandte Design-Praxis."
        },
        "3": {
          "question": "Kann ich zwei CIDR-Blöcke zu einem kombinieren?",
          "answer": "Ja, das nennt sich Supernetting oder Route-Aggregation. Zwei zusammenhängende Blöcke derselben Größe können durch Reduzierung des Präfix um 1 kombiniert werden. Zum Beispiel werden 10.0.0.0/24 und 10.0.1.0/24 zu 10.0.0.0/23. Die Blöcke müssen zusammenhängend sein und der erste Block muss natürlich ausgerichtet sein — man kann 10.0.1.0/24 und 10.0.2.0/24 nicht zu einem /23 aggregieren, weil 10.0.1.0 nicht an einer /23-Grenze ausgerichtet ist."
        },
        "4": {
          "question": "Wie viele IPs reserviert jeder Cloud-Anbieter?",
          "answer": "AWS reserviert 5 IPs pro Subnetz: Netzwerkadresse (.0), VPC-Router (.1), DNS-Server (.2), zukünftige Verwendung (.3) und Broadcast. Azure reserviert ebenfalls 5: Netzwerk (.0), Standard-Gateway (.1), DNS primär (.2), DNS sekundär (.3) und Broadcast. GCP reserviert 4: Netzwerk (.0), Standard-Gateway (.1), vorletzte und Broadcast. Ein /24 ergibt also 251 nutzbare IPs bei AWS/Azure, 252 bei GCP, vs. 254 Standard."
        },
        "5": {
          "question": "Was ist der kleinste routbare CIDR-Block im Internet?",
          "answer": "Die meisten Internet-Registrierungsstellen (ARIN, RIPE, APNIC) und Transit-Anbieter akzeptieren /24 als kleinsten routbaren Präfix. Blöcke kleiner als /24 werden typischerweise von BGP-Routern gefiltert und verbreiten sich nicht global. Einige Anbieter akzeptieren /25 in spezifischen Peering-Vereinbarungen, aber /24 ist das praktische Minimum für garantierte globale Erreichbarkeit."
        }
      },
      "detailedTable": {
        "cidrReference": {
          "button": "Alle CIDR-Größen anzeigen",
          "title": "Vollständige CIDR-Referenztabelle",
          "columns": {
            "cidr": "CIDR",
            "mask": "Subnetzmaske",
            "addresses": "Gesamt-IPs",
            "usable": "Nutzbar (Std)",
            "usableAws": "Nutzbar (AWS)"
          }
        }
      },
      "buttons": {
        "calculate": "Berechnen",
        "reset": "Zurücksetzen",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Speichern",
        "saved": "Gespeichert",
        "saving": "Speichern..."
      },
      "share": {
        "calculatedWith": "Berechnet mit Kalcufy.com"
      },
      "ui": {
        "results": "Ergebnisse",
        "yourInformation": "Ihre Informationen"
      },
      "accessibility": {
        "mobileResults": "Ergebniszusammenfassung",
        "closeModal": "Schließen",
        "openMenu": "Menü öffnen"
      },
      "rating": {
        "title": "Bewerten Sie diesen Rechner",
        "share": "Teilen",
        "copied": "Kopiert!",
        "copyLink": "Link kopieren",
        "clickToRate": "Klicken zum Bewerten",
        "youRated": "Sie haben bewertet",
        "stars": "Sterne",
        "averageFrom": "Durchschnitt von",
        "ratings": "Bewertungen"
      },
      "common": {
        "home": "Startseite",
        "calculators": "Rechner"
      },
      "sources": {
        "title": "Quellen und Referenzen"
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      }
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
