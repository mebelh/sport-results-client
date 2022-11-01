import styled from 'styled-components';
import getColor from 'utils/getColor';
import { IProps } from './interfaces';

export const Container = styled.div`
  padding: 4px;
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

export const ContainerValue = styled.div`
  border-radius: 6px;
  padding: 3px;
  border: 1px solid ${getColor('background', 'accent')};
  width: 20px;
  height: 20px;
`;

export const Value = styled.div<IProps>`
  border-radius: 4px;
  width: 100%;
  height: 100%;
  background-color: ${({ value }) =>
    value ? getColor('background', 'accent') : 'transparent'};
`;

export const Title = styled.p`
  color: ${getColor('text', 'primary')};
`;
