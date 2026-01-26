"use client";

import { useState, useEffect } from "react";

interface RatingShareWidgetProps {
  calculatorSlug: string;
  calculatorName: string;
  initialRating?: { average: number; count: number };
  compact?: boolean;
}

export default function RatingShareWidget({
  calculatorSlug,
  calculatorName,
  initialRating,
  compact = false,
}: RatingShareWidgetProps) {
  const [average, setAverage] = useState(initialRating?.average || 0);
  const [count, setCount] = useState(initialRating?.count || 0);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch current rating on mount
  useEffect(() => {
    fetchRating();
  }, [calculatorSlug]);

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
        
        // Store session ID for anonymous users
        if (data.sessionId) {
          document.cookie = `calc-session-id=${data.sessionId}; max-age=31536000; path=/`;
        }

        setTimeout(() => setShowThankYou(false), 3000);
      }
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  };

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  };

  const getShareText = () => {
    return `Check out this ${calculatorName} on Kalcufy! ⭐ ${average.toFixed(1)}/5`;
  };

  const shareOptions = [
    {
      name: "Twitter",
      icon: "𝕏",
      color: "bg-black hover:bg-gray-800",
      onClick: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}&url=${encodeURIComponent(getShareUrl())}`,
          "_blank"
        );
      },
    },
    {
      name: "Facebook",
      icon: "f",
      color: "bg-blue-600 hover:bg-blue-700",
      onClick: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`,
          "_blank"
        );
      },
    },
    {
      name: "WhatsApp",
      icon: "💬",
      color: "bg-green-500 hover:bg-green-600",
      onClick: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(getShareText() + " " + getShareUrl())}`,
          "_blank"
        );
      },
    },
    {
      name: "LinkedIn",
      icon: "in",
      color: "bg-blue-700 hover:bg-blue-800",
      onClick: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`,
          "_blank"
        );
      },
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
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

  // Compact version for hero
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        {/* Stars Display */}
        <div className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-2 border border-slate-200 shadow-sm">
          <span className="text-yellow-500 text-lg">⭐</span>
          <span className="font-bold text-slate-900">
            {isLoading ? "..." : average.toFixed(1)}
          </span>
          <span className="text-slate-500 text-sm">
            ({formatCount(count)})
          </span>
        </div>

        {/* Share Button */}
        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="text-sm font-medium text-slate-700">Share</span>
          </button>

          {/* Share Dropdown */}
          {showShareMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowShareMenu(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-20">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => {
                      option.onClick();
                      setShowShareMenu(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <span className={`w-6 h-6 rounded-full ${option.color} text-white flex items-center justify-center text-xs font-bold`}>
                      {option.icon}
                    </span>
                    {option.name}
                  </button>
                ))}
                <hr className="my-2" />
                <button
                  onClick={() => {
                    copyLink();
                    setShowShareMenu(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">
                    {copied ? "✓" : "🔗"}
                  </span>
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Full version with clickable stars
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        ⭐ Rate this Calculator
      </h3>

      {/* Thank You Message */}
      {showThankYou && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
          <span>✓</span>
          Thanks for your rating! Help others by sharing.
        </div>
      )}

      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => submitRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="text-3xl transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            aria-label={`Rate ${star} stars`}
          >
            {star <= (hoverRating || userRating || 0) ? "⭐" : "☆"}
          </button>
        ))}
        <span className="ml-3 text-slate-600">
          {userRating ? (
            <span className="text-green-600 font-medium">You rated {userRating} stars</span>
          ) : (
            "Click to rate"
          )}
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-5 text-sm text-slate-600">
        <span className="font-semibold text-slate-900 text-lg">{average.toFixed(1)}</span>
        <span>average from {formatCount(count)} ratings</span>
      </div>

      {/* Share Section */}
      <div className="pt-4 border-t border-slate-200">
        <p className="text-sm text-slate-600 mb-3">Share this calculator:</p>
        <div className="flex flex-wrap gap-2">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.onClick}
              className={`${option.color} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2`}
            >
              <span className="text-base">{option.icon}</span>
              {option.name}
            </button>
          ))}
          <button
            onClick={copyLink}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            {copied ? "✓ Copied!" : "🔗 Copy Link"}
          </button>
        </div>
      </div>
    </div>
  );
}
