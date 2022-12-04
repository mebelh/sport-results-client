import { IExercise } from 'dal/exercise/interfaces';

export interface IResult {
  approaches: IApproach[];
  id: string;
}

export interface IApproach {
  exercise: IExercise;
}

export interface ICreateResultDto {
  workoutId: string;
}
