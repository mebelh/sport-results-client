import { API } from 'app/api';
import { DalAuthStore } from 'dal/auth';
import { makeAutoObservable } from 'mobx';
import { DalUserStore } from 'dal/user';
import { DalUIStore } from 'dal/ui';
import { DalEquipmentStore } from 'dal/equipment';
import { DalExercisesStore } from 'dal/exercise';
import { EquipmentStore } from 'pages/equipment/viewStore';
import { ExercisesStore } from 'pages/exercises/viewStore';

export class RootStore {
  dalUserStore: DalUserStore;

  API: API;

  dalAuthStore: DalAuthStore;

  dalUIStore: DalUIStore;

  dalEquipmentStore: DalEquipmentStore;

  dalExercisesStore: DalExercisesStore;

  equipmentStore: EquipmentStore;

  exercisesStore: ExercisesStore;

  constructor() {
    makeAutoObservable(this);

    this.dalAuthStore = new DalAuthStore(this);
    this.dalUserStore = new DalUserStore(this);
    this.dalExercisesStore = new DalExercisesStore(this);
    this.API = new API(this);
    this.dalUIStore = new DalUIStore(this);
    this.dalEquipmentStore = new DalEquipmentStore(this);
    this.equipmentStore = new EquipmentStore(this);
    this.exercisesStore = new ExercisesStore(this);
  }
}

export const rootStore = new RootStore();
