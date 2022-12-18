import styled from 'styled-components';
import getColor from 'utils/getColor';
import { TButtonWrapperProps, TButtonType } from './interfaces';

const buttonBorderColors: {
  [key in TButtonType]?: string;
} = {
  accent: getColor('background', 'accent'),
  primary: getColor('lightGray', 'primary'),
  danger: getColor('lightGray', 'danger'),
};

const buttonBackgroundColors: {
  [key in TButtonType]?: string;
} = {
  accent: getColor('background', 'accent'),
  primary: getColor('background', 'primary'),
  danger: getColor('background', 'danger'),
};

export const ButtonWrapper = styled.button<TButtonWrapperProps>`
  border: 1px solid
    ${({ buttonType, isDisabled }) =>
      isDisabled
        ? getColor('lightGray', 'primary')
        : buttonBorderColors[buttonType]};
  background-color: ${({ buttonType, isDisabled }) =>
    isDisabled
      ? getColor('lightGray', 'primary')
      : buttonBackgroundColors[buttonType]};
  text-align: center;
  padding: 6px 10px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  color: ${getColor('text', 'accent')};
  transition: all 0.1s ease;
  line-height: 0;
  height: 100%;
  width: 100%;
  margin-top: ${({ mt }) => (mt ? `${mt}px` : 'none')};
`;
