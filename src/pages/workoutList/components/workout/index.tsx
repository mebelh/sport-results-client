import React from 'react';
import { IWorkout } from 'dal/workout/interfaces';
import Exercise from 'pages/exercises/components/exersise';
import Typography from 'components/typography';

const Workout: React.FC<{
  workout: IWorkout;
}> = ({ workout: { exercises, description, name } }) => (
  <div>
    <Typography.Text2>{name}</Typography.Text2>
    <p>{description}</p>
    {exercises.map((exercise) => (
      <Exercise exercise={exercise} key={exercise.id} />
    ))}
  </div>
);

export default Workout;
