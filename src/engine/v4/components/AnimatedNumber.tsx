"use client";

/**
 * ANIMATED NUMBER - Count Up Animation
 * 
 * Smoothly animates numbers from 0 to target value
 * - Easing function for natural feel
 * - Respects reduced motion preference
 * - Handles currency, percentages, decimals
 */

import { useState, useEffect, useRef } from "react";

// Easing function
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: AnimatedNumber
// ─────────────────────────────────────────────────────────────────────────────
interface AnimatedNumberProps {
  value: string;
  duration?: number;
  className?: string;
}

export default function AnimatedNumber({
  value,
  duration = 800,
  className = "",
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValueRef = useRef<string>("");
  const animationRef = useRef<number>();

  useEffect(() => {
    // Skip if same value
    if (value === previousValueRef.current) return;
    
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      previousValueRef.current = value;
      return;
    }

    // Extract numeric part
    const cleanValue = value.replace(/[^0-9.-]/g, "");
    const targetNumber = parseFloat(cleanValue);
    
    if (isNaN(targetNumber)) {
      setDisplayValue(value);
      previousValueRef.current = value;
      return;
    }

    // Get prefix and suffix
    const prefix = value.match(/^[^0-9.-]*/)?.[0] || "";
    const suffix = value.match(/[^0-9.]+$/)?.[0] || "";
    const hasCommas = value.includes(",");
    const decimals = (cleanValue.split(".")[1] || "").length;

    // Animation
    const startTime = performance.now();
    const startNumber = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentNumber = startNumber + (targetNumber - startNumber) * easedProgress;

      // Format number
      let formatted = currentNumber.toFixed(decimals);
      if (hasCommas) {
        const parts = formatted.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formatted = parts.join(".");
      }

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        previousValueRef.current = value;
      }
    };

    // Cancel previous animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);

  return (
    <span 
      className={className}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {displayValue}
    </span>
  );
}
