import Button from 'components/button';
import Checkbox from 'components/checkbox';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { WorkoutListWrapper } from './style';

const SelectTrainingStep: React.FC = () => {
  const {
    dalWorkoutStore: { workoutList, isLoading },
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

      {isLoading && <div>Loading...</div>}

      <Checkbox
        title="Начать сразу"
        onChange={toggleImmediate}
        value={startImmediate}
        mt={12}
      />
    </div>
  );
};

export default observer(SelectTrainingStep);
