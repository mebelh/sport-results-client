import React from 'react';
import { IWorkout } from 'dal/workout/interfaces';
import Exercise from 'pages/exercises/components/exersise';
import Typography from 'components/typography';

const Workout: React.FC<{
  workout: IWorkout;
}> = ({ workout: { exercises, description, name, id } }) => (
  <div>
    <Typography.Text2>{name}</Typography.Text2>
    <Typography.Text3>{description}</Typography.Text3>
    {exercises.map((exercise) => (
      <Exercise exercise={exercise} key={`${id} ${exercise.id}`} />
    ))}
  </div>
);

export default Workout;
