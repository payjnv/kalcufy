import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const raidConfig: CalculatorConfigV4 = {
  id: "raid",
  version: "4.0",
  category: "technology",
  icon: "💾",

  // ===========================================================================
  // PRESETS — 5 common configurations
  // ===========================================================================
  presets: [
    {
      id: "homeNAS",
      icon: "🏠",
      values: {
        raidLevel: "5",
        numDrives: 4,
        driveCapacity: 4,
        driveType: "HDD",
        driveCost: 100,
      },
    },
    {
      id: "serverBasic",
      icon: "🖥️",
      values: {
        raidLevel: "10",
        numDrives: 6,
        driveCapacity: 2,
        driveType: "SSD",
        driveCost: 150,
      },
    },
    {
      id: "serverAdvanced",
      icon: "⚡",
      values: {
        raidLevel: "6",
        numDrives: 8,
        driveCapacity: 8,
        driveType: "SSD",
        driveCost: 300,
      },
    },
    {
      id: "performance",
      icon: "🚀",
      values: {
        raidLevel: "50",
        numDrives: 8,
        driveCapacity: 1,
        driveType: "NVMe",
        driveCost: 200,
      },
    },
    {
      id: "enterprise",
      icon: "🏢",
      values: {
        raidLevel: "60",
        numDrives: 12,
        driveCapacity: 16,
        driveType: "SSD",
        driveCost: 600,
      },
    },
  ],

  // ===========================================================================
  // TRANSLATIONS (4 idiomas)
  // ===========================================================================
  t: {
    en: {
      name: "RAID Calculator",
      slug: "raid",
      subtitle: "Calculate RAID capacity, performance, rebuild time, and URE risk for all RAID levels",
      breadcrumb: "RAID Calc",

      seo: {
        title: "RAID Calculator - Capacity, IOPS, Rebuild Time & URE Risk",
        description: "Calculate RAID array usable capacity, read/write IOPS, rebuild time, and URE risk. Supports RAID 0/1/1E/5/5E/6/10/50/60 with HDD/SSD/NVMe presets. Free tool with visual charts.",
        shortDescription: "Calculate RAID capacity, performance, rebuild time",
        keywords: [
          "raid calculator",
          "raid capacity calculator",
          "raid 5 calculator",
          "raid 6 calculator",
          "raid 10 calculator",
          "ure risk calculator",
          "raid rebuild time",
          "raid iops calculator",
        ],
      },

      calculator: { configuration: "RAID Configuration" },
      ui: {
        configuration: "RAID Configuration",
        performance: "Performance Settings",
        advanced: "Advanced Options",
        calculate: "Calculate RAID",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        raidLevel: {
          label: "RAID Level",
          helpText: "Select RAID type (striping, mirroring, parity)",
          options: {
            "0": "RAID 0 - Striping (no redundancy)",
            "1": "RAID 1 - Mirroring",
            "1E": "RAID 1E - Striped Mirrors",
            "5": "RAID 5 - Single Parity",
            "5E": "RAID 5E - with Hot Spare",
            "5EE": "RAID 5EE - Distributed Hot Spare",
            "6": "RAID 6 - Double Parity",
            "10": "RAID 10 - Mirrored Stripe (1+0)",
            "50": "RAID 50 - Striped RAID 5 (5+0)",
            "60": "RAID 60 - Striped RAID 6 (6+0)",
          },
        },
        numDrives: {
          label: "Number of Drives",
          helpText: "Total drives in the array",
        },
        driveCapacity: {
          label: "Drive Capacity",
          helpText: "Capacity per drive",
        },
        driveType: {
          label: "Drive Type",
          helpText: "HDD, SSD, or NVMe (affects IOPS/throughput)",
          options: {
            HDD: "HDD (7200 RPM)",
            SSD: "SATA SSD",
            NVMe: "NVMe SSD",
          },
        },
        driveCost: {
          label: "Cost per Drive",
          helpText: "Price of each drive in USD",
        },
        drivesPerGroup: {
          label: "Drives per RAID Group",
          helpText: "For RAID 50/60 only - drives in each sub-array",
        },
        rebuildSpeed: {
          label: "Rebuild Speed",
          helpText: "MB/s rebuild rate (typical: 50-150 MB/s)",
        },
        ureRate: {
          label: "URE Rate (1 in N bits)",
          helpText: "Unrecoverable Read Error rate (HDD: 1e14, Enterprise: 1e15)",
        },
      },

      results: {
        usableCapacity: { label: "Usable Capacity" },
        overhead: { label: "Overhead (Parity/Mirror)" },
        efficiency: { label: "Storage Efficiency" },
        faultTolerance: { label: "Fault Tolerance" },
        minDrives: { label: "Minimum Drives" },
        totalCost: { label: "Total Cost" },
        costPerTB: { label: "Cost per Usable TB" },
        readIOPS: { label: "Read IOPS" },
        writeIOPS: { label: "Write IOPS" },
        readThroughput: { label: "Read Throughput" },
        writeThroughput: { label: "Write Throughput" },
        writePenalty: { label: "Write Penalty" },
        rebuildTime: { label: "Rebuild Time" },
        ureRisk: { label: "URE Risk during Rebuild" },
        recommendation: { label: "Recommendation" },
      },

      presets: {
        homeNAS: { label: "Home NAS", description: "4×4TB RAID 5 (HDD)" },
        serverBasic: { label: "Basic Server", description: "6×2TB RAID 10 (SSD)" },
        serverAdvanced: { label: "Advanced Server", description: "8×8TB RAID 6 (SSD)" },
        performance: { label: "High Performance", description: "8×1TB RAID 50 (NVMe)" },
        enterprise: { label: "Enterprise", description: "12×16TB RAID 60 (SSD)" },
      },

      values: {
        TB: "TB",
        GB: "GB",
        drives: "drives",
        drive: "drive",
        hours: "hours",
        minutes: "minutes",
        low: "Low",
        moderate: "Moderate",
        high: "High",
        veryHigh: "Very High",
        excellent: "Excellent",
        good: "Good",
        fair: "Fair",
        poor: "Poor",
        none: "None",
      },

      formats: {
        summary: "RAID {raidLevel} with {numDrives} × {driveCapacity} TB drives provides {usableCapacity} of usable capacity with {faultTolerance} fault tolerance.",
      },

      infoCards: {
        capacity: {
          title: "Capacity Breakdown",
          items: [
            { label: "Total Raw Capacity", valueKey: "totalCapacity" },
            { label: "Usable Capacity", valueKey: "usableCapacity" },
            { label: "Overhead (Parity/Mirror)", valueKey: "overhead" },
            { label: "Storage Efficiency", valueKey: "efficiency" },
          ],
        },
        performance: {
          title: "Performance Metrics",
          items: [
            { label: "Read IOPS", valueKey: "readIOPS" },
            { label: "Write IOPS", valueKey: "writeIOPS" },
            { label: "Read Throughput", valueKey: "readThroughput" },
            { label: "Write Throughput", valueKey: "writeThroughput" },
          ],
        },
        tips: {
          title: "Key Considerations",
          items: [
            "RAID is NOT a backup - always maintain separate backups",
            "Larger drives increase rebuild time and URE risk",
            "RAID 6/60 recommended for arrays > 8 drives",
            "NVMe offers 10-20x IOPS over HDD but costs more",
          ],
        },
      },

      chart: {
        title: "Capacity Distribution",
        xLabel: "Type",
        yLabel: "Capacity (TB)",
        series: {
          usable: "Usable",
          parity: "Parity/Mirror",
        },
      },

      detailedTable: {
        comparison: {
          button: "Compare RAID Levels",
          title: "RAID Levels Comparison",
          columns: {
            level: "RAID Level",
            minDrives: "Min Drives",
            faultTolerance: "Fault Tolerance",
            efficiency: "Efficiency",
            readSpeed: "Read Speed",
            writeSpeed: "Write Speed",
            useCase: "Best For",
          },
        },
      },

      education: {
        whatIsRAID: {
          title: "What is RAID?",
          content: "RAID (Redundant Array of Independent Disks) combines multiple physical drives into a single logical unit to improve performance, redundancy, or both. Different RAID levels offer varying trade-offs between capacity, speed, and fault tolerance. RAID 0 maximizes performance by striping data across drives but offers no redundancy. RAID 1 mirrors data for full redundancy at 50% capacity cost. RAID 5/6 use parity for efficient redundancy, while RAID 10/50/60 combine striping with mirroring or parity for enterprise-grade performance and protection.",
        },
        raidLevelsExplained: {
          title: "Understanding RAID Levels",
          content: "Each RAID level serves different needs. RAID 0 stripes data for maximum speed (2× IOPS with 2 drives) but one drive failure loses everything. RAID 1 mirrors data for safety but uses only 50% capacity. RAID 5 adds parity (minimum 3 drives) allowing 1 drive failure with ~67-93% efficiency. RAID 6 uses double parity (minimum 4 drives) surviving 2 failures. RAID 10 combines mirroring and striping for excellent performance with 50% capacity. RAID 50/60 stripe multiple RAID 5/6 groups for enterprise workloads requiring both speed and resilience.",
        },
        performanceFactors: {
          title: "Performance Factors",
          items: [
            { text: "Write penalty: RAID 5 = 4× I/O, RAID 6 = 6× I/O, RAID 10 = 2× I/O", type: "info" },
            { text: "Read performance scales linearly with drives (except parity overhead)", type: "info" },
            { text: "HDD: ~150 IOPS, SATA SSD: ~50k IOPS, NVMe: ~500k IOPS per drive", type: "info" },
            { text: "Throughput: HDD ~200 MB/s, SSD ~550 MB/s, NVMe ~3500 MB/s", type: "info" },
            { text: "Write-heavy workloads favor RAID 10 over RAID 5/6 due to lower penalty", type: "warning" },
            { text: "Rebuild time increases exponentially with capacity - monitor closely", type: "warning" },
          ],
        },
        choosingRAID: {
          title: "Choosing the Right RAID Level",
          items: [
            { text: "RAID 0: Maximum performance, no redundancy (temp storage, caching)", type: "info" },
            { text: "RAID 1: Simple mirroring, 50% capacity (boot drives, small critical data)", type: "info" },
            { text: "RAID 5: Balanced efficiency, 1 drive failure (SMB file servers, moderate I/O)", type: "info" },
            { text: "RAID 6: Double parity, 2 drive failures (larger arrays > 8 drives)", type: "info" },
            { text: "RAID 10: High performance + redundancy (databases, VMs, high I/O)", type: "info" },
            { text: "RAID 50/60: Enterprise workloads requiring scale + performance + resilience", type: "info" },
          ],
        },
        examples: {
          title: "Real-World Examples",
          description: "Common RAID configurations for different scenarios",
          examples: [
            {
              title: "Home Media Server",
              steps: [
                "4 × 4TB HDD in RAID 5",
                "Usable: 12 TB (3×4)",
                "Cost: ~$400 total",
                "Can lose 1 drive without data loss",
              ],
              result: "Affordable storage with basic protection",
            },
            {
              title: "Small Business File Server",
              steps: [
                "6 × 2TB SSD in RAID 10",
                "Usable: 6 TB (50% of 12 TB)",
                "Read/Write IOPS: ~300k/150k",
                "Can lose 1 drive per mirror set",
              ],
              result: "Fast performance with good redundancy",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is the difference between RAID 5 and RAID 6?",
          answer: "RAID 5 uses single parity and can survive 1 drive failure, requiring minimum 3 drives. RAID 6 uses double parity and can survive 2 drive failures, requiring minimum 4 drives. RAID 6 is safer for larger arrays (>8 drives) due to lower URE risk during rebuild, but has slightly lower write performance due to calculating two parity blocks instead of one.",
        },
        {
          question: "Why is RAID 10 faster than RAID 5/6?",
          answer: "RAID 10 has a write penalty of only 2× (one write to each mirror), while RAID 5 has 4× penalty (read data, read parity, write data, write parity) and RAID 6 has 6× penalty (double parity). For read operations, both scale linearly, but RAID 10's lower write penalty makes it significantly faster for write-heavy workloads like databases and virtual machines.",
        },
        {
          question: "What is URE risk and why does it matter?",
          answer: "URE (Unrecoverable Read Error) is when a drive cannot read a sector during rebuild. With large modern drives (>6TB), the probability of hitting a URE while rebuilding from a failed drive is significant. Consumer HDDs have URE rates of 1 in 10^14 bits (~12.5 TB), meaning a single URE can cause complete data loss in RAID 5. RAID 6's double parity protects against this - even if a URE occurs during rebuild, the second parity can recover the data.",
        },
        {
          question: "How long does RAID rebuild take?",
          answer: "Rebuild time depends on drive capacity, array size, and rebuild speed. A 4TB drive rebuilding at 100 MB/s takes ~11 hours. An 18TB drive takes ~50 hours. During rebuild, array performance degrades significantly and URE risk is highest. RAID 6/60 is recommended for large arrays to reduce URE risk. Enterprise drives with lower URE rates (1 in 10^15) also help.",
        },
        {
          question: "Can I expand a RAID array later?",
          answer: "It depends on your RAID controller and level. Some hardware controllers support online capacity expansion (adding drives) and RAID migration (changing levels). However, this is risky and slow - often taking days for large arrays. The safest approach is to plan array size upfront, backup data, destroy the old array, create a new larger one, and restore. Software RAID (mdadm, ZFS, unRAID) often has better expansion support than cheap hardware RAID.",
        },
        {
          question: "Is RAID a replacement for backups?",
          answer: "NO. RAID protects against drive failure only - it does NOT protect against: file deletion, corruption, malware/ransomware, controller failure, fire/theft, or human error. The 3-2-1 backup rule applies: 3 copies of data (production + 2 backups), 2 different media types (e.g., RAID + external), 1 offsite copy (cloud or remote location). RAID is for uptime, not backup.",
        },
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
        calculate: "Calculate RAID",
        reset: "Reset",
        pdf: "Export PDF",
        csv: "Export CSV",
        excel: "Export Excel",
        save: "Save",
        saved: "Saved",
        saving: "Saving...",
      },

      share: { calculatedWith: "Calculated with Kalcufy.com RAID Calculator" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora RAID",
      "slug": "calculadora-raid",
      "subtitle": "Calcule la capacidad RAID, rendimiento, tiempo de reconstrucción y riesgo URE para todos los niveles RAID",
      "breadcrumb": "Calc RAID",
      "seo": {
        "title": "Calculadora RAID - Capacidad, IOPS, Tiempo de Reconstrucción y Riesgo URE",
        "description": "Calcule la capacidad utilizable del arreglo RAID, IOPS de lectura/escritura, tiempo de reconstrucción y riesgo URE. Soporta RAID 0/1/1E/5/5E/6/10/50/60 con presets HDD/SSD/NVMe. Herramienta gratuita con gráficos visuales.",
        "shortDescription": "Calcule capacidad RAID, rendimiento, tiempo de reconstrucción",
        "keywords": [
          "calculadora raid",
          "calculadora capacidad raid",
          "calculadora raid 5",
          "calculadora raid 6",
          "calculadora raid 10",
          "calculadora riesgo ure",
          "tiempo reconstruccion raid",
          "calculadora iops raid"
        ]
      },
      "inputs": {
        "raidLevel": {
          "label": "Nivel RAID",
          "helpText": "Seleccione el tipo RAID (striping, mirroring, paridad)",
          "options": {
            "0": "RAID 0 - Striping (sin redundancia)",
            "1": "RAID 1 - Mirroring",
            "5": "RAID 5 - Paridad Simple",
            "6": "RAID 6 - Paridad Doble",
            "10": "RAID 10 - Stripe con Mirror (1+0)",
            "50": "RAID 50 - RAID 5 con Striping (5+0)",
            "60": "RAID 60 - RAID 6 con Striping (6+0)",
            "1E": "RAID 1E - Mirrors con Striping",
            "5E": "RAID 5E - con Hot Spare",
            "5EE": "RAID 5EE - Hot Spare Distribuido"
          }
        },
        "numDrives": {
          "label": "Número de Discos",
          "helpText": "Total de discos en el arreglo"
        },
        "driveCapacity": {
          "label": "Capacidad del Disco",
          "helpText": "Capacidad por disco"
        },
        "driveType": {
          "label": "Tipo de Disco",
          "helpText": "HDD, SSD o NVMe (afecta IOPS/throughput)",
          "options": {
            "HDD": "HDD (7200 RPM)",
            "SSD": "SSD SATA",
            "NVMe": "SSD NVMe"
          }
        },
        "driveCost": {
          "label": "Costo por Disco",
          "helpText": "Precio de cada disco en USD"
        },
        "drivesPerGroup": {
          "label": "Discos por Grupo RAID",
          "helpText": "Solo para RAID 50/60 - discos en cada sub-arreglo"
        },
        "rebuildSpeed": {
          "label": "Velocidad de Reconstrucción",
          "helpText": "Tasa de reconstrucción en MB/s (típico: 50-150 MB/s)"
        },
        "ureRate": {
          "label": "Tasa URE (1 en N bits)",
          "helpText": "Tasa de Error de Lectura No Recuperable (HDD: 1e14, Enterprise: 1e15)"
        }
      },
      "results": {
        "usableCapacity": {
          "label": "Capacidad Utilizable"
        },
        "overhead": {
          "label": "Overhead (Paridad/Mirror)"
        },
        "efficiency": {
          "label": "Eficiencia de Almacenamiento"
        },
        "faultTolerance": {
          "label": "Tolerancia a Fallos"
        },
        "minDrives": {
          "label": "Discos Mínimos"
        },
        "totalCost": {
          "label": "Costo Total"
        },
        "costPerTB": {
          "label": "Costo por TB Utilizable"
        },
        "readIOPS": {
          "label": "IOPS de Lectura"
        },
        "writeIOPS": {
          "label": "IOPS de Escritura"
        },
        "readThroughput": {
          "label": "Throughput de Lectura"
        },
        "writeThroughput": {
          "label": "Throughput de Escritura"
        },
        "writePenalty": {
          "label": "Penalización de Escritura"
        },
        "rebuildTime": {
          "label": "Tiempo de Reconstrucción"
        },
        "ureRisk": {
          "label": "Riesgo URE durante Reconstrucción"
        },
        "recommendation": {
          "label": "Recomendación"
        }
      },
      "presets": {
        "homeNAS": {
          "label": "NAS Doméstico",
          "description": "4×4TB RAID 5 (HDD)"
        },
        "serverBasic": {
          "label": "Servidor Básico",
          "description": "6×2TB RAID 10 (SSD)"
        },
        "serverAdvanced": {
          "label": "Servidor Avanzado",
          "description": "8×8TB RAID 6 (SSD)"
        },
        "performance": {
          "label": "Alto Rendimiento",
          "description": "8×1TB RAID 50 (NVMe)"
        },
        "enterprise": {
          "label": "Empresarial",
          "description": "12×16TB RAID 60 (SSD)"
        }
      },
      "values": {
        "TB": "TB",
        "GB": "GB",
        "drives": "discos",
        "drive": "disco",
        "hours": "horas",
        "minutes": "minutos",
        "low": "Bajo",
        "moderate": "Moderado",
        "high": "Alto",
        "veryHigh": "Muy Alto",
        "excellent": "Excelente",
        "good": "Bueno",
        "fair": "Regular",
        "poor": "Pobre",
        "none": "Ninguno"
      },
      "formats": {
        "summary": "RAID {raidLevel} con {numDrives} × {driveCapacity} TB discos proporciona {usableCapacity} de capacidad utilizable con {faultTolerance} tolerancia a fallos."
      },
      "infoCards": {
        "capacity": {
          "title": "Desglose de Capacidad",
          "items": [
            {
              "label": "Capacidad Total Bruta",
              "valueKey": "totalCapacity"
            },
            {
              "label": "Capacidad Utilizable",
              "valueKey": "usableCapacity"
            },
            {
              "label": "Overhead (Paridad/Mirror)",
              "valueKey": "overhead"
            },
            {
              "label": "Eficiencia de Almacenamiento",
              "valueKey": "efficiency"
            }
          ]
        },
        "performance": {
          "title": "Métricas de Rendimiento",
          "items": [
            {
              "label": "IOPS de Lectura",
              "valueKey": "readIOPS"
            },
            {
              "label": "IOPS de Escritura",
              "valueKey": "writeIOPS"
            },
            {
              "label": "Throughput de Lectura",
              "valueKey": "readThroughput"
            },
            {
              "label": "Throughput de Escritura",
              "valueKey": "writeThroughput"
            }
          ]
        },
        "tips": {
          "title": "Consideraciones Clave",
          "items": [
            "RAID NO es respaldo - siempre mantenga respaldos separados",
            "Discos más grandes aumentan tiempo de reconstrucción y riesgo URE",
            "RAID 6/60 recomendado para arreglos > 8 discos",
            "NVMe ofrece 10-20x IOPS sobre HDD pero cuesta más"
          ]
        }
      },
      "chart": {
        "title": "Distribución de Capacidad",
        "xLabel": "Tipo",
        "yLabel": "Capacidad (TB)",
        "series": {
          "usable": "Utilizable",
          "parity": "Paridad/Mirror"
        }
      },
      "detailedTable": {
        "comparison": {
          "button": "Comparar Niveles RAID",
          "title": "Comparación de Niveles RAID",
          "columns": {
            "level": "Nivel RAID",
            "minDrives": "Discos Mín",
            "faultTolerance": "Tolerancia a Fallos",
            "efficiency": "Eficiencia",
            "readSpeed": "Velocidad Lectura",
            "writeSpeed": "Velocidad Escritura",
            "useCase": "Mejor Para"
          }
        }
      },
      "education": {
        "whatIsRAID": {
          "title": "¿Qué es RAID?",
          "content": "RAID (Arreglo Redundante de Discos Independientes) combina múltiples discos físicos en una sola unidad lógica para mejorar rendimiento, redundancia o ambos. Diferentes niveles RAID ofrecen varios compromisos entre capacidad, velocidad y tolerancia a fallos. RAID 0 maximiza rendimiento distribuyendo datos entre discos pero no ofrece redundancia. RAID 1 refleja datos para redundancia completa al 50% del costo de capacidad. RAID 5/6 usan paridad para redundancia eficiente, mientras RAID 10/50/60 combinan striping con mirroring o paridad para rendimiento y protección empresarial."
        },
        "raidLevelsExplained": {
          "title": "Entendiendo los Niveles RAID",
          "content": "Cada nivel RAID sirve diferentes necesidades. RAID 0 distribuye datos para velocidad máxima (2× IOPS con 2 discos) pero una falla de disco pierde todo. RAID 1 refleja datos para seguridad pero usa solo 50% capacidad. RAID 5 agrega paridad (mínimo 3 discos) permitiendo 1 falla de disco con ~67-93% eficiencia. RAID 6 usa paridad doble (mínimo 4 discos) sobreviviendo 2 fallas. RAID 10 combina mirroring y striping para excelente rendimiento con 50% capacidad. RAID 50/60 distribuyen múltiples grupos RAID 5/6 para cargas empresariales que requieren velocidad y resistencia."
        },
        "performanceFactors": {
          "title": "Factores de Rendimiento",
          "items": [
            {
              "text": "Penalización de escritura: RAID 5 = 4× I/O, RAID 6 = 6× I/O, RAID 10 = 2× I/O",
              "type": "info"
            },
            {
              "text": "Rendimiento de lectura escala linealmente con discos (excepto overhead paridad)",
              "type": "info"
            },
            {
              "text": "HDD: ~150 IOPS, SSD SATA: ~50k IOPS, NVMe: ~500k IOPS por disco",
              "type": "info"
            },
            {
              "text": "Throughput: HDD ~200 MB/s, SSD ~550 MB/s, NVMe ~3500 MB/s",
              "type": "info"
            },
            {
              "text": "Cargas pesadas de escritura favorecen RAID 10 sobre RAID 5/6 por menor penalización",
              "type": "warning"
            },
            {
              "text": "Tiempo de reconstrucción aumenta exponencialmente con capacidad - monitoree de cerca",
              "type": "warning"
            }
          ]
        },
        "choosingRAID": {
          "title": "Eligiendo el Nivel RAID Correcto",
          "items": [
            {
              "text": "RAID 0: Rendimiento máximo, sin redundancia (almacenamiento temporal, caché)",
              "type": "info"
            },
            {
              "text": "RAID 1: Mirroring simple, 50% capacidad (discos de arranque, datos críticos pequeños)",
              "type": "info"
            },
            {
              "text": "RAID 5: Eficiencia equilibrada, 1 falla de disco (servidores de archivos PYME, I/O moderado)",
              "type": "info"
            },
            {
              "text": "RAID 6: Paridad doble, 2 fallas de disco (arreglos grandes > 8 discos)",
              "type": "info"
            },
            {
              "text": "RAID 10: Alto rendimiento + redundancia (bases de datos, VMs, alto I/O)",
              "type": "info"
            },
            {
              "text": "RAID 50/60: Cargas empresariales que requieren escala + rendimiento + resistencia",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos del Mundo Real",
          "description": "Configuraciones RAID comunes para diferentes escenarios",
          "examples": [
            {
              "title": "Servidor de Medios Doméstico",
              "steps": [
                "4 × 4TB HDD en RAID 5",
                "Utilizable: 12 TB (3×4)",
                "Costo: ~$400 total",
                "Puede perder 1 disco sin pérdida de datos"
              ],
              "result": "Almacenamiento asequible con protección básica"
            },
            {
              "title": "Servidor de Archivos Pequeña Empresa",
              "steps": [
                "6 × 2TB SSD en RAID 10",
                "Utilizable: 6 TB (50% de 12 TB)",
                "IOPS Lectura/Escritura: ~300k/150k",
                "Puede perder 1 disco por conjunto mirror"
              ],
              "result": "Rendimiento rápido con buena redundancia"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es la diferencia entre RAID 5 y RAID 6?",
          "answer": "RAID 5 usa paridad simple y puede sobrevivir 1 falla de disco, requiriendo mínimo 3 discos. RAID 6 usa paridad doble y puede sobrevivir 2 fallas de disco, requiriendo mínimo 4 discos. RAID 6 es más seguro para arreglos grandes (>8 discos) debido al menor riesgo URE durante reconstrucción, pero tiene rendimiento de escritura ligeramente menor por calcular dos bloques de paridad en lugar de uno."
        },
        {
          "question": "¿Por qué RAID 10 es más rápido que RAID 5/6?",
          "answer": "RAID 10 tiene una penalización de escritura de solo 2× (una escritura a cada mirror), mientras RAID 5 tiene penalización 4× (leer datos, leer paridad, escribir datos, escribir paridad) y RAID 6 tiene penalización 6× (paridad doble). Para operaciones de lectura, ambos escalan linealmente, pero la menor penalización de escritura de RAID 10 lo hace significativamente más rápido para cargas pesadas de escritura como bases de datos y máquinas virtuales."
        },
        {
          "question": "¿Qué es el riesgo URE y por qué importa?",
          "answer": "URE (Error de Lectura No Recuperable) es cuando un disco no puede leer un sector durante reconstrucción. Con discos modernos grandes (>6TB), la probabilidad de encontrar un URE al reconstruir desde un disco fallado es significativa. Los HDD de consumo tienen tasas URE de 1 en 10^14 bits (~12.5 TB), lo que significa que un solo URE puede causar pérdida completa de datos en RAID 5. La paridad doble de RAID 6 protege contra esto - incluso si ocurre un URE durante reconstrucción, la segunda paridad puede recuperar los datos."
        },
        {
          "question": "¿Cuánto tiempo toma la reconstrucción RAID?",
          "answer": "El tiempo de reconstrucción depende de la capacidad del disco, tamaño del arreglo y velocidad de reconstrucción. Un disco de 4TB reconstruyendo a 100 MB/s toma ~11 horas. Un disco de 18TB toma ~50 horas. Durante reconstrucción, el rendimiento del arreglo se degrada significativamente y el riesgo URE es más alto. Se recomienda RAID 6/60 para arreglos grandes para reducir riesgo URE. Los discos empresariales con tasas URE menores (1 en 10^15) también ayudan."
        },
        {
          "question": "¿Puedo expandir un arreglo RAID después?",
          "answer": "Depende de su controlador RAID y nivel. Algunos controladores de hardware soportan expansión de capacidad en línea (agregar discos) y migración RAID (cambiar niveles). Sin embargo, esto es riesgoso y lento - a menudo tomando días para arreglos grandes. El enfoque más seguro es planear el tamaño del arreglo por adelantado, respaldar datos, destruir el arreglo viejo, crear uno nuevo más grande y restaurar. RAID por software (mdadm, ZFS, unRAID) a menudo tiene mejor soporte de expansión que RAID de hardware barato."
        },
        {
          "question": "¿Es RAID un reemplazo para respaldos?",
          "answer": "NO. RAID protege solo contra falla de disco - NO protege contra: eliminación de archivos, corrupción, malware/ransomware, falla del controlador, incendio/robo, o error humano. Se aplica la regla de respaldo 3-2-1: 3 copias de datos (producción + 2 respaldos), 2 tipos diferentes de medios (ej., RAID + externo), 1 copia fuera del sitio (nube o ubicación remota). RAID es para tiempo de actividad, no respaldo."
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
      "name": "Calculadora RAID",
      "slug": "calculadora-raid",
      "subtitle": "Calcule capacidade RAID, desempenho, tempo de reconstrução e risco URE para todos os níveis RAID",
      "breadcrumb": "Calc RAID",
      "seo": {
        "title": "Calculadora RAID - Capacidade, IOPS, Tempo de Reconstrução e Risco URE",
        "description": "Calcule capacidade útil do array RAID, IOPS de leitura/escrita, tempo de reconstrução e risco URE. Suporta RAID 0/1/1E/5/5E/6/10/50/60 com presets HDD/SSD/NVMe. Ferramenta gratuita com gráficos visuais.",
        "shortDescription": "Calcule capacidade RAID, desempenho, tempo de reconstrução",
        "keywords": [
          "calculadora raid",
          "calculadora capacidade raid",
          "calculadora raid 5",
          "calculadora raid 6",
          "calculadora raid 10",
          "calculadora risco ure",
          "tempo reconstrução raid",
          "calculadora iops raid"
        ]
      },
      "inputs": {
        "raidLevel": {
          "label": "Nível RAID",
          "helpText": "Selecione o tipo RAID (striping, espelhamento, paridade)",
          "options": {
            "0": "RAID 0 - Striping (sem redundância)",
            "1": "RAID 1 - Espelhamento",
            "5": "RAID 5 - Paridade Simples",
            "6": "RAID 6 - Paridade Dupla",
            "10": "RAID 10 - Stripe Espelhado (1+0)",
            "50": "RAID 50 - RAID 5 em Stripe (5+0)",
            "60": "RAID 60 - RAID 6 em Stripe (6+0)",
            "1E": "RAID 1E - Espelhos em Stripe",
            "5E": "RAID 5E - com Hot Spare",
            "5EE": "RAID 5EE - Hot Spare Distribuído"
          }
        },
        "numDrives": {
          "label": "Número de Drives",
          "helpText": "Total de drives no array"
        },
        "driveCapacity": {
          "label": "Capacidade do Drive",
          "helpText": "Capacidade por drive"
        },
        "driveType": {
          "label": "Tipo de Drive",
          "helpText": "HDD, SSD ou NVMe (afeta IOPS/throughput)",
          "options": {
            "HDD": "HDD (7200 RPM)",
            "SSD": "SATA SSD",
            "NVMe": "NVMe SSD"
          }
        },
        "driveCost": {
          "label": "Custo por Drive",
          "helpText": "Preço de cada drive em USD"
        },
        "drivesPerGroup": {
          "label": "Drives por Grupo RAID",
          "helpText": "Apenas para RAID 50/60 - drives em cada sub-array"
        },
        "rebuildSpeed": {
          "label": "Velocidade de Reconstrução",
          "helpText": "Taxa de reconstrução em MB/s (típico: 50-150 MB/s)"
        },
        "ureRate": {
          "label": "Taxa URE (1 em N bits)",
          "helpText": "Taxa de erro de leitura irrecuperável (HDD: 1e14, Enterprise: 1e15)"
        }
      },
      "results": {
        "usableCapacity": {
          "label": "Capacidade Útil"
        },
        "overhead": {
          "label": "Overhead (Paridade/Espelho)"
        },
        "efficiency": {
          "label": "Eficiência de Armazenamento"
        },
        "faultTolerance": {
          "label": "Tolerância a Falhas"
        },
        "minDrives": {
          "label": "Drives Mínimos"
        },
        "totalCost": {
          "label": "Custo Total"
        },
        "costPerTB": {
          "label": "Custo por TB Útil"
        },
        "readIOPS": {
          "label": "IOPS de Leitura"
        },
        "writeIOPS": {
          "label": "IOPS de Escrita"
        },
        "readThroughput": {
          "label": "Throughput de Leitura"
        },
        "writeThroughput": {
          "label": "Throughput de Escrita"
        },
        "writePenalty": {
          "label": "Penalidade de Escrita"
        },
        "rebuildTime": {
          "label": "Tempo de Reconstrução"
        },
        "ureRisk": {
          "label": "Risco URE durante Reconstrução"
        },
        "recommendation": {
          "label": "Recomendação"
        }
      },
      "presets": {
        "homeNAS": {
          "label": "NAS Doméstico",
          "description": "4×4TB RAID 5 (HDD)"
        },
        "serverBasic": {
          "label": "Servidor Básico",
          "description": "6×2TB RAID 10 (SSD)"
        },
        "serverAdvanced": {
          "label": "Servidor Avançado",
          "description": "8×8TB RAID 6 (SSD)"
        },
        "performance": {
          "label": "Alta Performance",
          "description": "8×1TB RAID 50 (NVMe)"
        },
        "enterprise": {
          "label": "Corporativo",
          "description": "12×16TB RAID 60 (SSD)"
        }
      },
      "values": {
        "TB": "TB",
        "GB": "GB",
        "drives": "drives",
        "drive": "drive",
        "hours": "horas",
        "minutes": "minutos",
        "low": "Baixo",
        "moderate": "Moderado",
        "high": "Alto",
        "veryHigh": "Muito Alto",
        "excellent": "Excelente",
        "good": "Bom",
        "fair": "Regular",
        "poor": "Ruim",
        "none": "Nenhum"
      },
      "formats": {
        "summary": "RAID {raidLevel} com {numDrives} × {driveCapacity} TB drives fornece {usableCapacity} de capacidade útil com {faultTolerance} tolerância a falhas."
      },
      "infoCards": {
        "capacity": {
          "title": "Detalhamento de Capacidade",
          "items": [
            {
              "label": "Capacidade Bruta Total",
              "valueKey": "totalCapacity"
            },
            {
              "label": "Capacidade Útil",
              "valueKey": "usableCapacity"
            },
            {
              "label": "Overhead (Paridade/Espelho)",
              "valueKey": "overhead"
            },
            {
              "label": "Eficiência de Armazenamento",
              "valueKey": "efficiency"
            }
          ]
        },
        "performance": {
          "title": "Métricas de Performance",
          "items": [
            {
              "label": "IOPS de Leitura",
              "valueKey": "readIOPS"
            },
            {
              "label": "IOPS de Escrita",
              "valueKey": "writeIOPS"
            },
            {
              "label": "Throughput de Leitura",
              "valueKey": "readThroughput"
            },
            {
              "label": "Throughput de Escrita",
              "valueKey": "writeThroughput"
            }
          ]
        },
        "tips": {
          "title": "Considerações Importantes",
          "items": [
            "RAID NÃO é backup - sempre mantenha backups separados",
            "Drives maiores aumentam tempo de reconstrução e risco URE",
            "RAID 6/60 recomendado para arrays > 8 drives",
            "NVMe oferece 10-20x IOPS sobre HDD mas custa mais"
          ]
        }
      },
      "chart": {
        "title": "Distribuição de Capacidade",
        "xLabel": "Tipo",
        "yLabel": "Capacidade (TB)",
        "series": {
          "usable": "Útil",
          "parity": "Paridade/Espelho"
        }
      },
      "detailedTable": {
        "comparison": {
          "button": "Comparar Níveis RAID",
          "title": "Comparação de Níveis RAID",
          "columns": {
            "level": "Nível RAID",
            "minDrives": "Drives Mín",
            "faultTolerance": "Tolerância a Falhas",
            "efficiency": "Eficiência",
            "readSpeed": "Velocidade Leitura",
            "writeSpeed": "Velocidade Escrita",
            "useCase": "Melhor Para"
          }
        }
      },
      "education": {
        "whatIsRAID": {
          "title": "O que é RAID?",
          "content": "RAID (Redundant Array of Independent Disks) combina múltiplos drives físicos em uma única unidade lógica para melhorar performance, redundância ou ambos. Diferentes níveis RAID oferecem variados trade-offs entre capacidade, velocidade e tolerância a falhas. RAID 0 maximiza performance distribuindo dados entre drives mas não oferece redundância. RAID 1 espelha dados para redundância completa com 50% de custo de capacidade. RAID 5/6 usam paridade para redundância eficiente, enquanto RAID 10/50/60 combinam striping com espelhamento ou paridade para performance e proteção de nível corporativo."
        },
        "raidLevelsExplained": {
          "title": "Entendendo os Níveis RAID",
          "content": "Cada nível RAID serve necessidades diferentes. RAID 0 distribui dados para velocidade máxima (2× IOPS com 2 drives) mas uma falha de drive perde tudo. RAID 1 espelha dados para segurança mas usa apenas 50% da capacidade. RAID 5 adiciona paridade (mínimo 3 drives) permitindo 1 falha de drive com ~67-93% de eficiência. RAID 6 usa paridade dupla (mínimo 4 drives) sobrevivendo a 2 falhas. RAID 10 combina espelhamento e striping para excelente performance com 50% de capacidade. RAID 50/60 fazem stripe de múltiplos grupos RAID 5/6 para cargas corporativas exigindo velocidade e resiliência."
        },
        "performanceFactors": {
          "title": "Fatores de Performance",
          "items": [
            {
              "text": "Penalidade de escrita: RAID 5 = 4× I/O, RAID 6 = 6× I/O, RAID 10 = 2× I/O",
              "type": "info"
            },
            {
              "text": "Performance de leitura escala linearmente com drives (exceto overhead de paridade)",
              "type": "info"
            },
            {
              "text": "HDD: ~150 IOPS, SATA SSD: ~50k IOPS, NVMe: ~500k IOPS por drive",
              "type": "info"
            },
            {
              "text": "Throughput: HDD ~200 MB/s, SSD ~550 MB/s, NVMe ~3500 MB/s",
              "type": "info"
            },
            {
              "text": "Cargas com muita escrita favorecem RAID 10 sobre RAID 5/6 devido à menor penalidade",
              "type": "warning"
            },
            {
              "text": "Tempo de reconstrução aumenta exponencialmente com capacidade - monitore de perto",
              "type": "warning"
            }
          ]
        },
        "choosingRAID": {
          "title": "Escolhendo o Nível RAID Correto",
          "items": [
            {
              "text": "RAID 0: Performance máxima, sem redundância (armazenamento temp, cache)",
              "type": "info"
            },
            {
              "text": "RAID 1: Espelhamento simples, 50% capacidade (drives de boot, dados críticos pequenos)",
              "type": "info"
            },
            {
              "text": "RAID 5: Eficiência balanceada, 1 falha de drive (servidores de arquivo SMB, I/O moderado)",
              "type": "info"
            },
            {
              "text": "RAID 6: Paridade dupla, 2 falhas de drive (arrays maiores > 8 drives)",
              "type": "info"
            },
            {
              "text": "RAID 10: Alta performance + redundância (bancos de dados, VMs, alto I/O)",
              "type": "info"
            },
            {
              "text": "RAID 50/60: Cargas corporativas exigindo escala + performance + resiliência",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos do Mundo Real",
          "description": "Configurações RAID comuns para diferentes cenários",
          "examples": [
            {
              "title": "Servidor de Mídia Doméstico",
              "steps": [
                "4 × 4TB HDD em RAID 5",
                "Útil: 12 TB (3×4)",
                "Custo: ~$400 total",
                "Pode perder 1 drive sem perda de dados"
              ],
              "result": "Armazenamento acessível com proteção básica"
            },
            {
              "title": "Servidor de Arquivos Pequena Empresa",
              "steps": [
                "6 × 2TB SSD em RAID 10",
                "Útil: 6 TB (50% de 12 TB)",
                "IOPS Leitura/Escrita: ~300k/150k",
                "Pode perder 1 drive por conjunto espelho"
              ],
              "result": "Performance rápida com boa redundância"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual a diferença entre RAID 5 e RAID 6?",
          "answer": "RAID 5 usa paridade simples e pode sobreviver à falha de 1 drive, exigindo mínimo de 3 drives. RAID 6 usa paridade dupla e pode sobreviver à falha de 2 drives, exigindo mínimo de 4 drives. RAID 6 é mais seguro para arrays maiores (>8 drives) devido ao menor risco URE durante reconstrução, mas tem performance de escrita ligeiramente menor devido ao cálculo de dois blocos de paridade ao invés de um."
        },
        {
          "question": "Por que RAID 10 é mais rápido que RAID 5/6?",
          "answer": "RAID 10 tem penalidade de escrita de apenas 2× (uma escrita para cada espelho), enquanto RAID 5 tem penalidade de 4× (ler dados, ler paridade, escrever dados, escrever paridade) e RAID 6 tem penalidade de 6× (paridade dupla). Para operações de leitura, ambos escalam linearmente, mas a menor penalidade de escrita do RAID 10 o torna significativamente mais rápido para cargas com muita escrita como bancos de dados e máquinas virtuais."
        },
        {
          "question": "O que é risco URE e por que importa?",
          "answer": "URE (Unrecoverable Read Error) é quando um drive não consegue ler um setor durante a reconstrução. Com drives modernos grandes (>6TB), a probabilidade de encontrar um URE ao reconstruir de um drive falho é significativa. HDDs consumidor têm taxas URE de 1 em 10^14 bits (~12.5 TB), significando que um único URE pode causar perda completa de dados no RAID 5. A paridade dupla do RAID 6 protege contra isso - mesmo se um URE ocorrer durante reconstrução, a segunda paridade pode recuperar os dados."
        },
        {
          "question": "Quanto tempo demora a reconstrução RAID?",
          "answer": "O tempo de reconstrução depende da capacidade do drive, tamanho do array e velocidade de reconstrução. Um drive de 4TB reconstruindo a 100 MB/s demora ~11 horas. Um drive de 18TB demora ~50 horas. Durante a reconstrução, a performance do array degrada significativamente e o risco URE é maior. RAID 6/60 é recomendado para arrays grandes para reduzir risco URE. Drives corporativos com taxas URE menores (1 em 10^15) também ajudam."
        },
        {
          "question": "Posso expandir um array RAID depois?",
          "answer": "Depende da sua controladora RAID e nível. Algumas controladoras de hardware suportam expansão online de capacidade (adicionar drives) e migração RAID (mudar níveis). Porém, isso é arriscado e lento - frequentemente levando dias para arrays grandes. A abordagem mais segura é planejar o tamanho do array antecipadamente, fazer backup dos dados, destruir o array antigo, criar um novo maior e restaurar. RAID por software (mdadm, ZFS, unRAID) frequentemente tem melhor suporte a expansão que RAID de hardware barato."
        },
        {
          "question": "RAID substitui backups?",
          "answer": "NÃO. RAID protege apenas contra falha de drive - NÃO protege contra: exclusão de arquivos, corrupção, malware/ransomware, falha de controladora, incêndio/roubo ou erro humano. A regra de backup 3-2-1 se aplica: 3 cópias dos dados (produção + 2 backups), 2 tipos diferentes de mídia (ex: RAID + externo), 1 cópia offsite (nuvem ou local remoto). RAID é para disponibilidade, não backup."
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
      "name": "Calculateur RAID",
      "slug": "calculateur-raid",
      "subtitle": "Calculez la capacité RAID, les performances, le temps de reconstruction et le risque URE pour tous les niveaux RAID",
      "breadcrumb": "Calc RAID",
      "seo": {
        "title": "Calculateur RAID - Capacité, IOPS, Temps de Reconstruction et Risque URE",
        "description": "Calculez la capacité utilisable, les IOPS lecture/écriture, le temps de reconstruction et le risque URE des matrices RAID. Supporte RAID 0/1/1E/5/5E/6/10/50/60 avec préréglages HDD/SSD/NVMe. Outil gratuit avec graphiques visuels.",
        "shortDescription": "Calculez la capacité, les performances et le temps de reconstruction RAID",
        "keywords": [
          "calculateur raid",
          "calculateur capacité raid",
          "calculateur raid 5",
          "calculateur raid 6",
          "calculateur raid 10",
          "calculateur risque ure",
          "temps reconstruction raid",
          "calculateur iops raid"
        ]
      },
      "inputs": {
        "raidLevel": {
          "label": "Niveau RAID",
          "helpText": "Sélectionnez le type de RAID (striping, mirroring, parité)",
          "options": {
            "0": "RAID 0 - Striping (aucune redondance)",
            "1": "RAID 1 - Mirroring",
            "5": "RAID 5 - Parité Simple",
            "6": "RAID 6 - Double Parité",
            "10": "RAID 10 - Stripe en Miroir (1+0)",
            "50": "RAID 50 - RAID 5 Striped (5+0)",
            "60": "RAID 60 - RAID 6 Striped (6+0)",
            "1E": "RAID 1E - Miroirs Striped",
            "5E": "RAID 5E - avec Spare à Chaud",
            "5EE": "RAID 5EE - Spare à Chaud Distribué"
          }
        },
        "numDrives": {
          "label": "Nombre de Disques",
          "helpText": "Total de disques dans la matrice"
        },
        "driveCapacity": {
          "label": "Capacité du Disque",
          "helpText": "Capacité par disque"
        },
        "driveType": {
          "label": "Type de Disque",
          "helpText": "HDD, SSD, ou NVMe (affecte les IOPS/débit)",
          "options": {
            "HDD": "HDD (7200 RPM)",
            "SSD": "SSD SATA",
            "NVMe": "SSD NVMe"
          }
        },
        "driveCost": {
          "label": "Coût par Disque",
          "helpText": "Prix de chaque disque en USD"
        },
        "drivesPerGroup": {
          "label": "Disques par Groupe RAID",
          "helpText": "Pour RAID 50/60 uniquement - disques dans chaque sous-matrice"
        },
        "rebuildSpeed": {
          "label": "Vitesse de Reconstruction",
          "helpText": "Taux de reconstruction en Mo/s (typique : 50-150 Mo/s)"
        },
        "ureRate": {
          "label": "Taux URE (1 sur N bits)",
          "helpText": "Taux d'erreur de lecture irrécupérable (HDD : 1e14, Entreprise : 1e15)"
        }
      },
      "results": {
        "usableCapacity": {
          "label": "Capacité Utilisable"
        },
        "overhead": {
          "label": "Surcharge (Parité/Miroir)"
        },
        "efficiency": {
          "label": "Efficacité de Stockage"
        },
        "faultTolerance": {
          "label": "Tolérance aux Pannes"
        },
        "minDrives": {
          "label": "Disques Minimum"
        },
        "totalCost": {
          "label": "Coût Total"
        },
        "costPerTB": {
          "label": "Coût par To Utilisable"
        },
        "readIOPS": {
          "label": "IOPS Lecture"
        },
        "writeIOPS": {
          "label": "IOPS Écriture"
        },
        "readThroughput": {
          "label": "Débit Lecture"
        },
        "writeThroughput": {
          "label": "Débit Écriture"
        },
        "writePenalty": {
          "label": "Pénalité Écriture"
        },
        "rebuildTime": {
          "label": "Temps de Reconstruction"
        },
        "ureRisk": {
          "label": "Risque URE pendant la Reconstruction"
        },
        "recommendation": {
          "label": "Recommandation"
        }
      },
      "presets": {
        "homeNAS": {
          "label": "NAS Domestique",
          "description": "4×4To RAID 5 (HDD)"
        },
        "serverBasic": {
          "label": "Serveur Basique",
          "description": "6×2To RAID 10 (SSD)"
        },
        "serverAdvanced": {
          "label": "Serveur Avancé",
          "description": "8×8To RAID 6 (SSD)"
        },
        "performance": {
          "label": "Haute Performance",
          "description": "8×1To RAID 50 (NVMe)"
        },
        "enterprise": {
          "label": "Entreprise",
          "description": "12×16To RAID 60 (SSD)"
        }
      },
      "values": {
        "TB": "To",
        "GB": "Go",
        "drives": "disques",
        "drive": "disque",
        "hours": "heures",
        "minutes": "minutes",
        "low": "Faible",
        "moderate": "Modéré",
        "high": "Élevé",
        "veryHigh": "Très Élevé",
        "excellent": "Excellent",
        "good": "Bon",
        "fair": "Correct",
        "poor": "Mauvais",
        "none": "Aucune"
      },
      "formats": {
        "summary": "RAID {raidLevel} avec {numDrives} × {driveCapacity} To disques fournit {usableCapacity} de capacité utilisable avec {faultTolerance} tolérance aux pannes."
      },
      "infoCards": {
        "capacity": {
          "title": "Répartition de la Capacité",
          "items": [
            {
              "label": "Capacité Brute Totale",
              "valueKey": "totalCapacity"
            },
            {
              "label": "Capacité Utilisable",
              "valueKey": "usableCapacity"
            },
            {
              "label": "Surcharge (Parité/Miroir)",
              "valueKey": "overhead"
            },
            {
              "label": "Efficacité de Stockage",
              "valueKey": "efficiency"
            }
          ]
        },
        "performance": {
          "title": "Métriques de Performance",
          "items": [
            {
              "label": "IOPS Lecture",
              "valueKey": "readIOPS"
            },
            {
              "label": "IOPS Écriture",
              "valueKey": "writeIOPS"
            },
            {
              "label": "Débit Lecture",
              "valueKey": "readThroughput"
            },
            {
              "label": "Débit Écriture",
              "valueKey": "writeThroughput"
            }
          ]
        },
        "tips": {
          "title": "Considérations Clés",
          "items": [
            "RAID n'est PAS une sauvegarde - maintenez toujours des sauvegardes séparées",
            "Les disques plus gros augmentent le temps de reconstruction et le risque URE",
            "RAID 6/60 recommandé pour les matrices > 8 disques",
            "NVMe offre 10-20x plus d'IOPS que HDD mais coûte plus cher"
          ]
        }
      },
      "chart": {
        "title": "Répartition de la Capacité",
        "xLabel": "Type",
        "yLabel": "Capacité (To)",
        "series": {
          "usable": "Utilisable",
          "parity": "Parité/Miroir"
        }
      },
      "detailedTable": {
        "comparison": {
          "button": "Comparer les Niveaux RAID",
          "title": "Comparaison des Niveaux RAID",
          "columns": {
            "level": "Niveau RAID",
            "minDrives": "Disques Min",
            "faultTolerance": "Tolérance aux Pannes",
            "efficiency": "Efficacité",
            "readSpeed": "Vitesse Lecture",
            "writeSpeed": "Vitesse Écriture",
            "useCase": "Idéal Pour"
          }
        }
      },
      "education": {
        "whatIsRAID": {
          "title": "Qu'est-ce que le RAID ?",
          "content": "RAID (Redundant Array of Independent Disks) combine plusieurs disques physiques en une seule unité logique pour améliorer les performances, la redondance, ou les deux. Différents niveaux RAID offrent des compromis variés entre capacité, vitesse et tolérance aux pannes. RAID 0 maximise les performances en répartissant les données sur les disques mais n'offre aucune redondance. RAID 1 duplique les données pour une redondance complète à 50% du coût de capacité. RAID 5/6 utilisent la parité pour une redondance efficace, tandis que RAID 10/50/60 combinent striping avec mirroring ou parité pour des performances et une protection de niveau entreprise."
        },
        "raidLevelsExplained": {
          "title": "Comprendre les Niveaux RAID",
          "content": "Chaque niveau RAID répond à des besoins différents. RAID 0 répartit les données pour une vitesse maximale (2× IOPS avec 2 disques) mais une panne de disque fait tout perdre. RAID 1 duplique les données pour la sécurité mais utilise seulement 50% de la capacité. RAID 5 ajoute la parité (minimum 3 disques) permettant 1 panne de disque avec ~67-93% d'efficacité. RAID 6 utilise une double parité (minimum 4 disques) survivant à 2 pannes. RAID 10 combine mirroring et striping pour d'excellentes performances avec 50% de capacité. RAID 50/60 répartit plusieurs groupes RAID 5/6 pour les charges de travail d'entreprise nécessitant vitesse et résilience."
        },
        "performanceFactors": {
          "title": "Facteurs de Performance",
          "items": [
            {
              "text": "Pénalité écriture : RAID 5 = 4× E/S, RAID 6 = 6× E/S, RAID 10 = 2× E/S",
              "type": "info"
            },
            {
              "text": "Performance lecture évolue linéairement avec les disques (sauf surcharge parité)",
              "type": "info"
            },
            {
              "text": "HDD : ~150 IOPS, SSD SATA : ~50k IOPS, NVMe : ~500k IOPS par disque",
              "type": "info"
            },
            {
              "text": "Débit : HDD ~200 Mo/s, SSD ~550 Mo/s, NVMe ~3500 Mo/s",
              "type": "info"
            },
            {
              "text": "Charges intensives en écriture favorisent RAID 10 par rapport à RAID 5/6 (pénalité plus faible)",
              "type": "warning"
            },
            {
              "text": "Temps de reconstruction augmente exponentiellement avec la capacité - surveiller étroitement",
              "type": "warning"
            }
          ]
        },
        "choosingRAID": {
          "title": "Choisir le Bon Niveau RAID",
          "items": [
            {
              "text": "RAID 0 : Performance maximale, aucune redondance (stockage temporaire, cache)",
              "type": "info"
            },
            {
              "text": "RAID 1 : Mirroring simple, 50% capacité (disques de démarrage, petites données critiques)",
              "type": "info"
            },
            {
              "text": "RAID 5 : Efficacité équilibrée, 1 panne de disque (serveurs de fichiers PME, E/S modérées)",
              "type": "info"
            },
            {
              "text": "RAID 6 : Double parité, 2 pannes de disques (matrices plus grandes > 8 disques)",
              "type": "info"
            },
            {
              "text": "RAID 10 : Haute performance + redondance (bases de données, VMs, E/S élevées)",
              "type": "info"
            },
            {
              "text": "RAID 50/60 : Charges de travail d'entreprise nécessitant échelle + performance + résilience",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples Concrets",
          "description": "Configurations RAID communes pour différents scénarios",
          "examples": [
            {
              "title": "Serveur Multimédia Domestique",
              "steps": [
                "4 × 4To HDD en RAID 5",
                "Utilisable : 12 To (3×4)",
                "Coût : ~400$ total",
                "Peut perdre 1 disque sans perte de données"
              ],
              "result": "Stockage abordable avec protection de base"
            },
            {
              "title": "Serveur de Fichiers Petite Entreprise",
              "steps": [
                "6 × 2To SSD en RAID 10",
                "Utilisable : 6 To (50% de 12 To)",
                "IOPS Lecture/Écriture : ~300k/150k",
                "Peut perdre 1 disque par ensemble miroir"
              ],
              "result": "Performance rapide avec bonne redondance"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la différence entre RAID 5 et RAID 6 ?",
          "answer": "RAID 5 utilise une parité simple et peut survivre à 1 panne de disque, nécessitant minimum 3 disques. RAID 6 utilise une double parité et peut survivre à 2 pannes de disques, nécessitant minimum 4 disques. RAID 6 est plus sûr pour les matrices plus grandes (>8 disques) en raison du risque URE plus faible pendant la reconstruction, mais a des performances d'écriture légèrement inférieures due au calcul de deux blocs de parité au lieu d'un."
        },
        {
          "question": "Pourquoi RAID 10 est-il plus rapide que RAID 5/6 ?",
          "answer": "RAID 10 a une pénalité d'écriture de seulement 2× (une écriture sur chaque miroir), tandis que RAID 5 a une pénalité 4× (lire données, lire parité, écrire données, écrire parité) et RAID 6 a une pénalité 6× (double parité). Pour les opérations de lecture, les deux évoluent linéairement, mais la pénalité d'écriture plus faible de RAID 10 le rend significativement plus rapide pour les charges intensives en écriture comme les bases de données et machines virtuelles."
        },
        {
          "question": "Qu'est-ce que le risque URE et pourquoi est-ce important ?",
          "answer": "URE (Unrecoverable Read Error) survient quand un disque ne peut pas lire un secteur pendant la reconstruction. Avec les gros disques modernes (>6To), la probabilité de rencontrer une URE pendant la reconstruction d'un disque défaillant est significative. Les HDD grand public ont des taux URE de 1 sur 10^14 bits (~12,5 To), ce qui signifie qu'une seule URE peut causer une perte complète de données en RAID 5. La double parité de RAID 6 protège contre cela - même si une URE survient pendant la reconstruction, la seconde parité peut récupérer les données."
        },
        {
          "question": "Combien de temps prend la reconstruction RAID ?",
          "answer": "Le temps de reconstruction dépend de la capacité du disque, de la taille de la matrice, et de la vitesse de reconstruction. Un disque de 4To se reconstruisant à 100 Mo/s prend ~11 heures. Un disque de 18To prend ~50 heures. Pendant la reconstruction, les performances de la matrice se dégradent significativement et le risque URE est le plus élevé. RAID 6/60 est recommandé pour les grosses matrices afin de réduire le risque URE. Les disques d'entreprise avec des taux URE plus faibles (1 sur 10^15) aident aussi."
        },
        {
          "question": "Puis-je étendre une matrice RAID plus tard ?",
          "answer": "Cela dépend de votre contrôleur RAID et du niveau. Certains contrôleurs matériels supportent l'expansion de capacité en ligne (ajout de disques) et la migration RAID (changement de niveaux). Cependant, c'est risqué et lent - prenant souvent des jours pour les grosses matrices. L'approche la plus sûre est de planifier la taille de la matrice à l'avance, sauvegarder les données, détruire l'ancienne matrice, créer une nouvelle plus grande, et restaurer. Le RAID logiciel (mdadm, ZFS, unRAID) a souvent un meilleur support d'expansion que le RAID matériel bon marché."
        },
        {
          "question": "Le RAID remplace-t-il les sauvegardes ?",
          "answer": "NON. RAID protège uniquement contre les pannes de disques - il ne protège PAS contre : suppression de fichiers, corruption, malware/ransomware, panne de contrôleur, incendie/vol, ou erreur humaine. La règle de sauvegarde 3-2-1 s'applique : 3 copies des données (production + 2 sauvegardes), 2 types de médias différents (ex. RAID + externe), 1 copie hors site (cloud ou emplacement distant). RAID est pour la disponibilité, pas la sauvegarde."
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
      "name": "RAID Rechner",
      "slug": "raid-rechner",
      "subtitle": "Berechnen Sie RAID Kapazität, Leistung, Wiederaufbauzeit und URE Risiko für alle RAID Level",
      "breadcrumb": "RAID Rechner",
      "seo": {
        "title": "RAID Rechner - Kapazität, IOPS, Wiederaufbauzeit & URE Risiko",
        "description": "Berechnen Sie RAID Array nutzbare Kapazität, Lese/Schreib IOPS, Wiederaufbauzeit und URE Risiko. Unterstützt RAID 0/1/1E/5/5E/6/10/50/60 mit HDD/SSD/NVMe Voreinstellungen. Kostenloses Tool mit visuellen Diagrammen.",
        "shortDescription": "Berechnen Sie RAID Kapazität, Leistung, Wiederaufbauzeit",
        "keywords": [
          "raid rechner",
          "raid kapazitäts rechner",
          "raid 5 rechner",
          "raid 6 rechner",
          "raid 10 rechner",
          "ure risiko rechner",
          "raid wiederaufbauzeit",
          "raid iops rechner"
        ]
      },
      "inputs": {
        "raidLevel": {
          "label": "RAID Level",
          "helpText": "Wählen Sie RAID Typ (Striping, Mirroring, Parität)",
          "options": {
            "0": "RAID 0 - Striping (keine Redundanz)",
            "1": "RAID 1 - Spiegelung",
            "5": "RAID 5 - Einfache Parität",
            "6": "RAID 6 - Doppelte Parität",
            "10": "RAID 10 - Gespiegelter Stripe (1+0)",
            "50": "RAID 50 - Gestreifter RAID 5 (5+0)",
            "60": "RAID 60 - Gestreifter RAID 6 (6+0)",
            "1E": "RAID 1E - Gestreifte Spiegel",
            "5E": "RAID 5E - mit Hot Spare",
            "5EE": "RAID 5EE - Verteilter Hot Spare"
          }
        },
        "numDrives": {
          "label": "Anzahl Laufwerke",
          "helpText": "Gesamtanzahl Laufwerke im Array"
        },
        "driveCapacity": {
          "label": "Laufwerk Kapazität",
          "helpText": "Kapazität pro Laufwerk"
        },
        "driveType": {
          "label": "Laufwerk Typ",
          "helpText": "HDD, SSD oder NVMe (beeinflusst IOPS/Durchsatz)",
          "options": {
            "HDD": "HDD (7200 RPM)",
            "SSD": "SATA SSD",
            "NVMe": "NVMe SSD"
          }
        },
        "driveCost": {
          "label": "Kosten pro Laufwerk",
          "helpText": "Preis jedes Laufwerks in USD"
        },
        "drivesPerGroup": {
          "label": "Laufwerke pro RAID Gruppe",
          "helpText": "Nur für RAID 50/60 - Laufwerke in jedem Sub-Array"
        },
        "rebuildSpeed": {
          "label": "Wiederaufbau Geschwindigkeit",
          "helpText": "MB/s Wiederaufbau Rate (typisch: 50-150 MB/s)"
        },
        "ureRate": {
          "label": "URE Rate (1 von N Bits)",
          "helpText": "Nicht behebbare Lesefehler Rate (HDD: 1e14, Enterprise: 1e15)"
        }
      },
      "results": {
        "usableCapacity": {
          "label": "Nutzbare Kapazität"
        },
        "overhead": {
          "label": "Overhead (Parität/Spiegel)"
        },
        "efficiency": {
          "label": "Speicher Effizienz"
        },
        "faultTolerance": {
          "label": "Fehlertoleranz"
        },
        "minDrives": {
          "label": "Minimum Laufwerke"
        },
        "totalCost": {
          "label": "Gesamtkosten"
        },
        "costPerTB": {
          "label": "Kosten pro nutzbare TB"
        },
        "readIOPS": {
          "label": "Lese IOPS"
        },
        "writeIOPS": {
          "label": "Schreib IOPS"
        },
        "readThroughput": {
          "label": "Lese Durchsatz"
        },
        "writeThroughput": {
          "label": "Schreib Durchsatz"
        },
        "writePenalty": {
          "label": "Schreib Strafe"
        },
        "rebuildTime": {
          "label": "Wiederaufbauzeit"
        },
        "ureRisk": {
          "label": "URE Risiko während Wiederaufbau"
        },
        "recommendation": {
          "label": "Empfehlung"
        }
      },
      "presets": {
        "homeNAS": {
          "label": "Heim NAS",
          "description": "4×4TB RAID 5 (HDD)"
        },
        "serverBasic": {
          "label": "Basis Server",
          "description": "6×2TB RAID 10 (SSD)"
        },
        "serverAdvanced": {
          "label": "Erweiterte Server",
          "description": "8×8TB RAID 6 (SSD)"
        },
        "performance": {
          "label": "Hohe Leistung",
          "description": "8×1TB RAID 50 (NVMe)"
        },
        "enterprise": {
          "label": "Unternehmen",
          "description": "12×16TB RAID 60 (SSD)"
        }
      },
      "values": {
        "TB": "TB",
        "GB": "GB",
        "drives": "Laufwerke",
        "drive": "Laufwerk",
        "hours": "Stunden",
        "minutes": "Minuten",
        "low": "Niedrig",
        "moderate": "Moderat",
        "high": "Hoch",
        "veryHigh": "Sehr Hoch",
        "excellent": "Ausgezeichnet",
        "good": "Gut",
        "fair": "Ausreichend",
        "poor": "Schlecht",
        "none": "Keine"
      },
      "formats": {
        "summary": "RAID {raidLevel} mit {numDrives} × {driveCapacity} TB Laufwerken bietet {usableCapacity} nutzbare Kapazität mit {faultTolerance} Fehlertoleranz."
      },
      "infoCards": {
        "capacity": {
          "title": "Kapazitäts Aufschlüsselung",
          "items": [
            {
              "label": "Gesamt Rohkapazität",
              "valueKey": "totalCapacity"
            },
            {
              "label": "Nutzbare Kapazität",
              "valueKey": "usableCapacity"
            },
            {
              "label": "Overhead (Parität/Spiegel)",
              "valueKey": "overhead"
            },
            {
              "label": "Speicher Effizienz",
              "valueKey": "efficiency"
            }
          ]
        },
        "performance": {
          "title": "Leistungs Kennzahlen",
          "items": [
            {
              "label": "Lese IOPS",
              "valueKey": "readIOPS"
            },
            {
              "label": "Schreib IOPS",
              "valueKey": "writeIOPS"
            },
            {
              "label": "Lese Durchsatz",
              "valueKey": "readThroughput"
            },
            {
              "label": "Schreib Durchsatz",
              "valueKey": "writeThroughput"
            }
          ]
        },
        "tips": {
          "title": "Wichtige Überlegungen",
          "items": [
            "RAID ist KEIN Backup - führen Sie immer separate Backups durch",
            "Größere Laufwerke erhöhen Wiederaufbauzeit und URE Risiko",
            "RAID 6/60 empfohlen für Arrays > 8 Laufwerke",
            "NVMe bietet 10-20x IOPS gegenüber HDD aber kostet mehr"
          ]
        }
      },
      "chart": {
        "title": "Kapazitäts Verteilung",
        "xLabel": "Typ",
        "yLabel": "Kapazität (TB)",
        "series": {
          "usable": "Nutzbar",
          "parity": "Parität/Spiegel"
        }
      },
      "detailedTable": {
        "comparison": {
          "button": "RAID Level Vergleichen",
          "title": "RAID Level Vergleich",
          "columns": {
            "level": "RAID Level",
            "minDrives": "Min Laufwerke",
            "faultTolerance": "Fehlertoleranz",
            "efficiency": "Effizienz",
            "readSpeed": "Lese Geschwindigkeit",
            "writeSpeed": "Schreib Geschwindigkeit",
            "useCase": "Optimal für"
          }
        }
      },
      "education": {
        "whatIsRAID": {
          "title": "Was ist RAID?",
          "content": "RAID (Redundant Array of Independent Disks) kombiniert mehrere physische Laufwerke zu einer logischen Einheit zur Verbesserung von Leistung, Redundanz oder beidem. Verschiedene RAID Level bieten unterschiedliche Kompromisse zwischen Kapazität, Geschwindigkeit und Fehlertoleranz. RAID 0 maximiert Leistung durch Striping der Daten über Laufwerke, bietet aber keine Redundanz. RAID 1 spiegelt Daten für vollständige Redundanz bei 50% Kapazitätskosten. RAID 5/6 verwenden Parität für effiziente Redundanz, während RAID 10/50/60 Striping mit Spiegelung oder Parität für Unternehmens-Leistung und -Schutz kombinieren."
        },
        "raidLevelsExplained": {
          "title": "RAID Level Verstehen",
          "content": "Jeder RAID Level dient verschiedenen Bedürfnissen. RAID 0 streift Daten für maximale Geschwindigkeit (2× IOPS mit 2 Laufwerken), aber ein Laufwerksfehler verliert alles. RAID 1 spiegelt Daten für Sicherheit, nutzt aber nur 50% Kapazität. RAID 5 fügt Parität hinzu (minimum 3 Laufwerke), erlaubt 1 Laufwerksfehler mit ~67-93% Effizienz. RAID 6 verwendet doppelte Parität (minimum 4 Laufwerke) und übersteht 2 Fehler. RAID 10 kombiniert Spiegelung und Striping für ausgezeichnete Leistung mit 50% Kapazität. RAID 50/60 streift mehrere RAID 5/6 Gruppen für Unternehmens-Workloads, die sowohl Geschwindigkeit als auch Widerstandsfähigkeit erfordern."
        },
        "performanceFactors": {
          "title": "Leistungs Faktoren",
          "items": [
            {
              "text": "Schreib Strafe: RAID 5 = 4× E/A, RAID 6 = 6× E/A, RAID 10 = 2× E/A",
              "type": "info"
            },
            {
              "text": "Lese Leistung skaliert linear mit Laufwerken (außer Paritäts Overhead)",
              "type": "info"
            },
            {
              "text": "HDD: ~150 IOPS, SATA SSD: ~50k IOPS, NVMe: ~500k IOPS pro Laufwerk",
              "type": "info"
            },
            {
              "text": "Durchsatz: HDD ~200 MB/s, SSD ~550 MB/s, NVMe ~3500 MB/s",
              "type": "info"
            },
            {
              "text": "Schreib-intensive Workloads bevorzugen RAID 10 über RAID 5/6 wegen niedrigerer Strafe",
              "type": "warning"
            },
            {
              "text": "Wiederaufbauzeit steigt exponentiell mit Kapazität - überwachen Sie genau",
              "type": "warning"
            }
          ]
        },
        "choosingRAID": {
          "title": "Den Richtigen RAID Level Wählen",
          "items": [
            {
              "text": "RAID 0: Maximale Leistung, keine Redundanz (temp Speicher, Caching)",
              "type": "info"
            },
            {
              "text": "RAID 1: Einfache Spiegelung, 50% Kapazität (Boot Laufwerke, kleine kritische Daten)",
              "type": "info"
            },
            {
              "text": "RAID 5: Ausgewogene Effizienz, 1 Laufwerksfehler (SMB Datei Server, moderate E/A)",
              "type": "info"
            },
            {
              "text": "RAID 6: Doppelte Parität, 2 Laufwerksfehler (größere Arrays > 8 Laufwerke)",
              "type": "info"
            },
            {
              "text": "RAID 10: Hohe Leistung + Redundanz (Datenbanken, VMs, hohe E/A)",
              "type": "info"
            },
            {
              "text": "RAID 50/60: Unternehmens Workloads, die Skalierung + Leistung + Belastbarkeit erfordern",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Praxis Beispiele",
          "description": "Häufige RAID Konfigurationen für verschiedene Szenarien",
          "examples": [
            {
              "title": "Heim Medien Server",
              "steps": [
                "4 × 4TB HDD in RAID 5",
                "Nutzbar: 12 TB (3×4)",
                "Kosten: ~$400 gesamt",
                "Kann 1 Laufwerk ohne Datenverlust verlieren"
              ],
              "result": "Erschwinglicher Speicher mit Basis Schutz"
            },
            {
              "title": "Kleiner Betrieb Datei Server",
              "steps": [
                "6 × 2TB SSD in RAID 10",
                "Nutzbar: 6 TB (50% von 12 TB)",
                "Lese/Schreib IOPS: ~300k/150k",
                "Kann 1 Laufwerk pro Spiegel Set verlieren"
              ],
              "result": "Schnelle Leistung mit guter Redundanz"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist der Unterschied zwischen RAID 5 und RAID 6?",
          "answer": "RAID 5 verwendet einfache Parität und kann 1 Laufwerksfehler überstehen, benötigt minimum 3 Laufwerke. RAID 6 verwendet doppelte Parität und kann 2 Laufwerksfehler überstehen, benötigt minimum 4 Laufwerke. RAID 6 ist sicherer für größere Arrays (>8 Laufwerke) wegen niedrigerem URE Risiko während Wiederaufbau, hat aber etwas niedrigere Schreib Leistung wegen Berechnung zweier Paritäts Blöcke statt einem."
        },
        {
          "question": "Warum ist RAID 10 schneller als RAID 5/6?",
          "answer": "RAID 10 hat eine Schreib Strafe von nur 2× (ein Schreibvorgang zu jedem Spiegel), während RAID 5 eine 4× Strafe hat (Daten lesen, Parität lesen, Daten schreiben, Parität schreiben) und RAID 6 eine 6× Strafe (doppelte Parität). Für Lese Operationen skalieren beide linear, aber RAID 10's niedrigere Schreib Strafe macht es deutlich schneller für schreib-intensive Workloads wie Datenbanken und virtuelle Maschinen."
        },
        {
          "question": "Was ist URE Risiko und warum ist es wichtig?",
          "answer": "URE (Unrecoverable Read Error) ist wenn ein Laufwerk einen Sektor während Wiederaufbau nicht lesen kann. Bei großen modernen Laufwerken (>6TB) ist die Wahrscheinlichkeit eines URE während Wiederaufbau von einem fehlgeschlagenen Laufwerk bedeutend. Verbraucher HDDs haben URE Raten von 1 in 10^14 Bits (~12,5 TB), was bedeutet dass ein einziger URE kompletten Datenverlust in RAID 5 verursachen kann. RAID 6's doppelte Parität schützt dagegen - selbst wenn ein URE während Wiederaufbau auftritt, kann die zweite Parität die Daten wiederherstellen."
        },
        {
          "question": "Wie lange dauert RAID Wiederaufbau?",
          "answer": "Wiederaufbauzeit hängt von Laufwerk Kapazität, Array Größe und Wiederaufbau Geschwindigkeit ab. Ein 4TB Laufwerk, das mit 100 MB/s wiederaufgebaut wird, benötigt ~11 Stunden. Ein 18TB Laufwerk benötigt ~50 Stunden. Während Wiederaufbau degradiert Array Leistung deutlich und URE Risiko ist am höchsten. RAID 6/60 wird für große Arrays empfohlen zur URE Risiko Reduzierung. Enterprise Laufwerke mit niedrigeren URE Raten (1 in 10^15) helfen ebenfalls."
        },
        {
          "question": "Kann ich ein RAID Array später erweitern?",
          "answer": "Es hängt von Ihrem RAID Controller und Level ab. Einige Hardware Controller unterstützen Online Kapazitäts Erweiterung (Laufwerke hinzufügen) und RAID Migration (Level ändern). Jedoch ist dies riskant und langsam - oft dauert es Tage für große Arrays. Der sicherste Ansatz ist Array Größe im Voraus zu planen, Daten zu sichern, das alte Array zu zerstören, ein neues größeres zu erstellen und wiederherzustellen. Software RAID (mdadm, ZFS, unRAID) hat oft bessere Erweiterungs Unterstützung als günstige Hardware RAID."
        },
        {
          "question": "Ist RAID ein Ersatz für Backups?",
          "answer": "NEIN. RAID schützt nur gegen Laufwerksfehler - es schützt NICHT gegen: Datei Löschung, Korruption, Malware/Ransomware, Controller Fehler, Feuer/Diebstahl oder menschliche Fehler. Die 3-2-1 Backup Regel gilt: 3 Kopien der Daten (Produktion + 2 Backups), 2 verschiedene Medien Typen (z.B. RAID + extern), 1 Offsite Kopie (Cloud oder entfernter Standort). RAID ist für Verfügbarkeit, nicht Backup."
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

  // ===========================================================================
  // INPUTS — Configuration
  // ===========================================================================
  inputs: [
    {
      id: "raidLevel",
      type: "select",
      defaultValue: "5",
      options: [
        { value: "0" },
        { value: "1" },
        { value: "1E" },
        { value: "5" },
        { value: "5E" },
        { value: "5EE" },
        { value: "6" },
        { value: "10" },
        { value: "50" },
        { value: "60" },
      ],
    },
    {
      id: "numDrives",
      type: "number",
      defaultValue: 4,
      min: 2,
      max: 100,
      step: 1,
    },
    {
      id: "driveCapacity",
      type: "number",
      defaultValue: 4,
      min: 0.1,
      max: 100,
      step: 0.1,
      unitType: "data",
      syncGroup: false,
      defaultUnit: "tb",
      allowedUnits: ["gb", "tb"],
    },
    {
      id: "driveType",
      type: "select",
      defaultValue: "HDD",
      options: [{ value: "HDD" }, { value: "SSD" }, { value: "NVMe" }],
    },
    {
      id: "driveCost",
      type: "number",
      defaultValue: null,
      placeholder: "100",
      min: 0,
      max: 10000,
      step: 1,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "drivesPerGroup",
      type: "number",
      defaultValue: 4,
      min: 3,
      max: 20,
      step: 1,
      showWhen: { field: "raidLevel", value: ["50", "60"] },
    },
    {
      id: "rebuildSpeed",
      type: "number",
      defaultValue: 100,
      min: 10,
      max: 500,
      step: 10,
      suffix: "MB/s",
    },
    {
      id: "ureRate",
      type: "number",
      defaultValue: 1e14,
      min: 1e13,
      max: 1e16,
      step: 1e13,
    },
  ],

  inputGroups: [],

  // ===========================================================================
  // RESULTS
  // ===========================================================================
  results: [
    { id: "usableCapacity", type: "primary", format: "text" },
    { id: "overhead", type: "secondary", format: "text" },
    { id: "efficiency", type: "secondary", format: "percent" },
    { id: "faultTolerance", type: "secondary", format: "text" },
    { id: "totalCost", type: "secondary", format: "text" },
    { id: "costPerTB", type: "secondary", format: "text" },
    { id: "readIOPS", type: "secondary", format: "text" },
    { id: "writeIOPS", type: "secondary", format: "text" },
    { id: "readThroughput", type: "secondary", format: "text" },
    { id: "writeThroughput", type: "secondary", format: "text" },
    { id: "writePenalty", type: "secondary", format: "text" },
    { id: "rebuildTime", type: "secondary", format: "text" },
    { id: "ureRisk", type: "secondary", format: "text" },
  ],

  // ===========================================================================
  // INFO CARDS — 3 cards
  // ===========================================================================
  infoCards: [
    { id: "capacity", type: "list", icon: "💾", itemCount: 4 },
    { id: "performance", type: "list", icon: "⚡", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ===========================================================================
  // CHART — Capacity breakdown
  // ===========================================================================
  chart: {
    id: "capacityBreakdown",
    type: "bar",
    xKey: "label",
    height: 300,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "usable", color: "#10b981" },
      { key: "parity", color: "#f59e0b" },
    ],
  },

  // ===========================================================================
  // DETAILED TABLE — RAID levels comparison
  // ===========================================================================
  detailedTable: {
    id: "comparison",
    buttonLabel: "Compare RAID Levels",
    buttonIcon: "📊",
    modalTitle: "RAID Levels Comparison",
    columns: [
      { id: "level", label: "RAID Level", align: "left" },
      { id: "minDrives", label: "Min Drives", align: "center" },
      { id: "faultTolerance", label: "Fault Tolerance", align: "center" },
      { id: "efficiency", label: "Efficiency", align: "center" },
      { id: "readSpeed", label: "Read Speed", align: "center" },
      { id: "writeSpeed", label: "Write Speed", align: "center" },
      { id: "useCase", label: "Best For", align: "left" },
    ],
  },

  // ===========================================================================
  // REFERENCE DATA — Empty (use Dual List)
  // ===========================================================================
  referenceData: [],

  // ===========================================================================
  // EDUCATION SECTIONS — 5 (2 prose, 2 list, 1 code-example)
  // ===========================================================================
  educationSections: [
    { id: "whatIsRAID", type: "prose", icon: "📖" },
    { id: "raidLevelsExplained", type: "prose", icon: "🔍" },
    { id: "performanceFactors", type: "list", icon: "⚡", itemCount: 6 },
    { id: "choosingRAID", type: "list", icon: "✅", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "💡", columns: 2, exampleCount: 2 },
  ],

  // ===========================================================================
  // FAQS — 6
  // ===========================================================================
  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ],

  // ===========================================================================
  // REFERENCES — 2 (fuera de t, no se traducen)
  // ===========================================================================
  references: [
    {
      authors: "Patterson, D., Gibson, G., Katz, R.",
      year: "1988",
      title: "A Case for Redundant Arrays of Inexpensive Disks (RAID)",
      source: "ACM SIGMOD",
      url: "https://www.cs.cmu.edu/~garth/RAIDpaper/Patterson88.pdf",
    },
    {
      authors: "Schroeder, B., Gibson, G. A.",
      year: "2007",
      title: "Disk Failures in the Real World: What Does an MTTF of 1,000,000 Hours Mean to You?",
      source: "USENIX FAST",
      url: "https://www.usenix.org/legacy/events/fast07/tech/schroeder/schroeder.pdf",
    },
  ],

  // ===========================================================================
  // HERO / SIDEBAR / FEATURES / ADS
  // ===========================================================================
  hero: {
    badge: "Storage",
    rating: { average: 4.8, count: 890 },
  },
  sidebar: {},
  features: {},
  relatedCalculators: [],
  ads: {},
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateRAID(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;

  // --- Get translations ---
  const v = (t?.values as Record<string, string>) || {};

  // --- Read inputs ---
  const raidLevel = (values.raidLevel as string) || "5";
  const numDrives = (values.numDrives as number) || 4;
  let driveCapacity = (values.driveCapacity as number) || 4;
  const driveType = (values.driveType as string) || "HDD";
  const driveCost = (values.driveCost as number) || null;
  const drivesPerGroup = (values.drivesPerGroup as number) || 4;
  const rebuildSpeed = (values.rebuildSpeed as number) || 100;
  const ureRate = (values.ureRate as number) || 1e14;

  // --- Convert capacity to TB ---
  const capacityUnit = fieldUnits?.driveCapacity || "tb";
  if (capacityUnit === "gb") {
    driveCapacity = driveCapacity / 1000; // GB → TB
  }

  // --- Get currency symbol ---
  const currency = fieldUnits?.driveCost || "USD";
  const CURRENCY_SYMBOLS: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
    JPY: "¥", INR: "₹", CAD: "C$", AUD: "A$", CHF: "CHF ",
    COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  };
  const currencySymbol = CURRENCY_SYMBOLS[currency] || "$";

  // --- Validate minimum drives ---
  const minDrivesMap: Record<string, number> = {
    "0": 2,
    "1": 2,
    "1E": 3,
    "5": 3,
    "5E": 4,
    "5EE": 4,
    "6": 4,
    "10": 4,
    "50": 6,
    "60": 8,
  };

  const minDrives = minDrivesMap[raidLevel] || 2;
  if (numDrives < minDrives) {
    return {
      values: {},
      formatted: {},
      summary: `RAID ${raidLevel} requires minimum ${minDrives} drives. You have ${numDrives}.`,
      isValid: false,
    };
  }

  // --- Calculate usable capacity ---
  const totalCapacityTB = numDrives * driveCapacity;
  let usableCapacityTB = 0;
  let faultTolerance = v["none"] || "None";
  let efficiency = 0;

  switch (raidLevel) {
    case "0":
      usableCapacityTB = totalCapacityTB;
      efficiency = 100;
      faultTolerance = v["none"] || "None";
      break;
    case "1":
      usableCapacityTB = totalCapacityTB / 2;
      efficiency = 50;
      faultTolerance = `${numDrives - 1} ${v["drives"] || "drives"}`;
      break;
    case "1E":
      usableCapacityTB = totalCapacityTB / 2;
      efficiency = 50;
      faultTolerance = `1 ${v["drive"] || "drive"}`;
      break;
    case "5":
    case "5E":
    case "5EE":
      usableCapacityTB = (numDrives - 1) * driveCapacity;
      efficiency = ((numDrives - 1) / numDrives) * 100;
      faultTolerance = `1 ${v["drive"] || "drive"}`;
      break;
    case "6":
      usableCapacityTB = (numDrives - 2) * driveCapacity;
      efficiency = ((numDrives - 2) / numDrives) * 100;
      faultTolerance = `2 ${v["drives"] || "drives"}`;
      break;
    case "10":
      usableCapacityTB = totalCapacityTB / 2;
      efficiency = 50;
      faultTolerance = `1 ${v["drive"] || "drive"} per mirror`;
      break;
    case "50": {
      const groups = Math.floor(numDrives / drivesPerGroup);
      usableCapacityTB = groups * (drivesPerGroup - 1) * driveCapacity;
      efficiency = ((drivesPerGroup - 1) / drivesPerGroup) * 100;
      faultTolerance = `1 ${v["drive"] || "drive"} per group`;
      break;
    }
    case "60": {
      const groups = Math.floor(numDrives / drivesPerGroup);
      usableCapacityTB = groups * (drivesPerGroup - 2) * driveCapacity;
      efficiency = ((drivesPerGroup - 2) / drivesPerGroup) * 100;
      faultTolerance = `2 ${v["drives"] || "drives"} per group`;
      break;
    }
  }

  const overheadTB = totalCapacityTB - usableCapacityTB;

  // --- Performance metrics (IOPS and throughput) ---
  const driveIOPS: Record<string, { read: number; write: number; throughput: number }> = {
    HDD: { read: 150, write: 150, throughput: 200 },
    SSD: { read: 50000, write: 50000, throughput: 550 },
    NVMe: { read: 500000, write: 500000, throughput: 3500 },
  };

  const baseIOPS = driveIOPS[driveType] || driveIOPS.HDD;
  const baseThroughput = baseIOPS.throughput;

  let readIOPS = 0;
  let writeIOPS = 0;
  let readThroughput = 0;
  let writeThroughput = 0;
  let writePenalty = 1;

  switch (raidLevel) {
    case "0":
      readIOPS = baseIOPS.read * numDrives;
      writeIOPS = baseIOPS.write * numDrives;
      readThroughput = baseThroughput * numDrives;
      writeThroughput = baseThroughput * numDrives;
      writePenalty = 1;
      break;
    case "1":
    case "1E":
      readIOPS = baseIOPS.read * numDrives;
      writeIOPS = baseIOPS.write * (numDrives / 2);
      readThroughput = baseThroughput * numDrives;
      writeThroughput = baseThroughput * (numDrives / 2);
      writePenalty = 2;
      break;
    case "5":
    case "5E":
    case "5EE":
      readIOPS = baseIOPS.read * (numDrives - 1);
      writeIOPS = baseIOPS.write * (numDrives / 4);
      readThroughput = baseThroughput * (numDrives - 1);
      writeThroughput = baseThroughput * (numDrives / 4);
      writePenalty = 4;
      break;
    case "6":
      readIOPS = baseIOPS.read * (numDrives - 2);
      writeIOPS = baseIOPS.write * (numDrives / 6);
      readThroughput = baseThroughput * (numDrives - 2);
      writeThroughput = baseThroughput * (numDrives / 6);
      writePenalty = 6;
      break;
    case "10":
      readIOPS = baseIOPS.read * numDrives;
      writeIOPS = baseIOPS.write * (numDrives / 2);
      readThroughput = baseThroughput * numDrives;
      writeThroughput = baseThroughput * (numDrives / 2);
      writePenalty = 2;
      break;
    case "50": {
      const groups = Math.floor(numDrives / drivesPerGroup);
      readIOPS = baseIOPS.read * (drivesPerGroup - 1) * groups;
      writeIOPS = baseIOPS.write * ((drivesPerGroup / 4) * groups);
      readThroughput = baseThroughput * (drivesPerGroup - 1) * groups;
      writeThroughput = baseThroughput * ((drivesPerGroup / 4) * groups);
      writePenalty = 4;
      break;
    }
    case "60": {
      const groups = Math.floor(numDrives / drivesPerGroup);
      readIOPS = baseIOPS.read * (drivesPerGroup - 2) * groups;
      writeIOPS = baseIOPS.write * ((drivesPerGroup / 6) * groups);
      readThroughput = baseThroughput * (drivesPerGroup - 2) * groups;
      writeThroughput = baseThroughput * ((drivesPerGroup / 6) * groups);
      writePenalty = 6;
      break;
    }
  }

  // --- Rebuild time ---
  const rebuildDataTB = driveCapacity; // Rebuild 1 drive worth of data
  const rebuildDataMB = rebuildDataTB * 1000 * 1000;
  const rebuildTimeSeconds = rebuildDataMB / rebuildSpeed;
  const rebuildHours = rebuildTimeSeconds / 3600;

  let rebuildTimeFormatted = "";
  if (rebuildHours < 1) {
    rebuildTimeFormatted = `${Math.round(rebuildTimeSeconds / 60)} ${v["minutes"] || "minutes"}`;
  } else {
    rebuildTimeFormatted = `${rebuildHours.toFixed(1)} ${v["hours"] || "hours"}`;
  }

  // --- URE risk ---
  const bitsRead = rebuildDataTB * 8 * 1e12; // TB to bits
  const expectedUREs = bitsRead / ureRate;
  let ureRiskLabel = v["low"] || "Low";
  if (expectedUREs > 1) {
    ureRiskLabel = v["veryHigh"] || "Very High";
  } else if (expectedUREs > 0.5) {
    ureRiskLabel = v["high"] || "High";
  } else if (expectedUREs > 0.1) {
    ureRiskLabel = v["moderate"] || "Moderate";
  }

  // --- Cost ---
  let totalCost = 0;
  let costPerTB = 0;
  let totalCostFormatted = "-";
  let costPerTBFormatted = "-";

  if (driveCost !== null) {
    totalCost = numDrives * driveCost;
    costPerTB = totalCost / usableCapacityTB;
    totalCostFormatted = `${currencySymbol}${totalCost.toLocaleString("en-US")}`;
    costPerTBFormatted = `${currencySymbol}${costPerTB.toFixed(2)}/TB`;
  }

  // --- Format numbers ---
  function fmtNum(val: number): string {
    if (val === 0) return "0";
    if (val < 1000) return val.toFixed(1).replace(/\.0$/, "");
    if (val < 1e6) return (val / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
    if (val < 1e9) return (val / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    return (val / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  }

  // --- Summary ---
  const summary = `RAID ${raidLevel} with ${numDrives} × ${driveCapacity} TB drives provides ${usableCapacityTB.toFixed(1)} TB of usable capacity (${efficiency.toFixed(0)}% efficient) with ${faultTolerance} fault tolerance. Read/Write IOPS: ${fmtNum(readIOPS)}/${fmtNum(writeIOPS)}. Rebuild time: ${rebuildTimeFormatted}. URE risk: ${ureRiskLabel}.`;

  // --- Chart data ---
  const chartData = [
    {
      label: "Capacity",
      usable: usableCapacityTB,
      parity: overheadTB,
    },
  ];

  // --- DetailedTable data ---
  const tableData = [
    {
      level: "RAID 0",
      minDrives: "2",
      faultTolerance: "None",
      efficiency: "100%",
      readSpeed: "Excellent",
      writeSpeed: "Excellent",
      useCase: "Temp storage, caching",
    },
    {
      level: "RAID 1",
      minDrives: "2",
      faultTolerance: "N-1 drives",
      efficiency: "50%",
      readSpeed: "Good",
      writeSpeed: "Good",
      useCase: "Boot drives, critical data",
    },
    {
      level: "RAID 5",
      minDrives: "3",
      faultTolerance: "1 drive",
      efficiency: "67-93%",
      readSpeed: "Good",
      writeSpeed: "Fair",
      useCase: "SMB file servers",
    },
    {
      level: "RAID 6",
      minDrives: "4",
      faultTolerance: "2 drives",
      efficiency: "50-88%",
      readSpeed: "Good",
      writeSpeed: "Fair",
      useCase: "Large arrays > 8 drives",
    },
    {
      level: "RAID 10",
      minDrives: "4",
      faultTolerance: "1 per mirror",
      efficiency: "50%",
      readSpeed: "Excellent",
      writeSpeed: "Good",
      useCase: "Databases, VMs",
    },
    {
      level: "RAID 50",
      minDrives: "6",
      faultTolerance: "1 per group",
      efficiency: "67-93%",
      readSpeed: "Excellent",
      writeSpeed: "Good",
      useCase: "High I/O, scale",
    },
    {
      level: "RAID 60",
      minDrives: "8",
      faultTolerance: "2 per group",
      efficiency: "50-88%",
      readSpeed: "Excellent",
      writeSpeed: "Good",
      useCase: "Enterprise, critical",
    },
  ];

  // --- Return ---
  return {
    values: {
      usableCapacity: usableCapacityTB,
      overhead: overheadTB,
      efficiency: efficiency,
      faultTolerance: faultTolerance,
      totalCost: totalCost,
      costPerTB: costPerTB,
      readIOPS: readIOPS,
      writeIOPS: writeIOPS,
      readThroughput: readThroughput,
      writeThroughput: writeThroughput,
      writePenalty: writePenalty,
      rebuildTime: rebuildHours,
      ureRisk: expectedUREs,
    },
    formatted: {
      usableCapacity: `${usableCapacityTB.toFixed(1)} TB`,
      overhead: `${overheadTB.toFixed(1)} TB`,
      efficiency: `${efficiency.toFixed(1)}%`,
      faultTolerance: faultTolerance,
      totalCost: totalCostFormatted,
      costPerTB: costPerTBFormatted,
      readIOPS: fmtNum(readIOPS),
      writeIOPS: fmtNum(writeIOPS),
      readThroughput: `${fmtNum(readThroughput)} MB/s`,
      writeThroughput: `${fmtNum(writeThroughput)} MB/s`,
      writePenalty: `${writePenalty}×`,
      rebuildTime: rebuildTimeFormatted,
      ureRisk: ureRiskLabel,
      totalCapacity: `${totalCapacityTB.toFixed(1)} TB`,
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default raidConfig;
