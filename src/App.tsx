import { useSyncNavigation } from 'app/routing/store';
import { EAuthStep } from 'pages/auth/interfaces';
import InputPhoneStep from 'pages/auth/steps/inputPhone';
import VerifyCodeStep from 'pages/auth/steps/verifyCode';
import ResultsPage from 'pages/results';
import TrainingPage from 'pages/training';
import { ETrainingSteps } from 'pages/training/interfaces';
import AddApproachStep from 'pages/training/steps/addApproach';
import ApproachesList from 'pages/training/steps/approachesList';
import BeforeStartStep from 'pages/training/steps/beforeStart';
import SelectTrainingStep from 'pages/training/steps/selectTraining';
import TrainingStep from 'pages/training/steps/training';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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

  useEffect(init, []);
  useSyncNavigation();

  if (isLoading) {
    return <LogoLoader fullscreen />;
  }

  if (!isAuth) {
    return (
      <AppWrapper>
        <Button onClick={toggleTheme} type="primary" text="Тема" />
        <Routes>
          <Route element={<AuthPage />} path="/auth/*">
            <Route element={<InputPhoneStep />} path={EAuthStep.inputPhone} />
            <Route element={<VerifyCodeStep />} path={EAuthStep.verifyCode} />
          </Route>
          <Route
            path="*"
            element={<Navigate to="/auth/sendVerifyCode" replace />}
          />
        </Routes>
      </AppWrapper>
    );
  }

  return (
    <AppWrapper>
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
          <Route element={<TrainingPage />} path="/training/*">
            <Route
              path={`${ETrainingSteps.BeforeStart}`}
              element={<BeforeStartStep />}
            />
            <Route
              path={`${ETrainingSteps.SelectTraining}`}
              element={<SelectTrainingStep />}
            />

            <Route path="work/" element={<TrainingStep />}>
              <Route
                path={ETrainingSteps.ApproachesList}
                element={<ApproachesList />}
              />
              <Route
                path={ETrainingSteps.AddApproach}
                element={<AddApproachStep />}
              />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AppWrapper>
  );
}
export default observer(App);
