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
    es: {
      "name": "Calculadora de Azulejos",
      "slug": "calculadora-azulejos",
      "subtitle": "Calcula cuántos azulejos necesitas más lechada, adhesivo y estimaciones de costo para cualquier proyecto de piso, pared o salpicadero.",
      "breadcrumb": "Calc Azulejos",
      "seo": {
        "title": "Calculadora de Azulejos - Estimador de Azulejos, Lechada y Adhesivo | Gratis",
        "description": "Calcula cuántos azulejos necesitas para cualquier proyecto. Incluye lechada, adhesivo y estimaciones de costo con desperdicio específico por patrón para diseños de cuadrícula, diagonal, junta corrida y espiga.",
        "shortDescription": "Estima azulejos, lechada, adhesivo y costo para cualquier proyecto de azulejado.",
        "keywords": [
          "calculadora de azulejos",
          "cuantos azulejos necesito",
          "calculadora cobertura azulejos",
          "calculadora lechada",
          "calculadora adhesivo",
          "calculadora azulejos piso",
          "calculadora azulejos salpicadero",
          "estimador costo azulejos"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "surfaceType": {
          "label": "Tipo de Superficie",
          "helpText": "Selecciona el tipo de superficie que vas a azulejar",
          "options": {
            "floor": "Piso",
            "wall": "Pared",
            "backsplash": "Salpicadero"
          }
        },
        "areaLength": {
          "label": "Longitud",
          "helpText": "Mide la longitud total del área a azulejar"
        },
        "areaWidth": {
          "label": "Ancho / Altura",
          "helpText": "Para pisos: mide de pared a pared. Para paredes: mide del piso al techo o altura deseada"
        },
        "tileSize": {
          "label": "Tamaño de Azulejo (Selección Rápida)",
          "helpText": "Selecciona un tamaño común de azulejo o elige Personalizado para ingresar tus propias dimensiones",
          "options": {
            "4x4": "4\" × 4\"",
            "6x6": "6\" × 6\"",
            "3x6": "3\" × 6\" (Metro)",
            "8x8": "8\" × 8\"",
            "12x12": "12\" × 12\"",
            "12x24": "12\" × 24\"",
            "18x18": "18\" × 18\"",
            "24x24": "24\" × 24\"",
            "custom": "Tamaño Personalizado"
          }
        },
        "tileLengthIn": {
          "label": "Longitud del Azulejo",
          "helpText": "La longitud de un azulejo individual en pulgadas"
        },
        "tileWidthIn": {
          "label": "Ancho del Azulejo",
          "helpText": "El ancho de un azulejo individual en pulgadas"
        },
        "layoutPattern": {
          "label": "Patrón de Colocación",
          "helpText": "El patrón afecta el porcentaje de desperdicio. Los diseños en espiga y diagonal requieren más cortes",
          "options": {
            "grid": "Cuadrícula",
            "diagonal": "Diagonal",
            "runningBond": "Junta Corrida",
            "herringbone": "Espiga"
          }
        },
        "groutJointWidth": {
          "label": "Ancho de Junta de Lechada",
          "helpText": "El estándar es 1/8\". Usa lechada sin arena para juntas menores a 1/8\", con arena para 1/8\" y más anchas",
          "options": {
            "0.0625": "1/16\"",
            "0.125": "1/8\" (Estándar)",
            "0.1875": "3/16\"",
            "0.25": "1/4\"",
            "0.375": "3/8\""
          }
        },
        "wasteFactor": {
          "label": "Factor de Desperdicio",
          "helpText": "Auto-configurado por patrón. Cuadrícula: 10%, Junta Corrida: 12%, Diagonal: 15%, Espiga: 20%. Ajusta según necesites"
        },
        "calculateMaterials": {
          "label": "Calcular Lechada y Adhesivo",
          "helpText": "Estima las cantidades de lechada y mortero adhesivo para tu proyecto"
        },
        "groutType": {
          "label": "Tipo de Lechada",
          "helpText": "Con arena para juntas ≥ 1/8\". Sin arena para juntas < 1/8\". Epoxi para áreas húmedas y resistencia química",
          "options": {
            "sanded": "Lechada con Arena",
            "unsanded": "Lechada sin Arena",
            "epoxy": "Lechada Epoxi"
          }
        },
        "tileThickness": {
          "label": "Grosor del Azulejo",
          "helpText": "Afecta la profundidad de la junta de lechada. Cerámico estándar: 1/4\"-3/8\". Porcelana: 3/8\"-1/2\"",
          "options": {
            "0.1875": "3/16\" (Mosaico delgado)",
            "0.25": "1/4\" (Cerámico estándar)",
            "0.375": "3/8\" (Porcelana estándar)",
            "0.5": "1/2\" (Porcelana/piedra gruesa)"
          }
        },
        "thinsetCoverage": {
          "label": "Cobertura del Adhesivo",
          "helpText": "Pies cuadrados por bolsa. Azulejos pequeños (< 8\"): ~95 pies². Medianos (12\"): ~80 pies². Grandes (18\"+): ~60 pies²"
        },
        "estimateCost": {
          "label": "Estimar Costo",
          "helpText": "Calcula los costos estimados de materiales para tu proyecto"
        },
        "tileCostPerSqft": {
          "label": "Costo del Azulejo",
          "helpText": "Precio por pie cuadrado de azulejo. Consulta con tu proveedor el precio"
        },
        "tilesPerBox": {
          "label": "Azulejos por Caja",
          "helpText": "Número de azulejos en cada caja. Revisa la etiqueta del producto"
        },
        "boxPrice": {
          "label": "Precio por Caja",
          "helpText": "Costo de una caja de azulejos"
        }
      },
      "results": {
        "tilesNeeded": {
          "label": "Azulejos Necesarios"
        },
        "tilesWithWaste": {
          "label": "Azulejos con Desperdicio"
        },
        "boxesNeeded": {
          "label": "Cajas a Comprar"
        },
        "totalArea": {
          "label": "Área Total"
        },
        "groutBags": {
          "label": "Bolsas de Lechada"
        },
        "thinsetBags": {
          "label": "Bolsas de Adhesivo"
        },
        "totalCost": {
          "label": "Costo Total Est."
        }
      },
      "presets": {
        "bathroomFloor": {
          "label": "Piso de Baño",
          "description": "8×10 pies, azulejo 12×12\", patrón cuadrícula"
        },
        "kitchenBacksplash": {
          "label": "Salpicadero de Cocina",
          "description": "12×1.5 pies, azulejo 4×4\", lechada 1/16\""
        },
        "livingRoomFloor": {
          "label": "Sala de Estar",
          "description": "20×15 pies, azulejo 18×18\", con costo"
        },
        "showerWall": {
          "label": "Pared de Ducha",
          "description": "5×8 pies, azulejo 12×24\", junta corrida"
        },
        "entryHerringbone": {
          "label": "Entrada Espiga",
          "description": "6×8 pies, azulejo metro 3×6\", espiga"
        }
      },
      "values": {
        "tiles": "azulejos",
        "tile": "azulejo",
        "boxes": "cajas",
        "box": "caja",
        "bags": "bolsas",
        "bag": "bolsa",
        "sqft": "pies²",
        "lbs": "lbs",
        "in": "pulg",
        "waste": "desperdicio"
      },
      "formats": {
        "summary": "Necesitas {tiles} azulejos ({withWaste} con {waste}% desperdicio) para cubrir {area} pies². Compra {boxes} cajas."
      },
      "infoCards": {
        "tileCount": {
          "title": "Resumen de Azulejos",
          "items": [
            {
              "label": "Azulejos (sin desperdicio)",
              "valueKey": "tilesNeeded"
            },
            {
              "label": "Azulejos (con desperdicio)",
              "valueKey": "tilesWithWaste"
            },
            {
              "label": "Cajas a Comprar",
              "valueKey": "boxesNeeded"
            },
            {
              "label": "Área Total",
              "valueKey": "totalArea"
            }
          ]
        },
        "materials": {
          "title": "Materiales Necesarios",
          "items": [
            {
              "label": "Bolsas de Lechada",
              "valueKey": "groutBags"
            },
            {
              "label": "Bolsas de Adhesivo",
              "valueKey": "thinsetBags"
            },
            {
              "label": "Tipo de Lechada",
              "valueKey": "groutTypeLabel"
            },
            {
              "label": "Llana Recomendada",
              "valueKey": "trowelSize"
            }
          ]
        },
        "tips": {
          "title": "Consejos Profesionales",
          "items": [
            "Siempre compra azulejos del mismo número de lote/tanda. El color y tono varían entre producciones, haciendo que el emparejamiento posterior sea casi imposible.",
            "Guarda 2-3 azulejos extra para reparaciones futuras. Almacénalos planos en un área seca. Los azulejos de reemplazo de un lote diferente se verán notablemente distintos.",
            "Comienza a azulejar desde el centro de la habitación, no desde una esquina. Esto asegura cortes balanceados en todas las paredes y evita astillas diminutas en un borde.",
            "Usa el tamaño correcto de llana: muesca de 1/4\" para azulejos pequeños, 3/8\" para azulejos de 12\", y 1/2\" para azulejos de formato grande (18\"+)."
          ]
        }
      },
      "chart": {
        "title": "Desglose de Materiales",
        "xLabel": "Material",
        "yLabel": "Costo ($)",
        "series": {
          "cost": "Costo Estimado"
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué Es una Calculadora de Azulejos?",
          "content": "Una calculadora de azulejos te ayuda a estimar el número exacto de azulejos, lechada y mortero adhesivo necesarios para tu proyecto de pisos, paredes o salpicaderos. En lugar de adivinar y arriesgar quedarse corto (o comprar de más), un cálculo apropiado de azulejos considera el área a cubrir, dimensiones del azulejo, ancho de junta de lechada, patrón de colocación y un factor de desperdicio para cortes y roturas. Esta calculadora va más allá del simple conteo de azulejos al también estimar el volumen de lechada basado en las dimensiones de las juntas, cobertura de adhesivo basada en el tamaño del azulejo y selección de llana, y costo total del proyecto cuando se proporcionan los precios de materiales. Ya sea que estés azulejando un piso pequeño de baño o una sala grande, las estimaciones precisas de materiales ahorran dinero, previenen retrasos en el proyecto y aseguran resultados consistentes del mismo lote de azulejos."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Estimación de Azulejos",
          "content": "El cálculo comienza determinando el área total a azulejar (longitud × ancho). Luego, calcula el área de cobertura de cada azulejo individual convirtiendo las dimensiones del azulejo de pulgadas a pies cuadrados. El conteo base de azulejos es el área total dividida por el área por azulejo, redondeado hacia arriba. Entonces se aplica un factor de desperdicio basado en tu patrón de colocación elegido: los patrones de cuadrícula recta producen el menor desperdicio (10%), mientras que los patrones de espiga y complejos generan más recortes que no pueden reutilizarse (15-20%). Para la lechada, la calculadora determina el total de pies lineales de juntas de lechada usando el tamaño y espaciado del azulejo, luego calcula el volumen basado en el ancho de junta y grosor del azulejo (que determina la profundidad de la junta). El mortero adhesivo es más simple — cubre toda el área como una cama continua, así que el cálculo divide el área total por la tasa de cobertura de la bolsa. Diferentes tamaños de llana afectan la cobertura: una llana con muesca de 1/4\" extiende más delgado, cubriendo más área por bolsa, mientras que una muesca de 1/2\" para azulejos grandes usa más material por pie cuadrado."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "El ancho de junta de lechada afecta tanto la apariencia como las necesidades de material. Las juntas estrechas (1/16\") crean un aspecto moderno elegante pero requieren azulejos rectificados. Las juntas estándar (1/8\") funcionan para la mayoría de instalaciones.",
              "type": "info"
            },
            {
              "text": "Usa lechada con arena para juntas de 1/8\" o más anchas — las partículas de arena proporcionan resistencia estructural. Usa lechada sin arena para juntas menores a 1/8\" — la arena puede rayar azulejos delicados de vidrio o piedra pulida.",
              "type": "warning"
            },
            {
              "text": "Los azulejos de formato grande (18\"+ en cualquier lado) requieren una llana con muesca de 1/2\", adhesivo modificado con látex y encolado trasero para adhesión apropiada. La cobertura por bolsa baja significativamente.",
              "type": "warning"
            },
            {
              "text": "Los patrones diagonal, espiga y chevron requieren 15-20% más azulejo que las colocaciones en cuadrícula. Los cortes angulados crean piezas de desperdicio triangulares que usualmente no pueden reutilizarse en otra parte de la colocación.",
              "type": "info"
            },
            {
              "text": "Los azulejos de piedra natural (mármol, granito, travertino) necesitan sellado antes del enlechado para prevenir absorción de manchas. También requieren adhesivo blanco — el adhesivo gris puede mostrarse a través de piedras translúcidas.",
              "type": "warning"
            },
            {
              "text": "Para áreas húmedas (duchas, alrededores de piscinas), la lechada epoxi proporciona resistencia superior al agua y durabilidad química. Cuesta más pero previene el crecimiento de moho y manchas en ambientes de alta humedad.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Patrones de Colocación de Azulejos",
          "items": [
            {
              "text": "Cuadrícula (Colocación Recta): El patrón más común y eficiente. Los azulejos se alinean en filas y columnas con juntas formando una cuadrícula recta. El desperdicio es mínimo al 10%. Funciona con cualquier tamaño de azulejo.",
              "type": "info"
            },
            {
              "text": "Diagonal (45°): La misma cuadrícula rotada 45 grados. Crea un efecto de diamante que hace que las habitaciones pequeñas parezcan más grandes. Requiere 15% azulejo extra para cortes de borde angulados.",
              "type": "info"
            },
            {
              "text": "Junta Corrida (Patrón Ladrillo): Cada fila está desplazada por la mitad del ancho de un azulejo, como el trabajo de ladrillería. Añade movimiento visual y oculta ligeras variaciones de tamaño. Requiere 12% azulejo extra.",
              "type": "info"
            },
            {
              "text": "Espiga: Azulejos rectangulares dispuestos en zigzag en forma de V. Crea un aspecto dramático y de alta gama especialmente en entradas y corredores. Requiere 20% extra por muchos cortes angulados.",
              "type": "info"
            },
            {
              "text": "Patrón Metro: Típicamente azulejos de 3×6\" en junta corrida. El patrón de salpicadero más popular. Puede colocarse horizontalmente (clásico) o verticalmente (moderno). Desperdicio estándar del 12%.",
              "type": "info"
            },
            {
              "text": "Versalles / Patrón Francés: Usa 3-4 tamaños diferentes de azulejos en un patrón repetitivo. Complejo de planificar pero crea un aspecto elegante y europeo. El desperdicio varía por patrón específico (15-20%).",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo de Azulejos",
          "description": "Ejemplos paso a paso para proyectos comunes",
          "examples": [
            {
              "title": "Piso de Baño: 8×10 pies con azulejos de 12×12\", diseño cuadrícula",
              "steps": [
                "Área total = 8 × 10 = 80 pies²",
                "Área del azulejo = (12 × 12) ÷ 144 = 1.0 pie² por azulejo",
                "Azulejos base = 80 ÷ 1.0 = 80 azulejos",
                "Desperdicio (cuadrícula, 10%) = 80 × 0.10 = 8 azulejos",
                "Total azulejos = 80 + 8 = 88 azulejos",
                "Lechada (junta 1/8\", grosor 3/8\"): ~7 lbs → 1 bolsa (25 lb)",
                "Adhesivo (80 pies²/bolsa): 80 ÷ 80 = 1 bolsa"
              ],
              "result": "Compra 88 azulejos (9 cajas de 10). 1 bolsa lechada, 1 bolsa adhesivo."
            },
            {
              "title": "Entrada: 6×8 pies con metro 3×6\", diseño espiga",
              "steps": [
                "Área total = 6 × 8 = 48 pies²",
                "Área del azulejo = (3 × 6) ÷ 144 = 0.125 pie² por azulejo",
                "Azulejos base = 48 ÷ 0.125 = 384 azulejos",
                "Desperdicio (espiga, 20%) = 384 × 0.20 = 77 azulejos",
                "Total azulejos = 384 + 77 = 461 azulejos",
                "Lechada (junta 1/8\"): ~12 lbs → 1 bolsa (25 lb)",
                "Adhesivo (95 pies²/bolsa): 48 ÷ 95 ≈ 1 bolsa"
              ],
              "result": "Compra 461 azulejos (6 cajas de 80). 1 bolsa lechada, 1 bolsa adhesivo."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos azulejos extra debo comprar para desperdicio?",
          "answer": "Depende de tu patrón de colocación y complejidad de la habitación. Para un diseño de cuadrícula simple en una habitación rectangular, 10% extra es estándar. Los patrones diagonales necesitan 15% extra, y los patrones de espiga o chevron necesitan 20% extra debido a los muchos cortes angulados. Si tu habitación tiene alcobas, columnas o formas irregulares, añade un 5% adicional. Siempre compra todos los azulejos del mismo lote de producción, ya que el color y tono varían entre tandas. Mantén algunos azulejos de repuesto almacenados para reparaciones futuras."
        },
        {
          "question": "¿Cuál es la diferencia entre lechada con arena y sin arena?",
          "answer": "La lechada con arena contiene partículas finas de arena que proporcionan resistencia estructural y previenen el encogimiento en juntas más anchas. Úsala para juntas de lechada de 1/8\" o más anchas — es el estándar para azulejos de piso y la mayoría de aplicaciones de pared. La lechada sin arena tiene una textura más suave y se usa para juntas más estrechas que 1/8\", típicamente con azulejos de vidrio, mármol pulido o mosaicos pequeños donde las partículas de arena podrían rayar la superficie del azulejo. La lechada epoxi es una tercera opción que proporciona resistencia superior al agua y químicos para áreas húmedas como duchas y piscinas, aunque es más cara y más difícil de trabajar."
        },
        {
          "question": "¿Cómo elijo el tamaño correcto de llana para el adhesivo?",
          "answer": "El tamaño de llana depende del tamaño de tu azulejo. Para azulejos pequeños menores a 8×8 pulgadas, usa una llana de muesca cuadrada de 1/4\" × 1/4\" (cubre ~95 pies² por bolsa). Para azulejos medianos alrededor de 12×12 pulgadas, usa una llana de muesca cuadrada de 3/8\" × 3/8\" (~80 pies² por bolsa). Para azulejos de formato grande de 18 pulgadas o más grandes, usa una llana de muesca cuadrada de 1/2\" × 1/2\" (~60 pies² por bolsa). Siempre revisa la etiqueta de la bolsa de adhesivo para tasas de cobertura específicas, ya que varían por producto y fabricante."
        },
        {
          "question": "¿Puedo usar esta calculadora para azulejos de pared?",
          "answer": "Sí. Selecciona \"Pared\" o \"Salpicadero\" como el tipo de superficie. Para paredes, ingresa la longitud de la pared y la altura que quieres azulejar. El conteo de azulejos, lechada y cálculos de adhesivo funcionan de la misma manera para paredes y pisos. La principal diferencia es que las paredes típicamente usan adhesivo mastic (para azulejos cerámicos pequeños) en lugar de adhesivo, aunque los azulejos de formato grande para pared aún requieren adhesivo modificado con látex para soporte adecuado del peso."
        },
        {
          "question": "¿El ancho de junta de lechada afecta cuántos azulejos necesito?",
          "answer": "Técnicamente sí, pero el efecto es pequeño y usualmente está cubierto por tu porcentaje de desperdicio. Las juntas de lechada más anchas (1/4\" o 3/8\") reducen ligeramente el número de azulejos porque las juntas ocupan más espacio. Por ejemplo, en una habitación de 100 pies² con azulejos de 12×12\", las juntas de 1/4\" ahorran aproximadamente 2-3 azulejos comparado con juntas de 1/16\". El impacto más significativo del ancho de lechada es en la cantidad de lechada — las juntas más anchas requieren sustancialmente más material de lechada."
        },
        {
          "question": "¿Qué tan precisa es esta calculadora comparada con estimaciones profesionales?",
          "answer": "Esta calculadora proporciona estimaciones dentro del 5-10% de las cotizaciones de instaladores profesionales de azulejos para espacios rectangulares estándar. Usa fórmulas estándar de la industria para conteo de azulejos, volumen de lechada y cobertura de adhesivo. Para espacios complejos con muchos cortes, paredes anguladas o múltiples alcobas, una visita profesional al sitio dará una estimación más precisa. Siempre redondea hacia arriba al comprar — tener algunos azulejos extra es mucho mejor que quedarse corto a mitad del proyecto y descubrir que tu azulejo ha sido descontinuado o el nuevo lote no coincide."
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
      "name": "Calculadora de Azulejos",
      "slug": "calculadora-azulejos",
      "subtitle": "Calcule quantos azulejos você precisa mais rejunte, argamassa e estimativas de custo para qualquer projeto de piso, parede ou salpico.",
      "breadcrumb": "Calc Azulejos",
      "seo": {
        "title": "Calculadora de Azulejos - Estimador de Azulejos, Rejunte e Argamassa | Grátis",
        "description": "Calcule quantos azulejos você precisa para qualquer projeto. Inclui rejunte, argamassa e estimativas de custo com desperdício específico por padrão para layouts em grade, diagonal, amarração corrida e espinha de peixe.",
        "shortDescription": "Estime azulejos, rejunte, argamassa e custo para qualquer projeto de azulejamento.",
        "keywords": [
          "calculadora de azulejos",
          "quantos azulejos eu preciso",
          "calculadora de cobertura de azulejos",
          "calculadora de rejunte",
          "calculadora de argamassa",
          "calculadora de azulejos para piso",
          "calculadora de azulejos para salpico",
          "estimador de custo de azulejos"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "surfaceType": {
          "label": "Tipo de Superfície",
          "helpText": "Selecione o tipo de superfície que você está azulejando",
          "options": {
            "floor": "Piso",
            "wall": "Parede",
            "backsplash": "Salpico"
          }
        },
        "areaLength": {
          "label": "Comprimento",
          "helpText": "Meça o comprimento total da área para azulejar"
        },
        "areaWidth": {
          "label": "Largura / Altura",
          "helpText": "Para pisos: meça de parede a parede. Para paredes: meça do chão ao teto ou altura desejada"
        },
        "tileSize": {
          "label": "Tamanho do Azulejo (Seleção Rápida)",
          "helpText": "Selecione um tamanho comum de azulejo ou escolha Personalizado para inserir suas próprias dimensões",
          "options": {
            "4x4": "10cm × 10cm",
            "6x6": "15cm × 15cm",
            "3x6": "7,5cm × 15cm (Subway)",
            "8x8": "20cm × 20cm",
            "12x12": "30cm × 30cm",
            "12x24": "30cm × 60cm",
            "18x18": "45cm × 45cm",
            "24x24": "60cm × 60cm",
            "custom": "Tamanho Personalizado"
          }
        },
        "tileLengthIn": {
          "label": "Comprimento do Azulejo",
          "helpText": "O comprimento de um único azulejo em centímetros"
        },
        "tileWidthIn": {
          "label": "Largura do Azulejo",
          "helpText": "A largura de um único azulejo em centímetros"
        },
        "layoutPattern": {
          "label": "Padrão de Layout",
          "helpText": "O padrão afeta a porcentagem de desperdício. Layouts espinha de peixe e diagonal requerem mais cortes",
          "options": {
            "grid": "Grade",
            "diagonal": "Diagonal",
            "runningBond": "Amarração Corrida",
            "herringbone": "Espinha de Peixe"
          }
        },
        "groutJointWidth": {
          "label": "Largura da Junta de Rejunte",
          "helpText": "Padrão é 3mm. Use rejunte sem areia para juntas menores que 3mm, com areia para 3mm ou mais",
          "options": {
            "0.0625": "1,5mm",
            "0.125": "3mm (Padrão)",
            "0.1875": "5mm",
            "0.25": "6mm",
            "0.375": "10mm"
          }
        },
        "wasteFactor": {
          "label": "Fator de Desperdício",
          "helpText": "Auto-definido por padrão. Grade: 10%, Amarração Corrida: 12%, Diagonal: 15%, Espinha de Peixe: 20%. Ajuste conforme necessário"
        },
        "calculateMaterials": {
          "label": "Calcular Rejunte e Argamassa",
          "helpText": "Estime quantidades de rejunte e argamassa colante para seu projeto"
        },
        "groutType": {
          "label": "Tipo de Rejunte",
          "helpText": "Com areia para juntas ≥ 3mm. Sem areia para juntas < 3mm. Epóxi para áreas molhadas e resistência química",
          "options": {
            "sanded": "Rejunte com Areia",
            "unsanded": "Rejunte sem Areia",
            "epoxy": "Rejunte Epóxi"
          }
        },
        "tileThickness": {
          "label": "Espessura do Azulejo",
          "helpText": "Afeta a profundidade da junta de rejunte. Cerâmica padrão: 6-10mm. Porcelanato: 10-12mm",
          "options": {
            "0.1875": "5mm (Mosaico fino)",
            "0.25": "6mm (Cerâmica padrão)",
            "0.375": "10mm (Porcelanato padrão)",
            "0.5": "12mm (Porcelanato/pedra espessa)"
          }
        },
        "thinsetCoverage": {
          "label": "Cobertura da Argamassa",
          "helpText": "Metros quadrados por saco. Azulejos pequenos (< 20cm): ~9 m². Médios (30cm): ~7 m². Grandes (45cm+): ~5 m²"
        },
        "estimateCost": {
          "label": "Estimar Custo",
          "helpText": "Calcule custos estimados de materiais para seu projeto"
        },
        "tileCostPerSqft": {
          "label": "Custo do Azulejo",
          "helpText": "Preço por metro quadrado do azulejo. Consulte seu fornecedor para preços"
        },
        "tilesPerBox": {
          "label": "Azulejos por Caixa",
          "helpText": "Número de azulejos em cada caixa. Verifique o rótulo do produto"
        },
        "boxPrice": {
          "label": "Preço por Caixa",
          "helpText": "Custo de uma caixa de azulejos"
        }
      },
      "results": {
        "tilesNeeded": {
          "label": "Azulejos Necessários"
        },
        "tilesWithWaste": {
          "label": "Azulejos com Desperdício"
        },
        "boxesNeeded": {
          "label": "Caixas para Comprar"
        },
        "totalArea": {
          "label": "Área Total"
        },
        "groutBags": {
          "label": "Sacos de Rejunte"
        },
        "thinsetBags": {
          "label": "Sacos de Argamassa"
        },
        "totalCost": {
          "label": "Custo Total Est."
        }
      },
      "presets": {
        "bathroomFloor": {
          "label": "Piso do Banheiro",
          "description": "2,4×3m, azulejo 30×30cm, padrão grade"
        },
        "kitchenBacksplash": {
          "label": "Salpico da Cozinha",
          "description": "3,6×0,45m, azulejo 10×10cm, rejunte 1,5mm"
        },
        "livingRoomFloor": {
          "label": "Sala de Estar",
          "description": "6×4,5m, azulejo 45×45cm, com custo"
        },
        "showerWall": {
          "label": "Parede do Box",
          "description": "1,5×2,4m, azulejo 30×60cm, amarração corrida"
        },
        "entryHerringbone": {
          "label": "Entrada Espinha de Peixe",
          "description": "1,8×2,4m, azulejo subway 7,5×15cm, espinha de peixe"
        }
      },
      "values": {
        "tiles": "azulejos",
        "tile": "azulejo",
        "boxes": "caixas",
        "box": "caixa",
        "bags": "sacos",
        "bag": "saco",
        "sqft": "m²",
        "lbs": "kg",
        "in": "cm",
        "waste": "desperdício"
      },
      "formats": {
        "summary": "Você precisa de {tiles} azulejos ({withWaste} com {waste}% de desperdício) para cobrir {area} m². Compre {boxes} caixas."
      },
      "infoCards": {
        "tileCount": {
          "title": "Resumo de Azulejos",
          "items": [
            {
              "label": "Azulejos (sem desperdício)",
              "valueKey": "tilesNeeded"
            },
            {
              "label": "Azulejos (com desperdício)",
              "valueKey": "tilesWithWaste"
            },
            {
              "label": "Caixas para Comprar",
              "valueKey": "boxesNeeded"
            },
            {
              "label": "Área Total",
              "valueKey": "totalArea"
            }
          ]
        },
        "materials": {
          "title": "Materiais Necessários",
          "items": [
            {
              "label": "Sacos de Rejunte",
              "valueKey": "groutBags"
            },
            {
              "label": "Sacos de Argamassa",
              "valueKey": "thinsetBags"
            },
            {
              "label": "Tipo de Rejunte",
              "valueKey": "groutTypeLabel"
            },
            {
              "label": "Desempenadeira Recomendada",
              "valueKey": "trowelSize"
            }
          ]
        },
        "tips": {
          "title": "Dicas Profissionais",
          "items": [
            "Sempre compre azulejos do mesmo lote/número de produção. Cor e tonalidade variam entre lotes de produção, tornando a combinação posterior quase impossível.",
            "Mantenha 2-3 azulejos extras para reparos futuros. Armazene-os na horizontal em área seca. Azulejos de reposição de lote diferente ficam visivelmente diferentes.",
            "Comece o azulejamento do centro do ambiente, não de um canto. Isso garante cortes equilibrados em todas as paredes e evita pedaços minúsculos em uma borda.",
            "Use a desempenadeira do tamanho correto: 6mm para azulejos pequenos, 10mm para azulejos de 30cm, e 12mm para azulejos grandes (45cm+)."
          ]
        }
      },
      "chart": {
        "title": "Divisão de Materiais",
        "xLabel": "Material",
        "yLabel": "Custo (R$)",
        "series": {
          "cost": "Custo Estimado"
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Calculadora de Azulejos?",
          "content": "Uma calculadora de azulejos ajuda você a estimar o número exato de azulejos, rejunte e argamassa colante necessários para seu projeto de piso, parede ou salpico. Em vez de adivinhar e correr o risco de faltar material (ou comprar demais), um cálculo adequado de azulejos considera a área a cobrir, dimensões dos azulejos, largura da junta de rejunte, padrão de layout e fator de desperdício para cortes e quebras. Esta calculadora vai além da simples contagem de azulejos, também estimando volume de rejunte baseado nas dimensões das juntas, cobertura de argamassa baseada no tamanho do azulejo e seleção da desempenadeira, e custo total do projeto quando preços de materiais são fornecidos."
        },
        "howItWorks": {
          "title": "Como Funciona a Estimativa de Azulejos",
          "content": "O cálculo começa determinando a área total para azulejar (comprimento × largura). Em seguida, calcula a área de cobertura de cada azulejo individual convertendo as dimensões do azulejo de centímetros para metros quadrados. A contagem base de azulejos é a área total dividida pela área por azulejo, arredondada para cima. Um fator de desperdício é então aplicado baseado no padrão de layout escolhido: padrões de grade reta produzem menos desperdício (10%), enquanto espinha de peixe e padrões complexos geram mais sobras que não podem ser reutilizadas (15-20%). Para o rejunte, a calculadora determina a metragem linear total das juntas usando tamanho e espaçamento dos azulejos, então calcula o volume baseado na largura da junta e espessura do azulejo."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "A largura da junta de rejunte afeta tanto a aparência quanto as necessidades de material. Juntas estreitas (1,5mm) criam um visual moderno elegante, mas requerem azulejos retificados. Juntas padrão (3mm) funcionam para a maioria das instalações.",
              "type": "info"
            },
            {
              "text": "Use rejunte com areia para juntas de 3mm ou mais - as partículas de areia fornecem resistência estrutural. Use rejunte sem areia para juntas menores que 3mm - a areia pode riscar azulejos de vidro ou pedra polida delicados.",
              "type": "warning"
            },
            {
              "text": "Azulejos de grande formato (45cm+ em qualquer lado) requerem desempenadeira de 12mm, argamassa modificada com látex e dupla colagem para aderência adequada. A cobertura por saco diminui significativamente.",
              "type": "warning"
            },
            {
              "text": "Padrões diagonal, espinha de peixe e chevron requerem 15-20% mais azulejos que layouts em grade. Os cortes angulares criam pedaços triangulares de desperdício que geralmente não podem ser reutilizados em outro lugar no layout.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Padrões de Layout de Azulejos",
          "items": [
            {
              "text": "Grade (Alinhado): O padrão mais comum e eficiente. Azulejos se alinham em fileiras e colunas com juntas formando uma grade reta. Desperdício é mínimo em 10%. Funciona com qualquer tamanho de azulejo.",
              "type": "info"
            },
            {
              "text": "Diagonal (45°): Mesma grade rotacionada 45 graus. Cria efeito de losango que faz ambientes pequenos parecerem maiores. Requer 15% extra de azulejo para cortes angulares nas bordas.",
              "type": "info"
            },
            {
              "text": "Amarração Corrida (Padrão Tijolo): Cada fileira é deslocada pela metade da largura do azulejo, como alvenaria. Adiciona movimento visual e esconde pequenas variações de tamanho. Requer 12% extra de azulejo.",
              "type": "info"
            },
            {
              "text": "Espinha de Peixe: Azulejos retangulares arranjados em zigue-zague formato V. Cria visual dramático e sofisticado especialmente em entradas e corredores. Requer 20% extra para muitos cortes angulares.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de Azulejos",
          "description": "Exemplos passo a passo para projetos comuns",
          "examples": [
            {
              "title": "Piso do Banheiro: 2,4×3m com azulejos 30×30cm, layout em grade",
              "steps": [
                "Área total = 2,4 × 3 = 7,2 m²",
                "Área do azulejo = (30 × 30) ÷ 10000 = 0,09 m² por azulejo",
                "Azulejos base = 7,2 ÷ 0,09 = 80 azulejos",
                "Desperdício (grade, 10%) = 80 × 0,10 = 8 azulejos",
                "Total de azulejos = 80 + 8 = 88 azulejos",
                "Rejunte (junta 3mm, espessura 10mm): ~3 kg → 1 saco (5 kg)",
                "Argamassa (7 m²/saco): 7,2 ÷ 7 = 2 sacos"
              ],
              "result": "Compre 88 azulejos (9 caixas de 10). 1 saco rejunte, 2 sacos argamassa."
            },
            {
              "title": "Entrada: 1,8×2,4m com subway 7,5×15cm, layout espinha de peixe",
              "steps": [
                "Área total = 1,8 × 2,4 = 4,32 m²",
                "Área do azulejo = (7,5 × 15) ÷ 10000 = 0,01125 m² por azulejo",
                "Azulejos base = 4,32 ÷ 0,01125 = 384 azulejos",
                "Desperdício (espinha de peixe, 20%) = 384 × 0,20 = 77 azulejos",
                "Total de azulejos = 384 + 77 = 461 azulejos",
                "Rejunte (junta 3mm): ~2 kg → 1 saco (5 kg)",
                "Argamassa (9 m²/saco): 4,32 ÷ 9 = 1 saco"
              ],
              "result": "Compre 461 azulejos (6 caixas de 80). 1 saco rejunte, 1 saco argamassa."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos azulejos extras devo comprar para desperdício?",
          "answer": "Depende do seu padrão de layout e complexidade do ambiente. Para um layout em grade simples em ambiente retangular, 10% extra é padrão. Padrões diagonais precisam de 15% extra, e padrões espinha de peixe ou chevron precisam de 20% extra devido aos muitos cortes angulares. Se seu ambiente tem nichos, colunas ou formas irregulares, adicione 5% extra. Sempre compre todos os azulejos do mesmo lote de produção, pois cor e tonalidade variam entre lotes."
        },
        {
          "question": "Qual a diferença entre rejunte com areia e sem areia?",
          "answer": "Rejunte com areia contém partículas finas de areia que fornecem resistência estrutural e previnem retração em juntas mais largas. Use para juntas de 3mm ou mais - é o padrão para azulejos de piso e a maioria das aplicações em parede. Rejunte sem areia tem textura mais lisa e é usado para juntas menores que 3mm, tipicamente com azulejos de vidro, mármore polido ou mosaicos pequenos onde partículas de areia poderiam riscar a superfície do azulejo."
        },
        {
          "question": "Como escolho o tamanho certo de desempenadeira para argamassa?",
          "answer": "O tamanho da desempenadeira depende do tamanho do seu azulejo. Para azulejos pequenos menores que 20×20cm, use desempenadeira dentada de 6×6mm (cobre ~9 m² por saco). Para azulejos médios de cerca de 30×30cm, use desempenadeira dentada de 8×8mm (~7 m² por saco). Para azulejos de grande formato de 45cm ou maiores, use desempenadeira dentada de 12×12mm (~5 m² por saco). Sempre verifique o rótulo do saco de argamassa para taxas de cobertura específicas."
        },
        {
          "question": "Posso usar esta calculadora para azulejos de parede?",
          "answer": "Sim. Selecione \"Parede\" ou \"Salpico\" como tipo de superfície. Para paredes, digite o comprimento da parede e a altura que você quer azulejar. Os cálculos de contagem de azulejos, rejunte e argamassa funcionam da mesma forma para paredes e pisos. A principal diferença é que paredes tipicamente usam adesivo para azulejos (para azulejos cerâmicos pequenos) em vez de argamassa, embora azulejos de parede de grande formato ainda precisem de argamassa modificada com látex para suporte adequado de peso."
        },
        {
          "question": "A largura da junta de rejunte afeta quantos azulejos eu preciso?",
          "answer": "Tecnicamente sim, mas o efeito é pequeno e geralmente coberto pela sua porcentagem de desperdício. Juntas de rejunte mais largas (6mm ou 10mm) reduzem ligeiramente o número de azulejos porque as juntas ocupam mais espaço. Por exemplo, em um ambiente de 10 m² com azulejos 30×30cm, juntas de 6mm economizam cerca de 2-3 azulejos comparado a juntas de 1,5mm. O impacto mais significativo da largura do rejunte é na quantidade de rejunte - juntas mais largas requerem substancialmente mais material de rejunte."
        },
        {
          "question": "Quão precisa é esta calculadora comparada a estimativas profissionais?",
          "answer": "Esta calculadora fornece estimativas dentro de 5-10% das cotações de instaladores profissionais de azulejos para espaços retangulares padrão. Usa fórmulas padrão da indústria para contagem de azulejos, volume de rejunte e cobertura de argamassa. Para espaços complexos com muitos cortes, paredes angulares ou múltiplos nichos, uma visita profissional no local dará uma estimativa mais precisa. Sempre arredonde para cima ao comprar - ter alguns azulejos extras é muito melhor que faltar no meio do projeto e descobrir que seu azulejo foi descontinuado ou o novo lote não combina."
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
      "name": "Calculateur de Carrelage",
      "slug": "calculateur-carrelage",
      "subtitle": "Calculez le nombre de carreaux nécessaires plus les estimations de joint, mortier-colle et coût pour tout projet de sol, mur ou crédence.",
      "breadcrumb": "Calc Carrelage",
      "seo": {
        "title": "Calculateur de Carrelage - Estimateur Carreaux, Joint & Mortier | Gratuit",
        "description": "Calculez combien de carreaux vous avez besoin pour tout projet. Inclut les estimations de joint, mortier-colle et coût avec gaspillage spécifique au motif pour les dispositions grille, diagonale, joints décalés et chevrons.",
        "shortDescription": "Estimez les carreaux, joint, mortier-colle et coût pour tout projet de carrelage.",
        "keywords": [
          "calculateur carrelage",
          "combien de carreaux j'ai besoin",
          "calculateur couverture carrelage",
          "calculateur joint",
          "calculateur mortier colle",
          "calculateur carrelage sol",
          "calculateur carrelage crédence",
          "estimateur coût carrelage"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "surfaceType": {
          "label": "Type de Surface",
          "helpText": "Sélectionnez le type de surface que vous carrelez",
          "options": {
            "floor": "Sol",
            "wall": "Mur",
            "backsplash": "Crédence"
          }
        },
        "areaLength": {
          "label": "Longueur",
          "helpText": "Mesurez la longueur totale de la zone à carreler"
        },
        "areaWidth": {
          "label": "Largeur / Hauteur",
          "helpText": "Pour les sols : mesurez mur à mur. Pour les murs : mesurez sol à plafond ou hauteur désirée"
        },
        "tileSize": {
          "label": "Taille de Carreau (Sélection Rapide)",
          "helpText": "Sélectionnez une taille commune ou choisissez Personnalisé pour entrer vos propres dimensions",
          "options": {
            "4x4": "10 cm × 10 cm",
            "6x6": "15 cm × 15 cm",
            "3x6": "7,5 cm × 15 cm (Métro)",
            "8x8": "20 cm × 20 cm",
            "12x12": "30 cm × 30 cm",
            "12x24": "30 cm × 60 cm",
            "18x18": "45 cm × 45 cm",
            "24x24": "60 cm × 60 cm",
            "custom": "Taille Personnalisée"
          }
        },
        "tileLengthIn": {
          "label": "Longueur du Carreau",
          "helpText": "La longueur d'un seul carreau en pouces"
        },
        "tileWidthIn": {
          "label": "Largeur du Carreau",
          "helpText": "La largeur d'un seul carreau en pouces"
        },
        "layoutPattern": {
          "label": "Motif de Pose",
          "helpText": "Le motif affecte le pourcentage de gaspillage. Les motifs chevrons et diagonaux nécessitent plus de découpes",
          "options": {
            "grid": "Grille",
            "diagonal": "Diagonale",
            "runningBond": "Joints Décalés",
            "herringbone": "Chevrons"
          }
        },
        "groutJointWidth": {
          "label": "Largeur de Joint",
          "helpText": "Standard 3 mm. Utilisez joint non sablé pour joints sous 3 mm, sablé pour 3 mm et plus",
          "options": {
            "0.0625": "1,5 mm",
            "0.125": "3 mm (Standard)",
            "0.1875": "4,5 mm",
            "0.25": "6 mm",
            "0.375": "9 mm"
          }
        },
        "wasteFactor": {
          "label": "Facteur de Gaspillage",
          "helpText": "Auto-défini par motif. Grille : 10%, Joints décalés : 12%, Diagonale : 15%, Chevrons : 20%. Ajustez si nécessaire"
        },
        "calculateMaterials": {
          "label": "Calculer Joint & Mortier-Colle",
          "helpText": "Estimez les quantités de joint et mortier-colle pour votre projet"
        },
        "groutType": {
          "label": "Type de Joint",
          "helpText": "Sablé pour joints ≥ 3 mm. Non sablé pour joints < 3 mm. Époxy pour zones humides et résistance chimique",
          "options": {
            "sanded": "Joint Sablé",
            "unsanded": "Joint Non Sablé",
            "epoxy": "Joint Époxy"
          }
        },
        "tileThickness": {
          "label": "Épaisseur du Carreau",
          "helpText": "Affecte la profondeur du joint. Céramique standard : 6-9 mm. Grès cérame : 9-12 mm",
          "options": {
            "0.1875": "5 mm (Mosaïque fine)",
            "0.25": "6 mm (Céramique standard)",
            "0.375": "9 mm (Grès cérame standard)",
            "0.5": "12 mm (Grès cérame/pierre épais)"
          }
        },
        "thinsetCoverage": {
          "label": "Couverture Mortier-Colle",
          "helpText": "Mètres carrés par sac. Petits carreaux (< 20 cm) : ~9 m². Moyens (30 cm) : ~7 m². Grands (45 cm+) : ~5,5 m²"
        },
        "estimateCost": {
          "label": "Estimer le Coût",
          "helpText": "Calculez les coûts estimés des matériaux pour votre projet"
        },
        "tileCostPerSqft": {
          "label": "Coût des Carreaux",
          "helpText": "Prix par mètre carré de carrelage. Vérifiez chez votre fournisseur pour les prix"
        },
        "tilesPerBox": {
          "label": "Carreaux par Boîte",
          "helpText": "Nombre de carreaux dans chaque boîte. Vérifiez l'étiquette du produit"
        },
        "boxPrice": {
          "label": "Prix par Boîte",
          "helpText": "Coût d'une boîte de carreaux"
        }
      },
      "results": {
        "tilesNeeded": {
          "label": "Carreaux Nécessaires"
        },
        "tilesWithWaste": {
          "label": "Carreaux avec Gaspillage"
        },
        "boxesNeeded": {
          "label": "Boîtes à Acheter"
        },
        "totalArea": {
          "label": "Surface Totale"
        },
        "groutBags": {
          "label": "Sacs de Joint"
        },
        "thinsetBags": {
          "label": "Sacs de Mortier-Colle"
        },
        "totalCost": {
          "label": "Coût Total Est."
        }
      },
      "presets": {
        "bathroomFloor": {
          "label": "Sol Salle de Bain",
          "description": "2,4×3 m, carreaux 30×30 cm, motif grille"
        },
        "kitchenBacksplash": {
          "label": "Crédence Cuisine",
          "description": "3,6×0,5 m, carreaux 10×10 cm, joint 1,5 mm"
        },
        "livingRoomFloor": {
          "label": "Salon",
          "description": "6×4,5 m, carreaux 45×45 cm, avec coût"
        },
        "showerWall": {
          "label": "Mur Douche",
          "description": "1,5×2,4 m, carreaux 30×60 cm, joints décalés"
        },
        "entryHerringbone": {
          "label": "Entrée Chevrons",
          "description": "1,8×2,4 m, carreaux métro 7,5×15 cm, chevrons"
        }
      },
      "values": {
        "tiles": "carreaux",
        "tile": "carreau",
        "boxes": "boîtes",
        "box": "boîte",
        "bags": "sacs",
        "bag": "sac",
        "sqft": "m²",
        "lbs": "kg",
        "in": "cm",
        "waste": "gaspillage"
      },
      "formats": {
        "summary": "Vous avez besoin de {tiles} carreaux ({withWaste} avec {waste}% de gaspillage) pour couvrir {area} m². Achetez {boxes} boîtes."
      },
      "infoCards": {
        "tileCount": {
          "title": "Résumé Carrelage",
          "items": [
            {
              "label": "Carreaux (sans gaspillage)",
              "valueKey": "tilesNeeded"
            },
            {
              "label": "Carreaux (avec gaspillage)",
              "valueKey": "tilesWithWaste"
            },
            {
              "label": "Boîtes à Acheter",
              "valueKey": "boxesNeeded"
            },
            {
              "label": "Surface Totale",
              "valueKey": "totalArea"
            }
          ]
        },
        "materials": {
          "title": "Matériaux Nécessaires",
          "items": [
            {
              "label": "Sacs de Joint",
              "valueKey": "groutBags"
            },
            {
              "label": "Sacs de Mortier-Colle",
              "valueKey": "thinsetBags"
            },
            {
              "label": "Type de Joint",
              "valueKey": "groutTypeLabel"
            },
            {
              "label": "Peigne Recommandé",
              "valueKey": "trowelSize"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Pro",
          "items": [
            "Achetez toujours des carreaux du même lot/numéro de série. La couleur et la nuance varient entre les productions, rendant l'assortiment ultérieur quasi impossible.",
            "Gardez 2-3 carreaux supplémentaires pour les réparations futures. Stockez-les à plat dans un endroit sec. Les carreaux de remplacement d'un lot différent paraîtront visiblement différents.",
            "Commencez le carrelage depuis le centre de la pièce, pas depuis un coin. Cela assure des découpes équilibrées sur tous les murs et évite les petites bandes sur un bord.",
            "Utilisez la bonne taille de peigne : 6 mm pour petits carreaux, 9 mm pour carreaux 30 cm, et 12 mm pour grands formats (45 cm+)."
          ]
        }
      },
      "chart": {
        "title": "Répartition des Matériaux",
        "xLabel": "Matériau",
        "yLabel": "Coût (€)",
        "series": {
          "cost": "Coût Estimé"
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Calculateur de Carrelage ?",
          "content": "Un calculateur de carrelage vous aide à estimer le nombre exact de carreaux, joint et mortier-colle nécessaires pour votre projet de sol, mur ou crédence. Plutôt que de deviner et risquer de manquer (ou d'acheter en excès), un calcul approprié considère la surface à couvrir, les dimensions des carreaux, la largeur des joints, le motif de pose et un facteur de gaspillage pour les découpes et la casse. Ce calculateur va au-delà du simple comptage en estimant aussi le volume de joint basé sur les dimensions des joints, la couverture de mortier-colle basée sur la taille des carreaux et la sélection du peigne, et le coût total du projet quand les prix des matériaux sont fournis."
        },
        "howItWorks": {
          "title": "Comment Fonctionne l'Estimation de Carrelage",
          "content": "Le calcul commence par déterminer la surface totale à carreler (longueur × largeur). Ensuite, il calcule la surface de couverture de chaque carreau individuel en convertissant les dimensions des carreaux de pouces en mètres carrés. Le nombre de base de carreaux est la surface totale divisée par la surface par carreau, arrondie vers le haut. Un facteur de gaspillage est ensuite appliqué basé sur votre motif de pose choisi : les motifs de grille droite produisent le moins de gaspillage (10%), tandis que les motifs chevrons et complexes génèrent plus de chutes qui ne peuvent être réutilisées (15-20%)."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "La largeur des joints affecte à la fois l'apparence et les besoins en matériaux. Les joints étroits (1,5 mm) créent un look moderne épuré mais nécessitent des carreaux rectifiés.",
              "type": "info"
            },
            {
              "text": "Utilisez du joint sablé pour les joints de 3 mm ou plus - les particules de sable fournissent une résistance structurelle. Utilisez du joint non sablé pour les joints sous 3 mm.",
              "type": "warning"
            },
            {
              "text": "Les carreaux grand format (45 cm+ sur n'importe quel côté) nécessitent un peigne de 12 mm, un mortier-colle modifié au latex et un encollage double pour une adhérence appropriée.",
              "type": "warning"
            },
            {
              "text": "Les motifs diagonaux, chevrons et chevron nécessitent 15-20% de carreaux en plus que les poses en grille. Les découpes angulaires créent des déchets triangulaires qui ne peuvent généralement pas être réutilisés.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Motifs de Pose de Carrelage",
          "items": [
            {
              "text": "Grille (Pose Droite) : Le motif le plus commun et efficace. Les carreaux s'alignent en rangées et colonnes avec des joints formant une grille droite. Gaspillage minimal à 10%.",
              "type": "info"
            },
            {
              "text": "Diagonale (45°) : Même grille tournée à 45 degrés. Crée un effet diamant qui fait paraître les petites pièces plus grandes. Nécessite 15% de carreaux supplémentaires.",
              "type": "info"
            },
            {
              "text": "Joints Décalés (Motif Brique) : Chaque rangée est décalée de la moitié de la largeur d'un carreau, comme la maçonnerie. Ajoute du mouvement visuel. Nécessite 12% de carreaux supplémentaires.",
              "type": "info"
            },
            {
              "text": "Chevrons : Carreaux rectangulaires arrangés en zigzag en forme de V. Crée un look dramatique et haut de gamme. Nécessite 20% supplémentaire pour de nombreuses découpes angulaires.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul de Carrelage",
          "description": "Exemples étape par étape pour projets courants",
          "examples": [
            {
              "title": "Sol Salle de Bain : 2,4×3 m avec carreaux 30×30 cm, pose grille",
              "steps": [
                "Surface totale = 2,4 × 3 = 7,2 m²",
                "Surface carreau = 0,30 × 0,30 = 0,09 m² par carreau",
                "Carreaux de base = 7,2 ÷ 0,09 = 80 carreaux",
                "Gaspillage (grille, 10%) = 80 × 0,10 = 8 carreaux",
                "Total carreaux = 80 + 8 = 88 carreaux"
              ],
              "result": "Achetez 88 carreaux. 1 sac joint, 1 sac mortier-colle."
            },
            {
              "title": "Entrée : 1,8×2,4 m avec métro 7,5×15 cm, pose chevrons",
              "steps": [
                "Surface totale = 1,8 × 2,4 = 4,3 m²",
                "Surface carreau = 0,075 × 0,15 = 0,01125 m² par carreau",
                "Carreaux de base = 4,3 ÷ 0,01125 = 382 carreaux",
                "Gaspillage (chevrons, 20%) = 382 × 0,20 = 76 carreaux",
                "Total carreaux = 382 + 76 = 458 carreaux"
              ],
              "result": "Achetez 458 carreaux. 1 sac joint, 1 sac mortier-colle."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de carreaux supplémentaires dois-je acheter pour le gaspillage ?",
          "answer": "Cela dépend de votre motif de pose et de la complexité de la pièce. Pour une pose en grille simple dans une pièce rectangulaire, 10% supplémentaire est standard. Les motifs diagonaux nécessitent 15% supplémentaire, et les motifs chevrons nécessitent 20% supplémentaire en raison des nombreuses découpes angulaires. Achetez toujours tous les carreaux du même lot de production, car la couleur varie entre les séries."
        },
        {
          "question": "Quelle est la différence entre joint sablé et non sablé ?",
          "answer": "Le joint sablé contient des particules de sable fin qui fournissent une résistance structurelle et préviennent le retrait dans les joints plus larges. Utilisez-le pour les joints de 3 mm ou plus. Le joint non sablé a une texture plus lisse et est utilisé pour les joints plus étroits que 3 mm, typiquement avec les carreaux de verre ou mosaïques où les particules de sable pourraient rayer la surface."
        },
        {
          "question": "Comment choisir la bonne taille de peigne pour le mortier-colle ?",
          "answer": "La taille du peigne dépend de la taille de vos carreaux. Pour les petits carreaux sous 20×20 cm, utilisez un peigne à encoches carrées de 6 mm. Pour les carreaux moyens autour de 30×30 cm, utilisez un peigne de 9 mm. Pour les carreaux grand format de 45 cm ou plus, utilisez un peigne de 12 mm."
        },
        {
          "question": "Puis-je utiliser ce calculateur pour les carreaux muraux ?",
          "answer": "Oui. Sélectionnez \"Mur\" ou \"Crédence\" comme type de surface. Pour les murs, entrez la longueur du mur et la hauteur que vous voulez carreler. Le calcul des carreaux, joint et mortier-colle fonctionne de la même façon pour les murs et les sols."
        },
        {
          "question": "La largeur des joints affecte-t-elle le nombre de carreaux dont j'ai besoin ?",
          "answer": "Techniquement oui, mais l'effet est faible et généralement couvert par votre pourcentage de gaspillage. Les joints plus larges (6 ou 9 mm) réduisent légèrement le nombre de carreaux car les joints occupent plus d'espace. L'impact plus significatif de la largeur des joints est sur la quantité de joint - les joints plus larges nécessitent substantiellement plus de matériau de jointoiement."
        },
        {
          "question": "Quelle est la précision de ce calculateur comparé aux estimations professionnelles ?",
          "answer": "Ce calculateur fournit des estimations à 5-10% près des devis des carreleurs professionnels pour les espaces rectangulaires standard. Il utilise des formules standard de l'industrie pour le comptage des carreaux, volume de joint et couverture de mortier-colle. Pour les espaces complexes, une visite de site professionnelle donnera une estimation plus précise."
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
