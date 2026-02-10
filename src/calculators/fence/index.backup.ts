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
