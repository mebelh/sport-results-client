import { ELoadStatus } from 'dal/interfaces';
import { RootStore } from 'dal/root-store';
import { IUserInfo, IUserResponse } from 'dal/user/interfaces';
import { makeAutoObservable } from 'mobx';

export class DalUserStore {
  rootStore: RootStore;

  public userInfo: IUserInfo | null = null;

  step: ELoadStatus = ELoadStatus.Idle;

  private isRepeat = false;

  get isLoading(): boolean {
    return (this.step === ELoadStatus.Loading && !this.isRepeat) || this.isIdle;
  }

  get isIdle(): boolean {
    return this.step === ELoadStatus.Idle;
  }

  get isError(): boolean {
    return this.step === ELoadStatus.Error;
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }

  setUserInfo(userInfo: DalUserStore['userInfo']) {
    this.userInfo = userInfo;
  }

  goToStep(step: DalUserStore['step']) {
    this.step = step;
  }

  resetData = () => {
    this.setUserInfo(null);
  };

  setIsRepeat = (isRepeat: DalUserStore['isRepeat']) => {
    this.isRepeat = isRepeat;
  };

  syncUserInfo = async () => {
    this.goToStep(ELoadStatus.Loading);
    try {
      const userInfo = await this.rootStore.API.get<IUserResponse>('/user');
      this.setUserInfo(userInfo.user);
      this.goToStep(ELoadStatus.Success);
      this.setIsRepeat(false);
    } catch (e: any) {
      this.goToStep(ELoadStatus.Error);
      this.setIsRepeat(true);
      setTimeout(() => {
        this.syncUserInfo();
      }, 3000);
    }
  };
}
