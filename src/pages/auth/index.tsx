import React from 'react';
import Input from 'components/input';
import Typography from 'components/typography';
import Button from 'components/button';
import { Wrapper } from './style';

function AuthPage() {
  return (
    <Wrapper>
      <Typography.Text1>Сивиля секс</Typography.Text1>
      <Input title="Логин" icon="@" />
      <Input title="Пароль" type="password" error="Жопа топ" />
      <Button type="danger" text="Войти" />
    </Wrapper>
  );
}

export default AuthPage;
