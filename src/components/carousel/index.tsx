import { browserWidth } from 'components/carousel/utils';
import React, { useCallback, useMemo, useRef, useState } from 'react';
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
  const [translateX, setTranslateX] = useState(0);
  const [translateXStart, setTranslateXStart] = useState(0);

  const itemsRef = useRef<HTMLDivElement>(null);
  const itemsWrapperRef = useRef<HTMLDivElement>(null);

  const currentItem = itemsRef.current?.childNodes[
    currentItemNumber
  ] as HTMLDivElement;

  const handlePaginationClick = useCallback((index: number) => {
    setCurrentItemNumber(index);
  }, []);

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const { clientX } = e.targetTouches[0];

      setTranslateX(() => clientX);
    },
    [translateXStart, currentItemNumber]
  );

  const handleTouchEnd: React.TouchEventHandler = useCallback(() => {
    if (translateXStart - translateX > 70) {
      setCurrentItemNumber((c) => c + 1);
    }

    if (translateXStart - translateX < -70) {
      setCurrentItemNumber((c) => c - 1);
    }

    setTranslateX(0);
    setTranslateXStart(0);
  }, [translateXStart, translateX]);

  const handleTouchStart: React.TouchEventHandler = useCallback((e) => {
    setTranslateXStart(() => e.targetTouches[0].clientX);
    setTranslateX(() => e.targetTouches[0].clientX);
  }, []);

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

  return (
    <div>
      <CarouselItemsWrapper
        height={currentItem?.offsetHeight}
        ref={itemsWrapperRef}
      >
        <CarouselItems
          translateX={translateXStart - translateX}
          currentItemNumber={currentItemNumber}
          ref={itemsRef}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
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
