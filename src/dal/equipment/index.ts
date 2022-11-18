import { RootStore } from 'dal/root-store';
import { ELoadStatus } from 'dal/interfaces';
import { makeAutoObservable } from 'mobx';
import { ICreateEquipmentDto, IEquipment } from './interfaces';

export class DalEquipmentStore {
  rootStore: RootStore;

  equipment: IEquipment[] = [];

  private step: ELoadStatus = ELoadStatus.Idle;

  get isLoading() {
    return this.step === ELoadStatus.Loading;
  }

  get isError() {
    return this.step === ELoadStatus.Error;
  }

  syncEquipmentList = async () => {
    this.goToStep(ELoadStatus.Loading);
    try {
      const equipment = await this.rootStore.API.get<IEquipment[]>(
        '/equipment'
      );

      this.setEquipment(equipment);
      this.goToStep(ELoadStatus.Success);
    } catch (e: any) {
      console.log(e);
      this.goToStep(ELoadStatus.Error);
    }
  };

  createEquipment = async (createEquipmentDto: ICreateEquipmentDto) => {
    if (!createEquipmentDto.name) {
      return;
    }
    const equipment = await this.rootStore.API.post<
      IEquipment,
      ICreateEquipmentDto
    >('/equipment/create', createEquipmentDto);

    this.addEquipment(equipment);
  };

  private setEquipment(
    equipment: IEquipment[] | ((eq: IEquipment[]) => IEquipment[])
  ) {
    if (typeof equipment === 'function') {
      this.equipment = equipment(this.equipment);
      return;
    }
    this.equipment = equipment;
  }

  private addEquipment(equipment: IEquipment) {
    this.setEquipment((eq) => [...eq, equipment]);
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  private goToStep = (step: ELoadStatus) => {
    this.step = step;
  };
}
