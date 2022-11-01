import React, { useState } from 'react';
import Input from 'components/input';
import Typography from 'components/typography';
import Button from 'components/button';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import { BiLogIn } from 'react-icons/all';
import { Wrapper } from './style';

function AuthPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const { dalAuthStore } = rootStore;

  if (dalAuthStore.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Typography.Text1>Sport Results</Typography.Text1>
      <Input title="Логин" onChange={setLogin} value={login} />
      <Input
        title="Пароль"
        type="password"
        value={password}
        onChange={setPassword}
      />
      <Button
        type="accent"
        text="Войти"
        icon={<BiLogIn size={24} />}
        iconPosition="right"
        onClick={() => {
          dalAuthStore.login(login, password);
        }}
      />
    </Wrapper>
  );
}

export default observer(AuthPage);
