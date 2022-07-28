import React, { useState } from 'react';
import Input from 'components/input';
import Typography from 'components/typography';
import Button from 'components/button';
import { rootStore } from 'dal/root-store';
import { Wrapper } from './style';

function AuthPage() {
  const [login, setLogin] = useState('');

  const onChangeLoginHandler = (newLogin: string) => {
    setLogin(newLogin);
  };

  return (
    <Wrapper>
      <Typography.Text1>Сивиля секс</Typography.Text1>
      <Input
        title="Логин"
        icon="@"
        onChange={onChangeLoginHandler}
        value={login}
      />
      <Input title="Пароль" type="password" error="Жопа топ" />
      <Button
        type="accent"
        text="Войти"
        onClick={() => {
          rootStore.dalAuthStore.login(login, '12345');
        }}
      />
    </Wrapper>
  );
}

export default AuthPage;
