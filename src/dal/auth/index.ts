import { makeAutoObservable } from 'mobx';
import { RootStore } from 'dal/root-store';
import { IAuthParams } from 'dal/auth/interfaces';
import { ELoadStatus } from 'dal/interfaces';
import { ILoginResponse } from 'dal/user/interfaces';
import { AUTH_KEY, cache } from 'utils/cache';

export class DalAuthStore {
  token: string | null = null;

  rootStore: RootStore;

  step: ELoadStatus = ELoadStatus.Loading;

  constructor(rootStore: RootStore) {
    const token = cache.get<string>(AUTH_KEY);
    this.setToken(token);
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  init = () => {
    if (this.isAuth) {
      this.rootStore.dalUserStore.syncUserInfo();
    } else {
      this.goToStep(ELoadStatus.Success);
      this.rootStore.dalUserStore.goToStep(ELoadStatus.Success);
    }
  };

  get isLoading() {
    return this.step === ELoadStatus.Loading;
  }

  get isError() {
    return this.step === ELoadStatus.Error;
  }

  get isAuth() {
    return Boolean(
      (this.token && this.rootStore.dalUserStore?.isIdle) ||
        this.rootStore.dalUserStore?.userInfo
    );
  }

  private setToken(token: string | null) {
    this.token = token;
    cache.set(AUTH_KEY, token);
  }

  private goToStep(step: ELoadStatus) {
    this.step = step;
  }

  resetData = () => {
    this.setToken('');
    this.goToStep(ELoadStatus.Idle);
  };

  async login(phone: number, code: string) {
    try {
      this.goToStep(ELoadStatus.Loading);
      const { token, user } = await this.rootStore.API.post<
        ILoginResponse,
        IAuthParams
      >('auth/login', {
        phone,
        code,
      });

      this.rootStore.dalUserStore.setUserInfo(user);
      this.setToken(token);
      this.goToStep(ELoadStatus.Success);
    } catch (e: any) {
      console.warn(e);
      this.goToStep(ELoadStatus.Error);
      throw e;
    }
  }

  sendVerifyCode = async (phone: number): Promise<void> => {
    try {
      await this.rootStore.API.post<
        never,
        {
          phone: number;
        }
      >('/auth/sendVerifyCode', {
        phone,
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  logout = () => {
    this.resetData();
    this.rootStore.dalUserStore.resetData();
  };
}
