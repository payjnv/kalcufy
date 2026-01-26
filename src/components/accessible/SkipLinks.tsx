// ============================================
// SKIP LINKS COMPONENT
// ============================================
// WCAG 2.1 AA Compliant - 2.4.1 Bypass Blocks
// Allows keyboard users to skip repetitive content
// ============================================

'use client';

import { cn } from '@/theme/calculator-theme';

// ============================================
// TYPES
// ============================================

export interface SkipLink {
  href: string;
  label: string;
}

export interface SkipLinksProps {
  links?: SkipLink[];
  className?: string;
}

// ============================================
// DEFAULT LINKS
// ============================================

const DEFAULT_SKIP_LINKS: SkipLink[] = [
  { href: '#calculator-inputs', label: 'Skip to calculator' },
  { href: '#calculator-results', label: 'Skip to results' },
  { href: '#main-content', label: 'Skip to main content' },
];

// ============================================
// COMPONENT
// ============================================

export const SkipLinks: React.FC<SkipLinksProps> = ({
  links = DEFAULT_SKIP_LINKS,
  className = '',
}) => {
  return (
    <nav 
      aria-label="Skip navigation"
      className={cn(
        // Hidden by default
        'sr-only',
        
        // Visible on focus
        'focus-within:not-sr-only',
        'focus-within:fixed',
        'focus-within:top-0',
        'focus-within:left-0',
        'focus-within:z-[100]',
        'focus-within:w-full',
        'focus-within:bg-white',
        'focus-within:p-4',
        'focus-within:shadow-lg',
        'focus-within:border-b',
        'focus-within:border-slate-200',
        
        className
      )}
    >
      <ul className="flex flex-wrap gap-4 max-w-7xl mx-auto">
        {links.map((link, index) => (
          <li key={index}>
            <a 
              href={link.href}
              className={cn(
                'inline-block',
                'px-4 py-2',
                'bg-blue-600 text-white',
                'rounded-lg',
                'font-medium',
                'text-sm',
                
                // Focus styles
                'focus:outline-none',
                'focus:ring-2',
                'focus:ring-blue-500',
                'focus:ring-offset-2',
                
                // Hover
                'hover:bg-blue-700',
                
                // Transition
                'transition-colors duration-150'
              )}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SkipLinks;
