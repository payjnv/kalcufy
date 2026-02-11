"use client";

import { Suspense, useEffect, useState } from "react";
import { CalculatorEngineV4 } from "@/engine/v4";

// ————————————————————————————————————————————————————————————————
// V4 Dynamic Calculator Loader
//
// How it works:
//   1. page.tsx (server) resolves slug → calcId via SLUG_REGISTRY
//   2. page.tsx server-renders hero (h1, subtitle, breadcrumbs) + skeleton
//   3. This client component dynamically imports the calculator module
//   4. On ready → removes SSR placeholder, renders full engine
//   5. CalculatorEngineV4 renders its own hero (replaces SSR version)
// ————————————————————————————————————————————————————————————————

interface LoadedCalc {
  config: any;
  calculate: (...args: any[]) => any;
}

/** Find the config object from module exports */
function findConfig(mod: Record<string, unknown>): any | null {
  // 1. Explicit 'config' export
  if (mod.config && typeof mod.config === "object") return mod.config;

  // 2. Default export (if it's an object with 'id')
  if (
    mod.default &&
    typeof mod.default === "object" &&
    "id" in (mod.default as Record<string, unknown>)
  ) {
    return mod.default;
  }

  // 3. Any export ending in 'Config' (e.g. bmiCalculatorConfig)
  for (const key of Object.keys(mod)) {
    if (
      key.endsWith("Config") &&
      typeof mod[key] === "object" &&
      mod[key] !== null
    ) {
      return mod[key];
    }
  }

  // 4. Any object export with 'id' property
  for (const key of Object.keys(mod)) {
    const val = mod[key];
    if (
      val &&
      typeof val === "object" &&
      "id" in (val as Record<string, unknown>) &&
      !key.startsWith("calculate")
    ) {
      return val;
    }
  }

  return null;
}

/** Find the calculate function from module exports */
function findCalculate(
  mod: Record<string, unknown>,
  config: unknown
): ((...args: any[]) => any) | null {
  // 1. Any export starting with 'calculate'
  for (const key of Object.keys(mod)) {
    if (key.startsWith("calculate") && typeof mod[key] === "function") {
      return mod[key] as (...args: any[]) => any;
    }
  }

  // 2. Fallback: any function that's not the config
  for (const key of Object.keys(mod)) {
    if (
      typeof mod[key] === "function" &&
      mod[key] !== config &&
      key !== "default"
    ) {
      return mod[key] as (...args: any[]) => any;
    }
  }

  return null;
}

// ————————————————————————————————————————————————————————————————

type Status = "loading" | "ready" | "not-found";

/** Remove the server-rendered skeleton (keep the hero for LCP) */
function removeSSRSkeleton() {
  const el = document.getElementById("calc-ssr-skeleton");
  if (el) el.remove();
}

function CalculatorInner({
  calcId,
  locale,
}: {
  calcId: string;
  locale: string;
}) {
  const [loaded, setLoaded] = useState<LoadedCalc | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    import(`@/calculators/${calcId}/index`)
      .then((mod) => {
        if (cancelled) return;
        const config = findConfig(mod as Record<string, unknown>);
        const calculate = findCalculate(
          mod as Record<string, unknown>,
          config
        );

        if (config && calculate) {
          setLoaded({ config, calculate });
          setStatus("ready");
        } else {
          console.warn(
            `[V4 Loader] Could not find config or calculate in: ${calcId}`
          );
          setStatus("not-found");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("not-found");
      });

    return () => {
      cancelled = true;
    };
  }, [calcId]);

  // Remove SSR skeleton when calculator is ready or not found
  useEffect(() => {
    if (status === "ready" || status === "not-found") {
      removeSSRSkeleton();
    }
  }, [status]);

  // ── Loading — SSR skeleton is already visible, render nothing ──
  if (status === "loading") {
    return null;
  }

  // ── Calculator not built yet ───────────────────────────────────
  if (status === "not-found" || !loaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4 py-12">
          <div className="text-5xl mb-5">🔧</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-3">
            Calculator Coming Soon
          </h1>
          <p className="text-slate-500 max-w-md mx-auto mb-8">
            We&apos;re upgrading this calculator with our new engine.
            It&apos;ll be back shortly with a better experience!
          </p>
          <a
            href={`/${locale}/calculators`}
            className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Browse All Calculators
          </a>
        </div>
      </div>
    );
  }

  // ── Render calculator ──────────────────────────────────────────
  return (
    <CalculatorEngineV4
      config={loaded.config}
      calculate={loaded.calculate}
      locale={locale}
      skipHero
    />
  );
}

// ── Export with Suspense wrapper (required for Vercel build) ──────
export default function CalculatorClient({
  calcId,
  locale,
}: {
  calcId: string;
  locale: string;
}) {
  return (
    <Suspense fallback={null}>
      <CalculatorInner calcId={calcId} locale={locale} />
    </Suspense>
  );
}
