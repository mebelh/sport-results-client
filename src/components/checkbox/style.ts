import styled from 'styled-components';
import getColor from 'utils/getColor';
import { IProps } from './interfaces';

export const Container = styled.div`
  padding: 4px 4px 20px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  position: relative;
`;

export const ContainerValue = styled.div`
  border-radius: 6px;
  padding: 3px;
  border: 1px solid
    ${({ error }: IProps) =>
      error
        ? getColor('background', 'danger')
        : getColor('background', 'accent')};
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

export const Error = styled.p`
  color: ${getColor('text', 'error')};
  position: absolute;
  top: 60%;
  font-size: 14px;
`;
