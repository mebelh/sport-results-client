import NavigationBar from 'components/navigationBar';
import Typography from 'components/typography';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ETrainingSteps, TTrainingSteps } from './interfaces';

const titles: Record<keyof TTrainingSteps, string> = {
  [ETrainingSteps.SelectTraining]: 'Выберите тренировку',
  [ETrainingSteps.BeforeStart]: 'Готовы?',
  [ETrainingSteps.ApproachesList]: 'Подходы',
  [ETrainingSteps.AddApproach]: 'Добавить подход',
};

const TrainingPage: React.FC = () => {
  const { init, goToSelectTraining, goToApproaches, clearTimeToStartInterval } =
    rootStore.trainingStore;
  const { goBack } = rootStore.routing;
  const { step } = useParams<{
    step: ETrainingSteps;
  }>();

  useEffect(init, []);

  const handleGoBack = useCallback(() => {
    switch (step) {
      case ETrainingSteps.ApproachesList:
        goToSelectTraining();
        break;
      case ETrainingSteps.BeforeStart:
        clearTimeToStartInterval();
        goToSelectTraining();
        break;
      case ETrainingSteps.AddApproach:
        goToApproaches();
        break;
      default:
        goBack();
    }
  }, [step]);

  return (
    <>
      <NavigationBar goBackHandler={handleGoBack} />

      <Typography.Text2
        centered
        style={{
          marginTop: 16,
        }}
      >
        {step && titles[step]}
      </Typography.Text2>

      <Outlet />
    </>
  );
};

export default observer(TrainingPage);
