import { makeAutoObservable } from 'mobx';
import { IInputProps } from 'components/input/interfaces';
import { RootStore } from 'dal/root-store';

export class ExercisesStore {
  rootStore: RootStore;

  newExerciseTitle: string;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.newExerciseTitle = '';
  }

  resetData() {
    this.newExerciseTitle = '';
  }

  onInputChange(value: string) {
    this.newExerciseTitle = value;
  }

  get inputProps(): IInputProps {
    return {
      onChange: this.onInputChange,
      value: this.newExerciseTitle,
    };
  }
}
