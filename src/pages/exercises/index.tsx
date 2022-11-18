import React, { useEffect } from 'react';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import Exercise from 'pages/exercises/components/exersise';
import Input from 'components/input';
import NavigationBar from 'components/navigationBar';
import Typography from 'components/typography';
import { Link } from 'react-router-dom';
import Button from 'components/button';
import { ExercisesListWrapper, ButtonWrapper } from './style';

function ExercisesPage() {
  const {
    dalExercisesStore: { exercisesList, init, isLoading },
  } = rootStore;

  useEffect(init, []);

  return (
    <div>
      <NavigationBar title={<Typography.Text3>Упражнения</Typography.Text3>} />

      <ExercisesListWrapper>
        {exercisesList.map((exercise) => (
          <Exercise exercise={exercise} key={exercise.id} />
        ))}
      </ExercisesListWrapper>

      {isLoading && <div>Loading...</div>}

      <ButtonWrapper>
        <Link to="/exercises/create">
          <Button text="Создать" type="primary" />
        </Link>
      </ButtonWrapper>
    </div>
  );
}

export default observer(ExercisesPage);
