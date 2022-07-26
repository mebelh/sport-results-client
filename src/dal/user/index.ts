import { RootStore } from 'dal/root-store';
import { IUserInfo } from 'dal/user/interfaces';
import { ELoadStatus } from 'dal/interfaces';

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
  }

  async syncUserInfo() {
    this.goToStep(ELoadStatus.Loading);
    try {
      const userInfo = await this.rootStore.API.get<IUserInfo>('/user');
      this.setUserInfo(userInfo);
      this.goToStep(ELoadStatus.Success);
    } catch (e: any) {
      this.goToStep(ELoadStatus.Error);
    }
  }
}
