import { useEffect } from 'react';
import { useAsyncAction } from './use-async-action';

export function useAsync<T>(action: () => Promise<T>, dependencies: any[]) {
  const { data, error, loading, perform } = useAsyncAction(
    action,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    [...dependencies, action],
  );

  useEffect(() => {
    perform().catch(() => {
      // Action will be handled by the error field in the return value of `useAsyncAction`
    });
    // This is handled by the exhaustive-deps rule at the useAsyncAction level
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    data,
    error,
    loading,
    load: perform,
  };
}
