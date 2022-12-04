import { makeAutoObservable } from 'mobx';
import { RootStore } from 'dal/root-store';
import { Form } from 'app/form';
import { TCreateExerciseDto } from 'dal/exercise/interfaces';
import { ISelectElement } from 'components/select/interfaces';
import { snakeBarEmitter } from 'app/snakeBar/snakeBarEmitter';
import { isTruthy } from 'app/form/validates';

export class ExercisesStore {
  private readonly rootStore: RootStore;

  form = new Form<TCreateExerciseDto>(
    {
      name: {
        validate: [isTruthy()],
        initialValue: '',
        errorText: 'Название обязательно!',
        mode: 'onSubmit',
      },
      equipment: {
        initialValue: [],
        validate: [],
      },
    },
    {},
    {
      onSuccess: async (f) => {
        await this.rootStore.dalExercisesStore.createExercise(f);
        snakeBarEmitter.emitSuccess({
          title: 'Успех!',
          description: 'Тренировка успешно создана!',
        });

        this.rootStore.routing.goBack();
      },
      onError: (f) => {
        console.log('error', f);
        snakeBarEmitter.emitError({
          title: 'Заполните все обязательные поля!',
        });
      },
    }
  );

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  init = () => {
    this.rootStore.dalEquipmentStore.syncEquipmentList();

    return () => {
      this.form.reset();
    };
  };

  get equipmentIds(): ISelectElement[] {
    return this.rootStore.dalEquipmentStore.equipment.map((equipment) => ({
      value: equipment.id,
      label: equipment.name,
    }));
  }
}
