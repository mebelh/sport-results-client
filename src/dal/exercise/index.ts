import { ELoadStatus } from 'dal/interfaces';
import { RootStore } from 'dal/root-store';
import { IExercise, IExercisesResponse } from './interfaces';

export class DalExerciseStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  exercisesList: IExercise[] = [];

  setExercises(exercises: IExercise[]): void {
    this.exercisesList = exercises;
  }

  private step: ELoadStatus = ELoadStatus.Idle;

  goToStep(step: ELoadStatus) {
    this.step = step;
  }

  get isLoading() {
    return this.step === ELoadStatus.Loading;
  }

  get isError() {
    return this.step === ELoadStatus.Error;
  }

  resetData() {
    this.goToStep(ELoadStatus.Idle);
    this.setExercises([]);
  }

  syncExercisesList = async () => {
    this.goToStep(ELoadStatus.Loading);

    try {
      const { exercises } = await this.rootStore.API.get<IExercisesResponse>(
        '/exercises'
      );
      this.setExercises(exercises);
      this.goToStep(ELoadStatus.Success);
    } catch (e) {
      this.goToStep(ELoadStatus.Error);

      console.warn(e);
    }
  };
}
