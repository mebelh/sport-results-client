import React from 'react';
import { IExercise } from 'dal/exercise/interfaces';
import Typography from 'components/typography';
import { EquipmentWrapper, ExerciseWrapper } from './style';

const Exercise: React.FC<{
  exercise: IExercise;
}> = ({ exercise }) => (
  <ExerciseWrapper>
    <Typography.Text3>{exercise.name} </Typography.Text3>
    {exercise.equipment.map((equipment) => (
      <EquipmentWrapper key={equipment.id}>
        <Typography.Text3>{equipment.name}</Typography.Text3>
      </EquipmentWrapper>
    ))}
  </ExerciseWrapper>
);

export default Exercise;
