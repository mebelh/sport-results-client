import React from 'react';
import { observer } from 'mobx-react-lite';
import { rootStore } from 'dal/root-store';
import Button from 'components/button';
import {
  AiOutlineHome,
  HiOutlineMenu,
  MdOutlineSettings,
} from 'react-icons/all';
import getColor from 'utils/getColor';
import {
  MenuWrapper,
  Wrapper,
  MenuItemWrapper,
  ToggleMenuButtonWrapper,
  Title,
} from './style';
import { IProps } from './interfaces';

function Layout({ children }: IProps): React.ReactElement {
  const { isShowMenu, toggleShowMenu } = rootStore.dalUIStore;

  return (
    <Wrapper>
      <Title>SR</Title>
      {children}

      <ToggleMenuButtonWrapper>
        <Button
          type={isShowMenu ? 'accent' : 'primary'}
          onClick={toggleShowMenu}
          icon={<HiOutlineMenu size={21} />}
        />
      </ToggleMenuButtonWrapper>

      <MenuWrapper isShowMenu={isShowMenu}>
        <MenuItemWrapper to="/">
          <AiOutlineHome size={24} color={getColor('text', 'primary')} />
        </MenuItemWrapper>
        <MenuItemWrapper to="settings">
          <MdOutlineSettings size={24} color={getColor('text', 'primary')} />
        </MenuItemWrapper>
      </MenuWrapper>
    </Wrapper>
  );
}

export default observer(Layout);
