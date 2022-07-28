import { RootStore } from 'dal/root-store';
import { IUserInfo, IUserResponse } from 'dal/user/interfaces';
import { ELoadStatus } from 'dal/interfaces';
import { makeAutoObservable } from 'mobx';

export class DalUserStore {
  rootStore: RootStore;

  public userInfo: IUserInfo | null = null;

  public step: ELoadStatus = ELoadStatus.Idle;

  setUserInfo(userInfo: IUserInfo) {
    this.userInfo = userInfo;
  }

  goToStep(step: ELoadStatus) {
    this.step = step;
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }

  syncUserInfo = async () => {
    this.goToStep(ELoadStatus.Loading);
    try {
      const userInfo = await this.rootStore.API.get<IUserResponse>('/user');
      this.setUserInfo(userInfo.user);
      this.goToStep(ELoadStatus.Success);
    } catch (e: any) {
      this.goToStep(ELoadStatus.Error);
    }
  };
}
