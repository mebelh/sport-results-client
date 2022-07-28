import React, { useState } from 'react';
import Input from 'components/input';
import Typography from 'components/typography';
import Button from 'components/button';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import { Wrapper } from './style';

function AuthPage() {
  const [login, setLogin] = useState('');

  const { dalAuthStore } = rootStore;

  const onChangeLoginHandler = (newLogin: string) => {
    setLogin(newLogin);
  };

  if (dalAuthStore.isLoading) {
    return <div>Loading...</div>;
  }

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
          dalAuthStore.login(login, '12345');
        }}
      />
    </Wrapper>
  );
}

export default observer(AuthPage);
