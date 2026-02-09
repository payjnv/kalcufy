// src/app/[locale]/admin/deep-analytics/page.tsx
"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  Eye, Users, Calculator, TrendingUp, TrendingDown, Globe, Monitor, Smartphone, Tablet,
  Activity, BarChart3, ArrowUpRight, ArrowDownRight, Zap, RefreshCw,
  MapPin, Languages, UserPlus, Crown, Mail, DollarSign, FileText,
  MessageSquare, Wifi, WifiOff,
} from "lucide-react";
import { geoNaturalEarth1, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";

type TabId = "overview" | "realtime" | "geographic" | "calculators" | "audience";

const CC: Record<string, [number, number]> = {
  "United States":[39.8,-98.5],"Canada":[56.1,-106.3],"Mexico":[23.6,-102.5],
  "Brazil":[-14.2,-51.9],"Argentina":[-38.4,-63.6],"Colombia":[4.6,-74.3],
  "Chile":[-35.7,-71.5],"Peru":[-9.2,-75.0],"Venezuela":[6.4,-66.6],
  "Ecuador":[-1.8,-78.2],"Uruguay":[-32.5,-55.8],"Paraguay":[-23.4,-58.4],
  "Bolivia":[-16.3,-63.6],"Costa Rica":[9.7,-83.8],"Panama":[8.5,-80.8],
  "Dominican Republic":[18.7,-70.2],"Guatemala":[15.8,-90.2],"Honduras":[15.2,-86.2],
  "El Salvador":[13.8,-88.9],"Nicaragua":[12.9,-85.2],"Cuba":[21.5,-77.8],
  "United Kingdom":[55.4,-3.4],"Germany":[51.2,10.5],"France":[46.2,2.2],
  "Spain":[40.5,-3.7],"Italy":[41.9,12.6],"Portugal":[39.4,-8.2],
  "Netherlands":[52.1,5.3],"Belgium":[50.5,4.5],"Switzerland":[46.8,8.2],
  "Sweden":[60.1,18.6],"Norway":[60.5,8.5],"Denmark":[56.3,9.5],
  "Finland":[61.9,25.7],"Ireland":[53.1,-8.2],"Poland":[51.9,19.1],
  "Austria":[47.5,14.6],"Czech Republic":[49.8,15.5],"Romania":[45.9,25.0],
  "Greece":[39.1,21.8],"Hungary":[47.2,19.5],"Ukraine":[48.4,31.2],
  "Russia":[61.5,105.3],"Turkey":[39.0,35.2],
  "China":[35.9,104.2],"Japan":[36.2,138.3],"South Korea":[35.9,127.8],
  "India":[20.6,78.9],"Indonesia":[-0.8,113.9],"Thailand":[15.9,101.0],
  "Vietnam":[14.1,108.3],"Philippines":[12.9,121.8],"Malaysia":[4.2,101.9],
  "Singapore":[1.4,103.8],"Taiwan":[23.7,121.0],"Pakistan":[30.4,69.3],
  "Bangladesh":[23.7,90.4],"Sri Lanka":[7.9,80.8],
  "Australia":[-25.3,133.8],"New Zealand":[-40.9,174.9],
  "South Africa":[-30.6,22.9],"Nigeria":[9.1,8.7],"Egypt":[26.8,30.8],
  "Kenya":[-0.0,37.9],"Ghana":[7.9,-1.0],"Morocco":[31.8,-7.1],
  "Saudi Arabia":[23.9,45.1],"UAE":[23.4,53.8],"Israel":[31.0,34.9],
};



// Real world map image URL (Equirectangular projection, matches Mercator at low latitudes)
// Equirectangular projection for viewBox 1000x500
// GeoJSON URL — Natural Earth 110m (free, tiny, every country outline)
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const W = 960, H = 480;
const projection = geoNaturalEarth1().scale(155).translate([W / 2, H / 2]);
const pathGen = geoPath(projection);
const graticule = geoGraticule().step([20, 20])();

function WorldMap({ countries, cityDots = [] }: { countries: any[]; cityDots?: any[] }) {
  const [hover, setHover] = useState<any>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const [land, setLand] = useState<any[]>([]);

  useEffect(() => {
    fetch(GEO_URL)
      .then(r => r.json())
      .then(topo => {
        const feat = feature(topo, topo.objects.countries) as any;
        setLand(feat.features || []);
      })
      .catch(() => {});
  }, []);

  // Build dots: prefer cityDots (real lat/lng), fallback to country coords
  const dots = useMemo(() => {
    let rawDots: any[] = [];

    if (cityDots.length > 0) {
      // 🆕 CITY-LEVEL: real lat/lng from Vercel headers
      rawDots = cityDots.map((d: any) => {
        const pt = projection([d.lng, d.lat]);
        if (!pt) return null;
        return {
          x: pt[0], y: pt[1], count: d.count,
          label: d.city + (d.region ? `, ${d.region}` : ""),
          flag: "", // no flag for cities
          country: d.country || "",
          city: d.city,
          region: d.region,
          pct: 0, // calculated below
        };
      }).filter(Boolean);
    } else {
      // FALLBACK: country-level with CC dictionary (old data without city)
      rawDots = countries.map((c: any) => {
        const coord = CC[c.country];
        if (!coord) return null;
        const pt = projection([coord[1], coord[0]]);
        if (!pt) return null;
        return {
          x: pt[0], y: pt[1], count: c.count,
          label: c.country,
          flag: c.flag || "🌍",
          country: c.country,
          city: null, region: null,
          pct: c.pct || 0,
        };
      }).filter(Boolean);
    }

    // Calculate intensity + radius
    const maxC = Math.max(...rawDots.map((d: any) => d.count), 1);
    const totalC = rawDots.reduce((s: number, d: any) => s + d.count, 0);
    return rawDots.map((d: any) => {
      const intensity = Math.max(d.count / maxC, 0.12);
      const r = 5 + intensity * 18;
      const pct = totalC > 0 ? parseFloat(((d.count / totalC) * 100).toFixed(1)) : 0;
      return { ...d, intensity, r, pct: d.pct || pct };
    });
  }, [countries, cityDots]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden rounded-b-2xl"
      onMouseMove={e => { if (ref.current) { const b = ref.current.getBoundingClientRect(); setMousePos({ x: e.clientX - b.left, y: e.clientY - b.top }); } }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: "auto", minHeight: 320, background: "#0c1222" }} preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="hs1"><stop offset="0%" stopColor="#f97316" stopOpacity="0.9"/><stop offset="30%" stopColor="#f97316" stopOpacity="0.3"/><stop offset="100%" stopColor="#f97316" stopOpacity="0"/></radialGradient>
          <radialGradient id="hs2"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/><stop offset="30%" stopColor="#3b82f6" stopOpacity="0.25"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/></radialGradient>
          <radialGradient id="hs3"><stop offset="0%" stopColor="#22c55e" stopOpacity="0.7"/><stop offset="30%" stopColor="#22c55e" stopOpacity="0.2"/><stop offset="100%" stopColor="#22c55e" stopOpacity="0"/></radialGradient>
          <filter id="gl"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        {/* Globe outline */}
        <path d={pathGen({ type: "Sphere" }) || ""} fill="#0c1222" stroke="#1e3a5f" strokeWidth="0.5" />

        {/* Graticule (lat/lng grid) */}
        <path d={pathGen(graticule) || ""} fill="none" stroke="#1a2744" strokeWidth="0.3" />

        {/* REAL COUNTRIES — every country on earth */}
        {land.map((f: any, i: number) => (
          <path key={i} d={pathGen(f) || ""} fill="#162d50" stroke="#1e4070" strokeWidth="0.4" className="hover:fill-[#1e3a5f] transition-colors" />
        ))}
        {land.length === 0 && (
          <text x={W/2} y={H/2} textAnchor="middle" fill="#334155" fontSize="13">Loading world map...</text>
        )}

        {/* Connection lines between top countries */}
        {dots.length > 1 && dots.slice(1, 7).map((d: any, i: number) => (
          <line key={`cn${i}`} x1={d.x} y1={d.y} x2={dots[0].x} y2={dots[0].y} stroke="#60a5fa" strokeWidth="0.5" opacity="0.15" strokeDasharray="5 4">
            <animate attributeName="stroke-dashoffset" from="9" to="0" dur="3s" repeatCount="indefinite"/>
          </line>
        ))}

        {/* Heat blobs — soft glow */}
        {dots.map((d: any, i: number) => {
          const gr = i===0 ? "url(#hs1)" : i<3 ? "url(#hs2)" : "url(#hs3)";
          const br = d.r * 2.5 + d.intensity * 28;
          return <circle key={`hb${i}`} cx={d.x} cy={d.y} r={br} fill={gr} opacity={0.3 + d.intensity * 0.4}>
            <animate attributeName="r" values={`${br*0.9};${br*1.12};${br*0.9}`} dur={`${3+i*0.4}s`} repeatCount="indefinite"/>
          </circle>;
        })}

        {/* Pulse rings */}
        {dots.map((d: any, i: number) => (
          <circle key={`pr${i}`} cx={d.x} cy={d.y} r={d.r*0.5} fill="none" stroke={i===0?"#f97316":i<3?"#3b82f6":"#22c55e"} strokeWidth="1.5">
            <animate attributeName="r" from={d.r*0.5} to={d.r*2} dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from="0.7" to="0" dur="2.5s" repeatCount="indefinite"/>
          </circle>
        ))}

        {/* Core dots + labels */}
        {dots.map((d: any, i: number) => {
          const col = i===0?"#f97316":i<3?"#3b82f6":"#22c55e";
          return (
            <g key={`dt${i}`} onMouseEnter={()=>setHover(d)} onMouseLeave={()=>setHover(null)} className="cursor-pointer">
              <circle cx={d.x} cy={d.y} r={Math.max(d.r*0.35,4)} fill={col} opacity="0.95" filter="url(#gl)"/>
              <circle cx={d.x} cy={d.y} r={Math.max(d.r*0.12,1.8)} fill="#fff" opacity="0.95"/>
              {i<8 && <>
                <text x={d.x} y={d.y-d.r*0.4-10} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold" style={{textShadow:"0 1px 3px #000"}}>{d.flag} {d.label || d.country}</text>
                <text x={d.x} y={d.y-d.r*0.4+1} textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="600">{d.count.toLocaleString()}</text>
              </>}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hover && (
        <div className="pointer-events-none absolute z-50 bg-white/95 backdrop-blur-md text-slate-900 rounded-xl px-5 py-3.5 shadow-2xl border border-slate-200"
          style={{left:Math.min(mousePos.x+16,(ref.current?.clientWidth||800)-220),top:Math.max(mousePos.y-85,10)}}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{hover.flag || "📍"}</span>
            <div>
              <span className="font-bold text-sm">{hover.label || hover.country}</span>
              {hover.city && hover.country && <span className="text-[10px] text-slate-400 ml-1">({hover.country})</span>}
            </div>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">#{dots.indexOf(dots.find((d:any)=>d.label===hover.label))+1}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-1 text-xs border-t border-slate-100 pt-2">
            <span className="text-slate-400">Events</span><span className="font-bold text-right">{hover.count.toLocaleString()}</span>
            <span className="text-slate-400">Share</span><span className="font-bold text-right text-blue-600">{hover.pct}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{width:`${Math.max(hover.pct,3)}%`}}/></div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DONUT CHART
// ═══════════════════════════════════════════════════════════════
function DonutChart({ segments, size=160 }: { segments:{value:number;color:string;label:string}[]; size?:number }) {
  const total = segments.reduce((s,x) => s+x.value, 0);
  if (total===0) return null;
  const r=size/2-12, cx=size/2, cy=size/2;
  let cum=-90;
  const arcs = segments.map(seg => {
    const a=(seg.value/total)*360;
    const s1=(cum*Math.PI)/180, s2=((cum+a)*Math.PI)/180;
    const x1=cx+r*Math.cos(s1), y1=cy+r*Math.sin(s1);
    const x2=cx+r*Math.cos(s2), y2=cy+r*Math.sin(s2);
    cum+=a;
    return {...seg, d:`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${a>180?1:0} 1 ${x2},${y2} Z`, pct:((seg.value/total)*100).toFixed(0)};
  });
  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} className="flex-shrink-0">
        {arcs.map((a,i) => <path key={i} d={a.d} fill={a.color} opacity="0.85" className="hover:opacity-100 transition-opacity cursor-pointer" />)}
        <circle cx={cx} cy={cy} r={r*0.55} fill="white" />
        <text x={cx} y={cy-4} textAnchor="middle" fill="#1e293b" fontSize="20" fontWeight="bold">{total.toLocaleString()}</text>
        <text x={cx} y={cy+12} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">TOTAL</text>
      </svg>
      <div className="space-y-1.5">{arcs.map((a,i) => (
        <div key={i} className="flex items-center gap-2 text-xs"><span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{background:a.color}} /><span className="text-slate-600 w-20 truncate">{a.label}</span><span className="font-bold text-slate-800">{a.pct}%</span></div>
      ))}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHARTS (SVG — ZERO DEPS)
// ═══════════════════════════════════════════════════════════════
function AreaChart({data,height=200,color="#3b82f6",gid="g1"}:{data:number[];height?:number;color?:string;gid?:string}) {
  if(data.length<2) return <div className="flex items-center justify-center text-xs text-slate-300" style={{height}}>No data</div>;
  const max=Math.max(...data,1),p=8,h=height-p*2;
  const pts=data.map((v,i)=>({x:(i/(data.length-1))*100,y:p+h-(v/max)*h}));
  const line=pts.map((pt,i)=>`${i===0?"M":"L"}${pt.x.toFixed(2)},${pt.y.toFixed(2)}`).join(" ");
  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full" style={{height}} preserveAspectRatio="none">
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.2"/><stop offset="100%" stopColor={color} stopOpacity="0.01"/></linearGradient></defs>
      <path d={`${line} L100,${height} L0,${height} Z`} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="2.5" fill={color} />
    </svg>
  );
}

function BarChart({data,height=200,color="#6366f1"}:{data:number[];height?:number;color?:string}) {
  if(!data.length) return <div className="flex items-center justify-center text-xs text-slate-300" style={{height}}>No data</div>;
  const max=Math.max(...data,1),w=100/data.length;
  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full" style={{height}} preserveAspectRatio="none">
      {data.map((v,i)=>{const bh=Math.max((v/max)*(height-8),1); return <rect key={i} x={i*w+w*0.15} y={height-bh} width={w*0.7} height={bh} rx={1.5} fill={color} opacity={0.4+(v/max)*0.6} />;})}
    </svg>
  );
}

function DualAreaChart({d1,d2,height=200,c1="#3b82f6",c2="#10b981"}:{d1:number[];d2:number[];height?:number;c1?:string;c2?:string}) {
  const len=Math.max(d1.length,d2.length);
  if(len<2) return <div className="flex items-center justify-center text-xs text-slate-300" style={{height}}>No data</div>;
  const allMax=Math.max(...d1,...d2,1),p=8,h=height-p*2;
  const mkL=(d:number[])=>d.map((v,i)=>`${i===0?"M":"L"}${((i/(len-1))*100).toFixed(2)},${(p+h-(v/allMax)*h).toFixed(2)}`).join(" ");
  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full" style={{height}} preserveAspectRatio="none">
      <defs>
        <linearGradient id="da1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c1} stopOpacity="0.15"/><stop offset="100%" stopColor={c1} stopOpacity="0"/></linearGradient>
        <linearGradient id="da2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c2} stopOpacity="0.15"/><stop offset="100%" stopColor={c2} stopOpacity="0"/></linearGradient>
      </defs>
      <path d={`${mkL(d1)} L100,${height} L0,${height} Z`} fill="url(#da1)" />
      <path d={`${mkL(d2)} L100,${height} L0,${height} Z`} fill="url(#da2)" />
      <path d={mkL(d1)} fill="none" stroke={c1} strokeWidth="1.8" strokeLinejoin="round" />
      <path d={mkL(d2)} fill="none" stroke={c2} strokeWidth="1.8" strokeLinejoin="round" strokeDasharray="4 2" />
    </svg>
  );
}

function Sparkline({data,color="#3b82f6"}:{data:number[];color?:string}) {
  if(data.length<2) return null;
  const max=Math.max(...data,1);
  const pts=data.map((v,i)=>`${(i/(data.length-1))*60},${24-(v/max)*20}`).join(" ");
  return <svg viewBox="0 0 60 24" className="w-16 h-6"><polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" /></svg>;
}

function HeatmapGrid({data}:{data:{hour:number;count:number}[]}) {
  const max=Math.max(...data.map(d=>d.count),1);
  return (
    <div>
      <div className="flex gap-[2px]">{Array.from({length:24},(_,h)=>{
        const v=data.find(x=>x.hour===h)?.count||0;
        const i=v/max;
        const bg=i===0?"#f1f5f9":i<0.25?"#bfdbfe":i<0.5?"#60a5fa":i<0.75?"#2563eb":"#1d4ed8";
        return <div key={h} className="flex flex-col items-center gap-[2px]"><div className="w-5 h-5 rounded-sm" style={{background:bg}} title={`${h}:00 — ${v} events`} />{h%4===0&&<span className="text-[8px] text-slate-400">{h}h</span>}</div>;
      })}</div>
      <div className="flex items-center gap-1 mt-2"><span className="text-[9px] text-slate-400">Less</span>{["#f1f5f9","#bfdbfe","#60a5fa","#2563eb","#1d4ed8"].map(c=><div key={c} className="w-3 h-3 rounded-sm" style={{background:c}} />)}<span className="text-[9px] text-slate-400">More</span></div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════════════════════════
function Pbar({value,max,color="bg-blue-500"}:{value:number;max:number;color?:string}) {
  const pct=max>0?Math.min((value/max)*100,100):0;
  return <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{width:`${pct}%`}} /></div>;
}

function Badge({value}:{value:number}) {
  if(!value && value !== 0) return null;
  if(value===0) return <span className="text-[11px] text-slate-300">—</span>;
  const pos=value>0;
  return <span className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${pos?"text-emerald-600":"text-red-500"}`}>{pos?<ArrowUpRight className="w-3 h-3" />:<ArrowDownRight className="w-3 h-3" />}{Math.abs(value)}%</span>;
}

const DC:Record<string,string>={desktop:"#3b82f6",mobile:"#10b981",tablet:"#f59e0b",unknown:"#94a3b8"};

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
const TABS:{id:TabId;label:string;icon:React.ReactNode}[] = [
  {id:"overview",label:"Overview",icon:<BarChart3 className="w-4 h-4" />},
  {id:"realtime",label:"Real-time",icon:<Activity className="w-4 h-4" />},
  {id:"geographic",label:"Geographic",icon:<Globe className="w-4 h-4" />},
  {id:"calculators",label:"Calculators",icon:<Calculator className="w-4 h-4" />},
  {id:"audience",label:"Audience",icon:<Users className="w-4 h-4" />},
];
const RANGES=[{id:"today",l:"Today"},{id:"7d",l:"7D"},{id:"30d",l:"30D"},{id:"90d",l:"90D"}];

export default function DeepAnalyticsPage() {
  const [tab,setTab]=useState<TabId>("overview");
  const [range,setRange]=useState("30d");
  const [loading,setLoading]=useState(true);
  const [data,setData]=useState<any>(null);
  const [refreshing,setRefreshing]=useState(false);

  const fetchData=useCallback(async(t?:TabId,r?:string)=>{
    setLoading(true);
    try{const res=await fetch(`/api/admin/deep-analytics?tab=${t||tab}&range=${r||range}`);if(res.ok)setData(await res.json());}catch(e){console.error(e);}
    finally{setLoading(false);}
  },[tab,range]);

  useEffect(()=>{fetchData();},[tab,range]);
  useEffect(()=>{if(tab!=="realtime")return;const iv=setInterval(()=>fetchData("realtime"),30000);return()=>clearInterval(iv);},[tab]);
  const refresh=async()=>{setRefreshing(true);await fetchData();setRefreshing(false);};

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/20"><BarChart3 className="w-5 h-5 text-white" /></div>
          <div><h1 className="text-2xl font-bold text-slate-900 tracking-tight">Deep Analytics</h1><p className="text-xs text-slate-400 mt-0.5">Real-time insights • Global tracking • Enterprise metrics</p></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            {RANGES.map(r=><button key={r.id} onClick={()=>setRange(r.id)} className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${range===r.id?"bg-blue-600 text-white shadow-sm":"text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}>{r.l}</button>)}
          </div>
          <button onClick={refresh} className={`p-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-700 shadow-sm ${refreshing?"animate-spin":""}`}><RefreshCw className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm w-fit">
        {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${tab===t.id?"bg-slate-900 text-white shadow-sm":"text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}>
          {t.icon}{t.label}
          {t.id==="realtime"&&tab==="realtime"&&<span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" /></span>}
        </button>)}
      </div>

      {/* Loading */}
      {loading&&!data ? (
        <div className="flex items-center justify-center py-24"><div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
      <>
        {/* ═══════════════ OVERVIEW TAB ═══════════════ */}
        {tab==="overview"&&data&&(()=>{
          const s=data.stats||{}, daily=data.dailyTrend||[], hr=data.hourly||[], bot=data.bottom||{};
          return (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  {label:"TOTAL VIEWS",val:s.totalViews?.toLocaleString()||"0",sub:`${s.todayViews||0} today`,ch:s.viewsChange,icon:<Eye className="w-5 h-5" />,ic:"text-blue-600 bg-blue-50",sd:daily.map((d:any)=>d.views),sc:"#3b82f6"},
                  {label:"UNIQUE VISITORS",val:s.uniqueSessions?.toLocaleString()||"0",sub:`${s.totalAllTime?.toLocaleString()||0} all-time`,ch:s.sessionsChange,icon:<Users className="w-5 h-5" />,ic:"text-purple-600 bg-purple-50",sd:daily.map((d:any)=>d.sessions),sc:"#8b5cf6"},
                  {label:"CALCULATIONS",val:s.totalCalcs?.toLocaleString()||"0",sub:`${s.todayCalcs||0} today`,ch:s.calcsChange,icon:<Calculator className="w-5 h-5" />,ic:"text-emerald-600 bg-emerald-50",sd:daily.map((d:any)=>d.calcs),sc:"#10b981"},
                  {label:"CONVERSION",val:`${s.conversionRate||0}%`,sub:"Views → Calcs",ch:s.conversionChange,icon:<TrendingUp className="w-5 h-5" />,ic:"text-amber-600 bg-amber-50",sd:null as any,sc:""},
                ].map(c=>(
                  <div key={c.label} className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.label}</span>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.ic}`}>{c.icon}</div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold text-slate-900 tracking-tight">{c.val}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-slate-400">{c.sub}</span>
                          <Badge value={c.ch} />
                        </div>
                      </div>
                      {c.sd && c.sd.length > 1 && <Sparkline data={c.sd} color={c.sc} />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-slate-900">Visitors Trend</h3>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-500 rounded" />Views</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded" style={{borderTop:"1.5px dashed #10b981",background:"none"}} />Calcs</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">{daily.length} days</p>
                  <DualAreaChart d1={daily.map((d:any)=>d.views)} d2={daily.map((d:any)=>d.calcs)} height={220} />
                  {daily.length>0 && (
                    <div className="flex justify-between mt-3 pt-3 border-t border-slate-50 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                      <span>{daily[0]?.date}</span>
                      <span>{daily[Math.floor(daily.length/2)]?.date}</span>
                      <span>{daily[daily.length-1]?.date}</span>
                    </div>
                  )}
                </div>
                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Activity Heatmap</h3>
                  <p className="text-xs text-slate-400 mb-4">Events by hour</p>
                  <HeatmapGrid data={hr} />
                  <div className="mt-4 pt-4 border-t border-slate-50">
                    <h4 className="text-xs font-bold text-slate-700 mb-2">Peak Hours</h4>
                    <BarChart data={hr.map((h:any)=>h.count)} height={80} color="#6366f1" />
                    <div className="flex justify-between mt-1 text-[9px] text-slate-400"><span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>11pm</span></div>
                  </div>
                </div>
              </div>

              {/* Bottom stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {label:"Avg Calcs/Session",val:bot.calcsPerSession||"0",icon:<Zap className="w-5 h-5" />,ic:"text-blue-600 bg-blue-50"},
                  {label:"Bounce Rate",val:`${bot.bounceRate||0}%`,icon:<TrendingDown className="w-5 h-5" />,ic:"text-rose-600 bg-rose-50"},
                  {label:"Active Countries",val:bot.activeCountries||0,icon:<Globe className="w-5 h-5" />,ic:"text-emerald-600 bg-emerald-50"},
                ].map(b=>(
                  <div key={b.label} className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${b.ic}`}>{b.icon}</div>
                    <div><p className="text-xs text-slate-400 font-medium">{b.label}</p><p className="text-2xl font-bold text-slate-900">{b.val}</p></div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ═══════════════ REALTIME TAB ═══════════════ */}
        {tab==="realtime"&&data&&(()=>(
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" /></span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Now</span>
                </div>
                <p className="text-5xl font-bold text-slate-900">{data.activeNow||0}</p>
                <p className="text-xs text-slate-400 mt-1">users in last 5 min</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Hour Views</span>
                <p className="text-5xl font-bold text-slate-900 mt-3">{data.lastHourViews||0}</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Hour Calcs</span>
                <p className="text-5xl font-bold text-slate-900 mt-3">{data.lastHourCalcs||0}</p>
              </div>
            </div>

            {data.minuteTrend?.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Activity — Last 60 Minutes</h3>
                <p className="text-xs text-slate-400 mb-4">Events per minute</p>
                <BarChart data={data.minuteTrend.map((m:any)=>m.count)} height={120} color="#10b981" />
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2"><Wifi className="w-4 h-4 text-emerald-500" /><h3 className="text-sm font-bold text-slate-900">Live Event Feed</h3></div>
                <span className="text-xs text-slate-400">{data.recentEvents?.length||0} events · refreshes 30s</span>
              </div>
              <div className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto">
                {(data.recentEvents||[]).map((ev:any,i:number)=>(
                  <div key={i} className="px-6 py-3 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${ev.type==="VIEW"?"bg-blue-50 text-blue-600":"bg-emerald-50 text-emerald-600"}`}>
                      {ev.type==="VIEW"?<Eye className="w-4 h-4" />:<Calculator className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-medium text-slate-800">{ev.calculatorSlug}</span>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                        {ev.flag && <span>{ev.flag} {ev.country}</span>}
                        {ev.device && <span>• {ev.device}</span>}
                        <span>• {ev.language}</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono flex-shrink-0">{new Date(ev.createdAt).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}</span>
                  </div>
                ))}
                {(!data.recentEvents||data.recentEvents.length===0) && (
                  <div className="px-6 py-16 text-center">
                    <WifiOff className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">No events in the last hour</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))()}

        {/* ═══════════════ GEOGRAPHIC TAB ═══════════════ */}
        {tab==="geographic"&&data&&(()=>{
          const countries=data.countries||[], languages=data.languages||[], devices=data.devices||[];
          const cityDots=data.cityDots||[];
          const devSeg=devices.map((d:any)=>({value:d.count,color:DC[d.device?.toLowerCase()]||"#94a3b8",label:d.device||"Unknown"}));
          return (
            <div className="space-y-6">
              {/* WORLD MAP */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-blue-600" /><h3 className="text-sm font-bold text-slate-900">Global Traffic Map</h3></div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />Live data</span>
                    {cityDots.length > 0
                      ? <span>{cityDots.length} cities</span>
                      : <span>{countries.length} countries</span>}
                  </div>
                </div>
                <WorldMap countries={countries} cityDots={cityDots} />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600 mb-3"><MapPin className="w-5 h-5" /></div>
                  <p className="text-2xl font-bold text-slate-900">{countries.length}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-0.5">Countries</p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-50 text-purple-600 mb-3"><Languages className="w-5 h-5" /></div>
                  <p className="text-2xl font-bold text-slate-900">{languages.length}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-0.5">Languages</p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-50 text-amber-600 mb-3"><Monitor className="w-5 h-5" /></div>
                  <p className="text-2xl font-bold text-slate-900">{devices.length}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-0.5">Device Types</p>
                </div>
              </div>

              {/* Countries + Languages + Devices */}
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-3 bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-sm font-bold text-slate-900">Top Countries</h3></div>
                  <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">
                    {countries.map((c:any,i:number)=>(
                      <div key={c.country} className="px-6 py-3 flex items-center gap-3 hover:bg-blue-50/30 transition-colors">
                        <span className={`text-[10px] font-bold w-5 text-center ${i<3?"text-blue-600 bg-blue-50 rounded-full w-5 h-5 leading-5":"text-slate-300"}`}>{i+1}</span>
                        <span className="text-lg leading-none">{c.flag}</span>
                        <span className="text-sm font-medium text-slate-700 flex-1 truncate">{c.country}</span>
                        <div className="w-32"><Pbar value={c.count} max={countries[0]?.count||1} /></div>
                        <span className="text-xs font-bold text-slate-600 w-12 text-right">{c.count.toLocaleString()}</span>
                        <span className="text-[11px] text-slate-400 w-12 text-right">{c.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-sm font-bold text-slate-900">Languages</h3></div>
                    <div className="p-5 space-y-3">
                      {languages.map((l:any)=>(
                        <div key={l.code} className="flex items-center gap-3">
                          <span className="text-lg">{l.flag}</span>
                          <span className="text-sm font-medium text-slate-700 w-24">{l.name}</span>
                          <div className="flex-1"><Pbar value={l.count} max={languages[0]?.count||1} color="bg-purple-500" /></div>
                          <span className="text-xs font-bold text-slate-600 w-10 text-right">{l.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100"><h3 className="text-sm font-bold text-slate-900">Devices</h3></div>
                    <div className="p-5"><DonutChart segments={devSeg} size={140} /></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ═══════════════ CALCULATORS TAB ═══════════════ */}
        {tab==="calculators"&&data&&(()=>{
          const calcs=data.calculators||[], byCat=data.byCategory||[];
          return (
            <div className="space-y-6">
              {byCat.length>0 && (
                <div className="grid grid-cols-4 gap-4">
                  {byCat.slice(0,4).map((c:any)=>(
                    <div key={c.category} className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 truncate">{c.category}</p>
                      <p className="text-2xl font-bold text-slate-900">{c.views.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-400">{c.calcs} calcs</span>
                        <span className={`text-[11px] font-bold ${c.conversion>=40?"text-emerald-600":c.conversion>=20?"text-blue-600":"text-amber-600"}`}>{c.conversion}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">Calculator Performance</h3>
                  <p className="text-xs text-slate-400">{calcs.length} calculators</p>
                </div>
                <div className="grid grid-cols-12 gap-2 px-6 py-2.5 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <div className="col-span-1">#</div>
                  <div className="col-span-3">Calculator</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-2 text-right">Views</div>
                  <div className="col-span-2 text-right">Calcs</div>
                  <div className="col-span-2 text-right">Conv.</div>
                </div>
                <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto">
                  {calcs.map((c:any,i:number)=>(
                    <div key={c.slug} className="grid grid-cols-12 gap-2 px-6 py-3 items-center hover:bg-slate-50/50 transition-colors">
                      <div className="col-span-1"><span className={`text-xs font-bold ${i<3?"text-blue-600":"text-slate-300"}`}>{i+1}</span></div>
                      <div className="col-span-3 truncate"><span className="text-sm font-medium text-slate-800">{c.slug}</span></div>
                      <div className="col-span-2"><span className="text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded font-medium truncate">{c.category}</span></div>
                      <div className="col-span-2 text-right"><span className="text-sm font-semibold text-slate-700">{c.views.toLocaleString()}</span></div>
                      <div className="col-span-2 text-right"><span className="text-sm font-semibold text-emerald-600">{c.calcs.toLocaleString()}</span></div>
                      <div className="col-span-2 text-right">
                        <span className={`text-sm font-bold px-2 py-0.5 rounded-md ${c.conversionRate>=40?"text-emerald-700 bg-emerald-50":c.conversionRate>=20?"text-blue-700 bg-blue-50":"text-amber-700 bg-amber-50"}`}>{c.conversionRate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ═══════════════ AUDIENCE TAB ═══════════════ */}
        {tab==="audience"&&data&&(()=>{
          const subs=data.subscribersByLang||[], users=data.recentUsers||[], growth=data.userGrowth||[];
          return (
            <div className="space-y-6">
              {/* KPI row */}
              <div className="grid grid-cols-5 gap-4">
                {[
                  {label:"Total Users",val:data.totalUsers||0,icon:<Users className="w-5 h-5" />,ic:"text-blue-600 bg-blue-50"},
                  {label:"PRO Users",val:data.proUsers||0,icon:<Crown className="w-5 h-5" />,ic:"text-amber-600 bg-amber-50"},
                  {label:"New This Period",val:data.newUsers||0,icon:<UserPlus className="w-5 h-5" />,ic:"text-emerald-600 bg-emerald-50",ch:data.newUsersChange},
                  {label:"Newsletter",val:data.totalSubscribers||0,icon:<Mail className="w-5 h-5" />,ic:"text-purple-600 bg-purple-50"},
                  {label:"Monthly Rev.",val:`$${data.monthlyRevenue||0}`,icon:<DollarSign className="w-5 h-5" />,ic:"text-green-600 bg-green-50"},
                ].map(c=>(
                  <div key={c.label} className="bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{c.label}</span>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.ic}`}>{c.icon}</div>
                    </div>
                    <p className="text-xl font-bold text-slate-900">{typeof c.val==="number"?c.val.toLocaleString():c.val}</p>
                    {(c as any).ch !== undefined && <Badge value={(c as any).ch} />}
                  </div>
                ))}
              </div>

              {/* Charts + Lists */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">User Registrations</h3>
                  <p className="text-xs text-slate-400 mb-4">New sign-ups per day</p>
                  <AreaChart data={growth.map((d:any)=>d.count)} height={180} color="#10b981" gid="ug" />
                  {growth.length>1 && (
                    <div className="flex justify-between mt-3 pt-3 border-t border-slate-50 text-[10px] text-slate-400 font-medium">
                      <span>{growth[0]?.date}</span><span>{growth[growth.length-1]?.date}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Subscribers */}
                  <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                    <div className="px-6 py-3 border-b border-slate-100"><h3 className="text-sm font-bold text-slate-900">Subscribers by Language</h3></div>
                    <div className="p-5 space-y-3">
                      {subs.map((s:any)=>(
                        <div key={s.code} className="flex items-center gap-3">
                          <span className="text-lg">{s.flag}</span>
                          <span className="text-sm font-medium text-slate-700 w-24">{s.name}</span>
                          <div className="flex-1"><Pbar value={s.count} max={subs[0]?.count||1} color="bg-purple-500" /></div>
                          <span className="text-sm font-bold text-slate-700 w-8 text-right">{s.count}</span>
                        </div>
                      ))}
                      {subs.length===0 && <p className="text-sm text-slate-400 text-center py-4">No subscribers</p>}
                    </div>
                  </div>

                  {/* Recent Users */}
                  <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                    <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">Recent Users</h3>
                      {data.unreadMessages>0 && <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">{data.unreadMessages} msgs</span>}
                    </div>
                    <div className="divide-y divide-slate-50 max-h-48 overflow-y-auto">
                      {users.map((u:any)=>(
                        <div key={u.id} className="px-6 py-2.5 flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0">{(u.name||u.email||"?")[0].toUpperCase()}</div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-700 truncate">{u.name||u.email}</p>
                            <p className="text-[11px] text-slate-400">{new Date(u.createdAt).toLocaleDateString()}</p>
                          </div>
                          {u.isPro && <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">PRO</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {label:"Blog Posts",val:data.blog?.totalPosts||0,icon:<FileText className="w-5 h-5" />,ic:"text-indigo-600 bg-indigo-50"},
                  {label:"Blog Views",val:(data.blog?.totalViews||0).toLocaleString(),icon:<Eye className="w-5 h-5" />,ic:"text-sky-600 bg-sky-50"},
                  {label:"Unread Messages",val:data.unreadMessages||0,icon:<MessageSquare className="w-5 h-5" />,ic:"text-slate-600 bg-slate-100"},
                ].map(b=>(
                  <div key={b.label} className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${b.ic}`}>{b.icon}</div>
                    <div><p className="text-xs text-slate-400">{b.label}</p><p className="text-2xl font-bold text-slate-900">{b.val}</p></div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </>
      )}
    </div>
  );
}
