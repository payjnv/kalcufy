"use client";

/**
 * SkipLink Component - WCAG 2.1 AA Compliance
 * 
 * Allows keyboard users to skip navigation and go directly to main content.
 * The link is visually hidden until focused via keyboard.
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only 
        focus:not-sr-only 
        focus:absolute 
        focus:top-4 
        focus:left-4 
        focus:z-[100] 
        focus:px-4 
        focus:py-2 
        focus:bg-blue-600 
        focus:text-white 
        focus:rounded-lg 
        focus:font-medium
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
        focus:ring-offset-2
      "
    >
      Skip to main content
    </a>
  );
}
