import styled from 'styled-components';
import getColor from 'utils/getColor';
import { MdOutlineClear } from 'react-icons/all';
import { TSnakeType } from './interfaces';

const snakeColorMap: {
  [key in TSnakeType]?: string;
} = {
  error: getColor('background', 'danger'),
  success: getColor('background', 'accent'),
  warning: getColor('background', 'transparentPrimary'),
};

export const Wrapper = styled.div`
  position: fixed;
  bottom: 100px;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  transition: all 0.2s ease;

  padding: 8px;
`;

export const SnakeWrapper = styled.div<{
  isKilled: boolean;
  type: TSnakeType;
  index: number;
}>`
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 4px;

  position: absolute;

  left: ${({ isKilled }) => (isKilled ? '100%' : '10px')};
  right: ${({ isKilled }) => (isKilled ? '-100%' : '10px')};
  bottom: 0;

  transform: ${({ index }) => `translateY(calc(-120% * ${index}))`};

  opacity: ${({ isKilled }) => (isKilled ? 0.4 : 1)};

  background-color: ${({ type }) => snakeColorMap[type]};
`;

export const CleanButton = styled(MdOutlineClear)<{
  isKilled: boolean;
}>`
  transition: all 0.4s ease;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: ${({ isKilled }) =>
    isKilled ? 'translateY(-50%) translateX(200%)' : 'translateY(-50%)'};
`;

export const Title = styled.p`
  color: ${getColor('text', 'primary')};
  font-size: 16px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: ${getColor('text', 'secondary')};
`;
