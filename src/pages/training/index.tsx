import NavigationBar from 'components/navigationBar';
import Typography from 'components/typography';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ETrainingSteps, TTrainingSteps } from './interfaces';
import { EndWorkoutButton } from './style';

const titles: Record<keyof TTrainingSteps, string> = {
  [ETrainingSteps.SelectTraining]: 'Выберите тренировку',
  [ETrainingSteps.BeforeStart]: 'Готовы?',
  [ETrainingSteps.ApproachesList]: 'Подходы',
  [ETrainingSteps.AddApproach]: 'Добавить подход',
};

const TrainingPage: React.FC = () => {
  const { init, goBack, endWorkout } = rootStore.trainingStore;
  const { step } = useParams<{
    step: ETrainingSteps;
  }>();

  useEffect(init, []);

  return (
    <div>
      <NavigationBar goBackHandler={goBack} />
      <Typography.Text2
        centered
        style={{
          marginTop: 16,
        }}
      >
        {step && titles[step]}
      </Typography.Text2>
      <Outlet />

      <EndWorkoutButton
        type="danger"
        onClick={endWorkout}
        text="Завершить тренировку"
      />
    </div>
  );
};

export default observer(TrainingPage);
