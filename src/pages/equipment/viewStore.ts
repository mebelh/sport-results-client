import { snakeBarEmitter } from 'app/snakeBar/snakeBarEmitter';
import { makeAutoObservable } from 'mobx';
import { RootStore } from 'dal/root-store';
import { ICreateEquipmentDto } from 'dal/equipment/interfaces';
import { Form } from 'app/form';
import { isTruthy } from 'app/form/validates';

export class EquipmentStore {
  private readonly rootStore: RootStore;

  form = new Form<ICreateEquipmentDto>(
    {
      name: {
        validate: [isTruthy()],
        initialValue: '',
      },
      tags: {
        validate: [],
        initialValue: [],
      },
    },
    {},
    {
      onSuccess: async (fields) => {
        await this.rootStore.dalEquipmentStore.createEquipment(fields);

        this.form.reset();

        snakeBarEmitter.emitSuccess({
          title: 'Упражнение успешно создано',
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
    this.form.reset();
  };
}
