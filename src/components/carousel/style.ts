import styled from 'styled-components';
import getColor from 'utils/getColor';
import { browserWidth } from './utils';

export const CarouselPaginationItem = styled.span<{
  isActive?: boolean;
}>`
  width: ${({ isActive }) => (isActive ? '30px' : '16px')};
  height: 10px;
  border-radius: 50px;
  transition: 0.15s all linear;
  background-color: ${({ isActive }) =>
    isActive
      ? getColor('background', 'accent')
      : getColor('lightGray', 'primary')};
`;

export const CarouselPaginationWrapper = styled.div`
  display: flex;
  column-gap: 10px;
  width: 100%;
  justify-content: center;
  margin-top: 12px;
`;

export const CarouselItemsWrapper = styled.div<{
  height: number;
}>`
  overflow: hidden;
  position: relative;
  height: ${({ height }) => `${height}px`};
  transition: all ease 0.3s;
  min-height: 100px;
`;

export const CarouselItems = styled.div<{
  translateX: number;
  currentItemNumber: number;
}>`
  position: absolute;
  display: flex;
  column-gap: 16px;
  flex-wrap: nowrap;
  transition: 0.2s all linear;
  margin-left: ${({ currentItemNumber }) =>
    `-${currentItemNumber * browserWidth}px`};
  transform: ${({ translateX }) => `translateX(${-translateX}px)`};
`;

export const CarouselItem = styled.span`
  width: calc(100vw - 16px);
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: min-content;
`;
