import { Form } from 'app/form';
import { isTruthy } from 'app/form/validates';
import { ICreateApproachDto, IResult } from 'dal/results/interfaces';
import { RootStore } from 'dal/root-store';
import { IWorkout } from 'dal/workout/interfaces';
import { makeAutoObservable } from 'mobx';
import { INITIAL_TIME_TO_START } from './constants';
import { ETrainingSteps } from './interfaces';

export class TrainingStore {
  private readonly rootStore: RootStore;

  form = new Form<any>({}, {}, {});

  startImmediate = false;

  workout: IWorkout | null;

  timeToStart = INITIAL_TIME_TO_START;

  timerBeforeStart = false;

  private step: ETrainingSteps = ETrainingSteps.SelectTraining;

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
        if (!this.training) {
          return;
        }
        const approach = await this.rootStore.dalResultsStore.addApproach({
          result: this.training?.id,
          ...fields,
        });

        this.training?.approaches.push(approach);

        await this.goToTraining();
      },
    }
  );

  private interval: ReturnType<typeof setInterval> | 0 = 0;

  training: IResult | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.workout = null;

    makeAutoObservable(this);
  }

  init = () => {
    if (this.training) {
      // TODO fix this!!!
      // eslint-disable-next-line @typescript-eslint/no-empty-function
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

  initTrainingStep = () => () => {
    this.resetData();
  };

  public initApproachesListStep = () => {
    if (!this.workout) {
      this.goToSelectTraining();
    }
  };

  private clearTimeToStartInterval = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  private goToSelectTraining = () => {
    this.step = ETrainingSteps.SelectTraining;
    this.rootStore.routing.push(`/training/${ETrainingSteps.SelectTraining}`);
  };

  goToCreateApproach = () => {
    this.step = ETrainingSteps.AddApproach;
    this.rootStore.routing.push(`/training/work/${ETrainingSteps.AddApproach}`);
  };

  private goToApproaches = () => {
    this.step = ETrainingSteps.ApproachesList;
    this.rootStore.routing.push(
      `/training/work/${ETrainingSteps.ApproachesList}`
    );
  };

  private goToBeforeStart() {
    this.step = ETrainingSteps.BeforeStart;
    this.rootStore.routing.push(`/training/${ETrainingSteps.BeforeStart}`);
  }

  goBack = () => {
    switch (this.step) {
      case ETrainingSteps.ApproachesList:
        this.goToSelectTraining();
        break;
      case ETrainingSteps.BeforeStart:
        this.clearTimeToStartInterval();
        this.goToSelectTraining();
        break;
      case ETrainingSteps.AddApproach:
        this.goToApproaches();
        break;
      default:
        this.rootStore.routing.goBack();
    }
  };

  private async goToTraining() {
    this.goToApproaches();
    if (!this.workout || this.training) {
      return;
    }
    this.training = await this.rootStore.dalResultsStore.createResult({
      workoutId: this.workout?.id,
    });
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

  private resetApproachForm = () => {
    this.addApproachForm.reset();
  };

  initApproachStep = () => {
    if (!this.workout) {
      this.goToSelectTraining();
    }

    this.addApproachForm.setValue(
      'exercise',
      this.workout?.exercises[0].id || ''
    );

    return () => {
      this.resetApproachForm();
    };
  };

  endWorkout = () => {
    this.rootStore.routing.push('/results');
  };
}
