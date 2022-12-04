import ResultsPage from 'pages/results';
import React, { useLayoutEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { rootStore } from 'dal/root-store';
import AuthPage from 'pages/auth';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import getColor from 'utils/getColor';
import Button from 'components/button';
import LogoLoader from 'components/logoLoader';
import SettingsPage from 'pages/settings';
import Layout from 'components/layout';
import StartPage from 'pages/start';
import EquipmentPage from 'pages/equipment';
import ExercisesPage from 'pages/exercises';
import CreateExercisePage from 'pages/createExercise';
import { useSyncNavigation } from 'app/routing/store';
import WorkoutListPage from 'pages/workoutList';
import CreateWorkoutPage from 'pages/createWorkout';

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
        <Layout>
          <Routes>
            <Route element={<StartPage />} path="/" />
            <Route element={<SettingsPage />} path="/settings" />
            <Route element={<EquipmentPage />} path="/equipment" />
            <Route element={<CreateExercisePage />} path="/exercises/create" />
            <Route element={<ExercisesPage />} path="/exercises" />
            <Route element={<WorkoutListPage />} path="/workouts" />
            <Route element={<CreateWorkoutPage />} path="/workout/create" />
            <Route element={<ResultsPage />} path="/results" />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppWrapper>
  );
}
export default observer(App);
