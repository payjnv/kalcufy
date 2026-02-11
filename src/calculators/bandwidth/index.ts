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
    es: {
      "name": "Calculadora de Ancho de Banda",
      "slug": "calculadora-ancho-banda",
      "subtitle": "Convierte entre unidades de ancho de banda (Mbps, Gbps, MB/s) y estima el ancho de banda necesario para alojar un sitio web o servicio.",
      "breadcrumb": "Ancho de Banda",
      "seo": {
        "title": "Calculadora de Ancho de Banda - Conversor Gratuito de Velocidad y Datos",
        "description": "Convierte unidades de ancho de banda entre Mbps, Gbps, MB/s y más. Estima las necesidades de ancho de banda para hosting web según el tráfico. Herramienta gratuita para planificación de redes y profesionales IT.",
        "shortDescription": "Convierte unidades de ancho de banda y estima necesidades de hosting.",
        "keywords": [
          "calculadora ancho de banda",
          "conversor mbps",
          "conversor ancho de banda",
          "calculadora velocidad transferencia datos",
          "calculadora ancho banda sitio web",
          "calculadora ancho banda gratis",
          "conversor velocidad internet",
          "herramienta ancho banda red"
        ]
      },
      "inputs": {
        "mode": {
          "label": "Modo de Calculadora",
          "helpText": "Elige entre conversión de unidades o estimación de ancho de banda para sitio web",
          "options": {
            "convert": "Conversor de Unidades",
            "website": "Ancho de Banda Web"
          }
        },
        "inputValue": {
          "label": "Valor de Ancho de Banda",
          "helpText": "Introduce el valor de ancho de banda o velocidad a convertir"
        },
        "inputUnit": {
          "label": "Unidad Origen",
          "helpText": "Unidad de ancho de banda de origen",
          "options": {
            "bps": "bps (bits/s)",
            "kbps": "Kbps (kilobits/s)",
            "mbps": "Mbps (megabits/s)",
            "gbps": "Gbps (gigabits/s)",
            "tbps": "Tbps (terabits/s)",
            "Bps": "B/s (bytes/s)",
            "KBps": "KB/s (kilobytes/s)",
            "MBps": "MB/s (megabytes/s)",
            "GBps": "GB/s (gigabytes/s)",
            "TBps": "TB/s (terabytes/s)"
          }
        },
        "outputUnit": {
          "label": "Unidad Destino",
          "helpText": "Unidad de ancho de banda objetivo",
          "options": {
            "bps": "bps (bits/s)",
            "kbps": "Kbps (kilobits/s)",
            "mbps": "Mbps (megabits/s)",
            "gbps": "Gbps (gigabits/s)",
            "tbps": "Tbps (terabits/s)",
            "Bps": "B/s (bytes/s)",
            "KBps": "KB/s (kilobytes/s)",
            "MBps": "MB/s (megabytes/s)",
            "GBps": "GB/s (gigabytes/s)",
            "TBps": "TB/s (terabytes/s)"
          }
        },
        "pageViews": {
          "label": "Páginas Vistas Mensuales",
          "helpText": "Páginas vistas mensuales estimadas para tu sitio web"
        },
        "avgPageSize": {
          "label": "Tamaño Promedio de Página",
          "helpText": "Tamaño promedio de carga de una página (HTML + imágenes + scripts)"
        },
        "pageSizeUnit": {
          "label": "Unidad de Tamaño de Página",
          "helpText": "Unidad para el valor del tamaño de página",
          "options": {
            "KB": "KB (kilobytes)",
            "MB": "MB (megabytes)"
          }
        },
        "redundancy": {
          "label": "Factor de Redundancia",
          "helpText": "Multiplica el ancho de banda por esto para margen (1.0 = exacto, 1.5 = 50% extra, 2.0 = doble)"
        }
      },
      "results": {
        "convertedValue": {
          "label": "Valor Convertido"
        },
        "bitsPerSecond": {
          "label": "Bits por Segundo"
        },
        "bytesPerSecond": {
          "label": "Bytes por Segundo"
        },
        "kilobitsPerSec": {
          "label": "Kilobits/s (Kbps)"
        },
        "megabitsPerSec": {
          "label": "Megabits/s (Mbps)"
        },
        "gigabitsPerSec": {
          "label": "Gigabits/s (Gbps)"
        },
        "kilobytesPerSec": {
          "label": "Kilobytes/s (KB/s)"
        },
        "megabytesPerSec": {
          "label": "Megabytes/s (MB/s)"
        },
        "gigabytesPerSec": {
          "label": "Gigabytes/s (GB/s)"
        },
        "monthlyTransfer": {
          "label": "Transferencia de Datos Mensual"
        },
        "dailyTransfer": {
          "label": "Transferencia de Datos Diaria"
        },
        "requiredBandwidth": {
          "label": "Ancho de Banda Requerido"
        },
        "withRedundancy": {
          "label": "Con Factor de Redundancia"
        }
      },
      "presets": {
        "homeInternet": {
          "label": "Internet Doméstico (100 Mbps)",
          "description": "Convierte 100 Mbps a MB/s"
        },
        "gigabitLan": {
          "label": "LAN Gigabit",
          "description": "Convierte 1 Gbps a MB/s"
        },
        "websiteBandwidth": {
          "label": "Sitio Web Mediano",
          "description": "50K visitas/mes, 2.5 MB/página"
        },
        "streamingServer": {
          "label": "Servidor de Streaming",
          "description": "10K visitas/mes, 5 MB/página"
        }
      },
      "values": {
        "perSecond": "/s",
        "perMonth": "/mes",
        "perDay": "/día"
      },
      "formats": {
        "summary": "{inputValue} {inputUnit} = {convertedValue} {outputUnit}",
        "summaryWebsite": "Tu sitio necesita ~{requiredBandwidth} Mbps ({withRedundancy} Mbps con redundancia {redundancy}x) para {pageViews} visitas mensuales."
      },
      "infoCards": {
        "metrics": {
          "title": "Resultados de Conversión",
          "items": [
            {
              "label": "Megabits/s",
              "valueKey": "megabitsPerSec"
            },
            {
              "label": "Megabytes/s",
              "valueKey": "megabytesPerSec"
            },
            {
              "label": "Gigabits/s",
              "valueKey": "gigabitsPerSec"
            },
            {
              "label": "Transferencia Mensual",
              "valueKey": "monthlyTransfer"
            }
          ]
        },
        "details": {
          "title": "Todas las Unidades",
          "items": [
            {
              "label": "Bits/s",
              "valueKey": "bitsPerSecond"
            },
            {
              "label": "Kilobits/s",
              "valueKey": "kilobitsPerSec"
            },
            {
              "label": "Kilobytes/s",
              "valueKey": "kilobytesPerSec"
            },
            {
              "label": "Gigabytes/s",
              "valueKey": "gigabytesPerSec"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Ancho de Banda",
          "items": [
            "Los ISP anuncian en Mbps (megabits). Divide por 8 para obtener MB/s (megabytes) — tu velocidad real de descarga.",
            "1 Gbps = 125 MB/s. Ethernet Gigabit raramente alcanza velocidad completa debido a overhead (espera ~940 Mbps).",
            "Wi-Fi 6 (802.11ax) máximo teórico es 9.6 Gbps — mundo real típicamente 500–1,200 Mbps.",
            "Para streaming de video: 4K necesita 25 Mbps, 1080p necesita 5 Mbps, 720p necesita 3 Mbps por stream."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el Ancho de Banda?",
          "content": "El ancho de banda es la velocidad máxima a la que se pueden transferir datos a través de una conexión de red, medida en bits por segundo (bps) y sus múltiplos. Representa capacidad, no velocidad — piensa en ello como el ancho de una tubería por la que fluyen los datos. Una tubería más ancha (más ancho de banda) permite que pasen más datos a la vez. Los Proveedores de Servicios de Internet (ISP) anuncian velocidades en megabits por segundo (Mbps), pero los tamaños de archivo se miden en megabytes (MB). Como 1 byte = 8 bits, una conexión de 100 Mbps puede transferir como máximo 12.5 MB por segundo en condiciones ideales. El rendimiento real es menor debido al overhead de protocolos (cabeceras TCP/IP), latencia, congestión y la diferencia entre la velocidad del enlace físico y el ancho de banda utilizable por aplicaciones."
        },
        "howItWorks": {
          "title": "Bits vs Bytes — ¿Por qué la Confusión?",
          "content": "La confusión constante entre Mbps y MB/s viene de la distinción bit/byte. Un bit (b, minúscula) es un solo dígito binario (0 o 1). Un byte (B, mayúscula) son 8 bits. El equipo de red e ISPs miden el ancho de banda en bits por segundo (bps, Kbps, Mbps, Gbps), mientras que los sistemas operativos y administradores de archivos muestran tamaños de archivo en bytes (KB, MB, GB). Esto significa que una conexión de '100 Mbps' descarga archivos a unos 12.5 MB/s, no 100 MB/s. Además, hay dos estándares competidores para prefijos: decimal (SI, donde 1 KB = 1,000 bytes) y binario (IEC, donde 1 KiB = 1,024 bytes). La mayoría de redes usa prefijos decimales, mientras que RAM y algunos almacenamientos usan binarios. Esta calculadora usa prefijos decimales (SI), que es el estándar de redes."
        },
        "considerations": {
          "title": "Factores de Planificación de Ancho de Banda",
          "items": [
            {
              "text": "Overhead de protocolo: TCP/IP añade ~3–5% de overhead. Espera rendimiento utilizable alrededor del 95% de la velocidad del enlace.",
              "type": "info"
            },
            {
              "text": "Ancho de banda compartido: si 10 usuarios comparten un enlace de 100 Mbps, cada uno obtiene ~10 Mbps durante uso pico.",
              "type": "warning"
            },
            {
              "text": "Subida vs bajada: la mayoría de planes de consumidor son asimétricos — la subida es mucho más lenta que la bajada.",
              "type": "info"
            },
            {
              "text": "Latencia ≠ ancho de banda: un enlace de alto ancho de banda puede ser lento si la latencia (ping) es alta.",
              "type": "warning"
            },
            {
              "text": "El tráfico de bots puede consumir 30–50% del ancho de banda de un sitio web — cuenta los crawlers en tus estimaciones.",
              "type": "warning"
            },
            {
              "text": "CDNs (Cloudflare, CloudFront) descargan 60–90% del ancho de banda almacenando assets estáticos en nodos edge.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Velocidades de Conexión Comunes",
          "items": [
            {
              "text": "DSL: 1–100 Mbps bajada, 0.5–10 Mbps subida. Tecnología en declive siendo reemplazada por fibra.",
              "type": "info"
            },
            {
              "text": "Cable (DOCSIS 3.1): 100–1,200 Mbps bajada, 5–50 Mbps subida. Compartido con el vecindario.",
              "type": "info"
            },
            {
              "text": "Fibra (FTTH): 100–10,000 Mbps simétrico. Mejor opción de consumidor para velocidad y latencia.",
              "type": "info"
            },
            {
              "text": "5G: 50–4,000 Mbps bajada. mmWave más rápido pero corto alcance; banda media ofrece mejor balance.",
              "type": "info"
            },
            {
              "text": "Wi-Fi 6E: hasta 2,400 Mbps en 6 GHz. Mejor para entornos densos con muchos dispositivos.",
              "type": "info"
            },
            {
              "text": "Ethernet 10G: 10,000 Mbps (1,250 MB/s). Estándar para centros de datos e interconexiones de servidor.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Conversión de Ancho de Banda",
          "description": "Conversiones de unidades comunes",
          "examples": [
            {
              "title": "Velocidad ISP a Descarga Real",
              "steps": [
                "Tu plan ISP: 200 Mbps (megabits por segundo)",
                "Convertir a bytes: 200 ÷ 8 = 25 MB/s (megabytes por segundo)",
                "Contar overhead (~5%): 25 × 0.95 = 23.75 MB/s práctico",
                "Un archivo de 1 GB toma: 1,000 ÷ 23.75 = ~42 segundos",
                "Límite mensual a velocidad completa: 25 MB/s × 86,400 s × 30 días = ~64.8 TB"
              ],
              "result": "200 Mbps = 25 MB/s teórico, ~23.75 MB/s velocidad práctica de descarga."
            },
            {
              "title": "Requerimiento de Ancho de Banda de Sitio Web",
              "steps": [
                "Páginas vistas mensuales: 100,000",
                "Tamaño promedio de página: 3 MB (HTML + imágenes + JS + CSS)",
                "Datos mensuales: 100,000 × 3 MB = 300,000 MB = ~293 GB",
                "Por segundo: 300,000 MB ÷ (30 × 86,400) = 0.116 MB/s = 0.926 Mbps",
                "Con redundancia 2x: 0.926 × 2 = ~1.85 Mbps"
              ],
              "result": "Un sitio con 100K visitas mensuales necesita ~2 Mbps con margen."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es la diferencia entre Mbps y MB/s?",
          "answer": "Mbps (megabits por segundo) y MB/s (megabytes por segundo) miden velocidad de datos pero en diferentes unidades. Como 1 byte = 8 bits, divides Mbps por 8 para obtener MB/s. Un plan de internet de 100 Mbps te da unos 12.5 MB/s de velocidad real de descarga. Los ISPs usan Mbps porque el número más grande se ve mejor en marketing, mientras tu computadora muestra descargas de archivos en MB/s."
        },
        {
          "question": "¿Por qué mi velocidad real de descarga es menor que la velocidad de mi plan?",
          "answer": "Varios factores reducen el rendimiento del mundo real: overhead de protocolo TCP/IP (3–5%), pérdida de señal Wi-Fi (20–50% de reducción vs cableado), congestión de red durante horas pico, distancia del router, y throttling del ISP. Una conexión cableada de 100 Mbps típicamente entrega 90–95 Mbps, mientras el mismo plan por Wi-Fi podría entregar 50–80 Mbps dependiendo de las condiciones."
        },
        {
          "question": "¿Cuánto ancho de banda requiere el streaming de video?",
          "answer": "Netflix y YouTube recomiendan: SD (480p) = 3 Mbps, HD (1080p) = 5 Mbps, 4K UHD = 25 Mbps por stream. Múltiples streams simultáneos se suman — un hogar con 3 personas viendo 4K necesita unos 75 Mbps solo para video. Los juegos añaden 3–6 Mbps por jugador, y las videollamadas necesitan 1.5–4 Mbps cada una."
        },
        {
          "question": "¿Cómo calculo el ancho de banda de hosting de sitio web?",
          "answer": "Multiplica las páginas vistas mensuales por el tamaño promedio de página para obtener la transferencia de datos mensual. Luego divide por segundos en un mes (2,592,000) para obtener el ancho de banda promedio en bytes por segundo. Multiplica por 8 para convertir a bits por segundo. Añade un factor de redundancia de 1.5–2x para picos de tráfico y tráfico de bots. Ejemplo: 50,000 vistas × 2 MB = 100 GB/mes = ~0.31 Mbps promedio, o ~0.62 Mbps con redundancia 2x."
        },
        {
          "question": "¿Cuál es la diferencia entre ancho de banda y rendimiento?",
          "answer": "El ancho de banda es la capacidad máxima teórica de un enlace — como el límite de velocidad en una autopista. El rendimiento es la cantidad real de datos entregados exitosamente — como qué tan rápido se mueve realmente tu auto en el tráfico. El ancho de banda siempre es mayor que el rendimiento debido al overhead de protocolo, congestión, errores y retransmisiones. Un enlace Ethernet de 1 Gbps típicamente logra 940–960 Mbps de rendimiento."
        },
        {
          "question": "¿El ancho de banda usa prefijos decimales (1000) o binarios (1024)?",
          "answer": "Las redes usan prefijos decimales (SI): 1 Kbps = 1,000 bps, 1 Mbps = 1,000,000 bps, 1 Gbps = 1,000,000,000 bps. El almacenamiento tradicionalmente usa binario: 1 KiB = 1,024 bytes. Esto crea una discrepancia de ~2.4% a escala de megabyte y ~7.4% a escala de gigabyte. Esta calculadora usa el estándar decimal (SI), consistente con convenciones de redes y mediciones de ISP."
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
      },
      "calculator": {
        "yourInformation": "Tu Información"
      }
    },
    pt: {
      "name": "Calculadora de Largura de Banda",
      "slug": "calculadora-largura-banda",
      "subtitle": "Converta entre unidades de largura de banda (Mbps, Gbps, MB/s) e estime a largura de banda necessária para hospedar um site ou serviço.",
      "breadcrumb": "Largura de Banda",
      "seo": {
        "title": "Calculadora de Largura de Banda - Conversor Gratuito de Velocidade e Dados",
        "description": "Converta unidades de largura de banda entre Mbps, Gbps, MB/s e mais. Estime necessidades de largura de banda para hospedagem de sites baseado no tráfego. Ferramenta gratuita para planejamento de rede e profissionais de TI.",
        "shortDescription": "Converta unidades de largura de banda e estime necessidades de hospedagem.",
        "keywords": [
          "calculadora largura de banda",
          "conversor mbps para mbps",
          "conversor largura de banda",
          "calculadora velocidade transferencia dados",
          "calculadora largura de banda site",
          "calculadora largura de banda gratuita",
          "conversor velocidade internet",
          "ferramenta largura de banda rede"
        ]
      },
      "inputs": {
        "mode": {
          "label": "Modo da Calculadora",
          "helpText": "Escolha entre conversão de unidades ou estimativa de largura de banda de site",
          "options": {
            "convert": "Conversor de Unidades",
            "website": "Largura de Banda do Site"
          }
        },
        "inputValue": {
          "label": "Valor da Largura de Banda",
          "helpText": "Digite o valor de largura de banda ou velocidade para converter"
        },
        "inputUnit": {
          "label": "Unidade de Origem",
          "helpText": "Unidade de largura de banda de origem",
          "options": {
            "bps": "bps (bits/s)",
            "kbps": "Kbps (kilobits/s)",
            "mbps": "Mbps (megabits/s)",
            "gbps": "Gbps (gigabits/s)",
            "tbps": "Tbps (terabits/s)",
            "Bps": "B/s (bytes/s)",
            "KBps": "KB/s (kilobytes/s)",
            "MBps": "MB/s (megabytes/s)",
            "GBps": "GB/s (gigabytes/s)",
            "TBps": "TB/s (terabytes/s)"
          }
        },
        "outputUnit": {
          "label": "Unidade de Destino",
          "helpText": "Unidade de largura de banda de destino",
          "options": {
            "bps": "bps (bits/s)",
            "kbps": "Kbps (kilobits/s)",
            "mbps": "Mbps (megabits/s)",
            "gbps": "Gbps (gigabits/s)",
            "tbps": "Tbps (terabits/s)",
            "Bps": "B/s (bytes/s)",
            "KBps": "KB/s (kilobytes/s)",
            "MBps": "MB/s (megabytes/s)",
            "GBps": "GB/s (gigabytes/s)",
            "TBps": "TB/s (terabytes/s)"
          }
        },
        "pageViews": {
          "label": "Visualizações de Página Mensais",
          "helpText": "Visualizações de página mensais estimadas para seu site"
        },
        "avgPageSize": {
          "label": "Tamanho Médio da Página",
          "helpText": "Tamanho médio de um carregamento de página (HTML + imagens + scripts)"
        },
        "pageSizeUnit": {
          "label": "Unidade do Tamanho da Página",
          "helpText": "Unidade para o valor do tamanho da página",
          "options": {
            "KB": "KB (kilobytes)",
            "MB": "MB (megabytes)"
          }
        },
        "redundancy": {
          "label": "Fator de Redundância",
          "helpText": "Multiplique a largura de banda por isso para margem de segurança (1.0 = exato, 1.5 = 50% extra, 2.0 = dobrado)"
        }
      },
      "results": {
        "convertedValue": {
          "label": "Valor Convertido"
        },
        "bitsPerSecond": {
          "label": "Bits por Segundo"
        },
        "bytesPerSecond": {
          "label": "Bytes por Segundo"
        },
        "kilobitsPerSec": {
          "label": "Kilobits/s (Kbps)"
        },
        "megabitsPerSec": {
          "label": "Megabits/s (Mbps)"
        },
        "gigabitsPerSec": {
          "label": "Gigabits/s (Gbps)"
        },
        "kilobytesPerSec": {
          "label": "Kilobytes/s (KB/s)"
        },
        "megabytesPerSec": {
          "label": "Megabytes/s (MB/s)"
        },
        "gigabytesPerSec": {
          "label": "Gigabytes/s (GB/s)"
        },
        "monthlyTransfer": {
          "label": "Transferência de Dados Mensal"
        },
        "dailyTransfer": {
          "label": "Transferência de Dados Diária"
        },
        "requiredBandwidth": {
          "label": "Largura de Banda Necessária"
        },
        "withRedundancy": {
          "label": "Com Fator de Redundância"
        }
      },
      "presets": {
        "homeInternet": {
          "label": "Internet Residencial (100 Mbps)",
          "description": "Converter 100 Mbps para MB/s"
        },
        "gigabitLan": {
          "label": "LAN Gigabit",
          "description": "Converter 1 Gbps para MB/s"
        },
        "websiteBandwidth": {
          "label": "Site Médio",
          "description": "50K visualizações/mês, 2.5 MB/página"
        },
        "streamingServer": {
          "label": "Servidor de Streaming",
          "description": "10K visualizações/mês, 5 MB/página"
        }
      },
      "values": {
        "perSecond": "/s",
        "perMonth": "/mês",
        "perDay": "/dia"
      },
      "formats": {
        "summary": "{inputValue} {inputUnit} = {convertedValue} {outputUnit}",
        "summaryWebsite": "Seu site precisa de ~{requiredBandwidth} Mbps ({withRedundancy} Mbps com {redundancy}x redundância) para {pageViews} visualizações mensais."
      },
      "infoCards": {
        "metrics": {
          "title": "Resultados da Conversão",
          "items": [
            {
              "label": "Megabits/s",
              "valueKey": "megabitsPerSec"
            },
            {
              "label": "Megabytes/s",
              "valueKey": "megabytesPerSec"
            },
            {
              "label": "Gigabits/s",
              "valueKey": "gigabitsPerSec"
            },
            {
              "label": "Transferência Mensal",
              "valueKey": "monthlyTransfer"
            }
          ]
        },
        "details": {
          "title": "Todas as Unidades",
          "items": [
            {
              "label": "Bits/s",
              "valueKey": "bitsPerSecond"
            },
            {
              "label": "Kilobits/s",
              "valueKey": "kilobitsPerSec"
            },
            {
              "label": "Kilobytes/s",
              "valueKey": "kilobytesPerSec"
            },
            {
              "label": "Gigabytes/s",
              "valueKey": "gigabytesPerSec"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Largura de Banda",
          "items": [
            "ISPs anunciam em Mbps (megabits). Divida por 8 para obter MB/s (megabytes) — sua velocidade real de download.",
            "1 Gbps = 125 MB/s. Ethernet Gigabit raramente atinge velocidade total devido ao overhead (espere ~940 Mbps).",
            "Wi-Fi 6 (802.11ax) máximo teórico é 9.6 Gbps — mundo real é tipicamente 500–1.200 Mbps.",
            "Para streaming de vídeo: 4K precisa de 25 Mbps, 1080p precisa de 5 Mbps, 720p precisa de 3 Mbps por stream."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é Largura de Banda?",
          "content": "Largura de banda é a taxa máxima na qual dados podem ser transferidos através de uma conexão de rede, medida em bits por segundo (bps) e seus múltiplos. Representa capacidade, não velocidade — pense nisso como a largura de um cano através do qual dados fluem. Um cano mais largo (mais largura de banda) permite que mais dados passem de uma vez. Provedores de Internet (ISPs) anunciam velocidades em megabits por segundo (Mbps), mas tamanhos de arquivo são medidos em megabytes (MB). Como 1 byte = 8 bits, uma conexão de 100 Mbps pode transferir no máximo 12,5 MB por segundo sob condições ideais. O throughput do mundo real é menor devido ao overhead de protocolo (cabeçalhos TCP/IP), latência, congestionamento e a diferença entre a taxa de link físico e largura de banda utilizável da aplicação."
        },
        "howItWorks": {
          "title": "Bits vs Bytes — Por que a Confusão?",
          "content": "A confusão infinita entre Mbps e MB/s vem da distinção bit/byte. Um bit (b, minúsculo) é um único dígito binário (0 ou 1). Um byte (B, maiúsculo) são 8 bits. Equipamentos de rede e ISPs medem largura de banda em bits por segundo (bps, Kbps, Mbps, Gbps), enquanto sistemas operacionais e gerenciadores de arquivo exibem tamanhos de arquivo em bytes (KB, MB, GB). Isso significa que uma conexão '100 Mbps' baixa arquivos a cerca de 12,5 MB/s, não 100 MB/s. Além disso, há dois padrões competindo para prefixos: decimal (SI, onde 1 KB = 1.000 bytes) e binário (IEC, onde 1 KiB = 1.024 bytes). A maioria das redes usa prefixos decimais, enquanto RAM e alguns armazenamentos usam binário. Esta calculadora usa prefixos decimais (SI), que é o padrão de rede."
        },
        "considerations": {
          "title": "Fatores de Planejamento de Largura de Banda",
          "items": [
            {
              "text": "Overhead de protocolo: TCP/IP adiciona ~3–5% de overhead. Espere throughput utilizável de cerca de 95% da velocidade do link.",
              "type": "info"
            },
            {
              "text": "Largura de banda compartilhada: se 10 usuários compartilham um link de 100 Mbps, cada um obtém ~10 Mbps durante uso de pico.",
              "type": "warning"
            },
            {
              "text": "Upload vs download: a maioria dos planos de consumidor são assimétricos — upload é muito mais lento que download.",
              "type": "info"
            },
            {
              "text": "Latência ≠ largura de banda: um link de alta largura de banda ainda pode ser lento se a latência (ping) for alta.",
              "type": "warning"
            },
            {
              "text": "Tráfego de bots pode consumir 30–50% da largura de banda de um site — considere crawlers em suas estimativas.",
              "type": "warning"
            },
            {
              "text": "CDNs (Cloudflare, CloudFront) reduzem 60–90% da largura de banda fazendo cache de assets estáticos em nós de borda.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Velocidades de Conexão Comuns",
          "items": [
            {
              "text": "DSL: 1–100 Mbps download, 0.5–10 Mbps upload. Tecnologia em declínio sendo substituída por fibra.",
              "type": "info"
            },
            {
              "text": "Cabo (DOCSIS 3.1): 100–1.200 Mbps download, 5–50 Mbps upload. Compartilhado com vizinhança.",
              "type": "info"
            },
            {
              "text": "Fibra (FTTH): 100–10.000 Mbps simétrico. Melhor opção residencial para velocidade e latência.",
              "type": "info"
            },
            {
              "text": "5G: 50–4.000 Mbps download. mmWave mais rápido mas alcance curto; mid-band oferece melhor equilíbrio.",
              "type": "info"
            },
            {
              "text": "Wi-Fi 6E: até 2.400 Mbps em 6 GHz. Melhor para ambientes densos com muitos dispositivos.",
              "type": "info"
            },
            {
              "text": "10G Ethernet: 10.000 Mbps (1.250 MB/s). Padrão para data centers e interconexões de servidor.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Conversão de Largura de Banda",
          "description": "Conversões de unidades comuns",
          "examples": [
            {
              "title": "Velocidade ISP para Download Real",
              "steps": [
                "Seu plano ISP: 200 Mbps (megabits por segundo)",
                "Converter para bytes: 200 ÷ 8 = 25 MB/s (megabytes por segundo)",
                "Considerar overhead (~5%): 25 × 0,95 = 23,75 MB/s prático",
                "Um arquivo de 1 GB demora: 1.000 ÷ 23,75 = ~42 segundos",
                "Limite mensal na velocidade total: 25 MB/s × 86.400 s × 30 dias = ~64,8 TB"
              ],
              "result": "200 Mbps = 25 MB/s teórico, ~23,75 MB/s velocidade prática de download."
            },
            {
              "title": "Requisito de Largura de Banda do Site",
              "steps": [
                "Visualizações de página mensais: 100.000",
                "Tamanho médio da página: 3 MB (HTML + imagens + JS + CSS)",
                "Dados mensais: 100.000 × 3 MB = 300.000 MB = ~293 GB",
                "Por segundo: 300.000 MB ÷ (30 × 86.400) = 0,116 MB/s = 0,926 Mbps",
                "Com 2x redundância: 0,926 × 2 = ~1,85 Mbps"
              ],
              "result": "Um site com 100K visualizações mensais precisa de ~2 Mbps com margem."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual é a diferença entre Mbps e MB/s?",
          "answer": "Mbps (megabits por segundo) e MB/s (megabytes por segundo) medem taxa de dados mas em unidades diferentes. Como 1 byte = 8 bits, você divide Mbps por 8 para obter MB/s. Um plano de internet de 100 Mbps te dá cerca de 12,5 MB/s de velocidade real de download. ISPs usam Mbps porque o número maior fica melhor no marketing, enquanto seu computador mostra downloads de arquivo em MB/s."
        },
        {
          "question": "Por que minha velocidade real de download é menor que a velocidade do meu plano?",
          "answer": "Vários fatores reduzem o throughput do mundo real: overhead do protocolo TCP/IP (3–5%), perda de sinal Wi-Fi (20–50% de redução vs cabo), congestionamento de rede durante horários de pico, distância do roteador e throttling do ISP. Uma conexão com cabo de 100 Mbps tipicamente entrega 90–95 Mbps, enquanto o mesmo plano via Wi-Fi pode entregar 50–80 Mbps dependendo das condições."
        },
        {
          "question": "Quanta largura de banda o streaming de vídeo requer?",
          "answer": "Netflix e YouTube recomendam: SD (480p) = 3 Mbps, HD (1080p) = 5 Mbps, 4K UHD = 25 Mbps por stream. Múltiplos streams simultâneos se somam — uma casa com 3 pessoas assistindo 4K precisa de cerca de 75 Mbps só para vídeo. Gaming adiciona 3–6 Mbps por jogador, e chamadas de vídeo precisam de 1,5–4 Mbps cada."
        },
        {
          "question": "Como calcular largura de banda para hospedagem de site?",
          "answer": "Multiplique visualizações de página mensais pelo tamanho médio da página para obter transferência de dados mensal. Então divida pelos segundos em um mês (2.592.000) para obter a largura de banda média em bytes por segundo. Multiplique por 8 para converter para bits por segundo. Adicione um fator de redundância de 1,5–2x para picos de tráfego e tráfego de bots. Exemplo: 50.000 visualizações × 2 MB = 100 GB/mês = ~0,31 Mbps média, ou ~0,62 Mbps com 2x redundância."
        },
        {
          "question": "Qual é a diferença entre largura de banda e throughput?",
          "answer": "Largura de banda é a capacidade máxima teórica de um link — como o limite de velocidade numa rodovia. Throughput é a quantidade real de dados entregues com sucesso — como quão rápido seu carro realmente se move no trânsito. Largura de banda é sempre maior que throughput devido ao overhead de protocolo, congestionamento, erros e retransmissões. Um link Ethernet de 1 Gbps tipicamente alcança 940–960 Mbps de throughput."
        },
        {
          "question": "Largura de banda usa prefixos decimais (1000) ou binários (1024)?",
          "answer": "Redes usam prefixos decimais (SI): 1 Kbps = 1.000 bps, 1 Mbps = 1.000.000 bps, 1 Gbps = 1.000.000.000 bps. Armazenamento tradicionalmente usa binário: 1 KiB = 1.024 bytes. Isso cria uma discrepância de ~2,4% na escala de megabyte e ~7,4% na escala de gigabyte. Esta calculadora usa o padrão decimal (SI), consistente com convenções de rede e medições de ISP."
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
      "name": "Calculateur de Bande Passante",
      "slug": "calculateur-bande-passante",
      "subtitle": "Convertissez entre les unités de bande passante (Mbps, Gbps, MB/s) et estimez la bande passante nécessaire pour héberger un site web ou service.",
      "breadcrumb": "Bande Passante",
      "seo": {
        "title": "Calculateur de Bande Passante - Convertisseur Gratuit de Vitesse et Unités",
        "description": "Convertissez les unités de bande passante entre Mbps, Gbps, MB/s et plus. Estimez les besoins en bande passante pour héberger un site web selon le trafic. Outil gratuit pour la planification réseau et les professionnels IT.",
        "shortDescription": "Convertissez les unités de bande passante et estimez les besoins d'hébergement.",
        "keywords": [
          "calculateur bande passante",
          "convertisseur mbps mbps",
          "convertisseur bande passante",
          "calculateur vitesse transfert données",
          "calculateur bande passante site web",
          "calculateur bande passante gratuit",
          "convertisseur vitesse internet",
          "outil bande passante réseau"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "mode": {
          "label": "Mode Calculateur",
          "helpText": "Choisissez entre conversion d'unités ou estimation bande passante site web",
          "options": {
            "convert": "Convertisseur d'Unités",
            "website": "Bande Passante Site Web"
          }
        },
        "inputValue": {
          "label": "Valeur Bande Passante",
          "helpText": "Saisissez la valeur de bande passante ou vitesse à convertir"
        },
        "inputUnit": {
          "label": "Unité Source",
          "helpText": "Unité de bande passante source",
          "options": {
            "bps": "bps (bits/s)",
            "kbps": "Kbps (kilobits/s)",
            "mbps": "Mbps (mégabits/s)",
            "gbps": "Gbps (gigabits/s)",
            "tbps": "Tbps (térabits/s)",
            "Bps": "B/s (octets/s)",
            "KBps": "KB/s (kilooctets/s)",
            "MBps": "MB/s (mégaoctets/s)",
            "GBps": "GB/s (gigaoctets/s)",
            "TBps": "TB/s (téraoctets/s)"
          }
        },
        "outputUnit": {
          "label": "Unité Cible",
          "helpText": "Unité de bande passante cible",
          "options": {
            "bps": "bps (bits/s)",
            "kbps": "Kbps (kilobits/s)",
            "mbps": "Mbps (mégabits/s)",
            "gbps": "Gbps (gigabits/s)",
            "tbps": "Tbps (térabits/s)",
            "Bps": "B/s (octets/s)",
            "KBps": "KB/s (kilooctets/s)",
            "MBps": "MB/s (mégaoctets/s)",
            "GBps": "GB/s (gigaoctets/s)",
            "TBps": "TB/s (téraoctets/s)"
          }
        },
        "pageViews": {
          "label": "Vues Pages Mensuelles",
          "helpText": "Estimation des vues pages mensuelles pour votre site web"
        },
        "avgPageSize": {
          "label": "Taille Page Moyenne",
          "helpText": "Taille moyenne d'un chargement de page (HTML + images + scripts)"
        },
        "pageSizeUnit": {
          "label": "Unité Taille Page",
          "helpText": "Unité pour la valeur de taille de page",
          "options": {
            "KB": "KB (kilooctets)",
            "MB": "MB (mégaoctets)"
          }
        },
        "redundancy": {
          "label": "Facteur Redondance",
          "helpText": "Multiplier la bande passante par ceci pour la marge (1.0 = exact, 1.5 = 50% extra, 2.0 = double)"
        }
      },
      "results": {
        "convertedValue": {
          "label": "Valeur Convertie"
        },
        "bitsPerSecond": {
          "label": "Bits par Seconde"
        },
        "bytesPerSecond": {
          "label": "Octets par Seconde"
        },
        "kilobitsPerSec": {
          "label": "Kilobits/s (Kbps)"
        },
        "megabitsPerSec": {
          "label": "Mégabits/s (Mbps)"
        },
        "gigabitsPerSec": {
          "label": "Gigabits/s (Gbps)"
        },
        "kilobytesPerSec": {
          "label": "Kilooctets/s (KB/s)"
        },
        "megabytesPerSec": {
          "label": "Mégaoctets/s (MB/s)"
        },
        "gigabytesPerSec": {
          "label": "Gigaoctets/s (GB/s)"
        },
        "monthlyTransfer": {
          "label": "Transfert Données Mensuel"
        },
        "dailyTransfer": {
          "label": "Transfert Données Quotidien"
        },
        "requiredBandwidth": {
          "label": "Bande Passante Requise"
        },
        "withRedundancy": {
          "label": "Avec Facteur Redondance"
        }
      },
      "presets": {
        "homeInternet": {
          "label": "Internet Domicile (100 Mbps)",
          "description": "Convertir 100 Mbps en MB/s"
        },
        "gigabitLan": {
          "label": "LAN Gigabit",
          "description": "Convertir 1 Gbps en MB/s"
        },
        "websiteBandwidth": {
          "label": "Site Web Moyen",
          "description": "50K vues/mois, 2.5 MB/page"
        },
        "streamingServer": {
          "label": "Serveur Streaming",
          "description": "10K vues/mois, 5 MB/page"
        }
      },
      "values": {
        "perSecond": "/s",
        "perMonth": "/mois",
        "perDay": "/jour"
      },
      "formats": {
        "summary": "{inputValue} {inputUnit} = {convertedValue} {outputUnit}",
        "summaryWebsite": "Votre site nécessite ~{requiredBandwidth} Mbps ({withRedundancy} Mbps avec redondance {redundancy}x) pour {pageViews} vues mensuelles."
      },
      "infoCards": {
        "metrics": {
          "title": "Résultats Conversion",
          "items": [
            {
              "label": "Mégabits/s",
              "valueKey": "megabitsPerSec"
            },
            {
              "label": "Mégaoctets/s",
              "valueKey": "megabytesPerSec"
            },
            {
              "label": "Gigabits/s",
              "valueKey": "gigabitsPerSec"
            },
            {
              "label": "Transfert Mensuel",
              "valueKey": "monthlyTransfer"
            }
          ]
        },
        "details": {
          "title": "Toutes les Unités",
          "items": [
            {
              "label": "Bits/s",
              "valueKey": "bitsPerSecond"
            },
            {
              "label": "Kilobits/s",
              "valueKey": "kilobitsPerSec"
            },
            {
              "label": "Kilooctets/s",
              "valueKey": "kilobytesPerSec"
            },
            {
              "label": "Gigaoctets/s",
              "valueKey": "gigabytesPerSec"
            }
          ]
        },
        "tips": {
          "title": "Conseils Bande Passante",
          "items": [
            "Les FAI annoncent en Mbps (mégabits). Divisez par 8 pour obtenir MB/s (mégaoctets) — votre vitesse de téléchargement réelle.",
            "1 Gbps = 125 MB/s. L'Ethernet gigabit atteint rarement la vitesse maximale à cause des surcoûts (attendez-vous à ~940 Mbps).",
            "Wi-Fi 6 (802.11ax) maximum théorique est 9.6 Gbps — en réalité typiquement 500–1,200 Mbps.",
            "Pour streaming vidéo : 4K nécessite 25 Mbps, 1080p nécessite 5 Mbps, 720p nécessite 3 Mbps par flux."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que la Bande Passante ?",
          "content": "La bande passante est le débit maximum auquel les données peuvent être transférées via une connexion réseau, mesurée en bits par seconde (bps) et ses multiples. Elle représente la capacité, pas la vitesse — pensez-y comme la largeur d'un tuyau par lequel les données s'écoulent. Un tuyau plus large (plus de bande passante) permet à plus de données de passer simultanément. Les Fournisseurs d'Accès Internet (FAI) annoncent les vitesses en mégabits par seconde (Mbps), mais les tailles de fichiers sont mesurées en mégaoctets (MB). Comme 1 octet = 8 bits, une connexion 100 Mbps peut transférer au maximum 12,5 MB par seconde dans des conditions idéales. Le débit réel est plus faible à cause des surcoûts protocolaires (en-têtes TCP/IP), latence, congestion, et la différence entre le débit de liaison physique et la bande passante application utilisable."
        },
        "howItWorks": {
          "title": "Bits vs Octets — Pourquoi la Confusion ?",
          "content": "La confusion permanente entre Mbps et MB/s vient de la distinction bit/octet. Un bit (b, minuscule) est un seul chiffre binaire (0 ou 1). Un octet (B, majuscule) fait 8 bits. Les équipements réseau et FAI mesurent la bande passante en bits par seconde (bps, Kbps, Mbps, Gbps), tandis que les systèmes d'exploitation et gestionnaires de fichiers affichent les tailles en octets (KB, MB, GB). Cela signifie qu'une connexion '100 Mbps' télécharge les fichiers à environ 12,5 MB/s, pas 100 MB/s. De plus, il existe deux standards concurrents pour les préfixes : décimal (SI, où 1 KB = 1 000 octets) et binaire (IEC, où 1 KiB = 1 024 octets). La plupart du réseau utilise les préfixes décimaux, tandis que la RAM et certains stockages utilisent le binaire. Ce calculateur utilise les préfixes décimaux (SI), qui sont la norme réseau."
        },
        "considerations": {
          "title": "Facteurs Planification Bande Passante",
          "items": [
            {
              "text": "Surcoût protocole : TCP/IP ajoute ~3–5% de surcoût. Attendez-vous à un débit utilisable d'environ 95% de la vitesse de liaison.",
              "type": "info"
            },
            {
              "text": "Bande passante partagée : si 10 utilisateurs partagent une liaison 100 Mbps, chacun obtient ~10 Mbps pendant l'usage de pointe.",
              "type": "warning"
            },
            {
              "text": "Upload vs téléchargement : la plupart des plans consommateurs sont asymétriques — l'upload est beaucoup plus lent que le téléchargement.",
              "type": "info"
            },
            {
              "text": "Latence ≠ bande passante : une liaison haute bande passante peut être lente si la latence (ping) est élevée.",
              "type": "warning"
            },
            {
              "text": "Le trafic bot peut consommer 30–50% de la bande passante d'un site web — comptez les crawlers dans vos estimations.",
              "type": "warning"
            },
            {
              "text": "Les CDN (Cloudflare, CloudFront) déchargent 60–90% de la bande passante en mettant en cache les assets statiques aux nœuds de périphérie.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Vitesses Connexion Courantes",
          "items": [
            {
              "text": "DSL : 1–100 Mbps téléchargement, 0,5–10 Mbps upload. Technologie déclinante remplacée par la fibre.",
              "type": "info"
            },
            {
              "text": "Câble (DOCSIS 3.1) : 100–1 200 Mbps téléchargement, 5–50 Mbps upload. Partagé avec le quartier.",
              "type": "info"
            },
            {
              "text": "Fibre (FTTH) : 100–10 000 Mbps symétrique. Meilleure option consommateur pour vitesse et latence.",
              "type": "info"
            },
            {
              "text": "5G : 50–4 000 Mbps téléchargement. mmWave le plus rapide mais courte portée ; mid-band offre le meilleur équilibre.",
              "type": "info"
            },
            {
              "text": "Wi-Fi 6E : jusqu'à 2 400 Mbps sur 6 GHz. Meilleur pour environnements denses avec nombreux appareils.",
              "type": "info"
            },
            {
              "text": "Ethernet 10G : 10 000 Mbps (1 250 MB/s). Standard pour centres de données et interconnexions serveurs.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples Conversion Bande Passante",
          "description": "Conversions d'unités courantes",
          "examples": [
            {
              "title": "Vitesse FAI vers Téléchargement Réel",
              "steps": [
                "Votre plan FAI : 200 Mbps (mégabits par seconde)",
                "Convertir en octets : 200 ÷ 8 = 25 MB/s (mégaoctets par seconde)",
                "Compte surcoût (~5%) : 25 × 0,95 = 23,75 MB/s pratique",
                "Un fichier 1 GB prend : 1 000 ÷ 23,75 = ~42 secondes",
                "Plafond mensuel à vitesse max : 25 MB/s × 86 400 s × 30 jours = ~64,8 TB"
              ],
              "result": "200 Mbps = 25 MB/s théorique, ~23,75 MB/s vitesse téléchargement pratique."
            },
            {
              "title": "Exigence Bande Passante Site Web",
              "steps": [
                "Vues pages mensuelles : 100 000",
                "Taille page moyenne : 3 MB (HTML + images + JS + CSS)",
                "Données mensuelles : 100 000 × 3 MB = 300 000 MB = ~293 GB",
                "Par seconde : 300 000 MB ÷ (30 × 86 400) = 0,116 MB/s = 0,926 Mbps",
                "Avec redondance 2x : 0,926 × 2 = ~1,85 Mbps"
              ],
              "result": "Un site avec 100K vues mensuelles nécessite ~2 Mbps avec marge."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la différence entre Mbps et MB/s ?",
          "answer": "Mbps (mégabits par seconde) et MB/s (mégaoctets par seconde) mesurent le débit de données mais dans différentes unités. Comme 1 octet = 8 bits, vous divisez Mbps par 8 pour obtenir MB/s. Un plan internet 100 Mbps vous donne environ 12,5 MB/s de vitesse de téléchargement réelle. Les FAI utilisent Mbps car le chiffre plus grand paraît mieux en marketing, tandis que votre ordinateur affiche les téléchargements de fichiers en MB/s."
        },
        {
          "question": "Pourquoi ma vitesse de téléchargement réelle est-elle inférieure à la vitesse de mon plan ?",
          "answer": "Plusieurs facteurs réduisent le débit réel : surcoût protocole TCP/IP (3–5%), perte signal Wi-Fi (20–50% de réduction vs filaire), congestion réseau pendant les heures de pointe, distance du routeur, et limitation FAI. Une connexion filaire 100 Mbps délivre typiquement 90–95 Mbps, tandis que le même plan en Wi-Fi pourrait délivrer 50–80 Mbps selon les conditions."
        },
        {
          "question": "Combien de bande passante nécessite le streaming vidéo ?",
          "answer": "Netflix et YouTube recommandent : SD (480p) = 3 Mbps, HD (1080p) = 5 Mbps, 4K UHD = 25 Mbps par flux. Plusieurs flux simultanés s'additionnent — un foyer avec 3 personnes regardant en 4K nécessite environ 75 Mbps juste pour la vidéo. Le gaming ajoute 3–6 Mbps par joueur, et les appels vidéo nécessitent 1,5–4 Mbps chacun."
        },
        {
          "question": "Comment calculer la bande passante d'hébergement site web ?",
          "answer": "Multipliez les vues pages mensuelles par la taille page moyenne pour obtenir le transfert données mensuel. Puis divisez par les secondes dans un mois (2 592 000) pour obtenir la bande passante moyenne en octets par seconde. Multipliez par 8 pour convertir en bits par seconde. Ajoutez un facteur redondance de 1,5–2x pour les pics de trafic et trafic bot. Exemple : 50 000 vues × 2 MB = 100 GB/mois = ~0,31 Mbps moyenne, ou ~0,62 Mbps avec redondance 2x."
        },
        {
          "question": "Quelle est la différence entre bande passante et débit ?",
          "answer": "La bande passante est la capacité maximale théorique d'une liaison — comme la limite de vitesse sur une autoroute. Le débit est la quantité réelle de données livrées avec succès — comme la vitesse à laquelle votre voiture roule dans le trafic. La bande passante est toujours supérieure au débit à cause des surcoûts protocole, congestion, erreurs, et retransmissions. Une liaison Ethernet 1 Gbps atteint typiquement 940–960 Mbps de débit."
        },
        {
          "question": "La bande passante utilise-t-elle les préfixes décimaux (1000) ou binaires (1024) ?",
          "answer": "Le réseau utilise les préfixes décimaux (SI) : 1 Kbps = 1 000 bps, 1 Mbps = 1 000 000 bps, 1 Gbps = 1 000 000 000 bps. Le stockage utilise traditionnellement le binaire : 1 KiB = 1 024 octets. Cela crée un écart de ~2,4% à l'échelle mégaoctet et ~7,4% à l'échelle gigaoctet. Ce calculateur utilise le standard décimal (SI), cohérent avec les conventions réseau et mesures FAI."
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
      }
    },
    de: {
      "name": "Bandbreiten-Rechner",
      "slug": "bandbreiten-rechner",
      "subtitle": "Konvertieren Sie zwischen Bandbreiteneinheiten (Mbps, Gbps, MB/s) und schätzen Sie die benötigte Bandbreite für das Hosting einer Website oder eines Dienstes.",
      "breadcrumb": "Bandbreite",
      "seo": {
        "title": "Bandbreiten-Rechner - Kostenloser Geschwindigkeits- & Dateneinheiten-Konverter",
        "description": "Konvertieren Sie Bandbreiteneinheiten zwischen Mbps, Gbps, MB/s und mehr. Schätzen Sie Website-Hosting-Bandbreitenbedarf basierend auf Traffic. Kostenloses Tool für Netzwerkplanung und IT-Profis.",
        "shortDescription": "Konvertieren Sie Bandbreiteneinheiten und schätzen Sie Hosting-Bedarf.",
        "keywords": [
          "bandbreiten rechner",
          "mbps zu mbps konverter",
          "bandbreiten konverter",
          "datenübertragungsgeschwindigkeit rechner",
          "website bandbreiten rechner",
          "kostenloser bandbreiten rechner",
          "internetgeschwindigkeit konverter",
          "netzwerk bandbreiten tool"
        ]
      },
      "inputs": {
        "mode": {
          "label": "Rechner-Modus",
          "helpText": "Wählen Sie zwischen Einheitenkonvertierung oder Website-Bandbreitenschätzung",
          "options": {
            "convert": "Einheiten-Konverter",
            "website": "Website-Bandbreite"
          }
        },
        "inputValue": {
          "label": "Bandbreitenwert",
          "helpText": "Geben Sie den zu konvertierenden Bandbreiten- oder Geschwindigkeitswert ein"
        },
        "inputUnit": {
          "label": "Von Einheit",
          "helpText": "Quell-Bandbreiteneinheit",
          "options": {
            "bps": "bps (Bits/s)",
            "kbps": "Kbps (Kilobits/s)",
            "mbps": "Mbps (Megabits/s)",
            "gbps": "Gbps (Gigabits/s)",
            "tbps": "Tbps (Terabits/s)",
            "Bps": "B/s (Bytes/s)",
            "KBps": "KB/s (Kilobytes/s)",
            "MBps": "MB/s (Megabytes/s)",
            "GBps": "GB/s (Gigabytes/s)",
            "TBps": "TB/s (Terabytes/s)"
          }
        },
        "outputUnit": {
          "label": "Zu Einheit",
          "helpText": "Ziel-Bandbreiteneinheit",
          "options": {
            "bps": "bps (Bits/s)",
            "kbps": "Kbps (Kilobits/s)",
            "mbps": "Mbps (Megabits/s)",
            "gbps": "Gbps (Gigabits/s)",
            "tbps": "Tbps (Terabits/s)",
            "Bps": "B/s (Bytes/s)",
            "KBps": "KB/s (Kilobytes/s)",
            "MBps": "MB/s (Megabytes/s)",
            "GBps": "GB/s (Gigabytes/s)",
            "TBps": "TB/s (Terabytes/s)"
          }
        },
        "pageViews": {
          "label": "Monatliche Seitenaufrufe",
          "helpText": "Geschätzte monatliche Seitenaufrufe für Ihre Website"
        },
        "avgPageSize": {
          "label": "Durchschnittliche Seitengröße",
          "helpText": "Durchschnittliche Größe eines einzelnen Seitenladens (HTML + Bilder + Skripte)"
        },
        "pageSizeUnit": {
          "label": "Seitengröße-Einheit",
          "helpText": "Einheit für den Seitengrößenwert",
          "options": {
            "KB": "KB (Kilobytes)",
            "MB": "MB (Megabytes)"
          }
        },
        "redundancy": {
          "label": "Redundanzfaktor",
          "helpText": "Multiplizieren Sie die Bandbreite damit für Puffer (1,0 = exakt, 1,5 = 50% extra, 2,0 = doppelt)"
        }
      },
      "results": {
        "convertedValue": {
          "label": "Konvertierter Wert"
        },
        "bitsPerSecond": {
          "label": "Bits pro Sekunde"
        },
        "bytesPerSecond": {
          "label": "Bytes pro Sekunde"
        },
        "kilobitsPerSec": {
          "label": "Kilobits/s (Kbps)"
        },
        "megabitsPerSec": {
          "label": "Megabits/s (Mbps)"
        },
        "gigabitsPerSec": {
          "label": "Gigabits/s (Gbps)"
        },
        "kilobytesPerSec": {
          "label": "Kilobytes/s (KB/s)"
        },
        "megabytesPerSec": {
          "label": "Megabytes/s (MB/s)"
        },
        "gigabytesPerSec": {
          "label": "Gigabytes/s (GB/s)"
        },
        "monthlyTransfer": {
          "label": "Monatliche Datenübertragung"
        },
        "dailyTransfer": {
          "label": "Tägliche Datenübertragung"
        },
        "requiredBandwidth": {
          "label": "Benötigte Bandbreite"
        },
        "withRedundancy": {
          "label": "Mit Redundanzfaktor"
        }
      },
      "presets": {
        "homeInternet": {
          "label": "Heiminternet (100 Mbps)",
          "description": "100 Mbps zu MB/s konvertieren"
        },
        "gigabitLan": {
          "label": "Gigabit-LAN",
          "description": "1 Gbps zu MB/s konvertieren"
        },
        "websiteBandwidth": {
          "label": "Mittlere Website",
          "description": "50K Aufrufe/Monat, 2,5 MB/Seite"
        },
        "streamingServer": {
          "label": "Streaming-Server",
          "description": "10K Aufrufe/Monat, 5 MB/Seite"
        }
      },
      "values": {
        "perSecond": "/s",
        "perMonth": "/Monat",
        "perDay": "/Tag"
      },
      "formats": {
        "summary": "{inputValue} {inputUnit} = {convertedValue} {outputUnit}",
        "summaryWebsite": "Ihre Website benötigt ~{requiredBandwidth} Mbps ({withRedundancy} Mbps mit {redundancy}x Redundanz) für {pageViews} monatliche Aufrufe."
      },
      "infoCards": {
        "metrics": {
          "title": "Konvertierungsergebnisse",
          "items": [
            {
              "label": "Megabits/s",
              "valueKey": "megabitsPerSec"
            },
            {
              "label": "Megabytes/s",
              "valueKey": "megabytesPerSec"
            },
            {
              "label": "Gigabits/s",
              "valueKey": "gigabitsPerSec"
            },
            {
              "label": "Monatliche Übertragung",
              "valueKey": "monthlyTransfer"
            }
          ]
        },
        "details": {
          "title": "Alle Einheiten",
          "items": [
            {
              "label": "Bits/s",
              "valueKey": "bitsPerSecond"
            },
            {
              "label": "Kilobits/s",
              "valueKey": "kilobitsPerSec"
            },
            {
              "label": "Kilobytes/s",
              "valueKey": "kilobytesPerSec"
            },
            {
              "label": "Gigabytes/s",
              "valueKey": "gigabytesPerSec"
            }
          ]
        },
        "tips": {
          "title": "Bandbreiten-Tipps",
          "items": [
            "ISPs werben in Mbps (Megabits). Teilen Sie durch 8, um MB/s (Megabytes) zu erhalten — Ihre tatsächliche Download-Geschwindigkeit.",
            "1 Gbps = 125 MB/s. Gigabit-Ethernet erreicht selten volle Geschwindigkeit aufgrund von Overhead (erwarten Sie ~940 Mbps).",
            "Wi-Fi 6 (802.11ax) theoretisches Maximum ist 9,6 Gbps — real ist typischerweise 500–1.200 Mbps.",
            "Für Video-Streaming: 4K braucht 25 Mbps, 1080p braucht 5 Mbps, 720p braucht 3 Mbps pro Stream."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist Bandbreite?",
          "content": "Bandbreite ist die maximale Rate, mit der Daten über eine Netzwerkverbindung übertragen werden können, gemessen in Bits pro Sekunde (bps) und deren Vielfachen. Sie stellt Kapazität dar, nicht Geschwindigkeit — denken Sie daran wie an die Breite einer Röhre, durch die Daten fließen. Eine breitere Röhre (mehr Bandbreite) erlaubt mehr Daten gleichzeitig. Internetdienstanbieter (ISPs) werben mit Geschwindigkeiten in Megabits pro Sekunde (Mbps), aber Dateigrößen werden in Megabytes (MB) gemessen. Da 1 Byte = 8 Bits, kann eine 100-Mbps-Verbindung unter idealen Bedingungen höchstens 12,5 MB pro Sekunde übertragen. Der reale Durchsatz ist niedriger aufgrund von Protokoll-Overhead (TCP/IP-Header), Latenz, Überlastung und dem Unterschied zwischen physischer Verbindungsrate und nutzbarer Anwendungsbandbreite."
        },
        "howItWorks": {
          "title": "Bits vs. Bytes — Warum die Verwirrung?",
          "content": "Die endlose Verwirrung zwischen Mbps und MB/s kommt vom Bit/Byte-Unterschied. Ein Bit (b, kleingeschrieben) ist eine einzelne Binärziffer (0 oder 1). Ein Byte (B, großgeschrieben) sind 8 Bits. Netzwerkgeräte und ISPs messen Bandbreite in Bits pro Sekunde (bps, Kbps, Mbps, Gbps), während Betriebssysteme und Dateimanager Dateigrößen in Bytes (KB, MB, GB) anzeigen. Das bedeutet, eine '100 Mbps'-Verbindung lädt Dateien mit etwa 12,5 MB/s herunter, nicht 100 MB/s. Zusätzlich gibt es zwei konkurrierende Standards für Präfixe: dezimal (SI, wo 1 KB = 1.000 Bytes) und binär (IEC, wo 1 KiB = 1.024 Bytes). Die meisten Netzwerke verwenden dezimale Präfixe, während RAM und manche Speicher binär verwenden. Dieser Rechner verwendet dezimale (SI) Präfixe, was der Netzwerk-Standard ist."
        },
        "considerations": {
          "title": "Bandbreitenplanungsfaktoren",
          "items": [
            {
              "text": "Protokoll-Overhead: TCP/IP fügt ~3–5% Overhead hinzu. Erwarten Sie nutzbaren Durchsatz um 95% der Verbindungsgeschwindigkeit.",
              "type": "info"
            },
            {
              "text": "Geteilte Bandbreite: wenn 10 Nutzer sich eine 100-Mbps-Verbindung teilen, bekommt jeder ~10 Mbps bei Spitzennutzung.",
              "type": "warning"
            },
            {
              "text": "Upload vs. Download: die meisten Verbrauchertarife sind asymmetrisch — Upload ist viel langsamer als Download.",
              "type": "info"
            },
            {
              "text": "Latenz ≠ Bandbreite: eine High-Bandwidth-Verbindung kann trotzdem langsam sein, wenn die Latenz (Ping) hoch ist.",
              "type": "warning"
            },
            {
              "text": "Bot-Traffic kann 30–50% der Website-Bandbreite verbrauchen — berücksichtigen Sie Crawler in Ihren Schätzungen.",
              "type": "warning"
            },
            {
              "text": "CDNs (Cloudflare, CloudFront) entlasten 60–90% der Bandbreite durch Caching statischer Assets an Edge-Knoten.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Übliche Verbindungsgeschwindigkeiten",
          "items": [
            {
              "text": "DSL: 1–100 Mbps Download, 0,5–10 Mbps Upload. Veraltende Technologie wird durch Glasfaser ersetzt.",
              "type": "info"
            },
            {
              "text": "Kabel (DOCSIS 3.1): 100–1.200 Mbps Download, 5–50 Mbps Upload. Geteilt mit der Nachbarschaft.",
              "type": "info"
            },
            {
              "text": "Glasfaser (FTTH): 100–10.000 Mbps symmetrisch. Beste Verbraucheroption für Geschwindigkeit und Latenz.",
              "type": "info"
            },
            {
              "text": "5G: 50–4.000 Mbps Download. mmWave am schnellsten aber kurze Reichweite; Mid-Band beste Balance.",
              "type": "info"
            },
            {
              "text": "Wi-Fi 6E: bis zu 2.400 Mbps auf 6 GHz. Beste für dichte Umgebungen mit vielen Geräten.",
              "type": "info"
            },
            {
              "text": "10G Ethernet: 10.000 Mbps (1.250 MB/s). Standard für Rechenzentren und Server-Verbindungen.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Bandbreiten-Konvertierungsbeispiele",
          "description": "Übliche Einheitenkonvertierungen",
          "examples": [
            {
              "title": "ISP-Geschwindigkeit zu tatsächlichem Download",
              "steps": [
                "Ihr ISP-Tarif: 200 Mbps (Megabits pro Sekunde)",
                "Zu Bytes konvertieren: 200 ÷ 8 = 25 MB/s (Megabytes pro Sekunde)",
                "Overhead berücksichtigen (~5%): 25 × 0,95 = 23,75 MB/s praktisch",
                "Eine 1-GB-Datei dauert: 1.000 ÷ 23,75 = ~42 Sekunden",
                "Monatliche Obergrenze bei voller Geschwindigkeit: 25 MB/s × 86.400 s × 30 Tage = ~64,8 TB"
              ],
              "result": "200 Mbps = 25 MB/s theoretisch, ~23,75 MB/s praktische Download-Geschwindigkeit."
            },
            {
              "title": "Website-Bandbreitenanforderung",
              "steps": [
                "Monatliche Seitenaufrufe: 100.000",
                "Durchschnittliche Seitengröße: 3 MB (HTML + Bilder + JS + CSS)",
                "Monatliche Daten: 100.000 × 3 MB = 300.000 MB = ~293 GB",
                "Pro Sekunde: 300.000 MB ÷ (30 × 86.400) = 0,116 MB/s = 0,926 Mbps",
                "Mit 2x Redundanz: 0,926 × 2 = ~1,85 Mbps"
              ],
              "result": "Eine Website mit 100K monatlichen Aufrufen braucht ~2 Mbps mit Puffer."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist der Unterschied zwischen Mbps und MB/s?",
          "answer": "Mbps (Megabits pro Sekunde) und MB/s (Megabytes pro Sekunde) messen Datenrate, aber in verschiedenen Einheiten. Da 1 Byte = 8 Bits, teilen Sie Mbps durch 8, um MB/s zu erhalten. Ein 100-Mbps-Internettarif gibt Ihnen etwa 12,5 MB/s tatsächliche Download-Geschwindigkeit. ISPs verwenden Mbps, weil die größere Zahl im Marketing besser aussieht, während Ihr Computer Datei-Downloads in MB/s anzeigt."
        },
        {
          "question": "Warum ist meine tatsächliche Download-Geschwindigkeit niedriger als meine Tarifgeschwindigkeit?",
          "answer": "Mehrere Faktoren reduzieren den realen Durchsatz: TCP/IP-Protokoll-Overhead (3–5%), Wi-Fi-Signalverlust (20–50% Reduzierung vs. Kabel), Netzüberlastung zu Spitzenzeiten, Entfernung zum Router und ISP-Drosselung. Eine 100-Mbps-Kabelverbindung liefert typischerweise 90–95 Mbps, während derselbe Tarif über Wi-Fi 50–80 Mbps je nach Bedingungen liefern könnte."
        },
        {
          "question": "Wie viel Bandbreite braucht Video-Streaming?",
          "answer": "Netflix und YouTube empfehlen: SD (480p) = 3 Mbps, HD (1080p) = 5 Mbps, 4K UHD = 25 Mbps pro Stream. Mehrere gleichzeitige Streams addieren sich — ein Haushalt mit 3 Personen, die 4K streamen, braucht etwa 75 Mbps nur für Video. Gaming fügt 3–6 Mbps pro Spieler hinzu, und Videoanrufe brauchen 1,5–4 Mbps jeweils."
        },
        {
          "question": "Wie berechne ich Website-Hosting-Bandbreite?",
          "answer": "Multiplizieren Sie monatliche Seitenaufrufe mit durchschnittlicher Seitengröße, um monatliche Datenübertragung zu erhalten. Dann teilen Sie durch Sekunden im Monat (2.592.000), um die durchschnittliche Bandbreite in Bytes pro Sekunde zu erhalten. Mit 8 multiplizieren, um zu Bits pro Sekunde zu konvertieren. Fügen Sie einen Redundanzfaktor von 1,5–2x für Traffic-Spitzen und Bot-Traffic hinzu. Beispiel: 50.000 Aufrufe × 2 MB = 100 GB/Monat = ~0,31 Mbps Durchschnitt, oder ~0,62 Mbps mit 2x Redundanz."
        },
        {
          "question": "Was ist der Unterschied zwischen Bandbreite und Durchsatz?",
          "answer": "Bandbreite ist die theoretische maximale Kapazität einer Verbindung — wie das Tempolimit auf einer Autobahn. Durchsatz ist die tatsächliche Menge erfolgreich übertragener Daten — wie schnell Ihr Auto tatsächlich im Verkehr fährt. Bandbreite ist immer höher als Durchsatz wegen Protokoll-Overhead, Überlastung, Fehlern und Wiederübertragungen. Eine 1-Gbps-Ethernet-Verbindung erreicht typischerweise 940–960 Mbps Durchsatz."
        },
        {
          "question": "Verwendet Bandbreite dezimale (1000) oder binäre (1024) Präfixe?",
          "answer": "Netzwerktechnik verwendet dezimale (SI) Präfixe: 1 Kbps = 1.000 bps, 1 Mbps = 1.000.000 bps, 1 Gbps = 1.000.000.000 bps. Speicher verwendet traditionell binär: 1 KiB = 1.024 Bytes. Das erzeugt eine ~2,4% Diskrepanz auf Megabyte-Ebene und ~7,4% auf Gigabyte-Ebene. Dieser Rechner verwendet den dezimalen (SI) Standard, konsistent mit Netzwerkkonventionen und ISP-Messungen."
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
