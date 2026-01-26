// ============================================
// CALCULATOR LAYOUT COMPONENT
// ============================================
// Master layout template for all calculators
// Based on /ideal-weight-calculator design
// ============================================

'use client';

import React from 'react';
import { CalculatorConfig } from '@/types/calculator.types';
import { CALCULATOR_THEME, getGradientByCategory, cn } from '@/theme/calculator-theme';
import { SkipLinks } from '@/components/accessible';
import { AdSlot } from '@/components/ads/AdSlot';
import { HeroSection } from '@/components/calculator/HeroSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { ExportButtons } from '@/components/calculator/ExportButtons';
import { MobileResultsBar } from '@/components/calculator/MobileResultsBar';

// ============================================
// TYPES
// ============================================

export interface CalculatorLayoutProps {
  config: CalculatorConfig;
  locale: string;
  children: {
    inputs: React.ReactNode;
    results: React.ReactNode;
    education: React.ReactNode;
    faqs: React.ReactNode;
  };
}

// ============================================
// COMPONENT
// ============================================

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  config,
  locale,
  children,
}) => {
  const theme = CALCULATOR_THEME;
  const gradientClass = getGradientByCategory(config.category);
  
  return (
    <>
      {/* Skip Links - Accessibility */}
      <SkipLinks />
      
      {/* Hero Section */}
      <HeroSection
        config={config}
        locale={locale}
        gradientClass={gradientClass}
      />
      
      {/* Main Content */}
      <main 
        id="main-content"
        className={cn(theme.spacing.container, theme.spacing.section)}
      >
        <div className={theme.layout.mainWithSidebar}>
          {/* Main Column */}
          <div className={theme.layout.mainColumn}>
            
            {/* Inputs Section */}
            <section 
              id="calculator-inputs"
              aria-labelledby="inputs-heading"
              className={cn(
                theme.components.card.default,
                theme.spacing.card,
                'mb-8'
              )}
            >
              <h2 
                id="inputs-heading"
                className={cn(
                  theme.typography.fontSize.sectionTitle,
                  theme.typography.fontWeight.semibold,
                  theme.colors.text.primary,
                  'mb-6'
                )}
              >
                Enter Your Information
              </h2>
              
              {children.inputs}
            </section>
            
            {/* Results Section */}
            <section
              id="calculator-results"
              aria-labelledby="results-heading"
              aria-live="polite"
              className={cn(
                theme.components.card.default,
                theme.spacing.card,
                'mb-8'
              )}
            >
              <h2 
                id="results-heading"
                className={cn(
                  theme.typography.fontSize.sectionTitle,
                  theme.typography.fontWeight.semibold,
                  theme.colors.text.primary,
                  'mb-6'
                )}
              >
                Your Results
              </h2>
              
              {children.results}
              
              {/* Export Buttons */}
              {config.allowExport !== false && (
                <ExportButtons 
                  calculatorSlug={config.slug}
                  className="mt-6 pt-6 border-t border-slate-100"
                />
              )}
            </section>
            
            {/* Mobile Ad Slot 1 */}
            <AdSlot 
              position="mobile-content-1" 
              mobileOnly 
              className="my-8" 
            />
            
            {/* Education Section */}
            {children.education && (
              <section
                aria-labelledby="education-heading"
                className="mb-8 space-y-8"
              >
                {children.education}
              </section>
            )}
            
            {/* Mobile Ad Slot 2 */}
            <AdSlot 
              position="mobile-content-2" 
              mobileOnly 
              className="my-8" 
            />
            
            {/* FAQ Section */}
            <section
              id="faq-section"
              aria-labelledby="faq-heading"
              className={cn(
                theme.components.card.default,
                theme.spacing.card
              )}
            >
              <h2 
                id="faq-heading"
                className={cn(
                  theme.typography.fontSize.sectionTitle,
                  theme.typography.fontWeight.semibold,
                  theme.colors.text.primary,
                  'mb-6'
                )}
              >
                Frequently Asked Questions
              </h2>
              
              {children.faqs}
            </section>
          </div>
          
          {/* Sidebar */}
          <aside className={theme.layout.sidebarColumn}>
            {/* Sidebar Ad Top */}
            <AdSlot 
              position="sidebar-top" 
              className="mb-6" 
            />
            
            {/* Related Calculators */}
            {config.relatedCalculators && config.relatedCalculators.length > 0 && (
              <RelatedCalculators 
                calculators={config.relatedCalculators}
                currentSlug={config.slug}
                locale={locale}
                className="mb-6"
              />
            )}
            
            {/* Sidebar Ad Sticky */}
            <div className="sticky top-24">
              <AdSlot position="sidebar-sticky" />
            </div>
          </aside>
        </div>
      </main>
      
      {/* Mobile Results Bar */}
      <MobileResultsBar />
      
      {/* Screen Reader Announcer */}
      <div 
        id="a11y-announcer" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      />
    </>
  );
};

export default CalculatorLayout;
