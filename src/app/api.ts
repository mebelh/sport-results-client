import { snakeBarEmitter } from 'app/snakeBar/snakeBarEmitter';
import axios, { AxiosRequestConfig } from 'axios';
import { RootStore } from 'dal/root-store';

const { VITE_BASE_URL: BASE_URL } = import.meta.env;

export class API {
  private rootStore: RootStore;

  private cancelInterval = 4000;

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
    const abortController = new AbortController();

    const timer = setTimeout(() => {
      abortController.abort();
      snakeBarEmitter.emitError({
        title: 'Ошибка!',
        description: 'Время ожидания истекло!',
      });
    }, this.cancelInterval);

    return axios
      .get(url, { ...this.getConfig(params), signal: abortController.signal })
      .then((data) => data.data)
      .finally(() => {
        clearTimeout(timer);
      });
  }

  public post<Result = any, Params = any>(
    url: string,
    params: Params
  ): Promise<Result> {
    const abortController = new AbortController();

    const timer = setTimeout(() => {
      abortController.abort();
      snakeBarEmitter.emitError({
        title: 'Ошибка!',
        description: 'Время ожидания истекло!',
      });
    }, this.cancelInterval);

    return axios
      .post(url, params, {
        ...this.getConfig(),
        signal: abortController.signal,
      })
      .then((data) => data.data)
      .finally(() => {
        clearTimeout(timer);
      });
  }
}
