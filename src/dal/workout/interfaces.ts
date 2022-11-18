import { IExercise } from 'dal/exercise/interfaces';
import { TValue } from 'app/form/interfaces';

export interface IWorkout {
  id: string;
  name: string;
  description: string;
  exercises: IExercise[];
}

export type TCreateWorkoutDto = {
  name: string;
  description: string;
  exercises: TValue[];
};
