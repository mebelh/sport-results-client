import styled from 'styled-components';
import getColor from 'utils/getColor';
import { IPosition, TSelectElementProps } from './interfaces';

export const Wrapper = styled.div`
  position: relative;
  padding: 10px 0;
`;

export const Value = styled.div<{
  isOpen: boolean;
  error?: string | boolean;
}>`
  min-height: 42px;
  width: 100%;
  border-radius: ${({ isOpen }) => (isOpen ? '4px 4px 0 0' : '4px')};
  border: 1px solid
    ${({ error }) =>
      error
        ? getColor('background', 'danger')
        : getColor('lightGray', 'primary')};
  display: flex;
  flex-wrap: wrap;

  gap: 5px;

  margin-top: 3px;

  align-items: center;
  padding: 8px 8px;
  position: relative;
`;

export const Title = styled.div`
  font-size: 14px;
  color: ${getColor('text', 'primary')};
  margin-left: 10px;
`;

export const ElementsWrapper = styled.div<{
  cords: IPosition | null;
}>`
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: ${getColor('background', 'transparentPrimary')};
  width: ${({ cords }) => `${cords?.width}px`};
  top: ${({ cords }) => `${cords?.y}px`};
  left: ${({ cords }) => `${cords?.x}px`};
  z-index: 1;
`;

export const ElementWrapper = styled.div`
  padding: 10px 7px;
  border-bottom: 1px solid ${getColor('lightGray', 'accent')};
  border-left: 1px solid ${getColor('lightGray', 'primary')};
  border-right: 1px solid ${getColor('lightGray', 'primary')};
  background-color: ${({
    isSelected,
  }: Pick<TSelectElementProps, 'isSelected'>) =>
    isSelected
      ? getColor('lightGray', 'primary')
      : getColor('background', 'primary')};

  &:last-child {
    border-radius: 0 0 4px 4px;
  }
  color: ${getColor('text', 'primary')};
`;

export const Placeholder = styled.div`
  color: ${getColor('lightGray', 'primary')};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const Error = styled.div`
  font-size: 14px;
  color: ${getColor('text', 'error')};
`;

export const Label = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: ${getColor('background', 'accent')};
  color: ${getColor('text', 'primary')};
`;
