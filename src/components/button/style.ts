import styled from 'styled-components';
import getColor from 'utils/getColor';
import { IProps, TButtonType } from './interfaces';

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

export const ButtonWrapper = styled.div`
  border: 1px solid ${({ type }: IProps) => buttonBorderColors[type]};
  background-color: ${({ type }: IProps) => buttonBackgroundColors[type]};
  text-align: center;
  padding: 6px 10px;
  border-radius: 3px;
  color: ${getColor('text', 'accent')};
  transition: all 0.1s ease;
`;
