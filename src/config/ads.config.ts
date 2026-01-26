// ============================================
// KALCUFY CALCULATOR ENGINE - ADS CONFIGURATION
// ============================================
// Version: 1.0.0
// Purpose: Centralized ad position management
// ============================================

// ============================================
// AD POSITION INTERFACE
// ============================================

export interface AdPosition {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  desktop: boolean;
  mobile: boolean;
  sticky?: boolean;
  minHeight: string;
  maxWidth?: string;
}

// ============================================
// AD POSITIONS CONFIGURATION
// ============================================

export const AD_POSITIONS: Record<string, AdPosition> = {
  // ============================================
  // BOTH DESKTOP AND MOBILE
  // ============================================
  
  'after-hero': {
    id: 'after-hero',
    name: 'After Hero',
    description: 'Horizontal banner below hero section',
    enabled: false,
    desktop: true,
    mobile: true,
    minHeight: '90px',
    maxWidth: '728px',
  },
  
  'after-results': {
    id: 'after-results',
    name: 'After Results',
    description: 'Horizontal banner after results section',
    enabled: false,
    desktop: true,
    mobile: true,
    minHeight: '250px',
  },
  
  'before-faqs': {
    id: 'before-faqs',
    name: 'Before FAQs',
    description: 'Banner before FAQ section',
    enabled: false,
    desktop: true,
    mobile: true,
    minHeight: '250px',
  },
  
  'after-faqs': {
    id: 'after-faqs',
    name: 'After FAQs',
    description: 'Banner after FAQ section',
    enabled: false,
    desktop: true,
    mobile: true,
    minHeight: '250px',
  },
  
  // ============================================
  // DESKTOP ONLY (SIDEBAR)
  // ============================================
  
  'sidebar-top': {
    id: 'sidebar-top',
    name: 'Sidebar Top',
    description: 'First ad in the sidebar',
    enabled: true,
    desktop: true,
    mobile: false,
    minHeight: '250px',
    maxWidth: '300px',
  },
  
  'sidebar-middle': {
    id: 'sidebar-middle',
    name: 'Sidebar Middle',
    description: 'Middle ad in the sidebar',
    enabled: false,
    desktop: true,
    mobile: false,
    minHeight: '250px',
    maxWidth: '300px',
  },
  
  'sidebar-sticky': {
    id: 'sidebar-sticky',
    name: 'Sidebar Sticky',
    description: 'Sticky ad in the sidebar that follows scroll',
    enabled: true,
    desktop: true,
    mobile: false,
    sticky: true,
    minHeight: '600px',
    maxWidth: '300px',
  },
  
  // ============================================
  // MOBILE ONLY
  // ============================================
  
  'mobile-after-inputs': {
    id: 'mobile-after-inputs',
    name: 'Mobile After Inputs',
    description: 'Ad between inputs and results on mobile',
    enabled: false,
    desktop: false,
    mobile: true,
    minHeight: '250px',
  },
  
  'mobile-content-1': {
    id: 'mobile-content-1',
    name: 'Mobile Content 1',
    description: 'First inline ad on mobile (after results/export buttons)',
    enabled: true,
    desktop: false,
    mobile: true,
    minHeight: '250px',
  },
  
  'mobile-content-2': {
    id: 'mobile-content-2',
    name: 'Mobile Content 2',
    description: 'Second inline ad on mobile (between education sections)',
    enabled: true,
    desktop: false,
    mobile: true,
    minHeight: '250px',
  },
  
  'mobile-content-3': {
    id: 'mobile-content-3',
    name: 'Mobile Content 3',
    description: 'Third inline ad on mobile (before FAQs)',
    enabled: false,
    desktop: false,
    mobile: true,
    minHeight: '250px',
  },
  
  'mobile-bottom-sticky': {
    id: 'mobile-bottom-sticky',
    name: 'Mobile Bottom Sticky',
    description: 'Sticky ad at bottom of screen on mobile',
    enabled: false,
    desktop: false,
    mobile: true,
    sticky: true,
    minHeight: '50px',
  },
  
  // ============================================
  // IN-CONTENT ADS
  // ============================================
  
  'education-inline-1': {
    id: 'education-inline-1',
    name: 'Education Inline 1',
    description: 'Inline ad within education content',
    enabled: false,
    desktop: true,
    mobile: true,
    minHeight: '250px',
  },
  
  'education-inline-2': {
    id: 'education-inline-2',
    name: 'Education Inline 2',
    description: 'Second inline ad within education content',
    enabled: false,
    desktop: true,
    mobile: true,
    minHeight: '250px',
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all enabled ad positions
 */
export const getEnabledAdPositions = (): AdPosition[] => {
  return Object.values(AD_POSITIONS).filter(pos => pos.enabled);
};

/**
 * Get all desktop ad positions
 */
export const getDesktopAdPositions = (): AdPosition[] => {
  return Object.values(AD_POSITIONS).filter(pos => pos.desktop);
};

/**
 * Get all mobile ad positions
 */
export const getMobileAdPositions = (): AdPosition[] => {
  return Object.values(AD_POSITIONS).filter(pos => pos.mobile);
};

/**
 * Check if a specific ad position should be shown
 */
export const shouldShowAd = (positionId: string, isMobile: boolean): boolean => {
  const position = AD_POSITIONS[positionId];
  
  if (!position || !position.enabled) {
    return false;
  }
  
  if (isMobile) {
    return position.mobile;
  }
  
  return position.desktop;
};

/**
 * Get ad position configuration
 */
export const getAdPosition = (positionId: string): AdPosition | null => {
  return AD_POSITIONS[positionId] || null;
};

/**
 * Get sticky ad positions
 */
export const getStickyAdPositions = (): AdPosition[] => {
  return Object.values(AD_POSITIONS).filter(pos => pos.sticky && pos.enabled);
};

// ============================================
// AD CONTENT TYPES
// ============================================

export interface AdContent {
  id: string;
  position: string;
  code: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  priority?: number;
}

export interface AdSlotProps {
  position: string;
  className?: string;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
  showLabel?: boolean;
  testMode?: boolean;
}

// ============================================
// DEFAULT AD SLOT SETTINGS
// ============================================

export const AD_SLOT_DEFAULTS = {
  showLabel: true,
  labelText: 'Advertisement',
  loadingPlaceholder: true,
  errorFallback: true,
  testModeText: 'Ad Space',
} as const;

// ============================================
// GOOGLE ADSENSE SETTINGS
// ============================================

export const ADSENSE_CONFIG = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '',
  enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true',
  testMode: process.env.NODE_ENV === 'development',
} as const;
