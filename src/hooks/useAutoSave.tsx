'use client';

import { useState, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';

interface AutoSaveConfig {
  slug: string;
  name: string;
}

export function useAutoSave({ slug, name }: AutoSaveConfig) {
  const { data: session } = useSession();
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const lastSavedRef = useRef<string>('');

  const isLoggedIn = !!session?.user;

  // Only save when explicitly called
  const saveCalculation = useCallback(async (inputs: Record<string, any>, results: Record<string, any>) => {
    if (!session?.user) return;

    const dataHash = JSON.stringify({ inputs, results });
    if (dataHash === lastSavedRef.current) return;

    setStatus('saving');

    try {
      const response = await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculatorSlug: slug,
          calculatorName: name,
          inputs,
          results,
        }),
      });

      if (response.ok) {
        lastSavedRef.current = dataHash;
        setStatus('saved');
        setTimeout(() => setStatus('idle'), 2000);
      } else {
        setStatus('idle');
      }
    } catch (error) {
      console.error('Save error:', error);
      setStatus('idle');
    }
  }, [session, slug, name]);

  // Save Indicator Component
  const SaveIndicator = () => {
    if (!isLoggedIn) return null;

    return (
      <div className={`inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full transition-all ${
        status === 'saving' ? 'bg-blue-100 text-blue-600' :
        status === 'saved' ? 'bg-green-100 text-green-600' :
        'bg-slate-100 text-slate-500'
      }`}>
        {status === 'saving' && (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Saving...</span>
          </>
        )}
        {status === 'saved' && (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Saved</span>
          </>
        )}
        {status === 'idle' && isLoggedIn && (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span>Auto-save on</span>
          </>
        )}
      </div>
    );
  };

  return {
    SaveIndicator,
    status,
    isLoggedIn,
    saveCalculation,
  };
}
