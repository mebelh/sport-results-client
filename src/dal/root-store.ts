import { API } from 'app/api';
import { DalAuthStore } from 'dal/auth';
import { makeAutoObservable } from 'mobx';
import { DalUserStore } from 'dal/user';
import { DalUIStore } from 'dal/ui';

export class RootStore {
  dalUserStore: DalUserStore;

  API: API;

  dalAuthStore: DalAuthStore;

  dalUIStore: DalUIStore;

  constructor() {
    this.dalAuthStore = new DalAuthStore(this);
    this.dalUserStore = new DalUserStore(this);
    this.API = new API(this);
    this.dalUIStore = new DalUIStore(this);
    makeAutoObservable(this);
  }
}

export const rootStore = new RootStore();
