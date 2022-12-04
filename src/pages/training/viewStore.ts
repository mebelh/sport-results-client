import { Form } from 'app/form';
import { isTruthy } from 'app/form/validates';
import { ICreateApproachDto, IResult } from 'dal/results/interfaces';
import { RootStore } from 'dal/root-store';
import { IWorkout } from 'dal/workout/interfaces';
import { makeAutoObservable } from 'mobx';
import { ETrainingSteps } from './interfaces';
import { INITIAL_TIME_TO_START } from './constants';

export class TrainingStore {
  private readonly rootStore: RootStore;

  form = new Form<any>({}, {}, {});

  startImmediate = false;

  step: ETrainingSteps;

  workout: IWorkout | null;

  timeToStart = INITIAL_TIME_TO_START;

  timerBeforeStart = false;

  addApproachForm = new Form<Omit<ICreateApproachDto, 'result'>>(
    {
      weight: {
        errorText: 'Обязательно!',
        mode: 'onChange',
        initialValue: 0,
        validate: [isTruthy()],
      },
      exercise: {
        initialValue: '',
        validate: [isTruthy()],
      },
      repetitionsNumber: {
        initialValue: 0,
        validate: [isTruthy()],
      },
    },
    {},
    {
      onSuccess: async (fields) => {
        if (!this.workout) {
          return;
        }
        const approach = await this.rootStore.dalResultsStore.addApproach({
          result: this.workout?.id,
          ...fields,
        });

        console.log(this.training);

        this.training?.approaches.push(approach);

        this.goToTraining();
      },
    }
  );

  private interval: ReturnType<typeof setInterval> | 0 = 0;

  training: IResult | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.step = ETrainingSteps.SelectTraining;
    this.workout = null;

    makeAutoObservable(this);
  }

  init = () => {
    console.log(this.training);
    if (this.training) {
      return () => {};
    }

    this.timerBeforeStart = false;
    this.rootStore.dalWorkoutStore.init();
    this.startImmediate = false;

    return () => {
      if (this.training) {
        return;
      }
      this.resetData();
    };
  };

  private decrementTimeToStart() {
    this.timeToStart -= 1;
  }

  private resetData() {
    this.timeToStart = INITIAL_TIME_TO_START;
    this.workout = null;
    this.training = null;
    this.clearTimeToStartInterval();
  }

  clearTimeToStartInterval = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  goToSelectTraining = () => {
    this.step = ETrainingSteps.SelectTraining;
  };

  goToCreateApproach = () => {
    this.step = ETrainingSteps.AddApproach;
  };

  private async goToTraining() {
    this.step = ETrainingSteps.Training;
    if (!this.workout || this.training) {
      return;
    }
    this.training = await this.rootStore.dalResultsStore.createResult({
      workoutId: this.workout?.id,
    });
  }

  private goToBeforeStart() {
    this.step = ETrainingSteps.BeforeStart;
  }

  startWorkout = () => {
    if (this.startImmediate) {
      this.goToTraining();
      return;
    }

    if (this.timerBeforeStart) {
      return;
    }

    this.timerBeforeStart = true;

    const interval = setInterval(() => {
      this.decrementTimeToStart();
      if (this.timeToStart <= 0) {
        clearInterval(interval);
        this.goToTraining();
      }
    }, 1000);
    this.interval = interval;
  };

  selectWorkout = (workout: IWorkout) => {
    this.workout = workout;
    this.goToBeforeStart();
  };

  toggleImmediate = () => {
    this.startImmediate = !this.startImmediate;
  };

  resetApproachForm = () => {
    this.addApproachForm.reset();
  };
}
