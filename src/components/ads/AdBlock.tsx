"use client";

import { useEffect, useState } from "react";

// ============================================================================
// AD SLOT CONFIGURATION
// ============================================================================
const AD_SLOT_CONFIG: Record<string, {
  minHeight: number;
  maxWidth: number;
  format: "horizontal" | "vertical" | "square";
  description: string;
}> = {
  "calculator-mobile-hero": {
    minHeight: 100,
    maxWidth: 400,
    format: "horizontal",
    description: "Mobile hero advertisement between title and calculator",
  },
  "Calculator Sidebar": {
    minHeight: 250,
    maxWidth: 300,
    format: "vertical",
    description: "Sidebar advertisement",
  },
  "calculator-mobile-top": {
    minHeight: 50,
    maxWidth: 320,
    format: "horizontal",
    description: "Mobile ad above calculator",
  },
  "calculator-mobile-content-1": {
    minHeight: 250,
    maxWidth: 336,
    format: "horizontal",
    description: "Mobile inline ad after info cards",
  },
  "calculator-mobile-content-2": {
    minHeight: 250,
    maxWidth: 336,
    format: "horizontal",
    description: "Mobile inline ad before FAQs",
  },
  "calculator-mobile-bottom": {
    minHeight: 50,
    maxWidth: 320,
    format: "horizontal",
    description: "Mobile ad below calculator",
  },
  "calculator-after-results": {
    minHeight: 90,
    maxWidth: 1200,
    format: "horizontal",
    description: "Desktop horizontal ad after results",
  },
  "calculator-bottom": {
    minHeight: 90,
    maxWidth: 728,
    format: "horizontal",
    description: "Bottom advertisement below calculator",
  },
  "skyscraper-left": {
    minHeight: 600,
    maxWidth: 160,
    format: "vertical",
    description: "Left skyscraper advertisement",
  },
  "skyscraper-right": {
    minHeight: 600,
    maxWidth: 160,
    format: "vertical",
    description: "Right skyscraper advertisement",
  },
};

// ============================================================================
// PROPS INTERFACE
// ============================================================================
interface AdBlockProps {
  slot: string;
  className?: string;
  format?: "horizontal" | "vertical" | "square";
  showLabel?: boolean;
}

// ============================================================================
// AD BLOCK COMPONENT - WCAG 2.1 AA Compliant
// Only renders if isActive is true AND has ad code
// ============================================================================
export default function AdBlock({
  slot,
  className = "",
  format,
  showLabel = true,
}: AdBlockProps) {
  const [adData, setAdData] = useState<{
    id: string;
    adCode: string | null;
    isActive: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const config = AD_SLOT_CONFIG[slot] || {
    minHeight: 250,
    maxWidth: 300,
    format: "vertical",
    description: "Advertisement",
  };

  const effectiveFormat = format || config.format;
  const isDevelopment = process.env.NODE_ENV === "development";

  // ─────────────────────────────────────────────────────────────────────────
  // FETCH AD DATA
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(`/api/ads?name=${encodeURIComponent(slot)}`);
        if (res.ok) {
          const data = await res.json();
          if (!data.error) {
            setAdData(data);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAd();
  }, [slot]);

  // ─────────────────────────────────────────────────────────────────────────
  // TRACK CLICK
  // ─────────────────────────────────────────────────────────────────────────
  const handleAdClick = () => {
    if (adData?.id) {
      fetch("/api/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adId: adData.id }),
      }).catch(() => {});
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAdClick();
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // DON'T RENDER IF:
  // - Still loading
  // - Ad is not active
  // - No ad code (in production)
  // - Error fetching
  // ─────────────────────────────────────────────────────────────────────────
  if (isLoading) {
    return null;
  }

  // Don't render if ad is not active
  if (!adData?.isActive) {
    return null;
  }

  // In production, don't render empty container if there's no ad code
  if (!adData?.adCode && !isDevelopment) {
    return null;
  }

  // In development without ad code, show placeholder
  if (!adData?.adCode && isDevelopment) {
    return (
      <aside
        role="complementary"
        aria-label={config.description}
        className={`ad-block ad-block--${effectiveFormat} ${className}`}
        data-slot={slot}
      >
        {showLabel && (
          <p
            className="text-[10px] text-slate-400 text-center mb-1 uppercase tracking-wider"
            aria-hidden="true"
          >
            Advertisement
          </p>
        )}
        <div
          className="overflow-hidden flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl mx-auto"
          style={{
            minHeight: config.minHeight,
            maxWidth: config.maxWidth,
            height: config.minHeight,
          }}
        >
          <div className="text-center p-4">
            <div className="text-2xl mb-2" aria-hidden="true">📢</div>
            <p className="text-xs text-slate-500 font-medium">Ad Placeholder</p>
            <p className="text-[10px] text-slate-400 mt-1">{slot}</p>
            <p className="text-[10px] text-slate-400">{config.minHeight}×{config.maxWidth}</p>
          </div>
        </div>
      </aside>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER ACTUAL AD
  // ─────────────────────────────────────────────────────────────────────────
  const slotLabel = slot.replace(/-/g, " ");

  return (
    <aside
      role="complementary"
      aria-label={config.description}
      className={`ad-block ad-block--${effectiveFormat} ${className}`}
      data-slot={slot}
    >
      {showLabel && (
        <p
          className="text-[10px] text-slate-400 text-center mb-1 uppercase tracking-wider"
          aria-hidden="true"
        >
          Advertisement
        </p>
      )}

      <div
        className={`
          overflow-hidden
          flex items-center justify-center
          cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${effectiveFormat === "horizontal" ? "w-full" : ""}
          ${effectiveFormat === "vertical" ? "mx-auto" : ""}
        `}
        style={{
          minHeight: config.minHeight,
          maxWidth: config.maxWidth,
          height: config.minHeight,
        }}
        onClick={handleAdClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="link"
        aria-label={`Sponsored content for ${slotLabel} - click or press Enter to learn more`}
      >
        <div
          className="ad-content w-full h-full flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: adData.adCode! }}
        />
      </div>
    </aside>
  );
}
