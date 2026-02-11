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
    },
    {
      id: "ispAllocation",
      icon: "🌐",
      values: {
        networkAddress: "203.0.113.0",
        cidr: "24",
        subnet1Hosts: 120,
        subnet2Hosts: 60,
        subnet3Hosts: 30,
        subnet4Hosts: 14,
      },
    },
  ],

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
        ispAllocation: { label: "ISP Block /24", description: "203.0.113.0/24 → 4 customers (120, 60, 30, 14)" },
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
    es: {
      "name": "Calculadora VLSM",
      "slug": "calculadora-vlsm-mascara-subred-longitud-variable",
      "subtitle": "Divide una red en subredes de tamaño variable usando VLSM. Asigna direcciones IP eficientemente con desperdicio mínimo — ingresa tus requisitos de hosts y obtén subredes óptimas.",
      "breadcrumb": "VLSM",
      "seo": {
        "title": "Calculadora VLSM - Herramienta de Máscara de Subred de Longitud Variable",
        "description": "Divide una red en subredes de tamaño óptimo usando VLSM. Ingresa los requisitos de hosts por subred y obtén direcciones de red, máscaras, rangos y análisis de desperdicio. Herramienta VLSM gratuita.",
        "shortDescription": "Divide una red en subredes de tamaño variable con VLSM.",
        "keywords": [
          "calculadora vlsm",
          "máscara de subred longitud variable",
          "subneteo vlsm",
          "calculadora vlsm cidr",
          "divisor de subredes",
          "calculadora vlsm gratuita",
          "herramienta subneteo redes",
          "asignación direcciones ip"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "networkAddress": {
          "label": "Dirección de Red Principal",
          "helpText": "El bloque de dirección IP inicial a subdividir (ej. 192.168.1.0)"
        },
        "cidr": {
          "label": "Prefijo de Red (/)",
          "helpText": "Prefijo CIDR de la red principal",
          "options": {
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
            "28": "/28 — 14 hosts"
          }
        },
        "subnet1Hosts": {
          "label": "Subred 1 — Hosts Requeridos",
          "helpText": "Número de dispositivos para la subred más grande"
        },
        "subnet2Hosts": {
          "label": "Subred 2 — Hosts Requeridos",
          "helpText": "Número de dispositivos para la segunda subred"
        },
        "subnet3Hosts": {
          "label": "Subred 3 — Hosts Requeridos",
          "helpText": "Número de dispositivos para la tercera subred"
        },
        "subnet4Hosts": {
          "label": "Subred 4 — Hosts Requeridos",
          "helpText": "Número de dispositivos para la cuarta subred (ingresa 0 para omitir)"
        }
      },
      "results": {
        "totalAllocated": {
          "label": "Total de Direcciones Asignadas"
        },
        "totalAvailable": {
          "label": "Total de Direcciones Disponibles"
        },
        "totalWasted": {
          "label": "Direcciones Desperdiciadas"
        },
        "efficiency": {
          "label": "Eficiencia de Asignación"
        },
        "subnetsCreated": {
          "label": "Subredes Creadas"
        },
        "addressesRemaining": {
          "label": "Direcciones Restantes"
        }
      },
      "presets": {
        "smallOffice": {
          "label": "Oficina Pequeña /24",
          "description": "192.168.1.0/24 → 4 departamentos (50, 30, 10, 2)"
        },
        "campus": {
          "label": "Campus /22",
          "description": "10.10.0.0/22 → 4 edificios (500, 200, 100, 50)"
        },
        "labNetwork": {
          "label": "Red de Laboratorio /24",
          "description": "172.16.0.0/24 → 4 VLANs (100, 60, 25, 5)"
        },
        "ispAllocation": {
          "label": "Bloque ISP /24",
          "description": "203.0.113.0/24 → 4 clientes (120, 60, 30, 14)"
        }
      },
      "values": {
        "hosts": "hosts",
        "addresses": "direcciones",
        "wasted": "desperdiciadas",
        "remaining": "restantes",
        "subnet": "Subred",
        "allocated": "asignadas",
        "needed": "necesarias",
        "available": "disponibles",
        "efficiency": "eficiencia",
        "error": "Error",
        "doesNotFit": "Los hosts requeridos no caben en este bloque de red."
      },
      "formats": {
        "summary": "VLSM dividió {networkAddress}/{cidr} en {subnetsCreated} subredes con {efficiency}% de eficiencia. {addressesRemaining} direcciones restantes."
      },
      "infoCards": {
        "metrics": {
          "title": "Resumen de Asignación",
          "items": [
            {
              "label": "Subredes Creadas",
              "valueKey": "subnetsCreated"
            },
            {
              "label": "Total Asignado",
              "valueKey": "totalAllocated"
            },
            {
              "label": "Direcciones Restantes",
              "valueKey": "addressesRemaining"
            },
            {
              "label": "Eficiencia",
              "valueKey": "efficiency"
            }
          ]
        },
        "details": {
          "title": "Bloque de Red",
          "items": [
            {
              "label": "Red Principal",
              "valueKey": "totalAvailable"
            },
            {
              "label": "Total Desperdiciado",
              "valueKey": "totalWasted"
            },
            {
              "label": "Subredes Creadas",
              "valueKey": "subnetsCreated"
            },
            {
              "label": "Eficiencia",
              "valueKey": "efficiency"
            }
          ]
        },
        "tips": {
          "title": "Consejos VLSM",
          "items": [
            "VLSM siempre asigna primero la subred más grande, luego trabaja hacia abajo — esto minimiza la fragmentación.",
            "Cada subred pierde 2 direcciones (red + broadcast) — planifica para esta sobrecarga.",
            "Agrega 10–20% a tu conteo de hosts para crecimiento futuro antes de ingresar los requisitos.",
            "VLSM es más eficiente que el subneteo fijo: un /24 dividido con VLSM puede ahorrar 30–50% de IPs desperdiciadas."
          ]
        }
      },
      "detailedTable": {
        "vlsmAllocation": {
          "button": "Ver Tabla Completa de Asignación VLSM",
          "title": "Detalles de Asignación de Subredes VLSM",
          "columns": {
            "name": "Subred",
            "needed": "Hosts Necesarios",
            "allocated": "Tamaño (Asignado)",
            "network": "Dirección de Red",
            "mask": "Máscara de Subred",
            "range": "Rango Utilizable",
            "broadcast": "Broadcast",
            "wasted": "IPs Desperdiciadas"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es VLSM?",
          "content": "VLSM (Máscara de Subred de Longitud Variable) es una técnica de subneteo que permite a los administradores de red usar diferentes tamaños de máscara de subred dentro del mismo espacio de direcciones. A diferencia del subneteo de longitud fija donde cada subred debe ser del mismo tamaño, VLSM te permite crear subredes adaptadas al número exacto de hosts que necesita cada segmento. Por ejemplo, un departamento con 200 estaciones de trabajo obtiene una subred /24 (254 hosts), mientras que un enlace punto a punto entre routers obtiene un /30 (2 hosts). Esto reduce dramáticamente el desperdicio de direcciones IP comparado con dar a ambos segmentos el mismo /24. VLSM se hizo posible con la adopción de CIDR y requiere protocolos de enrutamiento que transporten información de máscara de subred, como OSPF, EIGRP, IS-IS o BGP."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Asignación VLSM",
          "content": "El algoritmo VLSM sigue un principio simple: ordena todos los requisitos de subred de mayor a menor, luego asigna cada uno usando la máscara de subred más pequeña que encaje. Comienza con el requisito más grande — encuentra el prefijo CIDR mínimo que proporcione suficientes hosts (utilizable = 2^bits_host − 2). Asigna ese bloque comenzando desde la siguiente dirección disponible en la red principal. Luego pasa al siguiente requisito más grande y repite. Este enfoque de mayor-primero asegura alineación óptima y previene fragmentación. Por ejemplo, comenzando con 192.168.1.0/24 (254 utilizables), si necesitas 100, 50 y 10 hosts: el primero obtiene /25 (126 utilizables), el segundo obtiene /26 (62 utilizables), y el tercero obtiene /28 (14 utilizables), usando 128 + 64 + 16 = 208 de 256 direcciones con 48 restantes para crecimiento futuro."
        },
        "considerations": {
          "title": "Guías de Planificación VLSM",
          "items": [
            {
              "text": "Siempre ordena las subredes por tamaño (mayor primero) antes de asignar — esto previene la fragmentación del espacio de direcciones.",
              "type": "info"
            },
            {
              "text": "Cada subred debe alinearse a su tamaño de bloque: un /26 (64 direcciones) debe comenzar en un múltiplo de 64.",
              "type": "warning"
            },
            {
              "text": "La subred práctica mínima es /30 (2 hosts utilizables) para enlaces de router; /28 (14 hosts) para redes de dispositivos.",
              "type": "info"
            },
            {
              "text": "Agrega 20% de margen de crecimiento: si necesitas 100 hosts, planifica para 120 — esto aún cabe en un /25 (126 utilizables).",
              "type": "warning"
            },
            {
              "text": "Subneteo fijo de un /24 en bloques /26 iguales da 4 × 62 = 248 hosts. VLSM puede satisfacer las mismas necesidades en menos direcciones.",
              "type": "info"
            },
            {
              "text": "Documenta tu plan VLSM cuidadosamente — las subredes de tamaño variable son más difíciles de solucionar que las fijas.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Comparación VLSM vs Subneteo Fijo",
          "items": [
            {
              "text": "/26 fijo para 200 + 50 + 10: necesita 4 subredes = 256 IPs, desperdicia 196 (23% eficiencia).",
              "type": "warning"
            },
            {
              "text": "VLSM para 200 + 50 + 10: /24 + /26 + /28 = 336 IPs necesarias, pero solo 256 + 64 + 16 = 336 (77% eficiencia).",
              "type": "info"
            },
            {
              "text": "Asignación ISP: VLSM permite a ISPs dar /28 a clientes pequeños, /24 a medianos, /22 a grandes — desde un bloque /16.",
              "type": "info"
            },
            {
              "text": "Red de campus: administración (200 PCs) obtiene /24, laboratorio (30 PCs) obtiene /27, cámaras de seguridad (8) obtienen /28.",
              "type": "info"
            },
            {
              "text": "Centro de datos: VLAN de producción /23 (510 hosts), gestión /27 (30), fuera de banda /29 (6).",
              "type": "info"
            },
            {
              "text": "Laboratorio casero: LAN principal /25 (126), IoT /28 (14), Wi-Fi invitado /28 (14) — todo desde un /24.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Asignación VLSM",
          "description": "División de subred paso a paso",
          "examples": [
            {
              "title": "Oficina: 192.168.1.0/24 → 4 Subredes",
              "steps": [
                "Requisitos: Ingeniería (100), Ventas (50), RRHH (20), Enlaces router (2)",
                "Ordenar mayor primero: 100, 50, 20, 2",
                "Subred 1: 100 hosts → necesita /25 (126 utilizables). Red: 192.168.1.0/25, rango .1–.126",
                "Subred 2: 50 hosts → necesita /26 (62 utilizables). Red: 192.168.1.128/26, rango .129–.190",
                "Subred 3: 20 hosts → necesita /27 (30 utilizables). Red: 192.168.1.192/27, rango .193–.222",
                "Subred 4: 2 hosts → necesita /30 (2 utilizables). Red: 192.168.1.224/30, rango .225–.226"
              ],
              "result": "Usó 200 de 256 direcciones (78% eficiencia). Quedan 56 direcciones para crecimiento."
            },
            {
              "title": "Campus: 10.10.0.0/22 → 3 Edificios",
              "steps": [
                "Total disponible: /22 = 1,022 direcciones utilizables",
                "Requisitos: Edificio principal (500), Anexo (200), Laboratorio (50)",
                "Subred 1: 500 → necesita /23 (510 utilizables). Red: 10.10.0.0/23, rango .0.1–.1.254",
                "Subred 2: 200 → necesita /24 (254 utilizables). Red: 10.10.2.0/24, rango .2.1–.2.254",
                "Subred 3: 50 → necesita /26 (62 utilizables). Red: 10.10.3.0/26, rango .3.1–.3.62",
                "Restante: 10.10.3.64/26 hasta 10.10.3.255 (192 direcciones para uso futuro)"
              ],
              "result": "Usó 832 de 1,024 direcciones. Quedan 192 — suficientes para dos subredes /26 más."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es la diferencia entre VLSM y CIDR?",
          "answer": "CIDR (Enrutamiento Inter-Dominio sin Clases) es el sistema de notación que permite prefijos de longitud variable (ej. /22, /27). VLSM (Máscara de Subred de Longitud Variable) es la técnica de aplicar diferentes longitudes de prefijo CIDR a diferentes subredes dentro del mismo bloque de direcciones. Piensa en CIDR como el lenguaje y VLSM como la práctica de diseño que lo usa. VLSM requiere protocolos de enrutamiento conscientes de CIDR como OSPF o EIGRP."
        },
        {
          "question": "¿Qué protocolos de enrutamiento soportan VLSM?",
          "answer": "Los protocolos modernos que transportan información de máscara de subred soportan VLSM: OSPF (Open Shortest Path First), EIGRP (Enhanced Interior Gateway Routing Protocol), IS-IS, BGP, y RIPv2. El antiguo RIPv1 NO soporta VLSM porque asume límites con clases y no incluye la máscara en las actualizaciones de enrutamiento. Las rutas estáticas también soportan VLSM ya que la máscara se especifica manualmente."
        },
        {
          "question": "¿Por qué debo ordenar las subredes de mayor a menor?",
          "answer": "Las subredes deben alinearse a su tamaño de bloque — un /26 (64 direcciones) debe comenzar en un múltiplo de 64. Si asignas una subred pequeña primero, puedes crear un hueco que desperdicia direcciones porque la siguiente subred más grande no puede encajar ahí. Ordenar mayor-primero asegura que cada bloque comience en un límite naturalmente alineado, maximizando el espacio utilizable y previniendo fragmentación."
        },
        {
          "question": "¿Cómo sé qué tamaño de subred necesito para N hosts?",
          "answer": "Encuentra la potencia de 2 más pequeña que sea mayor que N + 2 (el +2 cuenta las direcciones de red y broadcast). Para 100 hosts: 100 + 2 = 102, siguiente potencia de 2 es 128 = 2⁷, entonces bits de host = 7, prefijo = 32 − 7 = /25 (126 utilizables). Para 50 hosts: 52 → 64 = 2⁶ → /26 (62 utilizables). Para 10 hosts: 12 → 16 = 2⁴ → /28 (14 utilizables)."
        },
        {
          "question": "¿Puedo usar VLSM con IPv6?",
          "answer": "IPv6 usa un prefijo fijo /64 para todas las subredes de host como recomienda RFC 4291, dando a cada subred 2⁶⁴ direcciones — más que suficiente para cualquier LAN. Los prefijos variables estilo-VLSM se usan en niveles superiores (entre /48 y /64) para asignar subredes a departamentos, pero dentro de cada subred el tamaño es siempre /64. El espacio de direcciones masivo de IPv6 elimina la necesidad de VLSM a nivel de host."
        },
        {
          "question": "¿Qué pasa si mis hosts no caben en el bloque de red?",
          "answer": "Si las direcciones totales requeridas exceden el espacio disponible en tu red principal, el cálculo VLSM falla. Por ejemplo, tratar de encajar 200 + 100 + 50 hosts en un /24 (254 direcciones totales) no funcionará porque necesitas /24 (256) + /25 (128) + /26 (64) = 448 direcciones. Solución: usa un bloque de red más grande (como /23 o /22) o reduce tus requisitos de hosts."
        }
      ],
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
      "name": "Calculadora VLSM",
      "slug": "calculadora-vlsm-mascaramento-sub-rede-comprimento-variavel",
      "subtitle": "Divida uma rede em sub-redes de tamanhos variáveis usando VLSM. Aloque endereços IP eficientemente com desperdício mínimo — insira seus requisitos de hosts e obtenha sub-redes otimizadas.",
      "breadcrumb": "VLSM",
      "seo": {
        "title": "Calculadora VLSM - Ferramenta de Mascaramento de Sub-rede de Comprimento Variável",
        "description": "Divida uma rede em sub-redes de tamanhos otimizados usando VLSM. Insira requisitos de hosts por sub-rede e obtenha endereços de rede, máscaras, faixas e análise de desperdício. Ferramenta VLSM gratuita.",
        "shortDescription": "Divida uma rede em sub-redes de tamanhos variáveis com VLSM.",
        "keywords": [
          "calculadora vlsm",
          "mascaramento de sub-rede de comprimento variável",
          "sub-redes vlsm",
          "calculadora vlsm cidr",
          "divisor de sub-rede",
          "calculadora vlsm gratuita",
          "ferramenta de sub-redes de rede",
          "alocação de endereço ip"
        ]
      },
      "inputs": {
        "networkAddress": {
          "label": "Endereço de Rede Principal",
          "helpText": "O bloco de endereços IP inicial para subdividir (ex: 192.168.1.0)"
        },
        "cidr": {
          "label": "Prefixo de Rede (/)",
          "helpText": "Prefixo CIDR da rede principal",
          "options": {
            "16": "/16 — 65.534 hosts",
            "17": "/17 — 32.766 hosts",
            "18": "/18 — 16.382 hosts",
            "19": "/19 — 8.190 hosts",
            "20": "/20 — 4.094 hosts",
            "21": "/21 — 2.046 hosts",
            "22": "/22 — 1.022 hosts",
            "23": "/23 — 510 hosts",
            "24": "/24 — 254 hosts",
            "25": "/25 — 126 hosts",
            "26": "/26 — 62 hosts",
            "27": "/27 — 30 hosts",
            "28": "/28 — 14 hosts"
          }
        },
        "subnet1Hosts": {
          "label": "Sub-rede 1 — Hosts Necessários",
          "helpText": "Número de dispositivos para a maior sub-rede"
        },
        "subnet2Hosts": {
          "label": "Sub-rede 2 — Hosts Necessários",
          "helpText": "Número de dispositivos para a segunda sub-rede"
        },
        "subnet3Hosts": {
          "label": "Sub-rede 3 — Hosts Necessários",
          "helpText": "Número de dispositivos para a terceira sub-rede"
        },
        "subnet4Hosts": {
          "label": "Sub-rede 4 — Hosts Necessários",
          "helpText": "Número de dispositivos para a quarta sub-rede (digite 0 para pular)"
        }
      },
      "results": {
        "totalAllocated": {
          "label": "Total de Endereços Alocados"
        },
        "totalAvailable": {
          "label": "Total de Endereços Disponíveis"
        },
        "totalWasted": {
          "label": "Endereços Desperdiçados"
        },
        "efficiency": {
          "label": "Eficiência de Alocação"
        },
        "subnetsCreated": {
          "label": "Sub-redes Criadas"
        },
        "addressesRemaining": {
          "label": "Endereços Restantes"
        }
      },
      "presets": {
        "smallOffice": {
          "label": "Escritório Pequeno /24",
          "description": "192.168.1.0/24 → 4 departamentos (50, 30, 10, 2)"
        },
        "campus": {
          "label": "Campus /22",
          "description": "10.10.0.0/22 → 4 edifícios (500, 200, 100, 50)"
        },
        "labNetwork": {
          "label": "Rede de Laboratório /24",
          "description": "172.16.0.0/24 → 4 VLANs (100, 60, 25, 5)"
        },
        "ispAllocation": {
          "label": "Bloco ISP /24",
          "description": "203.0.113.0/24 → 4 clientes (120, 60, 30, 14)"
        }
      },
      "values": {
        "hosts": "hosts",
        "addresses": "endereços",
        "wasted": "desperdiçados",
        "remaining": "restantes",
        "subnet": "Sub-rede",
        "allocated": "alocados",
        "needed": "necessários",
        "available": "disponíveis",
        "efficiency": "eficiência",
        "error": "Erro",
        "doesNotFit": "Os hosts necessários não cabem neste bloco de rede."
      },
      "formats": {
        "summary": "VLSM dividiu {networkAddress}/{cidr} em {subnetsCreated} sub-redes com {efficiency}% de eficiência. {addressesRemaining} endereços restantes."
      },
      "infoCards": {
        "metrics": {
          "title": "Resumo de Alocação",
          "items": [
            {
              "label": "Sub-redes Criadas",
              "valueKey": "subnetsCreated"
            },
            {
              "label": "Total Alocado",
              "valueKey": "totalAllocated"
            },
            {
              "label": "Endereços Restantes",
              "valueKey": "addressesRemaining"
            },
            {
              "label": "Eficiência",
              "valueKey": "efficiency"
            }
          ]
        },
        "details": {
          "title": "Bloco de Rede",
          "items": [
            {
              "label": "Rede Principal",
              "valueKey": "totalAvailable"
            },
            {
              "label": "Total Desperdiçado",
              "valueKey": "totalWasted"
            },
            {
              "label": "Sub-redes Criadas",
              "valueKey": "subnetsCreated"
            },
            {
              "label": "Eficiência",
              "valueKey": "efficiency"
            }
          ]
        },
        "tips": {
          "title": "Dicas VLSM",
          "items": [
            "VLSM sempre aloca a maior sub-rede primeiro, depois trabalha para baixo — isso minimiza a fragmentação.",
            "Cada sub-rede perde 2 endereços (rede + broadcast) — planeje para esta sobrecarga.",
            "Adicione 10–20% à sua contagem de hosts para crescimento futuro antes de inserir os requisitos.",
            "VLSM é mais eficiente que sub-redes fixas: um /24 dividido com VLSM pode economizar 30–50% de IPs desperdiçados."
          ]
        }
      },
      "detailedTable": {
        "vlsmAllocation": {
          "button": "Ver Tabela Completa de Alocação VLSM",
          "title": "Detalhes de Alocação de Sub-rede VLSM",
          "columns": {
            "name": "Sub-rede",
            "needed": "Hosts Necessários",
            "allocated": "Tamanho (Alocado)",
            "network": "Endereço de Rede",
            "mask": "Máscara de Sub-rede",
            "range": "Faixa Utilizável",
            "broadcast": "Broadcast",
            "wasted": "IPs Desperdiçados"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é VLSM?",
          "content": "Mascaramento de Sub-rede de Comprimento Variável (VLSM) é uma técnica de sub-rede que permite aos administradores de rede usar diferentes tamanhos de máscara de sub-rede dentro do mesmo espaço de endereçamento. Ao contrário do sub-rede de comprimento fixo onde cada sub-rede deve ter o mesmo tamanho, VLSM permite criar sub-redes adaptadas ao número exato de hosts que cada segmento precisa. Por exemplo, um departamento com 200 estações de trabalho recebe uma sub-rede /24 (254 hosts), enquanto um link ponto-a-ponto de roteador recebe um /30 (2 hosts). Isso reduz drasticamente o desperdício de endereços IP comparado a dar a ambos segmentos o mesmo /24. VLSM tornou-se possível com a adoção do CIDR (Roteamento Inter-Domínio sem Classes) e requer protocolos de roteamento que carregam informações de máscara de sub-rede, como OSPF, EIGRP, IS-IS, ou BGP."
        },
        "howItWorks": {
          "title": "Como Funciona a Alocação VLSM",
          "content": "O algoritmo VLSM segue um princípio simples: ordenar todos os requisitos de sub-rede do maior para o menor, depois alocar cada um usando a menor máscara de sub-rede que caiba. Comece com o maior requisito — encontre o prefixo CIDR mínimo que fornece hosts suficientes (utilizáveis = 2^bits_host − 2). Aloque esse bloco começando do próximo endereço disponível na rede principal. Depois mova para o próximo maior requisito e repita. Esta abordagem do maior-primeiro garante alinhamento ótimo e previne fragmentação. Por exemplo, começando com 192.168.1.0/24 (254 utilizáveis), se você precisa de 100, 50, e 10 hosts: o primeiro recebe /25 (126 utilizáveis), o segundo recebe /26 (62 utilizáveis), e o terceiro recebe /28 (14 utilizáveis), usando 128 + 64 + 16 = 208 de 256 endereços com 48 restantes para crescimento futuro."
        },
        "considerations": {
          "title": "Diretrizes de Planejamento VLSM",
          "items": [
            {
              "text": "Sempre ordene sub-redes por tamanho (maior primeiro) antes de alocar — isso previne fragmentação do espaço de endereços.",
              "type": "info"
            },
            {
              "text": "Cada sub-rede deve alinhar ao seu tamanho de bloco: um /26 (64 endereços) deve começar em um múltiplo de 64.",
              "type": "warning"
            },
            {
              "text": "A sub-rede prática mínima é /30 (2 hosts utilizáveis) para links de roteador; /28 (14 hosts) para redes de dispositivos.",
              "type": "info"
            },
            {
              "text": "Adicione margem de crescimento de 20%: se você precisa de 100 hosts, planeje para 120 — isso ainda cabe em um /25 (126 utilizáveis).",
              "type": "warning"
            },
            {
              "text": "Sub-rede fixa de um /24 em blocos /26 iguais dá 4 × 62 = 248 hosts. VLSM pode atender as mesmas necessidades em menos endereços.",
              "type": "info"
            },
            {
              "text": "documente seu plano VLSM cuidadosamente — sub-redes de tamanho variável são mais difíceis de solucionar problemas que fixas.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Comparação VLSM vs Sub-rede Fixa",
          "items": [
            {
              "text": "/26 fixo para 200 + 50 + 10: precisa de 4 sub-redes = 256 IPs, desperdiça 196 (23% eficiência).",
              "type": "warning"
            },
            {
              "text": "VLSM para 200 + 50 + 10: /24 + /26 + /28 = 336 IPs necessários, mas apenas 256 + 64 + 16 = 336 (77% eficiência).",
              "type": "info"
            },
            {
              "text": "Alocação ISP: VLSM permite ISPs dar /28 para clientes pequenos, /24 para médios, /22 para grandes — de um bloco /16.",
              "type": "info"
            },
            {
              "text": "Rede de campus: admin (200 PCs) recebe /24, laboratório (30 PCs) recebe /27, câmeras de segurança (8) recebem /28.",
              "type": "info"
            },
            {
              "text": "Centro de dados: VLAN de produção /23 (510 hosts), gerenciamento /27 (30), fora de banda /29 (6).",
              "type": "info"
            },
            {
              "text": "Laboratório doméstico: LAN principal /25 (126), IoT /28 (14), Wi-Fi convidado /28 (14) — tudo de um /24.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Alocação VLSM",
          "description": "Divisão de sub-rede passo a passo",
          "examples": [
            {
              "title": "Escritório: 192.168.1.0/24 → 4 Sub-redes",
              "steps": [
                "Requisitos: Engenharia (100), Vendas (50), RH (20), Links de roteador (2)",
                "Ordene maior primeiro: 100, 50, 20, 2",
                "Sub-rede 1: 100 hosts → precisa /25 (126 utilizáveis). Rede: 192.168.1.0/25, faixa .1–.126",
                "Sub-rede 2: 50 hosts → precisa /26 (62 utilizáveis). Rede: 192.168.1.128/26, faixa .129–.190",
                "Sub-rede 3: 20 hosts → precisa /27 (30 utilizáveis). Rede: 192.168.1.192/27, faixa .193–.222",
                "Sub-rede 4: 2 hosts → precisa /30 (2 utilizáveis). Rede: 192.168.1.224/30, faixa .225–.226"
              ],
              "result": "Usado 200 de 256 endereços (78% eficiência). 56 endereços restam para crescimento."
            },
            {
              "title": "Campus: 10.10.0.0/22 → 3 Edifícios",
              "steps": [
                "Total disponível: /22 = 1.022 endereços utilizáveis",
                "Requisitos: Edifício principal (500), Anexo (200), Laboratório (50)",
                "Sub-rede 1: 500 → precisa /23 (510 utilizáveis). Rede: 10.10.0.0/23, faixa .0.1–.1.254",
                "Sub-rede 2: 200 → precisa /24 (254 utilizáveis). Rede: 10.10.2.0/24, faixa .2.1–.2.254",
                "Sub-rede 3: 50 → precisa /26 (62 utilizáveis). Rede: 10.10.3.0/26, faixa .3.1–.3.62",
                "Restante: 10.10.3.64/26 através 10.10.3.255 (192 endereços para uso futuro)"
              ],
              "result": "Usado 832 de 1.024 endereços. 192 restam — suficiente para duas sub-redes /26 mais."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual é a diferença entre VLSM e CIDR?",
          "answer": "CIDR (Roteamento Inter-Domínio sem Classes) é o sistema de notação que permite prefixos de comprimento variável (ex: /22, /27). VLSM (Mascaramento de Sub-rede de Comprimento Variável) é a técnica de aplicar diferentes comprimentos de prefixo CIDR para diferentes sub-redes dentro do mesmo bloco de endereços. Pense no CIDR como a linguagem e VLSM como a prática de design que a usa. VLSM requer protocolos de roteamento conscientes de CIDR como OSPF ou EIGRP."
        },
        {
          "question": "Quais protocolos de roteamento suportam VLSM?",
          "answer": "Protocolos modernos que carregam informações de máscara de sub-rede suportam VLSM: OSPF (Open Shortest Path First), EIGRP (Enhanced Interior Gateway Routing Protocol), IS-IS, BGP, e RIPv2. O RIPv1 mais antigo NÃO suporta VLSM porque assume limites com classes e não inclui a máscara nas atualizações de roteamento. Rotas estáticas também suportam VLSM já que a máscara é especificada manualmente."
        },
        {
          "question": "Por que devo ordenar sub-redes da maior para a menor?",
          "answer": "Sub-redes devem alinhar ao seu tamanho de bloco — um /26 (64 endereços) deve começar em um múltiplo de 64. Se você alocar uma sub-rede pequena primeiro, pode criar uma lacuna que desperdiça endereços porque a próxima sub-rede maior não pode caber lá. Ordenar maior-primeiro garante que cada bloco comece em um limite naturalmente alinhado, maximizando espaço utilizável e prevenindo fragmentação."
        },
        {
          "question": "Como sei que tamanho de sub-rede preciso para N hosts?",
          "answer": "Encontre a menor potência de 2 que é maior que N + 2 (o +2 conta para endereços de rede e broadcast). Para 100 hosts: 100 + 2 = 102, próxima potência de 2 é 128 = 2⁷, então bits de host = 7, prefixo = 32 − 7 = /25 (126 utilizáveis). Para 50 hosts: 52 → 64 = 2⁶ → /26 (62 utilizáveis). Para 10 hosts: 12 → 16 = 2⁴ → /28 (14 utilizáveis)."
        },
        {
          "question": "Posso usar VLSM com IPv6?",
          "answer": "IPv6 usa um prefixo /64 fixo para todas as sub-redes de host conforme recomendado pela RFC 4291, dando a cada sub-rede 2⁶⁴ endereços — mais que suficiente para qualquer LAN. Prefixos variáveis estilo VLSM são usados em níveis mais altos (entre /48 e /64) para alocar sub-redes para departamentos, mas dentro de cada sub-rede o tamanho é sempre /64. O espaço de endereços massivo do IPv6 elimina a necessidade de VLSM no nível do host."
        },
        {
          "question": "O que acontece se meus hosts não cabem no bloco de rede?",
          "answer": "Se os endereços totais requeridos excedem o espaço disponível em sua rede principal, o cálculo VLSM falha. Por exemplo, tentar encaixar 200 + 100 + 50 hosts em um /24 (254 endereços totais) não funcionará porque você precisa de /24 (256) + /25 (128) + /26 (64) = 448 endereços. Solução: use um bloco de rede maior (como /23 ou /22) ou reduza seus requisitos de host."
        }
      ],
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
      "name": "Calculateur VLSM",
      "slug": "calculateur-masquage-sous-reseau-longueur-variable",
      "subtitle": "Divisez un réseau en sous-réseaux de taille variable avec VLSM. Allouez les adresses IP efficacement avec un gaspillage minimal — saisissez vos besoins d'hôtes et obtenez des sous-réseaux optimaux.",
      "breadcrumb": "VLSM",
      "seo": {
        "title": "Calculateur VLSM - Outil de Masquage de Sous-réseau à Longueur Variable",
        "description": "Divisez un réseau en sous-réseaux de taille optimale avec VLSM. Saisissez les besoins d'hôtes par sous-réseau et obtenez les adresses réseau, masques, plages et analyse de gaspillage. Outil VLSM gratuit.",
        "shortDescription": "Divisez un réseau en sous-réseaux de taille variable avec VLSM.",
        "keywords": [
          "calculateur vlsm",
          "masquage sous-réseau longueur variable",
          "sous-réseautage vlsm",
          "calculateur vlsm cidr",
          "diviseur sous-réseau",
          "calculateur vlsm gratuit",
          "outil sous-réseautage réseau",
          "allocation adresse ip"
        ]
      },
      "inputs": {
        "networkAddress": {
          "label": "Adresse Réseau Principal",
          "helpText": "L'adresse IP de départ à subdiviser (ex: 192.168.1.0)"
        },
        "cidr": {
          "label": "Préfixe Réseau (/)",
          "helpText": "Préfixe CIDR du réseau principal",
          "options": {
            "16": "/16 — 65 534 hôtes",
            "17": "/17 — 32 766 hôtes",
            "18": "/18 — 16 382 hôtes",
            "19": "/19 — 8 190 hôtes",
            "20": "/20 — 4 094 hôtes",
            "21": "/21 — 2 046 hôtes",
            "22": "/22 — 1 022 hôtes",
            "23": "/23 — 510 hôtes",
            "24": "/24 — 254 hôtes",
            "25": "/25 — 126 hôtes",
            "26": "/26 — 62 hôtes",
            "27": "/27 — 30 hôtes",
            "28": "/28 — 14 hôtes"
          }
        },
        "subnet1Hosts": {
          "label": "Sous-réseau 1 — Hôtes Requis",
          "helpText": "Nombre d'appareils pour le plus grand sous-réseau"
        },
        "subnet2Hosts": {
          "label": "Sous-réseau 2 — Hôtes Requis",
          "helpText": "Nombre d'appareils pour le deuxième sous-réseau"
        },
        "subnet3Hosts": {
          "label": "Sous-réseau 3 — Hôtes Requis",
          "helpText": "Nombre d'appareils pour le troisième sous-réseau"
        },
        "subnet4Hosts": {
          "label": "Sous-réseau 4 — Hôtes Requis",
          "helpText": "Nombre d'appareils pour le quatrième sous-réseau (saisir 0 pour ignorer)"
        }
      },
      "results": {
        "totalAllocated": {
          "label": "Total Adresses Allouées"
        },
        "totalAvailable": {
          "label": "Total Adresses Disponibles"
        },
        "totalWasted": {
          "label": "Adresses Gaspillées"
        },
        "efficiency": {
          "label": "Efficacité d'Allocation"
        },
        "subnetsCreated": {
          "label": "Sous-réseaux Créés"
        },
        "addressesRemaining": {
          "label": "Adresses Restantes"
        }
      },
      "presets": {
        "smallOffice": {
          "label": "Petit Bureau /24",
          "description": "192.168.1.0/24 → 4 départements (50, 30, 10, 2)"
        },
        "campus": {
          "label": "Campus /22",
          "description": "10.10.0.0/22 → 4 bâtiments (500, 200, 100, 50)"
        },
        "labNetwork": {
          "label": "Réseau Lab /24",
          "description": "172.16.0.0/24 → 4 VLANs (100, 60, 25, 5)"
        },
        "ispAllocation": {
          "label": "Bloc FAI /24",
          "description": "203.0.113.0/24 → 4 clients (120, 60, 30, 14)"
        }
      },
      "values": {
        "hosts": "hôtes",
        "addresses": "adresses",
        "wasted": "gaspillées",
        "remaining": "restantes",
        "subnet": "Sous-réseau",
        "allocated": "alloué",
        "needed": "nécessaire",
        "available": "disponible",
        "efficiency": "efficacité",
        "error": "Erreur",
        "doesNotFit": "Les hôtes requis ne rentrent pas dans ce bloc réseau."
      },
      "formats": {
        "summary": "VLSM a divisé {networkAddress}/{cidr} en {subnetsCreated} sous-réseaux avec {efficiency}% d'efficacité. {addressesRemaining} adresses restantes."
      },
      "infoCards": {
        "metrics": {
          "title": "Résumé d'Allocation",
          "items": [
            {
              "label": "Sous-réseaux Créés",
              "valueKey": "subnetsCreated"
            },
            {
              "label": "Total Alloué",
              "valueKey": "totalAllocated"
            },
            {
              "label": "Adresses Restantes",
              "valueKey": "addressesRemaining"
            },
            {
              "label": "Efficacité",
              "valueKey": "efficiency"
            }
          ]
        },
        "details": {
          "title": "Bloc Réseau",
          "items": [
            {
              "label": "Réseau Principal",
              "valueKey": "totalAvailable"
            },
            {
              "label": "Total Gaspillé",
              "valueKey": "totalWasted"
            },
            {
              "label": "Sous-réseaux Créés",
              "valueKey": "subnetsCreated"
            },
            {
              "label": "Efficacité",
              "valueKey": "efficiency"
            }
          ]
        },
        "tips": {
          "title": "Conseils VLSM",
          "items": [
            "VLSM alloue toujours le plus grand sous-réseau en premier, puis descend — cela minimise la fragmentation.",
            "Chaque sous-réseau perd 2 adresses (réseau + diffusion) — planifiez cette surcharge.",
            "Ajoutez 10-20% à votre nombre d'hôtes pour la croissance future avant de saisir les besoins.",
            "VLSM est plus efficace que le sous-réseautage fixe : un /24 divisé avec VLSM peut économiser 30-50% d'IPs gaspillées."
          ]
        }
      },
      "detailedTable": {
        "vlsmAllocation": {
          "button": "Voir le Tableau Complet d'Allocation VLSM",
          "title": "Détails d'Allocation des Sous-réseaux VLSM",
          "columns": {
            "name": "Sous-réseau",
            "needed": "Hôtes Nécessaires",
            "allocated": "Taille (Allouée)",
            "network": "Adresse Réseau",
            "mask": "Masque Sous-réseau",
            "range": "Plage Utilisable",
            "broadcast": "Diffusion",
            "wasted": "IPs Gaspillées"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que VLSM ?",
          "content": "Le Masquage de Sous-réseau à Longueur Variable (VLSM) est une technique de sous-réseautage qui permet aux administrateurs réseau d'utiliser différentes tailles de masque de sous-réseau dans le même espace d'adresses. Contrairement au sous-réseautage à longueur fixe où chaque sous-réseau doit avoir la même taille, VLSM permet de créer des sous-réseaux adaptés au nombre exact d'hôtes dont chaque segment a besoin. Par exemple, un département avec 200 postes obtient un sous-réseau /24 (254 hôtes), tandis qu'une liaison point-à-point entre routeurs obtient un /30 (2 hôtes). Cela réduit drastiquement le gaspillage d'adresses IP comparé à donner aux deux segments le même /24. VLSM est devenu possible avec l'adoption de CIDR (Routage Inter-Domaine sans Classe) et nécessite des protocoles de routage qui transportent l'information de masque de sous-réseau, comme OSPF, EIGRP, IS-IS, ou BGP."
        },
        "howItWorks": {
          "title": "Comment Fonctionne l'Allocation VLSM",
          "content": "L'algorithme VLSM suit un principe simple : trier tous les besoins de sous-réseaux du plus grand au plus petit, puis allouer chacun en utilisant le plus petit masque de sous-réseau qui convient. Commencez par le plus grand besoin — trouvez le préfixe CIDR minimal qui fournit assez d'hôtes (utilisables = 2^bits_hôte − 2). Allouez ce bloc en commençant par la prochaine adresse disponible dans le réseau principal. Puis passez au prochain plus grand besoin et répétez. Cette approche du plus-grand-d'abord assure un alignement optimal et prévient la fragmentation. Par exemple, en commençant avec 192.168.1.0/24 (254 utilisables), si vous avez besoin de 100, 50, et 10 hôtes : le premier obtient /25 (126 utilisables), le second obtient /26 (62 utilisables), et le troisième obtient /28 (14 utilisables), utilisant 128 + 64 + 16 = 208 des 256 adresses avec 48 restantes pour la croissance future."
        },
        "considerations": {
          "title": "Directives de Planification VLSM",
          "items": [
            {
              "text": "Toujours trier les sous-réseaux par taille (plus grand d'abord) avant allocation — cela prévient la fragmentation de l'espace d'adresses.",
              "type": "info"
            },
            {
              "text": "Chaque sous-réseau doit s'aligner sur sa taille de bloc : un /26 (64 adresses) doit commencer à un multiple de 64.",
              "type": "warning"
            },
            {
              "text": "Le sous-réseau pratique minimum est /30 (2 hôtes utilisables) pour les liaisons routeur ; /28 (14 hôtes) pour les réseaux d'appareils.",
              "type": "info"
            },
            {
              "text": "Ajoutez 20% de marge de croissance : si vous avez besoin de 100 hôtes, planifiez pour 120 — cela tient encore dans un /25 (126 utilisables).",
              "type": "warning"
            },
            {
              "text": "Diviser un /24 en blocs /26 égaux donne 4 × 62 = 248 hôtes. VLSM peut répondre aux mêmes besoins en moins d'adresses.",
              "type": "info"
            },
            {
              "text": "Documentez soigneusement votre plan VLSM — les sous-réseaux de taille variable sont plus difficiles à dépanner que les fixes.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Comparaison VLSM vs Sous-réseautage Fixe",
          "items": [
            {
              "text": "/26 fixe pour 200 + 50 + 10 : nécessite 4 sous-réseaux = 256 IPs, gaspille 196 (23% d'efficacité).",
              "type": "warning"
            },
            {
              "text": "VLSM pour 200 + 50 + 10 : /24 + /26 + /28 = 336 IPs nécessaires, mais seulement 256 + 64 + 16 = 336 (77% d'efficacité).",
              "type": "info"
            },
            {
              "text": "Allocation FAI : VLSM permet aux FAI de donner /28 aux petits clients, /24 aux moyens, /22 aux grands — d'un bloc /16.",
              "type": "info"
            },
            {
              "text": "Réseau campus : admin (200 PCs) obtient /24, lab (30 PCs) obtient /27, caméras sécurité (8) obtiennent /28.",
              "type": "info"
            },
            {
              "text": "Centre de données : VLAN production /23 (510 hôtes), gestion /27 (30), hors-bande /29 (6).",
              "type": "info"
            },
            {
              "text": "Lab maison : LAN principal /25 (126), IoT /28 (14), Wi-Fi invité /28 (14) — tout d'un /24.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples d'Allocation VLSM",
          "description": "Division de sous-réseau étape par étape",
          "examples": [
            {
              "title": "Bureau : 192.168.1.0/24 → 4 Sous-réseaux",
              "steps": [
                "Besoins : Ingénierie (100), Ventes (50), RH (20), Liaisons routeur (2)",
                "Trier du plus grand : 100, 50, 20, 2",
                "Sous-réseau 1 : 100 hôtes → besoin /25 (126 utilisables). Réseau : 192.168.1.0/25, plage .1–.126",
                "Sous-réseau 2 : 50 hôtes → besoin /26 (62 utilisables). Réseau : 192.168.1.128/26, plage .129–.190",
                "Sous-réseau 3 : 20 hôtes → besoin /27 (30 utilisables). Réseau : 192.168.1.192/27, plage .193–.222",
                "Sous-réseau 4 : 2 hôtes → besoin /30 (2 utilisables). Réseau : 192.168.1.224/30, plage .225–.226"
              ],
              "result": "Utilisé 200 des 256 adresses (78% d'efficacité). 56 adresses restent pour la croissance."
            },
            {
              "title": "Campus : 10.10.0.0/22 → 3 Bâtiments",
              "steps": [
                "Total disponible : /22 = 1 022 adresses utilisables",
                "Besoins : Bâtiment principal (500), Annexe (200), Lab (50)",
                "Sous-réseau 1 : 500 → besoin /23 (510 utilisables). Réseau : 10.10.0.0/23, plage .0.1–.1.254",
                "Sous-réseau 2 : 200 → besoin /24 (254 utilisables). Réseau : 10.10.2.0/24, plage .2.1–.2.254",
                "Sous-réseau 3 : 50 → besoin /26 (62 utilisables). Réseau : 10.10.3.0/26, plage .3.1–.3.62",
                "Restant : 10.10.3.64/26 à 10.10.3.255 (192 adresses pour usage futur)"
              ],
              "result": "Utilisé 832 des 1 024 adresses. 192 restent — assez pour deux sous-réseaux /26 supplémentaires."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la différence entre VLSM et CIDR ?",
          "answer": "CIDR (Routage Inter-Domaine sans Classe) est le système de notation qui permet les préfixes de longueur variable (ex: /22, /27). VLSM (Masquage de Sous-réseau à Longueur Variable) est la technique d'application de différentes longueurs de préfixe CIDR à différents sous-réseaux dans le même bloc d'adresses. Pensez à CIDR comme le langage et VLSM comme la pratique de conception qui l'utilise. VLSM nécessite des protocoles de routage compatibles CIDR comme OSPF ou EIGRP."
        },
        {
          "question": "Quels protocoles de routage supportent VLSM ?",
          "answer": "Les protocoles modernes qui transportent l'information de masque de sous-réseau supportent VLSM : OSPF (Open Shortest Path First), EIGRP (Enhanced Interior Gateway Routing Protocol), IS-IS, BGP, et RIPv2. L'ancien RIPv1 ne supporte PAS VLSM car il assume des limites de classe et n'inclut pas le masque dans les mises à jour de routage. Les routes statiques supportent aussi VLSM puisque le masque est spécifié manuellement."
        },
        {
          "question": "Pourquoi dois-je trier les sous-réseaux du plus grand au plus petit ?",
          "answer": "Les sous-réseaux doivent s'aligner sur leur taille de bloc — un /26 (64 adresses) doit commencer à un multiple de 64. Si vous allouez d'abord un petit sous-réseau, vous pouvez créer un trou qui gaspille des adresses car le prochain plus grand sous-réseau ne peut pas s'y loger. Trier du plus-grand-d'abord assure que chaque bloc commence à une limite naturellement alignée, maximisant l'espace utilisable et prévenant la fragmentation."
        },
        {
          "question": "Comment savoir quelle taille de sous-réseau j'ai besoin pour N hôtes ?",
          "answer": "Trouvez la plus petite puissance de 2 qui est supérieure à N + 2 (le +2 compte pour les adresses réseau et diffusion). Pour 100 hôtes : 100 + 2 = 102, prochaine puissance de 2 est 128 = 2⁷, donc bits hôte = 7, préfixe = 32 − 7 = /25 (126 utilisables). Pour 50 hôtes : 52 → 64 = 2⁶ → /26 (62 utilisables). Pour 10 hôtes : 12 → 16 = 2⁴ → /28 (14 utilisables)."
        },
        {
          "question": "Puis-je utiliser VLSM avec IPv6 ?",
          "answer": "IPv6 utilise un préfixe /64 fixe pour tous les sous-réseaux hôte comme recommandé par RFC 4291, donnant à chaque sous-réseau 2⁶⁴ adresses — plus qu'assez pour n'importe quel LAN. Les préfixes variables de style VLSM sont utilisés aux niveaux supérieurs (entre /48 et /64) pour allouer des sous-réseaux aux départements, mais dans chaque sous-réseau la taille est toujours /64. L'espace d'adresses massif d'IPv6 élimine le besoin de VLSM au niveau hôte."
        },
        {
          "question": "Que se passe-t-il si mes hôtes ne rentrent pas dans le bloc réseau ?",
          "answer": "Si les adresses totales requises dépassent l'espace disponible dans votre réseau principal, le calcul VLSM échoue. Par exemple, essayer de loger 200 + 100 + 50 hôtes dans un /24 (254 adresses totales) ne marchera pas car vous avez besoin de /24 (256) + /25 (128) + /26 (64) = 448 adresses. Solution : utilisez un bloc réseau plus grand (comme /23 ou /22) ou réduisez vos besoins d'hôtes."
        }
      ],
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
      "name": "VLSM Rechner",
      "slug": "vlsm-rechner",
      "subtitle": "Teilen Sie ein Netzwerk in variable Subnetze mit VLSM auf. Weisen Sie IP-Adressen effizient mit minimaler Verschwendung zu — geben Sie Ihre Host-Anforderungen ein und erhalten Sie optimale Subnetze.",
      "breadcrumb": "VLSM",
      "seo": {
        "title": "VLSM Rechner - Variable Length Subnet Masking Tool",
        "description": "Teilen Sie ein Netzwerk in optimal dimensionierte Subnetze mit VLSM auf. Geben Sie Host-Anforderungen pro Subnetz ein und erhalten Sie Netzwerkadressen, Masken, Bereiche und Verschwendungsanalyse. Kostenloser VLSM-Tool.",
        "shortDescription": "Teilen Sie ein Netzwerk in variable Subnetze mit VLSM auf.",
        "keywords": [
          "vlsm rechner",
          "variable length subnet masking",
          "vlsm subnetting",
          "vlsm cidr rechner",
          "subnetz teiler",
          "kostenloser vlsm rechner",
          "netzwerk subnetting tool",
          "ip adress zuweisung"
        ]
      },
      "inputs": {
        "networkAddress": {
          "label": "Hauptnetzwerkadresse",
          "helpText": "Die Start-IP-Adresse zum Unterteilen (z.B. 192.168.1.0)"
        },
        "cidr": {
          "label": "Netzwerk-Präfix (/)",
          "helpText": "CIDR-Präfix des Hauptnetzwerks",
          "options": {
            "16": "/16 — 65.534 Hosts",
            "17": "/17 — 32.766 Hosts",
            "18": "/18 — 16.382 Hosts",
            "19": "/19 — 8.190 Hosts",
            "20": "/20 — 4.094 Hosts",
            "21": "/21 — 2.046 Hosts",
            "22": "/22 — 1.022 Hosts",
            "23": "/23 — 510 Hosts",
            "24": "/24 — 254 Hosts",
            "25": "/25 — 126 Hosts",
            "26": "/26 — 62 Hosts",
            "27": "/27 — 30 Hosts",
            "28": "/28 — 14 Hosts"
          }
        },
        "subnet1Hosts": {
          "label": "Subnetz 1 — Benötigte Hosts",
          "helpText": "Anzahl der Geräte für das größte Subnetz"
        },
        "subnet2Hosts": {
          "label": "Subnetz 2 — Benötigte Hosts",
          "helpText": "Anzahl der Geräte für das zweite Subnetz"
        },
        "subnet3Hosts": {
          "label": "Subnetz 3 — Benötigte Hosts",
          "helpText": "Anzahl der Geräte für das dritte Subnetz"
        },
        "subnet4Hosts": {
          "label": "Subnetz 4 — Benötigte Hosts",
          "helpText": "Anzahl der Geräte für das vierte Subnetz (0 eingeben zum Überspringen)"
        }
      },
      "results": {
        "totalAllocated": {
          "label": "Gesamte zugewiesene Adressen"
        },
        "totalAvailable": {
          "label": "Gesamte verfügbare Adressen"
        },
        "totalWasted": {
          "label": "Verschwendete Adressen"
        },
        "efficiency": {
          "label": "Zuweisungseffizienz"
        },
        "subnetsCreated": {
          "label": "Erstellte Subnetze"
        },
        "addressesRemaining": {
          "label": "Verbleibende Adressen"
        }
      },
      "presets": {
        "smallOffice": {
          "label": "Kleines Büro /24",
          "description": "192.168.1.0/24 → 4 Abteilungen (50, 30, 10, 2)"
        },
        "campus": {
          "label": "Campus /22",
          "description": "10.10.0.0/22 → 4 Gebäude (500, 200, 100, 50)"
        },
        "labNetwork": {
          "label": "Labor-Netzwerk /24",
          "description": "172.16.0.0/24 → 4 VLANs (100, 60, 25, 5)"
        },
        "ispAllocation": {
          "label": "ISP Block /24",
          "description": "203.0.113.0/24 → 4 Kunden (120, 60, 30, 14)"
        }
      },
      "values": {
        "hosts": "Hosts",
        "addresses": "Adressen",
        "wasted": "verschwendet",
        "remaining": "verbleibend",
        "subnet": "Subnetz",
        "allocated": "zugewiesen",
        "needed": "benötigt",
        "available": "verfügbar",
        "efficiency": "Effizienz",
        "error": "Fehler",
        "doesNotFit": "Benötigte Hosts passen nicht in diesen Netzwerkblock."
      },
      "formats": {
        "summary": "VLSM teilte {networkAddress}/{cidr} in {subnetsCreated} Subnetze mit {efficiency}% Effizienz auf. {addressesRemaining} Adressen verbleibend."
      },
      "infoCards": {
        "metrics": {
          "title": "Zuweisungszusammenfassung",
          "items": [
            {
              "label": "Erstellte Subnetze",
              "valueKey": "subnetsCreated"
            },
            {
              "label": "Gesamt zugewiesen",
              "valueKey": "totalAllocated"
            },
            {
              "label": "Verbleibende Adressen",
              "valueKey": "addressesRemaining"
            },
            {
              "label": "Effizienz",
              "valueKey": "efficiency"
            }
          ]
        },
        "details": {
          "title": "Netzwerkblock",
          "items": [
            {
              "label": "Hauptnetzwerk",
              "valueKey": "totalAvailable"
            },
            {
              "label": "Gesamt verschwendet",
              "valueKey": "totalWasted"
            },
            {
              "label": "Erstellte Subnetze",
              "valueKey": "subnetsCreated"
            },
            {
              "label": "Effizienz",
              "valueKey": "efficiency"
            }
          ]
        },
        "tips": {
          "title": "VLSM Tipps",
          "items": [
            "VLSM weist immer das größte Subnetz zuerst zu, dann abwärts — dies minimiert Fragmentierung.",
            "Jedes Subnetz verliert 2 Adressen (Netzwerk + Broadcast) — planen Sie für diesen Overhead.",
            "Fügen Sie 10–20% zu Ihrer Host-Anzahl für zukünftiges Wachstum hinzu, bevor Sie Anforderungen eingeben.",
            "VLSM ist effizienter als feste Subnetzaufteilung: ein /24 mit VLSM kann 30–50% verschwendeter IPs sparen."
          ]
        }
      },
      "detailedTable": {
        "vlsmAllocation": {
          "button": "Vollständige VLSM-Zuweisungstabelle anzeigen",
          "title": "VLSM Subnetz-Zuweisungsdetails",
          "columns": {
            "name": "Subnetz",
            "needed": "Benötigte Hosts",
            "allocated": "Größe (Zugewiesen)",
            "network": "Netzwerkadresse",
            "mask": "Subnetzmaske",
            "range": "Nutzbarer Bereich",
            "broadcast": "Broadcast",
            "wasted": "Verschwendete IPs"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist VLSM?",
          "content": "Variable Length Subnet Masking (VLSM) ist eine Subnetting-Technik, die Netzwerkadministratoren ermöglicht, verschiedene Subnetzmaskengrößen innerhalb desselben Adressraums zu verwenden. Im Gegensatz zu fester Subnetzaufteilung, wo jedes Subnetz dieselbe Größe haben muss, ermöglicht VLSM die Erstellung von Subnetzen, die genau auf die Anzahl der Hosts zugeschnitten sind, die jedes Segment benötigt. Zum Beispiel erhält eine Abteilung mit 200 Arbeitsplätzen ein /24-Subnetz (254 Hosts), während eine Punkt-zu-Punkt-Router-Verbindung ein /30 (2 Hosts) erhält. Dies reduziert die IP-Adressverschwendung drastisch im Vergleich dazu, beiden Segmenten dasselbe /24 zu geben. VLSM wurde mit der Einführung von CIDR möglich und erfordert Routing-Protokolle, die Subnetzmaskeninformationen tragen, wie OSPF, EIGRP, IS-IS oder BGP."
        },
        "howItWorks": {
          "title": "Wie VLSM-Zuweisung funktioniert",
          "content": "Der VLSM-Algorithmus folgt einem einfachen Prinzip: sortiere alle Subnetz-Anforderungen von der größten zur kleinsten, dann weise jede mit der kleinsten Subnetzmaske zu, die passt. Beginne mit der größten Anforderung — finde das minimale CIDR-Präfix, das genügend Hosts bietet (nutzbar = 2^Host_Bits − 2). Weise diesen Block beginnend von der nächsten verfügbaren Adresse im Hauptnetzwerk zu. Dann gehe zur nächstgrößten Anforderung und wiederhole. Dieser größte-zuerst-Ansatz gewährleistet optimale Ausrichtung und verhindert Fragmentierung. Zum Beispiel, beginnend mit 192.168.1.0/24 (254 nutzbar), wenn Sie 100, 50 und 10 Hosts benötigen: das erste erhält /25 (126 nutzbar), das zweite erhält /26 (62 nutzbar), und das dritte erhält /28 (14 nutzbar), wobei 128 + 64 + 16 = 208 von 256 Adressen mit 48 verbleibend für zukünftiges Wachstum verwendet werden."
        },
        "considerations": {
          "title": "VLSM-Planungsrichtlinien",
          "items": [
            {
              "text": "Sortiere Subnetze immer nach Größe (größte zuerst) vor der Zuweisung — dies verhindert Adressraum-Fragmentierung.",
              "type": "info"
            },
            {
              "text": "Jedes Subnetz muss an seine Blockgröße ausgerichtet sein: ein /26 (64 Adressen) muss bei einem Vielfachen von 64 beginnen.",
              "type": "warning"
            },
            {
              "text": "Das minimale praktische Subnetz ist /30 (2 nutzbare Hosts) für Router-Links; /28 (14 Hosts) für Geräte-Netzwerke.",
              "type": "info"
            },
            {
              "text": "Füge 20% Wachstumsspielraum hinzu: wenn du 100 Hosts benötigst, plane für 120 — dies passt immer noch in ein /25 (126 nutzbar).",
              "type": "warning"
            },
            {
              "text": "Feste Subnetzaufteilung eines /24 in gleiche /26-Blöcke gibt 4 × 62 = 248 Hosts. VLSM kann dieselben Bedürfnisse in weniger Adressen erfüllen.",
              "type": "info"
            },
            {
              "text": "Dokumentiere deinen VLSM-Plan sorgfältig — variable Subnetze sind schwieriger zu troubleshooten als feste.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "VLSM vs. Feste Subnetzaufteilung Vergleich",
          "items": [
            {
              "text": "Feste /26 für 200 + 50 + 10: benötigt 4 Subnetze = 256 IPs, verschwendet 196 (23% Effizienz).",
              "type": "warning"
            },
            {
              "text": "VLSM für 200 + 50 + 10: /24 + /26 + /28 = 336 IPs benötigt, aber nur 256 + 64 + 16 = 336 (77% Effizienz).",
              "type": "info"
            },
            {
              "text": "ISP-Zuweisung: VLSM ermöglicht ISPs /28 an kleine Kunden zu geben, /24 an mittlere, /22 an große — aus einem /16-Block.",
              "type": "info"
            },
            {
              "text": "Campus-Netzwerk: Admin (200 PCs) erhält /24, Labor (30 PCs) erhält /27, Sicherheitskameras (8) erhalten /28.",
              "type": "info"
            },
            {
              "text": "Rechenzentrum: Produktions-VLAN /23 (510 Hosts), Management /27 (30), Out-of-Band /29 (6).",
              "type": "info"
            },
            {
              "text": "Heimlabor: Haupt-LAN /25 (126), IoT /28 (14), Gäste-WLAN /28 (14) — alles aus einem /24.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "VLSM-Zuweisungsbeispiele",
          "description": "Schritt-für-Schritt Subnetz-Aufteilung",
          "examples": [
            {
              "title": "Büro: 192.168.1.0/24 → 4 Subnetze",
              "steps": [
                "Anforderungen: Entwicklung (100), Vertrieb (50), Personal (20), Router-Links (2)",
                "Sortiere größte zuerst: 100, 50, 20, 2",
                "Subnetz 1: 100 Hosts → benötige /25 (126 nutzbar). Netzwerk: 192.168.1.0/25, Bereich .1–.126",
                "Subnetz 2: 50 Hosts → benötige /26 (62 nutzbar). Netzwerk: 192.168.1.128/26, Bereich .129–.190",
                "Subnetz 3: 20 Hosts → benötige /27 (30 nutzbar). Netzwerk: 192.168.1.192/27, Bereich .193–.222",
                "Subnetz 4: 2 Hosts → benötige /30 (2 nutzbar). Netzwerk: 192.168.1.224/30, Bereich .225–.226"
              ],
              "result": "200 von 256 Adressen verwendet (78% Effizienz). 56 Adressen bleiben für Wachstum."
            },
            {
              "title": "Campus: 10.10.0.0/22 → 3 Gebäude",
              "steps": [
                "Gesamt verfügbar: /22 = 1.022 nutzbare Adressen",
                "Anforderungen: Hauptgebäude (500), Nebengebäude (200), Labor (50)",
                "Subnetz 1: 500 → benötige /23 (510 nutzbar). Netzwerk: 10.10.0.0/23, Bereich .0.1–.1.254",
                "Subnetz 2: 200 → benötige /24 (254 nutzbar). Netzwerk: 10.10.2.0/24, Bereich .2.1–.2.254",
                "Subnetz 3: 50 → benötige /26 (62 nutzbar). Netzwerk: 10.10.3.0/26, Bereich .3.1–.3.62",
                "Verbleibend: 10.10.3.64/26 bis 10.10.3.255 (192 Adressen für zukünftige Nutzung)"
              ],
              "result": "832 von 1.024 Adressen verwendet. 192 bleiben — genug für zwei weitere /26-Subnetze."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist der Unterschied zwischen VLSM und CIDR?",
          "answer": "CIDR (Classless Inter-Domain Routing) ist das Notationssystem, das variable Präfixlängen ermöglicht (z.B. /22, /27). VLSM (Variable Length Subnet Masking) ist die Technik, verschiedene CIDR-Präfixlängen auf verschiedene Subnetze innerhalb desselben Adressblocks anzuwenden. Denken Sie an CIDR als die Sprache und VLSM als die Designpraxis, die sie verwendet. VLSM erfordert CIDR-bewusste Routing-Protokolle wie OSPF oder EIGRP."
        },
        {
          "question": "Welche Routing-Protokolle unterstützen VLSM?",
          "answer": "Moderne Protokolle, die Subnetzmaskeninformationen tragen, unterstützen VLSM: OSPF (Open Shortest Path First), EIGRP (Enhanced Interior Gateway Routing Protocol), IS-IS, BGP und RIPv2. Das ältere RIPv1 unterstützt VLSM NICHT, da es klassische Grenzen annimmt und die Maske nicht in Routing-Updates einschließt. Statische Routen unterstützen auch VLSM, da die Maske manuell spezifiziert wird."
        },
        {
          "question": "Warum muss ich Subnetze von größtem zu kleinstem sortieren?",
          "answer": "Subnetze müssen an ihre Blockgröße ausgerichtet sein — ein /26 (64 Adressen) muss bei einem Vielfachen von 64 beginnen. Wenn Sie zuerst ein kleines Subnetz zuweisen, könnten Sie eine Lücke schaffen, die Adressen verschwendet, weil das nächste größere Subnetz dort nicht passt. Das Sortieren größte-zuerst gewährleistet, dass jeder Block an einer natürlich ausgerichteten Grenze beginnt, maximiert nutzbaren Raum und verhindert Fragmentierung."
        },
        {
          "question": "Woher weiß ich, welche Subnetzgröße ich für N Hosts benötige?",
          "answer": "Finden Sie die kleinste Zweierpotenz, die größer ist als N + 2 (das +2 berücksichtigt Netzwerk- und Broadcast-Adressen). Für 100 Hosts: 100 + 2 = 102, nächste Zweierpotenz ist 128 = 2⁷, also Host-Bits = 7, Präfix = 32 − 7 = /25 (126 nutzbar). Für 50 Hosts: 52 → 64 = 2⁶ → /26 (62 nutzbar). Für 10 Hosts: 12 → 16 = 2⁴ → /28 (14 nutzbar)."
        },
        {
          "question": "Kann ich VLSM mit IPv6 verwenden?",
          "answer": "IPv6 verwendet ein festes /64-Präfix für alle Host-Subnetze wie von RFC 4291 empfohlen, was jedem Subnetz 2⁶⁴ Adressen gibt — mehr als genug für jedes LAN. VLSM-artige variable Präfixe werden auf höheren Ebenen (zwischen /48 und /64) zur Zuweisung von Subnetzen an Abteilungen verwendet, aber innerhalb jedes Subnetzes ist die Größe immer /64. Der massive Adressraum von IPv6 eliminiert die Notwendigkeit für VLSM auf Host-Ebene."
        },
        {
          "question": "Was passiert, wenn meine Hosts nicht in den Netzwerkblock passen?",
          "answer": "Wenn die gesamten benötigten Adressen den verfügbaren Platz in Ihrem Hauptnetzwerk überschreiten, schlägt die VLSM-Berechnung fehl. Zum Beispiel wird der Versuch, 200 + 100 + 50 Hosts in ein /24 (254 Gesamtadressen) zu packen, nicht funktionieren, weil Sie /24 (256) + /25 (128) + /26 (64) = 448 Adressen benötigen. Lösung: verwenden Sie einen größeren Netzwerkblock (wie /23 oder /22) oder reduzieren Sie Ihre Host-Anforderungen."
        }
      ],
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
