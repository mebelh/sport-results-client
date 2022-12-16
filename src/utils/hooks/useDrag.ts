import React, { useCallback, useEffect, useRef } from 'react';

export type TOnDragStart = (clientX: number) => void;
export type TOnDragMove = (clientX: number, prevClientX: number) => void;
export type TOnDragEnd = (clientX: number, prevClientX: number) => void;

export interface IDragProps {
  onDragStart?: TOnDragStart;
  onDragMove?: TOnDragMove;
  onDragEnd?: TOnDragEnd;
  ref: React.RefObject<HTMLElement>;
}

export function useDrag({
  onDragMove,
  onDragStart,
  onDragEnd,
  ref,
}: IDragProps) {
  const prevClientX = useRef(0);

  const handleMouseMove = useCallback(
    (e: HTMLElementEventMap['pointermove']) => {
      onDragMove?.(e.clientX, prevClientX.current);
      prevClientX.current = e.clientX;
    },
    []
  );

  useEffect(() => {
    if (!ref.current) {
      throw new Error('Ref is required!!!');
    }

    ref.current.addEventListener('pointerdown', ({ clientX }) => {
      onDragStart?.(clientX);

      ref.current?.addEventListener('pointermove', handleMouseMove);

      ref.current?.addEventListener('pointerup', (e) => {
        ref.current?.removeEventListener('pointermove', handleMouseMove);
        onDragEnd?.(e.clientX, prevClientX.current);
      });
    });
  }, []);
}
