import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from 'pages/auth';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import getColor from 'utils/getColor';
import Button from 'components/button';

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: ${getColor('background', 'primary')};
`;

function App() {
  const { isAuth, init } = rootStore.dalAuthStore;

  const { toggleTheme } = rootStore.dalUIStore;

  useEffect(init, []);

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
          <Route
            element={
              <div>
                {rootStore.dalUserStore.userInfo?.login}
                <Button
                  type="danger"
                  onClick={() => {
                    rootStore.dalAuthStore.logout();
                  }}
                  text="Выйти"
                />
              </div>
            }
            path="/"
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppWrapper>
  );
}
export default observer(App);
