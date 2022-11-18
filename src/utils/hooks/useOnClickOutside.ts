import { MutableRefObject, useEffect } from 'react';

function useOnClickOutside(
  ref: MutableRefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref?.current || ref?.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener as any);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener as any);
    };
  }, [ref.current, handler]);
}

export default useOnClickOutside;
