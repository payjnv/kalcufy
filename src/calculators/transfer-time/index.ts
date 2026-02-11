import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// ─────────────────────────────────────────────────────────────────────────────
// TRANSFER TIME CALCULATOR — V4.3
// ─────────────────────────────────────────────────────────────────────────────
// Calculates: file transfer/download/upload time with overhead, 20 interface
// comparison (incl. WiFi 7, Thunderbolt 5, USB4 v2), chart, unit dropdowns.
// ─────────────────────────────────────────────────────────────────────────────

export const transferTimeConfig: CalculatorConfigV4 = {
  id: "transfer-time",
  version: "4.3",
  category: "technology",
  icon: "⏱️",

  presets: [
    {
      id: "movie4k",
      icon: "🎬",
      values: { fileSize: 15, speed: 100, overheadPercent: 10, connectionType: "custom" },
    },
    {
      id: "gameDownload",
      icon: "🎮",
      values: { fileSize: 80, speed: 300, overheadPercent: 10, connectionType: "custom" },
    },
    {
      id: "cloudBackup",
      icon: "☁️",
      values: { fileSize: 500, speed: 20, overheadPercent: 15, connectionType: "custom" },
    },
    {
      id: "usbTransfer",
      icon: "🔌",
      values: { fileSize: 256, speed: 5000, overheadPercent: 5, connectionType: "usb3" },
    },
  ],

  t: {
    en: {
      name: "Transfer Time Calculator",
      slug: "transfer-time-calculator",
      subtitle: "Estimate how long it takes to download, upload, or copy any file. Compares 20 interfaces including WiFi 7, Thunderbolt 5, and USB4 v2 — with real-world overhead.",
      breadcrumb: "Transfer Time",

      seo: {
        title: "Transfer Time Calculator - Download & Upload Time Estimator (2025)",
        description: "Calculate file transfer time for any size and speed. Compares 20 interfaces (WiFi 7, Thunderbolt 5, USB4 v2, 10G Ethernet). Accounts for TCP/IP overhead. Free multilingual tool.",
        shortDescription: "Estimate file transfer time with real-world overhead and interface comparison.",
        keywords: [
          "file transfer time calculator",
          "download time calculator",
          "upload time estimator",
          "how long to download",
          "transfer speed calculator",
          "data transfer time",
          "bandwidth time calculator",
          "wifi 7 transfer speed",
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
        connectionType: {
          label: "Quick Speed Select",
          helpText: "Pick a common interface to auto-fill speed, or use Custom",
          options: {
            custom: "Custom Speed",
            adsl: "ADSL (8 Mbps)",
            "4g": "4G / LTE (50 Mbps)",
            cable: "Cable / DOCSIS 3.1 (200 Mbps)",
            "5g": "5G (1 Gbps)",
            "5g_mmwave": "5G mmWave (4 Gbps)",
            fiber: "Fiber FTTH (1 Gbps)",
            fiber10g: "Fiber 10G GPON (10 Gbps)",
            wifi5: "Wi-Fi 5 / 802.11ac (867 Mbps)",
            wifi6: "Wi-Fi 6 / 802.11ax (1.2 Gbps)",
            wifi6e: "Wi-Fi 6E / 6 GHz (2.4 Gbps)",
            wifi7: "Wi-Fi 7 / 802.11be (5.8 Gbps)",
            ethernet: "Gigabit Ethernet (1 Gbps)",
            ethernet10g: "10G Ethernet (10 Gbps)",
            usb2: "USB 2.0 (480 Mbps)",
            usb3: "USB 3.2 Gen 1 (5 Gbps)",
            usb32: "USB 3.2 Gen 2×2 (20 Gbps)",
            usb4: "USB4 v1 (40 Gbps)",
            usb4v2: "USB4 v2 (80 Gbps)",
            thunderbolt4: "Thunderbolt 4 (40 Gbps)",
            thunderbolt5: "Thunderbolt 5 (80/120 Gbps)",
            sata3: "SATA III (6 Gbps)",
            nvme3: "NVMe Gen 3 (32 Gbps)",
            nvme4: "NVMe Gen 4 (64 Gbps)",
            nvme5: "NVMe Gen 5 (128 Gbps)",
          },
        },
        speed: {
          label: "Connection Speed",
          helpText: "Your actual download, upload, or interface speed",
        },
        overheadPercent: {
          label: "Protocol Overhead",
          helpText: "TCP/IP, encryption, and protocol overhead reduce effective speed (typically 5–15%)",
        },
      },

      results: {
        transferTime: { label: "Transfer Time" },
        totalSeconds: { label: "Total Seconds" },
        rawSpeedMbps: { label: "Raw Speed (Mbps)" },
        rawSpeedMBps: { label: "Raw Speed (MB/s)" },
        effectiveSpeedMBps: { label: "Effective Speed (MB/s)" },
        fileSizeFormatted: { label: "File Size" },
        dataTransferred: { label: "Data to Transfer" },
        overheadLoss: { label: "Overhead Loss" },
      },

      presets: {
        movie4k: { label: "4K Movie (15 GB)", description: "15 GB at 100 Mbps cable" },
        gameDownload: { label: "AAA Game (80 GB)", description: "80 GB at 300 Mbps 5G" },
        cloudBackup: { label: "Cloud Backup (500 GB)", description: "500 GB at 20 Mbps upload" },
        usbTransfer: { label: "USB 3.0 Copy (256 GB)", description: "256 GB over USB 3.2 Gen 1" },
      },

      values: {
        days: "days",
        day: "day",
        hours: "hours",
        hour: "hour",
        minutes: "minutes",
        minute: "minute",
        seconds: "seconds",
        second: "second",
        lessThanASecond: "Less than a second",
      },

      formats: {
        summary: "Transferring {fileSize} at {speed} ({overhead}% overhead) takes approximately {transferTime}. Effective throughput: {effectiveSpeed}.",
      },

      infoCards: {
        metrics: {
          title: "Speed Analysis",
          items: [
            { label: "Transfer Time", valueKey: "transferTime" },
            { label: "Effective Speed", valueKey: "effectiveSpeedMBps" },
            { label: "Raw Speed", valueKey: "rawSpeedMBps" },
            { label: "Overhead Loss", valueKey: "overheadLoss" },
          ],
        },
        details: {
          title: "Transfer Details",
          items: [
            { label: "File Size", valueKey: "fileSizeFormatted" },
            { label: "Data in Bits", valueKey: "dataTransferred" },
            { label: "Total Seconds", valueKey: "totalSeconds" },
            { label: "Raw Speed (Mbps)", valueKey: "rawSpeedMbps" },
            { label: "Raw Speed (MB/s)", valueKey: "rawSpeedMBps" },
            { label: "Effective (MB/s)", valueKey: "effectiveSpeedMBps" },
          ],
        },
        tips: {
          title: "Speed Up Your Transfers",
          items: [
            "Use wired Ethernet over Wi-Fi for large files — consistent 900+ Mbps vs variable Wi-Fi speeds.",
            "ISPs advertise in Mbps (bits), but files show MB (bytes). Divide advertised speed by 8 for real MB/s.",
            "USB 3.2 Gen 1 is only fast if your drive is an SSD. An HDD caps at ~100 MB/s regardless of USB version.",
            "For cloud uploads, schedule large transfers overnight — less congestion and some ISPs lift throttling.",
          ],
        },
      },

      chart: {
        title: "Transfer Time by Interface",
        xLabel: "Interface",
        yLabel: "Seconds (log scale)",
        series: {
          logSeconds: "Time (log₁₀ sec)",
        },
      },

      detailedTable: {
        interfaceComparison: {
          button: "Compare All 20 Interfaces",
          title: "Transfer Time by Interface — Your File Size",
          columns: {
            interface: "Interface",
            ratedSpeed: "Rated Speed",
            realWorldSpeed: "Real-World Speed",
            transferTime: "Transfer Time",
          },
        },
      },

      education: {
        whatIs: {
          title: "How File Transfer Time Is Calculated",
          content: "File transfer time depends on two factors: the size of the file (measured in bytes) and the speed of your connection (measured in bits per second). The critical detail most people miss is the distinction between bits and bytes — there are 8 bits in every byte. When your ISP advertises a 100 Mbps connection, that translates to a theoretical maximum of 12.5 megabytes per second. In practice, protocol overhead, network congestion, and hardware limitations reduce this further. A typical TCP/IP connection loses 5–15% of its bandwidth to packet headers, acknowledgments, error correction, and TLS encryption. That is why a 100 Mbps connection often delivers only 10–11 MB/s in real-world file transfers rather than the theoretical 12.5 MB/s. This calculator accounts for that overhead and lets you adjust it based on your specific conditions.",
        },
        howItWorks: {
          title: "Understanding Bits, Bytes, and Speed Units",
          content: "The fundamental formula is: Transfer Time = File Size (bits) ÷ Effective Speed (bits/sec). Confusion arises because file sizes use bytes (KB, MB, GB, TB) while network speeds use bits (Kbps, Mbps, Gbps). To convert, multiply the file size in bytes by 8 to get bits. Additionally, storage manufacturers use decimal prefixes (1 GB = 1,000,000,000 bytes) while some operating systems use binary prefixes (1 GiB = 1,073,741,824 bytes). This calculator uses the standard decimal (SI) convention, which matches what ISPs and hardware manufacturers advertise. For USB and local transfers, the rated speed is the theoretical maximum — actual throughput depends on the slowest device in the chain (often the hard drive), cable quality, and whether the bus is shared with other peripherals. Wi-Fi real-world speeds are typically 30–60% of the rated maximum due to signal degradation, interference, and shared airtime.",
        },
        considerations: {
          title: "Factors That Affect Transfer Speed",
          items: [
            { text: "Protocol overhead: TCP/IP headers, TLS encryption, and application-layer protocols add 5–15% overhead to every transfer. VPN connections can add 15–20%.", type: "info" },
            { text: "Network congestion: shared connections, peak-hour usage, and ISP throttling can reduce your speed by 20–50% during evenings.", type: "warning" },
            { text: "Hardware bottleneck: old routers, HDD read/write limits (~100 MB/s), and slow USB hubs can cap throughput far below your network speed.", type: "warning" },
            { text: "Latency: high round-trip time (>100ms) significantly reduces TCP throughput for small files. For large files, bandwidth matters more than latency.", type: "info" },
            { text: "Wi-Fi signal: distance, walls, interference from other devices, and the number of connected clients all degrade Wi-Fi speeds significantly.", type: "info" },
            { text: "Server-side limits: cloud services (Google Drive, Dropbox, S3) may throttle individual connections regardless of your bandwidth.", type: "info" },
          ],
        },
        categories: {
          title: "Common Transfer Scenarios",
          items: [
            { text: "Photo (5 MB) over 4G LTE (50 Mbps): less than 1 second. Even slow connections handle small files instantly.", type: "info" },
            { text: "HD Movie (4 GB) over fiber (500 Mbps): about 64 seconds (~1 minute). Fiber makes HD downloads trivial.", type: "info" },
            { text: "AAA Game (80 GB) over cable (200 Mbps): roughly 53 minutes. Plan for an hour with real-world overhead.", type: "info" },
            { text: "Full backup (1 TB) over 50 Mbps upload: about 44 hours (~2 days). Schedule overnight for multi-day transfers.", type: "info" },
            { text: "SSD to SSD via USB 3.2 Gen 1 (500 GB): roughly 17 minutes at real-world speeds (~400 MB/s effective).", type: "info" },
            { text: "4K video production (2 TB) over Thunderbolt 5: about 3.5 minutes. The fastest consumer interface available.", type: "info" },
          ],
        },
        examples: {
          title: "Step-by-Step Calculation Examples",
          description: "See how transfer time is calculated for common scenarios",
          examples: [
            {
              title: "Download 50 GB Game at 200 Mbps",
              steps: [
                "File size: 50 GB = 50 × 1,000,000,000 × 8 = 400,000,000,000 bits",
                "Raw speed: 200 Mbps = 200,000,000 bits/second",
                "Theoretical time: 400B bits ÷ 200M bps = 2,000 seconds",
                "Apply 10% overhead: 2,000 ÷ 0.90 = 2,222 seconds",
                "Convert: 2,222 s = 37 minutes 2 seconds",
              ],
              result: "A 50 GB game at 200 Mbps takes about 37 minutes with 10% overhead.",
            },
            {
              title: "Copy 256 GB SSD via USB 3.2 Gen 1",
              steps: [
                "File size: 256 GB = 256 × 8,000,000,000 = 2.048 × 10¹² bits",
                "USB 3.2 Gen 1 rated: 5 Gbps = 5,000,000,000 bps",
                "Real-world USB 3.2: ~60% efficiency = 3,000 Mbps effective",
                "Time: 2.048 × 10¹² ÷ 3 × 10⁹ = 683 seconds",
                "Convert: 683 s ≈ 11 minutes 23 seconds",
              ],
              result: "Copying 256 GB over USB 3.2 Gen 1 takes about 11 minutes with an SSD. With an HDD, expect 40+ minutes.",
            },
          ],
        },
      },

      faqs: {
        "0": {
          question: "Why is my actual transfer speed slower than my internet plan?",
          answer: "Internet speeds are advertised in megabits per second (Mbps), but file managers show transfer rates in megabytes per second (MB/s). Since 1 byte = 8 bits, a 100 Mbps connection maxes out at 12.5 MB/s — not 100. Add TCP/IP overhead (5–15%), Wi-Fi signal loss, ISP throttling, shared connections, and router limitations, and real-world speeds are typically 30–70% of the advertised rate.",
        },
        "1": {
          question: "What is protocol overhead and how does it affect transfers?",
          answer: "Every piece of data sent over a network is wrapped in protocol headers (TCP, IP, Ethernet frames) that consume bandwidth but do not carry your file data. TLS/SSL encryption adds further overhead. In typical scenarios, this accounts for 5–15% of total bandwidth. VPN connections add 15–20% due to additional encryption and encapsulation layers. For local USB/Thunderbolt transfers, overhead is lower (3–5%).",
        },
        "2": {
          question: "How do I find my actual internet speed?",
          answer: "Run a speed test at speedtest.net or fast.com to measure your current download and upload speeds. Test multiple times at different hours for accuracy — peak hours (evenings) are usually slower. For local transfers, check your device specs: USB port version, Ethernet adapter speed (100 Mbps vs 1 Gbps vs 2.5 Gbps), and storage drive type (HDD ~100 MB/s, SATA SSD ~550 MB/s, NVMe Gen 4 ~7,000 MB/s).",
        },
        "3": {
          question: "Is Wi-Fi slower than Ethernet for file transfers?",
          answer: "Almost always, yes. Wi-Fi signals degrade with distance, walls, and interference. Wi-Fi 6 is rated at 1.2 Gbps but typically achieves 300–600 Mbps. Wi-Fi 7 promises 5.8 Gbps but real-world speeds will be 1–3 Gbps. Gigabit Ethernet consistently delivers 940+ Mbps. For large file transfers (backups, video projects, gaming downloads), always prefer a wired connection when possible.",
        },
        "4": {
          question: "Why does USB 3.0 transfer slower than its rated 5 Gbps?",
          answer: "USB 3.2 Gen 1 (formerly USB 3.0) at 5 Gbps is the bus speed, not the transfer speed. Real-world USB 3.2 Gen 1 achieves 300–400 MB/s (2.4–3.2 Gbps) with an SSD, due to protocol overhead and controller limitations. If your drive is an HDD (~100 MB/s), the drive becomes the bottleneck — it cannot feed data fast enough to saturate even USB 2.0. Always pair fast USB ports with SSDs for maximum benefit.",
        },
        "5": {
          question: "How long does it take to upload 1 TB to the cloud?",
          answer: "It depends entirely on your upload speed, which is typically much slower than download. At 10 Mbps upload (common cable): about 9.3 days. At 20 Mbps: about 4.6 days. At 100 Mbps upload (fiber): about 22 hours. At 1 Gbps symmetric fiber: about 2.2 hours. Many cloud services also throttle individual connections. AWS S3 and Google Cloud support multi-part parallel uploads that can improve throughput 2–4×.",
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
      "name": "Calculadora de Tiempo de Transferencia",
      "slug": "calculadora-tiempo-transferencia",
      "subtitle": "Estima cuánto tiempo toma descargar, subir o copiar cualquier archivo. Compara 20 interfaces incluyendo WiFi 7, Thunderbolt 5 y USB4 v2 — con sobrecarga del mundo real.",
      "breadcrumb": "Tiempo de Transferencia",
      "seo": {
        "title": "Calculadora de Tiempo de Transferencia - Estimador de Tiempo de Descarga y Subida (2025)",
        "description": "Calcula el tiempo de transferencia de archivos para cualquier tamaño y velocidad. Compara 20 interfaces (WiFi 7, Thunderbolt 5, USB4 v2, Ethernet 10G). Considera la sobrecarga TCP/IP. Herramienta gratuita multiidioma.",
        "shortDescription": "Estima el tiempo de transferencia de archivos con sobrecarga del mundo real y comparación de interfaces.",
        "keywords": [
          "calculadora tiempo transferencia archivos",
          "calculadora tiempo descarga",
          "estimador tiempo subida",
          "cuánto tiempo descargar",
          "calculadora velocidad transferencia",
          "tiempo transferencia datos",
          "calculadora tiempo ancho banda",
          "velocidad transferencia wifi 7"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "fileSize": {
          "label": "Tamaño del Archivo",
          "helpText": "Tamaño del archivo o datos a transferir"
        },
        "connectionType": {
          "label": "Selección Rápida de Velocidad",
          "helpText": "Elige una interfaz común para autocompletar la velocidad, o usa Personalizada",
          "options": {
            "custom": "Velocidad Personalizada",
            "adsl": "ADSL (8 Mbps)",
            "4g": "4G / LTE (50 Mbps)",
            "cable": "Cable / DOCSIS 3.1 (200 Mbps)",
            "5g": "5G (1 Gbps)",
            "5g_mmwave": "5G mmWave (4 Gbps)",
            "fiber": "Fibra FTTH (1 Gbps)",
            "fiber10g": "Fibra 10G GPON (10 Gbps)",
            "wifi5": "Wi-Fi 5 / 802.11ac (867 Mbps)",
            "wifi6": "Wi-Fi 6 / 802.11ax (1.2 Gbps)",
            "wifi6e": "Wi-Fi 6E / 6 GHz (2.4 Gbps)",
            "wifi7": "Wi-Fi 7 / 802.11be (5.8 Gbps)",
            "ethernet": "Ethernet Gigabit (1 Gbps)",
            "ethernet10g": "Ethernet 10G (10 Gbps)",
            "usb2": "USB 2.0 (480 Mbps)",
            "usb3": "USB 3.2 Gen 1 (5 Gbps)",
            "usb32": "USB 3.2 Gen 2×2 (20 Gbps)",
            "usb4": "USB4 v1 (40 Gbps)",
            "usb4v2": "USB4 v2 (80 Gbps)",
            "thunderbolt4": "Thunderbolt 4 (40 Gbps)",
            "thunderbolt5": "Thunderbolt 5 (80/120 Gbps)",
            "sata3": "SATA III (6 Gbps)",
            "nvme3": "NVMe Gen 3 (32 Gbps)",
            "nvme4": "NVMe Gen 4 (64 Gbps)",
            "nvme5": "NVMe Gen 5 (128 Gbps)"
          }
        },
        "speed": {
          "label": "Velocidad de Conexión",
          "helpText": "Tu velocidad real de descarga, subida o interfaz"
        },
        "overheadPercent": {
          "label": "Sobrecarga del Protocolo",
          "helpText": "TCP/IP, encriptación y sobrecarga de protocolo reducen la velocidad efectiva (típicamente 5–15%)"
        }
      },
      "results": {
        "transferTime": {
          "label": "Tiempo de Transferencia"
        },
        "totalSeconds": {
          "label": "Segundos Totales"
        },
        "rawSpeedMbps": {
          "label": "Velocidad Bruta (Mbps)"
        },
        "rawSpeedMBps": {
          "label": "Velocidad Bruta (MB/s)"
        },
        "effectiveSpeedMBps": {
          "label": "Velocidad Efectiva (MB/s)"
        },
        "fileSizeFormatted": {
          "label": "Tamaño del Archivo"
        },
        "dataTransferred": {
          "label": "Datos a Transferir"
        },
        "overheadLoss": {
          "label": "Pérdida por Sobrecarga"
        }
      },
      "presets": {
        "movie4k": {
          "label": "Película 4K (15 GB)",
          "description": "15 GB a 100 Mbps cable"
        },
        "gameDownload": {
          "label": "Juego AAA (80 GB)",
          "description": "80 GB a 300 Mbps 5G"
        },
        "cloudBackup": {
          "label": "Copia de Seguridad en la Nube (500 GB)",
          "description": "500 GB a 20 Mbps subida"
        },
        "usbTransfer": {
          "label": "Copia USB 3.0 (256 GB)",
          "description": "256 GB por USB 3.2 Gen 1"
        }
      },
      "values": {
        "days": "días",
        "day": "día",
        "hours": "horas",
        "hour": "hora",
        "minutes": "minutos",
        "minute": "minuto",
        "seconds": "segundos",
        "second": "segundo",
        "lessThanASecond": "Menos de un segundo"
      },
      "formats": {
        "summary": "Transferir {fileSize} a {speed} ({overhead}% sobrecarga) toma aproximadamente {transferTime}. Rendimiento efectivo: {effectiveSpeed}."
      },
      "infoCards": {
        "metrics": {
          "title": "Análisis de Velocidad",
          "items": [
            {
              "label": "Tiempo de Transferencia",
              "valueKey": "transferTime"
            },
            {
              "label": "Velocidad Efectiva",
              "valueKey": "effectiveSpeedMBps"
            },
            {
              "label": "Velocidad Bruta",
              "valueKey": "rawSpeedMBps"
            },
            {
              "label": "Pérdida por Sobrecarga",
              "valueKey": "overheadLoss"
            }
          ]
        },
        "details": {
          "title": "Detalles de Transferencia",
          "items": [
            {
              "label": "Tamaño del Archivo",
              "valueKey": "fileSizeFormatted"
            },
            {
              "label": "Datos en Bits",
              "valueKey": "dataTransferred"
            },
            {
              "label": "Segundos Totales",
              "valueKey": "totalSeconds"
            },
            {
              "label": "Velocidad Bruta (Mbps)",
              "valueKey": "rawSpeedMbps"
            },
            {
              "label": "Velocidad Bruta (MB/s)",
              "valueKey": "rawSpeedMBps"
            },
            {
              "label": "Efectiva (MB/s)",
              "valueKey": "effectiveSpeedMBps"
            }
          ]
        },
        "tips": {
          "title": "Acelera Tus Transferencias",
          "items": [
            "Usa Ethernet por cable sobre Wi-Fi para archivos grandes — 900+ Mbps consistentes vs velocidades Wi-Fi variables.",
            "Los ISPs anuncian en Mbps (bits), pero los archivos muestran MB (bytes). Divide la velocidad anunciada por 8 para MB/s reales.",
            "USB 3.2 Gen 1 solo es rápido si tu disco es un SSD. Un HDD se limita a ~100 MB/s independientemente de la versión USB.",
            "Para subidas a la nube, programa transferencias grandes durante la noche — menos congestión y algunos ISPs quitan la limitación."
          ]
        }
      },
      "chart": {
        "title": "Tiempo de Transferencia por Interfaz",
        "xLabel": "Interfaz",
        "yLabel": "Segundos (escala logarítmica)",
        "series": {
          "logSeconds": "Tiempo (log₁₀ seg)"
        }
      },
      "detailedTable": {
        "interfaceComparison": {
          "button": "Comparar las 20 Interfaces",
          "title": "Tiempo de Transferencia por Interfaz — Tu Tamaño de Archivo",
          "columns": {
            "interface": "Interfaz",
            "ratedSpeed": "Velocidad Nominal",
            "realWorldSpeed": "Velocidad del Mundo Real",
            "transferTime": "Tiempo de Transferencia"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo se Calcula el Tiempo de Transferencia de Archivos",
          "content": "El tiempo de transferencia de archivos depende de dos factores: el tamaño del archivo (medido en bytes) y la velocidad de tu conexión (medida en bits por segundo). El detalle crítico que la mayoría de personas pasa por alto es la distinción entre bits y bytes — hay 8 bits en cada byte. Cuando tu ISP anuncia una conexión de 100 Mbps, eso se traduce a un máximo teórico de 12.5 megabytes por segundo. En la práctica, la sobrecarga de protocolo, congestión de red y limitaciones de hardware reducen esto aún más. Una conexión TCP/IP típica pierde 5–15% de su ancho de banda en encabezados de paquetes, confirmaciones, corrección de errores y encriptación TLS. Por eso una conexión de 100 Mbps a menudo entrega solo 10–11 MB/s en transferencias de archivos del mundo real en lugar de los 12.5 MB/s teóricos. Esta calculadora considera esa sobrecarga y te permite ajustarla según tus condiciones específicas."
        },
        "howItWorks": {
          "title": "Entendiendo Bits, Bytes y Unidades de Velocidad",
          "content": "La fórmula fundamental es: Tiempo de Transferencia = Tamaño del Archivo (bits) ÷ Velocidad Efectiva (bits/seg). La confusión surge porque los tamaños de archivo usan bytes (KB, MB, GB, TB) mientras que las velocidades de red usan bits (Kbps, Mbps, Gbps). Para convertir, multiplica el tamaño del archivo en bytes por 8 para obtener bits. Además, los fabricantes de almacenamiento usan prefijos decimales (1 GB = 1,000,000,000 bytes) mientras que algunos sistemas operativos usan prefijos binarios (1 GiB = 1,073,741,824 bytes). Esta calculadora usa la convención decimal estándar (SI), que coincide con lo que anuncian los ISPs y fabricantes de hardware. Para transferencias USB y locales, la velocidad nominal es el máximo teórico — el rendimiento real depende del dispositivo más lento en la cadena (a menudo el disco duro), calidad del cable y si el bus se comparte con otros periféricos. Las velocidades reales de Wi-Fi son típicamente 30–60% del máximo nominal debido a degradación de señal, interferencia y tiempo aire compartido."
        },
        "considerations": {
          "title": "Factores que Afectan la Velocidad de Transferencia",
          "items": [
            {
              "text": "Sobrecarga de protocolo: encabezados TCP/IP, encriptación TLS y protocolos de capa de aplicación añaden 5–15% de sobrecarga a cada transferencia. Las conexiones VPN pueden añadir 15–20%.",
              "type": "info"
            },
            {
              "text": "Congestión de red: conexiones compartidas, uso en horas pico y limitación del ISP pueden reducir tu velocidad en 20–50% durante las tardes.",
              "type": "warning"
            },
            {
              "text": "Cuello de botella de hardware: routers antiguos, límites de lectura/escritura de HDD (~100 MB/s) y concentradores USB lentos pueden limitar el rendimiento muy por debajo de tu velocidad de red.",
              "type": "warning"
            },
            {
              "text": "Latencia: tiempo de ida y vuelta alto (>100ms) reduce significativamente el rendimiento TCP para archivos pequeños. Para archivos grandes, el ancho de banda importa más que la latencia.",
              "type": "info"
            },
            {
              "text": "Señal Wi-Fi: distancia, paredes, interferencia de otros dispositivos y el número de clientes conectados degradan significativamente las velocidades Wi-Fi.",
              "type": "info"
            },
            {
              "text": "Límites del lado del servidor: servicios en la nube (Google Drive, Dropbox, S3) pueden limitar conexiones individuales independientemente de tu ancho de banda.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Escenarios Comunes de Transferencia",
          "items": [
            {
              "text": "Foto (5 MB) por 4G LTE (50 Mbps): menos de 1 segundo. Incluso conexiones lentas manejan archivos pequeños instantáneamente.",
              "type": "info"
            },
            {
              "text": "Película HD (4 GB) por fibra (500 Mbps): aproximadamente 64 segundos (~1 minuto). La fibra hace triviales las descargas HD.",
              "type": "info"
            },
            {
              "text": "Juego AAA (80 GB) por cable (200 Mbps): aproximadamente 53 minutos. Planifica una hora con sobrecarga del mundo real.",
              "type": "info"
            },
            {
              "text": "Copia completa (1 TB) por 50 Mbps subida: aproximadamente 44 horas (~2 días). Programa durante la noche para transferencias de varios días.",
              "type": "info"
            },
            {
              "text": "SSD a SSD vía USB 3.2 Gen 1 (500 GB): aproximadamente 17 minutos a velocidades del mundo real (~400 MB/s efectivos).",
              "type": "info"
            },
            {
              "text": "Producción de video 4K (2 TB) por Thunderbolt 5: aproximadamente 3.5 minutos. La interfaz de consumo más rápida disponible.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo Paso a Paso",
          "description": "Ve cómo se calcula el tiempo de transferencia para escenarios comunes",
          "examples": [
            {
              "title": "Descargar juego de 50 GB a 200 Mbps",
              "steps": [
                "Tamaño del archivo: 50 GB = 50 × 1,000,000,000 × 8 = 400,000,000,000 bits",
                "Velocidad bruta: 200 Mbps = 200,000,000 bits/segundo",
                "Tiempo teórico: 400B bits ÷ 200M bps = 2,000 segundos",
                "Aplicar 10% sobrecarga: 2,000 ÷ 0.90 = 2,222 segundos",
                "Convertir: 2,222 s = 37 minutos 2 segundos"
              ],
              "result": "Un juego de 50 GB a 200 Mbps toma aproximadamente 37 minutos con 10% de sobrecarga."
            },
            {
              "title": "Copiar SSD de 256 GB vía USB 3.2 Gen 1",
              "steps": [
                "Tamaño del archivo: 256 GB = 256 × 8,000,000,000 = 2.048 × 10¹² bits",
                "USB 3.2 Gen 1 nominal: 5 Gbps = 5,000,000,000 bps",
                "USB 3.2 del mundo real: ~60% eficiencia = 3,000 Mbps efectivos",
                "Tiempo: 2.048 × 10¹² ÷ 3 × 10⁹ = 683 segundos",
                "Convertir: 683 s ≈ 11 minutos 23 segundos"
              ],
              "result": "Copiar 256 GB por USB 3.2 Gen 1 toma aproximadamente 11 minutos con un SSD. Con un HDD, espera 40+ minutos."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "¿Por qué mi velocidad de transferencia real es más lenta que mi plan de internet?",
          "answer": "Las velocidades de internet se anuncian en megabits por segundo (Mbps), pero los administradores de archivos muestran tasas de transferencia en megabytes por segundo (MB/s). Como 1 byte = 8 bits, una conexión de 100 Mbps máximo alcanza 12.5 MB/s — no 100. Añade sobrecarga TCP/IP (5–15%), pérdida de señal Wi-Fi, limitación del ISP, conexiones compartidas y limitaciones del router, y las velocidades del mundo real son típicamente 30–70% de la tasa anunciada."
        },
        "1": {
          "question": "¿Qué es la sobrecarga de protocolo y cómo afecta las transferencias?",
          "answer": "Cada pieza de datos enviada por una red se envuelve en encabezados de protocolo (TCP, IP, tramas Ethernet) que consumen ancho de banda pero no transportan datos de tu archivo. La encriptación TLS/SSL añade más sobrecarga. En escenarios típicos, esto representa 5–15% del ancho de banda total. Las conexiones VPN añaden 15–20% debido a capas adicionales de encriptación y encapsulación. Para transferencias locales USB/Thunderbolt, la sobrecarga es menor (3–5%)."
        },
        "2": {
          "question": "¿Cómo encuentro mi velocidad real de internet?",
          "answer": "Ejecuta una prueba de velocidad en speedtest.net o fast.com para medir tus velocidades actuales de descarga y subida. Prueba múltiples veces a diferentes horas para exactitud — las horas pico (tardes) suelen ser más lentas. Para transferencias locales, verifica las especificaciones de tu dispositivo: versión del puerto USB, velocidad del adaptador Ethernet (100 Mbps vs 1 Gbps vs 2.5 Gbps) y tipo de disco de almacenamiento (HDD ~100 MB/s, SSD SATA ~550 MB/s, NVMe Gen 4 ~7,000 MB/s)."
        },
        "3": {
          "question": "¿Es Wi-Fi más lento que Ethernet para transferencias de archivos?",
          "answer": "Casi siempre, sí. Las señales Wi-Fi se degradan con distancia, paredes e interferencia. Wi-Fi 6 está clasificado en 1.2 Gbps pero típicamente logra 300–600 Mbps. Wi-Fi 7 promete 5.8 Gbps pero las velocidades del mundo real serán 1–3 Gbps. Ethernet Gigabit consistentemente entrega 940+ Mbps. Para transferencias de archivos grandes (copias de seguridad, proyectos de video, descargas de juegos), siempre prefiere una conexión por cable cuando sea posible."
        },
        "4": {
          "question": "¿Por qué USB 3.0 transfiere más lento que sus 5 Gbps nominales?",
          "answer": "USB 3.2 Gen 1 (anteriormente USB 3.0) a 5 Gbps es la velocidad del bus, no la velocidad de transferencia. USB 3.2 Gen 1 del mundo real logra 300–400 MB/s (2.4–3.2 Gbps) con un SSD, debido a sobrecarga de protocolo y limitaciones del controlador. Si tu disco es un HDD (~100 MB/s), el disco se convierte en el cuello de botella — no puede alimentar datos lo suficientemente rápido para saturar incluso USB 2.0. Siempre combina puertos USB rápidos con SSDs para máximo beneficio."
        },
        "5": {
          "question": "¿Cuánto tiempo toma subir 1 TB a la nube?",
          "answer": "Depende completamente de tu velocidad de subida, que típicamente es mucho más lenta que la descarga. A 10 Mbps subida (cable común): aproximadamente 9.3 días. A 20 Mbps: aproximadamente 4.6 días. A 100 Mbps subida (fibra): aproximadamente 22 horas. A 1 Gbps fibra simétrica: aproximadamente 2.2 horas. Muchos servicios en la nube también limitan conexiones individuales. AWS S3 y Google Cloud soportan subidas paralelas multi-parte que pueden mejorar el rendimiento 2–4×."
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
      "name": "Calculadora de Tempo de Transferência",
      "slug": "calculadora-tempo-transferencia",
      "subtitle": "Estime quanto tempo leva para baixar, enviar ou copiar qualquer arquivo. Compare 20 interfaces incluindo WiFi 7, Thunderbolt 5 e USB4 v2 — com sobrecarga do mundo real.",
      "breadcrumb": "Tempo de Transferência",
      "seo": {
        "title": "Calculadora de Tempo de Transferência - Estimador de Tempo de Download e Upload (2025)",
        "description": "Calcule o tempo de transferência de arquivo para qualquer tamanho e velocidade. Compare 20 interfaces (WiFi 7, Thunderbolt 5, USB4 v2, 10G Ethernet). Considera sobrecarga TCP/IP. Ferramenta multilíngue gratuita.",
        "shortDescription": "Estime o tempo de transferência de arquivos com sobrecarga do mundo real e comparação de interfaces.",
        "keywords": [
          "calculadora tempo transferência arquivo",
          "calculadora tempo download",
          "estimador tempo upload",
          "quanto tempo para baixar",
          "calculadora velocidade transferência",
          "tempo transferência dados",
          "calculadora tempo largura banda",
          "velocidade transferência wifi 7"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "fileSize": {
          "label": "Tamanho do Arquivo",
          "helpText": "Tamanho do arquivo ou dados a transferir"
        },
        "connectionType": {
          "label": "Seleção Rápida de Velocidade",
          "helpText": "Escolha uma interface comum para preencher automaticamente a velocidade, ou use Personalizado",
          "options": {
            "custom": "Velocidade Personalizada",
            "adsl": "ADSL (8 Mbps)",
            "4g": "4G / LTE (50 Mbps)",
            "cable": "Cabo / DOCSIS 3.1 (200 Mbps)",
            "5g": "5G (1 Gbps)",
            "5g_mmwave": "5G mmWave (4 Gbps)",
            "fiber": "Fibra FTTH (1 Gbps)",
            "fiber10g": "Fibra 10G GPON (10 Gbps)",
            "wifi5": "Wi-Fi 5 / 802.11ac (867 Mbps)",
            "wifi6": "Wi-Fi 6 / 802.11ax (1.2 Gbps)",
            "wifi6e": "Wi-Fi 6E / 6 GHz (2.4 Gbps)",
            "wifi7": "Wi-Fi 7 / 802.11be (5.8 Gbps)",
            "ethernet": "Ethernet Gigabit (1 Gbps)",
            "ethernet10g": "Ethernet 10G (10 Gbps)",
            "usb2": "USB 2.0 (480 Mbps)",
            "usb3": "USB 3.2 Gen 1 (5 Gbps)",
            "usb32": "USB 3.2 Gen 2×2 (20 Gbps)",
            "usb4": "USB4 v1 (40 Gbps)",
            "usb4v2": "USB4 v2 (80 Gbps)",
            "thunderbolt4": "Thunderbolt 4 (40 Gbps)",
            "thunderbolt5": "Thunderbolt 5 (80/120 Gbps)",
            "sata3": "SATA III (6 Gbps)",
            "nvme3": "NVMe Gen 3 (32 Gbps)",
            "nvme4": "NVMe Gen 4 (64 Gbps)",
            "nvme5": "NVMe Gen 5 (128 Gbps)"
          }
        },
        "speed": {
          "label": "Velocidade da Conexão",
          "helpText": "Sua velocidade real de download, upload ou interface"
        },
        "overheadPercent": {
          "label": "Sobrecarga de Protocolo",
          "helpText": "TCP/IP, criptografia e sobrecarga de protocolo reduzem a velocidade efetiva (tipicamente 5–15%)"
        }
      },
      "results": {
        "transferTime": {
          "label": "Tempo de Transferência"
        },
        "totalSeconds": {
          "label": "Total em Segundos"
        },
        "rawSpeedMbps": {
          "label": "Velocidade Bruta (Mbps)"
        },
        "rawSpeedMBps": {
          "label": "Velocidade Bruta (MB/s)"
        },
        "effectiveSpeedMBps": {
          "label": "Velocidade Efetiva (MB/s)"
        },
        "fileSizeFormatted": {
          "label": "Tamanho do Arquivo"
        },
        "dataTransferred": {
          "label": "Dados a Transferir"
        },
        "overheadLoss": {
          "label": "Perda por Sobrecarga"
        }
      },
      "presets": {
        "movie4k": {
          "label": "Filme 4K (15 GB)",
          "description": "15 GB a 100 Mbps cabo"
        },
        "gameDownload": {
          "label": "Jogo AAA (80 GB)",
          "description": "80 GB a 300 Mbps 5G"
        },
        "cloudBackup": {
          "label": "Backup na Nuvem (500 GB)",
          "description": "500 GB a 20 Mbps upload"
        },
        "usbTransfer": {
          "label": "Cópia USB 3.0 (256 GB)",
          "description": "256 GB via USB 3.2 Gen 1"
        }
      },
      "values": {
        "days": "dias",
        "day": "dia",
        "hours": "horas",
        "hour": "hora",
        "minutes": "minutos",
        "minute": "minuto",
        "seconds": "segundos",
        "second": "segundo",
        "lessThanASecond": "Menos de um segundo"
      },
      "formats": {
        "summary": "Transferir {fileSize} a {speed} ({overhead}% sobrecarga) leva aproximadamente {transferTime}. Taxa efetiva: {effectiveSpeed}."
      },
      "infoCards": {
        "metrics": {
          "title": "Análise de Velocidade",
          "items": [
            {
              "label": "Tempo de Transferência",
              "valueKey": "transferTime"
            },
            {
              "label": "Velocidade Efetiva",
              "valueKey": "effectiveSpeedMBps"
            },
            {
              "label": "Velocidade Bruta",
              "valueKey": "rawSpeedMBps"
            },
            {
              "label": "Perda por Sobrecarga",
              "valueKey": "overheadLoss"
            }
          ]
        },
        "details": {
          "title": "Detalhes da Transferência",
          "items": [
            {
              "label": "Tamanho do Arquivo",
              "valueKey": "fileSizeFormatted"
            },
            {
              "label": "Dados em Bits",
              "valueKey": "dataTransferred"
            },
            {
              "label": "Total em Segundos",
              "valueKey": "totalSeconds"
            },
            {
              "label": "Velocidade Bruta (Mbps)",
              "valueKey": "rawSpeedMbps"
            },
            {
              "label": "Velocidade Bruta (MB/s)",
              "valueKey": "rawSpeedMBps"
            },
            {
              "label": "Efetiva (MB/s)",
              "valueKey": "effectiveSpeedMBps"
            }
          ]
        },
        "tips": {
          "title": "Acelere Suas Transferências",
          "items": [
            "Use Ethernet com cabo ao invés de Wi-Fi para arquivos grandes — 900+ Mbps consistentes vs velocidades variáveis do Wi-Fi.",
            "ISPs anunciam em Mbps (bits), mas arquivos mostram MB (bytes). Divida a velocidade anunciada por 8 para MB/s real.",
            "USB 3.2 Gen 1 só é rápido se seu drive for SSD. Um HDD limita a ~100 MB/s independente da versão USB.",
            "Para uploads na nuvem, programe transferências grandes durante a noite — menos congestionamento e alguns ISPs suspendem limitações."
          ]
        }
      },
      "chart": {
        "title": "Tempo de Transferência por Interface",
        "xLabel": "Interface",
        "yLabel": "Segundos (escala log)",
        "series": {
          "logSeconds": "Tempo (log₁₀ seg)"
        }
      },
      "detailedTable": {
        "interfaceComparison": {
          "button": "Compare Todas as 20 Interfaces",
          "title": "Tempo de Transferência por Interface — Seu Tamanho de Arquivo",
          "columns": {
            "interface": "Interface",
            "ratedSpeed": "Velocidade Nominal",
            "realWorldSpeed": "Velocidade Real",
            "transferTime": "Tempo de Transferência"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Como o Tempo de Transferência de Arquivo é Calculado",
          "content": "O tempo de transferência de arquivo depende de dois fatores: o tamanho do arquivo (medido em bytes) e a velocidade da sua conexão (medida em bits por segundo). O detalhe crítico que a maioria das pessoas perde é a distinção entre bits e bytes — há 8 bits em cada byte. Quando seu ISP anuncia uma conexão de 100 Mbps, isso se traduz em um máximo teórico de 12,5 megabytes por segundo. Na prática, sobrecarga de protocolo, congestionamento de rede e limitações de hardware reduzem isso ainda mais. Uma conexão TCP/IP típica perde 5–15% de sua largura de banda para cabeçalhos de pacotes, confirmações, correção de erros e criptografia TLS. É por isso que uma conexão de 100 Mbps frequentemente entrega apenas 10–11 MB/s em transferências reais de arquivo ao invés dos 12,5 MB/s teóricos. Esta calculadora considera essa sobrecarga e permite ajustá-la com base em suas condições específicas."
        },
        "howItWorks": {
          "title": "Entendendo Bits, Bytes e Unidades de Velocidade",
          "content": "A fórmula fundamental é: Tempo de Transferência = Tamanho do Arquivo (bits) ÷ Velocidade Efetiva (bits/seg). A confusão surge porque tamanhos de arquivo usam bytes (KB, MB, GB, TB) enquanto velocidades de rede usam bits (Kbps, Mbps, Gbps). Para converter, multiplique o tamanho do arquivo em bytes por 8 para obter bits. Além disso, fabricantes de armazenamento usam prefixos decimais (1 GB = 1.000.000.000 bytes) enquanto alguns sistemas operacionais usam prefixos binários (1 GiB = 1.073.741.824 bytes). Esta calculadora usa a convenção decimal (SI) padrão, que corresponde ao que ISPs e fabricantes de hardware anunciam. Para USB e transferências locais, a velocidade nominal é o máximo teórico — taxa real depende do dispositivo mais lento na cadeia (frequentemente o disco rígido), qualidade do cabo e se o barramento é compartilhado com outros periféricos. Velocidades reais de Wi-Fi são tipicamente 30–60% do máximo nominal devido à degradação do sinal, interferência e tempo compartilhado."
        },
        "considerations": {
          "title": "Fatores Que Afetam a Velocidade de Transferência",
          "items": [
            {
              "text": "Sobrecarga de protocolo: cabeçalhos TCP/IP, criptografia TLS e protocolos de camada de aplicação adicionam 5–15% de sobrecarga a cada transferência. Conexões VPN podem adicionar 15–20%.",
              "type": "info"
            },
            {
              "text": "Congestionamento de rede: conexões compartilhadas, uso em horário de pico e limitação do ISP podem reduzir sua velocidade em 20–50% durante as noites.",
              "type": "warning"
            },
            {
              "text": "Gargalo de hardware: roteadores antigos, limites de leitura/escrita de HDD (~100 MB/s) e hubs USB lentos podem limitar taxa muito abaixo da velocidade da rede.",
              "type": "warning"
            },
            {
              "text": "Latência: tempo de ida e volta alto (>100ms) reduz significativamente taxa TCP para arquivos pequenos. Para arquivos grandes, largura de banda importa mais que latência.",
              "type": "info"
            },
            {
              "text": "Sinal Wi-Fi: distância, paredes, interferência de outros dispositivos e número de clientes conectados degradam velocidades Wi-Fi significativamente.",
              "type": "info"
            },
            {
              "text": "Limites do lado servidor: serviços na nuvem (Google Drive, Dropbox, S3) podem limitar conexões individuais independente de sua largura de banda.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Cenários Comuns de Transferência",
          "items": [
            {
              "text": "Foto (5 MB) via 4G LTE (50 Mbps): menos de 1 segundo. Até conexões lentas lidam com arquivos pequenos instantaneamente.",
              "type": "info"
            },
            {
              "text": "Filme HD (4 GB) via fibra (500 Mbps): cerca de 64 segundos (~1 minuto). Fibra torna downloads HD triviais.",
              "type": "info"
            },
            {
              "text": "Jogo AAA (80 GB) via cabo (200 Mbps): aproximadamente 53 minutos. Planeje cerca de uma hora com sobrecarga real.",
              "type": "info"
            },
            {
              "text": "Backup completo (1 TB) via 50 Mbps upload: cerca de 44 horas (~2 dias). Programe durante a noite para transferências de vários dias.",
              "type": "info"
            },
            {
              "text": "SSD para SSD via USB 3.2 Gen 1 (500 GB): aproximadamente 17 minutos em velocidades reais (~400 MB/s efetivo).",
              "type": "info"
            },
            {
              "text": "Produção de vídeo 4K (2 TB) via Thunderbolt 5: cerca de 3,5 minutos. A interface de consumo mais rápida disponível.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo Passo a Passo",
          "description": "Veja como o tempo de transferência é calculado para cenários comuns",
          "examples": [
            {
              "title": "Baixar Jogo de 50 GB a 200 Mbps",
              "steps": [
                "Tamanho do arquivo: 50 GB = 50 × 1.000.000.000 × 8 = 400.000.000.000 bits",
                "Velocidade bruta: 200 Mbps = 200.000.000 bits/segundo",
                "Tempo teórico: 400B bits ÷ 200M bps = 2.000 segundos",
                "Aplicar 10% sobrecarga: 2.000 ÷ 0,90 = 2.222 segundos",
                "Converter: 2.222 s = 37 minutos 2 segundos"
              ],
              "result": "Um jogo de 50 GB a 200 Mbps leva cerca de 37 minutos com 10% de sobrecarga."
            },
            {
              "title": "Copiar SSD de 256 GB via USB 3.2 Gen 1",
              "steps": [
                "Tamanho do arquivo: 256 GB = 256 × 8.000.000.000 = 2,048 × 10¹² bits",
                "USB 3.2 Gen 1 nominal: 5 Gbps = 5.000.000.000 bps",
                "USB 3.2 mundo real: ~60% eficiência = 3.000 Mbps efetivo",
                "Tempo: 2,048 × 10¹² ÷ 3 × 10⁹ = 683 segundos",
                "Converter: 683 s ≈ 11 minutos 23 segundos"
              ],
              "result": "Copiar 256 GB via USB 3.2 Gen 1 leva cerca de 11 minutos com SSD. Com HDD, espere 40+ minutos."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Por que minha velocidade real de transferência é mais lenta que meu plano de internet?",
          "answer": "Velocidades de internet são anunciadas em megabits por segundo (Mbps), mas gerenciadores de arquivo mostram taxas de transferência em megabytes por segundo (MB/s). Como 1 byte = 8 bits, uma conexão de 100 Mbps atinge no máximo 12,5 MB/s — não 100. Adicione sobrecarga TCP/IP (5–15%), perda de sinal Wi-Fi, limitação do ISP, conexões compartilhadas e limitações do roteador, e velocidades reais são tipicamente 30–70% da taxa anunciada."
        },
        "1": {
          "question": "O que é sobrecarga de protocolo e como afeta transferências?",
          "answer": "Cada pedaço de dados enviado pela rede é envolvido em cabeçalhos de protocolo (TCP, IP, quadros Ethernet) que consomem largura de banda mas não carregam dados do seu arquivo. Criptografia TLS/SSL adiciona mais sobrecarga. Em cenários típicos, isso representa 5–15% da largura de banda total. Conexões VPN adicionam 15–20% devido a camadas adicionais de criptografia e encapsulamento. Para transferências USB/Thunderbolt locais, a sobrecarga é menor (3–5%)."
        },
        "2": {
          "question": "Como encontro minha velocidade real de internet?",
          "answer": "Execute um teste de velocidade em speedtest.net ou fast.com para medir suas velocidades atuais de download e upload. Teste várias vezes em horários diferentes para precisão — horários de pico (noites) são geralmente mais lentos. Para transferências locais, verifique especificações do dispositivo: versão da porta USB, velocidade do adaptador Ethernet (100 Mbps vs 1 Gbps vs 2,5 Gbps) e tipo de drive de armazenamento (HDD ~100 MB/s, SSD SATA ~550 MB/s, NVMe Gen 4 ~7.000 MB/s)."
        },
        "3": {
          "question": "Wi-Fi é mais lento que Ethernet para transferências de arquivo?",
          "answer": "Quase sempre, sim. Sinais Wi-Fi se degradam com distância, paredes e interferência. Wi-Fi 6 é classificado a 1,2 Gbps mas tipicamente atinge 300–600 Mbps. Wi-Fi 7 promete 5,8 Gbps mas velocidades reais serão 1–3 Gbps. Ethernet Gigabit consistentemente entrega 940+ Mbps. Para transferências de arquivos grandes (backups, projetos de vídeo, downloads de jogos), sempre prefira conexão com fio quando possível."
        },
        "4": {
          "question": "Por que USB 3.0 transfere mais lento que seus 5 Gbps nominais?",
          "answer": "USB 3.2 Gen 1 (antigo USB 3.0) a 5 Gbps é a velocidade do barramento, não a velocidade de transferência. USB 3.2 Gen 1 real atinge 300–400 MB/s (2,4–3,2 Gbps) com SSD, devido à sobrecarga de protocolo e limitações do controlador. Se seu drive for HDD (~100 MB/s), o drive se torna o gargalo — não consegue fornecer dados rápido suficiente para saturar nem USB 2.0. Sempre combine portas USB rápidas com SSDs para benefício máximo."
        },
        "5": {
          "question": "Quanto tempo leva para enviar 1 TB para a nuvem?",
          "answer": "Depende inteiramente da sua velocidade de upload, que é tipicamente muito mais lenta que download. A 10 Mbps upload (cabo comum): cerca de 9,3 dias. A 20 Mbps: cerca de 4,6 dias. A 100 Mbps upload (fibra): cerca de 22 horas. A 1 Gbps fibra simétrica: cerca de 2,2 horas. Muitos serviços na nuvem também limitam conexões individuais. AWS S3 e Google Cloud suportam uploads paralelos multi-parte que podem melhorar taxa em 2–4×."
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
      "name": "Calculateur de Temps de Transfert",
      "slug": "calculateur-temps-transfert",
      "subtitle": "Estimez le temps nécessaire pour télécharger, uploader ou copier n'importe quel fichier. Compare 20 interfaces incluant WiFi 7, Thunderbolt 5 et USB4 v2 — avec surcharge réelle.",
      "breadcrumb": "Temps de Transfert",
      "seo": {
        "title": "Calculateur de Temps de Transfert - Estimateur de Temps de Téléchargement (2025)",
        "description": "Calculez le temps de transfert de fichier pour toute taille et vitesse. Compare 20 interfaces (WiFi 7, Thunderbolt 5, USB4 v2, Ethernet 10G). Tient compte de la surcharge TCP/IP. Outil multilingue gratuit.",
        "shortDescription": "Estimez le temps de transfert de fichier avec surcharge réelle et comparaison d'interfaces.",
        "keywords": [
          "calculateur temps transfert fichier",
          "calculateur temps téléchargement",
          "estimateur temps upload",
          "combien temps télécharger",
          "calculateur vitesse transfert",
          "temps transfert données",
          "calculateur temps bande passante",
          "vitesse transfert wifi 7"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "fileSize": {
          "label": "Taille du Fichier",
          "helpText": "Taille du fichier ou des données à transférer"
        },
        "connectionType": {
          "label": "Sélection Rapide de Vitesse",
          "helpText": "Choisissez une interface commune pour remplir automatiquement la vitesse, ou utilisez Personnalisé",
          "options": {
            "custom": "Vitesse Personnalisée",
            "adsl": "ADSL (8 Mbps)",
            "4g": "4G / LTE (50 Mbps)",
            "cable": "Câble / DOCSIS 3.1 (200 Mbps)",
            "5g": "5G (1 Gbps)",
            "5g_mmwave": "5G mmWave (4 Gbps)",
            "fiber": "Fibre FTTH (1 Gbps)",
            "fiber10g": "Fibre 10G GPON (10 Gbps)",
            "wifi5": "Wi-Fi 5 / 802.11ac (867 Mbps)",
            "wifi6": "Wi-Fi 6 / 802.11ax (1.2 Gbps)",
            "wifi6e": "Wi-Fi 6E / 6 GHz (2.4 Gbps)",
            "wifi7": "Wi-Fi 7 / 802.11be (5.8 Gbps)",
            "ethernet": "Ethernet Gigabit (1 Gbps)",
            "ethernet10g": "Ethernet 10G (10 Gbps)",
            "usb2": "USB 2.0 (480 Mbps)",
            "usb3": "USB 3.2 Gen 1 (5 Gbps)",
            "usb32": "USB 3.2 Gen 2×2 (20 Gbps)",
            "usb4": "USB4 v1 (40 Gbps)",
            "usb4v2": "USB4 v2 (80 Gbps)",
            "thunderbolt4": "Thunderbolt 4 (40 Gbps)",
            "thunderbolt5": "Thunderbolt 5 (80/120 Gbps)",
            "sata3": "SATA III (6 Gbps)",
            "nvme3": "NVMe Gen 3 (32 Gbps)",
            "nvme4": "NVMe Gen 4 (64 Gbps)",
            "nvme5": "NVMe Gen 5 (128 Gbps)"
          }
        },
        "speed": {
          "label": "Vitesse de Connexion",
          "helpText": "Votre vitesse réelle de téléchargement, upload ou interface"
        },
        "overheadPercent": {
          "label": "Surcharge Protocole",
          "helpText": "La surcharge TCP/IP, chiffrement et protocole réduit la vitesse effective (typiquement 5–15%)"
        }
      },
      "results": {
        "transferTime": {
          "label": "Temps de Transfert"
        },
        "totalSeconds": {
          "label": "Total Secondes"
        },
        "rawSpeedMbps": {
          "label": "Vitesse Brute (Mbps)"
        },
        "rawSpeedMBps": {
          "label": "Vitesse Brute (Mo/s)"
        },
        "effectiveSpeedMBps": {
          "label": "Vitesse Effective (Mo/s)"
        },
        "fileSizeFormatted": {
          "label": "Taille du Fichier"
        },
        "dataTransferred": {
          "label": "Données à Transférer"
        },
        "overheadLoss": {
          "label": "Perte de Surcharge"
        }
      },
      "presets": {
        "movie4k": {
          "label": "Film 4K (15 Go)",
          "description": "15 Go à 100 Mbps câble"
        },
        "gameDownload": {
          "label": "Jeu AAA (80 Go)",
          "description": "80 Go à 300 Mbps 5G"
        },
        "cloudBackup": {
          "label": "Sauvegarde Cloud (500 Go)",
          "description": "500 Go à 20 Mbps upload"
        },
        "usbTransfer": {
          "label": "Copie USB 3.0 (256 Go)",
          "description": "256 Go via USB 3.2 Gen 1"
        }
      },
      "values": {
        "days": "jours",
        "day": "jour",
        "hours": "heures",
        "hour": "heure",
        "minutes": "minutes",
        "minute": "minute",
        "seconds": "secondes",
        "second": "seconde",
        "lessThanASecond": "Moins d'une seconde"
      },
      "formats": {
        "summary": "Transférer {fileSize} à {speed} (surcharge {overhead}%) prend environ {transferTime}. Débit effectif : {effectiveSpeed}."
      },
      "infoCards": {
        "metrics": {
          "title": "Analyse de Vitesse",
          "items": [
            {
              "label": "Temps de Transfert",
              "valueKey": "transferTime"
            },
            {
              "label": "Vitesse Effective",
              "valueKey": "effectiveSpeedMBps"
            },
            {
              "label": "Vitesse Brute",
              "valueKey": "rawSpeedMBps"
            },
            {
              "label": "Perte de Surcharge",
              "valueKey": "overheadLoss"
            }
          ]
        },
        "details": {
          "title": "Détails du Transfert",
          "items": [
            {
              "label": "Taille du Fichier",
              "valueKey": "fileSizeFormatted"
            },
            {
              "label": "Données en Bits",
              "valueKey": "dataTransferred"
            },
            {
              "label": "Total Secondes",
              "valueKey": "totalSeconds"
            },
            {
              "label": "Vitesse Brute (Mbps)",
              "valueKey": "rawSpeedMbps"
            },
            {
              "label": "Vitesse Brute (Mo/s)",
              "valueKey": "rawSpeedMBps"
            },
            {
              "label": "Effective (Mo/s)",
              "valueKey": "effectiveSpeedMBps"
            }
          ]
        },
        "tips": {
          "title": "Accélérer Vos Transferts",
          "items": [
            "Utilisez Ethernet filaire plutôt que Wi-Fi pour les gros fichiers — 900+ Mbps constants vs vitesses Wi-Fi variables.",
            "Les FAI annoncent en Mbps (bits), mais les fichiers s'affichent en Mo (octets). Divisez la vitesse annoncée par 8 pour les vrais Mo/s.",
            "USB 3.2 Gen 1 n'est rapide que si votre disque est un SSD. Un HDD plafonne à ~100 Mo/s peu importe la version USB.",
            "Pour les uploads cloud, planifiez les gros transferts la nuit — moins de congestion et certains FAI lèvent la limitation."
          ]
        }
      },
      "chart": {
        "title": "Temps de Transfert par Interface",
        "xLabel": "Interface",
        "yLabel": "Secondes (échelle log)",
        "series": {
          "logSeconds": "Temps (log₁₀ sec)"
        }
      },
      "detailedTable": {
        "interfaceComparison": {
          "button": "Comparer les 20 Interfaces",
          "title": "Temps de Transfert par Interface — Votre Taille de Fichier",
          "columns": {
            "interface": "Interface",
            "ratedSpeed": "Vitesse Nominale",
            "realWorldSpeed": "Vitesse Réelle",
            "transferTime": "Temps de Transfert"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment le Temps de Transfert de Fichier est Calculé",
          "content": "Le temps de transfert de fichier dépend de deux facteurs : la taille du fichier (mesurée en octets) et la vitesse de votre connexion (mesurée en bits par seconde). Le détail crucial que la plupart des gens ratent est la distinction entre bits et octets — il y a 8 bits dans chaque octet. Quand votre FAI annonce une connexion 100 Mbps, cela se traduit par un maximum théorique de 12,5 mégaoctets par seconde. En pratique, la surcharge protocolaire, la congestion réseau et les limitations matérielles réduisent cela davantage. Une connexion TCP/IP typique perd 5–15% de sa bande passante aux en-têtes de paquets, accusés de réception, correction d'erreur et chiffrement TLS. C'est pourquoi une connexion 100 Mbps livre souvent seulement 10–11 Mo/s en transferts de fichiers réels plutôt que les 12,5 Mo/s théoriques. Ce calculateur tient compte de cette surcharge et vous permet de l'ajuster selon vos conditions spécifiques."
        },
        "howItWorks": {
          "title": "Comprendre les Bits, Octets et Unités de Vitesse",
          "content": "La formule fondamentale est : Temps de Transfert = Taille Fichier (bits) ÷ Vitesse Effective (bits/sec). La confusion vient du fait que les tailles de fichiers utilisent les octets (Ko, Mo, Go, To) tandis que les vitesses réseau utilisent les bits (Kbps, Mbps, Gbps). Pour convertir, multipliez la taille du fichier en octets par 8 pour obtenir les bits. De plus, les fabricants de stockage utilisent des préfixes décimaux (1 Go = 1 000 000 000 octets) tandis que certains systèmes d'exploitation utilisent des préfixes binaires (1 Gio = 1 073 741 824 octets). Ce calculateur utilise la convention décimale standard (SI), qui correspond à ce qu'annoncent les FAI et fabricants de matériel. Pour les transferts USB et locaux, la vitesse nominale est le maximum théorique — le débit réel dépend du périphérique le plus lent dans la chaîne (souvent le disque dur), de la qualité du câble, et si le bus est partagé avec d'autres périphériques. Les vitesses Wi-Fi réelles sont typiquement 30–60% du maximum nominal à cause de la dégradation du signal, des interférences et du temps d'antenne partagé."
        },
        "considerations": {
          "title": "Facteurs qui Affectent la Vitesse de Transfert",
          "items": [
            {
              "text": "Surcharge protocolaire : en-têtes TCP/IP, chiffrement TLS et protocoles de couche application ajoutent 5–15% de surcharge à chaque transfert. Les connexions VPN peuvent ajouter 15–20%.",
              "type": "info"
            },
            {
              "text": "Congestion réseau : connexions partagées, utilisation aux heures de pointe et limitation FAI peuvent réduire votre vitesse de 20–50% en soirée.",
              "type": "warning"
            },
            {
              "text": "Goulot d'étranglement matériel : anciens routeurs, limites lecture/écriture HDD (~100 Mo/s) et hubs USB lents peuvent plafonner le débit bien en dessous de votre vitesse réseau.",
              "type": "warning"
            },
            {
              "text": "Latence : temps d'aller-retour élevé (>100ms) réduit significativement le débit TCP pour les petits fichiers. Pour les gros fichiers, la bande passante compte plus que la latence.",
              "type": "info"
            },
            {
              "text": "Signal Wi-Fi : distance, murs, interférences d'autres appareils et nombre de clients connectés dégradent tous significativement les vitesses Wi-Fi.",
              "type": "info"
            },
            {
              "text": "Limites côté serveur : les services cloud (Google Drive, Dropbox, S3) peuvent limiter les connexions individuelles peu importe votre bande passante.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Scénarios de Transfert Courants",
          "items": [
            {
              "text": "Photo (5 Mo) via 4G LTE (50 Mbps) : moins de 1 seconde. Même les connexions lentes gèrent les petits fichiers instantanément.",
              "type": "info"
            },
            {
              "text": "Film HD (4 Go) via fibre (500 Mbps) : environ 64 secondes (~1 minute). La fibre rend les téléchargements HD triviaux.",
              "type": "info"
            },
            {
              "text": "Jeu AAA (80 Go) via câble (200 Mbps) : environ 53 minutes. Prévoyez une heure avec la surcharge réelle.",
              "type": "info"
            },
            {
              "text": "Sauvegarde complète (1 To) via 50 Mbps upload : environ 44 heures (~2 jours). Planifiez la nuit pour les transferts multi-jours.",
              "type": "info"
            },
            {
              "text": "SSD vers SSD via USB 3.2 Gen 1 (500 Go) : environ 17 minutes aux vitesses réelles (~400 Mo/s effectif).",
              "type": "info"
            },
            {
              "text": "Production vidéo 4K (2 To) via Thunderbolt 5 : environ 3,5 minutes. L'interface consommateur la plus rapide disponible.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul Étape par Étape",
          "description": "Voyez comment le temps de transfert est calculé pour des scénarios courants",
          "examples": [
            {
              "title": "Télécharger Jeu 50 Go à 200 Mbps",
              "steps": [
                "Taille fichier : 50 Go = 50 × 1 000 000 000 × 8 = 400 000 000 000 bits",
                "Vitesse brute : 200 Mbps = 200 000 000 bits/seconde",
                "Temps théorique : 400M bits ÷ 200M bps = 2 000 secondes",
                "Appliquer surcharge 10% : 2 000 ÷ 0,90 = 2 222 secondes",
                "Convertir : 2 222 s = 37 minutes 2 secondes"
              ],
              "result": "Un jeu de 50 Go à 200 Mbps prend environ 37 minutes avec 10% de surcharge."
            },
            {
              "title": "Copier SSD 256 Go via USB 3.2 Gen 1",
              "steps": [
                "Taille fichier : 256 Go = 256 × 8 000 000 000 = 2,048 × 10¹² bits",
                "USB 3.2 Gen 1 nominal : 5 Gbps = 5 000 000 000 bps",
                "USB 3.2 réel : ~60% efficacité = 3 000 Mbps effectif",
                "Temps : 2,048 × 10¹² ÷ 3 × 10⁹ = 683 secondes",
                "Convertir : 683 s ≈ 11 minutes 23 secondes"
              ],
              "result": "Copier 256 Go via USB 3.2 Gen 1 prend environ 11 minutes avec un SSD. Avec un HDD, attendez 40+ minutes."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Pourquoi ma vitesse de transfert réelle est plus lente que mon forfait internet ?",
          "answer": "Les vitesses internet sont annoncées en mégabits par seconde (Mbps), mais les gestionnaires de fichiers montrent les taux de transfert en mégaoctets par seconde (Mo/s). Comme 1 octet = 8 bits, une connexion 100 Mbps plafonne à 12,5 Mo/s — pas 100. Ajoutez la surcharge TCP/IP (5–15%), la perte de signal Wi-Fi, la limitation FAI, les connexions partagées et les limitations de routeur, et les vitesses réelles sont typiquement 30–70% du taux annoncé."
        },
        "1": {
          "question": "Qu'est-ce que la surcharge protocolaire et comment affecte-t-elle les transferts ?",
          "answer": "Chaque morceau de données envoyé sur un réseau est enveloppé dans des en-têtes de protocole (TCP, IP, trames Ethernet) qui consomment de la bande passante mais ne transportent pas vos données de fichier. Le chiffrement TLS/SSL ajoute une surcharge supplémentaire. Dans des scénarios typiques, cela représente 5–15% de la bande passante totale. Les connexions VPN ajoutent 15–20% à cause des couches supplémentaires de chiffrement et d'encapsulation. Pour les transferts USB/Thunderbolt locaux, la surcharge est plus faible (3–5%)."
        },
        "2": {
          "question": "Comment puis-je trouver ma vitesse internet réelle ?",
          "answer": "Faites un test de vitesse sur speedtest.net ou fast.com pour mesurer vos vitesses actuelles de téléchargement et upload. Testez plusieurs fois à différentes heures pour la précision — les heures de pointe (soirées) sont habituellement plus lentes. Pour les transferts locaux, vérifiez les spécifications de votre appareil : version du port USB, vitesse de l'adaptateur Ethernet (100 Mbps vs 1 Gbps vs 2,5 Gbps), et type de disque de stockage (HDD ~100 Mo/s, SSD SATA ~550 Mo/s, NVMe Gen 4 ~7 000 Mo/s)."
        },
        "3": {
          "question": "Le Wi-Fi est-il plus lent qu'Ethernet pour les transferts de fichiers ?",
          "answer": "Presque toujours, oui. Les signaux Wi-Fi se dégradent avec la distance, les murs et les interférences. Le Wi-Fi 6 est classé à 1,2 Gbps mais atteint typiquement 300–600 Mbps. Le Wi-Fi 7 promet 5,8 Gbps mais les vitesses réelles seront 1–3 Gbps. Ethernet Gigabit livre constamment 940+ Mbps. Pour les gros transferts de fichiers (sauvegardes, projets vidéo, téléchargements de jeux), préférez toujours une connexion filaire quand possible."
        },
        "4": {
          "question": "Pourquoi l'USB 3.0 transfère plus lentement que ses 5 Gbps nominaux ?",
          "answer": "USB 3.2 Gen 1 (anciennement USB 3.0) à 5 Gbps est la vitesse du bus, pas la vitesse de transfert. L'USB 3.2 Gen 1 réel atteint 300–400 Mo/s (2,4–3,2 Gbps) avec un SSD, à cause de la surcharge protocolaire et des limitations de contrôleur. Si votre disque est un HDD (~100 Mo/s), le disque devient le goulot d'étranglement — il ne peut pas fournir assez de données pour saturer même l'USB 2.0. Associez toujours les ports USB rapides avec des SSD pour un bénéfice maximum."
        },
        "5": {
          "question": "Combien de temps faut-il pour uploader 1 To vers le cloud ?",
          "answer": "Cela dépend entièrement de votre vitesse d'upload, qui est typiquement beaucoup plus lente que le téléchargement. À 10 Mbps upload (câble commun) : environ 9,3 jours. À 20 Mbps : environ 4,6 jours. À 100 Mbps upload (fibre) : environ 22 heures. À 1 Gbps fibre symétrique : environ 2,2 heures. Beaucoup de services cloud limitent aussi les connexions individuelles. AWS S3 et Google Cloud supportent les uploads parallèles multi-parties qui peuvent améliorer le débit de 2–4×."
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
      "name": "Übertragungszeit Rechner",
      "slug": "uebertragungszeit-rechner",
      "subtitle": "Schätzen Sie ab, wie lange es dauert, eine Datei herunterzuladen, hochzuladen oder zu kopieren. Vergleicht 20 Schnittstellen einschließlich WiFi 7, Thunderbolt 5 und USB4 v2 — mit realitätsnahem Overhead.",
      "breadcrumb": "Übertragungszeit",
      "seo": {
        "title": "Übertragungszeit Rechner - Download & Upload Zeit Schätzer (2025)",
        "description": "Berechnen Sie die Dateiübertragungszeit für jede Größe und Geschwindigkeit. Vergleicht 20 Schnittstellen (WiFi 7, Thunderbolt 5, USB4 v2, 10G Ethernet). Berücksichtigt TCP/IP-Overhead. Kostenloses mehrsprachiges Tool.",
        "shortDescription": "Schätzen Sie die Dateiübertragungszeit mit realitätsnahem Overhead und Schnittstellenvergleich.",
        "keywords": [
          "dateiübertragungszeit rechner",
          "download zeit rechner",
          "upload zeit schätzer",
          "wie lange dauert download",
          "übertragungsgeschwindigkeit rechner",
          "datenübertragungszeit",
          "bandbreite zeit rechner",
          "wifi 7 übertragungsgeschwindigkeit"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "fileSize": {
          "label": "Dateigröße",
          "helpText": "Größe der zu übertragenden Datei oder Daten"
        },
        "connectionType": {
          "label": "Schnelle Geschwindigkeitsauswahl",
          "helpText": "Wählen Sie eine gängige Schnittstelle zum automatischen Ausfüllen der Geschwindigkeit oder verwenden Sie Benutzerdefiniert",
          "options": {
            "custom": "Benutzerdefinierte Geschwindigkeit",
            "adsl": "ADSL (8 Mbps)",
            "4g": "4G / LTE (50 Mbps)",
            "cable": "Kabel / DOCSIS 3.1 (200 Mbps)",
            "5g": "5G (1 Gbps)",
            "5g_mmwave": "5G mmWave (4 Gbps)",
            "fiber": "Glasfaser FTTH (1 Gbps)",
            "fiber10g": "Glasfaser 10G GPON (10 Gbps)",
            "wifi5": "Wi-Fi 5 / 802.11ac (867 Mbps)",
            "wifi6": "Wi-Fi 6 / 802.11ax (1,2 Gbps)",
            "wifi6e": "Wi-Fi 6E / 6 GHz (2,4 Gbps)",
            "wifi7": "Wi-Fi 7 / 802.11be (5,8 Gbps)",
            "ethernet": "Gigabit Ethernet (1 Gbps)",
            "ethernet10g": "10G Ethernet (10 Gbps)",
            "usb2": "USB 2.0 (480 Mbps)",
            "usb3": "USB 3.2 Gen 1 (5 Gbps)",
            "usb32": "USB 3.2 Gen 2×2 (20 Gbps)",
            "usb4": "USB4 v1 (40 Gbps)",
            "usb4v2": "USB4 v2 (80 Gbps)",
            "thunderbolt4": "Thunderbolt 4 (40 Gbps)",
            "thunderbolt5": "Thunderbolt 5 (80/120 Gbps)",
            "sata3": "SATA III (6 Gbps)",
            "nvme3": "NVMe Gen 3 (32 Gbps)",
            "nvme4": "NVMe Gen 4 (64 Gbps)",
            "nvme5": "NVMe Gen 5 (128 Gbps)"
          }
        },
        "speed": {
          "label": "Verbindungsgeschwindigkeit",
          "helpText": "Ihre tatsächliche Download-, Upload- oder Schnittstellengeschwindigkeit"
        },
        "overheadPercent": {
          "label": "Protokoll-Overhead",
          "helpText": "TCP/IP-, Verschlüsselungs- und Protokoll-Overhead reduzieren die effektive Geschwindigkeit (typischerweise 5–15%)"
        }
      },
      "results": {
        "transferTime": {
          "label": "Übertragungszeit"
        },
        "totalSeconds": {
          "label": "Gesamtsekunden"
        },
        "rawSpeedMbps": {
          "label": "Rohgeschwindigkeit (Mbps)"
        },
        "rawSpeedMBps": {
          "label": "Rohgeschwindigkeit (MB/s)"
        },
        "effectiveSpeedMBps": {
          "label": "Effektive Geschwindigkeit (MB/s)"
        },
        "fileSizeFormatted": {
          "label": "Dateigröße"
        },
        "dataTransferred": {
          "label": "Zu übertragende Daten"
        },
        "overheadLoss": {
          "label": "Overhead-Verlust"
        }
      },
      "presets": {
        "movie4k": {
          "label": "4K Film (15 GB)",
          "description": "15 GB bei 100 Mbps Kabel"
        },
        "gameDownload": {
          "label": "AAA Spiel (80 GB)",
          "description": "80 GB bei 300 Mbps 5G"
        },
        "cloudBackup": {
          "label": "Cloud-Backup (500 GB)",
          "description": "500 GB bei 20 Mbps Upload"
        },
        "usbTransfer": {
          "label": "USB 3.0 Kopie (256 GB)",
          "description": "256 GB über USB 3.2 Gen 1"
        }
      },
      "values": {
        "days": "Tage",
        "day": "Tag",
        "hours": "Stunden",
        "hour": "Stunde",
        "minutes": "Minuten",
        "minute": "Minute",
        "seconds": "Sekunden",
        "second": "Sekunde",
        "lessThanASecond": "Weniger als eine Sekunde"
      },
      "formats": {
        "summary": "Die Übertragung von {fileSize} bei {speed} ({overhead}% Overhead) dauert ungefähr {transferTime}. Effektiver Durchsatz: {effectiveSpeed}."
      },
      "infoCards": {
        "metrics": {
          "title": "Geschwindigkeitsanalyse",
          "items": [
            {
              "label": "Übertragungszeit",
              "valueKey": "transferTime"
            },
            {
              "label": "Effektive Geschwindigkeit",
              "valueKey": "effectiveSpeedMBps"
            },
            {
              "label": "Rohgeschwindigkeit",
              "valueKey": "rawSpeedMBps"
            },
            {
              "label": "Overhead-Verlust",
              "valueKey": "overheadLoss"
            }
          ]
        },
        "details": {
          "title": "Übertragungsdetails",
          "items": [
            {
              "label": "Dateigröße",
              "valueKey": "fileSizeFormatted"
            },
            {
              "label": "Daten in Bits",
              "valueKey": "dataTransferred"
            },
            {
              "label": "Gesamtsekunden",
              "valueKey": "totalSeconds"
            },
            {
              "label": "Rohgeschwindigkeit (Mbps)",
              "valueKey": "rawSpeedMbps"
            },
            {
              "label": "Rohgeschwindigkeit (MB/s)",
              "valueKey": "rawSpeedMBps"
            },
            {
              "label": "Effektiv (MB/s)",
              "valueKey": "effectiveSpeedMBps"
            }
          ]
        },
        "tips": {
          "title": "Beschleunigen Sie Ihre Übertragungen",
          "items": [
            "Verwenden Sie kabelgebundenes Ethernet statt Wi-Fi für große Dateien — konstante 900+ Mbps vs. variable Wi-Fi-Geschwindigkeiten.",
            "ISPs werben in Mbps (Bits), aber Dateien zeigen MB (Bytes). Teilen Sie die beworbene Geschwindigkeit durch 8 für echte MB/s.",
            "USB 3.2 Gen 1 ist nur schnell, wenn Ihr Laufwerk eine SSD ist. Eine HDD begrenzt auf ~100 MB/s unabhängig von der USB-Version.",
            "Für Cloud-Uploads planen Sie große Übertragungen über Nacht — weniger Überlastung und einige ISPs heben die Drosselung auf."
          ]
        }
      },
      "chart": {
        "title": "Übertragungszeit nach Schnittstelle",
        "xLabel": "Schnittstelle",
        "yLabel": "Sekunden (log Skala)",
        "series": {
          "logSeconds": "Zeit (log₁₀ sek)"
        }
      },
      "detailedTable": {
        "interfaceComparison": {
          "button": "Alle 20 Schnittstellen vergleichen",
          "title": "Übertragungszeit nach Schnittstelle — Ihre Dateigröße",
          "columns": {
            "interface": "Schnittstelle",
            "ratedSpeed": "Nenngeschwindigkeit",
            "realWorldSpeed": "Realistische Geschwindigkeit",
            "transferTime": "Übertragungszeit"
          }
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie die Dateiübertragungszeit berechnet wird",
          "content": "Die Dateiübertragungszeit hängt von zwei Faktoren ab: der Größe der Datei (gemessen in Bytes) und der Geschwindigkeit Ihrer Verbindung (gemessen in Bits pro Sekunde). Das kritische Detail, das die meisten Menschen übersehen, ist der Unterschied zwischen Bits und Bytes — es gibt 8 Bits in jedem Byte. Wenn Ihr ISP eine 100 Mbps Verbindung bewirbt, entspricht das einem theoretischen Maximum von 12,5 Megabytes pro Sekunde. In der Praxis reduzieren Protokoll-Overhead, Netzwerküberlastung und Hardware-Beschränkungen dies weiter. Eine typische TCP/IP-Verbindung verliert 5–15% ihrer Bandbreite durch Paket-Header, Bestätigungen, Fehlerkorrektur und TLS-Verschlüsselung. Deshalb liefert eine 100 Mbps Verbindung oft nur 10–11 MB/s bei realen Dateiübertragungen statt der theoretischen 12,5 MB/s. Dieser Rechner berücksichtigt diesen Overhead und lässt Sie ihn basierend auf Ihren spezifischen Bedingungen anpassen."
        },
        "howItWorks": {
          "title": "Bits, Bytes und Geschwindigkeitseinheiten verstehen",
          "content": "Die grundlegende Formel lautet: Übertragungszeit = Dateigröße (Bits) ÷ Effektive Geschwindigkeit (Bits/Sek). Verwirrung entsteht, weil Dateigrößen Bytes verwenden (KB, MB, GB, TB), während Netzwerkgeschwindigkeiten Bits verwenden (Kbps, Mbps, Gbps). Zur Umrechnung multiplizieren Sie die Dateigröße in Bytes mit 8, um Bits zu erhalten. Zusätzlich verwenden Speicherhersteller Dezimalpräfixe (1 GB = 1.000.000.000 Bytes), während einige Betriebssysteme Binärpräfixe verwenden (1 GiB = 1.073.741.824 Bytes). Dieser Rechner verwendet die Standard-Dezimal-(SI)-Konvention, die dem entspricht, was ISPs und Hardware-Hersteller bewerben. Bei USB- und lokalen Übertragungen ist die Nenngeschwindigkeit das theoretische Maximum — der tatsächliche Durchsatz hängt vom langsamsten Gerät in der Kette ab (oft die Festplatte), der Kabelqualität und ob der Bus mit anderen Peripheriegeräten geteilt wird. Wi-Fi-Realgeschwindigkeiten betragen typischerweise 30–60% des bewerteten Maximums aufgrund von Signaldegradation, Interferenz und geteilter Sendezeit."
        },
        "considerations": {
          "title": "Faktoren, die die Übertragungsgeschwindigkeit beeinflussen",
          "items": [
            {
              "text": "Protokoll-Overhead: TCP/IP-Header, TLS-Verschlüsselung und Anwendungsschichtprotokolle fügen 5–15% Overhead zu jeder Übertragung hinzu. VPN-Verbindungen können 15–20% hinzufügen.",
              "type": "info"
            },
            {
              "text": "Netzwerküberlastung: geteilte Verbindungen, Stoßzeitennutzung und ISP-Drosselung können Ihre Geschwindigkeit um 20–50% während der Abendstunden reduzieren.",
              "type": "warning"
            },
            {
              "text": "Hardware-Engpass: alte Router, HDD-Lese-/Schreibgrenzen (~100 MB/s) und langsame USB-Hubs können den Durchsatz weit unter Ihrer Netzwerkgeschwindigkeit begrenzen.",
              "type": "warning"
            },
            {
              "text": "Latenz: hohe Rundlaufzeit (>100ms) reduziert den TCP-Durchsatz bei kleinen Dateien erheblich. Bei großen Dateien ist Bandbreite wichtiger als Latenz.",
              "type": "info"
            },
            {
              "text": "Wi-Fi-Signal: Entfernung, Wände, Interferenz von anderen Geräten und die Anzahl verbundener Clients verschlechtern alle Wi-Fi-Geschwindigkeiten erheblich.",
              "type": "info"
            },
            {
              "text": "Serverseitige Grenzen: Cloud-Dienste (Google Drive, Dropbox, S3) können einzelne Verbindungen unabhängig von Ihrer Bandbreite drosseln.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Häufige Übertragungsszenarien",
          "items": [
            {
              "text": "Foto (5 MB) über 4G LTE (50 Mbps): weniger als 1 Sekunde. Selbst langsame Verbindungen bewältigen kleine Dateien sofort.",
              "type": "info"
            },
            {
              "text": "HD-Film (4 GB) über Glasfaser (500 Mbps): etwa 64 Sekunden (~1 Minute). Glasfaser macht HD-Downloads trivial.",
              "type": "info"
            },
            {
              "text": "AAA-Spiel (80 GB) über Kabel (200 Mbps): etwa 53 Minuten. Planen Sie eine Stunde mit realem Overhead.",
              "type": "info"
            },
            {
              "text": "Vollständiges Backup (1 TB) über 50 Mbps Upload: etwa 44 Stunden (~2 Tage). Planen Sie über Nacht für mehrtägige Übertragungen.",
              "type": "info"
            },
            {
              "text": "SSD zu SSD über USB 3.2 Gen 1 (500 GB): etwa 17 Minuten bei realen Geschwindigkeiten (~400 MB/s effektiv).",
              "type": "info"
            },
            {
              "text": "4K-Videoproduktion (2 TB) über Thunderbolt 5: etwa 3,5 Minuten. Die schnellste verfügbare Verbraucherschnittstelle.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Schritt-für-Schritt Berechnungsbeispiele",
          "description": "Sehen Sie, wie die Übertragungszeit für häufige Szenarien berechnet wird",
          "examples": [
            {
              "title": "50 GB Spiel bei 200 Mbps herunterladen",
              "steps": [
                "Dateigröße: 50 GB = 50 × 1.000.000.000 × 8 = 400.000.000.000 Bits",
                "Rohgeschwindigkeit: 200 Mbps = 200.000.000 Bits/Sekunde",
                "Theoretische Zeit: 400B Bits ÷ 200M bps = 2.000 Sekunden",
                "10% Overhead anwenden: 2.000 ÷ 0,90 = 2.222 Sekunden",
                "Umrechnen: 2.222 s = 37 Minuten 2 Sekunden"
              ],
              "result": "Ein 50 GB Spiel bei 200 Mbps dauert etwa 37 Minuten mit 10% Overhead."
            },
            {
              "title": "256 GB SSD über USB 3.2 Gen 1 kopieren",
              "steps": [
                "Dateigröße: 256 GB = 256 × 8.000.000.000 = 2,048 × 10¹² Bits",
                "USB 3.2 Gen 1 Nennwert: 5 Gbps = 5.000.000.000 bps",
                "Reale USB 3.2: ~60% Effizienz = 3.000 Mbps effektiv",
                "Zeit: 2,048 × 10¹² ÷ 3 × 10⁹ = 683 Sekunden",
                "Umrechnen: 683 s ≈ 11 Minuten 23 Sekunden"
              ],
              "result": "Das Kopieren von 256 GB über USB 3.2 Gen 1 dauert etwa 11 Minuten mit einer SSD. Mit einer HDD erwarten Sie 40+ Minuten."
            }
          ]
        }
      },
      "faqs": {
        "0": {
          "question": "Warum ist meine tatsächliche Übertragungsgeschwindigkeit langsamer als mein Internettarif?",
          "answer": "Internetgeschwindigkeiten werden in Megabits pro Sekunde (Mbps) beworben, aber Dateimanager zeigen Übertragungsraten in Megabytes pro Sekunde (MB/s). Da 1 Byte = 8 Bits, erreicht eine 100 Mbps Verbindung maximal 12,5 MB/s — nicht 100. Fügen Sie TCP/IP-Overhead (5–15%), Wi-Fi-Signalverlust, ISP-Drosselung, geteilte Verbindungen und Router-Beschränkungen hinzu, und reale Geschwindigkeiten betragen typischerweise 30–70% der beworbenen Rate."
        },
        "1": {
          "question": "Was ist Protokoll-Overhead und wie beeinflusst er Übertragungen?",
          "answer": "Jedes über ein Netzwerk gesendete Datenpaket wird in Protokoll-Header (TCP, IP, Ethernet-Frames) eingepackt, die Bandbreite verbrauchen, aber keine Dateidaten übertragen. TLS/SSL-Verschlüsselung fügt weiteren Overhead hinzu. In typischen Szenarien macht dies 5–15% der gesamten Bandbreite aus. VPN-Verbindungen fügen 15–20% aufgrund zusätzlicher Verschlüsselungs- und Kapselungsschichten hinzu. Bei lokalen USB/Thunderbolt-Übertragungen ist der Overhead geringer (3–5%)."
        },
        "2": {
          "question": "Wie finde ich meine tatsächliche Internetgeschwindigkeit heraus?",
          "answer": "Führen Sie einen Geschwindigkeitstest bei speedtest.net oder fast.com durch, um Ihre aktuellen Download- und Upload-Geschwindigkeiten zu messen. Testen Sie mehrmals zu verschiedenen Stunden für Genauigkeit — Stoßzeiten (Abende) sind normalerweise langsamer. Für lokale Übertragungen überprüfen Sie Ihre Gerätespezifikationen: USB-Port-Version, Ethernet-Adapter-Geschwindigkeit (100 Mbps vs 1 Gbps vs 2,5 Gbps) und Speicherlaufwerk-Typ (HDD ~100 MB/s, SATA SSD ~550 MB/s, NVMe Gen 4 ~7.000 MB/s)."
        },
        "3": {
          "question": "Ist Wi-Fi langsamer als Ethernet für Dateiübertragungen?",
          "answer": "Fast immer, ja. Wi-Fi-Signale verschlechtern sich mit Entfernung, Wänden und Interferenz. Wi-Fi 6 ist mit 1,2 Gbps bewertet, erreicht aber typischerweise 300–600 Mbps. Wi-Fi 7 verspricht 5,8 Gbps, aber reale Geschwindigkeiten werden 1–3 Gbps betragen. Gigabit Ethernet liefert konstant 940+ Mbps. Für große Dateiübertragungen (Backups, Videoprojekte, Spiele-Downloads) bevorzugen Sie immer eine kabelgebundene Verbindung, wenn möglich."
        },
        "4": {
          "question": "Warum überträgt USB 3.0 langsamer als seine bewerteten 5 Gbps?",
          "answer": "USB 3.2 Gen 1 (früher USB 3.0) mit 5 Gbps ist die Busgeschwindigkeit, nicht die Übertragungsgeschwindigkeit. Reales USB 3.2 Gen 1 erreicht 300–400 MB/s (2,4–3,2 Gbps) mit einer SSD, aufgrund von Protokoll-Overhead und Controller-Beschränkungen. Wenn Ihr Laufwerk eine HDD (~100 MB/s) ist, wird das Laufwerk zum Engpass — es kann nicht schnell genug Daten liefern, um selbst USB 2.0 zu sättigen. Kombinieren Sie immer schnelle USB-Ports mit SSDs für maximalen Nutzen."
        },
        "5": {
          "question": "Wie lange dauert es, 1 TB in die Cloud hochzuladen?",
          "answer": "Es hängt vollständig von Ihrer Upload-Geschwindigkeit ab, die typischerweise viel langsamer als der Download ist. Bei 10 Mbps Upload (häufig bei Kabel): etwa 9,3 Tage. Bei 20 Mbps: etwa 4,6 Tage. Bei 100 Mbps Upload (Glasfaser): etwa 22 Stunden. Bei 1 Gbps symmetrischer Glasfaser: etwa 2,2 Stunden. Viele Cloud-Dienste drosseln auch einzelne Verbindungen. AWS S3 und Google Cloud unterstützen mehrteilige parallele Uploads, die den Durchsatz 2–4× verbessern können."
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
      }
    },
  },

  inputs: [
    {
      id: "fileSize",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      min: 0.001,
      max: 999999,
      unitType: "data",
      syncGroup: false,
      defaultUnit: "gb",
      allowedUnits: ["mb", "gb", "tb"],
    },
    {
      id: "connectionType",
      type: "select",
      defaultValue: "custom",
      options: [
        { value: "custom" },
        { value: "adsl" },
        { value: "4g" },
        { value: "cable" },
        { value: "5g" },
        { value: "5g_mmwave" },
        { value: "fiber" },
        { value: "fiber10g" },
        { value: "wifi5" },
        { value: "wifi6" },
        { value: "wifi6e" },
        { value: "wifi7" },
        { value: "ethernet" },
        { value: "ethernet10g" },
        { value: "usb2" },
        { value: "usb3" },
        { value: "usb32" },
        { value: "usb4" },
        { value: "usb4v2" },
        { value: "thunderbolt4" },
        { value: "thunderbolt5" },
        { value: "sata3" },
        { value: "nvme3" },
        { value: "nvme4" },
        { value: "nvme5" },
      ],
    },
    {
      id: "speed",
      type: "number",
      defaultValue: null,
      placeholder: "100",
      min: 0.001,
      max: 999999,
      unitType: "data_rate",
      syncGroup: false,
      defaultUnit: "mbps",
      allowedUnits: ["kbps", "mbps", "gbps"],
    },
    {
      id: "overheadPercent",
      type: "slider",
      defaultValue: 10,
      min: 0,
      max: 30,
      step: 1,
      suffix: "%",
    },
  ],

  inputGroups: [],

  results: [
    { id: "transferTime", type: "primary", format: "text" },
    { id: "totalSeconds", type: "secondary", format: "text" },
    { id: "rawSpeedMbps", type: "secondary", format: "text" },
    { id: "rawSpeedMBps", type: "secondary", format: "text" },
    { id: "effectiveSpeedMBps", type: "secondary", format: "text" },
    { id: "fileSizeFormatted", type: "secondary", format: "text" },
    { id: "dataTransferred", type: "secondary", format: "text" },
    { id: "overheadLoss", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "📖", itemCount: 6 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "interfaceChart",
    type: "bar",
    xKey: "interface",
    height: 350,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "logSeconds", color: "#3b82f6" },
    ],
  },

  detailedTable: {
    id: "interfaceComparison",
    buttonLabel: "Compare All Interfaces",
    buttonIcon: "📊",
    modalTitle: "Transfer Time by Interface — Your File Size",
    columns: [
      { id: "interface", label: "Interface", align: "left" },
      { id: "ratedSpeed", label: "Rated Speed", align: "center" },
      { id: "realWorldSpeed", label: "Real-World Speed", align: "center" },
      { id: "transferTime", label: "Transfer Time", align: "right", highlight: true },
    ],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📗" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "IEEE Standards Association",
      year: "2024",
      title: "IEEE 802.3 Ethernet Working Group",
      source: "IEEE",
      url: "https://www.ieee802.org/3/",
    },
    {
      authors: "USB Implementers Forum",
      year: "2024",
      title: "USB4 Version 2.0 Specification",
      source: "USB-IF",
      url: "https://www.usb.org/documents",
    },
    {
      authors: "Wi-Fi Alliance",
      year: "2024",
      title: "Wi-Fi 7 (802.11be) Certification Program",
      source: "Wi-Fi Alliance",
      url: "https://www.wi-fi.org/discover-wi-fi/wi-fi-certified-7",
    },
  ],

  hero: { showRating: true, showShare: true },
  sidebar: { showAds: true, showRelated: true },
  features: { save: true, pdf: true, csv: true, excel: true },
  relatedCalculators: ["bandwidth", "psu-calculator", "cidr"],
  ads: { sidebar: true, footer: true },
};

// ─────────────────────────────────────────────────────────────────────────────
// CONVERSION MAPS
// ─────────────────────────────────────────────────────────────────────────────

const SIZE_TO_BYTES: Record<string, number> = {
  kb: 1e3,
  mb: 1e6,
  gb: 1e9,
  tb: 1e12,
};

const SPEED_TO_BPS: Record<string, number> = {
  kbps: 1e3,
  mbps: 1e6,
  gbps: 1e9,
};

// ─────────────────────────────────────────────────────────────────────────────
// INTERFACE DATABASE — rated speed (Mbps) + real-world efficiency factor
// ─────────────────────────────────────────────────────────────────────────────

interface InterfaceSpec {
  mbps: number;
  label: string;
  efficiency: number; // Real-world fraction of rated speed (0.0–1.0)
}

const INTERFACES: Record<string, InterfaceSpec> = {
  adsl:           { mbps: 8,       label: "ADSL",                efficiency: 0.85 },
  "4g":           { mbps: 50,      label: "4G / LTE",            efficiency: 0.60 },
  cable:          { mbps: 200,     label: "Cable / DOCSIS 3.1",  efficiency: 0.75 },
  "5g":           { mbps: 1000,    label: "5G Sub-6",            efficiency: 0.50 },
  "5g_mmwave":    { mbps: 4000,    label: "5G mmWave",           efficiency: 0.35 },
  fiber:          { mbps: 1000,    label: "Fiber FTTH",          efficiency: 0.93 },
  fiber10g:       { mbps: 10000,   label: "Fiber 10G GPON",      efficiency: 0.90 },
  wifi5:          { mbps: 867,     label: "Wi-Fi 5 (ac)",        efficiency: 0.45 },
  wifi6:          { mbps: 1200,    label: "Wi-Fi 6 (ax)",        efficiency: 0.50 },
  wifi6e:         { mbps: 2400,    label: "Wi-Fi 6E (6 GHz)",    efficiency: 0.50 },
  wifi7:          { mbps: 5800,    label: "Wi-Fi 7 (be)",        efficiency: 0.45 },
  ethernet:       { mbps: 1000,    label: "Gigabit Ethernet",    efficiency: 0.94 },
  ethernet10g:    { mbps: 10000,   label: "10G Ethernet",        efficiency: 0.93 },
  usb2:           { mbps: 480,     label: "USB 2.0",             efficiency: 0.60 },
  usb3:           { mbps: 5000,    label: "USB 3.2 Gen 1",       efficiency: 0.60 },
  usb32:          { mbps: 20000,   label: "USB 3.2 Gen 2×2",     efficiency: 0.55 },
  usb4:           { mbps: 40000,   label: "USB4 v1",             efficiency: 0.50 },
  usb4v2:         { mbps: 80000,   label: "USB4 v2",             efficiency: 0.45 },
  thunderbolt4:   { mbps: 40000,   label: "Thunderbolt 4",       efficiency: 0.55 },
  thunderbolt5:   { mbps: 80000,   label: "Thunderbolt 5",       efficiency: 0.50 },
  sata3:          { mbps: 6000,    label: "SATA III",            efficiency: 0.88 },
  nvme3:          { mbps: 32000,   label: "NVMe Gen 3",          efficiency: 0.85 },
  nvme4:          { mbps: 64000,   label: "NVMe Gen 4",          efficiency: 0.80 },
  nvme5:          { mbps: 128000,  label: "NVMe Gen 5",          efficiency: 0.70 },
};

// Subset for chart (too many = unreadable)
const CHART_INTERFACES = [
  "adsl", "4g", "cable", "5g", "fiber", "wifi6", "wifi7",
  "ethernet", "ethernet10g", "usb3", "usb4", "thunderbolt5", "nvme4",
];

// ─────────────────────────────────────────────────────────────────────────────
// FORMATTING HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (val < 0.001) return val.toExponential(2);
  if (val < 1000) return val.toFixed(2).replace(/\.?0+$/, "");
  return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function smartBytes(bytes: number): string {
  if (bytes >= 1e12) return `${fmtNum(bytes / 1e12)} TB`;
  if (bytes >= 1e9) return `${fmtNum(bytes / 1e9)} GB`;
  if (bytes >= 1e6) return `${fmtNum(bytes / 1e6)} MB`;
  if (bytes >= 1e3) return `${fmtNum(bytes / 1e3)} KB`;
  return `${fmtNum(bytes)} B`;
}

function smartBits(bitsPerSec: number): string {
  if (bitsPerSec >= 1e12) return `${fmtNum(bitsPerSec / 1e12)} Tbps`;
  if (bitsPerSec >= 1e9) return `${fmtNum(bitsPerSec / 1e9)} Gbps`;
  if (bitsPerSec >= 1e6) return `${fmtNum(bitsPerSec / 1e6)} Mbps`;
  if (bitsPerSec >= 1e3) return `${fmtNum(bitsPerSec / 1e3)} Kbps`;
  return `${fmtNum(bitsPerSec)} bps`;
}

function formatDuration(totalSeconds: number, v: Record<string, string>): string {
  if (totalSeconds < 1) return v["lessThanASecond"] || "Less than a second";

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} ${days === 1 ? (v["day"] || "day") : (v["days"] || "days")}`);
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? (v["hour"] || "hour") : (v["hours"] || "hours")}`);
  if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? (v["minute"] || "minute") : (v["minutes"] || "minutes")}`);
  if (seconds > 0 && days === 0) parts.push(`${seconds} ${seconds === 1 ? (v["second"] || "second") : (v["seconds"] || "seconds")}`);

  return parts.join(", ");
}

function formatTimeCompact(totalSeconds: number): string {
  if (totalSeconds < 0.01) return "instant";
  if (totalSeconds < 1) return `${Math.round(totalSeconds * 1000)} ms`;
  if (totalSeconds < 60) return `${Math.ceil(totalSeconds)} sec`;
  if (totalSeconds < 3600) {
    const m = Math.floor(totalSeconds / 60);
    const s = Math.floor(totalSeconds % 60);
    return s > 0 ? `${m} min ${s} sec` : `${m} min`;
  }
  if (totalSeconds < 86400) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    return m > 0 ? `${h} hr ${m} min` : `${h} hr`;
  }
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  return h > 0 ? `${d} d ${h} hr` : `${d} d`;
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATE
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
  const overheadPercent = (values.overheadPercent as number) ?? 10;

  // Read units from unitType dropdowns
  const fileSizeUnit = fieldUnits?.fileSize || "gb";
  const speedUnit = fieldUnits?.speed || "mbps";

  if (fileSize === null || speed === null || fileSize <= 0 || speed <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Convert to base units ───────────────────────────────────────────
  const fileSizeBytes = fileSize * (SIZE_TO_BYTES[fileSizeUnit] || 1e9);
  const fileSizeBits = fileSizeBytes * 8;
  const rawBps = speed * (SPEED_TO_BPS[speedUnit] || 1e6);

  // ── Apply overhead ──────────────────────────────────────────────────
  const efficiencyFactor = 1 - overheadPercent / 100;
  const effectiveBps = rawBps * efficiencyFactor;

  // ── Derived speeds ──────────────────────────────────────────────────
  const rawMbps = rawBps / 1e6;
  const rawMBps = rawBps / 8e6;
  const effectiveMBps = effectiveBps / 8e6;
  const overheadLossMBps = rawMBps - effectiveMBps;

  // ── Transfer time ───────────────────────────────────────────────────
  const totalSeconds = fileSizeBits / effectiveBps;
  const transferTimeStr = formatDuration(totalSeconds, v);

  // ── Interface comparison table ──────────────────────────────────────
  const allInterfaceKeys = Object.keys(INTERFACES);
  const tableData = allInterfaceKeys.map((key) => {
    const iface = INTERFACES[key];
    const ratedBps = iface.mbps * 1e6;
    const realWorldBps = ratedBps * iface.efficiency;
    const ifaceSeconds = fileSizeBits / realWorldBps;
    return {
      interface: iface.label,
      ratedSpeed: smartBits(ratedBps),
      realWorldSpeed: `${fmtNum(realWorldBps / 8e6)} MB/s`,
      transferTime: formatTimeCompact(ifaceSeconds),
    };
  });

  // ── Chart data (subset for readability) ─────────────────────────────
  const chartData = CHART_INTERFACES.map((key) => {
    const iface = INTERFACES[key];
    if (!iface) return null;
    const realWorldBps = iface.mbps * 1e6 * iface.efficiency;
    const ifaceSeconds = fileSizeBits / realWorldBps;
    const logSec = ifaceSeconds > 0 ? Math.log10(Math.max(ifaceSeconds, 0.001)) : 0;
    return {
      interface: iface.label.split(" (")[0].split(" /")[0],
      logSeconds: Math.round(logSec * 100) / 100,
    };
  }).filter(Boolean);

  // ── Summary ─────────────────────────────────────────────────────────
  const summary = (f.summary || "Transferring {fileSize} at {speed} ({overhead}% overhead) takes approximately {transferTime}. Effective throughput: {effectiveSpeed}.")
    .replace("{fileSize}", `${fmtNum(fileSize)} ${fileSizeUnit}`)
    .replace("{speed}", `${fmtNum(speed)} ${speedUnit}`)
    .replace("{overhead}", `${overheadPercent}`)
    .replace("{transferTime}", transferTimeStr)
    .replace("{effectiveSpeed}", `${fmtNum(effectiveMBps)} MB/s`);

  return {
    values: {
      transferTime: totalSeconds,
      totalSeconds,
      rawSpeedMbps: rawMbps,
      rawSpeedMBps: rawMBps,
      effectiveSpeedMBps: effectiveMBps,
      fileSizeFormatted: fileSizeBytes,
      dataTransferred: fileSizeBits,
      overheadLoss: overheadLossMBps,
    },
    formatted: {
      transferTime: transferTimeStr,
      totalSeconds: `${fmtNum(Math.round(totalSeconds * 100) / 100)} sec`,
      rawSpeedMbps: `${fmtNum(rawMbps)} Mbps`,
      rawSpeedMBps: `${fmtNum(rawMBps)} MB/s`,
      effectiveSpeedMBps: `${fmtNum(effectiveMBps)} MB/s`,
      fileSizeFormatted: smartBytes(fileSizeBytes),
      dataTransferred: `${fmtNum(fileSizeBits)} bits`,
      overheadLoss: `−${fmtNum(overheadLossMBps)} MB/s (${overheadPercent}%)`,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default transferTimeConfig;
