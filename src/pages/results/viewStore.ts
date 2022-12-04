import { RootStore } from 'dal/root-store';
import { makeAutoObservable } from 'mobx';

export class ResultsStore {
  private readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  init = () => {
    this.rootStore.dalResultsStore.syncResults();
    // this.rootStore.dalResultsStore.createResult({
    //   workoutId: '637697ae78ce9cb0c9080dbd',
    // });
  };
}
