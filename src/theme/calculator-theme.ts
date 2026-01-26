// ============================================
// KALCUFY CALCULATOR ENGINE - THEME CONFIGURATION
// ============================================
// Version: 1.0.0
// Purpose: Centralized visual theme for all calculators
// Design Base: /ideal-weight-calculator
// ============================================

import { CalculatorCategory } from '@/types/calculator.types';

// ============================================
// CATEGORY GRADIENTS
// ============================================

export const CATEGORY_GRADIENTS: Record<CalculatorCategory, string> = {
  health: 'from-emerald-600 to-teal-500',
  finance: 'from-blue-600 to-cyan-500',
  everyday: 'from-purple-600 to-pink-500',
};

export const CATEGORY_COLORS: Record<CalculatorCategory, {
  primary: string;
  secondary: string;
  light: string;
  dark: string;
}> = {
  health: {
    primary: '#059669',    // emerald-600
    secondary: '#14b8a6',  // teal-500
    light: '#d1fae5',      // emerald-100
    dark: '#064e3b',       // emerald-900
  },
  finance: {
    primary: '#2563eb',    // blue-600
    secondary: '#06b6d4',  // cyan-500
    light: '#dbeafe',      // blue-100
    dark: '#1e3a8a',       // blue-900
  },
  everyday: {
    primary: '#9333ea',    // purple-600
    secondary: '#ec4899',  // pink-500
    light: '#f3e8ff',      // purple-100
    dark: '#581c87',       // purple-900
  },
};

// ============================================
// MAIN THEME OBJECT
// ============================================

export const CALCULATOR_THEME = {
  // ============================================
  // COLORS
  // ============================================
  colors: {
    gradients: CATEGORY_GRADIENTS,
    categories: CATEGORY_COLORS,
    
    // Background colors
    background: {
      page: 'bg-slate-50',
      card: 'bg-white',
      input: 'bg-white',
      hover: 'bg-slate-50',
      active: 'bg-slate-100',
      disabled: 'bg-slate-100',
      success: 'bg-green-50',
      error: 'bg-red-50',
      warning: 'bg-yellow-50',
      info: 'bg-blue-50',
    },
    
    // Text colors
    text: {
      primary: 'text-slate-900',
      secondary: 'text-slate-600',
      muted: 'text-slate-400',
      inverse: 'text-white',
      success: 'text-green-700',
      error: 'text-red-600',
      warning: 'text-yellow-700',
      info: 'text-blue-700',
      link: 'text-blue-600 hover:text-blue-700',
    },
    
    // Border colors
    border: {
      default: 'border-slate-200',
      hover: 'border-slate-300',
      focus: 'border-blue-500',
      error: 'border-red-500',
      success: 'border-green-500',
    },
    
    // Brand colors (Kalcufy)
    brand: {
      primary: '#2563eb',    // blue-600
      secondary: '#06b6d4',  // cyan-500
      gradient: 'from-blue-600 to-cyan-500',
    },
  },
  
  // ============================================
  // TYPOGRAPHY
  // ============================================
  typography: {
    fontFamily: {
      sans: 'font-sans',      // Inter or system font
      heading: 'font-sans',   // Space Grotesk for headings if loaded
      mono: 'font-mono',
    },
    
    fontSize: {
      xs: 'text-xs',          // 12px
      sm: 'text-sm',          // 14px
      base: 'text-base',      // 16px
      lg: 'text-lg',          // 18px
      xl: 'text-xl',          // 20px
      '2xl': 'text-2xl',      // 24px
      '3xl': 'text-3xl',      // 30px
      '4xl': 'text-4xl',      // 36px
      '5xl': 'text-5xl',      // 48px
      
      // Semantic sizes
      pageTitle: 'text-3xl md:text-4xl lg:text-5xl',
      sectionTitle: 'text-xl md:text-2xl',
      cardTitle: 'text-lg md:text-xl',
      inputLabel: 'text-sm md:text-base',
      resultPrimary: 'text-4xl md:text-5xl lg:text-6xl',
      resultSecondary: 'text-xl md:text-2xl',
      body: 'text-base',
      caption: 'text-sm',
      small: 'text-xs',
    },
    
    fontWeight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    
    lineHeight: {
      tight: 'leading-tight',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
    },
  },
  
  // ============================================
  // SPACING
  // ============================================
  spacing: {
    // Container
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    containerNarrow: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
    containerWide: 'max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8',
    
    // Sections
    section: 'py-8 md:py-12',
    sectionLarge: 'py-12 md:py-16 lg:py-20',
    sectionSmall: 'py-4 md:py-6',
    
    // Cards
    card: 'p-6 md:p-8',
    cardSmall: 'p-4 md:p-6',
    cardLarge: 'p-8 md:p-10',
    
    // Inputs
    input: 'px-4 py-3',
    inputSmall: 'px-3 py-2',
    inputLarge: 'px-5 py-4',
    
    // Buttons
    button: 'px-6 py-3',
    buttonSmall: 'px-4 py-2',
    buttonLarge: 'px-8 py-4',
    
    // Gaps
    gap: {
      grid: 'gap-6 md:gap-8',
      form: 'gap-4 md:gap-6',
      buttons: 'gap-2 md:gap-3',
      stack: 'space-y-4 md:space-y-6',
      inline: 'space-x-2 md:space-x-3',
    },
  },
  
  // ============================================
  // BORDERS & EFFECTS
  // ============================================
  effects: {
    borderRadius: {
      none: 'rounded-none',
      sm: 'rounded-lg',
      md: 'rounded-xl',
      lg: 'rounded-2xl',
      xl: 'rounded-3xl',
      full: 'rounded-full',
    },
    
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
      
      // Semantic shadows
      card: 'shadow-lg shadow-slate-200/50',
      cardHover: 'shadow-xl shadow-slate-200/60',
      input: 'shadow-sm',
      inputFocus: 'shadow-md',
      button: 'shadow-md hover:shadow-lg',
      dropdown: 'shadow-xl',
      modal: 'shadow-2xl',
    },
    
    border: {
      default: 'border border-slate-200',
      thick: 'border-2 border-slate-200',
      dashed: 'border border-dashed border-slate-300',
      
      // Focus states
      focus: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      focusVisible: 'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
      focusWithin: 'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
    },
    
    // Backdrop blur for glassmorphism
    blur: {
      none: 'backdrop-blur-none',
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
    },
  },
  
  // ============================================
  // ANIMATIONS
  // ============================================
  animation: {
    transition: {
      fast: 'transition-all duration-150 ease-in-out',
      normal: 'transition-all duration-200 ease-in-out',
      slow: 'transition-all duration-300 ease-in-out',
      slower: 'transition-all duration-500 ease-in-out',
    },
    
    hover: {
      scale: 'hover:scale-[1.02] active:scale-[0.98]',
      scaleSmall: 'hover:scale-[1.01]',
      lift: 'hover:-translate-y-0.5',
      glow: 'hover:shadow-lg',
      opacity: 'hover:opacity-80',
      brighten: 'hover:brightness-110',
    },
    
    loading: {
      pulse: 'animate-pulse',
      spin: 'animate-spin',
      bounce: 'animate-bounce',
      ping: 'animate-ping',
    },
  },
  
  // ============================================
  // BREAKPOINTS
  // ============================================
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    
    // Prefixes
    mobile: '',           // default
    tablet: 'md:',        // >= 768px
    desktop: 'lg:',       // >= 1024px
    wide: 'xl:',          // >= 1280px
    ultrawide: '2xl:',    // >= 1536px
  },
  
  // ============================================
  // GRID LAYOUTS
  // ============================================
  layout: {
    // Main layout with sidebar
    mainWithSidebar: 'grid grid-cols-1 lg:grid-cols-3 gap-8',
    mainColumn: 'lg:col-span-2',
    sidebarColumn: 'hidden lg:block lg:col-span-1',
    
    // Full width
    fullWidth: 'col-span-full',
    
    // Input grids
    inputGrid: 'grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6',
    inputFull: 'sm:col-span-2',
    inputHalf: 'sm:col-span-1',
    inputThird: 'sm:col-span-1 lg:col-span-1',
    
    // Result grids
    resultGrid: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
    resultFull: 'col-span-full',
    resultHalf: 'col-span-1',
    
    // Card grids
    cardGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
  },
  
  // ============================================
  // Z-INDEX LAYERS
  // ============================================
  zIndex: {
    behind: 'z-[-1]',
    base: 'z-0',
    raised: 'z-10',
    dropdown: 'z-20',
    sticky: 'z-30',
    header: 'z-40',
    modal: 'z-50',
    tooltip: 'z-60',
    toast: 'z-70',
  },
  
  // ============================================
  // COMPONENT VARIANTS
  // ============================================
  components: {
    // Button variants
    button: {
      primary: `
        bg-gradient-to-r from-blue-600 to-cyan-500 
        text-white font-semibold 
        rounded-xl shadow-md 
        hover:shadow-lg hover:scale-[1.02] 
        active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        transition-all duration-200
      `,
      secondary: `
        bg-white border border-slate-200 
        text-slate-700 font-medium 
        rounded-xl shadow-sm 
        hover:bg-slate-50 hover:border-slate-300
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200
      `,
      ghost: `
        bg-transparent 
        text-slate-600 font-medium 
        rounded-lg 
        hover:bg-slate-100 hover:text-slate-900
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        transition-all duration-200
      `,
      danger: `
        bg-red-600 
        text-white font-semibold 
        rounded-xl shadow-md 
        hover:bg-red-700 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200
      `,
    },
    
    // Input variants
    input: {
      default: `
        w-full px-4 py-3 
        bg-white border border-slate-200 
        rounded-xl shadow-sm 
        text-slate-900 placeholder:text-slate-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed
        transition-all duration-200
      `,
      error: `
        w-full px-4 py-3 
        bg-red-50 border border-red-500 
        rounded-xl shadow-sm 
        text-slate-900 placeholder:text-slate-400
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
        transition-all duration-200
      `,
      withUnit: `
        w-full pl-4 pr-20 py-3 
        bg-white border border-slate-200 
        rounded-xl shadow-sm 
        text-slate-900 placeholder:text-slate-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed
        transition-all duration-200
      `,
    },
    
    // Card variants
    card: {
      default: `
        bg-white rounded-2xl shadow-lg shadow-slate-200/50 
        border border-slate-100
      `,
      elevated: `
        bg-white rounded-2xl shadow-xl shadow-slate-200/60 
        border border-slate-100
        hover:shadow-2xl hover:-translate-y-1
        transition-all duration-300
      `,
      flat: `
        bg-slate-50 rounded-xl 
        border border-slate-200
      `,
      outlined: `
        bg-white rounded-xl 
        border-2 border-slate-200
      `,
    },
    
    // Badge variants
    badge: {
      success: 'bg-green-100 text-green-700 border border-green-200',
      warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
      error: 'bg-red-100 text-red-700 border border-red-200',
      info: 'bg-blue-100 text-blue-700 border border-blue-200',
      neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    },
  },
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getGradientByCategory = (category: CalculatorCategory): string => {
  return CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS.finance;
};

export const getColorsByCategory = (category: CalculatorCategory) => {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.finance;
};

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// ============================================
// TYPE EXPORTS
// ============================================

export type ThemeColors = typeof CALCULATOR_THEME.colors;
export type ThemeTypography = typeof CALCULATOR_THEME.typography;
export type ThemeSpacing = typeof CALCULATOR_THEME.spacing;
export type ThemeEffects = typeof CALCULATOR_THEME.effects;
export type ThemeComponents = typeof CALCULATOR_THEME.components;
