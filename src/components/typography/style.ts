import styled, { css } from 'styled-components';
import getColor, { TColorVariant } from 'utils/getColor';

const textColor = css`
  color: ${({ variant = 'primary' }: { variant?: TColorVariant }) =>
    getColor('text', variant)};
`;

export const Text1 = styled.p`
  font-size: 32px;
  font-weight: 500;
  color: ${({ variant = 'primary' }: { variant?: TColorVariant }) =>
    getColor('text', variant)};
`;

export const Text2 = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: ${({ variant = 'primary' }: { variant?: TColorVariant }) =>
    getColor('text', variant)};
`;

export const Text3 = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: ${({ variant = 'primary' }: { variant?: TColorVariant }) =>
    getColor('text', variant)};
`;

export const Text4 = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${({ variant = 'primary' }: { variant?: TColorVariant }) =>
    getColor('text', variant)};
`;

export const Text5 = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${({ variant = 'primary' }: { variant?: TColorVariant }) =>
    getColor('text', variant)};
`;
