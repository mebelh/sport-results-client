import styled from 'styled-components';
import getColor from 'utils/getColor';

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
  marginLeft: number;
}>`
  position: absolute;
  display: flex;
  column-gap: 16px;
  flex-wrap: nowrap;
  transition: 0.2s all linear;
  left: ${({ marginLeft }) => `calc(${marginLeft} * -100vw)`};
`;

export const CarouselItem = styled.span`
  width: calc(100vw - 8px);
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: min-content;
`;
