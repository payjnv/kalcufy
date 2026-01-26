"use client";

import type { CardItem, ListItem, TranslationFn } from "../types/engine.types";

// ============================================================================
// ABOUT FORMULAS / INFO CARDS
// ============================================================================
interface InfoCardsProps {
  title: string;
  icon?: string;
  cards: CardItem[];
  columns?: 1 | 2;
  t: TranslationFn;
}

export function InfoCards({ title, icon, cards, columns = 1, t }: InfoCardsProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">
        {icon && <span aria-hidden="true">{icon} </span>}
        {title}
      </h3>
      <ul className="space-y-3 text-slate-600">
        {cards.map((card, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>
              <strong>{card.title}:</strong> {card.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================================
// CONSIDERATIONS / WARNING LIST
// ============================================================================
interface ConsiderationsListProps {
  title: string;
  icon?: string;
  items: ListItem[];
  t: TranslationFn;
}

export function ConsiderationsList({ title, icon, items, t }: ConsiderationsListProps) {
  const iconMap: Record<string, string> = {
    warning: "!",
    info: "ℹ",
    success: "✓",
    error: "✕",
  };

  const colorMap: Record<string, string> = {
    warning: "text-amber-500",
    info: "text-blue-500",
    success: "text-green-500",
    error: "text-red-500",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">
        {icon && <span aria-hidden="true">{icon} </span>}
        {title}
      </h3>
      <ul className="space-y-2 text-slate-600">
        {items.map((item, index) => {
          const itemIcon = item.icon || iconMap[item.type || "warning"];
          const itemColor = colorMap[item.type || "warning"];
          return (
            <li key={index} className="flex items-start gap-2">
              <span className={`${itemColor} mt-1 font-bold`}>{itemIcon}</span>
              <span>{item.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ============================================================================
// TWO COLUMN EDUCATION GRID
// ============================================================================
interface EducationGridProps {
  leftCard: {
    title: string;
    icon?: string;
    cards: CardItem[];
  };
  rightCard: {
    title: string;
    icon?: string;
    items: ListItem[];
  };
  t: TranslationFn;
}

export function EducationGrid({ leftCard, rightCard, t }: EducationGridProps) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCards
            title={leftCard.title}
            icon={leftCard.icon}
            cards={leftCard.cards}
            t={t}
          />
          <ConsiderationsList
            title={rightCard.title}
            icon={rightCard.icon}
            items={rightCard.items}
            t={t}
          />
        </div>
      </div>
    </section>
  );
}

export default EducationGrid;
