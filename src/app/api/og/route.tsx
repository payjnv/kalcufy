import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const categoryColors: Record<string, { bg: string; accent: string; gradient: string }> = {
  finance: { bg: "#1e3a5f", accent: "#60a5fa", gradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)" },
  health: { bg: "#14532d", accent: "#4ade80", gradient: "linear-gradient(135deg, #166534 0%, #22c55e 100%)" },
  math: { bg: "#7c2d12", accent: "#fb923c", gradient: "linear-gradient(135deg, #c2410c 0%, #f97316 100%)" },
  everyday: { bg: "#4c1d95", accent: "#a78bfa", gradient: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)" },
  default: { bg: "#1e3a8a", accent: "#60a5fa", gradient: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)" },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Calculator";
    const result = searchParams.get("result") || "";
    const resultLabel = searchParams.get("resultLabel") || "Result";
    const subtitle = searchParams.get("subtitle") || "";
    const icon = searchParams.get("icon") || "🧮";
    const category = searchParams.get("category") || "default";
    const colors = categoryColors[category] || categoryColors.default;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            background: colors.gradient,
            fontFamily: "system-ui",
            position: "relative",
          }}
        >
          {/* Patrón decorativo */}
          <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", opacity: 0.1, display: "flex", flexWrap: "wrap", gap: 40, padding: 60 }}>
            {Array(20).fill(null).map((_, i) => (
              <div key={i} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: "white" }} />
            ))}
          </div>

          {/* Contenido */}
          <div style={{ display: "flex", flexDirection: "column", padding: "60px", width: "100%", zIndex: 1 }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "auto" }}>
              {/* Logo simplificado */}
              <div style={{ width: 48, height: 48, backgroundColor: "white", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ display: "flex", flexWrap: "wrap", width: 30, height: 30, gap: 3 }}>
                  {[1,1,1,1,1,1,1,1,1].map((_, i) => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: i % 2 === 0 ? "#3b82f6" : "#22d3ee" }} />
                  ))}
                </div>
              </div>
              <span style={{ fontSize: "26px", fontWeight: "bold", color: "white" }}>Kalcufy</span>
            </div>

            {/* Centro */}
            <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", marginBottom: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: result ? "30px" : "0" }}>
                <span style={{ fontSize: "72px" }}>{icon}</span>
                <h1 style={{ fontSize: "64px", fontWeight: "bold", color: "white", margin: 0, lineHeight: 1.1 }}>
                  {title}
                </h1>
              </div>

              {result && (
                <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
                  <span style={{ fontSize: "28px", color: "rgba(255,255,255,0.7)" }}>{resultLabel}:</span>
                  <span style={{ fontSize: "72px", fontWeight: "bold", color: colors.accent }}>{result}</span>
                </div>
              )}

              {!result && subtitle && (
                <p style={{ fontSize: "28px", color: "rgba(255,255,255,0.8)", margin: 0, marginTop: "16px" }}>{subtitle}</p>
              )}
            </div>

            {/* Footer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
              <span style={{ fontSize: "22px", color: "rgba(255,255,255,0.7)" }}>kalcufy.com</span>
              <div style={{ backgroundColor: "white", color: colors.bg, padding: "16px 32px", borderRadius: "50px", fontSize: "20px", fontWeight: "bold" }}>
                Try Free →
              </div>
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
