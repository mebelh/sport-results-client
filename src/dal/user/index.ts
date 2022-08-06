import { RootStore } from 'dal/root-store';
import { IUserInfo, IUserResponse } from 'dal/user/interfaces';
import { ELoadStatus } from 'dal/interfaces';
import { makeAutoObservable } from 'mobx';

export class DalUserStore {
  rootStore: RootStore;

  public userInfo: IUserInfo | null = null;

  private step: ELoadStatus = ELoadStatus.Idle;

  private isRepeat = false;

  get isLoading(): boolean {
    return this.step === ELoadStatus.Loading && !this.isRepeat;
  }

  get isIdle(): boolean {
    return this.step === ELoadStatus.Idle;
  }

  get isError(): boolean {
    return this.step === ELoadStatus.Error;
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    if (this.rootStore.dalAuthStore.isAuth) {
      this.goToStep(ELoadStatus.Loading);
    }

    makeAutoObservable(this);
  }

  setUserInfo(userInfo: DalUserStore['userInfo']) {
    this.userInfo = userInfo;
  }

  goToStep(step: ELoadStatus) {
    this.step = step;
  }

  resetData = () => {
    this.setUserInfo(null);
  };

  syncUserInfo = async () => {
    this.goToStep(ELoadStatus.Loading);
    try {
      const userInfo = await this.rootStore.API.get<IUserResponse>('/user');
      this.setUserInfo(userInfo.user);
      this.goToStep(ELoadStatus.Success);
      this.isRepeat = false;
    } catch (e: any) {
      this.goToStep(ELoadStatus.Error);
      this.isRepeat = true;
      setTimeout(() => {
        this.syncUserInfo();
      }, 3000);
    }
  };
}
