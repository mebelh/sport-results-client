import styled from 'styled-components';
import getColor, { TColorVariant } from 'utils/getColor';

export interface ITextProps {
  centered?: boolean;
  variant?: TColorVariant;
}

export const Text1 = styled.p<ITextProps>`
  font-size: 32px;
  font-weight: 500;
  color: ${({ variant = 'primary' }) => getColor('text', variant)};
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};
`;

export const Text2 = styled.p<ITextProps>`
  font-size: 24px;
  font-weight: 500;
  color: ${({ variant = 'primary' }) => getColor('text', variant)};
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};
`;

export const Text3 = styled.p<ITextProps>`
  font-size: 18px;
  font-weight: 400;
  color: ${({ variant = 'primary' }) => getColor('text', variant)};
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};
`;

export const Text4 = styled.p<ITextProps>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ variant = 'primary' }) => getColor('text', variant)};
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};
`;

export const Text5 = styled.p<ITextProps>`
  font-size: 12px;
  font-weight: 400;
  color: ${({ variant = 'primary' }) => getColor('text', variant)};
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};
`;
