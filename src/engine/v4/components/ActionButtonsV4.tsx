"use client";
/**
 * ACTION BUTTONS V4 - Exactly like V3
 * 
 * - Own card separate from results
 * - 3 buttons in same row: Save | PDF | Excel
 * - Save only shows if logged in
 * - PDF/Excel show PRO badge if not PRO user
 */

interface ActionButtonsV4Props {
  onExportPDF?: () => void;
  onExportCSV?: () => void;
  onSave?: () => void;
  saveStatus?: 'idle' | 'saving' | 'saved' | 'error';
  isLoggedIn?: boolean;
  isPro?: boolean;
  t: (key: string, fallback?: string) => string;
  hasResults?: boolean;
}

export default function ActionButtonsV4({
  onExportPDF,
  onExportCSV,
  onSave,
  saveStatus = 'idle',
  isLoggedIn = false,
  isPro = false,
  t,
  hasResults = true,
}: ActionButtonsV4Props) {
  const translate = typeof t === "function" ? t : (key: string, fallback?: string) => fallback || key;

  if (!hasResults) return null;

  const showSave = isLoggedIn && !!onSave;
  const showPDF = !!onExportPDF;
  const showExcel = !!onExportCSV;

  if (!showSave && !showPDF && !showExcel) return null;

  // Determine grid columns based on what's shown
  const buttonCount = [showSave, showPDF, showExcel].filter(Boolean).length;
  const gridCols = buttonCount === 3 ? 'grid-cols-3' : buttonCount === 2 ? 'grid-cols-2' : 'grid-cols-1';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
      <div className={`grid ${gridCols} gap-3`}>
        {/* Save Button - Only if logged in */}
        {showSave && (
          <button
            onClick={onSave}
            disabled={saveStatus === 'saving'}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border transition-all ${
              saveStatus === 'saved'
                ? 'bg-green-50 border-green-200 text-green-700'
                : saveStatus === 'saving'
                ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {saveStatus === 'saving' ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">{translate("buttons.saved", "Saved")}</span>
              </>
            ) : (
              <>
                <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <span className="font-medium">{translate("buttons.save", "Save")}</span>
              </>
            )}
          </button>
        )}

        {/* PDF Button */}
        {showPDF && (
          <button
            onClick={onExportPDF}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{translate("buttons.pdf", "PDF")}</span>
            {!isPro && (
              <span className="text-xs font-semibold px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">
                PRO
              </span>
            )}
          </button>
        )}

        {/* Excel/CSV Button */}
        {showExcel && (
          <button
            onClick={onExportCSV}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-medium">{translate("buttons.excel", "Excel")}</span>
            {!isPro && (
              <span className="text-xs font-semibold px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">
                PRO
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
