"use client";

/**
 * ============================================================================
 * CHART V4 - Recharts-based visualization component
 * ============================================================================
 * Renders line, bar, area, or composed charts from metadata.chartData
 * Uses dynamic import of recharts for performance (only loads when needed)
 *
 * SUPPORTS:
 * - Single chart: config.chart + metadata.chartData (original)
 * - Multi chart:  config.charts + metadata.chartsData (NEW - tabbed UI)
 * ============================================================================
 */

import { useMemo, useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface ChartSeriesConfig {
  key: string;
  type?: "line" | "bar" | "area";
  color?: string;
  dashed?: boolean;
  stackId?: string;
}

interface ChartConfig {
  id: string;
  type: "line" | "bar" | "area" | "composed";
  xKey: string;
  series: ChartSeriesConfig[];
  height?: number;
  stacked?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  yAxisFormat?: "number" | "currency" | "percentage";
}

interface ChartTranslation {
  title: string;
  xLabel?: string;
  yLabel?: string;
  series: Record<string, string>;
}

interface ChartV4Props {
  config: ChartConfig;
  data: Array<Record<string, unknown>>;
  translations: ChartTranslation;
  locale?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MULTI-CHART TYPES (NEW)
// ─────────────────────────────────────────────────────────────────────────────
interface MultiChartTranslation {
  title: string;
  xLabel?: string;
  yLabel?: string;
  series: Record<string, string>;
  tabs?: Record<string, { label: string; icon?: string; subtitle?: string }>;
}

interface MultiChartV4Props {
  charts: ChartConfig[];
  chartsData: Record<string, Array<Record<string, unknown>>>;
  translations: MultiChartTranslation;
  locale?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT COLORS (Kalcufy brand palette)
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_COLORS = [
  "#3b82f6", // blue-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
  "#06b6d4", // cyan-500
  "#f97316", // orange-500
  "#ec4899", // pink-500
];

// ─────────────────────────────────────────────────────────────────────────────
// Y-AXIS FORMATTERS
// ─────────────────────────────────────────────────────────────────────────────
function formatYAxis(value: number, format?: string): string {
  if (format === "currency") {
    if (Math.abs(value) >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (Math.abs(value) >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  }
  if (format === "percentage") {
    return `${value.toFixed(0)}%`;
  }
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return value.toLocaleString();
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOLTIP FORMATTERS
// ─────────────────────────────────────────────────────────────────────────────
function formatTooltipValue(value: number, format?: string): string {
  if (format === "currency") {
    return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (format === "percentage") {
    return `${value.toFixed(2)}%`;
  }
  return value.toLocaleString();
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM TOOLTIP
// ─────────────────────────────────────────────────────────────────────────────
function CustomTooltip({
  active,
  payload,
  label,
  seriesLabels,
  yAxisFormat,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string | number;
  seriesLabels: Record<string, string>;
  yAxisFormat?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-900 mb-1.5 border-b border-slate-100 pb-1">
        {label}
      </p>
      <div className="space-y-1">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-600">
                {seriesLabels[entry.name] || entry.name}
              </span>
            </div>
            <span className="font-semibold text-slate-900">
              {formatTooltipValue(entry.value, yAxisFormat)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED: Render a single chart (used by both ChartV4 and MultiChartV4)
// ─────────────────────────────────────────────────────────────────────────────
function RenderSingleChart({
  config,
  data,
  seriesLabels,
  Recharts,
  chartHeight,
}: {
  config: ChartConfig;
  data: Array<Record<string, unknown>>;
  seriesLabels: Record<string, string>;
  Recharts: typeof import("recharts");
  chartHeight: number;
}) {
  const {
    ResponsiveContainer,
    LineChart,
    BarChart,
    AreaChart,
    ComposedChart,
    Line,
    Bar,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } = Recharts;

  const showGrid = config.showGrid !== false;
  const showLegend = config.showLegend !== false;
  const showTooltip = config.showTooltip !== false;

  const renderSeries = (seriesType?: "line" | "bar" | "area") => {
    return config.series.map((s, i) => {
      const color = s.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
      const type = s.type || seriesType || config.type;

      switch (type) {
        case "bar":
          return (
            <Bar
              key={s.key}
              dataKey={s.key}
              fill={color}
              name={s.key}
              stackId={s.stackId || (config.stacked ? "stack" : undefined)}
              radius={[2, 2, 0, 0]}
              maxBarSize={40}
            />
          );
        case "area":
          return (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={color}
              fill={color}
              fillOpacity={0.15}
              strokeWidth={2}
              name={s.key}
              stackId={s.stackId || (config.stacked ? "stack" : undefined)}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          );
        case "line":
        default:
          return (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={color}
              strokeWidth={2}
              name={s.key}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              strokeDasharray={s.dashed ? "5 5" : undefined}
            />
          );
      }
    });
  };

  const commonChildren = (seriesType?: "line" | "bar" | "area") => (
    <>
      {showGrid && (
        <CartesianGrid stroke="none" vertical={false} horizontal={false} />
      )}
      <XAxis
        dataKey={config.xKey}
        tick={{ fontSize: 11, fill: "#64748b" }}
        tickLine={false}
        axisLine={{ stroke: "#e2e8f0" }}
      />
      <YAxis
        tick={{ fontSize: 11, fill: "#64748b" }}
        tickLine={false}
        axisLine={false}
        tickFormatter={(v: number) => formatYAxis(v, config.yAxisFormat)}
        width={65}
      />
      {showTooltip && (
        <Tooltip cursor={{ fill: "transparent" }}
          content={
            <CustomTooltip
              seriesLabels={seriesLabels}
              yAxisFormat={config.yAxisFormat}
            />
          }
        />
      )}
      {showLegend && (
        <Legend
          formatter={(value: string) => (
            <span className="text-xs text-slate-600">
              {seriesLabels[value] || value}
            </span>
          )}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ paddingTop: 8 }}
        />
      )}
      {renderSeries(seriesType)}
    </>
  );

  const margin = { top: 10, right: 10, left: 0, bottom: 5 };

  const renderChart = () => {
    switch (config.type) {
      case "bar":
        return (
          <BarChart data={data} margin={margin}>
            {commonChildren("bar")}
          </BarChart>
        );
      case "area":
        return (
          <AreaChart data={data} margin={margin}>
            {commonChildren("area")}
          </AreaChart>
        );
      case "composed":
        return (
          <ComposedChart data={data} margin={margin}>
            {commonChildren()}
          </ComposedChart>
        );
      case "line":
      default:
        return (
          <LineChart data={data} margin={margin}>
            {commonChildren("line")}
          </LineChart>
        );
    }
  };

  return (
    <div className="w-full" style={{ height: chartHeight }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOADING SKELETON
// ─────────────────────────────────────────────────────────────────────────────
function ChartLoadingSkeleton({ title, height }: { title: string; height: number }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        📈 {title}
      </h3>
      <div
        className="flex items-center justify-center bg-slate-50 rounded-xl"
        style={{ height }}
      >
        <div className="text-slate-400 text-sm">Loading chart...</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SINGLE CHART COMPONENT (original API — unchanged)
// ─────────────────────────────────────────────────────────────────────────────
export default function ChartV4({
  config,
  data,
  translations,
  locale = "en",
}: ChartV4Props) {
  const [Recharts, setRecharts] = useState<typeof import("recharts") | null>(null);

  useEffect(() => {
    import("recharts").then(setRecharts);
  }, []);

  const seriesLabels = useMemo(() => translations.series || {}, [translations]);
  const chartHeight = config.height || 300;

  if (!data || data.length === 0) return null;

  if (!Recharts) {
    return <ChartLoadingSkeleton title={translations.title} height={chartHeight} />;
  }

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 p-5"
      role="figure"
      aria-label={translations.title}
    >
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        📈 {translations.title}
      </h3>
      <RenderSingleChart
        config={config}
        data={data}
        seriesLabels={seriesLabels}
        Recharts={Recharts}
        chartHeight={chartHeight}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MULTI-CHART COMPONENT (NEW — tabbed UI inside card)
// ─────────────────────────────────────────────────────────────────────────────
export function MultiChartV4({
  charts,
  chartsData,
  translations,
  locale = "en",
}: MultiChartV4Props) {
  const [Recharts, setRecharts] = useState<typeof import("recharts") | null>(null);
  const [activeTab, setActiveTab] = useState(charts[0]?.id || "");

  useEffect(() => {
    import("recharts").then(setRecharts);
  }, []);

  const seriesLabels = useMemo(() => translations.series || {}, [translations]);

  // Find active chart config
  const activeChart = charts.find((c) => c.id === activeTab) || charts[0];
  const activeData = chartsData[activeTab] || [];
  const chartHeight = activeChart?.height || 300;

  // Check if there's any data at all
  const hasAnyData = charts.some((c) => {
    const d = chartsData[c.id];
    return d && d.length > 0;
  });
  if (!hasAnyData) return null;

  if (!Recharts) {
    return <ChartLoadingSkeleton title={translations.title} height={chartHeight} />;
  }

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 p-5"
      role="figure"
      aria-label={translations.title}
    >
      {/* Header: Title (left) + Tabs (right) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2 shrink-0">
          📈 {translations.title}
        </h3>

        {/* Tabs — pill style inside card */}
        {charts.length > 1 && (
          <div
            className="flex gap-0.5 bg-slate-100 rounded-lg p-0.5 overflow-x-auto"
            role="tablist"
          >
            {charts.map((chart) => {
              const tabT = translations.tabs?.[chart.id];
              const isActive = chart.id === activeTab;
              const hasData = (chartsData[chart.id]?.length ?? 0) > 0;

              return (
                <button
                  key={chart.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`chart-panel-${chart.id}`}
                  id={`tab-${chart.id}`}
                  onClick={() => setActiveTab(chart.id)}
                  disabled={!hasData}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
                    transition-all duration-150 whitespace-nowrap
                    ${
                      isActive
                        ? "bg-white text-slate-900 shadow-sm"
                        : hasData
                          ? "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                          : "text-slate-300 cursor-not-allowed"
                    }
                  `}
                >
                  {tabT?.icon && <span className="text-sm">{tabT.icon}</span>}
                  <span>{tabT?.label || chart.id}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Active chart panel */}
      <div
        id={`chart-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeData.length > 0 ? (
          <RenderSingleChart
            config={activeChart}
            data={activeData}
            seriesLabels={seriesLabels}
            Recharts={Recharts}
            chartHeight={chartHeight}
          />
        ) : (
          <div
            className="flex items-center justify-center bg-slate-50 rounded-xl text-slate-400 text-sm"
            style={{ height: chartHeight }}
          >
            No data available
          </div>
        )}
      </div>
    </div>
  );
}
