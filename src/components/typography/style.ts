import styled from 'styled-components';
import getColor, { TColorVariant } from 'utils/getColor';

export interface ITextProps {
  centered?: boolean;
  variant?: TColorVariant;
  mt?: number;
}

const Text = styled.p<ITextProps>`
  color: ${({ variant = 'primary' }) => getColor('text', variant)};
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : 'none')};
`;

export const Text1 = styled(Text)`
  font-size: 32px;
  font-weight: 500;
`;

export const Text2 = styled(Text)`
  font-size: 24px;
  font-weight: 500;
`;

export const Text3 = styled(Text)`
  font-size: 18px;
  font-weight: 400;
`;

export const Text4 = styled(Text)`
  font-size: 14px;
  font-weight: 400;
`;

export const Text5 = styled(Text)`
  font-size: 12px;
  font-weight: 400;
`;
