'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import html2canvas from 'html2canvas';

interface ExportButtonsProps {
  calculatorSlug: string;
  data: Record<string, unknown>;
  results: Record<string, unknown>;
  translations?: {
    button?: Record<string, string>;
    common?: Record<string, string>;
  };
}

export const ExportButtons = ({
  calculatorSlug,
  data,
  results,
  translations,
}: ExportButtonsProps) => {
  const { data: session } = useSession();
  
  // Default translations
  const button = translations?.button || {
    savePdf: 'Save as PDF',
    saveImage: 'Save as Image',
    share: 'Share',
    saved: 'Saved!',
    copied: 'Copied!',
  };
  
  const common = translations?.common || {
    saving: 'Saving...',
    downloading: 'Downloading...',
  };
  
  // States
  const [isSaving, setIsSaving] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  // Save as PDF
  const handleSavePdf = async () => {
    setIsExportingPdf(true);
    try {
      const { generateCalculatorPDF } = await import('@/lib/utils/pdf-generator');
      await generateCalculatorPDF(calculatorSlug, data, results);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Save as Image
  const handleSaveImage = async () => {
    setIsExportingImage(true);
    try {
      const resultsElement = document.getElementById('calculator-results');
      if (resultsElement) {
        const canvas = await html2canvas(resultsElement, {
          backgroundColor: '#ffffff',
          scale: 2,
        });
        const link = document.createElement('a');
        link.download = `${calculatorSlug}-results.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch (error) {
      console.error('Image export failed:', error);
    } finally {
      setIsExportingImage(false);
    }
  };

  // Share
  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${calculatorSlug} Results`,
          url: url,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(url);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {/* PDF Button */}
      <button
        onClick={handleSavePdf}
        disabled={isExportingPdf}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {isExportingPdf ? common.downloading : button.savePdf}
      </button>

      {/* Image Button */}
      <button
        onClick={handleSaveImage}
        disabled={isExportingImage}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {isExportingImage ? common.downloading : button.saveImage}
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        {showCopied ? button.copied : button.share}
      </button>
    </div>
  );
};

export default ExportButtons;
