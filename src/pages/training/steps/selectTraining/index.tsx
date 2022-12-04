import Button from 'components/button';
import Checkbox from 'components/checkbox';
import Typography from 'components/typography';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { WorkoutListWrapper } from './style';

const SelectTrainingStep: React.FC = () => {
  const {
    dalWorkoutStore: { workoutList },
    trainingStore: { selectWorkout, toggleImmediate, startImmediate },
  } = rootStore;

  return (
    <div>
      <WorkoutListWrapper>
        {workoutList.map((workout) => (
          <Button
            text={workout.name}
            type="accent"
            key={workout.id}
            onClick={() => {
              selectWorkout(workout);
            }}
          />
        ))}
      </WorkoutListWrapper>

      <Checkbox
        title="Начать сразу"
        onChange={toggleImmediate}
        value={startImmediate}
      />
    </div>
  );
};

export default observer(SelectTrainingStep);
