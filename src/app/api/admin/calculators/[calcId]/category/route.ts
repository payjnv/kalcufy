import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ calcId: string }> }
) {
  try {
    const { calcId } = await params;
    const { category } = await request.json();
    const slug = calcId.includes("-calculator") ? calcId : `${calcId}-calculator`;
    const calcIdClean = slug.replace("-calculator", "");

    // 1. Update in calculators-config.ts
    const configPath = path.join(process.cwd(), "src/config/calculators-config.ts");
    let configFile = fs.readFileSync(configPath, "utf-8");
    
    const calcRegex = new RegExp(
      `(slug:\\s*"${slug}"[^}]*category:\\s*")([^"]+)(")`,
      "g"
    );
    configFile = configFile.replace(calcRegex, `$1${category}$3`);
    fs.writeFileSync(configPath, configFile);

    // 2. Update in V4 registry.ts
    const registryPath = path.join(process.cwd(), "src/engine/v4/slugs/registry.ts");
    if (fs.existsSync(registryPath)) {
      let registry = fs.readFileSync(registryPath, "utf-8");
      
      // Match by id (without -calculator suffix) or full slug
      const registryRegex = new RegExp(
        `(\\{\\s*id:\\s*"(?:${calcIdClean}|${slug})"[^}]*category:\\s*")([^"]+)(")`,
        "g"
      );
      registry = registry.replace(registryRegex, `$1${category}$3`);
      fs.writeFileSync(registryPath, registry);
    }

    // 3. Update in V3 config file if exists
    const v3ConfigPath = path.join(
      process.cwd(),
      `src/config/calculators/v3/${calcIdClean}.config.ts`
    );
    
    if (fs.existsSync(v3ConfigPath)) {
      let v3Config = fs.readFileSync(v3ConfigPath, "utf-8");
      const categoryRegex = /category:\s*"[^"]+"/;
      v3Config = v3Config.replace(categoryRegex, `category: "${category}"`);
      fs.writeFileSync(v3ConfigPath, v3Config);
    }

    // 4. Update in V4 calculator index.ts if exists
    const v4ConfigPath = path.join(
      process.cwd(),
      `src/calculators/${calcIdClean}/index.ts`
    );
    
    if (fs.existsSync(v4ConfigPath)) {
      let v4Config = fs.readFileSync(v4ConfigPath, "utf-8");
      const categoryRegex = /category:\s*"[^"]+"/;
      v4Config = v4Config.replace(categoryRegex, `category: "${category}"`);
      fs.writeFileSync(v4ConfigPath, v4Config);
    }

    return NextResponse.json({ success: true, slug, category });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}
