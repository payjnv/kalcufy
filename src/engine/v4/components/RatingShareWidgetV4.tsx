"use client";

/**
 * RATING & SHARE WIDGET V4
 * 
 * Minimalist, professional design inspired by:
 * - Medium's clean share buttons
 * - Notion's subtle interactions
 * - Linear's modern aesthetic
 * 
 * Features:
 * - Icon-only share buttons with tooltips
 * - Animated star rating with micro-interactions
 * - Glassmorphism effects
 * - Smooth spring animations
 * - Mobile-first responsive design
 */

import { useState, useEffect, useCallback } from "react";
import type { TranslationFn } from "@/engine/v4/types/engine.types";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface RatingShareWidgetV4Props {
  calculatorSlug: string;
  calculatorName: string;
  calculatorId?: string;
  initialRating?: { average: number; count: number };
  values?: Record<string, unknown>;
  results?: Record<string, unknown>;
  unitSystem?: string;
  locale?: string;
  t?: TranslationFn;
  variant?: "default" | "compact" | "minimal" | "hero";
}

// ─────────────────────────────────────────────────────────────────────────────
// ICONS (Inline SVG for performance)
// ─────────────────────────────────────────────────────────────────────────────
const Icons = {
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARE BUTTON WITH TOOLTIP
// ─────────────────────────────────────────────────────────────────────────────
function ShareButton({
  icon,
  label,
  onClick,
  disabled,
  variant = "default",
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "success";
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className={`
          w-10 h-10 rounded-full flex items-center justify-center
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variant === "success"
            ? "bg-green-100 text-green-600"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 hover:scale-110 active:scale-95"
          }
        `}
        aria-label={label}
      >
        {icon}
      </button>

      {/* Tooltip */}
      <div
        className={`
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          px-2.5 py-1.5 rounded-lg
          bg-slate-900 text-white text-xs font-medium
          whitespace-nowrap pointer-events-none
          transition-all duration-150
          ${showTooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
        `}
      >
        {label}
        {/* Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED STAR
// ─────────────────────────────────────────────────────────────────────────────
function AnimatedStar({
  filled,
  hovered,
  onClick,
  onHover,
  onLeave,
  index,
}: {
  filled: boolean;
  hovered: boolean;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
  index: number;
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`
        relative transition-all duration-150 ease-out
        focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 rounded
        ${hovered ? "scale-125" : "scale-100"}
        ${filled ? "text-yellow-400" : "text-slate-300"}
      `}
      style={{
        transitionDelay: `${index * 30}ms`,
      }}
      aria-label={`Rate ${index + 1} star${index > 0 ? "s" : ""}`}
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      
      {/* Sparkle effect on hover */}
      {hovered && (
        <span className="absolute inset-0 animate-ping opacity-30">
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </span>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function RatingShareWidgetV4({
  calculatorSlug,
  calculatorName,
  calculatorId,
  initialRating,
  values,
  results,
  unitSystem,
  locale = "en",
  t,
  variant = "default",
}: RatingShareWidgetV4Props) {
  const [average, setAverage] = useState(initialRating?.average || 0);
  const [count, setCount] = useState(initialRating?.count || 0);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Translation helper
  const getText = useCallback((key: string, fallback: string) => {
    return t ? t(key, fallback) : fallback;
  }, [t]);

  // ─────────────────────────────────────────────────────────────────────────
  // API CALLS
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await fetch(`/api/ratings?slug=${calculatorSlug}`);
        if (res.ok) {
          const data = await res.json();
          setAverage(data.average || 0);
          setCount(data.count || 0);
          setUserRating(data.userRating || null);
        }
      } catch (error) {
        console.error("Failed to fetch rating:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRating();

    // Sync with other widgets
    const handleRatingUpdate = (e: CustomEvent) => {
      if (e.detail.slug === calculatorSlug) {
        setAverage(e.detail.average);
        setCount(e.detail.count);
        if (e.detail.userRating) setUserRating(e.detail.userRating);
      }
    };

    window.addEventListener("rating-updated", handleRatingUpdate as EventListener);
    return () => window.removeEventListener("rating-updated", handleRatingUpdate as EventListener);
  }, [calculatorSlug]);

  const submitRating = async (rating: number) => {
    try {
      const res = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: calculatorSlug, rating }),
      });

      if (res.ok) {
        const data = await res.json();
        setAverage(data.average);
        setCount(data.count);
        setUserRating(rating);
        setShowThankYou(true);

        window.dispatchEvent(
          new CustomEvent("rating-updated", {
            detail: { slug: calculatorSlug, average: data.average, count: data.count, userRating: rating },
          })
        );

        if (data.sessionId) {
          document.cookie = `calc-session-id=${data.sessionId}; max-age=31536000; path=/`;
        }

        setTimeout(() => setShowThankYou(false), 3000);
      }
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  };

  const createShareLink = async (): Promise<string> => {
    if (!values || Object.keys(values).length === 0) {
      return typeof window !== "undefined" ? window.location.href : "";
    }

    if (shareUrl) return shareUrl;

    setIsCreatingLink(true);
    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calculatorId: calculatorId || calculatorSlug.replace("-calculator", ""),
          calculatorSlug,
          locale,
          values,
          results,
          unitSystem,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setShareUrl(data.shareUrl);
        return data.shareUrl;
      }
    } catch (error) {
      console.error("Failed to create share link:", error);
    } finally {
      setIsCreatingLink(false);
    }

    return typeof window !== "undefined" ? window.location.href : "";
  };

  const getShareUrl = async () => {
    if (values && Object.keys(values).length > 0) {
      return await createShareLink();
    }
    return typeof window === "undefined" ? "" : window.location.href;
  };

  const getShareText = () => {
    return `${calculatorName} on Kalcufy ⭐ ${average.toFixed(1)}/5`;
  };

  // ─────────────────────────────────────────────────────────────────────────
  // SHARE HANDLERS
  // ─────────────────────────────────────────────────────────────────────────
  const handleShare = async (platform: string) => {
    const url = await getShareUrl();
    const text = getShareText();

    const shareUrls: Record<string, string> = {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  const copyLink = async () => {
    try {
      const url = await getShareUrl();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const formatCount = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return String(num);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: HERO VARIANT (compact inline rating + share hidden on mobile)
  // ─────────────────────────────────────────────────────────────────────────
  if (variant === "hero") {
    return (
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Rating badge — always visible, compact */}
        <div className="flex items-center gap-1 bg-yellow-50 rounded-full px-2 py-0.5 md:px-2.5 md:py-1 border border-yellow-200/60">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="font-semibold text-slate-900 text-xs md:text-sm">{isLoading ? "—" : average.toFixed(1)}</span>
          <span className="text-slate-400 text-xs">({formatCount(count)})</span>
        </div>

        {/* Share button — hidden on mobile */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            disabled={isCreatingLink}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-slate-200/50 shadow-sm hover:bg-white hover:border-slate-300 transition-all disabled:opacity-50"
          >
            {isCreatingLink ? (
              <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            )}
            <span className="text-sm font-medium text-slate-700">{getText("rating.share", "Share")}</span>
          </button>

          {/* Dropdown menu */}
          {showShareMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  onClick={() => { handleShare("x"); setShowShareMenu(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                    {Icons.x}
                  </span>
                  X (Twitter)
                </button>
                <button
                  onClick={() => { handleShare("facebook"); setShowShareMenu(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    {Icons.facebook}
                  </span>
                  Facebook
                </button>
                <button
                  onClick={() => { handleShare("whatsapp"); setShowShareMenu(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                    {Icons.whatsapp}
                  </span>
                  WhatsApp
                </button>
                <button
                  onClick={() => { handleShare("linkedin"); setShowShareMenu(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center">
                    {Icons.linkedin}
                  </span>
                  LinkedIn
                </button>
                <hr className="my-2 border-slate-100" />
                <button
                  onClick={() => { copyLink(); setShowShareMenu(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center ${copied ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-600"}`}>
                    {copied ? Icons.check : Icons.link}
                  </span>
                  {copied ? getText("rating.copied", "Copied!") : getText("rating.copyLink", "Copy link")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: MINIMAL VARIANT (just share icons inline)
  // ─────────────────────────────────────────────────────────────────────────
  if (variant === "minimal") {
    return (
      <div className="flex items-center gap-2">
        <ShareButton icon={Icons.x} label="X (Twitter)" onClick={() => handleShare("x")} disabled={isCreatingLink} />
        <ShareButton icon={Icons.facebook} label="Facebook" onClick={() => handleShare("facebook")} disabled={isCreatingLink} />
        <ShareButton icon={Icons.whatsapp} label="WhatsApp" onClick={() => handleShare("whatsapp")} disabled={isCreatingLink} />
        <ShareButton icon={Icons.linkedin} label="LinkedIn" onClick={() => handleShare("linkedin")} disabled={isCreatingLink} />
        <ShareButton
          icon={copied ? Icons.check : Icons.link}
          label={copied ? getText("rating.copied", "Copied!") : getText("rating.copyLink", "Copy link")}
          onClick={copyLink}
          disabled={isCreatingLink}
          variant={copied ? "success" : "default"}
        />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: COMPACT VARIANT (rating + share in one line)
  // ─────────────────────────────────────────────────────────────────────────
  if (variant === "compact") {
    return (
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Rating display */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-yellow-400" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-bold text-slate-900">{isLoading ? "—" : average.toFixed(1)}</span>
          </div>
          <span className="text-sm text-slate-500">({formatCount(count)})</span>
        </div>

        {/* Share buttons */}
        <div className="flex items-center gap-1.5">
          <ShareButton icon={Icons.x} label="X" onClick={() => handleShare("x")} disabled={isCreatingLink} />
          <ShareButton icon={Icons.facebook} label="Facebook" onClick={() => handleShare("facebook")} disabled={isCreatingLink} />
          <ShareButton icon={Icons.whatsapp} label="WhatsApp" onClick={() => handleShare("whatsapp")} disabled={isCreatingLink} />
          <ShareButton icon={Icons.linkedin} label="LinkedIn" onClick={() => handleShare("linkedin")} disabled={isCreatingLink} />
          <ShareButton
            icon={copied ? Icons.check : Icons.link}
            label={copied ? getText("rating.copied", "Copied!") : getText("rating.copyLink", "Copy")}
            onClick={copyLink}
            disabled={isCreatingLink}
            variant={copied ? "success" : "default"}
          />
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: DEFAULT VARIANT (full card with rating + share)
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Rating Section */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">
            {getText("rating.title", "Rate this Calculator")}
          </h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-slate-900">{isLoading ? "—" : average.toFixed(1)}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">{formatCount(count)} {getText("rating.ratings", "ratings")}</span>
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <AnimatedStar
              key={star}
              index={star - 1}
              filled={star <= (hoverRating || userRating || 0)}
              hovered={star === hoverRating}
              onClick={() => submitRating(star)}
              onHover={() => setHoverRating(star)}
              onLeave={() => setHoverRating(0)}
            />
          ))}
          <span className="ml-3 text-sm text-slate-500">
            {userRating ? (
              <span className="text-green-600 font-medium">
                ✓ {getText("rating.youRated", "You rated")} {userRating}
              </span>
            ) : (
              getText("rating.clickToRate", "Click to rate")
            )}
          </span>
        </div>

        {/* Thank you message */}
        {showThankYou && (
          <div className="mt-3 flex items-center gap-2 text-sm text-green-600 animate-fade-in">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {getText("rating.thankYou", "Thanks for rating!")}
          </div>
        )}
      </div>

      {/* Share Section */}
      <div className="p-5 bg-slate-50/50">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            {getText("rating.shareCalculator", "Share")}
            {values && Object.keys(values).length > 0 && (
              <span className="text-green-600 ml-1 text-xs">
                ({getText("rating.includesValues", "with your values")})
              </span>
            )}
          </p>
          
          {/* Share Buttons */}
          <div className="flex items-center gap-1.5">
            <ShareButton 
              icon={Icons.x} 
              label="X (Twitter)" 
              onClick={() => handleShare("x")} 
              disabled={isCreatingLink} 
            />
            <ShareButton 
              icon={Icons.facebook} 
              label="Facebook" 
              onClick={() => handleShare("facebook")} 
              disabled={isCreatingLink} 
            />
            <ShareButton 
              icon={Icons.whatsapp} 
              label="WhatsApp" 
              onClick={() => handleShare("whatsapp")} 
              disabled={isCreatingLink} 
            />
            <ShareButton 
              icon={Icons.linkedin} 
              label="LinkedIn" 
              onClick={() => handleShare("linkedin")} 
              disabled={isCreatingLink} 
            />
            <div className="w-px h-6 bg-slate-200 mx-1" />
            <ShareButton
              icon={copied ? Icons.check : Icons.link}
              label={copied ? getText("rating.copied", "Copied!") : getText("rating.copyLink", "Copy link")}
              onClick={copyLink}
              disabled={isCreatingLink}
              variant={copied ? "success" : "default"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
