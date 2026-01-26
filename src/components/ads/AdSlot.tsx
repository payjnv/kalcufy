// ============================================
// AD SLOT COMPONENT
// ============================================
// Renders ad content based on position
// Supports desktop/mobile targeting
// Loads ads from database via API
// ============================================

'use client';

import React, { useState, useEffect } from 'react';
import { AD_POSITIONS, AdPosition, shouldShowAd } from '@/config/ads.config';
import { cn } from '@/theme/calculator-theme';

// ============================================
// TYPES
// ============================================

interface AdSlotProps {
  position: string;
  className?: string;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
  fallback?: React.ReactNode;
}

// ============================================
// HOOKS
// ============================================

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// ============================================
// LOADING SKELETON
// ============================================

const AdSkeleton: React.FC<{ minHeight?: string }> = ({ minHeight = '250px' }) => (
  <div 
    className="w-full bg-slate-50 rounded-lg animate-pulse"
    style={{ minHeight }}
    aria-hidden="true"
  />
);

// ============================================
// PLACEHOLDER (DEV MODE)
// ============================================

const AdPlaceholder: React.FC<{ position: string; minHeight?: string }> = ({ 
  position, 
  minHeight = '250px' 
}) => (
  <div 
    className={cn(
      'w-full bg-slate-50 rounded-lg',
      'flex flex-col items-center justify-center',
      'border-2 border-dashed border-slate-200',
      'text-slate-400 text-sm'
    )}
    style={{ minHeight }}
    aria-hidden="true"
  >
    <span className="font-medium">Ad: {position}</span>
    <span className="text-xs mt-1">Development Mode</span>
  </div>
);

// ============================================
// MAIN COMPONENT
// ============================================

export const AdSlot: React.FC<AdSlotProps> = ({
  position,
  className,
  mobileOnly = false,
  desktopOnly = false,
  fallback,
}) => {
  const isMobile = useIsMobile();
  const [adContent, setAdContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get position config
  const positionConfig = AD_POSITIONS[position];
  
  // ============================================
  // VISIBILITY LOGIC
  // ============================================
  
  // Check if should show based on device
  const shouldShowOnDevice = (() => {
    if (mobileOnly && !isMobile) return false;
    if (desktopOnly && isMobile) return false;
    
    if (positionConfig) {
      if (isMobile && !positionConfig.mobile) return false;
      if (!isMobile && !positionConfig.desktop) return false;
    }
    
    return true;
  })();
  
  // Check if position is enabled
  const isEnabled = shouldShowAd(position);
  
  // ============================================
  // FETCH AD CONTENT
  // ============================================
  
  useEffect(() => {
    // Don't fetch if not visible or not enabled
    if (!shouldShowOnDevice || !isEnabled) {
      setIsLoading(false);
      return;
    }
    
    const fetchAd = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/ads?position=${position}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch ad');
        }
        
        const data = await response.json();
        setAdContent(data.adCode || null);
      } catch (err) {
        setError('Failed to load ad');
        console.error(`Ad fetch error for position ${position}:`, err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAd();
  }, [position, shouldShowOnDevice, isEnabled]);
  
  // ============================================
  // RENDER LOGIC
  // ============================================
  
  // Don't render if not supposed to show on this device
  if (!shouldShowOnDevice) {
    return null;
  }
  
  // Don't render if position is disabled
  if (!isEnabled) {
    return null;
  }
  
  const minHeight = positionConfig?.minHeight || '250px';
  const isSticky = positionConfig?.sticky || false;
  
  // Check if in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return (
    <aside
      className={cn(
        'ad-slot',
        isSticky && 'sticky top-24',
        // Hide from screen readers since ads aren't content
        'overflow-hidden',
        className
      )}
      aria-label="Advertisement"
      role="complementary"
    >
      <div
        className={cn(
          'flex justify-center items-center',
          'bg-slate-50 rounded-lg overflow-hidden',
          'transition-opacity duration-200'
        )}
        style={{ minHeight }}
      >
        {isLoading ? (
          <AdSkeleton minHeight={minHeight} />
        ) : error ? (
          // Show fallback or nothing on error
          fallback || null
        ) : adContent ? (
          // Render the ad content
          <div 
            className="w-full"
            dangerouslySetInnerHTML={{ __html: adContent }}
          />
        ) : isDevelopment ? (
          // Show placeholder in development
          <AdPlaceholder position={position} minHeight={minHeight} />
        ) : (
          // Nothing to show in production
          fallback || null
        )}
      </div>
    </aside>
  );
};

// ============================================
// EXPORT HELPER COMPONENT
// ============================================

// Pre-configured ad slots for common positions
export const SidebarTopAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdSlot position="sidebar-top" desktopOnly className={className} />
);

export const SidebarStickyAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdSlot position="sidebar-sticky" desktopOnly className={className} />
);

export const MobileContentAd1: React.FC<{ className?: string }> = ({ className }) => (
  <AdSlot position="mobile-content-1" mobileOnly className={className} />
);

export const MobileContentAd2: React.FC<{ className?: string }> = ({ className }) => (
  <AdSlot position="mobile-content-2" mobileOnly className={className} />
);

export const AfterResultsAd: React.FC<{ className?: string }> = ({ className }) => (
  <AdSlot position="after-results" className={className} />
);

export default AdSlot;
