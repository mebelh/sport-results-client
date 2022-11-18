import { ELoadStatus } from 'dal/interfaces';
import { RootStore } from 'dal/root-store';
import { makeAutoObservable } from 'mobx';
import {
  TCreateExerciseDto,
  IExercise,
  IExercisesResponse,
} from './interfaces';

export class DalExercisesStore {
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  init = () => {
    this.syncExercisesList();
  };

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

  private syncExercisesList = async () => {
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

  async createExercise(createExerciseDto: TCreateExerciseDto) {
    await this.rootStore.API.post('/exercises/create', createExerciseDto);

    await this.syncExercisesList();
  }
}
