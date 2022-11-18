import { IEquipment } from 'dal/equipment/interfaces';
import { TValue } from 'app/form/interfaces';

export interface IExercise {
  name: string;
  equipment: IEquipment[];
  id: string;
}

export interface IExercisesResponse {
  exercises: IExercise[];
}

export type TCreateExerciseDto = {
  name: string;
  equipment: TValue[];
};
