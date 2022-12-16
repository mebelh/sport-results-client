import { useCallback, useRef } from 'react';

export const useEvent = <P extends any[]>(
  callback: (...args: P) => void
): ((...args: P) => void) => {
  const callbackRef = useRef(callback);

  return useCallback(
    (...params) => {
      callbackRef.current(...params);
    },
    [callbackRef]
  );
};
