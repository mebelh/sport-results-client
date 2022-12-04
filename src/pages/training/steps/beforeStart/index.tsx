import Typography from 'components/typography';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StartButton } from './style';

const BeforeStartStep: React.FC = () => {
  const { startWorkout, timeToStart, timerBeforeStart, workout } =
    rootStore.trainingStore;
  return (
    <div>
      <Typography.Text3 centered>{workout?.name}</Typography.Text3>

      <StartButton onClick={startWorkout}>
        <Typography.Text1>
          {timerBeforeStart ? timeToStart : 'Начать'}
        </Typography.Text1>
      </StartButton>
    </div>
  );
};

export default observer(BeforeStartStep);
