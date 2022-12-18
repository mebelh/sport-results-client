import { IExercise } from 'dal/exercise/interfaces';
import { IWorkout } from 'dal/workout/interfaces';

export interface IResult {
  approaches: IApproach[];
  id: string;
  date: string;
  workout: IWorkout;
}

export interface IApproach {
  exercise: IExercise;
  weight: number;
  repetitionsNumber: number;
  id: string;
}

export interface ICreateResultDto {
  workoutId: string;
}

export type ICreateApproachDto = {
  result: string;

  exercise: string;

  weight: number;

  repetitionsNumber: number;
};
