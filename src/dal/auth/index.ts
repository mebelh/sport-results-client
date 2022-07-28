import { makeAutoObservable } from 'mobx';
import { RootStore } from 'dal/root-store';
import { IAuthParams } from 'dal/auth/interfaces';
import { ELoadStatus } from 'dal/interfaces';
import { ILoginResponse } from 'dal/user/interfaces';
import { cache } from 'utils/cache';
import { AUTH_KEY } from './constants';

export class DalAuthStore {
  token: string | null = null;

  rootStore: RootStore;

  step: ELoadStatus = ELoadStatus.Idle;

  constructor(rootStore: RootStore) {
    const token = cache.get<string>(AUTH_KEY);
    console.log(token);
    this.setToken(token);
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }

  init = () => {
    this.rootStore.dalUserStore.syncUserInfo();
  };

  get isLoading() {
    return this.step === ELoadStatus.Loading;
  }

  get isError() {
    return this.step === ELoadStatus.Error;
  }

  get isAuth() {
    return Boolean(this.token);
  }

  private setToken(token: string | null) {
    this.token = token;
    cache.set(AUTH_KEY, token);
  }

  private goToStep(step: ELoadStatus) {
    this.step = step;
  }

  async login(login: string, password: string) {
    try {
      this.goToStep(ELoadStatus.Loading);
      const { token, user } = await this.rootStore.API.post<
        ILoginResponse,
        IAuthParams
      >('auth', {
        login,
        password,
      });
      this.rootStore.dalUserStore.setUserInfo(user);
      this.setToken(token);
      this.goToStep(ELoadStatus.Success);
    } catch (e: any) {
      console.log(e);
      this.goToStep(ELoadStatus.Error);
    }
  }

  logout() {
    this.setToken('');
  }
}
