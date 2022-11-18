import axios, { AxiosRequestConfig } from 'axios';
import { RootStore } from 'dal/root-store';

const { VITE_BASE_URL: BASE_URL } = import.meta.env;

export class API {
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  private getConfig(params?: AxiosRequestConfig['params']): AxiosRequestConfig {
    return {
      headers: {
        authorization: `token ${this.rootStore.dalAuthStore.token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      baseURL: BASE_URL,
      params,
    };
  }

  public get<Result = any, Params extends { [key: string]: any } = any>(
    url: string,
    params?: Params
  ): Promise<Result> {
    return axios.get(url, this.getConfig(params)).then((data) => data.data);
  }

  public post<Result = any, Params = any>(
    url: string,
    params: Params
  ): Promise<Result> {
    return axios.post(url, params, this.getConfig()).then((data) => data.data);
  }
}
