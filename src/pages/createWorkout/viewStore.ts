import { makeAutoObservable } from 'mobx';
import { RootStore } from 'dal/root-store';
import { Form } from 'app/form';
import { TCreateWorkoutDto } from 'dal/workout/interfaces';
import { isLengthMoreThen, isTruthy } from 'app/form/validates';
import { ISelectElement } from 'components/select/interfaces';

export class CreateWorkoutStore {
  private rootStore: RootStore;

  form = new Form<TCreateWorkoutDto>(
    {
      name: {
        initialValue: '',
        validate: [isTruthy()],
      },
      description: {
        initialValue: '',
        validate: [],
      },
      exercises: {
        validate: [isLengthMoreThen(0, 'Выберите хотя бы 1 упражнение')],
        initialValue: [],
      },
    },
    {},
    {
      onSuccess: async (f) => {
        await this.rootStore.dalWorkoutStore.createWorkout(f);
        this.rootStore.routing.goBack();
      },
      onError: console.log,
    }
  );

  constructor(rootStore: CreateWorkoutStore['rootStore']) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  get isLoading(): boolean {
    return this.rootStore.dalExercisesStore.isLoading;
  }

  init = () => {
    this.rootStore.dalExercisesStore.init();

    return () => {
      this.form.reset();
    };
  };

  get exercises(): ISelectElement[] {
    return this.rootStore.dalExercisesStore.exercisesList.map((exercise) => ({
      value: exercise.id,
      label: exercise.name,
    }));
  }
}
