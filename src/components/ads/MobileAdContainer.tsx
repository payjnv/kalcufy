"use client";

import { useEffect, useState } from "react";
import AdBlock from "./AdBlock";

interface MobileAdContainerProps {
  slot: string;
  position: "top" | "bottom";
}

export default function MobileAdContainer({ slot, position }: MobileAdContainerProps) {
  const [isActive, setIsActive] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdStatus = async () => {
      try {
        const res = await fetch(`/api/ads?name=${encodeURIComponent(slot)}`);
        if (res.ok) {
          const data = await res.json();
          setIsActive(data.isActive === true && !!data.adCode);
        } else {
          setIsActive(false);
        }
      } catch {
        setIsActive(false);
      }
    };

    checkAdStatus();
  }, [slot]);

  if (isActive === null || isActive === false) {
    return null;
  }

  if (position === "top") {
    return (
      <>
        <div className="md:hidden h-[52px]" />
        <div className="md:hidden fixed top-16 left-0 right-0 z-30 bg-slate-100/95 backdrop-blur-sm border-b border-slate-200">
          <div className="flex justify-center py-1">
            <div className="w-[320px] h-[50px]">
              <AdBlock slot={slot} showLabel={false} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-slate-100/95 backdrop-blur-sm border-t border-slate-200">
      <div className="flex justify-center py-1">
        <div className="w-[320px] h-[50px]">
          <AdBlock slot={slot} showLabel={false} />
        </div>
      </div>
    </div>
  );
}
