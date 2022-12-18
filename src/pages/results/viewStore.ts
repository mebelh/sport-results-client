import { RootStore } from 'dal/root-store';
import { makeAutoObservable } from 'mobx';

export class ResultsStore {
  private readonly rootStore: RootStore;

  onlyNoEmptyResultsFilter = true;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  toggleOnlyNoEmptyResults = () => {
    this.onlyNoEmptyResultsFilter = !this.onlyNoEmptyResultsFilter;
  };

  get onlyNoEmptyResults() {
    return this.rootStore.dalResultsStore.results.filter(
      (result) => result.approaches.length
    );
  }

  get results() {
    return this.onlyNoEmptyResultsFilter
      ? this.onlyNoEmptyResults
      : this.rootStore.dalResultsStore.results;
  }

  init = () => {
    this.rootStore.dalResultsStore.syncResults();
    // this.rootStore.dalResultsStore.createResult({
    //   workoutId: '637697ae78ce9cb0c9080dbd',
    // });
  };
}
