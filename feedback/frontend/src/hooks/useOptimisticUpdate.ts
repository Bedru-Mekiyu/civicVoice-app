import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface OptimisticUpdateOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * Hook for optimistic UI updates
 * Immediately updates the UI, then reverts if the operation fails
 */
export function useOptimisticUpdate<T>(
  initialData: T,
  options: OptimisticUpdateOptions<T> = {}
) {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (
      optimisticData: T,
      asyncOperation: () => Promise<T>
    ): Promise<T | null> => {
      // Store original data for rollback
      const originalData = data;

      try {
        setIsLoading(true);
        setError(null);

        // Optimistically update UI
        setData(optimisticData);

        // Execute async operation
        const result = await asyncOperation();

        // Update with actual result
        setData(result);

        if (options.successMessage) {
          toast({
            title: 'Success',
            description: options.successMessage,
          });
        }

        options.onSuccess?.(result);
        return result;
      } catch (err) {
        // Rollback on error
        setData(originalData);

        const error = err instanceof Error ? err : new Error('An error occurred');
        setError(error);

        toast({
          title: 'Error',
          description: options.errorMessage || error.message,
          variant: 'destructive',
        });

        options.onError?.(error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [data, options]
  );

  return {
    data,
    isLoading,
    error,
    execute,
    setData,
  };
}
