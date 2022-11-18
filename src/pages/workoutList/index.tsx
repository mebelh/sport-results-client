import React, { useEffect } from 'react';
import { rootStore } from 'dal/root-store';
import Workout from 'pages/workoutList/components/workout';
import NavigationBar from 'components/navigationBar';
import { Link } from 'react-router-dom';
import Typography from 'components/typography';
import { observer } from 'mobx-react-lite';
import { WorkoutListWrapper } from './style';

const WorkoutListPage: React.FC = () => {
  const {
    dalWorkoutStore: { workoutList, isLoading, init },
  } = rootStore;

  useEffect(init, []);

  return (
    <div>
      <NavigationBar title={<Typography.Text3>Тренировки</Typography.Text3>} />
      <WorkoutListWrapper>
        {workoutList.map((workout) => (
          <Workout workout={workout} key={workout.id} />
        ))}
      </WorkoutListWrapper>

      {isLoading && <div>Loading...</div>}

      <Link to="/workout/create">Создать</Link>
    </div>
  );
};

export default observer(WorkoutListPage);
