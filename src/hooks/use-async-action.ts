import { useCallback, useEffect, useRef, useState } from 'react';

export interface AsyncState<T> {
  hasBeenTriggered: boolean;
  data: T | undefined;
  error: Error | null;
  loading: boolean;
}

type UnwrapPromise<T> = T extends Promise<infer R> ? R : unknown;
type UseAsyncActionState<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (...args: any[]) => Promise<any>
> = AsyncState<UnwrapPromise<ReturnType<T>>>;

export function useAsyncAction<T extends (...args: any[]) => Promise<any>>(
  action: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: any[],
) {
  const [state, setState] = useState<UseAsyncActionState<T>>({
    data: undefined,
    error: null,
    loading: false,
    hasBeenTriggered: false,
  });

  const lastCallId = useRef(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const perform = useCallback(async (...args: any[]): Promise<any> => {
    lastCallId.current += 1;
    const callId = lastCallId.current;

    try {
      setState({
        hasBeenTriggered: true,
        data: undefined,
        loading: true,
        error: null,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await action(...args);

      if (callId === lastCallId.current) {
        setState({
          hasBeenTriggered: true,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data: result,
          loading: false,
          error: null,
        });
      }

      return result;
    } catch (error) {
      if (callId === lastCallId.current) {
        setState({
          hasBeenTriggered: true,
          data: undefined,
          loading: false,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          error,
        });
      }

      throw error;
    }
    // This is handled by the exhaustive-deps rule at the useAsyncAction level
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies) as T;

  const trigger = useCallback((...args: Parameters<T>): void => {
    perform(...args).catch(() => {
      // do nothing
    });
    // This is handled by the exhaustive-deps rule at the useAsyncAction level
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(
    () => () => {
      lastCallId.current += 1;
    },
    [],
  );

  return {
    ...state,
    perform,
    trigger,
  };
}
