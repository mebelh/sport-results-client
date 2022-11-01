import { css } from 'styled-components';
import getColor, { TColorVariant } from 'utils/getColor';

export const Blur = (colorVariant: TColorVariant = 'transparentPrimary') => css`
  background-color: ${getColor('background', colorVariant)};
  backdrop-filter: blur(2px);
`;
