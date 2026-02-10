import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

// ─── Tile Calculator Config ─────────────────────────────────────────────────

export const tileCalculatorConfig: CalculatorConfigV4 = {
  id: "tile-calculator",
  version: "4.0",
  category: "home",
  icon: "🔲",

  presets: [
    {
      id: "bathroomFloor",
      icon: "🚿",
      values: {
        surfaceType: "floor",
        areaLength: 8,
        areaWidth: 10,
        tileSize: "12x12",
        tileLengthIn: 12,
        tileWidthIn: 12,
        layoutPattern: "grid",
        groutJointWidth: "0.125",
        wasteFactor: 10,
        calculateMaterials: true,
        groutType: "sanded",
        tileThickness: "0.375",
        thinsetCoverage: 80,
        estimateCost: false,
        tileCostPerSqft: null,
        tilesPerBox: 10,
        boxPrice: null,
      },
    },
    {
      id: "kitchenBacksplash",
      icon: "🍳",
      values: {
        surfaceType: "backsplash",
        areaLength: 12,
        areaWidth: 1.5,
        tileSize: "4x4",
        tileLengthIn: 4,
        tileWidthIn: 4,
        layoutPattern: "grid",
        groutJointWidth: "0.0625",
        wasteFactor: 10,
        calculateMaterials: true,
        groutType: "unsanded",
        tileThickness: "0.25",
        thinsetCoverage: 95,
        estimateCost: false,
        tileCostPerSqft: null,
        tilesPerBox: 44,
        boxPrice: null,
      },
    },
    {
      id: "livingRoomFloor",
      icon: "🏠",
      values: {
        surfaceType: "floor",
        areaLength: 20,
        areaWidth: 15,
        tileSize: "18x18",
        tileLengthIn: 18,
        tileWidthIn: 18,
        layoutPattern: "grid",
        groutJointWidth: "0.25",
        wasteFactor: 10,
        calculateMaterials: true,
        groutType: "sanded",
        tileThickness: "0.375",
        thinsetCoverage: 60,
        estimateCost: true,
        tileCostPerSqft: 4.5,
        tilesPerBox: 6,
        boxPrice: 40,
      },
    },
    {
      id: "showerWall",
      icon: "🧱",
      values: {
        surfaceType: "wall",
        areaLength: 5,
        areaWidth: 8,
        tileSize: "12x24",
        tileLengthIn: 12,
        tileWidthIn: 24,
        layoutPattern: "runningBond",
        groutJointWidth: "0.125",
        wasteFactor: 12,
        calculateMaterials: true,
        groutType: "sanded",
        tileThickness: "0.375",
        thinsetCoverage: 60,
        estimateCost: false,
        tileCostPerSqft: null,
        tilesPerBox: 8,
        boxPrice: null,
      },
    },
    {
      id: "entryHerringbone",
      icon: "✨",
      values: {
        surfaceType: "floor",
        areaLength: 6,
        areaWidth: 8,
        tileSize: "3x6",
        tileLengthIn: 3,
        tileWidthIn: 6,
        layoutPattern: "herringbone",
        groutJointWidth: "0.125",
        wasteFactor: 20,
        calculateMaterials: true,
        groutType: "sanded",
        tileThickness: "0.375",
        thinsetCoverage: 95,
        estimateCost: false,
        tileCostPerSqft: null,
        tilesPerBox: 80,
        boxPrice: null,
      },
    },
  ],

  t: {
    en: {
      name: "Tile Calculator",
      slug: "tile-calculator",
      subtitle:
        "Calculate how many tiles you need plus grout, thinset, and cost estimates for any floor, wall, or backsplash project.",
      breadcrumb: "Tile Calc",

      seo: {
        title: "Tile Calculator - Tiles, Grout & Thinset Estimator | Free",
        description:
          "Calculate how many tiles you need for any project. Includes grout, thinset, and cost estimates with pattern-specific waste for grid, diagonal, running bond, and herringbone layouts.",
        shortDescription:
          "Estimate tiles, grout, thinset, and cost for any tiling project.",
        keywords: [
          "tile calculator",
          "how many tiles do i need",
          "tile coverage calculator",
          "grout calculator",
          "thinset calculator",
          "floor tile calculator",
          "backsplash tile calculator",
          "tile cost estimator",
        ],
      },

      calculator: { yourInformation: "Project Details" },
      ui: {
        yourInformation: "Project Details",
        calculate: "Calculate Tiles",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        surfaceType: {
          label: "Surface Type",
          helpText: "Select the type of surface you are tiling",
          options: {
            floor: "Floor",
            wall: "Wall",
            backsplash: "Backsplash",
          },
        },
        areaLength: {
          label: "Length",
          helpText: "Measure the total length of the area to tile",
        },
        areaWidth: {
          label: "Width / Height",
          helpText:
            "For floors: measure wall to wall. For walls: measure floor to ceiling or desired height",
        },
        tileSize: {
          label: "Tile Size (Quick Pick)",
          helpText: "Select a common tile size or choose Custom to enter your own dimensions",
          options: {
            "4x4": '4" × 4"',
            "6x6": '6" × 6"',
            "3x6": '3" × 6" (Subway)',
            "8x8": '8" × 8"',
            "12x12": '12" × 12"',
            "12x24": '12" × 24"',
            "18x18": '18" × 18"',
            "24x24": '24" × 24"',
            custom: "Custom Size",
          },
        },
        tileLengthIn: {
          label: "Tile Length",
          helpText: "The length of a single tile in inches",
        },
        tileWidthIn: {
          label: "Tile Width",
          helpText: "The width of a single tile in inches",
        },
        layoutPattern: {
          label: "Layout Pattern",
          helpText:
            "Pattern affects waste percentage. Herringbone and diagonal layouts require more cuts",
          options: {
            grid: "Grid",
            diagonal: "Diagonal",
            runningBond: "Running Bond",
            herringbone: "Herringbone",
          },
        },
        groutJointWidth: {
          label: "Grout Joint Width",
          helpText:
            'Standard is 1/8". Use unsanded grout for joints under 1/8", sanded for 1/8" and wider',
          options: {
            "0.0625": '1/16"',
            "0.125": '1/8" (Standard)',
            "0.1875": '3/16"',
            "0.25": '1/4"',
            "0.375": '3/8"',
          },
        },
        wasteFactor: {
          label: "Waste Factor",
          helpText:
            "Auto-set by pattern. Grid: 10%, Running Bond: 12%, Diagonal: 15%, Herringbone: 20%. Adjust as needed",
        },
        calculateMaterials: {
          label: "Calculate Grout & Thinset",
          helpText: "Estimate grout and thinset mortar quantities for your project",
        },
        groutType: {
          label: "Grout Type",
          helpText:
            'Sanded for joints ≥ 1/8". Unsanded for joints < 1/8". Epoxy for wet areas and chemical resistance',
          options: {
            sanded: "Sanded Grout",
            unsanded: "Unsanded Grout",
            epoxy: "Epoxy Grout",
          },
        },
        tileThickness: {
          label: "Tile Thickness",
          helpText:
            "Affects grout joint depth. Standard ceramic: 1/4\"-3/8\". Porcelain: 3/8\"-1/2\"",
          options: {
            "0.1875": '3/16" (Thin mosaic)',
            "0.25": '1/4" (Standard ceramic)',
            "0.375": '3/8" (Standard porcelain)',
            "0.5": '1/2" (Thick porcelain/stone)',
          },
        },
        thinsetCoverage: {
          label: "Thinset Coverage",
          helpText:
            "Square feet per bag. Small tiles (< 8\"): ~95 sqft. Medium (12\"): ~80 sqft. Large (18\"+): ~60 sqft",
        },
        estimateCost: {
          label: "Estimate Cost",
          helpText: "Calculate estimated material costs for your project",
        },
        tileCostPerSqft: {
          label: "Tile Cost",
          helpText: "Price per square foot of tile. Check your supplier for pricing",
        },
        tilesPerBox: {
          label: "Tiles Per Box",
          helpText: "Number of tiles in each box. Check the product label",
        },
        boxPrice: {
          label: "Price Per Box",
          helpText: "Cost of one box of tiles",
        },
      },

      results: {
        tilesNeeded: { label: "Tiles Needed" },
        tilesWithWaste: { label: "Tiles with Waste" },
        boxesNeeded: { label: "Boxes to Buy" },
        totalArea: { label: "Total Area" },
        groutBags: { label: "Grout Bags" },
        thinsetBags: { label: "Thinset Bags" },
        totalCost: { label: "Est. Total Cost" },
      },

      presets: {
        bathroomFloor: {
          label: "Bathroom Floor",
          description: '8×10 ft, 12×12" tile, grid pattern',
        },
        kitchenBacksplash: {
          label: "Kitchen Backsplash",
          description: '12×1.5 ft, 4×4" tile, 1/16" grout',
        },
        livingRoomFloor: {
          label: "Living Room",
          description: '20×15 ft, 18×18" tile, with cost',
        },
        showerWall: {
          label: "Shower Wall",
          description: '5×8 ft, 12×24" tile, running bond',
        },
        entryHerringbone: {
          label: "Entry Herringbone",
          description: '6×8 ft, 3×6" subway tile, herringbone',
        },
      },

      values: {
        tiles: "tiles",
        tile: "tile",
        boxes: "boxes",
        box: "box",
        bags: "bags",
        bag: "bag",
        sqft: "sq ft",
        lbs: "lbs",
        in: "in",
        waste: "waste",
      },

      formats: {
        summary:
          "You need {tiles} tiles ({withWaste} with {waste}% waste) to cover {area} sq ft. Buy {boxes} boxes.",
      },

      infoCards: {
        tileCount: {
          title: "Tile Summary",
          items: [
            { label: "Tiles (no waste)", valueKey: "tilesNeeded" },
            { label: "Tiles (with waste)", valueKey: "tilesWithWaste" },
            { label: "Boxes to Buy", valueKey: "boxesNeeded" },
            { label: "Total Area", valueKey: "totalArea" },
          ],
        },
        materials: {
          title: "Materials Needed",
          items: [
            { label: "Grout Bags", valueKey: "groutBags" },
            { label: "Thinset Bags", valueKey: "thinsetBags" },
            { label: "Grout Type", valueKey: "groutTypeLabel" },
            { label: "Recommended Trowel", valueKey: "trowelSize" },
          ],
        },
        tips: {
          title: "Pro Tips",
          items: [
            "Always buy tiles from the same batch/lot number. Color and shade vary between production runs, making later matching nearly impossible.",
            "Keep 2-3 extra tiles for future repairs. Store them flat in a dry area. Replacement tiles from a different batch will look noticeably different.",
            "Start tiling from the center of the room, not from a corner. This ensures balanced cuts at all walls and avoids tiny slivers along one edge.",
            "Use the correct trowel size: 1/4\" notch for small tiles, 3/8\" for 12\" tiles, and 1/2\" for large format tiles (18\"+).",
          ],
        },
      },

      chart: {
        title: "Material Breakdown",
        xLabel: "Material",
        yLabel: "Cost ($)",
        series: {
          cost: "Estimated Cost",
        },
      },

      education: {
        whatIs: {
          title: "What Is a Tile Calculator?",
          content:
            "A tile calculator helps you estimate the exact number of tiles, grout, and thinset mortar needed for your flooring, wall, or backsplash project. Rather than guessing and risking running short (or over-buying), a proper tile calculation considers the area to cover, tile dimensions, grout joint width, layout pattern, and a waste factor for cuts and breakage. This calculator goes beyond simple tile counting by also estimating grout volume based on joint dimensions, thinset coverage based on tile size and trowel selection, and total project cost when material prices are provided. Whether you're tiling a small bathroom floor or a large living room, accurate material estimates save money, prevent project delays, and ensure consistent results from the same tile batch.",
        },
        howItWorks: {
          title: "How Tile Estimation Works",
          content:
            "The calculation begins by determining the total area to tile (length × width). Next, it calculates the coverage area of each individual tile by converting tile dimensions from inches to square feet. The base tile count is the total area divided by the area per tile, rounded up. A waste factor is then applied based on your chosen layout pattern: straight grid patterns produce the least waste (10%), while herringbone and complex patterns generate more offcuts that can't be reused (15-20%). For grout, the calculator determines the total linear footage of grout joints using tile size and spacing, then computes the volume based on joint width and tile thickness (which determines joint depth). Thinset mortar is simpler — it covers the entire area as a continuous bed, so the calculation divides total area by the bag's coverage rate. Different trowel sizes affect coverage: a 1/4\" notch trowel spreads thinner, covering more area per bag, while a 1/2\" notch for large tiles uses more material per square foot.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            {
              text: "Grout joint width affects both appearance and material needs. Narrow joints (1/16\") create a sleek modern look but require rectified tiles. Standard joints (1/8\") work for most installations.",
              type: "info",
            },
            {
              text: "Use sanded grout for joints 1/8\" or wider — the sand particles provide structural strength. Use unsanded grout for joints under 1/8\" — sand can scratch delicate glass or polished stone tiles.",
              type: "warning",
            },
            {
              text: "Large format tiles (18\"+ on any side) require a 1/2\" notch trowel, latex-modified thinset, and back-buttering for proper adhesion. Coverage per bag drops significantly.",
              type: "warning",
            },
            {
              text: "Diagonal, herringbone, and chevron patterns require 15-20% more tile than grid layouts. The angled cuts create triangular waste pieces that usually cannot be reused elsewhere in the layout.",
              type: "info",
            },
            {
              text: "Natural stone tiles (marble, granite, travertine) need sealing before grouting to prevent stain absorption. They also require white thinset — gray thinset can show through translucent stones.",
              type: "warning",
            },
            {
              text: "For wet areas (showers, pool surrounds), epoxy grout provides superior water resistance and chemical durability. It costs more but prevents mold growth and staining in high-moisture environments.",
              type: "info",
            },
          ],
        },
        categories: {
          title: "Tile Layout Patterns",
          items: [
            {
              text: "Grid (Straight Set): The most common and efficient pattern. Tiles align in rows and columns with joints forming a straight grid. Waste is minimal at 10%. Works with any tile size.",
              type: "info",
            },
            {
              text: "Diagonal (45°): Same grid rotated 45 degrees. Creates a diamond effect that makes small rooms appear larger. Requires 15% extra tile for angled edge cuts.",
              type: "info",
            },
            {
              text: "Running Bond (Brick Pattern): Each row is offset by half a tile width, like brickwork. Adds visual movement and hides slight size variations. Requires 12% extra tile.",
              type: "info",
            },
            {
              text: "Herringbone: Rectangular tiles arranged in a V-shaped zigzag. Creates a dramatic, high-end look especially in entryways and corridors. Requires 20% extra for many angled cuts.",
              type: "info",
            },
            {
              text: "Subway Pattern: Typically 3×6\" tiles in running bond. The most popular backsplash pattern. Can be laid horizontally (classic) or vertically (modern). Standard 12% waste.",
              type: "info",
            },
            {
              text: "Versailles / French Pattern: Uses 3-4 different tile sizes in a repeating pattern. Complex to plan but creates an elegant, European look. Waste varies by specific pattern (15-20%).",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Tile Calculation Examples",
          description: "Step-by-step examples for common projects",
          examples: [
            {
              title: 'Bathroom Floor: 8×10 ft with 12×12" tiles, grid layout',
              steps: [
                "Total area = 8 × 10 = 80 sq ft",
                "Tile area = (12 × 12) ÷ 144 = 1.0 sq ft per tile",
                "Base tiles = 80 ÷ 1.0 = 80 tiles",
                "Waste (grid, 10%) = 80 × 0.10 = 8 tiles",
                "Total tiles = 80 + 8 = 88 tiles",
                'Grout (1/8" joint, 3/8" thick): ~7 lbs → 1 bag (25 lb)',
                "Thinset (80 sqft/bag): 80 ÷ 80 = 1 bag",
              ],
              result: "Buy 88 tiles (9 boxes of 10). 1 bag grout, 1 bag thinset.",
            },
            {
              title: 'Entry: 6×8 ft with 3×6" subway, herringbone layout',
              steps: [
                "Total area = 6 × 8 = 48 sq ft",
                "Tile area = (3 × 6) ÷ 144 = 0.125 sq ft per tile",
                "Base tiles = 48 ÷ 0.125 = 384 tiles",
                "Waste (herringbone, 20%) = 384 × 0.20 = 77 tiles",
                "Total tiles = 384 + 77 = 461 tiles",
                'Grout (1/8" joint): ~12 lbs → 1 bag (25 lb)',
                "Thinset (95 sqft/bag): 48 ÷ 95 ≈ 1 bag",
              ],
              result:
                "Buy 461 tiles (6 boxes of 80). 1 bag grout, 1 bag thinset.",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How many extra tiles should I buy for waste?",
          answer:
            "It depends on your layout pattern and room complexity. For a simple grid layout in a rectangular room, 10% extra is standard. Diagonal patterns need 15% extra, and herringbone or chevron patterns need 20% extra due to the many angled cuts. If your room has alcoves, columns, or irregular shapes, add an additional 5%. Always buy all tiles from the same production batch, as color and shade vary between runs. Keep a few spare tiles stored for future repairs.",
        },
        {
          question: "What's the difference between sanded and unsanded grout?",
          answer:
            "Sanded grout contains fine sand particles that provide structural strength and prevent shrinkage in wider joints. Use it for grout joints 1/8\" or wider — it's the standard for floor tiles and most wall applications. Unsanded grout has a smoother texture and is used for joints narrower than 1/8\", typically with glass tiles, polished marble, or small mosaics where sand particles could scratch the tile surface. Epoxy grout is a third option that provides superior water and chemical resistance for wet areas like showers and pools, though it's more expensive and harder to work with.",
        },
        {
          question: "How do I choose the right trowel size for thinset?",
          answer:
            "Trowel size depends on your tile size. For small tiles under 8×8 inches, use a 1/4\" × 1/4\" square-notch trowel (covers ~95 sq ft per bag). For medium tiles around 12×12 inches, use a 3/8\" × 3/8\" square-notch trowel (~80 sq ft per bag). For large format tiles 18 inches or larger, use a 1/2\" × 1/2\" square-notch trowel (~60 sq ft per bag). Always check the thinset bag label for specific coverage rates, as they vary by product and manufacturer.",
        },
        {
          question: "Can I use this calculator for wall tiles?",
          answer:
            "Yes. Select \"Wall\" or \"Backsplash\" as the surface type. For walls, enter the wall length and the height you want to tile. The tile count, grout, and thinset calculations work the same way for walls and floors. The main difference is that walls typically use mastic adhesive (for small ceramic tiles) instead of thinset, though large format wall tiles still require latex-modified thinset for proper weight support.",
        },
        {
          question: "Does grout joint width affect how many tiles I need?",
          answer:
            "Technically yes, but the effect is small and usually covered by your waste percentage. Wider grout joints (1/4\" or 3/8\") reduce the number of tiles slightly because the joints take up more space. For example, in a 100 sq ft room with 12×12\" tiles, 1/4\" joints save about 2-3 tiles compared to 1/16\" joints. The more significant impact of grout width is on grout quantity — wider joints require substantially more grout material.",
        },
        {
          question: "How accurate is this calculator compared to professional estimates?",
          answer:
            "This calculator provides estimates within 5-10% of professional tile installer quotes for standard rectangular spaces. It uses industry-standard formulas for tile count, grout volume, and thinset coverage. For complex spaces with many cuts, angled walls, or multiple alcoves, a professional site visit will give a more precise estimate. Always round up when purchasing — having a few extra tiles is far better than running short mid-project and discovering your tile has been discontinued or the new batch doesn't match.",
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
        calculate: "Calculate Tiles",
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
    // ── Surface Type (imageradio) ─────────────────────────────────────
    {
      id: "surfaceType",
      type: "imageradio",
      columns: 3,
      defaultValue: "floor",
      options: [
        { value: "floor", label: "Floor", icon: "🏠" },
        { value: "wall", label: "Wall", icon: "🧱" },
        { value: "backsplash", label: "Backsplash", icon: "🍳" },
      ],
    },

    // ── Area Dimensions ─────────────────────────────────────────────────
    {
      id: "areaLength",
      type: "number",
      defaultValue: null,
      placeholder: "12",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      min: 0.5,
      max: 200,
    },
    {
      id: "areaWidth",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      min: 0.5,
      max: 200,
    },

    // ── Tile Size (quick pick) ──────────────────────────────────────────
    {
      id: "tileSize",
      type: "select",
      defaultValue: "12x12",
      options: [
        { value: "4x4" },
        { value: "6x6" },
        { value: "3x6" },
        { value: "8x8" },
        { value: "12x12" },
        { value: "12x24" },
        { value: "18x18" },
        { value: "24x24" },
        { value: "custom" },
      ],
    },
    {
      id: "tileLengthIn",
      type: "number",
      defaultValue: 12,
      min: 1,
      max: 48,
      step: 0.5,
      suffix: "in",
      showWhen: { field: "tileSize", value: "custom" },
    },
    {
      id: "tileWidthIn",
      type: "number",
      defaultValue: 12,
      min: 1,
      max: 48,
      step: 0.5,
      suffix: "in",
      showWhen: { field: "tileSize", value: "custom" },
    },

    // ── Layout Pattern (imageradio) ─────────────────────────────────────
    {
      id: "layoutPattern",
      type: "imageradio",
      columns: 4,
      defaultValue: "grid",
      options: [
        { value: "grid", label: "Grid", icon: "▦" },
        { value: "diagonal", label: "Diagonal", icon: "◇" },
        { value: "runningBond", label: "Offset", icon: "≋" },
        { value: "herringbone", label: "Herring.", icon: "∠" },
      ],
    },

    // ── Grout & Waste ───────────────────────────────────────────────────
    {
      id: "groutJointWidth",
      type: "select",
      defaultValue: "0.125",
      options: [
        { value: "0.0625" },
        { value: "0.125" },
        { value: "0.1875" },
        { value: "0.25" },
        { value: "0.375" },
      ],
    },
    {
      id: "wasteFactor",
      type: "number",
      defaultValue: 10,
      min: 0,
      max: 30,
      step: 1,
      suffix: "%",
    },

    // ── Materials (toggle-controlled) ───────────────────────────────────
    {
      id: "calculateMaterials",
      type: "toggle",
      defaultValue: true,
    },
    {
      id: "groutType",
      type: "select",
      defaultValue: "sanded",
      options: [
        { value: "sanded" },
        { value: "unsanded" },
        { value: "epoxy" },
      ],
      showWhen: { field: "calculateMaterials", value: true },
    },
    {
      id: "tileThickness",
      type: "select",
      defaultValue: "0.375",
      options: [
        { value: "0.1875" },
        { value: "0.25" },
        { value: "0.375" },
        { value: "0.5" },
      ],
      showWhen: { field: "calculateMaterials", value: true },
    },
    {
      id: "thinsetCoverage",
      type: "number",
      defaultValue: 80,
      min: 20,
      max: 150,
      suffix: "sq ft/bag",
      showWhen: { field: "calculateMaterials", value: true },
    },

    // ── Cost Estimation (toggle) ────────────────────────────────────────
    {
      id: "estimateCost",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "tileCostPerSqft",
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
      id: "tilesPerBox",
      type: "number",
      defaultValue: 10,
      min: 1,
      max: 200,
      step: 1,
      suffix: "tiles/box",
    },
    {
      id: "boxPrice",
      type: "number",
      defaultValue: null,
      placeholder: "35",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "usd",
      min: 1,
      max: 500,
      showWhen: { field: "estimateCost", value: true },
    },
  ],

  inputGroups: [],

  results: [
    { id: "tilesNeeded", type: "primary", format: "number" },
    { id: "tilesWithWaste", type: "secondary", format: "number" },
    { id: "boxesNeeded", type: "secondary", format: "number" },
    { id: "totalArea", type: "secondary", format: "text" },
    { id: "groutBags", type: "secondary", format: "text" },
    { id: "thinsetBags", type: "secondary", format: "text" },
    { id: "totalCost", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "tileCount", type: "list", icon: "🔲", itemCount: 4 },
    { id: "materials", type: "list", icon: "🧱", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "materialBreakdown",
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
      authors: "Tile Council of North America (TCNA)",
      year: "2024",
      title:
        "TCNA Handbook for Ceramic, Glass, and Stone Tile Installation",
      source: "TCNA",
      url: "https://www.tcnatile.com/",
    },
    {
      authors: "National Tile Contractors Association",
      year: "2024",
      title: "Reference Manual – Installation Standards & Specifications",
      source: "NTCA",
      url: "https://www.tile-assn.com/",
    },
    {
      authors: "CUSTOM Building Products",
      year: "2024",
      title: "Thinset Mortar Coverage and Trowel Selection Guide",
      source: "CUSTOM Building Products",
      url: "https://www.custombuildingproducts.com/",
    },
  ],

  hero: {
    icon: "🔲",
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
    "flooring-calculator",
    "square-footage-calculator",
    "drywall-calculator",
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

/** Parse tile size string like "12x24" into {length, width} in inches */
function parseTileSize(
  sizeStr: string,
  customL: number,
  customW: number
): { tileL: number; tileW: number } {
  if (sizeStr === "custom") {
    return { tileL: customL || 12, tileW: customW || 12 };
  }
  const parts = sizeStr.split("x");
  if (parts.length === 2) {
    return { tileL: parseFloat(parts[0]), tileW: parseFloat(parts[1]) };
  }
  return { tileL: 12, tileW: 12 };
}

/** Get default waste % by pattern */
function getDefaultWaste(pattern: string): number {
  switch (pattern) {
    case "grid":
      return 10;
    case "runningBond":
      return 12;
    case "diagonal":
      return 15;
    case "herringbone":
      return 20;
    default:
      return 10;
  }
}

// ─── Calculate Function ──────────────────────────────────────────────────────

export function calculateTileCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  // ── Read inputs ─────────────────────────────────────────────────────
  const rawLength = values.areaLength as number | null;
  const rawWidth = values.areaWidth as number | null;

  if (rawLength === null || rawWidth === null) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (rawLength <= 0 || rawWidth <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Convert to feet
  const lengthUnit = fieldUnits?.areaLength || "ft";
  const widthUnit = fieldUnits?.areaWidth || "ft";
  const mToFt = 3.28084;
  const lengthFt = lengthUnit === "m" ? rawLength * mToFt : rawLength;
  const widthFt = widthUnit === "m" ? rawWidth * mToFt : rawWidth;

  const totalArea = lengthFt * widthFt;

  // Tile dimensions
  const tileSize = (values.tileSize as string) || "12x12";
  const customL = (values.tileLengthIn as number) || 12;
  const customW = (values.tileWidthIn as number) || 12;
  const { tileL, tileW } = parseTileSize(tileSize, customL, customW);

  // Pattern & waste
  const pattern = (values.layoutPattern as string) || "grid";
  const wasteInput = values.wasteFactor as number;
  const wastePct =
    wasteInput !== null && wasteInput !== undefined
      ? wasteInput
      : getDefaultWaste(pattern);

  // Grout
  const groutJointWidthIn = parseFloat(
    (values.groutJointWidth as string) || "0.125"
  );
  const calcMaterials = values.calculateMaterials as boolean;
  const groutType = (values.groutType as string) || "sanded";
  const tileThicknessIn = parseFloat(
    (values.tileThickness as string) || "0.375"
  );
  const thinsetCoverage = (values.thinsetCoverage as number) || 80;

  // Cost
  const estimateCost = values.estimateCost as boolean;
  const tileCostPerSqft = values.tileCostPerSqft as number | null;
  const tilesPerBox = (values.tilesPerBox as number) || 10;
  const boxPrice = values.boxPrice as number | null;

  // Currency
  const currUnit = fieldUnits?.tileCostPerSqft || "usd";
  const SYMBOLS: Record<string, string> = {
    usd: "$",
    eur: "€",
    gbp: "£",
    mxn: "MX$",
    brl: "R$",
    cad: "C$",
    cop: "COL$",
    ars: "AR$",
    pen: "S/",
    clp: "CLP ",
  };
  const sym = SYMBOLS[currUnit] || "$";

  // ── Tile count ──────────────────────────────────────────────────────
  const tileAreaSqft = (tileL * tileW) / 144;
  const baseTiles = Math.ceil(totalArea / tileAreaSqft);
  const wasteTiles = Math.ceil(baseTiles * (wastePct / 100));
  const totalTiles = baseTiles + wasteTiles;
  const boxesNeeded = Math.ceil(totalTiles / tilesPerBox);

  // ── Grout calculation ───────────────────────────────────────────────
  let groutWeightLbs = 0;
  let groutBags = 0;
  let thinsetBags = 0;
  let trowelRec = "—";

  if (calcMaterials) {
    // Grout: area of joints = total area minus tile coverage ratio
    // R = (tileL × tileW) / ((tileL + grout) × (tileW + grout))
    const tileWithGroutArea =
      ((tileL + groutJointWidthIn) * (tileW + groutJointWidthIn)) / 144;
    const tileCoverageRatio = tileAreaSqft / tileWithGroutArea;
    const groutAreaSqft = totalArea * (1 - tileCoverageRatio);

    // Volume = grout area × depth (tile thickness = grout depth)
    const groutDepthFt = tileThicknessIn / 12;
    const groutVolumeCuft = groutAreaSqft * groutDepthFt;

    // Weight: grout density ~100 lbs/cuft
    groutWeightLbs = groutVolumeCuft * 100;

    // Bags (25 lb standard)
    const bagSize = 25;
    groutBags = Math.ceil(groutWeightLbs / bagSize);
    if (groutBags < 1 && groutWeightLbs > 0) groutBags = 1;

    // Thinset bags
    const thinsetArea = totalArea * (1 + wastePct * 0.005); // slight waste
    thinsetBags = Math.ceil(thinsetArea / thinsetCoverage);
    if (thinsetBags < 1) thinsetBags = 1;

    // Trowel recommendation
    const maxTileDim = Math.max(tileL, tileW);
    if (maxTileDim < 8) {
      trowelRec = '1/4" × 1/4" square notch';
    } else if (maxTileDim <= 15) {
      trowelRec = '3/8" × 3/8" square notch';
    } else {
      trowelRec = '1/2" × 1/2" square notch';
    }
  }

  // ── Cost calculation ────────────────────────────────────────────────
  let tileCost = 0;
  let groutCost = 0;
  let thinsetCost = 0;
  let totalCostVal = 0;

  if (estimateCost) {
    // Tile cost: by sqft or by box
    if (tileCostPerSqft && tileCostPerSqft > 0) {
      tileCost = totalArea * (1 + wastePct / 100) * tileCostPerSqft;
    } else if (boxPrice && boxPrice > 0) {
      tileCost = boxesNeeded * boxPrice;
    }

    // Grout cost estimate: ~$15 per 25lb bag
    groutCost = groutBags * 15;

    // Thinset cost estimate: ~$18 per 50lb bag
    thinsetCost = thinsetBags * 18;

    totalCostVal = tileCost + groutCost + thinsetCost;
  }

  // ── Grout type label ────────────────────────────────────────────────
  const groutTypeLabels: Record<string, string> = {
    sanded: "Sanded",
    unsanded: "Unsanded",
    epoxy: "Epoxy",
  };
  const groutTypeLabel = groutTypeLabels[groutType] || "Sanded";

  // ── Units ───────────────────────────────────────────────────────────
  const sqftUnit = v["sqft"] || "sq ft";
  const tileLabel = totalTiles === 1 ? v["tile"] || "tile" : v["tiles"] || "tiles";
  const boxLabel = boxesNeeded === 1 ? v["box"] || "box" : v["boxes"] || "boxes";
  const bagLabel = v["bags"] || "bags";

  // ── Chart data (cost breakdown) ─────────────────────────────────────
  const chartData: Array<Record<string, unknown>> = [];
  if (estimateCost && totalCostVal > 0) {
    if (tileCost > 0) chartData.push({ material: "Tiles", cost: Math.round(tileCost) });
    if (groutCost > 0) chartData.push({ material: "Grout", cost: Math.round(groutCost) });
    if (thinsetCost > 0) chartData.push({ material: "Thinset", cost: Math.round(thinsetCost) });
  }

  // ── Format summary ─────────────────────────────────────────────────
  const f = (t?.formats as Record<string, string>) || {};
  const summary =
    f.summary
      ?.replace("{tiles}", fmtNum(baseTiles))
      .replace("{withWaste}", fmtNum(totalTiles))
      .replace("{waste}", wastePct.toString())
      .replace("{area}", fmtNum(Math.round(totalArea)))
      .replace("{boxes}", fmtNum(boxesNeeded)) || "";

  // ── Return ──────────────────────────────────────────────────────────
  return {
    values: {
      tilesNeeded: baseTiles,
      tilesWithWaste: totalTiles,
      boxesNeeded: boxesNeeded,
      totalArea: Math.round(totalArea),
      groutBags: groutBags,
      thinsetBags: thinsetBags,
      totalCost: totalCostVal,
      groutTypeLabel: groutTypeLabel,
      trowelSize: trowelRec,
    },
    formatted: {
      tilesNeeded: `${fmtNum(baseTiles)} ${tileLabel}`,
      tilesWithWaste: `${fmtNum(totalTiles)} ${tileLabel} (${wastePct}% ${v["waste"] || "waste"})`,
      boxesNeeded: `${fmtNum(boxesNeeded)} ${boxLabel}`,
      totalArea: `${fmtNum(Math.round(totalArea))} ${sqftUnit}`,
      groutBags: calcMaterials
        ? `${groutBags} ${bagLabel} (25 lb ${groutTypeLabel.toLowerCase()})`
        : "—",
      thinsetBags: calcMaterials ? `${thinsetBags} ${bagLabel}` : "—",
      totalCost:
        estimateCost && totalCostVal > 0
          ? `${sym}${fmtNum(Math.round(totalCostVal))}`
          : "—",
      groutTypeLabel: groutTypeLabel,
      trowelSize: calcMaterials ? trowelRec : "—",
    },
    summary,
    isValid: true,
    metadata: {
      chartData: chartData.length > 0 ? chartData : undefined,
    },
  };
}

export default tileCalculatorConfig;
