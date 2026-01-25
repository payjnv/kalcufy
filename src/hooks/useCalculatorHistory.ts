import { useSession } from 'next-auth/react';
import { useCallback } from 'react';

interface SaveCalculationParams {
  calculatorSlug: string;
  calculatorName: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
}

export function useCalculatorHistory() {
  const { data: session } = useSession();

  const saveCalculation = useCallback(async (params: SaveCalculationParams) => {
    if (!session?.user) {
      return { success: false, reason: 'not_logged_in' };
    }

    try {
      const response = await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, reason: error.error };
      }

      const data = await response.json();
      return { success: true, entry: data.entry };
    } catch (error) {
      console.error('Error saving calculation:', error);
      return { success: false, reason: 'network_error' };
    }
  }, [session]);

  const getHistory = useCallback(async () => {
    if (!session?.user) {
      return { history: [], isPro: false };
    }

    try {
      const response = await fetch('/api/history');
      if (!response.ok) {
        return { history: [], isPro: false };
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching history:', error);
      return { history: [], isPro: false };
    }
  }, [session]);

  const deleteCalculation = useCallback(async (id: string) => {
    if (!session?.user) {
      return { success: false };
    }

    try {
      const response = await fetch(`/api/history?id=${id}`, {
        method: 'DELETE',
      });
      return { success: response.ok };
    } catch (error) {
      console.error('Error deleting calculation:', error);
      return { success: false };
    }
  }, [session]);

  return {
    saveCalculation,
    getHistory,
    deleteCalculation,
    isLoggedIn: !!session?.user,
  };
}
