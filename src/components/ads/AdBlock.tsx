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
  "calculator-sidebar": {
    minHeight: 250,
    maxWidth: 300,
    format: "vertical",
    description: "Sidebar advertisement",
  },
  "calculator-mobile-top": {
    minHeight: 100,
    maxWidth: 400,
    format: "horizontal",
    description: "Mobile ad above calculator",
  },
  "calculator-mobile-bottom": {
    minHeight: 100,
    maxWidth: 400,
    format: "horizontal",
    description: "Mobile ad below calculator",
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
// Only renders if isActive is true
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
        const res = await fetch(`/api/ads?name=${slot}`);
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
  // - Error fetching (unless in dev mode)
  // ─────────────────────────────────────────────────────────────────────────
  if (isLoading) {
    return null;
  }

  // Only render if isActive is true
  if (!adData?.isActive) {
    return null;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STYLES
  // ─────────────────────────────────────────────────────────────────────────
  const containerStyles: React.CSSProperties = {
    minHeight: config.minHeight,
    maxWidth: config.maxWidth,
  };

  const slotLabel = slot.replace(/-/g, " ");

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
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

      <p className="sr-only">
        {config.description}. {adData?.adCode ? "Sponsored content available." : "Loading advertisement."}
      </p>

      <div
        className={`
          bg-slate-50 border border-slate-200 rounded-xl overflow-hidden
          flex items-center justify-center
          ${effectiveFormat === "horizontal" ? "w-full" : ""}
          ${effectiveFormat === "vertical" ? "mx-auto" : ""}
          ${adData?.adCode ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" : ""}
        `}
        style={containerStyles}
        onClick={adData?.adCode ? handleAdClick : undefined}
        onKeyDown={adData?.adCode ? handleKeyDown : undefined}
        tabIndex={adData?.adCode ? 0 : -1}
        role={adData?.adCode ? "link" : "img"}
        aria-label={
          adData?.adCode 
            ? `Sponsored content for ${slotLabel} - click or press Enter to learn more` 
            : `Advertisement placeholder for ${slotLabel}`
        }
      >
        {!adData?.adCode ? (
          // Placeholder (only shows in dev mode since we already checked isActive)
          isDevelopment ? (
            <div className="text-center p-4" role="img" aria-label={`Placeholder for ${slotLabel}`}>
              <div className="text-2xl mb-2" aria-hidden="true">📢</div>
              <p className="text-xs text-slate-500 font-medium" aria-hidden="true">
                Ad Placeholder
              </p>
              <p className="text-[10px] text-slate-400 mt-1" aria-hidden="true">
                {slot}
              </p>
              <p className="text-[10px] text-slate-400" aria-hidden="true">
                {config.minHeight}×{config.maxWidth}
              </p>
            </div>
          ) : null
        ) : (
          // Actual ad content
          <div
            className="ad-content w-full h-full"
            dangerouslySetInnerHTML={{ __html: adData.adCode }}
          />
        )}
      </div>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {adData?.adCode && `${config.description} loaded`}
      </div>
    </aside>
  );
}
