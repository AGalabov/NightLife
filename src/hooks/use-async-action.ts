import { useCallback, useEffect, useRef, useState } from 'react';

export type AsyncState<T> =
  | {
      data: undefined;
      error: null;
      loading: true;
    }
  | {
      data: T;
      error: null;
      loading: false;
    }
  | {
      data: undefined;
      error: Error;
      loading: false;
    };

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
    loading: true,
    data: undefined,
    error: null,
  });

  const lastCallId = useRef(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const perform = useCallback(async (...args: any[]): Promise<any> => {
    lastCallId.current += 1;
    const callId = lastCallId.current;

    try {
      setState({
        data: undefined,
        loading: true,
        error: null,
      });

      const result = await action(...args);

      if (callId === lastCallId.current) {
        setState({
          data: result,
          loading: false,
          error: null,
        });
      }

      return result;
    } catch (error) {
      if (callId === lastCallId.current) {
        setState({
          data: undefined,
          loading: false,
          error,
        });
      }

      throw error;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies) as T;

  useEffect(
    () => () => {
      lastCallId.current += 1;
    },
    [],
  );

  return {
    ...state,
    perform,
  };
}
