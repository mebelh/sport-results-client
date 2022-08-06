export interface Equipment {
  name: string;
}

export interface IExercise {
  name: string;
  equipment: Equipment[];
}

export interface IExercisesResponse {
  exercises: IExercise[];
}
