// ============================================================================
// KALCUFY V4 - UNIT DROPDOWN COMPONENT
// ============================================================================
// Inline unit selector with Portal for mobile compatibility.
// Portal renders dropdown at document.body level to avoid overflow:hidden issues.
// ============================================================================

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import type { UnitDefinition } from "../units/types";

// ─────────────────────────────────────────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────────────────────────────────────────

interface UnitDropdownProps {
  units: UnitDefinition[];
  selectedUnit: string;
  onUnitChange: (unitId: string) => void;
  size?: "sm" | "md";
  disabled?: boolean;
  ariaLabel?: string;
  t?: (key: string, fallback?: string) => string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PORTAL DROPDOWN PANEL
// ─────────────────────────────────────────────────────────────────────────────

interface DropdownPanelProps {
  units: UnitDefinition[];
  selectedUnit: string;
  highlightedIndex: number;
  onSelect: (unitId: string) => void;
  onHighlight: (index: number) => void;
  getUnitName: (unit: UnitDefinition) => string;
  position: { top: number; left: number; width: number };
}

function DropdownPanel({
  units,
  selectedUnit,
  highlightedIndex,
  onSelect,
  onHighlight,
  getUnitName,
  position,
}: DropdownPanelProps) {
  return (
    <div
      role="listbox"
      aria-label="Select unit"
      className="py-1 bg-white rounded-xl shadow-xl border border-slate-200 max-h-[260px] overflow-y-auto overflow-x-hidden"
      style={{
        position: "fixed",
        zIndex: 99999,
        top: position.top,
        left: position.left,
        width: position.width,
        boxShadow: "0 10px 40px -5px rgba(0,0,0,0.15), 0 4px 12px -2px rgba(0,0,0,0.1)",
      }}
    >
      {units.map((unit, index) => {
        const isSelected = unit.id === selectedUnit;
        const isHighlighted = index === highlightedIndex;

        return (
          <button
            key={unit.id}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelect(unit.id)}
            onMouseEnter={() => onHighlight(index)}
            className={`
              w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors duration-100
              ${isSelected ? "bg-blue-50/80" : isHighlighted ? "bg-slate-50" : "hover:bg-slate-50"}
            `}
          >
            {/* Symbol badge */}
            <span
              className={`
                inline-flex items-center justify-center min-w-[36px] px-1.5 py-0.5 rounded text-[11px] font-bold tracking-wide
                ${isSelected ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}
              `}
            >
              {unit.symbol}
            </span>

            {/* Name */}
            <span className={`text-[12px] flex-1 ${isSelected ? "text-blue-600 font-medium" : "text-slate-500"}`}>
              {getUnitName(unit)}
            </span>

            {/* Check mark */}
            {isSelected && (
              <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 111.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function UnitDropdown({
  units,
  selectedUnit,
  onUnitChange,
  size = "sm",
  disabled = false,
  ariaLabel,
  t,
}: UnitDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selected = units.find((u) => u.id === selectedUnit);
  const tGlobal = useTranslations("units");

  // ── Client-side only mounting ──
  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Calculate position when opening ──
  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const updatePosition = () => {
      const rect = buttonRef.current!.getBoundingClientRect();
      const vw = window.innerWidth;
      const dropdownWidth = Math.min(200, vw - 16);

      // Horizontal: align to right edge of button
      let left = rect.right - dropdownWidth;
      if (left < 8) left = 8;
      if (left + dropdownWidth > vw - 8) left = vw - dropdownWidth - 8;

      // Vertical: ALWAYS open below the button (allow overflow)
      const top = rect.bottom + 4;

      setPosition({ top, left, width: dropdownWidth });
    };

    updatePosition();
    
    // Recalculate on scroll/resize
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  // ── Close on click outside ──
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      
      // Check if click is inside the button
      if (containerRef.current?.contains(target)) return;
      
      // Check if click is inside the portal panel
      const panel = document.getElementById("unit-dropdown-portal");
      if (panel?.contains(target)) return;
      
      setIsOpen(false);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    // Use timeout to avoid closing immediately on the click that opened it
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // ── Reset highlight when opening ──
  useEffect(() => {
    if (isOpen) {
      const idx = units.findIndex((u) => u.id === selectedUnit);
      setHighlightedIndex(idx >= 0 ? idx : 0);
    }
  }, [isOpen, units, selectedUnit]);

  const handleSelect = useCallback(
    (unitId: string) => {
      if (unitId !== selectedUnit) {
        onUnitChange(unitId);
      }
      setIsOpen(false);
      buttonRef.current?.focus();
    },
    [selectedUnit, onUnitChange]
  );

  // ── Keyboard navigation ──
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev + 1) % units.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev - 1 + units.length) % units.length);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < units.length) {
            handleSelect(units[highlightedIndex].id);
          }
          break;
        case "Tab":
          setIsOpen(false);
          break;
      }
    },
    [isOpen, units, highlightedIndex, handleSelect]
  );

  // ── Get translated unit name ──
  const getUnitName = useCallback((unit: UnitDefinition) => {
    if (t) {
      const translated = t(`units.${unit.id}.name`, "");
      if (translated && translated !== `units.${unit.id}.name`) return translated;
    }
    try {
      const globalName = tGlobal(`${unit.id}.name`);
      if (globalName) return globalName;
    } catch {
      // Key not found
    }
    return unit.name;
  }, [t, tGlobal]);

  // ── Single unit or no match → static text ──
  if (!selected || units.length <= 1) {
    return (
      <span className={`shrink-0 text-slate-400 font-medium select-none ${size === "sm" ? "text-xs pr-3" : "text-sm pr-3"}`}>
        {selected?.symbol || selectedUnit}
      </span>
    );
  }

  return (
    <div ref={containerRef} className="relative shrink-0" onKeyDown={handleKeyDown}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-label={ariaLabel || `Change unit: ${selected.name}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`
          group flex items-center justify-center gap-1 h-full rounded-r-xl transition-all select-none
          ${disabled
            ? "bg-slate-200 text-slate-400 cursor-not-allowed opacity-50"
            : isOpen
            ? "bg-slate-200 text-blue-600"
            : "bg-slate-200 text-slate-500 hover:bg-slate-300/80 hover:text-slate-600 active:bg-slate-300 cursor-pointer"
          }
          text-sm font-medium px-2 sm:px-3 min-w-[48px] sm:min-w-[64px]
        `}
      >
        <span>{selected.symbol}</span>
        <svg
          className={`transition-transform duration-200 opacity-60 group-hover:opacity-80 ${isOpen ? "rotate-180 opacity-80" : ""} w-3.5 h-3.5`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>
      </button>

      {/* Portal Dropdown */}
      {isOpen && mounted && position && createPortal(
        <div id="unit-dropdown-portal" ref={panelRef}>
          <DropdownPanel
            units={units}
            selectedUnit={selectedUnit}
            highlightedIndex={highlightedIndex}
            onSelect={handleSelect}
            onHighlight={setHighlightedIndex}
            getUnitName={getUnitName}
            position={position}
          />
        </div>,
        document.body
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CURRENCY DROPDOWN VARIANT
// ─────────────────────────────────────────────────────────────────────────────

interface CurrencyDropdownProps {
  currencies: Array<{ id: string; code: string; symbol: string; name: string }>;
  selectedCurrency: string;
  onCurrencyChange: (code: string) => void;
  disabled?: boolean;
  ariaLabel?: string;
}

export function CurrencyUnitDropdown({
  currencies,
  selectedCurrency,
  onCurrencyChange,
  disabled = false,
  ariaLabel,
}: CurrencyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selected = currencies.find((c) => c.id === selectedCurrency || c.code === selectedCurrency);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const updatePosition = () => {
      const rect = buttonRef.current!.getBoundingClientRect();
      const vw = window.innerWidth;
      const dropdownWidth = Math.min(220, vw - 16);

      let left = rect.right - dropdownWidth;
      if (left < 8) left = 8;
      if (left + dropdownWidth > vw - 8) left = vw - dropdownWidth - 8;

      // Vertical: ALWAYS open below the button (allow overflow)
      const top = rect.bottom + 4;

      setPosition({ top, left, width: dropdownWidth });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target)) return;
      const panel = document.getElementById("currency-dropdown-portal");
      if (panel?.contains(target)) return;
      setIsOpen(false);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const idx = currencies.findIndex((c) => c.id === selectedCurrency || c.code === selectedCurrency);
      setHighlightedIndex(idx >= 0 ? idx : 0);
    }
  }, [isOpen, currencies, selectedCurrency]);

  if (!selected || currencies.length <= 1) {
    return (
      <span className="shrink-0 text-slate-400 text-xs font-medium pl-2 pr-3 select-none">
        {selected?.code || selectedCurrency}
      </span>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % currencies.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + currencies.length) % currencies.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < currencies.length) {
          onCurrencyChange(currencies[highlightedIndex].code);
          setIsOpen(false);
          buttonRef.current?.focus();
        }
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative shrink-0" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-label={ariaLabel || `Change currency: ${selected.name}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`
          group flex items-center justify-center gap-1 h-full rounded-r-xl transition-all select-none text-sm font-medium px-2 sm:px-3 min-w-[48px] sm:min-w-[64px]
          ${disabled
            ? "bg-slate-200 text-slate-400 cursor-not-allowed opacity-50"
            : isOpen
            ? "bg-slate-200 text-blue-600"
            : "bg-slate-200 text-slate-500 hover:bg-slate-300/80 hover:text-slate-600 active:bg-slate-300 cursor-pointer"
          }
        `}
      >
        <span>{selected.code}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 opacity-60 group-hover:opacity-80 ${isOpen ? "rotate-180 opacity-80" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>
      </button>

      {isOpen && mounted && position && createPortal(
        <div
          id="currency-dropdown-portal"
          role="listbox"
          className="py-1 bg-white rounded-xl border border-slate-200 max-h-[280px] overflow-y-auto overflow-x-hidden"
          style={{
            position: "fixed",
            zIndex: 99999,
            top: position.top,
            left: position.left,
            width: position.width,
            boxShadow: "0 10px 40px -5px rgba(0,0,0,0.15), 0 4px 12px -2px rgba(0,0,0,0.1)",
          }}
        >
          {currencies.map((cur, index) => {
            const isSelected = cur.id === selectedCurrency || cur.code === selectedCurrency;
            const isHighlighted = index === highlightedIndex;

            return (
              <button
                key={cur.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onCurrencyChange(cur.code);
                  setIsOpen(false);
                  buttonRef.current?.focus();
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`
                  w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors duration-100
                  ${isSelected ? "bg-blue-50/80" : isHighlighted ? "bg-slate-50" : "hover:bg-slate-50"}
                `}
              >
                <span
                  className={`
                    inline-flex items-center justify-center min-w-[40px] px-1.5 py-0.5 rounded text-[11px] font-bold tracking-wide
                    ${isSelected ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}
                  `}
                >
                  {cur.code}
                </span>

                <span className="flex-1 min-w-0 flex items-center gap-1.5">
                  <span className={`text-xs font-medium ${isSelected ? "text-blue-600" : "text-slate-500"}`}>
                    {cur.symbol}
                  </span>
                  <span className={`text-[11px] truncate ${isSelected ? "text-blue-400" : "text-slate-400"}`}>
                    {cur.name}
                  </span>
                </span>

                {isSelected && (
                  <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 111.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>,
        document.body
      )}
    </div>
  );
}
