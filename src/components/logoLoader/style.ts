import styled from 'styled-components';
import { IProps } from './interfaces';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ fullscreen }: IProps) => (fullscreen ? '100vh' : 'auto')};
`;
