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

  setWorkoutList(list: DalWorkoutStore['workoutList']) {
    this.workoutList = list;
  }

  async syncWorkouts() {
    this.isLoading = true;

    const list = await this.rootStore.API.get<IWorkout[]>('/workout');

    this.setWorkoutList(list);

    this.isLoading = false;
  }

  createWorkout(createWorkoutDto: TCreateWorkoutDto): Promise<IWorkout> {
    return this.rootStore.API.post('/workout/create', createWorkoutDto);
  }

  init = () => {
    this.syncWorkouts();
  };
}
