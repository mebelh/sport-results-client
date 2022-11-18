import { makeAutoObservable } from 'mobx';
import { IWorkout, TCreateWorkoutDto } from 'dal/workout/interfaces';
import { RootStore } from 'dal/root-store';

export class DalWorkoutStore {
  private rootStore: RootStore;

  workoutList: Array<IWorkout>;

  isLoading: boolean;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.isLoading = false;
    this.workoutList = [];
    makeAutoObservable(this);
  }

  async syncWorkouts() {
    this.isLoading = true;

    this.workoutList = await this.rootStore.API.get('/workout');

    this.isLoading = false;
  }

  createWorkout(createWorkoutDto: TCreateWorkoutDto): Promise<IWorkout> {
    return this.rootStore.API.post('/workout/create', createWorkoutDto);
  }

  init = () => {
    this.syncWorkouts();
  };
}
