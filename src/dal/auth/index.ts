import { makeAutoObservable } from 'mobx';
import { RootStore } from 'dal/root-store';
import { IAuthParams } from 'dal/auth/interfaces';
import { ELoadStatus } from 'dal/interfaces';

export class DalAuthStore {
  token = '';

  rootStore: RootStore;

  step: ELoadStatus = ELoadStatus.Loading;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  get isLoading() {
    return this.step === ELoadStatus.Loading;
  }

  get isError() {
    return this.step === ELoadStatus.Error;
  }

  get isAuth() {
    return Boolean(this.token);
  }

  setToken(token: string) {
    this.token = token;
  }

  goToStep(step: ELoadStatus) {
    this.step = step;
  }

  async login(login: string, password: string) {
    try {
      this.goToStep(ELoadStatus.Loading);
      const token = await this.rootStore.API.post<string, IAuthParams>(
        '/auth/login',
        {
          login,
          password,
        }
      );
      this.setToken(token);
      this.goToStep(ELoadStatus.Success);
    } catch (e: any) {
      this.goToStep(ELoadStatus.Error);
    }
  }

  logout() {
    this.setToken('');
  }
}
