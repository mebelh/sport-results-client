import { makeAutoObservable } from 'mobx';
import { RootStore } from 'dal/root-store';
import { ICreateEquipmentDto } from 'dal/equipment/interfaces';

export class EquipmentStore {
  private readonly rootStore: RootStore;

  private newEquipmentTitle: ICreateEquipmentDto['name'];

  private newEquipmentTags: ICreateEquipmentDto['tags'];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
    this.newEquipmentTitle = '';
    this.newEquipmentTags = [];
  }

  private setTitle = (value: EquipmentStore['newEquipmentTitle']) => {
    this.newEquipmentTitle = value;
  };

  get inputProps() {
    return {
      onChange: this.setTitle,
      value: this.newEquipmentTitle,
    };
  }

  private resetData() {
    this.newEquipmentTitle = '';
    this.newEquipmentTags = [];
  }

  createEquipment = async () => {
    await this.rootStore.dalEquipmentStore.createEquipment({
      name: this.newEquipmentTitle,
      tags: this.newEquipmentTags,
    });

    this.resetData();
  };

  init = () => {
    this.rootStore.dalEquipmentStore.syncEquipmentList();
  };
}
