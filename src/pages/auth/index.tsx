import { EAuthStep } from 'pages/auth/interfaces';
import React, { useEffect } from 'react';
import Typography from 'components/typography';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import { Outlet, useNavigate } from 'react-router-dom';
import { Wrapper } from './style';

function AuthPage() {
  const { isLoading } = rootStore.dalAuthStore;
  const { init } = rootStore.authStore;
  const navigate = useNavigate();

  useEffect(() => {
    init();
    navigate(`/auth/${EAuthStep.inputPhone}`);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Typography.Text1 centered>AlfaGym</Typography.Text1>

      <Outlet />
    </Wrapper>
  );
}

export default observer(AuthPage);
