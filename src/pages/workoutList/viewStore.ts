import { makeAutoObservable } from 'mobx';
import { RootStore } from 'dal/root-store';

export class WorkoutListPageStore {
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  init = () => {
    this.rootStore.dalWorkoutStore.syncWorkouts();
  };

  get isLoading() {
    return this.rootStore.dalWorkoutStore.isLoading;
  }
}
