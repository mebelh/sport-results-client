import styled from 'styled-components';
import getColor from 'utils/getColor';
import { NavLink } from 'react-router-dom';
import Typography from 'components/typography';
import { IWrapperProps } from './interfaces';

export const Wrapper = styled.div`
  padding: 70px 8px 20px;
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;
  position: fixed;
  transition: all 0.3s ease;
  bottom: ${({ isShowMenu }: IWrapperProps) => (isShowMenu ? '0' : '-70px')};
  left: 0;
  right: 0;
  background: ${getColor('background', 'primary')};
  padding: 6px;
`;

export const MenuItemWrapper = styled(NavLink)`
  padding: 13px 0 18px;
  flex: 1;
  display: flex;
  justify-content: center;
  transition: 1s leaner;
  border-radius: 4px;

  &.active {
    background-color: ${getColor('background', 'accent')};
  }
`;

export const Title = styled(Typography.Text1)`
  padding: 0 0 20px;
  position: fixed;
  top: 10px;
`;

export const ToggleMenuButtonWrapper = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
`;
