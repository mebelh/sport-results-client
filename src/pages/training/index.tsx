import Button from 'components/button';
import NavigationBar from 'components/navigationBar';
import Typography from 'components/typography';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import TrainingStep from 'pages/training/steps/training';
import React, { useCallback, useEffect } from 'react';
import AddApproachStep from './steps/addApproach';
import { ETrainingSteps, TTrainingSteps } from './interfaces';
import BeforeStartStep from './steps/beforeStart';
import SelectTrainingStep from './steps/selectTraining';

const steps: TTrainingSteps = {
  [ETrainingSteps.SelectTraining]: SelectTrainingStep,
  [ETrainingSteps.BeforeStart]: BeforeStartStep,
  [ETrainingSteps.Training]: TrainingStep,
  [ETrainingSteps.AddApproach]: AddApproachStep,
};

const titles: Record<keyof TTrainingSteps, string> = {
  [ETrainingSteps.SelectTraining]: 'Выберите тренировку',
  [ETrainingSteps.BeforeStart]: 'Готовы?',
  [ETrainingSteps.Training]: 'Тренировка',
  [ETrainingSteps.AddApproach]: 'Добавить подход',
};

const TrainingPage: React.FC = () => {
  const { init, step, workout, goToSelectTraining } = rootStore.trainingStore;
  const { goBack } = rootStore.routing;
  useEffect(init, []);

  const handleGoBack = useCallback(() => {
    switch (step) {
      case ETrainingSteps.Training:
        goToSelectTraining();
        break;
      case ETrainingSteps.BeforeStart:
        goToSelectTraining();
        break;
      default:
        goBack();
    }
  }, [step]);

  const Step = steps[step];

  return (
    <>
      <NavigationBar goBackHandler={handleGoBack} />

      <Typography.Text2
        centered
        style={{
          marginTop: 16,
        }}
      >
        {titles[step]}
      </Typography.Text2>

      <Step />
    </>
  );
};

export default observer(TrainingPage);
