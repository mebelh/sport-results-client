import styled from 'styled-components';
import getColor from 'utils/getColor';
import { IWrapperProps } from './interfaces';

export const Wrapper = styled.div`
  padding: 20px 8px;
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  position: fixed;
  transition: all 0.3s;
  bottom: ${({ isShowMenu }: IWrapperProps) => (isShowMenu ? '0' : '-50px')};
  left: 0;
  right: 0;

  background: ${getColor('background', 'accent')};
`;

export const MenuItemWrapper = styled.div`
  padding: 15px 15px 20px;
`;

export const ToggleMenuButtonWrapper = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
`;
