"use client";

import { useEffect, useState } from "react";

// ============================================================================
// SIDE SKYSCRAPER ADS - WCAG 2.1 AA Compliant
// Fixed lateral advertisements - Only visible on 2xl+ screens (1536px+)
// Each ad renders independently based on its own isActive state
// ============================================================================

interface AdData {
  id: string;
  adCode: string | null;
  isActive: boolean;
}

export default function SideSkyscraperAds() {
  const [leftAd, setLeftAd] = useState<AdData | null>(null);
  const [rightAd, setRightAd] = useState<AdData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isDevelopment = process.env.NODE_ENV === "development";

  // ─────────────────────────────────────────────────────────────────────────
  // FETCH ADS
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const [leftRes, rightRes] = await Promise.all([
          fetch(`/api/ads?name=skyscraper-left`),
          fetch(`/api/ads?name=skyscraper-right`),
        ]);

        if (leftRes.ok) {
          const data = await leftRes.json();
          if (!data.error) setLeftAd(data);
        }
        if (rightRes.ok) {
          const data = await rightRes.json();
          if (!data.error) setRightAd(data);
        }
      } catch {
        // Silent fail
      } finally {
        setIsLoading(false);
      }
    };

    fetchAds();
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // TRACK CLICK
  // ─────────────────────────────────────────────────────────────────────────
  const handleAdClick = (adId: string | undefined) => {
    if (adId) {
      fetch("/api/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adId }),
      }).catch(() => {});
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER AD CONTENT
  // ─────────────────────────────────────────────────────────────────────────
  const renderAd = (ad: AdData | null, position: "left" | "right") => {
    const positionLabel = position === "left" ? "Left" : "Right";
    
    if (isLoading) {
      return (
        <div 
          className="animate-pulse bg-slate-200 w-full h-full rounded-xl"
          role="status"
          aria-label={`Loading ${positionLabel.toLowerCase()} advertisement`}
          aria-busy="true"
        >
          <span className="sr-only">Loading advertisement, please wait...</span>
        </div>
      );
    }

    // Development placeholder (only if active but no code)
    if (ad?.isActive && !ad?.adCode && isDevelopment) {
      return (
        <div 
          className="w-full h-full bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center"
          role="img"
          aria-label={`${positionLabel} advertisement placeholder - 160 by 600 pixels`}
        >
          <p 
            className="text-[10px] text-slate-400 uppercase tracking-wider mb-4"
            aria-hidden="true"
          >
            Advertisement
          </p>
          <div className="text-4xl mb-2" aria-hidden="true">📢</div>
          <p className="text-xs text-slate-500 font-medium" aria-hidden="true">
            Ad Placeholder
          </p>
          <p className="text-[10px] text-slate-400 mt-1" aria-hidden="true">
            skyscraper-{position}
          </p>
          <p className="text-[10px] text-slate-400" aria-hidden="true">
            160×600
          </p>
        </div>
      );
    }

    // Real ad content
    if (ad?.isActive && ad?.adCode) {
      return (
        <div
          className="ad-content w-full h-full cursor-pointer bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          dangerouslySetInnerHTML={{ __html: ad.adCode }}
          onClick={() => handleAdClick(ad.id)}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleAdClick(ad.id);
            }
          }}
          aria-label={`${positionLabel} sponsored content - click or press Enter to learn more`}
        />
      );
    }

    return null;
  };

  // Don't render anything while loading
  if (isLoading) {
    return null;
  }

  return (
    <>
      {/* Left Skyscraper - Only render if active */}
      {leftAd?.isActive && (
        <aside
          className="hidden 2xl:block fixed top-1/2 -translate-y-1/2 z-30"
          style={{ 
            width: "160px", 
            height: "600px",
            left: "calc(50% - 820px)"
          }}
          role="complementary"
          aria-label="Left sidebar advertisement region"
        >
          {renderAd(leftAd, "left")}
          <div 
            role="status" 
            aria-live="polite" 
            aria-atomic="true" 
            className="sr-only"
          >
            {leftAd?.adCode && "Left advertisement loaded"}
          </div>
        </aside>
      )}

      {/* Right Skyscraper - Only render if active */}
      {rightAd?.isActive && (
        <aside
          className="hidden 2xl:block fixed top-1/2 -translate-y-1/2 z-30"
          style={{ 
            width: "160px", 
            height: "600px",
            right: "calc(50% - 820px)"
          }}
          role="complementary"
          aria-label="Right sidebar advertisement region"
        >
          {renderAd(rightAd, "right")}
          <div 
            role="status" 
            aria-live="polite" 
            aria-atomic="true" 
            className="sr-only"
          >
            {rightAd?.adCode && "Right advertisement loaded"}
          </div>
        </aside>
      )}
    </>
  );
}
