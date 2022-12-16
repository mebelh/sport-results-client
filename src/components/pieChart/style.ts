import styled from 'styled-components';

export const PieCircle = styled.circle.attrs<{
  pathL: number;
}>(({ pathL }) => ({
  cx: 20,
  cy: 20,
  r: 17,
  pathLength: pathL,
}))<{
  fillColor: string;
  percent: number;
  offset: number;
  pathL: number;
}>`
  stroke: ${({ fillColor }) => fillColor};
  stroke-width: 2px;
  stroke-linecap: round;
  fill: transparent;
  stroke-dashoffset: ${({ offset }) => -offset};
  stroke-dasharray: ${({ percent }) => `${percent - 0.7}, 100`};
  transform-box: fill-box;
  transform-origin: center;
`;
