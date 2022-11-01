import { IEquipment } from 'dal/equipment/interfaces';

export interface IExercise {
  name: string;
  equipment: IEquipment[];
  id: string;
}

export interface IExercisesResponse {
  exercises: IExercise[];
}
