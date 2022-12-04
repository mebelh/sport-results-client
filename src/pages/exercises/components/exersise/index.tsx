import React from 'react';
import { IExercise } from 'dal/exercise/interfaces';
import Typography from 'components/typography';
import {
  EquipmentWrapper,
  ExerciseWrapper,
  EquipmentListWrapper,
} from './style';

const Exercise: React.FC<{
  exercise: IExercise;
}> = ({ exercise }) => (
  <ExerciseWrapper>
    <Typography.Text3>{exercise.name} </Typography.Text3>
    <EquipmentListWrapper>
      {exercise.equipment.map((equipment) => (
        <EquipmentWrapper key={`${exercise.id}${equipment.id}`}>
          <Typography.Text4>{equipment.name}</Typography.Text4>
        </EquipmentWrapper>
      ))}
    </EquipmentListWrapper>
  </ExerciseWrapper>
);

export default Exercise;
