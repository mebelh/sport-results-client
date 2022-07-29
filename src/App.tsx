import React, { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from 'pages/auth';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import getColor from 'utils/getColor';
import Button from 'components/button';
import LogoLoader from 'components/logoLoader';
import ResultsPage from 'pages/results';
import SettingsPage from 'pages/settings';

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: ${getColor('background', 'primary')};
`;

function App() {
  const { isAuth, init } = rootStore.dalAuthStore;
  const { isLoading } = rootStore.dalUserStore;

  const { toggleTheme } = rootStore.dalUIStore;

  useLayoutEffect(init, []);

  if (isLoading) {
    return <LogoLoader fullscreen />;
  }

  if (!isAuth) {
    return (
      <AppWrapper>
        <Button onClick={toggleTheme} type="primary" text="Тема" />
        <BrowserRouter>
          <Routes>
            <Route element={<AuthPage />} path="/auth" />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </BrowserRouter>
      </AppWrapper>
    );
  }

  return (
    <AppWrapper>
      <BrowserRouter>
        <Routes>
          <Route element={<ResultsPage />} path="/user/results" />
          <Route element={<SettingsPage />} path="/user/settings" />
          <Route path="*" element={<Navigate to="/user/results" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppWrapper>
  );
}
export default observer(App);
