import React, { useEffect } from 'react';
import { rootStore } from 'dal/root-store';
import { observer } from 'mobx-react-lite';
import Exercise from 'pages/exercises/components/exersise';
import Input from 'components/input';

function ExercisesPage() {
  const {
    dalExercisesStore: { exercisesList, init },
  } = rootStore;

  useEffect(init, []);

  return (
    <div>
      <Input />
      {exercisesList.map((exercise) => (
        <Exercise exercise={exercise} key={exercise.id} />
      ))}
    </div>
  );
}

export default observer(ExercisesPage);
