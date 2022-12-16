import React, { useEffect, useRef } from 'react';
import { disableTouchScroll, enableTouchScroll } from 'utils/disableScroll';

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

  const handlePointerMove = (e: HTMLElementEventMap['pointermove']) => {
    onDragMove?.(e.clientX, prevClientX.current);
    prevClientX.current = e.clientX;
  };

  const handlePointerUp = (e: HTMLElementEventMap['pointermove']) => {
    ref.current?.removeEventListener('pointermove', handlePointerMove);
    onDragEnd?.(e.clientX, prevClientX.current);
    enableTouchScroll();
  };

  const handlePointerDown = ({
    clientX,
  }: HTMLElementEventMap['pointerdown']) => {
    onDragStart?.(clientX);
    disableTouchScroll();

    ref.current?.addEventListener('pointermove', handlePointerMove);

    ref.current?.addEventListener('pointerup', handlePointerUp);
  };

  useEffect(() => {
    if (!ref.current) {
      throw new Error('Ref is required!!!');
    }

    ref.current.addEventListener('pointerdown', handlePointerDown);

    return () => {
      ref.current?.removeEventListener('pointerdown', handlePointerDown);
      ref.current?.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);
}
