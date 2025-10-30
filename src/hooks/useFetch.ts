import { useState, useCallback } from 'react';
import { APIError } from '../services/api';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseFetchReturn<T> extends UseFetchState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

/**
 * Custom hook for handling async operations
 *
 * @example
 * const { data, loading, error, execute } = useFetch(loginService);
 *
 * const handleLogin = async () => {
 *   const result = await execute(email, password);
 *   if (result) {
 *     // Success
 *   }
 * };
 */
export const useFetch = <T = unknown>(
  asyncFunction: (...args: any[]) => Promise<T>
): UseFetchReturn<T> => {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState({ data: null, loading: true, error: null });

      try {
        const result = await asyncFunction(...args);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (error) {
        const errorMessage =
          error instanceof APIError
            ? error.message
            : 'An unexpected error occurred';

        setState({ data: null, loading: false, error: errorMessage });
        return null;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};
