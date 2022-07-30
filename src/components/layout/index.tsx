import React from 'react';
import Typography from 'components/typography';
import { observer } from 'mobx-react-lite';
import { rootStore } from 'dal/root-store';
import Button from 'components/button';
import { Link } from 'react-router-dom';
import {
  MenuWrapper,
  Wrapper,
  MenuItemWrapper,
  ToggleMenuButtonWrapper,
} from './style';
import { IProps } from './interfaces';

function Layout({ children }: IProps): React.ReactElement {
  const { isShowMenu, toggleShowMenu } = rootStore.dalUIStore;

  return (
    <Wrapper>
      {children}

      <ToggleMenuButtonWrapper>
        <Button
          type={isShowMenu ? 'accent' : 'primary'}
          onClick={toggleShowMenu}
          text="меню"
        />
      </ToggleMenuButtonWrapper>

      <MenuWrapper isShowMenu={isShowMenu}>
        <Link to="/user">
          <MenuItemWrapper>
            <Typography.Text4 variant="accent">Рез</Typography.Text4>
          </MenuItemWrapper>
        </Link>
        <Link to="/user/settings">
          <MenuItemWrapper>
            <Typography.Text4>Настройки</Typography.Text4>
          </MenuItemWrapper>
        </Link>
        <MenuItemWrapper>
          <Typography.Text4>Профиль</Typography.Text4>
        </MenuItemWrapper>
      </MenuWrapper>
    </Wrapper>
  );
}

export default observer(Layout);
