import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─────────────────────────────────────────────────────────────────────────────
// IP Subnet Calculator (IPv4) — V4.3
// Features: Cloud provider mode (AWS/Azure/GCP), binary/hex toggle,
//           next/previous subnet, full subnet reference table
// ─────────────────────────────────────────────────────────────────────────────

export const ipSubnetConfig: CalculatorConfigV4 = {
  id: "ip-subnet",
  version: "4.3",
  category: "technology",
  icon: "🌐",

  presets: [
    {
      id: "homeNetwork",
      icon: "🏠",
      values: { octet1: 192, octet2: 168, octet3: 1, octet4: 100, cidr: "24", cloudProvider: "standard" },
    },
    {
      id: "smallOffice",
      icon: "🏢",
      values: { octet1: 10, octet2: 0, octet3: 1, octet4: 50, cidr: "28", cloudProvider: "standard" },
    },
    {
      id: "awsVpc",
      icon: "☁️",
      values: { octet1: 10, octet2: 0, octet3: 0, octet4: 0, cidr: "24", cloudProvider: "aws" },
    },
    {
      id: "pointToPoint",
      icon: "🔗",
      values: { octet1: 10, octet2: 1, octet3: 1, octet4: 0, cidr: "30", cloudProvider: "standard" },
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
          "aws vpc subnet calculator",
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
        cloudProvider: {
          label: "Cloud Provider",
          helpText: "Cloud providers reserve extra IPs — affects usable host count",
          options: {
            standard: "Standard Network",
            aws: "AWS VPC (−5 IPs)",
            azure: "Azure VNet (−5 IPs)",
            gcp: "Google Cloud VPC (−4 IPs)",
          },
        },
      },

      results: {
        cidrNotation: { label: "CIDR Notation" },
        networkAddress: { label: "Network Address" },
        broadcastAddress: { label: "Broadcast Address" },
        subnetMask: { label: "Subnet Mask" },
        wildcardMask: { label: "Wildcard Mask" },
        totalAddresses: { label: "Total Addresses" },
        usableHosts: { label: "Usable Hosts" },
        hostRange: { label: "Usable Host Range" },
        ipClass: { label: "IP Class" },
        ipType: { label: "IP Type" },
        networkBits: { label: "Network Bits" },
        hostBits: { label: "Host Bits" },
        nextSubnet: { label: "Next Subnet" },
        previousSubnet: { label: "Previous Subnet" },
        reservedIps: { label: "Reserved IPs" },
        binarySubnetMask: { label: "Binary Subnet Mask" },
        binaryIp: { label: "Binary IP Address" },
        hexIp: { label: "Hex IP Address" },
      },

      presets: {
        homeNetwork: { label: "Home Network /24", description: "192.168.1.100/24 — 254 usable hosts" },
        smallOffice: { label: "Small Office /28", description: "10.0.1.50/28 — 14 usable hosts" },
        awsVpc: { label: "AWS VPC /24", description: "10.0.0.0/24 — 251 usable (5 reserved)" },
        pointToPoint: { label: "Point-to-Point /30", description: "10.1.1.0/30 — 2 hosts (router link)" },
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
        "noSubnet": "—",
        "awsReserved": "5 IPs (.0, .1, .2, .3, bcast)",
        "azureReserved": "5 IPs (.0, .1, .2, .3, bcast)",
        "gcpReserved": "4 IPs (.0, .1, bcast, DHCP)",
        "standardReserved": "2 IPs (.0 net, bcast)",
        "Network/Broadcast": "Reserved",
        "Usable Hosts": "Usable Hosts",
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
          title: "Binary & Technical Details",
          items: [
            { label: "Binary Subnet Mask", valueKey: "binarySubnetMask" },
            { label: "Binary IP Address", valueKey: "binaryIp" },
            { label: "Hex IP Address", valueKey: "hexIp" },
            { label: "Reserved IPs", valueKey: "reservedIps" },
          ],
        },
        tips: {
          title: "Subnetting Tips",
          items: [
            "Use /24 (254 hosts) for home or small office networks — most common subnet size.",
            "Private ranges (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 — free for internal use.",
            "First IP = network ID, last IP = broadcast — neither can be assigned to a device.",
            "AWS/Azure reserve 3–5 extra IPs per subnet — always use the cloud provider mode for accurate counts.",
          ],
        },
      },

      chart: {
        title: "Subnet Visual Analysis",
        tabs: {
          "address-allocation": "Address Allocation",
          "cloud-comparison": "Cloud Comparison",
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
              title: "Example: AWS VPC 10.0.0.0 /24",
              steps: [
                "IP: 10.0.0.0/24 → 256 total addresses",
                "Standard: 256 − 2 = 254 usable hosts",
                "AWS reserves 5 IPs: .0 (network), .1 (VPC router), .2 (DNS), .3 (future), .255 (broadcast)",
                "AWS usable: 256 − 5 = 251 hosts",
                "First usable: 10.0.0.4 | Last usable: 10.0.0.254",
                "Azure: same 251 hosts | GCP: 252 hosts (4 reserved)",
              ],
              result: "Always use cloud provider mode for accurate host counts in AWS/Azure/GCP.",
            },
          ],
        },
      },

      faqs: {
        "0": {
          question: "What is a subnet mask and why is it important?",
          answer: "A subnet mask is a 32-bit number that divides an IP address into the network portion and the host portion. It tells routers and devices which part of the IP address identifies the network and which part identifies individual devices. Without a subnet mask, devices cannot determine if a destination IP is on the same local network or needs to be forwarded through a router. The most common subnet mask is 255.255.255.0 (/24), which creates a network with 254 usable host addresses.",
        },
        "1": {
          question: "How do AWS, Azure, and GCP differ in reserved IPs per subnet?",
          answer: "Cloud providers reserve extra IP addresses beyond the standard network and broadcast addresses. AWS reserves 5 IPs per subnet: the network address (.0), the VPC router (.1), the DNS server (.2), reserved for future use (.3), and the broadcast address. Azure also reserves 5 IPs with a similar pattern. Google Cloud reserves 4 IPs: the network address, default gateway, broadcast, and one for DHCP. This means a /24 subnet gives you 254 hosts on standard networks, but only 251 on AWS/Azure or 252 on GCP.",
        },
        "2": {
          question: "What is CIDR notation and how does it relate to subnet masks?",
          answer: "CIDR (Classless Inter-Domain Routing) notation uses a slash followed by a number to indicate how many bits form the network prefix. For example, /24 means 24 bits are the network portion, equivalent to the subnet mask 255.255.255.0. CIDR replaced the old classful system (Class A, B, C) to allow more flexible address allocation. The formula is simple: total addresses = 2^(32 − prefix_length), and usable hosts = total addresses − 2 (subtracting the network and broadcast addresses).",
        },
        "3": {
          question: "What is a wildcard mask and when is it used?",
          answer: "A wildcard mask is the bitwise inverse of a subnet mask. Where a subnet mask has 1s, the wildcard mask has 0s, and vice versa. For example, if the subnet mask is 255.255.255.0, the wildcard mask is 0.0.0.255. Wildcard masks are primarily used in Cisco router ACLs (Access Control Lists) and OSPF routing configurations to specify which bits of an address should be matched. A wildcard mask of 0.0.0.255 means 'match the first three octets exactly, allow any value in the last octet.'",
        },
        "4": {
          question: "What is the difference between /30 and /31 subnets?",
          answer: "A /30 subnet provides 4 total addresses with 2 usable hosts — traditionally used for point-to-point links between routers. A /31 subnet (defined in RFC 3021) provides exactly 2 addresses with no network or broadcast address, making both IPs usable for point-to-point links. While /31 is more efficient (saves one IP), not all older network equipment supports it. Modern routers and most cloud providers fully support /31 for router-to-router connections.",
        },
        "5": {
          question: "How do I choose the right subnet size for my network?",
          answer: "Start by counting the number of devices that need IP addresses, then add 20–50% for growth. Use the formula: find the smallest CIDR prefix where 2^(32−prefix) − 2 ≥ your host count. For example, 50 devices need at least a /26 (62 usable), but a /25 (126 usable) provides room to grow. For cloud deployments, remember to account for the extra reserved IPs. For home networks, /24 (254 hosts) is almost always sufficient. For router links, use /30 or /31.",
        },
      },

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
    es: {
      "name": "Calculadora de Subred IP",
      "slug": "calculadora-subred-ip",
      "subtitle": "Calcula máscara de subred, dirección de red, broadcast, máscara wildcard y rangos de hosts utilizables desde cualquier dirección IPv4 y prefijo CIDR.",
      "breadcrumb": "Subred IP",
      "seo": {
        "title": "Calculadora de Subred IP - Herramienta Gratuita IPv4 CIDR y Máscara",
        "description": "Calcula máscara de subred, direcciones de red y broadcast, máscara wildcard, rango de hosts utilizables y notación binaria para cualquier bloque CIDR IPv4. Herramienta gratuita para ingenieros de red.",
        "shortDescription": "Calcula detalles de subred IPv4 desde IP y prefijo CIDR.",
        "keywords": [
          "calculadora subred ip",
          "calculadora mascara subred",
          "calculadora cidr",
          "calculadora subred ipv4",
          "calculadora direccion red",
          "calculadora subred gratuita",
          "herramienta subnetting",
          "calculadora subred vpc aws"
        ]
      },
      "inputs": {
        "octet1": {
          "label": "Dirección IP — Octeto 1",
          "helpText": "Primer octeto (0–255)"
        },
        "octet2": {
          "label": "Octeto 2",
          "helpText": "Segundo octeto (0–255)"
        },
        "octet3": {
          "label": "Octeto 3",
          "helpText": "Tercer octeto (0–255)"
        },
        "octet4": {
          "label": "Octeto 4",
          "helpText": "Cuarto octeto (0–255)"
        },
        "cidr": {
          "label": "Longitud de Prefijo CIDR (/)",
          "helpText": "Número de bits de red — determina el tamaño de la subred",
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
            "31": "/31 — 255.255.255.254 (2 punto-a-punto)",
            "32": "/32 — 255.255.255.255 (host único)"
          }
        },
        "cloudProvider": {
          "label": "Proveedor de Nube",
          "helpText": "Los proveedores de nube reservan IPs adicionales — afecta el conteo de hosts utilizables",
          "options": {
            "standard": "Red Estándar",
            "aws": "AWS VPC (−5 IPs)",
            "azure": "Azure VNet (−5 IPs)",
            "gcp": "Google Cloud VPC (−4 IPs)"
          }
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
        "hostRange": {
          "label": "Rango de Hosts Utilizables"
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
        "nextSubnet": {
          "label": "Siguiente Subred"
        },
        "previousSubnet": {
          "label": "Subred Anterior"
        },
        "reservedIps": {
          "label": "IPs Reservadas"
        },
        "binarySubnetMask": {
          "label": "Máscara de Subred Binaria"
        },
        "binaryIp": {
          "label": "Dirección IP Binaria"
        },
        "hexIp": {
          "label": "Dirección IP Hexadecimal"
        }
      },
      "presets": {
        "homeNetwork": {
          "label": "Red Doméstica /24",
          "description": "192.168.1.100/24 — 254 hosts utilizables"
        },
        "smallOffice": {
          "label": "Oficina Pequeña /28",
          "description": "10.0.1.50/28 — 14 hosts utilizables"
        },
        "awsVpc": {
          "label": "AWS VPC /24",
          "description": "10.0.0.0/24 — 251 utilizables (5 reservadas)"
        },
        "pointToPoint": {
          "label": "Punto-a-Punto /30",
          "description": "10.1.1.0/30 — 2 hosts (enlace router)"
        }
      },
      "values": {
        "hosts": "hosts",
        "host": "host",
        "addresses": "direcciones",
        "bits": "bits",
        "private": "Privada (RFC 1918)",
        "public": "Pública",
        "loopback": "Loopback (127.x.x.x)",
        "linkLocal": "Link-Local / APIPA (169.254.x.x)",
        "multicast": "Multicast (224–239.x.x.x)",
        "reserved": "Reservada (240–255.x.x.x)",
        "broadcast": "Broadcast Limitado",
        "currentNet": "Red Actual",
        "classA": "Clase A",
        "classB": "Clase B",
        "classC": "Clase C",
        "classD": "Clase D (Multicast)",
        "classE": "Clase E (Reservada)",
        "na": "N/A",
        "pointToPoint": "Punto-a-Punto (RFC 3021)",
        "singleHost": "Ruta Host Único",
        "noSubnet": "—",
        "awsReserved": "5 IPs (.0, .1, .2, .3, bcast)",
        "azureReserved": "5 IPs (.0, .1, .2, .3, bcast)",
        "gcpReserved": "4 IPs (.0, .1, bcast, DHCP)",
        "standardReserved": "2 IPs (.0 red, bcast)",
        "Network/Broadcast": "Reservadas",
        "Usable Hosts": "Hosts Utilizables"
      },
      "formats": {
        "summary": "{cidrNotation} — Red: {networkAddress}, Broadcast: {broadcastAddress}, Utilizables: {usableHosts} hosts ({firstHost} – {lastHost})."
      },
      "infoCards": {
        "metrics": {
          "title": "Resumen de Subred",
          "items": [
            {
              "label": "Dirección de Red",
              "valueKey": "networkAddress"
            },
            {
              "label": "Dirección de Broadcast",
              "valueKey": "broadcastAddress"
            },
            {
              "label": "Hosts Utilizables",
              "valueKey": "usableHosts"
            },
            {
              "label": "Notación CIDR",
              "valueKey": "cidrNotation"
            }
          ]
        },
        "details": {
          "title": "Detalles Binarios y Técnicos",
          "items": [
            {
              "label": "Máscara de Subred Binaria",
              "valueKey": "binarySubnetMask"
            },
            {
              "label": "Dirección IP Binaria",
              "valueKey": "binaryIp"
            },
            {
              "label": "Dirección IP Hexadecimal",
              "valueKey": "hexIp"
            },
            {
              "label": "IPs Reservadas",
              "valueKey": "reservedIps"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Subnetting",
          "items": [
            "Usa /24 (254 hosts) para redes domésticas u oficinas pequeñas — tamaño de subred más común.",
            "Rangos privados (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 — gratuitos para uso interno.",
            "Primera IP = ID de red, última IP = broadcast — ninguna puede asignarse a un dispositivo.",
            "AWS/Azure reservan 3–5 IPs adicionales por subred — siempre usa el modo proveedor de nube para conteos precisos."
          ]
        }
      },
      "chart": {
        "title": "Análisis Visual de Subred",
        "tabs": {
          "address-allocation": "Asignación de Direcciones",
          "cloud-comparison": "Comparación de Nubes"
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el Subnetting?",
          "content": "El subnetting es la práctica de dividir una red IP grande en sub-redes más pequeñas e independientes llamadas subredes. Cada subred tiene su propio rango de direcciones y funciona como un dominio de broadcast separado. Esta técnica fue introducida para resolver la ineficiencia del direccionamiento por clases, donde las organizaciones recibían muchas más direcciones IP de las que necesitaban. Al tomar prestados bits de la porción de host de una dirección IP, los administradores pueden crear múltiples redes más pequeñas desde un solo bloque de direcciones, mejorando la eficiencia de enrutamiento, reduciendo el tráfico de broadcast, mejorando la seguridad a través del aislamiento y aprovechando mejor el espacio limitado de direcciones IPv4. Cada dirección IPv4 tiene 32 bits, divididos en una porción de red (identificada por la máscara de subred) y una porción de host (los bits restantes). La máscara de subred dice a los routers qué parte de la dirección identifica la red y qué parte identifica dispositivos individuales."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Notación CIDR",
          "content": "El Enrutamiento Inter-Dominio Sin Clases (CIDR) reemplazó el rígido sistema por clases (Clase A, B, C) en 1993 con el RFC 1519. En lugar de límites fijos, CIDR usa una barra seguida de un número para indicar cuántos bits forman el prefijo de red. Por ejemplo, /24 significa que 24 bits son la porción de red y 8 bits son para hosts, dando 2⁸ = 256 direcciones totales (254 utilizables). La fórmula clave es: direcciones totales = 2^(32 − prefijo), y hosts utilizables = total − 2 (restando direcciones de red y broadcast). Un /16 da 65,534 hosts utilizables, mientras que /28 da solo 14. CIDR permite asignación precisa — una organización que necesita 500 direcciones puede obtener un /23 (510 hosts) en lugar de desperdiciar una Clase B completa (/16 con 65,534). Esta flexibilidad redujo dramáticamente el agotamiento de direcciones IPv4 y simplificó las tablas de enrutamiento a través de la agregación de rutas (supernetting)."
        },
        "considerations": {
          "title": "Conceptos Clave de Subnetting",
          "items": [
            {
              "text": "Dirección de red: la primera dirección en una subred — identifica la red misma y no puede asignarse a ningún host.",
              "type": "info"
            },
            {
              "text": "Dirección de broadcast: la última dirección — envía paquetes a cada host en esa subred simultáneamente.",
              "type": "info"
            },
            {
              "text": "Máscara wildcard: la inversa bit a bit de la máscara de subred — usada en ACLs de Cisco y configuraciones de enrutamiento OSPF.",
              "type": "info"
            },
            {
              "text": "Planifica para crecimiento: si necesitas 50 hosts hoy, /26 (62 utilizables) deja poco espacio — considera /25 (126 utilizables) en su lugar.",
              "type": "warning"
            },
            {
              "text": "Los rangos privados RFC 1918 no son enrutables en internet público — NAT los traduce a IPs públicas para acceso externo.",
              "type": "info"
            },
            {
              "text": "Sobre-subnetting desperdicia direcciones: cada subred pierde 2 IPs (red + broadcast), así que muchas subredes pequeñas se acumulan.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Tamaños Comunes de Subred",
          "items": [
            {
              "text": "/32 — Host Único: Usado para direcciones loopback y rutas de host en tablas de enrutamiento.",
              "type": "info"
            },
            {
              "text": "/30 — 2 Hosts: Estándar para enlaces punto-a-punto entre routers (ver también /31 por RFC 3021).",
              "type": "info"
            },
            {
              "text": "/28 — 14 Hosts: Sala de servidores pequeña, algunas impresoras, o una VLAN IoT.",
              "type": "info"
            },
            {
              "text": "/24 — 254 Hosts: La subred más común para hogares, oficinas pequeñas y VLANs individuales.",
              "type": "info"
            },
            {
              "text": "/20 — 4,094 Hosts: Empresa mediana — un piso completo de edificio o departamento grande.",
              "type": "info"
            },
            {
              "text": "/16 — 65,534 Hosts: Campus grande o centro de datos; a menudo el tamaño de una asignación Clase B completa.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Subnetting",
          "description": "Cálculos de subred paso a paso",
          "examples": [
            {
              "title": "Ejemplo: 192.168.1.100 /24",
              "steps": [
                "IP: 192.168.1.100 → Binario: 11000000.10101000.00000001.01100100",
                "CIDR /24 → Máscara: 255.255.255.0 → Binario: 11111111.11111111.11111111.00000000",
                "Operación AND: Red = 192.168.1.0 (primeros 24 bits coinciden, últimos 8 en cero)",
                "Bits de host = 32 − 24 = 8 → Direcciones totales = 2⁸ = 256",
                "Hosts utilizables = 256 − 2 = 254",
                "Primer utilizable: 192.168.1.1 | Último utilizable: 192.168.1.254 | Broadcast: 192.168.1.255"
              ],
              "result": "192.168.1.0/24 soporta 254 dispositivos. Wildcard: 0.0.0.255"
            },
            {
              "title": "Ejemplo: AWS VPC 10.0.0.0 /24",
              "steps": [
                "IP: 10.0.0.0/24 → 256 direcciones totales",
                "Estándar: 256 − 2 = 254 hosts utilizables",
                "AWS reserva 5 IPs: .0 (red), .1 (router VPC), .2 (DNS), .3 (futuro), .255 (broadcast)",
                "AWS utilizables: 256 − 5 = 251 hosts",
                "Primer utilizable: 10.0.0.4 | Último utilizable: 10.0.0.254",
                "Azure: mismos 251 hosts | GCP: 252 hosts (4 reservadas)"
              ],
              "result": "Siempre usa el modo proveedor de nube para conteos precisos de hosts en AWS/Azure/GCP."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "¿Qué es una máscara de subred y por qué es importante?",
          "answer": "Una máscara de subred es un número de 32 bits que divide una dirección IP en la porción de red y la porción de host. Le dice a los routers y dispositivos qué parte de la dirección IP identifica la red y qué parte identifica dispositivos individuales. Sin una máscara de subred, los dispositivos no pueden determinar si una IP de destino está en la misma red local o necesita ser reenviada a través de un router. La máscara de subred más común es 255.255.255.0 (/24), que crea una red con 254 direcciones de host utilizables."
        },
        "1": {
          "question": "¿Cómo difieren AWS, Azure y GCP en IPs reservadas por subred?",
          "answer": "Los proveedores de nube reservan direcciones IP adicionales más allá de las direcciones estándar de red y broadcast. AWS reserva 5 IPs por subred: la dirección de red (.0), el router VPC (.1), el servidor DNS (.2), reservada para uso futuro (.3), y la dirección de broadcast. Azure también reserva 5 IPs con un patrón similar. Google Cloud reserva 4 IPs: la dirección de red, gateway predeterminado, broadcast, y una para DHCP. Esto significa que una subred /24 te da 254 hosts en redes estándar, pero solo 251 en AWS/Azure o 252 en GCP."
        },
        "2": {
          "question": "¿Qué es la notación CIDR y cómo se relaciona con las máscaras de subred?",
          "answer": "La notación CIDR (Enrutamiento Inter-Dominio Sin Clases) usa una barra seguida de un número para indicar cuántos bits forman el prefijo de red. Por ejemplo, /24 significa que 24 bits son la porción de red, equivalente a la máscara de subred 255.255.255.0. CIDR reemplazó el antiguo sistema por clases (Clase A, B, C) para permitir asignación de direcciones más flexible. La fórmula es simple: direcciones totales = 2^(32 − longitud_prefijo), y hosts utilizables = direcciones totales − 2 (restando las direcciones de red y broadcast)."
        },
        "3": {
          "question": "¿Qué es una máscara wildcard y cuándo se usa?",
          "answer": "Una máscara wildcard es la inversa bit a bit de una máscara de subred. Donde una máscara de subred tiene 1s, la máscara wildcard tiene 0s, y viceversa. Por ejemplo, si la máscara de subred es 255.255.255.0, la máscara wildcard es 0.0.0.255. Las máscaras wildcard se usan principalmente en ACLs (Listas de Control de Acceso) de routers Cisco y configuraciones de enrutamiento OSPF para especificar qué bits de una dirección deben coincidir. Una máscara wildcard de 0.0.0.255 significa 'coincide exactamente con los primeros tres octetos, permite cualquier valor en el último octeto.'"
        },
        "4": {
          "question": "¿Cuál es la diferencia entre subredes /30 y /31?",
          "answer": "Una subred /30 proporciona 4 direcciones totales con 2 hosts utilizables — tradicionalmente usada para enlaces punto-a-punto entre routers. Una subred /31 (definida en RFC 3021) proporciona exactamente 2 direcciones sin dirección de red o broadcast, haciendo ambas IPs utilizables para enlaces punto-a-punto. Mientras que /31 es más eficiente (ahorra una IP), no todos los equipos de red antiguos lo soportan. Los routers modernos y la mayoría de proveedores de nube soportan completamente /31 para conexiones router-a-router."
        },
        "5": {
          "question": "¿Cómo elijo el tamaño correcto de subred para mi red?",
          "answer": "Comienza contando el número de dispositivos que necesitan direcciones IP, luego añade 20–50% para crecimiento. Usa la fórmula: encuentra el prefijo CIDR más pequeño donde 2^(32−prefijo) − 2 ≥ tu conteo de hosts. Por ejemplo, 50 dispositivos necesitan al menos un /26 (62 utilizables), pero un /25 (126 utilizables) proporciona espacio para crecer. Para implementaciones en nube, recuerda considerar las IPs reservadas adicionales. Para redes domésticas, /24 (254 hosts) es casi siempre suficiente. Para enlaces de router, usa /30 o /31."
        }
      },
      "detailedTable": {
        "subnetReference": {
          "button": "Ver Referencia Completa de Tamaños de Subred",
          "title": "Tabla de Referencia de Subredes IPv4",
          "columns": {
            "cidr": "CIDR",
            "mask": "Máscara de Subred",
            "wildcard": "Wildcard",
            "totalAddresses": "Direcciones Totales",
            "usableHosts": "Hosts Utilizables"
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
      },
      "calculator": {
        "yourInformation": "Tu Información"
      }
    },
    pt: {
      "name": "Calculadora de Sub-rede IP",
      "slug": "calculadora-sub-rede-ip",
      "subtitle": "Calcule máscara de sub-rede, endereço de rede, broadcast, máscara wildcard e faixas de hosts utilizáveis a partir de qualquer endereço IPv4 e prefixo CIDR.",
      "breadcrumb": "Sub-rede IP",
      "seo": {
        "title": "Calculadora de Sub-rede IP - Ferramenta Gratuita IPv4 CIDR e Máscara",
        "description": "Calcule máscara de sub-rede, endereços de rede e broadcast, máscara wildcard, faixa de hosts utilizáveis e notação binária para qualquer bloco CIDR IPv4. Ferramenta gratuita para engenheiros de rede.",
        "shortDescription": "Calcule detalhes de sub-rede IPv4 a partir de IP e prefixo CIDR.",
        "keywords": [
          "calculadora sub-rede ip",
          "calculadora máscara sub-rede",
          "calculadora cidr",
          "calculadora sub-rede ipv4",
          "calculadora endereço rede",
          "calculadora sub-rede grátis",
          "ferramenta subnetting",
          "calculadora sub-rede aws vpc"
        ]
      },
      "inputs": {
        "octet1": {
          "label": "Endereço IP — Octeto 1",
          "helpText": "Primeiro octeto (0–255)"
        },
        "octet2": {
          "label": "Octeto 2",
          "helpText": "Segundo octeto (0–255)"
        },
        "octet3": {
          "label": "Octeto 3",
          "helpText": "Terceiro octeto (0–255)"
        },
        "octet4": {
          "label": "Octeto 4",
          "helpText": "Quarto octeto (0–255)"
        },
        "cidr": {
          "label": "Comprimento do Prefixo CIDR (/)",
          "helpText": "Número de bits de rede — determina o tamanho da sub-rede",
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
            "31": "/31 — 255.255.255.254 (2 ponto-a-ponto)",
            "32": "/32 — 255.255.255.255 (host único)"
          }
        },
        "cloudProvider": {
          "label": "Provedor de Nuvem",
          "helpText": "Provedores de nuvem reservam IPs extras — afeta a contagem de hosts utilizáveis",
          "options": {
            "standard": "Rede Padrão",
            "aws": "AWS VPC (−5 IPs)",
            "azure": "Azure VNet (−5 IPs)",
            "gcp": "Google Cloud VPC (−4 IPs)"
          }
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
        "subnetMask": {
          "label": "Máscara de Sub-rede"
        },
        "wildcardMask": {
          "label": "Máscara Wildcard"
        },
        "totalAddresses": {
          "label": "Total de Endereços"
        },
        "usableHosts": {
          "label": "Hosts Utilizáveis"
        },
        "hostRange": {
          "label": "Faixa de Hosts Utilizáveis"
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
        "nextSubnet": {
          "label": "Próxima Sub-rede"
        },
        "previousSubnet": {
          "label": "Sub-rede Anterior"
        },
        "reservedIps": {
          "label": "IPs Reservados"
        },
        "binarySubnetMask": {
          "label": "Máscara de Sub-rede Binária"
        },
        "binaryIp": {
          "label": "Endereço IP Binário"
        },
        "hexIp": {
          "label": "Endereço IP Hexadecimal"
        }
      },
      "presets": {
        "homeNetwork": {
          "label": "Rede Doméstica /24",
          "description": "192.168.1.100/24 — 254 hosts utilizáveis"
        },
        "smallOffice": {
          "label": "Escritório Pequeno /28",
          "description": "10.0.1.50/28 — 14 hosts utilizáveis"
        },
        "awsVpc": {
          "label": "AWS VPC /24",
          "description": "10.0.0.0/24 — 251 utilizáveis (5 reservados)"
        },
        "pointToPoint": {
          "label": "Ponto-a-Ponto /30",
          "description": "10.1.1.0/30 — 2 hosts (link de roteador)"
        }
      },
      "values": {
        "hosts": "hosts",
        "host": "host",
        "addresses": "endereços",
        "bits": "bits",
        "private": "Privado (RFC 1918)",
        "public": "Público",
        "loopback": "Loopback (127.x.x.x)",
        "linkLocal": "Link-Local / APIPA (169.254.x.x)",
        "multicast": "Multicast (224–239.x.x.x)",
        "reserved": "Reservado (240–255.x.x.x)",
        "broadcast": "Broadcast Limitado",
        "currentNet": "Rede Atual",
        "classA": "Classe A",
        "classB": "Classe B",
        "classC": "Classe C",
        "classD": "Classe D (Multicast)",
        "classE": "Classe E (Reservada)",
        "na": "N/A",
        "pointToPoint": "Ponto-a-Ponto (RFC 3021)",
        "singleHost": "Rota de Host Único",
        "noSubnet": "—",
        "awsReserved": "5 IPs (.0, .1, .2, .3, bcast)",
        "azureReserved": "5 IPs (.0, .1, .2, .3, bcast)",
        "gcpReserved": "4 IPs (.0, .1, bcast, DHCP)",
        "standardReserved": "2 IPs (.0 rede, bcast)",
        "Network/Broadcast": "Reservado",
        "Usable Hosts": "Hosts Utilizáveis"
      },
      "formats": {
        "summary": "{cidrNotation} — Rede: {networkAddress}, Broadcast: {broadcastAddress}, Utilizáveis: {usableHosts} hosts ({firstHost} – {lastHost})."
      },
      "infoCards": {
        "metrics": {
          "title": "Visão Geral da Sub-rede",
          "items": [
            {
              "label": "Endereço de Rede",
              "valueKey": "networkAddress"
            },
            {
              "label": "Endereço de Broadcast",
              "valueKey": "broadcastAddress"
            },
            {
              "label": "Hosts Utilizáveis",
              "valueKey": "usableHosts"
            },
            {
              "label": "Notação CIDR",
              "valueKey": "cidrNotation"
            }
          ]
        },
        "details": {
          "title": "Detalhes Binários e Técnicos",
          "items": [
            {
              "label": "Máscara de Sub-rede Binária",
              "valueKey": "binarySubnetMask"
            },
            {
              "label": "Endereço IP Binário",
              "valueKey": "binaryIp"
            },
            {
              "label": "Endereço IP Hexadecimal",
              "valueKey": "hexIp"
            },
            {
              "label": "IPs Reservados",
              "valueKey": "reservedIps"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Subnetting",
          "items": [
            "Use /24 (254 hosts) para redes domésticas ou escritórios pequenos — tamanho de sub-rede mais comum.",
            "Faixas privadas (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 — gratuitas para uso interno.",
            "Primeiro IP = ID da rede, último IP = broadcast — nenhum pode ser atribuído a um dispositivo.",
            "AWS/Azure reservam 3–5 IPs extras por sub-rede — sempre use o modo provedor de nuvem para contagens precisas."
          ]
        }
      },
      "chart": {
        "title": "Análise Visual da Sub-rede",
        "tabs": {
          "address-allocation": "Alocação de Endereços",
          "cloud-comparison": "Comparação de Nuvem"
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é Subnetting?",
          "content": "Subnetting é a prática de dividir uma rede IP maior em sub-redes menores e independentes chamadas sub-redes. Cada sub-rede tem sua própria faixa de endereços e funciona como um domínio de broadcast separado. Esta técnica foi introduzida para resolver a ineficiência do endereçamento classful, onde organizações recebiam muito mais endereços IP do que precisavam. Ao emprestar bits da porção host de um endereço IP, administradores podem criar múltiplas redes menores a partir de um único bloco de endereços, melhorando a eficiência de roteamento, reduzindo tráfego de broadcast, aumentando a segurança através do isolamento e fazendo melhor uso do espaço limitado de endereços IPv4. Todo endereço IPv4 tem 32 bits, divididos em uma porção de rede (identificada pela máscara de sub-rede) e uma porção de host (os bits restantes). A máscara de sub-rede diz aos roteadores qual parte do endereço identifica a rede e qual parte identifica dispositivos individuais."
        },
        "howItWorks": {
          "title": "Como Funciona a Notação CIDR",
          "content": "CIDR (Classless Inter-Domain Routing) substituiu o sistema classful rígido (Classe A, B, C) em 1993 com RFC 1519. Em vez de fronteiras fixas, CIDR usa uma barra seguida de um número para indicar quantos bits formam o prefixo de rede. Por exemplo, /24 significa que 24 bits são a porção de rede e 8 bits são para hosts, resultando em 2⁸ = 256 endereços totais (254 utilizáveis). A fórmula chave é: endereços totais = 2^(32 − prefixo), e hosts utilizáveis = total − 2 (subtraindo endereços de rede e broadcast). Um /16 dá 65.534 hosts utilizáveis, enquanto /28 dá apenas 14. CIDR permite alocação precisa — uma organização precisando de 500 endereços pode obter um /23 (510 hosts) em vez de desperdiçar uma Classe B inteira (/16 com 65.534). Esta flexibilidade reduziu drasticamente o esgotamento de endereços IPv4 e simplificou tabelas de roteamento através de agregação de rotas (supernetting)."
        },
        "considerations": {
          "title": "Conceitos Chave de Subnetting",
          "items": [
            {
              "text": "Endereço de rede: o primeiro endereço em uma sub-rede — identifica a própria rede e não pode ser atribuído a nenhum host.",
              "type": "info"
            },
            {
              "text": "Endereço de broadcast: o último endereço — envia pacotes para todos os hosts naquela sub-rede simultaneamente.",
              "type": "info"
            },
            {
              "text": "Máscara wildcard: o inverso bit a bit da máscara de sub-rede — usada em ACLs Cisco e configurações de roteamento OSPF.",
              "type": "info"
            },
            {
              "text": "Planeje para crescimento: se você precisa de 50 hosts hoje, /26 (62 utilizáveis) deixa pouco espaço — considere /25 (126 utilizáveis).",
              "type": "warning"
            },
            {
              "text": "Faixas privadas RFC 1918 não são roteáveis na internet pública — NAT as traduz para IPs públicos para acesso externo.",
              "type": "info"
            },
            {
              "text": "Excesso de subnetting desperdiça endereços: cada sub-rede perde 2 IPs (rede + broadcast), então muitas sub-redes pequenas somam.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Tamanhos Comuns de Sub-rede",
          "items": [
            {
              "text": "/32 — Host Único: Usado para endereços loopback e rotas de host em tabelas de roteamento.",
              "type": "info"
            },
            {
              "text": "/30 — 2 Hosts: Padrão para links ponto-a-ponto entre roteadores (veja também /31 por RFC 3021).",
              "type": "info"
            },
            {
              "text": "/28 — 14 Hosts: Sala de servidores pequena, algumas impressoras, ou uma VLAN IoT.",
              "type": "info"
            },
            {
              "text": "/24 — 254 Hosts: A sub-rede mais comum para casas, escritórios pequenos e VLANs individuais.",
              "type": "info"
            },
            {
              "text": "/20 — 4.094 Hosts: Empresa média — um andar inteiro de prédio ou departamento grande.",
              "type": "info"
            },
            {
              "text": "/16 — 65.534 Hosts: Campus grande ou data center; frequentemente o tamanho de uma alocação Classe B completa.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Subnetting",
          "description": "Cálculos de sub-rede passo a passo",
          "examples": [
            {
              "title": "Exemplo: 192.168.1.100 /24",
              "steps": [
                "IP: 192.168.1.100 → Binário: 11000000.10101000.00000001.01100100",
                "CIDR /24 → Máscara: 255.255.255.0 → Binário: 11111111.11111111.11111111.00000000",
                "Operação AND: Rede = 192.168.1.0 (primeiros 24 bits coincidem, últimos 8 zerados)",
                "Bits de host = 32 − 24 = 8 → Endereços totais = 2⁸ = 256",
                "Hosts utilizáveis = 256 − 2 = 254",
                "Primeiro utilizável: 192.168.1.1 | Último utilizável: 192.168.1.254 | Broadcast: 192.168.1.255"
              ],
              "result": "192.168.1.0/24 suporta 254 dispositivos. Wildcard: 0.0.0.255"
            },
            {
              "title": "Exemplo: AWS VPC 10.0.0.0 /24",
              "steps": [
                "IP: 10.0.0.0/24 → 256 endereços totais",
                "Padrão: 256 − 2 = 254 hosts utilizáveis",
                "AWS reserva 5 IPs: .0 (rede), .1 (roteador VPC), .2 (DNS), .3 (futuro), .255 (broadcast)",
                "AWS utilizáveis: 256 − 5 = 251 hosts",
                "Primeiro utilizável: 10.0.0.4 | Último utilizável: 10.0.0.254",
                "Azure: mesmos 251 hosts | GCP: 252 hosts (4 reservados)"
              ],
              "result": "Sempre use o modo provedor de nuvem para contagens precisas de hosts em AWS/Azure/GCP."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "O que é uma máscara de sub-rede e por que é importante?",
          "answer": "Uma máscara de sub-rede é um número de 32 bits que divide um endereço IP na porção de rede e na porção de host. Ela diz aos roteadores e dispositivos qual parte do endereço IP identifica a rede e qual parte identifica dispositivos individuais. Sem uma máscara de sub-rede, dispositivos não podem determinar se um IP de destino está na mesma rede local ou precisa ser encaminhado através de um roteador. A máscara de sub-rede mais comum é 255.255.255.0 (/24), que cria uma rede com 254 endereços de host utilizáveis."
        },
        "1": {
          "question": "Como AWS, Azure e GCP diferem nos IPs reservados por sub-rede?",
          "answer": "Provedores de nuvem reservam endereços IP extras além dos endereços padrão de rede e broadcast. AWS reserva 5 IPs por sub-rede: o endereço de rede (.0), o roteador VPC (.1), o servidor DNS (.2), reservado para uso futuro (.3), e o endereço de broadcast. Azure também reserva 5 IPs com padrão similar. Google Cloud reserva 4 IPs: o endereço de rede, gateway padrão, broadcast, e um para DHCP. Isso significa que uma sub-rede /24 dá 254 hosts em redes padrão, mas apenas 251 em AWS/Azure ou 252 em GCP."
        },
        "2": {
          "question": "O que é notação CIDR e como se relaciona com máscaras de sub-rede?",
          "answer": "Notação CIDR (Classless Inter-Domain Routing) usa uma barra seguida de um número para indicar quantos bits formam o prefixo de rede. Por exemplo, /24 significa que 24 bits são a porção de rede, equivalente à máscara de sub-rede 255.255.255.0. CIDR substituiu o antigo sistema classful (Classe A, B, C) para permitir alocação de endereços mais flexível. A fórmula é simples: endereços totais = 2^(32 − comprimento_prefixo), e hosts utilizáveis = endereços totais − 2 (subtraindo os endereços de rede e broadcast)."
        },
        "3": {
          "question": "O que é uma máscara wildcard e quando é usada?",
          "answer": "Uma máscara wildcard é o inverso bit a bit de uma máscara de sub-rede. Onde uma máscara de sub-rede tem 1s, a máscara wildcard tem 0s, e vice-versa. Por exemplo, se a máscara de sub-rede é 255.255.255.0, a máscara wildcard é 0.0.0.255. Máscaras wildcard são principalmente usadas em ACLs (Access Control Lists) de roteadores Cisco e configurações de roteamento OSPF para especificar quais bits de um endereço devem ser correspondidos. Uma máscara wildcard de 0.0.0.255 significa 'corresponda aos três primeiros octetos exatamente, permita qualquer valor no último octeto'."
        },
        "4": {
          "question": "Qual é a diferença entre sub-redes /30 e /31?",
          "answer": "Uma sub-rede /30 fornece 4 endereços totais com 2 hosts utilizáveis — tradicionalmente usada para links ponto-a-ponto entre roteadores. Uma sub-rede /31 (definida em RFC 3021) fornece exatamente 2 endereços sem endereço de rede ou broadcast, tornando ambos os IPs utilizáveis para links ponto-a-ponto. Embora /31 seja mais eficiente (economiza um IP), nem todos os equipamentos de rede mais antigos o suportam. Roteadores modernos e a maioria dos provedores de nuvem suportam totalmente /31 para conexões roteador-a-roteador."
        },
        "5": {
          "question": "Como escolho o tamanho certo de sub-rede para minha rede?",
          "answer": "Comece contando o número de dispositivos que precisam de endereços IP, então adicione 20–50% para crescimento. Use a fórmula: encontre o menor prefixo CIDR onde 2^(32−prefixo) − 2 ≥ sua contagem de hosts. Por exemplo, 50 dispositivos precisam de pelo menos um /26 (62 utilizáveis), mas um /25 (126 utilizáveis) fornece espaço para crescer. Para implantações em nuvem, lembre-se de considerar os IPs reservados extras. Para redes domésticas, /24 (254 hosts) é quase sempre suficiente. Para links de roteador, use /30 ou /31."
        }
      },
      "detailedTable": {
        "subnetReference": {
          "button": "Ver Referência de Todos os Tamanhos de Sub-rede",
          "title": "Tabela de Referência de Sub-rede IPv4",
          "columns": {
            "cidr": "CIDR",
            "mask": "Máscara de Sub-rede",
            "wildcard": "Wildcard",
            "totalAddresses": "Endereços Totais",
            "usableHosts": "Hosts Utilizáveis"
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
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      }
    },
    fr: {
      "name": "Calculateur de Sous-réseau IP",
      "slug": "calculateur-sous-reseau-ip",
      "subtitle": "Calculez le masque de sous-réseau, l'adresse réseau, la diffusion, le masque générique et les plages d'hôtes utilisables à partir de toute adresse IPv4 et préfixe CIDR.",
      "breadcrumb": "Sous-réseau IP",
      "seo": {
        "title": "Calculateur de Sous-réseau IP - Outil Gratuit IPv4 CIDR et Masque",
        "description": "Calculez le masque de sous-réseau, les adresses réseau et de diffusion, le masque générique, la plage d'hôtes utilisables et la notation binaire pour tout bloc CIDR IPv4. Outil gratuit pour les ingénieurs réseau.",
        "shortDescription": "Calculez les détails de sous-réseau IPv4 à partir d'IP et préfixe CIDR.",
        "keywords": [
          "calculateur sous-réseau ip",
          "calculateur masque sous-réseau",
          "calculateur cidr",
          "calculateur sous-réseau ipv4",
          "calculateur adresse réseau",
          "calculateur sous-réseau gratuit",
          "outil sous-réseautage",
          "calculateur sous-réseau aws vpc"
        ]
      },
      "inputs": {
        "octet1": {
          "label": "Adresse IP — Octet 1",
          "helpText": "Premier octet (0–255)"
        },
        "octet2": {
          "label": "Octet 2",
          "helpText": "Deuxième octet (0–255)"
        },
        "octet3": {
          "label": "Octet 3",
          "helpText": "Troisième octet (0–255)"
        },
        "octet4": {
          "label": "Octet 4",
          "helpText": "Quatrième octet (0–255)"
        },
        "cidr": {
          "label": "Longueur du Préfixe CIDR (/)",
          "helpText": "Nombre de bits réseau — détermine la taille du sous-réseau",
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
            "31": "/31 — 255.255.255.254 (2 point-à-point)",
            "32": "/32 — 255.255.255.255 (hôte unique)"
          }
        },
        "cloudProvider": {
          "label": "Fournisseur Cloud",
          "helpText": "Les fournisseurs cloud réservent des IP supplémentaires — affecte le nombre d'hôtes utilisables",
          "options": {
            "standard": "Réseau Standard",
            "aws": "AWS VPC (−5 IP)",
            "azure": "Azure VNet (−5 IP)",
            "gcp": "Google Cloud VPC (−4 IP)"
          }
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
        "hostRange": {
          "label": "Plage d'Hôtes Utilisables"
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
        "nextSubnet": {
          "label": "Sous-réseau Suivant"
        },
        "previousSubnet": {
          "label": "Sous-réseau Précédent"
        },
        "reservedIps": {
          "label": "IP Réservées"
        },
        "binarySubnetMask": {
          "label": "Masque de Sous-réseau Binaire"
        },
        "binaryIp": {
          "label": "Adresse IP Binaire"
        },
        "hexIp": {
          "label": "Adresse IP Hexadécimale"
        }
      },
      "presets": {
        "homeNetwork": {
          "label": "Réseau Domestique /24",
          "description": "192.168.1.100/24 — 254 hôtes utilisables"
        },
        "smallOffice": {
          "label": "Petit Bureau /28",
          "description": "10.0.1.50/28 — 14 hôtes utilisables"
        },
        "awsVpc": {
          "label": "AWS VPC /24",
          "description": "10.0.0.0/24 — 251 utilisables (5 réservées)"
        },
        "pointToPoint": {
          "label": "Point-à-Point /30",
          "description": "10.1.1.0/30 — 2 hôtes (lien routeur)"
        }
      },
      "values": {
        "hosts": "hôtes",
        "host": "hôte",
        "addresses": "adresses",
        "bits": "bits",
        "private": "Privé (RFC 1918)",
        "public": "Public",
        "loopback": "Bouclage (127.x.x.x)",
        "linkLocal": "Lien Local / APIPA (169.254.x.x)",
        "multicast": "Multidiffusion (224–239.x.x.x)",
        "reserved": "Réservé (240–255.x.x.x)",
        "broadcast": "Diffusion Limitée",
        "currentNet": "Réseau Actuel",
        "classA": "Classe A",
        "classB": "Classe B",
        "classC": "Classe C",
        "classD": "Classe D (Multidiffusion)",
        "classE": "Classe E (Réservé)",
        "na": "N/D",
        "pointToPoint": "Point-à-Point (RFC 3021)",
        "singleHost": "Route Hôte Unique",
        "noSubnet": "—",
        "awsReserved": "5 IP (.0, .1, .2, .3, diffusion)",
        "azureReserved": "5 IP (.0, .1, .2, .3, diffusion)",
        "gcpReserved": "4 IP (.0, .1, diffusion, DHCP)",
        "standardReserved": "2 IP (.0 réseau, diffusion)",
        "Network/Broadcast": "Réservé",
        "Usable Hosts": "Hôtes Utilisables"
      },
      "formats": {
        "summary": "{cidrNotation} — Réseau : {networkAddress}, Diffusion : {broadcastAddress}, Utilisables : {usableHosts} hôtes ({firstHost} – {lastHost})."
      },
      "infoCards": {
        "metrics": {
          "title": "Aperçu du Sous-réseau",
          "items": [
            {
              "label": "Adresse Réseau",
              "valueKey": "networkAddress"
            },
            {
              "label": "Adresse de Diffusion",
              "valueKey": "broadcastAddress"
            },
            {
              "label": "Hôtes Utilisables",
              "valueKey": "usableHosts"
            },
            {
              "label": "Notation CIDR",
              "valueKey": "cidrNotation"
            }
          ]
        },
        "details": {
          "title": "Détails Binaires et Techniques",
          "items": [
            {
              "label": "Masque de Sous-réseau Binaire",
              "valueKey": "binarySubnetMask"
            },
            {
              "label": "Adresse IP Binaire",
              "valueKey": "binaryIp"
            },
            {
              "label": "Adresse IP Hexadécimale",
              "valueKey": "hexIp"
            },
            {
              "label": "IP Réservées",
              "valueKey": "reservedIps"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Sous-réseautage",
          "items": [
            "Utilisez /24 (254 hôtes) pour les réseaux domestiques ou de petits bureaux — taille de sous-réseau la plus courante.",
            "Plages privées (RFC 1918) : 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 — gratuites pour usage interne.",
            "Première IP = ID réseau, dernière IP = diffusion — aucune ne peut être assignée à un appareil.",
            "AWS/Azure réservent 3–5 IP supplémentaires par sous-réseau — utilisez toujours le mode fournisseur cloud pour des comptes précis."
          ]
        }
      },
      "chart": {
        "title": "Analyse Visuelle du Sous-réseau",
        "tabs": {
          "address-allocation": "Allocation d'Adresses",
          "cloud-comparison": "Comparaison Cloud"
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que le Sous-réseautage ?",
          "content": "Le sous-réseautage est la pratique de diviser un réseau IP plus large en sous-réseaux plus petits et indépendants appelés sous-réseaux. Chaque sous-réseau a sa propre plage d'adresses et fonctionne comme un domaine de diffusion séparé. Cette technique a été introduite pour résoudre l'inefficacité de l'adressage par classe, où les organisations recevaient bien plus d'adresses IP qu'elles n'en avaient besoin. En empruntant des bits de la portion hôte d'une adresse IP, les administrateurs peuvent créer plusieurs petits réseaux à partir d'un seul bloc d'adresses, améliorant l'efficacité du routage, réduisant le trafic de diffusion, renforçant la sécurité par isolation et optimisant l'utilisation de l'espace d'adressage IPv4 limité."
        },
        "howItWorks": {
          "title": "Comment Fonctionne la Notation CIDR",
          "content": "Le Routage Inter-Domaines Sans Classe (CIDR) a remplacé le système rigide par classe (Classe A, B, C) en 1993 avec la RFC 1519. Au lieu de frontières fixes, CIDR utilise une barre oblique suivie d'un nombre pour indiquer combien de bits forment le préfixe réseau. Par exemple, /24 signifie que 24 bits sont la portion réseau et 8 bits sont pour les hôtes, donnant 2⁸ = 256 adresses totales (254 utilisables). La formule clé est : adresses totales = 2^(32 − préfixe), et hôtes utilisables = total − 2 (soustrayant les adresses réseau et de diffusion)."
        },
        "considerations": {
          "title": "Concepts Clés du Sous-réseautage",
          "items": [
            {
              "text": "Adresse réseau : la première adresse d'un sous-réseau — identifie le réseau lui-même et ne peut être assignée à aucun hôte.",
              "type": "info"
            },
            {
              "text": "Adresse de diffusion : la dernière adresse — envoie des paquets à tous les hôtes de ce sous-réseau simultanément.",
              "type": "info"
            },
            {
              "text": "Masque générique : l'inverse binaire du masque de sous-réseau — utilisé dans les ACL Cisco et configurations de routage OSPF.",
              "type": "info"
            },
            {
              "text": "Planifiez la croissance : si vous avez besoin de 50 hôtes aujourd'hui, /26 (62 utilisables) laisse peu de marge — considérez /25 (126 utilisables).",
              "type": "warning"
            },
            {
              "text": "Les plages privées RFC 1918 ne sont pas routables sur Internet public — NAT les traduit en IP publiques pour l'accès externe.",
              "type": "info"
            },
            {
              "text": "Le sur-sous-réseautage gaspille les adresses : chaque sous-réseau perd 2 IP (réseau + diffusion), donc beaucoup de petits sous-réseaux s'accumulent.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Tailles de Sous-réseau Courantes",
          "items": [
            {
              "text": "/32 — Hôte Unique : Utilisé pour les adresses de bouclage et routes d'hôte dans les tables de routage.",
              "type": "info"
            },
            {
              "text": "/30 — 2 Hôtes : Standard pour les liens point-à-point entre routeurs (voir aussi /31 par RFC 3021).",
              "type": "info"
            },
            {
              "text": "/28 — 14 Hôtes : Petite salle de serveurs, quelques imprimantes, ou un VLAN IoT.",
              "type": "info"
            },
            {
              "text": "/24 — 254 Hôtes : Le sous-réseau le plus courant pour les maisons, petits bureaux et VLAN individuels.",
              "type": "info"
            },
            {
              "text": "/20 — 4 094 Hôtes : Entreprise moyenne — un étage d'immeuble entier ou grand département.",
              "type": "info"
            },
            {
              "text": "/16 — 65 534 Hôtes : Grand campus ou centre de données ; souvent la taille d'une allocation Classe B complète.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Sous-réseautage",
          "description": "Calculs de sous-réseau étape par étape",
          "examples": [
            {
              "title": "Exemple : 192.168.1.100 /24",
              "steps": [
                "IP : 192.168.1.100 → Binaire : 11000000.10101000.00000001.01100100",
                "CIDR /24 → Masque : 255.255.255.0 → Binaire : 11111111.11111111.11111111.00000000",
                "Opération ET : Réseau = 192.168.1.0 (premiers 24 bits correspondent, 8 derniers à zéro)",
                "Bits hôte = 32 − 24 = 8 → Adresses totales = 2⁸ = 256",
                "Hôtes utilisables = 256 − 2 = 254",
                "Premier utilisable : 192.168.1.1 | Dernier utilisable : 192.168.1.254 | Diffusion : 192.168.1.255"
              ],
              "result": "192.168.1.0/24 supporte 254 appareils. Générique : 0.0.0.255"
            },
            {
              "title": "Exemple : AWS VPC 10.0.0.0 /24",
              "steps": [
                "IP : 10.0.0.0/24 → 256 adresses totales",
                "Standard : 256 − 2 = 254 hôtes utilisables",
                "AWS réserve 5 IP : .0 (réseau), .1 (routeur VPC), .2 (DNS), .3 (futur), .255 (diffusion)",
                "AWS utilisables : 256 − 5 = 251 hôtes",
                "Premier utilisable : 10.0.0.4 | Dernier utilisable : 10.0.0.254",
                "Azure : mêmes 251 hôtes | GCP : 252 hôtes (4 réservées)"
              ],
              "result": "Utilisez toujours le mode fournisseur cloud pour des comptes d'hôtes précis dans AWS/Azure/GCP."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Qu'est-ce qu'un masque de sous-réseau et pourquoi est-il important ?",
          "answer": "Un masque de sous-réseau est un nombre de 32 bits qui divise une adresse IP en portion réseau et portion hôte. Il indique aux routeurs et appareils quelle partie de l'adresse IP identifie le réseau et quelle partie identifie les appareils individuels. Sans masque de sous-réseau, les appareils ne peuvent déterminer si une IP de destination est sur le même réseau local ou doit être transmise via un routeur. Le masque de sous-réseau le plus courant est 255.255.255.0 (/24), qui crée un réseau avec 254 adresses d'hôte utilisables."
        },
        "1": {
          "question": "En quoi AWS, Azure et GCP diffèrent-ils dans les IP réservées par sous-réseau ?",
          "answer": "Les fournisseurs cloud réservent des adresses IP supplémentaires au-delà des adresses réseau et de diffusion standard. AWS réserve 5 IP par sous-réseau : l'adresse réseau (.0), le routeur VPC (.1), le serveur DNS (.2), réservé pour usage futur (.3), et l'adresse de diffusion. Azure réserve également 5 IP avec un modèle similaire. Google Cloud réserve 4 IP : l'adresse réseau, la passerelle par défaut, la diffusion, et une pour DHCP. Cela signifie qu'un sous-réseau /24 vous donne 254 hôtes sur les réseaux standard, mais seulement 251 sur AWS/Azure ou 252 sur GCP."
        },
        "2": {
          "question": "Qu'est-ce que la notation CIDR et comment se rapporte-t-elle aux masques de sous-réseau ?",
          "answer": "La notation CIDR (Routage Inter-Domaines Sans Classe) utilise une barre oblique suivie d'un nombre pour indiquer combien de bits forment le préfixe réseau. Par exemple, /24 signifie que 24 bits sont la portion réseau, équivalent au masque de sous-réseau 255.255.255.0. CIDR a remplacé l'ancien système par classe (Classe A, B, C) pour permettre une allocation d'adresses plus flexible. La formule est simple : adresses totales = 2^(32 − longueur_préfixe), et hôtes utilisables = adresses totales − 2 (soustrayant les adresses réseau et de diffusion)."
        },
        "3": {
          "question": "Qu'est-ce qu'un masque générique et quand est-il utilisé ?",
          "answer": "Un masque générique est l'inverse binaire d'un masque de sous-réseau. Où un masque de sous-réseau a des 1, le masque générique a des 0, et vice versa. Par exemple, si le masque de sous-réseau est 255.255.255.0, le masque générique est 0.0.0.255. Les masques génériques sont principalement utilisés dans les ACL (Listes de Contrôle d'Accès) des routeurs Cisco et les configurations de routage OSPF pour spécifier quels bits d'une adresse doivent correspondre. Un masque générique de 0.0.0.255 signifie 'correspondre exactement aux trois premiers octets, permettre toute valeur dans le dernier octet.'"
        },
        "4": {
          "question": "Quelle est la différence entre les sous-réseaux /30 et /31 ?",
          "answer": "Un sous-réseau /30 fournit 4 adresses totales avec 2 hôtes utilisables — traditionnellement utilisé pour les liens point-à-point entre routeurs. Un sous-réseau /31 (défini dans RFC 3021) fournit exactement 2 adresses sans adresse réseau ou de diffusion, rendant les deux IP utilisables pour les liens point-à-point. Bien que /31 soit plus efficace (économise une IP), tous les équipements réseau anciens ne le supportent pas. Les routeurs modernes et la plupart des fournisseurs cloud supportent pleinement /31 pour les connexions routeur-à-routeur."
        },
        "5": {
          "question": "Comment choisir la bonne taille de sous-réseau pour mon réseau ?",
          "answer": "Commencez par compter le nombre d'appareils nécessitant des adresses IP, puis ajoutez 20–50% pour la croissance. Utilisez la formule : trouvez le plus petit préfixe CIDR où 2^(32−préfixe) − 2 ≥ votre nombre d'hôtes. Par exemple, 50 appareils nécessitent au moins un /26 (62 utilisables), mais un /25 (126 utilisables) fournit de la place pour grandir. Pour les déploiements cloud, n'oubliez pas de tenir compte des IP réservées supplémentaires. Pour les réseaux domestiques, /24 (254 hôtes) est presque toujours suffisant. Pour les liens routeur, utilisez /30 ou /31."
        }
      },
      "detailedTable": {
        "subnetReference": {
          "button": "Voir Toutes les Tailles de Sous-réseau Référence",
          "title": "Table de Référence des Sous-réseaux IPv4",
          "columns": {
            "cidr": "CIDR",
            "mask": "Masque de Sous-réseau",
            "wildcard": "Générique",
            "totalAddresses": "Adresses Totales",
            "usableHosts": "Hôtes Utilisables"
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
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      }
    },
    de: {
      "name": "IP-Subnetz-Rechner",
      "slug": "ip-subnetz-rechner",
      "subtitle": "Berechnen Sie Subnetzmaske, Netzwerkadresse, Broadcast, Wildcard-Maske und nutzbare Host-Bereiche aus jeder IPv4-Adresse und CIDR-Präfix.",
      "breadcrumb": "IP-Subnetz",
      "seo": {
        "title": "IP-Subnetz-Rechner - Kostenloses IPv4 CIDR & Masken-Tool",
        "description": "Berechnen Sie Subnetzmaske, Netzwerk- und Broadcast-Adressen, Wildcard-Maske, nutzbaren Host-Bereich und Binärnotation für jeden IPv4 CIDR-Block. Kostenloses Tool für Netzwerkingenieure.",
        "shortDescription": "Berechnen Sie IPv4-Subnetz-Details aus IP und CIDR-Präfix.",
        "keywords": [
          "ip subnetz rechner",
          "subnetzmaske rechner",
          "cidr rechner",
          "ipv4 subnetz rechner",
          "netzwerkadresse rechner",
          "kostenloser subnetz rechner",
          "subnetting tool",
          "aws vpc subnetz rechner"
        ]
      },
      "inputs": {
        "octet1": {
          "label": "IP-Adresse — Oktett 1",
          "helpText": "Erstes Oktett (0–255)"
        },
        "octet2": {
          "label": "Oktett 2",
          "helpText": "Zweites Oktett (0–255)"
        },
        "octet3": {
          "label": "Oktett 3",
          "helpText": "Drittes Oktett (0–255)"
        },
        "octet4": {
          "label": "Oktett 4",
          "helpText": "Viertes Oktett (0–255)"
        },
        "cidr": {
          "label": "CIDR-Präfixlänge (/)",
          "helpText": "Anzahl der Netzwerk-Bits — bestimmt die Subnetzgröße",
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
            "31": "/31 — 255.255.255.254 (2 Punkt-zu-Punkt)",
            "32": "/32 — 255.255.255.255 (einzelner Host)"
          }
        },
        "cloudProvider": {
          "label": "Cloud-Anbieter",
          "helpText": "Cloud-Anbieter reservieren zusätzliche IPs — beeinflusst die nutzbare Host-Anzahl",
          "options": {
            "standard": "Standard-Netzwerk",
            "aws": "AWS VPC (−5 IPs)",
            "azure": "Azure VNet (−5 IPs)",
            "gcp": "Google Cloud VPC (−4 IPs)"
          }
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
        "hostRange": {
          "label": "Nutzbarer Host-Bereich"
        },
        "ipClass": {
          "label": "IP-Klasse"
        },
        "ipType": {
          "label": "IP-Typ"
        },
        "networkBits": {
          "label": "Netzwerk-Bits"
        },
        "hostBits": {
          "label": "Host-Bits"
        },
        "nextSubnet": {
          "label": "Nächstes Subnetz"
        },
        "previousSubnet": {
          "label": "Vorheriges Subnetz"
        },
        "reservedIps": {
          "label": "Reservierte IPs"
        },
        "binarySubnetMask": {
          "label": "Binäre Subnetzmaske"
        },
        "binaryIp": {
          "label": "Binäre IP-Adresse"
        },
        "hexIp": {
          "label": "Hex IP-Adresse"
        }
      },
      "presets": {
        "homeNetwork": {
          "label": "Heimnetzwerk /24",
          "description": "192.168.1.100/24 — 254 nutzbare Hosts"
        },
        "smallOffice": {
          "label": "Kleines Büro /28",
          "description": "10.0.1.50/28 — 14 nutzbare Hosts"
        },
        "awsVpc": {
          "label": "AWS VPC /24",
          "description": "10.0.0.0/24 — 251 nutzbar (5 reserviert)"
        },
        "pointToPoint": {
          "label": "Punkt-zu-Punkt /30",
          "description": "10.1.1.0/30 — 2 Hosts (Router-Verbindung)"
        }
      },
      "values": {
        "hosts": "Hosts",
        "host": "Host",
        "addresses": "Adressen",
        "bits": "Bits",
        "private": "Privat (RFC 1918)",
        "public": "Öffentlich",
        "loopback": "Loopback (127.x.x.x)",
        "linkLocal": "Link-Local / APIPA (169.254.x.x)",
        "multicast": "Multicast (224–239.x.x.x)",
        "reserved": "Reserviert (240–255.x.x.x)",
        "broadcast": "Limitierter Broadcast",
        "currentNet": "Aktuelles Netzwerk",
        "classA": "Klasse A",
        "classB": "Klasse B",
        "classC": "Klasse C",
        "classD": "Klasse D (Multicast)",
        "classE": "Klasse E (Reserviert)",
        "na": "N/A",
        "pointToPoint": "Punkt-zu-Punkt (RFC 3021)",
        "singleHost": "Einzelner Host-Route",
        "noSubnet": "—",
        "awsReserved": "5 IPs (.0, .1, .2, .3, bcast)",
        "azureReserved": "5 IPs (.0, .1, .2, .3, bcast)",
        "gcpReserved": "4 IPs (.0, .1, bcast, DHCP)",
        "standardReserved": "2 IPs (.0 net, bcast)",
        "Network/Broadcast": "Reserviert",
        "Usable Hosts": "Nutzbare Hosts"
      },
      "formats": {
        "summary": "{cidrNotation} — Netzwerk: {networkAddress}, Broadcast: {broadcastAddress}, Nutzbar: {usableHosts} Hosts ({firstHost} – {lastHost})."
      },
      "infoCards": {
        "metrics": {
          "title": "Subnetz-Übersicht",
          "items": [
            {
              "label": "Netzwerkadresse",
              "valueKey": "networkAddress"
            },
            {
              "label": "Broadcast-Adresse",
              "valueKey": "broadcastAddress"
            },
            {
              "label": "Nutzbare Hosts",
              "valueKey": "usableHosts"
            },
            {
              "label": "CIDR-Notation",
              "valueKey": "cidrNotation"
            }
          ]
        },
        "details": {
          "title": "Binäre & Technische Details",
          "items": [
            {
              "label": "Binäre Subnetzmaske",
              "valueKey": "binarySubnetMask"
            },
            {
              "label": "Binäre IP-Adresse",
              "valueKey": "binaryIp"
            },
            {
              "label": "Hex IP-Adresse",
              "valueKey": "hexIp"
            },
            {
              "label": "Reservierte IPs",
              "valueKey": "reservedIps"
            }
          ]
        },
        "tips": {
          "title": "Subnetting-Tipps",
          "items": [
            "Verwenden Sie /24 (254 Hosts) für Heim- oder kleine Büronetzwerke — häufigste Subnetzgröße.",
            "Private Bereiche (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 — kostenlos für interne Nutzung.",
            "Erste IP = Netzwerk-ID, letzte IP = Broadcast — beide können nicht an Geräte vergeben werden.",
            "AWS/Azure reservieren 3–5 zusätzliche IPs pro Subnetz — verwenden Sie immer den Cloud-Anbieter-Modus für genaue Zählungen."
          ]
        }
      },
      "chart": {
        "title": "Subnetz Visuelle Analyse",
        "tabs": {
          "address-allocation": "Adress-Zuteilung",
          "cloud-comparison": "Cloud-Vergleich"
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist Subnetting?",
          "content": "Subnetting ist die Praxis, ein größeres IP-Netzwerk in kleinere, unabhängige Teilnetzwerke namens Subnetze zu unterteilen. Jedes Subnetz hat seinen eigenen Adressbereich und funktioniert als separate Broadcast-Domäne. Diese Technik wurde eingeführt, um die Ineffizienz der klassenbasierten Adressierung zu lösen, bei der Organisationen weit mehr IP-Adressen erhielten als sie benötigten. Durch das Ausleihen von Bits aus dem Host-Anteil einer IP-Adresse können Administratoren mehrere kleinere Netzwerke aus einem einzigen Adressblock erstellen, wodurch die Routing-Effizienz verbessert, Broadcast-Verkehr reduziert, die Sicherheit durch Isolation erhöht und der begrenzte IPv4-Adressraum besser genutzt wird. Jede IPv4-Adresse ist 32 Bit lang und in einen Netzwerkanteil (durch die Subnetzmaske identifiziert) und einen Host-Anteil (die verbleibenden Bits) unterteilt. Die Subnetzmaske teilt Routern mit, welcher Teil der Adresse das Netzwerk identifiziert und welcher Teil einzelne Geräte."
        },
        "howItWorks": {
          "title": "Wie CIDR-Notation funktioniert",
          "content": "Classless Inter-Domain Routing (CIDR) ersetzte 1993 mit RFC 1519 das starre klassenbasierte System (Klasse A, B, C). Anstelle fester Grenzen verwendet CIDR einen Schrägstrich gefolgt von einer Zahl, um anzuzeigen, wie viele Bits das Netzwerkpräfix bilden. Zum Beispiel bedeutet /24, dass 24 Bits der Netzwerkanteil und 8 Bits für Hosts sind, was 2⁸ = 256 Gesamtadressen (254 nutzbar) ergibt. Die Schlüsselformel lautet: Gesamtadressen = 2^(32 − Präfix), und nutzbare Hosts = Gesamt − 2 (abzüglich Netzwerk- und Broadcast-Adressen). Ein /16 gibt 65.534 nutzbare Hosts, während /28 nur 14 gibt. CIDR ermöglicht präzise Zuteilung — eine Organisation, die 500 Adressen benötigt, kann ein /23 (510 Hosts) erhalten, anstatt eine ganze Klasse B (/16 mit 65.534) zu verschwenden. Diese Flexibilität reduzierte dramatisch die IPv4-Adresserschöpfung und vereinfachte Routing-Tabellen durch Route-Aggregation (Supernetting)."
        },
        "considerations": {
          "title": "Wichtige Subnetting-Konzepte",
          "items": [
            {
              "text": "Netzwerkadresse: die erste Adresse in einem Subnetz — identifiziert das Netzwerk selbst und kann keinem Host zugewiesen werden.",
              "type": "info"
            },
            {
              "text": "Broadcast-Adresse: die letzte Adresse — sendet Pakete gleichzeitig an jeden Host in diesem Subnetz.",
              "type": "info"
            },
            {
              "text": "Wildcard-Maske: die bitweise Umkehrung der Subnetzmaske — verwendet in Cisco ACLs und OSPF-Routing-Konfigurationen.",
              "type": "info"
            },
            {
              "text": "Planen Sie für Wachstum: wenn Sie heute 50 Hosts benötigen, lässt /26 (62 nutzbar) wenig Spielraum — erwägen Sie /25 (126 nutzbar).",
              "type": "warning"
            },
            {
              "text": "RFC 1918 private Bereiche sind nicht im öffentlichen Internet routbar — NAT übersetzt sie in öffentliche IPs für externen Zugang.",
              "type": "info"
            },
            {
              "text": "Über-Subnetting verschwendet Adressen: jedes Subnetz verliert 2 IPs (Netzwerk + Broadcast), viele winzige Subnetze summieren sich.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Häufige Subnetzgrößen",
          "items": [
            {
              "text": "/32 — Einzelner Host: Verwendet für Loopback-Adressen und Host-Routen in Routing-Tabellen.",
              "type": "info"
            },
            {
              "text": "/30 — 2 Hosts: Standard für Punkt-zu-Punkt-Verbindungen zwischen Routern (siehe auch /31 per RFC 3021).",
              "type": "info"
            },
            {
              "text": "/28 — 14 Hosts: Kleiner Serverraum, einige Drucker oder ein IoT-VLAN.",
              "type": "info"
            },
            {
              "text": "/24 — 254 Hosts: Das häufigste Subnetz für Heime, kleine Büros und einzelne VLANs.",
              "type": "info"
            },
            {
              "text": "/20 — 4.094 Hosts: Mittleres Unternehmen — eine ganze Gebäudeetage oder große Abteilung.",
              "type": "info"
            },
            {
              "text": "/16 — 65.534 Hosts: Großer Campus oder Rechenzentrum; oft die Größe einer vollständigen Klasse B Zuteilung.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Subnetting-Beispiele",
          "description": "Schritt-für-Schritt Subnetz-Berechnungen",
          "examples": [
            {
              "title": "Beispiel: 192.168.1.100 /24",
              "steps": [
                "IP: 192.168.1.100 → Binär: 11000000.10101000.00000001.01100100",
                "CIDR /24 → Maske: 255.255.255.0 → Binär: 11111111.11111111.11111111.00000000",
                "UND-Operation: Netzwerk = 192.168.1.0 (erste 24 Bits stimmen überein, letzte 8 auf Null gesetzt)",
                "Host-Bits = 32 − 24 = 8 → Gesamtadressen = 2⁸ = 256",
                "Nutzbare Hosts = 256 − 2 = 254",
                "Erste nutzbare: 192.168.1.1 | Letzte nutzbare: 192.168.1.254 | Broadcast: 192.168.1.255"
              ],
              "result": "192.168.1.0/24 unterstützt 254 Geräte. Wildcard: 0.0.0.255"
            },
            {
              "title": "Beispiel: AWS VPC 10.0.0.0 /24",
              "steps": [
                "IP: 10.0.0.0/24 → 256 Gesamtadressen",
                "Standard: 256 − 2 = 254 nutzbare Hosts",
                "AWS reserviert 5 IPs: .0 (Netzwerk), .1 (VPC-Router), .2 (DNS), .3 (Zukunft), .255 (Broadcast)",
                "AWS nutzbar: 256 − 5 = 251 Hosts",
                "Erste nutzbare: 10.0.0.4 | Letzte nutzbare: 10.0.0.254",
                "Azure: gleiche 251 Hosts | GCP: 252 Hosts (4 reserviert)"
              ],
              "result": "Verwenden Sie immer den Cloud-Anbieter-Modus für genaue Host-Zählungen in AWS/Azure/GCP."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Was ist eine Subnetzmaske und warum ist sie wichtig?",
          "answer": "Eine Subnetzmaske ist eine 32-Bit-Zahl, die eine IP-Adresse in den Netzwerkanteil und den Host-Anteil unterteilt. Sie teilt Routern und Geräten mit, welcher Teil der IP-Adresse das Netzwerk identifiziert und welcher Teil einzelne Geräte. Ohne Subnetzmaske können Geräte nicht bestimmen, ob eine Ziel-IP im selben lokalen Netzwerk ist oder über einen Router weitergeleitet werden muss. Die häufigste Subnetzmaske ist 255.255.255.0 (/24), die ein Netzwerk mit 254 nutzbaren Host-Adressen erstellt."
        },
        "1": {
          "question": "Wie unterscheiden sich AWS, Azure und GCP bei reservierten IPs pro Subnetz?",
          "answer": "Cloud-Anbieter reservieren zusätzliche IP-Adressen über die Standard-Netzwerk- und Broadcast-Adressen hinaus. AWS reserviert 5 IPs pro Subnetz: die Netzwerkadresse (.0), den VPC-Router (.1), den DNS-Server (.2), für zukünftige Nutzung reserviert (.3) und die Broadcast-Adresse. Azure reserviert ebenfalls 5 IPs mit ähnlichem Muster. Google Cloud reserviert 4 IPs: die Netzwerkadresse, Standard-Gateway, Broadcast und eine für DHCP. Das bedeutet, ein /24-Subnetz gibt Ihnen 254 Hosts in Standard-Netzwerken, aber nur 251 bei AWS/Azure oder 252 bei GCP."
        },
        "2": {
          "question": "Was ist CIDR-Notation und wie verhält sie sich zu Subnetzmasken?",
          "answer": "CIDR (Classless Inter-Domain Routing) Notation verwendet einen Schrägstrich gefolgt von einer Zahl, um anzuzeigen, wie viele Bits das Netzwerkpräfix bilden. Zum Beispiel bedeutet /24, dass 24 Bits der Netzwerkanteil sind, entsprechend der Subnetzmaske 255.255.255.0. CIDR ersetzte das alte klassenbasierte System (Klasse A, B, C), um flexiblere Adresszuteilung zu ermöglichen. Die Formel ist einfach: Gesamtadressen = 2^(32 − Präfix_Länge), und nutzbare Hosts = Gesamtadressen − 2 (abzüglich der Netzwerk- und Broadcast-Adressen)."
        },
        "3": {
          "question": "Was ist eine Wildcard-Maske und wann wird sie verwendet?",
          "answer": "Eine Wildcard-Maske ist die bitweise Umkehrung einer Subnetzmaske. Wo eine Subnetzmaske 1en hat, hat die Wildcard-Maske 0en und umgekehrt. Zum Beispiel, wenn die Subnetzmaske 255.255.255.0 ist, ist die Wildcard-Maske 0.0.0.255. Wildcard-Masken werden hauptsächlich in Cisco-Router-ACLs (Access Control Lists) und OSPF-Routing-Konfigurationen verwendet, um zu spezifizieren, welche Bits einer Adresse abgeglichen werden sollen. Eine Wildcard-Maske von 0.0.0.255 bedeutet 'stimme mit den ersten drei Oktetten genau überein, erlaube jeden Wert im letzten Oktett.'"
        },
        "4": {
          "question": "Was ist der Unterschied zwischen /30 und /31 Subnetzen?",
          "answer": "Ein /30-Subnetz bietet 4 Gesamtadressen mit 2 nutzbaren Hosts — traditionell für Punkt-zu-Punkt-Verbindungen zwischen Routern verwendet. Ein /31-Subnetz (definiert in RFC 3021) bietet genau 2 Adressen ohne Netzwerk- oder Broadcast-Adresse, wodurch beide IPs für Punkt-zu-Punkt-Verbindungen nutzbar sind. Während /31 effizienter ist (spart eine IP), unterstützen nicht alle älteren Netzwerkgeräte es. Moderne Router und die meisten Cloud-Anbieter unterstützen /31 vollständig für Router-zu-Router-Verbindungen."
        },
        "5": {
          "question": "Wie wähle ich die richtige Subnetzgröße für mein Netzwerk?",
          "answer": "Beginnen Sie mit der Zählung der Anzahl von Geräten, die IP-Adressen benötigen, dann fügen Sie 20–50% für Wachstum hinzu. Verwenden Sie die Formel: finden Sie das kleinste CIDR-Präfix, bei dem 2^(32−Präfix) − 2 ≥ Ihre Host-Anzahl. Zum Beispiel benötigen 50 Geräte mindestens ein /26 (62 nutzbar), aber ein /25 (126 nutzbar) bietet Raum zum Wachsen. Für Cloud-Bereitstellungen denken Sie daran, die zusätzlichen reservierten IPs zu berücksichtigen. Für Heimnetzwerke ist /24 (254 Hosts) fast immer ausreichend. Für Router-Verbindungen verwenden Sie /30 oder /31."
        }
      },
      "detailedTable": {
        "subnetReference": {
          "button": "Alle Subnetzgrößen Referenz anzeigen",
          "title": "IPv4-Subnetz-Referenztabelle",
          "columns": {
            "cidr": "CIDR",
            "mask": "Subnetzmaske",
            "wildcard": "Wildcard",
            "totalAddresses": "Gesamtadressen",
            "usableHosts": "Nutzbare Hosts"
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
    { id: "networkBits", type: "secondary", format: "text" },
    { id: "hostBits", type: "secondary", format: "text" },
    { id: "nextSubnet", type: "secondary", format: "text" },
    { id: "previousSubnet", type: "secondary", format: "text" },
    { id: "reservedIps", type: "secondary", format: "text" },
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

  chart: {
    title: "Subnet Visual Analysis",
    xKey: "name",
    type: "bar",
    stacked: false,
    tabs: [
      {
        id: "address-allocation",
        label: "Address Allocation",
        series: [
          { key: "value", name: "Addresses", color: "#3B82F6" },
        ],
      },
      {
        id: "cloud-comparison",
        label: "Cloud Comparison",
        series: [
          { key: "value", name: "Usable Hosts", color: "#10B981" },
        ],
      },
    ],
  },

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

/** Cloud provider reserved IPs per subnet */
function getReservedCount(provider: string, cidr: number): number {
  if (cidr >= 31) return 0; // /31 and /32 are special cases
  switch (provider) {
    case "aws": return 5;    // .0 network, .1 VPC router, .2 DNS, .3 future, broadcast
    case "azure": return 5;  // .0 network, .1 gateway, .2–.3 Azure DNS, broadcast
    case "gcp": return 4;    // .0 network, .1 gateway, broadcast, DHCP
    default: return 2;       // .0 network, broadcast
  }
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

  // ── Read inputs ────────────────────────────────────────────────────────
  const o1 = values.octet1 as number | null;
  const o2 = values.octet2 as number | null;
  const o3 = values.octet3 as number | null;
  const o4 = values.octet4 as number | null;
  const cidrStr = values.cidr as string;
  const cidr = parseInt(cidrStr, 10);
  const cloudProvider = (values.cloudProvider as string) || "standard";

  // ── Validate ───────────────────────────────────────────────────────────
  if (o1 === null || o2 === null || o3 === null || o4 === null) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (o1 < 0 || o1 > 255 || o2 < 0 || o2 > 255 || o3 < 0 || o3 > 255 || o4 < 0 || o4 > 255) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (isNaN(cidr) || cidr < 0 || cidr > 32) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Core calculations ──────────────────────────────────────────────────
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
    usableHosts = Math.max(0, totalAddresses - reservedCount);
    // Adjust first usable host for cloud providers
    if (cloudProvider === "aws" || cloudProvider === "azure") {
      firstHostInt = networkInt + 4; // Skip .0, .1, .2, .3
    } else if (cloudProvider === "gcp") {
      firstHostInt = networkInt + 2; // Skip .0, .1
    } else {
      firstHostInt = networkInt + 1;
    }
    lastHostInt = broadcastInt - 1;
  }

  // ── Derived values ─────────────────────────────────────────────────────
  const ipAddress = `${o1}.${o2}.${o3}.${o4}`;
  const networkAddress = intToIp(networkInt);
  const broadcastAddress = intToIp(broadcastInt);
  const subnetMask = intToIp(maskInt);
  const wildcardMask = intToIp(wildcardInt);
  const firstHost = intToIp(firstHostInt);
  const lastHost = intToIp(lastHostInt);
  const hostRange = `${firstHost} – ${lastHost}`;
  const cidrNotation = `${networkAddress} /${cidr}`;
  const binarySubnetMask = intToBinary(maskInt);
  const binaryIp = intToBinary(ipInt);
  const hexIp = intToHex(ipInt);

  const ipClassKey = getIpClass(o1);
  const ipTypeKey = getIpType(o1, o2);
  const ipClassLabel = v[ipClassKey] || ipClassKey;
  const ipTypeLabel = v[ipTypeKey] || ipTypeKey;
  const hostsLabel = usableHosts === 1 ? (v["host"] || "host") : (v["hosts"] || "hosts");
  const bitsLabel = v["bits"] || "bits";
  const noSubnet = v["noSubnet"] || "—";

  // ── Next / Previous subnet ─────────────────────────────────────────────
  let nextSubnet = noSubnet;
  let previousSubnet = noSubnet;

  if (cidr < 32) {
    const nextNetworkInt = (broadcastInt + 1) >>> 0;
    if (nextNetworkInt !== 0) {
      nextSubnet = `${intToIp(nextNetworkInt)}/${cidr}`;
    }
    if (networkInt > 0) {
      const prevNetworkInt = (networkInt - totalAddresses) >>> 0;
      if (prevNetworkInt < networkInt) {
        previousSubnet = `${intToIp(prevNetworkInt)}/${cidr}`;
      }
    }
  }

  // ── Reserved IPs description ───────────────────────────────────────────
  const reservedKey = `${cloudProvider}Reserved`;
  const reservedIps = v[reservedKey] || v["standardReserved"] || `${reservedCount} addresses reserved`;

  // ── Subnet reference table (respects cloud provider) ───────────────────
  const tableData: Array<Record<string, string>> = [];
  const cidrValues = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
  for (const c of cidrValues) {
    const m = cidrToMask(c);
    const w = (~m) >>> 0;
    const total = Math.pow(2, 32 - c);
    const reserved = getReservedCount(cloudProvider, c);
    const usable = c === 32 ? 1 : c === 31 ? 2 : Math.max(0, total - reserved);
    tableData.push({
      cidr: `/${c}`,
      mask: intToIp(m),
      wildcard: intToIp(w),
      totalAddresses: formatNumber(total),
      usableHosts: formatNumber(usable),
    });
  }

  const currentIndex = cidrValues.indexOf(cidr);
  if (currentIndex !== -1) {
    tableData[currentIndex].cidr = `► /${cidr}`;
  }

  // ── Summary ────────────────────────────────────────────────────────────
  const f = (t?.formats as Record<string, string>) || {};
  const summaryTemplate = f.summary || "{cidrNotation} — Usable: {usableHosts} hosts";
  const summary = summaryTemplate
    .replace("{cidrNotation}", cidrNotation)
    .replace("{networkAddress}", networkAddress)
    .replace("{broadcastAddress}", broadcastAddress)
    .replace("{usableHosts}", formatNumber(usableHosts))
    .replace("{firstHost}", firstHost)
    .replace("{lastHost}", lastHost);

  // ── Chart data ─────────────────────────────────────────────────────────

  // Tab 1: Address allocation for current subnet
  const addressAllocationData = [
    { name: v["Network/Broadcast"] || "Reserved", value: reservedCount },
    { name: v["Usable Hosts"] || "Usable Hosts", value: usableHosts },
  ];

  // Tab 2: Cloud provider comparison
  const stdUsable = cidr >= 31 ? (cidr === 32 ? 1 : 2) : totalAddresses - 2;
  const awsUsable = cidr >= 31 ? (cidr === 32 ? 1 : 2) : Math.max(0, totalAddresses - 5);
  const azUsable = cidr >= 31 ? (cidr === 32 ? 1 : 2) : Math.max(0, totalAddresses - 5);
  const gcpUsable = cidr >= 31 ? (cidr === 32 ? 1 : 2) : Math.max(0, totalAddresses - 4);

  const cloudComparisonData = [
    { name: "Standard", value: stdUsable },
    { name: "AWS VPC", value: awsUsable },
    { name: "Azure VNet", value: azUsable },
    { name: "GCP VPC", value: gcpUsable },
  ];

  // ── Format results (binary/hex only when toggle ON) ────────────────────
  const formatted: Record<string, string> = {
    cidrNotation,
    networkAddress,
    broadcastAddress,
    subnetMask,
    wildcardMask,
    totalAddresses: formatNumber(totalAddresses),
    usableHosts: `${formatNumber(usableHosts)} ${hostsLabel}`,
    hostRange,
    ipClass: ipClassLabel,
    ipType: ipTypeLabel,
    networkBits: `${cidr} ${bitsLabel}`,
    hostBits: `${32 - cidr} ${bitsLabel}`,
    nextSubnet,
    previousSubnet,
    reservedIps,
    binarySubnetMask,
    binaryIp,
    hexIp,
  };

  // ── Return ─────────────────────────────────────────────────────────────
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
      networkBits: cidr,
      hostBits: 32 - cidr,
      nextSubnet,
      previousSubnet,
      reservedIps,
      binarySubnetMask,
      binaryIp,
      hexIp,
    },
    formatted,
    summary,
    isValid: true,
    metadata: {
      tableData,
      chartsData: {
        "address-allocation": addressAllocationData,
        "cloud-comparison": cloudComparisonData,
      },
    },
  };
}

export default ipSubnetConfig;
