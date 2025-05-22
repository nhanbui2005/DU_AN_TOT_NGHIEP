import { useState, useCallback } from 'react';
import { AppError, APIErrorCode, ErrorHandler } from '../../types/error';

interface UseErrorReturn {
  error: AppError | null;
  showError: (error: any) => void;
  clearError: () => void;
  isError: (code: APIErrorCode) => boolean;
}

export const useError = (): UseErrorReturn => {
  const [error, setError] = useState<AppError | null>(null);

  const showError = useCallback((error: any) => {
    const appError = ErrorHandler.convertAPIError(error);
    setError(appError);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const isError = useCallback((code: APIErrorCode) => {
    return error?.code === code;
  }, [error]);

  return {
    error,
    showError,
    clearError,
    isError,
  };
}; 