import React, { useMemo, useRef, useState } from 'react';
import {
  TOnDragEnd,
  TOnDragMove,
  TOnDragStart,
  useDrag,
} from 'utils/hooks/useDrag';
import { ICarouselProps } from './interfaces';
import {
  CarouselPaginationWrapper,
  CarouselPaginationItem,
  CarouselItemsWrapper,
  CarouselItems,
  CarouselItem,
} from './style';

let carouselId = 0;

const getPaginationItems = (
  totalItems: number,
  currentItem: number,
  id: string,
  onPaginationClick: (id: number) => void
) =>
  new Array(totalItems).fill(0).map((_, index) => (
    <CarouselPaginationItem
      /* eslint-disable-next-line react/no-array-index-key */
      key={`carouselPagination-${id}-${index}`}
      isActive={index === currentItem}
      onClick={() => {
        onPaginationClick(index);
      }}
    />
  ));

const Carousel: React.FC<ICarouselProps> = ({ items }) => {
  const { length } = items;
  const carouselIdLocale = useMemo(() => `carousel-${carouselId++}`, []);
  const [currentItemNumber, setCurrentItemNumber] = useState(0);
  const currentItemNumberRef = useRef(0);
  const [translateX, setTranslateX] = useState(0);
  const translateXStart = useRef(0);

  const itemsRef = useRef<HTMLDivElement>(null);
  const itemsWrapperRef = useRef<HTMLDivElement>(null);

  const currentItem = itemsRef.current?.childNodes[
    currentItemNumber
  ] as HTMLDivElement;

  const handlePaginationClick = (index: number) => {
    setCurrentItemNumber(index);
  };

  const handleTouchMove: TOnDragMove = (clientX) => {
    setTranslateX(translateXStart.current - clientX);
  };

  const handleTouchEnd: TOnDragEnd = (clientX) => {
    if (
      translateXStart.current - clientX > 70 &&
      currentItemNumberRef.current < length - 2
    ) {
      setCurrentItemNumber((c) => c + 1);
      currentItemNumberRef.current++;
    }

    if (
      translateXStart.current - clientX < -70 &&
      currentItemNumberRef.current > 0
    ) {
      setCurrentItemNumber((c) => c - 1);
      currentItemNumberRef.current--;
    }

    setTranslateX(0);
  };

  const handleTouchStart: TOnDragStart = (clientX) => {
    translateXStart.current = clientX;
  };

  const paginationItems = useMemo(
    () =>
      getPaginationItems(
        length,
        currentItemNumber,
        carouselIdLocale,
        handlePaginationClick
      ),
    [currentItemNumber]
  );

  useDrag({
    ref: itemsRef,
    onDragStart: handleTouchStart,
    onDragMove: handleTouchMove,
    onDragEnd: handleTouchEnd,
  });

  return (
    <div>
      <CarouselItemsWrapper
        height={currentItem?.offsetHeight}
        ref={itemsWrapperRef}
      >
        <CarouselItems
          translateX={translateX}
          currentItemNumber={currentItemNumber}
          ref={itemsRef}
        >
          {items.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <CarouselItem key={`carouselItem-${carouselIdLocale}-${index}`}>
              {item}
            </CarouselItem>
          ))}
        </CarouselItems>
      </CarouselItemsWrapper>

      <CarouselPaginationWrapper>{paginationItems}</CarouselPaginationWrapper>
    </div>
  );
};

export default Carousel;
