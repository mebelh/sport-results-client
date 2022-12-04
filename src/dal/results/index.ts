import { ELoadStatus } from 'dal/interfaces';
// eslint-disable-next-line import/no-cycle
import { RootStore } from 'dal/root-store';
import { makeAutoObservable } from 'mobx';
import { ICreateResultDto, IResult } from './interfaces';

export class DalResultsStore {
  private rootStore: RootStore;

  results: IResult[];

  private step: ELoadStatus;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
    this.results = [];
    this.step = ELoadStatus.Idle;
  }

  get isLoading(): boolean {
    return this.step === ELoadStatus.Loading;
  }

  private goToLoading() {
    this.step = ELoadStatus.Loading;
  }

  private goToSuccess() {
    this.step = ELoadStatus.Success;
  }

  syncResults = async () => {
    this.goToLoading();
    this.results = await this.rootStore.API.get<IResult[]>('/result');
    this.goToSuccess();
  };

  createResult = async (createResultDto: ICreateResultDto) => {
    this.goToLoading();
    const newResult = await this.rootStore.API.post<IResult, ICreateResultDto>(
      '/result/create',
      createResultDto
    );

    this.results.push(newResult);

    this.goToSuccess();
  };
}
