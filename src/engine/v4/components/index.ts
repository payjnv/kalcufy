// ============================================================================
// ENGINE V4 STANDALONE - COMPONENTS INDEX
// ============================================================================
// All components are native V4 - no V3 dependencies
// ============================================================================

// Input & Results
export { default as InputCardV4 } from './InputCardV4';
export { default as ResultsCardV4 } from './ResultsCardV4';
export { default as DetailedTableModalV4 } from './DetailedTableModalV4';
export { default as CopyResultsButton } from './CopyResultsButton';

// Info & Reference
export { default as InfoCardV4 } from './InfoCardV4';
export { default as ReferenceGridV4 } from './ReferenceGridV4';

// Education
export { default as ProseSectionV4 } from './ProseSectionV4';
export { default as ConsiderationsListV4 } from './ConsiderationsListV4';
export { default as ExampleSectionV4 } from './ExampleSectionV4';
export { default as FAQAccordionV4 } from './FAQAccordionV4';
export { default as SourcesSectionV4 } from './SourcesSectionV4';

// Visualizations
export { default as DistributionBarsV4 } from './DistributionBarsV4';
export { default as ChartV4, MultiChartV4 } from './ChartV4';

// UI Components
export { default as ModeSelectorV4 } from './ModeSelectorV4';
export { default as MobileResultsBarV4 } from './MobileResultsBarV4';
export { default as RatingShareWidgetV4 } from './RatingShareWidgetV4';
export { default as RelatedCalculatorsV4 } from './RelatedCalculatorsV4';
export { default as AnimatedNumber } from './AnimatedNumber';

// Export utilities
export * from './ExportUtils';

// Internal components (Presets, Compare, Sensitivity, etc.)
export {
  PresetSelector,
  CompareButton,
  ComparePanel,
  SensitivityChart,
  CollapsibleSection,
  LazySection,
  ShareWithValues,
  parseValuesFromUrl,
} from '../internal-components';
export { default as ActionButtonsV4 } from './ActionButtonsV4';
