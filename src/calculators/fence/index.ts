import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

// ─── Fence Calculator Config ────────────────────────────────────────────────

export const fenceCalculatorConfig: CalculatorConfigV4 = {
  id: "fence-calculator",
  version: "4.0",
  category: "home",
  icon: "🏗️",

  presets: [
    {
      id: "privacyFence6ft",
      icon: "🚪",
      values: {
        fenceStyle: "wood",
        fenceLength: 150,
        fenceHeight: 6,
        postSpacing: 8,
        boardStyle: "sideBySide",
        picketWidth: 5.5,
        picketSpacing: 0,
        railsPerSection: 2,
        numberOfGates: 1,
        gateWidth: 4,
        includeConcreteEstimate: true,
        postSize: "4x4",
        estimateCost: false,
        boardCost: null,
        postCost: null,
        concreteBagCost: null,
      },
    },
    {
      id: "picketFence4ft",
      icon: "⚏",
      values: {
        fenceStyle: "wood",
        fenceLength: 100,
        fenceHeight: 4,
        postSpacing: 8,
        boardStyle: "spaced",
        picketWidth: 3.5,
        picketSpacing: 2.5,
        railsPerSection: 2,
        numberOfGates: 1,
        gateWidth: 3,
        includeConcreteEstimate: true,
        postSize: "4x4",
        estimateCost: false,
        boardCost: null,
        postCost: null,
        concreteBagCost: null,
      },
    },
    {
      id: "shadowbox6ft",
      icon: "🪵",
      values: {
        fenceStyle: "wood",
        fenceLength: 200,
        fenceHeight: 6,
        postSpacing: 8,
        boardStyle: "shadowbox",
        picketWidth: 5.5,
        picketSpacing: 1.5,
        railsPerSection: 3,
        numberOfGates: 1,
        gateWidth: 4,
        includeConcreteEstimate: true,
        postSize: "4x4",
        estimateCost: false,
        boardCost: null,
        postCost: null,
        concreteBagCost: null,
      },
    },
    {
      id: "tallPrivacy8ft",
      icon: "🏰",
      values: {
        fenceStyle: "wood",
        fenceLength: 120,
        fenceHeight: 8,
        postSpacing: 8,
        boardStyle: "sideBySide",
        picketWidth: 5.5,
        picketSpacing: 0,
        railsPerSection: 3,
        numberOfGates: 1,
        gateWidth: 4,
        includeConcreteEstimate: true,
        postSize: "4x4",
        estimateCost: true,
        boardCost: 3.5,
        postCost: 12,
        concreteBagCost: 5.5,
      },
    },
    {
      id: "chainLink",
      icon: "⛓️",
      values: {
        fenceStyle: "chainLink",
        fenceLength: 150,
        fenceHeight: 4,
        postSpacing: 10,
        boardStyle: "sideBySide",
        picketWidth: 5.5,
        picketSpacing: 0,
        railsPerSection: 1,
        numberOfGates: 1,
        gateWidth: 4,
        includeConcreteEstimate: true,
        postSize: "roundMetal",
        estimateCost: false,
        boardCost: null,
        postCost: null,
        concreteBagCost: null,
      },
    },
  ],

  t: {
    en: {
      name: "Fence Calculator",
      slug: "fence-calculator",
      subtitle:
        "Calculate posts, pickets, rails, concrete, and materials needed for wood, chain link, or vinyl fencing projects.",
      breadcrumb: "Fence Calc",

      seo: {
        title: "Fence Calculator - Posts, Pickets & Materials | Free Tool",
        description:
          "Calculate how many fence posts, pickets, rails, and bags of concrete you need. Supports privacy, picket, shadowbox, and chain link styles with gate allowance and cost estimates.",
        shortDescription:
          "Estimate fence materials: posts, pickets, rails, concrete, and cost.",
        keywords: [
          "fence calculator",
          "how many fence pickets do i need",
          "fence post calculator",
          "fence material calculator",
          "wood fence calculator",
          "privacy fence estimator",
          "fence cost calculator",
          "fence board calculator",
        ],
      },

      calculator: { yourInformation: "Fence Details" },
      ui: {
        yourInformation: "Fence Details",
        calculate: "Calculate Materials",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        fenceStyle: {
          label: "Fence Style",
          helpText: "Select the type of fence you are building",
          options: {
            wood: "Wood",
            chainLink: "Chain Link",
            vinyl: "Vinyl",
          },
        },
        fenceLength: {
          label: "Total Fence Length",
          helpText:
            "Measure the entire perimeter to be fenced. Gate openings will be subtracted automatically",
        },
        fenceHeight: {
          label: "Fence Height",
          helpText:
            "Standard privacy fences are 6 ft. Picket fences are typically 3-4 ft. Check local codes for height limits",
        },
        postSpacing: {
          label: "Post Spacing",
          helpText:
            "Distance between post centers. Standard is 8 ft for wood, up to 10 ft for chain link. Shorter spacing = stronger fence",
        },
        boardStyle: {
          label: "Board Style",
          helpText:
            "Side-by-side (privacy): no gaps. Spaced (picket): decorative gaps. Shadowbox: alternating boards on both sides",
          options: {
            sideBySide: "Side-by-Side (Privacy)",
            spaced: "Spaced (Picket/Decorative)",
            shadowbox: "Shadowbox (Board-on-Board)",
          },
        },
        picketWidth: {
          label: "Picket / Board Width",
          helpText:
            'Common sizes: 3.5" (1×4 actual), 5.5" (1×6 actual). Measure the actual width of your boards',
        },
        picketSpacing: {
          label: "Gap Between Boards",
          helpText:
            'Set to 0 for privacy fence (no gaps). Typical picket spacing: 2-3". Shadowbox overlap: 1-1.5"',
        },
        railsPerSection: {
          label: "Rails Per Section",
          helpText:
            "Horizontal rails between posts. Use 2 for fences ≤6 ft, 3 for 6-8 ft, 4 for 8+ ft",
        },
        numberOfGates: {
          label: "Number of Gates",
          helpText: "Walk gates are typically 3-4 ft wide. Drive gates are 10-16 ft wide",
        },
        gateWidth: {
          label: "Gate Width",
          helpText:
            "Width of each gate opening. The calculator adds 2 extra posts per gate for gate hardware",
        },
        includeConcreteEstimate: {
          label: "Include Concrete for Posts",
          helpText:
            "Calculate bags of concrete needed to set posts. Standard is 1-2 bags per post depending on size",
        },
        postSize: {
          label: "Post Size",
          helpText: "4×4 is standard for most wood fences. 6×6 recommended for gate posts and tall fences",
          options: {
            "4x4": '4×4 (3.5" actual)',
            "6x6": '6×6 (5.5" actual)',
            roundMetal: 'Round Metal (2-3/8" OD)',
          },
        },
        estimateCost: {
          label: "Estimate Material Cost",
          helpText: "Calculate approximate material costs for your fence project",
        },
        boardCost: {
          label: "Cost Per Board",
          helpText: "Price per picket/board at your local supplier",
        },
        postCost: {
          label: "Cost Per Post",
          helpText: "Price per fence post. Pressure-treated 4×4×8 typically $8-15",
        },
        concreteBagCost: {
          label: "Cost Per Concrete Bag",
          helpText: "Price per 80 lb bag of concrete mix. Typically $4-7",
        },
      },

      results: {
        numberOfPosts: { label: "Total Posts" },
        numberOfPickets: { label: "Pickets / Boards" },
        numberOfRails: { label: "Rails" },
        postLength: { label: "Post Length" },
        concreteBags: { label: "Concrete Bags" },
        totalLinearFt: { label: "Fence Length" },
        totalCost: { label: "Est. Material Cost" },
      },

      presets: {
        privacyFence6ft: {
          label: "6ft Privacy Fence",
          description: '150 ft, 5.5" boards, no gaps, 1 gate',
        },
        picketFence4ft: {
          label: "4ft Picket Fence",
          description: '100 ft, 3.5" pickets, 2.5" spacing',
        },
        shadowbox6ft: {
          label: "6ft Shadowbox",
          description: '200 ft, board-on-board, 1.5" overlap, 3 rails',
        },
        tallPrivacy8ft: {
          label: "8ft Tall Privacy",
          description: "120 ft, 3 rails, with cost estimate",
        },
        chainLink: {
          label: "Chain Link",
          description: "150 ft, 4 ft tall, 10 ft spacing",
        },
      },

      values: {
        posts: "posts",
        post: "post",
        boards: "boards",
        board: "board",
        rails: "rails",
        rail: "rail",
        bags: "bags",
        bag: "bag",
        ft: "ft",
        in: "in",
        sections: "sections",
        screws: "screws",
        lbBags: "80 lb bags",
      },

      formats: {
        summary:
          "Your {length} ft fence needs {posts} posts, {pickets} boards, {rails} rails, and {concrete} bags of concrete.",
      },

      infoCards: {
        structure: {
          title: "Fence Structure",
          items: [
            { label: "Total Posts", valueKey: "numberOfPosts" },
            { label: "Fence Sections", valueKey: "numberOfSections" },
            { label: "Post Length (buried)", valueKey: "postLength" },
            { label: "Effective Length", valueKey: "effectiveLength" },
          ],
        },
        materials: {
          title: "Materials List",
          items: [
            { label: "Pickets / Boards", valueKey: "numberOfPickets" },
            { label: "Rails", valueKey: "numberOfRails" },
            { label: "Concrete (80 lb bags)", valueKey: "concreteBags" },
            { label: "Screws / Nails", valueKey: "fasteners" },
          ],
        },
        tips: {
          title: "Building Tips",
          items: [
            "Bury posts at least 1/3 of the total post length below ground. For a 6 ft fence, set posts 2 ft deep (8 ft total post length).",
            "Use pressure-treated lumber rated for ground contact (UC4A or higher) for all posts. Standard pressure treatment is not rated for direct soil contact.",
            "Place 3-4 inches of gravel at the bottom of each post hole for drainage before adding concrete. Standing water at the post base causes premature rot.",
            "Let concrete cure 24-48 hours before attaching rails and pickets. Full cure takes 7 days — avoid heavy stress on posts during this period.",
          ],
        },
      },

      chart: {
        title: "Material Cost Breakdown",
        xLabel: "Material",
        yLabel: "Cost ($)",
        series: {
          cost: "Estimated Cost",
        },
      },

      education: {
        whatIs: {
          title: "What Is a Fence Calculator?",
          content:
            "A fence calculator estimates the exact number of posts, pickets (boards), rails, concrete bags, and fasteners needed for your fencing project. Rather than making rough guesses at the lumber yard, an accurate material list prevents costly return trips for missing materials or waste from over-buying. This calculator handles the geometry that trips up most DIYers: accounting for gate openings, calculating post depth based on fence height, adjusting picket count for different board widths and spacing, and estimating concrete volume for setting posts. It supports multiple fence styles including privacy (side-by-side boards), picket (spaced boards), and shadowbox (alternating boards on both sides). Whether you're fencing a small backyard or an entire property perimeter, accurate material estimates keep your project on budget and on schedule.",
        },
        howItWorks: {
          title: "How Fence Material Estimation Works",
          content:
            "The calculation starts with total fence length minus gate openings to get the effective fence length. Posts are then calculated by dividing the effective length by post spacing and adding 1 (for the end post), plus 2 extra posts per gate (gate posts are often 6×6 for hardware support). The number of sections equals posts minus 1. Rails per section (typically 2 for fences under 6 ft, 3 for 6-8 ft) are multiplied by sections for total rails. Pickets are calculated by dividing the total effective length (in inches) by the combined width of one picket plus one gap. For shadowbox style, the picket count is roughly doubled since boards are installed on alternating sides. Post length equals fence height plus burial depth — the standard rule is 1/3 of total post length underground, so a 6 ft fence uses 8 ft posts (6 ft above + 2 ft buried). Concrete per post depends on hole diameter (typically 3× post width) and depth, with 1-2 bags of 80 lb concrete mix per post being standard.",
        },
        considerations: {
          title: "Key Building Considerations",
          items: [
            {
              text: "Check local building codes and HOA rules before starting. Many municipalities require permits for fences over 4 ft and have setback requirements from property lines (often 2-6 inches).",
              type: "warning",
            },
            {
              text: "Call 811 (free utility locating service) at least 48 hours before digging post holes. Hitting underground gas, water, or electric lines is dangerous and expensive.",
              type: "warning",
            },
            {
              text: "Post spacing affects fence strength. 8 ft is standard for wood fences, but reduce to 6 ft in high-wind areas or for fences over 6 ft tall. Chain link can span up to 10 ft between posts.",
              type: "info",
            },
            {
              text: "Gate posts take the most stress. Use 6×6 posts for gates even if the rest of the fence uses 4×4. Set gate posts 6 inches deeper and use 2 bags of concrete instead of 1.",
              type: "info",
            },
            {
              text: "Pressure-treated wood needs 6-12 months to dry before staining. Apply a water-repellent preservative immediately after building, then stain the following year for best results.",
              type: "info",
            },
            {
              text: "Shadowbox fences use nearly double the pickets but provide privacy from both sides and look equally good from either side — important when local codes require the 'good side' to face neighbors.",
              type: "info",
            },
          ],
        },
        categories: {
          title: "Fence Styles & Uses",
          items: [
            {
              text: "Privacy Fence (Side-by-Side): Boards placed flush with no gaps. Provides complete visual and wind blocking. Most popular residential style. 6 ft is the standard height for maximum privacy.",
              type: "info",
            },
            {
              text: "Picket Fence (Spaced): Boards with gaps for a decorative, open look. Classic American style at 3-4 ft height. Defines boundaries without blocking views or airflow.",
              type: "info",
            },
            {
              text: "Shadowbox (Board-on-Board): Alternating boards on both sides of the rails with slight overlap. Provides privacy while allowing airflow, reducing wind load. Looks equally finished from both sides.",
              type: "info",
            },
            {
              text: "Chain Link: Steel mesh fabric attached to metal posts. Most affordable per foot. Low maintenance. Available with privacy slats or vinyl coating. Best for property boundaries and pet containment.",
              type: "info",
            },
            {
              text: "Vinyl/PVC: Maintenance-free, never needs painting or staining. Resistant to rot, insects, and fading. Higher upfront cost but lowest lifetime cost. Available in privacy, semi-privacy, and picket styles.",
              type: "info",
            },
            {
              text: "Horizontal Board: Modern/contemporary style with boards running horizontally between posts. Uses the same materials as vertical fences but requires closer post spacing (6 ft max) to prevent board sagging.",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Fence Calculation Examples",
          description: "Step-by-step examples for common projects",
          examples: [
            {
              title: '100 ft Privacy Fence, 6 ft tall, 5.5" boards, 1 gate (4 ft)',
              steps: [
                "Effective length = 100 - (1 × 4) = 96 ft",
                "Posts = ceil(96 ÷ 8) + 1 + (1 × 2) = 12 + 1 + 2 = 15 posts",
                "Sections = 15 - 1 - 1 = 13 fence sections (excluding gate)",
                "Rails = 13 × 2 = 26 rails",
                "Pickets = ceil(96 × 12 ÷ 5.5) = ceil(209.5) = 210 boards",
                "Post length = 6 + 2 = 8 ft (1/3 buried)",
                "Concrete = 15 × 1.5 = ~23 bags (80 lb)",
              ],
              result:
                "Buy 15 posts (8 ft), 210 boards, 26 rails, 23 concrete bags.",
            },
            {
              title: '60 ft Shadowbox, 6 ft tall, 5.5" boards, 1.5" overlap',
              steps: [
                "Effective length = 60 ft (no gates)",
                "Posts = ceil(60 ÷ 8) + 1 = 8 + 1 = 9 posts",
                "Sections = 9 - 1 = 8 fence sections",
                "Rails = 8 × 3 = 24 rails",
                "Front pickets = ceil(60 × 12 ÷ (5.5 + 1.5)) = ceil(103) = 103",
                "Back pickets = ~103 (same count, alternating)",
                "Total pickets = 103 + 103 = 206 boards",
                "Concrete = 9 × 1.5 = ~14 bags",
              ],
              result:
                "Buy 9 posts, 206 boards, 24 rails, 14 concrete bags.",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How deep should fence posts be buried?",
          answer:
            "The general rule is to bury 1/3 of the total post length. For a 6 ft fence, use 8 ft posts and bury 2 ft. For an 8 ft fence, use 12 ft posts and bury 4 ft (or at minimum 3 ft). In cold climates, posts should extend below the frost line to prevent heaving — check local building codes for your area's frost depth. Always place 3-4 inches of gravel at the bottom of the hole for drainage, then fill with concrete to within 1-2 inches of ground level, sloped away from the post to shed water.",
        },
        {
          question: "How many bags of concrete per fence post?",
          answer:
            "For standard 4×4 posts in 8-inch diameter holes buried 24 inches deep, plan for 1 to 1.5 bags (80 lb) of pre-mixed concrete per post. For 6×6 gate posts or deeper holes, use 2 bags per post. A quick formula: a hole 8\" wide × 24\" deep uses about 0.6 cubic feet of concrete — one 80 lb bag yields approximately 0.6 cubic feet. If your soil is very sandy or loose, you may need slightly more to fill voids.",
        },
        {
          question: "What's the best post spacing for a wood fence?",
          answer:
            "8 feet on center is the standard for most wood fences using standard 8-ft rails. This provides a good balance of strength, material efficiency, and appearance. In high-wind areas, heavy snow regions, or for fences over 6 ft tall, reduce spacing to 6 ft for added strength. Chain link fences can use 10 ft spacing because the mesh fabric distributes wind load across the entire fence rather than concentrating it on each section.",
        },
        {
          question: "How do I calculate boards for a shadowbox fence?",
          answer:
            "A shadowbox fence has boards on both sides of the rails, offset so each side's boards cover the gaps of the other side. The total picket count is approximately double that of a standard privacy fence. Each side uses slightly fewer boards than a privacy fence because there's spacing between boards, but the two sides combined use more total wood. For example, if a privacy fence needs 200 boards, a shadowbox with 1.5\" spacing between boards needs approximately 340-380 total boards (slightly less than double because of the spacing).",
        },
        {
          question: "Should I use 4×4 or 6×6 fence posts?",
          answer:
            "4×4 posts (actual 3.5×3.5 inches) are standard for most residential fences up to 6 ft tall with 8 ft post spacing. Use 6×6 posts (actual 5.5×5.5 inches) for gate posts (they bear the most stress from gate weight and swinging), corner posts, fences over 6 ft tall, and in high-wind areas. Some builders use 6×6 for all posts on premium fences — the extra width provides significantly more strength and looks more substantial.",
        },
        {
          question: "How do gates affect the material calculation?",
          answer:
            "Gates reduce the amount of fencing material needed (the gate opening doesn't need pickets or rails) but add posts. Each gate requires 2 dedicated gate posts — these are often 6×6 for strength, even if the rest of the fence uses 4×4. The calculator subtracts gate widths from the total fence length for picket and rail calculations, then adds 2 posts per gate. Gate hardware (hinges, latch, spring) is separate and typically costs $15-40 per gate for standard walk gates.",
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
        calculate: "Calculate Materials",
        reset: "Reset",
        pdf: "PDF",
        csv: "CSV",
        excel: "Excel",
        save: "Save",
        saved: "Saved",
        saving: "Saving...",
      },

      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: {
        mobileResults: "Results",
        closeModal: "Close",
        openMenu: "Menu",
      },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de Cercas",
      "slug": "calculadora-cercas",
      "subtitle": "Calcula postes, tablones, rieles, concreto y materiales necesarios para proyectos de cercas de madera, malla ciclónica o vinilo.",
      "breadcrumb": "Calc Cercas",
      "seo": {
        "title": "Calculadora de Cercas - Postes, Tablones y Materiales | Herramienta Gratis",
        "description": "Calcula cuántos postes, tablones, rieles y sacos de concreto necesitas para tu cerca. Compatible con estilos de privacidad, estacas, sombreado y malla ciclónica con espacio para portones y estimación de costos.",
        "shortDescription": "Estima materiales para cercas: postes, tablones, rieles, concreto y costo.",
        "keywords": [
          "calculadora de cercas",
          "cuántos tablones de cerca necesito",
          "calculadora de postes de cerca",
          "calculadora de materiales para cercas",
          "calculadora de cerca de madera",
          "estimador de cerca de privacidad",
          "calculadora de costo de cercas",
          "calculadora de tablones de cerca"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "fenceStyle": {
          "label": "Estilo de Cerca",
          "helpText": "Selecciona el tipo de cerca que vas a construir",
          "options": {
            "wood": "Madera",
            "chainLink": "Malla Ciclónica",
            "vinyl": "Vinilo"
          }
        },
        "fenceLength": {
          "label": "Longitud Total de la Cerca",
          "helpText": "Mide todo el perímetro a cercar. Las aberturas de portones se restarán automáticamente"
        },
        "fenceHeight": {
          "label": "Altura de la Cerca",
          "helpText": "Las cercas de privacidad estándar son de 6 pies. Las cercas de estacas típicamente son de 3-4 pies. Verifica códigos locales para límites de altura"
        },
        "postSpacing": {
          "label": "Espaciado de Postes",
          "helpText": "Distancia entre centros de postes. Estándar es 8 pies para madera, hasta 10 pies para malla ciclónica. Menor espaciado = cerca más fuerte"
        },
        "boardStyle": {
          "label": "Estilo de Tablones",
          "helpText": "Lado a lado (privacidad): sin espacios. Espaciado (estacas): espacios decorativos. Sombreado: tablones alternados en ambos lados",
          "options": {
            "sideBySide": "Lado a Lado (Privacidad)",
            "spaced": "Espaciado (Estacas/Decorativo)",
            "shadowbox": "Sombreado (Tablón sobre Tablón)"
          }
        },
        "picketWidth": {
          "label": "Ancho de Estaca / Tablón",
          "helpText": "Tamaños comunes: 3.5\" (1×4 real), 5.5\" (1×6 real). Mide el ancho real de tus tablones"
        },
        "picketSpacing": {
          "label": "Espacio Entre Tablones",
          "helpText": "Pon 0 para cerca de privacidad (sin espacios). Espaciado típico de estacas: 2-3\". Superposición sombreado: 1-1.5\""
        },
        "railsPerSection": {
          "label": "Rieles Por Sección",
          "helpText": "Rieles horizontales entre postes. Usa 2 para cercas ≤6 pies, 3 para 6-8 pies, 4 para 8+ pies"
        },
        "numberOfGates": {
          "label": "Número de Portones",
          "helpText": "Portones peatonales típicamente son de 3-4 pies de ancho. Portones vehiculares son de 10-16 pies de ancho"
        },
        "gateWidth": {
          "label": "Ancho del Portón",
          "helpText": "Ancho de cada abertura de portón. La calculadora agrega 2 postes extra por portón para herrajes"
        },
        "includeConcreteEstimate": {
          "label": "Incluir Concreto para Postes",
          "helpText": "Calcula sacos de concreto necesarios para fijar postes. Estándar es 1-2 sacos por poste según el tamaño"
        },
        "postSize": {
          "label": "Tamaño del Poste",
          "helpText": "4×4 es estándar para la mayoría de cercas de madera. 6×6 recomendado para postes de portón y cercas altas",
          "options": {
            "4x4": "4×4 (3.5\" real)",
            "6x6": "6×6 (5.5\" real)",
            "roundMetal": "Metal Redondo (2-3/8\" DE)"
          }
        },
        "estimateCost": {
          "label": "Estimar Costo de Materiales",
          "helpText": "Calcula costos aproximados de materiales para tu proyecto de cerca"
        },
        "boardCost": {
          "label": "Costo Por Tablón",
          "helpText": "Precio por estaca/tablón en tu proveedor local"
        },
        "postCost": {
          "label": "Costo Por Poste",
          "helpText": "Precio por poste de cerca. 4×4×8 tratado a presión típicamente $8-15"
        },
        "concreteBagCost": {
          "label": "Costo Por Saco de Concreto",
          "helpText": "Precio por saco de 80 libras de mezcla de concreto. Típicamente $4-7"
        }
      },
      "results": {
        "numberOfPosts": {
          "label": "Total de Postes"
        },
        "numberOfPickets": {
          "label": "Estacas / Tablones"
        },
        "numberOfRails": {
          "label": "Rieles"
        },
        "postLength": {
          "label": "Longitud del Poste"
        },
        "concreteBags": {
          "label": "Sacos de Concreto"
        },
        "totalLinearFt": {
          "label": "Longitud de Cerca"
        },
        "totalCost": {
          "label": "Costo Est. Materiales"
        }
      },
      "presets": {
        "privacyFence6ft": {
          "label": "Cerca Privacidad 6 pies",
          "description": "150 pies, tablones 5.5\", sin espacios, 1 portón"
        },
        "picketFence4ft": {
          "label": "Cerca Estacas 4 pies",
          "description": "100 pies, estacas 3.5\", espaciado 2.5\""
        },
        "shadowbox6ft": {
          "label": "Sombreado 6 pies",
          "description": "200 pies, tablón sobre tablón, superposición 1.5\", 3 rieles"
        },
        "tallPrivacy8ft": {
          "label": "Privacidad Alta 8 pies",
          "description": "120 pies, 3 rieles, con estimación de costo"
        },
        "chainLink": {
          "label": "Malla Ciclónica",
          "description": "150 pies, 4 pies de alto, espaciado 10 pies"
        }
      },
      "values": {
        "posts": "postes",
        "post": "poste",
        "boards": "tablones",
        "board": "tablón",
        "rails": "rieles",
        "rail": "riel",
        "bags": "sacos",
        "bag": "saco",
        "ft": "pies",
        "in": "pulg",
        "sections": "secciones",
        "screws": "tornillos",
        "lbBags": "sacos 80 lb"
      },
      "formats": {
        "summary": "Tu cerca de {length} pies necesita {posts} postes, {pickets} tablones, {rails} rieles y {concrete} sacos de concreto."
      },
      "infoCards": {
        "structure": {
          "title": "Estructura de la Cerca",
          "items": [
            {
              "label": "Total de Postes",
              "valueKey": "numberOfPosts"
            },
            {
              "label": "Secciones de Cerca",
              "valueKey": "numberOfSections"
            },
            {
              "label": "Longitud Poste (enterrado)",
              "valueKey": "postLength"
            },
            {
              "label": "Longitud Efectiva",
              "valueKey": "effectiveLength"
            }
          ]
        },
        "materials": {
          "title": "Lista de Materiales",
          "items": [
            {
              "label": "Estacas / Tablones",
              "valueKey": "numberOfPickets"
            },
            {
              "label": "Rieles",
              "valueKey": "numberOfRails"
            },
            {
              "label": "Concreto (sacos 80 lb)",
              "valueKey": "concreteBags"
            },
            {
              "label": "Tornillos / Clavos",
              "valueKey": "fasteners"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Construcción",
          "items": [
            "Entierra los postes al menos 1/3 de la longitud total del poste bajo tierra. Para una cerca de 6 pies, fija los postes a 2 pies de profundidad (8 pies de longitud total del poste).",
            "Usa madera tratada a presión clasificada para contacto con el suelo (UC4A o superior) para todos los postes. El tratamiento a presión estándar no está clasificado para contacto directo con el suelo.",
            "Coloca 3-4 pulgadas de grava en el fondo de cada hoyo de poste para drenaje antes de agregar concreto. El agua estancada en la base del poste causa pudrición prematura.",
            "Deja que el concreto cure 24-48 horas antes de colocar rieles y estacas. El curado completo toma 7 días — evita estrés pesado en los postes durante este período."
          ]
        }
      },
      "chart": {
        "title": "Desglose de Costos de Materiales",
        "xLabel": "Material",
        "yLabel": "Costo ($)",
        "series": {
          "cost": "Costo Estimado"
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué Es una Calculadora de Cercas?",
          "content": "Una calculadora de cercas estima el número exacto de postes, estacas (tablones), rieles, sacos de concreto y sujetadores necesarios para tu proyecto de cercado. En lugar de hacer estimaciones aproximadas en la maderería, una lista precisa de materiales previene costosos viajes de regreso por materiales faltantes o desperdicio por comprar de más. Esta calculadora maneja la geometría que confunde a la mayoría de los aficionados al bricolaje: considerar aberturas de portones, calcular profundidad de postes basada en altura de cerca, ajustar conteo de estacas para diferentes anchos y espaciado de tablones, y estimar volumen de concreto para fijar postes. Compatible con múltiples estilos de cerca incluyendo privacidad (tablones lado a lado), estacas (tablones espaciados) y sombreado (tablones alternados en ambos lados). Ya sea que estés cercando un patio pequeño o todo el perímetro de una propiedad, estimaciones precisas de materiales mantienen tu proyecto dentro del presupuesto y en horario."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Estimación de Materiales para Cercas",
          "content": "El cálculo comienza con la longitud total de la cerca menos las aberturas de portones para obtener la longitud efectiva de la cerca. Los postes se calculan dividiendo la longitud efectiva por el espaciado de postes y agregando 1 (para el poste final), más 2 postes extra por portón (los postes de portón a menudo son 6×6 para soporte de herrajes). El número de secciones equivale a postes menos 1. Los rieles por sección (típicamente 2 para cercas bajo 6 pies, 3 para 6-8 pies) se multiplican por secciones para total de rieles. Las estacas se calculan dividiendo la longitud efectiva total (en pulgadas) por el ancho combinado de una estaca más un espacio. Para estilo sombreado, el conteo de estacas se duplica aproximadamente ya que los tablones se instalan en lados alternados. La longitud del poste equivale a altura de cerca más profundidad de entierro — la regla estándar es 1/3 de longitud total del poste bajo tierra, así que una cerca de 6 pies usa postes de 8 pies (6 pies arriba + 2 pies enterrados). El concreto por poste depende del diámetro del hoyo (típicamente 3× ancho del poste) y profundidad, con 1-2 sacos de mezcla de concreto de 80 lb por poste siendo estándar."
        },
        "considerations": {
          "title": "Consideraciones Clave de Construcción",
          "items": [
            {
              "text": "Verifica códigos de construcción locales y reglas de asociaciones de propietarios antes de comenzar. Muchos municipios requieren permisos para cercas sobre 4 pies y tienen requisitos de retroceso desde líneas de propiedad (a menudo 2-6 pulgadas).",
              "type": "warning"
            },
            {
              "text": "Llama al 811 (servicio gratuito de localización de servicios) al menos 48 horas antes de cavar hoyos de postes. Golpear líneas subterráneas de gas, agua o electricidad es peligroso y costoso.",
              "type": "warning"
            },
            {
              "text": "El espaciado de postes afecta la fuerza de la cerca. 8 pies es estándar para cercas de madera, pero reduce a 6 pies en áreas de viento fuerte o para cercas sobre 6 pies de alto. La malla ciclónica puede abarcar hasta 10 pies entre postes.",
              "type": "info"
            },
            {
              "text": "Los postes de portón reciben el mayor estrés. Usa postes 6×6 para portones aunque el resto de la cerca use 4×4. Fija postes de portón 6 pulgadas más profundo y usa 2 sacos de concreto en lugar de 1.",
              "type": "info"
            },
            {
              "text": "La madera tratada a presión necesita 6-12 meses para secarse antes de teñirse. Aplica un preservativo repelente al agua inmediatamente después de construir, luego tiñe el año siguiente para mejores resultados.",
              "type": "info"
            },
            {
              "text": "Las cercas sombreado usan casi el doble de estacas pero proporcionan privacidad desde ambos lados y se ven igualmente bien desde cualquier lado — importante cuando códigos locales requieren que el 'lado bueno' mire hacia los vecinos.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Estilos y Usos de Cercas",
          "items": [
            {
              "text": "Cerca de Privacidad (Lado a Lado): Tablones colocados al ras sin espacios. Proporciona bloqueo visual y de viento completo. Estilo residencial más popular. 6 pies es la altura estándar para máxima privacidad.",
              "type": "info"
            },
            {
              "text": "Cerca de Estacas (Espaciado): Tablones con espacios para apariencia decorativa y abierta. Estilo americano clásico a altura de 3-4 pies. Define límites sin bloquear vistas o flujo de aire.",
              "type": "info"
            },
            {
              "text": "Sombreado (Tablón sobre Tablón): Tablones alternados en ambos lados de los rieles con ligera superposición. Proporciona privacidad mientras permite flujo de aire, reduciendo carga de viento. Se ve igualmente terminado desde ambos lados.",
              "type": "info"
            },
            {
              "text": "Malla Ciclónica: Tela de malla de acero unida a postes de metal. Más económica por pie. Bajo mantenimiento. Disponible con láminas de privacidad o recubrimiento de vinilo. Mejor para límites de propiedad y contención de mascotas.",
              "type": "info"
            },
            {
              "text": "Vinilo/PVC: Libre de mantenimiento, nunca necesita pintura o tinte. Resistente a pudrición, insectos y desvanecimiento. Mayor costo inicial pero menor costo de por vida. Disponible en estilos de privacidad, semi-privacidad y estacas.",
              "type": "info"
            },
            {
              "text": "Tablones Horizontales: Estilo moderno/contemporáneo con tablones corriendo horizontalmente entre postes. Usa los mismos materiales que cercas verticales pero requiere espaciado de postes más cercano (6 pies máx) para prevenir combadura de tablones.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo de Cercas",
          "description": "Ejemplos paso a paso para proyectos comunes",
          "examples": [
            {
              "title": "Cerca privacidad 100 pies, 6 pies alto, tablones 5.5\", 1 portón (4 pies)",
              "steps": [
                "Longitud efectiva = 100 - (1 × 4) = 96 pies",
                "Postes = ceil(96 ÷ 8) + 1 + (1 × 2) = 12 + 1 + 2 = 15 postes",
                "Secciones = 15 - 1 - 1 = 13 secciones de cerca (excluyendo portón)",
                "Rieles = 13 × 2 = 26 rieles",
                "Estacas = ceil(96 × 12 ÷ 5.5) = ceil(209.5) = 210 tablones",
                "Longitud poste = 6 + 2 = 8 pies (1/3 enterrado)",
                "Concreto = 15 × 1.5 = ~23 sacos (80 lb)"
              ],
              "result": "Compra 15 postes (8 pies), 210 tablones, 26 rieles, 23 sacos de concreto."
            },
            {
              "title": "Sombreado 60 pies, 6 pies alto, tablones 5.5\", superposición 1.5\"",
              "steps": [
                "Longitud efectiva = 60 pies (sin portones)",
                "Postes = ceil(60 ÷ 8) + 1 = 8 + 1 = 9 postes",
                "Secciones = 9 - 1 = 8 secciones de cerca",
                "Rieles = 8 × 3 = 24 rieles",
                "Estacas frontales = ceil(60 × 12 ÷ (5.5 + 1.5)) = ceil(103) = 103",
                "Estacas traseras = ~103 (mismo conteo, alternando)",
                "Total estacas = 103 + 103 = 206 tablones",
                "Concreto = 9 × 1.5 = ~14 sacos"
              ],
              "result": "Compra 9 postes, 206 tablones, 24 rieles, 14 sacos de concreto."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué tan profundo deben enterrarse los postes de cerca?",
          "answer": "La regla general es enterrar 1/3 de la longitud total del poste. Para una cerca de 6 pies, usa postes de 8 pies y entierra 2 pies. Para una cerca de 8 pies, usa postes de 12 pies y entierra 4 pies (o mínimo 3 pies). En climas fríos, los postes deben extenderse bajo la línea de helada para prevenir levantamiento — verifica códigos de construcción locales para la profundidad de helada de tu área. Siempre coloca 3-4 pulgadas de grava en el fondo del hoyo para drenaje, luego llena con concreto hasta 1-2 pulgadas del nivel del suelo, inclinado alejándose del poste para drenar agua."
        },
        {
          "question": "¿Cuántos sacos de concreto por poste de cerca?",
          "answer": "Para postes estándar 4×4 en hoyos de 8 pulgadas de diámetro enterrados 24 pulgadas de profundidad, planea 1 a 1.5 sacos (80 lb) de concreto premezclado por poste. Para postes de portón 6×6 o hoyos más profundos, usa 2 sacos por poste. Una fórmula rápida: un hoyo de 8\" ancho × 24\" profundo usa aproximadamente 0.6 pies cúbicos de concreto — un saco de 80 lb produce aproximadamente 0.6 pies cúbicos. Si tu suelo es muy arenoso o suelto, puedes necesitar ligeramente más para llenar vacíos."
        },
        {
          "question": "¿Cuál es el mejor espaciado de postes para una cerca de madera?",
          "answer": "8 pies de centro a centro es el estándar para la mayoría de cercas de madera usando rieles estándar de 8 pies. Esto proporciona un buen balance de fuerza, eficiencia de materiales y apariencia. En áreas de viento fuerte, regiones de nieve pesada, o para cercas sobre 6 pies de alto, reduce el espaciado a 6 pies para fuerza adicional. Las cercas de malla ciclónica pueden usar espaciado de 10 pies porque la tela de malla distribuye la carga de viento a través de toda la cerca en lugar de concentrarla en cada sección."
        },
        {
          "question": "¿Cómo calculo tablones para una cerca sombreado?",
          "answer": "Una cerca sombreado tiene tablones en ambos lados de los rieles, desplazados para que los tablones de cada lado cubran los espacios del otro lado. El conteo total de estacas es aproximadamente el doble que el de una cerca de privacidad estándar. Cada lado usa ligeramente menos tablones que una cerca de privacidad porque hay espaciado entre tablones, pero los dos lados combinados usan más madera total. Por ejemplo, si una cerca de privacidad necesita 200 tablones, un sombreado con espaciado de 1.5\" necesita aproximadamente 340-380 tablones totales (ligeramente menos del doble debido al espaciado)."
        },
        {
          "question": "¿Debo usar postes de cerca 4×4 o 6×6?",
          "answer": "Los postes 4×4 (3.5×3.5 pulgadas reales) son estándar para la mayoría de cercas residenciales hasta 6 pies de alto con espaciado de postes de 8 pies. Usa postes 6×6 (5.5×5.5 pulgadas reales) para postes de portón (soportan el mayor estrés del peso del portón y balanceo), postes de esquina, cercas sobre 6 pies de alto, y en áreas de viento fuerte. Algunos constructores usan 6×6 para todos los postes en cercas premium — el ancho extra proporciona significativamente más fuerza y se ve más sustancial."
        },
        {
          "question": "¿Cómo afectan los portones el cálculo de materiales?",
          "answer": "Los portones reducen la cantidad de material de cercado necesario (la abertura del portón no necesita estacas o rieles) pero agregan postes. Cada portón requiere 2 postes dedicados de portón — estos a menudo son 6×6 para fuerza, aunque el resto de la cerca use 4×4. La calculadora resta anchos de portón de la longitud total de cerca para cálculos de estacas y rieles, luego agrega 2 postes por portón. Los herrajes de portón (bisagras, pestillo, resorte) son separados y típicamente cuestan $15-40 por portón para portones peatonales estándar."
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
      "name": "Calculadora de Cerca",
      "slug": "calculadora-cerca",
      "subtitle": "Calcule postes, tábuas, trilhos, concreto e materiais necessários para projetos de cercas de madeira, arame ou vinil.",
      "breadcrumb": "Calc Cerca",
      "seo": {
        "title": "Calculadora de Cerca - Postes, Tábuas e Materiais | Ferramenta Gratuita",
        "description": "Calcule quantos postes, tábuas, trilhos e sacos de concreto você precisa para sua cerca. Suporta estilos privacidade, piquete, shadowbox e arame com portões e estimativa de custos.",
        "shortDescription": "Estime materiais para cerca: postes, tábuas, trilhos, concreto e custo.",
        "keywords": [
          "calculadora de cerca",
          "quantas tábuas de cerca preciso",
          "calculadora de postes",
          "calculadora de materiais cerca",
          "calculadora cerca madeira",
          "estimativa cerca privacidade",
          "calculadora custo cerca",
          "calculadora tábuas cerca"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "fenceStyle": {
          "label": "Estilo da Cerca",
          "helpText": "Selecione o tipo de cerca que você está construindo",
          "options": {
            "wood": "Madeira",
            "chainLink": "Arame",
            "vinyl": "Vinil"
          }
        },
        "fenceLength": {
          "label": "Comprimento Total da Cerca",
          "helpText": "Meça todo o perímetro a ser cercado. Aberturas de portões serão subtraídas automaticamente"
        },
        "fenceHeight": {
          "label": "Altura da Cerca",
          "helpText": "Cercas de privacidade padrão têm 1,8m. Cercas de piquete tipicamente 0,9-1,2m. Verifique códigos locais para limites de altura"
        },
        "postSpacing": {
          "label": "Espaçamento dos Postes",
          "helpText": "Distância entre centros dos postes. Padrão é 2,4m para madeira, até 3m para arame. Menor espaçamento = cerca mais forte"
        },
        "boardStyle": {
          "label": "Estilo das Tábuas",
          "helpText": "Lado a lado (privacidade): sem vãos. Espaçadas (piquete): vãos decorativos. Shadowbox: tábuas alternadas em ambos os lados",
          "options": {
            "sideBySide": "Lado a Lado (Privacidade)",
            "spaced": "Espaçadas (Piquete/Decorativo)",
            "shadowbox": "Shadowbox (Tábua sobre Tábua)"
          }
        },
        "picketWidth": {
          "label": "Largura da Tábua",
          "helpText": "Tamanhos comuns: 9cm (real), 14cm (real). Meça a largura real de suas tábuas"
        },
        "picketSpacing": {
          "label": "Vão Entre Tábuas",
          "helpText": "Configure como 0 para cerca de privacidade (sem vãos). Espaçamento típico de piquete: 5-7cm. Sobreposição shadowbox: 2,5-4cm"
        },
        "railsPerSection": {
          "label": "Trilhos Por Seção",
          "helpText": "Trilhos horizontais entre postes. Use 2 para cercas ≤1,8m, 3 para 1,8-2,4m, 4 para 2,4m+"
        },
        "numberOfGates": {
          "label": "Número de Portões",
          "helpText": "Portões para pedestres tipicamente 0,9-1,2m de largura. Portões para carros 3-5m de largura"
        },
        "gateWidth": {
          "label": "Largura do Portão",
          "helpText": "Largura de cada abertura de portão. A calculadora adiciona 2 postes extras por portão para ferragens"
        },
        "includeConcreteEstimate": {
          "label": "Incluir Concreto para Postes",
          "helpText": "Calcular sacos de concreto necessários para fixar postes. Padrão é 1-2 sacos por poste dependendo do tamanho"
        },
        "postSize": {
          "label": "Tamanho do Poste",
          "helpText": "9x9cm é padrão para a maioria das cercas de madeira. 14x14cm recomendado para postes de portão e cercas altas",
          "options": {
            "4x4": "9x9cm (real)",
            "6x6": "14x14cm (real)",
            "roundMetal": "Metal Redondo (6cm OD)"
          }
        },
        "estimateCost": {
          "label": "Estimar Custo de Material",
          "helpText": "Calcular custos aproximados de materiais para seu projeto de cerca"
        },
        "boardCost": {
          "label": "Custo Por Tábua",
          "helpText": "Preço por tábua no seu fornecedor local"
        },
        "postCost": {
          "label": "Custo Por Poste",
          "helpText": "Preço por poste de cerca. Tratado 9x9x2,4m tipicamente R$25-45"
        },
        "concreteBagCost": {
          "label": "Custo Por Saco de Concreto",
          "helpText": "Preço por saco de 40kg de mistura de concreto. Tipicamente R$12-20"
        }
      },
      "results": {
        "numberOfPosts": {
          "label": "Total de Postes"
        },
        "numberOfPickets": {
          "label": "Tábuas"
        },
        "numberOfRails": {
          "label": "Trilhos"
        },
        "postLength": {
          "label": "Comprimento do Poste"
        },
        "concreteBags": {
          "label": "Sacos de Concreto"
        },
        "totalLinearFt": {
          "label": "Comprimento da Cerca"
        },
        "totalCost": {
          "label": "Custo Est. Material"
        }
      },
      "presets": {
        "privacyFence6ft": {
          "label": "Cerca Privacidade 1,8m",
          "description": "45m, tábuas 14cm, sem vãos, 1 portão"
        },
        "picketFence4ft": {
          "label": "Cerca Piquete 1,2m",
          "description": "30m, piquetes 9cm, espaçamento 6cm"
        },
        "shadowbox6ft": {
          "label": "Shadowbox 1,8m",
          "description": "60m, tábua sobre tábua, sobreposição 4cm, 3 trilhos"
        },
        "tallPrivacy8ft": {
          "label": "Privacidade Alta 2,4m",
          "description": "36m, 3 trilhos, com estimativa de custo"
        },
        "chainLink": {
          "label": "Cerca de Arame",
          "description": "45m, 1,2m altura, espaçamento 3m"
        }
      },
      "values": {
        "posts": "postes",
        "post": "poste",
        "boards": "tábuas",
        "board": "tábua",
        "rails": "trilhos",
        "rail": "trilho",
        "bags": "sacos",
        "bag": "saco",
        "ft": "m",
        "in": "cm",
        "sections": "seções",
        "screws": "parafusos",
        "lbBags": "sacos 40kg"
      },
      "formats": {
        "summary": "Sua cerca de {length}m precisa de {posts} postes, {pickets} tábuas, {rails} trilhos e {concrete} sacos de concreto."
      },
      "infoCards": {
        "structure": {
          "title": "Estrutura da Cerca",
          "items": [
            {
              "label": "Total de Postes",
              "valueKey": "numberOfPosts"
            },
            {
              "label": "Seções da Cerca",
              "valueKey": "numberOfSections"
            },
            {
              "label": "Comprimento Poste (enterrado)",
              "valueKey": "postLength"
            },
            {
              "label": "Comprimento Efetivo",
              "valueKey": "effectiveLength"
            }
          ]
        },
        "materials": {
          "title": "Lista de Materiais",
          "items": [
            {
              "label": "Tábuas",
              "valueKey": "numberOfPickets"
            },
            {
              "label": "Trilhos",
              "valueKey": "numberOfRails"
            },
            {
              "label": "Concreto (sacos 40kg)",
              "valueKey": "concreteBags"
            },
            {
              "label": "Parafusos / Pregos",
              "valueKey": "fasteners"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Construção",
          "items": [
            "Enterre postes pelo menos 1/3 do comprimento total abaixo do solo. Para cerca de 1,8m, fixe postes 60cm profundo (2,4m comprimento total).",
            "Use madeira tratada com classificação para contato com solo (UC4A ou superior) para todos os postes. Tratamento padrão não é adequado para contato direto com solo.",
            "Coloque 7-10cm de cascalho no fundo de cada buraco para drenagem antes de adicionar concreto. Água parada na base causa apodrecimento prematuro.",
            "Deixe concreto curar 24-48 horas antes de fixar trilhos e tábuas. Cura completa leva 7 dias — evite stress pesado nos postes durante este período."
          ]
        }
      },
      "chart": {
        "title": "Distribuição de Custos dos Materiais",
        "xLabel": "Material",
        "yLabel": "Custo (R$)",
        "series": {
          "cost": "Custo Estimado"
        }
      },
      "education": {
        "whatIs": {
          "title": "O Que É uma Calculadora de Cerca?",
          "content": "Uma calculadora de cerca estima o número exato de postes, tábuas, trilhos, sacos de concreto e fixadores necessários para seu projeto de cercamento. Em vez de fazer estimativas aproximadas na loja de materiais, uma lista precisa de materiais previne viagens custosas para buscar materiais faltantes ou desperdício por compra excessiva. Esta calculadora lida com a geometria que confunde a maioria dos construtores: considerar aberturas de portões, calcular profundidade de postes baseada na altura da cerca, ajustar contagem de tábuas para diferentes larguras e espaçamentos, e estimar volume de concreto para fixar postes. Suporta múltiplos estilos incluindo privacidade (tábuas lado a lado), piquete (tábuas espaçadas) e shadowbox (tábuas alternadas em ambos os lados). Seja cercando um quintal pequeno ou um perímetro inteiro de propriedade, estimativas precisas mantêm seu projeto no orçamento e no cronograma."
        },
        "howItWorks": {
          "title": "Como Funciona a Estimativa de Materiais para Cerca",
          "content": "O cálculo começa com o comprimento total da cerca menos aberturas de portões para obter o comprimento efetivo. Postes são então calculados dividindo o comprimento efetivo pelo espaçamento de postes e adicionando 1 (para o poste final), mais 2 postes extras por portão (postes de portão são frequentemente 14x14cm para suporte de ferragens). O número de seções iguala postes menos 1. Trilhos por seção (tipicamente 2 para cercas sob 1,8m, 3 para 1,8-2,4m) são multiplicados por seções para total de trilhos. Tábuas são calculadas dividindo o comprimento efetivo total (em centímetros) pela largura combinada de uma tábua mais um vão. Para estilo shadowbox, a contagem de tábuas é aproximadamente dobrada já que tábuas são instaladas em lados alternados. Comprimento do poste iguala altura da cerca mais profundidade de enterro — a regra padrão é 1/3 do comprimento total enterrado, então uma cerca de 1,8m usa postes de 2,4m (1,8m acima + 60cm enterrado). Concreto por poste depende do diâmetro do buraco (tipicamente 3× largura do poste) e profundidade, com 1-2 sacos de 40kg sendo padrão."
        },
        "considerations": {
          "title": "Considerações Importantes de Construção",
          "items": [
            {
              "text": "Verifique códigos de construção locais e regras de condomínio antes de começar. Muitos municípios exigem licenças para cercas acima de 1,2m e têm requisitos de recuo das divisas (frequentemente 5-15cm).",
              "type": "warning"
            },
            {
              "text": "Ligue para o serviço de localização de utilidades pelo menos 48 horas antes de cavar buracos. Atingir linhas subterrâneas de gás, água ou eletricidade é perigoso e caro.",
              "type": "warning"
            },
            {
              "text": "Espaçamento de postes afeta a resistência da cerca. 2,4m é padrão para cercas de madeira, mas reduza para 1,8m em áreas de vento forte ou cercas acima de 1,8m. Arame pode usar até 3m entre postes.",
              "type": "info"
            },
            {
              "text": "Postes de portão recebem mais stress. Use postes 14x14cm para portões mesmo que o resto da cerca use 9x9cm. Fixe postes de portão 15cm mais profundo e use 2 sacos de concreto em vez de 1.",
              "type": "info"
            },
            {
              "text": "Madeira tratada precisa de 6-12 meses para secar antes de tingir. Aplique preservativo repelente de água imediatamente após construir, então tinja no ano seguinte para melhores resultados.",
              "type": "info"
            },
            {
              "text": "Cercas shadowbox usam quase o dobro de tábuas mas oferecem privacidade de ambos os lados e ficam igualmente bonitas de qualquer lado — importante quando códigos locais exigem o 'lado bom' voltado para vizinhos.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Estilos de Cerca e Usos",
          "items": [
            {
              "text": "Cerca de Privacidade (Lado a Lado): Tábuas colocadas juntas sem vãos. Oferece bloqueio visual e de vento completo. Estilo residencial mais popular. 1,8m é a altura padrão para máxima privacidade.",
              "type": "info"
            },
            {
              "text": "Cerca de Piquete (Espaçada): Tábuas com vãos para visual decorativo e aberto. Estilo americano clássico em altura 0,9-1,2m. Define limites sem bloquear vista ou fluxo de ar.",
              "type": "info"
            },
            {
              "text": "Shadowbox (Tábua sobre Tábua): Tábuas alternadas em ambos os lados dos trilhos com leve sobreposição. Oferece privacidade permitindo fluxo de ar, reduzindo carga de vento. Fica igualmente acabada de ambos os lados.",
              "type": "info"
            },
            {
              "text": "Cerca de Arame: Malha de aço fixada a postes metálicos. Mais econômica por metro. Baixa manutenção. Disponível com lâminas de privacidade ou revestimento de vinil. Melhor para limites de propriedade e contenção de animais.",
              "type": "info"
            },
            {
              "text": "Vinil/PVC: Livre de manutenção, nunca precisa pintar ou tingir. Resistente a apodrecimento, insetos e desbotamento. Custo inicial maior mas menor custo ao longo da vida. Disponível em estilos privacidade, semi-privacidade e piquete.",
              "type": "info"
            },
            {
              "text": "Tábuas Horizontais: Estilo moderno/contemporâneo com tábuas correndo horizontalmente entre postes. Usa os mesmos materiais que cercas verticais mas requer espaçamento menor de postes (1,8m máx) para prevenir curvatura das tábuas.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de Cerca",
          "description": "Exemplos passo a passo para projetos comuns",
          "examples": [
            {
              "title": "30m Cerca Privacidade, 1,8m altura, tábuas 14cm, 1 portão (1,2m)",
              "steps": [
                "Comprimento efetivo = 30 - (1 × 1,2) = 28,8m",
                "Postes = teto(28,8 ÷ 2,4) + 1 + (1 × 2) = 12 + 1 + 2 = 15 postes",
                "Seções = 15 - 1 - 1 = 13 seções de cerca (excluindo portão)",
                "Trilhos = 13 × 2 = 26 trilhos",
                "Tábuas = teto(2880 ÷ 14) = teto(206) = 206 tábuas",
                "Comprimento poste = 1,8 + 0,6 = 2,4m (1/3 enterrado)",
                "Concreto = 15 × 1,5 = ~23 sacos (40kg)"
              ],
              "result": "Compre 15 postes (2,4m), 206 tábuas, 26 trilhos, 23 sacos de concreto."
            },
            {
              "title": "18m Shadowbox, 1,8m altura, tábuas 14cm, sobreposição 4cm",
              "steps": [
                "Comprimento efetivo = 18m (sem portões)",
                "Postes = teto(18 ÷ 2,4) + 1 = 8 + 1 = 9 postes",
                "Seções = 9 - 1 = 8 seções de cerca",
                "Trilhos = 8 × 3 = 24 trilhos",
                "Tábuas frente = teto(1800 ÷ (14 + 4)) = teto(100) = 100",
                "Tábuas trás = ~100 (mesma contagem, alternada)",
                "Total tábuas = 100 + 100 = 200 tábuas",
                "Concreto = 9 × 1,5 = ~14 sacos"
              ],
              "result": "Compre 9 postes, 200 tábuas, 24 trilhos, 14 sacos de concreto."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual profundidade enterrar postes de cerca?",
          "answer": "A regra geral é enterrar 1/3 do comprimento total do poste. Para cerca de 1,8m, use postes de 2,4m e enterre 60cm. Para cerca de 2,4m, use postes de 3,6m e enterre 1,2m (ou no mínimo 90cm). Em climas frios, postes devem se estender abaixo da linha de congelamento para prevenir levantamento — verifique códigos locais para profundidade de congelamento da sua área. Sempre coloque 7-10cm de cascalho no fundo do buraco para drenagem, depois preencha com concreto até 2-5cm do nível do solo, inclinado para longe do poste para escoar água."
        },
        {
          "question": "Quantos sacos de concreto por poste de cerca?",
          "answer": "Para postes 9x9cm padrão em buracos de 20cm de diâmetro enterrados 60cm de profundidade, planeje 1 a 1,5 sacos (40kg) de concreto pré-misturado por poste. Para postes 14x14cm de portão ou buracos mais profundos, use 2 sacos por poste. Uma fórmula rápida: um buraco 20cm largura × 60cm profundidade usa cerca de 0,02m³ de concreto — um saco de 40kg rende aproximadamente 0,02m³. Se seu solo for muito arenoso ou solto, pode precisar ligeiramente mais para preencher vazios."
        },
        {
          "question": "Qual o melhor espaçamento de postes para cerca de madeira?",
          "answer": "2,4m entre centros é o padrão para a maioria das cercas de madeira usando trilhos padrão de 2,4m. Isto oferece bom equilíbrio de resistência, eficiência de material e aparência. Em áreas de vento forte, regiões de neve pesada, ou para cercas acima de 1,8m de altura, reduza espaçamento para 1,8m para resistência adicional. Cercas de arame podem usar espaçamento de 3m porque a malha distribui carga de vento por toda a cerca em vez de concentrá-la em cada seção."
        },
        {
          "question": "Como calcular tábuas para cerca shadowbox?",
          "answer": "Uma cerca shadowbox tem tábuas em ambos os lados dos trilhos, deslocadas para que as tábuas de cada lado cubram os vãos do outro lado. A contagem total de tábuas é aproximadamente o dobro da cerca de privacidade padrão. Cada lado usa ligeiramente menos tábuas que cerca de privacidade porque há espaçamento entre tábuas, mas os dois lados combinados usam mais madeira total. Por exemplo, se cerca de privacidade precisa 200 tábuas, shadowbox com espaçamento de 4cm precisa aproximadamente 340-380 tábuas totais (ligeiramente menos que o dobro devido ao espaçamento)."
        },
        {
          "question": "Devo usar postes 9x9cm ou 14x14cm?",
          "answer": "Postes 9x9cm (real 8,5x8,5cm) são padrão para a maioria das cercas residenciais até 1,8m de altura com espaçamento de 2,4m. Use postes 14x14cm (real 13,5x13,5cm) para postes de portão (suportam mais stress do peso e balanço do portão), postes de canto, cercas acima de 1,8m de altura, e em áreas de vento forte. Alguns construtores usam 14x14cm para todos os postes em cercas premium — a largura extra oferece significativamente mais resistência e aparência mais substancial."
        },
        {
          "question": "Como portões afetam o cálculo de materiais?",
          "answer": "Portões reduzem a quantidade de material de cercamento necessário (a abertura do portão não precisa tábuas ou trilhos) mas adicionam postes. Cada portão requer 2 postes dedicados — estes são frequentemente 14x14cm para resistência, mesmo se o resto da cerca usa 9x9cm. A calculadora subtrai larguras de portões do comprimento total da cerca para cálculos de tábuas e trilhos, depois adiciona 2 postes por portão. Ferragens de portão (dobradiças, trinco, mola) são separadas e tipicamente custam R$45-120 por portão para portões pedestres padrão."
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
      }
    },
    fr: {
      "name": "Calculateur de Clôture",
      "slug": "calculateur-cloture",
      "subtitle": "Calculez les poteaux, planches, rails, béton et matériaux nécessaires pour vos projets de clôture en bois, grillage ou vinyle.",
      "breadcrumb": "Calc Clôture",
      "seo": {
        "title": "Calculateur de Clôture - Poteaux, Planches & Matériaux | Outil Gratuit",
        "description": "Calculez combien de poteaux, planches, rails et sacs de béton vous avez besoin. Supporte les styles intimité, palissade, shadowbox et grillage avec allocation de portail et estimation des coûts.",
        "shortDescription": "Estimez les matériaux de clôture : poteaux, planches, rails, béton et coût.",
        "keywords": [
          "calculateur de clôture",
          "combien de planches de clôture ai-je besoin",
          "calculateur de poteaux de clôture",
          "calculateur de matériaux de clôture",
          "calculateur de clôture en bois",
          "estimateur de clôture d'intimité",
          "calculateur de coût de clôture",
          "calculateur de planches de clôture"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "fenceStyle": {
          "label": "Style de Clôture",
          "helpText": "Sélectionnez le type de clôture que vous construisez",
          "options": {
            "wood": "Bois",
            "chainLink": "Grillage",
            "vinyl": "Vinyle"
          }
        },
        "fenceLength": {
          "label": "Longueur Totale de la Clôture",
          "helpText": "Mesurez tout le périmètre à clôturer. Les ouvertures de portail seront soustraites automatiquement"
        },
        "fenceHeight": {
          "label": "Hauteur de la Clôture",
          "helpText": "Les clôtures d'intimité standard font 1,8 m. Les palissades font généralement 0,9-1,2 m. Vérifiez les codes locaux pour les limites de hauteur"
        },
        "postSpacing": {
          "label": "Espacement des Poteaux",
          "helpText": "Distance entre les centres des poteaux. Standard : 2,4 m pour le bois, jusqu'à 3 m pour le grillage. Espacement plus court = clôture plus solide"
        },
        "boardStyle": {
          "label": "Style de Planches",
          "helpText": "Côte à côte (intimité) : pas d'espaces. Espacées (palissade) : espaces décoratifs. Shadowbox : planches alternées des deux côtés",
          "options": {
            "sideBySide": "Côte à Côte (Intimité)",
            "spaced": "Espacées (Palissade/Décoratif)",
            "shadowbox": "Shadowbox (Planche sur Planche)"
          }
        },
        "picketWidth": {
          "label": "Largeur des Planches",
          "helpText": "Tailles communes : 8,9 cm (1×4 réel), 14 cm (1×6 réel). Mesurez la largeur réelle de vos planches"
        },
        "picketSpacing": {
          "label": "Espacement Entre les Planches",
          "helpText": "Réglez à 0 pour clôture d'intimité (pas d'espaces). Espacement palissade typique : 5-8 cm. Chevauchement shadowbox : 2,5-4 cm"
        },
        "railsPerSection": {
          "label": "Rails par Section",
          "helpText": "Rails horizontaux entre les poteaux. Utilisez 2 pour clôtures ≤1,8 m, 3 pour 1,8-2,4 m, 4 pour 2,4+ m"
        },
        "numberOfGates": {
          "label": "Nombre de Portails",
          "helpText": "Les portails piétons font généralement 0,9-1,2 m de large. Les portails d'entrée font 3-5 m de large"
        },
        "gateWidth": {
          "label": "Largeur du Portail",
          "helpText": "Largeur de chaque ouverture de portail. Le calculateur ajoute 2 poteaux supplémentaires par portail pour la quincaillerie"
        },
        "includeConcreteEstimate": {
          "label": "Inclure le Béton pour les Poteaux",
          "helpText": "Calculez les sacs de béton nécessaires pour fixer les poteaux. Standard : 1-2 sacs par poteau selon la taille"
        },
        "postSize": {
          "label": "Taille du Poteau",
          "helpText": "10×10 cm est standard pour la plupart des clôtures en bois. 15×15 cm recommandé pour les poteaux de portail et clôtures hautes",
          "options": {
            "4x4": "10×10 cm (8,9 cm réel)",
            "6x6": "15×15 cm (14 cm réel)",
            "roundMetal": "Métal Rond (6 cm DE)"
          }
        },
        "estimateCost": {
          "label": "Estimer le Coût des Matériaux",
          "helpText": "Calculez les coûts approximatifs des matériaux pour votre projet de clôture"
        },
        "boardCost": {
          "label": "Coût par Planche",
          "helpText": "Prix par planche chez votre fournisseur local"
        },
        "postCost": {
          "label": "Coût par Poteau",
          "helpText": "Prix par poteau de clôture. Traité sous pression 10×10×2,4 m généralement 12-23 €"
        },
        "concreteBagCost": {
          "label": "Coût par Sac de Béton",
          "helpText": "Prix par sac de 35 kg de mélange béton. Généralement 6-10 €"
        }
      },
      "results": {
        "numberOfPosts": {
          "label": "Total Poteaux"
        },
        "numberOfPickets": {
          "label": "Planches"
        },
        "numberOfRails": {
          "label": "Rails"
        },
        "postLength": {
          "label": "Longueur Poteau"
        },
        "concreteBags": {
          "label": "Sacs de Béton"
        },
        "totalLinearFt": {
          "label": "Longueur Clôture"
        },
        "totalCost": {
          "label": "Coût Mat. Est."
        }
      },
      "presets": {
        "privacyFence6ft": {
          "label": "Clôture Intimité 1,8m",
          "description": "45 m, planches 14 cm, pas d'espaces, 1 portail"
        },
        "picketFence4ft": {
          "label": "Palissade 1,2m",
          "description": "30 m, planches 8,9 cm, espacement 6 cm"
        },
        "shadowbox6ft": {
          "label": "Shadowbox 1,8m",
          "description": "60 m, planche sur planche, chevauchement 4 cm, 3 rails"
        },
        "tallPrivacy8ft": {
          "label": "Intimité Haute 2,4m",
          "description": "36 m, 3 rails, avec estimation coût"
        },
        "chainLink": {
          "label": "Grillage",
          "description": "45 m, 1,2 m haut, espacement 3 m"
        }
      },
      "values": {
        "posts": "poteaux",
        "post": "poteau",
        "boards": "planches",
        "board": "planche",
        "rails": "rails",
        "rail": "rail",
        "bags": "sacs",
        "bag": "sac",
        "ft": "m",
        "in": "cm",
        "sections": "sections",
        "screws": "vis",
        "lbBags": "sacs 35 kg"
      },
      "formats": {
        "summary": "Votre clôture de {length} m nécessite {posts} poteaux, {pickets} planches, {rails} rails et {concrete} sacs de béton."
      },
      "infoCards": {
        "structure": {
          "title": "Structure de la Clôture",
          "items": [
            {
              "label": "Total Poteaux",
              "valueKey": "numberOfPosts"
            },
            {
              "label": "Sections Clôture",
              "valueKey": "numberOfSections"
            },
            {
              "label": "Longueur Poteau (enterré)",
              "valueKey": "postLength"
            },
            {
              "label": "Longueur Effective",
              "valueKey": "effectiveLength"
            }
          ]
        },
        "materials": {
          "title": "Liste des Matériaux",
          "items": [
            {
              "label": "Planches",
              "valueKey": "numberOfPickets"
            },
            {
              "label": "Rails",
              "valueKey": "numberOfRails"
            },
            {
              "label": "Béton (sacs 35 kg)",
              "valueKey": "concreteBags"
            },
            {
              "label": "Vis / Clous",
              "valueKey": "fasteners"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Construction",
          "items": [
            "Enterrez les poteaux d'au moins 1/3 de la longueur totale sous terre. Pour une clôture de 1,8 m, fixez les poteaux à 60 cm de profondeur (2,4 m de longueur totale).",
            "Utilisez du bois traité sous pression classé pour contact au sol (UC4A ou supérieur) pour tous les poteaux. Le traitement sous pression standard n'est pas classé pour contact direct au sol.",
            "Placez 8-10 cm de gravier au fond de chaque trou de poteau pour le drainage avant d'ajouter le béton. L'eau stagnante à la base du poteau cause une pourriture prématurée.",
            "Laissez le béton durcir 24-48 heures avant de fixer les rails et planches. Le durcissement complet prend 7 jours — évitez le stress important sur les poteaux pendant cette période."
          ]
        }
      },
      "chart": {
        "title": "Répartition des Coûts Matériaux",
        "xLabel": "Matériau",
        "yLabel": "Coût (€)",
        "series": {
          "cost": "Coût Estimé"
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Calculateur de Clôture ?",
          "content": "Un calculateur de clôture estime le nombre exact de poteaux, planches, rails, sacs de béton et attaches nécessaires pour votre projet de clôture. Plutôt que de faire des estimations approximatives au magasin de matériaux, une liste de matériaux précise évite les retours coûteux pour matériaux manquants ou le gaspillage dû au surachat. Ce calculateur gère la géométrie qui piège la plupart des bricoleurs : tenir compte des ouvertures de portail, calculer la profondeur des poteaux selon la hauteur de clôture, ajuster le nombre de planches pour différentes largeurs et espacements, et estimer le volume de béton pour fixer les poteaux. Il supporte plusieurs styles de clôture incluant intimité (planches côte à côte), palissade (planches espacées) et shadowbox (planches alternées des deux côtés). Que vous clôturiez une petite cour ou un périmètre entier de propriété, des estimations de matériaux précises maintiennent votre projet dans le budget et les délais."
        },
        "howItWorks": {
          "title": "Comment Fonctionne l'Estimation des Matériaux de Clôture",
          "content": "Le calcul commence avec la longueur totale de clôture moins les ouvertures de portail pour obtenir la longueur effective. Les poteaux sont ensuite calculés en divisant la longueur effective par l'espacement des poteaux et en ajoutant 1 (pour le poteau final), plus 2 poteaux supplémentaires par portail (les poteaux de portail sont souvent 15×15 cm pour supporter la quincaillerie). Le nombre de sections égale les poteaux moins 1. Les rails par section (généralement 2 pour clôtures sous 1,8 m, 3 pour 1,8-2,4 m) sont multipliés par les sections pour le total de rails. Les planches sont calculées en divisant la longueur effective totale (en centimètres) par la largeur combinée d'une planche plus un espace. Pour le style shadowbox, le nombre de planches est environ doublé car les planches sont installées des côtés alternés. La longueur du poteau égale la hauteur de clôture plus la profondeur d'enfouissement — la règle standard est 1/3 de la longueur totale du poteau sous terre, donc une clôture de 1,8 m utilise des poteaux de 2,4 m (1,8 m au-dessus + 60 cm enterré). Le béton par poteau dépend du diamètre du trou (généralement 3× largeur du poteau) et de la profondeur, avec 1-2 sacs de mélange béton de 35 kg par poteau étant standard."
        },
        "considerations": {
          "title": "Considérations Clés de Construction",
          "items": [
            {
              "text": "Vérifiez les codes du bâtiment locaux et règles d'association avant de commencer. Beaucoup de municipalités exigent des permis pour clôtures de plus de 1,2 m et ont des exigences de retrait des limites de propriété (souvent 5-15 cm).",
              "type": "warning"
            },
            {
              "text": "Appelez le service de localisation des services publics au moins 48 heures avant de creuser les trous de poteaux. Toucher les conduites souterraines de gaz, eau ou électricité est dangereux et coûteux.",
              "type": "warning"
            },
            {
              "text": "L'espacement des poteaux affecte la solidité de la clôture. 2,4 m est standard pour la plupart des clôtures en bois, mais réduisez à 1,8 m dans les zones venteuses ou pour clôtures de plus de 1,8 m de haut. Le grillage peut s'étendre jusqu'à 3 m entre poteaux.",
              "type": "info"
            },
            {
              "text": "Les poteaux de portail subissent le plus de stress. Utilisez des poteaux 15×15 cm pour les portails même si le reste de la clôture utilise du 10×10 cm. Fixez les poteaux de portail 15 cm plus profond et utilisez 2 sacs de béton au lieu de 1.",
              "type": "info"
            },
            {
              "text": "Le bois traité sous pression nécessite 6-12 mois de séchage avant teinture. Appliquez un préservateur hydrofuge immédiatement après construction, puis teignez l'année suivante pour de meilleurs résultats.",
              "type": "info"
            },
            {
              "text": "Les clôtures shadowbox utilisent presque le double de planches mais offrent intimité des deux côtés et paraissent également bien de chaque côté — important quand les codes locaux exigent que le 'beau côté' face aux voisins.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Styles et Utilisations de Clôture",
          "items": [
            {
              "text": "Clôture d'Intimité (Côte à Côte) : Planches placées bord à bord sans espaces. Offre blocage visuel et de vent complet. Style résidentiel le plus populaire. 1,8 m est la hauteur standard pour intimité maximale.",
              "type": "info"
            },
            {
              "text": "Palissade (Espacée) : Planches avec espaces pour un look décoratif et ouvert. Style américain classique à 0,9-1,2 m de hauteur. Définit les limites sans bloquer vues ou circulation d'air.",
              "type": "info"
            },
            {
              "text": "Shadowbox (Planche sur Planche) : Planches alternées des deux côtés des rails avec léger chevauchement. Offre intimité tout en permettant circulation d'air, réduisant la charge de vent. Paraît également fini des deux côtés.",
              "type": "info"
            },
            {
              "text": "Grillage : Treillis d'acier fixé aux poteaux métalliques. Plus abordable par mètre. Faible entretien. Disponible avec lames d'intimité ou revêtement vinyle. Meilleur pour limites de propriété et confinement d'animaux.",
              "type": "info"
            },
            {
              "text": "Vinyle/PVC : Sans entretien, ne nécessite jamais peinture ou teinture. Résistant à la pourriture, insectes et décoloration. Coût initial plus élevé mais coût de vie le plus bas. Disponible en styles intimité, semi-intimité et palissade.",
              "type": "info"
            },
            {
              "text": "Planches Horizontales : Style moderne/contemporain avec planches horizontales entre poteaux. Utilise les mêmes matériaux que clôtures verticales mais nécessite espacement plus rapproché des poteaux (1,8 m max) pour éviter l'affaissement.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calculs de Clôture",
          "description": "Exemples étape par étape pour projets communs",
          "examples": [
            {
              "title": "Clôture intimité 30 m, 1,8 m haut, planches 14 cm, 1 portail (1,2 m)",
              "steps": [
                "Longueur effective = 30 - (1 × 1,2) = 28,8 m",
                "Poteaux = plafond(28,8 ÷ 2,4) + 1 + (1 × 2) = 12 + 1 + 2 = 15 poteaux",
                "Sections = 15 - 1 - 1 = 13 sections de clôture (excluant portail)",
                "Rails = 13 × 2 = 26 rails",
                "Planches = plafond(2880 ÷ 14) = plafond(205,7) = 206 planches",
                "Longueur poteau = 1,8 + 0,6 = 2,4 m (1/3 enterré)",
                "Béton = 15 × 1,5 = ~23 sacs (35 kg)"
              ],
              "result": "Achetez 15 poteaux (2,4 m), 206 planches, 26 rails, 23 sacs béton."
            },
            {
              "title": "Shadowbox 18 m, 1,8 m haut, planches 14 cm, chevauchement 4 cm",
              "steps": [
                "Longueur effective = 18 m (pas de portails)",
                "Poteaux = plafond(18 ÷ 2,4) + 1 = 7 + 1 = 8 poteaux",
                "Sections = 8 - 1 = 7 sections de clôture",
                "Rails = 7 × 3 = 21 rails",
                "Planches avant = plafond(1800 ÷ (14 + 4)) = plafond(100) = 100",
                "Planches arrière = ~100 (même nombre, alternées)",
                "Total planches = 100 + 100 = 200 planches",
                "Béton = 8 × 1,5 = ~12 sacs"
              ],
              "result": "Achetez 8 poteaux, 200 planches, 21 rails, 12 sacs béton."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "À quelle profondeur les poteaux de clôture doivent-ils être enterrés ?",
          "answer": "La règle générale est d'enterrer 1/3 de la longueur totale du poteau. Pour une clôture de 1,8 m, utilisez des poteaux de 2,4 m et enterrez 60 cm. Pour une clôture de 2,4 m, utilisez des poteaux de 3,6 m et enterrez 1,2 m (ou au minimum 90 cm). Dans les climats froids, les poteaux doivent s'étendre sous la ligne de gel pour éviter le soulèvement — vérifiez les codes du bâtiment locaux pour la profondeur de gel de votre région. Placez toujours 8-10 cm de gravier au fond du trou pour le drainage, puis remplissez de béton jusqu'à 2-5 cm du niveau du sol, incliné loin du poteau pour évacuer l'eau."
        },
        {
          "question": "Combien de sacs de béton par poteau de clôture ?",
          "answer": "Pour des poteaux standard 10×10 cm dans des trous de 20 cm de diamètre enterrés à 60 cm de profondeur, prévoyez 1 à 1,5 sacs (35 kg) de béton pré-mélangé par poteau. Pour des poteaux de portail 15×15 cm ou des trous plus profonds, utilisez 2 sacs par poteau. Formule rapide : un trou de 20 cm de large × 60 cm de profond utilise environ 0,2 mètre cube de béton — un sac de 35 kg produit approximativement 0,2 mètre cube. Si votre sol est très sablonneux ou meuble, vous pourriez avoir besoin d'un peu plus pour remplir les vides."
        },
        {
          "question": "Quel est le meilleur espacement de poteaux pour une clôture en bois ?",
          "answer": "2,4 mètres d'entraxe est standard pour la plupart des clôtures en bois utilisant des rails standard de 2,4 m. Ceci offre un bon équilibre entre solidité, efficacité des matériaux et apparence. Dans les zones venteuses, régions à neige lourde, ou pour clôtures de plus de 1,8 m de haut, réduisez l'espacement à 1,8 m pour plus de solidité. Les clôtures en grillage peuvent utiliser un espacement de 3 m car le treillis distribue la charge de vent sur toute la clôture plutôt que de la concentrer sur chaque section."
        },
        {
          "question": "Comment calculer les planches pour une clôture shadowbox ?",
          "answer": "Une clôture shadowbox a des planches des deux côtés des rails, décalées pour que les planches de chaque côté couvrent les espaces de l'autre côté. Le nombre total de planches est approximativement le double d'une clôture d'intimité standard. Chaque côté utilise légèrement moins de planches qu'une clôture d'intimité car il y a espacement entre planches, mais les deux côtés combinés utilisent plus de bois total. Par exemple, si une clôture d'intimité nécessite 200 planches, une shadowbox avec 4 cm d'espacement entre planches nécessite approximativement 340-380 planches totales (légèrement moins que le double à cause de l'espacement)."
        },
        {
          "question": "Dois-je utiliser des poteaux 10×10 cm ou 15×15 cm ?",
          "answer": "Les poteaux 10×10 cm (réel 8,9×8,9 cm) sont standard pour la plupart des clôtures résidentielles jusqu'à 1,8 m de haut avec espacement de 2,4 m. Utilisez des poteaux 15×15 cm (réel 14×14 cm) pour les poteaux de portail (ils subissent le plus de stress du poids et balancement du portail), poteaux d'angle, clôtures de plus de 1,8 m de haut, et dans les zones venteuses. Certains constructeurs utilisent du 15×15 cm pour tous les poteaux sur clôtures premium — la largeur supplémentaire offre significativement plus de solidité et paraît plus substantiel."
        },
        {
          "question": "Comment les portails affectent-ils le calcul des matériaux ?",
          "answer": "Les portails réduisent la quantité de matériaux de clôture nécessaire (l'ouverture du portail n'a pas besoin de planches ou rails) mais ajoutent des poteaux. Chaque portail nécessite 2 poteaux dédiés — ceux-ci sont souvent 15×15 cm pour la solidité, même si le reste de la clôture utilise du 10×10 cm. Le calculateur soustrait les largeurs de portail de la longueur totale de clôture pour les calculs de planches et rails, puis ajoute 2 poteaux par portail. La quincaillerie de portail (charnières, loquet, ressort) est séparée et coûte généralement 25-60 € par portail pour portails piétons standard."
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
      "name": "Zaun Rechner",
      "slug": "zaun-rechner",
      "subtitle": "Berechnen Sie Pfosten, Latten, Querriegel, Beton und Materialien für Holz-, Maschendraht- oder Vinyl-Zaunprojekte.",
      "breadcrumb": "Zaun Rechner",
      "seo": {
        "title": "Zaun Rechner - Pfosten, Latten & Materialien | Kostenloses Tool",
        "description": "Berechnen Sie wie viele Zaunpfosten, Latten, Querriegel und Betonsäcke Sie benötigen. Unterstützt Sichtschutz-, Lattenzaun-, Shadowbox- und Maschendrahtstile mit Tor-Berücksichtigung und Kostenschätzungen.",
        "shortDescription": "Schätzen Sie Zaunmaterialien: Pfosten, Latten, Querriegel, Beton und Kosten.",
        "keywords": [
          "zaun rechner",
          "wie viele zaunlatten brauche ich",
          "zaunpfosten rechner",
          "zaunmaterial rechner",
          "holzzaun rechner",
          "sichtschutzzaun kalkulator",
          "zaun kosten rechner",
          "zaunbrett rechner"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "fenceStyle": {
          "label": "Zaun Stil",
          "helpText": "Wählen Sie den Typ des Zauns, den Sie bauen",
          "options": {
            "wood": "Holz",
            "chainLink": "Maschendraht",
            "vinyl": "Vinyl"
          }
        },
        "fenceLength": {
          "label": "Gesamt Zaunlänge",
          "helpText": "Messen Sie den gesamten zu umzäunenden Umfang. Toröffnungen werden automatisch abgezogen"
        },
        "fenceHeight": {
          "label": "Zaunhöhe",
          "helpText": "Standard-Sichtschutzzäune sind 6 ft. Lattenzäune sind typischerweise 3-4 ft. Prüfen Sie örtliche Vorschriften für Höhenbegrenzungen"
        },
        "postSpacing": {
          "label": "Pfosten Abstand",
          "helpText": "Abstand zwischen Pfostenmittelpunkten. Standard ist 8 ft für Holz, bis zu 10 ft für Maschendraht. Kürzerer Abstand = stärkerer Zaun"
        },
        "boardStyle": {
          "label": "Brett Stil",
          "helpText": "Seite-an-Seite (Sichtschutz): keine Lücken. Beabstandet (Lattenzaun): dekorative Lücken. Shadowbox: abwechselnde Bretter auf beiden Seiten",
          "options": {
            "sideBySide": "Seite-an-Seite (Sichtschutz)",
            "spaced": "Beabstandet (Lattenzaun/Dekorativ)",
            "shadowbox": "Shadowbox (Brett-auf-Brett)"
          }
        },
        "picketWidth": {
          "label": "Latte / Brett Breite",
          "helpText": "Gängige Größen: 3.5\" (1×4 tatsächlich), 5.5\" (1×6 tatsächlich). Messen Sie die tatsächliche Breite Ihrer Bretter"
        },
        "picketSpacing": {
          "label": "Lücke zwischen Brettern",
          "helpText": "Auf 0 für Sichtschutzzaun setzen (keine Lücken). Typischer Lattenabstand: 2-3\". Shadowbox-Überlappung: 1-1.5\""
        },
        "railsPerSection": {
          "label": "Querriegel pro Abschnitt",
          "helpText": "Horizontale Querriegel zwischen Pfosten. Verwenden Sie 2 für Zäune ≤6 ft, 3 für 6-8 ft, 4 für 8+ ft"
        },
        "numberOfGates": {
          "label": "Anzahl Tore",
          "helpText": "Gehwege-Tore sind typischerweise 3-4 ft breit. Einfahrts-Tore sind 10-16 ft breit"
        },
        "gateWidth": {
          "label": "Tor Breite",
          "helpText": "Breite jeder Toröffnung. Der Rechner fügt 2 zusätzliche Pfosten pro Tor für die Tor-Hardware hinzu"
        },
        "includeConcreteEstimate": {
          "label": "Beton für Pfosten einbeziehen",
          "helpText": "Berechnen Sie Betonsäcke, die zum Setzen der Pfosten benötigt werden. Standard sind 1-2 Säcke pro Pfosten je nach Größe"
        },
        "postSize": {
          "label": "Pfosten Größe",
          "helpText": "4×4 ist Standard für die meisten Holzzäune. 6×6 empfohlen für Tor-Pfosten und hohe Zäune",
          "options": {
            "4x4": "4×4 (3.5\" tatsächlich)",
            "6x6": "6×6 (5.5\" tatsächlich)",
            "roundMetal": "Rund Metall (2-3/8\" AD)"
          }
        },
        "estimateCost": {
          "label": "Material Kosten schätzen",
          "helpText": "Berechnen Sie ungefähre Materialkosten für Ihr Zaunprojekt"
        },
        "boardCost": {
          "label": "Kosten pro Brett",
          "helpText": "Preis pro Latte/Brett bei Ihrem lokalen Lieferanten"
        },
        "postCost": {
          "label": "Kosten pro Pfosten",
          "helpText": "Preis pro Zaunpfosten. Druckimprägnierte 4×4×8 typischerweise 8-15€"
        },
        "concreteBagCost": {
          "label": "Kosten pro Betonsack",
          "helpText": "Preis pro 40 kg Sack Betonmischung. Typischerweise 4-7€"
        }
      },
      "results": {
        "numberOfPosts": {
          "label": "Gesamt Pfosten"
        },
        "numberOfPickets": {
          "label": "Latten / Bretter"
        },
        "numberOfRails": {
          "label": "Querriegel"
        },
        "postLength": {
          "label": "Pfosten Länge"
        },
        "concreteBags": {
          "label": "Betonsäcke"
        },
        "totalLinearFt": {
          "label": "Zaun Länge"
        },
        "totalCost": {
          "label": "Geschätzte Material Kosten"
        }
      },
      "presets": {
        "privacyFence6ft": {
          "label": "6ft Sichtschutzzaun",
          "description": "150 ft, 5.5\" Bretter, keine Lücken, 1 Tor"
        },
        "picketFence4ft": {
          "label": "4ft Lattenzaun",
          "description": "100 ft, 3.5\" Latten, 2.5\" Abstand"
        },
        "shadowbox6ft": {
          "label": "6ft Shadowbox",
          "description": "200 ft, Brett-auf-Brett, 1.5\" Überlappung, 3 Querriegel"
        },
        "tallPrivacy8ft": {
          "label": "8ft Hoher Sichtschutz",
          "description": "120 ft, 3 Querriegel, mit Kostenschätzung"
        },
        "chainLink": {
          "label": "Maschendraht",
          "description": "150 ft, 4 ft hoch, 10 ft Abstand"
        }
      },
      "values": {
        "posts": "pfosten",
        "post": "pfosten",
        "boards": "bretter",
        "board": "brett",
        "rails": "querriegel",
        "rail": "querriegel",
        "bags": "säcke",
        "bag": "sack",
        "ft": "ft",
        "in": "zoll",
        "sections": "abschnitte",
        "screws": "schrauben",
        "lbBags": "40 kg Säcke"
      },
      "formats": {
        "summary": "Ihr {length} ft Zaun benötigt {posts} Pfosten, {pickets} Bretter, {rails} Querriegel und {concrete} Betonsäcke."
      },
      "infoCards": {
        "structure": {
          "title": "Zaun Struktur",
          "items": [
            {
              "label": "Gesamt Pfosten",
              "valueKey": "numberOfPosts"
            },
            {
              "label": "Zaun Abschnitte",
              "valueKey": "numberOfSections"
            },
            {
              "label": "Pfosten Länge (eingegraben)",
              "valueKey": "postLength"
            },
            {
              "label": "Effektive Länge",
              "valueKey": "effectiveLength"
            }
          ]
        },
        "materials": {
          "title": "Material Liste",
          "items": [
            {
              "label": "Latten / Bretter",
              "valueKey": "numberOfPickets"
            },
            {
              "label": "Querriegel",
              "valueKey": "numberOfRails"
            },
            {
              "label": "Beton (40 kg Säcke)",
              "valueKey": "concreteBags"
            },
            {
              "label": "Schrauben / Nägel",
              "valueKey": "fasteners"
            }
          ]
        },
        "tips": {
          "title": "Bau Tipps",
          "items": [
            "Vergraben Sie Pfosten mindestens 1/3 der gesamten Pfostenlänge unter der Erde. Für einen 6 ft Zaun setzen Sie Pfosten 2 ft tief (8 ft Gesamt-Pfostenlänge).",
            "Verwenden Sie druckimprägniertes Holz mit Bodenkontakt-Zertifizierung (UC4A oder höher) für alle Pfosten. Standard-Druckimprägnierung ist nicht für direkten Bodenkontakt geeignet.",
            "Legen Sie 3-4 Zoll Kies auf den Boden jedes Pfostenlochs zur Entwässerung, bevor Sie Beton hinzufügen. Stehendes Wasser am Pfostenfuß verursacht vorzeitige Fäulnis.",
            "Lassen Sie Beton 24-48 Stunden aushärten, bevor Sie Querriegel und Latten befestigen. Vollständige Aushärtung dauert 7 Tage — vermeiden Sie starke Belastung der Pfosten während dieser Zeit."
          ]
        }
      },
      "chart": {
        "title": "Material Kosten Aufschlüsselung",
        "xLabel": "Material",
        "yLabel": "Kosten (€)",
        "series": {
          "cost": "Geschätzte Kosten"
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Zaun Rechner?",
          "content": "Ein Zaun Rechner schätzt die exakte Anzahl von Pfosten, Latten (Brettern), Querriegeln, Betonsäcken und Befestigungsmitteln, die für Ihr Zaunprojekt benötigt werden. Anstatt grobe Schätzungen im Baumarkt zu machen, verhindert eine genaue Materialliste kostspielige Rückfahrten für fehlende Materialien oder Verschwendung durch Überkauf. Dieser Rechner bewältigt die Geometrie, die den meisten Heimwerkern Probleme bereitet: Berücksichtigung von Toröffnungen, Berechnung der Pfostentiefe basierend auf der Zaunhöhe, Anpassung der Lattenanzahl für verschiedene Brettbreiten und -abstände, und Schätzung des Betonvolumens zum Setzen der Pfosten. Er unterstützt mehrere Zaunstile einschließlich Sichtschutz (aneinanderliegende Bretter), Lattenzaun (beabstandete Bretter) und Shadowbox (abwechselnde Bretter auf beiden Seiten). Ob Sie einen kleinen Hinterhof oder einen gesamten Grundstücksumfang umzäunen, genaue Materialschätzungen halten Ihr Projekt im Budget und Zeitplan."
        },
        "howItWorks": {
          "title": "Wie Zaun Material Schätzung funktioniert",
          "content": "Die Berechnung beginnt mit der Gesamtzaunlänge minus Toröffnungen, um die effektive Zaunlänge zu erhalten. Pfosten werden dann berechnet, indem die effektive Länge durch den Pfostenabstand geteilt und 1 addiert wird (für den Endpfosten), plus 2 zusätzliche Pfosten pro Tor (Torpfosten sind oft 6×6 für Hardware-Unterstützung). Die Anzahl der Abschnitte entspricht Pfosten minus 1. Querriegel pro Abschnitt (typischerweise 2 für Zäune unter 6 ft, 3 für 6-8 ft) werden mit Abschnitten für Gesamt-Querriegel multipliziert. Latten werden berechnet, indem die gesamte effektive Länge (in Zoll) durch die kombinierte Breite einer Latte plus einer Lücke geteilt wird. Für Shadowbox-Stil wird die Lattenanzahl etwa verdoppelt, da Bretter auf abwechselnden Seiten installiert werden. Pfostenlänge entspricht Zaunhöhe plus Vergrabungstiefe — die Standardregel ist 1/3 der Gesamtpfostenlänge unterirdisch, also verwendet ein 6 ft Zaun 8 ft Pfosten (6 ft oben + 2 ft vergraben). Beton pro Pfosten hängt vom Lochdurchmesser (typischerweise 3× Pfostenbreite) und der Tiefe ab, wobei 1-2 Säcke 40 kg Betonmischung pro Pfosten Standard sind."
        },
        "considerations": {
          "title": "Wichtige Bau Überlegungen",
          "items": [
            {
              "text": "Prüfen Sie örtliche Bauvorschriften und Hausbesitzervereinbarungen vor dem Beginn. Viele Gemeinden verlangen Genehmigungen für Zäune über 4 ft und haben Abstandsanforderungen von Grundstücksgrenzen (oft 2-6 Zoll).",
              "type": "warning"
            },
            {
              "text": "Rufen Sie den Leitungsauskunftsdienst mindestens 48 Stunden vor dem Graben von Pfostenlöchern an. Das Treffen unterirdischer Gas-, Wasser- oder Stromleitungen ist gefährlich und teuer.",
              "type": "warning"
            },
            {
              "text": "Pfostenabstand beeinflusst die Zaunstärke. 8 ft ist Standard für die meisten Holzzäune, aber reduzieren Sie auf 6 ft in windreichen Gebieten oder für Zäune über 6 ft hoch. Maschendraht kann bis zu 10 ft Abstand zwischen Pfosten verwenden.",
              "type": "info"
            },
            {
              "text": "Torpfosten tragen die meiste Belastung. Verwenden Sie 6×6 Pfosten für Tore, auch wenn der Rest des Zauns 4×4 verwendet. Setzen Sie Torpfosten 6 Zoll tiefer und verwenden Sie 2 Betonsäcke statt 1.",
              "type": "info"
            },
            {
              "text": "Druckimprägniertes Holz benötigt 6-12 Monate zum Trocknen vor dem Beizen. Tragen Sie sofort nach dem Bau ein wasserabweisendes Schutzmittel auf, dann beizen Sie im folgenden Jahr für beste Ergebnisse.",
              "type": "info"
            },
            {
              "text": "Shadowbox-Zäune verwenden fast doppelt so viele Latten, bieten aber Privatsphäre von beiden Seiten und sehen von beiden Seiten gleich gut aus — wichtig, wenn örtliche Vorschriften verlangen, dass die 'gute Seite' zu Nachbarn zeigt.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Zaun Stile & Verwendungen",
          "items": [
            {
              "text": "Sichtschutzzaun (Seite-an-Seite): Bretter bündig platziert ohne Lücken. Bietet vollständige Sicht- und Windblockierung. Beliebtester Wohnstil. 6 ft ist die Standardhöhe für maximale Privatsphäre.",
              "type": "info"
            },
            {
              "text": "Lattenzaun (Beabstandet): Bretter mit Lücken für einen dekorativen, offenen Look. Klassischer amerikanischer Stil mit 3-4 ft Höhe. Definiert Grenzen ohne Sicht oder Luftstrom zu blockieren.",
              "type": "info"
            },
            {
              "text": "Shadowbox (Brett-auf-Brett): Abwechselnde Bretter auf beiden Seiten der Querriegel mit leichter Überlappung. Bietet Privatsphäre bei Luftstrom, reduziert Windlast. Sieht von beiden Seiten gleich fertig aus.",
              "type": "info"
            },
            {
              "text": "Maschendraht: Stahlgewebe an Metallpfosten befestigt. Günstigster pro Meter. Wartungsarm. Verfügbar mit Sichtschutzstreifen oder Vinylbeschichtung. Beste für Grundstücksgrenzen und Tiergehege.",
              "type": "info"
            },
            {
              "text": "Vinyl/PVC: Wartungsfrei, muss nie gestrichen oder gebeizt werden. Widerstandsfähig gegen Fäulnis, Insekten und Verblassen. Höhere Anfangskosten aber niedrigste Lebenszeit-Kosten. Verfügbar in Sichtschutz-, Halbsichtschutz- und Lattenstilen.",
              "type": "info"
            },
            {
              "text": "Horizontales Brett: Moderner/zeitgenössischer Stil mit horizontal zwischen Pfosten laufenden Brettern. Verwendet dieselben Materialien wie vertikale Zäune, benötigt aber engeren Pfostenabstand (6 ft max) um Brettdurchhang zu verhindern.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Zaun Berechnungs Beispiele",
          "description": "Schritt-für-Schritt Beispiele für häufige Projekte",
          "examples": [
            {
              "title": "100 ft Sichtschutzzaun, 6 ft hoch, 5.5\" Bretter, 1 Tor (4 ft)",
              "steps": [
                "Effektive Länge = 100 - (1 × 4) = 96 ft",
                "Pfosten = ceil(96 ÷ 8) + 1 + (1 × 2) = 12 + 1 + 2 = 15 Pfosten",
                "Abschnitte = 15 - 1 - 1 = 13 Zaunabschnitte (ohne Tor)",
                "Querriegel = 13 × 2 = 26 Querriegel",
                "Latten = ceil(96 × 12 ÷ 5.5) = ceil(209.5) = 210 Bretter",
                "Pfostenlänge = 6 + 2 = 8 ft (1/3 vergraben)",
                "Beton = 15 × 1.5 = ~23 Säcke (40 kg)"
              ],
              "result": "Kaufen Sie 15 Pfosten (8 ft), 210 Bretter, 26 Querriegel, 23 Betonsäcke."
            },
            {
              "title": "60 ft Shadowbox, 6 ft hoch, 5.5\" Bretter, 1.5\" Überlappung",
              "steps": [
                "Effektive Länge = 60 ft (keine Tore)",
                "Pfosten = ceil(60 ÷ 8) + 1 = 8 + 1 = 9 Pfosten",
                "Abschnitte = 9 - 1 = 8 Zaunabschnitte",
                "Querriegel = 8 × 3 = 24 Querriegel",
                "Vordere Latten = ceil(60 × 12 ÷ (5.5 + 1.5)) = ceil(103) = 103",
                "Hintere Latten = ~103 (gleiche Anzahl, abwechselnd)",
                "Gesamt Latten = 103 + 103 = 206 Bretter",
                "Beton = 9 × 1.5 = ~14 Säcke"
              ],
              "result": "Kaufen Sie 9 Pfosten, 206 Bretter, 24 Querriegel, 14 Betonsäcke."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie tief sollten Zaunpfosten vergraben werden?",
          "answer": "Die allgemeine Regel ist, 1/3 der gesamten Pfostenlänge zu vergraben. Für einen 6 ft Zaun verwenden Sie 8 ft Pfosten und vergraben 2 ft. Für einen 8 ft Zaun verwenden Sie 12 ft Pfosten und vergraben 4 ft (oder mindestens 3 ft). In kalten Klimazonen sollten Pfosten unter die Frostgrenze reichen, um Hebung zu verhindern — prüfen Sie örtliche Bauvorschriften für die Frosttiefe Ihrer Gegend. Legen Sie immer 3-4 Zoll Kies auf den Boden des Lochs zur Entwässerung, dann füllen Sie mit Beton bis 1-2 Zoll unter Bodenniveau, abgeschrägt vom Pfosten weg um Wasser abzuleiten."
        },
        {
          "question": "Wie viele Betonsäcke pro Zaunpfosten?",
          "answer": "Für Standard 4×4 Pfosten in 8-Zoll Durchmesser Löchern, die 24 Zoll tief vergraben sind, planen Sie 1 bis 1.5 Säcke (40 kg) fertige Betonmischung pro Pfosten. Für 6×6 Torpfosten oder tiefere Löcher verwenden Sie 2 Säcke pro Pfosten. Eine schnelle Formel: Ein Loch 8\" breit × 24\" tief verwendet etwa 0.6 Kubikfuß Beton — ein 40 kg Sack ergibt etwa 0.6 Kubikfuß. Wenn Ihr Boden sehr sandig oder locker ist, benötigen Sie möglicherweise etwas mehr, um Hohlräume zu füllen."
        },
        {
          "question": "Was ist der beste Pfostenabstand für einen Holzzaun?",
          "answer": "8 Fuß von Mitte zu Mitte ist der Standard für die meisten Holzzäune mit Standard 8-ft Querriegeln. Dies bietet eine gute Balance aus Stärke, Materialeffizienz und Aussehen. In windreichen Gebieten, bei starkem Schnee oder für Zäune über 6 ft hoch, reduzieren Sie den Abstand auf 6 ft für zusätzliche Stärke. Maschendrahtzäune können 10 ft Abstand verwenden, weil das Gewebe die Windlast über den gesamten Zaun verteilt, anstatt sie auf jeden Abschnitt zu konzentrieren."
        },
        {
          "question": "Wie berechne ich Bretter für einen Shadowbox-Zaun?",
          "answer": "Ein Shadowbox-Zaun hat Bretter auf beiden Seiten der Querriegel, versetzt so dass die Bretter jeder Seite die Lücken der anderen Seite abdecken. Die Gesamtlattenanzahl ist etwa doppelt so hoch wie bei einem Standard-Sichtschutzzaun. Jede Seite verwendet etwas weniger Bretter als ein Sichtschutzzaun wegen des Abstands zwischen den Brettern, aber die beiden Seiten zusammen verwenden mehr Gesamtholz. Zum Beispiel, wenn ein Sichtschutzzaun 200 Bretter benötigt, braucht ein Shadowbox mit 1.5\" Abstand zwischen Brettern etwa 340-380 Bretter insgesamt (etwas weniger als das Doppelte wegen des Abstands)."
        },
        {
          "question": "Sollte ich 4×4 oder 6×6 Zaunpfosten verwenden?",
          "answer": "4×4 Pfosten (tatsächlich 3.5×3.5 Zoll) sind Standard für die meisten Wohnzäune bis 6 ft hoch mit 8 ft Pfostenabstand. Verwenden Sie 6×6 Pfosten (tatsächlich 5.5×5.5 Zoll) für Torpfosten (sie tragen die meiste Belastung durch Torgewicht und Schwingen), Eckpfosten, Zäune über 6 ft hoch, und in windreichen Gebieten. Einige Bauherren verwenden 6×6 für alle Pfosten bei Premium-Zäunen — die zusätzliche Breite bietet deutlich mehr Stärke und sieht massiver aus."
        },
        {
          "question": "Wie beeinflussen Tore die Materialberechnung?",
          "answer": "Tore reduzieren die benötigte Zaunmaterialmenge (die Toröffnung braucht keine Latten oder Querriegel) fügen aber Pfosten hinzu. Jedes Tor benötigt 2 spezielle Torpfosten — diese sind oft 6×6 für Stärke, auch wenn der Rest des Zauns 4×4 verwendet. Der Rechner subtrahiert Torbreiten von der Gesamtzaunlänge für Latten- und Querriegelberechnungen, fügt dann 2 Pfosten pro Tor hinzu. Tor-Hardware (Scharniere, Riegel, Feder) ist separat und kostet typischerweise 15-40€ pro Tor für Standard-Gehwegtore."
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
      }
    },
  },

  inputs: [
    // ── Fence Style (imageradio) ──────────────────────────────────────
    {
      id: "fenceStyle",
      type: "imageradio",
      columns: 3,
      defaultValue: "wood",
      options: [
        { value: "wood", label: "Wood", icon: "🪵" },
        { value: "chainLink", label: "Chain Link", icon: "⛓️" },
        { value: "vinyl", label: "Vinyl", icon: "🏠" },
      ],
    },

    // ── Dimensions ──────────────────────────────────────────────────────
    {
      id: "fenceLength",
      type: "number",
      defaultValue: null,
      placeholder: "150",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      min: 4,
      max: 2000,
    },
    {
      id: "fenceHeight",
      type: "number",
      defaultValue: 6,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      min: 2,
      max: 12,
    },
    {
      id: "postSpacing",
      type: "number",
      defaultValue: 8,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      min: 4,
      max: 12,
    },

    // ── Board Style (only for wood/vinyl) ───────────────────────────────
    {
      id: "boardStyle",
      type: "imageradio",
      columns: 3,
      defaultValue: "sideBySide",
      options: [
        { value: "sideBySide", label: "Privacy", icon: "▮▮" },
        { value: "spaced", label: "Picket", icon: "▯ ▯" },
        { value: "shadowbox", label: "Shadow", icon: "▮▯▮" },
      ],
      showWhen: { field: "fenceStyle", value: "wood" },
    },
    {
      id: "picketWidth",
      type: "number",
      defaultValue: 5.5,
      min: 1.5,
      max: 12,
      step: 0.5,
      suffix: "in",
      showWhen: { field: "fenceStyle", value: "wood" },
    },
    {
      id: "picketSpacing",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 6,
      step: 0.25,
      suffix: "in",
      showWhen: { field: "fenceStyle", value: "wood" },
    },
    {
      id: "railsPerSection",
      type: "stepper",
      defaultValue: 2,
      min: 1,
      max: 5,
      step: 1,
    },

    // ── Gates ───────────────────────────────────────────────────────────
    {
      id: "numberOfGates",
      type: "stepper",
      defaultValue: 1,
      min: 0,
      max: 10,
      step: 1,
    },
    {
      id: "gateWidth",
      type: "number",
      defaultValue: 4,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      min: 2,
      max: 20,
      showWhen: { field: "numberOfGates", value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    },

    // ── Concrete (toggle) ───────────────────────────────────────────────
    {
      id: "includeConcreteEstimate",
      type: "toggle",
      defaultValue: true,
    },
    {
      id: "postSize",
      type: "select",
      defaultValue: "4x4",
      options: [
        { value: "4x4" },
        { value: "6x6" },
        { value: "roundMetal" },
      ],
      showWhen: { field: "includeConcreteEstimate", value: true },
    },

    // ── Cost Estimation (toggle) ────────────────────────────────────────
    {
      id: "estimateCost",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "boardCost",
      type: "number",
      defaultValue: null,
      placeholder: "3.50",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "usd",
      min: 0.1,
      max: 100,
      showWhen: { field: "estimateCost", value: true },
    },
    {
      id: "postCost",
      type: "number",
      defaultValue: null,
      placeholder: "12",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "usd",
      min: 0.5,
      max: 200,
      showWhen: { field: "estimateCost", value: true },
    },
    {
      id: "concreteBagCost",
      type: "number",
      defaultValue: null,
      placeholder: "5.50",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "usd",
      min: 0.5,
      max: 50,
      showWhen: { field: "estimateCost", value: true },
    },
  ],

  inputGroups: [],

  results: [
    { id: "numberOfPosts", type: "primary", format: "number" },
    { id: "numberOfPickets", type: "secondary", format: "number" },
    { id: "numberOfRails", type: "secondary", format: "number" },
    { id: "postLength", type: "secondary", format: "text" },
    { id: "concreteBags", type: "secondary", format: "number" },
    { id: "totalLinearFt", type: "secondary", format: "text" },
    { id: "totalCost", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "structure", type: "list", icon: "🏗️", itemCount: 4 },
    { id: "materials", type: "list", icon: "🪵", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "costBreakdown",
    type: "bar",
    xKey: "material",
    height: 300,
    stacked: false,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "currency",
    series: [{ key: "cost", type: "bar", color: "#3b82f6" }],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    {
      id: "examples",
      type: "code-example",
      icon: "🧮",
      columns: 2,
      exampleCount: 2,
    },
  ],

  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ],

  references: [
    {
      authors: "International Code Council (ICC)",
      year: "2024",
      title: "International Residential Code – Fences and Walls",
      source: "ICC",
      url: "https://www.iccsafe.org/",
    },
    {
      authors: "American Wood Protection Association",
      year: "2024",
      title: "Use Category System – Ground Contact Standards",
      source: "AWPA",
      url: "https://www.awpa.com/",
    },
    {
      authors: "U.S. Department of Agriculture – Forest Products Laboratory",
      year: "2023",
      title: "Wood Handbook: Wood as an Engineering Material",
      source: "USDA FPL",
      url: "https://www.fpl.fs.usda.gov/products/publications/wood-handbook",
    },
  ],

  hero: {
    icon: "🏗️",
    label: "Home & Construction",
  },

  sidebar: {
    showRelated: true,
    showPopular: true,
  },

  features: {
    saveResults: true,
    pdfExport: true,
    sharing: true,
  },

  relatedCalculators: [
    "concrete-calculator",
    "square-footage-calculator",
    "paint-calculator",
  ],

  ads: {
    showSidebar: true,
    showBetweenSections: true,
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (val < 1000) return val.toFixed(0);
  return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

// ─── Calculate Function ──────────────────────────────────────────────────────

export function calculateFenceCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  // ── Read inputs ─────────────────────────────────────────────────────
  const fenceStyle = (values.fenceStyle as string) || "wood";
  const rawLength = values.fenceLength as number | null;
  const rawHeight = (values.fenceHeight as number) || 6;
  const rawPostSpacing = (values.postSpacing as number) || 8;

  if (rawLength === null || rawLength <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Convert to feet ─────────────────────────────────────────────────
  const mToFt = 3.28084;
  const lengthUnit = fieldUnits?.fenceLength || "ft";
  const heightUnit = fieldUnits?.fenceHeight || "ft";
  const spacingUnit = fieldUnits?.postSpacing || "ft";
  const gateUnit = fieldUnits?.gateWidth || "ft";

  const totalLengthFt = lengthUnit === "m" ? rawLength * mToFt : rawLength;
  const heightFt = heightUnit === "m" ? rawHeight * mToFt : rawHeight;
  const postSpacingFt = spacingUnit === "m" ? rawPostSpacing * mToFt : rawPostSpacing;

  const boardStyle = (values.boardStyle as string) || "sideBySide";
  const picketWidthIn = (values.picketWidth as number) || 5.5;
  const picketSpacingIn = (values.picketSpacing as number) ?? 0;
  const railsPerSection = (values.railsPerSection as number) || 2;
  const numberOfGates = (values.numberOfGates as number) ?? 1;
  const rawGateWidth = (values.gateWidth as number) || 4;
  const gateWidthFt = gateUnit === "m" ? rawGateWidth * mToFt : rawGateWidth;

  const includeConcrete = values.includeConcreteEstimate as boolean;
  const postSize = (values.postSize as string) || "4x4";

  const estimateCost = values.estimateCost as boolean;
  const boardCost = values.boardCost as number | null;
  const postCost = values.postCost as number | null;
  const concreteBagCost = values.concreteBagCost as number | null;

  // Currency
  const currUnit = fieldUnits?.boardCost || "usd";
  const SYMBOLS: Record<string, string> = {
    usd: "$", eur: "€", gbp: "£", mxn: "MX$", brl: "R$",
    cad: "C$", cop: "COL$", ars: "AR$", pen: "S/", clp: "CLP ",
  };
  const sym = SYMBOLS[currUnit] || "$";

  // ── Gate deduction ──────────────────────────────────────────────────
  const totalGateWidth = numberOfGates * gateWidthFt;
  const effectiveLengthFt = Math.max(0, totalLengthFt - totalGateWidth);

  // ── Posts ────────────────────────────────────────────────────────────
  const linePosts = Math.ceil(effectiveLengthFt / postSpacingFt) + 1;
  const gatePosts = numberOfGates * 2;
  const totalPosts = linePosts + gatePosts;

  // ── Sections ────────────────────────────────────────────────────────
  const fenceSections = Math.max(0, linePosts - 1);

  // ── Rails ───────────────────────────────────────────────────────────
  const totalRails = fenceSections * railsPerSection;

  // ── Pickets / Boards ────────────────────────────────────────────────
  let totalPickets = 0;

  if (fenceStyle === "wood" || fenceStyle === "vinyl") {
    const effectiveLengthIn = effectiveLengthFt * 12;

    if (boardStyle === "sideBySide") {
      // Privacy: no gaps
      totalPickets = Math.ceil(effectiveLengthIn / picketWidthIn);
    } else if (boardStyle === "spaced") {
      // Picket: boards + gaps
      const combinedWidth = picketWidthIn + picketSpacingIn;
      totalPickets = Math.ceil(effectiveLengthIn / combinedWidth);
    } else if (boardStyle === "shadowbox") {
      // Shadowbox: boards on both sides, offset
      // Each side has boards spaced apart, but combined they provide coverage
      const combinedWidth = picketWidthIn + picketSpacingIn;
      const oneSide = Math.ceil(effectiveLengthIn / combinedWidth);
      totalPickets = oneSide * 2;
    }
  }
  // Chain link doesn't have pickets (uses mesh fabric rolls)

  // ── Post Length ─────────────────────────────────────────────────────
  // Rule: bury 1/3 of total post length → total = height × 1.5
  const postLengthFt = Math.ceil(heightFt * 1.5);
  const burialDepthFt = postLengthFt - heightFt;

  // ── Concrete ────────────────────────────────────────────────────────
  let concreteBags = 0;
  if (includeConcrete) {
    // 4×4 post: ~1 bag per post (8" hole, 24" deep)
    // 6×6 post: ~2 bags per post (10" hole, 24" deep)
    // Round metal: ~0.75 bags per post
    let bagsPerPost = 1;
    if (postSize === "6x6") bagsPerPost = 2;
    if (postSize === "roundMetal") bagsPerPost = 0.75;

    // Deeper holes need more concrete
    if (burialDepthFt > 2.5) bagsPerPost *= 1.25;

    // Gate posts always get 2 bags min
    const linePostBags = Math.ceil(linePosts * bagsPerPost);
    const gatePostBags = gatePosts * 2;
    concreteBags = linePostBags + gatePostBags;
  }

  // ── Fasteners estimate ──────────────────────────────────────────────
  // Rails: 4 screws per rail end (2 per post connection × 2 rails)
  // Pickets: 2 screws per rail per picket
  const railScrews = totalRails * 4;
  const picketScrews = totalPickets * railsPerSection * 2;
  const totalFasteners = railScrews + picketScrews;

  // ── Cost ─────────────────────────────────────────────────────────────
  let picketCostTotal = 0;
  let postCostTotal = 0;
  let concreteCostTotal = 0;
  let railCostTotal = 0;
  let totalCostVal = 0;

  if (estimateCost) {
    if (boardCost && boardCost > 0) {
      picketCostTotal = totalPickets * boardCost;
      // Rails are typically similar cost to boards
      railCostTotal = totalRails * boardCost * 1.2;
    }
    if (postCost && postCost > 0) {
      postCostTotal = totalPosts * postCost;
    }
    if (concreteBagCost && concreteBagCost > 0 && includeConcrete) {
      concreteCostTotal = concreteBags * concreteBagCost;
    }
    totalCostVal = picketCostTotal + postCostTotal + concreteCostTotal + railCostTotal;
  }

  // ── Units ───────────────────────────────────────────────────────────
  const postLabel = totalPosts === 1 ? v["post"] || "post" : v["posts"] || "posts";
  const boardLabel = totalPickets === 1 ? v["board"] || "board" : v["boards"] || "boards";
  const railLabel = totalRails === 1 ? v["rail"] || "rail" : v["rails"] || "rails";
  const bagLabel = concreteBags === 1 ? v["bag"] || "bag" : v["bags"] || "bags";
  const ftLabel = v["ft"] || "ft";

  // ── Chart data ──────────────────────────────────────────────────────
  const chartData: Array<Record<string, unknown>> = [];
  if (estimateCost && totalCostVal > 0) {
    if (picketCostTotal > 0) chartData.push({ material: "Boards", cost: Math.round(picketCostTotal) });
    if (railCostTotal > 0) chartData.push({ material: "Rails", cost: Math.round(railCostTotal) });
    if (postCostTotal > 0) chartData.push({ material: "Posts", cost: Math.round(postCostTotal) });
    if (concreteCostTotal > 0) chartData.push({ material: "Concrete", cost: Math.round(concreteCostTotal) });
  }

  // ── Summary ─────────────────────────────────────────────────────────
  const f = (t?.formats as Record<string, string>) || {};
  const summary =
    f.summary
      ?.replace("{length}", fmtNum(Math.round(totalLengthFt)))
      .replace("{posts}", fmtNum(totalPosts))
      .replace("{pickets}", fmtNum(totalPickets))
      .replace("{rails}", fmtNum(totalRails))
      .replace("{concrete}", fmtNum(concreteBags)) || "";

  // ── Return ──────────────────────────────────────────────────────────
  return {
    values: {
      numberOfPosts: totalPosts,
      numberOfPickets: totalPickets,
      numberOfRails: totalRails,
      postLength: postLengthFt,
      concreteBags: concreteBags,
      totalLinearFt: Math.round(totalLengthFt),
      totalCost: totalCostVal,
      // InfoCard values
      numberOfSections: fenceSections,
      effectiveLength: Math.round(effectiveLengthFt),
      fasteners: totalFasteners,
    },
    formatted: {
      numberOfPosts: `${fmtNum(totalPosts)} ${postLabel}`,
      numberOfPickets:
        fenceStyle === "chainLink"
          ? "N/A (mesh fabric)"
          : `${fmtNum(totalPickets)} ${boardLabel}`,
      numberOfRails: `${fmtNum(totalRails)} ${railLabel}`,
      postLength: `${postLengthFt} ${ftLabel} (${Math.round(burialDepthFt * 12)}" buried)`,
      concreteBags: includeConcrete
        ? `${fmtNum(concreteBags)} ${bagLabel} (80 lb)`
        : "—",
      totalLinearFt: `${fmtNum(Math.round(totalLengthFt))} ${ftLabel}`,
      totalCost:
        estimateCost && totalCostVal > 0
          ? `${sym}${fmtNum(Math.round(totalCostVal))}`
          : "—",
      // InfoCard values
      numberOfSections: `${fmtNum(fenceSections)} ${v["sections"] || "sections"}`,
      effectiveLength: `${fmtNum(Math.round(effectiveLengthFt))} ${ftLabel} (minus gates)`,
      fasteners: `~${fmtNum(totalFasteners)} ${v["screws"] || "screws"}`,
    },
    summary,
    isValid: true,
    metadata: {
      chartData: chartData.length > 0 ? chartData : undefined,
    },
  };
}

export default fenceCalculatorConfig;
